/**
 * Created by Yu on 2014/12/23 0023.
 */
var GuideLayer = cc.Layer.extend({
    step:1,
    size:null,
    nextBg:null,
    backGround:null,
    _scale:1,

    ctor:function (arg) {
        this._super();
        this._scale = arg;
        //alert(this._scale);
    },

    init:function () {

        this._super();

        this.size = cc.director.getWinSize();

        //add the background
        this.backGround = new cc.Sprite(res.s_guideBackground);
        this.backGround.setAnchorPoint(0.5, 0.5);
        this.backGround.setPosition(this.size.width / 2, this.size.height / 2);
        this.backGround.setScale(this.size.height/this.backGround.getContentSize().height);
        this.addChild(this.backGround, 0);

        this.nextBg = new cc.Sprite(res.s_guide1);
        this.nextBg.setAnchorPoint(0.5, 0.5);
        this.nextBg.setPosition(this.size.width / 2, this.size.height / 2);
        this.nextBg.setScale(this.size.height/this.nextBg.getContentSize().height);
        this.addChild(this.nextBg, 1);

        this.addTouchEventListenser(this);

    },

    addTouchEventListenser:function(initThis){

        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,

            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if ( cc.rectContainsPoint(target.getBoundingBox(),pos)) {
                    //alert(initThis.step);
                    if (initThis.step < 4) {
                        initThis.step += 1;
                        initThis.nextBg.setTexture("ImgGuide" + initThis.step + ".png");
                        return true;
                    } else if (initThis.step == 4) {
                        var scene = new StartScene(initThis._scale);
                        cc.director.runScene(scene);
                    }
                }
                return false;
            }
        });

        cc.eventManager.addListener(this.touchListener,this);
    }
});

var GuideScene = cc.Scene.extend({
    _scale:1,
    ctor:function (arg) {
        this._super();
        this._scale = arg;
    },

    onEnter:function () {
        this._super();
        var layer = new GuideLayer(this._scale);
        this.addChild(layer);
        layer.init();
    }
});
