const express = require('express');
const router = express.Router();

const {
  GetGroup,
  MyGroup,
  CreateGroup,
  EditGroup,
  DeleteGroup,
} = require('./groupsService');
router.get('/', (req, res) => GetGroup(req, res));
router.get('/mygroup', (req, res) => MyGroup(req, res));
router.post('/create', (req, res) => CreateGroup(req, res));
router.post('/edit/:id', (req, res) => EditGroup(req, res));
router.delete('/delete/:id', (req, res) => DeleteGroup(req, res));

module.exports = router;
