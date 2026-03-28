const Post = require("../models/Post");

// GET /api/posts — عام
exports.getAllPosts = async (req, res, next) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 10);
    const skip  = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      Post.find()
        .populate('author', 'username email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Post.countDocuments(),
    ]);

    res.json({
      posts,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    });
  } catch (err) {
    next(err);
  }
};
/*

الاستخدام:
```
GET /api/posts?page=1&limit=10
GET /api/posts?page=2&limit=5

*/

// GET /api/posts/:id — عام
exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username email",
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (err) {
   next(err);
  }
};

// POST /api/posts — محمي
exports.createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const post = await Post.create({
      title,
      content,
      author: req.user.id,
    });

    await post.populate("author", "username email");

    res.status(201).json(post);
  } catch (err) {
   next(err);
  }
};

// PUT /api/posts/:id — محمي
exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Authorization: هل أنت صاحب المقال؟
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { title, content } = req.body;
    if (title) post.title = title;
    if (content) post.content = content;

    await post.save();
    await post.populate("author", "username email");

    res.json(post);
  } catch (err) {
   next(err);
  }
};

// DELETE /api/posts/:id — محمي
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Authorization: هل أنت صاحب المقال؟
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await post.deleteOne();

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
   next(err);
  }
};
