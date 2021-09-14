<template>
  <div>
    <!-- <van-loading color="#0094ff" v-if="homedata == ''"> </van-loading> -->
    <Loading v-if="homedata == ''"> 加载中</Loading>
    <div class="home" v-if="homedata != ''">
      <!-- 顶部搜索 -->
      <div class="top">
        <van-image
          class="logo"
          :src="homedata.logoUrl"
          fit="contain"
          width="20%"
        />
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          class="search"
          shape="round"
          @click="$router.push('/search')"
        />
      </div>
      <!-- 轮播图 -->
      <van-swipe indicator-color="white" :autoplay="3000">
        <van-swipe-item v-for="(b, index) in homedata.banner" :key="index">
          <van-image :src="b.pic" />
        </van-swipe-item>
        <!-- <template #indicator>
        <div class="custom-indicator" >
          <i v-for="(b,index) in banner" :key="index"></i>
        </div>
      </template> -->
      </van-swipe>
      <!-- 宫格 -->
      <!-- <van-grid :column-num="4" square :border="false" icon-size="3rem">
        <van-grid-item
          v-for="m in homedata.menus"
          :key="m.id"
          :icon="m.pic"
          :text="m.name"
          :url="m.wap_url"
        />
      </van-grid> -->
      <!-- 新闻通知 -->
      <div class="news">
        <van-notice-bar
          :scrollable="false"
          mode="link"
          color="#666"
          background="white"
          class="noticebar"
        >
          <img
            slot="left-icon"
            class="left_icon"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAAcCAYAAACj6tvkAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphNmVhODdiZC0zYWY5LTEzNDYtYjYyYy1hZGE1MDVmMDUxMTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzVEMDQxOUYxRjhDMTFFOUIwQkJCMEMyMkY3MzdBQUQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzVEMDQxOUUxRjhDMTFFOUIwQkJCMEMyMkY3MzdBQUQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODk2ZWFjMGYtNDI3MC0yZDRlLThiYTItYjE4OTA2YzRiOWVlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MDg3NDQyZTItM2M1ZC1iNDRkLTljYmUt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"
          />
          <van-swipe
            vertical
            class="notice-swipe"
            :autoplay="3000"
            :show-indicators="false"
          >
            <van-swipe-item v-for="r in homedata.roll" :key="r.id">{{
              r.info
            }}</van-swipe-item>
          </van-swipe>
        </van-notice-bar>
      </div>
      <!-- 快速选择 -->
      <div class="fastchose">
        <Titlebar>
          <template #title>
            <p>快速选择</p>
          </template>
          <template #content>
            <p>{{ homedata.info.fastInfo }}</p>
          </template>
        </Titlebar>
        <Swipeitem>
          <van-swipe-item
            v-for="(n, index) in Math.ceil(homedata.info.fastList.length / 3)"
            :key="index"
            class="wrap"
          >
            <div
              class="items"
              v-for="fi in homedata.info.fastList.slice((n - 1) * 3, n * 3)"
              :key="fi.id"
              @click="
                $router.push({
                  path: '/fastchose',
                  query: { id: fi.id, title: fi.cate_name },
                })
              "
            >
              <img :src="fi.pic" />
              <p>{{ fi.cate_name }}</p>
            </div>
          </van-swipe-item>
        </Swipeitem>
      </div>
      <!-- 精品推荐 -->
      <div class="bastbanner">
        <Titlebar>
          <template #title>
            <p>精品推荐</p>
          </template>
          <template #content>
            <p>{{ homedata.info.bastInfo }}</p>
          </template>
        </Titlebar>
        <van-swipe indicator-color="white" :autoplay="3000" class="bastswipe">
          <van-swipe-item
            v-for="(b, index) in homedata.info.bastBanner"
            :key="index"
          >
            <van-image :src="b.img" width="100%" height="100%" fit="cover " />
          </van-swipe-item>
        </van-swipe>
        <van-card
          v-for="(item, index) in homedata.info.bastList"
          :key="index"
          class="baselis"
          @click="gooddetail(item.id)"
        >
          <template #thumb>
            <van-image
              :src="item.image"
              fit="contain"
              width="100%"
              height="100%"
            />
          </template>
          <template #title>
            <div class="baselis_title">
              {{ item.store_name }}
            </div>
          </template>
          <!-- origin-price	自定义商品原价 -->
          <template #price>
            <div class="price">￥{{ item.price }}</div>
          </template>
          <template #bottom>
            <div class="vip">
              <p>￥{{ item.vip_price }}</p>
              <van-icon
                name="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAVCAYAAAA5BNxZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphNmVhODdiZC0zYWY5LTEzNDYtYjYyYy1hZGE1MDVmMDUxMTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MURGMzA2REQyMDNEMTFFOTkxOUVDOTNCMjU4MDcwQjQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MURGMzA2REMyMDNEMTFFOTkxOUVDOTNCMjU4MDcwQjQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODk2ZWFjMGYtNDI3MC0yZDRlLThiYTItYjE4OTA2YzRiOWVlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MDg3NDQyZTItM2M1ZC1iNDRkLTljYmUt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"
              ></van-icon>
              <p>已售{{ item.sales }}</p>
              <van-button
                icon="shopping-cart-o"
                size="small "
                plain
                round
                class="add_cart"
                color="#ff3700"
                @click.stop="showcart(item.id)"
              >
              </van-button>
            </div>
          </template>
        </van-card>
      </div>
      <!-- 热门榜单 -->
      <div class="hit">
        <div class="hitbg">
          <div class="hittitle">
            <p>
              <span :style="{ fontWeight: 'bold', fontSize: '.96rem' }"
                >热门榜单</span
              >根据销量、搜索、好评等综合得出
            </p>
            <span class="more">更多<van-icon name="arrow" /></span>
          </div>
        </div>
        <div class="hitgoods">
          <van-grid :border="false">
            <van-grid-item
              v-for="(like, index) in homedata.likeInfo"
              :key="index"
              class="griditem"
              @click="gooddetail(like.id)"
            >
              <template #text>
                <van-image :src="like.image" fit="contain" />
                <p>{{ like.store_name }}</p>
                <p>¥{{ like.price }}</p>
              </template>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
      <!-- 首发单凭 -->
      <div class="latest">
        <Titlebar>
          <template #title>
            <p>首发新品<span>NEW~</span></p>
          </template>
          <template #content>
            <p>{{ homedata.info.firstInfo }}</p>
          </template>
        </Titlebar>
        <Swipeitem>
          <van-swipe-item
            v-for="(n, index) in Math.ceil(homedata.info.firstList.length / 3)"
            :key="index"
            class="wrap"
          >
            <div
              class="fl_items"
              v-for="fl in homedata.info.firstList.slice((n - 1) * 3, n * 3)"
              :key="fl.id"
              @click="gooddetail(fl.id)"
            >
              <van-image
                :src="fl.image"
                fit="contain"
                width="100%"
                height="6rem"
              />
              <p class="fl_name">{{ fl.store_name }}</p>
              <p class="fl_price">¥{{ fl.price }}</p>
            </div>
          </van-swipe-item>
        </Swipeitem>
      </div>
      <!-- 促销单品 -->
      <div class="firstlist">
        <Titlebar>
          <template #title>
            <p>促销单品</p>
          </template>
          <template #content>
            <p>{{ homedata.info.salesInfo }}</p>
          </template>
        </Titlebar>
        <van-card
          v-for="(f, index) in homedata.benefit"
          :key="index"
          :thumb="f.image"
          class="firstgoods"
          @click="gooddetail(f.id)"
        >
          <template #thumb>
            <van-image
              :src="f.image"
              fit="contain"
              width="100%"
              height="100%"
            />
          </template>
          <template #title>
            <div class="f_title">
              {{ f.store_name }}
            </div>
          </template>
          <template #bottom>
            <p class="f_price">促销价:¥{{ f.price }}</p>
            <p class="f_out">
              <span>日常价:¥{{ f.ot_price }}</span>
              <span>仅剩:{{ f.stock }}{{ f.unit_name }}</span>
            </p>
          </template>
        </van-card>
      </div>
    </div>
  </div>
</template>
<script>
import Titlebar from "../components/Titlebar";
import Swipeitem from "../components/Swipeitem";
import Loading from "../components/Loading";
export default {
  name: "Home",
  components: {
    Titlebar,
    Swipeitem,
    Loading,
  },
  data() {
    return {
      // curindex:0,
      homedata: [],
      value: "",
    };
  },
  methods: {
    // play(index){
    //   this.curindex = index +1
    //   // console.log(index);
    // }
    gooddetail(id) {
      // console.log(id);
      this.$router.push({
        path: `/detail/${id}`,
      });
    },
    showcart() {
      console.log(2);
    },
    getdata() {
      this.axios.get("/index").then((data) => {
        this.homedata = data.data.data;
        // console.log(Math.ceil(this.homedata.info.fastList.length/3));
      });
    },
  },
  // beforeRouteEnter(to, from, next) {
  // next((vm) => {
  // vm.getdata();
  // console.log(vm);
  // });
  // },
  created() {
    this.getdata();
  },
};
</script>
<style lang="less" scoped>
.home{
  margin-bottom: 3.8rem;
}
.top {
  display: flex;
  .logo {
    padding: 10px;
    box-sizing: border-box;
  }
  .search {
    flex: 1;
    box-sizing: border-box;
  }
}
.fastchose{
  background-color: #fff;
}
.van-grid-item__text {
  font-size: 1rem;
}
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
.van-notice-bar {
  font-size: 12px;
  border-top: 1px solid #f4f4f4;
  box-shadow: 0 0.1rem 0.3rem #f5f5f5;
  .left_icon {
    width: 20%;
    font-size: 20px;
    padding-right: 10px;
  }
}

.bastbanner {
  background-color: #fff;
  .titlebar {
    border-top: 1px solid #ccc;
  }
  .bastswipe {
    margin: 1rem;
    height: 8rem;
  }
  .baselis {
    margin: 0;
    background-color: #fff;
    text-align: left;

    .baselis_title {
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 1rem;
    }
    .price {
      color: #f00;
      font-size: 1rem;
    }
    .vip {
      display: flex;
      align-items: center;
      position: relative;
      padding-bottom: 0.2rem;
      // border-bottom: 1px solid #ccc;
      p {
        font-weight: bold;
        font-size: 0.8rem;
        margin: 0;
        &:nth-of-type(2) {
          font-weight: normal;
          color: #888;
        }
      }
      .add_cart {
        position: absolute;
        right: 0;
        // top:-1rem;
        padding: 2px 2px;
        .van-icon {
          width: 15%;
        }
      }
      .van-icon {
        margin-right: 0.8rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
.hit {
  .hitbg {
    padding: 0 1rem;
    margin-top: 1rem;
    box-sizing: border-box;
    width: 100%;
    height: 8rem;
    background-image: url("../assets/index-bg.7128c2eb.png");
    background-size: cover;
    background-repeat: no-repeat;
    .hittitle {
      height: 2.8rem;
      color: white;
      display: flex;
      align-items: center;
      font-size: 0.8rem;
      justify-content: space-between;
    }
  }
  .hitgoods {
    margin: 0 1rem;
    margin-top: -5rem;
    border-radius: 0.8rem;
    overflow: hidden;
    .griditem {
      flex: 1;
      min-width: 0;
      height: 13rem;
      .van-image {
        width: 100%;
        height: 100%;
      }
      p {
        color: red;
        font-weight: bold;
        font-size: 0.9rem;
        margin-top: 0.5rem !important;
      }
      p:nth-of-type(1) {
        width: 100%;
        height: 2rem;
        color: black;
        overflow: hidden;
        word-break: keep-all;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 0.9rem;
      }
    }
    box-shadow: 0 0 0.2rem -0.1rem #aaa;
  }
}
.firstgoods {
  background-color: #fff;
  margin: 0;

  .f_title {
    width: 100%;
    overflow: hidden;
    word-break: keep-all;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 1rem;
  }
  .van-card__bottom {
    text-align: left;
    display: flex;
    flex-direction: column;
    .f_price {
      width: 50%;
      padding: 0 0.2rem;
      word-break: keep-all;
      white-space: nowrap;
      text-align: center;
      box-sizing: border-box;
      // display: inline;
      background-image: linear-gradient(90deg, #ff6248 0, #ff3e1e);
      color: white;
      border-radius: 1rem 0rem 1rem 0rem;
    }
    .f_out {
      padding-top: 0.5rem;
      color: #999;
      span:first-of-type {
        text-decoration: line-through;
      }
      span:nth-of-type(2) {
        float: right;
      }
    }
  }
}
</style>
