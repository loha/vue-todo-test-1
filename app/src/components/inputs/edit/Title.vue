<template>
  <div class="edit-todo__title">
    <label class="label" for="title">Title</label>
    <input v-model="content" type="text" placeholder="Enter todo title" @input="handleInput" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { EditInput } from '@/mixins/input/Edit';

@Component
export default class TitleEditInput extends Mixins(EditInput) {}
</script>
