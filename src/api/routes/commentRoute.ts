import express from 'express';
import { body } from 'express-validator';
import { validate } from '../../middlewares';
import { commentPost, generateThumbnail } from '../controllers/commentController';

const router = express.Router();

router.post('/', body('text').notEmpty().escape(), validate, commentPost);

router.post('/generate-thumbnail', body('prompt').notEmpty().escape(), validate, generateThumbnail);

export default router;
