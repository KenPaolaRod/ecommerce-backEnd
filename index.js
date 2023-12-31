const express = require('express');
const morgan = require('morgan')
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
app.use(express.json());
app.use(cors({
  credentials: true,
}))

app.use(cors(corsOptions));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
const productRouter = require('./routes/productsRoutes');
const userRouter = require('./routes/userRoute')

app.use(cookieParser());
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);


module.exports = app

