import { Plugin } from 'vite'

// 默认导出
declare function GitRevisionVitePlugin(options?: GitRevisionPluginOptions): Plugin;
export default GitRevisionVitePlugin;

// 自定义执行git命令
export declare function runGitDefineCommand(gitCommand: string): Promise<string>

// 全局配置选项
export interface GitRevisionPluginOptions {
  // 是否显示commit
  commitHash?: boolean,
  version?: boolean,
  branch?: boolean,
  lightweightTags?: boolean,
  lastCommitDateTime?: boolean,
  // commit注入变量名
  commitHashVar?: string,
  versionVar?: string,
  branchVar?: string,
  lastCommitDateTimeVar?: string,
  // commit自定义执行命令
  commitHashCommand?: string,
  versionCommand?: string,
  branchCommand?: string,
  lastCommitDateTimeCommand?: string,
  // git worktree
  gitWorkTree?: string
}

