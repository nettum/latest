
const fetch = require('node-fetch');

const formatResponse = async (items, type) => {
  let formattedResponse = [];
  if (type === 'movies') {
    for (let item of items) {
      let poster = '/missing-image.png';
      if (item.movie.ids.tmdb) {
        const tmdbResponse = await fetch(`https://api.themoviedb.org/3/movie/${item.movie.ids.tmdb}?api_key=${process.env.TMDB_API_KEY}`);
        const tmdbJson = await tmdbResponse.json();
        if (tmdbJson.poster_path) {
          poster = `https://image.tmdb.org/t/p/w500${tmdbJson.poster_path}`
        }
      }
      formattedResponse.push({
        id: item.id,
        title: item.movie.title,
        subtitle: item.movie.year,
        link: `https://trakt.tv/movies/${item.movie.ids.slug}`,
        poster: poster
      })
    }
  }

  if (type === 'episodes') {
    for (let item of items) {
      let poster = '/missing-image.png';
      if (item.show.ids.tmdb) {
        const tmdbResponse = await fetch(`https://api.themoviedb.org/3/tv/${item.show.ids.tmdb}?api_key=${process.env.TMDB_API_KEY}`);
        const tmdbJson = await tmdbResponse.json();
        if (tmdbJson.poster_path) {
          poster = `https://image.tmdb.org/t/p/w500${tmdbJson.poster_path}`
        }
      }
      const season = `${(item.episode.season.toString().length === 1 ? '0' : '')}${item.episode.season}`;
      const epsiode = `${(item.episode.number.toString().length === 1 ? '0' : '')}${item.episode.number}`;
      formattedResponse.push({
        id: item.id,
        title: `${season}x${epsiode} - ${item.episode.title}`,
        subtitle: item.show.title,
        link: `https://trakt.tv/shows/${item.show.ids.slug}/seasons/${item.episode.season}/episodes/${item.episode.number}`,
        poster: poster
      })
    }
  }

  return formattedResponse;
};

module.exports = async (req, res) => {
  const { type } = req.query;

  if (['episodes', 'movies'].includes(type) === false) {
    return res.status(400).json({error: 'Invalid type specified'});
  }

  if (process.env.VERCEL_ENV === 'development') {
    const json = require(`./../mockdata/${type}.json`);
    return res.status(200).json(json);
  }

  const response = await fetch(`https://api.trakt.tv/users/internettum/history/${type}/`, {
    headers: {
      'Content-Type': 'application/json',
      'trakt-api-version': 2,
      'trakt-api-key': process.env.TRAKT_CLIENT_ID,
    },
  });

  const json = await response.json();
  const returnedJson = await formatResponse(json.slice(0, 4), type);

  res.setHeader('Cache-Control', 's-maxage=3600');
  return res.status(200).json(returnedJson);
};

