const formCreate = document.querySelector('#form-create')
const createInput = document.querySelector('#create-input')
const formLogin = document.querySelector('#form-login')
const loginInput = document.querySelector('#login-input')
const notification = document.querySelector('.notification')

// Iniciar sesión
formLogin.addEventListener('submit', async e => {
    e.preventDefault()
    // Envío la información a la db users
    const response = await fetch('http://localhost:3000/users', {method: 'GET'})
    // Convierto a JSON
    const users = await response.json()
    // Encuentro el usuario - que sea igual al valor del input
    const user = users.find(user => user.username === loginInput.value)

    // Si el input está vacío
    if (loginInput.value === '') {
        // Envio la notificación
        notification.innerHTML = 'Debe ser un usuario válido'
        // Añado la clase
        notification.classList.add('show-notification')
        // Declaro el tiempo en pantalla
        setTimeout(() => {
            notification.classList.remove('show-notification')
        }, 3000);
    }
    // Si el usuario no existe notificar
    else if (!user) {
        notification.innerHTML = `El usuario "${loginInput.value}" no existe`
        notification.classList.add('show-notification')
        setTimeout(() => {
            notification.classList.remove('show-notification')
    }, 3000);
    }

    // Si existe, lo envio a la pagina
    else {
        localStorage.setItem('user',JSON.stringify(user))
        window.location.href = '../guiaTelefonica/phone.html'
    }
})

// Registrar usuario
formCreate.addEventListener('submit', async e => {
    e.preventDefault()
    // Envío la información a la db users
    const response = await fetch('http://localhost:3000/users', {method: 'GET'})
    // Convierto a JSON
    const users = await response.json()
    // Encuentro el usuario - que sea igual al valor del input
    const user = users.find(user => user.username === createInput.value)

    // Si el input está vacío
    if (createInput.value === '') {
        // Envio la notificación
        notification.innerHTML = 'El usuario no puede estar vacío'
        // Añado la clase
        notification.classList.add('show-notification')
        // Declaro el tiempo en pantalla
        setTimeout(() => {
            notification.classList.remove('show-notification')
        }, 3000);
    }
    // Si el usuario existe
    else if (user) {
        notification.innerHTML = `El usuario "${createInput.value}" ya exite`
        notification.classList.add('show-notification')
        setTimeout(() => {
            notification.classList.remove('show-notification')
        }, 3000);
    }
    // Creamos el usuario
    else {
        await fetch('http://localhost:3000/users', {
            // Envio los datos
            method: 'POST',
            // Especifico el tipo de dato que voy a enviar (Contenido JSON)
            headers: {
                'Content-Type': 'application/json'
            },
            // Dede dónde se envia el contenido
            body: JSON.stringify({username: createInput.value})
        })
        // Envio la notificacion de que el usuario se ha creado
        notification.innerHTML = `El usuario "${createInput.value}" se ha creado exitosamente`
        notification.classList.add('show-notification')
        setTimeout(() => {
            notification.classList.remove('show-notification')
        }, 3000);
        // Se borra el input al haber creado el usuario
        createInput.value = ''
    }

})