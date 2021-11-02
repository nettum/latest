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
    color: #e5383b;
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
        <MainHeader><span>Hello</span>, my name is <span><a href="https://internettum.no" target="_blank" rel="noopener noreferrer">Marius</a></span></MainHeader>
        <SubHeader>Here's what I've been up to lately</SubHeader>
      </Header>
      <Main>
        <Feed type="discogs" title="Check out the latest <a href='https://www.discogs.com/user/wwmd/collection?limit=250&sort=added&header=1&sort_order=desc&layout=big' target='_blank' rel='noopener noreferrer'>music</a> I bought" />
        <Feed type="episodes" title="The latest <a href='https://trakt.tv/users/internettum/history/episodes' target='_blank' rel='noopener noreferrer'>tv-shows</a> I binged" />
        <Feed type="movies" title="The latest <a href='https://trakt.tv/users/internettum/history/movies' target='_blank' rel='noopener noreferrer'>movies</a> I watched" />
        <Feed type="spotify" title="The latest <a href='https://open.spotify.com/user/wwmd?si=1559d1d1c9f14270' target='_blank' rel='noopener noreferrer'>music</a> I've streamed" />
        <Feed type="gigs" title="The latest <a href='https://gigs.internettum.no/' target='_blank' rel='noopener noreferrer'>gigs</a> I've headbanged to" />
      </Main>
      <Footer>
        <p>
          All information is gathered through the following APIs:<br />&nbsp;
          <a href="https://www.discogs.com/developers" target="_blank" rel="noopener noreferrer">Discogs</a>,&nbsp;
          <a href="https://trakt.docs.apiary.io/" target="_blank" rel="noopener noreferrer">Trakt</a>,&nbsp;
          <a href="https://developers.themoviedb.org/" target="_blank" rel="noopener noreferrer">TMDB</a>,&nbsp;
          <a href="https://developer.spotify.com/documentation/web-api/" target="_blank" rel="noopener noreferrer">Spotify</a>,&nbsp;
          <a href="https://www.sanity.io/docs/datastore" target="_blank" rel="noopener noreferrer">Sanity</a>
        </p>
        <p>Hosting by <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer">Vercel</a></p>
      </Footer>
    </Wrapper>
  );
}

export default App;
