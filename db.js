    // db.js
const mongoose = require('mongoose');

// Connect to MongoDB with the desired database name
mongoose.connect({MONGODB_CONNECT_UR}, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // 30 seconds timeout
      });
      
// Export the mongoose connection instance
module.exports = mongoose.connection;
