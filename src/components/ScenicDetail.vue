<template>
  <div>
    <div class="header">
      <div class="left" @click="$router.back()">&lt;</div>
      <div class="searchF" @click="$router.push({name: 'Search'})">
        <input type="search" class="search">
        <i class="el-icon-search"></i>
        <button>搜索</button>
      </div>
    </div>

    <van-swipe :height="500">
      <van-swipe-item v-for="(item,index) in 4" :key="index">
        <img v-lazy="$api.BASE_SERVER_URL+spots.pics" alt="" style="width: 100%;height: 100%;" />
      </van-swipe-item>
    </van-swipe>

    <div class="main">
      <div class="user clearfix">
        <div>
          <img style="float: left;margin-right: 5px;" src="../assets/img/e0a75e3ce7fe47f7a03ff8b9f8a9bf8d.jpg" alt="">
          <h2 style="float: left;">嘻嘻嘻</h2>
        </div>
        <!--   <div class="right">		暂时不需要
          <button>关注</button>
          <span>转发</span>
        </div> -->
      </div>
      <!-- <div class="biaoqian"> 暂时不需要
          这是标签行
        </div> -->
      <div>
        <h2 class="title">{{spots.spot_name}}</h2>
        <div class="content">
          {{spots.intro}}
        </div>
        <div class="clearfix">
          <span class="date" style="float: left;">发布于 {{spots.updated_at}}</span>
          <!-- <span style="float: right;">不喜欢</span> 暂时不需要 -->
        </div>
        <div style="border-bottom: #000000 solid 1px;margin: 10px 0px;"></div>
        <p>共{{comments.length}}条评论</p>

        <div v-if="length">
          <div class="comment" :key="index" v-for="(item,index) in comments">
            <img :src="$api.BASE_SERVER_URL + '/' + item.user.user_img" alt=""
              style="width: 25px;border-radius: 25px;position: absolute;left: 0;" v-if="item.user.user_img">
            <div style="margin-left: 30px;">
              <h3>{{item.user.name}}<span style="font-weight: 400;font-size: 14px;"> {{item.created_at}}</span></h3>
              <div>{{item.content}}</div>
            </div>
            <div style="position: absolute;right: 10px;top: 0;" @click="iconClick(item)">
              <i class="el-icon-star-off" v-if="!item.star"></i>
              <i class="el-icon-star-on" v-else></i>
              <span v-if="item.stars">{{item.stars}}</span>
            </div>

          </div>
        </div>
        <div v-else>2</div>
        <div
          style="background-color: #fff;height: 44px;line-height: 44px;position: fixed;bottom: 0;left: 0;right: 0;z-index: 10;">
          <input type="text" v-model="value" placeholder="说点什么吧" style="width: 85%;margin-left: 10px;">
          <span @click="commentClick"> 发送</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: '',
        spots: [],
        comments: []
      }
    },
    computed: {
      length: function() {
        return this.comments.length;
      }
    },
    methods: {
      // 创建页面信息
      spotsCreate() {
        this.$get(this.$api.API_URL_SPOT + '/note', {
          spot_id: this.$route.query.id
        }).then(res => {
          if (res.code === 200) {
            this.spots = res.data;
            this.spots.updated_at = this.spots.updated_at.substring(0, this.spots.updated_at.indexOf('T'))
          }
        })
      },
      // 获取评论信息
      commentCreate() {
        this.$get(this.$api.API_URL_COMMENTS + '/' + this.$route.query.id).then(res => {
          if (res.code === 200) {
            this.comments = res.data
            console.log(this.comments);

            for (let item of this.comments) {
              item.created_at = item.created_at.substring(0, item.created_at.indexOf('T'))
            }
          }
        })
      },
      // 创建足迹
      footprintCreate() {
        this.$post(this.$api.API_URL_FOOTPRINT, {
          token: this.$store.state.token,
          spots_id: this.$route.query.id
        }).then(res => {
        })
      },
      //  点赞评论
      iconClick(item) {
        if (item.star) {
          this.$patch(this.$api.API_URL_COMMENTS + '/' + item.id, {
            stars: --item.stars
          })
          this.$set(item, 'star', false);
        } else {
          this.$patch(this.$api.API_URL_COMMENTS + '/' + item.id, {
            stars: ++item.stars
          })
          this.$set(item, 'star', true);
        }

      },
      // 发送评论
      commentClick() {
        if (this.value != '') {
          this.$post(this.$api.API_URL_COMMENTS, {
            user_name: this.username,
            product_id: this.$route.query.id,
            content: this.value,
            stars: 0
          }).then(res => {
            this.value = '';
            this.$Toast.success('发送成功');
            this.commentCreate();
          })
        }
      },

    },
    created() {
      this.spotsCreate();
      this.commentCreate();
      this.footprintCreate();

    }
  }
</script>

<style scoped="scoped">
  .header {
    position: fixed;
    height: 44px;
    line-height: 44px;
    overflow: hidden;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: #fff;
  }

  .left {
    float: left;
    margin-left: 10px;
  }

  .right {
    float: right;
  }

  .searchF {
    position: relative;
    width: 90%;
    height: 30px;
    margin-top: 7px;
    margin-left: 30px;
  }

  .search {
    display: block;
    width: 100%;
    height: 30px;
    padding-left: 30px;
    background-color: #fff;
    border-radius: 20px;
    border: #08b19c solid 1px;
  }

  .searchF .el-icon-search {
    position: absolute;
    top: 7px;
    left: 10px;
  }

  .searchF button {
    border: 0;
    position: absolute;
    top: 2px;
    right: 2px;
    height: 25px;
    font-size: 14px;
    padding: 2px 6px;
    border-radius: 25px;
    margin-right: 2px;
    color: #fff;
    background-color: #08b19c;
  }

  .user img {
    width: 30px;
    border-radius: 30px;
  }

  .content {
    padding: 8px 0;
  }

  .main {
    margin: 10px;
    margin-bottom: 54px;
  }

  .title {
    margin-top: 5px;
  }

  .comment {
    position: relative;
    margin-top: 10px;
  }

  .clearfix:after,
  .clearfix:before {
    content: "";
    display: table;
  }

  .clearfix:after {
    clear: both;
  }

  .clearfix {
    *zoom: 1;
  }

  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
</style>
