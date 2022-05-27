<script setup>
import NewClientSvg from "./icons/new-client.svg";
import ArrowRightSvg from "./icons/arrow-right.svg";
import ArrowDownSvg from "./icons/arrow-down.svg";
import BlueprintSvg from "./icons/blueprint.svg";
import CogwheelSvg from "./icons/cogwheel.svg";
import CubeSvg from "./icons/cube.svg";

import NewItemInput from "../../components/NewItemInput.vue";
import { post, get } from '../../services/apiService';
import { emitAppEvent } from '../../services/appEventHandler';
</script>

<script>
export default {
  props: ["clients"],
  data() {
    return {
      showNewClientInput: false,
      newClientInputError: null,
      expanded: {},
    };
  },
  methods: {
    editNewClient() {
      this.newClientInputError = null;
      this.showNewClientInput = true;
    },
    createClient(name) {
      if (this.clients.includes(name)) {
        this.newClientInputError = "Name already exists";
        return;
      }

      post('/workspace/client', { name }).then(({ success, client }) => {
        if (!success) {
          emitAppEvent("LOG", "Failed to create client");
          return;
        }
        this.showNewClientInput = false;
        this.clients.push(client);
      });
    },
    expandKey(id) {
      if (this.expanded[id]) {
        delete this.expanded[id];
      } else {
        this.expanded[id] = true;
      }
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
          v-html="NewClientSvg"
          v-on:click="editNewClient()"
        ></a>
      </div>
    </div>
    <div v-for="client in clients" v-bind:key="client">
      <a class="list-item">
        <span
          class="icon"
          v-html="this.expanded[client.id] ? ArrowDownSvg : ArrowRightSvg"
        ></span>
        <span class="list-item-text" v-on:click="expandKey(client.id)">{{
          client.name
        }}</span>
      </a>
      <div v-if="this.expanded[client.id]">
        <div
          v-for="(item, idx) in [
            ['actions', client.actions],
            ['modellers', client.modellers],
            ['objects', client.objects],
          ]"
          v-bind:key="idx"
        >
          <a class="client-content-row list-item">
            <span
              class="icon"
              v-html="this.expanded[`${client.id}_${item[0]}`] ? ArrowDownSvg : ArrowRightSvg"
            ></span>
            <span class="list-item-text" v-on:click="expandKey(`${client.id}_${item[0]}`)">{{
              `${item[0]}`
            }}</span>
            <span class="list-item-count">
              {{`( ${(item[1] ? item[1].length : 0)} )`}}
            </span>
          </a>
          <div v-if="this.expanded[`${client.id}_${item[0]}`]">
            <div
              v-for="(child, childIdx) in item[1]"
              v-bind:key="childIdx"
            >
              <a class="client-content-child-row list-item">
                <span
                  class="icon"
                  v-html="CubeSvg"
                ></span>
                <span
                  class="list-item-text"
                  v-on:click="editFile(child.id)"
                  >{{ child.name }}</span
                >
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NewItemInput
      v-if="showNewClientInput"
      :maxLength=20
      :icon="NewClientSvg"
      :inputError="newClientInputError"
      :onEnter="createClient"
      :onCancel="() => (showNewClientInput = false)"
    />
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
  display: flex;
}

.tools {
  flex: 1;
  text-align: right;
}

.list-item-text {
  flex: 1;
  font-weight: bolder;
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
</style>
