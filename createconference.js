/** 
extension for dialplan 

	--------
      <extension name="1200">
        <condition field="destination_number" expression="^1200$">
          <action application="javascript" data="createconference.js"/>
        </condition>
      </extension> 
	--------
**/

var line = "====================================\n";


session.answer();

session.flushDigits();

while(session.ready()) {
			
			room = "1";

			var confroom = room + "@default";

			console_log("notice", "ConfRoom: [" + confroom  +"]\n");
			console_log("notice", line);

			session.flushDigits();
			
			//create conference
			session.execute( "conference", confroom);
}
