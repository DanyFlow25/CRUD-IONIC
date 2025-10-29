const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET /api/items - list
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/items/:id
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/items
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: 'name required' });
    const it = new Item({ name, description });
    await it.save();
    res.status(201).json(it);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/items/:id
router.put('/:id', async (req, res) => {
  try {
    const { name, description } = req.body;
    const it = await Item.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );
    if (!it) return res.status(404).json({ error: 'Not found' });
    res.json(it);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/items/:id
router.delete('/:id', async (req, res) => {
  try {
    const it = await Item.findByIdAndDelete(req.params.id);
    if (!it) return res.status(404).json({ error: 'Not found' });
    res.json({ deleted: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
