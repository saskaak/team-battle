<template>
  <TeamBox
    :color="color"
    is="label"
    class="TeamInput"
  >
    <LineTextarea
      v-model="emitterModelValue"
      class="TeamInput__input"
      placeholder="Enter a character..."
      :min-rows="4"
      :attrsTextarea="{class: 'TeamInput__textarea', spellcheck: false}"
    />
  </TeamBox>
</template>

<script>
import LineTextarea from '@/components/LineTextarea';
import vModelEmitter from '@/lib/vModelEmitter';
import TeamBox from '@/components/TeamBox';

export default {
  components: {
    TeamBox,
    LineTextarea,
  },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  computed: {
    emitterModelValue: vModelEmitter(),
  },
};
</script>

<style lang="scss">
@import "~@/styles/definitions";

.TeamInput {
}

.TeamInput__textarea {
  &:focus {
    outline: none;
  }
}
</style>
