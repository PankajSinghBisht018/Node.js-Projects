import express from 'express';
import { createShortUrl, getAllUrls, redirectToOriginalUrl } from '../controllers/urlController.js'; 

const router = express.Router();

router.post('/shorten', createShortUrl);
router.get('/', getAllUrls);
router.get('/:shortUrl', redirectToOriginalUrl);

export default router;
