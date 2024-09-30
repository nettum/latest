import FeedItem from "@/app/(web)/FeedItem";
import { FeedItemType, FeedType } from "@/app/types/feed";
import styles from "./feed.module.css";

type Props = {
  type: FeedType;
  title: string;
};

export default async function Feed({ type, title }: Props) {
  const data = await fetch(`${process.env.VERCEL_ENV === "development" ? "http://" : "https://"}${process.env.VERCEL_PROJECT_PRODUCTION_URL}/${type}`);
  const items: FeedItemType[] = await data.json();

  return (
    <section className={styles.feed}>
      <h3 dangerouslySetInnerHTML={{ __html: title }}></h3>
      <ul>
        {items.map((item) => (
          <FeedItem key={item.id} type={type} {...item} />
        ))}
      </ul>
    </section>
  );
}
