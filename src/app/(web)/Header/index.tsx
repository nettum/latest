import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>
        <span>Hello</span>, my name is{" "}
        <span>
          <a href="https://internettum.no" target="_blank" rel="noopener noreferrer">
            Marius
          </a>
        </span>
      </h1>
      <h2>Here&apos;s what I&apos;ve been up to lately</h2>
    </header>
  );
}
