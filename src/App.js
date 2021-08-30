import Feed from './Feed';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #161a1d;
    color: #d3d3d3;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }
  html, body, h1, h2, h3, h4, h5, ul, ol, li, figure {
    margin: 0;
    padding: 0;
  }
  ul, ol {
    list-style: none;
  }
  img {
    width: 100%;
    height: auto;
  }
  a, a:visited, a:hover, a:active {
    color: inherit;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`;

const Wrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
`;

const Header = styled.header``;

const MainHeader = styled.h1`
  font-size: 2em;
  line-height: 1.5em;
  @media(min-width: 768px) {
    font-size: 4em;
  }
  span {
    font-family: 'Pacifico', cursive;
    font-weight: 400;
    color: #61a5c2;
    &.alt-color {
      color: #e5383b;
    }
  }
`;

const SubHeader = styled.h2`
  font-size: 1.5em;
  @media(min-width: 768px) {
    font-size: 2em;
  }
`;

const  Main = styled.main``;

const Footer = styled.footer`
  font-size: 0.7em;
  text-align: center;
`;

const App = () => {
  return (
    <Wrapper>
      <GlobalStyles />
      <Header>
        <MainHeader><span>Hello</span>, my name is <span className="alt-color">Marius</span></MainHeader>
        <SubHeader>Here's what I've been up to lately</SubHeader>
      </Header>
      <Main>
        <Feed type="discogs" title="Check out the latest <a href='https://www.discogs.com/user/wwmd/collection?limit=250&sort=added&header=1&sort_order=desc' target='_blank' rel='noopener noreferrer'>music</a> I bought" />
        <Feed type="episodes" title="The latest <a href='https://trakt.tv/users/internettum/history/episodes' target='_blank' rel='noopener noreferrer'>tv-shows</a> I binged" />
        <Feed type="movies" title="The latest <a href='https://trakt.tv/users/internettum/history/movies' target='_blank' rel='noopener noreferrer'>movies</a> I watched" />
      </Main>
      <Footer>
        <p>All information is gathered through the following APIs:<br /> <a href="https://www.discogs.com/developers" target="_blank" rel="noopener noreferrer">Discogs</a>, <a href="https://trakt.docs.apiary.io/" target="_blank" rel="noopener noreferrer">Trakt</a>, <a href="https://developers.themoviedb.org/" target="_blank" rel="noopener noreferrer">TMDB</a></p>
        <p>Hosting by <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer">Vercel</a></p>
      </Footer>
    </Wrapper>
  );
}

export default App;
