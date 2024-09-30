import { FeedItemType, FeedType } from "@/app/types/feed";
import styles from "./feedItem.module.css";

type PropsType = FeedItemType & { type: FeedType };

export default function FeedItem({ type, id, title, subtitle, link, poster }: PropsType) {
  return (
    <li key={id} className={styles.feedItem}>
      <a href={link}>
        <figure className={styles[type]}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={poster} alt={`${title} poster`} />
        </figure>
        <div>
          <h4 title={title}>{title}</h4>
          <h5 title={subtitle}>{subtitle}</h5>
        </div>
      </a>
    </li>
  );
}
