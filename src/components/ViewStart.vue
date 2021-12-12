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
        v-for="(teamColor, index) in teamColors"
        :key="teamColor"
        class="team-grid__column"
      >
        <TeamInput
          v-model="emitterTeamStrings[index]"
          :color="teamColor"
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
    teamColors: {
      type: Array,
      required: true,
    },
    teamStrings: {
      type: Array,
      required: true,
    },
    teamsValid: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    emitterTeamStrings: vModelEmitter('teamStrings'),
  },
}
</script>
