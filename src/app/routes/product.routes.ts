import express from 'express';

const router = express.Router();

router.get('/', async (_req, res) => {
  return fetch('https://dummyjson.com/products')
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json({ data });
    });
});

export default router;
