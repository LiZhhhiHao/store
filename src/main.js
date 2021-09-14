import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Cell, CellGroup, Swipe, SwipeItem, Image, Tabbar, TabbarItem, Search, Grid, GridItem, NoticeBar, Icon, Card, Tag, TreeSelect, Divider, Form, Field, Tab, Tabs, Toast, SubmitBar, Checkbox, CheckboxGroup, SwipeCell, Loading, Sku, GoodsAction, GoodsActionIcon, GoodsActionButton, Badge, ActionSheet, Sticky, CountDown, Popover  }  from 'vant'//按需引入vant组件
import 'vant/lib/index.css' //引入css

Vue.config.productionTip = false
Vue.use(Button)//注册组件
Vue.use(CellGroup).use(Cell).use(Swipe).use(SwipeItem).use(Image).use(Tabbar).use(TabbarItem).use(Search).use(Grid).use(GridItem).use(NoticeBar).use(Icon).use(Card).use(Tag).use(TreeSelect).use(Divider).use(Form).use(Field).use(Tab).use(Tabs).use(Toast).use(SubmitBar).use(Checkbox).use(CheckboxGroup).use(SwipeCell).use(Loading).use(Sku).use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton).use(Badge).use(ActionSheet).use(Sticky).use(CountDown).use(Popover );
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

// localStorage.setItem("adminToken", "token");
window.addEventListener('storage', function (e) {
  //这个e返回的是哪个值被更改，更改后的值跟更改之前的值
  console.log(e)
  if (localStorage.getItem("token")) {
    //这里是判断本地存储adminToken存在的时候写的逻辑
  } else {
    location.reload();
    //这里是判断本地存储adminToken不存在的时候写的逻辑，这里可以让他跳转到登陆页面
  }
})

Storage.prototype.getExpire = key => {
  let val = localStorage.getItem(key);
  if (!val) {
    return val;
  }
  val = JSON.parse(val);
  if (val.timeout - Date.now() <= 0) {
    localStorage.removeItem(key);
    return null;
  }
  return val.token;
}