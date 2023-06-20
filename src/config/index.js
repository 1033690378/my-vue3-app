/**
 * 环境配置文件
 * 一般在企业级项目里面有三个环境
 * 开发环境
 * 测试环境
 * 线上环境
 */
//当前的环境
const env = import.meta.env.MODE || 'prod'

//mock模拟拦截的url
const mockurl = 'https://www.fastmock.site/mock/67e04025542eae9bf8d07ddfca20d1e8/api'

const EnvConfig = {
  //开发环境
  development: {
    baseApi: '/api',
    mockApi: mockurl,
  },
  //测试环境
  test: {
    baseApi: '//test.legendweb.top/api',
    mockApi: mockurl,
  },
  //线上环境
  pro: {
    //根据现实企业给的开发文档接口设置
    baseApi: '//legendweb.top/api',
    mockApi: mockurl,
  },
}

export default {
  env,
  //mock的总开关,
  mock: false,
  ...EnvConfig[env]
}

