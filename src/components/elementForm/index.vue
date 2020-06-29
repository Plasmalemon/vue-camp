<template>
  <div>
    <!-- 先把表单实例起个名字 -->
    <k-form :model="model" :rules="rules" ref="loginForm">
      <k-form-item label="用户名" prop="username">
        <k-input v-model="model.username" placeholder="请输入用户名"></k-input>
      </k-form-item>
      <k-form-item label="密码" prop="password">
        <k-input v-model="model.password" type="password"></k-input>
      </k-form-item>
      <k-form-item>
        <button @click="onLogin">提交</button>
      </k-form-item>
    </k-form>
  </div>
</template>

<script>
import KInput from "./KInput";
import KFormItem from "./KFormItem";
import KForm from "./KForm";
export default {
  data() {
    return {
      model: {
        username: "tom",
        password: ""
      },
      //   rules的真正使用者是formitems
      rules: {
        username: [{ required: true, message: "必填项" }],
        password: [{ required: true, message: "必填项" }]
      }
    };
  },
  components: {
    KInput,
    KFormItem,
    KForm
  },
  methods: {
    onLogin() {
      // 给一个全局校验方法，提供成功或者失败信息
      //   登录表单提供一个校验方法，给校验结果
      this.$refs.loginForm.validate(isValid => {
        if (isValid) {
          alert("请求登录!");
        } else {
          alert("校验失败");
        }
      });
    }
  }
};
</script>

<style>
</style>

// 2.4.async 能实现和 model相同功能，
// 区别是啥
