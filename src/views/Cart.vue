<template>
  <div class="cart">
    <div class="cart_control">
      <p>
        购买数量:<span>{{ goodscount }}</span>
      </p>
      <van-button
        plain
        color="#000"
        size="small"
        :text="control_flag ? '取消' : '管理'"
        @click="changemode"
      ></van-button>
    </div>
    <van-checkbox-group v-model="result" ref="checkboxGroup">
      <van-swipe-cell
        v-for="(v, index) in valid"
        :key="index"
        :before-close="beforeClose"
        :name="v.id"
      >
        <div class="valid">
          <van-checkbox :name="v" ref="checkboxes" @click="vcheck(v)" />
          <van-card
            :price="v.productInfo.price"
            :desc="'属性:' + v.productInfo.attrInfo.suk"
            :title="v.productInfo.store_name"
            class="goods-card"
            @click="gooddetail(v.product_id)"
          >
            <template #thumb>
              <van-image
                width="100%"
                height="100%"
                fit="contain"
                :src="v.productInfo.attrInfo.image"
              ></van-image>
            </template>
            <template #num>
              <van-button size="mini" @click="deductnum(v.id, v.cart_num, v)"
                >-</van-button
              >
              <input
                type="number"
                :value="v.cart_num"
                @input="changenum($event, v.id, v)"
              />
              <van-button size="mini" @click="addnum(v.id, v.cart_num, v)"
                >+</van-button
              >
            </template>
          </van-card>
        </div>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
    </van-checkbox-group>

    <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="Allchecked" @click="checkAll">全选</van-checkbox>
      <!-- <template #tip> -->
      <!-- 你的收货地址不支持同城送, -->
      <!-- <span @click="onClickEditAddress">修改地址</span> -->
      <!-- </template> -->
    </van-submit-bar>
  </div>
</template>
<style lang="less">
.cart {
  background-color: #eee;
}
.cart_control {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  p {
    font-size: 1rem;
    span {
      color: orange;
    }
  }
  .van-button {
    width: 3rem;
    font-size: 0.9rem;
  }
}
.van-swipe-cell {
  margin-bottom: 0.5rem;
}
.valid {
  background-color: #fff;
  display: flex;
  padding: 8px 16px;
  .van-checkbox {
    width: 10%;

    transition: all 0.2s linear;
  }
  .goods-card {
    transition: all 0.2s linear;
    width: 90%;
    margin: 0;
    background-color: white;
    text-align: left;
    padding: 0;
    .van-card__title {
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 1rem;
      max-height: none;
      line-height: none;
      display: block;
    }
    .van-card__desc {
      font-size: 0.9rem;
      margin-top: 0.9rem;
    }
    .van-card__num {
      display: flex;
      align-items: center;
      input {
        width: 1rem;
        height: 1rem;
        text-align: center;
        color: #000;
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
      }
    }
  }
}

.delete-button {
  height: 100%;
}
</style>
<script>
import { Dialog } from "vant";
import { Toast } from "vant";
export default {
  data() {
    return {
      valid: [],
      invalid: [],
      result: [],
      goodscount: "",
      control_flag: false,
      isMounted: false,
      Allchecked:false
    };
  },
  methods: {
    onSubmit(val) {
      console.log(val);
    },
    gooddetail(id) {
      // console.log(id);
      this.$router.push({
        path: `/detail/${id}`,
      });
    },
    // position 为关闭时点击的位置
    // instance 为对应的 SwipeCell 实例
    beforeClose({ position, instance, name }) {
      // this.valid
      switch (position) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          Dialog.confirm({
            message: "确定删除吗？",
          })
            .then(() => {
              let currentindex = this.valid.findIndex((currentValue) => {
                return currentValue.id == name;
              });
              this.valid.splice(currentindex, 1);
              let token = localStorage.getExpire("token");
              this.axios({
                method: "post",
                url: "/cart/del",
                data: {
                  ids: [name],
                },
                headers: {
                  "Authori-zation": "Bearer " + token,
                },
              });
              this.countall();
              instance.close();
            })
            .catch(() => {
              instance.close();
            });
          break;
      }
    },
    changemode() {
      this.control_flag = !this.control_flag;
    },
    // 封装Ajax请求num数据改变（未完成）
    getnum(id, num, v) {
      let token = localStorage.getExpire("token");
      this.axios({
        method: "post",
        url: "/cart/num",
        data: {
          id: id,
          number: ++num,
        },
        headers: {
          "Authori-zation": "Bearer " + token,
        },
      }).then((data) => {
        if (data.data.status == 400) {
          Toast(data.data.msg.slice(0, 4));
        } else if (data.data.status == 200) {
          v.cart_num++;
        }
      });
    },
    addnum(id, num, v) {
      let token = localStorage.getExpire("token");
      this.axios({
        method: "post",
        url: "/cart/num",
        data: {
          id: id,
          number: ++num,
        },
        headers: {
          "Authori-zation": "Bearer " + token,
        },
      }).then((data) => {
        if (data.data.status == 400) {
          Toast(data.data.msg.slice(0, 4));
        } else if (data.data.status == 200) {
          v.cart_num++;
        }
      });
    },
    deductnum(id, num, v) {
      let token = localStorage.getExpire("token");
      this.axios({
        method: "post",
        url: "/cart/num",
        data: {
          id: id,
          number: --num,
        },
        headers: {
          "Authori-zation": "Bearer " + token,
        },
      }).then((data) => {
        if (data.data.status == 400) {
          Toast("数量不可小于零或为零");
        } else if (data.data.status == 200) {
          v.cart_num--;
        }
      });
    },
    changenum(event, id, v) {
      let token = localStorage.getExpire("token");
      let val = event.currentTarget.value;
      this.axios({
        method: "post",
        url: "/cart/num",
        data: {
          id: id,
          number: event.currentTarget.value,
        },
        headers: {
          "Authori-zation": "Bearer " + token,
        },
      }).then((data) => {
        if (data.data.status == 400) {
          if (val > 0) {
            Toast(data.data.msg);
          } else {
            Toast("数量不可小于零");
          }
        } else if (data.data.status == 200) {
          if (val != null) {
            v.cart_num = val;
          }
        }
      });
    },
    vcheck() {
      console.log();
      //  console.log(this.result);
    },
    checkAll() {
      this.$refs.checkboxGroup.toggleAll(this.Allchecked);
    },
    countall() {
      let token = localStorage.getExpire("token");
      this.axios({
        method: "get",
        url: "/cart/count",
        headers: {
          "Authori-zation": "Bearer " + token,
        },
      }).then((data) => {
        if (data.data.status == 200) {
          this.goodscount = data.data.data.count;
        }
        // console.log(data);
      });
    },
    getlis() {
      let token = localStorage.getExpire("token");
      this.axios({
        method: "get",
        url: "/cart/list",
        headers: {
          "Authori-zation": "Bearer " + token,
        },
      }).then((data) => {
        // console.log(data);
        if(data.data.status == 400){
          Toast.fail("服务器异常");
        }else{
          this.valid = data.data.data.valid;
          this.invalid = data.data.data.invalid;
        }
        // console.log(this.valid);
      });
    },
  },
  computed: {
    // Allchecked:{
    // }
    // Allchecked: {
    //   get() {
    //      if (this.isMounted) {
    //        let flag=false;
    //        this.$refs.checkboxGroup.children.forEach(ele=>{
    //          console.log(ele.checked);
    //          if(flag == ele.checked){
    //            return false;
    //          }
    //        })
    //      }
    //            return false;
    //   },
    //   set(val){
    //     console.log(val);

    //   }
  
    // },
    total() {
      let sum = 0;
      this.result.forEach((element) => {
        // console.log(element);
        sum = element.truePrice * element.cart_num + sum;
      });
      // console.log(sum);
      return sum * 100;
    },
  },
  mounted() {
    this.isMounted = true;
  },
  created() {
    this.countall();
    this.getlis();
  },
};
</script>