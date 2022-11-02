<template>
  <div class="stepper__content">
    <div
      class="trade-in__list"
      :class="{ 'trade-in__list_center': Object.keys(devices).length < 4 }"
    >
      <div
        class="trade-in__item trade-in-item trade-in-item_lg"
        v-for="(device, key) in devices"
        :key="key"
        @click="$emit('nextStep', { models: device.models })"
      >
        <div class="trade-in-item__icon">
          <img
            :src="'/assets/images/trade-in/icon-' + device.name + '.svg'"
            :alt="device.name"
          />
        </div>
        <input v-if="false" type="checkbox" class="trade-in-item__checkbox" />
        <div class="trade-in-item__text">
          {{ device.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangeDevice",
  props: {
    devices: { type: Object, reqired: true },
    selected: { type: Object, reqired: true },
  },
  emits: ["nextStep"],
};
</script>

<style lang="stylus"></style>
