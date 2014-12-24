/**
 * Created by Yu on 2014/12/23 0023.
 */
var GuideLayer = cc.Layer.extend({
    step:1,
    size:null,
    nextBg:null,

    init:function () {

        this._super();

        this.size = cc.director.getWinSize();

        //add the background
        this.backGround = new cc.Sprite(res.s_guideBackground);
        this.backGround.setAnchorPoint(0.5, 0.5);
        this.backGround.setPosition(this.size.width / 2, this.size.height / 2);
        this.backGround.setScale(this.size.height/this.backGround.getContentSize().height);
        this.addChild(this.backGround, 0);

        // this.schedule(this.toNext(), 3, 4, 2);

    },

    toNext:function () {
        if (this.step > 1){
            this.nextBg.setVisible(false);
        }
        this.nextBg = new cc.Sprite("ImgGuide" + this.step + ".png");
        this.nextBg.setOpacity(0.8);
        this.nextBg.setAnchorPoint(0.5, 0.5);
        this.nextBg.setPosition(this.size.width / 2, this.size.height / 2);
        this.nextBg.setScale(this.size.height/this.nextBg.getContentSize().height);
        this.addChild(this.nextBg, this.step);
        this.step += 1;
    }
});

var GuideScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GuideLayer();
        this.addChild(layer);
        layer.init();
    }
});
