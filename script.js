'use strict';
// Store contact confirmed by the project owner.
const STORE = { whatsapp: '5511949271471' };
function whatsappUrl(message) { return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(message)}`; }
document.querySelectorAll('[data-whatsapp]').forEach(link => { link.href = whatsappUrl(link.dataset.whatsapp); });
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.hidden = false;
navigation.dataset.enhanced = 'true';
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); navigation.dataset.open = 'false'; }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); navigation.dataset.open = String(open); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); } });
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  let count = 0;
  document.querySelectorAll('[data-category]').forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; if (!card.hidden) count++; });
  document.querySelector('#filter-status').textContent = `${count} categoria${count === 1 ? '' : 's'} exibida${count === 1 ? '' : 's'}.`;
}));
const form = document.querySelector('#quote-form');
function validateField(id, text) {
  const field = document.getElementById(id);
  const valid = Boolean(field.value.trim());
  field.setAttribute('aria-invalid', String(!valid));
  document.getElementById(`${id}-error`).textContent = valid ? '' : text;
  return valid;
}
['name', 'message'].forEach(id => document.getElementById(id).addEventListener('input', () => { if (document.getElementById(id).getAttribute('aria-invalid') === 'true') validateField(id, id === 'name' ? 'Informe seu nome.' : 'Conte o que você precisa.'); }));
form.addEventListener('submit', event => {
  event.preventDefault();
  const nameValid = validateField('name', 'Informe seu nome.');
  const messageValid = validateField('message', 'Conte o que você precisa.');
  if (!nameValid || !messageValid) { document.getElementById(nameValid ? 'message' : 'name').focus(); return; }
  const data = new FormData(form);
  const message = `Olá, Connect! Meu nome é ${data.get('name').trim()}.\nInteresse: ${data.get('interest')}.\n${data.get('model').trim() ? `Modelo: ${data.get('model').trim()}.\n` : ''}Pedido: ${data.get('message').trim()}`;
  document.querySelector('#form-status').textContent = 'Abrindo o WhatsApp para você revisar e enviar a mensagem…';
  window.location.assign(whatsappUrl(message));
});
document.querySelector('#year').textContent = new Date().getFullYear();
