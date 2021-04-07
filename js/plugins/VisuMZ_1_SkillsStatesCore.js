//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.14;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.14] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
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
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a flat value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 *
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.hpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.mpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.tpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}"]
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
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
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc States with "Action End" auto-removal will also update
 * turns at the end of each action instead of all actions.
 * @default true
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x2485=['gaugeLineHeight','PassiveStates','onEraseDebuffGlobalJS','addStateTurns','isStateExpired','Game_BattlerBase_meetsSkillConditions','stateData','auto','buffTurns','clear','DisplayedParams','stateHpSlipDamageJS','eraseBuff','isDebuffAffected','round','match','BattleHiddenSkillTypes','onExpireStateGlobalJS','checkShowHideJS','GaugeMaxJS','GaugeDrawJS','Scene_Skill_skillTypeWindowRect','helpAreaHeight','paramBuffRate','Game_BattlerBase_overwriteBuffTurns','SkillConditionJS','_buffTurns','2LaenEO','clearStateRetainType','checkCacheKey','stateTpSlipDamageJS','equips','isMaxDebuffAffected','_stored_debuffColor','isStateRemoved','Game_BattlerBase_states','isStateCategoryAffected','opacity','hasState','onRemoveState','SkillSceneStatusBgType','SkillMenuStatusRect','actions','onAddDebuff','Buffs','statusWindowRect','setItem','_cache','allowCreateShopStatusWindow','ARRAYNUM','ARRAYSTRUCT','addPassiveStates','addPassiveStatesByPluginParameters','Window_StatusBase_placeGauge','onRegenerateCustomStateDamageOverTime','initMembers','stateEraseJS','refresh','gainSilentTp','meetsPassiveStateConditionJS','icon','right','getCurrentTroopUniqueID','clearStateOrigin','hasSkill','DataOffsetX','_stateTurns','DataFontSize','clearStates','ATK','isMaxBuffAffected','drawTextEx','keys','Game_Battler_addState','_stypeId','%1\x20%2\x20%3','buffColor','groupDefeat','VisuMZ_1_ItemsEquipsCore','onExpireStateJS','ShowJS','_states','skillTypeWindowRect','Game_Actor_forgetSkill','TextJS','death','currentValueSkillsStatesCore','NUM','skillMpCost','addBuff','currentClass','center','_colorCache','Window_SkillList_updateHelp','constructor','stypeId','increaseBuff','iconText','_stateRetainType','668335guDbhQ','resetFontSettings','StackDebuffMax','_categoryWindow','inBattle','damage','_statusWindow','Scene_Skill_helpWindowRect','length','ignore','Game_BattlerBase_recoverAll','isUseSkillsStatesCoreUpdatedLayout','currentMaxValueSkillsStatesCore','BattleManager_endAction','checkSkillTypeMatch','_buffs','addBuffTurns','LayoutStyle','ALL','currentDisplayedValue','setupSkillsStatesCore','helpAreaTop','<troop-%1>','resetTextColor','updateFrame','Game_BattlerBase_buffIconIndex','MAXMP','_animationIndex','mpCost','isActor','clearStatesWithStateRetain','innerHeight','commandNameWindowDrawText','makeCommandName','toUpperCase','map','recover\x20all','Game_Troop_setup','_skills','Sprite_Gauge_setup','innerWidth','Actor','itemTextAlign','25ELpnPO','sort','drawExtendedSkillsStatesCoreStatus','ConvertParams','Parse_Notetags_State_ApplyRemoveLeaveJS','drawActorBuffRates','Game_Battler_isStateAddable','getSkillIdWithName','paramValueByName','States','AGI','skillEnableJS','status','addPassiveStatesByNotetag','reset','filter','index','updateCommandNameWindow','applyItemUserEffect','regenerateAllSkillsStatesCore','includes','Skills','onEraseBuffGlobalJS','stateTurns','_currentTroopUniqueID','applyStateTurnManipulationEffects','commandStyleCheck','onEraseStateJS','clamp','Window_SkillType_initialize','_checkingPassiveStates','Game_BattlerBase_eraseState','debuffColor','menuActor','canUse','NEGATIVE','die','split','mainAreaTop','Game_Actor_skillTypes','_actor','131674rtgRHw','Game_BattlerBase_skillMpCost','ARRAYJSON','_costSettings','removeStatesByCategoryAll','setPassiveStateSlipDamageJS','onEraseBuff','ANY','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','updateHelp','ColorNegative','meetsSkillConditions','7xNyuLc','MAXHP','createShopStatusWindow','Game_BattlerBase_eraseBuff','fontSize','slipTp','drawSkillCost','checkShowHideNotetags','drawFullGauge','isAllDead','Scene_Skill_itemWindowRect','item','passiveStates','commandName','gaugeRate','mainAreaHeight','addDebuff','ARRAYSTR','iconHeight','getStypeIdWithName','itemWindowRectSkillsStatesCore','redraw','onAddState','getStateData','applyDebuffTurnManipulationEffects','getStateDisplay','skillTpCost','convertTargetToStateOriginKey','helpWindowRect','slipMp','_battler','Settings','getClassIdWithName','bitmap','setStateData','isGroupDefeatStateAffected','max','initialize','statesByCategory','onAddStateMakeCustomSlipValues','_scene','makeCurrentTroopUniqueID','parse','ColorDebuff','recalculateSlipDamageJS','STRUCT','getStateIdWithName','ShowTurns','MDF','meetsPassiveStateConditions','none','createCommandNameWindow','setup','process_VisuMZ_SkillsStatesCore_State_Notetags','currentMaxValue','maxItems','_stateDisplay','enemy','clearStateDisplay','actor','checkSkillConditionsSwitchNotetags','checkSkillConditionsNotetags','rgba(0,\x200,\x200,\x201)','POSITIVE','process_VisuMZ_SkillsStatesCore_Notetags','stateMpSlipHealJS','changeTextColor','ReapplyRules','add','isRightInputMode','ParseSkillNotetags','CalcJS','allIcons','_stored_buffColor','Scene_Skill_createItemWindow','getStateOriginByKey','itemWindowRect','createTurnDisplaySprite','4531ehUfNF','calcWindowHeight','isSkillUsableForAutoBattle','width','isAlive','ParseStateNotetags','_currentActor','changeOutlineColor','prototype','_commandNameWindow','Parse_Notetags_Skill_JS','EnableLayout','47999BJIvWi','StackBuffMax','canClearState','value','maxCols','onAddStateGlobalJS','onAddDebuffJS','fontBold','skills','skillVisibleJS','makeAdditionalSkillCostText','_checkingVisuMzPassiveStateObjects','isPlaytest','addState','MaxTurns','Game_BattlerBase_decreaseBuff','changePaintOpacity','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','convertGaugeTypeSkillsStatesCore','stateColor','useDigitGrouping','drawActorIconsAllTurnCounters','ColorPositive','ParseClassIDs','drawItemStyleIconText','learnSkill','gradientFillRect','isStateResist','onExpireStateCustomJS','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','lineHeight','aliveMembers','checkShowHideSkillNotetags','stateExpireJS','drawParamText','getColorDataFromPluginParameters','contents','applySkillsStatesCoreEffects','success','initMembersSkillsStatesCore','isStateAffected','number','SkillsStatesCore','skillCostSeparator','isLearnedSkill','forgetSkill','floor','shopStatusWidth','_stateData','ShowData','format','GroupDigits','stateId','statusWindowRectSkillsStatesCore','frameCount','Sprite_StateIcon_updateFrame','addPassiveStatesTraitSets','Window_SkillList_setActor','Game_BattlerBase_clearStates','commandNameWindowDrawBackground','Game_Actor_learnSkill','scrollTo','SkillSceneAdjustSkillList','applyStateCategoryRemovalEffects','setBuffTurns','resetStateCounts','_classIDs','setStatusWindow','buffIconIndex','isBuffPrevented','drawActorIcons','call','currentValue','ListWindowCols','isPartyAllAffectedByGroupDefeatStates','members','includesSkillsStatesCore','Game_Battler_addDebuff','Sprite_Gauge_initMembers','<member-%1>','mainCommandWidth','itemLineRect','116661lZmpOS','commandNameWindowCenter','Name','shopStatusWindowRectSkillsStatesCore','loadBitmap','canPaySkillCost','replace','buttonAssistText1','isUseModernControls','Parse_Notetags_State_SlipEffectJS','Sprite_Gauge_currentMaxValue','Parse_Notetags_State_PassiveJS','stateMpSlipDamageJS','updatedLayoutStyle','Window_SkillList_maxCols','exit','boxWidth','skill','makeSuccess','meetsSkillConditionsGlobalJS','adjustItemWidthByShopStatus','drawActorStateTurns','_stateOrigin','statePassiveConditionJS','iconIndex','Game_Battler_addBuff','_itemWindow','ShowShopStatus','stateMaximumTurns','setBackgroundType','uiHelpPosition','TurnOffsetY','isBuffAffected','PayJS','onExpireDebuffGlobalJS','recoverAll','checkShowHideSwitchNotetags','FUNC','drawIcon','isPassiveStateStackable','clearStateData','updateStateTurns','drawItem','passiveStateObjects','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','Parse_Notetags_State_Category','drawItemStyleIcon','isStateAddable','HiddenSkillTypes','fontFace','setStateDisplay','ParseAllNotetags','helpWindowRectSkillsStatesCore','#%1','setStypeId','setDebuffTurns','outlineColor','shift','drawExtendedParameter','anchor','checkShowHideBattleNotetags','buffLength','redrawSkillsStatesCore','ARRAYFUNC','setStateOrigin','onEraseDebuff','onEraseStateGlobalJS','onExpireDebuff','actorId','updateStatesActionEnd','102715zMtNhy','CanPayJS','onAddDebuffGlobalJS','321957SVMuzs','_turnDisplaySprite','<enemy-%1>','_stateIDs','Game_BattlerBase_refresh','meetsStateCondition','addDebuffTurns','convertPassiveStates','log','skillTypeWindowRectSkillsStatesCore','Sprite_Gauge_currentValue','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','onAddBuffGlobalJS','colSpacing','setStateRetainType','Game_BattlerBase_increaseBuff','_stypeIDs','onAddBuff','itemAt','onEraseStateCustomJS','Game_Unit_isAllDead','skillTypes','updateTurnDisplaySprite','addChild','parameters','_stateMaxTurns','multiclasses','stateAddJS','MAT','EVAL','height','setActor','push','totalStateCategory','uiInputPosition','Scene_Skill_statusWindowRect','getCurrentStateActiveUser','text','_subject','states','removeStatesAuto','MultiplierJS','note','indexOf','gainMp','textColor','meetsPassiveStateGlobalConditionJS','placeGauge','_stored_state-%1-color','applyBuffTurnManipulationEffects','stateTpSlipHealJS','259KUgPgo','Sprite_Gauge_redraw','Window_SkillList_includes','_shopStatusWindow','uiMenuStyle','getStateReapplyRulings','commandStyle','meetsPassiveStateConditionSwitches','createSkillCostText','name','description','DataOffsetY','onAddStateJS','active','ARRAYEVAL','ceil','eraseState','IconStypeNorm','Global','createItemWindow','usableSkills','Game_BattlerBase_resetStateCounts','CmdTextAlign','makeCommandList','Costs','onExpireBuffGlobalJS','shopStatusWindowRect','return\x200','getCurrentStateOriginKey','placeExactGauge','_skillIDs','_skillTypeWindow','JSON','removeStatesByCategory','ColorBuff','categories','meetsPassiveStateConditionClasses','stateHpSlipHealJS','slipHp','retrieveStateColor','textSizeEx','paySkillCost','isStateRestrict','isBuffOrDebuffAffected','overwriteBuffTurns','buff','onDatabaseLoaded','removeBuff','getStateOrigin','drawActorStateData','setStateTurns','onAddStateCustomJS','tpCost','slice','concat','state','TurnOffsetX','drawActorBuffTurns','Window_SkillStatus_refresh','isSkillCostShown','drawText','callUpdateHelp','Window_StatusBase_drawActorIcons','autoRemovalTiming','buttonAssistSwitch','Game_BattlerBase_initMembers','onExpireBuff','decreaseBuff','DEF','meetsSkillConditionsEnableJS','greater','trim','createAllSkillCostText','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','Parse_Notetags_Skill_Cost','removeState','regenerateAll','Sprite_StateIcon_loadBitmap','Enemy','PassiveConditionJS','user','totalStateCategoryAffected','heal','Game_Action_applyItemUserEffect','mainFontSize','VisuMZ_0_CoreEngine','priority','_result','CoreEngine','Game_Battler_regenerateAll','gainHp','onAddBuffJS','iconWidth','getSkillTypes','remove','Scene_Boot_onDatabaseLoaded','toLowerCase','Game_BattlerBase_die','getStateRetainType','\x5cI[%1]%2','process_VisuMZ_SkillsStatesCore_Skill_Notetags','Sprite_Gauge_gaugeRate'];const _0x42ee=function(_0x15ddf0,_0x5693a5){_0x15ddf0=_0x15ddf0-0x172;let _0x24856a=_0x2485[_0x15ddf0];return _0x24856a;};const _0x5b4c5d=_0x42ee;(function(_0x4de54f,_0x182109){const _0x283503=_0x42ee;while(!![]){try{const _0x1dbd73=parseInt(_0x283503(0x29b))*-parseInt(_0x283503(0x1c1))+-parseInt(_0x283503(0x1cd))*-parseInt(_0x283503(0x38f))+parseInt(_0x283503(0x3b8))+-parseInt(_0x283503(0x21f))+parseInt(_0x283503(0x364))+-parseInt(_0x283503(0x31c))*parseInt(_0x283503(0x268))+-parseInt(_0x283503(0x173))*-parseInt(_0x283503(0x265));if(_0x1dbd73===_0x182109)break;else _0x4de54f['push'](_0x4de54f['shift']());}catch(_0x361c17){_0x4de54f['push'](_0x4de54f['shift']());}}}(_0x2485,0xbf9f5));var label='SkillsStatesCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x5b4c5d(0x39e)](function(_0x2913ae){const _0x211bb7=_0x5b4c5d;return _0x2913ae[_0x211bb7(0x39b)]&&_0x2913ae[_0x211bb7(0x2a5)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x5b4c5d(0x192)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x5b4c5d(0x392)]=function(_0x35349c,_0x8802f8){const _0x523e35=_0x5b4c5d;for(const _0x5e4c3c in _0x8802f8){if(_0x5e4c3c['match'](/(.*):(.*)/i)){const _0x3653a7=String(RegExp['$1']),_0x967be=String(RegExp['$2'])[_0x523e35(0x386)]()['trim']();let _0x7bfbc0,_0xd1a372,_0x43d18a;switch(_0x967be){case _0x523e35(0x358):_0x7bfbc0=_0x8802f8[_0x5e4c3c]!==''?Number(_0x8802f8[_0x5e4c3c]):0x0;break;case _0x523e35(0x332):_0xd1a372=_0x8802f8[_0x5e4c3c]!==''?JSON['parse'](_0x8802f8[_0x5e4c3c]):[],_0x7bfbc0=_0xd1a372[_0x523e35(0x387)](_0x343b22=>Number(_0x343b22));break;case _0x523e35(0x285):_0x7bfbc0=_0x8802f8[_0x5e4c3c]!==''?eval(_0x8802f8[_0x5e4c3c]):null;break;case _0x523e35(0x2a9):_0xd1a372=_0x8802f8[_0x5e4c3c]!==''?JSON[_0x523e35(0x19d)](_0x8802f8[_0x5e4c3c]):[],_0x7bfbc0=_0xd1a372[_0x523e35(0x387)](_0x4752ea=>eval(_0x4752ea));break;case _0x523e35(0x2bb):_0x7bfbc0=_0x8802f8[_0x5e4c3c]!==''?JSON[_0x523e35(0x19d)](_0x8802f8[_0x5e4c3c]):'';break;case _0x523e35(0x3ba):_0xd1a372=_0x8802f8[_0x5e4c3c]!==''?JSON[_0x523e35(0x19d)](_0x8802f8[_0x5e4c3c]):[],_0x7bfbc0=_0xd1a372[_0x523e35(0x387)](_0x32077c=>JSON[_0x523e35(0x19d)](_0x32077c));break;case _0x523e35(0x244):_0x7bfbc0=_0x8802f8[_0x5e4c3c]!==''?new Function(JSON[_0x523e35(0x19d)](_0x8802f8[_0x5e4c3c])):new Function(_0x523e35(0x2b6));break;case _0x523e35(0x25e):_0xd1a372=_0x8802f8[_0x5e4c3c]!==''?JSON[_0x523e35(0x19d)](_0x8802f8[_0x5e4c3c]):[],_0x7bfbc0=_0xd1a372[_0x523e35(0x387)](_0x2860dc=>new Function(JSON[_0x523e35(0x19d)](_0x2860dc)));break;case'STR':_0x7bfbc0=_0x8802f8[_0x5e4c3c]!==''?String(_0x8802f8[_0x5e4c3c]):'';break;case _0x523e35(0x184):_0xd1a372=_0x8802f8[_0x5e4c3c]!==''?JSON['parse'](_0x8802f8[_0x5e4c3c]):[],_0x7bfbc0=_0xd1a372[_0x523e35(0x387)](_0x3ba16f=>String(_0x3ba16f));break;case _0x523e35(0x1a0):_0x43d18a=_0x8802f8[_0x5e4c3c]!==''?JSON[_0x523e35(0x19d)](_0x8802f8[_0x5e4c3c]):{},_0x35349c[_0x3653a7]={},VisuMZ[_0x523e35(0x392)](_0x35349c[_0x3653a7],_0x43d18a);continue;case _0x523e35(0x333):_0xd1a372=_0x8802f8[_0x5e4c3c]!==''?JSON[_0x523e35(0x19d)](_0x8802f8[_0x5e4c3c]):[],_0x7bfbc0=_0xd1a372['map'](_0x358441=>VisuMZ[_0x523e35(0x392)]({},JSON[_0x523e35(0x19d)](_0x358441)));break;default:continue;}_0x35349c[_0x3653a7]=_0x7bfbc0;}}return _0x35349c;},(_0x3fcd4e=>{const _0x1ec3f3=_0x5b4c5d,_0x2ec660=_0x3fcd4e[_0x1ec3f3(0x2a4)];for(const _0x48f1c6 of dependencies){if(!Imported[_0x48f1c6]){alert(_0x1ec3f3(0x1ea)[_0x1ec3f3(0x1ff)](_0x2ec660,_0x48f1c6)),SceneManager['exit']();break;}}const _0x3f7a01=_0x3fcd4e['description'];if(_0x3f7a01[_0x1ec3f3(0x310)](/\[Version[ ](.*?)\]/i)){const _0x473720=Number(RegExp['$1']);_0x473720!==VisuMZ[label]['version']&&(alert(_0x1ec3f3(0x1de)['format'](_0x2ec660,_0x473720)),SceneManager[_0x1ec3f3(0x22e)]());}if(_0x3f7a01[_0x1ec3f3(0x310)](/\[Tier[ ](\d+)\]/i)){const _0x354113=Number(RegExp['$1']);_0x354113<tier?(alert(_0x1ec3f3(0x3c0)['format'](_0x2ec660,_0x354113,tier)),SceneManager[_0x1ec3f3(0x22e)]()):tier=Math[_0x1ec3f3(0x197)](_0x354113,tier);}VisuMZ[_0x1ec3f3(0x392)](VisuMZ[label][_0x1ec3f3(0x192)],_0x3fcd4e[_0x1ec3f3(0x280)]);})(pluginData),VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x2fa)]=Scene_Boot[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x2c9)],Scene_Boot[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x2c9)]=function(){const _0x5b5501=_0x5b4c5d;VisuMZ[_0x5b5501(0x1f7)][_0x5b5501(0x2fa)][_0x5b5501(0x214)](this),this['process_VisuMZ_SkillsStatesCore_Notetags']();},Scene_Boot[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x1b3)]=function(){const _0x58149a=_0x5b4c5d;if(VisuMZ[_0x58149a(0x252)])return;this[_0x58149a(0x2ff)](),this['process_VisuMZ_SkillsStatesCore_State_Notetags']();},Scene_Boot['prototype'][_0x5b4c5d(0x2ff)]=function(){const _0xa5e1a1=_0x5b4c5d;for(const _0x5e9307 of $dataSkills){if(!_0x5e9307)continue;VisuMZ['SkillsStatesCore']['Parse_Notetags_Skill_Cost'](_0x5e9307),VisuMZ['SkillsStatesCore'][_0xa5e1a1(0x1cb)](_0x5e9307);}},Scene_Boot[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x1a8)]=function(){const _0x3780f9=_0x5b4c5d;for(const _0x485a07 of $dataStates){if(!_0x485a07)continue;VisuMZ[_0x3780f9(0x1f7)]['Parse_Notetags_State_Category'](_0x485a07),VisuMZ[_0x3780f9(0x1f7)][_0x3780f9(0x22a)](_0x485a07),VisuMZ[_0x3780f9(0x1f7)][_0x3780f9(0x228)](_0x485a07),VisuMZ[_0x3780f9(0x1f7)][_0x3780f9(0x393)](_0x485a07);}},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x1b9)]=VisuMZ['ParseSkillNotetags'],VisuMZ['ParseSkillNotetags']=function(_0x4b81a1){const _0x204b2a=_0x5b4c5d;VisuMZ[_0x204b2a(0x1f7)][_0x204b2a(0x1b9)][_0x204b2a(0x214)](this,_0x4b81a1),VisuMZ[_0x204b2a(0x1f7)][_0x204b2a(0x2e5)](_0x4b81a1),VisuMZ[_0x204b2a(0x1f7)][_0x204b2a(0x1cb)](_0x4b81a1);},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x1c6)]=VisuMZ['ParseStateNotetags'],VisuMZ[_0x5b4c5d(0x1c6)]=function(_0x3ce4fa){const _0x67a7a3=_0x5b4c5d;VisuMZ[_0x67a7a3(0x1f7)]['ParseStateNotetags'][_0x67a7a3(0x214)](this,_0x3ce4fa),VisuMZ[_0x67a7a3(0x1f7)][_0x67a7a3(0x24c)](_0x3ce4fa),VisuMZ['SkillsStatesCore'][_0x67a7a3(0x22a)](_0x3ce4fa),VisuMZ[_0x67a7a3(0x1f7)]['Parse_Notetags_State_SlipEffectJS'](_0x3ce4fa),VisuMZ[_0x67a7a3(0x1f7)]['Parse_Notetags_State_ApplyRemoveLeaveJS'](_0x3ce4fa);},VisuMZ[_0x5b4c5d(0x1f7)]['Parse_Notetags_Skill_Cost']=function(_0x2d91b8){const _0x4f1511=_0x5b4c5d,_0x4afaa4=_0x2d91b8[_0x4f1511(0x292)];_0x4afaa4[_0x4f1511(0x310)](/<MP COST:[ ](\d+)>/i)&&(_0x2d91b8[_0x4f1511(0x380)]=Number(RegExp['$1'])),_0x4afaa4[_0x4f1511(0x310)](/<TP COST:[ ](\d+)>/i)&&(_0x2d91b8[_0x4f1511(0x2cf)]=Number(RegExp['$1']));},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x39a)]={},VisuMZ['SkillsStatesCore'][_0x5b4c5d(0x1d6)]={},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x1cb)]=function(_0xbd6efe){const _0x384b4b=_0x5b4c5d,_0x9822cd=_0xbd6efe[_0x384b4b(0x292)];if(_0x9822cd['match'](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x3227c6=String(RegExp['$1']),_0x216df3=_0x384b4b(0x273)[_0x384b4b(0x1ff)](_0x3227c6);VisuMZ[_0x384b4b(0x1f7)][_0x384b4b(0x39a)][_0xbd6efe['id']]=new Function(_0x384b4b(0x230),_0x216df3);}if(_0x9822cd['match'](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x53b173=String(RegExp['$1']),_0x26401d='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x384b4b(0x1ff)](_0x53b173);VisuMZ[_0x384b4b(0x1f7)][_0x384b4b(0x1d6)][_0xbd6efe['id']]=new Function(_0x384b4b(0x230),_0x26401d);}},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x24c)]=function(_0x32e4ce){const _0x569978=_0x5b4c5d;_0x32e4ce[_0x569978(0x2be)]=[_0x569978(0x376),_0x569978(0x3bf)];const _0x2fd174=_0x32e4ce[_0x569978(0x292)],_0x3f0d70=_0x2fd174['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x3f0d70)for(const _0x1d2b3d of _0x3f0d70){_0x1d2b3d[_0x569978(0x310)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x9b5aba=String(RegExp['$1'])[_0x569978(0x386)]()[_0x569978(0x2e2)]()[_0x569978(0x3b4)](',');for(const _0x4ef778 of _0x9b5aba){_0x32e4ce[_0x569978(0x2be)][_0x569978(0x288)](_0x4ef778[_0x569978(0x2e2)]());}}if(_0x2fd174['match'](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x295eb4=RegExp['$1']['split'](/[\r\n]+/);for(const _0x13856e of _0x295eb4){_0x32e4ce[_0x569978(0x2be)][_0x569978(0x288)](_0x13856e[_0x569978(0x386)]()[_0x569978(0x2e2)]());}}_0x2fd174[_0x569978(0x310)](/<POSITIVE STATE>/i)&&_0x32e4ce[_0x569978(0x2be)][_0x569978(0x288)](_0x569978(0x1b2)),_0x2fd174[_0x569978(0x310)](/<NEGATIVE STATE>/i)&&_0x32e4ce['categories'][_0x569978(0x288)](_0x569978(0x3b2));},VisuMZ[_0x5b4c5d(0x1f7)]['statePassiveConditionJS']={},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x22a)]=function(_0x5961ac){const _0x403b09=_0x5b4c5d,_0x4ad36e=_0x5961ac['note'];if(_0x4ad36e['match'](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x35c9a6=String(RegExp['$1']),_0x163f73='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x35c9a6);VisuMZ[_0x403b09(0x1f7)][_0x403b09(0x236)][_0x5961ac['id']]=new Function(_0x403b09(0x2d2),_0x163f73);}},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x30c)]={},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x2c0)]={},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x22b)]={},VisuMZ[_0x5b4c5d(0x1f7)]['stateMpSlipHealJS']={},VisuMZ['SkillsStatesCore'][_0x5b4c5d(0x31f)]={},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x29a)]={},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x228)]=function(_0x459508){const _0x4305db=_0x5b4c5d,_0x2d36da=_0x459508[_0x4305db(0x292)],_0x1e02ef=_0x4305db(0x2e4);if(_0x2d36da[_0x4305db(0x310)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x5dc16b=String(RegExp['$1']),_0x298535=_0x1e02ef[_0x4305db(0x1ff)](_0x5dc16b,_0x4305db(0x369),-0x1,_0x4305db(0x2c1));VisuMZ['SkillsStatesCore'][_0x4305db(0x30c)][_0x459508['id']]=new Function('stateId',_0x298535);}else{if(_0x2d36da[_0x4305db(0x310)](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x2a5edc=String(RegExp['$1']),_0x21786c=_0x1e02ef[_0x4305db(0x1ff)](_0x2a5edc,_0x4305db(0x2ed),0x1,_0x4305db(0x2c1));VisuMZ[_0x4305db(0x1f7)][_0x4305db(0x2c0)][_0x459508['id']]=new Function('stateId',_0x21786c);}}if(_0x2d36da[_0x4305db(0x310)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x426651=String(RegExp['$1']),_0x514777=_0x1e02ef[_0x4305db(0x1ff)](_0x426651,_0x4305db(0x369),-0x1,_0x4305db(0x190));VisuMZ['SkillsStatesCore'][_0x4305db(0x22b)][_0x459508['id']]=new Function(_0x4305db(0x201),_0x514777);}else{if(_0x2d36da['match'](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x40b15f=String(RegExp['$1']),_0x50dafa=_0x1e02ef[_0x4305db(0x1ff)](_0x40b15f,_0x4305db(0x2ed),0x1,'slipMp');VisuMZ['SkillsStatesCore'][_0x4305db(0x1b4)][_0x459508['id']]=new Function(_0x4305db(0x201),_0x50dafa);}}if(_0x2d36da[_0x4305db(0x310)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x44836c=String(RegExp['$1']),_0x15d23f=_0x1e02ef['format'](_0x44836c,_0x4305db(0x369),-0x1,_0x4305db(0x178));VisuMZ['SkillsStatesCore'][_0x4305db(0x31f)][_0x459508['id']]=new Function(_0x4305db(0x201),_0x15d23f);}else{if(_0x2d36da[_0x4305db(0x310)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x4ea114=String(RegExp['$1']),_0x4032ce=_0x1e02ef['format'](_0x4ea114,'heal',0x1,_0x4305db(0x178));VisuMZ[_0x4305db(0x1f7)][_0x4305db(0x29a)][_0x459508['id']]=new Function(_0x4305db(0x201),_0x4032ce);}}},VisuMZ['SkillsStatesCore'][_0x5b4c5d(0x283)]={},VisuMZ['SkillsStatesCore'][_0x5b4c5d(0x339)]={},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x1ee)]={},VisuMZ[_0x5b4c5d(0x1f7)]['Parse_Notetags_State_ApplyRemoveLeaveJS']=function(_0x4a2c31){const _0x7cae95=_0x5b4c5d,_0x2b5b07=_0x4a2c31[_0x7cae95(0x292)],_0x42abfa=_0x7cae95(0x24b);if(_0x2b5b07[_0x7cae95(0x310)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x3e6336=String(RegExp['$1']),_0x2f61d8=_0x42abfa[_0x7cae95(0x1ff)](_0x3e6336);VisuMZ[_0x7cae95(0x1f7)][_0x7cae95(0x283)][_0x4a2c31['id']]=new Function('stateId',_0x2f61d8);}if(_0x2b5b07[_0x7cae95(0x310)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x27451b=String(RegExp['$1']),_0x5a3f9c=_0x42abfa['format'](_0x27451b);VisuMZ['SkillsStatesCore'][_0x7cae95(0x339)][_0x4a2c31['id']]=new Function(_0x7cae95(0x201),_0x5a3f9c);}if(_0x2b5b07['match'](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x411b6b=String(RegExp['$1']),_0x1a551a=_0x42abfa[_0x7cae95(0x1ff)](_0x411b6b);VisuMZ[_0x7cae95(0x1f7)]['stateExpireJS'][_0x4a2c31['id']]=new Function('stateId',_0x1a551a);}},DataManager[_0x5b4c5d(0x193)]=function(_0x1a97a1){const _0x3ca429=_0x5b4c5d;_0x1a97a1=_0x1a97a1[_0x3ca429(0x386)]()['trim'](),this[_0x3ca429(0x20f)]=this[_0x3ca429(0x20f)]||{};if(this[_0x3ca429(0x20f)][_0x1a97a1])return this[_0x3ca429(0x20f)][_0x1a97a1];for(const _0x14d3a5 of $dataClasses){if(!_0x14d3a5)continue;let _0x30359b=_0x14d3a5[_0x3ca429(0x2a4)];_0x30359b=_0x30359b[_0x3ca429(0x225)](/\x1I\[(\d+)\]/gi,''),_0x30359b=_0x30359b['replace'](/\\I\[(\d+)\]/gi,''),this[_0x3ca429(0x20f)][_0x30359b[_0x3ca429(0x386)]()[_0x3ca429(0x2e2)]()]=_0x14d3a5['id'];}return this[_0x3ca429(0x20f)][_0x1a97a1]||0x0;},DataManager[_0x5b4c5d(0x2f8)]=function(_0x1db33a){const _0x560fbb=_0x5b4c5d;this[_0x560fbb(0x278)]=this['_stypeIDs']||{};if(this['_stypeIDs'][_0x1db33a['id']])return this[_0x560fbb(0x278)][_0x1db33a['id']];this[_0x560fbb(0x278)][_0x1db33a['id']]=[_0x1db33a[_0x560fbb(0x360)]];if(_0x1db33a[_0x560fbb(0x292)][_0x560fbb(0x310)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5b5bce=JSON['parse']('['+RegExp['$1'][_0x560fbb(0x310)](/\d+/g)+']');this[_0x560fbb(0x278)][_0x1db33a['id']]=this[_0x560fbb(0x278)][_0x1db33a['id']]['concat'](_0x5b5bce);}else{if(_0x1db33a['note'][_0x560fbb(0x310)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0xcdcdd6=RegExp['$1']['split'](',');for(const _0xcddd32 of _0xcdcdd6){const _0x5cb7a2=DataManager[_0x560fbb(0x186)](_0xcddd32);if(_0x5cb7a2)this[_0x560fbb(0x278)][_0x1db33a['id']]['push'](_0x5cb7a2);}}}return this['_stypeIDs'][_0x1db33a['id']];},DataManager[_0x5b4c5d(0x186)]=function(_0x5740c6){const _0x339e40=_0x5b4c5d;_0x5740c6=_0x5740c6[_0x339e40(0x386)]()[_0x339e40(0x2e2)](),this['_stypeIDs']=this[_0x339e40(0x278)]||{};if(this[_0x339e40(0x278)][_0x5740c6])return this[_0x339e40(0x278)][_0x5740c6];for(let _0x35daeb=0x1;_0x35daeb<0x64;_0x35daeb++){if(!$dataSystem[_0x339e40(0x27d)][_0x35daeb])continue;let _0x5487fd=$dataSystem['skillTypes'][_0x35daeb][_0x339e40(0x386)]()['trim']();_0x5487fd=_0x5487fd[_0x339e40(0x225)](/\x1I\[(\d+)\]/gi,''),_0x5487fd=_0x5487fd[_0x339e40(0x225)](/\\I\[(\d+)\]/gi,''),this[_0x339e40(0x278)][_0x5487fd]=_0x35daeb;}return this[_0x339e40(0x278)][_0x5740c6]||0x0;},DataManager[_0x5b4c5d(0x396)]=function(_0x3b6668){const _0x112472=_0x5b4c5d;_0x3b6668=_0x3b6668[_0x112472(0x386)]()[_0x112472(0x2e2)](),this['_skillIDs']=this[_0x112472(0x2b9)]||{};if(this['_skillIDs'][_0x3b6668])return this[_0x112472(0x2b9)][_0x3b6668];for(const _0x4a20e3 of $dataSkills){if(!_0x4a20e3)continue;this[_0x112472(0x2b9)][_0x4a20e3[_0x112472(0x2a4)][_0x112472(0x386)]()[_0x112472(0x2e2)]()]=_0x4a20e3['id'];}return this[_0x112472(0x2b9)][_0x3b6668]||0x0;},DataManager[_0x5b4c5d(0x1a1)]=function(_0x2e0639){const _0x1ad97d=_0x5b4c5d;_0x2e0639=_0x2e0639[_0x1ad97d(0x386)]()['trim'](),this[_0x1ad97d(0x26b)]=this[_0x1ad97d(0x26b)]||{};if(this['_stateIDs'][_0x2e0639])return this[_0x1ad97d(0x26b)][_0x2e0639];for(const _0x37d5a0 of $dataStates){if(!_0x37d5a0)continue;this[_0x1ad97d(0x26b)][_0x37d5a0['name']['toUpperCase']()[_0x1ad97d(0x2e2)]()]=_0x37d5a0['id'];}return this[_0x1ad97d(0x26b)][_0x2e0639]||0x0;},DataManager[_0x5b4c5d(0x23b)]=function(_0x3f1f10){const _0x506eec=_0x5b4c5d;this[_0x506eec(0x281)]=this[_0x506eec(0x281)]||{};if(this['_stateMaxTurns'][_0x3f1f10])return this[_0x506eec(0x281)][_0x3f1f10];return $dataStates[_0x3f1f10]['note'][_0x506eec(0x310)](/<MAX TURNS:[ ](\d+)>/i)?this[_0x506eec(0x281)][_0x3f1f10]=Number(RegExp['$1']):this['_stateMaxTurns'][_0x3f1f10]=VisuMZ['SkillsStatesCore'][_0x506eec(0x192)]['States'][_0x506eec(0x1db)],this[_0x506eec(0x281)][_0x3f1f10];},ColorManager[_0x5b4c5d(0x1f0)]=function(_0x4e4959,_0x2d544c){const _0x239b40=_0x5b4c5d;return _0x2d544c=String(_0x2d544c),this[_0x239b40(0x35d)]=this[_0x239b40(0x35d)]||{},_0x2d544c[_0x239b40(0x310)](/#(.*)/i)?this[_0x239b40(0x35d)][_0x4e4959]=_0x239b40(0x254)[_0x239b40(0x1ff)](String(RegExp['$1'])):this[_0x239b40(0x35d)][_0x4e4959]=this[_0x239b40(0x295)](Number(_0x2d544c)),this[_0x239b40(0x35d)][_0x4e4959];},ColorManager['getColor']=function(_0x143a7b){const _0x5bd9f5=_0x5b4c5d;return _0x143a7b=String(_0x143a7b),_0x143a7b[_0x5bd9f5(0x310)](/#(.*)/i)?'#%1'[_0x5bd9f5(0x1ff)](String(RegExp['$1'])):this[_0x5bd9f5(0x295)](Number(_0x143a7b));},ColorManager['stateColor']=function(_0x14d357){const _0xca968a=_0x5b4c5d;if(typeof _0x14d357===_0xca968a(0x1f6))_0x14d357=$dataStates[_0x14d357];const _0x2a8017=_0xca968a(0x298)[_0xca968a(0x1ff)](_0x14d357['id']);this[_0xca968a(0x35d)]=this[_0xca968a(0x35d)]||{};if(this[_0xca968a(0x35d)][_0x2a8017])return this[_0xca968a(0x35d)][_0x2a8017];const _0x519489=this['retrieveStateColor'](_0x14d357);return this['getColorDataFromPluginParameters'](_0x2a8017,_0x519489);},ColorManager[_0x5b4c5d(0x2c2)]=function(_0x57eeb8){const _0x53b945=_0x5b4c5d,_0x1eea06=_0x57eeb8[_0x53b945(0x292)];if(_0x1eea06[_0x53b945(0x310)](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x1eea06[_0x53b945(0x310)](/<POSITIVE STATE>/i))return VisuMZ['SkillsStatesCore'][_0x53b945(0x192)]['States'][_0x53b945(0x1e3)];else return _0x1eea06[_0x53b945(0x310)](/<NEGATIVE STATE>/i)?VisuMZ[_0x53b945(0x1f7)][_0x53b945(0x192)]['States'][_0x53b945(0x3c2)]:VisuMZ[_0x53b945(0x1f7)][_0x53b945(0x192)][_0x53b945(0x398)]['ColorNeutral'];}},ColorManager[_0x5b4c5d(0x34d)]=function(){const _0x57a204=_0x5b4c5d,_0x51351b=_0x57a204(0x1bc);this[_0x57a204(0x35d)]=this[_0x57a204(0x35d)]||{};if(this['_colorCache'][_0x51351b])return this[_0x57a204(0x35d)][_0x51351b];const _0x438022=VisuMZ[_0x57a204(0x1f7)][_0x57a204(0x192)][_0x57a204(0x32d)][_0x57a204(0x2bd)];return this[_0x57a204(0x1f0)](_0x51351b,_0x438022);},ColorManager[_0x5b4c5d(0x3af)]=function(){const _0x3ead6b=_0x5b4c5d,_0x3647a7=_0x3ead6b(0x322);this[_0x3ead6b(0x35d)]=this['_colorCache']||{};if(this['_colorCache'][_0x3647a7])return this[_0x3ead6b(0x35d)][_0x3647a7];const _0x355ae2=VisuMZ[_0x3ead6b(0x1f7)][_0x3ead6b(0x192)][_0x3ead6b(0x32d)][_0x3ead6b(0x19e)];return this[_0x3ead6b(0x1f0)](_0x3647a7,_0x355ae2);},VisuMZ[_0x5b4c5d(0x1f7)]['BattleManager_endAction']=BattleManager['endAction'],BattleManager['endAction']=function(){const _0x5aa945=_0x5b4c5d;this[_0x5aa945(0x264)](),VisuMZ[_0x5aa945(0x1f7)][_0x5aa945(0x371)][_0x5aa945(0x214)](this);},BattleManager[_0x5b4c5d(0x264)]=function(){const _0x5e881e=_0x5b4c5d,_0x252b04=VisuMZ[_0x5e881e(0x1f7)][_0x5e881e(0x192)]['States'];if(!_0x252b04)return;if(_0x252b04['ActionEndUpdate']===![])return;if(!this[_0x5e881e(0x28e)])return;this['_subject'][_0x5e881e(0x264)]();},Game_Battler[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x264)]=function(){const _0x5a021f=_0x5b4c5d;for(const _0x6c6eff of this[_0x5a021f(0x352)]){const _0x519f17=$dataStates[_0x6c6eff];if(!_0x519f17)continue;if(_0x519f17[_0x5a021f(0x2da)]!==0x1)continue;this[_0x5a021f(0x343)][_0x6c6eff]>0x0&&this[_0x5a021f(0x343)][_0x6c6eff]--;}this[_0x5a021f(0x290)](0x1);},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x248)]=function(){const _0x38d501=_0x5b4c5d,_0x4aaa75=VisuMZ[_0x38d501(0x1f7)][_0x38d501(0x192)]['States'];for(const _0x143e14 of this[_0x38d501(0x352)]){const _0x10f823=$dataStates[_0x143e14];if(_0x4aaa75&&_0x4aaa75['ActionEndUpdate']!==![]){if(_0x10f823&&_0x10f823[_0x38d501(0x2da)]===0x1)continue;}this['_stateTurns'][_0x143e14]>0x0&&this[_0x38d501(0x343)][_0x143e14]--;}},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x2ee)]=Game_Action[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x3a1)],Game_Action['prototype'][_0x5b4c5d(0x3a1)]=function(_0x4bcbf9){const _0x1afe36=_0x5b4c5d;VisuMZ[_0x1afe36(0x1f7)][_0x1afe36(0x2ee)][_0x1afe36(0x214)](this,_0x4bcbf9),this['applySkillsStatesCoreEffects'](_0x4bcbf9);},Game_Action[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x1f2)]=function(_0x5c7031){const _0x48c090=_0x5b4c5d;this['applyStateCategoryRemovalEffects'](_0x5c7031),this[_0x48c090(0x3a8)](_0x5c7031),this[_0x48c090(0x299)](_0x5c7031),this[_0x48c090(0x18b)](_0x5c7031);},Game_Action[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x20c)]=function(_0x2e9d2a){const _0x34afe4=_0x5b4c5d;if(_0x2e9d2a[_0x34afe4(0x28f)]()['length']<=0x0)return;const _0x351611=this['item']()[_0x34afe4(0x292)];if(_0x351611[_0x34afe4(0x310)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i)){const _0x3a8e33=String(RegExp['$1']);_0x2e9d2a[_0x34afe4(0x3bc)](_0x3a8e33);}const _0x330ea6=_0x351611['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x330ea6)for(const _0x12073e of _0x330ea6){_0x12073e['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x4e5669=String(RegExp['$1']),_0x2ead6e=Number(RegExp['$2']);_0x2e9d2a['removeStatesByCategory'](_0x4e5669,_0x2ead6e);}},Game_Action[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x3a8)]=function(_0x178cd6){const _0x2093ce=_0x5b4c5d,_0x43e32e=this['item']()[_0x2093ce(0x292)],_0x3ea111=_0x43e32e[_0x2093ce(0x310)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x3ea111)for(const _0x559980 of _0x3ea111){let _0x2c151e=0x0,_0x38968d=0x0;if(_0x559980[_0x2093ce(0x310)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x2c151e=Number(RegExp['$1']),_0x38968d=Number(RegExp['$2']);else _0x559980[_0x2093ce(0x310)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x2c151e=DataManager['getStateIdWithName'](RegExp['$1']),_0x38968d=Number(RegExp['$2']));_0x178cd6['setStateTurns'](_0x2c151e,_0x38968d),this[_0x2093ce(0x231)](_0x178cd6);}const _0x40ae2c=_0x43e32e[_0x2093ce(0x310)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x40ae2c)for(const _0x275f99 of _0x40ae2c){let _0x103e5b=0x0,_0x24a209=0x0;if(_0x275f99[_0x2093ce(0x310)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x103e5b=Number(RegExp['$1']),_0x24a209=Number(RegExp['$2']);else _0x275f99[_0x2093ce(0x310)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x103e5b=DataManager['getStateIdWithName'](RegExp['$1']),_0x24a209=Number(RegExp['$2']));_0x178cd6[_0x2093ce(0x304)](_0x103e5b,_0x24a209),this['makeSuccess'](_0x178cd6);}},Game_Action[_0x5b4c5d(0x1c9)]['applyBuffTurnManipulationEffects']=function(_0x610f39){const _0x478324=_0x5b4c5d,_0x5ca7f8=[_0x478324(0x174),_0x478324(0x37e),_0x478324(0x346),_0x478324(0x2df),_0x478324(0x284),_0x478324(0x1a3),_0x478324(0x399),'LUK'],_0x1d6d07=this[_0x478324(0x17e)]()[_0x478324(0x292)],_0x25a67c=_0x1d6d07[_0x478324(0x310)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x25a67c)for(const _0x24d357 of _0x25a67c){_0x24d357['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x201e26=_0x5ca7f8['indexOf'](String(RegExp['$1'])['toUpperCase']()),_0x3fffee=Number(RegExp['$2']);_0x201e26>=0x0&&(_0x610f39[_0x478324(0x20d)](_0x201e26,_0x3fffee),this[_0x478324(0x231)](_0x610f39));}const _0x36da26=_0x1d6d07[_0x478324(0x310)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x36da26)for(const _0x28547a of _0x25a67c){_0x28547a['match'](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x283be4=_0x5ca7f8[_0x478324(0x293)](String(RegExp['$1'])[_0x478324(0x386)]()),_0x4aec44=Number(RegExp['$2']);_0x283be4>=0x0&&(_0x610f39['addBuffTurns'](_0x283be4,_0x4aec44),this[_0x478324(0x231)](_0x610f39));}},Game_Action[_0x5b4c5d(0x1c9)]['applyDebuffTurnManipulationEffects']=function(_0x3c66fa){const _0x4c1f07=_0x5b4c5d,_0x5cbe45=[_0x4c1f07(0x174),_0x4c1f07(0x37e),'ATK','DEF',_0x4c1f07(0x284),_0x4c1f07(0x1a3),_0x4c1f07(0x399),'LUK'],_0x279897=this[_0x4c1f07(0x17e)]()[_0x4c1f07(0x292)],_0x7f6bb9=_0x279897[_0x4c1f07(0x310)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x7f6bb9)for(const _0x2a5660 of _0x7f6bb9){_0x2a5660[_0x4c1f07(0x310)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x3df488=_0x5cbe45['indexOf'](String(RegExp['$1'])['toUpperCase']()),_0x5043ce=Number(RegExp['$2']);_0x3df488>=0x0&&(_0x3c66fa['setDebuffTurns'](_0x3df488,_0x5043ce),this['makeSuccess'](_0x3c66fa));}const _0x13fcc1=_0x279897[_0x4c1f07(0x310)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x13fcc1)for(const _0x537854 of _0x7f6bb9){_0x537854[_0x4c1f07(0x310)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x329ff7=_0x5cbe45['indexOf'](String(RegExp['$1'])[_0x4c1f07(0x386)]()),_0x1dd9ad=Number(RegExp['$2']);_0x329ff7>=0x0&&(_0x3c66fa[_0x4c1f07(0x26e)](_0x329ff7,_0x1dd9ad),this['makeSuccess'](_0x3c66fa));}},VisuMZ['SkillsStatesCore'][_0x5b4c5d(0x2dc)]=Game_BattlerBase['prototype'][_0x5b4c5d(0x338)],Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x338)]=function(){const _0x6673cc=_0x5b4c5d;this[_0x6673cc(0x330)]={},this[_0x6673cc(0x1f4)](),VisuMZ[_0x6673cc(0x1f7)]['Game_BattlerBase_initMembers'][_0x6673cc(0x214)](this);},Game_BattlerBase[_0x5b4c5d(0x1c9)]['initMembersSkillsStatesCore']=function(){const _0x25558e=_0x5b4c5d;this[_0x25558e(0x363)]='',this[_0x25558e(0x1fd)]={},this[_0x25558e(0x1ab)]={},this['_stateOrigin']={};},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x31e)]=function(_0x18eac5){const _0x54e563=_0x5b4c5d;return this['_cache']=this[_0x54e563(0x330)]||{},this[_0x54e563(0x330)][_0x18eac5]!==undefined;},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x26c)]=Game_BattlerBase['prototype']['refresh'],Game_BattlerBase['prototype'][_0x5b4c5d(0x33a)]=function(){const _0x5e936=_0x5b4c5d;this[_0x5e936(0x330)]={},VisuMZ[_0x5e936(0x1f7)][_0x5e936(0x26c)][_0x5e936(0x214)](this);},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x3ae)]=Game_BattlerBase['prototype']['eraseState'],Game_BattlerBase[_0x5b4c5d(0x1c9)]['eraseState']=function(_0x433559){const _0x151373=_0x5b4c5d;let _0x18676f=this[_0x151373(0x1f5)](_0x433559);VisuMZ[_0x151373(0x1f7)][_0x151373(0x3ae)][_0x151373(0x214)](this,_0x433559);if(_0x18676f&&!this[_0x151373(0x1f5)](_0x433559))this['onRemoveState'](_0x433559);},Game_BattlerBase['prototype'][_0x5b4c5d(0x328)]=function(_0x28e28b){const _0x51ba83=_0x5b4c5d;this[_0x51ba83(0x247)](_0x28e28b),this['clearStateDisplay'](_0x28e28b),this[_0x51ba83(0x340)](_0x28e28b);},VisuMZ['SkillsStatesCore'][_0x5b4c5d(0x2b0)]=Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x20e)],Game_BattlerBase['prototype'][_0x5b4c5d(0x20e)]=function(_0x19d866){const _0x4953c2=_0x5b4c5d,_0x4b658c=$dataStates[_0x19d866],_0x43b13f=this['stateTurns'](_0x19d866),_0x255fa5=this[_0x4953c2(0x2a0)](_0x4b658c)[_0x4953c2(0x2fb)]()['trim']();switch(_0x255fa5){case _0x4953c2(0x36d):if(_0x43b13f<=0x0)VisuMZ[_0x4953c2(0x1f7)][_0x4953c2(0x2b0)][_0x4953c2(0x214)](this,_0x19d866);break;case _0x4953c2(0x39d):VisuMZ[_0x4953c2(0x1f7)][_0x4953c2(0x2b0)]['call'](this,_0x19d866);break;case _0x4953c2(0x2e1):VisuMZ['SkillsStatesCore'][_0x4953c2(0x2b0)][_0x4953c2(0x214)](this,_0x19d866),this[_0x4953c2(0x343)][_0x19d866]=Math[_0x4953c2(0x197)](this['_stateTurns'][_0x19d866],_0x43b13f);break;case'add':VisuMZ['SkillsStatesCore']['Game_BattlerBase_resetStateCounts'][_0x4953c2(0x214)](this,_0x19d866),this['_stateTurns'][_0x19d866]+=_0x43b13f;break;default:VisuMZ[_0x4953c2(0x1f7)][_0x4953c2(0x2b0)][_0x4953c2(0x214)](this,_0x19d866);break;}},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x2a0)]=function(_0xc60f36){const _0x5085f8=_0x5b4c5d,_0x4a462d=_0xc60f36[_0x5085f8(0x292)];return _0x4a462d[_0x5085f8(0x310)](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ[_0x5085f8(0x1f7)][_0x5085f8(0x192)][_0x5085f8(0x398)][_0x5085f8(0x1b6)];},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x319)]=Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x2c7)],Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x2c7)]=function(_0x4cbe30,_0x3e0b88){const _0x4ff11e=_0x5b4c5d,_0x6a1e3d=VisuMZ[_0x4ff11e(0x1f7)][_0x4ff11e(0x192)]['Buffs']['ReapplyRules'],_0x3cdfaa=this[_0x4ff11e(0x309)](_0x4cbe30);switch(_0x6a1e3d){case _0x4ff11e(0x36d):if(_0x3cdfaa<=0x0)this['_buffTurns'][_0x4cbe30]=_0x3e0b88;break;case'reset':this[_0x4ff11e(0x31b)][_0x4cbe30]=_0x3e0b88;break;case'greater':this[_0x4ff11e(0x31b)][_0x4cbe30]=Math[_0x4ff11e(0x197)](_0x3cdfaa,_0x3e0b88);break;case _0x4ff11e(0x1b7):this[_0x4ff11e(0x31b)][_0x4cbe30]+=_0x3e0b88;break;default:VisuMZ[_0x4ff11e(0x1f7)][_0x4ff11e(0x319)][_0x4ff11e(0x214)](this,_0x4cbe30,_0x3e0b88);break;}const _0x3edb08=VisuMZ[_0x4ff11e(0x1f7)][_0x4ff11e(0x192)][_0x4ff11e(0x32d)]['MaxTurns'];this['_buffTurns'][_0x4cbe30]=this[_0x4ff11e(0x31b)][_0x4cbe30]['clamp'](0x0,_0x3edb08);},Game_BattlerBase['prototype'][_0x5b4c5d(0x196)]=function(){const _0xa19fb6=_0x5b4c5d;if(this[_0xa19fb6(0x330)]['groupDefeat']!==undefined)return this[_0xa19fb6(0x330)][_0xa19fb6(0x34e)];this[_0xa19fb6(0x330)][_0xa19fb6(0x34e)]=![];const _0x1e576a=this[_0xa19fb6(0x28f)]();for(const _0x29f4a8 of _0x1e576a){if(!_0x29f4a8)continue;if(_0x29f4a8[_0xa19fb6(0x292)][_0xa19fb6(0x310)](/<GROUP DEFEAT>/i)){this[_0xa19fb6(0x330)][_0xa19fb6(0x34e)]=!![];break;}}return this[_0xa19fb6(0x330)][_0xa19fb6(0x34e)];},VisuMZ['SkillsStatesCore']['Game_BattlerBase_clearStates']=Game_BattlerBase['prototype'][_0x5b4c5d(0x345)],Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x345)]=function(){const _0x3e165e=_0x5b4c5d;this['getStateRetainType']()!==''?this[_0x3e165e(0x382)]():(VisuMZ[_0x3e165e(0x1f7)][_0x3e165e(0x207)][_0x3e165e(0x214)](this),this['initMembersSkillsStatesCore']());},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x382)]=function(){const _0x1c4849=_0x5b4c5d,_0xbaf1e3=this[_0x1c4849(0x28f)]();for(const _0x102992 of _0xbaf1e3){if(_0x102992&&this[_0x1c4849(0x1cf)](_0x102992))this[_0x1c4849(0x2ab)](_0x102992['id']);}this[_0x1c4849(0x330)]={};},Game_BattlerBase[_0x5b4c5d(0x1c9)]['canClearState']=function(_0x31bdcf){const _0x141215=_0x5b4c5d,_0x572992=this['getStateRetainType']();if(_0x572992!==''){const _0x2c0528=_0x31bdcf[_0x141215(0x292)];if(_0x572992===_0x141215(0x356)&&_0x2c0528['match'](/<NO DEATH CLEAR>/i))return![];if(_0x572992===_0x141215(0x388)&&_0x2c0528['match'](/<NO RECOVER ALL CLEAR>/i))return![];}return this['isStateAffected'](_0x31bdcf['id']);},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x2fd)]=function(){const _0x1122c5=_0x5b4c5d;return this[_0x1122c5(0x363)];},Game_BattlerBase['prototype'][_0x5b4c5d(0x276)]=function(_0x41b013){const _0x190389=_0x5b4c5d;this[_0x190389(0x363)]=_0x41b013;},Game_BattlerBase[_0x5b4c5d(0x1c9)]['clearStateRetainType']=function(){this['_stateRetainType']='';},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x2fc)]=Game_BattlerBase['prototype']['die'],Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x3b3)]=function(){const _0x4d6b9a=_0x5b4c5d;this[_0x4d6b9a(0x276)]('death'),VisuMZ[_0x4d6b9a(0x1f7)]['Game_BattlerBase_die']['call'](this),this[_0x4d6b9a(0x31d)]();},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x36e)]=Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x242)],Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x242)]=function(){const _0x258c07=_0x5b4c5d;this[_0x258c07(0x276)](_0x258c07(0x388)),VisuMZ[_0x258c07(0x1f7)][_0x258c07(0x36e)][_0x258c07(0x214)](this),this[_0x258c07(0x31d)]();},Game_BattlerBase['prototype'][_0x5b4c5d(0x224)]=function(_0x15e45e){const _0x1ee90e=_0x5b4c5d;for(settings of VisuMZ[_0x1ee90e(0x1f7)][_0x1ee90e(0x192)][_0x1ee90e(0x2b3)]){const _0x43f9ec=settings['CalcJS'][_0x1ee90e(0x214)](this,_0x15e45e);if(!settings[_0x1ee90e(0x266)][_0x1ee90e(0x214)](this,_0x15e45e,_0x43f9ec))return![];}return!![];},Game_BattlerBase['prototype'][_0x5b4c5d(0x2c4)]=function(_0x11bd6b){const _0x49ff02=_0x5b4c5d;for(settings of VisuMZ[_0x49ff02(0x1f7)][_0x49ff02(0x192)][_0x49ff02(0x2b3)]){const _0x3244b0=settings[_0x49ff02(0x1ba)][_0x49ff02(0x214)](this,_0x11bd6b);settings[_0x49ff02(0x240)][_0x49ff02(0x214)](this,_0x11bd6b,_0x3244b0);}},VisuMZ['SkillsStatesCore'][_0x5b4c5d(0x306)]=Game_BattlerBase['prototype'][_0x5b4c5d(0x172)],Game_BattlerBase['prototype'][_0x5b4c5d(0x172)]=function(_0x11891f){const _0x2211c7=_0x5b4c5d;if(!_0x11891f)return![];if(!VisuMZ[_0x2211c7(0x1f7)][_0x2211c7(0x306)][_0x2211c7(0x214)](this,_0x11891f))return![];if(!this[_0x2211c7(0x1b0)](_0x11891f))return![];if(!this[_0x2211c7(0x2e0)](_0x11891f))return![];if(!this[_0x2211c7(0x232)](_0x11891f))return![];return!![];},Game_BattlerBase['prototype'][_0x5b4c5d(0x1b0)]=function(_0x20e3c5){if(!this['checkSkillConditionsSwitchNotetags'](_0x20e3c5))return![];return!![];},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x1af)]=function(_0x4757de){const _0x49f960=_0x5b4c5d,_0x13562e=_0x4757de['note'];if(_0x13562e[_0x49f960(0x310)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x281de2=JSON['parse']('['+RegExp['$1'][_0x49f960(0x310)](/\d+/g)+']');for(const _0x2e6d02 of _0x281de2){if(!$gameSwitches['value'](_0x2e6d02))return![];}return!![];}if(_0x13562e['match'](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3b8fd4=JSON[_0x49f960(0x19d)]('['+RegExp['$1'][_0x49f960(0x310)](/\d+/g)+']');for(const _0x36c9d9 of _0x3b8fd4){if(!$gameSwitches[_0x49f960(0x1d0)](_0x36c9d9))return![];}return!![];}if(_0x13562e[_0x49f960(0x310)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1abd4a=JSON[_0x49f960(0x19d)]('['+RegExp['$1'][_0x49f960(0x310)](/\d+/g)+']');for(const _0x67879b of _0x1abd4a){if($gameSwitches[_0x49f960(0x1d0)](_0x67879b))return!![];}return![];}if(_0x13562e[_0x49f960(0x310)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x237eb0=JSON[_0x49f960(0x19d)]('['+RegExp['$1'][_0x49f960(0x310)](/\d+/g)+']');for(const _0xb3f4f7 of _0x237eb0){if(!$gameSwitches[_0x49f960(0x1d0)](_0xb3f4f7))return!![];}return![];}if(_0x13562e[_0x49f960(0x310)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xe27d73=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x320e54 of _0xe27d73){if(!$gameSwitches['value'](_0x320e54))return!![];}return![];}if(_0x13562e['match'](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x47a644=JSON[_0x49f960(0x19d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1eefd8 of _0x47a644){if($gameSwitches[_0x49f960(0x1d0)](_0x1eefd8))return![];}return!![];}return!![];},Game_BattlerBase[_0x5b4c5d(0x1c9)]['meetsSkillConditionsEnableJS']=function(_0x310aa4){const _0x3a4bdd=_0x5b4c5d,_0x4a06bc=_0x310aa4[_0x3a4bdd(0x292)],_0x336ebe=VisuMZ[_0x3a4bdd(0x1f7)][_0x3a4bdd(0x39a)];return _0x336ebe[_0x310aa4['id']]?_0x336ebe[_0x310aa4['id']][_0x3a4bdd(0x214)](this,_0x310aa4):!![];},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x232)]=function(_0x451711){const _0xd9c39=_0x5b4c5d;return VisuMZ['SkillsStatesCore'][_0xd9c39(0x192)][_0xd9c39(0x3a4)][_0xd9c39(0x31a)]['call'](this,_0x451711);},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x3b9)]=Game_BattlerBase[_0x5b4c5d(0x1c9)]['skillMpCost'],Game_BattlerBase['prototype'][_0x5b4c5d(0x359)]=function(_0x3f87ca){const _0x558f33=_0x5b4c5d;for(settings of VisuMZ[_0x558f33(0x1f7)][_0x558f33(0x192)][_0x558f33(0x2b3)]){if(settings[_0x558f33(0x221)]['toUpperCase']()==='MP')return settings[_0x558f33(0x1ba)][_0x558f33(0x214)](this,_0x3f87ca);}return VisuMZ[_0x558f33(0x1f7)][_0x558f33(0x3b9)][_0x558f33(0x214)](this,_0x3f87ca);},VisuMZ[_0x5b4c5d(0x1f7)]['Game_BattlerBase_skillTpCost']=Game_BattlerBase['prototype'][_0x5b4c5d(0x18d)],Game_BattlerBase['prototype']['skillTpCost']=function(_0x5494ad){const _0x29e6c8=_0x5b4c5d;for(settings of VisuMZ[_0x29e6c8(0x1f7)][_0x29e6c8(0x192)][_0x29e6c8(0x2b3)]){if(settings[_0x29e6c8(0x221)]['toUpperCase']()==='TP')return settings[_0x29e6c8(0x1ba)][_0x29e6c8(0x214)](this,_0x5494ad);}return VisuMZ['SkillsStatesCore']['Game_BattlerBase_skillTpCost'][_0x29e6c8(0x214)](this,_0x5494ad);},Game_BattlerBase['prototype'][_0x5b4c5d(0x327)]=function(_0x12eb38){const _0x100522=_0x5b4c5d;if(typeof _0x12eb38===_0x100522(0x1f6))_0x12eb38=$dataStates[_0x12eb38];return this['states']()['includes'](_0x12eb38);},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x324)]=Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x28f)],Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x28f)]=function(){const _0xa3d5bd=_0x5b4c5d;let _0x4ebb43=VisuMZ[_0xa3d5bd(0x1f7)]['Game_BattlerBase_states'][_0xa3d5bd(0x214)](this);if(this[_0xa3d5bd(0x3ad)])return _0x4ebb43;return this[_0xa3d5bd(0x3ad)]=!![],this[_0xa3d5bd(0x334)](_0x4ebb43),this[_0xa3d5bd(0x3ad)]=undefined,_0x4ebb43;},Game_BattlerBase['prototype']['addPassiveStates']=function(_0x11e26f){const _0x2733e4=_0x5b4c5d,_0x210d51=this[_0x2733e4(0x17f)]();for(state of _0x210d51){if(!state)continue;if(!this[_0x2733e4(0x246)](state)&&_0x11e26f[_0x2733e4(0x3a3)](state))continue;_0x11e26f['push'](state);}_0x210d51[_0x2733e4(0x36c)]>0x0&&_0x11e26f[_0x2733e4(0x390)]((_0x38798b,_0x35d3b3)=>{const _0x201d02=_0x2733e4,_0x32a851=_0x38798b[_0x201d02(0x2f1)],_0x25b83f=_0x35d3b3[_0x201d02(0x2f1)];if(_0x32a851!==_0x25b83f)return _0x25b83f-_0x32a851;return _0x38798b-_0x35d3b3;});},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x246)]=function(_0x3fab2a){return _0x3fab2a['note']['match'](/<PASSIVE STACKABLE>/i);},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x26f)]=function(){const _0xf1b6c=_0x5b4c5d,_0x4a903a=[];for(const _0x2dc96a of this[_0xf1b6c(0x330)][_0xf1b6c(0x17f)]){const _0x27d46f=$dataStates[_0x2dc96a];if(!_0x27d46f)continue;if(!this[_0xf1b6c(0x1a4)](_0x27d46f))continue;_0x4a903a[_0xf1b6c(0x288)](_0x27d46f);}return _0x4a903a;},Game_BattlerBase['prototype'][_0x5b4c5d(0x1a4)]=function(_0x298f6d){const _0x1a26e8=_0x5b4c5d;if(!this['meetsPassiveStateConditionClasses'](_0x298f6d))return![];if(!this[_0x1a26e8(0x2a2)](_0x298f6d))return![];if(!this[_0x1a26e8(0x33c)](_0x298f6d))return![];if(!this[_0x1a26e8(0x296)](_0x298f6d))return![];return!![];},Game_BattlerBase['prototype'][_0x5b4c5d(0x2bf)]=function(_0x3da878){return!![];},Game_Actor[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x2bf)]=function(_0x57771c){const _0x4a0c4f=_0x5b4c5d,_0x3a3ab7=_0x57771c['note'];if(_0x3a3ab7[_0x4a0c4f(0x310)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x4df0ce=String(RegExp['$1'])[_0x4a0c4f(0x3b4)](',')[_0x4a0c4f(0x387)](_0xb8aa45=>_0xb8aa45[_0x4a0c4f(0x2e2)]()),_0x27fb7d=VisuMZ[_0x4a0c4f(0x1f7)][_0x4a0c4f(0x1e4)](_0x4df0ce);return _0x27fb7d[_0x4a0c4f(0x3a3)](this[_0x4a0c4f(0x35b)]());}if(_0x3a3ab7[_0x4a0c4f(0x310)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0x28ff69=String(RegExp['$1'])['split'](',')[_0x4a0c4f(0x387)](_0x473c7d=>_0x473c7d[_0x4a0c4f(0x2e2)]()),_0x33c6f9=VisuMZ['SkillsStatesCore'][_0x4a0c4f(0x1e4)](_0x28ff69);let _0x3219ed=[this[_0x4a0c4f(0x35b)]()];return Imported['VisuMZ_2_ClassChangeSystem']&&this[_0x4a0c4f(0x282)]&&(_0x3219ed=this[_0x4a0c4f(0x282)]()),_0x33c6f9[_0x4a0c4f(0x39e)](_0x50c54d=>_0x3219ed[_0x4a0c4f(0x3a3)](_0x50c54d))['length']>0x0;}return Game_BattlerBase['prototype']['meetsPassiveStateConditionClasses']['call'](this,_0x57771c);},VisuMZ[_0x5b4c5d(0x1f7)]['ParseClassIDs']=function(_0x1fd9c6){const _0x67da66=_0x5b4c5d,_0xf83324=[];for(let _0x524a8b of _0x1fd9c6){_0x524a8b=(String(_0x524a8b)||'')[_0x67da66(0x2e2)]();const _0x249761=/^\d+$/['test'](_0x524a8b);_0x249761?_0xf83324[_0x67da66(0x288)](Number(_0x524a8b)):_0xf83324['push'](DataManager[_0x67da66(0x193)](_0x524a8b));}return _0xf83324[_0x67da66(0x387)](_0x577f52=>$dataClasses[Number(_0x577f52)])[_0x67da66(0x2f9)](null);},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x2a2)]=function(_0x430402){const _0x142f9c=_0x5b4c5d,_0xd955f8=_0x430402[_0x142f9c(0x292)];if(_0xd955f8[_0x142f9c(0x310)](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1422b7=JSON['parse']('['+RegExp['$1'][_0x142f9c(0x310)](/\d+/g)+']');for(const _0x1c7500 of _0x1422b7){if(!$gameSwitches['value'](_0x1c7500))return![];}return!![];}if(_0xd955f8[_0x142f9c(0x310)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x91c283=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x16dfda of _0x91c283){if(!$gameSwitches[_0x142f9c(0x1d0)](_0x16dfda))return![];}return!![];}if(_0xd955f8[_0x142f9c(0x310)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x59f311=JSON[_0x142f9c(0x19d)]('['+RegExp['$1'][_0x142f9c(0x310)](/\d+/g)+']');for(const _0x34fb71 of _0x59f311){if($gameSwitches[_0x142f9c(0x1d0)](_0x34fb71))return!![];}return![];}if(_0xd955f8['match'](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5330e8=JSON['parse']('['+RegExp['$1'][_0x142f9c(0x310)](/\d+/g)+']');for(const _0xd8617 of _0x5330e8){if(!$gameSwitches[_0x142f9c(0x1d0)](_0xd8617))return!![];}return![];}if(_0xd955f8[_0x142f9c(0x310)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2b135d=JSON['parse']('['+RegExp['$1'][_0x142f9c(0x310)](/\d+/g)+']');for(const _0x271339 of _0x2b135d){if(!$gameSwitches[_0x142f9c(0x1d0)](_0x271339))return!![];}return![];}if(_0xd955f8[_0x142f9c(0x310)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1caab1=JSON[_0x142f9c(0x19d)]('['+RegExp['$1'][_0x142f9c(0x310)](/\d+/g)+']');for(const _0x440818 of _0x1caab1){if($gameSwitches[_0x142f9c(0x1d0)](_0x440818))return![];}return!![];}return!![];},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x33c)]=function(_0x22d1bd){const _0x31d90f=_0x5b4c5d,_0x94814a=VisuMZ[_0x31d90f(0x1f7)]['statePassiveConditionJS'];if(_0x94814a[_0x22d1bd['id']]&&!_0x94814a[_0x22d1bd['id']][_0x31d90f(0x214)](this,_0x22d1bd))return![];return!![];},Game_BattlerBase['prototype']['meetsPassiveStateGlobalConditionJS']=function(_0x3e2fb7){const _0x1271ab=_0x5b4c5d;return VisuMZ['SkillsStatesCore']['Settings']['PassiveStates'][_0x1271ab(0x2ea)][_0x1271ab(0x214)](this,_0x3e2fb7);},Game_BattlerBase['prototype'][_0x5b4c5d(0x17f)]=function(){const _0x1854c4=_0x5b4c5d;if(this[_0x1854c4(0x31e)](_0x1854c4(0x17f)))return this[_0x1854c4(0x26f)]();if(this['_checkingVisuMzPassiveStateObjects'])return[];return this[_0x1854c4(0x1d8)]=!![],this[_0x1854c4(0x330)]['passiveStates']=[],this['addPassiveStatesFromOtherPlugins'](),this[_0x1854c4(0x39c)](),this[_0x1854c4(0x335)](),this[_0x1854c4(0x1d8)]=undefined,this[_0x1854c4(0x26f)]();},Game_BattlerBase[_0x5b4c5d(0x1c9)]['addPassiveStatesFromOtherPlugins']=function(){const _0x1c5516=_0x5b4c5d;if(Imported['VisuMZ_1_ElementStatusCore'])this[_0x1c5516(0x205)]();},Game_BattlerBase['prototype'][_0x5b4c5d(0x24a)]=function(){return[];},Game_BattlerBase['prototype']['addPassiveStatesByNotetag']=function(){const _0x45b1df=_0x5b4c5d,_0x544062=this['passiveStateObjects']();for(const _0x570333 of _0x544062){if(!_0x570333)continue;const _0x330a48=_0x570333[_0x45b1df(0x292)][_0x45b1df(0x310)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x330a48)for(const _0x1b25be of _0x330a48){_0x1b25be[_0x45b1df(0x310)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x2a9e32=RegExp['$1'];if(_0x2a9e32[_0x45b1df(0x310)](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x234c4b=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');this[_0x45b1df(0x330)][_0x45b1df(0x17f)]=this[_0x45b1df(0x330)]['passiveStates'][_0x45b1df(0x2d1)](_0x234c4b);}else{const _0x41ae1b=_0x2a9e32['split'](',');for(const _0x4e83e0 of _0x41ae1b){const _0x4637e6=DataManager[_0x45b1df(0x1a1)](_0x4e83e0);if(_0x4637e6)this[_0x45b1df(0x330)][_0x45b1df(0x17f)]['push'](_0x4637e6);}}}}},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x335)]=function(){const _0x51b1ee=_0x5b4c5d,_0x29570e=VisuMZ[_0x51b1ee(0x1f7)]['Settings'][_0x51b1ee(0x302)][_0x51b1ee(0x2ad)];this[_0x51b1ee(0x330)][_0x51b1ee(0x17f)]=this[_0x51b1ee(0x330)][_0x51b1ee(0x17f)][_0x51b1ee(0x2d1)](_0x29570e);},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x3a6)]=function(_0x740faf){const _0x4346c2=_0x5b4c5d;if(typeof _0x740faf!==_0x4346c2(0x1f6))_0x740faf=_0x740faf['id'];return this[_0x4346c2(0x343)][_0x740faf]||0x0;},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x2cd)]=function(_0x38c8a3,_0x601d53){const _0x424231=_0x5b4c5d;if(typeof _0x38c8a3!=='number')_0x38c8a3=_0x38c8a3['id'];if(this['isStateAffected'](_0x38c8a3)){const _0xed1a7=DataManager[_0x424231(0x23b)](_0x38c8a3);this['_stateTurns'][_0x38c8a3]=_0x601d53['clamp'](0x0,_0xed1a7);if(this[_0x424231(0x343)][_0x38c8a3]<=0x0)this[_0x424231(0x2e6)](_0x38c8a3);}},Game_BattlerBase['prototype'][_0x5b4c5d(0x304)]=function(_0x1e07f7,_0x4b4a57){const _0x1be38b=_0x5b4c5d;if(typeof _0x1e07f7!==_0x1be38b(0x1f6))_0x1e07f7=_0x1e07f7['id'];this[_0x1be38b(0x1f5)](_0x1e07f7)&&(_0x4b4a57+=this[_0x1be38b(0x3a6)](_0x1e07f7),this['setStateTurns'](_0x1e07f7,_0x4b4a57));},VisuMZ['SkillsStatesCore'][_0x5b4c5d(0x176)]=Game_BattlerBase['prototype'][_0x5b4c5d(0x30d)],Game_BattlerBase['prototype']['eraseBuff']=function(_0x1d5f4b){const _0x248c6d=_0x5b4c5d,_0xa9122=this[_0x248c6d(0x373)][_0x1d5f4b];VisuMZ[_0x248c6d(0x1f7)]['Game_BattlerBase_eraseBuff']['call'](this,_0x1d5f4b);if(_0xa9122>0x0)this['onEraseBuff'](_0x1d5f4b);if(_0xa9122<0x0)this['onEraseDebuff'](_0x1d5f4b);},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x277)]=Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x361)],Game_BattlerBase['prototype']['increaseBuff']=function(_0x2bb83d){const _0x300bf6=_0x5b4c5d;VisuMZ['SkillsStatesCore'][_0x300bf6(0x277)][_0x300bf6(0x214)](this,_0x2bb83d);if(!this[_0x300bf6(0x2c6)](_0x2bb83d))this[_0x300bf6(0x30d)](_0x2bb83d);},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x1dc)]=Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x2de)],Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x2de)]=function(_0x18bef8){const _0x4942e=_0x5b4c5d;VisuMZ['SkillsStatesCore']['Game_BattlerBase_decreaseBuff'][_0x4942e(0x214)](this,_0x18bef8);if(!this['isBuffOrDebuffAffected'](_0x18bef8))this['eraseBuff'](_0x18bef8);},Game_BattlerBase['prototype']['onEraseBuff']=function(_0x41c348){},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x260)]=function(_0x19f87c){},Game_BattlerBase['prototype'][_0x5b4c5d(0x347)]=function(_0x48de19){const _0x5b24f5=_0x5b4c5d;return this[_0x5b24f5(0x373)][_0x48de19]===VisuMZ[_0x5b24f5(0x1f7)]['Settings'][_0x5b24f5(0x32d)][_0x5b24f5(0x1ce)];},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x321)]=function(_0x293dbb){const _0x2a1b27=_0x5b4c5d;return this[_0x2a1b27(0x373)][_0x293dbb]===-VisuMZ[_0x2a1b27(0x1f7)][_0x2a1b27(0x192)][_0x2a1b27(0x32d)][_0x2a1b27(0x366)];},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x37d)]=Game_BattlerBase['prototype'][_0x5b4c5d(0x211)],Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x211)]=function(_0x1b882a,_0x35d6bb){const _0x4df576=_0x5b4c5d;return _0x1b882a=_0x1b882a[_0x4df576(0x3ab)](-0x2,0x2),VisuMZ[_0x4df576(0x1f7)][_0x4df576(0x37d)][_0x4df576(0x214)](this,_0x1b882a,_0x35d6bb);},Game_BattlerBase[_0x5b4c5d(0x1c9)]['paramBuffRate']=function(_0x24cfe7){const _0x4795e6=_0x5b4c5d,_0x3a5553=this['_buffs'][_0x24cfe7];return VisuMZ[_0x4795e6(0x1f7)][_0x4795e6(0x192)][_0x4795e6(0x32d)][_0x4795e6(0x291)]['call'](this,_0x24cfe7,_0x3a5553);},Game_BattlerBase['prototype'][_0x5b4c5d(0x309)]=function(_0x1543d4){const _0x309c66=_0x5b4c5d;return this[_0x309c66(0x31b)][_0x1543d4]||0x0;},Game_BattlerBase[_0x5b4c5d(0x1c9)]['debuffTurns']=function(_0x282e8c){return this['buffTurns'](_0x282e8c);},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x20d)]=function(_0x2ae460,_0x580aa6){const _0x384714=_0x5b4c5d;if(this[_0x384714(0x23f)](_0x2ae460)){const _0x556290=VisuMZ[_0x384714(0x1f7)][_0x384714(0x192)][_0x384714(0x32d)][_0x384714(0x1db)];this[_0x384714(0x31b)][_0x2ae460]=_0x580aa6[_0x384714(0x3ab)](0x0,_0x556290);}},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x374)]=function(_0x4534fd,_0x3f73d1){const _0x56cb66=_0x5b4c5d;this[_0x56cb66(0x23f)](_0x4534fd)&&(_0x3f73d1+=this[_0x56cb66(0x309)](stateId),this[_0x56cb66(0x2cd)](_0x4534fd,_0x3f73d1));},Game_BattlerBase['prototype'][_0x5b4c5d(0x256)]=function(_0x37a72b,_0x493ad6){const _0x1ab282=_0x5b4c5d;if(this[_0x1ab282(0x30e)](_0x37a72b)){const _0x4944fe=VisuMZ[_0x1ab282(0x1f7)][_0x1ab282(0x192)][_0x1ab282(0x32d)][_0x1ab282(0x1db)];this[_0x1ab282(0x31b)][_0x37a72b]=_0x493ad6[_0x1ab282(0x3ab)](0x0,_0x4944fe);}},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x26e)]=function(_0x2099b5,_0x2f27cf){const _0x166778=_0x5b4c5d;this[_0x166778(0x30e)](_0x2099b5)&&(_0x2f27cf+=this[_0x166778(0x309)](stateId),this['setStateTurns'](_0x2099b5,_0x2f27cf));},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x307)]=function(_0x1dc3b5){const _0xfb3554=_0x5b4c5d;if(typeof _0x1dc3b5!==_0xfb3554(0x1f6))_0x1dc3b5=_0x1dc3b5['id'];return this[_0xfb3554(0x1fd)]=this['_stateData']||{},this[_0xfb3554(0x1fd)][_0x1dc3b5]=this[_0xfb3554(0x1fd)][_0x1dc3b5]||{},this[_0xfb3554(0x1fd)][_0x1dc3b5];},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x18a)]=function(_0x35551e,_0xcaa61c){const _0x380ead=_0x5b4c5d;if(typeof _0x35551e!==_0x380ead(0x1f6))_0x35551e=_0x35551e['id'];const _0x1f4fd8=this['stateData'](_0x35551e);return _0x1f4fd8[_0xcaa61c];},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x195)]=function(_0x565a29,_0x2b3516,_0x1ebe3){const _0xde67b3=_0x5b4c5d;if(typeof _0x565a29!==_0xde67b3(0x1f6))_0x565a29=_0x565a29['id'];const _0x19df49=this[_0xde67b3(0x307)](_0x565a29);_0x19df49[_0x2b3516]=_0x1ebe3;},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x247)]=function(_0x1d13e2){const _0x1f3baa=_0x5b4c5d;if(typeof _0x1d13e2!==_0x1f3baa(0x1f6))_0x1d13e2=_0x1d13e2['id'];this[_0x1f3baa(0x1fd)]=this[_0x1f3baa(0x1fd)]||{},this['_stateData'][_0x1d13e2]={};},Game_BattlerBase[_0x5b4c5d(0x1c9)]['getStateDisplay']=function(_0x5d8b17){const _0x23f9dd=_0x5b4c5d;if(typeof _0x5d8b17!==_0x23f9dd(0x1f6))_0x5d8b17=_0x5d8b17['id'];return this['_stateDisplay']=this[_0x23f9dd(0x1ab)]||{},this[_0x23f9dd(0x1ab)][_0x5d8b17]===undefined&&(this[_0x23f9dd(0x1ab)][_0x5d8b17]=''),this[_0x23f9dd(0x1ab)][_0x5d8b17];},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x251)]=function(_0x440674,_0x203f55){const _0x305ed8=_0x5b4c5d;if(typeof _0x440674!==_0x305ed8(0x1f6))_0x440674=_0x440674['id'];this[_0x305ed8(0x1ab)]=this[_0x305ed8(0x1ab)]||{},this[_0x305ed8(0x1ab)][_0x440674]=_0x203f55;},Game_BattlerBase['prototype'][_0x5b4c5d(0x1ad)]=function(_0x36c511){const _0x5406ca=_0x5b4c5d;if(typeof _0x36c511!==_0x5406ca(0x1f6))_0x36c511=_0x36c511['id'];this[_0x5406ca(0x1ab)]=this[_0x5406ca(0x1ab)]||{},this[_0x5406ca(0x1ab)][_0x36c511]='';},Game_BattlerBase['prototype'][_0x5b4c5d(0x2cb)]=function(_0x382b0f){const _0x1b14ad=_0x5b4c5d;if(typeof _0x382b0f!==_0x1b14ad(0x1f6))_0x382b0f=_0x382b0f['id'];this[_0x1b14ad(0x235)]=this[_0x1b14ad(0x235)]||{},this[_0x1b14ad(0x235)][_0x382b0f]=this[_0x1b14ad(0x235)][_0x382b0f]||_0x1b14ad(0x2eb);const _0x5b0457=this[_0x1b14ad(0x235)][_0x382b0f];return this[_0x1b14ad(0x1be)](_0x5b0457);},Game_BattlerBase['prototype'][_0x5b4c5d(0x25f)]=function(_0x2735ea,_0x606b05){const _0x4fecb7=_0x5b4c5d;this[_0x4fecb7(0x235)]=this[_0x4fecb7(0x235)]||{};const _0x25fd65=_0x606b05?this[_0x4fecb7(0x18e)](_0x606b05):this[_0x4fecb7(0x2b7)]();this[_0x4fecb7(0x235)][_0x2735ea]=_0x25fd65;},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x340)]=function(_0x2d398a){const _0x5c0a45=_0x5b4c5d;this[_0x5c0a45(0x235)]=this[_0x5c0a45(0x235)]||{},delete this['_stateOrigin'][_0x2d398a];},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x2b7)]=function(){const _0x2a535a=_0x5b4c5d,_0x4bcaea=this['getCurrentStateActiveUser']();return this[_0x2a535a(0x18e)](_0x4bcaea);},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x28c)]=function(){const _0x47ec83=_0x5b4c5d;if($gameParty[_0x47ec83(0x368)]()){if(BattleManager[_0x47ec83(0x28e)])return BattleManager[_0x47ec83(0x28e)];else{if(BattleManager[_0x47ec83(0x1c7)])return BattleManager['_currentActor'];}}else{const _0x21ec40=SceneManager[_0x47ec83(0x19b)];if(![Scene_Map,Scene_Item][_0x47ec83(0x3a3)](_0x21ec40[_0x47ec83(0x35f)]))return $gameParty[_0x47ec83(0x3b0)]();}return this;},Game_BattlerBase[_0x5b4c5d(0x1c9)]['convertTargetToStateOriginKey']=function(_0x5d429b){const _0x4b7e8b=_0x5b4c5d;if(!_0x5d429b)return'user';if(_0x5d429b[_0x4b7e8b(0x381)]())return'<actor-%1>'[_0x4b7e8b(0x1ff)](_0x5d429b[_0x4b7e8b(0x263)]());else{const _0x116394=_0x4b7e8b(0x26a)['format'](_0x5d429b['enemyId']()),_0x36441f=_0x4b7e8b(0x21c)['format'](_0x5d429b['index']()),_0x1e3f7b=_0x4b7e8b(0x37a)[_0x4b7e8b(0x1ff)]($gameTroop[_0x4b7e8b(0x33f)]());return _0x4b7e8b(0x34c)[_0x4b7e8b(0x1ff)](_0x116394,_0x36441f,_0x1e3f7b);}return _0x4b7e8b(0x2eb);},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x1be)]=function(_0x569e71){const _0x53a935=_0x5b4c5d;if(_0x569e71===_0x53a935(0x2eb))return this;else{if(_0x569e71[_0x53a935(0x310)](/<actor-(\d+)>/i))return $gameActors[_0x53a935(0x1ae)](Number(RegExp['$1']));else{if($gameParty[_0x53a935(0x368)]()&&_0x569e71['match'](/<troop-(\d+)>/i)){const _0xac5455=Number(RegExp['$1']);if(_0xac5455===$gameTroop['getCurrentTroopUniqueID']()){if(_0x569e71[_0x53a935(0x310)](/<member-(\d+)>/i))return $gameTroop[_0x53a935(0x218)]()[Number(RegExp['$1'])];}}if(_0x569e71[_0x53a935(0x310)](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}return this;},VisuMZ['SkillsStatesCore'][_0x5b4c5d(0x34a)]=Game_Battler[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x1da)],Game_Battler[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x1da)]=function(_0x2e214e){const _0x141415=_0x5b4c5d,_0x1d3668=this[_0x141415(0x24e)](_0x2e214e);VisuMZ['SkillsStatesCore'][_0x141415(0x34a)][_0x141415(0x214)](this,_0x2e214e);if(_0x1d3668&&this[_0x141415(0x327)]($dataStates[_0x2e214e])){this['onAddState'](_0x2e214e);;}},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x395)]=Game_Battler[_0x5b4c5d(0x1c9)]['isStateAddable'],Game_Battler['prototype']['isStateAddable']=function(_0x17d8e4){const _0xc216da=_0x5b4c5d,_0x365cf8=$dataStates[_0x17d8e4];if(_0x365cf8&&_0x365cf8['note'][_0xc216da(0x310)](/<NO DEATH CLEAR>/i))return!this[_0xc216da(0x1e8)](_0x17d8e4)&&!this[_0xc216da(0x2c5)](_0x17d8e4)&&!this[_0xc216da(0x2f2)][_0xc216da(0x323)](_0x17d8e4);return VisuMZ[_0xc216da(0x1f7)][_0xc216da(0x395)][_0xc216da(0x214)](this,_0x17d8e4);},Game_Battler[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x189)]=function(_0x1621c5){const _0x2e0e23=_0x5b4c5d;this[_0x2e0e23(0x25f)](_0x1621c5),this[_0x2e0e23(0x19a)](_0x1621c5),this['onAddStateCustomJS'](_0x1621c5),this[_0x2e0e23(0x1d2)](_0x1621c5);},Game_Battler[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x328)]=function(_0x1468f8){const _0x234358=_0x5b4c5d;Game_BattlerBase[_0x234358(0x1c9)]['onRemoveState'][_0x234358(0x214)](this,_0x1468f8),this[_0x234358(0x27b)](_0x1468f8),this['onEraseStateGlobalJS'](_0x1468f8);},Game_Battler[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x290)]=function(_0x19f7e7){const _0x507f12=_0x5b4c5d;for(const _0x40497b of this['states']()){this[_0x507f12(0x305)](_0x40497b['id'])&&_0x40497b[_0x507f12(0x2da)]===_0x19f7e7&&(this[_0x507f12(0x2e6)](_0x40497b['id']),this['onExpireState'](_0x40497b['id']),this[_0x507f12(0x312)](_0x40497b['id']));}},Game_Battler[_0x5b4c5d(0x1c9)]['onExpireState']=function(_0x199290){this['onExpireStateCustomJS'](_0x199290);},Game_Battler['prototype'][_0x5b4c5d(0x2ce)]=function(_0xe4ebc1){const _0x18a0a0=_0x5b4c5d,_0x520d4d=VisuMZ['SkillsStatesCore'][_0x18a0a0(0x283)];if(_0x520d4d[_0xe4ebc1])_0x520d4d[_0xe4ebc1][_0x18a0a0(0x214)](this,_0xe4ebc1);},Game_Battler[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x27b)]=function(_0x248b2f){const _0x1dba77=_0x5b4c5d,_0x4c412d=VisuMZ[_0x1dba77(0x1f7)][_0x1dba77(0x339)];if(_0x4c412d[_0x248b2f])_0x4c412d[_0x248b2f][_0x1dba77(0x214)](this,_0x248b2f);},Game_Battler[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x1e9)]=function(_0x2083d7){const _0x28c53e=_0x5b4c5d,_0x2f9f65=VisuMZ[_0x28c53e(0x1f7)][_0x28c53e(0x1ee)];if(_0x2f9f65[_0x2083d7])_0x2f9f65[_0x2083d7][_0x28c53e(0x214)](this,_0x2083d7);},Game_Battler[_0x5b4c5d(0x1c9)]['onAddStateGlobalJS']=function(_0xd792f){const _0x1963bd=_0x5b4c5d;try{VisuMZ[_0x1963bd(0x1f7)][_0x1963bd(0x192)]['States'][_0x1963bd(0x2a7)][_0x1963bd(0x214)](this,_0xd792f);}catch(_0x5caba9){if($gameTemp['isPlaytest']())console[_0x1963bd(0x270)](_0x5caba9);}},Game_Battler[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x261)]=function(_0x1a9f5d){const _0x433f4e=_0x5b4c5d;try{VisuMZ[_0x433f4e(0x1f7)][_0x433f4e(0x192)][_0x433f4e(0x398)][_0x433f4e(0x3aa)][_0x433f4e(0x214)](this,_0x1a9f5d);}catch(_0x899754){if($gameTemp[_0x433f4e(0x1d9)]())console[_0x433f4e(0x270)](_0x899754);}},Game_Battler[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x312)]=function(_0x53f080){const _0x1bf78a=_0x5b4c5d;try{VisuMZ[_0x1bf78a(0x1f7)][_0x1bf78a(0x192)]['States'][_0x1bf78a(0x350)][_0x1bf78a(0x214)](this,_0x53f080);}catch(_0x5a6a66){if($gameTemp[_0x1bf78a(0x1d9)]())console[_0x1bf78a(0x270)](_0x5a6a66);}},Game_Battler[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x199)]=function(_0x386f11){const _0x45513d=_0x5b4c5d;return _0x386f11=_0x386f11[_0x45513d(0x386)]()[_0x45513d(0x2e2)](),this[_0x45513d(0x28f)]()[_0x45513d(0x39e)](_0x567ede=>_0x567ede['categories'][_0x45513d(0x3a3)](_0x386f11));},Game_Battler['prototype'][_0x5b4c5d(0x2bc)]=function(_0x268494,_0x475f5b){const _0x470127=_0x5b4c5d;_0x268494=_0x268494[_0x470127(0x386)]()[_0x470127(0x2e2)](),_0x475f5b=_0x475f5b||0x0;const _0x5bd1bc=this[_0x470127(0x199)](_0x268494),_0x4a681c=[];for(const _0x70c776 of _0x5bd1bc){if(!_0x70c776)continue;if(_0x475f5b<=0x0)return;_0x4a681c[_0x470127(0x288)](_0x70c776['id']),this[_0x470127(0x2f2)][_0x470127(0x1f3)]=!![],_0x475f5b--;}while(_0x4a681c[_0x470127(0x36c)]>0x0){this[_0x470127(0x2e6)](_0x4a681c[_0x470127(0x258)]());}},Game_Battler['prototype'][_0x5b4c5d(0x3bc)]=function(_0x210077){const _0x3160e4=_0x5b4c5d;_0x210077=_0x210077['toUpperCase']()[_0x3160e4(0x2e2)]();const _0x586b66=this[_0x3160e4(0x199)](_0x210077),_0x3ffc90=[];for(const _0x1bdc17 of _0x586b66){if(!_0x1bdc17)continue;_0x3ffc90[_0x3160e4(0x288)](_0x1bdc17['id']),this[_0x3160e4(0x2f2)][_0x3160e4(0x1f3)]=!![];}while(_0x3ffc90[_0x3160e4(0x36c)]>0x0){this[_0x3160e4(0x2e6)](_0x3ffc90[_0x3160e4(0x258)]());}},Game_Battler[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x325)]=function(_0x1d7159){const _0x99ef4b=_0x5b4c5d;return this[_0x99ef4b(0x2ec)](_0x1d7159)>0x0;},Game_Battler[_0x5b4c5d(0x1c9)]['hasStateCategory']=function(_0x17f1e0){const _0x3ab34a=_0x5b4c5d;return this[_0x3ab34a(0x289)](_0x17f1e0)>0x0;},Game_Battler[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x2ec)]=function(_0xfe643b){const _0x3583e4=_0x5b4c5d,_0x3fb802=this[_0x3583e4(0x199)](_0xfe643b)[_0x3583e4(0x39e)](_0x4543a2=>this[_0x3583e4(0x1f5)](_0x4543a2['id']));return _0x3fb802[_0x3583e4(0x36c)];},Game_Battler['prototype'][_0x5b4c5d(0x289)]=function(_0x16f5b1){const _0x16af99=_0x5b4c5d,_0x76a96e=this['statesByCategory'](_0x16f5b1);return _0x76a96e[_0x16af99(0x36c)];},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x238)]=Game_Battler['prototype'][_0x5b4c5d(0x35a)],Game_Battler['prototype'][_0x5b4c5d(0x35a)]=function(_0xe271ec,_0x54069d){const _0x3e0560=_0x5b4c5d;VisuMZ['SkillsStatesCore'][_0x3e0560(0x238)]['call'](this,_0xe271ec,_0x54069d),this['isBuffAffected'](_0xe271ec)&&this['onAddBuff'](_0xe271ec,_0x54069d);},Game_Battler[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x212)]=function(_0x2b695c){},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x21a)]=Game_Battler['prototype'][_0x5b4c5d(0x183)],Game_Battler[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x183)]=function(_0xf91aa9,_0x562ee9){const _0x240679=_0x5b4c5d;VisuMZ[_0x240679(0x1f7)][_0x240679(0x21a)][_0x240679(0x214)](this,_0xf91aa9,_0x562ee9),this[_0x240679(0x30e)](_0xf91aa9)&&this[_0x240679(0x32c)](_0xf91aa9,_0x562ee9);},Game_Battler[_0x5b4c5d(0x1c9)]['removeBuffsAuto']=function(){const _0x3fc980=_0x5b4c5d;for(let _0x35e126=0x0;_0x35e126<this[_0x3fc980(0x25c)]();_0x35e126++){if(this['isBuffExpired'](_0x35e126)){const _0x3cf223=this[_0x3fc980(0x373)][_0x35e126];this[_0x3fc980(0x2ca)](_0x35e126);if(_0x3cf223>0x0)this[_0x3fc980(0x2dd)](_0x35e126);if(_0x3cf223<0x0)this['onExpireDebuff'](_0x35e126);}}},Game_Battler[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x279)]=function(_0x1f0673,_0x577120){this['onAddBuffGlobalJS'](_0x1f0673,_0x577120);},Game_Battler['prototype'][_0x5b4c5d(0x32c)]=function(_0x1308ab,_0x479f4c){const _0x2ea4a1=_0x5b4c5d;this[_0x2ea4a1(0x267)](_0x1308ab,_0x479f4c);},Game_Battler[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x3be)]=function(_0x223113){const _0x114155=_0x5b4c5d;Game_BattlerBase[_0x114155(0x1c9)][_0x114155(0x3be)][_0x114155(0x214)](this,_0x223113),this[_0x114155(0x3a5)](_0x223113);},Game_Battler[_0x5b4c5d(0x1c9)]['onEraseDebuff']=function(_0xb4e54f){const _0x2aecc8=_0x5b4c5d;Game_BattlerBase['prototype'][_0x2aecc8(0x260)][_0x2aecc8(0x214)](this,_0xb4e54f),this['onEraseDebuffGlobalJS'](_0xb4e54f);},Game_Battler[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x2dd)]=function(_0x7cc7c6){this['onExpireBuffGlobalJS'](_0x7cc7c6);},Game_Battler[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x262)]=function(_0x448ce3){const _0x1c1e44=_0x5b4c5d;this[_0x1c1e44(0x241)](_0x448ce3);},Game_Battler['prototype'][_0x5b4c5d(0x274)]=function(_0x336c64,_0x854956){const _0x555834=_0x5b4c5d;VisuMZ['SkillsStatesCore'][_0x555834(0x192)][_0x555834(0x32d)][_0x555834(0x2f6)][_0x555834(0x214)](this,_0x336c64,_0x854956);},Game_Battler[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x267)]=function(_0x4b4234,_0x14720f){const _0xb34ea8=_0x5b4c5d;VisuMZ[_0xb34ea8(0x1f7)][_0xb34ea8(0x192)]['Buffs'][_0xb34ea8(0x1d3)][_0xb34ea8(0x214)](this,_0x4b4234,_0x14720f);},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x3a5)]=function(_0x5ec201){const _0xe12207=_0x5b4c5d;VisuMZ[_0xe12207(0x1f7)][_0xe12207(0x192)][_0xe12207(0x32d)]['onEraseBuffJS']['call'](this,_0x5ec201);},Game_BattlerBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x303)]=function(_0x6a388a){const _0x17971d=_0x5b4c5d;VisuMZ['SkillsStatesCore'][_0x17971d(0x192)][_0x17971d(0x32d)]['onEraseDebuffJS'][_0x17971d(0x214)](this,_0x6a388a);},Game_Battler[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x2b4)]=function(_0x42baff){const _0x21642b=_0x5b4c5d;VisuMZ['SkillsStatesCore']['Settings'][_0x21642b(0x32d)]['onExpireBuffJS'][_0x21642b(0x214)](this,_0x42baff);},Game_Battler[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x241)]=function(_0x45bb13){const _0x333aea=_0x5b4c5d;VisuMZ['SkillsStatesCore'][_0x333aea(0x192)][_0x333aea(0x32d)]['onExpireDebuffJS'][_0x333aea(0x214)](this,_0x45bb13);},Game_Battler[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x19a)]=function(_0x2bede7){const _0x5533ad=_0x5b4c5d,_0x3b9a7a=VisuMZ[_0x5533ad(0x1f7)],_0x4a497e=['stateHpSlipDamageJS',_0x5533ad(0x2c0),'stateMpSlipDamageJS',_0x5533ad(0x1b4),'stateTpSlipDamageJS',_0x5533ad(0x29a)];for(const _0x5897b5 of _0x4a497e){_0x3b9a7a[_0x5897b5][_0x2bede7]&&_0x3b9a7a[_0x5897b5][_0x2bede7]['call'](this,_0x2bede7);}},VisuMZ['SkillsStatesCore'][_0x5b4c5d(0x2f4)]=Game_Battler[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x2e7)],Game_Battler['prototype'][_0x5b4c5d(0x2e7)]=function(){const _0x4bd339=_0x5b4c5d;this[_0x4bd339(0x19f)](),VisuMZ[_0x4bd339(0x1f7)]['Game_Battler_regenerateAll'][_0x4bd339(0x214)](this),this[_0x4bd339(0x3bd)](),this[_0x4bd339(0x3a2)]();},Game_Battler[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x3bd)]=function(){const _0x18f65e=_0x5b4c5d;for(const _0x57ac7b of this[_0x18f65e(0x17f)]()){if(!_0x57ac7b)continue;this[_0x18f65e(0x19a)](_0x57ac7b['id']);}},Game_Battler['prototype'][_0x5b4c5d(0x19f)]=function(){const _0x12d554=_0x5b4c5d;for(const _0x588a6e of this[_0x12d554(0x28f)]()){if(!_0x588a6e)continue;_0x588a6e[_0x12d554(0x292)][_0x12d554(0x310)](/<JS SLIP REFRESH>/i)&&this['onAddStateMakeCustomSlipValues'](_0x588a6e['id']);}},Game_Battler['prototype'][_0x5b4c5d(0x3a2)]=function(){const _0x4cbd89=_0x5b4c5d;if(!this[_0x4cbd89(0x1c5)]())return;const _0x153159=this[_0x4cbd89(0x28f)]();for(const _0x6c0b7d of _0x153159){if(!_0x6c0b7d)continue;this[_0x4cbd89(0x337)](_0x6c0b7d);}},Game_Battler[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x337)]=function(_0x344db1){const _0xb114bc=_0x5b4c5d,_0x1c308d=this[_0xb114bc(0x18a)](_0x344db1['id'],_0xb114bc(0x2c1))||0x0,_0x1f3692=-this['maxSlipDamage'](),_0x1ab2f4=Math['max'](_0x1c308d,_0x1f3692);if(_0x1ab2f4!==0x0)this[_0xb114bc(0x2f5)](_0x1ab2f4);const _0x3528e4=this[_0xb114bc(0x18a)](_0x344db1['id'],_0xb114bc(0x190))||0x0;if(_0x3528e4!==0x0)this[_0xb114bc(0x294)](_0x3528e4);const _0xfa2fc0=this[_0xb114bc(0x18a)](_0x344db1['id'],_0xb114bc(0x178))||0x0;if(_0xfa2fc0!==0x0)this[_0xb114bc(0x33b)](_0xfa2fc0);},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x3b6)]=Game_Actor[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x27d)],Game_Actor[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x27d)]=function(){const _0x1a4d15=_0x5b4c5d,_0x527e28=VisuMZ[_0x1a4d15(0x1f7)]['Game_Actor_skillTypes']['call'](this),_0x3169a1=VisuMZ['SkillsStatesCore'][_0x1a4d15(0x192)][_0x1a4d15(0x3a4)];let _0x3718f1=_0x3169a1[_0x1a4d15(0x24f)];return $gameParty[_0x1a4d15(0x368)]()&&(_0x3718f1=_0x3718f1[_0x1a4d15(0x2d1)](_0x3169a1[_0x1a4d15(0x311)])),_0x527e28[_0x1a4d15(0x39e)](_0x154c47=>!_0x3718f1[_0x1a4d15(0x3a3)](_0x154c47));},Game_Actor[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x2af)]=function(){const _0x45165d=_0x5b4c5d;return this[_0x45165d(0x1d5)]()['filter'](_0x299f3f=>this[_0x45165d(0x1c3)](_0x299f3f));},Game_Actor[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x1c3)]=function(_0x328dde){const _0x2aed32=_0x5b4c5d;if(!this[_0x2aed32(0x3b1)](_0x328dde))return![];const _0x242338=this[_0x2aed32(0x27d)](),_0x362c1c=DataManager['getSkillTypes'](_0x328dde),_0x5826f8=_0x242338[_0x2aed32(0x39e)](_0x59cd21=>_0x362c1c[_0x2aed32(0x3a3)](_0x59cd21));return _0x5826f8[_0x2aed32(0x36c)]>0x0;},Game_Actor[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x24a)]=function(){const _0x47d100=_0x5b4c5d;let _0x57befb=[this[_0x47d100(0x1ae)](),this[_0x47d100(0x35b)]()];_0x57befb=_0x57befb[_0x47d100(0x2d1)](this[_0x47d100(0x320)]()[_0x47d100(0x39e)](_0x3b7ccc=>_0x3b7ccc));for(const _0xb5383 of this[_0x47d100(0x38a)]){const _0x4892e8=$dataSkills[_0xb5383];if(_0x4892e8)_0x57befb['push'](_0x4892e8);}return _0x57befb;},Game_Actor[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x335)]=function(){const _0x482e64=_0x5b4c5d;Game_Battler[_0x482e64(0x1c9)][_0x482e64(0x335)][_0x482e64(0x214)](this);const _0x3c185c=VisuMZ[_0x482e64(0x1f7)][_0x482e64(0x192)]['PassiveStates'][_0x482e64(0x38d)];this[_0x482e64(0x330)]['passiveStates']=this['_cache'][_0x482e64(0x17f)]['concat'](_0x3c185c);},VisuMZ[_0x5b4c5d(0x1f7)]['Game_Actor_learnSkill']=Game_Actor[_0x5b4c5d(0x1c9)]['learnSkill'],Game_Actor[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x1e6)]=function(_0x3f0705){const _0x5891ca=_0x5b4c5d;VisuMZ['SkillsStatesCore'][_0x5891ca(0x209)]['call'](this,_0x3f0705),this['_cache']={};},VisuMZ['SkillsStatesCore'][_0x5b4c5d(0x354)]=Game_Actor[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x1fa)],Game_Actor[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x1fa)]=function(_0x164a6a){const _0x3ed6d7=_0x5b4c5d;VisuMZ[_0x3ed6d7(0x1f7)][_0x3ed6d7(0x354)][_0x3ed6d7(0x214)](this,_0x164a6a),this['_cache']={};},Game_Enemy['prototype']['passiveStateObjects']=function(){const _0x54144e=_0x5b4c5d;let _0x10e874=[this[_0x54144e(0x1ac)]()];return _0x10e874[_0x54144e(0x2d1)](this[_0x54144e(0x1d5)]());},Game_Enemy[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x335)]=function(){const _0x5616ef=_0x5b4c5d;Game_Battler['prototype'][_0x5616ef(0x335)][_0x5616ef(0x214)](this);const _0x242e48=VisuMZ['SkillsStatesCore'][_0x5616ef(0x192)][_0x5616ef(0x302)][_0x5616ef(0x2e9)];this['_cache'][_0x5616ef(0x17f)]=this['_cache'][_0x5616ef(0x17f)][_0x5616ef(0x2d1)](_0x242e48);},Game_Enemy[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x1d5)]=function(){const _0x3af567=_0x5b4c5d,_0x2fcfc4=[];for(const _0x3b94d8 of this[_0x3af567(0x1ac)]()[_0x3af567(0x32b)]){const _0x390091=$dataSkills[_0x3b94d8['skillId']];if(_0x390091&&!_0x2fcfc4['includes'](_0x390091))_0x2fcfc4[_0x3af567(0x288)](_0x390091);}return _0x2fcfc4;},Game_Enemy[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x26d)]=function(_0x1bdb81){return this['hasState']($dataStates[_0x1bdb81]);},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x27c)]=Game_Unit[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x17c)],Game_Unit[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x17c)]=function(){const _0x317264=_0x5b4c5d;if(this[_0x317264(0x217)]())return!![];return VisuMZ[_0x317264(0x1f7)][_0x317264(0x27c)]['call'](this);},Game_Unit[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x217)]=function(){const _0x1a989d=_0x5b4c5d,_0x3aec74=this[_0x1a989d(0x1ec)]();for(const _0x4c2c73 of _0x3aec74){if(!_0x4c2c73[_0x1a989d(0x196)]())return![];}return!![];},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x389)]=Game_Troop[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x1a7)],Game_Troop[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x1a7)]=function(_0x3522c1){const _0x1eb6b6=_0x5b4c5d;VisuMZ[_0x1eb6b6(0x1f7)]['Game_Troop_setup'][_0x1eb6b6(0x214)](this,_0x3522c1),this['makeCurrentTroopUniqueID']();},Game_Troop[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x19c)]=function(){const _0x1dcde2=_0x5b4c5d;this[_0x1dcde2(0x3a7)]=Graphics[_0x1dcde2(0x203)];},Game_Troop[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x33f)]=function(){const _0x544478=_0x5b4c5d;return this[_0x544478(0x3a7)]=this[_0x544478(0x3a7)]||Graphics[_0x544478(0x203)],this['_currentTroopUniqueID'];},Scene_Skill[_0x5b4c5d(0x1c9)]['isBottomHelpMode']=function(){const _0x2d76b5=_0x5b4c5d;if(ConfigManager[_0x2d76b5(0x29f)]&&ConfigManager[_0x2d76b5(0x23d)]!==undefined)return ConfigManager[_0x2d76b5(0x23d)];else{if(this[_0x2d76b5(0x36f)]())return this[_0x2d76b5(0x22c)]()['match'](/LOWER/i);else Scene_ItemBase['prototype'][_0x2d76b5(0x1b8)][_0x2d76b5(0x214)](this);}},Scene_Skill[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x1b8)]=function(){const _0x14fc50=_0x5b4c5d;if(ConfigManager[_0x14fc50(0x29f)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x14fc50(0x28a)];else return this[_0x14fc50(0x36f)]()?this[_0x14fc50(0x22c)]()[_0x14fc50(0x310)](/RIGHT/i):Scene_ItemBase[_0x14fc50(0x1c9)][_0x14fc50(0x1b8)][_0x14fc50(0x214)](this);},Scene_Skill[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x22c)]=function(){const _0x1bf680=_0x5b4c5d;return VisuMZ[_0x1bf680(0x1f7)][_0x1bf680(0x192)]['Skills'][_0x1bf680(0x375)];},Scene_Skill['prototype']['isUseModernControls']=function(){const _0x299289=_0x5b4c5d;return this[_0x299289(0x367)]&&this[_0x299289(0x367)][_0x299289(0x227)]();},Scene_Skill[_0x5b4c5d(0x1c9)]['isUseSkillsStatesCoreUpdatedLayout']=function(){const _0x48836a=_0x5b4c5d;return VisuMZ[_0x48836a(0x1f7)][_0x48836a(0x192)]['Skills'][_0x48836a(0x1cc)];},VisuMZ['SkillsStatesCore'][_0x5b4c5d(0x36b)]=Scene_Skill[_0x5b4c5d(0x1c9)]['helpWindowRect'],Scene_Skill[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x18f)]=function(){const _0x195f09=_0x5b4c5d;return this[_0x195f09(0x36f)]()?this[_0x195f09(0x253)]():VisuMZ[_0x195f09(0x1f7)][_0x195f09(0x36b)][_0x195f09(0x214)](this);},Scene_Skill['prototype'][_0x5b4c5d(0x253)]=function(){const _0x48420e=_0x5b4c5d,_0x3032f1=0x0,_0x31d937=this[_0x48420e(0x379)](),_0x5c46da=Graphics['boxWidth'],_0x4abc47=this[_0x48420e(0x317)]();return new Rectangle(_0x3032f1,_0x31d937,_0x5c46da,_0x4abc47);},VisuMZ['SkillsStatesCore']['Scene_Skill_skillTypeWindowRect']=Scene_Skill[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x353)],Scene_Skill[_0x5b4c5d(0x1c9)]['skillTypeWindowRect']=function(){const _0x180b34=_0x5b4c5d;return this[_0x180b34(0x36f)]()?this[_0x180b34(0x271)]():VisuMZ[_0x180b34(0x1f7)][_0x180b34(0x316)]['call'](this);},Scene_Skill[_0x5b4c5d(0x1c9)]['skillTypeWindowRectSkillsStatesCore']=function(){const _0x5bbbc7=_0x5b4c5d,_0x5e9960=this[_0x5bbbc7(0x21d)](),_0x4ff48d=this[_0x5bbbc7(0x1c2)](0x3,!![]),_0x4754af=this[_0x5bbbc7(0x1b8)]()?Graphics[_0x5bbbc7(0x22f)]-_0x5e9960:0x0,_0x4bc731=this[_0x5bbbc7(0x3b5)]();return new Rectangle(_0x4754af,_0x4bc731,_0x5e9960,_0x4ff48d);},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x28b)]=Scene_Skill[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x32e)],Scene_Skill[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x32e)]=function(){const _0xa9c763=_0x5b4c5d;return this[_0xa9c763(0x36f)]()?this[_0xa9c763(0x202)]():VisuMZ[_0xa9c763(0x1f7)][_0xa9c763(0x28b)]['call'](this);},Scene_Skill[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x202)]=function(){const _0x43d6f2=_0x5b4c5d,_0x110fcc=Graphics['boxWidth']-this['mainCommandWidth'](),_0x428c7d=this[_0x43d6f2(0x2ba)][_0x43d6f2(0x286)],_0x3c1e5d=this['isRightInputMode']()?0x0:Graphics[_0x43d6f2(0x22f)]-_0x110fcc,_0xa80fc0=this[_0x43d6f2(0x3b5)]();return new Rectangle(_0x3c1e5d,_0xa80fc0,_0x110fcc,_0x428c7d);},VisuMZ[_0x5b4c5d(0x1f7)]['Scene_Skill_createItemWindow']=Scene_Skill[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x2ae)],Scene_Skill[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x2ae)]=function(){const _0x39c8b1=_0x5b4c5d;VisuMZ['SkillsStatesCore'][_0x39c8b1(0x1bd)]['call'](this),this[_0x39c8b1(0x331)]()&&this[_0x39c8b1(0x175)]();},VisuMZ[_0x5b4c5d(0x1f7)]['Scene_Skill_itemWindowRect']=Scene_Skill[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x1bf)],Scene_Skill[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x1bf)]=function(){const _0x28def4=_0x5b4c5d;if(this[_0x28def4(0x36f)]())return this[_0x28def4(0x187)]();else{const _0x3a2180=VisuMZ[_0x28def4(0x1f7)][_0x28def4(0x17d)][_0x28def4(0x214)](this);return this[_0x28def4(0x331)]()&&this[_0x28def4(0x233)]()&&(_0x3a2180[_0x28def4(0x1c4)]-=this['shopStatusWidth']()),_0x3a2180;}},Scene_Skill[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x187)]=function(){const _0x1ff173=_0x5b4c5d,_0x424e90=Graphics[_0x1ff173(0x22f)]-this[_0x1ff173(0x1fc)](),_0x561295=this[_0x1ff173(0x182)]()-this['_statusWindow'][_0x1ff173(0x286)],_0x3a2d79=this[_0x1ff173(0x1b8)]()?Graphics[_0x1ff173(0x22f)]-_0x424e90:0x0,_0x48b817=this[_0x1ff173(0x36a)]['y']+this['_statusWindow'][_0x1ff173(0x286)];return new Rectangle(_0x3a2d79,_0x48b817,_0x424e90,_0x561295);},Scene_Skill[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x331)]=function(){const _0x2d0af9=_0x5b4c5d;if(!Imported[_0x2d0af9(0x34f)])return![];else return this[_0x2d0af9(0x36f)]()?!![]:VisuMZ['SkillsStatesCore'][_0x2d0af9(0x192)][_0x2d0af9(0x3a4)][_0x2d0af9(0x23a)];},Scene_Skill[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x233)]=function(){const _0x79718e=_0x5b4c5d;return VisuMZ[_0x79718e(0x1f7)][_0x79718e(0x192)][_0x79718e(0x3a4)][_0x79718e(0x20b)];},Scene_Skill[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x175)]=function(){const _0x54832c=_0x5b4c5d,_0x254a47=this['shopStatusWindowRect']();this['_shopStatusWindow']=new Window_ShopStatus(_0x254a47),this['addWindow'](this[_0x54832c(0x29e)]),this['_itemWindow'][_0x54832c(0x210)](this[_0x54832c(0x29e)]);const _0x42c7b7=VisuMZ[_0x54832c(0x1f7)]['Settings']['Skills'][_0x54832c(0x329)];this[_0x54832c(0x29e)][_0x54832c(0x23c)](_0x42c7b7||0x0);},Scene_Skill[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x2b5)]=function(){const _0x5108f6=_0x5b4c5d;return this[_0x5108f6(0x36f)]()?this['shopStatusWindowRectSkillsStatesCore']():VisuMZ[_0x5108f6(0x1f7)][_0x5108f6(0x192)][_0x5108f6(0x3a4)][_0x5108f6(0x32a)]['call'](this);},Scene_Skill[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x222)]=function(){const _0x26652b=_0x5b4c5d,_0x4db4f5=this['shopStatusWidth'](),_0x1223d7=this[_0x26652b(0x239)]['height'],_0x5c2f06=this[_0x26652b(0x1b8)]()?0x0:Graphics[_0x26652b(0x22f)]-this[_0x26652b(0x1fc)](),_0x3f515b=this['_itemWindow']['y'];return new Rectangle(_0x5c2f06,_0x3f515b,_0x4db4f5,_0x1223d7);},Scene_Skill['prototype'][_0x5b4c5d(0x1fc)]=function(){const _0x31ca17=_0x5b4c5d;return Imported['VisuMZ_1_ItemsEquipsCore']?Scene_Shop[_0x31ca17(0x1c9)]['statusWidth']():0x0;},Scene_Skill[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x226)]=function(){const _0x5744a1=_0x5b4c5d;return this['_skillTypeWindow']&&this[_0x5744a1(0x2ba)][_0x5744a1(0x2a8)]?TextManager[_0x5744a1(0x2db)]:'';},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x21b)]=Sprite_Gauge[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x338)],Sprite_Gauge['prototype'][_0x5b4c5d(0x338)]=function(){const _0xc566b=_0x5b4c5d;VisuMZ['SkillsStatesCore'][_0xc566b(0x21b)][_0xc566b(0x214)](this),this[_0xc566b(0x3bb)]=null;},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x38b)]=Sprite_Gauge[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x1a7)],Sprite_Gauge[_0x5b4c5d(0x1c9)]['setup']=function(_0x2ff040,_0x5d876f){const _0x4e078f=_0x5b4c5d;this[_0x4e078f(0x378)](_0x2ff040,_0x5d876f),_0x5d876f=_0x5d876f[_0x4e078f(0x2fb)](),VisuMZ[_0x4e078f(0x1f7)][_0x4e078f(0x38b)][_0x4e078f(0x214)](this,_0x2ff040,_0x5d876f);},Sprite_Gauge[_0x5b4c5d(0x1c9)]['setupSkillsStatesCore']=function(_0x29b34d,_0x8d9f86){const _0x510f17=_0x5b4c5d,_0xc8ab63=VisuMZ[_0x510f17(0x1f7)][_0x510f17(0x192)]['Costs'][_0x510f17(0x39e)](_0x2d70eb=>_0x2d70eb[_0x510f17(0x221)][_0x510f17(0x386)]()===_0x8d9f86[_0x510f17(0x386)]());_0xc8ab63['length']>=0x1?this[_0x510f17(0x3bb)]=_0xc8ab63[0x0]:this[_0x510f17(0x3bb)]=null;},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x272)]=Sprite_Gauge['prototype'][_0x5b4c5d(0x215)],Sprite_Gauge[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x215)]=function(){const _0x579d85=_0x5b4c5d;return this['_battler']&&this[_0x579d85(0x3bb)]?this[_0x579d85(0x357)]():VisuMZ['SkillsStatesCore'][_0x579d85(0x272)][_0x579d85(0x214)](this);},Sprite_Gauge['prototype'][_0x5b4c5d(0x357)]=function(){const _0x43ecf7=_0x5b4c5d;return this['_costSettings']['GaugeCurrentJS'][_0x43ecf7(0x214)](this[_0x43ecf7(0x191)]);},VisuMZ['SkillsStatesCore'][_0x5b4c5d(0x229)]=Sprite_Gauge[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x1a9)],Sprite_Gauge['prototype']['currentMaxValue']=function(){const _0x535b93=_0x5b4c5d;return this[_0x535b93(0x191)]&&this[_0x535b93(0x3bb)]?this['currentMaxValueSkillsStatesCore']():VisuMZ[_0x535b93(0x1f7)][_0x535b93(0x229)][_0x535b93(0x214)](this);},Sprite_Gauge[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x370)]=function(){const _0x21b5b0=_0x5b4c5d;return this['_costSettings'][_0x21b5b0(0x314)][_0x21b5b0(0x214)](this['_battler']);},VisuMZ['SkillsStatesCore']['Sprite_Gauge_gaugeRate']=Sprite_Gauge[_0x5b4c5d(0x1c9)]['gaugeRate'],Sprite_Gauge[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x181)]=function(){const _0x20bba3=_0x5b4c5d,_0x2dfc9c=VisuMZ['SkillsStatesCore'][_0x20bba3(0x300)][_0x20bba3(0x214)](this);return _0x2dfc9c[_0x20bba3(0x3ab)](0x0,0x1);},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x29c)]=Sprite_Gauge[_0x5b4c5d(0x1c9)]['redraw'],Sprite_Gauge[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x188)]=function(){const _0x2e1ad5=_0x5b4c5d;this['_battler']&&this[_0x2e1ad5(0x3bb)]?(this[_0x2e1ad5(0x194)][_0x2e1ad5(0x30a)](),this[_0x2e1ad5(0x25d)]()):VisuMZ[_0x2e1ad5(0x1f7)][_0x2e1ad5(0x29c)]['call'](this);},Sprite_Gauge['prototype'][_0x5b4c5d(0x377)]=function(){const _0x379752=_0x5b4c5d;let _0x5af283=this[_0x379752(0x215)]();return Imported['VisuMZ_0_CoreEngine']&&this[_0x379752(0x1e1)]()&&(_0x5af283=VisuMZ[_0x379752(0x200)](_0x5af283)),_0x5af283;},Sprite_Gauge[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x25d)]=function(){const _0x2e0b52=_0x5b4c5d;this[_0x2e0b52(0x3bb)][_0x2e0b52(0x315)][_0x2e0b52(0x214)](this);},Sprite_Gauge['prototype'][_0x5b4c5d(0x17b)]=function(_0x16e5e0,_0x32e3d0,_0x3c7741,_0xd73ccd,_0x1cde0f,_0x3fd362){const _0x2f096d=_0x5b4c5d,_0x54f687=this[_0x2f096d(0x181)](),_0x5f4b04=Math[_0x2f096d(0x1fb)]((_0x1cde0f-0x2)*_0x54f687),_0x1d1567=_0x3fd362-0x2,_0x1b80e0=this['gaugeBackColor']();this[_0x2f096d(0x194)]['fillRect'](_0x3c7741,_0xd73ccd,_0x1cde0f,_0x3fd362,_0x1b80e0),this[_0x2f096d(0x194)][_0x2f096d(0x1e7)](_0x3c7741+0x1,_0xd73ccd+0x1,_0x5f4b04,_0x1d1567,_0x16e5e0,_0x32e3d0);},VisuMZ['SkillsStatesCore'][_0x5b4c5d(0x2e8)]=Sprite_StateIcon[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x223)],Sprite_StateIcon[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x223)]=function(){const _0x2ea79f=_0x5b4c5d;VisuMZ['SkillsStatesCore'][_0x2ea79f(0x2e8)][_0x2ea79f(0x214)](this),this[_0x2ea79f(0x1c0)]();},Sprite_StateIcon[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x1c0)]=function(){const _0x1862de=_0x5b4c5d,_0x4576a4=Window_Base[_0x1862de(0x1c9)][_0x1862de(0x1eb)]();this['_turnDisplaySprite']=new Sprite(),this[_0x1862de(0x269)]['bitmap']=new Bitmap(ImageManager[_0x1862de(0x2f7)],_0x4576a4),this[_0x1862de(0x269)][_0x1862de(0x25a)]['x']=this['anchor']['x'],this['_turnDisplaySprite'][_0x1862de(0x25a)]['y']=this[_0x1862de(0x25a)]['y'],this[_0x1862de(0x27f)](this[_0x1862de(0x269)]),this[_0x1862de(0x1f1)]=this[_0x1862de(0x269)][_0x1862de(0x194)];},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x204)]=Sprite_StateIcon[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x37c)],Sprite_StateIcon[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x37c)]=function(){const _0x310e51=_0x5b4c5d;VisuMZ[_0x310e51(0x1f7)][_0x310e51(0x204)][_0x310e51(0x214)](this),this[_0x310e51(0x27e)]();},Sprite_StateIcon[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x2d7)]=function(_0x8ab23b,_0x122695,_0x39f324,_0x1c79dd,_0x220f07){const _0x3bdaae=_0x5b4c5d;this['contents'][_0x3bdaae(0x2d7)](_0x8ab23b,_0x122695,_0x39f324,_0x1c79dd,this[_0x3bdaae(0x1f1)][_0x3bdaae(0x286)],_0x220f07);},Sprite_StateIcon[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x27e)]=function(){const _0x41fdd4=_0x5b4c5d;this[_0x41fdd4(0x365)](),this[_0x41fdd4(0x1f1)][_0x41fdd4(0x30a)]();const _0x35bac4=this[_0x41fdd4(0x191)];if(!_0x35bac4)return;const _0x164e79=_0x35bac4['states']()[_0x41fdd4(0x39e)](_0xfe60b8=>_0xfe60b8[_0x41fdd4(0x237)]>0x0),_0x142e4a=[...Array(0x8)['keys']()][_0x41fdd4(0x39e)](_0x3b40c7=>_0x35bac4[_0x41fdd4(0x2c8)](_0x3b40c7)!==0x0),_0x355616=this[_0x41fdd4(0x37f)],_0x4e0ad5=_0x164e79[_0x355616];if(_0x4e0ad5)Window_Base[_0x41fdd4(0x1c9)][_0x41fdd4(0x234)][_0x41fdd4(0x214)](this,_0x35bac4,_0x4e0ad5,0x0,0x0),Window_Base['prototype']['drawActorStateData'][_0x41fdd4(0x214)](this,_0x35bac4,_0x4e0ad5,0x0,0x0);else{const _0x211dfa=_0x142e4a[_0x355616-_0x164e79[_0x41fdd4(0x36c)]];if(_0x211dfa===undefined)return;Window_Base[_0x41fdd4(0x1c9)][_0x41fdd4(0x2d4)]['call'](this,_0x35bac4,_0x211dfa,0x0,0x0),Window_Base[_0x41fdd4(0x1c9)][_0x41fdd4(0x394)][_0x41fdd4(0x214)](this,_0x35bac4,_0x211dfa,0x0,0x0);}},Sprite_StateIcon[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x365)]=function(){const _0x47717e=_0x5b4c5d;this['contents'][_0x47717e(0x250)]=$gameSystem['mainFontFace'](),this[_0x47717e(0x1f1)][_0x47717e(0x177)]=$gameSystem[_0x47717e(0x2ef)](),this['resetTextColor']();},Sprite_StateIcon[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x37b)]=function(){const _0x6aca53=_0x5b4c5d;this[_0x6aca53(0x1b5)](ColorManager['normalColor']()),this[_0x6aca53(0x1c8)](ColorManager[_0x6aca53(0x257)]());},Sprite_StateIcon[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x1b5)]=function(_0x49482b){const _0x10ecda=_0x5b4c5d;this[_0x10ecda(0x1f1)][_0x10ecda(0x295)]=_0x49482b;},Sprite_StateIcon[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x1c8)]=function(_0x3f37c5){const _0x51f201=_0x5b4c5d;this['contents'][_0x51f201(0x257)]=_0x3f37c5;},Window_Base[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x179)]=function(_0x1022f2,_0x487b5b,_0x36d605,_0x3ae033,_0x3390d1){const _0x3c520f=_0x5b4c5d,_0x8aeaa3=this[_0x3c520f(0x2e3)](_0x1022f2,_0x487b5b),_0x32574f=this['textSizeEx'](_0x8aeaa3,_0x36d605,_0x3ae033,_0x3390d1),_0x178226=_0x36d605+_0x3390d1-_0x32574f['width'];this[_0x3c520f(0x348)](_0x8aeaa3,_0x178226,_0x3ae033,_0x3390d1),this[_0x3c520f(0x365)]();},Window_Base['prototype'][_0x5b4c5d(0x2e3)]=function(_0x53d97a,_0x46f5ab){const _0x3bc9b6=_0x5b4c5d;let _0x5b93ce='';for(settings of VisuMZ['SkillsStatesCore']['Settings'][_0x3bc9b6(0x2b3)]){if(!this[_0x3bc9b6(0x2d6)](_0x53d97a,_0x46f5ab,settings))continue;if(_0x5b93ce[_0x3bc9b6(0x36c)]>0x0)_0x5b93ce+=this['skillCostSeparator']();_0x5b93ce+=this[_0x3bc9b6(0x2a3)](_0x53d97a,_0x46f5ab,settings);}_0x5b93ce=this[_0x3bc9b6(0x1d7)](_0x53d97a,_0x46f5ab,_0x5b93ce);if(_0x46f5ab[_0x3bc9b6(0x292)][_0x3bc9b6(0x310)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x5b93ce[_0x3bc9b6(0x36c)]>0x0)_0x5b93ce+=this[_0x3bc9b6(0x1f8)]();_0x5b93ce+=String(RegExp['$1']);}return _0x5b93ce;},Window_Base['prototype'][_0x5b4c5d(0x1d7)]=function(_0x55935b,_0xe4d5f2,_0x584237){return _0x584237;},Window_Base[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x2d6)]=function(_0x208568,_0x263a34,_0x2d2368){const _0x38c08b=_0x5b4c5d,_0x59b592=_0x2d2368[_0x38c08b(0x1ba)][_0x38c08b(0x214)](_0x208568,_0x263a34);return _0x2d2368[_0x38c08b(0x351)]['call'](_0x208568,_0x263a34,_0x59b592,_0x2d2368);},Window_Base[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x2a3)]=function(_0xb8cf18,_0x1e9a53,_0x197b56){const _0x3342d0=_0x5b4c5d,_0x267e85=_0x197b56[_0x3342d0(0x1ba)][_0x3342d0(0x214)](_0xb8cf18,_0x1e9a53);return _0x197b56[_0x3342d0(0x355)][_0x3342d0(0x214)](_0xb8cf18,_0x1e9a53,_0x267e85,_0x197b56);},Window_Base[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x1f8)]=function(){return'\x20';},Window_Base[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x213)]=function(_0x1768c0,_0x260f2e,_0x1b0129,_0x2502ec){const _0x221a45=_0x5b4c5d;if(!_0x1768c0)return;VisuMZ[_0x221a45(0x1f7)][_0x221a45(0x2d9)][_0x221a45(0x214)](this,_0x1768c0,_0x260f2e,_0x1b0129,_0x2502ec),this['drawActorIconsAllTurnCounters'](_0x1768c0,_0x260f2e,_0x1b0129,_0x2502ec);},Window_Base['prototype'][_0x5b4c5d(0x1e2)]=function(_0x47766f,_0x1af048,_0x164239,_0x11db65){const _0x594b05=_0x5b4c5d;_0x11db65=_0x11db65||0x90;const _0x4eee13=ImageManager[_0x594b05(0x2f7)],_0x51d728=_0x47766f[_0x594b05(0x1bb)]()[_0x594b05(0x2d0)](0x0,Math[_0x594b05(0x1fb)](_0x11db65/_0x4eee13)),_0x188234=_0x47766f[_0x594b05(0x28f)]()[_0x594b05(0x39e)](_0x27d302=>_0x27d302[_0x594b05(0x237)]>0x0),_0x23d989=[...Array(0x8)[_0x594b05(0x349)]()][_0x594b05(0x39e)](_0x47db7f=>_0x47766f[_0x594b05(0x2c8)](_0x47db7f)!==0x0),_0x1f6831=[];let _0x4c5f30=_0x1af048;for(let _0x30eaba=0x0;_0x30eaba<_0x51d728[_0x594b05(0x36c)];_0x30eaba++){this[_0x594b05(0x365)]();const _0x26614d=_0x188234[_0x30eaba];if(_0x26614d)!_0x1f6831[_0x594b05(0x3a3)](_0x26614d)&&this[_0x594b05(0x234)](_0x47766f,_0x26614d,_0x4c5f30,_0x164239),this['drawActorStateData'](_0x47766f,_0x26614d,_0x4c5f30,_0x164239),_0x1f6831[_0x594b05(0x288)](_0x26614d);else{const _0x367bfd=_0x23d989[_0x30eaba-_0x188234[_0x594b05(0x36c)]];this['drawActorBuffTurns'](_0x47766f,_0x367bfd,_0x4c5f30,_0x164239),this[_0x594b05(0x394)](_0x47766f,_0x367bfd,_0x4c5f30,_0x164239);}_0x4c5f30+=_0x4eee13;}},Window_Base[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x234)]=function(_0x264457,_0x131e14,_0x29b18f,_0x5a7c59){const _0xa42f0f=_0x5b4c5d;if(!VisuMZ[_0xa42f0f(0x1f7)]['Settings']['States'][_0xa42f0f(0x1a2)])return;if(!_0x264457[_0xa42f0f(0x1f5)](_0x131e14['id']))return;if(_0x131e14[_0xa42f0f(0x2da)]===0x0)return;if(_0x131e14[_0xa42f0f(0x292)][_0xa42f0f(0x310)](/<HIDE STATE TURNS>/i))return;const _0x3752f8=_0x264457[_0xa42f0f(0x3a6)](_0x131e14['id']),_0x4d56a8=ImageManager['iconWidth'],_0x406e1d=ColorManager[_0xa42f0f(0x1e0)](_0x131e14);this[_0xa42f0f(0x1b5)](_0x406e1d),this['changeOutlineColor'](_0xa42f0f(0x1b1)),this[_0xa42f0f(0x1f1)][_0xa42f0f(0x1d4)]=!![],this[_0xa42f0f(0x1f1)][_0xa42f0f(0x177)]=VisuMZ[_0xa42f0f(0x1f7)][_0xa42f0f(0x192)][_0xa42f0f(0x398)]['TurnFontSize'],_0x29b18f+=VisuMZ[_0xa42f0f(0x1f7)]['Settings'][_0xa42f0f(0x398)][_0xa42f0f(0x2d3)],_0x5a7c59+=VisuMZ[_0xa42f0f(0x1f7)][_0xa42f0f(0x192)][_0xa42f0f(0x398)][_0xa42f0f(0x23e)],this[_0xa42f0f(0x2d7)](_0x3752f8,_0x29b18f,_0x5a7c59,_0x4d56a8,_0xa42f0f(0x33e)),this['contents']['fontBold']=![],this[_0xa42f0f(0x365)]();},Window_Base[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x2cc)]=function(_0x5e6de4,_0x2b46d6,_0x905e68,_0x306229){const _0x3ba6d0=_0x5b4c5d;if(!VisuMZ[_0x3ba6d0(0x1f7)][_0x3ba6d0(0x192)][_0x3ba6d0(0x398)][_0x3ba6d0(0x1fe)])return;const _0xbf4793=ImageManager[_0x3ba6d0(0x2f7)],_0x1bc28f=ImageManager['iconHeight']/0x2,_0x2a26fd=ColorManager['normalColor']();this['changeTextColor'](_0x2a26fd),this[_0x3ba6d0(0x1c8)]('rgba(0,\x200,\x200,\x201)'),this[_0x3ba6d0(0x1f1)][_0x3ba6d0(0x1d4)]=!![],this[_0x3ba6d0(0x1f1)][_0x3ba6d0(0x177)]=VisuMZ[_0x3ba6d0(0x1f7)]['Settings'][_0x3ba6d0(0x398)][_0x3ba6d0(0x344)],_0x905e68+=VisuMZ[_0x3ba6d0(0x1f7)][_0x3ba6d0(0x192)][_0x3ba6d0(0x398)]['DataOffsetX'],_0x306229+=VisuMZ[_0x3ba6d0(0x1f7)][_0x3ba6d0(0x192)][_0x3ba6d0(0x398)]['DataOffsetY'];const _0x10fd71=String(_0x5e6de4[_0x3ba6d0(0x18c)](_0x2b46d6['id']));this[_0x3ba6d0(0x2d7)](_0x10fd71,_0x905e68,_0x306229,_0xbf4793,_0x3ba6d0(0x35c)),this[_0x3ba6d0(0x1f1)][_0x3ba6d0(0x1d4)]=![],this[_0x3ba6d0(0x365)]();},Window_Base['prototype']['drawActorBuffTurns']=function(_0x162982,_0xc01562,_0x2d6fb2,_0x5a7d94){const _0x24577b=_0x5b4c5d;if(!VisuMZ[_0x24577b(0x1f7)]['Settings'][_0x24577b(0x32d)][_0x24577b(0x1a2)])return;const _0x2a7313=_0x162982[_0x24577b(0x2c8)](_0xc01562);if(_0x2a7313===0x0)return;const _0x4a2050=_0x162982[_0x24577b(0x309)](_0xc01562),_0x11a21c=ImageManager[_0x24577b(0x2f7)],_0x2b7f7c=_0x2a7313>0x0?ColorManager[_0x24577b(0x34d)]():ColorManager['debuffColor']();this[_0x24577b(0x1b5)](_0x2b7f7c),this[_0x24577b(0x1c8)](_0x24577b(0x1b1)),this[_0x24577b(0x1f1)][_0x24577b(0x1d4)]=!![],this['contents'][_0x24577b(0x177)]=VisuMZ['SkillsStatesCore']['Settings'][_0x24577b(0x32d)]['TurnFontSize'],_0x2d6fb2+=VisuMZ[_0x24577b(0x1f7)]['Settings']['Buffs'][_0x24577b(0x2d3)],_0x5a7d94+=VisuMZ[_0x24577b(0x1f7)]['Settings'][_0x24577b(0x32d)][_0x24577b(0x23e)],this[_0x24577b(0x2d7)](_0x4a2050,_0x2d6fb2,_0x5a7d94,_0x11a21c,_0x24577b(0x33e)),this[_0x24577b(0x1f1)][_0x24577b(0x1d4)]=![],this[_0x24577b(0x365)]();},Window_Base[_0x5b4c5d(0x1c9)]['drawActorBuffRates']=function(_0x86304,_0x4ee74a,_0x591855,_0x350505){const _0x1a43b5=_0x5b4c5d;if(!VisuMZ[_0x1a43b5(0x1f7)]['Settings'][_0x1a43b5(0x32d)][_0x1a43b5(0x1fe)])return;const _0x535da1=_0x86304[_0x1a43b5(0x318)](_0x4ee74a),_0x742855=_0x86304[_0x1a43b5(0x2c8)](_0x4ee74a),_0x186a7f=ImageManager[_0x1a43b5(0x2f7)],_0x1ea9d9=ImageManager[_0x1a43b5(0x185)]/0x2,_0x4ea0b0=_0x742855>0x0?ColorManager[_0x1a43b5(0x34d)]():ColorManager[_0x1a43b5(0x3af)]();this[_0x1a43b5(0x1b5)](_0x4ea0b0),this[_0x1a43b5(0x1c8)](_0x1a43b5(0x1b1)),this[_0x1a43b5(0x1f1)][_0x1a43b5(0x1d4)]=!![],this[_0x1a43b5(0x1f1)][_0x1a43b5(0x177)]=VisuMZ[_0x1a43b5(0x1f7)]['Settings'][_0x1a43b5(0x32d)][_0x1a43b5(0x344)],_0x591855+=VisuMZ['SkillsStatesCore']['Settings']['Buffs'][_0x1a43b5(0x342)],_0x350505+=VisuMZ['SkillsStatesCore']['Settings'][_0x1a43b5(0x32d)][_0x1a43b5(0x2a6)];const _0x2c2758='%1%'['format'](Math[_0x1a43b5(0x30f)](_0x535da1*0x64));this['drawText'](_0x2c2758,_0x591855,_0x350505,_0x186a7f,_0x1a43b5(0x35c)),this[_0x1a43b5(0x1f1)][_0x1a43b5(0x1d4)]=![],this[_0x1a43b5(0x365)]();},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x336)]=Window_StatusBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x297)],Window_StatusBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x297)]=function(_0x310226,_0xa7175,_0x123844,_0x3d64d2){const _0x414c56=_0x5b4c5d;if(_0x310226[_0x414c56(0x381)]())_0xa7175=this[_0x414c56(0x1df)](_0x310226,_0xa7175);this[_0x414c56(0x2b8)](_0x310226,_0xa7175,_0x123844,_0x3d64d2);},Window_StatusBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x2b8)]=function(_0xfc5ced,_0x3ca8c8,_0x551516,_0x4eefa5){const _0x59f4f3=_0x5b4c5d;if([_0x59f4f3(0x1a5),'untitled']['includes'](_0x3ca8c8[_0x59f4f3(0x2fb)]()))return;VisuMZ['SkillsStatesCore']['Window_StatusBase_placeGauge'][_0x59f4f3(0x214)](this,_0xfc5ced,_0x3ca8c8,_0x551516,_0x4eefa5);},Window_StatusBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x1df)]=function(_0x4970ec,_0x531cdf){const _0x191af7=_0x5b4c5d,_0x532a55=_0x4970ec['currentClass']()['note'];if(_0x531cdf==='hp'&&_0x532a55[_0x191af7(0x310)](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x531cdf==='mp'&&_0x532a55[_0x191af7(0x310)](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else return _0x531cdf==='tp'&&_0x532a55[_0x191af7(0x310)](/<REPLACE TP GAUGE:[ ](.*)>/i)?String(RegExp['$1']):_0x531cdf;}},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x2d9)]=Window_StatusBase[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x213)],Window_StatusBase['prototype'][_0x5b4c5d(0x213)]=function(_0x37c845,_0x60e57e,_0x9876f5,_0x1ef3d5){const _0x72a4f3=_0x5b4c5d;if(!_0x37c845)return;Window_Base[_0x72a4f3(0x1c9)][_0x72a4f3(0x213)][_0x72a4f3(0x214)](this,_0x37c845,_0x60e57e,_0x9876f5,_0x1ef3d5);},VisuMZ['SkillsStatesCore'][_0x5b4c5d(0x3ac)]=Window_SkillType[_0x5b4c5d(0x1c9)]['initialize'],Window_SkillType[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x198)]=function(_0x4977ab){const _0x4c4c12=_0x5b4c5d;VisuMZ[_0x4c4c12(0x1f7)][_0x4c4c12(0x3ac)]['call'](this,_0x4977ab),this[_0x4c4c12(0x1a6)](_0x4977ab);},Window_SkillType[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x1a6)]=function(_0x2e89cb){const _0x144a7c=_0x5b4c5d,_0xbe61a3=new Rectangle(0x0,0x0,_0x2e89cb[_0x144a7c(0x1c4)],_0x2e89cb[_0x144a7c(0x286)]);this[_0x144a7c(0x1ca)]=new Window_Base(_0xbe61a3),this[_0x144a7c(0x1ca)][_0x144a7c(0x326)]=0x0,this[_0x144a7c(0x27f)](this[_0x144a7c(0x1ca)]),this['updateCommandNameWindow']();},Window_SkillType[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x2d8)]=function(){const _0x13046b=_0x5b4c5d;Window_Command['prototype'][_0x13046b(0x2d8)][_0x13046b(0x214)](this);if(this[_0x13046b(0x1ca)])this[_0x13046b(0x3a0)]();},Window_SkillType[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x3a0)]=function(){const _0x2578ce=_0x5b4c5d,_0x48188b=this[_0x2578ce(0x1ca)];_0x48188b[_0x2578ce(0x1f1)][_0x2578ce(0x30a)]();const _0x5d1f45=this[_0x2578ce(0x3a9)](this['index']());if(_0x5d1f45===_0x2578ce(0x33d)&&this[_0x2578ce(0x1aa)]()>0x0){const _0x1275b3=this[_0x2578ce(0x21e)](this[_0x2578ce(0x39f)]());let _0x198238=this['commandName'](this[_0x2578ce(0x39f)]());_0x198238=_0x198238['replace'](/\\I\[(\d+)\]/gi,''),_0x48188b[_0x2578ce(0x365)](),this[_0x2578ce(0x208)](_0x198238,_0x1275b3),this[_0x2578ce(0x384)](_0x198238,_0x1275b3),this[_0x2578ce(0x220)](_0x198238,_0x1275b3);}},Window_SkillType[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x208)]=function(_0x5e6f44,_0x4e27a4){},Window_SkillType['prototype'][_0x5b4c5d(0x384)]=function(_0x52ac30,_0x1f6b88){const _0x3cedff=_0x5b4c5d,_0x27aa16=this[_0x3cedff(0x1ca)];_0x27aa16[_0x3cedff(0x2d7)](_0x52ac30,0x0,_0x1f6b88['y'],_0x27aa16[_0x3cedff(0x38c)],_0x3cedff(0x35c));},Window_SkillType[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x220)]=function(_0x489688,_0x10a022){const _0x411c39=_0x5b4c5d,_0x4f23eb=this['_commandNameWindow'],_0x506687=$gameSystem['windowPadding'](),_0x543b3f=_0x10a022['x']+Math['floor'](_0x10a022[_0x411c39(0x1c4)]/0x2)+_0x506687;_0x4f23eb['x']=_0x4f23eb[_0x411c39(0x1c4)]/-0x2+_0x543b3f,_0x4f23eb['y']=Math[_0x411c39(0x1fb)](_0x10a022[_0x411c39(0x286)]/0x2);},Window_SkillType[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x227)]=function(){const _0x507347=_0x5b4c5d;return Imported[_0x507347(0x2f0)]&&Window_Command['prototype']['isUseModernControls'][_0x507347(0x214)](this);},Window_SkillType['prototype'][_0x5b4c5d(0x2b2)]=function(){const _0x4ce784=_0x5b4c5d;if(!this[_0x4ce784(0x3b7)])return;const _0x18360e=this[_0x4ce784(0x3b7)][_0x4ce784(0x27d)]();for(const _0x150aa3 of _0x18360e){const _0x43620a=this[_0x4ce784(0x385)](_0x150aa3);this['addCommand'](_0x43620a,_0x4ce784(0x230),!![],_0x150aa3);}},Window_SkillType[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x385)]=function(_0x44a2f0){const _0x4c4757=_0x5b4c5d;let _0x2549cb=$dataSystem[_0x4c4757(0x27d)][_0x44a2f0];if(_0x2549cb[_0x4c4757(0x310)](/\\I\[(\d+)\]/i))return _0x2549cb;if(this[_0x4c4757(0x2a1)]()==='text')return _0x2549cb;const _0x297728=VisuMZ['SkillsStatesCore']['Settings']['Skills'],_0x529a5f=$dataSystem['magicSkills'][_0x4c4757(0x3a3)](_0x44a2f0),_0x18a709=_0x529a5f?_0x297728['IconStypeMagic']:_0x297728[_0x4c4757(0x2ac)];return _0x4c4757(0x2fe)['format'](_0x18a709,_0x2549cb);},Window_SkillType[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x38e)]=function(){const _0x581b2e=_0x5b4c5d;return VisuMZ[_0x581b2e(0x1f7)][_0x581b2e(0x192)]['Skills'][_0x581b2e(0x2b1)];},Window_SkillType['prototype'][_0x5b4c5d(0x249)]=function(_0x34efee){const _0x3e0c65=_0x5b4c5d,_0x140b3a=this[_0x3e0c65(0x3a9)](_0x34efee);if(_0x140b3a==='iconText')this[_0x3e0c65(0x1e5)](_0x34efee);else _0x140b3a===_0x3e0c65(0x33d)?this[_0x3e0c65(0x24d)](_0x34efee):Window_Command[_0x3e0c65(0x1c9)]['drawItem']['call'](this,_0x34efee);},Window_SkillType['prototype'][_0x5b4c5d(0x2a1)]=function(){const _0x4a7297=_0x5b4c5d;return VisuMZ['SkillsStatesCore'][_0x4a7297(0x192)]['Skills']['CmdStyle'];},Window_SkillType[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x3a9)]=function(_0x4602d5){const _0x32efee=_0x5b4c5d;if(_0x4602d5<0x0)return'text';const _0x35b8e4=this['commandStyle']();if(_0x35b8e4!==_0x32efee(0x308))return _0x35b8e4;else{if(this[_0x32efee(0x1aa)]()>0x0){const _0x509b73=this[_0x32efee(0x180)](_0x4602d5);if(_0x509b73[_0x32efee(0x310)](/\\I\[(\d+)\]/i)){const _0x372115=this['itemLineRect'](_0x4602d5),_0x273ea9=this[_0x32efee(0x2c3)](_0x509b73)[_0x32efee(0x1c4)];return _0x273ea9<=_0x372115[_0x32efee(0x1c4)]?_0x32efee(0x362):'icon';}}}return _0x32efee(0x28d);},Window_SkillType[_0x5b4c5d(0x1c9)]['drawItemStyleIconText']=function(_0xadd85c){const _0x1eb98c=_0x5b4c5d,_0x9cfd7c=this[_0x1eb98c(0x21e)](_0xadd85c),_0x48aa18=this[_0x1eb98c(0x180)](_0xadd85c),_0xefc35a=this['textSizeEx'](_0x48aa18)['width'];this[_0x1eb98c(0x1dd)](this['isCommandEnabled'](_0xadd85c));const _0x30dbd5=this[_0x1eb98c(0x38e)]();if(_0x30dbd5===_0x1eb98c(0x33e))this[_0x1eb98c(0x348)](_0x48aa18,_0x9cfd7c['x']+_0x9cfd7c[_0x1eb98c(0x1c4)]-_0xefc35a,_0x9cfd7c['y'],_0xefc35a);else{if(_0x30dbd5===_0x1eb98c(0x35c)){const _0x4c5763=_0x9cfd7c['x']+Math[_0x1eb98c(0x1fb)]((_0x9cfd7c[_0x1eb98c(0x1c4)]-_0xefc35a)/0x2);this[_0x1eb98c(0x348)](_0x48aa18,_0x4c5763,_0x9cfd7c['y'],_0xefc35a);}else this[_0x1eb98c(0x348)](_0x48aa18,_0x9cfd7c['x'],_0x9cfd7c['y'],_0xefc35a);}},Window_SkillType['prototype']['drawItemStyleIcon']=function(_0x2a8cf0){const _0x9d74b5=_0x5b4c5d;this[_0x9d74b5(0x180)](_0x2a8cf0)['match'](/\\I\[(\d+)\]/i);const _0x217730=Number(RegExp['$1'])||0x0,_0x5d90ef=this[_0x9d74b5(0x21e)](_0x2a8cf0),_0x1b1260=_0x5d90ef['x']+Math[_0x9d74b5(0x1fb)]((_0x5d90ef[_0x9d74b5(0x1c4)]-ImageManager[_0x9d74b5(0x2f7)])/0x2),_0x5d6582=_0x5d90ef['y']+(_0x5d90ef['height']-ImageManager[_0x9d74b5(0x185)])/0x2;this[_0x9d74b5(0x245)](_0x217730,_0x1b1260,_0x5d6582);},VisuMZ['SkillsStatesCore'][_0x5b4c5d(0x2d5)]=Window_SkillStatus[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x33a)],Window_SkillStatus['prototype'][_0x5b4c5d(0x33a)]=function(){const _0x5995ed=_0x5b4c5d;VisuMZ[_0x5995ed(0x1f7)][_0x5995ed(0x2d5)][_0x5995ed(0x214)](this);if(this[_0x5995ed(0x3b7)])this[_0x5995ed(0x391)]();},Window_SkillStatus[_0x5b4c5d(0x1c9)]['drawExtendedSkillsStatesCoreStatus']=function(){const _0x12548e=_0x5b4c5d;if(!Imported[_0x12548e(0x2f0)])return;if(!Imported['VisuMZ_1_MainMenuCore'])return;const _0x990e16=this[_0x12548e(0x301)]();let _0xe2e11f=this[_0x12548e(0x275)]()/0x2+0xb4+0xb4+0xb4,_0x52f47=this[_0x12548e(0x38c)]-_0xe2e11f-0x2;if(_0x52f47>=0x12c){const _0x5dd0c8=VisuMZ[_0x12548e(0x2f3)]['Settings']['Param'][_0x12548e(0x30b)],_0x131272=Math[_0x12548e(0x1fb)](_0x52f47/0x2)-0x18;let _0x20da52=_0xe2e11f,_0x305d18=Math[_0x12548e(0x1fb)]((this[_0x12548e(0x383)]-Math[_0x12548e(0x2aa)](_0x5dd0c8['length']/0x2)*_0x990e16)/0x2),_0x4ab1b8=0x0;for(const _0x492c95 of _0x5dd0c8){this[_0x12548e(0x259)](_0x20da52,_0x305d18,_0x131272,_0x492c95),_0x4ab1b8++,_0x4ab1b8%0x2===0x0?(_0x20da52=_0xe2e11f,_0x305d18+=_0x990e16):_0x20da52+=_0x131272+0x18;}}this[_0x12548e(0x365)]();},Window_SkillStatus['prototype'][_0x5b4c5d(0x259)]=function(_0x56f62b,_0x435768,_0x2d8451,_0x36c065){const _0x195af6=_0x5b4c5d,_0x402bf3=this[_0x195af6(0x301)]();this[_0x195af6(0x365)](),this[_0x195af6(0x1ef)](_0x56f62b,_0x435768,_0x2d8451,_0x36c065,!![]),this[_0x195af6(0x37b)](),this['contents']['fontSize']-=0x8;const _0x507b68=this[_0x195af6(0x3b7)][_0x195af6(0x397)](_0x36c065,!![]);this[_0x195af6(0x1f1)]['drawText'](_0x507b68,_0x56f62b,_0x435768,_0x2d8451,_0x402bf3,_0x195af6(0x33e));},VisuMZ['SkillsStatesCore'][_0x5b4c5d(0x29d)]=Window_SkillList[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x3a3)],Window_SkillList[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x3a3)]=function(_0x3ae997){const _0x23a7d4=_0x5b4c5d;return this[_0x23a7d4(0x219)](_0x3ae997);},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x22d)]=Window_SkillList['prototype'][_0x5b4c5d(0x1d1)],Window_SkillList['prototype'][_0x5b4c5d(0x1d1)]=function(){const _0x537361=_0x5b4c5d;return SceneManager[_0x537361(0x19b)][_0x537361(0x35f)]===Scene_Battle?VisuMZ[_0x537361(0x1f7)]['Window_SkillList_maxCols'][_0x537361(0x214)](this):VisuMZ['SkillsStatesCore'][_0x537361(0x192)][_0x537361(0x3a4)][_0x537361(0x216)];},VisuMZ[_0x5b4c5d(0x1f7)][_0x5b4c5d(0x206)]=Window_SkillList[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x287)],Window_SkillList['prototype'][_0x5b4c5d(0x287)]=function(_0x48dd83){const _0x5863cc=_0x5b4c5d,_0x2270e3=this[_0x5863cc(0x3b7)]!==_0x48dd83;VisuMZ[_0x5863cc(0x1f7)][_0x5863cc(0x206)][_0x5863cc(0x214)](this,_0x48dd83),_0x2270e3&&(this['_statusWindow']&&this['_statusWindow'][_0x5863cc(0x35f)]===Window_ShopStatus&&this[_0x5863cc(0x36a)][_0x5863cc(0x32f)](this['itemAt'](0x0)));},Window_SkillList[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x255)]=function(_0x1f6f8e){const _0x5c7182=_0x5b4c5d;if(this[_0x5c7182(0x34b)]===_0x1f6f8e)return;this['_stypeId']=_0x1f6f8e,this['refresh'](),this[_0x5c7182(0x20a)](0x0,0x0),this[_0x5c7182(0x36a)]&&this[_0x5c7182(0x36a)][_0x5c7182(0x35f)]===Window_ShopStatus&&this['_statusWindow'][_0x5c7182(0x32f)](this[_0x5c7182(0x27a)](0x0));},Window_SkillList[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x219)]=function(_0x15fd6c){const _0x39c2f7=_0x5b4c5d;if(!_0x15fd6c)return VisuMZ['SkillsStatesCore']['Window_SkillList_includes'][_0x39c2f7(0x214)](this,_0x15fd6c);if(!this[_0x39c2f7(0x372)](_0x15fd6c))return![];if(!this[_0x39c2f7(0x17a)](_0x15fd6c))return![];if(!this[_0x39c2f7(0x313)](_0x15fd6c))return![];return!![];},Window_SkillList[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x372)]=function(_0x58959a){const _0x1dfb8a=_0x5b4c5d;return DataManager[_0x1dfb8a(0x2f8)](_0x58959a)[_0x1dfb8a(0x3a3)](this[_0x1dfb8a(0x34b)]);},Window_SkillList[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x17a)]=function(_0x1deaba){const _0x5773a9=_0x5b4c5d;if(!this[_0x5773a9(0x25b)](_0x1deaba))return![];if(!this[_0x5773a9(0x243)](_0x1deaba))return![];if(!this[_0x5773a9(0x1ed)](_0x1deaba))return![];return!![];},Window_SkillList[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x25b)]=function(_0x50d463){const _0x46a81c=_0x5b4c5d,_0x78d540=_0x50d463[_0x46a81c(0x292)];if(_0x78d540[_0x46a81c(0x310)](/<HIDE IN BATTLE>/i)&&$gameParty[_0x46a81c(0x368)]())return![];else return _0x78d540[_0x46a81c(0x310)](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x46a81c(0x368)]()?![]:!![];},Window_SkillList[_0x5b4c5d(0x1c9)]['checkShowHideSwitchNotetags']=function(_0x26c9a8){const _0x2e82b6=_0x5b4c5d,_0x2c6ebf=_0x26c9a8[_0x2e82b6(0x292)];if(_0x2c6ebf[_0x2e82b6(0x310)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x316299=JSON['parse']('['+RegExp['$1'][_0x2e82b6(0x310)](/\d+/g)+']');for(const _0x8daa12 of _0x316299){if(!$gameSwitches[_0x2e82b6(0x1d0)](_0x8daa12))return![];}return!![];}if(_0x2c6ebf[_0x2e82b6(0x310)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1999e8=JSON['parse']('['+RegExp['$1'][_0x2e82b6(0x310)](/\d+/g)+']');for(const _0x47e889 of _0x1999e8){if(!$gameSwitches['value'](_0x47e889))return![];}return!![];}if(_0x2c6ebf[_0x2e82b6(0x310)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x97414e=JSON['parse']('['+RegExp['$1'][_0x2e82b6(0x310)](/\d+/g)+']');for(const _0x584d8e of _0x97414e){if($gameSwitches[_0x2e82b6(0x1d0)](_0x584d8e))return!![];}return![];}if(_0x2c6ebf[_0x2e82b6(0x310)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x488df6=JSON[_0x2e82b6(0x19d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1f4641 of _0x488df6){if(!$gameSwitches['value'](_0x1f4641))return!![];}return![];}if(_0x2c6ebf[_0x2e82b6(0x310)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x29b6e7=JSON[_0x2e82b6(0x19d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2640e0 of _0x29b6e7){if(!$gameSwitches[_0x2e82b6(0x1d0)](_0x2640e0))return!![];}return![];}if(_0x2c6ebf[_0x2e82b6(0x310)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2f8a3e=JSON['parse']('['+RegExp['$1'][_0x2e82b6(0x310)](/\d+/g)+']');for(const _0x106250 of _0x2f8a3e){if($gameSwitches[_0x2e82b6(0x1d0)](_0x106250))return![];}return!![];}return!![];},Window_SkillList[_0x5b4c5d(0x1c9)]['checkShowHideSkillNotetags']=function(_0x4e40a6){const _0x31ca1a=_0x5b4c5d,_0x3eb023=_0x4e40a6[_0x31ca1a(0x292)];if(_0x3eb023[_0x31ca1a(0x310)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4ec08e=JSON['parse']('['+RegExp['$1'][_0x31ca1a(0x310)](/\d+/g)+']');for(const _0x20b243 of _0x4ec08e){if(!this[_0x31ca1a(0x3b7)][_0x31ca1a(0x1f9)](_0x20b243))return![];}return!![];}else{if(_0x3eb023[_0x31ca1a(0x310)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x83eb76=RegExp['$1'][_0x31ca1a(0x3b4)](',');for(const _0x4856d5 of _0x83eb76){const _0x502540=DataManager[_0x31ca1a(0x396)](_0x4856d5);if(!_0x502540)continue;if(!this['_actor'][_0x31ca1a(0x1f9)](_0x502540))return![];}return!![];}}if(_0x3eb023[_0x31ca1a(0x310)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x55d622=JSON[_0x31ca1a(0x19d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x368638 of _0x55d622){if(!this[_0x31ca1a(0x3b7)][_0x31ca1a(0x1f9)](_0x368638))return![];}return!![];}else{if(_0x3eb023[_0x31ca1a(0x310)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x293ad9=RegExp['$1']['split'](',');for(const _0x44a920 of _0x293ad9){const _0x5de536=DataManager[_0x31ca1a(0x396)](_0x44a920);if(!_0x5de536)continue;if(!this[_0x31ca1a(0x3b7)][_0x31ca1a(0x1f9)](_0x5de536))return![];}return!![];}}if(_0x3eb023[_0x31ca1a(0x310)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x35450c=JSON[_0x31ca1a(0x19d)]('['+RegExp['$1'][_0x31ca1a(0x310)](/\d+/g)+']');for(const _0x4f916a of _0x35450c){if(this[_0x31ca1a(0x3b7)]['isLearnedSkill'](_0x4f916a))return!![];}return![];}else{if(_0x3eb023['match'](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x26a0b9=RegExp['$1'][_0x31ca1a(0x3b4)](',');for(const _0x50193 of _0x26a0b9){const _0x3625c0=DataManager[_0x31ca1a(0x396)](_0x50193);if(!_0x3625c0)continue;if(this['_actor']['isLearnedSkill'](_0x3625c0))return!![];}return![];}}if(_0x3eb023[_0x31ca1a(0x310)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3172bc=JSON[_0x31ca1a(0x19d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x44c986 of _0x3172bc){if(!this['_actor'][_0x31ca1a(0x1f9)](_0x44c986))return!![];}return![];}else{if(_0x3eb023[_0x31ca1a(0x310)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x300d43=RegExp['$1'][_0x31ca1a(0x3b4)](',');for(const _0x326fe5 of _0x300d43){const _0x4ce573=DataManager['getSkillIdWithName'](_0x326fe5);if(!_0x4ce573)continue;if(!this[_0x31ca1a(0x3b7)][_0x31ca1a(0x1f9)](_0x4ce573))return!![];}return![];}}if(_0x3eb023[_0x31ca1a(0x310)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4f7e9e=JSON['parse']('['+RegExp['$1'][_0x31ca1a(0x310)](/\d+/g)+']');for(const _0x228848 of _0x4f7e9e){if(!this[_0x31ca1a(0x3b7)][_0x31ca1a(0x1f9)](_0x228848))return!![];}return![];}else{if(_0x3eb023[_0x31ca1a(0x310)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x677ced=RegExp['$1']['split'](',');for(const _0x248a92 of _0x677ced){const _0x48d18d=DataManager[_0x31ca1a(0x396)](_0x248a92);if(!_0x48d18d)continue;if(!this[_0x31ca1a(0x3b7)][_0x31ca1a(0x1f9)](_0x48d18d))return!![];}return![];}}if(_0x3eb023[_0x31ca1a(0x310)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x40a97b=JSON[_0x31ca1a(0x19d)]('['+RegExp['$1'][_0x31ca1a(0x310)](/\d+/g)+']');for(const _0x1d4a00 of _0x40a97b){if(this[_0x31ca1a(0x3b7)][_0x31ca1a(0x1f9)](_0x1d4a00))return![];}return!![];}else{if(_0x3eb023[_0x31ca1a(0x310)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x327489=RegExp['$1']['split'](',');for(const _0x421a55 of _0x327489){const _0xb83538=DataManager[_0x31ca1a(0x396)](_0x421a55);if(!_0xb83538)continue;if(this['_actor'][_0x31ca1a(0x1f9)](_0xb83538))return![];}return!![];}}if(_0x3eb023[_0x31ca1a(0x310)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x18148b=JSON['parse']('['+RegExp['$1'][_0x31ca1a(0x310)](/\d+/g)+']');for(const _0x7dcba5 of _0x18148b){if(!this['_actor'][_0x31ca1a(0x341)](_0x7dcba5))return![];}return!![];}else{if(_0x3eb023['match'](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xf2d3fd=RegExp['$1'][_0x31ca1a(0x3b4)](',');for(const _0x181795 of _0xf2d3fd){const _0x3d1f94=DataManager['getSkillIdWithName'](_0x181795);if(!_0x3d1f94)continue;if(!this[_0x31ca1a(0x3b7)][_0x31ca1a(0x341)](_0x3d1f94))return![];}return!![];}}if(_0x3eb023[_0x31ca1a(0x310)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3e77d2=JSON[_0x31ca1a(0x19d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3e1ee0 of _0x3e77d2){if(!this[_0x31ca1a(0x3b7)][_0x31ca1a(0x341)](_0x3e1ee0))return![];}return!![];}else{if(_0x3eb023[_0x31ca1a(0x310)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x3e78fd=RegExp['$1'][_0x31ca1a(0x3b4)](',');for(const _0x5724a4 of _0x3e78fd){const _0x34585a=DataManager['getSkillIdWithName'](_0x5724a4);if(!_0x34585a)continue;if(!this['_actor'][_0x31ca1a(0x341)](_0x34585a))return![];}return!![];}}if(_0x3eb023['match'](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x47c98f=JSON[_0x31ca1a(0x19d)]('['+RegExp['$1'][_0x31ca1a(0x310)](/\d+/g)+']');for(const _0x72723e of _0x47c98f){if(this[_0x31ca1a(0x3b7)]['hasSkill'](_0x72723e))return!![];}return![];}else{if(_0x3eb023[_0x31ca1a(0x310)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1997c8=RegExp['$1'][_0x31ca1a(0x3b4)](',');for(const _0x5e90b0 of _0x1997c8){const _0x39e36f=DataManager[_0x31ca1a(0x396)](_0x5e90b0);if(!_0x39e36f)continue;if(this[_0x31ca1a(0x3b7)]['hasSkill'](_0x39e36f))return!![];}return![];}}if(_0x3eb023[_0x31ca1a(0x310)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2e9ada=JSON['parse']('['+RegExp['$1'][_0x31ca1a(0x310)](/\d+/g)+']');for(const _0x398e7f of _0x2e9ada){if(!this[_0x31ca1a(0x3b7)][_0x31ca1a(0x341)](_0x398e7f))return!![];}return![];}else{if(_0x3eb023[_0x31ca1a(0x310)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x97abdf=RegExp['$1'][_0x31ca1a(0x3b4)](',');for(const _0x1a8cdc of _0x97abdf){const _0x4a0ed1=DataManager[_0x31ca1a(0x396)](_0x1a8cdc);if(!_0x4a0ed1)continue;if(!this[_0x31ca1a(0x3b7)][_0x31ca1a(0x341)](_0x4a0ed1))return!![];}return![];}}if(_0x3eb023[_0x31ca1a(0x310)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x54a1f6=JSON[_0x31ca1a(0x19d)]('['+RegExp['$1'][_0x31ca1a(0x310)](/\d+/g)+']');for(const _0x7a96be of _0x54a1f6){if(!this[_0x31ca1a(0x3b7)][_0x31ca1a(0x341)](_0x7a96be))return!![];}return![];}else{if(_0x3eb023[_0x31ca1a(0x310)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5f0c0a=RegExp['$1']['split'](',');for(const _0x9e1221 of _0x5f0c0a){const _0x13a85d=DataManager[_0x31ca1a(0x396)](_0x9e1221);if(!_0x13a85d)continue;if(!this[_0x31ca1a(0x3b7)][_0x31ca1a(0x341)](_0x13a85d))return!![];}return![];}}if(_0x3eb023[_0x31ca1a(0x310)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4e2ad0=JSON[_0x31ca1a(0x19d)]('['+RegExp['$1'][_0x31ca1a(0x310)](/\d+/g)+']');for(const _0x1b185c of _0x4e2ad0){if(this['_actor'][_0x31ca1a(0x341)](_0x1b185c))return![];}return!![];}else{if(_0x3eb023[_0x31ca1a(0x310)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x3cdb6b=RegExp['$1'][_0x31ca1a(0x3b4)](',');for(const _0x2168c7 of _0x3cdb6b){const _0x5310e2=DataManager[_0x31ca1a(0x396)](_0x2168c7);if(!_0x5310e2)continue;if(this['_actor'][_0x31ca1a(0x341)](_0x5310e2))return![];}return!![];}}return!![];},Window_SkillList['prototype'][_0x5b4c5d(0x313)]=function(_0x278b08){const _0x26890b=_0x5b4c5d,_0x346111=_0x278b08[_0x26890b(0x292)],_0x5df659=VisuMZ[_0x26890b(0x1f7)][_0x26890b(0x1d6)];return _0x5df659[_0x278b08['id']]?_0x5df659[_0x278b08['id']][_0x26890b(0x214)](this,_0x278b08):!![];},Window_SkillList[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x179)]=function(_0x553842,_0x1abdf4,_0x17caac,_0xfbe405){const _0x420a2a=_0x5b4c5d;Window_Base['prototype'][_0x420a2a(0x179)]['call'](this,this[_0x420a2a(0x3b7)],_0x553842,_0x1abdf4,_0x17caac,_0xfbe405);},Window_SkillList[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x210)]=function(_0x3390b7){const _0x1b6349=_0x5b4c5d;this['_statusWindow']=_0x3390b7,this[_0x1b6349(0x2d8)]();},VisuMZ[_0x5b4c5d(0x1f7)]['Window_SkillList_updateHelp']=Window_SkillList['prototype'][_0x5b4c5d(0x3c1)],Window_SkillList[_0x5b4c5d(0x1c9)][_0x5b4c5d(0x3c1)]=function(){const _0x5bc83c=_0x5b4c5d;VisuMZ[_0x5bc83c(0x1f7)][_0x5bc83c(0x35e)][_0x5bc83c(0x214)](this),this[_0x5bc83c(0x36a)]&&this[_0x5bc83c(0x36a)][_0x5bc83c(0x35f)]===Window_ShopStatus&&this[_0x5bc83c(0x36a)][_0x5bc83c(0x32f)](this[_0x5bc83c(0x17e)]());};