const express = require('express');
const morgan = require('morgan')
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
const productRouter = require('./routes/productsRoutes');
const userRouter = require('./routes/userRoute')

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);


module.exports = app

