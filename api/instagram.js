const fetch = require('node-fetch');
const imageToBase64 = require('image-to-base64');

const formatResponse = async items => {
  let formattedResponse = [];

  for (let item of items) {
    let poster = '/missing-image.png';
    if (item.node.thumbnail_resources.length >= 4) {
      const base64 = await imageToBase64(item.node.thumbnail_resources[4].src);
      poster = `data:image/jpeg;base64,${base64}`;
    }
    formattedResponse.push({
      id: item.node.shortcode,
      title: item.node.edge_media_to_caption.edges[0].node.text,
      subtitle: `${item.node.edge_liked_by.count} likes, ${item.node.edge_media_to_comment.count}  comments`,
      link: `https://www.instagram.com/p/${item.node.shortcode}/`,
      poster: poster
    });
  }

  return formattedResponse;
};

module.exports = async (req, res) => {
  if (process.env.VERCEL_ENV === 'development') {
    const json = require('./../mockdata/instagram.json');
    return res.status(200).json(json);
  }

  const response = await fetch(`https://www.instagram.com/internettum/?__a=1`);
  const json = await response.json();
  const posts = json.graphql.user.edge_owner_to_timeline_media.edges.slice(0, 4);
  const returnedJson = await formatResponse(posts);

  res.setHeader('Cache-Control', 's-maxage=3600');
  return res.status(200).json(returnedJson);
};
