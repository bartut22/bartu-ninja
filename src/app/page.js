import { IBM_Plex_Mono, Mansalva } from "next/font/google";
import styles from "./page.module.css";

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const handwriting = Mansalva({
  subsets: ["latin"],
  weight: "400",
});

const links = [
  {
    label: "Email",
    href: "mailto:bet3@rice.edu",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="1.5" />
        <path d="M3.5 6.5 12 13l8.5-6.5" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/bartut22",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bartu-tunctan",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
    {
    label: "Resume",
    href: "/Bartu_Tunctan_Resume.pdf",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
  },
];

const projects = [
  { title: "Sightreed", href: "https://github.com/bartut22/sightreed", image: "sightreed_logo.png", date: "spring '26" },
  { title: "OwlQuest", href: "https://github.com/bartut22/owlquest", image: "owlquest.ico", date: "summer '26" },
  { title: "QuickPlaces", href: "https://github.com/bartut22/QuickPlaces", image: "quickplaces.png", date: "fall '24" },
  { title: "Battlecoin", href: "https://github.com/bartut22/battlecoin", image: "battlecoin.png", date: "sep. '26 | HackRice 16" },
  { title: "DevKit Projects", href: "https://github.com/bartut22/devkit-projects", image: "devkit.jpeg", date: "aug. '26 - now" },
];

const placeholderHues = [0, 60, 120, 180, 240, 300];
const tilts = [-3, 2, -1.5, 2.5, -2, 1.5];

export default function Home() {
  return (
    <main className={`${styles.page} ${mono.className}`}>
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.landing}>
        <section className={styles.card}>
          <div className={styles.photoWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.photo}
              src="/headshot.jpg"
              alt="Placeholder portrait of Bartu Tunctan"
              width="400"
              height="480"
            />
          </div>

          <div className={styles.info}>
            <h1 className={styles.name}>Bartu Tunctan</h1>

            <p className={styles.line}>📍 Houston, TX | Rice University</p>
            <p className={styles.line}>Computer Science, Undergraduate</p>

            <hr className={styles.rule} />

            <p className={styles.line}>
              <span className={styles.label}>Languages</span>
              English, Turkish
            </p>
            <p className={styles.line}>
              <span className={styles.label}>Hobbies</span>
              Saxophone, lifting, cooking, traveling
            </p>

            <ul className={styles.links}>
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    aria-label={l.label}
                    title={l.label}
                    // target={l.href.startsWith("http") ? "_blank" : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {l.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <section className={styles.projects} aria-label="Projects">
        <header className={styles.projectsHead}>
          <h2 className={styles.projectsTitle}>Projects</h2>
        </header>

        <ul className={styles.prints}>
          {projects.map((p, i) => {
            const print = (
              <figure className={styles.print}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={styles.clip} src="/clothespin.png" alt="" />
                <div className={styles.frame}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={styles.shot}
                    src={p.image || "/project-placeholder.svg"}
                    alt={p.image ? p.title : `${p.title} placeholder`}
                    style={
                      p.image ? undefined : { "--hue": `${placeholderHues[i]}deg` }
                    }
                    loading="lazy"
                  />
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={styles.polaroid} src="/polaroid.png" alt="" />
                <figcaption className={`${styles.caption} ${handwriting.className}`}>
                  {p.date && <span className={styles.projectDate}>{p.date}</span>}
                  <span className={styles.projectTitle}>{p.title}</span>
                </figcaption>
              </figure>
            );

            const external = p.href && /^https?:\/\//.test(p.href);

            return (
              <li
                key={p.title}
                className={styles.slot}
                style={{ "--i": i, "--tilt": `${tilts[i]}deg` }}
              >
                {p.href ? (
                  <a
                    className={styles.link}
                    href={p.href}
                    aria-label={p.title}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                  >
                    {print}
                  </a>
                ) : (
                  print
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}