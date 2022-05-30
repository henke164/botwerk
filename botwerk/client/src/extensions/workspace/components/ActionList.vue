<script setup>
import PlusSvg from "../../../assets/img/plus.svg";
import CrossSvg from "../icons/cross.svg";
import CubeSvg from "../icons/cube.svg";
import NewItemInput from "../../../components/NewItemInput.vue";
import { post, del } from "../../../services/apiService.js";
import { emitAppEvent } from "../../../services/appEventHandler";
</script>

<script>
export default {
  props: ["workspace", "reload", "selectedItem", "selectItem"],
  data() {
    return {
      showNewActionInput: false,
    };
  },
  methods: {
    openEditActionView(action) {
      emitAppEvent("SET_MAIN_PANEL_VIEW", {
        extensionView: "EditActionView",
        params: {
          action,
          reload: this.reload,
        },
      });
    },
    closeEditActionView() {
      emitAppEvent("SET_MAIN_PANEL_VIEW", {
        extensionView: null,
      });
    },
    editNewAction() {
      this.inputError = null;
      this.showNewActionInput = true;
    },
    async createAction(name) {
      const res = await post("/workspace/action", {
        name,
      });

      if (!res.success) {
        this.inputError = "Failed to create action";
        return;
      }
      this.showNewActionInput = false;
      await this.reload();
      this.selectItem(res.action.id);
      this.openEditActionView(res.action);
    },
    async removeAction(id) {
      const res = await del(`/workspace/action/${id}`);
      if (!res.success) {
        return;
      }
      this.reload();
      this.selectedIndex = null;
      this.closeEditActionView();
    },
    toggleSelectAction(action) {
      if (this.selectedItem === action.id) {
        this.selectItem(null);
        this.closeEditActionView();
      } else {
        this.selectItem(action.id);
        this.openEditActionView(action);
      }
    },
  },
};
</script>

<template>
  <div class="actions">
    <div class="header">
      Actions
      <div class="tools">
        <a
          title="New action"
          class="icon"
          v-html="PlusSvg"
          v-on:click="editNewAction"
        ></a>
      </div>
    </div>
    <div v-for="(action, index) in workspace.actions" v-bind:key="index">
      <a
        class="list-item"
        :class="this.selectedItem === action.id ? 'selected' : ''"
        v-on:click="toggleSelectAction(action)"
      >
        <span class="icon" v-html="CubeSvg"></span>
        <span class="list-item-text">{{ action.name }}</span>
        <a
          class="remove"
          v-on:click="
            (e) => {
              e.preventDefault();
              removeAction(action.id);
            }
          "
          ><span v-html="CrossSvg"></span
        ></a>
      </a>
    </div>
    <NewItemInput
      v-if="showNewActionInput"
      :maxLength="20"
      :icon="CubeSvg"
      :inputError="inputError"
      :onEnter="createAction"
      :onCancel="() => (showNewActionInput = false)"
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

.actions {
  margin-top: 10px;
  font-size: 12px;
  line-height: 20px;
}

.actions .icon {
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
