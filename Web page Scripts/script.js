const records = [];

function markAttendance() {
    const name = document.getElementById('name').value.trim();
    const date = new Date();
    const time = date.toLocaleTimeString();

    if (name === '') {
        alert('Please enter your name.');
        return;
    }

    // Get current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const record = { name, date: date.toDateString(), time, latitude, longitude };
            records.push(record);
            displayAttendanceRecord(record);
            clearInputFields();
        }, () => {
            alert('Error: Unable to retrieve your location.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

function displayAttendanceRecord(record) {
    const recordList = document.getElementById('records');
    const listItem = document.createElement('li');
    listItem.textContent = `Name: ${record.name}, Date: ${record.date}, Time: ${record.time}, Latitude: ${record.latitude}, Longitude: ${record.longitude}`;
    recordList.appendChild(listItem);
}

function clearInputFields() {
    document.getElementById('name').value = '';
}

function exportAttendance() {
    if (records.length === 0) {
        alert('No attendance records to export.');
        return;
    }

    const csvContent = records.map(record => `${record.name},${record.date},${record.time},${record.latitude},${record.longitude}`).join('\n');
    const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + csvContent);

    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'attendance.csv');
    document.body.appendChild(link);

    link.click();
}
