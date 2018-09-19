var medications = {
    1: {
        name: "Epinephrine 1:10,000",
        dataTag: "epi",
        doseAmount: 0.5,
        doseUnit: "MG",
        route: "IV"
    },
    2: {
        name: "Atropine",
        dataTag: "atro",
        doseAmount: 1,
        doseUnit: "MG",
        route: "IV"
    },
    3: {
        name: "Sodium Bicarbonate",
        dataTag: "sobic",
        doseAmount: 50,
        doseUnit: "MEQ",
        route: "IVP"
    },
    4: {
        name: "Calcium Chloride",
        dataTag: "cacl",
        doseAmount: 500,
        doseUnit: "MG",
        route: "IVP"
    },
    5: {
        name: "Narcan",
        dataTag: "narca",
        doseAmount: 2,
        doseUnit: "MG",
        route: "IV"
    },
    6 : {
        name: "Dextrose 50",
        dataTag: "d50",
        doseAmount: 25,
        doseUnit: "Grams",
        route: "IVP"
    },
    7: {
        name: "Glucagon",
        dataTag: "gluca",
        doseAmount: 1,
        doseUnit: "MG",
        route: "IM"
    },
    8: {
        name: "Mag Sulfate",
        dataTag: "magsulf",
        doseAmount: 2,
        douseUnit: "Grams",
        route: "IVP"
    }
};

var procedures = {
    1: {
        name: "Pulse Check",
        details: "Check for pulse",
        dataTag: "pulse"
    },
    2: {
        name: "I. V.",
        details: "",
        dataTag: "iv"
    },
    3: {
        name: "Interosseous",
        details: "",
        dataTag: "interos"
    },
    4: {
        name: "Intubation",
        details: "Check for pulse",
        dataTag: "intubat"
    },
    5: {
        name: "Nasogastric Tube",
        details: "",
        dataTag: "nasogas"
    }
};

var timers = {
    1 : {
        name: "Epinephrine",
        alertMin: 2,
        alertSec: 45,
        dataTag: "epi",
        type: "medication"
    },
    2 : {
        name: "Pulse/Defib",
        alertMin: 1,
        alertSec: 45,
        dataTag: "pulse",
        type: "procedure"
    },
    3 : {
        name: "Atropine",
        alertMin: 3,
        alertSec: 0,
        dataTag: "atro",
        type: "medication"
    },
    4 : {
        name: "Narcan",
        alertMin: 15,
        alertSec: 0,
        dataTag: "narca",
        type: "medication"
    }
}