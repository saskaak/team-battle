<template>
  <div
    class="App"
    :class="`App--background-${background}`"
  >
    <div class="container">
      <h1 class="App__header">
        <a
          href="/"
          class="App__logo"
        >
          <span class="App__logo-top">Team Battle</span>
          <span class="App__logo-bottom">Conductor</span>
        </a>
      </h1>
    </div>
    <transition name="App__view-" mode="out-in">
      <ViewStart
        v-if="view === 'start'"
        :color-context="background"
        v-model:teams="teams"
        @start="startBattle"
        class="App__view"
      />
      <ViewGame
        v-else-if="view === 'game'"
        :color-context="background"
        :game="gameProp"
        @crown="endGame"
        class="App__view"
      />
      <ViewScore
        v-else-if="view === 'score'"
        :color-context="background"
        :score="scoreProp"
        class="App__view"
      />
    </transition>
  </div>
</template>

<script>
import ViewStart from '@/components/ViewStart';
import ViewGame from '@/components/ViewGame';
import ViewScore from '@/components/ViewScore';

const teamDefaults = {
  characters: [],
};

export default {
  components: {
    ViewScore,
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
      return this.battle.map((team) => team
        .map((character, index) => ({character, index}))
        .filter(({character}) => character.available)
        .map(({index}) => index));
    },
    winner() {
      const winnerIndex = this.battle.findIndex((team) => team.every(({crown}) => crown));
      return winnerIndex === -1 ? null : winnerIndex;
    },
    background() {
      return this.winner === null ? 'yellow' : this.teams[this.winner].color;
    },
    gameProp() {
      return {
        teams: this.game.map((indexCharacter, indexTeam) => {
          const getCharacter = (index) => this.teams[indexTeam].characters[index];
          return {
            otherCharacters: this.availableCharacters[indexTeam]
              .filter((index) => index !== indexCharacter)
              .map(getCharacter),
            character: getCharacter(indexCharacter),
            color: this.teams[indexTeam].color,
          };
        }),
        number: 1 + this.battle
          .map((team) => team.filter(({available}) => !available).length)
          .reduce((sum, accumulator) => sum + accumulator, 0),
      }
    },
    scoreProp() {
      return {
        winner: this.winner,
        teams: this.teams.map((team, indexTeam) => ({
          color: team.color,
          characters: team.characters.map((name, indexCharacter) => ({
            name,
            ...this.battle[indexTeam][indexCharacter],
          }))
        })),
      };
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
      this.game = this.availableCharacters
        .map((characters) => characters[Math.floor(Math.random() * characters.length)]);
      this.view = 'game';
    },
    endGame(teamIndexWinner) {
      // Set both characters unavailable.
      this.battle.forEach((team, teamIndex) => team[this.game[teamIndex]].available = false);

      // Crown the winner.
      this.battle[teamIndexWinner][this.game[teamIndexWinner]].crown = true;

      // If there's no available characters left, make the uncrowned characters available again.
      this.battle.forEach((team, teamIndex) => {
        const allUnavailable = team.every(({available}) => !available);
        if (allUnavailable) {
          this.battle[teamIndex] = team.map(({crown}) => ({crown, available: !crown}));
        }
      });

      this.view = 'score';
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

  &--background-red {
    background: $gradient-corner-red;
  }

  &--background-blue {
    background: $gradient-corner-blue;
  }

  &--background-yellow {
    background: $gradient-corner-yellow;
  }
}

.App__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: $header-height;
  padding-bottom: r(24);
}

.App__logo {
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  color: $color-white;
  text-shadow: 0 r(2) r(4) $color-yellow-dark;

  .App--background-red & {
    text-shadow: 0 r(4) r(12) $color-red-dark;
  }

  .App--background-blue & {
    text-shadow: 0 r(4) r(12) $color-blue-dark;
  }

  .App--background-yellow & {
    text-shadow: 0 r(4) r(12) $color-yellow-dark;
  }
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
