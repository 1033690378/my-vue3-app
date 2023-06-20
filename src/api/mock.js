import Mock from 'mockjs'
import homeApi from './mockData/home'
import userApi from './mockData/user'
import permissionApi from './mockData/permission'
import goodsApi from './mockData/goods'

// 拦截请求
Mock.mock('/home/getData', homeApi.getHomeData)

// 本地获取user的数据
//获取用户数据
Mock.mock(/user\/getUser/, 'get', userApi.getUserList)

//添加用户数据
Mock.mock(/user\/add/, 'post', userApi.createUser)

//更新用户数据
Mock.mock(/user\/edit/, 'post', userApi.updateUser)

//删除用户数据
Mock.mock(/user\/delete/, 'get', userApi.deleteUser)

//获取左侧菜单栏
Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)

// 本地获取mall的数据
//获取商品数据
Mock.mock(/mall\/getGoods/, 'get', goodsApi.getGoodsList)

//添加商品数据
Mock.mock(/mall\/add/, 'post', goodsApi.createGoods)

//更新商品数据
Mock.mock(/mall\/edit/, 'post', goodsApi.updateGoods)

//删除商品数据
Mock.mock(/mall\/delete/, 'get', goodsApi.deleteGoods)

