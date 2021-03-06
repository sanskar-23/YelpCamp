const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp'); // To connect with mongoose

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Dtabase Connected");
});


const sample = (array) => array[Math.floor(Math.random() * array.length)]


const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62ac76982934ce5b4d3a8e0d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam possimus magni, nisi ea quae laborum corporis delectus voluptatum distinctio maiores iusto maxime minus? Error suscipit eligendi exercitationem aspernatur sequi saepe.',
            price: price,
            images: [{
                    url: 'https://res.cloudinary.com/de3mbsv5u/image/upload/v1655546085/YelpCamp/fhfosd8pokwc8hqgim0x.jpg',
                    filename: 'YelpCamp/fhfosd8pokwc8hqgim0x',
                },
                {
                    url: 'https://res.cloudinary.com/de3mbsv5u/image/upload/v1655546085/YelpCamp/msssgfbxohvao41gwp32.jpg',
                    filename: 'YelpCamp/msssgfbxohvao41gwp32',
                }
            ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});