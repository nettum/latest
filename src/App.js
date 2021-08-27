import Feed from './Feed';
import styled, { createGlobalStyle } from 'styled-components';

const App = () => {

  const GlobalStyles = createGlobalStyle`
    body {
      padding: 0;
      background: blue;
    }
    ul, ol {
      list-style: none;
    }
  `;

  const Wrapper = styled.div`
    max-width: 1280px;
    margin: 0 auto;
  `;

  const Header = styled.header`
    background: red;
    span {
      color: yellow;
    }
  `;

  const  Main = styled.main`
    background: green;
  `;

  const MainHeader = styled.h1``;

  const SubHeader = styled.h2``;

  return (
    <Wrapper>
      <GlobalStyles />
      <Header>
        <MainHeader>Hello, my name is <span>Marius</span></MainHeader>
        <SubHeader>Here's what I've been up to lately</SubHeader>
      </Header>
      <Main>
        <Feed type="discogs" title="Check out the latest music I bought" />
        <Feed type="episodes" title="The latest tv-shows I saw" />
        <Feed type="movies" title="The latest movie I watched" />
      </Main>
    </Wrapper>
  );
}

export default App;
