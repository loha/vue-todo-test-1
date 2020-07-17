<template>
  <div>
    <div class="popup center-window">
      <div class="popup__text center">
        <slot name="text"></slot>
      </div>
      <div class="popup__actions center">
        <button class="success" type="button" @click="success">
          <slot name="success-button-text">Yes</slot>
        </button>
        <button class="danger" type="button" @click="reject">
          <slot name="reject-button-text">No</slot>
        </button>
      </div>
    </div>
    <div class="overlay" @click="reject"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AlertPopup extends Vue {
  /**
   * Emit success result
   *
   * @returns void
   */
  protected success(): void {
    this.$emit('success');
  }

  /**
   * Emit reject result
   *
   * @returns void
   */
  protected reject(): void {
    this.$emit('reject');
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/variables/color';

$margin-top-10: 10px;

.popup {
  background-color: $white;
  width: 300px;
  height: 110px;
  z-index: 2;

  .popup__text {
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: $margin-top-10;
    padding-left: $margin-top-10;
  }

  .popup__actions {
    button:first-child {
      margin-right: $margin-top-10;
    }
  }
}
</style>
