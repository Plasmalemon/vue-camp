<template>
  <div>
    <!-- input事件处理，给input赋值 -->
    <!-- v-bind="$attrs", 凡是没有出现在props中的属性会被展开成键值对的形式{ "placeholder": "请输入用户名" } -->
    <input type="text" @input="onInput" :value="value" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  // https://cn.vuejs.org/v2/guide/components-props.html#%E9%9D%9E-Prop-%E7%9A%84-Attribute
  // 禁止根元素继承 非props的 attribute
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    }
  },
  methods: {
    onInput(e) {
      //   做转发input事件即可,复合单项数据流，老爹给我数据去显示，当数据发生变化时，不是我去修改数据，而是我把数据给老爹，老爹去修改
      this.$emit("input", e.target.value);

      //   通知
      //   父组件先渲染，子组件后渲染
      //   谁派发，谁监听, 设计原则，造成根源不明确
      //   创建顺序是从上向下，挂载顺序子下而上，孩子挂载老爹一定存在
      this.$parent.$emit("validate");
    }
  }
};
</script>

<style>
</style>


// form数据容器、数据提交、全局校验，其实在拥有ajax之后没必要使用form了，但是这里使用容器更多的是方便数据给每个子项去使用
// form-item校验、显示错误
// input数据搜集

// 表单
// 数据搜集： 表单元素数据搜集，输入或校验反馈
    // 双向绑定：监听@input，给value赋值


//校验