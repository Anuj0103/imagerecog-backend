const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY,
});

module.exports = async (req, res) => {
  try {
    const data = await app.models.predict('face-detection', req.body.input);
    console.log('Clarifai Response:', data);
    res.json(data);
  } catch (err) {
    console.error('Clarifai API Error:', err);
    res.status(400).json('Unable to work with API');
  }
};
