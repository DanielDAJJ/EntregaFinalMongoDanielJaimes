import { productsManager } from "../dao/controllers/productsManager.js";


const socketProducts = (socketServer) => {
    socketServer.on('connection', async (socket) => {
        console.log('New client connected')
        const products = await productsManager.getProducts();
        socket.emit('envioProducts', products);
        socket.on('addProduct', async (obj) => {
            await productsManager.addProducts(obj);
            const products = await productsManager.getProducts();
            socketServer.emit('envioProducts', products);
        });
        socket.on('deleteProduct', async (id) => {
            await productsManager.deleteProduct(id);
            const products = await productsManager.getProducts();
            socketServer.emit('envioProducts', products);
        });
    })
};
export default socketProducts