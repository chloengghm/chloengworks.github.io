import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// base './' keeps asset paths relative so it works on GitHub Pages project sites too
export default defineConfig({ plugins:[react()], base:'./' })
