/*
HYPERDRIVE
-------------------------------------------------------------------------------------------------->
Description:

Handles the creation and deletion of connections intended for character scripts connections. clearing them is called upon by startercharacter script
-------------------------------------------------------------------------------------------------->*/

import { Players } from "@rbxts/services";
import Roact from "@rbxts/roact";

enum mountEnum {
	menuMount = "menuMount",
}

class ConnectionsModule {
	static connections: RBXScriptConnection[] = [];
	static mounts: Map<string, Roact.Tree> = new Map<string, Roact.Tree>();

	constructor() {}

	static clearConnections() {
		ConnectionsModule.connections.forEach((connection) => {
			connection.Disconnect();
		});
		ConnectionsModule.connections = [];
	}

	static clearMounts() {
		this.mounts.forEach((mount) => {
			try {
				Roact.unmount(mount);
			} catch (err) {
				warn(`Unmount Error: ${err}`);
			}
		});
		this.mounts = new Map<string, Roact.Tree>();
	}
}

export { ConnectionsModule, mountEnum as mountNames };
