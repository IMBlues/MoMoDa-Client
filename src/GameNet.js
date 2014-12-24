/**
 * Created by Yu on 2014/12/17 0017.
 */
function GameNet()
{
    this.test = 0;
    var gameMessage;
    var _this = this;
    webSocket = 0;
    _this.wsServer = 0;
    var HOST;
    var PORT;

    var init = function () {
        HOST = '120.24.64.232';
        PORT = '8888';
        _this.wsServer = 'ws://' + HOST + ':' + PORT;
    };

    var onOpen = function () {
        cc.log("Socket has been opened!");
    };

    var onClose = function () {
        cc.log("Socket has been closed!");
    };

    var onError = function () {
        cc.log("Socket has errors!");
    };

    var onTimeout = function () {
        cc.log("Socket has been timeout!");
    };

    var onMessage = function (msg) {
        cc.log(msg);
        gameMessage = msg;
    };

    this.recvMessage = function () {
        return gameMessage;
    };

    var connect = function () {
        try {
            webSocket = new WebSocket(_this.wsServer);

            webSocket.onopen = function () {
                onOpen();
            };
            webSocket.onclose = function () {
                onClose();
            };
            webSocket.onmessage = function (msg) {
                msg = msg.data;
                onMessage(msg);
            };
            webSocket.onerror = function () {
                onError();
            };
            webSocket.ontimeout = function () {
                onTimeout();
            };
        }
        catch (ex) {
            cc.log(ex);
        }
    };

    this.sendMessage = function (msg) {
        waitForConnection(function () {
            webSocket.send(msg);
        }, 1000);
    };

    var waitForConnection = function (callback, interval) {
        if (webSocket.readyState === 1) {
            callback();
        } else {
            var that = this;
            setTimeout(function () {
                that.waitForConnection(callback);
            }, interval);
        }
    };

    this.testFunction = function () {
        this.test = 1;
    };

    init();
    connect();
    this.testFunction();
}