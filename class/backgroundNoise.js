/* global PIXI */
export default () => {
    const canvas = document.getElementById("background");

    let app = new PIXI.Application({
        view : canvas,
        resizeTo: window
    });

    app.renderer.view.style.position = "absolute";
    app.renderer.backgroundColor = 0x0F0F0F;
    
    const rect = new PIXI.Graphics()
        .beginFill(0x0F0F0F)
        .drawRect(0,0,app.screen.width, app.screen.height);

    let filter = new PIXI.filters.NoiseFilter();
    rect.filters = [filter];


    filter.uniforms.uNoise = 0.05

    app.stage.addChild(rect)

    app.ticker.add(() => {
        filter.seed = Math.random();
        filter.time += 0.5;
    });

    window.addEventListener("resize", resize);

    function resize() {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        rect.width = app.screen.width
        rect.height = app.screen.height;
    }

    resize();
}
