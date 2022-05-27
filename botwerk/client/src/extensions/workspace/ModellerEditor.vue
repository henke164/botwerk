<script setup>
import PlusSvg from "../../assets/img/plus.svg";
import MinusSvg from "../../assets/img/minus.svg";
import CubeSvg from "./icons/cube.svg";
import NewItemInput from "../../components/NewItemInput.vue";
import { get, post, del } from "../../services/apiService.js";
import { emitAppEvent } from '../../services/appEventHandler';
</script>

<script>
export default {
  data() {
    return {
      selectedIndex: null,
      modellers: [],
      showNewModellerInput: false,
    };
  },
  mounted() {
    get("/modeller").then((res) => {
      this.modellers = res;
    });
  },
  methods: {
    editNewModeller() {
      this.inputError = null;
      this.showNewModellerInput = true;
    },
    createModeller(name) {
      post("/modeller", {
        name,
      }).then((res) => {
        if (!res.success) {
          this.inputError = "Name already exists";
          return;
        }
        this.showNewModellerInput = false;
        this.modellers.push(res.modeller);
        this.selectedIndex = this.modellers.length - 1;
      });
    },
    removeSelectedModeller() {
      if (this.selectedIndex === null) {
        return;
      }
      const modeller = this.modellers[this.selectedIndex];
      del(`/modeller/${modeller.id}`).then((res) => {
        if (res.success) {
          this.modellers.splice(this.selectedIndex, 1);
          this.selectedIndex = null;
        }
      });
    },
    toggleSelectModeller(modeller) {
      if (this.selectedIndex === this.modellers.indexOf(modeller)) {
        this.selectedIndex = null;
        emitAppEvent("SET_MAIN_PANEL_VIEW", {
          extensionView: null,
        });
      } else {
        this.selectedIndex = this.modellers.indexOf(modeller);
        emitAppEvent("SET_MAIN_PANEL_VIEW", {
          extensionView: "ModelLogicCreate",
          params: {
            modellerId: modeller.id,
          },
        });
      }
    },
  },
};
</script>

<template>
  <div class="modellers">
    <div class="header">
      Modellers
      <div class="tools">
        <a
          title="New modeller"
          class="icon"
          v-html="PlusSvg"
          v-on:click="editNewModeller"
        ></a>
        <a
          title="Remove selected modeller"
          class="icon"
          v-html="MinusSvg"
          v-on:click="removeSelectedModeller"
        ></a>
      </div>
    </div>
    <div v-for="(modeller, index) in modellers" v-bind:key="index">
      <a
        class="list-item"
        :class="selectedIndex === index ? 'selected' : ''"
        v-on:click="toggleSelectModeller(modeller)"
      >
        <span class="icon" v-html="CubeSvg"></span>
        <span class="list-item-text">{{ modeller.name }}</span>
      </a>
    </div>
    <NewItemInput
      v-if="showNewModellerInput"
      :maxLength="20"
      :icon="CubeSvg"
      :inputError="inputError"
      :onEnter="createModeller"
      :onCancel="() => (showNewModellerInput = false)"
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

.modellers {
  margin-top: 10px;
  font-size: 12px;
  line-height: 20px;
}

.modellers .icon {
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
