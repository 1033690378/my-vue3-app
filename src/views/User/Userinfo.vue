<template>
  <el-col style="margin-top: 20px;">
    <el-card class="home">
        <div class="user">
            <img :src="getImgSrc(power == 0 ? 'legend' : 'user')" alt="个人头像">
            <div class="user-info">
                <p class="name">{{ power == 0 ? 'Admin' : 'User' }}</p>
                <p class="role">{{ power == 0 ? '超级管理员' : '管理员' }}</p>
            </div>
        </div>
        <div class="login-info">
            <p>上次登录时间：<span>2023-6-10</span></p>
            <p>上次登录地点：<span>{{ power == 0 ? '广州' : '中山' }}</span></p>
        </div>
    </el-card>
  </el-col>
</template>

<script>
import { useStore } from 'vuex'

  export default {
    setup() {
      const store = useStore()
      //获取用户权限属性
      const power = store.state.power;
      const getImgSrc = (user) => {
          // console.log(import.meta.url, 'url');
          // console.log(new URL(`../assets/images/${user}.jpg`, import.meta.url));
          // console.log(power, user,'power')
          return new URL(`../../assets/images/${user}.jpg`, import.meta.url).href;
      };
      return {
        power,
        getImgSrc,

      };
    },
  };
</script>

<style lang="less" scoped>
  .home {
    border-radius: 25px;
    box-shadow: 0 0 25px #cacaca;
    .user {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
      img {
        margin: 20px 40px 20px 20px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
      }
      .user-info {
        .name {
          font-size: 32px;
          margin-bottom: 10px;
        }
        .role {
          color: #999999;
        }
      }
    }
    .login-info {
      p {
        line-height: 30px;
        font-size: 14px;
        color: #999;
        span {
          color: #666;
          margin-left: 60px;
        }
      }
    }
  }
</style>


