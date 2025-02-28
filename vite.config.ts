/* eslint-disable prefer-const */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { dependencies } from './package.json';

const packagesSplit: string[] = [
];

function renderChunks(deps: Record<string, string>) {
  let chunks: Record<string, string[]> = {};
  Object.keys(deps).forEach((key) => {
    if (packagesSplit.includes(key)) return;
    chunks[ key ] = [ key ];
  });
  return chunks;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    build: {
      // minify: true,
      minify: 'esbuild',
      esbuild: {
        drop: mode !== 'production' ? [] : [ 'console', 'debugger' ],
      },
      chunkSizeWarningLimit: 1500,
      sourcemap: mode !== 'production',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: packagesSplit,
            ...renderChunks(dependencies),
          },
        },
      },
    },
    plugins: [ react() ],
    preview: {
      host: '0.0.0.0',
      cors: true,
      port: 4173,
    },
    server: {
      watch: { usePolling: true },
      allowedHosts: [ 'hp15da0011la' ],
      host: '0.0.0.0',
      cors: true,
      port: 5173,
    },
  };
});
