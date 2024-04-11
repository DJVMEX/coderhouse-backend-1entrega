class ProductManager {
    #priceBaseGain = 0.15;

    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) 
        {
            console.log("Es obligatorio cargar todos los parametros del producto.")
        }
        else
        {
            if (this.#isCodeExists(code)) {
                console.log("El codigo Ingresado ya esta cargado.")
            }
            else
            {                
                const product = {
                    id: this.#getMaxID() + 1,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                };
                this.products.push(product);
            }
        }


    }

    #getMaxID() {
        return this.products.reduce((maxId, product) => Math.max(maxId, product.id), 0);
    }

    #isCodeExists(code) {
        return this.products.some(product => product.code === code);
    }


    getProductById(idProduct) {
        return this.products.find(product => product.id === idProduct);
    }

}

const productManager = new ProductManager();

//Alta de Producto
productManager.addProduct("Coca Cola L 1.5", "Bebida Cola de 1.5 Litros", "15.00", "https://m.media-amazon.com/images/I/51v8nyxSOYL._SL1500_.jpg",10001, 200)
productManager.addProduct("Pepsi L 2.25", "Bebida Cola de 2.25 Litros", "12.00", "https://www.cdparque.com/img/sections/productos/pepsi.png",10002, 300)
console.log(productManager.getProducts());

//Intento repetir el codigo...
productManager.addProduct("Fanta L 2", "Bebida Naranja de 2 Litros", "10.00", "https://example.com/fanta.png", 10001, 150);
console.log(productManager.getProducts());

// Verifico si sale el error cuando no cargo un parametro.
productManager.addProduct("Fanta L 2", "Bebida Naranja de 2 Litros", "10.00", "https://example.com/fanta.png", 10001);

//Busco y Muestro el Producto
console.log(productManager.getProductById(2));

