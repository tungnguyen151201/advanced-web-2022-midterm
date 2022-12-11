const express = require('express');
const router = express.Router();

const {
  GetSlides,
  GetSlideById,
  CreateSlide,
  EditSlide,
  DeleteSlide,
} = require('./slidesService');

router.get('/getSlides', (req, res) => GetSlides(req, res));
router.get('/:slideId', (req, res) => GetSlideById(req, res));
router.post('/create', (req, res) => CreateSlide(req, res));
router.delete('/delete/:id', (req, res) => DeleteSlide(req, res));
router.post('/edit/:sildeId', (req, res) => EditSlide(req, res));

module.exports = router;
