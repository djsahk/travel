<template>
  <div class="find">
    <van-nav-bar title="发现" fixed :placeholder="true" />
    <div style="background-color: #e9ebec; position: relative;">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" offset="0"
        style="padding-bottom: 40px;">
        <waterfall :col="2" :data="spots" style="margin-bottom: -45px;">
          <template>
            <div class="WaterfallItem" :key="index" v-for="(item,index) in spots">
              <router-link :to="{name:'ScenicDetail',query:{id:item.id}}" style="color: #000;">
                <img :src="$api.BASE_SERVER_URL+item.pics" alt="">
                <div class="content">
                  <h3>{{item.spot_name}}</h3>
                  <p class="hide">{{item.intro}}</p>
                  <div style="margin: 2px 0;">
                    <span style="font-size: 12px;color: red;">{{item.label}}</span><span style="color: red;">票价:
                      ￥{{item.ticket_price}}</span>
                  </div>
                  <div class="left">
                    <span><img src="../assets/img/e0a75e3ce7fe47f7a03ff8b9f8a9bf8d.jpg" alt="" class="icon"></span>
                    <span> {{name}}</span>
                  </div>
                </div>
              </router-link>
              <div class="right" @click="iconClick(item)">
                <i class="el-icon-star-on" v-if="item.star"></i>
                <i class="el-icon-star-off" v-else></i>
                <span>{{item.praise}}</span>
              </div>
            </div>
          </template>
        </waterfall>
      </van-list>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'find',
    data() {
      return {
        isShows: [],
        spots: [],
        collection: [],
        name: '嘻嘻嘻',
        count: 1,
        maxPage: 1,
        loading: false,
        finished: false,
      }
    },
    created() {
      this.spotCreate();
    },
    methods: {
      spotCreate() {
        // 获取景点内容
        this.$get(this.$api.API_URL_SPOT, {
          page: this.count
        }).then(res => {
          this.maxPage = res.last_page;

          for (let item of res.data) {
            this.spots.push(item);
          }

          this.collectionCreate();

          // 初始化收藏状态
          for (let item of this.spots) {
            for (let itemz of this.collection) {
              if (itemz.spots_id === item.id) {
                this.$set(item, 'star', true);
              }
            }
          }
        })
      },
      //获取收藏信息
      collectionCreate() {
        this.$post(this.$api.API_URL_COLLECTION + '/index', {
          token: this.$store.state.token
        }).then(res => {
          if (res.code === 200) {
            this.collection = res.data;
          }
        })
      },
      // 收藏状态切换
      iconClick(item) {
        if (item.star) {
          // 取消收藏
          this.$delete(this.$api.API_URL_COLLECTION + '/delone', {
            token: this.$store.state.token,
            spots_id: item.id
          }).then(res => {
            this.$Toast(res.msg)
          })
          this.$set(item, 'star', false);
        } else {
          // 收藏
          this.$post(this.$api.API_URL_COLLECTION, {
            token: this.$store.state.token,
            spots_id: item.id
          }).then(res => {
            this.$Toast(res.msg)
          })
          this.$set(item, 'star', true);
        }
      },
      onLoad() {
        this.count++;
        setTimeout(() => {
          this.spotCreate();
          // 加载状态结束
          this.loading = false;

          // // 数据全部加载完成
          if (this.count > this.maxPage) {
            this.finished = true;
          }
        }, 1000);
      },


    },
    beforeMount() {
      for (let item in this.test) {
        this.isShows.push(false);
      }
    },
  }
</script>

<style scoped="scoped">
  .WaterfallItem {
    display: block;
    background-color: #FFFFFF;
    border-radius: 7px;
    overflow: hidden;
    width: 96%;
    margin-left: 2%;
    margin-top: 10px;
    padding-bottom: 10px;
    color: #000;
  }

  .WaterfallItem:nth-child(1) {
    margin-top: 10px;
  }

  .WaterfallItem:last-child {
    /* background-color: red; */
    margin-bottom: 40px;
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .content {
    padding: 0 5px;
  }

  .hide {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  .icon {
    width: 20px;
    border-radius: 20px;
    vertical-align: bottom;
  }

  img {
    width: 100%;
  }
</style>
