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
  figure {
    padding-top: 100%;
  }
  figure.movies, figure.episodes {
    padding-top: 150%;
  }
  figure.gigs {
    padding-top: 75%;
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
    transition: all 0.8s ease-out;
    :hover {
      transform: scale(1.1);
      opacity: 0.75;
    }
  }
  div {
    margin-top: 0.5rem;
  }
`;

const SectionItem = styled.li`
  h4 {
    color: #d3d3d3;
  }
  h5 {
    color: #e5383b;
  }
  &.placeholder {
    figure, h4, h5 {
      animation-duration: 1.25s;
      animation-fill-mode: forwards;
      animation-iteration-count: infinite;
      animation-name: placeholderAnim;
      animation-timing-function: linear;
      position: relative;
      background: linear-gradient(to right, #b2b2b2 10%, #d3d3d3 18%, #b2b2b2 33%);
      background-size: 800px 100px;
    }
    h4 {
      width: 200px;
    }
    h5 {
      width: 125px;
    }
  }
  @keyframes placeholderAnim {
    0%{
        background-position: -400px 0
    }
    100%{
        background-position: 400px 0
    }
  }
`;

const Feed = (props) => {
  const { type, title } = props;
  const [ items, setItems ] = useState(null);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    const fetchData = async (type) => {
      setLoading(true);
      let endpoint = `/api/${type}`;
      if (type === 'episodes' || type === 'movies') {
        endpoint = `/api/trakttv?type=${type}`;
      }
      const response = await fetch(endpoint);
      const json = await response.json();
      setItems(json);
      setLoading(false);
    }
    fetchData(type);
  }, [type]);

  const renderItem = (item) => {
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
  };

  const renderPlaceholders = () => {
    const elements = ['', '', '', ''];
    return elements.map((element, key) => {
      return (<SectionItem key={`${type}${key}`} className="placeholder">
        <figure className={type}></figure>
        <div>
          <h4>&nbsp;</h4>
          <h5>&nbsp;</h5>
        </div>
      </SectionItem>);
    })
  };

  return (
    <Section>
      <SectionHeader dangerouslySetInnerHTML={{__html: title}} />
      <SectionList>
        {loading && renderPlaceholders()}
        {!loading && items && items.length > 0 && items.map(item => renderItem(item))}
      </SectionList>
    </Section>
  );
};

export default Feed;
