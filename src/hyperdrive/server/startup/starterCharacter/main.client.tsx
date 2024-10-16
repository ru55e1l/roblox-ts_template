/*
HYPERDRIVE
-------------------------------------------------------------------------------------------------->
Description:

Client side character startup
-------------------------------------------------------------------------------------------------->*/

import Roact from "@rbxts/roact";
import { ReplicatedStorage, Players, GamePassService, Workspace, StarterGui } from "@rbxts/services";
import { RaycastModule } from "hyperdrive/shared/modules/core/RaycastModule";

StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.Chat, false);
const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui", 5);
if (!playerGui) {
	throw "Player Gui not found";
}

async function waitForInitiated() {
	const hyperdriveAsset = ReplicatedStorage.WaitForChild("hyperdriveAsset") as Model;
	const initiated = hyperdriveAsset.WaitForChild("playerInitiated") as BoolValue;
	while (!initiated.Value) {
		await Promise.delay(0.1);
	}
}

waitForInitiated().then(() => {
	task.wait(2);

	const character = Players.LocalPlayer.Character;
	// Add player character to raycast ignore list
	if (character) {
		RaycastModule.addModelDescendantsToIgnoreList(character);
	}
	const humanoid = character?.WaitForChild("Humanoid", 5) as Humanoid;

	// Re-initiate modules

	//Controller init
	StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.Chat, false);
});
