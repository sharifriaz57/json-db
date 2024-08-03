import cors from 'cors';
import express from 'express';
import data from './api.json' assert { type: 'json' };
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());



app.get('/categories', async (req, res, next) => {
    return res.status(200).json(data.categories);
})
app.get('/category/:id', async (req, res, next) => {
    const { id } = req.params;
    const filteredData = data.categories.filter(item => item.id == id);
    return res.status(200).json(filteredData);
})
app.get('/products', async (req, res, next) => {
    if (req.query.category_id) {
        const categoryId = parseInt(req.query.category_id);

        if (isNaN(categoryId)) {
            return res.status(400).json({ error: 'Invalid category_id' });
        }
        const filteredData = data.products.filter(item => item.id == categoryId);
        return res.status(200).json(filteredData);
    }

    return res.status(200).json(data.products);
})
app.get(`/product/:id`, async (req, res, next) => {
    const { id } = req.params;
    const filteredData = data.products.filter(item => item.id == id);
    return res.status(200).json(filteredData);
})
app.get('/filter', async (req, res, next) => {
    if (req.query.name) {
        const name = req.query.name;

        const filteredProducts = data.products.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
        const filteredCategories = data.categories.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
        return res.status(200).json({
            "categories": filteredCategories,
            "products": filteredProducts,
        });
    }
    return res.status(200).json({
        "categories": data.categories,
        "products": data.products,
    });
})


app.listen(port, () => {
    console.log(`server running on port: ${port}`);
});