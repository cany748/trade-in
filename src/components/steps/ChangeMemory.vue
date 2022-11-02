<template>
  <div class="stepper__content">
    <div
      class="trade-in__list"
      :class="{ 'trade-in__list_center': Object.keys(devices).length < 4 }"
    >
      <div
        class="trade-in__item trade-in-item trade-in-item_lg"
        v-for="(memory, key) in selected.model.memory"
        :key="key"
        @click="$emit('nextStep', { memory })"
      >
        <div class="trade-in-item__icon">
          <img
            src="/assets/images/trade-in/icon-memory.svg"
            :alt="memory.name"
          />
          <span>{{ parseInt(memory.name) }}</span>
        </div>
        <div class="trade-in-item__text">{{ memory.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangeMemory",
  props: {
    devices: { type: Object, reqired: true },
    selected: { type: Object, reqired: true },
    animateReverse: { type: Boolean, reqired: true },
  },

  emits: ["nextStep", "backStep"],

  activated: function () {
    if (!this.selected.model.memory.length) {
      if (!this.animateReverse) {
        this.$emit("nextStep", { memory: { price: 0 } });
      } else {
        this.$emit("backStep");
      }
    }
  },
};
</script>

<style lang="stylus"></style>
