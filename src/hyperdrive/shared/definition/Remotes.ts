/*
HYPERDRIVE
-------------------------------------------------------------------------------------------------->
Description:

Net custom events/networking handler
-------------------------------------------------------------------------------------------------->*/

import Net from "@rbxts/net";

const Remotes = Net.Definitions.Create({
	// Player character remotes
	RequestRespawn: Net.Definitions.ClientToServerEvent<[]>(),
	PlayerRespawned: Net.Definitions.ServerToClientEvent<[player: Player]>(),
});
export default Remotes;
