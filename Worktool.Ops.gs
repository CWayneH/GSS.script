function itemAlter() {
  var s = SpreadsheetApp.getActiveSheet();
  if( s.getName() == "checklist" ) { //checks that we're on the correct sheet
    var r = s.getActiveCell();
    if( r.getColumn() == 3 ) { //column to check
      // var nextCell = r.offset(0, 1);
      //the 0 here can be changes to the number of cells to go down, the 4 here can be changes to the number of cells to go right
      //if( nextCell.getValue() === '' ) //use this if you want to check if empty
      r.offset(0, 1).setValue(new Date()).setNumberFormat("yyyy/MM/dd hh:mm:ss");
      r.offset(0, -2).insertCheckboxes();
      var sn = Utilities.formatDate(new Date(), "GMT+8", "yyMMdd").concat('-'+Utilities.formatString("%02d", acmul()));
      r.offset(0, -1).setValue(sn);
    }
    if ( r.getColumn() == 1 && r.getValue() == true ) {
      r.offset(0, 4).setValue(new Date()).setNumberFormat("yyyy/MM/dd hh:mm:ss");
    } else if(  r.getColumn() == 1 && r.getValue() == false ) {
      r.offset(0, 4).setValue(null);
    }
  }
  // Logger.log(Utilities.formatDate(new Date(), "GMT+8", "yyMMdd").concat(Utilities.formatString("%02d", acmul())));
}

var scriptPrp = PropertiesService.getScriptProperties();
function acmulReset() {
  scriptPrp.setProperty('counter', 0);
  // comment the above line otherwise it's be reset each time
}
function acmul(){ // accumulation
  var counter = scriptPrp.getProperty('counter');
  counter++;
  scriptPrp.setProperty('counter', counter);
  Logger.log(counter);
  return counter;  
}

function trueVacuum() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName('checklist');
  let shTgt = ss.getSheetByName('completed');
  let data = sh.getDataRange().getValues();

  data.shift(); // remove headers
  var i=1;
  data.filter( row => {
      ++i;
      // Logger.log(i);
      if(  row[0] === true  ) {
        Logger.log("Deleting row idx:"+i+", data:["+row+"]");
        shTgt.appendRow(row);
        sh.deleteRow(i);
        i-=1;
      }
    }
  );
}
