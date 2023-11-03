import express, {Request,Response,Application} from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import furnitureControllerRouter from './controllers/furnitureController/furnitureController';

const app:Application = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req:Request, res:Response):void => {
    console.log(req.body);
    res.json({ code: res.statusCode, message: res.statusMessage, headers: res.getHeaders() });
});

app.use('/api/furniture', furnitureControllerRouter);

app.listen(PORT, async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017')
    console.log('Server running on port 👉' + PORT);
});