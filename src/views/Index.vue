<template>
  <a-config-provider :locale="locale">
    <a-row>
      <a-col :span="22" :offset="1">
        <h1>Grid</h1>
        <grid
      /></a-col>
    </a-row>
  </a-config-provider>
</template>

<script>
import ruRU from "ant-design-vue/lib/locale-provider/ru_RU";
import Grid from "@/components/Grid";

export default {
  components: {
    Grid,
  },
  data() {
    return {
      locale: ruRU,
    };
  },
};
</script>

