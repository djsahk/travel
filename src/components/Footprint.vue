<template>
  <div id="Footprint">
    <van-nav-bar title="我的足迹" left-arrow @click-left="$router.back()" right-text="清空"  @click-right="removeall()"/>


    <ul v-if="showlist" class="footPrintlist">
    	<li  v-for="(item,index) in foot" :key="index">
        <router-link :to="{name:'ScenicDetail',query:{id:item.spots.id}}" style="color: #000;">
        <div class="img"><img :src="$api.BASE_SERVER_URL+item.spots.pics" /></div>
    		<p><span>{{item.spots.spot_name}}</span></p>
        </router-link>
    	</li>
    </ul>
    <div class="NoRecord" v-else>暂无足迹，请先浏览网站！</div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        foot: [],
        showlist: false
      }
    },
    created() {
      this.$post(this.$api.API_URL_FOOTPRINT + '/getall', {
        token: this.$store.state.token
      }).then(res => {
        if (res.code === 200) {
          this.foot = res.data;
          this.showlist = true;
        }
      })
    },
    methods: {
      removeall() {
        this.$delete(this.$api.API_URL_FOOTPRINT,{
          token: this.$store.state.token
        }).then(res=> {
          if(res.code === 200) {
            this.foot = [];
            this.showlist = false;
            this.$Toast('删除成功');
          }
        })
      }
    }
  }
</script>

<style scoped>
  #Footprint {
    height: 100vh;
    background-color: #e6e6e6;
  }

  ul {
   display: flex;
    flex-wrap: wrap;
    padding: 10px;
  }

  li {
    width: 31%;
  }
  li:nth-child(2), li:nth-child(3n+2){
     margin: 0 2.5%;
  }
  li p {
    margin-top: 5px;
    text-align: center;
  }
  .img {
    height: 110px;
  }
  img {
    width: 100%;
    height: 100%;
  }

  .NoRecord {
    margin: 100px auto;
    text-align: center;
  }
</style>
