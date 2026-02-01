import Link from 'next/link';
import styles from './navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

{/* <ul class="navul">
<li class="navli"><a href="#top">Home</a></li>
<li class="navli"><a href="#projects">Projects</a></li>
<li class="navli"><a href="#about">About me</a></li>
<li class="navli"><a href="/notes">Notes</a></li>
<li class="navli"><a target="_blank" href="https://github.com/avocado5182">My GitHub&nbsp;&nbsp;<i
            class="fa-solid fa-up-right-from-square"></i></a></li>
</ul> */}

let links = [
    { href: '/#top', label: 'Home', newTab: false, icon: null },
    { href: '/#projects', label: 'Projects', newTab: false, icon: null },
    { href: '/#about', label: 'About me', newTab: false, icon: null },
    { href: '/notes', label: 'Notes', newTab: false, icon: null },
    { href: 'https://github.com/bartut22', label: 'My GitHub', newTab: true, icon: faUpRightFromSquare },
];

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navul} id="top">
                {links.map(({ href, label, newTab, icon }) => (
                    <li className={styles.navli} key={label}>
                        {newTab
                            ? <a href={href} target="_blank">
                                {icon ? <p>{label}  <FontAwesomeIcon icon={icon}></FontAwesomeIcon></p> : <p>{label}</p>}
                            </a>
                            : <Link href={href}>
                                {icon ? <p>{label}  <FontAwesomeIcon icon={icon}></FontAwesomeIcon></p> : <p>{label}</p>}
                            </Link>}
                    </li>
                ))}
            </ul>
        </nav>
    );
}