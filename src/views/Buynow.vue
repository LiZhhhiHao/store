<template>
  <div class="buy" v-if="buydata != ''">
    <div class="buy_top">
      <van-tabs v-model="active" animated type="card">
        <van-tab title="配送地址">
          <div class="address">
            <div class="atext">
              <p class="van-ellipsis">
                <span>{{ buydata.addressInfo.real_name }} </span>
                <span>{{ buydata.addressInfo.phone }} </span>
              </p>
              <p class="van-ellipsis">
                <span v-if="buydata.addressInfo.is_default == 1" class="moren"
                  >[默认]
                </span>
                <span class="adetail van-ellipsis"
                  >{{ buydata.addressInfo.province
                  }}{{ buydata.addressInfo.city }}
                  {{ buydata.addressInfo.district }}
                  {{ buydata.addressInfo.detail }}</span
                >
              </p>
            </div>
            <div class="aicon"><van-icon name="arrow" size="2rem" /></div>
          </div>
        </van-tab>
        <van-tab title="到店自提">到店自提</van-tab>
      </van-tabs>
    </div>
    <div class="buy_goods">
      <p>共{{ buydata.cartInfo.length }}件商品</p>
      <div class="goods">
        <van-card
          v-for="(bl, index) in buydata.cartInfo"
          :key="index"
          :price="bl.productInfo.price"
          :desc="bl.productInfo.attrInfo.suk"
          :title="bl.productInfo.store_name"
          :thumb="bl.productInfo.image"
        >
          <template #title>
            <div class="card_title">
              <p class="van-ellipsis">{{ bl.productInfo.store_name }}</p>
              <p>x{{ bl.cart_num }}</p>
            </div>
          </template>
        </van-card>
      </div>
    </div>
    <div class="buy_section">
      <ul>
        <li>
          <p>积分抵扣</p>
          <p>当前积分:{{ buydata.userInfo.integral }}</p>
        </li>
        <li>
          <p>快递费用</p>
          <p>¥{{ buydata.priceGroup.storePostage }}</p>
        </li>
        <li>
          <p>会员优惠</p>
          <p>- ¥{{ buydata.priceGroup.vipPrice }}</p>
        </li>
        <li>
          <p>备注信息</p>
          <p>
            <textarea type="text"  id="peizu" placeholder="请添加备注(150字以内)"></textarea>
          </p>
        </li>
      </ul>
    </div>
    <div class="buy_paytype">
      <h3>支付方式</h3>
      <div class="pay">
        <p>余额支付</p>
        <p>可用余额:{{buydata.userInfo.now_money}}</p>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.buy {
  text-align: left;
  .buy_top {
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    background-image: linear-gradient(180deg, #e93323 0, #f5f5f5);
    height: unset;
    .van-tabs__wrap {
      height: unset;
    }
    .van-tabs__nav {
      border: none;
      background-color: unset;
      margin: unset;
      height: 12vw;
      display: flex;
      align-items: flex-end;
      .van-tab {
        background-color: rgba(255, 255, 255, 0.4);
        height: 8vw;
        border: none;
        transform-origin: bottom;
      }
      .van-tab.van-tab--active {
        background-color: #fff;
        height: 12vw;
        color: #ee0a24;
      }
    }
    .van-tabs__content {
      margin-top: -1px;
      background-color: #fff;
    }
    .address {
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .atext {
        display: flex;
        flex-direction: column;
        p:first-of-type {
          font-weight: bold;
          span:nth-of-type(2) {
            margin-left: 1rem;
            font-size: 1.2rem;
          }
        }
        p:nth-of-type(2) {
          margin-top: 1rem !important;
          .moren {
            color: red;
          }
          span.adetail {
            font-size: 0.9rem;
            margin-left: 0.5rem;
          }
        }
      }
    }
  }
  .buy_goods {
    background-color: #fff;
    > p {
      padding: 1rem;
      border-bottom: 1px solid #ccc;
    }
    margin-bottom: 1rem;
    .van-card {
      background-color: #fff;
      .van-card__header {
        &:last-of-type {
          border: none;
        }
        padding-bottom: 1rem;
        border-bottom: 1px solid #ccc;
      }
      .card_title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        p:first-of-type {
          font-size: 0.9rem;
          flex-basis: 80%;
        }
        p:nth-of-type(2) {
          font-size: 1rem;
          color: #ccc;
        }
      }
      .van-card__price {
        color: #ee0a24;
      }
    }
  }
  .buy_section{
    background-color: #fff;
    li{
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      border-bottom: 1px solid #ccc;
      &:last-of-type{
        border: none;
        flex-direction: column;
        textarea{
          border: none;
          margin-top: 1rem;
          padding: 1rem;
          box-sizing: border-box;
          width: 100%;
          height: 6rem;
          background-color: #f9f9f9;
        }
      }
    }
  }
  .buy_paytype{
    background-color: #fff;
    > h3{
      padding: 1rem;
      border-bottom: 1px solid #ccc;
    }
    .pay{
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      buydata: [],
      active: 0,
    };
  },
  created() {
    let token = localStorage.getExpire("token");
    this.axios({
      method: "post",
      url: "/order/confirm",
      data: {
        cartId: this.$route.params.id,
      },
      headers: {
        "Authori-zation": "Bearer " + token,
      },
    }).then((data) => {
      if (data.data.status == 410000) {
        this.$router.push({
          path: "/login",
          query: { fullPath: this.$route.fullPath },
        });
      } else if (data.data.status == 400) {
        Toast(data.data.msg);
      } else {
        this.buydata = data.data.data;
      }
      console.log(data.data.data);
    });
  },
};
</script>