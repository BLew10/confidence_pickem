const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');
const app = express();
require('./server/config/mongoose.config'); 
app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json()); 

app.use(express.urlencoded({ extended: true })); 

require('./server/routes/week.routes')(app);
require('./server/routes/league.routes')(app);
require('./server/routes/user.routes')(app);
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})




