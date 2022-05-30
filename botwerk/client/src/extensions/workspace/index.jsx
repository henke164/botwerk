import icon from "./icons/workspace.svg";
import EditModelerView from "./components/EditModelerView.vue";
import EditActionView from "./components/EditActionView.vue";
import EditClientView from "./components/EditClientView.vue";
import ObjectViewer from "./components/ObjectViewer.vue";
import Workspace from "./Workspace.vue";

export default {
  icon,
  component: Workspace,
  views: {
    EditModelerView,
    EditActionView,
    EditClientView,
    ObjectViewer,
  },
};
