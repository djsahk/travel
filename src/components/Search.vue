<template>
  <div>
    <van-search placeholder="请输入搜索关键词" show-action v-model="value" @search="search" >
      <div @click="$router.back()" slot="action">返回</div>
    </van-search>
    <div class="container" v-if="spot">
        <van-cell-group v-for="(item,index) in spot" :key="index">
          <van-cell :title="item.spot_name" :to="{name:'ScenicDetail',query:{id:item.id}}"/>
        </van-cell-group>
    </div>
    <div v-else>
      <van-cell title="暂无数据"></van-cell>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: '',
        spot:[],
      }
    },
    methods:{
      search() {
        if(this.value === '') {
            this.$Toast.fail('请输入要查找的信息');
        } else {
          this.$get(this.$api.API_URL_SPOT+ '/search',{
            'spot_name': this.value
          }).then(res=>{
            if(res.length != 0 ) {
              this.spot = res;
            } else {
              this.spot = null;
            }
          })
        }

      }
    },
    created() {

    }
  }
</script>

<style>
</style>
