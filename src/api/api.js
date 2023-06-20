/**
 * 整个项目api的管理
 * 
 */
import request from "./request"

export default {
  //home组件 左侧表格数据获取
  getTableData(params) {
    return request({
      url: '/home/getTableData',
      method: 'get',
      data: params,
      mock: true
    })
  },
  //home组件 首页count数据获取
  getCountData() {
    return request({
      url: '/home/getCountData',
      method: 'get',
      mock: true
    })
  },
  //home组件 首页echarts表格数据获取
  getChartData() {
    return request({
      url: '/home/getChartData',
      method: 'get',
      mock: true
    })
  },
  //user组件 获取用户信息
  getUserData(params) {
    return request({
      url: '/user/getUser',
      method: 'get',
      //这个mock如果是true的话 用的就是线上fastmock的数据
      mock: false,
      data: params,
      // data:{total: 0,page: 1,}
    })
  },
  //user组件 添加用户信息
  addUser(params) {
    return request({
      url: '/user/add',
      method: 'post',
      // 这个mock如果是true的话 用的就是线上fastmock的数据
      mock: false,
      data: params
      // data:{total: 0,page: 1,}
    })
  },
  //user组件 修改用户信息
  editUser(params) {
    return request({
      url: '/user/edit',
      method: 'post',
      // 这个mock如果是true的话 用的就是线上fastmock的数据
      mock: false,
      data: params
    })
  },
  //user组件 删除用户信息
  deleteUser(params) {
    return request({
      url: '/user/delete',
      method: 'get',
      // 这个mock如果是true的话 用的就是线上fastmock的数据
      mock: false,
      data: params
    })
  },
  // 根据用户的用户名不同 返回不一样的菜单列表
  getMenu(params) {
    return request({
      url: '/permission/getMenu',
      method: 'post',
      // 这个mock如果是true的话 用的就是线上fastmock的数据
      mock: false,
      data: params
    })
  },
  //mall组件 获取商品信息
  getGoodsData(params) {
    return request({
      url: '/mall/getGoods',
      method: 'get',
      //这个mock如果是true的话 用的就是线上fastmock的数据
      mock: false,
      data: params,
      // data:{total: 0,page: 1,}
    })
  },
  //mall组件 添加商品信息
  addGoods(params) {
    return request({
      url: '/mall/add',
      method: 'post',
      // 这个mock如果是true的话 用的就是线上fastmock的数据
      mock: false,
      data: params
      // data:{total: 0,page: 1,}
    })
  },
  //mall组件 修改商品信息
  editGoods(params) {
    return request({
      url: '/mall/edit',
      method: 'post',
      // 这个mock如果是true的话 用的就是线上fastmock的数据
      mock: false,
      data: params
    })
  },
  //mall组件 删除商品信息
  deleteGoods(params) {
    return request({
      url: '/mall/delete',
      method: 'get',
      // 这个mock如果是true的话 用的就是线上fastmock的数据
      mock: false,
      data: params
    })
  },

}


