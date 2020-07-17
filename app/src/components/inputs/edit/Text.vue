<template>
  <div class="edit-todo__text">
    <label class="label" for="text">Text</label>
    <textarea v-model="content" placeholder="Enter todo text" @input="handleInput"></textarea>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { EditInput } from '@/mixins/input/Edit';

@Component
export default class TextEditInput extends Mixins(EditInput) {}
</script>
