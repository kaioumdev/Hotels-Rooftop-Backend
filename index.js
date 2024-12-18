const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const port = process.env.port || 5000;

app.use(express.json());
app.use(cors());
async function main() {
    await mongoose.connect(process.env.MONGODB_URL);
};

main().then(() => console.log('connect mongodb successfully')).catch(err => console.log(err));


//afrankaiyum34
//Mscln4t1wEHGlkaU
//hotels-rooftop
app.get('/', (req, res) => {
    res.send('Hotels Rooftop server is running.....!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})