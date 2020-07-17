<template>
  <button class="add" :type="type">+</button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class AddButton extends Vue {
  /**
   * @var type string
   */
  @Prop(String) type!: string;
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/mixins/border';

button.add {
  @include defaultBorderRadius;

  width: 100%;
  font-size: 43px;
}
</style>
