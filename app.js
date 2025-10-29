const API = 'http://localhost:3000/api/items';

const $ = id => document.getElementById(id);

async function fetchItems() {
  const res = await fetch(API);
  return res.json();
}

function renderItem(item) {
  const li = document.createElement('ion-item');
  li.innerHTML = `
    <ion-label>
      <h2>${escapeHtml(item.name)}</h2>
      <p>${escapeHtml(item.description || '')}</p>
    </ion-label>
    <ion-button slot="end" color="primary" size="small" data-id="${item._id}" class="edit">Editar</ion-button>
    <ion-button slot="end" color="danger" size="small" data-id="${item._id}" class="del">Borrar</ion-button>
  `;
  return li;
}

function escapeHtml(s){
  if(!s) return '';
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[c]);
}

async function load() {
  const list = $('itemsList');
  list.innerHTML = '';
  const items = await fetchItems();
  items.forEach(it => list.appendChild(renderItem(it)));

  // attach handlers
  document.querySelectorAll('.del').forEach(btn => btn.addEventListener('click', async e => {
    const id = e.target.dataset.id;
    if(confirm('¿Borrar item?')){
      await fetch(`${API}/${id}`, { method: 'DELETE' });
      load();
    }
  }));

  document.querySelectorAll('.edit').forEach(btn => btn.addEventListener('click', async e => {
    const id = e.target.dataset.id;
    const name = prompt('Nuevo nombre:');
    if(name === null) return;
    const description = prompt('Nueva descripción:');
    await fetch(`${API}/${id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ name, description }) });
    load();
  }));
}

async function addItem(){
  const name = $('nameInput').value;
  const description = $('descInput').value;
  if(!name || !name.trim()){ alert('Nombre requerido'); return; }
  await fetch(API, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ name: name.trim(), description: description||'' }) });
  $('nameInput').value = '';
  $('descInput').value = '';
  load();
}

document.addEventListener('DOMContentLoaded', () => {
  load();
  $('addBtn').addEventListener('click', addItem);
});
