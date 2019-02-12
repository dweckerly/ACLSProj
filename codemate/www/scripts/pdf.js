function generatePDF() {
    var filename = "CodeMate_Report_" + getDate() + ".pdf";
    //var pdfhtml = '<html><head><link rel="stylesheet" href="css/pdf.css" /></head><body>';
    var pdfhtml = '<html><head></head><body>';
    pdfhtml += "<h3>Code Started: " + actions[0].time + "</h3>";
    pdfhtml += "<h3>Elapsed time: " + $('#main-minutes').html() + ":" + $('#main-seconds').html() + "</h3>";
    pdfhtml += `<table><tbody id="report-table-body">`;
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
    console.log(pdfhtml);
    var printWindow = window.open('', '', 'height=630,width=360');
    printWindow.document.write(pdfhtml);
    printWindow.document.close();
    printWindow.print();
}

$('#pdf-btn').click(() => {
    generatePDF();
});