const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
var useragent = require('express-useragent');
const nodemailer = require('nodemailer');



let app = express();


//Port Declaration
const PORT = process.env.PORT || 4000;

//ROUTE FILES REQUIRING
var user = require('./userRoute');

// Import and use the maintenance route
const maintenanceRoute = require('./maintenanceRoute');
app.use('/api/maintenance', maintenanceRoute); // Mount the maintenance route at '/api/maintenance'



//BODYPARSER
app.use(bodyParser.urlencoded({
    extended: true, limit: '150mb'
}));
app.use(bodyParser.json({ limit: '150mb' }));
app.use(cors());
app.use(useragent.express());

//DATABASE URL
mongoose.connect(process.env.MONGOURL || 'mongodb+srv://rosaineplal2025:r69qRRnvv7VnaQtO@cluster0.mp2imkp.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => { 
    console.log("Database connected successfully");
}).catch((ex) => {
    console.log("Db connection error");
    console.log(ex);
});



//database connection
var db = mongoose.connection;




//Cors 
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


//Cors and helmet use
app.use(cors());

//Consoles the user information and API calls into the server Environment
app.use(useragent.express());
app.use((req, res, next) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl)
    next();
});

//APP.USE FUNCTIONS



//Route for checking the server health
app.get('/health', async(req, res) => {
    res.status(200).json({
        status: true
    });
    return
});

// Nodemailer Transporter Configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'meenujkannan09@gmail.com',
      pass: 'Meenakshy2003!'
    }
});


// Route to handle password reset request
app.post('/reset-password', (req, res) => {
    const { NewPassword, ConfirmNewPassword } = req.body;
  
    if (NewPassword !== ConfirmNewPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }
  
    // Logic to update the user's password in the database would go here
  
    res.status(200).json({ message: 'Password changed successfully' });
});
  

// Dummy user data for demonstration
const users = [
    { email: 'user1@example.com', password: 'password1' },
    { email: 'user2@example.com', password: 'password2' }
];


// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
  
    if (!user || user.password !== password) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
  
    res.status(200).json({ status: true, msg: 'Login successful', data: user });
});


  
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(user);
