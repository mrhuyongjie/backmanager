<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userinfo" style="margin-top: 20px">
            <p class="name" style="font-size: 25px">Admin</p>
            <p class="access" style="font-size: 16px">超级管理员</p>
          </div>
        </div>
        <div class="login-info" style="margin-top: 20px">
          <p style="font-size: 10px; margin-bottom: 5px">
            上次登录时间：<span>2022-03-05</span>
          </p>
          <p style="font-size: 10px">上次登录地点：<span>上海</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLable"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <div class="icon" :style="{ background: item.color }">
            <i
              class="i"
              :class="'el-icon-' + item.icon"
              :style="{ background: item.color }"
            ></i>
          </div>

          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <echart :chartData="echartData.order" style="height: 280px" />
      </el-card>
      <div class="graph">
        <el-card style="height: 240px">
          <echart :chartData="echartData.user" style="height: 240px" />
        </el-card>
        <el-card style="height: 240px">
          <echart
            :chartData="echartData.video"
            :isAxisChart="false"
            style="height: 240px"
          />
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
// import { getMenu } from "../../api/data.js";
import { getData } from "../../api/data.js";
// import * as echarts from "echarts";
import Echart from "../../src/components/ECharts.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "home",
  components: {
    Echart,
  },
  data() {
    return {
      userImg: require("../../src/assets/img/huge.jpg"),
      tableData: [],
      tableLable: {
        name: "品牌",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 342,
          icon: "star-on",
          color: "rgb(46, 194, 240)",
        },
        {
          name: "今日未支付订单",
          value: 190,
          icon: "shopping-bag-2",
          color: "rgb(240, 243, 87)",
        },
        {
          name: "本月支付订单",
          value: 15263,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 3524,
          icon: "star-on",
          color: "rgb(46, 194, 240)",
        },
        {
          name: "本月未支付订单",
          value: 278,
          icon: "shopping-bag-2",
          color: "rgb(240, 243, 87)",
        },
      ],
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  mounted() {
    getData().then((res) => {
      const data = res.data;
      // console.log(res.data);
      if (res.code === 20000) {
        this.tableData = data.tableData;
        const order = data.orderData;
        const xData = order.date;
        const keyArray = Object.keys(order.data[0]);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });

        this.echartData.order.xData = xData;
        this.echartData.order.series = series;

        (this.echartData.user.xData = data.userData.map((item) => item.date)),
          (this.echartData.user.series = [
            {
              name: "新增用户",
              data: data.userData.map((item) => item.new),
              type: "bar",
            },
            {
              name: "活跃用户",
              data: data.userData.map((item) => item.active),
              type: "bar",
            },
          ]),
          (this.echartData.video.series = [
            {
              data: data.videoData,
              type: "pie",
              name: 'Access From',
              label:{//文字
                show:true,
              },
              labelLine:{//引导线
                show:true
              }
            },
          ]);
      }
    });
  },
};
</script>
<style lang="less" scoped>
.user {
  display: flex;
  justify-content: flex-start;
  .login-info {
    border-top: 1px solid #dcdee2;
    padding-top: 8px;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    color: #b3b5b9;
  }
  img {
    margin-right: 40px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  // font-size: 100px;
  .el-card {
    height: 100px;
    width: 250px;
    margin-bottom: 20px;
    // text-align: center;
    .icon {
      // position: relative;
      width: 100px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 40px;
      i {
        color: #fff;
      }
    }
  }
}
.detail {
  margin-top: 20px;
  margin-left: 20px;
  .num {
    font-size: 25px;
  }
  .txt {
    margin-top: 10px;
    font-size: 12px;
    color: rgba(99, 99, 99, 0.8);
  }
}
.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .el-card {
    width: 47%;
  }
}
</style>