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
    <div
      class="AppHeader__info"
      v-click-away="onClickAway"
    >
      <button
        v-show="!showInfo"
        class="AppHeader__toggle AppHeader__toggle--close"
        @click="$emit('setShowInfo', true)"
        aria-label="Open info"
      >
        <span aria-hidden="true">?</span>
      </button>
      <button
        v-show="showInfo"
        class="AppHeader__toggle AppHeader__toggle--open"
        @click="$emit('setShowInfo', false)"
        aria-label="Close info"
      >
        <span
          aria-hidden="true"
          class="AppHeader__toggle-x"
        >
          +
        </span>
      </button>
      <div
        v-if="showInfo"
        class="AppHeader__info-modal"
      >
        <div class="AppHeader__info-container container">
          <ArticleInfo/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {directive} from "vue3-click-away";

import ArticleInfo from '@/components/ArticleInfo';

export default {
  directives: {
    ClickAway: directive
  },
  components: {ArticleInfo},
  emits: [
    'setShowInfo',
  ],
  props: {
    showInfo: {
      type: Boolean,
      required: true,
    },
    colorContext: {
      type: String,
      required: true,
    },
  },
  setup(props, {emit}) {
    return {
      onClickAway() {
        emit('setShowInfo', false);
      },
    }
  }
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

.AppHeader__info {
  @include breakpoint(S) {
    position: relative;
  }
}

.AppHeader__toggle {
  @include reset-button();
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: r(40);
  height: r(40);
  padding-top: 0.2em; // Center uppercase text.
  font-weight: bold;
  border-radius: r(20);
  background-color: $color-white;
  cursor: pointer;

  &--open {
    box-shadow: 0 r(8) r(24) rgba(0, 0, 0, 0.1);
  }

  .AppHeader--color-context-red &--close {
    box-shadow: 0 r(4) r(12) rgba($color-red-dark, 0.5);
  }

  .AppHeader--color-context-blue &--close {
    box-shadow: 0 r(4) r(12) rgba($color-blue-dark, 0.5);
  }

  .AppHeader--color-context-yellow &--close {
    box-shadow: 0 r(4) r(12) rgba($color-yellow-dark, 0.5);
  }
}

.AppHeader__toggle-x {
  user-select: none;
  transform: rotate(45deg) scale(1.8) translate(-5%, 10%);
}

.AppHeader__info-modal {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  padding: r(40) 0;
  background-color: $color-white;
  box-shadow: 0 r(8) r(24) r(8) rgba($color-black, 0.1);

  @include breakpoint(S) {
    padding: r(32) 0;
    top: r(-16);
    right: r(-16);
    left: auto;
    width: r(420);
    border-radius: r(24);
  }
}

.AppHeader__info-container {
  @include breakpoint(S) {
    padding: 0 r(32) !important; // Override .container padding.
  }
}

</style>
