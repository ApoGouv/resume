/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig, UserConfig } from 'vite';

// @see https://vitejs.dev/config/#conditional-config
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  console.log(` 🪛 Vite Config params:`, {
    command,
    mode,
    isSsrBuild,
    isPreview,
  });

  const config: UserConfig = {
    // @see https://vitejs.dev/config/shared-options.html#base
    base: '/',
    plugins: [react()],
    build: {
      minify: false,
      // sourcemap: true,
      rollupOptions: {
        output: {
          dir: 'dist',
          // more info https://rollupjs.org/configuration-options/#output-assetfilenames
          assetFileNames: (assetInfo): string => {
            // console.log(
            //   ` 🪛 Vite Config build > rollupOptions > assetFileNames > assetInfo Name:`,
            //   {
            //     assetInfoName: assetInfo?.name ?? '',
            //   }
            // );

            const assetName: string = assetInfo?.name ?? ''; // Handle undefined case

            if (!assetName) {
              throw new Error('Unexpected condition, assetInfo had no name');
            }
            const assetsFolder = 'assets/';
            const extType: string =
              assetName.split('.').at(1)?.toLowerCase() ?? '';

            let assetsSubFolder = '';
            if (/png|jpe?g|svg|webp|gif|tiff|bmp|ico/i.test(extType)) {
              assetsSubFolder = 'images/';
            } else if (/css|sass|scss/i.test(extType)) {
              assetsSubFolder = 'css/';
            } else if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
              assetsSubFolder = 'fonts/';
            }

            return `${assetsFolder}${assetsSubFolder}[name]-[hash][extname]`;
          }, // END of assetFileNames
          chunkFileNames: 'assets/js/[name].[hash].js',
          entryFileNames: 'assets/js/[name].[hash].js',
        }, // End of output
      }, // End of rollupOptions
    }, // End of build
  };

  if (command === 'build' || (command === 'serve' && mode === 'production')) {
    config.base = '/resume';

    if (config.build !== undefined) {
      config.build.minify = true;
    }
  }

  return config;
});
