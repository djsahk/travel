<template>
  <div id="home" style="background-color: #e9ebec;">
    <nav-bar class="find-nav">
      <div slot="left">{{LocationCity}}</div>
      <router-link :to="{name:'Search'}" href="#" slot="center" class="search">
        <i class="el-icon-search" style="color: #008800;"></i>
        请输入搜索关键词
      </router-link>
      <div slot="right">{{wendu}}℃</div>
    </nav-bar>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="item in 4" :key="item">
        <img src="../assets/img/bg.jpg" alt />
      </van-swipe-item>
    </van-swipe>

    <!-- 顶部导航栏 -->
    <van-tabs background="rgb(8,177,156)" title-active-color="#fff" color="#fff" line-width="120px" v-model="active"
      sticky>
      <van-tab title="推荐" class="title">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <div class="cell">
            <div class="cellItem" v-for="(item,index) in spots" :key="index" @click="routerClick(item.id)">
              <img v-lazy="$api.BASE_SERVER_URL+item.pics" alt="">
              <div class="content">
                <h3>{{item.spot_name}}</h3>
                <p><span>{{item.locale_name}}</span> <span>{{item.comment}}条评论</span></p>
                <div style="margin-top: 5px;">
                  <van-rate v-model="item.level" readonly />
                </div>
                <p style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding-right: 15px;">开放时间
                  {{item.open_time}}
                </p>
              </div>
            </div>
          </div>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="攻略">
        <!-- 当季怎么玩 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <el-card class="box-card" v-for="(item,index) in spots" :key="index" @click.native="routerClick(item.id)">
            <div slot="header" class="clearfix" style="border-bottom: 3px solid #eee;padding-bottom: 5px">
              <span
                style="font-weight: bold;border-left: 2px solid rgb(36,174,176);padding-left: 5px;">{{item.spot_name}}</span>
              <el-button style="float: right; padding: 3px 0;color: #999;" type="text">更多 ></el-button>
            </div>
            <div class="images-play">
              <img v-lazy="$api.BASE_SERVER_URL+item.pics" alt="">
              <el-avatar shape="square" :size="100" :src="'https://picsum.photos/640/150?random='+item * 3+'.png'">
              </el-avatar>
              <!-- </div> -->
            </div>
          </el-card>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>




  </div>
</template>

<script>
  import NavBar from '../components/navbar/NavBar.vue'


  export default {
    name: "home",
    data() {
      return {
        active: 2,
        spots: [],
        wendu: '',
        count: 1,
        maxPage: 1,
        isLoading: false,
        LocationCity: "定位中"
      };
    },
    created() {
      this.spotCreate();
    },
    methods: {
      spotCreate() {
        this.$get(this.$api.API_URL_SPOT, {
          page: this.count
        }).then(res => {
          this.maxPage = res.last_page;
          this.spots = res.data;

          this.commentCreate();
        })
      },
      commentCreate() {
        this.$get(this.$api.API_URL_COMMENTS).then(res => {
          for (let item of this.spots) {
            //初始化景点评论数量
            this.$set(item, 'comment', 0)
            //  //如果景点有评论,就赋值该景点评论数
            if (res.data.hasOwnProperty(item.id)) {
              this.$set(item, 'comment', res.data[item.id])
            }
          }
        })
      },
      routerClick(spots_id) {
        this.$router.push({
          name: 'ScenicDetail',
          query: {
            id: spots_id
          }
        })
      },
      onRefresh() {
        setTimeout(() => {
          this.isLoading = false;
          this.count++;
          if (this.count > this.maxPage) {
            this.count = 1;
          }
          this.spotCreate();
          this.$Toast('刷新成功');
        }, 1000);
      },

      city() { //定义获取城市方法
        const geolocation = new BMap.Geolocation();
        var _this = this
        geolocation.getCurrentPosition(function getinfo(position) {
          let city = position.address.city; //获取城市信息
          let province = position.address.province; //获取省份信息
          _this.LocationCity = city

          // 获取城市后再获取天气温度
          _this.$get("http://wthrcdn.etouch.cn/weather_mini?city=" + _this.LocationCity).then(res => {
            _this.wendu = res.data.wendu
          })

        }, function(e) {
          _this.LocationCity = "定位失败"
        }, {
          provider: 'baidu'
        });
      },

    },

    mounted() {
      this.city() //触发获取城市方法
    },
    components: {
      NavBar
    },
  };
</script>

<style scoped>
  .find-nav {
    position: fixed;
    top: 0;
    z-index: 10;
    width: 100%;
    color: #FFFFFF;
  }

  .search {
    display: block;
    background-color: #fff;
    margin-top: 7px;
    border-radius: 20px;
    height: 30px;
    line-height: 30px;
    text-align: left;
    padding-left: 1em;
    color: #475669;
  }

  /* 轮播图 */
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }

 img {
    width: 100%;
    margin-bottom: -3px;
  }

  .images-play {
    display: flex;
    z-index: 9999999;
  }

  .images-play div {
    flex: 1;
  }

  .box-card:not(:nth-child(2)) {
    margin-top: 10px;
  }

  .box-card:last-of-type {
    margin-bottom: 40px;
  }

  .cell {
    padding-bottom: 30px;
  }

  .cellItem {
    position: relative;
    margin-bottom: 10px;
    height: 130px;
    background-color: #fff;
    overflow: hidden;
  }

  .cellItem img {
    position: absolute;
    top: 15px;
    left: 15px;
    width: 100px;
    height: 100px;
    border-radius: 8px;
    overflow: hidden;
  }

  .cellItem .content {
    margin-top: 15px;
    margin-left: 125px;
  }

  .cellItem .content p {
    margin-top: 5px;
  }
</style>
