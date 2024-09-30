import { FeedType } from "@/app/types/feed";
import feedStyles from "@/app/(web)/Feed/feed.module.css";
import itemStyles from "@/app/(web)/FeedItem/feedItem.module.css";

type Props = {
  type: FeedType;
  title: string;
};

export default function Placeholder({ type, title }: Props) {
  return (
    <section className={feedStyles.feed}>
      <h3 dangerouslySetInnerHTML={{ __html: title }}></h3>
      <ul>
        {["", "", "", ""].map((_element, key) => (
          <li key={`${type}${key}`} className={`${itemStyles.feedItem} ${itemStyles.placeholder}`}>
            <figure className={itemStyles[type]}></figure>
            <div>
              <h4>&nbsp;</h4>
              <h5>&nbsp;</h5>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
