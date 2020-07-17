<template>
  <footer>
    <div class="footer">
      <div class="container">
        <p class="copyright">
          <b>©</b>
          {{ new Date().getFullYear() }} Todos
        </p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/variables/color';

footer {
  margin-top: 60px;
}

.footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 50px;
  background-color: $primary;

  .copyright {
    color: $white;
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
}
</style>
