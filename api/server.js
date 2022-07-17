const express = require('express');

const hotelsRouter = require('./routes/hotels.router');

const app = express();

const PORT = process.env.PORT || 3000;

app.use((req, res, next) => { 
    const start = Date.now();
    next();
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.baseUrl}${req.url} ${res.statusCode} ${delta}ms`);
});

app.get('/', (req, res) => {
    res.send("helloo! Go to http://localhost:3000/hotels or search for hotels using stars, for example: http://localhost:3000/hotels?stars=3");
});

app.use('/hotels', hotelsRouter);

//user is redirected if a path different than /hotels is typed
app.get('/*',function(req, res){
    res.redirect('/');
  });

app.set('json spaces', 2);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});

module.exports = app;

