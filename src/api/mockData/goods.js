import Mock from 'mockjs'

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

let List = []
const count = 200

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.cword(2, 4),
      price: Mock.Random.integer(100, 20000),
      addr: Mock.mock('@image()'),
    })
  )
}

export default {
  /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getGoodsList: config => {
    const { name, page = 1, limit = 20 } = param2Obj(config.url)
    const mockList = List.filter(user => {
      if (name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 200,
      data: {
        list: pageList,
        count: mockList.length,
      }
    }
  },
  /**
   * 增加商品
   * @param name, price, addr
   * @return {{code: number, data: {message: string}}}
   */
  createGoods: config => {
    const { name, price, addr } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    List.unshift({
      id: Mock.Random.guid(),
      name: name,
      price: price,
      addr: addr,
    })
    return {
      code: 200,
      data: {
        message: '添加成功'
      }
    }
  },
  /**
   * 删除商品
   * @param id
   * @return {*}
   */
  deleteGoods: config => {
    const { id } = param2Obj(config.url)
    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      List = List.filter(u => u.id !== id)
      return {
        code: 200,
        message: '删除成功'
      }
    }
  },
  /**
   * 批量删除
   * @param config
   * @return {{code: number, data: {message: string}}}
   */
  batchremove: config => {
    let { ids } = param2Obj(config.url)
    ids = ids.split(',')
    List = List.filter(u => !ids.includes(u.id))
    return {
      code: 200,
      data: {
        message: '批量删除成功'
      }
    }
  },
  /**
   * 修改商品
   * @param id, name, price, addr
   * @return {{code: number, data: {message: string}}}
   */
  updateGoods: config => {
    const { id, name, price, addr } = JSON.parse(config.body)
    List.some(u => {
      if (u.id === id) {
        u.name = name
        u.price = price
        u.addr = addr
        return true
      }
    })
    return {
      code: 200,
      data: {
        message: '编辑成功'
      }
    }
  }
}


