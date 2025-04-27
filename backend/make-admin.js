const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('MongoDB connection error:', err));

// Function to make a user admin
async function makeUserAdmin(email) {
    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            console.log(`User with email ${email} not found`);
            return;
        }
        
        user.role = 'admin';
        await user.save();
        
        console.log(`User ${email} has been made admin successfully`);
    } catch (error) {
        console.error('Error making user admin:', error);
    } finally {
        mongoose.disconnect();
    }
}

// Get email from command line arguments
const email = process.argv[2];

if (!email) {
    console.log('Please provide an email address');
    console.log('Usage: node make-admin.js user@example.com');
    process.exit(1);
}

makeUserAdmin(email); 