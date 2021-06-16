/* global PIXI */
export default class {
    constructor(container, ref, array = null, interactions) {
        this.interactions = interactions
        this.container    = container
        this.params       = {
            width: this.container.offsetWidth,
            height: this.container.offsetHeight,
            backgroundAlpha: false
        }
        this.app        = new PIXI.Application(this.params)
        this.sprites    = []
        this.background = null

        this.container.appendChild(this.app.view)
        this.app.stage.sortableChildren = true

        this.ratio = {x: 0, y: 0}

        this.loadBackgroundRef(ref)
            .then(() => {
                array && this.loadBackgroundSprites(array)
            })

        window.addEventListener("resize", () => this.resize())
        window.addEventListener("keydown", e => {
            if(e.key === "Escape") {
                this.sprites.forEach(sprite => {
                    this.dragEnd(sprite)
                })
            }
        })
    }

    loadBackgroundRef(texture) {
        return new Promise(resolve => {
            const ref    = new PIXI.BaseTexture(texture)

            ref.on("loaded", resp => {
                const { width, height } = resp
                const sprite            = new PIXI.Sprite(new PIXI.Texture(ref))

                this.ratio = {
                    x: this.app.screen.width / width,
                    y: this.app.screen.height / height
                }

                sprite.scale.set(this.ratio.x, this.ratio.y)

                this.background = sprite
                this.app.stage.addChild(sprite)
                resolve()
            })
        })
    }
    loadBackgroundSprites(array) {
        window.sprites = []

        array.forEach((item, i) => {
            fetch(item.json)
                .then(resp => resp.json())
                .then(resp => {
                    let animations = [],
                        sprite;

                    const baseTexture = new PIXI.BaseTexture(item.image)

                    resp.frames.forEach(texture => {
                        const { x, y, w, h } = texture.frame

                        animations.push(new PIXI.Texture(baseTexture, new PIXI.Rectangle(x, y, w, h)))
                    })

                    sprite = new PIXI.AnimatedSprite(animations, true)

                    sprite.zOrder      = i
                    sprite.interactive = true
                    sprite.name        = `sprite-${i}`
                    sprite.data        = null
                    sprite.dragging    = false
                    sprite.strapi      = {
                        x: item.x,
                        y: item.y,
                        scale: item.scale,
                        speed: item.speed
                    }

                    sprite.animationSpeed = (animations.length / 60) * item.speed
                    sprite.anchor.set(.5)
                    sprite.play()

                    this.setSpritePositions(sprite)

                    this.app.stage.addChild(sprite)

                    this.sprites.push(sprite)
                    window.sprites.push(sprite)

                    if(this.interactions) {
                        sprite
                            .on("mousedown", e => this.dragStart(e, sprite))
                            .on("touchstart", e => this.dragStart(e, sprite))
                            .on("mousemove", () => this.dragMove(sprite))
                            .on("touchmove", () => this.dragMove(sprite))
                            .on("mouseup", () => this.dragEnd(sprite))
                            .on("touchend", () => this.dragEnd(sprite))
                    }
                })
        })
    }

    setSpritePositions(sprite) {
        const posX = sprite.strapi.x * this.app.screen.width / 100
        const posY = sprite.strapi.y * this.app.screen.height / 100

        sprite.scale.set(this.ratio.x * sprite.strapi.scale, this.ratio.y * sprite.strapi.scale)
        sprite.position.set(posX, posY)
    }
    setBackgroundPosition() {
        const { width, height } = this.background.texture.baseTexture

        this.ratio = {
            x: this.app.screen.width / width,
            y: this.app.screen.height / height
        }

        this.background.scale.set(this.ratio.x, this.ratio.y)
    }

    dragStart(e, sprite) {
        sprite.alpha    = .25
        sprite.data     = e.data
        sprite.dragging = true

        this.logDatas(sprite)
    }
    dragMove(sprite) {
        if(sprite.dragging) {
            const position = sprite.data.getLocalPosition(this.app.stage)
            sprite.position.set(position.x, position.y)

            this.logDatas(sprite)
        }
    }
    dragEnd(sprite) {
        sprite.alpha    = 1
        sprite.data     = null
        sprite.dragging = false
    }

    resize() {
        this.params.width = this.container.offsetWidth
        this.params.height = this.container.offsetHeight

        this.app.renderer.resize(this.params.width, this.params.height)

        this.setBackgroundPosition()
        this.sprites.forEach(sprite => {
            this.setSpritePositions(sprite)
        })
    }
    destroy() {
        this.app.destroy(true)
    }

    logDatas(sprite) {
        const posX = sprite.position.x / this.app.screen.width * 100
        const posY = sprite.position.y / this.app.screen.height * 100

        console.log({
            name: sprite.name,
            x: Math.round((posX + Number.EPSILON) * 100) / 100 + "%",
            y: Math.round((posY + Number.EPSILON) * 100) / 100 + "%"
        })
    }
}
