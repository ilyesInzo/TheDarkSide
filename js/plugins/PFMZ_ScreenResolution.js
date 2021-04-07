//=============================================================================
// PFMZ - Screen Resolution
//=============================================================================

/*:
 * @target MZ
 * @plugindesc [Version 1.0]
 * @author Phoenix Flame
 *
 * @help Set the screen resolution.
 * Bypass the limit of RPG Maker MZ (2000x2000)
 * This plugin is free to use.
 * Available at: https://forums.rpgmakerweb.com/index.php?threads/screen-resolution.126870/
 *
 * @param width
 * @type number
 * @text Width
 * @desc Screen width.
 * @default 2560
 *
 * @param height
 * @type number
 * @text Height
 * @desc Screen height.
 * @default 1440
 *
 */

(() => {
    const pluginName = "PFMZ_ScreenResolution";
    const params = PluginManager.parameters(pluginName);
	
	Scene_Boot.prototype.resizeScreen = function() {
		Graphics.resize(parseInt(params['width']), parseInt(params['height']));
		this.adjustBoxSize();
		this.adjustWindow();
	};
})();

