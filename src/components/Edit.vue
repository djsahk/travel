<template>
  <div id="Edit">
    <van-nav-bar title="编辑" left-arrow @click-left="$router.back()" right-text="确认" />
    <van-cell-group>
      <van-field v-model="value" label="文本" placeholder="请输入用户名" />
    </van-cell-group>
  </div>
</template>

<script>
</script>

<style>
</style>
