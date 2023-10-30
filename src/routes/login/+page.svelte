<script>
 import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { isLoggedIn } from '../../lib/auth';

  let username = '';
  let password = '';
  let error = '';
  let users = [];

  async function fetchUsers() {
    const response = await fetch("/db.json");
    const data = await response.json();
    users = data.users;
  }

  onMount(fetchUsers);

  async function handleLogin() {
    const user = users.find(
      user => user.username === username && user.password === password
    );
    if (user) {
      isLoggedIn.set(true); 
      goto('/products');
    } else {
      error = 'Invalid username or password';
    }
  }
</script>

<h1>Login</h1>

<form on:submit|preventDefault={handleLogin}>
  <label for="username">Username:</label>
  <input type="text" id="username" bind:value={username} />

  <label for="password">Password:</label>
  <input type="password" id="password" bind:value={password} />

  <button type="submit">Login</button>
</form>

{#if error}
  <p class="error">{error}</p>
{/if}

<style>
  h1 {
    text-align: center;
    font-size: 2em;
    margin-bottom: 20px;
  }

  form {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 10px;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-top: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    width: 100%;
    margin-top: 20px;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #3498db;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }

  button:hover {
    background-color: #217dbb;
  }

  p.error {
    color: red;
    margin-top: 10px;
    text-align: center;
  }
</style>
