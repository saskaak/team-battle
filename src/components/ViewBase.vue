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
      <div
        v-if="$slots['card-heading']"
        class="ViewBase__card-heading"
      >
        <slot name="card-heading"/>
      </div>
      <slot/>
      <div
        v-if="$slots['footer']"
        class="ViewBase__footer"
      >
        <slot name="footer"/>
      </div>
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

.ViewBase {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  @include breakpoint($ViewBase-breakpoint) {
    justify-content: center;
    padding-bottom: $header-height;
  }
}

.ViewBase__header {
  margin-bottom: r(24);
}

.ViewBase__card {
  padding: r(40) r(16);
  background-color: $color-white;
  border-top-left-radius: r(24);
  border-top-right-radius: r(24);

  @include breakpoint(S) {
    padding-left: r(40);
    padding-right: r(40);
  }

  @include breakpoint($ViewBase-breakpoint) {
    border-radius: r(24);
  }

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

.ViewBase__card-heading {
  text-align: center;
  margin-bottom: r(40);
  line-height: r(24);
}

.ViewBase__footer {
  display: flex;
  justify-content: flex-end;
  margin-top: r(56);
}

</style>
