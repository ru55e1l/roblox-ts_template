/*
HYPERDRIVE
-------------------------------------------------------------------------------------------------->
Description:

Handles keybinds, to be called to clear by the startercharacterscript
-------------------------------------------------------------------------------------------------->
Version History:
4/26/2024       Xeqto       Creation
-------------------------------------------------------------------------------------------------->
*/

import { UserInputService, Players } from "@rbxts/services";

type KeybindAction = () => void;

class KeybindsModule {
	static keybinds: Map<Enum.KeyCode | Enum.UserInputType, KeybindAction> = new Map();
	static permanentKeybinds: Map<Enum.KeyCode | Enum.UserInputType, KeybindAction> = new Map();
	static keybindsEnded: Map<Enum.KeyCode | Enum.UserInputType, KeybindAction> = new Map();
	static permanentKeybindsEnded: Map<Enum.KeyCode | Enum.UserInputType, KeybindAction> = new Map();
	static iteration: number = 0;

	static keybindConnection?: RBXScriptConnection;
	static permanentKeybindConnection?: RBXScriptConnection;
	static keybindsEndedConnection?: RBXScriptConnection;
	static PermanentEndedConnection?: RBXScriptConnection;

	static onlyEnabledKeybind: Enum.KeyCode | undefined;

	constructor() {
		KeybindsModule.keybindConnection?.Disconnect();
		KeybindsModule.keybindConnection = UserInputService.InputBegan.Connect((input, gameProcessedEvent) => {
			if (gameProcessedEvent) return;
			let key: Enum.KeyCode | Enum.UserInputType;
			key = input.KeyCode;
			if (key === Enum.KeyCode.Unknown) {
				key = input.UserInputType;
			}
			if (KeybindsModule.onlyEnabledKeybind === undefined || KeybindsModule.onlyEnabledKeybind === key) {
				KeybindsModule.keybinds.get(key)?.();
				KeybindsModule.permanentKeybinds.get(key)?.();
			}
		});

		// Handle keybinds ending
		KeybindsModule.keybindsEndedConnection?.Disconnect();
		KeybindsModule.keybindsEndedConnection = UserInputService.InputEnded.Connect((input, gameProcessedEvent) => {
			if (gameProcessedEvent) return;
			let key: Enum.KeyCode | Enum.UserInputType;
			key = input.KeyCode;
			if (key === Enum.KeyCode.Unknown) {
				key = input.UserInputType;
			}

			if (KeybindsModule.onlyEnabledKeybind === undefined || KeybindsModule.onlyEnabledKeybind === key) {
				KeybindsModule.keybindsEnded.get(key)?.();
				KeybindsModule.permanentKeybindsEnded.get(key)?.();
			}
		});

		KeybindsModule.iteration++;
	}

	static disableKeybindsExcept(keyCode: Enum.KeyCode): void {
		KeybindsModule.onlyEnabledKeybind = keyCode;
	}

	static enableKeybinds() {
		KeybindsModule.onlyEnabledKeybind = undefined;
	}

	static setPermanentKeybindEnded(keyCode: Enum.KeyCode | Enum.UserInputType, action: KeybindAction): void {
		KeybindsModule.permanentKeybindsEnded.set(keyCode, action);
	}

	static removePermanentKeybindEnded(keyCode: Enum.KeyCode | Enum.UserInputType): void {
		KeybindsModule.permanentKeybindsEnded.delete(keyCode);
	}

	static setKeybind(keyCode: Enum.KeyCode | Enum.UserInputType, action: KeybindAction): void {
		KeybindsModule.keybinds.set(keyCode, action);
	}

	static removeKeybind(keyCode: Enum.KeyCode | Enum.UserInputType): void {
		KeybindsModule.keybinds.delete(keyCode);
	}

	static setPermanentKeybind(keyCode: Enum.KeyCode | Enum.UserInputType, action: KeybindAction): void {
		KeybindsModule.permanentKeybinds.set(keyCode, action);
	}

	static removePermanentKeybind(keyCode: Enum.KeyCode): void {
		KeybindsModule.permanentKeybinds.delete(keyCode);
	}

	static setKeybindEnded(keyCode: Enum.KeyCode | Enum.UserInputType, action: KeybindAction): void {
		KeybindsModule.keybindsEnded.set(keyCode, action);
	}

	static removeKeybindEnded(keyCode: Enum.KeyCode | Enum.UserInputType): void {
		KeybindsModule.keybindsEnded.delete(keyCode);
	}

	static clearKeybinds(): void {
		KeybindsModule.keybinds.clear();
		KeybindsModule.keybindsEnded.clear();
	}
}

export { KeybindsModule };
