import { markRaw } from "vue";
import ChangeDevice from "@/components/steps/ChangeDevice.vue";
import ChangeModel from "@/components/steps/ChangeModel.vue";
import ChangeMemory from "@/components/steps/ChangeMemory.vue";
import ChangeStatus from "@/components/steps/ChangeStatus.vue";
import ChangeEquipment from "@/components/steps/ChangeEquipment.vue";
import FormSubmitting from "@/components/steps/FormSubmitting.vue";

const steps = markRaw([
  {
    title: "Выберите устройство",
    component: ChangeDevice,
  },
  {
    title: "Выберите модель",
    component: ChangeModel,
  },
  {
    title: "Выберите объём памяти",
    component: ChangeMemory,
  },
  {
    title: "Выберите состояние устройства",
    component: ChangeStatus,
    showNextButton: true,
  },
  {
    title: "Выберите наличие комлпектации",
    component: ChangeEquipment,
    showNextButton: true,
  },
  {
    title: "Стоимость устройства",
    component: FormSubmitting,
  },
]);

export default steps;
