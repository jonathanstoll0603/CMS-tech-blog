const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Route handler for creating a new post
router.post('/', withAuth, async (req, res) => {
    try {
        const createPost = await Post.create({
            ...req.body,
            id: req.params.id,
            user_id: req.session.user_id
        });

        console.log(createPost);
    
        const postResponse = createPost.map(post => post.get({ plain: true }));
        res.json(postResponse);

    } catch (err) {
        res.status(500).json(err);
    }
});

// Route handler for updating an existing post
router.put('/:id', withAuth, async (req, res) => {

    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        })

        if (!postData) {
            res.status(400).json({ message: 'post id not found' });
            return;
        }

        res.status(200).json(postData);

    } catch (err) {
        res.status(500).json(err);
    }
});

// Route handler to delete existing post based off of post id
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.params.user_id
            }
        });

        if (!postData) {
            res.status(400).json({ message: 'post id not found' });
            return;
        }

        console.log(postData);
        res.status(200).json(postData);

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;