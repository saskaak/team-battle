/*
Create computed properties that act as local copies of props bound via a v-model. The local copies can then be mutated
and the changes are emitted to the parent.

In the parent template:
  <ChildComponent
    v-model="text"
    v-model:color="color"
  />

In the child component:
  @import vModelEmitter from 'vModelEmitter';
  ...
  props: [modelValue, color],
  computed: {
    emitterModelValue: vModelEmitter(),
    emitterColor: vModelEmitter('color'),
  }

These copies can be mutated in the child component. For example:
  <input v-model="emitterModelValue" />
  <color-picker v-model="emitterColor" />
*/

export default function(propName = 'modelValue') {
  return {
    get() {
      return this[propName];
    },
    set(newValue) {
      this.$emit(`update:${propName}`, newValue);
    },
  }
}
