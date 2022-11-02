<template>
  <div class="stepper__content">
    <form js-callback-form class="trade-in__form trade-in-form">
      <div class="callback__field-title">Ваше имя</div>
      <label
        class="field callback__field callback__field_icon callback__field_icon-user"
      >
        <input
          placeholder="Введите свое имя"
          type="text"
          name="name"
          class="field__input"
        />
      </label>
      <div class="callback__field-title">Ваш номер телефона</div>
      <label
        class="field callback__field callback__field_icon callback__field_icon-phone"
      >
        <input
          ref="tel"
          placeholder="+7 (___) ___-__-__"
          type="tel"
          name="tel"
          class="field__input"
          required
        />
        <span class="field__error">Поле обязательно для заполнения!</span>
      </label>
      <div class="trade-in-form__price-title">Предварительная цена выкупа</div>
      <div class="trade-in-form__price"><span ref="price">0</span> ₽</div>
      <!-- <button
        type="submit"
        class="button button_orange button_nobg callback__button"
      >
        Получить скидку на новое
      </button> -->
      <input type="hidden" ref="input" name="tradein" />
      <button type="submit" class="button button_orange callback__button">
        Продать
      </button>
    </form>
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  name: "ChangeCondition",
  props: {
    devices: { type: Object, reqired: true },
    selected: { type: Object, reqired: true },
  },

  data() {
    return {
      price: 0,
    };
  },

  activated() {
    this.price = 0;
    this.price += Number(this.selected.model.baseprice);

    if (this.selected.memory) this.price += Number(this.selected.memory.price);

    this.price += Number(this.selected.model.status[this.selected.status - 1]);

    if (this.selected.model.equipment && this.selected.model.equipment.length) {
      this.selected.model.equipment.forEach((item) => {
        if (item.checked) this.price += Number(item.price);
      });
    }

    gsap.to(this.$refs.price, {
      duration: 3,
      delay: 0.35,
      ease: "power3.out",
      snap: "innerText",
      innerText: this.$data.price,
    });

    let text = "";

    text += "Модель: " + this.selected.model.name;
    if (this.selected.memory)
      text += "<br> Память: " + this.selected.memory.name;
    text += "<br> Состояние: " + this.selected.status;
    if (this.selected.model.equipment && this.selected.model.equipment.length) {
      this.selected.model.equipment.forEach((item) => {
        if (item.checked) text += "<br> Комплектация: " + item.name;
      });
    }

    this.$refs.input.value = text;
  },
};
</script>

<style></style>
