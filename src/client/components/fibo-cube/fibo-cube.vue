<template>
  <div class="fibo-cube">
    <counter-cell
      v-for="(value, index) in values"
      :key="index"
      :highlight="indexIsMatch[index]"
      :index="index"
      :fraction="edgeSize"
      :value="value"
      @click="cellClick"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { CounterCell } from '../'

export default Vue.extend({
  components: {
    CounterCell,
  },
  props: {
    edgeSize: {
      type: Number,
      required: true
    },
    matches: {
      type: {} as (() => number[]),
      required: true,
      default: () => []
    },
    values: {
      type: {} as (() => number[]),
      required: true,
      default: () => []
    },
  },
  computed: {
    indexIsMatch(): any {
      return this.matches
        .reduce((indexes: any, match: number) => ({ ...indexes, [match]: true }), {})
    },
  },
  methods: {
    cellClick(index: number): void {
      this.$emit('cell-click', { index })
    },
  },
})
</script>

<style>
  .fibo-cube {
    display: flex;
    flex-wrap: wrap;
  }
</style>
