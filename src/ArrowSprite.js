/**
 * Created by Yu on 2014/12/23 0023.
 */
var ArrowSprite = cc.Sprite.extend({
    flyAction: null,
    brokeAction: null,
    prepareAction: null,
    meOrYou: 0,

    setMeOrYou: function (arg) {
        if (typeof (arg) == "number") {
            this.meOrYou = arg;
        }
    },

    preparing: function () {
        this.prepareAction = this.createPreparingAction();
        this.prepareAction.retain();
        this.runAction(this.prepareAction);
        this.prepareActionRelease();
    },

    flying: function () {
        this.flyAction = this.createFlyingingAction();
        this.flyAction.retain();
        this.runAction(this.flyAction);
        this.flyActionRelease();
    },

    broking: function () {
        this.brokeAction = this.createBrokingAction();
        this.brokeAction.retain();
        var ac = this.brokeAction;
        var seqAc = cc.Sequence.create(ac, cc.CallFunc.create());
        this.runAction(seqAc);
        this.brokeActionRelease();
    },

    prepareActionRelease: function () {
        this.prepareAction.release();
    },

    flyActionRelease: function () {
        this.flyAction.release();
    },

    brokeActionRelease: function () {
        this.brokeAction.release();
    },

    createPreparingAction: function () {
        //alert(this.x + " " + this.y);
        return cc.MoveTo.create(0.8, cc.p(this.x * 1.06, this.y));
    },

    createFlyingingAction: function () {
        return cc.MoveTo.create(0.2, cc.p(this.x * 0.8, this.y));
    },

    createBrokingAction: function () {
        var frames = [];
        var frame1;
        var frame2;

        if (this.meOrYou == 0) {
            frame1 = cc.spriteFrameCache.getSpriteFrame("ImgActorMe.png");
            frames.push(frame1);

            frame2 = cc.spriteFrameCache.getSpriteFrame("ImgActorMeDead.png");
            frames.push(frame2);
        } else {
            frame1 = cc.spriteFrameCache.getSpriteFrame("ImgActorOpp.png");
            frames.push(frame1);

            frame2 = cc.spriteFrameCache.getSpriteFrame("ImgActorOppDead.png");
            frames.push(frame2);
        }

        var animation = new cc.Animation(frames, 0.5);
        return new cc.Animate(animation);
    }
});
