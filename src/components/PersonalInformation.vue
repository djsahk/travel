<template>
  <div id="Personnal">
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />

    <div id="body" v-if="showlist">
      <van-cell-group >
        <van-cell title="头像" is-link @click="show = true">
          <template #default>
            <div style="width: 50px;height: 50px;float: right;">
             <van-image
               width="100%"
               lazy-load
               :src="$api.BASE_SERVER_URL+'/'+user.user_img"
             />
            </div>
          </template>
        </van-cell>
        <van-cell title="昵称" :value="user.name" is-link />
        <van-cell title="手机" :value="user.phone" is-link/>
        <van-cell title="邮箱" :value="user.email" is-link/>
      </van-cell-group>

      <van-cell-group>
        <van-cell title="性别" :value="user.sex" is-link />
        <van-cell title="出生年月" :value="user.birthday" is-link />
        <van-cell title="个性签名" :value="user.signature" is-link />
      </van-cell-group>

      <van-popup v-model="show" round position="bottom" :style="{ height: '158px' }">
        <div class="popup_item" @click="enlargeImg">查看头像</div>
        <div class="popup_item">
          <van-uploader :after-read="afterRead" multiple :max-size="500 * 1024" @oversize="onOversize">
            <p style="width: 100vw;">从相册选择图片</p>
          </van-uploader>
        </div>
        <div class="bg"></div>
        <div class="popup_item" style="color:#646566" @click="show = false">取消</div>
      </van-popup>
    </div>
    <div style="margin: 100px auto;text-align: center;" v-else>加载中...</div>
  </div>
</template>

<script>
  import { ImagePreview } from 'vant';
  export default {
     components: {
        [ImagePreview.Component.name]: ImagePreview.Component,
      },
    data() {
      return {
        user: [],
        show: false,
        showlist: false,
      }
    },
    created() {
      this.userCreate();
    },
    methods: {
      enlargeImg() {
        ImagePreview([
          this.$api.BASE_SERVER_URL+'/'+this.user.user_img
        ]);
      },

      //上传头像
      afterRead(file) {
        //创建formData对象的参数
        let obj = {};
        obj['content'] = this.dataURLtoBlob(file.content);
        obj['name'] = file.file.name;

        this.$upload(this.$api.API_URL_AUTH_USER+ '/upUserImg',{
          token: this.$store.state.token,
          pic: obj
        }).then(res=> {
          if(res.code === 200) {
            this.userCreate();
            this.$Toast.success(res.msg);
          } else {
            this.$Toast.fail(res.msg);
          }
        })
        this.show = false;
      },
      // base64转Blob
      dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {
          type: mime
        });
      },
      onOversize(file) {
        this.$Toast.fail('文件大小不能超过 500kb');
      },
      userCreate() {
        this.$post(this.$api.API_URL_USER, {
          token: this.$store.state.token
        }).then(res => {
          if (res.code === 200) {
            this.user = res.data;
            this.showlist = true
          } else {
            this.$Toast.fail(res.msg);
          }
        })
      }
    }
  }
</script>

<style scoped>
  #Personnal {
    height: 100vh;
    background-color: #e6e6e6;
  }

  .van-cell-group {
    margin-top: 10px;
  }

  .popup_item {
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #323233;
  }

  .bg {
    height: 8px;
    background-color: #f7f8fa;
  }
</style>
