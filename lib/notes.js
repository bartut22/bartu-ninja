import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
const { readdir } = require('fs').promises;

const notesDirectory = path.join(process.cwd(), 'notes');
let fileNames = [];

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
    // console.log(fileNames);
}

export function getSortedNotesData() {
    // Get all file names under /notes
    const allNotesData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '').split('/').slice(-1)[0];

        // Read markdown file as string
        const fileContents = fs.readFileSync(fileName, 'utf8');

        // Use gray-matter to parse the note metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id
        return {
            id,
            ...matterResult.data,
        };
    });
    // Sort notes by date
    return allNotesData.sort((a, b) => a.date < b.date ? 1 : -1);
}

async function prependToFile(file, string) {
    var data = fs.readFileSync(file); //read existing contents into data
    var fd = fs.openSync(file, 'w+');
    var buffer = Buffer.from(string);

    fs.writeSync(fd, buffer, 0, buffer.length, 0); //write new data
    // fs.writeSync(fd, data, 0, data.length, buffer.length); //append old data
    await fs.appendFile(fd, data);
    fs.close(fd);
}

export async function generateYaml(fileName, override=false) {
    const fileContents = fs.readFileSync(fileName, 'utf8');
    const matterResult = matter(fileContents);
    const data = matterResult.data;
    if (Object.keys(data).length === 0 || override) {
        const yaml = `---
title: ${fileName.split('/').slice(-1)[0].replace(/\.md$/, '').replace(/_/g, ' ')}
date: ${new Date().toISOString()}
author: Admin`
        await prependToFile(fileName, yaml);
        // console.log(yaml);
    } else if (!override) return;
}

export async function generateAllYamls() {
    fileNames.forEach(async (fileName) => {
        await generateYaml(fileName);
    });
}

// Returns an array that looks like this:
// [
//   {
//     id: 'ssg-ssr'
//   },
//   {
//     id: 'pre-rendering'
//   }
// ]
export function getAllNoteIds() {
    return fileNames.map((fileName) => {
        // remove part of filename before last slash
        let id = fileName.replace(/\.md$/, '').split('/').slice(-1)[0];
        console.log(`WATCH OUT FOR ${id}`)
        return {
            // id: fileName.replace(/\.md$/, ''),
            id: id,
        };
    });
}

export async function getNote(id) {
    // console.log(id);
    const fullPath = path.join(notesDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the note metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the id and contentHtml
    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
}