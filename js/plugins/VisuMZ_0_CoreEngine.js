//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.29;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.29] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the default battle system (DTB).
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
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
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 *
 * Misc
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
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
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
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
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
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
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","LargerResolution":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 0
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Misc
 * @text Misc
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Misc
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
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
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
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
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param LargerResolution
 * @text Larger Resolution
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
//=============================================================================

const _0x78de=['PixelateImageRendering','ShowDevTools','rgba(0,\x200,\x200,\x201.0)','BottomButtons','_buttonAssistWindow','resetTextColor','option','NUMPAD8','EnableNameInput','ButtonAssist','Bitmap_drawCircle','_targetAnchor','createTitleButtons','addChildToBack','isBottomHelpMode','backspace','meVolume','LevelUpFullHp','_statusEquipWindow','requestMotion','AccuracyBoost','titleCommandWindow','StatusBgType','WIN_OEM_FJ_ROYA','#%1','sparamFlat1','inputWindowRect','drawNewParam','_anchor','EVA','ARRAYNUM','PHA','onButtonImageLoad','filters','pictureButtons','SPACE','processKeyboardDelete','_editWindow','CustomParam','makeInputButtonString','ParseArmorNotetags','checkCacheKey','EscapeAlways','img/%1/','_list','_repositioned','DEF','onMoveEnd','_windowskin','terms','WIN_OEM_FJ_LOYA','_clickHandler','Game_System_initialize','addWindow','mainFontSize','paramMaxJS','flush','open','gaugeBackColor','itemLineRect','SlotBgType','Window_Base_update','updateMain','clamp','showFauxAnimations','AntiZoomPictures','alpha','InputRect','isArrowPressed','menuShowButton','_scene','loadGameImagesCoreEngine','processKeyboardHome','drawGameVersion','centerSprite','note','FUNC','_stored_ctGaugeColor1','_width','isActiveTpb','582693HCzBXc','maxLvGaugeColor2','damageColor','WindowLayer_render','numberShowButton','WIN_OEM_RESET','Window_ShopSell_isEnabled','setFrame','Game_Actor_paramBase','drawCircle','split','JSON','isGamepadTriggered','Game_Action_itemHit','BackOpacity','sparamFlatJS','<JS\x20%1\x20%2:[\x20](.*)>','buttonAssistOffset%1','Color','Sprite_destroy','buttonAssistText3','faceWidth','horzJS','drawRightArrow','_offsetX','duration','ShowItemBackground','EQUAL','MAXMP','runCombinedScrollingTextAsCode','Keyboard','525574sDxEys','faces','Game_Troop_setup','guardSkillId','SellBgType','updateBackOpacity','process_VisuMZ_CoreEngine_Functions','ItemPadding','_commandWindow','TextJS','terminate','textWidth','processTimingData','round','floor','StartID','Window_NumberInput_processDigitChange','SceneManager_initialize','profileWindowRect','default','Window_NameInput_cursorDown','hide','HelpBgType','_inputSpecialKeyCode','WASD','onInputBannedWords','battleSystem','isGamepadButtonPressed','clearForcedGameTroopSettingsCoreEngine','Type','processKeyboardHandling','TRAIT_PARAM','createTextState','GetParamIcon','targetBackOpacity','easingType','_createInternalTextures','_buttonType','isActor','SkillTypeRect','NUMPAD9','dashToggle','Bitmap_drawTextOutline','CLOSE_CURLY_BRACKET','battlebacks1','focus','drawIcon','_stored_pendingColor','gaugeHeight','Input_update','applyCoreEasing','drawValue','_stored_mpGaugeColor2','Game_Map_setup','Window_Gold_refresh','QoL','BgType','process_VisuMZ_CoreEngine_jsQuickFunctions','DataManager_setupNewGame','playOk','SParamVocab2','IconSParam7','sin','processTouchModernControls','SLASH','cancelShowButton','subject','getCombinedScrollingText','displayY','loadWindowskin','REPLACE','WIN_ICO_00','outlineColor','isEnabled','ModernControls','isPlaytest','setupButtonImage','BlurFilter','update','Untitled','width','makeFontSmaller','forceOutOfPlaytest','CTB','blt','blockWidth','SellRect','Spriteset_Base_destroy','_number','KeySHIFT','animationId','destroyed','DummyRect','strokeRect','_centerElementCoreEngine','DefaultStyle','XParamVocab1','ItemHeight','F16','members','INOUTBACK','buttonAssistCancel','_isButtonHidden','contents','params','createFauxAnimationQueue','CEV','advanced','skillTypes','paramValueByName','FTB','setMute','_backgroundFilter','ALWAYS','getLastPluginCommandInterpreter','EXECUTE','CommandList','WIN_OEM_FJ_JISHO','Game_Picture_updateMove','setAnchor','StatusEquipRect','DOLLAR','CoreEngine','NameMenu','up2','enter','_refreshArrows','PLUS','backOpacity','MEV','XParamVocab0','IconParam6','CategoryBgType','ValueJS','adjustSprite','IconXParam3','editWindowRect','_data','addCommand','INOUTEXPO','_upArrowSprite','IconSParam4','slotWindowRect','ONE','_listWindow','Symbol','createCancelButton','updateClose','removeChild','Padding','updateDashToggle','Max','F10','StatusParamsRect','Bitmap_drawText','keypress','shift','Graphics_centerElement','drawItem','createCustomBackgroundImages','ColorDeath','fontSize','exp','Window_NameInput_processTouch','ColorCTGauge2','CRI','boxWidth','VisuMZ_2_BattleSystemFTB','createChildSprite','Power','_stored_expGaugeColor2','fillRect','buttonAssistOffset4','Spriteset_Base_update','right','ColorPowerDown','end','Scene_Unlisted','waiting','isRepeated','Window_StatusBase_drawActorLevel','DigitGroupingDamageSprites','optSideView','Sprite_Gauge_currentValue','child_process','bgmVolume','successRate','MAX_SAFE_INTEGER','Scene_Status_create','IconXParam6','normalColor','OpenURL','Scene_MenuBase_helpAreaTop','OUTCUBIC','ARRAYSTR','statusParamsWindowRect','numberWindowRect','StatusRect','deathColor','setSkill','_coreEasingType','type','IconSParam2','HELP','tab','Window_StatusBase_drawActorSimpleStatus','HASH','PictureEraseAll','updateOpen','SystemSetFontSize','IconParam3','stencilFunc','bind','WIN_OEM_ENLW','Rate','drawTextEx','SkillTypeBgType','repositionCancelButtonSideButtonLayout','buttonAssistKey1','drawCurrencyValue','MAXHP','ConvertParams','Scene_Battle_createCancelButton','atbActive','isHandled','STB','skillId','determineSideButtonLayoutValid','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','areTileShadowsHidden','vertical','269903kVmYvJ','DTB','Window_Base_initialize','NumberBgType','_changingClass','BACK_SLASH','pagedown','isNormalPriority','DELETE','WIN_ICO_HELP','updateDocumentTitle','KeyboardInput','setAction','SParamVocab4','BannedWords','version','removeFauxAnimation','includes','WIN_OEM_JUMP','ItemRect','OPEN_PAREN','addLoadListener','consumeItem','Scene_Options_create','setBattleSystem','72064OVlNWK','_storedStack','isCursorMovable','DisplayedParams','_skillTypeWindow','MCR','_paramPlus','setup','VisuMZ_2_BattleSystemCTB','DocumentTitleFmt','HelpRect','cursorRight','buttonAssistKey2','EQUALS','getGamepads','xparamRate2','getColorDataFromPluginParameters','statusEquipWindowRect','([\x5c+\x5c-]\x5cd+)([%％])>','nextLevelExp','Window_NameInput_cursorRight','xparam','createPageButtons','_forcedBattleSys','clone','ColorSystem','PRINTSCREEN','_realScale','FontSmoothing','Scene_Map_createSpriteset','_updateFilterArea','WIN_OEM_FINISH','origin','setupNewGame','isKeyItem','crisisColor','processCursorMove','outlineColorDmg','WIN_OEM_COPY','NUM_LOCK','createMenuButton','onInputOk','NUMPAD2','_cache','updateTransform','replace','helpAreaTopSideButtonLayout','_sellWindow','WIN_OEM_BACKTAB','targetY','KeyUnlisted','URL','setBackgroundType','mainAreaTop','sparamFlatBonus','doesNameContainBannedWords','MRG','Bitmap_gradientFillRect','_slotWindow','_lastPluginCommandInterpreter','remove','TextCodeNicknames','Scene_Boot_loadSystemImages','SParamVocab1','_stored_ctGaugeColor2','LoadError','DummyBgType','GameEnd','titles2','command122','BgFilename2','SCALE_MODES','evaluate','_menuButton','drawActorSimpleStatus','volume','reserveCommonEvent','process_VisuMZ_CoreEngine_RegExp','alwaysDash','paramBase','TitlePicButtons','Window_EquipItem_isEnabled','Spriteset_Base_updatePosition','levelUpRecovery','GoldChange','pixelated','Script\x20Call\x20Error','ParseClassNotetags','Bitmap_strokeRect','render','apply','EncounterRateMinimum','skills','_statusParamsWindow','currentValue','initButtonHidden','itemHeight','INCUBIC','colSpacing','TitleCommandList','RequireFocus','text%1','_stored_maxLvGaugeColor1','updatePadding','HRG','mainAreaTopSideButtonLayout','allowShiftScrolling','hideButtonFromView','REC','1ERWWie','CreateBattleSystemID','NEAREST','ESC','Game_Picture_move','select','DefaultMode','printError','_actor','DigitGroupingLocale','Game_Event_isCollidedWithEvents','endAnimation','INBACK','NUMPAD6','SParamVocab0','canUse','playCursorSound','currentClass','sellWindowRect','Bitmap_blt','isGamepadConnected','Linear','initDigitGrouping','learnings','ColorTPGauge1','OnLoadJS','CLOSE_PAREN','Scene_Map_createMenuButton','drawSegment','calcCoreEasing','isInputting','setCoreEngineUpdateWindowBg','getCoreEngineScreenShakeStyle','calcEasing','INEXPO','statusWindowRect','renderNoMask','setActorHome','processKeyboardEnd','push','drawCharacter','hit','CallHandlerJS','StatusEquipBgType','level','isPlaying','nw.gui','isMVAnimation','_pressed','traitsPi','IconParam1','bitmap','Window_Base_drawIcon','LineHeight','INOUTQUAD','HANJA','max','moveRelativeToResolutionChange','windowPadding','scale','text','vertJS','_coreEngineShakeStyle','down','setCoreEngineScreenShakeStyle','NameInputMessage','XParamVocab8','processSoundTimings','_height','NUMPAD5','Window_NameInput_processHandling','EndingID','NUMPAD7','connected','name','EXSEL','SLEEP','LUK','StatusParamsBgType','getLevel','framebuffer','Basic','SParamVocab7','altKey','mute','toLocaleString','areButtonsHidden','targetSpritePosition','STENCIL_TEST','listWindowRect','VisuMZ_1_OptionsCore','_screenX','FDR','Sprite_Battler_startMove','top','TextFmt','optionsWindowRect','reserveNewGameCommonEvent','GoldIcon','process_VisuMZ_CoreEngine_Notetags','SkillMenu','Scene_Equip_create','initBasic','setSideButtonLayout','gaugeRate','center','picture','XParamVocab6','TextManager_param','PictureEraseRange','Param','wait','command357','_tempActor','_stored_mpCostColor','loadSystem','MultiKeyFmt','_pollGamepads','BuyRect','CommandWidth','mpGaugeColor1','createWindowLayer','categoryWindowRect','goldWindowRect','DrawIcons','GoldMax','onKeyDownKeysF6F7','gainGold','Game_Screen_initialize','_windowLayer','Gold','snapForBackground','setWindowPadding','sqrt','visible','%1%2','_onKeyDown','onEscapeSuccess','INOUTCIRC','drawGauge','StatusMenu','_playtestF7Looping','OUTSINE','F15','Window_Selectable_processTouch','itemPadding','tilesets','Scene_Battle_createSpriteset','_fauxAnimationQueue','Scene_Menu_create','retreat','Location','subtitle','Scene_MenuBase_createCancelButton','Icon','processMoveCommand','changeClass','isMaxLevel','ScreenShake','bgm','buttonAssistWindowRect','isOpen','SnapshotOpacity','BattleSystem','ItemBackColor1','charCode','isBusy','CNT','Scene_MenuBase_createBackground','FontShadows','jsQuickFunc','_pictureContainer','WIN_OEM_FJ_MASSHOU','ColorMPGauge2','initCoreEasing','_stored_gaugeBackColor','image-rendering','updateFauxAnimations','CustomParamAbb','active','stringKeyMap','innerWidth','itemHit','getInputButtonString','OutlineColorDmg','paramRate2','maxLvGaugeColor1','ZERO','%2%1%3','clearRect','isItem','pendingColor','setupCoreEngine','processCursorHomeEndTrigger','useDigitGroupingEx','start','clear','Bitmap_fillRect','resize','min','STRUCT','stop','updateOrigin','switchModes','xparamPlus1','equips','applyEasing','animationNextDelay','_context','log','processBack','F21','addEventListener','paramRate','itemWindowRect','DimColor2','Layer','Game_Picture_initBasic','setupCoreEasing','TimeProgress','get','helpAreaTop','_digitGroupingEx','_internalTextures','DamageColor','helpAreaHeight','helpWindowRect','isCollidedWithEvents','startAnimation','BuyBgType','DATABASE','Scene_Boot_onDatabaseLoaded','targetOpacity','isGameActive','IconParam2','pagedownShowButton','opacity','_backSprite1','updateScene','refreshDimmerBitmap','down2','defaultInputMode','RowSpacing','755682NShrvY','description','createEnemies','xparamFlatBonus','CustomParamType','keyboard','_shakeSpeed','forceStencil','ATTN','F12','context','rowSpacing','_destroyInternalTextures','_cancelButton','sparamRate2','BgFilename1','checkSmartEventCollision','ColorCTGauge1','contentsOpacity','save','itemBackColor1','IconXParam2','keyRepeatWait','_fauxAnimationSprites','ColorExpGauge2','_clientArea','maxLevel','SHIFT','drawAllParams','TextCodeClassNames','_downArrowSprite','iconHeight','titles1','maxItems','resetFontSettings','itemEva','Window_Base_drawText','Game_Interpreter_command105','CustomParamIcons','DigitGroupingStandardText','playTestF7','playCursor','Graphics_defaultStretchMode','isAlive','pop','Abbreviation','SParamVocab6','openURL','PA1','Spriteset_Base_initialize','isOptionValid','VisuMZ_2_BattleSystemBTB','isSpecialCode','updatePositionCoreEngineShakeOriginal','Scene_Name_create','IconXParam8','Conditional\x20Branch\x20Script\x20Error','buttonAssistOffset1','background','useDigitGrouping','Game_Actor_levelUp','xScrollLinkedOffset','ParseWeaponNotetags','EISU','ARRAYSTRUCT','paramWidth','WIN_ICO_CLEAR','OUTEXPO','sparamRate','TextStr','Sprite_Picture_updateOrigin','startAutoNewGame','WIN_OEM_WSCTRL','drawBackgroundRect','xparamRateJS','Window_Selectable_itemRect','_hp','Enable','drawGoldItemStyle','RevertPreserveNumbers','_stored_expGaugeColor1','TCR','_stored_powerDownColor','setHandler','Bitmap_resize','VisuMZ_2_BattleSystemSTB','mpColor','Game_Interpreter_command355','parse','createDimmerSprite','updateMainMultiply','XParamVocab3','ASTERISK','CancelText','MODECHANGE','Game_Action_updateLastTarget','currencyUnit','Input_setupEventHandlers','IconXParam9','loadBitmap','_shouldPreventDefault','ParseTilesetNotetags','_refreshPauseSign','createCommandWindow','ZOOM','removeAllFauxAnimations','ImgLoad','getColor','getBackgroundOpacity','toUpperCase','ATK','ButtonFadeSpeed','GoldBgType','encounterStep','isAnimationForEach','Sprite_Actor_setActorHome','INQUINT','CodeJS','WIN_OEM_CLEAR','ColorPowerUp','Window_Selectable_cursorUp','paramRate1','DigitGroupingGaugeSprites','AutoStretch','updateKeyText','_backSprite2','ENTER_SPECIAL','drawGameSubtitle','F20','makeTargetSprites','buttonY','XParamVocab7','_stored_crisisColor','initCoreEngineScreenShake','ActorRect','HIT','updatePlayTestF7','sparamPlusJS','\x5c}❪TAB❫\x5c{','Input_clear','maxCols','expGaugeColor1','Game_Actor_changeClass','inbounce','Title','Flat','INBOUNCE','constructor','targetX','GRD','VOLUME_MUTE','ListBgType','tpGaugeColor2','initMembers','enableDigitGrouping','SideButtons','randomInt','itemBackColor2','_effectsContainer','trim','measureTextWidth','DrawItemBackgroundJS','Rate1','BoxMargin','subjectHitRate','retrieveFauxAnimation','processKeyboardDigitChange','drawActorExpGauge','lineHeight','_pageupButton','dimColor2','gradientFillRect','_customModified','SCROLL_LOCK','IconSet','_dummyWindow','ActorMPColor','cancel','OPEN_BRACKET','CANCEL','Window','updatePositionCoreEngineShakeRand','CONVERT','command111','isBottomButtonMode','_CoreEngineSettings','ActorHPColor','animations','ApplyEasing','Input_onKeyDown','encounterStepsMinimum','Window_NumberInput_start','buttonAssistSwitch','TPB\x20ACTIVE','_digitGrouping','traitObjects','_cacheScaleY','SParamVocab5','innerHeight','OptionsMenu','commandWindowRect','buttonAssistText5','valueOutlineColor','_maxDigits','cursorPagedown','ParamArrow','length','IconSParam3','performEscape','drawFace','INQUAD','LINEAR','setTargetAnchor','createDigits','children','blendFunc','Control\x20Variables\x20Script\x20Error','Game_Interpreter_command122','paramRateJS','transform','ONE_MINUS_SRC_ALPHA','Game_Party_consumeItem','paramMax','ColorMaxLvGauge1','Scene_Map_updateMainMultiply','F17','WIN_OEM_FJ_TOUROKU','LEFT','targetEvaRate','addChild','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','setLastPluginCommandInterpreter','powerUpColor','VOLUME_DOWN','Game_BattlerBase_refresh','getBattleSystem','processHandling','TPB\x20WAIT','sv_actors','ParseActorNotetags','areButtonsOutsideMainUI','startMove','setEnemyAction','_setupEventHandlers','RegExp','_stored_hpGaugeColor2','pow','cursorLeft','createSpriteset','F13','createFauxAnimationSprite','buttonAssistWindowButtonRect','GREATER_THAN','parseForcedGameTroopSettingsCoreEngine','SwitchActorText','Activated','paramPlusJS','_inputString','isPhysical','F11','reduce','battlebacks2','shake','isSideButtonLayout','isRightInputMode','xparamFlat1','buttonAreaHeight','F14','random','escape','enemies','Input_shouldPreventDefault','xparamRate','_blank','_goldWindow','_drawTextShadow','stencilOp','KEEP','NUMPAD0','ARRAYEVAL','dummyWindowRect','setActorHomeRepositioned','movePageButtonSideButtonLayout','cos','Settings','setEasingType','xdg-open','process_VisuMZ_CoreEngine_Settings','([\x5c+\x5c-]\x5cd+)>','TGR','ColorHPGauge2','loadSystemImages','_mp','MRF','ColorNormal','getButtonAssistLocation','slice','_movementWholeDuration','TILDE','CommandRect','catchLoadError','PRINT','sv_enemies','Game_Temp_initialize','currentExp','systemColor','defineProperty','expGaugeColor2','GoldFontSize','1KtNEFn','_muteSound','IconXParam7','CLEAR','Game_Interpreter_command111','repositionEnemiesByResolution','pictureId','Sprite_Gauge_gaugeRate','initialLevel','onKeyDown','Show\x20Scrolling\x20Text\x20Script\x20Error','drawActorLevel','resetBattleSystem','drawIconBySize','exit','_optionsWindow','applyForcedGameTroopSettingsCoreEngine','Window_Base_createTextState','PDR','updatePictureAntiZoom','setSize','Scene_MenuBase_mainAreaHeight','SaveMenu','adjustPictureAntiZoom','RepositionEnemies','EnableJS','ColSpacing','fromCharCode','Plus2','makeDocumentTitle','key%1','_pagedownButton','Sprite_AnimationMV_processTimingData','Window_NameInput_cursorLeft','OUTBOUNCE','setBackgroundOpacity','outlineColorGauge','STR','Scene_Map_updateScene','number','buttonAssistKey5','param','pictures','_mode','enableDigitGroupingEx','INELASTIC','ConvertNumberToString','_inputWindow','_encounterCount','Sprite_Button_updateOpacity','_targetOffsetY','openness','Window_NameInput_cursorUp','ColorCrisis','INOUTSINE','parallaxes','worldTransform','padding','batch','ParseEnemyNotetags','CategoryRect','itypeId','fadeSpeed','iconWidth','boxHeight','INOUTBOUNCE','paramY','levelUp','command105','_offsetY','ExtJS','ColorGaugeBack','originalJS','ParseAllNotetags','isNumpadPressed','_onKeyPress','filter','ENTER','EditBgType','fillText','ItemStyle','startShake','_dimmerSprite','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','updateAnchor','keyCode','ColorMPCost','IconParam5','ProfileRect','_hideButtons','Total','drawGameTitle','_stored_tpGaugeColor2','OkText','_opening','ARRAYFUNC','cursorUp','createJsQuickFunction','valueOutlineWidth','IconParam7','markCoreEngineModified','en-US','_pauseSignSprite','buttonAssistOk','height','Game_Character_processMoveCommand','Game_Picture_calcEasing','makeDeepCopy','dimColor1','InputBgType','Window_NameInput_refresh','Manual','hpColor','XParamVocab5','_mainSprite','Game_Picture_x','Bitmap_clearRect','toLowerCase','processKeyboardBackspace','integer','_coreEasing','Window_Selectable_processCursorMove','drawActorNickname','currentLevelExp','pageup','_cacheScaleX','ParseItemNotetags','deselect','OUTQUAD','(\x5cd+)([%％])>','sparamRateJS','_gamepadWait','buttonAssistText1','isMaskingEnabled','IconSParam1','bgs','onDatabaseLoaded','playEscape','WIN_OEM_AUTO','Subtitle','call','translucentOpacity','outbounce','_timerSprite','gaugeLineHeight','MenuBg','actor','ParamChange','IconXParam4','targetContentsOpacity','SEPARATOR','IconSParam6','targetScaleY','LESS_THAN','isMapScrollLinked','_numberWindow','MDR','23606REsERe','layoutSettings','FontSize','Scene_Base_createWindowLayer','NoTileShadows','buttonAssistKey3','updateMove','_profileWindow','isSideView','ctrl','CIRCUMFLEX','clearStencil','openingSpeed','INOUTQUINT','PGUP','Plus1','INSERT','Game_BattlerBase_initMembers','Game_Picture_show','filterArea','Window_Selectable_drawBackgroundRect','mpCostColor','mainAreaHeightSideButtonLayout','characters','toFixed','_commandList','XParameterFormula','isMenuButtonAssistEnabled','PositionJS','numActions','ShowButtons','Game_Action_itemEva','ItemBgType','%1/','isUseModernControls','setClickHandler','seVolume','bgsVolume','_itemWindow','FunctionName','isPressed','setGuard','paramPlus','VOLUME_UP','system','mirror','ShowJS','_defaultStretchMode','initCoreEngine','style','initVisuMZCoreEngine','ActorBgType','targetScaleX','yScrollLinkedOffset','IconXParam0','buttonAssistText2','left','CLOSE_BRACKET','WIN_OEM_CUSEL','_categoryWindow','BTB','XParamVocab9','cursorPageup','_statusWindow','IconXParam5','_duration','evaded','missed','createBuffer','expRate','clearZoom','Graphics_printError','makeEncounterCount','Scene_MenuBase_mainAreaTop','ColorManager_loadWindowskin','getInputMultiButtonStrings','NewGameBoot','asin','WIN_OEM_ATTN','itemRect','Spriteset_Battle_createEnemies','prototype','createFauxAnimation','makeCommandList','onNameOk','moveCancelButtonSideButtonLayout','GroupDigits','OUTQUINT','textColor','ColorMPGauge1','playTestF6','_actorWindow','SceneManager_isGameActive','initialBattleSystem','drawText','_forcedTroopView','MenuLayout','move','fillStyle','uiAreaHeight','initialize','NUM','_moveEasingType','destroy','create','F22','updateOpacity','itemSuccessRate','F7key','setHome','moveMenuButtonSideButtonLayout','_sideButtonLayout','_isWindow','MAT','DashToggleR','BasicParameterFormula','ceil','(\x5cd+)>','xparamFlat2','Window_Base_drawCharacter','font-smooth','Scene_Boot_startNormalGame','buttonAssistText%1','Scene_Map_initialize','initMembersCoreEngine','Window_NameInput_cursorPagedown','ParseStateNotetags','helpAreaBottom','ColorHPGauge1','bitmapHeight','tpColor','button','EXCLAMATION','adjustBoxSize','contains','isItemStyle','_mapNameWindow','registerCommand','Scene_Shop_create','processCursorMoveModernControls','requestFauxAnimation','reservePlayTestNewGameCommonEvent','_shakeDuration','TranslucentOpacity','_targetOffsetX','refresh','eva','updateLastTarget','maxGold','itemHitImprovedAccuracy','GoldRect','GoldOverlap','smoothSelect','BACKSPACE','PictureEasingType','MDF','map','Window_NameInput_cursorPageup','SideView','<%1\x20%2:[\x20]','command355','ColorTPCost','TRG','inBattle','paramFlatJS','ACCEPT','popScene','makeCoreEngineCommandList','Scene_Skill_create','ShopMenu','paramBaseAboveLevel99','Plus','playBuzzer','keyMapper','gameTitle','_movementDuration','BaseTexture','Duration','drawActorClass','NewGameCommonEvent','skillTypeWindowRect','KeyItemProtect','INCIRC','Wait','_colorCache','ctGaugeColor1','_helpWindow','_baseTexture','ctGaugeColor2','OutlineColorGauge','CommandBgType','commandWindowRows','OutlineColor','sparam','createButtonAssistWindow','_playTestFastMode','_spriteset','Scene_Battle_update','isCancelled','buttonAssistOffset3','BattleManager_processEscape','SEMICOLON','Page','updatePositionCoreEngine','Bitmap_measureTextWidth','createBackground','isTriggered','mhp','NewGameCommonEventAll','OpenConsole','performMiss','setAttack','xparamPlus','isFullDocumentTitle','IconSParam9','IconSParam5','nickname','AGI','MULTIPLY','Scene_Name_onInputOk','PERCENT','index','ItemBackColor2','CustomParamNames','updatePositionCoreEngineShakeHorz','format','NUMPAD3','Renderer','_backgroundSprite','KeyTAB','value','_hideTileShadows','_stored_maxLvGaugeColor2','anchor','xparamPlusJS','Sprite_Animation_processSoundTimings','Flat1','MINUS','OUTQUART','IconSParam8','ImprovedAccuracySystem','EXR','isExpGaugeDrawn','processFauxAnimationRequests','tpGaugeColor1','SceneManager_onKeyDown','targetObjects','_centerElement','Tilemap_addShadow','setSideView','DigitGroupingExText','isSmartEventCollisionOn','QUOTE','Input_pollGamepads','updatePositionCoreEngineShakeVert','processTouch','_addShadow','Rate2','paramchangeTextColor','targets','14702wJNgLZ','processDigitChange','setupValueFont','COMMA','imageSmoothingEnabled','evade','DIVIDE','cursorDown','RIGHT','getCustomBackgroundSettings','2oDxahE','animationBaseDelay','displayX','_buyWindow','enemy','JUNJA','OptionsRect','BottomHelp','touchUI','changeTextColor','rgba(0,\x200,\x200,\x200.7)','ctrlKey','SParamVocab9','match','PictureFilename','Window_NameInput_initialize','_drawTextOutline','animationShouldMirror','setMainFontSize','_shakePower','xparamPlus2','home','hpGaugeColor2','original','PreserveNumbers','stretch','SystemLoadImages','PLAY','_animation','drawParamText'];const _0xf959=function(_0x248073,_0x29db56){_0x248073=_0x248073-0x14c;let _0x78dee1=_0x78de[_0x248073];return _0x78dee1;};const _0x195c22=_0xf959;(function(_0x17b40a,_0x4c9da5){const _0x52c063=_0xf959;while(!![]){try{const _0x340328=-parseInt(_0x52c063(0x1d6))*-parseInt(_0x52c063(0x2c9))+-parseInt(_0x52c063(0x169))+-parseInt(_0x52c063(0x150))+-parseInt(_0x52c063(0x59f))+-parseInt(_0x52c063(0x636))*parseInt(_0x52c063(0x3fe))+parseInt(_0x52c063(0x617))+parseInt(_0x52c063(0x49b))*parseInt(_0x52c063(0x5a9));if(_0x340328===_0x4c9da5)break;else _0x17b40a['push'](_0x17b40a['shift']());}catch(_0xf89192){_0x17b40a['push'](_0x17b40a['shift']());}}}(_0x78de,0x7ae30));var label='CoreEngine',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x195c22(0x44a)](function(_0x3236a4){const _0x747d00=_0x195c22;return _0x3236a4['status']&&_0x3236a4[_0x747d00(0x2ca)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x195c22(0x3e5)]||{},VisuMZ[_0x195c22(0x713)]=function(_0x356892,_0x5aab25){const _0x39bc32=_0x195c22;for(const _0x173fad in _0x5aab25){if(_0x173fad[_0x39bc32(0x5b6)](/(.*):(.*)/i)){const _0x2d650e=String(RegExp['$1']),_0xcf7be1=String(RegExp['$2'])[_0x39bc32(0x336)]()[_0x39bc32(0x368)]();let _0xb67fce,_0x299781,_0x14ca12;switch(_0xcf7be1){case _0x39bc32(0x500):_0xb67fce=_0x5aab25[_0x173fad]!==''?Number(_0x5aab25[_0x173fad]):0x0;break;case _0x39bc32(0x5e5):_0x299781=_0x5aab25[_0x173fad]!==''?JSON[_0x39bc32(0x321)](_0x5aab25[_0x173fad]):[],_0xb67fce=_0x299781[_0x39bc32(0x537)](_0x495582=>Number(_0x495582));break;case'EVAL':_0xb67fce=_0x5aab25[_0x173fad]!==''?eval(_0x5aab25[_0x173fad]):null;break;case _0x39bc32(0x3e0):_0x299781=_0x5aab25[_0x173fad]!==''?JSON[_0x39bc32(0x321)](_0x5aab25[_0x173fad]):[],_0xb67fce=_0x299781['map'](_0x5bc31c=>eval(_0x5bc31c));break;case _0x39bc32(0x622):_0xb67fce=_0x5aab25[_0x173fad]!==''?JSON['parse'](_0x5aab25[_0x173fad]):'';break;case'ARRAYJSON':_0x299781=_0x5aab25[_0x173fad]!==''?JSON[_0x39bc32(0x321)](_0x5aab25[_0x173fad]):[],_0xb67fce=_0x299781[_0x39bc32(0x537)](_0x1ab457=>JSON[_0x39bc32(0x321)](_0x1ab457));break;case _0x39bc32(0x613):_0xb67fce=_0x5aab25[_0x173fad]!==''?new Function(JSON[_0x39bc32(0x321)](_0x5aab25[_0x173fad])):new Function('return\x200');break;case _0x39bc32(0x45d):_0x299781=_0x5aab25[_0x173fad]!==''?JSON[_0x39bc32(0x321)](_0x5aab25[_0x173fad]):[],_0xb67fce=_0x299781[_0x39bc32(0x537)](_0x588ab6=>new Function(JSON[_0x39bc32(0x321)](_0x588ab6)));break;case _0x39bc32(0x423):_0xb67fce=_0x5aab25[_0x173fad]!==''?String(_0x5aab25[_0x173fad]):'';break;case _0x39bc32(0x6f8):_0x299781=_0x5aab25[_0x173fad]!==''?JSON[_0x39bc32(0x321)](_0x5aab25[_0x173fad]):[],_0xb67fce=_0x299781['map'](_0x10013b=>String(_0x10013b));break;case _0x39bc32(0x29e):_0x14ca12=_0x5aab25[_0x173fad]!==''?JSON[_0x39bc32(0x321)](_0x5aab25[_0x173fad]):{},_0x356892[_0x2d650e]={},VisuMZ[_0x39bc32(0x713)](_0x356892[_0x2d650e],_0x14ca12);continue;case _0x39bc32(0x309):_0x299781=_0x5aab25[_0x173fad]!==''?JSON[_0x39bc32(0x321)](_0x5aab25[_0x173fad]):[],_0xb67fce=_0x299781['map'](_0x5a07ec=>VisuMZ['ConvertParams']({},JSON[_0x39bc32(0x321)](_0x5a07ec)));break;default:continue;}_0x356892[_0x2d650e]=_0xb67fce;}}return _0x356892;},(_0x4a7e65=>{const _0x363e73=_0x195c22,_0x427cd6=_0x4a7e65[_0x363e73(0x220)];for(const _0x5b8f41 of dependencies){if(!Imported[_0x5b8f41]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x427cd6,_0x5b8f41)),SceneManager[_0x363e73(0x40c)]();break;}}const _0x3a214a=_0x4a7e65['description'];if(_0x3a214a[_0x363e73(0x5b6)](/\[Version[ ](.*?)\]/i)){const _0x1d5884=Number(RegExp['$1']);_0x1d5884!==VisuMZ[label][_0x363e73(0x15f)]&&(alert(_0x363e73(0x14d)[_0x363e73(0x57c)](_0x427cd6,_0x1d5884)),SceneManager[_0x363e73(0x40c)]());}if(_0x3a214a['match'](/\[Tier[ ](\d+)\]/i)){const _0x435d83=Number(RegExp['$1']);_0x435d83<tier?(alert(_0x363e73(0x3af)['format'](_0x427cd6,_0x435d83,tier)),SceneManager['exit']()):tier=Math[_0x363e73(0x20e)](_0x435d83,tier);}VisuMZ[_0x363e73(0x713)](VisuMZ[label]['Settings'],_0x4a7e65['parameters']);})(pluginData),VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x3c8)]={'PluginCommands':!![]},PluginManager[_0x195c22(0x524)](pluginData[_0x195c22(0x220)],_0x195c22(0x6f5),_0x367614=>{const _0x3739d7=_0x195c22;VisuMZ['ConvertParams'](_0x367614,_0x367614);const _0x2bb743=_0x367614[_0x3739d7(0x19c)];VisuMZ[_0x3739d7(0x2f8)](_0x2bb743);}),PluginManager[_0x195c22(0x524)](pluginData['name'],_0x195c22(0x1bd),_0x5b08d9=>{const _0xef174d=_0x195c22;VisuMZ[_0xef174d(0x713)](_0x5b08d9,_0x5b08d9);const _0x678245=_0x5b08d9[_0xef174d(0x581)]||0x0;$gameParty[_0xef174d(0x255)](_0x678245);}),PluginManager['registerCommand'](pluginData[_0x195c22(0x220)],_0x195c22(0x535),_0x297ba1=>{const _0x489d71=_0x195c22;VisuMZ['ConvertParams'](_0x297ba1,_0x297ba1);const _0xcc238d=_0x297ba1[_0x489d71(0x404)]||0x1,_0x1a5d92=_0x297ba1[_0x489d71(0x659)]||_0x489d71(0x1eb),_0x507ca9=$gameScreen['picture'](_0xcc238d);_0x507ca9&&_0x507ca9[_0x489d71(0x3e6)](_0x1a5d92);}),PluginManager[_0x195c22(0x524)](pluginData['name'],_0x195c22(0x705),_0x24ca99=>{for(let _0x1bb972=0x1;_0x1bb972<=0x64;_0x1bb972++){$gameScreen['erasePicture'](_0x1bb972);}}),PluginManager[_0x195c22(0x524)](pluginData[_0x195c22(0x220)],_0x195c22(0x243),_0x6f404f=>{const _0x1f3ce4=_0x195c22;VisuMZ['ConvertParams'](_0x6f404f,_0x6f404f);const _0x2f97f3=Math[_0x1f3ce4(0x29d)](_0x6f404f[_0x1f3ce4(0x645)],_0x6f404f[_0x1f3ce4(0x21d)]),_0x5915ed=Math[_0x1f3ce4(0x20e)](_0x6f404f[_0x1f3ce4(0x645)],_0x6f404f[_0x1f3ce4(0x21d)]);for(let _0x2e2385=_0x2f97f3;_0x2e2385<=_0x5915ed;_0x2e2385++){$gameScreen['erasePicture'](_0x2e2385);}}),PluginManager[_0x195c22(0x524)](pluginData['name'],_0x195c22(0x274),_0x371742=>{const _0x1cf02a=_0x195c22;VisuMZ[_0x1cf02a(0x713)](_0x371742,_0x371742);const _0xacee8c=_0x371742[_0x1cf02a(0x653)]||'random',_0x5376ad=_0x371742[_0x1cf02a(0x6df)]['clamp'](0x1,0x9),_0x4ffe65=_0x371742['Speed'][_0x1cf02a(0x606)](0x1,0x9),_0x58189f=_0x371742[_0x1cf02a(0x54c)]||0x1,_0x360181=_0x371742[_0x1cf02a(0x552)];$gameScreen[_0x1cf02a(0x216)](_0xacee8c),$gameScreen[_0x1cf02a(0x44f)](_0x5376ad,_0x4ffe65,_0x58189f);if(_0x360181){const _0x2c149b=$gameTemp[_0x1cf02a(0x6a8)]();if(_0x2c149b)_0x2c149b[_0x1cf02a(0x245)](_0x58189f);}}),PluginManager['registerCommand'](pluginData[_0x195c22(0x220)],_0x195c22(0x707),_0xff9660=>{const _0x2afedb=_0x195c22;VisuMZ['ConvertParams'](_0xff9660,_0xff9660);const _0x110a90=_0xff9660[_0x2afedb(0x5cd)]||0x1;$gameSystem[_0x2afedb(0x5bb)](_0x110a90);}),PluginManager[_0x195c22(0x524)](pluginData['name'],'SystemSetSideView',_0x5ac702=>{const _0x30807b=_0x195c22;if($gameParty['inBattle']())return;VisuMZ[_0x30807b(0x713)](_0x5ac702,_0x5ac702);const _0x5a6776=_0x5ac702[_0x30807b(0x5cd)];if(_0x5a6776[_0x30807b(0x5b6)](/Front/i))$gameSystem['setSideView'](![]);else _0x5a6776[_0x30807b(0x5b6)](/Side/i)?$gameSystem[_0x30807b(0x594)](!![]):$gameSystem[_0x30807b(0x594)](!$gameSystem[_0x30807b(0x4a3)]());}),PluginManager[_0x195c22(0x524)](pluginData[_0x195c22(0x220)],'SystemLoadAudio',_0x50d346=>{const _0x393203=_0x195c22;if($gameParty[_0x393203(0x53e)]())return;VisuMZ[_0x393203(0x713)](_0x50d346,_0x50d346);const _0x5dbd9b=[_0x393203(0x275),_0x393203(0x485),'me','se'];for(const _0x19f3a7 of _0x5dbd9b){const _0x2b94cd=_0x50d346[_0x19f3a7],_0x263bd0=_0x393203(0x4bc)[_0x393203(0x57c)](_0x19f3a7);for(const _0x2a32f1 of _0x2b94cd){console['log'](_0x263bd0,_0x2a32f1),AudioManager[_0x393203(0x4df)](_0x263bd0,_0x2a32f1);}}}),PluginManager[_0x195c22(0x524)](pluginData[_0x195c22(0x220)],_0x195c22(0x5c3),_0x33a810=>{const _0x95673=_0x195c22;if($gameParty['inBattle']())return;VisuMZ[_0x95673(0x713)](_0x33a810,_0x33a810);const _0x51846e=['animations',_0x95673(0x662),_0x95673(0x3ce),'characters',_0x95673(0x3d7),'faces',_0x95673(0x435),'pictures','sv_actors',_0x95673(0x3f7),_0x95673(0x4c7),_0x95673(0x268),_0x95673(0x2e9),'titles2'];for(const _0x2e2ee6 of _0x51846e){const _0xec6e76=_0x33a810[_0x2e2ee6],_0x33880a=_0x95673(0x5f2)[_0x95673(0x57c)](_0x2e2ee6);for(const _0x59f803 of _0xec6e76){ImageManager[_0x95673(0x32c)](_0x33880a,_0x59f803);}}}),PluginManager[_0x195c22(0x524)](pluginData[_0x195c22(0x220)],'SystemSetBattleSystem',_0x4e41f2=>{const _0x402fb4=_0x195c22;if($gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x4e41f2,_0x4e41f2);const _0x56df2c=_0x4e41f2[_0x402fb4(0x5cd)][_0x402fb4(0x336)]()[_0x402fb4(0x368)](),_0x5a43f8=VisuMZ[_0x402fb4(0x6b0)][_0x402fb4(0x1d7)](_0x56df2c);$gameSystem[_0x402fb4(0x168)](_0x5a43f8);}),VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x1d7)]=function(_0x5f2c65){const _0x55da88=_0x195c22;_0x5f2c65=_0x5f2c65||_0x55da88(0x2bc),_0x5f2c65=String(_0x5f2c65)[_0x55da88(0x336)]()[_0x55da88(0x368)]();switch(_0x5f2c65){case _0x55da88(0x151):return 0x0;case _0x55da88(0x38a):Imported['VisuMZ_1_OptionsCore']&&(ConfigManager[_0x55da88(0x715)]=!![]);return 0x1;case _0x55da88(0x3b6):Imported[_0x55da88(0x230)]&&(ConfigManager[_0x55da88(0x715)]=![]);return 0x2;case _0x55da88(0x689):if(Imported[_0x55da88(0x171)])return _0x55da88(0x689);break;case _0x55da88(0x717):if(Imported['VisuMZ_2_BattleSystemSTB'])return'STB';break;case _0x55da88(0x4d7):if(Imported[_0x55da88(0x2fc)])return _0x55da88(0x4d7);break;case _0x55da88(0x6a4):if(Imported[_0x55da88(0x6dd)])return _0x55da88(0x6a4);break;}return $dataSystem[_0x55da88(0x650)];},PluginManager[_0x195c22(0x524)](pluginData[_0x195c22(0x220)],'SystemSetWindowPadding',_0x501c23=>{const _0x163633=_0x195c22;VisuMZ['ConvertParams'](_0x501c23,_0x501c23);const _0x163d6d=_0x501c23['option']||0x1;$gameSystem[_0x163633(0x25a)](_0x163d6d);}),VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x2bd)]=Scene_Boot[_0x195c22(0x4ec)][_0x195c22(0x486)],Scene_Boot['prototype'][_0x195c22(0x486)]=function(){const _0x1af2cf=_0x195c22;VisuMZ[_0x1af2cf(0x6b0)][_0x1af2cf(0x2bd)]['call'](this),this['process_VisuMZ_CoreEngine_RegExp'](),this[_0x1af2cf(0x239)](),this[_0x1af2cf(0x3e8)](),this[_0x1af2cf(0x63c)](),this['process_VisuMZ_CoreEngine_CustomParameters'](),VisuMZ[_0x1af2cf(0x447)]();},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x3bd)]={},Scene_Boot[_0x195c22(0x4ec)][_0x195c22(0x1b6)]=function(){const _0x3b85e0=_0x195c22,_0x383976=[_0x3b85e0(0x712),'MAXMP','ATK',_0x3b85e0(0x5f5),_0x3b85e0(0x50c),_0x3b85e0(0x536),'AGI',_0x3b85e0(0x223)],_0x49212e=[_0x3b85e0(0x350),_0x3b85e0(0x5e4),_0x3b85e0(0x6db),_0x3b85e0(0x6a0),_0x3b85e0(0x6b7),_0x3b85e0(0x3ee),_0x3b85e0(0x27d),_0x3b85e0(0x1d1),_0x3b85e0(0x1a1),'TRG'],_0x4ec7dc=[_0x3b85e0(0x3ea),'GRD','REC',_0x3b85e0(0x5e6),_0x3b85e0(0x16e),_0x3b85e0(0x31a),'PDR',_0x3b85e0(0x49a),'FDR',_0x3b85e0(0x58c)],_0x3841bd=[_0x383976,_0x49212e,_0x4ec7dc],_0x459ae5=[_0x3b85e0(0x546),_0x3b85e0(0x4aa),_0x3b85e0(0x41a),_0x3b85e0(0x6cd),_0x3b85e0(0x70c),_0x3b85e0(0x36b),_0x3b85e0(0x59c),_0x3b85e0(0x35a),_0x3b85e0(0x587),'Flat2'];for(const _0x222301 of _0x3841bd){let _0x11c345='';if(_0x222301===_0x383976)_0x11c345=_0x3b85e0(0x427);if(_0x222301===_0x49212e)_0x11c345=_0x3b85e0(0x17e);if(_0x222301===_0x4ec7dc)_0x11c345=_0x3b85e0(0x55c);for(const _0x3f3f93 of _0x459ae5){let _0xd431ba=_0x3b85e0(0x25d)[_0x3b85e0(0x57c)](_0x11c345,_0x3f3f93);VisuMZ['CoreEngine'][_0x3b85e0(0x3bd)][_0xd431ba]=[],VisuMZ['CoreEngine'][_0x3b85e0(0x3bd)][_0xd431ba+'JS']=[];let _0x46bad9=_0x3b85e0(0x53a);if([_0x3b85e0(0x546),_0x3b85e0(0x35a)][_0x3b85e0(0x161)](_0x3f3f93))_0x46bad9+=_0x3b85e0(0x3e9);else{if([_0x3b85e0(0x4aa),_0x3b85e0(0x587)][_0x3b85e0(0x161)](_0x3f3f93))_0x46bad9+=_0x3b85e0(0x17b);else{if([_0x3b85e0(0x41a),'Flat2'][_0x3b85e0(0x161)](_0x3f3f93))_0x46bad9+='([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>';else{if(_0x3f3f93==='Max')_0x46bad9+=_0x3b85e0(0x510);else{if(_0x3f3f93===_0x3b85e0(0x36b))_0x46bad9+=_0x3b85e0(0x47f);else _0x3f3f93==='Rate2'&&(_0x46bad9+='(\x5cd+\x5c.?\x5cd+)>');}}}}for(const _0x3423b5 of _0x222301){let _0x4507a2=_0x3f3f93['replace'](/[\d+]/g,'')[_0x3b85e0(0x336)]();const _0x3dd8f7=_0x46bad9[_0x3b85e0(0x57c)](_0x3423b5,_0x4507a2);VisuMZ['CoreEngine']['RegExp'][_0xd431ba][_0x3b85e0(0x1fd)](new RegExp(_0x3dd8f7,'i'));const _0x41754b=_0x3b85e0(0x627)['format'](_0x3423b5,_0x4507a2);VisuMZ[_0x3b85e0(0x6b0)]['RegExp'][_0xd431ba+'JS'][_0x3b85e0(0x1fd)](new RegExp(_0x41754b,'i'));}}}},Scene_Boot[_0x195c22(0x4ec)]['process_VisuMZ_CoreEngine_Notetags']=function(){const _0x509a1b=_0x195c22;if(VisuMZ[_0x509a1b(0x447)])return;},Scene_Boot[_0x195c22(0x4ec)][_0x195c22(0x3e8)]=function(){const _0x904351=_0x195c22;VisuMZ[_0x904351(0x6b0)][_0x904351(0x3e5)][_0x904351(0x66d)][_0x904351(0x56c)]&&VisuMZ[_0x904351(0x5c8)](!![]);VisuMZ[_0x904351(0x6b0)][_0x904351(0x3e5)][_0x904351(0x66d)][_0x904351(0x680)]&&(Input[_0x904351(0x548)][0x23]=_0x904351(0x6e6),Input[_0x904351(0x548)][0x24]=_0x904351(0x5be));if(VisuMZ[_0x904351(0x6b0)]['Settings'][_0x904351(0x5d0)]){const _0x24c43b=VisuMZ[_0x904351(0x6b0)]['Settings'][_0x904351(0x5d0)];_0x24c43b['KeySHIFT']=_0x24c43b[_0x904351(0x68f)]||'\x5c}❪SHIFT❫\x5c{',_0x24c43b[_0x904351(0x580)]=_0x24c43b[_0x904351(0x580)]||_0x904351(0x353);}VisuMZ[_0x904351(0x6b0)]['Settings'][_0x904351(0x15b)][_0x904351(0x64e)]&&(Input[_0x904351(0x548)][0x57]='up',Input[_0x904351(0x548)][0x41]=_0x904351(0x4d3),Input[_0x904351(0x548)][0x53]=_0x904351(0x215),Input[_0x904351(0x548)][0x44]=_0x904351(0x6e4),Input[_0x904351(0x548)][0x45]=_0x904351(0x156)),VisuMZ[_0x904351(0x6b0)][_0x904351(0x3e5)]['KeyboardInput'][_0x904351(0x50d)]&&(Input[_0x904351(0x548)][0x52]=_0x904351(0x65f));},Scene_Boot[_0x195c22(0x4ec)]['process_VisuMZ_CoreEngine_Functions']=function(){const _0x3679db=_0x195c22;this[_0x3679db(0x66f)]();},Scene_Boot[_0x195c22(0x4ec)]['process_VisuMZ_CoreEngine_jsQuickFunctions']=function(){const _0x2ef0c9=_0x195c22,_0x4f5f7=VisuMZ['CoreEngine'][_0x2ef0c9(0x3e5)][_0x2ef0c9(0x280)];for(const _0x40b2c5 of _0x4f5f7){const _0x459013=_0x40b2c5[_0x2ef0c9(0x4c2)][_0x2ef0c9(0x196)](/[ ]/g,''),_0x439f06=_0x40b2c5[_0x2ef0c9(0x33e)];VisuMZ[_0x2ef0c9(0x6b0)][_0x2ef0c9(0x45f)](_0x459013,_0x439f06);}},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x45f)]=function(_0xcdd736,_0x578ba2){const _0x277bfb=_0x195c22;if(!!window[_0xcdd736]){if($gameTemp[_0x277bfb(0x681)]())console['log']('WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function'[_0x277bfb(0x57c)](_0xcdd736));}const _0x59c59d=_0x277bfb(0x451)['format'](_0xcdd736,_0x578ba2);window[_0xcdd736]=new Function(_0x59c59d);},Scene_Boot[_0x195c22(0x4ec)]['process_VisuMZ_CoreEngine_CustomParameters']=function(){const _0x58229e=_0x195c22,_0x4c731b=VisuMZ[_0x58229e(0x6b0)]['Settings'][_0x58229e(0x5ed)];if(!_0x4c731b)return;for(const _0x2183fa of _0x4c731b){if(!_0x2183fa)continue;VisuMZ['CoreEngine']['createCustomParameter'](_0x2183fa);}},VisuMZ['CoreEngine'][_0x195c22(0x57a)]={},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x2ef)]={},VisuMZ['CoreEngine']['CustomParamType']={},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x288)]={},VisuMZ[_0x195c22(0x6b0)]['createCustomParameter']=function(_0x539e06){const _0x27c975=_0x195c22,_0x37c5a9=_0x539e06[_0x27c975(0x2f6)],_0x659110=_0x539e06['ParamName'],_0x47e4b1=_0x539e06[_0x27c975(0x270)],_0x123956=_0x539e06[_0x27c975(0x653)],_0x66f766=new Function(_0x539e06[_0x27c975(0x6bb)]);VisuMZ[_0x27c975(0x6b0)][_0x27c975(0x57a)][_0x37c5a9[_0x27c975(0x336)]()['trim']()]=_0x659110,VisuMZ[_0x27c975(0x6b0)][_0x27c975(0x2ef)][_0x37c5a9[_0x27c975(0x336)]()['trim']()]=_0x47e4b1,VisuMZ[_0x27c975(0x6b0)][_0x27c975(0x2cd)][_0x37c5a9[_0x27c975(0x336)]()['trim']()]=_0x123956,VisuMZ[_0x27c975(0x6b0)][_0x27c975(0x288)][_0x37c5a9[_0x27c975(0x336)]()['trim']()]=_0x37c5a9,Object[_0x27c975(0x3fb)](Game_BattlerBase[_0x27c975(0x4ec)],_0x37c5a9,{'get'(){const _0x3ec841=_0x27c975,_0x14659a=_0x66f766[_0x3ec841(0x48a)](this);return _0x123956===_0x3ec841(0x475)?Math[_0x3ec841(0x643)](_0x14659a):_0x14659a;}});},VisuMZ[_0x195c22(0x447)]=function(){const _0x158674=_0x195c22;for(const _0x2f23b3 of $dataActors){if(_0x2f23b3)VisuMZ[_0x158674(0x3b8)](_0x2f23b3);}for(const _0x565fe0 of $dataClasses){if(_0x565fe0)VisuMZ['ParseClassNotetags'](_0x565fe0);}for(const _0x43ccf8 of $dataSkills){if(_0x43ccf8)VisuMZ['ParseSkillNotetags'](_0x43ccf8);}for(const _0x2d0f7a of $dataItems){if(_0x2d0f7a)VisuMZ['ParseItemNotetags'](_0x2d0f7a);}for(const _0x4d68dc of $dataWeapons){if(_0x4d68dc)VisuMZ[_0x158674(0x307)](_0x4d68dc);}for(const _0x369dfa of $dataArmors){if(_0x369dfa)VisuMZ['ParseArmorNotetags'](_0x369dfa);}for(const _0x283812 of $dataEnemies){if(_0x283812)VisuMZ[_0x158674(0x439)](_0x283812);}for(const _0x34e8ab of $dataStates){if(_0x34e8ab)VisuMZ[_0x158674(0x519)](_0x34e8ab);}for(const _0x3b3b34 of $dataTilesets){if(_0x3b3b34)VisuMZ[_0x158674(0x32e)](_0x3b3b34);}},VisuMZ[_0x195c22(0x3b8)]=function(_0x12d1e5){},VisuMZ[_0x195c22(0x1c0)]=function(_0xae6904){},VisuMZ['ParseSkillNotetags']=function(_0xce5404){},VisuMZ[_0x195c22(0x47c)]=function(_0x18efa4){},VisuMZ[_0x195c22(0x307)]=function(_0x52ec6e){},VisuMZ[_0x195c22(0x5ef)]=function(_0x387776){},VisuMZ['ParseEnemyNotetags']=function(_0x3e717e){},VisuMZ['ParseStateNotetags']=function(_0x3c040f){},VisuMZ[_0x195c22(0x32e)]=function(_0x1c4703){},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x3b8)]=VisuMZ[_0x195c22(0x3b8)],VisuMZ[_0x195c22(0x3b8)]=function(_0x437c63){const _0x4018d9=_0x195c22;VisuMZ['CoreEngine'][_0x4018d9(0x3b8)][_0x4018d9(0x48a)](this,_0x437c63);const _0x195fe8=_0x437c63[_0x4018d9(0x612)];if(_0x195fe8['match'](/<MAX LEVEL:[ ](\d+)>/i)){_0x437c63[_0x4018d9(0x2e3)]=Number(RegExp['$1']);if(_0x437c63[_0x4018d9(0x2e3)]===0x0)_0x437c63['maxLevel']=Number[_0x4018d9(0x6f1)];}_0x195fe8[_0x4018d9(0x5b6)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x437c63[_0x4018d9(0x406)]=Math[_0x4018d9(0x29d)](Number(RegExp['$1']),_0x437c63[_0x4018d9(0x2e3)]));},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x1c0)]=VisuMZ[_0x195c22(0x1c0)],VisuMZ[_0x195c22(0x1c0)]=function(_0x17eeb6){const _0xe7a5dd=_0x195c22;VisuMZ[_0xe7a5dd(0x6b0)][_0xe7a5dd(0x1c0)][_0xe7a5dd(0x48a)](this,_0x17eeb6);if(_0x17eeb6[_0xe7a5dd(0x1ed)])for(const _0x2213ff of _0x17eeb6[_0xe7a5dd(0x1ed)]){_0x2213ff[_0xe7a5dd(0x612)][_0xe7a5dd(0x5b6)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x2213ff['level']=Math[_0xe7a5dd(0x20e)](Number(RegExp['$1']),0x1));}},VisuMZ['CoreEngine'][_0x195c22(0x439)]=VisuMZ['ParseEnemyNotetags'],VisuMZ[_0x195c22(0x439)]=function(_0x14c0ae){const _0x297bf1=_0x195c22;VisuMZ['CoreEngine']['ParseEnemyNotetags'][_0x297bf1(0x48a)](this,_0x14c0ae),_0x14c0ae[_0x297bf1(0x202)]=0x1;const _0x39962a=_0x14c0ae[_0x297bf1(0x612)];if(_0x39962a[_0x297bf1(0x5b6)](/<LEVEL:[ ](\d+)>/i))_0x14c0ae[_0x297bf1(0x202)]=Number(RegExp['$1']);if(_0x39962a[_0x297bf1(0x5b6)](/<MAXHP:[ ](\d+)>/i))_0x14c0ae[_0x297bf1(0x69e)][0x0]=Number(RegExp['$1']);if(_0x39962a[_0x297bf1(0x5b6)](/<MAXMP:[ ](\d+)>/i))_0x14c0ae[_0x297bf1(0x69e)][0x1]=Number(RegExp['$1']);if(_0x39962a[_0x297bf1(0x5b6)](/<ATK:[ ](\d+)>/i))_0x14c0ae[_0x297bf1(0x69e)][0x2]=Number(RegExp['$1']);if(_0x39962a[_0x297bf1(0x5b6)](/<DEF:[ ](\d+)>/i))_0x14c0ae['params'][0x3]=Number(RegExp['$1']);if(_0x39962a[_0x297bf1(0x5b6)](/<MAT:[ ](\d+)>/i))_0x14c0ae[_0x297bf1(0x69e)][0x4]=Number(RegExp['$1']);if(_0x39962a[_0x297bf1(0x5b6)](/<MDF:[ ](\d+)>/i))_0x14c0ae[_0x297bf1(0x69e)][0x5]=Number(RegExp['$1']);if(_0x39962a[_0x297bf1(0x5b6)](/<AGI:[ ](\d+)>/i))_0x14c0ae[_0x297bf1(0x69e)][0x6]=Number(RegExp['$1']);if(_0x39962a[_0x297bf1(0x5b6)](/<LUK:[ ](\d+)>/i))_0x14c0ae[_0x297bf1(0x69e)][0x7]=Number(RegExp['$1']);if(_0x39962a[_0x297bf1(0x5b6)](/<EXP:[ ](\d+)>/i))_0x14c0ae[_0x297bf1(0x6d8)]=Number(RegExp['$1']);if(_0x39962a[_0x297bf1(0x5b6)](/<GOLD:[ ](\d+)>/i))_0x14c0ae['gold']=Number(RegExp['$1']);},VisuMZ[_0x195c22(0x6b0)]['Graphics_defaultStretchMode']=Graphics[_0x195c22(0x4ca)],Graphics[_0x195c22(0x4ca)]=function(){const _0x345cd7=_0x195c22;switch(VisuMZ[_0x345cd7(0x6b0)][_0x345cd7(0x3e5)][_0x345cd7(0x66d)][_0x345cd7(0x344)]){case _0x345cd7(0x5c2):return!![];case'normal':return![];default:return VisuMZ['CoreEngine'][_0x345cd7(0x2f3)]['call'](this);}},VisuMZ['CoreEngine'][_0x195c22(0x4e2)]=Graphics[_0x195c22(0x1dd)],Graphics[_0x195c22(0x1dd)]=function(_0x35388f,_0x376b2d,_0x2050d3=null){const _0x4b40b1=_0x195c22;VisuMZ['CoreEngine'][_0x4b40b1(0x4e2)][_0x4b40b1(0x48a)](this,_0x35388f,_0x376b2d,_0x2050d3),VisuMZ[_0x4b40b1(0x5c8)](![]);},VisuMZ[_0x195c22(0x6b0)]['Graphics_centerElement']=Graphics['_centerElement'],Graphics[_0x195c22(0x592)]=function(_0x57ae7f){const _0x130135=_0x195c22;VisuMZ['CoreEngine'][_0x130135(0x6d3)]['call'](this,_0x57ae7f),this[_0x130135(0x694)](_0x57ae7f);},Graphics[_0x195c22(0x694)]=function(_0xa44f1e){const _0x232153=_0x195c22;VisuMZ[_0x232153(0x6b0)][_0x232153(0x3e5)][_0x232153(0x66d)][_0x232153(0x185)]&&(_0xa44f1e[_0x232153(0x4cc)][_0x232153(0x513)]='none');VisuMZ['CoreEngine'][_0x232153(0x3e5)][_0x232153(0x66d)][_0x232153(0x5c7)]&&(_0xa44f1e['style'][_0x232153(0x286)]=_0x232153(0x1be));const _0x3367a1=Math['max'](0x0,Math['floor'](_0xa44f1e[_0x232153(0x686)]*this['_realScale'])),_0x280aef=Math[_0x232153(0x20e)](0x0,Math[_0x232153(0x644)](_0xa44f1e[_0x232153(0x466)]*this[_0x232153(0x184)]));_0xa44f1e[_0x232153(0x4cc)][_0x232153(0x686)]=_0x3367a1+'px',_0xa44f1e[_0x232153(0x4cc)]['height']=_0x280aef+'px';},Bitmap[_0x195c22(0x4ec)][_0x195c22(0x462)]=function(){const _0x3c4d8f=_0x195c22;this[_0x3c4d8f(0x375)]=!![];},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x62a)]=Sprite[_0x195c22(0x4ec)][_0x195c22(0x502)],Sprite['prototype']['destroy']=function(){const _0x3f0ce2=_0x195c22;VisuMZ[_0x3f0ce2(0x6b0)][_0x3f0ce2(0x62a)]['call'](this),this['destroyCoreEngineMarkedBitmaps']();},Sprite[_0x195c22(0x4ec)]['destroyCoreEngineMarkedBitmaps']=function(){const _0x4f0e31=_0x195c22;if(!this['bitmap'])return;if(!this[_0x4f0e31(0x209)][_0x4f0e31(0x375)])return;this[_0x4f0e31(0x209)]['_baseTexture']&&!this['_bitmap'][_0x4f0e31(0x556)][_0x4f0e31(0x691)]&&this['bitmap'][_0x4f0e31(0x502)]();},VisuMZ['CoreEngine'][_0x195c22(0x31d)]=Bitmap[_0x195c22(0x4ec)][_0x195c22(0x29c)],Bitmap[_0x195c22(0x4ec)][_0x195c22(0x29c)]=function(_0xc8a8a1,_0x3d9b7b){const _0x2d2e7a=_0x195c22;VisuMZ[_0x2d2e7a(0x6b0)][_0x2d2e7a(0x31d)][_0x2d2e7a(0x48a)](this,_0xc8a8a1,_0x3d9b7b),this[_0x2d2e7a(0x462)]();},VisuMZ[_0x195c22(0x6b0)]['Bitmap_blt']=Bitmap[_0x195c22(0x4ec)][_0x195c22(0x68a)],Bitmap[_0x195c22(0x4ec)][_0x195c22(0x68a)]=function(_0x13a5fa,_0x171a43,_0x222fb0,_0x21c638,_0x5e5a3b,_0x174b97,_0x43acb2,_0x50826d,_0x5e9324){const _0x51215a=_0x195c22;VisuMZ[_0x51215a(0x6b0)][_0x51215a(0x1e9)][_0x51215a(0x48a)](this,_0x13a5fa,_0x171a43,_0x222fb0,_0x21c638,_0x5e5a3b,_0x174b97,_0x43acb2,_0x50826d,_0x5e9324),this[_0x51215a(0x462)]();},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x472)]=Bitmap['prototype'][_0x195c22(0x293)],Bitmap['prototype'][_0x195c22(0x293)]=function(_0x40b2a1,_0x59b0d3,_0x5b38b2,_0x24402b){const _0x35affe=_0x195c22;VisuMZ['CoreEngine'][_0x35affe(0x472)][_0x35affe(0x48a)](this,_0x40b2a1,_0x59b0d3,_0x5b38b2,_0x24402b),this[_0x35affe(0x462)]();},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x29b)]=Bitmap['prototype'][_0x195c22(0x6e1)],Bitmap[_0x195c22(0x4ec)][_0x195c22(0x6e1)]=function(_0x3a3174,_0x582209,_0x5d9910,_0x510d0e,_0x3aa08d){const _0x11ab2c=_0x195c22;VisuMZ[_0x11ab2c(0x6b0)]['Bitmap_fillRect'][_0x11ab2c(0x48a)](this,_0x3a3174,_0x582209,_0x5d9910,_0x510d0e,_0x3aa08d),this[_0x11ab2c(0x462)]();},VisuMZ[_0x195c22(0x6b0)]['Bitmap_strokeRect']=Bitmap[_0x195c22(0x4ec)][_0x195c22(0x693)],Bitmap['prototype']['strokeRect']=function(_0x4b0136,_0x18ba85,_0x7b02b3,_0x6b7745,_0x350f97){const _0x28da55=_0x195c22;VisuMZ['CoreEngine'][_0x28da55(0x1c1)]['call'](this,_0x4b0136,_0x18ba85,_0x7b02b3,_0x6b7745,_0x350f97),this[_0x28da55(0x462)]();},VisuMZ['CoreEngine'][_0x195c22(0x1a2)]=Bitmap[_0x195c22(0x4ec)][_0x195c22(0x374)],Bitmap[_0x195c22(0x4ec)][_0x195c22(0x374)]=function(_0x1f35be,_0x5a354f,_0x1f4473,_0x3fd174,_0xc45d66,_0x2a2e90,_0x1a3b94){const _0x457076=_0x195c22;VisuMZ[_0x457076(0x6b0)][_0x457076(0x1a2)][_0x457076(0x48a)](this,_0x1f35be,_0x5a354f,_0x1f4473,_0x3fd174,_0xc45d66,_0x2a2e90,_0x1a3b94),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0x195c22(0x5d1)]=Bitmap[_0x195c22(0x4ec)][_0x195c22(0x620)],Bitmap['prototype']['drawCircle']=function(_0x21d6dc,_0x4cabfd,_0x2fd1b0,_0x569c76){const _0x12ed3d=_0x195c22;_0x21d6dc=Math['round'](_0x21d6dc),_0x4cabfd=Math['round'](_0x4cabfd),_0x2fd1b0=Math[_0x12ed3d(0x643)](_0x2fd1b0),VisuMZ[_0x12ed3d(0x6b0)][_0x12ed3d(0x5d1)][_0x12ed3d(0x48a)](this,_0x21d6dc,_0x4cabfd,_0x2fd1b0,_0x569c76),this[_0x12ed3d(0x462)]();},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x567)]=Bitmap[_0x195c22(0x4ec)][_0x195c22(0x369)],Bitmap[_0x195c22(0x4ec)][_0x195c22(0x369)]=function(_0x4ae0db){const _0x4e0de5=_0x195c22;return Math[_0x4e0de5(0x643)](VisuMZ['CoreEngine']['Bitmap_measureTextWidth'][_0x4e0de5(0x48a)](this,_0x4ae0db));},VisuMZ[_0x195c22(0x6b0)]['Bitmap_drawText']=Bitmap[_0x195c22(0x4ec)][_0x195c22(0x4f9)],Bitmap['prototype'][_0x195c22(0x4f9)]=function(_0x44b519,_0x4f8ef9,_0x4ce376,_0x3dc19e,_0x430c81,_0x5cc891){const _0x53caf9=_0x195c22;_0x4f8ef9=Math['round'](_0x4f8ef9),_0x4ce376=Math[_0x53caf9(0x643)](_0x4ce376),_0x3dc19e=Math[_0x53caf9(0x643)](_0x3dc19e),_0x430c81=Math[_0x53caf9(0x643)](_0x430c81),VisuMZ[_0x53caf9(0x6b0)][_0x53caf9(0x6d0)][_0x53caf9(0x48a)](this,_0x44b519,_0x4f8ef9,_0x4ce376,_0x3dc19e,_0x430c81,_0x5cc891),this['markCoreEngineModified']();},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x660)]=Bitmap[_0x195c22(0x4ec)][_0x195c22(0x5b9)],Bitmap[_0x195c22(0x4ec)]['_drawTextOutline']=function(_0x20cd16,_0x6f086,_0x507bb6,_0x41b33a){const _0xcd7e03=_0x195c22;VisuMZ['CoreEngine'][_0xcd7e03(0x3e5)][_0xcd7e03(0x66d)][_0xcd7e03(0x27f)]?this[_0xcd7e03(0x3dc)](_0x20cd16,_0x6f086,_0x507bb6,_0x41b33a):VisuMZ[_0xcd7e03(0x6b0)][_0xcd7e03(0x660)][_0xcd7e03(0x48a)](this,_0x20cd16,_0x6f086,_0x507bb6,_0x41b33a);},Bitmap[_0x195c22(0x4ec)]['_drawTextShadow']=function(_0x25dc19,_0xf463b4,_0x1e54cc,_0x3dbb6d){const _0x628a80=_0x195c22,_0x25abcd=this[_0x628a80(0x2d3)];_0x25abcd[_0x628a80(0x4fd)]=this['outlineColor'],_0x25abcd[_0x628a80(0x44d)](_0x25dc19,_0xf463b4+0x2,_0x1e54cc+0x2,_0x3dbb6d);},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x354)]=Input['clear'],Input['clear']=function(){const _0x3bc428=_0x195c22;VisuMZ[_0x3bc428(0x6b0)][_0x3bc428(0x354)][_0x3bc428(0x48a)](this),this['_inputString']=undefined,this[_0x3bc428(0x64d)]=undefined,this[_0x3bc428(0x481)]=Input[_0x3bc428(0x2df)];},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x667)]=Input[_0x195c22(0x684)],Input[_0x195c22(0x684)]=function(){const _0x540dbb=_0x195c22;VisuMZ[_0x540dbb(0x6b0)]['Input_update'][_0x540dbb(0x48a)](this);if(this[_0x540dbb(0x481)])this[_0x540dbb(0x481)]--;},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x598)]=Input['_pollGamepads'],Input[_0x195c22(0x24b)]=function(){const _0x5d5ab7=_0x195c22;if(this[_0x5d5ab7(0x481)])return;VisuMZ[_0x5d5ab7(0x6b0)]['Input_pollGamepads'][_0x5d5ab7(0x48a)](this);},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x32a)]=Input[_0x195c22(0x3bc)],Input[_0x195c22(0x3bc)]=function(){const _0x58925b=_0x195c22;VisuMZ[_0x58925b(0x6b0)]['Input_setupEventHandlers'][_0x58925b(0x48a)](this),document[_0x58925b(0x2aa)](_0x58925b(0x6d1),this['_onKeyPress'][_0x58925b(0x70a)](this));},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x386)]=Input[_0x195c22(0x25e)],Input[_0x195c22(0x25e)]=function(_0xc51f75){const _0x263727=_0x195c22;this['_inputSpecialKeyCode']=_0xc51f75[_0x263727(0x453)],VisuMZ['CoreEngine'][_0x263727(0x386)][_0x263727(0x48a)](this,_0xc51f75);},Input[_0x195c22(0x449)]=function(_0x4adbd9){this['_registerKeyInput'](_0x4adbd9);},Input['_registerKeyInput']=function(_0x3a2027){const _0xd3a03e=_0x195c22;this[_0xd3a03e(0x64d)]=_0x3a2027['keyCode'];let _0x41c318=String[_0xd3a03e(0x419)](_0x3a2027[_0xd3a03e(0x27b)]);this[_0xd3a03e(0x3ca)]===undefined?this[_0xd3a03e(0x3ca)]=_0x41c318:this[_0xd3a03e(0x3ca)]+=_0x41c318;},VisuMZ['CoreEngine'][_0x195c22(0x3d8)]=Input[_0x195c22(0x32d)],Input[_0x195c22(0x32d)]=function(_0x43ed7a){const _0x5ceb32=_0x195c22;if(_0x43ed7a===0x8)return![];return VisuMZ[_0x5ceb32(0x6b0)][_0x5ceb32(0x3d8)][_0x5ceb32(0x48a)](this,_0x43ed7a);},Input[_0x195c22(0x2fd)]=function(_0x46a40c){const _0x5868c1=_0x195c22;if(_0x46a40c[_0x5868c1(0x5b6)](/backspace/i))return this[_0x5868c1(0x64d)]===0x8;if(_0x46a40c['match'](/enter/i))return this[_0x5868c1(0x64d)]===0xd;if(_0x46a40c['match'](/escape/i))return this[_0x5868c1(0x64d)]===0x1b;},Input[_0x195c22(0x448)]=function(){const _0x2c074e=_0x195c22;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this[_0x2c074e(0x64d)]);},Input[_0x195c22(0x60b)]=function(){const _0x390057=_0x195c22;return[0x25,0x26,0x27,0x28][_0x390057(0x521)](this[_0x390057(0x64d)]);},Input[_0x195c22(0x1ea)]=function(){const _0x327e69=_0x195c22;if(navigator[_0x327e69(0x177)]){const _0x174fbe=navigator['getGamepads']();if(_0x174fbe)for(const _0x5f08e7 of _0x174fbe){if(_0x5f08e7&&_0x5f08e7[_0x327e69(0x21f)])return!![];}}return![];},Input[_0x195c22(0x623)]=function(){const _0xa75606=_0x195c22;if(navigator['getGamepads']){const _0x10a02d=navigator[_0xa75606(0x177)]();if(_0x10a02d)for(const _0x14158e of _0x10a02d){if(_0x14158e&&_0x14158e[_0xa75606(0x21f)]){if(this[_0xa75606(0x651)](_0x14158e))return!![];}}}return![];},Input['isGamepadButtonPressed']=function(_0x493332){const _0x3ac2f0=_0x195c22,_0x35591f=_0x493332['buttons'];for(let _0x394aa0=0x0;_0x394aa0<_0x35591f[_0x3ac2f0(0x397)];_0x394aa0++){if(_0x35591f[_0x394aa0]['pressed'])return!![];}return![];},VisuMZ['CoreEngine'][_0x195c22(0x593)]=Tilemap[_0x195c22(0x4ec)][_0x195c22(0x59b)],Tilemap[_0x195c22(0x4ec)][_0x195c22(0x59b)]=function(_0x25cdfc,_0x24dee5,_0x3c974a,_0x4f8bd2){const _0x51bc59=_0x195c22;if($gameMap&&$gameMap[_0x51bc59(0x14e)]())return;VisuMZ[_0x51bc59(0x6b0)][_0x51bc59(0x593)][_0x51bc59(0x48a)](this,_0x25cdfc,_0x24dee5,_0x3c974a,_0x4f8bd2);},Tilemap[_0x195c22(0x57e)]['prototype'][_0x195c22(0x65a)]=function(){const _0x20af32=_0x195c22;this[_0x20af32(0x2d5)]();for(let _0x1fd210=0x0;_0x1fd210<Tilemap[_0x20af32(0x2ae)]['MAX_GL_TEXTURES'];_0x1fd210++){const _0x3d859a=new PIXI[(_0x20af32(0x54b))]();_0x3d859a[_0x20af32(0x412)](0x800,0x800),VisuMZ['CoreEngine'][_0x20af32(0x3e5)][_0x20af32(0x66d)][_0x20af32(0x5c7)]&&(_0x3d859a['scaleMode']=PIXI[_0x20af32(0x1b0)][_0x20af32(0x1d8)]),this[_0x20af32(0x2b5)][_0x20af32(0x1fd)](_0x3d859a);}},WindowLayer[_0x195c22(0x4ec)]['isMaskingEnabled']=function(){const _0x56c253=_0x195c22;return SceneManager&&SceneManager[_0x56c253(0x60d)]?SceneManager['_scene']['isWindowMaskingEnabled']():!![];},VisuMZ['CoreEngine'][_0x195c22(0x61a)]=WindowLayer[_0x195c22(0x4ec)][_0x195c22(0x1c2)],WindowLayer[_0x195c22(0x4ec)][_0x195c22(0x1c2)]=function render(_0x19cf94){const _0x59b99e=_0x195c22;this[_0x59b99e(0x483)]()?VisuMZ[_0x59b99e(0x6b0)][_0x59b99e(0x61a)][_0x59b99e(0x48a)](this,_0x19cf94):this[_0x59b99e(0x1fa)](_0x19cf94);},WindowLayer[_0x195c22(0x4ec)][_0x195c22(0x1fa)]=function render(_0x4d2f73){const _0x4a8a36=_0x195c22;if(!this['visible'])return;const _0x386b76=new PIXI['Graphics'](),_0xf74b63=_0x4d2f73['gl'],_0x16528a=this[_0x4a8a36(0x39f)][_0x4a8a36(0x181)]();_0x4d2f73[_0x4a8a36(0x226)][_0x4a8a36(0x2d0)](),_0x386b76[_0x4a8a36(0x3a4)]=this['transform'],_0x4d2f73[_0x4a8a36(0x438)][_0x4a8a36(0x5ff)](),_0xf74b63['enable'](_0xf74b63[_0x4a8a36(0x22e)]);while(_0x16528a['length']>0x0){const _0x2eafc5=_0x16528a[_0x4a8a36(0x6d2)]();_0x2eafc5[_0x4a8a36(0x50b)]&&_0x2eafc5['visible']&&_0x2eafc5[_0x4a8a36(0x431)]>0x0&&(_0xf74b63[_0x4a8a36(0x709)](_0xf74b63[_0x4a8a36(0x632)],0x0,~0x0),_0xf74b63[_0x4a8a36(0x3dd)](_0xf74b63[_0x4a8a36(0x3de)],_0xf74b63[_0x4a8a36(0x3de)],_0xf74b63[_0x4a8a36(0x3de)]),_0x2eafc5['render'](_0x4d2f73),_0x4d2f73[_0x4a8a36(0x438)][_0x4a8a36(0x5ff)](),_0x386b76[_0x4a8a36(0x29a)](),_0xf74b63[_0x4a8a36(0x709)](_0xf74b63[_0x4a8a36(0x6a7)],0x1,~0x0),_0xf74b63[_0x4a8a36(0x3dd)](_0xf74b63[_0x4a8a36(0x67c)],_0xf74b63[_0x4a8a36(0x67c)],_0xf74b63[_0x4a8a36(0x67c)]),_0xf74b63[_0x4a8a36(0x3a0)](_0xf74b63[_0x4a8a36(0x291)],_0xf74b63[_0x4a8a36(0x6c5)]),_0x386b76[_0x4a8a36(0x1c2)](_0x4d2f73),_0x4d2f73['batch'][_0x4a8a36(0x5ff)](),_0xf74b63[_0x4a8a36(0x3a0)](_0xf74b63[_0x4a8a36(0x6c5)],_0xf74b63[_0x4a8a36(0x3a5)]));}_0xf74b63['disable'](_0xf74b63[_0x4a8a36(0x22e)]),_0xf74b63[_0x4a8a36(0x29a)](_0xf74b63['STENCIL_BUFFER_BIT']),_0xf74b63[_0x4a8a36(0x4a6)](0x0),_0x4d2f73[_0x4a8a36(0x438)][_0x4a8a36(0x5ff)]();for(const _0x37e849 of this[_0x4a8a36(0x39f)]){!_0x37e849[_0x4a8a36(0x50b)]&&_0x37e849['visible']&&_0x37e849['render'](_0x4d2f73);}_0x4d2f73[_0x4a8a36(0x438)]['flush']();},DataManager[_0x195c22(0x18b)]=function(_0xafd51){const _0x4ed8c7=_0x195c22;return this[_0x4ed8c7(0x294)](_0xafd51)&&_0xafd51[_0x4ed8c7(0x43b)]===0x2;},VisuMZ['CoreEngine']['DataManager_setupNewGame']=DataManager[_0x195c22(0x18a)],DataManager[_0x195c22(0x18a)]=function(){const _0x1ae854=_0x195c22;VisuMZ[_0x1ae854(0x6b0)][_0x1ae854(0x670)]['call'](this),this[_0x1ae854(0x528)](),this[_0x1ae854(0x237)]();},DataManager[_0x195c22(0x528)]=function(){const _0x44510c=_0x195c22;if($gameTemp[_0x44510c(0x681)]()){const _0x1ea66f=VisuMZ[_0x44510c(0x6b0)][_0x44510c(0x3e5)]['QoL'][_0x44510c(0x54e)];if(_0x1ea66f>0x0)$gameTemp[_0x44510c(0x1b5)](_0x1ea66f);}},DataManager[_0x195c22(0x237)]=function(){const _0x2273df=_0x195c22,_0x329c50=VisuMZ[_0x2273df(0x6b0)][_0x2273df(0x3e5)][_0x2273df(0x66d)][_0x2273df(0x56b)]||0x0;if(_0x329c50>0x0)$gameTemp[_0x2273df(0x1b5)](_0x329c50);},TextManager[_0x195c22(0x28a)]=['','','',_0x195c22(0x37c),'','',_0x195c22(0x701),'',_0x195c22(0x534),'TAB','','',_0x195c22(0x401),_0x195c22(0x44b),_0x195c22(0x347),'',_0x195c22(0x2e4),'CTRL','ALT','PAUSE','CAPSLOCK','KANA',_0x195c22(0x308),_0x195c22(0x5ae),'FINAL',_0x195c22(0x20d),'',_0x195c22(0x1d9),_0x195c22(0x37f),'NONCONVERT',_0x195c22(0x540),_0x195c22(0x327),_0x195c22(0x5ea),_0x195c22(0x4a9),'PGDN','END','HOME',_0x195c22(0x3ac),'UP',_0x195c22(0x5a7),'DOWN','SELECT',_0x195c22(0x3f6),_0x195c22(0x6a9),_0x195c22(0x183),_0x195c22(0x4ab),_0x195c22(0x158),'','0','1','2','3','4','5','6','7','8','9','COLON',_0x195c22(0x564),_0x195c22(0x497),_0x195c22(0x176),_0x195c22(0x3c5),'QUESTION_MARK','AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','OS_KEY','','CONTEXT_MENU','',_0x195c22(0x222),_0x195c22(0x3df),'NUMPAD1',_0x195c22(0x193),_0x195c22(0x57d),'NUMPAD4',_0x195c22(0x21b),_0x195c22(0x1e3),_0x195c22(0x21e),_0x195c22(0x5ce),_0x195c22(0x65e),_0x195c22(0x575),'ADD',_0x195c22(0x494),'SUBTRACT','DECIMAL',_0x195c22(0x5a5),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x195c22(0x6ce),_0x195c22(0x3cc),_0x195c22(0x2d2),_0x195c22(0x3c2),_0x195c22(0x3d4),_0x195c22(0x265),_0x195c22(0x698),_0x195c22(0x3aa),'F18','F19',_0x195c22(0x349),_0x195c22(0x2a9),_0x195c22(0x504),'F23','F24','','','','','','','','',_0x195c22(0x190),_0x195c22(0x376),_0x195c22(0x6ab),_0x195c22(0x282),_0x195c22(0x3ab),_0x195c22(0x5f9),_0x195c22(0x5de),'','','','','','','','','',_0x195c22(0x4a5),_0x195c22(0x51f),'DOUBLE_QUOTE',_0x195c22(0x704),_0x195c22(0x6af),_0x195c22(0x577),'AMPERSAND','UNDERSCORE',_0x195c22(0x164),_0x195c22(0x1f0),_0x195c22(0x325),_0x195c22(0x6b5),'PIPE','HYPHEN_MINUS','OPEN_CURLY_BRACKET',_0x195c22(0x661),_0x195c22(0x3f3),'','','','',_0x195c22(0x35f),_0x195c22(0x3b2),_0x195c22(0x4c6),'','','SEMICOLON','EQUALS',_0x195c22(0x5a2),_0x195c22(0x588),'PERIOD',_0x195c22(0x676),'BACK_QUOTE','','','','','','','','','','','','','','','','','','','','','','','','','','',_0x195c22(0x37b),_0x195c22(0x155),_0x195c22(0x4d4),_0x195c22(0x597),'','META','ALTGR','',_0x195c22(0x159),_0x195c22(0x67d),'',_0x195c22(0x30b),'','',_0x195c22(0x61c),_0x195c22(0x162),'WIN_OEM_PA1','WIN_OEM_PA2','WIN_OEM_PA3',_0x195c22(0x311),_0x195c22(0x4d5),_0x195c22(0x4e9),_0x195c22(0x188),_0x195c22(0x18f),_0x195c22(0x488),_0x195c22(0x70b),_0x195c22(0x199),_0x195c22(0x2d1),'CRSEL',_0x195c22(0x221),'EREOF',_0x195c22(0x5c4),_0x195c22(0x331),'',_0x195c22(0x2f9),_0x195c22(0x33f),''],TextManager[_0x195c22(0x465)]=VisuMZ['CoreEngine'][_0x195c22(0x3e5)][_0x195c22(0x5d0)][_0x195c22(0x45b)],TextManager[_0x195c22(0x69b)]=VisuMZ[_0x195c22(0x6b0)]['Settings']['ButtonAssist'][_0x195c22(0x326)],TextManager[_0x195c22(0x389)]=VisuMZ['CoreEngine']['Settings'][_0x195c22(0x5d0)][_0x195c22(0x3c7)],VisuMZ['CoreEngine'][_0x195c22(0x242)]=TextManager[_0x195c22(0x427)],TextManager[_0x195c22(0x427)]=function(_0x5a3a98){const _0x3dec88=_0x195c22;return typeof _0x5a3a98===_0x3dec88(0x425)?VisuMZ[_0x3dec88(0x6b0)]['TextManager_param'][_0x3dec88(0x48a)](this,_0x5a3a98):this['paramName'](_0x5a3a98);},TextManager['paramName']=function(_0x228674){const _0x3dee88=_0x195c22;_0x228674=String(_0x228674||'')['toUpperCase']();const _0x3559d2=VisuMZ[_0x3dee88(0x6b0)][_0x3dee88(0x3e5)][_0x3dee88(0x244)];if(_0x228674===_0x3dee88(0x712))return $dataSystem[_0x3dee88(0x5f8)][_0x3dee88(0x69e)][0x0];if(_0x228674===_0x3dee88(0x633))return $dataSystem[_0x3dee88(0x5f8)][_0x3dee88(0x69e)][0x1];if(_0x228674===_0x3dee88(0x337))return $dataSystem[_0x3dee88(0x5f8)]['params'][0x2];if(_0x228674===_0x3dee88(0x5f5))return $dataSystem[_0x3dee88(0x5f8)][_0x3dee88(0x69e)][0x3];if(_0x228674===_0x3dee88(0x50c))return $dataSystem[_0x3dee88(0x5f8)]['params'][0x4];if(_0x228674===_0x3dee88(0x536))return $dataSystem[_0x3dee88(0x5f8)]['params'][0x5];if(_0x228674==='AGI')return $dataSystem['terms'][_0x3dee88(0x69e)][0x6];if(_0x228674===_0x3dee88(0x223))return $dataSystem['terms']['params'][0x7];if(_0x228674===_0x3dee88(0x350))return _0x3559d2[_0x3dee88(0x6b8)];if(_0x228674===_0x3dee88(0x5e4))return _0x3559d2[_0x3dee88(0x696)];if(_0x228674==='CRI')return _0x3559d2['XParamVocab2'];if(_0x228674==='CEV')return _0x3559d2[_0x3dee88(0x324)];if(_0x228674===_0x3dee88(0x6b7))return _0x3559d2['XParamVocab4'];if(_0x228674===_0x3dee88(0x3ee))return _0x3559d2[_0x3dee88(0x46f)];if(_0x228674==='CNT')return _0x3559d2[_0x3dee88(0x241)];if(_0x228674==='HRG')return _0x3559d2[_0x3dee88(0x34c)];if(_0x228674==='MRG')return _0x3559d2[_0x3dee88(0x218)];if(_0x228674==='TRG')return _0x3559d2[_0x3dee88(0x4d8)];if(_0x228674===_0x3dee88(0x3ea))return _0x3559d2[_0x3dee88(0x1e4)];if(_0x228674===_0x3dee88(0x35e))return _0x3559d2[_0x3dee88(0x1a8)];if(_0x228674===_0x3dee88(0x1d5))return _0x3559d2[_0x3dee88(0x672)];if(_0x228674===_0x3dee88(0x5e6))return _0x3559d2['SParamVocab3'];if(_0x228674===_0x3dee88(0x16e))return _0x3559d2[_0x3dee88(0x15d)];if(_0x228674===_0x3dee88(0x31a))return _0x3559d2[_0x3dee88(0x38e)];if(_0x228674===_0x3dee88(0x410))return _0x3559d2[_0x3dee88(0x2f7)];if(_0x228674===_0x3dee88(0x49a))return _0x3559d2[_0x3dee88(0x228)];if(_0x228674===_0x3dee88(0x232))return _0x3559d2['SParamVocab8'];if(_0x228674===_0x3dee88(0x58c))return _0x3559d2[_0x3dee88(0x5b5)];if(VisuMZ['CoreEngine'][_0x3dee88(0x57a)][_0x228674])return VisuMZ[_0x3dee88(0x6b0)]['CustomParamNames'][_0x228674];return'';},TextManager[_0x195c22(0x28d)]=function(_0x259cfa){const _0x55d944=_0x195c22;if(_0x259cfa==='cancel')_0x259cfa=_0x55d944(0x3d6);let _0x4b829a=[];for(let _0x35358a in Input[_0x55d944(0x548)]){_0x35358a=Number(_0x35358a);if(_0x35358a>=0x60&&_0x35358a<=0x69)continue;if([0x12,0x20]['includes'](_0x35358a))continue;_0x259cfa===Input[_0x55d944(0x548)][_0x35358a]&&_0x4b829a[_0x55d944(0x1fd)](_0x35358a);}for(let _0x33d931=0x0;_0x33d931<_0x4b829a[_0x55d944(0x397)];_0x33d931++){_0x4b829a[_0x33d931]=TextManager['stringKeyMap'][_0x4b829a[_0x33d931]];}return this[_0x55d944(0x5ee)](_0x4b829a);},TextManager[_0x195c22(0x5ee)]=function(_0x696f7d){const _0x2c8ee2=_0x195c22,_0x108f78=VisuMZ['CoreEngine'][_0x2c8ee2(0x3e5)][_0x2c8ee2(0x5d0)],_0x27de3a=_0x108f78[_0x2c8ee2(0x19b)],_0x266fde=_0x696f7d[_0x2c8ee2(0x2f5)](),_0x5e5761='Key%1'[_0x2c8ee2(0x57c)](_0x266fde);return _0x108f78[_0x5e5761]?_0x108f78[_0x5e5761]:_0x27de3a[_0x2c8ee2(0x57c)](_0x266fde);},TextManager[_0x195c22(0x4e6)]=function(_0x325316,_0xcd1b1b){const _0x58b131=_0x195c22,_0x14e57d=VisuMZ[_0x58b131(0x6b0)][_0x58b131(0x3e5)][_0x58b131(0x5d0)],_0x389611=_0x14e57d[_0x58b131(0x24a)],_0x21ebb7=this[_0x58b131(0x28d)](_0x325316),_0xf3b8d4=this[_0x58b131(0x28d)](_0xcd1b1b);return _0x389611['format'](_0x21ebb7,_0xf3b8d4);},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x4e5)]=ColorManager[_0x195c22(0x67b)],ColorManager[_0x195c22(0x67b)]=function(){const _0x5d92a1=_0x195c22;VisuMZ[_0x5d92a1(0x6b0)][_0x5d92a1(0x4e5)]['call'](this),this[_0x5d92a1(0x553)]=this[_0x5d92a1(0x553)]||{};},ColorManager['getColorDataFromPluginParameters']=function(_0xb76da8,_0x2f1c78){const _0x5e9d81=_0x195c22;return _0x2f1c78=String(_0x2f1c78),this[_0x5e9d81(0x553)]=this[_0x5e9d81(0x553)]||{},_0x2f1c78['match'](/#(.*)/i)?this[_0x5e9d81(0x553)][_0xb76da8]=_0x5e9d81(0x5df)[_0x5e9d81(0x57c)](String(RegExp['$1'])):this['_colorCache'][_0xb76da8]=this[_0x5e9d81(0x4f3)](Number(_0x2f1c78)),this[_0x5e9d81(0x553)][_0xb76da8];},ColorManager[_0x195c22(0x334)]=function(_0x4a572e){const _0x369b41=_0x195c22;return _0x4a572e=String(_0x4a572e),_0x4a572e['match'](/#(.*)/i)?_0x369b41(0x5df)['format'](String(RegExp['$1'])):this[_0x369b41(0x4f3)](Number(_0x4a572e));},ColorManager['clearCachedKeys']=function(){const _0x2f0225=_0x195c22;this[_0x2f0225(0x553)]={};},ColorManager[_0x195c22(0x6f4)]=function(){const _0x2532a4=_0x195c22,_0x4eb8e8='_stored_normalColor';this[_0x2532a4(0x553)]=this['_colorCache']||{};if(this['_colorCache'][_0x4eb8e8])return this[_0x2532a4(0x553)][_0x4eb8e8];const _0x46fa49=VisuMZ[_0x2532a4(0x6b0)]['Settings'][_0x2532a4(0x629)][_0x2532a4(0x3ef)];return this[_0x2532a4(0x179)](_0x4eb8e8,_0x46fa49);},ColorManager[_0x195c22(0x3fa)]=function(){const _0x2f37fc=_0x195c22,_0x238435='_stored_systemColor';this[_0x2f37fc(0x553)]=this['_colorCache']||{};if(this['_colorCache'][_0x238435])return this[_0x2f37fc(0x553)][_0x238435];const _0x58d315=VisuMZ['CoreEngine'][_0x2f37fc(0x3e5)][_0x2f37fc(0x629)][_0x2f37fc(0x182)];return this[_0x2f37fc(0x179)](_0x238435,_0x58d315);},ColorManager[_0x195c22(0x18c)]=function(){const _0x20b869=_0x195c22,_0x3f9bc5=_0x20b869(0x34d);this[_0x20b869(0x553)]=this[_0x20b869(0x553)]||{};if(this[_0x20b869(0x553)][_0x3f9bc5])return this[_0x20b869(0x553)][_0x3f9bc5];const _0x1c5d87=VisuMZ[_0x20b869(0x6b0)][_0x20b869(0x3e5)]['Color'][_0x20b869(0x433)];return this[_0x20b869(0x179)](_0x3f9bc5,_0x1c5d87);},ColorManager[_0x195c22(0x6fc)]=function(){const _0x376872=_0x195c22,_0x588c17='_stored_deathColor';this[_0x376872(0x553)]=this[_0x376872(0x553)]||{};if(this[_0x376872(0x553)][_0x588c17])return this['_colorCache'][_0x588c17];const _0x2fad56=VisuMZ[_0x376872(0x6b0)][_0x376872(0x3e5)][_0x376872(0x629)][_0x376872(0x6d6)];return this[_0x376872(0x179)](_0x588c17,_0x2fad56);},ColorManager[_0x195c22(0x601)]=function(){const _0x1c7881=_0x195c22,_0x308112=_0x1c7881(0x285);this[_0x1c7881(0x553)]=this['_colorCache']||{};if(this['_colorCache'][_0x308112])return this[_0x1c7881(0x553)][_0x308112];const _0x40bd72=VisuMZ['CoreEngine'][_0x1c7881(0x3e5)][_0x1c7881(0x629)][_0x1c7881(0x445)];return this['getColorDataFromPluginParameters'](_0x308112,_0x40bd72);},ColorManager['hpGaugeColor1']=function(){const _0x527e14=_0x195c22,_0x2c09b1='_stored_hpGaugeColor1';this[_0x527e14(0x553)]=this[_0x527e14(0x553)]||{};if(this[_0x527e14(0x553)][_0x2c09b1])return this['_colorCache'][_0x2c09b1];const _0x10d1b7=VisuMZ[_0x527e14(0x6b0)][_0x527e14(0x3e5)][_0x527e14(0x629)][_0x527e14(0x51b)];return this[_0x527e14(0x179)](_0x2c09b1,_0x10d1b7);},ColorManager[_0x195c22(0x5bf)]=function(){const _0xe30358=_0x195c22,_0x6074dd=_0xe30358(0x3be);this[_0xe30358(0x553)]=this['_colorCache']||{};if(this[_0xe30358(0x553)][_0x6074dd])return this['_colorCache'][_0x6074dd];const _0x294072=VisuMZ['CoreEngine'][_0xe30358(0x3e5)][_0xe30358(0x629)][_0xe30358(0x3eb)];return this['getColorDataFromPluginParameters'](_0x6074dd,_0x294072);},ColorManager[_0x195c22(0x24e)]=function(){const _0x4376db=_0x195c22,_0x489e93='_stored_mpGaugeColor1';this[_0x4376db(0x553)]=this[_0x4376db(0x553)]||{};if(this[_0x4376db(0x553)][_0x489e93])return this[_0x4376db(0x553)][_0x489e93];const _0x2fec52=VisuMZ[_0x4376db(0x6b0)][_0x4376db(0x3e5)][_0x4376db(0x629)][_0x4376db(0x4f4)];return this[_0x4376db(0x179)](_0x489e93,_0x2fec52);},ColorManager['mpGaugeColor2']=function(){const _0x2eb2a4=_0x195c22,_0x70f17a=_0x2eb2a4(0x66a);this[_0x2eb2a4(0x553)]=this[_0x2eb2a4(0x553)]||{};if(this[_0x2eb2a4(0x553)][_0x70f17a])return this['_colorCache'][_0x70f17a];const _0x5f59df=VisuMZ[_0x2eb2a4(0x6b0)]['Settings'][_0x2eb2a4(0x629)][_0x2eb2a4(0x283)];return this[_0x2eb2a4(0x179)](_0x70f17a,_0x5f59df);},ColorManager[_0x195c22(0x4b0)]=function(){const _0x2c0516=_0x195c22,_0x13343f=_0x2c0516(0x248);this['_colorCache']=this['_colorCache']||{};if(this[_0x2c0516(0x553)][_0x13343f])return this[_0x2c0516(0x553)][_0x13343f];const _0x52184d=VisuMZ['CoreEngine'][_0x2c0516(0x3e5)]['Color'][_0x2c0516(0x454)];return this[_0x2c0516(0x179)](_0x13343f,_0x52184d);},ColorManager[_0x195c22(0x3b1)]=function(){const _0x1d3db5=_0x195c22,_0x11a423='_stored_powerUpColor';this[_0x1d3db5(0x553)]=this[_0x1d3db5(0x553)]||{};if(this[_0x1d3db5(0x553)][_0x11a423])return this[_0x1d3db5(0x553)][_0x11a423];const _0x1ac2cf=VisuMZ[_0x1d3db5(0x6b0)]['Settings'][_0x1d3db5(0x629)][_0x1d3db5(0x340)];return this[_0x1d3db5(0x179)](_0x11a423,_0x1ac2cf);},ColorManager['powerDownColor']=function(){const _0xed813c=_0x195c22,_0x1f1a01=_0xed813c(0x31b);this[_0xed813c(0x553)]=this[_0xed813c(0x553)]||{};if(this[_0xed813c(0x553)][_0x1f1a01])return this['_colorCache'][_0x1f1a01];const _0x16d5d7=VisuMZ[_0xed813c(0x6b0)]['Settings']['Color'][_0xed813c(0x6e5)];return this[_0xed813c(0x179)](_0x1f1a01,_0x16d5d7);},ColorManager[_0x195c22(0x554)]=function(){const _0xf54e14=_0x195c22,_0x11aaf8=_0xf54e14(0x614);this[_0xf54e14(0x553)]=this[_0xf54e14(0x553)]||{};if(this['_colorCache'][_0x11aaf8])return this[_0xf54e14(0x553)][_0x11aaf8];const _0x1fdc14=VisuMZ[_0xf54e14(0x6b0)][_0xf54e14(0x3e5)][_0xf54e14(0x629)][_0xf54e14(0x2da)];return this[_0xf54e14(0x179)](_0x11aaf8,_0x1fdc14);},ColorManager[_0x195c22(0x557)]=function(){const _0x1f91ef=_0x195c22,_0x35cb71=_0x1f91ef(0x1a9);this[_0x1f91ef(0x553)]=this[_0x1f91ef(0x553)]||{};if(this[_0x1f91ef(0x553)][_0x35cb71])return this['_colorCache'][_0x35cb71];const _0x595624=VisuMZ['CoreEngine']['Settings'][_0x1f91ef(0x629)][_0x1f91ef(0x6da)];return this[_0x1f91ef(0x179)](_0x35cb71,_0x595624);},ColorManager[_0x195c22(0x58f)]=function(){const _0x3f0365=_0x195c22,_0xfa1de8='_stored_tpGaugeColor1';this[_0x3f0365(0x553)]=this['_colorCache']||{};if(this['_colorCache'][_0xfa1de8])return this[_0x3f0365(0x553)][_0xfa1de8];const _0x46d42b=VisuMZ[_0x3f0365(0x6b0)]['Settings'][_0x3f0365(0x629)][_0x3f0365(0x1ee)];return this[_0x3f0365(0x179)](_0xfa1de8,_0x46d42b);},ColorManager[_0x195c22(0x361)]=function(){const _0x2f8b52=_0x195c22,_0x36351e=_0x2f8b52(0x45a);this[_0x2f8b52(0x553)]=this[_0x2f8b52(0x553)]||{};if(this[_0x2f8b52(0x553)][_0x36351e])return this['_colorCache'][_0x36351e];const _0x8f84eb=VisuMZ['CoreEngine'][_0x2f8b52(0x3e5)]['Color']['ColorTPGauge2'];return this[_0x2f8b52(0x179)](_0x36351e,_0x8f84eb);},ColorManager['tpCostColor']=function(){const _0x5a440d=_0x195c22,_0x20195a='_stored_tpCostColor';this['_colorCache']=this[_0x5a440d(0x553)]||{};if(this[_0x5a440d(0x553)][_0x20195a])return this['_colorCache'][_0x20195a];const _0x5148ae=VisuMZ['CoreEngine']['Settings'][_0x5a440d(0x629)][_0x5a440d(0x53c)];return this[_0x5a440d(0x179)](_0x20195a,_0x5148ae);},ColorManager[_0x195c22(0x295)]=function(){const _0x5937e5=_0x195c22,_0x3552ba=_0x5937e5(0x665);this[_0x5937e5(0x553)]=this['_colorCache']||{};if(this[_0x5937e5(0x553)][_0x3552ba])return this[_0x5937e5(0x553)][_0x3552ba];const _0xc77429=VisuMZ[_0x5937e5(0x6b0)][_0x5937e5(0x3e5)][_0x5937e5(0x629)]['ColorTPCost'];return this[_0x5937e5(0x179)](_0x3552ba,_0xc77429);},ColorManager[_0x195c22(0x356)]=function(){const _0x7328ed=_0x195c22,_0x29bce6=_0x7328ed(0x319);this[_0x7328ed(0x553)]=this['_colorCache']||{};if(this['_colorCache'][_0x29bce6])return this[_0x7328ed(0x553)][_0x29bce6];const _0x27dc20=VisuMZ[_0x7328ed(0x6b0)][_0x7328ed(0x3e5)]['Color']['ColorExpGauge1'];return this[_0x7328ed(0x179)](_0x29bce6,_0x27dc20);},ColorManager[_0x195c22(0x3fc)]=function(){const _0x2bfb1f=_0x195c22,_0x1ca718=_0x2bfb1f(0x6e0);this['_colorCache']=this[_0x2bfb1f(0x553)]||{};if(this[_0x2bfb1f(0x553)][_0x1ca718])return this['_colorCache'][_0x1ca718];const _0xc20bf5=VisuMZ['CoreEngine'][_0x2bfb1f(0x3e5)][_0x2bfb1f(0x629)][_0x2bfb1f(0x2e1)];return this[_0x2bfb1f(0x179)](_0x1ca718,_0xc20bf5);},ColorManager['maxLvGaugeColor1']=function(){const _0x513ced=_0x195c22,_0x5770b7=_0x513ced(0x1cf);this[_0x513ced(0x553)]=this['_colorCache']||{};if(this[_0x513ced(0x553)][_0x5770b7])return this[_0x513ced(0x553)][_0x5770b7];const _0x333638=VisuMZ[_0x513ced(0x6b0)]['Settings'][_0x513ced(0x629)][_0x513ced(0x3a8)];return this[_0x513ced(0x179)](_0x5770b7,_0x333638);},ColorManager['maxLvGaugeColor2']=function(){const _0x2ec674=_0x195c22,_0x3a22e7=_0x2ec674(0x583);this[_0x2ec674(0x553)]=this[_0x2ec674(0x553)]||{};if(this[_0x2ec674(0x553)][_0x3a22e7])return this['_colorCache'][_0x3a22e7];const _0x348e39=VisuMZ[_0x2ec674(0x6b0)][_0x2ec674(0x3e5)]['Color']['ColorMaxLvGauge2'];return this[_0x2ec674(0x179)](_0x3a22e7,_0x348e39);},ColorManager[_0x195c22(0x46e)]=function(_0x5e9821){const _0x3a474a=_0x195c22;return VisuMZ[_0x3a474a(0x6b0)][_0x3a474a(0x3e5)][_0x3a474a(0x629)][_0x3a474a(0x383)][_0x3a474a(0x48a)](this,_0x5e9821);},ColorManager[_0x195c22(0x31f)]=function(_0x1cb5f3){const _0x288213=_0x195c22;return VisuMZ['CoreEngine'][_0x288213(0x3e5)]['Color'][_0x288213(0x379)]['call'](this,_0x1cb5f3);},ColorManager[_0x195c22(0x51d)]=function(_0x4af261){const _0x1b2b1d=_0x195c22;return VisuMZ['CoreEngine'][_0x1b2b1d(0x3e5)][_0x1b2b1d(0x629)]['ActorTPColor'][_0x1b2b1d(0x48a)](this,_0x4af261);},ColorManager[_0x195c22(0x59d)]=function(_0x48cbb7){const _0x4d3b31=_0x195c22;return VisuMZ[_0x4d3b31(0x6b0)][_0x4d3b31(0x3e5)][_0x4d3b31(0x629)][_0x4d3b31(0x491)]['call'](this,_0x48cbb7);},ColorManager[_0x195c22(0x619)]=function(_0x339149){const _0x6a1bf5=_0x195c22;return VisuMZ['CoreEngine'][_0x6a1bf5(0x3e5)][_0x6a1bf5(0x629)][_0x6a1bf5(0x2b6)][_0x6a1bf5(0x48a)](this,_0x339149);},ColorManager[_0x195c22(0x67e)]=function(){const _0x273e32=_0x195c22;return VisuMZ[_0x273e32(0x6b0)]['Settings'][_0x273e32(0x629)][_0x273e32(0x55b)];},ColorManager[_0x195c22(0x18e)]=function(){const _0x4d276f=_0x195c22;return VisuMZ['CoreEngine'][_0x4d276f(0x3e5)][_0x4d276f(0x629)][_0x4d276f(0x28e)]||_0x4d276f(0x5b3);},ColorManager[_0x195c22(0x422)]=function(){const _0x20cf73=_0x195c22;return VisuMZ[_0x20cf73(0x6b0)][_0x20cf73(0x3e5)][_0x20cf73(0x629)][_0x20cf73(0x558)]||_0x20cf73(0x5c9);},ColorManager[_0x195c22(0x46a)]=function(){const _0x426f91=_0x195c22;return VisuMZ[_0x426f91(0x6b0)][_0x426f91(0x3e5)][_0x426f91(0x629)]['DimColor1'];},ColorManager[_0x195c22(0x373)]=function(){const _0x16bc60=_0x195c22;return VisuMZ[_0x16bc60(0x6b0)][_0x16bc60(0x3e5)][_0x16bc60(0x629)][_0x16bc60(0x2ad)];},ColorManager[_0x195c22(0x2dd)]=function(){const _0x492f2a=_0x195c22;return VisuMZ['CoreEngine'][_0x492f2a(0x3e5)][_0x492f2a(0x629)][_0x492f2a(0x27a)];},ColorManager[_0x195c22(0x366)]=function(){const _0x41a0be=_0x195c22;return VisuMZ[_0x41a0be(0x6b0)][_0x41a0be(0x3e5)][_0x41a0be(0x629)][_0x41a0be(0x579)];},SceneManager[_0x195c22(0x16a)]=[],VisuMZ['CoreEngine']['SceneManager_initialize']=SceneManager['initialize'],SceneManager['initialize']=function(){const _0x298b75=_0x195c22;VisuMZ[_0x298b75(0x6b0)][_0x298b75(0x647)][_0x298b75(0x48a)](this),this[_0x298b75(0x4cd)]();},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x590)]=SceneManager[_0x195c22(0x407)],SceneManager[_0x195c22(0x407)]=function(_0xce7ad5){const _0x27c80f=_0x195c22;if($gameTemp)this[_0x27c80f(0x254)](_0xce7ad5);VisuMZ[_0x27c80f(0x6b0)]['SceneManager_onKeyDown'][_0x27c80f(0x48a)](this,_0xce7ad5);},SceneManager[_0x195c22(0x254)]=function(_0x2564eb){const _0x1733a4=_0x195c22;if(!_0x2564eb[_0x1733a4(0x5b4)]&&!_0x2564eb[_0x1733a4(0x229)])switch(_0x2564eb[_0x1733a4(0x453)]){case 0x75:this[_0x1733a4(0x4f5)]();break;case 0x76:if(Input[_0x1733a4(0x4c3)](_0x1733a4(0x6d2))||Input['isPressed'](_0x1733a4(0x4a4)))return;this[_0x1733a4(0x2f1)]();break;}},SceneManager[_0x195c22(0x4f5)]=function(){const _0x370fe7=_0x195c22;if($gameTemp[_0x370fe7(0x681)]()&&VisuMZ['CoreEngine']['Settings']['QoL']['F6key']){ConfigManager['seVolume']!==0x0?(ConfigManager[_0x370fe7(0x6ef)]=0x0,ConfigManager[_0x370fe7(0x4c0)]=0x0,ConfigManager['meVolume']=0x0,ConfigManager[_0x370fe7(0x4bf)]=0x0):(ConfigManager[_0x370fe7(0x6ef)]=0x64,ConfigManager[_0x370fe7(0x4c0)]=0x64,ConfigManager[_0x370fe7(0x5d7)]=0x64,ConfigManager[_0x370fe7(0x4bf)]=0x64);ConfigManager['save']();if(this['_scene']['constructor']===Scene_Options){if(this['_scene'][_0x370fe7(0x40d)])this[_0x370fe7(0x60d)][_0x370fe7(0x40d)][_0x370fe7(0x52c)]();if(this[_0x370fe7(0x60d)][_0x370fe7(0x6c6)])this[_0x370fe7(0x60d)][_0x370fe7(0x6c6)][_0x370fe7(0x52c)]();}}},SceneManager[_0x195c22(0x2f1)]=function(){const _0x2328a8=_0x195c22;$gameTemp[_0x2328a8(0x681)]()&&VisuMZ[_0x2328a8(0x6b0)][_0x2328a8(0x3e5)]['QoL'][_0x2328a8(0x507)]&&($gameTemp[_0x2328a8(0x55e)]=!$gameTemp['_playTestFastMode']);},SceneManager[_0x195c22(0x4cd)]=function(){const _0x4322dc=_0x195c22;this[_0x4322dc(0x50a)]=![],this[_0x4322dc(0x457)]=!VisuMZ['CoreEngine'][_0x4322dc(0x3e5)]['UI'][_0x4322dc(0x4b9)];},SceneManager[_0x195c22(0x23d)]=function(_0x4c907f){const _0x585139=_0x195c22;VisuMZ[_0x585139(0x6b0)][_0x585139(0x3e5)]['UI'][_0x585139(0x364)]&&(this[_0x585139(0x50a)]=_0x4c907f);},SceneManager[_0x195c22(0x3d0)]=function(){const _0x58ef6a=_0x195c22;return this[_0x58ef6a(0x50a)];},SceneManager[_0x195c22(0x22c)]=function(){const _0x504689=_0x195c22;return this[_0x504689(0x457)];},SceneManager[_0x195c22(0x3b9)]=function(){const _0x2c4795=_0x195c22;return this[_0x2c4795(0x22c)]()||this[_0x2c4795(0x3d0)]();},VisuMZ['CoreEngine'][_0x195c22(0x4f7)]=SceneManager[_0x195c22(0x2bf)],SceneManager[_0x195c22(0x2bf)]=function(){const _0x46a6d4=_0x195c22;return VisuMZ[_0x46a6d4(0x6b0)][_0x46a6d4(0x3e5)]['QoL'][_0x46a6d4(0x1cd)]?VisuMZ[_0x46a6d4(0x6b0)][_0x46a6d4(0x4f7)][_0x46a6d4(0x48a)](this):!![];},SceneManager['catchException']=function(_0x2a4acf){const _0x24e321=_0x195c22;if(_0x2a4acf instanceof Error)this['catchNormalError'](_0x2a4acf);else _0x2a4acf instanceof Array&&_0x2a4acf[0x0]===_0x24e321(0x1aa)?this[_0x24e321(0x3f5)](_0x2a4acf):this['catchUnknownError'](_0x2a4acf);this[_0x24e321(0x29f)]();},VisuMZ['CoreEngine'][_0x195c22(0x563)]=BattleManager['processEscape'],BattleManager['processEscape']=function(){const _0x5188b1=_0x195c22;if(VisuMZ[_0x5188b1(0x6b0)][_0x5188b1(0x3e5)][_0x5188b1(0x66d)][_0x5188b1(0x5f1)])this['processAlwaysEscape']();else return VisuMZ['CoreEngine'][_0x5188b1(0x563)]['call'](this);},BattleManager['processAlwaysEscape']=function(){const _0x3585d8=_0x195c22;return $gameParty[_0x3585d8(0x399)](),SoundManager[_0x3585d8(0x487)](),this[_0x3585d8(0x25f)](),!![];},BattleManager['isTpb']=function(){return $gameSystem['getBattleSystem']()>=0x1;},BattleManager[_0x195c22(0x616)]=function(){const _0x139350=_0x195c22;return $gameSystem[_0x139350(0x3b4)]()===0x1;},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x3f8)]=Game_Temp[_0x195c22(0x4ec)]['initialize'],Game_Temp['prototype'][_0x195c22(0x4ff)]=function(){const _0x50f817=_0x195c22;VisuMZ[_0x50f817(0x6b0)]['Game_Temp_initialize'][_0x50f817(0x48a)](this),this['forceOutOfPlaytest'](),this[_0x50f817(0x69f)]();},Game_Temp[_0x195c22(0x4ec)][_0x195c22(0x688)]=function(){const _0x1a21dd=_0x195c22;VisuMZ[_0x1a21dd(0x6b0)][_0x1a21dd(0x3e5)][_0x1a21dd(0x66d)]['ForceNoPlayTest']&&(this['_isPlaytest']=![]);},Game_Temp[_0x195c22(0x4ec)][_0x195c22(0x69f)]=function(){const _0x5482e2=_0x195c22;this[_0x5482e2(0x26a)]=[];},Game_Temp[_0x195c22(0x4ec)][_0x195c22(0x527)]=function(_0x288c65,_0xfb4aa6,_0x43ea5d,_0x1c3a2a){const _0x5bfe69=_0x195c22;if(!this[_0x5bfe69(0x607)]())return;_0x43ea5d=_0x43ea5d||![],_0x1c3a2a=_0x1c3a2a||![];if($dataAnimations[_0xfb4aa6]){const _0x2d8424={'targets':_0x288c65,'animationId':_0xfb4aa6,'mirror':_0x43ea5d,'mute':_0x1c3a2a};this[_0x5bfe69(0x26a)]['push'](_0x2d8424);for(const _0x5f578f of _0x288c65){_0x5f578f[_0x5bfe69(0x2ba)]&&_0x5f578f['startAnimation']();}}},Game_Temp[_0x195c22(0x4ec)][_0x195c22(0x607)]=function(){return!![];},Game_Temp[_0x195c22(0x4ec)]['retrieveFauxAnimation']=function(){const _0x21e81f=_0x195c22;return this[_0x21e81f(0x26a)]['shift']();},Game_Temp[_0x195c22(0x4ec)][_0x195c22(0x3b0)]=function(_0x45ab34){const _0x186fff=_0x195c22;this[_0x186fff(0x1a4)]=_0x45ab34;},Game_Temp[_0x195c22(0x4ec)][_0x195c22(0x6a8)]=function(){const _0x440005=_0x195c22;return this[_0x440005(0x1a4)];},Game_Temp[_0x195c22(0x4ec)][_0x195c22(0x652)]=function(){const _0x5c0536=_0x195c22;this[_0x5c0536(0x4fa)]=undefined,this['_forcedBattleSys']=undefined;},Game_Temp['prototype'][_0x195c22(0x40e)]=function(_0x32015f){const _0x10728d=_0x195c22;$gameMap&&$dataMap&&$dataMap[_0x10728d(0x612)]&&this[_0x10728d(0x3c6)]($dataMap[_0x10728d(0x612)]);const _0x52c123=$dataTroops[_0x32015f];_0x52c123&&this['parseForcedGameTroopSettingsCoreEngine'](_0x52c123[_0x10728d(0x220)]);},Game_Temp[_0x195c22(0x4ec)][_0x195c22(0x3c6)]=function(_0x2c8dc7){const _0x10b395=_0x195c22;if(!_0x2c8dc7)return;if(_0x2c8dc7[_0x10b395(0x5b6)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x10b395(0x4fa)]='FV';else{if(_0x2c8dc7[_0x10b395(0x5b6)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this['_forcedTroopView']='SV';else{if(_0x2c8dc7['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x3d953b=String(RegExp['$1']);if(_0x3d953b[_0x10b395(0x5b6)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this['_forcedTroopView']='FV';else _0x3d953b[_0x10b395(0x5b6)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x10b395(0x4fa)]='SV');}}}if(_0x2c8dc7[_0x10b395(0x5b6)](/<(?:DTB)>/i))this[_0x10b395(0x180)]=0x0;else{if(_0x2c8dc7['match'](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x10b395(0x180)]=0x1;else{if(_0x2c8dc7[_0x10b395(0x5b6)](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x10b395(0x180)]=0x2;else{if(_0x2c8dc7[_0x10b395(0x5b6)](/<(?:CTB)>/i))Imported[_0x10b395(0x171)]&&(this[_0x10b395(0x180)]=_0x10b395(0x689));else{if(_0x2c8dc7['match'](/<(?:STB)>/i))Imported[_0x10b395(0x31e)]&&(this[_0x10b395(0x180)]=_0x10b395(0x717));else{if(_0x2c8dc7[_0x10b395(0x5b6)](/<(?:BTB)>/i))Imported[_0x10b395(0x2fc)]&&(this[_0x10b395(0x180)]=_0x10b395(0x4d7));else{if(_0x2c8dc7[_0x10b395(0x5b6)](/<(?:FTB)>/i))Imported[_0x10b395(0x6dd)]&&(this[_0x10b395(0x180)]=_0x10b395(0x6a4));else{if(_0x2c8dc7[_0x10b395(0x5b6)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x368d26=String(RegExp['$1']);if(_0x368d26[_0x10b395(0x5b6)](/DTB/i))this[_0x10b395(0x180)]=0x0;else{if(_0x368d26[_0x10b395(0x5b6)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x10b395(0x180)]=0x1;else{if(_0x368d26[_0x10b395(0x5b6)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x10b395(0x180)]=0x2;else{if(_0x368d26[_0x10b395(0x5b6)](/CTB/i))Imported[_0x10b395(0x171)]&&(this[_0x10b395(0x180)]=_0x10b395(0x689));else{if(_0x368d26['match'](/STB/i))Imported[_0x10b395(0x31e)]&&(this[_0x10b395(0x180)]=_0x10b395(0x717));else{if(_0x368d26[_0x10b395(0x5b6)](/BTB/i))Imported[_0x10b395(0x2fc)]&&(this['_forcedBattleSys']=_0x10b395(0x4d7));else _0x368d26[_0x10b395(0x5b6)](/FTB/i)&&(Imported[_0x10b395(0x6dd)]&&(this[_0x10b395(0x180)]=_0x10b395(0x6a4)));}}}}}}}}}}}}}},VisuMZ['CoreEngine'][_0x195c22(0x5fb)]=Game_System[_0x195c22(0x4ec)][_0x195c22(0x4ff)],Game_System[_0x195c22(0x4ec)][_0x195c22(0x4ff)]=function(){const _0x152220=_0x195c22;VisuMZ['CoreEngine'][_0x152220(0x5fb)][_0x152220(0x48a)](this),this[_0x152220(0x4cb)]();},Game_System['prototype'][_0x195c22(0x4cb)]=function(){const _0x448e35=_0x195c22;this[_0x448e35(0x382)]={'SideView':$dataSystem[_0x448e35(0x6ec)],'BattleSystem':this[_0x448e35(0x4f8)](),'FontSize':$dataSystem[_0x448e35(0x6a1)][_0x448e35(0x6d7)],'Padding':0xc};},Game_System['prototype'][_0x195c22(0x4a3)]=function(){const _0x539d63=_0x195c22;if($gameTemp['_forcedTroopView']==='SV')return!![];else{if($gameTemp['_forcedTroopView']==='FV')return![];}if(this[_0x539d63(0x382)]===undefined)this[_0x539d63(0x4cb)]();if(this[_0x539d63(0x382)][_0x539d63(0x539)]===undefined)this['initCoreEngine']();return this['_CoreEngineSettings'][_0x539d63(0x539)];},Game_System[_0x195c22(0x4ec)][_0x195c22(0x594)]=function(_0x5d68dc){const _0x2a53bf=_0x195c22;if(this[_0x2a53bf(0x382)]===undefined)this[_0x2a53bf(0x4cb)]();if(this[_0x2a53bf(0x382)][_0x2a53bf(0x539)]===undefined)this[_0x2a53bf(0x4cb)]();this[_0x2a53bf(0x382)]['SideView']=_0x5d68dc;},Game_System[_0x195c22(0x4ec)][_0x195c22(0x40a)]=function(){const _0x474d4f=_0x195c22;if(this[_0x474d4f(0x382)]===undefined)this[_0x474d4f(0x4cb)]();this['_CoreEngineSettings'][_0x474d4f(0x279)]=this[_0x474d4f(0x4f8)]();},Game_System['prototype'][_0x195c22(0x4f8)]=function(){const _0x53095b=_0x195c22,_0x3539b1=(VisuMZ[_0x53095b(0x6b0)][_0x53095b(0x3e5)][_0x53095b(0x279)]||_0x53095b(0x2bc))[_0x53095b(0x336)]()[_0x53095b(0x368)]();return VisuMZ[_0x53095b(0x6b0)]['CreateBattleSystemID'](_0x3539b1);},Game_System[_0x195c22(0x4ec)][_0x195c22(0x3b4)]=function(){const _0x282da6=_0x195c22;if($gameTemp[_0x282da6(0x180)]!==undefined)return $gameTemp[_0x282da6(0x180)];if(this['_CoreEngineSettings']===undefined)this[_0x282da6(0x4cb)]();if(this[_0x282da6(0x382)][_0x282da6(0x279)]===undefined)this['resetBattleSystem']();return this[_0x282da6(0x382)][_0x282da6(0x279)];},Game_System['prototype'][_0x195c22(0x168)]=function(_0x10c4f3){const _0x35c4c2=_0x195c22;if(this[_0x35c4c2(0x382)]===undefined)this[_0x35c4c2(0x4cb)]();if(this[_0x35c4c2(0x382)][_0x35c4c2(0x279)]===undefined)this[_0x35c4c2(0x40a)]();this['_CoreEngineSettings'][_0x35c4c2(0x279)]=_0x10c4f3;},Game_System[_0x195c22(0x4ec)][_0x195c22(0x5fd)]=function(){const _0x668e7f=_0x195c22;if(this[_0x668e7f(0x382)]===undefined)this[_0x668e7f(0x4cb)]();if(this[_0x668e7f(0x382)][_0x668e7f(0x49d)]===undefined)this[_0x668e7f(0x4cb)]();return this[_0x668e7f(0x382)][_0x668e7f(0x49d)];},Game_System['prototype'][_0x195c22(0x5bb)]=function(_0x14791a){const _0x56c8af=_0x195c22;if(this[_0x56c8af(0x382)]===undefined)this['initCoreEngine']();if(this[_0x56c8af(0x382)]['TimeProgress']===undefined)this[_0x56c8af(0x4cb)]();this['_CoreEngineSettings']['FontSize']=_0x14791a;},Game_System['prototype'][_0x195c22(0x210)]=function(){const _0x197c2f=_0x195c22;if(this['_CoreEngineSettings']===undefined)this[_0x197c2f(0x4cb)]();if(this['_CoreEngineSettings'][_0x197c2f(0x6cb)]===undefined)this[_0x197c2f(0x4cb)]();return this[_0x197c2f(0x382)][_0x197c2f(0x6cb)];},Game_System[_0x195c22(0x4ec)][_0x195c22(0x25a)]=function(_0x5815cd){const _0x5a63b3=_0x195c22;if(this[_0x5a63b3(0x382)]===undefined)this[_0x5a63b3(0x4cb)]();if(this[_0x5a63b3(0x382)][_0x5a63b3(0x2b1)]===undefined)this[_0x5a63b3(0x4cb)]();this['_CoreEngineSettings'][_0x5a63b3(0x6cb)]=_0x5815cd;},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x256)]=Game_Screen[_0x195c22(0x4ec)][_0x195c22(0x4ff)],Game_Screen[_0x195c22(0x4ec)][_0x195c22(0x4ff)]=function(){const _0x58ef12=_0x195c22;VisuMZ[_0x58ef12(0x6b0)][_0x58ef12(0x256)]['call'](this),this[_0x58ef12(0x34e)]();},Game_Screen['prototype'][_0x195c22(0x34e)]=function(){const _0x584bd2=_0x195c22,_0x58a9e7=VisuMZ[_0x584bd2(0x6b0)][_0x584bd2(0x3e5)][_0x584bd2(0x274)];this['_coreEngineShakeStyle']=_0x58a9e7?.[_0x584bd2(0x695)]||_0x584bd2(0x3d5);},Game_Screen[_0x195c22(0x4ec)][_0x195c22(0x1f6)]=function(){const _0x39a55b=_0x195c22;if(this['_coreEngineShakeStyle']===undefined)this[_0x39a55b(0x34e)]();return this[_0x39a55b(0x214)];},Game_Screen[_0x195c22(0x4ec)][_0x195c22(0x216)]=function(_0x2b9020){const _0x2d68ea=_0x195c22;if(this[_0x2d68ea(0x214)]===undefined)this[_0x2d68ea(0x34e)]();this['_coreEngineShakeStyle']=_0x2b9020[_0x2d68ea(0x473)]()[_0x2d68ea(0x368)]();},Game_Picture[_0x195c22(0x4ec)][_0x195c22(0x498)]=function(){const _0xf98d9e=_0x195c22;if($gameParty[_0xf98d9e(0x53e)]())return![];return this['name']()&&this[_0xf98d9e(0x220)]()['charAt'](0x0)==='!';},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x471)]=Game_Picture[_0x195c22(0x4ec)]['x'],Game_Picture[_0x195c22(0x4ec)]['x']=function(){const _0x529bb1=_0x195c22;return this['isMapScrollLinked']()?this[_0x529bb1(0x306)]():VisuMZ[_0x529bb1(0x6b0)]['Game_Picture_x'][_0x529bb1(0x48a)](this);},Game_Picture[_0x195c22(0x4ec)][_0x195c22(0x306)]=function(){const _0x4cf042=_0x195c22,_0x293fc4=$gameMap[_0x4cf042(0x5ab)]()*$gameMap['tileWidth']();return this['_x']-_0x293fc4;},VisuMZ[_0x195c22(0x6b0)]['Game_Picture_y']=Game_Picture[_0x195c22(0x4ec)]['y'],Game_Picture[_0x195c22(0x4ec)]['y']=function(){const _0x87625c=_0x195c22;return this[_0x87625c(0x498)]()?this[_0x87625c(0x4d0)]():VisuMZ['CoreEngine']['Game_Picture_y'][_0x87625c(0x48a)](this);},Game_Picture['prototype'][_0x195c22(0x4d0)]=function(){const _0x2ba8df=_0x195c22,_0x47f404=$gameMap[_0x2ba8df(0x67a)]()*$gameMap['tileHeight']();return this['_y']-_0x47f404;},Game_Picture[_0x195c22(0x4ec)][_0x195c22(0x3e6)]=function(_0x886953){this['_coreEasingType']=_0x886953;},VisuMZ['CoreEngine'][_0x195c22(0x468)]=Game_Picture['prototype'][_0x195c22(0x1f7)],Game_Picture[_0x195c22(0x4ec)][_0x195c22(0x1f7)]=function(_0x348921){const _0x5687c1=_0x195c22;return this[_0x5687c1(0x6fe)]=this[_0x5687c1(0x6fe)]||0x0,[0x0,0x1,0x2,0x3][_0x5687c1(0x161)](this[_0x5687c1(0x6fe)])?VisuMZ[_0x5687c1(0x6b0)][_0x5687c1(0x468)]['call'](this,_0x348921):VisuMZ[_0x5687c1(0x385)](_0x348921,this[_0x5687c1(0x6fe)]);},VisuMZ['CoreEngine'][_0x195c22(0x624)]=Game_Action[_0x195c22(0x4ec)][_0x195c22(0x28c)],Game_Action['prototype']['itemHit']=function(_0x1fd5a2){const _0x4430fc=_0x195c22;return VisuMZ[_0x4430fc(0x6b0)][_0x4430fc(0x3e5)][_0x4430fc(0x66d)][_0x4430fc(0x58b)]?this[_0x4430fc(0x530)](_0x1fd5a2):VisuMZ[_0x4430fc(0x6b0)][_0x4430fc(0x624)]['call'](this,_0x1fd5a2);},Game_Action['prototype'][_0x195c22(0x530)]=function(_0x5d29a1){const _0x26e66b=_0x195c22,_0x2feadb=this[_0x26e66b(0x506)](_0x5d29a1),_0x4363e2=this[_0x26e66b(0x36d)](_0x5d29a1),_0x500d53=this[_0x26e66b(0x3ad)](_0x5d29a1);return _0x2feadb*(_0x4363e2-_0x500d53);},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x4ba)]=Game_Action[_0x195c22(0x4ec)][_0x195c22(0x2ec)],Game_Action[_0x195c22(0x4ec)][_0x195c22(0x2ec)]=function(_0x2b1fb9){const _0x220264=_0x195c22;return VisuMZ[_0x220264(0x6b0)][_0x220264(0x3e5)][_0x220264(0x66d)][_0x220264(0x58b)]?0x0:VisuMZ[_0x220264(0x6b0)][_0x220264(0x4ba)]['call'](this,_0x2b1fb9);},Game_Action[_0x195c22(0x4ec)]['itemSuccessRate']=function(_0x2a490d){const _0x3b6ffa=_0x195c22;return this['item']()[_0x3b6ffa(0x6f0)]*0.01;},Game_Action[_0x195c22(0x4ec)][_0x195c22(0x36d)]=function(_0x5ba150){const _0x30430a=_0x195c22;if(VisuMZ[_0x30430a(0x6b0)][_0x30430a(0x3e5)][_0x30430a(0x66d)][_0x30430a(0x5db)]&&this[_0x30430a(0x294)]())return 0x1;return this[_0x30430a(0x3cb)]()?VisuMZ[_0x30430a(0x6b0)][_0x30430a(0x3e5)][_0x30430a(0x66d)][_0x30430a(0x5db)]&&this[_0x30430a(0x678)]()[_0x30430a(0x65c)]()?this[_0x30430a(0x678)]()[_0x30430a(0x1ff)]+0.05:this['subject']()[_0x30430a(0x1ff)]:0x1;},Game_Action[_0x195c22(0x4ec)]['targetEvaRate']=function(_0x514c9d){const _0x567143=_0x195c22;if(this[_0x567143(0x678)]()[_0x567143(0x65c)]()===_0x514c9d[_0x567143(0x65c)]())return 0x0;if(this['isPhysical']())return VisuMZ[_0x567143(0x6b0)][_0x567143(0x3e5)][_0x567143(0x66d)][_0x567143(0x5db)]&&_0x514c9d['isEnemy']()?_0x514c9d[_0x567143(0x52d)]-0.05:_0x514c9d[_0x567143(0x52d)];else return this['isMagical']()?_0x514c9d['mev']:0x0;},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x328)]=Game_Action['prototype'][_0x195c22(0x52e)],Game_Action[_0x195c22(0x4ec)][_0x195c22(0x52e)]=function(_0x272037){const _0x5bc106=_0x195c22;VisuMZ[_0x5bc106(0x6b0)][_0x5bc106(0x328)][_0x5bc106(0x48a)](this,_0x272037);if(VisuMZ[_0x5bc106(0x6b0)]['Settings']['QoL'][_0x5bc106(0x58b)])return;const _0x5b4b27=_0x272037['result']();_0x5b4b27[_0x5bc106(0x4de)]&&(0x1-this[_0x5bc106(0x2ec)](_0x272037)>this[_0x5bc106(0x28c)](_0x272037)&&(_0x5b4b27[_0x5bc106(0x4de)]=![],_0x5b4b27[_0x5bc106(0x4dd)]=!![]));},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x4ac)]=Game_BattlerBase[_0x195c22(0x4ec)][_0x195c22(0x362)],Game_BattlerBase[_0x195c22(0x4ec)][_0x195c22(0x362)]=function(){const _0x1f9331=_0x195c22;this[_0x1f9331(0x194)]={},VisuMZ[_0x1f9331(0x6b0)][_0x1f9331(0x4ac)][_0x1f9331(0x48a)](this);},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x3b3)]=Game_BattlerBase['prototype'][_0x195c22(0x52c)],Game_BattlerBase[_0x195c22(0x4ec)][_0x195c22(0x52c)]=function(){const _0xe385d8=_0x195c22;this[_0xe385d8(0x194)]={},VisuMZ['CoreEngine']['Game_BattlerBase_refresh'][_0xe385d8(0x48a)](this);},Game_BattlerBase[_0x195c22(0x4ec)][_0x195c22(0x5f0)]=function(_0x4fd38d){const _0x5395e5=_0x195c22;return this[_0x5395e5(0x194)]=this['_cache']||{},this['_cache'][_0x4fd38d]!==undefined;},Game_BattlerBase[_0x195c22(0x4ec)]['paramPlus']=function(_0x570bfd){const _0x397307=_0x195c22,_0x4bb522=(_0x377cb3,_0x291812)=>{const _0x54090a=_0xf959;if(!_0x291812)return _0x377cb3;if(_0x291812['note'][_0x54090a(0x5b6)](VisuMZ[_0x54090a(0x6b0)][_0x54090a(0x3bd)][_0x54090a(0x4c5)][_0x570bfd])){var _0x27906d=Number(RegExp['$1']);_0x377cb3+=_0x27906d;}if(_0x291812[_0x54090a(0x612)][_0x54090a(0x5b6)](VisuMZ[_0x54090a(0x6b0)]['RegExp'][_0x54090a(0x3c9)][_0x570bfd])){var _0x589fee=String(RegExp['$1']);try{_0x377cb3+=eval(_0x589fee);}catch(_0x6e3eaf){if($gameTemp[_0x54090a(0x681)]())console['log'](_0x6e3eaf);}}return _0x377cb3;};return this[_0x397307(0x38c)]()['reduce'](_0x4bb522,this[_0x397307(0x16f)][_0x570bfd]);},Game_BattlerBase[_0x195c22(0x4ec)][_0x195c22(0x3a7)]=function(_0x5b34a1){const _0x290e78=_0x195c22;var _0x58fe39=_0x290e78(0x227)+(this[_0x290e78(0x65c)]()?'Actor':'Enemy')+'ParamMax'+_0x5b34a1;if(this[_0x290e78(0x5f0)](_0x58fe39))return this[_0x290e78(0x194)][_0x58fe39];this[_0x290e78(0x194)][_0x58fe39]=eval(VisuMZ[_0x290e78(0x6b0)]['Settings'][_0x290e78(0x244)][_0x58fe39]);const _0x27a69d=(_0x4a2fe8,_0x22a145)=>{const _0x598958=_0x290e78;if(!_0x22a145)return _0x4a2fe8;if(_0x22a145[_0x598958(0x612)][_0x598958(0x5b6)](VisuMZ[_0x598958(0x6b0)][_0x598958(0x3bd)]['paramMax'][_0x5b34a1])){var _0x41f6c1=Number(RegExp['$1']);if(_0x41f6c1===0x0)_0x41f6c1=Number[_0x598958(0x6f1)];_0x4a2fe8=Math[_0x598958(0x20e)](_0x4a2fe8,_0x41f6c1);}if(_0x22a145[_0x598958(0x612)][_0x598958(0x5b6)](VisuMZ[_0x598958(0x6b0)]['RegExp'][_0x598958(0x5fe)][_0x5b34a1])){var _0x3b575b=String(RegExp['$1']);try{_0x4a2fe8=Math[_0x598958(0x20e)](_0x4a2fe8,Number(eval(_0x3b575b)));}catch(_0x1fc202){if($gameTemp['isPlaytest']())console[_0x598958(0x2a7)](_0x1fc202);}}return _0x4a2fe8;};if(this[_0x290e78(0x194)][_0x58fe39]===0x0)this[_0x290e78(0x194)][_0x58fe39]=Number[_0x290e78(0x6f1)];return this[_0x290e78(0x194)][_0x58fe39]=this[_0x290e78(0x38c)]()[_0x290e78(0x3cd)](_0x27a69d,this[_0x290e78(0x194)][_0x58fe39]),this[_0x290e78(0x194)][_0x58fe39];},Game_BattlerBase['prototype'][_0x195c22(0x2ab)]=function(_0x482385){const _0x596833=_0x195c22,_0x29238f=this[_0x596833(0x207)](Game_BattlerBase[_0x596833(0x655)],_0x482385),_0x302a1d=(_0x419638,_0x55d318)=>{const _0x228f1b=_0x596833;if(!_0x55d318)return _0x419638;if(_0x55d318['note'][_0x228f1b(0x5b6)](VisuMZ[_0x228f1b(0x6b0)][_0x228f1b(0x3bd)][_0x228f1b(0x342)][_0x482385])){var _0x26788c=Number(RegExp['$1'])/0x64;_0x419638*=_0x26788c;}if(_0x55d318[_0x228f1b(0x612)]['match'](VisuMZ['CoreEngine'][_0x228f1b(0x3bd)][_0x228f1b(0x28f)][_0x482385])){var _0x26788c=Number(RegExp['$1']);_0x419638*=_0x26788c;}if(_0x55d318['note']['match'](VisuMZ['CoreEngine']['RegExp'][_0x228f1b(0x3a3)][_0x482385])){var _0xdda6b=String(RegExp['$1']);try{_0x419638*=eval(_0xdda6b);}catch(_0x5135a0){if($gameTemp[_0x228f1b(0x681)]())console[_0x228f1b(0x2a7)](_0x5135a0);}}return _0x419638;};return this[_0x596833(0x38c)]()['reduce'](_0x302a1d,_0x29238f);},Game_BattlerBase[_0x195c22(0x4ec)]['paramFlatBonus']=function(_0x981e36){const _0x2177ef=_0x195c22,_0x40875c=(_0x381821,_0x489f06)=>{const _0x3c0c36=_0xf959;if(!_0x489f06)return _0x381821;if(_0x489f06[_0x3c0c36(0x612)][_0x3c0c36(0x5b6)](VisuMZ['CoreEngine'][_0x3c0c36(0x3bd)]['paramFlat'][_0x981e36])){var _0x1dc571=Number(RegExp['$1']);_0x381821+=_0x1dc571;}if(_0x489f06['note']['match'](VisuMZ[_0x3c0c36(0x6b0)][_0x3c0c36(0x3bd)][_0x3c0c36(0x53f)][_0x981e36])){var _0x211136=String(RegExp['$1']);try{_0x381821+=eval(_0x211136);}catch(_0x128118){if($gameTemp['isPlaytest']())console[_0x3c0c36(0x2a7)](_0x128118);}}return _0x381821;};return this[_0x2177ef(0x38c)]()[_0x2177ef(0x3cd)](_0x40875c,0x0);},Game_BattlerBase[_0x195c22(0x4ec)][_0x195c22(0x427)]=function(_0x2f1889){const _0x139b89=_0x195c22;let _0x33d0ff=_0x139b89(0x427)+_0x2f1889+'Total';if(this[_0x139b89(0x5f0)](_0x33d0ff))return this[_0x139b89(0x194)][_0x33d0ff];return this['_cache'][_0x33d0ff]=Math[_0x139b89(0x643)](VisuMZ[_0x139b89(0x6b0)][_0x139b89(0x3e5)]['Param'][_0x139b89(0x50e)][_0x139b89(0x48a)](this,_0x2f1889)),this[_0x139b89(0x194)][_0x33d0ff];},Game_BattlerBase[_0x195c22(0x4ec)][_0x195c22(0x56f)]=function(_0x24e583){const _0x4ae410=_0x195c22,_0x57754e=(_0x1e0791,_0xbe6936)=>{const _0x2255af=_0xf959;if(!_0xbe6936)return _0x1e0791;if(_0xbe6936['note'][_0x2255af(0x5b6)](VisuMZ['CoreEngine'][_0x2255af(0x3bd)][_0x2255af(0x2a2)][_0x24e583])){var _0x4ec856=Number(RegExp['$1'])/0x64;_0x1e0791+=_0x4ec856;}if(_0xbe6936[_0x2255af(0x612)][_0x2255af(0x5b6)](VisuMZ[_0x2255af(0x6b0)][_0x2255af(0x3bd)][_0x2255af(0x5bd)][_0x24e583])){var _0x4ec856=Number(RegExp['$1']);_0x1e0791+=_0x4ec856;}if(_0xbe6936[_0x2255af(0x612)][_0x2255af(0x5b6)](VisuMZ[_0x2255af(0x6b0)][_0x2255af(0x3bd)][_0x2255af(0x585)][_0x24e583])){var _0x3a2eb7=String(RegExp['$1']);try{_0x1e0791+=eval(_0x3a2eb7);}catch(_0x559d0d){if($gameTemp[_0x2255af(0x681)]())console[_0x2255af(0x2a7)](_0x559d0d);}}return _0x1e0791;};return this[_0x4ae410(0x38c)]()[_0x4ae410(0x3cd)](_0x57754e,0x0);},Game_BattlerBase[_0x195c22(0x4ec)][_0x195c22(0x3d9)]=function(_0x5638e9){const _0x26402b=(_0x182ca3,_0x539b60)=>{const _0x346a53=_0xf959;if(!_0x539b60)return _0x182ca3;if(_0x539b60[_0x346a53(0x612)]['match'](VisuMZ[_0x346a53(0x6b0)]['RegExp']['xparamRate1'][_0x5638e9])){var _0x1dcaf0=Number(RegExp['$1'])/0x64;_0x182ca3*=_0x1dcaf0;}if(_0x539b60[_0x346a53(0x612)][_0x346a53(0x5b6)](VisuMZ[_0x346a53(0x6b0)][_0x346a53(0x3bd)][_0x346a53(0x178)][_0x5638e9])){var _0x1dcaf0=Number(RegExp['$1']);_0x182ca3*=_0x1dcaf0;}if(_0x539b60[_0x346a53(0x612)][_0x346a53(0x5b6)](VisuMZ['CoreEngine'][_0x346a53(0x3bd)][_0x346a53(0x313)][_0x5638e9])){var _0x527272=String(RegExp['$1']);try{_0x182ca3*=eval(_0x527272);}catch(_0x9be16){if($gameTemp[_0x346a53(0x681)]())console['log'](_0x9be16);}}return _0x182ca3;};return this['traitObjects']()['reduce'](_0x26402b,0x1);},Game_BattlerBase['prototype'][_0x195c22(0x2cc)]=function(_0x3f237c){const _0x266c0f=(_0x3a2eb9,_0x3510ee)=>{const _0x5f5314=_0xf959;if(!_0x3510ee)return _0x3a2eb9;if(_0x3510ee[_0x5f5314(0x612)][_0x5f5314(0x5b6)](VisuMZ[_0x5f5314(0x6b0)][_0x5f5314(0x3bd)][_0x5f5314(0x3d2)][_0x3f237c])){var _0x1fc210=Number(RegExp['$1'])/0x64;_0x3a2eb9+=_0x1fc210;}if(_0x3510ee['note'][_0x5f5314(0x5b6)](VisuMZ['CoreEngine'][_0x5f5314(0x3bd)][_0x5f5314(0x511)][_0x3f237c])){var _0x1fc210=Number(RegExp['$1']);_0x3a2eb9+=_0x1fc210;}if(_0x3510ee['note']['match'](VisuMZ[_0x5f5314(0x6b0)][_0x5f5314(0x3bd)]['xparamFlatJS'][_0x3f237c])){var _0x2ee0c1=String(RegExp['$1']);try{_0x3a2eb9+=eval(_0x2ee0c1);}catch(_0x4f59c3){if($gameTemp['isPlaytest']())console[_0x5f5314(0x2a7)](_0x4f59c3);}}return _0x3a2eb9;};return this['traitObjects']()['reduce'](_0x266c0f,0x0);},Game_BattlerBase[_0x195c22(0x4ec)]['xparam']=function(_0x42e179){const _0x2b089e=_0x195c22;let _0x262cc1=_0x2b089e(0x17e)+_0x42e179+_0x2b089e(0x458);if(this[_0x2b089e(0x5f0)](_0x262cc1))return this[_0x2b089e(0x194)][_0x262cc1];return this['_cache'][_0x262cc1]=VisuMZ[_0x2b089e(0x6b0)]['Settings']['Param'][_0x2b089e(0x4b5)][_0x2b089e(0x48a)](this,_0x42e179),this[_0x2b089e(0x194)][_0x262cc1];},Game_BattlerBase['prototype']['sparamPlus']=function(_0x24f51d){const _0x30d047=_0x195c22,_0x374df7=(_0x2c89c7,_0x221ac1)=>{const _0x407feb=_0xf959;if(!_0x221ac1)return _0x2c89c7;if(_0x221ac1[_0x407feb(0x612)][_0x407feb(0x5b6)](VisuMZ['CoreEngine'][_0x407feb(0x3bd)]['sparamPlus1'][_0x24f51d])){var _0x3aeced=Number(RegExp['$1'])/0x64;_0x2c89c7+=_0x3aeced;}if(_0x221ac1[_0x407feb(0x612)][_0x407feb(0x5b6)](VisuMZ[_0x407feb(0x6b0)][_0x407feb(0x3bd)]['sparamPlus2'][_0x24f51d])){var _0x3aeced=Number(RegExp['$1']);_0x2c89c7+=_0x3aeced;}if(_0x221ac1[_0x407feb(0x612)][_0x407feb(0x5b6)](VisuMZ[_0x407feb(0x6b0)][_0x407feb(0x3bd)][_0x407feb(0x352)][_0x24f51d])){var _0x25f216=String(RegExp['$1']);try{_0x2c89c7+=eval(_0x25f216);}catch(_0x1d74cc){if($gameTemp[_0x407feb(0x681)]())console[_0x407feb(0x2a7)](_0x1d74cc);}}return _0x2c89c7;};return this[_0x30d047(0x38c)]()[_0x30d047(0x3cd)](_0x374df7,0x0);},Game_BattlerBase[_0x195c22(0x4ec)][_0x195c22(0x30d)]=function(_0x2043c5){const _0x5ad5e3=_0x195c22,_0x4b51cc=(_0xa37f2c,_0xc98923)=>{const _0x869b50=_0xf959;if(!_0xc98923)return _0xa37f2c;if(_0xc98923[_0x869b50(0x612)][_0x869b50(0x5b6)](VisuMZ[_0x869b50(0x6b0)][_0x869b50(0x3bd)]['sparamRate1'][_0x2043c5])){var _0x13f202=Number(RegExp['$1'])/0x64;_0xa37f2c*=_0x13f202;}if(_0xc98923[_0x869b50(0x612)][_0x869b50(0x5b6)](VisuMZ[_0x869b50(0x6b0)][_0x869b50(0x3bd)][_0x869b50(0x2d7)][_0x2043c5])){var _0x13f202=Number(RegExp['$1']);_0xa37f2c*=_0x13f202;}if(_0xc98923[_0x869b50(0x612)][_0x869b50(0x5b6)](VisuMZ[_0x869b50(0x6b0)][_0x869b50(0x3bd)][_0x869b50(0x480)][_0x2043c5])){var _0x4eb71f=String(RegExp['$1']);try{_0xa37f2c*=eval(_0x4eb71f);}catch(_0x12b177){if($gameTemp[_0x869b50(0x681)]())console['log'](_0x12b177);}}return _0xa37f2c;};return this[_0x5ad5e3(0x38c)]()[_0x5ad5e3(0x3cd)](_0x4b51cc,0x1);},Game_BattlerBase[_0x195c22(0x4ec)][_0x195c22(0x19f)]=function(_0x334a6d){const _0x40f0ce=_0x195c22,_0x2ba9fd=(_0x301e01,_0x129176)=>{const _0x395097=_0xf959;if(!_0x129176)return _0x301e01;if(_0x129176[_0x395097(0x612)][_0x395097(0x5b6)](VisuMZ['CoreEngine'][_0x395097(0x3bd)][_0x395097(0x5e0)][_0x334a6d])){var _0x145eac=Number(RegExp['$1'])/0x64;_0x301e01+=_0x145eac;}if(_0x129176['note']['match'](VisuMZ['CoreEngine'][_0x395097(0x3bd)]['sparamFlat2'][_0x334a6d])){var _0x145eac=Number(RegExp['$1']);_0x301e01+=_0x145eac;}if(_0x129176[_0x395097(0x612)][_0x395097(0x5b6)](VisuMZ['CoreEngine']['RegExp'][_0x395097(0x626)][_0x334a6d])){var _0x4b467e=String(RegExp['$1']);try{_0x301e01+=eval(_0x4b467e);}catch(_0x246510){if($gameTemp[_0x395097(0x681)]())console[_0x395097(0x2a7)](_0x246510);}}return _0x301e01;};return this[_0x40f0ce(0x38c)]()['reduce'](_0x2ba9fd,0x0);},Game_BattlerBase['prototype'][_0x195c22(0x55c)]=function(_0x564f86){const _0xfe0738=_0x195c22;let _0x537db1=_0xfe0738(0x55c)+_0x564f86+'Total';if(this[_0xfe0738(0x5f0)](_0x537db1))return this[_0xfe0738(0x194)][_0x537db1];return this[_0xfe0738(0x194)][_0x537db1]=VisuMZ[_0xfe0738(0x6b0)][_0xfe0738(0x3e5)][_0xfe0738(0x244)]['SParameterFormula'][_0xfe0738(0x48a)](this,_0x564f86),this['_cache'][_0x537db1];},Game_BattlerBase[_0x195c22(0x4ec)][_0x195c22(0x6a3)]=function(_0x379006,_0xa53da){const _0x11ba6b=_0x195c22;if(typeof paramId===_0x11ba6b(0x425))return this[_0x11ba6b(0x427)](_0x379006);_0x379006=String(_0x379006||'')['toUpperCase']();if(_0x379006===_0x11ba6b(0x712))return this[_0x11ba6b(0x427)](0x0);if(_0x379006===_0x11ba6b(0x633))return this[_0x11ba6b(0x427)](0x1);if(_0x379006===_0x11ba6b(0x337))return this[_0x11ba6b(0x427)](0x2);if(_0x379006===_0x11ba6b(0x5f5))return this['param'](0x3);if(_0x379006===_0x11ba6b(0x50c))return this[_0x11ba6b(0x427)](0x4);if(_0x379006===_0x11ba6b(0x536))return this[_0x11ba6b(0x427)](0x5);if(_0x379006===_0x11ba6b(0x574))return this[_0x11ba6b(0x427)](0x6);if(_0x379006===_0x11ba6b(0x223))return this[_0x11ba6b(0x427)](0x7);if(_0x379006===_0x11ba6b(0x350))return _0xa53da?String(Math[_0x11ba6b(0x643)](this['xparam'](0x0)*0x64))+'%':this['xparam'](0x0);if(_0x379006===_0x11ba6b(0x5e4))return _0xa53da?String(Math['round'](this[_0x11ba6b(0x17e)](0x1)*0x64))+'%':this[_0x11ba6b(0x17e)](0x1);if(_0x379006===_0x11ba6b(0x6db))return _0xa53da?String(Math[_0x11ba6b(0x643)](this['xparam'](0x2)*0x64))+'%':this[_0x11ba6b(0x17e)](0x2);if(_0x379006===_0x11ba6b(0x6a0))return _0xa53da?String(Math[_0x11ba6b(0x643)](this[_0x11ba6b(0x17e)](0x3)*0x64))+'%':this[_0x11ba6b(0x17e)](0x3);if(_0x379006===_0x11ba6b(0x6b7))return _0xa53da?String(Math[_0x11ba6b(0x643)](this[_0x11ba6b(0x17e)](0x4)*0x64))+'%':this[_0x11ba6b(0x17e)](0x4);if(_0x379006===_0x11ba6b(0x3ee))return _0xa53da?String(Math[_0x11ba6b(0x643)](this[_0x11ba6b(0x17e)](0x5)*0x64))+'%':this[_0x11ba6b(0x17e)](0x5);if(_0x379006===_0x11ba6b(0x27d))return _0xa53da?String(Math[_0x11ba6b(0x643)](this[_0x11ba6b(0x17e)](0x6)*0x64))+'%':this[_0x11ba6b(0x17e)](0x6);if(_0x379006===_0x11ba6b(0x1d1))return _0xa53da?String(Math[_0x11ba6b(0x643)](this['xparam'](0x7)*0x64))+'%':this[_0x11ba6b(0x17e)](0x7);if(_0x379006===_0x11ba6b(0x1a1))return _0xa53da?String(Math[_0x11ba6b(0x643)](this[_0x11ba6b(0x17e)](0x8)*0x64))+'%':this[_0x11ba6b(0x17e)](0x8);if(_0x379006==='TRG')return _0xa53da?String(Math['round'](this[_0x11ba6b(0x17e)](0x9)*0x64))+'%':this[_0x11ba6b(0x17e)](0x9);if(_0x379006===_0x11ba6b(0x3ea))return _0xa53da?String(Math[_0x11ba6b(0x643)](this['sparam'](0x0)*0x64))+'%':this[_0x11ba6b(0x55c)](0x0);if(_0x379006==='GRD')return _0xa53da?String(Math['round'](this[_0x11ba6b(0x55c)](0x1)*0x64))+'%':this[_0x11ba6b(0x55c)](0x1);if(_0x379006===_0x11ba6b(0x1d5))return _0xa53da?String(Math['round'](this[_0x11ba6b(0x55c)](0x2)*0x64))+'%':this[_0x11ba6b(0x55c)](0x2);if(_0x379006===_0x11ba6b(0x5e6))return _0xa53da?String(Math[_0x11ba6b(0x643)](this[_0x11ba6b(0x55c)](0x3)*0x64))+'%':this['sparam'](0x3);if(_0x379006===_0x11ba6b(0x16e))return _0xa53da?String(Math['round'](this[_0x11ba6b(0x55c)](0x4)*0x64))+'%':this[_0x11ba6b(0x55c)](0x4);if(_0x379006===_0x11ba6b(0x31a))return _0xa53da?String(Math[_0x11ba6b(0x643)](this['sparam'](0x5)*0x64))+'%':this[_0x11ba6b(0x55c)](0x5);if(_0x379006===_0x11ba6b(0x410))return _0xa53da?String(Math[_0x11ba6b(0x643)](this['sparam'](0x6)*0x64))+'%':this[_0x11ba6b(0x55c)](0x6);if(_0x379006===_0x11ba6b(0x49a))return _0xa53da?String(Math[_0x11ba6b(0x643)](this[_0x11ba6b(0x55c)](0x7)*0x64))+'%':this['sparam'](0x7);if(_0x379006===_0x11ba6b(0x232))return _0xa53da?String(Math[_0x11ba6b(0x643)](this['sparam'](0x8)*0x64))+'%':this[_0x11ba6b(0x55c)](0x8);if(_0x379006==='EXR')return _0xa53da?String(Math[_0x11ba6b(0x643)](this[_0x11ba6b(0x55c)](0x9)*0x64))+'%':this[_0x11ba6b(0x55c)](0x9);if(VisuMZ[_0x11ba6b(0x6b0)][_0x11ba6b(0x288)][_0x379006]){const _0x754054=VisuMZ['CoreEngine'][_0x11ba6b(0x288)][_0x379006],_0x26c300=this[_0x754054];return VisuMZ[_0x11ba6b(0x6b0)]['CustomParamType'][_0x379006]===_0x11ba6b(0x475)?_0x26c300:_0xa53da?String(Math['round'](_0x26c300*0x64))+'%':_0x26c300;}return'';},Game_BattlerBase[_0x195c22(0x4ec)]['isDying']=function(){const _0x1377f6=_0x195c22;return this[_0x1377f6(0x2f4)]()&&this['_hp']<this[_0x1377f6(0x56a)]*VisuMZ['CoreEngine']['Settings'][_0x1377f6(0x244)]['CrisisRate'];},Game_Battler[_0x195c22(0x4ec)][_0x195c22(0x56d)]=function(){const _0x53119a=_0x195c22;SoundManager['playMiss'](),this[_0x53119a(0x5da)](_0x53119a(0x5a4));},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x61f)]=Game_Actor[_0x195c22(0x4ec)][_0x195c22(0x1b8)],Game_Actor[_0x195c22(0x4ec)][_0x195c22(0x1b8)]=function(_0x36e6f8){const _0x773a1b=_0x195c22;if(this[_0x773a1b(0x202)]>0x63)return this[_0x773a1b(0x545)](_0x36e6f8);return VisuMZ[_0x773a1b(0x6b0)][_0x773a1b(0x61f)]['call'](this,_0x36e6f8);},Game_Actor['prototype']['paramBaseAboveLevel99']=function(_0xf1f429){const _0x5b8758=_0x195c22,_0x112266=this[_0x5b8758(0x1e7)]()['params'][_0xf1f429][0x63],_0x1e3608=this[_0x5b8758(0x1e7)]()[_0x5b8758(0x69e)][_0xf1f429][0x62];return _0x112266+(_0x112266-_0x1e3608)*(this[_0x5b8758(0x202)]-0x63);},VisuMZ[_0x195c22(0x6b0)]['Game_Actor_changeClass']=Game_Actor[_0x195c22(0x4ec)]['changeClass'],Game_Actor[_0x195c22(0x4ec)][_0x195c22(0x272)]=function(_0x21f067,_0x5db98e){const _0x4673a9=_0x195c22;$gameTemp[_0x4673a9(0x154)]=!![],VisuMZ['CoreEngine'][_0x4673a9(0x357)][_0x4673a9(0x48a)](this,_0x21f067,_0x5db98e),$gameTemp[_0x4673a9(0x154)]=undefined;},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x305)]=Game_Actor[_0x195c22(0x4ec)][_0x195c22(0x441)],Game_Actor['prototype'][_0x195c22(0x441)]=function(){const _0x109bbe=_0x195c22;VisuMZ[_0x109bbe(0x6b0)][_0x109bbe(0x305)][_0x109bbe(0x48a)](this);if(!$gameTemp[_0x109bbe(0x154)])this[_0x109bbe(0x1bc)]();},Game_Actor[_0x195c22(0x4ec)]['levelUpRecovery']=function(){const _0x5b1d6f=_0x195c22;this['_cache']={};if(VisuMZ[_0x5b1d6f(0x6b0)][_0x5b1d6f(0x3e5)][_0x5b1d6f(0x66d)][_0x5b1d6f(0x5d8)])this[_0x5b1d6f(0x315)]=this[_0x5b1d6f(0x56a)];if(VisuMZ['CoreEngine'][_0x5b1d6f(0x3e5)][_0x5b1d6f(0x66d)]['LevelUpFullMp'])this[_0x5b1d6f(0x3ed)]=this['mmp'];},Game_Actor[_0x195c22(0x4ec)][_0x195c22(0x4e0)]=function(){const _0x2761e2=_0x195c22;if(this[_0x2761e2(0x273)]())return 0x1;const _0xae06aa=this[_0x2761e2(0x17c)]()-this[_0x2761e2(0x479)](),_0x60068f=this[_0x2761e2(0x3f9)]()-this[_0x2761e2(0x479)]();return(_0x60068f/_0xae06aa)['clamp'](0x0,0x1);},Game_Actor[_0x195c22(0x4ec)][_0x195c22(0x38c)]=function(){const _0x17c323=_0x195c22,_0x531b2f=Game_Battler[_0x17c323(0x4ec)]['traitObjects']['call'](this);for(const _0xd08c1b of this[_0x17c323(0x2a3)]()){_0xd08c1b&&_0x531b2f[_0x17c323(0x1fd)](_0xd08c1b);}return _0x531b2f[_0x17c323(0x1fd)](this['currentClass'](),this[_0x17c323(0x490)]()),_0x531b2f;},Object[_0x195c22(0x3fb)](Game_Enemy[_0x195c22(0x4ec)],_0x195c22(0x202),{'get':function(){return this['getLevel']();},'configurable':!![]}),Game_Enemy['prototype'][_0x195c22(0x225)]=function(){const _0x59c0d4=_0x195c22;return this[_0x59c0d4(0x5ad)]()[_0x59c0d4(0x202)];},Game_Enemy[_0x195c22(0x4ec)][_0x195c22(0x20f)]=function(){const _0x398efc=_0x195c22;!this[_0x398efc(0x5f4)]&&(this['_screenY']+=Math[_0x398efc(0x643)]((Graphics[_0x398efc(0x466)]-0x270)/0x2),this['_screenY']-=Math[_0x398efc(0x644)]((Graphics[_0x398efc(0x466)]-Graphics[_0x398efc(0x43e)])/0x2),$gameSystem[_0x398efc(0x4a3)]()?this[_0x398efc(0x231)]-=Math['floor']((Graphics['width']-Graphics[_0x398efc(0x6dc)])/0x2):this[_0x398efc(0x231)]+=Math['round']((Graphics[_0x398efc(0x6dc)]-0x330)/0x2)),this[_0x398efc(0x5f4)]=!![];},Game_Party[_0x195c22(0x4ec)][_0x195c22(0x52f)]=function(){const _0x26fa29=_0x195c22;return VisuMZ[_0x26fa29(0x6b0)][_0x26fa29(0x3e5)][_0x26fa29(0x258)][_0x26fa29(0x253)];},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x3a6)]=Game_Party[_0x195c22(0x4ec)][_0x195c22(0x166)],Game_Party[_0x195c22(0x4ec)]['consumeItem']=function(_0x1483f4){const _0x55e076=_0x195c22;if(VisuMZ[_0x55e076(0x6b0)][_0x55e076(0x3e5)][_0x55e076(0x66d)][_0x55e076(0x550)]&&DataManager[_0x55e076(0x18b)](_0x1483f4))return;VisuMZ['CoreEngine'][_0x55e076(0x3a6)]['call'](this,_0x1483f4);},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x638)]=Game_Troop[_0x195c22(0x4ec)][_0x195c22(0x170)],Game_Troop[_0x195c22(0x4ec)][_0x195c22(0x170)]=function(_0x381cce){const _0x4a1ab8=_0x195c22;$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),$gameTemp[_0x4a1ab8(0x40e)](_0x381cce),VisuMZ[_0x4a1ab8(0x6b0)][_0x4a1ab8(0x638)]['call'](this,_0x381cce);},VisuMZ['CoreEngine']['Game_Map_setup']=Game_Map[_0x195c22(0x4ec)][_0x195c22(0x170)],Game_Map[_0x195c22(0x4ec)][_0x195c22(0x170)]=function(_0xc524a8){const _0xf1d1d5=_0x195c22;VisuMZ['CoreEngine'][_0xf1d1d5(0x66b)][_0xf1d1d5(0x48a)](this,_0xc524a8),this[_0xf1d1d5(0x296)](_0xc524a8);},Game_Map['prototype'][_0x195c22(0x296)]=function(){const _0x4d449e=_0x195c22;this['_hideTileShadows']=VisuMZ[_0x4d449e(0x6b0)][_0x4d449e(0x3e5)][_0x4d449e(0x66d)][_0x4d449e(0x49f)]||![];if($dataMap&&$dataMap[_0x4d449e(0x612)]){if($dataMap[_0x4d449e(0x612)][_0x4d449e(0x5b6)](/<SHOW TILE SHADOWS>/i))this[_0x4d449e(0x582)]=![];if($dataMap[_0x4d449e(0x612)][_0x4d449e(0x5b6)](/<HIDE TILE SHADOWS>/i))this[_0x4d449e(0x582)]=!![];}},Game_Map['prototype'][_0x195c22(0x14e)]=function(){const _0x192100=_0x195c22;if(this[_0x192100(0x582)]===undefined)this['setupCoreEngine']();return this[_0x192100(0x582)];},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x467)]=Game_Character[_0x195c22(0x4ec)][_0x195c22(0x271)],Game_Character['prototype'][_0x195c22(0x271)]=function(_0xa2107f){const _0x378919=_0x195c22;try{VisuMZ[_0x378919(0x6b0)][_0x378919(0x467)][_0x378919(0x48a)](this,_0xa2107f);}catch(_0x537ee8){if($gameTemp[_0x378919(0x681)]())console[_0x378919(0x2a7)](_0x537ee8);}},Game_Player[_0x195c22(0x4ec)][_0x195c22(0x4e3)]=function(){const _0x33fbc8=_0x195c22,_0x26b665=$gameMap[_0x33fbc8(0x33a)]();this[_0x33fbc8(0x42e)]=Math[_0x33fbc8(0x365)](_0x26b665)+Math[_0x33fbc8(0x365)](_0x26b665)+this[_0x33fbc8(0x387)]();},Game_Player[_0x195c22(0x4ec)][_0x195c22(0x387)]=function(){const _0x49c475=_0x195c22;return $dataMap&&$dataMap['note']&&$dataMap[_0x49c475(0x612)]['match'](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x49c475(0x6b0)][_0x49c475(0x3e5)][_0x49c475(0x66d)][_0x49c475(0x1c4)];},VisuMZ['CoreEngine'][_0x195c22(0x1e0)]=Game_Event[_0x195c22(0x4ec)][_0x195c22(0x2b9)],Game_Event[_0x195c22(0x4ec)][_0x195c22(0x2b9)]=function(_0x4d82ba,_0x3925e9){const _0x391703=_0x195c22;return this['isSmartEventCollisionOn']()?this[_0x391703(0x2d9)](_0x4d82ba,_0x3925e9):VisuMZ['CoreEngine']['Game_Event_isCollidedWithEvents'][_0x391703(0x48a)](this,_0x4d82ba,_0x3925e9);},Game_Event[_0x195c22(0x4ec)][_0x195c22(0x596)]=function(){const _0x14c0ab=_0x195c22;return VisuMZ[_0x14c0ab(0x6b0)][_0x14c0ab(0x3e5)]['QoL']['SmartEventCollisionPriority'];},Game_Event[_0x195c22(0x4ec)][_0x195c22(0x2d9)]=function(_0x1723fb,_0x1bffd4){const _0x52c804=_0x195c22;if(!this[_0x52c804(0x157)]())return![];else{const _0x52d858=$gameMap['eventsXyNt'](_0x1723fb,_0x1bffd4)['filter'](_0x46cd71=>_0x46cd71[_0x52c804(0x157)]());return _0x52d858[_0x52c804(0x397)]>0x0;}},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x2ee)]=Game_Interpreter[_0x195c22(0x4ec)]['command105'],Game_Interpreter[_0x195c22(0x4ec)][_0x195c22(0x442)]=function(_0x2b7084){const _0x2b9e86=_0x195c22,_0x1b036c=this[_0x2b9e86(0x679)]();return _0x1b036c[_0x2b9e86(0x5b6)](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x2b9e86(0x634)](_0x1b036c):VisuMZ[_0x2b9e86(0x6b0)][_0x2b9e86(0x2ee)][_0x2b9e86(0x48a)](this,_0x2b7084);},Game_Interpreter[_0x195c22(0x4ec)][_0x195c22(0x679)]=function(){const _0x2bcb5f=_0x195c22;let _0x3421f6='',_0x461672=this['_index']+0x1;while(this[_0x2bcb5f(0x5f3)][_0x461672]&&this[_0x2bcb5f(0x5f3)][_0x461672]['code']===0x195){_0x3421f6+=this[_0x2bcb5f(0x5f3)][_0x461672]['parameters'][0x0]+'\x0a',_0x461672++;}return _0x3421f6;},Game_Interpreter[_0x195c22(0x4ec)]['runCombinedScrollingTextAsCode']=function(_0x5c9122){const _0x484944=_0x195c22;try{eval(_0x5c9122);}catch(_0x1f92f4){$gameTemp[_0x484944(0x681)]()&&(console['log'](_0x484944(0x408)),console[_0x484944(0x2a7)](_0x1f92f4));}return!![];},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x402)]=Game_Interpreter[_0x195c22(0x4ec)][_0x195c22(0x380)],Game_Interpreter[_0x195c22(0x4ec)]['command111']=function(_0x31017e){const _0x6d49ed=_0x195c22;try{VisuMZ[_0x6d49ed(0x6b0)][_0x6d49ed(0x402)]['call'](this,_0x31017e);}catch(_0x59580f){$gameTemp[_0x6d49ed(0x681)]()&&(console[_0x6d49ed(0x2a7)](_0x6d49ed(0x301)),console[_0x6d49ed(0x2a7)](_0x59580f)),this['skipBranch']();}return!![];},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x3a2)]=Game_Interpreter[_0x195c22(0x4ec)][_0x195c22(0x1ae)],Game_Interpreter[_0x195c22(0x4ec)][_0x195c22(0x1ae)]=function(_0x4c66d2){const _0x15ac8c=_0x195c22;try{VisuMZ[_0x15ac8c(0x6b0)]['Game_Interpreter_command122'][_0x15ac8c(0x48a)](this,_0x4c66d2);}catch(_0x3a6bd1){$gameTemp[_0x15ac8c(0x681)]()&&(console['log'](_0x15ac8c(0x3a1)),console[_0x15ac8c(0x2a7)](_0x3a6bd1));}return!![];},VisuMZ['CoreEngine'][_0x195c22(0x320)]=Game_Interpreter[_0x195c22(0x4ec)][_0x195c22(0x53b)],Game_Interpreter[_0x195c22(0x4ec)]['command355']=function(){const _0x5f14fc=_0x195c22;try{VisuMZ['CoreEngine'][_0x5f14fc(0x320)][_0x5f14fc(0x48a)](this);}catch(_0x4df3b2){$gameTemp[_0x5f14fc(0x681)]()&&(console[_0x5f14fc(0x2a7)](_0x5f14fc(0x1bf)),console[_0x5f14fc(0x2a7)](_0x4df3b2));}return!![];},VisuMZ[_0x195c22(0x6b0)]['Game_Interpreter_PluginCommand']=Game_Interpreter['prototype'][_0x195c22(0x246)],Game_Interpreter[_0x195c22(0x4ec)][_0x195c22(0x246)]=function(_0x2c9952){const _0x5800d0=_0x195c22;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ['CoreEngine']['Game_Interpreter_PluginCommand'][_0x5800d0(0x48a)](this,_0x2c9952);},Scene_Base['prototype']['fadeSpeed']=function(){const _0x34428b=_0x195c22;return VisuMZ[_0x34428b(0x6b0)][_0x34428b(0x3e5)]['UI']['FadeSpeed'];},Scene_Base[_0x195c22(0x4ec)]['isBottomHelpMode']=function(){const _0x25be35=_0x195c22;return VisuMZ['CoreEngine'][_0x25be35(0x3e5)]['UI'][_0x25be35(0x5b0)];},Scene_Base[_0x195c22(0x4ec)][_0x195c22(0x381)]=function(){const _0x208a05=_0x195c22;return VisuMZ[_0x208a05(0x6b0)]['Settings']['UI'][_0x208a05(0x5ca)];},Scene_Base[_0x195c22(0x4ec)][_0x195c22(0x3d1)]=function(){const _0x339dbe=_0x195c22;return VisuMZ[_0x339dbe(0x6b0)][_0x339dbe(0x3e5)]['UI']['RightMenus'];},Scene_Base[_0x195c22(0x4ec)]['mainCommandWidth']=function(){const _0xc4a64a=_0x195c22;return VisuMZ[_0xc4a64a(0x6b0)][_0xc4a64a(0x3e5)]['UI'][_0xc4a64a(0x24d)];},Scene_Base[_0x195c22(0x4ec)][_0x195c22(0x3d3)]=function(){const _0x3a7435=_0x195c22;return VisuMZ[_0x3a7435(0x6b0)]['Settings']['UI']['ButtonHeight'];},Scene_Base['prototype']['isWindowMaskingEnabled']=function(){const _0x48b726=_0x195c22;return VisuMZ[_0x48b726(0x6b0)]['Settings']['Window']['EnableMasking'];},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x49e)]=Scene_Base[_0x195c22(0x4ec)][_0x195c22(0x24f)],Scene_Base[_0x195c22(0x4ec)][_0x195c22(0x24f)]=function(){const _0x246efe=_0x195c22;VisuMZ[_0x246efe(0x6b0)][_0x246efe(0x49e)]['call'](this),this[_0x246efe(0x55d)](),this[_0x246efe(0x257)]['x']=Math[_0x246efe(0x643)](this[_0x246efe(0x257)]['x']),this['_windowLayer']['y']=Math[_0x246efe(0x643)](this[_0x246efe(0x257)]['y']);},Scene_Base[_0x195c22(0x4ec)][_0x195c22(0x55d)]=function(){},Scene_Base['prototype'][_0x195c22(0x710)]=function(){const _0x40f15e=_0x195c22;return TextManager[_0x40f15e(0x4e6)](_0x40f15e(0x47a),_0x40f15e(0x156));},Scene_Base[_0x195c22(0x4ec)][_0x195c22(0x175)]=function(){return TextManager['getInputButtonString']('tab');},Scene_Base['prototype'][_0x195c22(0x4a0)]=function(){const _0x5c46d4=_0x195c22;return TextManager[_0x5c46d4(0x28d)]('shift');},Scene_Base[_0x195c22(0x4ec)]['buttonAssistKey4']=function(){const _0x29b934=_0x195c22;return TextManager[_0x29b934(0x28d)]('ok');},Scene_Base[_0x195c22(0x4ec)][_0x195c22(0x426)]=function(){const _0x7c718e=_0x195c22;return TextManager[_0x7c718e(0x28d)](_0x7c718e(0x37a));},Scene_Base['prototype'][_0x195c22(0x482)]=function(){const _0x5d8916=_0x195c22;return this[_0x5d8916(0x372)]&&this[_0x5d8916(0x372)]['visible']?TextManager[_0x5d8916(0x389)]:'';},Scene_Base[_0x195c22(0x4ec)][_0x195c22(0x4d2)]=function(){return'';},Scene_Base[_0x195c22(0x4ec)][_0x195c22(0x62b)]=function(){return'';},Scene_Base[_0x195c22(0x4ec)]['buttonAssistText4']=function(){const _0x3b75e1=_0x195c22;return TextManager[_0x3b75e1(0x465)];},Scene_Base['prototype'][_0x195c22(0x392)]=function(){return TextManager['buttonAssistCancel'];},Scene_Base[_0x195c22(0x4ec)][_0x195c22(0x302)]=function(){return 0x0;},Scene_Base[_0x195c22(0x4ec)]['buttonAssistOffset2']=function(){return 0x0;},Scene_Base[_0x195c22(0x4ec)][_0x195c22(0x562)]=function(){return 0x0;},Scene_Base['prototype'][_0x195c22(0x6e2)]=function(){return 0x0;},Scene_Base[_0x195c22(0x4ec)]['buttonAssistOffset5']=function(){return 0x0;},VisuMZ['CoreEngine'][_0x195c22(0x1a7)]=Scene_Boot[_0x195c22(0x4ec)][_0x195c22(0x3ec)],Scene_Boot[_0x195c22(0x4ec)][_0x195c22(0x3ec)]=function(){const _0x2749dd=_0x195c22;VisuMZ[_0x2749dd(0x6b0)][_0x2749dd(0x1a7)][_0x2749dd(0x48a)](this),this['loadGameImagesCoreEngine']();},Scene_Boot[_0x195c22(0x4ec)][_0x195c22(0x60e)]=function(){const _0x274fcd=_0x195c22,_0x2ad350=[_0x274fcd(0x384),_0x274fcd(0x662),_0x274fcd(0x3ce),_0x274fcd(0x4b2),_0x274fcd(0x3d7),_0x274fcd(0x637),_0x274fcd(0x435),_0x274fcd(0x428),_0x274fcd(0x3b7),_0x274fcd(0x3f7),_0x274fcd(0x4c7),'tilesets','titles1',_0x274fcd(0x1ad)];for(const _0x357492 of _0x2ad350){const _0x16586a=VisuMZ[_0x274fcd(0x6b0)][_0x274fcd(0x3e5)][_0x274fcd(0x333)][_0x357492],_0x552d21=_0x274fcd(0x5f2)[_0x274fcd(0x57c)](_0x357492);for(const _0xa08dcd of _0x16586a){ImageManager['loadBitmap'](_0x552d21,_0xa08dcd);}}},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x514)]=Scene_Boot[_0x195c22(0x4ec)]['startNormalGame'],Scene_Boot[_0x195c22(0x4ec)]['startNormalGame']=function(){const _0x307acd=_0x195c22;Utils[_0x307acd(0x2fb)]('test')&&VisuMZ[_0x307acd(0x6b0)][_0x307acd(0x3e5)]['QoL'][_0x307acd(0x4e7)]?this[_0x307acd(0x310)]():VisuMZ['CoreEngine'][_0x307acd(0x514)][_0x307acd(0x48a)](this);},Scene_Boot['prototype']['startAutoNewGame']=function(){const _0x4bb693=_0x195c22;DataManager[_0x4bb693(0x18a)](),SceneManager['goto'](Scene_Map);},Scene_Boot[_0x195c22(0x4ec)][_0x195c22(0x520)]=function(){const _0x5e53df=_0x195c22,_0x2ee260=$dataSystem[_0x5e53df(0x6a1)]['uiAreaWidth'],_0xabc0f8=$dataSystem[_0x5e53df(0x6a1)][_0x5e53df(0x4fe)],_0x43a16e=VisuMZ[_0x5e53df(0x6b0)][_0x5e53df(0x3e5)]['UI'][_0x5e53df(0x36c)];Graphics[_0x5e53df(0x6dc)]=_0x2ee260-_0x43a16e*0x2,Graphics[_0x5e53df(0x43e)]=_0xabc0f8-_0x43a16e*0x2,this[_0x5e53df(0x14c)]();},VisuMZ[_0x195c22(0x6b0)]['Scene_Boot_updateDocumentTitle']=Scene_Boot[_0x195c22(0x4ec)][_0x195c22(0x15a)],Scene_Boot['prototype'][_0x195c22(0x15a)]=function(){const _0x292cc7=_0x195c22;this[_0x292cc7(0x570)]()?this[_0x292cc7(0x41b)]():VisuMZ[_0x292cc7(0x6b0)]['Scene_Boot_updateDocumentTitle'][_0x292cc7(0x48a)](this);},Scene_Boot[_0x195c22(0x4ec)]['isFullDocumentTitle']=function(){const _0x107386=_0x195c22;if(Scene_Title[_0x107386(0x26e)]==='')return![];if(Scene_Title[_0x107386(0x26e)]===_0x107386(0x489))return![];if(Scene_Title[_0x107386(0x15f)]==='')return![];if(Scene_Title[_0x107386(0x15f)]==='0.00')return![];return!![];},Scene_Boot[_0x195c22(0x4ec)][_0x195c22(0x41b)]=function(){const _0x3ab56c=_0x195c22,_0x164f38=$dataSystem[_0x3ab56c(0x549)],_0xa3b02f=Scene_Title['subtitle']||'',_0x16258e=Scene_Title['version']||'',_0x257649=VisuMZ[_0x3ab56c(0x6b0)][_0x3ab56c(0x3e5)]['MenuLayout'][_0x3ab56c(0x359)][_0x3ab56c(0x172)],_0xc103a6=_0x257649[_0x3ab56c(0x57c)](_0x164f38,_0xa3b02f,_0x16258e);document['title']=_0xc103a6;},Scene_Boot[_0x195c22(0x4ec)][_0x195c22(0x14c)]=function(){const _0x128760=_0x195c22;if(VisuMZ['CoreEngine'][_0x128760(0x3e5)]['UI'][_0x128760(0x364)]){const _0x10f356=Graphics[_0x128760(0x686)]-Graphics[_0x128760(0x6dc)]-VisuMZ[_0x128760(0x6b0)][_0x128760(0x3e5)]['UI'][_0x128760(0x36c)]*0x2,_0x3bb801=Sprite_Button[_0x128760(0x4ec)]['blockWidth'][_0x128760(0x48a)](this)*0x4;if(_0x10f356>=_0x3bb801)SceneManager['setSideButtonLayout'](!![]);}},Scene_Title[_0x195c22(0x26e)]=VisuMZ['CoreEngine'][_0x195c22(0x3e5)][_0x195c22(0x4fb)][_0x195c22(0x359)]['Subtitle'],Scene_Title[_0x195c22(0x15f)]=VisuMZ['CoreEngine'][_0x195c22(0x3e5)][_0x195c22(0x4fb)][_0x195c22(0x359)]['Version'],Scene_Title[_0x195c22(0x5e9)]=VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x3e5)][_0x195c22(0x1b9)],VisuMZ[_0x195c22(0x6b0)]['Scene_Title_drawGameTitle']=Scene_Title[_0x195c22(0x4ec)][_0x195c22(0x459)],Scene_Title[_0x195c22(0x4ec)][_0x195c22(0x459)]=function(){const _0x32f872=_0x195c22;VisuMZ[_0x32f872(0x6b0)][_0x32f872(0x3e5)][_0x32f872(0x4fb)]['Title'][_0x32f872(0x459)][_0x32f872(0x48a)](this);if(Scene_Title[_0x32f872(0x26e)]!==''&&Scene_Title[_0x32f872(0x26e)]!=='Subtitle')this[_0x32f872(0x348)]();if(Scene_Title['version']!==''&&Scene_Title[_0x32f872(0x15f)]!=='0.00')this['drawGameVersion']();},Scene_Title[_0x195c22(0x4ec)][_0x195c22(0x348)]=function(){const _0x57a173=_0x195c22;VisuMZ[_0x57a173(0x6b0)][_0x57a173(0x3e5)][_0x57a173(0x4fb)]['Title'][_0x57a173(0x348)][_0x57a173(0x48a)](this);},Scene_Title['prototype'][_0x195c22(0x610)]=function(){const _0x360be3=_0x195c22;VisuMZ[_0x360be3(0x6b0)][_0x360be3(0x3e5)][_0x360be3(0x4fb)]['Title']['drawGameVersion'][_0x360be3(0x48a)](this);},Scene_Title[_0x195c22(0x4ec)][_0x195c22(0x330)]=function(){const _0x24b776=_0x195c22;this[_0x24b776(0x5d3)]();const _0x1b8258=$dataSystem[_0x24b776(0x5dc)][_0x24b776(0x303)],_0x5a3bfc=this[_0x24b776(0x391)]();this[_0x24b776(0x63e)]=new Window_TitleCommand(_0x5a3bfc),this[_0x24b776(0x63e)][_0x24b776(0x19d)](_0x1b8258);const _0x422e76=this['commandWindowRect']();this['_commandWindow'][_0x24b776(0x4fc)](_0x422e76['x'],_0x422e76['y'],_0x422e76[_0x24b776(0x686)],_0x422e76[_0x24b776(0x466)]),this[_0x24b776(0x5fc)](this[_0x24b776(0x63e)]);},Scene_Title[_0x195c22(0x4ec)][_0x195c22(0x55a)]=function(){const _0x37abd1=_0x195c22;return this[_0x37abd1(0x63e)]?this['_commandWindow'][_0x37abd1(0x2ea)]():VisuMZ[_0x37abd1(0x6b0)][_0x37abd1(0x3e5)]['TitleCommandList']['length'];},Scene_Title['prototype'][_0x195c22(0x391)]=function(){const _0x2fc9b2=_0x195c22;return VisuMZ['CoreEngine'][_0x2fc9b2(0x3e5)][_0x2fc9b2(0x4fb)][_0x2fc9b2(0x359)]['CommandRect']['call'](this);},Scene_Title['prototype'][_0x195c22(0x5d3)]=function(){const _0x142736=_0x195c22;for(const _0x1063d2 of Scene_Title[_0x142736(0x5e9)]){const _0x307950=new Sprite_TitlePictureButton(_0x1063d2);this[_0x142736(0x3ae)](_0x307950);}},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x516)]=Scene_Map[_0x195c22(0x4ec)][_0x195c22(0x4ff)],Scene_Map[_0x195c22(0x4ec)][_0x195c22(0x4ff)]=function(){const _0xaea595=_0x195c22;VisuMZ[_0xaea595(0x6b0)][_0xaea595(0x516)][_0xaea595(0x48a)](this),$gameTemp[_0xaea595(0x652)]();},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x3a9)]=Scene_Map['prototype'][_0x195c22(0x323)],Scene_Map['prototype'][_0x195c22(0x323)]=function(){const _0x575ebb=_0x195c22;VisuMZ[_0x575ebb(0x6b0)]['Scene_Map_updateMainMultiply']['call'](this),$gameTemp['_playTestFastMode']&&!$gameMessage[_0x575ebb(0x27c)]()&&(this[_0x575ebb(0x605)](),SceneManager['updateEffekseer']());},Scene_Map[_0x195c22(0x4ec)][_0x195c22(0x640)]=function(){const _0x315a20=_0x195c22;Scene_Message['prototype'][_0x315a20(0x640)][_0x315a20(0x48a)](this),!SceneManager['isNextScene'](Scene_Battle)&&(this[_0x315a20(0x55f)][_0x315a20(0x684)](),this[_0x315a20(0x523)][_0x315a20(0x64b)](),this[_0x315a20(0x257)]['visible']=![],SceneManager[_0x315a20(0x259)]()),$gameScreen[_0x315a20(0x4e1)]();},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x1f1)]=Scene_Map[_0x195c22(0x4ec)][_0x195c22(0x191)],Scene_Map[_0x195c22(0x4ec)][_0x195c22(0x191)]=function(){const _0x75b265=_0x195c22;VisuMZ[_0x75b265(0x6b0)]['Scene_Map_createMenuButton']['call'](this),SceneManager[_0x75b265(0x3d0)]()&&this['moveMenuButtonSideButtonLayout']();},Scene_Map[_0x195c22(0x4ec)][_0x195c22(0x509)]=function(){const _0x54df02=_0x195c22;this[_0x54df02(0x1b2)]['x']=Graphics[_0x54df02(0x6dc)]+0x4;},VisuMZ[_0x195c22(0x6b0)]['Scene_Map_updateScene']=Scene_Map[_0x195c22(0x4ec)]['updateScene'],Scene_Map[_0x195c22(0x4ec)][_0x195c22(0x2c4)]=function(){const _0x3aef8c=_0x195c22;VisuMZ['CoreEngine'][_0x3aef8c(0x424)][_0x3aef8c(0x48a)](this),this[_0x3aef8c(0x6cc)]();},Scene_Map[_0x195c22(0x4ec)]['updateDashToggle']=function(){const _0x494bc0=_0x195c22;Input[_0x494bc0(0x569)](_0x494bc0(0x65f))&&(ConfigManager[_0x494bc0(0x1b7)]=!ConfigManager[_0x494bc0(0x1b7)],ConfigManager[_0x494bc0(0x2dc)]());},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x6f6)]=Scene_MenuBase['prototype']['helpAreaTop'],Scene_MenuBase[_0x195c22(0x4ec)][_0x195c22(0x2b3)]=function(){const _0x194684=_0x195c22;let _0x4fd990=0x0;return SceneManager['areButtonsOutsideMainUI']()?_0x4fd990=this[_0x194684(0x197)]():_0x4fd990=VisuMZ[_0x194684(0x6b0)][_0x194684(0x6f6)][_0x194684(0x48a)](this),this['isMenuButtonAssistEnabled']()&&this[_0x194684(0x3f0)]()===_0x194684(0x234)&&(_0x4fd990+=Window_ButtonAssist['prototype'][_0x194684(0x371)]()),_0x4fd990;},Scene_MenuBase['prototype'][_0x195c22(0x197)]=function(){const _0x9031af=_0x195c22;return this[_0x9031af(0x5d5)]()?this['mainAreaBottom']():0x0;},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x4e4)]=Scene_MenuBase[_0x195c22(0x4ec)][_0x195c22(0x19e)],Scene_MenuBase['prototype'][_0x195c22(0x19e)]=function(){const _0x1f2895=_0x195c22;return SceneManager[_0x1f2895(0x3b9)]()?this[_0x1f2895(0x1d2)]():VisuMZ[_0x1f2895(0x6b0)]['Scene_MenuBase_mainAreaTop'][_0x1f2895(0x48a)](this);},Scene_MenuBase[_0x195c22(0x4ec)][_0x195c22(0x1d2)]=function(){const _0x5b6bff=_0x195c22;return!this['isBottomHelpMode']()?this[_0x5b6bff(0x51a)]():0x0;},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x413)]=Scene_MenuBase[_0x195c22(0x4ec)]['mainAreaHeight'],Scene_MenuBase[_0x195c22(0x4ec)]['mainAreaHeight']=function(){const _0x4afba1=_0x195c22;let _0x144318=0x0;return SceneManager[_0x4afba1(0x3b9)]()?_0x144318=this[_0x4afba1(0x4b1)]():_0x144318=VisuMZ[_0x4afba1(0x6b0)][_0x4afba1(0x413)]['call'](this),this[_0x4afba1(0x4b6)]()&&this[_0x4afba1(0x3f0)]()!==_0x4afba1(0x51e)&&(_0x144318-=Window_ButtonAssist[_0x4afba1(0x4ec)][_0x4afba1(0x371)]()),_0x144318;},Scene_MenuBase[_0x195c22(0x4ec)][_0x195c22(0x4b1)]=function(){const _0x3396fb=_0x195c22;return Graphics['boxHeight']-this[_0x3396fb(0x2b7)]();},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x27e)]=Scene_MenuBase[_0x195c22(0x4ec)]['createBackground'],Scene_MenuBase[_0x195c22(0x4ec)][_0x195c22(0x568)]=function(){const _0x48a72b=_0x195c22;this[_0x48a72b(0x6a6)]=new PIXI[(_0x48a72b(0x5e8))]['BlurFilter'](clamp=!![]),this[_0x48a72b(0x57f)]=new Sprite(),this[_0x48a72b(0x57f)]['bitmap']=SceneManager['backgroundBitmap'](),this['_backgroundSprite'][_0x48a72b(0x5e8)]=[this[_0x48a72b(0x6a6)]],this[_0x48a72b(0x3ae)](this[_0x48a72b(0x57f)]),this[_0x48a72b(0x421)](0xc0),this[_0x48a72b(0x421)](this[_0x48a72b(0x335)]()),this[_0x48a72b(0x6d5)]();},Scene_MenuBase[_0x195c22(0x4ec)][_0x195c22(0x335)]=function(){const _0x231f23=_0x195c22,_0x400409=String(this[_0x231f23(0x35c)]['name']),_0x280ba0=this[_0x231f23(0x5a8)](_0x400409);return _0x280ba0?_0x280ba0[_0x231f23(0x278)]:0xc0;},Scene_MenuBase[_0x195c22(0x4ec)][_0x195c22(0x6d5)]=function(){const _0x5df70b=_0x195c22,_0x4531c8=String(this['constructor'][_0x5df70b(0x220)]),_0x2af27e=this['getCustomBackgroundSettings'](_0x4531c8);_0x2af27e&&(_0x2af27e[_0x5df70b(0x2d8)]!==''||_0x2af27e[_0x5df70b(0x1af)]!=='')&&(this[_0x5df70b(0x2c3)]=new Sprite(ImageManager['loadTitle1'](_0x2af27e[_0x5df70b(0x2d8)])),this[_0x5df70b(0x346)]=new Sprite(ImageManager['loadTitle2'](_0x2af27e['BgFilename2'])),this[_0x5df70b(0x3ae)](this['_backSprite1']),this[_0x5df70b(0x3ae)](this[_0x5df70b(0x346)]),this['_backSprite1'][_0x5df70b(0x209)][_0x5df70b(0x165)](this[_0x5df70b(0x6bc)][_0x5df70b(0x70a)](this,this[_0x5df70b(0x2c3)])),this[_0x5df70b(0x346)][_0x5df70b(0x209)]['addLoadListener'](this[_0x5df70b(0x6bc)][_0x5df70b(0x70a)](this,this[_0x5df70b(0x346)])));},Scene_MenuBase[_0x195c22(0x4ec)][_0x195c22(0x5a8)]=function(_0x542168){const _0x319706=_0x195c22;return VisuMZ[_0x319706(0x6b0)][_0x319706(0x3e5)][_0x319706(0x48f)][_0x542168]||VisuMZ[_0x319706(0x6b0)]['Settings'][_0x319706(0x48f)][_0x319706(0x6e7)];},Scene_MenuBase[_0x195c22(0x4ec)][_0x195c22(0x6bc)]=function(_0x4b3fe6){const _0x4d0e77=_0x195c22;this['scaleSprite'](_0x4b3fe6),this[_0x4d0e77(0x611)](_0x4b3fe6);},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x26f)]=Scene_MenuBase[_0x195c22(0x4ec)][_0x195c22(0x6c8)],Scene_MenuBase['prototype'][_0x195c22(0x6c8)]=function(){const _0x539ed5=_0x195c22;VisuMZ[_0x539ed5(0x6b0)][_0x539ed5(0x26f)][_0x539ed5(0x48a)](this),SceneManager[_0x539ed5(0x3d0)]()&&this[_0x539ed5(0x4f0)]();},Scene_MenuBase[_0x195c22(0x4ec)][_0x195c22(0x4f0)]=function(){const _0x433d99=_0x195c22;this[_0x433d99(0x2d6)]['x']=Graphics[_0x433d99(0x6dc)]+0x4;},VisuMZ[_0x195c22(0x6b0)]['Scene_MenuBase_createPageButtons']=Scene_MenuBase['prototype'][_0x195c22(0x17f)],Scene_MenuBase[_0x195c22(0x4ec)][_0x195c22(0x17f)]=function(){const _0x179dad=_0x195c22;VisuMZ[_0x179dad(0x6b0)]['Scene_MenuBase_createPageButtons'][_0x179dad(0x48a)](this),SceneManager[_0x179dad(0x3d0)]()&&this[_0x179dad(0x3e3)]();},Scene_MenuBase[_0x195c22(0x4ec)][_0x195c22(0x3e3)]=function(){const _0x38e405=_0x195c22;this[_0x38e405(0x372)]['x']=-0x1*(this['_pageupButton'][_0x38e405(0x686)]+this[_0x38e405(0x41d)][_0x38e405(0x686)]+0x8),this[_0x38e405(0x41d)]['x']=-0x1*(this[_0x38e405(0x41d)][_0x38e405(0x686)]+0x4);},Scene_MenuBase[_0x195c22(0x4ec)][_0x195c22(0x4b6)]=function(){const _0xff106e=_0x195c22;return VisuMZ[_0xff106e(0x6b0)][_0xff106e(0x3e5)][_0xff106e(0x5d0)][_0xff106e(0x316)];},Scene_MenuBase['prototype'][_0x195c22(0x3f0)]=function(){const _0x3f377=_0x195c22;return SceneManager[_0x3f377(0x3d0)]()||SceneManager[_0x3f377(0x22c)]()?VisuMZ['CoreEngine'][_0x3f377(0x3e5)][_0x3f377(0x5d0)][_0x3f377(0x26d)]:_0x3f377(0x51e);},Scene_MenuBase['prototype']['createButtonAssistWindow']=function(){const _0x2f9c7b=_0x195c22;if(!this[_0x2f9c7b(0x4b6)]())return;const _0x3fb6a3=this[_0x2f9c7b(0x276)]();this['_buttonAssistWindow']=new Window_ButtonAssist(_0x3fb6a3),this[_0x2f9c7b(0x5fc)](this[_0x2f9c7b(0x5cb)]);},Scene_MenuBase[_0x195c22(0x4ec)][_0x195c22(0x276)]=function(){const _0x582837=_0x195c22;return this['getButtonAssistLocation']()==='button'?this[_0x582837(0x3c4)]():this['buttonAssistWindowSideRect']();},Scene_MenuBase[_0x195c22(0x4ec)]['buttonAssistWindowButtonRect']=function(){const _0x5c4452=_0x195c22,_0x266505=ConfigManager[_0x5c4452(0x5b1)]?(Sprite_Button[_0x5c4452(0x4ec)][_0x5c4452(0x68b)]()+0x6)*0x2:0x0,_0x522a62=this[_0x5c4452(0x34b)](),_0x46688f=Graphics[_0x5c4452(0x6dc)]-_0x266505*0x2,_0x107c1d=this[_0x5c4452(0x3d3)]();return new Rectangle(_0x266505,_0x522a62,_0x46688f,_0x107c1d);},Scene_MenuBase[_0x195c22(0x4ec)]['buttonAssistWindowSideRect']=function(){const _0x1dd600=_0x195c22,_0x44be7f=Graphics[_0x1dd600(0x6dc)],_0x2d5dce=Window_ButtonAssist[_0x1dd600(0x4ec)]['lineHeight'](),_0x268d78=0x0;let _0x14471d=0x0;return this[_0x1dd600(0x3f0)]()===_0x1dd600(0x234)?_0x14471d=0x0:_0x14471d=Graphics[_0x1dd600(0x43e)]-_0x2d5dce,new Rectangle(_0x268d78,_0x14471d,_0x44be7f,_0x2d5dce);},Scene_Menu[_0x195c22(0x49c)]=VisuMZ[_0x195c22(0x6b0)]['Settings'][_0x195c22(0x4fb)]['MainMenu'],VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x26b)]=Scene_Menu[_0x195c22(0x4ec)][_0x195c22(0x503)],Scene_Menu[_0x195c22(0x4ec)][_0x195c22(0x503)]=function(){const _0x385b57=_0x195c22;VisuMZ['CoreEngine'][_0x385b57(0x26b)][_0x385b57(0x48a)](this),this[_0x385b57(0x1f5)]();},Scene_Menu[_0x195c22(0x4ec)][_0x195c22(0x1f5)]=function(){const _0x4a5002=_0x195c22;this[_0x4a5002(0x63e)]&&this[_0x4a5002(0x63e)][_0x4a5002(0x19d)](Scene_Menu[_0x4a5002(0x49c)][_0x4a5002(0x559)]),this[_0x4a5002(0x3db)]&&this[_0x4a5002(0x3db)][_0x4a5002(0x19d)](Scene_Menu['layoutSettings'][_0x4a5002(0x339)]),this[_0x4a5002(0x4da)]&&this['_statusWindow']['setBackgroundType'](Scene_Menu[_0x4a5002(0x49c)][_0x4a5002(0x5dd)]);},Scene_Menu[_0x195c22(0x4ec)][_0x195c22(0x391)]=function(){const _0x27055a=_0x195c22;return Scene_Menu[_0x27055a(0x49c)][_0x27055a(0x3f4)][_0x27055a(0x48a)](this);},Scene_Menu[_0x195c22(0x4ec)][_0x195c22(0x251)]=function(){const _0x21546d=_0x195c22;return Scene_Menu['layoutSettings'][_0x21546d(0x531)][_0x21546d(0x48a)](this);},Scene_Menu['prototype'][_0x195c22(0x1f9)]=function(){const _0x314d18=_0x195c22;return Scene_Menu[_0x314d18(0x49c)][_0x314d18(0x6fb)][_0x314d18(0x48a)](this);},Scene_Item[_0x195c22(0x49c)]=VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x3e5)][_0x195c22(0x4fb)]['ItemMenu'],VisuMZ[_0x195c22(0x6b0)]['Scene_Item_create']=Scene_Item[_0x195c22(0x4ec)]['create'],Scene_Item['prototype'][_0x195c22(0x503)]=function(){const _0x3eb359=_0x195c22;VisuMZ[_0x3eb359(0x6b0)]['Scene_Item_create'][_0x3eb359(0x48a)](this),this[_0x3eb359(0x1f5)]();},Scene_Item[_0x195c22(0x4ec)][_0x195c22(0x1f5)]=function(){const _0x117f15=_0x195c22;this[_0x117f15(0x555)]&&this[_0x117f15(0x555)][_0x117f15(0x19d)](Scene_Item[_0x117f15(0x49c)]['HelpBgType']),this['_categoryWindow']&&this[_0x117f15(0x4d6)][_0x117f15(0x19d)](Scene_Item['layoutSettings'][_0x117f15(0x6ba)]),this[_0x117f15(0x4c1)]&&this[_0x117f15(0x4c1)]['setBackgroundType'](Scene_Item[_0x117f15(0x49c)][_0x117f15(0x4bb)]),this[_0x117f15(0x4f6)]&&this['_actorWindow'][_0x117f15(0x19d)](Scene_Item[_0x117f15(0x49c)]['ActorBgType']);},Scene_Item[_0x195c22(0x4ec)][_0x195c22(0x2b8)]=function(){const _0x414539=_0x195c22;return Scene_Item[_0x414539(0x49c)][_0x414539(0x173)][_0x414539(0x48a)](this);},Scene_Item[_0x195c22(0x4ec)][_0x195c22(0x250)]=function(){const _0x5c4439=_0x195c22;return Scene_Item[_0x5c4439(0x49c)][_0x5c4439(0x43a)]['call'](this);},Scene_Item[_0x195c22(0x4ec)][_0x195c22(0x2ac)]=function(){const _0x2b4099=_0x195c22;return Scene_Item['layoutSettings'][_0x2b4099(0x163)][_0x2b4099(0x48a)](this);},Scene_Item['prototype']['actorWindowRect']=function(){const _0x3746fc=_0x195c22;return Scene_Item[_0x3746fc(0x49c)][_0x3746fc(0x34f)][_0x3746fc(0x48a)](this);},Scene_Skill[_0x195c22(0x49c)]=VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x3e5)]['MenuLayout'][_0x195c22(0x23a)],VisuMZ[_0x195c22(0x6b0)]['Scene_Skill_create']=Scene_Skill['prototype'][_0x195c22(0x503)],Scene_Skill['prototype'][_0x195c22(0x503)]=function(){const _0x31f31e=_0x195c22;VisuMZ[_0x31f31e(0x6b0)][_0x31f31e(0x543)][_0x31f31e(0x48a)](this),this[_0x31f31e(0x1f5)]();},Scene_Skill[_0x195c22(0x4ec)][_0x195c22(0x1f5)]=function(){const _0x2e3e70=_0x195c22;this[_0x2e3e70(0x555)]&&this['_helpWindow'][_0x2e3e70(0x19d)](Scene_Skill[_0x2e3e70(0x49c)][_0x2e3e70(0x64c)]),this[_0x2e3e70(0x16d)]&&this['_skillTypeWindow'][_0x2e3e70(0x19d)](Scene_Skill['layoutSettings'][_0x2e3e70(0x70e)]),this['_statusWindow']&&this[_0x2e3e70(0x4da)][_0x2e3e70(0x19d)](Scene_Skill['layoutSettings'][_0x2e3e70(0x5dd)]),this[_0x2e3e70(0x4c1)]&&this[_0x2e3e70(0x4c1)][_0x2e3e70(0x19d)](Scene_Skill[_0x2e3e70(0x49c)]['ItemBgType']),this[_0x2e3e70(0x4f6)]&&this[_0x2e3e70(0x4f6)][_0x2e3e70(0x19d)](Scene_Skill['layoutSettings'][_0x2e3e70(0x4ce)]);},Scene_Skill[_0x195c22(0x4ec)][_0x195c22(0x2b8)]=function(){const _0x6278dd=_0x195c22;return Scene_Skill[_0x6278dd(0x49c)][_0x6278dd(0x173)][_0x6278dd(0x48a)](this);},Scene_Skill['prototype'][_0x195c22(0x54f)]=function(){const _0x169885=_0x195c22;return Scene_Skill[_0x169885(0x49c)][_0x169885(0x65d)]['call'](this);},Scene_Skill[_0x195c22(0x4ec)][_0x195c22(0x1f9)]=function(){const _0x4940d2=_0x195c22;return Scene_Skill[_0x4940d2(0x49c)][_0x4940d2(0x6fb)][_0x4940d2(0x48a)](this);},Scene_Skill[_0x195c22(0x4ec)]['itemWindowRect']=function(){const _0x414f65=_0x195c22;return Scene_Skill[_0x414f65(0x49c)][_0x414f65(0x163)][_0x414f65(0x48a)](this);},Scene_Skill[_0x195c22(0x4ec)]['actorWindowRect']=function(){const _0x2b0b92=_0x195c22;return Scene_Skill[_0x2b0b92(0x49c)][_0x2b0b92(0x34f)][_0x2b0b92(0x48a)](this);},Scene_Equip['layoutSettings']=VisuMZ['CoreEngine'][_0x195c22(0x3e5)][_0x195c22(0x4fb)]['EquipMenu'],VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x23b)]=Scene_Equip[_0x195c22(0x4ec)][_0x195c22(0x503)],Scene_Equip[_0x195c22(0x4ec)][_0x195c22(0x503)]=function(){const _0x6cf4f2=_0x195c22;VisuMZ[_0x6cf4f2(0x6b0)][_0x6cf4f2(0x23b)][_0x6cf4f2(0x48a)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Equip[_0x195c22(0x4ec)]['setCoreEngineUpdateWindowBg']=function(){const _0x125dbf=_0x195c22;this[_0x125dbf(0x555)]&&this['_helpWindow'][_0x125dbf(0x19d)](Scene_Equip[_0x125dbf(0x49c)]['HelpBgType']),this['_statusWindow']&&this[_0x125dbf(0x4da)][_0x125dbf(0x19d)](Scene_Equip[_0x125dbf(0x49c)][_0x125dbf(0x5dd)]),this['_commandWindow']&&this[_0x125dbf(0x63e)][_0x125dbf(0x19d)](Scene_Equip[_0x125dbf(0x49c)][_0x125dbf(0x559)]),this[_0x125dbf(0x1a3)]&&this['_slotWindow'][_0x125dbf(0x19d)](Scene_Equip[_0x125dbf(0x49c)][_0x125dbf(0x603)]),this[_0x125dbf(0x4c1)]&&this['_itemWindow'][_0x125dbf(0x19d)](Scene_Equip[_0x125dbf(0x49c)][_0x125dbf(0x4bb)]);},Scene_Equip[_0x195c22(0x4ec)][_0x195c22(0x2b8)]=function(){const _0x4cf18a=_0x195c22;return Scene_Equip[_0x4cf18a(0x49c)][_0x4cf18a(0x173)][_0x4cf18a(0x48a)](this);},Scene_Equip[_0x195c22(0x4ec)][_0x195c22(0x1f9)]=function(){const _0x133502=_0x195c22;return Scene_Equip[_0x133502(0x49c)][_0x133502(0x6fb)][_0x133502(0x48a)](this);},Scene_Equip[_0x195c22(0x4ec)]['commandWindowRect']=function(){const _0x9238cf=_0x195c22;return Scene_Equip['layoutSettings'][_0x9238cf(0x3f4)][_0x9238cf(0x48a)](this);},Scene_Equip['prototype'][_0x195c22(0x6c4)]=function(){return Scene_Equip['layoutSettings']['SlotRect']['call'](this);},Scene_Equip[_0x195c22(0x4ec)]['itemWindowRect']=function(){const _0x75459a=_0x195c22;return Scene_Equip[_0x75459a(0x49c)][_0x75459a(0x163)]['call'](this);},Scene_Status[_0x195c22(0x49c)]=VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x3e5)][_0x195c22(0x4fb)][_0x195c22(0x262)],VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x6f2)]=Scene_Status['prototype'][_0x195c22(0x503)],Scene_Status['prototype'][_0x195c22(0x503)]=function(){const _0x4b4061=_0x195c22;VisuMZ[_0x4b4061(0x6b0)][_0x4b4061(0x6f2)][_0x4b4061(0x48a)](this),this[_0x4b4061(0x1f5)]();},Scene_Status['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0xa51314=_0x195c22;this[_0xa51314(0x4a2)]&&this[_0xa51314(0x4a2)][_0xa51314(0x19d)](Scene_Status[_0xa51314(0x49c)]['ProfileBgType']),this[_0xa51314(0x4da)]&&this[_0xa51314(0x4da)][_0xa51314(0x19d)](Scene_Status['layoutSettings']['StatusBgType']),this[_0xa51314(0x1c6)]&&this[_0xa51314(0x1c6)][_0xa51314(0x19d)](Scene_Status[_0xa51314(0x49c)][_0xa51314(0x224)]),this[_0xa51314(0x5d9)]&&this[_0xa51314(0x5d9)][_0xa51314(0x19d)](Scene_Status[_0xa51314(0x49c)][_0xa51314(0x201)]);},Scene_Status[_0x195c22(0x4ec)][_0x195c22(0x648)]=function(){const _0x251bb9=_0x195c22;return Scene_Status[_0x251bb9(0x49c)][_0x251bb9(0x456)][_0x251bb9(0x48a)](this);},Scene_Status[_0x195c22(0x4ec)][_0x195c22(0x1f9)]=function(){const _0xb992eb=_0x195c22;return Scene_Status[_0xb992eb(0x49c)][_0xb992eb(0x6fb)][_0xb992eb(0x48a)](this);},Scene_Status[_0x195c22(0x4ec)][_0x195c22(0x6f9)]=function(){const _0x1de4de=_0x195c22;return Scene_Status[_0x1de4de(0x49c)][_0x1de4de(0x6cf)][_0x1de4de(0x48a)](this);},Scene_Status[_0x195c22(0x4ec)][_0x195c22(0x17a)]=function(){const _0x964ddd=_0x195c22;return Scene_Status[_0x964ddd(0x49c)][_0x964ddd(0x6ae)][_0x964ddd(0x48a)](this);},Scene_Options[_0x195c22(0x49c)]=VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x3e5)][_0x195c22(0x4fb)][_0x195c22(0x390)],VisuMZ['CoreEngine'][_0x195c22(0x167)]=Scene_Options[_0x195c22(0x4ec)][_0x195c22(0x503)],Scene_Options[_0x195c22(0x4ec)][_0x195c22(0x503)]=function(){const _0x1d89d3=_0x195c22;VisuMZ[_0x1d89d3(0x6b0)][_0x1d89d3(0x167)][_0x1d89d3(0x48a)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Options[_0x195c22(0x4ec)][_0x195c22(0x1f5)]=function(){const _0x2fe5a2=_0x195c22;this[_0x2fe5a2(0x40d)]&&this[_0x2fe5a2(0x40d)][_0x2fe5a2(0x19d)](Scene_Options[_0x2fe5a2(0x49c)]['OptionsBgType']);},Scene_Options[_0x195c22(0x4ec)][_0x195c22(0x236)]=function(){const _0x4117ad=_0x195c22;return Scene_Options[_0x4117ad(0x49c)][_0x4117ad(0x5af)][_0x4117ad(0x48a)](this);},Scene_Save['layoutSettings']=VisuMZ['CoreEngine'][_0x195c22(0x3e5)][_0x195c22(0x4fb)][_0x195c22(0x414)],Scene_Save[_0x195c22(0x4ec)][_0x195c22(0x503)]=function(){const _0x27d5dd=_0x195c22;Scene_File[_0x27d5dd(0x4ec)][_0x27d5dd(0x503)][_0x27d5dd(0x48a)](this),this[_0x27d5dd(0x1f5)]();},Scene_Save[_0x195c22(0x4ec)][_0x195c22(0x1f5)]=function(){const _0x198a32=_0x195c22;this[_0x198a32(0x555)]&&this[_0x198a32(0x555)][_0x198a32(0x19d)](Scene_Save[_0x198a32(0x49c)]['HelpBgType']),this[_0x198a32(0x6c6)]&&this['_listWindow']['setBackgroundType'](Scene_Save['layoutSettings'][_0x198a32(0x360)]);},Scene_Save['prototype']['helpWindowRect']=function(){const _0x13f7fa=_0x195c22;return Scene_Save[_0x13f7fa(0x49c)][_0x13f7fa(0x173)]['call'](this);},Scene_Save[_0x195c22(0x4ec)][_0x195c22(0x22f)]=function(){const _0x442822=_0x195c22;return Scene_Save[_0x442822(0x49c)]['ListRect']['call'](this);},Scene_Load[_0x195c22(0x49c)]=VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x3e5)]['MenuLayout']['LoadMenu'],Scene_Load['prototype'][_0x195c22(0x503)]=function(){const _0x33849c=_0x195c22;Scene_File[_0x33849c(0x4ec)][_0x33849c(0x503)][_0x33849c(0x48a)](this),this[_0x33849c(0x1f5)]();},Scene_Load['prototype'][_0x195c22(0x1f5)]=function(){const _0xd4d29b=_0x195c22;this[_0xd4d29b(0x555)]&&this['_helpWindow'][_0xd4d29b(0x19d)](Scene_Load['layoutSettings'][_0xd4d29b(0x64c)]),this[_0xd4d29b(0x6c6)]&&this[_0xd4d29b(0x6c6)][_0xd4d29b(0x19d)](Scene_Load[_0xd4d29b(0x49c)][_0xd4d29b(0x360)]);},Scene_Load['prototype']['helpWindowRect']=function(){const _0x4d5f63=_0x195c22;return Scene_Load[_0x4d5f63(0x49c)][_0x4d5f63(0x173)][_0x4d5f63(0x48a)](this);},Scene_Load[_0x195c22(0x4ec)]['listWindowRect']=function(){const _0x26fccb=_0x195c22;return Scene_Load['layoutSettings']['ListRect'][_0x26fccb(0x48a)](this);},Scene_GameEnd[_0x195c22(0x49c)]=VisuMZ['CoreEngine'][_0x195c22(0x3e5)][_0x195c22(0x4fb)][_0x195c22(0x1ac)],VisuMZ[_0x195c22(0x6b0)]['Scene_GameEnd_createBackground']=Scene_GameEnd['prototype']['createBackground'],Scene_GameEnd[_0x195c22(0x4ec)][_0x195c22(0x568)]=function(){const _0x3a892c=_0x195c22;Scene_MenuBase[_0x3a892c(0x4ec)]['createBackground'][_0x3a892c(0x48a)](this);},Scene_GameEnd[_0x195c22(0x4ec)][_0x195c22(0x330)]=function(){const _0x521464=_0x195c22,_0x4718c8=this[_0x521464(0x391)]();this[_0x521464(0x63e)]=new Window_GameEnd(_0x4718c8),this[_0x521464(0x63e)][_0x521464(0x31c)]('cancel',this[_0x521464(0x541)][_0x521464(0x70a)](this)),this[_0x521464(0x5fc)](this['_commandWindow']),this[_0x521464(0x63e)]['setBackgroundType'](Scene_GameEnd[_0x521464(0x49c)][_0x521464(0x559)]);},Scene_GameEnd[_0x195c22(0x4ec)][_0x195c22(0x391)]=function(){const _0x861d7c=_0x195c22;return Scene_GameEnd[_0x861d7c(0x49c)][_0x861d7c(0x3f4)]['call'](this);},Scene_Shop[_0x195c22(0x49c)]=VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x3e5)][_0x195c22(0x4fb)][_0x195c22(0x544)],VisuMZ['CoreEngine'][_0x195c22(0x525)]=Scene_Shop[_0x195c22(0x4ec)][_0x195c22(0x503)],Scene_Shop[_0x195c22(0x4ec)][_0x195c22(0x503)]=function(){const _0x23ecf7=_0x195c22;VisuMZ[_0x23ecf7(0x6b0)][_0x23ecf7(0x525)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Shop[_0x195c22(0x4ec)][_0x195c22(0x1f5)]=function(){const _0x2ca1d2=_0x195c22;this[_0x2ca1d2(0x555)]&&this[_0x2ca1d2(0x555)][_0x2ca1d2(0x19d)](Scene_Shop['layoutSettings'][_0x2ca1d2(0x64c)]),this['_goldWindow']&&this['_goldWindow']['setBackgroundType'](Scene_Shop[_0x2ca1d2(0x49c)][_0x2ca1d2(0x339)]),this[_0x2ca1d2(0x63e)]&&this['_commandWindow'][_0x2ca1d2(0x19d)](Scene_Shop['layoutSettings'][_0x2ca1d2(0x559)]),this[_0x2ca1d2(0x378)]&&this[_0x2ca1d2(0x378)][_0x2ca1d2(0x19d)](Scene_Shop[_0x2ca1d2(0x49c)][_0x2ca1d2(0x1ab)]),this[_0x2ca1d2(0x499)]&&this[_0x2ca1d2(0x499)]['setBackgroundType'](Scene_Shop[_0x2ca1d2(0x49c)][_0x2ca1d2(0x153)]),this[_0x2ca1d2(0x4da)]&&this[_0x2ca1d2(0x4da)][_0x2ca1d2(0x19d)](Scene_Shop['layoutSettings']['StatusBgType']),this[_0x2ca1d2(0x5ac)]&&this[_0x2ca1d2(0x5ac)][_0x2ca1d2(0x19d)](Scene_Shop[_0x2ca1d2(0x49c)][_0x2ca1d2(0x2bb)]),this[_0x2ca1d2(0x4d6)]&&this[_0x2ca1d2(0x4d6)]['setBackgroundType'](Scene_Shop[_0x2ca1d2(0x49c)][_0x2ca1d2(0x6ba)]),this[_0x2ca1d2(0x198)]&&this['_sellWindow'][_0x2ca1d2(0x19d)](Scene_Shop[_0x2ca1d2(0x49c)][_0x2ca1d2(0x63a)]);},Scene_Shop[_0x195c22(0x4ec)][_0x195c22(0x2b8)]=function(){const _0x28012f=_0x195c22;return Scene_Shop[_0x28012f(0x49c)]['HelpRect'][_0x28012f(0x48a)](this);},Scene_Shop['prototype'][_0x195c22(0x251)]=function(){const _0xba29ce=_0x195c22;return Scene_Shop[_0xba29ce(0x49c)][_0xba29ce(0x531)][_0xba29ce(0x48a)](this);},Scene_Shop['prototype'][_0x195c22(0x391)]=function(){const _0x4ea50f=_0x195c22;return Scene_Shop[_0x4ea50f(0x49c)][_0x4ea50f(0x3f4)][_0x4ea50f(0x48a)](this);},Scene_Shop[_0x195c22(0x4ec)][_0x195c22(0x3e1)]=function(){const _0x36fca5=_0x195c22;return Scene_Shop[_0x36fca5(0x49c)][_0x36fca5(0x692)][_0x36fca5(0x48a)](this);},Scene_Shop[_0x195c22(0x4ec)][_0x195c22(0x6fa)]=function(){return Scene_Shop['layoutSettings']['NumberRect']['call'](this);},Scene_Shop[_0x195c22(0x4ec)][_0x195c22(0x1f9)]=function(){const _0x48b127=_0x195c22;return Scene_Shop[_0x48b127(0x49c)][_0x48b127(0x6fb)]['call'](this);},Scene_Shop[_0x195c22(0x4ec)]['buyWindowRect']=function(){const _0x5771b4=_0x195c22;return Scene_Shop[_0x5771b4(0x49c)][_0x5771b4(0x24c)]['call'](this);},Scene_Shop[_0x195c22(0x4ec)][_0x195c22(0x250)]=function(){const _0x4ccb67=_0x195c22;return Scene_Shop[_0x4ccb67(0x49c)][_0x4ccb67(0x43a)][_0x4ccb67(0x48a)](this);},Scene_Shop[_0x195c22(0x4ec)][_0x195c22(0x1e8)]=function(){const _0x4fcc51=_0x195c22;return Scene_Shop['layoutSettings'][_0x4fcc51(0x68c)][_0x4fcc51(0x48a)](this);},Scene_Name[_0x195c22(0x49c)]=VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x3e5)][_0x195c22(0x4fb)][_0x195c22(0x6b1)],VisuMZ['CoreEngine'][_0x195c22(0x2ff)]=Scene_Name[_0x195c22(0x4ec)]['create'],Scene_Name[_0x195c22(0x4ec)][_0x195c22(0x503)]=function(){const _0x6ba105=_0x195c22;VisuMZ[_0x6ba105(0x6b0)]['Scene_Name_create']['call'](this),this[_0x6ba105(0x1f5)]();},Scene_Name[_0x195c22(0x4ec)][_0x195c22(0x1f5)]=function(){const _0x2fa999=_0x195c22;this[_0x2fa999(0x5ec)]&&this[_0x2fa999(0x5ec)][_0x2fa999(0x19d)](Scene_Name[_0x2fa999(0x49c)][_0x2fa999(0x44c)]),this[_0x2fa999(0x42d)]&&this[_0x2fa999(0x42d)][_0x2fa999(0x19d)](Scene_Name[_0x2fa999(0x49c)][_0x2fa999(0x46b)]);},Scene_Name[_0x195c22(0x4ec)][_0x195c22(0x2b7)]=function(){return 0x0;},Scene_Name['prototype'][_0x195c22(0x6be)]=function(){const _0x3ef859=_0x195c22;return Scene_Name[_0x3ef859(0x49c)]['EditRect']['call'](this);},Scene_Name[_0x195c22(0x4ec)][_0x195c22(0x5e1)]=function(){const _0x15368f=_0x195c22;return Scene_Name[_0x15368f(0x49c)][_0x15368f(0x60a)][_0x15368f(0x48a)](this);},Scene_Name[_0x195c22(0x4ec)][_0x195c22(0x5cf)]=function(){const _0x525e4b=_0x195c22;if(!this[_0x525e4b(0x42d)])return![];return VisuMZ[_0x525e4b(0x6b0)]['Settings'][_0x525e4b(0x15b)][_0x525e4b(0x5cf)];},Scene_Name[_0x195c22(0x4ec)][_0x195c22(0x710)]=function(){const _0x770c19=_0x195c22;return this[_0x770c19(0x5cf)]()?TextManager['getInputButtonString'](_0x770c19(0x702)):Scene_MenuBase[_0x770c19(0x4ec)][_0x770c19(0x710)][_0x770c19(0x48a)](this);},Scene_Name['prototype'][_0x195c22(0x482)]=function(){const _0x485385=_0x195c22;if(this[_0x485385(0x5cf)]()){const _0x2799dd=VisuMZ[_0x485385(0x6b0)][_0x485385(0x3e5)]['KeyboardInput'];return this['_inputWindow'][_0x485385(0x429)]===_0x485385(0x2ce)?_0x2799dd['Keyboard']||_0x485385(0x635):_0x2799dd[_0x485385(0x46d)]||_0x485385(0x46d);}else return Scene_MenuBase[_0x485385(0x4ec)][_0x485385(0x482)][_0x485385(0x48a)](this);},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x576)]=Scene_Name[_0x195c22(0x4ec)][_0x195c22(0x192)],Scene_Name[_0x195c22(0x4ec)][_0x195c22(0x192)]=function(){const _0x48a0d6=_0x195c22;this['doesNameContainBannedWords']()?this[_0x48a0d6(0x64f)]():VisuMZ[_0x48a0d6(0x6b0)][_0x48a0d6(0x576)]['call'](this);},Scene_Name[_0x195c22(0x4ec)][_0x195c22(0x1a0)]=function(){const _0x111df7=_0x195c22,_0x4d12d3=VisuMZ[_0x111df7(0x6b0)][_0x111df7(0x3e5)]['KeyboardInput'];if(!_0x4d12d3)return![];const _0x5b3478=_0x4d12d3[_0x111df7(0x15e)];if(!_0x5b3478)return![];const _0x4c8f52=this[_0x111df7(0x5ec)]['name']()[_0x111df7(0x473)]();for(const _0x4e6e75 of _0x5b3478){if(_0x4c8f52[_0x111df7(0x161)](_0x4e6e75[_0x111df7(0x473)]()))return!![];}return![];},Scene_Name[_0x195c22(0x4ec)]['onInputBannedWords']=function(){const _0x13d10d=_0x195c22;SoundManager[_0x13d10d(0x547)]();},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x560)]=Scene_Battle[_0x195c22(0x4ec)][_0x195c22(0x684)],Scene_Battle['prototype'][_0x195c22(0x684)]=function(){const _0x1a51d6=_0x195c22;VisuMZ['CoreEngine'][_0x1a51d6(0x560)][_0x1a51d6(0x48a)](this);if($gameTemp[_0x1a51d6(0x55e)])this[_0x1a51d6(0x351)]();},Scene_Battle[_0x195c22(0x4ec)]['updatePlayTestF7']=function(){const _0x4b0d20=_0x195c22;!BattleManager[_0x4b0d20(0x1f4)]()&&!this[_0x4b0d20(0x263)]&&!$gameMessage[_0x4b0d20(0x27c)]()&&(this[_0x4b0d20(0x263)]=!![],this[_0x4b0d20(0x684)](),SceneManager['updateEffekseer'](),this[_0x4b0d20(0x263)]=![]);},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x714)]=Scene_Battle[_0x195c22(0x4ec)]['createCancelButton'],Scene_Battle[_0x195c22(0x4ec)]['createCancelButton']=function(){const _0x115c97=_0x195c22;VisuMZ[_0x115c97(0x6b0)][_0x115c97(0x714)][_0x115c97(0x48a)](this),SceneManager[_0x115c97(0x3d0)]()&&this[_0x115c97(0x70f)]();},Scene_Battle[_0x195c22(0x4ec)][_0x195c22(0x70f)]=function(){const _0x4851dd=_0x195c22;this[_0x4851dd(0x2d6)]['x']=Graphics['boxWidth']+0x4,this[_0x4851dd(0x381)]()?this[_0x4851dd(0x2d6)]['y']=Graphics['boxHeight']-this[_0x4851dd(0x3d3)]():this[_0x4851dd(0x2d6)]['y']=0x0;},VisuMZ[_0x195c22(0x6b0)]['Sprite_Button_initialize']=Sprite_Button['prototype'][_0x195c22(0x4ff)],Sprite_Button['prototype'][_0x195c22(0x4ff)]=function(_0x3a7cd5){const _0x5d5182=_0x195c22;VisuMZ[_0x5d5182(0x6b0)]['Sprite_Button_initialize'][_0x5d5182(0x48a)](this,_0x3a7cd5),this[_0x5d5182(0x1c8)]();},Sprite_Button[_0x195c22(0x4ec)][_0x195c22(0x1c8)]=function(){const _0x3163ea=_0x195c22,_0x169fd9=VisuMZ['CoreEngine'][_0x3163ea(0x3e5)]['UI'];this['_isButtonHidden']=![];switch(this[_0x3163ea(0x65b)]){case _0x3163ea(0x37a):this[_0x3163ea(0x69c)]=!_0x169fd9[_0x3163ea(0x677)];break;case _0x3163ea(0x47a):case _0x3163ea(0x156):this[_0x3163ea(0x69c)]=!_0x169fd9[_0x3163ea(0x2c1)];break;case _0x3163ea(0x215):case'up':case _0x3163ea(0x2c6):case _0x3163ea(0x6b2):case'ok':this[_0x3163ea(0x69c)]=!_0x169fd9[_0x3163ea(0x61b)];break;case'menu':this[_0x3163ea(0x69c)]=!_0x169fd9[_0x3163ea(0x60c)];break;}},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x42f)]=Sprite_Button[_0x195c22(0x4ec)]['updateOpacity'],Sprite_Button[_0x195c22(0x4ec)][_0x195c22(0x505)]=function(){const _0x3e3278=_0x195c22;SceneManager[_0x3e3278(0x22c)]()||this[_0x3e3278(0x69c)]?this[_0x3e3278(0x1d4)]():VisuMZ[_0x3e3278(0x6b0)][_0x3e3278(0x42f)]['call'](this);},Sprite_Button[_0x195c22(0x4ec)][_0x195c22(0x1d4)]=function(){const _0x3d1720=_0x195c22;this[_0x3d1720(0x25c)]=![],this[_0x3d1720(0x2c2)]=0x0,this['x']=Graphics[_0x3d1720(0x686)]*0xa,this['y']=Graphics['height']*0xa;},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x233)]=Sprite_Battler[_0x195c22(0x4ec)]['startMove'],Sprite_Battler[_0x195c22(0x4ec)][_0x195c22(0x3ba)]=function(_0x20f6ca,_0x4eec6b,_0x5ad644){const _0x362ea3=_0x195c22;(this[_0x362ea3(0x52b)]!==_0x20f6ca||this[_0x362ea3(0x430)]!==_0x4eec6b)&&(this['setMoveEasingType'](_0x362ea3(0x1eb)),this['_movementWholeDuration']=_0x5ad644),VisuMZ[_0x362ea3(0x6b0)][_0x362ea3(0x233)][_0x362ea3(0x48a)](this,_0x20f6ca,_0x4eec6b,_0x5ad644);},Sprite_Battler[_0x195c22(0x4ec)]['setMoveEasingType']=function(_0xb56cc7){const _0x3f6ecb=_0x195c22;this[_0x3f6ecb(0x501)]=_0xb56cc7;},Sprite_Battler[_0x195c22(0x4ec)][_0x195c22(0x4a1)]=function(){const _0x39e3b8=_0x195c22;if(this[_0x39e3b8(0x54a)]<=0x0)return;const _0x41f4e6=this['_movementDuration'],_0x1b2cc1=this[_0x39e3b8(0x3f2)],_0x58809a=this['_moveEasingType'];this['_offsetX']=this[_0x39e3b8(0x2a4)](this[_0x39e3b8(0x62f)],this['_targetOffsetX'],_0x41f4e6,_0x1b2cc1,_0x58809a),this[_0x39e3b8(0x443)]=this[_0x39e3b8(0x2a4)](this[_0x39e3b8(0x443)],this[_0x39e3b8(0x430)],_0x41f4e6,_0x1b2cc1,_0x58809a),this[_0x39e3b8(0x54a)]--;if(this['_movementDuration']<=0x0)this[_0x39e3b8(0x5f6)]();},Sprite_Battler[_0x195c22(0x4ec)][_0x195c22(0x2a4)]=function(_0x272fc0,_0x134f8a,_0x196d02,_0x7191c4,_0x7da330){const _0x3bf5ab=_0x195c22,_0x37102b=VisuMZ[_0x3bf5ab(0x385)]((_0x7191c4-_0x196d02)/_0x7191c4,_0x7da330||'Linear'),_0x531528=VisuMZ['ApplyEasing']((_0x7191c4-_0x196d02+0x1)/_0x7191c4,_0x7da330||_0x3bf5ab(0x1eb)),_0x291d54=(_0x272fc0-_0x134f8a*_0x37102b)/(0x1-_0x37102b);return _0x291d54+(_0x134f8a-_0x291d54)*_0x531528;},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x33c)]=Sprite_Actor[_0x195c22(0x4ec)][_0x195c22(0x1fb)],Sprite_Actor[_0x195c22(0x4ec)]['setActorHome']=function(_0x48101f){const _0x3ac261=_0x195c22;VisuMZ[_0x3ac261(0x6b0)][_0x3ac261(0x3e5)]['UI']['RepositionActors']?this[_0x3ac261(0x3e2)](_0x48101f):VisuMZ[_0x3ac261(0x6b0)][_0x3ac261(0x33c)][_0x3ac261(0x48a)](this,_0x48101f);},Sprite_Actor[_0x195c22(0x4ec)][_0x195c22(0x3e2)]=function(_0x277868){const _0x4156bc=_0x195c22;let _0x5de115=Math[_0x4156bc(0x643)](Graphics[_0x4156bc(0x686)]/0x2+0xc0);_0x5de115-=Math[_0x4156bc(0x644)]((Graphics['width']-Graphics[_0x4156bc(0x6dc)])/0x2),_0x5de115+=_0x277868*0x20;let _0x1ad6f8=Graphics[_0x4156bc(0x466)]-0xc8-$gameParty['maxBattleMembers']()*0x30;_0x1ad6f8-=Math[_0x4156bc(0x644)]((Graphics[_0x4156bc(0x466)]-Graphics[_0x4156bc(0x43e)])/0x2),_0x1ad6f8+=_0x277868*0x30,this[_0x4156bc(0x508)](_0x5de115,_0x1ad6f8);},Sprite_Actor[_0x195c22(0x4ec)][_0x195c22(0x26c)]=function(){const _0x1abf07=_0x195c22;this[_0x1abf07(0x3ba)](0x4b0,0x0,0x78);},Sprite_Animation[_0x195c22(0x4ec)][_0x195c22(0x6a5)]=function(_0x25cd15){const _0x168aca=_0x195c22;this[_0x168aca(0x3ff)]=_0x25cd15;},VisuMZ[_0x195c22(0x6b0)]['Sprite_Animation_processSoundTimings']=Sprite_Animation[_0x195c22(0x4ec)][_0x195c22(0x219)],Sprite_Animation[_0x195c22(0x4ec)][_0x195c22(0x219)]=function(){const _0x222da=_0x195c22;if(this[_0x222da(0x3ff)])return;VisuMZ['CoreEngine'][_0x222da(0x586)]['call'](this);},Sprite_Animation['prototype'][_0x195c22(0x22d)]=function(_0x2a9f81){const _0xa4b7d9=_0x195c22;if(_0x2a9f81[_0xa4b7d9(0x470)]){}const _0xfce370=this[_0xa4b7d9(0x5c5)][_0xa4b7d9(0x220)];let _0x31e6e0=_0x2a9f81[_0xa4b7d9(0x466)]*_0x2a9f81[_0xa4b7d9(0x211)]['y'],_0x2b9895=0x0,_0x1f4afd=-_0x31e6e0/0x2;if(_0xfce370['match'](/<(?:HEAD|HEADER|TOP)>/i))_0x1f4afd=-_0x31e6e0;if(_0xfce370['match'](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x1f4afd=0x0;if(_0xfce370[_0xa4b7d9(0x5b6)](/<(?:LEFT)>/i))_0x2b9895=-_0x2a9f81[_0xa4b7d9(0x686)]/0x2;if(_0xfce370[_0xa4b7d9(0x5b6)](/<(?:RIGHT)>/i))_0x1f4afd=_0x2a9f81[_0xa4b7d9(0x686)]/0x2;if(_0xfce370['match'](/<ANCHOR X:[ ](\d+\.?\d*)>/i))_0x2b9895=Number(RegExp['$1'])*_0x2a9f81[_0xa4b7d9(0x686)];_0xfce370[_0xa4b7d9(0x5b6)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x1f4afd=(0x1-Number(RegExp['$1']))*-_0x31e6e0);_0xfce370[_0xa4b7d9(0x5b6)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x2b9895=Number(RegExp['$1'])*_0x2a9f81[_0xa4b7d9(0x686)],_0x1f4afd=(0x1-Number(RegExp['$2']))*-_0x31e6e0);if(_0xfce370[_0xa4b7d9(0x5b6)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x2b9895+=Number(RegExp['$1']);if(_0xfce370[_0xa4b7d9(0x5b6)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x1f4afd+=Number(RegExp['$1']);_0xfce370[_0xa4b7d9(0x5b6)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x2b9895+=Number(RegExp['$1']),_0x1f4afd+=Number(RegExp['$2']));const _0xc0e4c8=new Point(_0x2b9895,_0x1f4afd);return _0x2a9f81[_0xa4b7d9(0x195)](),_0x2a9f81[_0xa4b7d9(0x436)][_0xa4b7d9(0x1c3)](_0xc0e4c8);},Sprite_AnimationMV[_0x195c22(0x4ec)][_0x195c22(0x6a5)]=function(_0x1c90d0){const _0x2376bb=_0x195c22;this[_0x2376bb(0x3ff)]=_0x1c90d0;},VisuMZ[_0x195c22(0x6b0)]['Sprite_AnimationMV_processTimingData']=Sprite_AnimationMV[_0x195c22(0x4ec)][_0x195c22(0x642)],Sprite_AnimationMV[_0x195c22(0x4ec)]['processTimingData']=function(_0x2e3376){const _0x2e3a16=_0x195c22;this[_0x2e3a16(0x3ff)]&&(_0x2e3376=JsonEx[_0x2e3a16(0x469)](_0x2e3376),_0x2e3376['se']&&(_0x2e3376['se'][_0x2e3a16(0x1b4)]=0x0)),VisuMZ[_0x2e3a16(0x6b0)][_0x2e3a16(0x41e)][_0x2e3a16(0x48a)](this,_0x2e3376);},Sprite_Damage[_0x195c22(0x4ec)][_0x195c22(0x39e)]=function(_0x280077){const _0x380d5e=_0x195c22;let _0x53325f=Math['abs'](_0x280077)['toString']();this[_0x380d5e(0x304)]()&&(_0x53325f=VisuMZ[_0x380d5e(0x4f1)](_0x53325f));const _0x2c94ea=this[_0x380d5e(0x6d7)](),_0x42a6b9=Math[_0x380d5e(0x644)](_0x2c94ea*0.75);for(let _0x43f215=0x0;_0x43f215<_0x53325f[_0x380d5e(0x397)];_0x43f215++){const _0x4c1556=this[_0x380d5e(0x6de)](_0x42a6b9,_0x2c94ea);_0x4c1556[_0x380d5e(0x209)]['drawText'](_0x53325f[_0x43f215],0x0,0x0,_0x42a6b9,_0x2c94ea,'center'),_0x4c1556['x']=(_0x43f215-(_0x53325f['length']-0x1)/0x2)*_0x42a6b9,_0x4c1556['dy']=-_0x43f215;}},Sprite_Damage['prototype']['useDigitGrouping']=function(){const _0x5be138=_0x195c22;return VisuMZ[_0x5be138(0x6b0)][_0x5be138(0x3e5)]['QoL'][_0x5be138(0x6eb)];},Sprite_Damage[_0x195c22(0x4ec)][_0x195c22(0x393)]=function(){const _0x393053=_0x195c22;return ColorManager[_0x393053(0x18e)]();},VisuMZ['CoreEngine']['Sprite_Gauge_gaugeRate']=Sprite_Gauge['prototype'][_0x195c22(0x23e)],Sprite_Gauge[_0x195c22(0x4ec)][_0x195c22(0x23e)]=function(){const _0x569ab6=_0x195c22;return VisuMZ['CoreEngine'][_0x569ab6(0x405)][_0x569ab6(0x48a)](this)[_0x569ab6(0x606)](0x0,0x1);},VisuMZ['CoreEngine']['Sprite_Gauge_currentValue']=Sprite_Gauge[_0x195c22(0x4ec)][_0x195c22(0x1c7)],Sprite_Gauge['prototype']['currentValue']=function(){const _0x4ac3c7=_0x195c22;let _0x40c703=VisuMZ['CoreEngine'][_0x4ac3c7(0x6ed)][_0x4ac3c7(0x48a)](this);return _0x40c703;},Sprite_Gauge[_0x195c22(0x4ec)][_0x195c22(0x669)]=function(){const _0x17847f=_0x195c22;let _0x24c22b=this['currentValue']();this[_0x17847f(0x304)]()&&(_0x24c22b=VisuMZ[_0x17847f(0x4f1)](_0x24c22b));const _0xc38b5f=this['bitmapWidth']()-0x1,_0x349efd=this[_0x17847f(0x51c)]();this[_0x17847f(0x5a1)](),this[_0x17847f(0x209)][_0x17847f(0x4f9)](_0x24c22b,0x0,0x0,_0xc38b5f,_0x349efd,'right');},Sprite_Gauge[_0x195c22(0x4ec)][_0x195c22(0x460)]=function(){return 0x3;},Sprite_Gauge[_0x195c22(0x4ec)][_0x195c22(0x304)]=function(){const _0xf161ed=_0x195c22;return VisuMZ['CoreEngine'][_0xf161ed(0x3e5)][_0xf161ed(0x66d)][_0xf161ed(0x343)];},Sprite_Gauge[_0x195c22(0x4ec)][_0x195c22(0x393)]=function(){const _0x538cc4=_0x195c22;return ColorManager[_0x538cc4(0x422)]();};function Sprite_TitlePictureButton(){const _0x3b9b9b=_0x195c22;this[_0x3b9b9b(0x4ff)](...arguments);}Sprite_TitlePictureButton[_0x195c22(0x4ec)]=Object['create'](Sprite_Clickable[_0x195c22(0x4ec)]),Sprite_TitlePictureButton[_0x195c22(0x4ec)]['constructor']=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x195c22(0x4ec)][_0x195c22(0x4ff)]=function(_0x5ea180){const _0x2f0dbc=_0x195c22;Sprite_Clickable[_0x2f0dbc(0x4ec)]['initialize']['call'](this),this[_0x2f0dbc(0x6bf)]=_0x5ea180,this[_0x2f0dbc(0x5fa)]=null,this[_0x2f0dbc(0x170)]();},Sprite_TitlePictureButton[_0x195c22(0x4ec)][_0x195c22(0x170)]=function(){const _0x52b74a=_0x195c22;this['x']=Graphics[_0x52b74a(0x686)],this['y']=Graphics[_0x52b74a(0x466)],this[_0x52b74a(0x25c)]=![],this['setupButtonImage']();},Sprite_TitlePictureButton[_0x195c22(0x4ec)][_0x195c22(0x682)]=function(){const _0x3067a5=_0x195c22;this[_0x3067a5(0x209)]=ImageManager['loadPicture'](this[_0x3067a5(0x6bf)][_0x3067a5(0x5b7)]),this[_0x3067a5(0x209)][_0x3067a5(0x165)](this[_0x3067a5(0x5e7)][_0x3067a5(0x70a)](this));},Sprite_TitlePictureButton['prototype'][_0x195c22(0x5e7)]=function(){const _0x419a8e=_0x195c22;this[_0x419a8e(0x6bf)][_0x419a8e(0x1ef)][_0x419a8e(0x48a)](this),this[_0x419a8e(0x6bf)][_0x419a8e(0x4b7)][_0x419a8e(0x48a)](this),this[_0x419a8e(0x4be)](this[_0x419a8e(0x6bf)][_0x419a8e(0x200)][_0x419a8e(0x70a)](this));},Sprite_TitlePictureButton[_0x195c22(0x4ec)][_0x195c22(0x684)]=function(){const _0x4b2fc4=_0x195c22;Sprite_Clickable[_0x4b2fc4(0x4ec)][_0x4b2fc4(0x684)]['call'](this),this[_0x4b2fc4(0x505)](),this[_0x4b2fc4(0x59a)]();},Sprite_TitlePictureButton[_0x195c22(0x4ec)][_0x195c22(0x43c)]=function(){const _0x2906f4=_0x195c22;return VisuMZ[_0x2906f4(0x6b0)][_0x2906f4(0x3e5)][_0x2906f4(0x4fb)][_0x2906f4(0x359)][_0x2906f4(0x338)];},Sprite_TitlePictureButton[_0x195c22(0x4ec)][_0x195c22(0x505)]=function(){const _0xcb62c8=_0x195c22;this[_0xcb62c8(0x206)]?this[_0xcb62c8(0x2c2)]=0xff:(this[_0xcb62c8(0x2c2)]+=this['visible']?this[_0xcb62c8(0x43c)]():-0x1*this['fadeSpeed'](),this['opacity']=Math[_0xcb62c8(0x29d)](0xc0,this[_0xcb62c8(0x2c2)]));},Sprite_TitlePictureButton[_0x195c22(0x4ec)][_0x195c22(0x4be)]=function(_0x460f6a){const _0x29cf4a=_0x195c22;this[_0x29cf4a(0x5fa)]=_0x460f6a;},Sprite_TitlePictureButton[_0x195c22(0x4ec)]['onClick']=function(){const _0x5fe224=_0x195c22;this[_0x5fe224(0x5fa)]&&this['_clickHandler']();},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x2fa)]=Spriteset_Base[_0x195c22(0x4ec)][_0x195c22(0x4ff)],Spriteset_Base[_0x195c22(0x4ec)][_0x195c22(0x4ff)]=function(){const _0x3c8480=_0x195c22;VisuMZ[_0x3c8480(0x6b0)][_0x3c8480(0x2fa)][_0x3c8480(0x48a)](this),this[_0x3c8480(0x517)]();},Spriteset_Base['prototype'][_0x195c22(0x517)]=function(){const _0x3dfeb8=_0x195c22;this[_0x3dfeb8(0x2e0)]=[],this[_0x3dfeb8(0x47b)]=this[_0x3dfeb8(0x211)]['x'],this[_0x3dfeb8(0x38d)]=this['scale']['y'];},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x68d)]=Spriteset_Base[_0x195c22(0x4ec)][_0x195c22(0x502)],Spriteset_Base[_0x195c22(0x4ec)][_0x195c22(0x502)]=function(_0x30933f){const _0x4e5bf4=_0x195c22;this[_0x4e5bf4(0x332)](),VisuMZ[_0x4e5bf4(0x6b0)][_0x4e5bf4(0x68d)][_0x4e5bf4(0x48a)](this,_0x30933f);},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x6e3)]=Spriteset_Base[_0x195c22(0x4ec)][_0x195c22(0x684)],Spriteset_Base[_0x195c22(0x4ec)]['update']=function(){const _0x2fe442=_0x195c22;VisuMZ['CoreEngine'][_0x2fe442(0x6e3)][_0x2fe442(0x48a)](this),this[_0x2fe442(0x411)](),this[_0x2fe442(0x287)]();},Spriteset_Base[_0x195c22(0x4ec)][_0x195c22(0x411)]=function(){const _0x33749e=_0x195c22;if(!VisuMZ[_0x33749e(0x6b0)]['Settings'][_0x33749e(0x66d)][_0x33749e(0x608)])return;if(this[_0x33749e(0x47b)]===this[_0x33749e(0x211)]['x']&&this[_0x33749e(0x38d)]===this['scale']['y'])return;this['adjustPictureAntiZoom'](),this[_0x33749e(0x47b)]=this['scale']['x'],this['_cacheScaleY']=this[_0x33749e(0x211)]['y'];},Spriteset_Base[_0x195c22(0x4ec)][_0x195c22(0x415)]=function(){const _0x523da4=_0x195c22;this[_0x523da4(0x211)]['x']!==0x0&&(this['_pictureContainer'][_0x523da4(0x211)]['x']=0x1/this['scale']['x'],this['_pictureContainer']['x']=-(this['x']/this[_0x523da4(0x211)]['x'])),this[_0x523da4(0x211)]['y']!==0x0&&(this[_0x523da4(0x281)][_0x523da4(0x211)]['y']=0x1/this[_0x523da4(0x211)]['y'],this['_pictureContainer']['y']=-(this['y']/this[_0x523da4(0x211)]['y']));},Spriteset_Base[_0x195c22(0x4ec)]['updateFauxAnimations']=function(){const _0x58e867=_0x195c22;for(const _0x5e89be of this[_0x58e867(0x2e0)]){!_0x5e89be[_0x58e867(0x203)]()&&this[_0x58e867(0x160)](_0x5e89be);}this[_0x58e867(0x58e)]();},Spriteset_Base[_0x195c22(0x4ec)][_0x195c22(0x58e)]=function(){const _0x5a255c=_0x195c22;for(;;){const _0x27183c=$gameTemp[_0x5a255c(0x36e)]();if(_0x27183c)this[_0x5a255c(0x4ed)](_0x27183c);else break;}},Spriteset_Base[_0x195c22(0x4ec)]['createFauxAnimation']=function(_0x7812d){const _0x38f9eb=_0x195c22,_0xebaa02=$dataAnimations[_0x7812d[_0x38f9eb(0x690)]],_0x1d2e86=_0x7812d[_0x38f9eb(0x59e)],_0x5d899d=_0x7812d[_0x38f9eb(0x4c8)],_0xf4a67c=_0x7812d[_0x38f9eb(0x22a)];let _0x12afeb=this[_0x38f9eb(0x5aa)]();const _0x1f009a=this[_0x38f9eb(0x2a5)]();if(this[_0x38f9eb(0x33b)](_0xebaa02))for(const _0xf659ba of _0x1d2e86){this[_0x38f9eb(0x3c3)]([_0xf659ba],_0xebaa02,_0x5d899d,_0x12afeb,_0xf4a67c),_0x12afeb+=_0x1f009a;}else this[_0x38f9eb(0x3c3)](_0x1d2e86,_0xebaa02,_0x5d899d,_0x12afeb,_0xf4a67c);},Spriteset_Base[_0x195c22(0x4ec)][_0x195c22(0x3c3)]=function(_0x50eba0,_0x558d7c,_0x55a79b,_0x281a23,_0x1aa45f){const _0x17770f=_0x195c22,_0x3fdceb=this[_0x17770f(0x205)](_0x558d7c),_0x4b1852=new(_0x3fdceb?Sprite_AnimationMV:Sprite_Animation)(),_0x4bec3b=this[_0x17770f(0x34a)](_0x50eba0);this[_0x17770f(0x5ba)](_0x50eba0[0x0])&&(_0x55a79b=!_0x55a79b),_0x4b1852[_0x17770f(0x591)]=_0x50eba0,_0x4b1852['setup'](_0x4bec3b,_0x558d7c,_0x55a79b,_0x281a23),_0x4b1852[_0x17770f(0x6a5)](_0x1aa45f),this['_effectsContainer'][_0x17770f(0x3ae)](_0x4b1852),this[_0x17770f(0x2e0)][_0x17770f(0x1fd)](_0x4b1852);},Spriteset_Base[_0x195c22(0x4ec)][_0x195c22(0x160)]=function(_0x588f41){const _0x22a178=_0x195c22;this['_fauxAnimationSprites'][_0x22a178(0x1a5)](_0x588f41),this[_0x22a178(0x367)][_0x22a178(0x6ca)](_0x588f41);for(const _0x388b5b of _0x588f41[_0x22a178(0x591)]){_0x388b5b[_0x22a178(0x1e1)]&&_0x388b5b[_0x22a178(0x1e1)]();}_0x588f41[_0x22a178(0x502)]();},Spriteset_Base[_0x195c22(0x4ec)][_0x195c22(0x332)]=function(){const _0x2056df=_0x195c22;for(const _0x22490a of this[_0x2056df(0x2e0)]){this[_0x2056df(0x160)](_0x22490a);}},Spriteset_Base['prototype']['isFauxAnimationPlaying']=function(){const _0x5502f2=_0x195c22;return this[_0x5502f2(0x2e0)][_0x5502f2(0x397)]>0x0;},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x1bb)]=Spriteset_Base[_0x195c22(0x4ec)]['updatePosition'],Spriteset_Base[_0x195c22(0x4ec)]['updatePosition']=function(){const _0x4b7f8e=_0x195c22;VisuMZ[_0x4b7f8e(0x6b0)][_0x4b7f8e(0x1bb)][_0x4b7f8e(0x48a)](this),this[_0x4b7f8e(0x566)]();},Spriteset_Base[_0x195c22(0x4ec)][_0x195c22(0x566)]=function(){const _0x15dd31=_0x195c22;if(!$gameScreen)return;if($gameScreen[_0x15dd31(0x529)]<=0x0)return;this['x']-=Math[_0x15dd31(0x643)]($gameScreen[_0x15dd31(0x3cf)]());const _0x2b44fc=$gameScreen['getCoreEngineScreenShakeStyle']();switch($gameScreen['getCoreEngineScreenShakeStyle']()){case _0x15dd31(0x5c0):this['updatePositionCoreEngineShakeOriginal']();break;case'horizontal':this[_0x15dd31(0x57b)]();break;case _0x15dd31(0x14f):this[_0x15dd31(0x599)]();break;default:this['updatePositionCoreEngineShakeRand']();break;}},Spriteset_Base[_0x195c22(0x4ec)][_0x195c22(0x2fe)]=function(){const _0x475203=_0x195c22,_0x3a079a=VisuMZ[_0x475203(0x6b0)]['Settings']['ScreenShake'];if(_0x3a079a&&_0x3a079a[_0x475203(0x446)])return _0x3a079a['originalJS'][_0x475203(0x48a)](this);this['x']+=Math['round']($gameScreen[_0x475203(0x3cf)]());},Spriteset_Base[_0x195c22(0x4ec)][_0x195c22(0x37e)]=function(){const _0x4f8018=_0x195c22,_0x2539d6=VisuMZ[_0x4f8018(0x6b0)][_0x4f8018(0x3e5)][_0x4f8018(0x274)];if(_0x2539d6&&_0x2539d6['randomJS'])return _0x2539d6['randomJS'][_0x4f8018(0x48a)](this);const _0x48924b=$gameScreen[_0x4f8018(0x5bc)]*0.75,_0x5bad7b=$gameScreen[_0x4f8018(0x2cf)]*0.6,_0x28c5e4=$gameScreen[_0x4f8018(0x529)];this['x']+=Math[_0x4f8018(0x643)](Math[_0x4f8018(0x365)](_0x48924b)-Math['randomInt'](_0x5bad7b))*(Math[_0x4f8018(0x29d)](_0x28c5e4,0x1e)*0.5),this['y']+=Math[_0x4f8018(0x643)](Math[_0x4f8018(0x365)](_0x48924b)-Math[_0x4f8018(0x365)](_0x5bad7b))*(Math[_0x4f8018(0x29d)](_0x28c5e4,0x1e)*0.5);},Spriteset_Base[_0x195c22(0x4ec)][_0x195c22(0x57b)]=function(){const _0x33bef5=_0x195c22,_0x1e9fa1=VisuMZ[_0x33bef5(0x6b0)]['Settings'][_0x33bef5(0x274)];if(_0x1e9fa1&&_0x1e9fa1[_0x33bef5(0x62d)])return _0x1e9fa1[_0x33bef5(0x62d)][_0x33bef5(0x48a)](this);const _0x53ebf3=$gameScreen['_shakePower']*0.75,_0x5c37fa=$gameScreen['_shakeSpeed']*0.6,_0x4d2789=$gameScreen[_0x33bef5(0x529)];this['x']+=Math[_0x33bef5(0x643)](Math['randomInt'](_0x53ebf3)-Math[_0x33bef5(0x365)](_0x5c37fa))*(Math[_0x33bef5(0x29d)](_0x4d2789,0x1e)*0.5);},Spriteset_Base[_0x195c22(0x4ec)]['updatePositionCoreEngineShakeVert']=function(){const _0x2f2a13=_0x195c22,_0x3ac00e=VisuMZ['CoreEngine'][_0x2f2a13(0x3e5)][_0x2f2a13(0x274)];if(_0x3ac00e&&_0x3ac00e['vertJS'])return _0x3ac00e[_0x2f2a13(0x213)][_0x2f2a13(0x48a)](this);const _0x233097=$gameScreen[_0x2f2a13(0x5bc)]*0.75,_0x255f29=$gameScreen[_0x2f2a13(0x2cf)]*0.6,_0x15794b=$gameScreen['_shakeDuration'];this['y']+=Math['round'](Math[_0x2f2a13(0x365)](_0x233097)-Math[_0x2f2a13(0x365)](_0x255f29))*(Math[_0x2f2a13(0x29d)](_0x15794b,0x1e)*0.5);},Spriteset_Battle['prototype'][_0x195c22(0x568)]=function(){const _0x1b7a3e=_0x195c22;this[_0x1b7a3e(0x6a6)]=new PIXI['filters'][(_0x1b7a3e(0x683))](clamp=!![]),this[_0x1b7a3e(0x57f)]=new Sprite(),this[_0x1b7a3e(0x57f)][_0x1b7a3e(0x209)]=SceneManager['backgroundBitmap'](),this['_backgroundSprite'][_0x1b7a3e(0x5e8)]=[this['_backgroundFilter']],this['_baseSprite'][_0x1b7a3e(0x3ae)](this['_backgroundSprite']);},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x4eb)]=Spriteset_Battle['prototype']['createEnemies'],Spriteset_Battle[_0x195c22(0x4ec)][_0x195c22(0x2cb)]=function(){const _0x1a1912=_0x195c22;VisuMZ[_0x1a1912(0x6b0)][_0x1a1912(0x3e5)]['UI'][_0x1a1912(0x416)]&&this[_0x1a1912(0x403)](),VisuMZ['CoreEngine'][_0x1a1912(0x4eb)][_0x1a1912(0x48a)](this);},Spriteset_Battle[_0x195c22(0x4ec)][_0x195c22(0x403)]=function(){const _0x3976a7=_0x195c22;for(member of $gameTroop[_0x3976a7(0x699)]()){member[_0x3976a7(0x20f)]();}},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x152)]=Window_Base[_0x195c22(0x4ec)][_0x195c22(0x4ff)],Window_Base[_0x195c22(0x4ec)][_0x195c22(0x4ff)]=function(_0x1188e8){const _0x143c31=_0x195c22;_0x1188e8['x']=Math[_0x143c31(0x643)](_0x1188e8['x']),_0x1188e8['y']=Math['round'](_0x1188e8['y']),_0x1188e8[_0x143c31(0x686)]=Math['round'](_0x1188e8[_0x143c31(0x686)]),_0x1188e8[_0x143c31(0x466)]=Math[_0x143c31(0x643)](_0x1188e8[_0x143c31(0x466)]),this[_0x143c31(0x1ec)](),VisuMZ['CoreEngine']['Window_Base_initialize'][_0x143c31(0x48a)](this,_0x1188e8),this[_0x143c31(0x284)]();},Window_Base[_0x195c22(0x4ec)][_0x195c22(0x1ec)]=function(){const _0x146fcb=_0x195c22;this['_digitGrouping']=VisuMZ[_0x146fcb(0x6b0)][_0x146fcb(0x3e5)][_0x146fcb(0x66d)][_0x146fcb(0x2f0)],this['_digitGroupingEx']=VisuMZ[_0x146fcb(0x6b0)]['Settings'][_0x146fcb(0x66d)][_0x146fcb(0x595)];},Window_Base[_0x195c22(0x4ec)]['lineHeight']=function(){const _0x144ffd=_0x195c22;return VisuMZ[_0x144ffd(0x6b0)][_0x144ffd(0x3e5)][_0x144ffd(0x37d)][_0x144ffd(0x20b)];},Window_Base[_0x195c22(0x4ec)][_0x195c22(0x267)]=function(){const _0x157017=_0x195c22;return VisuMZ[_0x157017(0x6b0)]['Settings'][_0x157017(0x37d)][_0x157017(0x63d)];},Window_Base[_0x195c22(0x4ec)][_0x195c22(0x63b)]=function(){const _0x158ee8=_0x195c22;this[_0x158ee8(0x6b6)]=VisuMZ['CoreEngine'][_0x158ee8(0x3e5)][_0x158ee8(0x37d)][_0x158ee8(0x625)];},Window_Base[_0x195c22(0x4ec)][_0x195c22(0x48b)]=function(){const _0x483d9e=_0x195c22;return VisuMZ[_0x483d9e(0x6b0)]['Settings'][_0x483d9e(0x37d)][_0x483d9e(0x52a)];},Window_Base['prototype'][_0x195c22(0x4a7)]=function(){const _0x3d2004=_0x195c22;return VisuMZ[_0x3d2004(0x6b0)]['Settings']['Window']['OpenSpeed'];},VisuMZ['CoreEngine'][_0x195c22(0x604)]=Window_Base[_0x195c22(0x4ec)][_0x195c22(0x684)],Window_Base['prototype'][_0x195c22(0x684)]=function(){const _0x5a595d=_0x195c22;VisuMZ[_0x5a595d(0x6b0)][_0x5a595d(0x604)][_0x5a595d(0x48a)](this),this['updateCoreEasing']();},Window_Base[_0x195c22(0x4ec)][_0x195c22(0x706)]=function(){const _0x551fc3=_0x195c22;this[_0x551fc3(0x45c)]&&(this['openness']+=this['openingSpeed'](),this[_0x551fc3(0x277)]()&&(this[_0x551fc3(0x45c)]=![]));},Window_Base[_0x195c22(0x4ec)][_0x195c22(0x6c9)]=function(){const _0x3a34e9=_0x195c22;this['_closing']&&(this[_0x3a34e9(0x431)]-=this['openingSpeed'](),this['isClosed']()&&(this['_closing']=![]));},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x2ed)]=Window_Base[_0x195c22(0x4ec)][_0x195c22(0x4f9)],Window_Base['prototype'][_0x195c22(0x4f9)]=function(_0x27666e,_0x5080b1,_0x382418,_0x274066,_0x27d944){const _0x4847b0=_0x195c22;if(this[_0x4847b0(0x304)]())_0x27666e=VisuMZ['GroupDigits'](_0x27666e);VisuMZ[_0x4847b0(0x6b0)]['Window_Base_drawText'][_0x4847b0(0x48a)](this,_0x27666e,_0x5080b1,_0x382418,_0x274066,_0x27d944);},Window_Base[_0x195c22(0x4ec)][_0x195c22(0x304)]=function(){const _0x4f9fcb=_0x195c22;return this[_0x4f9fcb(0x38b)];},VisuMZ[_0x195c22(0x6b0)]['Window_Base_createTextState']=Window_Base[_0x195c22(0x4ec)][_0x195c22(0x656)],Window_Base[_0x195c22(0x4ec)]['createTextState']=function(_0x4036fd,_0x5a42da,_0x1b8bdd,_0x30e837){const _0x22a676=_0x195c22;var _0x5528c6=VisuMZ[_0x22a676(0x6b0)][_0x22a676(0x40f)][_0x22a676(0x48a)](this,_0x4036fd,_0x5a42da,_0x1b8bdd,_0x30e837);if(this[_0x22a676(0x298)]())_0x5528c6[_0x22a676(0x212)]=VisuMZ[_0x22a676(0x4f1)](_0x5528c6[_0x22a676(0x212)]);return _0x5528c6;},Window_Base[_0x195c22(0x4ec)][_0x195c22(0x298)]=function(){const _0x5983f3=_0x195c22;return this[_0x5983f3(0x2b4)];},Window_Base[_0x195c22(0x4ec)][_0x195c22(0x363)]=function(_0xdda1e7){const _0x4f0ece=_0x195c22;this[_0x4f0ece(0x38b)]=_0xdda1e7;},Window_Base[_0x195c22(0x4ec)][_0x195c22(0x42a)]=function(_0x1cf868){const _0x4222af=_0x195c22;this[_0x4222af(0x2b4)]=_0x1cf868;},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x20a)]=Window_Base[_0x195c22(0x4ec)][_0x195c22(0x664)],Window_Base[_0x195c22(0x4ec)][_0x195c22(0x664)]=function(_0x4c2406,_0xc5eb17,_0x1fff6b){const _0x427227=_0x195c22;_0xc5eb17=Math['round'](_0xc5eb17),_0x1fff6b=Math[_0x427227(0x643)](_0x1fff6b),VisuMZ[_0x427227(0x6b0)][_0x427227(0x20a)]['call'](this,_0x4c2406,_0xc5eb17,_0x1fff6b);},VisuMZ[_0x195c22(0x6b0)]['Window_Base_drawFace']=Window_Base[_0x195c22(0x4ec)]['drawFace'],Window_Base[_0x195c22(0x4ec)][_0x195c22(0x39a)]=function(_0x3d957c,_0x123b43,_0x39a557,_0x1c27f5,_0x449a04,_0x1f9941){const _0x3fb79f=_0x195c22;_0x449a04=_0x449a04||ImageManager[_0x3fb79f(0x62c)],_0x1f9941=_0x1f9941||ImageManager['faceHeight'],_0x39a557=Math['round'](_0x39a557),_0x1c27f5=Math['round'](_0x1c27f5),_0x449a04=Math[_0x3fb79f(0x643)](_0x449a04),_0x1f9941=Math[_0x3fb79f(0x643)](_0x1f9941),VisuMZ[_0x3fb79f(0x6b0)]['Window_Base_drawFace'][_0x3fb79f(0x48a)](this,_0x3d957c,_0x123b43,_0x39a557,_0x1c27f5,_0x449a04,_0x1f9941);},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x512)]=Window_Base[_0x195c22(0x4ec)][_0x195c22(0x1fe)],Window_Base['prototype']['drawCharacter']=function(_0xe6ec77,_0x84475,_0x27b3ae,_0x46c012){const _0x5c9ad7=_0x195c22;_0x27b3ae=Math[_0x5c9ad7(0x643)](_0x27b3ae),_0x46c012=Math[_0x5c9ad7(0x643)](_0x46c012),VisuMZ[_0x5c9ad7(0x6b0)][_0x5c9ad7(0x512)][_0x5c9ad7(0x48a)](this,_0xe6ec77,_0x84475,_0x27b3ae,_0x46c012);},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x314)]=Window_Selectable[_0x195c22(0x4ec)]['itemRect'],Window_Selectable[_0x195c22(0x4ec)][_0x195c22(0x4ea)]=function(_0x1b4c00){const _0x428e5c=_0x195c22;let _0x149876=VisuMZ[_0x428e5c(0x6b0)][_0x428e5c(0x314)][_0x428e5c(0x48a)](this,_0x1b4c00);return _0x149876['x']=Math[_0x428e5c(0x643)](_0x149876['x']),_0x149876['y']=Math[_0x428e5c(0x643)](_0x149876['y']),_0x149876['width']=Math[_0x428e5c(0x643)](_0x149876['width']),_0x149876[_0x428e5c(0x466)]=Math[_0x428e5c(0x643)](_0x149876['height']),_0x149876;},VisuMZ[_0x195c22(0x6b0)]['Window_StatusBase_drawActorSimpleStatus']=Window_StatusBase['prototype'][_0x195c22(0x1b3)],Window_StatusBase['prototype'][_0x195c22(0x1b3)]=function(_0x18ec2c,_0x222b88,_0x40ef7a){const _0x1ad74d=_0x195c22;_0x222b88=Math[_0x1ad74d(0x643)](_0x222b88),_0x40ef7a=Math['round'](_0x40ef7a),VisuMZ[_0x1ad74d(0x6b0)][_0x1ad74d(0x703)]['call'](this,_0x18ec2c,_0x222b88,_0x40ef7a);},Window_Base[_0x195c22(0x4ec)][_0x195c22(0x284)]=function(){const _0x3de03b=_0x195c22;this[_0x3de03b(0x476)]={'duration':0x0,'wholeDuration':0x0,'type':_0x3de03b(0x39c),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x3de03b(0x211)]['x'],'targetScaleY':this['scale']['y'],'targetOpacity':this[_0x3de03b(0x2c2)],'targetBackOpacity':this[_0x3de03b(0x6b6)],'targetContentsOpacity':this[_0x3de03b(0x2db)]};},Window_Base[_0x195c22(0x4ec)]['updateCoreEasing']=function(){const _0xaf883c=_0x195c22;if(!this[_0xaf883c(0x476)])return;if(this['_coreEasing'][_0xaf883c(0x630)]<=0x0)return;this['x']=this['applyCoreEasing'](this['x'],this[_0xaf883c(0x476)]['targetX']),this['y']=this[_0xaf883c(0x668)](this['y'],this['_coreEasing'][_0xaf883c(0x19a)]),this[_0xaf883c(0x211)]['x']=this[_0xaf883c(0x668)](this[_0xaf883c(0x211)]['x'],this[_0xaf883c(0x476)]['targetScaleX']),this['scale']['y']=this[_0xaf883c(0x668)](this[_0xaf883c(0x211)]['y'],this[_0xaf883c(0x476)][_0xaf883c(0x496)]),this[_0xaf883c(0x2c2)]=this['applyCoreEasing'](this[_0xaf883c(0x2c2)],this['_coreEasing'][_0xaf883c(0x2be)]),this[_0xaf883c(0x6b6)]=this['applyCoreEasing'](this[_0xaf883c(0x6b6)],this[_0xaf883c(0x476)][_0xaf883c(0x658)]),this[_0xaf883c(0x2db)]=this[_0xaf883c(0x668)](this['contentsOpacity'],this[_0xaf883c(0x476)][_0xaf883c(0x493)]),this[_0xaf883c(0x476)][_0xaf883c(0x630)]--;},Window_Base[_0x195c22(0x4ec)][_0x195c22(0x668)]=function(_0x41a2fe,_0x152990){const _0x46c576=_0x195c22;if(!this[_0x46c576(0x476)])return _0x152990;const _0x3fd295=this[_0x46c576(0x476)]['duration'],_0x2cf17d=this[_0x46c576(0x476)]['wholeDuration'],_0x38c656=this[_0x46c576(0x1f3)]((_0x2cf17d-_0x3fd295)/_0x2cf17d),_0x43c80e=this['calcCoreEasing']((_0x2cf17d-_0x3fd295+0x1)/_0x2cf17d),_0x4882e9=(_0x41a2fe-_0x152990*_0x38c656)/(0x1-_0x38c656);return _0x4882e9+(_0x152990-_0x4882e9)*_0x43c80e;},Window_Base[_0x195c22(0x4ec)][_0x195c22(0x1f3)]=function(_0x54faaf){const _0x5a506d=_0x195c22;if(!this[_0x5a506d(0x476)])return _0x54faaf;return VisuMZ[_0x5a506d(0x385)](_0x54faaf,this[_0x5a506d(0x476)][_0x5a506d(0x6ff)]||_0x5a506d(0x39c));},Window_Base['prototype']['anchorCoreEasing']=function(_0x363a83,_0x51c9d3){const _0x132f38=_0x195c22;if(!this['_coreEasing'])return;this['x']=this['_coreEasing'][_0x132f38(0x35d)],this['y']=this[_0x132f38(0x476)]['targetY'],this['scale']['x']=this[_0x132f38(0x476)][_0x132f38(0x4cf)],this[_0x132f38(0x211)]['y']=this[_0x132f38(0x476)][_0x132f38(0x496)],this[_0x132f38(0x2c2)]=this[_0x132f38(0x476)][_0x132f38(0x2be)],this[_0x132f38(0x6b6)]=this['_coreEasing'][_0x132f38(0x658)],this['contentsOpacity']=this[_0x132f38(0x476)][_0x132f38(0x493)],this[_0x132f38(0x2b0)](_0x363a83,_0x51c9d3,this['x'],this['y'],this[_0x132f38(0x211)]['x'],this[_0x132f38(0x211)]['y'],this[_0x132f38(0x2c2)],this['backOpacity'],this[_0x132f38(0x2db)]);},Window_Base[_0x195c22(0x4ec)][_0x195c22(0x2b0)]=function(_0x4ae4a2,_0x5d7847,_0x4f9680,_0x2c1f23,_0x58be18,_0x2e099f,_0x3b43e0,_0x13220d,_0x5a9003){this['_coreEasing']={'duration':_0x4ae4a2,'wholeDuration':_0x4ae4a2,'type':_0x5d7847,'targetX':_0x4f9680,'targetY':_0x2c1f23,'targetScaleX':_0x58be18,'targetScaleY':_0x2e099f,'targetOpacity':_0x3b43e0,'targetBackOpacity':_0x13220d,'targetContentsOpacity':_0x5a9003};},Window_Base['prototype'][_0x195c22(0x711)]=function(_0x35ecaf,_0x527791,_0x398f22,_0x3efb13,_0x3baaaa){const _0x39767e=_0x195c22;this[_0x39767e(0x2eb)](),this[_0x39767e(0x69d)]['fontSize']=VisuMZ[_0x39767e(0x6b0)][_0x39767e(0x3e5)]['Gold']['GoldFontSize'];const _0x3b746f=VisuMZ[_0x39767e(0x6b0)][_0x39767e(0x3e5)][_0x39767e(0x258)][_0x39767e(0x238)];if(_0x3b746f>0x0&&_0x527791===TextManager[_0x39767e(0x329)]){const _0x900297=_0x3efb13+(this[_0x39767e(0x371)]()-ImageManager[_0x39767e(0x2e8)])/0x2;this['drawIcon'](_0x3b746f,_0x398f22+(_0x3baaaa-ImageManager[_0x39767e(0x43d)]),_0x900297),_0x3baaaa-=ImageManager['iconWidth']+0x4;}else this[_0x39767e(0x5b2)](ColorManager[_0x39767e(0x3fa)]()),this[_0x39767e(0x4f9)](_0x527791,_0x398f22,_0x3efb13,_0x3baaaa,_0x39767e(0x6e4)),_0x3baaaa-=this[_0x39767e(0x641)](_0x527791)+0x6;this[_0x39767e(0x5cc)]();const _0x141816=this['textWidth'](this[_0x39767e(0x38b)]?VisuMZ['GroupDigits'](_0x35ecaf):_0x35ecaf);_0x141816>_0x3baaaa?this[_0x39767e(0x4f9)](VisuMZ['CoreEngine'][_0x39767e(0x3e5)][_0x39767e(0x258)]['GoldOverlap'],_0x398f22,_0x3efb13,_0x3baaaa,'right'):this[_0x39767e(0x4f9)](_0x35ecaf,_0x398f22,_0x3efb13,_0x3baaaa,_0x39767e(0x6e4)),this['resetFontSettings']();},Window_Base[_0x195c22(0x4ec)][_0x195c22(0x40b)]=function(_0x1cf798,_0x3dd93f,_0x351650,_0x33ff60,_0x2dd5b9){const _0x1c65ef=_0x195c22,_0x51481b=ImageManager[_0x1c65ef(0x249)](_0x1c65ef(0x377)),_0x4ba24a=ImageManager[_0x1c65ef(0x43d)],_0x4d3da7=ImageManager[_0x1c65ef(0x2e8)],_0x2e8a5f=_0x1cf798%0x10*_0x4ba24a,_0x3002ba=Math[_0x1c65ef(0x644)](_0x1cf798/0x10)*_0x4d3da7,_0x34518e=_0x33ff60,_0x583c5b=_0x33ff60;this['contents'][_0x1c65ef(0x2a6)][_0x1c65ef(0x5a3)]=_0x2dd5b9,this[_0x1c65ef(0x69d)]['blt'](_0x51481b,_0x2e8a5f,_0x3002ba,_0x4ba24a,_0x4d3da7,_0x3dd93f,_0x351650,_0x34518e,_0x583c5b),this[_0x1c65ef(0x69d)][_0x1c65ef(0x2a6)]['imageSmoothingEnabled']=!![];},Window_Base[_0x195c22(0x4ec)][_0x195c22(0x261)]=function(_0xf9457a,_0x621ebf,_0x34f95b,_0x4d9bc2,_0xa218a4,_0x42ad12){const _0x2150bf=_0x195c22,_0x31516e=Math[_0x2150bf(0x644)]((_0x34f95b-0x2)*_0x4d9bc2),_0x4403a1=Sprite_Gauge[_0x2150bf(0x4ec)][_0x2150bf(0x666)]['call'](this),_0x2599e4=_0x621ebf+this[_0x2150bf(0x371)]()-_0x4403a1-0x2;this[_0x2150bf(0x69d)][_0x2150bf(0x6e1)](_0xf9457a,_0x2599e4,_0x34f95b,_0x4403a1,ColorManager['gaugeBackColor']()),this['contents'][_0x2150bf(0x374)](_0xf9457a+0x1,_0x2599e4+0x1,_0x31516e,_0x4403a1-0x2,_0xa218a4,_0x42ad12);},Window_Selectable['prototype']['cursorDown']=function(_0x136c17){const _0x2fc3cf=_0x195c22;let _0x40a805=this['index']();const _0x26ba01=this['maxItems'](),_0xff25a7=this[_0x2fc3cf(0x355)]();if(this['isUseModernControls']()&&(_0x40a805<_0x26ba01||_0x136c17&&_0xff25a7===0x1)){_0x40a805+=_0xff25a7;if(_0x40a805>=_0x26ba01)_0x40a805=_0x26ba01-0x1;this[_0x2fc3cf(0x533)](_0x40a805);}else!this[_0x2fc3cf(0x4bd)]()&&((_0x40a805<_0x26ba01-_0xff25a7||_0x136c17&&_0xff25a7===0x1)&&this[_0x2fc3cf(0x533)]((_0x40a805+_0xff25a7)%_0x26ba01));},VisuMZ[_0x195c22(0x6b0)]['Window_Selectable_cursorDown']=Window_Selectable['prototype'][_0x195c22(0x5a6)],Window_Selectable[_0x195c22(0x4ec)][_0x195c22(0x5a6)]=function(_0x57b01c){const _0x3db8be=_0x195c22;this[_0x3db8be(0x4bd)]()&&_0x57b01c&&this[_0x3db8be(0x355)]()===0x1&&this[_0x3db8be(0x578)]()===this[_0x3db8be(0x2ea)]()-0x1?this[_0x3db8be(0x533)](0x0):VisuMZ[_0x3db8be(0x6b0)]['Window_Selectable_cursorDown'][_0x3db8be(0x48a)](this,_0x57b01c);},Window_Selectable[_0x195c22(0x4ec)][_0x195c22(0x45e)]=function(_0x44496e){const _0x368f8e=_0x195c22;let _0xb3140=Math[_0x368f8e(0x20e)](0x0,this['index']());const _0x1440a8=this[_0x368f8e(0x2ea)](),_0x7ab6bd=this['maxCols']();if(this[_0x368f8e(0x4bd)]()&&_0xb3140>0x0||_0x44496e&&_0x7ab6bd===0x1){_0xb3140-=_0x7ab6bd;if(_0xb3140<=0x0)_0xb3140=0x0;this[_0x368f8e(0x533)](_0xb3140);}else!this[_0x368f8e(0x4bd)]()&&((_0xb3140>=_0x7ab6bd||_0x44496e&&_0x7ab6bd===0x1)&&this[_0x368f8e(0x533)]((_0xb3140-_0x7ab6bd+_0x1440a8)%_0x1440a8));},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x341)]=Window_Selectable['prototype']['cursorUp'],Window_Selectable[_0x195c22(0x4ec)][_0x195c22(0x45e)]=function(_0x35b5ca){const _0x577006=_0x195c22;this[_0x577006(0x4bd)]()&&_0x35b5ca&&this[_0x577006(0x355)]()===0x1&&this['index']()===0x0?this[_0x577006(0x533)](this[_0x577006(0x2ea)]()-0x1):VisuMZ[_0x577006(0x6b0)]['Window_Selectable_cursorUp'][_0x577006(0x48a)](this,_0x35b5ca);},Window_Selectable[_0x195c22(0x4ec)]['isUseModernControls']=function(){const _0x4278ff=_0x195c22;return VisuMZ[_0x4278ff(0x6b0)]['Settings'][_0x4278ff(0x66d)]['ModernControls'];},VisuMZ['CoreEngine']['Window_Selectable_processCursorMove']=Window_Selectable[_0x195c22(0x4ec)][_0x195c22(0x18d)],Window_Selectable[_0x195c22(0x4ec)]['processCursorMove']=function(){const _0x3cced0=_0x195c22;this[_0x3cced0(0x4bd)]()?(this[_0x3cced0(0x526)](),this[_0x3cced0(0x297)]()):VisuMZ[_0x3cced0(0x6b0)][_0x3cced0(0x477)]['call'](this);},Window_Selectable['prototype'][_0x195c22(0x1d3)]=function(){return!![];},Window_Selectable[_0x195c22(0x4ec)][_0x195c22(0x526)]=function(){const _0x36706c=_0x195c22;if(this[_0x36706c(0x16b)]()){const _0x361e2c=this[_0x36706c(0x578)]();Input[_0x36706c(0x6e9)](_0x36706c(0x215))&&(Input[_0x36706c(0x4c3)]('shift')&&this[_0x36706c(0x1d3)]()?this[_0x36706c(0x395)]():this[_0x36706c(0x5a6)](Input['isTriggered'](_0x36706c(0x215)))),Input[_0x36706c(0x6e9)]('up')&&(Input['isPressed'](_0x36706c(0x6d2))&&this[_0x36706c(0x1d3)]()?this[_0x36706c(0x4d9)]():this[_0x36706c(0x45e)](Input[_0x36706c(0x569)]('up'))),Input['isRepeated']('right')&&this[_0x36706c(0x174)](Input['isTriggered'](_0x36706c(0x6e4))),Input['isRepeated'](_0x36706c(0x4d3))&&this[_0x36706c(0x3c0)](Input[_0x36706c(0x569)](_0x36706c(0x4d3))),!this[_0x36706c(0x716)]('pagedown')&&Input['isRepeated'](_0x36706c(0x156))&&this[_0x36706c(0x395)](),!this[_0x36706c(0x716)]('pageup')&&Input['isRepeated']('pageup')&&this['cursorPageup'](),this[_0x36706c(0x578)]()!==_0x361e2c&&this[_0x36706c(0x1e6)]();}},Window_Selectable[_0x195c22(0x4ec)][_0x195c22(0x297)]=function(){const _0x1f8479=_0x195c22;if(this['isCursorMovable']()){const _0x19585=this[_0x1f8479(0x578)]();Input['isTriggered'](_0x1f8479(0x5be))&&this[_0x1f8479(0x533)](Math[_0x1f8479(0x29d)](this[_0x1f8479(0x578)](),0x0)),Input[_0x1f8479(0x569)](_0x1f8479(0x6e6))&&this[_0x1f8479(0x533)](Math[_0x1f8479(0x20e)](this[_0x1f8479(0x578)](),this['maxItems']()-0x1)),this[_0x1f8479(0x578)]()!==_0x19585&&this[_0x1f8479(0x1e6)]();}},VisuMZ['CoreEngine'][_0x195c22(0x266)]=Window_Selectable[_0x195c22(0x4ec)][_0x195c22(0x59a)],Window_Selectable[_0x195c22(0x4ec)]['processTouch']=function(){const _0x53d816=_0x195c22;this[_0x53d816(0x4bd)]()?this[_0x53d816(0x675)]():VisuMZ['CoreEngine'][_0x53d816(0x266)][_0x53d816(0x48a)](this);},Window_Selectable[_0x195c22(0x4ec)][_0x195c22(0x675)]=function(){const _0x375eea=_0x195c22;VisuMZ[_0x375eea(0x6b0)][_0x375eea(0x266)][_0x375eea(0x48a)](this);},Window_Selectable[_0x195c22(0x4ec)][_0x195c22(0x1cb)]=function(){const _0x3f8399=_0x195c22;return VisuMZ[_0x3f8399(0x6b0)][_0x3f8399(0x3e5)][_0x3f8399(0x37d)][_0x3f8399(0x418)];},Window_Selectable['prototype'][_0x195c22(0x2d4)]=function(){const _0x411b51=_0x195c22;return VisuMZ[_0x411b51(0x6b0)][_0x411b51(0x3e5)][_0x411b51(0x37d)][_0x411b51(0x2c8)];},Window_Selectable[_0x195c22(0x4ec)][_0x195c22(0x1c9)]=function(){const _0x46242b=_0x195c22;return Window_Scrollable[_0x46242b(0x4ec)][_0x46242b(0x1c9)]['call'](this)+VisuMZ[_0x46242b(0x6b0)]['Settings'][_0x46242b(0x37d)][_0x46242b(0x697)];;},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x4af)]=Window_Selectable[_0x195c22(0x4ec)][_0x195c22(0x312)],Window_Selectable[_0x195c22(0x4ec)]['drawBackgroundRect']=function(_0x184773){const _0x1f0387=_0x195c22,_0x2043f6=VisuMZ[_0x1f0387(0x6b0)]['Settings'][_0x1f0387(0x37d)];if(_0x2043f6[_0x1f0387(0x631)]===![])return;_0x2043f6[_0x1f0387(0x36a)]?_0x2043f6['DrawItemBackgroundJS'][_0x1f0387(0x48a)](this,_0x184773):VisuMZ['CoreEngine'][_0x1f0387(0x4af)]['call'](this,_0x184773);},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x66c)]=Window_Gold[_0x195c22(0x4ec)][_0x195c22(0x52c)],Window_Gold[_0x195c22(0x4ec)][_0x195c22(0x52c)]=function(){const _0x26376d=_0x195c22;this[_0x26376d(0x522)]()?this[_0x26376d(0x317)]():VisuMZ[_0x26376d(0x6b0)]['Window_Gold_refresh'][_0x26376d(0x48a)](this);},Window_Gold[_0x195c22(0x4ec)][_0x195c22(0x522)]=function(){const _0x4d611e=_0x195c22;if(TextManager[_0x4d611e(0x329)]!==this[_0x4d611e(0x329)]())return![];return VisuMZ['CoreEngine'][_0x4d611e(0x3e5)][_0x4d611e(0x258)][_0x4d611e(0x44e)];},Window_Gold[_0x195c22(0x4ec)][_0x195c22(0x317)]=function(){const _0x755e3=_0x195c22;this[_0x755e3(0x2eb)](),this[_0x755e3(0x69d)][_0x755e3(0x29a)](),this['contents']['fontSize']=VisuMZ[_0x755e3(0x6b0)][_0x755e3(0x3e5)][_0x755e3(0x258)][_0x755e3(0x3fd)];const _0x12a9f9=VisuMZ[_0x755e3(0x6b0)][_0x755e3(0x3e5)]['Gold'][_0x755e3(0x238)],_0x54c23b=this[_0x755e3(0x602)](0x0);if(_0x12a9f9>0x0){const _0x5dd403=_0x54c23b['y']+(this['lineHeight']()-ImageManager[_0x755e3(0x2e8)])/0x2;this[_0x755e3(0x664)](_0x12a9f9,_0x54c23b['x'],_0x5dd403);const _0x592cdd=ImageManager[_0x755e3(0x43d)]+0x4;_0x54c23b['x']+=_0x592cdd,_0x54c23b[_0x755e3(0x686)]-=_0x592cdd;}this['changeTextColor'](ColorManager[_0x755e3(0x3fa)]()),this['drawText'](this[_0x755e3(0x329)](),_0x54c23b['x'],_0x54c23b['y'],_0x54c23b['width'],_0x755e3(0x4d3));const _0x2dab93=this[_0x755e3(0x641)](this['currencyUnit']())+0x6;;_0x54c23b['x']+=_0x2dab93,_0x54c23b[_0x755e3(0x686)]-=_0x2dab93,this[_0x755e3(0x5cc)]();const _0x55cb26=this[_0x755e3(0x581)](),_0x551b13=this[_0x755e3(0x641)](this['_digitGrouping']?VisuMZ[_0x755e3(0x4f1)](this[_0x755e3(0x581)]()):this[_0x755e3(0x581)]());_0x551b13>_0x54c23b['width']?this['drawText'](VisuMZ[_0x755e3(0x6b0)][_0x755e3(0x3e5)][_0x755e3(0x258)][_0x755e3(0x532)],_0x54c23b['x'],_0x54c23b['y'],_0x54c23b[_0x755e3(0x686)],_0x755e3(0x6e4)):this[_0x755e3(0x4f9)](this[_0x755e3(0x581)](),_0x54c23b['x'],_0x54c23b['y'],_0x54c23b[_0x755e3(0x686)],_0x755e3(0x6e4)),this[_0x755e3(0x2eb)]();},Window_StatusBase[_0x195c22(0x4ec)]['drawParamText']=function(_0x290b62,_0x4b693a,_0x55e0d2,_0x17e582,_0x5d64a0){const _0xaf2643=_0x195c22;_0x17e582=String(_0x17e582||'')[_0xaf2643(0x336)]();if(VisuMZ['CoreEngine']['Settings'][_0xaf2643(0x244)][_0xaf2643(0x252)]){const _0x128f57=VisuMZ[_0xaf2643(0x657)](_0x17e582);_0x5d64a0?(this[_0xaf2643(0x40b)](_0x128f57,_0x290b62,_0x4b693a,this['gaugeLineHeight']()),_0x55e0d2-=this['gaugeLineHeight']()+0x2,_0x290b62+=this[_0xaf2643(0x48e)]()+0x2):(this[_0xaf2643(0x664)](_0x128f57,_0x290b62+0x2,_0x4b693a+0x2),_0x55e0d2-=ImageManager['iconWidth']+0x4,_0x290b62+=ImageManager[_0xaf2643(0x43d)]+0x4);}const _0xe70df3=TextManager['param'](_0x17e582);this[_0xaf2643(0x2eb)](),this[_0xaf2643(0x5b2)](ColorManager[_0xaf2643(0x3fa)]()),_0x5d64a0?(this[_0xaf2643(0x69d)][_0xaf2643(0x6d7)]=this['smallParamFontSize'](),this[_0xaf2643(0x69d)]['drawText'](_0xe70df3,_0x290b62,_0x4b693a,_0x55e0d2,this[_0xaf2643(0x48e)](),_0xaf2643(0x4d3))):this[_0xaf2643(0x4f9)](_0xe70df3,_0x290b62,_0x4b693a,_0x55e0d2),this[_0xaf2643(0x2eb)]();},Window_StatusBase[_0x195c22(0x4ec)]['smallParamFontSize']=function(){const _0x376857=_0x195c22;return $gameSystem[_0x376857(0x5fd)]()-0x8;},Window_StatusBase[_0x195c22(0x4ec)][_0x195c22(0x54d)]=function(_0x2b5487,_0x583d34,_0x3a2341,_0x2a90ae){const _0x862d9c=_0x195c22;_0x2a90ae=_0x2a90ae||0xa8,this['resetTextColor']();if(VisuMZ[_0x862d9c(0x6b0)][_0x862d9c(0x3e5)]['UI'][_0x862d9c(0x2e6)])this[_0x862d9c(0x70d)](_0x2b5487[_0x862d9c(0x1e7)]()[_0x862d9c(0x220)],_0x583d34,_0x3a2341,_0x2a90ae);else{const _0xfb225e=_0x2b5487[_0x862d9c(0x1e7)]()[_0x862d9c(0x220)][_0x862d9c(0x196)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0xfb225e,_0x583d34,_0x3a2341,_0x2a90ae);}},Window_StatusBase[_0x195c22(0x4ec)][_0x195c22(0x478)]=function(_0xdcaa32,_0x4c87a0,_0x5585a3,_0x1ceb7d){const _0x5b2606=_0x195c22;_0x1ceb7d=_0x1ceb7d||0x10e,this[_0x5b2606(0x5cc)]();if(VisuMZ[_0x5b2606(0x6b0)][_0x5b2606(0x3e5)]['UI'][_0x5b2606(0x1a6)])this['drawTextEx'](_0xdcaa32[_0x5b2606(0x573)](),_0x4c87a0,_0x5585a3,_0x1ceb7d);else{const _0x3c20ea=_0xdcaa32[_0x5b2606(0x573)]()['replace'](/\\I\[(\d+)\]/gi,'');this[_0x5b2606(0x4f9)](_0xdcaa32[_0x5b2606(0x573)](),_0x4c87a0,_0x5585a3,_0x1ceb7d);}},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x6ea)]=Window_StatusBase[_0x195c22(0x4ec)][_0x195c22(0x409)],Window_StatusBase['prototype'][_0x195c22(0x409)]=function(_0x440df9,_0x2729d2,_0x5ce362){const _0x48be50=_0x195c22;if(this[_0x48be50(0x58d)]())this['drawActorExpGauge'](_0x440df9,_0x2729d2,_0x5ce362);VisuMZ[_0x48be50(0x6b0)]['Window_StatusBase_drawActorLevel'][_0x48be50(0x48a)](this,_0x440df9,_0x2729d2,_0x5ce362);},Window_StatusBase[_0x195c22(0x4ec)][_0x195c22(0x58d)]=function(){const _0x3f1db9=_0x195c22;return VisuMZ[_0x3f1db9(0x6b0)][_0x3f1db9(0x3e5)]['UI']['LvExpGauge'];},Window_StatusBase[_0x195c22(0x4ec)][_0x195c22(0x370)]=function(_0x20b73d,_0x27055b,_0x54ff5b){const _0x5965d5=_0x195c22;if(!_0x20b73d)return;if(!_0x20b73d[_0x5965d5(0x65c)]())return;const _0x4126a5=0x80,_0x391bca=_0x20b73d[_0x5965d5(0x4e0)]();let _0x289d67=ColorManager['expGaugeColor1'](),_0x45512f=ColorManager['expGaugeColor2']();_0x391bca>=0x1&&(_0x289d67=ColorManager[_0x5965d5(0x290)](),_0x45512f=ColorManager[_0x5965d5(0x618)]()),this[_0x5965d5(0x261)](_0x27055b,_0x54ff5b,_0x4126a5,_0x391bca,_0x289d67,_0x45512f);},Window_EquipStatus[_0x195c22(0x4ec)][_0x195c22(0x2e5)]=function(){const _0x3a623d=_0x195c22;let _0x241030=0x0;for(const _0x3b7ac8 of VisuMZ[_0x3a623d(0x6b0)][_0x3a623d(0x3e5)]['Param'][_0x3a623d(0x16c)]){const _0x31b5bb=this[_0x3a623d(0x267)](),_0x1ed474=this[_0x3a623d(0x440)](_0x241030);this[_0x3a623d(0x6d4)](_0x31b5bb,_0x1ed474,_0x3b7ac8),_0x241030++;}},Window_EquipStatus[_0x195c22(0x4ec)]['drawParamName']=function(_0x47065e,_0x37b3da,_0x5a3a24){const _0x613ab9=_0x195c22,_0x4f4325=this['paramX']()-this[_0x613ab9(0x267)]()*0x2;this['drawParamText'](_0x47065e,_0x37b3da,_0x4f4325,_0x5a3a24,![]);},Window_EquipStatus['prototype']['drawCurrentParam']=function(_0x542a50,_0x3c589c,_0x403b71){const _0x292c97=_0x195c22,_0x5a060d=this[_0x292c97(0x30a)]();this[_0x292c97(0x5cc)](),this[_0x292c97(0x4f9)](this[_0x292c97(0x1de)]['paramValueByName'](_0x403b71,!![]),_0x542a50,_0x3c589c,_0x5a060d,_0x292c97(0x6e4));},Window_EquipStatus[_0x195c22(0x4ec)][_0x195c22(0x62e)]=function(_0x15fba9,_0x32e8b2){const _0x28fadd=_0x195c22,_0x85eaf2=this['rightArrowWidth']();this[_0x28fadd(0x5b2)](ColorManager[_0x28fadd(0x3fa)]());const _0x18dd49=VisuMZ[_0x28fadd(0x6b0)][_0x28fadd(0x3e5)]['UI'][_0x28fadd(0x396)];this[_0x28fadd(0x4f9)](_0x18dd49,_0x15fba9,_0x32e8b2,_0x85eaf2,_0x28fadd(0x23f));},Window_EquipStatus[_0x195c22(0x4ec)][_0x195c22(0x5e2)]=function(_0x7a22ae,_0x2231f6,_0x13dae6){const _0x5ddba5=_0x195c22,_0x4f3e5c=this[_0x5ddba5(0x30a)](),_0x2ec477=this[_0x5ddba5(0x247)][_0x5ddba5(0x6a3)](_0x13dae6),_0x1f286b=_0x2ec477-this['_actor'][_0x5ddba5(0x6a3)](_0x13dae6);this[_0x5ddba5(0x5b2)](ColorManager[_0x5ddba5(0x59d)](_0x1f286b)),this[_0x5ddba5(0x4f9)](VisuMZ[_0x5ddba5(0x42c)](_0x2ec477,0x0,_0x13dae6),_0x7a22ae,_0x2231f6,_0x4f3e5c,_0x5ddba5(0x6e4));},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x1ba)]=Window_EquipItem[_0x195c22(0x4ec)][_0x195c22(0x67f)],Window_EquipItem[_0x195c22(0x4ec)][_0x195c22(0x67f)]=function(_0x252326){const _0xf1a5e1=_0x195c22;return _0x252326&&this[_0xf1a5e1(0x1de)]?this[_0xf1a5e1(0x1de)]['canEquip'](_0x252326):VisuMZ['CoreEngine'][_0xf1a5e1(0x1ba)][_0xf1a5e1(0x48a)](this,_0x252326);},Window_StatusParams[_0x195c22(0x4ec)][_0x195c22(0x2ea)]=function(){const _0x2d2db5=_0x195c22;return VisuMZ[_0x2d2db5(0x6b0)][_0x2d2db5(0x3e5)][_0x2d2db5(0x244)][_0x2d2db5(0x16c)]['length'];},Window_StatusParams[_0x195c22(0x4ec)][_0x195c22(0x6d4)]=function(_0x1b89af){const _0x5ed126=_0x195c22,_0x56ee3e=this[_0x5ed126(0x602)](_0x1b89af),_0x3e07a5=VisuMZ[_0x5ed126(0x6b0)]['Settings'][_0x5ed126(0x244)][_0x5ed126(0x16c)][_0x1b89af],_0xdd68d9=TextManager[_0x5ed126(0x427)](_0x3e07a5),_0xdebbe6=this[_0x5ed126(0x1de)]['paramValueByName'](_0x3e07a5,!![]);this[_0x5ed126(0x5c6)](_0x56ee3e['x'],_0x56ee3e['y'],0xa0,_0x3e07a5,![]),this[_0x5ed126(0x5cc)](),this[_0x5ed126(0x4f9)](_0xdebbe6,_0x56ee3e['x']+0xa0,_0x56ee3e['y'],0x3c,_0x5ed126(0x6e4));};if(VisuMZ['CoreEngine']['Settings']['KeyboardInput'][_0x195c22(0x5cf)]){VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x3e5)][_0x195c22(0x15b)]['QwertyLayout']&&(Window_NameInput['LATIN1']=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x195c22(0x565),'OK']);;VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x5b8)]=Window_NameInput[_0x195c22(0x4ec)][_0x195c22(0x4ff)],Window_NameInput[_0x195c22(0x4ec)]['initialize']=function(_0x245258){const _0x30a6d2=_0x195c22;this['_mode']=this['defaultInputMode'](),VisuMZ[_0x30a6d2(0x6b0)][_0x30a6d2(0x5b8)][_0x30a6d2(0x48a)](this,_0x245258),this[_0x30a6d2(0x429)]==='default'?this[_0x30a6d2(0x1db)](0x0):(Input[_0x30a6d2(0x29a)](),this[_0x30a6d2(0x47d)]());},Window_NameInput[_0x195c22(0x4ec)][_0x195c22(0x2c7)]=function(){const _0x495365=_0x195c22;if(Input[_0x495365(0x1ea)]())return _0x495365(0x649);return VisuMZ['CoreEngine'][_0x495365(0x3e5)][_0x495365(0x15b)][_0x495365(0x1dc)]||_0x495365(0x2ce);},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x21c)]=Window_NameInput[_0x195c22(0x4ec)][_0x195c22(0x3b5)],Window_NameInput[_0x195c22(0x4ec)][_0x195c22(0x3b5)]=function(){const _0x426ccd=_0x195c22;if(!this['isOpen']())return;if(!this[_0x426ccd(0x289)])return;if(this[_0x426ccd(0x429)]===_0x426ccd(0x2ce)&&Input['isGamepadTriggered']())this[_0x426ccd(0x2a1)](_0x426ccd(0x649));else{if(Input[_0x426ccd(0x2fd)](_0x426ccd(0x5d6)))Input[_0x426ccd(0x29a)](),this[_0x426ccd(0x2a8)]();else{if(Input[_0x426ccd(0x569)]('tab'))Input[_0x426ccd(0x29a)](),this[_0x426ccd(0x429)]==='keyboard'?this[_0x426ccd(0x2a1)](_0x426ccd(0x649)):this['switchModes']('keyboard');else{if(this['_mode']===_0x426ccd(0x2ce))this[_0x426ccd(0x654)]();else Input[_0x426ccd(0x2fd)](_0x426ccd(0x3d6))?(Input['clear'](),this['switchModes']('keyboard')):VisuMZ[_0x426ccd(0x6b0)][_0x426ccd(0x21c)][_0x426ccd(0x48a)](this);}}}},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x6d9)]=Window_NameInput['prototype']['processTouch'],Window_NameInput['prototype'][_0x195c22(0x59a)]=function(){const _0x35b027=_0x195c22;if(!this['isOpenAndActive']())return;if(this[_0x35b027(0x429)]===_0x35b027(0x2ce)){if(TouchInput[_0x35b027(0x569)]()&&this['isTouchedInsideFrame']())this[_0x35b027(0x2a1)](_0x35b027(0x649));else TouchInput[_0x35b027(0x561)]()&&this[_0x35b027(0x2a1)](_0x35b027(0x649));}else VisuMZ[_0x35b027(0x6b0)][_0x35b027(0x6d9)][_0x35b027(0x48a)](this);},Window_NameInput[_0x195c22(0x4ec)][_0x195c22(0x654)]=function(){const _0x3c0c1d=_0x195c22;if(Input[_0x3c0c1d(0x2fd)](_0x3c0c1d(0x6b3)))Input[_0x3c0c1d(0x29a)](),this[_0x3c0c1d(0x4ef)]();else{if(Input[_0x3c0c1d(0x3ca)]!==undefined){let _0x447096=Input[_0x3c0c1d(0x3ca)],_0x17a038=_0x447096[_0x3c0c1d(0x397)];for(let _0x8713af=0x0;_0x8713af<_0x17a038;++_0x8713af){this['_editWindow']['add'](_0x447096[_0x8713af])?SoundManager['playOk']():SoundManager['playBuzzer']();}Input[_0x3c0c1d(0x29a)]();}}},Window_NameInput[_0x195c22(0x4ec)]['switchModes']=function(_0x230b94){const _0x356568=_0x195c22;let _0x112bbf=this[_0x356568(0x429)];this[_0x356568(0x429)]=_0x230b94,_0x112bbf!==this[_0x356568(0x429)]&&(this[_0x356568(0x52c)](),SoundManager[_0x356568(0x671)](),this[_0x356568(0x429)]===_0x356568(0x649)?this[_0x356568(0x1db)](0x0):this[_0x356568(0x1db)](-0x1));},VisuMZ['CoreEngine'][_0x195c22(0x64a)]=Window_NameInput[_0x195c22(0x4ec)]['cursorDown'],Window_NameInput[_0x195c22(0x4ec)][_0x195c22(0x5a6)]=function(_0x2a6be1){const _0x1247e6=_0x195c22;if(this['_mode']===_0x1247e6(0x2ce)&&!Input[_0x1247e6(0x60b)]())return;if(Input[_0x1247e6(0x448)]())return;VisuMZ[_0x1247e6(0x6b0)]['Window_NameInput_cursorDown'][_0x1247e6(0x48a)](this,_0x2a6be1),this[_0x1247e6(0x2a1)](_0x1247e6(0x649));},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x432)]=Window_NameInput[_0x195c22(0x4ec)][_0x195c22(0x45e)],Window_NameInput[_0x195c22(0x4ec)][_0x195c22(0x45e)]=function(_0x34ad0c){const _0xf8ea9f=_0x195c22;if(this['_mode']==='keyboard'&&!Input[_0xf8ea9f(0x60b)]())return;if(Input['isNumpadPressed']())return;VisuMZ['CoreEngine'][_0xf8ea9f(0x432)][_0xf8ea9f(0x48a)](this,_0x34ad0c),this[_0xf8ea9f(0x2a1)](_0xf8ea9f(0x649));},VisuMZ[_0x195c22(0x6b0)]['Window_NameInput_cursorRight']=Window_NameInput['prototype']['cursorRight'],Window_NameInput[_0x195c22(0x4ec)][_0x195c22(0x174)]=function(_0x5546f3){const _0x42dd04=_0x195c22;if(this[_0x42dd04(0x429)]===_0x42dd04(0x2ce)&&!Input[_0x42dd04(0x60b)]())return;if(Input[_0x42dd04(0x448)]())return;VisuMZ[_0x42dd04(0x6b0)][_0x42dd04(0x17d)][_0x42dd04(0x48a)](this,_0x5546f3),this[_0x42dd04(0x2a1)](_0x42dd04(0x649));},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x41f)]=Window_NameInput[_0x195c22(0x4ec)]['cursorLeft'],Window_NameInput['prototype'][_0x195c22(0x3c0)]=function(_0x2f758b){const _0x2e3504=_0x195c22;if(this[_0x2e3504(0x429)]===_0x2e3504(0x2ce)&&!Input['isArrowPressed']())return;if(Input[_0x2e3504(0x448)]())return;VisuMZ['CoreEngine'][_0x2e3504(0x41f)]['call'](this,_0x2f758b),this[_0x2e3504(0x2a1)](_0x2e3504(0x649));},VisuMZ['CoreEngine'][_0x195c22(0x518)]=Window_NameInput['prototype'][_0x195c22(0x395)],Window_NameInput[_0x195c22(0x4ec)]['cursorPagedown']=function(){const _0x4dd356=_0x195c22;if(this['_mode']===_0x4dd356(0x2ce))return;if(Input[_0x4dd356(0x448)]())return;VisuMZ[_0x4dd356(0x6b0)][_0x4dd356(0x518)][_0x4dd356(0x48a)](this),this[_0x4dd356(0x2a1)]('default');},VisuMZ['CoreEngine']['Window_NameInput_cursorPageup']=Window_NameInput['prototype'][_0x195c22(0x4d9)],Window_NameInput[_0x195c22(0x4ec)]['cursorPageup']=function(){const _0x44c705=_0x195c22;if(this[_0x44c705(0x429)]==='keyboard')return;if(Input[_0x44c705(0x448)]())return;VisuMZ[_0x44c705(0x6b0)][_0x44c705(0x538)][_0x44c705(0x48a)](this),this['switchModes'](_0x44c705(0x649));},VisuMZ['CoreEngine'][_0x195c22(0x46c)]=Window_NameInput[_0x195c22(0x4ec)][_0x195c22(0x52c)],Window_NameInput[_0x195c22(0x4ec)]['refresh']=function(){const _0x339710=_0x195c22;if(this[_0x339710(0x429)]===_0x339710(0x2ce)){this[_0x339710(0x69d)][_0x339710(0x29a)](),this['contentsBack'][_0x339710(0x29a)](),this[_0x339710(0x5cc)]();let _0x21852d=VisuMZ[_0x339710(0x6b0)][_0x339710(0x3e5)][_0x339710(0x15b)][_0x339710(0x217)][_0x339710(0x621)]('\x0a'),_0x24584c=_0x21852d[_0x339710(0x397)],_0x11a8d4=(this[_0x339710(0x38f)]-_0x24584c*this[_0x339710(0x371)]())/0x2;for(let _0x356b7e=0x0;_0x356b7e<_0x24584c;++_0x356b7e){let _0x8c924a=_0x21852d[_0x356b7e],_0xe7943f=this['textSizeEx'](_0x8c924a)[_0x339710(0x686)],_0x4b84ac=Math[_0x339710(0x644)]((this[_0x339710(0x69d)]['width']-_0xe7943f)/0x2);this[_0x339710(0x70d)](_0x8c924a,_0x4b84ac,_0x11a8d4),_0x11a8d4+=this[_0x339710(0x371)]();}}else VisuMZ['CoreEngine']['Window_NameInput_refresh'][_0x339710(0x48a)](this);};};VisuMZ[_0x195c22(0x6b0)]['Window_ShopSell_isEnabled']=Window_ShopSell[_0x195c22(0x4ec)][_0x195c22(0x67f)],Window_ShopSell['prototype'][_0x195c22(0x67f)]=function(_0x1bec95){const _0x525295=_0x195c22;return VisuMZ[_0x525295(0x6b0)][_0x525295(0x3e5)][_0x525295(0x66d)][_0x525295(0x550)]&&DataManager['isKeyItem'](_0x1bec95)?![]:VisuMZ['CoreEngine'][_0x525295(0x61d)][_0x525295(0x48a)](this,_0x1bec95);},Window_NumberInput[_0x195c22(0x4ec)]['isUseModernControls']=function(){return![];};VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x3e5)][_0x195c22(0x15b)]['EnableNumberInput']&&(VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x388)]=Window_NumberInput[_0x195c22(0x4ec)][_0x195c22(0x299)],Window_NumberInput['prototype'][_0x195c22(0x299)]=function(){const _0x3fa903=_0x195c22;VisuMZ[_0x3fa903(0x6b0)][_0x3fa903(0x388)]['call'](this),this[_0x3fa903(0x1db)](this[_0x3fa903(0x394)]-0x1);},VisuMZ[_0x195c22(0x6b0)]['Window_NumberInput_processDigitChange']=Window_NumberInput[_0x195c22(0x4ec)][_0x195c22(0x5a0)],Window_NumberInput[_0x195c22(0x4ec)]['processDigitChange']=function(){const _0x5ce4b6=_0x195c22;if(!this['isOpenAndActive']())return;if(Input[_0x5ce4b6(0x448)]())this[_0x5ce4b6(0x36f)]();else{if(Input[_0x5ce4b6(0x2fd)](_0x5ce4b6(0x5d6)))this[_0x5ce4b6(0x474)]();else{if(Input[_0x5ce4b6(0x64d)]===0x2e)this[_0x5ce4b6(0x5eb)]();else{if(Input[_0x5ce4b6(0x64d)]===0x24)this[_0x5ce4b6(0x60f)]();else Input[_0x5ce4b6(0x64d)]===0x23?this[_0x5ce4b6(0x1fc)]():(VisuMZ[_0x5ce4b6(0x6b0)][_0x5ce4b6(0x646)][_0x5ce4b6(0x48a)](this),Input[_0x5ce4b6(0x29a)]());}}}},Window_NumberInput[_0x195c22(0x4ec)][_0x195c22(0x18d)]=function(){const _0x13e199=_0x195c22;if(!this[_0x13e199(0x16b)]())return;Input[_0x13e199(0x448)]()?this[_0x13e199(0x36f)]():Window_Selectable[_0x13e199(0x4ec)][_0x13e199(0x18d)][_0x13e199(0x48a)](this);},Window_NumberInput[_0x195c22(0x4ec)][_0x195c22(0x297)]=function(){},Window_NumberInput[_0x195c22(0x4ec)][_0x195c22(0x36f)]=function(){const _0x134ae3=_0x195c22;if(String(this[_0x134ae3(0x68e)])[_0x134ae3(0x397)]>=this[_0x134ae3(0x394)])return;this[_0x134ae3(0x68e)]=Number(String(this[_0x134ae3(0x68e)])+Input[_0x134ae3(0x3ca)]);const _0x1119be='9'['repeat'](this[_0x134ae3(0x394)]);this[_0x134ae3(0x68e)]=this['_number']['clamp'](0x0,_0x1119be),Input[_0x134ae3(0x29a)](),this[_0x134ae3(0x52c)](),SoundManager[_0x134ae3(0x2f2)](),this[_0x134ae3(0x1db)](this['_maxDigits']-0x1);},Window_NumberInput['prototype'][_0x195c22(0x474)]=function(){const _0x30e4b0=_0x195c22;this[_0x30e4b0(0x68e)]=Number(String(this[_0x30e4b0(0x68e)])[_0x30e4b0(0x3f1)](0x0,-0x1)),this[_0x30e4b0(0x68e)]=Math[_0x30e4b0(0x20e)](0x0,this[_0x30e4b0(0x68e)]),Input['clear'](),this['refresh'](),SoundManager[_0x30e4b0(0x2f2)](),this[_0x30e4b0(0x1db)](this[_0x30e4b0(0x394)]-0x1);},Window_NumberInput[_0x195c22(0x4ec)][_0x195c22(0x5eb)]=function(){const _0x430baf=_0x195c22;this[_0x430baf(0x68e)]=Number(String(this[_0x430baf(0x68e)])['substring'](0x1)),this[_0x430baf(0x68e)]=Math['max'](0x0,this['_number']),Input['clear'](),this[_0x430baf(0x52c)](),SoundManager[_0x430baf(0x2f2)](),this['select'](this[_0x430baf(0x394)]-0x1);});;Window_TitleCommand['_commandList']=VisuMZ[_0x195c22(0x6b0)]['Settings'][_0x195c22(0x1cc)],Window_TitleCommand[_0x195c22(0x4ec)]['makeCommandList']=function(){const _0x110c4e=_0x195c22;this[_0x110c4e(0x542)]();},Window_TitleCommand[_0x195c22(0x4ec)][_0x195c22(0x542)]=function(){const _0x1ad50c=_0x195c22;for(const _0x239861 of Window_TitleCommand[_0x1ad50c(0x4b4)]){if(_0x239861[_0x1ad50c(0x4c9)][_0x1ad50c(0x48a)](this)){const _0x331170=_0x239861[_0x1ad50c(0x6c7)];let _0x2c9aac=_0x239861['TextStr'];if(['',_0x1ad50c(0x685)]['includes'](_0x2c9aac))_0x2c9aac=_0x239861[_0x1ad50c(0x63f)][_0x1ad50c(0x48a)](this);const _0x34b402=_0x239861[_0x1ad50c(0x417)][_0x1ad50c(0x48a)](this),_0x29af0a=_0x239861['ExtJS'][_0x1ad50c(0x48a)](this);this[_0x1ad50c(0x6c0)](_0x2c9aac,_0x331170,_0x34b402,_0x29af0a),this[_0x1ad50c(0x31c)](_0x331170,_0x239861[_0x1ad50c(0x200)]['bind'](this,_0x29af0a));}}},Window_GameEnd[_0x195c22(0x4b4)]=VisuMZ[_0x195c22(0x6b0)]['Settings']['MenuLayout'][_0x195c22(0x1ac)][_0x195c22(0x6aa)],Window_GameEnd['prototype'][_0x195c22(0x4ee)]=function(){const _0x87586d=_0x195c22;this[_0x87586d(0x542)]();},Window_GameEnd[_0x195c22(0x4ec)]['makeCoreEngineCommandList']=function(){const _0x315a15=_0x195c22;for(const _0x11d483 of Window_GameEnd['_commandList']){if(_0x11d483['ShowJS'][_0x315a15(0x48a)](this)){const _0x4e61a3=_0x11d483[_0x315a15(0x6c7)];let _0x1771f6=_0x11d483[_0x315a15(0x30e)];if(['',_0x315a15(0x685)][_0x315a15(0x161)](_0x1771f6))_0x1771f6=_0x11d483[_0x315a15(0x63f)]['call'](this);const _0x24026a=_0x11d483[_0x315a15(0x417)][_0x315a15(0x48a)](this),_0xe19205=_0x11d483[_0x315a15(0x444)][_0x315a15(0x48a)](this);this[_0x315a15(0x6c0)](_0x1771f6,_0x4e61a3,_0x24026a,_0xe19205),this['setHandler'](_0x4e61a3,_0x11d483[_0x315a15(0x200)]['bind'](this,_0xe19205));}}};function Window_ButtonAssist(){const _0x315cc4=_0x195c22;this[_0x315cc4(0x4ff)](...arguments);}Window_ButtonAssist[_0x195c22(0x4ec)]=Object[_0x195c22(0x503)](Window_Base[_0x195c22(0x4ec)]),Window_ButtonAssist[_0x195c22(0x4ec)][_0x195c22(0x35c)]=Window_ButtonAssist,Window_ButtonAssist[_0x195c22(0x4ec)][_0x195c22(0x4ff)]=function(_0x151902){const _0x2b52a2=_0x195c22;this['_data']={},Window_Base[_0x2b52a2(0x4ec)][_0x2b52a2(0x4ff)][_0x2b52a2(0x48a)](this,_0x151902),this[_0x2b52a2(0x19d)](VisuMZ[_0x2b52a2(0x6b0)][_0x2b52a2(0x3e5)][_0x2b52a2(0x5d0)][_0x2b52a2(0x66e)]||0x0),this[_0x2b52a2(0x52c)]();},Window_ButtonAssist['prototype']['makeFontBigger']=function(){const _0xcad520=_0x195c22;this[_0xcad520(0x69d)][_0xcad520(0x6d7)]<=0x60&&(this['contents'][_0xcad520(0x6d7)]+=0x6);},Window_ButtonAssist['prototype'][_0x195c22(0x687)]=function(){const _0x38cfdf=_0x195c22;this[_0x38cfdf(0x69d)]['fontSize']>=0x18&&(this[_0x38cfdf(0x69d)][_0x38cfdf(0x6d7)]-=0x6);},Window_ButtonAssist[_0x195c22(0x4ec)][_0x195c22(0x684)]=function(){const _0x42bcad=_0x195c22;Window_Base[_0x42bcad(0x4ec)][_0x42bcad(0x684)]['call'](this),this[_0x42bcad(0x345)]();},Window_ButtonAssist[_0x195c22(0x4ec)][_0x195c22(0x1d0)]=function(){const _0x5d9a96=_0x195c22;this[_0x5d9a96(0x437)]=SceneManager['_scene'][_0x5d9a96(0x3f0)]()!==_0x5d9a96(0x51e)?0x0:0x8;},Window_ButtonAssist['prototype']['updateKeyText']=function(){const _0x3d342a=_0x195c22,_0x2cbd23=SceneManager[_0x3d342a(0x60d)];for(let _0x13d7cf=0x1;_0x13d7cf<=0x5;_0x13d7cf++){if(this[_0x3d342a(0x6bf)][_0x3d342a(0x41c)[_0x3d342a(0x57c)](_0x13d7cf)]!==_0x2cbd23['buttonAssistKey%1'['format'](_0x13d7cf)]())return this['refresh']();if(this[_0x3d342a(0x6bf)]['text%1'[_0x3d342a(0x57c)](_0x13d7cf)]!==_0x2cbd23[_0x3d342a(0x515)[_0x3d342a(0x57c)](_0x13d7cf)]())return this['refresh']();}},Window_ButtonAssist[_0x195c22(0x4ec)][_0x195c22(0x52c)]=function(){const _0x5743b4=_0x195c22;this[_0x5743b4(0x69d)][_0x5743b4(0x29a)]();for(let _0x3a682f=0x1;_0x3a682f<=0x5;_0x3a682f++){this[_0x5743b4(0x1f2)](_0x3a682f);}},Window_ButtonAssist[_0x195c22(0x4ec)][_0x195c22(0x1f2)]=function(_0x301bf9){const _0x46d53d=_0x195c22,_0x5e20ff=this[_0x46d53d(0x28b)]/0x5,_0xa5e86d=SceneManager[_0x46d53d(0x60d)],_0x120dfb=_0xa5e86d['buttonAssistKey%1'['format'](_0x301bf9)](),_0x259d91=_0xa5e86d[_0x46d53d(0x515)['format'](_0x301bf9)]();this[_0x46d53d(0x6bf)][_0x46d53d(0x41c)[_0x46d53d(0x57c)](_0x301bf9)]=_0x120dfb,this[_0x46d53d(0x6bf)][_0x46d53d(0x1ce)['format'](_0x301bf9)]=_0x259d91;if(_0x120dfb==='')return;if(_0x259d91==='')return;const _0x340e7b=_0xa5e86d[_0x46d53d(0x628)[_0x46d53d(0x57c)](_0x301bf9)](),_0x4ceaca=this[_0x46d53d(0x267)](),_0x44206b=_0x5e20ff*(_0x301bf9-0x1)+_0x4ceaca+_0x340e7b,_0x489030=VisuMZ[_0x46d53d(0x6b0)][_0x46d53d(0x3e5)][_0x46d53d(0x5d0)][_0x46d53d(0x235)];this[_0x46d53d(0x70d)](_0x489030[_0x46d53d(0x57c)](_0x120dfb,_0x259d91),_0x44206b,0x0,_0x5e20ff-_0x4ceaca*0x2);},VisuMZ[_0x195c22(0x5c8)]=function(_0x4909ad){const _0x172cc9=_0x195c22;if(Utils[_0x172cc9(0x2fb)]('test')){var _0x4e7ed4=require(_0x172cc9(0x204))['Window'][_0x172cc9(0x2b2)]();SceneManager['showDevTools']();if(_0x4909ad)setTimeout(_0x4e7ed4[_0x172cc9(0x663)]['bind'](_0x4e7ed4),0x190);}},VisuMZ[_0x195c22(0x385)]=function(_0xfe0f63,_0x19c681){const _0x443612=_0x195c22;_0x19c681=_0x19c681[_0x443612(0x336)]();var _0x511a35=1.70158,_0x1f56c9=0.7;switch(_0x19c681){case _0x443612(0x39c):return _0xfe0f63;case'INSINE':return-0x1*Math['cos'](_0xfe0f63*(Math['PI']/0x2))+0x1;case _0x443612(0x264):return Math['sin'](_0xfe0f63*(Math['PI']/0x2));case _0x443612(0x434):return-0.5*(Math[_0x443612(0x3e4)](Math['PI']*_0xfe0f63)-0x1);case _0x443612(0x39b):return _0xfe0f63*_0xfe0f63;case _0x443612(0x47e):return _0xfe0f63*(0x2-_0xfe0f63);case _0x443612(0x20c):return _0xfe0f63<0.5?0x2*_0xfe0f63*_0xfe0f63:-0x1+(0x4-0x2*_0xfe0f63)*_0xfe0f63;case _0x443612(0x1ca):return _0xfe0f63*_0xfe0f63*_0xfe0f63;case _0x443612(0x6f7):var _0x2fa8a9=_0xfe0f63-0x1;return _0x2fa8a9*_0x2fa8a9*_0x2fa8a9+0x1;case'INOUTCUBIC':return _0xfe0f63<0.5?0x4*_0xfe0f63*_0xfe0f63*_0xfe0f63:(_0xfe0f63-0x1)*(0x2*_0xfe0f63-0x2)*(0x2*_0xfe0f63-0x2)+0x1;case'INQUART':return _0xfe0f63*_0xfe0f63*_0xfe0f63*_0xfe0f63;case _0x443612(0x589):var _0x2fa8a9=_0xfe0f63-0x1;return 0x1-_0x2fa8a9*_0x2fa8a9*_0x2fa8a9*_0x2fa8a9;case'INOUTQUART':var _0x2fa8a9=_0xfe0f63-0x1;return _0xfe0f63<0.5?0x8*_0xfe0f63*_0xfe0f63*_0xfe0f63*_0xfe0f63:0x1-0x8*_0x2fa8a9*_0x2fa8a9*_0x2fa8a9*_0x2fa8a9;case _0x443612(0x33d):return _0xfe0f63*_0xfe0f63*_0xfe0f63*_0xfe0f63*_0xfe0f63;case _0x443612(0x4f2):var _0x2fa8a9=_0xfe0f63-0x1;return 0x1+_0x2fa8a9*_0x2fa8a9*_0x2fa8a9*_0x2fa8a9*_0x2fa8a9;case _0x443612(0x4a8):var _0x2fa8a9=_0xfe0f63-0x1;return _0xfe0f63<0.5?0x10*_0xfe0f63*_0xfe0f63*_0xfe0f63*_0xfe0f63*_0xfe0f63:0x1+0x10*_0x2fa8a9*_0x2fa8a9*_0x2fa8a9*_0x2fa8a9*_0x2fa8a9;case _0x443612(0x1f8):if(_0xfe0f63===0x0)return 0x0;return Math[_0x443612(0x3bf)](0x2,0xa*(_0xfe0f63-0x1));case _0x443612(0x30c):if(_0xfe0f63===0x1)return 0x1;return-Math['pow'](0x2,-0xa*_0xfe0f63)+0x1;case _0x443612(0x6c1):if(_0xfe0f63===0x0||_0xfe0f63===0x1)return _0xfe0f63;var _0x46585d=_0xfe0f63*0x2,_0x1cfb78=_0x46585d-0x1;if(_0x46585d<0x1)return 0.5*Math[_0x443612(0x3bf)](0x2,0xa*_0x1cfb78);return 0.5*(-Math[_0x443612(0x3bf)](0x2,-0xa*_0x1cfb78)+0x2);case _0x443612(0x551):var _0x46585d=_0xfe0f63/0x1;return-0x1*(Math['sqrt'](0x1-_0x46585d*_0xfe0f63)-0x1);case'OUTCIRC':var _0x2fa8a9=_0xfe0f63-0x1;return Math[_0x443612(0x25b)](0x1-_0x2fa8a9*_0x2fa8a9);case _0x443612(0x260):var _0x46585d=_0xfe0f63*0x2,_0x1cfb78=_0x46585d-0x2;if(_0x46585d<0x1)return-0.5*(Math['sqrt'](0x1-_0x46585d*_0x46585d)-0x1);return 0.5*(Math[_0x443612(0x25b)](0x1-_0x1cfb78*_0x1cfb78)+0x1);case _0x443612(0x1e2):return _0xfe0f63*_0xfe0f63*((_0x511a35+0x1)*_0xfe0f63-_0x511a35);case'OUTBACK':var _0x46585d=_0xfe0f63/0x1-0x1;return _0x46585d*_0x46585d*((_0x511a35+0x1)*_0x46585d+_0x511a35)+0x1;break;case _0x443612(0x69a):var _0x46585d=_0xfe0f63*0x2,_0x4cd6c2=_0x46585d-0x2,_0x563322=_0x511a35*1.525;if(_0x46585d<0x1)return 0.5*_0x46585d*_0x46585d*((_0x563322+0x1)*_0x46585d-_0x563322);return 0.5*(_0x4cd6c2*_0x4cd6c2*((_0x563322+0x1)*_0x4cd6c2+_0x563322)+0x2);case _0x443612(0x42b):if(_0xfe0f63===0x0||_0xfe0f63===0x1)return _0xfe0f63;var _0x46585d=_0xfe0f63/0x1,_0x1cfb78=_0x46585d-0x1,_0x270046=0x1-_0x1f56c9,_0x563322=_0x270046/(0x2*Math['PI'])*Math[_0x443612(0x4e8)](0x1);return-(Math[_0x443612(0x3bf)](0x2,0xa*_0x1cfb78)*Math[_0x443612(0x674)]((_0x1cfb78-_0x563322)*(0x2*Math['PI'])/_0x270046));case'OUTELASTIC':var _0x270046=0x1-_0x1f56c9,_0x46585d=_0xfe0f63*0x2;if(_0xfe0f63===0x0||_0xfe0f63===0x1)return _0xfe0f63;var _0x563322=_0x270046/(0x2*Math['PI'])*Math['asin'](0x1);return Math[_0x443612(0x3bf)](0x2,-0xa*_0x46585d)*Math[_0x443612(0x674)]((_0x46585d-_0x563322)*(0x2*Math['PI'])/_0x270046)+0x1;case'INOUTELASTIC':var _0x270046=0x1-_0x1f56c9;if(_0xfe0f63===0x0||_0xfe0f63===0x1)return _0xfe0f63;var _0x46585d=_0xfe0f63*0x2,_0x1cfb78=_0x46585d-0x1,_0x563322=_0x270046/(0x2*Math['PI'])*Math['asin'](0x1);if(_0x46585d<0x1)return-0.5*(Math[_0x443612(0x3bf)](0x2,0xa*_0x1cfb78)*Math[_0x443612(0x674)]((_0x1cfb78-_0x563322)*(0x2*Math['PI'])/_0x270046));return Math['pow'](0x2,-0xa*_0x1cfb78)*Math['sin']((_0x1cfb78-_0x563322)*(0x2*Math['PI'])/_0x270046)*0.5+0x1;case _0x443612(0x420):var _0x46585d=_0xfe0f63/0x1;if(_0x46585d<0x1/2.75)return 7.5625*_0x46585d*_0x46585d;else{if(_0x46585d<0x2/2.75){var _0x4cd6c2=_0x46585d-1.5/2.75;return 7.5625*_0x4cd6c2*_0x4cd6c2+0.75;}else{if(_0x46585d<2.5/2.75){var _0x4cd6c2=_0x46585d-2.25/2.75;return 7.5625*_0x4cd6c2*_0x4cd6c2+0.9375;}else{var _0x4cd6c2=_0x46585d-2.625/2.75;return 7.5625*_0x4cd6c2*_0x4cd6c2+0.984375;}}}case _0x443612(0x35b):var _0x28d90d=0x1-VisuMZ[_0x443612(0x385)](0x1-_0xfe0f63,_0x443612(0x48c));return _0x28d90d;case _0x443612(0x43f):if(_0xfe0f63<0.5)var _0x28d90d=VisuMZ[_0x443612(0x385)](_0xfe0f63*0x2,_0x443612(0x358))*0.5;else var _0x28d90d=VisuMZ[_0x443612(0x385)](_0xfe0f63*0x2-0x1,_0x443612(0x48c))*0.5+0.5;return _0x28d90d;default:return _0xfe0f63;}},VisuMZ['GetParamIcon']=function(_0x34b4fa){const _0x451ff1=_0x195c22;_0x34b4fa=String(_0x34b4fa)[_0x451ff1(0x336)]();const _0xdc8d4a=VisuMZ[_0x451ff1(0x6b0)][_0x451ff1(0x3e5)][_0x451ff1(0x244)];if(_0x34b4fa===_0x451ff1(0x712))return _0xdc8d4a['IconParam0'];if(_0x34b4fa===_0x451ff1(0x633))return _0xdc8d4a[_0x451ff1(0x208)];if(_0x34b4fa===_0x451ff1(0x337))return _0xdc8d4a[_0x451ff1(0x2c0)];if(_0x34b4fa===_0x451ff1(0x5f5))return _0xdc8d4a[_0x451ff1(0x708)];if(_0x34b4fa===_0x451ff1(0x50c))return _0xdc8d4a['IconParam4'];if(_0x34b4fa===_0x451ff1(0x536))return _0xdc8d4a[_0x451ff1(0x455)];if(_0x34b4fa===_0x451ff1(0x574))return _0xdc8d4a[_0x451ff1(0x6b9)];if(_0x34b4fa===_0x451ff1(0x223))return _0xdc8d4a[_0x451ff1(0x461)];if(_0x34b4fa==='HIT')return _0xdc8d4a[_0x451ff1(0x4d1)];if(_0x34b4fa==='EVA')return _0xdc8d4a['IconXParam1'];if(_0x34b4fa==='CRI')return _0xdc8d4a[_0x451ff1(0x2de)];if(_0x34b4fa===_0x451ff1(0x6a0))return _0xdc8d4a[_0x451ff1(0x6bd)];if(_0x34b4fa==='MEV')return _0xdc8d4a[_0x451ff1(0x492)];if(_0x34b4fa===_0x451ff1(0x3ee))return _0xdc8d4a[_0x451ff1(0x4db)];if(_0x34b4fa===_0x451ff1(0x27d))return _0xdc8d4a[_0x451ff1(0x6f3)];if(_0x34b4fa==='HRG')return _0xdc8d4a[_0x451ff1(0x400)];if(_0x34b4fa===_0x451ff1(0x1a1))return _0xdc8d4a[_0x451ff1(0x300)];if(_0x34b4fa===_0x451ff1(0x53d))return _0xdc8d4a[_0x451ff1(0x32b)];if(_0x34b4fa===_0x451ff1(0x3ea))return _0xdc8d4a['IconSParam0'];if(_0x34b4fa===_0x451ff1(0x35e))return _0xdc8d4a[_0x451ff1(0x484)];if(_0x34b4fa===_0x451ff1(0x1d5))return _0xdc8d4a[_0x451ff1(0x700)];if(_0x34b4fa===_0x451ff1(0x5e6))return _0xdc8d4a[_0x451ff1(0x398)];if(_0x34b4fa==='MCR')return _0xdc8d4a[_0x451ff1(0x6c3)];if(_0x34b4fa===_0x451ff1(0x31a))return _0xdc8d4a[_0x451ff1(0x572)];if(_0x34b4fa===_0x451ff1(0x410))return _0xdc8d4a[_0x451ff1(0x495)];if(_0x34b4fa===_0x451ff1(0x49a))return _0xdc8d4a[_0x451ff1(0x673)];if(_0x34b4fa==='FDR')return _0xdc8d4a[_0x451ff1(0x58a)];if(_0x34b4fa==='EXR')return _0xdc8d4a[_0x451ff1(0x571)];if(VisuMZ[_0x451ff1(0x6b0)]['CustomParamIcons'][_0x34b4fa])return VisuMZ[_0x451ff1(0x6b0)][_0x451ff1(0x2ef)][_0x34b4fa]||0x0;return 0x0;},VisuMZ['ConvertNumberToString']=function(_0x574f00,_0x1906b4,_0x56a6cd){const _0xad659c=_0x195c22;if(_0x56a6cd===undefined&&_0x574f00%0x1===0x0)return _0x574f00;if(_0x56a6cd!==undefined&&[_0xad659c(0x712),_0xad659c(0x633),_0xad659c(0x337),'DEF',_0xad659c(0x50c),_0xad659c(0x536),_0xad659c(0x574),'LUK'][_0xad659c(0x161)](String(_0x56a6cd)[_0xad659c(0x336)]()[_0xad659c(0x368)]()))return _0x574f00;return _0x1906b4=_0x1906b4||0x0,String((_0x574f00*0x64)[_0xad659c(0x4b3)](_0x1906b4))+'%';},VisuMZ[_0x195c22(0x4f1)]=function(_0x2e7170){const _0x33d5fe=_0x195c22;_0x2e7170=String(_0x2e7170);if(!_0x2e7170)return _0x2e7170;if(typeof _0x2e7170!=='string')return _0x2e7170;const _0x10305e=VisuMZ['CoreEngine'][_0x33d5fe(0x3e5)]['QoL'][_0x33d5fe(0x1df)]||_0x33d5fe(0x463),_0x39fefa={'maximumFractionDigits':0x6};_0x2e7170=_0x2e7170[_0x33d5fe(0x196)](/\[(.*?)\]/g,(_0x486fad,_0x94fcda)=>{const _0x28a9a5=_0x33d5fe;return VisuMZ[_0x28a9a5(0x5c1)](_0x94fcda,'[',']');}),_0x2e7170=_0x2e7170[_0x33d5fe(0x196)](/<(.*?)>/g,(_0x41d4bb,_0x5d0768)=>{return VisuMZ['PreserveNumbers'](_0x5d0768,'<','>');}),_0x2e7170=_0x2e7170[_0x33d5fe(0x196)](/\{\{(.*?)\}\}/g,(_0xa7feca,_0x77fba9)=>{const _0x12ac0d=_0x33d5fe;return VisuMZ[_0x12ac0d(0x5c1)](_0x77fba9,'','');}),_0x2e7170=_0x2e7170[_0x33d5fe(0x196)](/(\d+\.?\d*)/g,(_0x1e8560,_0x4fce3a)=>{const _0x288bf9=_0x33d5fe;let _0x3fa4a8=_0x4fce3a;if(_0x3fa4a8[0x0]==='0')return _0x3fa4a8;if(_0x3fa4a8[_0x3fa4a8[_0x288bf9(0x397)]-0x1]==='.')return Number(_0x3fa4a8)[_0x288bf9(0x22b)](_0x10305e,_0x39fefa)+'.';else return _0x3fa4a8[_0x3fa4a8['length']-0x1]===','?Number(_0x3fa4a8)['toLocaleString'](_0x10305e,_0x39fefa)+',':Number(_0x3fa4a8)[_0x288bf9(0x22b)](_0x10305e,_0x39fefa);});let _0x559e85=0x3;while(_0x559e85--){_0x2e7170=VisuMZ[_0x33d5fe(0x318)](_0x2e7170);}return _0x2e7170;},VisuMZ[_0x195c22(0x5c1)]=function(_0xc0240a,_0x37247f,_0x1057e5){const _0x4ae151=_0x195c22;return _0xc0240a=_0xc0240a['replace'](/(\d)/gi,(_0x41c30e,_0x42fb52)=>'PRESERVCONVERSION(%1)'[_0x4ae151(0x57c)](Number(_0x42fb52))),_0x4ae151(0x292)[_0x4ae151(0x57c)](_0xc0240a,_0x37247f,_0x1057e5);},VisuMZ[_0x195c22(0x318)]=function(_0x2ac8cc){const _0x1a7f78=_0x195c22;return _0x2ac8cc=_0x2ac8cc[_0x1a7f78(0x196)](/PRESERVCONVERSION\((\d+)\)/gi,(_0xff4efc,_0x5b0515)=>Number(parseInt(_0x5b0515))),_0x2ac8cc;},VisuMZ[_0x195c22(0x2f8)]=function(_0x4e917f){const _0x46ce78=_0x195c22;SoundManager[_0x46ce78(0x671)]();if(!Utils['isNwjs']()){const _0x8a8d62=window[_0x46ce78(0x600)](_0x4e917f,_0x46ce78(0x3da));}else{const _0x3778b4=process['platform']=='darwin'?_0x46ce78(0x600):process['platform']=='win32'?_0x46ce78(0x299):_0x46ce78(0x3e7);require(_0x46ce78(0x6ee))['exec'](_0x3778b4+'\x20'+_0x4e917f);}},Game_Picture['prototype']['anchor']=function(){const _0x2c704e=_0x195c22;return this[_0x2c704e(0x5e3)];},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x2af)]=Game_Picture[_0x195c22(0x4ec)][_0x195c22(0x23c)],Game_Picture[_0x195c22(0x4ec)]['initBasic']=function(){const _0x8a1538=_0x195c22;VisuMZ[_0x8a1538(0x6b0)][_0x8a1538(0x2af)]['call'](this),this[_0x8a1538(0x5e3)]={'x':0x0,'y':0x0},this[_0x8a1538(0x5d2)]={'x':0x0,'y':0x0};},VisuMZ['CoreEngine'][_0x195c22(0x6ac)]=Game_Picture['prototype']['updateMove'],Game_Picture[_0x195c22(0x4ec)][_0x195c22(0x4a1)]=function(){const _0x304f19=_0x195c22;this['updateAnchor'](),VisuMZ['CoreEngine']['Game_Picture_updateMove'][_0x304f19(0x48a)](this);},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x4ad)]=Game_Picture['prototype']['show'],Game_Picture[_0x195c22(0x4ec)]['show']=function(_0x21811e,_0x3b3492,_0x13c092,_0x1a1cff,_0x2aa5cd,_0x4794b3,_0x368640,_0x2a9b85){const _0x162c67=_0x195c22;VisuMZ[_0x162c67(0x6b0)][_0x162c67(0x4ad)]['call'](this,_0x21811e,_0x3b3492,_0x13c092,_0x1a1cff,_0x2aa5cd,_0x4794b3,_0x368640,_0x2a9b85),this[_0x162c67(0x6ad)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x3b3492]||{'x':0x0,'y':0x0});},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x1da)]=Game_Picture[_0x195c22(0x4ec)][_0x195c22(0x4fc)],Game_Picture[_0x195c22(0x4ec)][_0x195c22(0x4fc)]=function(_0x26c721,_0x22d64b,_0x5cb0c7,_0x238c9e,_0x6e3c4,_0x5ebb41,_0x5bcf41,_0x20393c,_0x251fba){const _0x429d40=_0x195c22;VisuMZ[_0x429d40(0x6b0)]['Game_Picture_move'][_0x429d40(0x48a)](this,_0x26c721,_0x22d64b,_0x5cb0c7,_0x238c9e,_0x6e3c4,_0x5ebb41,_0x5bcf41,_0x20393c,_0x251fba),this[_0x429d40(0x39d)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x26c721]||{'x':0x0,'y':0x0});},Game_Picture[_0x195c22(0x4ec)][_0x195c22(0x452)]=function(){const _0x5442e5=_0x195c22;this[_0x5442e5(0x4dc)]>0x0&&(this[_0x5442e5(0x5e3)]['x']=this[_0x5442e5(0x2a4)](this[_0x5442e5(0x5e3)]['x'],this[_0x5442e5(0x5d2)]['x']),this[_0x5442e5(0x5e3)]['y']=this['applyEasing'](this['_anchor']['y'],this['_targetAnchor']['y']));},Game_Picture['prototype'][_0x195c22(0x6ad)]=function(_0x58bc14){const _0x74105d=_0x195c22;this[_0x74105d(0x5e3)]=_0x58bc14,this[_0x74105d(0x5d2)]=JsonEx['makeDeepCopy'](this['_anchor']);},Game_Picture[_0x195c22(0x4ec)][_0x195c22(0x39d)]=function(_0x18aaf0){const _0xbf5241=_0x195c22;this[_0xbf5241(0x5d2)]=_0x18aaf0;},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x30f)]=Sprite_Picture[_0x195c22(0x4ec)][_0x195c22(0x2a0)],Sprite_Picture[_0x195c22(0x4ec)]['updateOrigin']=function(){const _0x543183=_0x195c22,_0x28214c=this[_0x543183(0x240)]();!_0x28214c[_0x543183(0x584)]()?VisuMZ[_0x543183(0x6b0)][_0x543183(0x30f)][_0x543183(0x48a)](this):(this[_0x543183(0x584)]['x']=_0x28214c[_0x543183(0x584)]()['x'],this[_0x543183(0x584)]['y']=_0x28214c[_0x543183(0x584)]()['y']);},Game_Action['prototype'][_0x195c22(0x3bb)]=function(_0x295c77){const _0x3d535a=_0x195c22;if(_0x295c77){const _0x358baa=_0x295c77[_0x3d535a(0x718)];if(_0x358baa===0x1&&this['subject']()['attackSkillId']()!==0x1)this[_0x3d535a(0x56e)]();else _0x358baa===0x2&&this[_0x3d535a(0x678)]()[_0x3d535a(0x639)]()!==0x2?this[_0x3d535a(0x4c4)]():this[_0x3d535a(0x6fd)](_0x358baa);}else this[_0x3d535a(0x29a)]();},Game_Actor[_0x195c22(0x4ec)]['usableSkills']=function(){const _0x45a46e=_0x195c22;return this[_0x45a46e(0x1c5)]()[_0x45a46e(0x44a)](_0xd4e1f3=>this['canUse'](_0xd4e1f3)&&this[_0x45a46e(0x6a2)]()[_0x45a46e(0x161)](_0xd4e1f3['stypeId']));},Window_Base[_0x195c22(0x4ec)][_0x195c22(0x322)]=function(){const _0x233fc6=_0x195c22;this[_0x233fc6(0x450)]=new Sprite(),this[_0x233fc6(0x450)][_0x233fc6(0x209)]=new Bitmap(0x0,0x0),this[_0x233fc6(0x450)]['x']=0x0,this[_0x233fc6(0x5d4)](this[_0x233fc6(0x450)]);},Window_Base[_0x195c22(0x4ec)][_0x195c22(0x2c5)]=function(){const _0x5cefe1=_0x195c22;if(this[_0x5cefe1(0x450)]){const _0x57bff8=this['_dimmerSprite'][_0x5cefe1(0x209)],_0x5c8e99=this['width'],_0x18e4c4=this['height'],_0x415784=this['padding'],_0x3960a0=ColorManager[_0x5cefe1(0x46a)](),_0x280deb=ColorManager[_0x5cefe1(0x373)]();_0x57bff8[_0x5cefe1(0x29c)](_0x5c8e99,_0x18e4c4),_0x57bff8['gradientFillRect'](0x0,0x0,_0x5c8e99,_0x415784,_0x280deb,_0x3960a0,!![]),_0x57bff8['fillRect'](0x0,_0x415784,_0x5c8e99,_0x18e4c4-_0x415784*0x2,_0x3960a0),_0x57bff8[_0x5cefe1(0x374)](0x0,_0x18e4c4-_0x415784,_0x5c8e99,_0x415784,_0x3960a0,_0x280deb,!![]),this['_dimmerSprite'][_0x5cefe1(0x61e)](0x0,0x0,_0x5c8e99,_0x18e4c4);}},Game_Actor[_0x195c22(0x4ec)]['makeAutoBattleActions']=function(){const _0x487e6a=_0x195c22;for(let _0x42ac22=0x0;_0x42ac22<this[_0x487e6a(0x4b8)]();_0x42ac22++){const _0x35f9e7=this['makeActionList']();let _0xa2b3d1=Number['MIN_SAFE_INTEGER'];this[_0x487e6a(0x15c)](_0x42ac22,_0x35f9e7[0x0]);for(const _0xfcd65f of _0x35f9e7){const _0x1e83ad=_0xfcd65f[_0x487e6a(0x1b1)]();_0x1e83ad>_0xa2b3d1&&(_0xa2b3d1=_0x1e83ad,this['setAction'](_0x42ac22,_0xfcd65f));}}this['setActionState'](_0x487e6a(0x6e8));},Window_BattleItem[_0x195c22(0x4ec)][_0x195c22(0x67f)]=function(_0x9ab83a){const _0x85568a=_0x195c22;return BattleManager[_0x85568a(0x490)]()?BattleManager['actor']()[_0x85568a(0x1e5)](_0x9ab83a):Window_ItemList[_0x85568a(0x4ec)][_0x85568a(0x67f)][_0x85568a(0x48a)](this,_0x9ab83a);},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x186)]=Scene_Map[_0x195c22(0x4ec)][_0x195c22(0x3c1)],Scene_Map[_0x195c22(0x4ec)][_0x195c22(0x3c1)]=function(){const _0x175224=_0x195c22;VisuMZ['CoreEngine'][_0x175224(0x186)][_0x175224(0x48a)](this);const _0x5bfdd3=this[_0x175224(0x55f)][_0x175224(0x48d)];if(_0x5bfdd3)this[_0x175224(0x3ae)](_0x5bfdd3);},VisuMZ[_0x195c22(0x6b0)][_0x195c22(0x269)]=Scene_Battle['prototype']['createSpriteset'],Scene_Battle[_0x195c22(0x4ec)][_0x195c22(0x3c1)]=function(){const _0x24c7a5=_0x195c22;VisuMZ[_0x24c7a5(0x6b0)][_0x24c7a5(0x269)][_0x24c7a5(0x48a)](this);const _0xd12b8a=this[_0x24c7a5(0x55f)][_0x24c7a5(0x48d)];if(_0xd12b8a)this[_0x24c7a5(0x3ae)](_0xd12b8a);},Window[_0x195c22(0x4ec)][_0x195c22(0x6b4)]=function(){const _0x2c0497=_0x195c22,_0x3e027f=this[_0x2c0497(0x615)],_0x26f94f=this['_height'],_0x469184=0x18,_0x2b55d7=_0x469184/0x2,_0x30b809=0x60+_0x469184,_0x44cbe5=0x0+_0x469184;this[_0x2c0497(0x2e7)][_0x2c0497(0x209)]=this['_windowskin'],this['_downArrowSprite']['anchor']['x']=0.5,this[_0x2c0497(0x2e7)]['anchor']['y']=0.5,this[_0x2c0497(0x2e7)][_0x2c0497(0x61e)](_0x30b809+_0x2b55d7,_0x44cbe5+_0x2b55d7+_0x469184,_0x469184,_0x2b55d7),this[_0x2c0497(0x2e7)][_0x2c0497(0x4fc)](Math[_0x2c0497(0x643)](_0x3e027f/0x2),Math['round'](_0x26f94f-_0x2b55d7)),this[_0x2c0497(0x6c2)][_0x2c0497(0x209)]=this['_windowskin'],this[_0x2c0497(0x6c2)][_0x2c0497(0x584)]['x']=0.5,this[_0x2c0497(0x6c2)][_0x2c0497(0x584)]['y']=0.5,this[_0x2c0497(0x6c2)][_0x2c0497(0x61e)](_0x30b809+_0x2b55d7,_0x44cbe5,_0x469184,_0x2b55d7),this['_upArrowSprite'][_0x2c0497(0x4fc)](Math[_0x2c0497(0x643)](_0x3e027f/0x2),Math[_0x2c0497(0x643)](_0x2b55d7));},Window[_0x195c22(0x4ec)][_0x195c22(0x32f)]=function(){const _0x15a7ff=_0x195c22,_0x3410bb=0x90,_0x54a14a=0x60,_0x472bed=0x18;this[_0x15a7ff(0x464)][_0x15a7ff(0x209)]=this[_0x15a7ff(0x5f7)],this[_0x15a7ff(0x464)][_0x15a7ff(0x584)]['x']=0.5,this['_pauseSignSprite'][_0x15a7ff(0x584)]['y']=0x1,this[_0x15a7ff(0x464)][_0x15a7ff(0x4fc)](Math['round'](this[_0x15a7ff(0x615)]/0x2),this[_0x15a7ff(0x21a)]),this[_0x15a7ff(0x464)][_0x15a7ff(0x61e)](_0x3410bb,_0x54a14a,_0x472bed,_0x472bed),this['_pauseSignSprite'][_0x15a7ff(0x609)]=0x0;},Window[_0x195c22(0x4ec)][_0x195c22(0x187)]=function(){const _0x90a325=_0x195c22,_0xccc85c=this['_clientArea'][_0x90a325(0x436)][_0x90a325(0x1c3)](new Point(0x0,0x0)),_0x22e2d7=this[_0x90a325(0x2e2)][_0x90a325(0x4ae)];_0x22e2d7['x']=_0xccc85c['x']+this[_0x90a325(0x189)]['x'],_0x22e2d7['y']=_0xccc85c['y']+this[_0x90a325(0x189)]['y'],_0x22e2d7['width']=Math[_0x90a325(0x50f)](this[_0x90a325(0x28b)]*this[_0x90a325(0x211)]['x']),_0x22e2d7[_0x90a325(0x466)]=Math[_0x90a325(0x50f)](this['innerHeight']*this[_0x90a325(0x211)]['y']);};