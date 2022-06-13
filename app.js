const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp'); // To connect with mongoose

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Dtabase Connected");
})

const app = express(); // This is used to run the server of localhost

app.set('view engine', 'ejs'); // This is used for the ejs template view directory
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
    res.render("home.ejs"); // This is the home route which will serve as our home page
})

app.get('/makecampground', async(req, res) => {
    const camp = new Campground({ title: 'My backyard', description: "This is a very good campground" });
    await camp.save();
    res.send(camp);
})

app.listen(3000, () => {
    console.log('Serving on Port 3000!');
})