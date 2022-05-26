import icon from "./icons/blueprint.svg";
import ModelEditor from "./ModelEditor.vue";
import ModelLogicCreate from "./view-components/ModelLogicCreate.vue";
import ModelLogicMapping from "./view-components/ModelLogicMapping.vue";

export default {
  icon,
  component: ModelEditor,
  views: [
    {
      title: 'Create',
      component: ModelLogicCreate
    },
    {
      title: 'Mapping',
      component: ModelLogicMapping
    }
  ]
};
