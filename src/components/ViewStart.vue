<template>
  <div class="ViewStart container">
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
  </div>
</template>

<script>
import TeamInput from '@/components/TeamInput';
import vModelEmitter from '@/lib/vModelEmitter';

export default {
  components: {
    TeamInput,
  },
  props: {
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
</style>
