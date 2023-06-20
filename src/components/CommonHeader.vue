<template>
    <el-header>
        <div class="l-content">
            <!-- 图标的展示 -->
            <el-button size="small" plain @click="handleCollapse">
                <el-icon :size="20">
                    <Menu />
                </el-icon>
            </el-button>
            <el-breadcrumb separator="/" class="bread">
                <!-- 首页是一定存在的，所以直接锁死 -->
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="current.path" v-if="current">{{ current.label }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img class="user" :src="getImgSrc(power == 0 ? 'legend' : 'user')" alt="个人头像" />
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="handleUserinfo">个人中心</el-dropdown-item>
                    <el-dropdown-item @click="handleLoginOut">退出</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>

<script>
import { computed, reactive } from 'vue-demi'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

    export default {
        setup() {
            const store = useStore()
            //获取用户权限属性
            const power = store.state.power;
            // let userImg = require('../assets/images/legend.jpg');
            const getImgSrc = (user) => {
                // console.log(import.meta.url, 'url');
                // console.log(new URL(`../assets/images/${user}.jpg`, import.meta.url));
                return new URL(`../assets/images/${user}.jpg`, import.meta.url).href;
            };
            let handleCollapse = () => {
                //调用vuex钟的mutations
                store.commit('updateIsCollapse')
            };

            //计算属性
            const current = computed(() => {
                return store.state.currentMenu;
            })
            const router = useRouter();
            //个人中心回调函数
            const handleUserinfo = () => {
                console.log('个人中心')
                router.push({
                    name: "userinfo",
                });
            };
            //退出回调函数
            const handleLoginOut = () => {
                console.log('登出')
                //清除cookie中的token
                store.commit("clearToken");
                //清除cookie中的menu
                store.commit("cleanMenu");
                //清除cookie中的power
                store.commit("clearPower");
                //清空tags
                const tags = store.state.tabsList;
                let length = tags.length;
                // console.log(length, 'length');
                if (length !== 1) {
                    tags.length = 1
                }
                //跳转到登录页
                router.push({
                    name: "login",
                });
            };
            return {
                // userImg,
                getImgSrc,
                handleCollapse,
                current,
                handleLoginOut,
                handleUserinfo,
                power,
            };
        },
    };
</script>

<style lang="less" scoped>
    header {
        display: flex;
        justify-content: space-between;
        //纵轴垂直居中
        align-items: center;
        width: 100%;
        background: #333;
    }
    .r-content {
        .user {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
    .l-content {
        display: flex;
        align-items: center;
        .el-button {
            margin-right: 20px;
        }
        h3 {
            color: #fff;
        }
    }
    //“/deep/”是穿刺效果
    :deep(.bread span) {
        color: #fff !important;
        cursor: pointer !important;
    }
</style>

