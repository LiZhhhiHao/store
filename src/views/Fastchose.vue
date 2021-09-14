<template>
  <div>
    <div class="f_top">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        shape="round"
        background="#e93323"
      >
      </van-search>
      <div class="change_type" @click="showtype = !showtype">
        <img v-show="showtype" src="../assets/tupian.svg" />
        <img v-show="!showtype" src="../assets/liebiao.svg" />
      </div>
    </div>
    <div class="f_way">
      <div class="price_order" @click="price_order">
        价格
        <van-icon name="arrow-up" v-if="price_o == 'asc'" />
        <van-icon name="arrow-down" v-if="price_o == 'desc'" />
      </div>
      <div class="sale_order" @click="sale_order">
        销量
        <van-icon name="arrow-up" v-if="sale_o == 'asc'" />
        <van-icon name="arrow-down" v-if="sale_o == 'desc'" />
      </div>
      <div
        class="new"
        @click="news"
        :style="isnew == 1 ? { color: 'red' } : ''"
      >
        新品
      </div>
    </div>

    <div class="f_content" v-if="fastchose_data != ''">
      <div
        :class="showtype ? 'card' : 'list'"
        v-for="(fasti, index) in fastchose_data"
        :key="index"
      >
        <div class="wrap" @click="gooddetail(fasti.id)">
          <van-image :src="fasti.image" fit="contain"></van-image>
          <div class="text">
            <p>{{ fasti.store_name }}</p>
            <p>
              ¥<span>{{ fasti.price }}</span>
            </p>
            <p>
              ¥{{ fasti.vip_price
              }}<img
                data-v-92c5d346=""
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAVCAYAAAA5BNxZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphNmVhODdiZC0zYWY5LTEzNDYtYjYyYy1hZGE1MDVmMDUxMTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MURGMzA2REQyMDNEMTFFOTkxOUVDOTNCMjU4MDcwQjQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MURGMzA2REMyMDNEMTFFOTkxOUVDOTNCMjU4MDcwQjQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODk2ZWFjMGYtNDI3MC0yZDRlLThiYTItYjE4OTA2YzRiOWVlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MDg3NDQyZTItM2M1ZC1iNDRkLTljYmUt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"
              />
              <span>已售{{ fasti.sales }}件</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <van-loading color="#0094ff" v-if="fastchose_data == '' &&!notfound">
      <slot></slot>
    </van-loading>
    
  </div>
</template>
<style lang="less">
.f_top {
  width: 100%;
  background-color: #e93323;
  display: flex;
  align-items: center;
  .van-search {
    flex: 1;
  }
  .change_type {
    width: 2rem;
    font-size: 1.2rem;
    margin-right: 0.5rem;
    img {
      vertical-align: middle;
      width: 100%;
    }
  }
}
.f_way {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 2rem;
  > div {
    flex: 1;
  }
}
.f_content {
  background-color: #eee;
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  > div.card {
    padding: 0.6rem;
    box-sizing: border-box;
    flex-basis: 50%;
    min-width: 0;
    .wrap {
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      .van-image {
        height: 12rem;
      }
      .text {
        padding: 0.5rem;
        box-sizing: border-box;
        p {
          margin: 0.3rem 0 !important;
        }
        p:first-of-type {
          width: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-size: 1rem;
        }
        p:nth-of-type(2) {
          color: red;
          font-size: 0.9rem;
          span {
            margin-left: 0.2rem;
            font-size: 1.2rem;
          }
        }
        p:nth-of-type(3) {
          font-size: 0.8rem;
          font-weight: bold;
          span {
            float: right;
            font-weight: normal;
            color: #666;
          }
          img {
            height: 0.8rem;
          }
        }
      }
    }
  }
  > div.list {
    padding: 0.6rem;
    box-sizing: border-box;
    width: 100%;
    .wrap {
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      display: flex;
      .van-image {
        height: 8rem;
        width: 30%;
      }
      .text {
        width: 70%;
        padding: 1rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p {
          margin: 0.3rem 0 !important;
        }
        p:first-of-type {
          min-width: 0;
          width: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-size: 1rem;
        }
        p:nth-of-type(2) {
          color: red;
          font-size: 0.9rem;
          span {
            margin-left: 0.2rem;
            font-size: 1.2rem;
          }
        }
        p:nth-of-type(3) {
          font-size: 0.8rem;
          font-weight: bold;
          span {
            float: right;
            font-weight: normal;
            color: #666;
          }
          img {
            height: 0.8rem;
          }
        }
      }
    }
  }
}
</style>
<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      type: null,
      fastchose_data: [],
      value: "",
      showtype: false,
      price_o: "",
      sale_o: "",
      isnew: 0,
      notfound:false,
    };
  },
  methods: {
    price_order() {
      this.fastchose_data = [];
      this.sale_o = "";
      this.price_o = this.price_o == "asc" ? "desc" : "asc";
      this.axios
        .get(
          `/products?page=1&limit=8&keyword=&sid=${this.type.id}&news=${this.isnew}&priceOrder=${this.price_o}&salesOrder=`
        )
        .then((data) => {
          if (data.data.status == 200) {
            this.fastchose_data = data.data.data;
          } else {
            console.log("系统错误");
          }
        });
    },
    sale_order() {
      this.fastchose_data = [];
      this.price_o = "";
      this.sale_o = this.sale_o == "asc" ? "desc" : "asc";
      this.axios
        .get(
          `/products?page=1&limit=8&keyword=&sid=${this.type.id}&news=${this.isnew}&priceOrder=&salesOrder=${this.sale_o}`
        )
        .then((data) => {
          if (data.data.status == 200) {
            this.fastchose_data = data.data.data;
          } else {
            console.log("系统错误");
          }
        });
    },
    news() {
      this.fastchose_data = [];
      this.isnew = this.isnew == 0 ? 1 : 0;
      this.axios
        .get(
          `/products?page=1&limit=8&keyword=&sid=${this.type.id}&news=${this.isnew}&priceOrder=${this.price_o}&salesOrder=${this.sale_o}`
        )
        .then((data) => {
          if (data.data.status == 200) {
            this.fastchose_data = data.data.data;
          } else {
            console.log("系统错误");
          }
        });
    },
    gooddetail(id) {
      // console.log(id);
      this.$router.push({
        path: `/detail/${id}`,
      });
    },
  },
  created() {
    this.type = this.$route.query;
    this.axios
      .get(
        `/products?page=1&limit=8&keyword=&sid=${this.type.id}&news=0&priceOrder=&salesOrder=`
      )
      .then((data) => {
        if (data.data.status == 200) {
          this.fastchose_data = data.data.data;
            if(data.data.data==''){
                this.notfound=true;
                Toast('搜索不到结果');
            }else{
                this.notfound=false;
            }
        } else {
          console.log("系统错误");
        }
      });
  },
  watch: {
    value(val) {
      this.fastchose_data = [];
      this.axios
        .get(
          `/products?page=1&limit=8&keyword=${val}&sid=${this.type.id}&news=${this.isnew}&priceOrder=${this.price_o}&salesOrder=${this.sale_o}`
        )
        .then((data) => {
          if (data.data.status == 200) {
            this.fastchose_data = data.data.data;
            if(data.data.data==''){
                this.notfound=true;
                Toast('搜索不到结果');
            }else{
                this.notfound=false;
            }
          } else {
            console.log("系统错误");
          }
        });
    },
  },
};
</script>