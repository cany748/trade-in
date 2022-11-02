<template>
  <div class="trade-in block" v-if="devices.length">
    <div class="trade-in__wrapper block-wrapper">
      <div class="trade-in__title">Онлайн-оценка</div>
      <div class="trade-in__text">
        Узнайте сколько стоит ваше старое устройство
      </div>
      <AppStepper :steps="steps" :devices="devices" />
    </div>
  </div>
  <div class="new-device block">
    <div class="new-device block-wrapper"></div>
  </div>
</template>

<script>
import steps from "@/components/steps";
import AppStepper from "@/components/AppStepper.vue";

export default {
  name: "App",
  components: {
    AppStepper,
  },

  data() {
    return {
      steps: steps,
      devices: [],
    };
  },

  mounted() {
    this.devices = window.TradeIn;
  },
};
</script>

<style lang="stylus">
@import "css/modules/*"
</style>
