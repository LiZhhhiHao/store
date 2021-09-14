<template>
  <div class="login">
    <div class="login_con">
      <van-tabs v-model="active" swipeable animated>
        <van-tab title="密码登录">
          <van-form @submit="onSubmit" validate-trigger="onSubmit">
            <van-field
              v-model="username"
              name="account"
              label="手机号"
              placeholder="输入手机号"
              :rules="[
                {
                  required: true,
                  pattern: /^1[34578]\d{9}$/,
                  message: '请填写正确手机号',
                },
              ]"
            />
            <van-field
              v-model="password"
              type="password"
              name="password"
              label="密码"
              placeholder="填写登录密码"
            />
            <div style="margin: 16px">
              <van-button round block type="warning" native-type="submit"
                >登录</van-button
              >
            </div>
          </van-form>
        </van-tab>
        <van-tab title="快速注册">
          <van-form>
            <van-field
              v-model="phone"
              name="phone"
              label="手机号"
              placeholder="手机号"
            />
            <van-field
              v-model="sms"
              name="sms"
              center
              clearable
              label="短信验证码"
              placeholder="请输入短信验证码"
            >
              <template #button>
                <van-button
                  size="small"
                  type="info"
                  ref="smsCode"
                  @click.stop="sendsms"
                  :disabled="issend"
                  round
                >
                  <span v-if="!issend">{{ sms_text }} </span>
                  <van-count-down
                    :time="time"
                    format="重新发送(ss)"
                    v-if="issend"
                    @finish="finish"
                  />
                </van-button>
              </template>
            </van-field>
            <van-field
              v-model="sign_password"
              type="password"
              name="sign_password"
              label="密码"
              placeholder="填写登录密码"
            />
            <div style="margin: 16px">
              <van-button
                round
                block
                type="warning"
                native-type="submit"
                @click="sign"
                >注册</van-button
              >
            </div>
          </van-form>
        </van-tab>
      </van-tabs>
    </div>
    <div class="bottom"></div>
  </div>
</template>
<style lang="less">
.login {
  height: 100vh;
  width: 100%;
  background-image: linear-gradient(180deg, #eb5447 0, #ff8e3b);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .login_con {
    width: 80%;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 5%;
    overflow: hidden;
    .van-cell {
      font-size: 0.9rem;
    }
  }
  .bottom {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAApQAAAAkCAYAAAA3mqpgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozZDUwNjlmMy05NjI1LTRhZTItYjMwNC0yZDQ0ZTM3ZDFjNjgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REE5RjQyRjk3NzgzMTFFOTg0Q0Q5ODE4RDgwOTI2MTQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REE5RjQyRjg3NzgzMTFFOTg0Q0Q5ODE4RDgwOTI2MTQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowYjA0NzcxMC1kNmFhLTQzOTMtYWFhMC1jNjkxMWYyZDVmZWIiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoxMTViODdmNi0yNWY5LTE2NGQtYjUzOC02YzViOTc2NzVjOTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7UM78mAAADQ0lEQVR42uzdvYtUVxgH4DPDEGxsLAKmtFAECwvL/AFqYWmpgrWdWATsLEUwXVJtRLQNKeJnJXZuYSGoWRRR/EBhtwisG1n2eg5zLW2y98752OeB16l27p6PhZ8z95530nVdGFL3+K+l+HIoLNrml4Mhh67bFQCAuk0mG1muO/vhaYarPpkcPnFmyDecDhwm08uKXQkAUKyVPrOVGSh7j6wTAECxBs9qYwTKh7E+WysAgOJs9Fmt+EC5Huuu9QIAKM6dPqsVHyiTpVib1gwAoBgpm/0xxhuPFSjfxLph3QAAipGy2euaAmXyW/DENwBACVIm+32sNx8zUP4X60KsNWsIAJDNWp/JRjtrczryANJX3+dirVpLAICFW+2z2JsxLzJdwECexTobfP0NALBIK30Gezb2haYLGlBKxadjXQue/gYAGNNmn7lOh5E/mfxmtsDBfYn1a6w/Y52KdTSWPtgAAMNIz6/cDvOjgV4v8sKzDINNA7wU60qsn2MdiXUg1k+xdm/jd+piTewlAKAS3TZ+Nn0K+W+sd7Gex1oO8w446zkGMss4id866gzTVefTq7/jvz9mGMdBfw8AUL2nGa75Mezdf7yFyRs0UE4On8gT729dTi8vMwVKAID/40V4/0+YHDtf/UCmDS3KI/sSAKjIcisDaSlQ3ou1ZW8CABXY6rOLQFmYdFPqffsTAKjA/T67CJQFSscSrdujAEDB1vvM0ozWAuWHMD+SqLNXAYACdX1W+SBQli0dQ5TOuHQ/JQBQWpi8GoY6MlGgHN3NWOkZfF9/AwAlSJnkYqzrLQ5u2vDCPYh1sv9fgE8rAYActvoskjLJ7VYHOWt8EdP9Cb+E+Y2vqXd4avO4L9aeAceu5SMA1G3IZy9SS8TVMG+4ks6ZTEcDvW19Amc7ZKOkYLnU19BytXwEAIbxMdZx07DDA2WulkVaPgJAE17kzBMtmJqCbdPyEQDqtmwKBMrctHwEgHo11QJRoKyXlo8AUK+mWiAKlHXT8hEA6tNcC0SBsm5aPgJAXZpsgShQ1k/LRwCoJ0w22QJRoGyDlo8AULamWyAKlO3Q8hEAyrMjWiDmMjMFo1hEy0cA4Pt2ZAvEXL4KMADOrbHLPVnkIAAAAABJRU5ErkJggg==);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 80%;
    height: 5vw;
    margin: 0 auto;
  }
}
.van-count-down {
  font-size: 0.5rem;
  color: #eee;
}
</style>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      username: "",
      password: "",
      active: 0,
      phone: "",
      sms: "",
      sign_password: "",
      key: "",
      pwdRules: [
        {
          required: true,
          message: "请填写密码",
        },
        // {
        // 注册时的验证
        //   validator: value => {
        //     return /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/.test(value);
        //   },
        //   message: "请输入至少6位至20位含数字,字母(可含字符)的密码",
        //    trigger: 'onSubmit'
        // },
        {
          validator: (value) => {
            return /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/.test(
              value
            );
          },
          message: "请输入至少6位至20位含数字,字母(可含字符)的密码",
          trigger: "onSubmit",
        },
      ],
      time: 60000,
      issend: false,
      sms_text: "发送验证码",
    };
  },
  methods: {
    onSubmit(values) {
      // console.log(values);
      this.axios
        .post("/login", values)
        .then((data) => {
          if (data.data.status == 400) {
            Toast.fail(data.data.msg);
          }
          if (data.data.status == 200) {
            Toast.success(data.data.msg);
            //  console.log(data.data.data);
            let timeout = new Date(data.data.data.expires_time);

            // localStorage.setItem("state", true);
            localStorage.setItem(
              "token",
              JSON.stringify({
                token: data.data.data.token,
                timeout: timeout.getTime(timeout),
              })
            );
            this.$router.push(this.$route.query.fullPath);
          }
          //   console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sendsms() {
      if (this.phone == "") {
        Toast.fail("请输入手机号");
      } else if (!/^1[34578]\d{9}$/.test(this.phone)) {
        Toast.fail("请输入正确的手机号格式");
      } else {
        this.axios({
          method: "post",
          url: "/register/verify",
          data: {
            code: "",
            key: this.key,
            phone: this.phone,
            type: "register",
          },
        })
          .then((data) => {
            // console.log(data);
            if (data.data.status == 200) {
              Toast.success(data.data.msg);
              this.issend = true;
              this.time = 60000;
            } else if (data.data.status == 400) {
              Toast.fail(data.data.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    sign() {
      // for (const key in values) {
      //   console.log(values[key]);
      //   if(values[key]==''){
      //     Toast(`请输入${key}`)
      //   }
      // }
      // this.phone != ""
      //   ? this.sms != ""
      //     ? this.sign_password != ""
      //       ? Toast.success("ok")
      //       : Toast.fail("请输入密码")
      //     : Toast.fail("请输入验证码")
      //   : Toast.fail("请输入手机号");
      if (this.phone != "") {
        if (/^1[34578]\d{9}$/.test(this.phone)) {
          if (this.sms != "") {
            if (this.sign_password != "") {
              if (
                /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/.test(
                  this.sign_password
                )
              ) {
                this.axios({
                  method: "post",
                  url: "/register",
                  data: {
                    account: this.phone,
                    captcha: this.sms,
                    password: this.sign_password,
                  },
                }).then((data) => {
                  if (data.status == 200) {
                    Toast.success(data.data.msg);
                    this.active=0;
                    this.username = this.phone;
                  } else {
                    Toast.fail(data.data.msg);
                  }
                });
              } else {
                Toast.fail(" 请输入至少6位至20位含数字,字母(可含字符)的密码");
              }
            } else {
              Toast.fail("请输入密码");
            }
          } else {
            Toast.fail("请输入验证码");
          }
        } else {
          Toast.fail("请输入正确的手机号格式");
        }
      } else {
        Toast.fail("请输入手机号");
      }
    },
    finish() {
      this.issend = false;
      this.sms_text = "重新发送";
    },
  },
  created() {
    console.log(this.$route.query.fullPath);
    this.axios.get("/verify_code").then((data) => {
      this.key = data.data.data.key;
      // console.log(this.key);
    });
  },
};
</script>