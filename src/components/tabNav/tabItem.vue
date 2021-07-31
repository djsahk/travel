<template>
  <div id="tabItem">
    <slot name="tab">
        <ul>
            <li v-for="(list,index) in item" :key="list.name" @click="go(list.path,index)">
                <img :src="list.img" alt="图片跑丢了" v-if="!(index == id)">
                <img :src="list.activeImg" alt="图片跑丢了" v-else>
                <br>
                <a href="javascript:;" v-if="list.name" :class="{active: index == id}">{{list.name}}</a>
            </li>
        </ul>
    </slot>
  </div>
</template>

<script>
export default {
    name: 'tabItem',
    data() {
        return {
            item: [],
            id: 0
        }
    },
    created() {
        this.getTabData()
        this.getStorage()
    },
    methods: {
        getTabData() {
            this.item = [{
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
            }]
        },
        go(path,index) {
            if(path)
                this.$router.push({
                    path,
                    name: path.slice(1)
                })

            this.id = index
            if(index != 2) window.localStorage.setItem('id' , index)
        },
        getStorage() {
            const id = window.localStorage.getItem('id')
            if(id) {
                this.id = id
                this.go(this.item[id].path , id)
            }
        }
    }
}
</script>

<style scoped>
    #tabItem,ul {
        width: 100%;
        height: 100%;
    }

    ul {
        display: flex;
    }

    li {
        flex: 1;
        text-align: center;
        font-size: .87em;
        font-weight: bold;
    }

    img {
        width: 20px;
    }

    li:nth-child(3) img {
        width: 35px;
        vertical-align: middle;
    }

    li a {
        color: #000;
    }

    .active {
        color: rgb(8,177,156)
    }
</style>
