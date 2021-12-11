<template>
  <ViewBase
    class="ViewStart"
    :color-context="colorContext"
  >
    <template v-slot:card-heading>
      Enter two teams consisting of any number of characters.
    </template>
    <div class="team-grid">
      <div
        v-for="team in emitterTeams"
        :key="team.color"
        class="team-grid__column"
      >
        <TeamInput
          v-model="team.characters"
          :color="team.color"
        />
      </div>
    </div>

    <template v-slot:footer>
      <ButtonRegular
        @click="$emit('start')"
        :disabled="!teamsValid"
      >
        Start!
      </ButtonRegular>
    </template>
  </ViewBase>
</template>

<script>
import TeamInput from '@/components/TeamInput';
import vModelEmitter from '@/lib/vModelEmitter';
import ViewBase from '@/components/ViewBase';
import ButtonRegular from '@/components/ButtonRegular';

export default {
  components: {
    ButtonRegular,
    ViewBase,
    TeamInput,
  },
  props: {
    colorContext: {
      type: String,
      required: true,
    },
    teams: {
      type: Array,
      required: true,
    },
  },
  computed: {
    emitterTeams: vModelEmitter('teams'),
    teamsValid() {
      const charactersByTeam = this.teams.map(({characters}) => characters);
      return charactersByTeam.every(({length}) => length > 0) && charactersByTeam.some(({length}) => length > 1);
    },
  },
}
</script>
