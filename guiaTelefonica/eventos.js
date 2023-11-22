const inputName = document.querySelector('#name-input');
const inputPhone = document.querySelector('#phone-input');
const form = document.querySelector('#form');
const formBtn = document.querySelector('#form-btn');
const list = document.querySelector('#list');
const closeBtn = document.querySelector('#cerrar-btn');
// Consigo el usuario para guardarle las lista de contactos a ese usuario en especifico
const user = JSON.parse(localStorage.getItem('user'))
console.log(user);

// Si no existe ningun usuario vuelvo a a pag principal
if (!user) {
  window.location.href = '../home/index.html'
}

const NAME_REGEX = /[A-Z][a-z]{2,20}$/;
const PHONE_REGEX = /^[0]{1}[24]{1}[12]{1}[462]{1}[0-9]{7}$/;

let nameValidation = false;
let phoneValidation = false;

// ----------------- Validacion del input --------------------
const validateInput = (input, validation) => {
  // Selecciono el p 
  const helper = input.parentElement.children[2];

  // Verifico las validaciones para quitar el atributo disabled del boton
  if (nameValidation && phoneValidation) {
    formBtn.disabled = false;
  } else {
    formBtn.disabled = true;
  }

  // Valido si el input esta vacio
  // Si la validacion es verdadera
  // Si la validacion es falsa
  if (input.value === '') {
    input.classList.remove('error');
    input.classList.remove('correct');
    helper.classList.remove('show');
  } else if (validation) {
    input.classList.add('correct');
    input.classList.remove('error');
    helper.classList.remove('show');
  } else {
    input.classList.add('error');
    input.classList.remove('correct');
    helper.classList.add('show');
  }
}

// -------------- Validacion al editar el input ----------------
const validaEditteInput = (input, validation, validationEditName, validationEditPhone, btn) => {

  // Verifico las validaciones para quitar el atributo disabled del boton
  if (validationEditName && validationEditPhone) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }

  // Valido si el input esta vacio
  // Si la validacion es verdadera
  // Si la validacion es falsa
  if (input.value === '') {
    input.classList.remove('error');
    input.classList.remove('correct');
  } else if (validation) {
    input.classList.add('correct');
    input.classList.remove('error');
  } else {
    input.classList.add('error');
    input.classList.remove('correct');
  }
}

// -------------- Validacion REGEX del nombre ------------------
inputName.addEventListener('input', e => {
  nameValidation = NAME_REGEX.test(inputName.value);
  validateInput(inputName, nameValidation)
});

// -------------- Validacion REGEX del telefono ---------------
inputPhone.addEventListener('input', e => {
  phoneValidation = PHONE_REGEX.test(inputPhone.value);
  validateInput(inputPhone, phoneValidation)
});

// Evento para crear los contactos
form.addEventListener('submit', async e => {
  e.preventDefault()
    const responseJSON = await fetch('http://localhost:3000/names', {
        // POST --> Enviar datos
        method: 'POST',
        // headers --> Especificar el tipo de dato que le voy a enviar
        headers: {
            // Contenido de tipo JSON
            'Content-Type': 'application/json'
        },
        // body --> Donde uno envía ese contenido
        // stringify --> para volverlo JSON
        body: JSON.stringify({name: inputName.value, phone: inputPhone.value, user: user.username}),
    });
    // El response que nos trae el último id del usuario creado
    const response = await responseJSON.json()

  const newContact = document.createElement('li');
  newContact.classList.add('list-item');
  newContact.innerHTML = `
  <li id="${response.id}">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="delete-icon">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
  </svg>
  <input type="text" value="${response.name}" readonly>
  <input type="text" value="${response.phone}" readonly>

  <button class="edit-btn"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="edit-icon">
    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="check-icon check">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg></button>
  </li>
  `;
  list.append(newContact);
  inputName.value = '';
  inputPhone.value = '';
  nameValidation = false;
  phoneValidation = false;
  validateInput(inputName);
  validateInput(inputPhone);
});

// Evento de eliminar y editar contactos
list.addEventListener('click', async e => {
  if (e.target.closest('.delete-icon')) {
    const id = e.target.closest('.delete-icon').parentElement.id;

    // Borro el elemento de la base de datos
    await fetch(`http://localhost:3000/names/${id}`, {method: 'DELETE'})

    e.target.parentElement.parentElement.remove();
  }

  else if (e.target.closest('.edit-btn')) {
    const id = e.target.parentElement.parentElement.id;
    const editBtn = e.target.closest('.edit-btn'); 
    const editName = editBtn.parentElement.children[1];
    const editPhone = editBtn.parentElement.children[2];

    await fetch(`http://localhost:3000/names/${id}`, {
        // PATCH --> Solo cambia una propiedad de ese objeto o de lo que tengamos en esa base de datos
        method: 'PATCH',
        // headers --> Especificar el tipo de dato que voy a cambiar
        headers: {
            // Contenido de tipo JSON
            'Content-Type': 'application/json'
        },
        // stringify --> para volverlo JSON
        body: JSON.stringify({name: editName.value, phone: editPhone.value}),
    });

    let editNameValidation = true;
    let editPhoneValidation = true;

    if (!editBtn.classList.contains('editando')) { 
      editBtn.classList.add('editando');
      editName.removeAttribute('readonly');
      editPhone.removeAttribute('readonly');
      editBtn.children[0].classList.add('check');
      editBtn.children[1].classList.remove('check');
      editName.classList.add ('modif');
      editPhone.classList.add ('modif');
      editPhone.classList.add('correct');
      editName.classList.add('correct');
      
      editName.addEventListener('input', e => {
        editNameValidation = NAME_REGEX.test(editName.value);
        validaEditteInput (editName, editNameValidation, editNameValidation, editPhoneValidation, editBtn)       
      });
      
      editPhone.addEventListener('input', e => {
        editPhoneValidation = PHONE_REGEX.test(editPhone.value);
        validaEditteInput (editPhone, editPhoneValidation, editNameValidation, editPhoneValidation, editBtn)          
      });
           
    } else {
      editBtn.classList.remove('editando');
      editName.setAttribute('readonly', true);
      editPhone.setAttribute('readonly', true);
      editPhone.classList.remove('correct');
      editName.classList.remove('correct');
      
      // Guardar valor
      editName.setAttribute('value', editName.value);
      editPhone.setAttribute('value', editPhone.value);
      editBtn.children[1].classList.add('check');
      editBtn.children[0].classList.remove('check')
      editName.classList.remove ('modif');
      editPhone.classList.remove ('modif');
      
    }
  };
});

// Evento de Cerrar Sesión
closeBtn.addEventListener('click', e => {
  localStorage.removeItem('user')
  window.location.href = '../home/index.html'
})

// Función para cargar los contactos de cada usuario al momento de refrescar la pág 
const getContacts = async () => {
  const response = await fetch('http://localhost:3000/names', {method: 'GET'})
  const contacts = await response.json()
  const userContacts = contacts.filter(element => element.user === user.username)
  userContacts.forEach(element => {
    const newContact = document.createElement('li');
  newContact.classList.add('list-item');
  newContact.innerHTML = `
  <li id="${element.id}">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="delete-icon">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
  </svg>
  <input type="text" value="${element.name}" readonly>
  <input type="text" value="${element.phone}" readonly>

  <button class="edit-btn"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="edit-icon">
    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="check-icon check">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg></button>
  </li>
  `;
  list.append(newContact);
  })
}
getContacts()