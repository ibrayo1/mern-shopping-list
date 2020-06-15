const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @desc GET all Items
// @access Public
router.get('/', function(req, res){
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
        .catch(err => res.status(400).json(err));
});

// @route POST api/items
// @desc Create An Item
// @access Public
router.post('/', function(req, res){
    const newItem = new Item({
        name: req.body.name,
    });

    newItem.save()
        .then(item => res.json(item))
        .catch(err => res.status(400).json(err));
});

// @route DELETE api/items/:id
// @desc Delete An Item
// @access Public
router.delete('/:id', function(req, res){
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;