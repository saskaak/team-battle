<template>
  <div class="App">
    <h1 class="App__logo container">
      <span class="App__logo-top">Team Battle</span>
      <span class="App__logo-bottom">Conductor</span>
    </h1>
    <transition name="App__view-" mode="out-in">
      <ViewStart
        v-if="view === 'start'"
        color-context="yellow"
        v-model:teams="teams"
        @start="() => view = 'game'"
        class="App__view"
      />
      <ViewStart
        v-else-if="view === 'game'"
        color-context="yellow"
        v-model:teams="teams"
        @start="() => view = 'start'"
        class="App__view"
      />
    </transition>
  </div>
</template>

<script>
import ViewStart from '@/components/ViewStart';

const teamDefaults = {
  characters: [],
};

export default {
  components: {
    ViewStart,
  },
  data() {
    return {
      view: 'start',
      teams: [
        {
          ...teamDefaults,
          color: 'red',
        },
        {
          ...teamDefaults,
          color: 'blue',
        }
      ]
    };
  },
}
</script>

<style lang="scss">
@import "~@/styles/definitions";

.App {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: $header-height;
}

.App__logo {
  height: $header-height;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: bold;
  color: $color-white;
  text-shadow: 0 r(2) r(4) $color-yellow-dark;
}

.App__logo-top {
  display: block;
  font-size: r(20);
}

.App__logo-bottom {
  display: block;
  font-size: r(22);
}

.App__view {
  transition: $duration-snappy;

  &--enter-from {
    transform: scale(0.9) translateX(r(128));
    opacity: 0;
  }

  &--enter-active {
    transition-timing-function: ease-out;
  }

  &--leave-to {
    transform: scale(0.9) translateX(r(-128));
    opacity: 0;
  }

  &--leave-active {
    transition-timing-function: ease-in;
  }
}

</style>
