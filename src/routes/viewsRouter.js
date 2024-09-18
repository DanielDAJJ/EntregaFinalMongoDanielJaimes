import { Router } from "express";
import { productsManager } from "../dao/controllers/productsManager.js";

const routerViews = Router();
routerViews.get('/', async (req, res) => {
    let products = await productsManager.getProducts();
    res.setHeader('Content-Type', 'text/html');
    res.status(200).render('home', {
        products
    })
});
routerViews.get('/realtimeproducts', async (req, res) => {
    let products = await productsManager.getProducts();
    res.setHeader('Content-Type', 'text/html');
    res.status(200).render('realtimeproducts', {
        products
    })
})

export default routerViews