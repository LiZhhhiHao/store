<template>
  <div v-if="this.mydata != ''">
    <div class="my_top">
      <div class="my_topl">
        <van-image round :src="mydata.avatar" />
        <div class="my_toplc">
          <p>{{ mydata.nickname }}</p>
          <span>当前等级:{{ mydata.level }}</span>
          <span>ID:{{ mydata.uid }} <van-icon name="edit" /></span>
        </div>
      </div>
      <div class="setting" @click="$router.push('/setting')" >
        <van-icon name="setting-o" color="white" />
      </div>
    </div>
    <div class="my_content">
      <div class="my_msg">
        <div>
          <p>我的余额</p>
          <p>{{ mydata.now_money }}</p>
        </div>
        <div>
          <p>当前佣金</p>
          <p>{{ mydata.brokerage_price }}</p>
        </div>
        <div>
          <p>优惠卷</p>
          <p>{{ mydata.sign_num }}</p>
        </div>
      </div>
      <div class="my_order">
        <div class="my_order_title">
          <p>我的订单</p>
          <span>全部订单 <van-icon name="arrow" /></span>
        </div>
        <van-divider />
        <div class="my_order_list">
          <van-grid :border="false" clickable square :column-num="5">
            <van-grid-item
              icon="pending-payment"
              text="待付款"
              :badge="
                mydata.orderStatusNum.unpaid_count == 0
                  ? ''
                  : mydata.orderStatusNum.unpaid_count
              "
            />
            <van-grid-item
              icon="completed"
              text="待发货"
              :badge="
                mydata.orderStatusNum.unshipped_count == 0
                  ? ''
                  : mydata.orderStatusNum.unshipped_count
              "
            />
            <van-grid-item
              icon="logistics"
              text="待收货"
              :badge="
                mydata.orderStatusNum.received_count == 0
                  ? ''
                  : mydata.orderStatusNum.received_count
              "
            />
            <van-grid-item
              icon="comment-o"
              text="待评价"
              :badge="
                mydata.orderStatusNum.complete_count == 0
                  ? ''
                  : mydata.orderStatusNum.complete_count
              "
            />
            <van-grid-item
              icon="after-sale"
              text="售后/退款"
              :badge="
                mydata.orderStatusNum.refund_count == 0
                  ? ''
                  : mydata.orderStatusNum.refund_count
              "
            />
          </van-grid>
        </div>
      </div>
      <!-- <div class="my_serve">
        <div class="my_serve_title">
          <p>我的服务</p>
        </div>
        <van-divider />
        <div class="my_order_list">
          <van-grid :border="false" clickable square :column-num="4">
            <van-grid-item
              v-for="(ol, index) in mydata_serve"
              :key="index"
              :text="ol.name"
              :icon="ol.pic"
              :url="ol.wap_url"
            />
          </van-grid>
        </div>
      </div> -->
    </div>
  </div>
</template>
<style lang="less">
.my_top {
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #e93323;
  padding: 0 1rem;
  height: 6rem;
  position: relative;
  .my_topl {
    display: flex;
    align-items: center;
    .van-image {
      width: 5rem;
      height: 5rem;
    }
    .my_toplc {
      margin-left: 1rem;
      color: white;
      display: flex;
      flex-direction: column;
      span {
        margin-top: 0.5rem;
        color: #ccc;
        font-size: 0.8rem;
      }
    }
  }
  &::after {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -3rem;
    z-index: 0;
    content: "";
    height: 3.5rem;
    width: 100%;
    border-radius: 0 0 50% 50%;
    background-color: #e93323;
  }
}
.my_content {
  position: relative;
  z-index: 1;
  padding: 0 1rem;
  > div {
    background-color: #fff;
    display: flex;
    padding: 1rem 0;
    border-radius: 1rem;
    box-sizing: border-box;
    margin-bottom: 1rem;
  }
  .my_msg {
    justify-content: space-around;
    > div {
      flex: 1;
      border-right: 1px solid #eee;
      p:first-of-type {
        color: #999;
        font-size: 0.9rem;
        margin-bottom: 0.2rem !important;
      }
      p:nth-of-type(2) {
        font-size: 1.2rem;
      }
      &:last-child {
        border: none;
      }
    }
  }
  .my_order {
    flex-direction: column;
    box-sizing: border-box;
    .my_order_title {
      display: flex;
      justify-content: space-between;
      margin: 0 1rem;
      span {
        color: #aaa;
        font-size: 0.8rem;
        i {
          vertical-align: text-bottom;
        }
      }
    }
  }
  .my_serve {
    flex-direction: column;
    box-sizing: border-box;
    .my_serve_title {
      margin-left: 1rem;
      text-align: left;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      mydata: [],
      mydata_serve: [],
    };
  },
  methods: {
   
  },
  created() {
    let token = localStorage.getExpire("token");
    this.axios({
      method: "get",
      url: "/user",
      headers: {
        "Authori-zation": "Bearer " + token,
      },
    }).then((data) => {
      if (data.data.status == 200) {
        this.mydata = data.data.data;
        // console.log(this.mydata);
      } else {
        console.log("系统出错");
      }
    });
    this.axios({
      method: "get",
      url: "/menu/user",
      headers: {
        "Authori-zation": "Bearer " + token,
      },
    }).then((data) => {
      if (data.data.status == 200) {
        this.mydata_serve = data.data.data.routine_my_menus;
        // console.log(this.mydata_serve);
      } else {
        console.log("系统出错");
      }
    });
  },
};
</script>