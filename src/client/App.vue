<template>
  <app-layout>
    <fibo-cube
      :edge-size="edgeSize"
      :matches="matches"
      :values="values"
      @cell-click="fiboClickHandler"
      @reset-matches="resetMatches"
    />
  </app-layout>
</template>

<script lang="ts">
import Vue from 'vue'

import fiboCube from './lib/fibo-cube'

import { AppLayout, FiboCube } from './components'
import { setTimeout } from 'timers'

interface AppState {
  cube: any,
  edgeSize: number,
  matches: number[],
  matchLength: number,
  values: number[],
}

export default Vue.extend({
  components: { AppLayout, FiboCube },
  data(): AppState {
    return {
      cube: undefined,
      edgeSize: Number(process.env.EDGE_SIZE),
      matches: [],
      matchLength: Number(process.env.MATCH_LENGTH),
      values: [],
    }
  },
  mounted() {
    const { edgeSize, matchLength } = this
    this.cube = fiboCube(edgeSize, matchLength)
    this.values = this.cube.values
  },
  methods: {
    fiboClickHandler({ index }: { index: number }): void {
      const x = index % this.edgeSize
      const y = (index - x) / this.edgeSize
      const fiboMatches = this.cube.updateCube(x, y)

      this.values = [ ...this.cube.values ]
      if(fiboMatches.length) {
        this.matches = fiboMatches
        setTimeout(() => { this.matches = [] }, 300)
      }
    },
    resetMatches() {
      this.matches = []
    }
  }
})
</script>

<style>
  html {
    background-color: #f2f3f5;
  }
</style>
