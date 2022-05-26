<script setup>
import PlusSvg from "../../assets/img/plus.svg";
import MinusSvg from "../../assets/img/minus.svg";
import CubeSvg from "./icons/cube.svg";
import NewItemInput from "../../components/NewItemInput.vue";
</script>

<script>
export default {
  data() {
    return {
      selectedIndex: null,
      modellers: ["Some"],
      showNewModellerInput: false,
    };
  },
  methods: {
    editNewModeller() {
      this.inputError = null;
      this.showNewModellerInput = true;
    },
    createModeller(name) {
      if (this.modellers.includes(name)) {
        this.inputError = "Name already exists";
        return;
      }

      this.showNewModellerInput = false;
      this.modellers.push(name);
      this.selectedIndex = this.modellers.length - 1;
    },
    selectModeller(name) {
      if (this.selectedIndex === this.modellers.indexOf(name)) {
        this.selectedIndex = null;
      } else {
        this.selectedIndex = this.modellers.indexOf(name);
      }
    }
  },
};
</script>

<template>
  <div class="panel">
    <h4>MODELLERS</h4>
    <div class="tools">
      <a
        title="New modeller"
        class="icon"
        :style="`background-image: url(${PlusSvg})`"
        v-on:click="editNewModeller"
      ></a>
      <a
        title="New modeller"
        class="icon"
        :style="`background-image: url(${MinusSvg})`"
        v-on:click="editNewModeller"
      ></a>
    </div>
    <div class="modellers">
      <div v-for="(modeller, index) in modellers" v-bind:key="modeller">
        <a
          class="list-item"
          :class="selectedIndex === index ? 'selected' : ''"
          v-on:click="selectModeller(modeller)"
        >
          <span
            class="icon"
            :style="`background-image: url(${CubeSvg})`"
          ></span>
          <span class="list-item-text">{{
            modeller
          }}</span>
        </a>
      </div>
      <NewItemInput
        v-if="showNewModellerInput"
        :maxLength=20
        :icon="CubeSvg"
        :inputError="inputError"
        :onEnter="createModeller"
        :onCancel="() => (showNewModellerInput = false)"
      />
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
  margin: 5px;
  width: 10px;
  height: 10px;
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
  background: #2A2C3F;
  cursor: pointer;
}

.list-item.selected {
  background: #007aa6;
  border: 1px solid #81c9e4;
  margin: -2px;
}
</style>
