<template>
  <van-action-sheet v-model="show">
    <div class="content">
      <van-icon name="cross" @click="show = false" />
      <div class="title_content">
        <van-image
          width="6rem"
          height="6rem"
          fit="contain"
          radius="1rem"
          :src="
            currentgoods.image ? currentgoods.image : detaildata.storeInfo.image
          "
        />
        <div class="title_r">
          <p>{{ detaildata.storeInfo.store_name }}</p>
          <p>
            <span
              >¥{{
                currentgoods.price
                  ? currentgoods.price
                  : detaildata.storeInfo.price
              }}
            </span>
            <span
              >库存{{
                currentgoods.stock
                  ? currentgoods.stock
                  : detaildata.storeInfo.stock
              }}</span
            >
          </p>
        </div>
      </div>
      <div class="norms">
        <div v-for="(n, idx) in detaildata.productAttr" :key="idx">
          <p>{{ n.attr_name }}</p>
          <ul>
            <label v-for="(nv, index) in n.attr_values" :key="index">
              <input
                type="radio"
                :name="n.attr_name"
                :value="nv"
                v-model="sku[idx]"
                v-show="false"
              />
              <span :class="{ checkitem: sku[idx] == nv }">{{ nv }}</span>
            </label>
          </ul>
        </div>
      </div>
      <div class="cart_num">
        <p>数量</p>
        <div class="cart_count">
          <button @click="cart_value--">-</button>
          <input type="number" v-model="cart_value" />
          <button @click="cart_value++">+</button>
        </div>
      </div>
    </div>
    <div class="sure">
      <van-button
        color="#ec3b20"
        type="warning"
        round
        @click="add_cart"
        v-if="!buy"
      >
        确认
      </van-button>
      <van-button
        color="#ec3b20"
        type="warning"
        round
        @click="buynow"
        v-if="buy"
      >
        确认
      </van-button>
    </div>
  </van-action-sheet>
</template>
<style lang="less">
.van-action-sheet__content {
  .content {
    position: relative;
    padding: 1rem;
    padding-right: 3.5rem;
    text-align: left;
    .van-icon {
      position: absolute;
      font-size: 1.5rem;
      right: 0.8rem;
      top: 0.5rem;
      color: #999;
    }
    .title_content {
      display: flex;
      margin-bottom: 2rem;
      .title_r {
        width: 70%;
        padding: 1rem;
        box-sizing: border-box;
        p:first-of-type {
          width: 100%;
          overflow: hidden;
          word-break: keep-all;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        p:nth-of-type(2) {
          margin-top: 1rem !important;
          span:first-of-type {
            color: red;
            font-size: 1.2rem;
            margin-right: 0.2rem;
          }
          span:nth-of-type(2) {
            color: #aaa;
            font-size: 0.8rem;
          }
        }
      }
    }
    .norms {
      ul {
        margin: 0.8rem 0;
        span {
          border: 1px solid #ccc;
          padding: 0.4rem;
          margin: 0 0.5rem;
        }
        .checkitem {
          background-color: #ff3700;
          color: white;
        }
      }
    }
    .cart_num {
      .cart_count {
        margin: 0.8rem 0.5rem;
        input {
          width: 16%;
          text-align: center;
          height: 1rem;
        }
        button {
          width: 10%;
          background-color: #fff;
          border: 1px solid #aaa;
        }
      }
    }
  }
  .sure {
    padding: 1rem;
    padding-top: 0;
    .van-button {
      width: 100%;
      font-size: 1rem;
      letter-spacing: 2rem;
      text-indent: 2rem;
    }
  }
}
</style>
<script>
export default {
    
};
</script>