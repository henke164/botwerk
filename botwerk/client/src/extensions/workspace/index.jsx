import icon from "./icons/workspace.svg";
import Workspace from "./Workspace.vue";
import ModelLogicCreate from "./view-components/ModelLogicCreate.vue";
import ModelLogicMapping from "./view-components/ModelLogicMapping.vue";

export default {
  icon,
  component: Workspace,
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
