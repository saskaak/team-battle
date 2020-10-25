<template>
  <div class="App container">
    <h1 class="App__title">Team Battle Conductor</h1>
    <br>
    <br>
    <div
      v-for="team in teams"
      :key="team.color"
    >
      <TeamInput
        v-model="team.characters"
        :color="team.color"
      />
      <br>
      <br>
    </div>
  </div>
</template>

<script>
import TeamInput from '@/components/TeamInput';

const teamDefaults = {
  characters: [],
};

export default {
  components: {TeamInput},
  data() {
    return {
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
  }
}
</script>

<style lang="scss">
.App {

}

.App__title {

}
</style>
