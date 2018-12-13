<template>
  <div
    :style="styleObject"
    class="counter-cell"
  >
    <div class="counter-cell__content">
      <button
        :class="{ 'counter-cell__button--highlight': highlight }"
        :data-count="value"
        class="counter-cell__button"
        @click="cellClick"
      >
        {{ value || 0 }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface CellState {
  styleObject: any,
}

export default Vue.extend({
  props: {
    fraction: {
      type: Number,
      required: true,
    },
    highlight: {
      type: Boolean,
      required: false,
      default: false,
    },
    index: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: false,
    },
  },
  data(): CellState {
    return {
      styleObject: {
        width: `${(100 * 1/this.fraction)}%`,
      }
    }
  },
  methods: {
    cellClick() {
      this.$emit('click', this.index)
    }
  },
})
</script>

<style>
  .counter-cell {
    position: relative;
  }

  .counter-cell:before{
    content: "";
    display: block;
    padding-top: 100%;
  }

  .counter-cell__content{
    position:  absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .counter-cell__button,
  .counter-cell__button::before {
    margin-bottom: .5rem;
    text-align: center;
    width: 2rem;
    height: 2rem;
    border: 0;
    border-radius: 50%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    font-size: 14px;
  }

  .counter-cell__button {
    position: relative;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  }

  .counter-cell__button:hover {
    box-shadow: 0 7px 20px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22);
  }

  .counter-cell__button::before {
    content: attr(data-count);
    line-height: 2rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    background-color: #8fbc8f;
    transition: opacity .6s linear;
    opacity: 0;
  }

  .counter-cell__button--highlight::before {
    opacity: 1;
  }
</style>
