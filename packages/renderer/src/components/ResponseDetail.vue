<template>
  <h3>Response {{ data && data.statusCode }}</h3>
  <a-tabs v-model:activeKey="activeKey" type="card">
    <a-tab-pane key="1" tab="Headers"
      ><a-table
        :columns="columns"
        :data-source="headers"
        size="small"
        :pagination="false"
        @resizeColumn="handleResizeColumn"
        rowKey="id"
        :scroll="{ y: 300}"
    /></a-tab-pane>
    <a-tab-pane key="2" tab="Body">{{ body }}</a-tab-pane>
    <a-tab-pane key="3" tab="Cookie">{{ cookie }}</a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
  import { TableColumnsType } from "ant-design-vue";
  import { ref, defineComponent, PropType, onMounted, watch, toRefs } from "vue";
  import { ResponseData } from "./";
  export default defineComponent({
    props: {
      data: Object as PropType<ResponseData>,
    },

    setup(props) {
      const { data } = toRefs(props);

      const headers = ref<{ key: string; value: any }[]>([]);
      const body = ref();
      const cookie = ref("");

      const formatData = (val: ResponseData) => {
        if (val.headers) {
          let headerList: { key: string; value: any }[] = [];
          Object.keys(val.headers).forEach((key: string) => {
            headerList.push({
              key,
              value: val.headers ? val.headers[key] : "",
            });
          });
          headers.value = headerList;
        }

        body.value = val.body;
        cookie.value = val.headers ? val.headers["set-cookie"] : "";
      };

      onMounted(() => {
        if (data.value) {
          formatData(data.value);
        }
      });

      watch(data, (newVal, oldVal) => {
        if (newVal) {
          formatData(newVal);
        }
      });

      return {
        headers,
        body,
        cookie,
        activeKey: ref("1"),
        columns: ref<TableColumnsType>([
          {
            title: "Key",
            dataIndex: "key",
            key: "key",
            ellipsis: true,
            resizable: true,
            width: 180,
            minWidth: 50,
          },
          {
            title: "Value",
            dataIndex: "value",
            key: "value",
            ellipsis: true,
            // width: 150,
          },
        ]),
        handleResizeColumn: (w: number, col: any) => {
          col.width = w;
        },
      };
    },
  });
</script>