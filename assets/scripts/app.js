const productList = {
    products: [
        {
            title: 'Pillow',
            imageURL: 'https://confidentcare.com.au/image/cache/catalog/COVID-19/XDPIL%20=%20Web%202-300x300.jpg',
            price: 12.99,
            description: 'A soft pillow for your empty head.'
        },
        {
            title: 'Carpet',
            imageURL: 'https://i.pinimg.com/564x/ff/7c/5b/ff7c5b1b1e552248ccfe69a8bb955f41.jpg',
            price: 54.99,
            description: 'A lovely carpet that you will ruin with your dirty feet.'
        }
    ],
    render() {
        const renderHook = document.getElementById('app');
        const prodListEl = document.createElement('ul');
        prodListEl.className = 'product-list';

        for (const product of this.products) {
            const prodEl = document.createElement('li');
            prodEl.className = 'product-item';
            prodEl.innerHTML = `
                <div>
                    <img src="${product.imageURL}" alt="${product.title}">
                    <div class="product-item__content">
                    <h2>${product.title}</h2>
                    <h3>\$ ${product.price}</h3>
                    <p>${product.description}</p>
                    <button>Add to Cart</button>
                    </div>
                </div>
            `;
            prodListEl.append(prodEl);
        }

        renderHook.append(prodListEl);
    }
};
productList.render();
