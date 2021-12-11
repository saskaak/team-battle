<template>
  <TeamBox :color="color">
    <div
      class="TeamRoulette"
      :class="{'TeamRoulette--spinning': spinning}"
    >
      <div
        ref="rouletteSheet"
        class="TeamRoulette__sheet"
      >
        <div
          v-for="(character, index) in roulette"
          :key="character"
          :class="{'TeamRoulette__sheet-character--result': index === 1}"
          class="TeamRoulette__sheet-character"
        >
          {{ character }}
        </div>
      </div>
      <div class="TeamRoulette__character">
        {{ character }}
      </div>
    </div>
  </TeamBox>
</template>

<script>
import TeamBox from '@/components/TeamBox';

export default {
  components: {
    TeamBox,
  },
  props: {
    color: {
      type: String,
      required: true,
    },
    character: {
      type: String,
      required: true,
    },
    otherCharacters: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      spinning: this.otherCharacters.length > 0,
    };
  },
  computed: {
    roulette() {
      const pattern = [this.otherCharacters[0], this.character, ...this.otherCharacters.slice(1)];
      const patternLength = pattern.length;
      return [...Array(20).keys()].map((index) => pattern[index % patternLength]);
    },
  },
  methods: {
    onStopSpin() {
      this.spinning = false;
      this.$emit('stop');
    },
  },
  mounted() {
    this.$refs.rouletteSheet.addEventListener('animationend', this.onStopSpin);
  },
}
</script>

<style lang="scss">
@import "~@/styles/definitions";

.TeamRoulette {
  position: relative;
}

.TeamRoulette__sheet {
  position: absolute;
  transform: translateY(-90%);
  animation: TeamRoulette__spin 2s ease-out both;
}

.TeamRoulette__sheet-character {
  opacity: 0;
  transition: opacity $duration-snappy;

  &--result {
    transition: none;
  }

  .TeamRoulette--spinning & {
    opacity: 1;
  }
}

.TeamRoulette__character {
  .TeamRoulette--spinning & {
    visibility: hidden;
  }
}

@keyframes TeamRoulette__spin {
  95% {
    transform: translateY(-4%);
  }

  100% {
    transform: translateY(-5%);
  }
}

</style>
