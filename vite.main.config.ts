import { defineConfig } from 'vite'
import vitePluginRequire from 'vite-plugin-require'

// https://vitejs.dev/config
export default defineConfig({
  // https://github.com/wangzongming/vite-plugin-require/issues/40
  // eslint-disable-next-line
  plugins: [(vitePluginRequire as any).default()],
  build: {
    sourcemap: true,
    lib: {
      fileName: () => '[name].js',
      entry: 'src/main/main.ts',
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        dir: '.vite/build',
      },
    },
  },
})
