<template>
  <div class="LineTextarea">
    <div class="LineTextarea__placeholder">
      <br
        v-for="line in modelValue"
        :key="line"
      />
      {{placeholder}}
    </div>
    <textarea
      v-bind="attrsTextarea"
      :value="string"
      :rows="Math.max(minRows, modelValue.length + 1)"
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
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    attrsTextarea: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    stringRaw() {
      return this.modelValue.join('\n');
    },
    string() {
      return this.stringRaw.length === 0
        ? ''
        : `${this.stringRaw}\n`;
    }
  },
  methods: {
    async onInput(event) {
      const el = event.target;
      const {value} = el;
      if (!value) {
        this.$emit('update:modelValue', []);
      }

      // Remove all extra newlines
      const valueFiltered = value
        .replace(/^\n/g, '')
        .replace(/\n\s*\n/g, '\n');
      const array = valueFiltered
        .split('\n')
        .filter(line => line.trim());

      this.$emit('update:modelValue', array);

      // Correct the caret position after adding an extra newline in computed.string:
      const caretPosition = el.selectionStart;
      await this.$nextTick();
      if (this.stringRaw === valueFiltered) {
        el.setSelectionRange(caretPosition, caretPosition);
      }
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
