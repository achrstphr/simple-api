// index.js
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('./models');

const app = express();
const port = 8000;

app.use(bodyParser.json());

const secretKey = 'secretkey123';

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).send('Invalid email or password');
    }

    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
    res.send({ token });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
