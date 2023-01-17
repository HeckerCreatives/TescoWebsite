
const express=require('express')
const db=require('./database/db')
const TeacherRoute=require('./route/Teacher_route')
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition=require('./swagger.doc')
const cors = require('cors');
const Topics_Router = require('./route/Topic_route');
const Question_Router = require('./route/Question_route');
const Admin_Router = require('./route/Amin_route');
const app= express()
const PORT=8000
app.use(express.json());

const corsConfig = {
  origin: "http://localhost:3000", // change this to server of frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: [
    "Origin",
    "Content-Type",
    "X-Requested-With",
    "Accept",
    "Authorization",
  ],
};

app.use(cors(corsConfig));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Headers', "Access-Control-Allow-Origin", 'Content-Type');
//   next();
// });

//Here is the APi of the different routing
app.use('/api',TeacherRoute)
app.use('/api',Topics_Router)
app.use('/api',Question_Router)
app.use('/api',Admin_Router)
app.use(cors())

db.connection()

  
  const options = {
    swaggerDefinition,
    apis: ['./route/*.js'],
  };
  
  const swaggerSpec = swaggerJSDoc(options);
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



app.get('/',(req,res)=>{
    res.end("Welcome to tesoc backend")
})
app.listen(PORT,()=>{
    console.log(`Serve is running on port:${PORT}`)
})