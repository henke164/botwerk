import workspace from "../extensions/workspace/workspace.svg";
import Workspace from "../extensions/workspace/Workspace.vue";

import connectionIcon from "../extensions/connection/connection.svg";
import Connection from "../extensions/connection/Connection.vue";

const extensions = [
  {
    icon: workspace,
    component: Workspace,
  },
  {
    icon: connectionIcon,
    component: Connection,
  },
];

export { extensions };
