<template>
  <div class="container">
    <div class="not-found center">
      <div class="titile center">404 not found</div>
      <router-link class="link center" to="/">Go to homepage</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/utils/mixins/centering';

.not-found {
  @include absoluteCenter;

  flex-direction: column;

  .titile {
    font-size: 40px;
    font-weight: bold;
    color: #656565;
  }

  .link {
    text-decoration: none;
  }
}
</style>
