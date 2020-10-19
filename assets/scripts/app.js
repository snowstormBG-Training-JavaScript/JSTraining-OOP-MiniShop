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

class ElementAttribute {
    constructor(attrName, attrValue) {
        this.name = attrName;
        this.value = attrValue;
    }
}

class Component {
    constructor(renderHookId, shouldRender = true) {
        this.hookId = renderHookId;
        if (shouldRender) {
            this.render();
        }
    }

    render() {
    }

    createRootElement(tag, cssClasses, attributes) {
        const rootElement = document.createElement(tag);
        if (cssClasses) {
            rootElement.className = cssClasses;
        }
        if (attributes && attributes.length > 0) {
            for (const attribute of attributes) {
                rootElement.setAttribute(attribute.name, attribute.value);
            }
        }
        document.getElementById(this.hookId).append(rootElement);
        return rootElement;
    }
}

class ProductItem extends Component {
    constructor(product, renderHookId) {
        super(renderHookId, false);
        this.product = product;
        this.render();
    }

    addToCart = () => {
        App.addProductToCart(this.product);
    }

    render() {
        const prodEl = this.createRootElement('li', 'product-item');
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
    }
}

class ProductList extends Component {
    #products = [];  //The # means PRIVATE property

    constructor(renderHookId) {
        super(renderHookId, false);
        this.render();
        this.fetchProducts();
    }

    fetchProducts() {
        this.#products = [
            new Product('Pillow',
                'https://confidentcare.com.au/image/cache/catalog/COVID-19/XDPIL%20=%20Web%202-300x300.jpg',
                12.99,
                'A soft pillow for your empty head.'),
            new Product('Carpet',
                'https://i.pinimg.com/564x/ff/7c/5b/ff7c5b1b1e552248ccfe69a8bb955f41.jpg',
                54.99,
                'A lovely carpet that you will ruin with your dirty feet.'),
        ];
        this.renderProducts();
    }

    renderProducts() {
        for (const product of this.#products) {
            new ProductItem(product, 'prod-list');
        }
    }

    render() {
        this.createRootElement('ul', 'product-list',
            [new ElementAttribute('id', 'prod-list')]);
        if (this.#products && this.#products.length > 0) {
            this.renderProducts();
        }
    }
}

class ShoppingCart extends Component {
    items = [];

    set cartItems(value) {
        this.items = value;
        this.totalOutput.innerHTML = `<h2>Total \$${this.totalAmount.toFixed(2)}</h2>`;
    }

    get totalAmount() {
        return this.items.reduce((prevVal, curItem) => prevVal + curItem.price
            , 0);
    }

    constructor(renderHookId) {
        super(renderHookId, false);
        this.orderProducts = () => {
            console.log('ordering...');
            console.log(this.items);
        }
        this.render();
    }


    addProduct(product) {
        const updatedItems = [...this.items];
        updatedItems.push(product);
        this.cartItems = updatedItems;
    }

    render() {
        const cartEl = this.createRootElement('section', 'cart');
        cartEl.innerHTML = `
            <h2>Total \$${0}</h2>
            <button>Order Now!</button>
        `;
        const orderButton = cartEl.querySelector('button');
        // orderButton.addEventListener('click', () => this.orderProducts());
        orderButton.addEventListener('click', this.orderProducts);
        this.totalOutput = cartEl.querySelector('h2');
    }
}

class Shop extends Component {
    constructor() {
        super();
    }

    render() {
        this.cart = new ShoppingCart('app');
        new ProductList('app');
    }
}

class App {
    static cart;

    static init() {
        const shop = new Shop();
        this.cart = shop.cart;
    }

    static addProductToCart(product) {
        this.cart.addProduct(product);
    }
}

App.init();


