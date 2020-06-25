<template>
  <div id="app">
    <!-- 组件通信 -->
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld ref="hw" msg="Welcome to Your Vue.js App" foo="foo" @myclick="onMyClick" />
    <HelloWorld />

    <!-- 组件复合技术 -->
    <!-- 插槽 内容分发api 用于复合组件开发 -->
    <!-- 匿名插槽 -->
    <Comp1>
      <template>匿名插槽</template>
      <!-- 指令的参数来传递 -->
      <!-- 注意 v-slot 只能添加在 <template> 上 (只有一种例外情况， 独占默认插槽的缩写语法) -->
      <template v-slot:content>具名插槽 content...</template>
      <!-- 特殊情况， 数据是在子组件中定义的， 但是父组件又想去组织子组件的显示 -->
      <!-- 作用域插槽 -->
      <!-- 通过slotProos赋值 -->
      <template v-slot:footer="slotProps">作用域插槽 footer...{{slotProps.foo}}</template>
      <!-- 对象解构 -->
      <template v-slot:footer="{foo}">作用域插槽 footer...{{foo}}</template>
    </Comp1>
    <!-- 独占默认插槽 -->
    <!-- <Comp2 v-slot:default="slot2Props">{{ slot2Props.foo }}</Comp2> -->
    <!-- 这种写法还可以更简单。就像假定未指明的内容对应默认插槽一样，不带参数的 v-slot 被假定对应默认插槽 -->
    <!-- 只要出现多个插槽，请始终为所有的插槽使用完整的基于 <template> 的语法： -->
    <Comp2 v-slot="slot2Props">{{ slot2Props.foo }}</Comp2>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Comp1 from "./components/slots/Comp1";
import Comp2 from "./components/slots/Comp2";
export default {
  name: "App",
  provide() {
    return {
      foooo: "foooo"
    };
  },
  components: {
    HelloWorld,
    Comp1,
    Comp2
  },
  mounted() {
    this.$refs.hw.xx = "xxxxx";
    // <!-- 通信4. 子元素$children, 子组件顺序无法保证，因为可能有异步组件 -->
    //
    this.$children[0].xx = "oo";
  },
  methods: {
    onMyClick() {
      console.log("myclick");
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
