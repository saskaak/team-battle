<template>
  <div class="LineTextarea">
    <div class="LineTextarea__placeholder">
      <br
        v-for="line in lines"
        :key="line"
      />
      {{ placeholder }}
    </div>
    <textarea
      v-bind="attrsTextarea"
      :value="modelValue"
      :rows="Math.max(minRows, lines + 1)"
      class="LineTextarea__textarea"
      @input="onInput"
    />
  </div>
</template>

<script>
export default {
  props: {
    minRows: {
      type: Number,
      default: 1,
    },
    modelValue: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    attrsTextarea: {
      type: Object,
      default: () => {
      },
    },
  },
  computed: {
    lines() {
      return this.modelValue ? this.modelValue.split('\n').length : 0;
    },
  },
  methods: {
    async onInput(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
};
</script>

<style lang="scss">
@import "~@/styles/definitions";

.LineTextarea {
}

.LineTextarea__placeholder {
  position: absolute;
  user-select: none;
  opacity: 0.5;
}

.LineTextarea__textarea {
  position: relative;
  display: block;
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background: none;
  resize: none;
  white-space: nowrap;
}

</style>
