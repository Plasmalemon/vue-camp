<template>
  <div>
    <slot :foo="foo"></slot>
  </div>
</template>

<script>
export default {
  name: "Comp2",
  data() {
    return {
      foo: "独占插槽"
    };
  }
};
</script>

<style lang="stylus"></style>
