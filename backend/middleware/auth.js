const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
            console.log('Token found in request headers');
        } else {
            console.log('No token found in request headers');
        }

        if (!token) {
            return res.status(401).json({ message: 'Not authorized to access this route' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Token verified successfully, user ID:', decoded.id);
            
            const user = await User.findById(decoded.id);
            if (!user) {
                console.log('User not found for ID:', decoded.id);
                return res.status(401).json({ message: 'User not found' });
            }
            
            console.log('User authenticated:', user.username, 'Role:', user.role);
            req.user = user;
            next();
        } catch (jwtError) {
            console.error('JWT verification failed:', jwtError.message);
            return res.status(401).json({ message: 'Invalid token' });
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ message: 'Not authorized to access this route' });
    }
};

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: 'You do not have permission to perform this action' 
            });
        }
        next();
    };
}; 