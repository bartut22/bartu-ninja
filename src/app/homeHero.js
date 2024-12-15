"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Josefin_Sans } from 'next/font/google';
const josefin_sans = Josefin_Sans({ subsets: ['latin'] });
import styles from './homeHero.module.css';
import Navbar from './navbar'; // Assuming you have a Navbar component

export default function HomeHeroWrapper() {
    const [loadSketch, setLoadSketch] = useState(false);

    const handleLoadSketch = () => {
        setLoadSketch(true);
    };

    useEffect(() => {
        handleLoadSketch();
    }, []);

    const HeroSketchWrapper = loadSketch ? dynamic(() => import('./sketch'), { ssr: false }) : null;

    return (
        <div className={styles.hero}>
            {/* <!--
                background with moving shapes with my name as text in the front
                maybe the moving shapes can react to mouse?
                100vw, 100vh
            -->*/}

            {HeroSketchWrapper && <HeroSketchWrapper />}

            <Navbar onLinkClick={handleLoadSketch} />

            <div className={styles.heroFg}>
                <h1 className={`${styles.heroTitle} ${josefin_sans.className}`}>Bartu</h1>
                <Link href="#projects" tabIndex={0} className={styles.heroBtn} onClick={handleLoadSketch}>Go to my projects</Link>
                <Link href="/notes" tabIndex={1} className={styles.heroBtn}>See my class notes</Link>
            </div>
        </div>
    );
}