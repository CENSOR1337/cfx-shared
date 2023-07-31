import { Citizen } from "./Citizen";
import { Vector2, Vector3, Vector4 } from "./utils/";
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
		this.listener = (...args: any[]) => {
			listener(...args);
			if (this.once) this.destroy();
		};
		Citizen.addEventListener(this.eventName, this.listener, this.netSafe);
	}

	destroy(): void {
		Citizen.removeEventListener(this.eventName, this.listener);
	}

	public static getClassFromArguments(...args: any[]): any[] {
		const newArgs: any[] = [];

		for (const arg of args) {
			const obj = this.getObjectClass(arg);
			newArgs.push(obj);
		}
		return newArgs;
	}

	protected static getObjectClass(obj: any): any {
		const objType = obj.type;
		if (!objType) return obj;
		switch (objType) {
			case Vector2.type: {
				return Vector2.create(obj);
			}
			case Vector3.type: {
				return Vector3.create(obj);
			}
			case Vector4.type: {
				return Vector4.create(obj);
			}

			default: {
				return obj;
			}
		}
	}
}

export class Events {
	public static on(eventName: string, listener: listenerType, once = false): Event {
		const handler = (...args: any[]) => {
			listener(...Event.getClassFromArguments(...args));
		};
		return new Event(eventName, handler, false, once);
	}

	public static once(eventName: string, listener: listenerType): Event {
		return Events.on(eventName, listener, true);
	}

	public static off(event: Event): void {
		if (!event) throw new Error("Event is not defined");
		event.destroy();
	}

	public static emit(eventName: string, ...args: any[]): void {
		Citizen.emit(eventName, ...args);
	}
}
