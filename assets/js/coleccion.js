import { coleccion } from './data.js';

// Función para seleccionar un número específico de elementos aleatorios de un arreglo
function seleccionarAleatorios(array, cantidad) {
    const resultados = [];
    const copia = array.slice(); // Crear una copia del arreglo original
    while (resultados.length < cantidad && copia.length > 0) {
        const indiceAleatorio = Math.floor(Math.random() * copia.length);
        resultados.push(copia.splice(indiceAleatorio, 1)[0]);
    }
    return resultados;
}

// Función para generar el HTML de cada producto en la colección
function generarColeccionHTML(arrayProductos) {
    const coleccionContainer = document.getElementById('coleccion-home');
    if (coleccionContainer) {
        const carousel = coleccionContainer.querySelector('.new-products-carousel-two');
        if (carousel) {
            carousel.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos productos

            arrayProductos.forEach(producto => {
                const productHTML = `
                    <div class="single-product-item text-center">
                        <figure class="product-thumb">
                            <a href="single-product.html"><img src="${producto.imagen || 'default-image.jpg'}" alt="${producto.nombre}" class="img-fluid"></a>
                        </figure>
                        <div class="product-details">
                            <h2><a href="single-product.html">${producto.nombre}</a></h2>
                            <div class="rating">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star-half"></i>
                                <i class="fa fa-star-o"></i>
                            </div>
                            <span class="price">${producto.precio}</span>
                        </div>
                    </div>
                `;
                carousel.innerHTML += productHTML;
            });
        }
    }
}

// Cargar productos aleatorios en la colección
document.addEventListener('DOMContentLoaded', function() {
    const productosAleatorios = seleccionarAleatorios(coleccion, 5);
    generarColeccionHTML(productosAleatorios);
});
