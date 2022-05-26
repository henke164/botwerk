<script setup>
import NewProfileSvg from "./icons/new-profile.svg";
import ArrowRightSvg from "./icons/arrow-right.svg";
import ArrowDownSvg from "./icons/arrow-down.svg";
import BlueprintSvg from "./icons/blueprint.svg";
import CogwheelSvg from "./icons/cogwheel.svg";
import CubeSvg from "./icons/cube.svg";

import NewProfileInput from "./components/NewProfileInput.vue";
</script>

<script>
export default {
  props: ["setAvailableViews"],
  data() {
    return {
      profiles: [
        {
          id: "abc123",
          name: "Default",
          modellers: {
            expanded: false,
            content: [
              {
                id: 124324,
                name: "a",
              },
            ],
          },
          actions: {
            expanded: false,
            content: [
              {
                id: 124324,
                name: "a",
              },
            ],
          },
          objects: {
            expanded: false,
            content: [
              {
                id: 124324,
                name: "a",
              },
            ],
          },
          expanded: false,
        },
      ],
      showNewProfileInput: false,
      newProfileInputError: null,
    };
  },
  methods: {
    editNewProfile() {
      this.newProfileInputError = null;
      this.showNewProfileInput = true;
    },
    createProfile(name) {
      if (this.profiles.includes(name)) {
        this.newProfileInputError = "Name already exists";
        return;
      }

      this.showNewProfileInput = false;
      this.profiles.push({
        id: "abc123",
        name,
        modellers: {
          expanded: false,
          content: [],
        },
        actions: {
          expanded: false,
          content: [
            {
              id: 124324,
              name: "a",
            },
          ],
        },
        objects: {
          expanded: false,
          content: [
            {
              id: 124324,
              name: "a",
            },
          ],
        },
        expanded: false,
      });
    },
    expandItem(item) {
      item.expanded = !item.expanded;
    },
  },
  mounted() {
    this.setAvailableViews([]);
  },
};
</script>

<template>
  <div class="panel">
    <h4>WORKSPACE</h4>
    <div class="tools">
      <a
        title="New profile"
        class="icon"
        :style="`background-image: url(${NewProfileSvg})`"
        v-on:click="editNewProfile()"
      ></a>
    </div>
    <div class="profiles">
      <div v-for="profile in profiles" v-bind:key="profile">
        <a class="list-item">
          <span
            class="icon"
            :style="`background-image: url(${
              profile.expanded ? ArrowDownSvg : ArrowRightSvg
            })`"
          ></span>
          <span class="list-item-text" v-on:click="expandItem(profile)">{{
            profile.name
          }}</span>
        </a>
        <div v-if="profile.expanded">
          <div
            v-for="(item, idx) in [
              ['actions', profile.actions],
              ['modellers', profile.modellers],
              ['objects', profile.objects],
            ]"
            v-bind:key="idx"
          >
            <a class="profile-content-row list-item">
              <span
                class="icon"
                :style="`background-image: url(${
                  item[1].expanded ? ArrowDownSvg : ArrowRightSvg
                })`"
              ></span>
              <span class="list-item-text" v-on:click="expandItem(item[1])">{{
                item[0]
              }}</span>
            </a>
            <div v-if="item[1].expanded">
              <div
                v-for="(child, childIdx) in item[1].content"
                v-bind:key="childIdx"
              >
                <a class="profile-content-child-row list-item">
                  <span
                    class="icon"
                    :style="`background-image: url(${CubeSvg})`"
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
      <NewProfileInput
        v-if="showNewProfileInput"
        :inputError="newProfileInputError"
        :onEnter="createProfile"
        :onCancel="() => (showNewProfileInput = false)"
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

.profiles {
  margin-top: 10px;
  font-size: 12px;
  line-height: 20px;
}

.profiles .icon {
  margin: 5px;
  width: 15px;
  height: 15px;
}

.profile-content-row {
  padding-left: 10px;
}

.profile-content-child-row {
  padding-left: 25px;
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
</style>
