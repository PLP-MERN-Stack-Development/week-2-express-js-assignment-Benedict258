const express = require('express');
const Product = require('../models/Product');
const { validateProduct } = require('../middleware/validateProduct');
const auth = require('../middleware/auth');
const router = express.Router();

// GET all products (with filter/search/pagination)
router.get('/', async (req, res) => {
  const { category, search, page = 1, limit = 10 } = req.query;
  const query = {};

  if (category) query.category = category;
  if (search) query.name = { $regex: search, $options: 'i' };

  const skip = (page - 1) * limit;
  const total = await Product.countDocuments(query);
  const products = await Product.find(query).skip(skip).limit(parseInt(limit));

  res.json({
    total,
    page: parseInt(page),
    perPage: parseInt(limit),
    data: products
  });
});

// GET product by ID
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// POST new product
router.post('/', auth, validateProduct, async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});

// PUT update product
router.put('/:id', auth, validateProduct, async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// DELETE product
router.delete('/:id', auth, async (req, res) => {
  const result = await Product.findByIdAndDelete(req.params.id);
  if (!result) return res.status(404).json({ error: 'Product not found' });
  res.status(204).send();
});

// STATS route
router.get('/stats/categories', async (req, res) => {
  const stats = await Product.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } }
  ]);
  res.json(stats);
});

module.exports = router;
