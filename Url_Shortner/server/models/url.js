import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const UrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, default: () => `http://short.url/${nanoid(7)}` },
  date: { type: Date, default: Date.now },
});

export default mongoose.model('Url', UrlSchema);
