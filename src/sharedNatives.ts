
import { Vector3 } from "cfx-shared";
//@ts-ignore
const Citizen = global.Citizen;
//@ts-ignore
const msgpack_pack = global.msgpack_pack;
const _i = Citizen.pointerValueInt();
const _f = Citizen.pointerValueFloat();
const _v = Citizen.pointerValueVector();
const _r = Citizen.returnResultAnyway();
const _ri = Citizen.resultAsInteger();
const _rf = Citizen.resultAsFloat();
const _rl = Citizen.resultAsLong();
const _s = Citizen.resultAsString();
const _rv = Citizen.resultAsVector();
//@ts-ignore
const _ro = Citizen.resultAsObject2();
//@ts-ignore
const _in = Citizen.invokeNativeByHash;
const _ii_base = Citizen.pointerValueInt();
const _fi_base = Citizen.pointerValueFloat();

function _ii(...args: any[]) {
	// @ts-ignore
	return _ii_base(...args);
}

function _fi(...args: any[]) {
	// @ts-ignore
	return _fi_base(...args);
}

function joaat(s: string) {
	const k = s.toLowerCase();
	let h, i;

	for (h = i = 0; i < k.length; i++) {
		h += k.charCodeAt(i);
		h += h << 10;
		h ^= h >>> 6;
	}

	h += h << 3;
	h ^= h >>> 11;
	h += h << 15;

	return h >>> 0;
}

function _ch(hash: any) {
	if (typeof hash === "string") {
		return joaat(hash);
	}

	return hash;
}

function _ts(num: any) {
	if (num === 0 || num === null || num === undefined || num === false) {
		// workaround for users calling string parameters with '0', also nil being translated
		return null;
	}
	if (ArrayBuffer.isView(num) || num instanceof ArrayBuffer) {
		// these are handled as strings internally
		return num;
	}
	return num.toString();
}

function _fv(flt: number) {
	return flt === 0.0 ? flt : flt + 0.0000001;
}

function _mfr(fn: any) {
	return Citizen.makeRefFunction(fn);
}

function _mv(vector: any): Vector3 {
	return Vector3.fromArray(vector);
}
/**
 * Adds a handler for changes to a state bag.
 * 
 * The function called expects to match the following signature:
 * 
 * ```ts
 * function StateBagChangeHandler(bagName: string, key: string, value: any, reserved: number, replicated: boolean);
 * ```
 * 
 * *   **bagName**: The internal bag ID for the state bag which changed. This is usually `player:Source`, `entity:NetID`
 * or `localEntity:Handle`.
 * *   **key**: The changed key.
 * *   **value**: The new value stored at key. The old value is still stored in the state bag at the time this callback executes.
 * *   **reserved**: Currently unused.
 * *   **replicated**: Whether the set is meant to be replicated.
 * 
 * At this time, the change handler can't opt to reject changes.
 * 
 * If bagName refers to an entity, use [GET_ENTITY_FROM_STATE_BAG_NAME](?\_0x4BDF1868) to get the entity handle
 * If bagName refers to a player, use [GET_PLAYER_FROM_STATE_BAG_NAME](?\_0xA56135E0) to get the player handle
 * @param keyFilter
 * @param bagFilter
 * @param handler
 */
export function addStateBagChangeHandler(keyFilter: string, bagFilter: string, handler: any): number { 
	return _in(0x00000000, 0x5ba35aaf, _ts(keyFilter), _ts(bagFilter), _mfr(handler), _r, _ri); 
}

/**
 * Cancels the currently executing event.
 */
export function cancelEvent(): void { 
	return _in(0x00000000, 0xfa29d35d); 
}

export function deleteFunctionReference(referenceIdentity: string): void { 
	return _in(0x00000000, 0x1e86f206, _ts(referenceIdentity)); 
}

export function deleteResourceKvp(key: string): void { 
	return _in(0x00000000, 0x7389b5df, _ts(key)); 
}

export function duplicateFunctionReference(referenceIdentity: string): string { 
	return _in(0x00000000, 0xf4e2079d, _ts(referenceIdentity), _r, _s); 
}

export function endFindKvp(handle: number): void { 
	return _in(0x00000000, 0xb3210203, handle); 
}

/**
 * Internal function for ensuring an entity has a state bag.
 * @param entity
 */
export function ensureEntityStateBag(entity: number): void { 
	return _in(0x00000000, 0x3bb78f05, entity); 
}

export function executeCommand(commandString: string): void { 
	return _in(0x00000000, 0x561c060b, _ts(commandString)); 
}

export function findKvp(handle: number): string { 
	return _in(0x00000000, 0xbd7bebc5, handle, _r, _s); 
}

/**
 * Can be used to get a console variable of type `char*`, for example a string.
 * @param varName
 * @param default_
 */
export function getConvar(varName: string, default_: string): string { 
	return _in(0x00000000, 0x6ccd2564, _ts(varName), _ts(default_), _r, _s); 
}

/**
 * Can be used to get a console variable casted back to `int` (an integer value).
 * @param varName
 * @param default_
 */
export function getConvarInt(varName: string, default_: number): number { 
	return _in(0x00000000, 0x935c0ab2, _ts(varName), default_, _r, _ri); 
}

/**
 * Returns the name of the currently executing resource.
 */
export function getCurrentResourceName(): string { 
	return _in(0x00000000, 0xe5e9ebbb, _r, _s); 
}

/**
 * Returns the entity handle for the specified state bag name. For use with [ADD_STATE_BAG_CHANGE_HANDLER](?\_0x5BA35AAF).
 * @param bagName
 */
export function getEntityFromStateBagName(bagName: string): number { 
	return _in(0x00000000, 0x4bdf1867, _ts(bagName), _r, _ri); 
}

/**
 * Returns the internal build number of the current game being executed.
 * 
 * Possible values:
 * 
 * *   FiveM
 * *   1604
 * *   2060
 * *   2189
 * *   2372
 * *   2545
 * *   2612
 * *   2699
 * *   2802
 * *   RedM
 * *   1311
 * *   1355
 * *   1436
 * *   1491
 * *   LibertyM
 * *   43
 * *   FXServer
 * *   0
 */
export function getGameBuildNumber(): number { 
	return _in(0x00000000, 0x804b9f7b, _r, _ri); 
}

/**
 * Returns the current game being executed.
 * 
 * Possible values:
 * 
 * | Return value | Meaning                        |
 * | ------------ | ------------------------------ |
 * | `fxserver`   | Server-side code ('Duplicity') |
 * | `fivem`      | FiveM for GTA V                |
 * | `libertym`   | LibertyM for GTA IV            |
 * | `redm`       | RedM for Red Dead Redemption 2 |
 */
export function getGameName(): string { 
	return _in(0x00000000, 0xe8eaa18b, _r, _s); 
}

export function getInstanceId(): number { 
	return _in(0x00000000, 0x9f1c4383, _r, _ri); 
}

export function getInvokingResource(): string { 
	return _in(0x00000000, 0x4d52fe5b, _r, _s); 
}

/**
 * Gets the amount of metadata values with the specified key existing in the specified resource's manifest.
 * See also: [Resource manifest](https://docs.fivem.net/resources/manifest/)
 * @param resourceName
 * @param metadataKey
 */
export function getNumResourceMetadata(resourceName: string, metadataKey: string): number { 
	return _in(0x00000000, 0x0776e864, _ts(resourceName), _ts(metadataKey), _r, _ri); 
}

export function getNumResources(): number { 
	return _in(0x00000000, 0x0863f27b, _r, _ri); 
}

/**
 * On the server this will return the players source, on the client it will return the player handle.
 * @param bagName
 */
export function getPlayerFromStateBagName(bagName: string): number { 
	return _in(0x00000000, 0xa56135e0, _ts(bagName), _r, _ri); 
}

/**
 * A getter for [SET_PLAYER_MELEE_WEAPON_DAMAGE_MODIFIER](#\_0x4A3DC7ECCC321032).
 * @param playerId
 */
export function getPlayerMeleeWeaponDamageModifier(playerId: number): number { 
	return _in(0x00000000, 0x8689a825, playerId, _r, _rf); 
}

/**
 * A getter for [SET_PLAYER_WEAPON_DAMAGE_MODIFIER](#\_0xCE07B9F7817AADA3).
 * @param playerId
 */
export function getPlayerWeaponDamageModifier(playerId: number): number { 
	return _in(0x00000000, 0x2a3d7cda, playerId, _r, _rf); 
}

/**
 * A getter for [SET_PLAYER_WEAPON_DEFENSE_MODIFIER](#\_0x2D83BC011CA14A3C).
 * @param playerId
 */
export function getPlayerWeaponDefenseModifier(playerId: number): number { 
	return _in(0x00000000, 0xf1543251, playerId, _r, _rf); 
}

/**
 * A getter for [\_SET_PLAYER_WEAPON_DEFENSE_MODIFIER\_2](#\_0xBCFDE9EDE4CF27DC).
 * @param playerId
 */
export function getPlayerWeaponDefenseModifier2(playerId: number): number { 
	return _in(0x00000000, 0x986b65ff, playerId, _r, _rf); 
}

/**
 * Returns all commands that are registered in the command system.
 * The data returned adheres to the following layout:
 * 
 * ```
 * [
 * {
 * "name": "cmdlist"
 * },
 * {
 * "name": "command1"
 * }
 * ]
 * ```
 */
export function getRegisteredCommands(): any { 
	return _in(0x00000000, 0xd4bef069, _r, _ro); 
}

export function getResourceByFindIndex(findIndex: number): string { 
	return _in(0x00000000, 0x387246b7, findIndex, _r, _s); 
}

/**
 * A getter for [SET_RESOURCE_KVP_FLOAT](#\_0x9ADD2938).
 * @param key
 */
export function getResourceKvpFloat(key: string): number { 
	return _in(0x00000000, 0x35bdceea, _ts(key), _r, _rf); 
}

/**
 * A getter for [SET_RESOURCE_KVP_INT](#\_0x6A2B1E8).
 * @param key
 */
export function getResourceKvpInt(key: string): number { 
	return _in(0x00000000, 0x557b586a, _ts(key), _r, _ri); 
}

/**
 * A getter for [SET_RESOURCE_KVP](#\_0x21C7A35B).
 * @param key
 */
export function getResourceKvpString(key: string): string { 
	return _in(0x00000000, 0x5240da5a, _ts(key), _r, _s); 
}

/**
 * Gets the metadata value at a specified key/index from a resource's manifest.
 * See also: [Resource manifest](https://docs.fivem.net/resources/manifest/)
 * @param resourceName
 * @param metadataKey
 * @param index
 */
export function getResourceMetadata(resourceName: string, metadataKey: string, index: number): string { 
	return _in(0x00000000, 0x964bab1d, _ts(resourceName), _ts(metadataKey), index, _r, _s); 
}

/**
 * Returns the current state of the specified resource.
 * @param resourceName
 */
export function getResourceState(resourceName: string): string { 
	return _in(0x00000000, 0x4039b485, _ts(resourceName), _r, _s); 
}

/**
 * Returns the value of a state bag key.
 * @param bagName
 * @param key
 */
export function getStateBagValue(bagName: string, key: string): any { 
	return _in(0x00000000, 0x637f4c75, _ts(bagName), _ts(key), _r, _ro); 
}

export function getVehicleHandbrake(vehicle: number): boolean { 
	return _in(0x00000000, 0x483b013c, vehicle, _r); 
}

export function getVehicleSteeringAngle(vehicle: number): number { 
	return _in(0x00000000, 0x1382fcea, vehicle, _r, _rf); 
}

export function invokeFunctionReference(referenceIdentity: string, argsSerialized: string, argsLength: number, retvalLength: number): [string, number] { 
	const [retval, retvalLength_out] = _in(0x00000000, 0xe3551879, _ts(referenceIdentity), _ts(argsSerialized), argsLength, _ii(retvalLength), _r, _s);
	return [retval as string, retvalLength_out as number]; 
}

export function isAceAllowed(object: string): boolean { 
	return _in(0x00000000, 0x7ebb9929, _ts(object), _r); 
}

/**
 * Gets whether or not this is the CitizenFX server.
 */
export function isDuplicityVersion(): boolean { 
	return _in(0x00000000, 0xcf24c52e, _r); 
}

export function isPrincipalAceAllowed(principal: string, object: string): boolean { 
	return _in(0x00000000, 0x37cf52ce, _ts(principal), _ts(object), _r); 
}

export function isVehicleEngineStarting(vehicle: number): boolean { 
	return _in(0x00000000, 0xbb340d04, vehicle, _r); 
}

/**
 * Reads the contents of a text file in a specified resource.
 * If executed on the client, this file has to be included in `files` in the resource manifest.
 * Example: `local data = LoadResourceFile("devtools", "data.json")`
 * @param resourceName
 * @param fileName
 */
export function loadResourceFile(resourceName: string, fileName: string): string { 
	return _in(0x00000000, 0x76a9ee1f, _ts(resourceName), _ts(fileName), _r, _s); 
}

/**
 * Returns the owner ID of the specified entity.
 * @param entity
 */
export function networkGetEntityOwner(entity: number): number { 
	return _in(0x00000000, 0x526fee31, entity, _r, _ri); 
}

/**
 * Scope entry for profiler.
 * @param scopeName
 */
export function profilerEnterScope(scopeName: string): void { 
	return _in(0x00000000, 0xc795a4a9, _ts(scopeName)); 
}

/**
 * Scope exit for profiler.
 */
export function profilerExitScope(): void { 
	return _in(0x00000000, 0xb39ca35c); 
}

/**
 * Returns true if the profiler is active.
 */
export function profilerIsRecording(): boolean { 
	return _in(0x00000000, 0xf8b7d7bb, _r); 
}

/**
 * Registered commands can be executed by entering them in the client console (this works for client side and server side registered commands). Or by entering them in the server console/through an RCON client (only works for server side registered commands). Or if you use a supported chat resource, like the default one provided in the cfx-server-data repository, then you can enter the command in chat by prefixing it with a `/`.
 * 
 * Commands registered using this function can also be executed by resources, using the [`ExecuteCommand` native](#\_0x561C060B).
 * 
 * The restricted bool is not used on the client side. Permissions can only be checked on the server side, so if you want to limit your command with an ace permission automatically, make it a server command (by registering it in a server script).
 * 
 * **Example result**:
 * 
 * ![](https://i.imgur.com/TaCnG09.png)
 * @param commandName
 * @param handler
 * @param restricted
 */
export function registerCommand(commandName: string, handler: any, restricted: boolean): void { 
	return _in(0x00000000, 0x5fa79b0f, _ts(commandName), _mfr(handler), restricted); 
}

/**
 * An internal function which allows the current resource's HLL script runtimes to receive state for the specified event.
 * @param eventName
 */
export function registerResourceAsEventHandler(eventName: string): void { 
	return _in(0x00000000, 0xd233a168, _ts(eventName)); 
}

/**
 * **Experimental**: This native may be altered or removed in future versions of CitizenFX without warning.
 * 
 * Removes a handler for changes to a state bag.
 * @param cookie
 */
export function removeStateBagChangeHandler(cookie: number): void { 
	return _in(0x00000000, 0xd36be661, cookie); 
}

/**
 * A setter for [GET_RESOURCE_KVP_STRING](#\_0x5240DA5A).
 * @param key
 * @param value
 */
export function setResourceKvp(key: string, value: string): void { 
	return _in(0x00000000, 0x21c7a35b, _ts(key), _ts(value)); 
}

/**
 * A setter for [GET_RESOURCE_KVP_FLOAT](#\_0x35BDCEEA).
 * @param key
 * @param value
 */
export function setResourceKvpFloat(key: string, value: number): void { 
	return _in(0x00000000, 0x9add2938, _ts(key), _fv(value)); 
}

/**
 * A setter for [GET_RESOURCE_KVP_INT](#\_0x557B586A).
 * @param key
 * @param value
 */
export function setResourceKvpInt(key: string, value: number): void { 
	return _in(0x00000000, 0x06a2b1e8, _ts(key), value); 
}

/**
 * Internal function for setting a state bag value.
 * @param bagName
 * @param keyName
 * @param valueData
 * @param valueLength
 * @param replicated
 */
export function setStateBagValue(bagName: string, keyName: string, valueData: string, valueLength: number, replicated: boolean): void { 
	return _in(0x00000000, 0x8d50e33a, _ts(bagName), _ts(keyName), _ts(valueData), valueLength, replicated); 
}

export function startFindKvp(prefix: string): number { 
	return _in(0x00000000, 0xdd379006, _ts(prefix), _r, _ri); 
}

/**
 * The backing function for TriggerEvent.
 * @param eventName
 * @param eventPayload
 * @param payloadLength
 */
export function triggerEventInternal(eventName: string, eventPayload: string, payloadLength: number): void { 
	return _in(0x00000000, 0x91310870, _ts(eventName), _ts(eventPayload), payloadLength); 
}

/**
 * Returns whether or not the currently executing event was canceled.
 */
export function wasEventCanceled(): boolean { 
	return _in(0x00000000, 0x58382a19, _r); 
}
