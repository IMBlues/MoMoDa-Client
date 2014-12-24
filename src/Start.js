var StartLayer = cc.Layer.extend({
    waitLabel:null,
    guideLabel:null,
    backGround:null,
    titleImg:null,
    textBg:null,
    _scale:1,
    ctorThis:null,

    ctor:function (arg) {
        this.ctorThis = this;
        this._super();
        this._scale = arg;
        //alert(this._scale);
    },

    init:function () {

        this._super();

        var size = cc.director.getWinSize();
        //alert(size.width + "fff" + size.height);

        //connect to server
        var gameNet = new GameNet();
        var messageWarpper = new MMDMessage();

        //add the background
        this.backGround = new cc.Sprite(res.s_PlayBackGround);
        this.backGround.setAnchorPoint(0.5, 0.5);
        this.backGround.setPosition(size.width / 2, size.height / 2);
        this.backGround.setScale(this._scale);
        this.addChild(this.backGround, 0);

        //add the title
        this.titleImg = new cc.Sprite(res.s_Title);
        this.titleImg.setAnchorPoint(0.5, 0.5);
        this.titleImg.setPosition(size.width / 2, size.height * 0.75);
        this.titleImg.setScale(this._scale);
        this.addChild(this.titleImg, 1);

        //add the text bg
        this.textBg = new cc.Sprite(res.s_TextBg);
        this.textBg.setAnchorPoint(0.5, 0.5);
        this.textBg.setPosition(size.width / 2, size.height * 0.58);
        this.textBg.setScale(this._scale);
        this.addChild(this.textBg, 1);

        //add the textfield
        var nameText = new ccui.TextField();
        nameText.setAnchorPoint(0.5, 0.5);
        nameText.setPlaceHolder("Input your name！");
        nameText.setPlaceHolderColor(cc.color('#CBDADC'));
        nameText.setMaxLengthEnabled(true);
        nameText.setMaxLength(12);
        nameText.setEnabled(true);
        nameText.setFontName("Buxton Sketch");
        nameText.setFontSize(55 * this._scale);
        nameText.setTextColor(cc.color(0, 0, 0));
        nameText.setPosition(size.width / 2, size.height * 0.58);
        this.addChild(nameText, 2);

        //add the start button
        var startButtonImage = new cc.MenuItemImage(
            res.s_StartButton,
            res.s_StartButtonPressed,
            function () {
                var _this = this.ctorThis;
                var userName = nameText.getString();
                if (userName == "")
                    alert("Input your name!");
                else {
                    var serverResult;
                    gameNet.sendMessage(GameMessage["Ready"] + userName);
                    this.waitLabel.setString("WAITING...");
                    setTimeout(function () {
                        serverResult = gameNet.recvMessage();
                        messageWarpper.unpack(serverResult);
                        if (messageWarpper.messageType == GameMessage["Matched"]) {
                            gameNet.sendMessage(GameMessage["Alive"]);
                            setTimeout(function () {
                                serverResult = gameNet.recvMessage();
                                messageWarpper.unpack(serverResult);
                                if (messageWarpper.messageType == GameMessage["Start"]) {
                                    var scene = new PlayScene(gameNet, userName, messageWarpper.messageContent, _this._scale);
                                    cc.director.runScene(scene);
                                } else {
                                    alert("Start error");
                                }
                            }, 5000);
                        } else {
                            alert("Login error");
                        }
                    }, 5000);
                    var scene = new PlayScene(gameNet, userName, messageWarpper.messageContent, _this._scale);
                    cc.director.runScene(scene);
                }
            },this);
        startButtonImage.setAnchorPoint(0, 0);

        //add the startButton
        var startButton = new cc.Menu(startButtonImage);
        startButton.setAnchorPoint(0 ,0);
        startButton.setPosition(size.width * 0.379, size.height * 0.228);
        startButton.setScale(this._scale);
        this.addChild(startButton, 1);

        //add guideButton
        var guideButtonImage = new cc.MenuItemImage(
            res.s_guideButton,
            res.s_guideButton,
            function () {
                var scene = new GuideScene();
                cc.director.runScene(scene);
            },this);
        guideButtonImage.setAnchorPoint(0, 0);

        var guideButton = new cc.Menu(guideButtonImage);
        guideButton.setAnchorPoint(0, 0);
        guideButton.setPosition(size.width * 0.416, size.height * 0.1);
        guideButton.setScale(this._scale);
        this.addChild(guideButton, 1);

        //add the guide label
        this.titleImg = new cc.Sprite(res.s_guideImg);
        this.titleImg.setAnchorPoint(0, 0);
        this.titleImg.setPosition(size.width * 0.579, size.height * 0.054);
        this.titleImg.setScale(this._scale);
        this.addChild(this.titleImg, 1);


        //add the waiting label
        this.waitLabel = new cc.LabelTTF("", "Buxton Sketch", 36);
        this.waitLabel.setColor(cc.color("#FFFFFF"));
        this.waitLabel.setPosition(size.width / 2, size.height * 0.45);
        this.waitLabel.setScale(this._scale);
        this.addChild(this.waitLabel, 5);
    }
});

var StartScene = cc.Scene.extend({
    _scale:1,
    ctor:function (arg) {
        this._super();
        this._scale = arg;
    },

    onEnter:function () {
        this._super();
        var layer = new StartLayer(this._scale);
        this.addChild(layer);
        layer.init();
    }
});
