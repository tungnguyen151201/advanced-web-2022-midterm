const express = require('express');
const router = express.Router();

const {
  MyGroup,
  CreateGroup,
  EditGroup,
  DeleteGroup,
  GetGroupById,
  PromoteToCoowner,
  DemoteToMember,
  KickAMember,
} = require('./groupsService');

router.get('/mygroup', (req, res) => MyGroup(req, res));
router.get('/:id', (req, res) => GetGroupById(req, res));
router.post('/create', (req, res) => CreateGroup(req, res));
router.post('/edit/:id', (req, res) => EditGroup(req, res));
router.delete('/delete/:id', (req, res) => DeleteGroup(req, res));
router.post('/promoteToCoowner/:id', (req, res) => PromoteToCoowner(req, res));
router.post('/demoteToMember/:id', (req, res) => DemoteToMember(req, res));
router.post('/kickAMember/:id', (req, res) => KickAMember(req, res));

module.exports = router;
