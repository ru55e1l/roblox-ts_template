import { IService } from "./IService";
import Remotes from "hyperdrive/shared/definitions/Remotes";
import RigHandler from "hyperdrive/shared/modules/core/RigHandler";

class PlayerService implements IService {
	constructor() {
		Remotes.Server.Get("RequestRespawn").Connect((player: Player) => {
			player.LoadCharacter();
			// Load custom rig onto the character
			const character = player.Character;
			const humanoid = character?.WaitForChild("Humanoid") as Humanoid;
			if (character === undefined || humanoid === undefined || humanoid.Health < 0) {
				return;
			}

			RigHandler.SetRig(character);

			// Create heal attachment (the place medigun rays attach to)
			const upperTorso = character.WaitForChild("UpperTorso", 5);
			if (upperTorso === undefined) {
				warn(`${player.Name}'s upper torso not found`);
			} else {
				const healAttachment = new Instance("Attachment", upperTorso);
				healAttachment.Name = "HealAttachment";
			}

			character.PrimaryPart = character.WaitForChild("HumanoidRootPart", 5) as Part;
			//this.loadPlayerclassStats(player, character, humanoid);
			Remotes.Server.Get("PlayerRespawned").SendToAllPlayers(player);
		});
	}
}

export { PlayerService };
