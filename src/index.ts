export { Vector2, Vector3, Vector4, log, hash } from "./utils";
export { RGB, RGBA } from "./utils/RGBA";
export { Event, Events, listenerType } from "./Events";
export { Citizen } from "./Citizen";
export * from "./sharedNatives";
import { isDuplicityVersion } from "./sharedNatives";
export const isServer = isDuplicityVersion();
export const isClient = !isServer;
