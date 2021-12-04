<template>
  <ViewBase
    class="ViewStart"
    :color-context="colorContext"
  >
    <template v-slot:card-heading>
      Enter two teams consisting of any number of characters.
    </template>
    <div class="ViewStart__team-input-grid">
      <div
        v-for="team in emitterTeams"
        :key="team.color"
        class="ViewStart__team-input-column"
      >
        <TeamInput
          v-model="team.characters"
          :color="team.color"
        />
      </div>
    </div>
    <div class="ViewStart__cta">
      <ButtonRegular @click="$emit('start')">
        Start!
      </ButtonRegular>
    </div>
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
  },
}
</script>

<style lang="scss">
@import "~@/styles/definitions";

$breakpoint-grid: M;

.ViewStart {

}

.ViewStart__team-input-grid {
  @include breakpoint($breakpoint-grid) {
    display: flex;
  }
}

.ViewStart__team-input-column {
  flex-grow: 1;

  &:first-child {
    margin-bottom: r(32);

    @include breakpoint($breakpoint-grid) {
      margin-bottom: 0;
      margin-right: r(32);
    }
  }
}

.ViewStart__cta {
  display: flex;
  justify-content: flex-end;
  margin-top: r(56);
}
</style>
