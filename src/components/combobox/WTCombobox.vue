<template>
  <div class="w-full">
    <span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
      label
    }}</span>
    <FwbDropdown close-inside>
      <template #trigger>
        <div class="border rounded-md p-2 bg-white dark:bg-inherit">
          <!-- multiple choice -->
          <div class="list-items flex flex-wrap">
            <div
              v-for="item in selectedItems"
              :key="item[valueField]"
              class="select-none tag text-xs flex gap-1 w-fit items-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-full px-2 py-1 mr-1 mb-1"
            >
              {{ item[displayField] }}
              <div @click.stop="removeTag(item)" class="tag-close cursor-pointer">
                <Icon icon="bi:x" />
              </div>
            </div>
          </div>
          <input
            type="text"
            v-model="searchValue"
            class="border-none outline-none ring-0 bg-inherit h-7"
          />
        </div>
      </template>
      <FwbListGroup>
        <FwbListGroupItem
          v-for="item in filterData"
          :key="item[valueField]"
          :value="item[valueField]"
          @click="chooseItem(item)"
        >
          {{ item[displayField] }}
        </FwbListGroupItem>
      </FwbListGroup>
    </FwbDropdown>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { FwbDropdown, FwbInput, FwbListGroup, FwbListGroupItem } from "flowbite-vue";
import { computed, getCurrentInstance, onMounted, ref, watch } from "vue";

const { proxy } = getCurrentInstance();
const selectedItems = defineModel({
  prop: "modelValue",
  default: [],
});

const searchValue = ref("");

const props = defineProps({
  data: {
    required: true,
    type: Array,
    default: [],
  },
  valueField: {
    required: true,
    type: String,
    default: "value",
  },
  displayField: {
    required: true,
    type: String,
    default: "name",
  },
  label: {
    type: String,
    default: "",
  },
});

const filterData = computed(() => {
  const dataSelected = [...selectedItems.value];

  return props.data.filter((x) => {
    const isSearch = x[props.displayField]
      .toLowerCase()
      .includes(searchValue.value.toLowerCase());
    const isSelected = dataSelected.find(
      (y) => y[props.valueField] === x[props.valueField]
    );
    return isSearch && !isSelected;
  });
});

const removeTag = (item) => {
  const index = selectedItems.value.findIndex(
    (x) => x[props.valueField] === item[props.valueField]
  );
  selectedItems.value.splice(index, 1);
};
const chooseItem = (item) => {
  if (!selectedItems.value.find((x) => x[props.valueField] === item[props.valueField])) {
    proxy.$nextTick(() => {
      // Using assign to trigger reactivity
      selectedItems.value = [...selectedItems.value, item];
    });
  }
};
</script>

<style lang="scss" scoped></style>
