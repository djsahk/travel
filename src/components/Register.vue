<template>
  <div>
    <van-nav-bar title="注册" left-text="返回" left-arrow @click-left="$router.replace({name: 'Login'})" />
    <div style="width: 200px;margin: 0 auto;">
      <img src="../assets/images/wode-active.png" alt="" style="width: 100%;">
    </div>

    <van-form @submit="onSubmit">
      <van-field v-model="username" name="name" label="用户名" required
        :rules="[{ required: true, message: '请填写用户名'}]" colon />
        <van-field v-model="email"  name="email" label="邮箱"
          :rules="[{ message: '邮箱格式有误',validator:emailValidator }]" colon />
          <van-field v-model="phone"  name="phone" label="手机号码"
            :rules="[{ message: '手机号码有误',validator:phoneValidator }]" colon />
      <van-field v-model="password" type="password" name="password" label="密码" required
        :rules="[{ required: true, message: '密码不可小于6位',pattern:passwordPattern }]" colon />
      <van-field v-model="password_confirmation" type="password" name="password" label="确认密码" required
         :rules="[{ required: true, message: '密码不一致',validator:passValidator }]" colon />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        password_confirmation: '',
        email: '',
        phone: '',
        passwordPattern: /\d{6}/,
      }
    },
    methods: {
      onSubmit(values) {
        console.log('submit', values);
            this.$post(this.$api.API_URL_USER + '/register', {
              data: values
            }).then(res => {
                if(res.code === 200) {
                  this.$Toast.success('创建成功,2秒后返回登录页');
                  const that = this;
                    setTimeout(function() {
                      that.$router.replace({
                        name: 'Login'
                      })
                    }, 2000)
                  } else {
                  this.$Toast.fail(res.code);
                }
            })
      },
      passValidator(val) {
        return val === this.password;
      },
      emailValidator(val) {
        if(val != '' ) {
          return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(val);
        }
      },
      phoneValidator(val) {
        if(val != '' ) {
          return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(val);
        }
      },
    }
  }
</script>

<style>
</style>
