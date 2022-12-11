const express = require('express');
var router = express.Router();

const {
  GetPresentationById,
  GetPresentations,
  CreatPresentation,
  EditPresentaion,
  DeletePresentation,
} = require('./prensentationService');

router.get('/', (req, res) => GetPresentations(req, res));
router.get('/:id', (req, res) => GetPresentationById(req, res));
router.post('/create', (req, res) => CreatPresentation(req, res));
router.delete('/delete/:id', (req, res) => DeletePresentation(req, res));
router.post('/edit/:id', (req, res) => EditPresentaion(req, res));

module.exports = router;
