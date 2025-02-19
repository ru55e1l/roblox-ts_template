/*
HYPERDRIVE
-------------------------------------------------------------------------------------------------->
Description:

Player scripts loader
-------------------------------------------------------------------------------------------------->*/

import { ReplicatedStorage, Players, GamePassService, Workspace } from "@rbxts/services";
import { ReplicatedFirst } from "@rbxts/services";
import { RunService } from "@rbxts/services";

// Modules
import { ConnectionsModule } from "hyperdrive/shared/modules/core/connection-module";

// Controllers

// Misc
import Remotes from "hyperdrive/shared/definition/Remotes";
import Roact from "@rbxts/roact";
import { KeybindsModule } from "hyperdrive/shared/modules/core/keybind-module";
import { RaycastModule } from "hyperdrive/shared/modules/core/raycast.module";

async function waitForInitiatedAndCharacter() {
	const hyperdriveAsset = ReplicatedStorage.WaitForChild("hyperdriveAsset") as Model;
	const initiated = hyperdriveAsset.WaitForChild("Initiated") as BoolValue;

	while (!initiated.Value) {
		await Promise.delay(0.1);
	}
}

// Start loading screen
ReplicatedFirst.RemoveDefaultLoadingScreen();
const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui", 5);
if (!playerGui) {
	throw "Player Gui not found";
}
//const loadingScreen = Roact.mount(<LoadingScreenUI />, playerGui, "LoadingScreenUI");

waitForInitiatedAndCharacter().then(() => {
	// Config init

	const connectionModule = new ConnectionsModule();
	const keybindModule = new KeybindsModule();
	const racyastModule = new RaycastModule();

	//Controller init

	// Screen init

	const hyperdriveAsset = ReplicatedStorage.WaitForChild("hyperdriveAsset", 5) as Model;

	// Delete server side code
	const serverFolder = hyperdriveAsset.WaitForChild("hyperdrive", 5)?.WaitForChild("server", 5) as Folder;
	serverFolder.Destroy();

	//Roact.unmount(loadingScreen);

	let playerInitiated = hyperdriveAsset.FindFirstChild("PlayerInitiated") as BoolValue | undefined;
	if (!playerInitiated) {
		playerInitiated = new Instance("BoolValue");
		playerInitiated.Name = "playerInitiated";
		playerInitiated.Parent = hyperdriveAsset;
	}
	playerInitiated.Value = true;

	Players.LocalPlayer.CharacterAdded.Connect((character) => {
		const humanoid = character.WaitForChild("Humanoid", 5) as Humanoid;

		if (!humanoid) {
			warn("Humanoid not found");
			return;
		}

		humanoid.HealthChanged.Connect((newHealth) => {
			if (newHealth < 1) {
				ConnectionsModule.clearMounts();
				// Mount death screen
				//DeathScreenHandler.MountDeathScreen();
				Remotes.Client.Get("RequestRespawn").SendToServer();
			}
		});
	});

	Remotes.Client.Get("RequestRespawn").SendToServer();
	print("[HYPERDRIVE]: Player Ready");
});
