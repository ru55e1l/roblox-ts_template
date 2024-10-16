/*
HYPERDRIVE
-------------------------------------------------------------------------------------------------->
Description:

Net custom events/networking handler
-------------------------------------------------------------------------------------------------->*/

import Net from "@rbxts/net";

const Remotes = Net.Definitions.Create({
	RequestRespawn: Net.Definitions.ClientToServerEvent<[]>(),
});
export default Remotes;
