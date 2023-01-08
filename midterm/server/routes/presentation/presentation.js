const express = require('express');
var router = express.Router();

const {
  GetPresentationById,
  GetMyPresentations,
  CreatPresentation,
  EditPresentaion,
  DeletePresentation,
} = require('./prensentationService');

router.get('/', (req, res) => GetMyPresentations(req, res));
router.get('/:id', (req, res) => GetPresentationById(req, res));
router.post('/create', (req, res) => CreatPresentation(req, res));
router.patch('/edit/:id', (req, res) => EditPresentaion(req, res));
router.delete('/delete/:id', (req, res) => DeletePresentation(req, res));

module.exports = router;
