//label显示 校验、错误提示、显示input
// 获取当前的校验规则和模型值
// prop是用来做校验的 所以 el-form必须传prop
// 表单元素去通知
<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p class="error" v-if="error">{{error}}</p>
    {{form.rules[prop]}}
  </div>
</template>

<script>
import Schame from "async-validator";
export default {
  inject: ["form"],
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String
    }
  },
  data() {
    return {
      error: ""
    };
  },
  mounted() {
    //   创建顺序是从上向下，挂载顺序子下而上，孩子挂载老爹一定存在

    this.$on("validate", () => {
      this.validate();
    });
  },
  methods: {
    validate() {
      // 0.获取校验规则和当前值
      const rules = this.form.rules[this.prop];
      const value = this.form.model[this.prop];
      // 1. 创建Schame实例
      //   this 指向当前组件实例
      const schame = new Schame({
        [this.prop]: rules
      });
      //   2. 使用该实例进行校验
      return schame.validate(
        {
          [this.prop]: value
        },
        errors => {
          if (errors) {
            this.error = errors[0].message;
          } else {
            this.error = "";
          }
        }
      ); // 返回一个promise
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
