const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        // Find all posts from database
        const postData = await Post.findAll({
            include: {
                model: Post,
                attributes: ['title', 'content', 'user_id'],
            },
        });

        // 
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(posts);

        res.render('homepage', {
            posts
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If user is logged in, redirect to the homepage screen
    if (req.session.logged_in) {
        res.redirect('homepage');
        return;
    }

    // if user not logged in, route to the login screen
    res.render('login');
})

module.exports = router;