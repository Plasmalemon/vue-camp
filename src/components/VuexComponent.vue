<template>
  <div>
    <div>冲啊，手榴弹扔了{{$store.state.count}}个</div>
    <div>还剩{{$store.getters.left}}个</div>

    <p>
      <button @click="add">扔一个</button>
      <button @click="asyncAdd">蓄力扔一个</button>
    </p>
  </div>
</template>

<script>
export default {
  name: "VuexComponent",
  props: {},
  methods: {
    add() {
      this.$store.commit("increment");
    },
    asyncAdd() {
      this.$store.dispatch("asyncIncrement").catch(() => {
        alert("投失败");
      });
    }
  }
};
</script>
