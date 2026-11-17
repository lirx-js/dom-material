import { aotPlugin } from '@lirx/dom-aot-plugin';
import { join } from 'path';
import { fileURLToPath } from 'url';

const DIRNAME = fileURLToPath(new URL('.', import.meta.url));
const NODE_MODULE_PATH = join(DIRNAME, 'node_modules');

/**
 * @type {import('vite').UserConfig}
 */
const config = {
  build: {
    target: 'esnext',
    useDefineForClassFields: true,
  },
  plugins: [
    aotPlugin({
      pathMatches: (path) => {
        // console.log(path);
        const matches =
          path.endsWith('.ts') ||
          path.endsWith('.component.mjs') ||
          path.endsWith('.modifier.mjs') ||
          path.includes('lirx/mdi');
        // if (matches) {
        //   console.log(`\nOPTIMIZING => ${path}`);
        // }
        return matches;
      },
    }),
  ],
  server: {
    // https: true,
    // host: true,
    port: '8080',
  },
  optimizeDeps: {
    include: [
      // '@lirx/promise',
      // '@lirx/utils',
      // '@lirx/core',
      // '@lirx/store',
      // '@lirx/dom',
      // '@lirx/mdi',
      // '@lirx/dom-material',
      // '@lirx/animations',
    ],
  },
  resolve: {
    alias: [
      {
        // this is required for the SCSS modules
        // https://github.com/vitejs/vite/issues/382
        find: /^~(.*)$/,
        replacement: (value) => {
          return value.replace(/^~(.*)$/, `${NODE_MODULE_PATH}/$1`);
        },
      },
    ],
  },
};

export default config;
