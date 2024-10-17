import { Players, ReplicatedStorage, StarterPlayer, TextChatService } from "@rbxts/services";
import { StartupRequest } from "hyperdrive/shared/definitions/StartupRequest";
import { AssetHandler } from "hyperdrive/shared/modules/core/AssetHandler";
import ServerEventRouter from "hyperdrive/shared/modules/core/ServerEventRouter";
import { PlayerService } from "../services/PlayerService";

class Startup {
	constructor(startupRequest: StartupRequest) {
		Players.CharacterAutoLoads = false;
		const serverEventRouter = new ServerEventRouter();
		// Placing client intiate in starter player scripts
		const hyperdriveClientPlayerInitiate = script.Parent?.FindFirstChild("starterPlayer")
			?.FindFirstChild("main")
			?.Clone();
		const hyperdriveClientCharacterInitiate = script.Parent?.FindFirstChild("starterCharacter")
			?.FindFirstChild("main")
			?.Clone();
		const starterPlayerScripts = StarterPlayer.WaitForChild("StarterPlayerScripts");
		const starterCharacterScripts = StarterPlayer.WaitForChild("StarterCharacterScripts");

		hyperdriveClientPlayerInitiate!.Parent = starterPlayerScripts;
		hyperdriveClientCharacterInitiate!.Parent = starterCharacterScripts;

		function CreateClasses<T>(constructors: Array<() => T>) {
			const promises = constructors.map((constructor) => Promise.try(constructor) as Promise<InstanceType<T>>);
			return Promise.all(promises);
		}

		// Config init
		// Initiate modules async
		const modules = CreateClasses([() => new AssetHandler()]).await();

		// Initiate serivces async
		const services = CreateClasses([() => new PlayerService()]).await();

		//const characterScriptsAsset = AssetHandler.findChildByPath(["CharacterScripts"]) as Folder;

		const hyperdriveAsset = ReplicatedStorage.WaitForChild("hyperdriveAsset", 5) as Model;

		const initiated = new Instance("BoolValue");
		initiated.Name = "Initiated";
		ServerEventRouter.ServerInitiated = true;
		initiated.Value = true;
		initiated.Parent = hyperdriveAsset;
		print("[HYPERDRIVE]: Server Initiated");
	}
}

export { Startup };
