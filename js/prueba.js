document.addEventListener('DOMContentLoaded', (event) => {
    /*--------------------- Nos aseguramos que nuestro DOM se haya cargado totalmente ---------------------*/
    fetchData()
});
/*--------------------- constantes ---------------------*/
const contenedorProductos = document.querySelector(`#contenedorproductos`)
const items = document.querySelector(`#items`)
const footer = document.querySelector('#footer-carrito')
/*--------------------- Simulamos consumir una base de datos ---------------------*/
const fetchData = async() => {
    try {
        const res = await fetch(`./js/stock.json`)
        const data = await res.json()
        pintarProductos(data)
        detectarBotones(data)
    } catch (error){
        console.log(error)
    }
}
/*--------------------- hacemos un forEach de nuestro data y mediante template y fragment pintamos nuestras cards, y evitamos el reflow ---------------------*/
const pintarProductos = (data) => {
    const template = document.querySelector(`#template-productos`).content
    const fragment = document.createDocumentFragment()
    data.forEach(producto => {
        template.querySelector(`img`).setAttribute(`src`, producto.img)
        template.querySelector(`h5`).textContent = producto.nombre
        template.querySelector(`.card-text`).textContent = producto.desc
        template.querySelector(`p span`).textContent = producto.precio
        template.querySelector(`button`).dataset.id = producto.id
        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })
    contenedorProductos.appendChild(fragment)
}
/*--------------------- Creamos el carrito ---------------------*/
let carrito = {}
/*--------------------- Con esta funcion detectamos los botones por id del producto ---------------------*/
const detectarBotones = (data) => {
    const botones = document.querySelectorAll(`.card button`)
    botones.forEach(btn => {
        btn.addEventListener(`click`, () => {
            const producto = data.find(item => item.id == btn.dataset.id)
            if (carrito.hasOwnProperty(producto.id)) {
                producto.cantidad++
            }
            carrito[producto.id] = { ...producto }
            pintarCarrito()
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto agregado',
                showConfirmButton: false,
                timer: 700
            })
            localStorage.setItem("carrito", JSON.stringify(carrito))
        })
    })

}
/*--------------------- Funcion donde pintamos el carrito modificando el DOM, mediante template y fragments para evitar el reflow ---------------------*/
const pintarCarrito = () => {
    items.innerHTML = ''
    const template = document.querySelector('#template-carrito').content
    const fragment = document.createDocumentFragment()
    Object.values(carrito).forEach(producto => {
        template.querySelector('th').textContent = producto.id
        template.querySelectorAll('td')[0].textContent = producto.nombre
        template.querySelectorAll('td')[1].textContent = producto.cantidad
        template.querySelector('span').textContent = producto.precio * producto.cantidad
        //botones
        template.querySelector('.btn-info').dataset.id = producto.id
        template.querySelector('.btn-danger').dataset.id = producto.id
        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })

    items.appendChild(fragment)
    pintarFooter()
    accionBotones()
}
/*--------------------- Funcion donde pintamos el footer modificando el DOM ---------------------*/
const pintarFooter = () => {
    footer.innerHTML = ''
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `
        return
    }
    const template = document.querySelector('#template-footer').content
    const fragment = document.createDocumentFragment()
    // sumar cantidad y sumar totales
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
    template.querySelectorAll('td')[0].textContent = nCantidad
    template.querySelector('span').textContent = nPrecio
    const clone = template.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)
    /*--------------------- boton vaciar carrito y vaciamos el localStrage ---------------------*/
    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {}
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Carrito eliminado',
            showConfirmButton: false,
            timer: 700
        })
        localStorage.clear("carrito")
        pintarCarrito()
    })
}
/*--------------------- Funcion donde le doy funciones a los botones del carrito ---------------------*/
const accionBotones = () => {
    const botonesAgregar = document.querySelectorAll('#items .btn-info')
    const botonesEliminar = document.querySelectorAll('#items .btn-danger')
    botonesAgregar.forEach(btn => {
        btn.addEventListener('click', () => {
            const producto = carrito[btn.dataset.id]
            producto.cantidad++
            localStorage.setItem("carrito", JSON.stringify(carrito))
            carrito[btn.dataset.id] = { ...producto }
            pintarCarrito()
        })
    })
    botonesEliminar.forEach(btn => {
        btn.addEventListener('click', () => {
            const producto = carrito[btn.dataset.id]
            producto.cantidad--
            localStorage.setItem("carrito", JSON.stringify(carrito))
            if (producto.cantidad === 0) {
                delete carrito[btn.dataset.id]
                
            } else {
                carrito[btn.dataset.id] = { ...producto }
            }
            pintarCarrito()
        })
    })
}