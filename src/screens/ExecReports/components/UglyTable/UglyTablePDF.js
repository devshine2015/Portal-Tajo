//
// one vehicle report table
// PDF generation
//

import ReactDOM from 'react-dom';

const pdgMake = require('pdfmake');


const jsPDF = require('jspdf');
require('jspdf-autotable');

function pdfMake(){

  const docDefinition = { 
    pageSize: 'A4',
    pageOrientation: 'landscape',
    content: 'This is an sample PDF printed with pdfMake',
  };
  pdfMake.createPdf(docDefinition).download('pdfMake.pdf');
}

export default function generatReportPDF(reportFrame) {

pdfMake();
return;

  const columns = ['ID', 'Name', 'Country', 'eMail', 'LOMG'];
  const rows = [
      [1, 'Shaw', 'สร้างสถานที่แบบหลายเหลี่ยม', 'Manuel_Morissette@yahoo.com',
      'Tenetur perspiciatis fuga et distinctio in fugiat aspernatur amet voluptas corrupti qui et animi tempore asperiores maxime nobis eos rerum'],
      [2, 'Nelson', 'Kazakhstan', 'Manuel_Morissette@yahoo.com',
      'Tenetur perspiciatis fuga et distinctio in fugiat aspernatur amet voluptas corrupti qui et animi tempore asperiores maxime nobis eos rerum'],
      [3, 'Garcia', 'Madagascar', 'Manuel_Morissette@yahoo.com',
      'Tenetur perspiciatis fuga et distinctio in fugiat aspernatur amet voluptas corrupti qui et animi tempore asperiores maxime nobis eos rerum'],
  ];


  const aNode = ReactDOM.findDOMNode(reportFrame);
  const t1 = aNode.childNodes[0].childNodes[0];
  const t2 = aNode.childNodes[1].childNodes[0];
  // Only pt supported (not mm or in)
  const doc = new jsPDF('l');
  const jsTableH = doc.autoTableHtmlToJson(t1);
  const jsTable = doc.autoTableHtmlToJson(t2);
  // console.log(jsTable);
  // doc.autoTable(jsTableH.columns, jsTable.data, {
  //   margin: { horizontal: 7 },
  //   bodyStyles: { valign: 'top' },
  //   styles: { overflow: 'linebreak', columnWidth: 'wrap' },
  //   columnStyles: { text: { columnWidth: 'auto' } },
  //   // styles: { overflow: 'linebreak', columnWidth: 'wrap' },
  //   // columnStyles: { text: { columnWidth: 'auto' } },
  // });
  doc.autoTable(columns, rows, 
    {
    margin: { horizontal: 7 },
    bodyStyles: { valign: 'top' },
    styles: { overflow: 'linebreak', columnWidth: 'wrap' },
    columnStyles: { text: { columnWidth: 'auto' } }
    });
  doc.save('tableData.pdf');
}

