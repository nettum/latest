
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { type } = req.query;

  if (['episodes', 'movies'].includes(type) === false) {
    return res.status(400).json({error: 'Invalid type specified'});
  }

  const response = await fetch(`https://api.trakt.tv/users/internettum/history/${type}/`, {
    headers: {
      'Content-Type': 'application/json',
      'trakt-api-version': 2,
      'trakt-api-key': process.env.TRAKT_CLIENT_ID,
    },
  });

  const json = await response.json();
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  return res.status(200).json(json.slice(0, 3));
};

