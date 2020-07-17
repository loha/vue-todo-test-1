<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TodosStore from '@/store/todo';

@Component({
  components: {
    Header: () => import('@/components/navigation/Header.vue'),
    Footer: () => import('@/components/navigation/Footer.vue'),
  },
  metaInfo() {
    return { title: 'Cool todos!' };
  },
})
export default class App extends Vue {
  /**
   * Vue lifecycle hook
   *
   * @returns Promise<void>
   */
  async beforeCreate(): Promise<void> {
    TodosStore.fetchTodos();
  }
}
</script>
