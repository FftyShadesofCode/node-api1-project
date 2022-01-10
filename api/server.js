// BUILD YOUR SERVER HERE
const express = require('express');
const user = require('./users/model');

const server = express();

server.use(express.json());

server.get('/users', (req, res) => {
    res.status(200).json('Be a user, not a loser!')
})

server.get('/api/users', async (req, res) => {
    try {
        const users = await user.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
server.get('/api/users', (req, res) => {
    user.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
});

server.get('/api/users/:id', async (req, res) => {
    console.log(req.method);
    console.log(req.headers);
    console.log(req.body);
    console.log(req.params);
    try {
        const { id } = req.params
        const user = await user.findById(id);
        if (!user) {
            res.status(404).json({ message: 'no user' });
        } else {
            res.status(200).json(user);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

server.post('/api/users', async (req, res) => {
    try {
        const { name, bio } = req.body;
        console.log(name, bio);
        const newUser = await user.insert({ name, bio });
        console.log(newUser);
        res.status(201).json(newUser)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;
    console.log(id, name, bio);
    try {
        const updatedUser = await user.update(id, { name, bio });
        if (!updatedUser) {
            res.status(404).json({ message: 'user ${id} not here' });
        } else {
            res.json(updatedUser);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

server.delete('/api/users/:id', async (req, res) => {
    try {
        const deletedUser = await user.remove(req.params.id);
        if (!deletedUser) {
            res.status(404).json({ message: 'no user by that id!' });
        } else {
            res.json(deletedUser);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
