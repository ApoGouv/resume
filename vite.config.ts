/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// @see https://vitejs.dev/config/#conditional-config
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  console.log(` 🪛 Vite Config params:`, {
    command,
    mode,
    isSsrBuild,
    isPreview,
  });

  const config = {
    // @see https://vitejs.dev/config/shared-options.html#base
    base: '/',
    plugins: [react()],
    // test: {
    //   globals: true,
    //   environment: 'jsdom',
    //   setupFiles: ['./src/setupTests.ts'],
    //   pool: 'forks',
    // },
  };

  if (command === 'build' || (command === 'serve' && mode === 'production')) {
    config.base = '/resume';
  }

  return config;
});
