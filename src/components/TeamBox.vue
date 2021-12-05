<template>
  <component
    :is="is"
    :class="`TeamBox--${color}`"
    class="TeamBox"
  >
    <span class="TeamBox__label">{{ color }}</span>
    <div class="TeamBox__main">
      <slot/>
    </div>
  </component>
</template>

<script>
export default {
  props: {
    is: {
      type: String,
      default: 'div',
    },
    color: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import "~@/styles/definitions";

.TeamBox {
  display: flex;
  align-items: center;
  border-radius: r(24);
  box-shadow: 0 r(8) r(24) r(8) rgba($color-black, 0.1);
  background-color: $color-white;
  padding-left: r(32);
}

.TeamBox__label {
  position: absolute;
  display: block;
  margin-left: r(-16);
  transform: translateX(-50%) rotate(270deg);
  font-size: r(12);
  font-weight: bold;
  text-transform: uppercase;

  .TeamBox--red & {
    color: $color-red;
  }

  .TeamBox--blue & {
    color: $color-blue;
  }
}

.TeamBox__main {
  flex-grow: 1;
  padding: r(32);
  border-radius: r(24);
  font-family: $ff-grandstander;
  font-weight: bold;
  font-size: r(20);
  line-height: r(32);
  color: $color-white;

  .TeamBox--red & {
    background: $gradient-corner-red;
  }

  .TeamBox--blue & {
    background: $gradient-corner-blue;
  }
}
</style>
