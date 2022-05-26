<script>
import { addAppEventListener } from "../../services/appEventHandler";

export default {
  data() {
    return {
      profiles: [],
    };
  },
  methods: {},
};
</script>

<template>
  <div class="panel">
    <h4>WORKSPACE</h4>
    <div class="">
      <a href="#"><span></span> New</a>
    </div>
  </div>
</template>

<style scoped>
.panel {
  display: block;
  background: #222336;
  position: relative;
}

input[type="text"] {
  width: calc(100% - 30px);
}

button {
  width: 100%;
}
</style>
