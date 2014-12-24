/**
 * Created by Yu on 2014/12/19 0019.
 */
function MMDMessage()
{
    this.messageType = -1;
    this.messageContent = null;
    this.oppEnergy = null;
    this.meAction = null;
    this.oppAction = null;
    this.gameResult = null;

    this.unpack = function(msg) {
        if(typeof (msg) == "string") {
            this.messageType = msg.substring(0, 1);
            this.messageContent = msg.substring(1, msg.length);
        }
    };

    this.resultUnpack = function(msg) {
        if(typeof (msg) == "string") {
            this.messageType = msg.substring(0, 1);
            this.oppEnergy = msg.substring(1, 2);
            this.meAction = msg.substring(2, 3);
            this.oppAction = msg.substring(3, 4);
            this.gameResult = msg.substring(4, 5);
        }
    };

}

var GameMessage = new Array();
GameMessage["Open"] = 0;
GameMessage["Login"] = 1;
GameMessage["Ready"] = 2;
GameMessage["Matched"] = 3;
GameMessage["Alive"] = 4;
GameMessage["Start"] = 5;
GameMessage["Operation"] = 6;
GameMessage["Hangup"] = 7;
GameMessage["Result"] = 8;

