const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env variables
dotenv.config({ path: './config/config.env' });

// Load models
const Bootcamp = require('./models/Bootcamp');
const { propfind } = require('./routes/bootcamps');

//connect to DB
mongoose.connect(process.env.MONGO_URI);

// Read JSON File
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

// Import into DB

const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);

    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete from DB

const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();

    console.log('Data Deleted...'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}