<template>
  <div class="detailtitle">
    <div class="you">
      <slot name="you"> </slot>
    </div>
    <div class="pt">
        <slot name ="pt"></slot>
    </div>
  </div>
</template>
<style lang="less">
.detailtitle {
  height: 2.8rem;
  line-height: 2.8rem;
  .you {
    display: flex;
    justify-content: center;
    align-items: center;
    color: orange;
    p {
      margin: 0 0.5rem !important;
      background-image: -webkit-gradient(
        linear,
        left top,
        right top,
        from(#f57a37),
        to(#f21b07)
      );
      background-image: linear-gradient(90deg, #f57a37 0, #f21b07);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>
<script>
export default {};
</script>