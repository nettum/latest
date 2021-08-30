const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (process.env.VERCEL_ENV === 'development') {
    const json = require('./../mockdata/discogs.json');
    return res.status(200).json(json);
  }
  const response = await fetch(`https://api.discogs.com/users/wwmd/collection/folders/1/releases?sort=added&sort_order=desc&token=${process.env.DISCOGS_TOKEN}`);
  const json = await response.json();
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  return res.status(200).json(json.releases.slice(0, 4));
};
