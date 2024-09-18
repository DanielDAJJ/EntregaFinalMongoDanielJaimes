const socketClient = io();
socketClient.on('envioProducts',(obj)=>{
    updateProductList(obj);
});
function updateProductList(productList) {
    const productsDiv = document.getElementById('list-products')
    let productsHTML = '';
    productList.forEach((product) => {
        productsHTML += `
                <div class="card">
                    <div class="cardImg">
                        <img src="${product.img}" alt="${product.title}">
                    </div>
                    <h2>${product.title}</h2>
                    <hr>
                    <div class="cardDescription">
                        <p>${product.description}</p>
                        <p>Precio: ${product.price}</p>
                    </div>
                    <hr>
                    <div class="cardItems">
                        <p>
                            ${product.stock}
                        </p>
                        <p>
                            ${product.code} 
                        </p>
                        <p>
                            ${product.category}
                        </p>
                    </div>
                </div>
        `
    })
    productsDiv.innerHTML = productsHTML;
};

let form = document.getElementById("formProduct");
form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let stock = parseInt(document.getElementById("stock").value);
    let img = document.getElementById("img").value;
    let category = document.getElementById("category").value;
    let price = parseFloat(document.getElementById("price").value);
    let status = document.getElementById("status").value;
    let code = document.getElementById("code").value;
    socketClient.emit('addProduct', {
        title, description, stock, img, category, price, status, code,
    });    
    form.reset();
});
document.getElementById('delete-btn').addEventListener('click', ()=>{
    const deleteInput = document.getElementById('id-prod');
    const deleteId = parseInt(deleteInput.value);
    socketClient.emit('deleteProduct', deleteId);
    deleteInput.value = '';
})
/* function deleteProduct(productId) {
    socketClient.emit('deleteProduct', productId);
} */