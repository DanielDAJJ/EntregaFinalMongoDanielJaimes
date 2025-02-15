import { Router } from "express";
import { productsManager } from "../dao/controllers/productsManager.js";
const routerProduct = Router();

productsManager.path = './src/dao/database/products.json';
routerProduct.get('/', async (req, res) =>{
    let products
    try {
        products = await productsManager.getProducts();
    } catch (error) {
        console.error(error);
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({error: 'Error inesperado al obtener los productos'});
    };
    let { limit, skip } = req.query;
    if (limit) {
        limit = Number(limit);
        if (limit == isNaN) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({error : 'El límite debe ser un número'});
        }
    }else{
        limit = products.length;
    };
    if (skip) {
        skip = Number(skip);
        if(skip == isNaN){
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({error : 'El salto debe ser un número'});
        }
    }else{
        skip = 0;
    };
    let resultado = products.slice(skip, skip + limit);
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({resultado});
}); 
routerProduct.get('/:id', async (req, res) => {
    let{id} = req.params;
    id = Number(id);
    if(isNaN(id)){
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({error: 'El id debe ser un número'});
    };
    let product;
    try {
        product = await productsManager.getProductById(id);
    } catch (error) {
        console.error(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({error: 'Error inesperado al obtener el producto'});
    };
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({product});
});
routerProduct.post('/', async (req, res) => {
    let {title, description, code, price, status, stock, category, img} = req.body;
    if(!title ||!description ||!code ||!price ||!status ||!stock ||!category || !img){
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({error: 'Todos los campos son obligatorios'});
    };
    let products = await productsManager.getProducts();
    let exist = products.find(p=> p.title === title);
    if(exist){
        res.setHeader('Content-Type', 'application/json');
        return res.status(409).json({error: 'El producto ya existe'});
    };
    try {
        let newProduct = await productsManager.addProducts({title, description, code, price, status, stock, category, img});
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({newProduct});
    } catch (error) {
        console.error(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({error: 'Error inesperado al crear el producto'});
    }
});
routerProduct.put('/:id', async (req, res) => {
    let {id} = req.params;
    id = Number(id);
    if(isNaN(id)){
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({error: 'El id debe ser un número'});
    };
    let {...productModify} = req.body;
    delete productModify.id;
    if(productModify.title){
        let products = await productsManager.getProducts();
        let exist = products.find(p=> p.title === productModify.title && p.id!== id);
        if(exist){
            res.setHeader('Content-Type', 'application/json');
            return res.status(409).json({error: 'El producto con el mismo nombre ya existe'});
        };
    };
    try {
        let product = await productsManager.updateProduct(id,productModify)
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({product});
    } catch (error) {
        console.error(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({error: 'Error inesperado al obtener el producto'});
    };
});
routerProduct.delete('/:id', async (req, res) => {
    let {id} = req.params;
    id = Number(id);
    if(isNaN(id)){
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({error: 'El id debe ser un número'});
    };
    try {
        let deletedProduct = await productsManager.deleteProduct(id);
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({deletedProduct});
    } catch (error) {
        console.error(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({error: 'Error inesperado al eliminar el producto'});
    }
});

export default routerProduct