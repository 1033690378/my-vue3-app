<script>
import { ref, defineComponent } from 'vue'
import { ElButton } from 'element-plus'

  // defineProps({
  //   msg: String,
  // })

  // const count = ref(0);

  export default defineComponent({
    components: {
      ElButton
    },
    setup() {
      const count = ref(0);
      return {
        count,
      };
    },
  });

</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <el-button type="button" @click="count++">count is {{ count }}</el-button>
  </div>

</template>

<style scoped>
  .read-the-docs {
    color: #888;
  }
</style>

