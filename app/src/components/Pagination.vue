<template>
  <div class="pagination">
    <router-link v-if="previous" :to="{  query: { page: previous } }">&laquo;</router-link>
    <router-link
      v-for="page in pages"
      :key="page"
      :to="{ name: 'home', query: { page: page } }"
      :class="{ active: page === current }"
    >{{ page }}</router-link>
    <router-link v-if="next <= count" :to="{  query: { page: current + 1 } }">&raquo;</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Pagination extends Vue {
  /**
   * @var count number
   */
  @Prop(Number) count!: number;

  /**
   * @var current number
   */
  @Prop(Number) current!: number;

  /**
   * Convert page count to array for v-for rendering
   *
   * @returns Array<number>
   */
  protected get pages(): Array<number> {
    const result: Array<number> = [];

    for (let i = 0; i < this.count; i++) {
      result.push(i + 1);
    }

    return result;
  }

  /**
   * Returns previous page
   *
   * @returns number
   */
  protected get previous(): number {
    return this.current - 1;
  }

  /**
   * Returns next page
   *
   * @returns number
   */
  protected get next(): number {
    return this.current + 1;
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/utils/variables/color';

.pagination {
  display: flex;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
}

.pagination .active {
  background-color: $primary;
  color: $white;
}
</style>
