const mongoose = require('mongoose');
async function connectDB() {
    const atlas = process.env.MONGO_URI_ATLAS;
    const local = process.env.MONGO_URI_LOCAL || 'mongodb://localhost:27017/ugto_db';
    const uri = atlas && atlas.trim().length > 0 ? atlas : local;

    try {
        await mongoose.connect(uri, {
        // options recommended
        useNewUrlParser: true,
        useUnifiedTopology: true
        });
        console.log('MongoDB connected to', uri);
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
}

module.exports = connectDB;