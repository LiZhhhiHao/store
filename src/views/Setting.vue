<template>
  <div class="setting">
    <div class="set_top">
      <p>管理我的账号</p>
      <div class="set_topl">
        <van-image round :src="setdata.avatar" />
        <div class="set_toplc">
          <p>{{ setdata.nickname }}</p>
          <span>绑定手机号:{{ setdata.phone }}</span>
        </div>
      </div>
    </div>
    <div class="set_content">
      <ul>
        <li>
          <h3>昵称</h3>
          <span>{{ setdata.nickname }}</span>
        </li>
        <li>
          <h3>ID号</h3>
          <span>{{ setdata.uid }}</span>
        </li>
        <li>
          <h3>手机号码</h3>
          <span>{{ setdata.phone }}</span>
        </li>
        <li>
          <h3>密码</h3>
          <span
            >点击修改密码
            <van-icon name="arrow" />
          </span>
        </li>
      </ul>
    </div>
    <div class="set_bottom">
      <van-button round color="#e93323">保存修改</van-button>
      <van-button round plain color="#e93323" @click="quit"
        >退出登录</van-button
      >
    </div>
  </div>
</template>
<style lang="less">
.setting {
  text-align: left;
  .set_top {
    margin-bottom: 1rem;
    background-color: #fff;
    padding: 1rem;
    .set_topl {
      margin-top: 1rem;
      border-radius: 1rem;
      border: 1px solid #ccc;
      padding: 1rem;
      display: flex;
      align-items: center;
      .van-image {
        width: 5rem;
        height: 5rem;
      }
      .set_toplc {
        margin-left: 1rem;
        display: flex;
        flex-direction: column;
        span {
          margin-top: 0.5rem;
          color: #ccc;
          font-size: 0.8rem;
        }
      }
    }
  }
  .set_content {
    background-color: #fff;
    ul {
      padding: 0.5rem 1rem;
      h3 {
        font-weight: normal;
      }
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
  .set_bottom {
    display: flex;
    flex-direction: column;
    margin: 3rem 2rem 0;
    button {
      margin-bottom: 1rem;
      font-size: 4vw;
      letter-spacing: 2vw;
      text-indent: 2vw;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      setdata: [],
    };
  },
  methods: {
    quit() {
      localStorage.removeItem("token");
    location.reload();
    },
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
        this.setdata = data.data.data;
        // console.log(this.setdata);
      } else {
        console.log("系统出错");
      }
    });
  },
};
</script>