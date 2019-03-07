const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const votes = require('./routes/api/votes');
const authRoutes = require('./routes/api/authRoutes');

const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB Config
const db = require('./config/key').mongoURI;
// Connect To Mlab(MongoDB)
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Passport Middleware
app.use(passport.initialize());
//  Passport Config
require('./config/passport.js')(passport);



//Routes
app.use('/auth', authRoutes);
app.use('/api/users', users);
app.use('/api/votes', votes);

// Server static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set Static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })    
}

// PORT Listening Server
const port = process.env.PORT || 5001;

app.listen(port, () => console.log('Server is running...'));