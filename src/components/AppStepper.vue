<template>
  <div class="stepper">
    <div class="stepper__header">
      <transition
        enter-active-class="animate__animated animate__backInLeft animate__faster"
        leave-active-class="animate__animated animate__backOutLeft"
      >
        <button
          v-if="step > 0"
          class="stepper__button stepper__button_prev"
          @click="backStep"
        >
          Назад
        </button>
      </transition>
      <div ref="title" class="stepper__title">
        {{ steps[0].title }}
      </div>
    </div>

    <div ref="wrapper" class="stepper__wrapper">
      <transition
        :enter-active-class="
          'animate__animated animate__backIn' +
          (animateReverse ? 'Left' : 'Right') +
          ' animate__faster'
        "
        :leave-active-class="
          'animate__animated animate__backOut' +
          (animateReverse ? 'Right' : 'Left') +
          ' animate__faster'
        "
        @enter="changeWrapperHeight"
      >
        <keep-alive>
          <component
            :is="activeStep.component"
            :key="step"
            :devices="devices"
            :selected="selected"
            :animateReverse="animateReverse"
            @nextStep="nextStep"
            @backStep="backStep"
          />
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import "/src/css/animate.min.css";

import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
gsap.registerPlugin(TextPlugin);

export default {
  name: "AppStepper",

  props: {
    steps: { type: Array, reqired: true },
    devices: { type: Array, reqired: true },
  },

  data() {
    return {
      step: 0,
      animateReverse: false,
      selected: {},
    };
  },

  computed: {
    activeStep() {
      return this.steps[this.step];
    },
  },

  watch: {
    step: function () {
      gsap.to(this.$refs.title, {
        text: { value: this.activeStep.title, speed: 2, type: "diff" },
      });
    },
  },

  mounted() {
    this.$refs.wrapper.style.height = this.$refs.wrapper.offsetHeight + "px";
  },

  methods: {
    nextStep(selected) {
      this.selected = { ...this.selected, ...selected };

      this.animateReverse = false;
      if (this.step < this.steps.length - 1) this.step++;
    },

    backStep() {
      this.animateReverse = true;
      if (this.step > 0) this.step--;
    },

    changeWrapperHeight(el) {
      gsap.to(this.$refs.wrapper, {
        duration: 0.5,
        height: el.offsetHeight,
      });
    },
  },
};
</script>

<style lang="stylus">
.stepper__header
  height 40px
  display flex
  justify-content center
  align-items center
  position relative
  margin 70px 0

.stepper__wrapper
  position relative
  .animate__animated
    width 100%
    position absolute
    top 0
    left 0

.stepper__footer
  display flex
  justify-content center
  align-items center
  margin-top 50px

.stepper__button
  display flex
  align-items center

  &_prev, &_next
    font-size 18px
    &:before
      content ""
      size 38px
      display block
      background-image url("data:image/svg+xml;charset=utf-8,%3Csvg width=%2216%22 height=%2212%22 viewBox=%220 0 16 12%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22 preserveAspectRatio=%22none%22%3E%3Cstyle%3E.cls-1%7Bstroke:%23151517%7D%3C/style%3E%3Cpath class=%22cls-1%22 d=%22M15.5 5.823H.5M5.5.823l-5 5 5 5%22 stroke-miterlimit=%2210%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/%3E%3C/svg%3E")
      background-repeat no-repeat
      background-position center
      border-radius 50%
      border 1px solid $color-black

  &_prev
    absolute top left
    &:before
      margin-right 10px

  &_next
    flex-direction row-reverse
    margin 10px 0
    &:before
      transform rotate(180deg)
      margin-left 10px

  &_final
    size 220px 60px
    font-weight 700
    color $color-orange
    &:hover
      color $color-white

.stepper__title
  font-size 22px
  line-height 40px
  font-weight 700
  text-align center

+do(900)
  .stepper__header
    margin-bottom 40px

+do(750)
  .stepper__button_prev
    font-size 0
    right 0
    left auto

  .stepper__header
    justify-content flex-start
    margin-bottom 20px

  .stepper__title
    width 285px
    font-size 18px
    line-height 22px
    text-align left

  .stepper__footer.is-active
    margin-top 30px

+do(500)
  .stepper__header
    margin-top 50px
</style>
