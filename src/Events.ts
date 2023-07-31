import { Citizen } from "./Citizen";
import { isServer } from "./";

export type listenerType = (...args: any[]) => void;
export interface EventsData {
	eventName: string;
	listener: listenerType;
}

export class Event {
	private eventName: string;
	private listener: listenerType;
	private netSafe: boolean;
	private once: boolean;

	constructor(eventName: string, listener: listenerType, isNet: boolean, once: boolean) {
		this.eventName = eventName;
		this.netSafe = isNet;
		this.once = once;
		this.listener = (args: any[]) => {
			listener(...args);
			if (this.once) this.destroy();
		};
		Citizen.addEventListener(this.eventName, this.listener, this.netSafe);
	}

	destroy(): void {
		Citizen.removeEventListener(this.eventName, this.listener);
	}
}

export class Events {
	public static on(eventName: string, listener: listenerType): Event {
		return new Event(eventName, listener, isServer, false);
	}

	public static once(eventName: string, listener: listenerType): Event {
		return new Event(eventName, listener, isServer, true);
	}

	public static off(event: Event): void {
		if (!event) throw new Error("Event is not defined");
		event.destroy();
	}

	public static emit(eventName: string, ...args: any[]): void {
		Citizen.emit(eventName, ...args);
	}
}
