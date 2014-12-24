/**
 * Created by Yu on 2014/12/23 0023.
 */
/**
 * Created by Yu on 2014/12/23 0023.
 */
var ShieldSprite = cc.Sprite.extend({
    appearAction: null,
    meOrYou: 0,
    shieldOrBlock: 0,

    setMeOrYou: function (arg) {
        if (typeof (arg) == "number") {
            this.meOrYou = arg;
        }
    },

    setShieldOrBlock: function (arg) {
        if (typeof  (arg) == "number") {
            this.shieldOrBlock = arg;
        }
    },

    appearing: function () {
        this.appearAction = this.createAppearingAction();
        this.appearAction.retain();
        this.runAction(this.appearAction);
        this.appearActionRelease();
    },

    appearActionRelease: function () {
        this.appearAction.release();
    },

    createAppearingAction: function () {
        var frames = [];
        var frame1;
        var frame2;

        if (this.meOrYou == 0) {
            if (this.shieldOrBlock == 0) {
                frame1 = cc.spriteFrameCache.getSpriteFrame("ShieldImgMe.png");
                frames.push(frame1);
            } else {
                frame1 = cc.spriteFrameCache.getSpriteFrame("BlockImgMe.png");
                frames.push(frame1);
            }

        } else {
            if (this.shieldOrBlock == 0) {
                frame1 = cc.spriteFrameCache.getSpriteFrame("ShieldImgOpp.png");
                frames.push(frame1);
            } else {
                frame2 = cc.spriteFrameCache.getSpriteFrame("BlockImgOpp.png");
                frames.push(frame2);
            }
        }

        var animation = new cc.Animation(frames, 1);
        return new cc.Animate(animation);
    }
});
