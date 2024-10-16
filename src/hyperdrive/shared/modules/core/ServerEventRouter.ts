/*
HYPERDRIVE
-------------------------------------------------------------------------------------------------->
Description:

Being made because player is joining before server has completely initiated
-------------------------------------------------------------------------------------------------->*/

import { Players } from "@rbxts/services";

export default class ServerEventRouter {
	static ServerInitiated: boolean = false;
	// Contains a player
	static PlayerJoinedEvent: BindableEvent = new Instance("BindableEvent");
	constructor() {
		Players.PlayerAdded.Connect((player: Player) => {
			while (ServerEventRouter.ServerInitiated === false) {
				task.wait();
			}
			ServerEventRouter.PlayerJoinedEvent.Fire(player);
		});
	}
}
