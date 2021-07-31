<template>
  <div id="Account">
    <van-nav-bar title="账号管理" left-arrow @click-left="$router.back()"/>

    <van-cell-group>
       <van-cell :value="value[0]" clickable label="13712345678" title="djsahk" center @click="cellClick(0)">
         <template #icon>
           <div style="width: 25px;height: 25px;margin-right: 5px;"><img src="../assets/images/wode.png" alt="" style="width: 100%;"></div>
         </template>
       </van-cell>
       <van-cell :value="value[1]" clickable label="13145678123" title="zhangsan" center @click="cellClick(1)">
         <template #icon>
           <div style="width: 25px;height: 25px;margin-right: 5px;"><img src="../assets/images/wode.png" alt="" style="width: 100%;"></div>
         </template>
       </van-cell>
       <van-cell :value="value[2]" clickable label="18887654321" title="qq" center @click="cellClick(2)">
         <template #icon>
           <div style="width: 25px;height: 25px;margin-right: 5px;"><img src="../assets/images/wode.png" alt="" style="width: 100%;"></div>
         </template>
       </van-cell>
     </van-cell-group>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: ['√','','']
      }
    },
    methods: {
      cellClick(index){
        for(let item in this.value) {
          this.value[item] = '';
        }
        this.$set(this.value,index,'√');
        this.$Toast('切换成功');
      }
    }
  }
</script>

<style scoped>
 #Account {
   height: 100vh;
   background-color: #e6e6e6;
 }
 .van-cell-group {
   margin-top: 10px;
 }
</style>
