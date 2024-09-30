import FeedItem from "@/app/(web)/FeedItem";
import { FeedItemType, FeedType } from "@/app/types/feed";
import styles from "./feed.module.css";

type Props = {
  type: FeedType;
  title: string;
};

const getData = async (type: FeedType): Promise<FeedItemType[]> => {
  "use server";
  const feedImporter = await import(`@/app/(actions)/${type}`);
  return feedImporter.getData();
};

export default async function Feed({ type, title }: Props) {
  const data = await getData(type);

  return (
    <section className={styles.feed}>
      <h3 dangerouslySetInnerHTML={{ __html: title }}></h3>
      <ul>
        {data.map((item) => (
          <FeedItem key={item.id} type={type} {...item} />
        ))}
      </ul>
    </section>
  );
}
