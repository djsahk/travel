<template>
  <div id="tabbar">
    <tab-item></tab-item>
  </div>
</template>

<script>
export default {
    name: 'tabbar',
    components: {
        tabItem: () => import('@/components/tabNav/tabItem')
    }
}
</script>

<style scoped>
    #tabbar {
        width: 100%;
        height: 39px;
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: #f4f4f4;
        padding-top: 2px;
        border-left: 2px solid rgb(8,177,156);
        border-right: 2px solid rgb(8,177,156);
    }
</style>