<template>
  <ViewBase
    class="ViewGame"
    :class="{'ViewGame--spinning': spinning}"
    :color-context="colorContext"
  >
    <template v-slot:card-heading>
      Play out the randomized matchup, then crown the winner.
    </template>
    <div class="team-grid">
      <div
        v-for="(team, indexTeam) in game"
        :key="team.color"
        class="team-grid__column"
      >
        <TeamRoulette
          :character="team.character"
          :other-characters="team.otherCharacters"
          :color="team.color"
          @stop="spinning = false"
        />
        <div class="ViewGame__crown">
          <ButtonRegular @click="$emit('crown', indexTeam)">
            Crown!
          </ButtonRegular>
        </div>
      </div>
    </div>
  </ViewBase>
</template>

<script>
import ViewBase from '@/components/ViewBase';
import ButtonRegular from '@/components/ButtonRegular';
import TeamRoulette from '@/components/TeamRoulette';

export default {
  components: {
    TeamRoulette,
    ButtonRegular,
    ViewBase,
  },
  props: {
    colorContext: {
      type: String,
      required: true,
    },
    game: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      spinning: true,
    };
  },
}
</script>

<style lang="scss">
@import "~@/styles/definitions";

.ViewGame {
}

.ViewGame__crown {
  display: flex;
  justify-content: flex-end;
  margin-top: r(-20);
  transition-property: visibility, opacity, transform;
  transition-duration: $duration-calm;

  .ViewGame--spinning & {
    visibility: hidden;
    opacity: 0;
    transform: translateY(r(16));
  }
}

</style>
