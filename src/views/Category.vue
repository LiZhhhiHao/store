<template>
  <div class="category">
    <van-search v-model="value" placeholder="请输入搜索关键词" />
    <van-tree-select
      height="100%"
      :items="items"
      :main-active-index.sync="active"
    >
      <template #content v-if="items != ''">
        <!-- {{active}} -->
        <van-divider
          :style="{
            color: '#000',
            borderColor: '#aaa',
            padding: '0 16px',
            fontWeight: 'bold',
          }"
        >
          {{ items[active].text }}
        </van-divider>
        <van-grid class="ca_content" :column-num="3" icon-size="4rem">
          <van-grid-item
            :icon="c.pic"
            v-for="(c, index) in items[active].children"
            :key="index"
            :text="c.text"
            @click="
              $router.push({
                path: '/fastchose',
                query: { id:c.id}
              })
            "
          >
            <!-- <van-image :src="c.pic" /> -->
          </van-grid-item>
        </van-grid>
      </template>
    </van-tree-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      items: [],
      value: "",
    };
  },
  created() {
    this.axios.get("/category").then((data) => {
      //   console.log(data.data.data)
      for (let i = 0; i < data.data.data.length; i++) {
        this.items.push({
          text: data.data.data[i].cate_name,
          children: [],
        });
        for (let j = 0; j < data.data.data[i].children.length; j++) {
          this.items[i].children.push({
            text: data.data.data[i].children[j].cate_name,
            pic: data.data.data[i].children[j].pic,
            id:data.data.data[i].children[j].id
          });
        }
      }
    });
    // console.log(this.items);
  },
};
</script>