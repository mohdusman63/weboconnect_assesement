const express = require('express');
const path=require('path')
const app = express();
const cors=require('cors')

app.use(express.json());
// app.use(express.static(path.join(__dirname, 'upload')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const corsOptions = {
    origin: 'http://localhost:3000'
  };
  
  app.use(cors(corsOptions));
const authRoute = require('./routes/authRoute');
const postRoute = require('./routes/postRoute')
const likeRoute=require('./routes/likeRoute')
app.use(authRoute)
app.use(postRoute)
app.use(likeRoute)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
