import icon from "./icons/workspace.svg";
import EditModelerView from "./view-components/EditModelerView.vue";
import EditClientView from "./view-components/EditClientView.vue";
import Workspace from "./Workspace.vue";

export default {
  icon,
  component: Workspace,
  views: {
    EditModelerView,
    EditClientView,
  },
};
