var swiper = new Swiper(".mySwiper-1", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable:true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    }
});

var swiper = new Swiper(".mySwiper-2", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    breakpoints : {
        0: {
            slidesPerView: 1
        },
        520:{
            slidesPerView: 2
        },
        950:{
            slidesPerView: 3
        }
    }
});

//carrito
const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const elementos2 = document.getElementById('lista-2');
const elementos3 = document.getElementById('lista-3');
const lista = document.querySelector('#lista-carrito tbody');
let valorTotal = 0; // Variable para almacenar el valor total

cargarEvenListeners();

function cargarEvenListeners(){
    elementos1.addEventListener('click', comprarElemento);
    elementos2.addEventListener('click', comprarElemento);
    elementos3.addEventListener('click', comprarElemento);


    // Escuchar eventos de cambio en los campos de cantidad
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', actualizarCantidad);
    });
}

function comprarElemento(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento){
    const cantidad = parseInt(elemento.querySelector('.quantity-input').value); // Capturar la cantidad ingresada por el usuario
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: parseFloat(elemento.querySelector('.precio').textContent.replace('$', '').replace(',', '')), // Convertir el precio a número flotante y eliminar caracteres no numéricos
        id: elemento.querySelector('a').getAttribute('data-id'),
        cantidad: cantidad // Incluir la cantidad en la estructura del elemento
    }

    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento){
    const row = document.createElement('tr');
    const subtotal = elemento.precio * elemento.cantidad; // Calcular el subtotal multiplicando el precio por la cantidad
    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width=100 >
        </td>

        <td>
            ${elemento.titulo}
        </td>

        <td>
            ${elemento.precio}
        </td>

        <td>
            ${elemento.cantidad}
        </td>

        <td>
            ${subtotal.toFixed(3)}
        </td>

 
    `;

    lista.appendChild(row);
    valorTotal += subtotal; // Sumar el subtotal al valor total
    document.getElementById('total').textContent = valorTotal.toFixed(3); // Mostrar el valor total en el span con id "total"
}



function actualizarCantidad(e) {
    const input = e.target;
    const row = input.closest('tr');
    const cantidad = parseInt(input.value);

    // Obtener el precio del producto de la misma fila
    const precioUnitario = parseFloat(row.querySelector('td:nth-child(3)').textContent);
    
    // Actualizar el precio total de la fila multiplicando el precio unitario por la cantidad
    const precioTotal = precioUnitario * cantidad;
    row.querySelector('td:nth-child(4)').textContent = cantidad; // Mostrar la cantidad en la tabla
    row.querySelector('td:nth-child(5)').textContent = precioTotal.toFixed(3); // Mostrar el nuevo precio total

    // Actualizar el valor total sumando o restando la diferencia al valor total existente
    valorTotal += (precioTotal - (parseInt(row.dataset.precioTotal) || 0));
    document.getElementById('total').textContent = valorTotal.toFixed(3);
    
    // Guardar el nuevo precio total en el atributo dataset para futuras actualizaciones
    row.dataset.precioTotal = precioTotal;
}
