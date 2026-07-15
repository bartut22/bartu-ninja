import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../navbar'
import Footer from '../footer'
import styles from '../page.module.css'
import notesStyles from './notes.module.css'

import { generateAllYamls, getSortedNotesData, setFileNames } from '../../../lib/notes';
import NoteTags from '../noteTags'

export default async function Notes() {
    await setFileNames();
    const allNotes = await getSortedNotesData();
    await generateAllYamls();
    console.log("hi2");

    return (
        <main className={styles.main}>
            <Navbar>
            </Navbar>

            <div className={styles.content}>
                <h2>My Notes (:</h2>
                <ul>
                    {allNotes.map((note) => (
                        <li className={notesStyles.li} key={`${note.id}${note.course != null ? "_" + note.course : null}`}>
                            <h3><Link href={`/notes/${note.id}`}>{note.title}</Link></h3>
                            <p>Author: {note.author}</p>
                            {note.date}
                            <NoteTags note={note}></NoteTags>
                            {/* <p>Course: {course}</p>
                            <p>Unit: {unit}</p>
                            <p>Author: {author}</p> */}
                        </li>
                    ))}
                </ul>
            </div>

            {/* <Footer>
            </Footer> */}
        </main>
    )
}
