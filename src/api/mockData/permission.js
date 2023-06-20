import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === 'admin') {
      return {
        code: 200,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 'HomeFilled',
              url: 'Home/Home'
            },
            {
              path: '/userinfo',
              name: 'userinfo',
              label: '个人中心',
              icon: 'UserFilled',
              url: 'User/Userinfo'
            },
            {
              path: '/mall',
              name: 'mall',
              label: '商品管理',
              icon: 'Goods',
              url: 'Mall/Mall'
            },
            {
              path: '/user',
              name: 'user',
              label: '用户管理',
              icon: 'user',
              url: 'User/User'
            },
            {
              label: '其他',
              icon: 'location',
              children: [
                {
                  path: '/page1',
                  name: 'page1',
                  label: '页面1',
                  icon: 'setting',
                  url: 'Page1'
                },
                {
                  path: '/page2',
                  name: 'page2',
                  label: '页面2',
                  icon: 'setting',
                  url: 'Page2'
                }
              ]
            }
          ],
          token: Mock.Random.guid(),
          power: 0,
          message: '获取成功'
        }
      }
    } else if (username === 'legend' && password === '123456') {
      return {
        code: 200,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 'HomeFilled',
              url: 'Home/Home'
            },
            {
              path: '/userinfo',
              name: 'userinfo',
              label: '个人中心',
              icon: 'UserFilled',
              url: 'User/Userinfo'
            },
            {
              path: '/mall',
              name: 'mall',
              label: '商品管理',
              icon: 'Goods',
              url: 'Mall/Mall'
            }
          ],
          token: Mock.Random.guid(),
          power: 1,
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }
  }
}


