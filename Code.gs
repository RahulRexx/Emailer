
function onOpen() {
  initMenu();
}

function initMenu() {
  var ui = SpreadsheetApp.getUi();
  var menu = ui.createMenu("Script");
  menu.addItem("Emailer","sidebar");
  
  menu.addToUi();
}

function sidebar() {
  var html = HtmlService.createHtmlOutputFromFile('index');
  SpreadsheetApp.getUi().showSidebar(html);
}



function sendEmails(subject,body) {
  var recipient = getEmails();
  if(recipient.length !==0)
  {
      for(var i =0;i<recipient.length;i++){
        GmailApp.sendEmail(recipient[i], subject, body);
       }
    return 1;
  }
  else{
    return 0;
  }

}

function getEmails() {
  var currsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Mailer Sheet");
  var lenghtRow = currsheet.getLastRow();
  var listOfEmails = [];
  Logger.log(lenghtRow);
  
  for(var i=2;i<=lenghtRow ; i++){
    var checkedOrNot = currsheet.getRange(i,2).getValue();
//     Logger.log(typeof checkedOrNot);
    if(checkedOrNot)
    {
      Logger.log(checkedOrNot);
      var currentEmail = currsheet.getRange(i,1).getValue();
      if(currentEmail.length !== 0 )
      {
        listOfEmails.push(currentEmail);
      }
    }
  }
  
  for(var i=0;i<listOfEmails.length;i++) {
    Logger.log(listOfEmails[i]);
  }
  
  return listOfEmails;
  
}




