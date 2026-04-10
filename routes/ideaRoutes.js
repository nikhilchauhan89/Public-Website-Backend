import express from 'express';
import { createIdea, getIdeas, getUserIdeas, deleteIdea } from '../controllers/ideaController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createIdea)
  .get(protect, getIdeas);

router.route('/myideas')
  .get(protect, getUserIdeas);

router.route('/:id')
  .delete(protect, admin, deleteIdea);

export default router;
