var medications = [{
        name: "Epinephrine",
        dataTag: "epi",
        doseAmount: 0.5,
        doseUnit: "MG",
        route: "IV",
        type: "timer"
    },
    {
        name: "Epinephrine",
        dataTag: "epi-drip",
        dose: [2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0],
        unit: "mcg/min",
        type: "drip"
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
        name: "Diprivan",
        dataTag: "diprivan-drip",
        dose: [5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0],
        unit: "mcg/kg/min",
        type: "drip"
    },
    {
        name: "Dopamine",
        dataTag: "dopamine-drip",
        dose: [5.0, 10.0, 15.0, 20.0, 25.0, 30.0, 35.0, 40.0, 45.0, 50.0],
        unit: "mcg/kg/min",
        type: "drip"
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
        name: "Levophed",
        dataTag: "levophed-drip",
        dose: [2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0],
        unit: "mcg/min",
        type: "drip"
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
    },
    {
        name: "Neosynephrine",
        dataTag: "neosyn-drip",
        dose: [2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0],
        unit: "mcg/min",
        type: "drip"
    },
];

var procedures = [{
        name: "Pulse Check",
        details: "Check for pulse",
        dataTag: "pulse",
        tpye: "timer"
    },
    {
        name: "IV",
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
        details: "",
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

var timersData = [{
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
        alertMin: 2,
        alertSec: 45,
        dataTag: "atro",
        type: "medication"
    },
    {
        name: "Narcan",
        alertMin: 14,
        alertSec: 45,
        dataTag: "narca",
        type: "medication"
    }
];