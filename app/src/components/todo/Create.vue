<template>
  <div class="edit-todo">
    <form>
      <TitleEditInput v-model="todo.title.value" />
      <TextEditInput v-model="todo.text.value" />
      <div class="edit-todo_actions mt-1">
        <button @click="save" class="success mr-1" type="button">Save</button>
        <button @click="cencel" class="danger" type="button">Cencel</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from '@/app/core/todo/Item';
import { TodoValidation } from '@/app/core/validation/Todo';
import { TodoItemValueError } from '@/types/Todo';

@Component({
  components: {
    TitleEditInput: () => import('@/components/inputs/edit/Title.vue'),
    TextEditInput: () => import('@/components/inputs/edit/Text.vue'),
    Popup: () => import('@/components/dialog/Alert.vue'),
  },
})
export default class CreateTodu extends Vue {
  /**
   * @var todo TodoItemValueError
   */
  protected todo: TodoItemValueError = {
    id: {
      value: uuidv4(),
      error: false,
    },
    title: {
      value: '',
      error: false,
    },
    text: {
      value: '',
      error: false,
    },
  };

  /**
   * 1. Create todo
   * 2. Validate tod0
   * 3. Emit to parent
   *
   * @returns void
   */
  protected save(): void {
    const todo = new Todo(this.todo.id.value, false, this.todo.title.value, this.todo.text.value);
    const todoValidation: TodoValidation = new TodoValidation(todo.toObject());

    todoValidation.validate();

    const errors: Array<string> = todoValidation.errors;

    if (!errors.length) {
      this.$emit('save', todo.toObject());
    } else {
      for (const field of errors) {
        // @ts-ignore
        this.todo[field].error = true;
      }
    }
  }

  /**
   * Emit to parent
   *
   * @returns void
   */
  protected cencel(): void {
    this.$emit('cencel');
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/mixins/todo';

@include editTodo;
</style>
