<template>
  <div id="app">
    <router-view class="views" />
    <div class="bottomspace" v-if="this.$route.meta.showTab"></div>
    <van-tabbar
      route
      active-color="#ee0a24"
      inactive-color="#000"
      class="bottomnav"
      v-if="this.$route.meta.showTab"
    >
      <van-tabbar-item replace to="/" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/category" icon="apps-o"
        >分类</van-tabbar-item
      >
      <van-tabbar-item replace to="/cart" icon="shopping-cart-o"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
    <Navbar></Navbar>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  components: {
    Navbar,
  },
};
</script>
<style lang='less'>
body::-webkit-scrollbar {
  display: none;
}

*::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
  display: none !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f5f5f5;
  position: relative;
  // margin-bottom: 50px;
  .bottomspace {
    width: 100%;
    height: 3.8rem;
  }
  .bottomnav {
    height: 3.8rem;
  }
  p {
    margin: 0;
  }
  .views {
    height: 100vh;
  }
  .navbar {
    position: fixed;
    // right: -5vw;
    right: 5vw;
    bottom: 30vw;
  }
}
</style>
