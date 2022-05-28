<script setup>
import NewClientSvg from "./icons/new-client.svg";
import CrossSvg from "./icons/cross.svg";
import CubeSvg from "./icons/cube.svg";
import NewItemInput from "../../components/NewItemInput.vue";
import { post, del } from "../../services/apiService.js";
import { emitAppEvent } from "../../services/appEventHandler";
</script>

<script>
export default {
  props: ["modelers", "reload", "selectedItem", "selectItem"],
  data() {
    return {
      showNewModelerInput: false,
    };
  },
  methods: {
    openEditModelerView(modeler) {
      emitAppEvent("SET_MAIN_PANEL_VIEW", {
        extensionView: "EditModelerView",
        params: {
          modeler,
          reload: this.reload,
        },
      });
    },
    closeEditModelerView() {
      emitAppEvent("SET_MAIN_PANEL_VIEW", {
        extensionView: null,
      });
    },
    editNewModeler() {
      this.inputError = null;
      this.showNewModelerInput = true;
    },
    async createModeler(name) {
      const res = await post("/workspace/modeler", {
        name,
      });

      if (!res.success) {
        this.inputError = "Failed to create modeler";
        return;
      }
      this.showNewModelerInput = false;
      await this.reload();
      this.selectItem(res.modeler.id);
      this.openEditModelerView(res.modeler);
    },
    async removeModeler(id) {
      const res = await del(`/workspace/modeler/${id}`);
      if (!res.success) {
        return;
      }
      this.reload();
      this.selectedIndex = null;
      this.closeEditModelerView();
    },
    toggleSelectModeler(modeler) {
      if (this.selectedItem === modeler.id) {
        this.selectItem(null);
        this.closeEditModelerView();
      } else {
        this.selectItem(modeler.id);
        this.openEditModelerView(modeler);
      }
    },
  },
};
</script>

<template>
  <div class="modelers">
    <div class="header">
      Modelers
      <div class="tools">
        <a
          title="New modeler"
          class="icon"
          v-html="NewClientSvg"
          v-on:click="editNewModeler"
        ></a>
      </div>
    </div>
    <div v-for="(modeler, index) in modelers" v-bind:key="index">
      <a
        class="list-item"
        :class="this.selectedItem === modeler.id ? 'selected' : ''"
        v-on:click="toggleSelectModeler(modeler)"
      >
        <span class="icon" v-html="CubeSvg"></span>
        <span class="list-item-text">{{ modeler.name }}</span>
        <a
          class="remove"
          v-on:click="
            (e) => {
              e.preventDefault();
              removeModeler(modeler.id);
            }
          "
          ><span v-html="CrossSvg"></span
        ></a>
      </a>
    </div>
    <NewItemInput
      v-if="showNewModelerInput"
      :maxLength="20"
      :icon="CubeSvg"
      :inputError="inputError"
      :onEnter="createModeler"
      :onCancel="() => (showNewModelerInput = false)"
    />
  </div>
</template>

<style scoped>
.remove {
  width: 25px;
  height: 25px;
  text-align: center;
}

.remove:hover {
  cursor: pointer;
}

.remove span {
  display: inline-block;
  vertical-align: middle;
  width: 15px;
  height: 10px;
  line-height: 25px;
  margin-top: -4px;
  margin-right: -2px;
}

.header {
  font-weight: bolder;
  display: flex;
}

.tools {
  flex: 1;
  text-align: right;
}

input[type="text"] {
  margin-top: 5px;
  padding: 5px;
}

button {
  width: 100%;
}

a {
  color: white;
}

.modelers {
  margin-top: 10px;
  font-size: 12px;
  line-height: 20px;
}

.modelers .icon {
  margin: 5px;
  width: 15px;
  height: 15px;
}

.list-item-text {
  flex: 1;
  line-height: 25px;
  vertical-align: middle;
}

.list-item {
  transition: background 0.1s ease;
  display: flex;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.list-item:hover {
  background: #2a2c3f;
  cursor: pointer;
}

.list-item.selected {
  background: #007aa6;
  box-shadow: inset 0px 0px 2px 1px #81c9e4;
  z-index: 2;
}
</style>

<style>
.remove span svg {
  display: none;
}

.list-item:hover .remove span svg {
  display: inherit;
}

.remove:hover span svg {
  stroke: #fff;
}
</style>
