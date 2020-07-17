<template>
  <header>
    <div class="container">
      <div class="logo">
        <h1>ToDoS</h1>
      </div>
    </div>
    <hr />
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/variables/color';

header {
  width: 100%;
}

.logo {
  h1 {
    font-weight: 700;
    color: $primary;
  }
}
</style>
