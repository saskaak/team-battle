<template>
  <div class="App">
    <div class="container">
      <h1 class="App__logo">
        <span class="App__logo-top">Team Battle</span>
        <span class="App__logo-bottom">Conductor</span>
      </h1>
    </div>
    <transition name="App__view-" mode="out-in">
      <ViewStart
        v-if="view === 'start'"
        color-context="yellow"
        v-model:teams="teams"
        @start="startBattle"
        class="App__view"
      />
      <ViewGame
        v-else-if="view === 'game'"
        color-context="yellow"
        :game="gameProp"
        @start="() => view = 'start'"
        class="App__view"
      />
    </transition>
  </div>
</template>

<script>
import ViewStart from '@/components/ViewStart';
import ViewGame from '@/components/ViewGame';

const teamDefaults = {
  characters: [],
};

export default {
  components: {
    ViewGame,
    ViewStart,
  },
  data() {
    return {
      view: 'start',
      teams: [
        {
          ...teamDefaults,
          color: 'red',
        },
        {
          ...teamDefaults,
          color: 'blue',
        }
      ],
      battle: [],
      game: [],
    };
  },
  computed: {
    availableCharacters() {
      return this.battle.map((team) => team.filter(({available}) => available).map((character, index) => index));
    },
    gameProp() {
      return {
        teams: this.game.map((indexCharacter, indexTeam) => {
          const characters = this.availableCharacters[indexTeam].map((index) => this.teams[indexTeam].characters[index]);
          const [character] = characters.splice(indexCharacter, 1);
          return {
            otherCharacters: characters,
            character,
            color: this.teams[indexTeam].color,
          };
        }),
        number: 1 + this.battle
          .map((team) => team.filter(({available}) => !available).length)
          .reduce((sum, accumulator) => sum + accumulator, 0),
      }
    },
  },
  methods: {
    startBattle() {
      this.battle = this.teams.map((team) => team.characters.map(() => ({
        available: true,
        crown: false,
      })));
      this.startGame();
    },
    startGame() {
      this.game = this.availableCharacters.map((characters) => Math.floor(Math.random() * characters.length));
      this.view = 'game';
    },
  }
}
</script>

<style lang="scss">
@import "~@/styles/definitions";

.App {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  @include breakpoint($ViewBase-breakpoint) {
    padding-bottom: $header-height;
  }
}

.App__logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: $header-height;
  padding-bottom: r(24);
  text-transform: uppercase;
  font-weight: bold;
  color: $color-white;
  text-shadow: 0 r(2) r(4) $color-yellow-dark;
}

.App__logo-top {
  display: block;
  font-size: r(20);
}

.App__logo-bottom {
  display: block;
  font-size: r(22);
}

.App__view {
  transform-origin: bottom;
  transition-property: transform, opacity;
  transition-duration: $duration-snappy;

  @include breakpoint($ViewBase-breakpoint) {
    transform-origin: center;
  }

  &--enter-from {
    transform: scale(0.9) translateX(r(128));
    opacity: 0;
  }

  &--enter-active {
    transition-timing-function: ease-out;
  }

  &--leave-to {
    transform: scale(0.9) translateX(r(-128));
    opacity: 0;
  }

  &--leave-active {
    transition-timing-function: ease-in;
  }
}

</style>
