//=============================================================================
// TMPlugin - Linkable Credits
// Version: 3.0.0
// Last updated: 2019/04/17
// Website　　: https://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc Adds a credit command to title screen.
 * Credits can be displayed with a link to their website.
 * 
 * @author tomoaky (https://hikimoki.sakura.ne.jp/)
 *
 * @param credits
 * @type struct<Credit>[]
 * @desc Credit data
 * @default ["{\"name\":\"Name\",\"help\":\"Help\",\"url\":\"Link\"}"]
 *
 * @param itemHeight
 * @type number
 * @desc The height of the area that displays one element
 * default: 84
 * @default 84
 *
 * @param helpFontSize
 * @type number
 * @desc Description font size
 * default: 16 ( 0 hide description )
 * @default 16
 *
 * @param urlFontSize
 * @type number
 * @desc Font size of web address
 * default: 16 ( 0 hide link )
 * @default 16
 *
 * @param urlMaxLength
 * @type number
 * @desc Maximum number of characters for web address
 * @default 50
 * 
 * @param useHelpWindow
 * @desc Whether to use the help window
 * default: ON (true = ON show / false = OFF don't show)
 * @default true
 *
 * @param helpWindowText
 * @desc Text to display in help window (\n link break)
 * If not set, website description will be left blank.
 * @default You can open the selected website. \n (if your web browser allows popups)
 *
 * @param titleCommandAlign
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Title command alignment
 * @default center
 *
 * @help
 * How to use:
 * TMPlugin - Linkable Credits Ver3.0.0
 *
 *   Set the information for web link in the plugin parameter.
 *   Information consists of 3 elements:
 *   name, description, address, also you can add more as needed.
 *
 *   Link function doesn't work on certain browsers,
 *   where popups are restricted on the web client side.
 * 
 *
 *   There's a function to show copyright information
 *   and version information on the title screen,
 *   You can also adjust the text color and
 *   display position with plugin parameters.
 *
 *   This plugin has been tested on RPG Maker MV Version 1.6.1
 *
 *
 * Plugin command:
 *
 *   callCredit
 *     Starts credit scene.
 *
 *
 * Parameters info:
 *
 *   credits
 *     name and help can use control characters to-
 *     change color and display icons.
 *     help Use \n to start a new line.
 *
 *   versionText / licenseText
 *     textColor and outlineColor are colors: black and blue,
 *     Can be specified with a color code like #000000 or #0000ff.
 */
/*~struct~Credit:
 *
 * @param name
 * @desc Website name
 * @default 
 *
 * @param help
 * @desc Description for website
 * @default 
 *
 * @param url
 * @desc Website address link
 * @default 
 */
/*~struct~TitleText:
 *
 * @param text
 * @desc Text to show
 * @default 
 *
 * @param x
 * @type number
 * @desc X coordinate for text
 * @default 0
 *
 * @param y
 * @type number
 * @desc Y coordinate for text
 * @default 0
 *
 * @param fontSize
 * @type number
 * @desc Text font size
 * @default 24
 *
 * @param textColor
 * @desc Text color code
 * @default #ffffff
 *
 * @param outlineWidth
 * @type number
 * @desc Text outline size
 * @default 4
 *
 * @param outlineColor
 * @desc Outline border color
 * @default #000000
 */

var Imported = Imported || {};
Imported.TMLinkCredit = true;

(function() {
	var Inzo = Inzo || this;
	var parameters = PluginManager.parameters('TMLinkCredit');
	var credits = JSON.parse(parameters['credits'] || '[]').map(JSON.parse);
	var versionText = JSON.parse(parameters['versionText'] || '{}');
	var licenseText = JSON.parse(parameters['licenseText'] || '{}');
	var creditsCommand = parameters['creditsCommand'];
	var itemHeight = +(parameters['itemHeight'] || 84);
	var helpFontSize = +(parameters['helpFontSize'] || 16);
	var urlFontSize = +(parameters['urlFontSize'] || 16);
	var urlMaxLength = +(parameters['urlMaxLength'] || 50);
	var useHelpWindow = JSON.parse(parameters['useHelpWindow'] || 'true');
	var helpWindowText = parameters['helpWindowText'].replace(/\\n/g, '\n');
	var titleCommandAlign = parameters['titleCommandAlign'] || 'center';
	
	//-----------------------------------------------------------------------------
	// Game_Interpreter
	//

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'callCredit') {
			SceneManager.push(Scene_Credits);
		}
	};

	//-----------------------------------------------------------------------------
	// Window_TitleCommand
	//
/*
	var _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
	Window_TitleCommand.prototype.makeCommandList = function() {
		_Window_TitleCommand_makeCommandList.call(this);
		if (creditsCommand) {
			this.addCommand(creditsCommand, 'credits');
		}
	};

	var _Window_TitleCommand_itemTextAlign = Window_TitleCommand.prototype.itemTextAlign;
	Window_TitleCommand.prototype.itemTextAlign = function() {
		return titleCommandAlign || _Window_TitleCommand_itemTextAlign.call(this);
	};*/

	//-----------------------------------------------------------------------------
	// Window_Credits
	//

	function Window_Credits() {
		this.initialize.apply(this, arguments);
	}
	Inzo.Window_Credits = Window_Credits;
	Window_Credits.prototype = Object.create(Window_Selectable.prototype);
	Window_Credits.prototype.constructor = Window_Credits;

	Window_Credits.prototype.initialize = function(x, y, width, height) {
		Window_Selectable.prototype.initialize.call(this, x, y, width, height);
		this.refresh();
		this.select(0);
		this.activate();
	};

	var _Window_Credits_standardFontSize = Window_Credits.prototype.standardFontSize;
	Window_Credits.prototype.standardFontSize = function() {
		return this._standardFontSize || _Window_Credits_standardFontSize.call(this);
	};

	Window_Credits.prototype.itemHeight = function() {
		return itemHeight;
	};

	Window_Credits.prototype.maxItems = function() {
		return credits.length || 1;
	};

	Window_Credits.prototype.item = function() {
		return index >= 0 ? credits[this.index()] : null;
	};

	Window_Credits.prototype.itemRectForText = (index, lineHeight) => {
		return new Rectangle(50, 28 + index * (lineHeight+50), Graphics.boxWidth, Graphics.boxHeight)
	}

	Window_Credits.prototype.drawItem = function(index) {
		var item = credits[index];
		if (item) {
			var lineHeight = this.lineHeight();
			var rect = this.itemRectForText(index, lineHeight);
			this.resetFontSettings();
			this.drawTextEx(item.name, rect.x, rect.y);
			if (urlFontSize > 0) {
				this.resetFontSettings();
				this.contents.fontSize = urlFontSize;
				var urlLineNums = Math.floor(this.itemHeight() / urlFontSize);
				for (var i = 0; i < urlLineNums; i++) {
					var urlIndex = urlMaxLength * i;
					if (urlIndex >= item.url.length) {
						break;
					}
					var y = rect.y + urlFontSize * i;
					this.contents.drawText(item.url.substr(urlIndex, urlMaxLength), rect.x, y, rect.width, lineHeight, 'right');
				}
			}
			if (helpFontSize > 0) {
				this._standardFontSize = helpFontSize;
				this.resetFontSettings();
				this.drawTextEx(item.help.replace(/\\n/g, '\n'), rect.x, rect.y + lineHeight);
				this._standardFontSize = null;
			}
		}
	};

	Window_Credits.prototype.updateHelp = function() {
		var text = helpWindowText || credits[this.index()].help;
		this._helpWindow.setText(text);
	};

	Window_Credits.prototype.urlOpen = function() {
		if (window.RPGAtsumaru && window.RPGAtsumaru.popups.openLink) {
			window.RPGAtsumaru.popups.openLink(credits[this.index()].url);
		} else {
			window.open(credits[this.index()].url, '_blank');
		}
	};

	//-----------------------------------------------------------------------------
	// Scene_Title
	//
/*
	var _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
	Scene_Title.prototype.createCommandWindow = function() {
		_Scene_Title_createCommandWindow.call(this);
		this._commandWindow.setHandler('credits', this.commandCredits.bind(this));
	};

	Scene_Title.prototype.commandCredits = function() {
		this._commandWindow.close();
		SceneManager.push(Scene_Credits);
	};*/
/*
	var _Scene_Title_createForeground = Scene_Title.prototype.createForeground;
	Scene_Title.prototype.createForeground = function() {
		_Scene_Title_createForeground.call(this);
		if (versionText.text) {
			this.drawTitleText(versionText);
		}
		if (licenseText.text) {
			this.drawTitleText(licenseText);
		}
	};

	Scene_Title.prototype.drawTitleText = function(titleText) {
		var x = +titleText.x;
		var y = +titleText.y;
		var fontSize = +titleText.fontSize;
		var outlineWidth = +titleText.outlineWidth;
		var textHeight = fontSize + outlineWidth * 2;
		var maxWidth = Graphics.width - x - outlineWidth;
		this._gameTitleSprite.bitmap.fontSize = fontSize;
		this._gameTitleSprite.bitmap.outlineWidth = outlineWidth;
		this._gameTitleSprite.bitmap.textColor = titleText.textColor;
		this._gameTitleSprite.bitmap.outlineColor = titleText.outlineColor;
		this._gameTitleSprite.bitmap.drawText(titleText.text, x + outlineWidth, y, maxWidth, textHeight, 'left');
	};
*/
	//-----------------------------------------------------------------------------
	// Scene_Credits
	//

	function Scene_Credits() {
		this.initialize.apply(this, arguments);
	}
	Inzo.Scene_Credits = Scene_Credits;

	Scene_Credits.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_Credits.prototype.constructor = Scene_Credits;

	Scene_Credits.prototype.initialize = function() {
		Scene_MenuBase.prototype.initialize.call(this);
	};

	Scene_Credits.prototype.create = function() {
		Scene_MenuBase.prototype.create.call(this);
		if (useHelpWindow) {
			this.createHelpWindow();
		}
		this.createCreditsWindow();
	};

	Scene_Credits.prototype.createCreditsWindow = function() {
		var wy = 50;
		var wh = Graphics.boxHeight;
		if (this._helpWindow) {
			wy = this._helpWindow.height;
			wh -= this._helpWindow.height;
		}
		rect = new Rectangle(0, wy, Graphics.boxWidth, wh) 
		this._creditsWindow = new Window_Credits(rect);
		this._creditsWindow.setHandler('ok', this.onCreditsOk.bind(this));
		this._creditsWindow.setHandler('cancel', this.popScene.bind(this));
		if (this._helpWindow) {
			this._creditsWindow.setHelpWindow(this._helpWindow);
		}
		this.addWindow(this._creditsWindow);
	};

	Scene_Credits.prototype.onCreditsOk = function() {
		this._creditsWindow.urlOpen();
		this._creditsWindow.activate();
	};

	Galv.zib = () => { 
		//var rect = new Rectangle(10, 20, 180, 40) 
		//var myWindow = new Inzo.Scene_Credits(rect); 
		SceneManager.push(Inzo.Scene_Credits);
	}

})();
