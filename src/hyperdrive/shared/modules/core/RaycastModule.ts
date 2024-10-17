/*
HYPERDRIVE
-------------------------------------------------------------------------------------------------->
Description:

Module to handle anything raycasting related
-------------------------------------------------------------------------------------------------->
Version History:
4/26/2024       Xeqto       Creation
-------------------------------------------------------------------------------------------------->
*/

import { Workspace } from "@rbxts/services";

class RaycastModule {
	static rayIgnoreList: Instance[];

	constructor() {
		RaycastModule.rayIgnoreList = [];
	}

	static cleanupRayIgnoreList(): void {
		this.rayIgnoreList = this.rayIgnoreList.filter((instance) => instance.Parent !== undefined);
	}

	// Recursively add item and all children and
	// subchildren to the ignore list if meshpart
	static AddToIgnoreListRecursive(instance: Instance): void {
		if (instance.IsA("MeshPart")) {
			this.rayIgnoreList.push(instance);
		}

		const descendants = instance.GetDescendants();
		for (const descendant of descendants) {
			RaycastModule.AddToIgnoreListRecursive(descendant);
		}
	}

	static Raycast(
		spreadAmount: number,
		startPosition: Vector3,
		endPosition: Vector3,
		sourceCharacter: Model,
		endPositionRecastSource: Vector3,
	): [BasePart | undefined, Vector3 | undefined] {
		let hitPart: BasePart | undefined;
		let hitPosition: Vector3 | undefined;
		const interval = startPosition.sub(endPosition).Magnitude;

		const camera = Workspace.CurrentCamera as Camera;
		const maxSpread = (spreadAmount / 10) * interval;
		const minSpread = -maxSpread;

		const randomGenerator = new Random();
		const aimX = randomGenerator.NextNumber(minSpread, maxSpread) + endPosition.X;
		const aimY = randomGenerator.NextNumber(minSpread, maxSpread) + endPosition.Y;
		const aimZ = randomGenerator.NextNumber(minSpread, maxSpread) + endPosition.Z;
		const aim = new Vector3(aimX, aimY, aimZ);

		const recastRay = new Ray(endPositionRecastSource, aim.sub(endPositionRecastSource).Unit.mul(500));
		let repeatCount = 0;
		do {
			[hitPart, hitPosition] = Workspace.FindPartOnRayWithIgnoreList(recastRay, this.rayIgnoreList, false);
			if (hitPart) {
				if (
					hitPart.IsA("Accessory") ||
					hitPart.Parent?.IsA("Accessory") ||
					hitPart.IsA("Tool") ||
					hitPart.Parent?.IsA("Tool") ||
					hitPart.Parent === sourceCharacter ||
					hitPart.Parent?.Parent === sourceCharacter
				) {
					this.rayIgnoreList.push(hitPart);
					hitPart = undefined;
					repeatCount++;
					continue;
				}
			}
			const loopRay = new Ray(startPosition, hitPosition.sub(startPosition).Unit.mul(500));
			[hitPart, hitPosition] = Workspace.FindPartOnRayWithIgnoreList(loopRay, this.rayIgnoreList, false);
			if (hitPart) {
				if (
					hitPart.IsA("Accessory") ||
					hitPart.Parent?.IsA("Accessory") ||
					hitPart.IsA("Tool") ||
					hitPart.Parent?.IsA("Tool") ||
					hitPart.Parent === sourceCharacter ||
					hitPart.Parent?.Parent === sourceCharacter
				) {
					this.rayIgnoreList.push(hitPart);
					hitPart = undefined;
				}
			}
			repeatCount++;
		} while (hitPart === undefined && repeatCount <= 15);

		return [hitPart, hitPosition];
	}
}

export { RaycastModule };
