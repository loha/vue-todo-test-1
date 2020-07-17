<template>
  <div class="container">
    <h2>Create</h2>
    <div>
      <router-link to="create">
        <AddButton :type="'button'" />
      </router-link>
    </div>
    <h2>List</h2>
    <div class="todo-items">
      <TodoItem
        v-for="item in itemsByPage"
        :key="item.id"
        :id="item.id"
        :completed="item.completed"
        :title="item.title"
        :text="item.text"
        @changeCompleted="changeCompleted"
        @delete="deleteItem"
      />
    </div>
    <div class="center mt-1 mb-1">
      <Pagination :count="countPagination" :current="currentPage" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TodosStore from '@/store/todo';
import { TodoItem } from '@/types/Todo';

@Component({
  components: {
    AddButton: () => import('@/components/buttons/Add.vue'),
    TodoItem: () => import('@/components/todo/Item.vue'),
    Pagination: () => import('@/components/Pagination.vue'),
  },
})
export default class HomePage extends Vue {
  /**
   * Getter todo items
   *
   * @returns Array<TodoItem>
   */
  protected get items(): Array<TodoItem> {
    return TodosStore.todos;
  }

  /**
   * !ATTENTION. Test function for imitation pagination by page. DO NOT TAKE SERIOUSLY!
   *
   * Getter todo items by page
   *
   * @returns Array<TodoItem>
   */
  protected get itemsByPage(): Array<TodoItem> {
    // @ts-ignore
    const page: number = this.currentPage;
    const result: Array<TodoItem> = [];
    let startIndex: number = 0;

    for (let i = 0; i < page; i++) {
      if (i !== 0) {
        startIndex += 3;
      }
    }

    for (let i = startIndex; i < startIndex + 3; i++) {
      const item: TodoItem = this.items[i];
      if (!item) {
        break;
      }
      result.push(this.items[i]);
    }

    if (result.length === 0) {
      this.$router.push({ name: 'error' });
    }

    return result;
  }

  /**
   * Returns page pagination count
   *
   * @returns number
   */
  protected get countPagination(): number {
    return Math.ceil(this.items.length / 3);
  }

  /**
   * Returns current page
   *
   * @returns number
   */
  protected get currentPage(): number {
    let result: number = 1;
    let current: any = this.$route.query.page;

    if (typeof current === 'string') {
      current = Number.parseInt(current);
      result = !isNaN(current) ? current : result;
    }

    if (typeof current === 'number') {
      result = current;
    }

    return result;
  }

  /**
   * Change completed parameter in todo item
   *
   * @returns void
   */
  protected changeCompleted(todo: TodoItem): void {
    TodosStore.updateItem(todo);
  }

  /**
   * Delete todo
   *
   * @returns void
   */
  protected deleteItem(id: string): void {
    TodosStore.deleteItem(id);
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/variables/color';

.todo-items {
  .todo-item {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
