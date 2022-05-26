<script setup>
import { nextTick } from "vue";
import NewProfileSvg from "./icons/new-profile.svg";
import ProfileSvg from "./icons/profile.svg";

import NewProfileInput from "./components/NewProfileInput.vue";
</script>

<script>
export default {
  props: ["setAvailableViews"],
  data() {
    return {
      profiles: ["Default"],
      selectedProfile: null,
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
      this.profiles.push(name);
    },
    selectProfile(profile) {
      this.selectedProfile = profile;
      this.setAvailableViews([0, 1]);
    },
  },
  mounted() {
      this.setAvailableViews([]);
  }
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
        <span class="icon" :style="`background-image: url(${ProfileSvg})`"></span>
        <a
          class="profile-name"
          :class="selectedProfile === profile ? 'selected' : ''"
          v-on:click="selectProfile(profile)"
        >{{profile}}</a>
      </div>
      <NewProfileInput
        v-if="showNewProfileInput"
        :inputError="newProfileInputError"
        :onEnter="createProfile"
        :onCancel="() => showNewProfileInput = false"
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
  margin: 10px;
  font-size: 12px;
  line-height: 20px;
}

.profiles .icon {
  margin: 5px;
  width: 15px;
  height: 15px;
}

.profile-name {
  vertical-align: middle;
}

.profile-name:hover {
  text-decoration: underline;
  cursor: pointer;
}

.profile-name.selected {
  text-decoration: underline;
  font-weight: bold;
}
</style>
