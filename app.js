const express = require('express');
const path = require('path');
const hbs = require('hbs');

// set the port
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', require('./routes/index')); // index route
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    err.customMessage = "Sorry! Something broke! Not your fault though!"
    next(err); // means fall thorugh to the next route
})

app.use((err, req, res, next) => { //this is the next route
    res.render('error', { data: err, layout: 'errorPage'}); //errorpage is an hbs that acts like html
})
   
app.listen(port, () => {
    console.log(`app is running on ${port}`);
})

