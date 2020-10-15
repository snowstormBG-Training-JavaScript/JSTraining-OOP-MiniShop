class Product {

    // title = 'DEFAULT';
    // imageURL;
    // description;
    // price;

    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageURL = imageUrl;
        this.description = description;
        this.price = price;
    }

}

class ProductList {
    products = [
        new Product('Pillow',
            'https://confidentcare.com.au/image/cache/catalog/COVID-19/XDPIL%20=%20Web%202-300x300.jpg',
            12.99,
            'A soft pillow for your empty head.'),
        new Product('Carpet',
            'https://i.pinimg.com/564x/ff/7c/5b/ff7c5b1b1e552248ccfe69a8bb955f41.jpg',
            54.99,
            'A lovely carpet that you will ruin with your dirty feet.'),
    ];

    constructor() {
    }

    render() {
        const renderHook = document.getElementById('app');
        const prodListEl = document.createElement('ul');
        prodListEl.className = 'product-list';

        for (const product of this.products) {
            const productItem = new ProductItem(product);
            const prodEl = productItem.render();
            prodListEl.append(prodEl);
        }

        renderHook.append(prodListEl);
    }
}

class ProductItem {
    constructor(product) {
        this.product = product;
    }

    // addToCart() {console.log(this);}
    addToCart = () => {console.log(this.product)}

    render() {
        const prodEl = document.createElement('li');
        prodEl.className = 'product-item';
        prodEl.innerHTML = `
                <div>
                    <img src="${this.product.imageURL}" alt="${this.product.title}">
                    <div class="product-item__content">
                    <h2>${this.product.title}</h2>
                    <h3>\$ ${this.product.price}</h3>
                    <p>${this.product.description}</p>
                    <button>Add to Cart</button>
                    </div>
                </div>
            `;
        const addCartButton = prodEl.querySelector('button');
        // addCartButton.addEventListener('click', this.addToCart.bind(this.product));
        addCartButton.addEventListener('click', this.addToCart);
        return prodEl;
    }
}

const productList = new ProductList();
productList.render();
