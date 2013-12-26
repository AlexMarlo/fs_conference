/** 
extension for dialplan 

	--------
      <extension name="1200">
        <condition field="destination_number" expression="^1200$">
          <action application="javascript" data="confroom.js"/>
        </condition>
      </extension> 
	--------
**/

var line = "====================================\n";

var sql;
var dtmf = new Object();
var replay = 1;

function mycb (session, type, data, arg) {

	if (type == "dtmf") {
		arg.digits += data.digit;
		if (arg.digits.length >= 1) {
			return false;
		}
	}
}

session.answer();

session.flushDigits();

while(session.ready()) {
	dtmf.digits = "";
	console_log("notice", "collecting dtmf digits . . .\n");
    
	while (dtmf.digits.length < 2 && session.ready()) {
		session.collectInput(mycb, dtmf, 5000);
	} 
	
	if ((!dtmf.digits) && (replay < 4)) {
		console_log("notice", "Replay # " + replay + "\n");
		session.flushDigits();
		replay++;
	} else if (replay >= 4) { 
		session.hangup();
	}

	if(dtmf.digits) {
    	console_log("notice", "Got Some Digits . . .\n");
		
		room = dtmf.digits;
		if ( !room != "00") {
   	 		console_log("notice", "Invalid Option . . .\n");
		} else {
		   	console_log("notice", "Found Valid Option . . .\n");
			

			var confroom = room + "@default";

			console_log("notice", "ConfRoom: [" + confroom  +"]\n");
			console_log("notice", line);

			session.flushDigits();
			
			//create conference
			session.execute( "conference", confroom);

			dtmf.digits = "";
		}
	}
}
