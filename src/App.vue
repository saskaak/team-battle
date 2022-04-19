<template>
  <div
    class="App"
    :class="`App--background-${background}`"
  >
    <AppHeader
      :showInfo="showInfo"
      :colorContext="background"
      @setShowInfo="(value) => showInfo = value"
    />
    <transition name="App__view-" mode="out-in">
      <ViewStart
        v-if="view === 'start'"
        :color-context="background"
        :teamColors="teams.map(({color}) => color)"
        :teamsValid="teamsValid"
        v-model:teamStrings="teamStrings"
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
        @nextGame="startGame"
        @endBattle="endBattle"
        class="App__view"
      />
    </transition>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader';
import ViewStart from '@/components/ViewStart';
import ViewGame from '@/components/ViewGame';
import ViewScore from '@/components/ViewScore';

const teamColors = [
  'red',
  'blue',
];

export default {
  components: {
    AppHeader,
    ViewScore,
    ViewGame,
    ViewStart,
  },
  data() {
    return {
      showInfo: false,
      view: 'start',
      teamStrings: ['', ''],
      battle: [],
      game: [],
    };
  },
  computed: {
    teams() {
      return this.teamStrings.map((teamString, index) => {
        return {
          characters: teamString.split('\n').filter(line => line.trim()),
          color: teamColors[index],
        }
      });
    },
    teamsValid() {
      const charactersByTeam = this.teams.map(({characters}) => characters);
      return charactersByTeam.every(({length}) => length > 0) && charactersByTeam.some(({length}) => length > 1);
    },
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
          .map((team) => team.filter(({crown}) => crown).length)
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
    endBattle() {
      this.battle = [];
      this.view = 'start';
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
