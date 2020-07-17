<template>
  <div class="container">
    <h2>Edit</h2>
    <CreateTodo @save="create" @cencel="cencel" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TodosStore from '@/store/todo';
import { TodoItem } from '@/types/Todo';

@Component({
  components: {
    CreateTodo: () => import('@/components/todo/Create.vue'),
  },
})
export default class Create extends Vue {
  /**
   * Create new todo
   *
   * @returns void
   */
  protected create(todo: TodoItem): void {
    TodosStore.addItem(todo);
    this.$router.push('/');
  }

  /**
   * Cencel create todo
   *
   * @returns void
   */
  protected cencel(): void {
    this.$router.push('/');
  }
}
</script>
