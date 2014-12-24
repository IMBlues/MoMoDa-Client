var CharacterSprite = cc.Sprite.extend({
    lightAction:null,
    deadAction:null,
    attackAction:null,
    meOrYou: 0,

    setMeOrYou:function (arg) {
        if (typeof (arg) == "number") {
            this.meOrYou = arg;
        }
    },

    attacking:function () {
        this.attackAction = this.createAttackingAction();
        this.attackAction.retain();
        var ac = this.attackAction;
        var seqAc = cc.Sequence.create(ac, cc.CallFunc.create());
        this.runAction(seqAc);
        this.attackActionRelease();
    },

    lighting:function () {
        this.lightAction = this.createLightingAction();
        this.lightAction.retain();
        var ac = this.lightAction;
        var seqAc = cc.Sequence.create(ac, cc.CallFunc.create());
        this.runAction(seqAc);
        this.lightActionRelease();
    },

    dying:function () {
        this.deadAction = this.createDyingAction();
        this.deadAction.retain();
        var ac = this.deadAction;
        var seqAc = cc.Sequence.create(ac, cc.CallFunc.create());
        this.runAction(seqAc);
        this.deadActionRelease();
    },

    attackActionRelease:function () {
        this.attackAction.release();
    },

    lightActionRelease:function () {
        this.lightAction.release();
    },

    deadActionRelease:function () {
        this.deadAction.release();
    },

    createLightingAction : function() {
        var frames = [];
        var frame1;
        var frame2;
        var frame3;
        var frame4;
        var frame5;

        if (this.meOrYou == 0) {
            frame1 = cc.spriteFrameCache.getSpriteFrame("ImgActorMe.png");
            frames.push(frame1);

            frame2 = cc.spriteFrameCache.getSpriteFrame("ImgActorMeLit05.png");
            frames.push(frame2);

            frame3 = cc.spriteFrameCache.getSpriteFrame("ImgActorMeLit.png");
            frames.push(frame3);

            frame4 = cc.spriteFrameCache.getSpriteFrame("ImgActorMeLit05.png");
            frames.push(frame4);

            frame5 = cc.spriteFrameCache.getSpriteFrame("ImgActorMe.png");
            frames.push(frame5);
        } else {
            frame1 = cc.spriteFrameCache.getSpriteFrame("ImgActorOpp.png");
            frames.push(frame1);

            frame2 = cc.spriteFrameCache.getSpriteFrame("ImgActorOppLit05.png");
            frames.push(frame2);

            frame3 = cc.spriteFrameCache.getSpriteFrame("ImgActorOppLit.png");
            frames.push(frame3);

            frame4 = cc.spriteFrameCache.getSpriteFrame("ImgActorOppLit05.png");
            frames.push(frame4);

            frame5 = cc.spriteFrameCache.getSpriteFrame("ImgActorOpp.png");
            frames.push(frame5);
        }

        var animation = new cc.Animation(frames, 0.05);
        return new cc.Animate(animation);
    },

    createDyingAction : function() {
        var frames = [];
        var frame1;
        var frame2;

        if(this.meOrYou == 0) {
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
    },

    createAttackingAction : function() {
        var frames = [];
        var frame1;
        var frame2;
        var frame3;
        var frame4;

        if(this.meOrYou == 0) {
            frame1 = cc.spriteFrameCache.getSpriteFrame("ImgActorMeBeatNormal.png");
            frames.push(frame1);

            frame2 = cc.spriteFrameCache.getSpriteFrame("ImgActorMeBeatHalf.png");
            frames.push(frame2);

            frame3 = cc.spriteFrameCache.getSpriteFrame("ImgActorMeBeat.png");
            frames.push(frame3);

            frame4 = cc.spriteFrameCache.getSpriteFrame("ImgActorMeBeatHalf.png");
            frames.push(frame4);

            frame5 = cc.spriteFrameCache.getSpriteFrame("ImgActorMe.png");
            frames.push(frame5);
        } else {
            frame1 = cc.spriteFrameCache.getSpriteFrame("ImgActorOppBeatNormal.png");
            frames.push(frame1);

            frame2 = cc.spriteFrameCache.getSpriteFrame("ImgActorOppBeatHalf.png");
            frames.push(frame2);

            frame3 = cc.spriteFrameCache.getSpriteFrame("ImgActorOppBeat.png");
            frames.push(frame3);

            frame4 = cc.spriteFrameCache.getSpriteFrame("ImgActorOppBeatHalf.png");
            frames.push(frame4);

            frame5 = cc.spriteFrameCache.getSpriteFrame("ImgActorOpp.png");
            frames.push(frame5);
        }

        var animation = new cc.Animation(frames, 0.3);
        return new cc.Animate(animation);
    }

});