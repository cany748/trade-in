<template>
  <div class="stepper__content" style="visibility: hidden">
    <div
      class="trade-in__list"
      :class="{ 'trade-in__list_center': Object.keys(devices).length < 4 }"
    >
      <div
        class="trade-in__item trade-in-item trade-in-item_lg"
        :class="{ 'is-checked': equipment.checked }"
        v-for="(equipment, key) in selected.model.equipment"
        :key="key"
        @click="changeChecked(equipment)"
      >
        <div class="trade-in-item__icon">
          <img
            :src="'/assets/images/trade-in/icon-' + equipment.name + '.svg'"
            :alt="equipment.name"
          />
        </div>
        <div class="trade-in-item__text">{{ equipment.name }}</div>
      </div>
    </div>
    <div class="stepper__footer">
      <button
        class="stepper__button button button_orange button_nobg stepper__button_final"
        @click="$emit('nextStep')"
      >
        Рассчитать стоимость
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangeEquipment",
  props: {
    devices: { type: Object, reqired: true },
    selected: { type: Object, reqired: true },
    animateReverse: { type: Boolean, reqired: true },
  },

  emits: ["nextStep", "backStep"],

  activated: function () {
    if (!this.selected.model.equipment.length) {
      this.$el.style.visibility = "hidden";
      if (!this.animateReverse) {
        this.$emit("nextStep");
      } else {
        this.$emit("backStep");
      }
    } else {
      this.$el.style.visibility = "visible";
    }
  },

  methods: {
    changeChecked(equipment) {
      if (!equipment.checked) {
        equipment.checked = true;
      } else {
        equipment.checked = false;
      }
    },
  },
};
</script>

<style lang="stylus"></style>
