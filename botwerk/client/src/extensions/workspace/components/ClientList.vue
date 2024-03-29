<script setup>
import PlusSvg from "../../../assets/img/plus.svg";
import CrossSvg from "../icons/cross.svg";
import ArrowRightSvg from "../icons/arrow-right.svg";
import ArrowDownSvg from "../icons/arrow-down.svg";
import CubeSvg from "../icons/cube.svg";

import NewItemInput from "../../../components/NewItemInput.vue";
import { post, del } from "../../../services/apiService";
import { emitAppEvent } from "../../../services/appEventHandler";
</script>

<script>
export default {
  props: ["workspace", "reload", "selectedItem", "selectItem"],
  data() {
    return {
      showNewClientInput: false,
      newClientInputError: null,
      expanded: {},
    };
  },
  methods: {
    getComponentName(id) {
      return [...this.workspace.modelers, ...this.workspace.actions].find(
        (m) => m.id === id
      ).name;
    },
    editNewClient() {
      this.newClientInputError = null;
      this.showNewClientInput = true;
    },
    async createClient(name) {
      const { success } = await post("/workspace/client", { name });
      if (!success) {
        emitAppEvent("LOG", "Failed to create client");
        return;
      }
      this.showNewClientInput = false;
      this.reload();
    },
    async removeClient(id) {
      const { success } = await del(`/workspace/client/${id}`);
      if (!success) {
        emitAppEvent("LOG", `Failed to remove client ${id}`);
        return;
      }
      this.reload();
    },
    toggleExpand(key) {
      if (this.expanded[key]) {
        delete this.expanded[key];
      } else {
        this.expanded[key] = true;
      }
    },
    selectClient(client) {
      if (this.expanded[client.id] && this.selectedItem === client.id) {
        this.selectItem(null);
        delete this.expanded[client.id];
        emitAppEvent("SET_MAIN_PANEL_VIEW", null);
      } else {
        this.selectItem(client.id);
        this.expanded[client.id] = true;
        emitAppEvent("SET_MAIN_PANEL_VIEW", {
          extensionView: "EditClientView",
          params: {
            client,
            workspace: this.workspace,
            reload: this.reload,
          },
        });
      }
    },
    editObject(client, objectId) {
      this.selectItem(`${client.id}_object_${objectId}`);
      emitAppEvent("SET_MAIN_PANEL_VIEW", {
        extensionView: "ObjectViewer",
        params: {
          clientId: client.id,
          objectId,
          reload: this.reload,
        },
      });
    },
    async removeObject(client, objectId) {
      const { success } = await del(
        `/workspace/object/${client.id}/${objectId}`
      );
      if (!success) {
        emitAppEvent("LOG", `Failed to remove object ${objectId}`);
        return;
      }
      this.reload();
    },
  },
};
</script>

<template>
  <div class="clients">
    <div class="header">
      Clients
      <div class="tools">
        <a
          title="New client"
          class="icon"
          v-html="PlusSvg"
          v-on:click="editNewClient()"
        ></a>
      </div>
    </div>
    <div v-for="client in workspace.clients" v-bind:key="client">
      <a
        class="list-item"
        :class="this.selectedItem === client.id ? 'selected' : ''"
        v-on:click="selectClient(client)"
      >
        <span
          class="icon"
          v-html="this.expanded[client.id] ? ArrowDownSvg : ArrowRightSvg"
        ></span>
        <span class="list-item-text">{{ client.name }}</span>
        <a class="remove" v-on:click="removeClient(client.id)"
          ><span v-html="CrossSvg"></span
        ></a>
      </a>
      <div v-if="this.expanded[client.id]">
        <div
          v-if="Object.keys(client.objects).length === 0"
          class="no-objects-message"
        >
          No objects
        </div>
        <div
          v-for="(key, childIdx) in Object.keys(client.objects)"
          v-bind:key="childIdx"
        >
          <a
            class="client-content-child-row list-item"
            :class="
              this.selectedItem === `${client.id}_object_${key}`
                ? 'selected'
                : ''
            "
            v-on:click="() => editObject(client, key)"
          >
            <span class="icon" v-html="CubeSvg"></span>
            <span class="list-item-text">{{ key }}</span>
            <a class="remove" v-on:click="removeObject(client, key)"
              ><span v-html="CrossSvg"></span
            ></a>
          </a>
        </div>
      </div>
    </div>
    <NewItemInput
      v-if="showNewClientInput"
      :maxLength="20"
      :icon="PlusSvg"
      :inputError="newClientInputError"
      :onEnter="createClient"
      :onCancel="() => (showNewClientInput = false)"
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

.clients {
  margin-top: 10px;
  font-size: 12px;
  line-height: 20px;
}

.clients .icon {
  margin: 5px;
  width: 15px;
  height: 15px;
}

.client-content-row {
  padding-left: 10px;
}

.client-content-child-row {
  padding-left: 25px;
}

.header {
  font-weight: bolder;
  display: flex;
}

.tools {
  flex: 1;
  text-align: right;
}

.no-objects-message {
  margin-left: 20px;
  font-style: italic;
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
