const express = require('express');

const dotenv = require('dotenv');
const connectDB = require('./config/db');
const colors = require('colors')
const productRoutes = require('./routes/productRoutes');
const errorMiddleWare = require('./middleware/errorMiddleWare')

const app = express()



dotenv.config()

connectDB()

app.get('/', (req, res)=>{
    res.send('API is Running .........') 
})

app.use('/api/products', productRoutes )


app.use(errorMiddleWare.notFound)
app.use(errorMiddleWare.error)



const PORT = process.env.PORT || 5000 
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))