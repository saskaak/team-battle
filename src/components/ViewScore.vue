<template>
  <ViewBase
    class="ViewScore"
    :color-context="colorContext"
  >
    <template v-slot:card-heading>
      Current score:
    </template>
    <div class="team-grid">
      <div
        v-for="team in score"
        :key="team.color"
        class="team-grid__column"
      >
        <TeamBox :color="team.color">
          <div
            v-for="character in team.characters"
            :key="character.name"
            class="ViewScore__character"
            :class="{'ViewScore__character--unavailable': !character.available}"
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
      <ButtonRegular @click="$emit('continue')">
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
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss">
@import "~@/styles/definitions";

.ViewScore {
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
