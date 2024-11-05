import express from 'express';
import commentRoute from './routes/commentRoute';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json({ message: 'routes: comments' });
});

router.use('/comments', commentRoute);

export default router;
