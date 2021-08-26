import Feed from './Feed';

const App = () => {
  return (
    <div className="container">
      <header>
        <h1>Hello, my name is Marius</h1>
      </header>
      <main>
        <Feed type="discogs" title="Check out the latest music I bought" />
        <Feed type="episodes" title="The latest tv-shows I saw" />
        <Feed type="movies" title="The latest movie I watched" />
      </main>
    </div>
  );
}

export default App;
