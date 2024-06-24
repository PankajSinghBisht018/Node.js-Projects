import Url from '../models/url.js';
import { nanoid } from 'nanoid'; 

export const createShortUrl = async (req, res) => {
  const { originalUrl } = req.body;
  try {
    let url = await Url.findOne({ originalUrl });
    if (url) {
      res.json(url);
    } else {
      const shortUrl = nanoid(7); 
      url = new Url({ originalUrl, shortUrl });
      await url.save();
      res.json(url);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error at createShortUrl' });
  }
};

export const getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find();
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error at getAllUrls' });
  }
};

export const redirectToOriginalUrl = async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const url = await Url.findOne({ shortUrl });
    if (url) {
      res.redirect(url.originalUrl);
    } else {
      res.status(404).json({ error: 'No URL found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error at redirectToOriginalUrl' });
  }
};
