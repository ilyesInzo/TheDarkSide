// ============================================================================
//  LordValinar Plugin - Party Size Controller
//  LvMZ_PartySizeControl.js
// ============================================================================

var Imported = Imported || {};
Imported["LvMZ_PartySizeControl"] = true;

//=============================================================================
/*:
 * @target MZ
 * @plugindesc [v1.0] Party Size Control
 * @author LordValinar
 *
 * @help
 * ----------------------------------------------------------------------------
 * Terms of Use
 * ----------------------------------------------------------------------------
 *
 * Free for use in commercial and non-commercial games, with credit
 * Do NOT remove the author of this plugin
 * Do NOT post anywhere (modified or otherwise) except the RPG Maker Web site.
 *
 * ----------------------------------------------------------------------------
 * Changelog
 * ----------------------------------------------------------------------------
 *
 * v1.0 - Plugin released!
 *
 * ----------------------------------------------------------------------------
 * > File Usage (parameters / plugin settings)
 *
 * @param PartyLimit
 * @text Party Size Limit
 * @type number
 * @min 1
 * @desc Decide the max size of your party 
 * @default 4
 *
 * @command limit
 * @text Party Limit
 * @desc Change party limit size
 * 
 * @arg set
 * @text Set Party Size Limit
 * @type number
 * @min 1
 * @desc What size do you want to make your party limit?
 * @default 4
 *
 */
//=============================================================================

(() => {
'use strict';

const pluginName = 'LvMZ_PartySizeControl';
const lvParams = PluginManager.parameters(pluginName);
const defSize = Number(lvParams['PartyLimit']);

PluginManager.registerCommand(pluginName, 'limit', args => {
	$gameParty.setPartyLimit(args.set);
});

const gameParty_init = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
	gameParty_init.call(this);
	this._partySizeLimit = defSize || 4;
};

const gameParty_maxBattleMembers = Game_Party.prototype.maxBattleMembers;
Game_Party.prototype.maxBattleMembers = function() {
    return this._partySizeLimit > 0 ? this._partySizeLimit : gameParty_maxBattleMembers.call(this);
};

Game_Party.prototype.setPartyLimit = function(value) {
	this._partySizeLimit = value;
	console.log("limit: "+this.maxBattleMembers());
};

})();