<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      // this只的是表单组件实例
      form: this
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  methods: {
    validate(cb) {
      // 调用所有的formiterm的validate方法， 只要一个失败就失败
      //   有可能是异步校验
      //   结果是Promise数组
      const tasks = this.$children
        .filter(item => !!item.prop) // 留下带prop属性的formitem才做校验
        .map(item => item.validate());
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    }
  }
};
</script>

<style>
</style>