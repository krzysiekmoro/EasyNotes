const express = require('express'),
app = express(),
port = 3000;

const todoRoutes = require('./routes/todos');

app.get('/', (req, res) => {
    res.send('Hi there from express');
})

app.use('/api/todos', todoRoutes);

app.listen(port, () => {
    console.log('App is running on port 3000');
})