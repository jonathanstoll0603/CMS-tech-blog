const router = require('express').Router();
const { Post, User, Reply } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/reply', async (req, res) => {
    try {
        // Find all posts from database
        const postData = await Reply.findAll({
            include: [{ model: User}, { model: Post }],
            exclude: {
                attributes: ['password']
            }
        });

        // store simplified json object 
        const posts = postData.map((post) => post.get({ plain: true }));

        res.status(200).json(posts)

    } catch (err) {
        res.status(500).json(err);
    }
});


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

// Route handler for creating a new reply
router.post('/reply', async (req, res) => {
    try {
        const createReply = await Reply.create({
            ...req.body,
            id: req.params.id,
            user_id: req.session.user_id,
            include: [{ model: User }, { model: Post }]
        });

        console.log(createReply);
    
        const replyResponse = createReply.get({ plain: true });
        res.json(replyResponse);

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
router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            }
        });

        if (!postData) {
            res.status(400).json({ message: 'post id not found' });
            return;
        }

        res.status(200).json(postData);

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;