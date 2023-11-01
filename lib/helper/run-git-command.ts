import path from 'path'
import removeEmptyLines from './remove-empty-lines'
import { exec, execSync } from 'child_process'
import type { GitRevisionPluginOptions } from '../types'

interface Cb {
  (err: Error | null, output: string): void
}

// 执行git命令
export function runGitCommand (gitWorkTree: string | undefined, command: string, callback?: Cb) {
  const gitCommand = gitWorkTree
    ? ['git', '--git-dir=' + path.join(gitWorkTree, '.git'), '--work-tree=' + gitWorkTree, command].join(' ')
    : ['git', command].join(' ')

  if (callback) {
    exec(gitCommand, function(err:any, stdout: any) {
      if (err) {
        return callback(err, '')
      }
      callback(null, removeEmptyLines(stdout))
    })

    return null
  } else {
    return removeEmptyLines(`${execSync(gitCommand)}`)
  }
}

// 获取commitHash
export function getCommitHash (options: GitRevisionPluginOptions): Promise<string> {
  return new Promise((resolve, reject) => {
    runGitCommand(options.gitWorkTree, options.commitHashCommand as string, function (err: Error | null, output: string) {
        if (err) {
          reject(err)
        }

      resolve(output)
    })
  })
}

// 获取version
export function getVersion (options: GitRevisionPluginOptions): Promise<string> {
  return new Promise((resolve, reject) => {
    runGitCommand(options.gitWorkTree, options.versionCommand as string, function (err: Error | null, output: string) {
      if (err) {
        reject(err)
      }

      resolve(output)
    })
  })
}

// 获取branch
export function getBranch (options: GitRevisionPluginOptions): Promise<string> {
  return new Promise((resolve, reject) => {
    runGitCommand(options.gitWorkTree, options.branchCommand as string, function (err: Error | null, output: string) {
      if (err) {
        reject(err)
      }

      resolve(output)
    })
  })
}

// 获取lastCommitDateTime
export function getLastCommitDateTime (options: GitRevisionPluginOptions): Promise<string> {
  return new Promise((resolve, reject) => {
    runGitCommand(options.gitWorkTree, options.lastCommitDateTimeCommand as string, function (err: Error | null, output: string) {
      if (err) {
        reject(err)
      }

      resolve(output)
    })
  })
}
