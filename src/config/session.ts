import session from 'express-session';
import connectMongo from 'connect-mongodb-session';

const MongoDBStore = connectMongo(session);

// Create a new instance of the store
const store = new MongoDBStore({
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/aspire',
    collection: 'sessions', // Name of the collection to store sessions
});

// Handle errors
store.on('error', (error: Error) => {
    console.error('Session store error:', error);
});

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || 'apppassword', // Secret for signing the session ID cookie
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 5000 * 60 * 60 * 24, // Set cookie expiration to 1 day
    },
});

export default sessionMiddleware;
