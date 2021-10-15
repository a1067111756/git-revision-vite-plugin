# 🚀 Git-Revision-Vite-Plugin

> 🔥 该插件旨在使用vite脚手架时获取git仓库信息

### 一、插件的背景和目标
___
- 背景 - 之前使用webpack打包时要获取git仓库信息一般是使用git-revision-webpack-plugin这个库，但转到vite时发现并没有相对于的库(也发现vite-plugin-git-revision这个库但是发现该库处于初始阶段，功能并不完善)


- 目标 - 尽可能实现git-revision-webpack-plugin等同的功能，保持api与之对齐


- 鸣谢 - 该插件实现参考git-revision-webpack-plugin和vite-plugin-git-revision两个库，特别感谢两个作者


- 声明 - 该插件旨在减化自己工作中重复工作的工具，实现原理简单，自身能力有限，使用者勿喷，如果有好的想法和建议也可在issue中提出

### 二、插件的使用
___

Install:

```bash
$ npm install -D git-revision-vite-plugin
```

Add to your `vite.config.js`:

```js
import Vue from '@vitejs/plugin-vue';
import GitRevisionVitePlugin from 'git-revision-vite-plugin';

export default {
  plugins: [
    Vue(),
      GitRevisionVitePlugin()
  ],
};
```

Use in code:
```javascript
<script setup lang="ts">
    console.log(COMMITHASH)
    console.log(VERSION)
    console.log(BRANCH)
    console.log(LASTCOMMITDATETIME)
</script>
```

### 三、插件的配置
___
该插件默认不需要配置，但可以对其进行配置以支持自定义git工作流

### `version: boolean`
如果需要version支持，需要打开此开关（默认为`version: true`）:

```javascript
import Vue from '@vitejs/plugin-vue';
import GitRevisionVitePlugin from 'git-revision-vite-plugin';

export default {
    plugins: [
        Vue(),
        GitRevisionVitePlugin({
            version: true
        })
    ],
};
```

### `versionVar: string`
如果需要自定义version的注入变量名，需要配置此选项（默认为`versionVar: VERSION`）:

```javascript
import Vue from '@vitejs/plugin-vue';
import GitRevisionVitePlugin from 'git-revision-vite-plugin';

export default {
    plugins: [
        Vue(),
        GitRevisionVitePlugin({
            versionVar: 'VERSION'
        })
    ],
};
```

### `versionCommand: string`
如果需要自定义version的git指令，需要配置此选项（默认为`versionCommand: describe --always`）:

```javascript
import Vue from '@vitejs/plugin-vue';
import GitRevisionVitePlugin from 'git-revision-vite-plugin';

export default {
    plugins: [
        Vue(),
        GitRevisionVitePlugin({
            versionCommand: 'describe --always'
        })
    ],
};
```

### `lightweightTags: boolean`
如果需要轻量级tag支持，需要打开此开关（默认为`lightweightTags: false`）。lightweightTags与version是互斥选项，lightweightTags打开时如果git仓库存在tag信息默认显示返回tag，如果git仓库不存在tag信息默认回退返回version信息。lightweightTags与versionCommand选项不能同时设置，否则会抛出错误:

```javascript
import Vue from '@vitejs/plugin-vue';
import GitRevisionVitePlugin from 'git-revision-vite-plugin';

export default {
    plugins: [
        Vue(),
        GitRevisionVitePlugin({
            lightweightTags: true
        })
    ],
};
```

### `branch: boolean`
如果需要branch支持，需要打开此开关（默认为`branch: true`）:

```javascript
import Vue from '@vitejs/plugin-vue';
import GitRevisionVitePlugin from 'git-revision-vite-plugin';

export default {
    plugins: [
        Vue(),
        GitRevisionVitePlugin({
            branch: true
        })
    ],
};
```

### `branchVar: string`
如果需要自定义branch的注入变量名，需要配置此选项（默认为`branch: BRANCH`）:

```javascript
import Vue from '@vitejs/plugin-vue';
import GitRevisionVitePlugin from 'git-revision-vite-plugin';

export default {
    plugins: [
        Vue(),
        GitRevisionVitePlugin({
            branchVar: 'BRANCH'
        })
    ],
};
```

### `branchCommand: string`
如果需要自定义branch的git指令，需要配置此选项（默认为`branchCommand: rev-parse --abbrev-ref HEAD`）:

```javascript
import Vue from '@vitejs/plugin-vue';
import GitRevisionVitePlugin from 'git-revision-vite-plugin';

export default {
    plugins: [
        Vue(),
        GitRevisionVitePlugin({
            branchCommand: 'rev-parse --abbrev-ref HEAD'
        })
    ],
};
```

### `commitHash: boolean`
如果需要commitHash支持，需要打开此开关（默认为`commitHash: true`）:

```javascript
import Vue from '@vitejs/plugin-vue';
import GitRevisionVitePlugin from 'git-revision-vite-plugin';

export default {
    plugins: [
        Vue(),
        GitRevisionVitePlugin({
            commitHash: true
        })
    ],
};
```

### `commitHashVar: string`
如果需要自定义commitHash的注入变量名，需要配置此选项（默认为`commitHashVar: COMMITHASH`）:

```javascript
import Vue from '@vitejs/plugin-vue';
import GitRevisionVitePlugin from 'git-revision-vite-plugin';

export default {
    plugins: [
        Vue(),
        GitRevisionVitePlugin({
            commitHashVar: 'COMMITHASH'
        })
    ],
};
```

### `commitHashCommand: string`
如果需要自定义commitHash的git指令，需要配置此选项（默认为`commitHashCommand: rev-parse HEAD`）:

```javascript
import Vue from '@vitejs/plugin-vue';
import GitRevisionVitePlugin from 'git-revision-vite-plugin';

export default {
    plugins: [
        Vue(),
        GitRevisionVitePlugin({
            commitHashCommand: 'rev-parse HEAD'
        })
    ],
};
```



### `lastCommitDateTime: boolean`
如果需要lastCommitDateTime支持，需要打开此开关（默认为`lastCommitDateTime: true`）:

```javascript
import Vue from '@vitejs/plugin-vue';
import GitRevisionVitePlugin from 'git-revision-vite-plugin';

export default {
    plugins: [
        Vue(),
        GitRevisionVitePlugin({
            lastCommitDateTime: true
        })
    ],
};
```

### `lastCommitDateTimeVar: string`
如果需要自定义commitHash的注入变量名，需要配置此选项（默认为`lastCommitDateTimeVar: LASTCOMMITDATETIME`）:

```javascript
import Vue from '@vitejs/plugin-vue';
import GitRevisionVitePlugin from 'git-revision-vite-plugin';

export default {
    plugins: [
        Vue(),
        GitRevisionVitePlugin({
            lastCommitDateTimeVar: 'LASTCOMMITDATETIME'
        })
    ],
};
```

### `lastCommitDateTimeCommand: string`
如果需要自定义commitHash的git指令，需要配置此选项（默认为`lastCommitDateTimeCommand: log -1 --format=%cI`）:

```javascript
import Vue from '@vitejs/plugin-vue';
import GitRevisionVitePlugin from 'git-revision-vite-plugin';

export default {
    plugins: [
        Vue(),
        GitRevisionVitePlugin({
            lastCommitDateTimeCommand: 'log -1 --format=%cI'
        })
    ],
};
```

### `gitWorkTree: string`
如果需要自定义gitWorkTree，需要配置此选项：

```javascript
import Vue from '@vitejs/plugin-vue';
import GitRevisionVitePlugin from 'git-revision-vite-plugin';

export default {
    plugins: [
        Vue(),
        GitRevisionVitePlugin({
            gitWorkTree: 'xxxx'
        })
    ],
};
```

### 四、关于注入变量名的一些解释
___
#### 为什么不将信息注入到import.meta.env上？
> a. git信息的注入是使用vite -> config -> define选项在编译时全局进行静态替换，但存在一个问题是不支持import.meta.env上的注入，目前发现是这样的(https://cn.vitejs.dev/config/#define)  
> b. 要实现注入到import.meta.env现阶段的想法是使用vite提供的loadEnv接口，但是还未实际操作，后续版本可能改为此形式

#### 怎么解决全局注入变量名的提示报错？
```
    // .eslintrc.json - 解决eslint校验报错
    {
      "globals": {
        "BRANCH": true,
        "VERSION": true,
        "COMMITHASH": true,
        "LASTCOMMITDATETIME": true
      }
    }
    
    // global.d.ts - 解决ts找不到声明变量
    declare const BRANCH: string
    declare const COMMITHASH: string
    declare const VERSION: string
    declare const LASTCOMMITDATETIME: string   
```

### 五、扩展功能
#### 执行自定义git命令`runGitDefineCommand`
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { runGitDefineCommand } from 'git-revision-vite-plugin'

// tips: 由于runGitDefineCommand返回一个Promise，
// 所以vite配置要使用异步配置(https://cn.vitejs.dev/config/#async-config)
export default defineConfig(async ({ command, mode }) => {
    const tagInfo = await runGitDefineCommand('git tag')

    return {
        plugins: [
            vue(),
            GitRevisionVitePlugin()
        ],
        define: {
            'GIT_TAG': JSON.stringify(tagInfo)
        }
    }
})

// 该功能扩展实现了自定义执行git命令，这样这个插件的可玩性就增加了很多
```
