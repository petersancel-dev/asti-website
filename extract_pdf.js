const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('c:\\Users\\Owner\\OneDrive\\Documents\\JoelP\\Contex\\ASTI Introduction Regsitration Form.pdf');

// Check if 'default' export is needed
const parsePdf = pdf.default || pdf;

parsePdf(dataBuffer).then(function (data) {
    console.log(data.text);
}).catch(err => {
    console.error("Error parsing PDF:", err);
});
