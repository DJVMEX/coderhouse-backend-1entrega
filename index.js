const fs = require('fs');

class ProductManager {
    #priceBaseGain = 0.15;

    constructor(path) {
        this.path = path;
    }

    async getProducts() 
    {
        try
        {
            if(fs.existsSync(this.path))
            {
                const products = await fs.promises.readFile(this.path, 'utf8');
                return JSON.parse(products);
            } else return [];
        }
        catch(error)
        {
            console.log(error);
        }
    }
 
    async addProduct(title, description, price, thumbnail, code, stock) 
    {
        if (!title || !description || !price || !thumbnail || !code || !stock) 
        {
            console.log("Es obligatorio cargar todos los parametros del producto.")
        }
        else
        {
            const codeExists = await this.#isCodeExists(code);
            if (codeExists) {
                console.log("El codigo Ingresado ya esta cargado.")
            }
            else
            {                
                const product = {
                    id: await this.#getMaxID() + 1,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                };

                try
                {
                    const products = await this.getProducts();
                    products.push(product);
                    console.log(products);
                    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));

                }
                catch(error)
                {
                    console.log(error);
                }
            }
        }


    }

    async #getMaxID() 
    {        
        try {
            const products = await this.getProducts();
            return products.reduce((maxId, product) => Math.max(maxId, product.id), 0);
        } catch (error) {
            console.error('Error al verificar la existencia del código:', error);
            return false; // Asumir que el código no existe si hay un error
        }
        return 1;

    }

    async #isCodeExists(code) 
    {
        try 
        {
            const products = await this.getProducts();
            return products.some(product => product.code === code);
        } catch (error) {
            console.error('Error linea 86:', error);
            return false;
        }
    }


    async getProductById(idProduct) {
        try 
        {
            const products = await this.getProducts();
            return products.find(product => product.id === idProduct);

        } catch (error) {
            console.error('Error linea 86:', error);
            return false;
        }

    }

}

const productManager = new ProductManager('./products.json');

const test = async() =>{
    //leo el archivo
    console.log(await productManager.getProducts())

    //agrego cocacola.
    await productManager.addProduct("Coca Cola L 1.5", "Bebida Cola de 1.5 Litros", "15.00", "https://m.media-amazon.com/images/I/51v8nyxSOYL._SL1500_.jpg",10001, 200)

    //agrego pepsi
    await productManager.addProduct("Pepsi L 2.25", "Bebida Cola de 2.25 Litros", "12.00", "https://www.cdparque.com/img/sections/productos/pepsi.png",10002, 300)

    //Intento repetir el codigo...
    await productManager.addProduct("Fanta L 2", "Bebida Naranja de 2 Litros", "10.00", "https://example.com/fanta.png", 10001, 150);


    // Verifico si sale el error cuando no cargo un parametro.
    await productManager.addProduct("Fanta L 2", "Bebida Naranja de 2 Litros", "10.00", "https://example.com/fanta.png", 10001);

    //Busco y Muestro el Producto
    console.log(await productManager.getProductById(2));
}

test();
