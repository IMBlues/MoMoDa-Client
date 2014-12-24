cc.game.onStart = function(){
    var designSize = cc.size(1280, 720);
    var screenSize = cc.view.getFrameSize();
    var scale = 1;
    var arg;

    if(!cc.sys.isNative && screenSize.height < 720){
        arg = screenSize.width / screenSize.height;
        if (arg > 16/9) {
            scale = screenSize.height / 720;
            designSize = cc.size(screenSize.height * 16 / 9, screenSize.height);
            cc.loader.resPath = "res/Normal";
            //alert(screenSize.height * 16 /9 + " " + screenSize.height);
        } else {
            scale = screenSize.width / 1280;
            designSize = cc.size(screenSize.width, screenSize.width * 9 / 16);
            cc.loader.resPath = "res/Normal";
            //alert(screenSize.width + " " + screenSize.width * 9 / 16);
        }
    }else{
        arg = screenSize.width / screenSize.height;
        cc.loader.resPath = "res/HD";
    }
    cc.view.setDesignResolutionSize(designSize.width, designSize.height, cc.ResolutionPolicy.SHOW_ALL);

    //load resources
    cc.LoaderScene.preload(g_resources, function () {
    cc.director.runScene(new StartScene(scale));
    }, this);
};
cc.game.run();