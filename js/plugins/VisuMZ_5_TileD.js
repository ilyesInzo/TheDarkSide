//=============================================================================
// VisuStella MZ - TileD Support
// VisuMZ_5_TileD.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_5_TileD = true;

var VisuMZ = VisuMZ || {};
VisuMZ.TileD = VisuMZ.TileD || {};
VisuMZ.TileD.version = 1.02;

//=============================================================================
/*:
* @target MZ
* @plugindesc [RPG Maker MZ] [Tier 5] [Version 1.02] [TileD]
* @author VisuStella
* @url http://www.yanfly.moe/wiki/Main_Page
*
* @help
* ============================================================================
* Introduction
* ============================================================================
*
* A warning: This plugin is for advanced users, or users who plan to learn
* TileD. We at VisuMZ are not TileD support and will not be teaching TileD, 
* or answering support questions in regards to TileD itself. If you think
* learning a new mapping program may be too hard, or might be too tedious
* this plugin is not for you.
*
* Tired of RPG Maker MZ's Map Editor? Do you want to map the XP way but more?
* Tired of Parallax Mapping? Want to do round corners? Want to create a map
* with basically unlimited layers?
* 
* Well, now all those worries are gone! Instead, let's just use the awesome
* map editor, TileD! Free, easy to use and very flexible Map Editor. Grab it
* from here: http://www.mapeditor.org/
* 
* Features include all (but not limited to) the following:
* 
* - Any tile size maps!
* - Any number of layers!
* - Manual collision layers!
* - ...More
*
* ============================================================================
* Requirements
* ============================================================================
*
* This plugin is made for RPG Maker MZ. This will not work in other iterations
* of RPG Maker.
*
* ------ Tier 5 ------
*
* This plugin is a Tier 5 plugin. Place it under other plugins of lower tier
* value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
* that your plugins will have the best compatibility with the rest of the
* VisuStella MZ library.
*
* ============================================================================
* Major Changes
* ============================================================================
*
* This plugin adds some new hard-coded features to RPG Maker MZ's functions.
* The following is a list of them.
*
* ---
*
* TileD Mapping
* 
* - Maps can now be made via the mapping program TileD. This allows you the
* user to create maps with any number of layers using any tile sized desired.
* Please see the dedicated sections for more information.
* ---
*
* ============================================================================
* Setting up
* ============================================================================
* TileD Maps and Tilesets are stored in the YOUR_PROJECT_FOLDER/Maps folder. 
* This folder does not exists by default, so you will need to create it.
*
* This plugin comes with a few Map and Tileset Templates. The Tileset Templates
* contain tilesets with predefined Collision, Region, and Flag tiles. You may
* use these tilesets or create your own for use within your maps.
*
* Maps and Tilesets from TileD are exported as JSON and put in here with the
* format of MapXXX.json where XXX is the ID of the map, for map files.
*
* ============================================================================
* Special Layers
* ============================================================================
*
* This plugin uses special layers to specify certain properties.
*
* ---
* Region Layer
*
* This is a layer with the property regionId. You can have any number of these
* layers.
*
* If this layer has a number value (e.g: 2) that means no matter what tile you
* draw on this layer those tiles will have that speified regionId.
*
* If this layer has the value of tile-base that means the individual tiles
* will check for a property called regionId to specify that tiles region.
* See the Special Tilesets section for more information.
*
* ---
* Collision Layer 
* 
* This is a layer with the property collision. You can have any number of
* these layers. They dictate where the player and other entites can move to.
*
* If this layer has a value of tile-base than the collision for this layer is
* based on the tiles painted. See the special tilesets section for more info.
*
* Other valid values are as followed:
*
* full - Any area of this layer cannot be walked upon from any direction.
*
* up-left - Any area of this layer can only be walked upon from the bottom or right.
*
* up-right - Any area of this layer can only be walked upon from the bottom or left.
*
* down-left - Any area of this layer can be walked upon from the top or right.
*
* down-right - Any area of this layer can only be walked upon from top or left.
*
* ---
*
* ============================================================================
* Additional Layer Properties
* ============================================================================
*
* These properties provide additional layer functionality.
* 
* ---
* zIndex
*
* This property specifies the draw order of the layer. A higher value means it
* is higher in the order. 
*
* ---
* priority
*
* This property specifies the draw order for the layer when it shares a zIndex.
*
* ---
* level
*
* This property specifies the level that this layer is on for multi-level maps.
*
* ---
* hideOnLevel
* 
* This property specifies that this layer will be hidden if the player is on
* the specified level. (e.g: if this has a value of 1, and the player is on
* a spot with level set to 1, this layer is hidden). If a spot has multiple
* levels assigned to it, it will fallback to the one with higher priority.
* ---
*
* ============================================================================
* Special Tilesets
* ============================================================================
*
* This plugin uses specialized tilesets with special properties attached to
* their tiles to handle things such as collision, region id's, and tile flags.
* below is an explanation of each of these tilesets and how to set them up.
* ---
* Region Tileset
*
* This is a tileset where each tile has a custom property called regionId
* the value of this property is a number specifiying this tiles region. 
* draw with this tileset on a layer with the property regionId with 
* a value of tile-base for that position on the map to have that tiles region
* id.
* ---
* Collision Tileset
*
* This is a tileset where each tile has a custom property defining their
* collision value for use with tile-base collision layers.
*
* The tiles have a property the option to have the following properties.
*
* collision - Same as the property on layers.
*
* arrowImpassable - This property specifies that the directions given in the
* string cannot be passed through. It is formated as:
*
* direction1 & direction2 & direction3
*
* e.g: down & left & right
* This example dictates that the only direction the player can move from this
* tile is up.
* ---
* Flag Tilesets
*
* This is a tileset that has tiles that specify the special RPG Maker flags.
* These tiles have any of the following properties.
*
* ladder - This tile acts as a ladder.
* damage - This tile is a damage tile
* bush - This tile acts as a bush.
* counter - This tile acts as a counter
*
* ============================================================================
* Terms of Use
* ============================================================================
*
* 1. These plugins may be used in free or commercial games provided that they
* have been acquired through legitimate means at VisuStella.com and/or any
* other official approved VisuStella sources. Exceptions and special
* circumstances that may prohibit usage will be listed on VisuStella.com.
*
* 2. All of the listed coders found in the Credits section of this plugin must
* be given credit in your games or credited as a collective under the name:
* "VisuStella".
*
* 3. You may edit the source code to suit your needs, so long as you do not
* claim the source code belongs to you. VisuStella also does not take
* responsibility for the plugin if any changes have been made to the plugin's
* code, nor does VisuStella take responsibility for user-provided custom code
* used for custom control effects including advanced JavaScript notetags
* and/or plugin parameters that allow custom JavaScript code.
*
* 4. You may NOT redistribute these plugins nor take code from this plugin to
* use as your own. These plugins and their code are only to be downloaded from
* VisuStella.com and other official/approved VisuStella sources. A list of
* official/approved sources can also be found on VisuStella.com.
*
* 5. VisuStella is not responsible for problems found in your game due to
* unintended usage, incompatibility problems with plugins outside of the
* VisuStella MZ library, plugin versions that aren't up to date, nor
* responsible for the proper working of compatibility patches made by any
* third parties. VisuStella is not responsible for errors caused by any
* user-provided custom code used for custom control effects including advanced
* JavaScript notetags and/or plugin parameters that allow JavaScript code.
*
* 6. If a compatibility patch needs to be made through a third party that is
* unaffiliated with VisuStella that involves using code from the VisuStella MZ
* library, contact must be made with a member from VisuStella and have it
* approved. The patch would be placed on VisuStella.com as a free download
* to the public. Such patches cannot be sold for monetary gain, including
* commissions, crowdfunding, and/or donations.
*
*
* ============================================================================
* Credits
* ============================================================================
* 
* If you are using this plugin, credit the following people in your game:
* 
* Team VisuStella
* - Archeia
* - Dairnon
*
* ============================================================================
* Changelog
* ============================================================================
*
* Version 1.02:
* - Fixed a bug wherein balloon icons would crash the game.
*
* Version 1.00:
* - Finished Plugin!
*
* ============================================================================
* End of Helpfile
* ============================================================================
*
* @ ==========================================================================
* @ Plugin Commands
* @ ==========================================================================
*
* @command ShowPictureOnZ
* @text Show Picture on ZIndex
*
* @arg PictureID
* @text Picture ID
* @type number
* @desc The ID of the picture.
*
* @arg ZIndex
* @type number
* @min -999999
* @text Z Index
* @desc The Desired Z Index of this picture.
*
* @ ==========================================================================
* @ Plugin Parameters
* @ ==========================================================================
*
* @param BreakHead
* @text --------------------------
* @default ----------------------------------
*
* @param ATTENTION
* @default READ THE HELP FILE
*
* @param BushDepth
* @text Bush Depth
* @type number
* @default 12
* @desc The depth of bushes.
*
*
* @param BreakSettings
* @text --------------------------
* @default ----------------------------------
*/
//=============================================================================

//=============================================================================
// Setup Plugin Parameters
//=============================================================================

var pluginData = $plugins.filter(function (p) { return p.status && p.description.includes('[TileD]') })[0];
VisuMZ.TileD.Settings = VisuMZ.TileD.Settings || {};
VisuMZ.TileD.Settings.BushDepth = Number(pluginData.parameters["BushDepth"]) || 12;
const FLIPPED_HORIZONTALLY_FLAG = 0x80000000;
const FLIPPED_VERTICALLY_FLAG = 0x40000000;
const FLIPPED_DIAGONALLY_FLAG = 0x20000000;


PluginManager.registerCommand(pluginData.name, "ShowPictureOnZ", args => {
    const pictureId = Number(args.PictureID);
    const zIndex = Number(args.ZIndex);

    const scene = SceneManager._scene;
    if (scene) {
        const spriteSet = scene._spriteset;
        if (spriteSet && spriteSet._tilemap) {
            const container = spriteSet._pictureContainer;
            if (container) {
                let picture = container.children.find(p => p._pictureId === pictureId);
                if (picture) {
                    container.removeChild(picture);
                    picture.z = picture.zIndex = zIndex;
                    spriteSet._tilemap.addChild(picture);
                } else {
                    picture = spriteSet._tilemap.children.find(p => p._pictureId === pictureId);
                    if (picture) {
                        spriteSet._tilemap.removeChild(picture);
                        picture.z = picture.zIndex = zIndex;
                        spriteSet._tilemap.addChild(picture);
                    }
                }
            }
        }
    }
});

//=============================================================================
// Utility Functions
//=============================================================================

VisuMZ.Utility = VisuMZ.Utility || {};

VisuMZ.Utility.trimExt = function (str) {
    return str.replace(/\.[^/.]+$/, "");
};

VisuMZ.Utility.getProperty = function (properties, propertyName) {
    if (!properties) {
        return null;
    }
    let property = properties.find(function (prop) {
        return prop.name === propertyName;
    });
    if (property) {
        if (typeof property.value === 'string') property.value.trim();
        return property.value;
    } else {
        return null;
    }
};


VisuMZ.Utility.getTextureId = function (tileId) {
    let textureId = 0;
    const tilesets = $gameMap.tiledData.tilesets;
    for (let i = 0, len = tilesets.length; i < len; ++i) {
        const tileset = tilesets[i];
        if (tileId < tileset.firstgid
            || tileId >= tileset.firstgid + tileset.tilecount) {
            textureId++;
            continue;
        }
        break;
    }
    return textureId;
};

VisuMZ.Utility.getPriority = function (layerId) {
    var layerData = this.getLayer(layerId);
    if (!layerData || !layerData.properties) {
        return 0;
    }
    if (!(0, this.getProperty)(layerData.properties, 'priority')) {
        return 0;
    }
    return parseInt((0, this.getProperty)(layerData.properties, 'priority'));
};

VisuMZ.Utility.getLayer = function (layerId) {
    return $gameMap.tiledData.layers[layerId];

};


VisuMZ.Utility.getZIndex = function (layerId) {
    var layerData = this.getLayer(layerId);
    if (!layerData) {
        return 3;
    }
    const zIndex = this.getProperty(layerData.properties, 'zIndex');
    if (!layerData.properties || zIndex === null) {
        return 3;
    }
    return parseInt(this.getProperty(layerData.properties, 'zIndex'));
}


//=============================================================================
// Tilemap.Layer
//=============================================================================

Object.defineProperties(Tilemap.Layer.prototype, {
    blendMode: {
        set: function (val) {
            this._state.blendMode = val;
        },
        get: function () {
            return this._state.blendMode;
        }
    }
})

Tilemap.Layer.prototype.addRect = function (setNumber, sx, sy, dx, dy, w, h, rotate) {
    if (rotate === undefined) { rotate = 0; }
    this._elements.push([setNumber, sx, sy, dx, dy, w, h, rotate]);
};

Tilemap.Layer.prototype._updateVertexBuffer = function () {
    const numElements = this._elements.length;
    const required = numElements * Tilemap.Layer.VERTEX_STRIDE;
    if (this._vertexArray.length < required) {
        this._vertexArray = new Float32Array(required * 2);
    }
    const vertexArray = this._vertexArray;
    let index = 0;
    for (const item of this._elements) {
        const setNumber = item[0];
        const tid = setNumber >> 2;
        const sxOffset = 1024 * (setNumber & 1);
        const syOffset = 1024 * ((setNumber >> 1) & 1);
        const sx = item[1] + sxOffset;
        const sy = item[2] + syOffset;
        const dx = item[3];
        const dy = item[4];
        const w = item[5];
        const h = item[6];
        let rotate = item[7];
        const frameLeft = sx + 0.5;
        const frameTop = sy + 0.5;
        const frameRight = sx + w - 0.5;
        const frameBottom = sy + h - 0.5;

        let rotx0 = sx;
        let roty0 = sy;
        let rotx1 = sx + w;
        let roty1 = sy;
        let rotx2 = sx + w;
        let roty2 = sy + h;
        let rotx3 = sx;
        let roty3 = sy + h;
        if (rotate !== 0) {
            const groupD8 = PIXI.groupD8
            let w2 = w / 2;
            let h2 = h / 2;
            if (rotate % 4 !== 0) {
                w2 = h / 2;
                h2 = w / 2;
            }
            const cX = sx + w2;
            const cY = sy + h2;
            rotate = groupD8.add(rotate, groupD8.NW);
            rotx0 = cX + (w2 * groupD8.uX(rotate));
            roty0 = cY + (h2 * groupD8.uY(rotate));
            rotate = groupD8.add(rotate, 2);
            rotx1 = cX + (w2 * groupD8.uX(rotate));
            roty1 = cY + (h2 * groupD8.uY(rotate));
            rotate = groupD8.add(rotate, 2);
            rotx2 = cX + (w2 * groupD8.uX(rotate));
            roty2 = cY + (h2 * groupD8.uY(rotate));
            rotate = groupD8.add(rotate, 2);
            rotx3 = cX + (w2 * groupD8.uX(rotate));
            roty3 = cY + (h2 * groupD8.uY(rotate));
        }



        vertexArray[index++] = tid;
        vertexArray[index++] = frameLeft;
        vertexArray[index++] = frameTop;
        vertexArray[index++] = frameRight;
        vertexArray[index++] = frameBottom;
        vertexArray[index++] = rotx0;
        vertexArray[index++] = roty0;
        vertexArray[index++] = dx;
        vertexArray[index++] = dy;

        vertexArray[index++] = tid;
        vertexArray[index++] = frameLeft;
        vertexArray[index++] = frameTop;
        vertexArray[index++] = frameRight;
        vertexArray[index++] = frameBottom;
        vertexArray[index++] = rotx1;
        vertexArray[index++] = roty1;
        vertexArray[index++] = dx + w;
        vertexArray[index++] = dy;

        vertexArray[index++] = tid;
        vertexArray[index++] = frameLeft;
        vertexArray[index++] = frameTop;
        vertexArray[index++] = frameRight;
        vertexArray[index++] = frameBottom;
        vertexArray[index++] = rotx2;
        vertexArray[index++] = roty2;
        vertexArray[index++] = dx + w;
        vertexArray[index++] = dy + h;
        vertexArray[index++] = tid;

        vertexArray[index++] = frameLeft;
        vertexArray[index++] = frameTop;
        vertexArray[index++] = frameRight;
        vertexArray[index++] = frameBottom;
        vertexArray[index++] = rotx3;
        vertexArray[index++] = roty3;
        vertexArray[index++] = dx;
        vertexArray[index++] = dy + h;
    }
    this._vertexBuffer.update(vertexArray);
};

//=============================================================================
// Game_TiledDoodad
//=============================================================================

function Game_TiledDoodad() {
    this.initialize(...arguments);
}

Game_TiledDoodad.prototype.initialize = function (data) {
    this.setup(data);
};

Game_TiledDoodad.prototype.setup = function (data) {
    this._data = data;
    this._id = data.id;

    let gid = data.gid;
    gid &= ~(FLIPPED_HORIZONTALLY_FLAG | FLIPPED_VERTICALLY_FLAG);
    this._gid = gid ? gid : undefined;

    this._textureId = VisuMZ.Utility.getTextureId(gid);

    const tileset = $gameMap.tiledData.tilesets[this._textureId];

    const tile = (tileset) ? tileset.tiles[this._gid - tileset.firstgid] : 'undefined'
    if (tile) {
        let paths = [];
        if (tile.image) {
            paths = tile.image.split("/");
        } else if (tileset.image && tile.id !== undefined) {
            paths = tileset.image.split("/");
            this._tileHeight = tileset.tileheight;
            this._tileWidth = tileset.tilewidth;
            const animation = tile.animation;
            if (animation) {
                const duration = animation[0].duration / 1000 * 60;
                const maxFrame = animation.length;
                this._animData = { frame: 0, maxFrame: maxFrame, dur: duration, maxDur: duration };
                this._tileData = tile;
            }
        }
        paths.shift();
        this.imageName = VisuMZ.Utility.trimExt(paths.pop());
        this.imageFolder = paths.join('/') + '/';
    } else {
        this.imageName = '';
        this.imageFolder = '';
    }

    this.priority = VisuMZ.Utility.getPriority(data.layerId);
    this.zIndex = VisuMZ.Utility.getZIndex(data.layerId);

    this.visible = (data.visible === (undefined || null)) ? data.visible : true;
    this.x = data.x;
    this.y = data.y;
    this.width = data.width;
    this.height = data.height;
    this.rotation = data.rotation ? (data.rotation * Math.PI / 180) : 0;

    this.flipHorz = !!(data.gid & FLIPPED_HORIZONTALLY_FLAG);
    this.flipVert = !!(data.gid & FLIPPED_VERTICALLY_FLAG);

    this.anchor = new PIXI.Point(0.5, 1);
    this.offset = new PIXI.Point();

    this.alpha = 1;
    this.tint = 0xffffff;
};


//=============================================================================
// TiledImage
//=============================================================================

function TiledImage() {
    this.initialize(...arguments);
}

TiledImage.prototype.initialize = function (data) {
    const image = data.image;
    this._image = image.substring(image.lastIndexOf('/') + 1).replace(/\.[^/.]+$/, "");
    this._id = data.id;
    this.zIndex = data.zIndex;
    this.offsetX = data.offsetx || 0;
    this.offsetY = data.offsety || 0;
    this._data = data;
    this.getProperties(data.properties);
};

TiledImage.prototype.getProperties = function (properties) {
    const speedX = VisuMZ.Utility.getProperty(properties, 'speedX');
    if (speedX) this._speedX = parseFloat(speedX);
    const speedY = VisuMZ.Utility.getProperty(properties, 'speedY');
    if (speedY) this._speedY = parseFloat(speedY);
    const scrollX = VisuMZ.Utility.getProperty(properties, 'scrollX');
    if (speedX) this._scrollX = parseFloat(scrollX);
    const scrollY = VisuMZ.Utility.getProperty(properties, 'scrollY');
    if (scrollY) this._scrollY = parseFloat(scrollY);
};

//=============================================================================
// Sprite_TiledDoodad
//=============================================================================

function Sprite_TiledDoodad() {
    this.initialize(...arguments);
}

Sprite_TiledDoodad.prototype = Object.create(Sprite.prototype);
Sprite_TiledDoodad.prototype.constructor = Sprite_TiledDoodad;

Sprite_TiledDoodad.prototype.initialize = function (data) {
    const bitmap = ImageManager.loadBitmap(data.imageFolder, data.imageName);
    bitmap.addLoadListener(this.setInitialAnimation.bind(this));
    Sprite.prototype.initialize.call(this, bitmap);
    this._setupCompleted = false;
    this.setup(data);
};

Sprite_TiledDoodad.prototype.setInitialAnimation = function() {
    if (!this._data._animData) return;
    const rId = this._data._tileData.animation[0].tileid;
    const w = this._data._tileWidth;
    const h = this._data._tileHeight;
    const tileCols = this.bitmap.width / w;
    const ux = rId % tileCols * w;
    const uy = Math.floor(rId / tileCols) * h;
    this.setFrame(ux, uy, w, h);
};

Sprite_TiledDoodad.prototype.setup = function (data) {
    this._data = data;
    this.origX = data.x;
    this.origY = data.y;
    this.rotation = data.rotation;
    this.z = data.zIndex;
    this.anchor.set(0.5, 1);
    this.rotationInit();
    this._setupCompleted = true;

};

Sprite_TiledDoodad.prototype.updateAnim = function() {
    if (!this._data._animData) return;
    const animData = this._data._animData;
    animData.dur -= 1;
    if (animData.dur <= 0) {
        animData.frame = (animData.frame + 1) % animData.maxFrame;
        animData.dur = animData.maxDur;
        const rId = this._data._tileData.animation[animData.frame].tileid;
        const w = this._data._tileWidth;
        const h = this._data._tileHeight;
        const tileCols = this.bitmap.width / w;
        const ux = rId % tileCols * w;
        const uy = Math.floor(rId / tileCols) * h;
        this.setFrame(ux, uy, w, h);
    }
};

Sprite_TiledDoodad.prototype.rotationInit = function (width, height) {
    const data = this._data;
    let dx = 0;
    let dy = 0;
    width = width || data.width;
    height = height || data.height;
    const flipH = data.flipHorz ? 1 - this.anchor.x : this.anchor.x;
    const flipV = data.flipVert ? this.anchor.y : 1 - this.anchor.y;
    let x, y;
    const rotation = data.rotation || 0;

    x = (Math.cos(rotation) * width * flipH) + (Math.sin(rotation) * height * flipV);
    y = (Math.sin(rotation) * width * flipH) - (Math.cos(rotation) * height * flipV);
    dx += x;
    dy += y;

    this.origX = Math.floor(this.origX + dx);
    this.origY = Math.floor(this.origY + dy);
    this.scale.x *= data.flipHorz ? -1 : 1;
    this.scale.y *= data.flipVert ? -1 : 1;
};

Sprite_TiledDoodad.prototype.update = function () {
    Sprite.prototype.update.call(this);
    this.updateAnim();
    this.x = this.origX - $gameMap.displayX() * $gameMap.tileWidth();
    this.y = this.origY - $gameMap.displayY() * $gameMap.tileHeight();
};

//=============================================================================
// TiledImageSprite
//=============================================================================

function TiledImageSprite() {
    this.initialize(...arguments);
}

TiledImageSprite.prototype = Object.create(TilingSprite.prototype);
TiledImageSprite.prototype.constructor = TiledImageSprite;

TiledImageSprite.prototype.initialize = function (data) {
    const bitmap = ImageManager.loadParallax(data._image);
    TilingSprite.prototype.initialize.call(this, bitmap);
    bitmap.addLoadListener(() => {
        this.width = bitmap.width;
        this.height = bitmap.height;
        this.pivot = new Point(data.offsetX, data.offsetY);
    });
    this.z = data.zIndex;
    this.origin = new Point(data._scrollX, data._scrollY);
    this.data = data;
};

TiledImageSprite.prototype._onBitmapChange = function () {
    if (this._bitmap) {
        this._bitmap.addLoadListener(this._onBitmapLoad.bind(this));
    } else {
        this.texture.frame = new Rectangle();
    }
};

TiledImageSprite.prototype._refresh = function () {
    const frame = this._frame.clone();
    if (frame.width === 0 && frame.height === 0 && this._bitmap) {
        frame.width = this._bitmap.width;
        frame.height = this._bitmap.height;
    }
    if (this.texture.baseTexture) {
        try {
            this.texture.frame = frame;
        } catch (e) {
            this.texture.frame = new Rectangle();
        }
    }
    this.texture._updateID++;
    this.tilingTexture = null;
};

TiledImageSprite.prototype.update = function () {
    this.origin.x += this.data._speedX;
    this.origin.y += this.data._speedY;
};

//=============================================================================
// TiledTilemap
//=============================================================================

function TiledTilemap() {
    this.initialize(...arguments);
}

TiledTilemap.prototype = Object.create(Tilemap.prototype);
TiledTilemap.prototype.constructor = TiledTilemap;

Object.defineProperty(TiledTilemap.prototype, "tiledData", {
    get: function () {
        return this._tiledData;
    },
    set: function (val) {
        this._tiledData = val;
        this._setupTiled();
    },
    configurable: true
});

TiledTilemap.prototype.initialize = function (tiledData) {
    this._tiledData = {};
    this._layers = [];
    this._doodadSprites = [];
    this._doodadsCreated = false;
    this.tiledData = tiledData;
    $gameMap._setupTiled();
    Tilemap.prototype.initialize.call(this);
    this._setupTiled();
};

TiledTilemap.prototype._setupTiled = function () {
    this._setupSize();
    this._setupAnim();
};

TiledTilemap.prototype._setupSize = function () {
    const width = this._width;
    const height = this._height;
    const tileCols = Math.round(width / this._tileWidth) + 1;
    const tileRows = Math.round(height / this._tileHeight) + 1;
    this._tileWidth = this.tiledData.tilewidth;
    this._tileHeight = this.tiledData.tileheight;
    this._layerWidth = tileCols * this._tileWidth;
    this._layerHeight = tileRows * this._tileHeight;
    this._mapWidth = this.tiledData.width;
    this._mapHeight = this.tiledData.height;
};

TiledTilemap.prototype._setupAnim = function () {
    this._animData = {};
    const tilesets = this.tiledData.tilesets;
    for (let i = 0, leni = tilesets.length; i < leni; ++i) {
        const tilesData = tilesets[i].tiles;
        if (!tilesData) continue;
        for (const t in tilesData) {
            const tile = tilesData[t];
            const tileId = tile.id;
            const animation = tile.animation;
            if (!animation) continue;
            const duration = animation[0].duration / 1000 * 60;
            const maxFrame = animation.length;
            this._animData[tileId] = { frame: 0, maxFrame: maxFrame, dur: duration, maxDur: duration };
        }
    }
};

TiledTilemap.prototype._createLayers = function () {
    let id = 0;
    const layers = this.tiledData.layers;
    for (let i = 0, len = layers.length; i < len; ++i) {
        const layerData = layers[i];
        if (this.isPaintLayer(layerData)) {
            this._createTilemapLayers(layerData, id)
        }
        id++;
    }
    this._needsRepaint = true;
    this.createTiledSpriteObjects();
};

TiledTilemap.prototype.isPaintLayer = function (layerData) {
    if (layerData.type !== "tilelayer") return false
    const properties = layerData.properties;
    if (!!properties) {
        if (!!VisuMZ.Utility.getProperty(properties, 'collision') ||
            !!VisuMZ.Utility.getProperty(properties, 'toLevel') ||
            !!VisuMZ.Utility.getProperty(properties, 'regionId'))
            return false;
    }
    return true;
};

TiledTilemap.prototype._createTilemapLayers = function (layerData, id) {
    const layer = new Tilemap.Layer();
    layer.layerData = layerData;
    layer.layerId = id;
    layer.spriteId = id;
    layer.priority = layerData.priority;
    layer.z = layerData.zIndex;
    this._layers.push(layer);
    this.addChild(layer);
};

TiledTilemap.prototype.createTiledSpriteObjects = function () {
    this.createDoodads();
};

TiledTilemap.prototype.createDoodads = function () {
    const doodads = Object.values($gameTemp._doodads);
    for (let i = 0, len = doodads.length; i < len; ++i) {
        const data = doodads[i];
        this._doodadSprites.push(new Sprite_TiledDoodad(data));
    }
    if (this._doodadSprites.length > 0) {
        this.addChild(...this._doodadSprites)
    }
    this._doodadsCreated = true;
};

TiledTilemap.prototype._addAllSpots = function (startX, startY) {
    this._paintAllLayers(startX, startY);
};

TiledTilemap.prototype._paintAllLayers = function (startX, startY) {
    for (let layer of this._layers) {
        layer.clear();
        if (layer.layerData.hideOnLevel != undefined && layer.layerData.hideOnLevel === $gameMap.currentMapLevel ||
            !layer.layerData.visible) {
            layer.renderable = false;
            continue;
        }
        this._paintLayersTile(layer, startX, startY);
    }
};

TiledTilemap.prototype._paintLayersTile = function (layer, startX, startY) {
    const widthWithMargin = this.width + this._margin * 2;
    const heightWithMargin = this.height + this._margin * 2;
    const tileCols = Math.ceil(widthWithMargin / this._tileWidth) + 1;
    const tileRows = Math.ceil(heightWithMargin / this._tileHeight) + 1;
    for (let y = 0; y < tileRows; y++) {
        for (let x = 0; x < tileCols; x++) {
            this._paintTile(layer, startX, startY, x, y);
        }
    }
};

TiledTilemap.prototype._paintTile = function (layer, startX, startY, x, y) {
    const mx = startX + x;
    const my = startY + y;
    const tilePosition = mx + my * this._mapWidth;
    const layerData = layer.layerData;
    let tileId = layerData.data[tilePosition];
    const tilesets = this.tiledData.tilesets;
    if (!tileId) {
        return;
    }

    const fhorz = (tileId & FLIPPED_HORIZONTALLY_FLAG);
    const fvert = (tileId & FLIPPED_VERTICALLY_FLAG);
    const fdiag = (tileId & FLIPPED_DIAGONALLY_FLAG);

    let rotate = 0;
    if (fhorz && fdiag && fvert) {
        rotate = 14
    } else if (fhorz && fdiag) {
        rotate = 6;
    } else if (fhorz && fvert) {
        rotate = 4;
    } else if (fvert && fdiag) {
        rotate = 2
    } else if (fhorz) {
        rotate = 12;
    } else if (fvert) {
        rotate = 8
    } else if (fdiag) {
        rotate = 10
    }

    tileId &= ~(FLIPPED_HORIZONTALLY_FLAG |
        FLIPPED_VERTICALLY_FLAG |
        FLIPPED_DIAGONALLY_FLAG);

    let textureId = VisuMZ.Utility.getTextureId(tileId);
    const dx = x * this._tileWidth;
    const dy = y * this._tileHeight;
    const tileset = tilesets[textureId];
    const w = tileset.tilewidth;
    const h = tileset.tileheight;
    const tileCols = tileset.columns;
    const rId = this._getAnimTileId(textureId, tileId - tileset.firstgid);
    const ux = rId % tileCols * w;
    const uy = Math.floor(rId / tileCols) * h;

    layer.addRect(textureId, ux, uy, dx, dy, w, h, rotate);
};

TiledTilemap.prototype._updateBitmaps = function () {
    if (this._needsBitmapsUpdate && this.isReady()) {
        const layers = this._layers;
        for (let i = 0, len = layers.length; i < len; ++i) {
            const layer = layers[i];
            layer.setBitmaps(this._bitmaps);
        }
        this._needsBitmapsUpdate = false;
        this._needsRepaint = true;
    }
};

TiledTilemap.prototype.updateTransform = function () {
    const ox = Math.ceil(this.origin.x);
    const oy = Math.ceil(this.origin.y);
    const startX = Math.floor((ox - this._margin) / this._tileWidth);
    const startY = Math.floor((oy - this._margin) / this._tileHeight);
    this._updateLayerPositions(startX, startY, ox, oy);
    if (
        this._needsRepaint ||
        this._lastAnimationFrame !== this.animationFrame ||
        this._lastStartX !== startX ||
        this._lastStartY !== startY
    ) {
        this._lastAnimationFrame = this.animationFrame;
        this._lastStartX = startX;
        this._lastStartY = startY;
        this._addAllSpots(startX, startY);
        this._needsRepaint = false;
    }
    this._sortChildren();
    PIXI.Container.prototype.updateTransform.call(this);
};

TiledTilemap.prototype._updateLayerPositions = function (startX, startY, ox, oy) {
    const layers = this._layers;
    for (let i = 0, len = layers.length; i < len; ++i) {
        const layer = layers[i];
        layer.x = startX * this._tileWidth - ox;
        layer.y = startY * this._tileHeight - oy;
    }
};

TiledTilemap.prototype.update = function () {
    Tilemap.prototype.update.call(this);
    this._updateAnim();
};

TiledTilemap.prototype._updateAnim = function () {
    let needsRefresh = false;
    const animData = this._animData;
    for (let key in animData) {
        animData[key].dur -= 1;
        if (animData[key].dur <= 0) {
            animData[key].frame = (animData[key].frame + 1) % animData[key].maxFrame;
            animData[key].dur = animData[key].maxDur;
            needsRefresh = true;
        }
    }
    if (needsRefresh) {
        this.refresh();
    }
};

TiledTilemap.prototype._getAnimTileId = function (textureId, tileId) {
    const tilesData = $gameMap.tiledData.tilesets[textureId].tiles;
    if (!tilesData) {
        return tileId;
    }
    const tile = this._getTileData(tilesData, tileId);
    if (!tile) {
        return tileId;
    }
    if (!tile.animation) {
        return tileId;
    }
    const animation = tile.animation;
    const frame = this._animData[tileId].frame;
    if (!frame) {
        return tileId;
    }
    return animation[frame].tileid;
};

TiledTilemap.prototype._getTileData = function (tilesData, tileId) {
    for (let i = 0; i < tilesData.length; ++i) {
        const tile = tilesData[i];
        if (tile.id === tileId) {
            return tile;
        }
    }
    return null;
};

TiledTilemap.prototype._compareChildOrder = function (a, b) {
    if ((a.z || 0) !== (b.z || 0)) {
        return (a.z || 0) - (b.z || 0);
    } else if ((a.y || 0) !== (b.y || 0)) {
        return (a.y || 0) - (b.y || 0);
    } else if ((a.priority || 0) !== (b.priority || 0)) {
        return (a.priority || 0) - (b.priority || 0);
    } else {
        return a.spriteId - b.spriteId;
    }
};

TiledTilemap.prototype.isDoodadsCreated = function() {
    if (this._doodadsCreated === false) return false;
    for (const doodad of this._doodadSprites) {
        if (doodad._setupCompleted === false) return false;
    }
    return true;
};

//=============================================================================
// DataManager
//=============================================================================

DataManager._tiledData = null;
DataManager._tiledLoaded = false;
DataManager._tilesetToLoad = 0;

VisuMZ.TileD.DataManager_loadMapData = DataManager.loadMapData;
DataManager.loadMapData = function (mapId) {
    VisuMZ.TileD.DataManager_loadMapData.call(this, mapId);
    this.loadTiledMapData(mapId);
};

DataManager.loadTiledMapData = function (mapId) {
    this._tiledLoaded = false;
    const xhr = new XMLHttpRequest();
    const src = `${mapId}.json`;
    const url = `./maps/Map${src}`;
    xhr.open('GET', url);
    xhr.overrideMimeType('application/json');
    xhr.onload = () => this.onXhrMapDataLoad(xhr, name, src, url);
    xhr.onerror = () => this.onXhrError(name, src, url);
    xhr.send();
};

DataManager.onXhrMapDataLoad = function (xhr, name, src, url) {
    if (xhr.status < 400) {
        this.parseTiledData(JSON.parse(xhr.responseText));
        this.loadTilesetData();
        this._tiledLoaded = true;
    } else {
        this.onXhrError(name, src, url);
    }
};

DataManager.parseTiledData = function (tiledData) {
    if (tiledData.layers) {
        const layers = [];
        this.recursiveExtractLayers(tiledData, layers)
        tiledData.layers = layers;
        this._tiledData = tiledData;
    }
};

DataManager.recursiveExtractLayers = function (groupLayer, extracted) {
    const level = (VisuMZ.Utility.getProperty(groupLayer.properties, 'level')) || 0;
    const hideOnLevel = (VisuMZ.Utility.getProperty(groupLayer.properties, 'hideOnLevel')) || 0;
    const zIndex = (VisuMZ.Utility.getProperty(groupLayer.properties, 'zIndex')) || 0;
    const layers = groupLayer.layers;
    for (let i = 0; i < layers.length; ++i) {
        const layer = layers[i];
        if (layer.type !== 'group') {
            layer.level = level;
            layer.hideOnLevel = hideOnLevel;
            layer.z = zIndex;
            extracted.push(layer);
        } else {
            this.recursiveExtractLayers.call(this, layer, extracted);
        }
    }
};

DataManager.loadTilesetData = function () {
    const tilesets = this._tiledData.tilesets;
    for (let i = 0, len = tilesets.length; i < len; ++i) {
        const tileset = tilesets[i];
        if (!tileset.source) continue;
        this._tilesetToLoad++;
        const name = VisuMZ.Utility.trimExt(tileset.source);
        const xhr = new XMLHttpRequest();
        const src = tileset.source;
        const url = `./maps/${src}`;
        xhr.open('GET', url);
        xhr.overrideMimeType('application/json');
        xhr.onload = () => this.onXhrTilesetLoad(tileset, xhr, name, src, url);
        xhr.onerror = () => this.onXhrError(name, src, url);
        xhr.send();
    }
};

DataManager.onXhrTilesetLoad = function (tileset, xhr, name, src, url) {
    if (xhr.status < 400) {
        Object.assign(tileset, JSON.parse(xhr.responseText));
        this.getTilesetProperties(tileset);
    } else {
        this.onXhrError(name, src, url);
    }
    this._tilesetToLoad--;
};

DataManager.getTilesetProperties = function (tileset) {
    if (!tileset.tiles) return;
    tileset.tileProperties = {};
    const tiles = Object.values(tileset.tiles);
    for (let i = 0, lenI = tiles.length; i < lenI; ++i) {
        const tile = tiles[i];
        if (!tile.properties) continue;
        const properties = Object.values(tile.properties);
        const newProps = {};
        for (let p = 0, lenP = properties.length; p < lenP; ++p) {
            const prop = properties[p];
            newProps[prop.name] = prop.value;
        }
        tileset.tileProperties[tile.id] = newProps;
    }
};

VisuMZ.TileD.DataManager_isMapLoaded = DataManager.isMapLoaded;
DataManager.isMapLoaded = function () {
    const tilesetLoaded = this._tilesetToLoad <= 0;
    return this._tiledLoaded && tilesetLoaded && VisuMZ.TileD.DataManager_isMapLoaded.call(this);
};

//=============================================================================
// ImageManager
//=============================================================================

ImageManager.loadParserTileset = function (path) {
    if (!path) {
        return this._emptyBitmap;
    }
    let paths = path.split("/");
    paths.shift();
    const filename = VisuMZ.Utility.trimExt(paths.pop());
    const folder = paths.join('/') + '/';
    return this.loadBitmap(folder, filename);
};

//=============================================================================
// Game_Map
//=============================================================================

Object.defineProperties(Game_Map.prototype, {
    "tiledData": {
        get: () => DataManager._tiledData
    }
});

VisuMZ.TileD.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function (mapId) {
    if (this.isTiledMap()) {
        this._colliderMap = {};
        this._collisionMap = {};
        this._arrowCollisionMap = {};
        this._regionMap = {};
        this._levelMap = {};
        this._toLevelMap = {};
        this._flags = {};
        this._imageData = {};
        this.currentMapLevel = 0;
        $dataMap.width = this.tiledData.width;
        $dataMap.height = this.tiledData.height;
        this._setupTiled();
    }
    VisuMZ.TileD.Game_Map_setup.call(this, mapId);
};

Game_Map.prototype.isTiledMap = function () {
    return !!this.tiledData;
};

Game_Map.prototype._setupTiled = function () {
    this._initializeMapLevel(0);
    this._setupTiledGameObjects();
    this._setupTiledLayerData();
};

Game_Map.prototype._initializeMapLevel = function (id) {
    const width = this.width();
    const height = this.height();
    const size = width * height;
    if (!!this._colliderMap[id]) {
        return;
    }
    const colliderMap = this._colliderMap[id] = [];
    for (let i = 0; i < size; ++i) {
        colliderMap.push(
            this.makeColliderTile()
        );
    }
};

/***
 * @name makeColliderTile
 * @description Creates a sorta object struct with all your collider info you'd want changed or set.
 * Add whatever extra properties you'd want here for it to be changable in SetupCollider
 * */
Game_Map.prototype.makeColliderTile = function () {
    return {
        full: 0,
        arrow: 0,
        region: 0,
        level: 0,
        toLevel: -1
    };
};

Game_Map.prototype._setupTiledLayerData = function () {
    const layers = this.tiledData.layers;
    for (let i = 0, len = layers.length; i < len; ++i) {
        const layerData = layers[i];
        const ignore = VisuMZ.Utility.getProperty(layerData.properties, 'ignore');
        if (ignore) continue;
        this._getLayerProperties(layerData);
        if (layerData.data) {
            this._setupTileProperties(layerData);
        }
        this.createTiledGameObjects(layerData);
        this._setupImage(layerData);
    }
};

Game_Map.prototype._getLayerProperties = function (layerData) {
    const properties = layerData.properties;

    const priority = VisuMZ.Utility.getProperty(properties, 'priority');
    if (priority != null) layerData.priority = parseInt(priority) || 0;

    const zIndex = VisuMZ.Utility.getProperty(properties, 'zIndex');
    if (zIndex != null) layerData.zIndex = parseInt(zIndex) || 0;

    const hideOnLevel = VisuMZ.Utility.getProperty(properties, 'hideOnLevel');
    if (hideOnLevel != null) layerData.hideOnLevel = parseInt(hideOnLevel) || 0;

    const level = VisuMZ.Utility.getProperty(properties, 'level');
    if (level != null) layerData.level = parseInt(level) || 0;

    const regionId = VisuMZ.Utility.getProperty(properties, 'regionId');
    if (regionId != null) layerData.regionId = regionId;

    const collision = VisuMZ.Utility.getProperty(properties, 'collision');
    if (collision != null) layerData.collision = collision;

    const arrowImpassible = VisuMZ.Utility.getProperty(properties, 'arrowImpassible');
    if (arrowImpassible != null) layerData.arrowImpassible = arrowImpassible;

    const toLevel = VisuMZ.Utility.getProperty(properties, "toLevel");
    if (toLevel != null) layerData.toLevel = toLevel || -1;
};

Game_Map.prototype._setupTileProperties = function (layerData) {
    if (layerData.type !== "tilelayer") return;
    const width = this.width(),
        height = this.height(),
        size = width * height;
    this._initializeMapLevel(layerData.level);
    for (let i = 0; i < size; ++i) {
        this._setupTileFlags(layerData, i);
        this._setupCollider(layerData, i);
    }
};

Game_Map.prototype._setupTiledGameObjects = function () {
    $gameTemp._doodads = {};
};

Game_Map.prototype.createTiledGameObjects = function (layerData) {
    if (layerData.type !== 'objectgroup') return;
    for (let i = 0, len = layerData.objects.length; i < len; ++i) {
        this.createGameObject(layerData.objects[i]);
    }
};

Game_Map.prototype.createGameObject = function (layerData) {
    this._createDoodad(layerData);
};

Game_Map.prototype._createDoodad = function (data) {
    if (data && data.gid === undefined) return;
    $gameTemp._doodads[data.id] = new Game_TiledDoodad(data);
};

Game_Map.prototype._setupTileFlags = function (layerData, index) {
    const tileProperties = this._getTileProperties(layerData.data[index]);
    const flags = this._flags[layerData.level] = this._flags[layerData.level] || [];
    flags[index] = flags[index] || [];
    let bit = 0;
    const arrowImpassable = tileProperties.arrowImpassable;
    if (arrowImpassable !== undefined) {
        if (arrowImpassable === 'full') {

        }
        bit = this._getArrowBit(tileProperties.arrowImpassable);
        flags[index].push(bit);
    }
    if (tileProperties.ladder) flags[index].push(1 << 5);
    if (tileProperties.bush) flags[index].push(1 << 6);
    if (tileProperties.counter) flags[index].push(1 << 7);
    if (tileProperties.damage) flags[index].push(1 << 8);
    if (tileProperties.terrainTag) flags[index].push(1 << (12 + parseInt(tileProperties.terrainTag)));
};

Game_Map.prototype._setupCollider = function (layerData, index) {
    this._setupRegion(layerData, index);
    this._setupCollisionFull(layerData, index);
    this._setupCollisionArrow(layerData, index);
    this._setupMapLevel(layerData, index);
};

Game_Map.prototype._setupCollisionFull = function (layerData, index) {
    const colliderMap = this._colliderMap[layerData.level];
    const collision = layerData.collision;
    if (collision) {
        const realX = index, data = layerData.data[index];
        if (!!data) {
            let id = -1;
            switch (collision) {
                case "full":
                    id = realX;
                    break;
                case "up-left":
                    id = realX;
                    break;
                case "up-right":
                    id = realX + 1;
                    break;
                case "down-left":
                    id = realX + width;
                    break;
                case "down-right":
                    id = realX + width + 1;
                    break;
                case "tile-base":
                    const tileProperties = this._getTileProperties(data);
                    if (tileProperties.collision === "full") {
                        id = realX;
                    }
                    break;
                default:
                    return false;
            }
            const collider = colliderMap[id];
            if (collider) collider.full = 1;
            return true;
        }
    }
    return false;
};

Game_Map.prototype._setupCollisionArrow = function (layerData, index) {
    const colliderMap = this._colliderMap[layerData.level];
    const collision = layerData.collision;
    const arrowImpassible = layerData.arrowImpassible;
    const data = layerData.data[index], realX = index;
    let bit = 0;
    if (collision || arrowImpassible) {
        if (collision === "tile-base") {
            const tileProperties = this._getTileProperties(data);
            if (!!tileProperties.arrowImpassable) {
                bit = this._getArrowBit(tileProperties.arrowImpassable);
                colliderMap[realX].arrow = bit;
                return true;
            }
        } else if (!!data) {
            bit = this._getArrowBit(arrowImpassible);
            colliderMap[realX].arrow = bit;
            return true;
        }
    }
    return false;
};

Game_Map.prototype._setupRegion = function (layerData, index) {
    const colliderMap = this._colliderMap[layerData.level];
    const regionId = layerData.regionId;
    if (regionId) {
        const data = layerData.data[index], realX = index;
        if (regionId === "tile-base") {
            const tileProperties = this._getTileProperties(data);
            if (!!tileProperties.regionId) {
                colliderMap[realX].region = parseInt(tileProperties.regionId);
            }
        } else if (!!data) {
            colliderMap[realX].region = parseInt(regionId);
        }
    }
};

Game_Map.prototype._setupMapLevel = function (layerData, index) {
    const colliderMap = this._colliderMap[layerData.level];
    const toLevel = layerData.toLevel;
    if (toLevel !== undefined) {
        const data = layerData.data[index], realX = index;
        if (toLevel === "tile-base") {
            const tileProperties = this._getTileProperties(data);
            if (tileProperties.toLevel !== undefined) {
                colliderMap[realX].toLevel = parseInt(tileProperties.toLevel);
            }
        } else if (!!data) {
            const realX = index;
            colliderMap[realX].toLevel = toLevel;
            return true;
        }
    }
    return false;
};

Game_Map.prototype._getArrowBit = function (impassable) {
    let bit = 0;
    const arrows = impassable.split('&').map((i) => i.trim().toLowerCase());
    for (let i = 0, len = arrows.length; i < len; ++i) {
        const arrow = arrows[i];
        switch (arrow) {
            case 'left':
                bit ^= 2;
                continue;
            case 'down':
                bit ^= 1;
                continue;
            case 'right':
                bit ^= 4;
                continue;
            case 'up':
                bit ^= 8;
        }
    }
    return bit;
};

Game_Map.prototype._setupImage = function (layerData) {
    if (layerData.type !== "imagelayer") return;
    if (!layerData.image) return;
    const imageData = new TiledImage(layerData);
    this._imageData[imageData.id] = imageData;
};

Game_Map.prototype._getTileProperties = function (tileId) {
    const tiledData = this.tiledData,
        tilesets = tiledData.tilesets,
        tilesetId = VisuMZ.Utility.getTextureId(tileId),
        tileset = tilesets[tilesetId];
    if (!tileId || !tileset) {
        return {};
    }
    const tilesetProperties = tileset.tileProperties;
    if (!tilesetProperties) return {};
    const id = tileId - tileset.firstgid;
    const tileProperties = tileset.tileProperties[id];
    if (tileProperties) {
        return tileProperties;
    }
    return {}
};

VisuMZ.TileD.Game_Map_checkPassage = Game_Map.prototype.checkPassage;
Game_Map.prototype.checkPassage = function (x, y, bit) {
    if (!this.isTiledMap()) return VisuMZ.TileD.Game_Map_checkPassage.call(this, x, y, bit);
    if (!this.checkPassageColliders(x, y, bit)) return false;
    return this.checkPassageFlags(x, y, bit);
};

Game_Map.prototype.checkPassageFlags = function (x, y, bit) {
    const flags = this.layeredTiles(x, y);
    let isPassible;
    for (let i = flags.length; i > 0; --i) {
        const flag = flags[i];
        isPassible = this.isFlagPassible(flag, bit);
        if (isPassible !== undefined && !isPassible) return isPassible;
    }
    return true;
};

Game_Map.prototype.checkPassageColliders = function (x, y, bit) {
    const colliderMap = this._colliderMap[this.currentMapLevel];
    if (colliderMap) {
        const index = x + this.width() * y;
        const flag = colliderMap[index] ? colliderMap[index].arrow : null;
        if (flag) {
            return this.isFlagPassible(flag, bit);
        }
        return colliderMap[index].full === 0;
    }
    return true;
};

Game_Map.prototype.isFlagPassible = function (flag, bit) {
    if ((flag & 0x10) !== 0) {
        // [*] No effect on passage
        return undefined;
    }
    if ((flag & bit) === 0) {
        // [o] Passable
        return true;
    }
    if ((flag & bit) === bit) {
        // [x] Impassable
        return false;
    }
};

VisuMZ.TileD.Game_Map_tileWidth = Game_Map.prototype.tileWidth;
Game_Map.prototype.tileWidth = function () {
    if (!this.isTiledMap()) return VisuMZ.TileD.Game_Map_tileWidth.call(this);
    return this.tiledData.tilewidth;
};

VisuMZ.TileD.Game_Map_tileHeight = Game_Map.prototype.tileHeight;
Game_Map.prototype.tileHeight = function () {
    if (!this.isTiledMap()) return VisuMZ.TileD.Game_Map_tileHeight.call(this);
    return this.tiledData.tileheight;
};

VisuMZ.TileD.Game_Map_width = Game_Map.prototype.width;
Game_Map.prototype.width = function () {
    if (!this.isTiledMap()) return VisuMZ.TileD.Game_Map_width.call(this);
    return this.tiledData.width;
};

VisuMZ.TileD.Game_Map_height = Game_Map.prototype.height;
Game_Map.prototype.height = function () {
    if (!this.isTiledMap()) return VisuMZ.TileD.Game_Map_height.call(this);
    return this.tiledData.height;
};

VisuMZ.TileD.Game_Map_regionId = Game_Map.prototype.regionId;
Game_Map.prototype.regionId = function (x, y) {
    if (!this.isTiledMap()) return VisuMZ.TileD.Game_Map_regionId.call(this, x, y);
    const colliderMap = this._colliderMap[this.currentMapLevel];
    const index = x + this.width() * y;
    return colliderMap[index].region;
};

VisuMZ.TileD.Game_Map_layeredTiles = Game_Map.prototype.layeredTiles;
Game_Map.prototype.layeredTiles = function (x, y) {
    if (!this.isTiledMap()) return VisuMZ.TileD.Game_Map_layeredTiles.call(this, x, y);
    const index = x + this.width() * y;
    const tilesetFlags = this.tilesetFlags();
    return tilesetFlags.length > 0 ? this.tilesetFlags()[index] : [];
};

VisuMZ.TileD.Game_Map_checkLayeredTilesFlags = Game_Map.prototype.checkLayeredTilesFlags;
Game_Map.prototype.checkLayeredTilesFlags = function (x, y, bit) {
    if (!this.isTiledMap()) return VisuMZ.TileD.Game_Map_checkLayeredTilesFlags.call(this, x, y, bit);
    return this.layeredTiles(x, y,).some(tile => (tile & bit) !== 0);
};

VisuMZ.TileD.Game_Map_tilesetFlags = Game_Map.prototype.tilesetFlags;
Game_Map.prototype.tilesetFlags = function () {
    if (!this.isTiledMap()) return VisuMZ.TileD.Game_Map_tilesetFlags.call(this);
    const flags = this._flags[this.currentMapLevel];
    if (flags) {
        return flags;
    } else {
        return [];
    }
};

VisuMZ.TileD.Game_Map_terrainTag = Game_Map.prototype.terrainTag;
Game_Map.prototype.terrainTag = function (x, y) {
    if (!this.isTiledMap()) return VisuMZ.TileD.Game_Map_terrainTag.call(this, x, y);
    if (this.isValid(x, y)) {
        const tiles = this.layeredTiles(x, y);
        if (tiles) {
            for (const flag of tiles) {
                const tag = flag >> 12;
                if (tag > 0) {
                    return tag;
                }
            }
        }
    }
    return 0;
};

Game_Map.prototype.checkMapLevelChanging = function (x, y) {
    const mapLevelChange = this._colliderMap[this.currentMapLevel];
    if (mapLevelChange) {
        const index = y * this.width() + x;
        if (mapLevelChange[index].toLevel < 0) {
            return false;
        }
        this.currentMapLevel = mapLevelChange[index].toLevel;
        return true;
    }
};

Game_Map.prototype.getTiledEventLocation = function(eventId) {
    const layers = this.tiledData.layers;
    for (const layer of layers) {
        if (layer.type === "objectgroup") {
            for (const obj of layer.objects) {
                const properties = obj.properties;
                if (!properties) continue;
                const eventProp = properties.find(x => x.name === "eventId");
                if (eventProp !== undefined) {
                    if (eventProp.value === eventId) {
                        const x = Math.floor(obj.x / this.tileWidth());
                        const y = Math.floor(obj.y / this.tileWidth());
                        return [x, y];
                    }
                }
            }
        }
    }
    return undefined;
};

//=============================================================================
// Game_CharacterBase
//=============================================================================

VisuMZ.TileD.Game_CharacterBase_refreshBushDepth = Game_CharacterBase.prototype.refreshBushDepth;
Game_CharacterBase.prototype.refreshBushDepth = function() {
    VisuMZ.TileD.Game_CharacterBase_refreshBushDepth.call(this);
    if (
        this.isNormalPriority() &&
        !this.isObjectCharacter() &&
        this.isOnBush() &&
        !this.isJumping()
    ) {
        if (!this.isMoving()) {
            this._bushDepth = VisuMZ.TileD.Settings.BushDepth;
        }
    } else {
        this._bushDepth = 0;
    }
};

//=============================================================================
// Game_Player
//=============================================================================

VisuMZ.TileD.Game_Player_checkEventTriggerHere = Game_Player.prototype.checkEventTriggerHere;
Game_Player.prototype.checkEventTriggerHere = function (triggers) {
    VisuMZ.TileD.Game_Player_checkEventTriggerHere.call(this, triggers);
    this._checkMapLevelChangingHere();
};

Game_Player.prototype._checkMapLevelChangingHere = function () {
    $gameMap.checkMapLevelChanging(this.x, this.y);
};

//=============================================================================
// Game_Event
//=============================================================================

VisuMZ.TileD.Game_Event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
    VisuMZ.TileD.Game_Event_initialize.call(this, mapId, eventId);
    const mapLocation = $gameMap.getTiledEventLocation(eventId);
    if (mapLocation !== undefined) {
        this.locate(mapLocation[0], mapLocation[1]);
        this.refresh();
    }
};

//=============================================================================
// Spriteset_Map
//=============================================================================

VisuMZ.TileD.Spriteset_Map_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function () {
    if (!$gameMap.isTiledMap()) return VisuMZ.TileD.Spriteset_Map_createTilemap.call(this);
    const tilemap = new TiledTilemap($gameMap.tiledData);
    this._baseSprite.addChild(tilemap);
    this._tilemap = tilemap;
    this._effectsContainer = tilemap;
};

VisuMZ.TileD.Spriteset_Map_loadTileset = Spriteset_Map.prototype.loadTileset;
Spriteset_Map.prototype.loadTileset = function () {
    if (!$gameMap.isTiledMap()) return VisuMZ.TileD.Spriteset_Map_loadTileset.call(this);
    const bitmaps = [];
    for (let tileset of $gameMap.tiledData.tilesets) {
        bitmaps.push(ImageManager.loadParserTileset(tileset.image, 0))
    }
    this._tilemap.setBitmaps(bitmaps);
    this._tileset = $gameMap.tiledData.tilesets;
};

VisuMZ.TileD.Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
Spriteset_Map.prototype.createLowerLayer = function () {
    VisuMZ.TileD.Spriteset_Map_createLowerLayer.call(this);
    this.createImage();
};

Spriteset_Map.prototype.createImage = function () {
    Object.entries($gameMap._imageData).forEach((entry) => {
        const sprite = new TiledImageSprite(entry[1]);
        this._tilemap.addChild(sprite);
    });
};

VisuMZ.TileD.Spriteset_Map_updateTileset = Spriteset_Map.prototype.updateTileset;
Spriteset_Map.prototype.updateTileset = function () {
    if (!$gameMap.isTiledMap()) return VisuMZ.TileD.Spriteset_Map_updateTileset.call(this);
    if (this._tileset !== $gameMap.tiledData.tilesets) {
        this.loadTileset();
    }
};

Spriteset_Map.prototype.isDoodadsReady = function() {
    return $gameMap.isTiledMap() ? this._tilemap.isDoodadsCreated() : true;
};

//=============================================================================
// Scene_Map
//=============================================================================

VisuMZ.TileD.Scene_Map_isReady = Scene_Map.prototype.isReady;
Scene_Map.prototype.isReady = function() {
    return VisuMZ.TileD.Scene_Map_isReady.call(this) && this._spriteset.isDoodadsReady();
};

//=============================================================================
// End of File
//=============================================================================