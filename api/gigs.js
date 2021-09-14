const sanityClient = require('@sanity/client');
const imageUrlBuilder = require('@sanity/image-url');

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2021-09-14',
  token: '',
  useCdn: true,
});

const builder = imageUrlBuilder(client)

const formatResponse = async items => {
  let formattedResponse = [];

  for (let item of items) {
    let poster = '/missing-image.png';
    if (item.concertImage) {
      poster = builder.image(item.concertImage).width(400).url();
    }
    formattedResponse.push({
      id: item.slug,
      title: item.artist,
      subtitle: item.venue,
      link: '#',
      poster: poster,
    });
  }

  return formattedResponse;
};

module.exports = async (req, res) => {
  const query = `
    *[_type == "gig"]|order(concertDate desc) {
    artist,
    "slug": slug.current,
    concertImage,
    concertDate,
    "venue": venue->name
    }[0...4]
  `;

  const response = await client.fetch(query);
  const returnedJson = await formatResponse(response);

  res.setHeader('Cache-Control', 's-maxage=3600');
  return res.status(200).json(returnedJson);
};
