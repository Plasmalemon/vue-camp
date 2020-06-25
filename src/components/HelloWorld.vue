<template>
  <!-- 通信5. 子向父通信 -->
  <!-- 派发一个自定义事件即可， 孩子去派发， 父组件里边去监听 -->
  <!-- 事实是事件是谁派发谁监听 -->
  <div class="hello" @click="$emit('myclick')">
    <!-- 通信1. props -->
    <h1>{{msg}}</h1>
    <!-- 通信2. $attrs -->
    <!-- 父组件传值但是子组件没有声明该属性，那么该属性就会被归纳到$attrs -->
    <p>{{$attrs.foo}}</p>
    <!-- 通信3. 引用refs, 访问原生dom元素 或者 自定义组件的实例 -->
    <p>{{xx}}</p>

    <!-- 通信6. 兄弟组件之间通信，$parent或$root  -->
    <button @click="sayHello">hello</button>

    <!-- 通信7. 祖先和后代之间 -->
    <!-- 由于嵌套层数过多，传递props不切实际，vue提供了 provide/inject API完成该任务 -->
    <!-- 由祖代来提供数据， 后代来注入数据 -->
    <!-- 只能祖先给后代传 -->

    <!-- 通信8. 事件总线， -->
    <!-- 任意两个组件间没有任何关系，如何传值 -->
    <!-- 事件总线:创建一个Bus类负责事件派发、监听和回调管理 -->
    <!-- 典型的观察者模式 -->

    <!-- 通信9 vuex -->
    <!-- 状态可追踪，可管理 -->
    <p>{{foooo}}</p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  inject: ["foooo"],
  props: {
    msg: String
  },

  data() {
    return {
      xx: "xx"
    };
  },
  created() {
    // 监听事件
    // 老爹去监听事件，谁派发谁监听
    // brother1
    this.$parent.$on("hiBrother", () => {
      console.log("来自兄弟的问候");
      // 这里会输出2条，是因为没有把自己给排除
      // 那么怎么把自己给排除呢
    });
  },
  methods: {
    sayHello() {
      // 共同的老爹派发事件
      // brother2
      this.$parent.$emit("hiBrother");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
