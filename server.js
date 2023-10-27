import 'express-async-errors';
import * as dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';

import jobRouter from './routes/jobRouter.js';

dotenv.config();
const app = express();



if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());


app.get('/', (req, res) => {
    res.send("Hello World");
});

app.post('/', (req, res) => {
    console.log(res);
    res.json({message: 'data received', data: req.body});
});

app.use('/api/jobs', jobRouter);

app.use('*', (req, res) => {
    res.status(404).json({msg: "Not found"});
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({msg: "something went wrong"});
});

const port = process.env.PORT || 5100

try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
        console.log(`server runing on PORT ${port}`);
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}
