const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./userData.json');
const exmaplePosts = require('./examplePosts.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    // Creates a user for each user object we have in our userData.json file
    const user = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    // Create a post for each example post we have in our examplePosts.json file, and assign a random user_id to each
    for (const post of exmaplePosts) {
        await Post.create({
            ...post,
            user_id: user[Math.floor(Math.random() * user.length)].id
        });
    };

    process.exit(0);
};

seedDatabase();