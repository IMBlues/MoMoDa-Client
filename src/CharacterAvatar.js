/**
 * Created by Yu on 2014/12/23 0023.
 */
var CharacterAvatar = cc.Sprite.extend({
    deadAction:null,
    meOrYou: 0,

    setMeOrYou:function (arg) {
        if (typeof (arg) == "numner"){
            this.meOrYou = arg;
        }
    },

    dying:function () {
        this.deadAction = this.createDyingAction();
        this.deadAction.retain();
        var ac = this.deadAction;
        var seqAc = cc.Sequence.create(ac, cc.CallFunc.create());
        this.runAction(seqAc);
        this.deadActionRelease();
    },

    deadActionRelease:function () {
        this.deadAction.release();
    },

    createDyingAction : function() {
        var frames = [];
        var frame1;
        var frame2;

        if(this.meOrYou == 0) {
            frame1 = cc.spriteFrameCache.getSpriteFrame("img_avarat-me-regular.png");
            frames.push(frame1);

            frame2 = cc.spriteFrameCache.getSpriteFrame("AvatarMeDead.png");
            frames.push(frame2);
        } else {
            frame1 = cc.spriteFrameCache.getSpriteFrame("img_avarat-other-normal.png");
            frames.push(frame1);

            frame2 = cc.spriteFrameCache.getSpriteFrame("AvatarOppDead.png");
            frames.push(frame2);
        }

        var animation = new cc.Animation(frames, 0.5);
        return new cc.Animate(animation);
    }

});