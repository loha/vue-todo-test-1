<template>
  <div class="todo-item card" :class="{ 'todo-item_completed': isCompleted }">
    <div class="left">
      <input type="checkbox" v-model="isCompleted" @change="changeCompleted" />
    </div>
    <div class="right">
      <h3 class="title">{{ title }}</h3>
      <p class="text">{{ text }}</p>
      <div class="todo-item__actions">
        <router-link class="mr-1" :to="`/edit/${id}`">
          <button type="button">Edit</button>
        </router-link>
        <button @click="showDeleteAlert = true" class="danger" type="button">Delete</button>
      </div>
    </div>

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

@Component({
  components: {
    Popup: () => import('@/components/dialog/Alert.vue'),
  },
})
export default class ItemTodu extends Vue {
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
   * @var showDeleteAlert boolean
   */
  protected showDeleteAlert: boolean = false;

  /**
   * @var isCompleted boolean
   */
  protected isCompleted: boolean = this.completed;

  /**
   * Change completed
   *
   * 1. Create todo
   * 2. Emit to parent
   *
   * @returns void
   */
  protected changeCompleted(): void {
    const todo = new Todo(this.id, !this.completed, this.title, this.text);

    this.$emit('changeCompleted', todo.toObject());
  }

  /**
   * Click to checkbox
   *
   * 1. Emit to parent
   * 2. Hide delete alert
   *
   * @returns void
   */
  protected successDelete(): void {
    this.$emit('delete', this.id);
    this.showDeleteAlert = false;
  }

  /**
   * Hide delete alert
   *
   * @returns void
   */
  protected rejectDelete(): void {
    this.showDeleteAlert = false;
  }
}
</script>

<style lang="scss" scoped>
.todo-item {
  display: flex;

  .left {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }

  .right {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .title {
    font-weight: bold;
    color: #4a4a4a;
    margin-bottom: 1rem;
  }

  .text {
    color: #353232;
    margin-bottom: 0.75rem;
  }

  .todo-item__actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
}

.todo-item_completed {
  .title {
    text-decoration: line-through;
  }

  .text {
    text-decoration: line-through;
  }
}
</style>
