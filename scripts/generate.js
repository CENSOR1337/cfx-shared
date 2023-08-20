const fs = require("fs");
const { Native } = require("cfx-natives/scripts/Native");

const debugNatives = [
    "0x3FEF770D40960D5A",
    "0xECB2FC7235A7D137",
    "0xEEF059FAD016D209",
    "0x2975C866E6713290",
    "0xA6E9C38DB51D7748",
    "0xBE8CD9BE829BBEBF",
    "0x7B3703D2D32DFA18",
    "0xC906A7DAB05C8D2B",
    "0x8BDC7BFC57A81E76",
    "0x9E82F0F362881B29",
    "0xCF143FB9"
]
const bDebug = false;
const header = `
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
}`;


function generateNatives() {
    const path = "./bin/natives.json";
    if (!fs.existsSync(path)) throw new Error(`File ${path} not found`);
    const nativeDB = JSON.parse(fs.readFileSync(path, "utf8"));
    const allNatives = new Array();

    for (const [namespace, natives] of Object.entries(nativeDB)) {
        for (const [hash, native] of Object.entries(natives)) {
            native.hash = hash;
            native.namespace = namespace;
            allNatives.push(native);
        }
    }

    // Sort by name
    allNatives.sort((a, b) => {
        if (a.nativeName > b.nativeName) {
            return 1;
        } else {
            return -1;
        }
    });

    let output = header;
    allNatives.forEach((nativeInfo) => {
        if (bDebug && !debugNatives.includes(nativeInfo.hash)) return;
        if (nativeInfo.namespace != "CFX") return;
        if (nativeInfo.apiset != "shared") return;
        const native = new Native(nativeInfo);
        output = output.concat(native.generate());
    });

    if (!fs.existsSync("./src")) {
        fs.mkdirSync("./src");
    }
    fs.writeFileSync("./src/sharedNatives.ts", output);

}

generateNatives();