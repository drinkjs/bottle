<template>
  <main class="main">
    <div class="reqList">
      <a-table
        :columns="columns"
        :data-source="reqDatas"
        size="small"
        :pagination="false"
        :scroll="{ y: '93vh', x: '100%' }"
        @resizeColumn="handleResizeColumn"
        :customRow="handleCustomRow"
        :rowClassName="handleRowClassName"
        rowKey="id"
      />
    </div>
    <section class="detailBox">
      <template v-if="selectData !== undefined">
        <div class="reqBox"><RequestDetail :data="selectData.reqData" /></div>
        <div class="resBox"><ResponseDetail :data="selectData.resData" /></div>
      </template>
    </section>
  </main>
</template>

<script lang="ts">
  import { ref, defineComponent } from "vue";
  import { ipcRenderer } from "electron";
  import { TableColumnsType } from "ant-design-vue";
  import { RequestData, ResponseData } from "./";
  import ResponseDetail from "./ResponseDetail.vue";
  import RequestDetail from "./RequestDetail.vue";

  // defineProps<{ msg: string }>();

  export default defineComponent({
    components: {
      ResponseDetail,
      RequestDetail,
    },

    setup() {
      const columns = ref<TableColumnsType>([
        {
          title: "#",
          dataIndex: "id",
          key: "id",
          ellipsis: true,
          resizable: true,
          width: 50,
          customRender: ({ text, record, index }: any) => index + 1,
        },
        {
          title: "Status",
          dataIndex: "statusCode",
          key: "statusCode",
          ellipsis: true,
          resizable: true,
          width: 150,
          maxWidth: 150,
          align: "center",
          customRender: ({ text, record, index }: any) => (!text ? "--" : text),
        },
        {
          title: "Protocol",
          dataIndex: "protocol",
          key: "protocol",
          ellipsis: true,
          resizable: true,
          width: 100,
          align: "center",
        },
        {
          title: "Host",
          dataIndex: "host",
          key: "host",
          ellipsis: true,
          resizable: true,
          width: 150,
        },
        {
          title: "Path",
          dataIndex: "pathname",
          key: "pathname",
          ellipsis: true,
          resizable: true,
          width: 150,
        },
        // {
        //   title: "Body",
        //   dataIndex: "body",
        // },
        {
          title: "Content-Type",
          dataIndex: "contentType",
          key: "contentType",
          ellipsis: true,
          width: 100,
          // resizable: true,
          // width: 100,
        },
      ]);
      // 所有请求数据
      const reqDatas = ref<RequestData[]>([]);
      const resDatas = ref<ResponseData[]>([]);
      // 当前选择的数据
      const selectData = ref<{ reqData: RequestData; resData?: ResponseData }>();

      // 接收主进程发过来的信息
      ipcRenderer.on("/bottle/request", (event, result: RequestData) => {
        reqDatas.value.push(result);
        if (reqDatas.value.length >= 1200) {
          reqDatas.value.splice(0, reqDatas.value.length - 1200);
        }
      });

      // 请求结果
      ipcRenderer.on("/bottle/response", (event, result: ResponseData) => {
        resDatas.value.push(result);
        const reqData = reqDatas.value.find((v) => v.id === result.id);
        if (reqData) {
          reqData.statusCode = result.statusCode;
          reqData.contentType = result.headers
            ? result.headers["content-type"]
            : undefined;
        }
        if (selectData.value && selectData.value.reqData.id === result.id) {
          selectData.value.resData = result;
        }
      });

      return {
        reqDatas,
        resDatas,
        columns,
        selectData,
        handleResizeColumn: (w: number, col: any) => {
          col.width = w;
        },
        handleCustomRow: (record: RequestData) => {
          return {
            onClick: () => {
              selectData.value = {
                reqData: record,
                resData: resDatas.value.find((v) => v.id === record.id),
              };
            },
          };
        },
        handleRowClassName: (record: RequestData, index: number) => {
          return selectData.value && record.id === selectData.value.reqData.id
            ? "rowSelected"
            : null;
        },
      };
    },
  });
</script>
<style>
  .rowSelected {
    background-color: #d7e1f8;
  }
  .ant-table-tbody
    > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)
    > td {
    background: #d7e1f8;
  }
</style>
<style scoped>
  .main {
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
  .reqList {
    width: 50%;
    border-right: 2px solid #ccc;
  }
  .detailBox {
    width: 50%;
    display: flex;
    flex-direction: column;
    padding: 0 6px;
    height: 100%;
  }
  .reqBox {
    height: 50%;
  }
  .resBox {
    height: 50%;
    border-top: 2px solid #ccc;
    padding-top: 12px;
  }
</style>