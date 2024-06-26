import 'dotenv/config';
import express from 'express';
import connectDB from './db';
import globalRouter from './global-router';
import { logger } from './logger';
import saveDataToDB from './parser/axiosParser';
// import parser from './parser/axiosParser';

const app = express();
const PORT = process.env.PORT || 3000;
// connectDB();
app.use(logger);
app.use(express.json());
app.use('/api/v1/',globalRouter);


app.get('/helloworld',(request,response) =>{
  response.send("Hello World!");
})

app.get('/parser',(request,response) =>{
  saveDataToDB();
  setInterval(saveDataToDB, 30 * 60 * 1000);
  response.send("Parser");
})

app.listen(PORT, () => {
  console.log(`Server runs at http://localhost:${PORT}`);
});




// saveDataToDB();
// setInterval(saveDataToDB, 30 * 60 * 1000);
