import { todosLosProductos } from './data.js';

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

function generarProductosHTML(arrayProductos) {
    const productosContainer = document.getElementById('productos-carousel');
    if (productosContainer) {
        productosContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos productos

        arrayProductos.forEach(producto => {
            // Determinar si el producto tiene 1 o 2 colores basados en las propiedades oro y plata
            let textoColores = '1 color'; // Texto por defecto

            if (producto.oro && producto.plata) {
                textoColores = '2 colores'; // Si ambos son true, tiene 2 colores
            } else if (producto.oro || producto.plata) {
                textoColores = '1 color'; // Si uno de los dos es true, tiene 1 color
            }

            const productHTML = `
                <div class="single-product-item text-center">
                    <figure class="product-thumb">
                        <a href="single-product.html?id=${producto.nombre.replace(/\s+/g, '-').toLowerCase()}"><img src="${producto.imagen || 'default-image.jpg'}" alt="${producto.nombre}" class="img-fluid"></a>
                        <!-- Texto en la esquina superior derecha -->
                        <div class="top-right-text">${textoColores}</div>
                    </figure>
                    <div class="product-details">
                        <span class="rating">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star-half"></i>
                            <i class="fa fa-star-o"></i>
                        </span>
                        <h2><a href="single-product.html?id=${producto.nombre.replace(/\s+/g, '-').toLowerCase()}">${producto.nombre}</a></h2>
                        <span class="price">${producto.precio}</span>
                    </div>
                </div>
            `;
            productosContainer.innerHTML += productHTML;
        });
    }
}



// Función para obtener los parámetros de la URL
function getQueryParams() {
    const query = window.location.search.substring(1);
    const params = {};
    query.split('&').forEach(part => {
        const [key, value] = part.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return params;
}

// Cargar productos aleatorios en la página principal
if (document.getElementById('productos-carousel')) {
    const productosAleatorios = seleccionarAleatorios(todosLosProductos, 12);
    generarProductosHTML(productosAleatorios);
}





// Mostrar detalles del producto en la página de detalles
document.addEventListener('DOMContentLoaded', function() {
    const params = getQueryParams();
    const productoNombre = params['id'].replace(/-/g, ' ');

    const producto = todosLosProductos.find(p => p.nombre.toLowerCase() === productoNombre.toLowerCase());

    if (producto) {
        // Actualizar detalles del producto
        document.getElementById('product-name').textContent = producto.nombre;
        document.getElementById('product-name-detailed').textContent = producto.nombre;
        document.getElementById('product-price').textContent = producto.precio;
        document.getElementById('product-price-detailed').textContent = producto.precio;
        document.getElementById('product-introduction').textContent = producto.introduccion;

        // Actualizar características
        const featuresContainer = document.getElementById('product-features');
        featuresContainer.innerHTML = ''; // Limpiar características anteriores
        
        producto.caracteristicas.forEach((caracteristica) => {
            const featureElement = document.createElement('a');
            featureElement.className = 'btn btn-add-to-cart btn-whislist';
            featureElement.textContent = caracteristica;
            featuresContainer.appendChild(featureElement);
        });

        // Actualizar opciones de color
        const colorsContainer = document.getElementById('product-colors').querySelector('ul');
        colorsContainer.innerHTML = ''; // Limpiar opciones de color anteriores

        if (producto.oro) {
            const oroItem = document.createElement('li');
            oroItem.className = 'color-item black';
            oroItem.innerHTML = `
                <div class="color-hvr">
                    <span class="color-fill"></span>
                    <span class="color-name">Oro</span>
                </div>
            `;
            oroItem.dataset.index = 1; // Índice para la segunda imagen (index 1)
            oroItem.addEventListener('click', () => scrollToImage(1));
            colorsContainer.appendChild(oroItem);
        }
        
        if (producto.plata) {
            const plataItem = document.createElement('li');
            plataItem.className = 'color-item silver';
            plataItem.innerHTML = `
                <div class="color-hvr">
                    <span class="color-fill"></span>
                    <span class="color-name">Plata</span>
                </div>
            `;
            plataItem.dataset.index = 2; // Índice para la tercera imagen (index 2)
            plataItem.addEventListener('click', () => scrollToImage(2));
            colorsContainer.appendChild(plataItem);
        }

        document.getElementById('product-description1').textContent = producto.descripcion1;
        document.getElementById('product-description2').textContent = producto.descripcion2;
        document.getElementById('product-description1-mobile').textContent = producto.descripcion1;
        document.getElementById('product-description2-mobile').textContent = producto.descripcion2;

        // Actualizar el carrusel de imágenes
        const carousel = document.getElementById('product-carousel');
        const images = [producto.imagen, producto.imagen2, producto.imagen3, producto.imagen4];
        carousel.innerHTML = ''; // Limpiar imágenes anteriores
        images.forEach((imgSrc) => {
            if (imgSrc) {
                const imgHTML = `<div class="single-thumb-item"><a><img class="img-fluid" src="${imgSrc}" alt="Product"/></a></div>`;
                carousel.innerHTML += imgHTML;
            }
        });

        // Función para desplazar el carrusel a la imagen correspondiente
        function scrollToImage(index) {
            const carouselItems = carousel.querySelectorAll('.single-thumb-item');
            if (index >= 0 && index < carouselItems.length) {
                const itemToScroll = carouselItems[index];
                // Dependiendo de la biblioteca que uses, el método para desplazar el carrusel puede variar
                // Ejemplo con Owl Carousel:
                $(carousel).trigger('to.owl.carousel', [index, 300]);
            }
        }
    } else {
        console.error('Producto no encontrado');
    }
});











