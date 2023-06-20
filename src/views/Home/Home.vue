<template>
    <el-row class="home" :gutter="24">
        <el-col :span="8" style="margin-top: 20px;">
            <el-card shadow="hover">
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
            <el-card style="margin-top: 20px;" hegiht='460px' shadow="hover">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column
                        v-for="(val, key) in tableLabel"
                        :key="key"
                        :prop="key"
                        :label="val"
                    >
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="margin-top: 20px;">
            <div class="num">
                <el-card
                    :body-style="{ display: 'flex', padding: 0}"
                    v-for="item in countData"
                    :key="item.name"
                    shadow="hover"
                >
                    <component
                        class="icons"
                        :is="item.icon"
                        :style="{ background: item.color }"
                    ></component>
                    <div class="detail">
                        <p class="price">￥{{ item.value }}</p>
                        <p class="txt">{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
            <el-card style="height: 280px;" shadow="hover">
                <!-- 折线图 -->
                <div ref="echarts1" style="height: 280px;"></div>
            </el-card>
            <div class="graph">
                <el-card style="height: 260px;" shadow="hover">
                    <!-- 柱状图 -->
                    <div ref="echarts2" style="height: 260px;"></div>
                </el-card>
                <el-card style="height: 260px;" shadow="hover">
                    <!-- 饼状图 -->
                    <div ref="echarts3" style="height: 240px;"></div>
                </el-card>
            </div>

        </el-col>
    </el-row>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import * as echarts from 'echarts'
import { useStore } from 'vuex'

    export default defineComponent({
        setup() {
            const { proxy } = getCurrentInstance();
            let tableData = ref([]);
            let countData = ref([]);
            const store = useStore()
            //获取用户权限属性
            const power = store.state.power;
            const getImgSrc = (user) => {
                // console.log(import.meta.url, 'url');
                // console.log(new URL(`../assets/images/${user}.jpg`, import.meta.url));
                // console.log(power, user,'power')
                return new URL(`../../assets/images/${user}.jpg`, import.meta.url).href;
            };
            const tableLabel = {
                name: '课程',
                todayBuy: '今日购买',
                monthBuy: '本月购买',
                totalBuy: '总购买',
            };
            const getTableList = async () => {
                // await axios.get('/home/getData')
                // await axios.get(
                //     'https://www.fastmock.site/mock/67e04025542eae9bf8d07ddfca20d1e8/api/home/getData'
                //     )
                
                //     .then((res) => {
                //         console.log(res);
                //         // tableData.value = res.data.data.tableData
                //         if (res.data.code === 200) {
                //             tableData.value = res.data.data;
                //         }
                // })

                //本地mock一直404，线上mock就可以。也不知道为啥
                let res = await proxy.$api.getTableData();
                // console.log(res);
                tableData.value = res
            };
            //获取首页count数据
            const getCountData = async () => {
                let res = await proxy.$api.getCountData();
                // console.log(res, 'res');
                countData.value = res
            };
            onMounted(() => {
                getTableList();
                //获取count数据
                getCountData();
                //获取echarts表格数据
                getCharData();
            });
            //关于echarts表格的渲染部分
            //折线图和柱状图基础配置
            let xOptions = reactive({
                // 图例文字颜色
                textStyle: {
                    color: "#333",
                },
                grid: {
                    left: "20%",
                },
                // 提示框
                tooltip: {
                    trigger: "axis",
                },
                xAxis: {
                    type: "category", // 类目轴
                    data: [],
                    axisLine: {
                        lineStyle: {
                            color: "#17b3a3",
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        color: "#333",
                    },
                },
                yAxis: [
                    {
                        type: "value",
                        axisLine: {
                            lineStyle: {
                            color: "#17b3a3",
                            },
                        },
                    },
                ],
                color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
                series: [],
                }
            )
            //饼状图基础配置
            let pieOptions = reactive({
                tooltip: {
                    trigger: "item",
                },
                color: [
                    "#0f78f4",
                    "#dd536b",
                    "#9462e5",
                    "#a6a6a6",
                    "#e1bb22",
                    "#39c362",
                    "#3ed1cf",
                ],
                series: [],
            });
            //折线图配置
            let orderData = reactive({
                xData: [],
                series: [],
            });
            //柱状图配置
            let userData = reactive({
                xData: [],
                series: [],
            });
            //饼状图配置
            let videoData = reactive({
                series: [],
            });
            //获取echarts数据
            const getCharData = async () => {
                let result = await proxy.$api.getChartData();
                // console.log(result, 'result');

                let res = result.orderData
                let userRes = result.userData
                let videoRes = result.videoData

                //折线图进行渲染的过程
                orderData.xData = res.date
                const keyArray = Object.keys(res.data[0])
                const series = []

                keyArray.forEach((key) => {
                    series.push({
                        name: key,
                        data: res.data.map((item) => item[key]),
                        type: 'line',
                    });
                });
                orderData.series = series;
                xOptions.xAxis.data = orderData.xData;
                xOptions.series = orderData.series;
                //折线图进行渲染
                let hEcharts = echarts.init(proxy.$refs['echarts1']);
                hEcharts.setOption(xOptions);

                //柱状图进行渲染的过程
                userData.xData = userRes.map((item) => item.date);
                userData.series = [
                    {
                        name: '新增用户',
                        data: userRes.map(item => item.new),
                        type: 'bar',
                    },
                    {
                        name: '活跃用户',
                        data: userRes.map(item => item.active),
                        type: 'bar',
                    },
                ];
                xOptions.xAxis.data = userData.xData;
                xOptions.series = userData.series;
                //柱状图进行渲染
                let uEcharts = echarts.init(proxy.$refs['echarts2']);
                uEcharts.setOption(xOptions);

                //饼状图进行渲染的过程
                videoData.series = [
                    {
                        data: videoRes,
                        type: 'pie',
                    },
                ];
                pieOptions.series = videoData.series
                //饼状图进行渲染
                let vEcharts = echarts.init(proxy.$refs['echarts3']);
                vEcharts.setOption(pieOptions);
            };
            return {
                tableData,
                tableLabel,
                countData,
                power,
                getImgSrc,

            };
        },
    }); 
</script>

<style lang="less" scoped>
    .home {
        .user {
            display: flex;
            align-items: center;
            padding-bottom: 20px;
            margin-bottom: 20px;
            border-bottom: 1px solid #ccc;
            img {
                margin-right: 40px;
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
        .num {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .el-card {
                width: 32%;
                margin-bottom: 20px;
            }
            .icons {
                width: 80px;
                height: 80px;
                font-size: 30px;
                text-align: center;
                line-height: 80px;
                color:#fff;
            }
            .detail {
                margin-left: 15px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .price {
                    font-size: 30px;
                    margin-bottom: 10px;
                    line-height: 30px;
                    height: 30px;
                }
                .txt {
                    font-size: 14px;
                    text-align: center;
                    color: #999999;
                }
            }
        }
        .graph {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            .el-card {
                width: 48%;
            }
        }
    }
</style>

