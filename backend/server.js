const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dbConfig = require('./databaseConfig')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // Cors middleware
app.use(express.json());


// mongoose.connect(`mongodb://mongodb-service:27017/cloudl`, {useNewUrlParser: true})
//     .then(() => console.log("MongoDB successfully connected"))
//     .catch(err => console.log(err));

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    user: dbConfig.user,
    pass: dbConfig.pwd
}).then(() => {
    console.log('successfully connected to the database');
}).catch(err => {
    console.log('error connecting to the database');
    process.exit();
});

const usersRouter = require('./routes/users');
const exercisesRouter = require('./routes/exercises');

app.use('/users',usersRouter);
app.use('/exercises',exercisesRouter);


app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
});