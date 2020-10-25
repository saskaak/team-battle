<template>
  <div class="App">
    <h1 class="App__title container">Team Battle Conductor</h1>
    <div class="App__view">
      <ViewStart
        v-if="view = 'start'"
        v-model:teams="teams"
      />
    </div>
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
}

.App__title {
  height: r(72);
  display: flex;
  align-items: center;
}
</style>
