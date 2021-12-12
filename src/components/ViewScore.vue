<template>
  <ViewBase
    class="ViewScore"
    :color-context="colorContext"
  >
    <template v-if="isEnd" v-slot:header>
      <div
        class="ViewScore__header"
        :class="`ViewScore__header--color-context-${colorContext}`"
      >
        <div class="ViewScore__header-crown">
          <div class="ViewScore__header-crown-sizer">
          <IconCrown class="ViewScore__header-crown-icon"/>
          </div>
        </div>
        <div class="ViewScore__header-text">
          {{ score.teams[score.winner].color }}
          <br/>
          wins!
        </div>
      </div>
    </template>
    <template v-slot:card-heading>
      {{ isEnd ? 'Final score:' : 'Current score:' }}
    </template>
    <div class="team-grid">
      <div
        v-for="team in score.teams"
        :key="team.color"
        class="team-grid__column"
      >
        <TeamBox :color="team.color">
          <div
            v-for="character in team.characters"
            :key="character.name"
            class="ViewScore__character"
            :class="{'ViewScore__character--unavailable': !character.available && !isEnd}"
          >
            <IconCrown
              v-if="character.crown"
              class="ViewScore__crown"
            />
            <div class="ViewScore__character-name">
              {{ character.name }}
            </div>
          </div>
        </TeamBox>
      </div>
    </div>

    <template v-slot:footer>
      <ButtonRegular
        v-if="isEnd"
        @click="$emit('endBattle')"
      >
        Finish!
      </ButtonRegular>
      <ButtonRegular
        v-else
        @click="$emit('nextGame')"
      >
        Continue!
      </ButtonRegular>
    </template>
  </ViewBase>
</template>

<script>
import ViewBase from '@/components/ViewBase';
import TeamBox from '@/components/TeamBox';
import IconCrown from '@/components/IconCrown';
import ButtonRegular from '@/components/ButtonRegular';

export default {
  components: {
    ButtonRegular,
    IconCrown,
    TeamBox,
    ViewBase,
  },
  props: {
    colorContext: {
      type: String,
      required: true,
    },
    score: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isEnd() {
      return this.score.winner !== null;
    }
  },
};
</script>

<style lang="scss">
@import "~@/styles/definitions";

.ViewScore {
}

.ViewScore__header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.ViewScore__header-crown {
  width: r(128);
  margin-right: r(24);
}

.ViewScore__header-crown-sizer {
  position: relative;
  padding-top: 100%;

  .ViewScore__header--color-context-red & {
    box-shadow: 0 r(4) r(12) $color-red-dark;
  }

  .ViewScore__header--color-context-blue & {
    box-shadow: 0 r(4) r(12) $color-blue-dark;
  }

  .ViewScore__header--color-context-yellow & {
    box-shadow: 0 r(4) r(12) $color-yellow-dark;
  }
}

.ViewScore__header-crown-icon {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.ViewScore__header-text {
  font-size: r(64);
  font-weight: bold;
  color: $color-white;
  text-transform: uppercase;

  .ViewScore__header--color-context-red & {
    text-shadow: 0 r(4) r(12) $color-red-dark;
  }

  .ViewScore__header--color-context-blue & {
    text-shadow: 0 r(4) r(12) $color-blue-dark;
  }

  .ViewScore__header--color-context-yellow & {
    text-shadow: 0 r(4) r(12) $color-yellow-dark;
  }
}

.ViewScore__character {
  display: flex;
  align-items: center;
}

.ViewScore__character {
  display: flex;
  align-items: center;
}

.ViewScore__character-name {
  .ViewScore__character--unavailable & {
    opacity: 0.5;
  }
}

.ViewScore__crown {
  width: r(20);
  height: r(20);
  margin-right: r(8);
}

</style>
