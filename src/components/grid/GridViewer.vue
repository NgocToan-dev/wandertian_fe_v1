<template>
  <div class="h-full flex flex-col">
    <fwb-table hoverable class="flex-1">
      <fwb-table-head class="table-head border-b-2">
        <fwb-table-head-cell
          class="select-none"
          :style="{ width: column.width + 'px' }"
          v-for="(column, index) in columns"
          :key="index"
          :class="{ 'text-center': ['date', 'enum'].includes(column.dataType) }"
        >
          {{ column.name }}
        </fwb-table-head-cell>
        <fwb-table-head-cell
          class="w-10 sticky right-0 border-b-2"
          v-if="data.length > 0"
        >
          <span class="sr-only">Edit</span>
        </fwb-table-head-cell>
      </fwb-table-head>
      <fwb-table-body>
        <fwb-table-row
          v-for="(item, index) in data"
          :key="index"
          @dblclick="editRow(item)"
        >
          <fwb-table-cell
            :style="{ width: column.width + 'px' }"
            v-for="(column, index) in columns"
            :key="index"
          >
            <div
              v-if="column.enum"
              class="enum-col select-none rounded-full border-2 p-2 text-center bg-slate-100 dark:bg-inherit"
            >
              {{ commonFn.getResourceByEnum(column.enum, item[column.key]) }}
            </div>
            <div
              v-else-if="column.html"
              v-html="item[column.key]"
              class="select-none text-overflow"
            ></div>
            <div v-else-if="column.dataType == 'date'" class="select-none text-center">
              {{ commonFn.formatDate(item[column.key]) }}
            </div>
            <div v-else class="select-none">{{ item[column.key] }}</div>
          </fwb-table-cell>
          <fwb-table-cell
            class="w-10 sticky right-0 bg-gray-100 dark:bg-inherit"
            v-if="data.length > 0"
          >
            <div class="flex justify-center gap-2">
              <Icon
                @click="editRow(item)"
                icon="mdi:pencil"
                class="cursor-pointer text-xl text-blue-500 dark:text-white"
              />
              <Icon
                @click="deleteRow(item)"
                icon="mdi:delete"
                class="cursor-pointer text-xl text-red-500 dark:text-white"
              />
            </div>
          </fwb-table-cell>
        </fwb-table-row>
        <fwb-table-row v-if="data.length === 0">
          <fwb-table-cell :colspan="columns.length">No data found</fwb-table-cell>
        </fwb-table-row>
      </fwb-table-body>
    </fwb-table>
    <div class="flex justify-between mt-2">
      <div class="total-records dark:text-white">
        Total records: <b>{{ totalRecords }}</b>
      </div>
      <fwb-pagination
        :total-pages="totalPages"
        v-model="currentPage"
        @page-changed="choosePage"
        previous-label=""
        next-label=""
      >
        <template #prev-icon>
          <Icon icon="mdi:chevron-left" />
        </template>
        <template #next-icon>
          <Icon icon="mdi:chevron-right" />
        </template>
      </fwb-pagination>
    </div>
  </div>
</template>

<script setup>
import commonFn from "@/utilities/commonFn";
import { Icon } from "@iconify/vue/dist/iconify.js";
import {
  FwbA,
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
  FwbPagination,
} from "flowbite-vue";
import { computed, ref } from "vue";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    default: () => [],
  },
  totalRecords: {
    type: Number,
    default: 0,
  },
  perPage: {
    type: Number,
    default: 10,
  },
});

const currentPage = ref(1);
const totalPages = computed(() => {
  return Math.ceil(props.totalRecords / props.perPage);
});

const emits = defineEmits(["edit-row", "delete-row", "choosePage"]);

const editRow = (record) => {
  emits("edit-row", record);
};

const deleteRow = (record) => {
  emits("delete-row", record);
};

const choosePage = () => {
  emits("choosePage", currentPage.value);
};
</script>

<style lang="scss" scoped>
.table-head {
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 100;
}
</style>
