import express from "express";
import routerProduct from "./routes/productsRouter.js";
import { __dirname } from './utils.js';
import handlebars from "express-handlebars";
import routerViews from "./routes/viewsRouter.js";
import { Server } from "socket.io";
import socketProducts from "./listeners/socketProducts.js";

const app = express();
const PORT = 8080;

app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/api', routerProduct);
app.use('/', routerViews);


const httpServer = app.listen(PORT, ()=>{
    try {
        console.log(`servidor ${PORT} en linea`);
    } catch (error) {
        console.log(error);
    }
});
const socketServer = new Server(httpServer);

socketProducts(socketServer);

