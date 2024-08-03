import cors from 'cors';
import express from 'express';
import data from './api.json' assert { type: 'json' };
// const server = jsonServer.create();
// const router = jsonServer.router("api.json");
// const middlewares = jsonServer.defaults();
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// server.use(middlewares);
// app.use(router);
app.get('/categories', async (req, res, next) => {
    return res.status(500).json(data.categories);
})

app.listen(port, () => {
    console.log(`server running on port: ${port}`);
});