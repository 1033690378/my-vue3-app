<template>
  <div class="four">
    <div class="text">
      <div class="box">
        <p><span>4</span>04</p>
        <h1>抱歉，你访问的页面走丢了</h1>
        <el-button class="button" @click="index">返回首页</el-button>
      </div>
    </div>
    <div class="img">
      <img src="../../assets/404.svg" class="bgc" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

  export default defineComponent({
    setup () {
      const router = useRouter()
      const index = () => {
        console.log('404')
        router.push({
          name: "home",
        });
      }
      return {
        router,
        index,
      }
    },
  })
</script>

<style lang="less" scoped>
  .four {
    display: flex;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    .text {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .box {
        text-align: left;
        padding-bottom: 100px;
        p {
          font-size: 10em;
          font-weight: 700;
          margin-bottom: 10px;
          span {
            border-bottom: 7px solid #a779e9;
          }
        }
        h1 {
          font-size: 30px;
          margin-top: 30px;
          padding: 20px 0;
          
        }
        .button {
          font-size: 20px;
          font-weight: 700;
          display: block;
          margin: 0 auto;
          height: 40px;
        }
      }
    }
    .img {
      width: 50%;
      height: 100%;
      .bgc {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
</style>
