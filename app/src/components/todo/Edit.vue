<template>
  <div class="edit-todo">
    <form>
      <TitleEditInput v-model="todo.title.value" />
      <TextEditInput v-model="todo.text.value" />
      <div class="edit-todo_actions mt-1">
        <button @click="save" class="success mr-1" type="button">Save</button>
        <button @click="reject" class="warning mr-1" type="button">Reject</button>
        <button @click="deleteItem" class="danger" type="button">Delete</button>
      </div>
    </form>

    <Popup v-if="showRejectAlert" @success="successReject" @reject="declineReject">
      <template slot="text">Are you sure reject edit?</template>

      <template slot="success-button-text">Yes</template>

      <template slot="reject-button-text">Cencel</template>
    </Popup>

    <Popup v-if="showDeleteAlert" @success="successDelete" @reject="rejectDelete">
      <template slot="text">Are you sure delele this todo?</template>

      <template slot="success-button-text">Yes</template>

      <template slot="reject-button-text">Cencel</template>
    </Popup>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
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
export default class EditTodu extends Vue {
  /**
   * @var id string
   */
  @Prop([String, Number]) id!: string;

  /**
   * @var completed boolean
   */
  @Prop(Boolean) completed!: boolean;

  /**
   * @var title string
   */
  @Prop(String) title!: string;

  /**
   * @var text string
   */
  @Prop(String) text!: string;

  /**
   * @var showRejectAlert boolean
   */
  protected showRejectAlert: boolean = false;

  /**
   * @var showDeleteAlert boolean
   */
  protected showDeleteAlert: boolean = false;

  /**
   * @var todo TodoItemValueError
   */
  protected todo: TodoItemValueError = {
    id: {
      value: this.id,
      error: false,
    },
    title: {
      value: this.title,
      error: false,
    },
    text: {
      value: this.text,
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
    const todo = new Todo(this.todo.id.value, this.completed, this.todo.title.value, this.todo.text.value);
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
   * Show reject alert
   */
  protected reject(): void {
    this.showRejectAlert = true;
  }

  /**
   * Emit to parent
   *
   * @returns void
   */
  protected successReject(): void {
    this.$emit('reject');
  }

  /**
   * Hide reject alert
   */
  protected declineReject(): void {
    this.showRejectAlert = false;
  }

  /**
   * Show delete alert
   */
  protected deleteItem(): void {
    this.showDeleteAlert = true;
  }

  /**
   * Emit to parent
   *
   * @returns void
   */
  protected successDelete(): void {
    this.$emit('delete', this.todo.id.value);
  }

  /**
   * Show delete alert
   *
   * @returns void
   */
  protected rejectDelete(): void {
    this.showDeleteAlert = false;
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/mixins/todo';

@include editTodo;
</style>
