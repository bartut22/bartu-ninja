import styles from '@/app/page.module.css';
import noteStyles from '../../note.module.css';
import Navbar from '@/app/navbar';
import Footer from '@/app/footer';
import { getAllNoteIds, getNote, setFileNames } from '@/app/../../lib/notes';
import Date from '@/app/date';
import NoteTags from '@/app/noteTags';

export async function generateMetadata({ params }, parent) {
    // read route params
    const { id } = await params;

    // fetch data
    const note = await getNote(id);

    return {
        title: `${note.title} | Bartu.ninja`,
        description: note.description ?? "My portfolio and class notes (:",
    }
}


export async function generateStaticParams() {
    await setFileNames();
    return getAllNoteIds();
}

export default async function Note({ params }) {
    const { id } = await params;
    const note = await getNote(id);

    return (
        <main className={styles.main}>
            <Navbar>
            </Navbar>

            <div className={noteStyles.note}>
                <h1>{note.title}</h1>
                <div className={noteStyles.author}>
                    <p>By {note.author}</p>
                </div>
                <div className={noteStyles.date}>
                    <Date dateString={note.date} />
                </div>
                <br></br>
                <NoteTags note={note}></NoteTags>
                <br></br>
                <div dangerouslySetInnerHTML={{ __html: note.contentHtml }} />

            </div>

            <Footer>
            </Footer>
        </main>
    );
}