<template>
  <div class="navbar">
    <van-popover v-model="showPopover" trigger="click" placement="left">
      
      <van-grid
        square
        clickable
        center
        :border="false"
        column-num="3"
        style="width: 50vw"
        class="barshow"
      >
        <van-grid-item @click="showPopover = false" icon="wap-home-o" to="/" />
        <van-grid-item
          @click="showPopover = false"
          icon="shopping-cart-o"
          to="/cart"
        />
        <van-grid-item @click="showPopover = false" icon="user-o" to="/user" />
      </van-grid>
      <template #reference>
        <van-button round>
          <img src="../assets/bardot.gif" v-if="showPopover == false" />
          <img src="../assets/showbar.gif" v-if="showPopover == true" />
        </van-button>
      </template>
    </van-popover>
  </div>
</template>
<style lang="less">
.navbar {
  .van-button {
    width: 12vw;
    height: 12vw;
    padding: 0;
    background-color: #f44939;
    .van-button__text {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        transform: rotate(90deg);
      }
    }
  }
}
.van-popup {
  .van-popover__content {
    box-shadow: unset !important;
    background-color: unset !important;
  }
}
.barshow {
  border-radius: 2rem;
  overflow: hidden;
  // background-color: #f44939;
  .van-grid-item {
    .van-grid-item__content {
      background-color: #f44939;
    }
    .van-icon {
      color: white;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      showPopover: false,
    };
  },
};
</script>