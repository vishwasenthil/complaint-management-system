import express from 'express';
import cors from 'cors';
import complaintsRoutes from './routes/complaintsRoutes';

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/complaints', complaintsRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});