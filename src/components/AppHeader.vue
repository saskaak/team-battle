<template>
  <div
    class="AppHeader container"
    :class="`AppHeader--color-context-${colorContext}`"
  >
    <h1>
      <a
        href="/"
        class="AppHeader__logo"
      >
        <span class="AppHeader__logo-top">Team Battle</span>
        <span class="AppHeader__logo-bottom">Conductor</span>
      </a>

    </h1>
    <button class="AppHeader__toggle">
      ?
    </button>
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

.AppHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: $header-height;
  padding-bottom: r(24);
}

.AppHeader__logo {
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  color: $color-white;
  text-shadow: 0 r(2) r(4) $color-yellow-dark;

  .AppHeader--color-context-red & {
    text-shadow: 0 r(4) r(12) $color-red-dark;
  }

  .AppHeader--color-context-blue & {
    text-shadow: 0 r(4) r(12) $color-blue-dark;
  }

  .AppHeader--color-context-yellow & {
    text-shadow: 0 r(4) r(12) $color-yellow-dark;
  }
}

.AppHeader__logo-top {
  display: block;
  font-size: r(20);
}

.AppHeader__logo-bottom {
  display: block;
  font-size: r(22);
}

.AppHeader__toggle {
  @include reset-button();
  display: flex;
  align-items: center;
  justify-content: center;
  width: r(40);
  height: r(40);
  padding-top: 0.2em; // Center uppercase text.
  font-weight: bold;
  border-radius: r(20);
  background-color: $color-white;

  .AppHeader--color-context-red & {
    box-shadow: 0 r(4) r(12) rgba($color-red-dark, 0.5);
  }

  .AppHeader--color-context-blue & {
    box-shadow: 0 r(4) r(12) rgba($color-blue-dark, 0.5);
  }

  .AppHeader--color-context-yellow & {
    box-shadow: 0 r(4) r(12) rgba($color-yellow-dark, 0.5);
  }
}

</style>
