
import express from 'express';

import {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost
} from '../controllers/postcontroller.js';

import { requireLogin } from '../middleware/requireLogin.js';

const router = express.Router();

router.post('/', requireLogin, createPost);

router.get('/', getPosts);

router.get('/:id', getPost);

router.put('/:id', requireLogin, updatePost);

router.delete('/:id', requireLogin, deletePost);

export default router;
