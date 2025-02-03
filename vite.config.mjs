//arquivo dedicado à configurações específicas do vite

import  { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

//fazer o vite suportar path do ts (@/)
export default defineConfig({
    plugins: [tsconfigPaths()],
})