import fs from "fs-extra"

// 1. 复制声明文件到dist
fs.copySync('./lib/types/index.d.ts', './dist/index.d.ts')
