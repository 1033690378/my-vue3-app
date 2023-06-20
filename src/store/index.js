import { createStore } from 'vuex'
import Cookie from 'js-cookie'

export default createStore({
  state: {
    isCollapse: true,
    currentMenu: null,
    tabsList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'home'
      }
    ],
    menu: [],
    power: -1,
    token: '',
  },
  mutations: {
    //更新左侧菜单栏是展开还是关闭
    updateIsCollapse(state, payload) {
      // console.log(payload);
      state.isCollapse = !state.isCollapse
    },
    //面包屑的切换
    selectMenu(state, val) {
      //三元对称判断
      // val.name == 'home' ? (state.currentMenu = null) : (state.currentMenu = val)

      if (val.name == 'home') {
        state.currentMenu = null
      }
      else {
        state.currentMenu = val
        let result = state.tabsList.findIndex(item => item.name === val.name)
        result == -1 ? state.tabsList.push(val) : ''
      }
    },
    //tag删除操作
    closeTab(state, val) {
      let res = state.tabsList.findIndex(item => item.name === val.name)
      state.tabsList.splice(res, 1)
    },
    //获取左侧菜单栏的菜单
    setMenu(state, val) {
      state.menu = val
      localStorage.setItem('menu', JSON.stringify(val))
    },
    //添加左侧菜单栏，实现动态路由
    addMenu(state, router) {
      if (!localStorage.getItem('menu')) {
        return
      }
      const menu = JSON.parse(localStorage.getItem('menu'))
      state.menu = menu

      const menuArray = []

      const modules = import.meta.glob(['../views/*.vue', '../views/*/*.vue', ])
      // console.log(modules, 'modules');
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            let url = `../views/${item.url}.vue`
            // item.component = () => import(`../views/${item.url}.vue`)
            // item.component = () => import(/* @vite-ignore */`../views/${item.url}.vue`)
            item.component = modules[url]
            return item
          })
          menuArray.push(...item.children)
        }
        else {
          let url = `../views/${item.url}.vue`
          // item.component = () => import(`../views/${item.url}.vue`)
          // item.component = () => import(/* @vite-ignore */`../views/${item.url}.vue`)
          item.component = modules[url]
          menuArray.push(item)
        }
      })

      menuArray.forEach(item => {
        router.addRoute('homeroute', item)
      })
    },
    //清理左侧菜单栏
    cleanMenu(state) {
      state.menu = []
      localStorage.removeItem('menu')
    },
    //设置token
    setToken(state, val) {
      state.token = val
      Cookie.set('token', val)
    },
    //清理token
    clearToken(state) {
      state.token = ''
      Cookie.remove('token')
    },
    //获取token
    getToken(state) {
      state.token = state.token || Cookie.get('token')
    },
    //设置用户权限power
    setPower(state, val) {
      state.power = val
      Cookie.set('power', val)
    },
    //清理用户权限power
    clearPower(state) {
      state.power = ''
      Cookie.remove('power')
    },
    //获取用户权限power
    getPower(state) {
      state.power = state.power || Cookie.get('power')
    },
  }
})


