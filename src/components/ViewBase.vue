<template>
  <div
    :class="`ViewBase--color-context-${colorContext}`"
    class="ViewBase container"
  >
    <div
      v-if="$slots.header"
      class="ViewBase__header"
    >
      <slot name="header"/>
    </div>
    <div class="ViewBase__card">
      <slot/>
    </div>
  </div>
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

$breakpoint-grid: M;

.ViewBase {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.ViewStart__header {
  padding: r(24) 0;
}

.ViewBase__card {
  padding: r(40);
  border-radius: r(24);
  background-color: $color-white;

  .ViewBase--color-context-red & {
    box-shadow: 0 r(8) r(24) rgba($color-red-dark, 0.5);
  }
  .ViewBase--color-context-blue & {
    box-shadow: 0 r(8) r(24) rgba($color-blue-dark, 0.5);
  }
  .ViewBase--color-context-yellow & {
    box-shadow: 0 r(8) r(24) rgba($color-yellow-dark, 0.5);
  }
}

</style>
