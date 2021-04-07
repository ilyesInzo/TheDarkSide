//=============================================================================
// VisuStella MZ - Main Menu Core
// VisuMZ_1_MainMenuCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MainMenuCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MainMenuCore = VisuMZ.MainMenuCore || {};
VisuMZ.MainMenuCore.version = 1.08;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.08] [MainMenuCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Main_Menu_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Main Menu Core plugin is designed to give you more control over the Main
 * Menu outside of RPG Maker MZ's editor's control. Game devs are given control
 * over how commands work, visual aesthetics pertaining to the Main Menu, and 
 * assign menu images to actors as background portraits.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general Main Menu settings.
 * * The ability to set Menu Background Portraits for individual actors.
 * * Flexibility in changing which commands appear in the Main Menu.
 * * Add new windows like the Playtime Window and Variable windows.
 * * Change the style of how the windows are arranged in the Main Menu.
 * * Change the way the status list is displayed and the way it's displayed.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 *
 * <Menu Portrait: filename>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" style Main Menu List.
 * - Sets the menu image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 *
 * ---
 * 
 * <Menu Portrait Offset: +x, +y>
 * <Menu Portrait Offset: -x, -y>
 * 
 * <Menu Portrait Offset X: +x>
 * <Menu Portrait Offset X: -x>
 * 
 * <Menu Portrait Offset Y: +y>
 * <Menu Portrait Offset Y: -y>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" style Main Menu List.
 * - Offsets the X and Y coordinates for the menu image.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * - This only applies to the Main Menu portraits.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Menu Image (Group)
 * Actor: Change Menu Image (Range)
 * Actor: Change Menu Image (JS)
 * - Changes the actor's Menu Image.
 * - Each version has a different means of selecting Actor ID's.
 *
 *   Step 1: Actor:
 *   - Select which ID(s) to affect.
 *
 *     Single:
 *     - Select which specific ID to affect.
 *
 *     Variable Reference:
 *     - Which variable is used to determine which ID to affect?
 *
 *     Range Start:
 *     - Select where the ID range begins.
 *
 *     Range End:
 *     - Select where the ID range ends.
 *
 *     Group:
 *     - Select which group of ID(s) to affect.
 *
 *     JavaScript:
 *     - JavaScript code to return an array on which ID(s) to affect.
 *
 *   Step 2: Target:
 *   - Select operation on what to change the switch(es) to.
 *   - Depending on what you pick here, one of the following actions are used
 *     in combination with the ID's picked from Step 1.
 *
 *     Filename:
 *     - Selected actor(s) will have their menu images changed to this.
 *
 *     Variable Reference:
 *     - Select the variable used to determine filename used for the selected
 *       actor(s).
 *
 *     JavaScript:
 *     - JavaScript code to determine what filename is used for the selected
 *       actor(s).
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These general settings contain various settings on how the Main Menu scene
 * displays certain windows, alters how specific windows behave, and determines
 * which scenes would display actor menu images as background portraits.
 *
 * ---
 *
 * Gold Window
 * 
 *   Thinner Gold Window:
 *   - Make the Gold Window thinner in the Main Menu?
 *   - Used to match the Playtime and Variable Windows.
 * 
 *   Auto Adjust Height:
 *   - Automatically adjust the height for the thinner Gold Window?
 *
 *   Auto Adjust Y:
 *   - Automatically adjust the Y position for the thinner Gold Window?
 *
 * ---
 * 
 * Status Window
 * 
 *   Select Last?:
 *   - When picking a personal command from the Command Window, select the
 *     last picked actor or always the first?
 * 
 * ---
 *
 * Solo Party
 *
 *   Solo Quick Mode:
 *   - When selecting "Skills", "Equip", or "Status" with one party member,
 *     immediately go to the scene.
 *
 * ---
 *
 * Sub Menus
 *
 *   Menus with Actor BG's:
 *   - A list of the menus that would be compatible with Actor Menu Backgrounds
 *
 *   JS: Actor BG Action:
 *   - Code used to determine how to display the sprites upon loading.
 *
 * ---
 * 
 * Party Window
 * 
 *   Show Reserve Memebers:
 *   - Show reserve members while on the Main Menu scene?
 * 
 *   Hide Main Menu Only
 *   - If reserve members are hidden, hide them only in the main menu or
 *     all scenes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window List
 * ============================================================================
 *
 * The Command Window functions as a hub to the various scenes linked from the
 * Main Menu. These include 'Item', 'Skill', 'Equip', 'Status', 'Save', and
 * so on. This Plugin Parameter is an array that lets you add, remove, and/or
 * alter the Command Window's various commands, how they're handled, whether or
 * not they're visible, and how they react when selected.
 *
 * These will require knowledge of JavaScript to use them properly.
 *
 * ---
 *
 * Command Window List
 * 
 *   Symbol:
 *   - The symbol used for this command.
 *
 *   Icon:
 *   - Icon used for this command.
 *   - Use 0 for no icon.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 *   JS: Personal Code:
 *   - JavaScript code that runs once the actor list is selected with this
 *     command highlighted.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Playtime Window
 * ============================================================================
 *
 * The Playtime Window is an optional feature that can be displayed in the
 * Main Menu. As its name suggests, it displays the playtime of the player's
 * current play through.
 *
 * ---
 *
 * Playtime Window
 * 
 *   Enable:
 *   - Use the Playtime Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Playtime Window?
 *
 *   Background Type:
 *   - Select background type for the Playtime window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Playtime window.
 * 
 *   Time Icon:
 *   - Icon displayed for the 'Time' label.
 * 
 *   Time Text:
 *   - Text for the display of 'Time' in the Playtime window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Playtime window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Variable Window
 * ============================================================================
 *
 * The Variable Window is an optional feature that can be displayed in the
 * Main Menu. If enabled, the Variable Window will display variables of the
 * game dev's choice in the Main Menu itself.
 *
 * ---
 *
 * Variable Window
 * 
 *   Enable:
 *   - Use the Variable Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Variable Window?
 *
 *   Background Type:
 *   - Select background type for the Variable window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Variable window.
 * 
 *   Variable List:
 *   - Select variables to be displayed into the window.
 *     Use \i[x] to determine their icon.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Variable window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window Style & Command Style Settings
 * ============================================================================
 *
 * This determines how the Main Menu appears based on the Command Window Style.
 * If anything but the 'Default' is used, then these settings will take over
 * the window placement settings for the Main Menu. This means that even if you
 * are using VisuStella's Core Engine, the window layouts will be overwritten.
 *
 * ---
 *
 * Command Window Style:
 * - Choose the positioning and style of the Main Menu Command Window.
 * - This will automatically rearrange windows.
 * 
 *   Default Vertical Side Style:
 *   - The default Main Menu layout style.
 *   - Affected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Top Horizontal Style:
 *   - Puts the Command Window at the top of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 *   Bottom Horizontal Style:
 *   - Puts the Command Window at the bottom of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the top.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Mobile Full Screen Style:
 *   - Puts the Command Window at the center of the screen with larger buttons.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is hidden until prompted to be selected.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 * ---
 *
 * Command Style Settings
 *
 *   Style:
 *   - How do you wish to draw command entries in the Command Window?
 *   - Text Only: displays only text.
 *   - Icon Only: displays only the icon.
 *   - Icon + Text: displays icon first, then text.
 *   - Automatic: determines the best fit for the size
 *
 *   Text Alignment:
 *   - Decide how you want the text to be aligned.
 *   - Left, Center, or Right
 * 
 *   Rows:
 *   - Number of visible rows.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Mobile Thickness:
 *   - The thickness of the buttons for mobile version.
 *   - Applies only to Top, Bottom, and Mobile styles.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Status Graphic, Status List Style, & List Style Settings
 * ============================================================================
 *
 * Choose how the contents Actor Status List Window in the Main Menu appears.
 * This can range from the which actor graphic is drawn to the style used for
 * the data that's displayed.
 *
 * ---
 *
 * Status Graphic:
 * - Choose how the graphic for actor graphics appear in status-like menus.
 * 
 *   None:
 *   - Don't display any graphic for the actors.
 * 
 *   Face:
 *   - Display the actors' faces. This is the default option in RPG Maker MZ.
 *
 *   Map Sprite:
 *   - Display the actors' map sprites.
 * 
 *   Sideview Battler:
 *   - Display the actors' sideview battlers.
 *
 * ---
 *
 * Main Menu List Style
 * - Choose how the actor status list looks in the Main Menu.
 *
 * Inner-Menu List Style
 * - Choose how the actor status list looks in the inner menus like Scene_Item,
 *   Scene_Skill, etc.
 *
 *   Default Horizontal Style:
 *   - This is the default style found in RPG Maker MZ's Main Menu.
 *
 *   Vertical Style:
 *   - Makes the display for the actor list vertical instead of horizontal.
 *
 *   Portrait Style:
 *   - Similar to the vertical style, except each actor's Menu Image is
 *     displayed in the background instead. Portraits are required.
 *
 *   Solo Style:
 *   - Used for solo party member games. Extends the whole view of the Status
 *     Window to accomodate a single actor.
 *
 *   Thin Horizontal Style:
 *   - Makes the selectable menu entries for the actors a single line thin.
 *
 *   Thicker Horizontal Style:
 *   - Makes the selectable menu entries for the actors two lines thick.
 *
 * ---
 *
 * List Styles
 *   JavaScript code used to determine how the individual styles are drawn.
 *
 *   JS: Default:
 *   JS: Vertical:
 *   JS: Portrait:
 *   JS: Solo:
 *   JS: Thin:
 *   JS: Thicker:
 *   - Code used to draw the data for these styles.
 *
 * ---
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
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.08: February 26, 2021
 * * Feature Update!
 * ** Default Plugin Parameters for the List Style Settings defaults have been
 *    updated with tighter coordinate values to allow for more accurate display
 *    of UI element positioning. Update made by Olivia.
 * 
 * Version 1.07: January 1, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Removed "<Menu Image: filename>" version of notetag to reduce confusion
 *    and to stick with the norm declared by the Battle Core.
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Menu Portrait Offset: +x, +y>
 * *** <Menu Portrait Offset X: +x>
 * *** <Menu Portrait Offset Y: +y>
 * **** This is used with the "Portrait" style Main Menu list.
 * **** Offsets the X and Y coordinates for the menu portrait.
 * 
 * Version 1.06: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: October 11, 2020
 * * Documentation Update!
 * ** Documentation added for the new plugin parameter.
 * * New Features!
 * ** New plugin parameter added by Yanfly.
 * *** Plugin Parameters > General > Status Window > Select Last?
 * **** When picking a personal command from the Command Window, select the
 *      last picked actor or always the first?
 * 
 * Version 1.04: October 4, 2020
 * * Feature Update!
 * ** Certain windows will now pre-load all associated image types for the
 *    actor upon being created to avoid custom JS drawing problems.
 *    Change made by Irina.
 * ** Failsafes have been added to prevent non-existent variables from crashing
 *    the game if a user does not remove them from the variable list. Change
 *    made by Irina.
 * 
 * Version 1.03: September 20, 2020
 * * Documentation Update!
 * ** Added the alternative notetag <Menu Portrait: filename> that also works
 *    the same way as <Menu Image: filename>.
 * 
 * Version 1.02: September 13, 2020
 * * Compatibility Update!
 * ** Better compatibility for SV Actor graphics.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Skill check plugin parameter for show fixed. Fixed by Yanfly and Shaz.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Command Window List > skill >
 *     JS: Show > and changing 'this.needsCommand("item")' to
 *     'this.needsCommand("skill")'
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageGroup
 * @text Actor: Change Menu Image (Group)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's to change.
 *
 * @arg Step1:arraynum
 * @text Step 1: Target ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageRange
 * @text Actor: Change Menu Image (Range)
 * @desc Changes the actor's Menu Image.
 * Select from a range of actor ID's to change.
 *
 * @arg Step1
 * @text Step 1: ID Range
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to end at.
 * @default 4
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageJS
 * @text Actor: Change Menu Image (JS)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's using JavaScript.
 *
 * @arg Step1:arrayeval
 * @text Step 1: Target ID(s)
 * @type string[]
 * @desc Enter which Actor ID(s) to affect.
 * You may use JavaScript code.
 * @default ["$gameVariables.value(1)"]
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MainMenuCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings pertaining to the Main Menu and related.
 * @default {"GoldWindow":"","ThinGoldWindow:eval":"true","AutoGoldHeight:eval":"true","AutoGoldY:eval":"true","StatusWindow":"","StatusSelectLast:eval":"false","SoloParty":"","SoloQuick:eval":"true","SubMenus":"","ActorBgMenus:arraystr":"[\"Scene_Skill\"]","ActorBgMenuJS:func":"\"this.anchor.x = 0.5;\\nconst scale = 1.25;\\nthis.scale.x = this.scale.y = scale;\\nthis.x = Graphics.width;\\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._targetX = Graphics.width * 3 / 4;\\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._duration = 10;\\nthis.opacity = 0;\"","PartyWindow":"","ShowReserve:eval":"true","HideMainMenuOnly:eval":"true"}
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Main Menu.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"item\",\"Icon:num\":\"208\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.item;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"item\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItem();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"classChange\",\"Icon:num\":\"133\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.classChangeMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    this.isClassChangeCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled() &&\\\\n    this.isClassChangeCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_ClassChange);\\\"\"}","{\"Symbol:str\":\"skill\",\"Icon:num\":\"101\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.skill;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"skill\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Skill);\\\"\"}","{\"Symbol:str\":\"equip\",\"Icon:num\":\"137\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.equip;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"equip\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Equip);\\\"\"}","{\"Symbol:str\":\"status\",\"Icon:num\":\"82\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.status;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"status\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Status);\\\"\"}","{\"Symbol:str\":\"itemCrafting\",\"Icon:num\":\"223\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.ItemCraftingMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ItemCraftingSys &&\\\\n    this.isItemCraftingCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isItemCraftingCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItemCrafting();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"quest\",\"Icon:num\":\"186\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.questCommandName;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_QuestSystem &&\\\\n    this.isQuestCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isQuestCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandQuest();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"combatLog\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.combatLog_BattleCmd_Name;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CombatLog &&\\\\n    this.isCombatLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCombatLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCombatLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"formation\",\"Icon:num\":\"75\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.formation;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"formation\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isFormationEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandFormation();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"options\",\"Icon:num\":\"83\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"options\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isOptionsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"save\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.save;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isSaveEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandSave();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent1\",\"Icon:num\":\"88\",\"TextStr:str\":\"Common Event 1\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return 1;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCommonEvent();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent2\",\"Icon:num\":\"87\",\"TextStr:str\":\"Common Event 2\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return 2;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"// Declare Ext\\\\nconst ext = arguments[0];\\\\n\\\\n// Declare Status Window\\\\nconst statusWindow = SceneManager._scene._statusWindow;\\\\n\\\\n// Declare Actor ID\\\\nconst actorId = statusWindow.actor(statusWindow.index()).actorId();\\\\n\\\\n// Set variable 1 to Actor ID\\\\n$gameVariables.setValue(1, actorId);\\\\n\\\\n// Prepare Common Event ext to run\\\\n$gameTemp.reserveCommonEvent(ext);\\\\n\\\\n// Exit Main Menu\\\\nSceneManager._scene.popScene();\\\"\"}","{\"Symbol:str\":\"gameEnd\",\"Icon:num\":\"187\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"gameEnd\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isGameEndEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandGameEnd();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}"]
 *
 * @param Playtime:struct
 * @text Playtime Window
 * @type struct<Playtime>
 * @desc Settings for the Playtime Window.
 * @default {"Enable:eval":"true","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","Icon:num":"75","Time:str":"Time","WindowRect:func":"\"const rows = 1;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param Variable:struct
 * @text Variable Window
 * @type struct<Variable>
 * @desc Settings for the Variable Window.
 * @default {"Enable:eval":"false","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","VarList:arraynum":"[\"1\",\"2\"]","WindowRect:func":"\"const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param ParamBreak1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CommandWindowStyle:str
 * @text Command Window Style
 * @type select
 * @option Default Vertical Side Style
 * @value default
 * @option Top Horizontal Style
 * @value top
 * @option Thin Top Horizontal Style
 * @value thinTop
 * @option Bottom Horizontal Style
 * @value bottom
 * @option Thin Bottom Horizontal Style
 * @value thinBottom
 * @option Mobile Full Screen Style
 * @value mobile
 * @desc Choose the positioning and style of the Main Menu Command Window. This will automatically rearrange windows.
 * @default top
 *
 * @param CustomCmdWin:struct
 * @text Command Style Settings
 * @parent CommandWindowStyle:str
 * @type struct<CustomCmdWin>
 * @desc Settings for the non-default Command Window Styles.
 * @default {"Style:str":"auto","TextAlign:str":"center","Rows:num":"2","Cols:num":"4","MobileThickness:num":"5"}
 *
 * @param ParamBreak2
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param StatusGraphic:str
 * @text Status Graphic
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler
 * @value svbattler
 * @desc Choose how the actor graphics appear in status-like menus.
 * @default face
 *
 * @param StatusListStyle:str
 * @text Main Menu List Style
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the Main Menu.
 * @default portrait
 *
 * @param InnerMenuListStyle:str
 * @text Inner-Menu List Style
 * @parent StatusListStyle:str
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the inner menus
 * like Scene_Item, Scene_Skill, etc.
 * @default default
 *
 * @param ListStyles:struct
 * @text List Style Settings
 * @parent StatusListStyle:str
 * @type struct<ListStyles>
 * @desc JavaScript code used to determine how the individual styles are drawn.
 * @default {"DefaultStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst sx = rect.x + 180;\\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\\nconst lineHeight = this.lineHeight();\\nconst sx2 = sx + 180;\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\\nthis.drawActorClass(actor, sx2, sy);\\n\\n// Place Gauges\\nconst sy2 = sy + lineHeight;\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nthis.placeGauge(actor, \\\"hp\\\", sx2, sy2);\\nthis.placeGauge(actor, \\\"mp\\\", sx2, sy2 + gaugeLineHeight);\\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\\nif ($dataSystem.optDisplayTp && roomForTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx2, sy2 + gaugeLineHeight * 2);\\n}\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx2 + 180;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\"","VerticalStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nconst gx = rect.x;\\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Actor Name\\nlet sx = rect.x;\\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\\nlet sw = rect.width;\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","PortraitStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = rect.height;\\nconst gx = rect.x;\\nconst gy = rect.y;\\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\\n\\n// Draw Dark Rectangle\\nlet sx = rect.x;\\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\\nlet sw = rect.width;\\nlet sh = rect.y + rect.height - sy;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","SoloStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\n\\n// Draw Actor Graphic\\nlet sx = rect.x;\\nlet sy = rect.y;\\nlet sw = rect.width;\\nlet sh = rect.height;\\n\\n// Portrait\\nif (actor.getMenuImage() !== '') {\\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\\n\\n// Everything Else\\n} else {\\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\\n}\\n\\n// Draw Dark Rectangle\\nsh = Math.ceil(lineHeight * 4.5);\\nsy = rect.y + rect.height - sh;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nsw = Math.round(rect.width / 2);\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Prepare Stat Coordinates\\nsx = rect.x + Math.floor(rect.width / 2);\\nsw = rect.width / 2;\\nsh = rect.height;\\nconst sx3 = sx;\\nconst cw = rect.width - sx3 - 2;\\n\\n// Prepare Total Content Height to vertically center the content.\\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    totalHeight += lineHeight;\\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\nconst equips = actor.equips();\\ntotalHeight += lineHeight;\\ntotalHeight += equips.length * lineHeight;\\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\\n\\n// Place Gauges\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nif ($dataSystem.optDisplayTp) {\\n    sy += gaugeLineHeight;\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n    sy += gaugeLineHeight;\\n}\\nlet ny = sy;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    sy += lineHeight;\\n    const pw = Math.floor(cw / 2) - 24;\\n    let px = sx3;\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, sy, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            sy += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n    ny += lineHeight;\\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\n\\n// Draw Actor Equipment\\nthis.resetFontSettings();\\nsx = rect.x + Math.floor(rect.width / 2);\\nsy = ny + lineHeight;\\nsw = rect.width / 2;\\nfor (const equip of equips) {\\n    if (equip) {\\n        this.drawItemName(equip, sx, sy, sw);\\n        sy += lineHeight;\\n        if (sy + lineHeight > rect.y + rect.height) return;\\n    }\\n}\"","ThinStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\n\\n// Place Gauges\\nsx += 180;\\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy);\"","ThickerStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorClass(actor, sx, sy + lineHeight);\\n//this.drawActorLevel(actor, sx, sy + lineHeight);\\n\\n// Place Gauges\\nsx += 180;\\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy + gaugeLineHeight);\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy + (gaugeLineHeight * 2));\\nsx += 160;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\""}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this command.
 * Use 0 for no icon.
 * @default 0
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this menu command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default "const ext = arguments[0];"
 *
 * @param PersonalHandlerJS:func
 * @text JS: Personal Code
 * @type note
 * @desc JavaScript code that runs once the actor list is selected with this command highlighted.
 * @default "const ext = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param ThinGoldWindow:eval
 * @text Thinner Gold Window
 * @parent GoldWindow
 * @type boolean
 * @on Thinner
 * @off Normal
 * @desc Make the Gold Window thinner in the Main Menu?
 * Used to match the Playtime and Variable Windows.
 * @default true
 *
 * @param AutoGoldHeight:eval
 * @text Auto Adjust Height
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the height for the thinner Gold Window?
 * @default true
 *
 * @param AutoGoldY:eval
 * @text Auto Adjust Y
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the Y position for the thinner Gold Window?
 * @default true
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusSelectLast:eval
 * @text Select Last?
 * @parent StatusWindow
 * @type boolean
 * @on Last Picked Actor
 * @off Always First Actor
 * @desc When picking a personal command from the Command Window,
 * select the last picked actor or always the first?
 * @default false
 *
 * @param SoloParty
 * @text Solo Party
 *
 * @param SoloQuick:eval
 * @text Solo Quick Mode
 * @parent SoloParty
 * @type boolean
 * @on Quick
 * @off Normal
 * @desc When selecting "Skills", "Equip", or "Status" with one party member, immediately go to the scene.
 * @default true
 *
 * @param SubMenus
 * @text Sub Menus
 *
 * @param ActorBgMenus:arraystr
 * @text Menus with Actor BG's
 * @parent SubMenus
 * @type string[]
 * @desc A list of the menus that would be compatible with Actor Menu Backgrounds.
 * @default ["Scene_Skill","Scene_Equip","Scene_Status"]
 *
 * @param ActorBgMenuJS:func
 * @text JS: Actor BG Action
 * @parent SubMenus
 * @type note
 * @desc Code used to determine how to display the sprites upon loading.
 * @default "this.anchor.x = 0.5;\nconst scale = 1.25;\nthis.scale.x = this.scale.y = scale;\nthis.x = Graphics.width;\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._targetX = Graphics.width * 3 / 4;\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._duration = 10;\nthis.opacity = 0;"
 *
 * @param PartyWindow
 * @text Party Window
 *
 * @param ShowReserve:eval
 * @text Show Reserve Memebers
 * @parent PartyWindow
 * @type boolean
 * @on Show Reserve Members
 * @off Hide Reserve Members
 * @desc Show reserve members while on the Main Menu scene?
 * @default true
 *
 * @param HideMainMenuOnly:eval
 * @text Hide Main Menu Only
 * @parent ShowReserve:eval
 * @type boolean
 * @on Hide in Main Menu Only
 * @off Hide in all Scenes
 * @desc If reserve members are hidden, hide them only in the main menu or all scenes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Playtime Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Playtime:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Playtime Window?
 * @default true
 *
 * @param AdjustCommandHeight:func
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Playtime Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Playtime window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Playtime window.
 * Default: 26
 * @default 20
 *
 * @param Icon:num
 * @text Time Icon
 * @desc Icon displayed for the 'Time' label.
 * @default 75
 *
 * @param Time:str
 * @text Time Text
 * @desc Text for the display of 'Time' in the Playtime window.
 * @default Time
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Playtime window.
 * @default "const rows = 1;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Variable Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Variable:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Variable Window?
 * @default false
 *
 * @param AdjustCommandHeight:func
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Variable Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Variable window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Variable window.
 * Default: 26
 * @default 20
 *
 * @param VarList:arraynum
 * @text Variable List
 * @type variable[]
 * @desc Select variables to be displayed into the window.
 * Use \i[x] to determine their icon.
 * @default ["1","2","3"]
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Variable window.
 * @default "const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Horizontal Command Window Style
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomCmdWin:
 *
 * @param Style:str
 * @text Command Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw command entries in the Command Window?
 * @default auto
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Rows:num
 * @text Rows
 * @type number
 * @min 1
 * @desc Number of visible rows.
 * @default 2
 *
 * @param Cols:num
 * @text Columns
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 4
 *
 * @param MobileThickness:num
 * @text Mobile Thickness
 * @type number
 * @min 1
 * @desc The thickness of the buttons for mobile version.
 * @default 5
 *
 */
/* ----------------------------------------------------------------------------
 * List Style Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ListStyles:
 *
 * @param DefaultStyle:func
 * @text JS: Default
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst sx = rect.x + 180;\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\nconst lineHeight = this.lineHeight();\nconst sx2 = sx + 180;\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\nthis.drawActorClass(actor, sx2, sy);\n\n// Place Gauges\nconst sy2 = sy + lineHeight;\nconst gaugeLineHeight = this.gaugeLineHeight();\nthis.placeGauge(actor, \"hp\", sx2, sy2);\nthis.placeGauge(actor, \"mp\", sx2, sy2 + gaugeLineHeight);\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\nif ($dataSystem.optDisplayTp && roomForTp) {\n    this.placeGauge(actor, \"tp\", sx2, sy2 + gaugeLineHeight * 2);\n}\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx2 + 180;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 * @param VerticalStyle:func
 * @text JS: Vertical
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x;\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Actor Name\nlet sx = rect.x;\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\nlet sw = rect.width;\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param PortraitStyle:func
 * @text JS: Portrait
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = rect.height;\nconst gx = rect.x;\nconst gy = rect.y;\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\n\n// Draw Dark Rectangle\nlet sx = rect.x;\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\nlet sw = rect.width;\nlet sh = rect.y + rect.height - sy;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param SoloStyle:func
 * @text JS: Solo
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\n\n// Draw Actor Graphic\nlet sx = rect.x;\nlet sy = rect.y;\nlet sw = rect.width;\nlet sh = rect.height;\n\n// Portrait\nif (actor.getMenuImage() !== '') {\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\n\n// Everything Else\n} else {\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\n}\n\n// Draw Dark Rectangle\nsh = Math.ceil(lineHeight * 4.5);\nsy = rect.y + rect.height - sh;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nsw = Math.round(rect.width / 2);\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Prepare Stat Coordinates\nsx = rect.x + Math.floor(rect.width / 2);\nsw = rect.width / 2;\nsh = rect.height;\nconst sx3 = sx;\nconst cw = rect.width - sx3 - 2;\n\n// Prepare Total Content Height to vertically center the content.\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    totalHeight += lineHeight;\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\nconst equips = actor.equips();\ntotalHeight += lineHeight;\ntotalHeight += equips.length * lineHeight;\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\n\n// Place Gauges\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nif ($dataSystem.optDisplayTp) {\n    sy += gaugeLineHeight;\n    this.placeGauge(actor, \"tp\", sx, sy);\n    sy += gaugeLineHeight;\n}\nlet ny = sy;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    sy += lineHeight;\n    const pw = Math.floor(cw / 2) - 24;\n    let px = sx3;\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, sy, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            sy += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n    ny += lineHeight;\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\n\n// Draw Actor Equipment\nthis.resetFontSettings();\nsx = rect.x + Math.floor(rect.width / 2);\nsy = ny + lineHeight;\nsw = rect.width / 2;\nfor (const equip of equips) {\n    if (equip) {\n        this.drawItemName(equip, sx, sy, sw);\n        sy += lineHeight;\n        if (sy + lineHeight > rect.y + rect.height) return;\n    }\n}"
 *
 * @param ThinStyle:func
 * @text JS: Thin
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\n\n// Place Gauges\nsx += 180;\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy);"
 *
 * @param ThickerStyle:func
 * @text JS: Thicker
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\nthis.drawActorName(actor, sx, sy);\nthis.drawActorClass(actor, sx, sy + lineHeight);\n//this.drawActorLevel(actor, sx, sy + lineHeight);\n\n// Place Gauges\nsx += 180;\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nthis.placeGauge(actor, \"mp\", sx, sy + gaugeLineHeight);\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy + (gaugeLineHeight * 2));\nsx += 160;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 */
//=============================================================================

const _0x4fe4=['_actorMenuBgSprite','value','name','ListStyles','calcWindowHeight','Step2','addSymbolBridge','drawItemStyleIconText','Untitled','drawTimeLabel','statusWindowRectTopStyle','commandWindowRectTopStyle','drawItemStatusVerticalStyle','CustomCmdWin','goldWindowRectTopStyle','variableWindowRectTopStyle','drawItemStatus','Scene_Menu_goldWindowRect','addCommand','drawPlaytime','commandWindowRectThinBottomStyle','windowPadding','maxVisibleItems','initMenuImage','applyThinnerGoldWindowRect','index','_dummyWindow','adjustDefaultCommandWindowRect','MobileThickness','StatusSelectLast','width','commandWindowRect','max','bitmap','setActor','actor','prototype','create','drawItemStatusThinStyle','commandPersonal','CallHandlerJS','default','setup','FontSize','_targetY','drawItemBackground','constructor','parse','statusWindowRectBottomStyle','createDummyWindow','isBigCharacter','faceWidth','popScene','1084180JKzNYd','MainMenuCore','updateOpacity','StatusGraphic','lineHeight','showOnlyBattleMembers','setBackgroundType','STRUCT','loadBitmap','isDisplayActorMenuBackgroundImage','members','SoloQuick','canCreatePlaytimeWindow','drawItemStatusThickerStyle','contents','drawActorGraphic','length','registerCommand','openness','addMainCommands','return\x200','WindowRect','call','battlerName','vertical','boxWidth','canCreateVariableWindow','updateTimer','PersonalHandlerJS','numVisibleRows','HideMainMenuOnly','onPersonalCancel','drawItemStatusSoloStyle','adjustCommandHeightByVariable','commandNameWindowCenter','changeTextColor','drawItemActorSvBattler','setMenuImage','blt','General','callUpdateHelp','getMenuImageOffsetX','initialize','systemColor','JSON','parameters','VarList','right','ChangeActorMenuImageRange','makeCommandList','drawItemStatusSoloStyleOnLoad','fill','createVariableWindow','6363GLMUAj','InnerMenuListStyle','Scene_Menu_commandFormation','Window_MenuStatus_maxItems','commandWindowRectMobileStyle','opacity','Scene_Menu_commandPersonal','changePaintOpacity','thinBottom','createCommandNameWindow','maxItems','note','statusWindowRectMobileStyle','Playtime','setHandler','needsDummyWindow','status','format','isSoloQuickMode','CommandList','18cPAVuy','commandStyleCheck','statusWindowRect','onBitmapLoad','mobile','graphicType','svbattler','Style','drawItemActorSprite','isBattleMember','close','isExpGaugeDrawn','100383jHWNHR','TextJS','TextStr','bind','min','Step1Start','ActorBgMenus','updateActor','StatusListStyle','maxCols','_timer','textSizeEx','createPlaytimeWindow','itemRect','createActorMenuBackgroundImageSprite','drawItemStatusPortraitStyleOnLoad','ThickerStyle','Step1End','commandWindowRectBottomStyle','version','Game_Actor_setup','cancel','itemHeight','fontSize','height','faceHeight','portrait','icon','toUpperCase','none','iconWidth','open','Scene_Menu_onPersonalCancel','setTargetActor','resetFontSettings','commandName','characterName','svActorVertCells','isArray','_commandWindow','refresh','addChild','createGoldWindow','topIndex','loadPicture','drawItemStatusDefaultStyle','Icon','commandCommonEvent','_playtimeText','1822SECFoC','Enable','42loWRUm','solo','clear','drawActorFace','updateCommandNameWindow','STR','commandStyle','svActorHorzCells','loadFaceImages','Window_MenuStatus_itemHeight','createCommandWindow','drawTimeIcon','save','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','addLoadListener','Variable','241438NSPmzB','Scene_MenuBase_createBackground','BgType','push','text','addGameEndCommand','Window_MenuCommand_initialize','listStyle','mainAreaHeight','goldWindowRect','mainAreaBottom','iconHeight','AutoGoldHeight','commandWindowRectThinTopStyle','Scene_Menu_statusWindowRect','top','Scene_Menu_createStatusWindow','commandWindowStyle','NUM','AdjustCommandHeight','Window_StatusBase_loadFaceImages','drawAllItems','Cols','27473UnSwWa','description','goldWindowRectBottomStyle','map','_data','drawPendingItemBackground','drawItemActorMenuImage','_actor','onPersonalOk','_commandList','exit','ShowJS','adjustCommandHeightByPlaytime','addWindow','playtimeText','addOptionsCommand','ARRAYSTRUCT','ShowReserve','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','trim','playtimeWindowRect','Window_MenuStatus_drawItemImage','mainCommandWidth','smoothSelect','thinTop','variableWindowRectBottomStyle','includes','createBackground','addOriginalCommands','update','fittingHeight','drawTextEx','createStatusWindow','525707MpcPLI','ChangeActorMenuImageJS','_commandNameWindow','commandNameWindowDrawText','Symbol','addFormationCommand','Scene_Menu_onFormationCancel','thicker','drawItemActorFace','maxBattleMembers','loadCharacter','_targetX','_list','VerticalStyle','AutoGoldY','Scene_Menu_create','addSaveCommand','_playtimeWindow','currentExt','bottom','_statusWindow','getMenuImageOffsetY','replace','_scene','ExtJS','updatePosition','center','_bitmapReady','match','updateDuration','ceil','commandFormation','Window_MenuStatus_selectLast','_duration','variableWindowRect','ConvertParams','Rows','floor','Settings','variables','drawText','drawItem','drawIcon','activate','TextAlign','commandNameWindowDrawBackground','battleMembers','selectLast','ARRAYSTR','EnableJS','mainAreaTop','16fVBFzh','_menuImage','sprite','_goldWindow','drawSvActor','ThinStyle','loadOtherActorImages','_variableWindow','boxHeight','loadSvActor','ARRAYEVAL','auto','iconText','drawItemStyleIcon','Scene_MenuBase_updateActor','Step1','itemLineRect','getMenuImage'];const _0x1c56=function(_0x18da8a,_0x1b6b20){_0x18da8a=_0x18da8a-0xe7;let _0x4fe4b5=_0x4fe4[_0x18da8a];return _0x4fe4b5;};const _0x23d374=_0x1c56;(function(_0x393ebd,_0x59c630){const _0x517f4a=_0x1c56;while(!![]){try{const _0x460e95=parseInt(_0x517f4a(0x1e7))+-parseInt(_0x517f4a(0x125))*parseInt(_0x517f4a(0x14c))+parseInt(_0x517f4a(0x21c))*-parseInt(_0x517f4a(0x230))+parseInt(_0x517f4a(0xf2))+parseInt(_0x517f4a(0x16d))+parseInt(_0x517f4a(0x123))*-parseInt(_0x517f4a(0x1a0))+parseInt(_0x517f4a(0x135));if(_0x460e95===_0x59c630)break;else _0x393ebd['push'](_0x393ebd['shift']());}catch(_0xcde9ed){_0x393ebd['push'](_0x393ebd['shift']());}}}(_0x4fe4,0x9fb4c));var label=_0x23d374(0x1e8),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x4dfc96){const _0x4f219f=_0x23d374;return _0x4dfc96[_0x4f219f(0x22c)]&&_0x4dfc96[_0x4f219f(0x14d)][_0x4f219f(0x166)]('['+label+']');})[0x0];VisuMZ[label][_0x23d374(0x193)]=VisuMZ[label][_0x23d374(0x193)]||{},VisuMZ[_0x23d374(0x190)]=function(_0x2d2de8,_0x2df95f){const _0x2d9f00=_0x23d374;for(const _0x588d65 in _0x2df95f){if(_0x588d65[_0x2d9f00(0x189)](/(.*):(.*)/i)){const _0x1a6767=String(RegExp['$1']),_0x3abd95=String(RegExp['$2'])[_0x2d9f00(0x10e)]()[_0x2d9f00(0x15f)]();let _0xc58725,_0x21cf2e,_0x346cbe;switch(_0x3abd95){case _0x2d9f00(0x147):_0xc58725=_0x2df95f[_0x588d65]!==''?Number(_0x2df95f[_0x588d65]):0x0;break;case'ARRAYNUM':_0x21cf2e=_0x2df95f[_0x588d65]!==''?JSON[_0x2d9f00(0x1e1)](_0x2df95f[_0x588d65]):[],_0xc58725=_0x21cf2e[_0x2d9f00(0x14f)](_0x5b1a46=>Number(_0x5b1a46));break;case'EVAL':_0xc58725=_0x2df95f[_0x588d65]!==''?eval(_0x2df95f[_0x588d65]):null;break;case _0x2d9f00(0x1aa):_0x21cf2e=_0x2df95f[_0x588d65]!==''?JSON[_0x2d9f00(0x1e1)](_0x2df95f[_0x588d65]):[],_0xc58725=_0x21cf2e['map'](_0x1ae464=>eval(_0x1ae464));break;case _0x2d9f00(0x213):_0xc58725=_0x2df95f[_0x588d65]!==''?JSON[_0x2d9f00(0x1e1)](_0x2df95f[_0x588d65]):'';break;case'ARRAYJSON':_0x21cf2e=_0x2df95f[_0x588d65]!==''?JSON[_0x2d9f00(0x1e1)](_0x2df95f[_0x588d65]):[],_0xc58725=_0x21cf2e['map'](_0x61e9b1=>JSON[_0x2d9f00(0x1e1)](_0x61e9b1));break;case'FUNC':_0xc58725=_0x2df95f[_0x588d65]!==''?new Function(JSON[_0x2d9f00(0x1e1)](_0x2df95f[_0x588d65])):new Function(_0x2d9f00(0x1fb));break;case'ARRAYFUNC':_0x21cf2e=_0x2df95f[_0x588d65]!==''?JSON[_0x2d9f00(0x1e1)](_0x2df95f[_0x588d65]):[],_0xc58725=_0x21cf2e[_0x2d9f00(0x14f)](_0x27487a=>new Function(JSON['parse'](_0x27487a)));break;case _0x2d9f00(0x12a):_0xc58725=_0x2df95f[_0x588d65]!==''?String(_0x2df95f[_0x588d65]):'';break;case _0x2d9f00(0x19d):_0x21cf2e=_0x2df95f[_0x588d65]!==''?JSON[_0x2d9f00(0x1e1)](_0x2df95f[_0x588d65]):[],_0xc58725=_0x21cf2e['map'](_0x431373=>String(_0x431373));break;case _0x2d9f00(0x1ee):_0x346cbe=_0x2df95f[_0x588d65]!==''?JSON[_0x2d9f00(0x1e1)](_0x2df95f[_0x588d65]):{},_0x2d2de8[_0x1a6767]={},VisuMZ[_0x2d9f00(0x190)](_0x2d2de8[_0x1a6767],_0x346cbe);continue;case _0x2d9f00(0x15c):_0x21cf2e=_0x2df95f[_0x588d65]!==''?JSON[_0x2d9f00(0x1e1)](_0x2df95f[_0x588d65]):[],_0xc58725=_0x21cf2e['map'](_0x4e62f1=>VisuMZ['ConvertParams']({},JSON[_0x2d9f00(0x1e1)](_0x4e62f1)));break;default:continue;}_0x2d2de8[_0x1a6767]=_0xc58725;}}return _0x2d2de8;},(_0x108ab3=>{const _0x19b9e9=_0x23d374,_0x324275=_0x108ab3[_0x19b9e9(0x1b4)];for(const _0x59e407 of dependencies){if(!Imported[_0x59e407]){alert(_0x19b9e9(0x15e)[_0x19b9e9(0x22d)](_0x324275,_0x59e407)),SceneManager[_0x19b9e9(0x156)]();break;}}const _0xeab6c5=_0x108ab3[_0x19b9e9(0x14d)];if(_0xeab6c5[_0x19b9e9(0x189)](/\[Version[ ](.*?)\]/i)){const _0x1d41c1=Number(RegExp['$1']);_0x1d41c1!==VisuMZ[label][_0x19b9e9(0x105)]&&(alert(_0x19b9e9(0x132)[_0x19b9e9(0x22d)](_0x324275,_0x1d41c1)),SceneManager[_0x19b9e9(0x156)]());}if(_0xeab6c5[_0x19b9e9(0x189)](/\[Tier[ ](\d+)\]/i)){const _0x27d051=Number(RegExp['$1']);_0x27d051<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x324275,_0x27d051,tier)),SceneManager[_0x19b9e9(0x156)]()):tier=Math[_0x19b9e9(0x1d2)](_0x27d051,tier);}VisuMZ[_0x19b9e9(0x190)](VisuMZ[label]['Settings'],_0x108ab3[_0x19b9e9(0x214)]);})(pluginData),PluginManager[_0x23d374(0x1f8)](pluginData[_0x23d374(0x1b4)],'ChangeActorMenuImageGroup',_0x473a1d=>{const _0x4c676e=_0x23d374;VisuMZ[_0x4c676e(0x190)](_0x473a1d,_0x473a1d);const _0x2d59f2=_0x473a1d[_0x4c676e(0x1af)],_0x4af2eb=_0x473a1d[_0x4c676e(0x1b7)];for(let _0x31efea of _0x2d59f2){_0x31efea=parseInt(_0x31efea)||0x0;if(_0x31efea<=0x0)continue;const _0x486a7b=$gameActors['actor'](_0x31efea);if(!_0x486a7b)continue;_0x486a7b[_0x4c676e(0x20c)](_0x4af2eb);}}),PluginManager[_0x23d374(0x1f8)](pluginData[_0x23d374(0x1b4)],_0x23d374(0x217),_0x3dcc35=>{const _0x36053c=_0x23d374;VisuMZ[_0x36053c(0x190)](_0x3dcc35,_0x3dcc35);const _0xa5de5e=_0x3dcc35[_0x36053c(0x103)]>=_0x3dcc35[_0x36053c(0xf7)]?_0x3dcc35['Step1Start']:_0x3dcc35[_0x36053c(0x103)],_0x3b48fe=_0x3dcc35[_0x36053c(0x103)]>=_0x3dcc35[_0x36053c(0xf7)]?_0x3dcc35[_0x36053c(0x103)]:_0x3dcc35['Step1Start'],_0x344c59=Array(_0x3b48fe-_0xa5de5e+0x1)[_0x36053c(0x21a)]()[_0x36053c(0x14f)]((_0x5c23e4,_0x3c300e)=>_0xa5de5e+_0x3c300e),_0x5f2376=_0x3dcc35[_0x36053c(0x1b7)];for(let _0x2ae58d of _0x344c59){_0x2ae58d=parseInt(_0x2ae58d)||0x0;if(_0x2ae58d<=0x0)continue;const _0x477d50=$gameActors[_0x36053c(0x1d5)](_0x2ae58d);if(!_0x477d50)continue;_0x477d50[_0x36053c(0x20c)](_0x5f2376);}}),PluginManager[_0x23d374(0x1f8)](pluginData[_0x23d374(0x1b4)],_0x23d374(0x16e),_0x3148c9=>{const _0x22eb06=_0x23d374;VisuMZ[_0x22eb06(0x190)](_0x3148c9,_0x3148c9);const _0x5e6c7a=_0x3148c9[_0x22eb06(0x1af)];let _0x478240=[];while(_0x5e6c7a[_0x22eb06(0x1f7)]>0x0){const _0x512151=_0x5e6c7a['shift']();Array[_0x22eb06(0x118)](_0x512151)?_0x478240=_0x478240['concat'](_0x512151):_0x478240[_0x22eb06(0x138)](_0x512151);}const _0x1205c7=_0x3148c9['Step2'];for(let _0x595e1b of _0x478240){_0x595e1b=parseInt(_0x595e1b)||0x0;if(_0x595e1b<=0x0)continue;const _0x20c5da=$gameActors['actor'](_0x595e1b);if(!_0x20c5da)continue;_0x20c5da[_0x22eb06(0x20c)](_0x1205c7);}}),VisuMZ[_0x23d374(0x1e8)][_0x23d374(0x106)]=Game_Actor[_0x23d374(0x1d6)]['setup'],Game_Actor['prototype'][_0x23d374(0x1dc)]=function(_0xe16e67){const _0x58aba8=_0x23d374;VisuMZ['MainMenuCore']['Game_Actor_setup'][_0x58aba8(0x1fd)](this,_0xe16e67),this[_0x58aba8(0x1c9)]();},Game_Actor[_0x23d374(0x1d6)][_0x23d374(0x1c9)]=function(){const _0x44ac10=_0x23d374;this['_menuImage']='',this[_0x44ac10(0x1d5)]()&&this[_0x44ac10(0x1d5)]()[_0x44ac10(0x227)][_0x44ac10(0x189)](/<MENU (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(this['_menuImage']=String(RegExp['$1']));},Game_Actor[_0x23d374(0x1d6)][_0x23d374(0x1b1)]=function(){const _0x3b43ef=_0x23d374;if(this[_0x3b43ef(0x1a1)]===undefined)this[_0x3b43ef(0x1c9)]();return this[_0x3b43ef(0x1a1)];},Game_Actor[_0x23d374(0x1d6)][_0x23d374(0x20c)]=function(_0x5cc422){const _0x108fab=_0x23d374;if(this[_0x108fab(0x1a1)]===undefined)this['initMenuImage']();this[_0x108fab(0x1a1)]=_0x5cc422;},Game_Actor[_0x23d374(0x1d6)][_0x23d374(0x210)]=function(){const _0x1b2a3b=_0x23d374;if(this['actor']()['note'][_0x1b2a3b(0x189)](/<MENU (?:IMAGE|PORTRAIT) OFFSET X:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x1b2a3b(0x1d5)]()['note'][_0x1b2a3b(0x189)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);}return 0x0;},Game_Actor[_0x23d374(0x1d6)]['getMenuImageOffsetY']=function(){const _0xd4ff6d=_0x23d374;if(this[_0xd4ff6d(0x1d5)]()[_0xd4ff6d(0x227)][_0xd4ff6d(0x189)](/<MENU (?:IMAGE|PORTRAIT) OFFSET Y:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this['actor']()['note'][_0xd4ff6d(0x189)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$2']);}return 0x0;},Scene_MenuBase[_0x23d374(0x1d6)][_0x23d374(0x1f0)]=function(){const _0x2b5a71=_0x23d374;return VisuMZ['MainMenuCore'][_0x2b5a71(0x193)][_0x2b5a71(0x20e)][_0x2b5a71(0xf8)][_0x2b5a71(0x166)](this[_0x2b5a71(0x1e0)][_0x2b5a71(0x1b4)]);},VisuMZ[_0x23d374(0x1e8)][_0x23d374(0x136)]=Scene_MenuBase[_0x23d374(0x1d6)][_0x23d374(0x167)],Scene_MenuBase['prototype'][_0x23d374(0x167)]=function(){const _0x9764ea=_0x23d374;VisuMZ[_0x9764ea(0x1e8)][_0x9764ea(0x136)]['call'](this),this['createActorMenuBackgroundImageSprite']();},Scene_MenuBase[_0x23d374(0x1d6)][_0x23d374(0x100)]=function(){const _0x2d2828=_0x23d374;this[_0x2d2828(0x1b2)]=new Sprite_MenuBackgroundActor(),this['addChild'](this[_0x2d2828(0x1b2)]);},VisuMZ[_0x23d374(0x1e8)]['Scene_MenuBase_updateActor']=Scene_MenuBase[_0x23d374(0x1d6)][_0x23d374(0xf9)],Scene_MenuBase[_0x23d374(0x1d6)][_0x23d374(0xf9)]=function(){const _0x1ed428=_0x23d374;VisuMZ[_0x1ed428(0x1e8)][_0x1ed428(0x1ae)]['call'](this),this['isDisplayActorMenuBackgroundImage']()&&this['_actorMenuBgSprite']&&this['_actorMenuBgSprite'][_0x1ed428(0x1d4)](this[_0x1ed428(0x153)]);},VisuMZ[_0x23d374(0x1e8)][_0x23d374(0x17c)]=Scene_Menu['prototype']['create'],Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0x1d7)]=function(){const _0x43abb5=_0x23d374;VisuMZ[_0x43abb5(0x1e8)][_0x43abb5(0x17c)][_0x43abb5(0x1fd)](this),this[_0x43abb5(0xfe)](),this['createVariableWindow'](),this[_0x43abb5(0x1e3)]();},Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0x12f)]=function(){const _0x28e105=_0x23d374,_0x43e67e=this[_0x28e105(0x1d1)](),_0x189bdb=new Window_MenuCommand(_0x43e67e);_0x189bdb[_0x28e105(0x22a)](_0x28e105(0x107),this[_0x28e105(0x1e6)]['bind'](this)),this[_0x28e105(0x159)](_0x189bdb),this['_commandWindow']=_0x189bdb;},VisuMZ[_0x23d374(0x1e8)]['Scene_Menu_commandWindowRect']=Scene_Menu['prototype'][_0x23d374(0x1d1)],Scene_Menu['prototype'][_0x23d374(0x1d1)]=function(){const _0x5cbdee=_0x23d374,_0x2db8be=this[_0x5cbdee(0x146)]();if(_0x2db8be===_0x5cbdee(0x144))return this[_0x5cbdee(0x1bd)]();else{if(_0x2db8be==='thinTop')return this[_0x5cbdee(0x142)]();else{if(_0x2db8be===_0x5cbdee(0x180))return this[_0x5cbdee(0x104)]();else{if(_0x2db8be===_0x5cbdee(0x224))return this[_0x5cbdee(0x1c6)]();else{if(_0x2db8be==='mobile')return this['commandWindowRectMobileStyle']();else{const _0x6c3747=VisuMZ[_0x5cbdee(0x1e8)]['Scene_Menu_commandWindowRect'][_0x5cbdee(0x1fd)](this);return this['adjustDefaultCommandWindowRect'](_0x6c3747),_0x6c3747;}}}}}},Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0x1cd)]=function(_0x8f07f2){const _0x11c52f=_0x23d374;this[_0x11c52f(0x158)]()&&(_0x8f07f2[_0x11c52f(0x10a)]-=this['playtimeWindowRect']()['height']),this[_0x11c52f(0x208)]()&&(_0x8f07f2[_0x11c52f(0x10a)]-=this['variableWindowRect']()['height']);},Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0x1bd)]=function(){const _0x70616d=_0x23d374,_0x1a155a=VisuMZ['MainMenuCore']['Settings'][_0x70616d(0x1bf)][_0x70616d(0x191)],_0x2d9414=Graphics['boxWidth'],_0x4938a1=this[_0x70616d(0x1b6)](_0x1a155a,!![]),_0x13416a=0x0,_0x345e0c=this[_0x70616d(0x19f)]();return new Rectangle(_0x13416a,_0x345e0c,_0x2d9414,_0x4938a1);},Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0x142)]=function(){const _0x569894=_0x23d374,_0x1818c8=VisuMZ[_0x569894(0x1e8)]['Settings'][_0x569894(0x1bf)][_0x569894(0x191)],_0x30d29c=Graphics[_0x569894(0x200)],_0x209bf9=this[_0x569894(0x1b6)](0x1,!![]),_0x5250ef=0x0,_0x299393=this[_0x569894(0x19f)]();return new Rectangle(_0x5250ef,_0x299393,_0x30d29c,_0x209bf9);},Scene_Menu['prototype'][_0x23d374(0x104)]=function(){const _0xc490cd=_0x23d374,_0x545bef=VisuMZ[_0xc490cd(0x1e8)][_0xc490cd(0x193)][_0xc490cd(0x1bf)][_0xc490cd(0x191)],_0x46efbb=Graphics[_0xc490cd(0x200)],_0x2f6801=this[_0xc490cd(0x1b6)](_0x545bef,!![]),_0x3c5723=0x0,_0x53d1f9=this['mainAreaBottom']()-_0x2f6801;return new Rectangle(_0x3c5723,_0x53d1f9,_0x46efbb,_0x2f6801);},Scene_Menu['prototype'][_0x23d374(0x1c6)]=function(){const _0x131d84=_0x23d374,_0x5d3736=VisuMZ[_0x131d84(0x1e8)]['Settings'][_0x131d84(0x1bf)][_0x131d84(0x191)],_0x13a8bd=Graphics['boxWidth'],_0x27d719=this[_0x131d84(0x1b6)](0x1,!![]),_0x55f1b=0x0,_0x5b796d=this[_0x131d84(0x13f)]()-_0x27d719;return new Rectangle(_0x55f1b,_0x5b796d,_0x13a8bd,_0x27d719);},Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0x220)]=function(){const _0x3f36d2=_0x23d374,_0x12ea91=VisuMZ[_0x3f36d2(0x1e8)][_0x3f36d2(0x193)]['CustomCmdWin'][_0x3f36d2(0x191)],_0x597405=Graphics['boxWidth'],_0x3495b8=Window_MenuCommand['prototype'][_0x3f36d2(0x16a)](_0x12ea91),_0x452cca=0x0,_0x177ed5=Math['round']((Graphics[_0x3f36d2(0x1a8)]-_0x3495b8)/0x2);return new Rectangle(_0x452cca,_0x177ed5,_0x597405,_0x3495b8);},Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0x146)]=function(){const _0x22818a=_0x23d374;return VisuMZ[_0x22818a(0x1e8)][_0x22818a(0x193)]['CommandWindowStyle'];},Scene_Menu['prototype']['thinGoldWindow']=function(){const _0x3c7315=_0x23d374;if(this[_0x3c7315(0x146)]()!==_0x3c7315(0x1db))return!![];return VisuMZ[_0x3c7315(0x1e8)][_0x3c7315(0x193)]['General']['ThinGoldWindow'];},Scene_Menu['prototype'][_0x23d374(0x11c)]=function(){const _0x510552=_0x23d374,_0x47837d=this[_0x510552(0x13e)]();this[_0x510552(0x1a3)]=this['thinGoldWindow']()?new Window_ThinGold(_0x47837d):new Window_Gold(_0x47837d),this['addWindow'](this[_0x510552(0x1a3)]);},VisuMZ['MainMenuCore'][_0x23d374(0x1c3)]=Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0x13e)],Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0x13e)]=function(){const _0x5526a6=_0x23d374,_0x20482f=this[_0x5526a6(0x146)]();if([_0x5526a6(0x144),_0x5526a6(0x164),_0x5526a6(0xea)][_0x5526a6(0x166)](_0x20482f))return this[_0x5526a6(0x1c0)]();else{if([_0x5526a6(0x180),'thinBottom'][_0x5526a6(0x166)](_0x20482f))return this['goldWindowRectBottomStyle']();else{const _0xa11b60=VisuMZ[_0x5526a6(0x1e8)][_0x5526a6(0x1c3)][_0x5526a6(0x1fd)](this);return this[_0x5526a6(0x1ca)](_0xa11b60),_0xa11b60;}}},Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0x1ca)]=function(_0x4d6d00){const _0x3adebd=_0x23d374;if(this['thinGoldWindow']()){if(VisuMZ['MainMenuCore'][_0x3adebd(0x193)]['General'][_0x3adebd(0x17b)]){const _0x5d46ae=_0x4d6d00['height']-this['calcWindowHeight'](0x1,![]);_0x4d6d00['y']+=_0x5d46ae;}VisuMZ['MainMenuCore'][_0x3adebd(0x193)]['General'][_0x3adebd(0x141)]&&(_0x4d6d00['height']=this[_0x3adebd(0x1b6)](0x1,![]));}},Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0x1c0)]=function(){const _0x7e04a3=_0x23d374,_0x3f2155=this[_0x7e04a3(0x162)](),_0x692651=this[_0x7e04a3(0x1b6)](0x1,![]),_0x1ca81e=Graphics[_0x7e04a3(0x200)]-_0x3f2155,_0x33d799=this[_0x7e04a3(0x13f)]()-_0x692651;return new Rectangle(_0x1ca81e,_0x33d799,_0x3f2155,_0x692651);},Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0x14e)]=function(){const _0x2490dc=_0x23d374,_0x54bd30=this[_0x2490dc(0x162)](),_0x2ccdf6=this[_0x2490dc(0x1b6)](0x1,![]),_0x11cee2=Graphics[_0x2490dc(0x200)]-_0x54bd30,_0x25d53c=this[_0x2490dc(0x19f)]();return new Rectangle(_0x11cee2,_0x25d53c,_0x54bd30,_0x2ccdf6);},VisuMZ[_0x23d374(0x1e8)]['Scene_Menu_createStatusWindow']=Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0x16c)],Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0x16c)]=function(){const _0x36b731=_0x23d374;VisuMZ[_0x36b731(0x1e8)][_0x36b731(0x145)][_0x36b731(0x1fd)](this),this['adjustStatusWindowMobile']();},Scene_Menu[_0x23d374(0x1d6)]['adjustStatusWindowMobile']=function(){const _0x534478=_0x23d374;this['commandWindowStyle']()==='mobile'&&(this[_0x534478(0x181)][_0x534478(0x1f9)]=0x0);},VisuMZ[_0x23d374(0x1e8)][_0x23d374(0x143)]=Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0xe8)],Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0xe8)]=function(){const _0x5eef43=_0x23d374,_0x414d5c=this[_0x5eef43(0x146)]();if([_0x5eef43(0x144),_0x5eef43(0x164)][_0x5eef43(0x166)](_0x414d5c))return this[_0x5eef43(0x1bc)]();else{if(['bottom','thinBottom'][_0x5eef43(0x166)](_0x414d5c))return this[_0x5eef43(0x1e2)]();else return _0x414d5c===_0x5eef43(0xea)?this[_0x5eef43(0x228)]():VisuMZ[_0x5eef43(0x1e8)][_0x5eef43(0x143)][_0x5eef43(0x1fd)](this);}},Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0x1bc)]=function(){const _0xbf6e84=_0x23d374,_0xc334fc=Graphics[_0xbf6e84(0x200)],_0xa5eec1=this[_0xbf6e84(0x13d)]()-this[_0xbf6e84(0x119)][_0xbf6e84(0x10a)]-this[_0xbf6e84(0x1a3)][_0xbf6e84(0x10a)],_0x3c5d10=0x0,_0x3a5776=this[_0xbf6e84(0x119)]['y']+this[_0xbf6e84(0x119)][_0xbf6e84(0x10a)];return new Rectangle(_0x3c5d10,_0x3a5776,_0xc334fc,_0xa5eec1);},Scene_Menu['prototype'][_0x23d374(0x1e2)]=function(){const _0x4d5d51=_0x23d374,_0x3031d4=Graphics[_0x4d5d51(0x200)],_0x201d7d=this['mainAreaHeight']()-this[_0x4d5d51(0x119)][_0x4d5d51(0x10a)]-this[_0x4d5d51(0x1a3)][_0x4d5d51(0x10a)],_0x1ff303=0x0,_0x1cab7a=this[_0x4d5d51(0x1a3)]['y']+this['_goldWindow']['height'];return new Rectangle(_0x1ff303,_0x1cab7a,_0x3031d4,_0x201d7d);},Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0x228)]=function(){const _0x5b3c41=_0x23d374,_0x52ac6b=Graphics[_0x5b3c41(0x200)],_0x1220b4=this[_0x5b3c41(0x13d)]()-this[_0x5b3c41(0x1a3)]['height'],_0x47fd6d=0x0,_0x396680=this[_0x5b3c41(0x13f)]()-this[_0x5b3c41(0x1a3)][_0x5b3c41(0x10a)]-_0x1220b4;return new Rectangle(_0x47fd6d,_0x396680,_0x52ac6b,_0x1220b4);},Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0xfe)]=function(){const _0x159fad=_0x23d374;if(!this[_0x159fad(0x1f3)]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x4cfabc=this[_0x159fad(0x160)]();this[_0x159fad(0x17e)]=new Window_Playtime(_0x4cfabc),this[_0x159fad(0x17e)][_0x159fad(0x1ed)](VisuMZ[_0x159fad(0x1e8)][_0x159fad(0x193)][_0x159fad(0x229)][_0x159fad(0x137)]),this[_0x159fad(0x159)](this[_0x159fad(0x17e)]);},Scene_Menu['prototype'][_0x23d374(0x1f3)]=function(){const _0x3ac70b=_0x23d374;return VisuMZ[_0x3ac70b(0x1e8)][_0x3ac70b(0x193)][_0x3ac70b(0x229)][_0x3ac70b(0x124)];},Scene_Menu[_0x23d374(0x1d6)]['adjustCommandHeightByPlaytime']=function(){const _0x2a9521=_0x23d374;return this['canCreatePlaytimeWindow']()&&VisuMZ[_0x2a9521(0x1e8)]['Settings'][_0x2a9521(0x229)][_0x2a9521(0x148)];},Scene_Menu[_0x23d374(0x1d6)]['playtimeWindowRect']=function(){const _0x5b480f=_0x23d374,_0x350797=this[_0x5b480f(0x146)]();if([_0x5b480f(0x144),_0x5b480f(0x164),'mobile'][_0x5b480f(0x166)](_0x350797))return this['playtimeWindowRectTopStyle']();else return[_0x5b480f(0x180),_0x5b480f(0x224)]['includes'](_0x350797)?this['playtimeWindowRectBottomStyle']():VisuMZ[_0x5b480f(0x1e8)][_0x5b480f(0x193)][_0x5b480f(0x229)]['WindowRect'][_0x5b480f(0x1fd)](this);},Scene_Menu[_0x23d374(0x1d6)]['playtimeWindowRectTopStyle']=function(){const _0x5dec72=_0x23d374,_0x371e16=this[_0x5dec72(0x162)](),_0x19159e=this[_0x5dec72(0x1b6)](0x1,![]),_0x16b9c9=0x0,_0x11c610=this[_0x5dec72(0x13f)]()-_0x19159e;return new Rectangle(_0x16b9c9,_0x11c610,_0x371e16,_0x19159e);},Scene_Menu[_0x23d374(0x1d6)]['playtimeWindowRectBottomStyle']=function(){const _0x527004=_0x23d374,_0x4f528d=this[_0x527004(0x162)](),_0x42129a=this[_0x527004(0x1b6)](0x1,![]),_0x878de1=0x0,_0x194fb0=this[_0x527004(0x19f)]();return new Rectangle(_0x878de1,_0x194fb0,_0x4f528d,_0x42129a);},Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0x21b)]=function(){const _0x175cac=_0x23d374;if(!this[_0x175cac(0x201)]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x21a41f=this['variableWindowRect']();this[_0x175cac(0x1a7)]=new Window_MenuVariables(_0x21a41f),this[_0x175cac(0x1a7)][_0x175cac(0x1ed)](VisuMZ[_0x175cac(0x1e8)][_0x175cac(0x193)]['Variable'][_0x175cac(0x137)]),this[_0x175cac(0x159)](this['_variableWindow']);},Scene_Menu['prototype'][_0x23d374(0x201)]=function(){const _0x2cd7b5=_0x23d374;return VisuMZ[_0x2cd7b5(0x1e8)][_0x2cd7b5(0x193)][_0x2cd7b5(0x134)][_0x2cd7b5(0x124)];},Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0x208)]=function(){const _0x2591db=_0x23d374;return this[_0x2591db(0x201)]()&&VisuMZ[_0x2591db(0x1e8)]['Settings'][_0x2591db(0x134)]['AdjustCommandHeight'];},Scene_Menu['prototype'][_0x23d374(0x18f)]=function(){const _0x506aea=_0x23d374,_0x404502=this[_0x506aea(0x146)]();if(['top',_0x506aea(0x164),_0x506aea(0xea)][_0x506aea(0x166)](_0x404502))return this[_0x506aea(0x1c1)]();else return[_0x506aea(0x180),_0x506aea(0x224)][_0x506aea(0x166)](_0x404502)?this['variableWindowRectBottomStyle']():VisuMZ[_0x506aea(0x1e8)][_0x506aea(0x193)][_0x506aea(0x134)][_0x506aea(0x1fc)]['call'](this);},Scene_Menu['prototype'][_0x23d374(0x1c1)]=function(){const _0x1628eb=_0x23d374,_0x3193a2=Graphics[_0x1628eb(0x200)]-this[_0x1628eb(0x1a3)]['width']-(this[_0x1628eb(0x17e)]?this['_playtimeWindow'][_0x1628eb(0x1d0)]:0x0),_0x5bb3ea=this[_0x1628eb(0x1b6)](0x1,![]),_0x43be26=this[_0x1628eb(0x1a3)]['x']-_0x3193a2,_0x133f63=this[_0x1628eb(0x13f)]()-_0x5bb3ea;return new Rectangle(_0x43be26,_0x133f63,_0x3193a2,_0x5bb3ea);},Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0x165)]=function(){const _0x400579=_0x23d374,_0x6f9c4d=Graphics[_0x400579(0x200)]-this[_0x400579(0x1a3)]['width']-(this[_0x400579(0x17e)]?this[_0x400579(0x17e)][_0x400579(0x1d0)]:0x0),_0x3c36af=this[_0x400579(0x1b6)](0x1,![]),_0x4f1ee2=this[_0x400579(0x1a3)]['x']-_0x6f9c4d,_0x107e05=this[_0x400579(0x19f)]();return new Rectangle(_0x4f1ee2,_0x107e05,_0x6f9c4d,_0x3c36af);},Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0x1e3)]=function(){const _0x1a5865=_0x23d374;if(!this[_0x1a5865(0x22b)]())return;const _0x32e704=this[_0x1a5865(0x18f)]();this[_0x1a5865(0x1cc)]=new Window_Base(_0x32e704),this[_0x1a5865(0x1cc)][_0x1a5865(0x1ed)](VisuMZ[_0x1a5865(0x1e8)]['Settings'][_0x1a5865(0x134)]['BgType']),this['addWindow'](this[_0x1a5865(0x1cc)]);},Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0x22b)]=function(){const _0x1f8fe8=_0x23d374;if([_0x1f8fe8(0x1db),_0x1f8fe8(0xea)][_0x1f8fe8(0x166)](this[_0x1f8fe8(0x146)]()))return![];if(this[_0x1f8fe8(0x1a7)])return![];return!![];},VisuMZ['MainMenuCore'][_0x23d374(0x222)]=Scene_Menu['prototype'][_0x23d374(0x1d9)],Scene_Menu['prototype'][_0x23d374(0x1d9)]=function(){const _0x5d47e3=_0x23d374;if(this[_0x5d47e3(0x22e)]()&&this[_0x5d47e3(0x181)])$gameParty[_0x5d47e3(0x113)]($gameParty[_0x5d47e3(0x1f1)]()[0x0]),this[_0x5d47e3(0x154)]();else{if(this[_0x5d47e3(0x146)]()===_0x5d47e3(0xea))this['_statusWindow'][_0x5d47e3(0x111)]();VisuMZ['MainMenuCore']['Scene_Menu_commandPersonal'][_0x5d47e3(0x1fd)](this);}},Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0x22e)]=function(){const _0x56eec4=_0x23d374;return VisuMZ[_0x56eec4(0x1e8)][_0x56eec4(0x193)][_0x56eec4(0x20e)][_0x56eec4(0x1f2)]&&$gameParty['members']()['length']<=0x1;},Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0x154)]=function(){const _0x3b6584=_0x23d374,_0x407384=this[_0x3b6584(0x119)]['currentSymbol'](),_0x5aac86=this['_commandWindow'][_0x3b6584(0x17f)]();for(const _0x438f06 of Window_MenuCommand[_0x3b6584(0x155)]){if(_0x438f06['Symbol']===_0x407384){_0x438f06[_0x3b6584(0x203)][_0x3b6584(0x1fd)](this,_0x5aac86);return;}}},VisuMZ[_0x23d374(0x1e8)][_0x23d374(0x112)]=Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0x206)],Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0x206)]=function(){const _0x1bb26e=_0x23d374;VisuMZ[_0x1bb26e(0x1e8)][_0x1bb26e(0x112)]['call'](this);if(this[_0x1bb26e(0x146)]()==='mobile')this[_0x1bb26e(0x181)][_0x1bb26e(0xf0)]();},Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0x121)]=function(){const _0x853b4=_0x23d374,_0x122dbe=parseInt(this[_0x853b4(0x119)]['currentExt']());_0x122dbe?($gameTemp['reserveCommonEvent'](_0x122dbe),this[_0x853b4(0x1e6)]()):this[_0x853b4(0x119)][_0x853b4(0x198)]();},VisuMZ['MainMenuCore'][_0x23d374(0x21e)]=Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0x18c)],Scene_Menu[_0x23d374(0x1d6)][_0x23d374(0x18c)]=function(){const _0x5d8b9d=_0x23d374;VisuMZ[_0x5d8b9d(0x1e8)][_0x5d8b9d(0x21e)][_0x5d8b9d(0x1fd)](this);if(this[_0x5d8b9d(0x146)]()===_0x5d8b9d(0xea))this[_0x5d8b9d(0x181)][_0x5d8b9d(0x111)]();},VisuMZ['MainMenuCore'][_0x23d374(0x173)]=Scene_Menu[_0x23d374(0x1d6)]['onFormationCancel'],Scene_Menu[_0x23d374(0x1d6)]['onFormationCancel']=function(){const _0x29fd86=_0x23d374;VisuMZ[_0x29fd86(0x1e8)][_0x29fd86(0x173)][_0x29fd86(0x1fd)](this);if(this[_0x29fd86(0x146)]()===_0x29fd86(0xea))this[_0x29fd86(0x181)][_0x29fd86(0xf0)]();};function Sprite_MenuBackgroundActor(){const _0x40d8cb=_0x23d374;this[_0x40d8cb(0x211)](...arguments);}Sprite_MenuBackgroundActor[_0x23d374(0x1d6)]=Object[_0x23d374(0x1d7)](Sprite[_0x23d374(0x1d6)]),Sprite_MenuBackgroundActor[_0x23d374(0x1d6)][_0x23d374(0x1e0)]=Sprite_MenuBackgroundActor,Sprite_MenuBackgroundActor[_0x23d374(0x1d6)]['initialize']=function(){const _0x3a3f67=_0x23d374;this[_0x3a3f67(0x153)]=null,this[_0x3a3f67(0x188)]=![],Sprite[_0x3a3f67(0x1d6)][_0x3a3f67(0x211)]['call'](this),this['x']=Graphics[_0x3a3f67(0x1d0)];},Sprite_MenuBackgroundActor[_0x23d374(0x1d6)]['setActor']=function(_0x171241){const _0x2af1ca=_0x23d374;this[_0x2af1ca(0x153)]!==_0x171241&&(this[_0x2af1ca(0x153)]=_0x171241,this[_0x2af1ca(0x1ef)]());},Sprite_MenuBackgroundActor['prototype']['loadBitmap']=function(){const _0x408106=_0x23d374;this['_bitmapReady']=![],this['_actor']?(this[_0x408106(0x1d3)]=ImageManager[_0x408106(0x11e)](this[_0x408106(0x153)][_0x408106(0x1b1)]()),this['bitmap'][_0x408106(0x133)](this[_0x408106(0xe9)][_0x408106(0xf5)](this))):this[_0x408106(0x1d3)]=new Bitmap(0x1,0x1);},Sprite_MenuBackgroundActor[_0x23d374(0x1d6)][_0x23d374(0xe9)]=function(){const _0x17e9ef=_0x23d374;this[_0x17e9ef(0x188)]=!![],VisuMZ[_0x17e9ef(0x1e8)]['Settings'][_0x17e9ef(0x20e)]['ActorBgMenuJS'][_0x17e9ef(0x1fd)](this);},Sprite_MenuBackgroundActor[_0x23d374(0x1d6)][_0x23d374(0x169)]=function(){const _0x5983db=_0x23d374;Sprite[_0x5983db(0x1d6)][_0x5983db(0x169)]['call'](this),this['_bitmapReady']&&(this[_0x5983db(0x1e9)](),this['updatePosition'](),this[_0x5983db(0x18a)]());},Sprite_MenuBackgroundActor[_0x23d374(0x1d6)][_0x23d374(0x1e9)]=function(){const _0x454452=_0x23d374;if(this[_0x454452(0x18e)]>0x0){const _0x75c546=this[_0x454452(0x18e)];this['opacity']=(this[_0x454452(0x221)]*(_0x75c546-0x1)+0xff)/_0x75c546;}},Sprite_MenuBackgroundActor[_0x23d374(0x1d6)][_0x23d374(0x186)]=function(){const _0x5eab2c=_0x23d374;if(this[_0x5eab2c(0x18e)]>0x0){const _0x4c23e4=this[_0x5eab2c(0x18e)];this['x']=(this['x']*(_0x4c23e4-0x1)+this[_0x5eab2c(0x178)])/_0x4c23e4,this['y']=(this['y']*(_0x4c23e4-0x1)+this[_0x5eab2c(0x1de)])/_0x4c23e4;}},Sprite_MenuBackgroundActor['prototype'][_0x23d374(0x18a)]=function(){const _0x31bbde=_0x23d374;if(this[_0x31bbde(0x18e)]>0x0)this['_duration']--;},ImageManager[_0x23d374(0x12c)]=ImageManager[_0x23d374(0x12c)]||0x9,ImageManager[_0x23d374(0x117)]=ImageManager[_0x23d374(0x117)]||0x6,Window_Base[_0x23d374(0x1d6)][_0x23d374(0x1a4)]=function(_0x51e597,_0x1d1ba9,_0x581f3b){const _0x1fc30f=_0x23d374,_0x3e3f60=ImageManager[_0x1fc30f(0x1a9)](_0x51e597),_0x554554=_0x3e3f60[_0x1fc30f(0x1d0)]/ImageManager['svActorHorzCells'],_0x42c296=_0x3e3f60['height']/ImageManager[_0x1fc30f(0x117)],_0x5f0203=0x0,_0xb668e1=0x0;this[_0x1fc30f(0x1f5)]['blt'](_0x3e3f60,_0x5f0203,_0xb668e1,_0x554554,_0x42c296,_0x1d1ba9-_0x554554/0x2,_0x581f3b-_0x42c296);},Window_MenuCommand[_0x23d374(0x155)]=VisuMZ[_0x23d374(0x1e8)]['Settings'][_0x23d374(0x22f)],VisuMZ[_0x23d374(0x1e8)][_0x23d374(0x13b)]=Window_MenuCommand['prototype'][_0x23d374(0x211)],Window_MenuCommand[_0x23d374(0x1d6)][_0x23d374(0x211)]=function(_0x34489b){const _0x54c937=_0x23d374;VisuMZ[_0x54c937(0x1e8)][_0x54c937(0x13b)][_0x54c937(0x1fd)](this,_0x34489b),this[_0x54c937(0x225)](_0x34489b);},Window_MenuCommand[_0x23d374(0x1d6)][_0x23d374(0x225)]=function(_0x5678b4){const _0x3c28f8=_0x23d374,_0x40a5b6=new Rectangle(0x0,0x0,_0x5678b4[_0x3c28f8(0x1d0)],_0x5678b4[_0x3c28f8(0x10a)]);this[_0x3c28f8(0x16f)]=new Window_Base(_0x40a5b6),this[_0x3c28f8(0x16f)][_0x3c28f8(0x221)]=0x0,this[_0x3c28f8(0x11b)](this[_0x3c28f8(0x16f)]),this[_0x3c28f8(0x129)]();},Window_MenuCommand[_0x23d374(0x1d6)][_0x23d374(0x20f)]=function(){const _0x436769=_0x23d374;Window_HorzCommand[_0x436769(0x1d6)][_0x436769(0x20f)]['call'](this);if(this[_0x436769(0x16f)])this['updateCommandNameWindow']();},Window_MenuCommand[_0x23d374(0x1d6)][_0x23d374(0x129)]=function(){const _0x5c592d=_0x23d374,_0x2369ad=this[_0x5c592d(0x16f)];_0x2369ad['contents'][_0x5c592d(0x127)]();const _0x560da1=this[_0x5c592d(0xe7)](this[_0x5c592d(0x1cb)]());if(_0x560da1===_0x5c592d(0x10d)){const _0x23c184=this[_0x5c592d(0x1b0)](this[_0x5c592d(0x1cb)]());let _0x3ff2f7=this['commandName'](this['index']());_0x3ff2f7=_0x3ff2f7[_0x5c592d(0x183)](/\\I\[(\d+)\]/gi,''),_0x2369ad[_0x5c592d(0x114)](),this[_0x5c592d(0x19a)](_0x3ff2f7,_0x23c184),this[_0x5c592d(0x170)](_0x3ff2f7,_0x23c184),this[_0x5c592d(0x209)](_0x3ff2f7,_0x23c184);}},Window_MenuCommand[_0x23d374(0x1d6)][_0x23d374(0x19a)]=function(_0x47809c,_0xd19046){},Window_MenuCommand[_0x23d374(0x1d6)]['commandNameWindowDrawText']=function(_0x1ef6a2,_0x43489a){const _0x557ba8=_0x23d374,_0x29902c=this[_0x557ba8(0x16f)];_0x29902c[_0x557ba8(0x195)](_0x1ef6a2,0x0,_0x43489a['y'],_0x29902c['innerWidth'],'center');},Window_MenuCommand[_0x23d374(0x1d6)]['commandNameWindowCenter']=function(_0x38140e,_0x216132){const _0x22ace2=_0x23d374,_0x9ad413=this['_commandNameWindow'],_0x4fc588=$gameSystem[_0x22ace2(0x1c7)](),_0x2a130b=_0x216132['x']+Math[_0x22ace2(0x192)](_0x216132[_0x22ace2(0x1d0)]/0x2)+_0x4fc588;_0x9ad413['x']=_0x9ad413['width']/-0x2+_0x2a130b,_0x9ad413['y']=Math['floor'](_0x216132['height']/0x4);},Window_MenuCommand['prototype'][_0x23d374(0x108)]=function(){const _0xf56f36=_0x23d374,_0xe388e8=SceneManager[_0xf56f36(0x184)][_0xf56f36(0x146)]();if(_0xe388e8==='mobile'){const _0x1c91bf=VisuMZ['MainMenuCore'][_0xf56f36(0x193)][_0xf56f36(0x1bf)][_0xf56f36(0x1ce)];return this['lineHeight']()*_0x1c91bf+0x8;}else return Window_Command[_0xf56f36(0x1d6)][_0xf56f36(0x108)][_0xf56f36(0x1fd)](this);},Window_MenuCommand[_0x23d374(0x1d6)][_0x23d374(0x218)]=function(){this['makeMainMenuCoreCommandList']();},Window_MenuCommand[_0x23d374(0x1d6)]['makeMainMenuCoreCommandList']=function(){const _0x5b34de=_0x23d374;for(const _0x133ea9 of Window_MenuCommand[_0x5b34de(0x155)]){const _0x2c908a=_0x133ea9[_0x5b34de(0x171)];if(_0x133ea9[_0x5b34de(0x157)][_0x5b34de(0x1fd)](this)){let _0x1be62e=_0x133ea9[_0x5b34de(0xf4)];if(['',_0x5b34de(0x1ba)]['includes'](_0x1be62e))_0x1be62e=_0x133ea9[_0x5b34de(0xf3)][_0x5b34de(0x1fd)](this);const _0x39901a=_0x133ea9[_0x5b34de(0x120)];_0x39901a>0x0&&this[_0x5b34de(0x12b)]()!=='text'&&(_0x1be62e='\x5cI[%1]%2'[_0x5b34de(0x22d)](_0x39901a,_0x1be62e));const _0x3867cd=_0x133ea9[_0x5b34de(0x19e)][_0x5b34de(0x1fd)](this),_0x5afbfb=_0x133ea9[_0x5b34de(0x185)][_0x5b34de(0x1fd)](this);this[_0x5b34de(0x1c4)](_0x1be62e,_0x2c908a,_0x3867cd,_0x5afbfb),this[_0x5b34de(0x22a)](_0x2c908a,_0x133ea9[_0x5b34de(0x1da)][_0x5b34de(0xf5)](this,_0x5afbfb));}this['addSymbolBridge'](_0x2c908a);}},Window_MenuCommand['prototype'][_0x23d374(0x1b8)]=function(_0x54d0c6){const _0x458214=_0x23d374;switch(_0x54d0c6){case'item':this['addMainCommands']();break;case'formation':this[_0x458214(0x172)](),this['addOriginalCommands']();break;case'options':this[_0x458214(0x15b)]();break;case _0x458214(0x131):this[_0x458214(0x17d)]();break;case'gameEnd':this[_0x458214(0x13a)]();break;}},Window_MenuCommand[_0x23d374(0x1d6)][_0x23d374(0x1fa)]=function(){},Window_MenuCommand[_0x23d374(0x1d6)][_0x23d374(0x172)]=function(){},Window_MenuCommand[_0x23d374(0x1d6)][_0x23d374(0x168)]=function(){},Window_MenuCommand['prototype'][_0x23d374(0x15b)]=function(){},Window_MenuCommand[_0x23d374(0x1d6)][_0x23d374(0x17d)]=function(){},Window_MenuCommand[_0x23d374(0x1d6)][_0x23d374(0x13a)]=function(){},Window_MenuCommand[_0x23d374(0x1d6)][_0x23d374(0xfb)]=function(){const _0x9f7687=_0x23d374,_0x5245a7=SceneManager['_scene'][_0x9f7687(0x146)]();if(['thinTop',_0x9f7687(0x224)][_0x9f7687(0x166)](_0x5245a7))return this[_0x9f7687(0x179)]?this[_0x9f7687(0x226)]():0x4;else return _0x5245a7!==_0x9f7687(0x1db)?VisuMZ['MainMenuCore']['Settings'][_0x9f7687(0x1bf)][_0x9f7687(0x14b)]:Window_Command['prototype'][_0x9f7687(0xfb)][_0x9f7687(0x1fd)](this);},Window_MenuCommand[_0x23d374(0x1d6)]['itemTextAlign']=function(){const _0x12beca=_0x23d374;return VisuMZ[_0x12beca(0x1e8)][_0x12beca(0x193)][_0x12beca(0x1bf)][_0x12beca(0x199)];},Window_MenuCommand[_0x23d374(0x1d6)][_0x23d374(0x196)]=function(_0x238ed7){const _0x6c1dc3=_0x23d374,_0x2a6d62=this['commandStyleCheck'](_0x238ed7);if(_0x2a6d62===_0x6c1dc3(0x1ac))this[_0x6c1dc3(0x1b9)](_0x238ed7);else _0x2a6d62===_0x6c1dc3(0x10d)?this[_0x6c1dc3(0x1ad)](_0x238ed7):Window_Command[_0x6c1dc3(0x1d6)][_0x6c1dc3(0x196)][_0x6c1dc3(0x1fd)](this,_0x238ed7);},Window_MenuCommand[_0x23d374(0x1d6)][_0x23d374(0x12b)]=function(){const _0x572e27=_0x23d374;return VisuMZ[_0x572e27(0x1e8)][_0x572e27(0x193)][_0x572e27(0x1bf)][_0x572e27(0xed)];},Window_MenuCommand['prototype']['commandStyleCheck']=function(_0x5c6f6a){const _0x1999d9=_0x23d374,_0x5acb31=this[_0x1999d9(0x12b)]();if(_0x5acb31!==_0x1999d9(0x1ab))return _0x5acb31;else{const _0x393074=this[_0x1999d9(0x115)](_0x5c6f6a);if(_0x393074[_0x1999d9(0x189)](/\\I\[(\d+)\]/i)){const _0x2c896a=this[_0x1999d9(0x1b0)](_0x5c6f6a),_0x2a4b49=this[_0x1999d9(0xfd)](_0x393074)['width'];return _0x2a4b49<=_0x2c896a[_0x1999d9(0x1d0)]?_0x1999d9(0x1ac):_0x1999d9(0x10d);}else return _0x1999d9(0x139);}},Window_MenuCommand[_0x23d374(0x1d6)][_0x23d374(0x1b9)]=function(_0x82634c){const _0x5f4bd0=_0x23d374,_0xd2f882=this[_0x5f4bd0(0x1b0)](_0x82634c),_0x4b486c=this[_0x5f4bd0(0x115)](_0x82634c),_0x264388=this[_0x5f4bd0(0xfd)](_0x4b486c)[_0x5f4bd0(0x1d0)];this[_0x5f4bd0(0x223)](this['isCommandEnabled'](_0x82634c));let _0x2f7134=this['itemTextAlign']();if(_0x2f7134===_0x5f4bd0(0x216))this[_0x5f4bd0(0x16b)](_0x4b486c,_0xd2f882['x']+_0xd2f882['width']-_0x264388,_0xd2f882['y'],_0x264388);else{if(_0x2f7134===_0x5f4bd0(0x187)){const _0x3f477d=_0xd2f882['x']+Math['floor']((_0xd2f882[_0x5f4bd0(0x1d0)]-_0x264388)/0x2);this[_0x5f4bd0(0x16b)](_0x4b486c,_0x3f477d,_0xd2f882['y'],_0x264388);}else this['drawTextEx'](_0x4b486c,_0xd2f882['x'],_0xd2f882['y'],_0x264388);}},Window_MenuCommand[_0x23d374(0x1d6)][_0x23d374(0x1ad)]=function(_0x3a8a77){const _0x4ef2a4=_0x23d374;this[_0x4ef2a4(0x115)](_0x3a8a77)['match'](/\\I\[(\d+)\]/i);const _0x27f698=Number(RegExp['$1']),_0x3c89c1=this['itemLineRect'](_0x3a8a77),_0x42c24b=_0x3c89c1['x']+Math[_0x4ef2a4(0x192)]((_0x3c89c1[_0x4ef2a4(0x1d0)]-ImageManager[_0x4ef2a4(0x110)])/0x2),_0x35a2ff=_0x3c89c1['y']+(_0x3c89c1[_0x4ef2a4(0x10a)]-ImageManager[_0x4ef2a4(0x140)])/0x2;this[_0x4ef2a4(0x197)](_0x27f698,_0x42c24b,_0x35a2ff);},VisuMZ[_0x23d374(0x1e8)][_0x23d374(0x149)]=Window_StatusBase[_0x23d374(0x1d6)][_0x23d374(0x12d)],Window_StatusBase[_0x23d374(0x1d6)][_0x23d374(0x12d)]=function(){const _0x1c5f52=_0x23d374;VisuMZ[_0x1c5f52(0x1e8)][_0x1c5f52(0x149)][_0x1c5f52(0x1fd)](this),this[_0x1c5f52(0x1a6)]();},Window_StatusBase[_0x23d374(0x1d6)][_0x23d374(0x1a6)]=function(){const _0x8d4717=_0x23d374;for(const _0x4d25e5 of $gameParty[_0x8d4717(0x1f1)]()){if(!_0x4d25e5)continue;_0x4d25e5[_0x8d4717(0x116)]()&&ImageManager[_0x8d4717(0x177)](_0x4d25e5['characterName']()),_0x4d25e5['battlerName']()&&ImageManager[_0x8d4717(0x1a9)](_0x4d25e5[_0x8d4717(0x1fe)]()),_0x4d25e5[_0x8d4717(0x1b1)]()&&ImageManager[_0x8d4717(0x11e)](_0x4d25e5[_0x8d4717(0x1b1)]());}},Window_StatusBase[_0x23d374(0x1d6)][_0x23d374(0xeb)]=function(){const _0x48af84=_0x23d374;return VisuMZ['MainMenuCore']['Settings'][_0x48af84(0x1ea)];},Window_StatusBase['prototype'][_0x23d374(0x175)]=function(_0x9ba2d3,_0x1ff123,_0x321123,_0x56c952,_0x40143a){const _0x16960a=_0x23d374;_0x56c952=_0x56c952||ImageManager[_0x16960a(0x1e5)],_0x40143a=_0x40143a||ImageManager[_0x16960a(0x10b)];const _0x308468=ImageManager[_0x16960a(0x1e5)],_0x54e35c=_0x40143a-0x2,_0x13ec2a=_0x1ff123+Math[_0x16960a(0x192)]((_0x56c952-_0x308468)/0x2);this[_0x16960a(0x1e0)]===Window_MenuStatus&&this[_0x16960a(0x223)](_0x9ba2d3[_0x16960a(0xef)]()),this['drawActorFace'](_0x9ba2d3,_0x13ec2a,_0x321123,_0x308468,_0x54e35c),this[_0x16960a(0x223)](!![]);},Window_StatusBase['prototype'][_0x23d374(0xee)]=function(_0x179980,_0x150565,_0x2fed61,_0xba8dc9,_0x1b51b9){const _0x3cde14=_0x23d374;_0xba8dc9=_0xba8dc9||ImageManager['faceWidth'],_0x1b51b9=_0x1b51b9||ImageManager[_0x3cde14(0x10b)];const _0x287e0a=_0x179980[_0x3cde14(0x116)](),_0x5d0c85=_0x179980['characterIndex'](),_0x4a8339=ImageManager['loadCharacter'](_0x287e0a),_0x1bca1c=ImageManager[_0x3cde14(0x1e4)](_0x287e0a),_0x56a7ad=_0x4a8339[_0x3cde14(0x1d0)]/(_0x1bca1c?0x3:0xc),_0x4400d6=_0x4a8339[_0x3cde14(0x10a)]/(_0x1bca1c?0x4:0x8),_0x30f1dd=_0xba8dc9,_0x150bb5=_0x1b51b9-0x2,_0xd090e2=_0x150565+Math[_0x3cde14(0x192)](_0x30f1dd/0x2),_0x17a31d=_0x2fed61+Math[_0x3cde14(0x18b)]((_0x1b51b9+_0x4400d6)/0x2);this['constructor']===Window_MenuStatus&&this[_0x3cde14(0x223)](_0x179980['isBattleMember']());const _0x4dd31b=Math[_0x3cde14(0xf6)](_0xba8dc9,_0x56a7ad),_0x4e90a5=Math[_0x3cde14(0xf6)](_0x1b51b9,_0x4400d6),_0x3eb1ca=Math[_0x3cde14(0x192)](_0x150565+Math[_0x3cde14(0x1d2)](_0xba8dc9-_0x56a7ad,0x0)/0x2),_0x52036e=Math['floor'](_0x2fed61+Math[_0x3cde14(0x1d2)](_0x1b51b9-_0x4400d6,0x0)/0x2),_0x18b5ce=_0x1bca1c?0x0:_0x5d0c85,_0xd2c91d=(_0x18b5ce%0x4*0x3+0x1)*_0x56a7ad,_0xae40a5=Math['floor'](_0x18b5ce/0x4)*0x4*_0x4400d6;this[_0x3cde14(0x1f5)]['blt'](_0x4a8339,_0xd2c91d,_0xae40a5,_0x4dd31b,_0x4e90a5,_0x3eb1ca,_0x52036e),this['changePaintOpacity'](!![]);},Window_StatusBase[_0x23d374(0x1d6)][_0x23d374(0x20b)]=function(_0x10409a,_0x17b47b,_0x27291c,_0x52a1d5,_0x4c0799){const _0x3e0280=_0x23d374;_0x52a1d5=_0x52a1d5||ImageManager[_0x3e0280(0x1e5)],_0x4c0799=_0x4c0799||ImageManager[_0x3e0280(0x10b)];const _0x43b6a7=ImageManager['loadSvActor'](_0x10409a[_0x3e0280(0x1fe)]()),_0x3cd1f8=_0x43b6a7['width']/ImageManager[_0x3e0280(0x12c)],_0x429978=_0x43b6a7['height']/ImageManager[_0x3e0280(0x117)],_0x59fe12=_0x52a1d5,_0x1288de=_0x4c0799-0x2,_0x31b8d8=_0x17b47b+Math[_0x3e0280(0x192)](_0x59fe12/0x2),_0x5c4e4a=_0x27291c+Math['ceil']((_0x4c0799+_0x429978)/0x2);this[_0x3e0280(0x1e0)]===Window_MenuStatus&&this[_0x3e0280(0x223)](_0x10409a[_0x3e0280(0xef)]());const _0x4dbbde=Math['min'](_0x52a1d5,_0x3cd1f8),_0x2d6323=Math['min'](_0x4c0799,_0x429978),_0xdd8dd2=Math[_0x3e0280(0x192)](_0x17b47b+Math[_0x3e0280(0x1d2)](_0x52a1d5-_0x3cd1f8,0x0)/0x2),_0x103cf6=Math['floor'](_0x27291c+Math['max'](_0x4c0799-_0x429978,0x0)/0x2),_0x3e9ce6=0x0,_0x3049be=0x0;this[_0x3e0280(0x1f5)][_0x3e0280(0x20d)](_0x43b6a7,_0x3e9ce6,_0x3049be,_0x4dbbde,_0x2d6323,_0xdd8dd2,_0x103cf6),this['changePaintOpacity'](!![]);},Window_StatusBase['prototype'][_0x23d374(0x152)]=function(_0x788afa,_0x5a7267,_0x2977a6,_0x3c3129,_0x15b8a6){const _0x1d7490=_0x23d374,_0xffff6a=ImageManager[_0x1d7490(0x11e)](_0x788afa[_0x1d7490(0x1b1)]());_0x3c3129=(_0x3c3129||ImageManager['faceWidth'])-0x2,_0x15b8a6=(_0x15b8a6||ImageManager[_0x1d7490(0x10b)])-0x2;const _0x4513f0=_0xffff6a[_0x1d7490(0x1d0)],_0x4bf0f2=_0xffff6a[_0x1d7490(0x10a)],_0x4b7b71=_0x3c3129,_0x3c8729=_0x15b8a6-0x2,_0x3d8f45=_0x5a7267+Math[_0x1d7490(0x192)](_0x4b7b71/0x2),_0x59a483=_0x2977a6+Math[_0x1d7490(0x18b)]((_0x15b8a6+_0x4bf0f2)/0x2);this['constructor']===Window_MenuStatus&&this[_0x1d7490(0x223)](_0x788afa[_0x1d7490(0xef)]());const _0x23f9c0=Math[_0x1d7490(0xf6)](_0x3c3129,_0x4513f0),_0x4712cd=Math[_0x1d7490(0xf6)](_0x15b8a6,_0x4bf0f2),_0x29716e=_0x5a7267+0x1,_0x139ae2=Math[_0x1d7490(0x1d2)](_0x2977a6+0x1,_0x2977a6+_0x3c8729-_0x4bf0f2+0x3);let _0x2c7daf=(_0x4513f0-_0x23f9c0)/0x2,_0x5af936=(_0x4bf0f2-_0x4712cd)/0x2;_0x2c7daf-=_0x788afa[_0x1d7490(0x210)](),_0x5af936-=_0x788afa[_0x1d7490(0x182)](),this[_0x1d7490(0x1f5)][_0x1d7490(0x20d)](_0xffff6a,_0x2c7daf,_0x5af936,_0x23f9c0,_0x4712cd,_0x29716e,_0x139ae2),this[_0x1d7490(0x223)](!![]);},VisuMZ[_0x23d374(0x1e8)][_0x23d374(0x18d)]=Window_MenuStatus[_0x23d374(0x1d6)][_0x23d374(0x19c)],Window_MenuStatus[_0x23d374(0x1d6)]['selectLast']=function(){const _0x4b2cb4=_0x23d374;VisuMZ[_0x4b2cb4(0x1e8)][_0x4b2cb4(0x193)][_0x4b2cb4(0x20e)][_0x4b2cb4(0x1cf)]?VisuMZ[_0x4b2cb4(0x1e8)][_0x4b2cb4(0x18d)][_0x4b2cb4(0x1fd)](this):this[_0x4b2cb4(0x163)](0x0);},VisuMZ[_0x23d374(0x1e8)][_0x23d374(0x21f)]=Window_MenuStatus[_0x23d374(0x1d6)][_0x23d374(0x226)],Window_MenuStatus[_0x23d374(0x1d6)][_0x23d374(0x226)]=function(){const _0x119196=_0x23d374;return this[_0x119196(0x1ec)]()?$gameParty[_0x119196(0x19b)]()[_0x119196(0x1f7)]:VisuMZ['MainMenuCore'][_0x119196(0x21f)][_0x119196(0x1fd)](this);},Window_MenuStatus[_0x23d374(0x1d6)][_0x23d374(0x1ec)]=function(){const _0x1457ab=_0x23d374,_0x2ae6a1=VisuMZ['MainMenuCore'][_0x1457ab(0x193)]['General'];if(_0x2ae6a1[_0x1457ab(0x15d)]===undefined)_0x2ae6a1['ShowReserve']=!![];const _0x4f4a09=SceneManager[_0x1457ab(0x184)];if(!_0x2ae6a1['ShowReserve']){if(_0x2ae6a1[_0x1457ab(0x205)])return _0x4f4a09[_0x1457ab(0x1e0)]===Scene_Menu;return!![];}return![];},Window_MenuStatus['prototype']['listStyle']=function(){const _0x24399d=_0x23d374,_0x17a35b=SceneManager['_scene'][_0x24399d(0x1e0)];return _0x17a35b===Scene_Menu?VisuMZ[_0x24399d(0x1e8)][_0x24399d(0x193)][_0x24399d(0xfa)]:VisuMZ[_0x24399d(0x1e8)][_0x24399d(0x193)][_0x24399d(0x21d)];},Window_MenuStatus[_0x23d374(0x1d6)][_0x23d374(0x204)]=function(){const _0x49c4d0=_0x23d374,_0x2d03fe=this[_0x49c4d0(0x13c)]();switch(_0x2d03fe){case'vertical':case _0x49c4d0(0x10c):return 0x1;case _0x49c4d0(0x126):return 0x1;default:return $gameParty[_0x49c4d0(0x176)]();}},Window_MenuStatus[_0x23d374(0x1d6)][_0x23d374(0xfb)]=function(){const _0x5ab8a5=_0x23d374,_0x405cce=this[_0x5ab8a5(0x13c)]();switch(_0x405cce){case _0x5ab8a5(0x1ff):case _0x5ab8a5(0x10c):return $gameParty[_0x5ab8a5(0x176)]();default:return 0x1;}},VisuMZ['MainMenuCore'][_0x23d374(0x12e)]=Window_MenuStatus[_0x23d374(0x1d6)][_0x23d374(0x108)],Window_MenuStatus[_0x23d374(0x1d6)][_0x23d374(0x108)]=function(){const _0x38db5c=_0x23d374,_0x305f58=this[_0x38db5c(0x13c)]();switch(_0x305f58){case _0x38db5c(0x1ff):case _0x38db5c(0x10c):case _0x38db5c(0x126):return this['innerHeight'];case'thin':return Window_Selectable[_0x38db5c(0x1d6)][_0x38db5c(0x108)][_0x38db5c(0x1fd)](this);case _0x38db5c(0x174):return this[_0x38db5c(0x1eb)]()*0x2+0x8;default:return VisuMZ['MainMenuCore']['Window_MenuStatus_itemHeight']['call'](this);}},Window_MenuStatus[_0x23d374(0x1d6)][_0x23d374(0x196)]=function(_0x34032b){const _0x1f0262=_0x23d374;this[_0x1f0262(0x151)](_0x34032b),this[_0x1f0262(0x1c2)](_0x34032b);},VisuMZ[_0x23d374(0x1e8)][_0x23d374(0x161)]=Window_MenuStatus['prototype']['drawItemImage'],Window_MenuStatus[_0x23d374(0x1d6)][_0x23d374(0x1f6)]=function(_0x7b4450,_0xc7b7a6,_0xd78f30,_0x258eb3,_0x5cfadf){const _0x2b81f6=_0x23d374;switch(this[_0x2b81f6(0xeb)]()){case _0x2b81f6(0x10f):break;case _0x2b81f6(0x1a2):this[_0x2b81f6(0xee)](_0x7b4450,_0xc7b7a6,_0xd78f30+0x1,_0x258eb3,_0x5cfadf-0x2);break;case _0x2b81f6(0xec):this[_0x2b81f6(0x20b)](_0x7b4450,_0xc7b7a6,_0xd78f30+0x1,_0x258eb3,_0x5cfadf-0x2);break;default:this[_0x2b81f6(0x175)](_0x7b4450,_0xc7b7a6,_0xd78f30,_0x258eb3,_0x5cfadf);break;}},Window_MenuStatus[_0x23d374(0x1d6)]['drawItemStatus']=function(_0x3d5f3c){const _0x45cccd=_0x23d374;this[_0x45cccd(0x114)]();const _0x4c56a9=this[_0x45cccd(0x1d5)](_0x3d5f3c),_0x39f6f2=this[_0x45cccd(0xff)](_0x3d5f3c),_0x18a001=this[_0x45cccd(0x13c)]();switch(_0x18a001){case _0x45cccd(0x1ff):this['drawItemStatusVerticalStyle'](_0x4c56a9,_0x39f6f2);break;case'portrait':this['drawItemStatusPortraitStyle'](_0x4c56a9,_0x39f6f2);break;case _0x45cccd(0x126):this[_0x45cccd(0x207)](_0x4c56a9,_0x39f6f2);break;case'thin':this['drawItemStatusThinStyle'](_0x4c56a9,_0x39f6f2);break;case _0x45cccd(0x174):this[_0x45cccd(0x1f4)](_0x4c56a9,_0x39f6f2);break;default:this[_0x45cccd(0x11f)](_0x4c56a9,_0x39f6f2);break;}},Window_MenuStatus[_0x23d374(0x1d6)][_0x23d374(0x1be)]=function(_0x1f9c12,_0x14901b){const _0x2e1724=_0x23d374;VisuMZ[_0x2e1724(0x1e8)][_0x2e1724(0x193)][_0x2e1724(0x1b5)][_0x2e1724(0x17a)]['call'](this,_0x1f9c12,_0x14901b);},Window_MenuStatus[_0x23d374(0x1d6)]['drawItemStatusPortraitStyle']=function(_0x4b6ea2,_0x23e01c){const _0x52efe2=_0x23d374;if(_0x4b6ea2[_0x52efe2(0x1b1)]()!==''){const _0x6a56ce=ImageManager[_0x52efe2(0x11e)](_0x4b6ea2[_0x52efe2(0x1b1)]());_0x6a56ce[_0x52efe2(0x133)](this[_0x52efe2(0x101)][_0x52efe2(0xf5)](this,_0x4b6ea2,_0x23e01c));}else this['drawItemStatusVerticalStyle'](_0x4b6ea2,_0x23e01c);},Window_MenuStatus[_0x23d374(0x1d6)]['drawItemStatusPortraitStyleOnLoad']=function(_0x49d5b1,_0x410691){const _0x4dba08=_0x23d374;VisuMZ['MainMenuCore'][_0x4dba08(0x193)][_0x4dba08(0x1b5)]['PortraitStyle']['call'](this,_0x49d5b1,_0x410691);},Window_MenuStatus[_0x23d374(0x1d6)][_0x23d374(0x207)]=function(_0xa04ed2,_0x454ada){const _0x46b901=_0x23d374,_0x464076=ImageManager['loadPicture'](_0xa04ed2[_0x46b901(0x1b1)]());_0x464076[_0x46b901(0x133)](this[_0x46b901(0x219)][_0x46b901(0xf5)](this,_0xa04ed2,_0x454ada));},Window_MenuStatus[_0x23d374(0x1d6)][_0x23d374(0x219)]=function(_0x2ce658,_0x23233a){const _0x49e188=_0x23d374;VisuMZ[_0x49e188(0x1e8)][_0x49e188(0x193)][_0x49e188(0x1b5)]['SoloStyle'][_0x49e188(0x1fd)](this,_0x2ce658,_0x23233a);},Window_MenuStatus[_0x23d374(0x1d6)][_0x23d374(0x1d8)]=function(_0x5bcd8f,_0x9cd896){const _0x86d399=_0x23d374;VisuMZ[_0x86d399(0x1e8)]['Settings'][_0x86d399(0x1b5)][_0x86d399(0x1a5)][_0x86d399(0x1fd)](this,_0x5bcd8f,_0x9cd896);},Window_MenuStatus[_0x23d374(0x1d6)]['drawItemStatusThickerStyle']=function(_0x12d3bb,_0x4ef499){const _0x2195e4=_0x23d374;VisuMZ[_0x2195e4(0x1e8)][_0x2195e4(0x193)][_0x2195e4(0x1b5)][_0x2195e4(0x102)][_0x2195e4(0x1fd)](this,_0x12d3bb,_0x4ef499);},Window_MenuStatus[_0x23d374(0x1d6)][_0x23d374(0xf1)]=function(){const _0x28e24b=_0x23d374,_0x168fb4=this[_0x28e24b(0x13c)]();if(['thin',_0x28e24b(0x174)]['includes'](_0x168fb4))return![];return Window_StatusBase[_0x28e24b(0x1d6)][_0x28e24b(0xf1)][_0x28e24b(0x1fd)](this);},Window_MenuStatus['prototype'][_0x23d374(0x11f)]=function(_0x4cf705,_0x3f09ce){const _0x387865=_0x23d374;VisuMZ[_0x387865(0x1e8)][_0x387865(0x193)]['ListStyles']['DefaultStyle'][_0x387865(0x1fd)](this,_0x4cf705,_0x3f09ce);},Window_SkillStatus['prototype'][_0x23d374(0x128)]=function(_0x49110e,_0x1a489b,_0x1ba75c,_0x39a73b,_0x1384b2){const _0x1e6447=_0x23d374;switch(this[_0x1e6447(0xeb)]()){case _0x1e6447(0x10f):break;case'sprite':this[_0x1e6447(0xee)](_0x49110e,_0x1a489b,_0x1ba75c,_0x39a73b,_0x1384b2);break;case _0x1e6447(0xec):this[_0x1e6447(0x20b)](_0x49110e,_0x1a489b,_0x1ba75c,_0x39a73b,_0x1384b2);break;default:Window_StatusBase[_0x1e6447(0x1d6)]['drawActorFace'][_0x1e6447(0x1fd)](this,_0x49110e,_0x1a489b,_0x1ba75c,_0x39a73b,_0x1384b2);break;}},Window_EquipStatus[_0x23d374(0x1d6)][_0x23d374(0x128)]=function(_0x4c55e4,_0x433a83,_0x591918,_0x47a008,_0x26972d){const _0x4db2c7=_0x23d374;switch(this[_0x4db2c7(0xeb)]()){case _0x4db2c7(0x10f):break;case _0x4db2c7(0x1a2):this[_0x4db2c7(0xee)](_0x4c55e4,_0x433a83,_0x591918,_0x47a008,_0x26972d);break;case'svbattler':this[_0x4db2c7(0x20b)](_0x4c55e4,_0x433a83,_0x591918,_0x47a008,_0x26972d);break;default:Window_StatusBase['prototype']['drawActorFace'][_0x4db2c7(0x1fd)](this,_0x4c55e4,_0x433a83,_0x591918,_0x47a008,_0x26972d);break;}};function Window_ThinGold(){const _0x30a5b9=_0x23d374;this[_0x30a5b9(0x211)](...arguments);}Window_ThinGold[_0x23d374(0x1d6)]=Object[_0x23d374(0x1d7)](Window_Gold[_0x23d374(0x1d6)]),Window_ThinGold[_0x23d374(0x1d6)]['constructor']=Window_ThinGold,Window_ThinGold[_0x23d374(0x1d6)][_0x23d374(0x108)]=function(){const _0x1daab8=_0x23d374;return this[_0x1daab8(0x1eb)]();},Window_ThinGold[_0x23d374(0x1d6)]['colSpacing']=function(){const _0xb721ef=_0x23d374;return Window_Selectable[_0xb721ef(0x1d6)]['colSpacing'][_0xb721ef(0x1fd)](this);};function Window_Playtime(){this['initialize'](...arguments);}Window_Playtime[_0x23d374(0x1d6)]=Object[_0x23d374(0x1d7)](Window_Selectable[_0x23d374(0x1d6)]),Window_Playtime[_0x23d374(0x1d6)][_0x23d374(0x1e0)]=Window_Playtime,Window_Playtime[_0x23d374(0x1d6)]['initialize']=function(_0x389372){const _0x3b64a6=_0x23d374;this[_0x3b64a6(0x122)]=$gameSystem[_0x3b64a6(0x15a)](),this[_0x3b64a6(0xfc)]=0x3c,Window_Selectable[_0x3b64a6(0x1d6)][_0x3b64a6(0x211)][_0x3b64a6(0x1fd)](this,_0x389372),this[_0x3b64a6(0x11a)]();},Window_Playtime[_0x23d374(0x1d6)][_0x23d374(0x108)]=function(){const _0x4d5e7c=_0x23d374;return this[_0x4d5e7c(0x1eb)]();},Window_Playtime[_0x23d374(0x1d6)][_0x23d374(0x169)]=function(){const _0x24af2b=_0x23d374;Window_Selectable[_0x24af2b(0x1d6)][_0x24af2b(0x169)][_0x24af2b(0x1fd)](this),this['updateTimer']();},Window_Playtime[_0x23d374(0x1d6)][_0x23d374(0x202)]=function(){const _0x4a9471=_0x23d374;if(this['_timer']-->0x0){if(this['_timer']<=0x0)this[_0x4a9471(0x11a)]();}},Window_Playtime['prototype'][_0x23d374(0x11a)]=function(){const _0x147568=_0x23d374;this[_0x147568(0xfc)]=0x3c;const _0xea353b=this[_0x147568(0x1b0)](0x0),_0x74b9ad=_0xea353b['x'],_0x51571f=_0xea353b['y'],_0x4b04c4=_0xea353b[_0x147568(0x1d0)];this[_0x147568(0x1f5)]['clear'](),this[_0x147568(0x130)](_0xea353b),this['drawTimeLabel'](_0xea353b),this[_0x147568(0x1c5)](_0xea353b);},Window_Playtime[_0x23d374(0x1d6)][_0x23d374(0x114)]=function(){const _0x19574e=_0x23d374;Window_Selectable[_0x19574e(0x1d6)]['resetFontSettings'][_0x19574e(0x1fd)](this),this[_0x19574e(0x1f5)][_0x19574e(0x109)]=VisuMZ[_0x19574e(0x1e8)][_0x19574e(0x193)][_0x19574e(0x229)][_0x19574e(0x1dd)];},Window_Playtime[_0x23d374(0x1d6)][_0x23d374(0x130)]=function(_0x2d2f0a){const _0x717395=_0x23d374;if(VisuMZ[_0x717395(0x1e8)][_0x717395(0x193)]['Playtime'][_0x717395(0x120)]>0x0){const _0x3899f9=VisuMZ[_0x717395(0x1e8)][_0x717395(0x193)][_0x717395(0x229)][_0x717395(0x120)],_0x52c43f=_0x2d2f0a['y']+(this[_0x717395(0x1eb)]()-ImageManager['iconHeight'])/0x2;this['drawIcon'](_0x3899f9,_0x2d2f0a['x'],_0x52c43f);const _0x55f11d=ImageManager[_0x717395(0x110)]+0x4;_0x2d2f0a['x']+=_0x55f11d,_0x2d2f0a[_0x717395(0x1d0)]-=_0x55f11d;}},Window_Playtime[_0x23d374(0x1d6)][_0x23d374(0x1bb)]=function(_0xc76c28){const _0x2490cd=_0x23d374;this[_0x2490cd(0x114)](),this[_0x2490cd(0x20a)](ColorManager['systemColor']());const _0x557927=VisuMZ[_0x2490cd(0x1e8)][_0x2490cd(0x193)][_0x2490cd(0x229)]['Time'];this['drawText'](_0x557927,_0xc76c28['x'],_0xc76c28['y'],_0xc76c28[_0x2490cd(0x1d0)],'left'),this['resetTextColor']();},Window_Playtime['prototype'][_0x23d374(0x1c5)]=function(_0x577462){const _0x1d457f=_0x23d374,_0x54895f=$gameSystem[_0x1d457f(0x15a)]();this[_0x1d457f(0x195)](_0x54895f,_0x577462['x'],_0x577462['y'],_0x577462[_0x1d457f(0x1d0)],'right');};function Window_MenuVariables(){const _0x5bf7c7=_0x23d374;this[_0x5bf7c7(0x211)](...arguments);}Window_MenuVariables['prototype']=Object[_0x23d374(0x1d7)](Window_Selectable[_0x23d374(0x1d6)]),Window_MenuVariables[_0x23d374(0x1d6)][_0x23d374(0x1e0)]=Window_MenuVariables,Window_MenuVariables['prototype'][_0x23d374(0x211)]=function(_0x5f11bf){const _0x554bbe=_0x23d374;Window_Selectable[_0x554bbe(0x1d6)][_0x554bbe(0x211)][_0x554bbe(0x1fd)](this,_0x5f11bf),this['_data']=VisuMZ[_0x554bbe(0x1e8)]['Settings']['Variable'][_0x554bbe(0x215)],this[_0x554bbe(0x11a)]();},Window_MenuVariables[_0x23d374(0x1d6)]['itemHeight']=function(){const _0x31c74b=_0x23d374;return this[_0x31c74b(0x1eb)]();},Window_MenuVariables[_0x23d374(0x1d6)]['maxCols']=function(){const _0x1adbba=_0x23d374,_0x5275f8=SceneManager[_0x1adbba(0x184)]['commandWindowStyle']();return _0x5275f8===_0x1adbba(0x1db)?0x1:VisuMZ['MainMenuCore'][_0x1adbba(0x193)]['Variable']['VarList'][_0x1adbba(0x1f7)];},Window_MenuVariables[_0x23d374(0x1d6)][_0x23d374(0x114)]=function(){const _0x10dceb=_0x23d374;Window_Selectable[_0x10dceb(0x1d6)][_0x10dceb(0x114)][_0x10dceb(0x1fd)](this),this[_0x10dceb(0x1f5)][_0x10dceb(0x109)]=VisuMZ['MainMenuCore'][_0x10dceb(0x193)][_0x10dceb(0x134)][_0x10dceb(0x1dd)],this[_0x10dceb(0x20a)](ColorManager[_0x10dceb(0x212)]());},Window_MenuVariables[_0x23d374(0x1d6)][_0x23d374(0x226)]=function(){const _0x21828e=_0x23d374;return this['_data'][_0x21828e(0x1f7)];},Window_MenuVariables['prototype'][_0x23d374(0x14a)]=function(){const _0x1f5b22=_0x23d374,_0x1ce441=this[_0x1f5b22(0x11d)]();for(let _0x26f8f8=0x0;_0x26f8f8<this[_0x1f5b22(0x1c8)]();_0x26f8f8++){const _0x4c02fc=_0x1ce441+_0x26f8f8;_0x4c02fc<this[_0x1f5b22(0x226)]()&&(this[_0x1f5b22(0x1df)](_0x4c02fc),this[_0x1f5b22(0x196)](_0x4c02fc));}},Window_MenuVariables[_0x23d374(0x1d6)][_0x23d374(0x1df)]=function(_0x291b96){},Window_MenuVariables[_0x23d374(0x1d6)][_0x23d374(0x196)]=function(_0x3bf458){const _0x187920=_0x23d374,_0x58ba2e=this[_0x187920(0x150)][_0x3bf458];if(_0x58ba2e<=0x0)return;if(!$dataSystem[_0x187920(0x194)][_0x58ba2e])return;const _0x4ddbfc=this[_0x187920(0x1b0)](_0x3bf458);this[_0x187920(0x114)]();let _0x4e69e4=0x0,_0x2a338a=$dataSystem[_0x187920(0x194)][_0x58ba2e][_0x187920(0x15f)]();_0x2a338a[_0x187920(0x189)](/\\I\[(\d+)\]/i)&&(_0x4e69e4=Number(RegExp['$1']),_0x2a338a=_0x2a338a[_0x187920(0x183)](/\\I\[(\d+)\]/i,'')[_0x187920(0x15f)]());if(_0x4e69e4>0x0){const _0x1b4f68=_0x4ddbfc['y']+(this[_0x187920(0x1eb)]()-ImageManager[_0x187920(0x140)])/0x2;this[_0x187920(0x197)](_0x4e69e4,_0x4ddbfc['x'],_0x1b4f68);const _0x51d313=ImageManager[_0x187920(0x110)]+0x4;_0x4ddbfc['x']+=_0x51d313,_0x4ddbfc[_0x187920(0x1d0)]-=_0x51d313;}this[_0x187920(0x195)](_0x2a338a,_0x4ddbfc['x'],_0x4ddbfc['y'],_0x4ddbfc[_0x187920(0x1d0)],'left'),this[_0x187920(0x20a)](ColorManager['normalColor']()),this['drawText']($gameVariables[_0x187920(0x1b3)](_0x58ba2e),_0x4ddbfc['x'],_0x4ddbfc['y'],_0x4ddbfc[_0x187920(0x1d0)],_0x187920(0x216));};