//=============================================================================
// VisuStella MZ - Battle Core
// VisuMZ_1_BattleCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_BattleCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleCore = VisuMZ.BattleCore || {};
VisuMZ.BattleCore.version = 1.29;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.29] [BattleCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Battle Core plugin revamps the battle engine provided by RPG Maker MZ to
 * become more flexible, streamlined, and support a variety of features. The
 * updated battle engine allows for custom Action Sequences, battle layout
 * styles, and a lot of control over the battle mechanics, too.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Action Sequence Plugin Commands to give you full control over what happens
 *   during the course of a skill or item.
 * * Animated Sideview Battler support for enemies!
 * * Auto Battle options for party-wide and actor-only instances.
 * * Base Troop Events to quickly streamline events for all Troop events.
 * * Battle Command control to let you change which commands appear for actors.
 * * Battle Layout styles to change the way the battle scene looks.
 * * Casting animation support for skills.
 * * Critical Hit control over the success rate formula and damage multipliers.
 * * Custom target scopes added for skills and items.
 * * Damage formula control, including Damage Styles.
 * * Damage caps, both hard caps and soft caps.
 * * Damage traits such Armor Penetration/Reduction to bypass defenses.
 * * Elements & Status Menu Core support for traits.
 * * Multitude of JavaScript notetags and global Plugin Parameters to let you
 *   make a variety of effects across various instances during battle.
 * * Party Command window can be skipped/disabled entirely.
 * * Weather effects now show in battle.
 * * Streamlined Battle Log to remove redundant information and improve the
 *   flow of battle.
 * * Visual HP Gauges can be displayed above the heads of actors and/or enemies
 *   with a possible requirement for enemies to be defeated at least once first
 *   in order for them to show.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin will overwrite some core parts of the RPG Maker MZ base code in
 * order to ensure the Battle Core plugin will work at full capacity. The
 * following are explanations of what has been changed.
 *
 * ---
 *
 * Action Sequences
 *
 * - Action sequences are now done either entirely by the Battle Log Window or
 * through common events if the <Custom Action Sequence> notetag is used.
 * In RPG Maker MZ by default, Action Sequences would be a mixture of using the
 * Battle Log Window, the Battle Manager, and the Battle Scene, making it hard
 * to fully grab control of the situation.
 *
 * ---
 *
 * Action Speed
 *
 * - Action speeds determine the turn order in the default battle system. The
 * AGI of a battle unit is also taken into consideration. However, the random
 * variance applied to the action speed system makes the turn order extremely
 * chaotic and hard for the player to determine. Thus, the random variance
 * aspect of it has been turned off. This can be reenabled by default through
 * Plugin Parameters => Mechanics Settings => Allow Random Speed?
 *
 * ---
 *
 * Animated Sideview Battler Support For Enemies
 *
 * - Enemies can now use Sideview Actor sprites for themselves! They will
 * behave like actors and can even carry their own set of weapons for physical
 * attacks. These must be set up using notetags. More information can be found
 * in the notetag section.
 *
 * - As the sprites are normally used for actors, some changes have been made
 * to Sprite_Actor to be able to support both actors and enemies. These changes
 * should have minimal impact on other plugins.
 *
 * ---
 *
 * Battle Sprite Updates
 *
 * - A lot of functions in Sprite_Battler, Sprite_Actor, and Sprite_Enemy have
 * been overwritten to make the new Action Sequence system added by this plugin
 * possible. These changes make it possible for the sprites to move anywhere on
 * the screen, jump, float, change visibility, and more.
 *
 * ---
 *
 * Change Battle Back in Battle
 * 
 * - By default, the Change Battle Back event command does not work in battle.
 * Any settings made to it will only reflect in the following battle. Now, if
 * the battle back event command is used during battle, it will reflect upon
 * any new changes immediately.
 *
 * ---
 *
 * Critical Hit - LUK Influence
 *
 * - The LUK Buffs now affect the critical hit rate based off how the formula
 * is now calculated. Each stack of a LUK Buff will double the critical hit
 * rate and compound upon that. That means a x1 LUK Buff stack will raise it by
 * x2, a x2 LUK Buff stack will raise the critical hit rate by x4, a x3 LUK
 * Buff Stack will raise the critical hit rate stack by x8, and so on.
 *
 * - LUK also plays a role in how much damage is dealt with critical hits. The
 * default critical hit multiplier has been reduced from x3 to x2. However, a
 * percentage of LUK will added on (based off the user's CRI rate) onto the
 * finalized critical damage. If the user's CRI rate is 4%, then 4% of the user
 * LUK value will also be added onto the damage.
 *
 * - This change can be altered through Plugin Parameters => Damage Settings =>
 * Critical Hits => JS: Rate Formula and JS: Damage Formula.
 *
 * ---
 * 
 * Damage Popups
 * 
 * - Damage popups are now formatted with + and - to determine healing and
 * damage. MP Damage will also include "MP" at the back. This is to make it
 * clearer what each colored variant of the damage popup means as well as help
 * color blind players read the on-screen data properly.
 * 
 * - Damage popups have also been rewritten to show all changed aspects instead
 * of just one. Previously with RPG Maker MZ, if an action would deal both HP
 * and MP damage, only one of them would show. Now, everything is separated and
 * both HP and MP changes will at a time.
 * 
 * ---
 * 
 * Dual Wielding
 * 
 * - Previously, RPG Maker MZ had "Dual Wielding" attack using both weapon
 * animations at once, with the combined ATK of each weapon. It's confusing to
 * look at and does not portray the nature of "Dual Wielding".
 * 
 * - Dual Wielding, or in the case of users adding in third and fourth weapons,
 * Multi Wielding is now changed. Each weapon is displayed individually, each
 * producing its own attack animation, showing each weapon type, and applying
 * only that weapon's ATK, Traits, and related effects. It is no longer a
 * combined effect to display everything at once like RPG Maker MZ default.
 * 
 * - If an actor has multiple weapon slots but some of them are unequipped,
 * then the action will treat the attack as a single attack. There will be no
 * barehanded attack to add on top of it. This is to match RPG Maker MZ's
 * decision to omit a second animation if the same scenario is applied.
 * 
 * ---
 *
 * Force Action
 *
 * - Previously, Forced Actions would interrupt the middle of an event to
 * perform an action. However, with the addition of more flexible Action
 * Sequences, the pre-existing Force Action system would not be able to exist
 * and would require being remade.
 *
 * - Forced Actions now are instead, added to a separate queue from the action
 * battler list. Whenever an action and/or common event is completed, then if
 * there's a Forced Action battler queued, then the Forced Action battler will
 * have its turn. This is the cleanest method available and avoids the most
 * conflicts possible.
 *
 * - This means if you planned to make cinematic sequences with Forced Actions,
 * you will need to account for the queued Force Actions. However, in the case
 * of battle cinematics, we would highly recommend that you use the newly added
 * Action Sequence Plugin Commands instead as those give you more control than
 * any Force Action ever could.
 *
 * ---
 *
 * Random Scope
 *
 * - The skill and item targeting scopes for Random Enemy, 2 Random Enemies,
 * 3 Random Enemies, 4 Random Enemies will now ignore TGR and utilize true
 * randomness.
 *
 * ---
 *
 * Spriteset_Battle Update
 *
 * - The spriteset now has extra containers to separate battlers (actors and
 * enemies), animations, and damage. This is to make actors and enemy battler
 * sprites more efficient to sort (if enabled), so that animations won't
 * interfere with and cover damage sprites, and to make sure damage sprites are
 * unaffected by screen tints in order to ensure the player will always have a
 * clear read on the information relaying sprites.
 *
 * ---
 *
 * Weather Displayed in Battle
 *
 * - Previously, weather has not been displayed in battle. This means that any
 * weather effects placed on the map do not transfer over to battle and causes
 * a huge disconnect for players. The Battle Core plugin will add weather
 * effects to match the map's weather conditions. Any changes made to weather
 * through event commands midway through battle will also be reflected.
 *
 * ---
 *
 * ============================================================================
 * Base Troops
 * ============================================================================
 *
 * Base Troops can be found, declared, and modified in the Plugin Parameters =>
 * Mechanics Settings => Base Troop ID's. All of the listed Troop ID's here
 * will have their page events replicated and placed under all other troops
 * found in the database.
 *
 * ---
 *
 * This means that if you have an event that runs on Turn 1 of a Base Troop,
 * then for every troop out there, that same event will also run on Turn 1,
 * as well. This is useful for those who wish to customize their battle system
 * further and to reduce the amount of work needed to copy/paste said event
 * pages into every database troop object manually.
 *
 * ---
 *
 * ============================================================================
 * Damage Styles
 * ============================================================================
 *
 * Damage Styles are a new feature added through the Battle Core plugin. When
 * using certain Battle Styles, you can completely ignore typing in the whole
 * damage formula inside the damage formula input box, and instead, insert
 * either a power amount or a multiplier depending on the Damage Style. The
 * plugin will then automatically calculate damage using that value factoring
 * in ATK, DEF, MAT, MDF values.
 *
 * ---
 *
 * Here is a list of the Damage Styles that come with this plugin by default.
 * You can add in your own and even edit them to your liking.
 * Or just remove them if you want.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Style          Use Formula As   PH/MA Disparity   Stat Scale   Damage Scale
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Standard       Formula          No                Varies       Varies
 * ArmorScaling   Formula          No                Varies       Varies
 * CT             Multiplier       Yes               Low          Normal
 * D4             Multiplier       No                High         Normal
 * DQ             Multiplier       No                Low          Low
 * FF7            Power            Yes               Low          High
 * FF8            Power            Yes               Medium       Normal
 * FF9            Power            Yes               Low          Normal
 * FF10           Power            Yes               Medium       High
 * MK             Multiplier       No                Medium       Low
 * MOBA           Multiplier       No                Medium       Normal
 * PKMN           Power            No                Low          Normal
 *
 * Use the above chart to figure out which Damage Style best fits your game,
 * if you plan on using them.
 *
 * The 'Standard' style is the same as the 'Manual' formula input, except that
 * it allows for the support of <Armor Penetration> and <Armor Reduction>
 * notetags.
 *
 * The 'Armor Scaling' style allows you to type in the base damage calculation
 * without the need to type in any defending modifiers.
 *
 * NOTE: While these are based off the damage formulas found in other games,
 * not all of them are exact replicas. Many of them are adapted for use in
 * RPG Maker MZ since not all RPG's use the same set of parameters and not all
 * external multipliers function the same way as RPG Maker MZ.
 * 
 * ---
 *
 * Style:
 * - This is what the Damage Style is.
 *
 * Use Formula As:
 * - This is what you insert into the formula box.
 * - Formula: Type in the formula for the action just as you would normally.
 * - Multiplier: Type in the multiplier for the action.
 *     Use float values. This means 250% is typed out as 2.50
 * - Power: Type in the power constant for the action.
 *     Use whole numbers. Type in something like 16 for a power constant.
 * 
 * PH/MA Disparity:
 * - Is there a disparity between how Physical Attacks and Magical Attacks
 *   are calculated?
 * - If yes, then physical attacks and magical attacks will have different
 *   formulas used.
 * - If no, then physical attacks and magical attacks will share similar
 *   formulas for how they're calculated.
 *
 * Stat Scale:
 * - How much should stats scale throughout the game?
 * - Low: Keep them under 100 for the best results.
 * - Medium: Numbers work from low to mid 400's for best results.
 * - High: The numbers really shine once they're higher.
 *
 * Damage Scale:
 * - How much does damage vary depending on small parameter changes?
 * - Low: Very little increase from parameter changes.
 * - Normal: Damage scales close to proportionally with parameter changes.
 * - High: Damage can boost itself drastically with parameter changes.
 *
 * ---
 *
 * To determine what kind of parameters are used for the Damage Styles, they
 * will depend on two things: the action's 'Hit Type' (ie Physical Attack,
 * Magical Attack, and Certain Hit) and the action's 'Damage Type' (ie. Damage,
 * Recovery, or Drain).
 *
 * Certain Hit tends to use whichever value is higher: ATK or MAT, and then
 * ignores the target's defense values. Use Certain Hits for 'True Damage'.
 *
 * Use the chart below to figure out everything else:
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Hit Type      Damage Type   Attacker Parameter   Defender Parameter
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Physical      Damage        ATK                  DEF
 * Magical       Damage        MAT                  MDF
 * Certain Hit   Damage        Larger (ATK, MAT)    -Ignores-
 * Physical      Recover       DEF                  -Ignores-
 * Magical       Recover       MDF                  -Ignores-
 * Certain Hit   Recover       Larger (ATK, MAT)    -Ignores-
 * Physical      Drain         ATK                  DEF
 * Magical       Drain         MAT                  MDF
 * Certain Hit   Drain         Larger (ATK, MAT)    -Ignores-
 *
 * These can be modified within the Plugin Parameters in the individual
 * Damage Styles themselves.
 *
 * ---
 *
 * Skills and Items can use different Damage Styles from the setting you've
 * selected in the Plugin Parameters. They can be altered to have different
 * Damage Styles through the usage of a notetag:
 *
 * <Damage Style: name>
 *
 * This will use whichever style is found in the Plugin Parameters.
 *
 * If "Manual" is used, then no style will be used and all calculations will be
 * made strictly based off the formula found inside the formula box.
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
 * === HP Gauge-Related Notetags ===
 * 
 * The following notetags allow you to set whether or not HP Gauges can be
 * displayed by enemies regardless of Plugin Parameter settings.
 * 
 * ---
 *
 * <Show HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Will always show the HP Gauge for the enemy regardless of the defeat
 *   requirement setting.
 * - This does not bypass the player's Options preferences.
 * - This does not bypass disabling enemy HP Gauges as a whole.
 * 
 * ---
 *
 * <Hide HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Will always hide the HP Gauge for the enemy regardless of the defeat
 *   requirement setting.
 * - This does not bypass the player's Options preferences.
 * 
 * ---
 * 
 * <Battle UI Offset: +x, +y>
 * <Battle UI Offset: -x, -y>
 * 
 * <Battle UI Offset X: +x>
 * <Battle UI Offset X: -x>
 * 
 * <Battle UI Offset Y: +y>
 * <Battle UI Offset Y: -y>
 * 
 * - Used for: Actor and Enemy Notetags
 * - Adjusts the offset of HP Gauges and State Icons above the heads of actors
 *   and enemies.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * 
 * ---
 *
 * === Animation-Related Notetags ===
 *
 * The following notetags allow you to set animations to play at certain
 * instances and/or conditions.
 *
 * ---
 *
 * <Slip Animation: x>
 *
 * - Requires VisuMZ_0_CoreEngine!
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - During the phase at which the user regenerates HP, MP, or TP, this
 *   animation will play as long as the user is alive and visible.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * <Cast Animation: x>
 *
 * - Used for: Skill Notetags
 * - Plays a battle animation at the start of the skill.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * <Attack Animation: x>
 *
 * - Used for: Enemy Notetags
 * - Gives an enemy an attack animation to play for its basic attack.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * === Battleback-Related Notetags ===
 *
 * You can apply these notetags to have some control over the battlebacks that
 * appear in different regions of the map for random or touch encounters.
 *
 * ---
 *
 * <Region x Battleback1: filename>
 * <Region x Battleback2: filename>
 * 
 * - Used for: Map Notetags
 * - If the player starts a battle while standing on 'x' region, then the
 *   'filename' battleback will be used.
 * - Replace 'x' with a number representing the region ID you wish to use.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Castle1.png' will be only inserted
 *   as 'Castle1' without the '.png' at the end.
 * - *NOTE: This will override any specified battleback settings.
 *
 * ---
 *
 * === Battle Command-Related Notetags ===
 *
 * You can use notetags to change how the battle commands of playable
 * characters appear in battle as well as whether or not they can be used.
 *
 * ---
 *
 * <Seal Attack>
 * <Seal Guard>
 * <Seal Item>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Prevents specific battle commands from being able to be used.
 *
 * ---
 *
 * <Battle Commands>
 *  Attack
 *  Skills
 *  SType: x
 *  SType: name
 *  All Skills
 *  Skill: x
 *  Skill: name
 *  Guard
 *  Item
 *  Party
 *  Escape
 *  Auto Battle
 *  Combat Log
 * </Battle Commands>
 *
 * - Used for: Class Notetags
 * - Changes which commands appear in the Actor Command Window in battle.
 *   If this notetag is not used, then the default commands determined in
 *   Plugin Parameters => Actor Command Window => Command List will be used.
 * - Add/remove/modify entries as needed.
 *
 * - Attack 
 *   - Adds the basic attack command.
 * 
 * - Skills
 *   - Displays all the skill types available to the actor.
 * 
 * - SType: x
 * - Stype: name
 *   - Adds in a specific skill type.
 *   - Replace 'x' with the ID of the skill type.
 *   - Replace 'name' with the name of the skill type (without text codes).
 *
 * - All Skills
 *   - Adds all usable battle skills as individual actions.
 * 
 * - Skill: x
 * - Skill: name
 *   - Adds in a specific skill as a usable action.
 *   - Replace 'x' with the ID of the skill.
 *   - Replace 'name' with the name of the skill.
 * 
 * - Guard
 *   - Adds the basic guard command.
 * 
 * - Item
 *   - Adds the basic item command.
 *
 * - Party
 *   - Requires VisuMZ_2_PartySystem.
 *   - Allows this actor to switch out with a different party member.
 * 
 * - Escape
 *   - Adds the escape command.
 * 
 * - Auto Battle
 *   - Adds the auto battle command.
 *
 * Example:
 *
 * <Battle Commands>
 *  Attack
 *  Skill: Heal
 *  Skills
 *  Guard
 *  Item
 *  Escape
 * </Battle Commands>
 *
 * ---
 *
 * <Command Text: x>
 *
 * - Used for: Skill Notetags
 * - When a skill is used in a <Battle Commands> notetag set, you can change
 *   the skill name text that appears to something else.
 * - Replace 'x' with the skill's name you want to shown in the Actor Battle
 *   Command window.
 * - Recommended Usage: Shorten skill names that are otherwise too big to fit
 *   inside of the Actor Battle Command window.
 *
 * ---
 *
 * <Command Icon: x>
 *
 * - Used for: Skill Notetags
 * - When a skill is used in a <Battle Commands> notetag set, you can change
 *   the skill icon that appears to something else.
 * - Replace 'x' with the ID of icon you want shown in the Actor Battle Command
 *   window to represent the skill.
 *
 * ---
 * 
 * <Command Show Switch: x>
 * 
 * <Command Show All Switches: x,x,x>
 * <Command Show Any Switches: x,x,x>
 * 
 * - Used for: Skill Notetags
 * - Determines if a battle command is visible or not through switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all
 *   switches are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 * - This can be applied to Attack and Guard commands, too.
 * 
 * ---
 * 
 * <Command Hide Switch: x>
 * 
 * <Command Hide All Switches: x,x,x>
 * <Command Hide Any Switches: x,x,x>
 * 
 * - Used for: Skill Notetags
 * - Determines if a battle command is visible or not through switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, item will be shown until all
 *   switches are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 * - This can be applied to Attack and Guard commands, too.
 * 
 * ---
 * 
 * <Battle Portrait: filename>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" Battle Layout.
 * - Sets the battle portrait image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 * - This will override any menu images used for battle only.
 * 
 * ---
 * 
 * <Battle Portrait Offset: +x, +y>
 * <Battle Portrait Offset: -x, -y>
 * 
 * <Battle Portrait Offset X: +x>
 * <Battle Portrait Offset X: -x>
 * 
 * <Battle Portrait Offset Y: +y>
 * <Battle Portrait Offset Y: -y>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" and "Border" Battle Layouts.
 * - Offsets the X and Y coordinates for the battle portrait.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * 
 * ---
 * 
 * === JavaScript Notetag: Battle Command-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if skill-based battle commands are visible or hidden.
 * 
 * ---
 * 
 * <JS Command Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Command Visible>
 * 
 * - Used for: Skill Notetags
 * - The 'visible' variable is the final returned variable to determine the
 *   skill's visibility in the Battle Command Window.
 * - Replace 'code' with JavaScript code to determine the skill's visibility in
 *   the Battle Command Window.
 * - The 'user' variable represents the user who will perform the skill.
 * - The 'skill' variable represents the skill to be used.
 * 
 * ---
 *
 * === Targeting-Related Notetags ===
 *
 * The following notetags are related to the targeting aspect of skills and
 * items and may adjust the scope of how certain skills/items work.
 *
 * ---
 *
 * <Always Hit>
 *
 * <Always Hit Rate: x%>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the action to always hit or to always have a hit rate of exactly
 *   the marked x%.
 * - Replace 'x' with a number value representing the hit success percentage.
 *
 * ---
 *
 * <Repeat Hits: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the number of hits the action will produce.
 * - Replace 'x' with a number value representing the number of hits to incur.
 *
 * ---
 *
 * <Target: x Random Any>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets can be both actors and enemies.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: x Random Enemies>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets are only enemies.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: x Random Allies>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets are only actors.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: All Allies But User>
 *
 * - Used for: Skill, Item Notetags
 * - Targets all allies with the exception of the user.
 *
 * ---
 *
 * === JavaScript Notetag: Targeting-Related ===
 *
 * ---
 * 
 * <JS Targets>
 *  code
 *  code
 *  targets = [code];
 * </JS Targets>
 *
 * - Used for: Skill, Item Notetags
 * - The 'targets' variable is an array that is returned to be used as a
 *   container for all the valid action targets.
 * - Replace 'code' with JavaScript code to determine valid targets.
 *
 * ---
 *
 * === Damage-Related Notetags ===
 *
 * ---
 *
 * <Damage Style: name>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'name' with a Damage Style name to change the way calculations are
 *   made using the damage formula input box.
 * - Names can be found in Plugin Parameters => Damage Settings => Style List
 *
 * ---
 *
 * <Armor Reduction: x>
 * <Armor Reduction: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   reduction properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor reduction properties
 *   when calculating one's own armor.
 * - This applies to physical attacks.
 * - Use the 'x' notetag variant to determine a flat reduction value.
 * - Use the 'x%' notetag variant to determine a percentile reduction value.
 *
 * ---
 *
 * <Armor Penetration: x>
 * <Armor Penetration: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   penetration properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor penetration
 *   properties when calculating a target's armor.
 * - This applies to physical attacks.
 * - Use the 'x' notetag variant to determine a flat penetration value.
 * - Use the 'x%' notetag variant to determine a percentile penetration value.
 *
 * ---
 *
 * <Magic Reduction: x>
 * <Magic Reduction: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   reduction properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor reduction properties
 *   when calculating one's own armor.
 * - This applies to magical attacks.
 * - Use the 'x' notetag variant to determine a flat reduction value.
 * - Use the 'x%' notetag variant to determine a percentile reduction value.
 *
 * ---
 *
 * <Magic Penetration: x>
 * <Magic Penetration: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   penetration properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor penetration
 *   properties when calculating a target's armor.
 * - This applies to magical attacks.
 * - Use the 'x' notetag variant to determine a flat penetration value.
 * - Use the 'x%' notetag variant to determine a percentile penetration value.
 *
 * ---
 *
 * <Bypass Damage Cap>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will cause the action to never have
 *   its damage capped.
 * - If used on trait objects, this will cause the affected unit to never have
 *   its damage capped.
 *
 * ---
 *
 * <Damage Cap: x>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will declare the hard damage cap to
 *   be the 'x' value.
 * - If used on trait objects, this will raise the affect unit's hard damage
 *   cap to 'x' value. If another trait object has a higher value, use that
 *   value instead.
 *
 * ---
 *
 * <Bypass Soft Damage Cap>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will cause the action to never have
 *   its damage scaled downward to the soft cap.
 * - If used on trait objects, this will cause the affected unit to never have
 *   its damage scaled downward to the soft cap.
 *
 * ---
 *
 * <Soft Damage Cap: +x%>
 * <Soft Damage Cap: -x%>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will increase/decrease the action's
 *   soft cap by x% where 'x' is a percentage value representing the increment
 *   changed by the hard cap value.
 * - If used on trait objects, this will raise the affect unit's soft damage
 *   limit by x% where 'x' is a percentage value representing the increment
 *   changed by the hard cap value.
 *
 * ---
 *
 * <Unblockable>
 *
 * - Used for: Skill, Item Notetags
 * - Using "Guard" against this skill will not reduce any damage.
 *
 * ---
 *
 * === Critical-Related Notetags ===
 *
 * The following notetags affect skill and item critical hit rates and the
 * critical damage multiplier.
 *
 * ---
 *
 * <Always Critical>
 *
 * - Used for: Skill, Item Notetags
 * - This skill/item will always land a critical hit regardless of the
 *   user's CRI parameter value.
 *
 * ---
 *
 * <Set Critical Rate: x%>
 *
 * - Used for: Skill, Item Notetags
 * - This skill/item will always have a x% change to land a critical hit
 *   regardless of user's CRI parameter value.
 * - Replace 'x' with a percerntage value representing the success rate.
 *
 * ---
 *
 * <Modify Critical Rate: x%>
 * <Modify Critical Rate: +x%>
 * <Modify Critical Rate: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - Modifies the user's CRI parameter calculation for this skill/item.
 * - The 'x%' notetag variant will multiply the user's CRI parameter value
 *   for this skill/item.
 * - The '+x%' and '-x%' notetag variants will incremenetally increase/decrease
 *   the user's CRI parameter value for this skill/item.
 *
 * ---
 *
 * <Modify Critical Multiplier: x%>
 * <Modify Critical Multiplier: +x%>
 * <Modify Critical Multiplier: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - These notetags determine the damage multiplier when a critical hit lands.
 * - The 'x%' notetag variant multiply the multiplier to that exact percentage.
 * - The '+x%' and '-x%' notetag variants will change the multiplier with an
 *   incremenetal rate for this skill/item.
 *
 * ---
 *
 * <Modify Critical Bonus Damage: x%>
 * <Modify Critical Bonus Damage: +x%>
 * <Modify Critical Bonus Damage: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - These notetags determine the bonus damage added when a critical hit lands.
 * - The 'x%' notetag variant multiply the damage to that exact percentage.
 * - The '+x%' and '-x%' notetag variants will change the bonus damage with an
 *   incremenetal rate for this skill/item.
 *
 * ---
 *
 * === JavaScript Notetags: Critical-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine how critical hit-related aspects are calculated.
 *
 * ---
 *
 * <JS Critical Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Critical Rate>
 *
 * - Used for: Skill, Item Notetags
 * - The 'rate' variable is the final returned amount to determine the
 *   critical hit success rate.
 * - Replace 'code' with JavaScript code to determine the final 'rate' to be
 *   returned as the critical hit success rate.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Critical Damage>
 *  code
 *  code
 *  multiplier = code;
 *  bonusDamage = code;
 * </JS Critical Damage>
 *
 * - Used for: Skill, Item Notetags
 * - The 'multiplier' variable is returned later and used as the damage
 *   multiplier used to amplify the critical damage amount.
 * - The 'bonusDamage' variable is returned later and used as extra added
 *   damage for the critical damage amount.
 * - Replace 'code' with JavaScript code to determine how the 'multiplier' and
 *   'bonusDamage' variables are calculated.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * === Action Sequence-Related Notetags ===
 *
 * Action Sequences allow you full control over how a skill and/or item plays
 * through its course. These notetags give you control over various aspects of
 * those Action Sequences. More information is found in the Action Sequences
 * help section.
 *
 * ---
 *
 * <Custom Action Sequence>
 *
 * - Used for: Skill, Item Notetags
 * - Removes all automated Action Sequence parts from the skill.
 * - Everything Action Sequence-related will be done by Common Events.
 * - Insert Common Event(s) into the skill/item's effects list to make use of
 *   the Custom Action Sequences.
 * - This will prevent common events from loading in the Item Scene and Skill
 *   Scene when used outside of battle.
 *
 * ---
 * 
 * <Auto Action Sequence>
 * 
 * - Used for: Skill, Item Notetags
 * - If the Action Sequence Plugin Parameter "Auto Notetag" is enabled, this
 *   plugin will prevent custom action sequences from happening for the skill
 *   or item, and instead, use an Automatic Action Sequence instead.
 * - Ignore this if you have "Auto Notetag" disabled or set to false.
 * 
 * ---
 * 
 * <Common Event: name>
 *
 * - Used for: Skill, Item Notetags
 * - Battle only: calls forth a Common Event of a matching name.
 * - Replace 'name' with the name of a Common Event to call from when this
 *   skill/item is used in battle.
 *   - Remove any \I[x] in the name.
 * - Insert multiple notetags to call multiple Common Events in succession.
 * - This will occur after any Common Event Trait Effects for the skill/item's
 *   database entry.
 * - This is primarily used for users who are reorganizing around their Common
 *   Events and would still like to have their skills/items perform the correct
 *   Action Sequences in case the ID's are different.
 * 
 * ---
 *
 * <Display Icon: x>
 * <Display Text: string>
 *
 * - Used for: Skill, Item Notetags
 * - When displaying the skill/item name in the Action Sequence, determine the
 *   icon and/or text displayed.
 * - Replace 'x' with a number value representing the icon ID to be displayed.
 * - Replace 'string' with a text value representing the displayed name.
 *
 * ---
 *
 * === Animated Sideview Battler-Related Notetags ===
 *
 * Enemies can use Animated Sideview Actor graphics thanks to this plugin.
 * These notetags give you control over that aspect. Some of these also affect
 * actors in addition to enemies.
 *
 * ---
 *
 * <Sideview Battler: filename>
 *
 * <Sideview Battlers>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </Sideview Battlers>
 *
 * - Used for: Enemy Notetags
 * - Replaces the enemy's battler graphic with an animated Sideview Actor
 *   graphic found in the img/sv_actors/ folder.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Actor1_1.png' will be only inserted
 *   as 'Actor1_1' without the '.png' at the end.
 * - If the multiple notetag vaiant is used, then a random filename is selected
 *   from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'filename'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'filename' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Battlers>
 *  Actor1_1: 25
 *  Actor1_3: 10
 *  Actor1_5
 *  Actor1_7
 * </Sideview Battlers>
 *
 * ---
 *
 * <Sideview Anchor: x, y>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets the sprite anchor positions for the sideview sprite.
 * - Replace 'x' and 'y' with numbers depicting where the anchors should be for
 *   the sideview sprite.
 * - By default, the x and y anchors are 0.5 and 1.0.
 *
 * ---
 * 
 * <Sideview Home Offset: +x, +y>
 * <Sideview Home Offset: -x, -y>
 * 
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Offsets the sideview actor sprite's home position by +/-x, +/-y.
 * - Replace 'x' and 'y' with numbers depicting how much to offset each of the
 *   coordinates by. For '0' values, use +0 or -0.
 * - This notetag will not work if you remove it from the JavaScript code in
 *   Plugin Parameters > Actor > JS:  Home Position
 * 
 * ---
 * 
 * <Sideview Weapon Offset: +x, +y>
 * <Sideview Weapon Offset: -x, -y>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy State Notetags
 * - Offsets the sideview weapon sprite's position by +/-x, +/-y.
 * - Replace 'x' and 'y' with numbers depicting how much to offset each of the
 *   coordinates by. For '0' values, use +0 or -0.
 * 
 * ---
 *
 * <Sideview Show Shadow>
 * <Sideview Hide Shadow>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets it so the sideview battler's shadow will be visible or hidden.
 *
 * ---
 *
 * <Sideview Collapse>
 * <Sideview No Collapse>
 *
 * - Used for: Enemy Notetags
 * - Either shows the collapse graphic or does not show the collapse graphic.
 * - Collapse graphic means the enemy will 'fade away' once it's defeated.
 * - No collapse graphic means the enemy's corpse will remain on the screen.
 *
 * ---
 *
 * <Sideview Idle Motion: name>
 *
 * <Sideview Idle Motions>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Sideview Idle Motions>
 *
 * - Used for: Enemy Notetags
 * - Changes the default idle motion for the enemy.
 * - Replace 'name' with any of the following motion names:
 *   - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
 *     'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
 *     'abnormal', 'sleep', 'dead'
 * - If the multiple notetag vaiant is used, then a random motion name is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Idle Motions>
 *  walk: 25
 *  wait: 50
 *  guard
 *  victory
 *  abnormal
 * </Sideview Idle Motions>
 *
 * ---
 *
 * <Sideview Size: width, height>
 *
 * - Used for: Enemy Notetags
 * - When using a sideview battler, its width and height will default to the
 *   setting made in Plugin Parameters => Enemy Settings => Size: Width/Height.
 * - This notetag lets you change that value to something else.
 * - Replace 'width' and 'height' with numbers representing how many pixels
 *   wide/tall the sprite will be treated as.
 *
 * ---
 *
 * <Sideview Weapon: weapontype>
 *
 * <Sideview Weapons>
 *  weapontype: weight
 *  weapontype: weight
 *  weapontype: weight
 * </Sideview Weapons>
 *
 * - Used for: Enemy Notetags
 * - Give your sideview enemies weapons to use.
 * - Replace 'weapontype' with the name of the weapon type found under the
 *   Database => Types => Weapon Types list (without text codes).
 * - If the multiple notetag vaiant is used, then a random weapon type is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the weapontype
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'weapontype' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Weapons>
 *  Dagger: 25
 *  Sword: 25
 *  Axe
 * </Sideview Weapons>
 *
 * ---
 *
 * <traitname Sideview Battler: filename>
 *
 * <traitname Sideview Battlers>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </traitname Sideview Battlers>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have a unique appearance.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Actor1_1.png' will be only inserted
 *   as 'Actor1_1' without the '.png' at the end.
 * - If the multiple notetag vaiant is used, then a random filename is selected
 *   from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'filename'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'filename' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Male Sideview Battlers>
 *  Actor1_1: 25
 *  Actor1_3: 10
 *  Actor1_5
 *  Actor1_7
 * </Male Sideview Battlers>
 *
 * <Female Sideview Battlers>
 *  Actor1_2: 25
 *  Actor1_4: 10
 *  Actor1_6
 *  Actor1_8
 * </Female Sideview Battlers>
 *
 * ---
 *
 * <traitname Sideview Idle Motion: name>
 *
 * <traitname Sideview Idle Motions>
 *  name: weight
 *  name: weight
 *  name: weight
 * </traitname Sideview Idle Motions>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have unique idle motions.
 * - Replace 'name' with any of the following motion names:
 *   - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
 *     'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
 *     'abnormal', 'sleep', 'dead'
 * - If the multiple notetag vaiant is used, then a random motion name is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Jolly Sideview Idle Motions>
 *  wait: 25
 *  victory: 10
 *  walk
 * </Jolly Sideview Idle Motions>
 *
 * <Serious Sideview Idle Motions>
 *  walk: 25
 *  guard: 10
 *  wait
 * </Jolly Sideview Idle Motions>
 *
 * ---
 *
 * <traitname Sideview Weapon: weapontype>
 *
 * <traitname Sideview Weapons>
 *  weapontype: weight
 *  weapontype: weight
 *  weapontype: weight
 * </traitname Sideview Weapons>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have unique weapons.
 * - Replace 'weapontype' with the name of the weapon type found under the
 *   Database => Types => Weapon Types list (without text codes).
 * - If the multiple notetag vaiant is used, then a random weapon type is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the weapontype
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'weapontype' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Male Sideview Weapons>
 *  Dagger: 25
 *  Sword: 25
 *  Axe
 * </Male Sideview Weapons>
 *
 * <Female Sideview Weapons>
 *  Dagger: 25
 *  Spear: 25
 *  Cane
 * </Female Sideview Weapons>
 *
 * ---
 *
 * === Enemy-Related Notetags ===
 *
 * ---
 *
 * <Battler Sprite Cannot Move>
 *
 * - Used for: Enemy Notetags
 * - Prevents the enemy from being able to move, jump, and/or float due to
 *   Action Sequences. Useful for rooted enemies.
 *
 * ---
 * 
 * <Battler Sprite Grounded>
 *
 * - Used for: Enemy Notetags
 * - Prevents the enemy from being able to jumping and/or floating due to
 *   Action Sequences but still able to move. Useful for rooted enemies.
 * 
 * ---
 *
 * <Swap Enemies>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Swap Enemies>
 *
 * - Used for: Enemy Notetags
 * - Causes this enemy database object to function as a randomizer for any of
 *   the listed enemies inside the notetag. When the enemy is loaded into the
 *   battle scene, the enemy is immediately replaced with one of the enemies
 *   listed. The randomization is based off the 'weight' given to each of the
 *   enemy 'names'.
 * - Replace 'name' with the database enemy of the enemy you wish to replace
 *   the enemy with.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Swap Enemies>
 *  Bat: 50
 *  Slime: 25
 *  Orc
 *  Minotaur
 * </Swap Enemies>
 *
 * ---
 *
 * === JavaScript Notetags: Mechanics-Related ===
 *
 * These JavaScript notetags allow you to run code at specific instances during
 * battle provided that the unit has that code associated with them in a trait
 * object (actor, class, weapon, armor, enemy, or state). How you use these is
 * entirely up to you and will depend on your ability to understand the code
 * used and driven for each case.
 *
 * ---
 *
 * <JS Pre-Start Battle>
 *  code
 *  code
 *  code
 * </JS Pre-Start Battle>
 *
 * <JS Post-Start Battle>
 *  code
 *  code
 *  code
 * </JS Post-Start Battle>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of battle aimed at the function:
 *   BattleManager.startBattle()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Start Turn>
 *  code
 *  code
 *  code
 * </JS Pre-Start Turn>
 *
 * <JS Post-Start Turn>
 *  code
 *  code
 *  code
 * </JS Post-Start Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of a turn aimed at the function:
 *   BattleManager.startTurn()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Start Action>
 *  code
 *  code
 *  code
 * </JS Pre-Start Action>
 *
 * <JS Post-Start Action>
 *  code
 *  code
 *  code
 * </JS Post-Start Action>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of an action aimed at the function:
 *   BattleManager.startAction()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Apply>
 *  code
 *  code
 *  code
 * </JS Pre-Apply>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code at the start of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Pre' runs before the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Apply as User>
 *  code
 *  code
 *  code
 * </JS Pre-Apply as User>
 *
 * <JS Pre-Apply as Target>
 *  code
 *  code
 *  code
 * </JS Pre-Apply as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Pre' runs before the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Damage>
 *  code
 *  code
 *  code
 * </JS Pre-Damage>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code before damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Pre' runs before the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Damage as User>
 *  code
 *  code
 *  code
 * </JS Pre-Damage as User>
 *
 * <JS Pre-Damage as Target>
 *  code
 *  code
 *  code
 * </JS Pre-Damage as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code before damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Pre' runs before the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Damage>
 *  code
 *  code
 *  code
 * </JS Post-Damage>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code after damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Damage as User>
 *  code
 *  code
 *  code
 * </JS Post-Damage as User>
 *
 * <JS Post-Damage as Target>
 *  code
 *  code
 *  code
 * </JS Post-Damage as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code after damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Apply>
 *  code
 *  code
 *  code
 * </JS Post-Apply>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code at the end of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Apply as User>
 *  code
 *  code
 *  code
 * </JS Post-Apply as User>
 *
 * <JS Post-Apply as Target>
 *  code
 *  code
 *  code
 * </JS Post-Apply as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 *
 * ---
 *
 * <JS Pre-End Action>
 *  code
 *  code
 *  code
 * </JS Pre-End Action>
 *
 * <JS Post-End Action>
 *  code
 *  code
 *  code
 * </JS Post-End Action>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of an action aimed at the function:
 *   BattleManager.endAction()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-End Turn>
 *  code
 *  code
 *  code
 * </JS Pre-End Turn>
 *
 * <JS Post-End Turn>
 *  code
 *  code
 *  code
 * </JS Post-End Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of a turn aimed at the function:
 *   Game_Battler.prototype.onTurnEnd()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Regenerate>
 *  code
 *  code
 *  code
 * </JS Pre-Regenerate>
 *
 * <JS Post-Regenerate>
 *  code
 *  code
 *  code
 * </JS Post-Regenerate>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a unit regenerates HP/MP aimed at the function:
 *   Game_Battler.prototype.regenerateAll()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Battle Victory>
 *  code
 *  code
 *  code
 * </JS Battle Victory>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a battle is won aimed at the function:
 *   BattleManager.processVictory()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Escape Success>
 *  code
 *  code
 *  code
 * </JS Escape Success>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when escaping succeeds aimed at the function:
 *   BattleManager.onEscapeSuccess()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Escape Failure>
 *  code
 *  code
 *  code
 * </JS Escape Failure>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when escaping fails aimed at the function:
 *   BattleManager.onEscapeFailure()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Battle Defeat>
 *  code
 *  code
 *  code
 * </JS Battle Defeat>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a battle is lost aimed at the function:
 *   BattleManager.processDefeat()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-End Battle>
 *  code
 *  code
 *  code
 * </JS Pre-End Battle>
 *
 * <JS Post-End Battle>
 *  code
 *  code
 *  code
 * </JS Post-End Battle>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when the battle is over aimed at the function:
 *   BattleManager.endBattle()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 * 
 * === Battle Layout-Related Notetags ===
 * 
 * These tags will change the battle layout for a troop regardless of how the
 * plugin parameters are set up normally. Insert these tags in either the
 * noteboxes of maps or the names of troops for them to take effect. If both
 * are present for a specific battle, then priority goes to the setting found
 * in the troop name.
 * 
 * ---
 * 
 * <Layout: type>
 * <Battle Layout: type>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle layout style used for this specific map or battle.
 * - Replace 'type' with 'default', 'list', 'xp', 'portrait', or 'border'.
 * 
 * ---
 *
 * ============================================================================
 * Action Sequence - Plugin Commands
 * ============================================================================
 *
 * Skills and items, when used in battle, have a pre-determined series of
 * actions to display to the player as a means of representing what's going on
 * with the action. For some game devs, this may not be enough and they would
 * like to get more involved with the actions themselves.
 *
 * Action Sequences, added through this plugin, enable this. To give a skill or
 * item a Custom Action Sequence, a couple of steps must be followed:
 *
 * ---
 *
 * 1. Insert the <Custom Action Sequence> notetag into the skill or item's
 *    notebox (or else this would not work as intended).
 * 2. Give that skill/item a Common Event through the Effects box. The selected
 *    Common Event will contain all the Action Sequence data.
 * 3. Create the Common Event with Action Sequence Plugin Commands and/or event
 *    commands to make the skill/item do what you want it to do.
 *
 * ---
 *
 * The Plugin Commands added through the Battle Core plugin focus entirely on
 * Action Sequences. However, despite the fact that they're made for skills and
 * items, some of these Action Sequence Plugin Commands can still be used for
 * regular Troop events and Common Events.
 *
 * ---
 *
 * === Action Sequence - Action Sets ===
 *
 * Action Sequence Action Sets are groups of commonly used
 * Action Sequence Commands put together for more efficient usage.
 *
 * ---
 *
 * ACSET: Setup Action Set
 * - The generic start to most actions.
 *
 *   Display Action:
 *   Immortal: On:
 *   Battle Step:
 *   Wait For Movement:
 *   Cast Animation:
 *   Wait For Animation:
 *   - Use this part of the action sequence?
 *
 * ---
 *
 * ACSET: All Targets Action Set
 * - Affects all targets simultaneously performing the following.
 *
 *   Dual/Multi Wield?
 *   - Add times struck based on weapon quantity equipped?
 * 
 *   Perform Action:
 *   Wait Count:
 *   Action Animation:
 *   Wait For Animation:
 *   Action Effect:
 *   Immortal: Off:
 *   - Use this part of the action sequence?
 *   - Insert values for the Wait Count(s).
 *
 * ---
 *
 * ACSET: Each Target Action Set
 * - Goes through each target one by one to perform the following.
 *
 *   Dual/Multi Wield?
 *   - Add times struck based on weapon quantity equipped?
 *
 *   Perform Action:
 *   Wait Count:
 *   Action Animation:
 *   Wait Count:
 *   Action Effect:
 *   Immortal: Off:
 *   - Use this part of the action sequence?
 *   - Insert values for the Wait Count(s).
 *
 * ---
 *
 * ACSET: Finish Action
 * - The generic ending to most actions.
 *
 *   Wait For New Line:
 *   Wait For Effects:
 *   Clear Battle Log:
 *   Home Reset:
 *   Wait For Movement:
 *   - Use this part of the action sequence?
 *
 * ---
 * 
 * === Action Sequences - Angle ===
 * 
 * These action sequences allow you to have control over the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * ---
 *
 * ANGLE: Change Angle
 * - Changes the camera angle.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Angle:
 *   - Change the camera angle to this many degrees.
 *
 *   Duration:
 *   - Duration in frames to change camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Reset Angle
 * - Reset any angle settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Wait For Angle
 * - Waits for angle changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Animations ===
 *
 * These Action Sequences are related to the 'Animations' that can be found in
 * the Animations tab of the Database.
 *
 * ---
 *
 * ANIM: Action Animation
 * - Plays the animation associated with the action.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Attack Animation
 * - Plays the animation associated with the user's weapon.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Attack Animation 2+
 * - Plays the animation associated with the user's other weapons.
 * - Plays nothing if there is no other weapon equipped.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 * 
 *   Slot:
 *   - Which weapon slot to get this data from?
 *   - Main-hand weapon is weapon slot 1.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Cast Animation
 * - Plays the cast animation associated with the action.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Change Battle Portrait
 * - Changes the battle portrait of the actor (if it's an actor).
 * - Can be used outside of battle/action sequences.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *   - Valid units can only be actors.
 *
 *   Filename:
 *   - Select the file to change the actor's portrait to.
 *
 * ---
 *
 * ANIM: Show Animation
 * - Plays the a specific animation on unit(s).
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Animation ID:
 *   - Select which animation to play on unit(s).
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Wait For Animation
 * - Causes the interpreter to wait for any animation(s) to finish.
 *
 * ---
 *
 * === Action Sequences - Battle Log ===
 *
 * These Action Sequences are related to the Battle Log Window, the window
 * found at the top of the battle screen.
 *
 * ---
 *
 * BTLOG: Add Text
 * - Adds a new line of text into the Battle Log.
 *
 *   Text:
 *   - Add this text into the Battle Log.
 *   - Text codes allowed.
 * 
 *   Copy to Combat Log?:
 *   - Copies text to the Combat Log.
 *   - Requires VisuMZ_4_CombatLog
 * 
 *     Combat Log Icon:
 *     - What icon would you like to bind to this entry?
 *     - Requires VisuMZ_4_CombatLog
 *
 * ---
 *
 * BTLOG: Clear Battle Log
 * - Clears all the text in the Battle Log.
 *
 * ---
 *
 * BTLOG: Display Action
 * - plays the current action in the Battle Log.
 *
 * ---
 *
 * BTLOG: Pop Base Line
 * - Removes the Battle Log's last added base line and  all text up to its
 *   former location.
 *
 * ---
 *
 * BTLOG: Push Base Line
 * - Adds a new base line to where the Battle Log currently is at.
 *
 * ---
 *
 * BTLOG: Refresh Battle Log
 * - Refreshes the Battle Log.
 *
 * ---
 *
 * BTLOG: UI Show/Hide
 * - Shows or hides the Battle UI (including the Battle Log).
 *
 *   Show/Hide?:
 *   - Shows/hides the Battle UI.
 *
 * ---
 *
 * BTLOG: Wait For Battle Log
 * - Causes the interpreter to wait for the Battle Log to finish.
 *
 * ---
 *
 * BTLOG: Wait For New Line
 * - Causes the interpreter to wait for a new line in the Battle Log.
 *
 * ---
 *
 * === Action Sequences - Camera ===
 *
 * These Action Sequences are battle camera-related.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * CAMERA: Clamp ON/OFF
 * - Turns battle camera clamping on/off.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Setting:
 *   - Turns camera clamping on/off.
 *
 * ---
 *
 * CAMERA: Focus Point
 * - Focus the battle camera on a certain point in the screen.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   X Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Focus Target(s)
 * - Focus the battle camera on certain battler target(s).
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Targets:
 *   - Select unit(s) to focus the battle camera on.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Offset
 * - Offset the battle camera from the focus target.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Offset X:
 *   - How much to offset the camera X by.
 *   - Negative: left. Positive: right.
 *
 *   Offset Y:
 *   - How much to offset the camera Y by.
 *   - Negative: up. Positive: down.
 *
 *   Duration:
 *   - Duration in frames for offset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Reset
 * - Reset the battle camera settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Reset Focus?:
 *   - Reset the focus point?
 *
 *   Reset Offset?:
 *   - Reset the camera offset?
 *
 *   Duration:
 *   - Duration in frames for reset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Wait For Camera
 * - Waits for camera changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Dragonbones ===
 *
 * These Action Sequences are Dragonbones-related.
 * Requires VisuMZ_2_DragonbonesUnion!
 *
 * ---
 *
 * DB: Dragonbones Animation
 * - Causes the unit(s) to play a Dragonbones motion animation.
 * - Requires VisuMZ_2_DragonbonesUnion!
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion animation.
 *
 *   Motion Animation:
 *   - What is the name of the Dragonbones motion animation you wish to play?
 *
 * ---
 *
 * DB: Dragonbones Time Scale
 * - Causes the unit(s) to change their Dragonbones time scale.
 * - Requires VisuMZ_2_DragonbonesUnion!
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion animation.
 *
 *   Time Scale:
 *   - Change the value of the Dragonbones time scale to this.
 *
 * ---
 *
 * === Action Sequences - Elements ===
 *
 * These Action Sequences can change up the element(s) used for the action's
 * damage calculation midway through an action.
 *
 * They also require the VisuMZ_1_ElementStatusCore plugin to be present in
 * order for them to work.
 *
 * ---
 *
 * ELE: Add Elements
 * - Adds element(s) to be used when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 *   Elements:
 *   - Select which element ID to add onto the action.
 *   - Insert multiple element ID's to add multiple at once.
 *
 * ---
 *
 * ELE: Clear Element Changes
 * - Clears all element changes made through Action Sequences.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 *
 * ELE: Force Elements
 * - Forces only specific element(s) when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 *   Elements:
 *   - Select which element ID to force in the action.
 *   - Insert multiple element ID's to force multiple at once.
 *
 * ---
 *
 * ELE: Null Element
 * - Forces no element to be used when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 * 
 * === Action Sequences - Horror Effects ===
 * 
 * These Action Sequences are Horror Effects-related.
 * Requires VisuMZ_2_HorrorEffects!
 * 
 * ---
 *
 * HORROR: Clear All Filters
 * - Clear all Horror Effects filters on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove Horror Effects for.
 *
 * ---
 *
 * HORROR: Glitch Create
 * - Creates the glitch effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to create the Horror Effect for.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * HORROR: Glitch Remove
 * - Removes the glitch effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove the Horror Effect for.
 *
 * ---
 *
 * HORROR: Noise Create
 * - Creates the noise effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to create the Horror Effect for.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * HORROR: Noise Remove
 * - Removes the noise effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove the Horror Effect for.
 *
 * ---
 *
 * HORROR: TV Create
 * - Creates the TV effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to create the Horror Effect for.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * HORROR: TV Remove
 * - Removes the TV effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove the Horror Effect for.
 *
 * ---
 * 
 * === Action Sequences - Impact ===
 * 
 * These Action Sequences are related to creating impact.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * ---
 *
 * IMPACT: Color Break
 * - Breaks the colors on the screen before reassembling.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Intensity:
 *   - What is the intensity of the color break effect?
 *
 *   Duration:
 *   - What is the duration of the color break effect?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Blur Screen
 * - Creates a motion blur on the whole screen.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Angle:
 *   - Determine what angle to make the motion blur at.
 *
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 *
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Blur Target(s)
 * - Creates a motion blur on selected target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to create motion blur effects for.
 *
 *   Angle:
 *   - Determine what angle to make the motion blur at.
 *
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 *
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Trail Create
 * - Creates a motion trail effect for the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to create motion trail effects for.
 *
 *   Delay:
 *   - How many frames to delay by when creating a motion trail?
 *   - The higher the delay, the less motion trails there are.
 *
 *   Duration:
 *   - How many frames should the motion trail last?
 *   - What do you want to be its duration?
 *
 *   Hue:
 *   - What do you want to be the hue for the motion trail?
 *
 *   Starting Opacity:
 *   - What starting opacity value do you want for the motion trail?
 *   - Opacity values decrease over time.
 *
 *   Tone:
 *   - What tone do you want for the motion trail?
 *   - Format: [Red, Green, Blue, Gray]
 *
 * ---
 *
 * IMPACT: Motion Trail Remove
 * - Removes the motion trail effect from the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to clear motion trail effects for.
 *
 * ---
 *
 * IMPACT: Shockwave at Point
 * - Creates a shockwave at the designated coordinates.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Point: X:
 *   Point: Y:
 *   - What x/y coordinate do you want to create a shockwave at?
 *   - You can use JavaScript code.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Shockwave from Each Target(s)
 * - Creates a shockwave at each of the target(s) location(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a shockwave from.
 *
 *   Target Location:
 *   - Select which part target group to start a shockwave from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the shockwave X/Y point by.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Shockwave from Target(s) Center
 * - Creates a shockwave from the center of the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a shockwave from.
 *
 *   Target Location:
 *   - Select which part target group to start a shockwave from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the shockwave X/Y point by.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Zoom Blur at Point
 * - Creates a zoom blur at the designated coordinates.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Point: X:
 *   Point: Y:
 *   - What x/y coordinate do you want to focus the zoom at?
 *   - You can use JavaScript code.
 *
 *   Zoom Strength:
 *   - What is the strength of the zoom effect?
 *   - Use a number between 0 and 1.
 *
 *   Visible Radius:
 *   - How much of a radius should be visible from the center?
 *
 *   Duration:
 *   - What is the duration of the zoom blur?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Zoom Blur at Target(s) Center
 * - Creates a zoom blur at the center of targets.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a zoom blur from.
 *
 *   Target Location:
 *   - Select which part target group to start a zoom blur from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the zoom blur X/Y point by.
 *
 *   Zoom Strength:
 *   - What is the strength of the zoom effect?
 *   - Use a number between 0 and 1.
 *
 *   Visible Radius:
 *   - How much of a radius should be visible from the center?
 *
 *   Duration:
 *   - What is the duration of the zoom blur?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * === Action Sequences - Mechanics ===
 *
 * These Action Sequences are related to various mechanics related to the
 * battle system.
 *
 * ---
 *
 * MECH: Action Effect
 * - Causes the unit(s) to take damage/healing from action and incurs any
 *   changes made such as buffs and states.
 *
 *   Targets:
 *   - Select unit(s) to receive the current action's effects.
 *
 * ---
 *
 * MECH: Add Buff/Debuff
 * - Adds buff(s)/debuff(s) to unit(s). 
 * - Determine which parameters are affected and their durations.
 *
 *   Targets:
 *   - Select unit(s) to receive the buff(s) and/or debuff(s).
 *
 *   Buff Parameters:
 *   - Select which parameter(s) to buff.
 *   - Insert a parameter multiple times to raise its stacks.
 *
 *   Debuff Parameters:
 *   - Select which parameter(s) to debuff.
 *   - Insert a parameter multiple times to raise its stacks.
 *
 *   Turns:
 *   - Number of turns to set the parameter(s) buffs to.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * MECH: Add State
 * - Adds state(s) to unit(s).
 *
 *   Targets:
 *   - Select unit(s) to receive the buff(s).
 *
 *   States:
 *   - Select which state ID(s) to add to unit(s).
 *   - Insert multiple state ID's to add multiple at once.
 *
 * ---
 * 
 * MECH: Analyze Weakness
 * - Reveal elemental weakness(es) from target(s).
 * - Requires VisuMZ_3_WeaknessDisplay!
 * 
 *   Targets:
 *   - Select unit(s) to reveal elemental weaknesses for.
 * 
 *   Reveal:
 *   - How many elemental weaknesses do you wish to reveal?
 *   - You may use JavaScript code.
 * 
 * ---
 *
 * MECH: Armor Penetration
 * - Adds an extra layer of defensive penetration/reduction.
 * - You may use JavaScript code for any of these.
 *
 *   Armor/Magic Penetration:
 *
 *     Rate:
 *     - Penetrates an extra multiplier of armor by this value.
 *
 *     Flat:
 *     - Penetrates a flat amount of armor by this value.
 *
 *   Armor/Magic Reduction:
 *
 *     Rate:
 *     - Reduces an extra multiplier of armor by this value.
 *
 *     Flat:
 *     - Reduces a flat amount of armor by this value.
 *
 * ---
 * 
 * MECH: ATB Gauge
 * - Alters the ATB/TPB Gauges.
 * - Requires VisuMZ_2_BattleSystemATB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the ATB/TPB Gauges for.
 * 
 *   Charging:
 *   
 *     Charge Rate:
 *     - Changes made to the ATB Gauge if it is currently charging.
 * 
 *   Casting:
 *   
 *     Cast Rate:
 *     - Changes made to the ATB Gauge if it is currently casting.
 *   
 *     Interrupt?:
 *     - Interrupt the ATB Gauge if it is currently casting?
 * 
 * ---
 * 
 * MECH: Boost Points Change
 * - Changes Boost Points for target(s).
 * - Requires VisuMZ_3_BoostAction!
 * 
 *   Targets:
 *   - Select unit(s) to alter the Boost Points for.
 * 
 *   Alter Boost Points By:
 *   - Alters the unit(s) Boost Points.
 *   - Positive for gaining points. Negative for losing points.
 * 
 * ---
 * 
 * MECH: Boost Store Data
 * - Stores the number of Boosts used this action inside a variable.
 * - Requires VisuMZ_3_BoostAction!
 * 
 *   Variable ID:
 *   - Which variable do you want to store the data inside?
 * 
 * ---
 * 
 * MECH: Break Shield Change
 * - Changes Break Shields for target(s) if not Break Stunned.
 * - Requires VisuMZ_4_BreakShields!
 * 
 *   Targets:
 *   - Select unit(s) to alter the Break Shields for.
 * 
 *   Alter Break Shields By:
 *   - Alters the unit(s) Break Shields.
 *   - Positive for gaining shields. Negative for losing shields.
 * 
 * ---
 * 
 * MECH: Break Shield Reset
 * - Resets Break Shields for target(s) if not Break Stunned.
 * - Requires VisuMZ_4_BreakShields!
 * 
 *   Targets:
 *   - Select unit(s) to reset the Break Shields for.
 * 
 * ---
 * 
 * MECH: BTB Brave Points
 * - Alters the target(s) Brave Points to an exact value.
 * - Requires VisuMZ_2_BattleSystemBTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the ATB/TPB Gauges for.
 * 
 *   Alter Brave Points By:
 *   - Alters the target(s) Brave Points.
 *   - Positive for gaining BP.
 *   - Negative for losing BP.
 * 
 * ---
 *
 * MECH: Collapse
 * - Causes the unit(s) to perform its collapse animation if the unit(s)
 *   has died.
 *
 *   Targets:
 *   - Select unit(s) to process a death collapse.
 *
 *   Force Death:
 *   - Force death even if the unit has not reached 0 HP?
 *   - This will remove immortality.
 *
 *   Wait For Effect?:
 *   - Wait for the collapse effect to complete before performing next command?
 *
 * ---
 * 
 * MECH: CTB Order
 * - Alters the CTB Turn Order.
 * - Requires VisuMZ_2_BattleSystemCTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the CTB Turn Order for.
 * 
 *   Change Order By:
 *   - Changes turn order for target(s) by this amount.
 *   - Positive increases wait. Negative decreases wait.
 * 
 * ---
 * 
 * MECH: CTB Speed
 * - Alters the CTB Speed.
 * - Requires VisuMZ_2_BattleSystemCTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the CTB Speed for.
 * 
 *   Charge Rate:
 *   - Changes made to the CTB Speed if it is currently charging.
 * 
 *   Cast Rate:
 *   - Changes made to the CTB Speed if it is currently casting.
 * 
 * ---
 * 
 * MECH: Custom Damage Formula
 * - Changes the current action's damage formula to custom.
 * - This will assume the MANUAL damage style.
 * 
 *   Formula:
 *   - Changes the current action's damage formula to custom.
 *   - Use 'default' to revert the damage formula.
 * 
 * ---
 *
 * MECH: Damage Popup
 * - Causes the unit(s) to display the current state of damage received
 *   or healed.
 *
 *   Targets:
 *   - Select unit(s) to prompt a damage popup.
 *
 * ---
 *
 * MECH: Dead Label Jump
 * - If the active battler is dead, jump to a specific label in the
 *   common event.
 *
 *   Jump To Label:
 *   - If the active battler is dead, jump to this specific label in the
 *     common event.
 *
 * ---
 *
 * MECH: HP, MP, TP
 * - Alters the HP, MP, and TP values for unit(s).
 * - Positive values for healing. Negative values for damage.
 *
 *   Targets:
 *   - Select unit(s) to receive the current action's effects.
 *
 *   HP, MP, TP:
 *
 *     Rate:
 *     - Changes made to the parameter based on rate.
 *     - Positive values for healing. Negative values for damage.
 *
 *     Flat:
 *     - Flat changes made to the parameter.
 *     - Positive values for healing. Negative values for damage.
 *
 *   Damage Popup?:
 *   - Display a damage popup after?
 *
 * ---
 *
 * MECH: Immortal
 * - Changes the immortal flag of targets. If immortal flag is removed and a
 *   unit would die, collapse that unit.
 *
 *   Targets:
 *   - Alter the immortal flag of these groups. If immortal flag is removed and
 *     a unit would die, collapse that unit.
 *
 *   Immortal:
 *   - Turn immortal flag for unit(s) on/off?
 *
 * ---
 *
 * MECH: Multipliers
 * - Changes the multipliers for the current action.
 * - You may use JavaScript code for any of these.
 *
 *   Critical Hit%:
 *
 *     Rate:
 *     - Affects chance to land a critical hit by this multiplier.
 *
 *     Flat:
 *     - Affects chance to land a critical hit by this flat bonus.
 *
 *   Critical Damage
 *
 *     Rate:
 *     - Affects critical damage by this multiplier.
 *
 *     Flat:
 *     - Affects critical damage by this flat bonus.
 *
 *   Damage/Healing
 *
 *     Rate:
 *     - Sets the damage/healing multiplier for current action.
 *
 *     Flat:
 *     - Sets the damage/healing bonus for current action.
 *
 *   Hit Rate
 *
 *     Rate:
 *     - Affects chance to connect attack by this multiplier.
 *
 *     Flat:
 *     - Affects chance to connect attack by this flat bonus.
 *
 * ---
 *
 * MECH: Remove Buff/Debuff
 * - Removes buff(s)/debuff(s) from unit(s). 
 * - Determine which parameters are removed.
 *
 *   Targets:
 *   - Select unit(s) to have the buff(s) and/or debuff(s) removed.
 *
 *   Buff Parameters:
 *   - Select which buffed parameter(s) to remove.
 *
 *   Debuff Parameters:
 *   - Select which debuffed parameter(s) to remove.
 *
 * ---
 *
 * MECH: Remove State
 * - Remove state(s) from unit(s).
 *
 *   Targets:
 *   - Select unit(s) to have states removed from.
 *
 *   States:
 *   - Select which state ID(s) to remove from unit(s).
 *   - Insert multiple state ID's to remove multiple at once.
 *
 * ---
 * 
 * MECH: STB Exploit Effect
 * - Utilize the STB Exploitation mechanics!
 * - Requires VisuMZ_2_BattleSystemSTB!
 * 
 *   Target(s) Exploited?:
 *   - Exploit the below targets?
 * 
 *     Targets:
 *     - Select unit(s) to become exploited.
 * 
 *     Force Exploitation:
 *     - Force the exploited status?
 * 
 *   User Exploiter?:
 *   - Allow the user to become the exploiter?
 * 
 *     Force Exploitation:
 *     - Force the exploiter status?
 * 
 * ---
 * 
 * MECH: STB Extra Action
 * - Adds an extra action for the currently active battler.
 * - Requires VisuMZ_2_BattleSystemSTB!
 * 
 *   Extra Actions:
 *   - How many extra actions should the active battler gain?
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * MECH: STB Remove Excess Actions
 * - Removes excess actions from the active battler.
 * - Requires VisuMZ_2_BattleSystemSTB!
 * 
 *   Remove Actions:
 *   - How many actions to remove from the active battler?
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * MECH: Swap Weapon
 * - Causes the unit(s) to swap their weapon for another.
 * - Requires VisuMZ_2_WeaponSwapSystem!
 * 
 *   Targets:
 *   - Select unit(s) to swap weapons for.
 * 
 *   Weapon Type ID:
 *   - Which weapon type to swap to?
 *   - This is NOT the weapon's ID.
 *   - It's the weapon TYPE.
 * 
 * ---
 * 
 * MECH: Text Popup
 * - Causes the unit(s) to display a text popup.
 * 
 *   Targets:
 *   - Select unit(s) to prompt a text popup.
 * 
 *   Text:
 *   - What text do you wish to display?
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 * 
 * ---
 * 
 * MECH: Variable Popup
 * - Causes the unit(s) to display a popup using the data stored inside
 *   a variable.
 * 
 *   Targets:
 *   - Select unit(s) to prompt a text popup.
 * 
 *   Variable:
 *   - Get data from which variable to display as a popup?
 * 
 *   Digit Grouping:
 *   - Use digit grouping to separate numbers?
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 * 
 * ---
 *
 * MECH: Wait For Effect
 * - Waits for the effects to complete before performing next command.
 *
 * ---
 *
 * === Action Sequences - Motion ===
 *
 * These Action Sequences allow you the ability to control the motions of
 * sideview sprites.
 *
 * ---
 * 
 * MOTION: Clear Freeze Frame
 * - Clears any freeze frames from the unit(s).
 * 
 *   Targets:
 *   - Select which unit(s) to clear freeze frames for.
 * 
 * ---
 * 
 * MOTION: Freeze Motion Frame
 * - Forces a freeze frame instantly at the selected motion.
 * - Automatically clears with a new motion.
 * 
 *   Targets:
 *   - Select which unit(s) to freeze motions for.
 * 
 *   Motion Type:
 *   - Freeze this motion for the unit(s).
 * 
 *   Frame Index:
 *   - Which frame do you want to freeze the motion on?
 *   - Frame index values start at 0.
 * 
 *   Show Weapon?:
 *   - If using 'attack', 'thrust', 'swing', or 'missile', display the
 *     weapon sprite?
 * 
 * ---
 *
 * MOTION: Motion Type
 * - Causes the unit(s) to play the selected motion.
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion.
 *
 *   Motion Type:
 *   - Play this motion for the unit(s).
 *
 *   Show Weapon?:
 *   - If using 'attack', 'thrust', 'swing', or 'missile', display the
 *     weapon sprite?
 *
 * ---
 *
 * MOTION: Perform Action
 * - Causes the unit(s) to play the proper motion based on the current action.
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion.
 *
 * ---
 *
 * MOTION: Refresh Motion
 * - Cancels any set motions unit(s) has to do and use their most natural
 *   motion at the moment.
 *
 *   Targets:
 *   - Select which unit(s) to refresh their motion state.
 *
 * ---
 *
 * MOTION: Wait By Motion Frame
 * - Creates a wait equal to the number of motion frames passing.
 * - Time is based on Plugin Parameters => Actors => Motion Speed.
 *
 *   Motion Frames to Wait?:
 *   - Each "frame" is equal to the value found in 
 *     Plugin Parameters => Actors => Motion Speed
 *
 * ---
 *
 * === Action Sequences - Movement ===
 *
 * These Action Sequences allow you the ability to control the sprites of
 * actors and enemies in battle.
 *
 * ---
 *
 * MOVE: Battle Step
 * - Causes the unit(s) to move forward past their home position to prepare
 *   for action.
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Face Direction
 * - Causes the unit(s) to face forward or backward.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change direction.
 *
 *   Direction:
 *   - Select which direction to face.
 *
 * ---
 *
 * MOVE: Face Point
 * - Causes the unit(s) to face a point on the screen.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change direction.
 *
 *   Point:
 *   - Select which point to face.
 *     - Home
 *     - Center
 *     - Point X, Y
 *       - Replace 'x' and 'y' with coordinates
 *
 *   Face Away From?:
 *   - Face away from the point instead?
 *
 * ---
 *
 * MOVE: Face Target(s)
 * - Causes the unit(s) to face other targets on the screen.
 * - Sideview-only!
 *
 *   Targets (facing):
 *   - Select which unit(s) to change direction.
 *
 *   Targets (destination):
 *   - Select which unit(s) for the turning unit(s) to face.
 *
 *   Face Away From?:
 *   - Face away from the unit(s) instead?
 *
 * ---
 *
 * MOVE: Float
 * - Causes the unit(s) to float above the ground.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make float.
 *
 *   Desired Height:
 *   - Vertical distance to float upward.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total float amount.
 *
 *   Float Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Float?:
 *   - Wait for floating to complete before performing next command?
 *
 * ---
 *
 * MOVE: Home Reset
 * - Causes the unit(s) to move back to their home position(s) and face back to
 *   their original direction(s).
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Jump
 * - Causes the unit(s) to jump into the air.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make jump.
 *
 *   Desired Height:
 *   - Max jump height to go above the ground
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total jump amount.
 *
 *   Wait For Jump?:
 *   - Wait for jumping to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move Distance
 * - Moves unit(s) by a distance from their current position(s).
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Distance Adjustment:
 *   - Makes adjustments to distance values to determine which direction to
 *     move unit(s).
 *     - Normal - No adjustments made
 *     - Horizontal - Actors adjust left, Enemies adjust right
 *     - Vertical - Actors adjust Up, Enemies adjust down
 *     - Both - Applies both Horizontal and Vertical
 *
 *     Distance: X:
 *     - Horizontal distance to move.
 *     - You may use JavaScript code.
 *
 *     Distance: Y:
 *     - Vertical distance to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move To Point
 * - Moves unit(s) to a designated point on the screen.
 * - Sideview-only! Points based off Graphics.boxWidth/Height.
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Destination Point:
 *   - Select which point to face.
 *     - Home
 *     - Center
 *     - Point X, Y
 *       - Replace 'x' and 'y' with coordinates
 *
 *   Offset Adjustment:
 *   - Makes adjustments to offset values to determine which direction to
 *     adjust the destination by.
 *
 *     Offset: X:
 *     - Horizontal offset to move.
 *     - You may use JavaScript code.
 *
 *     Offset: Y:
 *     - Vertical offset to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move To Target(s)
 * - Moves unit(s) to another unit(s) on the battle field.
 * - Sideview-only!
 *
 *   Targets (Moving):
 *   - Select which unit(s) to move.
 *
 *   Targets (Destination):
 *   - Select which unit(s) to move to.
 *
 *     Target Location:
 *     - Select which part target group to move to.
 *       - front head
 *       - front center
 *       - front base
 *       - middle head
 *       - middle center
 *       - middle base
 *       - back head
 *       - back center
 *       - back base
 *
 *     Melee Distance:
 *     - The melee distance away from the target location in addition to the
 *       battler's width.
 *
 *   Offset Adjustment:
 *   - Makes adjustments to offset values to determine which direction to
 *     adjust the destination by.
 *
 *     Offset: X:
 *     - Horizontal offset to move.
 *     - You may use JavaScript code.
 *
 *     Offset: Y:
 *     - Vertical offset to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Opacity
 * - Causes the unit(s) to change opacity.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change opacity.
 *
 *   Desired Opacity:
 *   - Change to this opacity value.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for opacity change.
 *
 *   Opacity Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Opacity?:
 *   - Wait for opacity changes to complete before performing next command?
 *
 * ---
 *
 * MOVE: Scale/Grow/Shrink
 * - Causes the unit(s) to scale, grow, or shrink?.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change the scale of.
 *
 *   Scale X:
 *   Scale Y:
 *   - What target scale value do you want?
 *   - 1.0 is normal size.
 *
 *   Duration:
 *   - Duration in frames to scale for.
 *
 *   Scale Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Scale?:
 *   - Wait for scaling to complete before performing next command?
 *
 * ---
 *
 * MOVE: Skew/Distort
 * - Causes the unit(s) to skew.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to skew.
 *
 *   Skew X:
 *   Skew Y:
 *   - What variance to skew?
 *   - Use small values for the best results.
 *
 *   Duration:
 *   - Duration in frames to skew for.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew to complete before performing next command?
 *
 * ---
 *
 * MOVE: Spin/Rotate
 * - Causes the unit(s) to spin.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to spin.
 *
 *   Angle:
 *   - How many degrees to spin?
 *
 *   Duration:
 *   - Duration in frames to spin for.
 *
 *   Spin Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Revert Angle on Finish:
 *   - Upon finishing the spin, revert the angle back to 0.
 *
 *   Wait For Spin?:
 *   - Wait for spin to complete before performing next command?
 *
 * ---
 *
 * MOVE: Wait For Float
 * - Waits for floating to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Jump
 * - Waits for jumping to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Movement
 * - Waits for movement to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Opacity
 * - Waits for opacity changes to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Scale
 * - Waits for scaling to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Skew
 * - Waits for skewing to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Spin
 * - Waits for spinning to complete before performing next command.
 *
 * ---
 * 
 * === Action Sequences - Projectiles ===
 * 
 * Create projectiles on the screen and fire them off at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * ---
 *
 * PROJECTILE: Animation
 * - Create an animation projectile and fire it at a target.
 * - Requires VisuMZ_3_ActSeqProjectiles!
 *
 *   Coordinates:
 *
 *     Start Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should start from.
 *         - Target - Start from battler target(s)
 *         - Point - Start from a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) to start the projectile from.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to start the projectile at.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *     Goal Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should go to.
 *         - Target - Goal is battler target(s)
 *         - Point - Goal is a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) for projectile to go to.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to send the projectile to.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *   Settings:
 *
 *     Animation ID:
 *     - Determine which animation to use as a projectile.
 *
 *     Duration:
 *     - Duration for the projectile(s) to travel.
 *
 *     Wait For Projectile?:
 *     - Wait for projectile(s) to reach their destination before going onto
 *       the next command?
 *
 *     Extra Settings:
 *     - Add extra settings to the projectile?
 *
 *       Auto Angle?:
 *       - Automatically angle the projectile to tilt the direction
 *         it's moving?
 *
 *       Angle Offset:
 *       - Alter the projectile's tilt by this many degrees.
 *
 *       Arc Peak:
 *       - This is the height of the project's trajectory arc in pixels.
 *
 *       Easing:
 *       - Select which easing type to apply to the projectile's trajectory.
 *
 *       Spin Speed:
 *       - Determine how much angle the projectile spins per frame.
 *       - Does not work well with "Auto Angle".
 *
 * ---
 *
 * PROJECTILE: Icon
 * - Create an icon projectile and fire it at a target.
 * - Requires VisuMZ_3_ActSeqProjectiles!
 *
 *   Coordinates:
 *
 *     Start Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should start from.
 *         - Target - Start from battler target(s)
 *         - Point - Start from a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) to start the projectile from.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to start the projectile at.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *     Goal Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should go to.
 *         - Target - Goal is battler target(s)
 *         - Point - Goal is a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) for projectile to go to.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to send the projectile to.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *   Settings:
 *
 *     Icon:
 *     - Determine which icon to use as a projectile.
 *       - You may use JavaScript code.
 *
 *     Duration:
 *     - Duration for the projectile(s) to travel.
 *
 *     Wait For Projectile?:
 *     - Wait for projectile(s) to reach their destination before going onto
 *       the next command?
 *
 *     Extra Settings:
 *     - Add extra settings to the projectile?
 *
 *       Auto Angle?:
 *       - Automatically angle the projectile to tilt the direction
 *         it's moving?
 *
 *       Angle Offset:
 *       - Alter the projectile's tilt by this many degrees.
 *
 *       Arc Peak:
 *       - This is the height of the project's trajectory arc in pixels.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the projectile?
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Easing:
 *       - Select which easing type to apply to the projectile's trajectory.
 *
 *       Hue:
 *       - Adjust the hue of the projectile.
 *       - Insert a number between 0 and 360.
 *
 *       Scale:
 *       - Adjust the size scaling of the projectile.
 *       - Use decimals for exact control.
 *
 *       Spin Speed:
 *       - Determine how much angle the projectile spins per frame.
 *       - Does not work well with "Auto Angle".
 *
 * ---
 *
 * PROJECTILE: Picture
 * - Create a picture projectile and fire it at a target.
 * - Requires VisuMZ_3_ActSeqProjectiles!
 *
 *   Coordinates:
 *
 *     Start Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should start from.
 *         - Target - Start from battler target(s)
 *         - Point - Start from a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) to start the projectile from.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to start the projectile at.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *     Goal Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should go to.
 *         - Target - Goal is battler target(s)
 *         - Point - Goal is a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) for projectile to go to.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to send the projectile to.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *   Settings:
 *
 *     Picture Filename:
 *     - Determine which picture to use as a projectile.
 *
 *     Duration:
 *     - Duration for the projectile(s) to travel.
 *
 *     Wait For Projectile?:
 *     - Wait for projectile(s) to reach their destination before going onto
 *       the next command?
 *
 *     Extra Settings:
 *     - Add extra settings to the projectile?
 *
 *       Auto Angle?:
 *       - Automatically angle the projectile to tilt the direction
 *         it's moving?
 *
 *       Angle Offset:
 *       - Alter the projectile's tilt by this many degrees.
 *
 *       Arc Peak:
 *       - This is the height of the project's trajectory arc in pixels.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the projectile?
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Easing:
 *       - Select which easing type to apply to the projectile's trajectory.
 *
 *       Hue:
 *       - Adjust the hue of the projectile.
 *       - Insert a number between 0 and 360.
 *
 *       Scale:
 *       - Adjust the size scaling of the projectile.
 *       - Use decimals for exact control.
 *
 *       Spin Speed:
 *       - Determine how much angle the projectile spins per frame.
 *       - Does not work well with "Auto Angle".
 *
 * ---
 * 
 * === Action Sequences - Skew ===
 * 
 * These action sequences allow you to have control over the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * ---
 *
 * SKEW: Change Skew
 * - Changes the camera skew.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Skew X:
 *   - Change the camera skew X to this value.
 *
 *   Skew Y:
 *   - Change the camera skew Y to this value.
 *
 *   Duration:
 *   - Duration in frames to change camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Reset Skew
 * - Reset any skew settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Wait For Skew
 * - Waits for skew changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Target ===
 *
 * If using a manual target by target Action Sequence, these commands will give
 * you full control over its usage.
 *
 * ---
 *
 * TARGET: Current Index
 * - Sets the current index to this value.
 * - Then decide to jump to a label (optional).
 *
 *   Set Index To:
 *   - Sets current targeting index to this value.
 *   - 0 is the starting index of a target group.
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Next Target
 * - Moves index forward by 1 to select a new current target.
 * - Then decide to jump to a label (optional).
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Previous Target
 * - Moves index backward by 1 to select a new current target.
 * - Then decide to jump to a label (optional).
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Random Target
 * - Sets index randomly to determine new currernt target.
 * - Then decide to jump to a label (optional).
 *
 *   Force Random?:
 *   - Index cannot be its previous index amount after random.
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * === Action Sequences - Weapon ===
 *
 * Allows for finer control over Dual/Multi Wielding actors.
 * Only works for Actors.
 *
 * ---
 *
 * WEAPON: Clear Weapon Slot
 * - Clears the active weapon slot (making others valid again).
 * - Only works for Actors.
 *
 *   Targets:
 *   - Select unit(s) to clear the active weapon slot for.
 *
 * ---
 *
 * WEAPON: Next Weapon Slot
 * - Goes to next active weapon slot (making others invalid).
 * - If next slot is weaponless, don't label jump.
 *
 *   Targets:
 *   - Select unit(s) to change the next active weapon slot for.
 *
 * ---
 *
 * WEAPON: Set Weapon Slot
 * - Sets the active weapon slot (making others invalid).
 * - Only works for Actors.
 *
 *   Targets:
 *   - Select unit(s) to change the active weapon slot for.
 *
 *   Weapon Slot ID:
 *   - Select weapon slot to make active (making others invalid).
 *   - Use 0 to clear and normalize. You may use JavaScript code.
 *
 * ---
 *
 * === Action Sequences - Zoom ===
 *
 * These Action Sequences are zoom-related.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ZOOM: Change Scale
 * - Changes the zoom scale.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Scale:
 *   - The zoom scale to change to.
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Reset Zoom
 * - Reset any zoom settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Wait For Zoom
 * - Waits for zoom changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto Battle Settings
 * ============================================================================
 *
 * These Plugin Parameter settings allow you to change the aspects added by
 * this plugin that support Auto Battle and the Auto Battle commands.
 *
 * Auto Battle commands can be added to the Party Command Window and/or Actor
 * Command Window. The one used by the Party Command Window will cause the
 * whole party to enter an Auto Battle state until stopped by a button input.
 * The command used by the Actor Command Window, however, will cause the actor
 * to select an action based off the Auto Battle A.I. once for the current turn
 * instead.
 *
 * ---
 *
 * Battle Display
 * 
 *   Message:
 *   - Message that's displayed when Auto Battle is on.
 *     Text codes allowed. %1 - OK button, %2 - Cancel button
 * 
 *   OK Button:
 *   - Text used to represent the OK button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Cancel Button:
 *   - Text used to represent the Cancel button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Background Type:
 *   - Select background type for Auto Battle window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the Auto Battle options to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Startup Name:
 *   - Command name of the option.
 * 
 *   Style Name:
 *   - Command name of the option.
 * 
 *   OFF:
 *   - Text displayed when Auto Battle Style is OFF.
 * 
 *   ON:
 *   - Text displayed when Auto Battle Style is ON.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Damage Settings
 * ============================================================================
 *
 * These Plugin Parameters add a variety of things to how damage is handled in
 * battle. These range from hard damage caps to soft damage caps to how damage
 * popups appear, how the formulas for various aspects are handled and more.
 *
 * Damage Styles are also a feature added through this plugin. More information
 * can be found in the help section above labeled 'Damage Styles'.
 *
 * ---
 *
 * Damage Cap
 * 
 *   Enable Damage Cap?:
 *   - Put a maximum hard damage cap on how far damage can go?
 *   - This can be broken through the usage of notetags.
 * 
 *   Default Hard Cap:
 *   - The default hard damage cap used before applying damage.
 * 
 *   Enable Soft Cap?:
 *   - Soft caps ease in the damage values leading up to the  hard damage cap.
 *   - Requires hard Damage Cap enabled.
 * 
 *     Base Soft Cap Rate:
 *     - The default soft damage cap used before applying damage.
 * 
 *     Soft Scale Constant:
 *     - The default soft damage cap used before applying damage.
 *
 * ---
 *
 * Popups
 * 
 *   Popup Duration:
 *   - Adjusts how many frames a popup stays visible.
 * 
 *   Newest Popups Bottom:
 *   - Puts the newest popups at the bottom.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Sets how much to offset the sprites by horizontally/vertically.
 * 
 *   Shift X:
 *   Shift Y:
 *   - Sets how much to shift the sprites by horizontally/vertically.
 * 
 *   Shift Y:
 * 
 *   Critical Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Critical Duration:
 *   - Adjusts how many frames a the flash lasts.
 *
 * ---
 *
 * Formulas
 * 
 *   JS: Overall Formula:
 *   - The overall formula used when calculating damage.
 * 
 *   JS: Variance Formula:
 *   - The formula used when damage variance.
 * 
 *   JS: Guard Formula:
 *   - The formula used when damage is guarded.
 *
 * ---
 *
 * Critical Hits
 * 
 *   JS: Rate Formula:
 *   - The formula used to calculate Critical Hit Rates.
 * 
 *   JS: Damage Formula:
 *   - The formula used to calculate Critical Hit Damage modification.
 *
 * ---
 *
 * Damage Styles
 * 
 *   Default Style:
 *   - Which Damage Style do you want to set as default?
 *   - Use 'Manual' to not use any styles at all.
 *     - The 'Manual' style will not support <Armor Penetration> notetags.
 *     - The 'Manual' style will not support <Armor Reduction> notetags.
 * 
 *   Style List:
 *   - A list of the damage styles available.
 *   - These are used to calculate base damage.
 * 
 *     Name:
 *     - Name of this Damage Style.
 *     -Used for notetags and such.
 * 
 *     JS: Formula:
 *     - The base formula for this Damage Style.
 * 
 *     Items & Equips Core:
 * 
 *       HP Damage:
 *       MP Damage:
 *       HP Recovery:
 *       MP Recovery:
 *       HP Drain:
 *       MP Drain:
 *       - Vocabulary used for this data entry.
 * 
 *       JS: Damage Display:
 *       - Code used the data displayed for this category.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Some of the base settings for the various mechanics found in the battle
 * system can be altered here in these Plugin Parameters. Most of these will
 * involve JavaScript code and require you to have to good understanding of
 * how the RPG Maker MZ code works before tampering with it.
 *
 * ---
 *
 * Action Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   JS: Calculate:
 *   - Code used to calculate action speed.
 *
 * ---
 *
 * Base Troop
 * 
 *   Base Troop ID's:
 *   - Select the Troop ID(s) to duplicate page events from for all
 *     other troops.
 *   - More information can be found in the dedicated Help section above.
 *
 * ---
 * 
 * Common Events (on Map)
 * 
 *   Pre-Battle Event:
 *   Post-Battle Event:
 *   Victory Event:
 *   Defeat Event:
 *   Escape Success Event:
 *   Escape Fail Event:
 *   - Queued Common Event to run upon meeting the condition.
 *   - Use to 0 to not run any Common Event at all.
 *   - "Post-Battle Event" will always run regardless.
 *   - If any events are running before the battle, they will continue running
 *     to the end first before the queued Common Events will run.
 *   - These common events only run on the map scene. They're not meant to run
 *     in the battle scene.
 *   - If the "Defeat Event" has a common event attached to it, then random
 *     encounters will be changed to allow defeat without being sent to the
 *     Game Over scene. Instead, the game will send the player to the map scene
 *     where the Defeat Event will run.
 *
 * ---
 *
 * Escape
 * 
 *   JS: Calc Escape Ratio:
 *   - Code used to calculate the escape success ratio.
 * 
 *   JS: Calc Escape Raise:
 *   - Code used to calculate how much the escape success ratio raises upon
 *     each failure.
 * 
 * ---
 * 
 * Switches
 * 
 *   Switch: Critical:
 *   - Turns switch ON if the action performs a critical hit.
 *   - Switch reverts to OFF whenever an action starts.
 *   - If multiple targets/hits are struck, as long as one hit lands a critical
 *     hit, then the switch will remain ON for the rest of the action.
 * 
 *   Switch: Miss/Evade:
 *   - Turns switch ON if the action misses/is evaded.
 *   - Switch reverts to OFF whenever an action starts.
 *   - If multiple targets/hits are struck, as long as one hit fails to land,
 *     then the switch will remain ON for the rest of the action.
 * 
 * ---
 * 
 * Variables
 * 
 *   Variable: Damage:
 *   - Variable records target damage during action.
 *   - Variable reverts to 0 whenever an action starts.
 *   - If multiple targets/hits are struck, the variable will record the total
 *     amount of damage done for the remainder of the action (unless manually
 *     reseting to 0 during an Action Sequence).
 * 
 *   Variable: Healing:
 *   - Variable records target healing during action.
 *   - Variable reverts to 0 whenever an action starts.
 *   - If multiple targets/hits are struck, the variable will record the total
 *     amount of healing done for the remainder of the action (unless manually
 *     reseting to 0 during an Action Sequence).
 * 
 * ---
 *
 * JS: Battle-Related
 * 
 *   JS: Pre-Start Battle:
 *   - Target function: BattleManager.startBattle()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Battle:
 *   - Target function: BattleManager.startBattle()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Battle Victory:
 *   - Target function: BattleManager.processVictory()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Escape Success:
 *   - Target function: BattleManager.onEscapeSuccess()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Escape Failure:
 *   - Target function: BattleManager.onEscapeFailure()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Battle Defeat:
 *   - Target function: BattleManager.processDefeat()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Pre-End Battle:
 *   - Target function: BattleManager.endBattle()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Battle:
 *   - Target function: BattleManager.endBattle()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * JS: Turn-Related
 * 
 *   JS: Pre-Start Turn:
 *   - Target function: BattleManager.startTurn()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Turn:
 *   - Target function: BattleManager.startTurn()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-End Turn:
 *   - Target function: Game_Battler.prototype.onTurnEnd()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Turn:
 *   - Target function: Game_Battler.prototype.onTurnEnd()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-Regenerate:
 *   - Target function: Game_Battler.prototype.regenerateAll()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Regenerate:
 *   - Target function: Game_Battler.prototype.regenerateAll()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * JS: Action-Related
 * 
 *   JS: Pre-Start Action:
 *   - Target function: BattleManager.startAction()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Action:
 *   - Target function: BattleManager.startAction()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-Apply:
 *   - Target function: Game_Action.prototype.apply()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Pre-Damage:
 *   - Target function: Game_Action.prototype.executeDamage()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Damage:
 *   - Target function: Game_Action.prototype.executeDamage()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Post-Apply:
 *   - Target function: Game_Action.prototype.apply()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-End Action:
 *   - Target function: BattleManager.endAction()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Action:
 *   - DescriTarget function: BattleManager.endAction()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Layout Settings
 * ============================================================================
 *
 * The Battle Layout Settings Plugin Parameter gives you control over the look,
 * style, and appearance of certain UI elements. These range from the way the
 * Battle Status Window presents its information to the way certain windows
 * like the Party Command Window and Actor Command Window appear.
 *
 * ---
 *
 * Battle Layout Style
 * - The style used for the battle layout.
 * 
 *   Default:
 *   - Shows actor faces in Battle Status.
 * 
 *   List:
 *   - Lists actors in Battle Status.
 * 
 *   XP:
 *   - Shows actor battlers in a stretched Battle Status.
 * 
 *   Portrait:
 *   - Shows portraits in a stretched Battle Status.
 * 
 *   Border:
 *   - Displays windows around the screen border.
 *
 * ---
 *
 * List Style
 * 
 *   Show Faces:
 *   - Shows faces in List Style?
 * 
 *   Command Window Width:
 *   - Determine the window width for the Party and Actor Command Windows.
 *   - Affects Default and List Battle Layout styles.
 *
 * ---
 *
 * XP Style
 * 
 *   Command Lines:
 *   - Number of action lines in the Actor Command Window for the XP Style.
 * 
 *   Sprite Height:
 *   - Default sprite height used when if the sprite's height has not been
 *     determined yet.
 * 
 *   Sprite Base Location:
 *   - Determine where the sprite is located on the Battle Status Window.
 *     - Above Name - Sprite is located above the name.
 *     - Bottom - Sprite is located at the bottom of the window.
 *     - Centered - Sprite is centered in the window.
 *     - Top - Sprite is located at the top of the window.
 *
 * ---
 *
 * Portrait Style
 * 
 *   Show Portraits?:
 *   - Requires VisuMZ_1_MainMenuCore.
 *   - Shows the actor's portrait instead of a face.
 * 
 *   Portrait Scaling:
 *   - If portraits are used, scale them by this much.
 *
 * ---
 *
 * Border Style
 * 
 *   Columns:
 *   - The total number of columns for Skill & Item Windows in the battle scene
 * 
 *   Show Portraits?:
 *   - Requires VisuMZ_1_MainMenuCore.
 *   - Shows the actor's portrait at the edge of the screen.
 * 
 *   Portrait Scaling:
 *   - If portraits are used, scale them by this much.
 *
 * ---
 *
 * Skill & Item Windows
 * 
 *   Middle Layout:
 *   - Shows the Skill & Item Windows in mid-screen?
 * 
 *   Columns:
 *   - The total number of columns for Skill & Item Windows in the battle scene
 *
 * ---
 * 
 * Status Window Elements
 * 
 *   Battler Name:
 *   Gauge 1 (HP):
 *   Gauge 2 (MP):
 *   Gauge 3 (TP):
 *   State Icon:
 *   TPB/ATB Gauge:
 * 
 *     Offset: X/Y:
 *     - Offset this Battle Status Window element's X/Y.
 *     - For X: Negative goes left. Positive goes right.
 *     - For Y: Negative goes up. Positive goes down.
 * 
 *   Window Skin:
 * 
 *     Filename:
 *     - Filename used for the Battle Status Window skin.
 *     - Leave this empty to use the default window skin.
 * 
 *     Hide Window Skin?:
 *     - Hide the window skin for the Battle Status Window?
 * 
 *   Selectable Background:
 * 
 *     Hide Selectable BG?:
 *     - Show/Hide the selectable background box for the Battle Status Window?
 * 
 *   Attachments:
 * 
 *     Back Attachment:
 * 
 *       Filename:
 *       - Filename used for an image to attach to the back of the Battle
 *         Status Window. Leave empty for none.
 * 
 *       Offset: X/Y:
 *       - Offset this Battle Status Window element's X/Y.
 *       - For X: Negative goes left. Positive goes right.
 *       - For Y: Negative goes up. Positive goes down.
 * 
 *     Front Attachment:
 * 
 *       Filename:
 *       - Filename used for an image to attach to the front of the Battle
 *         Status Window. Leave empty for none.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Log Settings
 * ============================================================================
 *
 * These Plugin Parameters give you control over how the Battle Log Window, the
 * window shown at the top of the screen in the battle layout, appears, its
 * various properties, and which text will be displayed.
 *
 * The majority of the text has been disabled by default with this plugin to
 * make the flow of battle progress faster.
 *
 * ---
 *
 * General
 * 
 *   Back Color:
 *   - Use #rrggbb for a hex color.
 * 
 *   Max Lines:
 *   - Maximum number of lines to be displayed.
 * 
 *   Message Wait:
 *   - Number of frames for a usual message wait.
 * 
 *   Text Align:
 *   - Text alignment for the Window_BattleLog.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the battle log.
 *
 * ---
 *
 * Start Turn
 * 
 *   Show Start Turn?:
 *   - Display turn changes at the start of the turn?
 * 
 *   Start Turn Message:
 *   - Message displayed at turn start.
 *   - %1 - Turn Count
 * 
 *   Start Turn Wait:
 *   - Number of frames to wait after a turn started.
 *
 * ---
 *
 * Display Action
 * 
 *   Show Centered Action?:
 *   - Display a centered text of the action name?
 * 
 *   Show Skill Message 1?:
 *   - Display the 1st skill message?
 * 
 *   Show Skill Message 2?:
 *   - Display the 2nd skill message?
 * 
 *   Show Item Message?:
 *   - Display the item use message?
 *
 * ---
 *
 * Action Changes
 * 
 *   Show Counter?:
 *   - Display counter text?
 * 
 *   Show Reflect?:
 *   - Display magic reflection text?
 * 
 *   Show Substitute?:
 *   - Display substitute text?
 *
 * ---
 *
 * Action Results
 * 
 *   Show No Effect?:
 *   - Display no effect text?
 * 
 *   Show Critical?:
 *   - Display critical text?
 * 
 *   Show Miss/Evasion?:
 *   - Display miss/evasion text?
 * 
 *   Show HP Damage?:
 *   - Display HP Damage text?
 * 
 *   Show MP Damage?:
 *   - Display MP Damage text?
 * 
 *   Show TP Damage?:
 *   - Display TP Damage text?
 *
 * ---
 *
 * Display States
 * 
 *   Show Added States?:
 *   - Display added states text?
 * 
 *   Show Removed States?:
 *   - Display removed states text?
 * 
 *   Show Current States?:
 *   - Display the currently affected state text?
 * 
 *   Show Added Buffs?:
 *   - Display added buffs text?
 * 
 *   Show Added Debuffs?:
 *   - Display added debuffs text?
 * 
 *   Show Removed Buffs?:
 *   - Display removed de/buffs text?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battleback Scaling Settings
 * ============================================================================
 *
 * By default, the battlebacks in RPG Maker MZ scale as if the screen size is
 * a static 816x624 resolution, which isn't always the case. These settings
 * here allow you to dictate how you want the battlebacks to scale for the
 * whole game. These settings CANNOT be changed midgame or per battle.
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default scaling style used for battlebacks.
 *   - MZ (MZ's default style)
 *   - 1:1 (No Scaling)
 *   - Scale To Fit (Scale to screen size)
 *   - Scale Down (Scale Downward if Larger than Screen)
 *   - Scale Up (Scale Upward if Smaller than Screen)
 * 
 *   JS: 1:1:
 *   JS: Scale To Fit:
 *   JS: Scale Down:
 *   JS: Scale Up:
 *   JS: 1:1:
 *   JS: 1:1:
 *   - This code gives you control over the scaling for this style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Party Command Window
 * ============================================================================
 *
 * These Plugin Parameters allow you control over how the Party Command Window
 * operates in the battle scene. You can turn disable it from appearing or make
 * it so that it doesn't 
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Party Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Party Command Window.
 * 
 *   Fight Icon:
 *   - The icon used for the Fight command.
 * 
 *   Add Auto Battle?:
 *   - Add the "Auto Battle" command to the Command Window?
 * 
 *     Auto Battle Icon:
 *     - The icon used for the Auto Battle command.
 * 
 *     Auto Battle Text:
 *     - The text used for the Auto Battle command.
 * 
 *   Add Options?:
 *   - Add the "Options" command to the Command Window?
 * 
 *     Options Icon:
 *     - The icon used for the Options command.
 * 
 *     Active TPB Message:
 *     - Message that will be displayed when selecting options during the
 *       middle of an action.
 * 
 *   Escape Icon:
 *   - The icon used for the Escape command.
 *
 * ---
 *
 * Access
 * 
 *   Skip Party Command:
 *   - DTB: Skip Party Command selection on turn start.
 *   - TPB: Skip Party Command selection at battle start.
 * 
 *   Disable Party Command:
 *   - Disable the Party Command Window entirely?
 *
 * ---
 *
 * Help Window
 * 
 *   Fight:
 *   - Text displayed when selecting a skill type.
 *   - %1 - Skill Type Name
 * 
 *   Auto Battle:
 *   - Text displayed when selecting the Auto Battle command.
 * 
 *   Options:
 *   - Text displayed when selecting the Options command.
 * 
 *   Escape:
 *   - Text displayed when selecting the escape command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Command Window
 * ============================================================================
 *
 * These Plugin Parameters allow you to change various aspects regarding the
 * Actor Command Window and how it operates in the battle scene. This ranges
 * from how it appears to the default battle commands given to all players
 * without a custom <Battle Commands> notetag.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Actor Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Actor Command Window.
 * 
 *   Item Icon:
 *   - The icon used for the Item command.
 * 
 *   Normal SType Icon:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * 
 *   Magic SType Icon:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - Ignore if VisuMZ_1_SkillsStatesCore is installed.
 *
 * ---
 *
 * Battle Commands
 * 
 *   Command List:
 *   - List of battle commands that appear by default if the <Battle Commands>
 *     notetag isn't present.
 *
 *     - Attack 
 *       - Adds the basic attack command.
 * 
 *     - Skills
 *       - Displays all the skill types available to the actor.
 * 
 *     - SType: x
 *     - Stype: name
 *       - Adds in a specific skill type.
 *       - Replace 'x' with the ID of the skill type.
 *       - Replace 'name' with the name of the skill type (without text codes).
 *
 *     - All Skills
 *       - Adds all usable battle skills as individual actions.
 * 
 *     - Skill: x
 *     - Skill: name
 *       - Adds in a specific skill as a usable action.
 *       - Replace 'x' with the ID of the skill.
 *       - Replace 'name' with the name of the skill.
 * 
 *     - Guard
 *       - Adds the basic guard command.
 * 
 *     - Item
 *       - Adds the basic item command.
 * 
 *     - Escape
 *       - Adds the escape command.
 * 
 *     - Auto Battle
 *       - Adds the auto battle command.
 * 
 *   Show Command Costs:
 *   - If a battle command has a resource cost, show it?
 *
 * ---
 *
 * Help Window
 * 
 *   Skill Types:
 *   - Text displayed when selecting a skill type.
 *   - %1 - Skill Type Name
 * 
 *   Items:
 *   - Text displayed when selecting the item command.
 * 
 *   Escape:
 *   - Text displayed when selecting the escape command.
 * 
 *   Auto Battle:
 *   - Text displayed when selecting the Auto Battle command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Battler Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust how the sideview battlers behave for
 * the actor sprites. Some of these settings are shared with enemies if they
 * use sideview battler graphics.
 *
 * ---
 *
 * Flinch
 * 
 *   Flinch Distance X:
 *   - The normal X distance when flinching.
 * 
 *   Flinch Distance Y:
 *   - The normal Y distance when flinching.
 * 
 *   Flinch Duration:
 *   - The number of frames for a flinch to complete.
 *
 * ---
 *
 * Sideview Battlers
 * 
 *   Anchor: X:
 *   - Default X anchor for Sideview Battlers.
 * 
 *   Anchor: Y:
 *   - Default Y anchor for Sideview Battlers.
 * 
 *   Chant Style:
 *   - What determines the chant motion?
 *   - Hit type or skill type?
 * 
 *   Offset X:
 *   - Offsets X position where actor is positioned.
 *   - Negative values go left. Positive values go right.
 * 
 *   Offset Y:
 *   - Offsets Y position where actor is positioned.
 *   - Negative values go up. Positive values go down.
 * 
 *   Motion Speed:
 *   - The number of frames in between each motion.
 * 
 *   Priority: Active:
 *   - Place the active actor on top of actor and enemy sprites.
 * 
 *   Priority: Actors:
 *   - Prioritize actors over enemies when placing sprites on top of each other
 * 
 *   Shadow Visible:
 *   - Show or hide the shadow for Sideview Battlers.
 * 
 *   Smooth Image:
 *   - Smooth out the battler images or pixelate them?
 * 
 *   JS: Home Position:
 *   - Code used to calculate the home position of actors.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Enemy Battler Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust how enemies appear visually in the
 * battle scene. Some of these settings will override the settings used for
 * actors if used as sideview battlers. Other settings include changing up the
 * default attack animation for enemies, how the enemy select window functions,
 * and more.
 *
 * ---
 *
 * Visual
 * 
 *   Attack Animation:
 *   - Default attack animation used for enemies.
 *   - Use <Attack Animation: x> for custom animations.
 * 
 *   Emerge Text:
 *   - Show or hide the 'Enemy emerges!' text at the start of battle.
 * 
 *   Offset X:
 *   - Offsets X position where enemy is positioned.
 *   - Negative values go left. Positive values go right.
 * 
 *   Offset Y:
 *   - Offsets Y position where enemy is positioned.
 *   - Negative values go up. Positive values go down.
 * 
 *   Smooth Image:
 *   - Smooth out the battler images or pixelate them?
 *
 * ---
 *
 * Select Window
 * 
 *   Any: Last Selected:
 *   - Prioritize last selected enemy over front view or sideview settings?
 * 
 *   FV: Right Priority:
 *   - If using frontview, auto select the enemy furthest right.
 * 
 *   SV: Right Priority:
 *   - If using sideview, auto select the enemy furthest right.
 * 
 * ---
 * 
 * Name:
 * 
 *   Name: Font Size:
 *   - Font size used for enemy names.
 * 
 *   Name: Offset X:
 *   Name: Offset Y:
 *   - Offset the enemy name's position by this much.
 *   - For X: Negative goes left. Positive goes right.
 *   - For Y: Negative goes up. Positive goes down.
 * 
 *   Name: Always Visible:
 *   - Determines if the enemy name will always be visible.
 * 
 *   Name: Attach States:
 *   - Attach the enemy's state icon to the enemy name?
 * 
 *     Attach: Offset X:
 *     Attach: Offset Y:
 *     - How much to offset the attached icon's X/Y position by?
 *     - For X: Negative goes left. Positive goes right.
 *     - For Y: Negative goes up. Positive goes down.
 * 
 *   Legacy Option:
 *   - Use the legacy version (window) or new version (sprite).
 *   - WARNING: Legacy version is no longer supported for bugs.
 *   - Not all settings available here in the Plugin Parameters will be
 *     available to the legacy version (ie Always Visible and Attach States).
 *
 * ---
 *
 * Sideview Battlers
 * 
 *   Allow Collapse:
 *   - Causes defeated enemies with SV Battler graphics to "fade away"
 *     when defeated?
 * 
 *   Anchor: X:
 *   - Default X anchor for Sideview Battlers.
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Anchor: Y:
 *   - Default Y anchor for Sideview Battlers.
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Motion: Idle:
 *   - Sets default idle animation used by Sideview Battlers.
 * 
 *   Shadow Visible:
 *   - Show or hide the shadow for Sideview Battlers.
 * 
 *   Size: Width:
 *   - Default width for enemies that use Sideview Battlers.
 * 
 *   Size: Height:
 *   - Default height for enemies that use Sideview Battlers.
 * 
 *   Weapon Type:
 *   - Sets default weapon type used by Sideview Battlers.
 *   - Use 0 for Bare Hands.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: HP Gauge Settings
 * ============================================================================
 *
 * Settings that adjust the visual HP Gauge displayed in battle.
 *
 * ---
 *
 * Show Gauges For
 * 
 *   Actors:
 *   - Show HP Gauges over the actor sprites' heads?
 *   - Requires SV Actors to be visible.
 * 
 *   Enemies:
 *   - Show HP Gauges over the enemy sprites' heads?
 *   - Can be bypassed with <Hide HP Gauge> notetag.
 * 
 *     Requires Defeat?:
 *     - Requires defeating the enemy once to show HP Gauge?
 *     - Can be bypassed with <Show HP Gauge> notetag.
 * 
 *       Battle Test Bypass?:
 *       - Bypass the defeat requirement in battle test?
 *
 * ---
 *
 * Settings
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the HP Gauge sprite's anchor X/Y to be?
 *     Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the HP Gauge to be scaled?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How many pixels to offset the HP Gauge's X/Y by?
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the 'Show HP Gauge' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Action Sequence Settings
 * ============================================================================
 *
 * Action Sequence Plugin Parameters allow you to decide if you want automatic
 * Action Sequences to be used for physical attacks, the default casting
 * animations used, how counters and reflects appear visually, and what the
 * default stepping distances are.
 *
 * ---
 *
 * Automatic Sequences
 * 
 *   Melee Single Target:
 *   - Allow this auto sequence for physical, single target actions?
 * 
 *   Melee Multi Target:
 *   - Allow this auto sequence for physical, multi-target actions?
 *
 * ---
 * 
 * Quality of Life
 * 
 *   Auto Notetag:
 *   - Automatically apply the <Custom Action Sequence> notetag effect to any
 *     item or skill that has a Common Event?
 *   - Any item or skill without a Common Event attached to it will use the
 *     Automatic Action Sequences instead.
 *   - The <Auto Action Sequence> notetag will disable this effect for that
 *     particular skill or item.
 * 
 * ---
 *
 * Cast Animations
 * 
 *   Certain Hit:
 *   - Cast animation for Certain Hit skills.
 * 
 *   Physical:
 *   - Cast animation for Physical skills.
 * 
 *   Magical:
 *   - Cast animation for Magical skills.
 *
 * ---
 *
 * Counter/Reflect
 * 
 *   Counter Back:
 *   - Play back the attack animation used?
 * 
 *   Reflect Animation:
 *   - Animation played when an action is reflected.
 * 
 *   Reflect Back:
 *   - Play back the attack animation used?
 *
 * ---
 *
 * Stepping
 * 
 *   Melee Distance:
 *   - Minimum distance in pixels for Movement Action Sequences.
 * 
 *   Step Distance X:
 *   - The normal X distance when stepping forward.
 * 
 *   Step Distance Y:
 *   - The normal Y distance when stepping forward.
 * 
 *   Step Duration:
 *   - The number of frames for a stepping action to complete.
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
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Enemy Battler Settings > Name > Legacy Option
 * **** Use the legacy version (window) or new version (sprite).
 * **** WARNING: Legacy version is no longer supported for bugs.
 * **** Not all settings available here in the Plugin Parameters will be
 *      available to the legacy version (ie Always Visible and Attach States).
 * 
 * Version 1.28: March 5, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Actor Command > Show Command Costs
 * **** If you don't want to show skill costs for your commands in the Actor
 *      Command Window, you can now hide them.
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Battle Layout Settings > Status Window Elements
 * *** Battle Layout Settings > Status Window Elements > Battler Name
 * *** Battle Layout Settings > Status Window Elements > Gauge 1 (HP)
 * *** Battle Layout Settings > Status Window Elements > Gauge 2 (MP)
 * *** Battle Layout Settings > Status Window Elements > Gauge 3 (TP)
 * *** Battle Layout Settings > Status Window Elements > State Icon
 * *** Battle Layout Settings > Status Window Elements > TPB/ATB Gauge
 * **** These new Plugin Parameters allow you to offset the positions of the
 *      various Battle Status Window elements. Their base positions will be
 *      calculated by the Battle Layout used and then offset from there.
 * *** Battle Layout Settings > Status Window Elements > Window Skin
 * **** These settings allow you to set a specific window skin for the
 *      Battle Status Window or hide it from view completely.
 * *** Battle Layout Settings > Status Window Elements > Selectable Background
 * **** This option allows you to hide the black box that comes with the
 *      majority of selectable elements found in RPG Maker MZ in case it does
 *      not fit with how you want the Battle Status Window to look.
 * *** Battle Layout Settings > Status Window Elements > Back Attachment
 * *** Battle Layout Settings > Status Window Elements > Front Attachment
 * **** These settings allow you to attach images to the back/front of the
 *      Battle Status Window from the img/system/ folder.
 * **** You may offset X and Y positions for them as well.
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > Enemy Settings > Name: Always Visible
 * **** Determines if the enemy name will always be visible.
 * *** Plugin Parameters > Enemy Settings > Name: Attach States
 * **** Attach the enemy's state icon to the enemy name?
 * *** Plugin Parameters > Enemy Settings > Attach: Offset X/Y
 * **** Offset the attached state icon's position.
 * * Feature Update!
 * ** Switched drawing enemy names on the screen from window to sprite to
 *    reduce lag and for better screen positioning accuracy especially during
 *    screen zooming. Update by Olivia.
 * 
 * Version 1.27: February 26, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Mechanics Settings > Switches > Switch: Critical
 * *** Plugin Parameters > Mechanics Settings > Switches > Switch: Miss/Evade
 * **** Turns Switches ON if the action performs a critical hit, misses, or is
 *      evaded at any point.
 * **** Switch reverts to OFF whenever an action starts.
 * **** If multiple targets/hits are struck, as long as one hit respectively
 *      lands a critical hit, fails to land, then the switch will remain ON for
 *      the rest of the action.
 * *** Plugin Parameters > Mechanics Settings > Variables > Variable: Damage
 * *** Plugin Parameters > Mechanics Settings > Variables > Variable: Healing
 * **** Variable records target damage/healing during action.
 * **** Variable reverts to 0 whenever an action starts.
 * **** If multiple targets/hits are struck, the variable will record the total
 *      amount of damage/healing done for the remainder of the action (unless
 *      manually reseting to 0 during an Action Sequence).
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Battles with branching event paths found within a conditional branch or
 *    choice tree will no longer be skipped over. Fix made by Arisu.
 * * Compatibility Update
 * ** Returning to the battle scene from the options scene in a Tpb-base battle
 *    system now links the current actor. Update by Irina.
 * 
 * Version 1.25: February 5, 2021
 * * Compatibility Update
 * ** Added compatibility update with VisuStella MZ Skills and States Core's
 *    Plugin Parameter > State Settings > Action End Update
 * * Feature Update!
 * ** <Common Event: name> notetag no longer requires <Custom Action Sequence>
 *    notetag if the Plugin Parameter: Auto Notetag is enabled.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** MOVE: Move To Point and MOVE: Move To Target(s) Action Sequences'
 *    "Offset Adjustment" normal setting will now factor in Offset X and
 *    Offset Y positions unlike before where it cancels them. Update by Irina.
 * * New Features!
 * ** New notetag added by Arisu:
 * *** <Common Event: name>
 * **** Battle only: calls forth a Common Event of a matching name.
 * **** This is primarily used for users who are reorganizing around their
 *      Common Events and would still like to have their skills/items perform
 *      the correct Action Sequences in case the ID's are different.
 * 
 * Version 1.23: January 22, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** ACSET: All Targets Action Set and ACSET: Each Target Action Set updated
 * *** New parameter added: Dual/Multi Wield?
 * **** Add times struck based on weapon quantity equipped?
 * * New Features!
 * ** Dual Wielding now functions differently. Made by Olivia.
 * *** Previously, RPG Maker MZ had "Dual Wielding" attack using both weapon
 *     animations at once, with the combined ATK of each weapon. It's confusing
 *     to look at and does not portray the nature of "Dual Wielding".
 * *** Dual Wielding, or in the case of users adding in third and fourth
 *     weapons, Multi Wielding is now changed. Each weapon is displayed
 *     individually, each producing its own attack animation, showing each
 *     weapon type, and applying only that weapon's ATK, Traits, and related
 *     effects. It is no longer a combined effect to display everything at once
 *     like RPG Maker MZ default.
 * *** If an actor has multiple weapon slots but some of them are unequipped,
 *     then the action will treat the attack as a single attack. There will be
 *     no barehanded attack to add on top of it. This is to match RPG Maker
 *     MZ's decision to omit a second animation if the same scenario is
 *     applied.
 * ** New Action Sequence Plugin Commands added by Yanfly
 * *** ANIM: Attack Animation 2+
 * **** Plays the animation associated with the user's 2nd weapon.
 *      Plays nothing if there is no 2nd weapon equipped.
 * ** New Action Sequence Plugin Commands added by Olivia
 * *** WEAPON: Clear Weapon Slot
 * *** WEAPON: Next Weapon Slot
 * *** WEAPON: Set Weapon Slot
 * **** These are Action Sequence Plugin Commands for devs who want finer
 *      control over Dual/Multi Wielding weapons.
 * 
 * Version 1.22: January 15, 2021
 * * Compatibility Update
 * ** Compatibility with "All Skills" Actor Command should now work with the
 *    Skills & States Core hide skill notetags.
 * 
 * Version 1.21: January 8, 2021
 * * Bug Fixes!
 * ** "MOVE: Home Reset" Plugin Command Action Sequence should work properly.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Notetag snuck in by Arisu
 * *** <Auto Action Sequence>
 * **** Used for those who have the "Auto Notetag" Plugin Parameter enabled and
 *      just want to use an automatic Action Sequence instead.
 * ** New Plugin Parameter snuck in by Arisu!
 * *** Plugin Parameters > Action Sequences > Quality of Life > Auto Notetag
 * **** Automatically apply the <Custom Action Sequence> notetag effect to any
 *      item or skill that has a Common Event?
 * **** Any item or skill without a Common Event attached to it will use the
 *      Automatic Action Sequences instead.
 * **** The <Auto Action Sequence> notetag will disable this effect for that
 *      particular skill or item.
 * ** Arisu, you're going to be responsible for any bugs these may cause.
 * *** Bring it!!!!
 * **** And handling any bug report emails that are sent because this was
 *      turned on by accident.
 * ***** Please read the documentation, guys!
 * 
 * Version 1.20: January 1, 2021
 * * Bug Fixes!
 * ** For TPB Active or ATB Active, inputting actors that have received damage
 *    will return back to place after flinching. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Battle Portrait Offset: +x, +y>
 * *** <Battle Portrait Offset X: +x>
 * *** <Battle Portrait Offset Y: +y>
 * **** This is used with the "Portrait" and "Border" Battle Layouts.
 * **** Offsets the X and Y coordinates for the battle portrait.
 * 
 * Version 1.19: December 25, 2020
 * * Bug Fixes!
 * ** Removing a state from a Sideview Enemy during the middle of their a non-
 *    looping motion will no longer reset their motion to neutral.
 *    Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** Action Sequence "PROJECTILE: Icon" now supports code for the "Icon"
 *    parameter. Update made by Yanfly.
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** For TPB Active or ATB Active, inputting actors will no longer step back
 *    after an enemy's action is finished. Fix made by Yanfly and Shiro.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** Action Sequence "BTLOG: Add Text" is updated for the convenience of a new
 *    option to quickly copy the displayed text to the VisuStella MZ Combat Log
 *    if that plugin is installed. Added by Yanfly.
 * 
 * Version 1.17: December 11, 2020
 * * Bug Fixes!
 * ** Common Events in TPB Active that cause forced actions will no longer
 *    cause currently inputting actors that match the forced action battler to
 *    crash the game. Fix made by Yanfly and Shiro.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Action Sequence Impact Action Sequences "Shockwave from Each Target(s)",
 *    "Shockwave from Target(s) Center", and "Zoom Blur at Target(s) Center"
 *    now have "Offset X" and "Offset Y" plugin parameters. Added by Yanfly.
 * ** Action Sequence "MOVE: Move To Target(s)" is now changed so that if the
 *    "Melee Distance" value is set to 0, battlers will no longer stand a half
 *    body distance away. Added by Yanfly.
 * 
 * Version 1.16: December 4, 2020
 * * Bug Fixes!
 * ** Bug fixes made for the RPG Maker MZ base code. If a battler has no
 *    actions, then their action speed will not be Infinity. Fix by Olivia.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Completely replacing the whole party at once will no longer cause the
 *    battle system to crash. Fix made by Olivia.
 * ** Pre-Battle Common Events will no longer cancel out any win/lose branches.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Custom Action Sequences will no longer close the Actor Command Input
 *    window unless absolutely necessary (like for Show Message events) during
 *    Active TPB/ATB. Change made by Arisu.
 * 
 * Version 1.14: November 22, 2020
 * * Feature Update!
 * ** Natural Miss and Evasion motions now have flinch distance.
 *    Added by Yanfly.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Bug Fixes!
 * ** Failsafes added to prevent common events from running if they're empty.
 *    Fix made by Irina.
 * ** Skip Party Command will now work properly with TPB-based battle systems.
 *    Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** In preparation for upcoming VisuStella MZ plugins.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added clarity for the Plugin Parameters for the Common Events settings
 *    found in the mechanics section. The common events are only meant to run
 *    in the map scene and not for the battle scene. Update made by Irina.
 * * Feature Update!
 * ** The Plugin Parameter for Mechanics, Common Events (on Map), Defeat Event
 *    now has updated functionality. If this has a common event attached to it,
 *    then losing to random encounters will no longer send the player to the
 *    Game Over scene, but instead, send the player back to the map scene,
 *    where the Defeat Common Event will run. Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Action Sequence Plugin Command added by Olivia:
 * *** MECH: Custom Damage Formula
 * **** Changes the current action's damage formula to custom.
 *      This will assume the MANUAL damage style.
 * ** New Notetag added by Irina:
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Battleback Scaling Settings
 * **** These settings allow you to adjust how battlebacks scale to the screen
 *      in the game.
 * *** <Battler Sprite Grounded>
 * **** Prevents the enemy from being able to jumping and/or floating due to
 *      Action Sequences but still able to move. Useful for rooted enemies.
 * 
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** Exiting out of the Options menu scene or Party menu scene will no longer
 *    cause party members to reset their starting position. Fix made by Arisu
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** There was a documentation error with <JS Pre-Regenerate> and
 *    <JS Post-Regenerate>. Fix made by Yanfly.
 * *** Before, these were written as <JS Pre-Regenerate Turn> and
 *     <JS Post-Regenerate Turn>. The "Turn" part of the notetag has been
 *     removed in the documentation.
 * * Feature Update!
 * ** Damage sprites on actors are now centered relative to the actor's anchor.
 *    Change made by Yanfly.
 * * New Features!
 * ** New Action Sequence Plugin Command added by Yanfly:
 * *** MECH: Variable Popup
 * **** Causes the unit(s) to display a popup using the data stored inside
 *      a variable.
 * 
 * Version 1.08: October 11, 2020
 * * Bug Fixes!
 * ** Dead party members at the start of battle no longer start offscreen.
 *    Fix made by Arisu.
 * ** Removed party members from battle no longer count as moving battlers.
 *    Fix made by Yanfly.
 * ** Using specific motions should now have the weapons showing and not
 *    showing properly. Fix made by Yanfly.
 * 
 * Version 1.07: October 4, 2020
 * * Bug Fixes!
 * ** Adding and removing actors will now refresh the battle status display.
 *    Fix made by Irina.
 * ** Adding new states that would change the affected battler's state motion
 *    will automatically refresh the battler's motion. Fix made by Irina.
 * ** Boss Collapse animation fixed and will sink into the ground.
 *    Fix made by Irina.
 * ** Failsafes added for certain animation types. Fix made by Yanfly.
 * ** Freeze Motion for thrust, swing, and missile animations will now show the
 *    weapons properly. Fix made by Yanfly.
 * ** The Guard command will no longer display the costs of the Attack command.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Updated help file for newly added plugin parameters.
 * * Feature Updates!
 * ** When using the Change Battleback event command in battle, the game client
 *    will wait until both battlebacks are loaded before changing the both of
 *    them so that the appearance is synched together. Change made by Yanfly.
 * * New Features!
 * ** New plugin parameters added by Irina!
 * *** Plugin Parameters > Actor Battler Settings > Chant Style
 * **** What determines the chant motion? Hit type or skill type?
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Enemy Battler Plugin Parameter "Shadow Visible" should now work again.
 *    Fix made by Irina.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins. Added by Yanfly.
 * * Documentation Update!
 * ** Updated the help file for all the new plugin parameters.
 * * Feature Update!
 * ** Action Sequence "MECH: HP, MP, TP" will now automatically collapse an
 *    enemy if it has been killed by the effect.
 * ** All battle systems for front view will now have damage popups appear
 *    in front of the status window instead of just the Portrait battle layout.
 *    Update made by Yanfly.
 * * New Features!
 * ** New Action Sequence Plugin Commands from Irina!
 * *** MOTION: Clear Freeze Frame
 * *** MOTION: Freeze Motion Frame
 * **** You can freeze a battler's sprite's motion with a specific frame.
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Battle Layout: type> to change the battle layout style used for
 *     specific maps and/or troops.
 * ** New plugin parameters added by Yanfly!
 * *** Plugin Parameters > Battle Layout Settings > Command Window Width
 * **** This plugin parameter lets you adjust the window width for Party and
 *      Actor Command windows in the Default and List Battle Layout styles.
 * *** Plugin Parameters > Enemy Battler Settings > Name: Offset X
 * *** Plugin Parameters > Enemy Battler Settings > Name: Offset Y
 * **** These plugin parameters allow you to offset the position of the enemy
 *      name positions on the screen by a specific amount.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Actors now use their casting or charging animations again during TPB/ATB.
 *    Fix made by Yanfly.
 * ** Defeat requirement for enemies will no longer crash the game if turned on
 *    after creating
 * ** Escaping animation no longer has actors stay in place. Fixed by Yanfly.
 * ** Failsafes added for newly added weapon types that have not been adjusted
 *    in the Database > System 2 tab. Fixed by Irina.
 * ** Shadows now appear under the actor sprites. Fix made by Yanfly.
 * ** Victory during TPB will no longer cancel the victory animations of
 *    actors that will have their turn after. Fixed by Yanfly.
 * * Documentation Update!
 * ** All Anchor Plugin Parameter descriptions now state to use values between
 *    0 and 1 to be safe. Update made by Yanfly.
 * * Feature Update!
 * ** During Active TPB / ATB, canceling out of the actor command window will
 *    go directly into the party window without having to sort through all of
 *    the available active actors.
 * ** Going from the Party Command Window's Fight command will immediately
 *    return back to the actor command window that was canceled from.
 * * New Features!
 * ** Action Sequence Plugin Command "MOVE: Spin/Rotate" has been updated.
 * *** A new parameter has been added: "Revert Angle on Finish"
 * *** Added by Yanfly.
 * ** New plugin parameters have been added to Damage Settings.
 * *** Appear Position: Selects where you want popups to appear relative to the
 *     battler. Head, Center, Base. Added by Yanfly.
 * *** Offset X: Sets how much to offset the sprites by vertically.
 *     Added by Yanfly.
 * *** Offset Y: Sets how much to offset the sprites by horizontally.
 *     Added by Yanfly.
 * ** New plugin parameters have been added to Actor Battler Settings.
 * *** Priority: Active - Place the active actor on top of actor and
 *     enemy sprites. Added by Yanfly.
 * *** Priority: Actors - Prioritize actors over enemies when placing 
 *     sprites on top of each other. Added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Active Battler Sprites now remain on top and won't be hidden behind
 *    other sprites for better visual clarity. Fix made by Arisu.
 * ** Collapsing battlers will now show the dead motion properly. Fix made by
 *    Olivia.
 * ** Dead battlers can no longer be given immortality. Fix made by Olivia.
 * ** Going into the Options menu with no battleback set will no longer set a
 *    battle snapshot.
 * ** HP Gauges for Sideview Enemies are no longer flipped! Fix made by Yanfly.
 * ** Moving a dead battler would no longer reset their animation. Fix made by
 *    Olivia.
 * ** Pre-Battle Common Events now work with events instead of just random
 *    encounters. Fix made by Yanfly.
 * ** Sideview Enemy shadows no longer twitch. Fix made by Irina.
 * * Documentation Updates!
 * ** Added further explanations for Anchor X and Anchor Y plugin parameters.
 *    This is because there's a lot of confusion for users who aren't familiar
 *    with how sprites work. Added by Irina.
 * ** <Magic Reduction: x> notetag updated to say magical damage instead of
 *    physical damage. Fix made by Yanfly.
 * * New Features!
 * ** Additional Action Sequence Plugin Commands have been added in preparation
 *    of upcoming plugins! Additions made by Irina.
 * *** Action Sequences - Angle (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Camera (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Skew (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Zoom (for VisuMZ_3_ActSeqCamera)
 * ** Additional Action Sequence Plugin Commands have been made available now
 *    and added to Battle Core! Additions made by Irina.
 * *** MOVE: Scale/Grow/Shrink
 * *** MOVE: Skew/Distort
 * *** MOVE: Spin/Rotate
 * *** MOVE: Wait For Scale
 * *** MOVE: Wait For Skew
 * *** MOVE: Wait For Spin
 * ** Plugin Parameters Additions. Additions made by Irina.
 * *** Plugin Params > Actor Battler Settings > Offset X
 * *** Plugin Params > Actor Battler Settings > Offset Y
 * *** Plugin Params > Actor Battler Settings > Smooth Image
 * *** Plugin Params > Enemy Battler Settings > Offset X
 * *** Plugin Params > Enemy Battler Settings > Offset Y
 * *** Plugin Params > Enemy Battler Settings > Smooth Image
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Animated Battlers will refresh their motions from the death motion once
 *    they're revived instead of waiting for their next input phase. Fix made
 *    by Yanfly.
 * ** Battle Log speed sometimes went by too fast for certain enabled messages.
 *    Wait timers are now added to them, like state results, buff results, and
 *    debuff results. Fix made by Yanfly.
 * ** Boss Collapse animation now works properly. Fix made by Yanfly.
 * ** Freeze fix for TPB (Wait) if multiple actors get a turn at the same time.
 *    Fix made by Olivia.
 * ** Pressing cancel on a target window after selecting a single skill no
 *    longer causes the status window to twitch.
 * ** Sideview Enemies had a split frame of being visible if they were to start
 *    off hidden in battle. Fix made by Shaz.
 * * Compatibility Update:
 * ** Battle Core's Sprite_Damage.setup() function is now separated fro the
 *    default to allow for better compatibility. Made by Yanfly.
 * * Documentation Update:
 * ** Inserted more information for "Damage Popups" under "Major Changes"
 * * New Features!
 * ** <Magic Penetration: x>, <Magic Penetration: x%> notetags added.
 * ** <Magic Reduction: x>, <Magic Reduction: x%> notetags added.
 * ** <Battle UI Offset: +x, +y>, <Battle UI Offset X: +x>, and
 *    <Battle UI Offset Y: +y> notetags added for adjusting the positions of
 *    HP Gauges and State Icons.
 * *** Notetags added by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** Failsafes added for parsing battle targets. Fix made by Yanfly.
 * ** Immortality is no longer ignored by skills/items with the Normal Attack
 *    state effect. Fix made by Yanfly.
 * ** Miss and Evasion sound effects work again! Fix made by Yanfly.
 * ** Selecting "Escape" from the Actor Command Window will now have the
 *    Inputting Battler show its escape motion. Fix made by Yanfly.
 * ** Wait for Movement now applies to SV Enemies. Fix made by Yanfly.
 * * New Features!
 * ** Plugin Command "ACSET: Finish Action" now has an option to turn off the
 *    Immortality of targets. Feature added by Yanfly.
 * * Optimization Update
 * ** Uses less resources when making checks for Pre-Battle Battle Start events
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Plugin Parameters > Damage Settings > Damage Formats are now fixed.
 *    Fix made by Olivia.
 * ** TPB Battle System with Disable Party Command fixed. Fix made by Olivia.
 * ** States now show in list format if faces are disabled. Fix made by Yanfly.
 * ** The default damage styles were missing the 'v' variable to allow for
 *    variable data input. These are back now. Fix made by Yanfly.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Damage Settings > Style List > the style
 *     you want, and adding "const v = $gameVariables._data;" to JS: Formula
 * * New Notetags Added:
 * ** <Command Show Switch: x> added by Olivia
 * ** <Command Show All Switches: x,x,x> added by Olivia
 * ** <Command Show Any Switches: x,x,x> added by Olivia
 * ** <Command Hide Switch: x> added by Olivia
 * ** <Command Hide All Switches: x,x,x> added by Olivia
 * ** <Command Hide Any Switches: x,x,x> added by Olivia
 * ** <JS Command Visible> added by Olivia
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
 * @command ActionSequenceSpaceStart
 * @text -
 * @desc The following are Action Sequences commands/sets.
 * These Plugin Commands only work in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakSet
 * @text Action Sequence - Action Sets
 * @desc Action Sequence Action Sets are groups of commonly used
 * Action Sequence Commands put together for more efficient usage.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_SetupAction
 * @text ACSET: Setup Action Set
 * @desc The generic start to most actions.
 * 
 * @arg DisplayAction:eval
 * @text Display Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: On
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionStart:eval
 * @text Battle Step
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg CastAnimation:eval
 * @text Cast Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_WholeActionSet
 * @text ACSET: All Targets Action Set
 * @desc Affects all targets simultaneously performing the following.
 * 
 * @arg DualWield:eval
 * @text Dual/Multi Wield?
 * @type boolean
 * @on Apply
 * @off Don't
 * @desc Add times struck based on weapon quantity equipped?
 * @default false
 * 
 * @arg PerformAction:eval
 * @text Perform Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed
 * 
 * @arg ActionAnimation:eval
 * @text Action Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionEffect:eval
 * @text Action Effect
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_TargetActionSet
 * @text ACSET: Each Target Action Set
 * @desc Goes through each target one by one to perform the following.
 * 
 * @arg DualWield:eval
 * @text Dual/Multi Wield?
 * @type boolean
 * @on Apply
 * @off Don't
 * @desc Add times struck based on weapon quantity equipped?
 * @default false
 * 
 * @arg PerformAction:eval
 * @text Perform Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount1:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed
 * 
 * @arg ActionAnimation:eval
 * @text Action Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount2:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed * 2
 * 
 * @arg ActionEffect:eval
 * @text Action Effect
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_FinishAction
 * @text ACSET: Finish Action
 * @desc The generic ending to most actions.
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForNewLine:eval
 * @text Wait For New Line
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForEffect:eval
 * @text Wait For Effects
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ClearBattleLog:eval
 * @text Clear Battle Log
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionEnd:eval
 * @text Home Reset
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceAngle
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakAngle
 * @text Action Sequences - Angle
 * @desc Allows you to have control over the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_ChangeAngle
 * @text ANGLE: Change Angle
 * @desc Changes the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Angle:eval
 * @text Angle
 * @desc Change the camera angle to this many degrees.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change camera angle.
 * @default 60
 *
 * @arg EasingType:str
 * @text Angle Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForAngle:eval
 * @text Wait For Angle?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for angle changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Angle_Reset
 * @text ANGLE: Reset Angle
 * @desc Reset any angle settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset camera angle.
 * @default 60
 *
 * @arg EasingType:str
 * @text Angle Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForAngle:eval
 * @text Wait For Angle?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for angle changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Angle_WaitForAngle
 * @text ANGLE: Wait For Angle
 * @desc Waits for angle changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceAnimation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakAnimation
 * @text Action Sequences - Animations
 * @desc These Action Sequences are related to the 'Animations' that
 * can be found in the Animations tab of the Database.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ActionAnimation
 * @text ANIM: Action Animation
 * @desc Plays the animation associated with the action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_AttackAnimation
 * @text ANIM: Attack Animation
 * @desc Plays the animation associated with the user's 1st weapon.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_AttackAnimation2
 * @text ANIM: Attack Animation 2+
 * @desc Plays the animation associated with the user's other weapons.
 * Plays nothing if there is no other weapon equipped.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Slot:eval
 * @text Slot
 * @desc Which weapon slot to get this data from?
 * Main-hand weapon is weapon slot 1.
 * @default 2
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_CastAnimation
 * @text ANIM: Cast Animation
 * @desc Plays the cast animation associated with the action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["user"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ChangeBattlePortrait
 * @text ANIM: Change Battle Portrait
 * @desc Changes the battle portrait of the actor (if it's an actor).
 * Can be used outside of battle/action sequences.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to change the portraits for.
 * Valid units can only be actors.
 * @default ["user"]
 * 
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Select the file to change the actor's portrait to.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ShowAnimation
 * @text ANIM: Show Animation
 * @desc Plays the a specific animation on unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg AnimationID:num
 * @text Animation ID
 * @type animation
 * @desc Select which animation to play on unit(s).
 * @default 1
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_WaitForAnimation
 * @text ANIM: Wait For Animation
 * @desc Causes the interpreter to wait for any animation(s) to finish.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceBattleLog
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakBattleLog
 * @text Action Sequences - Battle Log
 * @desc These Action Sequences are related to the Battle Log Window,
 * the window found at the top of the battle screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_AddText
 * @text BTLOG: Add Text
 * @desc Adds a new line of text into the Battle Log.
 * 
 * @arg Text:str
 * @text Text
 * @desc Add this text into the Battle Log.
 * Text codes allowed.
 * @default Insert text here.
 * 
 * @arg CopyCombatLog:eval
 * @text Copy to Combat Log?
 * @type boolean
 * @on Copy Text
 * @off Don't Copy
 * @desc Copies text to the Combat Log.
 * Requires VisuMZ_4_CombatLog
 * @default true
 *
 * @arg CombatLogIcon:num
 * @text Combat Log Icon
 * @parent CopyCombatLog:eval
 * @desc What icon would you like to bind to this entry?
 * Requires VisuMZ_4_CombatLog
 * @default 87
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_Clear
 * @text BTLOG: Clear Battle Log
 * @desc Clears all the text in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_DisplayAction
 * @text BTLOG: Display Action
 * @desc Displays the current action in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_PopBaseLine
 * @text BTLOG: Pop Base Line
 * @desc Removes the Battle Log's last added base line and 
 * all text up to its former location.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_PushBaseLine
 * @text BTLOG: Push Base Line
 * @desc Adds a new base line to where the Battle Log currently is at.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_Refresh
 * @text BTLOG: Refresh Battle Log
 * @desc Refreshes the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_UI
 * @text BTLOG: UI Show/Hide
 * @desc Shows or hides the Battle UI (including the Battle Log).
 * 
 * @arg ShowHide:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides the Battle UI.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_WaitForBattleLog
 * @text BTLOG: Wait For Battle Log
 * @desc Causes the interpreter to wait for the Battle Log to finish.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_WaitForNewLine
 * @text BTLOG: Wait For New Line
 * @desc Causes the interpreter to wait for a new line in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceCamera
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakCamera
 * @text Action Sequences - Camera
 * @desc Allows you to have control over the camera.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Clamp
 * @text CAMERA: Clamp ON/OFF
 * @desc Turns battle camera clamping on/off.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Setting:eval
 * @text ON/OFF
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Turns camera clamping on/off.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_FocusPoint
 * @text CAMERA: Focus Point
 * @desc Focus the battle camera on a certain point in the screen.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg FocusX:eval
 * @text X Coordinate
 * @desc Insert the point to focus the camera on.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg FocusY:eval
 * @text Y Coordinate
 * @desc Insert the point to focus the camera on.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for camera focus change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_FocusTarget
 * @text CAMERA: Focus Target(s)
 * @desc Focus the battle camera on certain battler target(s).
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to focus the battle camera on.
 * @default ["user"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for camera focus change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Offset
 * @text CAMERA: Offset
 * @desc Offset the battle camera from the focus target.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @desc How much to offset the camera X by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc How much to offset the camera Y by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for offset change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Reset
 * @text CAMERA: Reset
 * @desc Reset the battle camera settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg ResetFocus:eval
 * @text Reset Focus?
 * @type boolean
 * @on On
 * @off Off
 * @desc Reset the focus point?
 * @default true
 * 
 * @arg ResetOffset:eval
 * @text Reset Offset?
 * @type boolean
 * @on On
 * @off Off
 * @desc Reset the camera offset?
 * @default true
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for reset change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_WaitForCamera
 * @text CAMERA: Wait For Camera
 * @desc Waits for camera to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 *
 * @command ActionSequenceSpaceDragonbones
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreaDragonbones
 * @text Action Sequences - Dragonbones
 * @desc These Action Sequences are Dragonbones-related.
 * Requires VisuMZ_2_DragonbonesUnion!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_DB_DragonbonesMotionAni
 * @text DB: Dragonbones Animation
 * @desc Causes the unit(s) to play a Dragonbones motion animation.
 * Requires VisuMZ_2_DragonbonesUnion!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion animation.
 * @default ["user"]
 *
 * @arg MotionAni:str
 * @text Motion Animation
 * @desc What is the name of the Dragonbones motion animation you wish to play?
 * @default attack
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_DB_DragonbonesTimeScale
 * @text DB: Dragonbones Time Scale
 * @desc Causes the unit(s) to change their Dragonbones time scale.
 * Requires VisuMZ_2_DragonbonesUnion!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion animation.
 * @default ["user"]
 *
 * @arg TimeScale:num
 * @text Time Scale
 * @desc Change the value of the Dragonbones time scale to this.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceElements
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakElements
 * @text Action Sequences - Elements
 * @desc These Action Sequences are related to elements.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_AddElements
 * @text ELE: Add Elements
 * @desc Adds element(s) to be used when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @arg Elements:arraynum
 * @text Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which element ID to add onto the action.
 * Insert multiple element ID's to add multiple at once.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_Clear
 * @text ELE: Clear Element Changes
 * @desc Clears all element changes made through Action Sequences.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_ForceElements
 * @text ELE: Force Elements
 * @desc Forces only specific element(s) when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @arg Elements:arraynum
 * @text Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which element ID to force in the action.
 * Insert multiple element ID's to force multiple at once.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_NullElements
 * @text ELE: Null Element
 * @desc Forces no element to be used when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceHorror
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakHorror
 * @text Action Sequences - Horror Effects
 * @desc These Action Sequences are Horror Effects-related.
 * Requires VisuMZ_2_HorrorEffects!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_Clear
 * @text HORROR: Clear All Filters
 * @desc Clear all Horror Effects filters on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove Horror Effects for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_GlitchCreate
 * @text HORROR: Glitch Create
 * @desc Creates the glitch effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create the Horror Effect for.
 * @default ["user"]
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_GlitchRemove
 * @text HORROR: Glitch Remove
 * @desc Removes the glitch effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove the Horror Effect for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_NoiseCreate
 * @text HORROR: Noise Create
 * @desc Creates the noise effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create the Horror Effect for.
 * @default ["user"]
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_NoiseRemove
 * @text HORROR: Noise Remove
 * @desc Removes the noise effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove the Horror Effect for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_TVCreate
 * @text HORROR: TV Create
 * @desc Creates the TV effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create the Horror Effect for.
 * @default ["user"]
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_TVRemove
 * @text HORROR: TV Remove
 * @desc Removes the TV effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove the Horror Effect for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceImpact
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakImpact
 * @text Action Sequences - Impact
 * @desc These Action Sequences are related to creating impact.
 * Requires VisuMZ_3_ActSeqImpact!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ColorBreak
 * @text IMPACT: Color Break
 * @desc Breaks the colors on the screen before reassembling.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Intensity:eval
 * @text Intensity
 * @desc What is the intensity of the color break effect?
 * @default 60
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the color break effect?
 * @default 60
 *
 * @arg EasingType:str
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
 * @default OutBack
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionBlurScreen
 * @text IMPACT: Motion Blur Screen
 * @desc Creates a motion blur on the whole screen.
 * Requires VisuMZ_3_ActSeqImpact!
 *
 * @arg Angle:eval
 * @text Angle
 * @desc Determine what angle to make the motion blur at.
 * @default Math.randomInt(360)
 *
 * @arg Rate:eval
 * @text Intensity Rate
 * @desc This determines intensity rate of the motion blur.
 * Use a number between 0 and 1.
 * @default 0.1
 *
 * @arg Duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion blur last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg EasingType:str
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
 * @default InOutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionBlurTarget
 * @text IMPACT: Motion Blur Target(s)
 * @desc Creates a motion blur on selected target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create motion blur effects for.
 * @default ["user"]
 *
 * @arg Angle:eval
 * @text Angle
 * @desc Determine what angle to make the motion blur at.
 * @default Math.randomInt(360)
 *
 * @arg Rate:eval
 * @text Intensity Rate
 * @desc This determines intensity rate of the motion blur.
 * Use a number between 0 and 1.
 * @default 0.5
 *
 * @arg Duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion blur last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg EasingType:str
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
 * @default InOutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionTrailCreate
 * @text IMPACT: Motion Trail Create
 * @desc Creates a motion trail effect for the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create motion trail effects for.
 * @default ["user"]
 *
 * @arg delay:num
 * @text Delay
 * @type Number
 * @min 1
 * @desc How many frames to delay by when creating a motion trail?
 * The higher the delay, the less after images there are.
 * @default 1
 *
 * @arg duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion trail last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg hue:num
 * @text Hue
 * @type Number
 * @min 0
 * @max 255
 * @desc What do you want to be the hue for the motion trail?
 * @default 0
 *
 * @arg opacityStart:num
 * @text Starting Opacity
 * @type Number
 * @min 0
 * @max 255
 * @desc What starting opacity value do you want for the motion
 * trail? Opacity values decrease over time.
 * @default 200
 *
 * @arg tone:eval
 * @text Tone
 * @desc What tone do you want for the motion trail?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionTrailRemove
 * @text IMPACT: Motion Trail Remove
 * @desc Removes the motion trail effect from the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to clear motion trail effects for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwavePoint
 * @text IMPACT: Shockwave at Point
 * @desc Creates a shockwave at the designated coordinates.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Coordinates
 * 
 * @arg X:eval
 * @text Point: X
 * @parent Coordinates
 * @desc What x coordinate do you want to create a shockwave at?
 * You can use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg Y:eval
 * @text Point: Y
 * @parent Coordinates
 * @desc What y coordinate do you want to create a shockwave at?
 * You can use JavaScript code.
 * @default (Graphics.height - 200) / 2
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwaveEachTargets
 * @text IMPACT: Shockwave from Each Target(s)
 * @desc Creates a shockwave at each of the target(s) location(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a shockwave from.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a shockwave from.
 * @default middle center
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @parent TargetLocation:str
 * @desc How much to offset the shockwave X point by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent TargetLocation:str
 * @desc How much to offset the shockwave Y point by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwaveCenterTargets
 * @text IMPACT: Shockwave from Target(s) Center
 * @desc Creates a shockwave from the center of the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a shockwave from.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a shockwave from.
 * @default middle center
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @parent TargetLocation:str
 * @desc How much to offset the shockwave X point by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent TargetLocation:str
 * @desc How much to offset the shockwave Y point by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ZoomBlurPoint
 * @text IMPACT: Zoom Blur at Point
 * @desc Creates a zoom blur at the designated coordinates.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Coordinates
 * 
 * @arg X:eval
 * @text Point: X
 * @parent Coordinates
 * @desc What x coordinate do you want to focus the zoom at?
 * You can use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg Y:eval
 * @text Point: Y
 * @parent Coordinates
 * @desc What y coordinate do you want to focus the zoom at?
 * You can use JavaScript code.
 * @default (Graphics.height - 200) / 2
 * 
 * @arg Strength:eval
 * @text Zoom Strength
 * @desc What is the strength of the zoom effect?
 * Use a number between 0 and 1.
 * @default 0.5
 * 
 * @arg Radius:eval
 * @text Visible Radius
 * @desc How much of a radius should be visible from the center?
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the zoom blur?
 * @default 60
 *
 * @arg EasingType:str
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
 * @default OutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ZoomBlurTargetCenter
 * @text IMPACT: Zoom Blur at Target(s) Center
 * @desc Creates a zoom blur at the center of targets.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a zoom blur from.
 * @default ["user"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a zoom blur from.
 * @default middle center
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @parent TargetLocation:str
 * @desc How much to offset the zoom blur X point by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent TargetLocation:str
 * @desc How much to offset the zoom blur Y point by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Strength:eval
 * @text Zoom Strength
 * @desc What is the strength of the zoom effect?
 * Use a number between 0 and 1.
 * @default 0.5
 * 
 * @arg Radius:eval
 * @text Visible Radius
 * @desc How much of a radius should be visible from the center?
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the zoom blur?
 * @default 60
 *
 * @arg EasingType:str
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
 * @default OutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMechanics
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMechanics
 * @text Action Sequences - Mechanics
 * @desc These Action Sequences are related to various mechanics
 * related to the battle system.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_ActionEffect
 * @text MECH: Action Effect
 * @desc Causes the unit(s) to take damage/healing from action and
 * incurs any changes made such as buffs and states.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the current action's effects.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AddBuffDebuff
 * @text MECH: Add Buff/Debuff
 * @desc Adds buff(s)/debuff(s) to unit(s). 
 * Determine which parameters are affected and their durations.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the buff(s) and/or debuff(s).
 * @default ["user"]
 * 
 * @arg Buffs:arraystr
 * @text Buff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which parameter(s) to buff.
 * Insert a parameter multiple times to raise its stacks.
 * @default ["ATK"]
 *
 * @arg Debuffs:arraystr
 * @text Debuff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which parameter(s) to debuff.
 * Insert a parameter multiple times to raise its stacks.
 * @default ["DEF"]
 * 
 * @arg Turns:eval
 * @text Turns
 * @desc Number of turns to set the parameter(s) buffs to.
 * You may use JavaScript code.
 * @default 5
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AddState
 * @text MECH: Add State
 * @desc Adds state(s) to unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the buff(s).
 * @default ["user"]
 * 
 * @arg States:arraynum
 * @text States
 * @type state[]
 * @desc Select which state ID(s) to add to unit(s).
 * Insert multiple state ID's to add multiple at once.
 * @default ["4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AnalyzeWeakness
 * @text MECH: Analyze Weakness
 * @desc Reveal elemental weakness(es) from target(s).
 * Requires VisuMZ_3_WeaknessDisplay!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to reveal elemental weaknesses for.
 * @default ["all targets"]
 * 
 * @arg Reveal:eval
 * @text Reveal
 * @desc How many elemental weaknesses do you wish to reveal?
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_ArmorPenetration
 * @text MECH: Armor Penetration
 * @desc Adds an extra layer of defensive penetration/reduction.
 * You may use JavaScript code for any of these.
 *
 * @arg ArmorPenetration
 * @text Armor/Magic Penetration
 * 
 * @arg ArPenRate:eval
 * @text Rate
 * @parent ArmorPenetration
 * @desc Penetrates an extra multiplier of armor by this value.
 * @default 0.00
 * 
 * @arg ArPenFlat:eval
 * @text Flat
 * @parent ArmorPenetration
 * @desc Penetrates a flat amount of armor by this value.
 * @default 0
 *
 * @arg ArmorReduction
 * @text Armor/Magic Reduction
 * 
 * @arg ArRedRate:eval
 * @text Rate
 * @parent ArmorReduction
 * @desc Reduces an extra multiplier of armor by this value.
 * @default 0.00
 * 
 * @arg ArRedFlat:eval
 * @text Flat
 * @parent ArmorReduction
 * @desc Reduces a flat amount of armor by this value.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AtbGauge
 * @text MECH: ATB Gauge
 * @desc Alters the ATB/TPB Gauges.
 * Requires VisuMZ_2_BattleSystemATB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the ATB/TPB Gauges for.
 * @default ["all targets"]
 *
 * @arg Charging
 * 
 * @arg ChargeRate:eval
 * @text Charge Rate
 * @parent Charging
 * @desc Changes made to the ATB Gauge if it is currently charging.
 * @default -0.00
 * 
 * @arg Casting
 * 
 * @arg CastRate:eval
 * @text Cast Rate
 * @parent Casting
 * @desc Changes made to the ATB Gauge if it is currently casting.
 * @default -0.00
 * 
 * @arg Interrupt:eval
 * @text Interrupt?
 * @parent Casting
 * @type boolean
 * @on Interrupt
 * @off Don't Interrupt
 * @desc Interrupt the ATB Gauge if it is currently casting?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_BoostPointsChange
 * @text MECH: Boost Points Change
 * @desc Changes Boost Points for target(s).
 * Requires VisuMZ_3_BoostAction!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the Boost Points for.
 * @default ["user"]
 * 
 * @arg BoostPoints:eval
 * @text Alter Boost Points By
 * @desc Alters the unit(s) Boost Points.
 * Positive for gaining points. Negative for losing points.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_BoostPointsStoreData
 * @text MECH: Boost Store Data
 * @desc Stores the number of Boosts used this action inside a variable.
 * Requires VisuMZ_3_BoostAction!
 * 
 * @arg VariableID:num
 * @text Variable ID
 * @type variable
 * @desc Which variable do you want to store the data inside?
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_BreakShieldChange
 * @text MECH: Break Shield Change
 * @desc Changes Break Shields for target(s) if not Break Stunned.
 * Requires VisuMZ_4_BreakShields!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the Break Shields for.
 * @default ["all targets"]
 * 
 * @arg BreakShields:eval
 * @text Alter Break Shields By
 * @desc Alters the unit(s) Break Shields.
 * Positive for gaining shields. Negative for losing shields.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_BreakShieldReset
 * @text MECH: Break Shield Reset
 * @desc Resets Break Shields for target(s) if not Break Stunned.
 * Requires VisuMZ_4_BreakShields!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to reset the Break Shields for.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_BtbGain
 * @text MECH: BTB Brave Points
 * @desc Alters the target(s) Brave Points to an exact value.
 * Requires VisuMZ_2_BattleSystemBTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the ATB/TPB Gauges for.
 * @default ["all targets"]
 * 
 * @arg BravePoints:eval
 * @text Alter Brave Points By
 * @desc Alters the target(s) Brave Points.
 * Positive for gaining BP. Negative for losing BP.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Collapse
 * @text MECH: Collapse
 * @desc Causes the unit(s) to perform its collapse animation
 * if the unit(s) has died.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to process a death collapse.
 * @default ["all targets"]
 * 
 * @arg ForceDeath:eval
 * @text Force Death
 * @type boolean
 * @on On
 * @off Off
 * @desc Force death even if the unit has not reached 0 HP?
 * This will remove immortality.
 * @default false
 * 
 * @arg WaitForEffect:eval
 * @text Wait For Effect?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for the collapse effect to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CtbOrder
 * @text MECH: CTB Order
 * @desc Alters the CTB Turn Order.
 * Requires VisuMZ_2_BattleSystemCTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the CTB Turn Order for.
 * @default ["all targets"]
 *
 * @arg ChangeOrderBy:eval
 * @text Change Order By
 * @parent Charging
 * @desc Changes turn order for target(s) by this amount.
 * Positive increases wait. Negative decreases wait.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CtbSpeed
 * @text MECH: CTB Speed
 * @desc Alters the CTB Speed.
 * Requires VisuMZ_2_BattleSystemCTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the CTB Speed for.
 * @default ["all targets"]
 *
 * @arg ChargeRate:eval
 * @text Charge Rate
 * @parent Charging
 * @desc Changes made to the CTB Speed if it is currently charging.
 * @default -0.00
 * 
 * @arg CastRate:eval
 * @text Cast Rate
 * @parent Casting
 * @desc Changes made to the CTB Speed if it is currently casting.
 * @default -0.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CustomDmgFormula
 * @text MECH: Custom Damage Formula
 * @desc Changes the current action's damage formula to custom.
 * This will assume the MANUAL damage style.
 * 
 * @arg Formula:str
 * @text Formula
 * @desc Changes the current action's damage formula to custom.
 * Use 'default' to revert the damage formula.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_DamagePopup
 * @text MECH: Damage Popup
 * @desc Causes the unit(s) to display the current state of
 * damage received or healed.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a damage popup.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_DeathBreak
 * @text MECH: Dead Label Jump
 * @desc If the active battler is dead, jump to a specific label in the common event.
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If the active battler is dead, jump to this specific label in the common event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_FtbAction
 * @text MECH: FTB Action Count
 * @desc Alters the subject team's available Action Count.
 * Requires VisuMZ_2_BattleSystemFTB!
 * 
 * @arg ActionCount:eval
 * @text Action Count
 * @desc Alters the subject team's available Action Count.
 * Positive for gaining actions. Negative for losing actions.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_HpMpTp
 * @text MECH: HP, MP, TP
 * @desc Alters the HP, MP, and TP values for unit(s).
 * Positive values for healing. Negative values for damage.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the current action's effects.
 * @default ["user"]
 *
 * @arg HP
 * 
 * @arg HP_Rate:eval
 * @text HP Rate
 * @parent HP
 * @desc Changes made to HP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg HP_Flat:eval
 * @text HP Flat
 * @parent HP
 * @desc Flat changes made to HP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 * 
 * @arg MP
 * 
 * @arg MP_Rate:eval
 * @text MP Rate
 * @parent MP
 * @desc Changes made to MP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg MP_Flat:eval
 * @text MP Flat
 * @parent MP
 * @desc Flat changes made to MP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 *
 * @arg TP
 * 
 * @arg TP_Rate:eval
 * @text TP Rate
 * @parent TP
 * @desc Changes made to TP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg TP_Flat:eval
 * @text TP Flat
 * @parent TP
 * @desc Flat changes made to TP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 * 
 * @arg ShowPopup:eval
 * @text Damage Popup?
 * @type boolean
 * @on On
 * @off Off
 * @desc Display a damage popup after?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Immortal
 * @text MECH: Immortal
 * @desc Changes the immortal flag of targets. If immortal flag is
 * removed and a unit would die, collapse that unit.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Alter the immortal flag of these groups. If immortal flag
 * is removed and a unit would die, collapse that unit.
 * @default ["user","all targets"]
 * 
 * @arg Immortal:eval
 * @text Immortal
 * @type boolean
 * @on On
 * @off Off
 * @desc Turn immortal flag for unit(s) on/off?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Multipliers
 * @text MECH: Multipliers
 * @desc Changes the multipliers for the current action.
 * You may use JavaScript code for any of these.
 *
 * @arg CriticalHit
 * @text Critical Hit%
 * 
 * @arg CriticalHitRate:eval
 * @text Rate
 * @parent CriticalHit
 * @desc Affects chance to land a critical hit by this multiplier.
 * @default 1.00
 * 
 * @arg CriticalHitFlat:eval
 * @text Flat
 * @parent CriticalHit
 * @desc Affects chance to land a critical hit by this flat bonus.
 * @default +0.00
 *
 * @arg CriticalDmg
 * @text Critical Damage
 * 
 * @arg CriticalDmgRate:eval
 * @text Rate
 * @parent CriticalDmg
 * @desc Affects critical damage by this multiplier.
 * @default 1.00
 * 
 * @arg CriticalDmgFlat:eval
 * @text Flat
 * @parent CriticalDmg
 * @desc Affects critical damage by this flat bonus.
 * @default +0.00
 *
 * @arg Damage
 * @text Damage/Healing
 * 
 * @arg DamageRate:eval
 * @text Rate
 * @parent Damage
 * @desc Sets the damage/healing multiplier for current action.
 * @default 1.00
 * 
 * @arg DamageFlat:eval
 * @text Flat
 * @parent Damage
 * @desc Sets the damage/healing bonus for current action.
 * @default +0.00
 *
 * @arg HitRate
 * @text Hit Rate
 * 
 * @arg HitRate:eval
 * @text Rate
 * @parent HitRate
 * @desc Affects chance to connect attack by this multiplier.
 * @default 1.00
 * 
 * @arg HitFlat:eval
 * @text Flat
 * @parent HitRate
 * @desc Affects chance to connect attack by this flat bonus.
 * @default +0.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_RemoveBuffDebuff
 * @text MECH: Remove Buff/Debuff
 * @desc Removes buff(s)/debuff(s) from unit(s). 
 * Determine which parameters are removed.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to have the buff(s) and/or debuff(s) removed.
 * @default ["user"]
 * 
 * @arg Buffs:arraystr
 * @text Buff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which buffed parameter(s) to remove.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @arg Debuffs:arraystr
 * @text Debuff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which debuffed parameter(s) to remove.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_RemoveState
 * @text MECH: Remove State
 * @desc Remove state(s) from unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to have states removed from.
 * @default ["user"]
 * 
 * @arg States:arraynum
 * @text States
 * @type state[]
 * @desc Select which state ID(s) to remove from unit(s).
 * Insert multiple state ID's to remove multiple at once.
 * @default ["4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_StbExploit
 * @text MECH: STB Exploit Effect
 * @desc Utilize the STB Exploitation mechanics!
 * Requires VisuMZ_2_BattleSystemSTB!
 * 
 * @arg Exploited:eval
 * @text Target(s) Exploited?
 * @type boolean
 * @on Exploit
 * @off Don't
 * @desc Exploit the below targets?
 * @default true
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to become exploited.
 * @default ["all targets"]
 * 
 * @arg ForceExploited:eval
 * @text Force Exploitation
 * @type boolean
 * @on Force
 * @off Don't
 * @desc Force the exploited status?
 * @default false
 * 
 * @arg Exploiter:eval
 * @text User Exploiter?
 * @type boolean
 * @on Exploit
 * @off Don't
 * @desc Allow the user to become the exploiter?
 * @default true
 * 
 * @arg ForceExploited:eval
 * @text Force Exploitation
 * @type boolean
 * @on Force
 * @off Don't
 * @desc Force the exploiter status?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_StbExtraAction
 * @text MECH: STB Extra Action
 * @desc Adds an extra action for the currently active battler.
 * Requires VisuMZ_2_BattleSystemSTB!
 * 
 * @arg Actions:eval
 * @text Extra Actions
 * @parent Charging
 * @desc How many extra actions should the active battler gain?
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_StbRemoveExcessActions
 * @text MECH: STB Remove Excess Actions
 * @desc Removes excess actions from the active battler.
 * Requires VisuMZ_2_BattleSystemSTB!
 * 
 * @arg Actions:eval
 * @text Remove Actions
 * @parent Charging
 * @desc How many actions to remove from the active battler?
 * You may use JavaScript code.
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_SwapWeapon
 * @text MECH: Swap Weapon
 * @desc Causes the unit(s) to swap their weapon for another.
 * Requires VisuMZ_2_WeaponSwapSystem!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to swap weapons for.
 * @default ["user"]
 * 
 * @arg WeaponTypeID:eval
 * @text Weapon Type ID
 * @desc Which weapon type to swap to?
 * This is NOT the weapon's ID. It's the weapon TYPE.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_TextPopup
 * @text MECH: Text Popup
 * @desc Causes the unit(s) to display a text popup.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a text popup.
 * @default ["target"]
 * 
 * @arg Text:str
 * @text Text
 * @desc What text do you wish to display?
 * @default Text
 * 
 * @arg TextColor:str
 * @text Text Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @arg FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @arg FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_VariablePopup
 * @text MECH: Variable Popup
 * @desc Causes the unit(s) to display a popup using the data
 * stored inside a variable.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a text popup.
 * @default ["target"]
 * 
 * @arg Variable:num
 * @text Variable ID
 * @type variable
 * @desc Get data from which variable to display as a popup?
 * @default 1
 * 
 * @arg DigitGrouping:eval
 * @text Digit Grouping
 * @parent Variable:num
 * @type boolean
 * @on Group Digits
 * @off Don't Group
 * @desc Use digit grouping to separate numbers?
 * Requires VisuMZ_0_CoreEngine!
 * @default true
 * 
 * @arg TextColor:str
 * @text Text Color
 * @parent Variable:num
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @arg FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 0, 0, 0]
 * 
 * @arg FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_WaitForEffect
 * @text MECH: Wait For Effect
 * @desc Waits for the effects to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMotion
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMotion
 * @text Action Sequences - Motion
 * @desc These Action Sequences allow you the ability to control
 * the motions of sideview sprites.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_ClearFreezeFrame
 * @text MOTION: Clear Freeze Frame
 * @desc Clears any freeze frames from the unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to clear freeze frames for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_FreezeMotionFrame
 * @text MOTION: Freeze Motion Frame
 * @desc Forces a freeze frame instantly at the selected motion.
 * Automatically clears with a new motion.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to freeze motions for.
 * @default ["user"]
 *
 * @arg MotionType:str
 * @text Motion Type
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Freeze this motion for the unit(s).
 * @default attack
 * 
 * @arg Frame:num
 * @text Frame Index
 * @desc Which frame do you want to freeze the motion on?
 * Frame index values start at 0.
 * @default 2
 *
 * @arg ShowWeapon:eval
 * @text Show Weapon?
 * @type combo
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If using 'attack', 'thrust', 'swing', or 'missile',
 * display the weapon sprite?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_MotionType
 * @text MOTION: Motion Type
 * @desc Causes the unit(s) to play the selected motion.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion.
 * @default ["user"]
 *
 * @arg MotionType:str
 * @text Motion Type
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default attack
 *
 * @arg ShowWeapon:eval
 * @text Show Weapon?
 * @type combo
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If using 'attack', 'thrust', 'swing', or 'missile',
 * display the weapon sprite?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_PerformAction
 * @text MOTION: Perform Action
 * @desc Causes the unit(s) to play the proper motion based
 * on the current action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_RefreshMotion
 * @text MOTION: Refresh Motion
 * @desc Cancels any set motions unit(s) has to do and use
 * their most natural motion at the moment.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to refresh their motion state.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_WaitMotionFrame
 * @text MOTION: Wait By Motion Frame
 * @desc Creates a wait equal to the number of motion frames passing.
 * Time is based on Plugin Parameters => Actors => Motion Speed.
 *
 * @arg MotionFrameWait:num
 * @text Motion Frames to Wait?
 * @type number
 * @min 1
 * @desc Each "frame" is equal to the value found in
 * Plugin Parameters => Actors => Motion Speed
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMovement
 * @text Action Sequences - Movement
 * @desc These Action Sequences allow you the ability to control
 * the sprites of actors and enemies in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_BattleStep
 * @text MOVE: Battle Step
 * @desc Causes the unit(s) to move forward past their home position
 * to prepare for action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FaceDirection
 * @text MOVE: Face Direction
 * @desc Causes the unit(s) to face forward or backward.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Direction:str
 * @text Direction
 * @type combo
 * @option forward
 * @option backward
 * @option random
 * @desc Select which direction to face.
 * @default forward
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FacePoint
 * @text MOVE: Face Point
 * @desc Causes the unit(s) to face a point on the screen.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Point:str
 * @text Point
 * @type combo
 * @option home
 * @option center
 * @option point x, y
 * @desc Select which point to face.
 * Replace 'x' and 'y' with coordinates
 * @default home
 * 
 * @arg FaceAway:eval
 * @text Face Away From?
 * @type boolean
 * @on Turn Away
 * @off Face Directly
 * @desc Face away from the point instead?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FaceTarget
 * @text MOVE: Face Target(s)
 * @desc Causes the unit(s) to face other targets on the screen.
 * Sideview-only!
 * 
 * @arg Targets1:arraystr
 * @text Targets (facing)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Targets2:arraystr
 * @text Targets (destination)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) for the turning unit(s) to face.
 * @default ["current target"]
 * 
 * @arg FaceAway:eval
 * @text Face Away From?
 * @type boolean
 * @on Turn Away
 * @off Face Directly
 * @desc Face away from the unit(s) instead?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Float
 * @text MOVE: Float
 * @desc Causes the unit(s) to float above the ground.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make float.
 * @default ["user"]
 * 
 * @arg Height:eval
 * @text Desired Height
 * @desc Vertical distance to float upward.
 * You may use JavaScript code.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total float amount.
 * @default 12
 *
 * @arg EasingType:str
 * @text Float Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForFloat:eval
 * @text Wait For Float?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for floating to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_HomeReset
 * @text MOVE: Home Reset
 * @desc Causes the unit(s) to move back to their home position(s)
 * and face back to their original direction(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["alive battlers"]
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Jump
 * @text MOVE: Jump
 * @desc Causes the unit(s) to jump into the air.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make jump.
 * @default ["user"]
 * 
 * @arg Height:eval
 * @text Desired Height
 * @desc Max jump height to go above the ground
 * You may use JavaScript code.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total jump amount.
 * @default 12
 * 
 * @arg WaitForJump:eval
 * @text Wait For Jump?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for jumping to complete before performing next command?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveBy
 * @text MOVE: Move Distance
 * @desc Moves unit(s) by a distance from their current position(s).
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 *
 * @arg DistanceAdjust:str
 * @text Distance Adjustment
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to distance values to determine
 * which direction to move unit(s).
 * @default horz
 * 
 * @arg DistanceX:eval
 * @text Distance: X
 * @parent DistanceAdjust:str
 * @desc Horizontal distance to move.
 * You may use JavaScript code.
 * @default 48
 * 
 * @arg DistanceY:eval
 * @text Distance: Y
 * @parent DistanceAdjust:str
 * @desc Vertical distance to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveToPoint
 * @text MOVE: Move To Point
 * @desc Moves unit(s) to a designated point on the screen.
 * Sideview-only! Points based off Graphics.boxWidth/Height.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg Destination:str
 * @text Destination Point
 * @type combo
 * @option home
 * @option center
 * @option point x, y
 * @desc Select which point to face.
 * Replace 'x' and 'y' with coordinates
 * @default home
 *
 * @arg OffsetAdjust:str
 * @text Offset Adjustment
 * @parent Destination:str
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to offset values to determine
 * which direction to adjust the destination by.
 * @default horz
 * 
 * @arg OffsetX:eval
 * @text Offset: X
 * @parent OffsetAdjust:str
 * @desc Horizontal offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg OffsetY:eval
 * @text Offset: Y
 * @parent OffsetAdjust:str
 * @desc Vertical offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveToTarget
 * @text MOVE: Move To Target(s)
 * @desc Moves unit(s) to another unit(s) on the battle field.
 * Sideview-only!
 * 
 * @arg Targets1:arraystr
 * @text Targets (Moving)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg Targets2:arraystr
 * @text Targets (Destination)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move to.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to move to.
 * @default front base
 * 
 * @arg MeleeDistance:eval
 * @text Melee Distance
 * @parent TargetLocation:str
 * @desc The melee distance away from the target location
 * in addition to the battler's width.
 * @default 24
 *
 * @arg OffsetAdjust:str
 * @text Offset Adjustment
 * @parent Targets2:arraystr
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to offset values to determine
 * which direction to adjust the destination by.
 * @default horz
 * 
 * @arg OffsetX:eval
 * @text Offset: X
 * @parent OffsetAdjust:str
 * @desc Horizontal offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg OffsetY:eval
 * @text Offset: Y
 * @parent OffsetAdjust:str
 * @desc Vertical offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Opacity
 * @text MOVE: Opacity
 * @desc Causes the unit(s) to change opacity.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change opacity.
 * @default ["user"]
 * 
 * @arg Opacity:eval
 * @text Desired Opacity
 * @desc Change to this opacity value.
 * You may use JavaScript code.
 * @default 255
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for opacity change.
 * @default 12
 *
 * @arg EasingType:str
 * @text Opacity Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForOpacity:eval
 * @text Wait For Opacity?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for opacity changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Scale
 * @text MOVE: Scale/Grow/Shrink
 * @desc Causes the unit(s) to scale, grow, or shrink?.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change the scale of.
 * @default ["user"]
 * 
 * @arg ScaleX:eval
 * @text Scale X
 * @desc What target scale value do you want?
 * 1.0 is normal size.
 * @default 1.00
 * 
 * @arg ScaleY:eval
 * @text Scale Y
 * @desc What target scale value do you want?
 * 1.0 is normal size.
 * @default 1.00
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to scale for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Scale Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForScale:eval
 * @text Wait For Scale?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for scaling to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Skew
 * @text MOVE: Skew/Distort
 * @desc Causes the unit(s) to skew.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to skew.
 * @default ["user"]
 * 
 * @arg SkewX:eval
 * @text Skew X
 * @desc X variance to skew?
 * Use small values for the best results.
 * @default 0.00
 * 
 * @arg SkewY:eval
 * @text Skew Y
 * @desc Y variance to skew?
 * Use small values for the best results.
 * @default 0.00
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to skew for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Skew Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Spin
 * @text MOVE: Spin/Rotate
 * @desc Causes the unit(s) to spin.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to spin.
 * @default ["user"]
 * 
 * @arg Angle:eval
 * @text Angle
 * @desc How many degrees to spin?
 * @default 360
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to spin for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Spin Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg RevertAngle:eval
 * @text Revert Angle on Finish
 * @type boolean
 * @on Revert
 * @off Don't
 * @desc Revert angle after spinning?
 * @default true
 * 
 * @arg WaitForSpin:eval
 * @text Wait For Spin?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for spin to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForFloat
 * @text MOVE: Wait For Float
 * @desc Waits for floating to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForJump
 * @text MOVE: Wait For Jump
 * @desc Waits for jumping to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForMovement
 * @text MOVE: Wait For Movement
 * @desc Waits for movement to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForOpacity
 * @text MOVE: Wait For Opacity
 * @desc Waits for opacity changes to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForScale
 * @text MOVE: Wait For Scale
 * @desc Waits for scaling to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForSkew
 * @text MOVE: Wait For Skew
 * @desc Waits for skewing to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForSpin
 * @text MOVE: Wait For Spin
 * @desc Waits for spinning to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceProjectile
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakProjectile
 * @text Action Sequences - Projectiles
 * @desc Create projectiles on the screen and fire them off at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Projectile_Animation
 * @text PROJECTILE: Animation
 * @desc Create an animation projectile and fire it at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * @arg Coordinates
 *
 * @arg Start:struct
 * @text Start Location
 * @parent Coordinates
 * @type struct<ProjectileStart>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"user\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 *
 * @arg Goal:struct
 * @text Goal Location
 * @parent Coordinates
 * @type struct<ProjectileGoal>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"all targets\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 * 
 * @arg Settings
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Settings
 * @type animation
 * @desc Determine which animation to use as a projectile.
 * @default 77
 * 
 * @arg Duration:eval
 * @text Duration
 * @parent Settings
 * @desc Duration for the projectile(s) to travel.
 * @default 20
 * 
 * @arg WaitForProjectile:eval
 * @text Wait For Projectile?
 * @parent Settings
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for projectile(s) to reach their destination before
 * going onto the next command?
 * @default true
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<ProjectileExAni>
 * @desc Add extra settings to the projectile?
 * @default {"AutoAngle:eval":"true","AngleOffset:eval":"+0","Arc:eval":"0","EasingType:str":"Linear","Spin:eval":"+0.0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Projectile_Icon
 * @text PROJECTILE: Icon
 * @desc Create an icon projectile and fire it at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * @arg Coordinates
 *
 * @arg Start:struct
 * @text Start Location
 * @parent Coordinates
 * @type struct<ProjectileStart>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"user\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 *
 * @arg Goal:struct
 * @text Goal Location
 * @parent Coordinates
 * @type struct<ProjectileGoal>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"all targets\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 * 
 * @arg Settings
 *
 * @arg Icon:eval
 * @text Icon Index
 * @parent Settings
 * @desc Determine which icon to use as a projectile.
 * You may use JavaScript code.
 * @default 118
 * 
 * @arg Duration:eval
 * @text Duration
 * @parent Settings
 * @desc Duration for the projectile(s) to travel.
 * @default 20
 * 
 * @arg WaitForProjectile:eval
 * @text Wait For Projectile?
 * @parent Settings
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for projectile(s) to reach their destination before
 * going onto the next command?
 * @default true
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<ProjectileExtra>
 * @desc Add extra settings to the projectile?
 * @default {"AutoAngle:eval":"true","AngleOffset:eval":"+0","Arc:eval":"0","BlendMode:num":"0","EasingType:str":"Linear","Hue:eval":"0","Scale:eval":"1.0","Spin:eval":"+0.0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Projectile_Picture
 * @text PROJECTILE: Picture
 * @desc Create a picture projectile and fire it at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * @arg Coordinates
 *
 * @arg Start:struct
 * @text Start Location
 * @parent Coordinates
 * @type struct<ProjectileStart>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"user\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 *
 * @arg Goal:struct
 * @text Goal Location
 * @parent Coordinates
 * @type struct<ProjectileGoal>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"all targets\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 * 
 * @arg Settings
 *
 * @arg Picture:str
 * @text Picture Filename
 * @parent Settings
 * @type file
 * @dir img/pictures/
 * @desc Determine which picture to use as a projectile.
 * @default Untitled
 * 
 * @arg Duration:eval
 * @text Duration
 * @parent Settings
 * @desc Duration for the projectile(s) to travel.
 * @default 20
 * 
 * @arg WaitForProjectile:eval
 * @text Wait For Projectile?
 * @parent Settings
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for projectile(s) to reach their destination before
 * going onto the next command?
 * @default true
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<ProjectileExtra>
 * @desc Add extra settings to the projectile?
 * @default {"AutoAngle:eval":"true","AngleOffset:eval":"+0","Arc:eval":"0","BlendMode:num":"0","EasingType:str":"Linear","Hue:eval":"0","Scale:eval":"1.0","Spin:eval":"+0.0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceSkew
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakSkew
 * @text Action Sequences - Skew
 * @desc Allows you to have control over the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_ChangeSkew
 * @text SKEW: Change Skew
 * @desc Changes the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg SkewX:eval
 * @text Skew X
 * @desc Change the camera skew X to this value.
 * @default 0
 * 
 * @arg SkewY:eval
 * @text Skew Y
 * @desc Change the camera skew Y to this value.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change camera skew.
 * @default 60
 *
 * @arg EasingType:str
 * @text Skew Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Skew_Reset
 * @text SKEW: Reset Skew
 * @desc Reset any skew settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset camera skew.
 * @default 60
 *
 * @arg EasingType:str
 * @text Skew Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Skew_WaitForSkew
 * @text SKEW: Wait For Skew
 * @desc Waits for skew changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceTarget
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakTarget
 * @text Action Sequences - Target
 * @desc If using a manual target by target Action Sequence,
 * these commands will give you full control over its usage.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_CurrentIndex
 * @text TARGET: Current Index
 * @desc Sets the current index to this value.
 * Then decide to jump to a label (optional).
 * 
 * @arg Index:eval
 * @text Set Index To
 * @desc Sets current targeting index to this value.
 * 0 is the starting index of a target group.
 * @default 0
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_NextTarget
 * @text TARGET: Next Target
 * @desc Moves index forward by 1 to select a new current target.
 * Then decide to jump to a label (optional).
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_PrevTarget
 * @text TARGET: Previous Target
 * @desc Moves index backward by 1 to select a new current target.
 * Then decide to jump to a label (optional).
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_RandTarget
 * @text TARGET: Random Target
 * @desc Sets index randomly to determine new currernt target.
 * Then decide to jump to a label (optional).
 * 
 * @arg ForceRandom:eval
 * @text Force Random?
 * @type boolean
 * @on On
 * @off Off
 * @desc Index cannot be its previous index amount after random.
 * @default false
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceWeapon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakWeapon
 * @text Action Sequences - Weapon
 * @desc Allows for finer control over Dual/Multi Wielding actors.
 * Only works for Actors.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Weapon_ClearActiveWeapon
 * @text WEAPON: Clear Weapon Slot
 * @desc Clears the active weapon slot (making others valid again).
 * Only works for Actors.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @desc Select unit(s) to clear the active weapon slot for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Weapon_NextActiveWeapon
 * @text WEAPON: Next Weapon Slot
 * @desc Goes to next active weapon slot (making others invalid).
 * If next slot is weaponless, don't label jump.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @desc Select unit(s) to change the next active weapon slot for.
 * @default ["user"]
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a weapon is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Weapon_SetActiveWeapon
 * @text WEAPON: Set Weapon Slot
 * @desc Sets the active weapon slot (making others invalid).
 * Only works for Actors.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @desc Select unit(s) to change the active weapon slot for.
 * @default ["user"]
 * 
 * @arg SlotID:eval
 * @text Weapon Slot ID
 * @desc Select weapon slot to make active (making others invalid).
 * Use 0 to clear and normalize. You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceZoom
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakZoom
 * @text Action Sequences - Zoom
 * @desc Allows you to have control over the screen zoom.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_Scale
 * @text ZOOM: Change Scale
 * @desc Changes the zoom scale.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Scale:eval
 * @text Scale
 * @desc The zoom scale to change to.
 * @default 1.0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change battle zoom.
 * @default 60
 *
 * @arg EasingType:str
 * @text Zoom Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForZoom:eval
 * @text Wait For Zoom?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for zoom changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_Reset
 * @text ZOOM: Reset Zoom
 * @desc Reset any zoom settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset battle zoom.
 * @default 60
 *
 * @arg EasingType:str
 * @text Zoom Easing
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
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForZoom:eval
 * @text Wait For Zoom?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for zoom changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_WaitForZoom
 * @text ZOOM: Wait For Zoom
 * @desc Waits for zoom to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceEnd
 * @text -
 * @desc -
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
 * @param BattleCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param AutoBattle:struct
 * @text Auto Battle Settings
 * @type struct<AutoBattle>
 * @desc Settings pertaining to Auto Battle.
 * @default {"BattleDisplay":"","AutoBattleMsg:str":"Press %1 or %2 to stop Auto Battle","AutoBattleOK:str":"OK","AutoBattleCancel:str":"Cancel","AutoBattleBgType:num":"1","AutoBattleRect:func":"\"const width = Graphics.width;\\nconst height = this.calcWindowHeight(1, false);\\nconst x = 0;\\nconst y = (Graphics.height - height) / 2;\\nreturn new Rectangle(x, y, width, height);\"","Options":"","AddOption:eval":"true","AdjustRect:eval":"true","StartName:str":"Auto Battle Start","StyleName:str":"Auto Battle Style","StyleOFF:str":"Attack","StyleON:str":"Skills"}
 *
 * @param Damage:struct
 * @text Damage Settings
 * @type struct<Damage>
 * @desc Settings pertaining to damage calculations.
 * @default {"Cap":"","EnableDamageCap:eval":"false","DefaultHardCap:num":"9999","EnableSoftCap:eval":"false","DefaultSoftCap:num":"0.80","DefaultSoftScaler:num":"0.1275","Popups":"","PopupDuration:num":"128","NewPopupBottom:eval":"true","PopupPosition:str":"base","PopupOffsetX:num":"0","PopupOffsetY:num":"0","PopupShiftX:num":"8","PopupShiftY:num":"-28","hpDamageFmt:str":"-%1","hpHealingFmt:str":"+%1","mpDamageFmt:str":"-%1 %2","mpHealingFmt:str":"+%1 %2","CriticalColor:eval":"[255, 0, 0, 160]","CriticalDuration:num":"128","Formulas":"","OverallFormulaJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst critical = arguments[1];\\nconst item = this.item();\\n\\n// Get Base Damage\\nconst baseValue = this.evalDamageFormula(target);\\n\\n// Calculate Element Modifiers\\nlet value = baseValue * this.calcElementRate(target);\\n\\n// Calculate Physical and Magical Modifiers\\nif (this.isPhysical()) {\\n    value *= target.pdr;\\n}\\nif (this.isMagical()) {\\n    value *= target.mdr;\\n}\\n\\n// Apply Healing Modifiers\\nif (baseValue < 0) {\\n    value *= target.rec;\\n}\\n\\n// Apply Critical Modifiers\\nif (critical) {\\n    value = this.applyCritical(value);\\n}\\n\\n// Apply Variance and Guard Modifiers\\nvalue = this.applyVariance(value, item.damage.variance);\\nvalue = this.applyGuard(value, target);\\n\\n// Finalize Damage\\nvalue = Math.round(value);\\nreturn value;\"","VarianceFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments[0];\\nconst variance = arguments[1];\\n\\n// Calculate Variance\\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\\n\\n// Return Damage\\nreturn damage >= 0 ? damage + v : damage - v;\"","GuardFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments[0];\\nconst target = arguments[1];\\n\\n// Return Damage Early\\nconst note = this.item().note;\\nif (note.match(/<UNBLOCKABLE>/i)) return damage;\\nif (!target.isGuard()) return damage;\\nif (damage < 0) return damage;\\n\\n// Declare Guard Rate\\nlet guardRate = 0.5;\\nguardRate /= target.grd;\\n\\n// Return Damage\\nreturn damage * guardRate;\"","Critical":"","CriticalHitRateJS:func":"\"// Declare Constants\\nconst user = this.subject();\\nconst target = arguments[0];\\n\\n// Create Base Critical Rate\\nlet rate = this.subject().cri * (1 - target.cev);\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/<ALWAYS CRITICAL>/i)) {\\n    return 1;\\n}\\nif (note.match(/<SET CRITICAL RATE:[ ](\\\\d+)([%％])>/i)) {\\n    return Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL RATE:[ ](\\\\d+)([%％])>/i)) {\\n    rate *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL RATE:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    rate += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<JS CRITICAL RATE>\\\\s*([\\\\s\\\\S]*)\\\\s*<\\\\/JS CRITICAL RATE>/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Apply LUK Buffs/Debuffs\\nconst lukStack = this.subject().buff(7);\\nrate *= 2 ** lukStack;\\n\\n// Return Rate\\nreturn rate;\"","CriticalHitMultiplier:func":"\"// Declare Constants\\nconst user = this.subject();\\nlet damage = arguments[0];\\nlet multiplier = 2.0;\\nlet bonusDamage = this.subject().luk * this.subject().cri;\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\\\\d+)([%％])>/i)) {\\n    multiplier = Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    multiplier += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\\\\d+)([%％])>/i)) {\\n    bonusDamage *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\\n}\\nif (note.match(/<JS CRITICAL DAMAGE>\\\\s*([\\\\s\\\\S]*)\\\\s*<\\\\/JS CRITICAL DAMAGE>/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Return Damage\\nreturn damage * multiplier + bonusDamage;\"","DamageStyles":"","DefaultDamageStyle:str":"Standard","DamageStyleList:arraystruct":"[\"{\\\"Name:str\\\":\\\"Standard\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 0)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"Armor Scaling\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor >= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"CT\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\\\\\nvalue = attackStat * 4;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"D4\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nlet stat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n    armor = 0;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n    armor = 0;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"DQ\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Get Primary Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Check for Recovery\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    let value = stat * multiplier * sign;\\\\\\\\n    return isNaN(value) ? 0 : value;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = 0;\\\\\\\\nif (stat < ((2 + armor) / 2)) {\\\\\\\\n    // Plink Damage\\\\\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\\\\\n    value = baseline / 3;\\\\\\\\n} else {\\\\\\\\n    // Normal Damage\\\\\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\\\\\n    value = baseline / 2;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF7\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare base Damage\\\\\\\\nlet baseDamage = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    baseDamage = 6 * (a.mat + level);\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.def + level);\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.mdf + level);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Final Damage\\\\\\\\nlet value = baseDamage;\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    value += 22 * power;\\\\\\\\n} else {\\\\\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF8\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Damage\\\\\\\\nlet Value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\\\\\n    value *= power / 16;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = a.mat + power;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\\\\\n    value *= power / 256;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = (power + a.def) * power / 2;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = (power + a.mdf) * power / 2;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF9\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Main Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Base Damage\\\\\\\\nlet baseDamage = power;\\\\\\\\nif (this.isPhysical()) {\\\\\\\\n    baseDamage += stat;\\\\\\\\n}\\\\\\\\nif (this.isDamage() || this.isDrain()) {\\\\\\\\n    baseDamage -= armor;\\\\\\\\n    baseDamage = Math.max(1, baseDamage);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Bonus Damage\\\\\\\\nlet bonusDamage = stat + (((a.level || a.luk) + stat) / 8);\\\\\\\\n\\\\\\\\n// Declare Final Damage\\\\\\\\nlet value = baseDamage * bonusDamage * sign;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF10\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Create Damage Offense Value\\\\\\\\nlet value = power;\\\\\\\\n\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = power * ((a.def + power) / 2);\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = power * ((a.mdf + power) / 2);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Damage Defense Value\\\\\\\\nif (this.isDamage() || this.isDrain()) {\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\\\\\n    armor = Math.max(armor, 1);\\\\\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\\\\\n} else if (this.isRecover()) {\\\\\\\\n    value *= -1;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MK\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nconst denominator = Math.max(200 + armor, 1);\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = 200 * a.atk / denominator;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = 200 * a.mat / denominator;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = 200 * a.def / 200;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = 200 * a.mdf / 200;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MOBA\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Value\\\\\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\\\\\n\\\\\\\\n// Apply Attacker's Offense Parameter\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value *= a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value *= a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor >= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"PKMN\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\"]"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Settings pertaining to various game mechanics.
 * @default {"ActionSpeed":"","AllowRandomSpeed:eval":"false","CalcActionSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\nif (this.item()) {\\n    speed += this.item().speed;\\n}\\nif (this.isAttack()) {\\n    speed += this.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\"","BaseTroop":"","BaseTroopIDs:arraynum":"[\"1\"]","CommonEvents":"","BattleStartEvent:num":"0","BattleEndEvent:num":"0","VictoryEvent:num":"0","DefeatEvent:num":"0","EscapeSuccessEvent:num":"0","EscapeFailEvent:num":"0","Escape":"","CalcEscapeRatioJS:func":"\"// Calculate Escape Ratio\\nlet ratio = 0.5;\\nratio *= $gameParty.agility();\\nratio /= $gameTroop.agility();\\n\\n// Return Ratio\\nreturn ratio;\"","CalcEscapeRaiseJS:func":"\"// Calculate Escape Ratio\\nlet value = 0.1;\\nvalue += $gameParty.aliveMembers().length;\\n\\n// Return Value\\nreturn value;\"","BattleJS":"","PreStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleVictoryJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeSuccessJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeFailureJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleDefeatJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","TurnJS":"","PreStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","ActionJS":"","PreStartActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostStartActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PreApplyJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreDamageJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostDamageJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostApplyJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreEndActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostEndActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\""}
 *
 * @param CmdWindows
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleLayout:struct
 * @text Battle Layout Settings
 * @type struct<BattleLayout>
 * @desc Settings that adjust how the battle layout appears.
 * @default {"Style:str":"default","ListStyle":"","ShowFacesListStyle:eval":"true","CommandWidth:num":"192","XPStyle":"","XPActorCommandLines:num":"4","XPActorDefaultHeight:num":"64","XPSpriteYLocation:str":"name","PotraitStyle":"","ShowPortraits:eval":"true","PortraitScale:num":"0.5","BorderStyle":"","SkillItemBorderCols:num":"1","ShowPortraitsBorderStyle:eval":"true","PortraitScaleBorderStyle:num":"1.25","SkillItemWindows":"","SkillItemMiddleLayout:eval":"false","SkillItemStandardCols:num":"2"}
 *
 * @param BattleLog:struct
 * @text Battle Log Settings
 * @type struct<BattleLog>
 * @desc Settings that adjust how Window_BattleLog behaves.
 * @default {"General":"","BackColor:str":"#000000","MaxLines:num":"10","MessageWait:num":"16","TextAlign:str":"center","BattleLogRectJS:func":"\"const wx = 0;\\nconst wy = 0;\\nconst ww = Graphics.boxWidth;\\nconst wh = this.calcWindowHeight(10, false);\\nreturn new Rectangle(wx, wy, ww, wh);\"","StartTurn":"","StartTurnShow:eval":"true","StartTurnMsg:str":"Turn %1","StartTurnWait:num":"40","DisplayAction":"","ActionCenteredName:eval":"true","ActionSkillMsg1:eval":"false","ActionSkillMsg2:eval":"true","ActionItemMsg:eval":"false","ActionChanges":"","ShowCounter:eval":"true","ShowReflect:eval":"true","ShowSubstitute:eval":"true","ActionResults":"","ShowFailure:eval":"false","ShowCritical:eval":"false","ShowMissEvasion:eval":"false","ShowHpDmg:eval":"false","ShowMpDmg:eval":"false","ShowTpDmg:eval":"false","DisplayStates":"","ShowAddedState:eval":"false","ShowRemovedState:eval":"false","ShowCurrentState:eval":"false","ShowAddedBuff:eval":"false","ShowAddedDebuff:eval":"false","ShowRemovedBuff:eval":"false"}
 *
 * @param Battleback:struct
 * @text Battleback Scaling
 * @type struct<Battleback>
 * @desc Settings that adjust how battlebacks scale.
 * @default {"DefaultStyle:str":"MZ","jsOneForOne:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst scale = 1.0;\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = 0;\\nthis.y = 0;\"","jsScaleToFit:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = this.width / this.bitmap.width;\\nconst ratioY = this.height / this.bitmap.height;\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\"","jsScaleDown:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = Math.min(1, this.width / this.bitmap.width);\\nconst ratioY = Math.min(1, this.height / this.bitmap.height);\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\"","jsScale Up:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = Math.max(1, this.width / this.bitmap.width);\\nconst ratioY = Math.max(1, this.height / this.bitmap.height);\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\""}
 *
 * @param PartyCmd:struct
 * @text Party Command Window
 * @type struct<PartyCmd>
 * @desc Settings that alter the Party Command Window in battle.
 * @default {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconFight:num":"76","CommandAddAutoBattle:eval":"true","CmdIconAutoBattle:num":"78","CmdTextAutoBattle:str":"Auto","CommandAddOptions:eval":"true","CmdIconOptions:num":"83","ActiveTpbOptionsMessage:str":"Options Menu queued after action is complete.","CmdIconEscape:num":"82","Access":"","SkipPartyCmd:eval":"true","DisablePartyCmd:eval":"false","HelpWindow":"","HelpFight:str":"Select actions to fight.","HelpAutoBattle:str":"Sets party to Auto Battle mode.","HelpOptions:str":"Opens up the Options Menu.","HelpEscape:str":"Attempt to escape the battle."}
 *
 * @param ActorCmd:struct
 * @text Actor Command Window
 * @type struct<ActorCmd>
 * @desc Settings that alter the Actor Command Window in battle.
 * @default {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconItem:num":"176","IconStypeNorm:num":"78","IconStypeMagic:num":"79","BattleCmd":"","BattleCmdList:arraystr":"[\"attack\",\"skills\",\"guard\",\"item\",\"escape\"]","HelpWindow":"","HelpSkillType:str":"Opens up a list of skills under the \\C[16]%1\\C[0] category.","HelpItem:str":"Opens up a list of items that you can use.","HelpEscape:str":"Attempt to escape the battle.","HelpAutoBattle:str":"Automatically choose an action suitable for combat."}
 *
 * @param VisualBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Actor:struct
 * @text Actor Battler Settings
 * @type struct<Actor>
 * @desc Settings that alter various properties for actors.
 * @default {"Flinch":"","FlinchDistanceX:num":"12","FlinchDistanceY:num":"0","FlinchDuration:num":"6","SvBattlers":"","AnchorX:num":"0.5","AnchorY:num":"1.0","ChantStyle:eval":"true","OffsetX:num":"0","OffsetY:num":"0","MotionSpeed:num":"12","PrioritySortActive:eval":"true","PrioritySortActors:eval":"false","Shadow:eval":"true","SmoothImage:eval":"true","HomePosJS:func":"\"// Declare Constants\\nconst sprite = this;\\nconst actor = this._actor;\\nconst index = arguments[0];\\n\\n// Make Calculations\\nlet x = Math.round((Graphics.width / 2) + 192)\\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\\nx += index * 32;\\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\\ny += index * 48;\\n\\n// Home Position Offsets\\nconst offsetNote = /<SIDEVIEW HOME OFFSET:[ ]([\\\\+\\\\-]\\\\d+),[ ]([\\\\+\\\\-]\\\\d+)>/i;\\nconst xOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\\nconst yOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\\nx = xOffsets.reduce((r, offset) => r + offset, x);\\ny = yOffsets.reduce((r, offset) => r + offset, y);\\n\\n// Set Home Position\\nthis.setHome(x, y);\""}
 *
 * @param Enemy:struct
 * @text Enemy Battler Settings
 * @type struct<Enemy>
 * @desc Settings that alter various properties for enemies.
 * @default {"Visual":"","AttackAnimation:num":"1","EmergeText:eval":"false","OffsetX:num":"0","OffsetY:num":"0","SmoothImage:eval":"true","SelectWindow":"","FrontViewSelect:eval":"false","SideviewSelect:eval":"true","NameFontSize:num":"22","SvBattlers":"","AllowCollapse:eval":"false","AnchorX:num":"0.5","AnchorY:num":"1.0","MotionIdle:str":"walk","Shadow:eval":"true","Width:num":"64","Height:num":"64","WtypeId:num":"0"}
 *
 * @param HpGauge:struct
 * @text HP Gauge Settings
 * @type struct<HpGauge>
 * @desc Settings that adjust the visual HP Gauge displayed in battle.
 * @default {"Display":"","ShowActorGauge:eval":"false","ShowEnemyGauge:eval":"true","RequiresDefeat:eval":"false","BTestBypass:eval":"true","Settings":"","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"0","OffsetY:num":"-3","Options":"","AddHpGaugeOption:eval":"true","AdjustRect:eval":"true","Name:str":"Show HP Gauge"}
 *
 * @param ActionSequence:struct
 * @text Action Sequence Settings
 * @type struct<ActionSequence>
 * @desc Settings that adjust how certain Action Sequences work.
 * @default {"AutoSequences":"","AutoMeleeSolo:eval":"true","AutoMeleeAoE:eval":"true","CastAnimations":"","CastCertain:num":"120","CastPhysical:num":"52","CastMagical:num":"51","CounterReflection":"","CounterPlayback:eval":"true","ReflectAnimation:num":"1","ReflectPlayback:eval":"true","Stepping":"","MeleeDistance:num":"24","StepDistanceX:num":"48","StepDistanceY:num":"0","StepDuration:num":"12"}
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
 * Auto Battle Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoBattle:
 *
 * @param BattleDisplay
 * @text Battle Display
 *
 * @param AutoBattleMsg:str
 * @text Message
 * @parent BattleDisplay
 * @desc Message that's displayed when Auto Battle is on.
 * Text codes allowed. %1 - OK button, %2 - Cancel button
 * @default Press %1 or %2 to stop Auto Battle
 *
 * @param AutoBattleOK:str
 * @text OK Button
 * @parent BattleDisplay
 * @desc Text used to represent the OK button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default OK
 *
 * @param AutoBattleCancel:str
 * @text Cancel Button
 * @parent BattleDisplay
 * @desc Text used to represent the Cancel button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default Cancel
 *
 * @param AutoBattleBgType:num
 * @text Background Type
 * @parent BattleDisplay
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for Auto Battle window.
 * @default 1
 *
 * @param AutoBattleRect:func
 * @text JS: X, Y, W, H
 * @parent BattleDisplay
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.width;\nconst height = this.calcWindowHeight(1, false);\nconst x = 0;\nconst y = (Graphics.height - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the Auto Battle options to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param StartName:str
 * @text Startup Name
 * @parent Options
 * @desc Command name of the option.
 * @default Auto Battle Start
 *
 * @param StyleName:str
 * @text Style Name
 * @parent Options
 * @desc Command name of the option.
 * @default Auto Battle Style
 *
 * @param StyleOFF:str
 * @text OFF
 * @parent StyleName:str
 * @desc Text displayed when Auto Battle Style is OFF.
 * @default Attack
 *
 * @param StyleON:str
 * @text ON
 * @parent StyleName:str
 * @desc Text displayed when Auto Battle Style is ON.
 * @default Skills
 *
 */
/* ----------------------------------------------------------------------------
 * Damage Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Damage:
 *
 * @param Cap
 * @text Damage Cap
 *
 * @param EnableDamageCap:eval
 * @text Enable Damage Cap?
 * @parent Cap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Put a maximum hard damage cap on how far damage can go?
 * This can be broken through the usage of notetags.
 * @default false
 *
 * @param DefaultHardCap:num
 * @text Default Hard Cap
 * @parent EnableDamageCap:eval
 * @type number
 * @min 1
 * @desc The default hard damage cap used before applying damage.
 * @default 9999
 *
 * @param EnableSoftCap:eval
 * @text Enable Soft Cap?
 * @parent Cap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Soft caps ease in the damage values leading up to the 
 * hard damage cap. Requires hard Damage Cap enabled.
 * @default false
 *
 * @param DefaultSoftCap:num
 * @text Base Soft Cap Rate
 * @parent EnableSoftCap:eval
 * @desc The default soft damage cap used before applying damage.
 * @default 0.80
 *
 * @param DefaultSoftScaler:num
 * @text Soft Scale Constant
 * @parent EnableSoftCap:eval
 * @desc The default soft damage cap used before applying damage.
 * @default 0.1275
 *
 * @param Popups
 *
 * @param PopupDuration:num
 * @text Popup Duration
 * @parent Popups
 * @type number
 * @min 1
 * @desc Adjusts how many frames a popup stays visible.
 * @default 128
 *
 * @param NewPopupBottom:eval
 * @text Newest Popups Bottom
 * @parent Popups
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Puts the newest popups at the bottom.
 * @default true
 *
 * @param PopupPosition:str
 * @text Appear Position
 * @parent Popups
 * @type select
 * @option Head - At the top of the battler.
 * @value head
 * @option Center - At the center of the battler.
 * @value center
 * @option Base - At the foot of the battler.
 * @value base
 * @desc Selects where you want popups to appear relative to the battler.
 * @default base
 *
 * @param PopupOffsetX:num
 * @text Offset X
 * @parent Popups
 * @desc Sets how much to offset the sprites by horizontally.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param PopupOffsetY:num
 * @text Offset Y
 * @parent Popups
 * @desc Sets how much to offset the sprites by vertically.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param PopupShiftX:num
 * @text Shift X
 * @parent Popups
 * @desc Sets how much to shift the sprites by horizontally.
 * Negative values go left. Positive values go right.
 * @default 8
 *
 * @param PopupShiftY:num
 * @text Shift Y
 * @parent Popups
 * @desc Sets how much to shift the sprites by vertically.
 * Negative values go up. Positive values go down.
 * @default -28
 *
 * @param hpDamageFmt:str
 * @text HP Damage Format
 * @parent Popups
 * @desc Determines HP damage format for popup.
 * %1 - Value, %2 - HP Text
 * @default -%1
 *
 * @param hpHealingFmt:str
 * @text HP Healing Format
 * @parent Popups
 * @desc Determines HP healing format for popup.
 * %1 - Value, %2 - HP Text
 * @default +%1
 *
 * @param mpDamageFmt:str
 * @text MP Damage Format
 * @parent Popups
 * @desc Determines MP damage format for popup.
 * %1 - Value, %2 - MP Text
 * @default -%1 %2
 *
 * @param mpHealingFmt:str
 * @text MP Healing Format
 * @parent Popups
 * @desc Determines MP healing format for popup.
 * %1 - Value, %2 - MP Text
 * @default +%1 %2
 *
 * @param CriticalColor:eval
 * @text Critical Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 *
 * @param CriticalDuration:num
 * @text Critical Duration
 * @parent Popups
 * @type number
 * @min 1
 * @desc Adjusts how many frames a the flash lasts.
 * @default 128
 *
 * @param Formulas
 *
 * @param OverallFormulaJS:func
 * @text JS: Overall Formula
 * @parent Formulas
 * @type note
 * @desc The overall formula used when calculating damage.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst critical = arguments[1];\nconst item = this.item();\n\n// Get Base Damage\nconst baseValue = this.evalDamageFormula(target);\n\n// Calculate Element Modifiers\nlet value = baseValue * this.calcElementRate(target);\n\n// Calculate Physical and Magical Modifiers\nif (this.isPhysical()) {\n    value *= target.pdr;\n}\nif (this.isMagical()) {\n    value *= target.mdr;\n}\n\n// Apply Healing Modifiers\nif (baseValue < 0) {\n    value *= target.rec;\n}\n\n// Apply Critical Modifiers\nif (critical) {\n    value = this.applyCritical(value);\n}\n\n// Apply Variance and Guard Modifiers\nvalue = this.applyVariance(value, item.damage.variance);\nvalue = this.applyGuard(value, target);\n\n// Finalize Damage\nvalue = Math.round(value);\nreturn value;"
 *
 * @param VarianceFormulaJS:func
 * @text JS: Variance Formula
 * @parent Formulas
 * @type note
 * @desc The formula used when damage variance.
 * @default "// Declare Constants\nconst damage = arguments[0];\nconst variance = arguments[1];\n\n// Calculate Variance\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\n\n// Return Damage\nreturn damage >= 0 ? damage + v : damage - v;"
 *
 * @param GuardFormulaJS:func
 * @text JS: Guard Formula
 * @parent Formulas
 * @type note
 * @desc The formula used when damage is guarded.
 * @default "// Declare Constants\nconst damage = arguments[0];\nconst target = arguments[1];\n\n// Return Damage Early\nconst note = this.item().note;\nif (note.match(/<UNBLOCKABLE>/i)) return damage;\nif (!target.isGuard()) return damage;\nif (damage < 0) return damage;\n\n// Declare Guard Rate\nlet guardRate = 0.5;\nguardRate /= target.grd;\n\n// Return Damage\nreturn damage * guardRate;"
 *
 * @param Critical
 * @text Critical Hits
 *
 * @param CriticalHitRateJS:func
 * @text JS: Rate Formula
 * @parent Critical
 * @type note
 * @desc The formula used to calculate Critical Hit Rates.
 * @default "// Declare Constants\nconst user = this.subject();\nconst target = arguments[0];\n\n// Create Base Critical Rate\nlet rate = this.subject().cri * (1 - target.cev);\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/<ALWAYS CRITICAL>/i)) {\n    return 1;\n}\nif (note.match(/<SET CRITICAL RATE:[ ](\\d+)([%％])>/i)) {\n    return Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL RATE:[ ](\\d+)([%％])>/i)) {\n    rate *= Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL RATE:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    rate += Number(RegExp.$1) / 100;\n}\nif (note.match(/<JS CRITICAL RATE>\\s*([\\s\\S]*)\\s*<\\/JS CRITICAL RATE>/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Apply LUK Buffs/Debuffs\nconst lukStack = this.subject().buff(7);\nrate *= 2 ** lukStack;\n\n// Return Rate\nreturn rate;"
 *
 * @param CriticalHitMultiplier:func
 * @text JS: Damage Formula
 * @parent Critical
 * @type note
 * @desc The formula used to calculate Critical Hit Damage modification.
 * @default "// Declare Constants\nconst user = this.subject();\nlet damage = arguments[0];\nlet multiplier = 2.0;\nlet bonusDamage = this.subject().luk * this.subject().cri;\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\\d+)([%％])>/i)) {\n    multiplier = Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    multiplier += Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\\d+)([%％])>/i)) {\n    bonusDamage *= Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\n}\nif (note.match(/<JS CRITICAL DAMAGE>\\s*([\\s\\S]*)\\s*<\\/JS CRITICAL DAMAGE>/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Return Damage\nreturn damage * multiplier + bonusDamage;"
 *
 * @param DamageStyles
 * @text Damage Styles
 *
 * @param DefaultDamageStyle:str
 * @text Default Style
 * @parent DamageStyles
 * @desc Which Damage Style do you want to set as default?
 * Use 'Manual' to not use any styles at all.
 * @default Standard
 *
 * @param DamageStyleList:arraystruct
 * @text Style List
 * @parent DamageStyles
 * @type struct<DamageStyle>[]
 * @desc A list of the damage styles available.
 * These are used to calculate base damage.
 * @default ["{\"Name:str\":\"Standard\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 0)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"Armor Scaling\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor >= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"CT\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\nvalue = attackStat * 4;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"D4\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nlet stat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n    armor = 0;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n    armor = 0;\\\\n}\\\\n\\\\n// Calculate Damage \\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"DQ\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\n}\\\\n\\\\n// Get Primary Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Check for Recovery\\\\nif (this.isRecover()) {\\\\n    let value = stat * multiplier * sign;\\\\n    return isNaN(value) ? 0 : value;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = 0;\\\\nif (stat < ((2 + armor) / 2)) {\\\\n    // Plink Damage\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\n    value = baseline / 3;\\\\n} else {\\\\n    // Normal Damage\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\n    value = baseline / 2;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF7\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare base Damage\\\\nlet baseDamage = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    baseDamage = 6 * (a.mat + level);\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    baseDamage = 6 * (a.def + level);\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    baseDamage = 6 * (a.mdf + level);\\\\n}\\\\n\\\\n// Calculate Final Damage\\\\nlet value = baseDamage;\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isRecover()) {\\\\n    value += 22 * power;\\\\n} else {\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF8\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Damage\\\\nlet Value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\n    value *= power / 16;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = a.mat + power;\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\n    value *= power / 256;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = (power + a.def) * power / 2;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = (power + a.mdf) * power / 2;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF9\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Declare Main Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Declare Base Damage\\\\nlet baseDamage = power;\\\\nif (this.isPhysical()) {\\\\n    baseDamage += stat;\\\\n}\\\\nif (this.isDamage() || this.isDrain()) {\\\\n    baseDamage -= armor;\\\\n    baseDamage = Math.max(1, baseDamage);\\\\n}\\\\n\\\\n// Declare Bonus Damage\\\\nlet bonusDamage = stat + (((a.level || a.luk) + stat) / 8);\\\\n\\\\n// Declare Final Damage\\\\nlet value = baseDamage * bonusDamage * sign;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF10\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Create Damage Offense Value\\\\nlet value = power;\\\\n\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = power * ((a.def + power) / 2);\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = power * ((a.mdf + power) / 2);\\\\n}\\\\n\\\\n// Apply Damage Defense Value\\\\nif (this.isDamage() || this.isDrain()) {\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\n    armor = Math.max(armor, 1);\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\n} else if (this.isRecover()) {\\\\n    value *= -1;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MK\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nconst denominator = Math.max(200 + armor, 1);\\\\n\\\\n// Calculate Damage \\\\nlet value = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = 200 * a.atk / denominator;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = 200 * a.mat / denominator;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = 200 * a.def / 200;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = 200 * a.mdf / 200;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MOBA\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Value\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\n\\\\n// Apply Attacker's Offense Parameter\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value *= a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value *= a.mdf;\\\\n}\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor >= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"PKMN\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}"]
 *
 */
/* ----------------------------------------------------------------------------
 * Damage Formula Style
 * ----------------------------------------------------------------------------
 */
/*~struct~DamageStyle:
 *
 * @param Name:str
 * @text Name
 * @desc Name of this Damage Style.
 * Used for notetags and such.
 * @default Untitled
 *
 * @param Formula:func
 * @text JS: Formula
 * @parent Name:str
 * @type note
 * @desc The base formula for this Damage Style.
 * @default "// Define Constants\nconst item = this.item();\nconst a = this.subject();\nconst b = target;\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\n\n// Create Damage Value\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\n\n// Return Value\nreturn isNaN(value) ? 0 : value;"
 *
 * @param ItemsEquipsCore
 * @text Items & Equips Core
 *
 * @param DamageType
 * @text Damage Label
 * @parent ItemsEquipsCore
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param DamageDisplay:func
 * @text JS: Damage Display
 * @parent ItemsEquipsCore
 * @type note
 * @desc Code used the data displayed for this category.
 * @default "// Define Constants\nconst item = this._item;\nconst formula = item.damage.formula;\nconst a = this._tempActorA;\nconst b = this._tempActorB;\nconst user = a;\nconst target = b;\n\n// Return Value\ntry {\n    const value = Math.max(eval(formula), 0);\n    return '%1%'.format(Math.round(value * 100));\n} catch (e) {\n    if ($gameTemp.isPlaytest()) {\n        console.log('Damage Formula Error for %1'.format(this._item.name));\n    }\n    return '?????';\n}"
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param ActionSpeed
 * @text Action Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent ActionSpeed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param CalcActionSpeedJS:func
 * @text JS: Calculate
 * @parent ActionSpeed
 * @type note
 * @desc Code used to calculate action speed.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\nif (this.item()) {\n    speed += this.item().speed;\n}\nif (this.isAttack()) {\n    speed += this.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param BaseTroop
 * @text Base Troop
 *
 * @param BaseTroopIDs:arraynum
 * @text Base Troop ID's
 * @parent BaseTroop
 * @type troop[]
 * @desc Select the Troop ID(s) to duplicate page events from for all other troops.
 * @default ["1"]
 *
 * @param CommonEvents
 * @text Common Events (on Map)
 *
 * @param BattleStartEvent:num
 * @text Pre-Battle Event
 * @parent CommonEvents
 * @type common_event
 * @desc Common Event to run before each battle on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param BattleEndEvent:num
 * @text Post-Battle Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run after each battle on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param VictoryEvent:num
 * @text Victory Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon victory on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param DefeatEvent:num
 * @text Defeat Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon defeat on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param EscapeSuccessEvent:num
 * @text Escape Success Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon escape success on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param EscapeFailEvent:num
 * @text Escape Fail Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon escape failure on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param Escape
 *
 * @param CalcEscapeRatioJS:func
 * @text JS: Calc Escape Ratio
 * @parent Escape
 * @type note
 * @desc Code used to calculate the escape success ratio.
 * @default "// Calculate Escape Ratio\nlet ratio = 0.5;\nratio *= $gameParty.agility();\nratio /= $gameTroop.agility();\n\n// Return Ratio\nreturn ratio;"
 *
 * @param CalcEscapeRaiseJS:func
 * @text JS: Calc Escape Raise
 * @parent Escape
 * @type note
 * @desc Code used to calculate how much the escape success ratio raises upon each failure.
 * @default "// Calculate Escape Ratio\nlet value = 0.1;\nvalue += $gameParty.aliveMembers().length;\n\n// Return Value\nreturn value;"
 *
 * @param Switches
 *
 * @param SwitchCritical:num
 * @text Switch: Critical
 * @parent Switches
 * @type switch
 * @desc Turns switch ON if the action performs a critical hit.
 * Switch reverts to OFF whenever an action starts.
 * @default 0
 *
 * @param SwitchMissEvade:num
 * @text Switch: Miss/Evade
 * @parent Switches
 * @type switch
 * @desc Turns switch ON if the action misses/is evaded.
 * Switch reverts to OFF whenever an action starts.
 * @default 0
 *
 * @param Variables
 *
 * @param VariableDmg:num
 * @text Variable: Damage
 * @parent Variables
 * @type variable
 * @desc Variable records target damage during action.
 * Variable reverts to 0 whenever an action starts.
 * @default 0
 *
 * @param VariableHeal:num
 * @text Variable: Healing
 * @parent Variables
 * @type variable
 * @desc Variable records target healing during action.
 * Variable reverts to 0 whenever an action starts.
 * @default 0
 *
 * @param BattleJS
 * @text JS: Battle-Related
 * 
 * @param PreStartBattleJS:func
 * @text JS: Pre-Start Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.startBattle()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostStartBattleJS:func
 * @text JS: Post-Start Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.startBattle()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param BattleVictoryJS:func
 * @text JS: Battle Victory
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.processVictory()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param EscapeSuccessJS:func
 * @text JS: Escape Success
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.onEscapeSuccess()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param EscapeFailureJS:func
 * @text JS: Escape Failure
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.onEscapeFailure()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param BattleDefeatJS:func
 * @text JS: Battle Defeat
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.processDefeat()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param PreEndBattleJS:func
 * @text JS: Pre-End Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.endBattle()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostEndBattleJS:func
 * @text JS: Post-End Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.endBattle()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param TurnJS
 * @text JS: Turn-Related
 *
 * @param PreStartTurnJS:func
 * @text JS: Pre-Start Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: BattleManager.startTurn()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostStartTurnJS:func
 * @text JS: Post-Start Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: BattleManager.startTurn()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PreEndTurnJS:func
 * @text JS: Pre-End Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.onTurnEnd()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostEndTurnJS:func
 * @text JS: Post-End Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.onTurnEnd()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PreRegenerateJS:func
 * @text JS: Pre-Regenerate
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.regenerateAll()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostRegenerateJS:func
 * @text JS: Post-Regenerate
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.regenerateAll()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param ActionJS
 * @text JS: Action-Related
 *
 * @param PreStartActionJS:func
 * @text JS: Pre-Start Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.startAction()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PostStartActionJS:func
 * @text JS: Post-Start Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.startAction()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PreApplyJS:func
 * @text JS: Pre-Apply
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.apply()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PreDamageJS:func
 * @text JS: Pre-Damage
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.executeDamage()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PostDamageJS:func
 * @text JS: Post-Damage
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.executeDamage()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PostApplyJS:func
 * @text JS: Post-Apply
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.apply()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PreEndActionJS:func
 * @text JS: Pre-End Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.endAction()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PostEndActionJS:func
 * @text JS: Post-End Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.endAction()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLayout:
 *
 * @param Style:str
 * @text Battle Layout Style
 * @type select
 * @option Default - Shows actor faces in Battle Status.
 * @value default
 * @option List - Lists actors in Battle Status.
 * @value list
 * @option XP - Shows actor battlers in a stretched Battle Status.
 * @value xp
 * @option Portrait - Shows portraits in a stretched Battle Status.
 * @value portrait
 * @option Border - Displays windows around the screen border.
 * @value border
 * @option Sideview Battle UI - Requires VisuMZ_3_SideviewBattleUI
 * @value sideview_ui
 * @desc The style used for the battle layout.
 * @default default
 *
 * @param ListStyle
 * @text List Style
 * @parent Style:str
 *
 * @param ShowFacesListStyle:eval
 * @text Show Faces
 * @parent ListStyle
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows faces in List Style?
 * @default true
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent ListStyle
 * @type number
 * @min 1
 * @desc Determine the window width for the Party and Actor Command
 * Windows. Affects Default and List Battle Layout styles.
 * @default 192
 *
 * @param XPStyle
 * @text XP Style
 * @parent Style:str
 *
 * @param XPActorCommandLines:num
 * @text Command Lines
 * @parent XPStyle
 * @type number
 * @min 1
 * @desc Number of action lines in the Actor Command Window for the XP Style.
 * @default 4
 *
 * @param XPActorDefaultHeight:num
 * @text Sprite Height
 * @parent XPStyle
 * @type number
 * @min 1
 * @desc Default sprite height used when if the sprite's height has not been determined yet.
 * @default 64
 *
 * @param XPSpriteYLocation:str
 * @text Sprite Base Location
 * @parent XPStyle
 * @type select
 * @option Above Name - Sprite is located above the name.
 * @value name
 * @option Bottom - Sprite is located at the bottom of the window.
 * @value bottom
 * @option Centered - Sprite is centered in the window.
 * @value center
 * @option Top - Sprite is located at the top of the window.
 * @value top
 * @desc Determine where the sprite is located on the Battle Status Window.
 * @default name
 *
 * @param PotraitStyle
 * @text Portrait Style
 * @parent Style:str
 *
 * @param ShowPortraits:eval
 * @text Show Portraits?
 * @parent PotraitStyle
 * @type boolean
 * @on Portraits
 * @off Faces
 * @desc Requires VisuMZ_1_MainMenuCore.
 * Shows the actor's portrait instead of a face.
 * @default true
 *
 * @param PortraitScale:num
 * @text Portrait Scaling
 * @parent PotraitStyle
 * @desc If portraits are used, scale them by this much.
 * @default 0.5
 *
 * @param BorderStyle
 * @text Border Style
 * @parent Style:str
 *
 * @param SkillItemBorderCols:num
 * @text Columns
 * @parent BorderStyle
 * @type number
 * @min 1
 * @desc The total number of columns for Skill & Item Windows
 * in the battle scene.
 * @default 1
 *
 * @param ShowPortraitsBorderStyle:eval
 * @text Show Portraits?
 * @parent BorderStyle
 * @type boolean
 * @on Portraits
 * @off Faces
 * @desc Requires VisuMZ_1_MainMenuCore.
 * Shows the actor's portrait at the edge of the screen.
 * @default true
 *
 * @param PortraitScaleBorderStyle:num
 * @text Portrait Scaling
 * @parent BorderStyle
 * @desc If portraits are used, scale them by this much.
 * @default 1.0
 *
 * @param SkillItemWindows
 * @text Skill & Item Windows
 *
 * @param SkillItemMiddleLayout:eval
 * @text Middle Layout
 * @parent SkillItemWindows
 * @type boolean
 * @on Middle
 * @off Bottom
 * @desc Shows the Skill & Item Windows in mid-screen?
 * @default false
 *
 * @param SkillItemStandardCols:num
 * @text Columns
 * @parent SkillItemWindows
 * @type number
 * @min 1
 * @desc The total number of columns for Skill & Item Windows
 * in the battle scene.
 * @default 2
 *
 * @param StatusWindow
 * @text Status Window Elements
 *
 * @param StatusWindowName
 * @text Battler Name
 * @parent StatusWindow
 *
 * @param NameOffsetX:num
 * @text Offset: X
 * @parent StatusWindowName
 * @desc Offset this Battle Status Window element's X.
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param NameOffsetY:num
 * @text Offset: Y
 * @parent StatusWindowName
 * @desc Offset this Battle Status Window element's Y.
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param StatusWindowHpGauge
 * @text Gauge 1 (HP)
 * @parent StatusWindow
 *
 * @param HpGaugeOffsetX:num
 * @text Offset: X
 * @parent StatusWindowHpGauge
 * @desc Offset this Battle Status Window element's X.
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param HpGaugeOffsetY:num
 * @text Offset: Y
 * @parent StatusWindowHpGauge
 * @desc Offset this Battle Status Window element's Y.
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param StatusWindowMpGauge
 * @text Gauge 2 (MP)
 * @parent StatusWindow
 *
 * @param MpGaugeOffsetX:num
 * @text Offset: X
 * @parent StatusWindowMpGauge
 * @desc Offset this Battle Status Window element's X.
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param MpGaugeOffsetY:num
 * @text Offset: Y
 * @parent StatusWindowMpGauge
 * @desc Offset this Battle Status Window element's Y.
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param StatusWindowTpGauge
 * @text Gauge 3 (TP)
 * @parent StatusWindow
 *
 * @param TpGaugeOffsetX:num
 * @text Offset: X
 * @parent StatusWindowTpGauge
 * @desc Offset this Battle Status Window element's X.
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param TpGaugeOffsetY:num
 * @text Offset: Y
 * @parent StatusWindowTpGauge
 * @desc Offset this Battle Status Window element's Y.
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param StatusWindowStateIcon
 * @text State Icon
 * @parent StatusWindow
 *
 * @param StateIconOffsetX:num
 * @text Offset: X
 * @parent StatusWindowStateIcon
 * @desc Offset this Battle Status Window element's X.
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param StateIconOffsetY:num
 * @text Offset: Y
 * @parent StatusWindowStateIcon
 * @desc Offset this Battle Status Window element's Y.
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param StatusWindowTpbGauge
 * @text TPB/ATB Gauge
 * @parent StatusWindow
 *
 * @param TpbGaugeOffsetX:num
 * @text Offset: X
 * @parent StatusWindowTpbGauge
 * @desc Offset this Battle Status Window element's X.
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param TpbGaugeOffsetY:num
 * @text Offset: Y
 * @parent StatusWindowTpbGauge
 * @desc Offset this Battle Status Window element's Y.
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param StatusWindowSkin
 * @text Window Skin
 * @parent StatusWindow
 *
 * @param StatusWindowSkinFilename:str
 * @text Filename
 * @parent StatusWindowSkin
 * @type file
 * @dir img/system/
 * @desc Filename used for the Battle Status Window skin.
 * Leave this empty to use the default window skin.
 * @default 
 *
 * @param StatusWindowSkinHide:eval
 * @text Hide Window Skin?
 * @parent StatusWindowSkin
 * @type boolean
 * @on No Window Skin
 * @off Default Skin
 * @desc Show/Hide the window skin for the Battle Status Window?
 * @default false
 *
 * @param StatusWindowSelectBack
 * @text Selectable Background
 * @parent StatusWindow
 *
 * @param StatusWindowSelectableBackHide:eval
 * @text Hide Selectable BG?
 * @parent StatusWindowSelectBack
 * @type boolean
 * @on No Selectable BG
 * @off Default Selectable BG
 * @desc Show/Hide the selectable background box for the Battle Status Window?
 * @default false
 *
 * @param StatusWindowAttachments
 * @text Attachments
 * @parent StatusWindow
 *
 * @param StatusWindowBackAttachment
 * @text Back Attachment
 * @parent StatusWindowAttachments
 *
 * @param StatusWindowAttachmentBack:str
 * @text Filename
 * @parent StatusWindowBackAttachment
 * @type file
 * @dir img/system/
 * @desc Filename used for an image to attach to the back of the
 * Battle Status Window. Leave empty for none.
 * @default 
 *
 * @param StatusWindowAttachmentBackOffsetX:num
 * @text Offset: X
 * @parent StatusWindowBackAttachment
 * @desc Offset this Battle Status Window element's X.
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param StatusWindowAttachmentBackOffsetY:num
 * @text Offset: Y
 * @parent StatusWindowBackAttachment
 * @desc Offset this Battle Status Window element's Y.
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param StatusWindowFrontAttachment
 * @text Front Attachment
 * @parent StatusWindowAttachments
 *
 * @param StatusWindowAttachmentFront:str
 * @text Filename
 * @parent StatusWindowFrontAttachment
 * @type file
 * @dir img/system/
 * @desc Filename used for an image to attach to the front of the
 * Battle Status Window. Leave empty for none.
 * @default 
 *
 * @param StatusWindowAttachmentFrontOffsetX:num
 * @text Offset: X
 * @parent StatusWindowFrontAttachment
 * @desc Offset this Battle Status Window element's X.
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param StatusWindowAttachmentFrontOffsetY:num
 * @text Offset: Y
 * @parent StatusWindowFrontAttachment
 * @desc Offset this Battle Status Window element's Y.
 * Negative goes up. Positive goes down.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Log Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLog:
 *
 * @param General
 *
 * @param BackColor:str
 * @text Back Color
 * @parent General
 * @desc Use #rrggbb for a hex color.
 * @default #000000
 *
 * @param MaxLines:num
 * @text Max Lines
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of lines to be displayed.
 * @default 10
 *
 * @param MessageWait:num
 * @text Message Wait
 * @parent General
 * @type number
 * @min 1
 * @desc Number of frames for a usual message wait.
 * @default 16
 *
 * @param TextAlign:str
 * @text Text Align
 * @parent General
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Window_BattleLog.
 * @default center
 *
 * @param BattleLogRectJS:func
 * @text JS: X, Y, W, H
 * @parent General
 * @type note
 * @desc Code used to determine the dimensions for the battle log.
 * @default "const wx = 0;\nconst wy = 0;\nconst ww = Graphics.boxWidth;\nconst wh = this.calcWindowHeight(10, false);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StartTurn
 * @text Start Turn
 *
 * @param StartTurnShow:eval
 * @text Show Start Turn?
 * @parent StartTurn
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display turn changes at the start of the turn?
 * @default false
 *
 * @param StartTurnMsg:str
 * @text Start Turn Message
 * @parent StartTurn
 * @desc Message displayed at turn start.
 * %1 - Turn Count
 * @default Turn %1
 *
 * @param StartTurnWait:num
 * @text Start Turn Wait
 * @parent StartTurn
 * @type number
 * @min 1
 * @desc Number of frames to wait after a turn started.
 * @default 40
 *
 * @param DisplayAction
 * @text Display Action
 *
 * @param ActionCenteredName:eval
 * @text Show Centered Action?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display a centered text of the action name?
 * @default true
 *
 * @param ActionSkillMsg1:eval
 * @text Show Skill Message 1?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the 1st skill message?
 * @default false
 *
 * @param ActionSkillMsg2:eval
 * @text Show Skill Message 2?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the 2nd skill message?
 * @default true
 *
 * @param ActionItemMsg:eval
 * @text Show Item Message?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the item use message?
 * @default false
 *
 * @param ActionChanges
 * @text Action Changes
 *
 * @param ShowCounter:eval
 * @text Show Counter?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display counter text?
 * @default true
 *
 * @param ShowReflect:eval
 * @text Show Reflect?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display magic reflection text?
 * @default true
 *
 * @param ShowSubstitute:eval
 * @text Show Substitute?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display substitute text?
 * @default true
 *
 * @param ActionResults
 * @text Action Results
 *
 * @param ShowFailure:eval
 * @text Show No Effect?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display no effect text?
 * @default false
 *
 * @param ShowCritical:eval
 * @text Show Critical?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display critical text?
 * @default false
 *
 * @param ShowMissEvasion:eval
 * @text Show Miss/Evasion?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display miss/evasion text?
 * @default false
 *
 * @param ShowHpDmg:eval
 * @text Show HP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display HP Damage text?
 * @default false
 *
 * @param ShowMpDmg:eval
 * @text Show MP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display MP Damage text?
 * @default false
 *
 * @param ShowTpDmg:eval
 * @text Show TP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display TP Damage text?
 * @default false
 *
 * @param DisplayStates
 * @text Display States
 *
 * @param ShowAddedState:eval
 * @text Show Added States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added states text?
 * @default false
 *
 * @param ShowRemovedState:eval
 * @text Show Removed States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display removed states text?
 * @default false
 *
 * @param ShowCurrentState:eval
 * @text Show Current States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the currently affected state text?
 * @default false
 *
 * @param ShowAddedBuff:eval
 * @text Show Added Buffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added buffs text?
 * @default false
 *
 * @param ShowAddedDebuff:eval
 * @text Show Added Debuffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added debuffs text?
 * @default false
 *
 * @param ShowRemovedBuff:eval
 * @text Show Removed Buffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display removed de/buffs text?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Battleback Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Battleback:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option MZ (MZ's default style)
 * @value MZ
 * @option 1:1 (No Scaling)
 * @value 1:1
 * @option Scale To Fit (Scale to screen size)
 * @value ScaleToFit
 * @option Scale Down (Scale Downward if Larger than Screen)
 * @value ScaleDown
 * @option Scale Up (Scale Upward if Smaller than Screen)
 * @value ScaleUp
 * @desc The default scaling style used for battlebacks.
 * @default MZ
 *
 * @param jsOneForOne:func
 * @text JS: 1:1
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst scale = 1.0;\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = 0;\nthis.y = 0;"
 *
 * @param jsScaleToFit:func
 * @text JS: Scale To Fit
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = this.width / this.bitmap.width;\nconst ratioY = this.height / this.bitmap.height;\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;"
 *
 * @param jsScaleDown:func
 * @text JS: Scale Down
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = Math.min(1, this.width / this.bitmap.width);\nconst ratioY = Math.min(1, this.height / this.bitmap.height);\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;"
 *
 * @param jsScale Up:func
 * @text JS: Scale Up
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = Math.max(1, this.width / this.bitmap.width);\nconst ratioY = Math.max(1, this.height / this.bitmap.height);\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;"
 *
 */
/* ----------------------------------------------------------------------------
 * Party Command Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PartyCmd:
 *
 * @param Cmd
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Cmd
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Party Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Cmd
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Party Command Window.
 * @default left
 *
 * @param CmdIconFight:num
 * @text Fight Icon
 * @parent Cmd
 * @desc The icon used for the Fight command.
 * @default 76
 *
 * @param CommandAddAutoBattle:eval
 * @text Add Auto Battle?
 * @parent Cmd
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Auto Battle" command to the Command Window?
 * @default true
 *
 * @param CmdIconAutoBattle:num
 * @text Auto Battle Icon
 * @parent CommandAddAutoBattle:eval
 * @desc The icon used for the Auto Battle command.
 * @default 78
 *
 * @param CmdTextAutoBattle:str
 * @text Auto Battle Text
 * @parent CommandAddAutoBattle:eval
 * @desc The text used for the Auto Battle command.
 * @default Auto
 *
 * @param CommandAddOptions:eval
 * @text Add Options?
 * @parent Cmd
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Options" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptions:num
 * @text Options Icon
 * @parent CommandAddOptions:eval
 * @desc The icon used for the Options command.
 * @default 83
 *
 * @param ActiveTpbOptionsMessage:str
 * @text Active TPB Message
 * @parent CommandAddOptions:eval
 * @desc Message that will be displayed when selecting options during the middle of an action.
 * @default Options Menu queued after action is complete.
 *
 * @param CmdIconEscape:num
 * @text Escape Icon
 * @parent Cmd
 * @desc The icon used for the Escape command.
 * @default 82
 *
 * @param Access
 *
 * @param SkipPartyCmd:eval
 * @text Skip Party Command
 * @parent Access
 * @type boolean
 * @on Skip
 * @off Don't
 * @desc DTB: Skip Party Command selection on turn start.
 * TPB: Skip Party Command selection at battle start.
 * @default true
 *
 * @param DisablePartyCmd:eval
 * @text Disable Party Command
 * @parent Access
 * @type boolean
 * @on Disable
 * @off Don't
 * @desc Disable the Party Command Window entirely?
 * @default false
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpFight:str
 * @text Fight
 * @parent HelpWindow
 * @desc Text displayed when selecting a skill type.
 * %1 - Skill Type Name
 * @default Select actions to fight.
 *
 * @param HelpAutoBattle:str
 * @text Auto Battle
 * @parent HelpWindow
 * @desc Text displayed when selecting the Auto Battle command.
 * @default Sets party to Auto Battle mode.
 *
 * @param HelpOptions:str
 * @text Options
 * @parent HelpWindow
 * @desc Text displayed when selecting the Options command.
 * @default Opens up the Options Menu.
 *
 * @param HelpEscape:str
 * @text Escape
 * @parent HelpWindow
 * @desc Text displayed when selecting the escape command.
 * @default Attempt to escape the battle.
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Command Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActorCmd:
 *
 * @param Cmd
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Cmd
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Actor Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Cmd
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Actor Command Window.
 * @default left
 *
 * @param CmdIconItem:num
 * @text Item Icon
 * @parent Cmd
 * @desc The icon used for the Item command.
 * @default 176
 *
 * @param IconStypeNorm:num
 * @text Normal SType Icon
 * @parent Cmd
 * @desc Icon used for normal skill types that aren't assigned any
 * icons. Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Magic SType Icon
 * @parent Cmd
 * @desc Icon used for magic skill types that aren't assigned any
 * icons. Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * @default 79
 *
 * @param BattleCmd
 * @text Battle Commands
 *
 * @param BattleCmdList:arraystr
 * @text Command List
 * @parent BattleCmd
 * @type combo[]
 * @option attack
 * @option skills
 * @option guard
 * @option item
 * @option party
 * @option escape
 * @option auto battle
 * @option stypes
 * @option stype: x
 * @option stype: name
 * @option all skills
 * @option skill: x
 * @option skill: name
 * @option combat log
 * @desc List of battle commands that appear by default
 * if the <Battle Commands> notetag isn't present.
 * @default ["attack","skills","guard","party","item"]
 *
 * @param ShowCosts:eval
 * @text Show Command Costs
 * @parent BattleCmd
 * @type boolean
 * @on Show Costs
 * @off Hide Costs
 * @desc If a battle command has a resource cost, show it?
 * @default true
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpSkillType:str
 * @text Skill Types
 * @parent HelpWindow
 * @desc Text displayed when selecting a skill type.
 * %1 - Skill Type Name
 * @default Opens up a list of skills under the \C[16]%1\C[0] category.
 *
 * @param HelpItem:str
 * @text Items
 * @parent HelpWindow
 * @desc Text displayed when selecting the item command.
 * @default Opens up a list of items that you can use.
 *
 * @param HelpEscape:str
 * @text Escape
 * @parent HelpWindow
 * @desc Text displayed when selecting the escape command.
 * @default Attempt to escape the battle.
 *
 * @param HelpAutoBattle:str
 * @text Auto Battle
 * @parent HelpWindow
 * @desc Text displayed when selecting the Auto Battle command.
 * @default Automatically choose an action suitable for combat.
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Actor:
 *
 * @param Flinch
 *
 * @param FlinchDistanceX:num
 * @text Flinch Distance X
 * @parent Flinch
 * @desc The normal X distance when flinching.
 * @default 12
 *
 * @param FlinchDistanceY:num
 * @text Flinch Distance Y
 * @parent Flinch
 * @desc The normal Y distance when flinching.
 * @default 0
 *
 * @param FlinchDuration:num
 * @text Flinch Duration
 * @parent Flinch
 * @desc The number of frames for a flinch to complete.
 * @default 6
 *
 * @param SvBattlers
 * @text Sideview Battlers
 *
 * @param AnchorX:num
 * @text Anchor: X
 * @parent SvBattlers
 * @desc Default X anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor: Y
 * @parent SvBattlers
 * @desc Default Y anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param ChantStyle:eval
 * @text Chant Style
 * @parent SvBattlers
 * @type boolean
 * @on Magical Hit Type
 * @off Magical Skill Type
 * @desc What determines the chant motion?
 * Hit type or skill type?
 * @default true
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent SvBattlers
 * @desc Offsets X position where actor is positioned.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent SvBattlers
 * @desc Offsets Y position where actor is positioned.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param MotionSpeed:num
 * @text Motion Speed
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc The number of frames in between each motion.
 * @default 12
 *
 * @param PrioritySortActive:eval
 * @text Priority: Active
 * @parent SvBattlers
 * @type boolean
 * @on Active Actor over All Else
 * @off Active Actor is Sorted Normally
 * @desc Place the active actor on top of actor and enemy sprites.
 * @default false
 *
 * @param PrioritySortActors:eval
 * @text Priority: Actors
 * @parent SvBattlers
 * @type boolean
 * @on Actors over Enemies
 * @off Sort by Y Position
 * @desc Prioritize actors over enemies when placing sprites on top
 * of each other.
 * @default true
 *
 * @param Shadow:eval
 * @text Shadow Visible
 * @parent SvBattlers
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the shadow for Sideview Battlers.
 * @default true
 *
 * @param SmoothImage:eval
 * @text Smooth Image
 * @parent SvBattlers
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Smooth out the battler images or pixelate them?
 * @default false
 *
 * @param HomePosJS:func
 * @text JS: Home Position
 * @parent SvBattlers
 * @type note
 * @desc Code used to calculate the home position of actors.
 * @default "// Declare Constants\nconst sprite = this;\nconst actor = this._actor;\nconst index = arguments[0];\n\n// Make Calculations\nlet x = Math.round((Graphics.width / 2) + 192)\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\nx += index * 32;\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\ny += index * 48;\n\n// Home Position Offsets\nconst offsetNote = /<SIDEVIEW HOME OFFSET:[ ]([\\+\\-]\\d+),[ ]([\\+\\-]\\d+)>/i;\nconst xOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\nconst yOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\nx = xOffsets.reduce((r, offset) => r + offset, x);\ny = yOffsets.reduce((r, offset) => r + offset, y);\n\n// Set Home Position\nthis.setHome(x, y);"
 *
 */
/* ----------------------------------------------------------------------------
 * Enemy Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Enemy:
 *
 * @param Visual
 *
 * @param AttackAnimation:num
 * @text Attack Animation
 * @parent Visual
 * @type animation
 * @desc Default attack animation used for enemies.
 * Use <Attack Animation: x> for custom animations.
 * @default 1
 *
 * @param EmergeText:eval
 * @text Emerge Text
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show or hide the 'Enemy emerges!' text at the start of battle.
 * @default false
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent Visual
 * @desc Offsets X position where enemy is positioned.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent Visual
 * @desc Offsets Y position where enemy is positioned.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param SmoothImage:eval
 * @text Smooth Image
 * @parent Visual
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Smooth out the battler images or pixelate them?
 * @default true
 *
 * @param SelectWindow
 * @text Select Window
 *
 * @param LastSelected:eval
 * @text Any: Last Selected
 * @parent SelectWindow
 * @type boolean
 * @on Last Selected
 * @off FV/SV Priority
 * @desc Prioritize last selected enemy over front view or sideview settings?
 * @default true
 *
 * @param FrontViewSelect:eval
 * @text FV: Right Priority
 * @parent SelectWindow
 * @type boolean
 * @on Right
 * @off Normal
 * @desc If using frontview, auto select the enemy furthest right.
 * @default false
 *
 * @param SideviewSelect:eval
 * @text SV: Right Priority
 * @parent SelectWindow
 * @type boolean
 * @on Right
 * @off Normal
 * @desc If using sideview, auto select the enemy furthest right.
 * @default true
 * 
 * @param Name
 *
 * @param NameFontSize:num
 * @text Name: Font Size
 * @parent Name
 * @desc Font size used for enemy names.
 * @default 22
 *
 * @param NameOffsetX:num
 * @text Name: Offset X
 * @parent Name
 * @desc Offset the enemy name's X position by this much.
 * Negative goes left. Positive goes right.
 * @default 0
 *
 * @param NameOffsetY:num
 * @text Name: Offset Y
 * @parent Name
 * @desc Offset the enemy name's Y position by this much.
 * Negative goes up. Positive goes down.
 * @default 0
 *
 * @param NameAlwaysVisible:eval
 * @text Name: Always Visible
 * @parent Name
 * @type boolean
 * @on Always Visible
 * @off Hide when Unselected
 * @desc Determines if the enemy name will always be visible.
 * @default false
 *
 * @param NameAttachStateIcon:eval
 * @text Name: Attach States
 * @parent Name
 * @type boolean
 * @on Attach
 * @off Normal Position
 * @desc Attach the enemy's state icon to the enemy name?
 * @default false
 *
 * @param AttachStateOffsetX:num
 * @text Attach: Offset X
 * @parent NameAttachStateIcon:eval
 * @desc How much to offset the attached icon's X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param AttachStateOffsetY:num
 * @text Attach: Offset Y
 * @parent NameAttachStateIcon:eval
 * @desc How much to offset the attached icon's Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param NameLegacy:eval
 * @text Legacy Option
 * @parent Name
 * @type boolean
 * @on Legacy Version
 * @off New Version (Sprite)
 * @desc Use the legacy version (window) or new version (sprite).
 * WARNING: Legacy version is no longer supported for bugs.
 * @default false
 *
 * @param SvBattlers
 * @text Sideview Battlers
 *
 * @param AllowCollapse:eval
 * @text Allow Collapse
 * @parent SvBattlers
 * @type boolean
 * @on Allow
 * @off Don't
 * @desc Causes defeated enemies with SV Battler graphics
 * to "fade away" when defeated?
 * @default false
 *
 * @param AnchorX:num
 * @text Anchor: X
 * @parent SvBattlers
 * @desc Default X anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor: Y
 * @parent SvBattlers
 * @desc Default Y anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param MotionIdle:str
 * @text Motion: Idle
 * @parent SvBattlers
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Sets default idle animation used by Sideview Battlers.
 * @default walk
 *
 * @param Shadow:eval
 * @text Shadow Visible
 * @parent SvBattlers
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the shadow for Sideview Battlers.
 * @default true
 *
 * @param Width:num
 * @text Size: Width
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc Default width for enemies that use Sideview Battlers.
 * @default 64
 *
 * @param Height:num
 * @text Size: Height
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc Default height for enemies that use Sideview Battlers.
 * @default 64
 *
 * @param WtypeId:num
 * @text Weapon Type
 * @parent SvBattlers
 * @type number
 * @min 0
 * @desc Sets default weapon type used by Sideview Battlers.
 * Use 0 for Bare Hands.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * HP Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~HpGauge:
 *
 * @param Display
 * @text Show Gauges For
 *
 * @param ShowActorGauge:eval
 * @text Actors
 * @parent Display
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show HP Gauges over the actor sprites' heads?
 * Requires SV Actors to be visible.
 * @default true
 *
 * @param ShowEnemyGauge:eval
 * @text Enemies
 * @parent Display
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show HP Gauges over the enemy sprites' heads?
 * Can be bypassed with <Hide HP Gauge> notetag.
 * @default true
 *
 * @param RequiresDefeat:eval
 * @text Requires Defeat?
 * @parent ShowEnemyGauge:eval
 * @type boolean
 * @on Require Defeat First
 * @off No Requirement
 * @desc Requires defeating the enemy once to show HP Gauge?
 * Can be bypassed with <Show HP Gauge> notetag.
 * @default true
 *
 * @param BTestBypass:eval
 * @text Battle Test Bypass?
 * @parent RequiresDefeat:eval
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass the defeat requirement in battle test?
 * @default true
 *
 * @param Settings
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Settings
 * @desc Where do you want the HP Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Settings
 * @desc Where do you want the HP Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent Settings
 * @desc How large/small do you want the HP Gauge to be scaled?
 * @default 0.5
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Settings
 * @desc How many pixels to offset the HP Gauge's X by?
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Settings
 * @desc How many pixels to offset the HP Gauge's Y by?
 * @default -3
 *
 * @param Options
 * @text Options
 *
 * @param AddHpGaugeOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show HP Gauge' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show HP Gauge
 *
 */
/* ----------------------------------------------------------------------------
 * Action Sequence Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActionSequence:
 *
 * @param AutoSequences
 * @text Automatic Sequences
 *
 * @param AutoMeleeSolo:eval
 * @text Melee Single Target
 * @parent AutoSequences
 * @type boolean
 * @on Allow
 * @off Ignore
 * @desc Allow this auto sequence for physical, single target actions?
 * @default true
 *
 * @param AutoMeleeAoE:eval
 * @text Melee Multi Target
 * @parent AutoSequences
 * @type boolean
 * @on Allow
 * @off Ignore
 * @desc Allow this auto sequence for physical, multi-target actions?
 * @default true
 *
 * @param QoL
 * @text Quality of Life
 *
 * @param AutoNotetag:eval
 * @text Auto Notetag
 * @parent QoL
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically apply the <Custom Action Sequence> notetag
 * effect to any item or skill that has a Common Event?
 * @default false
 *
 * @param CastAnimations
 * @text Cast Animations
 *
 * @param CastCertain:num
 * @text Certain Hit
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Certain Hit skills.
 * @default 120
 *
 * @param CastPhysical:num
 * @text Physical
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Physical skills.
 * @default 52
 *
 * @param CastMagical:num
 * @text Magical
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Magical skills.
 * @default 51
 *
 * @param CounterReflection
 * @text Counter/Reflect
 *
 * @param CounterPlayback:eval
 * @text Counter Back
 * @parent CounterReflection
 * @type boolean
 * @on Play Back
 * @off Ignore
 * @desc Play back the attack animation used?
 * @default true
 *
 * @param ReflectAnimation:num
 * @text Reflect Animation
 * @parent CounterReflection
 * @type animation
 * @desc Animation played when an action is reflected.
 * @default 1
 *
 * @param ReflectPlayback:eval
 * @text Reflect Back
 * @parent CounterReflection
 * @type boolean
 * @on Play Back
 * @off Ignore
 * @desc Play back the attack animation used?
 * @default true
 *
 * @param Stepping
 *
 * @param MeleeDistance:num
 * @text Melee Distance
 * @parent Stepping
 * @desc Minimum distance in pixels for Movement Action Sequences.
 * @default 24
 *
 * @param StepDistanceX:num
 * @text Step Distance X
 * @parent Stepping
 * @desc The normal X distance when stepping forward.
 * @default 48
 *
 * @param StepDistanceY:num
 * @text Step Distance Y
 * @parent Stepping
 * @desc The normal Y distance when stepping forward.
 * @default 0
 *
 * @param StepDuration:num
 * @text Step Duration
 * @parent Stepping
 * @desc The number of frames for a stepping action to complete.
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Projectile Start Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ProjectileStart:
 * 
 * @param Type:str
 * @text Type
 * @type select
 * @option Target - Start from battler target(s)
 * @value target
 * @option Point - Start from a point on the screen
 * @value point
 * @desc Select where the projectile should start from.
 * @default target
 * 
 * @param Targets:arraystr
 * @text Target(s)
 * @parent Type:str
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to start the projectile from.
 * @default ["user"]
 * 
 * @param TargetCenter:eval
 * @text Centralize
 * @parent Targets:arraystr
 * @type boolean
 * @on Center Projectile
 * @off Create Each
 * @desc Create one projectile at the center of the targets?
 * Or create a projectile for each target?
 * @default false
 * 
 * @param PointX:eval
 * @text Point X
 * @parent Type:str
 * @desc Insert the X coordinate to start the projectile at.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @param PointY:eval
 * @text Point Y
 * @parent Type:str
 * @desc Insert the Y coordinate to start the projectile at.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @param OffsetX:eval
 * @text Offset X
 * @desc Insert how many pixels to offset the X coordinate by.
 * You may use JavaScript code.
 * @default +0
 * 
 * @param OffsetY:eval
 * @text Offset Y
 * @desc Insert how many pixels to offset the Y coordinate by.
 * You may use JavaScript code.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Projectile Goal Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ProjectileGoal:
 * 
 * @param Type:str
 * @text Type
 * @type select
 * @option Target - Goal is battler target(s)
 * @value target
 * @option Point - Goal is a point on the screen
 * @value point
 * @desc Select where the projectile should go to.
 * @default target
 * 
 * @param Targets:arraystr
 * @text Target(s)
 * @parent Type:str
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) for projectile to go to.
 * @default ["all targets"]
 * 
 * @param TargetCenter:eval
 * @text Centralize
 * @parent Targets:arraystr
 * @type boolean
 * @on Center Projectile
 * @off Create Each
 * @desc Set goal in the center of targets?
 * Or create a projectile to go to each target?
 * @default false
 * 
 * @param PointX:eval
 * @text Point X
 * @parent Type:str
 * @desc Insert the X coordinate to send the projectile to.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @param PointY:eval
 * @text Point Y
 * @parent Type:str
 * @desc Insert the Y coordinate to send the projectile to.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @param OffsetX:eval
 * @text Offset X
 * @desc Insert how many pixels to offset the X coordinate by.
 * You may use JavaScript code.
 * @default +0
 * 
 * @param OffsetY:eval
 * @text Offset Y
 * @desc Insert how many pixels to offset the Y coordinate by.
 * You may use JavaScript code.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Projectile Extra Animation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ProjectileExAni:
 * 
 * @param AutoAngle:eval
 * @text Auto Angle?
 * @parent Settings
 * @type boolean
 * @on Automatically Angle
 * @off Normal
 * @desc Automatically angle the projectile to tilt the direction it's moving?
 * @default true
 * 
 * @param AngleOffset:eval
 * @text Angle Offset
 * @desc Alter the projectile's tilt by this many degrees.
 * @default +0
 * 
 * @param Arc:eval
 * @text Arc Peak
 * @parent Settings
 * @desc This is the height of the project's trajectory arc
 * in pixels.
 * @default 0
 *
 * @param EasingType:str
 * @text Easing
 * @parent Settings
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
 * @desc Select which easing type to apply to the projectile's trajectory.
 * @default Linear
 * 
 * @param Spin:eval
 * @text Spin Speed
 * @parent Settings
 * @desc Determine how much angle the projectile spins per frame.
 * Does not work well with "Auto Angle".
 * @default +0.0
 *
 */
/* ----------------------------------------------------------------------------
 * Projectile Extra Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ProjectileExtra:
 * 
 * @param AutoAngle:eval
 * @text Auto Angle?
 * @parent Settings
 * @type boolean
 * @on Automatically Angle
 * @off Normal
 * @desc Automatically angle the projectile to tilt the direction it's moving?
 * @default true
 * 
 * @param AngleOffset:eval
 * @text Angle Offset
 * @desc Alter the projectile's tilt by this many degrees.
 * @default +0
 * 
 * @param Arc:eval
 * @text Arc Peak
 * @parent Settings
 * @desc This is the height of the project's trajectory arc
 * in pixels.
 * @default 0
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the projectile?
 * @default 0
 *
 * @param EasingType:str
 * @text Easing
 * @parent Settings
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
 * @desc Select which easing type to apply to the projectile's trajectory.
 * @default Linear
 * 
 * @param Hue:eval
 * @text Hue
 * @parent Settings
 * @desc Adjust the hue of the projectile.
 * Insert a number between 0 and 360.
 * @default 0
 * 
 * @param Scale:eval
 * @text Scale
 * @parent Settings
 * @desc Adjust the size scaling of the projectile.
 * Use decimals for exact control.
 * @default 1.0
 * 
 * @param Spin:eval
 * @text Spin Speed
 * @parent Settings
 * @desc Determine how much angle the projectile spins per frame.
 * Does not work well with "Auto Angle".
 * @default +0.0
 *
 */
//=============================================================================

const _0x505f=['partyCommandWindowRect','setFrame','_damageContainer','updateActors','makeEscapeRatio','createAttachedSprites','Sprite_StateIcon_updateFrame','bitmapHeight','drawText','drawIcon','JS\x20ESCAPE\x20SUCCESS','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20obj\x20=\x20arguments[2];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x20arguments[3]\x20||\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20value;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Constants\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20action\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this\x20:\x20user.currentAction();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20attacker\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20defender\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20healer\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20receiver\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20actor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20currentClass\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20item\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20weapon\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20armor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20enemy\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20obj;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Create\x20Compatibility\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20origin\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(Imported.VisuMZ_1_SkillsStatesCore\x20&&\x20$dataStates.includes(obj))\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20origin\x20=\x20target.getStateOrigin(obj.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(value)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20value\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20value\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20value\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','HitRate','attackSkillId','DefaultSoftScaler','Game_Battler_startTpbTurn','VariableHeal','_endBattle','Game_Action_isForOpponent','isAnyoneMoving','loadSvActor','buffAdd','NameAlwaysVisible','ActSeq_Mechanics_Multipliers','command3011','optDisplayTp','dead\x20enemies','BattleCmdList','isNonSubmenuCancel','custom','isAnyoneJumping','VisuMZ_4_CombatLog','alive\x20actors\x20not\x20target','Game_Battler_onTurnEnd','STR','ActionCount','WaitForFloat','statusText','Scene_Boot_onDatabaseLoaded','updateCommandNameWindow','_canLose','LUK','ActSeq_Element_AddElements','MOTIONS','Scene_Options_maxCommands','command301','createBattleFieldBattleCore','SwitchCritical','stbGainInstant','performActionMotions','clearResult','States','surprise','isBorderStylePortraitShown','ActSeq_Mechanics_StbExtraAction','ActSeq_BattleLog_WaitForBattleLog','BattleManager_startTurn','VisuMZ_1_SkillsStatesCore','STYPES','WaitForJump','setupTextPopup','ActSeq_Camera_Clamp','adjustPosition_1for1','ActSeq_Movement_Jump','performAttack','jumpBattler','%1EndBattleJS','setHelpWindowItem','createContents','opacityStart','isBattleTest','RepositionEnemies','SkillsStatesCore','performMoveToTargets','isDying','WaitCount1','ChargeRate','drawItemStyleIconText','currentAction','HpGaugeOffsetY','height','battleCommands','_targetSkewY','refreshRequest','AS\x20USER','name','softDamageCapRate','sort','ShowPopup','addItemCommand','attackMotions','_subject','enemy','commandStyleCheck','isFastForward','HpGauge','TpbGaugeOffsetY','hasSkill','setHandler','hardDamageCap','resetBreakShield','_enemyID','Scene_Battle_start','updateWaitMode','updateAngleCalculations','VisuMZ_2_BattleSystemBTB','isDamagePopupRequested','resizeWindowXPStyle','BARE\x20HANDS','front\x20base','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','replace','delay','WaitForAnimation','VisuMZ_2_DragonbonesUnion','forceWeaponAnimation','ARRAYFUNC','svBattlerShadowVisible','index','updateFlip','_executedValue','isTeamBased','Game_Action_apply','%1StartActionJS','HP_Rate','prev\x20target','_phase','ConfigManager_makeData','_distortionSprite','updatePadding','setMoveEasingType','AlphaFilter','VisuMZ_2_HorrorEffects','reduce','getChildIndex','PostEndActionJS','_battler','456425sUlShD','setText','showPortraits','ActSeq_Movement_MoveToPoint','dead\x20opponents','_targetAngle','result','performMoveToPoint','damageContainer','ReflectPlayback','BattleManager_startBattle','currentExt','setup','options','_battleLayoutStyle','remove','699088cuiPzi','addAutoBattleCommands','ActSeq_BattleLog_DisplayAction','parent','ActSeq_Mechanics_AddState','isCustomActionSequence','isFlipped','itemRect','collapseType','FaceDirection','_enemies','update','border','addEscapeCommand','_motionType','ActSeq_Mechanics_WaitForEffect','alive\x20battlers\x20not\x20user','AttackAnimation','battleUIOffsetX','loadBattleback2','top','placeStateIcon','makeCommandList','HP_Flat','Window_BattleLog_update','guardSkillId','StatusWindowAttachmentFront','ParseItemNotetags','_opacityWholeDuration','Window_BattleLog_performCounter','hpAffected','putActiveBattlerOnTop','Pre','angleDuration','NUM','inBattle','ActSeq_Horror_Clear','checkCacheKey','Window_BattleLog_popBaseLine','skill','Targets2','setupCriticalEffect','PreDamageAsUserJS','updatePosition','applyVariance','Game_Action_needsSelection','setHue','destroy','ActSeq_Mechanics_AtbGauge','isFrameVisible','visibilityState','_weaponImageId','isAnimationPlaying','gainStoredBoostPoints','flashColor','_commonEventQueue','freezeMotion','AsTarget','apply','attackAnimationId1','currentSymbol','VisuMZ_2_BattleSystemSTB','DamageType%1','endBattle','ActSeq_ChangeAngle','_animationSprites','removeAnimationFromContainer','ForceDeath','updateEffectContainers','physical','_homeY','alive\x20battlers\x20not\x20target','flashDuration','JS\x20%1START\x20BATTLE','Window_BattleEnemy_show','loadPicture','WaitForCamera','_battlerHue','createDamageSprite','battleOpacity','updateInterpreter','canAddSkillCommand','createAnimationSprite','thrust','Window_BattleLog_pushBaseLine','Window_ActorCommand_setup','smooth','deadMembers','ActSeq_Mechanics_DamagePopup','StartTurnShow','Sprite_Enemy_setBattler','Sprite_Enemy_update','bossCollapse','ActSeq_Movement_Spin','moveToStartPositionBattleCore','getNextSubject','waitForNewLine','ShowReflect','_skewDuration','isDuringNonLoopingMotion','removeDamageSprite','ActSeq_Target_RandTarget','exit','createStateIconSprite','Window_BattleEnemy_initialize','isForAll','ActSeq_Zoom_Scale','_handlers','ActSeq_BattleLog_Refresh','NameOffsetY','clearRect','drawItemStatusListStyle','addDebuff','checkShowHideBattleNotetags','startTurn','addSkillTypeCommand','setWaitMode','Sprite_Battler_updatePosition','Scene_Battle_onEnemyCancel','EmergeText','indexOf','applyGlobalCommonEventNotetags','onActorCancel','charging','setupRgbSplitImpactFilter','drawItemImage','createBattleUIOffsetX','linkSprite','OverallFormulaJS','itemHeight','Scene_Battle_startActorSelection','_battleCoreBattleStartEvent','682364zfxSdD','magicReflection','isMagicSkill','onJumpEnd','Targets1','Window_BattleLog_refresh','chantStyle','getDualWieldTimes','weaponTypes','ActSeq_Mechanics_SwapWeapon','updateFloat','17389ehaYJb','_appeared','PreStartActionJS','+%1','DamageStyleList','ActSeq_Target_NextTarget','onGrowEnd','+%1\x20MP','uiInputPosition','helpAreaHeight','_padding','process_VisuMZ_BattleCore_jsFunctions','isUndecided','sleep','code','TextAlign','displayCritical','Sprite_Battler_isMoving','toUpperCase','_frontAttachmentSprite','Window_BattleLog_performMagicEvasion','anchorX','WaitForNewLine','PostEndTurnJS','startOpacity','autoBattleAtStart','setActionState','displaySubstitute','WaitCount','Filename','CastAnimation','EFFECT_COMMON_EVENT','wtypeId','_enemyNameContainer','_jumpWholeDuration','ConfigManager_applyData','makeData','isAttack','note','adjustFlippedBattlefield','isOnCurrentMap','statusWindowRectXPStyle','fittingHeight','redraw','removeBuffsAuto','Game_Battler_performMiss','ActSeq_BattleLog_Clear','DefeatEvent','boxHeight','ElementStatusCore','setSTBExploited','checkTpbInputOpen','startPartyCommandSelection','updateVisibility','StatusWindowSkinHide','AsUser','HelpEscape','customDamageFormula','_createCursorSprite','applyFreezeMotionFrames','needsSelection','ATK','_pattern','ActSeq_BattleLog_AddText','occasion','prepareCustomActionSequence','isWaiting','addBattleCoreAutoBattleStartupCommand','createKeyJS','preemptive','_active','_lines','PostDamageAsTargetJS','visualHpGauge','ActSeq_Animation_AttackAnimation2','spell','requestAnimation','itemCri','textColor','Sprite_Actor_initMembers','NewPopupBottom','evade','randomInt','createHelpWindowBattleCore','_flinched','ScaleX','ActSeq_Horror_TVCreate','setSvBattlerSprite','ArPenRate','WaitForMovement','SkewY','ARRAYSTRUCT','startJump','Game_Map_battleback2Name','gainTp','revertTpbCachedActor','isAnyoneSpinning','86743lvzQmh','clearBattleCoreData','WaitForAngle','updateStateSprite','callOkHandler','VisuMZ_2_BattleSystemFTB','missed','isOpponent','applyArmorModifiers','_targetOpacity','_createDamageContainer','_createClientArea','CheckSkillCommandShowSwitches','createEmptyBitmap','battlerSmoothImage','Window_BattleLog_displayCurrentState','playEnemyAttack','TP_Flat','Game_Interpreter_PluginCommand','EscapeFailureJS','ActSeq_BattleLog_WaitForNewLine','OffsetAdjust','emerge','notFocusValid','adjustWeaponSpriteOffset','contents','changeWeather','_forcedBattlers','ActionItemMsg','PopupShiftX','mpHealingFmt','_updateFilterArea','getInputButtonString','Exploited','children','Text','isAlwaysVisible','Game_Action_itemEffectAddAttackState','_actions','onOpacityEnd','Scene_Battle_itemWindowRect','BattleManager_selectNextCommand','Window_BattleStatus_drawItemImage','hide','floor','_battleCoreForcedElements','aliveMembers','PreStartBattleJS','Game_Action_evalDamageFormula','user','skillItemWindowRectBorderStyle','lineHeight','_action','registerDefeatedEnemy','createBattleFieldContainer','_flipScaleX','Window_BattleLog_performCollapse','commandSymbol','_autoBattle','isDeathStateAffected','EscapeSuccessJS','ActSeq_Zoom_Reset','destroyDamageSprite','performJump','initMembers','battleCoreTpbMainPhase','die','applyGuard','useItem','Game_Action_makeTargets','JS\x20%1APPLY\x20%2','Game_Battler_performDamage','processDefeat','isSpriteVisible','getDefeatedEnemies','Sprite_Weapon_loadBitmap','isNextSceneBattleTransitionable','alive\x20enemies\x20not\x20user','getBattlePortraitFilename','traitObjects','ShowMissEvasion','StatusWindowAttachmentBackOffsetX','undecided','skillId','%1EndActionJS','initVisibility','Sprite_Battleback_adjustPosition','getAttackMotionSlot','BattleDefeatJS','Parse_Notetags_Action','getDamageStyle','FrontViewSelect','_forcing','some','setBattlerFlip','Scene_Map_launchBattle','_cursorSprite','battleFloat','criticalDmgRate','ActSeq_Horror_NoiseRemove','command339','cameraOffsetDuration','performActionStart','Height','isChangingOpacity','startBattle','ActSeq_Movement_WaitForSpin','addChildAt','EVAL','processBattleCoreJS','terminate','createDigits','updateShadow','_preBattleCommonEvent','addAnimationSpriteToContainer','TP_Rate','_opacityDuration','default','PostRegenerateJS','ActSeq_Mechanics_StbRemoveExcessActions','finishActionSet','damage','_actor','needsActorInputCancel','collapse','ActSeq_Mechanics_BreakShieldChange','MotionIdle','createDistortionSprite','bottom','DefaultHardCap','changePaintOpacity','onBattleStartBattleCore','abs','setupChild','Window_BattleLog_displayCritical','PostStartActionJS','DEF','ActionEndUpdate','text\x20target','walk','ActSeq_Mechanics_RemoveState','performSubstitute','gaugeLineHeight','AutoBattleOK','ParseStateNotetags','Sprite_Battler_updateMain','SvWeaponMass-%1-%2','setupZoomBlurImpactFilter','contentsOpacity','ActionEnd','boxWidth','battleCommandName','isConfused','launchBattle','performAttackSlot','Direction','isMVAnimation','trueRandomTarget','svBattlerAnchorY','placeActorName','statusWindowRect','performWeaponAnimation','isMagical','ActSeq_Animation_CastAnimation','Window_BattleLog_displayFailure','concat','AutoBattleCancel','createCommandVisibleJS','center','addOptionsCommand','addAutoBattleCommand','ShowPortraits','Exploiter','performMagicEvasion','2298ZDMOIO','numTargets','PostEndBattleJS','CastCertain','drawItemStatusXPStyle','Sprite_Enemy_updateStateSprite','HpGaugeOffsetX','ARRAYNUM','Debuffs','Skill-%1-%2','setupIconTextPopup','_partyCommandWindow','onSelectAction','canMove','isForOpponentBattleCore','Window_SkillList_maxCols','_commonEventIDs','chant','battleMembers','removeAnimation','PARTY','_regionBattleback1','Scene_Battle_startEnemySelection','Scene_Battle_skillWindowRect','Window_BattleLog_performAction','Parse_Notetags_TraitObjects','ShowPortraitsBorderStyle','isSkewing','AddOption','_borderPortraitSprite','isGuard','BackColor','battleStatusWindowAnimationContainer','ActSeq_Target_CurrentIndex','applyImmortal','hitFlat','GroupDigits','createPartyCommandWindow','ActSeq_ChangeSkew','turn','drawActorFace','clearForcedGameTroopSettingsBattleCore','partyCommandWindowRectXPStyle','waitCount','makeAutoBattleActions','BravePoints','_cacheTextWidth','commandEscape','process_VisuMZ_BattleCore_Notetags','active','initialize','skewBattler','Victory','ActSeq_Horror_TVRemove','getItemDamageAmountLabelOriginal','ActSeq_Skew_WaitForSkew','DistanceY','animationNextDelay','close','updateHelp','isAnyoneSkewing','parse','removeActor','calcWindowHeight','Scene_Battle_commandFight','icon','ActionSkillMsg1','CmdIconEscape','currentClass','createBattleField','isStateResist','_createCursorArea','popBaseLine','FlashColor','performCounter','updateMotionCount','_skillWindow','innerWidth','autoBattleStart','damageStyle','displayActionResults','HelpItem','AnimationID','displayStartMessages','ActSeq_Mechanics_BreakShieldReset','Scene_Battle_stop','_damages','ActSeq_Movement_FaceDirection','call','AdjustRect','startDamagePopup','isCustomBattleScope','waitForMovement','ActSeq_Mechanics_AnalyzeWeakness','commandName','Window_BattleLog_performActionEnd','Game_Map_setupBattleback','setupHpGaugeSprite','allBattleMembers','canGuard','isOptionsCommandEnabled','startInput','isOkEnabled','startGrow','displayHpDamage','addActor','changeCtbCastTime','Sprite_Actor_updateBitmap','Window_ActorCommand_initialize','showEnemyAttackAnimation','AnchorY','isPhysical','battleback1Name','criticalDmgFlat','resizeWindowBorderStyle','battleSpriteSkew','ActSeq_Movement_WaitForMovement','_angleDuration','isAutoBattleCommandEnabled','ParseClassNotetags','9491riwHmO','clear','isTpb','PreApply%1JS','processBorderActor','alive\x20actors','_animation','actorCommandCancelTPB','shift','updateBattlebackBitmap1','ActSeq_Animation_ActionAnimation','BattleManager_isTpbMainPhase','ActorCmd','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_freezeMotionData','waitForAnimation','WaitCount2','updateRefresh','_surprise','drawLineText','updateAttachmentSprites','_immortal','BattleStartEvent','makeBattleCommand','Window_BattleLog_performMiss','updatePositionBattleCore','setImmortal','casting','VisuMZ_1_MainMenuCore','addAttackCommand','VisuMZ_2_WeaponSwapSystem','Formula','CmdIconAutoBattle','ReflectAnimation','endAnimation','MP_Flat','not\x20focus','ActionStart','2czIRfv','Immortal','addCombatLogCommand','updateStyleOpacity','SkillItemStandardCols','isImmortal','ceil','isForOpponent','PrioritySortActive','_item','LastSelected','canAttackBattleCore','CmdIconFight','Post','Game_BattlerBase_isStateResist','toString','isActing','command236','isSkill','isGuardWaiting','DamageFlat','Game_Action_clear','ActSeq_BattleLog_PushBaseLine','addShowHpGaugeCommand','checkTpbInputClose','startTpbTurn','_shake','dimColor2','isAnyoneFloating','addNewState','CmdStyle','SmoothImage','displayEvasion','all\x20targets','setValue','StatusWindowAttachmentFrontOffsetX','SkipPartyCmd','timeScale','createDamageContainer','splice','alive\x20opponents\x20not\x20target','isPreviousSceneBattleTransitionable','_growX','startEnemySelection','Game_Enemy_setup','autoBattleUseSkills','DigitGrouping','autoSelectPriority','MotionAni','makeTargets','ActSeq_Animation_ChangeBattlePortrait','inputtingAction','EscapeSuccess','waitForJump','createAutoBattleWindow','Enemy','BattleManager_processVictory','CriticalColor','placeGauge','Sprite_Actor_updateFrame','_linkedSprite','_list','_totalValue','mainFontSize','isActor','%1Damage%2JS','removeBuff','animationShouldMirror','BattleLogRectJS','sideview_ui','ActSeq_Movement_HomeReset','measureTextWidth','waitForEffect','drawItemStyleIcon','VisuMZ_3_SideviewBattleUI','loadBitmap','hasBeenDefeatedBefore','removedStateObjects','allowRandomSpeed','gainBravePoints','drain','Scene_Map_initialize','criticalHitRate','initMembersBattleCore','Buffs','_text','pages','getNextDamagePopup','repeatTargets','float','MP_Rate','updateCustomActionSequence','svBattlerData','invokeAction','Linear','arPenRate','critical','Game_Battler_regenerateAll','battleCamera','applyAngleChange','isOpen','initBattleCore','PreApplyAsTargetJS','Game_BattlerBase_eraseState','stop','becomeSTBExploited','BattleManager_processDefeat','updateBattlerContainer','_targetGrowX','list','createStateSprite','isFriendly','friendsUnit','makeTargetSprites','_skewEasing','_lastEnemy','Spriteset_Battle_updateActors','StatusWindowAttachmentBack','PerformAction','setupFont','skewDuration','AllowRandomSpeed','_tpbSceneChangeCacheActor','isAppeared','atbInterrupt','_currentActor','drawTextEx','useDigitGrouping','getBattlePortraitOffsetY','VisuMZ_2_BattleSystemCTB','mainSpriteHeight','adjustPosition_ScaleToFit','updateHpGaugePosition','CalcEscapeRaiseJS','_growEasing','base','frameVisible','battleAnimation','AttachStateOffsetX','Scene_Battle_onActorOk','snapForBackground','_opacityEasing','isMeleeMultiTargetAction','Window_BattleLog_performRecovery','deathStateId','displayReflectionPlayBack','setActiveWeaponSlot','ActSeq_Mechanics_StbExploit','Game_BattlerBase_canGuard','StepDuration','BaseTroopIDs','getHardDamageCap','Game_Map_battleback1Name','usePremadeActionSequence','front\x20center','unshift','_scene','BattleLayout','applyEasing','wholeActionSet','ext','gainMp','AddHpGaugeOption','isSpinning','anchorY','setBattleZoom','focus','displayFailure','callNextMethod','BattleManager_inputtingAction','ConvertActionSequenceTarget','battleUIOffsetY','SkillItemBorderCols','isAnyoneGrowing','Sprite_Battler_setHome','updateStateIconSprite','StepDistanceY','commandFight','compareEnemySprite','autoSelectLastSelected','debuffAdd','enemyNames','process_VisuMZ_BattleCore_BaseTroops','_battleCoreNoElement','isPreviousScene','_preemptive','ActSeq_Mechanics_FtbAction','commandOptions','displayChangedBuffs','VisuMZ_1_ElementStatusCore','enemyId','VisuMZ_3_ActSeqProjectiles','visible','origin','duration','Window_BattleLog_popupDamage','OffsetX','_targetIndex','nameY','_battleCoreAddedElements','Window_BattleStatus_initialize','constructor','missile','ActSeq_Mechanics_DeathBreak','_eventId','getSkillIdWithName','iconText','performEvasion','PostStartBattleJS','VisuMZ_3_ActSeqCamera','XPSpriteYLocation','Sprite_Battler_damageOffsetY','drawItemImageXPStyle','filters','members','message1','setupBattlebackBattleCore','_skillIDs','DefaultStyle','_tempEquipCheck','rowSpacing','inHomePosition','processRandomizedData','helpWindowRect','_shadowSprite','startSkew','ActSeq_Motion_MotionType','power','Sprite_Enemy_loadBitmap','getItemDamageAmountLabelBattleCore','performActionEndMembers','pattern','getStypeIdWithName','IconStypeNorm','PopupPosition','ArPenFlat','Sprite_Battler_setBattler','drawItemBackground','getCommonEventIdWithName','_windowLayer','ActSeq_Mechanics_BoostPointsChange','bind','MAT','bitmap','_cancelButton','battleCommandIcon','ActSeq_Zoom_WaitForZoom','updateForceAction','updateShadowVisibility','isInputting','IconStypeMagic','alive\x20enemies','_floatHeight','drawEnemyName','forceSelect','HelpAutoBattle','StatusWindowSkinFilename','refreshStatusWindow','invokeMagicReflection','ActSeq_Element_Clear','_baseLineStack','Sprite_Actor_createStateSprite','updateMain','resize','DistanceX','_borderPortraitDuration','maxItems','_lastPluginCommandInterpreter','-%1\x20MP','ActionSkillMsg2','Game_BattlerBase_die','ActionSequence','battleCorePreBattleCommonEvent','Game_Action_itemEffectAddNormalState','itemWindowRect','_motionCount','isForRandomBattleCore','findTargetSprite','displayRemovedStates','onFloatEnd','ActSeq_Mechanics_VariablePopup','Game_BattlerBase_initMembers','battleCameraData','ActSeq_Animation_WaitForAnimation','split','onDatabaseLoaded','actionBattleCoreJS','removeChild','Window_Options_statusText','makeHpDamageText','_jumpDuration','refresh','dead','trim','ActSeq_Mechanics_CtbSpeed','TpGaugeOffsetX','ShowCritical','motionSpeed','FlinchDistanceY','getBattlePortrait','_targets','checkAutoCustomActionSequenceNotetagEffect','updateTargetPosition','Sprite_Battler_startMove','actionEffect','process_VisuMZ_BattleCore_DamageStyles','setupBattleback','isDTB','ActSeq_Impact_MotionTrailRemove','battleAngle','forceAction','_actorCommandWindow','Scene_Battle_startActorCommandSelection','battlelog','onMoveEnd','Game_BattlerBase_addNewState','CriticalDmgRate','updateShadowPosition','processVictory','DamageStyles','setBattleCameraTargets','battleSys','ClearBattleLog','onSkewEnd','createEffectActionSet','drawItem','process_VisuMZ_BattleCore_Failsafes','refreshBattlerMotions','prepareBorderActor','updateJump','Game_Interpreter_command301','evalDamageFormulaBattleCore','CoreEngine','revealNewWeaknesses','actor%1-portrait','requestDragonbonesAnimation','requestMotionRefresh','Destination','ActiveTpbOptionsMessage','setActorHome','ParseActorNotetags','ActSeq_Target_PrevTarget','criticalHitFlat','backColor','mmp','windowPadding','damageRate','sliceMax','AnchorX','_flashColor','evaded','refreshDimmerBitmap','Scene_Battle_helpWindowRect','CommandAddOptions','parseForcedGameTroopSettingsBattleCore','ActSeq_Mechanics_CustomDmgFormula','addChild','onBattleStart','_customDamageFormula','battleZoom','Shadow','prototype','_battlerContainer','_targetGrowY','startMove','_jumpHeight','windowAreaHeight','EnableSoftCap','createAnimationContainer','ApplyImmortal','StateIconOffsetY','setLastPluginCommandInterpreter','Scene_Battle_terminate','isBreakStunned','isBattleMember','ForceRandom','slice','setupDamagePopup','okButtonText','effects','StateIconOffsetX','ActSeq_Impact_ShockwavePoint','round','command301_PreBattleEvent','hpDamage','ActSeq_DB_DragonbonesTimeScale','Game_BattlerBase_canAttack','cancelTargetSelectionVisibility','toUseBoostPoints','createCancelButton','addedDebuffs','_angleEasing','ActSeq_Mechanics_TextPopup','singleSkill','ShowFailure','GuardFormulaJS','Index','Scene_Battle_createActorCommandWindow','frontviewSpriteY','_wtypeIDs','bitmapWidth','battleCoreResumeLaunchBattle','anchor','isCommandEnabled','_svBattlerSprite','isTurnBased','ITEM','equipSlots','Game_Battler_onBattleStart','_escapeRatio','Angle','_motion','missle','compareBattlerSprites','checkShowHideSkillNotetags','Scene_Battle_onActorCancel','updateBitmap','createCommandNameWindow','alive\x20friends','commandStyle','setBattlePortrait','makeActionListAutoAttack','addPartyCommand','_multipliers','isRightInputMode','stypeId','mpDamageFmt','drawItemImageListStyle','XPActorDefaultHeight','_back2Sprite','_effectDuration','%1Event','ActSeq_Mechanics_CtbOrder','Variable','map','move','repositionEnemiesByResolution','svBattlerName','updateScale','pow','isSkipPartyCommandWindow','isAffectedByBreakShield','getSkillTypes','_skewX','_weaponSprite','actor','_colorType','setBattleCameraOffset','FlinchDuration','_dragonbonesSpriteContainer','helpAreaBottom','changeBattlebacks','isEscapeCommandEnabled','Game_BattlerBase_refresh','clearFreezeMotionForWeapons','Damage','cancelActorInput','performFlinch','startMotion','ShowSubstitute','ShowRemovedBuff','toLowerCase','version','battleLayoutStyle','Window_BattleLog_displayTpDamage','helpWindowRectBorderStyle','registerCommand','getItemDamageAmountTextBattleCore','battleback2Name','setupShockwaveImpactFilter','Sprite_Battler_update','BattleManager_endAction','escape','ActSeq_Camera_FocusTarget','DTB','CriticalHitRate','TpGaugeOffsetY','nextActiveWeaponSlot','OffsetY','isBattlerGrounded','value','damageOffsetX','TextColor','ActSeq_Projectile_Picture','Game_Interpreter_terminate','createHelpWindow','isForFriend','animationBaseDelay','_target','StartTurnWait','Sprite_Enemy_updateCollapse','isAnimationShownOnBattlePortrait','ActSeq_Movement_WaitForScale','isQueueOptionsMenu','skillTypes','ShowCounter','updateBattlebackBitmap','ActionEffect','BattleManager_endBattle','playEnemyDamage','itemLineRect','Scene_Battle_createAllWindows','maxTp','animationWait','Scene_Battle_selectPreviousCommand','isMoving','ActSeq_Motion_RefreshMotion','_hpGaugeSprite','stepForward','SvMotionIdleSolo-%1-%2','FlashDuration','BattleManager_startInput','isSideView','clamp','_duration','opacity','slices','TargetLocation','battleProjectiles','isFightCommandEnabled','applyDamageCaps','changeBattlerOpacity','ArRedRate','TpbGaugeOffsetX','targetActionSet','_enemyIDs','HelpOptions','show','isBuffAffected','_indent','\x5cI[%1]%2','isAutoBattleCommandAdded','_effectsContainer','_skewWholeDuration','updateShadowBattleCore','Strength','process_VisuMZ_BattleCore_PluginParams','_spriteset','reserveCommonEvent','ShowFacesListStyle','Spriteset_Battle_createBattleField','onEscapeFailure','performMiss','PreEndBattleJS','_enemyWindow','_isBattlerFlipped','setBattleSkew','Sprite_Battler_initMembers','applyHardDamageCap','State-%1-%2','selectNextCommand','PreRegenerateJS','setHorrorEffectSettings','BattleManager_initMembers','ActSeq_BattleLog_UI','finalizeScale','makeDeepCopy','BattleEndEvent','Game_Action_itemHit','portrait','left','filter','displayMpDamage','Sprite_Actor_update','JS\x20%1REGENERATE','skillItemWindowRectMiddle','Game_Action_applyGlobal','victory','initElementStatusCore','SwitchMissEvade','isBattleSys','isNextScene','ShowTpDmg','ActSeq_Impact_MotionBlurTarget','loadSystem','removeState','PRE-','Window_ItemList_maxCols','Game_Temp_requestAnimation','actorCommandSingleSkill','Spriteset_Battle_update','attackAnimationId2','makeActionList','isSceneBattle','blt','formula','_inputting','XPActorCommandLines','Sprite_Enemy_updateBossCollapse','uiMenuStyle','PostApplyAsTargetJS','isHidden','filterArea','startActorSelection','addChildToBack','NameAttachStateIcon','shadow','_borderPortraitTargetX','CmdTextAutoBattle','HitFlat','Game_Battler_makeSpeed','createActionSequenceProjectile','ActSeq_Movement_BattleStep','addImmortal','abnormal','ActSeq_Movement_Scale','1:1','parameters','Window_BattleLog_displayMpDamage','isAnyProjectilePresent','endAction','_checkOn','clearDamagePopup','SKILLS','maxBattleMembers','BattleVictoryJS','getMenuImage','targetObjects','actorCommandAutoBattle','svAnchorY','noise','createWeather','%1StartBattleJS','_damagePopupArray','addLoadListener','Game_Battler_performEvasion','WaitForZoom','ActSeq_Movement_WaitForSkew','setupBattleCoreData','ActSeq_Mechanics_ArmorPenetration','Defeat','isChanting','VisuMZ_3_BoostAction','turnCount','SvBattlerMass-%1-%2','swing','Window_BattleLog_performReflection','MotionFrameWait','_backAttachmentSprite','actorCommandEscape','Elements','forceEscapeSprite','checkShowHideSwitchNotetags','Game_Party_addActor','createEnemyNames','validTargets','SvWeaponSolo-%1-%2','MessageWait','width','HomePosJS','isBusy','FocusY','initBattlePortrait','onRegeneratePlayStateAnimation','isActiveTpb','battleJump','Duration','Skills','alterBreakShield','attachSpritesToDistortionSprite','BattleManager_cancelActorInput','_floatWholeDuration','extraHeight','isEnemy','createEnemyNameContainer','adjustPosition','battleMove','statusWindowRectBorderStyle','updateBossCollapse','damageFlat','allowCollapse','CommandWidth','scope','ActionAnimation','_logWindow','ParseSkillNotetags','getEnemyIdWithName','shouldPopupDamage','_updateClientArea','drawItemStatus','isPartyTpbInputtable','drawBackgroundRect','BattleLog','ForceExploiter','isPlaytest','weapons','VisuMZ_2_PartySystem','updateBorderStyle','isForRandom','QoL','_jumpMaxHeight','actorId','CmdIconOptions','Game_Battler_forceAction','_floatDuration','onActorOk','performDamage','_uiContainer','updateBattlebackBitmap2','PreEndActionJS','applyGlobal','ActSeq_Angle_Reset','executeDamage','arRedFlat','min','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_cache','CastMagical','addCommand','makeTargetsBattleCore','ActSeq_BattleLog_PopBaseLine','isAtbCastingState','process_VisuMZ_BattleCore_CreateRegExp','includes','CalcActionSpeedJS','ActSeq_Movement_FacePoint','canGuardBattleCore','ActSeq_Camera_WaitForCamera','PreStartTurnJS','createTargetsJS','_baseX','getNextSubjectFromPool','MAXMP','JS\x20%1START\x20ACTION','message4','mpDamage','removeImmortal','isClicked','ConvertParams','updateGrow','isActionSelectionValid','waitForFloat','_stateSprite','createActorCommandWindowBattleCore','Sprite_Enemy_createStateIconSprite','addTextToCombatLog','_skewY','Game_Actor_makeActionList','onAngleEnd','makeTargetSelectionMoreVisible','WtypeId','_helpWindow','setupActionSet','setSkill','ActSeq_Movement_WaitForOpacity','updatePhase','RequiresDefeat','weatherType','clearActiveWeaponSet','softDamageCap','isCharging','ParseAllNotetags','counterAttack','TPB','setHelpWindow','attack','BattleManager_startAction','autoBattleWindowRect','log','_floatEasing','addSingleSkillCommand','ActSeq_Mechanics_BtbGain','createHpGaugeSprite','canBattlerMove','ActSeq_Movement_WaitForFloat','callUpdateHelp','_cursorArea','damageOffsetY','isFloating','commandNameWindowDrawBackground','applyResultSwitches','_attackAnimationId','SvMotionIdleMass-%1-%2','param','battler','ParseEnemyNotetags','autoMeleeMultiTargetActionSet','_weather','Opacity','PreDamage%1JS','ScaleDown','addGuardCommand','requestRefresh','iconIndex','Actions','ActSeq_Movement_WaitForJump','Spriteset_Battle_createLowerLayer','Scene_Battle_onEnemyOk','maxLines','PostDamage%1JS','updateCollapse','_tpbNeedsPartyCommand','drawItemImagePortraitStyle','ParseWeaponNotetags','Window_BattleLog_performDamage','ActSeq_Impact_ShockwaveEachTargets','ShowWeapon','_currentAngle','sortDamageSprites','repositionCancelButtonBorderStyle','_autoBattleWindow','DualWield','ScaleToFit','animationId','PopupOffsetY','PreDamageAsTargetJS','ScaleY','_actionInputIndex','_animationCount','Sprite_Actor_moveToStartPosition','WaitForSkew','textSizeEx','%1EndTurnJS','Scene_Battle_selectNextCommand','_waitCount','commandNameWindowDrawText','CriticalHitMultiplier','ActSeq_Set_SetupAction','ARRAYJSON','Width','AGI','charged','getColor','dataId','length','performAction','ShowCurrentState','createEnemies','FUNC','selectNextActor','Window_Options_addGeneralOptions','svBattlerAnchorX','hpDamageFmt','jump','Game_Actor_equips','isDead','text','stateMotionIndex','Game_Enemy_transform','regionId','JS\x20%1DAMAGE\x20%2','_actorWindow','dying','ShowAddedDebuff','Scene_Battle_windowAreaHeight','applyTargetFilters','moveBattlerDistance','onEscapeSuccess','createShadowSprite','removeHorrorEffect','processPostBattleCommonEvents','applyBattleCoreJS','onEnemyCancel','_enemySprites','ActSeq_Projectile_Animation','MeleeDistance','isItemCommandEnabled','mainSpriteScaleX','createInnerPortrait','ShowMpDmg','maxCommands','battlerSprites','Game_Troop_setup','ActSeq_Impact_MotionTrailCreate','createMainSprite','ResetOffset','VisuMZ_3_ActSeqImpact','Window_BattleLog_displayEvasion','_mainSprite','_updateCursorFilterArea','MotionType','67QXYCkF','addSingleSkillCommands','displayType','ActSeq_Mechanics_Collapse','skew','Scene_Battle_createCancelButton','Mechanics','Game_Battler_clearDamagePopup','Window_PartyCommand_initialize','onAllActionsEnd','motionType','cancel','MpGaugeOffsetX','clearActiveWeaponSlot','arPenFlat','JS\x20BATTLE\x20DEFEAT','updateStateSpriteBattleCore','isHiddenSkill','_targetSkewX','setActiveWeaponSet','ARRAYSTR','DamageDisplay','cameraDuration','CheckMapBattleEventValid','dragonbonesData','showAnimation','requestMotion','Armor-%1-%2','actions','Style','logWindowRect','_stypeIDs','isPartyCommandWindowDisabled','AutoBattleRect','isDisplayEmergedEnemies','addSkillCommands','setBattlerFacePoint','setBattlerMotionTrailData','displayItemMessage','glitch','Scene_Battle_createPartyCommandWindow','Scene_Battle_startPartyCommandSelection','_back1Sprite','canAttack','_tpbState','refreshMotion','isSceneChanging','ShowCosts','performReflection','displayTpDamage','resetFontSettings','commandAutoBattle','wait','AutoBattle','bgType','max','startAttackWeaponAnimation','updateAttachedSprites','startSpin','stepBack','Setting','message2','FaceAway','Game_Interpreter_command283','ActSeq_Motion_ClearFreezeFrame','updateSpin','PopupShiftY','_baseY','head','_regionBattleback2','StyleName','ActSeq_Set_FinishAction','EasingType','isJumping','_svBattlerData','BattleManager_onEncounter','_createEffectsContainer','activate','fight','_requestRefresh','_effectType','403HwhlXU','Point','ESCAPE','isTriggered','match','ShowAddedBuff','ActSeq_Animation_ShowAnimation','SceneManager_isSceneChanging','isSkillItemWindowsMiddle','_armorPenetration','Sprite_Actor_updateShadow','repeats','Sprite_Enemy_initVisibility','ActSeq_Camera_Offset','create','RevertAngle','createUIContainer','sortEnemies','updateFrame','ActSeq_Movement_Opacity','Scene_Battle_createHelpWindow','performCollapse','forceMotion','return\x200','getAttackMotion','isOptionsCommandAdded','AUTO\x20BATTLE','ActSeq_Movement_Float','createJS','ActSeq_Motion_WaitMotionFrame','isTickBased','setCustomDamageFormula','_methods','isAnyoneChangingOpacity','PreEndTurnJS','_defeatedEnemies','canUseItemCommand','WaitForSpin','Window_BattleLog_performSubstitute','MIN_SAFE_INTEGER','applyCritical','Name','motionIdle','setVisibleUI','Reveal','mainSprite','moveToStartPosition','isForOne','createPartyCommandWindowBattleCore','createBorderStylePortraitSprite','setBattler','Targets','Scene_Battle_logWindowRect','command283','_interpreter','ActSeq_Impact_ZoomBlurTargetCenter','SideviewSelect','PopupDuration','CommandVisible','battleDisplayText','itemHit','PrioritySortActors','performCastAnimation','ActSeq_Impact_ZoomBlurPoint','startAction','AutoBattleBgType','_lineHeight','makeActionOrders','addFightCommand','open','autoBattleStyle','autoSelect','innerHeight','_enemy','stepFlinch','scale','setupMotionBlurImpactFilter','autoMeleeSingleTargetActionSet','placeTimeGauge','ActSeq_Skew_Reset','statusWindowRectDefaultStyle','preparePartyRefresh','setBackgroundType','updateLink','updateAction','removeStatesAuto','StartName','updateWeather','getSimilarSTypes','iconHeight','battleSkew','svAnchorX','Sprite_Actor_setBattler','Scene_Battle_updateBattleProcess','canUse','BattleManager_onEscapeFailure','_battleField','isBypassDamageCap','retreat','VisuMZ_4_BreakShields','svShadow','dimColor1','ShowHide','PartyCmd','Actor','cancelButtonText','isAlive','_angleWholeDuration','_animationContainer','regenerateAllBattleCore','format','ActSeq_Mechanics_RemoveBuffDebuff','CounterPlayback','NameOffsetX','Game_Interpreter_updateWaitMode','displayAction','growBattler','mainSpriteWidth','Interrupt','BattleCore','start','AS\x20TARGET','_actorSprites','UNTITLED','GUARD','Parse_Notetags_Targets','Game_Battler_performActionStart','isAutoBattle','_homeX','pop','commandNameWindowCenter','Sprite_Battler_damageOffsetX','battleEffect','isCertainHit','_battlePortrait','refreshCursor','lineRect','type','Window_BattleLog_performEvasion','JS\x20BATTLE\x20VICTORY','applyData','StyleOFF','getTraitSetKeys','clearElementChanges','updateBorderSprite','NameFontSize','command119','alive\x20enemies\x20not\x20target','_waitMode','onEncounterBattleCore','battleSpin','iconWidth','attackAnimationIdSlot','partyCommandWindowRectDefaultStyle','freezeFrame','onEncounter','callOptions','Radius','addState','JumpToLabel','startActorCommandSelection','Scale','addBuff','waitForOpacity','displayCurrentState','extraPositionY','displayBuffs','Wave','_targetFloatHeight','createString','skills','random','padding','21uEZVlN','_visualHpGauge_JustDied','process_VisuMZ_BattleCore_TraitObject_Notetags','RegExp','battleEnd','performRecovery','drawSingleSkillCost','_growWholeDuration','PostApply%1JS','adjustPosition_ScaleDown','canEscape','drawSkillCost','_updateCursorArea','displayMiss','BoostPoints','updateCancel','canInput','CriticalHitRateJS','PostApplyJS','showHelpWindow','ActSeq_Mechanics_Immortal','createSeparateDamagePopups','isBattlerFlipped','changeInputWindow','ScaleUp','actionSplicePoint','Game_Action_executeDamage','isBattleCoreTargetScope','subject','BattleManager_makeActionOrders','_growY','#%1','addBattleCoreAutoBattleStyleCommand','itemTextAlign','substitute','_dimmerSprite','_offsetX','setBattleCameraPoint','weaponImageId','swapEnemyIDs','updateOpacity','isVisualHpGaugeDisplayed','onEnemyOk','selectPreviousCommand','isTpbMainPhase','createBattleUIOffsetY','ActSeq_Mechanics_HpMpTp','hitRate','basicGaugesY','DefaultDamageStyle','dead\x20actors','_emptyBitmap','attackStates','setHome','isShownOnBattlePortrait','PostDamageJS','PostStartTurnJS','pushBaseLine','isGrowing','item','statusTextAutoBattleStyle','mhp','Shadow2','Rate','VariableDmg','_forcedBattleLayout','okTargetSelectionVisibility','iterateBattler','JSON','clearMotion','VisuMZ_0_CoreEngine','addedStateObjects','_allTargets','speed','reverse','CreateActionSequenceTargets','getBattlePortraitOffsetX','autoBattle','FlinchDistanceX','AttachStateOffsetY','Amp','WaitForOpacity','selectNextCommandTpb','setEventCallback','regenerateAll','_commandNameWindow','addDamageSprite','buffRemove','setBattleAngle','JS\x20%1END\x20ACTION','finishActorInput','push','Sprite_Enemy_setHue','NameLegacy','alive\x20opponents','alive\x20battlers','resetResultSwitches','fontSize','isBattleFlipped','_growDuration','Scene_Battle_partyCommandWindowRect','itemEffectAddAttackState','POST-','_itemWindow','performActionEnd','AllowCollapse','Scene_ItemBase_applyItem','current\x20target','opponentsUnit','Mirror','MANUAL','Settings','createActorCommandWindow','updateBattleProcess','right','battleGrow','clearFreezeMotion','clone','Sprite_Actor_setActorHome','getItemDamageAmountTextOriginal','_activeWeaponSlot','JS\x20%1START\x20TURN','textWidth','MpGaugeOffsetY','hasSvBattler','Game_Party_removeActor','needsSelectionBattleCore','applyForcedGameTroopSettingsBattleCore','clearWeaponAnimation','PreApplyAsUserJS','BattleManager_updatePhase','Scene_Battle_updateStatusWindowPosition','MDF','addGeneralOptions','_motionSpeed','addText','Game_Actor_setup','createChildSprite','ActSeq_Weapon_ClearActiveWeapon','ActionCenteredName','_stateIconSprite','refreshActorPortrait','StatusWindowAttachmentBackOffsetY','mainSpriteScaleY','_battlerName','displayReflection','setupWeaponAnimation','partyCommandWindowRectBorderStyle','onTurnEnd','getLastPluginCommandInterpreter','updateEventMain','guard','WaitForProjectile','updateStatusWindowPosition','%1StartTurnJS','_actionBattlers','process_VisuMZ_BattleCore_Action_Notetags','createLowerLayer','ParseArmorNotetags','startWeaponAnimation','command357','evalDamageFormula','_callSceneOptions','DamageRate','startFloat','maxCols','ActSeq_Weapon_SetActiveWeapon','makeActions','getWtypeIdWithName','moveBattlerToPoint','isForFriendBattleCore','isMeleeSingleTargetAction','createAttachmentSprites','_forceAction','getAttackWeaponAnimationId','_flashDuration','_angleRevertOnFinish','spriteId','spinBattler','processEscape','performSTBExploiter','HelpFight','setBattlerBattleCore','_statusWindow','transform','loadWindowskin'];const _0x286a=function(_0x1c9820,_0x2de054){_0x1c9820=_0x1c9820-0x15f;let _0x505f4f=_0x505f[_0x1c9820];return _0x505f4f;};const _0x19a075=_0x286a;(function(_0x116497,_0x335d64){const _0x2031a0=_0x286a;while(!![]){try{const _0x44b863=parseInt(_0x2031a0(0x1c0))*parseInt(_0x2031a0(0x30c))+parseInt(_0x2031a0(0x673))*parseInt(_0x2031a0(0x15f))+parseInt(_0x2031a0(0x6c4))*-parseInt(_0x2031a0(0x26e))+parseInt(_0x2031a0(0x948))+parseInt(_0x2031a0(0x8b4))+-parseInt(_0x2031a0(0x8c4))+parseInt(_0x2031a0(0x771))*-parseInt(_0x2031a0(0x2e6));if(_0x44b863===_0x335d64)break;else _0x116497['push'](_0x116497['shift']());}catch(_0xb82e0d){_0x116497['push'](_0x116497['shift']());}}}(_0x505f,0x9f62d));var label=_0x19a075(0x73b),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x19a075(0x53d)](function(_0x5d6ac4){const _0x4e2d40=_0x19a075;return _0x5d6ac4['status']&&_0x5d6ac4['description'][_0x4e2d40(0x5d5)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x1b1c2a,_0x18c057){const _0x282f1a=_0x19a075;for(const _0x1880da in _0x18c057){if(_0x1880da[_0x282f1a(0x6c8)](/(.*):(.*)/i)){const _0x1c3d75=String(RegExp['$1']),_0x4ddd24=String(RegExp['$2'])[_0x282f1a(0x171)]()[_0x282f1a(0x431)]();let _0x2cc85a,_0x4e068d,_0x30deda;switch(_0x4ddd24){case _0x282f1a(0x8e6):_0x2cc85a=_0x18c057[_0x1880da]!==''?Number(_0x18c057[_0x1880da]):0x0;break;case _0x282f1a(0x275):_0x4e068d=_0x18c057[_0x1880da]!==''?JSON[_0x282f1a(0x2ab)](_0x18c057[_0x1880da]):[],_0x2cc85a=_0x4e068d[_0x282f1a(0x4be)](_0x136cc6=>Number(_0x136cc6));break;case _0x282f1a(0x22c):_0x2cc85a=_0x18c057[_0x1880da]!==''?eval(_0x18c057[_0x1880da]):null;break;case'ARRAYEVAL':_0x4e068d=_0x18c057[_0x1880da]!==''?JSON['parse'](_0x18c057[_0x1880da]):[],_0x2cc85a=_0x4e068d['map'](_0x32293e=>eval(_0x32293e));break;case _0x282f1a(0x7b5):_0x2cc85a=_0x18c057[_0x1880da]!==''?JSON[_0x282f1a(0x2ab)](_0x18c057[_0x1880da]):'';break;case _0x282f1a(0x63e):_0x4e068d=_0x18c057[_0x1880da]!==''?JSON[_0x282f1a(0x2ab)](_0x18c057[_0x1880da]):[],_0x2cc85a=_0x4e068d[_0x282f1a(0x4be)](_0x34b629=>JSON[_0x282f1a(0x2ab)](_0x34b629));break;case _0x282f1a(0x648):_0x2cc85a=_0x18c057[_0x1880da]!==''?new Function(JSON[_0x282f1a(0x2ab)](_0x18c057[_0x1880da])):new Function(_0x282f1a(0x6db));break;case _0x282f1a(0x89f):_0x4e068d=_0x18c057[_0x1880da]!==''?JSON['parse'](_0x18c057[_0x1880da]):[],_0x2cc85a=_0x4e068d[_0x282f1a(0x4be)](_0x593996=>new Function(JSON[_0x282f1a(0x2ab)](_0x593996)));break;case _0x282f1a(0x84d):_0x2cc85a=_0x18c057[_0x1880da]!==''?String(_0x18c057[_0x1880da]):'';break;case _0x282f1a(0x687):_0x4e068d=_0x18c057[_0x1880da]!==''?JSON[_0x282f1a(0x2ab)](_0x18c057[_0x1880da]):[],_0x2cc85a=_0x4e068d[_0x282f1a(0x4be)](_0x32addd=>String(_0x32addd));break;case'STRUCT':_0x30deda=_0x18c057[_0x1880da]!==''?JSON[_0x282f1a(0x2ab)](_0x18c057[_0x1880da]):{},_0x1b1c2a[_0x1c3d75]={},VisuMZ['ConvertParams'](_0x1b1c2a[_0x1c3d75],_0x30deda);continue;case _0x282f1a(0x1ba):_0x4e068d=_0x18c057[_0x1880da]!==''?JSON[_0x282f1a(0x2ab)](_0x18c057[_0x1880da]):[],_0x2cc85a=_0x4e068d[_0x282f1a(0x4be)](_0x3eb7a4=>VisuMZ[_0x282f1a(0x5e4)]({},JSON['parse'](_0x3eb7a4)));break;default:continue;}_0x1b1c2a[_0x1c3d75]=_0x2cc85a;}}return _0x1b1c2a;},(_0x36c3cf=>{const _0x2a6ced=_0x19a075,_0x3917d2=_0x36c3cf[_0x2a6ced(0x880)];for(const _0x279c00 of dependencies){if(!Imported[_0x279c00]){alert(_0x2a6ced(0x5cd)['format'](_0x3917d2,_0x279c00)),SceneManager[_0x2a6ced(0x92a)]();break;}}const _0x298c9d=_0x36c3cf['description'];if(_0x298c9d[_0x2a6ced(0x6c8)](/\[Version[ ](.*?)\]/i)){const _0x274614=Number(RegExp['$1']);_0x274614!==VisuMZ[label][_0x2a6ced(0x4da)]&&(alert(_0x2a6ced(0x899)[_0x2a6ced(0x732)](_0x3917d2,_0x274614)),SceneManager[_0x2a6ced(0x92a)]());}if(_0x298c9d['match'](/\[Tier[ ](\d+)\]/i)){const _0x575bbb=Number(RegExp['$1']);_0x575bbb<tier?(alert(_0x2a6ced(0x2f3)[_0x2a6ced(0x732)](_0x3917d2,_0x575bbb,tier)),SceneManager[_0x2a6ced(0x92a)]()):tier=Math[_0x2a6ced(0x6aa)](_0x575bbb,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x2a6ced(0x7e0)],_0x36c3cf[_0x2a6ced(0x56b)]);})(pluginData),VisuMZ[_0x19a075(0x7bc)]=function(_0x450496){const _0x49c2d5=_0x19a075;let _0x236024=[];for(const _0x3918d8 of _0x450496){_0x236024=_0x236024[_0x49c2d5(0x265)](VisuMZ[_0x49c2d5(0x3b6)](_0x3918d8));}return _0x236024[_0x49c2d5(0x53d)](_0x4d5c9d=>_0x4d5c9d);},VisuMZ[_0x19a075(0x3b6)]=function(_0xe44ff0){const _0x39603c=_0x19a075,_0x503655=BattleManager[_0x39603c(0x2d0)]()[_0x39603c(0x53d)](_0x462682=>_0x462682&&_0x462682[_0x39603c(0x387)]()),_0x5e96a9=BattleManager[_0x39603c(0x886)],_0x4b412e=BattleManager[_0x39603c(0x4f4)],_0x29a989=BattleManager[_0x39603c(0x7b9)]?BattleManager['_allTargets'][_0x39603c(0x484)](0x0):_0x503655;_0xe44ff0=_0xe44ff0['toLowerCase']()['trim']();if(_0xe44ff0===_0x39603c(0x1f1))return[_0x5e96a9];else{if(_0xe44ff0===_0x39603c(0x7dc))return[_0x4b412e];else{if(_0xe44ff0===_0x39603c(0x8a8)){if(_0x4b412e){const _0x534842=_0x29a989[_0x39603c(0x93c)](_0x4b412e);return _0x534842>=0x0?[_0x29a989[_0x534842-0x1]||_0x4b412e]:[_0x4b412e];}}else{if(_0xe44ff0===_0x39603c(0x24a)){if(_0x4b412e){const _0x2b0205=_0x29a989[_0x39603c(0x93c)](_0x4b412e);return _0x2b0205>=0x0?[_0x29a989[_0x2b0205+0x1]||_0x4b412e]:[_0x4b412e];}}else{if(_0xe44ff0===_0x39603c(0x32d))return _0x29a989;else{if(_0xe44ff0===_0x39603c(0x3b2))return[_0x5e96a9][_0x39603c(0x265)](_0x29a989);else{if(_0xe44ff0===_0x39603c(0x30a))return _0x503655[_0x39603c(0x53d)](_0x317d23=>_0x317d23!==_0x5e96a9&&!_0x29a989[_0x39603c(0x5d5)](_0x317d23)&&_0x317d23[_0x39603c(0x1d7)]());}}}}}}if(_0x5e96a9){if(_0xe44ff0===_0x39603c(0x4ae))return _0x5e96a9['friendsUnit']()[_0x39603c(0x1ee)]();else{if(_0xe44ff0==='alive\x20friends\x20not\x20user')return _0x5e96a9[_0x39603c(0x37c)]()[_0x39603c(0x1ee)]()[_0x39603c(0x53d)](_0x2f5f90=>_0x2f5f90!==_0x5e96a9);else{if(_0xe44ff0==='alive\x20friends\x20not\x20target')return _0x5e96a9[_0x39603c(0x37c)]()[_0x39603c(0x1ee)]()['filter'](_0x285099=>_0x285099!==_0x4b412e);else{if(_0xe44ff0==='dead\x20friends')return _0x5e96a9[_0x39603c(0x37c)]()['deadMembers']();else{if(_0xe44ff0['match'](/FRIEND INDEX (\d+)/i)){const _0x2cf3d7=Number(RegExp['$1']);return[_0x5e96a9[_0x39603c(0x37c)]()[_0x39603c(0x3e2)]()[_0x2cf3d7]];}}}}}if(_0xe44ff0===_0x39603c(0x7cf))return _0x5e96a9[_0x39603c(0x7dd)]()[_0x39603c(0x1ee)]();else{if(_0xe44ff0===_0x39603c(0x334))return _0x5e96a9[_0x39603c(0x7dd)]()[_0x39603c(0x1ee)]()[_0x39603c(0x53d)](_0xd961d1=>_0xd961d1!==_0x4b412e);else{if(_0xe44ff0===_0x39603c(0x8b8))return _0x5e96a9[_0x39603c(0x7dd)]()['deadMembers']();else{if(_0xe44ff0[_0x39603c(0x6c8)](/OPPONENT INDEX (\d+)/i)){const _0x142971=Number(RegExp['$1']);return[_0x5e96a9[_0x39603c(0x7dd)]()[_0x39603c(0x3e2)]()[_0x142971]];}}}}}if(_0xe44ff0===_0x39603c(0x2eb))return $gameParty[_0x39603c(0x1ee)]();else{if(_0xe44ff0==='alive\x20actors\x20not\x20user')return $gameParty[_0x39603c(0x1ee)]()[_0x39603c(0x53d)](_0x16eec4=>_0x16eec4!==_0x5e96a9);else{if(_0xe44ff0===_0x39603c(0x84b))return $gameParty[_0x39603c(0x1ee)]()['filter'](_0x42dc5a=>_0x42dc5a!==_0x4b412e);else{if(_0xe44ff0===_0x39603c(0x7a3))return $gameParty[_0x39603c(0x91b)]();else{if(_0xe44ff0['match'](/ACTOR INDEX (\d+)/i)){const _0x38d6c5=Number(RegExp['$1']);return[$gameParty[_0x39603c(0x3e2)]()[_0x38d6c5]];}else{if(_0xe44ff0[_0x39603c(0x6c8)](/ACTOR ID (\d+)/i)){const _0x55f9ca=Number(RegExp['$1']);return[$gameActors['actor'](_0x55f9ca)];}}}}}}if(_0xe44ff0===_0x39603c(0x407))return $gameTroop[_0x39603c(0x1ee)]();else{if(_0xe44ff0===_0x39603c(0x20d))return $gameTroop[_0x39603c(0x1ee)]()[_0x39603c(0x53d)](_0x37f000=>_0x37f000!==_0x5e96a9);else{if(_0xe44ff0===_0x39603c(0x757))return $gameTroop[_0x39603c(0x1ee)]()[_0x39603c(0x53d)](_0x490bca=>_0x490bca!==_0x4b412e);else{if(_0xe44ff0===_0x39603c(0x845))return $gameTroop[_0x39603c(0x91b)]();else{if(_0xe44ff0[_0x39603c(0x6c8)](/ENEMY INDEX (\d+)/i)){const _0x1f4254=Number(RegExp['$1']);return[$gameTroop[_0x39603c(0x3e2)]()[_0x1f4254]];}else{if(_0xe44ff0[_0x39603c(0x6c8)](/ENEMY ID (\d+)/i)){const _0x1dbe4d=Number(RegExp['$1']);return $gameTroop[_0x39603c(0x1ee)]()['filter'](_0x56f0f1=>_0x56f0f1['enemyId']()===_0x1dbe4d);}}}}}}if(_0xe44ff0===_0x39603c(0x7d0))return _0x503655[_0x39603c(0x53d)](_0x3a7ea4=>_0x3a7ea4[_0x39603c(0x72e)]());else{if(_0xe44ff0===_0x39603c(0x8d4))return _0x503655['filter'](_0xae77e2=>_0xae77e2['isAlive']()&&_0xae77e2!==_0x5e96a9);else{if(_0xe44ff0===_0x39603c(0x90b))return _0x503655[_0x39603c(0x53d)](_0x3fe29b=>_0x3fe29b[_0x39603c(0x72e)]()&&_0x3fe29b!==_0x4b412e);else{if(_0xe44ff0==='dead\x20battlers')return _0x503655[_0x39603c(0x53d)](_0x45b19e=>_0x45b19e[_0x39603c(0x64f)]());}}}return[];},PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x63d),_0x2c0b40=>{const _0x12d12c=_0x19a075;if(!SceneManager[_0x12d12c(0x553)]())return;VisuMZ[_0x12d12c(0x5e4)](_0x2c0b40,_0x2c0b40);const _0x5debcf=$gameTemp['getLastPluginCommandInterpreter'](),_0x354fbc=BattleManager[_0x12d12c(0x1f4)],_0x2b28d2=BattleManager[_0x12d12c(0x886)],_0x8cf7e=BattleManager[_0x12d12c(0x7b9)]?BattleManager[_0x12d12c(0x7b9)][_0x12d12c(0x484)](0x0):[],_0x4ecc6e=BattleManager[_0x12d12c(0x5ae)];if(!_0x5debcf||!_0x354fbc||!_0x2b28d2)return;if(!_0x354fbc[_0x12d12c(0x7ac)]())return;if(_0x2c0b40['DisplayAction'])_0x4ecc6e[_0x12d12c(0x737)](_0x2b28d2,_0x354fbc[_0x12d12c(0x7ac)]());_0x2c0b40[_0x12d12c(0x47d)]&&_0x4ecc6e[_0x12d12c(0x7cc)](_0x12d12c(0x290),_0x2b28d2,_0x8cf7e,!![]);if(_0x2c0b40[_0x12d12c(0x30b)])_0x4ecc6e[_0x12d12c(0x7cc)]('performActionStart',_0x2b28d2,_0x354fbc);if(_0x2c0b40['WaitForMovement'])_0x4ecc6e[_0x12d12c(0x7cc)]('waitForMovement');if(_0x2c0b40[_0x12d12c(0x17d)])_0x4ecc6e[_0x12d12c(0x7cc)](_0x12d12c(0x702),_0x2b28d2,_0x354fbc);if(_0x2c0b40[_0x12d12c(0x89c)])_0x4ecc6e['push'](_0x12d12c(0x2f5));_0x5debcf[_0x12d12c(0x938)](_0x12d12c(0x445));}),PluginManager[_0x19a075(0x4de)](pluginData['name'],'ActSeq_Set_WholeActionSet',_0xeea23d=>{const _0x2daaaf=_0x19a075;if(!SceneManager[_0x2daaaf(0x553)]())return;VisuMZ['ConvertParams'](_0xeea23d,_0xeea23d);const _0x5aac69=$gameTemp[_0x2daaaf(0x806)](),_0xebbd3c=BattleManager['_action'],_0x2c31fa=BattleManager[_0x2daaaf(0x886)],_0x41b9e0=BattleManager[_0x2daaaf(0x7b9)]?BattleManager['_allTargets'][_0x2daaaf(0x484)](0x0):[],_0x998981=BattleManager[_0x2daaaf(0x5ae)],_0x5346e4=_0xeea23d[_0x2daaaf(0x62d)]??![];if(!_0x5aac69||!_0xebbd3c||!_0x2c31fa)return;if(!_0xebbd3c[_0x2daaaf(0x7ac)]())return;let _0x571ef9=_0x5346e4?_0x998981[_0x2daaaf(0x94f)](_0x2c31fa):0x1;for(let _0x272ff7=0x0;_0x272ff7<_0x571ef9;_0x272ff7++){_0x5346e4&&_0x2c31fa['isActor']()&&_0x998981[_0x2daaaf(0x7cc)](_0x2daaaf(0x686),_0x2c31fa,_0x272ff7);if(_0xeea23d[_0x2daaaf(0x382)])_0x998981[_0x2daaaf(0x7cc)]('performAction',_0x2c31fa,_0xebbd3c);if(_0xeea23d[_0x2daaaf(0x17b)]>0x0)_0x998981[_0x2daaaf(0x7cc)]('waitCount',_0xeea23d[_0x2daaaf(0x17b)]);if(_0xeea23d[_0x2daaaf(0x5ad)])_0x998981[_0x2daaaf(0x7cc)](_0x2daaaf(0x68c),_0x2c31fa,_0x41b9e0,_0xebbd3c['item']()[_0x2daaaf(0x62f)]);if(_0xeea23d[_0x2daaaf(0x89c)])_0x998981[_0x2daaaf(0x7cc)](_0x2daaaf(0x2f5));for(const _0xcc149b of _0x41b9e0){if(!_0xcc149b)continue;if(_0xeea23d['ActionEffect'])_0x998981[_0x2daaaf(0x7cc)](_0x2daaaf(0x43c),_0x2c31fa,_0xcc149b);}}_0x5346e4&&_0x2c31fa[_0x2daaaf(0x34c)]()&&_0x998981['push'](_0x2daaaf(0x5f8),_0x2c31fa);if(_0xeea23d[_0x2daaaf(0x47d)])_0x998981[_0x2daaaf(0x7cc)]('applyImmortal',_0x2c31fa,_0x41b9e0,![]);_0x5aac69[_0x2daaaf(0x938)]('battlelog');}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],'ActSeq_Set_TargetActionSet',_0x2d5525=>{const _0x247241=_0x19a075;if(!SceneManager[_0x247241(0x553)]())return;VisuMZ['ConvertParams'](_0x2d5525,_0x2d5525);const _0x415bb1=$gameTemp[_0x247241(0x806)](),_0x137073=BattleManager['_action'],_0x13052e=BattleManager[_0x247241(0x886)],_0x4dc424=BattleManager[_0x247241(0x7b9)]?BattleManager[_0x247241(0x7b9)]['slice'](0x0):[],_0x1d1d94=BattleManager['_logWindow'],_0x5a971d=_0x2d5525['DualWield']??![];if(!_0x415bb1||!_0x137073||!_0x13052e)return;if(!_0x137073[_0x247241(0x7ac)]())return;let _0xc6afb7=_0x5a971d?_0x1d1d94['getDualWieldTimes'](_0x13052e):0x1;for(let _0x15b365=0x0;_0x15b365<_0xc6afb7;_0x15b365++){for(const _0x6f4a49 of _0x4dc424){if(!_0x6f4a49)continue;_0x5a971d&&_0x13052e[_0x247241(0x34c)]()&&_0x1d1d94[_0x247241(0x7cc)]('setActiveWeaponSet',_0x13052e,_0x15b365);if(_0x2d5525[_0x247241(0x382)])_0x1d1d94[_0x247241(0x7cc)]('performAction',_0x13052e,_0x137073);if(_0x2d5525[_0x247241(0x876)]>0x0)_0x1d1d94[_0x247241(0x7cc)](_0x247241(0x299),_0x2d5525[_0x247241(0x876)]);if(_0x2d5525[_0x247241(0x5ad)])_0x1d1d94[_0x247241(0x7cc)](_0x247241(0x68c),_0x13052e,[_0x6f4a49],_0x137073['item']()[_0x247241(0x62f)]);if(_0x2d5525[_0x247241(0x2f6)]>0x0)_0x1d1d94['push'](_0x247241(0x299),_0x2d5525[_0x247241(0x2f6)]);if(_0x2d5525[_0x247241(0x4fd)])_0x1d1d94['push'](_0x247241(0x43c),_0x13052e,_0x6f4a49);}}_0x5a971d&&_0x13052e[_0x247241(0x34c)]()&&_0x1d1d94['push']('clearActiveWeaponSet',_0x13052e);if(_0x2d5525[_0x247241(0x47d)])_0x1d1d94['push'](_0x247241(0x290),_0x13052e,_0x4dc424,![]);_0x415bb1[_0x247241(0x938)](_0x247241(0x445));}),PluginManager['registerCommand'](pluginData[_0x19a075(0x880)],_0x19a075(0x6ba),_0x5e487b=>{const _0x2e98ba=_0x19a075;if(!SceneManager[_0x2e98ba(0x553)]())return;VisuMZ['ConvertParams'](_0x5e487b,_0x5e487b);const _0x5f59d6=$gameTemp[_0x2e98ba(0x806)](),_0x3add4f=BattleManager[_0x2e98ba(0x1f4)],_0x9c92fa=BattleManager[_0x2e98ba(0x886)],_0x2fac63=BattleManager['_allTargets']?BattleManager[_0x2e98ba(0x7b9)][_0x2e98ba(0x484)](0x0):[],_0x374c58=BattleManager['_logWindow'];if(!_0x5f59d6||!_0x3add4f||!_0x9c92fa)return;if(!_0x3add4f[_0x2e98ba(0x7ac)]())return;if(_0x5e487b[_0x2e98ba(0x47d)])_0x374c58[_0x2e98ba(0x7cc)](_0x2e98ba(0x290),_0x9c92fa,_0x2fac63,![]);if(_0x5e487b[_0x2e98ba(0x175)])_0x374c58[_0x2e98ba(0x7cc)]('waitForNewLine');if(_0x5e487b['WaitForEffect'])_0x374c58['push'](_0x2e98ba(0x354));if(_0x5e487b[_0x2e98ba(0x44e)])_0x374c58[_0x2e98ba(0x7cc)](_0x2e98ba(0x2e7));if(_0x5e487b[_0x2e98ba(0x255)])_0x374c58['push'](_0x2e98ba(0x7d9),_0x9c92fa);if(_0x5e487b[_0x2e98ba(0x1b8)])_0x374c58[_0x2e98ba(0x7cc)](_0x2e98ba(0x2ca));_0x5f59d6[_0x2e98ba(0x938)](_0x2e98ba(0x445));}),PluginManager['registerCommand'](pluginData[_0x19a075(0x880)],_0x19a075(0x904),_0x3660ff=>{const _0x25b169=_0x19a075;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x25b169(0x3dd)])return;VisuMZ[_0x25b169(0x5e4)](_0x3660ff,_0x3660ff);const _0x5e2096=$gameTemp[_0x25b169(0x806)](),_0x660c9=_0x3660ff['WaitForAngle'];if(!_0x5e2096)return;$gameScreen['setBattleAngle'](_0x3660ff[_0x25b169(0x4a6)],_0x3660ff[_0x25b169(0x59c)],_0x3660ff['EasingType']);if(_0x660c9)_0x5e2096[_0x25b169(0x938)]('battleAngle');}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x5c9),_0x51da4a=>{const _0x8eb944=_0x19a075;if(!SceneManager[_0x8eb944(0x553)]())return;if(!Imported[_0x8eb944(0x3dd)])return;VisuMZ[_0x8eb944(0x5e4)](_0x51da4a,_0x51da4a);const _0x42c7fc=$gameTemp[_0x8eb944(0x806)](),_0x86a8eb=_0x51da4a[_0x8eb944(0x1c2)];if(!_0x42c7fc)return;$gameScreen[_0x8eb944(0x7c9)](0x0,_0x51da4a[_0x8eb944(0x59c)],_0x51da4a[_0x8eb944(0x6bb)]);if(_0x86a8eb)_0x42c7fc[_0x8eb944(0x938)](_0x8eb944(0x441));}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],'ActSeq_Angle_WaitForAngle',_0x5e5092=>{const _0x54cdb5=_0x19a075;if(!SceneManager[_0x54cdb5(0x553)]())return;if(!Imported[_0x54cdb5(0x3dd)])return;const _0xa4a647=$gameTemp[_0x54cdb5(0x806)]();if(!_0xa4a647)return;_0xa4a647[_0x54cdb5(0x938)](_0x54cdb5(0x441));}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x2f0),_0x5c2fe4=>{const _0x415f9b=_0x19a075;if(!SceneManager[_0x415f9b(0x553)]())return;VisuMZ[_0x415f9b(0x5e4)](_0x5c2fe4,_0x5c2fe4);const _0x2bc694=$gameTemp[_0x415f9b(0x806)](),_0x5ac441=BattleManager[_0x415f9b(0x1f4)],_0x495091=BattleManager[_0x415f9b(0x886)],_0x321e28=VisuMZ[_0x415f9b(0x7bc)](_0x5c2fe4[_0x415f9b(0x6f7)]),_0x516ed7=_0x5c2fe4[_0x415f9b(0x7de)],_0x363616=BattleManager[_0x415f9b(0x5ae)];if(!_0x2bc694||!_0x5ac441||!_0x495091)return;if(!_0x5ac441[_0x415f9b(0x7ac)]())return;let _0x187c42=_0x5ac441[_0x415f9b(0x7ac)]()[_0x415f9b(0x62f)];if(_0x187c42<0x0)_0x187c42=_0x495091[_0x415f9b(0x8ff)]();$gameTemp['requestAnimation'](_0x321e28,_0x187c42,_0x516ed7),_0x5c2fe4[_0x415f9b(0x89c)]&&_0x2bc694['setWaitMode'](_0x415f9b(0x395));}),PluginManager['registerCommand'](pluginData[_0x19a075(0x880)],'ActSeq_Animation_AttackAnimation',_0xd3a7e0=>{const _0x4b1af4=_0x19a075;if(!SceneManager[_0x4b1af4(0x553)]())return;VisuMZ[_0x4b1af4(0x5e4)](_0xd3a7e0,_0xd3a7e0);const _0x2503b1=$gameTemp[_0x4b1af4(0x806)](),_0xe5f008=BattleManager[_0x4b1af4(0x886)],_0x19d6e3=VisuMZ[_0x4b1af4(0x7bc)](_0xd3a7e0[_0x4b1af4(0x6f7)]),_0x9932c2=_0xd3a7e0[_0x4b1af4(0x7de)],_0x5c5f7f=BattleManager['_logWindow'];if(!_0x2503b1||!_0xe5f008)return;const _0x3f5649=_0xe5f008[_0x4b1af4(0x8ff)]();$gameTemp[_0x4b1af4(0x1ab)](_0x19d6e3,_0x3f5649,_0x9932c2),_0xd3a7e0['WaitForAnimation']&&_0x2503b1[_0x4b1af4(0x938)](_0x4b1af4(0x395));}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x1a9),_0x42f3d9=>{const _0x5b4e10=_0x19a075;if(!SceneManager[_0x5b4e10(0x553)]())return;VisuMZ[_0x5b4e10(0x5e4)](_0x42f3d9,_0x42f3d9);const _0x24c17a=_0x116262[_0x5b4e10(0x75c)](_0x42f3d9['Slot']);if(_0x24c17a<=0x0)return;const _0x4ac266=$gameTemp[_0x5b4e10(0x806)](),_0x116262=BattleManager[_0x5b4e10(0x886)],_0x2f6dc7=VisuMZ[_0x5b4e10(0x7bc)](_0x42f3d9['Targets']),_0x5c9905=_0x42f3d9[_0x5b4e10(0x7de)],_0x445539=BattleManager[_0x5b4e10(0x5ae)];if(!_0x4ac266||!_0x116262)return;$gameTemp[_0x5b4e10(0x1ab)](_0x2f6dc7,_0x24c17a,_0x5c9905),_0x42f3d9[_0x5b4e10(0x89c)]&&_0x4ac266[_0x5b4e10(0x938)](_0x5b4e10(0x395));}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x263),_0x119318=>{const _0x2b6e8c=_0x19a075;if(!SceneManager[_0x2b6e8c(0x553)]())return;VisuMZ['ConvertParams'](_0x119318,_0x119318);const _0x54ad53=$gameTemp[_0x2b6e8c(0x806)](),_0x136cce=BattleManager['_action'],_0x42ad16=_0x119318[_0x2b6e8c(0x7de)],_0x165da0=VisuMZ[_0x2b6e8c(0x7bc)](_0x119318[_0x2b6e8c(0x6f7)]);if(!_0x54ad53||!_0x136cce)return;if(!_0x136cce[_0x2b6e8c(0x7ac)]())return;for(const _0x2b7e5d of _0x165da0){if(!_0x2b7e5d)continue;_0x2b7e5d[_0x2b6e8c(0x702)](_0x136cce,_0x42ad16);}if(_0x119318['WaitForAnimation'])_0x54ad53['setWaitMode'](_0x2b6e8c(0x395));}),PluginManager[_0x19a075(0x4de)](pluginData['name'],_0x19a075(0x33e),_0x3f094d=>{const _0xeabe2c=_0x19a075;VisuMZ[_0xeabe2c(0x5e4)](_0x3f094d,_0x3f094d);const _0x5537ce=$gameTemp['getLastPluginCommandInterpreter'](),_0x5a003e=VisuMZ[_0xeabe2c(0x7bc)](_0x3f094d[_0xeabe2c(0x6f7)]),_0x37f762=_0x3f094d[_0xeabe2c(0x17c)];if(!_0x37f762)return;for(const _0x23f82e of _0x5a003e){if(!_0x23f82e)continue;if(!_0x23f82e[_0xeabe2c(0x34c)]())continue;_0x23f82e[_0xeabe2c(0x4b0)](_0x37f762);}}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x6ca),_0x2be9ac=>{const _0x46cc08=_0x19a075;if(!SceneManager[_0x46cc08(0x553)]())return;VisuMZ[_0x46cc08(0x5e4)](_0x2be9ac,_0x2be9ac);const _0x5ec3e8=$gameTemp['getLastPluginCommandInterpreter'](),_0x5671ab=VisuMZ['CreateActionSequenceTargets'](_0x2be9ac['Targets']),_0x3d5f7b=_0x2be9ac[_0x46cc08(0x2c0)],_0x423116=_0x2be9ac[_0x46cc08(0x7de)];if(!_0x5ec3e8)return;$gameTemp[_0x46cc08(0x1ab)](_0x5671ab,_0x3d5f7b,_0x423116);if(_0x2be9ac[_0x46cc08(0x89c)])_0x5ec3e8[_0x46cc08(0x938)]('battleAnimation');}),PluginManager[_0x19a075(0x4de)](pluginData['name'],_0x19a075(0x427),_0x259174=>{const _0xb14395=_0x19a075;if(!SceneManager['isSceneBattle']())return;const _0x56662f=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x56662f)return;_0x56662f['setWaitMode'](_0xb14395(0x395));}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x19e),_0x56eb92=>{const _0xd43315=_0x19a075;if(!SceneManager[_0xd43315(0x553)]())return;VisuMZ[_0xd43315(0x5e4)](_0x56eb92,_0x56eb92);const _0x3a5c2d=BattleManager[_0xd43315(0x5ae)],_0x4225dd=_0x56eb92['CopyCombatLog']&&Imported[_0xd43315(0x84a)];_0x3a5c2d[_0xd43315(0x7f8)](_0x56eb92['Text']),_0x4225dd&&Imported[_0xd43315(0x84a)]&&$gameSystem[_0xd43315(0x5eb)](_0x56eb92[_0xd43315(0x1e3)]||'',_0x56eb92['CombatLogIcon']||0x0);}),PluginManager['registerCommand'](pluginData['name'],_0x19a075(0x18d),_0x3cabef=>{const _0x39b70b=_0x19a075;if(!SceneManager[_0x39b70b(0x553)]())return;const _0x2a5878=BattleManager[_0x39b70b(0x5ae)];_0x2a5878[_0x39b70b(0x2e7)]();}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x8c6),_0x138582=>{const _0x44c888=_0x19a075;if(!SceneManager[_0x44c888(0x553)]())return;const _0x27bb77=$gameTemp['getLastPluginCommandInterpreter'](),_0x41c2ed=BattleManager[_0x44c888(0x1f4)],_0x279159=BattleManager['_subject'],_0x2e43ae=BattleManager[_0x44c888(0x5ae)];if(!_0x27bb77||!_0x41c2ed||!_0x279159)return;if(!_0x41c2ed[_0x44c888(0x7ac)]())return;_0x2e43ae['displayAction'](_0x279159,_0x41c2ed[_0x44c888(0x7ac)]()),_0x27bb77[_0x44c888(0x938)](_0x44c888(0x445));}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x5d2),_0xef79f7=>{const _0x4763dc=_0x19a075;if(!SceneManager[_0x4763dc(0x553)]())return;const _0x3c9ad9=BattleManager[_0x4763dc(0x5ae)];_0x3c9ad9[_0x4763dc(0x2b6)]();}),PluginManager['registerCommand'](pluginData[_0x19a075(0x880)],_0x19a075(0x322),_0x1ebdfb=>{const _0x1a250d=_0x19a075;if(!SceneManager[_0x1a250d(0x553)]())return;const _0x11348b=BattleManager[_0x1a250d(0x5ae)];_0x11348b['pushBaseLine']();}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x930),_0x157211=>{const _0x4d60ba=_0x19a075;if(!SceneManager[_0x4d60ba(0x553)]())return;const _0x21c23b=BattleManager[_0x4d60ba(0x5ae)];_0x21c23b[_0x4d60ba(0x42f)]();}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x536),_0x1f98c8=>{const _0x37f53f=_0x19a075;if(!SceneManager[_0x37f53f(0x553)]())return;VisuMZ['ConvertParams'](_0x1f98c8,_0x1f98c8),SceneManager[_0x37f53f(0x3a8)]['setVisibleUI'](_0x1f98c8[_0x37f53f(0x72a)]);}),PluginManager['registerCommand'](pluginData[_0x19a075(0x880)],_0x19a075(0x862),_0x5d857b=>{const _0x35a3b3=_0x19a075;if(!SceneManager['isSceneBattle']())return;const _0x561921=$gameTemp[_0x35a3b3(0x806)]();_0x561921['setWaitMode'](_0x35a3b3(0x445));}),PluginManager['registerCommand'](pluginData[_0x19a075(0x880)],_0x19a075(0x1d4),_0x28a8f3=>{const _0x382eed=_0x19a075;if(!SceneManager['isSceneBattle']())return;const _0x1cd976=$gameTemp['getLastPluginCommandInterpreter'](),_0x4c9839=BattleManager[_0x382eed(0x5ae)];_0x4c9839[_0x382eed(0x924)](),_0x1cd976[_0x382eed(0x938)](_0x382eed(0x445));}),PluginManager['registerCommand'](pluginData['name'],_0x19a075(0x868),_0x206bbd=>{const _0x1fbc3b=_0x19a075;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x1fbc3b(0x3dd)])return;VisuMZ[_0x1fbc3b(0x5e4)](_0x206bbd,_0x206bbd);const _0x4db52f=$gameScreen[_0x1fbc3b(0x426)]();_0x4db52f['cameraClamp']=_0x206bbd[_0x1fbc3b(0x6af)];}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_Camera_FocusPoint',_0x175122=>{const _0x4276c4=_0x19a075;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x4276c4(0x3dd)])return;VisuMZ[_0x4276c4(0x5e4)](_0x175122,_0x175122);const _0x16ea16=$gameTemp[_0x4276c4(0x806)](),_0x13b104=_0x175122[_0x4276c4(0x910)];$gameScreen[_0x4276c4(0x796)](_0x175122['FocusX'],_0x175122[_0x4276c4(0x597)],_0x175122['Duration'],_0x175122[_0x4276c4(0x6bb)]);if(_0x13b104)_0x16ea16['setWaitMode']('battleCamera');}),PluginManager['registerCommand'](pluginData[_0x19a075(0x880)],_0x19a075(0x4e5),_0x32b9b7=>{const _0x3259aa=_0x19a075;if(!SceneManager['isSceneBattle']())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ[_0x3259aa(0x5e4)](_0x32b9b7,_0x32b9b7);const _0x3186c2=$gameTemp['getLastPluginCommandInterpreter'](),_0x53ef2d=VisuMZ[_0x3259aa(0x7bc)](_0x32b9b7['Targets']),_0x4170d7=_0x32b9b7[_0x3259aa(0x910)];$gameScreen[_0x3259aa(0x44c)](_0x53ef2d,_0x32b9b7[_0x3259aa(0x59c)],_0x32b9b7['EasingType']);if(_0x4170d7)_0x3186c2['setWaitMode'](_0x3259aa(0x36e));}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x6d1),_0xfd3c46=>{const _0xa34580=_0x19a075;if(!SceneManager[_0xa34580(0x553)]())return;if(!Imported[_0xa34580(0x3dd)])return;VisuMZ[_0xa34580(0x5e4)](_0xfd3c46,_0xfd3c46);const _0x71df5d=$gameTemp[_0xa34580(0x806)](),_0x3d7f6b=_0xfd3c46['WaitForCamera'];$gameScreen['setBattleCameraOffset'](_0xfd3c46[_0xa34580(0x3d0)],_0xfd3c46[_0xa34580(0x4ea)],_0xfd3c46[_0xa34580(0x59c)],_0xfd3c46['EasingType']);if(_0x3d7f6b)_0x71df5d[_0xa34580(0x938)](_0xa34580(0x36e));}),PluginManager[_0x19a075(0x4de)](pluginData['name'],'ActSeq_Camera_Reset',_0x5e1e94=>{const _0x222337=_0x19a075;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x222337(0x3dd)])return;VisuMZ[_0x222337(0x5e4)](_0x5e1e94,_0x5e1e94);const _0x445322=$gameTemp[_0x222337(0x806)](),_0x2779c1=_0x5e1e94['ResetFocus'],_0x504aaf=_0x5e1e94[_0x222337(0x66d)],_0x3791f5=_0x5e1e94[_0x222337(0x910)];if(_0x2779c1){const _0x4c547f=Math[_0x222337(0x48a)](Graphics['width']/0x2),_0x4ed477=Math['round'](Graphics[_0x222337(0x87b)]/0x2);$gameScreen[_0x222337(0x796)](_0x4c547f,_0x4ed477,_0x5e1e94[_0x222337(0x59c)],_0x5e1e94[_0x222337(0x6bb)]);}_0x504aaf&&$gameScreen[_0x222337(0x4cb)](0x0,0x0,_0x5e1e94[_0x222337(0x59c)],_0x5e1e94[_0x222337(0x6bb)]);if(_0x3791f5)_0x445322['setWaitMode'](_0x222337(0x36e));}),PluginManager[_0x19a075(0x4de)](pluginData['name'],_0x19a075(0x5d9),_0x1888d6=>{const _0x3b482d=_0x19a075;if(!SceneManager[_0x3b482d(0x553)]())return;if(!Imported[_0x3b482d(0x3dd)])return;const _0x12e556=$gameTemp[_0x3b482d(0x806)]();if(!_0x12e556)return;_0x12e556['setWaitMode']('battleCamera');}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_DB_DragonbonesMotionAni',_0x5030ea=>{const _0x4c8211=_0x19a075;if(!SceneManager[_0x4c8211(0x553)]())return;if(!Imported[_0x4c8211(0x89d)])return;VisuMZ[_0x4c8211(0x5e4)](_0x5030ea,_0x5030ea);const _0x54296f=VisuMZ['CreateActionSequenceTargets'](_0x5030ea[_0x4c8211(0x6f7)]),_0x1730eb=_0x5030ea[_0x4c8211(0x33c)][_0x4c8211(0x4d9)]()[_0x4c8211(0x431)]();for(const _0x193a4f of _0x54296f){if(!_0x193a4f)continue;_0x193a4f[_0x4c8211(0x45b)](_0x1730eb);}}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x48d),_0x2d77de=>{const _0x5ab7a3=_0x19a075;if(!SceneManager[_0x5ab7a3(0x553)]())return;if(!Imported[_0x5ab7a3(0x89d)])return;VisuMZ['ConvertParams'](_0x2d77de,_0x2d77de);const _0x30faff=VisuMZ[_0x5ab7a3(0x7bc)](_0x2d77de[_0x5ab7a3(0x6f7)]),_0x3172bd=_0x2d77de['TimeScale'];for(const _0x3b9f7a of _0x30faff){if(!_0x3b9f7a)continue;_0x3b9f7a[_0x5ab7a3(0x68b)]()[_0x5ab7a3(0x331)]=_0x3172bd;}}),PluginManager['registerCommand'](pluginData[_0x19a075(0x880)],_0x19a075(0x855),_0x2159a4=>{const _0x11052a=_0x19a075;if(!SceneManager[_0x11052a(0x553)]())return;if(!Imported[_0x11052a(0x3c9)])return;VisuMZ[_0x11052a(0x5e4)](_0x2159a4,_0x2159a4);const _0x422958=BattleManager[_0x11052a(0x1f4)],_0x25abf1=_0x2159a4[_0x11052a(0x58c)];if(!_0x422958)return;_0x422958[_0x11052a(0x3d3)]=_0x25abf1;}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x40f),_0x1f64e1=>{const _0x56d0d8=_0x19a075;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x56d0d8(0x3c9)])return;const _0x461d2c=BattleManager['_action'];if(!_0x461d2c)return;_0x461d2c[_0x56d0d8(0x753)]();}),PluginManager['registerCommand'](pluginData[_0x19a075(0x880)],'ActSeq_Element_ForceElements',_0x4e04c8=>{const _0x12cc0d=_0x19a075;if(!SceneManager[_0x12cc0d(0x553)]())return;if(!Imported[_0x12cc0d(0x3c9)])return;VisuMZ['ConvertParams'](_0x4e04c8,_0x4e04c8);const _0x45a0fb=BattleManager[_0x12cc0d(0x1f4)],_0x1f6390=_0x4e04c8[_0x12cc0d(0x58c)];if(!_0x45a0fb)return;_0x45a0fb[_0x12cc0d(0x1ed)]=_0x1f6390;}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],'ActSeq_Element_NullElements',_0x212b0c=>{const _0x351d41=_0x19a075;if(!SceneManager[_0x351d41(0x553)]())return;if(!Imported['VisuMZ_1_ElementStatusCore'])return;const _0xf7b165=BattleManager[_0x351d41(0x1f4)];if(!_0xf7b165)return;_0xf7b165[_0x351d41(0x3c3)]=!![];}),PluginManager['registerCommand'](pluginData['name'],_0x19a075(0x8e8),_0x3daec0=>{const _0x333d1d=_0x19a075;if(!Imported[_0x333d1d(0x8af)])return;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x333d1d(0x5e4)](_0x3daec0,_0x3daec0);const _0x773dcf=VisuMZ[_0x333d1d(0x7bc)](_0x3daec0[_0x333d1d(0x6f7)]);for(const _0x367c97 of _0x773dcf){if(!_0x367c97)continue;_0x367c97['removeHorrorEffect']('noise'),_0x367c97['removeHorrorEffect'](_0x333d1d(0x69a)),_0x367c97[_0x333d1d(0x65d)]('tv'),_0x367c97['clearHorrorEffects']();}$gamePlayer[_0x333d1d(0x42f)]();}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],'ActSeq_Horror_GlitchCreate',_0x26d3c6=>{const _0x5d8d00=_0x19a075;if(!Imported[_0x5d8d00(0x8af)])return;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x5d8d00(0x5e4)](_0x26d3c6,_0x26d3c6);const _0x533bad=VisuMZ[_0x5d8d00(0x7bc)](_0x26d3c6[_0x5d8d00(0x6f7)]),_0x4b64fd=_0x5d8d00(0x69a);_0x26d3c6['sliceMin']=Math[_0x5d8d00(0x312)](_0x26d3c6[_0x5d8d00(0x510)]/0x2),_0x26d3c6[_0x5d8d00(0x467)]=_0x26d3c6[_0x5d8d00(0x510)],_0x26d3c6[_0x5d8d00(0x87e)]=!![];for(const _0x2216ba of _0x533bad){if(!_0x2216ba)continue;_0x2216ba[_0x5d8d00(0x534)](_0x4b64fd,_0x26d3c6);}$gamePlayer[_0x5d8d00(0x42f)]();}),PluginManager['registerCommand'](pluginData[_0x19a075(0x880)],'ActSeq_Horror_GlitchRemove',_0x2ba588=>{const _0x4af33f=_0x19a075;if(!Imported[_0x4af33f(0x8af)])return;if(!SceneManager[_0x4af33f(0x553)]())return;VisuMZ[_0x4af33f(0x5e4)](_0x2ba588,_0x2ba588);const _0x2f5661=VisuMZ[_0x4af33f(0x7bc)](_0x2ba588[_0x4af33f(0x6f7)]);for(const _0x27b2db of _0x2f5661){if(!_0x27b2db)continue;_0x27b2db[_0x4af33f(0x65d)](_0x4af33f(0x69a));}$gamePlayer[_0x4af33f(0x42f)]();}),PluginManager[_0x19a075(0x4de)](pluginData['name'],'ActSeq_Horror_NoiseCreate',_0x34e69d=>{const _0x343523=_0x19a075;if(!Imported[_0x343523(0x8af)])return;if(!SceneManager[_0x343523(0x553)]())return;VisuMZ[_0x343523(0x5e4)](_0x34e69d,_0x34e69d);const _0x43b104=VisuMZ[_0x343523(0x7bc)](_0x34e69d['Targets']),_0x131033=_0x343523(0x578);for(const _0x55a237 of _0x43b104){if(!_0x55a237)continue;_0x55a237[_0x343523(0x534)](_0x131033,_0x34e69d);}$gamePlayer[_0x343523(0x42f)]();}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x223),_0x470be5=>{const _0x22c0cc=_0x19a075;if(!Imported['VisuMZ_2_HorrorEffects'])return;if(!SceneManager[_0x22c0cc(0x553)]())return;VisuMZ['ConvertParams'](_0x470be5,_0x470be5);const _0xba2d02=VisuMZ['CreateActionSequenceTargets'](_0x470be5['Targets']);for(const _0x59c9a1 of _0xba2d02){if(!_0x59c9a1)continue;_0x59c9a1['removeHorrorEffect'](_0x22c0cc(0x578));}$gamePlayer[_0x22c0cc(0x42f)]();}),PluginManager['registerCommand'](pluginData['name'],_0x19a075(0x1b5),_0xe94c3b=>{const _0x52efce=_0x19a075;if(!Imported[_0x52efce(0x8af)])return;if(!SceneManager[_0x52efce(0x553)]())return;VisuMZ[_0x52efce(0x5e4)](_0xe94c3b,_0xe94c3b);const _0x3404b5=VisuMZ['CreateActionSequenceTargets'](_0xe94c3b[_0x52efce(0x6f7)]),_0x5b52fd='tv';for(const _0x397ef6 of _0x3404b5){if(!_0x397ef6)continue;_0x397ef6[_0x52efce(0x534)](_0x5b52fd,_0xe94c3b);}$gamePlayer[_0x52efce(0x42f)]();}),PluginManager[_0x19a075(0x4de)](pluginData['name'],_0x19a075(0x2a3),_0x5cfde2=>{const _0x240702=_0x19a075;if(!Imported[_0x240702(0x8af)])return;if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x5cfde2,_0x5cfde2);const _0x4179a0=VisuMZ[_0x240702(0x7bc)](_0x5cfde2['Targets']);for(const _0x1e4b9e of _0x4179a0){if(!_0x1e4b9e)continue;_0x1e4b9e['removeHorrorEffect']('tv');}$gamePlayer[_0x240702(0x42f)]();}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],'ActSeq_Impact_ColorBreak',_0x2940e5=>{const _0x382ef0=_0x19a075;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x382ef0(0x66e)])return;const _0x552c32=SceneManager['_scene'][_0x382ef0(0x525)];if(!_0x552c32)return;VisuMZ['ConvertParams'](_0x2940e5,_0x2940e5);const _0x56e5bc=_0x2940e5['Intensity']||0x1,_0x1ef6f0=_0x2940e5[_0x382ef0(0x59c)]||0x1,_0x18a40b=_0x2940e5[_0x382ef0(0x6bb)]||'Linear';_0x552c32[_0x382ef0(0x940)](_0x56e5bc,_0x1ef6f0,_0x18a40b);}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],'ActSeq_Impact_MotionBlurScreen',_0x348430=>{const _0x190dda=_0x19a075;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x190dda(0x66e)])return;const _0x5ae2c3=SceneManager[_0x190dda(0x3a8)][_0x190dda(0x525)];if(!_0x5ae2c3)return;VisuMZ[_0x190dda(0x5e4)](_0x348430,_0x348430);const _0x5b57b3=Number(_0x348430[_0x190dda(0x4a6)])||0x0,_0x2fcbf8=Number(_0x348430[_0x190dda(0x7b0)]),_0x23cd30=_0x348430[_0x190dda(0x59c)]||0x1,_0xa0eb6d=_0x348430[_0x190dda(0x6bb)]||_0x190dda(0x36a);_0x5ae2c3[_0x190dda(0x710)](_0x5b57b3,_0x2fcbf8,_0x23cd30,_0xa0eb6d);}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x549),_0x1f5af7=>{const _0x3b292c=_0x19a075;if(!SceneManager[_0x3b292c(0x553)]())return;if(!Imported[_0x3b292c(0x66e)])return;const _0xf3dd7d=SceneManager[_0x3b292c(0x3a8)][_0x3b292c(0x525)];if(!_0xf3dd7d)return;VisuMZ[_0x3b292c(0x5e4)](_0x1f5af7,_0x1f5af7);const _0x55db92=Number(_0x1f5af7[_0x3b292c(0x4a6)])||0x0,_0x212006=Number(_0x1f5af7[_0x3b292c(0x7b0)]),_0x39694d=_0x1f5af7[_0x3b292c(0x59c)]||0x1,_0x1c3791=_0x1f5af7[_0x3b292c(0x6bb)]||_0x3b292c(0x36a),_0x25caa5=VisuMZ['CreateActionSequenceTargets'](_0x1f5af7[_0x3b292c(0x6f7)]);for(const _0x55e712 of _0x25caa5){if(!_0x55e712)continue;if(!_0x55e712[_0x3b292c(0x612)]())continue;_0x55e712[_0x3b292c(0x612)]()['setupMotionBlurImpactFilter'](_0x55db92,_0x212006,_0x39694d,_0x1c3791);}}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x66b),_0x177e38=>{const _0x4793ce=_0x19a075;if(!SceneManager[_0x4793ce(0x553)]())return;if(!Imported[_0x4793ce(0x66e)])return;VisuMZ[_0x4793ce(0x5e4)](_0x177e38,_0x177e38);const _0x1f00f6={'delay':_0x177e38[_0x4793ce(0x89b)],'duration':_0x177e38[_0x4793ce(0x3ce)],'hue':_0x177e38['hue'],'opacityStart':_0x177e38[_0x4793ce(0x870)],'tone':_0x177e38['tone'],'visible':!![]},_0x2ed182=VisuMZ[_0x4793ce(0x7bc)](_0x177e38[_0x4793ce(0x6f7)]);for(const _0x29b7b6 of _0x2ed182){if(!_0x29b7b6)continue;_0x29b7b6[_0x4793ce(0x698)](_0x1f00f6);}}),PluginManager[_0x19a075(0x4de)](pluginData['name'],_0x19a075(0x440),_0x247e02=>{const _0x2c9d2a=_0x19a075;if(!SceneManager['isSceneBattle']())return;if(!Imported['VisuMZ_3_ActSeqImpact'])return;VisuMZ[_0x2c9d2a(0x5e4)](_0x247e02,_0x247e02);const _0x1238d0=VisuMZ[_0x2c9d2a(0x7bc)](_0x247e02[_0x2c9d2a(0x6f7)]);for(const _0x33eeb1 of _0x1238d0){if(!_0x33eeb1)continue;_0x33eeb1['clearBattlerMotionTrailData']();}}),PluginManager[_0x19a075(0x4de)](pluginData['name'],_0x19a075(0x489),_0x30b458=>{const _0x2f7df2=_0x19a075;if(!Imported[_0x2f7df2(0x66e)])return;const _0xb7fb6=SceneManager[_0x2f7df2(0x3a8)][_0x2f7df2(0x525)];if(!_0xb7fb6)return;VisuMZ[_0x2f7df2(0x5e4)](_0x30b458,_0x30b458);const _0x259214=_0x30b458['X']||0x0,_0x548033=_0x30b458['Y']||0x0,_0x22da45=_0x30b458['Amp']||0x0,_0x5a6c37=_0x30b458['Wave']||0x0,_0x5dc4ae=_0x30b458[_0x2f7df2(0x59c)]||0x1;_0xb7fb6[_0x2f7df2(0x4e1)](_0x259214,_0x548033,_0x22da45,_0x5a6c37,_0x5dc4ae);}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x627),_0x3de274=>{const _0x5620c8=_0x19a075;if(!SceneManager[_0x5620c8(0x553)]())return;if(!Imported['VisuMZ_3_ActSeqImpact'])return;const _0x15afa9=SceneManager[_0x5620c8(0x3a8)][_0x5620c8(0x525)];if(!_0x15afa9)return;VisuMZ[_0x5620c8(0x5e4)](_0x3de274,_0x3de274);const _0x4a479c=VisuMZ[_0x5620c8(0x7bc)](_0x3de274['Targets']),_0x19e812=_0x3de274[_0x5620c8(0x511)],_0x545e05=_0x3de274['OffsetX']||0x0,_0x2c6d04=_0x3de274['OffsetY']||0x0,_0x3b4250=_0x3de274[_0x5620c8(0x7c1)]||0x0,_0x5dcd6d=_0x3de274['Wave']||0x0,_0x4fde7e=_0x3de274[_0x5620c8(0x59c)]||0x1;for(const _0x277d44 of _0x4a479c){if(!_0x277d44)continue;if(!_0x277d44['battler']())continue;const _0x34aa28=_0x277d44['battler']();let _0x2c8667=_0x34aa28[_0x5620c8(0x5dc)],_0x1d9a1e=_0x34aa28[_0x5620c8(0x6b6)];_0x2c8667+=(Graphics['width']-Graphics[_0x5620c8(0x256)])/0x2,_0x1d9a1e+=(Graphics['height']-Graphics[_0x5620c8(0x18f)])/0x2;if(_0x19e812[_0x5620c8(0x6c8)](/front/i))_0x2c8667+=(_0x277d44[_0x5620c8(0x5a3)]()?0x1:-0x1)*_0x34aa28[_0x5620c8(0x739)]()/0x2;else _0x19e812[_0x5620c8(0x6c8)](/back/i)&&(_0x2c8667+=(_0x277d44[_0x5620c8(0x5a3)]()?-0x1:0x1)*_0x34aa28[_0x5620c8(0x739)]()/0x2);if(_0x19e812['match'](/head/i))_0x1d9a1e-=_0x34aa28[_0x5620c8(0x38e)]();else _0x19e812[_0x5620c8(0x6c8)](/center/i)&&(_0x1d9a1e-=_0x34aa28['mainSpriteHeight']()/0x2);_0x2c8667+=_0x545e05,_0x1d9a1e+=_0x2c6d04,_0x15afa9[_0x5620c8(0x4e1)](_0x2c8667,_0x1d9a1e,_0x3b4250,_0x5dcd6d,_0x4fde7e);}}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_Impact_ShockwaveCenterTargets',_0x57d189=>{const _0x101e71=_0x19a075;if(!SceneManager[_0x101e71(0x553)]())return;if(!Imported[_0x101e71(0x66e)])return;const _0x1d5468=SceneManager[_0x101e71(0x3a8)][_0x101e71(0x525)];if(!_0x1d5468)return;VisuMZ[_0x101e71(0x5e4)](_0x57d189,_0x57d189);const _0x3bfc13=VisuMZ[_0x101e71(0x7bc)](_0x57d189[_0x101e71(0x6f7)]),_0x409f75=_0x57d189[_0x101e71(0x511)],_0x373875=_0x57d189[_0x101e71(0x3d0)]||0x0,_0x259178=_0x57d189['OffsetY']||0x0,_0x27ed27=_0x57d189[_0x101e71(0x7c1)]||0x0,_0x16b8b3=_0x57d189[_0x101e71(0x76b)]||0x0,_0x1638ab=_0x57d189[_0x101e71(0x59c)]||0x1,_0x472ae6=Math[_0x101e71(0x5cc)](..._0x3bfc13[_0x101e71(0x4be)](_0xa738c8=>_0xa738c8[_0x101e71(0x612)]()[_0x101e71(0x5dc)]-_0xa738c8[_0x101e71(0x612)]()[_0x101e71(0x739)]()/0x2)),_0xe18530=Math[_0x101e71(0x6aa)](..._0x3bfc13[_0x101e71(0x4be)](_0xfcab57=>_0xfcab57[_0x101e71(0x612)]()['_baseX']+_0xfcab57[_0x101e71(0x612)]()[_0x101e71(0x739)]()/0x2)),_0x231ab2=Math[_0x101e71(0x5cc)](..._0x3bfc13['map'](_0x35fe7c=>_0x35fe7c['battler']()[_0x101e71(0x6b6)]-_0x35fe7c[_0x101e71(0x612)]()[_0x101e71(0x38e)]())),_0x33ba3f=Math[_0x101e71(0x6aa)](..._0x3bfc13[_0x101e71(0x4be)](_0x133eb8=>_0x133eb8[_0x101e71(0x612)]()['_baseY'])),_0x2ce9c3=_0x3bfc13[_0x101e71(0x53d)](_0x2f48ce=>_0x2f48ce['isActor']())['length'],_0x500b1d=_0x3bfc13[_0x101e71(0x53d)](_0x299742=>_0x299742[_0x101e71(0x5a3)]())['length'];let _0x347601=0x0,_0x2c804c=0x0;if(_0x409f75[_0x101e71(0x6c8)](/front/i))_0x347601=_0x2ce9c3>=_0x500b1d?_0x472ae6:_0xe18530;else{if(_0x409f75[_0x101e71(0x6c8)](/middle/i))_0x347601=(_0x472ae6+_0xe18530)/0x2,melee=-0x1;else _0x409f75['match'](/back/i)&&(_0x347601=_0x2ce9c3>=_0x500b1d?_0xe18530:_0x472ae6);}if(_0x409f75[_0x101e71(0x6c8)](/head/i))_0x2c804c=_0x231ab2;else{if(_0x409f75[_0x101e71(0x6c8)](/center/i))_0x2c804c=(_0x231ab2+_0x33ba3f)/0x2;else _0x409f75['match'](/base/i)&&(_0x2c804c=_0x33ba3f);}_0x347601+=(Graphics[_0x101e71(0x594)]-Graphics[_0x101e71(0x256)])/0x2,_0x2c804c+=(Graphics[_0x101e71(0x87b)]-Graphics['boxHeight'])/0x2,_0x347601+=_0x373875,_0x2c804c+=_0x259178,_0x1d5468[_0x101e71(0x4e1)](_0x347601,_0x2c804c,_0x27ed27,_0x16b8b3,_0x1638ab);}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x703),_0x51a0ff=>{const _0xf8af7f=_0x19a075;if(!Imported[_0xf8af7f(0x66e)])return;const _0x31c82d=SceneManager['_scene'][_0xf8af7f(0x525)];if(!_0x31c82d)return;VisuMZ[_0xf8af7f(0x5e4)](_0x51a0ff,_0x51a0ff);const _0x19e202=_0x51a0ff['X']||0x0,_0x3c22e9=_0x51a0ff['Y']||0x0,_0x286852=_0x51a0ff['Strength']||0x0,_0x1e1541=_0x51a0ff[_0xf8af7f(0x761)]||0x0,_0x1fd6bf=_0x51a0ff['Duration']||0x1,_0x61d714=_0x51a0ff['EasingType']||_0xf8af7f(0x36a);_0x31c82d[_0xf8af7f(0x253)](_0x286852,_0x19e202,_0x3c22e9,_0x1e1541,_0x1fd6bf,_0x61d714);}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x6fb),_0x2d551a=>{const _0x257115=_0x19a075;if(!Imported['VisuMZ_3_ActSeqImpact'])return;const _0x5704fb=SceneManager[_0x257115(0x3a8)][_0x257115(0x525)];if(!_0x5704fb)return;VisuMZ[_0x257115(0x5e4)](_0x2d551a,_0x2d551a);const _0x35e68e=VisuMZ[_0x257115(0x7bc)](_0x2d551a[_0x257115(0x6f7)]),_0x42c3cb=_0x2d551a['TargetLocation'],_0x12d910=_0x2d551a[_0x257115(0x3d0)]||0x0,_0x5f52de=_0x2d551a[_0x257115(0x4ea)]||0x0,_0x42f136=_0x2d551a[_0x257115(0x523)]||0x0,_0x1a4ec9=_0x2d551a['Radius']||0x0,_0x232309=_0x2d551a['Duration']||0x1,_0xaeea5b=_0x2d551a['EasingType']||'Linear',_0xdd5183=Math['min'](..._0x35e68e[_0x257115(0x4be)](_0x3d10a7=>_0x3d10a7[_0x257115(0x612)]()[_0x257115(0x5dc)]-_0x3d10a7['battler']()[_0x257115(0x739)]()/0x2)),_0xc10c69=Math[_0x257115(0x6aa)](..._0x35e68e[_0x257115(0x4be)](_0x27960b=>_0x27960b[_0x257115(0x612)]()['_baseX']+_0x27960b[_0x257115(0x612)]()[_0x257115(0x739)]()/0x2)),_0x368d13=Math[_0x257115(0x5cc)](..._0x35e68e[_0x257115(0x4be)](_0x12a476=>_0x12a476[_0x257115(0x612)]()['_baseY']-_0x12a476['battler']()[_0x257115(0x38e)]())),_0xa500e=Math[_0x257115(0x6aa)](..._0x35e68e[_0x257115(0x4be)](_0x2526d6=>_0x2526d6[_0x257115(0x612)]()[_0x257115(0x6b6)])),_0x13d7e2=_0x35e68e[_0x257115(0x53d)](_0x52bb74=>_0x52bb74[_0x257115(0x34c)]())[_0x257115(0x644)],_0x19743b=_0x35e68e[_0x257115(0x53d)](_0x972714=>_0x972714[_0x257115(0x5a3)]())[_0x257115(0x644)];let _0x41dc70=0x0,_0x59c987=0x0;if(_0x42c3cb['match'](/front/i))_0x41dc70=_0x13d7e2>=_0x19743b?_0xdd5183:_0xc10c69;else{if(_0x42c3cb[_0x257115(0x6c8)](/middle/i))_0x41dc70=(_0xdd5183+_0xc10c69)/0x2,melee=-0x1;else _0x42c3cb[_0x257115(0x6c8)](/back/i)&&(_0x41dc70=_0x13d7e2>=_0x19743b?_0xc10c69:_0xdd5183);}if(_0x42c3cb['match'](/head/i))_0x59c987=_0x368d13;else{if(_0x42c3cb['match'](/center/i))_0x59c987=(_0x368d13+_0xa500e)/0x2;else _0x42c3cb['match'](/base/i)&&(_0x59c987=_0xa500e);}_0x41dc70+=(Graphics[_0x257115(0x594)]-Graphics['boxWidth'])/0x2,_0x59c987+=(Graphics[_0x257115(0x87b)]-Graphics[_0x257115(0x18f)])/0x2,_0x41dc70+=_0x12d910,_0x59c987+=_0x5f52de,_0x5704fb[_0x257115(0x253)](_0x42f136,_0x41dc70,_0x59c987,_0x1a4ec9,_0x232309,_0xaeea5b);}),PluginManager[_0x19a075(0x4de)](pluginData['name'],'ActSeq_Mechanics_ActionEffect',_0x3431ab=>{const _0x5e4bb3=_0x19a075;if(!SceneManager[_0x5e4bb3(0x553)]())return;VisuMZ[_0x5e4bb3(0x5e4)](_0x3431ab,_0x3431ab);const _0x89f8a6=$gameTemp['getLastPluginCommandInterpreter'](),_0xbf1fc5=BattleManager[_0x5e4bb3(0x1f4)],_0x434f81=BattleManager['_subject'],_0x238929=BattleManager['_logWindow'];if(!_0x89f8a6||!_0xbf1fc5||!_0x434f81)return;if(!_0xbf1fc5[_0x5e4bb3(0x7ac)]())return;const _0x53c059=VisuMZ['CreateActionSequenceTargets'](_0x3431ab[_0x5e4bb3(0x6f7)]);for(const _0x57ab9a of _0x53c059){if(!_0x57ab9a)continue;_0x238929['push'](_0x5e4bb3(0x43c),_0x434f81,_0x57ab9a);}_0x89f8a6[_0x5e4bb3(0x938)](_0x5e4bb3(0x445));}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],'ActSeq_Mechanics_AddBuffDebuff',_0x1c4981=>{const _0x458212=_0x19a075;if(!SceneManager[_0x458212(0x553)]())return;VisuMZ[_0x458212(0x5e4)](_0x1c4981,_0x1c4981);const _0x22f268=['MAXHP',_0x458212(0x5de),_0x458212(0x19c),_0x458212(0x248),_0x458212(0x3fe),_0x458212(0x7f5),_0x458212(0x640),_0x458212(0x854)],_0x37ce22=_0x1c4981[_0x458212(0x360)],_0x4436fc=_0x1c4981[_0x458212(0x276)],_0x3ed898=_0x1c4981['Turns'],_0x3ec73e=VisuMZ['CreateActionSequenceTargets'](_0x1c4981[_0x458212(0x6f7)]);for(const _0x594374 of _0x3ec73e){if(!_0x594374)continue;for(const _0x267164 of _0x37ce22){const _0x39250c=_0x22f268[_0x458212(0x93c)](_0x267164['toUpperCase']()[_0x458212(0x431)]());_0x39250c>=0x0&&_0x39250c<=0x7&&_0x594374[_0x458212(0x766)](_0x39250c,_0x3ed898);}for(const _0x365bf6 of _0x4436fc){const _0x3d5a20=_0x22f268['indexOf'](_0x365bf6[_0x458212(0x171)]()['trim']());_0x3d5a20>=0x0&&_0x3d5a20<=0x7&&_0x594374[_0x458212(0x934)](_0x3d5a20,_0x3ed898);}}}),PluginManager['registerCommand'](pluginData['name'],_0x19a075(0x8c8),_0x5c1bc6=>{const _0x593b75=_0x19a075;if(!SceneManager[_0x593b75(0x553)]())return;VisuMZ[_0x593b75(0x5e4)](_0x5c1bc6,_0x5c1bc6);const _0x116c0d=_0x5c1bc6['States'],_0x5bc47d=VisuMZ[_0x593b75(0x7bc)](_0x5c1bc6[_0x593b75(0x6f7)]);for(const _0x407110 of _0x5bc47d){if(!_0x407110)continue;for(const _0x19936c of _0x116c0d){_0x407110[_0x593b75(0x762)](_0x19936c);}}}),PluginManager['registerCommand'](pluginData['name'],_0x19a075(0x581),_0x5968e1=>{const _0x209ea4=_0x19a075;if(!SceneManager[_0x209ea4(0x553)]())return;VisuMZ[_0x209ea4(0x5e4)](_0x5968e1,_0x5968e1);const _0x4aea3f=BattleManager[_0x209ea4(0x1f4)],_0x1efe17={'arPenRate':_0x5968e1[_0x209ea4(0x1b7)],'arPenFlat':_0x5968e1[_0x209ea4(0x3f7)],'arRedRate':_0x5968e1[_0x209ea4(0x516)],'arRedFlat':_0x5968e1['ArRedFlat']};_0x4aea3f[_0x209ea4(0x6cd)]=_0x1efe17;}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x2cb),_0x402662=>{const _0x306a26=_0x19a075;if(!SceneManager[_0x306a26(0x553)]())return;VisuMZ['ConvertParams'](_0x402662,_0x402662);const _0x25ecb2=VisuMZ[_0x306a26(0x7bc)](_0x402662[_0x306a26(0x6f7)]),_0x41bdfa=_0x402662[_0x306a26(0x6f0)]||0x1;for(const _0x94c319 of _0x25ecb2){if(!_0x94c319)continue;if(!_0x94c319[_0x306a26(0x5a3)]())continue;_0x94c319[_0x306a26(0x459)](_0x41bdfa);}}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x8f4),_0x30d488=>{const _0x4c4a52=_0x19a075;if(!SceneManager[_0x4c4a52(0x553)]())return;if(!Imported['VisuMZ_2_BattleSystemATB'])return;VisuMZ[_0x4c4a52(0x5e4)](_0x30d488,_0x30d488);const _0x5dd38a=VisuMZ[_0x4c4a52(0x7bc)](_0x30d488[_0x4c4a52(0x6f7)]),_0x47490c=_0x30d488[_0x4c4a52(0x877)],_0x5a520a=_0x30d488[_0x4c4a52(0x877)],_0xbf6cb3=_0x30d488[_0x4c4a52(0x73a)];for(const _0x197858 of _0x5dd38a){if(!_0x197858)continue;if(_0x197858['isAtbChargingState']())_0x197858['changeAtbChargeTime'](_0x47490c);else{if(_0x197858[_0x4c4a52(0x5d3)]()){_0x197858['changeAtbCastTime'](_0x5a520a);if(_0xbf6cb3)_0x197858[_0x4c4a52(0x388)]();}}}}),PluginManager['registerCommand'](pluginData['name'],_0x19a075(0x3fc),_0x610dc8=>{const _0x5599c7=_0x19a075;if(!SceneManager[_0x5599c7(0x553)]())return;if(!Imported[_0x5599c7(0x584)])return;VisuMZ[_0x5599c7(0x5e4)](_0x610dc8,_0x610dc8);const _0x2386f2=VisuMZ['CreateActionSequenceTargets'](_0x610dc8[_0x5599c7(0x6f7)]),_0x430676=_0x610dc8[_0x5599c7(0x77f)];for(const _0x1726e8 of _0x2386f2){if(!_0x1726e8)continue;_0x1726e8[_0x5599c7(0x8f9)](_0x430676);}}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],'ActSeq_Mechanics_BoostPointsStoreData',_0x2c3b6c=>{const _0x1e8461=_0x19a075;if(!SceneManager[_0x1e8461(0x553)]())return;if(!Imported[_0x1e8461(0x584)])return;if(!BattleManager[_0x1e8461(0x886)])return;VisuMZ['ConvertParams'](_0x2c3b6c,_0x2c3b6c);const _0x39c6ee=_0x2c3b6c['VariableID'];$gameVariables[_0x1e8461(0x32e)](_0x39c6ee,BattleManager[_0x1e8461(0x886)][_0x1e8461(0x490)]());}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x23d),_0x4ac23b=>{const _0x350772=_0x19a075;if(!SceneManager[_0x350772(0x553)]())return;if(!Imported[_0x350772(0x727)])return;VisuMZ[_0x350772(0x5e4)](_0x4ac23b,_0x4ac23b);const _0xb4e3d7=VisuMZ['CreateActionSequenceTargets'](_0x4ac23b['Targets']),_0x33ebfb=_0x4ac23b['BreakShields'];for(const _0x4575cc of _0xb4e3d7){if(!_0x4575cc)continue;if(_0x4575cc['isBreakStunned']())continue;if(!_0x4575cc[_0x350772(0x4c5)]())continue;_0x4575cc[_0x350772(0x59e)](_0x33ebfb);}}),PluginManager[_0x19a075(0x4de)](pluginData['name'],_0x19a075(0x2c2),_0x208ed3=>{const _0xe1ac22=_0x19a075;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0xe1ac22(0x727)])return;VisuMZ[_0xe1ac22(0x5e4)](_0x208ed3,_0x208ed3);const _0x2a676d=VisuMZ[_0xe1ac22(0x7bc)](_0x208ed3[_0xe1ac22(0x6f7)]);for(const _0x3300a2 of _0x2a676d){if(!_0x3300a2)continue;if(_0x3300a2[_0xe1ac22(0x481)]())continue;if(!_0x3300a2[_0xe1ac22(0x4c5)]())continue;_0x3300a2[_0xe1ac22(0x88f)]();}}),PluginManager['registerCommand'](pluginData[_0x19a075(0x880)],_0x19a075(0x605),_0x3708d6=>{const _0x480b32=_0x19a075;if(!SceneManager[_0x480b32(0x553)]())return;if(!Imported[_0x480b32(0x894)])return;VisuMZ[_0x480b32(0x5e4)](_0x3708d6,_0x3708d6);const _0x1c3290=VisuMZ['CreateActionSequenceTargets'](_0x3708d6[_0x480b32(0x6f7)]),_0x343776=_0x3708d6[_0x480b32(0x29b)];for(const _0x358c7d of _0x1c3290){if(!_0x358c7d)continue;_0x358c7d[_0x480b32(0x35b)](_0x343776);}}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x676),_0x59c8f3=>{const _0x41e7c2=_0x19a075;if(!SceneManager[_0x41e7c2(0x553)]())return;VisuMZ[_0x41e7c2(0x5e4)](_0x59c8f3,_0x59c8f3);const _0x460feb=$gameTemp['getLastPluginCommandInterpreter'](),_0x57f59c=BattleManager['_action'],_0x306e68=BattleManager[_0x41e7c2(0x886)];if(!_0x460feb||!_0x57f59c||!_0x306e68)return;if(!_0x57f59c['item']())return;const _0x464f58=VisuMZ[_0x41e7c2(0x7bc)](_0x59c8f3[_0x41e7c2(0x6f7)]);for(const _0x38f934 of _0x464f58){if(!_0x38f934)continue;_0x59c8f3[_0x41e7c2(0x907)]&&(_0x38f934[_0x41e7c2(0x5e2)](),_0x38f934['addState'](_0x38f934[_0x41e7c2(0x39c)]())),_0x38f934[_0x41e7c2(0x1fb)]()&&_0x38f934[_0x41e7c2(0x6d9)]();}_0x460feb[_0x41e7c2(0x938)](_0x41e7c2(0x748));}),PluginManager['registerCommand'](pluginData[_0x19a075(0x880)],_0x19a075(0x4bc),_0x154f08=>{const _0x28328a=_0x19a075;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x28328a(0x38d)])return;VisuMZ[_0x28328a(0x5e4)](_0x154f08,_0x154f08);const _0x39b5b4=VisuMZ['CreateActionSequenceTargets'](_0x154f08[_0x28328a(0x6f7)]),_0x4414b9=_0x154f08['ChangeOrderBy'];for(const _0x253948 of _0x39b5b4){if(!_0x253948)continue;_0x253948['changeTurnOrderByCTB'](_0x4414b9);}}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x432),_0x20ecb2=>{const _0x46a1ed=_0x19a075;if(!SceneManager[_0x46a1ed(0x553)]())return;if(!Imported['VisuMZ_2_BattleSystemCTB'])return;VisuMZ['ConvertParams'](_0x20ecb2,_0x20ecb2);const _0x15507d=VisuMZ['CreateActionSequenceTargets'](_0x20ecb2['Targets']),_0x1ac2a3=_0x20ecb2[_0x46a1ed(0x877)],_0x4fc797=_0x20ecb2[_0x46a1ed(0x877)];for(const _0x214b11 of _0x15507d){if(!_0x214b11)continue;if(_0x214b11[_0x46a1ed(0x69f)]===_0x46a1ed(0x93f))_0x214b11['changeCtbChargeTime'](_0x1ac2a3);else _0x214b11[_0x46a1ed(0x69f)]===_0x46a1ed(0x301)&&_0x214b11[_0x46a1ed(0x2d8)](_0x4fc797);}}),PluginManager[_0x19a075(0x4de)](pluginData['name'],_0x19a075(0x46f),_0x82bb3e=>{const _0x36734d=_0x19a075;if(!SceneManager[_0x36734d(0x553)]())return;VisuMZ[_0x36734d(0x5e4)](_0x82bb3e,_0x82bb3e);const _0x38fbdb=BattleManager[_0x36734d(0x1f4)];if(!_0x38fbdb)return;let _0x22bb11=_0x82bb3e[_0x36734d(0x305)];_0x38fbdb[_0x36734d(0x6e3)](_0x22bb11);}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x91c),_0x44f46c=>{const _0x58c3a0=_0x19a075;if(!SceneManager[_0x58c3a0(0x553)]())return;VisuMZ[_0x58c3a0(0x5e4)](_0x44f46c,_0x44f46c);const _0x303a97=VisuMZ[_0x58c3a0(0x7bc)](_0x44f46c[_0x58c3a0(0x6f7)]);for(const _0x329e5e of _0x303a97){if(!_0x329e5e)continue;if(_0x329e5e[_0x58c3a0(0x5b1)]())_0x329e5e[_0x58c3a0(0x2c8)]();}}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x3d7),_0x569123=>{const _0x447ba5=_0x19a075;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x447ba5(0x5e4)](_0x569123,_0x569123);const _0x46d6b9=$gameTemp['getLastPluginCommandInterpreter'](),_0x14d21a=BattleManager[_0x447ba5(0x886)],_0x306c6d=_0x569123[_0x447ba5(0x763)];if(!_0x46d6b9)return;if(!_0x14d21a)return;_0x14d21a&&_0x14d21a[_0x447ba5(0x64f)]()&&_0x306c6d['toUpperCase']()['trim']()!==_0x447ba5(0x73f)&&_0x46d6b9[_0x447ba5(0x756)]([_0x306c6d]);}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x3c6),_0x51815e=>{const _0x18939f=_0x19a075;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x18939f(0x1c5)])return;VisuMZ['ConvertParams'](_0x51815e,_0x51815e);const _0x3be30a=_0x51815e[_0x18939f(0x84e)];BattleManager[_0x18939f(0x886)]&&BattleManager[_0x18939f(0x886)][_0x18939f(0x37c)]()['gainCurrentActionsFTB'](_0x3be30a);}),PluginManager['registerCommand'](pluginData[_0x19a075(0x880)],_0x19a075(0x79f),_0x169a3f=>{const _0x36cac2=_0x19a075;if(!SceneManager[_0x36cac2(0x553)]())return;VisuMZ[_0x36cac2(0x5e4)](_0x169a3f,_0x169a3f);const _0x4ee691=VisuMZ['CreateActionSequenceTargets'](_0x169a3f[_0x36cac2(0x6f7)]),_0x244a9e=_0x169a3f[_0x36cac2(0x8a7)],_0xed70b6=_0x169a3f[_0x36cac2(0x8db)],_0x2898d3=_0x169a3f[_0x36cac2(0x366)],_0x3abc4f=_0x169a3f[_0x36cac2(0x309)],_0x22d781=_0x169a3f[_0x36cac2(0x233)],_0x4282c1=_0x169a3f[_0x36cac2(0x1d1)],_0x361d5e=_0x169a3f[_0x36cac2(0x883)];for(const _0xa5b567 of _0x4ee691){if(!_0xa5b567)continue;const _0x570f81=_0xa5b567[_0x36cac2(0x72e)](),_0x425cae=Math['round'](_0x244a9e*_0xa5b567[_0x36cac2(0x7ae)]+_0xed70b6),_0x4ce6f5=Math['round'](_0x2898d3*_0xa5b567[_0x36cac2(0x464)]+_0x3abc4f),_0x1ab4bd=Math[_0x36cac2(0x48a)](_0x22d781*_0xa5b567[_0x36cac2(0x502)]()+_0x4282c1);if(_0x425cae!==0x0)_0xa5b567['gainHp'](_0x425cae);if(_0x4ce6f5!==0x0)_0xa5b567[_0x36cac2(0x3ad)](_0x4ce6f5);if(_0x1ab4bd!==0x0)_0xa5b567[_0x36cac2(0x1bd)](_0x1ab4bd);if(_0x361d5e)_0xa5b567[_0x36cac2(0x2c8)]();_0x570f81&&_0xa5b567[_0x36cac2(0x64f)]()&&_0xa5b567[_0x36cac2(0x6d9)]();}}),PluginManager['registerCommand'](pluginData[_0x19a075(0x880)],_0x19a075(0x785),_0x3e8f90=>{const _0x1345fe=_0x19a075;if(!SceneManager[_0x1345fe(0x553)]())return;VisuMZ[_0x1345fe(0x5e4)](_0x3e8f90,_0x3e8f90);const _0x576843=VisuMZ['CreateActionSequenceTargets'](_0x3e8f90['Targets']);for(const _0xffee17 of _0x576843){if(!_0xffee17)continue;_0xffee17[_0x1345fe(0x300)](_0x3e8f90[_0x1345fe(0x30d)]);}}),PluginManager['registerCommand'](pluginData['name'],_0x19a075(0x842),_0x42ed49=>{const _0x31d470=_0x19a075;if(!SceneManager[_0x31d470(0x553)]())return;VisuMZ[_0x31d470(0x5e4)](_0x42ed49,_0x42ed49);const _0x228d69=BattleManager[_0x31d470(0x1f4)],_0x28032e={'criticalHitRate':_0x42ed49[_0x31d470(0x4e7)],'criticalHitFlat':_0x42ed49['CriticalHitFlat'],'criticalDmgRate':_0x42ed49[_0x31d470(0x448)],'criticalDmgFlat':_0x42ed49['CriticalDmgFlat'],'damageRate':_0x42ed49[_0x31d470(0x814)],'damageFlat':_0x42ed49[_0x31d470(0x320)],'hitRate':_0x42ed49[_0x31d470(0x837)],'hitFlat':_0x42ed49[_0x31d470(0x563)]};_0x228d69[_0x31d470(0x4b3)]=_0x28032e;}),PluginManager['registerCommand'](pluginData[_0x19a075(0x880)],_0x19a075(0x733),_0x4aa05d=>{const _0x581c6b=_0x19a075;if(!SceneManager[_0x581c6b(0x553)]())return;VisuMZ[_0x581c6b(0x5e4)](_0x4aa05d,_0x4aa05d);const _0x3f4a7d=['MAXHP',_0x581c6b(0x5de),_0x581c6b(0x19c),_0x581c6b(0x248),_0x581c6b(0x3fe),_0x581c6b(0x7f5),_0x581c6b(0x640),'LUK'],_0x276a3b=_0x4aa05d['Buffs'],_0xb320ac=_0x4aa05d[_0x581c6b(0x276)],_0x4bd2e1=VisuMZ[_0x581c6b(0x7bc)](_0x4aa05d[_0x581c6b(0x6f7)]);for(const _0xcef08f of _0x4bd2e1){if(!_0xcef08f)continue;for(const _0xb398db of _0x276a3b){const _0x51ef73=_0x3f4a7d[_0x581c6b(0x93c)](_0xb398db[_0x581c6b(0x171)]()['trim']());_0x51ef73>=0x0&&_0x51ef73<=0x7&&_0xcef08f[_0x581c6b(0x51c)](_0x51ef73)&&_0xcef08f[_0x581c6b(0x34e)](_0x51ef73);}for(const _0x457b0c of _0xb320ac){const _0x5c1b61=_0x3f4a7d['indexOf'](_0x457b0c[_0x581c6b(0x171)]()[_0x581c6b(0x431)]());_0x5c1b61>=0x0&&_0x5c1b61<=0x7&&_0xcef08f['isDebuffAffected'](_0x5c1b61)&&_0xcef08f['removeBuff'](_0x5c1b61);}}}),PluginManager['registerCommand'](pluginData[_0x19a075(0x880)],_0x19a075(0x24c),_0x233849=>{const _0x45e3ed=_0x19a075;if(!SceneManager[_0x45e3ed(0x553)]())return;VisuMZ[_0x45e3ed(0x5e4)](_0x233849,_0x233849);const _0x4b8712=_0x233849['States'],_0x17a2bb=VisuMZ[_0x45e3ed(0x7bc)](_0x233849['Targets']);for(const _0x385df4 of _0x17a2bb){if(!_0x385df4)continue;for(const _0xd76294 of _0x4b8712){_0x385df4[_0x45e3ed(0x54b)](_0xd76294);}}}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x39f),_0x584a52=>{const _0x13da5e=_0x19a075;if(!SceneManager[_0x13da5e(0x553)]())return;if(!Imported[_0x13da5e(0x901)])return;VisuMZ[_0x13da5e(0x5e4)](_0x584a52,_0x584a52);const _0xc52f49=_0x584a52[_0x13da5e(0x1e1)],_0x5d9b8c=VisuMZ['CreateActionSequenceTargets'](_0x584a52[_0x13da5e(0x6f7)]),_0x42347a=_0x584a52['ForceExploited'],_0x6d74ba=_0x584a52[_0x13da5e(0x26c)],_0x5564a2=_0x584a52[_0x13da5e(0x5b7)],_0x123c9e=BattleManager['_action'];if(_0xc52f49)for(const _0x30388e of _0x5d9b8c){if(!_0x30388e)continue;if(_0x30388e===user)continue;if(_0x42347a)_0x30388e['setSTBExploited'](![]);_0x30388e[_0x13da5e(0x375)](BattleManager[_0x13da5e(0x886)],_0x123c9e);}if(_0x6d74ba&&BattleManager[_0x13da5e(0x886)]){if(_0x5564a2)BattleManager[_0x13da5e(0x886)][_0x13da5e(0x191)](![]);const _0x5ab33c=_0x5d9b8c[0x0];BattleManager[_0x13da5e(0x825)](_0x5ab33c,_0x123c9e);}}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x861),_0x374028=>{const _0x4b8a2e=_0x19a075;if(!SceneManager[_0x4b8a2e(0x553)]())return;if(!Imported[_0x4b8a2e(0x901)])return;VisuMZ[_0x4b8a2e(0x5e4)](_0x374028,_0x374028);const _0x6c1e12=_0x374028[_0x4b8a2e(0x61c)];BattleManager[_0x4b8a2e(0x886)]&&BattleManager[_0x4b8a2e(0x886)][_0x4b8a2e(0x85b)](_0x6c1e12);}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x237),_0x2fcabc=>{const _0x115ec7=_0x19a075;if(!SceneManager[_0x115ec7(0x553)]())return;if(!Imported[_0x115ec7(0x901)])return;VisuMZ[_0x115ec7(0x5e4)](_0x2fcabc,_0x2fcabc);let _0xa7051f=_0x2fcabc[_0x115ec7(0x61c)];if(BattleManager[_0x115ec7(0x886)]){BattleManager[_0x115ec7(0x886)][_0x115ec7(0x1e6)]=BattleManager[_0x115ec7(0x886)]['_actions']||[];while(_0xa7051f--){if(BattleManager['_subject'][_0x115ec7(0x1e6)][_0x115ec7(0x644)]<=0x0)break;BattleManager['_subject']['_actions'][_0x115ec7(0x2ee)]();}}}),PluginManager[_0x19a075(0x4de)](pluginData['name'],_0x19a075(0x951),_0xacc9c9=>{const _0x3a66df=_0x19a075;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x3a66df(0x304)])return;VisuMZ[_0x3a66df(0x5e4)](_0xacc9c9,_0xacc9c9);const _0x22b058=VisuMZ[_0x3a66df(0x7bc)](_0xacc9c9['Targets']),_0x540944=_0xacc9c9['WeaponTypeID'];for(const _0xeee439 of _0x22b058){if(!_0xeee439)continue;if(!_0xeee439[_0x3a66df(0x34c)]())continue;_0xeee439['switchToWeaponType'](_0x540944);}}),PluginManager[_0x19a075(0x4de)](pluginData['name'],_0x19a075(0x494),_0x4bb03a=>{const _0x22bee1=_0x19a075;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x22bee1(0x5e4)](_0x4bb03a,_0x4bb03a);const _0x224806=VisuMZ[_0x22bee1(0x7bc)](_0x4bb03a[_0x22bee1(0x6f7)]),_0x38d7cd=_0x4bb03a[_0x22bee1(0x1e3)],_0x190f7c={'textColor':ColorManager[_0x22bee1(0x642)](_0x4bb03a[_0x22bee1(0x4ee)]),'flashColor':_0x4bb03a[_0x22bee1(0x2b7)],'flashDuration':_0x4bb03a[_0x22bee1(0x50a)]};for(const _0x607f65 of _0x224806){if(!_0x607f65)continue;_0x607f65[_0x22bee1(0x867)](_0x38d7cd,_0x190f7c);}}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x424),_0x4aed21=>{const _0x27f84d=_0x19a075;if(!SceneManager[_0x27f84d(0x553)]())return;VisuMZ['ConvertParams'](_0x4aed21,_0x4aed21);const _0x552a0e=VisuMZ[_0x27f84d(0x7bc)](_0x4aed21[_0x27f84d(0x6f7)]);let _0x1c90a8=$gameVariables[_0x27f84d(0x4ec)](_0x4aed21[_0x27f84d(0x4bd)]);Imported[_0x27f84d(0x7b7)]&&_0x4aed21[_0x27f84d(0x33a)]&&(_0x1c90a8=VisuMZ[_0x27f84d(0x292)](_0x1c90a8));const _0x229617=String(_0x1c90a8),_0xb2506f={'textColor':ColorManager[_0x27f84d(0x642)](_0x4aed21[_0x27f84d(0x4ee)]),'flashColor':_0x4aed21[_0x27f84d(0x2b7)],'flashDuration':_0x4aed21['FlashDuration']};for(const _0x3f564f of _0x552a0e){if(!_0x3f564f)continue;_0x3f564f[_0x27f84d(0x867)](_0x229617,_0xb2506f);}}),PluginManager['registerCommand'](pluginData['name'],_0x19a075(0x8d3),_0x273d5a=>{const _0x539354=_0x19a075;if(!SceneManager['isSceneBattle']())return;const _0x4e0b58=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x4e0b58)return;_0x4e0b58[_0x539354(0x938)](_0x539354(0x748));}),PluginManager['registerCommand'](pluginData['name'],_0x19a075(0x6b3),_0x5a4d42=>{const _0x33c7a2=_0x19a075;if(!SceneManager[_0x33c7a2(0x553)]())return;VisuMZ[_0x33c7a2(0x5e4)](_0x5a4d42,_0x5a4d42);const _0xea35e7=VisuMZ[_0x33c7a2(0x7bc)](_0x5a4d42[_0x33c7a2(0x6f7)]);for(const _0x44a473 of _0xea35e7){if(!_0x44a473)continue;_0x44a473[_0x33c7a2(0x7e5)]();}}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],'ActSeq_Motion_FreezeMotionFrame',_0x39c392=>{const _0x41055b=_0x19a075;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x41055b(0x5e4)](_0x39c392,_0x39c392);const _0x317279=VisuMZ[_0x41055b(0x7bc)](_0x39c392[_0x41055b(0x6f7)]),_0x59c0aa=_0x39c392[_0x41055b(0x672)][_0x41055b(0x4d9)]()[_0x41055b(0x431)](),_0x49742a=_0x39c392[_0x41055b(0x628)],_0x569270=_0x39c392['Frame'];for(const _0x342b89 of _0x317279){if(!_0x342b89)continue;_0x342b89[_0x41055b(0x8fc)](_0x59c0aa,_0x49742a,_0x569270);}}),PluginManager[_0x19a075(0x4de)](pluginData['name'],_0x19a075(0x3ee),_0x36de8f=>{const _0x3f56a1=_0x19a075;if(!SceneManager[_0x3f56a1(0x553)]())return;VisuMZ[_0x3f56a1(0x5e4)](_0x36de8f,_0x36de8f);const _0x17947a=VisuMZ[_0x3f56a1(0x7bc)](_0x36de8f[_0x3f56a1(0x6f7)]),_0x457db9=_0x36de8f[_0x3f56a1(0x672)][_0x3f56a1(0x4d9)]()[_0x3f56a1(0x431)](),_0x42b5df=_0x36de8f[_0x3f56a1(0x628)];for(const _0x25f2c7 of _0x17947a){if(!_0x25f2c7)continue;if(_0x457db9[_0x3f56a1(0x6c8)](/ATTACK[ ](\d+)/i))_0x25f2c7[_0x3f56a1(0x25a)](Number(RegExp['$1']));else _0x457db9==='attack'?_0x25f2c7[_0x3f56a1(0x86b)]():_0x25f2c7[_0x3f56a1(0x68d)](_0x457db9);if(!_0x42b5df)_0x25f2c7[_0x3f56a1(0x810)](0x0);else{if(_0x42b5df&&[_0x3f56a1(0x917),_0x3f56a1(0x587),_0x3f56a1(0x4a8)][_0x3f56a1(0x5d5)](_0x457db9)){}}}}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_Motion_PerformAction',_0x27afad=>{const _0x7c692c=_0x19a075;if(!SceneManager[_0x7c692c(0x553)]())return;VisuMZ['ConvertParams'](_0x27afad,_0x27afad);const _0x6221c6=BattleManager['_action'];if(!_0x6221c6)return;if(!_0x6221c6[_0x7c692c(0x7ac)]())return;const _0x2f132c=VisuMZ[_0x7c692c(0x7bc)](_0x27afad['Targets']);for(const _0x385986 of _0x2f132c){if(!_0x385986)continue;_0x385986['performAction'](_0x6221c6);}}),PluginManager['registerCommand'](pluginData['name'],_0x19a075(0x506),_0x565faf=>{const _0x4d760e=_0x19a075;if(!SceneManager[_0x4d760e(0x553)]())return;VisuMZ[_0x4d760e(0x5e4)](_0x565faf,_0x565faf);const _0x4610bd=VisuMZ['CreateActionSequenceTargets'](_0x565faf[_0x4d760e(0x6f7)]);for(const _0x2702c3 of _0x4610bd){if(!_0x2702c3)continue;if(!_0x2702c3['battler']())continue;_0x2702c3['battler']()[_0x4d760e(0x6a0)]();}}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x6e1),_0x2e2d39=>{const _0x23e580=_0x19a075;if(!SceneManager[_0x23e580(0x553)]())return;VisuMZ[_0x23e580(0x5e4)](_0x2e2d39,_0x2e2d39);const _0x30acaa=$gameTemp[_0x23e580(0x806)](),_0x45e728=_0x2e2d39[_0x23e580(0x589)]*Sprite_Battler[_0x23e580(0x7f7)];_0x30acaa[_0x23e580(0x6a7)](_0x45e728);}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x566),_0x3c2db3=>{const _0x3b802b=_0x19a075;if(!SceneManager[_0x3b802b(0x553)]())return;VisuMZ[_0x3b802b(0x5e4)](_0x3c2db3,_0x3c2db3);const _0x13893a=$gameTemp[_0x3b802b(0x806)](),_0xb20e74=BattleManager[_0x3b802b(0x1f4)];if(!_0x13893a||!_0xb20e74)return;if(!_0xb20e74['item']())return;const _0x114e16=VisuMZ[_0x3b802b(0x7bc)](_0x3c2db3[_0x3b802b(0x6f7)]);for(const _0x21ccc3 of _0x114e16){if(!_0x21ccc3)continue;_0x21ccc3['performActionStart'](_0xb20e74);}if(_0x3c2db3['WaitForMovement'])_0x13893a[_0x3b802b(0x938)](_0x3b802b(0x5a6));}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x2c5),_0x186b52=>{const _0x1b7028=_0x19a075;if(!SceneManager['isSceneBattle']())return;if(!$gameSystem[_0x1b7028(0x50c)]())return;VisuMZ[_0x1b7028(0x5e4)](_0x186b52,_0x186b52);const _0xc91ed0=VisuMZ[_0x1b7028(0x7bc)](_0x186b52[_0x1b7028(0x6f7)]);let _0x236acf=_0x186b52['Direction']['match'](/back/i);for(const _0x5a9c8d of _0xc91ed0){if(!_0x5a9c8d)continue;if(_0x186b52[_0x1b7028(0x25b)]['match'](/rand/i))_0x236acf=Math['randomInt'](0x2);_0x5a9c8d['setBattlerFlip'](!!_0x236acf);}}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x5d7),_0x4c69ff=>{const _0x492b87=_0x19a075;if(!SceneManager[_0x492b87(0x553)]())return;if(!$gameSystem[_0x492b87(0x50c)]())return;VisuMZ[_0x492b87(0x5e4)](_0x4c69ff,_0x4c69ff);const _0x224062=VisuMZ[_0x492b87(0x7bc)](_0x4c69ff[_0x492b87(0x6f7)]);let _0x102126=_0x4c69ff[_0x492b87(0x6c5)];const _0x45f3a4=_0x4c69ff[_0x492b87(0x6b1)];for(const _0x2ea511 of _0x224062){if(!_0x2ea511)continue;let _0x255005=_0x2ea511[_0x492b87(0x612)]()[_0x492b87(0x5dc)],_0x533b9e=_0x2ea511[_0x492b87(0x612)]()[_0x492b87(0x6b6)];if(_0x102126[_0x492b87(0x6c8)](/home/i))_0x255005=_0x2ea511['battler']()[_0x492b87(0x744)],_0x533b9e=_0x2ea511[_0x492b87(0x612)]()[_0x492b87(0x90a)];else{if(_0x102126[_0x492b87(0x6c8)](/center/i))_0x255005=Graphics['boxWidth']/0x2,_0x533b9e=Graphics['boxHeight']/0x2;else _0x102126['match'](/point (\d+), (\d+)/i)&&(_0x255005=Number(RegExp['$1']),_0x533b9e=Number(RegExp['$2']));}_0x2ea511['setBattlerFacePoint'](Math[_0x492b87(0x48a)](_0x255005),Math[_0x492b87(0x48a)](_0x533b9e),!!_0x45f3a4);}}),PluginManager[_0x19a075(0x4de)](pluginData['name'],'ActSeq_Movement_FaceTarget',_0x27ed0e=>{const _0x1c3422=_0x19a075;if(!SceneManager['isSceneBattle']())return;if(!$gameSystem[_0x1c3422(0x50c)]())return;VisuMZ[_0x1c3422(0x5e4)](_0x27ed0e,_0x27ed0e);const _0x3bb0f0=VisuMZ[_0x1c3422(0x7bc)](_0x27ed0e['Targets1']),_0x2bb4a1=VisuMZ[_0x1c3422(0x7bc)](_0x27ed0e['Targets2']),_0x2c3cd0=_0x2bb4a1['map'](_0x4db01a=>_0x4db01a&&_0x4db01a[_0x1c3422(0x612)]()?_0x4db01a[_0x1c3422(0x612)]()[_0x1c3422(0x5dc)]:0x0)/(_0x2bb4a1['length']||0x1),_0x52ea29=_0x2bb4a1['map'](_0x363985=>_0x363985&&_0x363985[_0x1c3422(0x612)]()?_0x363985[_0x1c3422(0x612)]()[_0x1c3422(0x6b6)]:0x0)/(_0x2bb4a1[_0x1c3422(0x644)]||0x1),_0x4f56ca=_0x27ed0e['FaceAway'];for(const _0x3b0e07 of _0x3bb0f0){if(!_0x3b0e07)continue;_0x3b0e07[_0x1c3422(0x697)](Math[_0x1c3422(0x48a)](_0x2c3cd0),Math[_0x1c3422(0x48a)](_0x52ea29),!!_0x4f56ca);}}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x6df),_0x38afae=>{const _0x28f4ff=_0x19a075;if(!SceneManager[_0x28f4ff(0x553)]())return;VisuMZ['ConvertParams'](_0x38afae,_0x38afae);const _0x1dee6e=$gameTemp['getLastPluginCommandInterpreter'](),_0x148d97=VisuMZ[_0x28f4ff(0x7bc)](_0x38afae['Targets']),_0x31ed6d=_0x38afae[_0x28f4ff(0x227)],_0x549823=_0x38afae[_0x28f4ff(0x59c)],_0x3715e8=_0x38afae[_0x28f4ff(0x6bb)],_0x292fd0=_0x38afae[_0x28f4ff(0x84f)];if(!_0x1dee6e)return;for(const _0x4bad63 of _0x148d97){if(!_0x4bad63)continue;_0x4bad63['floatBattler'](_0x31ed6d,_0x549823,_0x3715e8);}if(_0x292fd0)_0x1dee6e[_0x28f4ff(0x938)](_0x28f4ff(0x221));}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x352),_0x475eaa=>{const _0xf81363=_0x19a075;if(!SceneManager[_0xf81363(0x553)]())return;VisuMZ['ConvertParams'](_0x475eaa,_0x475eaa);const _0x3a2b40=$gameTemp[_0xf81363(0x806)]();if(!_0x3a2b40)return;const _0x555f81=VisuMZ['CreateActionSequenceTargets'](_0x475eaa[_0xf81363(0x6f7)]);for(const _0x36eb81 of _0x555f81){if(!_0x36eb81)continue;_0x36eb81['performActionEnd'](),_0x36eb81[_0xf81363(0x3f2)]();}if(_0x475eaa[_0xf81363(0x1b8)])_0x3a2b40[_0xf81363(0x938)](_0xf81363(0x5a6));}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x86a),_0x1541ee=>{const _0x3919ab=_0x19a075;if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x1541ee,_0x1541ee);const _0x2a80dc=$gameTemp[_0x3919ab(0x806)](),_0x33c973=VisuMZ['CreateActionSequenceTargets'](_0x1541ee[_0x3919ab(0x6f7)]),_0x3f3c5c=_0x1541ee[_0x3919ab(0x227)],_0x25936d=_0x1541ee['Duration'],_0x21ae83=_0x1541ee[_0x3919ab(0x866)];if(!_0x2a80dc)return;for(const _0x49cf3f of _0x33c973){if(!_0x49cf3f)continue;_0x49cf3f[_0x3919ab(0x86c)](_0x3f3c5c,_0x25936d);}if(_0x21ae83)_0x2a80dc[_0x3919ab(0x938)](_0x3919ab(0x59b));}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],'ActSeq_Movement_MoveBy',_0x13d749=>{const _0x3aed18=_0x19a075;if(!SceneManager[_0x3aed18(0x553)]())return;if(!$gameSystem[_0x3aed18(0x50c)]())return;VisuMZ[_0x3aed18(0x5e4)](_0x13d749,_0x13d749);const _0x4846d3=$gameTemp[_0x3aed18(0x806)](),_0x44422b=VisuMZ[_0x3aed18(0x7bc)](_0x13d749['Targets']),_0x26eb17=_0x13d749['DistanceAdjust'],_0x436a4f=_0x13d749[_0x3aed18(0x414)],_0x23cf68=_0x13d749[_0x3aed18(0x2a6)],_0x4fda47=_0x13d749['Duration'],_0x1693db=_0x13d749[_0x3aed18(0x8cd)],_0x418331=_0x13d749[_0x3aed18(0x6bb)],_0x383f06=_0x13d749['MotionType'],_0x33830e=_0x13d749[_0x3aed18(0x1b8)];if(!_0x4846d3)return;for(const _0x1dec45 of _0x44422b){if(!_0x1dec45)continue;let _0x276ea1=_0x436a4f,_0x281676=_0x23cf68;if(_0x26eb17['match'](/horz/i))_0x276ea1*=_0x1dec45[_0x3aed18(0x34c)]()?-0x1:0x1;if(_0x26eb17[_0x3aed18(0x6c8)](/vert/i))_0x281676*=_0x1dec45[_0x3aed18(0x34c)]()?-0x1:0x1;_0x1dec45[_0x3aed18(0x65a)](_0x276ea1,_0x281676,_0x4fda47,_0x1693db,_0x418331),_0x1dec45[_0x3aed18(0x68d)](_0x383f06);}if(_0x33830e)_0x4846d3[_0x3aed18(0x938)](_0x3aed18(0x5a6));}),PluginManager[_0x19a075(0x4de)](pluginData['name'],_0x19a075(0x8b7),_0x4efb71=>{const _0x56f54c=_0x19a075;if(!SceneManager[_0x56f54c(0x553)]())return;if(!$gameSystem[_0x56f54c(0x50c)]())return;VisuMZ[_0x56f54c(0x5e4)](_0x4efb71,_0x4efb71);const _0x57aae5=$gameTemp[_0x56f54c(0x806)](),_0x327dff=VisuMZ[_0x56f54c(0x7bc)](_0x4efb71[_0x56f54c(0x6f7)]),_0x26a441=_0x4efb71[_0x56f54c(0x45d)],_0x41b28e=_0x4efb71[_0x56f54c(0x1d5)],_0x47c5ee=_0x4efb71[_0x56f54c(0x3d0)],_0x45a9bd=_0x4efb71['OffsetY'],_0x2264ad=_0x4efb71[_0x56f54c(0x59c)],_0x4459d1=_0x4efb71[_0x56f54c(0x8cd)],_0x37c046=_0x4efb71[_0x56f54c(0x6bb)],_0x5035b4=_0x4efb71[_0x56f54c(0x672)],_0x499719=_0x4efb71['WaitForMovement'];if(!_0x57aae5)return;for(const _0x5598fa of _0x327dff){if(!_0x5598fa)continue;let _0x54586b=_0x5598fa[_0x56f54c(0x612)]()[_0x56f54c(0x5dc)],_0x2317f7=_0x5598fa['battler']()[_0x56f54c(0x6b6)];if(_0x26a441[_0x56f54c(0x6c8)](/home/i))_0x54586b=_0x5598fa['battler']()[_0x56f54c(0x744)],_0x2317f7=_0x5598fa[_0x56f54c(0x612)]()[_0x56f54c(0x90a)];else{if(_0x26a441[_0x56f54c(0x6c8)](/center/i))_0x54586b=Graphics[_0x56f54c(0x256)]/0x2,_0x2317f7=Graphics[_0x56f54c(0x18f)]/0x2;else _0x26a441[_0x56f54c(0x6c8)](/point (\d+), (\d+)/i)&&(_0x54586b=Number(RegExp['$1']),_0x2317f7=Number(RegExp['$2']));}if(_0x41b28e[_0x56f54c(0x6c8)](/none/i))_0x54586b+=_0x47c5ee,_0x2317f7+=_0x45a9bd;else{if(_0x41b28e[_0x56f54c(0x6c8)](/horz/i)&&_0x41b28e['match'](/vert/i))_0x54586b+=_0x5598fa[_0x56f54c(0x34c)]()?-_0x47c5ee:_0x47c5ee,_0x2317f7+=_0x5598fa[_0x56f54c(0x34c)]()?-_0x45a9bd:_0x45a9bd;else{if(_0x41b28e[_0x56f54c(0x6c8)](/horz/i))_0x54586b+=_0x5598fa[_0x56f54c(0x34c)]()?-_0x47c5ee:_0x47c5ee,_0x2317f7+=_0x45a9bd;else _0x41b28e[_0x56f54c(0x6c8)](/vert/i)&&(_0x54586b+=_0x47c5ee,_0x2317f7+=_0x5598fa[_0x56f54c(0x34c)]()?-_0x45a9bd:_0x45a9bd);}}_0x5598fa[_0x56f54c(0x81a)](_0x54586b,_0x2317f7,_0x2264ad,_0x4459d1,_0x37c046,-0x1),_0x5598fa[_0x56f54c(0x68d)](_0x5035b4);}if(_0x499719)_0x57aae5['setWaitMode']('battleMove');}),PluginManager['registerCommand'](pluginData[_0x19a075(0x880)],'ActSeq_Movement_MoveToTarget',_0x5dc625=>{const _0x3ffe64=_0x19a075;if(!SceneManager['isSceneBattle']())return;if(!$gameSystem[_0x3ffe64(0x50c)]())return;VisuMZ[_0x3ffe64(0x5e4)](_0x5dc625,_0x5dc625);const _0x316306=$gameTemp[_0x3ffe64(0x806)](),_0x4f192a=VisuMZ['CreateActionSequenceTargets'](_0x5dc625[_0x3ffe64(0x94c)]),_0x11d461=VisuMZ[_0x3ffe64(0x7bc)](_0x5dc625[_0x3ffe64(0x8ec)]),_0x41ad18=_0x5dc625['TargetLocation'];let _0x465e07=_0x5dc625[_0x3ffe64(0x663)];const _0xe371ae=_0x5dc625[_0x3ffe64(0x1d5)],_0x1c3f33=_0x5dc625[_0x3ffe64(0x3d0)],_0x2fc933=_0x5dc625['OffsetY'],_0x2e8df4=_0x5dc625[_0x3ffe64(0x59c)],_0x16dbf7=_0x5dc625[_0x3ffe64(0x8cd)],_0x37175f=_0x5dc625[_0x3ffe64(0x6bb)],_0x5c3655=_0x5dc625[_0x3ffe64(0x672)],_0x1b514f=_0x5dc625[_0x3ffe64(0x1b8)],_0x27ad1b=Math[_0x3ffe64(0x5cc)](..._0x11d461['map'](_0x237a23=>_0x237a23['battler']()[_0x3ffe64(0x5dc)]-_0x237a23['battler']()['mainSpriteWidth']()/0x2)),_0x161fa1=Math[_0x3ffe64(0x6aa)](..._0x11d461[_0x3ffe64(0x4be)](_0x199840=>_0x199840['battler']()[_0x3ffe64(0x5dc)]+_0x199840[_0x3ffe64(0x612)]()['mainSpriteWidth']()/0x2)),_0x243430=Math[_0x3ffe64(0x5cc)](..._0x11d461[_0x3ffe64(0x4be)](_0x51beec=>_0x51beec[_0x3ffe64(0x612)]()['_baseY']-_0x51beec['battler']()[_0x3ffe64(0x38e)]())),_0x36bc1c=Math[_0x3ffe64(0x6aa)](..._0x11d461['map'](_0x499a0d=>_0x499a0d[_0x3ffe64(0x612)]()[_0x3ffe64(0x6b6)])),_0x165baf=_0x11d461[_0x3ffe64(0x53d)](_0x368667=>_0x368667[_0x3ffe64(0x34c)]())['length'],_0x431679=_0x11d461[_0x3ffe64(0x53d)](_0x57c36e=>_0x57c36e[_0x3ffe64(0x5a3)]())[_0x3ffe64(0x644)];let _0x1d5ed1=0x0,_0x3296dc=0x0;if(_0x41ad18[_0x3ffe64(0x6c8)](/front/i))_0x1d5ed1=_0x165baf>=_0x431679?_0x27ad1b:_0x161fa1;else{if(_0x41ad18[_0x3ffe64(0x6c8)](/middle/i))_0x1d5ed1=(_0x27ad1b+_0x161fa1)/0x2,_0x465e07=-0x1;else _0x41ad18['match'](/back/i)&&(_0x1d5ed1=_0x165baf>=_0x431679?_0x161fa1:_0x27ad1b);}if(_0x41ad18[_0x3ffe64(0x6c8)](/head/i))_0x3296dc=_0x243430;else{if(_0x41ad18[_0x3ffe64(0x6c8)](/center/i))_0x3296dc=(_0x243430+_0x36bc1c)/0x2;else _0x41ad18[_0x3ffe64(0x6c8)](/base/i)&&(_0x3296dc=_0x36bc1c);}if(!_0x316306)return;for(const _0x1af714 of _0x4f192a){if(!_0x1af714)continue;let _0x361b5b=_0x1d5ed1,_0x5ed397=_0x3296dc;if(_0xe371ae[_0x3ffe64(0x6c8)](/none/i))_0x361b5b+=_0x1c3f33,_0x5ed397+=_0x2fc933;else{if(_0xe371ae[_0x3ffe64(0x6c8)](/horz/i)&&_0xe371ae[_0x3ffe64(0x6c8)](/vert/i))_0x361b5b+=_0x1af714[_0x3ffe64(0x34c)]()?-_0x1c3f33:_0x1c3f33,_0x5ed397+=_0x1af714[_0x3ffe64(0x34c)]()?-_0x2fc933:_0x2fc933;else{if(_0xe371ae[_0x3ffe64(0x6c8)](/horz/i))_0x361b5b+=_0x1af714[_0x3ffe64(0x34c)]()?-_0x1c3f33:_0x1c3f33,_0x5ed397+=_0x2fc933;else _0xe371ae[_0x3ffe64(0x6c8)](/vert/i)&&(_0x361b5b+=_0x1c3f33,_0x5ed397+=_0x1af714[_0x3ffe64(0x34c)]()?-_0x2fc933:_0x2fc933);}}_0x1af714[_0x3ffe64(0x81a)](_0x361b5b,_0x5ed397,_0x2e8df4,_0x16dbf7,_0x37175f,_0x465e07),_0x1af714[_0x3ffe64(0x68d)](_0x5c3655);}if(_0x1b514f)_0x316306[_0x3ffe64(0x938)]('battleMove');}),PluginManager[_0x19a075(0x4de)](pluginData['name'],_0x19a075(0x6d7),_0xfb6f4d=>{const _0x192d5f=_0x19a075;if(!SceneManager[_0x192d5f(0x553)]())return;VisuMZ['ConvertParams'](_0xfb6f4d,_0xfb6f4d);const _0x405346=$gameTemp[_0x192d5f(0x806)](),_0x27d923=VisuMZ[_0x192d5f(0x7bc)](_0xfb6f4d[_0x192d5f(0x6f7)]),_0x179b33=_0xfb6f4d[_0x192d5f(0x616)],_0x3f8934=_0xfb6f4d['Duration'],_0x59d6d0=_0xfb6f4d[_0x192d5f(0x6bb)],_0x1404a2=_0xfb6f4d[_0x192d5f(0x7c2)];if(!_0x405346)return;for(const _0x4bc05c of _0x27d923){if(!_0x4bc05c)continue;_0x4bc05c[_0x192d5f(0x515)](_0x179b33,_0x3f8934,_0x59d6d0);}if(_0x1404a2)_0x405346[_0x192d5f(0x938)](_0x192d5f(0x913));}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x569),_0x153034=>{const _0x3fbf51=_0x19a075;if(!SceneManager[_0x3fbf51(0x553)]())return;VisuMZ[_0x3fbf51(0x5e4)](_0x153034,_0x153034);const _0x398da3=$gameTemp[_0x3fbf51(0x806)](),_0xabc726=VisuMZ[_0x3fbf51(0x7bc)](_0x153034[_0x3fbf51(0x6f7)]),_0x54fee3=_0x153034[_0x3fbf51(0x1b4)],_0x6839b6=_0x153034[_0x3fbf51(0x632)],_0x39b10c=_0x153034[_0x3fbf51(0x59c)],_0x5596b3=_0x153034[_0x3fbf51(0x6bb)],_0x209116=_0x153034['WaitForScale'];if(!_0x398da3)return;for(const _0x1862ea of _0xabc726){if(!_0x1862ea)continue;_0x1862ea[_0x3fbf51(0x738)](_0x54fee3,_0x6839b6,_0x39b10c,_0x5596b3);}if(_0x209116)_0x398da3[_0x3fbf51(0x938)](_0x3fbf51(0x7e4));}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],'ActSeq_Movement_Skew',_0x55c69a=>{const _0x2b94f1=_0x19a075;if(!SceneManager[_0x2b94f1(0x553)]())return;VisuMZ[_0x2b94f1(0x5e4)](_0x55c69a,_0x55c69a);const _0x89aca2=$gameTemp['getLastPluginCommandInterpreter'](),_0x11c669=VisuMZ[_0x2b94f1(0x7bc)](_0x55c69a[_0x2b94f1(0x6f7)]),_0xefef75=_0x55c69a['SkewX'],_0x38e48c=_0x55c69a[_0x2b94f1(0x1b9)],_0x226c8e=_0x55c69a[_0x2b94f1(0x59c)],_0x1a8b73=_0x55c69a[_0x2b94f1(0x6bb)],_0xead11a=_0x55c69a[_0x2b94f1(0x636)];if(!_0x89aca2)return;for(const _0x4567f0 of _0x11c669){if(!_0x4567f0)continue;_0x4567f0['skewBattler'](_0xefef75,_0x38e48c,_0x226c8e,_0x1a8b73);}if(_0xead11a)_0x89aca2[_0x2b94f1(0x938)](_0x2b94f1(0x2e1));}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x921),_0x2ff1c5=>{const _0x2dd514=_0x19a075;if(!SceneManager[_0x2dd514(0x553)]())return;VisuMZ[_0x2dd514(0x5e4)](_0x2ff1c5,_0x2ff1c5);const _0x114ad2=$gameTemp[_0x2dd514(0x806)](),_0x1d7af8=VisuMZ[_0x2dd514(0x7bc)](_0x2ff1c5[_0x2dd514(0x6f7)]),_0x4070b8=_0x2ff1c5[_0x2dd514(0x4a6)],_0x5d8b07=_0x2ff1c5['Duration'],_0xf437e8=_0x2ff1c5[_0x2dd514(0x6bb)],_0x2e9521=_0x2ff1c5[_0x2dd514(0x6d3)],_0x22bb0c=_0x2ff1c5[_0x2dd514(0x6e9)];if(!_0x114ad2)return;for(const _0x3080ce of _0x1d7af8){if(!_0x3080ce)continue;_0x3080ce[_0x2dd514(0x823)](_0x4070b8,_0x5d8b07,_0xf437e8,_0x2e9521);}if(_0x22bb0c)_0x114ad2[_0x2dd514(0x938)](_0x2dd514(0x75a));}),PluginManager[_0x19a075(0x4de)](pluginData['name'],_0x19a075(0x608),_0x35f846=>{const _0x31c610=_0x19a075;if(!SceneManager['isSceneBattle']())return;const _0x9fbafd=$gameTemp[_0x31c610(0x806)]();if(!_0x9fbafd)return;_0x9fbafd[_0x31c610(0x938)](_0x31c610(0x221));}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x61d),_0x19cd6b=>{const _0x17c5f8=_0x19a075;if(!SceneManager[_0x17c5f8(0x553)]())return;const _0x4150b6=$gameTemp[_0x17c5f8(0x806)]();if(!_0x4150b6)return;_0x4150b6['setWaitMode'](_0x17c5f8(0x59b));}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x2e2),_0x565962=>{const _0x5bb9db=_0x19a075;if(!SceneManager[_0x5bb9db(0x553)]())return;const _0x59eb3a=$gameTemp[_0x5bb9db(0x806)]();if(!_0x59eb3a)return;_0x59eb3a[_0x5bb9db(0x938)](_0x5bb9db(0x5a6));}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x5f4),_0x4aba17=>{const _0x516216=_0x19a075;if(!SceneManager[_0x516216(0x553)]())return;const _0x4ce880=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x4ce880)return;_0x4ce880[_0x516216(0x938)](_0x516216(0x913));}),PluginManager[_0x19a075(0x4de)](pluginData['name'],_0x19a075(0x4f8),_0x4a70cd=>{const _0x4d1833=_0x19a075;if(!SceneManager['isSceneBattle']())return;const _0xffe3bc=$gameTemp[_0x4d1833(0x806)]();if(!_0xffe3bc)return;_0xffe3bc['setWaitMode']('battleGrow');}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x57f),_0x81cf52=>{const _0x1d7a99=_0x19a075;if(!SceneManager['isSceneBattle']())return;const _0x388a47=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x388a47)return;_0x388a47[_0x1d7a99(0x938)](_0x1d7a99(0x2e1));}),PluginManager['registerCommand'](pluginData[_0x19a075(0x880)],_0x19a075(0x22a),_0x2f3734=>{const _0x5a9168=_0x19a075;if(!SceneManager[_0x5a9168(0x553)]())return;const _0x5d6534=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x5d6534)return;_0x5d6534[_0x5a9168(0x938)](_0x5a9168(0x75a));}),PluginManager[_0x19a075(0x4de)](pluginData['name'],_0x19a075(0x662),_0x5ea091=>{const _0x376f44=_0x19a075;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x376f44(0x3cb)])return;VisuMZ[_0x376f44(0x5e4)](_0x5ea091,_0x5ea091);const _0x2c4bc9=$gameTemp[_0x376f44(0x806)](),_0x583ac9=_0x5ea091[_0x376f44(0x809)];if(!_0x2c4bc9)return;const _0x1e0112=BattleManager[_0x376f44(0x525)];if(!_0x1e0112)return;_0x1e0112[_0x376f44(0x565)](_0x5ea091);if(_0x583ac9)_0x2c4bc9[_0x376f44(0x938)]('battleProjectiles');}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],'ActSeq_Projectile_Icon',_0x1cd1aa=>{const _0x49cbe9=_0x19a075;if(!SceneManager[_0x49cbe9(0x553)]())return;if(!Imported[_0x49cbe9(0x3cb)])return;VisuMZ[_0x49cbe9(0x5e4)](_0x1cd1aa,_0x1cd1aa);const _0x451428=$gameTemp[_0x49cbe9(0x806)](),_0x3a0b09=_0x1cd1aa['WaitForProjectile'];if(!_0x451428)return;const _0x38d775=BattleManager['_spriteset'];if(!_0x38d775)return;_0x38d775[_0x49cbe9(0x565)](_0x1cd1aa);if(_0x3a0b09)_0x451428[_0x49cbe9(0x938)]('battleProjectiles');}),PluginManager[_0x19a075(0x4de)](pluginData['name'],_0x19a075(0x4ef),_0x210a63=>{const _0x3331d2=_0x19a075;if(!SceneManager[_0x3331d2(0x553)]())return;if(!Imported[_0x3331d2(0x3cb)])return;VisuMZ[_0x3331d2(0x5e4)](_0x210a63,_0x210a63);const _0x5f580e=$gameTemp['getLastPluginCommandInterpreter'](),_0x5421ac=_0x210a63['WaitForProjectile'];if(!_0x5f580e)return;const _0x478362=BattleManager[_0x3331d2(0x525)];if(!_0x478362)return;_0x478362[_0x3331d2(0x565)](_0x210a63);if(_0x5421ac)_0x5f580e[_0x3331d2(0x938)](_0x3331d2(0x512));}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x294),_0x2e4f81=>{const _0xd2ae86=_0x19a075;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0xd2ae86(0x3dd)])return;VisuMZ[_0xd2ae86(0x5e4)](_0x2e4f81,_0x2e4f81);const _0x32b50c=$gameTemp[_0xd2ae86(0x806)](),_0x24f779=_0x2e4f81[_0xd2ae86(0x636)];if(!_0x32b50c)return;$gameScreen[_0xd2ae86(0x52e)](_0x2e4f81['SkewX'],_0x2e4f81[_0xd2ae86(0x1b9)],_0x2e4f81[_0xd2ae86(0x59c)],_0x2e4f81[_0xd2ae86(0x6bb)]);if(_0x24f779)_0x32b50c[_0xd2ae86(0x938)]('battleSkew');}),PluginManager[_0x19a075(0x4de)](pluginData['name'],_0x19a075(0x713),_0x371f2b=>{const _0x10f8a7=_0x19a075;if(!SceneManager[_0x10f8a7(0x553)]())return;if(!Imported[_0x10f8a7(0x3dd)])return;VisuMZ['ConvertParams'](_0x371f2b,_0x371f2b);const _0x200f47=$gameTemp[_0x10f8a7(0x806)](),_0xac3aa1=_0x371f2b[_0x10f8a7(0x636)];if(!_0x200f47)return;$gameScreen[_0x10f8a7(0x52e)](0x0,0x0,_0x371f2b[_0x10f8a7(0x59c)],_0x371f2b[_0x10f8a7(0x6bb)]);if(_0xac3aa1)_0x200f47[_0x10f8a7(0x938)]('battleSkew');}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x2a5),_0x43647f=>{const _0x2a55bb=_0x19a075;if(!SceneManager[_0x2a55bb(0x553)]())return;if(!Imported[_0x2a55bb(0x3dd)])return;const _0x400084=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x400084)return;_0x400084[_0x2a55bb(0x938)](_0x2a55bb(0x71e));}),PluginManager['registerCommand'](pluginData['name'],_0x19a075(0x28f),_0x3f82b9=>{const _0x2c68e7=_0x19a075;if(!SceneManager[_0x2c68e7(0x553)]())return;VisuMZ[_0x2c68e7(0x5e4)](_0x3f82b9,_0x3f82b9);const _0x59c347=$gameTemp[_0x2c68e7(0x806)](),_0x93c83b=_0x3f82b9[_0x2c68e7(0x498)],_0x43a3ea=_0x3f82b9[_0x2c68e7(0x763)];if(!_0x59c347)return;BattleManager[_0x2c68e7(0x3d1)]=_0x93c83b,BattleManager['_target']=BattleManager['_allTargets']?BattleManager[_0x2c68e7(0x7b9)][BattleManager['_targetIndex']]||null:null,BattleManager['_target']&&_0x43a3ea[_0x2c68e7(0x171)]()[_0x2c68e7(0x431)]()!==_0x2c68e7(0x73f)&&_0x59c347['command119']([_0x43a3ea]);}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x164),_0x79800e=>{const _0xc2d3f7=_0x19a075;if(!SceneManager[_0xc2d3f7(0x553)]())return;VisuMZ[_0xc2d3f7(0x5e4)](_0x79800e,_0x79800e);const _0x4931da=$gameTemp[_0xc2d3f7(0x806)](),_0x33a757=_0x79800e[_0xc2d3f7(0x763)];if(!_0x4931da)return;BattleManager['_targetIndex']++,BattleManager[_0xc2d3f7(0x4f4)]=BattleManager[_0xc2d3f7(0x7b9)][BattleManager[_0xc2d3f7(0x3d1)]]||null,BattleManager[_0xc2d3f7(0x4f4)]&&_0x33a757[_0xc2d3f7(0x171)]()[_0xc2d3f7(0x431)]()!==_0xc2d3f7(0x73f)&&_0x4931da[_0xc2d3f7(0x756)]([_0x33a757]);}),PluginManager['registerCommand'](pluginData[_0x19a075(0x880)],_0x19a075(0x461),_0x59eb13=>{const _0x53881f=_0x19a075;if(!SceneManager[_0x53881f(0x553)]())return;VisuMZ[_0x53881f(0x5e4)](_0x59eb13,_0x59eb13);const _0x5692b0=$gameTemp['getLastPluginCommandInterpreter'](),_0x1eeac2=_0x59eb13['JumpToLabel'];if(!_0x5692b0)return;BattleManager['_targetIndex']--,BattleManager[_0x53881f(0x4f4)]=BattleManager['_allTargets'][BattleManager[_0x53881f(0x3d1)]]||null,BattleManager[_0x53881f(0x4f4)]&&_0x1eeac2[_0x53881f(0x171)]()[_0x53881f(0x431)]()!==_0x53881f(0x73f)&&_0x5692b0[_0x53881f(0x756)]([_0x1eeac2]);}),PluginManager[_0x19a075(0x4de)](pluginData['name'],_0x19a075(0x929),_0xb14425=>{const _0x533e0f=_0x19a075;if(!SceneManager[_0x533e0f(0x553)]())return;VisuMZ[_0x533e0f(0x5e4)](_0xb14425,_0xb14425);const _0x3b3d56=$gameTemp['getLastPluginCommandInterpreter'](),_0x228145=_0xb14425[_0x533e0f(0x483)],_0x4d9d03=_0xb14425[_0x533e0f(0x763)];if(!_0x3b3d56)return;const _0x48dd09=BattleManager[_0x533e0f(0x3d1)];for(;;){BattleManager[_0x533e0f(0x3d1)]=Math['randomInt'](BattleManager[_0x533e0f(0x7b9)][_0x533e0f(0x644)]);if(!_0x228145)break;if(BattleManager['_targetIndex']!==_0x48dd09)break;if(BattleManager[_0x533e0f(0x7b9)]['length']<=0x1){BattleManager[_0x533e0f(0x3d1)]=0x0;break;}}BattleManager['_target']=BattleManager[_0x533e0f(0x7b9)][BattleManager['_targetIndex']]||null,BattleManager[_0x533e0f(0x4f4)]&&_0x4d9d03[_0x533e0f(0x171)]()[_0x533e0f(0x431)]()!==_0x533e0f(0x73f)&&_0x3b3d56[_0x533e0f(0x756)]([_0x4d9d03]);}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x7fb),_0x5290a5=>{const _0x3b1006=_0x19a075;if(!SceneManager[_0x3b1006(0x553)]())return;VisuMZ[_0x3b1006(0x5e4)](_0x5290a5,_0x5290a5);const _0x167fcb=VisuMZ[_0x3b1006(0x7bc)](_0x5290a5[_0x3b1006(0x6f7)]);for(const _0x54c1e0 of _0x167fcb){if(!_0x54c1e0)continue;if(!_0x54c1e0[_0x3b1006(0x34c)]())continue;_0x54c1e0[_0x3b1006(0x680)]();}}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],'ActSeq_Weapon_NextActiveWeapon',_0x461dd3=>{const _0x41e492=_0x19a075;if(!SceneManager[_0x41e492(0x553)]())return;VisuMZ[_0x41e492(0x5e4)](_0x461dd3,_0x461dd3);const _0x12b34f=$gameTemp[_0x41e492(0x806)]();let _0xd295a8=![];const _0x4820e4=_0x461dd3[_0x41e492(0x763)],_0x3c80a3=VisuMZ['CreateActionSequenceTargets'](_0x461dd3['Targets']);for(const _0x5ca5a2 of _0x3c80a3){if(!_0x5ca5a2)continue;if(!_0x5ca5a2[_0x41e492(0x34c)]())continue;_0x5ca5a2[_0x41e492(0x4e9)](),_0x5ca5a2[_0x41e492(0x5b9)]()[_0x41e492(0x644)]>0x0?_0xd295a8=!![]:_0x5ca5a2[_0x41e492(0x680)]();}_0xd295a8&&_0x4820e4['toUpperCase']()[_0x41e492(0x431)]()!==_0x41e492(0x73f)&&_0x12b34f[_0x41e492(0x756)]([_0x4820e4]);}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x817),_0x11213a=>{const _0xba8325=_0x19a075;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0xba8325(0x5e4)](_0x11213a,_0x11213a);let _0x132926=_0x11213a['SlotID'];_0x132926--,_0x132926=Math[_0xba8325(0x6aa)](_0x132926,0x0);const _0x4b7ba9=VisuMZ[_0xba8325(0x7bc)](_0x11213a[_0xba8325(0x6f7)]);for(const _0x26e4df of _0x4b7ba9){if(!_0x26e4df)continue;if(!_0x26e4df[_0xba8325(0x34c)]())continue;_0x26e4df[_0xba8325(0x39e)](_0x132926);}}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x92e),_0x3fec46=>{const _0x49c583=_0x19a075;if(!SceneManager[_0x49c583(0x553)]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ[_0x49c583(0x5e4)](_0x3fec46,_0x3fec46);const _0x499bab=$gameTemp[_0x49c583(0x806)](),_0x512eb2=_0x3fec46[_0x49c583(0x57e)];if(!_0x499bab)return;$gameScreen[_0x49c583(0x3b1)](_0x3fec46[_0x49c583(0x765)],_0x3fec46[_0x49c583(0x59c)],_0x3fec46[_0x49c583(0x6bb)]);if(_0x512eb2)_0x499bab[_0x49c583(0x938)](_0x49c583(0x473));}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x1fd),_0x1b1679=>{const _0x3713d2=_0x19a075;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x3713d2(0x3dd)])return;VisuMZ[_0x3713d2(0x5e4)](_0x1b1679,_0x1b1679);const _0x13fe1e=$gameTemp[_0x3713d2(0x806)](),_0x273ba4=_0x1b1679['WaitForZoom'];if(!_0x13fe1e)return;$gameScreen[_0x3713d2(0x3b1)](0x1,_0x1b1679[_0x3713d2(0x59c)],_0x1b1679[_0x3713d2(0x6bb)]);if(_0x273ba4)_0x13fe1e[_0x3713d2(0x938)](_0x3713d2(0x473));}),PluginManager[_0x19a075(0x4de)](pluginData[_0x19a075(0x880)],_0x19a075(0x402),_0x14d3a1=>{const _0x37c4be=_0x19a075;if(!SceneManager[_0x37c4be(0x553)]())return;if(!Imported[_0x37c4be(0x3dd)])return;const _0x19c83a=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x19c83a)return;_0x19c83a[_0x37c4be(0x938)](_0x37c4be(0x473));}),VisuMZ[_0x19a075(0x73b)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x19a075(0x475)][_0x19a075(0x429)],Scene_Boot[_0x19a075(0x475)]['onDatabaseLoaded']=function(){const _0x4a5aaf=_0x19a075;this['process_VisuMZ_BattleCore_Failsafes'](),this[_0x4a5aaf(0x524)](),this[_0x4a5aaf(0x43d)](),this[_0x4a5aaf(0x5d4)](),VisuMZ['BattleCore'][_0x4a5aaf(0x851)][_0x4a5aaf(0x2c6)](this),this[_0x4a5aaf(0x29e)](),this[_0x4a5aaf(0x3c2)]();},Scene_Boot['prototype'][_0x19a075(0x29e)]=function(){const _0xef7036=_0x19a075;if(VisuMZ[_0xef7036(0x5fb)])return;this[_0xef7036(0x80d)](),this[_0xef7036(0x773)](),this['process_VisuMZ_BattleCore_jsFunctions']();},Scene_Boot['prototype'][_0x19a075(0x452)]=function(){const _0x462110=_0x19a075,_0x284f4b=$dataSystem['weaponTypes'][_0x462110(0x644)];for(let _0x124861=0x0;_0x124861<_0x284f4b;_0x124861++){const _0x19c8ac=$dataSystem[_0x462110(0x885)][_0x124861];if(_0x19c8ac)continue;$dataSystem[_0x462110(0x885)][_0x124861]=JsonEx['makeDeepCopy']($dataSystem['attackMotions'][0x0]);}},Scene_Boot[_0x19a075(0x475)][_0x19a075(0x524)]=function(){const _0x1040a8=_0x19a075,_0x3cf59a=VisuMZ['BattleCore'][_0x1040a8(0x7e0)];_0x3cf59a[_0x1040a8(0x4d3)][_0x1040a8(0x3f6)]===undefined&&(_0x3cf59a['Damage']['PopupPosition']=_0x1040a8(0x393)),_0x3cf59a[_0x1040a8(0x72c)][_0x1040a8(0x32b)]===undefined&&(_0x3cf59a[_0x1040a8(0x72c)]['SmoothImage']=![]),_0x3cf59a[_0x1040a8(0x343)][_0x1040a8(0x32b)]===undefined&&(_0x3cf59a[_0x1040a8(0x343)][_0x1040a8(0x32b)]=!![]),_0x3cf59a[_0x1040a8(0x72c)]['PrioritySortActive']===undefined&&(_0x3cf59a['Actor'][_0x1040a8(0x314)]=![]),_0x3cf59a[_0x1040a8(0x72c)][_0x1040a8(0x701)]===undefined&&(_0x3cf59a['Actor']['PrioritySortActors']=!![]);},VisuMZ[_0x19a075(0x44b)]={},Scene_Boot[_0x19a075(0x475)][_0x19a075(0x43d)]=function(){const _0x45150e=_0x19a075;for(const _0x40aaf5 of VisuMZ[_0x45150e(0x73b)][_0x45150e(0x7e0)]['Damage'][_0x45150e(0x163)]){if(!_0x40aaf5)continue;const _0x568413=_0x40aaf5[_0x45150e(0x6ed)]['toUpperCase']()[_0x45150e(0x431)]();VisuMZ['DamageStyles'][_0x568413]=_0x40aaf5;}},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x774)]={},Scene_Boot[_0x19a075(0x475)][_0x19a075(0x5d4)]=function(){const _0x16138d=_0x19a075,_0x55d19d=VisuMZ['BattleCore'][_0x16138d(0x774)],_0x4390f3='<%1>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1>',_0x55abde=[[_0x16138d(0x8e4),_0x16138d(0x54c)],[_0x16138d(0x319),_0x16138d(0x7d7)]],_0x4dd244=[['%1Apply%2JS',_0x16138d(0x206)],[_0x16138d(0x34d),_0x16138d(0x654)]],_0x21674f=[['',''],['AsUser',_0x16138d(0x87f)],[_0x16138d(0x8fd),_0x16138d(0x73d)]];for(const _0x29ccf3 of _0x4dd244){for(const _0x1db6cc of _0x21674f){for(const _0x44f804 of _0x55abde){const _0xbacfef=_0x29ccf3[0x0][_0x16138d(0x732)](_0x44f804[0x0],_0x1db6cc[0x0]),_0x5cea70=_0x29ccf3[0x1][_0x16138d(0x732)](_0x44f804[0x1],_0x1db6cc[0x1])[_0x16138d(0x431)](),_0x3b02c8=new RegExp(_0x4390f3[_0x16138d(0x732)](_0x5cea70),'i');_0x55d19d[_0xbacfef]=_0x3b02c8;}}}const _0x371960=[[_0x16138d(0x8a6),_0x16138d(0x5df)],[_0x16138d(0x214),_0x16138d(0x7ca)]];for(const _0x46da28 of _0x371960){for(const _0x46ae5d of _0x55abde){const _0x5e8eb2=_0x46da28[0x0]['format'](_0x46ae5d[0x0]),_0x2fe64b=_0x46da28[0x1][_0x16138d(0x732)](_0x46ae5d[0x1]),_0x1dddce=new RegExp(_0x4390f3[_0x16138d(0x732)](_0x2fe64b),'i');_0x55d19d[_0x5e8eb2]=_0x1dddce;}}const _0x28433c=[[_0x16138d(0x57a),_0x16138d(0x90d)],[_0x16138d(0x86d),'JS\x20%1END\x20BATTLE'],[_0x16138d(0x573),_0x16138d(0x74f)],[_0x16138d(0x218),_0x16138d(0x682)],[_0x16138d(0x1fc),_0x16138d(0x835)],[_0x16138d(0x1d3),'JS\x20ESCAPE\x20FAILURE'],[_0x16138d(0x80b),_0x16138d(0x7ea)],[_0x16138d(0x638),'JS\x20%1END\x20TURN'],['%1RegenerateJS',_0x16138d(0x540)]];for(const _0x314ec9 of _0x28433c){for(const _0x74d5c of _0x55abde){const _0x185532=_0x314ec9[0x0][_0x16138d(0x732)](_0x74d5c[0x0]),_0x944ba0=_0x314ec9[0x1][_0x16138d(0x732)](_0x74d5c[0x1]),_0x6d63a7=new RegExp(_0x4390f3[_0x16138d(0x732)](_0x944ba0),'i');_0x55d19d[_0x185532]=_0x6d63a7;}}},Scene_Boot['prototype'][_0x19a075(0x80d)]=function(){const _0x998c63=_0x19a075,_0x5dcc5a=$dataSkills[_0x998c63(0x265)]($dataItems);for(const _0x1003ec of _0x5dcc5a){if(!_0x1003ec)continue;VisuMZ[_0x998c63(0x73b)][_0x998c63(0x219)](_0x1003ec);}},Scene_Boot['prototype']['process_VisuMZ_BattleCore_TraitObject_Notetags']=function(){const _0x562e44=_0x19a075,_0x2bb2d1=$dataActors[_0x562e44(0x265)]($dataClasses,$dataWeapons,$dataArmors,$dataEnemies,$dataStates);for(const _0x3949d6 of _0x2bb2d1){if(!_0x3949d6)continue;VisuMZ[_0x562e44(0x73b)][_0x562e44(0x287)](_0x3949d6);}},Scene_Boot[_0x19a075(0x475)]['process_VisuMZ_BattleCore_BaseTroops']=function(){const _0x327d77=_0x19a075,_0x2771da=VisuMZ[_0x327d77(0x73b)][_0x327d77(0x7e0)]['Mechanics'][_0x327d77(0x3a2)],_0x1b7e9b=[];for(const _0x19f8d9 of _0x2771da){const _0x694649=$dataTroops[_0x19f8d9];if(_0x694649)_0x1b7e9b[_0x327d77(0x7cc)](JsonEx[_0x327d77(0x538)](_0x694649));}for(const _0x38132e of $dataTroops){if(!_0x38132e)continue;for(const _0x237f91 of _0x1b7e9b){if(_0x237f91['id']===_0x38132e['id'])continue;_0x38132e[_0x327d77(0x362)]=_0x38132e[_0x327d77(0x362)][_0x327d77(0x265)](_0x237f91[_0x327d77(0x362)]);}}},Scene_Boot[_0x19a075(0x475)][_0x19a075(0x16a)]=function(){const _0x33a76b=_0x19a075,_0x430498=$dataSkills[_0x33a76b(0x265)]($dataItems);for(const _0x283154 of _0x430498){if(!_0x283154)continue;VisuMZ[_0x33a76b(0x73b)][_0x33a76b(0x741)](_0x283154);}},VisuMZ['BattleCore']['ParseActorNotetags']=VisuMZ[_0x19a075(0x460)],VisuMZ[_0x19a075(0x460)]=function(_0x49b218){const _0x2f55f1=_0x19a075;VisuMZ[_0x2f55f1(0x73b)][_0x2f55f1(0x460)]&&VisuMZ[_0x2f55f1(0x73b)][_0x2f55f1(0x460)][_0x2f55f1(0x2c6)](this,_0x49b218),VisuMZ[_0x2f55f1(0x73b)]['Parse_Notetags_TraitObjects'](_0x49b218);},VisuMZ[_0x19a075(0x73b)]['ParseClassNotetags']=VisuMZ[_0x19a075(0x2e5)],VisuMZ[_0x19a075(0x2e5)]=function(_0x516150){const _0x31bdf8=_0x19a075;VisuMZ['BattleCore']['ParseClassNotetags']&&VisuMZ['BattleCore']['ParseClassNotetags'][_0x31bdf8(0x2c6)](this,_0x516150),VisuMZ[_0x31bdf8(0x73b)][_0x31bdf8(0x287)](_0x516150);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x5af)]=VisuMZ[_0x19a075(0x5af)],VisuMZ['ParseSkillNotetags']=function(_0x4c86ed){const _0xb71913=_0x19a075;VisuMZ['BattleCore'][_0xb71913(0x5af)]&&VisuMZ[_0xb71913(0x73b)][_0xb71913(0x5af)][_0xb71913(0x2c6)](this,_0x4c86ed),VisuMZ['BattleCore'][_0xb71913(0x219)](_0x4c86ed),VisuMZ['BattleCore'][_0xb71913(0x741)](_0x4c86ed);},VisuMZ['BattleCore']['ParseItemNotetags']=VisuMZ[_0x19a075(0x8df)],VisuMZ[_0x19a075(0x8df)]=function(_0x813ac5){const _0xb93084=_0x19a075;VisuMZ[_0xb93084(0x73b)][_0xb93084(0x8df)]&&VisuMZ[_0xb93084(0x73b)][_0xb93084(0x8df)]['call'](this,_0x813ac5),VisuMZ[_0xb93084(0x73b)][_0xb93084(0x219)](_0x813ac5),VisuMZ['BattleCore'][_0xb93084(0x741)](_0x813ac5);},VisuMZ['BattleCore'][_0x19a075(0x625)]=VisuMZ[_0x19a075(0x625)],VisuMZ[_0x19a075(0x625)]=function(_0x1e625f){const _0x667454=_0x19a075;VisuMZ['BattleCore'][_0x667454(0x625)]&&VisuMZ[_0x667454(0x73b)]['ParseWeaponNotetags'][_0x667454(0x2c6)](this,_0x1e625f),VisuMZ[_0x667454(0x73b)]['Parse_Notetags_TraitObjects'](_0x1e625f);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x80f)]=VisuMZ[_0x19a075(0x80f)],VisuMZ[_0x19a075(0x80f)]=function(_0x50cbc7){const _0x11b1f3=_0x19a075;VisuMZ['BattleCore'][_0x11b1f3(0x80f)]&&VisuMZ['BattleCore'][_0x11b1f3(0x80f)]['call'](this,_0x50cbc7),VisuMZ[_0x11b1f3(0x73b)][_0x11b1f3(0x287)](_0x50cbc7);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x613)]=VisuMZ[_0x19a075(0x613)],VisuMZ['ParseEnemyNotetags']=function(_0x46f7ef){const _0x3b26fd=_0x19a075;VisuMZ['BattleCore'][_0x3b26fd(0x613)]&&VisuMZ['BattleCore']['ParseEnemyNotetags']['call'](this,_0x46f7ef),VisuMZ[_0x3b26fd(0x73b)][_0x3b26fd(0x287)](_0x46f7ef);},VisuMZ[_0x19a075(0x73b)]['ParseStateNotetags']=VisuMZ['ParseStateNotetags'],VisuMZ[_0x19a075(0x250)]=function(_0x59fd39){const _0x54b58a=_0x19a075;VisuMZ[_0x54b58a(0x73b)][_0x54b58a(0x250)]&&VisuMZ[_0x54b58a(0x73b)]['ParseStateNotetags'][_0x54b58a(0x2c6)](this,_0x59fd39),VisuMZ[_0x54b58a(0x73b)][_0x54b58a(0x287)](_0x59fd39);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x219)]=function(_0x37a8ac){const _0x1e7988=_0x19a075,_0x11ebea=['PreApplyJS',_0x1e7988(0x783),'PreDamageJS',_0x1e7988(0x7a8),_0x1e7988(0x161),_0x1e7988(0x247),_0x1e7988(0x5c7),_0x1e7988(0x8b2)];for(const _0x3ca100 of _0x11ebea){VisuMZ['BattleCore']['createJS'](_0x37a8ac,_0x3ca100);}const _0x5b9f2f=_0x37a8ac[_0x1e7988(0x185)];_0x5b9f2f[_0x1e7988(0x6c8)](/<ALWAYS CRITICAL/i)&&(_0x37a8ac[_0x1e7988(0x239)]['critical']=!![]),_0x5b9f2f[_0x1e7988(0x6c8)](/<(?:REPEAT|REPEATS|REPEAT HITS):[ ](\d+)/i)&&(_0x37a8ac[_0x1e7988(0x6cf)]=Math[_0x1e7988(0x6aa)](0x1,Number(RegExp['$1']))),_0x5b9f2f[_0x1e7988(0x6c8)](/<TARGET:[ ](.*)>/i)&&(_0x37a8ac[_0x1e7988(0x5ac)]=String(RegExp['$1'])['toUpperCase']()[_0x1e7988(0x431)]());},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x287)]=function(_0x4541cf){const _0x59fff9=_0x19a075,_0x3fdbb1=[_0x59fff9(0x7f2),'PostApplyAsUserJS',_0x59fff9(0x8ee),'PostDamageAsUserJS',_0x59fff9(0x372),_0x59fff9(0x55a),_0x59fff9(0x631),_0x59fff9(0x1a7),_0x59fff9(0x161),_0x59fff9(0x247),_0x59fff9(0x5c7),_0x59fff9(0x8b2),'PreStartBattleJS',_0x59fff9(0x3dc),_0x59fff9(0x52b),'PostEndBattleJS',_0x59fff9(0x573),'BattleDefeatJS',_0x59fff9(0x1fc),_0x59fff9(0x1d3),'PreStartTurnJS',_0x59fff9(0x7a9),_0x59fff9(0x6e6),_0x59fff9(0x176),'PreRegenerateJS',_0x59fff9(0x236)];for(const _0xb03691 of _0x3fdbb1){VisuMZ['BattleCore'][_0x59fff9(0x6e0)](_0x4541cf,_0xb03691);}},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x741)]=function(_0x46c39f){const _0x251fee=_0x19a075,_0x32463c=_0x46c39f[_0x251fee(0x185)];if(_0x32463c[_0x251fee(0x6c8)](/<JS TARGETS>\s*([\s\S]*)\s*<\/JS TARGETS>/i)){const _0x320234=String(RegExp['$1']),_0x57f629=VisuMZ[_0x251fee(0x73b)][_0x251fee(0x1a3)](_0x46c39f,_0x251fee(0x6f7));VisuMZ[_0x251fee(0x73b)][_0x251fee(0x5db)](_0x320234,_0x57f629);}if(_0x32463c[_0x251fee(0x6c8)](/<JS COMMAND (?:VISIBLE|SHOW|HIDE)>\s*([\s\S]*)\s*<\/JS COMMAND (?:VISIBLE|SHOW|HIDE)>/i)){const _0x41f4a4=String(RegExp['$1']),_0x287671=VisuMZ[_0x251fee(0x73b)][_0x251fee(0x1a3)](_0x46c39f,_0x251fee(0x6fe));VisuMZ[_0x251fee(0x73b)]['createCommandVisibleJS'](_0x41f4a4,_0x287671);}},VisuMZ[_0x19a075(0x73b)]['JS']={},VisuMZ[_0x19a075(0x73b)]['createJS']=function(_0x347fe2,_0x1a69a0){const _0x539337=_0x19a075,_0x435387=_0x347fe2[_0x539337(0x185)];if(_0x435387[_0x539337(0x6c8)](VisuMZ[_0x539337(0x73b)][_0x539337(0x774)][_0x1a69a0])){const _0x8b28af=RegExp['$1'],_0x478f69=_0x539337(0x836)[_0x539337(0x732)](_0x8b28af),_0x4680e0=VisuMZ[_0x539337(0x73b)][_0x539337(0x1a3)](_0x347fe2,_0x1a69a0);VisuMZ[_0x539337(0x73b)]['JS'][_0x4680e0]=new Function(_0x478f69);}},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x1a3)]=function(_0xe9b0,_0x3e425c){const _0x82700a=_0x19a075;let _0x3e9abb='';if($dataActors[_0x82700a(0x5d5)](_0xe9b0))_0x3e9abb='Actor-%1-%2'[_0x82700a(0x732)](_0xe9b0['id'],_0x3e425c);if($dataClasses['includes'](_0xe9b0))_0x3e9abb='Class-%1-%2'[_0x82700a(0x732)](_0xe9b0['id'],_0x3e425c);if($dataSkills[_0x82700a(0x5d5)](_0xe9b0))_0x3e9abb=_0x82700a(0x277)[_0x82700a(0x732)](_0xe9b0['id'],_0x3e425c);if($dataItems[_0x82700a(0x5d5)](_0xe9b0))_0x3e9abb='Item-%1-%2'['format'](_0xe9b0['id'],_0x3e425c);if($dataWeapons[_0x82700a(0x5d5)](_0xe9b0))_0x3e9abb='Weapon-%1-%2'[_0x82700a(0x732)](_0xe9b0['id'],_0x3e425c);if($dataArmors['includes'](_0xe9b0))_0x3e9abb=_0x82700a(0x68e)[_0x82700a(0x732)](_0xe9b0['id'],_0x3e425c);if($dataEnemies[_0x82700a(0x5d5)](_0xe9b0))_0x3e9abb='Enemy-%1-%2'[_0x82700a(0x732)](_0xe9b0['id'],_0x3e425c);if($dataStates[_0x82700a(0x5d5)](_0xe9b0))_0x3e9abb=_0x82700a(0x531)[_0x82700a(0x732)](_0xe9b0['id'],_0x3e425c);return _0x3e9abb;},VisuMZ['BattleCore'][_0x19a075(0x5db)]=function(_0x5ef763,_0x2564c6){const _0x27edb9=_0x19a075,_0x2a9a4c='\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20targets\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20targets\x20||\x20[];\x0a\x20\x20\x20\x20'[_0x27edb9(0x732)](_0x5ef763);VisuMZ[_0x27edb9(0x73b)]['JS'][_0x2564c6]=new Function(_0x2a9a4c);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x267)]=function(_0xe6070f,_0xdb65f3){const _0x79662b=_0x19a075,_0x2384a6='\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20'[_0x79662b(0x732)](_0xe6070f);VisuMZ['BattleCore']['JS'][_0xdb65f3]=new Function(_0x2384a6);},TextManager['autoBattle']=VisuMZ[_0x19a075(0x73b)][_0x19a075(0x7e0)][_0x19a075(0x72b)][_0x19a075(0x562)],TextManager[_0x19a075(0x2bc)]=VisuMZ[_0x19a075(0x73b)]['Settings'][_0x19a075(0x6a8)][_0x19a075(0x71a)],TextManager['autoBattleStyle']=VisuMZ['BattleCore'][_0x19a075(0x7e0)]['AutoBattle'][_0x19a075(0x6b9)],TextManager[_0x19a075(0x1a8)]=VisuMZ[_0x19a075(0x73b)][_0x19a075(0x7e0)][_0x19a075(0x88a)][_0x19a075(0x6ed)],ColorManager[_0x19a075(0x642)]=function(_0x46c197){const _0x1426ea=_0x19a075;return _0x46c197=String(_0x46c197),_0x46c197['match'](/#(.*)/i)?_0x1426ea(0x790)['format'](String(RegExp['$1'])):this[_0x1426ea(0x1ad)](Number(_0x46c197));},DataManager['getDamageStyle']=function(_0x20a37e){const _0x1ecf1f=_0x19a075;if(_0x20a37e[_0x1ecf1f(0x185)][_0x1ecf1f(0x6c8)](/<DAMAGE STYLE:[ ](.*)>/i)){const _0x5d7810=String(RegExp['$1'])[_0x1ecf1f(0x171)]()['trim']();if(_0x5d7810==='MANUAL')return'MANUAL';if(VisuMZ[_0x1ecf1f(0x44b)][_0x5d7810])return _0x5d7810;}const _0x3056f7=VisuMZ[_0x1ecf1f(0x73b)]['Settings'][_0x1ecf1f(0x4d3)][_0x1ecf1f(0x7a2)][_0x1ecf1f(0x171)]()[_0x1ecf1f(0x431)]();if(VisuMZ[_0x1ecf1f(0x44b)][_0x3056f7])return _0x3056f7;return'MANUAL';},DataManager[_0x19a075(0x3f4)]=function(_0x14f4c8){const _0x39d263=_0x19a075;_0x14f4c8=_0x14f4c8['toUpperCase']()[_0x39d263(0x431)](),this[_0x39d263(0x692)]=this[_0x39d263(0x692)]||{};if(this[_0x39d263(0x692)][_0x14f4c8])return this[_0x39d263(0x692)][_0x14f4c8];for(let _0x4aa31d=0x1;_0x4aa31d<0x64;_0x4aa31d++){if(!$dataSystem[_0x39d263(0x4fa)][_0x4aa31d])continue;let _0x47ec28=$dataSystem[_0x39d263(0x4fa)][_0x4aa31d][_0x39d263(0x171)]()['trim']();_0x47ec28=_0x47ec28['replace'](/\x1I\[(\d+)\]/gi,''),_0x47ec28=_0x47ec28[_0x39d263(0x89a)](/\\I\[(\d+)\]/gi,''),this[_0x39d263(0x692)][_0x47ec28]=_0x4aa31d;}return this['_stypeIDs'][_0x14f4c8]||0x0;},DataManager[_0x19a075(0x3d9)]=function(_0x4cb1cc){const _0x3abd18=_0x19a075;_0x4cb1cc=_0x4cb1cc[_0x3abd18(0x171)]()[_0x3abd18(0x431)](),this[_0x3abd18(0x3e5)]=this[_0x3abd18(0x3e5)]||{};if(this['_skillIDs'][_0x4cb1cc])return this[_0x3abd18(0x3e5)][_0x4cb1cc];for(const _0x2163b8 of $dataSkills){if(!_0x2163b8)continue;this[_0x3abd18(0x3e5)][_0x2163b8[_0x3abd18(0x880)][_0x3abd18(0x171)]()['trim']()]=_0x2163b8['id'];}return this['_skillIDs'][_0x4cb1cc]||0x0;},DataManager['getEnemyIdWithName']=function(_0x554b18){const _0x57713b=_0x19a075;_0x554b18=_0x554b18['toUpperCase']()['trim'](),this[_0x57713b(0x519)]=this[_0x57713b(0x519)]||{};if(this[_0x57713b(0x519)][_0x554b18])return this[_0x57713b(0x519)][_0x554b18];for(const _0xa81e7b of $dataEnemies){if(!_0xa81e7b)continue;this[_0x57713b(0x519)][_0xa81e7b[_0x57713b(0x880)][_0x57713b(0x171)]()[_0x57713b(0x431)]()]=_0xa81e7b['id'];}return this[_0x57713b(0x519)][_0x554b18]||0x0;},DataManager['getWtypeIdWithName']=function(_0xe52653){const _0x12b9b6=_0x19a075;_0xe52653=_0xe52653['toUpperCase']()[_0x12b9b6(0x431)](),this[_0x12b9b6(0x49b)]=this['_wtypeIDs']||{};if(this['_wtypeIDs'][_0xe52653])return this[_0x12b9b6(0x49b)][_0xe52653];for(let _0x5552d3=0x1;_0x5552d3<0x64;_0x5552d3++){if(!$dataSystem[_0x12b9b6(0x950)][_0x5552d3])continue;let _0x41928a=$dataSystem[_0x12b9b6(0x950)][_0x5552d3]['toUpperCase']()['trim']();_0x41928a=_0x41928a[_0x12b9b6(0x89a)](/\x1I\[(\d+)\]/gi,''),_0x41928a=_0x41928a['replace'](/\\I\[(\d+)\]/gi,''),this[_0x12b9b6(0x49b)][_0x41928a]=_0x5552d3;}return this[_0x12b9b6(0x49b)][_0x12b9b6(0x897)]=0x0,this['_wtypeIDs'][_0xe52653]||0x0;},DataManager[_0x19a075(0x6ff)]=function(_0x49f3e3){const _0x19cd37=_0x19a075,_0x545d87=_0x19cd37(0x51e);let _0x4229c2=_0x49f3e3[_0x19cd37(0x61b)],_0x5d1d8f=_0x49f3e3[_0x19cd37(0x880)];const _0x16a150=_0x49f3e3[_0x19cd37(0x185)];return _0x16a150[_0x19cd37(0x6c8)](/<DISPLAY ICON: (\d+)>/i)&&(_0x4229c2=Number(RegExp['$1'])),_0x16a150[_0x19cd37(0x6c8)](/<DISPLAY TEXT: (.*)>/i)&&(_0x5d1d8f=String(RegExp['$1'])),_0x545d87[_0x19cd37(0x732)](_0x4229c2,_0x5d1d8f);},DataManager[_0x19a075(0x257)]=function(_0x50f687){const _0x5211dd=_0x19a075;return _0x50f687[_0x5211dd(0x185)][_0x5211dd(0x6c8)](/<COMMAND TEXT: (.*)>/i)?String(RegExp['$1']):_0x50f687[_0x5211dd(0x880)];},DataManager['battleCommandIcon']=function(_0x423da3){const _0x80a41a=_0x19a075;return _0x423da3[_0x80a41a(0x185)][_0x80a41a(0x6c8)](/<COMMAND ICON: (\d+)>/i)?Number(RegExp['$1']):_0x423da3['iconIndex'];},DataManager[_0x19a075(0x798)]=function(_0x5a6b48){const _0x164dc6=_0x19a075,_0x2564d0=$dataEnemies[_0x5a6b48];if(_0x2564d0){if(_0x2564d0[_0x164dc6(0x185)][_0x164dc6(0x6c8)](/<SWAP ENEMIES>\s*([\s\S]*)\s*<\/SWAP ENEMIES>/i)){const _0x133e27=String(RegExp['$1'])[_0x164dc6(0x428)](/[\r\n]+/)[_0x164dc6(0x8c3)](''),_0x284e8f=this['processRandomizedData'](_0x133e27);_0x5a6b48=this[_0x164dc6(0x5b0)](_0x284e8f)||_0x5a6b48,_0x5a6b48=DataManager[_0x164dc6(0x798)](_0x5a6b48);}}return _0x5a6b48;},DataManager[_0x19a075(0x3ea)]=function(_0x517b38){const _0x470f72=_0x19a075;let _0x48f5ed=0x0;const _0x5c914c={};for(const _0x2d922f of _0x517b38){if(_0x2d922f['match'](/(.*):[ ](\d+)/i)){const _0x4bdc2=String(RegExp['$1'])['trim'](),_0x4475ad=Number(RegExp['$2']);_0x5c914c[_0x4bdc2]=_0x4475ad,_0x48f5ed+=_0x4475ad;}else{if(_0x2d922f[_0x470f72(0x6c8)](/(.*):[ ](\d+\.?\d+)/i)){const _0x34149f=String(RegExp['$1'])[_0x470f72(0x431)](),_0x291ba4=Number(RegExp['$2']);_0x5c914c[_0x34149f]=_0x291ba4,_0x48f5ed+=_0x291ba4;}else _0x2d922f!==''&&(_0x5c914c[_0x2d922f]=0x1,_0x48f5ed++);}}if(_0x48f5ed<=0x0)return'';let _0x1a320e=Math[_0x470f72(0x76f)]()*_0x48f5ed;for(const _0x921800 in _0x5c914c){_0x1a320e-=_0x5c914c[_0x921800];if(_0x1a320e<=0x0)return _0x921800;}return'';},DataManager[_0x19a075(0x439)]=function(_0x920ba1){const _0x23607b=_0x19a075;if(!_0x920ba1)return![];if(!VisuMZ[_0x23607b(0x73b)][_0x23607b(0x7e0)][_0x23607b(0x41b)]['AutoNotetag'])return![];if(_0x920ba1[_0x23607b(0x185)][_0x23607b(0x6c8)](/<AUTO ACTION SEQUENCE>/i))return![];if(_0x920ba1[_0x23607b(0x185)]['match'](/<COMMON (?:EVENT|EVENTS):[ ](.*)>/gi))return!![];for(const _0x42ab97 of _0x920ba1[_0x23607b(0x487)]){if(!_0x42ab97)continue;if(_0x42ab97[_0x23607b(0x16d)]===Game_Action[_0x23607b(0x17e)])return!![];}return![];},ConfigManager[_0x19a075(0x178)]=![],ConfigManager[_0x19a075(0x339)]=![],ConfigManager[_0x19a075(0x1a8)]=!![],VisuMZ[_0x19a075(0x73b)][_0x19a075(0x8aa)]=ConfigManager[_0x19a075(0x183)],ConfigManager[_0x19a075(0x183)]=function(){const _0x1be6d0=_0x19a075,_0xae9a93=VisuMZ[_0x1be6d0(0x73b)][_0x1be6d0(0x8aa)][_0x1be6d0(0x2c6)](this);return _0xae9a93[_0x1be6d0(0x178)]=this[_0x1be6d0(0x178)],_0xae9a93[_0x1be6d0(0x339)]=this[_0x1be6d0(0x339)],_0xae9a93[_0x1be6d0(0x1a8)]=this['visualHpGauge'],_0xae9a93;},VisuMZ[_0x19a075(0x73b)]['ConfigManager_applyData']=ConfigManager[_0x19a075(0x750)],ConfigManager[_0x19a075(0x750)]=function(_0xb98e5e){const _0x458670=_0x19a075;VisuMZ[_0x458670(0x73b)][_0x458670(0x182)]['call'](this,_0xb98e5e),_0x458670(0x178)in _0xb98e5e?this[_0x458670(0x178)]=_0xb98e5e[_0x458670(0x178)]:this[_0x458670(0x178)]=![],_0x458670(0x339)in _0xb98e5e?this[_0x458670(0x339)]=_0xb98e5e['autoBattleUseSkills']:this[_0x458670(0x339)]=![],'visualHpGauge'in _0xb98e5e?this[_0x458670(0x1a8)]=_0xb98e5e[_0x458670(0x1a8)]:this[_0x458670(0x1a8)]=!![];},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x535)]=BattleManager['initMembers'],BattleManager[_0x19a075(0x200)]=function(){const _0x34b8e5=_0x19a075;VisuMZ[_0x34b8e5(0x73b)]['BattleManager_initMembers']['call'](this),this['_forcedBattlers']=[];},BattleManager[_0x19a075(0x40d)]=function(){const _0x50bd9b=_0x19a075;if(!SceneManager[_0x50bd9b(0x553)]())return;const _0x3a7e69=SceneManager[_0x50bd9b(0x3a8)]['_statusWindow'];if(_0x3a7e69)_0x3a7e69[_0x50bd9b(0x61a)]();},BattleManager['battleSys']=function(){const _0x91b431=_0x19a075;if(BattleManager[_0x91b431(0x2e8)]())return _0x91b431(0x5fd);return _0x91b431(0x4e6);},BattleManager['isBattleSys']=function(_0x59d244){const _0x370026=_0x19a075;return _0x59d244=_0x59d244[_0x370026(0x171)]()[_0x370026(0x431)](),this[_0x370026(0x44d)]()===_0x59d244;},BattleManager[_0x19a075(0x43f)]=function(){const _0x3e411d=_0x19a075;return this[_0x3e411d(0x546)](_0x3e411d(0x4e6));},BattleManager[_0x19a075(0x4a1)]=function(){return this['isDTB']();},BattleManager['isTickBased']=function(){const _0x2309c9=_0x19a075;return!this[_0x2309c9(0x4a1)]();},BattleManager[_0x19a075(0x8a4)]=function(){const _0x2cf9e0=_0x19a075;return!this[_0x2cf9e0(0x4a1)]()&&!this[_0x2cf9e0(0x6e2)]();},BattleManager['processBattleCoreJS']=function(_0x3b81f7){const _0x3ecae9=_0x19a075;$gameParty['processBattleCoreJS'](_0x3b81f7),$gameTroop[_0x3ecae9(0x22d)](_0x3b81f7);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x8be)]=BattleManager[_0x19a075(0x229)],BattleManager[_0x19a075(0x229)]=function(){const _0x1c6b43=_0x19a075;this['_endBattle']=![],this[_0x1c6b43(0x1fa)]=ConfigManager[_0x1c6b43(0x178)],this[_0x1c6b43(0x22d)](_0x1c6b43(0x1ef)),VisuMZ[_0x1c6b43(0x73b)][_0x1c6b43(0x8be)][_0x1c6b43(0x2c6)](this),this['processBattleCoreJS']('PostStartBattleJS');},BattleManager['processPostBattleCommonEvents']=function(_0x36f2bb){const _0x1b083f=_0x19a075,_0x26b1be=VisuMZ['BattleCore']['Settings'][_0x1b083f(0x679)];_0x26b1be['BattleEndEvent']&&VisuMZ['BattleCore']['CheckMapBattleEventValid'](_0x26b1be[_0x1b083f(0x539)])&&$gameTemp['reserveCommonEvent'](_0x26b1be['BattleEndEvent']);const _0x357302=_0x1b083f(0x4bb)[_0x1b083f(0x732)](_0x36f2bb);_0x26b1be[_0x357302]&&VisuMZ[_0x1b083f(0x73b)][_0x1b083f(0x68a)](_0x26b1be[_0x357302])&&$gameTemp[_0x1b083f(0x526)](_0x26b1be[_0x357302]);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x344)]=BattleManager[_0x19a075(0x44a)],BattleManager[_0x19a075(0x44a)]=function(){const _0xe22465=_0x19a075;this[_0xe22465(0x22d)](_0xe22465(0x573)),VisuMZ[_0xe22465(0x73b)][_0xe22465(0x344)]['call'](this),this[_0xe22465(0x65e)](_0xe22465(0x2a2));},VisuMZ['BattleCore']['BattleManager_processDefeat']=BattleManager[_0x19a075(0x208)],BattleManager[_0x19a075(0x208)]=function(){const _0xc1c194=_0x19a075;this['processBattleCoreJS'](_0xc1c194(0x218)),VisuMZ['BattleCore'][_0xc1c194(0x376)]['call'](this),this[_0xc1c194(0x65e)](_0xc1c194(0x582));},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x4fe)]=BattleManager['endBattle'],BattleManager[_0x19a075(0x903)]=function(_0x36a4e2){const _0x3eab8b=_0x19a075;this[_0x3eab8b(0x83c)]=!![],this['_autoBattle']=![],this[_0x3eab8b(0x22d)](_0x3eab8b(0x52b)),VisuMZ[_0x3eab8b(0x73b)][_0x3eab8b(0x4fe)][_0x3eab8b(0x2c6)](this,_0x36a4e2),this[_0x3eab8b(0x22d)](_0x3eab8b(0x270));},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x863)]=BattleManager[_0x19a075(0x936)],BattleManager['startTurn']=function(){const _0x680b11=_0x19a075;if(this[_0x680b11(0x4a1)]())this[_0x680b11(0x22d)](_0x680b11(0x5da));VisuMZ[_0x680b11(0x73b)][_0x680b11(0x863)][_0x680b11(0x2c6)](this);if(this[_0x680b11(0x4a1)]())this[_0x680b11(0x22d)](_0x680b11(0x7a9));},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x600)]=BattleManager[_0x19a075(0x704)],BattleManager['startAction']=function(){const _0x1de759=_0x19a075,_0x321e5b=this['_subject'][_0x1de759(0x879)]();if(_0x321e5b)_0x321e5b[_0x1de759(0x42a)](_0x1de759(0x161));VisuMZ[_0x1de759(0x73b)][_0x1de759(0x600)][_0x1de759(0x2c6)](this);if(_0x321e5b)_0x321e5b[_0x1de759(0x42a)](_0x1de759(0x247));},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x4e3)]=BattleManager[_0x19a075(0x56e)],BattleManager['endAction']=function(){const _0x2a55c4=_0x19a075,_0x340d72=this[_0x2a55c4(0x1f4)];_0x340d72&&_0x340d72['actionBattleCoreJS'](_0x2a55c4(0x5c7)),VisuMZ['BattleCore'][_0x2a55c4(0x4e3)][_0x2a55c4(0x2c6)](this),_0x340d72&&_0x340d72['actionBattleCoreJS']('PostEndActionJS'),this[_0x2a55c4(0x453)](this[_0x2a55c4(0x2d0)]());},BattleManager[_0x19a075(0x453)]=function(_0x5828eb){const _0x54e74e=_0x19a075;for(const _0x5b9d1a of _0x5828eb){if(!_0x5b9d1a)continue;if(!_0x5b9d1a[_0x54e74e(0x612)]())continue;_0x5b9d1a[_0x54e74e(0x612)]()[_0x54e74e(0x6a0)]();}},BattleManager[_0x19a075(0x718)]=function(){const _0x24ac87=_0x19a075;!this[_0x24ac87(0x5ae)][_0x24ac87(0x596)]()&&this[_0x24ac87(0x56e)]();},Game_Battler[_0x19a075(0x475)][_0x19a075(0x67c)]=function(){const _0xfda3ee=_0x19a075;this[_0xfda3ee(0x85d)]();if(Imported[_0xfda3ee(0x864)]){const _0x49b651=VisuMZ[_0xfda3ee(0x873)]['Settings'][_0xfda3ee(0x85e)];_0x49b651&&_0x49b651[_0xfda3ee(0x249)]===![]&&this[_0xfda3ee(0x719)](0x1);}else this[_0xfda3ee(0x719)](0x1);this[_0xfda3ee(0x18b)]();},BattleManager[_0x19a075(0x82f)]=function(){const _0x4cbbb5=_0x19a075;this[_0x4cbbb5(0x4a5)]=VisuMZ[_0x4cbbb5(0x73b)]['Settings'][_0x4cbbb5(0x679)]['CalcEscapeRatioJS']['call'](this);},VisuMZ['BattleCore']['BattleManager_onEscapeSuccess']=BattleManager[_0x19a075(0x65b)],BattleManager[_0x19a075(0x65b)]=function(){const _0x33cbe0=_0x19a075;this[_0x33cbe0(0x22d)]('EscapeSuccessJS'),BattleManager['_spriteset'][_0x33cbe0(0x824)](),VisuMZ[_0x33cbe0(0x73b)]['BattleManager_onEscapeSuccess'][_0x33cbe0(0x2c6)](this),this[_0x33cbe0(0x65e)](_0x33cbe0(0x340));},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x723)]=BattleManager[_0x19a075(0x529)],BattleManager[_0x19a075(0x529)]=function(){const _0x5a6935=_0x19a075;this[_0x5a6935(0x22d)]('EscapeFailureJS');const _0x2a9b57=this[_0x5a6935(0x4a5)];VisuMZ[_0x5a6935(0x73b)][_0x5a6935(0x723)][_0x5a6935(0x2c6)](this),this[_0x5a6935(0x4a5)]=_0x2a9b57+VisuMZ['BattleCore'][_0x5a6935(0x7e0)]['Mechanics'][_0x5a6935(0x391)][_0x5a6935(0x2c6)](this),this[_0x5a6935(0x65e)]('EscapeFail');},BattleManager[_0x19a075(0x2c1)]=function(){const _0x2be9a9=_0x19a075;let _0x1e68d6=![];if(this[_0x2be9a9(0x695)]())for(const _0x381f9e of $gameTroop[_0x2be9a9(0x3c1)]()){this[_0x2be9a9(0x5ae)][_0x2be9a9(0x7cc)](_0x2be9a9(0x7f8),TextManager[_0x2be9a9(0x1d6)]['format'](_0x381f9e)),this[_0x2be9a9(0x5ae)][_0x2be9a9(0x7cc)](_0x2be9a9(0x6a7)),_0x1e68d6=!![];}if(this[_0x2be9a9(0x3c5)])this['_logWindow']['push']('addText',TextManager[_0x2be9a9(0x1a4)][_0x2be9a9(0x732)]($gameParty[_0x2be9a9(0x880)]())),this[_0x2be9a9(0x5ae)][_0x2be9a9(0x7cc)](_0x2be9a9(0x6a7));else this[_0x2be9a9(0x2f8)]&&(this[_0x2be9a9(0x5ae)]['push'](_0x2be9a9(0x7f8),TextManager[_0x2be9a9(0x85f)][_0x2be9a9(0x732)]($gameParty['name']())),this['_logWindow']['push'](_0x2be9a9(0x6a7)));_0x1e68d6&&(this[_0x2be9a9(0x5ae)][_0x2be9a9(0x7cc)](_0x2be9a9(0x6a7)),this['_logWindow']['push'](_0x2be9a9(0x2e7))),this[_0x2be9a9(0x2e8)]()&&this['isSkipPartyCommandWindow']()&&(this['_tpbNeedsPartyCommand']=![]);},BattleManager[_0x19a075(0x695)]=function(){const _0x14b62b=_0x19a075;if(BattleManager[_0x14b62b(0x1fa)])return![];return VisuMZ['BattleCore'][_0x14b62b(0x7e0)]['Enemy'][_0x14b62b(0x93b)];},VisuMZ['BattleCore']['BattleManager_startInput']=BattleManager['startInput'],BattleManager['startInput']=function(){const _0x239e89=_0x19a075;VisuMZ[_0x239e89(0x73b)][_0x239e89(0x50b)][_0x239e89(0x2c6)](this),this['isDTB']()&&this[_0x239e89(0x4c4)]()&&!this[_0x239e89(0x2f8)]&&$gameParty[_0x239e89(0x781)]()&&this[_0x239e89(0x532)]();},BattleManager[_0x19a075(0x4c4)]=function(){const _0x404917=_0x19a075;return VisuMZ['BattleCore'][_0x404917(0x7e0)][_0x404917(0x72b)][_0x404917(0x330)];},BattleManager[_0x19a075(0x192)]=function(){const _0xed201d=_0x19a075;this[_0xed201d(0x5b4)]()&&this[_0xed201d(0x532)]();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x444)]=Scene_Battle[_0x19a075(0x475)][_0x19a075(0x764)],Scene_Battle[_0x19a075(0x475)][_0x19a075(0x764)]=function(){const _0xfc8f18=_0x19a075;VisuMZ['BattleCore'][_0xfc8f18(0x444)][_0xfc8f18(0x2c6)](this),BattleManager['isTpb']()&&BattleManager[_0xfc8f18(0x623)]&&(BattleManager['_tpbNeedsPartyCommand']=![],this['actorCommandCancelTPB']());},BattleManager[_0x19a075(0x40e)]=function(_0x113d37,_0x3a1c3a){const _0x166c1d=_0x19a075;this['_action']['_reflectionTarget']=_0x3a1c3a,this[_0x166c1d(0x5ae)][_0x166c1d(0x802)](_0x3a1c3a),this[_0x166c1d(0x5ae)][_0x166c1d(0x39d)](_0x113d37,this[_0x166c1d(0x1f4)]),this[_0x166c1d(0x1f4)]['apply'](_0x113d37),this[_0x166c1d(0x5ae)][_0x166c1d(0x2be)](_0x113d37,_0x113d37);},VisuMZ[_0x19a075(0x73b)]['BattleManager_makeActionOrders']=BattleManager[_0x19a075(0x707)],BattleManager[_0x19a075(0x707)]=function(){const _0x31ff95=_0x19a075;VisuMZ[_0x31ff95(0x73b)][_0x31ff95(0x78e)][_0x31ff95(0x2c6)](this),this['_actionBattlers']=this[_0x31ff95(0x80c)][_0x31ff95(0x53d)](_0x4731bf=>_0x4731bf&&_0x4731bf[_0x31ff95(0x387)]());},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x7f3)]=BattleManager[_0x19a075(0x5f5)],BattleManager[_0x19a075(0x5f5)]=function(_0x1c0899){const _0x5ce8d4=_0x19a075;if(this[_0x5ce8d4(0x8a9)]===_0x5ce8d4(0x848))this[_0x5ce8d4(0x367)]();else this[_0x5ce8d4(0x8a9)]===_0x5ce8d4(0x442)?this[_0x5ce8d4(0x403)]():VisuMZ[_0x5ce8d4(0x73b)][_0x5ce8d4(0x7f3)]['call'](this,_0x1c0899);},BattleManager[_0x19a075(0x1a0)]=function(){const _0x764c1a=_0x19a075;this[_0x764c1a(0x7b9)]=this[_0x764c1a(0x438)][_0x764c1a(0x484)](0x0),this['_targetIndex']=0x0,this[_0x764c1a(0x4f4)]=this['_allTargets'][0x0]||null,this[_0x764c1a(0x8a9)]='custom';},BattleManager[_0x19a075(0x367)]=function(){const _0x5f0aa8=_0x19a075;!this[_0x5f0aa8(0x807)]()&&!this['_logWindow'][_0x5f0aa8(0x596)]()&&(this[_0x5f0aa8(0x8a9)]='action');},BattleManager[_0x19a075(0x442)]=function(_0x487877){const _0x14468c=_0x19a075;this[_0x14468c(0x80c)][_0x14468c(0x8c3)](_0x487877);if(_0x487877===this[_0x14468c(0x886)])return;const _0x4e23ef=JsonEx[_0x14468c(0x538)](_0x487877[_0x14468c(0x879)]());this[_0x14468c(0x1db)]['push']([_0x487877,_0x4e23ef]);},BattleManager['processForcedAction']=function(){},BattleManager['updateStart']=function(){const _0x565825=_0x19a075;if(this[_0x565825(0x2e8)]())this[_0x565825(0x8a9)]=_0x565825(0x295);else this[_0x565825(0x1db)][_0x565825(0x644)]>0x0?this[_0x565825(0x8a9)]=_0x565825(0x295):this[_0x565825(0x2d3)]();},BattleManager[_0x19a075(0x923)]=function(){const _0xebbc52=_0x19a075,_0x233bfc=this[_0xebbc52(0x886)];_0x233bfc&&this[_0xebbc52(0x2e8)]()&&_0x233bfc[_0xebbc52(0x179)](_0xebbc52(0x212));for(;;){const _0x22ec10=this[_0xebbc52(0x5dd)]();if(!_0x22ec10)return null;if(_0x22ec10[_0xebbc52(0x482)]()&&_0x22ec10['isAlive']())return _0x22ec10;}},BattleManager[_0x19a075(0x5dd)]=function(){const _0x2676bc=_0x19a075;if(this[_0x2676bc(0x1db)][_0x2676bc(0x644)]>0x0){const _0x429d6f=this[_0x2676bc(0x1db)][_0x2676bc(0x2ee)](),_0x21b5bd=_0x429d6f[0x0];return _0x21b5bd['_actions']=_0x21b5bd[_0x2676bc(0x1e6)]||[],_0x21b5bd['_actions'][0x0]=_0x429d6f[0x1],_0x21b5bd;}else return this['_actionBattlers']['shift']();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x5c1)]=Game_Battler[_0x19a075(0x475)][_0x19a075(0x442)],Game_Battler[_0x19a075(0x475)][_0x19a075(0x442)]=function(_0x5b3661,_0x28e96e){const _0x47e7e7=_0x19a075;VisuMZ[_0x47e7e7(0x73b)]['Game_Battler_forceAction'][_0x47e7e7(0x2c6)](this,_0x5b3661,_0x28e96e),this[_0x47e7e7(0x1e6)][this[_0x47e7e7(0x1e6)][_0x47e7e7(0x644)]-0x1][_0x47e7e7(0x81e)]=!![];},Game_Interpreter[_0x19a075(0x475)][_0x19a075(0x224)]=function(_0x527a8a){const _0x56bfc8=_0x19a075;return this[_0x56bfc8(0x7b4)](_0x527a8a[0x0],_0x527a8a[0x1],_0x11462a=>{const _0x4707b0=_0x56bfc8;!_0x11462a['isDeathStateAffected']()&&(_0x11462a[_0x4707b0(0x442)](_0x527a8a[0x2],_0x527a8a[0x3]),BattleManager[_0x4707b0(0x442)](_0x11462a));}),!![];},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x564)]=Game_Battler[_0x19a075(0x475)]['makeSpeed'],Game_Battler[_0x19a075(0x475)]['makeSpeed']=function(){const _0x4afcdc=_0x19a075;VisuMZ['BattleCore'][_0x4afcdc(0x564)][_0x4afcdc(0x2c6)](this),this['_actions'][_0x4afcdc(0x644)]<=0x0&&(this['_speed']=Number[_0x4afcdc(0x6eb)]);},VisuMZ['BattleCore'][_0x19a075(0x1e9)]=BattleManager[_0x19a075(0x532)],BattleManager[_0x19a075(0x532)]=function(){const _0x3d580f=_0x19a075;this[_0x3d580f(0x2e8)]()?this[_0x3d580f(0x7c3)]():VisuMZ[_0x3d580f(0x73b)][_0x3d580f(0x1e9)][_0x3d580f(0x2c6)](this);},BattleManager[_0x19a075(0x7c3)]=function(){const _0x16d374=_0x19a075;if(this[_0x16d374(0x389)]){if(this[_0x16d374(0x389)]['selectNextCommand']())return;this[_0x16d374(0x7cb)](),this[_0x16d374(0x324)](),!this['_subject']&&!this[_0x16d374(0x389)]&&SceneManager[_0x16d374(0x3a8)][_0x16d374(0x7e2)]();}else!this[_0x16d374(0x886)]&&this[_0x16d374(0x649)]();},BattleManager['checkTpbInputClose']=function(){const _0x12c86e=_0x19a075;(!this[_0x12c86e(0x5b4)]()||this[_0x12c86e(0x23b)]())&&(this['_tpbSceneChangeCacheActor']&&(!$gameParty[_0x12c86e(0x280)]()[_0x12c86e(0x5d5)](this[_0x12c86e(0x386)])&&(this[_0x12c86e(0x386)]=null)),!this['_tpbSceneChangeCacheActor']?(this[_0x12c86e(0x4d4)](),this[_0x12c86e(0x389)]=null,this['_inputting']=![]):this[_0x12c86e(0x1be)]());},BattleManager[_0x19a075(0x1be)]=function(){const _0x4b3b69=_0x19a075;!$gameParty[_0x4b3b69(0x280)]()[_0x4b3b69(0x5d5)](this[_0x4b3b69(0x386)])&&(this['_tpbSceneChangeCacheActor']=null),this[_0x4b3b69(0x386)]?(this[_0x4b3b69(0x389)]=this[_0x4b3b69(0x386)],this['_currentActor']['_tpbState']=_0x4b3b69(0x641),this[_0x4b3b69(0x556)]=!![],this[_0x4b3b69(0x386)]=null):(this[_0x4b3b69(0x4d4)](),this[_0x4b3b69(0x389)]=null,this['_inputting']=![]);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x2f1)]=BattleManager[_0x19a075(0x79d)],BattleManager[_0x19a075(0x79d)]=function(){const _0x2b16cb=_0x19a075;return this['_phase']==='custom'?this[_0x2b16cb(0x201)]():VisuMZ[_0x2b16cb(0x73b)]['BattleManager_isTpbMainPhase'][_0x2b16cb(0x2c6)](this);},BattleManager[_0x19a075(0x201)]=function(){const _0x24deb6=_0x19a075;return this[_0x24deb6(0x59a)]();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x5a0)]=BattleManager['cancelActorInput'],BattleManager[_0x19a075(0x4d4)]=function(){const _0x30a08a=_0x19a075;this[_0x30a08a(0x2e8)]()&&this[_0x30a08a(0x8a9)]===_0x30a08a(0x775)&&(this['_currentActor']=null),VisuMZ[_0x30a08a(0x73b)][_0x30a08a(0x5a0)][_0x30a08a(0x2c6)](this);},VisuMZ['BattleCore'][_0x19a075(0x3b5)]=BattleManager[_0x19a075(0x33f)],BattleManager['inputtingAction']=function(){const _0x49c561=_0x19a075,_0x51a06c=this['_currentActor'];if(_0x51a06c&&!_0x51a06c['inputtingAction']()){const _0x12fbe2=_0x51a06c[_0x49c561(0x633)];_0x51a06c['_actions'][_0x12fbe2]=new Game_Action(_0x51a06c);}return VisuMZ[_0x49c561(0x73b)][_0x49c561(0x3b5)]['call'](this);},SceneManager[_0x19a075(0x553)]=function(){const _0x27e6e1=_0x19a075;return this['_scene']&&this[_0x27e6e1(0x3a8)][_0x27e6e1(0x3d5)]===Scene_Battle;},SceneManager[_0x19a075(0x7d3)]=function(){const _0xa985c2=_0x19a075;return Spriteset_Battle['prototype'][_0xa985c2(0x8ca)]();},SceneManager[_0x19a075(0x335)]=function(){const _0x3e0d9c=_0x19a075;if(SceneManager[_0x3e0d9c(0x3c4)](Scene_Options))return!![];return![];},SceneManager[_0x19a075(0x20c)]=function(){const _0x3651d6=_0x19a075;if(SceneManager[_0x3651d6(0x547)](Scene_Options))return!![];return![];},VisuMZ['BattleCore'][_0x19a075(0x54e)]=Game_Temp['prototype'][_0x19a075(0x1ab)],Game_Temp['prototype']['requestAnimation']=function(_0x2604f9,_0x515f81,_0x4f480b){const _0x21e4c7=_0x19a075;_0x2604f9=_0x2604f9[_0x21e4c7(0x53d)]((_0x3d618d,_0x5b96af,_0x94b788)=>_0x94b788[_0x21e4c7(0x93c)](_0x3d618d)===_0x5b96af),SceneManager[_0x21e4c7(0x553)]()&&SceneManager[_0x21e4c7(0x7d3)]()&&(_0x4f480b=!_0x4f480b),VisuMZ[_0x21e4c7(0x73b)][_0x21e4c7(0x54e)][_0x21e4c7(0x2c6)](this,_0x2604f9,_0x515f81,_0x4f480b),SceneManager['isSceneBattle']()&&BattleManager['_spriteset']['processAnimationRequests']();},Game_Temp[_0x19a075(0x475)][_0x19a075(0x47f)]=function(_0x3c8a86){const _0x4ca0b3=_0x19a075;this[_0x4ca0b3(0x417)]=_0x3c8a86;},Game_Temp[_0x19a075(0x475)][_0x19a075(0x806)]=function(){const _0x1110f9=_0x19a075;return this[_0x1110f9(0x417)];},Game_Temp['prototype'][_0x19a075(0x297)]=function(){const _0x90c20d=_0x19a075;this[_0x90c20d(0x7b2)]=undefined;},Game_Temp[_0x19a075(0x475)][_0x19a075(0x7f0)]=function(_0x2893c5){const _0xcaf604=_0x19a075;$gameMap&&$dataMap&&$dataMap[_0xcaf604(0x185)]&&this['parseForcedGameTroopSettingsBattleCore']($dataMap[_0xcaf604(0x185)]);const _0x443430=$dataTroops[_0x2893c5];_0x443430&&this[_0xcaf604(0x46e)](_0x443430['name']);},Game_Temp[_0x19a075(0x475)][_0x19a075(0x46e)]=function(_0x7392b0){const _0x11e706=_0x19a075;if(!_0x7392b0)return;if(_0x7392b0[_0x11e706(0x6c8)](/<(?:BATTLELAYOUT|BATTLE LAYOUT|LAYOUT):[ ](.*)>/i)){const _0x45d376=String(RegExp['$1']);if(_0x45d376[_0x11e706(0x6c8)](/DEFAULT/i))this[_0x11e706(0x7b2)]=_0x11e706(0x235);else{if(_0x45d376[_0x11e706(0x6c8)](/LIST/i))this[_0x11e706(0x7b2)]=_0x11e706(0x379);else{if(_0x45d376['match'](/XP/i))this[_0x11e706(0x7b2)]='xp';else{if(_0x45d376[_0x11e706(0x6c8)](/PORTRAIT/i))this['_forcedBattleLayout']=_0x11e706(0x53b);else{if(_0x45d376[_0x11e706(0x6c8)](/BORDER/i))this['_forcedBattleLayout']=_0x11e706(0x8d0);else _0x45d376[_0x11e706(0x6c8)](/(?:SIDEVIEW UI|SIDEVIEW)/i)&&(Imported[_0x11e706(0x356)]?this[_0x11e706(0x7b2)]=_0x11e706(0x351):this[_0x11e706(0x7b2)]=_0x11e706(0x235));}}}}}},VisuMZ['BattleCore']['Game_System_initialize']=Game_System[_0x19a075(0x475)][_0x19a075(0x2a0)],Game_System[_0x19a075(0x475)][_0x19a075(0x2a0)]=function(){const _0x131d96=_0x19a075;VisuMZ[_0x131d96(0x73b)]['Game_System_initialize'][_0x131d96(0x2c6)](this),this[_0x131d96(0x371)]();},Game_System[_0x19a075(0x475)]['initBattleCore']=function(){const _0x3b905d=_0x19a075;this['_defeatedEnemies']=this[_0x3b905d(0x6e7)]||[];},Game_System[_0x19a075(0x475)][_0x19a075(0x20a)]=function(){const _0x4bb672=_0x19a075;if(this[_0x4bb672(0x6e7)]===undefined)this[_0x4bb672(0x371)]();return this['_defeatedEnemies'];},Game_System[_0x19a075(0x475)][_0x19a075(0x1f5)]=function(_0x2ed577){const _0x2cd3cb=_0x19a075;if(this['_defeatedEnemies']===undefined)this[_0x2cd3cb(0x371)]();if(!_0x2ed577)return;if(this[_0x2cd3cb(0x6e7)][_0x2cd3cb(0x5d5)](_0x2ed577))return;this[_0x2cd3cb(0x6e7)][_0x2cd3cb(0x7cc)](_0x2ed577),this[_0x2cd3cb(0x6e7)][_0x2cd3cb(0x882)]((_0x1707a1,_0x5e2bc6)=>_0x1707a1-_0x5e2bc6);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x447)]=Game_BattlerBase[_0x19a075(0x475)][_0x19a075(0x329)],Game_BattlerBase['prototype'][_0x19a075(0x329)]=function(_0x5c4e83){const _0x39866d=_0x19a075,_0x46ebd6=this[_0x39866d(0x72e)](),_0x1af9bb=this['stateMotionIndex']();VisuMZ['BattleCore'][_0x39866d(0x447)][_0x39866d(0x2c6)](this,_0x5c4e83),this[_0x39866d(0x5a3)]()&&_0x46ebd6&&this[_0x39866d(0x64f)]()&&(this[_0x39866d(0x772)]=!this[_0x39866d(0x358)](),$gameSystem[_0x39866d(0x1f5)](this[_0x39866d(0x3ca)]())),SceneManager[_0x39866d(0x553)]()&&_0x1af9bb!==this['stateMotionIndex']()&&(this[_0x39866d(0x612)]()&&this['battler']()['refreshMotion']());},Game_Enemy[_0x19a075(0x475)]['hasBeenDefeatedBefore']=function(){const _0x356304=_0x19a075;return $gameSystem['getDefeatedEnemies']()[_0x356304(0x5d5)](this['_enemyId']);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x373)]=Game_BattlerBase['prototype']['eraseState'],Game_BattlerBase[_0x19a075(0x475)]['eraseState']=function(_0x2546f3){const _0x2a4f24=_0x19a075;VisuMZ[_0x2a4f24(0x73b)]['Game_BattlerBase_eraseState']['call'](this,_0x2546f3),this[_0x2a4f24(0x5a3)]()&&_0x2546f3===this[_0x2a4f24(0x39c)]()&&this[_0x2a4f24(0x72e)]()&&(this[_0x2a4f24(0x772)]=![]),SceneManager['isSceneBattle']()&&this[_0x2a4f24(0x45c)]();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x321)]=Game_Action[_0x19a075(0x475)][_0x19a075(0x2e7)],Game_Action[_0x19a075(0x475)][_0x19a075(0x2e7)]=function(){const _0x1d77d4=_0x19a075;VisuMZ[_0x1d77d4(0x73b)][_0x1d77d4(0x321)][_0x1d77d4(0x2c6)](this),this['_armorPenetration']={'arPenRate':0x0,'arPenFlat':0x0,'arRedRate':0x0,'arRedFlat':0x0},this['_multipliers']={'criticalHitRate':0x1,'criticalHitFlat':0x0,'criticalDmgRate':0x1,'criticalDmgFlat':0x0,'damageRate':0x1,'damageFlat':0x0,'hitRate':0x1,'hitFlat':0x0},this[_0x1d77d4(0x472)]=_0x1d77d4(0x235);},Game_Action[_0x19a075(0x475)]['makeDamageValue']=function(_0x237bda,_0x3f8194){const _0x571072=_0x19a075;return VisuMZ[_0x571072(0x73b)][_0x571072(0x7e0)][_0x571072(0x4d3)][_0x571072(0x944)][_0x571072(0x2c6)](this,_0x237bda,_0x3f8194);},Game_Action['prototype'][_0x19a075(0x8f0)]=function(_0x28f29a,_0x36ee5d){const _0x5660a3=_0x19a075;return VisuMZ[_0x5660a3(0x73b)]['Settings'][_0x5660a3(0x4d3)]['VarianceFormulaJS']['call'](this,_0x28f29a,_0x36ee5d);},Game_Action[_0x19a075(0x475)][_0x19a075(0x203)]=function(_0x20bc53,_0x2e3214){const _0x48ebd0=_0x19a075;return VisuMZ[_0x48ebd0(0x73b)][_0x48ebd0(0x7e0)][_0x48ebd0(0x4d3)][_0x48ebd0(0x497)]['call'](this,_0x20bc53,_0x2e3214);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x53a)]=Game_Action[_0x19a075(0x475)]['itemHit'],Game_Action[_0x19a075(0x475)][_0x19a075(0x700)]=function(_0x431bde){const _0x50aa22=_0x19a075,_0x40c862=this['item']()[_0x50aa22(0x185)];if(_0x40c862[_0x50aa22(0x6c8)](/<ALWAYS HIT>/i))return 0x1;else{if(_0x40c862[_0x50aa22(0x6c8)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return Number(RegExp['$1'])/0x64;else{let _0x5455bf=VisuMZ['BattleCore']['Game_Action_itemHit'][_0x50aa22(0x2c6)](this,_0x431bde);return _0x5455bf=this['_multipliers'][_0x50aa22(0x7a0)]*_0x5455bf+this['_multipliers'][_0x50aa22(0x291)],_0x5455bf;}}},Game_Action[_0x19a075(0x475)][_0x19a075(0x1ac)]=function(_0x57a0a3){const _0x3df385=_0x19a075;if(!this[_0x3df385(0x7ac)]()['damage'][_0x3df385(0x36c)])return 0x0;let _0xfe3634=VisuMZ['BattleCore'][_0x3df385(0x7e0)][_0x3df385(0x4d3)][_0x3df385(0x782)][_0x3df385(0x2c6)](this,_0x57a0a3);return _0xfe3634=this[_0x3df385(0x4b3)][_0x3df385(0x35e)]*_0xfe3634+this['_multipliers'][_0x3df385(0x462)],_0xfe3634;},Game_Action[_0x19a075(0x475)][_0x19a075(0x6ec)]=function(_0x1902c1){const _0x321805=_0x19a075;return _0x1902c1=VisuMZ[_0x321805(0x73b)][_0x321805(0x7e0)][_0x321805(0x4d3)][_0x321805(0x63c)][_0x321805(0x2c6)](this,_0x1902c1),_0x1902c1=this[_0x321805(0x4b3)][_0x321805(0x222)]*_0x1902c1+this[_0x321805(0x4b3)][_0x321805(0x2df)],_0x1902c1;},VisuMZ['BattleCore'][_0x19a075(0x1f0)]=Game_Action[_0x19a075(0x475)][_0x19a075(0x812)],Game_Action['prototype'][_0x19a075(0x812)]=function(_0x1e1b9c){const _0x2861e6=_0x19a075;if(this[_0x2861e6(0x472)]!==_0x2861e6(0x235))return this[_0x2861e6(0x198)](_0x1e1b9c);else return DataManager[_0x2861e6(0x21a)](this[_0x2861e6(0x7ac)]())===_0x2861e6(0x7df)?VisuMZ[_0x2861e6(0x73b)][_0x2861e6(0x1f0)][_0x2861e6(0x2c6)](this,_0x1e1b9c):this[_0x2861e6(0x457)](_0x1e1b9c);},Game_Action[_0x19a075(0x475)]['setCustomDamageFormula']=function(_0x11a36e){const _0x7286a1=_0x19a075;this[_0x7286a1(0x472)]=_0x11a36e;},Game_Action[_0x19a075(0x475)][_0x19a075(0x198)]=function(_0x61555c){const _0x21f2dc=_0x19a075,_0x39881=this[_0x21f2dc(0x7ac)](),_0x39a961=_0x39881[_0x21f2dc(0x239)][_0x21f2dc(0x555)];_0x39881[_0x21f2dc(0x239)][_0x21f2dc(0x555)]=this[_0x21f2dc(0x472)];let _0x3f9c57=VisuMZ[_0x21f2dc(0x73b)][_0x21f2dc(0x1f0)][_0x21f2dc(0x2c6)](this,_0x61555c);return _0x39881[_0x21f2dc(0x239)][_0x21f2dc(0x555)]=_0x39a961,_0x3f9c57;},Game_Action['prototype'][_0x19a075(0x2bd)]=function(){const _0xfb577f=_0x19a075;if(this[_0xfb577f(0x7ac)]()[_0xfb577f(0x185)][_0xfb577f(0x6c8)](/<DAMAGE STYLE:[ ](.*)>/i)){const _0x5eac9d=String(RegExp['$1'])[_0xfb577f(0x171)]()['trim']();return _0x5eac9d;}return'MANUAL';},Game_Action[_0x19a075(0x475)][_0x19a075(0x457)]=function(_0x1d3790){const _0x5ae1e5=_0x19a075,_0xbdfff=DataManager[_0x5ae1e5(0x21a)](this[_0x5ae1e5(0x7ac)]()),_0x563606=VisuMZ['DamageStyles'][_0xbdfff];try{return _0x563606[_0x5ae1e5(0x305)][_0x5ae1e5(0x2c6)](this,_0x1d3790);}catch(_0x5a0818){if($gameTemp[_0x5ae1e5(0x5b8)]())console[_0x5ae1e5(0x602)](_0x5a0818);return VisuMZ[_0x5ae1e5(0x73b)][_0x5ae1e5(0x1f0)][_0x5ae1e5(0x2c6)](this);}},Game_Action[_0x19a075(0x475)][_0x19a075(0x1c8)]=function(_0x251e7e,_0x170b5a){const _0x261b65=_0x19a075;if(this[_0x261b65(0x749)]())return _0x170b5a;const _0x41d9c9=this[_0x261b65(0x78d)](),_0x3825e8=_0x251e7e;let _0x3fdd96=[],_0x5ab7f7=[];_0x3fdd96['push'](this['_armorPenetration'][_0x261b65(0x681)],this['_armorPenetration'][_0x261b65(0x5cb)]),_0x5ab7f7[_0x261b65(0x7cc)](this['_armorPenetration'][_0x261b65(0x36b)],this['_armorPenetration']['arRedRate']);const _0x92ea19=this[_0x261b65(0x2dd)]()?/<ARMOR REDUCTION:[ ](\d+\.?\d*)>/i:/<MAGIC REDUCTION:[ ](\d+\.?\d*)>/i,_0x4e1b88=this[_0x261b65(0x2dd)]()?/<ARMOR REDUCTION:[ ](\d+\.?\d*)([%％])>/i:/<MAGIC REDUCTION:[ ](\d+\.?\d*)([%％])>/i,_0x58a98=this[_0x261b65(0x2dd)]()?/<ARMOR PENETRATION:[ ](\d+\.?\d*)>/i:/<MAGIC PENETRATION:[ ](\d+\.?\d*)>/i,_0xcb9c18=this[_0x261b65(0x2dd)]()?/<ARMOR PENETRATION:[ ](\d+\.?\d*)([%％])>/i:/<MAGIC PENETRATION:[ ](\d+\.?\d*)([%％])>/i;return _0x3fdd96=_0x3fdd96[_0x261b65(0x265)](_0x3825e8[_0x261b65(0x20f)]()['map'](_0x59baa3=>_0x59baa3&&_0x59baa3[_0x261b65(0x185)][_0x261b65(0x6c8)](_0x92ea19)?Number(RegExp['$1']):0x0)),_0x5ab7f7=_0x5ab7f7[_0x261b65(0x265)](_0x3825e8[_0x261b65(0x20f)]()['map'](_0x38e89c=>_0x38e89c&&_0x38e89c[_0x261b65(0x185)][_0x261b65(0x6c8)](_0x4e1b88)?Number(RegExp['$1'])/0x64:0x0)),_0x3fdd96=_0x3fdd96[_0x261b65(0x265)](_0x41d9c9['traitObjects']()[_0x261b65(0x4be)](_0xfa6e68=>_0xfa6e68&&_0xfa6e68[_0x261b65(0x185)][_0x261b65(0x6c8)](_0x58a98)?Number(RegExp['$1']):0x0)),_0x5ab7f7=_0x5ab7f7[_0x261b65(0x265)](_0x41d9c9[_0x261b65(0x20f)]()[_0x261b65(0x4be)](_0xf9032c=>_0xf9032c&&_0xf9032c[_0x261b65(0x185)][_0x261b65(0x6c8)](_0xcb9c18)?Number(RegExp['$1'])/0x64:0x0)),this['item']()[_0x261b65(0x185)]['match'](_0x58a98)&&_0x3fdd96['push'](Number(RegExp['$1'])),this[_0x261b65(0x7ac)]()[_0x261b65(0x185)][_0x261b65(0x6c8)](_0xcb9c18)&&_0x5ab7f7[_0x261b65(0x7cc)](Number(RegExp['$1'])),_0x170b5a=_0x3fdd96[_0x261b65(0x8b0)]((_0x2a2a25,_0x24a3c7)=>_0x2a2a25-_0x24a3c7,_0x170b5a),_0x170b5a>0x0&&(_0x170b5a=_0x5ab7f7[_0x261b65(0x8b0)]((_0x3fc88,_0x31f4fc)=>_0x3fc88*(0x1-_0x31f4fc),_0x170b5a)),_0x170b5a;},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x78b)]=Game_Action[_0x19a075(0x475)][_0x19a075(0x5ca)],Game_Action[_0x19a075(0x475)][_0x19a075(0x5ca)]=function(_0x4daf91,_0xf5f38f){const _0x3ccb55=_0x19a075;_0xf5f38f=_0xf5f38f*this['_multipliers'][_0x3ccb55(0x466)],_0xf5f38f+=this[_0x3ccb55(0x4b3)][_0x3ccb55(0x5a9)]*(_0xf5f38f>=0x0?0x1:-0x1),_0xf5f38f=this[_0x3ccb55(0x65f)](_0x3ccb55(0x617),_0x4daf91,_0xf5f38f,![]),_0xf5f38f=this[_0x3ccb55(0x514)](_0xf5f38f),_0xf5f38f=Math[_0x3ccb55(0x48a)](_0xf5f38f),this[_0x3ccb55(0x8a3)]=_0xf5f38f,this['_totalValue']=this['_totalValue']||0x0,this[_0x3ccb55(0x34a)]+=_0xf5f38f,VisuMZ[_0x3ccb55(0x73b)][_0x3ccb55(0x78b)]['call'](this,_0x4daf91,_0xf5f38f),this[_0x3ccb55(0x65f)](_0x3ccb55(0x621),_0x4daf91,_0xf5f38f,!![]);},Game_Action[_0x19a075(0x475)][_0x19a075(0x514)]=function(_0x48ea5a){const _0x36ea19=_0x19a075;if(this[_0x36ea19(0x725)]())return _0x48ea5a;return _0x48ea5a=this['applySoftDamageCap'](_0x48ea5a),_0x48ea5a=this['applyHardDamageCap'](_0x48ea5a),_0x48ea5a;},Game_Action[_0x19a075(0x475)][_0x19a075(0x725)]=function(){const _0x46da56=_0x19a075,_0x2db115=/<BYPASS DAMAGE CAP>/i;if(this['item']()['note'][_0x46da56(0x6c8)](_0x2db115))return!![];if(this['subject']()[_0x46da56(0x20f)]()['some'](_0x3e824f=>_0x3e824f&&_0x3e824f['note']['match'](_0x2db115)))return!![];return!VisuMZ['BattleCore']['Settings'][_0x46da56(0x4d3)]['EnableDamageCap'];},Game_Action['prototype']['applySoftDamageCap']=function(_0x14e5f0){const _0x2225a7=_0x19a075;if(!VisuMZ['BattleCore'][_0x2225a7(0x7e0)][_0x2225a7(0x4d3)][_0x2225a7(0x47b)])return _0x14e5f0;const _0x43daae=/<BYPASS SOFT DAMAGE CAP>/i;if(this['item']()['note'][_0x2225a7(0x6c8)](_0x43daae))return!![];if(this[_0x2225a7(0x78d)]()[_0x2225a7(0x20f)]()[_0x2225a7(0x21d)](_0x1f6266=>_0x1f6266&&_0x1f6266[_0x2225a7(0x185)][_0x2225a7(0x6c8)](_0x43daae)))return!![];const _0x49e749=_0x14e5f0<0x0?-0x1:0x1;_0x14e5f0=Math[_0x2225a7(0x244)](_0x14e5f0);let _0x389812=this[_0x2225a7(0x78d)]()['softDamageCapRate']();this[_0x2225a7(0x7ac)]()['note']['match'](/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i)&&(_0x389812+=Number(RegExp['$1'])/0x64);_0x389812=_0x389812[_0x2225a7(0x50d)](0.01,0x1);const _0x4dfcfa=this[_0x2225a7(0x3a3)](),_0x364c40=_0x389812*_0x4dfcfa;if(_0x14e5f0>_0x364c40&&_0x4dfcfa>_0x364c40){_0x14e5f0-=_0x364c40;const _0x39e565=VisuMZ[_0x2225a7(0x73b)][_0x2225a7(0x7e0)][_0x2225a7(0x4d3)][_0x2225a7(0x839)],_0x5d1c36=Math['max'](0x1-_0x14e5f0/((_0x4dfcfa-_0x364c40)*_0x39e565+_0x14e5f0),0.01);_0x14e5f0*=_0x5d1c36,_0x14e5f0+=_0x364c40;}return _0x14e5f0*_0x49e749;},Game_Action[_0x19a075(0x475)]['getHardDamageCap']=function(){const _0x3f1304=_0x19a075;return this[_0x3f1304(0x7ac)]()[_0x3f1304(0x185)][_0x3f1304(0x6c8)](/<DAMAGE CAP:[ ](\d+)>/i)?Number(RegExp['$1']):this[_0x3f1304(0x78d)]()['hardDamageCap']();},Game_Action['prototype'][_0x19a075(0x530)]=function(_0x7f632d){const _0x120be5=_0x19a075;let _0x3a84c4=this['getHardDamageCap']();return _0x7f632d[_0x120be5(0x50d)](-_0x3a84c4,_0x3a84c4);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x8a5)]=Game_Action['prototype']['apply'],Game_Action[_0x19a075(0x475)]['apply']=function(_0x17a6b6){const _0x102337=_0x19a075;this[_0x102337(0x65f)](_0x102337(0x2e9),_0x17a6b6,0x0,!![]),VisuMZ[_0x102337(0x73b)]['Game_Action_apply'][_0x102337(0x2c6)](this,_0x17a6b6),this[_0x102337(0x65f)](_0x102337(0x779),_0x17a6b6,this[_0x102337(0x8a3)]||0x0,!![]),this[_0x102337(0x60e)](_0x17a6b6);},Game_Action[_0x19a075(0x475)]['applyBattleCoreJS']=function(_0x4dbd05,_0x2f0d47,_0x435079,_0x313d72){const _0x2b2d64=_0x19a075;_0x435079=_0x435079||0x0;const _0x2aad55=_0x435079,_0x1cbd06=VisuMZ[_0x2b2d64(0x73b)][_0x2b2d64(0x7e0)][_0x2b2d64(0x679)],_0xa3cd27=_0x4dbd05[_0x2b2d64(0x732)]('');if(_0x1cbd06[_0xa3cd27]){_0x435079=_0x1cbd06[_0xa3cd27][_0x2b2d64(0x2c6)](this,_0x435079,_0x2f0d47);if(_0x313d72)_0x435079=_0x2aad55;}let _0x494247=VisuMZ[_0x2b2d64(0x73b)][_0x2b2d64(0x1a3)](this['item'](),_0x4dbd05[_0x2b2d64(0x732)](''));if(VisuMZ[_0x2b2d64(0x73b)]['JS'][_0x494247]){_0x435079=VisuMZ[_0x2b2d64(0x73b)]['JS'][_0x494247]['call'](this,this[_0x2b2d64(0x78d)](),_0x2f0d47,this[_0x2b2d64(0x7ac)](),_0x435079);if(_0x313d72)_0x435079=_0x2aad55;}for(const _0x59682e of this[_0x2b2d64(0x78d)]()[_0x2b2d64(0x20f)]()){if(!_0x59682e)continue;_0x494247=VisuMZ['BattleCore']['createKeyJS'](_0x59682e,_0x4dbd05[_0x2b2d64(0x732)](_0x2b2d64(0x196)));if(VisuMZ[_0x2b2d64(0x73b)]['JS'][_0x494247]){_0x435079=VisuMZ[_0x2b2d64(0x73b)]['JS'][_0x494247][_0x2b2d64(0x2c6)](this,this[_0x2b2d64(0x78d)](),_0x2f0d47,_0x59682e,_0x435079);if(_0x313d72)_0x435079=_0x2aad55;}}for(const _0x15dfdf of _0x2f0d47[_0x2b2d64(0x20f)]()){if(!_0x15dfdf)continue;_0x494247=VisuMZ[_0x2b2d64(0x73b)]['createKeyJS'](_0x15dfdf,_0x4dbd05[_0x2b2d64(0x732)](_0x2b2d64(0x8fd)));if(VisuMZ[_0x2b2d64(0x73b)]['JS'][_0x494247]){_0x435079=VisuMZ[_0x2b2d64(0x73b)]['JS'][_0x494247]['call'](this,this[_0x2b2d64(0x78d)](),_0x2f0d47,_0x15dfdf,_0x435079);if(_0x313d72)_0x435079=_0x2aad55;}}return _0x435079;},Game_Action[_0x19a075(0x475)][_0x19a075(0x42a)]=function(_0x43560c){const _0x326f20=_0x19a075,_0x226e13=this[_0x326f20(0x34a)]||0x0,_0x23c013=VisuMZ['BattleCore'][_0x326f20(0x7e0)]['Mechanics'],_0x3c9c6a=_0x43560c['format']('');_0x23c013[_0x3c9c6a]&&_0x23c013[_0x3c9c6a][_0x326f20(0x2c6)](this,_0x226e13);let _0x263323=VisuMZ[_0x326f20(0x73b)][_0x326f20(0x1a3)](this['item'](),_0x43560c);VisuMZ['BattleCore']['JS'][_0x263323]&&VisuMZ['BattleCore']['JS'][_0x263323]['call'](this,this['subject'](),this[_0x326f20(0x78d)](),this[_0x326f20(0x7ac)](),_0x226e13);for(const _0x58fc3d of this[_0x326f20(0x78d)]()[_0x326f20(0x20f)]()){if(!_0x58fc3d)continue;_0x263323=VisuMZ[_0x326f20(0x73b)][_0x326f20(0x1a3)](_0x58fc3d,_0x43560c),VisuMZ[_0x326f20(0x73b)]['JS'][_0x263323]&&VisuMZ[_0x326f20(0x73b)]['JS'][_0x263323][_0x326f20(0x2c6)](this,this[_0x326f20(0x78d)](),this[_0x326f20(0x78d)](),_0x58fc3d,_0x226e13);}},Game_Action[_0x19a075(0x475)][_0x19a075(0x7ba)]=function(){const _0x4c77c2=_0x19a075;return VisuMZ[_0x4c77c2(0x73b)][_0x4c77c2(0x7e0)][_0x4c77c2(0x679)][_0x4c77c2(0x5d6)][_0x4c77c2(0x2c6)](this);},Game_Action[_0x19a075(0x475)][_0x19a075(0x35a)]=function(){const _0x17d6da=_0x19a075;return VisuMZ[_0x17d6da(0x73b)][_0x17d6da(0x7e0)][_0x17d6da(0x679)][_0x17d6da(0x385)];},Game_Action[_0x19a075(0x475)][_0x19a075(0x2c9)]=function(){const _0x33ff80=_0x19a075;return this[_0x33ff80(0x7ac)]()[_0x33ff80(0x185)][_0x33ff80(0x6c8)](/<JS TARGETS>/i);},Game_Action[_0x19a075(0x475)][_0x19a075(0x78c)]=function(){const _0xce75e4=_0x19a075;if(!this[_0xce75e4(0x21c)]&&this[_0xce75e4(0x78d)]()['isConfused']())return![];if(this[_0xce75e4(0x2c9)]())return!![];return typeof this[_0xce75e4(0x7ac)]()[_0xce75e4(0x5ac)]==='string';},VisuMZ[_0x19a075(0x73b)]['Game_Action_isForOpponent']=Game_Action[_0x19a075(0x475)][_0x19a075(0x313)],Game_Action[_0x19a075(0x475)][_0x19a075(0x313)]=function(){const _0x4cfeef=_0x19a075;return this[_0x4cfeef(0x78c)]()&&!this['isCustomBattleScope']()?this[_0x4cfeef(0x27c)]():VisuMZ[_0x4cfeef(0x73b)][_0x4cfeef(0x83d)][_0x4cfeef(0x2c6)](this);},Game_Action[_0x19a075(0x475)][_0x19a075(0x27c)]=function(){const _0x39b53a=_0x19a075,_0x33e7bf=this['item']()[_0x39b53a(0x5ac)];return _0x33e7bf[_0x39b53a(0x6c8)](/(?:ENEMY|ENEMIES|FOE|FOES)/i);},VisuMZ[_0x19a075(0x73b)]['Game_Action_isForFriend']=Game_Action[_0x19a075(0x475)][_0x19a075(0x4f2)],Game_Action[_0x19a075(0x475)][_0x19a075(0x4f2)]=function(){const _0x165fb3=_0x19a075;return this[_0x165fb3(0x78c)]()&&!this[_0x165fb3(0x2c9)]()?this[_0x165fb3(0x81b)]():VisuMZ['BattleCore']['Game_Action_isForFriend']['call'](this);},Game_Action[_0x19a075(0x475)][_0x19a075(0x81b)]=function(){const _0x3484d7=_0x19a075,_0x49acd0=this[_0x3484d7(0x7ac)]()[_0x3484d7(0x5ac)];return _0x49acd0[_0x3484d7(0x6c8)](/(?:ALLY|ALLIES|FRIEND|FRIENDS)/i);},VisuMZ[_0x19a075(0x73b)]['Game_Action_isForRandom']=Game_Action[_0x19a075(0x475)][_0x19a075(0x5bc)],Game_Action[_0x19a075(0x475)][_0x19a075(0x5bc)]=function(){const _0x2d83c9=_0x19a075;return this[_0x2d83c9(0x78c)]()&&!this['isCustomBattleScope']()?this[_0x2d83c9(0x420)]():VisuMZ[_0x2d83c9(0x73b)]['Game_Action_isForRandom'][_0x2d83c9(0x2c6)](this);},Game_Action[_0x19a075(0x475)][_0x19a075(0x420)]=function(){const _0xabc567=_0x19a075,_0x34c5c7=this['item']()[_0xabc567(0x5ac)];return _0x34c5c7['match'](/(?:RAND|RANDOM)/i);},VisuMZ['BattleCore']['Game_Action_needsSelection']=Game_Action[_0x19a075(0x475)]['needsSelection'],Game_Action[_0x19a075(0x475)][_0x19a075(0x19b)]=function(){const _0x271411=_0x19a075;return this[_0x271411(0x78c)]()&&!this[_0x271411(0x2c9)]()?this[_0x271411(0x7ef)]():VisuMZ[_0x271411(0x73b)][_0x271411(0x8f1)][_0x271411(0x2c6)](this);},Game_Action['prototype']['needsSelectionBattleCore']=function(){const _0x1a5199=_0x19a075,_0x325222=this[_0x1a5199(0x7ac)]()['scope'];if(_0x325222[_0x1a5199(0x6c8)](/RANDOM/i))return![];return VisuMZ['BattleCore'][_0x1a5199(0x8f1)][_0x1a5199(0x2c6)](this);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x205)]=Game_Action[_0x19a075(0x475)][_0x19a075(0x33d)],Game_Action[_0x19a075(0x475)][_0x19a075(0x33d)]=function(){const _0x3b4fff=_0x19a075;let _0x12b8fc=[];return this[_0x3b4fff(0x78c)]()?_0x12b8fc=this[_0x3b4fff(0x5d1)]():_0x12b8fc=VisuMZ['BattleCore'][_0x3b4fff(0x205)][_0x3b4fff(0x2c6)](this),_0x12b8fc;},Game_Action[_0x19a075(0x475)]['makeTargetsBattleCore']=function(){const _0x589cbd=_0x19a075;let _0x2f3db6=[];const _0xd708c9=String(this['item']()[_0x589cbd(0x5ac)]),_0x263d33=VisuMZ[_0x589cbd(0x73b)][_0x589cbd(0x1a3)](this[_0x589cbd(0x7ac)](),_0x589cbd(0x6f7));if(VisuMZ[_0x589cbd(0x73b)]['JS'][_0x263d33]){const _0x5b5eac=VisuMZ[_0x589cbd(0x73b)][_0x589cbd(0x1a3)](this[_0x589cbd(0x7ac)](),'Targets');return _0x2f3db6=VisuMZ[_0x589cbd(0x73b)]['JS'][_0x5b5eac]['call'](this,this[_0x589cbd(0x78d)](),_0x2f3db6),this['repeatTargets'](_0x2f3db6);}if(_0xd708c9[_0x589cbd(0x6c8)](/(\d+) RANDOM ANY/i)){let _0x5a5b65=Number(RegExp['$1']);while(_0x5a5b65--){const _0x3f2f98=Math[_0x589cbd(0x1b1)](0x2)===0x0?this['opponentsUnit']():this['friendsUnit']();_0x2f3db6['push'](_0x3f2f98[_0x589cbd(0x25d)]());}return this[_0x589cbd(0x364)](_0x2f3db6);}if(_0xd708c9[_0x589cbd(0x6c8)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i)){let _0x2ae7ca=Number(RegExp['$1']);while(_0x2ae7ca--){_0x2f3db6[_0x589cbd(0x7cc)](this[_0x589cbd(0x7dd)]()[_0x589cbd(0x25d)]());}return this[_0x589cbd(0x364)](_0x2f3db6);}if(_0xd708c9[_0x589cbd(0x6c8)](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i)){let _0x1a4890=Number(RegExp['$1']);while(_0x1a4890--){_0x2f3db6[_0x589cbd(0x7cc)](this[_0x589cbd(0x37c)]()[_0x589cbd(0x25d)]());}return this[_0x589cbd(0x364)](_0x2f3db6);}if(_0xd708c9[_0x589cbd(0x6c8)](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x2f3db6[_0x589cbd(0x7cc)](...this[_0x589cbd(0x37c)]()[_0x589cbd(0x1ee)]()[_0x589cbd(0x53d)](_0x7d5184=>_0x7d5184!==this[_0x589cbd(0x78d)]())),this['repeatTargets'](_0x2f3db6);return VisuMZ[_0x589cbd(0x73b)][_0x589cbd(0x205)][_0x589cbd(0x2c6)](this);},Game_Action['prototype']['randomTargets']=function(_0x1e9dac){const _0x18471f=_0x19a075,_0x1eb0c5=[];for(let _0x1a1891=0x0;_0x1a1891<this[_0x18471f(0x26f)]();_0x1a1891++){_0x1eb0c5[_0x18471f(0x7cc)](_0x1e9dac['trueRandomTarget']());}return _0x1eb0c5;},Game_Action[_0x19a075(0x475)][_0x19a075(0x659)]=function(_0x2722e0){const _0x38535a=_0x19a075;if(!this[_0x38535a(0x7ac)]())return _0x2722e0;const _0x27d03c=this['item']()[_0x38535a(0x185)];return _0x2722e0;},VisuMZ[_0x19a075(0x73b)]['Game_Action_itemEffectAddAttackState']=Game_Action['prototype'][_0x19a075(0x7d6)],Game_Action[_0x19a075(0x475)][_0x19a075(0x7d6)]=function(_0xc1818a,_0x4177a9){const _0x118f88=_0x19a075,_0xc455db=_0xc1818a[_0x118f88(0x311)]();this['subject']()[_0x118f88(0x7a5)]()[_0x118f88(0x5d5)](_0xc1818a[_0x118f88(0x39c)]())&&_0xc1818a['setImmortal'](![]),VisuMZ[_0x118f88(0x73b)][_0x118f88(0x1e5)][_0x118f88(0x2c6)](this,_0xc1818a,_0x4177a9),_0xc1818a[_0x118f88(0x300)](_0xc455db);},VisuMZ['BattleCore']['Game_Action_itemEffectAddNormalState']=Game_Action[_0x19a075(0x475)]['itemEffectAddNormalState'],Game_Action[_0x19a075(0x475)]['itemEffectAddNormalState']=function(_0x391b76,_0x49f00c){const _0x2f1952=_0x19a075,_0x1fbe20=_0x391b76[_0x2f1952(0x311)]();_0x49f00c[_0x2f1952(0x643)]===_0x391b76[_0x2f1952(0x39c)]()&&_0x391b76[_0x2f1952(0x300)](![]),VisuMZ['BattleCore'][_0x2f1952(0x41d)][_0x2f1952(0x2c6)](this,_0x391b76,_0x49f00c),_0x391b76[_0x2f1952(0x300)](_0x1fbe20);},VisuMZ['BattleCore'][_0x19a075(0x542)]=Game_Action[_0x19a075(0x475)]['applyGlobal'],Game_Action[_0x19a075(0x475)][_0x19a075(0x5c8)]=function(){const _0x2cb7fc=_0x19a075;VisuMZ[_0x2cb7fc(0x73b)]['Game_Action_applyGlobal'][_0x2cb7fc(0x2c6)](this),this[_0x2cb7fc(0x93d)](),this[_0x2cb7fc(0x7d1)]();},Game_Action[_0x19a075(0x475)][_0x19a075(0x93d)]=function(){const _0x52235e=_0x19a075;if(!SceneManager['isSceneBattle']())return;const _0x428328=/<COMMON (?:EVENT|EVENTS):[ ](.*)>/gi,_0x166a09=this[_0x52235e(0x7ac)]()[_0x52235e(0x185)][_0x52235e(0x6c8)](_0x428328);if(_0x166a09)for(const _0x4f09c3 of _0x166a09){if(!_0x4f09c3)continue;_0x4f09c3['match'](_0x428328);const _0x1cdbe4=String(RegExp['$1'])[_0x52235e(0x428)](',')[_0x52235e(0x4be)](_0x248552=>String(_0x248552)[_0x52235e(0x431)]()),_0x13b805=_0x1cdbe4[_0x52235e(0x4be)](_0x54e377=>DataManager[_0x52235e(0x3fa)](_0x54e377));for(const _0x44f358 of _0x13b805){const _0x4a9b72=$dataCommonEvents[_0x44f358];_0x4a9b72&&$gameTemp[_0x52235e(0x526)](_0x44f358);}}},DataManager[_0x19a075(0x3fa)]=function(_0x5b6f40){const _0x2e9410=_0x19a075;_0x5b6f40=_0x5b6f40[_0x2e9410(0x171)]()[_0x2e9410(0x431)](),this[_0x2e9410(0x27e)]=this[_0x2e9410(0x27e)]||{};if(this['_commonEventIDs'][_0x5b6f40])return this[_0x2e9410(0x27e)][_0x5b6f40];for(const _0x158c19 of $dataCommonEvents){if(!_0x158c19)continue;let _0x52e0cc=_0x158c19[_0x2e9410(0x880)];_0x52e0cc=_0x52e0cc[_0x2e9410(0x89a)](/\x1I\[(\d+)\]/gi,''),_0x52e0cc=_0x52e0cc['replace'](/\\I\[(\d+)\]/gi,''),this[_0x2e9410(0x27e)][_0x52e0cc[_0x2e9410(0x171)]()[_0x2e9410(0x431)]()]=_0x158c19['id'];}return this[_0x2e9410(0x27e)][_0x5b6f40]||0x0;},Game_Action[_0x19a075(0x475)][_0x19a075(0x7d1)]=function(){const _0x201bd4=_0x19a075;if(!SceneManager[_0x201bd4(0x553)]())return;const _0x32c31c=VisuMZ['BattleCore'][_0x201bd4(0x7e0)][_0x201bd4(0x679)];_0x32c31c[_0x201bd4(0x85a)]&&$gameSwitches['setValue'](_0x32c31c[_0x201bd4(0x85a)],![]),_0x32c31c['SwitchMissEvade']&&$gameSwitches['setValue'](_0x32c31c['SwitchMissEvade'],![]),_0x32c31c['VariableDmg']&&$gameVariables[_0x201bd4(0x32e)](_0x32c31c[_0x201bd4(0x7b1)],0x0),_0x32c31c['VariableHeal']&&$gameVariables[_0x201bd4(0x32e)](_0x32c31c['VariableHeal'],0x0);},Game_Action[_0x19a075(0x475)][_0x19a075(0x60e)]=function(_0x18fb27){const _0x5640a1=_0x19a075;if(!SceneManager[_0x5640a1(0x553)]())return;if(!_0x18fb27)return;const _0xf022dd=_0x18fb27['result'](),_0x22df27=VisuMZ[_0x5640a1(0x73b)][_0x5640a1(0x7e0)]['Mechanics'];_0x22df27[_0x5640a1(0x85a)]&&_0xf022dd['critical']&&$gameSwitches[_0x5640a1(0x32e)](_0x22df27[_0x5640a1(0x85a)],!![]);_0x22df27[_0x5640a1(0x545)]&&(_0xf022dd['missed']||_0xf022dd[_0x5640a1(0x46a)])&&$gameSwitches[_0x5640a1(0x32e)](_0x22df27[_0x5640a1(0x545)],!![]);if(_0x22df27['VariableDmg']){let _0x20b7f8=$gameVariables['value'](_0x22df27['VariableDmg']);_0xf022dd['hpDamage']>0x0&&(_0x20b7f8+=Math[_0x5640a1(0x244)](_0xf022dd[_0x5640a1(0x48c)])),$gameVariables['setValue'](_0x22df27[_0x5640a1(0x7b1)],_0x20b7f8);}if(_0x22df27[_0x5640a1(0x83b)]){let _0x5cca7f=$gameVariables['value'](_0x22df27[_0x5640a1(0x83b)]);_0xf022dd[_0x5640a1(0x48c)]<0x0&&(_0x5cca7f+=Math[_0x5640a1(0x244)](_0xf022dd['hpDamage'])),$gameVariables[_0x5640a1(0x32e)](_0x22df27[_0x5640a1(0x83b)],_0x5cca7f);}},VisuMZ['BattleCore']['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x19a075(0x475)]['initMembers'],Game_BattlerBase[_0x19a075(0x475)]['initMembers']=function(){const _0x16d9cc=_0x19a075;VisuMZ[_0x16d9cc(0x73b)][_0x16d9cc(0x425)][_0x16d9cc(0x2c6)](this),this[_0x16d9cc(0x35f)]();},Game_BattlerBase[_0x19a075(0x475)]['initMembersBattleCore']=function(){const _0x30ef35=_0x19a075;this[_0x30ef35(0x2fb)]=![];},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x4d1)]=Game_BattlerBase[_0x19a075(0x475)]['refresh'],Game_BattlerBase['prototype'][_0x19a075(0x42f)]=function(){const _0x4e2e7f=_0x19a075;this[_0x4e2e7f(0x5ce)]={},VisuMZ[_0x4e2e7f(0x73b)][_0x4e2e7f(0x4d1)][_0x4e2e7f(0x2c6)](this);},Game_BattlerBase[_0x19a075(0x475)]['checkCacheKey']=function(_0x5b98ff){const _0x494e21=_0x19a075;return this[_0x494e21(0x5ce)]=this[_0x494e21(0x5ce)]||{},this[_0x494e21(0x5ce)][_0x5b98ff]!==undefined;},Game_BattlerBase['prototype'][_0x19a075(0x88e)]=function(){const _0x170372=_0x19a075;if(this[_0x170372(0x5ce)][_0x170372(0x88e)]!==undefined)return this[_0x170372(0x5ce)][_0x170372(0x88e)];const _0x3413e1=/<DAMAGE CAP:[ ](\d+)>/i,_0xe5f56a=this[_0x170372(0x20f)]()['map'](_0x1c74b4=>_0x1c74b4&&_0x1c74b4[_0x170372(0x185)]['match'](_0x3413e1)?Number(RegExp['$1']):0x0);let _0x9723d6=_0xe5f56a[_0x170372(0x644)]>0x0?Math[_0x170372(0x6aa)](..._0xe5f56a):0x0;if(_0x9723d6<=0x0)_0x9723d6=VisuMZ[_0x170372(0x73b)]['Settings'][_0x170372(0x4d3)][_0x170372(0x241)];return this[_0x170372(0x5ce)][_0x170372(0x88e)]=_0x9723d6,this['_cache'][_0x170372(0x88e)];},Game_BattlerBase[_0x19a075(0x475)][_0x19a075(0x881)]=function(){const _0x55380e=_0x19a075;if(this['_cache'][_0x55380e(0x5f9)]!==undefined)return this[_0x55380e(0x5ce)][_0x55380e(0x5f9)];let _0xeeaa20=VisuMZ[_0x55380e(0x73b)][_0x55380e(0x7e0)]['Damage']['DefaultSoftCap'];const _0x243b0c=/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i,_0x25e32c=this[_0x55380e(0x20f)]()[_0x55380e(0x4be)](_0xae4dee=>_0xae4dee&&_0xae4dee['note'][_0x55380e(0x6c8)](_0x243b0c)?Number(RegExp['$1'])/0x64:0x0);return _0xeeaa20=_0x25e32c[_0x55380e(0x8b0)]((_0x2bfd97,_0x33d70c)=>_0x2bfd97+_0x33d70c,_0xeeaa20),this[_0x55380e(0x5ce)]['softDamageCap']=_0xeeaa20,this[_0x55380e(0x5ce)]['softDamageCap']['clamp'](0.01,0x1);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x41a)]=Game_BattlerBase[_0x19a075(0x475)][_0x19a075(0x202)],Game_BattlerBase['prototype'][_0x19a075(0x202)]=function(){const _0x233fc3=_0x19a075;VisuMZ[_0x233fc3(0x73b)]['Game_BattlerBase_die'][_0x233fc3(0x2c6)](this),SceneManager['isSceneBattle']()&&this[_0x233fc3(0x68d)]('dead');},Game_BattlerBase['prototype'][_0x19a075(0x612)]=function(){const _0x4cc443=_0x19a075;if(!SceneManager[_0x4cc443(0x553)]())return null;if(!SceneManager[_0x4cc443(0x3a8)][_0x4cc443(0x525)])return null;return SceneManager[_0x4cc443(0x3a8)][_0x4cc443(0x525)][_0x4cc443(0x421)](this);},Game_BattlerBase[_0x19a075(0x475)][_0x19a075(0x64b)]=function(){const _0x661dec=_0x19a075;return VisuMZ['BattleCore']['Settings'][_0x661dec(0x72c)][_0x661dec(0x468)];},Game_BattlerBase[_0x19a075(0x475)][_0x19a075(0x25e)]=function(){const _0x1cc401=_0x19a075;return VisuMZ[_0x1cc401(0x73b)]['Settings'][_0x1cc401(0x72c)][_0x1cc401(0x2dc)];},Game_BattlerBase['prototype'][_0x19a075(0x8a0)]=function(){const _0x4f1472=_0x19a075;return this['isActor']&&this[_0x4f1472(0x34c)]()?VisuMZ['BattleCore']['Settings'][_0x4f1472(0x72c)][_0x4f1472(0x474)]:VisuMZ[_0x4f1472(0x73b)][_0x4f1472(0x7e0)][_0x4f1472(0x343)][_0x4f1472(0x474)];},Game_BattlerBase[_0x19a075(0x475)][_0x19a075(0x1ce)]=function(){return!![];},Game_BattlerBase['prototype'][_0x19a075(0x8d6)]=function(){return 0x0;},Game_BattlerBase['prototype'][_0x19a075(0x3b7)]=function(){return 0x0;},Game_BattlerBase[_0x19a075(0x475)]['createBattleUIOffsetX']=function(_0x29126e){const _0x574469=_0x19a075;if(!_0x29126e)return 0x0;let _0x120faa=0x0;const _0xc1817f=_0x29126e[_0x574469(0x185)];return _0xc1817f['match'](/<BATTLE UI OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x120faa+=Number(RegExp['$1'])),_0xc1817f['match'](/<BATTLE UI OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x120faa+=Number(RegExp['$1'])),_0x120faa;},Game_BattlerBase[_0x19a075(0x475)][_0x19a075(0x79e)]=function(_0xe0dd8c){const _0x584960=_0x19a075;if(!_0xe0dd8c)return 0x0;let _0x3baeae=0x0;const _0xf9c453=_0xe0dd8c[_0x584960(0x185)];return _0xf9c453[_0x584960(0x6c8)](/<BATTLE UI OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x3baeae+=Number(RegExp['$1'])),_0xf9c453['match'](/<BATTLE UI OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x3baeae+=Number(RegExp['$2'])),_0x3baeae;},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x31a)]=Game_BattlerBase[_0x19a075(0x475)][_0x19a075(0x2b4)],Game_BattlerBase[_0x19a075(0x475)][_0x19a075(0x2b4)]=function(_0x3ef930){const _0x5d8b58=_0x19a075;if(_0x3ef930===this[_0x5d8b58(0x39c)]()&&this[_0x5d8b58(0x311)]())return!![];return VisuMZ[_0x5d8b58(0x73b)]['Game_BattlerBase_isStateResist']['call'](this,_0x3ef930);},Game_BattlerBase[_0x19a075(0x475)][_0x19a075(0x311)]=function(){const _0x48024a=_0x19a075;return this[_0x48024a(0x2fb)];},Game_BattlerBase[_0x19a075(0x475)][_0x19a075(0x300)]=function(_0x13a5fa){_0x13a5fa?this['addImmortal']():this['removeImmortal']();},Game_BattlerBase[_0x19a075(0x475)][_0x19a075(0x567)]=function(){const _0x14533b=_0x19a075;if(this['isDead']())return;this[_0x14533b(0x2fb)]=!![];},Game_BattlerBase['prototype'][_0x19a075(0x5e2)]=function(){const _0x164245=_0x19a075,_0x566cc2=this['isAlive']();this['_immortal']=![],this[_0x164245(0x42f)](),this[_0x164245(0x64f)]()&&_0x566cc2&&(this[_0x164245(0x6d9)](),this[_0x164245(0x45c)]());},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x48e)]=Game_BattlerBase[_0x19a075(0x475)][_0x19a075(0x69e)],Game_BattlerBase[_0x19a075(0x475)][_0x19a075(0x69e)]=function(){const _0x1deedc=_0x19a075;if(!this['canAttackBattleCore']())return![];return VisuMZ[_0x1deedc(0x73b)][_0x1deedc(0x48e)][_0x1deedc(0x2c6)](this);},Game_BattlerBase[_0x19a075(0x475)][_0x19a075(0x317)]=function(){const _0x245ea6=_0x19a075;for(const _0x13a09c of this[_0x245ea6(0x20f)]()){if(!_0x13a09c)continue;if(_0x13a09c['note'][_0x245ea6(0x6c8)](/<(?:ATTACK SEAL|SEAL ATTACK)>/i))return![];}return!![];},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x3a0)]=Game_BattlerBase[_0x19a075(0x475)][_0x19a075(0x2d1)],Game_BattlerBase[_0x19a075(0x475)][_0x19a075(0x2d1)]=function(){const _0x346fc0=_0x19a075;if(!this[_0x346fc0(0x5d8)]())return![];return VisuMZ[_0x346fc0(0x73b)]['Game_BattlerBase_canGuard'][_0x346fc0(0x2c6)](this);},Game_BattlerBase['prototype'][_0x19a075(0x5d8)]=function(){const _0x38e5de=_0x19a075;for(const _0x148229 of this[_0x38e5de(0x20f)]()){if(!_0x148229)continue;if(_0x148229['note'][_0x38e5de(0x6c8)](/<(?:GUARD SEAL|SEAL GUARD)>/i))return![];}return!![];},Game_BattlerBase[_0x19a075(0x475)][_0x19a075(0x6e8)]=function(){const _0x58e509=_0x19a075;for(const _0x3a334b of this[_0x58e509(0x20f)]()){if(!_0x3a334b)continue;if(_0x3a334b[_0x58e509(0x185)][_0x58e509(0x6c8)](/<(?:ITEM SEAL|SEAL ITEM|SEAL ITEMS)>/i))return![];}return!![];},VisuMZ[_0x19a075(0x73b)]['Game_Battler_regenerateAll']=Game_Battler[_0x19a075(0x475)][_0x19a075(0x7c5)],Game_Battler[_0x19a075(0x475)][_0x19a075(0x7c5)]=function(){const _0x1bfa76=_0x19a075;if(SceneManager[_0x1bfa76(0x553)]()&&$gameTroop[_0x1bfa76(0x585)]()<=0x0)return;this[_0x1bfa76(0x22d)](_0x1bfa76(0x533)),VisuMZ['BattleCore'][_0x1bfa76(0x36d)][_0x1bfa76(0x2c6)](this),this[_0x1bfa76(0x731)](),this[_0x1bfa76(0x22d)]('PostRegenerateJS');},Game_Battler[_0x19a075(0x475)]['regenerateAllBattleCore']=function(){const _0x16da8f=_0x19a075;if(SceneManager['isSceneBattle']())for(const _0x1ebfae of this[_0x16da8f(0x20f)]()){if(!_0x1ebfae)continue;this[_0x16da8f(0x599)](_0x1ebfae);}},Game_Battler[_0x19a075(0x475)]['onRegeneratePlayStateAnimation']=function(_0x400d58){const _0x5957f6=_0x19a075;if(!Imported['VisuMZ_0_CoreEngine'])return;if(!SceneManager[_0x5957f6(0x553)]())return;if(this[_0x5957f6(0x64f)]())return;if(this[_0x5957f6(0x55b)]())return;if(_0x400d58[_0x5957f6(0x185)][_0x5957f6(0x6c8)](/<(?:REGENERATE|REGEN|DEGEN|DOT|SLIP)[ ]ANIMATION:[ ](\d+)>/i)){const _0x4b48fe=Number(RegExp['$1']);$gameTemp['requestFauxAnimation']([this],_0x4b48fe,![],![]);}},VisuMZ['BattleCore'][_0x19a075(0x83a)]=Game_Battler[_0x19a075(0x475)][_0x19a075(0x325)],Game_Battler[_0x19a075(0x475)][_0x19a075(0x325)]=function(){const _0x4ce35f=_0x19a075;this[_0x4ce35f(0x22d)](_0x4ce35f(0x5da)),VisuMZ[_0x4ce35f(0x73b)][_0x4ce35f(0x83a)][_0x4ce35f(0x2c6)](this),this[_0x4ce35f(0x22d)]('PostStartTurnJS');},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x84c)]=Game_Battler[_0x19a075(0x475)][_0x19a075(0x805)],Game_Battler[_0x19a075(0x475)][_0x19a075(0x805)]=function(){const _0x3db4c8=_0x19a075;this[_0x3db4c8(0x22d)](_0x3db4c8(0x6e6)),VisuMZ['BattleCore'][_0x3db4c8(0x84c)][_0x3db4c8(0x2c6)](this),this[_0x3db4c8(0x22d)](_0x3db4c8(0x176));},Game_Battler[_0x19a075(0x475)]['processBattleCoreJS']=function(_0x4f569f){const _0x5e3b31=_0x19a075,_0x523bae=VisuMZ[_0x5e3b31(0x73b)][_0x5e3b31(0x7e0)][_0x5e3b31(0x679)];if(_0x523bae[_0x4f569f])_0x523bae[_0x4f569f][_0x5e3b31(0x2c6)](this);for(const _0x6d205e of this[_0x5e3b31(0x20f)]()){if(!_0x6d205e)continue;key=VisuMZ[_0x5e3b31(0x73b)]['createKeyJS'](_0x6d205e,_0x4f569f),VisuMZ[_0x5e3b31(0x73b)]['JS'][key]&&VisuMZ[_0x5e3b31(0x73b)]['JS'][key][_0x5e3b31(0x2c6)](this,this,this,_0x6d205e,0x0);}},Game_Battler[_0x19a075(0x475)][_0x19a075(0x94e)]=function(){const _0x1bd62d=_0x19a075;return VisuMZ[_0x1bd62d(0x73b)][_0x1bd62d(0x7e0)][_0x1bd62d(0x72c)]['ChantStyle']||![];},Game_Battler[_0x19a075(0x475)]['isChanting']=function(){const _0x1b35cb=_0x19a075;if(this[_0x1b35cb(0x1a1)]()){if(this['chantStyle']()){if(this['_actions'][_0x1b35cb(0x21d)](_0x2833b7=>_0x2833b7[_0x1b35cb(0x7ac)]()&&_0x2833b7[_0x1b35cb(0x262)]()))return!![];}else{if(this[_0x1b35cb(0x1e6)][_0x1b35cb(0x21d)](_0x4a713f=>_0x4a713f[_0x1b35cb(0x7ac)]()&&_0x4a713f[_0x1b35cb(0x94a)]()))return!![];}}if(BattleManager[_0x1b35cb(0x2e8)]()&&this[_0x1b35cb(0x69f)]===_0x1b35cb(0x301))return this['chantStyle']()?this['currentAction']()&&this[_0x1b35cb(0x879)]()[_0x1b35cb(0x7ac)]()&&this[_0x1b35cb(0x879)]()[_0x1b35cb(0x262)]():this['currentAction']()&&this[_0x1b35cb(0x879)]()['item']()&&this[_0x1b35cb(0x879)]()[_0x1b35cb(0x94a)]();return![];},Game_Battler[_0x19a075(0x475)][_0x19a075(0x5fa)]=function(){const _0x54ee5b=_0x19a075;if(BattleManager[_0x54ee5b(0x2e8)]()&&this[_0x54ee5b(0x69f)]===_0x54ee5b(0x301))return this[_0x54ee5b(0x94e)]()?this[_0x54ee5b(0x879)]()&&this['currentAction']()[_0x54ee5b(0x7ac)]()&&!this['currentAction']()[_0x54ee5b(0x262)]():this['currentAction']()&&this[_0x54ee5b(0x879)]()[_0x54ee5b(0x7ac)]()&&!this[_0x54ee5b(0x879)]()[_0x54ee5b(0x94a)]();return![];},VisuMZ['BattleCore'][_0x19a075(0x67a)]=Game_Battler['prototype']['clearDamagePopup'],Game_Battler[_0x19a075(0x475)][_0x19a075(0x570)]=function(){const _0x1cf2d4=_0x19a075;VisuMZ[_0x1cf2d4(0x73b)][_0x1cf2d4(0x67a)]['call'](this),this[_0x1cf2d4(0x57b)]=[];},Game_Battler['prototype'][_0x19a075(0x895)]=function(){const _0x1475ee=_0x19a075;if(!this[_0x1475ee(0x57b)])this[_0x1475ee(0x570)]();return this['_damagePopupArray'][_0x1475ee(0x644)]>0x0;},Game_Battler[_0x19a075(0x475)][_0x19a075(0x2c8)]=function(){const _0x3d5c1a=_0x19a075;if(!SceneManager[_0x3d5c1a(0x553)]())return;if(!this[_0x3d5c1a(0x57b)])this[_0x3d5c1a(0x570)]();this[_0x3d5c1a(0x786)]();const _0x2945d3=this[_0x3d5c1a(0x612)]();if(_0x2945d3)_0x2945d3[_0x3d5c1a(0x485)]();},Game_Battler['prototype'][_0x19a075(0x786)]=function(){const _0x5017aa=_0x19a075,_0x50d266=this['result']();if(_0x50d266[_0x5017aa(0x1c6)]||_0x50d266['evaded']){const _0x411e7f=JsonEx['makeDeepCopy'](_0x50d266);_0x411e7f[_0x5017aa(0x8e2)]=![],_0x411e7f[_0x5017aa(0x5e1)]=0x0,this[_0x5017aa(0x57b)][_0x5017aa(0x7cc)](_0x411e7f);}if(_0x50d266[_0x5017aa(0x8e2)]){const _0x44c08d=JsonEx[_0x5017aa(0x538)](_0x50d266);_0x44c08d[_0x5017aa(0x1c6)]=![],_0x44c08d[_0x5017aa(0x46a)]=![],_0x44c08d[_0x5017aa(0x5e1)]=0x0,this[_0x5017aa(0x57b)][_0x5017aa(0x7cc)](_0x44c08d);}if(_0x50d266[_0x5017aa(0x5e1)]!==0x0){const _0x1fe33d=JsonEx[_0x5017aa(0x538)](_0x50d266);_0x1fe33d[_0x5017aa(0x1c6)]=![],_0x1fe33d[_0x5017aa(0x46a)]=![],_0x1fe33d[_0x5017aa(0x8e2)]=![],this['_damagePopupArray'][_0x5017aa(0x7cc)](_0x1fe33d);}},Game_Battler[_0x19a075(0x475)][_0x19a075(0x363)]=function(){const _0x1eecef=_0x19a075;if(!this[_0x1eecef(0x57b)])this['clearDamagePopup']();return VisuMZ[_0x1eecef(0x73b)][_0x1eecef(0x7e0)][_0x1eecef(0x4d3)][_0x1eecef(0x1af)]?this[_0x1eecef(0x57b)][_0x1eecef(0x2ee)]():this[_0x1eecef(0x57b)][_0x1eecef(0x745)]();},Game_Battler[_0x19a075(0x475)][_0x19a075(0x867)]=function(_0x4133e6,_0x1f11f3){const _0x2c0956=_0x19a075;if(!SceneManager[_0x2c0956(0x553)]())return;if(!this[_0x2c0956(0x612)]())return;if(_0x4133e6[_0x2c0956(0x644)]<=0x0)return;_0x1f11f3=_0x1f11f3||{},_0x1f11f3[_0x2c0956(0x1ad)]=_0x1f11f3[_0x2c0956(0x1ad)]||'#ffffff',_0x1f11f3['flashColor']=_0x1f11f3[_0x2c0956(0x8fa)]||[0x0,0x0,0x0,0x0],_0x1f11f3[_0x2c0956(0x90c)]=_0x1f11f3['flashDuration']||0x0,this[_0x2c0956(0x612)]()[_0x2c0956(0x867)](_0x4133e6,_0x1f11f3);},Game_Battler[_0x19a075(0x475)][_0x19a075(0x278)]=function(_0x3d08e6,_0x37ca71,_0xc47127){const _0x2686e3=_0x19a075;if(!SceneManager['isSceneBattle']())return;if(!this[_0x2686e3(0x612)]())return;if(_0x37ca71[_0x2686e3(0x644)]<=0x0)return;_0xc47127=_0xc47127||{},_0xc47127['textColor']=_0xc47127[_0x2686e3(0x1ad)]||'#ffffff',_0xc47127['flashColor']=_0xc47127[_0x2686e3(0x8fa)]||[0x0,0x0,0x0,0x0],_0xc47127[_0x2686e3(0x90c)]=_0xc47127[_0x2686e3(0x90c)]||0x0,this[_0x2686e3(0x612)]()[_0x2686e3(0x278)](_0x3d08e6,_0x37ca71,_0xc47127);},Game_Battler[_0x19a075(0x475)][_0x19a075(0x1d7)]=function(){const _0x32de9b=_0x19a075;if(this[_0x32de9b(0x55b)]())return![];if(this['isAlive']()&&this[_0x32de9b(0x387)]())return!![];if(this[_0x32de9b(0x5a3)]()&&this[_0x32de9b(0x7ed)]()){if(this[_0x32de9b(0x64f)]()&&this['allowCollapse']())return![];}else{if(this['isDead']())return![];}return!![];},VisuMZ[_0x19a075(0x73b)]['Game_Battler_clearMotion']=Game_Battler['prototype'][_0x19a075(0x7b6)],Game_Battler[_0x19a075(0x475)]['clearMotion']=function(){const _0x5daf0a=_0x19a075;VisuMZ[_0x5daf0a(0x73b)]['Game_Battler_clearMotion'][_0x5daf0a(0x2c6)](this),this[_0x5daf0a(0x7e5)]();},Game_Battler[_0x19a075(0x475)][_0x19a075(0x607)]=function(){return!![];},Game_Battler['prototype']['isBattlerGrounded']=function(){return![];},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x4a4)]=Game_Battler[_0x19a075(0x475)]['onBattleStart'],Game_Battler[_0x19a075(0x475)][_0x19a075(0x471)]=function(_0x16b341){const _0x4809b6=_0x19a075;VisuMZ[_0x4809b6(0x73b)][_0x4809b6(0x4a4)][_0x4809b6(0x2c6)](this,_0x16b341),this[_0x4809b6(0x243)](_0x16b341);},Game_Battler[_0x19a075(0x475)][_0x19a075(0x243)]=function(_0x52f178){this['setBattlerFlip'](![]);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x742)]=Game_Battler['prototype'][_0x19a075(0x226)],Game_Battler[_0x19a075(0x475)][_0x19a075(0x226)]=function(_0x4dc4e8){const _0x59edcc=_0x19a075;VisuMZ[_0x59edcc(0x73b)][_0x59edcc(0x742)]['call'](this,_0x4dc4e8);if(!_0x4dc4e8[_0x59edcc(0x28c)]()){const _0x3332ef=this[_0x59edcc(0x612)]();if(_0x3332ef)_0x3332ef[_0x59edcc(0x508)]();}this[_0x59edcc(0x21e)](![]);},Game_Battler[_0x19a075(0x475)][_0x19a075(0x3f2)]=function(){const _0x2960da=_0x19a075,_0x14e004=this[_0x2960da(0x1b3)];this[_0x2960da(0x1b3)]=![];if(BattleManager['isActiveTpb']()&&this[_0x2960da(0x405)]()){const _0x3d00f4=this[_0x2960da(0x612)]();if(_0x3d00f4&&_0x14e004)_0x3d00f4[_0x2960da(0x508)]();return;}const _0x534c1a=this[_0x2960da(0x612)]();if(_0x534c1a)_0x534c1a['stepBack']();this['setBattlerFlip'](![]),this['requestMotionRefresh']();},Game_Battler['prototype'][_0x19a075(0x85c)]=function(_0x11b036){const _0x54bfd9=_0x19a075;if(_0x11b036[_0x54bfd9(0x184)]())this[_0x54bfd9(0x86b)]();else{if(_0x11b036[_0x54bfd9(0x28c)]())this[_0x54bfd9(0x68d)](_0x54bfd9(0x808));else{if(_0x11b036[_0x54bfd9(0x262)]())this[_0x54bfd9(0x68d)](_0x54bfd9(0x1aa));else{if(_0x11b036['isSkill']())_0x11b036[_0x54bfd9(0x7ac)]()[_0x54bfd9(0x239)][_0x54bfd9(0x74d)]>0x0?this[_0x54bfd9(0x86b)]():this['requestMotion'](_0x54bfd9(0x8eb));else _0x11b036['isItem']()&&this[_0x54bfd9(0x68d)](_0x54bfd9(0x7ac));}}}},Game_Battler['prototype'][_0x19a075(0x6dc)]=function(){const _0x280957=_0x19a075;return $dataSystem[_0x280957(0x885)][0x0];},Game_Battler['prototype'][_0x19a075(0x81f)]=function(){const _0x10a4ce=_0x19a075,_0x35d998=this['getAttackMotion']();return _0x35d998?_0x35d998[_0x10a4ce(0x797)]:0x0;},Game_Battler[_0x19a075(0x475)][_0x19a075(0x24d)]=function(_0x21649d){const _0x44092e=_0x19a075;if(!$gameSystem[_0x44092e(0x50c)]())return;const _0x72ef48=this[_0x44092e(0x612)](),_0x51a882=_0x21649d[_0x44092e(0x612)]();if(!_0x72ef48||!_0x51a882)return;const _0x4a3983=_0x51a882[_0x44092e(0x5dc)],_0xc3c863=_0x51a882[_0x44092e(0x6b6)];this['moveBattlerToPoint'](_0x4a3983,_0xc3c863,0x0,![],'Linear',-0x1),_0x72ef48[_0x44092e(0x8ef)]();const _0x137fea=VisuMZ[_0x44092e(0x73b)]['Settings']['ActionSequence'];let _0x50ce1d=(_0x51a882['width']+_0x72ef48[_0x44092e(0x594)])/0x2;_0x50ce1d*=this[_0x44092e(0x34c)]()?0x1:-0x1;let _0x3d7698=_0x137fea[_0x44092e(0x3bc)]*(this[_0x44092e(0x34c)]()?0x1:-0x1);_0x21649d[_0x44092e(0x65a)](_0x50ce1d,_0x3d7698,0x0,![],_0x44092e(0x36a)),_0x51a882['updatePosition']();},Game_Battler[_0x19a075(0x475)]['requestMotion']=function(_0x1bc8f0){const _0xef3050=_0x19a075;if(SceneManager['isSceneBattle']()){const _0x1ac85f=this[_0xef3050(0x612)]();_0x1ac85f&&(_0x1ac85f[_0xef3050(0x6da)](_0x1bc8f0),[_0xef3050(0x587),_0xef3050(0x917),_0xef3050(0x3d6)][_0xef3050(0x5d5)](_0x1bc8f0)&&this[_0xef3050(0x261)]());}this[_0xef3050(0x7e5)]();},Game_Battler[_0x19a075(0x475)][_0x19a075(0x261)]=function(){},Game_Battler[_0x19a075(0x475)][_0x19a075(0x810)]=function(_0x662ebe){const _0x590380=_0x19a075;if(SceneManager['isSceneBattle']()){const _0x479754=this[_0x590380(0x612)]();if(_0x479754)_0x479754['forceWeaponAnimation'](_0x662ebe);}},Game_Battler[_0x19a075(0x475)][_0x19a075(0x6ab)]=function(){const _0x2a957d=_0x19a075;if(SceneManager[_0x2a957d(0x553)]()){const _0x3bdbf0=this[_0x2a957d(0x81f)]();this[_0x2a957d(0x810)](_0x3bdbf0);}},Game_Battler[_0x19a075(0x475)][_0x19a075(0x702)]=function(_0x20f3ed,_0x21de13){const _0x193d22=_0x19a075;if(!_0x20f3ed)return;if(!_0x20f3ed[_0x193d22(0x7ac)]())return;if(_0x20f3ed[_0x193d22(0x184)]())return;if(_0x20f3ed['isGuard']())return;if(_0x20f3ed['isItem']())return;let _0x389e99=0x0;const _0x5e3f1c=VisuMZ[_0x193d22(0x73b)][_0x193d22(0x7e0)][_0x193d22(0x41b)],_0x229c86=_0x20f3ed[_0x193d22(0x7ac)]()[_0x193d22(0x185)];if(_0x229c86['match'](/<CAST ANIMATION: (\d+)>/i))_0x389e99=Number(RegExp['$1']);else{if(_0x229c86[_0x193d22(0x6c8)](/<NO CAST ANIMATION>/i))return;else{if(_0x20f3ed[_0x193d22(0x749)]())_0x389e99=_0x5e3f1c[_0x193d22(0x271)];else{if(_0x20f3ed[_0x193d22(0x2dd)]())_0x389e99=_0x5e3f1c['CastPhysical'];else _0x20f3ed[_0x193d22(0x262)]()&&(_0x389e99=_0x5e3f1c[_0x193d22(0x5cf)]);}}}_0x389e99>0x0&&$gameTemp['requestAnimation']([this],_0x389e99,!!_0x21de13);},Game_Battler[_0x19a075(0x475)][_0x19a075(0x6a3)]=function(){const _0x4fc197=_0x19a075;SoundManager['playReflection']();let _0x3c6557=VisuMZ['BattleCore'][_0x4fc197(0x7e0)]['ActionSequence'][_0x4fc197(0x307)];_0x3c6557>0x0&&$gameTemp[_0x4fc197(0x1ab)]([this],_0x3c6557);},VisuMZ['BattleCore'][_0x19a075(0x207)]=Game_Battler[_0x19a075(0x475)][_0x19a075(0x5c4)],Game_Battler[_0x19a075(0x475)][_0x19a075(0x5c4)]=function(){const _0x2444d4=_0x19a075;VisuMZ[_0x2444d4(0x73b)][_0x2444d4(0x207)]['call'](this),this[_0x2444d4(0x4d5)]();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x18c)]=Game_Battler[_0x19a075(0x475)][_0x19a075(0x52a)],Game_Battler[_0x19a075(0x475)][_0x19a075(0x52a)]=function(){const _0x4c07b3=_0x19a075;VisuMZ['BattleCore'][_0x4c07b3(0x18c)][_0x4c07b3(0x2c6)](this),this[_0x4c07b3(0x4d5)]();},VisuMZ['BattleCore']['Game_Battler_performEvasion']=Game_Battler['prototype'][_0x19a075(0x3db)],Game_Battler[_0x19a075(0x475)][_0x19a075(0x3db)]=function(){const _0x490577=_0x19a075;VisuMZ['BattleCore'][_0x490577(0x57d)][_0x490577(0x2c6)](this),this[_0x490577(0x4d5)]();},Game_Battler['prototype'][_0x19a075(0x4d5)]=function(){const _0x5a9585=_0x19a075;if(!$gameSystem['isSideView']())return;if(this[_0x5a9585(0x1b3)])return;this[_0x5a9585(0x1b3)]=!![];const _0x589346=this[_0x5a9585(0x612)]();if(_0x589346)_0x589346[_0x5a9585(0x70e)]();},Game_Battler[_0x19a075(0x475)][_0x19a075(0x45c)]=function(){const _0x433540=_0x19a075;if(this[_0x433540(0x64f)]()&&this['_motionType']!=='dead'){this[_0x433540(0x68d)](_0x433540(0x430));return;}if(this['isDead']()&&this[_0x433540(0x8d2)]===_0x433540(0x430))return;if(!!this[_0x433540(0x2f4)])return;if(this['isEnemy']()){if(!this[_0x433540(0x927)]())this[_0x433540(0x612)]()[_0x433540(0x6a0)]();this['clearFreezeMotion']();return;}if(this['_motionType']==='victory')return;if(this[_0x433540(0x8d2)]==='escape'&&!BattleManager[_0x433540(0x405)]())return;if(this[_0x433540(0x8d2)]===_0x433540(0x808)&&!BattleManager[_0x433540(0x405)]())return;this[_0x433540(0x7b6)]();if(this['battler']()&&BattleManager[_0x433540(0x405)]()){this[_0x433540(0x612)]()['refreshMotion'](),this['clearFreezeMotion']();return;}},Game_Enemy['prototype']['isDuringNonLoopingMotion']=function(){const _0x470d03=_0x19a075;if(!this[_0x470d03(0x7ed)]())return![];const _0x53c668=this[_0x470d03(0x612)]();if(!_0x53c668)return![];const _0x36e9e4=_0x53c668[_0x470d03(0x4a0)];if(!_0x36e9e4)return![];const _0x355255=_0x36e9e4['_motion'];return _0x355255&&!_0x355255['loop'];},Game_Battler['prototype'][_0x19a075(0x787)]=function(){const _0x2744ff=_0x19a075;return this[_0x2744ff(0x52d)];},Game_Battler[_0x19a075(0x475)][_0x19a075(0x21e)]=function(_0x2a861a){const _0x5cdbb7=_0x19a075;if(!$gameSystem[_0x5cdbb7(0x50c)]())return;this[_0x5cdbb7(0x52d)]=_0x2a861a;const _0x4aff58=this[_0x5cdbb7(0x612)]();if(_0x4aff58)_0x4aff58[_0x5cdbb7(0x8a2)]();},Game_Battler[_0x19a075(0x475)]['setBattlerFacePoint']=function(_0x382c46,_0x5e16bc,_0x2c7a1f){const _0x2674d4=_0x19a075;if(!$gameSystem[_0x2674d4(0x50c)]())return;const _0x4727ef=this['battler']();if(!_0x4727ef)return;if(_0x382c46===_0x4727ef['_baseX'])return;let _0x192836=![];if(this[_0x2674d4(0x34c)]()){if(_0x382c46>_0x4727ef[_0x2674d4(0x5dc)])_0x192836=!![];if(_0x382c46<_0x4727ef[_0x2674d4(0x5dc)])_0x192836=![];}else{if(this[_0x2674d4(0x5a3)]()){if(_0x382c46>_0x4727ef['_baseX'])_0x192836=![];if(_0x382c46<_0x4727ef[_0x2674d4(0x5dc)])_0x192836=!![];}};this[_0x2674d4(0x21e)](_0x2c7a1f?!_0x192836:_0x192836),_0x4727ef[_0x2674d4(0x8a2)]();},Game_Battler[_0x19a075(0x475)][_0x19a075(0x65a)]=function(_0x521732,_0x57ffc1,_0x229c87,_0x3c4b2b,_0x13d3c8){const _0x4d8677=_0x19a075;if(!$gameSystem[_0x4d8677(0x50c)]())return;const _0x5388ad=this[_0x4d8677(0x612)]();if(!_0x5388ad)return;if(_0x3c4b2b)this[_0x4d8677(0x697)](_0x521732+_0x5388ad['_baseX'],_0x57ffc1+_0x5388ad['_baseY'],![]);_0x521732+=_0x5388ad[_0x4d8677(0x5dc)]-_0x5388ad[_0x4d8677(0x744)],_0x57ffc1+=_0x5388ad['_baseY']-_0x5388ad[_0x4d8677(0x90a)],_0x5388ad[_0x4d8677(0x478)](_0x521732,_0x57ffc1,_0x229c87);if(Imported[_0x4d8677(0x7b7)])_0x5388ad[_0x4d8677(0x8ad)](_0x13d3c8||_0x4d8677(0x36a));},Game_Battler['prototype'][_0x19a075(0x81a)]=function(_0x1af870,_0x1aa9e3,_0x244b21,_0x159d1b,_0xa7e1a9,_0x47f65b){const _0x5dcd9d=_0x19a075;if(!$gameSystem[_0x5dcd9d(0x50c)]())return;const _0x2bdb44=this[_0x5dcd9d(0x612)]();if(!_0x2bdb44)return;_0x47f65b=_0x47f65b||0x0;if(_0x47f65b>0x0){if(_0x2bdb44[_0x5dcd9d(0x5dc)]>_0x1af870)_0x1af870+=_0x2bdb44[_0x5dcd9d(0x594)]/0x2+_0x47f65b;if(_0x2bdb44['_baseX']<_0x1af870)_0x1af870-=_0x2bdb44[_0x5dcd9d(0x594)]/0x2+_0x47f65b;}if(_0x159d1b)this[_0x5dcd9d(0x697)](_0x1af870,_0x1aa9e3,![]);_0x1af870-=_0x2bdb44[_0x5dcd9d(0x744)],_0x1aa9e3-=_0x2bdb44[_0x5dcd9d(0x90a)],_0x2bdb44[_0x5dcd9d(0x478)](_0x1af870,_0x1aa9e3,_0x244b21);if(Imported[_0x5dcd9d(0x7b7)])_0x2bdb44[_0x5dcd9d(0x8ad)](_0xa7e1a9||_0x5dcd9d(0x36a));},Game_Battler['prototype']['floatBattler']=function(_0x480df2,_0x47a47e,_0x1842ee){const _0xe38248=_0x19a075;if(!$gameSystem[_0xe38248(0x50c)]())return;const _0x53fcd9=this[_0xe38248(0x612)]();if(!_0x53fcd9)return;_0x53fcd9[_0xe38248(0x815)](_0x480df2,_0x47a47e,_0x1842ee);},Game_Battler[_0x19a075(0x475)]['jumpBattler']=function(_0x1d0c11,_0x4db8ca){const _0x36c49b=_0x19a075;if(!$gameSystem[_0x36c49b(0x50c)]())return;const _0x3e7865=this[_0x36c49b(0x612)]();if(!_0x3e7865)return;_0x3e7865['startJump'](_0x1d0c11,_0x4db8ca);},Game_Battler[_0x19a075(0x475)]['spinBattler']=function(_0x3ae9d7,_0x5bc283,_0x283d4b,_0x1825f2){const _0xcd2315=_0x19a075;if(!$gameSystem[_0xcd2315(0x50c)]())return;const _0x4d7caf=this[_0xcd2315(0x612)]();if(!_0x4d7caf)return;_0x4d7caf[_0xcd2315(0x6ad)](_0x3ae9d7,_0x5bc283,_0x283d4b,_0x1825f2);},Game_Battler[_0x19a075(0x475)][_0x19a075(0x2a1)]=function(_0x3e9c1e,_0x179389,_0x9e55ec,_0x2163a5){const _0x590ec1=_0x19a075;if(!$gameSystem['isSideView']())return;const _0x383c5b=this[_0x590ec1(0x612)]();if(!_0x383c5b)return;this[_0x590ec1(0x34c)]()&&(_0x3e9c1e*=-0x1,_0x179389*=-0x1),_0x383c5b[_0x590ec1(0x3ed)](_0x3e9c1e,_0x179389,_0x9e55ec,_0x2163a5);},Game_Battler[_0x19a075(0x475)]['growBattler']=function(_0x5987a4,_0x3281bc,_0x36bb97,_0x2b333){const _0x126d52=_0x19a075;if(!$gameSystem[_0x126d52(0x50c)]())return;const _0x5de75b=this['battler']();if(!_0x5de75b)return;_0x5de75b[_0x126d52(0x2d5)](_0x5987a4,_0x3281bc,_0x36bb97,_0x2b333);},Game_Battler['prototype'][_0x19a075(0x515)]=function(_0x355974,_0x140813,_0x2ca2c2){const _0x34fb33=_0x19a075;if(!$gameSystem[_0x34fb33(0x50c)]())return;const _0x14b875=this[_0x34fb33(0x612)]();if(!_0x14b875)return;_0x14b875[_0x34fb33(0x177)](_0x355974,_0x140813,_0x2ca2c2);},Game_Battler[_0x19a075(0x475)][_0x19a075(0x7e5)]=function(){const _0x2c2eb2=_0x19a075,_0xc41628=!!this[_0x2c2eb2(0x2f4)];this[_0x2c2eb2(0x2f4)]=undefined,_0xc41628&&(this[_0x2c2eb2(0x45c)](),this[_0x2c2eb2(0x4d2)]());},Game_Battler[_0x19a075(0x475)][_0x19a075(0x4d2)]=function(){const _0x9e4c14=_0x19a075;if(!SceneManager[_0x9e4c14(0x553)]())return;const _0x2c47cc=this[_0x9e4c14(0x612)]();if(!_0x2c47cc)return;let _0x389065=this[_0x9e4c14(0x34c)]()?_0x2c47cc['_weaponSprite']:_0x2c47cc[_0x9e4c14(0x4a0)][_0x9e4c14(0x4c8)];_0x389065&&_0x389065[_0x9e4c14(0x8c0)](0x0);},Game_Battler[_0x19a075(0x475)][_0x19a075(0x8fc)]=function(_0x1234f0,_0x5bc177,_0x3b4b71){const _0x239ddd=_0x19a075;if(this['isEnemy']()&&!this[_0x239ddd(0x7ed)]())return;let _0x51d893=0x0,_0x4b11de=0x0;_0x1234f0['match'](/ATTACK[ ](\d+)/i)&&(_0x4b11de=Number(RegExp['$1']),_0x4b11de--);if(this[_0x239ddd(0x34c)]()){const _0x3de957=this['weapons']();_0x51d893=_0x3de957[_0x4b11de]?_0x3de957[_0x4b11de][_0x239ddd(0x17f)]:0x0;}else this[_0x239ddd(0x5a3)]()&&(_0x51d893=this[_0x239ddd(0x368)]()[_0x239ddd(0x17f)]||0x0);const _0x5e2eec=$dataSystem[_0x239ddd(0x885)][_0x51d893];_0x1234f0[_0x239ddd(0x6c8)](/attack/i)&&(_0x1234f0=[_0x239ddd(0x917),_0x239ddd(0x587),'missile'][_0x5e2eec[_0x239ddd(0x74d)]]||_0x239ddd(0x587)),this[_0x239ddd(0x2f4)]={'motionType':_0x1234f0,'weaponImageId':_0x5bc177?_0x5e2eec[_0x239ddd(0x797)]:0x0,'pattern':_0x3b4b71};},Game_Battler[_0x19a075(0x475)][_0x19a075(0x37b)]=function(_0x23facf){const _0x1c8974=_0x19a075;if(!_0x23facf)return![];return _0x23facf[_0x1c8974(0x37c)]()===this[_0x1c8974(0x37c)]();},Game_Battler[_0x19a075(0x475)][_0x19a075(0x1c7)]=function(_0x17b89c){const _0x19e906=_0x19a075;if(!_0x17b89c)return![];return _0x17b89c[_0x19e906(0x7dd)]()===this[_0x19e906(0x37c)]();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x7f9)]=Game_Actor[_0x19a075(0x475)][_0x19a075(0x8c0)],Game_Actor[_0x19a075(0x475)][_0x19a075(0x8c0)]=function(_0x73ecd3){const _0x13c7fb=_0x19a075;VisuMZ[_0x13c7fb(0x73b)][_0x13c7fb(0x7f9)][_0x13c7fb(0x2c6)](this,_0x73ecd3),this['initBattlePortrait']();},Game_Actor['prototype'][_0x19a075(0x598)]=function(){const _0x333dc8=_0x19a075;this[_0x333dc8(0x74a)]='',this[_0x333dc8(0x4c9)]()&&this[_0x333dc8(0x4c9)]()[_0x333dc8(0x185)][_0x333dc8(0x6c8)](/<BATTLE (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(this[_0x333dc8(0x74a)]=String(RegExp['$1']));},Game_Actor[_0x19a075(0x475)][_0x19a075(0x20e)]=function(){const _0x173581=_0x19a075;if(this[_0x173581(0x437)]()!=='')return this[_0x173581(0x437)]();else{if(Imported[_0x173581(0x302)]&&this[_0x173581(0x574)]()!=='')return this[_0x173581(0x574)]();}return'';},Game_Actor[_0x19a075(0x475)][_0x19a075(0x437)]=function(){const _0x1c7286=_0x19a075;if(this[_0x1c7286(0x74a)]===undefined)this[_0x1c7286(0x598)]();return this['_battlePortrait'];},Game_Actor[_0x19a075(0x475)][_0x19a075(0x4b0)]=function(_0x4ae26e){const _0x3e8ff2=_0x19a075;if(this['_battlePortrait']===undefined)this[_0x3e8ff2(0x598)]();this[_0x3e8ff2(0x74a)]=_0x4ae26e;if(SceneManager['isSceneBattle']()&&$gameParty[_0x3e8ff2(0x280)]()[_0x3e8ff2(0x5d5)](this)){const _0x300a65=SceneManager[_0x3e8ff2(0x3a8)]['_statusWindow'];if(_0x300a65)_0x300a65[_0x3e8ff2(0x7fe)](this);}},Game_Actor[_0x19a075(0x475)]['isSpriteVisible']=function(){return!![];},Game_Actor[_0x19a075(0x475)][_0x19a075(0x743)]=function(){const _0x59f03f=_0x19a075;if(!this[_0x59f03f(0x258)]()&&BattleManager[_0x59f03f(0x1fa)])return!![];return Game_Battler[_0x59f03f(0x475)][_0x59f03f(0x743)][_0x59f03f(0x2c6)](this);},VisuMZ['BattleCore'][_0x19a075(0x5ed)]=Game_Actor[_0x19a075(0x475)][_0x19a075(0x552)],Game_Actor['prototype'][_0x19a075(0x552)]=function(){const _0x1a5fce=_0x19a075;if(BattleManager[_0x1a5fce(0x1fa)]&&!ConfigManager[_0x1a5fce(0x339)])return this[_0x1a5fce(0x4b1)]();else{return VisuMZ['BattleCore'][_0x1a5fce(0x5ed)][_0x1a5fce(0x2c6)](this);;}},Game_Actor['prototype'][_0x19a075(0x4b1)]=function(){const _0xf4e241=[],_0xadbe8=new Game_Action(this);return _0xadbe8['setAttack'](),_0xf4e241['push'](_0xadbe8),_0xf4e241;},Game_Actor[_0x19a075(0x475)][_0x19a075(0x87c)]=function(){const _0x13c954=_0x19a075;return this[_0x13c954(0x2b2)]()[_0x13c954(0x185)]['match'](/<BATTLE COMMANDS>\s*([\s\S]*)\s*<\/BATTLE COMMANDS>/i)?String(RegExp['$1'])['split'](/[\r\n]+/):VisuMZ[_0x13c954(0x73b)]['Settings'][_0x13c954(0x2f2)][_0x13c954(0x846)];},Game_Actor[_0x19a075(0x475)][_0x19a075(0x64b)]=function(){const _0x3126c3=_0x19a075;if(this['_cache']['svAnchorX']!==undefined)return this[_0x3126c3(0x5ce)][_0x3126c3(0x71f)];return this[_0x3126c3(0x4c9)]()[_0x3126c3(0x185)][_0x3126c3(0x6c8)](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)?(this[_0x3126c3(0x5ce)][_0x3126c3(0x71f)]=eval(RegExp['$1']),this[_0x3126c3(0x5ce)][_0x3126c3(0x577)]=eval(RegExp['$2'])):this[_0x3126c3(0x5ce)][_0x3126c3(0x71f)]=Game_Battler[_0x3126c3(0x475)]['svBattlerAnchorX'][_0x3126c3(0x2c6)](this),this[_0x3126c3(0x5ce)]['svAnchorX'];},Game_Actor['prototype'][_0x19a075(0x25e)]=function(){const _0x14b15c=_0x19a075;if(this['_cache'][_0x14b15c(0x577)]!==undefined)return this[_0x14b15c(0x5ce)][_0x14b15c(0x577)];return this['actor']()[_0x14b15c(0x185)][_0x14b15c(0x6c8)](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)?(this[_0x14b15c(0x5ce)][_0x14b15c(0x71f)]=eval(RegExp['$1']),this[_0x14b15c(0x5ce)][_0x14b15c(0x577)]=eval(RegExp['$2'])):this[_0x14b15c(0x5ce)][_0x14b15c(0x577)]=Game_Battler['prototype'][_0x14b15c(0x25e)][_0x14b15c(0x2c6)](this),this[_0x14b15c(0x5ce)]['svAnchorY'];},Game_Actor[_0x19a075(0x475)][_0x19a075(0x8a0)]=function(){const _0x256532=_0x19a075;if(this['_cache'][_0x256532(0x728)]!==undefined)return this[_0x256532(0x5ce)][_0x256532(0x728)];if(this[_0x256532(0x4c9)]()[_0x256532(0x185)][_0x256532(0x6c8)](/<SIDEVIEW SHOW SHADOW>/i))this[_0x256532(0x5ce)][_0x256532(0x728)]=!![];else this[_0x256532(0x4c9)]()[_0x256532(0x185)][_0x256532(0x6c8)](/<SIDEVIEW HIDE SHADOW>/i)?this[_0x256532(0x5ce)][_0x256532(0x728)]=![]:this[_0x256532(0x5ce)]['svShadow']=Game_Battler['prototype'][_0x256532(0x8a0)][_0x256532(0x2c6)](this);return this[_0x256532(0x5ce)][_0x256532(0x728)];},Game_Actor['prototype'][_0x19a075(0x1ce)]=function(){const _0x300d4e=_0x19a075;return VisuMZ[_0x300d4e(0x73b)][_0x300d4e(0x7e0)][_0x300d4e(0x72c)][_0x300d4e(0x32b)];},Game_Actor[_0x19a075(0x475)][_0x19a075(0x261)]=function(){const _0x120e8d=_0x19a075,_0x479296=this[_0x120e8d(0x5b9)](),_0x1cc3b1=_0x479296[0x0]?_0x479296[0x0][_0x120e8d(0x17f)]:0x0,_0x5317e5=$dataSystem['attackMotions'][_0x1cc3b1];_0x5317e5&&this[_0x120e8d(0x810)](_0x5317e5[_0x120e8d(0x797)]);},Game_Actor[_0x19a075(0x475)]['performAction']=function(_0x5d8e83){const _0x4d217e=_0x19a075;Game_Battler['prototype'][_0x4d217e(0x645)][_0x4d217e(0x2c6)](this,_0x5d8e83),this[_0x4d217e(0x85c)](_0x5d8e83);},Game_Actor['prototype'][_0x19a075(0x6dc)]=function(){const _0x522051=_0x19a075,_0x3fcbab=this[_0x522051(0x5b9)](),_0x42e78c=_0x3fcbab[0x0]?_0x3fcbab[0x0][_0x522051(0x17f)]:0x0;return $dataSystem[_0x522051(0x885)][_0x42e78c];},Game_Actor[_0x19a075(0x475)][_0x19a075(0x75c)]=function(_0x1889d5){const _0x40c06c=_0x19a075;_0x1889d5=_0x1889d5||0x1,_0x1889d5--;const _0xb194be=this[_0x40c06c(0x5b9)]();return _0xb194be[_0x1889d5]?_0xb194be[_0x1889d5][_0x40c06c(0x62f)]:0x0;},Game_Actor['prototype'][_0x19a075(0x217)]=function(_0x6d0835){const _0x1e6ca0=_0x19a075;_0x6d0835=_0x6d0835||0x1,_0x6d0835--;const _0x2740e7=this[_0x1e6ca0(0x5b9)](),_0x4b39b4=_0x2740e7[_0x6d0835]?_0x2740e7[_0x6d0835][_0x1e6ca0(0x17f)]:0x0;return $dataSystem[_0x1e6ca0(0x885)][_0x4b39b4];},Game_Actor[_0x19a075(0x475)][_0x19a075(0x25a)]=function(_0x10a457){const _0x2f5935=_0x19a075;_0x10a457=_0x10a457||0x1,_0x10a457--;const _0x1b17b2=this[_0x2f5935(0x5b9)](),_0x45ae07=_0x1b17b2[_0x10a457]?_0x1b17b2[_0x10a457][_0x2f5935(0x17f)]:0x0,_0x17e19c=$dataSystem[_0x2f5935(0x885)][_0x45ae07];if(_0x17e19c){if(_0x17e19c[_0x2f5935(0x74d)]===0x0)this[_0x2f5935(0x68d)]('thrust');else{if(_0x17e19c[_0x2f5935(0x74d)]===0x1)this[_0x2f5935(0x68d)](_0x2f5935(0x587));else _0x17e19c[_0x2f5935(0x74d)]===0x2&&this[_0x2f5935(0x68d)](_0x2f5935(0x3d6));}this[_0x2f5935(0x810)](_0x17e19c[_0x2f5935(0x797)]);}},Game_Battler['prototype']['setActiveWeaponSlot']=function(_0x449a47){const _0x519570=_0x19a075;this[_0x519570(0x7e9)]=_0x449a47||0x0;},Game_Battler[_0x19a075(0x475)][_0x19a075(0x4e9)]=function(){const _0x1cc4b8=_0x19a075;this[_0x1cc4b8(0x7e9)]=this[_0x1cc4b8(0x7e9)]||0x0,this['_activeWeaponSlot']++;},Game_Battler[_0x19a075(0x475)]['clearActiveWeaponSlot']=function(){const _0x59ea47=_0x19a075;this[_0x59ea47(0x7e9)]=undefined;},VisuMZ['BattleCore'][_0x19a075(0x64e)]=Game_Actor[_0x19a075(0x475)]['equips'],Game_Actor[_0x19a075(0x475)]['equips']=function(){const _0x5b0ca1=_0x19a075;let _0x26c98e=VisuMZ[_0x5b0ca1(0x73b)][_0x5b0ca1(0x64e)]['call'](this);if(this[_0x5b0ca1(0x3e7)])return _0x26c98e;if(this[_0x5b0ca1(0x7e9)]!==undefined){this[_0x5b0ca1(0x3e7)]=!![];const _0x598277=this[_0x5b0ca1(0x4a3)]();for(let _0x5d47c8=0x0;_0x5d47c8<_0x598277[_0x5b0ca1(0x644)];_0x5d47c8++){_0x598277[_0x5d47c8]===0x1&&this[_0x5b0ca1(0x7e9)]!==_0x5d47c8&&(_0x26c98e[_0x5d47c8]=null);}this['_tempEquipCheck']=undefined;}return _0x26c98e;},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x94f)]=function(_0x1f1c08){const _0x323678=_0x19a075;return _0x1f1c08[_0x323678(0x34c)]()?_0x1f1c08['weapons']()[_0x323678(0x644)]||0x1:0x1;},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x686)]=function(_0x355a17,_0xefa01d){const _0x9c77c0=_0x19a075;_0x355a17&&_0x355a17[_0x9c77c0(0x34c)]()&&_0x355a17[_0x9c77c0(0x39e)](_0xefa01d),this['callNextMethod']();},Window_BattleLog[_0x19a075(0x475)]['clearActiveWeaponSet']=function(_0xa57461){const _0x59d34c=_0x19a075;_0xa57461&&_0xa57461[_0x59d34c(0x34c)]()&&_0xa57461['clearActiveWeaponSlot'](),this['callNextMethod']();},Game_Actor['prototype'][_0x19a075(0x8d6)]=function(){const _0x1d0927=_0x19a075;let _0x51cbe4=_0x1d0927(0x8d6);if(this[_0x1d0927(0x8e9)](_0x51cbe4))return this[_0x1d0927(0x5ce)][_0x51cbe4];return this[_0x1d0927(0x5ce)][_0x51cbe4]=this[_0x1d0927(0x942)](this[_0x1d0927(0x4c9)]()),this[_0x1d0927(0x5ce)][_0x51cbe4];},Game_Actor['prototype'][_0x19a075(0x3b7)]=function(){const _0x21b236=_0x19a075;let _0x3869c9=_0x21b236(0x3b7);if(this[_0x21b236(0x8e9)](_0x3869c9))return this[_0x21b236(0x5ce)][_0x3869c9];return this['_cache'][_0x3869c9]=this['createBattleUIOffsetY'](this[_0x21b236(0x4c9)]()),this['_cache'][_0x3869c9];},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x338)]=Game_Enemy[_0x19a075(0x475)][_0x19a075(0x8c0)],Game_Enemy[_0x19a075(0x475)][_0x19a075(0x8c0)]=function(_0x3740d9,_0x5c54ff,_0x44729f){const _0x469898=_0x19a075;_0x3740d9=DataManager[_0x469898(0x798)](_0x3740d9),VisuMZ[_0x469898(0x73b)][_0x469898(0x338)]['call'](this,_0x3740d9,_0x5c54ff,_0x44729f),Imported[_0x469898(0x3c9)]&&this[_0x469898(0x544)](),this[_0x469898(0x1c1)](),this[_0x469898(0x580)](),Imported['VisuMZ_1_ElementStatusCore']&&this['recoverAll']();},Game_Enemy[_0x19a075(0x475)][_0x19a075(0x1c1)]=function(){const _0x2f61c0=_0x19a075,_0x523d3e=VisuMZ['BattleCore'][_0x2f61c0(0x7e0)][_0x2f61c0(0x343)];this['_attackAnimationId']=_0x523d3e[_0x2f61c0(0x8d5)],this[_0x2f61c0(0x6bd)]={};},Game_Enemy[_0x19a075(0x475)][_0x19a075(0x580)]=function(){const _0x18b09d=_0x19a075,_0xc5deda=VisuMZ[_0x18b09d(0x73b)][_0x18b09d(0x7e0)][_0x18b09d(0x343)],_0x96442e=this[_0x18b09d(0x887)]()[_0x18b09d(0x185)];this[_0x18b09d(0x6bd)]={'name':'','wtypeId':_0xc5deda[_0x18b09d(0x5f0)],'collapse':_0xc5deda[_0x18b09d(0x7da)],'motionIdle':_0xc5deda[_0x18b09d(0x23e)],'width':_0xc5deda[_0x18b09d(0x63f)]||0x40,'height':_0xc5deda[_0x18b09d(0x227)]||0x40,'anchorX':_0xc5deda['AnchorX']||0x0,'anchorY':_0xc5deda[_0x18b09d(0x2dc)]||0x0,'shadow':_0xc5deda[_0x18b09d(0x474)]};_0x96442e[_0x18b09d(0x6c8)](/<ATTACK ANIMATION:[ ](\d+)>/i)&&(this[_0x18b09d(0x60f)]=Number(RegExp['$1']));const _0x51d22c=this[_0x18b09d(0x6bd)];if(_0x96442e[_0x18b09d(0x6c8)](/<SIDEVIEW BATTLER: (.*)>/i))_0x51d22c[_0x18b09d(0x880)]=String(RegExp['$1']);else{if(_0x96442e['match'](/<SIDEVIEW BATTLERS>\s*([\s\S]*)\s*<\/SIDEVIEW BATTLERS>/i)){const _0x499fb3=String(RegExp['$1'])['split'](/[\r\n]+/)[_0x18b09d(0x8c3)]('');_0x51d22c[_0x18b09d(0x880)]=DataManager[_0x18b09d(0x3ea)](_0x499fb3);}}_0x96442e[_0x18b09d(0x6c8)](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)&&(_0x51d22c[_0x18b09d(0x174)]=eval(RegExp['$1']),_0x51d22c[_0x18b09d(0x3b0)]=eval(RegExp['$2']));if(_0x96442e[_0x18b09d(0x6c8)](/<SIDEVIEW COLLAPSE>/i))_0x51d22c[_0x18b09d(0x23c)]=!![];else _0x96442e['match'](/<SIDEVIEW NO COLLAPSE>/i)&&(_0x51d22c[_0x18b09d(0x23c)]=![]);if(_0x96442e[_0x18b09d(0x6c8)](/<SIDEVIEW SHOW SHADOW>/i))_0x51d22c['shadow']=!![];else _0x96442e['match'](/<SIDEVIEW HIDE SHADOW>/i)&&(_0x51d22c[_0x18b09d(0x560)]=![]);if(_0x96442e[_0x18b09d(0x6c8)](/<SIDEVIEW IDLE MOTION: (.*)>/i))_0x51d22c['motionIdle']=String(RegExp['$1'])[_0x18b09d(0x4d9)]()['trim']();else{if(_0x96442e['match'](/<SIDEVIEW IDLE MOTIONS>\s*([\s\S]*)\s*<\/SIDEVIEW IDLE MOTIONS>/i)){const _0xae5ef9=String(RegExp['$1'])[_0x18b09d(0x428)](/[\r\n]+/)[_0x18b09d(0x8c3)]('');_0x51d22c[_0x18b09d(0x6ee)]=DataManager[_0x18b09d(0x3ea)](_0xae5ef9);}}_0x96442e[_0x18b09d(0x6c8)](/<SIDEVIEW SIZE: (\d+), (\d+)>/i)&&(_0x51d22c[_0x18b09d(0x594)]=Number(RegExp['$1']),_0x51d22c[_0x18b09d(0x87b)]=Number(RegExp['$2']));if(_0x96442e['match'](/<SIDEVIEW WEAPON: (.*)>/i))_0x51d22c[_0x18b09d(0x17f)]=DataManager[_0x18b09d(0x819)](RegExp['$1']);else{if(_0x96442e[_0x18b09d(0x6c8)](/<SIDEVIEW WEAPONS>\s*([\s\S]*)\s*<\/SIDEVIEW WEAPONS>/i)){const _0x4f0313=String(RegExp['$1'])[_0x18b09d(0x428)](/[\r\n]+/)[_0x18b09d(0x8c3)](''),_0x257139=DataManager[_0x18b09d(0x3ea)](_0x4f0313);_0x51d22c['wtypeId']=DataManager[_0x18b09d(0x819)](_0x257139);}}if(Imported[_0x18b09d(0x3c9)]){const _0x4c5e43=this[_0x18b09d(0x752)]();for(const _0xe026bb of _0x4c5e43){const _0x5ee5d3=this['traitSet'](_0xe026bb)['Name'][_0x18b09d(0x171)]()['trim'](),_0x42e6d2=_0xe026bb[_0x18b09d(0x171)]()[_0x18b09d(0x431)]();if(_0x96442e['match'](VisuMZ[_0x18b09d(0x190)][_0x18b09d(0x774)]['SvBattlerSolo-%1-%2'[_0x18b09d(0x732)](_0x42e6d2,_0x5ee5d3)]))_0x51d22c['name']=String(RegExp['$1']);else{if(_0x96442e[_0x18b09d(0x6c8)](VisuMZ[_0x18b09d(0x190)][_0x18b09d(0x774)][_0x18b09d(0x586)['format'](_0x42e6d2,_0x5ee5d3)])){const _0x1f4982=String(RegExp['$1'])[_0x18b09d(0x428)](/[\r\n]+/)[_0x18b09d(0x8c3)]('');_0x51d22c[_0x18b09d(0x880)]=DataManager[_0x18b09d(0x3ea)](_0x1f4982);}}if(_0x96442e[_0x18b09d(0x6c8)](VisuMZ[_0x18b09d(0x190)][_0x18b09d(0x774)][_0x18b09d(0x592)['format'](_0x42e6d2,_0x5ee5d3)]))_0x51d22c['wtypeId']=DataManager[_0x18b09d(0x819)](RegExp['$1']);else{if(_0x96442e[_0x18b09d(0x6c8)](VisuMZ[_0x18b09d(0x190)][_0x18b09d(0x774)][_0x18b09d(0x252)[_0x18b09d(0x732)](_0x42e6d2,_0x5ee5d3)])){const _0x5d99d3=String(RegExp['$1'])[_0x18b09d(0x428)](/[\r\n]+/)['remove'](''),_0x2328a2=DataManager[_0x18b09d(0x3ea)](_0x5d99d3);_0x51d22c[_0x18b09d(0x17f)]=DataManager[_0x18b09d(0x819)](_0x2328a2);}}if(_0x96442e[_0x18b09d(0x6c8)](VisuMZ[_0x18b09d(0x190)][_0x18b09d(0x774)][_0x18b09d(0x509)['format'](_0x42e6d2,_0x5ee5d3)]))_0x51d22c[_0x18b09d(0x6ee)]=String(RegExp['$1'])[_0x18b09d(0x4d9)]()[_0x18b09d(0x431)]();else{if(_0x96442e[_0x18b09d(0x6c8)](VisuMZ[_0x18b09d(0x190)][_0x18b09d(0x774)][_0x18b09d(0x610)['format'](_0x42e6d2,_0x5ee5d3)])){const _0x340372=String(RegExp['$1'])[_0x18b09d(0x428)](/[\r\n]+/)['remove']('');_0x51d22c[_0x18b09d(0x6ee)]=DataManager[_0x18b09d(0x3ea)](_0x340372);}}}}},Game_Enemy[_0x19a075(0x475)]['attackAnimationId1']=function(){const _0x14ae17=_0x19a075;return this[_0x14ae17(0x60f)]||0x0;},Game_Enemy[_0x19a075(0x475)][_0x19a075(0x551)]=function(){const _0x560b3e=_0x19a075;return this[_0x560b3e(0x8ff)]();},Game_Enemy[_0x19a075(0x475)]['attackAnimationIdSlot']=function(_0x280325){const _0x1e1d73=_0x19a075;return this[_0x1e1d73(0x8ff)]();},Game_Enemy['prototype'][_0x19a075(0x607)]=function(){const _0x22aba9=_0x19a075;if(this[_0x22aba9(0x887)]()[_0x22aba9(0x185)][_0x22aba9(0x6c8)](/<BATTLER SPRITE CANNOT MOVE>/i))return![];return Game_Battler[_0x22aba9(0x475)][_0x22aba9(0x607)][_0x22aba9(0x2c6)](this);},Game_Enemy[_0x19a075(0x475)][_0x19a075(0x4eb)]=function(){if(this['enemy']()['note']['match'](/<BATTLER SPRITE GROUNDED>/i))return!![];return![];},Game_Enemy[_0x19a075(0x475)][_0x19a075(0x76e)]=function(){const _0x525262=_0x19a075,_0x2ba686=[];for(const _0x5a7441 of this[_0x525262(0x887)]()[_0x525262(0x68f)]){const _0x10b1f4=$dataSkills[_0x5a7441[_0x525262(0x213)]];if(_0x10b1f4&&!_0x2ba686['includes'](_0x10b1f4))_0x2ba686['push'](_0x10b1f4);}return _0x2ba686;},Game_Enemy[_0x19a075(0x475)]['battleUIOffsetX']=function(){const _0x18ecc3=_0x19a075;let _0x3e9751=_0x18ecc3(0x8d6);if(this[_0x18ecc3(0x8e9)](_0x3e9751))return this[_0x18ecc3(0x5ce)][_0x3e9751];return this[_0x18ecc3(0x5ce)][_0x3e9751]=this[_0x18ecc3(0x942)](this[_0x18ecc3(0x887)]()),this[_0x18ecc3(0x5ce)][_0x3e9751];},Game_Enemy[_0x19a075(0x475)][_0x19a075(0x3b7)]=function(){const _0x33410d=_0x19a075;let _0x3306c4=_0x33410d(0x3b7);if(this[_0x33410d(0x8e9)](_0x3306c4))return this[_0x33410d(0x5ce)][_0x3306c4];return this[_0x33410d(0x5ce)][_0x3306c4]=this[_0x33410d(0x79e)](this[_0x33410d(0x887)]()),this[_0x33410d(0x5ce)][_0x3306c4];},Game_Enemy[_0x19a075(0x475)]['svBattlerData']=function(){const _0x2c1daa=_0x19a075;if(this[_0x2c1daa(0x6bd)]!==undefined)return this[_0x2c1daa(0x6bd)];return this[_0x2c1daa(0x580)](),this[_0x2c1daa(0x6bd)];},Game_Enemy['prototype'][_0x19a075(0x7ed)]=function(){const _0x3ecc32=_0x19a075;return this[_0x3ecc32(0x368)]()[_0x3ecc32(0x880)]!=='';},Game_Enemy['prototype']['svBattlerName']=function(){const _0x2812f2=_0x19a075;return this[_0x2812f2(0x368)]()[_0x2812f2(0x880)];},Game_Enemy['prototype']['battlerSmoothImage']=function(){const _0x2cf86a=_0x19a075;return this[_0x2cf86a(0x7ed)]()?VisuMZ['BattleCore']['Settings'][_0x2cf86a(0x72c)]['SmoothImage']:VisuMZ[_0x2cf86a(0x73b)][_0x2cf86a(0x7e0)]['Enemy']['SmoothImage'];},Game_Enemy['prototype']['performAction']=function(_0x379253){const _0x1eb63b=_0x19a075;Game_Battler['prototype']['performAction'][_0x1eb63b(0x2c6)](this,_0x379253);if(this[_0x1eb63b(0x7ed)]())this[_0x1eb63b(0x85c)](_0x379253);},Game_Enemy[_0x19a075(0x475)][_0x19a075(0x86b)]=function(){const _0x1f8e42=_0x19a075,_0x5910a3=this[_0x1f8e42(0x368)]()[_0x1f8e42(0x17f)]||0x0,_0x5813d5=$dataSystem[_0x1f8e42(0x885)][_0x5910a3];if(_0x5813d5){if(_0x5813d5['type']===0x0)this[_0x1f8e42(0x68d)](_0x1f8e42(0x917));else{if(_0x5813d5[_0x1f8e42(0x74d)]===0x1)this[_0x1f8e42(0x68d)](_0x1f8e42(0x587));else _0x5813d5[_0x1f8e42(0x74d)]===0x2&&this['requestMotion']('missile');}}},Game_Enemy[_0x19a075(0x475)]['performWeaponAnimation']=function(){const _0x2a9acf=_0x19a075,_0x3ae624=this[_0x2a9acf(0x368)]()[_0x2a9acf(0x17f)]||0x0,_0x15fcb7=$dataSystem[_0x2a9acf(0x885)][_0x3ae624];_0x15fcb7&&this[_0x2a9acf(0x810)](_0x15fcb7[_0x2a9acf(0x797)]);},Game_Enemy[_0x19a075(0x475)][_0x19a075(0x6dc)]=function(){const _0x53d300=_0x19a075,_0x26c99d=this[_0x53d300(0x368)]()['wtypeId']||0x0;return $dataSystem[_0x53d300(0x885)][_0x26c99d];},Game_Enemy[_0x19a075(0x475)][_0x19a075(0x217)]=function(_0x56da8a){return this['getAttackMotion']();},Game_Enemy['prototype']['performDamage']=function(){const _0x5055f9=_0x19a075;Game_Battler[_0x5055f9(0x475)][_0x5055f9(0x5c4)]['call'](this),this[_0x5055f9(0x209)]()&&this[_0x5055f9(0x7ed)]()&&this[_0x5055f9(0x68d)](_0x5055f9(0x239)),SoundManager[_0x5055f9(0x4ff)]();},Game_Enemy[_0x19a075(0x475)][_0x19a075(0x3db)]=function(){const _0x1e7d02=_0x19a075;Game_Battler[_0x1e7d02(0x475)][_0x1e7d02(0x3db)][_0x1e7d02(0x2c6)](this),this[_0x1e7d02(0x68d)]('evade');},Game_Enemy['prototype'][_0x19a075(0x26d)]=function(){const _0x1fddf3=_0x19a075;Game_Battler[_0x1fddf3(0x475)]['performMagicEvasion'][_0x1fddf3(0x2c6)](this),this[_0x1fddf3(0x68d)](_0x1fddf3(0x1b0));},Game_Enemy[_0x19a075(0x475)][_0x19a075(0x2b8)]=function(){const _0x56217b=_0x19a075;Game_Battler[_0x56217b(0x475)]['performCounter'][_0x56217b(0x2c6)](this),this['performAttack']();},Game_Enemy['prototype'][_0x19a075(0x5aa)]=function(){const _0x566a2b=_0x19a075;if(this[_0x566a2b(0x7ed)]()){if(this[_0x566a2b(0x8cc)]()>=0x1)return!![];return this[_0x566a2b(0x368)]()[_0x566a2b(0x23c)];}else return!![];},Game_Enemy[_0x19a075(0x475)][_0x19a075(0x64b)]=function(){const _0x237088=_0x19a075;return this[_0x237088(0x368)]()[_0x237088(0x174)];},Game_Enemy[_0x19a075(0x475)]['svBattlerAnchorY']=function(){const _0x5e4e9e=_0x19a075;return this[_0x5e4e9e(0x368)]()['anchorY'];},Game_Enemy['prototype'][_0x19a075(0x8a0)]=function(){return this['svBattlerData']()['shadow'];},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x652)]=Game_Enemy['prototype']['transform'],Game_Enemy['prototype'][_0x19a075(0x829)]=function(_0x45f771){const _0x4ebcb2=_0x19a075;VisuMZ['BattleCore'][_0x4ebcb2(0x652)]['call'](this,_0x45f771),this[_0x4ebcb2(0x1c1)](),this[_0x4ebcb2(0x580)]();const _0x3f5b4f=this[_0x4ebcb2(0x612)]();if(_0x3f5b4f)_0x3f5b4f[_0x4ebcb2(0x6f6)](this);},Game_Unit[_0x19a075(0x475)][_0x19a075(0x22d)]=function(_0x2347ac){const _0x3610bc=_0x19a075;for(const _0x5107cb of this[_0x3610bc(0x3e2)]()){if(_0x5107cb)_0x5107cb[_0x3610bc(0x22d)](_0x2347ac);}},Game_Unit['prototype']['trueRandomTarget']=function(){const _0x5dd4cd=_0x19a075,_0x27ec24=this[_0x5dd4cd(0x1ee)]();return _0x27ec24[Math['randomInt'](_0x27ec24['length'])];},VisuMZ['BattleCore'][_0x19a075(0x58f)]=Game_Party[_0x19a075(0x475)]['addActor'],Game_Party[_0x19a075(0x475)][_0x19a075(0x2d7)]=function(_0x2735d7){const _0x3ef1cd=_0x19a075;VisuMZ[_0x3ef1cd(0x73b)][_0x3ef1cd(0x58f)][_0x3ef1cd(0x2c6)](this,_0x2735d7),BattleManager[_0x3ef1cd(0x40d)]();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x7ee)]=Game_Party[_0x19a075(0x475)][_0x19a075(0x2ac)],Game_Party['prototype']['removeActor']=function(_0x10a598){const _0x169400=_0x19a075;VisuMZ['BattleCore'][_0x169400(0x7ee)][_0x169400(0x2c6)](this,_0x10a598),BattleManager['refreshStatusWindow']();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x66a)]=Game_Troop[_0x19a075(0x475)][_0x19a075(0x8c0)],Game_Troop['prototype'][_0x19a075(0x8c0)]=function(_0x1f6d18){const _0x2c3e5b=_0x19a075;$gameTemp[_0x2c3e5b(0x297)](),$gameTemp['applyForcedGameTroopSettingsBattleCore'](_0x1f6d18),VisuMZ[_0x2c3e5b(0x73b)][_0x2c3e5b(0x66a)][_0x2c3e5b(0x2c6)](this,_0x1f6d18);},VisuMZ['BattleCore'][_0x19a075(0x2ce)]=Game_Map[_0x19a075(0x475)][_0x19a075(0x43e)],Game_Map[_0x19a075(0x475)][_0x19a075(0x43e)]=function(){const _0x2d38e4=_0x19a075;VisuMZ[_0x2d38e4(0x73b)]['Game_Map_setupBattleback'][_0x2d38e4(0x2c6)](this),this['setupBattlebackBattleCore']();},Game_Map['prototype'][_0x19a075(0x3e4)]=function(){const _0x56d000=_0x19a075;this[_0x56d000(0x283)]={},this[_0x56d000(0x6b8)]={};if(!$dataMap)return;const _0x2bc3e7=$dataMap[_0x56d000(0x185)];if(!_0x2bc3e7)return;const _0xaa4787=_0x2bc3e7['match'](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/gi);if(_0xaa4787)for(const _0x217878 of _0xaa4787){_0x217878[_0x56d000(0x6c8)](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/i);const _0x5294b4=Number(RegExp['$1']),_0x2e3a7d=Number(RegExp['$2']),_0x13a488=_0x2e3a7d===0x1?this[_0x56d000(0x283)]:this[_0x56d000(0x6b8)],_0x10449c=String(RegExp['$3']);_0x13a488[_0x5294b4]=_0x10449c;}},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x3a4)]=Game_Map[_0x19a075(0x475)][_0x19a075(0x2de)],Game_Map['prototype'][_0x19a075(0x2de)]=function(){const _0xc9968e=_0x19a075;if(!BattleManager[_0xc9968e(0x871)]()){const _0x45b0a9=$gamePlayer[_0xc9968e(0x653)]($gamePlayer['x'],$gamePlayer['y']);if(this['_regionBattleback1']&&this[_0xc9968e(0x283)][_0x45b0a9])return this[_0xc9968e(0x283)][_0x45b0a9];}return VisuMZ['BattleCore'][_0xc9968e(0x3a4)][_0xc9968e(0x2c6)](this);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x1bc)]=Game_Map[_0x19a075(0x475)]['battleback2Name'],Game_Map[_0x19a075(0x475)][_0x19a075(0x4e0)]=function(){const _0x1a432b=_0x19a075;if(!BattleManager[_0x1a432b(0x871)]()){const _0x26d5fb=$gamePlayer[_0x1a432b(0x653)]($gamePlayer['x'],$gamePlayer['y']);if(this['_regionBattleback1']&&this[_0x1a432b(0x6b8)][_0x26d5fb])return this['_regionBattleback2'][_0x26d5fb];}return VisuMZ[_0x1a432b(0x73b)][_0x1a432b(0x1bc)][_0x1a432b(0x2c6)](this);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x1d2)]=Game_Interpreter['prototype'][_0x19a075(0x811)],Game_Interpreter['prototype']['command357']=function(_0x47f456){const _0x2f4c56=_0x19a075;return $gameTemp[_0x2f4c56(0x47f)](this),VisuMZ[_0x2f4c56(0x73b)][_0x2f4c56(0x1d2)][_0x2f4c56(0x2c6)](this,_0x47f456);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x736)]=Game_Interpreter[_0x19a075(0x475)][_0x19a075(0x892)],Game_Interpreter[_0x19a075(0x475)][_0x19a075(0x892)]=function(){const _0x5ce50a=_0x19a075;if(SceneManager[_0x5ce50a(0x553)]())switch(this[_0x5ce50a(0x758)]){case _0x5ce50a(0x441):if(Imported[_0x5ce50a(0x3dd)]){if($gameScreen['battleCameraData']()[_0x5ce50a(0x8e5)]>0x0)return!![];this[_0x5ce50a(0x758)]='';}break;case'battleAnimation':if(BattleManager['_spriteset'][_0x5ce50a(0x8f8)]())return!![];this[_0x5ce50a(0x758)]='';break;case _0x5ce50a(0x36e):if(Imported['VisuMZ_3_ActSeqCamera']){if($gameScreen[_0x5ce50a(0x426)]()[_0x5ce50a(0x689)]>0x0)return!![];if($gameScreen[_0x5ce50a(0x426)]()[_0x5ce50a(0x225)]>0x0)return!![];this[_0x5ce50a(0x758)]='';}break;case'battleEffect':if(BattleManager[_0x5ce50a(0x525)]['isEffecting']())return!![];this[_0x5ce50a(0x758)]='';break;case'battleFloat':if(BattleManager['_spriteset'][_0x5ce50a(0x328)]())return!![];this[_0x5ce50a(0x758)]='';break;case _0x5ce50a(0x59b):if(BattleManager[_0x5ce50a(0x525)][_0x5ce50a(0x849)]())return!![];this[_0x5ce50a(0x758)]='';break;case _0x5ce50a(0x445):if(BattleManager[_0x5ce50a(0x5ae)][_0x5ce50a(0x596)]())return!![];this['_waitMode']='';break;case _0x5ce50a(0x5a6):if(BattleManager['_spriteset'][_0x5ce50a(0x83e)]())return!![];this[_0x5ce50a(0x758)]='';break;case _0x5ce50a(0x913):if(BattleManager[_0x5ce50a(0x525)][_0x5ce50a(0x6e5)]())return!![];this[_0x5ce50a(0x758)]='';break;case _0x5ce50a(0x7e4):if(BattleManager[_0x5ce50a(0x525)]['isAnyoneGrowing']())return!![];this[_0x5ce50a(0x758)]='';break;case _0x5ce50a(0x2e1):if(BattleManager[_0x5ce50a(0x525)]['isAnyoneSkewing']())return!![];this[_0x5ce50a(0x758)]='';break;case _0x5ce50a(0x512):if(Imported[_0x5ce50a(0x3cb)]){if(BattleManager[_0x5ce50a(0x525)][_0x5ce50a(0x56d)]())return!![];this[_0x5ce50a(0x758)]='';}break;case _0x5ce50a(0x71e):if(Imported[_0x5ce50a(0x3dd)]){if($gameScreen[_0x5ce50a(0x426)]()[_0x5ce50a(0x384)]>0x0)return!![];this[_0x5ce50a(0x758)]='';}break;case _0x5ce50a(0x75a):if(BattleManager[_0x5ce50a(0x525)]['isAnyoneSpinning']())return!![];this[_0x5ce50a(0x758)]='';break;case _0x5ce50a(0x473):if(Imported[_0x5ce50a(0x3dd)]){if($gameScreen[_0x5ce50a(0x426)]()['zoomDuration']>0x0)return!![];this[_0x5ce50a(0x758)]='';}break;}return VisuMZ[_0x5ce50a(0x73b)]['Game_Interpreter_updateWaitMode']['call'](this);},VisuMZ[_0x19a075(0x73b)]['Game_Interpreter_command301']=Game_Interpreter[_0x19a075(0x475)][_0x19a075(0x858)],Game_Interpreter[_0x19a075(0x475)][_0x19a075(0x858)]=function(_0x32acca){const _0x3dd7d0=_0x19a075;return!$gameParty[_0x3dd7d0(0x8e7)]()?this[_0x3dd7d0(0x48b)](_0x32acca):VisuMZ[_0x3dd7d0(0x73b)][_0x3dd7d0(0x456)]['call'](this,_0x32acca);},Game_Interpreter[_0x19a075(0x475)][_0x19a075(0x843)]=function(_0x1e9af5){const _0x54780f=_0x19a075;return VisuMZ[_0x54780f(0x73b)][_0x54780f(0x456)][_0x54780f(0x2c6)](this,_0x1e9af5),BattleManager[_0x54780f(0x7c4)](_0x38ee9a=>{const _0x1403e1=_0x54780f;this['_branch'][this[_0x1403e1(0x51d)]]=_0x38ee9a;}),!![];},VisuMZ['BattleCore'][_0x19a075(0x68a)]=function(_0x121847){const _0x438d16=_0x19a075,_0x413a4d=$dataCommonEvents[_0x121847];if(!_0x413a4d)return![];if(_0x413a4d[_0x438d16(0x379)][_0x438d16(0x644)]<=0x1)return![];return!![];},Game_Interpreter[_0x19a075(0x475)][_0x19a075(0x48b)]=function(_0x402f44){const _0x3895e0=_0x19a075,_0x28a074=VisuMZ['BattleCore'][_0x3895e0(0x7e0)][_0x3895e0(0x679)],_0x3f88c4=_0x28a074[_0x3895e0(0x2fc)],_0x944820=$dataCommonEvents[_0x3f88c4];if(_0x944820&&VisuMZ[_0x3895e0(0x73b)][_0x3895e0(0x68a)](_0x3f88c4)){const _0x33537f=this[_0x3895e0(0x187)]()?this[_0x3895e0(0x3d8)]:0x0,_0x595bcb=_0x944820[_0x3895e0(0x379)];this[_0x3895e0(0x245)](_0x595bcb,_0x33537f),this[_0x3895e0(0x349)]=JsonEx['makeDeepCopy'](this[_0x3895e0(0x349)]);const _0x28dfe2={'code':0xbc3,'indent':this[_0x3895e0(0x51d)],'parameters':JsonEx['makeDeepCopy'](_0x402f44)};return this[_0x3895e0(0x349)][_0x3895e0(0x333)](this['_index']+0x1,0x0,_0x28dfe2),!![];}else return VisuMZ[_0x3895e0(0x73b)][_0x3895e0(0x456)][_0x3895e0(0x2c6)](this,_0x402f44);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x6be)]=BattleManager['onEncounter'],BattleManager[_0x19a075(0x75f)]=function(){const _0x54442f=_0x19a075;VisuMZ[_0x54442f(0x73b)][_0x54442f(0x6be)][_0x54442f(0x2c6)](this),this[_0x54442f(0x759)]();},BattleManager[_0x19a075(0x759)]=function(){const _0x2db8dd=_0x19a075,_0x419dfd=VisuMZ['BattleCore']['Settings']['Mechanics'],_0x81e710=_0x419dfd[_0x2db8dd(0x2fc)];_0x81e710&&VisuMZ[_0x2db8dd(0x73b)][_0x2db8dd(0x68a)](_0x81e710)&&(this['_battleCoreBattleStartEvent']=!![],$gameTemp[_0x2db8dd(0x526)](_0x419dfd[_0x2db8dd(0x2fc)]),$gameMap[_0x2db8dd(0x914)](),$gameMap[_0x2db8dd(0x6fa)][_0x2db8dd(0x231)]=!![]),_0x419dfd[_0x2db8dd(0x18e)]>0x0&&(this[_0x2db8dd(0x853)]=!![]);},VisuMZ['BattleCore'][_0x19a075(0x21f)]=Scene_Map[_0x19a075(0x475)][_0x19a075(0x259)],Scene_Map['prototype'][_0x19a075(0x259)]=function(){const _0x2c3c2c=_0x19a075;BattleManager[_0x2c3c2c(0x947)]?this['battleCorePreBattleCommonEvent']():VisuMZ[_0x2c3c2c(0x73b)][_0x2c3c2c(0x21f)][_0x2c3c2c(0x2c6)](this);},Scene_Map[_0x19a075(0x475)][_0x19a075(0x41c)]=function(){const _0x190d8f=_0x19a075;this[_0x190d8f(0x1a5)]=!![];},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x6cb)]=SceneManager[_0x19a075(0x6a1)],SceneManager['isSceneChanging']=function(){const _0x28364c=_0x19a075;if(BattleManager[_0x28364c(0x947)])return![];return VisuMZ['BattleCore'][_0x28364c(0x6cb)][_0x28364c(0x2c6)](this);},VisuMZ[_0x19a075(0x73b)]['Game_Interpreter_terminate']=Game_Interpreter['prototype']['terminate'],Game_Interpreter[_0x19a075(0x475)][_0x19a075(0x22e)]=function(){const _0x31b21d=_0x19a075;VisuMZ['BattleCore'][_0x31b21d(0x4f0)][_0x31b21d(0x2c6)](this),this[_0x31b21d(0x231)]&&(this[_0x31b21d(0x231)]=undefined,SceneManager[_0x31b21d(0x3a8)]['battleCoreResumeLaunchBattle']());},Scene_Map['prototype'][_0x19a075(0x49d)]=function(){const _0x3fd91b=_0x19a075;BattleManager[_0x3fd91b(0x947)]=undefined,this['stop']();},VisuMZ[_0x19a075(0x73b)]['Scene_Map_initialize']=Scene_Map[_0x19a075(0x475)][_0x19a075(0x2a0)],Scene_Map[_0x19a075(0x475)][_0x19a075(0x2a0)]=function(){const _0x47ca01=_0x19a075;VisuMZ[_0x47ca01(0x73b)][_0x47ca01(0x35d)][_0x47ca01(0x2c6)](this),$gameTemp['clearForcedGameTroopSettingsBattleCore']();},VisuMZ[_0x19a075(0x73b)]['Scene_ItemBase_applyItem']=Scene_ItemBase[_0x19a075(0x475)]['applyItem'],Scene_ItemBase[_0x19a075(0x475)]['applyItem']=function(){const _0x1c207e=_0x19a075;VisuMZ[_0x1c207e(0x73b)][_0x1c207e(0x7db)][_0x1c207e(0x2c6)](this),this[_0x1c207e(0x7ac)]()[_0x1c207e(0x185)]['match'](/<CUSTOM ACTION SEQUENCE>/i)&&($gameTemp[_0x1c207e(0x8fb)]=[]),DataManager[_0x1c207e(0x439)](this[_0x1c207e(0x7ac)]())&&($gameTemp[_0x1c207e(0x8fb)]=[]);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x857)]=Scene_Options[_0x19a075(0x475)][_0x19a075(0x668)],Scene_Options[_0x19a075(0x475)]['maxCommands']=function(){const _0x255b4e=_0x19a075;let _0x4eb25a=VisuMZ[_0x255b4e(0x73b)][_0x255b4e(0x857)][_0x255b4e(0x2c6)](this);const _0x5272e4=VisuMZ[_0x255b4e(0x73b)][_0x255b4e(0x7e0)];if(_0x5272e4['AutoBattle']['AddOption']&&_0x5272e4[_0x255b4e(0x6a8)]['AdjustRect'])_0x4eb25a+=0x2;if(_0x5272e4[_0x255b4e(0x88a)][_0x255b4e(0x28a)]&&_0x5272e4[_0x255b4e(0x88a)][_0x255b4e(0x2c7)])_0x4eb25a+=0x1;return _0x4eb25a;},VisuMZ['BattleCore'][_0x19a075(0x891)]=Scene_Battle[_0x19a075(0x475)][_0x19a075(0x73c)],Scene_Battle['prototype'][_0x19a075(0x73c)]=function(){const _0x262d29=_0x19a075;SceneManager[_0x262d29(0x335)]()?(Scene_Message[_0x262d29(0x475)][_0x262d29(0x73c)]['call'](this),this[_0x262d29(0x525)]&&this[_0x262d29(0x525)][_0x262d29(0x8cf)](),BattleManager[_0x262d29(0x386)]&&BattleManager['revertTpbCachedActor']()):VisuMZ[_0x262d29(0x73b)][_0x262d29(0x891)][_0x262d29(0x2c6)](this);},VisuMZ['BattleCore'][_0x19a075(0x2c3)]=Scene_Battle[_0x19a075(0x475)][_0x19a075(0x374)],Scene_Battle[_0x19a075(0x475)][_0x19a075(0x374)]=function(){const _0x441a3b=_0x19a075;SceneManager['isNextSceneBattleTransitionable']()?Scene_Message[_0x441a3b(0x475)][_0x441a3b(0x374)]['call'](this):VisuMZ[_0x441a3b(0x73b)][_0x441a3b(0x2c3)][_0x441a3b(0x2c6)](this);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x480)]=Scene_Battle[_0x19a075(0x475)]['terminate'],Scene_Battle[_0x19a075(0x475)]['terminate']=function(){const _0xff4256=_0x19a075;SceneManager[_0xff4256(0x20c)]()?Scene_Message['prototype'][_0xff4256(0x22e)][_0xff4256(0x2c6)](this):VisuMZ[_0xff4256(0x73b)]['Scene_Battle_terminate'][_0xff4256(0x2c6)](this);},Scene_Battle['prototype'][_0x19a075(0x4b4)]=function(){const _0x4f353c=_0x19a075;if(ConfigManager[_0x4f353c(0x559)]&&ConfigManager[_0x4f353c(0x167)]!==undefined)return ConfigManager[_0x4f353c(0x167)];else{if(this['battleLayoutStyle']()===_0x4f353c(0x8d0))return![];else{return Scene_Message[_0x4f353c(0x475)][_0x4f353c(0x4b4)][_0x4f353c(0x2c6)](this);;}}},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x501)]=Scene_Battle['prototype']['createAllWindows'],Scene_Battle[_0x19a075(0x475)]['createAllWindows']=function(){const _0xfc6558=_0x19a075;this['createEnemyNameContainer'](),VisuMZ[_0xfc6558(0x73b)][_0xfc6558(0x501)][_0xfc6558(0x2c6)](this),this['createAutoBattleWindow']();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x678)]=Scene_Battle[_0x19a075(0x475)][_0x19a075(0x491)],Scene_Battle[_0x19a075(0x475)][_0x19a075(0x491)]=function(){const _0x3170c6=_0x19a075;VisuMZ[_0x3170c6(0x73b)]['Scene_Battle_createCancelButton'][_0x3170c6(0x2c6)](this),this[_0x3170c6(0x4db)]()==='border'&&this['repositionCancelButtonBorderStyle']();},Scene_Battle['prototype'][_0x19a075(0x6ef)]=function(_0x494a9c){const _0x461613=_0x19a075;_0x494a9c?(this['_windowLayer']['x']=(Graphics[_0x461613(0x594)]-Graphics['boxWidth'])/0x2,this['_windowLayer']['y']=(Graphics['height']-Graphics['boxHeight'])/0x2):(this[_0x461613(0x3fb)]['x']=Graphics['width']*0xa,this[_0x461613(0x3fb)]['y']=Graphics[_0x461613(0x87b)]*0xa);},VisuMZ['BattleCore'][_0x19a075(0x639)]=Scene_Battle[_0x19a075(0x475)]['selectNextCommand'],Scene_Battle[_0x19a075(0x475)][_0x19a075(0x532)]=function(){const _0x337e8b=_0x19a075,_0x124c85=BattleManager[_0x337e8b(0x4c9)]();VisuMZ[_0x337e8b(0x73b)][_0x337e8b(0x639)][_0x337e8b(0x2c6)](this);if(_0x124c85){if(_0x124c85===BattleManager[_0x337e8b(0x4c9)]())return;if(_0x124c85===BattleManager[_0x337e8b(0x886)])return;if(_0x124c85[_0x337e8b(0x612)]())_0x124c85['battler']()[_0x337e8b(0x6ae)]();}},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x504)]=Scene_Battle[_0x19a075(0x475)][_0x19a075(0x79c)],Scene_Battle['prototype']['selectPreviousCommand']=function(){const _0x5750c1=_0x19a075,_0x33bf8c=BattleManager['actor']();if(_0x33bf8c&&_0x33bf8c['battler'])_0x33bf8c[_0x5750c1(0x612)]()[_0x5750c1(0x6ae)]();VisuMZ[_0x5750c1(0x73b)][_0x5750c1(0x504)][_0x5750c1(0x2c6)](this);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x6f8)]=Scene_Battle[_0x19a075(0x475)][_0x19a075(0x691)],Scene_Battle['prototype'][_0x19a075(0x691)]=function(){const _0x3f0270=_0x19a075;if(VisuMZ['BattleCore'][_0x3f0270(0x7e0)][_0x3f0270(0x5b6)][_0x3f0270(0x350)])return VisuMZ[_0x3f0270(0x73b)]['Settings'][_0x3f0270(0x5b6)][_0x3f0270(0x350)][_0x3f0270(0x2c6)](this);return VisuMZ[_0x3f0270(0x73b)]['Scene_Battle_logWindowRect'][_0x3f0270(0x2c6)](this);},VisuMZ[_0x19a075(0x73b)]['Scene_Battle_createPartyCommandWindow']=Scene_Battle[_0x19a075(0x475)]['createPartyCommandWindow'],Scene_Battle[_0x19a075(0x475)][_0x19a075(0x293)]=function(){const _0x57ff9b=_0x19a075;VisuMZ[_0x57ff9b(0x73b)][_0x57ff9b(0x69b)][_0x57ff9b(0x2c6)](this),this[_0x57ff9b(0x6f4)]();},Scene_Battle[_0x19a075(0x475)][_0x19a075(0x6f4)]=function(){const _0x317533=_0x19a075,_0x264bdd=this['_partyCommandWindow'];_0x264bdd['setHandler'](_0x317533(0x7be),this[_0x317533(0x6a6)][_0x317533(0x3fd)](this)),_0x264bdd['setHandler'](_0x317533(0x8c1),this[_0x317533(0x3c7)][_0x317533(0x3fd)](this));const _0x93e63b=this[_0x317533(0x4db)]();switch(_0x93e63b){case'xp':case'portrait':return this['_partyCommandWindow'][_0x317533(0x716)](0x1);break;}},Scene_Battle[_0x19a075(0x475)][_0x19a075(0x6a6)]=function(){const _0x2130d6=_0x19a075;BattleManager[_0x2130d6(0x1fa)]=!![],$gameParty[_0x2130d6(0x818)](),this['selectNextCommand'](),BattleManager['isTpb']()&&(BattleManager['_inputting']=![]);},Scene_Battle['prototype'][_0x19a075(0x3c7)]=function(){const _0x135ca9=_0x19a075;this['isQueueOptionsMenu']()?(this['_callSceneOptions']=!![],this['_logWindow'][_0x135ca9(0x7cc)]('addText',VisuMZ['BattleCore']['Settings'][_0x135ca9(0x72b)][_0x135ca9(0x45e)])):this[_0x135ca9(0x760)]();},Scene_Battle['prototype'][_0x19a075(0x4f9)]=function(){const _0x6b2c09=_0x19a075;return BattleManager[_0x6b2c09(0x59a)]();},Scene_Battle[_0x19a075(0x475)]['callOptions']=function(){const _0x3dad85=_0x19a075;this['_callSceneOptions']=![],this[_0x3dad85(0x525)][_0x3dad85(0x8cf)](),this[_0x3dad85(0x3fb)][_0x3dad85(0x3cc)]=![];if(BattleManager['isBattleTest']())($dataSystem[_0x3dad85(0x2de)]||$dataSystem['battleback2Name'])&&SceneManager[_0x3dad85(0x398)]();else($gameMap[_0x3dad85(0x2de)]()||$gameMap[_0x3dad85(0x4e0)]())&&SceneManager['snapForBackground']();SceneManager[_0x3dad85(0x7cc)](Scene_Options),BattleManager[_0x3dad85(0x2e8)]()&&(BattleManager[_0x3dad85(0x386)]=BattleManager['actor']());},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x721)]=Scene_Battle[_0x19a075(0x475)][_0x19a075(0x7e2)],Scene_Battle[_0x19a075(0x475)]['updateBattleProcess']=function(){const _0x333f3c=_0x19a075;VisuMZ['BattleCore']['Scene_Battle_updateBattleProcess'][_0x333f3c(0x2c6)](this);if(this[_0x333f3c(0x813)]&&!BattleManager['_subject'])this['callOptions']();},Scene_Battle[_0x19a075(0x475)][_0x19a075(0x342)]=function(){const _0x3a9664=_0x19a075,_0x533294=this[_0x3a9664(0x601)]();this['_autoBattleWindow']=new Window_AutoBattleCancel(_0x533294),this[_0x3a9664(0x62c)][_0x3a9664(0x1eb)](),this[_0x3a9664(0x470)](this['_autoBattleWindow']);},Scene_Battle[_0x19a075(0x475)][_0x19a075(0x601)]=function(){const _0x2ae666=_0x19a075;return VisuMZ['BattleCore'][_0x2ae666(0x7e0)][_0x2ae666(0x6a8)][_0x2ae666(0x694)][_0x2ae666(0x2c6)](this);},Scene_Battle['prototype'][_0x19a075(0x693)]=function(){const _0x4cd3bb=_0x19a075;return VisuMZ[_0x4cd3bb(0x73b)][_0x4cd3bb(0x7e0)][_0x4cd3bb(0x72b)]['DisablePartyCmd'];},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x69c)]=Scene_Battle[_0x19a075(0x475)][_0x19a075(0x193)],Scene_Battle[_0x19a075(0x475)]['startPartyCommandSelection']=function(){const _0x3acacd=_0x19a075;this['isPartyCommandWindowDisabled']()?this['onDisabledPartyCommandSelection']():VisuMZ[_0x3acacd(0x73b)][_0x3acacd(0x69c)][_0x3acacd(0x2c6)](this);},Scene_Battle['prototype']['onDisabledPartyCommandSelection']=function(){const _0xbde60b=_0x19a075;if(BattleManager[_0xbde60b(0x43f)]())this[_0xbde60b(0x532)]();else BattleManager['isTpb']()&&VisuMZ[_0xbde60b(0x73b)]['Scene_Battle_startPartyCommandSelection']['call'](this);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x2ae)]=Scene_Battle[_0x19a075(0x475)][_0x19a075(0x3bd)],Scene_Battle[_0x19a075(0x475)][_0x19a075(0x3bd)]=function(){const _0x24e3f4=_0x19a075;BattleManager[_0x24e3f4(0x2e8)]()?this[_0x24e3f4(0x764)]():VisuMZ[_0x24e3f4(0x73b)][_0x24e3f4(0x2ae)][_0x24e3f4(0x2c6)](this);},VisuMZ[_0x19a075(0x73b)]['Scene_Battle_createActorCommandWindow']=Scene_Battle[_0x19a075(0x475)]['createActorCommandWindow'],Scene_Battle[_0x19a075(0x475)][_0x19a075(0x7e1)]=function(){const _0x1618d8=_0x19a075;VisuMZ[_0x1618d8(0x73b)][_0x1618d8(0x499)]['call'](this),this['createActorCommandWindowBattleCore']();},Scene_Battle[_0x19a075(0x475)][_0x19a075(0x5e9)]=function(){const _0x384b93=_0x19a075,_0x8e4e39=this[_0x384b93(0x443)];_0x8e4e39[_0x384b93(0x88d)](_0x384b93(0x4e4),this['actorCommandEscape'][_0x384b93(0x3fd)](this)),_0x8e4e39[_0x384b93(0x88d)]('autoBattle',this['actorCommandAutoBattle'][_0x384b93(0x3fd)](this)),_0x8e4e39['setHandler'](_0x384b93(0x495),this[_0x384b93(0x54f)][_0x384b93(0x3fd)](this)),BattleManager[_0x384b93(0x2e8)]()&&(this[_0x384b93(0x693)]()?delete _0x8e4e39[_0x384b93(0x92f)][_0x384b93(0x67e)]:_0x8e4e39[_0x384b93(0x88d)](_0x384b93(0x67e),this['actorCommandCancelTPB'][_0x384b93(0x3fd)](this)));},Scene_Battle[_0x19a075(0x475)][_0x19a075(0x58b)]=function(){const _0x24c8d5=_0x19a075;this[_0x24c8d5(0x29d)]();},Scene_Battle[_0x19a075(0x475)][_0x19a075(0x576)]=function(){const _0xa63fc2=_0x19a075;BattleManager[_0xa63fc2(0x4c9)]()[_0xa63fc2(0x29a)](),BattleManager[_0xa63fc2(0x7cb)](),BattleManager[_0xa63fc2(0x649)](),this[_0xa63fc2(0x788)]();},Scene_Battle[_0x19a075(0x475)][_0x19a075(0x54f)]=function(){const _0x49396c=_0x19a075,_0x2e01ad=BattleManager[_0x49396c(0x33f)]();_0x2e01ad[_0x49396c(0x5f3)](this[_0x49396c(0x443)][_0x49396c(0x8bf)]()),this[_0x49396c(0x27a)]();},Scene_Battle[_0x19a075(0x475)][_0x19a075(0x2ed)]=function(){const _0x51af47=_0x19a075;this[_0x51af47(0x279)][_0x51af47(0x8c0)](),this['_actorCommandWindow'][_0x51af47(0x2a8)]();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x6d8)]=Scene_Battle[_0x19a075(0x475)][_0x19a075(0x4f1)],Scene_Battle[_0x19a075(0x475)][_0x19a075(0x4f1)]=function(){const _0x580bd6=_0x19a075;VisuMZ[_0x580bd6(0x73b)][_0x580bd6(0x6d8)][_0x580bd6(0x2c6)](this),this[_0x580bd6(0x1b2)]();},Scene_Battle[_0x19a075(0x475)][_0x19a075(0x1b2)]=function(){const _0x3fd765=_0x19a075;this['_actorCommandWindow'][_0x3fd765(0x5fe)](this[_0x3fd765(0x5f1)]),this[_0x3fd765(0x279)][_0x3fd765(0x5fe)](this[_0x3fd765(0x5f1)]);},Scene_Battle[_0x19a075(0x475)]['battleLayoutStyle']=function(){const _0x548bbb=_0x19a075;if($gameTemp['_forcedBattleLayout']!==undefined)return $gameTemp['_forcedBattleLayout'];if(this['_battleLayoutStyle'])return this[_0x548bbb(0x8c2)];return this[_0x548bbb(0x8c2)]=VisuMZ['BattleCore'][_0x548bbb(0x7e0)][_0x548bbb(0x3a9)][_0x548bbb(0x690)][_0x548bbb(0x4d9)]()['trim'](),this[_0x548bbb(0x8c2)]===_0x548bbb(0x351)&&!Imported[_0x548bbb(0x356)]&&(this['_battleLayoutStyle']=_0x548bbb(0x235)),this[_0x548bbb(0x8c2)];},VisuMZ[_0x19a075(0x73b)]['Scene_Battle_windowAreaHeight']=Scene_Battle['prototype'][_0x19a075(0x47a)],Scene_Battle[_0x19a075(0x475)][_0x19a075(0x47a)]=function(){const _0x3869a8=_0x19a075,_0x586ba7=this[_0x3869a8(0x4db)]();switch(_0x586ba7){case _0x3869a8(0x379):return this[_0x3869a8(0x2ad)](Math['max'](0x1,$gameParty[_0x3869a8(0x572)]()),!![]);break;default:return VisuMZ[_0x3869a8(0x73b)][_0x3869a8(0x658)][_0x3869a8(0x2c6)](this);break;}},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x46c)]=Scene_Battle[_0x19a075(0x475)]['helpWindowRect'],Scene_Battle[_0x19a075(0x475)][_0x19a075(0x3eb)]=function(){const _0x2a1e9d=_0x19a075,_0x71f9e1=this[_0x2a1e9d(0x4db)]();switch(_0x71f9e1){case _0x2a1e9d(0x8d0):return this['helpWindowRectBorderStyle']();break;case'default':case _0x2a1e9d(0x379):case'xp':case'portrait':default:return VisuMZ[_0x2a1e9d(0x73b)][_0x2a1e9d(0x46c)][_0x2a1e9d(0x2c6)](this);break;}},Scene_Battle[_0x19a075(0x475)][_0x19a075(0x260)]=function(){const _0x52dbc5=_0x19a075,_0x22dc85=this[_0x52dbc5(0x4db)]();switch(_0x22dc85){case'xp':case _0x52dbc5(0x53b):return this[_0x52dbc5(0x188)]();break;case _0x52dbc5(0x8d0):return this[_0x52dbc5(0x5a7)]();break;case'default':case _0x52dbc5(0x379):default:return this[_0x52dbc5(0x714)]();break;}},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x7d5)]=Scene_Battle[_0x19a075(0x475)][_0x19a075(0x82b)],Scene_Battle['prototype'][_0x19a075(0x82b)]=function(){const _0x41062f=_0x19a075,_0x1f263e=this[_0x41062f(0x4db)]();switch(_0x1f263e){case'xp':case'portrait':return this[_0x41062f(0x298)]();break;case _0x41062f(0x8d0):return this['partyCommandWindowRectBorderStyle']();case _0x41062f(0x235):case _0x41062f(0x379):default:return this[_0x41062f(0x75d)]();break;}},Scene_Battle['prototype'][_0x19a075(0x75d)]=function(){const _0x400929=_0x19a075,_0x4c60c9=VisuMZ[_0x400929(0x73b)][_0x400929(0x7e0)][_0x400929(0x3a9)],_0x1a9733=_0x4c60c9['CommandWidth']||0xc0,_0x35c0e1=this[_0x400929(0x47a)](),_0x352918=this[_0x400929(0x4b4)]()?Graphics[_0x400929(0x256)]-_0x1a9733:0x0,_0x1f6872=Graphics[_0x400929(0x18f)]-_0x35c0e1;return new Rectangle(_0x352918,_0x1f6872,_0x1a9733,_0x35c0e1);},Scene_Battle[_0x19a075(0x475)]['actorCommandWindowRect']=function(){return this['partyCommandWindowRect']();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x7f4)]=Scene_Battle[_0x19a075(0x475)][_0x19a075(0x80a)],Scene_Battle[_0x19a075(0x475)][_0x19a075(0x80a)]=function(){const _0x56a30d=_0x19a075,_0x9c3ef3=this[_0x56a30d(0x4db)]();switch(_0x9c3ef3){case'xp':case'portrait':case _0x56a30d(0x8d0):break;case _0x56a30d(0x235):case _0x56a30d(0x379):default:VisuMZ['BattleCore']['Scene_Battle_updateStatusWindowPosition'][_0x56a30d(0x2c6)](this);break;}},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x946)]=Scene_Battle[_0x19a075(0x475)][_0x19a075(0x55d)],Scene_Battle[_0x19a075(0x475)][_0x19a075(0x55d)]=function(){const _0x2e14e1=_0x19a075;VisuMZ[_0x2e14e1(0x73b)][_0x2e14e1(0x946)][_0x2e14e1(0x2c6)](this),this[_0x2e14e1(0x5ef)]();},VisuMZ['BattleCore'][_0x19a075(0x284)]=Scene_Battle[_0x19a075(0x475)][_0x19a075(0x337)],Scene_Battle['prototype'][_0x19a075(0x337)]=function(){const _0x1da618=_0x19a075;VisuMZ[_0x1da618(0x73b)][_0x1da618(0x284)]['call'](this),this['_enemyWindow']['autoSelect'](),this[_0x1da618(0x5ef)]();},Scene_Battle[_0x19a075(0x475)][_0x19a075(0x5ef)]=function(){const _0x15bdfa=_0x19a075,_0x3c4e4c=this[_0x15bdfa(0x4db)]();['xp','portrait',_0x15bdfa(0x8d0)][_0x15bdfa(0x5d5)](_0x3c4e4c)&&this[_0x15bdfa(0x443)][_0x15bdfa(0x2a8)](),(_0x3c4e4c==='border'||this[_0x15bdfa(0x6cc)]())&&(this['_skillWindow'][_0x15bdfa(0x2a8)](),this[_0x15bdfa(0x7d8)]['close']());},VisuMZ['BattleCore']['Scene_Battle_onActorOk']=Scene_Battle[_0x19a075(0x475)][_0x19a075(0x5c3)],Scene_Battle[_0x19a075(0x475)][_0x19a075(0x5c3)]=function(){const _0x21e83b=_0x19a075;VisuMZ['BattleCore'][_0x21e83b(0x397)]['call'](this),this[_0x21e83b(0x7b3)]();},Scene_Battle[_0x19a075(0x475)][_0x19a075(0x847)]=function(){const _0xdf7e78=_0x19a075;return['attack',_0xdf7e78(0x808),_0xdf7e78(0x495)][_0xdf7e78(0x5d5)](this[_0xdf7e78(0x443)][_0xdf7e78(0x900)]());},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x4ab)]=Scene_Battle['prototype'][_0x19a075(0x93e)],Scene_Battle['prototype'][_0x19a075(0x93e)]=function(){const _0x1c93c7=_0x19a075;this['isNonSubmenuCancel']()?(this[_0x1c93c7(0x828)][_0x1c93c7(0x51b)](),this[_0x1c93c7(0x655)][_0x1c93c7(0x1eb)](),this[_0x1c93c7(0x443)][_0x1c93c7(0x6c0)]()):VisuMZ['BattleCore'][_0x1c93c7(0x4ab)][_0x1c93c7(0x2c6)](this),this[_0x1c93c7(0x48f)]();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x61f)]=Scene_Battle[_0x19a075(0x475)][_0x19a075(0x79b)],Scene_Battle[_0x19a075(0x475)][_0x19a075(0x79b)]=function(){const _0x517ee7=_0x19a075;VisuMZ[_0x517ee7(0x73b)][_0x517ee7(0x61f)][_0x517ee7(0x2c6)](this),this[_0x517ee7(0x7b3)]();},VisuMZ['BattleCore'][_0x19a075(0x93a)]=Scene_Battle[_0x19a075(0x475)]['onEnemyCancel'],Scene_Battle[_0x19a075(0x475)][_0x19a075(0x660)]=function(){const _0x4bc9b0=_0x19a075;this['isNonSubmenuCancel']()?(this[_0x4bc9b0(0x828)]['show'](),this[_0x4bc9b0(0x52c)][_0x4bc9b0(0x1eb)](),this[_0x4bc9b0(0x443)][_0x4bc9b0(0x6c0)]()):VisuMZ[_0x4bc9b0(0x73b)][_0x4bc9b0(0x93a)][_0x4bc9b0(0x2c6)](this),this['cancelTargetSelectionVisibility']();},Scene_Battle[_0x19a075(0x475)]['okTargetSelectionVisibility']=function(){const _0x20f2f4=_0x19a075,_0x57b2a3=this['battleLayoutStyle']();(_0x57b2a3==='border'||this[_0x20f2f4(0x6cc)]())&&(this[_0x20f2f4(0x2ba)][_0x20f2f4(0x709)](),this['_skillWindow']['active']&&this[_0x20f2f4(0x2ba)]['show'](),this[_0x20f2f4(0x7d8)][_0x20f2f4(0x709)](),this['_itemWindow'][_0x20f2f4(0x29f)]&&this['_itemWindow'][_0x20f2f4(0x51b)]());},Scene_Battle[_0x19a075(0x475)][_0x19a075(0x48f)]=function(){const _0x1916bb=_0x19a075,_0x5cc29e=this['battleLayoutStyle']();['xp',_0x1916bb(0x53b),'border']['includes'](_0x5cc29e)&&this[_0x1916bb(0x443)][_0x1916bb(0x709)](),this[_0x1916bb(0x7b3)]();},Scene_Battle[_0x19a075(0x475)][_0x19a075(0x714)]=function(){const _0x3411d5=_0x19a075,_0x126cb5=VisuMZ['BattleCore'][_0x3411d5(0x7e0)][_0x3411d5(0x3a9)],_0x12e876=Window_BattleStatus['prototype'][_0x3411d5(0x5a2)](),_0x283eec=Graphics[_0x3411d5(0x256)]-(_0x126cb5[_0x3411d5(0x5ab)]||0xc0),_0x4c0f18=this[_0x3411d5(0x47a)]()+_0x12e876,_0x2d81f1=this[_0x3411d5(0x4b4)]()?0x0:Graphics[_0x3411d5(0x256)]-_0x283eec,_0x44303b=Graphics[_0x3411d5(0x18f)]-_0x4c0f18+_0x12e876;return new Rectangle(_0x2d81f1,_0x44303b,_0x283eec,_0x4c0f18);},Scene_Battle[_0x19a075(0x475)][_0x19a075(0x188)]=function(){const _0x39eef3=_0x19a075,_0x4cef53=Window_BattleStatus[_0x39eef3(0x475)][_0x39eef3(0x5a2)](),_0x24a01c=Graphics[_0x39eef3(0x256)],_0x2b7ba0=this[_0x39eef3(0x47a)]()+_0x4cef53,_0x143eff=0x0,_0x4aea0e=Graphics[_0x39eef3(0x18f)]-_0x2b7ba0+_0x4cef53;return new Rectangle(_0x143eff,_0x4aea0e,_0x24a01c,_0x2b7ba0);},Scene_Battle['prototype'][_0x19a075(0x298)]=function(){const _0x1c1973=_0x19a075,_0x3f2073=Graphics['boxWidth']/0x2,_0x40c498=this[_0x1c1973(0x2ad)](VisuMZ['BattleCore'][_0x1c1973(0x7e0)]['BattleLayout'][_0x1c1973(0x557)],!![]),_0x2aedea=Math['round']((Graphics[_0x1c1973(0x256)]-_0x3f2073)/0x2),_0x3ee5ba=Graphics[_0x1c1973(0x18f)]-_0x40c498-this[_0x1c1973(0x188)]()[_0x1c1973(0x87b)];return new Rectangle(_0x2aedea,_0x3ee5ba,_0x3f2073,_0x40c498);},Scene_Battle[_0x19a075(0x475)][_0x19a075(0x4dd)]=function(){const _0x2cbc76=_0x19a075,_0x2f37d6=Graphics[_0x2cbc76(0x594)],_0x20d90e=Math[_0x2cbc76(0x48a)]((Graphics['boxWidth']-_0x2f37d6)/0x2),_0x3806ea=this[_0x2cbc76(0x168)](),_0x458d6c=(Graphics[_0x2cbc76(0x87b)]-Graphics['boxHeight'])/-0x2;return new Rectangle(_0x20d90e,_0x458d6c,_0x2f37d6,_0x3806ea);},Scene_Battle[_0x19a075(0x475)][_0x19a075(0x5a7)]=function(){const _0x12719d=_0x19a075,_0x113527=Graphics[_0x12719d(0x594)],_0x59bb00=Math[_0x12719d(0x48a)]((Graphics[_0x12719d(0x256)]-_0x113527)/0x2),_0x2665c5=this['calcWindowHeight'](0x4,!![]),_0x1cbf57=Graphics[_0x12719d(0x18f)]-_0x2665c5+(Graphics[_0x12719d(0x87b)]-Graphics[_0x12719d(0x18f)])/0x2;return new Rectangle(_0x59bb00,_0x1cbf57,_0x113527,_0x2665c5);},Scene_Battle['prototype'][_0x19a075(0x804)]=function(){const _0x51ea88=_0x19a075,_0x3c4957=Math[_0x51ea88(0x1ec)](Graphics[_0x51ea88(0x594)]/0x3),_0x5d67b4=this['isRightInputMode']()?(Graphics['width']+Graphics[_0x51ea88(0x256)])/0x2-_0x3c4957:(Graphics[_0x51ea88(0x594)]-Graphics[_0x51ea88(0x256)])/-0x2,_0x45069b=this['helpWindowRectBorderStyle'](),_0x5109ee=_0x45069b['y']+_0x45069b[_0x51ea88(0x87b)],_0x4df108=this[_0x51ea88(0x5a7)](),_0x3a591f=_0x4df108['y']-_0x5109ee;return new Rectangle(_0x5d67b4,_0x5109ee,_0x3c4957,_0x3a591f);},Scene_Battle[_0x19a075(0x475)][_0x19a075(0x1f2)]=function(){const _0x22125d=_0x19a075,_0x86c874=Math[_0x22125d(0x312)](Graphics[_0x22125d(0x594)]/0x3),_0x4ecca9=Math['round']((Graphics[_0x22125d(0x256)]-_0x86c874)/0x2),_0x2b99b0=this['partyCommandWindowRectBorderStyle'](),_0x4f343c=_0x2b99b0['y'],_0xf6f207=_0x2b99b0[_0x22125d(0x87b)];return new Rectangle(_0x4ecca9,_0x4f343c,_0x86c874,_0xf6f207);},Scene_Battle[_0x19a075(0x475)][_0x19a075(0x62b)]=function(){const _0x5c46de=_0x19a075;this[_0x5c46de(0x400)]['y']=this[_0x5c46de(0x5f1)]['y']+this[_0x5c46de(0x5f1)][_0x5c46de(0x87b)],this['isRightInputMode']()?this[_0x5c46de(0x4db)]()==='border'?this[_0x5c46de(0x400)]['x']=0x8:this[_0x5c46de(0x400)]['x']=-this[_0x5c46de(0x400)][_0x5c46de(0x594)]-0x4:this[_0x5c46de(0x400)]['x']=Graphics[_0x5c46de(0x594)]-(Graphics[_0x5c46de(0x594)]-Graphics[_0x5c46de(0x256)])/0x2-this[_0x5c46de(0x400)][_0x5c46de(0x594)]-0x4;},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x285)]=Scene_Battle[_0x19a075(0x475)]['skillWindowRect'],Scene_Battle['prototype']['skillWindowRect']=function(){const _0x4c3368=_0x19a075;if(this[_0x4c3368(0x4db)]()===_0x4c3368(0x8d0))return this['skillItemWindowRectBorderStyle']();else return this[_0x4c3368(0x6cc)]()?this[_0x4c3368(0x541)]():VisuMZ[_0x4c3368(0x73b)]['Scene_Battle_skillWindowRect'][_0x4c3368(0x2c6)](this);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x1e8)]=Scene_Battle[_0x19a075(0x475)][_0x19a075(0x41e)],Scene_Battle['prototype'][_0x19a075(0x41e)]=function(){const _0x2adf54=_0x19a075;if(this[_0x2adf54(0x4db)]()==='border')return this[_0x2adf54(0x1f2)]();else return this[_0x2adf54(0x6cc)]()?this[_0x2adf54(0x541)]():VisuMZ[_0x2adf54(0x73b)]['Scene_Battle_itemWindowRect']['call'](this);},Scene_Battle[_0x19a075(0x475)][_0x19a075(0x6cc)]=function(){const _0x6ed58d=_0x19a075;return VisuMZ['BattleCore'][_0x6ed58d(0x7e0)]['BattleLayout']['SkillItemMiddleLayout'];},Scene_Battle['prototype'][_0x19a075(0x541)]=function(){const _0x2b606c=_0x19a075,_0x3a66cf=Sprite_Button[_0x2b606c(0x475)]['blockWidth']()*0x2+0x4;let _0x5efc18=Graphics[_0x2b606c(0x256)]-_0x3a66cf;Imported[_0x2b606c(0x7b7)]&&SceneManager['isSideButtonLayout']()&&(_0x5efc18+=_0x3a66cf);const _0x1a8ff3=this[_0x2b606c(0x4ce)](),_0x16ce19=Graphics[_0x2b606c(0x18f)]-_0x1a8ff3-this[_0x2b606c(0x260)]()[_0x2b606c(0x87b)]+Window_BattleStatus[_0x2b606c(0x475)][_0x2b606c(0x5a2)](),_0x3b8a32=0x0;return new Rectangle(_0x3b8a32,_0x1a8ff3,_0x5efc18,_0x16ce19);},Scene_Battle[_0x19a075(0x475)][_0x19a075(0x5a4)]=function(){const _0x575763=_0x19a075;if(!VisuMZ[_0x575763(0x73b)][_0x575763(0x7e0)]['Enemy'][_0x575763(0x7ce)])return;this[_0x575763(0x180)]=new Sprite(),this[_0x575763(0x180)]['x']=this[_0x575763(0x3fb)]['x'],this[_0x575763(0x180)]['y']=this[_0x575763(0x3fb)]['y'];const _0x4cfdcf=this['children'][_0x575763(0x93c)](this[_0x575763(0x3fb)]);this['addChildAt'](this[_0x575763(0x180)],_0x4cfdcf);for(let _0x112d08=0x0;_0x112d08<0x8;_0x112d08++){const _0x51d9d7=new Window_EnemyName(_0x112d08);this[_0x575763(0x180)]['addChild'](_0x51d9d7);}},Sprite_Battler[_0x19a075(0x7f7)]=VisuMZ[_0x19a075(0x73b)][_0x19a075(0x7e0)][_0x19a075(0x72c)]['MotionSpeed'],VisuMZ['BattleCore'][_0x19a075(0x52f)]=Sprite_Battler[_0x19a075(0x475)]['initMembers'],Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x200)]=function(){const _0x35ffec=_0x19a075;VisuMZ[_0x35ffec(0x73b)][_0x35ffec(0x52f)]['call'](this),this[_0x35ffec(0x35f)]();if(this['constructor']===Sprite_Enemy)this[_0x35ffec(0x65c)]();this[_0x35ffec(0x23f)]();},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x35f)]=function(){const _0xe4050a=_0x19a075;this[_0xe4050a(0x5dc)]=0x0,this[_0xe4050a(0x6b6)]=0x0,this[_0xe4050a(0x408)]=0x0,this[_0xe4050a(0x76c)]=0x0,this[_0xe4050a(0x5c2)]=0x0,this[_0xe4050a(0x5a1)]=0x0,this[_0xe4050a(0x603)]=_0xe4050a(0x36a),this[_0xe4050a(0x479)]=0x0,this['_jumpMaxHeight']=0x0,this[_0xe4050a(0x42e)]=0x0,this[_0xe4050a(0x181)]=0x0,this[_0xe4050a(0x1c9)]=0xff,this['_opacityDuration']=0x0,this[_0xe4050a(0x8e0)]=0x0,this['_opacityEasing']=_0xe4050a(0x36a),this[_0xe4050a(0x629)]=0x0,this['_targetAngle']=0x0,this[_0xe4050a(0x2e3)]=0x0,this['_angleWholeDuration']=0x0,this[_0xe4050a(0x493)]=_0xe4050a(0x36a),this[_0xe4050a(0x821)]=!![],this[_0xe4050a(0x4c7)]=0x0,this[_0xe4050a(0x5ec)]=0x0,this[_0xe4050a(0x685)]=0x0,this[_0xe4050a(0x87d)]=0x0,this[_0xe4050a(0x926)]=0x0,this[_0xe4050a(0x521)]=0x0,this[_0xe4050a(0x37e)]=_0xe4050a(0x36a),this[_0xe4050a(0x336)]=0x1,this['_growY']=0x1,this[_0xe4050a(0x378)]=0x1,this[_0xe4050a(0x477)]=0x1,this[_0xe4050a(0x7d4)]=0x0,this[_0xe4050a(0x778)]=0x0,this[_0xe4050a(0x392)]=_0xe4050a(0x36a),this[_0xe4050a(0x1f7)]=0x1;},Sprite_Battler[_0x19a075(0x475)]['createShadowSprite']=function(){const _0x1cbecb=_0x19a075;this['_shadowSprite']=new Sprite(),this[_0x1cbecb(0x3ec)][_0x1cbecb(0x3ff)]=ImageManager[_0x1cbecb(0x54a)](_0x1cbecb(0x7af)),this['_shadowSprite'][_0x1cbecb(0x3ff)][_0x1cbecb(0x91a)]=VisuMZ[_0x1cbecb(0x73b)][_0x1cbecb(0x7e0)][_0x1cbecb(0x72c)][_0x1cbecb(0x32b)],this[_0x1cbecb(0x3ec)]['anchor']['x']=0.5,this[_0x1cbecb(0x3ec)]['anchor']['y']=0.5,this[_0x1cbecb(0x3ec)]['y']=-0x2,this[_0x1cbecb(0x3ec)][_0x1cbecb(0x3cc)]=![],this[_0x1cbecb(0x470)](this[_0x1cbecb(0x3ec)]);},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x23f)]=function(){const _0x4eb1c0=_0x19a075;this['_distortionSprite']=new Sprite(),this[_0x4eb1c0(0x8ab)][_0x4eb1c0(0x49e)]['x']=0.5,this['_distortionSprite']['anchor']['y']=0.5,this[_0x4eb1c0(0x470)](this[_0x4eb1c0(0x8ab)]);},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x59f)]=function(){const _0x5689af=_0x19a075;if(!this[_0x5689af(0x8ab)])return;if(this[_0x5689af(0x3ec)]){const _0x1c1c25=this[_0x5689af(0x8b1)](this['_distortionSprite']);this[_0x5689af(0x22b)](this[_0x5689af(0x3ec)],_0x1c1c25),this[_0x5689af(0x404)]();}this['_svBattlerSprite']&&this[_0x5689af(0x8ab)][_0x5689af(0x470)](this[_0x5689af(0x4a0)]),this[_0x5689af(0x4c8)]&&this[_0x5689af(0x8ab)][_0x5689af(0x470)](this[_0x5689af(0x4c8)]),this[_0x5689af(0x670)]&&this['_distortionSprite'][_0x5689af(0x470)](this[_0x5689af(0x670)]),this[_0x5689af(0x4cd)]&&this[_0x5689af(0x8ab)][_0x5689af(0x470)](this['_dragonbonesSpriteContainer']);},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x404)]=function(){const _0x5ebf28=_0x19a075;if(!this[_0x5ebf28(0x3ec)])return;if(this[_0x5ebf28(0x8b3)]&&this[_0x5ebf28(0x8b3)]['svBattlerShadowVisible']()){const _0x42726e=this[_0x5ebf28(0x3ec)][_0x5ebf28(0x3ff)];this[_0x5ebf28(0x3ec)][_0x5ebf28(0x82c)](0x0,0x0,_0x42726e['width'],_0x42726e['height']);}else this['_shadowSprite'][_0x5ebf28(0x82c)](0x0,0x0,0x0,0x0);},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x8bc)]=function(){const _0x1e99ae=_0x19a075;return SceneManager[_0x1e99ae(0x553)]()?SceneManager[_0x1e99ae(0x3a8)][_0x1e99ae(0x525)][_0x1e99ae(0x82d)]:this['parent'];},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x867)]=function(_0x2e33e9,_0x477dff){const _0x21b7db=_0x19a075;if(!this[_0x21b7db(0x8b3)][_0x21b7db(0x209)]())return;const _0x4a00ce=VisuMZ[_0x21b7db(0x73b)][_0x21b7db(0x7e0)][_0x21b7db(0x4d3)],_0x54972c=new Sprite_Damage();_0x54972c[_0x21b7db(0x50e)]=_0x4a00ce[_0x21b7db(0x6fd)],this[_0x21b7db(0x62a)](_0x54972c),_0x54972c['setupTextPopup'](_0x2e33e9,_0x477dff),this[_0x21b7db(0x7c7)](_0x54972c);},Sprite_Battler['prototype'][_0x19a075(0x278)]=function(_0x493996,_0xce0cb8,_0x25fd68){const _0x2b2f20=_0x19a075;if(!this[_0x2b2f20(0x8b3)][_0x2b2f20(0x209)]())return;const _0x13382c=VisuMZ['BattleCore'][_0x2b2f20(0x7e0)]['Damage'],_0x1056ee=new Sprite_Damage();_0x1056ee[_0x2b2f20(0x50e)]=_0x13382c[_0x2b2f20(0x6fd)],this[_0x2b2f20(0x62a)](_0x1056ee),_0x1056ee[_0x2b2f20(0x278)](_0x493996,_0xce0cb8,_0x25fd68),this['addDamageSprite'](_0x1056ee);},Sprite_Battler[_0x19a075(0x475)]['setupDamagePopup']=function(){const _0x5b7a0d=_0x19a075;if(!this['_battler'][_0x5b7a0d(0x895)]())return;while(this['_battler'][_0x5b7a0d(0x895)]()){this[_0x5b7a0d(0x8b3)][_0x5b7a0d(0x209)]()&&this[_0x5b7a0d(0x912)]();}this['_battler']['clearDamagePopup'](),this['_battler'][_0x5b7a0d(0x85d)]();},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x912)]=function(){const _0xabb0b9=_0x19a075,_0x45ad3d=VisuMZ['BattleCore'][_0xabb0b9(0x7e0)][_0xabb0b9(0x4d3)],_0x2a6784=new Sprite_Damage();_0x2a6784['_duration']=_0x45ad3d[_0xabb0b9(0x6fd)],this[_0xabb0b9(0x62a)](_0x2a6784),_0x2a6784['setup'](this[_0xabb0b9(0x8b3)]),_0x2a6784['setupBattleCore'](this[_0xabb0b9(0x8b3)]),this['addDamageSprite'](_0x2a6784);},Sprite_Battler[_0x19a075(0x475)]['addDamageSprite']=function(_0x3fec64){const _0x490838=_0x19a075;this[_0x490838(0x2c4)][_0x490838(0x7cc)](_0x3fec64);if(this[_0x490838(0x7a7)]())SceneManager[_0x490838(0x3a8)][_0x490838(0x828)][_0x490838(0x7c7)](_0x3fec64,this[_0x490838(0x8b3)]);else{this[_0x490838(0x8bc)]()[_0x490838(0x470)](_0x3fec64);if(SceneManager[_0x490838(0x7d3)]())_0x3fec64[_0x490838(0x70f)]['x']=-0x1;}},Sprite_Battler[_0x19a075(0x475)]['isShownOnBattlePortrait']=function(){const _0x1af602=_0x19a075;return!$gameSystem['isSideView']()&&this[_0x1af602(0x8b3)]&&this[_0x1af602(0x8b3)][_0x1af602(0x34c)]();},Sprite_Battler['prototype'][_0x19a075(0x62a)]=function(_0x22940d){const _0x3f75f1=_0x19a075,_0x4320ee=VisuMZ['BattleCore'][_0x3f75f1(0x7e0)][_0x3f75f1(0x4d3)],_0xc6fa56=SceneManager[_0x3f75f1(0x7d3)]()?-0x1:0x1;let _0xcbea5=this['x'],_0x3a96aa=this['y'];const _0x407292=SceneManager[_0x3f75f1(0x3a8)]['_statusWindow'];if(_0x407292&&this[_0x3f75f1(0x8c7)]===_0x407292){_0xcbea5+=_0x407292['x']-this[_0x3f75f1(0x4ed)]();const _0x5b5a05=_0x407292[_0x3f75f1(0x1f3)]()*0x3/0x4;_0x3a96aa=_0x407292['y']+_0x5b5a05,_0x3a96aa=Math[_0x3f75f1(0x5cc)](_0x3a96aa,_0x407292['y']+this['y']-this[_0x3f75f1(0x87b)]+_0x5b5a05);}_0x22940d['x']=Math['round'](_0xcbea5+this[_0x3f75f1(0x4ed)]()*_0xc6fa56),_0x22940d['y']=Math[_0x3f75f1(0x48a)](_0x3a96aa+this[_0x3f75f1(0x60b)]());if(_0x4320ee[_0x3f75f1(0x1af)])for(const _0x48a657 of this[_0x3f75f1(0x2c4)]){_0x48a657['x']+=_0x4320ee[_0x3f75f1(0x1dd)]*_0xc6fa56,_0x48a657['y']+=_0x4320ee[_0x3f75f1(0x6b5)];}else{const _0x27e713=this[_0x3f75f1(0x2c4)][this['_damages'][_0x3f75f1(0x644)]-0x1];_0x27e713&&(_0x22940d['x']=_0x27e713['x']+_0x4320ee[_0x3f75f1(0x1dd)]*_0xc6fa56,_0x22940d['y']=_0x27e713['y']+_0x4320ee[_0x3f75f1(0x6b5)]);}},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x747)]=Sprite_Battler[_0x19a075(0x475)]['damageOffsetX'],Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x4ed)]=function(){const _0xb6e161=_0x19a075;let _0x5600fa=VisuMZ[_0xb6e161(0x73b)][_0xb6e161(0x747)]['call'](this),_0x4699c8=VisuMZ[_0xb6e161(0x73b)]['Settings']['Damage']['PopupOffsetX']||0x0;return Math['round'](_0x5600fa+_0x4699c8);},VisuMZ['BattleCore'][_0x19a075(0x3df)]=Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x60b)],Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x60b)]=function(){const _0x56f962=_0x19a075;let _0xd0df09=VisuMZ[_0x56f962(0x73b)][_0x56f962(0x3df)][_0x56f962(0x2c6)](this);switch(VisuMZ[_0x56f962(0x73b)][_0x56f962(0x7e0)]['Damage'][_0x56f962(0x3f6)]){case _0x56f962(0x6b7):_0xd0df09-=this['height']*this[_0x56f962(0x70f)]['y'];break;case _0x56f962(0x268):_0xd0df09-=this[_0x56f962(0x87b)]*this[_0x56f962(0x70f)]['y']*0.5;break;}let _0x20401b=VisuMZ[_0x56f962(0x73b)][_0x56f962(0x7e0)]['Damage'][_0x56f962(0x630)]||0x0;return Math[_0x56f962(0x48a)](_0xd0df09+_0x20401b);},Sprite_Actor['prototype'][_0x19a075(0x4ed)]=function(){const _0x100d36=_0x19a075;return Sprite_Battler['prototype'][_0x100d36(0x4ed)]['call'](this);},Sprite_Actor[_0x19a075(0x475)][_0x19a075(0x60b)]=function(){const _0x2ee70c=_0x19a075;return Sprite_Battler[_0x2ee70c(0x475)][_0x2ee70c(0x60b)][_0x2ee70c(0x2c6)](this);},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x1fe)]=function(_0x100448){const _0x6e39a5=_0x19a075;this[_0x6e39a5(0x7a7)]()?SceneManager[_0x6e39a5(0x3a8)][_0x6e39a5(0x828)][_0x6e39a5(0x928)](_0x100448):(this[_0x6e39a5(0x8bc)]()[_0x6e39a5(0x42b)](_0x100448),this['_damages'][_0x6e39a5(0x8c3)](_0x100448),_0x100448['destroy']());},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x3ba)]=Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x7a6)],Sprite_Battler[_0x19a075(0x475)]['setHome']=function(_0x252da2,_0x3b6057){const _0x39c615=_0x19a075,_0x2e3d8f=VisuMZ[_0x39c615(0x73b)]['Settings'];if(this['constructor']===Sprite_Actor)_0x252da2+=_0x2e3d8f[_0x39c615(0x72c)]['OffsetX']||0x0,_0x3b6057+=_0x2e3d8f[_0x39c615(0x72c)][_0x39c615(0x4ea)]||0x0;else this[_0x39c615(0x3d5)]===Sprite_Enemy&&(_0x252da2+=_0x2e3d8f[_0x39c615(0x343)][_0x39c615(0x3d0)]||0x0,_0x3b6057+=_0x2e3d8f[_0x39c615(0x343)][_0x39c615(0x4ea)]||0x0);VisuMZ[_0x39c615(0x73b)][_0x39c615(0x3ba)]['call'](this,_0x252da2,_0x3b6057);},VisuMZ[_0x19a075(0x73b)]['Sprite_Battler_update']=Sprite_Battler['prototype'][_0x19a075(0x8cf)],Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x8cf)]=function(){const _0x221d47=_0x19a075;VisuMZ[_0x221d47(0x73b)][_0x221d47(0x4e2)]['call'](this),!this[_0x221d47(0x8b3)]&&this[_0x221d47(0x507)]&&(this['_hpGaugeSprite']['visible']=![]);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x251)]=Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x412)],Sprite_Battler['prototype'][_0x19a075(0x412)]=function(){const _0x9d91e9=_0x19a075;this[_0x9d91e9(0x4c2)](),this['updateSkew'](),this[_0x9d91e9(0x6b4)](),this['updateFlip'](),this[_0x9d91e9(0x390)](),VisuMZ['BattleCore']['Sprite_Battler_updateMain']['call'](this);if(this[_0x9d91e9(0x3d5)]===Sprite_Enemy)this[_0x9d91e9(0x230)]();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x939)]=Sprite_Battler['prototype'][_0x19a075(0x8ef)],Sprite_Battler[_0x19a075(0x475)]['updatePosition']=function(){const _0x2529e4=_0x19a075;VisuMZ[_0x2529e4(0x73b)][_0x2529e4(0x939)][_0x2529e4(0x2c6)](this),this[_0x2529e4(0x2ff)](),this[_0x2529e4(0x799)]();},Sprite_Battler['prototype'][_0x19a075(0x2ff)]=function(){const _0x1677d8=_0x19a075;this[_0x1677d8(0x5dc)]=this['x'],this[_0x1677d8(0x6b6)]=this['y'],this[_0x1677d8(0x952)](),this[_0x1677d8(0x455)](),this['x']+=this['extraPositionX'](),this['y']+=this['extraPositionY'](),this['x']=Math['round'](this['x']),this['y']=Math[_0x1677d8(0x48a)](this['y']);},Sprite_Battler[_0x19a075(0x475)]['extraPositionX']=function(){let _0x478c0d=0x0;return _0x478c0d;},Sprite_Battler['prototype'][_0x19a075(0x769)]=function(){const _0x394ee6=_0x19a075;let _0x176312=0x0;this[_0x394ee6(0x8b3)]&&!this['_battler']['isBattlerGrounded']()&&(_0x176312-=this[_0x394ee6(0x408)],_0x176312-=this[_0x394ee6(0x479)]);if(this[_0x394ee6(0x8ab)]&&this['constructor']!==Sprite_SvEnemy){const _0x7a9c67=this[_0x394ee6(0x8ab)][_0x394ee6(0x70f)]['y'];_0x176312-=(_0x7a9c67-0x1)*this[_0x394ee6(0x87b)];}return _0x176312;},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x8a2)]=function(){const _0x595477=_0x19a075,_0x81bac4=this[_0x595477(0x8b3)]&&this[_0x595477(0x8b3)][_0x595477(0x787)]();this[_0x595477(0x1f7)]=(_0x81bac4?-0x1:0x1)*Math[_0x595477(0x244)](this[_0x595477(0x70f)]['x']);},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x815)]=function(_0x10bfe7,_0x4fd3a7,_0x4a5786){const _0x599f57=_0x19a075;if(!this[_0x599f57(0x27b)]())return;if(this[_0x599f57(0x76c)]===_0x10bfe7)return;this[_0x599f57(0x76c)]=_0x10bfe7,this[_0x599f57(0x5c2)]=_0x4fd3a7,this[_0x599f57(0x5a1)]=_0x4fd3a7,this[_0x599f57(0x603)]=_0x4a5786||_0x599f57(0x36a);if(_0x4fd3a7<=0x0)this[_0x599f57(0x408)]=_0x10bfe7;},Sprite_Battler['prototype'][_0x19a075(0x952)]=function(){const _0x87688a=_0x19a075;if(this[_0x87688a(0x5c2)]<=0x0)return;const _0x44dd76=this[_0x87688a(0x5c2)],_0xb76228=this['_floatWholeDuration'],_0x2fe6fc=this['_floatEasing'];Imported[_0x87688a(0x7b7)]?this[_0x87688a(0x408)]=this[_0x87688a(0x3aa)](this['_floatHeight'],this[_0x87688a(0x76c)],_0x44dd76,_0xb76228,_0x2fe6fc):this['_floatHeight']=(this[_0x87688a(0x408)]*(_0x44dd76-0x1)+this[_0x87688a(0x76c)])/_0x44dd76;this[_0x87688a(0x5c2)]--;if(this['_floatDuration']<=0x0)this[_0x87688a(0x423)]();},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x423)]=function(){const _0x29f99f=_0x19a075;this[_0x29f99f(0x408)]=this['_targetFloatHeight'];},Sprite_Battler[_0x19a075(0x475)]['isFloating']=function(){const _0x350154=_0x19a075;return this[_0x350154(0x5c2)]>0x0;},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x1bb)]=function(_0x59ade9,_0x234f2b){const _0x219b90=_0x19a075;if(!this[_0x219b90(0x27b)]())return;if(_0x234f2b<=0x0)return;this[_0x219b90(0x5be)]=_0x59ade9,this[_0x219b90(0x42e)]=_0x234f2b,this[_0x219b90(0x181)]=_0x234f2b;},Sprite_Battler['prototype'][_0x19a075(0x455)]=function(){const _0x5c07e0=_0x19a075;if(this[_0x5c07e0(0x42e)]<=0x0)return;const _0x5ac14b=this['_jumpWholeDuration']-this[_0x5c07e0(0x42e)],_0x21722b=this['_jumpWholeDuration']/0x2,_0x1fbcea=this[_0x5c07e0(0x5be)],_0x2dafa=-_0x1fbcea/Math[_0x5c07e0(0x4c3)](_0x21722b,0x2);this[_0x5c07e0(0x479)]=_0x2dafa*Math[_0x5c07e0(0x4c3)](_0x5ac14b-_0x21722b,0x2)+_0x1fbcea,this[_0x5c07e0(0x42e)]--;if(this['_jumpDuration']<=0x0)return this[_0x5c07e0(0x94b)]();},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x94b)]=function(){this['_jumpHeight']=0x0;},Sprite_Battler['prototype'][_0x19a075(0x6bc)]=function(){const _0x36e780=_0x19a075;return this[_0x36e780(0x42e)]>0x0;},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x177)]=function(_0x1b946d,_0x347143,_0x21a059){const _0x12c477=_0x19a075;if(this[_0x12c477(0x1c9)]===_0x1b946d)return;this['_targetOpacity']=_0x1b946d,this[_0x12c477(0x234)]=_0x347143,this['_opacityWholeDuration']=_0x347143,this['_opacityEasing']=_0x21a059||'Linear';if(_0x347143<=0x0)this[_0x12c477(0x50f)]=_0x1b946d;},Sprite_Battler['prototype'][_0x19a075(0x799)]=function(){const _0x158021=_0x19a075;if(this[_0x158021(0x234)]<=0x0)return;const _0x43b14a=this[_0x158021(0x234)],_0x80f658=this['_opacityWholeDuration'],_0x1cf8b2=this[_0x158021(0x399)];Imported[_0x158021(0x7b7)]?this[_0x158021(0x50f)]=this[_0x158021(0x3aa)](this[_0x158021(0x50f)],this[_0x158021(0x1c9)],_0x43b14a,_0x80f658,_0x1cf8b2):this[_0x158021(0x50f)]=(this[_0x158021(0x50f)]*(_0x43b14a-0x1)+this[_0x158021(0x1c9)])/_0x43b14a;this[_0x158021(0x234)]--;if(this[_0x158021(0x234)]<=0x0)this[_0x158021(0x1e7)]();},Sprite_Battler[_0x19a075(0x475)]['onOpacityEnd']=function(){const _0xa3c2bc=_0x19a075;this[_0xa3c2bc(0x50f)]=this[_0xa3c2bc(0x1c9)];},Sprite_Battler[_0x19a075(0x475)]['isChangingOpacity']=function(){return this['_opacityDuration']>0x0;},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x230)]=function(){const _0x29dcb2=_0x19a075;this['_shadowSprite'][_0x29dcb2(0x3cc)]=this[_0x29dcb2(0x8b3)][_0x29dcb2(0x7ed)](),this['updateShadowPosition']();},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x449)]=function(){const _0x45bf21=_0x19a075;if(!this[_0x45bf21(0x3ec)])return;this[_0x45bf21(0x3ec)]['y']=Math[_0x45bf21(0x48a)](-this[_0x45bf21(0x769)]()-0x2);},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x4c2)]=function(){const _0x4c23c4=_0x19a075;if(this[_0x4c23c4(0x3d5)]===Sprite_SvEnemy)return;this[_0x4c23c4(0x5e5)](),this['finalizeScale']();},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x537)]=function(){const _0x293138=_0x19a075,_0x390826=this['_distortionSprite'];_0x390826&&(_0x390826[_0x293138(0x70f)]['x']=this[_0x293138(0x665)](),_0x390826[_0x293138(0x70f)]['y']=this['mainSpriteScaleY']());},Sprite_Battler['prototype']['mainSpriteScaleX']=function(){const _0x47f937=_0x19a075;let _0xbd3f39=0x1;return _0xbd3f39*=this['_flipScaleX'],_0xbd3f39*=this[_0x47f937(0x336)],_0xbd3f39;},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x800)]=function(){return 0x1*this['_growY'];},Sprite_Battler[_0x19a075(0x475)]['mainSpriteWidth']=function(){const _0x1b974f=_0x19a075;return this[_0x1b974f(0x594)]*this['mainSpriteScaleX']();},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x38e)]=function(){const _0x1fd331=_0x19a075;return this[_0x1fd331(0x87b)]*this[_0x1fd331(0x800)]();},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x2d5)]=function(_0x5efeac,_0x2bc66f,_0x2d9f4b,_0x4da39c){const _0x3d8bc1=_0x19a075;if(!this['canMove']())return;if(!this[_0x3d8bc1(0x8ab)])return;if(this['_targetGrowX']===_0x5efeac&&this[_0x3d8bc1(0x477)]===_0x2bc66f)return;this[_0x3d8bc1(0x378)]=_0x5efeac,this[_0x3d8bc1(0x477)]=_0x2bc66f,this[_0x3d8bc1(0x7d4)]=_0x2d9f4b,this[_0x3d8bc1(0x778)]=_0x2d9f4b,this[_0x3d8bc1(0x392)]=_0x4da39c||_0x3d8bc1(0x36a),_0x2d9f4b<=0x0&&(this[_0x3d8bc1(0x336)]=this['_targetGrowX'],this[_0x3d8bc1(0x78f)]=this[_0x3d8bc1(0x477)]);},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x5e5)]=function(){const _0x49e41d=_0x19a075;if(this[_0x49e41d(0x7d4)]<=0x0)return;if(!this['_distortionSprite'])return;const _0x3c6a96=this['_growDuration'],_0x12a0b0=this[_0x49e41d(0x778)],_0x2df1e2=this[_0x49e41d(0x392)];Imported[_0x49e41d(0x7b7)]?(this['_growX']=this[_0x49e41d(0x3aa)](this['_growX'],this['_targetGrowX'],_0x3c6a96,_0x12a0b0,_0x2df1e2),this[_0x49e41d(0x78f)]=this['applyEasing'](this[_0x49e41d(0x78f)],this['_targetGrowY'],_0x3c6a96,_0x12a0b0,_0x2df1e2)):(this['_growX']=(this[_0x49e41d(0x336)]*(_0x3c6a96-0x1)+this['_targetGrowX'])/_0x3c6a96,this[_0x49e41d(0x78f)]=(this[_0x49e41d(0x78f)]*(_0x3c6a96-0x1)+this[_0x49e41d(0x477)])/_0x3c6a96);this['_growDuration']--;if(this['_growDuration']<=0x0)this[_0x49e41d(0x165)]();},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x165)]=function(){const _0x13de94=_0x19a075;this['_growX']=this[_0x13de94(0x378)],this[_0x13de94(0x78f)]=this[_0x13de94(0x477)];},Sprite_Battler['prototype'][_0x19a075(0x7ab)]=function(){const _0x3b34df=_0x19a075;return this[_0x3b34df(0x7d4)]>0x0;},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x3ed)]=function(_0x4df032,_0x5cbdba,_0x4a27e1,_0x38f98e){const _0x2d1d50=_0x19a075;if(!this[_0x2d1d50(0x27b)]())return;if(!this[_0x2d1d50(0x8ab)])return;if(this[_0x2d1d50(0x685)]===_0x4df032&&this[_0x2d1d50(0x87d)]===_0x5cbdba)return;this[_0x2d1d50(0x685)]=_0x4df032,this[_0x2d1d50(0x87d)]=_0x5cbdba,this['_skewDuration']=_0x4a27e1,this[_0x2d1d50(0x521)]=_0x4a27e1,this[_0x2d1d50(0x37e)]=_0x38f98e||'Linear',_0x4a27e1<=0x0&&(this[_0x2d1d50(0x8ab)]['skew']['x']=this[_0x2d1d50(0x685)],this[_0x2d1d50(0x8ab)][_0x2d1d50(0x677)]['y']=this[_0x2d1d50(0x87d)]);},Sprite_Battler[_0x19a075(0x475)]['updateSkew']=function(){const _0x4c2632=_0x19a075;if(this[_0x4c2632(0x926)]<=0x0)return;if(!this[_0x4c2632(0x8ab)])return;const _0x9d39ec=this['_skewDuration'],_0x1b89b3=this[_0x4c2632(0x521)],_0x124d37=this[_0x4c2632(0x37e)],_0x398254=this['_distortionSprite'];Imported[_0x4c2632(0x7b7)]?(_0x398254[_0x4c2632(0x677)]['x']=this[_0x4c2632(0x3aa)](_0x398254[_0x4c2632(0x677)]['x'],this['_targetSkewX'],_0x9d39ec,_0x1b89b3,_0x124d37),_0x398254['skew']['y']=this[_0x4c2632(0x3aa)](_0x398254[_0x4c2632(0x677)]['y'],this[_0x4c2632(0x87d)],_0x9d39ec,_0x1b89b3,_0x124d37)):(_0x398254[_0x4c2632(0x677)]['x']=(_0x398254['skew']['x']*(_0x9d39ec-0x1)+this['_targetSkewX'])/_0x9d39ec,_0x398254[_0x4c2632(0x677)]['y']=(_0x398254['skew']['y']*(_0x9d39ec-0x1)+this[_0x4c2632(0x87d)])/_0x9d39ec);this['_skewDuration']--;if(this['_skewDuration']<=0x0)this['onSkewEnd']();},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x44f)]=function(){const _0x2f5ef5=_0x19a075;this['_distortionSprite'][_0x2f5ef5(0x677)]['x']=this[_0x2f5ef5(0x685)],this[_0x2f5ef5(0x8ab)]['skew']['y']=this[_0x2f5ef5(0x87d)];},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x289)]=function(){const _0x4ebd55=_0x19a075;return this[_0x4ebd55(0x926)]>0x0;},Sprite_Battler[_0x19a075(0x475)]['startSpin']=function(_0x445035,_0x14b984,_0x417ee7,_0x4df245){const _0x75900b=_0x19a075;if(!this[_0x75900b(0x27b)]())return;if(!this[_0x75900b(0x8ab)])return;if(this['_targetAngle']===_0x445035)return;this[_0x75900b(0x8b9)]=_0x445035,this[_0x75900b(0x2e3)]=_0x14b984,this['_angleWholeDuration']=_0x14b984,this[_0x75900b(0x493)]=_0x417ee7||'Linear',this['_angleRevertOnFinish']=_0x4df245,this[_0x75900b(0x821)]===undefined&&(this[_0x75900b(0x821)]=!![]),_0x14b984<=0x0&&(this[_0x75900b(0x629)]=_0x445035,this[_0x75900b(0x821)]&&(this['_targetAngle']=0x0,this[_0x75900b(0x629)]=0x0));},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x6b4)]=function(){const _0x8aaa1f=_0x19a075;this[_0x8aaa1f(0x893)](),this[_0x8aaa1f(0x36f)]();},Sprite_Battler['prototype'][_0x19a075(0x893)]=function(){const _0x2eca74=_0x19a075;if(this[_0x2eca74(0x2e3)]<=0x0)return;const _0x3157c8=this['_angleDuration'],_0x481a1d=this[_0x2eca74(0x72f)],_0x22d8f8=this[_0x2eca74(0x493)];Imported[_0x2eca74(0x7b7)]?this[_0x2eca74(0x629)]=this['applyEasing'](this[_0x2eca74(0x629)],this['_targetAngle'],_0x3157c8,_0x481a1d,_0x22d8f8):this[_0x2eca74(0x629)]=(this[_0x2eca74(0x629)]*(_0x3157c8-0x1)+this['_targetAngle'])/_0x3157c8;this['_angleDuration']--;if(this[_0x2eca74(0x2e3)]<=0x0)this[_0x2eca74(0x5ee)]();},Sprite_Battler['prototype'][_0x19a075(0x5ee)]=function(){const _0x285e88=_0x19a075;this['_currentAngle']=this[_0x285e88(0x8b9)],this[_0x285e88(0x821)]&&(this['_targetAngle']=0x0,this['_currentAngle']=0x0);},Sprite_Battler[_0x19a075(0x475)]['isSpinning']=function(){return this['_angleDuration']>0x0;},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x36f)]=function(){const _0x5b06f3=_0x19a075;if(!this[_0x5b06f3(0x8ab)])return;const _0x2b75a5=this[_0x5b06f3(0x629)],_0x427b54=this[_0x5b06f3(0x70f)]['x'],_0x177a06=this[_0x5b06f3(0x8b3)][_0x5b06f3(0x34c)]()?-0x1:0x1;this[_0x5b06f3(0x8ab)]['angle']=_0x2b75a5*_0x427b54*_0x177a06;const _0x5a7a88=this['_distortionSprite'][_0x5b06f3(0x70f)]['y'];this[_0x5b06f3(0x8ab)]['y']=this[_0x5b06f3(0x87b)]*-0.5*(0x2-_0x5a7a88);const _0x4db423=[this[_0x5b06f3(0x670)],this[_0x5b06f3(0x4a0)],this[_0x5b06f3(0x4cd)]];for(const _0xdc0593 of _0x4db423){if(!_0xdc0593)continue;_0xdc0593['y']=this[_0x5b06f3(0x87b)]*0.5;}this[_0x5b06f3(0x3ec)]&&(this[_0x5b06f3(0x3ec)][_0x5b06f3(0x70f)]['x']=this[_0x5b06f3(0x8ab)][_0x5b06f3(0x70f)]['x'],this[_0x5b06f3(0x3ec)][_0x5b06f3(0x70f)]['y']=this[_0x5b06f3(0x8ab)][_0x5b06f3(0x70f)]['y']);},VisuMZ['BattleCore'][_0x19a075(0x411)]=Sprite_Actor[_0x19a075(0x475)][_0x19a075(0x37a)],Sprite_Actor[_0x19a075(0x475)]['createStateSprite']=function(){const _0x1267c7=_0x19a075;VisuMZ[_0x1267c7(0x73b)][_0x1267c7(0x411)]['call'](this),VisuMZ[_0x1267c7(0x73b)]['Settings'][_0x1267c7(0x88a)]['ShowActorGauge']&&this[_0x1267c7(0x606)]();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x5ea)]=Sprite_Enemy[_0x19a075(0x475)]['createStateIconSprite'],Sprite_Enemy['prototype'][_0x19a075(0x92b)]=function(){const _0x29bc63=_0x19a075;VisuMZ[_0x29bc63(0x73b)][_0x29bc63(0x7e0)][_0x29bc63(0x88a)]['ShowEnemyGauge']&&this[_0x29bc63(0x606)](),VisuMZ[_0x29bc63(0x73b)][_0x29bc63(0x5ea)][_0x29bc63(0x2c6)](this);},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x606)]=function(){const _0x451c8e=_0x19a075;if(!ConfigManager[_0x451c8e(0x1a8)])return;if(this[_0x451c8e(0x3d5)]===Sprite_SvEnemy)return;const _0x52c6dd=VisuMZ[_0x451c8e(0x73b)]['Settings'][_0x451c8e(0x88a)],_0x4757c1=new Sprite_HpGauge();_0x4757c1['anchor']['x']=_0x52c6dd[_0x451c8e(0x468)],_0x4757c1[_0x451c8e(0x49e)]['y']=_0x52c6dd[_0x451c8e(0x2dc)],_0x4757c1[_0x451c8e(0x70f)]['x']=_0x4757c1[_0x451c8e(0x70f)]['y']=_0x52c6dd[_0x451c8e(0x765)],this[_0x451c8e(0x507)]=_0x4757c1,this[_0x451c8e(0x470)](this[_0x451c8e(0x507)]);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x3f8)]=Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x6f6)],Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x6f6)]=function(_0x401cfd){const _0x1d5377=_0x19a075;VisuMZ[_0x1d5377(0x73b)][_0x1d5377(0x3f8)][_0x1d5377(0x2c6)](this,_0x401cfd),this[_0x1d5377(0x2cf)](_0x401cfd);},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x2cf)]=function(_0x1c81a9){const _0x43ca71=_0x19a075;if(!_0x1c81a9)return;if(!this[_0x43ca71(0x507)])return;if(_0x1c81a9['isActor']()){}else{if(_0x1c81a9[_0x43ca71(0x5a3)]()){if(this[_0x43ca71(0x3d5)]===Sprite_SvEnemy&&!_0x1c81a9[_0x43ca71(0x7ed)]())return;}}this[_0x43ca71(0x507)][_0x43ca71(0x8c0)](_0x1c81a9,'hp');},Sprite_Battler['prototype'][_0x19a075(0x390)]=function(){const _0x2062e7=_0x19a075;if(!this['_battler'])return;if(!this[_0x2062e7(0x507)])return;const _0x23f40b=VisuMZ['BattleCore'][_0x2062e7(0x7e0)][_0x2062e7(0x88a)],_0x353cb4=this['_hpGaugeSprite'];_0x353cb4[_0x2062e7(0x3cc)]=this[_0x2062e7(0x79a)]();const _0x23153d=_0x23f40b[_0x2062e7(0x3d0)],_0x29073a=_0x23f40b[_0x2062e7(0x4ea)];_0x353cb4['x']=_0x23153d,_0x353cb4['x']+=this[_0x2062e7(0x8b3)][_0x2062e7(0x8d6)](),_0x353cb4['y']=-this['height']+_0x29073a,_0x353cb4['y']+=this[_0x2062e7(0x8b3)][_0x2062e7(0x3b7)]();},Sprite_Battler['prototype'][_0x19a075(0x79a)]=function(){const _0xacbd5a=_0x19a075;if(!this[_0xacbd5a(0x8b3)])return![];if(this['_battler'][_0xacbd5a(0x34c)]())return!![];const _0x3ae82f=this['_battler'][_0xacbd5a(0x887)]()[_0xacbd5a(0x185)];if(_0x3ae82f['match'](/<SHOW HP GAUGE>/i))return!![];if(_0x3ae82f[_0xacbd5a(0x6c8)](/<HIDE HP GAUGE>/i))return![];const _0x5931d5=VisuMZ[_0xacbd5a(0x73b)][_0xacbd5a(0x7e0)][_0xacbd5a(0x88a)];if(_0x5931d5[_0xacbd5a(0x5f6)]){if(_0x5931d5['BTestBypass']&&BattleManager[_0xacbd5a(0x871)]())return!![];if(this['_battler'][_0xacbd5a(0x772)])return![];return this[_0xacbd5a(0x8b3)][_0xacbd5a(0x358)]();}return!![];},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x170)]=Sprite_Battler['prototype'][_0x19a075(0x505)],Sprite_Battler['prototype'][_0x19a075(0x505)]=function(){const _0x4e90fd=_0x19a075;if(!this['_battler'])return![];return VisuMZ[_0x4e90fd(0x73b)][_0x4e90fd(0x170)][_0x4e90fd(0x2c6)](this);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x43b)]=Sprite_Battler['prototype'][_0x19a075(0x478)],Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x478)]=function(_0x570af2,_0x295c45,_0x38f505){const _0x2e52b3=_0x19a075;this['canMove']()&&VisuMZ['BattleCore']['Sprite_Battler_startMove'][_0x2e52b3(0x2c6)](this,_0x570af2,_0x295c45,_0x38f505);},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x27b)]=function(){const _0x174b22=_0x19a075;if(this['_battler']&&this[_0x174b22(0x8b3)]['isDead']())return![];if(this[_0x174b22(0x8b3)]&&!this[_0x174b22(0x8b3)]['canBattlerMove']())return![];return $gameSystem['isSideView']();},Sprite_Battler[_0x19a075(0x475)]['stepForward']=function(){},Sprite_Battler[_0x19a075(0x475)]['stepBack']=function(){const _0x20aa97=_0x19a075;this[_0x20aa97(0x478)](0x0,0x0,0xc);},Sprite_Battler[_0x19a075(0x475)][_0x19a075(0x726)]=function(){},Sprite_Battler[_0x19a075(0x475)]['stepFlinch']=function(){const _0x12953f=_0x19a075,_0x10f754=VisuMZ[_0x12953f(0x73b)]['Settings']['Actor'],_0x5ac2ed=this[_0x12953f(0x8b3)]&&this[_0x12953f(0x8b3)][_0x12953f(0x34c)]()?0x1:-0x1,_0x532a25=this['_baseX']-this[_0x12953f(0x744)]+_0x5ac2ed*_0x10f754[_0x12953f(0x7bf)],_0xbeefde=this['_baseY']-this[_0x12953f(0x90a)]+_0x5ac2ed*_0x10f754[_0x12953f(0x436)],_0x2e5749=_0x10f754[_0x12953f(0x4cc)];this[_0x12953f(0x478)](_0x532a25,_0xbeefde,_0x2e5749);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x1ae)]=Sprite_Actor[_0x19a075(0x475)]['initMembers'],Sprite_Actor[_0x19a075(0x475)][_0x19a075(0x200)]=function(){const _0x5593f4=_0x19a075;VisuMZ['BattleCore'][_0x5593f4(0x1ae)][_0x5593f4(0x2c6)](this),this[_0x5593f4(0x59f)]();},Sprite_Actor[_0x19a075(0x475)][_0x19a075(0x6f1)]=function(){const _0x38784e=_0x19a075;return this['_distortionSprite']||this[_0x38784e(0x670)]||this;},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x635)]=Sprite_Actor[_0x19a075(0x475)][_0x19a075(0x6f2)],Sprite_Actor[_0x19a075(0x475)][_0x19a075(0x6f2)]=function(){},Sprite_Actor[_0x19a075(0x475)]['moveToStartPositionBattleCore']=function(_0x1a2188){const _0x8903ba=_0x19a075;if(SceneManager['isPreviousSceneBattleTransitionable']())return;if(!_0x1a2188)return;if(!_0x1a2188[_0x8903ba(0x27b)]())return;VisuMZ['BattleCore']['Sprite_Actor_moveToStartPosition'][_0x8903ba(0x2c6)](this);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x7e7)]=Sprite_Actor[_0x19a075(0x475)][_0x19a075(0x45f)],Sprite_Actor[_0x19a075(0x475)][_0x19a075(0x45f)]=function(_0x1a3c6d){const _0x35a7b3=_0x19a075;VisuMZ[_0x35a7b3(0x73b)]['Settings'][_0x35a7b3(0x72c)][_0x35a7b3(0x595)]?VisuMZ[_0x35a7b3(0x73b)]['Settings'][_0x35a7b3(0x72c)][_0x35a7b3(0x595)][_0x35a7b3(0x2c6)](this,_0x1a3c6d):VisuMZ[_0x35a7b3(0x73b)][_0x35a7b3(0x7e7)][_0x35a7b3(0x2c6)](this,_0x1a3c6d);},VisuMZ[_0x19a075(0x73b)]['Sprite_Actor_setBattler']=Sprite_Actor[_0x19a075(0x475)]['setBattler'],Sprite_Actor[_0x19a075(0x475)]['setBattler']=function(_0x342a36){const _0x2d4bfa=_0x19a075;VisuMZ['BattleCore'][_0x2d4bfa(0x720)][_0x2d4bfa(0x2c6)](this,_0x342a36),this[_0x2d4bfa(0x827)](_0x342a36);},Sprite_Actor['prototype'][_0x19a075(0x827)]=function(_0x6767bf){const _0x431d75=_0x19a075;if(!_0x6767bf)return;if(!this[_0x431d75(0x670)])return;this[_0x431d75(0x670)][_0x431d75(0x49e)]['x']=this[_0x431d75(0x23a)]['svBattlerAnchorX'](),this[_0x431d75(0x670)]['anchor']['y']=this[_0x431d75(0x23a)]['svBattlerAnchorY'](),this[_0x431d75(0x404)]();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x53f)]=Sprite_Actor[_0x19a075(0x475)][_0x19a075(0x8cf)],Sprite_Actor[_0x19a075(0x475)][_0x19a075(0x8cf)]=function(){const _0x2a87a0=_0x19a075;VisuMZ['BattleCore']['Sprite_Actor_update'][_0x2a87a0(0x2c6)](this),this[_0x2a87a0(0x23a)]&&(this[_0x2a87a0(0x1c3)](),this['updateStyleOpacity']());},VisuMZ['BattleCore'][_0x19a075(0x2d9)]=Sprite_Actor[_0x19a075(0x475)][_0x19a075(0x4ac)],Sprite_Actor[_0x19a075(0x475)]['updateBitmap']=function(){const _0x44ae92=_0x19a075;VisuMZ['BattleCore'][_0x44ae92(0x2d9)][_0x44ae92(0x2c6)](this),this[_0x44ae92(0x670)]&&this[_0x44ae92(0x670)][_0x44ae92(0x3ff)]&&this['_battler']&&(this['_mainSprite']['bitmap'][_0x44ae92(0x91a)]!==this[_0x44ae92(0x8b3)]['battlerSmoothImage']()&&(this[_0x44ae92(0x670)][_0x44ae92(0x3ff)]['smooth']=this['_battler'][_0x44ae92(0x1ce)]()));},VisuMZ[_0x19a075(0x73b)]['Sprite_Actor_updateShadow']=Sprite_Actor[_0x19a075(0x475)][_0x19a075(0x230)],Sprite_Actor[_0x19a075(0x475)][_0x19a075(0x230)]=function(){const _0x2d843c=_0x19a075;VisuMZ[_0x2d843c(0x73b)][_0x2d843c(0x6ce)][_0x2d843c(0x2c6)](this),this[_0x2d843c(0x522)]();},Sprite_Actor[_0x19a075(0x475)][_0x19a075(0x522)]=function(){const _0x2eb5df=_0x19a075;if(!this[_0x2eb5df(0x670)])return;if(!this[_0x2eb5df(0x3ec)])return;this['updateShadowVisibility'](),this['updateShadowPosition']();},Sprite_Actor[_0x19a075(0x475)][_0x19a075(0x1c3)]=function(){const _0x64323b=_0x19a075;this[_0x64323b(0x5e8)][_0x64323b(0x70f)]['x']=0x1/(this[_0x64323b(0x70f)]['x']||0.001),this[_0x64323b(0x5e8)][_0x64323b(0x70f)]['y']=0x1/(this[_0x64323b(0x70f)]['y']||0.001);},Sprite_Actor[_0x19a075(0x475)][_0x19a075(0x30f)]=function(){const _0x450fc0=_0x19a075;if(!$gameSystem['isSideView']()&&this['constructor']===Sprite_Actor){const _0x17c529=Scene_Battle[_0x450fc0(0x475)][_0x450fc0(0x4db)]();[_0x450fc0(0x235),'list',_0x450fc0(0x53b),'border'][_0x450fc0(0x5d5)](_0x17c529)&&(this[_0x450fc0(0x50f)]=0x0);}},Sprite_Actor['prototype'][_0x19a075(0x6a0)]=function(){const _0xeadd24=_0x19a075,_0xa91b76=this[_0xeadd24(0x23a)];if(_0xa91b76){const _0x2de460=_0xa91b76[_0xeadd24(0x651)]();if(_0xa91b76[_0xeadd24(0x405)]()||_0xa91b76[_0xeadd24(0x31c)]())this['startMotion'](_0xeadd24(0x24b));else{if(_0x2de460===0x3)this['startMotion'](_0xeadd24(0x430));else{if(_0x2de460===0x2)this[_0xeadd24(0x4d6)]('sleep');else{if(this[_0xeadd24(0x58d)])this['startMotion']('escape');else{if(_0xa91b76[_0xeadd24(0x5fa)]())this[_0xeadd24(0x4d6)](_0xeadd24(0x6a7));else{if(_0xa91b76[_0xeadd24(0x583)]())this[_0xeadd24(0x4d6)](_0xeadd24(0x27f));else{if(_0xa91b76[_0xeadd24(0x28c)]()||_0xa91b76['isGuardWaiting']())this['startMotion'](_0xeadd24(0x808));else{if(_0x2de460===0x1)this[_0xeadd24(0x4d6)](_0xeadd24(0x568));else{if(_0xa91b76[_0xeadd24(0x875)]())this[_0xeadd24(0x4d6)](_0xeadd24(0x656));else{if(_0xa91b76[_0xeadd24(0x16b)]())this[_0xeadd24(0x4d6)](_0xeadd24(0x24b));else _0xa91b76[_0xeadd24(0x879)]()?this[_0xeadd24(0x4d6)](_0xeadd24(0x6a7)):this['startMotion'](_0xeadd24(0x24b));}}}}}}}}}}},Sprite_Actor['prototype'][_0x19a075(0x726)]=function(){const _0x3966e1=_0x19a075,_0x3f1d3c=0xa,_0x283c65=0x12c*_0x3f1d3c,_0x4c7619=0x1e*_0x3f1d3c;this[_0x3966e1(0x478)](_0x283c65,0x0,_0x4c7619);},Sprite_Actor[_0x19a075(0x475)][_0x19a075(0x446)]=function(){const _0x34066a=_0x19a075;Sprite_Battler['prototype'][_0x34066a(0x446)][_0x34066a(0x2c6)](this);},Sprite_Actor[_0x19a075(0x475)][_0x19a075(0x435)]=function(){return Sprite_Battler['_motionSpeed'];},Sprite_Weapon['prototype'][_0x19a075(0x503)]=function(){const _0x4ee4c6=_0x19a075;return Sprite_Battler[_0x4ee4c6(0x7f7)];},Sprite_Actor[_0x19a075(0x475)]['setupMotion']=function(){},Sprite_Actor[_0x19a075(0x475)][_0x19a075(0x803)]=function(){},Sprite_Actor[_0x19a075(0x475)][_0x19a075(0x2b9)]=function(){const _0x4b945a=_0x19a075;if(this['_motion']&&++this[_0x4b945a(0x41f)]>=this[_0x4b945a(0x435)]()){if(this[_0x4b945a(0x4a7)]['loop'])this['_pattern']=(this[_0x4b945a(0x19d)]+0x1)%0x4;else this[_0x4b945a(0x19d)]<0x2?this[_0x4b945a(0x19d)]++:this[_0x4b945a(0x6a0)]();this[_0x4b945a(0x41f)]=0x0;}},Sprite_Actor[_0x19a075(0x475)][_0x19a075(0x6da)]=function(_0xa5681e){const _0x4de78e=_0x19a075;if(_0xa5681e===_0x4de78e(0x543))this[_0x4de78e(0x56f)]=!![];if(this['_battler']&&this[_0x4de78e(0x8b3)][_0x4de78e(0x64f)]()){this['_motion']=Sprite_Actor[_0x4de78e(0x856)]['dead'];return;}const _0x1ff151=Sprite_Actor['MOTIONS'][_0xa5681e];this[_0x4de78e(0x4a7)]=_0x1ff151,this[_0x4de78e(0x41f)]=0x0,this[_0x4de78e(0x19d)]=0x0;},Sprite_Actor[_0x19a075(0x475)]['forceWeaponAnimation']=function(_0x30e089){const _0x5809b=_0x19a075;this['adjustWeaponSpriteOffset'](),this['_weaponSprite']['setup'](_0x30e089),this[_0x5809b(0x23a)][_0x5809b(0x7f1)]();},Sprite_Actor[_0x19a075(0x475)][_0x19a075(0x1d8)]=function(){const _0xee4515=_0x19a075;let _0x1d80e8=-0x10,_0x4f7472=this[_0xee4515(0x87b)]*0.5;const _0x4d06d1=/<SIDEVIEW WEAPON OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i,_0x2c6be4=this['_battler'][_0xee4515(0x20f)]()[_0xee4515(0x4be)](_0x495466=>_0x495466&&_0x495466[_0xee4515(0x185)]['match'](_0x4d06d1)?Number(RegExp['$1']):0x0),_0x5afebd=this[_0xee4515(0x8b3)][_0xee4515(0x20f)]()[_0xee4515(0x4be)](_0x261363=>_0x261363&&_0x261363['note'][_0xee4515(0x6c8)](_0x4d06d1)?Number(RegExp['$2']):0x0);_0x1d80e8=_0x2c6be4[_0xee4515(0x8b0)]((_0x45722e,_0x5ddae3)=>_0x45722e+_0x5ddae3,_0x1d80e8),_0x4f7472=_0x5afebd[_0xee4515(0x8b0)]((_0x42e65e,_0x54a92a)=>_0x42e65e+_0x54a92a,_0x4f7472),this[_0xee4515(0x4c8)]['x']=_0x1d80e8,this[_0xee4515(0x4c8)]['y']=_0x4f7472,this['_weaponSprite'][_0xee4515(0x8cf)]();},Sprite_Weapon['prototype']['setup']=function(_0xfce00b){const _0x3b3d8f=_0x19a075;this[_0x3b3d8f(0x8f7)]=_0xfce00b,this['_animationCount']=-0x1,this['_pattern']=0x0,this[_0x3b3d8f(0x357)](),this[_0x3b3d8f(0x6d6)]();},Sprite_Actor[_0x19a075(0x475)][_0x19a075(0x43a)]=function(){},Sprite_Actor[_0x19a075(0x475)][_0x19a075(0x508)]=function(){const _0x303143=_0x19a075,_0x2bfd2c=VisuMZ['BattleCore'][_0x303143(0x7e0)]['ActionSequence'],_0x4dfe66=_0x2bfd2c['StepDistanceX'],_0x55c214=_0x2bfd2c[_0x303143(0x3bc)],_0x35fa55=_0x2bfd2c[_0x303143(0x3a1)];this[_0x303143(0x478)](-_0x4dfe66,-_0x55c214,_0x35fa55);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x347)]=Sprite_Actor[_0x19a075(0x475)][_0x19a075(0x6d6)],Sprite_Actor['prototype'][_0x19a075(0x6d6)]=function(){const _0x5770d4=_0x19a075;this[_0x5770d4(0x19a)](),VisuMZ['BattleCore'][_0x5770d4(0x347)][_0x5770d4(0x2c6)](this);},Sprite_Actor['prototype']['applyFreezeMotionFrames']=function(){const _0x38f330=_0x19a075;if(this[_0x38f330(0x8b3)]&&this[_0x38f330(0x8b3)][_0x38f330(0x2f4)]){const _0x1b0ed3=this[_0x38f330(0x8b3)][_0x38f330(0x2f4)];this[_0x38f330(0x4a7)]=Sprite_Actor[_0x38f330(0x856)][_0x1b0ed3[_0x38f330(0x67d)]],this['_pattern']=_0x1b0ed3[_0x38f330(0x3f3)];const _0x4d6b91=this[_0x38f330(0x4c8)];_0x4d6b91[_0x38f330(0x75e)](_0x1b0ed3[_0x38f330(0x797)],_0x1b0ed3[_0x38f330(0x3f3)]),this[_0x38f330(0x1d8)]();}},Sprite_Weapon['prototype']['freezeFrame']=function(_0x358205,_0x272ab1){const _0x59c324=_0x19a075;this[_0x59c324(0x8f7)]=_0x358205,this[_0x59c324(0x634)]=-Infinity,this[_0x59c324(0x19d)]=_0x272ab1,this[_0x59c324(0x357)](),this[_0x59c324(0x6d6)]();},Sprite_Enemy[_0x19a075(0x475)][_0x19a075(0x200)]=function(){const _0x4adc76=_0x19a075;Sprite_Battler[_0x4adc76(0x475)]['initMembers']['call'](this),this[_0x4adc76(0x70d)]=null,this[_0x4adc76(0x160)]=![],this[_0x4adc76(0x801)]='',this[_0x4adc76(0x911)]=0x0,this[_0x4adc76(0x6c3)]=null,this[_0x4adc76(0x4ba)]=0x0,this[_0x4adc76(0x326)]=0x0,this[_0x4adc76(0x66c)](),this[_0x4adc76(0x92b)]();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x91f)]=Sprite_Enemy[_0x19a075(0x475)][_0x19a075(0x8cf)],Sprite_Enemy['prototype'][_0x19a075(0x8cf)]=function(){const _0x57fc3e=_0x19a075;VisuMZ['BattleCore'][_0x57fc3e(0x91f)]['call'](this),this[_0x57fc3e(0x404)]();},Sprite_Enemy[_0x19a075(0x475)][_0x19a075(0x66c)]=function(){const _0x4bfe11=_0x19a075;this[_0x4bfe11(0x670)]=new Sprite(),this[_0x4bfe11(0x670)][_0x4bfe11(0x49e)]['x']=0.5,this[_0x4bfe11(0x670)][_0x4bfe11(0x49e)]['y']=0x1,this['addChild'](this[_0x4bfe11(0x670)]),this[_0x4bfe11(0x59f)]();},Sprite_Enemy[_0x19a075(0x475)][_0x19a075(0x6f1)]=function(){const _0x23647b=_0x19a075;return this[_0x23647b(0x8ab)]||this[_0x23647b(0x670)]||this;},Sprite_Enemy[_0x19a075(0x475)][_0x19a075(0x357)]=function(_0x211eae){const _0x2f239e=_0x19a075;this[_0x2f239e(0x3ff)]=new Bitmap(0x1,0x1),$gameSystem[_0x2f239e(0x50c)]()?this['_mainSprite'][_0x2f239e(0x3ff)]=ImageManager['loadSvEnemy'](_0x211eae):this['_mainSprite'][_0x2f239e(0x3ff)]=ImageManager['loadEnemy'](_0x211eae),this[_0x2f239e(0x670)][_0x2f239e(0x3ff)][_0x2f239e(0x57c)](this[_0x2f239e(0x1cd)][_0x2f239e(0x3fd)](this));},Sprite_Enemy[_0x19a075(0x475)][_0x19a075(0x1cd)]=function(){const _0x113027=_0x19a075,_0x4780cf=this[_0x113027(0x670)][_0x113027(0x3ff)];_0x4780cf&&(this[_0x113027(0x3ff)]=new Bitmap(_0x4780cf[_0x113027(0x594)],_0x4780cf[_0x113027(0x87b)]));},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x7cd)]=Sprite_Enemy[_0x19a075(0x475)][_0x19a075(0x8f2)],Sprite_Enemy[_0x19a075(0x475)][_0x19a075(0x8f2)]=function(_0x2c952c){const _0x595793=_0x19a075;this[_0x595793(0x670)]&&this['_mainSprite']['setHue'](_0x2c952c);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x6d0)]=Sprite_Enemy['prototype']['initVisibility'],Sprite_Enemy[_0x19a075(0x475)][_0x19a075(0x215)]=function(){const _0x5d8f5a=_0x19a075;this[_0x5d8f5a(0x5aa)]()?VisuMZ[_0x5d8f5a(0x73b)][_0x5d8f5a(0x6d0)]['call'](this):(this[_0x5d8f5a(0x160)]=!this[_0x5d8f5a(0x70d)][_0x5d8f5a(0x55b)](),!this[_0x5d8f5a(0x160)]&&(this[_0x5d8f5a(0x50f)]=0x0));},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x4f6)]=Sprite_Enemy['prototype'][_0x19a075(0x622)],Sprite_Enemy[_0x19a075(0x475)][_0x19a075(0x622)]=function(){const _0x3d316f=_0x19a075;if(this[_0x3d316f(0x5aa)]())VisuMZ[_0x3d316f(0x73b)]['Sprite_Enemy_updateCollapse'][_0x3d316f(0x2c6)](this);},Sprite_Enemy[_0x19a075(0x475)][_0x19a075(0x6d6)]=function(){const _0x4d3884=_0x19a075;Sprite_Battler[_0x4d3884(0x475)][_0x4d3884(0x6d6)][_0x4d3884(0x2c6)](this);const _0x14ea29=this['mainSprite']()||this;if(!_0x14ea29)return;!_0x14ea29[_0x4d3884(0x3ff)]&&(_0x14ea29['bitmap']=new Bitmap(this[_0x4d3884(0x594)],this[_0x4d3884(0x87b)])),this[_0x4d3884(0x6c3)]===_0x4d3884(0x920)?this[_0x4d3884(0x670)][_0x4d3884(0x82c)](0x0,0x0,this[_0x4d3884(0x670)][_0x4d3884(0x594)],this[_0x4d3884(0x4ba)]):_0x14ea29[_0x4d3884(0x82c)](0x0,0x0,_0x14ea29['bitmap'][_0x4d3884(0x594)],this[_0x4d3884(0x3ff)][_0x4d3884(0x87b)]);},VisuMZ['BattleCore']['Sprite_Enemy_updateBossCollapse']=Sprite_Enemy[_0x19a075(0x475)]['updateBossCollapse'],Sprite_Enemy[_0x19a075(0x475)][_0x19a075(0x5a8)]=function(){const _0x130a35=_0x19a075;if(this[_0x130a35(0x5aa)]())VisuMZ['BattleCore'][_0x130a35(0x558)][_0x130a35(0x2c6)](this);},Sprite_Enemy[_0x19a075(0x475)][_0x19a075(0x505)]=function(){const _0x4f8118=_0x19a075;return Sprite_Battler[_0x4f8118(0x475)][_0x4f8118(0x505)][_0x4f8118(0x2c6)](this);},VisuMZ['BattleCore'][_0x19a075(0x273)]=Sprite_Enemy[_0x19a075(0x475)][_0x19a075(0x1c3)],Sprite_Enemy['prototype'][_0x19a075(0x1c3)]=function(){const _0x13dc8e=_0x19a075;VisuMZ[_0x13dc8e(0x73b)]['Sprite_Enemy_updateStateSprite'][_0x13dc8e(0x2c6)](this),this[_0x13dc8e(0x683)]();},Sprite_Enemy['prototype']['updateStateSpriteBattleCore']=function(){const _0x32381f=_0x19a075,_0x41aff2=VisuMZ[_0x32381f(0x73b)][_0x32381f(0x7e0)][_0x32381f(0x343)];if(_0x41aff2[_0x32381f(0x55f)]&&!_0x41aff2['NameLegacy']){this[_0x32381f(0x7fd)][_0x32381f(0x50f)]=0x0;return;}this['_stateIconSprite']['x']=0x0,this['_stateIconSprite']['x']+=this[_0x32381f(0x8b3)]['battleUIOffsetX'](),this[_0x32381f(0x7fd)]['y']=-this[_0x32381f(0x3ff)][_0x32381f(0x87b)]-this['_stateIconSprite'][_0x32381f(0x87b)],this[_0x32381f(0x7fd)]['y']+=this['_battler'][_0x32381f(0x3b7)](),this['_stateIconSprite'][_0x32381f(0x70f)]['x']=0x1/(this[_0x32381f(0x70f)]['x']||0.001),this['_stateIconSprite'][_0x32381f(0x70f)]['y']=0x1/(this[_0x32381f(0x70f)]['y']||0.001),this['hasSvBattler']()&&(this['_svBattlerSprite']['_stateSprite']['scale']['x']=-0x1/(this['scale']['x']||0.001),this[_0x32381f(0x4a0)][_0x32381f(0x5e8)]['scale']['y']=0x1/(this[_0x32381f(0x70f)]['y']||0.001));},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x91e)]=Sprite_Enemy['prototype']['setBattler'],Sprite_Enemy[_0x19a075(0x475)][_0x19a075(0x6f6)]=function(_0x162549){const _0x3570fb=_0x19a075;VisuMZ[_0x3570fb(0x73b)][_0x3570fb(0x91e)]['call'](this,_0x162549),this['setSvBattlerSprite'](_0x162549);},Sprite_Enemy['prototype'][_0x19a075(0x1b6)]=function(_0x550a86){const _0x539bd5=_0x19a075;!this[_0x539bd5(0x4a0)]&&(this[_0x539bd5(0x4a0)]=new Sprite_SvEnemy(_0x550a86),this[_0x539bd5(0x59f)]()),this[_0x539bd5(0x4a0)][_0x539bd5(0x6f6)](_0x550a86);},Sprite_Enemy[_0x19a075(0x475)]['hasSvBattler']=function(){const _0x4dff0f=_0x19a075;return this['_enemy']&&this['_enemy'][_0x4dff0f(0x7ed)]();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x3f0)]=Sprite_Enemy[_0x19a075(0x475)]['loadBitmap'],Sprite_Enemy['prototype'][_0x19a075(0x357)]=function(_0x35b0da){const _0x30853b=_0x19a075;if(this[_0x30853b(0x7ed)]()){const _0x4c09fe=this[_0x30853b(0x70d)][_0x30853b(0x368)]();this['bitmap']=new Bitmap(_0x4c09fe[_0x30853b(0x594)],_0x4c09fe[_0x30853b(0x87b)]);}else VisuMZ[_0x30853b(0x73b)][_0x30853b(0x3f0)]['call'](this,_0x35b0da);},Sprite_Enemy[_0x19a075(0x475)]['allowCollapse']=function(){const _0x4f3e8c=_0x19a075;return this[_0x4f3e8c(0x7ed)]()?this[_0x4f3e8c(0x70d)][_0x4f3e8c(0x5aa)]():!![];},Sprite_Enemy[_0x19a075(0x475)][_0x19a075(0x6a0)]=function(){const _0xae48d9=_0x19a075;this[_0xae48d9(0x7ed)]()&&this['_svBattlerSprite'][_0xae48d9(0x6a0)]();},Sprite_Enemy[_0x19a075(0x475)][_0x19a075(0x6da)]=function(_0xe5267){const _0x46f13d=_0x19a075;if(this[_0x46f13d(0x7ed)]())this[_0x46f13d(0x4a0)][_0x46f13d(0x6da)](_0xe5267);},Sprite_Enemy[_0x19a075(0x475)][_0x19a075(0x89e)]=function(_0x380365){const _0x2fba6c=_0x19a075;if(this['hasSvBattler']())this[_0x2fba6c(0x4a0)][_0x2fba6c(0x89e)](_0x380365);},Sprite_Enemy[_0x19a075(0x475)][_0x19a075(0x508)]=function(){const _0x580943=_0x19a075,_0x4bfa28=VisuMZ[_0x580943(0x73b)][_0x580943(0x7e0)][_0x580943(0x41b)],_0x33bdd6=_0x4bfa28['StepDistanceX'],_0x53a040=_0x4bfa28[_0x580943(0x3bc)],_0x482561=_0x4bfa28[_0x580943(0x3a1)];this[_0x580943(0x478)](_0x33bdd6,_0x53a040,_0x482561);};function Sprite_SvEnemy(){const _0x281235=_0x19a075;this[_0x281235(0x2a0)](...arguments);}Sprite_SvEnemy[_0x19a075(0x475)]=Object['create'](Sprite_Actor[_0x19a075(0x475)]),Sprite_SvEnemy[_0x19a075(0x475)]['constructor']=Sprite_SvEnemy,Sprite_SvEnemy[_0x19a075(0x475)][_0x19a075(0x2a0)]=function(_0x5e5499){const _0x57bf9b=_0x19a075;Sprite_Actor[_0x57bf9b(0x475)][_0x57bf9b(0x2a0)][_0x57bf9b(0x2c6)](this,_0x5e5499),this[_0x57bf9b(0x70f)]['x']=-0x1,this[_0x57bf9b(0x5e8)][_0x57bf9b(0x70f)]['x']=-0x1;},Sprite_SvEnemy['prototype']['createShadowSprite']=function(){},Sprite_SvEnemy[_0x19a075(0x475)][_0x19a075(0x6f2)]=function(){},Sprite_SvEnemy[_0x19a075(0x475)][_0x19a075(0x45f)]=function(_0x1bf050){},Sprite_SvEnemy[_0x19a075(0x475)][_0x19a075(0x230)]=function(){},Sprite_SvEnemy[_0x19a075(0x475)][_0x19a075(0x449)]=function(){},Sprite_SvEnemy[_0x19a075(0x475)]['updateStateSprite']=function(){const _0x3e6b68=_0x19a075;this[_0x3e6b68(0x5e8)][_0x3e6b68(0x3cc)]=![];},Sprite_SvEnemy['prototype'][_0x19a075(0x4ac)]=function(){const _0x340f40=_0x19a075;Sprite_Battler[_0x340f40(0x475)][_0x340f40(0x4ac)][_0x340f40(0x2c6)](this);const _0x5b6a5a=this[_0x340f40(0x23a)][_0x340f40(0x4c1)]();this[_0x340f40(0x801)]!==_0x5b6a5a&&(this[_0x340f40(0x801)]=_0x5b6a5a,this[_0x340f40(0x670)][_0x340f40(0x3ff)]=ImageManager[_0x340f40(0x83f)](_0x5b6a5a)),this[_0x340f40(0x670)]&&this[_0x340f40(0x670)][_0x340f40(0x3ff)]&&this['_battler']&&(this[_0x340f40(0x670)][_0x340f40(0x3ff)][_0x340f40(0x91a)]!==this[_0x340f40(0x8b3)][_0x340f40(0x1ce)]()&&(this['_mainSprite'][_0x340f40(0x3ff)][_0x340f40(0x91a)]=this['_battler'][_0x340f40(0x1ce)]()));},Sprite_SvEnemy[_0x19a075(0x475)][_0x19a075(0x726)]=function(){},Sprite_SvEnemy['prototype'][_0x19a075(0x478)]=function(_0x48e211,_0x2810a0,_0x49a9ee){const _0x290ca4=_0x19a075;if(this[_0x290ca4(0x8c7)])this[_0x290ca4(0x8c7)][_0x290ca4(0x478)](_0x48e211,_0x2810a0,_0x49a9ee);},Sprite_SvEnemy[_0x19a075(0x475)][_0x19a075(0x6a0)]=function(){const _0x22d4d8=_0x19a075,_0x85bbe9=this[_0x22d4d8(0x23a)];if(_0x85bbe9){const _0x359571=_0x85bbe9[_0x22d4d8(0x651)]();if(_0x85bbe9['isInputting']()||_0x85bbe9[_0x22d4d8(0x31c)]())this['startMotion'](_0x22d4d8(0x24b));else{if(_0x359571===0x3)this[_0x22d4d8(0x4d6)]('dead');else{if(_0x359571===0x2)this[_0x22d4d8(0x4d6)](_0x22d4d8(0x16c));else{if(_0x85bbe9[_0x22d4d8(0x583)]())this[_0x22d4d8(0x4d6)](_0x22d4d8(0x27f));else{if(_0x85bbe9[_0x22d4d8(0x28c)]()||_0x85bbe9[_0x22d4d8(0x31f)]())this[_0x22d4d8(0x4d6)]('guard');else{if(_0x359571===0x1)this['startMotion'](_0x22d4d8(0x568));else{if(_0x85bbe9[_0x22d4d8(0x875)]())this[_0x22d4d8(0x4d6)](_0x22d4d8(0x656));else _0x85bbe9[_0x22d4d8(0x16b)]()?this[_0x22d4d8(0x4d6)](_0x22d4d8(0x24b)):this[_0x22d4d8(0x4d6)](_0x85bbe9[_0x22d4d8(0x368)]()['motionIdle']||_0x22d4d8(0x24b));}}}}}}}},Sprite_SvEnemy[_0x19a075(0x475)][_0x19a075(0x3e9)]=function(){const _0xefcfc0=_0x19a075;return this[_0xefcfc0(0x8c7)]?this[_0xefcfc0(0x8c7)][_0xefcfc0(0x795)]===0x0&&this['parent']['_offsetY']===0x0:!![];},Sprite_SvEnemy[_0x19a075(0x475)][_0x19a075(0x8a2)]=function(){},Sprite_Damage[_0x19a075(0x475)]['setupBattleCore']=function(_0x17fac1){const _0x1c0b50=_0x19a075,_0x3047b2=_0x17fac1[_0x1c0b50(0x363)]()||_0x17fac1[_0x1c0b50(0x8ba)]();if(_0x3047b2[_0x1c0b50(0x1c6)]||_0x3047b2[_0x1c0b50(0x46a)])this[_0x1c0b50(0x4ca)]=0x0,this['createMiss']();else{if(_0x3047b2[_0x1c0b50(0x8e2)])this[_0x1c0b50(0x4ca)]=_0x3047b2[_0x1c0b50(0x48c)]>=0x0?0x0:0x1,this[_0x1c0b50(0x22f)](_0x3047b2[_0x1c0b50(0x48c)]);else _0x17fac1['isAlive']()&&_0x3047b2[_0x1c0b50(0x5e1)]!==0x0&&(this['_colorType']=_0x3047b2['mpDamage']>=0x0?0x2:0x3,this['createDigits'](_0x3047b2['mpDamage']));}_0x3047b2[_0x1c0b50(0x36c)]&&this['setupCriticalEffect']();},Sprite_Damage['prototype'][_0x19a075(0x8c0)]=function(_0x28f96f){},Sprite_Damage[_0x19a075(0x475)][_0x19a075(0x22f)]=function(_0x26d245){const _0x3e7fc8=_0x19a075;let _0x968667=this[_0x3e7fc8(0x76d)](_0x26d245);const _0x2ff0f9=this[_0x3e7fc8(0x7d2)](),_0xf7d25e=Math[_0x3e7fc8(0x1ec)](_0x2ff0f9*0.75);for(let _0x35f328=0x0;_0x35f328<_0x968667[_0x3e7fc8(0x644)];_0x35f328++){const _0x5cfe28=this[_0x3e7fc8(0x7fa)](_0xf7d25e,_0x2ff0f9);_0x5cfe28[_0x3e7fc8(0x3ff)][_0x3e7fc8(0x833)](_0x968667[_0x35f328],0x0,0x0,_0xf7d25e,_0x2ff0f9,_0x3e7fc8(0x268)),_0x5cfe28['x']=(_0x35f328-(_0x968667[_0x3e7fc8(0x644)]-0x1)/0x2)*_0xf7d25e,_0x5cfe28['dy']=-_0x35f328;}},Sprite_Damage[_0x19a075(0x475)][_0x19a075(0x76d)]=function(_0x2e499f){const _0xf7718d=_0x19a075;let _0x4764ea=Math['abs'](_0x2e499f)[_0xf7718d(0x31b)]();this[_0xf7718d(0x38b)]()&&(_0x4764ea=VisuMZ['GroupDigits'](_0x4764ea));const _0x1a9b43=VisuMZ[_0xf7718d(0x73b)][_0xf7718d(0x7e0)][_0xf7718d(0x4d3)];let _0x559e39='',_0x23dcef='';switch(this[_0xf7718d(0x4ca)]){case 0x0:_0x559e39=_0x1a9b43[_0xf7718d(0x64c)]||'-%1',_0x23dcef=TextManager['hp'];if(_0x2e499f===0x0)_0x559e39='%1';break;case 0x1:_0x559e39=_0x1a9b43['hpHealingFmt']||_0xf7718d(0x162),_0x23dcef=TextManager['hp'];break;case 0x2:_0x559e39=_0x1a9b43[_0xf7718d(0x4b6)]||_0xf7718d(0x418),_0x23dcef=TextManager['mp'];break;case 0x3:_0x559e39=_0x1a9b43[_0xf7718d(0x1de)]||_0xf7718d(0x166),_0x23dcef=TextManager['mp'];break;}return _0x559e39['format'](_0x4764ea,_0x23dcef)['trim']();},Sprite_Damage[_0x19a075(0x475)][_0x19a075(0x38b)]=function(){const _0x57d7af=_0x19a075;return Imported[_0x57d7af(0x7b7)]?VisuMZ['CoreEngine'][_0x57d7af(0x7e0)][_0x57d7af(0x5bd)]['DigitGroupingDamageSprites']:![];},Sprite_Damage[_0x19a075(0x475)][_0x19a075(0x8ed)]=function(){const _0x391493=_0x19a075,_0x516f67=VisuMZ[_0x391493(0x73b)][_0x391493(0x7e0)][_0x391493(0x4d3)];this[_0x391493(0x469)]=_0x516f67[_0x391493(0x345)]['slice'](0x0),this['_flashDuration']=_0x516f67['CriticalDuration'];},Sprite_Damage[_0x19a075(0x475)][_0x19a075(0x867)]=function(_0x189891,_0x209984){const _0x4f045d=_0x19a075;this[_0x4f045d(0x469)]=_0x209984['flashColor']||[0x0,0x0,0x0,0x0],this[_0x4f045d(0x469)]=JsonEx[_0x4f045d(0x538)](this[_0x4f045d(0x469)]),this[_0x4f045d(0x820)]=_0x209984['flashDuration']||0x0;const _0x3ca340=this[_0x4f045d(0x7d2)](),_0x10320e=Math[_0x4f045d(0x1ec)](_0x3ca340*0x1e),_0x33d5b2=this['createChildSprite'](_0x10320e,_0x3ca340);_0x33d5b2[_0x4f045d(0x3ff)][_0x4f045d(0x1ad)]=ColorManager[_0x4f045d(0x642)](_0x209984[_0x4f045d(0x1ad)]),_0x33d5b2[_0x4f045d(0x3ff)]['drawText'](_0x189891,0x0,0x0,_0x10320e,_0x3ca340,'center'),_0x33d5b2['dy']=0x0;},Sprite_Damage['prototype'][_0x19a075(0x278)]=function(_0x3a4498,_0x5f1228,_0x673eb9){const _0x530f9a=_0x19a075,_0x176364=Math[_0x530f9a(0x6aa)](this[_0x530f9a(0x7d2)](),ImageManager['iconHeight']),_0x2d5e64=Math[_0x530f9a(0x1ec)](_0x176364*0x1e),_0x44478e=this['createChildSprite'](_0x2d5e64,_0x176364),_0x2478c2=ImageManager[_0x530f9a(0x75b)]/0x2,_0x54a6c5=_0x44478e[_0x530f9a(0x3ff)][_0x530f9a(0x353)](_0x5f1228+'\x20');_0x44478e[_0x530f9a(0x3ff)][_0x530f9a(0x1ad)]=ColorManager[_0x530f9a(0x642)](_0x673eb9[_0x530f9a(0x1ad)]),_0x44478e[_0x530f9a(0x3ff)]['drawText'](_0x5f1228,_0x2478c2,0x0,_0x2d5e64-_0x2478c2,_0x176364,_0x530f9a(0x268));const _0x21f6d3=Math[_0x530f9a(0x48a)]((_0x176364-ImageManager[_0x530f9a(0x71d)])/0x2),_0x30aa9e=_0x2d5e64/0x2-ImageManager[_0x530f9a(0x75b)]-_0x54a6c5/0x2+_0x2478c2/0x2,_0x444054=ImageManager[_0x530f9a(0x54a)]('IconSet'),_0x51a390=ImageManager[_0x530f9a(0x75b)],_0x10d07f=ImageManager[_0x530f9a(0x71d)],_0x2b0aae=_0x3a4498%0x10*_0x51a390,_0xfbd6e5=Math[_0x530f9a(0x1ec)](_0x3a4498/0x10)*_0x10d07f;_0x44478e[_0x530f9a(0x3ff)][_0x530f9a(0x554)](_0x444054,_0x2b0aae,_0xfbd6e5,_0x51a390,_0x10d07f,_0x30aa9e,_0x21f6d3),this['_flashColor']=_0x673eb9[_0x530f9a(0x8fa)]||[0x0,0x0,0x0,0x0],this[_0x530f9a(0x469)]=JsonEx[_0x530f9a(0x538)](this['_flashColor']),this[_0x530f9a(0x820)]=_0x673eb9['flashDuration']||0x0,_0x44478e['dy']=0x0;},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x831)]=Sprite_StateIcon[_0x19a075(0x475)][_0x19a075(0x6d6)],Sprite_StateIcon[_0x19a075(0x475)][_0x19a075(0x6d6)]=function(){const _0x5cbc5a=_0x19a075;VisuMZ[_0x5cbc5a(0x73b)][_0x5cbc5a(0x831)][_0x5cbc5a(0x2c6)](this),this[_0x5cbc5a(0x3cc)]=this['_iconIndex']>0x0?!![]:![];},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x20b)]=Sprite_Weapon['prototype'][_0x19a075(0x357)],Sprite_Weapon['prototype'][_0x19a075(0x357)]=function(){const _0x24eea5=_0x19a075;VisuMZ[_0x24eea5(0x73b)]['Sprite_Weapon_loadBitmap']['call'](this),this[_0x24eea5(0x3ff)]&&(this['bitmap']['smooth']=VisuMZ[_0x24eea5(0x73b)][_0x24eea5(0x7e0)][_0x24eea5(0x72c)][_0x24eea5(0x32b)]);};function Sprite_HpGauge(){this['initialize'](...arguments);}Sprite_HpGauge[_0x19a075(0x475)]=Object[_0x19a075(0x6d2)](Sprite_Gauge['prototype']),Sprite_HpGauge['prototype'][_0x19a075(0x3d5)]=Sprite_HpGauge,Sprite_HpGauge[_0x19a075(0x475)][_0x19a075(0x2a0)]=function(){const _0xaf02c5=_0x19a075;Sprite_Gauge['prototype'][_0xaf02c5(0x2a0)][_0xaf02c5(0x2c6)](this);},Sprite_HpGauge[_0x19a075(0x475)]['gaugeX']=function(){return 0x0;},Sprite_HpGauge[_0x19a075(0x475)]['redraw']=function(){const _0x5c6410=_0x19a075;this[_0x5c6410(0x3ff)]['clear']();const _0x469017=this['currentValue']();!isNaN(_0x469017)&&this['drawGauge']();};function Sprite_EnemyName(){const _0x596d8b=_0x19a075;this[_0x596d8b(0x2a0)](...arguments);}Sprite_EnemyName[_0x19a075(0x475)]=Object[_0x19a075(0x6d2)](Sprite_Name['prototype']),Sprite_EnemyName['prototype'][_0x19a075(0x3d5)]=Sprite_EnemyName,Sprite_EnemyName[_0x19a075(0x475)][_0x19a075(0x2a0)]=function(){const _0x45cbfa=_0x19a075;Sprite_Name[_0x45cbfa(0x475)][_0x45cbfa(0x2a0)][_0x45cbfa(0x2c6)](this),this[_0x45cbfa(0x830)]();},Sprite_EnemyName[_0x19a075(0x475)][_0x19a075(0x200)]=function(){const _0xabff00=_0x19a075;Sprite_Name['prototype']['initMembers'][_0xabff00(0x2c6)](this),this[_0xabff00(0x50f)]=0x0,this[_0xabff00(0x348)]=null,this[_0xabff00(0x49e)]['x']=0.5,this[_0xabff00(0x49e)]['y']=0x0;},Sprite_EnemyName[_0x19a075(0x475)][_0x19a075(0x830)]=function(){const _0x4e4ce9=_0x19a075;VisuMZ['BattleCore'][_0x4e4ce9(0x7e0)]['Enemy'][_0x4e4ce9(0x55f)]&&(this[_0x4e4ce9(0x7fd)]=new Sprite_StateIcon(),this['addChild'](this[_0x4e4ce9(0x7fd)]));},Sprite_EnemyName['prototype'][_0x19a075(0x49c)]=function(){const _0x54feab=_0x19a075;return Graphics[_0x54feab(0x256)];},Sprite_EnemyName[_0x19a075(0x475)][_0x19a075(0x832)]=function(){const _0x193a1f=_0x19a075;return this[_0x193a1f(0x706)]=this[_0x193a1f(0x706)]||Window_Base[_0x193a1f(0x475)][_0x193a1f(0x1f3)]()||0x24,this[_0x193a1f(0x706)]*0x4;},Sprite_EnemyName[_0x19a075(0x475)]['fontSize']=function(){const _0x43f3ab=_0x19a075;return VisuMZ[_0x43f3ab(0x73b)][_0x43f3ab(0x7e0)][_0x43f3ab(0x343)][_0x43f3ab(0x755)]||$gameSystem[_0x43f3ab(0x34b)]();},Sprite_EnemyName['prototype'][_0x19a075(0x943)]=function(_0x252d33){this['_linkedSprite']=_0x252d33;},Sprite_EnemyName['prototype'][_0x19a075(0x8cf)]=function(){const _0x58c230=_0x19a075;Sprite_Name[_0x58c230(0x475)]['update'][_0x58c230(0x2c6)](this),this[_0x58c230(0x717)](),this[_0x58c230(0x8ef)](),this[_0x58c230(0x6ac)](),this[_0x58c230(0x799)]();},Sprite_EnemyName[_0x19a075(0x475)][_0x19a075(0x18a)]=function(){const _0xbfd8d0=_0x19a075;this['_cacheTextWidth']=undefined;const _0x36befc=this['name'](),_0x558b94=this[_0xbfd8d0(0x49c)](),_0x57194a=Window_Base['prototype']['lineHeight']();this['setupFont'](),this[_0xbfd8d0(0x3ff)][_0xbfd8d0(0x2e7)](),this[_0xbfd8d0(0x3ff)][_0xbfd8d0(0x833)](_0x36befc,0x0,0x0,_0x558b94,_0x57194a,'center');},Sprite_EnemyName['prototype']['updateLink']=function(){const _0x3f43aa=_0x19a075;if(!this[_0x3f43aa(0x348)])return;this[_0x3f43aa(0x8b3)]!==this[_0x3f43aa(0x348)][_0x3f43aa(0x8b3)]&&this[_0x3f43aa(0x8c0)](this[_0x3f43aa(0x348)][_0x3f43aa(0x8b3)]);},Sprite_EnemyName['prototype']['updatePosition']=function(){const _0x1b9c5b=_0x19a075;if(!this['_linkedSprite'])return;this[_0x1b9c5b(0x706)]=this[_0x1b9c5b(0x706)]||Window_Base[_0x1b9c5b(0x475)][_0x1b9c5b(0x1f3)](),this['x']=this[_0x1b9c5b(0x348)]['_baseX'],this['y']=this[_0x1b9c5b(0x348)]['_baseY']-this[_0x1b9c5b(0x706)]*0.5;const _0x55992b=VisuMZ[_0x1b9c5b(0x73b)][_0x1b9c5b(0x7e0)][_0x1b9c5b(0x343)];this['x']+=_0x55992b['NameOffsetX']||0x0,this['y']+=_0x55992b['NameOffsetY']||0x0;},Sprite_EnemyName[_0x19a075(0x475)][_0x19a075(0x6ac)]=function(){const _0x5902fb=_0x19a075;this[_0x5902fb(0x3bb)]();},Sprite_EnemyName['prototype'][_0x19a075(0x3bb)]=function(){const _0x349e48=_0x19a075;if(!this['_stateIconSprite'])return;this[_0x349e48(0x8b3)]!==this['_stateIconSprite'][_0x349e48(0x8b3)]&&this[_0x349e48(0x7fd)][_0x349e48(0x8c0)](this[_0x349e48(0x8b3)]);const _0x2584a0=this[_0x349e48(0x7eb)]();this[_0x349e48(0x706)]=this[_0x349e48(0x706)]||Window_Base['prototype'][_0x349e48(0x1f3)](),this[_0x349e48(0x7fd)]['x']=Math['round']((_0x2584a0+ImageManager['iconWidth'])/0x2)+0x8,this['_stateIconSprite']['y']=this['_lineHeight']/0x2;const _0x533a91=VisuMZ['BattleCore']['Settings'][_0x349e48(0x343)];this[_0x349e48(0x7fd)]['x']+=_0x533a91[_0x349e48(0x396)]||0x0,this[_0x349e48(0x7fd)]['y']+=_0x533a91[_0x349e48(0x7c0)]||0x0;},Sprite_EnemyName[_0x19a075(0x475)][_0x19a075(0x799)]=function(){const _0x20416a=_0x19a075,_0xea737e=this[_0x20416a(0x8f6)]();if(_0xea737e&&this[_0x20416a(0x50f)]<0xff)this[_0x20416a(0x50f)]+=0x10;else!_0xea737e&&this[_0x20416a(0x50f)]>0x0&&(this[_0x20416a(0x50f)]-=0x10);},Sprite_EnemyName['prototype']['visibilityState']=function(){const _0x4dc18e=_0x19a075;if(!this[_0x4dc18e(0x8b3)])return![];else{if(this[_0x4dc18e(0x8b3)][_0x4dc18e(0x64f)]())return![];else{if(!this['_battler'][_0x4dc18e(0x387)]())return![];else{if(this[_0x4dc18e(0x1e4)]())return!![];else{if(SceneManager['_scene']['_enemyWindow']&&SceneManager['_scene'][_0x4dc18e(0x52c)]['active']&&SceneManager[_0x4dc18e(0x3a8)][_0x4dc18e(0x52c)][_0x4dc18e(0x8ce)][_0x4dc18e(0x5d5)](this['_battler']))return!![];else{if(this[_0x4dc18e(0x50f)]>0x0)return![];}}}}}},Sprite_EnemyName[_0x19a075(0x475)]['isAlwaysVisible']=function(){const _0x4e7dea=_0x19a075;return VisuMZ[_0x4e7dea(0x73b)][_0x4e7dea(0x7e0)][_0x4e7dea(0x343)][_0x4e7dea(0x841)];},Sprite_EnemyName[_0x19a075(0x475)][_0x19a075(0x7eb)]=function(){const _0x3b9f83=_0x19a075;if(!this[_0x3b9f83(0x8b3)])return 0x0;if(this['_cacheTextWidth'])return this[_0x3b9f83(0x29c)];const _0x3cd343=this[_0x3b9f83(0x880)]();return this[_0x3b9f83(0x383)](),this[_0x3b9f83(0x29c)]=this[_0x3b9f83(0x3ff)][_0x3b9f83(0x353)](_0x3cd343)||0x1,this[_0x3b9f83(0x29c)];},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x216)]=Sprite_Battleback[_0x19a075(0x475)][_0x19a075(0x5a5)],Sprite_Battleback[_0x19a075(0x475)][_0x19a075(0x5a5)]=function(){const _0x32f0e2=_0x19a075,_0x582153=VisuMZ[_0x32f0e2(0x73b)]['Settings']['Battleback'];if(!_0x582153)return VisuMZ[_0x32f0e2(0x73b)][_0x32f0e2(0x216)][_0x32f0e2(0x2c6)](this);const _0x3a28a5=String(_0x582153[_0x32f0e2(0x3e6)])||'MZ';switch(_0x3a28a5){case'MZ':VisuMZ['BattleCore'][_0x32f0e2(0x216)][_0x32f0e2(0x2c6)](this);break;case _0x32f0e2(0x56a):this[_0x32f0e2(0x869)]();break;case _0x32f0e2(0x62e):this[_0x32f0e2(0x38f)]();break;case _0x32f0e2(0x618):this[_0x32f0e2(0x77a)]();break;case _0x32f0e2(0x789):this['adjustPosition_ScaleUp']();break;}},Sprite_Battleback['prototype'][_0x19a075(0x869)]=function(){const _0x3cdac3=_0x19a075;this['width']=Graphics[_0x3cdac3(0x594)],this[_0x3cdac3(0x87b)]=Graphics[_0x3cdac3(0x87b)];const _0x1f9e67=0x1;this[_0x3cdac3(0x70f)]['x']=_0x1f9e67,this[_0x3cdac3(0x70f)]['y']=_0x1f9e67,this['x']=0x0,this['y']=0x0;},Sprite_Battleback[_0x19a075(0x475)]['adjustPosition_ScaleToFit']=function(){const _0x291405=_0x19a075;this[_0x291405(0x594)]=Graphics['width'],this[_0x291405(0x87b)]=Graphics[_0x291405(0x87b)];const _0x405583=this[_0x291405(0x594)]/this[_0x291405(0x3ff)][_0x291405(0x594)],_0x35d273=this[_0x291405(0x87b)]/this['bitmap'][_0x291405(0x87b)],_0x521bda=Math[_0x291405(0x6aa)](_0x405583,_0x35d273);this[_0x291405(0x70f)]['x']=_0x521bda,this[_0x291405(0x70f)]['y']=_0x521bda,this['x']=(Graphics['width']-this[_0x291405(0x594)])/0x2,this['y']=Graphics['height']-this[_0x291405(0x87b)];},Sprite_Battleback[_0x19a075(0x475)][_0x19a075(0x77a)]=function(){const _0x47d2da=_0x19a075;this['width']=Graphics[_0x47d2da(0x594)],this['height']=Graphics[_0x47d2da(0x87b)];const _0x11ae8f=Math[_0x47d2da(0x5cc)](0x1,this[_0x47d2da(0x594)]/this['bitmap'][_0x47d2da(0x594)]),_0x189ecd=Math['min'](0x1,this['height']/this['bitmap']['height']),_0xe3690c=Math[_0x47d2da(0x6aa)](_0x11ae8f,_0x189ecd);this[_0x47d2da(0x70f)]['x']=_0xe3690c,this['scale']['y']=_0xe3690c,this['x']=(Graphics[_0x47d2da(0x594)]-this['width'])/0x2,this['y']=Graphics[_0x47d2da(0x87b)]-this[_0x47d2da(0x87b)];},Sprite_Battleback[_0x19a075(0x475)]['adjustPosition_ScaleUp']=function(){const _0x51eed6=_0x19a075;this[_0x51eed6(0x594)]=Graphics['width'],this[_0x51eed6(0x87b)]=Graphics[_0x51eed6(0x87b)];const _0x24c558=Math[_0x51eed6(0x6aa)](0x1,this['width']/this[_0x51eed6(0x3ff)][_0x51eed6(0x594)]),_0x4a59a0=Math['max'](0x1,this['height']/this[_0x51eed6(0x3ff)][_0x51eed6(0x87b)]),_0x52073b=Math[_0x51eed6(0x6aa)](_0x24c558,_0x4a59a0);this[_0x51eed6(0x70f)]['x']=_0x52073b,this[_0x51eed6(0x70f)]['y']=_0x52073b,this['x']=(Graphics[_0x51eed6(0x594)]-this['width'])/0x2,this['y']=Graphics[_0x51eed6(0x87b)]-this[_0x51eed6(0x87b)];},Spriteset_Battle[_0x19a075(0x475)][_0x19a075(0x8ca)]=function(){if(!$gameSystem['isSideView']())return![];return![];},Spriteset_Battle[_0x19a075(0x475)][_0x19a075(0x4f3)]=function(){return 0x0;},Spriteset_Battle[_0x19a075(0x475)][_0x19a075(0x2a7)]=function(){return 0x0;},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x61e)]=Spriteset_Battle[_0x19a075(0x475)][_0x19a075(0x80e)],Spriteset_Battle[_0x19a075(0x475)][_0x19a075(0x80e)]=function(){const _0x412f47=_0x19a075;VisuMZ[_0x412f47(0x73b)][_0x412f47(0x61e)]['call'](this),this[_0x412f47(0x579)](),this[_0x412f47(0x6d4)](),this['createEnemyNames']();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x550)]=Spriteset_Battle['prototype'][_0x19a075(0x8cf)],Spriteset_Battle['prototype'][_0x19a075(0x8cf)]=function(){const _0x2c5b1b=_0x19a075;VisuMZ[_0x2c5b1b(0x73b)]['Spriteset_Battle_update'][_0x2c5b1b(0x2c6)](this),this[_0x2c5b1b(0x71b)]();},Spriteset_Battle[_0x19a075(0x475)][_0x19a075(0x579)]=function(){const _0x234387=_0x19a075;this['_weather']=new Weather(),this[_0x234387(0x724)][_0x234387(0x470)](this[_0x234387(0x615)]);},Spriteset_Battle['prototype'][_0x19a075(0x71b)]=function(){const _0x3f8f5f=_0x19a075;this[_0x3f8f5f(0x615)][_0x3f8f5f(0x74d)]=$gameScreen[_0x3f8f5f(0x5f7)](),this[_0x3f8f5f(0x615)][_0x3f8f5f(0x3ef)]=$gameScreen['weatherPower']();},Game_Interpreter[_0x19a075(0x475)][_0x19a075(0x31d)]=function(_0x33eefd){const _0x370a3c=_0x19a075;$gameScreen[_0x370a3c(0x1da)](_0x33eefd[0x0],_0x33eefd[0x1],_0x33eefd[0x2]);if(_0x33eefd[0x3])this[_0x370a3c(0x6a7)](_0x33eefd[0x2]);return!![];},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x6b2)]=Game_Interpreter[_0x19a075(0x475)]['command283'],Game_Interpreter[_0x19a075(0x475)][_0x19a075(0x6f9)]=function(_0x5485ee){const _0x1f2b03=_0x19a075;return SceneManager[_0x1f2b03(0x553)]()?(SceneManager[_0x1f2b03(0x3a8)]['_spriteset'][_0x1f2b03(0x4cf)](_0x5485ee[0x0],_0x5485ee[0x1]),!![]):VisuMZ[_0x1f2b03(0x73b)][_0x1f2b03(0x6b2)]['call'](this,_0x5485ee);},Spriteset_Battle[_0x19a075(0x475)][_0x19a075(0x4fc)]=function(_0x5c6fc3,_0x29b30a){_0x5c6fc3['bitmap']=_0x29b30a;},Spriteset_Battle[_0x19a075(0x475)]['changeBattlebacks']=function(_0x40a9b8,_0x1b3091){const _0x19232c=_0x19a075;_0x40a9b8=_0x40a9b8||'',_0x1b3091=_0x1b3091||'';_0x40a9b8===''&&_0x1b3091===''&&(_0x40a9b8=this[_0x19232c(0x69d)]['battleback1Name'](),_0x1b3091=this['_back2Sprite'][_0x19232c(0x4e0)]());const _0x187a63=ImageManager['loadBattleback1'](_0x40a9b8),_0x389f27=ImageManager[_0x19232c(0x8d7)](_0x1b3091);_0x187a63[_0x19232c(0x57c)](this[_0x19232c(0x2ef)][_0x19232c(0x3fd)](this,this[_0x19232c(0x69d)],this[_0x19232c(0x4b9)],_0x187a63,_0x389f27));},Spriteset_Battle[_0x19a075(0x475)][_0x19a075(0x2ef)]=function(_0x3e9e31,_0x12feb4,_0x55163a,_0x3dc352){const _0x1e4d07=_0x19a075;_0x3dc352[_0x1e4d07(0x57c)](this[_0x1e4d07(0x5c6)][_0x1e4d07(0x3fd)](this,_0x3e9e31,_0x12feb4,_0x55163a,_0x3dc352));},Spriteset_Battle['prototype']['updateBattlebackBitmap2']=function(_0x1f7ad8,_0x121bcb,_0x4f09d3,_0x3ac15b){const _0x5cb4c5=_0x19a075;_0x1f7ad8[_0x5cb4c5(0x3ff)]=_0x4f09d3,_0x121bcb[_0x5cb4c5(0x3ff)]=_0x3ac15b,_0x1f7ad8['adjustPosition'](),_0x121bcb['adjustPosition']();},VisuMZ[_0x19a075(0x73b)]['Spriteset_Battle_createBattleField']=Spriteset_Battle[_0x19a075(0x475)][_0x19a075(0x2b3)],Spriteset_Battle['prototype'][_0x19a075(0x2b3)]=function(){const _0x4798e6=_0x19a075;VisuMZ[_0x4798e6(0x73b)][_0x4798e6(0x528)][_0x4798e6(0x2c6)](this),this[_0x4798e6(0x859)]();},Spriteset_Battle['prototype']['createBattleFieldBattleCore']=function(){const _0x471769=_0x19a075;this[_0x471769(0x1f6)](),this['createAnimationContainer'](),this['createDamageContainer'](),this[_0x471769(0x186)]();},Spriteset_Battle[_0x19a075(0x475)][_0x19a075(0x1f6)]=function(){const _0x3f0934=_0x19a075;this['_battlerContainer']=new Sprite(),this[_0x3f0934(0x724)]['addChild'](this[_0x3f0934(0x476)]);},Spriteset_Battle[_0x19a075(0x475)][_0x19a075(0x47c)]=function(){const _0x58b895=_0x19a075;this[_0x58b895(0x730)]=new Sprite(),this[_0x58b895(0x724)]['addChild'](this['_animationContainer']);},Spriteset_Battle['prototype'][_0x19a075(0x332)]=function(){const _0x49f571=_0x19a075;this[_0x49f571(0x82d)]=new Sprite(),this['_damageContainer']['x']=this[_0x49f571(0x724)]['x'],this['_damageContainer']['y']=this[_0x49f571(0x724)]['y'],this[_0x49f571(0x470)](this['_damageContainer']);},Spriteset_Battle[_0x19a075(0x475)]['adjustFlippedBattlefield']=function(){const _0x2855d0=_0x19a075;if(!this[_0x2855d0(0x8ca)]())return;this['_battlerContainer'][_0x2855d0(0x70f)]['x']=-0x1,this[_0x2855d0(0x476)]['x']=this[_0x2855d0(0x724)]['width'],this[_0x2855d0(0x730)][_0x2855d0(0x70f)]['x']=-0x1,this[_0x2855d0(0x730)]['x']=this[_0x2855d0(0x724)][_0x2855d0(0x594)],this[_0x2855d0(0x82d)]['scale']['x']=-0x1,this[_0x2855d0(0x82d)]['x']=this[_0x2855d0(0x724)]['x']+this[_0x2855d0(0x724)][_0x2855d0(0x594)];},Spriteset_Battle[_0x19a075(0x475)][_0x19a075(0x647)]=function(){const _0x201e97=_0x19a075;Imported[_0x201e97(0x7b7)]&&VisuMZ[_0x201e97(0x458)][_0x201e97(0x7e0)]['UI'][_0x201e97(0x872)]&&this[_0x201e97(0x4c0)]();const _0x17d82b=$gameTroop[_0x201e97(0x3e2)](),_0x11ed1e=[];for(const _0x5e2a55 of _0x17d82b){_0x11ed1e[_0x201e97(0x7cc)](new Sprite_Enemy(_0x5e2a55));}_0x11ed1e['sort'](this[_0x201e97(0x3be)]['bind'](this));for(const _0x12c406 of _0x11ed1e){this[_0x201e97(0x476)][_0x201e97(0x470)](_0x12c406);}this[_0x201e97(0x661)]=_0x11ed1e;},Spriteset_Battle[_0x19a075(0x475)]['createActors']=function(){const _0x4ab18f=_0x19a075;this[_0x4ab18f(0x73e)]=[];for(let _0x3a337f=0x0;_0x3a337f<$gameParty['maxBattleMembers']();_0x3a337f++){const _0x58d229=$gameParty[_0x4ab18f(0x280)]()[_0x3a337f],_0x404cd9=new Sprite_Actor();_0x404cd9[_0x4ab18f(0x922)](_0x58d229),_0x404cd9[_0x4ab18f(0x6f6)](_0x58d229),_0x404cd9[_0x4ab18f(0x8cf)](),this[_0x4ab18f(0x73e)][_0x4ab18f(0x7cc)](_0x404cd9),this[_0x4ab18f(0x476)][_0x4ab18f(0x470)](_0x404cd9);}},Spriteset_Battle[_0x19a075(0x475)][_0x19a075(0x916)]=function(_0x11d85e,_0xa798f2,_0xb7c33c,_0x2d4ce9){const _0x1bb7ad=_0x19a075,_0x2db5ac=this[_0x1bb7ad(0x25c)](_0xa798f2),_0x4c7046=new(_0x2db5ac?Sprite_AnimationMV:Sprite_Animation)(),_0x451fac=this[_0x1bb7ad(0x37d)](_0x11d85e);this[_0x1bb7ad(0x34f)](_0x11d85e[0x0])&&(_0xb7c33c=!_0xb7c33c),_0x4c7046[_0x1bb7ad(0x575)]=_0x11d85e,_0x4c7046['setup'](_0x451fac,_0xa798f2,_0xb7c33c,_0x2d4ce9),this[_0x1bb7ad(0x232)](_0x4c7046);},Spriteset_Battle['prototype'][_0x19a075(0x232)]=function(_0xa7296){const _0x30b7c3=_0x19a075;this[_0x30b7c3(0x4f7)](_0xa7296)?this['battleStatusWindowAnimationContainer']()[_0x30b7c3(0x470)](_0xa7296):this[_0x30b7c3(0x730)]['addChild'](_0xa7296),this['_animationSprites']['push'](_0xa7296);},Spriteset_Battle[_0x19a075(0x475)][_0x19a075(0x4f7)]=function(_0x4cf702){const _0x356f3c=_0x19a075;if(!_0x4cf702)return![];if(!_0x4cf702[_0x356f3c(0x2ec)])return![];if(_0x4cf702[_0x356f3c(0x2ec)][_0x356f3c(0x675)]!==0x0)return![];if(!_0x4cf702[_0x356f3c(0x575)][0x0])return![];if(!_0x4cf702[_0x356f3c(0x575)][0x0][_0x356f3c(0x34c)]())return![];if($gameSystem[_0x356f3c(0x50c)]())return![];if(!this[_0x356f3c(0x28e)]())return![];return Window_BattleStatus[_0x356f3c(0x475)][_0x356f3c(0x4db)]()===_0x356f3c(0x53b);},Spriteset_Battle[_0x19a075(0x475)][_0x19a075(0x28e)]=function(){const _0x11f85b=_0x19a075;if(!SceneManager[_0x11f85b(0x3a8)])return;if(!SceneManager[_0x11f85b(0x3a8)]['_statusWindow'])return;if(!SceneManager[_0x11f85b(0x3a8)]['_statusWindow'][_0x11f85b(0x520)])return;return SceneManager[_0x11f85b(0x3a8)][_0x11f85b(0x828)][_0x11f85b(0x520)];},Spriteset_Battle['prototype'][_0x19a075(0x281)]=function(_0x307d2d){const _0x46afcb=_0x19a075;this[_0x46afcb(0x906)](_0x307d2d);for(const _0x4ba6e8 of _0x307d2d[_0x46afcb(0x575)]){_0x4ba6e8[_0x46afcb(0x308)]&&_0x4ba6e8[_0x46afcb(0x308)]();}_0x307d2d[_0x46afcb(0x8f3)]();},Spriteset_Battle[_0x19a075(0x475)]['removeAnimationFromContainer']=function(_0x2bfb5e){const _0x277ced=_0x19a075;this[_0x277ced(0x905)][_0x277ced(0x8c3)](_0x2bfb5e),this[_0x277ced(0x4f7)](_0x2bfb5e)?this[_0x277ced(0x28e)]()['removeChild'](_0x2bfb5e):this[_0x277ced(0x730)][_0x277ced(0x42b)](_0x2bfb5e);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x380)]=Spriteset_Battle[_0x19a075(0x475)]['updateActors'],Spriteset_Battle[_0x19a075(0x475)][_0x19a075(0x82e)]=function(){const _0x3da1bc=_0x19a075;VisuMZ[_0x3da1bc(0x73b)][_0x3da1bc(0x380)][_0x3da1bc(0x2c6)](this),this[_0x3da1bc(0x377)]();},Spriteset_Battle[_0x19a075(0x475)][_0x19a075(0x377)]=function(){const _0x1a3753=_0x19a075;this[_0x1a3753(0x476)][_0x1a3753(0x1e2)][_0x1a3753(0x882)](this[_0x1a3753(0x4a9)][_0x1a3753(0x3fd)](this)),this[_0x1a3753(0x8e3)]();},Spriteset_Battle['prototype'][_0x19a075(0x4a9)]=function(_0xc22eb1,_0x5ef0e7){const _0x451e5f=_0x19a075;if(VisuMZ['BattleCore']['Settings'][_0x451e5f(0x72c)][_0x451e5f(0x701)]){if(_0xc22eb1['_battler']&&_0x5ef0e7[_0x451e5f(0x8b3)]){if(_0xc22eb1[_0x451e5f(0x8b3)][_0x451e5f(0x34c)]()&&_0x5ef0e7[_0x451e5f(0x8b3)][_0x451e5f(0x5a3)]())return 0x1;else{if(_0x5ef0e7[_0x451e5f(0x8b3)]['isActor']()&&_0xc22eb1[_0x451e5f(0x8b3)][_0x451e5f(0x5a3)]())return-0x1;}}}return _0xc22eb1[_0x451e5f(0x6b6)]!==_0x5ef0e7[_0x451e5f(0x6b6)]?_0xc22eb1[_0x451e5f(0x6b6)]-_0x5ef0e7[_0x451e5f(0x6b6)]:_0x5ef0e7[_0x451e5f(0x822)]-_0xc22eb1[_0x451e5f(0x822)];},Spriteset_Battle[_0x19a075(0x475)][_0x19a075(0x8e3)]=function(){const _0x5e4a35=_0x19a075;if(!VisuMZ[_0x5e4a35(0x73b)][_0x5e4a35(0x7e0)]['Actor']['PrioritySortActive'])return;const _0x157185=BattleManager[_0x5e4a35(0x886)];if(_0x157185){if(_0x157185[_0x5e4a35(0x34c)]()&&!$gameSystem[_0x5e4a35(0x50c)]())return;const _0x503530=_0x157185['battler']();if(_0x503530&&_0x157185[_0x5e4a35(0x34c)]())this[_0x5e4a35(0x476)][_0x5e4a35(0x470)](_0x503530);}},Spriteset_Battle[_0x19a075(0x475)][_0x19a075(0x824)]=function(){const _0x127886=_0x19a075;for(const _0x46a099 of $gameParty[_0x127886(0x1ee)]()){if(!_0x46a099)continue;if(!_0x46a099[_0x127886(0x612)]())continue;_0x46a099[_0x127886(0x612)]()[_0x127886(0x58d)]=!![],_0x46a099[_0x127886(0x612)]()[_0x127886(0x726)]();}},Spriteset_Battle[_0x19a075(0x475)]['createUIContainer']=function(){const _0x325486=_0x19a075;this[_0x325486(0x5c5)]=new Sprite(),this[_0x325486(0x724)][_0x325486(0x470)](this[_0x325486(0x5c5)]);},Spriteset_Battle[_0x19a075(0x475)][_0x19a075(0x590)]=function(){const _0x15eca0=_0x19a075;if(VisuMZ[_0x15eca0(0x73b)][_0x15eca0(0x7e0)]['Enemy'][_0x15eca0(0x7ce)])return;this[_0x15eca0(0x180)]=new Sprite(),this[_0x15eca0(0x5c5)]['addChild'](this['_enemyNameContainer']);for(const _0x47d36e of this[_0x15eca0(0x661)]){const _0x1e3b8c=new Sprite_EnemyName();this[_0x15eca0(0x180)]['addChild'](_0x1e3b8c),_0x1e3b8c[_0x15eca0(0x943)](_0x47d36e);}},Spriteset_Battle['prototype'][_0x19a075(0x596)]=function(){return![];},Spriteset_Battle['prototype'][_0x19a075(0x328)]=function(){const _0x148e51=_0x19a075;return this[_0x148e51(0x669)]()[_0x148e51(0x21d)](_0x4979c9=>_0x4979c9[_0x148e51(0x60c)]());},Spriteset_Battle[_0x19a075(0x475)][_0x19a075(0x849)]=function(){const _0x1118af=_0x19a075;return this[_0x1118af(0x669)]()[_0x1118af(0x21d)](_0x36bef2=>_0x36bef2[_0x1118af(0x6bc)]());},Spriteset_Battle[_0x19a075(0x475)][_0x19a075(0x3b9)]=function(){const _0xcc7444=_0x19a075;return this[_0xcc7444(0x669)]()[_0xcc7444(0x21d)](_0x169dcd=>_0x169dcd['isGrowing']());},Spriteset_Battle[_0x19a075(0x475)][_0x19a075(0x2aa)]=function(){const _0x41165a=_0x19a075;return this['battlerSprites']()[_0x41165a(0x21d)](_0x2ebec8=>_0x2ebec8['isSkewing']());},Spriteset_Battle[_0x19a075(0x475)][_0x19a075(0x1bf)]=function(){const _0x40d74b=_0x19a075;return this[_0x40d74b(0x669)]()[_0x40d74b(0x21d)](_0x171056=>_0x171056[_0x40d74b(0x3af)]());},Spriteset_Battle[_0x19a075(0x475)][_0x19a075(0x6e5)]=function(){const _0xf5f0ea=_0x19a075;return this[_0xf5f0ea(0x669)]()['some'](_0x1bf5b6=>_0x1bf5b6[_0xf5f0ea(0x228)]());},VisuMZ[_0x19a075(0x73b)]['Window_ItemList_maxCols']=Window_ItemList[_0x19a075(0x475)][_0x19a075(0x816)],Window_ItemList[_0x19a075(0x475)][_0x19a075(0x816)]=function(){const _0x4bfd80=_0x19a075;return SceneManager[_0x4bfd80(0x553)]()?SceneManager[_0x4bfd80(0x3a8)][_0x4bfd80(0x4db)]()===_0x4bfd80(0x8d0)?VisuMZ[_0x4bfd80(0x73b)][_0x4bfd80(0x7e0)]['BattleLayout'][_0x4bfd80(0x3b8)]:VisuMZ[_0x4bfd80(0x73b)][_0x4bfd80(0x7e0)][_0x4bfd80(0x3a9)][_0x4bfd80(0x310)]:VisuMZ['BattleCore'][_0x4bfd80(0x54d)][_0x4bfd80(0x2c6)](this);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x27d)]=Window_SkillList[_0x19a075(0x475)][_0x19a075(0x816)],Window_SkillList[_0x19a075(0x475)]['maxCols']=function(){const _0x3a42f2=_0x19a075;return SceneManager['isSceneBattle']()?SceneManager[_0x3a42f2(0x3a8)][_0x3a42f2(0x4db)]()===_0x3a42f2(0x8d0)?VisuMZ[_0x3a42f2(0x73b)][_0x3a42f2(0x7e0)]['BattleLayout'][_0x3a42f2(0x3b8)]:VisuMZ['BattleCore'][_0x3a42f2(0x7e0)][_0x3a42f2(0x3a9)][_0x3a42f2(0x310)]:VisuMZ[_0x3a42f2(0x73b)][_0x3a42f2(0x27d)][_0x3a42f2(0x2c6)](this);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x64a)]=Window_Options[_0x19a075(0x475)]['addGeneralOptions'],Window_Options[_0x19a075(0x475)][_0x19a075(0x7f6)]=function(){const _0xa5b3d=_0x19a075;VisuMZ['BattleCore']['Window_Options_addGeneralOptions']['call'](this),this[_0xa5b3d(0x8c5)](),this[_0xa5b3d(0x323)]();},Window_Options[_0x19a075(0x475)][_0x19a075(0x8c5)]=function(){const _0x41c8a1=_0x19a075;VisuMZ['BattleCore'][_0x41c8a1(0x7e0)][_0x41c8a1(0x6a8)]['AddOption']&&(this[_0x41c8a1(0x1a2)](),this[_0x41c8a1(0x791)]());},Window_Options[_0x19a075(0x475)][_0x19a075(0x323)]=function(){const _0x31e3ba=_0x19a075;if(!VisuMZ[_0x31e3ba(0x73b)][_0x31e3ba(0x7e0)][_0x31e3ba(0x88a)][_0x31e3ba(0x3ae)])return;const _0x23454d=TextManager['visualHpGauge'],_0x532248=_0x31e3ba(0x1a8);this[_0x31e3ba(0x5d0)](_0x23454d,_0x532248);},Window_Options[_0x19a075(0x475)][_0x19a075(0x1a2)]=function(){const _0x1a2bff=_0x19a075,_0x4da833=TextManager[_0x1a2bff(0x2bc)],_0x26c1cf=_0x1a2bff(0x178);this[_0x1a2bff(0x5d0)](_0x4da833,_0x26c1cf);},Window_Options['prototype']['addBattleCoreAutoBattleStyleCommand']=function(){const _0x4170ff=_0x19a075,_0x1e752a=TextManager[_0x4170ff(0x70a)],_0x120e1d=_0x4170ff(0x339);this[_0x4170ff(0x5d0)](_0x1e752a,_0x120e1d);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x42c)]=Window_Options[_0x19a075(0x475)][_0x19a075(0x850)],Window_Options[_0x19a075(0x475)]['statusText']=function(_0x164969){const _0x4d2615=_0x19a075,_0x189726=this[_0x4d2615(0x1f9)](_0x164969);return _0x189726===_0x4d2615(0x339)?this['statusTextAutoBattleStyle']():VisuMZ[_0x4d2615(0x73b)][_0x4d2615(0x42c)][_0x4d2615(0x2c6)](this,_0x164969);},Window_Options[_0x19a075(0x475)][_0x19a075(0x7ad)]=function(){const _0x3e1465=_0x19a075,_0x4d6684=VisuMZ[_0x3e1465(0x73b)][_0x3e1465(0x7e0)][_0x3e1465(0x6a8)],_0x11b6d5=this['getConfigValue'](_0x3e1465(0x339));return _0x11b6d5?_0x4d6684['StyleON']:_0x4d6684[_0x3e1465(0x751)];},Window_ShopStatus['prototype'][_0x19a075(0x3f1)]=function(){const _0x35d0c3=_0x19a075,_0x70921d=DataManager[_0x35d0c3(0x21a)](this[_0x35d0c3(0x315)]),_0x2c0ee0=VisuMZ[_0x35d0c3(0x44b)][_0x70921d];if(!_0x2c0ee0)return this[_0x35d0c3(0x2a4)]();const _0x138ee8=_0x35d0c3(0x902)['format'](this[_0x35d0c3(0x315)][_0x35d0c3(0x239)][_0x35d0c3(0x74d)]),_0x42769a=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x35d0c3(0x315)][_0x35d0c3(0x239)][_0x35d0c3(0x74d)]];return _0x2c0ee0[_0x138ee8]['format'](_0x42769a);},Window_ShopStatus[_0x19a075(0x475)][_0x19a075(0x4df)]=function(){const _0x4a6f86=_0x19a075,_0x553fec=DataManager[_0x4a6f86(0x21a)](this[_0x4a6f86(0x315)]),_0x47fcbc=VisuMZ[_0x4a6f86(0x44b)][_0x553fec];if(!_0x47fcbc)return this[_0x4a6f86(0x7e8)]();return _0x47fcbc[_0x4a6f86(0x688)][_0x4a6f86(0x2c6)](this);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x67b)]=Window_PartyCommand['prototype'][_0x19a075(0x2a0)],Window_PartyCommand['prototype'][_0x19a075(0x2a0)]=function(_0x35ba36){const _0x3b1633=_0x19a075;VisuMZ[_0x3b1633(0x73b)][_0x3b1633(0x67b)]['call'](this,_0x35ba36),this['createCommandNameWindow'](_0x35ba36);},Window_PartyCommand[_0x19a075(0x475)][_0x19a075(0x4ad)]=function(_0x3a6070){const _0x1aaa44=_0x19a075,_0x29d367=new Rectangle(0x0,0x0,_0x3a6070[_0x1aaa44(0x594)],_0x3a6070[_0x1aaa44(0x87b)]);this['_commandNameWindow']=new Window_Base(_0x29d367),this[_0x1aaa44(0x7c6)][_0x1aaa44(0x50f)]=0x0,this[_0x1aaa44(0x470)](this[_0x1aaa44(0x7c6)]),this['updateCommandNameWindow']();},Window_PartyCommand[_0x19a075(0x475)][_0x19a075(0x609)]=function(){const _0x3313a7=_0x19a075;Window_Command[_0x3313a7(0x475)][_0x3313a7(0x609)]['call'](this);if(this[_0x3313a7(0x7c6)])this['updateCommandNameWindow']();},Window_PartyCommand[_0x19a075(0x475)]['updateCommandNameWindow']=function(){const _0x2b6f2b=_0x19a075,_0x39ebc9=this[_0x2b6f2b(0x7c6)];_0x39ebc9[_0x2b6f2b(0x1d9)]['clear']();const _0x2caecd=this[_0x2b6f2b(0x888)](this[_0x2b6f2b(0x8a1)]());if(_0x2caecd===_0x2b6f2b(0x2af)&&this[_0x2b6f2b(0x416)]()>0x0){const _0x320ce5=this[_0x2b6f2b(0x500)](this[_0x2b6f2b(0x8a1)]());let _0x356452=this['commandName'](this['index']());_0x356452=_0x356452['replace'](/\\I\[(\d+)\]/gi,''),_0x39ebc9['resetFontSettings'](),this[_0x2b6f2b(0x60d)](_0x356452,_0x320ce5),this['commandNameWindowDrawText'](_0x356452,_0x320ce5),this['commandNameWindowCenter'](_0x356452,_0x320ce5);}},Window_PartyCommand[_0x19a075(0x475)][_0x19a075(0x60d)]=function(_0x377219,_0x508c98){},Window_PartyCommand['prototype'][_0x19a075(0x63b)]=function(_0x36e81d,_0x21bfbf){const _0x597ba0=_0x19a075,_0x563913=this[_0x597ba0(0x7c6)];_0x563913['drawText'](_0x36e81d,0x0,_0x21bfbf['y'],_0x563913[_0x597ba0(0x2bb)],_0x597ba0(0x268));},Window_PartyCommand[_0x19a075(0x475)][_0x19a075(0x746)]=function(_0x575865,_0x4d41de){const _0x4a17f2=_0x19a075,_0x4ab6f1=this[_0x4a17f2(0x7c6)],_0x920682=$gameSystem[_0x4a17f2(0x465)](),_0x3958a9=_0x4d41de['x']+Math[_0x4a17f2(0x1ec)](_0x4d41de['width']/0x2)+_0x920682;_0x4ab6f1['x']=_0x4ab6f1['width']/-0x2+_0x3958a9,_0x4ab6f1['y']=Math[_0x4a17f2(0x1ec)](_0x4d41de[_0x4a17f2(0x87b)]/0x2);},Window_PartyCommand[_0x19a075(0x475)]['makeCommandList']=function(){const _0x9a48a2=_0x19a075;this[_0x9a48a2(0x708)](),this[_0x9a48a2(0x26a)](),this['addCustomCommands'](),this[_0x9a48a2(0x269)](),this['addEscapeCommand']();},Window_PartyCommand['prototype']['addFightCommand']=function(){const _0x5f3397=_0x19a075,_0x58d8a7=this[_0x5f3397(0x4af)](),_0x40f8f0=VisuMZ[_0x5f3397(0x73b)][_0x5f3397(0x7e0)][_0x5f3397(0x72b)][_0x5f3397(0x318)],_0x1bf565=_0x58d8a7==='text'?TextManager[_0x5f3397(0x6c1)]:_0x5f3397(0x51e)[_0x5f3397(0x732)](_0x40f8f0,TextManager[_0x5f3397(0x6c1)]),_0x67a068=this[_0x5f3397(0x513)]();this[_0x5f3397(0x5d0)](_0x1bf565,_0x5f3397(0x6c1),_0x67a068);},Window_PartyCommand['prototype'][_0x19a075(0x513)]=function(){return!![];},Window_PartyCommand['prototype']['addAutoBattleCommand']=function(){const _0x5ef96f=_0x19a075;if(!this[_0x5ef96f(0x51f)]())return;const _0x23fb4d=this['commandStyle'](),_0x500075=VisuMZ[_0x5ef96f(0x73b)]['Settings']['PartyCmd'][_0x5ef96f(0x306)],_0x1734a1=_0x23fb4d===_0x5ef96f(0x650)?TextManager['autoBattle']:_0x5ef96f(0x51e)['format'](_0x500075,TextManager[_0x5ef96f(0x7be)]),_0x52999e=this[_0x5ef96f(0x2e4)]();this[_0x5ef96f(0x5d0)](_0x1734a1,_0x5ef96f(0x7be),_0x52999e);},Window_PartyCommand['prototype'][_0x19a075(0x51f)]=function(){const _0x2c7813=_0x19a075;return VisuMZ[_0x2c7813(0x73b)][_0x2c7813(0x7e0)]['PartyCmd']['CommandAddAutoBattle'];},Window_PartyCommand[_0x19a075(0x475)]['isAutoBattleCommandEnabled']=function(){return!![];},Window_PartyCommand[_0x19a075(0x475)]['addCustomCommands']=function(){},Window_PartyCommand[_0x19a075(0x475)]['addOptionsCommand']=function(){const _0x4f51cc=_0x19a075;if(!this[_0x4f51cc(0x6dd)]())return;const _0x46d4ec=this['commandStyle'](),_0x58fb3c=VisuMZ[_0x4f51cc(0x73b)][_0x4f51cc(0x7e0)][_0x4f51cc(0x72b)][_0x4f51cc(0x5c0)],_0x1ca54e=_0x46d4ec===_0x4f51cc(0x650)?TextManager[_0x4f51cc(0x8c1)]:_0x4f51cc(0x51e)[_0x4f51cc(0x732)](_0x58fb3c,TextManager['options']),_0x1c5988=this[_0x4f51cc(0x2d2)]();this[_0x4f51cc(0x5d0)](_0x1ca54e,'options',_0x1c5988);},Window_PartyCommand[_0x19a075(0x475)][_0x19a075(0x6dd)]=function(){const _0x4e1822=_0x19a075;return VisuMZ['BattleCore']['Settings']['PartyCmd'][_0x4e1822(0x46d)];},Window_PartyCommand['prototype'][_0x19a075(0x2d2)]=function(){return!![];},Window_PartyCommand[_0x19a075(0x475)][_0x19a075(0x8d1)]=function(){const _0x2e120c=_0x19a075,_0x24f63c=this[_0x2e120c(0x4af)](),_0x34691a=VisuMZ[_0x2e120c(0x73b)]['Settings'][_0x2e120c(0x72b)][_0x2e120c(0x2b1)],_0x13f6b7=_0x24f63c===_0x2e120c(0x650)?TextManager[_0x2e120c(0x4e4)]:_0x2e120c(0x51e)[_0x2e120c(0x732)](_0x34691a,TextManager[_0x2e120c(0x4e4)]),_0x5983e3=this[_0x2e120c(0x4d0)]();this['addCommand'](_0x13f6b7,'escape',_0x5983e3);},Window_PartyCommand[_0x19a075(0x475)][_0x19a075(0x4d0)]=function(){const _0x4b0971=_0x19a075;return BattleManager[_0x4b0971(0x77b)]();},Window_PartyCommand[_0x19a075(0x475)][_0x19a075(0x792)]=function(){const _0x242e06=_0x19a075;return VisuMZ[_0x242e06(0x73b)][_0x242e06(0x7e0)][_0x242e06(0x72b)]['CmdTextAlign'];},Window_PartyCommand['prototype'][_0x19a075(0x451)]=function(_0x3b88cb){const _0x5c4eab=_0x19a075,_0x3dc077=this[_0x5c4eab(0x888)](_0x3b88cb);if(_0x3dc077===_0x5c4eab(0x3da))this[_0x5c4eab(0x878)](_0x3b88cb);else _0x3dc077==='icon'?this[_0x5c4eab(0x355)](_0x3b88cb):Window_Command[_0x5c4eab(0x475)][_0x5c4eab(0x451)]['call'](this,_0x3b88cb);},Window_PartyCommand[_0x19a075(0x475)][_0x19a075(0x4af)]=function(){const _0x3efa5a=_0x19a075;return VisuMZ[_0x3efa5a(0x73b)][_0x3efa5a(0x7e0)][_0x3efa5a(0x72b)][_0x3efa5a(0x32a)];},Window_PartyCommand[_0x19a075(0x475)][_0x19a075(0x888)]=function(_0x46c566){const _0x42aea8=_0x19a075;if(_0x46c566<0x0)return _0x42aea8(0x650);const _0x277a5d=this[_0x42aea8(0x4af)]();if(_0x277a5d!=='auto')return _0x277a5d;else{if(this[_0x42aea8(0x416)]()>0x0){const _0x47d460=this[_0x42aea8(0x2cc)](_0x46c566);if(_0x47d460['match'](/\\I\[(\d+)\]/i)){const _0xb23fbe=this[_0x42aea8(0x500)](_0x46c566),_0x1c0321=this['textSizeEx'](_0x47d460)[_0x42aea8(0x594)];return _0x1c0321<=_0xb23fbe['width']?_0x42aea8(0x3da):'icon';}}}return _0x42aea8(0x650);},Window_PartyCommand[_0x19a075(0x475)][_0x19a075(0x878)]=function(_0x4a58ca){const _0x181db2=_0x19a075,_0x565cea=this[_0x181db2(0x500)](_0x4a58ca),_0x27b44e=this[_0x181db2(0x2cc)](_0x4a58ca),_0x597065=this['textSizeEx'](_0x27b44e)[_0x181db2(0x594)];this['changePaintOpacity'](this[_0x181db2(0x49f)](_0x4a58ca));const _0xc356bb=this['itemTextAlign']();if(_0xc356bb===_0x181db2(0x7e3))this[_0x181db2(0x38a)](_0x27b44e,_0x565cea['x']+_0x565cea[_0x181db2(0x594)]-_0x597065,_0x565cea['y'],_0x597065);else{if(_0xc356bb===_0x181db2(0x268)){const _0x54aa2c=_0x565cea['x']+Math[_0x181db2(0x1ec)]((_0x565cea[_0x181db2(0x594)]-_0x597065)/0x2);this[_0x181db2(0x38a)](_0x27b44e,_0x54aa2c,_0x565cea['y'],_0x597065);}else this[_0x181db2(0x38a)](_0x27b44e,_0x565cea['x'],_0x565cea['y'],_0x597065);}},Window_PartyCommand[_0x19a075(0x475)][_0x19a075(0x355)]=function(_0x2803ff){const _0x2e1068=_0x19a075;this['commandName'](_0x2803ff)['match'](/\\I\[(\d+)\]/i);const _0x1bca64=Number(RegExp['$1'])||0x0,_0x7d31b0=this[_0x2e1068(0x500)](_0x2803ff),_0x29728b=_0x7d31b0['x']+Math['floor']((_0x7d31b0[_0x2e1068(0x594)]-ImageManager['iconWidth'])/0x2),_0x12460d=_0x7d31b0['y']+(_0x7d31b0[_0x2e1068(0x87b)]-ImageManager[_0x2e1068(0x71d)])/0x2;this[_0x2e1068(0x834)](_0x1bca64,_0x29728b,_0x12460d);},Window_PartyCommand[_0x19a075(0x475)][_0x19a075(0x1eb)]=function(){},Window_PartyCommand['prototype'][_0x19a075(0x6c0)]=function(){const _0xdb80e9=_0x19a075;Window_Command['prototype'][_0xdb80e9(0x6c0)][_0xdb80e9(0x2c6)](this);const _0x30cceb=this[_0xdb80e9(0x4db)]();_0x30cceb===_0xdb80e9(0x8d0)&&this['showHelpWindow']();},Window_PartyCommand[_0x19a075(0x475)][_0x19a075(0x4db)]=function(){const _0x2438c9=_0x19a075;if(this[_0x2438c9(0x8c2)])return this['_battleLayoutStyle'];return this[_0x2438c9(0x8c2)]=SceneManager[_0x2438c9(0x3a8)][_0x2438c9(0x4db)](),this[_0x2438c9(0x8c2)];},Window_PartyCommand[_0x19a075(0x475)][_0x19a075(0x2a9)]=function(){const _0x5d4b3e=_0x19a075,_0x2aef07=VisuMZ[_0x5d4b3e(0x73b)][_0x5d4b3e(0x7e0)][_0x5d4b3e(0x72b)],_0x43b577=this[_0x5d4b3e(0x900)]();switch(_0x43b577){case'fight':this[_0x5d4b3e(0x5f1)][_0x5d4b3e(0x8b5)](_0x2aef07[_0x5d4b3e(0x826)]);break;case _0x5d4b3e(0x7be):this[_0x5d4b3e(0x5f1)][_0x5d4b3e(0x8b5)](_0x2aef07[_0x5d4b3e(0x40b)]);break;case _0x5d4b3e(0x8c1):this[_0x5d4b3e(0x5f1)]['setText'](_0x2aef07[_0x5d4b3e(0x51a)]);break;case'escape':this['_helpWindow'][_0x5d4b3e(0x8b5)](_0x2aef07[_0x5d4b3e(0x197)]);break;default:this[_0x5d4b3e(0x5f1)]['setText']('');break;}},VisuMZ[_0x19a075(0x73b)]['Window_ActorCommand_initialize']=Window_ActorCommand[_0x19a075(0x475)][_0x19a075(0x2a0)],Window_ActorCommand[_0x19a075(0x475)][_0x19a075(0x2a0)]=function(_0xcd35ed){const _0x26ce52=_0x19a075;VisuMZ['BattleCore'][_0x26ce52(0x2da)][_0x26ce52(0x2c6)](this,_0xcd35ed),this[_0x26ce52(0x4ad)](_0xcd35ed);},Window_ActorCommand[_0x19a075(0x475)]['createCommandNameWindow']=function(_0x3340b4){const _0x4b8d80=_0x19a075,_0x12aef6=new Rectangle(0x0,0x0,_0x3340b4[_0x4b8d80(0x594)],_0x3340b4[_0x4b8d80(0x87b)]);this[_0x4b8d80(0x7c6)]=new Window_Base(_0x12aef6),this[_0x4b8d80(0x7c6)][_0x4b8d80(0x50f)]=0x0,this[_0x4b8d80(0x470)](this[_0x4b8d80(0x7c6)]),this[_0x4b8d80(0x852)]();},Window_ActorCommand['prototype'][_0x19a075(0x609)]=function(){const _0x41ab82=_0x19a075;Window_Command['prototype'][_0x41ab82(0x609)][_0x41ab82(0x2c6)](this);if(this[_0x41ab82(0x7c6)])this[_0x41ab82(0x852)]();},Window_ActorCommand[_0x19a075(0x475)][_0x19a075(0x852)]=function(){const _0x1a8e94=_0x19a075,_0x3fa7a9=this['_commandNameWindow'];_0x3fa7a9[_0x1a8e94(0x1d9)]['clear']();const _0x2e9ec7=this[_0x1a8e94(0x888)](this['index']());if(_0x2e9ec7==='icon'&&this['maxItems']()>0x0){const _0x1704de=this[_0x1a8e94(0x500)](this['index']());let _0x271c3b=this['commandName'](this['index']());_0x271c3b=_0x271c3b['replace'](/\\I\[(\d+)\]/gi,''),_0x3fa7a9[_0x1a8e94(0x6a5)](),this[_0x1a8e94(0x60d)](_0x271c3b,_0x1704de),this[_0x1a8e94(0x63b)](_0x271c3b,_0x1704de),this[_0x1a8e94(0x746)](_0x271c3b,_0x1704de);}},Window_ActorCommand[_0x19a075(0x475)]['commandNameWindowDrawBackground']=function(_0xa1f841,_0x4e7e21){},Window_ActorCommand['prototype'][_0x19a075(0x63b)]=function(_0x1da822,_0x10cc4b){const _0x378db4=_0x19a075,_0x86db29=this[_0x378db4(0x7c6)];_0x86db29[_0x378db4(0x833)](_0x1da822,0x0,_0x10cc4b['y'],_0x86db29[_0x378db4(0x2bb)],'center');},Window_ActorCommand['prototype'][_0x19a075(0x746)]=function(_0x3948a5,_0x1f4d99){const _0x1eb6f7=_0x19a075,_0x3ce09c=this[_0x1eb6f7(0x7c6)],_0x86f87a=$gameSystem[_0x1eb6f7(0x465)](),_0x20419d=_0x1f4d99['x']+Math[_0x1eb6f7(0x1ec)](_0x1f4d99[_0x1eb6f7(0x594)]/0x2)+_0x86f87a;_0x3ce09c['x']=_0x3ce09c[_0x1eb6f7(0x594)]/-0x2+_0x20419d,_0x3ce09c['y']=Math['floor'](_0x1f4d99[_0x1eb6f7(0x87b)]/0x2);},Window_ActorCommand[_0x19a075(0x475)][_0x19a075(0x8da)]=function(){const _0x3476b9=_0x19a075;if(!this['_actor'])return;const _0x314590=this[_0x3476b9(0x23a)][_0x3476b9(0x87c)]();for(const _0x2150cc of _0x314590){this[_0x3476b9(0x2fd)](_0x2150cc[_0x3476b9(0x171)]()[_0x3476b9(0x431)]());}},Window_ActorCommand[_0x19a075(0x475)][_0x19a075(0x2fd)]=function(_0x251172){const _0x372e47=_0x19a075;_0x251172==='ATTACK'&&this[_0x372e47(0x303)]();[_0x372e47(0x865),_0x372e47(0x571)][_0x372e47(0x5d5)](_0x251172)&&this[_0x372e47(0x696)]();_0x251172===_0x372e47(0x740)&&this[_0x372e47(0x619)]();_0x251172===_0x372e47(0x4a2)&&this['addItemCommand']();_0x251172===_0x372e47(0x6c6)&&this['addEscapeCommand']();_0x251172===_0x372e47(0x6de)&&this[_0x372e47(0x26a)]();if(_0x251172[_0x372e47(0x6c8)](/STYPE: (\d+)/i)){const _0x369da6=Number(RegExp['$1']);this[_0x372e47(0x937)](_0x369da6);}else{if(_0x251172[_0x372e47(0x6c8)](/STYPE: (.*)/i)){const _0x548d63=DataManager['getStypeIdWithName'](RegExp['$1']);this['addSkillTypeCommand'](_0x548d63);}}_0x251172==='ALL\x20SKILLS'&&this[_0x372e47(0x674)]();if(_0x251172[_0x372e47(0x6c8)](/SKILL: (\d+)/i)){const _0xc0c0a2=Number(RegExp['$1']);this[_0x372e47(0x604)]($dataSkills[_0xc0c0a2]);}else{if(_0x251172[_0x372e47(0x6c8)](/SKILL: (.*)/i)){const _0x5ded3d=DataManager[_0x372e47(0x3d9)](RegExp['$1']);this[_0x372e47(0x604)]($dataSkills[_0x5ded3d]);}}_0x251172===_0x372e47(0x282)&&Imported[_0x372e47(0x5ba)]&&this[_0x372e47(0x4b2)](),['COMBATLOG','COMBAT\x20LOG']['includes'](_0x251172)&&Imported['VisuMZ_4_CombatLog']&&this[_0x372e47(0x30e)]();},Window_ActorCommand['prototype'][_0x19a075(0x303)]=function(){const _0x42840b=_0x19a075,_0x622dfd=$dataSkills[this[_0x42840b(0x23a)][_0x42840b(0x838)]()];if(!_0x622dfd)return;if(!this[_0x42840b(0x915)](_0x622dfd))return;const _0x4b4b6e=this[_0x42840b(0x4af)](),_0x2e652c=DataManager[_0x42840b(0x257)](_0x622dfd),_0x3b1623=DataManager[_0x42840b(0x401)](_0x622dfd),_0x26f66d=_0x4b4b6e===_0x42840b(0x650)?_0x2e652c:_0x42840b(0x51e)[_0x42840b(0x732)](_0x3b1623,_0x2e652c);this[_0x42840b(0x5d0)](_0x26f66d,_0x42840b(0x5ff),this['_actor'][_0x42840b(0x69e)]());},Window_ActorCommand[_0x19a075(0x475)][_0x19a075(0x619)]=function(){const _0x3dd1e6=_0x19a075,_0x481121=$dataSkills[this['_actor']['guardSkillId']()];if(!_0x481121)return;if(!this['canAddSkillCommand'](_0x481121))return;const _0x3d1ca0=this[_0x3dd1e6(0x4af)](),_0x1decfa=DataManager[_0x3dd1e6(0x257)](_0x481121),_0x494b72=DataManager[_0x3dd1e6(0x401)](_0x481121),_0xd4d4a=_0x3d1ca0===_0x3dd1e6(0x650)?_0x1decfa:'\x5cI[%1]%2'[_0x3dd1e6(0x732)](_0x494b72,_0x1decfa);this['addCommand'](_0xd4d4a,_0x3dd1e6(0x808),this[_0x3dd1e6(0x23a)]['canGuard']());},Window_ActorCommand[_0x19a075(0x475)][_0x19a075(0x884)]=function(){const _0x4ea881=_0x19a075,_0x45f782=this[_0x4ea881(0x4af)](),_0x120836=VisuMZ[_0x4ea881(0x73b)][_0x4ea881(0x7e0)][_0x4ea881(0x2f2)]['CmdIconItem'],_0xa083f5=_0x45f782===_0x4ea881(0x650)?TextManager[_0x4ea881(0x7ac)]:'\x5cI[%1]%2'['format'](_0x120836,TextManager[_0x4ea881(0x7ac)]),_0x3c7ac8=this[_0x4ea881(0x664)]();this['addCommand'](_0xa083f5,'item',_0x3c7ac8);},Window_ActorCommand[_0x19a075(0x475)][_0x19a075(0x664)]=function(){const _0x589154=_0x19a075;return this[_0x589154(0x23a)]&&this[_0x589154(0x23a)][_0x589154(0x6e8)]();},Window_ActorCommand[_0x19a075(0x475)][_0x19a075(0x696)]=function(){const _0x1e84a6=_0x19a075,_0x4c8510=this['_actor'][_0x1e84a6(0x4fa)]();for(const _0x228913 of _0x4c8510){this[_0x1e84a6(0x937)](_0x228913);}},Window_ActorCommand['prototype'][_0x19a075(0x937)]=function(_0x1766ab){const _0x372e50=_0x19a075;let _0x3d033c=$dataSystem['skillTypes'][_0x1766ab];if(!_0x3d033c)return;let _0x482689=_0x3d033c;const _0x52ae54=this[_0x372e50(0x4af)]();if(_0x52ae54===_0x372e50(0x650))_0x482689=_0x482689[_0x372e50(0x89a)](/\x1I\[(\d+)\]/gi,''),_0x482689=_0x482689[_0x372e50(0x89a)](/\\I\[(\d+)\]/gi,'');else{if(!_0x3d033c[_0x372e50(0x6c8)](/\\I\[(\d+)\]/i)){const _0x52b615=Imported[_0x372e50(0x864)]?VisuMZ[_0x372e50(0x873)][_0x372e50(0x7e0)][_0x372e50(0x59d)]:VisuMZ[_0x372e50(0x73b)]['Settings'][_0x372e50(0x2f2)],_0x4d3f07=$dataSystem['magicSkills'][_0x372e50(0x5d5)](_0x1766ab),_0x237eff=_0x4d3f07?_0x52b615[_0x372e50(0x406)]:_0x52b615[_0x372e50(0x3f5)];_0x482689='\x5cI[%1]%2'[_0x372e50(0x732)](_0x237eff,_0x3d033c);}}this[_0x372e50(0x5d0)](_0x482689,_0x372e50(0x8eb),!![],_0x1766ab);},Window_ActorCommand[_0x19a075(0x475)]['addSingleSkillCommands']=function(){const _0x3af85b=_0x19a075,_0x1cce3c=this[_0x3af85b(0x23a)]['skillTypes'](),_0x5af48c=this[_0x3af85b(0x23a)][_0x3af85b(0x76e)]();for(const _0x3a5242 of _0x5af48c){if(!_0x3a5242)continue;if(Imported[_0x3af85b(0x864)]){if(this[_0x3af85b(0x71c)](_0x3a5242))continue;if(this[_0x3af85b(0x684)](_0x3a5242))continue;}else{if(!_0x1cce3c[_0x3af85b(0x5d5)](_0x3a5242[_0x3af85b(0x4b5)]))continue;}this[_0x3af85b(0x604)](_0x3a5242);}},Window_ActorCommand[_0x19a075(0x475)][_0x19a075(0x71c)]=function(_0x50d7bc){const _0x28da53=_0x19a075,_0x5c95f1=this[_0x28da53(0x23a)][_0x28da53(0x4fa)](),_0x1d7cfb=_0x5c95f1[_0x28da53(0x53d)](_0x9d0760=>DataManager[_0x28da53(0x4c6)](_0x50d7bc)[_0x28da53(0x5d5)](_0x9d0760));return _0x1d7cfb[_0x28da53(0x644)]<=0x0;},Window_ActorCommand['prototype'][_0x19a075(0x684)]=function(_0x511ec){const _0x273999=_0x19a075;if(!Window_SkillList['prototype'][_0x273999(0x935)][_0x273999(0x2c6)](this,_0x511ec))return!![];if(!Window_SkillList[_0x273999(0x475)][_0x273999(0x58e)][_0x273999(0x2c6)](this,_0x511ec))return!![];if(!Window_SkillList[_0x273999(0x475)][_0x273999(0x4aa)][_0x273999(0x2c6)](this,_0x511ec))return!![];return![];},Window_ActorCommand[_0x19a075(0x475)][_0x19a075(0x604)]=function(_0x394759){const _0x22ae2f=_0x19a075;if(!_0x394759)return;if(!this[_0x22ae2f(0x915)](_0x394759))return;const _0x1b9db9=this['commandStyle'](),_0x10369f=DataManager[_0x22ae2f(0x257)](_0x394759),_0x2172f5=DataManager[_0x22ae2f(0x401)](_0x394759),_0x328b6f=_0x1b9db9===_0x22ae2f(0x650)?_0x10369f:_0x22ae2f(0x51e)[_0x22ae2f(0x732)](_0x2172f5,_0x10369f),_0x2f7b81=this[_0x22ae2f(0x23a)][_0x22ae2f(0x722)](_0x394759);this[_0x22ae2f(0x5d0)](_0x328b6f,_0x22ae2f(0x495),_0x2f7b81,_0x394759['id']);},Window_ActorCommand['prototype'][_0x19a075(0x915)]=function(_0x5dddfc){const _0x117b90=_0x19a075,_0x5eaace=_0x5dddfc[_0x117b90(0x185)];if(_0x5eaace[_0x117b90(0x6c8)](/<COMMAND REQUIRE LEARN>/i)){if(!this['_actor']['isLearnedSkill'](_0x5dddfc['id']))return![];}if(_0x5eaace[_0x117b90(0x6c8)](/<COMMAND REQUIRE ACCESS>/i)){if(!this[_0x117b90(0x23a)][_0x117b90(0x88c)](_0x5dddfc['id']))return![];}const _0x22898c=VisuMZ['BattleCore'][_0x117b90(0x1a3)](_0x5dddfc,_0x117b90(0x6fe));if(VisuMZ[_0x117b90(0x73b)]['JS'][_0x22898c]){if(!VisuMZ['BattleCore']['JS'][_0x22898c][_0x117b90(0x2c6)](this,this['_actor'],_0x5dddfc))return![];}return VisuMZ['BattleCore'][_0x117b90(0x1cc)](_0x5dddfc);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x1cc)]=function(_0x364d89){const _0x583bef=_0x19a075,_0x5e4b36=_0x364d89['note'];if(_0x5e4b36['match'](/<COMMAND SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2a14a7=JSON[_0x583bef(0x2ab)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5e3061 of _0x2a14a7){if(!$gameSwitches[_0x583bef(0x4ec)](_0x5e3061))return![];}return!![];}if(_0x5e4b36[_0x583bef(0x6c8)](/<COMMAND SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x27cab1=JSON[_0x583bef(0x2ab)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x34d1ca of _0x27cab1){if(!$gameSwitches[_0x583bef(0x4ec)](_0x34d1ca))return![];}return!![];}if(_0x5e4b36[_0x583bef(0x6c8)](/<COMMAND SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x386f3d=JSON[_0x583bef(0x2ab)]('['+RegExp['$1'][_0x583bef(0x6c8)](/\d+/g)+']');for(const _0x4b598f of _0x386f3d){if($gameSwitches['value'](_0x4b598f))return!![];}return![];}if(_0x5e4b36['match'](/<COMMAND HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x19b71a=JSON['parse']('['+RegExp['$1'][_0x583bef(0x6c8)](/\d+/g)+']');for(const _0x1bc5b6 of _0x19b71a){if(!$gameSwitches[_0x583bef(0x4ec)](_0x1bc5b6))return!![];}return![];}if(_0x5e4b36[_0x583bef(0x6c8)](/<COMMAND HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x42e012=JSON[_0x583bef(0x2ab)]('['+RegExp['$1'][_0x583bef(0x6c8)](/\d+/g)+']');for(const _0x4416c9 of _0x42e012){if(!$gameSwitches['value'](_0x4416c9))return!![];}return![];}if(_0x5e4b36[_0x583bef(0x6c8)](/<COMMAND HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1c9baf=JSON[_0x583bef(0x2ab)]('['+RegExp['$1'][_0x583bef(0x6c8)](/\d+/g)+']');for(const _0xb8f3b8 of _0x1c9baf){if($gameSwitches[_0x583bef(0x4ec)](_0xb8f3b8))return![];}return!![];}return!![];},Window_ActorCommand[_0x19a075(0x475)][_0x19a075(0x8d1)]=function(){const _0x323c3e=_0x19a075,_0x247d63=this[_0x323c3e(0x4af)](),_0x56d01c=VisuMZ[_0x323c3e(0x73b)][_0x323c3e(0x7e0)][_0x323c3e(0x72b)][_0x323c3e(0x2b1)],_0x17f35f=_0x247d63===_0x323c3e(0x650)?TextManager['escape']:_0x323c3e(0x51e)[_0x323c3e(0x732)](_0x56d01c,TextManager[_0x323c3e(0x4e4)]),_0x1ff5c5=this[_0x323c3e(0x4d0)]();this[_0x323c3e(0x5d0)](_0x17f35f,_0x323c3e(0x4e4),_0x1ff5c5);},Window_ActorCommand[_0x19a075(0x475)][_0x19a075(0x4d0)]=function(){const _0x32a047=_0x19a075;return BattleManager[_0x32a047(0x77b)]();},Window_ActorCommand['prototype'][_0x19a075(0x26a)]=function(){const _0x1233e3=_0x19a075,_0x3f387a=this[_0x1233e3(0x4af)](),_0x10f9b5=VisuMZ[_0x1233e3(0x73b)][_0x1233e3(0x7e0)][_0x1233e3(0x72b)]['CmdIconAutoBattle'],_0x3e6761=_0x3f387a===_0x1233e3(0x650)?TextManager[_0x1233e3(0x7be)]:_0x1233e3(0x51e)[_0x1233e3(0x732)](_0x10f9b5,TextManager[_0x1233e3(0x7be)]),_0x9d99ee=this[_0x1233e3(0x2e4)]();this[_0x1233e3(0x5d0)](_0x3e6761,_0x1233e3(0x7be),_0x9d99ee);},Window_ActorCommand[_0x19a075(0x475)][_0x19a075(0x2e4)]=function(){return!![];},Window_ActorCommand[_0x19a075(0x475)][_0x19a075(0x792)]=function(){const _0x3f4fdd=_0x19a075;return VisuMZ[_0x3f4fdd(0x73b)][_0x3f4fdd(0x7e0)][_0x3f4fdd(0x2f2)]['CmdTextAlign'];},Window_ActorCommand[_0x19a075(0x475)][_0x19a075(0x451)]=function(_0xf93d1c){const _0x5a8c12=_0x19a075,_0x1fcd0b=this['commandStyleCheck'](_0xf93d1c);if(_0x1fcd0b===_0x5a8c12(0x3da))this[_0x5a8c12(0x878)](_0xf93d1c);else _0x1fcd0b===_0x5a8c12(0x2af)?this[_0x5a8c12(0x355)](_0xf93d1c):Window_Command[_0x5a8c12(0x475)][_0x5a8c12(0x451)]['call'](this,_0xf93d1c);this[_0x5a8c12(0x777)](_0xf93d1c);},Window_ActorCommand[_0x19a075(0x475)][_0x19a075(0x4af)]=function(){const _0x372f10=_0x19a075;return VisuMZ[_0x372f10(0x73b)][_0x372f10(0x7e0)][_0x372f10(0x2f2)][_0x372f10(0x32a)];},Window_ActorCommand[_0x19a075(0x475)][_0x19a075(0x888)]=function(_0x47cac6){const _0xcf6ab3=_0x19a075;if(_0x47cac6<0x0)return _0xcf6ab3(0x650);const _0x44d4c6=this['commandStyle']();if(_0x44d4c6!=='auto')return _0x44d4c6;else{if(this[_0xcf6ab3(0x416)]()>0x0){const _0x3a7cb5=this['commandName'](_0x47cac6);if(_0x3a7cb5['match'](/\\I\[(\d+)\]/i)){const _0x37ef79=this[_0xcf6ab3(0x500)](_0x47cac6),_0x407006=this[_0xcf6ab3(0x637)](_0x3a7cb5)[_0xcf6ab3(0x594)];return _0x407006<=_0x37ef79[_0xcf6ab3(0x594)]?'iconText':_0xcf6ab3(0x2af);}}}return _0xcf6ab3(0x650);},Window_ActorCommand[_0x19a075(0x475)][_0x19a075(0x878)]=function(_0x1a71e1){const _0x4cbbfe=_0x19a075,_0x46819d=this[_0x4cbbfe(0x500)](_0x1a71e1),_0x4ffbe0=this[_0x4cbbfe(0x2cc)](_0x1a71e1),_0x184133=this[_0x4cbbfe(0x637)](_0x4ffbe0)['width'];this[_0x4cbbfe(0x242)](this['isCommandEnabled'](_0x1a71e1));const _0x57870d=this[_0x4cbbfe(0x792)]();if(_0x57870d===_0x4cbbfe(0x7e3))this[_0x4cbbfe(0x38a)](_0x4ffbe0,_0x46819d['x']+_0x46819d['width']-_0x184133,_0x46819d['y'],_0x184133);else{if(_0x57870d===_0x4cbbfe(0x268)){const _0x4f65da=_0x46819d['x']+Math[_0x4cbbfe(0x1ec)]((_0x46819d['width']-_0x184133)/0x2);this['drawTextEx'](_0x4ffbe0,_0x4f65da,_0x46819d['y'],_0x184133);}else this['drawTextEx'](_0x4ffbe0,_0x46819d['x'],_0x46819d['y'],_0x184133);}},Window_ActorCommand['prototype'][_0x19a075(0x355)]=function(_0x553289){const _0x4a85f7=_0x19a075;this[_0x4a85f7(0x2cc)](_0x553289)[_0x4a85f7(0x6c8)](/\\I\[(\d+)\]/i);const _0x3962c6=Number(RegExp['$1'])||0x0,_0x4a0014=this[_0x4a85f7(0x500)](_0x553289),_0x3fb037=_0x4a0014['x']+Math[_0x4a85f7(0x1ec)]((_0x4a0014[_0x4a85f7(0x594)]-ImageManager[_0x4a85f7(0x75b)])/0x2),_0x3157c2=_0x4a0014['y']+(_0x4a0014[_0x4a85f7(0x87b)]-ImageManager['iconHeight'])/0x2;this[_0x4a85f7(0x834)](_0x3962c6,_0x3fb037,_0x3157c2);},Window_ActorCommand['prototype'][_0x19a075(0x777)]=function(_0x2c54ff){const _0x4b22f1=_0x19a075;if(!(VisuMZ[_0x4b22f1(0x73b)][_0x4b22f1(0x7e0)][_0x4b22f1(0x2f2)][_0x4b22f1(0x6a2)]??!![]))return;const _0x47a8ba=this[_0x4b22f1(0x1f9)](_0x2c54ff);if(!['attack',_0x4b22f1(0x808),_0x4b22f1(0x495)][_0x4b22f1(0x5d5)](_0x47a8ba))return;const _0x279e60=this[_0x4b22f1(0x500)](_0x2c54ff);let _0x22728c=null;if(_0x47a8ba===_0x4b22f1(0x5ff))_0x22728c=$dataSkills[this[_0x4b22f1(0x23a)][_0x4b22f1(0x838)]()];else _0x47a8ba===_0x4b22f1(0x808)?_0x22728c=$dataSkills[this['_actor'][_0x4b22f1(0x8dd)]()]:_0x22728c=$dataSkills[this[_0x4b22f1(0x349)][_0x2c54ff][_0x4b22f1(0x3ac)]];this[_0x4b22f1(0x77c)](this['_actor'],_0x22728c,_0x279e60['x'],_0x279e60['y'],_0x279e60[_0x4b22f1(0x594)]);},Window_ActorCommand[_0x19a075(0x475)][_0x19a075(0x77c)]=function(_0x21be4c,_0x4b53b7,_0x305ff9,_0x3c0f76,_0x324666){const _0x343a2a=_0x19a075;if(!_0x4b53b7)return;Imported[_0x343a2a(0x864)]?Window_Command[_0x343a2a(0x475)][_0x343a2a(0x77c)][_0x343a2a(0x2c6)](this,_0x21be4c,_0x4b53b7,_0x305ff9,_0x3c0f76,_0x324666):Window_SkillList['prototype'][_0x343a2a(0x77c)]['call'](this,_0x4b53b7,_0x305ff9,_0x3c0f76,_0x324666);},Window_ActorCommand['prototype'][_0x19a075(0x1eb)]=function(){},Window_ActorCommand[_0x19a075(0x475)][_0x19a075(0x6c0)]=function(){const _0x3527a2=_0x19a075;Window_Command[_0x3527a2(0x475)][_0x3527a2(0x6c0)]['call'](this);const _0x368f0d=this['battleLayoutStyle']();_0x368f0d===_0x3527a2(0x8d0)&&this[_0x3527a2(0x784)]();},Window_ActorCommand[_0x19a075(0x475)][_0x19a075(0x4db)]=function(){const _0x2e6e24=_0x19a075;if(this[_0x2e6e24(0x8c2)])return this[_0x2e6e24(0x8c2)];return this[_0x2e6e24(0x8c2)]=SceneManager['_scene'][_0x2e6e24(0x4db)](),this[_0x2e6e24(0x8c2)];},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x919)]=Window_ActorCommand['prototype'][_0x19a075(0x8c0)],Window_ActorCommand[_0x19a075(0x475)][_0x19a075(0x8c0)]=function(_0x5efe09){const _0x5d46a6=_0x19a075,_0x5e310a=this[_0x5d46a6(0x4db)]();if(_0x5efe09&&['xp','portrait'][_0x5d46a6(0x5d5)](_0x5e310a))this[_0x5d46a6(0x896)](_0x5efe09);else _0x5efe09&&[_0x5d46a6(0x8d0)][_0x5d46a6(0x5d5)](_0x5e310a)&&(this[_0x5d46a6(0x2e0)](_0x5efe09),this['showHelpWindow']());VisuMZ[_0x5d46a6(0x73b)]['Window_ActorCommand_setup'][_0x5d46a6(0x2c6)](this,_0x5efe09),_0x5efe09&&$gameTroop['aliveMembers']()[_0x5d46a6(0x644)]>0x0&&_0x5efe09[_0x5d46a6(0x612)]()&&_0x5efe09[_0x5d46a6(0x612)]()['stepForward']();},Window_ActorCommand['prototype'][_0x19a075(0x896)]=function(_0x44b351){const _0x58028e=_0x19a075,_0x3cc78f=Math[_0x58028e(0x48a)](Graphics[_0x58028e(0x256)]/0x3),_0x56fb80=Math[_0x58028e(0x48a)](Graphics[_0x58028e(0x256)]/$gameParty[_0x58028e(0x280)]()['length']),_0x2d37ba=Math[_0x58028e(0x5cc)](_0x3cc78f,_0x56fb80),_0x25e8ad=this[_0x58028e(0x189)](VisuMZ[_0x58028e(0x73b)][_0x58028e(0x7e0)][_0x58028e(0x3a9)]['XPActorCommandLines']),_0x36cda9=_0x56fb80*_0x44b351['index']()+(_0x56fb80-_0x2d37ba)/0x2,_0x1af195=SceneManager[_0x58028e(0x3a8)][_0x58028e(0x828)]['y']-_0x25e8ad;this[_0x58028e(0x4bf)](_0x36cda9,_0x1af195,_0x2d37ba,_0x25e8ad),this[_0x58028e(0x86f)](),this[_0x58028e(0x716)](0x1);},Window_ActorCommand[_0x19a075(0x475)][_0x19a075(0x2e0)]=function(_0x2af22f){const _0x428fc2=_0x19a075,_0xb0294a=SceneManager[_0x428fc2(0x3a8)][_0x428fc2(0x804)]();this[_0x428fc2(0x4bf)](_0xb0294a['x'],_0xb0294a['y'],_0xb0294a[_0x428fc2(0x594)],_0xb0294a['height']),this[_0x428fc2(0x86f)](),this[_0x428fc2(0x716)](0x0);},Window_ActorCommand[_0x19a075(0x475)][_0x19a075(0x46b)]=function(){const _0x151296=_0x19a075;if(this[_0x151296(0x794)]){const _0x1f6503=this['_dimmerSprite']['bitmap'],_0xd3450a=this[_0x151296(0x594)]-0x8,_0x515846=this['height'],_0x581ebc=this[_0x151296(0x770)],_0xa5bd3f=ColorManager[_0x151296(0x729)](),_0x2eccef=ColorManager[_0x151296(0x327)]();this[_0x151296(0x794)]['x']=0x4,_0x1f6503[_0x151296(0x413)](_0xd3450a,_0x515846),_0x1f6503['gradientFillRect'](0x0,0x0,_0xd3450a,_0x581ebc,_0x2eccef,_0xa5bd3f,!![]),_0x1f6503['fillRect'](0x0,_0x581ebc,_0xd3450a,_0x515846-_0x581ebc*0x2,_0xa5bd3f),_0x1f6503['gradientFillRect'](0x0,_0x515846-_0x581ebc,_0xd3450a,_0x581ebc,_0xa5bd3f,_0x2eccef,!![]),this['_dimmerSprite'][_0x151296(0x82c)](0x0,0x0,_0xd3450a,_0x515846);}},Window_ActorCommand['prototype']['updateHelp']=function(){const _0x3d01dc=_0x19a075;if(!this['_actor'])return;const _0x575502=VisuMZ[_0x3d01dc(0x73b)][_0x3d01dc(0x7e0)]['ActorCmd'],_0x4933e0=this[_0x3d01dc(0x900)]();switch(_0x4933e0){case _0x3d01dc(0x5ff):this[_0x3d01dc(0x86e)]($dataSkills[this[_0x3d01dc(0x23a)][_0x3d01dc(0x838)]()]);break;case _0x3d01dc(0x808):this['setHelpWindowItem']($dataSkills[this[_0x3d01dc(0x23a)][_0x3d01dc(0x8dd)]()]);break;case'skill':const _0x12f6c9=_0x575502['HelpSkillType'],_0xaaf01=_0x12f6c9['format']($dataSystem['skillTypes'][this[_0x3d01dc(0x8bf)]()]);this[_0x3d01dc(0x5f1)][_0x3d01dc(0x8b5)](_0xaaf01);break;case _0x3d01dc(0x495):this[_0x3d01dc(0x86e)]($dataSkills[this[_0x3d01dc(0x8bf)]()]);break;case _0x3d01dc(0x7ac):this['_helpWindow'][_0x3d01dc(0x8b5)](_0x575502[_0x3d01dc(0x2bf)]);break;case _0x3d01dc(0x4e4):this[_0x3d01dc(0x5f1)][_0x3d01dc(0x8b5)](_0x575502['HelpEscape']);break;case'autoBattle':this[_0x3d01dc(0x5f1)][_0x3d01dc(0x8b5)](_0x575502[_0x3d01dc(0x40b)]);break;default:this[_0x3d01dc(0x5f1)][_0x3d01dc(0x8b5)]('');break;}},VisuMZ[_0x19a075(0x73b)]['Window_BattleStatus_initialize']=Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x2a0)],Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x2a0)]=function(_0x44dce0){const _0x1eda33=_0x19a075;VisuMZ['BattleCore'][_0x1eda33(0x3d4)][_0x1eda33(0x2c6)](this,_0x44dce0),this[_0x1eda33(0x371)](),this[_0x1eda33(0x81d)]();},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x4db)]=function(){const _0x4359fe=_0x19a075;if(this[_0x4359fe(0x8c2)])return this[_0x4359fe(0x8c2)];return this[_0x4359fe(0x8c2)]=SceneManager[_0x4359fe(0x3a8)][_0x4359fe(0x4db)](),this[_0x4359fe(0x8c2)];},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x371)]=function(){const _0x4e4800=_0x19a075;this[_0x4e4800(0x394)]=this['isFrameVisible']();const _0x54da43=VisuMZ[_0x4e4800(0x73b)][_0x4e4800(0x7e0)][_0x4e4800(0x3a9)];_0x54da43[_0x4e4800(0x195)]&&(this['opacity']=0x0);},Window_BattleStatus['prototype']['isFrameVisible']=function(){const _0x45937e=_0x19a075,_0x315969=VisuMZ[_0x45937e(0x73b)][_0x45937e(0x7e0)][_0x45937e(0x3a9)];if(_0x315969[_0x45937e(0x40c)])return!![];const _0x49e17c=this[_0x45937e(0x4db)]();switch(_0x49e17c){case _0x45937e(0x379):case _0x45937e(0x8d0):return!![];break;case _0x45937e(0x235):case'xp':case'portrait':default:return![];break;}},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x5a2)]=function(){const _0x374687=_0x19a075;return this[_0x374687(0x8f5)]()?0x0:0xa;},Window_BattleStatus['prototype'][_0x19a075(0x816)]=function(){const _0x3fbcf3=_0x19a075,_0x8c4ce1=this['battleLayoutStyle']();switch(_0x8c4ce1){case _0x3fbcf3(0x379):return 0x1;break;case'xp':case _0x3fbcf3(0x53b):return $gameParty[_0x3fbcf3(0x280)]()[_0x3fbcf3(0x644)];break;case _0x3fbcf3(0x235):default:return $gameParty['maxBattleMembers']();break;}},Window_BattleStatus['prototype'][_0x19a075(0x945)]=function(){const _0xfa2c1=_0x19a075,_0x5f191f=this[_0xfa2c1(0x4db)]();switch(_0x5f191f){case'list':return Window_StatusBase[_0xfa2c1(0x475)]['itemHeight'][_0xfa2c1(0x2c6)](this);break;case _0xfa2c1(0x235):case'xp':case _0xfa2c1(0x53b):default:return this[_0xfa2c1(0x70c)];break;}},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x3e8)]=function(){const _0x2d6957=_0x19a075,_0x55ea41=this[_0x2d6957(0x4db)]();switch(_0x55ea41){case _0x2d6957(0x379):return Window_StatusBase[_0x2d6957(0x475)]['rowSpacing'][_0x2d6957(0x2c6)](this);break;case _0x2d6957(0x235):case'xp':case'portrait':default:return 0x0;break;}},Window_BattleStatus['prototype']['updatePadding']=function(){const _0x5d28fc=_0x19a075;this[_0x5d28fc(0x8f5)]()?Window_StatusBase[_0x5d28fc(0x475)]['updatePadding'][_0x5d28fc(0x2c6)](this):this['padding']=0x8;},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x82a)]=function(){const _0x2a3d84=_0x19a075,_0x131463=VisuMZ[_0x2a3d84(0x73b)]['Settings'][_0x2a3d84(0x3a9)];_0x131463[_0x2a3d84(0x40c)]?this['windowskin']=ImageManager[_0x2a3d84(0x54a)](_0x131463[_0x2a3d84(0x40c)]):Window_StatusBase['prototype'][_0x2a3d84(0x82a)][_0x2a3d84(0x2c6)](this);},Window_BattleStatus[_0x19a075(0x475)]['drawItemBackground']=function(_0x4c2211){const _0x3a75a0=_0x19a075,_0x1cfe2a=VisuMZ['BattleCore'][_0x3a75a0(0x7e0)][_0x3a75a0(0x3a9)];if(_0x1cfe2a['StatusWindowSelectableBackHide'])return;Window_StatusBase[_0x3a75a0(0x475)][_0x3a75a0(0x3f9)][_0x3a75a0(0x2c6)](this,_0x4c2211);},Window_BattleStatus['prototype'][_0x19a075(0x61a)]=function(){this['_requestRefresh']=!![];},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x8cf)]=function(){const _0x43c328=_0x19a075;Window_StatusBase[_0x43c328(0x475)][_0x43c328(0x8cf)][_0x43c328(0x2c6)](this),this[_0x43c328(0x2f7)](),this[_0x43c328(0x908)]();if(this[_0x43c328(0x4db)]()===_0x43c328(0x8d0))this[_0x43c328(0x5bb)]();},Window_BattleStatus['prototype'][_0x19a075(0x2f7)]=function(){const _0x4f7880=_0x19a075;if($gameTemp['isBattleRefreshRequested']())this[_0x4f7880(0x715)](),this['_requestRefresh']=![];else this[_0x4f7880(0x6c2)]&&(this['_requestRefresh']=![],this[_0x4f7880(0x42f)](),this['updateAttachmentSprites']());},Window_BattleStatus[_0x19a075(0x475)]['show']=function(){const _0x44545a=_0x19a075;Window_StatusBase[_0x44545a(0x475)]['show'][_0x44545a(0x2c6)](this);if(!$gameSystem[_0x44545a(0x50c)]())this['refresh']();},Window_BattleStatus[_0x19a075(0x475)]['hide']=function(){const _0x25e443=_0x19a075;if(this[_0x25e443(0x3d5)]===Window_BattleStatus)return;Window_StatusBase['prototype'][_0x25e443(0x1eb)]['call'](this);},Window_BattleStatus['prototype'][_0x19a075(0x5b5)]=function(_0x3db569){const _0x36f6cf=_0x19a075,_0x4bcf21=this[_0x36f6cf(0x4db)]();switch(_0x4bcf21){case'xp':case _0x36f6cf(0x53b):break;case'default':case _0x36f6cf(0x379):case'border':default:return Window_StatusBase['prototype'][_0x36f6cf(0x5b5)][_0x36f6cf(0x2c6)](this,_0x3db569);break;}},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x1ea)]=Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x941)],Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x941)]=function(_0x207f17){const _0x48b591=_0x19a075,_0x282126=this[_0x48b591(0x4db)]();switch(_0x282126){case _0x48b591(0x379):this[_0x48b591(0x4b7)](_0x207f17);break;case'xp':this[_0x48b591(0x3e0)](_0x207f17);break;case _0x48b591(0x53b):this[_0x48b591(0x624)](_0x207f17);break;case _0x48b591(0x235):case _0x48b591(0x8d0):default:VisuMZ[_0x48b591(0x73b)]['Window_BattleStatus_drawItemImage'][_0x48b591(0x2c6)](this,_0x207f17);break;}},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x5b3)]=function(_0x2eab1d){const _0x2d4f93=_0x19a075,_0x51c631=this[_0x2d4f93(0x4db)]();if(!$gameSystem[_0x2d4f93(0x50c)]())this['centerFrontViewSprite'](_0x2eab1d);switch(_0x51c631){case _0x2d4f93(0x379):this['drawItemStatusListStyle'](_0x2eab1d);break;case'xp':case _0x2d4f93(0x53b):case _0x2d4f93(0x235):case _0x2d4f93(0x8d0):default:this[_0x2d4f93(0x272)](_0x2eab1d);break;}},Window_BattleStatus['prototype'][_0x19a075(0x74b)]=function(){const _0x27528b=_0x19a075,_0x4fa713=this[_0x27528b(0x4db)]();if(['xp'][_0x27528b(0x5d5)](_0x4fa713)&&!$gameSystem[_0x27528b(0x50c)]()){this['setCursorRect'](0x0,0x0,0x0,0x0);return;}Window_StatusBase['prototype'][_0x27528b(0x74b)][_0x27528b(0x2c6)](this);},Window_BattleStatus['prototype']['centerFrontViewSprite']=function(_0x102cef){const _0x400d26=_0x19a075,_0x5eb18c=this['actor'](_0x102cef)['battler']();if(!_0x5eb18c)return;const _0x50b175=this[_0x400d26(0x4db)](),_0x145c79=this['itemRect'](_0x102cef);let _0x5d1833=Math[_0x400d26(0x48a)](_0x145c79['x']+_0x145c79['width']/0x2);['list']['includes'](_0x50b175)&&(_0x5d1833=_0x145c79[_0x400d26(0x594)]/$gameParty[_0x400d26(0x280)]()[_0x400d26(0x644)],_0x5d1833*=_0x102cef,_0x5d1833+=_0x145c79[_0x400d26(0x594)]/$gameParty[_0x400d26(0x280)]()['length']/0x2);let _0xe3a617=Math[_0x400d26(0x48a)](this[_0x400d26(0x49a)](_0x102cef,_0x5eb18c,_0x145c79));_0x5eb18c[_0x400d26(0x7a6)](_0x5d1833,_0xe3a617),this[_0x400d26(0x22b)](_0x5eb18c,0x1),_0x5eb18c['show']();},Window_BattleStatus[_0x19a075(0x475)]['frontviewSpriteY']=function(_0x49d160,_0x4d00a1,_0x306270){const _0x234408=_0x19a075,_0x51c39c=VisuMZ['BattleCore'][_0x234408(0x7e0)][_0x234408(0x3a9)],_0xd2634=this['battleLayoutStyle']();if(_0xd2634==='xp'){const _0x584e59=_0x51c39c[_0x234408(0x3de)];switch(_0x584e59[_0x234408(0x4d9)]()[_0x234408(0x431)]()){case _0x234408(0x240):return _0x306270[_0x234408(0x87b)]-_0x4d00a1[_0x234408(0x3ec)]['height']/0x4;break;case _0x234408(0x268):const _0x20d315=_0x51c39c[_0x234408(0x4b8)];return(_0x306270[_0x234408(0x87b)]+(_0x4d00a1[_0x234408(0x87b)]||_0x20d315))/0x2;break;case _0x234408(0x8d8):return 0x0;case _0x234408(0x880):default:return this[_0x234408(0x3d2)](_0x306270);break;}}else{if(_0xd2634===_0x234408(0x53b)){}}return _0x4d00a1[_0x234408(0x87b)];},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x4b7)]=function(_0x4f710b){const _0x5dbf16=_0x19a075;if(!VisuMZ['BattleCore']['Settings']['BattleLayout'][_0x5dbf16(0x527)])return;const _0x15974c=this[_0x5dbf16(0x4c9)](_0x4f710b),_0x5026bf=this[_0x5dbf16(0x8cb)](_0x4f710b);_0x5026bf[_0x5dbf16(0x594)]=ImageManager['faceWidth'],_0x5026bf[_0x5dbf16(0x87b)]-=0x2,this[_0x5dbf16(0x296)](_0x15974c,_0x5026bf['x']+0x1,_0x5026bf['y']+0x1,_0x5026bf['width'],_0x5026bf[_0x5dbf16(0x87b)]);},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x933)]=function(_0x1c8a01){const _0x3ea110=_0x19a075,_0x5219e9=VisuMZ[_0x3ea110(0x73b)][_0x3ea110(0x7e0)][_0x3ea110(0x3a9)],_0x52b3a0=$dataSystem['optDisplayTp']?0x4:0x3,_0x563ca3=_0x52b3a0*0x80+(_0x52b3a0-0x1)*0x8+0x4,_0x57a66b=this[_0x3ea110(0x4c9)](_0x1c8a01),_0x21f17c=this[_0x3ea110(0x8cb)](_0x1c8a01);let _0x1009df=_0x21f17c['x']+this[_0x3ea110(0x770)];_0x5219e9[_0x3ea110(0x527)]?_0x1009df=_0x21f17c['x']+ImageManager['faceWidth']+0x8:_0x1009df+=ImageManager[_0x3ea110(0x75b)];const _0x28da1c=Math[_0x3ea110(0x48a)](Math[_0x3ea110(0x5cc)](_0x21f17c['x']+_0x21f17c['width']-_0x563ca3,_0x1009df)),_0x321425=Math[_0x3ea110(0x48a)](_0x21f17c['y']+(_0x21f17c['height']-Sprite_Name[_0x3ea110(0x475)]['bitmapHeight']())/0x2),_0x5b2928=Math[_0x3ea110(0x48a)](_0x28da1c-ImageManager[_0x3ea110(0x75b)]/0x2-0x4),_0x4443c0=Math[_0x3ea110(0x48a)](_0x21f17c['y']+(_0x21f17c[_0x3ea110(0x87b)]-ImageManager['iconHeight'])/0x2+ImageManager[_0x3ea110(0x71d)]/0x2);let _0xf4014d=_0x28da1c+0x88;const _0x3a3581=_0x321425;this[_0x3ea110(0x712)](_0x57a66b,_0x28da1c-0x4+(_0x5219e9[_0x3ea110(0x517)]||0x0),_0x321425+(_0x5219e9[_0x3ea110(0x88b)]||0x0)),this[_0x3ea110(0x25f)](_0x57a66b,_0x28da1c+(_0x5219e9[_0x3ea110(0x735)]||0x0),_0x321425+(_0x5219e9[_0x3ea110(0x931)]||0x0)),this[_0x3ea110(0x8d9)](_0x57a66b,_0x5b2928+(_0x5219e9[_0x3ea110(0x488)]||0x0),_0x4443c0+(_0x5219e9[_0x3ea110(0x47e)]||0x0)),this[_0x3ea110(0x346)](_0x57a66b,'hp',_0xf4014d+0x88*0x0+(_0x5219e9[_0x3ea110(0x274)]||0x0),_0x3a3581+(_0x5219e9[_0x3ea110(0x87a)]||0x0)),this['placeGauge'](_0x57a66b,'mp',_0xf4014d+0x88*0x1+(_0x5219e9[_0x3ea110(0x67f)]||0x0),_0x3a3581+(_0x5219e9[_0x3ea110(0x7ec)]||0x0)),$dataSystem[_0x3ea110(0x844)]&&this[_0x3ea110(0x346)](_0x57a66b,'tp',_0xf4014d+0x88*0x2+(_0x5219e9[_0x3ea110(0x433)]||0x0),_0x3a3581+(_0x5219e9[_0x3ea110(0x4e8)]||0x0));},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x3e0)]=function(_0x46e2ff){const _0x4cd6c7=_0x19a075;if(!$gameSystem[_0x4cd6c7(0x50c)]())return;VisuMZ[_0x4cd6c7(0x73b)][_0x4cd6c7(0x1ea)][_0x4cd6c7(0x2c6)](this,_0x46e2ff);},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x272)]=function(_0x3c27df){const _0x2a91de=_0x19a075,_0x310196=VisuMZ[_0x2a91de(0x73b)][_0x2a91de(0x7e0)][_0x2a91de(0x3a9)],_0x29f1f2=this[_0x2a91de(0x4c9)](_0x3c27df),_0x449019=this[_0x2a91de(0x8cb)](_0x3c27df),_0x524758=Math['round'](_0x449019['x']+(_0x449019[_0x2a91de(0x594)]-0x80)/0x2),_0x3ab1e9=this[_0x2a91de(0x3d2)](_0x449019);let _0xd9fba9=_0x524758-ImageManager[_0x2a91de(0x75b)]/0x2-0x4,_0x326957=_0x3ab1e9+ImageManager[_0x2a91de(0x71d)]/0x2;_0xd9fba9-ImageManager['iconWidth']/0x2<_0x449019['x']&&(_0xd9fba9=_0x524758+ImageManager[_0x2a91de(0x75b)]/0x2-0x4,_0x326957=_0x3ab1e9-ImageManager[_0x2a91de(0x71d)]/0x2);const _0x5e6a7e=_0x524758,_0x338b16=this[_0x2a91de(0x7a1)](_0x449019);this[_0x2a91de(0x712)](_0x29f1f2,_0x524758+(_0x310196[_0x2a91de(0x517)]||0x0),_0x3ab1e9+(_0x310196[_0x2a91de(0x88b)]||0x0)),this[_0x2a91de(0x25f)](_0x29f1f2,_0x524758+(_0x310196['NameOffsetX']||0x0),_0x3ab1e9+(_0x310196[_0x2a91de(0x931)]||0x0)),this[_0x2a91de(0x8d9)](_0x29f1f2,_0xd9fba9+(_0x310196[_0x2a91de(0x488)]||0x0),_0x326957+(_0x310196[_0x2a91de(0x47e)]||0x0)),this[_0x2a91de(0x346)](_0x29f1f2,'hp',_0x5e6a7e+(_0x310196[_0x2a91de(0x274)]||0x0),_0x338b16+(_0x310196['HpGaugeOffsetY']||0x0)),this['placeGauge'](_0x29f1f2,'mp',_0x5e6a7e+(_0x310196['MpGaugeOffsetX']||0x0),_0x338b16+this[_0x2a91de(0x24e)]()+(_0x310196[_0x2a91de(0x7ec)]||0x0)),$dataSystem[_0x2a91de(0x844)]&&this[_0x2a91de(0x346)](_0x29f1f2,'tp',_0x5e6a7e+(_0x310196['TpGaugeOffsetX']||0x0),_0x338b16+this[_0x2a91de(0x24e)]()*0x2+(_0x310196['TpGaugeOffsetY']||0x0));},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x8b6)]=function(_0x430365){const _0x25f74f=_0x19a075;if(!VisuMZ[_0x25f74f(0x73b)][_0x25f74f(0x7e0)][_0x25f74f(0x3a9)][_0x25f74f(0x26b)])return![];if(_0x430365[_0x25f74f(0x437)]())return!![];return Imported[_0x25f74f(0x302)]&&_0x430365[_0x25f74f(0x574)]();},Game_Actor['prototype'][_0x19a075(0x7bd)]=function(){const _0x2a231e=_0x19a075;if(this['actor']()['note']['match'](/<BATTLE (?:IMAGE|PORTRAIT) OFFSET X:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x2a231e(0x4c9)]()['note'][_0x2a231e(0x6c8)](/<BATTLE (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);}return 0x0;},Game_Actor[_0x19a075(0x475)]['getBattlePortraitOffsetY']=function(){const _0x60495=_0x19a075;if(this[_0x60495(0x4c9)]()[_0x60495(0x185)][_0x60495(0x6c8)](/<BATTLE (?:IMAGE|PORTRAIT) OFFSET Y:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x60495(0x4c9)]()[_0x60495(0x185)]['match'](/<BATTLE (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$2']);}return 0x0;},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x624)]=function(_0x1301b0){const _0x4f150b=_0x19a075,_0x1d17ca=this[_0x4f150b(0x4c9)](_0x1301b0);if(this[_0x4f150b(0x8b6)](_0x1d17ca)){const _0x3446c5=_0x4f150b(0x45a)[_0x4f150b(0x732)](_0x1d17ca[_0x4f150b(0x5bf)]()),_0x4a745d=this[_0x4f150b(0x666)](_0x3446c5,Sprite),_0x6e4abf=_0x1d17ca[_0x4f150b(0x20e)]();_0x6e4abf!==''?_0x4a745d[_0x4f150b(0x3ff)]=ImageManager[_0x4f150b(0x90f)](_0x6e4abf):_0x4a745d[_0x4f150b(0x3ff)]=ImageManager['_emptyBitmap'];const _0x2b7097=this[_0x4f150b(0x8cb)](_0x1301b0);_0x4a745d[_0x4f150b(0x49e)]['x']=0.5,_0x4a745d[_0x4f150b(0x49e)]['y']=0x1;let _0x2396a6=Math[_0x4f150b(0x48a)](_0x2b7097['x']+_0x2b7097[_0x4f150b(0x594)]/0x2)+this[_0x4f150b(0x770)];_0x2396a6+=_0x1d17ca[_0x4f150b(0x7bd)]();let _0x1974c5=Math[_0x4f150b(0x48a)](this[_0x4f150b(0x87b)]);_0x1974c5+=_0x1d17ca[_0x4f150b(0x38c)](),_0x4a745d[_0x4f150b(0x4bf)](_0x2396a6,_0x1974c5);const _0x3a2c88=VisuMZ[_0x4f150b(0x73b)][_0x4f150b(0x7e0)]['BattleLayout']['PortraitScale'];_0x4a745d[_0x4f150b(0x70f)]['x']=_0x3a2c88,_0x4a745d[_0x4f150b(0x70f)]['y']=_0x3a2c88,_0x4a745d[_0x4f150b(0x51b)]();}else{const _0x50d1e3=this['faceRect'](_0x1301b0);this[_0x4f150b(0x296)](_0x1d17ca,_0x50d1e3['x'],_0x50d1e3['y'],_0x50d1e3['width'],_0x50d1e3[_0x4f150b(0x87b)]);}},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x666)]=function(_0x1d92f0,_0x55f2aa){const _0x48c2e7=_0x19a075,_0x6af698=this['_additionalSprites'];if(_0x6af698[_0x1d92f0])return _0x6af698[_0x1d92f0];else{const _0x3af005=new _0x55f2aa();return _0x6af698[_0x1d92f0]=_0x3af005,this[_0x48c2e7(0x55e)](_0x3af005),this[_0x48c2e7(0x55e)](this[_0x48c2e7(0x60a)]),_0x3af005;}},Window_BattleStatus[_0x19a075(0x475)]['_createClientArea']=function(){const _0x4d49ec=_0x19a075;this[_0x4d49ec(0x2b5)](),this[_0x4d49ec(0x6bf)](),Window_StatusBase[_0x4d49ec(0x475)][_0x4d49ec(0x1cb)]['call'](this),this[_0x4d49ec(0x1ca)]();},Window_BattleStatus['prototype'][_0x19a075(0x2b5)]=function(){const _0x442e07=_0x19a075;this[_0x442e07(0x60a)]=new Sprite(),this[_0x442e07(0x60a)][_0x442e07(0x3e1)]=[new PIXI[(_0x442e07(0x3e1))][(_0x442e07(0x8ae))]()],this['_cursorArea'][_0x442e07(0x55c)]=new Rectangle(),this[_0x442e07(0x60a)][_0x442e07(0x4bf)](this[_0x442e07(0x169)],this[_0x442e07(0x169)]),this['addChild'](this[_0x442e07(0x60a)]);},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x6bf)]=function(){const _0x453df1=_0x19a075;this[_0x453df1(0x520)]=new Sprite(),this[_0x453df1(0x470)](this[_0x453df1(0x520)]);},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x1ca)]=function(){const _0x3ae38c=_0x19a075;this[_0x3ae38c(0x82d)]=new Sprite(),this[_0x3ae38c(0x470)](this[_0x3ae38c(0x82d)]);},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x199)]=function(){const _0x3cba8e=_0x19a075;this[_0x3cba8e(0x220)]=new Sprite();for(let _0x3611fb=0x0;_0x3611fb<0x9;_0x3611fb++){this[_0x3cba8e(0x220)]['addChild'](new Sprite());}this[_0x3cba8e(0x60a)][_0x3cba8e(0x470)](this['_cursorSprite']);},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x5b2)]=function(){const _0x102078=_0x19a075;Window_StatusBase[_0x102078(0x475)][_0x102078(0x5b2)]['call'](this),this[_0x102078(0x77d)]();},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x77d)]=function(){const _0x4c9c2c=_0x19a075,_0x429742=this['_padding'];this[_0x4c9c2c(0x60a)][_0x4c9c2c(0x4bf)](_0x429742,_0x429742),this[_0x4c9c2c(0x60a)]['x']=_0x429742-this[_0x4c9c2c(0x3cd)]['x'],this['_cursorArea']['y']=_0x429742-this[_0x4c9c2c(0x3cd)]['y'],this[_0x4c9c2c(0x2bb)]>0x0&&this[_0x4c9c2c(0x70c)]>0x0?this[_0x4c9c2c(0x60a)][_0x4c9c2c(0x3cc)]=this[_0x4c9c2c(0x370)]():this[_0x4c9c2c(0x60a)][_0x4c9c2c(0x3cc)]=![];},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x1df)]=function(){const _0x4b0019=_0x19a075;Window_StatusBase['prototype']['_updateFilterArea'][_0x4b0019(0x2c6)](this),this['_updateCursorFilterArea']();},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x671)]=function(){const _0x56ad15=_0x19a075,_0x2fa320=this['_cursorArea']['worldTransform'][_0x56ad15(0x8fe)](new Point(0x0,0x0)),_0x8d2cd7=this[_0x56ad15(0x60a)][_0x56ad15(0x55c)];_0x8d2cd7['x']=_0x2fa320['x']+this[_0x56ad15(0x3cd)]['x'],_0x8d2cd7['y']=_0x2fa320['y']+this[_0x56ad15(0x3cd)]['y'],_0x8d2cd7['width']=this[_0x56ad15(0x2bb)],_0x8d2cd7[_0x56ad15(0x87b)]=this[_0x56ad15(0x70c)];},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x7fe)]=function(_0x558c0f){const _0x52f336=_0x19a075;if(this[_0x52f336(0x4db)]()!==_0x52f336(0x53b))return;this['drawItemImagePortraitStyle'](_0x558c0f[_0x52f336(0x8a1)]());},Window_BattleStatus['prototype'][_0x19a075(0x7c7)]=function(_0x2d9c7f,_0x36debb){const _0x1073d2=_0x19a075;if(!this[_0x1073d2(0x82d)])return;if(!_0x2d9c7f)return;if(!_0x36debb)return;const _0x245e40=this[_0x1073d2(0x8cb)](_0x36debb[_0x1073d2(0x8a1)]());_0x245e40['x']+=_0x245e40['width']/0x2+this[_0x1073d2(0x770)],_0x2d9c7f['x']=_0x245e40['x'],_0x2d9c7f['y']=_0x245e40['y'],this['_damageContainer'][_0x1073d2(0x470)](_0x2d9c7f);},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x928)]=function(_0xcd0ac8){const _0x432ba9=_0x19a075;if(!this[_0x432ba9(0x82d)])return;if(!_0xcd0ac8)return;this['_damageContainer']['removeChild'](_0xcd0ac8);},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x5bb)]=function(){const _0x377eca=_0x19a075;if(!this[_0x377eca(0x860)]())return;if(!this['_borderPortraitSprite'])this[_0x377eca(0x6f5)]();this['prepareBorderActor'](),this['updateBorderSprite']();},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x860)]=function(){const _0x44618f=_0x19a075;if(this[_0x44618f(0x3d5)]!==Window_BattleStatus)return![];if(!SceneManager['isSceneBattle']())return![];return VisuMZ[_0x44618f(0x73b)][_0x44618f(0x7e0)][_0x44618f(0x3a9)][_0x44618f(0x288)];},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x6f5)]=function(){const _0x420fbd=_0x19a075;this[_0x420fbd(0x28b)]=new Sprite();const _0x2b8a57=SceneManager[_0x420fbd(0x3a8)],_0x10c8fc=_0x2b8a57[_0x420fbd(0x1e2)][_0x420fbd(0x93c)](_0x2b8a57['_windowLayer']);_0x2b8a57[_0x420fbd(0x22b)](this[_0x420fbd(0x28b)],_0x10c8fc),this[_0x420fbd(0x28b)][_0x420fbd(0x49e)]['x']=0.5,this['_borderPortraitSprite'][_0x420fbd(0x49e)]['y']=0x1;const _0xea45ab=VisuMZ[_0x420fbd(0x73b)][_0x420fbd(0x7e0)]['BattleLayout']['PortraitScaleBorderStyle'];this[_0x420fbd(0x28b)][_0x420fbd(0x70f)]['x']=_0xea45ab,this['_borderPortraitSprite']['scale']['y']=_0xea45ab,this[_0x420fbd(0x28b)]['y']=this['y']+this[_0x420fbd(0x87b)],this[_0x420fbd(0x415)]=0x0;},Window_BattleStatus['prototype'][_0x19a075(0x454)]=function(){const _0x4e8be2=_0x19a075;this[_0x4e8be2(0x28b)][_0x4e8be2(0x3cc)]=BattleManager[_0x4e8be2(0x405)]();const _0xf2021e=BattleManager[_0x4e8be2(0x4c9)]();if(_0xf2021e===this[_0x4e8be2(0x28b)]['actor'])return;this[_0x4e8be2(0x28b)]['actor']=_0xf2021e||this['_borderPortraitSprite'][_0x4e8be2(0x4c9)];if(!_0xf2021e)return;else{if(_0xf2021e[_0x4e8be2(0x20e)]()===''){this[_0x4e8be2(0x28b)][_0x4e8be2(0x3ff)]=ImageManager[_0x4e8be2(0x7a4)];return;}else{const _0x3e1102=ImageManager[_0x4e8be2(0x90f)](_0xf2021e[_0x4e8be2(0x20e)]());_0x3e1102['addLoadListener'](this[_0x4e8be2(0x2ea)][_0x4e8be2(0x3fd)](this,_0x3e1102));}}},Window_BattleStatus['prototype'][_0x19a075(0x2ea)]=function(_0x647c32){const _0x3f7953=_0x19a075;this[_0x3f7953(0x415)]=0x14,this[_0x3f7953(0x28b)][_0x3f7953(0x3ff)]=_0x647c32;SceneManager[_0x3f7953(0x3a8)][_0x3f7953(0x4b4)]()?(this[_0x3f7953(0x28b)]['x']=0x0,this[_0x3f7953(0x561)]=Math[_0x3f7953(0x312)](_0x647c32[_0x3f7953(0x594)]/0x2)):(this[_0x3f7953(0x28b)]['x']=this[_0x3f7953(0x594)],this[_0x3f7953(0x561)]=this[_0x3f7953(0x594)]*0x3/0x4);this['_borderPortraitSprite'][_0x3f7953(0x50f)]=0x0,this[_0x3f7953(0x28b)]['y']=this['y']+this[_0x3f7953(0x87b)];const _0x35a760=BattleManager['actor']();_0x35a760&&(this[_0x3f7953(0x561)]+=_0x35a760[_0x3f7953(0x7bd)](),this[_0x3f7953(0x28b)]['y']+=_0x35a760['getBattlePortraitOffsetY']());},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x754)]=function(){const _0x2cbb3c=_0x19a075;if(this[_0x2cbb3c(0x415)]>0x0){const _0x327327=this[_0x2cbb3c(0x415)],_0x86001a=this['_borderPortraitSprite'];_0x86001a['x']=(_0x86001a['x']*(_0x327327-0x1)+this[_0x2cbb3c(0x561)])/_0x327327,_0x86001a[_0x2cbb3c(0x50f)]=(_0x86001a[_0x2cbb3c(0x50f)]*(_0x327327-0x1)+0xff)/_0x327327,this[_0x2cbb3c(0x415)]--;}},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x908)]=function(){const _0x4d2964=_0x19a075;return;this['_effectsContainer']&&(this[_0x4d2964(0x520)]['x']=this['x'],this[_0x4d2964(0x520)]['y']=this['y']),this['_damageContainer']&&(this[_0x4d2964(0x82d)]['x']=this['x'],this['_damageContainer']['y']=this['y']);},Window_BattleStatus[_0x19a075(0x475)][_0x19a075(0x81d)]=function(){const _0x30d90a=_0x19a075,_0x30fed0=VisuMZ[_0x30d90a(0x73b)][_0x30d90a(0x7e0)][_0x30d90a(0x3a9)];if(_0x30fed0['StatusWindowAttachmentBack']){const _0x3ee5be=new Sprite();_0x3ee5be['bitmap']=ImageManager[_0x30d90a(0x54a)](_0x30fed0[_0x30d90a(0x381)]),_0x3ee5be['x']=_0x30fed0[_0x30d90a(0x211)]||0x0,_0x3ee5be['y']=_0x30fed0[_0x30d90a(0x7ff)]||0x0,this[_0x30d90a(0x55e)](_0x3ee5be),this[_0x30d90a(0x58a)]=_0x3ee5be;}if(_0x30fed0['StatusWindowAttachmentFront']){const _0x36ac0d=new Sprite();_0x36ac0d['bitmap']=ImageManager['loadSystem'](_0x30fed0[_0x30d90a(0x8de)]),_0x36ac0d['x']=_0x30fed0[_0x30d90a(0x32f)]||0x0,_0x36ac0d['y']=_0x30fed0['StatusWindowAttachmentFrontOffsetY']||0x0,this[_0x30d90a(0x470)](_0x36ac0d),this[_0x30d90a(0x172)]=_0x36ac0d;}},Window_BattleStatus['prototype'][_0x19a075(0x2fa)]=function(){const _0x20ee30=_0x19a075;this[_0x20ee30(0x172)]&&this[_0x20ee30(0x470)](this['_frontAttachmentSprite']);},Window_BattleActor['prototype'][_0x19a075(0x2d4)]=function(){const _0x917fa6=_0x19a075;return Window_BattleStatus[_0x917fa6(0x475)]['isOkEnabled'][_0x917fa6(0x2c6)](this)&&this['isActionSelectionValid']();},Window_BattleActor[_0x19a075(0x475)][_0x19a075(0x5e6)]=function(){const _0x252022=_0x19a075,_0x1fbbf4=BattleManager[_0x252022(0x33f)](),_0x3f7b85=this['actor'](this[_0x252022(0x8a1)]());if(!_0x1fbbf4)return!![];if(!_0x1fbbf4[_0x252022(0x7ac)]())return!![];const _0x4068bf=_0x1fbbf4[_0x252022(0x7ac)]()['note'];if(_0x4068bf['match'](/<CANNOT TARGET (?:USER|SELF)>/i)){if(_0x3f7b85===BattleManager[_0x252022(0x4c9)]())return![];}return!![];},VisuMZ['BattleCore'][_0x19a075(0x92c)]=Window_BattleEnemy[_0x19a075(0x475)]['initialize'],Window_BattleEnemy[_0x19a075(0x475)][_0x19a075(0x2a0)]=function(_0x134209){const _0xc78f8a=_0x19a075;this[_0xc78f8a(0x37f)]=null,VisuMZ[_0xc78f8a(0x73b)][_0xc78f8a(0x92c)][_0xc78f8a(0x2c6)](this,_0x134209);},Window_BattleEnemy[_0x19a075(0x475)][_0x19a075(0x816)]=function(){const _0x367e19=_0x19a075;return this[_0x367e19(0x416)]();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x90e)]=Window_BattleEnemy[_0x19a075(0x475)]['show'],Window_BattleEnemy['prototype'][_0x19a075(0x51b)]=function(){const _0x52fc1c=_0x19a075;VisuMZ[_0x52fc1c(0x73b)][_0x52fc1c(0x90e)][_0x52fc1c(0x2c6)](this),this['y']=Graphics[_0x52fc1c(0x87b)]*0xa;},Window_BattleEnemy[_0x19a075(0x475)][_0x19a075(0x591)]=function(){const _0xf47b41=_0x19a075;return $gameTroop[_0xf47b41(0x1ee)]()['slice'](0x0);},Window_BattleEnemy[_0x19a075(0x475)][_0x19a075(0x42f)]=function(){const _0x8b61e6=_0x19a075;this[_0x8b61e6(0x8ce)]=this[_0x8b61e6(0x591)](),this[_0x8b61e6(0x6d5)](),Window_Selectable[_0x8b61e6(0x475)][_0x8b61e6(0x42f)]['call'](this);},Window_BattleEnemy[_0x19a075(0x475)][_0x19a075(0x6d5)]=function(){const _0x17c2a1=_0x19a075;this[_0x17c2a1(0x8ce)][_0x17c2a1(0x882)]((_0x3f3c00,_0x2c5f42)=>{const _0x1ab243=_0x17c2a1;return _0x3f3c00['battler']()[_0x1ab243(0x5dc)]===_0x2c5f42[_0x1ab243(0x612)]()['_baseX']?_0x3f3c00[_0x1ab243(0x612)]()[_0x1ab243(0x6b6)]-_0x2c5f42[_0x1ab243(0x612)]()[_0x1ab243(0x6b6)]:_0x3f3c00[_0x1ab243(0x612)]()[_0x1ab243(0x5dc)]-_0x2c5f42['battler']()[_0x1ab243(0x5dc)];}),SceneManager['isBattleFlipped']()&&this[_0x17c2a1(0x8ce)][_0x17c2a1(0x7bb)]();},Window_BattleEnemy[_0x19a075(0x475)][_0x19a075(0x70b)]=function(){const _0x532eb0=_0x19a075,_0x2234c8=VisuMZ['BattleCore'][_0x532eb0(0x7e0)][_0x532eb0(0x343)];_0x2234c8[_0x532eb0(0x316)]?this[_0x532eb0(0x3bf)]():this['autoSelectPriority']();},Window_BattleEnemy[_0x19a075(0x475)]['autoSelectLastSelected']=function(){const _0x598a96=_0x19a075;if(this[_0x598a96(0x37f)]&&this[_0x598a96(0x8ce)][_0x598a96(0x5d5)](this[_0x598a96(0x37f)])){const _0x3ffdb6=this[_0x598a96(0x8ce)][_0x598a96(0x93c)](this[_0x598a96(0x37f)]);this[_0x598a96(0x40a)](_0x3ffdb6);}else this['autoSelectPriority']();},Window_BattleEnemy[_0x19a075(0x475)][_0x19a075(0x33b)]=function(){const _0x1aa3d8=_0x19a075,_0x4b015b=VisuMZ[_0x1aa3d8(0x73b)][_0x1aa3d8(0x7e0)]['Enemy'];let _0x1b073a=![];$gameSystem[_0x1aa3d8(0x50c)]()?_0x1b073a=_0x4b015b[_0x1aa3d8(0x6fc)]:_0x1b073a=_0x4b015b[_0x1aa3d8(0x21b)],this[_0x1aa3d8(0x40a)](_0x1b073a?this[_0x1aa3d8(0x416)]()-0x1:0x0);},Window_BattleEnemy[_0x19a075(0x475)][_0x19a075(0x1c4)]=function(){const _0x5c540d=_0x19a075;Window_Selectable[_0x5c540d(0x475)]['callOkHandler'][_0x5c540d(0x2c6)](this),this['_lastEnemy']=this[_0x5c540d(0x887)]();},Window_BattleItem[_0x19a075(0x475)][_0x19a075(0x5d5)]=function(_0x4ba994){const _0x41be05=_0x19a075;if(!_0x4ba994)return![];return _0x4ba994[_0x41be05(0x19f)]===0x0||_0x4ba994['occasion']===0x1;};function Window_AutoBattleCancel(){const _0x1e9fb2=_0x19a075;this[_0x1e9fb2(0x2a0)](...arguments);}Window_AutoBattleCancel[_0x19a075(0x475)]=Object[_0x19a075(0x6d2)](Window_Base['prototype']),Window_AutoBattleCancel[_0x19a075(0x475)][_0x19a075(0x3d5)]=Window_AutoBattleCancel,Window_AutoBattleCancel[_0x19a075(0x475)]['initialize']=function(_0x120c89){const _0x4edc6e=_0x19a075;Window_Base[_0x4edc6e(0x475)][_0x4edc6e(0x2a0)][_0x4edc6e(0x2c6)](this,_0x120c89),this[_0x4edc6e(0x716)](this[_0x4edc6e(0x6a9)]()),this['refresh']();},Window_AutoBattleCancel[_0x19a075(0x475)]['bgType']=function(){const _0x55c7b8=_0x19a075;return VisuMZ[_0x55c7b8(0x73b)][_0x55c7b8(0x7e0)]['AutoBattle'][_0x55c7b8(0x705)];},Window_AutoBattleCancel[_0x19a075(0x475)][_0x19a075(0x42f)]=function(){const _0x2f9754=_0x19a075;this['contents'][_0x2f9754(0x2e7)]();const _0x27c72a=VisuMZ['BattleCore']['Settings'][_0x2f9754(0x6a8)]['AutoBattleMsg'],_0x346f57=_0x27c72a[_0x2f9754(0x732)](this[_0x2f9754(0x486)](),this[_0x2f9754(0x72d)]()),_0x3faee7=this['textSizeEx'](_0x346f57)['width'],_0x531c2d=Math[_0x2f9754(0x1ec)]((this[_0x2f9754(0x2bb)]-_0x3faee7)/0x2);this[_0x2f9754(0x38a)](_0x346f57,_0x531c2d,0x0,_0x3faee7);},Window_AutoBattleCancel[_0x19a075(0x475)][_0x19a075(0x486)]=function(){const _0x4970a0=_0x19a075;return Imported[_0x4970a0(0x7b7)]?TextManager[_0x4970a0(0x1e0)]('ok'):VisuMZ['BattleCore'][_0x4970a0(0x7e0)][_0x4970a0(0x6a8)][_0x4970a0(0x24f)];},Window_AutoBattleCancel[_0x19a075(0x475)][_0x19a075(0x72d)]=function(){const _0x3ef006=_0x19a075;return Imported[_0x3ef006(0x7b7)]?TextManager[_0x3ef006(0x1e0)](_0x3ef006(0x67e)):VisuMZ[_0x3ef006(0x73b)][_0x3ef006(0x7e0)][_0x3ef006(0x6a8)][_0x3ef006(0x266)];},Window_AutoBattleCancel[_0x19a075(0x475)][_0x19a075(0x8cf)]=function(){const _0x5985cc=_0x19a075;Window_Base[_0x5985cc(0x475)]['update'][_0x5985cc(0x2c6)](this),this[_0x5985cc(0x194)](),this[_0x5985cc(0x780)]();},Window_AutoBattleCancel[_0x19a075(0x475)][_0x19a075(0x194)]=function(){const _0x2070d1=_0x19a075;this['visible']=BattleManager[_0x2070d1(0x1fa)];},Window_AutoBattleCancel[_0x19a075(0x475)][_0x19a075(0x780)]=function(){const _0xb253ab=_0x19a075;if(!BattleManager[_0xb253ab(0x1fa)])return;(Input['isTriggered']('ok')||Input[_0xb253ab(0x6c7)](_0xb253ab(0x67e))||TouchInput[_0xb253ab(0x5e3)]()||TouchInput['isCancelled']())&&(SoundManager['playCancel'](),BattleManager['_autoBattle']=![],Input[_0xb253ab(0x2e7)](),TouchInput[_0xb253ab(0x2e7)]());};function Window_EnemyName(){this['initialize'](...arguments);}Window_EnemyName[_0x19a075(0x475)]=Object[_0x19a075(0x6d2)](Window_StatusBase['prototype']),Window_EnemyName['prototype']['constructor']=Window_EnemyName,Window_EnemyName[_0x19a075(0x475)][_0x19a075(0x2a0)]=function(_0x23c0fc){const _0x222299=_0x19a075;this[_0x222299(0x890)]=_0x23c0fc,this[_0x222299(0x361)]='';const _0x55b45a=new Rectangle(0x0,0x0,Graphics[_0x222299(0x256)],this['lineHeight']()*0x4);Window_StatusBase[_0x222299(0x475)][_0x222299(0x2a0)][_0x222299(0x2c6)](this,_0x55b45a),this[_0x222299(0x716)](0x2),this[_0x222299(0x254)]=0x0;},Window_EnemyName[_0x19a075(0x475)][_0x19a075(0x8ac)]=function(){const _0x4226f4=_0x19a075;this[_0x4226f4(0x770)]=0x0;},Window_EnemyName['prototype'][_0x19a075(0x887)]=function(){const _0x16d48b=_0x19a075;return $gameTroop[_0x16d48b(0x3e2)]()[this[_0x16d48b(0x890)]];},Window_EnemyName[_0x19a075(0x475)]['update']=function(){const _0x49731c=_0x19a075;Window_StatusBase['prototype'][_0x49731c(0x8cf)][_0x49731c(0x2c6)](this),this[_0x49731c(0x887)]()&&this[_0x49731c(0x887)]()[_0x49731c(0x880)]()!==this[_0x49731c(0x361)]&&(this[_0x49731c(0x361)]=this['enemy']()[_0x49731c(0x880)](),this[_0x49731c(0x42f)]()),this[_0x49731c(0x799)](),this[_0x49731c(0x8ef)]();},Window_EnemyName['prototype'][_0x19a075(0x799)]=function(){const _0x353b27=_0x19a075;if(!this[_0x353b27(0x887)]()){if(this[_0x353b27(0x254)]>0x0)this[_0x353b27(0x254)]-=0x10;}else{if(this[_0x353b27(0x887)]()[_0x353b27(0x64f)]()){if(this['contentsOpacity']>0x0)this[_0x353b27(0x254)]-=0x10;}else{if(SceneManager[_0x353b27(0x3a8)][_0x353b27(0x52c)]&&SceneManager[_0x353b27(0x3a8)][_0x353b27(0x52c)][_0x353b27(0x29f)]&&SceneManager[_0x353b27(0x3a8)]['_enemyWindow'][_0x353b27(0x8ce)][_0x353b27(0x5d5)](this['enemy']())){if(this[_0x353b27(0x254)]<0xff)this['contentsOpacity']+=0x10;}else this[_0x353b27(0x254)]>0x0&&(this['contentsOpacity']-=0x10);}}},Window_EnemyName[_0x19a075(0x475)][_0x19a075(0x8ef)]=function(){const _0x5213a0=_0x19a075;if(!this[_0x5213a0(0x887)]())return;SceneManager[_0x5213a0(0x7d3)]()?this['x']=Graphics[_0x5213a0(0x256)]-this[_0x5213a0(0x887)]()[_0x5213a0(0x612)]()[_0x5213a0(0x5dc)]:this['x']=this[_0x5213a0(0x887)]()[_0x5213a0(0x612)]()['_baseX'];this['x']-=Math[_0x5213a0(0x48a)](this['width']/0x2),this['y']=this['enemy']()[_0x5213a0(0x612)]()[_0x5213a0(0x6b6)]-Math['round'](this[_0x5213a0(0x1f3)]()*1.5);const _0x1a9bf0=VisuMZ[_0x5213a0(0x73b)][_0x5213a0(0x7e0)]['Enemy'];this['x']+=_0x1a9bf0[_0x5213a0(0x735)]||0x0,this['y']+=_0x1a9bf0[_0x5213a0(0x931)]||0x0;},Window_EnemyName[_0x19a075(0x475)][_0x19a075(0x6a5)]=function(){const _0x67b8c2=_0x19a075;Window_Base[_0x67b8c2(0x475)][_0x67b8c2(0x6a5)][_0x67b8c2(0x2c6)](this),this[_0x67b8c2(0x1d9)][_0x67b8c2(0x7d2)]=VisuMZ['BattleCore']['Settings']['Enemy'][_0x67b8c2(0x755)];},Window_EnemyName[_0x19a075(0x475)][_0x19a075(0x42f)]=function(){const _0xcfc47a=_0x19a075;Window_StatusBase[_0xcfc47a(0x475)]['refresh']['call'](this),this[_0xcfc47a(0x1d9)][_0xcfc47a(0x2e7)]();if(!this[_0xcfc47a(0x887)]())return;this[_0xcfc47a(0x409)]();},Window_EnemyName[_0x19a075(0x475)][_0x19a075(0x409)]=function(){const _0x20a2b9=_0x19a075;this['_text']=this[_0x20a2b9(0x887)]()['name']();const _0x55ac3c=this['textSizeEx'](this[_0x20a2b9(0x361)])['width'],_0x579562=Math[_0x20a2b9(0x48a)]((this[_0x20a2b9(0x2bb)]-_0x55ac3c)/0x2);this[_0x20a2b9(0x38a)](this['_text'],_0x579562,0x0,_0x55ac3c+0x8);},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x620)]=function(){const _0x4c7005=_0x19a075;return VisuMZ[_0x4c7005(0x73b)][_0x4c7005(0x7e0)]['BattleLog']['MaxLines'];},Window_BattleLog['prototype']['messageSpeed']=function(){const _0x235a32=_0x19a075;return VisuMZ[_0x235a32(0x73b)][_0x235a32(0x7e0)][_0x235a32(0x5b6)][_0x235a32(0x593)];},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x463)]=function(){const _0x526fe3=_0x19a075;return VisuMZ[_0x526fe3(0x73b)]['Settings'][_0x526fe3(0x5b6)][_0x526fe3(0x28d)];},Window_BattleLog['prototype'][_0x19a075(0x889)]=function(){return![];},Window_BattleLog['prototype'][_0x19a075(0x43c)]=function(_0x1ab876,_0x469f8){const _0x268c68=_0x19a075;this[_0x268c68(0x3a7)](_0x268c68(0x78a)),BattleManager[_0x268c68(0x369)](_0x1ab876,_0x469f8),this['callNextMethod']();},Window_BattleLog['prototype'][_0x19a075(0x78a)]=function(){const _0x3370cc=_0x19a075;this[_0x3370cc(0x3b4)]();},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x7cc)]=function(_0x4e9d17){const _0x4a50dd=_0x19a075,_0x125c65=Array[_0x4a50dd(0x475)][_0x4a50dd(0x484)][_0x4a50dd(0x2c6)](arguments,0x1),_0x185c85={'name':_0x4e9d17,'params':_0x125c65},_0x5509df=this[_0x4a50dd(0x6e4)][_0x4a50dd(0x4be)](_0x528075=>_0x528075[_0x4a50dd(0x880)])[_0x4a50dd(0x93c)](_0x4a50dd(0x78a));_0x5509df>=0x0?this['_methods'][_0x4a50dd(0x333)](_0x5509df,0x0,_0x185c85):this[_0x4a50dd(0x6e4)]['push'](_0x185c85);},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x3a7)]=function(_0x3ddb9b){const _0x17f34e=_0x19a075,_0x458539=Array[_0x17f34e(0x475)][_0x17f34e(0x484)]['call'](arguments,0x1);this[_0x17f34e(0x6e4)][_0x17f34e(0x3a7)]({'name':_0x3ddb9b,'params':_0x458539});},Window_BattleLog[_0x19a075(0x475)]['logActionList']=function(){const _0x2e8f14=_0x19a075;if(!$gameTemp[_0x2e8f14(0x5b8)]())return;console[_0x2e8f14(0x602)](this[_0x2e8f14(0x6e4)][_0x2e8f14(0x4be)](_0x3dc583=>_0x3dc583[_0x2e8f14(0x880)])['join']('\x0a'));},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x94d)]=Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x42f)],Window_BattleLog['prototype']['refresh']=function(){const _0x9a4701=_0x19a075;this[_0x9a4701(0x6c2)]=!![];},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x8dc)]=Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x8cf)],Window_BattleLog[_0x19a075(0x475)]['update']=function(){const _0x572bbc=_0x19a075;VisuMZ[_0x572bbc(0x73b)][_0x572bbc(0x8dc)][_0x572bbc(0x2c6)](this);if(this[_0x572bbc(0x6c2)])this['processRefresh']();},Window_BattleLog['prototype']['processRefresh']=function(){const _0x3c6a1a=_0x19a075;this[_0x3c6a1a(0x6c2)]=![],VisuMZ['BattleCore']['Window_BattleLog_refresh'][_0x3c6a1a(0x2c6)](this);},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x2f9)]=function(_0x587759){const _0x4b93a8=_0x19a075;let _0xc106bc=VisuMZ[_0x4b93a8(0x73b)][_0x4b93a8(0x7e0)]['BattleLog'][_0x4b93a8(0x16e)][_0x4b93a8(0x4d9)]()['trim'](),_0x12241e=this[_0x4b93a8(0x1a6)][_0x587759];if(_0x12241e[_0x4b93a8(0x6c8)](/<LEFT>/i))_0xc106bc=_0x4b93a8(0x53c);else{if(_0x12241e[_0x4b93a8(0x6c8)](/<CENTER>/i))_0xc106bc='center';else _0x12241e[_0x4b93a8(0x6c8)](/<RIGHT>/i)&&(_0xc106bc=_0x4b93a8(0x7e3));}_0x12241e=_0x12241e[_0x4b93a8(0x89a)](/<(?:LEFT|CENTER|RIGHT)>/gi,''),_0x12241e=_0x12241e['replace'](/\\I\[0\]/gi,'');const _0x33a730=this[_0x4b93a8(0x74c)](_0x587759);this[_0x4b93a8(0x1d9)][_0x4b93a8(0x932)](_0x33a730['x'],_0x33a730['y'],_0x33a730[_0x4b93a8(0x594)],_0x33a730[_0x4b93a8(0x87b)]);const _0x22e752=this['textSizeEx'](_0x12241e)['width'];let _0x5263b3=_0x33a730['x'];if(_0xc106bc===_0x4b93a8(0x268))_0x5263b3+=(_0x33a730[_0x4b93a8(0x594)]-_0x22e752)/0x2;else _0xc106bc===_0x4b93a8(0x7e3)&&(_0x5263b3+=_0x33a730[_0x4b93a8(0x594)]-_0x22e752);this['drawTextEx'](_0x12241e,_0x5263b3,_0x33a730['y'],_0x22e752+0x8);},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x7f8)]=function(_0x248856){const _0x471770=_0x19a075;this[_0x471770(0x1a6)][_0x471770(0x7cc)](_0x248856),this[_0x471770(0x42f)](),this[_0x471770(0x3b4)]();},Window_BattleLog[_0x19a075(0x475)]['updateWaitMode']=function(){const _0x4b67fd=_0x19a075;let _0x5ee7f6=![];switch(this[_0x4b67fd(0x758)]){case'effect':_0x5ee7f6=this[_0x4b67fd(0x525)]['isEffecting']();break;case'movement':_0x5ee7f6=this['_spriteset'][_0x4b67fd(0x83e)]();break;case'animation':_0x5ee7f6=this[_0x4b67fd(0x525)][_0x4b67fd(0x8f8)]();break;case _0x4b67fd(0x365):_0x5ee7f6=this['_spriteset'][_0x4b67fd(0x328)]();break;case _0x4b67fd(0x64d):_0x5ee7f6=this[_0x4b67fd(0x525)][_0x4b67fd(0x849)]();break;case _0x4b67fd(0x50f):_0x5ee7f6=this[_0x4b67fd(0x525)][_0x4b67fd(0x6e5)]();break;}return!_0x5ee7f6&&(this[_0x4b67fd(0x758)]=''),_0x5ee7f6;},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x2f5)]=function(){const _0x20140d=_0x19a075;this[_0x20140d(0x938)]('animation');},Window_BattleLog['prototype'][_0x19a075(0x5e7)]=function(){const _0x14ecfb=_0x19a075;this[_0x14ecfb(0x938)](_0x14ecfb(0x365));},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x341)]=function(){const _0xfa23c7=_0x19a075;this[_0xfa23c7(0x938)](_0xfa23c7(0x64d));},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x767)]=function(){const _0x21e493=_0x19a075;this[_0x21e493(0x938)](_0x21e493(0x50f));},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x936)]=function(){const _0x5bc4f5=_0x19a075,_0x52aa7e=VisuMZ[_0x5bc4f5(0x73b)][_0x5bc4f5(0x7e0)][_0x5bc4f5(0x5b6)];if(!_0x52aa7e[_0x5bc4f5(0x91d)])return;this[_0x5bc4f5(0x7cc)](_0x5bc4f5(0x7f8),_0x52aa7e['StartTurnMsg'][_0x5bc4f5(0x732)]($gameTroop[_0x5bc4f5(0x585)]())),this['push'](_0x5bc4f5(0x299),_0x52aa7e[_0x5bc4f5(0x4f5)]),this[_0x5bc4f5(0x7cc)]('clear');},Window_BattleLog['prototype'][_0x19a075(0x704)]=function(_0x2bbe11,_0x551822,_0x573ec6){const _0x11b02c=_0x19a075;this[_0x11b02c(0x8c9)](_0x551822)?BattleManager[_0x11b02c(0x1a0)]():this[_0x11b02c(0x3a5)](_0x2bbe11,_0x551822,_0x573ec6);},Window_BattleLog[_0x19a075(0x475)]['isCustomActionSequence']=function(_0x56ebfb){const _0x50b0fe=_0x19a075;if(!SceneManager['isSceneBattle']())return![];if(!_0x56ebfb)return![];if(!_0x56ebfb[_0x50b0fe(0x7ac)]())return![];if(_0x56ebfb[_0x50b0fe(0x7ac)]()['note'][_0x50b0fe(0x6c8)](/<CUSTOM ACTION SEQUENCE>/i))return!![];if(DataManager['checkAutoCustomActionSequenceNotetagEffect'](_0x56ebfb[_0x50b0fe(0x7ac)]()))return!![];return![];},Window_BattleLog['prototype'][_0x19a075(0x3a5)]=function(_0x286b20,_0x2c2ae4,_0x327337){const _0x49e2fe=_0x19a075,_0x21fbc4=_0x2c2ae4[_0x49e2fe(0x7ac)]();this[_0x49e2fe(0x5f2)](_0x286b20,_0x2c2ae4,_0x327337),this[_0x49e2fe(0x450)](_0x286b20,_0x2c2ae4,_0x327337),this[_0x49e2fe(0x238)](_0x286b20,_0x2c2ae4,_0x327337);},Window_BattleLog[_0x19a075(0x475)]['displayAction']=function(_0x14cb95,_0x569622){const _0x2be4fb=_0x19a075,_0x14840f=VisuMZ[_0x2be4fb(0x73b)][_0x2be4fb(0x7e0)][_0x2be4fb(0x5b6)];_0x14840f[_0x2be4fb(0x7fc)]&&this[_0x2be4fb(0x7cc)](_0x2be4fb(0x7f8),'<CENTER>%1'[_0x2be4fb(0x732)](DataManager[_0x2be4fb(0x6ff)](_0x569622)));if(DataManager[_0x2be4fb(0x31e)](_0x569622)){if(_0x14840f[_0x2be4fb(0x2b0)])this['displayItemMessage'](_0x569622['message1'],_0x14cb95,_0x569622);if(_0x14840f[_0x2be4fb(0x419)])this[_0x2be4fb(0x699)](_0x569622['message2'],_0x14cb95,_0x569622);}else{if(_0x14840f[_0x2be4fb(0x1dc)])this['displayItemMessage'](TextManager[_0x2be4fb(0x204)],_0x14cb95,_0x569622);}},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x5f2)]=function(_0x4c34e1,_0x46846e,_0x8b6a44){const _0x288980=_0x19a075,_0x358d51=_0x46846e[_0x288980(0x7ac)]();this[_0x288980(0x737)](_0x4c34e1,_0x358d51),this[_0x288980(0x7cc)](_0x288980(0x290),_0x4c34e1,_0x8b6a44,!![]),this['push'](_0x288980(0x226),_0x4c34e1,_0x46846e),this[_0x288980(0x7cc)](_0x288980(0x2ca)),this[_0x288980(0x7cc)](_0x288980(0x702),_0x4c34e1,_0x46846e),this[_0x288980(0x7cc)](_0x288980(0x2f5));},Window_BattleLog[_0x19a075(0x475)]['createEffectActionSet']=function(_0x4036cd,_0x3170cc,_0x20b71b){const _0x2a5c92=_0x19a075;if(this['isMeleeSingleTargetAction'](_0x3170cc))this[_0x2a5c92(0x711)](_0x4036cd,_0x3170cc,_0x20b71b);else{if(this[_0x2a5c92(0x39a)](_0x3170cc))this[_0x2a5c92(0x614)](_0x4036cd,_0x3170cc,_0x20b71b);else _0x3170cc[_0x2a5c92(0x5bc)]()?this[_0x2a5c92(0x518)](_0x4036cd,_0x3170cc,_0x20b71b):this[_0x2a5c92(0x3ab)](_0x4036cd,_0x3170cc,_0x20b71b);}},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x81c)]=function(_0x54d6b0){const _0x24569d=_0x19a075;if(!_0x54d6b0['isPhysical']())return![];if(!_0x54d6b0[_0x24569d(0x6f3)]())return![];if(!_0x54d6b0[_0x24569d(0x313)]())return![];return VisuMZ['BattleCore']['Settings']['ActionSequence']['AutoMeleeSolo'];},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x711)]=function(_0x4366c1,_0x1c9048,_0x31f396){const _0x1adcb8=_0x19a075,_0x112ebf=_0x4366c1['getAttackMotion']()[_0x1adcb8(0x74d)]<0x2,_0xaab546=0x14,_0x6a4952=0x30;_0x112ebf&&(this[_0x1adcb8(0x7cc)]('performJump',[_0x4366c1],_0x6a4952,_0xaab546),this[_0x1adcb8(0x7cc)]('performMoveToTargets',_0x4366c1,_0x31f396,_0x1adcb8(0x898),_0xaab546,!![],_0x1adcb8(0x36a),!![]),this['push'](_0x1adcb8(0x68d),[_0x4366c1],'walk'),this['push'](_0x1adcb8(0x2ca)));let _0x4f1560=_0x1c9048['isAttack']()?this[_0x1adcb8(0x94f)](_0x4366c1):0x1;for(let _0x5b5654=0x0;_0x5b5654<_0x4f1560;_0x5b5654++){_0x1c9048['isAttack']()&&_0x4366c1[_0x1adcb8(0x34c)]()&&this['push'](_0x1adcb8(0x686),_0x4366c1,_0x5b5654),_0x1c9048['item']()[_0x1adcb8(0x62f)]<0x0?this[_0x1adcb8(0x518)](_0x4366c1,_0x1c9048,_0x31f396):this[_0x1adcb8(0x3ab)](_0x4366c1,_0x1c9048,_0x31f396);}_0x1c9048[_0x1adcb8(0x184)]()&&_0x4366c1['isActor']()&&this[_0x1adcb8(0x7cc)](_0x1adcb8(0x5f8),_0x4366c1);this[_0x1adcb8(0x7cc)](_0x1adcb8(0x290),_0x4366c1,_0x31f396,![]);if(_0x112ebf){const _0x125c30=_0x4366c1[_0x1adcb8(0x612)]();this[_0x1adcb8(0x7cc)](_0x1adcb8(0x1ff),[_0x4366c1],_0x6a4952,_0xaab546),this[_0x1adcb8(0x7cc)](_0x1adcb8(0x8bb),_0x4366c1,_0x125c30[_0x1adcb8(0x744)],_0x125c30[_0x1adcb8(0x90a)],_0xaab546,![],'Linear'),this[_0x1adcb8(0x7cc)](_0x1adcb8(0x68d),[_0x4366c1],'evade'),this[_0x1adcb8(0x7cc)](_0x1adcb8(0x2ca)),this['push'](_0x1adcb8(0x68d),[_0x4366c1],_0x1adcb8(0x24b));}},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x39a)]=function(_0x125645){const _0x3d4558=_0x19a075;if(!_0x125645[_0x3d4558(0x2dd)]())return![];if(!_0x125645[_0x3d4558(0x92d)]())return![];if(!_0x125645['isForOpponent']())return![];return VisuMZ[_0x3d4558(0x73b)][_0x3d4558(0x7e0)][_0x3d4558(0x41b)]['AutoMeleeAoE'];},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x614)]=function(_0xc30ee7,_0x873b1b,_0x2bcd20){const _0x543a60=_0x19a075,_0x4b7629=_0xc30ee7[_0x543a60(0x6dc)]()[_0x543a60(0x74d)]<0x2,_0x4548b7=0x14,_0x56157a=0x30;_0x4b7629&&(this['push']('performJump',[_0xc30ee7],_0x56157a,_0x4548b7),this[_0x543a60(0x7cc)](_0x543a60(0x874),_0xc30ee7,_0x2bcd20,_0x543a60(0x3a6),_0x4548b7,!![],_0x543a60(0x36a),!![]),this[_0x543a60(0x7cc)]('requestMotion',[_0xc30ee7],'walk'),this[_0x543a60(0x7cc)](_0x543a60(0x2ca)));let _0x270049=_0x873b1b[_0x543a60(0x184)]()?this[_0x543a60(0x94f)](_0xc30ee7):0x1;for(let _0xf622c1=0x0;_0xf622c1<_0x270049;_0xf622c1++){_0x873b1b[_0x543a60(0x184)]()&&_0xc30ee7[_0x543a60(0x34c)]()&&this[_0x543a60(0x7cc)](_0x543a60(0x686),_0xc30ee7,_0xf622c1),this[_0x543a60(0x3ab)](_0xc30ee7,_0x873b1b,_0x2bcd20);}_0x873b1b[_0x543a60(0x184)]()&&_0xc30ee7[_0x543a60(0x34c)]()&&this[_0x543a60(0x7cc)](_0x543a60(0x5f8),_0xc30ee7);this[_0x543a60(0x7cc)](_0x543a60(0x290),_0xc30ee7,_0x2bcd20,![]);if(_0x4b7629){const _0x1ffc1f=_0xc30ee7[_0x543a60(0x612)]();this[_0x543a60(0x7cc)](_0x543a60(0x1ff),[_0xc30ee7],_0x56157a,_0x4548b7),this[_0x543a60(0x7cc)]('performMoveToPoint',_0xc30ee7,_0x1ffc1f[_0x543a60(0x744)],_0x1ffc1f[_0x543a60(0x90a)],_0x4548b7,![],_0x543a60(0x36a)),this[_0x543a60(0x7cc)]('requestMotion',[_0xc30ee7],'evade'),this['push'](_0x543a60(0x2ca)),this[_0x543a60(0x7cc)](_0x543a60(0x68d),[_0xc30ee7],_0x543a60(0x24b));}},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x518)]=function(_0x17ded9,_0x3969cc,_0x29b989){const _0x226b30=_0x19a075,_0x306561=_0x3969cc['item']();for(const _0x4afd05 of _0x29b989){if(!_0x4afd05)continue;this['push'](_0x226b30(0x645),_0x17ded9,_0x3969cc),this[_0x226b30(0x7cc)](_0x226b30(0x299),Sprite_Battler[_0x226b30(0x7f7)]),this[_0x226b30(0x7cc)](_0x226b30(0x68c),_0x17ded9,[_0x4afd05],_0x306561[_0x226b30(0x62f)]),this[_0x226b30(0x7cc)](_0x226b30(0x299),0x18),this[_0x226b30(0x7cc)](_0x226b30(0x43c),_0x17ded9,_0x4afd05);}},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x3ab)]=function(_0x577c23,_0x24c02f,_0x439132){const _0x288958=_0x19a075,_0x4fb9ce=_0x24c02f['item']();this[_0x288958(0x7cc)](_0x288958(0x645),_0x577c23,_0x24c02f),this[_0x288958(0x7cc)](_0x288958(0x299),Sprite_Battler[_0x288958(0x7f7)]),this[_0x288958(0x7cc)](_0x288958(0x68c),_0x577c23,_0x439132[_0x288958(0x7e6)](),_0x4fb9ce[_0x288958(0x62f)]),this[_0x288958(0x7cc)]('waitForAnimation');for(const _0x2ee2e3 of _0x439132){if(!_0x2ee2e3)continue;this['push'](_0x288958(0x43c),_0x577c23,_0x2ee2e3);}},Window_BattleLog['prototype']['finishActionSet']=function(_0x2ad81d,_0xf5b6fd,_0xf1d874){const _0x1468e9=_0x19a075,_0x2f7041=_0xf5b6fd['item']();this[_0x1468e9(0x7cc)](_0x1468e9(0x290),_0x2ad81d,_0xf1d874,![]),this[_0x1468e9(0x7cc)](_0x1468e9(0x924)),this[_0x1468e9(0x7cc)](_0x1468e9(0x354)),this['push'](_0x1468e9(0x2e7)),this[_0x1468e9(0x7cc)](_0x1468e9(0x7d9),_0x2ad81d),this[_0x1468e9(0x7cc)](_0x1468e9(0x2ca));},Window_BattleLog['prototype'][_0x19a075(0x56e)]=function(_0x23b27d){},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x1cf)]=Window_BattleLog['prototype'][_0x19a075(0x768)],Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x768)]=function(_0x220d87){const _0x4c1a4b=_0x19a075;if(!VisuMZ[_0x4c1a4b(0x73b)][_0x4c1a4b(0x7e0)][_0x4c1a4b(0x5b6)][_0x4c1a4b(0x646)])return;VisuMZ[_0x4c1a4b(0x73b)]['Window_BattleLog_displayCurrentState'][_0x4c1a4b(0x2c6)](this,_0x220d87);},Window_BattleLog[_0x19a075(0x475)]['displayCounter']=function(_0x4e5bad){const _0x2fdb26=_0x19a075;this[_0x2fdb26(0x7cc)]('performCounter',_0x4e5bad);VisuMZ[_0x2fdb26(0x73b)][_0x2fdb26(0x7e0)][_0x2fdb26(0x41b)][_0x2fdb26(0x734)]&&this[_0x2fdb26(0x7cc)](_0x2fdb26(0x68c),_0x4e5bad,[BattleManager[_0x2fdb26(0x886)]],-0x1);if(!VisuMZ['BattleCore'][_0x2fdb26(0x7e0)]['BattleLog'][_0x2fdb26(0x4fb)])return;this[_0x2fdb26(0x7cc)](_0x2fdb26(0x7f8),TextManager[_0x2fdb26(0x5fc)][_0x2fdb26(0x732)](_0x4e5bad[_0x2fdb26(0x880)]()));},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x802)]=function(_0x237b0a){const _0x1ac57f=_0x19a075;this[_0x1ac57f(0x7cc)](_0x1ac57f(0x6a3),_0x237b0a);if(!VisuMZ['BattleCore'][_0x1ac57f(0x7e0)][_0x1ac57f(0x5b6)][_0x1ac57f(0x925)])return;this['push']('addText',TextManager[_0x1ac57f(0x949)]['format'](_0x237b0a[_0x1ac57f(0x880)]()));},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x39d)]=function(_0x35f6ae,_0x4de697){const _0xde5662=_0x19a075;if(VisuMZ['BattleCore'][_0xde5662(0x7e0)][_0xde5662(0x41b)][_0xde5662(0x8bd)]){const _0x5a0751=_0x4de697[_0xde5662(0x7ac)]();this[_0xde5662(0x7cc)](_0xde5662(0x68c),_0x35f6ae,[_0x35f6ae],_0x5a0751[_0xde5662(0x62f)]);}},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x17a)]=function(_0x239890,_0x42efb1){const _0x277607=_0x19a075;this[_0x277607(0x7cc)](_0x277607(0x24d),_0x239890,_0x42efb1);if(!VisuMZ[_0x277607(0x73b)]['Settings']['BattleLog'][_0x277607(0x4d7)])return;const _0xd7c41d=_0x239890[_0x277607(0x880)](),_0xa4ffd8=TextManager[_0x277607(0x793)][_0x277607(0x732)](_0xd7c41d,_0x42efb1[_0x277607(0x880)]());this[_0x277607(0x7cc)]('addText',_0xa4ffd8);},VisuMZ['BattleCore'][_0x19a075(0x264)]=Window_BattleLog[_0x19a075(0x475)]['displayFailure'],Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x3b3)]=function(_0x263d8c){const _0x42d81f=_0x19a075;if(!VisuMZ[_0x42d81f(0x73b)][_0x42d81f(0x7e0)][_0x42d81f(0x5b6)][_0x42d81f(0x496)])return;VisuMZ[_0x42d81f(0x73b)][_0x42d81f(0x264)][_0x42d81f(0x2c6)](this,_0x263d8c);},VisuMZ['BattleCore']['Window_BattleLog_displayCritical']=Window_BattleLog[_0x19a075(0x475)]['displayCritical'],Window_BattleLog['prototype'][_0x19a075(0x16f)]=function(_0x580ddf){const _0xdc1a74=_0x19a075;if(!VisuMZ['BattleCore'][_0xdc1a74(0x7e0)][_0xdc1a74(0x5b6)][_0xdc1a74(0x434)])return;VisuMZ[_0xdc1a74(0x73b)][_0xdc1a74(0x246)]['call'](this,_0x580ddf);},VisuMZ['BattleCore']['Window_BattleLog_displayMiss']=Window_BattleLog['prototype'][_0x19a075(0x77e)],Window_BattleLog['prototype'][_0x19a075(0x77e)]=function(_0x4ff8){const _0x59e3d6=_0x19a075;!VisuMZ[_0x59e3d6(0x73b)][_0x59e3d6(0x7e0)][_0x59e3d6(0x5b6)][_0x59e3d6(0x210)]?this[_0x59e3d6(0x7cc)](_0x59e3d6(0x52a),_0x4ff8):VisuMZ['BattleCore']['Window_BattleLog_displayMiss'][_0x59e3d6(0x2c6)](this,_0x4ff8);},VisuMZ['BattleCore'][_0x19a075(0x66f)]=Window_BattleLog[_0x19a075(0x475)]['displayEvasion'],Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x32c)]=function(_0x31d674){const _0x572842=_0x19a075;!VisuMZ[_0x572842(0x73b)][_0x572842(0x7e0)][_0x572842(0x5b6)]['ShowMissEvasion']?_0x31d674[_0x572842(0x8ba)]()[_0x572842(0x909)]?this[_0x572842(0x7cc)](_0x572842(0x3db),_0x31d674):this[_0x572842(0x7cc)](_0x572842(0x26d),_0x31d674):VisuMZ[_0x572842(0x73b)][_0x572842(0x66f)]['call'](this,_0x31d674);},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x2d6)]=function(_0xd3d7ee){const _0x56935e=_0x19a075;_0xd3d7ee[_0x56935e(0x8ba)]()[_0x56935e(0x8e2)]&&(_0xd3d7ee[_0x56935e(0x8ba)]()['hpDamage']>0x0&&!_0xd3d7ee['result']()[_0x56935e(0x35c)]&&this[_0x56935e(0x7cc)](_0x56935e(0x5c4),_0xd3d7ee),_0xd3d7ee[_0x56935e(0x8ba)]()['hpDamage']<0x0&&this['push'](_0x56935e(0x776),_0xd3d7ee),VisuMZ[_0x56935e(0x73b)][_0x56935e(0x7e0)][_0x56935e(0x5b6)]['ShowHpDmg']&&this[_0x56935e(0x7cc)](_0x56935e(0x7f8),this[_0x56935e(0x42d)](_0xd3d7ee)));},VisuMZ[_0x19a075(0x73b)]['Window_BattleLog_displayMpDamage']=Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x53e)],Window_BattleLog['prototype'][_0x19a075(0x53e)]=function(_0x52fe2b){const _0x3016a4=_0x19a075;if(!VisuMZ[_0x3016a4(0x73b)][_0x3016a4(0x7e0)][_0x3016a4(0x5b6)][_0x3016a4(0x667)])return;VisuMZ[_0x3016a4(0x73b)][_0x3016a4(0x56c)]['call'](this,_0x52fe2b);},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x4dc)]=Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x6a4)],Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x6a4)]=function(_0x49ace6){const _0x58de92=_0x19a075;if(!VisuMZ[_0x58de92(0x73b)][_0x58de92(0x7e0)][_0x58de92(0x5b6)][_0x58de92(0x548)])return;VisuMZ[_0x58de92(0x73b)]['Window_BattleLog_displayTpDamage']['call'](this,_0x49ace6);},Window_BattleLog[_0x19a075(0x475)]['displayAddedStates']=function(_0x46871b){const _0x1cde53=_0x19a075,_0x330cb1=_0x46871b[_0x1cde53(0x8ba)](),_0x3127ba=_0x330cb1[_0x1cde53(0x7b8)]();for(const _0x563372 of _0x3127ba){const _0x4e1d30=_0x46871b[_0x1cde53(0x34c)]()?_0x563372[_0x1cde53(0x3e3)]:_0x563372[_0x1cde53(0x6b0)];_0x4e1d30&&VisuMZ[_0x1cde53(0x73b)][_0x1cde53(0x7e0)][_0x1cde53(0x5b6)]['ShowAddedState']&&(this['push'](_0x1cde53(0x2b6)),this[_0x1cde53(0x7cc)](_0x1cde53(0x7aa)),this[_0x1cde53(0x7cc)](_0x1cde53(0x7f8),_0x4e1d30[_0x1cde53(0x732)](_0x46871b[_0x1cde53(0x880)]())),this[_0x1cde53(0x7cc)](_0x1cde53(0x6a7))),_0x563372['id']===_0x46871b[_0x1cde53(0x39c)]()&&this[_0x1cde53(0x7cc)](_0x1cde53(0x6d9),_0x46871b);}},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x422)]=function(_0x52c762){const _0x4682d3=_0x19a075;if(!VisuMZ[_0x4682d3(0x73b)][_0x4682d3(0x7e0)][_0x4682d3(0x5b6)]['ShowRemovedState'])return;const _0x8d0a94=_0x52c762[_0x4682d3(0x8ba)](),_0x25f553=_0x8d0a94[_0x4682d3(0x359)]();for(const _0x21c86e of _0x25f553){_0x21c86e[_0x4682d3(0x5e0)]&&(this[_0x4682d3(0x7cc)]('popBaseLine'),this[_0x4682d3(0x7cc)](_0x4682d3(0x7aa)),this[_0x4682d3(0x7cc)]('addText',_0x21c86e[_0x4682d3(0x5e0)]['format'](_0x52c762['name']())),this['push']('wait'));}},Window_BattleLog['prototype'][_0x19a075(0x3c8)]=function(_0x1a5053){const _0x55731f=_0x19a075,_0xb8ae99=VisuMZ[_0x55731f(0x73b)]['Settings'][_0x55731f(0x5b6)],_0x5530bb=_0x1a5053[_0x55731f(0x8ba)]();if(_0xb8ae99[_0x55731f(0x6c9)])this[_0x55731f(0x76a)](_0x1a5053,_0x5530bb['addedBuffs'],TextManager[_0x55731f(0x840)]);if(_0xb8ae99[_0x55731f(0x657)])this['displayBuffs'](_0x1a5053,_0x5530bb[_0x55731f(0x492)],TextManager[_0x55731f(0x3c0)]);if(_0xb8ae99[_0x55731f(0x4d8)])this['displayBuffs'](_0x1a5053,_0x5530bb['removedBuffs'],TextManager[_0x55731f(0x7c8)]);},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x76a)]=function(_0x4e871d,_0x336fd4,_0x1d9365){const _0x378d43=_0x19a075;for(const _0x305f8f of _0x336fd4){const _0x513d02=_0x1d9365[_0x378d43(0x732)](_0x4e871d[_0x378d43(0x880)](),TextManager[_0x378d43(0x611)](_0x305f8f));this[_0x378d43(0x7cc)](_0x378d43(0x2b6)),this[_0x378d43(0x7cc)](_0x378d43(0x7aa)),this['push'](_0x378d43(0x7f8),_0x513d02),this[_0x378d43(0x7cc)]('wait');}},VisuMZ[_0x19a075(0x73b)]['Window_BattleLog_clear']=Window_BattleLog[_0x19a075(0x475)]['clear'],Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x2e7)]=function(){const _0x5cb617=_0x19a075;VisuMZ[_0x5cb617(0x73b)]['Window_BattleLog_clear'][_0x5cb617(0x2c6)](this),this['callNextMethod']();},VisuMZ[_0x19a075(0x73b)]['Window_BattleLog_pushBaseLine']=Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x7aa)],Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x7aa)]=function(){const _0x17ec8b=_0x19a075;VisuMZ[_0x17ec8b(0x73b)][_0x17ec8b(0x918)][_0x17ec8b(0x2c6)](this),this[_0x17ec8b(0x3b4)]();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x8ea)]=Window_BattleLog['prototype'][_0x19a075(0x2b6)],Window_BattleLog['prototype'][_0x19a075(0x2b6)]=function(){const _0x3acfc8=_0x19a075;VisuMZ[_0x3acfc8(0x73b)][_0x3acfc8(0x8ea)][_0x3acfc8(0x2c6)](this),this[_0x3acfc8(0x42f)](),this['callNextMethod']();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x3cf)]=Window_BattleLog['prototype']['popupDamage'],Window_BattleLog[_0x19a075(0x475)]['popupDamage']=function(_0x268588){const _0x3f24fa=_0x19a075;VisuMZ[_0x3f24fa(0x73b)][_0x3f24fa(0x3cf)][_0x3f24fa(0x2c6)](this,_0x268588),this['callNextMethod']();},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x924)]=function(){const _0x3f31af=_0x19a075;let _0x58c911=0x0;this[_0x3f31af(0x410)][_0x3f31af(0x644)]>0x0&&(_0x58c911=this[_0x3f31af(0x410)][this[_0x3f31af(0x410)][_0x3f31af(0x644)]-0x1]),this[_0x3f31af(0x1a6)][_0x3f31af(0x644)]>_0x58c911?this[_0x3f31af(0x6a7)]():this[_0x3f31af(0x3b4)]();},VisuMZ[_0x19a075(0x73b)]['Window_BattleLog_performActionStart']=Window_BattleLog['prototype'][_0x19a075(0x226)],Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x226)]=function(_0xfd6642,_0x116069){const _0x655f73=_0x19a075;VisuMZ[_0x655f73(0x73b)]['Window_BattleLog_performActionStart'][_0x655f73(0x2c6)](this,_0xfd6642,_0x116069),this[_0x655f73(0x3b4)]();},VisuMZ[_0x19a075(0x73b)]['Window_BattleLog_performAction']=Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x645)],Window_BattleLog['prototype']['performAction']=function(_0x4a6c02,_0x21b434){const _0x5d11d3=_0x19a075;VisuMZ[_0x5d11d3(0x73b)][_0x5d11d3(0x286)][_0x5d11d3(0x2c6)](this,_0x4a6c02,_0x21b434),this[_0x5d11d3(0x3b4)]();},VisuMZ['BattleCore'][_0x19a075(0x2cd)]=Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x7d9)],Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x7d9)]=function(_0x7edca4){const _0x1cd0e2=_0x19a075;VisuMZ[_0x1cd0e2(0x73b)][_0x1cd0e2(0x2cd)][_0x1cd0e2(0x2c6)](this,_0x7edca4);for(const _0xe3f8c of BattleManager[_0x1cd0e2(0x2d0)]()){if(!_0xe3f8c)continue;if(_0xe3f8c[_0x1cd0e2(0x64f)]())continue;_0xe3f8c[_0x1cd0e2(0x3f2)]();}this[_0x1cd0e2(0x3b4)]();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x626)]=Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x5c4)],Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x5c4)]=function(_0x57f995){const _0x3bb81f=_0x19a075;VisuMZ[_0x3bb81f(0x73b)][_0x3bb81f(0x626)][_0x3bb81f(0x2c6)](this,_0x57f995),this[_0x3bb81f(0x3b4)]();},VisuMZ['BattleCore'][_0x19a075(0x2fe)]=Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x52a)],Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x52a)]=function(_0x1c789c){const _0x40e344=_0x19a075;VisuMZ[_0x40e344(0x73b)]['Window_BattleLog_performMiss'][_0x40e344(0x2c6)](this,_0x1c789c),this['callNextMethod']();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x39b)]=Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x776)],Window_BattleLog[_0x19a075(0x475)]['performRecovery']=function(_0x1ffc03){const _0xac799b=_0x19a075;VisuMZ[_0xac799b(0x73b)]['Window_BattleLog_performRecovery'][_0xac799b(0x2c6)](this,_0x1ffc03),this['callNextMethod']();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x74e)]=Window_BattleLog[_0x19a075(0x475)]['performEvasion'],Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x3db)]=function(_0x41d33b){const _0x57f903=_0x19a075;VisuMZ[_0x57f903(0x73b)][_0x57f903(0x74e)]['call'](this,_0x41d33b),this[_0x57f903(0x3b4)]();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x173)]=Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x26d)],Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x26d)]=function(_0xb97b73){const _0x322260=_0x19a075;VisuMZ[_0x322260(0x73b)][_0x322260(0x173)][_0x322260(0x2c6)](this,_0xb97b73),this[_0x322260(0x3b4)]();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x8e1)]=Window_BattleLog[_0x19a075(0x475)]['performCounter'],Window_BattleLog[_0x19a075(0x475)]['performCounter']=function(_0x54dd19){const _0x18db5a=_0x19a075;VisuMZ[_0x18db5a(0x73b)][_0x18db5a(0x8e1)][_0x18db5a(0x2c6)](this,_0x54dd19),this[_0x18db5a(0x3b4)]();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x588)]=Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x6a3)],Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x6a3)]=function(_0x8dc8dd){const _0x2b1e23=_0x19a075;VisuMZ['BattleCore'][_0x2b1e23(0x588)]['call'](this,_0x8dc8dd),this[_0x2b1e23(0x3b4)]();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x6ea)]=Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x24d)],Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x24d)]=function(_0x27db59,_0x34e967){const _0x48c3ce=_0x19a075;VisuMZ[_0x48c3ce(0x73b)][_0x48c3ce(0x6ea)][_0x48c3ce(0x2c6)](this,_0x27db59,_0x34e967),this[_0x48c3ce(0x3b4)]();},VisuMZ[_0x19a075(0x73b)][_0x19a075(0x1f8)]=Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x6d9)],Window_BattleLog['prototype']['performCollapse']=function(_0x14dbd0){const _0x2b91dd=_0x19a075;VisuMZ[_0x2b91dd(0x73b)][_0x2b91dd(0x1f8)][_0x2b91dd(0x2c6)](this,_0x14dbd0),this['callNextMethod']();},Window_BattleLog['prototype'][_0x19a075(0x702)]=function(_0x3afbb3,_0x4a0e3b){const _0x5377e7=_0x19a075;_0x3afbb3[_0x5377e7(0x702)](_0x4a0e3b),this[_0x5377e7(0x3b4)]();},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x2db)]=function(_0x2af70c,_0x9391d5){const _0x317f63=_0x19a075,_0x1a5409=_0x2af70c[_0x317f63(0x8ff)]();_0x1a5409<=0x0?SoundManager[_0x317f63(0x1d0)]():this['showNormalAnimation'](_0x9391d5,_0x1a5409);},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x290)]=function(_0x3327de,_0x58da07,_0x2c3cd8){const _0x4fee5a=_0x19a075,_0x4de760=[_0x3327de][_0x4fee5a(0x265)](_0x58da07);for(const _0x5a1082 of _0x4de760){if(!_0x5a1082)continue;_0x5a1082[_0x4fee5a(0x300)](_0x2c3cd8);}this[_0x4fee5a(0x3b4)]();},Window_BattleLog[_0x19a075(0x475)]['waitCount']=function(_0x5ee912){const _0x3fd2e7=_0x19a075;this[_0x3fd2e7(0x63a)]=_0x5ee912;},Window_BattleLog[_0x19a075(0x475)]['requestMotion']=function(_0x2b7297,_0x4c5372){const _0x372ac2=_0x19a075;for(const _0x37d371 of _0x2b7297){if(!_0x37d371)continue;_0x37d371['requestMotion'](_0x4c5372);}this[_0x372ac2(0x3b4)]();},Window_BattleLog[_0x19a075(0x475)]['performMoveToPoint']=function(_0x344636,_0x2d81d6,_0x30b834,_0x1f7186,_0x543cfa,_0x334223){const _0x3cb236=_0x19a075;_0x344636['moveBattlerToPoint'](_0x2d81d6,_0x30b834,_0x1f7186,_0x543cfa,_0x334223,-0x1),this[_0x3cb236(0x3b4)]();},Window_BattleLog[_0x19a075(0x475)][_0x19a075(0x874)]=function(_0x4096ee,_0x3dacd0,_0x138480,_0x1e79d7,_0x1c5c35,_0x39d420,_0x232088){const _0xcbbfa=_0x19a075,_0x29c3c4=Math[_0xcbbfa(0x5cc)](..._0x3dacd0['map'](_0x43703d=>_0x43703d[_0xcbbfa(0x612)]()[_0xcbbfa(0x5dc)]-_0x43703d['battler']()[_0xcbbfa(0x739)]()/0x2)),_0x5c029a=Math['max'](..._0x3dacd0['map'](_0x356120=>_0x356120[_0xcbbfa(0x612)]()[_0xcbbfa(0x5dc)]+_0x356120[_0xcbbfa(0x612)]()[_0xcbbfa(0x739)]()/0x2)),_0xf0da36=Math['min'](..._0x3dacd0['map'](_0x383915=>_0x383915['battler']()['_baseY']-_0x383915['battler']()[_0xcbbfa(0x38e)]())),_0x20f39f=Math['max'](..._0x3dacd0[_0xcbbfa(0x4be)](_0x30cef2=>_0x30cef2[_0xcbbfa(0x612)]()[_0xcbbfa(0x6b6)])),_0x21c108=_0x3dacd0[_0xcbbfa(0x53d)](_0x98409b=>_0x98409b[_0xcbbfa(0x34c)]())[_0xcbbfa(0x644)],_0x32b0d5=_0x3dacd0[_0xcbbfa(0x53d)](_0x431519=>_0x431519['isEnemy']())[_0xcbbfa(0x644)];let _0x4f67e8=0x0,_0x138131=0x0;if(_0x138480[_0xcbbfa(0x6c8)](/front/i))_0x4f67e8=_0x21c108>=_0x32b0d5?_0x29c3c4:_0x5c029a;else{if(_0x138480['match'](/middle/i))_0x4f67e8=(_0x29c3c4+_0x5c029a)/0x2,_0x232088=-0x1;else _0x138480['match'](/back/i)&&(_0x4f67e8=_0x21c108>=_0x32b0d5?_0x5c029a:_0x29c3c4);}if(_0x138480['match'](/head/i))_0x138131=_0xf0da36;else{if(_0x138480[_0xcbbfa(0x6c8)](/center/i))_0x138131=(_0xf0da36+_0x20f39f)/0x2;else _0x138480[_0xcbbfa(0x6c8)](/base/i)&&(_0x138131=_0x20f39f);}_0x4096ee[_0xcbbfa(0x81a)](_0x4f67e8,_0x138131,_0x1e79d7,_0x1c5c35,_0x39d420,_0x232088),this[_0xcbbfa(0x3b4)]();},Window_BattleLog['prototype'][_0x19a075(0x1ff)]=function(_0x5b201d,_0x139b07,_0x12bd8c){const _0x509c5d=_0x19a075;for(const _0x260745 of _0x5b201d){if(!_0x260745)continue;_0x260745[_0x509c5d(0x86c)](_0x139b07,_0x12bd8c);}this[_0x509c5d(0x3b4)]();};