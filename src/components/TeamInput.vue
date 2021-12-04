<template>
  <label
    class="TeamInput"
    :class="`TeamInput--${color}`"
  >
    <span class="TeamInput__label">{{ color }}</span>
    <LineTextarea
      v-model="emitterModelValue"
      class="TeamInput__line-textarea"
      placeholder="Enter a character..."
      min-rows="4"
      :attrsTextarea="{class: 'TeamInput__line-textarea-textarea', spellcheck: false}"
    />
  </label>
</template>

<script>
import LineTextarea from '@/components/LineTextarea';
import vModelEmitter from '@/lib/vModelEmitter';

export default {
  components: {
    LineTextarea,
  },
  props: {
    modelValue: {
      type: Array,
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
  display: flex;
  align-items: center;
  border-radius: r(24);
  box-shadow: 0 r(8) r(24) r(8) rgba($color-black, 0.1);
  background-color: $color-white;
  padding-left: r(32);
}

.TeamInput__label {
  position: absolute;
  display: block;
  margin-left: r(-16);
  transform: translateX(-50%) rotate(270deg);
  font-size: r(12);
  letter-spacing: r(2);
  text-transform: uppercase;

  .TeamInput--red & {
    color: $color-red;
  }

  .TeamInput--blue & {
    color: $color-blue;
  }
}

.TeamInput__line-textarea {
  flex-grow: 1;
  padding: r(32);
  border-radius: r(24);
  font-family: $ff-grandstander;
  font-weight: bold;
  font-size: r(20);
  line-height: r(32);
  color: $color-white;

  &:focus {
    outline: none;
  }

  .TeamInput--red & {
    background: $gradient-corner-red;
  }

  .TeamInput--blue & {
    background: $gradient-corner-blue;
  }
}

.TeamInput__line-textarea-textarea {
  &:focus {
    outline: none;
  }
}
</style>
