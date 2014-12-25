var PlayLayer;
var PlayScene;

PlayLayer = cc.Layer.extend({
    _gameNet:null,
    _userName:null,
    _oppName:null,
    _scale:null,

    meAvatarImg:null,
    meAvatarBg:null,
    oppAvatarImg:null,
    oppAvatarBg:null,
    backGround:null,
    helloLabel:null,
    meEnergyImg:null,
    oppEnergyImg:null,

    timeout:3,
    timeoutLaybel:null,

    characterMe:null,
    characterOpp:null,
    energyMe:8,
    energyOpp:0,
    oppEnergyNumber:null,
    meEnergyNumber:null,

    meName:null,
    oppName:null,

    atButton1:null,
    atButton2:null,
    atButton3:null,
    atButton4:null,
    MoButton:null,
    EscapeButton:null,
    ChaseButton:null,
    ShieldButton:null,
    BlockButton:null,
    functionButtonFrame:null,
    attackButtonFrame:null,

    arrow:null,
    oppArrow:null,
    shield:null,
    oppShield:null,

    lock:0,
    messageWrapper:null,
    attackMessageWrapper:null,

    _this:null,

    ctor:function (arg1, arg2, arg3, arg4) {
        this._super();
        this._gameNet = arg1;
        this._userName = arg2;
        this._oppName = arg3;
        this._scale = arg4;
    },

    init:function () {

        this._super();

        this.test = 0;

        this._this = this;

        var size = cc.director.getWinSize();

        cc.spriteFrameCache.addSpriteFrames(res.s_FullPlist);
        //cc.spriteFrameCache.addSpriteFrames(res.s_CharacterOppLitFrame);

        this.messageWrapper = new MMDMessage();

        //set the background
        this.backGround = new cc.Sprite(res.s_PlayBackGround);
        this.backGround.setAnchorPoint(0.5, 0.5);
        this.backGround.setPosition(size.width / 2, size.height / 2);
        this.backGround.setScale(this._scale);
        this.addChild(this.backGround, 0);

        //add the time label
        this.timeoutLaybel = new cc.LabelTTF("Let's Go!", "Buxton Sketch", 60);
        this.timeoutLaybel.setColor(cc.color( "#3A451C"));
        this.timeoutLaybel.setPosition(size.width / 2, size.height * 0.85);
        this.timeoutLaybel.setScale(this._scale);
        this.addChild(this.timeoutLaybel, 5);

        //add the round label
        this.roundLaybel = new cc.LabelTTF("ROUND 1", "Buxton Sketch", 48);
        this.roundLaybel.setColor(cc.color("#C39E00"));
        this.roundLaybel.setPosition(size.width / 2, size.height * 0.1);
        this.roundLaybel.setScale(this._scale);
        this.addChild(this.roundLaybel, 5);

        //add opp avatar
        this.oppAvatarBg = new cc.Sprite(res.s_AvatarOppBg);
        this.oppAvatarBg.setAnchorPoint(0, 1);
        this.oppAvatarBg.setPosition(size.width * 0.052, size.height * 0.9);
        this.oppAvatarBg.setScale(this._scale);
        this.addChild(this.oppAvatarBg, 1);

        this.oppAvatarImg = new CharacterAvatar(res.s_AvatarOppNormal);
        this.oppAvatarImg.setMeOrYou(1);
        this.oppAvatarImg.setAnchorPoint(0, 1);
        this.oppAvatarImg.setPosition(size.width*0.052, size.height * 0.9);
        this.oppAvatarImg.setScale(this._scale);
        this.addChild(this.oppAvatarImg, 2);

        //add me avatar
        this.meAvatarBg = new cc.Sprite(res.s_AvatarMeBg);
        this.meAvatarBg.setAnchorPoint(1, 1);
        this.meAvatarBg.setPosition(size.width * 0.948, size.height * 0.933);
        this.meAvatarBg.setScale(this._scale);
        this.addChild(this.meAvatarBg, 1);

        this.meAvatarImg = new CharacterAvatar(res.s_AvatarMeNormal);
        this.meAvatarImg.setMeOrYou(0);
        this.meAvatarImg.setAnchorPoint(1, 1);
        this.meAvatarImg.setPosition(size.width * 0.948, size.height* 0.933);
        this.meAvatarImg.setScale(this._scale);
        this.addChild(this.meAvatarImg, 2);

        //add opp name
        this.oppName = new cc.LabelTTF(this._oppName, "Buxton Sketch", 28);
        this.oppName.setColor(cc.color("#3A451C"));
        this.oppName.setAnchorPoint(0, 0.5);
        this.oppName.setPosition(size.width*0.13, size.height *0.87);
        this.oppName.setScale(this._scale);
        this.addChild(this.oppName, 5);

        //add me name
        this.meName = new cc.LabelTTF(this._userName, "Buxton Sketch", 36);
        this.meName.setColor(cc.color("#3A451C"));
        this.meName.setAnchorPoint(1, 1);
        this.meName.setPosition(size.width * 0.82, size.height * 0.93);
        this.meName.setScale(this._scale);
        this.addChild(this.meName, 5);

        //add the opp energy
        this.oppEnergyImg = new cc.Sprite(res.s_Energy);
        this.oppEnergyImg.setAnchorPoint(0, 1);
        this.oppEnergyImg.setPosition(size.width*0.065, size.height * 0.75);
        this.oppEnergyImg.setScale(this._scale * 0.8);
        this.addChild(this.oppEnergyImg, 1);

        //add opp energy number
        this.oppEnergyNumber = new cc.LabelTTF("x " + this.energyOpp, "Buxton Sketch", 36);
        this.oppEnergyNumber.setColor(cc.color("#3A451C"));
        this.oppEnergyNumber.setAnchorPoint(0, 1);
        this.oppEnergyNumber.setPosition(size.width*0.08, size.height *0.75);
        this.oppEnergyNumber.setScale(this._scale * 0.8);
        this.addChild(this.oppEnergyNumber, 5);

        //add the me energy
        this.meEnergyImg = new cc.Sprite(res.s_Energy);
        this.meEnergyImg.setAnchorPoint(1, 1);
        this.meEnergyImg.setPosition(size.width * 0.888, size.height * 0.73);
        this.meEnergyImg.setScale(this._scale);
        this.addChild(this.meEnergyImg, 1);

        //add me energy number
        this.meEnergyNumber = new cc.LabelTTF("x " + this.energyMe, "Buxton Sketch", 36);
        this.meEnergyNumber.setColor(cc.color("#3A451C"));
        this.meEnergyNumber.setAnchorPoint(1, 1);
        this.meEnergyNumber.setPosition(size.width * 0.92, size.height*0.73);
        this.meEnergyNumber.setScale(this._scale * 0.8);
        this.addChild(this.meEnergyNumber, 5);

        //add attack button frame
        this.attackButtonFrame = new cc.Sprite(res.s_AttackButtonFrame);
        this.attackButtonFrame.setAnchorPoint(1, 0);
        this.attackButtonFrame.setPosition(size.width, 0);
        this.attackButtonFrame.setScale(this._scale);
        this.addChild(this.attackButtonFrame, 1);

        //add attack button
        var attackButton1Img = new cc.MenuItemImage(
            res.s_AttackButton1,
            res.s_AttackButton1Pressed,
            function () {
                if (this.lock == 0){
                    if(this.energyMe >= 1){
                        this.energyMe -= 1;
                        this.oppEnergyNumber.setString("x" + this.energyMe);
                        this.lock = 1;
                        this._gameNet.sendMessage(GameMessage["Operation"] + "0");
                        this.characterMe.attacking();
                        this.arrow = new ArrowSprite(res.s_1ArrowMe);
                        this.arrow.setPosition(size.width * 0.65, size.height * 0.39);
                        this.addChild(this.arrow, 2);
                        this.arrow.preparing();
                    }
                }
            },this);
        attackButton1Img.setAnchorPoint(1, 1);

        this.atButton1 = new cc.Menu(attackButton1Img);
        this.atButton1.setAnchorPoint(0, 0);
        this.atButton1.setEnabled(false);
        this.atButton1.setScale(this._scale);
        this.atButton1.setPosition(size.width * 0.911, size.height * 0.111);
        this.addChild(this.atButton1, 1);


        ///////////////////
        var attackButton2Img = new cc.MenuItemImage(
            res.s_AttackButton2,
            res.s_AttackButton2Pressed,
            function () {
                if (this.lock == 0){
                    if(this.energyMe >= 2){
                        this.energyMe -= 2;
                        this.meEnergyNumber.setString("x" + this.energyMe);
                        this.lock = 1;
                        this._gameNet.sendMessage(GameMessage["Operation"] + "1");
                        this.characterMe.attacking();
                        this.arrow = new ArrowSprite(res.s_2ArrowMe);
                        this.arrow.setPosition(size.width * 0.65, size.height * 0.39);
                        this.addChild(this.arrow, 2);
                        this.arrow.preparing();
                    }
                }
            },this);
        attackButton2Img.setAnchorPoint(1, 1);

        this.atButton2= new cc.Menu(attackButton2Img);
        this.atButton2.setAnchorPoint(0, 0);
        this.atButton2.setEnabled(false);
        this.atButton2.setScale(this._scale);
        this.atButton2.setPosition(size.width * 0.932, size.height*0.203);
        this.addChild(this.atButton2, 1);


        ///////////////////
        var attackButton3Img = new cc.MenuItemImage(
            res.s_AttackButton3,
            res.s_AttackButton3Pressed,
            function () {
                if (this.lock == 0){
                    if(this.energyMe >= 4){
                        this.energyMe -= 4;
                        this.meEnergyNumber.setString("x" + this.energyMe);
                        this.lock = 1;
                        this._gameNet.sendMessage(GameMessage["Operation"] + "2");
                        this.characterMe.attacking();
                        this.arrow = new ArrowSprite(res.s_3ArrowMe);
                        this.arrow.setPosition(size.width * 0.65, size.height * 0.39);
                        this.addChild(this.arrow, 2);
                        this.arrow.preparing();
                    }
                }
            },this);
        attackButton3Img.setAnchorPoint(1, 1);

        this.atButton3 = new cc.Menu(attackButton3Img);
        this.atButton3.setAnchorPoint(0, 0);
        this.atButton3.setEnabled(false);
        this.atButton3.setScale(this._scale);
        this.atButton3.setPosition(size.width * 0.9625, size.height * 0.264);
        this.addChild(this.atButton3, 1);


        ///////////////////
        var attackButton4Img = new cc.MenuItemImage(
            res.s_AttackButton4,
            res.s_AttackButton4Pressed,
            function () {
                if (this.lock == 0){
                    if(this.energyMe >= 8){
                        this.energyMe -= 8;
                        this.meEnergyNumber.setString("x" + this.energyMe);
                        this.lock = 1;
                        this._gameNet.sendMessage(GameMessage["Operation"] + "3");
                        this.characterMe.attacking();
                        this.arrow = new ArrowSprite(res.s_4ArrowMe);
                        this.arrow.setPosition(size.width * 0.65, size.height * 0.39);
                        this.addChild(this.arrow, 2);
                        this.arrow.preparing();
                    }
                }
            },this);
        attackButton4Img.setAnchorPoint(1, 1);

        this.atButton4 = new cc.Menu(attackButton4Img);
        this.atButton4.setAnchorPoint(0, 0);
        this.atButton4.setEnabled(false);
        this.atButton4.setScale(this._scale);
        this.atButton4.setPosition(size.width * 0.9985, size.height * 0.288);
        this.addChild(this.atButton4, 1);


        //function button frame
        this.functionButtonFrame = new cc.Sprite(res.s_FunctionButtonFrame);
        this.functionButtonFrame.setAnchorPoint(0, 0);
        this.functionButtonFrame.setPosition(size.width * 0.052, size.height * 0.036);
        this.functionButtonFrame.setScale(this._scale);
        this.addChild(this.functionButtonFrame, 2);

        ///////////////////
        var BlockButtonImage = new cc.MenuItemImage(
            res.s_BlockButton,
            res.s_BlockButtonPressed,
            function () {
                if (this.lock == 0){
                    this.lock = 1;
                    this._gameNet.sendMessage(GameMessage["Operation"] + "4");
                    this.shield = new ShieldSprite(res.s_BlockMe);
                    this.shield.setShieldOrBlock(1);
                    this.appearing();
                }
            },this);
        BlockButtonImage.setAnchorPoint(0, 1);

        this.BlockButton = new cc.Menu(BlockButtonImage);
        this.BlockButton.setAnchorPoint(0, 0);
        this.BlockButton.setEnabled(false);
        this.BlockButton.setScale(this._scale);
        this.BlockButton.setPosition(size.width * 0.091, size.height * 0.386);
        this.addChild(this.BlockButton, 2);


        ///////////////////
        var ShieldButtonImage = new cc.MenuItemImage(
            res.s_ShieldButton,
            res.s_ShieldButtonPressed,
            function () {
                if (this.lock == 0){
                    if(this.energyMe >= 1) {
                        this.energyMe -= 1;
                        this.meEnergyNumber.setString("x" + this.energyMe);
                        this.lock = 1;
                        this._gameNet.sendMessage(GameMessage["Operation"] + "5");
                        this.shield = new ShieldSprite(res.s_ShieldMe);
                        this.shield.setShieldOrBlock(0);
                        this.appearing();
                    }
                }
            },this);
        ShieldButtonImage.setAnchorPoint(0, 1);

        this.ShieldButton = new cc.Menu(ShieldButtonImage);
        this.ShieldButton.setAnchorPoint(0, 0);
        this.ShieldButton.setEnabled(true);
        this.ShieldButton.setScale(this._scale);
        this.ShieldButton.setPosition(size.width * 0.091, size.height * 0.16);
        this.addChild(this.ShieldButton, 2);


        /////////////////
        var ChaseButtonImage = new cc.MenuItemImage(
            res.s_ChaseButton,
            res.s_ChaseButtonPressed,
            function () {
                if (this.lock == 0){
                    this.lock = 1;
                    this._gameNet.sendMessage(GameMessage["Operation"] + "6");
                }
            },this);
        ChaseButtonImage.setAnchorPoint(0, 1);

        this.ChaseButton = new cc.Menu(ChaseButtonImage);
        this.ChaseButton.setAnchorPoint(0, 0);
        this.ChaseButton.setEnabled(false);
        this.ChaseButton.setScale(this._scale);
        this.ChaseButton.setPosition(size.width * 0.19, size.height * 0.338);
        this.addChild(this.ChaseButton, 2);


        /////////////////
        var EscapeButtonImage = new cc.MenuItemImage(
            res.s_EscapeButton,
            res.s_EscapeButtonPressed,
            function () {
                if (this.lock == 0){
                    this.lock = 1;
                    this._gameNet.sendMessage(GameMessage["Operation"] + "7");
                }
            },this);
        EscapeButtonImage.setAnchorPoint(0, 1);

        this.EscapeButton = new cc.Menu(EscapeButtonImage);
        this.EscapeButton.setAnchorPoint(0, 0);
        this.EscapeButton.setEnabled(false);
        this.EscapeButton.setScale(this._scale);
        this.EscapeButton.setPosition(size.width * 0.0624, size.height * 0.338);
        this.addChild(this.EscapeButton, 2);


        ///////////////////
        var MoButtonImage = new cc.MenuItemImage(
            res.s_MoButton,
            res.s_MoButtonPressed,
            function () {
                if (this.energyMe < 10) {
                    if (this.lock == 0){
                        this.lock = 1;
                        this.energyMe += 1;
                        this.meEnergyNumber.setString("x" + this.energyMe);
                        this._gameNet.sendMessage(GameMessage["Operation"] + "8");
                    }
                    this.characterMe.lighting();
                }
            },this);
        MoButtonImage.setAnchorPoint(0, 1);

        this.MoButton = new cc.Menu(MoButtonImage);
        this.MoButton.setAnchorPoint(0, 0);
        this.MoButton.setEnabled(false);
        this.MoButton.setScale(this._scale);
        this.MoButton.setPosition(size.width * 0.1082, size.height * 0.308);
        this.addChild(this.MoButton, 2);

        //add me character
        this.characterMe = new CharacterSprite(res.s_CharacterMeNormal);
        this.characterMe.setMeOrYou(0);
        this.characterMe.setAnchorPoint(1, 1);
        this.characterMe.setPosition(size.width * 0.893, size.height*0.69);
        this.characterMe.setScale(this._scale);
        this.addChild(this.characterMe, 1);

        //add opp character
        this.characterOpp = new CharacterSprite(res.s_CharacterOppNormal);
        this.characterOpp.setMeOrYou(1);
        this.characterOpp.setAnchorPoint(0, 1);
        this.characterOpp.setPosition(size.width * 0.11, size.height * 0.71);
        this.characterOpp.setScale(this._scale);
        this.addChild(this.characterOpp, 1);

        //add the timer
        this.schedule(this.loop, 4);
    },

    loop:function() {
        this.schedule(function () {
            this.update(this._this);
        }, 1, this.timeout, 0);
    },

    timer:function() {

        if (this.timeout == 0) {
            var gameOver = new cc.LayerColor(cc.color(225,225,225,100));
            var size = cc.winSize;
            var titleLabel = new cc.LabelTTF("Game Over", "Buxton Sketch", 38);
            titleLabel.attr({
                x:size.width / 2 ,
                y:size.height / 2
            });

            gameOver.addChild(titleLabel, 5);
            var TryAgainItem = new cc.MenuItemFont(
                "Try Again",
                function () {
                    cc.log("Menu is clicked!");
                    var nextScene = new PlayScene(this._gameNet);
                    cc.director.runScene(nextScene);
                }, this);
            TryAgainItem.setFontName("Buxton Sketch");
            TryAgainItem.setFontSize(50);

            TryAgainItem.attr({
                x: size.width/2,
                y: size.height * 0.42,
                anchorX: 0.5,
                anchorY: 0.5
            });

            var menu = new cc.Menu(TryAgainItem);
            menu.x = 0;
            menu.y = 0;
            gameOver.addChild(menu, 1);
            this.getParent().addChild(gameOver);

            this.unschedule(this.update);
            this.unschedule(this.timer);
            return;
        }

        this.timeout -=1;
        this.timeoutLaybel.setString("TIME:" + this.timeout);
    },

    update:function(initThis) {

        //alert(this.timeout);
        if (this.timeout == 0) {
            initThis.atButton1.setEnabled(false);
            initThis.atButton2.setEnabled(false);
            initThis.atButton3.setEnabled(false);
            initThis.atButton4.setEnabled(false);
            initThis.MoButton.setEnabled(false);
            initThis.EscapeButton.setEnabled(false);
            initThis.ChaseButton.setEnabled(false);
            initThis.BlockButton.setEnabled(false);
            initThis.ShieldButton.setEnabled(false);


            this.timeout = 3;
            this.timeoutLaybel.setString("SHOW");

            if (initThis.lock == 0) {
                //alert(initThis.energyMe);
                if(initThis.energyMe < 10) {
                    initThis.energyMe += 1;
                    initThis.meEnergyNumber.setString("x" + this.energyMe);
                    initThis.characterMe.lighting();
                    initThis._gameNet.sendMessage(GameMessage["Operation"] + "8");
                }
            } else {
                initThis.lock = 0;
            }

            //initThis.arrow.flying();
            //initThis.characterMe.attackingTo();


            var serverResult;
            this.attackMessageWrapper = new MMDMessage();
            serverResult = this._gameNet.recvMessage();
            this.attackMessageWrapper.resultUnpack(serverResult);

            //set opp energy number
            //alert(this.attackMessageWrapper.oppEnergy);
            this.oppEnergyNumber.setString("x" + this.attackMessageWrapper.oppEnergy);
            var result = this.attackMessageWrapper.gameResult;
            var oppAction = this.attackMessageWrapper.oppAction;
            if (result == 0) {
                switch (oppAction)
                {
                    case 0:
                        this.oppArrow = new ArrowSprite(res.s_1ArrowOpp);
                        this.oppArrow.setMeOrYou(1);
                        this.oppArrow.broking();
                        break;
                    case 1:
                        this.oppArrow = new ArrowSprite(res.s_2ArrowOpp);
                        this.oppArrow.setMeOrYou(1);
                        this.oppArrow.broking();
                        break;
                    case 2:
                        this.oppArrow = new ArrowSprite(res.s_3ArrowOpp);
                        this.oppArrow.setMeOrYou(1);
                        this.oppArrow.broking();
                        break;
                    case 3:
                        this.oppArrow = new ArrowSprite(res.s_4ArrowOpp);
                        this.oppArrow.setMeOrYou(1);
                        this.oppArrow.broking();
                        break;
                    case 4:
                        this.oppShield = new ShieldSprite(res.s_ShieldOpp);
                        this.oppShield.setMeOrYou(1);
                        this.oppShield.appearing();
                        break;
                    case 5:
                        this.oppShield = new ShieldSprite(res.s_BlockOpp);
                        this.oppShield.setMeOrYou(1);
                        this.oppShield.appearing();
                        break;
                    case 6:
                        break;
                    case 7:
                        break;
                    case 8:
                        this.characterOpp.lighting();
                        break;
                }
                this.oppAvatarImg.dying();
            } else if (result == 1){
                this.arrow.broking();
                this.meAvatarImg.dying();
            } else {

            }

            initThis.unschedule(this.update);

        } else if (this.timeout == 1){
            initThis.atButton1.setEnabled(true);
            initThis.atButton2.setEnabled(true);
            initThis.atButton3.setEnabled(true);
            initThis.atButton4.setEnabled(true);
            initThis.MoButton.setEnabled(true);
            initThis.EscapeButton.setEnabled(true);
            initThis.ChaseButton.setEnabled(true);
            initThis.BlockButton.setEnabled(true);
            initThis.ShieldButton.setEnabled(true);

            this.timeout = this.timeout - 1;
            this.timeoutLaybel.setString("FIGHT");
        } else if (this.timeout == 3) {
            this.timeout = this.timeout - 1;
            this.timeoutLaybel.setString("TIME:" + this.timeout);
        } else {
            this.timeout = this.timeout - 1;
            this.timeoutLaybel.setString("TIME:" + this.timeout);
        }
    }
});


PlayScene = cc.Scene.extend({
        _gameNet: null,
        _userName: null,
        _oppName: null,
        _scale: null,
    ctor:function(arg1, arg2, arg3, arg4) {
        this._super();
        this._gameNet = arg1;
        this._userName = arg2;
        this._oppName = arg3;
        this._scale = arg4;
    },
    onEnter:function () {
        this._super();
        var layer = new PlayLayer(this._gameNet, this._userName, this._oppName, this._scale);
        this.addChild(layer);
        layer.init();
    }
});
