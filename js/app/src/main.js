import App from './App.svelte';

// Find an existing element in the page or create one dynamically
let target = document.getElementById('my-svelte-container');

if (!target) {
  target = document.createElement('div');
  target.id = 'my-svelte-container';
  document.body.appendChild(target);
}

const app = new App({
  target,  // Attach Svelte to the existing element
  props: {
    name: 'Injected Svelte App'
  }
});

export default app;