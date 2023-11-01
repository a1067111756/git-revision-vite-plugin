import {getCommitHash, getVersion, getBranch, getLastCommitDateTime, runGitCommand} from './helper/run-git-command'
import type { Plugin, UserConfig } from 'vite'
import type { GitRevisionPluginOptions } from './types'

// 预定义命令
const COMMITHASH_COMMAND = 'rev-parse HEAD'
const VERSION_COMMAND = 'describe --always'
const BRANCH_COMMAND = 'rev-parse --abbrev-ref HEAD'
const LASTCOMMITDATETIME_COMMAND = 'log -1 --format=%cI'

// 预定义挂载变量名
const COMMITHASH_VAR = 'GIT_COMMITHASH'
const VERSION_VAR = 'GIT_VERSION'
const BRANCH_VAR = 'GIT_BRANCH'
const LASTCOMMITDATETIME_VAR = 'GIT_LASTCOMMITDATETIME'

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
    config: async (config: UserConfig, env: { mode: string, command: string }) => {
      // 执行commit hash
      mergeOptions.commitHash && await getCommitHash(mergeOptions)
        .then((output: string) => {
          config.define![`${mergeOptions.commitHashVar}`] = JSON.stringify(output)
        })
        .catch((err: any) => {
          throw new Error(err)
        })

      // 执行version
      mergeOptions.version && await getVersion(mergeOptions)
        .then((output: string) => {
          config.define![`${mergeOptions.versionVar}`] = JSON.stringify(output)
        })
        .catch((err: any) => {
          throw new Error(err)
        })

      // 执行branch
      mergeOptions.branch && await getBranch(mergeOptions)
        .then((output: string) => {
          config.define![`${mergeOptions.branchVar}`] = JSON.stringify(output)
        })
        .catch((err: any) => {
          throw new Error(err)
        })

      // 执行lastCommitDateTime
      mergeOptions.lastCommitDateTime && await getLastCommitDateTime(mergeOptions)
        .then((output: string) => {
          config.define![`${mergeOptions.lastCommitDateTimeVar}`] = JSON.stringify(output)
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
