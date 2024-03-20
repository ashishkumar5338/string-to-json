console.log("Hello..!!!");

function change() {
    stringToJson();
}

// For Generating Excel
function excel() {
    // Retrieve the value of the formatted textarea
    let formattedText = document.getElementById("formatted").value;

    // Convert the formatted text (assumed to be JSON) to Excel
    let workbook = XLSX.utils.book_new();
    let worksheet = XLSX.utils.json_to_sheet(JSON.parse(formattedText));
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Save Excel file
    XLSX.writeFile(workbook, 'data.xlsx');
}

function trimAllLines(text) {


    // Use a regular expression to remove all text before the first occurrence of "Name:"
    let filterText = text.replace(/[\s\S]*?(?=Name:)/, '');
    
    // Split the text into lines
    let lines = filterText.split('\n');
    // console.log(lines);

    // Trim each line and replace "VM..." until "Name"
    let trimmedLines = [];
    lines.forEach(line => {
        // Replace "VM..." until "Name" in each entry
        line = line.replace(/^VM.*?Name/, 'Name');
        let trimmedLine = line.trim();
        trimmedLines.push(trimmedLine);
    });

    // Join the trimmed lines back into a single string
    let trimmedText = trimmedLines.join('\n');

    return trimmedText;
}

// Only for Single Data
/*
function stringToJson() {
    let originalText = document.getElementById("raw").value;

    let trimmedText = trimAllLines(originalText);
    // console.log(trimmedText);

    // Split the text into individual entries based on the separator "VM..."
    let entries = trimmedText.split(/\n(?=VM\d+:\d+\sName:)/gm);

    // Replace "VM..." until "Name" in each entry
    for (let i = 0; i < entries.length; i++) {
        entries[i] = entries[i].replace(/^VM.*?Name/, 'Name');
    }

    // Log the entries to see if they are split correctly
    // console.log(entries);
    let extracted=cleanAndExtractData(entries);
    console.log(extracted);
    let formattedText = document.getElementById("formatted");
    formattedText.value=JSON.stringify(extracted, null, 2);    
}
*/

// Convert each entry into JSON format
function cleanAndExtractData(entries) {
    let allowedKeys = ["Name", "E-mail", "E-Mail", "Course", "Mobile No", "Contact No", "City", "State", "Qualification"];
    let jsonArray = [];
    entries.forEach((entry, index) => {
        // console.log(`Entry ${index}: ${entry}`);
        let lines = entry.trim().split('\n');
        let details = {};
        lines.forEach((line, lineIndex) => {
            // console.log(`Line ${lineIndex}: ${line}`);
            let keyValue = line.split(':');
            if (keyValue.length === 2) {
                let key = keyValue[0].trim();
                let value = keyValue[1].trim();
                if (allowedKeys.includes(key)) { // Check if key is allowed
                    details[key] = value;
                }
            } else {
                // console.log(`Invalid line: ${line}`);
            }
        });
        jsonArray.push(details);
    });
    return jsonArray;
}


// For Forwarded Data
function stringToJson() {
    let originalText = document.getElementById("raw").value;

    let trimmedText = trimAllLines(originalText);
    // console.log(trimmedText);

    // Split the text into individual entries based on the separator "Name"
    let entries = trimmedText.split(/\n(?=Name)/gm);    
    // console.log(entries);

    let extracted = cleanAndExtractData(entries);
    // console.log(extracted);

    recordUpdate(extracted.length);

    let formattedText = document.getElementById("formatted");
    formattedText.value = JSON.stringify(extracted, null, 2);
}

// For Updating Records
function recordUpdate(length){
    let div=document.getElementById("record");
    if (div.style.display === "none") {
        div.style.display = "block"; // Set display to the default value
    }

    document.getElementById("record_count").innerText=length;
}
