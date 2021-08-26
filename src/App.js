import Feed from './Feed';

const App = () => {
  return (
    <div className="container">
      <header>
        <h1>Hello, my name is Marius</h1>
      </header>
      <main>
        <Feed type="discogs" title="Check out the latest music I bought" />
      </main>
    </div>
  );
}

export default App;
