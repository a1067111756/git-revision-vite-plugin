import { Plugin } from 'vite'
import { UserConfig } from 'vite'
import {getCommitHash, getVersion, getBranch, getLastCommitDateTime, runGitCommand} from './helper/run-git-command'
import type { GitRevisionPluginOptions } from './types'

// 预定义命令
const COMMITHASH_COMMAND = 'rev-parse HEAD'
const VERSION_COMMAND = 'describe --always'
const BRANCH_COMMAND = 'rev-parse --abbrev-ref HEAD'
const LASTCOMMITDATETIME_COMMAND = 'log -1 --format=%cI'

// 预定义挂载变量名
const COMMITHASH_VAR = 'COMMITHASH'
const VERSION_VAR = 'VERSION'
const BRANCH_VAR = 'BRANCH'
const LASTCOMMITDATETIME_VAR = 'LASTCOMMITDATETIME'

// 默认全局选项
const defaultOpt: GitRevisionPluginOptions = {
  commitHash: true,
  version: true,
  branch: true,
  lightweightTags: true,
  lastCommitDateTime: true,
  commitHashVar: COMMITHASH_VAR,
  versionVar: VERSION_VAR,
  branchVar: BRANCH_VAR,
  lastCommitDateTimeVar: LASTCOMMITDATETIME_VAR,
  commitHashCommand: COMMITHASH_COMMAND,
  versionCommand: VERSION_COMMAND,
  branchCommand: BRANCH_COMMAND,
  lastCommitDateTimeCommand: LASTCOMMITDATETIME_COMMAND
}

// 默认导出
export default function GitRevisionVitePlugin (options?: GitRevisionPluginOptions): Plugin {
  // 定义插件唯一id
  const virtualFileId = '@git-revision-vite-plugin'

  // 注入全局选项检查
  if (options?.versionCommand && options.lightweightTags) {
    throw new Error("lightweightTags can't be used together versionCommand")
  }

  // 合并全局选项
  const mergeOptions = Object.assign(defaultOpt,options || {})
  mergeOptions.versionCommand = options?.versionCommand || VERSION_COMMAND + (options?.lightweightTags ? ' --tags' : '')

  return {
    name: 'git-revision-vite-plugin',
    config (config: UserConfig, env: { mode: string, command: string }) {
      // 执行commit hash
      getCommitHash(mergeOptions)
        .then((output: string) => {
          config.define![`${COMMITHASH_VAR}`] = JSON.stringify(output)
        })
        .catch((err: any) => {
          throw new Error(err)
        })

      // 执行version
      getVersion(mergeOptions)
        .then((output: string) => {
          config.define![`${VERSION_VAR}`] = JSON.stringify(output)
        })
        .catch((err: any) => {
          throw new Error(err)
        })

      // 执行branch
      getBranch(mergeOptions)
        .then((output: string) => {
          config.define![`${BRANCH_VAR}`] = JSON.stringify(output)
        })
        .catch((err: any) => {
          throw new Error(err)
        })

      // 执行lastCommitDateTime
      getLastCommitDateTime(mergeOptions)
        .then((output: string) => {
          config.define![`${LASTCOMMITDATETIME_VAR}`] = JSON.stringify(output)
        })
        .catch((err: any) => {
          throw new Error(err)
        })
    }
  }
}

// 自定义执行git命令
export function runGitDefineCommand (gitCommand: string) {
  if (gitCommand.startsWith('git')) {
    gitCommand = gitCommand.substr(3)
  }

  return new Promise((resolve, reject) => {
    runGitCommand(undefined, gitCommand, function (err: Error | null, output: string) {
      if (err) {
        reject(err)
      }

      resolve(output)
    })
  })
}