function generatePDF() {
    var date = actions[actions.length - 2].date;
    var time = actions[actions.length - 2].time;

    var fileName = "CM_Report_" + date + "_" + time + ".pdf";
    var pdfhtml = '<html><head><link rel="stylesheet" href="../css/materialize.min.css"></head><body>';
    pdfhtml += "<h1>CodeMate Report - " + date + " " + time + "</h1>"
    pdfhtml += "<h3>Code Started: " + actions[0].time + "</h3>";
    pdfhtml += "<h3>" + actions[actions.length - 1].desc + "</h3>";
    pdfhtml += "<h3>Reason: " + $('#term-reason').html() + "</h3>";
    pdfhtml += `<table style="width:100%"><tbody id="report-table-body" style="border:1px solid black"><tr><th>Action</th><th>Details</th><th>Time</th></tr>`;
    for (let i = 0; i < actions.length; i++) {
        for (let j = 0; j < medications.length; j++) {
            if (actions[i].tag == medications[j].dataTag) {
                if (actions[i].desc == "") {
                    actions[i].desc = medications[j].doseAmount + ` ` + medications[j].doseUnit + ` ` + medications[j].route;
                }
                if ('flag' in actions[i]) {
                    if (actions[i].flag) {
                        pdfhtml += `
                        <tr class='report-row' bgcolor="#f0e68c"> 
                        <td> ` + actions[i].name + ` </td> 
                        <td> ` + actions[i].desc + ` </td> 
                        <td> ` + actions[i].time + ` </td> 
                        </tr>`;
                    } else {
                        pdfhtml += `
                        <tr class='report-row'> 
                        <td> ` + actions[i].name + ` </td> 
                        <td> ` + actions[i].desc + ` </td> 
                        <td> ` + actions[i].time + ` </td> 
                        </tr>`;
                    }
                } else {
                    pdfhtml += `
                    <tr class='report-row'> 
                    <td> ` + actions[i].name + ` </td> 
                    <td> ` + actions[i].desc + ` </td> 
                    <td> ` + actions[i].time + ` </td> 
                    </tr>`;
                }
            }
        }
        for (let j = 0; j < procedures.length; j++) {
            if (actions[i].tag == procedures[j].dataTag) {
                if (actions[i].desc == "") {
                    actions[i].desc = procedures[j].details;
                }
                if ('flag' in actions[i]) {
                    if (actions[i].flag) {
                        pdfhtml += `
                            <tr class='report-row' bgcolor="#f0e68c"> 
                            <td> ` + actions[i].name + ` </td> 
                            <td class='truncate'> ` + actions[i].desc + ` </td> 
                            <td> ` + actions[i].time + ` </td> 
                            </tr>`;
                    } else {
                        pdfhtml += `
                        <tr class='report-row'> 
                        <td> ` + actions[i].name + ` </td> 
                        <td class='truncate'> ` + actions[i].desc + ` </td> 
                        <td> ` + actions[i].time + ` </td> 
                        </tr>`;
                    }
                } else {
                    pdfhtml += `
                        <tr class='report-row'> 
                        <td> ` + actions[i].name + ` </td> 
                        <td class='truncate'> ` + actions[i].desc + ` </td> 
                        <td> ` + actions[i].time + ` </td> 
                        </tr>`;
                }
            }
        }
    }

    pdfhtml += '</tbody></table></body></html>';

    var opts = {
        documentSize: "A4",
        landscape: "portrait",
        type: "share",
        fileName: fileName
    }

    pdf.fromData(pdfhtml,
            opts)
        .then(function() {})
        .catch(function() {});
}