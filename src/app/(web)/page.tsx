import Header from "@/app/(web)/Header";
import Feed from "@/app/(web)/Feed";
import Placeholder from "@/app/(web)/Placeholder";
import { FeedType } from "@/app/types/feed";
import styles from "./page.module.css";
import { Suspense } from "react";

const feeds: { type: FeedType; title: string }[] = [
  { type: "discogs", title: `&#127926; Check out the latest <a href='https://www.discogs.com/user/${process.env.DISCOGS_USERNAME}/collection?limit=250&sort=added&header=1&sort_order=desc&layout=big' target='_blank' rel='noopener noreferrer'>music</a> I bought` },
  { type: "trakttv", title: `&#128250; The latest <a href='https://trakt.tv/users/${process.env.TRAKT_USERNAME}/history/episodes' target='_blank' rel='noopener noreferrer'>tv-shows</a> I binged` },
  { type: "traktmovies", title: `&#127916; The latest <a href='https://trakt.tv/users/${process.env.TRAKT_USERNAME}/history/movies' target='_blank' rel='noopener noreferrer'>movies</a> I watched` },
  { type: "spotify", title: `&#127911; The latest <a href='https://open.spotify.com/user/${process.env.SPOTIFY_USERNAME}?si=1559d1d1c9f14270' target='_blank' rel='noopener noreferrer'>music</a> I've streamed` },
  { type: "gigs", title: "&#129304; The latest <a href='https://gigs.internettum.no/' target='_blank' rel='noopener noreferrer'>gigs</a> I've headbanged to" },
  { type: "untappd", title: `&#127867; The latest <a href='https://untappd.com/user/${process.env.UNTAPPD_USERNAME}' target='_blank' rel='noopener noreferrer'>beers</a> I've tasted` },
  { type: "strava", title: `&#128517; The latest <a href='https://www.strava.com/athletes/${process.env.STRAVA_USERNAME}' target='_blank' rel='noopener noreferrer'>exercises</a> I've sweated through` },
];

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main>
        {feeds.map((feed) => (
          <Suspense key={`feed-${feed.type}`} fallback={<Placeholder type={feed.type} title={feed.title} />}>
            {<Feed {...feed} />}
          </Suspense>
        ))}
      </main>
    </div>
  );
}
