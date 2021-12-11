<template>
  <ViewBase
    class="ViewGame"
    :class="{'ViewGame--spinning': spinning}"
    :color-context="colorContext"
  >
    <template v-slot:header>
      <div
        class="ViewGame__header"
        :class="`ViewGame__header--color-context-${colorContext}`"
      >
        <div class="ViewGame__header-top">
          Game
        </div>
        <div class="ViewGame__header-bottom">
          <IconStar
            :color-context="colorContext"
            class="ViewGame__header-bottom-star"
          />
          <div>
            <div class="ViewGame__header-bottom-text">
              <span class="ViewGame__header-bottom-text-game">Game</span>
              {{ game.number }}
            </div>
          </div>
          <IconStar
            :color-context="colorContext"
            class="ViewGame__header-bottom-star"
          />
        </div>
      </div>
    </template>
    <template v-slot:card-heading>
      Play out the randomized matchup, then crown the winner.
    </template>
    <div class="team-grid">
      <div
        v-for="(team, indexTeam) in game.teams"
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
import IconStar from '@/components/IconStar';

export default {
  components: {
    IconStar,
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
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      spinning: this.game.teams.some(({otherCharacters}) => otherCharacters.length > 0),
    };
  },
}
</script>

<style lang="scss">
@import "~@/styles/definitions";

.ViewGame {
}

.ViewGame__header {
  text-align: center;
  font-size: r(64);
  font-weight: bold;
  color: $color-white;
  text-transform: uppercase;

  @include breakpoint(M) {
    font-size: r(80);
  }

  &--color-context-red {
    text-shadow: 0 r(4) r(12) $color-red-dark;
  }

  &--color-context-blue {
    text-shadow: 0 r(4) r(12) $color-blue-dark;
  }

  &--color-context-yellow {
    text-shadow: 0 r(4) r(12) $color-yellow-dark;
  }
}

.ViewGame__header-top {
  @include breakpoint(S) {
    display: none;
  }
}

.ViewGame__header-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
}

.ViewGame__header-bottom-star {
  margin-bottom: 0.2em; // Center to the uppercase text.
}

.ViewGame__header-bottom-text {
  margin: 0 r(24);
}

.ViewGame__header-bottom-text-game {
  display: none;

  @include breakpoint(S) {
    display: inline;
  }
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
