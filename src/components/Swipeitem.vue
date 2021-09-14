<template>
  <div class="showitem">
    <van-swipe :show-indicators="false">
      <slot>
      </slot>
    </van-swipe>
  </div>
</template>
<style lang="less">
.showitem {
  margin-top: 1rem;
  padding: 0 1rem 1rem;
  box-sizing: border-box;

  .wrap {
    display: flex;
      flex-wrap: wrap;
    .items {
      width: 33.33%;
      padding: 0 1rem;
      box-sizing: border-box;
      img {
        width: 100%;
      }
    }
    .fl_items{
      width: 33.33%;
      box-sizing: border-box;
      padding:0 .3rem;
      p{
        padding: .2rem 0 !important;
        box-sizing: border-box;
      }
      .fl_name{
        width: 100%;
         overflow: hidden;
        word-break: keep-all;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .fl_price{
        color: red;
        font-size: .8rem;
        font-weight: bold;
      }
      img{
        width: 100%;
      }
    }
  }
}
</style>
<script>
export default {};
</script>