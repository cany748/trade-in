<template>
  <div class="stepper__content">
    <div class="trade-in__slider trade-in-slider">
      <div ref="slider" class="trade-in-slider__range" :value="state">
        <div class="trade-in-slider__decor trade-in-slider__decor_left" />
        <div class="trade-in-slider__decor trade-in-slider__decor_right" />
      </div>
      <div class="trade-in-slider__tooltip">
        <div ref="title" class="trade-in-slider__title">
          {{ statuses[2].title }}
        </div>
        <br />
        <div ref="text" class="trade-in-slider__text">
          {{ statuses[2].text }}
        </div>
      </div>
    </div>
    <div class="stepper__footer">
      <button
        class="stepper__button stepper__button_next"
        @click="$emit('nextStep', { status: state })"
      >
        Далее
      </button>
    </div>
  </div>
</template>

<script>
import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.min.css";

import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
gsap.registerPlugin(TextPlugin);

export default {
  name: "ChangeStatus",
  props: {
    devices: { type: Object, reqired: true },
    selected: { type: Object, reqired: true },
  },
  emits: ["nextStep"],
  data() {
    return {
      statuses: [
        {
          emoji: "emoji-grimacing-face-x70.png",
          title: "Ужасное",
          text: "Разбит дисплей, сильные повреждения корпуса",
        },
        {
          emoji: "emoji-confused-face-x70.png",
          title: "Плохое",
          text: "Глубокие или многочисленные царапины на корпусе или дисплее",
        },
        {
          emoji: "emoji-slightly-smiling-face-x70.png",
          title: "Нормальное",
          text: "Устройство исправно работает, но имеет косметические дефекты",
        },
        {
          emoji: "emoji-smiling-face-x70.png",
          title: "Хорошее",
          text: "Минимальные потертости или несколько поверхностных царапин",
        },
        {
          emoji: "emoji-star-struck-x70.png",
          title: "Прекрасное",
          text: "Без каких-либо следов износа вообще, отсутствуют царапины и потертости",
        },
      ],
      state: 3,
    };
  },

  watch: {
    state: function () {
      gsap.to(this.$refs.title, {
        text: {
          value: this.statuses[this.state - 1].title,
          speed: 1,
          type: "diff",
        },
      });
      gsap.to(this.$refs.text, {
        text: {
          value: this.statuses[this.state - 1].text,
          speed: 4,
        },
      });
    },
  },

  mounted() {
    const $this = this;

    noUiSlider
      .create(this.$refs.slider, {
        start: 3,
        connect: true,
        range: {
          min: 1,
          max: 5,
        },
      })
      .on("change", function (values) {
        const newValue = Math.round(values);

        this.set(newValue);
        $this.state = newValue;
      });
  },
};
</script>

<style></style>
