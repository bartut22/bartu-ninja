import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
const { readdir } = require('fs').promises;

const notesDirectory = path.join(process.cwd(), 'notes');
let fileNames = [];
let fileNamesInitialized = false;
let fileNamesInitializationPromise = null;

const getFileList = async (dirName) => {
    let files = [];
    const items = await readdir(dirName, { withFileTypes: true });

    for (const item of items) {
        if (item.isDirectory()) {
            files = [
                ...files,
                ...(await getFileList(`${dirName}/${item.name}`)),
            ];
        } else {
            files.push(`${dirName}/${item.name}`);
        }
    }

    return files;
};

export async function setFileNames() {
    fileNames = await getFileList(notesDirectory);
    fileNamesInitialized = true;
}

async function ensureFileNames() {
    if (fileNamesInitialized) {
        return;
    }
    if (!fileNamesInitializationPromise) {
        fileNamesInitializationPromise = setFileNames().finally(() => {
            fileNamesInitializationPromise = null;
        });
    }
    await fileNamesInitializationPromise;
}

function getFullPathById(id) {
    const match = fileNames.find(
        (f) => f.replace(/\.md$/, '').split('/').slice(-1)[0] === id
    );
    if (!match) throw new Error(`Note not found: ${id}`);
    return match;
}

function normalizeDate(date) {
    if (!date) return null;
    if (date instanceof Date) return date.toISOString();
    return String(date);
}

export async function getSortedNotesData() {
    await ensureFileNames();
    const allNotesData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, '').split('/').slice(-1)[0];
        const fileContents = fs.readFileSync(fileName, 'utf8');
        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data,
            date: normalizeDate(matterResult.data.date),
        };
    });

    return allNotesData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

async function prependToFile(file, string) {
    var data = fs.readFileSync(file);
    var fd = fs.openSync(file, 'w+');
    var buffer = Buffer.from(string);
    fs.writeSync(fd, buffer, 0, buffer.length, 0);
    await fs.appendFile(fd, data);
    fs.close(fd);
}

export async function generateYaml(fileName, override = false) {
    const fileContents = fs.readFileSync(fileName, 'utf8');
    const matterResult = matter(fileContents);
    const data = matterResult.data;
    if (Object.keys(data).length === 0 || override) {
        const yaml = `---
title: ${fileName.split('/').slice(-1)[0].replace(/\.md$/, '').replace(/_/g, ' ')}
date: ${new Date().toISOString()}
author: Admin`;
        await prependToFile(fileName, yaml);
    }
}

export async function generateAllYamls() {
    fileNames.forEach(async (fileName) => {
        await generateYaml(fileName);
    });
}

export async function getAllNoteIds() {
    await ensureFileNames();
    return fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, '').split('/').slice(-1)[0];
        return { id };
    });
}

export async function getNote(id) {
    await ensureFileNames();
    const fullPath = getFullPathById(id);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...matterResult.data,
        date: normalizeDate(matterResult.data.date),
    };
}
