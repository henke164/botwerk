<script setup>
import Console from "./Console.vue";
</script>
<script>
export default {
  props: ["views"],
  data() {
    return {
      selectedTab: 0,
    };
  }
}
</script>
<template>
  <div class="main-panel">
    <div class="main-content" v-if="views && views.length > 0">
      <div class="tab-wrapper">
        <a
          v-for="(t, index) in views.map(v => v.title)"
          v-bind:key="index"
          v-on:click="() => selectedTab = index"
          class="tab"
        >{{t}}</a>
      </div>
      <div
        v-for="(c, index) in views.map(v => v.component)"
        v-bind:key="index"
        :class="selectedTab === index ? 'view-component-wrapper' : ''"
      >
        <component
          v-if="selectedTab === index"
          v-bind:is="c"
        >
        </component>
      </div>
    </div>
    <div class="main-content" v-else></div>
    <Console></Console>
  </div>
</template>

<style scoped>
.main-panel {
  flex: 1;
  height: 100vh;
  background: #2a2c3f;
  display: flex;
  flex-direction: column;
}

.main-content {
  display: flex;
  flex: 1;
  min-height: 50px;
  background: #2A2C3F;
  box-shadow: 1px -1px 1px #222336 inset;
  flex-direction: column;
}

.view-component-wrapper {
  display: flex;
  flex: 1;
}

.tab-wrapper {
  background: #222336;
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
}

a:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
