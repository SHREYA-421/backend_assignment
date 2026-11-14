
import express from 'express';
import session from 'express-session';

import userRoutes from './routes/userroutes.js';
import postRoutes from './routes/postRoutes.js';

const app = express();

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60
    }
}));

app.get('/', (req, res) => {
    res.send('Backend server is running!');
});

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

export default app;
