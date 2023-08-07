import { Citizen } from "./Citizen";
export class Tick {
	handle: number;
    
	constructor(callback: Function) {
		this.handle = Citizen.setTick(callback);
	}

	destroy() {
		Citizen.clearTick(this.handle);
	}
}

export const onTick = function (callback: Function) {
	return new Tick(callback);
};

export const clearTick = function (tick: Tick) {
	if (!tick) return;
	tick.destroy();
};
