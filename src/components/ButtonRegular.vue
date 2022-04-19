<template>
  <button
    class="ButtonRegular"
    :class="{'ButtonRegular--round': round}"
  >
    <slot/>
  </button>
</template>

<script>
export default {
  props: {
    round: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@import "~@/styles/definitions";

.ButtonRegular {
  @include reset-button();
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: r(64);
  min-width: r(160);
  text-align: center;
  font-size: r(20);
  font-weight: bold;
  border-radius: r(32);
  background: $gradient-corner-yellow;
  color: $color-white;
  text-shadow: 0 r(2) r(4) $color-yellow-dark;
  box-shadow: 0 r(8) r(24) rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition-property: opacity, box-shadow;
  transition-duration: $duration-snappy;

  &:disabled {
    opacity: 0.5;
    box-shadow: none;
    cursor: default;
  }

  &--round {
    min-width: r(48);
    min-height: r(48);
  }
}

</style>
