import { BaseAsset, BaseAssetInput } from "./BaseAsset";

abstract class BaseAccessoryAsset extends BaseAsset {
	constructor(input: BaseAssetInput) {
		super(input);
	}

	// Assumes that the model only has an accessory
	public Get(parent?: Instance): Instance {
		const model = super.Get(parent);

		const accessory = model.FindFirstChildWhichIsA("Accessory") as Accessory;
		return accessory;
	}
}
