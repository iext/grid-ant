 <template>
  <div v-if="!isLoading">
    <a-table
      rowKey="id"
      :columns="columns"
      :data-source="dataSource"
      bordered
      class="components-table-demo-nested"
      @expandedRowsChange="expanded"
    >
      <a-table
        rowKey="id"
        :columns="innerColumns"
        :data-source="innerDataSource"
        :pagination="false"
        slot="expandedRowRender"
      ></a-table>
    </a-table>
  </div>
  <div v-else-if="isError">
    <a-alert type="error" message="Ошибка загрузки данных..." banner />
  </div>
  <div v-else>
    <a-spin tip="Загрузка данных...">
      <div class="spin-content"></div>
    </a-spin>
  </div>
</template> 

<script>
import { mapState } from "vuex";
import { getColumns } from "@/common/helpers";

export default {
  data() {
    return {
      innerDataSource: [],
      rowIndex: 1,
    };
  },
  created() {
    this.$store.dispatch("loadData");
  },
  computed: {
    /**
     * Получаем состояния из store
     * @dataSource - данные из API
     * @isLoading - флаг загрузки данных, true - данные загружаются, false - данные загружены
     * @errors - хранит ошибки при обращении к API
     */
    ...mapState(["dataSource", "isLoading", "errors"]),

    /**
     * Получаем список полей основной таблицы
     * (только для примера, поля получаем прямо из данных, без алиасов)
     */
    columns() {
      return getColumns(this.dataSource);
    },

    /**
     * Получаем список полей вложенной таблицы
     */
    innerColumns() {
      return getColumns(this.innerDataSource);
    },

    /**
     * Если есть ошибки, отображем уведомление на странице
     */
    isError() {
      return this.errors.length > 0;
    },
  },
  methods: {
    /**
     * Событие при раскрытии строки.
     * Вставляем во вложенную таблицу связанные данные.
     * @param {rowIndex} - id записи
     */
    expanded(rowIndex) {
      this.innerDataSource = this.dataSource
        .filter((item) => rowIndex.includes(item.id))
        .map((item) => {
          /**
           * Для тестового задания убираем третий уровень вложенности и удаляем свойство geo
           */
          delete item.address.geo;
          return { id: item.id, ...item.address };
        });
    },
  },
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>