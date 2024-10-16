import { BaseAsset, BaseAssetInput } from "../BaseAsset";

class Rig extends BaseAsset {
	constructor(parent?: Instance) {
		const assetInput: BaseAssetInput = {
			AssetId: 110957102998908,
		};
		super(assetInput);
	}
}

export { Rig };
