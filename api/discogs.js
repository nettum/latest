const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const discogsRes = await fetch(`https://api.discogs.com/users/wwmd/collection/folders/1/releases?sort=added&sort_order=desc&token=${process.env.DISCOGS_TOKEN}`);
  const discogsJson = await discogsRes.json();
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  res.status(200).json(discogsJson);
};
