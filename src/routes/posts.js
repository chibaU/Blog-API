const express = require('express');
const router  = express.Router();
const protect = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { createPostSchema, updatePostSchema } = require('../validators/postValidator');
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');

router.get('/',       getAllPosts);
router.get('/:id',    getPostById);
router.post('/',      protect, validate(createPostSchema), createPost);
router.put('/:id',    protect, validate(updatePostSchema), updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;
