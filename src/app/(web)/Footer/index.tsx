import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>All information is gathered through the following APIs:</p>
      <p>
        &nbsp;
        <a href="https://www.discogs.com/developers" target="_blank" rel="noopener noreferrer">
          Discogs
        </a>
        ,&nbsp;
        <a href="https://trakt.docs.apiary.io/" target="_blank" rel="noopener noreferrer">
          Trakt
        </a>
        ,&nbsp;
        <a href="https://developers.themoviedb.org/" target="_blank" rel="noopener noreferrer">
          TMDB
        </a>
        ,&nbsp;
        <a href="https://developer.spotify.com/documentation/web-api/" target="_blank" rel="noopener noreferrer">
          Spotify
        </a>
        ,&nbsp;
        <a href="https://www.sanity.io/docs/datastore" target="_blank" rel="noopener noreferrer">
          Sanity
        </a>
        ,&nbsp;
        <a href="https://untappd.com/api/docs" target="_blank" rel="noopener noreferrer">
          Untappd
        </a>
        ,&nbsp;
        <a href="https://developers.strava.com/docs/reference/" target="_blank" rel="noopener noreferrer">
          Strava
        </a>
      </p>
      <p>
        Hosting by{" "}
        <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer">
          Vercel
        </a>
      </p>
    </footer>
  );
}
