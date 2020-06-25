<template>
  <div>
    <p>
      <!-- 一个不带 name 的 <slot> 出口会带有隐含的名字“default” -->
      <slot></slot>
    </p>
    <p>
      <slot name="content"></slot>
    </p>
    <!-- 通过foo传参 -->
    <p>
      <slot name="footer" :foo="foo"></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: "Comp1",
  data() {
    return {
      foo: "作用域插槽"
    };
  }
};
</script>

<style lang="stylus"></style>