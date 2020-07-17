import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
class EditInput extends Vue {
  /**
   * @var value string
   */
  @Prop(String) value!: string;

  /**
   * @var content string
   */
  protected content: string = this.value;

  /**
   * Handle input to pass value to parent for v-model
   *
   * @returns void
   */
  protected handleInput(): void {
    this.$emit('input', this.content);
  }
}

export { EditInput };
