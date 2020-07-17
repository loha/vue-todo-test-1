<template>
  <div class="container">
    <h2>Edit</h2>
    <EditTodo
      :id="id"
      :completed="completed"
      :title="title"
      :text="text"
      @save="save"
      @reject="reject"
      @delete="deleteItem"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TodosStore from '@/store/todo';
import { TodoItem } from '@/types/Todo';

@Component({
  components: {
    EditTodo: () => import('@/components/todo/Edit.vue'),
  },
})
export default class Edit extends Vue {
  /**
   * @var todo TodoItem
   */
  protected todo!: TodoItem;

  /**
   * Vue lifecycle hook
   *
   * @returns Promise<void>
   */
  async beforeCreate(): Promise<void> {
    const getTodo: Function = TodosStore.getById;
    const todo: TodoItem | undefined = getTodo(this.$route.params.id);

    if (todo) {
      this.todo = todo;
    } else {
      this.$router.push({ name: 'error' });
    }
  }

  protected get id(): number | string {
    try {
      return this.todo.id;
    } catch (e) {
      return '';
    }
  }

  protected get completed(): boolean {
    try {
      return this.todo.completed;
    } catch (e) {
      return false;
    }
  }

  protected get title(): string {
    try {
      return this.todo.title;
    } catch (e) {
      return '';
    }
  }

  protected get text(): string {
    try {
      return this.todo.text;
    } catch (e) {
      return '';
    }
  }

  /**
   * Save changes
   *
   * @param todo TodoItem
   * @returns void
   */
  protected save(todo: TodoItem): void {
    TodosStore.updateItem(todo);
    this.$router.push('/');
  }

  /**
   * Reject changes
   *
   * @returns void
   */
  protected reject(): void {
    this.$router.push('/');
  }

  /**
   * Delete changes
   *
   * @param id string
   * @returns void
   */
  protected deleteItem(id: string): void {
    TodosStore.deleteItem(id);
    this.$router.push('/');
  }
}
</script>
