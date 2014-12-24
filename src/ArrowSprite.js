/**
 * Created by Yu on 2014/12/23 0023.
 */
var ArrowSprite = cc.Sprite.extend({
    flyAction: null,
    brokeAction: null,
    meOrYou: 0,

    setMeOrYou: function (arg) {
        if (typeof (arg) == "number") {
            this.meOrYou = arg;
        }
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

    flyActionRelease: function () {
        this.flyAction.release();
    },

    brokeActionRelease: function () {
        this.brokeAction.release();
    },

    createFlyingingAction: function () {
        return cc.MoveTo.create(4, cc.p(this.y,-30));
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
