<script>
export default {
  props: ["tabs", "onTabSelected"],
  data() {
    return {
      selectedTab: 0,
    };
  },
  methods: {
    selectTab(index) {
      this.selectedTab = index;
      if (this.onTabSelected) {
        this.onTabSelected(index);
      }
    },
  },
}
</script>
<template>
  <div class="tab-wrapper">
    <a
      v-for="(t, index) in tabs.map((v) => v.title)"
      v-bind:key="index"
      v-on:click="() => selectTab(index)"
      class="tab"
      :class="selectedTab === index ? 'active' : ''"
      >{{ t }}</a
    >
  </div>
</template>

<style scoped>
.tab-wrapper {
  background: #2a2c3f;
  height: 30px;
}

.tab {
  font-size: 12px;
  display: inline-block;
  border-left: 1px solid #3f4455;
  border-right: 1px solid #3f4455;
  min-width: 100px;
  line-height: 30px;
  vertical-align: bottom;
  text-align: center;
  padding-left: 20px;
  padding-right: 20px;
}

.tab.active {
  background: #222336;
}

a:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
