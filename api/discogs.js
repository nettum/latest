const fetch = require('node-fetch');

const formatResponse = async items => {
  let formattedResponse = [];

  for (let item of items) {
    let poster = '/missing-image.png';
    if (item.basic_information.cover_image) {
      poster = item.basic_information.cover_image;
    }
    const subtitle = item.basic_information.artists[0].name.replace(/\(\d+\)$/, '');
    formattedResponse.push({
      id: item.basic_information.id,
      title: item.basic_information.title,
      subtitle: subtitle,
      link: `https://www.discogs.com/release/${item.basic_information.id}`,
      poster: poster
    });
  }

  return formattedResponse;
};

module.exports = async (req, res) => {
  if (process.env.VERCEL_ENV === 'development') {
    const json = require('./../mockdata/discogs.json');
    return res.status(200).json(json);
  }

  const response = await fetch(`https://api.discogs.com/users/wwmd/collection/folders/1/releases?per_page=4&sort=added&sort_order=desc&token=${process.env.DISCOGS_TOKEN}`);
  const json = await response.json();
  const returnedJson = await formatResponse(json.releases);

  res.setHeader('Cache-Control', 's-maxage=3600');
  return res.status(200).json(returnedJson);
};
