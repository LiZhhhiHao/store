<template>
  <div style="background-color: white">
    <Loading v-if="detaildata == ''">请稍候</Loading>
    <div class="detail" v-if="detaildata != ''">
      <div class="d_top">
        <van-swipe @change="onChange" class="topswipe">
          <van-swipe-item
            v-for="(d, index) in detaildata.storeInfo.slider_image"
            :key="index"
          >
            <van-image :src="d" fit="contain" />
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">
              {{ current + 1 }}/{{ detaildata.storeInfo.slider_image.length }}
            </div>
          </template>
        </van-swipe>
        <div class="d_top_content">
          <p class="price">
            <span><span>¥</span>{{ detaildata.storeInfo.price }}</span>
            <span
              >¥{{ detaildata.storeInfo.vip_price }}
              <van-icon
                name="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAVCAYAAAA5BNxZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphNmVhODdiZC0zYWY5LTEzNDYtYjYyYy1hZGE1MDVmMDUxMTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MURGMzA2REQyMDNEMTFFOTkxOUVDOTNCMjU4MDcwQjQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MURGMzA2REMyMDNEMTFFOTkxOUVDOTNCMjU4MDcwQjQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODk2ZWFjMGYtNDI3MC0yZDRlLThiYTItYjE4OTA2YzRiOWVlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MDg3NDQyZTItM2M1ZC1iNDRkLTljYmUt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"
              />
            </span>
          </p>
          <p class="mid">{{ detaildata.storeInfo.store_name }}</p>
          <p class="bottom">
            <span>原价{{ detaildata.storeInfo.ot_price }} </span>
            <span>库存{{ detaildata.storeInfo.stock }}</span>
            <span
              >销量{{ detaildata.storeInfo.fsales
              }}{{ detaildata.storeInfo.unit_name }}</span
            >
          </p>
        </div>
        <Detailtitle>
          <template #you>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4MzY0MDk5ZC0yYTkzLTliNDEtOGRmYy1jOGJmMzFlMzdmNzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0RDRjkwRTdEODI5MTFFOTkwMjJEM0NGMjU2NjJCMDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0RDRjkwRTZEODI5MTFFOTkwMjJEM0NGMjU2NjJCMDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZGUzODVhZDQtYzhjNS00M2UxLTlkNWEtMTFmOGY5MGNlZWJkIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjgzNjQwOTlkLTJhOTMtOWI0MS04ZGZjLWM4YmYzMWUzN2Y3MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmrrFTIAAAGpSURBVHjazNe9T4NAFADw947WcqXgRw1KqtbJxcXFpZN/gyaNU/+4Ti4k/glOHZyMg3H0q2mThqhtU+wHnKBEaWzluGLwEkIgufsBx733DkCwdUu5jH+I9kdR1DsVg0tLaw4nfw6HUCm45YjguCAKojgmgArhmBAaG8cE0Vg4Joxy40QUxRWZoqHqc7r7fYq/rXMihK5RinvFOurKOW4UDBGcxEbX8xT39ToQrHgTVYZVanoPEhsnsVBdoXhgfKLff0kZNNlELRcLJ9yoUaB4uFUHKYSGcWXJxHyWGydcaEmlpLI9Gw3jcsaEJYkLJ9GoRsnRroeSCscyKkOWmN5UROIEUmokWORWsOh/NNbs2u7FXQ0ct8Ex3j2M3RNwWSsqsHy8cTTes93GY80b8HIuyeAW3ibHMHJaPNHs61NH4q2+za7bPn41C2W9YZUNxm3eEDo1x5H4w2uP3XROp3Affbar0B9ZceI2CoXMzYKKO8tnMHRk96lbBWtgxU0WKJwkdEUFxiTWGbyIZKjU0uL/LARSLX1SLfZSLW9TLeiT3MIIt0U3be8CDADFKvt2TKvKzAAAAABJRU5ErkJggg=="
            />
            <p>优品推荐</p>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4MzY0MDk5ZC0yYTkzLTliNDEtOGRmYy1jOGJmMzFlMzdmNzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0RDRjkwRTdEODI5MTFFOTkwMjJEM0NGMjU2NjJCMDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0RDRjkwRTZEODI5MTFFOTkwMjJEM0NGMjU2NjJCMDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZGUzODVhZDQtYzhjNS00M2UxLTlkNWEtMTFmOGY5MGNlZWJkIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjgzNjQwOTlkLTJhOTMtOWI0MS04ZGZjLWM4YmYzMWUzN2Y3MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmrrFTIAAAGpSURBVHjazNe9T4NAFADw947WcqXgRw1KqtbJxcXFpZN/gyaNU/+4Ti4k/glOHZyMg3H0q2mThqhtU+wHnKBEaWzluGLwEkIgufsBx733DkCwdUu5jH+I9kdR1DsVg0tLaw4nfw6HUCm45YjguCAKojgmgArhmBAaG8cE0Vg4Joxy40QUxRWZoqHqc7r7fYq/rXMihK5RinvFOurKOW4UDBGcxEbX8xT39ToQrHgTVYZVanoPEhsnsVBdoXhgfKLff0kZNNlELRcLJ9yoUaB4uFUHKYSGcWXJxHyWGydcaEmlpLI9Gw3jcsaEJYkLJ9GoRsnRroeSCscyKkOWmN5UROIEUmokWORWsOh/NNbs2u7FXQ0ct8Ex3j2M3RNwWSsqsHy8cTTes93GY80b8HIuyeAW3ibHMHJaPNHs61NH4q2+za7bPn41C2W9YZUNxm3eEDo1x5H4w2uP3XROp3Affbar0B9ZceI2CoXMzYKKO8tnMHRk96lbBWtgxU0WKJwkdEUFxiTWGbyIZKjU0uL/LARSLX1SLfZSLW9TLeiT3MIIt0U3be8CDADFKvt2TKvKzAAAAABJRU5ErkJggg=="
            />
          </template>
        </Detailtitle>
        <Swipeitem>
          <van-swipe-item
            v-for="(n, index) in Math.ceil(detaildata.good_list.length / 6)"
            :key="index"
            class="wrap"
          >
            <div
              class="fl_items"
              v-for="fi in detaildata.good_list.slice((n - 1) * 6, n * 6)"
              :key="fi.id"
              @click="gooddetail(fi.id)"
            >
              <van-image
                :src="fi.image"
                width="100%"
                height="6rem"
                fit="contain"
              />
              <p class="fl_name">{{ fi.store_name }}</p>
              <p class="fl_price">¥{{ fi.price }}</p>
            </div>
          </van-swipe-item>
        </Swipeitem>
        <Detailtitle>
          <template #pt>
            <p>产品介绍</p>
          </template>
        </Detailtitle>
        <div class="d_description" v-html="detaildata.storeInfo.description">
          <!-- {{detaildata.storeInfo.description}} -->
        </div>
      </div>
      <van-goods-action>
        <van-goods-action-icon icon="like-o" text="已收藏" color="#ff5000" />
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          :badge="cartcount"
          @click="gotocart"
        />
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          @click="(show = true), (buy = false)"
        />
        <van-goods-action-button
          type="danger"
          text="立即购买"
          @click="(show = true), (buy = true)"
        />
      </van-goods-action>
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
                currentgoods.image
                  ? currentgoods.image
                  : detaildata.storeInfo.image
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
    </div>
  </div>
</template>
<style lang="less">
.topswipe {
  .van-image {
    height: 20rem;
  }
  .custom-indicator {
    position: absolute;
    right: 0.6rem;
    bottom: 0.6rem;
    padding: 5px 5px;
    font-size: 1rem;
    background: rgba(0, 0, 0, 0.2);
  }
}
.d_top_content {
  padding: 1rem;
  text-align: left;
  p {
    margin-bottom: 0.5rem !important;
  }
  .price {
    span {
      &:first-of-type {
        color: #fc4141;
        font-size: 1.6rem;
        font-weight: bold;
        > span {
          font-size: 1rem;
        }
      }
      &:nth-of-type(2) {
        font-size: 0.9rem;
        margin-left: 1rem;
        position: relative;
        .van-icon {
          font-size: 2em;
          //   vertical-align: middle;
          position: absolute;
        }
      }
    }
  }
  .mid {
    font-weight: bold;
    font-size: 1rem;
  }
  .bottom {
    font-size: 0.8rem;
    color: #aaa;
    display: flex;
    justify-content: space-between;
  }
}
.d_description {
  overflow: hidden;
  text-align: left;
  background-color: #eee;
}
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
import Loading from "../components/Loading";
import Detailtitle from "../components/Detailtitle";
import Swipeitem from "../components/Swipeitem";
import { Toast } from "vant";
export default {
  data() {
    return {
      id: null,
      current: 0,
      detaildata: [],
      cartcount: 0,
      show: false,
      sku: [],
      currentgoods: null,
      cart_value: 1,
      buy: false,
    };
  },
  components: {
    Loading,
    Detailtitle,
    Swipeitem,
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    gotocart() {
      this.$router.push("/cart");
    },
    cartcounts() {
      let token = localStorage.getExpire("token");
      this.axios({
        method: "get",
        url: "/cart/count?numType=0",
        headers: {
          "Authori-zation": "Bearer " + token,
        },
      }).then((data) => {
        if (data.data.status == 410000) {
          this.cartcount = "";
        } else {
          this.cartcount = data.data.data.count;
        }
        // console.log(data);
      });
    },
    gooddetail(id) {
      // console.log(id);
      this.$router.push({
        path: `/detail/${id}`,
        params: { id: id },
      });
    },
    add_cart() {
      let token = localStorage.getExpire("token");
      this.axios({
        method: "post",
        url: "/cart/add",
        data: {
          cartNum: this.cart_value,
          new: 0,
          productId: this.id,
          uniqueId: this.currentgoods.unique,
        },
        headers: {
          "Authori-zation": "Bearer " + token,
        },
      }).then((data) => {
        if (data.data.status == 410000) {
          // console.log(this.$route.fullPath);
          this.$router.push({
            path: "/login",
            query: { fullPath: this.$route.fullPath },
          });
        } else if (data.data.status == 400) {
          Toast.fail("库存不足");
        } else {
          Toast.success("加入购物车成功");
          this.cartcounts();
          this.show = false;
        }
      });
    },
    buynow() {
      // console.log("buynow");
      let token = localStorage.getExpire("token");
      this.axios({
        method: "post",
        url: "/cart/add",
        data: {
          cartNum: this.cart_value,
          new: 1,
          productId: this.id,
          uniqueId: this.currentgoods.unique,
        },
        headers: {
          "Authori-zation": "Bearer " + token,
        },
      }).then((data) => {
        console.log(data);
        if (data.data.status == 410000) {
          Toast(data.data.msg);
          this.$router.push({
            path: "/login",
            query: { fullPath: this.$route.fullPath },
          });
        } else {
          this.$router.push({
            path: `/buy/${data.data.data.cartId}`,
          });
        }
      });
    },
  },
  watch: {
    sku(n) {
      if (this.detaildata.productValue) {
        this.cart_value = 1;
        this.currentgoods = this.detaildata.productValue[n.join()];
        // console.log(this.detaildata.productValue[n.join()]);
      }
    },
    cart_value() {
      if (this.cart_value <= 0) {
        Toast("数量不可小于1");
        this.cart_value = 1;
      } else if (this.cart_value > this.currentgoods.stock) {
        Toast("超出库存");
        this.cart_value = this.currentgoods.stock;
      }
    },
    // $route() {
    //   this.$router.go(0);
    // },
  },
  created() {
    this.id = this.$route.params.id;
    this.sku = [];
    this.detaildata = "";
    this.currentgoods = "";
    this.axios.get(`/product/detail/${this.id}`).then((data) => {
      //   console.log(data);
      this.detaildata = data.data.data;
      //   console.log(this.detaildata);
      for (let i = 0; i < data.data.data.productAttr.length; i++) {
        this.sku.push(data.data.data.productAttr[i].attr_values[0]);
      }
    });
    this.cartcounts();
  },
  beforeRouteUpdate(to, from, next) {
    this.id = to.params.id;
    this.sku = [];
    this.detaildata = "";
    this.currentgoods = "";
    this.axios.get(`/product/detail/${this.id}`).then((data) => {
      this.detaildata = data.data.data;
      for (let i = 0; i < data.data.data.productAttr.length; i++) {
        this.sku.push(data.data.data.productAttr[i].attr_values[0]);
      }
    });
    next();
  },
};
</script>