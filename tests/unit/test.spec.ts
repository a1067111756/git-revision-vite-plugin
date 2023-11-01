/* 插件 -> 配置测试 */
import { sum } from '../../src/index'

describe('插件 -> 测试示例', () => {
  it('sum函数测试', async () => {
    const value = 2
    const value1 = 3
    expect(sum(value, value1)).toEqual(5)
  })
})
