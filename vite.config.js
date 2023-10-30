import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		fs: {
		  // Add the directory path containing your JSON file to the allowed list
		  allow: ['D:/Program/SavletKit/Product store/prodcut-store'],
		},
	    },
	plugins: [sveltekit()]
});
