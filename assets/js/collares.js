import { collares } from './data.js'; // Ajusta la ruta según tu estructura de archivos

const productsContainer = document.getElementById('products-container');

collares.forEach(arete => {
    const productItem = document.createElement('div');
    productItem.className = 'col-6 col-sm-3 col-lg-2';

    const productHTML = `
        <div class="single-product-item text-center">
            <figure class="product-thumb">
                <a href="single-product.html?id=${arete.nombre.replace(/\s+/g, '-').toLowerCase()}">
                    <img src="${arete.imagen || 'default-image.jpg'}" alt="${arete.nombre}" class="img-fluid">
                </a>
            </figure>
            <div class="product-details">
                <h2><a href="single-product.html?id=${arete.nombre.replace(/\s+/g, '-').toLowerCase()}">${arete.nombre}</a></h2>
                <div class="rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star-half"></i>
                    <i class="fa fa-star-o"></i>
                </div>
                <span class="price">${arete.precio}</span>
            </div>
        </div>
    `;

    productItem.innerHTML = productHTML;
    productsContainer.appendChild(productItem);
});
