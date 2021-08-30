import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  margin: 2rem 0;
`;

const SectionHeader = styled.h3`
  font-size: 1.2em;
  @media(min-width: 768px) {
    font-size: 1.5em;
  }
  margin-bottom: 0.5rem;
  a {
    font-family: 'Pacifico', cursive;
    font-weight: 400;
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
  figure {
    display: block;
    position: relative;
    width: 100%;
    height: auto;
    overflow: hidden;

  }
  figure.discogs {
    padding-top: 100%;
  }
  figure.movies, figure.episodes {
    padding-top: 150%;
  }
  img {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  div {
    margin-top: 0.5rem;
  }
`;

const SectionItem = styled.li`
  h4 {
    color: #61a5c2;
  }
  h5 {
    color: #e5383b;
  }
`;

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
      return (<SectionItem key={item.basic_information.id}>
        <a href={`https://www.discogs.com/release/${item.basic_information.id}`}>
          <figure className={type}>
            <img src={item.basic_information.cover_image} alt={`${item.basic_information.title} album cover`} />
          </figure>
          <div>
            <h4>{item.basic_information.title}</h4>
            <h5>{item.basic_information.artists[0].name}</h5>
          </div>

        </a>
      </SectionItem>);
    }

    if (type === 'episodes' || type === 'movies') {
      return (<SectionItem key={item.id}>
        <a href={item.link}>
        <figure className={type}>
            <img src={item.poster} alt={`${item.title} poster`} />
          </figure>
          <div>
            <h4>{item.title}</h4>
            <h5>{item.subtitle}</h5>
          </div>

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
