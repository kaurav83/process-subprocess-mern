const express = require('express');
const  connectDB = require('./config/db');
const app = express();

// Подключение к БД
connectDB();

app.use(express.json({extended:  false}));

app.get('/', (req, res) => res.send('API Running'));

// маршрутизация
app.use('/api/processes', require('./routes/api/processes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    if (err) {
        console.error('Unable to connect the server: ', err)
    }

    console.log(`Server started on port ${PORT}`)
});
