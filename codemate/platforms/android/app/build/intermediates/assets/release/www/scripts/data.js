var defaultMedications = [{
        name: "Amnioderone",
        dataTag: "amni",
        dose: [150, 300],
        unit: "MG",
        route: "IVP",
        type: "alert"
    },
    {
        name: "Atropine",
        dataTag: "atro",
        dose: [1],
        unit: "MG",
        route: "IVP",
        type: "timer"
    },
    {
        name: "Calcium Chloride",
        dataTag: "cacl",
        dose: [0.5, 1],
        unit: "Grams",
        route: "IVP",
        type: "alert"
    },
    {
        name: "Dextrose 50",
        dataTag: "d50",
        dose: [25, 50],
        unit: "Grams",
        route: "IVP",
        type: "alert"
    },
    {
        name: "Diprivan",
        dataTag: "diprivan-drip",
        dose: [5.0, 10.0, 15.0, 20.0, 25.0, 30.0, 35.0, 40.0, 45.0, 50.0],
        unit: "mcg/kg/min",
        route: "drip",
        type: "alert"
    },
    {
        name: "Dopamine",
        dataTag: "dopamine-drip",
        dose: [5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0],
        unit: "mcg/kg/min",
        route: "drip",
        type: "alert"
    },
    {
        name: "Epinephrine",
        dataTag: "epi",
        dose: [1.0],
        unit: "MG",
        route: "IVP",
        type: "timer"
    },
    {
        name: "Epinephrine",
        dataTag: "epi-drip",
        dose: [2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0],
        unit: "mcg/min",
        route: "drip",
        type: "alert"
    },
    {
        name: "Glucagon",
        dataTag: "gluca",
        dose: [1],
        unit: "MG",
        route: "IVP",
        type: "alert"
    },
    {
        name: "Levophed",
        dataTag: "levophed-drip",
        dose: [2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0],
        unit: "mcg/min",
        route: "drip",
        type: "alert"
    },
    {
        name: "Mag Sulfate",
        dataTag: "magsulf",
        dose: [1, 2],
        unit: "Grams",
        route: "IVP",
        type: "alert"
    },
    {
        name: "Narcan",
        dataTag: "narca",
        dose: [2],
        unit: "MG",
        route: "IVP",
        type: "timer"
    },
    {
        name: "Neosynephrine",
        dataTag: "neosyn-drip",
        dose: [2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0],
        unit: "mcg/min",
        route: "drip",
        type: "alert"
    },
    {
        name: "Sodium Bicarbonate",
        dataTag: "sobic",
        dose: [50, 100],
        unit: "MEQ",
        route: "IVP",
        type: "alert"
    },
    {
        name: "Vasopressin",
        dataTag: "vasop",
        dose: [0.01, 0.02, 0.03, 0.04],
        unit: "u/h",
        route: "drip",
        type: "alert"
    }
];

var defaultProcedures = [{
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
        name: "IV",
        details: "",
        dataTag: "iv",
        type: "alert"
    },
    {
        name: "Nasogastric Tube",
        details: "",
        dataTag: "nasogas",
        type: "alert"
    },
    {
        name: "Pacing",
        details: "",
        dataTag: "pacing",
        type: "alert"
    },
    {
        name: "Pulse Check",
        details: "Check for pulse",
        dataTag: "pulse",
        type: "timer"
    },
];

var timersData = [{
        name: "Epinephrine",
        alertMin: 2,
        alertSec: 55,
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
        alertSec: 55,
        dataTag: "atro",
        type: "medication"
    },
    {
        name: "Narcan",
        alertMin: 14,
        alertSec: 55,
        dataTag: "narca",
        type: "medication"
    }
];

var medTest = JSON.parse(localStorage.getItem('Medications'));
if (medTest == null) {
    localStorage.setItem('Medications', JSON.stringify(defaultMedications));
    var medications = JSON.parse(localStorage.getItem('Medications'));
} else {
    var medications = JSON.parse(localStorage.getItem('Medications'));
}

var codeHistory;
if (!jQuery.isEmptyObject(JSON.parse(localStorage.getItem('Code_History')))) {
    codeHistory = JSON.parse(localStorage.getItem('Code_History'));
} else {
    codeHistory = [];
}

var procedures = defaultProcedures;
var newProcedures;
if (JSON.parse(localStorage.getItem('New_Procedures')) != null) {
    newProcedures = JSON.parse(localStorage.getItem('New_Procedures'));
    $(newProcedures).each((index) => {
        procedures.push(newProcedures[index]);
    });
} else {
    newProcedures = [];
}

console.log(JSON.parse(localStorage.getItem('Medications')));
console.log(JSON.parse(localStorage.getItem('New_Procedures')));
console.log(JSON.parse(localStorage.getItem('Code_History')));