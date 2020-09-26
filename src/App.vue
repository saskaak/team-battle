<template>
  <div class="app container">
    <h1 class="app__title">Team Battle Conductor</h1>
    <TextArea title="Player 1"/>
    <TextArea title="Player 2"/>
  </div>
</template>

<script>
  import TextArea from './components/TextArea';

  export default {
    components: {TextArea}
  }
</script>

<style lang="scss" scoped>
  .app {

  }

  .app__title {

  }
</style>
