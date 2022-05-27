<script setup>
import PlusSvg from "../../assets/img/plus.svg";
import MinusSvg from "../../assets/img/minus.svg";
import CubeSvg from "./icons/cube.svg";
import NewItemInput from "../../components/NewItemInput.vue";
import { get, post, del } from "../../services/apiService.js";
import { emitAppEvent } from "../../services/appEventHandler";
</script>

<script>
export default {
  data() {
    return {
      selectedIndex: null,
      modelers: [],
      showNewModelerInput: false,
    };
  },
  mounted() {
    get("/workspace/modeler").then((res) => {
      this.modelers = res;
    });
  },
  methods: {
    editNewModeler() {
      this.inputError = null;
      this.showNewModelerInput = true;
    },
    createModeler(name) {
      post("/workspace/modeler", {
        name,
      }).then((res) => {
        if (!res.success) {
          this.inputError = "Name already exists";
          return;
        }
        this.showNewModelerInput = false;
        this.modelers.push(res.modeler);
        this.selectedIndex = this.modelers.length - 1;
      });
    },
    removeSelectedModeler() {
      if (this.selectedIndex === null) {
        return;
      }
      const modeler = this.modelers[this.selectedIndex];
      del(`/workspace/modeler/${modeler.id}`).then((res) => {
        if (res.success) {
          this.modelers.splice(this.selectedIndex, 1);
          this.selectedIndex = null;
        }
      });
    },
    toggleSelectModeler(modeler) {
      if (this.selectedIndex === this.modelers.indexOf(modeler)) {
        this.selectedIndex = null;
        emitAppEvent("SET_MAIN_PANEL_VIEW", {
          extensionView: null,
        });
      } else {
        this.selectedIndex = this.modelers.indexOf(modeler);
        emitAppEvent("SET_MAIN_PANEL_VIEW", {
          extensionView: "ModelLogicCreate",
          params: {
            modelerId: modeler.id,
          },
        });
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
          v-html="PlusSvg"
          v-on:click="editNewModeler"
        ></a>
        <a
          title="Remove selected modeler"
          class="icon"
          v-html="MinusSvg"
          v-on:click="removeSelectedModeler"
        ></a>
      </div>
    </div>
    <div v-for="(modeler, index) in modelers" v-bind:key="index">
      <a
        class="list-item"
        :class="selectedIndex === index ? 'selected' : ''"
        v-on:click="toggleSelectModeler(modeler)"
      >
        <span class="icon" v-html="CubeSvg"></span>
        <span class="list-item-text">{{ modeler.name }}</span>
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
.header {
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

.tools .icon {
  margin: 0;
  margin-left: 10px;
}

.list-item-text {
  flex: 1;
  line-height: 25px;
  vertical-align: middle;
}

.list-item {
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
  border: 1px solid #81c9e4;
  margin: -2px;
}
</style>
