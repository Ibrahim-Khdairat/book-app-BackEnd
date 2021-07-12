const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();
const axios = require('axios');

const server = express();
server.use(cors());


const PORT = process.env.PORT;

mongoose.connect('mongodb://localhost:27017/best-book', { useNewUrlParser: true, useUnifiedTopology: true });


const BookSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: String,
    img: String
});

const OwnerSchema = new mongoose.Schema({
    email: String,
    books: [BookSchema]
});

const userModel = mongoose.model('User', OwnerSchema);

function seedUserCollection() {

    const Ibrahim = new userModel(
        
        {
        email: 'ibrahimkuderat@gmail.com',
        books: [
            { name: 'The Growth Mindset', 
            description: 'Dweck coined the terms fixed mindset and growth mindset to describe the underlying beliefs people have about learning and intelligence. When students believe they can get smarter, they understand that effort makes them stronger. Therefore they put in extra time and effort, and that leads to higher achievement.', 
            status: 'FAVORITE FIVE', 
            img: 'https://m.media-amazon.com/images/I/61bDwfLudLL._AC_UL640_QL65_.jpg' },

            { name: 'The Momnt of Lift', 
            description: 'Melinda Gates shares her how her exposure to the poor around the world has established the objectives of her foundation.', 
            status: 'RECOMMENDED TO ME', 
            img: 'https://m.media-amazon.com/images/I/71LESEKiazL._AC_UY436_QL65_.jpg' }
        ]
    })

    // Ibrahim.save();
}


// seedUserCollection();





//---------- Check the user informations from Data Base----------//

//http://localhost:3002/book?userEmail=ibrahimkuderat@gmail.com

server.get('/book',getUserBook);

function getUserBook(req,res) {
    let userEmail = req.query.userEmail;
    
    userModel.find({email:userEmail},function(error,userData){
        if(error) {
            res.send('did not work')
        } else {
            res.send(userData[0].books)
        }
    })
}


// Test the server
server.get('/', (request, response) => {
    response.status(200).send('Home Page, All work')
})



server.listen(PORT, () => {
    console.log(`Listenng on Port : ${PORT}`);
})