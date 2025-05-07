import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import postcss from '@vituum/vite-plugin-postcss';

export default defineConfig({
	plugins: [postcss(), tailwindcss(), sveltekit()]
});
