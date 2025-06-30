import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import {connectDB} from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import authRoutes from './routes/authRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin: "https://blog-maestro-982vbjjkg-raajs-projects-d77e53fa.vercel.app/",
    credentials: true,
}));
app.use(express.json());
app.use(rateLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/comments',commentRoutes);
app.use('/api/posts',postRoutes);
app.use('/api/user',userRoutes)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    })
})
