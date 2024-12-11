import { collares } from './data.js'; // Ajusta la ruta según tu estructura de archivos

const productsContainer = document.getElementById('products-container');

collares.forEach(collar => {
    const productItem = document.createElement('div');
    productItem.className = 'col-6 col-sm-3 col-lg-2';

    // Lógica para detectar colores (oro y plata)
    let textoColores = '1 color'; // Texto por defecto

    if (collar.oro && collar.plata) {
        textoColores = '2 colores'; // Si ambos son true, tiene 2 colores
    } else if (collar.oro || collar.plata) {
        textoColores = '1 color'; // Si uno de los dos es true, tiene 1 color
    }

    const productHTML = `
        <div class="single-product-item text-center">
            <figure class="product-thumb">
                <a href="single-product.html?id=${collar.nombre.replace(/\s+/g, '-').toLowerCase()}">
                    <img src="${collar.imagen || 'default-image.jpg'}" alt="${collar.nombre}" class="img-fluid">
                </a>
                <!-- Texto en la esquina superior derecha para colores -->
                <div class="top-right-text">${textoColores}</div>
            </figure>
            <div class="product-details">
                <h2><a href="single-product.html?id=${collar.nombre.replace(/\s+/g, '-').toLowerCase()}">${collar.nombre}</a></h2>

                <span class="price">${collar.precio}</span>
            </div>
        </div>
    `;

    productItem.innerHTML = productHTML;
    productsContainer.appendChild(productItem);
});

