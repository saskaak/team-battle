<template>
  <div class="IconCrown">
    <div class="IconCrown__sizer">
      <div class="IconCrown__container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          class="IconCrown__crown"
        >
          <polygon points="32 0 32 32 0 32 0 0 10.67 21.33 16 0 21.33 21.33 32 0"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "~@/styles/definitions";

$_IconCrown__shine-width: 0.5;
$_IconCrown__shine-angle: 15deg; // Note that the constant below is calculated from this.
$_IconCrown__tan15deg: 0.2679491924;
$_IconCrown__shine-translation: 0.5 * ($_IconCrown__tan15deg + $_IconCrown__shine-width + 1) / $_IconCrown__shine-width;

.IconCrown {
}

.IconCrown__sizer {
  position: relative;
  overflow: hidden;
  background: $gradient-corner-yellow;
  padding-top: 100%;
}

.IconCrown__container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    width: percentage($_IconCrown__shine-width);
    height: 100%;
    background-color: $color-white;
    animation: IconCrown__shine 1s cubic-bezier(0.75, 0, 0.25, 1) infinite;
  }
}

.IconCrown__crown {
  position: absolute;
  width: 50%;
  height: 50%;
}

@keyframes IconCrown__shine {
  0% {
    transform: skew($_IconCrown__shine-angle) translateX(percentage(-$_IconCrown__shine-translation));
  }

  50% {
    transform: skew($_IconCrown__shine-angle) translateX(percentage(-$_IconCrown__shine-translation));
  }

  100% {
    transform: skew($_IconCrown__shine-angle) translateX(percentage($_IconCrown__shine-translation));
  }
}

</style>
