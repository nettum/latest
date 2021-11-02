const fetch = require('node-fetch');

const formatResponse = async items => {
  let formattedResponse = [];

  for (let item of items) {
    let poster = '/missing-image.png';
    if (item.media.count >= 1) {
      poster = item.media.items[0].photo.photo_img_md
    }
    formattedResponse.push({
      id: item.checkin_id,
      title: item.beer.beer_name,
      subtitle: item.brewery.brewery_name,
      link: `https://untappd.com/user/internettum/checkin/${item.checkin_id}`,
      poster: poster
    });
  }

  return formattedResponse;
};

module.exports = async (req, res) => {
  if (process.env.VERCEL_ENV === 'development') {
    const json = require('./../mockdata/untappd.json');
    return res.status(200).json(json);
  }

  const response = await fetch(`https://api.untappd.com/v4/user/checkins/internettum?client_id=${process.env.UNTAPPD_CLIENT_ID}&client_secret=${process.env.UNTAPPD_CLIENT_SECRET}&limit=4`);
  const json = await response.json();
  const returnedJson = await formatResponse(json.response.checkins.items);

  res.setHeader('Cache-Control', 's-maxage=900');
  return res.status(200).json(returnedJson);
};
