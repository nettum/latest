import { useEffect, useState } from 'react';

const Feed = (props) => {
  const { type, title } = props;
  const [ items, setItems ] = useState(null);

  useEffect(() => {
    const fetchData = async (type) => {
      let endpoint = `/api/${type}`;
      if (type === 'episodes' || type === 'movies') {
        endpoint = `/api/trakttv?type=${type}`;
      }
      const response = await fetch(endpoint);
      const json = await response.json();
      setItems(json);
    }
    fetchData(type);
  }, [type]);

  const renderItem = (item) => {
    if (type === 'discogs') {
      return (<li key={item.basic_information.id}>
        <a href={`https://www.discogs.com/release/${item.basic_information.id}`}>
          <img src={item.basic_information.thumb} alt={`${item.basic_information.title} album cover`} />
          <h4>{item.basic_information.title}</h4>
          <h5>{item.basic_information.artists[0].name}</h5>
        </a>
      </li>);
    }

    if (type === 'episodes' || type === 'movies') {
      return (<li key={item.id}>
        <a href={item.link}>
        <img src={item.poster} alt={`${item.title} poster`} />
          <h4>{item.title}</h4>
          <h5>{item.subtitle}</h5>
        </a>
      </li>);
    }

    return null;
  };

  return (
    <section>
      <h3>{title}</h3>
      {items && items.length > 0 && (
        <ul>
          {items.map(item => renderItem(item))}
        </ul>
      )}
    </section>
  );
};

export default Feed;
