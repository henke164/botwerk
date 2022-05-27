import icon from "./icons/workspace.svg";
import EditModelerView from "./view-components/EditModelerView.vue";
import Workspace from "./Workspace.vue";

export default {
  icon,
  component: Workspace,
  views: {
    ModelLogicCreate: {
      name: "EditModelerView",
      component: EditModelerView,
    },
  },
};
