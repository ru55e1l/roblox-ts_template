import { AssetHandler } from "./AssetHandler";
export default class RigHandler {
	private static bodyPartEnumMap: { [key: string]: Enum.BodyPartR15 } = {
		Head: Enum.BodyPartR15.Head,

		UpperTorso: Enum.BodyPartR15.UpperTorso,

		LowerTorso: Enum.BodyPartR15.LowerTorso,

		LeftFoot: Enum.BodyPartR15.LeftFoot,

		LeftLowerLeg: Enum.BodyPartR15.LeftLowerLeg,

		LeftUpperLeg: Enum.BodyPartR15.LeftUpperLeg,

		RightFoot: Enum.BodyPartR15.RightFoot,

		RightLowerLeg: Enum.BodyPartR15.RightLowerLeg,

		RightUpperLeg: Enum.BodyPartR15.RightUpperLeg,

		LeftHand: Enum.BodyPartR15.LeftHand,

		LeftLowerArm: Enum.BodyPartR15.LeftLowerArm,

		LeftUpperArm: Enum.BodyPartR15.LeftUpperArm,

		RightHand: Enum.BodyPartR15.RightHand,

		RightLowerArm: Enum.BodyPartR15.RightLowerArm,

		RightUpperArm: Enum.BodyPartR15.RightUpperArm,
	};

	static SetRig(character: Model): void {
		const humanoid = character?.WaitForChild("Humanoid") as Humanoid;

		if (character === undefined || humanoid === undefined || humanoid.Health < 0) {
			return;
		}

		const newRig = AssetHandler.findChildByPath(["Models", "Rig", "NewRig"]);

		if (newRig === undefined) {
			return;
		}

		for (const part of newRig.GetChildren()) {
			if (part.IsA("BasePart")) {
				const bodyPartEnumValue = this.bodyPartEnumMap[part.Name];

				if (bodyPartEnumValue !== undefined) {
					const partClone = part.Clone();
					partClone.Anchored = false;
					humanoid.ReplaceBodyPartR15(bodyPartEnumValue, partClone as BasePart);
				} else {
					warn(`No BodyPartR15 mapping for: ${part.Name}`);
				}
			}
		}

		character.PrimaryPart = character.WaitForChild("HumanoidRootPart", 5) as Part;
	}
}
