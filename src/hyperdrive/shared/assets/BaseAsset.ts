import { ReplicatedStorage, InsertService } from "@rbxts/services";

interface BaseAssetInput {
	AssetId: number;
}

// Used for storing assets
// Pulls the asset down from Roblox by AssetId
abstract class BaseAsset {
	public static AssetId: number;
	protected static loadedAsset?: Instance; // Private variable to store the loaded asset

	constructor(input: BaseAssetInput) {
		BaseAsset.AssetId = input.AssetId;
	}

	public static Get(): Instance {
		// If the asset is already loaded, return it
		if (BaseAsset.loadedAsset !== undefined) {
			return BaseAsset.loadedAsset;
		}

		// Load the asset from Roblox if it hasn't been loaded yet
		const asset = InsertService.LoadAsset(BaseAsset.AssetId);

		// Store the loaded asset in the private variable
		BaseAsset.loadedAsset = asset;

		// Parent the asset to the provided parent or default to ReplicatedStorage

		asset.Parent = ReplicatedStorage;

		return asset;
	}

	public static Clone(parent?: Instance) {
		if (BaseAsset.loadedAsset === undefined) {
			this.Get();
		}

		return BaseAsset.loadedAsset?.Clone();
	}
}

export { BaseAsset, BaseAssetInput };
