<template>
  <div id="Release">
    <van-nav-bar title="发布动态" left-arrow @click-left="$router.back()" right-text="发布" @click-right="all()" />

    <van-field v-model="message" rows="6" autosize type="textarea" placeholder="请输入留言" />

    <div style="margin: 15px;">
      <van-uploader v-model="fileList" multiple :max-count="1" :max-size="500 * 1024" @oversize="onOversize" />
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: '',
        fileList: [],
        code: 0
      };
    },
    methods: {
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
        this.$Toast('文件大小不能超过 500kb');
      },

      all() {
        if (this.message === '') {
          this.$Toast.fail('请输入留言');
        } else if (this.fileList.length){
          const formData = new FormData()
          let obj = {};
          obj['content'] = this.dataURLtoBlob(this.fileList[0].content);
          obj['name'] = this.fileList[0].file.name;
          this.$upload(this.$api.API_URL_NOTE, {
            token: this.$store.state.token,
            message: this.message,
            pic: obj
          }).then(res => {
            this.code = res.code
            if (res.code === 200) {
              this.$Toast.success(res.msg);
              this.$router.replace('/circle');
            } else {
              this.$Toast.fail(res.msg);
            }
          })
          } else {
            this.$post(this.$api.API_URL_NOTE, {
              token: this.$store.state.token,
              message: this.message
            }).then(res => {
              if (res.code === 200) {
                this.$Toast.success(res.msg);
                this.$router.replace('/circle');
              } else {
                this.$Toast.fail(res.msg);
              }
            })
          }

      }
    }
  };
</script>

<style scoped>
</style>
