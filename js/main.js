const contenedorProductos = document.getElementById("contenedor-productos")

const contenedorCarrito = document.getElementById("carrito-contenedor")

const botonVaciar = document.getElementById("carritoVaciar")

const unidadCarrito = document.getElementById("boton-carrito")

const precioTotal = document.getElementById("precioTotal")

/* Agregar los productos al carrito, creamos variable "carrito" */
let carrito = []

/* LocalStorage */
document.addEventListener("DOMContentLoaded", () => {
    const carritoLocalStorage = localStorage.getItem("carrito");
    if (carritoLocalStorage) {
        carrito = JSON.parse(carritoLocalStorage)
        actualizarCarrito() 
    }
})


/* Recorremos el array de stock con un forEach */
stockProductos.forEach((producto) => {
    /* Aca voy a crear un div de los productos para inyectar al HTML */
    const divHTML = document.createElement("div")
    divHTML.classList.add("card", "text-white", "bg-dark")
    divHTML.innerHTML = `
    <img src=${producto.img} class="card-img-top" alt="">
    <div class="card-body d-flex flex-column justify-content-center align-items-center text-center">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">${producto.desc}</p>
        <p class="precio-producto">$${producto.precio}</p>
        <a href="#" id="agregar${producto.id}" class="btn btn-primary">Comprar<i class='bx bxs-cart'></i></a>
    </div>
  `
    contenedorProductos.appendChild(divHTML)

    const boton = document.getElementById(`agregar${producto.id}`)
    boton.addEventListener("click", () => {
        agregalAlCarrito(producto.id)
    })
})


/* Creamos una funcion para agregar los productos al carrito */
const agregalAlCarrito = (prodId) => {
    const existe = carrito.some(prod => prod.id === prodId)

    if (existe) {
        carrito.map(prod => {
            if (prod.id === prodId) {
                prod.cantidad++
            }
        })
    } else {
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Agregado al carrito',
        showConfirmButton: false,
        timer: 800
      })
    actualizarCarrito()
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    localStorage.setItem("carrito", JSON.stringify(carrito))
    actualizarCarrito()
}

/* Actualizar carrito */
const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""

    carrito.forEach((prod) => {
        const div = document.createElement(`div`)
        div.className = ("carrito-contenedor")
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio: ${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})"><i class='bx bx-x'></i></button>
        `
        contenedorCarrito.appendChild(div)
    })
    unidadCarrito.innerText = carrito.length
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0)
}

botonVaciar.addEventListener("click", () => {
    carrito.length = 0
    actualizarCarrito()
    localStorage.removeItem("carrito")
    Swal.fire({
        position: 'top-start',
        icon: 'success',
        title: 'Carrito eliminado',
        showConfirmButton: false,
        timer: 900
    })
})

