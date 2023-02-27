require('dotenv').config() ; 
const express = require('express'); 
const server = express(); 
const morgan = require('morgan');
const mongoose = require('mongoose');  
const swaggerUI= require('swagger-ui-express'); 
const swaggerJsDocs = require('swagger-jsdoc');
const {apis}= require('./src/utils/swagger'); 
const Uri =  `mongodb://127.0.0.1:27017/music` ;
const bodyParser = require('body-parser'); 
const routes = require('./src/routes/routes')
 
  //mongoose connection
  mongoose.set('strictQuery', true); 
  mongoose.connect(Uri,  {useNewUrlParser: true} );
  mongoose.Promise = global.Promise; 
    
 //swagger connection
 const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Music API',
            version: '1.0.0',
            description: 'Music API'
         },
         servers: [{
            url:  `http://localhost:${(process.env.PORT||5000)}`
 
         }]
        },
         apis: apis
    };
        
 //default middlewares
  const swaggerSpec = swaggerJsDocs(options) 
  server.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  server.use(express.json());
  server.use('/uploads', express.static( './src/uploads')) ;
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json()); 
  server.use(morgan('dev'));  
  server.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });

 //server routes 
 server.use('/api', routes)
  
const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});

