const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

//GET route for the home page
router.get('/', withAuth, async (req, res) => {
    try {
        // Find all posts from database
        const postData = await Post.findAll({
            include: {
                model: User,
            },
        });

        // store simplified json object 
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// GET route for the dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // find the current user's dashboard
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });
        // store simplified json object 
        const user = userData.get({ plain: true });

        // render dashboard page and include everything in user object
        res.render('dashboard', {
            ...user,
            logged_in: true
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// GET route for a specific user thread page
router.get('/thread/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: {
                model: User,
                exclude: {
                    attributes: ['password']
                },
            },
        });
        console.log(postData);
    
        const threadInfo = postData.map(thread => thread.get({ plain: true }));
        res.json(threadInfo);
    
        res.render('thread', threadInfo);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/create', withAuth, (req, res) => {
    try {
        res.render('create');
    } catch (err) {
        res.status(500).json(err);
    }
})

// GET route for signup page
router.get('/signup', (req, res) => {
    try {
      res.render('signup');
    } catch (err) {
      res.status(500).json(err);
    }
});

// GET route for the login page
router.get('/login', (req, res) => {
    try {
        // If user is logged in, redirect to the homepage screen
        if (req.session.logged_in) {
            res.redirect('profile');
            return;
        }

        // if user not logged in, route to the login screen
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;