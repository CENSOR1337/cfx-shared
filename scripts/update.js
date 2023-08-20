const fs = require("fs");

const nativeDb = {
    cfx: {
        cfx_natives: "https://runtime.fivem.net/doc/natives_cfx.json",
        natives: "https://runtime.fivem.net/doc/natives.json"
    },
    altv: {
        natives: "https://natives.altv.mp/natives"
    }
}

/*
 * CFX natives
 */

const paramTypes = {
    "void": "void",
    "char*": "string",
    "int": "int",
    "hash": "int",
    "bool": "boolean",
    "vehicle": "Vehicle",
    "long": "long",
    "float": "float",
    "entity": "Entity",
    "entity*": "Entity",
    "cam": "Cam",
    "vector3*": "Vector3",
    "float*": "float",
    "vector3": "Vector3",
    "ped": "Ped",
    "player": "Player",
    "int*": "int",
    "bool*": "boolean",
    "any": "Any",
    "blip": "Blip",
    "blip*": "Blip",
}

function getNativeName(name) {
    const parts = name.replace(/^_/, '').split('_');

    const firstPart = parts.shift().toLowerCase();
    const rest = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join('');

    return firstPart + rest;
}

function getParamType(type) {
    const lowerdType = type.toLowerCase();
    return paramTypes[lowerdType] || type;
}

function convertParam(param) {
    const name = param.name;
    const type = getParamType(param.type);
    const ref = param.type.includes("*") && !param.type.includes("char*")

    return { name, type, ref };
}

async function downloadCFXNatives() {
    const response = await fetch(nativeDb.cfx.cfx_natives);
    const nativeDB = await response.json();
    const cfxNatives = new Map();

    for (const [namespace, natives] of Object.entries(nativeDB)) {
        for (const [hash, native] of Object.entries(natives)) {
            const params = [];

            for (const param of native.params) {
                params.push(convertParam(param));
            }

            let results = new Array();
            const pointerCount = params.filter(p => p.ref).length;
            if (native.results) {
                const returnTypes = getParamType(native.results);
                results.push(returnTypes);
            } else {
                results.push("void");
            }

            for (const param of params) {
                if (param.ref) {
                    results.push(param.type);
                }
            }

            cfxNatives.set(hash, {
                name: native.name,
                jhash: "PLACEHOLDER",
                comment: native.description,
                params: params,
                results: results.length == 1 ? results[0] : `[${results.join(", ")}]`,
                nativeName: getNativeName(native.name),
                apiset: native.apiset
            });
        }
    }

    const jsonData = JSON.stringify({
        CFX: Object.fromEntries(cfxNatives)
    }, null, 4);
    if (!fs.existsSync("./bin")) {
        fs.mkdirSync("./bin");
    }
    fs.writeFile(`./bin/natives.json`, jsonData, (err) => {
        if (err) {
            console.error(err);
            return;
        };
    });

}

downloadCFXNatives();