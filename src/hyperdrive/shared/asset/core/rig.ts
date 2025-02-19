import { BaseAsset, BaseAssetInput } from "../BaseAsset";

class Rig extends BaseAsset {
	public static AssetId: number = 110957102998908;
	protected static loadedAsset?: Instance;

	static input: BaseAssetInput = {
		AssetId: Rig.AssetId,
	};
	constructor(input: BaseAssetInput) {
		super(Rig.input);
	}

	public static Get(): Model {
		const rigModel = super.Get(Rig.AssetId, "Model");

		if (!rigModel.IsA("Model")) {
			const errorMsg = "Rig model assetid is not a model";
			throw errorMsg;
		}

		return rigModel;
	}

	public static Clone(): Model {
		return BaseAsset.Clone(Rig.AssetId, "Model") as Model;
	}
}

export { Rig };
