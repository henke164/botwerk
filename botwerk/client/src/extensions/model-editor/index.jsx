import icon from "./icons/cube.svg";
import ModelEditor from "./ModelEditor.vue";
import ModelLogicCreate from "./view-components/ModelLogicCreate.vue";
import ModelLogicMapping from "./view-components/ModelLogicMapping.vue";

export default {
  icon,
  component: ModelEditor,
  views: {
    ModelLogicCreate: {
      title: "Create",
      component: ModelLogicCreate,
    },
    ModelLogicMapping: {
      title: "Mapping",
      component: ModelLogicMapping,
    },
  },
};
