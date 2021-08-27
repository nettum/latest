import { useEffect, useState } from 'react';
import styled from 'styled-components';

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

  const Section = styled.section`
    margin: 2rem 0;
  `;
  const SectionHeader = styled.h3`
    margin-bottom: 0.5rem;
    a {
      color: #e5383b;
    }
  `;
  const SectionList = styled.ul`
    display: grid;
    grid-gap: 2rem 1rem;
    @media(min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media(min-width: 1024px) {
      grid-template-columns: repeat(4, 1fr);
    }
  `;
  const SectionItem = styled.li`

  `;

  const renderItem = (item) => {
    if (type === 'discogs') {
      return (<SectionItem key={item.basic_information.id}>
        <a href={`https://www.discogs.com/release/${item.basic_information.id}`}>
          <img src={item.basic_information.cover_image} alt={`${item.basic_information.title} album cover`} />
          <h4>{item.basic_information.title}</h4>
          <h5>{item.basic_information.artists[0].name}</h5>
        </a>
      </SectionItem>);
    }

    if (type === 'episodes' || type === 'movies') {
      return (<SectionItem key={item.id}>
        <a href={item.link}>
        <img src={item.poster} alt={`${item.title} poster`} />
          <h4>{item.title}</h4>
          <h5>{item.subtitle}</h5>
        </a>
      </SectionItem>);
    }

    return null;
  };

  return (
    <Section>
      <SectionHeader dangerouslySetInnerHTML={{__html: title}} />
      {items && items.length > 0 && (
        <SectionList>
          {items.map(item => renderItem(item))}
        </SectionList>
      )}
    </Section>
  );
};

export default Feed;
