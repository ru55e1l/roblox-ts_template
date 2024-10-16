import { ReplicatedFirst, ReplicatedStorage } from "@rbxts/services";
import { BaseAsset, BaseAssetInput } from "./BaseAsset";

abstract class BaseAccessoryAsset extends BaseAsset {
	constructor(input: BaseAssetInput) {
		super(input);
	}

	// Assumes that the model only has an accessory
	public static Get(): Instance {
		const model = super.Get();

		const accessory = model.FindFirstChildWhichIsA("Accessory") as Accessory;

		// Cleanup unneccesary stuff
		accessory.Parent = ReplicatedStorage;
		model.Destroy();

		this.loadedAsset = accessory;
		return accessory;
	}
}
