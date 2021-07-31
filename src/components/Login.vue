<template>
  <div>
    <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="$router.replace({name:'home'})" />
    <div style="width: 200px;margin: 0 auto;">
      <img src="../assets/images/wode-active.png" alt="" style="width: 100%;">
    </div>


    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="name"
        label="用户名"
        placeholder="请输入用户名"
        required
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        required
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 20px 16px;">
         <van-button round block type="info" native-type="submit">登录</van-button>
       </div>
       <div style="margin: 16px;">
          <van-button type="info" round  plain hairline to="register" replace block>注册</van-button>
        </div>
    </van-form>


  </div>

</template>

<script>
  import {
    mapMutations
  } from 'vuex';
  export default {
    data() {
      return {
        value: '',
        username: '',
        password: '',
      }
    },
    created() {
      if(this.$store.state.token) {
        this.$Toast.fail('你已登录');
        this.$router.replace({name:'home'})
      }
    },
    methods: {
      ...mapMutations(['setToken']),
      onSubmit(values) {
          this.$post(this.$api.API_URL_USER + '/login', {
            name: values.name,
            password: values.password,
          }).then( res => {
               if(res.code===200) {
                 this.$Toast.success(res.msg)
                 this.setToken(res.data.api_token);
                 this.$router.replace({name:'home'})
               } else {
                 this.$Toast.fail('账号或密码错误')
               }
            })

      }
    }
  }
</script>

<style scoped>
</style>
