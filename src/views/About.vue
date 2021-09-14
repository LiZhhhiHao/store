<template>
  <div class="about">
    <van-swipe autoplay='2000' indicator-color='white' @change="play">
      <van-swipe-item>
        <van-image src="https://aecpm.alicdn.com/simba/img/TB1XotJXQfb_uJkSnhJSuvdDVXa.jpg"/>
      </van-swipe-item>
      <van-swipe-item>
        <van-image src="https://aecpm.alicdn.com/simba/img/TB1XotJXQfb_uJkSnhJSuvdDVXa.jpg"/>
      </van-swipe-item>
      <van-swipe-item>
        <van-image src="https://aecpm.alicdn.com/simba/img/TB1XotJXQfb_uJkSnhJSuvdDVXa.jpg"/>
      </van-swipe-item>
      <van-swipe-item>
        <van-image src="https://aecpm.alicdn.com/simba/img/TB1XotJXQfb_uJkSnhJSuvdDVXa.jpg"/>
      </van-swipe-item>
    <template  #indicator>
      <div class="custom-indicator">{{ curindex  }}/4</div>
    </template>
    </van-swipe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      curindex:0
    }
  },
  methods: {
    play(index){
      this.curindex = index +1
      // console.log(index);
    }
  },
}
</script>
<style lang='less'>
.custom-indicator{
  position: absolute;
  right: 0;
  bottom: 10px;
  padding: 10px;
  color: white;
  background-color: rgba(0,0,0,.3);
}
</style>