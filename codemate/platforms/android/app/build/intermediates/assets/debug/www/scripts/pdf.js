var gadget = new cloudprint.Gadget();
var fileName = "test.pdf";

var fileUrl = "";

function generatePDF() {
    var date = getDate();
    var time = timeNow();
    fileName = "CM_Report_" + date + "_" + time + ".pdf";

    console.log("generating pdf...");
    var doc = new jsPDF();

    //var pdfhtml = '<html><head><link rel="stylesheet" href="css/pdf.css" /></head><body>';
    var pdfhtml = '<html><head><link rel="stylesheet" href="../css/materialize.min.css"></head><body>';
    pdfhtml += "<h1>CodeMate Report - " + date + " " + time + "</h1>"
    pdfhtml += "<h3>Code Started: " + actions[0].time + "</h3>";
    pdfhtml += "<h3>Elapsed time: " + $('#main-minutes').html() + ":" + $('#main-seconds').html() + "</h3>";
    pdfhtml += "<h3>Reason: " + $('#term-reason').html() + "</h3>";
    pdfhtml += `<table style="width:100%"><tbody id="report-table-body" style="border:1px solid black"><tr style="float:left"><th>Name</th><th>Details</th><th>Time</th></tr>`;
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
    /* console.log('adding to doc...');
     doc.fromHTML(pdfhtml, 20, 20, { 'width': 600 });
     console.log('saving...');
     doc.save(fileName);
     console.log('save complete');
     /*
         var pdfOutput = doc.output();
         console.log(pdfOutput);

         console.log("file system...");
         window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {

             console.log(fileSystem.name);
             console.log(fileSystem.root.name);
             console.log(fileSystem.root.fullPath);

             fileSystem.root.getFile("test.pdf", { create: true }, function(entry) {
                 var fileEntry = entry;
                 console.log(entry);
                 fileUrl = fileEntry.toURL();
                 console.log(fileEntry.toURL());
                 entry.createWriter(function(writer) {
                     writer.onwrite = function(evt) {
                         console.log("write success");
                     };

                     console.log("writing to file");
                     writer.write(pdfOutput);
                     window.open("data:application/pdf," + encodeURI(fileEntry));
                 }, function(error) {
                     console.log(error);
                 });

                 //gadget.setPrintDocument("pdf", "Print", pdfhtml);
                 //gadget.openPrintDialog();
                 /*console.log(pdfhtml);
                 var printWindow = window.open('', '', 'height=630,width=360');
                 printWindow.document.write(pdfhtml);
                 printWindow.document.close();
                 printWindow.print();
             });
         });
         */
}