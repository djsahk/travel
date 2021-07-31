<template>
  <div class="circle">
    <van-nav-bar title="go圈" fixed :placeholder="true" />

    <div v-if="showlist" style="margin-bottom: 50px;">

      <div class="item" v-for="(item,index) in notelist" :key="index">
        <div class="top">
          <div class="img">
            <van-image width="100%" lazy-load :src="$api.BASE_SERVER_URL+'/'+item.user.user_img" />
          </div>
          <p class="title">{{item.user.name}}</p>
          <p class="time">{{item.created_at}}</p>
        </div>
        <div class="body">
          <p>{{item.message}}</p>
          <div style="width: 200px;height: 200px;margin-top: 5px;" v-if="item.note_img">
            <van-image width="100%" lazy-load :src="$api.BASE_SERVER_URL+'/'+item.note_img" alt="" />
          </div>
        </div>
        <div class="bottom">
          <span style="left: 15%;">
            <van-icon name="share-o" style="vertical-align: bottom;" />30
          </span>
          <span style="left: 45%;">
            <van-icon name="chat-o" style="vertical-align: bottom;" />255
          </span>
          <span style="left: 70%">
            <van-icon name="like-o" style="vertical-align: bottom;" />2724
          </span>
        </div>
      </div>
    </div>
    <div class="NoRecord" v-else>暂无动态！</div>
    <!--  <div class="item" style="margin-bottom: 60px;">
        <div class="top">
          <div class="img"><img src="../assets/images/wode.png" alt=""></div>
          <p class="title">哔哩哔哩直播</p>
          <p class="time">1小时前</p>
        </div>
        <div class="body">
          决赛即将开始!<br>
          "宝哭"是再现婴儿的心情,用超越语言的纽带把人们联系在一起的竞技活动.
          刺客,突破了各种世界上最难关预选赛哭手们,终于在bilibili集结<br>
        </div>
        <div class="bottom">
          <span style="left: 15%;"><van-icon name="share-o" style="vertical-align: bottom;" />30</span>
          <span style="left: 45%;"><van-icon name="chat-o" style="vertical-align: bottom;" />255</span>
          <span style="left: 70%"><van-icon name="like-o" style="vertical-align: bottom;" />2724</span>
        </div>
      </div> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        notelist: [],
        showlist: false
      }
    },
    methods: {

    },
    created() {
      this.$post(this.$api.API_URL_NOTE + '/getall', {
        token: this.$store.state.token
      }).then(res => {
        if (res.code === 200) {
          this.notelist = res.data;
          this.showlist = true;
          for (let item of this.notelist) {
            item.created_at = item.created_at.substring(0, item.created_at.indexOf('T'))
          }
        }
      })
    }
  }
</script>

<style scoped="scoped">
  .circle {
    background-color: #e9ebec;
  }

  .item {
    margin-top: 10px;
    background-color: #fff;
    padding: 0 10px;
  }

  .top {
    height: 54px;
    padding-top: 10px;
  }

  .img {
    float: left;
    margin-right: 5px;
    width: 44px;
    height: 44px;
    border-radius: 44px;
    overflow: hidden;
  }

  .title {
    padding-top: 5px;
    font-weight: 600;
    font-size: 14px;
  }

  .time {
    margin-top: 5px;
    font-size: 12px;
    color: #333;
  }

  .body {
    margin: 10px 0;
  }

  .bottom {
    height: 35px;
    position: relative;
  }

  .bottom span {
    position: absolute;
    top: 8px;
  }

  .NoRecord {
    height: 90vh;
    padding-top: 200px;
    text-align: center;
  }
</style>
