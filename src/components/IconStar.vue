<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    class="IconStar"
  >
    <path
      d="M18,1.9l3.24,6.57a2.18,2.18,0,0,0,1.65,1.2l7.26,1.06A2.19,2.19,0,0,1,32,13.21a2.25,2.25,0,0,1-.64,1.26l-5.25,5.12a2.16,2.16,0,0,0-.63,1.94l1.23,7.23a2.19,2.19,0,0,1-3.18,2.31L17,27.66a2.19,2.19,0,0,0-2.05,0L8.5,31.07a2.19,2.19,0,0,1-3-.92,2.24,2.24,0,0,1-.22-1.39l1.24-7.23a2.19,2.19,0,0,0-.63-1.94L.66,14.47a2.19,2.19,0,0,1,1.22-3.74L9.14,9.67a2.18,2.18,0,0,0,1.65-1.2L14,1.9A2.2,2.2,0,0,1,17,.9a2.25,2.25,0,0,1,1,1"
      class="IconStar__path"
      :class="`IconStar__path--color-context-${colorContext}`"
    />
  </svg>
</template>

<script>
export default {
  props: {
    colorContext: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss">
@import "~@/styles/definitions";

.IconStar {
  overflow: visible;
  width: r(32);
  height: r(32);
}

.IconStar__path {
  fill: $color-white;

  &--color-context-red {
    filter: drop-shadow(0 r(4) r(12) $color-red-dark);
  }

  &--color-context-blue {
    filter: drop-shadow(0 r(4) r(12) $color-blue-dark);
  }

  &--color-context-yellow {
    filter: drop-shadow(0 r(4) r(12) $color-yellow-dark);
  }
}
</style>
