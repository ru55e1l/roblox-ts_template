interface BaseAssetInput {
	AssetId: number;
}
// Used for storing assets
// Pulls the asset down from roblox by assetid
abstract class BaseAsset {
	public AssetId: number;
	constructor(input: BaseAssetInput) {
		this.AssetId = input.AssetId;
	}

	public Get(parent?: Instance): Instance {
		const asset = game.GetService("InsertService").LoadAsset(this.AssetId);

		if (parent) {
			asset.Parent = parent;
		}

		return asset;
	}
}

export { BaseAsset, BaseAssetInput };
