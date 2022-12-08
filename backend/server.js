import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

const app = express();
app.use(express.json())
dotenv.config();
connectDB()


app.get('/', (req, res) => {
    res.send('Welcome')
})

app.use('/api/products', productRoutes)

app.use('/api/users', userRouter)
app.use('/api/orders', orderRoutes)

app.use(notFound)

app.use(errorHandler)

app.use('/', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }))

app.listen(
    process.env.PORT || 5000,
    console.log(`server is running in ${process.env.NODE_ENV} at 5000`)
)