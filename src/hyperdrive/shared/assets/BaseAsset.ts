import { ReplicatedStorage, InsertService } from "@rbxts/services";

interface BaseAssetInput {
	AssetId: number;
}

// Used for storing assets
// Pulls the asset down from Roblox by AssetId
abstract class BaseAsset {
	// Static cache to store loaded assets by their AssetId
	protected static loadedAssets: Map<number, Instance> = new Map();

	constructor(input: BaseAssetInput) {}

	public static Get(assetId: number, instanceType: keyof Instances): Instance {
		// Check if the asset is already in the cache
		const cachedAsset = BaseAsset.loadedAssets.get(assetId);
		if (cachedAsset !== undefined) {
			return cachedAsset;
		}

		// Load the asset from Roblox if it hasn't been cached yet
		const asset = InsertService.LoadAsset(assetId);
		asset.Parent = ReplicatedStorage;
		const result = asset.FindFirstChildWhichIsA(instanceType);

		if (result === undefined) {
			const msg = `${assetId} is undefined`;
			throw msg;
		}

		// Store the loaded asset in the cache
		BaseAsset.loadedAssets.set(assetId, result);

		// Parent the asset to ReplicatedStorage by default
		// Cleanup ex parent model
		result.Parent = ReplicatedStorage;
		asset.Destroy();

		return result;
	}

	public static Clone(assetId: number, instanceType: keyof Instances, parent?: Instance): Instance | undefined {
		// Ensure the asset is loaded by calling Get
		const asset = BaseAsset.Get(assetId, instanceType);

		// Clone the asset and parent it if needed
		const clonedAsset = asset.Clone();
		if (parent) {
			clonedAsset.Parent = parent;
		}

		return clonedAsset;
	}
}

export { BaseAsset, BaseAssetInput };
