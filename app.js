// FOR APP //192.168.43.98

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const cors = require('cors');
const bcrypt = require('bcrypt');
const Coordinates = require('./models/coordinates');

const User = require('./models/AppUser');
const WebUser = require('./models/WebUser');
const app = express();
app.use(express.json());
app.use(cors());

const MONGODB_CONNECT_URL=process.env.MONGODB_CONNECT_URL;
const PORT = process.env.PORT;

mongoose.connect(MONGODB_CONNECT_URL, { useNewUrlParser: true, useUnifiedTopology: true })

app.post('/SignUp', async (req, res) => {
  try {
    const { email, password, hospitalName, contact, ambulanceNumber } = req.body;

    // Check if the user already exists with the provided email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new User({
      email,
      password: hashedPassword,
      hospitalName,
      contact,
      ambulanceNumber,
    });

    // Save to MongoDB
    await newUser.save();

    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.post('/Login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({email});

    if (!user) {
      return res.status(401).json({ message: 'User not exist' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Successfully authenticated
    return res.status(200).json({
      message: 'Login successful',
      user: {
        _id: user._id,
        email: user.email,
        password: user.password,
        // Other user properties...
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/WebSignUp', async (req, res) => {
  try {
    const { username, password, hospitalName, contact, ambulanceNumber} = req.body;

    // Check if the user already exists with the provided email
    const existingUser = await WebUser.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newWebUser = new WebUser({
      username,
      password: hashedPassword,  
      hospitalName,
      contact,
      ambulanceNumber
    });

    // Save to MongoDB
    await newWebUser.save();

    res.status(200).json({ message: 'Web User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//Web Login
app.post('/WebLogin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await WebUser.findOne({username});

    if (!user) {
      return res.status(401).json({ message: 'User not exist' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Successfully authenticated
    return res.status(200).json({
      message: 'Login successful',
      user: {
        _id: user._id,
        username: user.username,
        password: user.password,
        // Other user properties...
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/addCoordinates', async (req, res) => {
  try {
    const { name, latitude, longitude } = req.body;
    const newCoordinate = new Coordinates({
      name,
      latitude,
      longitude,
    });

    await newCoordinate.save();
    res.status(201).json({ message: 'Coordinates added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/getCoordinates', async (req, res) => {
  try {
    const allCoordinates = await Coordinates.find({});
    res.status(200).json(allCoordinates);
  } catch (error) {
    console.error('Error fetching coordinates from MongoDB:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//  app.get('/getStatus', async (req, res) => {
//   try {
//     const allData = await Coordinates.find({});
//     res.status(200).json(allData);
//   } catch (error) {
//     console.error('Error fetching data from MongoDB:', error.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

app.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

app.listen(PORT, () => {
  console.log('Server listening on port:', PORT);
});
