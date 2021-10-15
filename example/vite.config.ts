import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import GitRevisionVitePlugin, { runGitDefineCommand } from 'git-revision-vite-plugin'

export default defineConfig(async ({ command, mode }) => {
  const tagInfo = await runGitDefineCommand('git tag')

  return {
    base: './',
    plugins: [
      vue(),
      GitRevisionVitePlugin()
    ],
    define: {
      GIT_TAG: JSON.stringify(tagInfo),
    }
  }
})
