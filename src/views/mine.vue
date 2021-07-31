<template>
  <div class="mine" style="background-color: #e9ebec;height: 100vh;">
    <van-nav-bar title="我的" />
    <van-cell-group>
      <van-cell :title="user.name" :label="user.signature" icon="user-circle-o" >
         <template #default >
           <p @click="$Toast('关注成功')">关注</p>
          </template>
        </van-cell>
    </van-cell-group>

    <van-cell-group style="text-align: center; margin-top: 40px;">
      <van-cell title="个人信息" is-link to="personal" icon="user-circle-o" />
      <van-cell title="账号管理" is-link to="accountnumber" icon="user-circle-o" />
      <van-cell title="我的收藏" is-link to="collection" icon="user-circle-o" />
      <van-cell title="我的动态" is-link to="note" icon="user-circle-o" />
      <van-cell title="我的足迹" is-link to="footprint" icon="user-circle-o" />
      <!-- <van-cell title="登录" is-link to="login" icon="user-circle-o" replace /> -->
      <van-cell title="退出" is-link @click="delLogin()" icon="user-circle-o" />
    </van-cell-group>

  </div>
</template>

<script>
  import {
    mapMutations
  } from 'vuex';
  export default {
    data() {
      return {
        user: [],
      }
    },
    created() {
      this.$post(this.$api.API_URL_USER,{
        token: this.$store.state.token
      }).then(res => {
        if(res.code === 200) {
          this.user = res.data;
        }
      })
    },
    methods:{
      ...mapMutations(['delToken']),
      delLogin() {
        this.$post(this.$api.API_URL_USER + '/logout', {
          token: this.$store.state.token
        }).then(res => {
          if(res.code === 200) {
            this.delToken();
            this.$router.replace({name:'Login'})
          }
          this.$Toast(res.msg);
        })
      },
    }
  }
</script>

<style>

</style>
