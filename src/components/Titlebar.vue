<template>
  <div class="titlebar">
    <div class="title">
      <slot name="title"></slot>
      <slot name="content"></slot>
    </div>
    <span class="more">更多<van-icon name="arrow" /></span>
  </div>
</template>
<style lang="less">
.titlebar {
  margin: 0 1rem;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  text-align: left;
  padding-top: 1rem;
  .title {
    //    flex: 1;
    width: 80%;
    p:nth-of-type(1){
        margin-bottom: 5px;
        font-size: .95rem;
        font-weight: bold;
        color: #000;
        position: relative;
         span{
             font-size: 0.5rem;
             color: red;
             position: absolute;
             margin-left: .2rem;
        }
    }
    p{
        margin: 0;
        font-size: .8rem;
        color: #666;
    }
   
  }
  .more {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .8rem;
  }
}
</style>
<script>
export default {};
</script>