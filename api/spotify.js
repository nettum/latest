const fetch = require('node-fetch');

const getAccessToken = async () => {
  const baseAuthToken = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: process.env.SPOTIFY_REFRESH_TOKEN
  });

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${baseAuthToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  const json = response.json();
  return json;
};

const formatResponse = async items => {
  let formattedResponse = [];

  for (let item of items) {
    let poster = '/missing-image.png';
    if (item.track.album.images[0]) {
      poster = item.track.album.images[0].url;
    }
    formattedResponse.push({
      id: item.track.id,
      title: item.track.name,
      subtitle: item.track.artists[0].name,
      link: item.track.external_urls.spotify,
      poster: poster
    });

  }

  return formattedResponse;
};

module.exports = async (req, res) => {
  if (process.env.VERCEL_ENV === 'development') {
    const json = require('./../mockdata/spotify.json');
    return res.status(200).json(json);
  }

  const accessToken  = await getAccessToken();
  const response = await fetch('https://api.spotify.com/v1/me/player/recently-played', {
    headers: {
      Authorization: `Bearer ${accessToken.access_token}`
    }
  });

  const json = await response.json();
  const returnedJson = await formatResponse(json.items.slice(0, 4));

  res.setHeader('Cache-Control', 's-maxage=300');
  return res.status(200).json(returnedJson);
};
