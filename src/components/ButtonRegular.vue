<template>
  <button class="ButtonRegular">
    <slot/>
  </button>
</template>

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
}

</style>
