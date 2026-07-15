import Image from "next/image"
import Link from "next/link"
import styles from "./carouselCell.module.css"
// markdown parser and parse description
import { remark } from "remark"
import html from "remark-html"

export default async function CarouselCell(props) {
    // if props is undefined, what do we do?
    // if props is undefined, we can't render the component
    // so we return null
    if (!props) {
        return null;
    }
    // let description = await remark()
    //     .use(html)
    //     .process(props.description);
    // description = description.toString();

    return (
        <div className={styles.carouselCell}>
            <Image className={styles.carouselCellImg} alt="A photo of me" src={props.image}></Image>
            <div className={styles.carouselCellText}>
                <Link target="_blank" href={props.link}>
                    <h1>{props.title}</h1>
                </Link>
                <div dangerouslySetInnerHTML={{__html: props.description}}></div>
            </div>
        </div>
    )
}