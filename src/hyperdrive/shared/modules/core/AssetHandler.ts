/*
HYPERDRIVE
-------------------------------------------------------------------------------------------------->
Description:

Class to handle retrieving assets from hyperdrive asset (uploaded to roblox as an asset)
-------------------------------------------------------------------------------------------------->*/

import { InsertService, ReplicatedStorage } from "@rbxts/services";

class AssetHandler {
	static AssetFolder: Folder;
	constructor() {
		if (AssetHandler.AssetFolder === undefined) {
			this.loadAssetFolder();
		}
	}

	private loadAssetFolder() {
		const assetFolder = ReplicatedStorage.FindFirstChild("HYPERDRIVE_ASSETS");
		if (assetFolder) {
			AssetHandler.AssetFolder = assetFolder as Folder;
		} else {
			const assetId = 123683296011254;
			AssetHandler.AssetFolder = InsertService.LoadAsset(assetId).FindFirstChild("HYPERDRIVE_ASSETS") as Folder;
			if (AssetHandler.AssetFolder) {
				AssetHandler.AssetFolder.Parent = ReplicatedStorage;
			} else {
				throw "Asset could not be loaded or is empty.";
			}
		}
	}

	public static findChildByPath(path: string[]): Instance | undefined {
		let currentInstance: Instance | undefined = AssetHandler.AssetFolder;
		for (const partName of path) {
			if (currentInstance) {
				currentInstance = currentInstance.FindFirstChild(partName) as Instance | undefined;
			} else {
				warn("Not found");
				return undefined;
			}
		}
		return currentInstance;
	}
}

export { AssetHandler };
