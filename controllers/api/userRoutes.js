const router = require('express').Router();
const { User } = require('../../models');

// Route handler for signing a user up
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
        // res.render('dashboard');

    } catch (err) {
        res.status(500).json(err);
    }
});

// Route handler for loggin user in
router.post('/login', async (req, res) => {
    try {
        // find one user with a matching email to the one provided in the req.body
        const userData = await User.findOne({ where: { email: req.body.email }});

        // if user email not found, give error message
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again.' });
            return;
        }

        // Check user password against the one in database that aligns with the email provided
        const checkPW = await userData.checkPassword(req.body.password);

        // if user password not found, give error message
        if (!checkPW) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again.' });
            return;
        }

        // Save the user's session once logged in
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            
            res.json({ user: userData, message: 'You are now logged in!' });
        });

        // res.render('dashboard');

    } catch (err) {
        res.status(400).json(err);
    }
});

// Route handler for logging user out
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
          res.status(204).end();
        });
      } else {
        res.status(404).end();
      }
});

module.exports = router;