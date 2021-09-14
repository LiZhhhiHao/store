<template>
  <van-loading color="#0094ff">
    <slot></slot>
  </van-loading>
</template>
<style lang="less">
.van-loading {
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>