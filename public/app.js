// ---------------------- LOGIN ----------------------
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      alert('Login exitoso');
      window.location.href = '/computos';
    } else {
      alert(data.message);
    }
  });
}

// ---------------------- REGISTRO ----------------------
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    if (res.ok) {
      alert('Usuario registrado con éxito');
      window.location.href = '/';
    } else {
      alert(data.message);
    }
  });
}

// ---------------------- CRUD COMPUTO ----------------------
const loadButton = document.getElementById('loadComputos');
if (loadButton) {
  loadButton.addEventListener('click', async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Debe iniciar sesión');

    const res = await fetch('/api/computos', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = await res.json();
    const list = document.getElementById('computoList');
    list.innerHTML = '';

    data.forEach(c => {
      const li = document.createElement('li');
      li.textContent = `${c.marca} - ${c.modelo} - $${c.precio} - Stock: ${c.stock}`;
      list.appendChild(li);
    });
  });
}

// ---------------------- AGREGAR COMPUTO ----------------------
const addComputoForm = document.getElementById('addComputoForm');
if (addComputoForm) {
  addComputoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;

    const token = localStorage.getItem('token');
    if (!token) return alert('Debe iniciar sesión');

    const res = await fetch('/api/computos', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ marca, modelo, descripcion, precio, stock })
    });

    const data = await res.json();
    if (res.ok) {
      alert('Computadora agregada');
      window.location.reload();
    } else {
      alert(data.message);
    }
  });
}
