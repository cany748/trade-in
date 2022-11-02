<template>
  <div class="stepper__content">
    <div class="trade-in__list">
      <div
        class="trade-in__item trade-in-item trade-in-item_md"
        v-for="(model, key) in selected.models"
        :key="key"
        @click="$emit('nextStep', { model })"
      >
        <div class="trade-in-item__icon">
          <img
            :src="'/assets/images/trade-in/icon-' + model.type + '.svg'"
            :alt="model.name"
          />
        </div>
        <input v-if="false" type="checkbox" class="trade-in-item__checkbox" />
        <div class="trade-in-item__text">{{ model.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangeModel",
  props: {
    devices: { type: Object, reqired: true },
    selected: { type: Object, reqired: true },
  },
  emits: ["nextStep"],
};
</script>

<style lang="stylus"></style>
