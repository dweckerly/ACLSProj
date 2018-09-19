var medications = [
    {
        name: "Epinephrine 1:10,000",
        dataTag: "epi",
        doseAmount: 0.5,
        doseUnit: "MG",
        route: "IV",
        type: "timer"
    },
    {
        name: "Atropine",
        dataTag: "atro",
        doseAmount: 1,
        doseUnit: "MG",
        route: "IV",
        type: "timer"
    },
    {
        name: "Sodium Bicarbonate",
        dataTag: "sobic",
        doseAmount: 50,
        doseUnit: "MEQ",
        route: "IVP",
        type: "alert"
    },
    {
        name: "Calcium Chloride",
        dataTag: "cacl",
        doseAmount: 500,
        doseUnit: "MG",
        route: "IVP",
        type: "alert"
    },
    {
        name: "Narcan",
        dataTag: "narca",
        doseAmount: 2,
        doseUnit: "MG",
        route: "IV",
        type: "timer"
    },
    {
        name: "Dextrose 50",
        dataTag: "d50",
        doseAmount: 25,
        doseUnit: "Grams",
        route: "IVP",
        type: "alert"
    },
    {
        name: "Glucagon",
        dataTag: "gluca",
        doseAmount: 1,
        doseUnit: "MG",
        route: "IM",
        type: "alert"
    },
    {
        name: "Mag Sulfate",
        dataTag: "magsulf",
        doseAmount: 2,
        douseUnit: "Grams",
        route: "IVP",
        type: "alert"
    }
];

var procedures = [
    {
        name: "Pulse Check",
        details: "Check for pulse",
        dataTag: "pulse",
        tpye: "timer"
    },
    {
        name: "I. V.",
        details: "",
        dataTag: "iv",
        type: "alert"
    },
    {
        name: "Interosseous",
        details: "",
        dataTag: "interos",
        type: "alert"
    },
    {
        name: "Intubation",
        details: "Check for pulse",
        dataTag: "intubat",
        type: "alert"
    },
    {
        name: "Nasogastric Tube",
        details: "",
        dataTag: "nasogas",
        type: "alert"
    }
];

var timersData = [
    {
        name: "Epinephrine",
        alertMin: 2,
        alertSec: 45,
        dataTag: "epi",
        type: "medication"
    },
    {
        name: "Pulse/Defib",
        alertMin: 1,
        alertSec: 45,
        dataTag: "pulse",
        type: "procedure"
    },
    {
        name: "Atropine",
        alertMin: 3,
        alertSec: 0,
        dataTag: "atro",
        type: "medication"
    },
    {
        name: "Narcan",
        alertMin: 15,
        alertSec: 0,
        dataTag: "narca",
        type: "medication"
    }
];