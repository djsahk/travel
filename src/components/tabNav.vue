<template>
	<div>
		<router-view></router-view>
		<van-tabbar v-model="active" route @change="onChange">

      <van-tabbar-item replace :to="item.path" v-for="(item,index) in icon" :key="index" >
         <span>{{item.name}}</span>
         <template #icon="props">
           <img :src="props.active ? item.activeImg : item.img" />
         </template>
       </van-tabbar-item>


		</van-tabbar>
	</div>

</template>

<script>
	export default {
		name: 'TabBar',
		data() {
			return {
        icon: [{
                name: '首页',
                img: require('@/assets/images/home.png'),
                activeImg: require('@/assets/images/home-active.png'),
                path: '/home'
            },{
                name: '发现',
                img: require('@/assets/images/find.png'),
                activeImg: require('@/assets/images/find-active.png'),
                path: '/find'
            },{
                name: null,
                img: require('@/assets/images/add.png'),
                activeImg: require('@/assets/images/add-active.png'),
                path: null
            },{
                name: 'Go圈',
                img: require('@/assets/images/quanzi.png'),
                activeImg: require('@/assets/images/quanzi-active.png'),
                path: '/circle'
            },{
                name: '我的',
                img: require('@/assets/images/wode.png'),
                activeImg: require('@/assets/images/wode-active.png'),
                path: '/mine'
            }],
				active: 0,
			};
		},
    methods: {
      onChange(index) {
        if(index === 2) {
          this.$router.push('/release');
        }
      },
    }
	};
</script>

<style>
</style>
