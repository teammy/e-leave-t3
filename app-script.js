// Replace with your Google Spreadsheet ID and Sheet Name
var SPREADSHEET_ID = '1I9RZHOdoMlg2H4mATswcVdUxP0nNMn5zS39aCuldl04';
var SHEET_NAME = 'Sheet1';
// Replace with your LINE Notify token
var LINE_NOTIFY_TOKEN = 'DaIwcZwUnALKLRHWiLgJdzoizQmLZPGGgOVTZj5Qn4D';

function checkMedicineExpiryDates() {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    var data = sheet.getDataRange().getValues();

    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); 

        var oneDayFromNow = new Date(currentDate);
    oneDayFromNow.setDate(oneDayFromNow.getDate() + 1);
    oneDayFromNow.setHours(0, 0, 0, 0);

        for (var i = data.length - 1; i >= 0; i--) {
        var row = data[i];
        var expiryDate = new Date(row[2]); 
        expiryDate.setHours(0, 0, 0, 0);

        if (+expiryDate < +oneDayFromNow) {
            sheet.deleteRow(i + 1);
        }
    }

    var sixMonthsFromNow = new Date(currentDate);
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    sixMonthsFromNow.setHours(0, 0, 0, 0);

    var oneMonthFromNow = new Date(currentDate);
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
    oneMonthFromNow.setHours(0, 0, 0, 0);

    var expiringMedicines6Months = [];
    var expiringMedicines1Month = [];

    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        var expiryDate = new Date(row[2]); 
        expiryDate.setHours(0, 0, 0, 0);

        if (+expiryDate == +sixMonthsFromNow) {
            expiringMedicines6Months.push(row);
        } else if (+expiryDate == +oneMonthFromNow) {
            expiringMedicines1Month.push(row);
        } 
    }

    if (isWeekday(currentDate)) {
        if (expiringMedicines6Months.length > 0) {
            sendLineNotification(expiringMedicines6Months, '6 เดือน \ud83d\udd70');
        }
        if (expiringMedicines1Month.length > 0) {
            sendLineNotification(expiringMedicines1Month, '1 เดือน \ud83c\udf4e\ud83c\udf4e');
        }
    }
}

function isWeekday(date) {
    var dayOfWeek = date.getDay();
    return dayOfWeek >= 1 && dayOfWeek <= 5; // Monday to Friday
}

function sendLineNotification(medicines, notificationType) {
  var today = toBuddhistCalendarDate(new Date());

  for (var i = 0; i < medicines.length; i++) {
    var medicine = medicines[i];
    var medicineName = medicine[0];
    var medicineLot = medicine[1];
    var medicineExp = formatDate(medicine[2]);

    var message = '\n\ud83c\udf4e\ud83c\udf4e ยาจะหมดอายุอีก ' + notificationType + ' \nยา: ' + medicineName + '\nLot: ' + medicineLot + '\nExp: ' + medicineExp;

    var url = 'https://notify-api.line.me/api/notify';
    var options = {
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + LINE_NOTIFY_TOKEN,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      payload: {
        'message': '\n' + message
      }
    };
    UrlFetchApp.fetch(url, options);
  }
}
function toBuddhistCalendarDate(date) {
  var day = date.getDate();
  var monthIndex = date.getMonth(); // Months are 0-indexed in JavaScript
  var year = date.getFullYear() + 543; // Convert to Buddhist calendar
  
  var thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม',
    'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน',
    'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];
  var month = thaiMonths[monthIndex];

  return day + ' ' + month + ' ' + year;
}


function formatDate(date) {
  var day = date.getDate();
  var monthIndex = date.getMonth(); // Months are 0-indexed in JavaScript
  var year = date.getFullYear();
  return day + '/' + (monthIndex + 1) + '/' + year;
}