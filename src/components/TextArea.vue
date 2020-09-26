<template>
  <label class="TextArea">
    <span class="TextArea__label">{{title}}</span>
    <textarea></textarea>
  </label>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
    },
  }
</script>

<style lang="scss" scoped>
  .TextArea {
    display: block;
  }

  .TextArea__label {
    display: block;
  }
</style>
