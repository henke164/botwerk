<script setup>
import CodeEditor from "simple-code-editor";
import TabBar from "../../../components/TabBar.vue";
import DraggableComponent from "../../../components/DraggableComponent.vue";
import ModelerSvg from "../icons/modeler.svg";

import { get, post } from "../../../services/apiService";
import { emitAppEvent } from "../../../services/appEventHandler";
</script>
<script>
export default {
  props: ["params"],
  data() {
    return {
      client: null,
      clientId: null,
      components: null,
      workspace: null,
      isDirty: false,
      componentFilter: "",
    };
  },
  watch: {
    params() {
      this.initialize();
    },
  },
  methods: {
    async initialize() {
      const { success, client } = await get(
        `/workspace/client/${this.params.client.id}`
      );

      if (!success) {
        return;
      }

      this.client = client;
      this.components = [
        ...this.params.workspace.modelers.map((m) => ({
          id: m.id,
          name: m.name,
          varName: "modelers",
          selected: this.client.modelers.includes(m.id),
        })),
        ...this.params.workspace.actions.map((m) => ({
          id: m.id,
          name: m.name,
          varName: "actions",
          selected: this.client.actions.includes(m.id),
        })),
      ];
    },
    onComponentChange(e, component) {
      if (e.target.checked) {
        this.client[component.varName].push(component.id);
      } else {
        const index = this.client[component.varName].map(
          (c) => c.id === component.id
        );
        this.client[component.varName].splice(index, 1);
      }
    },
    async handleSave() {
      if (this.client.name.length === 0) {
        return;
      }

      await post("/workspace/client", this.client);
      emitAppEvent("LOG", `Successfully updated client: ${this.client.name}!`);
      this.params.reload();
    },
  },
  mounted() {
    this.initialize();
  },
};
</script>

<template>
  <div class="panel">
    <div class="left-bar" v-if="client">
      <h4>EDIT CLIENT</h4>
      <label>Id</label>
      <div class="id">{{client.id}}</div>
      <label>Name</label>
      <div class="input-wrapper">
        <input type="text" v-model="client.name" />
      </div>
      <button v-on:click="handleSave">Save changes</button>

      <DraggableComponent
        :side="'right'"
        :min="150"
        :max="500"
      ></DraggableComponent>
    </div>
    <div class="left-bar" v-if="client">
      <div class="header">Components</div>
      <div v-if="components">
        <div class="component-filter-wrapper">
          <input type="text" placeholder="Filter" v-model="componentFilter" />
        </div>
        <label
          class="component"
          v-for="component in components.filter((c) =>
            c.name.toLowerCase().includes(componentFilter.toLowerCase())
          )"
          v-bind:key="component.id"
        >
          <input
            type="checkbox"
            v-model="component.selected"
            @change="(e) => onComponentChange(e, component)"
          />
          <span class="icon" v-html="ModelerSvg"></span>
          <span>{{ component.name }}</span>
        </label>
      </div>
      <DraggableComponent
        :side="'right'"
        :min="150"
        :max="500"
      ></DraggableComponent>
    </div>
    <div class="right-bar" v-if="client"></div>
  </div>
</template>

<style scoped>
input[type="text"] {
  flex: 1;
  width: 100%;
  border: 1px solid #595c76 !important;
}

.id {
  font-size: 10px;
  margin-bottom: 10px;
}

.component {
  display: block;
  line-height: 20px;
  margin-bottom: 5px;
}

.component input {
  vertical-align: middle;
}

.component span {
  margin-right: 5px;
}

.component:hover {
  cursor: pointer;
  text-decoration: underline;
}

.input-wrapper {
  display: flex;
}

.component-filter-wrapper {
  display: flex;
  margin-bottom: 10px;
}

.header {
  margin: 20px 0;
}

.panel {
  display: flex;
  flex-direction: row;
  flex: 1;
}

.left-bar {
  padding: 0px 20px;
  position: relative;
  min-width: 250px;
  flex-direction: column;
  overflow-y: scroll;
}

.right-bar {
  display: flex;
  width: 150px;
  flex: 1;
  flex-direction: column;
}

.editor-wrapper {
  display: flex;
  flex: 1;
}
</style>
