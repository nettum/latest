import Feed from './Feed';
import styled, { createGlobalStyle } from 'styled-components';

const App = () => {

  const GlobalStyles = createGlobalStyle`
    body {
      background-color: #161a1d;
      color: #d3d3d3;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
    }
    html, body, h1, h2, h3, h4, h5, ul, ol, li {
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
    padding: 0 1rem;
  `;

  const Header = styled.header`

  `;

  const  Main = styled.main`
  `;

  const MainHeader = styled.h1`
  font-size: 2em;
  @media(min-width: 768px) {
    font-size: 4em;
  }
    span {
      color: #61a5c2;
    }
  `;

  const SubHeader = styled.h2`
  font-size: 1.5em;
    @media(min-width: 768px) {
      font-size: 2em;
    }
  `;

  return (
    <Wrapper>
      <GlobalStyles />
      <Header>
        <MainHeader>Hello, my name is <span>Marius</span></MainHeader>
        <SubHeader>Here's what I've been up to lately</SubHeader>
      </Header>
      <Main>
        <Feed type="discogs" title="Check out the latest <span>music</span> I bought" />
        <Feed type="episodes" title="The latest <span>tv-shows</span> I bindged" />
        <Feed type="movies" title="The latest <span>movies</span> I watched" />
      </Main>
    </Wrapper>
  );
}

export default App;
