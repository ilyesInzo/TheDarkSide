//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.21;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.21] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
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
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for singul column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
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
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - If the actor this is disabled for is the only party member, it will not be
 *   visible in the item list unless the VisuStella Battle Core is installed.
 *   - If the VisuStella Battle Core is installed, then all battle scope items
 *     will be visible even if they're disabled.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 * 
 * <Equip Copy Limit: x>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Sets a maximum number of copies that the actor can wear of this equipment.
 * - Replace 'x' with a number value to determine the copy limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: Actors can only equip one copy of the "One-of-a-Kind Ring"
 *   on at any time despite having empty accessory slots because the ring has a
 *   <Equip Copy Limit: 1> notetag.
 * 
 * ---
 * 
 * <Equip Weapon Type Limit: x>
 * 
 * - Used for: Weapon
 * - This weapon cannot be equipped with other weapons of the same type once
 *   the limited amount has been reached.
 * - Replace 'x' with a number value to determine the weapon type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: A dualwielding warrior who can only equip one sword and a
 *   dagger but never two swords or two daggers because the swords and daggers
 *   all have the <Equip Weapon Type Limit: 1> notetags on them.
 * 
 * ---
 * 
 * <Equip Armor Type Limit: x>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped with other armors of the same type once the
 *   limited amount has been reached.
 * - Replace 'x' with a number value to determine the armor type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: People cannot equip more than two glove accessories on at a
 *   time because the glove is a "Glove" armor-type and each glove item has the
 *   <Equip Armor Type Limit: 2> notetags on them.
 * 
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
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
 * Actor: Change Equip Slots
 * - Forcefully change the actor(s) equip slots.
 * - These will persist through class changes.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Equip Slots:
 *   - Insert the equip slots you want the actor(s) to have.
 *   - These entries are case-sensitive.
 *
 * ---
 *
 * Actor: Reset Equip Slots
 * - Reset any forced equip slots for the actor(s).
 * - Equip slots will then be based on class.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Shop Plugin Commands ===
 * 
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
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
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 * 
 *     Visibility Switch:
 *     - This Switch must be turned ON in order for the category to show.
 *     - Use 0 for no Switch requirement.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optomized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
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
 * Switches:
 * 
 *   Switch: Buy:
 *   - Buying items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 *   Switch: Sell
 *   - Selling items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 * ---
 *
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Already Equipped:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   Can't Equip:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   No Changes:
 *   - Marker used to show no changes have occurred.
 * 
 *   JS: Draw Equip Data:
 *   - Code used to draw the equipment data for the Shop Status Window.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 * 
 *   NOTE: Regarding Damage Labels
 * 
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * 
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
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
 * Version 1.21: March 5, 2021
 * * Feature Update!
 * ** Custom equipment slots are disabled during Battle Testing for better
 *    accuracy and results.
 * 
 * Version 1.20: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Buy
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Sell
 * **** Buying/selling items in the Shop Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Shop Scene opens.
 * **** These switches can be used after a "Shop Processing" event command to
 *      determine if the player has bought an item, bought and sold an item,
 *      sold an item, or neither.
 * 
 * Version 1.19: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina.
 * *** <Equip Copy Limit: x>
 * **** Sets a maximum number of copies that the actor can wear of this
 *      equipment. Usage Example: Actors can only equip one copy of the
 *      "One-of-a-Kind Ring" on at any time despite having empty accessory
 *      slots because the ring has a <Equip Copy Limit: 1> notetag.
 * *** <Equip Weapon Type Limit: x>
 * **** This weapon cannot be equipped with other weapons of the same type once
 *      the limited amount has been reached. Usage Example: A dualwielding
 *      warrior who can only equip one sword and a dagger but never two swords
 *      or two daggers because the swords and daggers all have the
 *      <Equip Weapon Type Limit: 1> notetags on them.
 * *** <Equip Armor Type Limit: x>
 * **** This armor cannot be equipped with other armors of the same type once
 *      the limited amount has been reached. Usage Example: People cannot equip
 *      more than two glove accessories on at a time because the glove is a
 *      "Glove" armor-type and each glove item has the
 *      <Equip Armor Type Limit: 2> notetags on them.
 * 
 * Version 1.18: January 15, 2021
 * * Bug Fixes!
 * ** Pressing "Shift" to remove equipment will now refresh the status window
 *    unlike before. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Item Menu Settings > Background Type
 * 
 * Version 1.17: January 1, 2021
 * * Bug Fixes!
 * ** Equipping should be working properly again. Fix made by Yanfly.
 * 
 * Version 1.16: December 25, 2020
 * * Bug Fixes!
 * ** Equip-Adjust HP/MP should work properly now. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that if the VisuStella
 *    Battle Core is installed, then all battle scope items are visible, but
 *    not necessarily enabled if they are disabled otherwise.
 * 
 * Version 1.15: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that it removes the
 *    usable item from visibility as well if the actor unable to use it is the
 *    only person in the party.
 * 
 * Version 1.14: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.13: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Actor: Change Equip Slots
 * *** Actor: Reset Equip Slots
 * **** These plugin commands allow you to forcefully change the equip slots
 *      available to an actor regardless of the slots provided by its class as
 *      well as reset them.
 * 
 * Version 1.12: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 8, 2020
 * * Bug Fix!
 * ** Font size ratio for the shop status window now scales to a hard coded
 *    value to prevent smaller font sizes from expanding icon sizes. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Currency display in the shop menu is now reflected upon how the plugin
 *    parameters set them to display. Update made by Arisu.
 * 
 * Version 1.10: November 1, 2020
 * * Feature Update!
 * ** Modern Controls compatibility with Core Engine no longer enables the
 *    Item Categories window and child classes to utilize the Home/End keys.
 * 
 * Version 1.09: October 25, 2020
 * * Bug Fixes!
 * ** "All Items" category should now display the "Items" text. Fix by Irina.
 * ** WType, AType, and EType categories now work with text. Fix by Irina.
 *
 * Version 1.08: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: October 11, 2020
 * * Bug Fixes!
 * ** XParams and SParams in the Window_EquipStatus window will no longer show
 *    a non-percentile difference if the original value is not a whole value.
 *    Fix made by Yanfly.
 * 
 * Version 1.06: October 4, 2020
 * * Bug Fixes!
 * ** Select Item event command now displays the default amount of columns
 *    instead of whatever setting is made with the plugin parameters.
 * 
 * Version 1.05: September 27, 2020
 * * Bug Fixes!
 * ** When using the updated shop layout, leaving the sell option will no
 *    longer cause the dummy window to appear.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 * 
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
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
 * @command ActorChangeEquipSlots
 * @text Actor: Change Equip Slots
 * @desc Forcefully change the actor(s) equip slots.
 * These will persist through class changes.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 * 
 * @arg Slots:arraystr
 * @text Equip Slots
 * @type string[]
 * @desc Insert the equip slots you want the actor(s) to have.
 * These entries are case-sensitive.
 * @default ["Weapon","Shield","Head","Body","Accessory"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorResetEquipSlots
 * @text Actor: Reset Equip Slots
 * @desc Reset any forced equip slots for the actor(s).
 * Equip slots will then be based on class.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
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
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","CommandAddOptimize:eval":"false","CmdIconOptimize:num":"137","CommandAddClear:eval":"false","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes"}
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
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
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
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusBgType:num
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
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
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
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @text Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param SwitchID:num
 * @text Visibility Switch
 * @type switch
 * @desc This Switch must be turned ON in order for the category to show.
 * Use 0 for no Switch requirement.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the NEW! Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
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
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optomized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
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
 * @param Switches
 *
 * @param SwitchBuy:num
 * @text Switch: Buy
 * @parent Switches
 * @type switch
 * @desc Buying items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param SwitchSell:num
 * @text Switch: Sell
 * @parent Switches
 * @type switch
 * @desc Selling items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EquipData
 * @text Equipment Data
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipData
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipData
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 */
//=============================================================================

const _0x5897=['itemLineRect','getItemSpeedText','refreshActorEquipSlotsIfUpdated','Enable','0000','ConvertNumberToString','drawItemEffects','categoryNameWindowDrawText','_slotId','drawItemEffectsMpRecovery','Scene_Shop_commandWindowRect','FieldUsable','addChild','W%1','Game_BattlerBase_meetsItemConditions','_doubleTouch','LabelDamageHP','drawItemEffectsSelfTpGain','968689nLTLKp','effects','sellPriceRate','SellPriceJS','drawText','CmdIconSell','Window_ItemList_colSpacing','ItemSceneAdjustItemList','exit','textWidth','possession','setNewItem','lineHeight','onSellCancel','MaxIcons','indexOf','equip2','cursorPagedown','damage','Scene_Equip_commandEquip','_resetFontSize','Window_ShopCommand_initialize','currentEquippedItem','RegExp','itemTextAlign','getItemEffectsAddedStatesBuffsText','LayoutStyle','registerCommand','Scene_Item_createCategoryWindow','getItemEffectsHpDamageLabel','prepareRefreshItemsEquipsCoreLayout','Scene_Shop_activateSellWindow','isPressed','value','param','bitmap','_forcedSlots','ParseAllNotetags','windowPadding','helpWindowRect','updateHelp','_newLabelOpacityUpperLimit','equipSlots','_shopStatusMenuMode','_commandWindow','drawNewLabelText','getItemEffectsTpRecoveryLabel','elementId','Scene_Shop_doBuy','itemEnableJS','KeyItemProtect','NUM','resetTextColor','resetFontSettings','isSoleArmorType','getItemEffectsMpDamageLabel','getItemHitTypeText','format','_categoryWindow','Game_Party_gainItem','getItemDamageAmountTextOriginal','getTextColor','placeItemNewLabel','\x5cI[%1]','onSellOk','uiMenuStyle','NonOptimizeETypes','note','mainAreaBottom','_list','left','clearNewItem','boxWidth','log','ItemMenuStatusRect','doSell','loadFaceImages','Param','1eBBFiF','_data','buttonAssistItemListRequirement','push','playBuzzerSound','SPEED','equipAdjustHpMp','drawItemHitType','removeStateBuffChanges','getItemEffectsMpDamageText','TextAlign','Scene_Equip_commandWindowRect','onTouchSelectModern','currentSymbol','initNewLabelSprites','DrawFaceJS','contentsBack','onSlotOk','isClearEquipOk','Scene_ItemBase_activateItemWindow','isOpenAndActive','getItemEffectsMpRecoveryLabel','getNextAvailableEtypeId','getItemRepeatsLabel','isOptimizeCommandAdded','postCreateCategoryWindowItemsEquipsCore','active','Scene_Shop_goldWindowRect','prototype','Step2End','isRightInputMode','members','maxItems','LabelRecoverMP','buttonAssistText3','weaponTypes','meetsItemConditionsNotetags','length','commandNameWindowDrawText','onSellOkItemsEquipsCore','down','isBuyCommandEnabled','value1','isClearCommandAdded','removeDebuff','weapon-%1','buttonAssistKey2','DrawBackRect','LabelRecoverHP','setHelpWindowItem','AllItems','setHp','isCommandEnabled','isNewItem','Game_Actor_discardEquip','categoryWindowRectItemsEquipsCore','LabelSpeed','prepareItemCustomData','itemDataFontSize','paramValueFontSize','maxItemAmount','HP\x20DAMAGE','BattleUsable','isDualWield','Scene_Shop_sellWindowRect','createSlotWindow','getItemEffectsTpDamageText','VisuMZ_0_CoreEngine','modifiedBuyPriceItemsEquipsCore','constructor','onBuyCancelItemsEquipsCore','+%1%','Translucent','getColor','getItemRepeatsText','drawItemEquipType','releaseUnequippableItems','QoL','isCursorMovable','getItemColor','getItemEffectsAddedStatesBuffsLabel','_item','Scene_Shop_create','onMenuImageLoad','name','commandStyle','paramValueByName','etypeId','IncludeShopItem','TP\x20RECOVERY','ItemsEquipsCore','categoryNameWindowDrawBackground','iconIndex','equips','isShiftRemoveShortcutEnabled','14887nAMwml','100%','currencyUnit','makeDeepCopy','Scene_Shop_createCategoryWindow','MaxItems','statusWindowRectItemsEquipsCore','addClearCommand','processCursorMoveModernControls','pageup','9SqsjRS','drawItemName','Scene_Shop_doSell','mainAreaTop','clear','determineBaseSellingPrice','popScene','floor','canConsumeItem','Scene_Shop_numberWindowRect','_resetFontColor','auto','isShiftShortcutKeyForRemove','isSoleWeaponType','armorTypes','occasion','drawItemOccasion','drawIcon','List','innerWidth','deselect','EVAL','match','_buyWindow','onTouchOk','status','Scene_Equip_onSlotOk','DrawEquipData','KeyItems','createCommandNameWindow','forceResetEquipSlots','?????','makeCommandList','SwitchSell','show','onActorChange','drawItemKeyData','buttonAssistCategory','LabelSuccessRate','process_VisuMZ_ItemsEquipsCore_RegExp','onBuyCancel','buttonAssistKey1','CmdStyle','FadeLimit','allowCommandWindowCursorUp','updateCategoryNameWindow','getItemEffectsHpRecoveryLabel','gainTP','MP\x20RECOVERY','drawUpdatedBeforeParamValue','HiddenItemB','Consumable','processCursorSpecialCheckModernControls','commandSellItemsEquipsCore','isEquipped','convertInitEquipsToItems','Scene_Equip_itemWindowRect','Scene_Shop_statusWindowRect','cursorLeft','Actors','textSizeEx','text','playCursorSound','map','_dummyWindow','update','addInnerChild','isEquipCommandEnabled','drawItemDamage','drawParamText','RemoveEquipIcon','meetsItemConditionsJS','drawItemDarkRect','Window_Selectable_update','drawItemStyleIcon','CannotEquipMarker','drawing','%1%','Blacklist','getItemScopeText','playOkSound','ScopeRandomAny','isPageChangeRequested','ShowShopStatus','numberWindowRect','height','LabelDamageTP','meetsItemConditions','getItemEffectsTpRecoveryText','processTouchModernControls','MaxWeapons','_categoryNameWindow','itemAt','CmdHideDisabled','drawItemDamageAmount','382011InmBpL','buy','uiInputPosition','commandSell','mpRate','isRepeated','formula','forceChangeEquipSlots','13vbLdfF','contents','CmdIconBuy','changeTextColor','itemWindowRect','shift','drawRemoveItem','_goodsCount','discardEquip','createNewLabelSprite','getItemOccasionText','_itemData','clamp','onCategoryCancelItemsEquipsCore','BorderRegExp','nextActor','EquipAdjustHpMp','Parse_Notetags_ParamJS','iconHeight','categoryItemTypes','gaugeBackColor','select','isHoverEnabled','Window_Selectable_setHelpWindowItem','FontFace','NonRemoveETypes','onCategoryCancel','isHandled','drawPossession','Scene_Shop_commandSell','getMatchingInitEquip','427414KgbmRg','FontSize','Parse_Notetags_Prices','drawItemRepeats','11oflqGJ','maxVisibleItems','getItemDamageElementLabel','Window_Selectable_initialize','(+%1)','paramJS','getItemEffectsRemovedStatesBuffsLabel','wtypeId','iconWidth','_money','itemHasEquipLimit','VisuMZ_1_MainMenuCore','changePaintOpacity','Step1Start','drawNewLabelIcon','Parse_Notetags_ParamValues','setValue','MDF','addCommand','_newLabelSprites','sellWindowRectItemsEquipsCore','30593TtWzpw','DrawParamJS','optimizeEquipments','mainCommandWidth','isEnabled','code','atypeId','Text','Scene_Shop_onSellOk','OCCASION','Window_Selectable_refresh','categoryStyleCheck','tpGain','getItemEffectsMpRecoveryText','_tempActorA','_sellWindow','commandStyleCheck','hideNewLabelSprites','_equips','hide','isDrawItemNumber','ParseClassNotetags','commandWindowRect','parse','selfTP','checkItemConditionsSwitchNotetags','_numberWindow','Scene_Item_createItemWindow','onTouchCancel','isWeapon','initialize','commandNameWindowDrawBackground','categories','SpeedNeg1999','item','isMainMenuCoreMenuImageOptionAvailable','drawItemCost','removeState','DamageType%1','isCancelled','includes','isUseModernControls','isKeyItem','description','_handlers','helpAreaTop','equip','_slotWindow','ListWindowCols','ParseItemNotetags','addBuyCommand','EFFECT_GAIN_TP','buttonAssistText2','Game_Actor_changeEquip','slotWindowRect','dataId','StatusWindow','create','drawCurrencyValue','CmdIconOptimize','getItemsEquipsCoreBackColor2','getItemEffectsRemovedStatesBuffsText','drawItemConsumable','commandBuy','center','processShiftRemoveShortcut','33279VJBDcF','getItemDamageAmountTextBattleCore','Step3Start','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_tempActorB','VisuMZ_1_BattleCore','loadPicture','allowCreateStatusWindow','drawItemSpeed','shouldCommandWindowExist','translucentOpacity','index','Scene_Equip_onSlotCancel','processCursorHomeEndTrigger','ADDED\x20EFFECTS','createStatusWindow','Scene_Item_categoryWindowRect','ActorChangeEquipSlots','categoryStyle','CoreEngine','nonRemovableEtypes','updatedLayoutStyle','flatHP','ActorResetEquipSlots','addLoadListener','defaultItemMax','calcWindowHeight','_newItemsList','commandWindowRectItemsEquipsCore','ShopScene','reloadMapIfUpdated','MenuPortraits','updateNewLabelOpacity','splice','Parse_Notetags_Batch','gainItem','buffIconIndex','getItemSuccessRateLabel','itypeId','REMOVED\x20EFFECTS','drawItemData','Game_BattlerBase_param','paintOpacity','drawItemEffectsAddedStatesBuffs','normalColor','ItemQuantityFmt','loadSystem','loadCharacter','drawItemDamageElement','actorParams','commandEquip','buttonAssistSlotWindowShift','ItemQuantityFontSize','helpWindowRectItemsEquipsCore','NeverUsable','566HBHQUK','numItems','3HsQqFM','setItem','revertGlobalNamespaceVariables','drawItemQuantity','TP\x20DAMAGE','rateMP','getItemEffectsHpDamageText','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','HitType%1','categoryWindowRect','getItemHitTypeLabel','statusWindowRect','doBuy','+%1','prepareNextScene','drawItem','Window_EquipItem_isEnabled','#%1','postCreateSellWindowItemsEquipsCore','itemPadding','opacity','makeItemData','Scene_Equip_onActorChange','getMenuImage','activateSellWindow','setBackgroundType','repeats','Scene_Load_reloadMapIfUpdated','Scene_Shop_categoryWindowRect','isEquipCommandAdded','processCursorMove','Window_ItemCategory_setItemWindow','_statusWindow','deactivate','isItem','itemWindowRectItemsEquipsCore','Window_ItemList_drawItem','getItemEffectsHpRecoveryText','item-%1','cursorRight','powerUpColor','ItemMenuStatusBgType','mainFontSize','USER\x20TP\x20GAIN','PurchaseOnly','cancel','drawItemCustomEntries','Scene_Item_itemWindowRect','categoryNameWindowCenter','getItemsEquipsCoreBackColor1','StatusWindowWidth','currentClass','AlwaysUsable','addWindow','systemColor','equipSlotIndex','Parse_Notetags_Category','helpAreaHeight','getItemSpeedLabel','isClearCommandEnabled','Speed0','allowShiftScrolling','setShopStatusWindowMode','commandNameWindowCenter','addOptimizeCommand','clearEquipments','isUseItemsEquipsCoreUpdatedLayout','callUpdateHelp','STR','getItemDamageAmountText','SwitchBuy','HP\x20RECOVERY','ParseWeaponNotetags','setHandler','getItemEffectsSelfTpGainLabel','Scope%1','Parse_Notetags_EquipSlots','drawItemEffectsTpDamage','paramPlus','prepareNewEquipSlotsOnLoad','mainAreaHeight','BuyPriceJS','fontSizeRatio','canShiftRemoveEquipment','\x5cb%1\x5cb','MAT','isTriggered','round','drawItemActorMenuImage','drawActorParamDifference','Scene_Shop_onSellCancel','nonOptimizeEtypes','cursorPageup','flatMP','Categories','ScopeRandomEnemies','ceil','Occasion%1','LabelElement','adjustHiddenShownGoods','ElementNone','EquipScene','ARRAYEVAL','ARRAYSTR','drawItemEffectsMpDamage','changeEquip','previousActor','isOpen','getItemDamageAmountLabel','getInputMultiButtonStrings','SUCCESS\x20RATE','canUse','EFFECT_REMOVE_STATE','updateCommandNameWindow','_itemWindow','ItemScene','sell','process_VisuMZ_ItemsEquipsCore_Notetags','Scene_Equip_slotWindowRect','drawUpdatedParamName','ATK','Game_Actor_paramPlus','fillRect','AllArmors','FadeSpeed','Game_Party_initialize','bind','ARRAYSTRUCT','buttonAssistOffset3','drawItemNumber','paramchangeTextColor','limitedPageUpDownSceneCheck','type','maxCols','goldWindowRectItemsEquipsCore','adjustItemWidthByStatus','postCreateItemsEquipsCore','DAMAGE\x20MULTIPLIER','getItemConsumableLabel','split','uiHelpPosition','hideDisabledCommands','optKeyItemsNumber','call','process_VisuMZ_ItemsEquipsCore_EquipSlots','getItemConsumableText','onSlotCancel','trim','weapon','CmdTextAlign','buttonAssistText1','Scene_Equip_create','fill','Scene_Equip_statusWindowRect','createCategoryWindow','MANUAL','createBitmap','right','ShiftShortcutKey','%1-%2','Parse_Notetags_EnableJS','fontSize','processHandling','changeBuff','isGoodShown','changeEquipById','NoChangeMarker','paramPlusItemsEquipsCoreCustomJS','addCancelCommand','SwitchID','New','slotWindowRectItemsEquipsCore','updateMoneyAmount','_tempActor','ElementWeapon','Speed1','_commandNameWindow','params','ExtDisplayedParams','ARRAYFUNC','postCreateSlotWindowItemsEquipsCore','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','CmdIconEquip','drawTextEx','isClicked','replace','ParamChangeFontSize','addEquipCommand','AGI','Window_ItemList_updateHelp','_newLabelOpacityChange','hitIndex','buyWindowRect','return\x200','placeNewLabel','canEquip','DrawIcons','CommandAddClear','drawItemEffectsRemovedStatesBuffs','Scene_Shop_commandBuy','MaxArmors','Game_Actor_tradeItemWithParty','Step1End','paramId','buttonAssistKey3','ConvertParams','RegularItems','onTouchSelect','Scene_Shop_buyWindowRect','icon','setTempActor','optimize','Scene_Item_create','isOptimizeCommandEnabled','isSellCommandEnabled','EFFECT_RECOVER_MP','forceChangeEquip','getInputButtonString','drawParamsItemsEquipsCore','getItemEffectsTpDamageLabel','buttonAssistRemove','commandBuyItemsEquipsCore','Game_Actor_forceChangeEquip','toUpperCase','onCategoryOk','max','ParseArmorNotetags','Scene_Boot_onDatabaseLoaded','Window_ShopSell_isEnabled','characterName','prepare','Settings','visible','goldWindowRect','resetShopSwitches','refreshCursor','getItemQuantityText','isOptimizeEquipOk','onTouchSelectModernControls','equipTypes','JSON','activateItemWindow','addState','isBottomHelpMode','elements','removeBuff','versionId','refresh','Window_ItemList_maxCols','smoothSelect','actor','addSellCommand','Icon','rateHP','tradeItemWithParty','initNewItemsList','colSpacing','powerDownColor','getItemDamageElementText','setObject','\x5cI[%1]%2','_actor','drawItemCustomEntryLine','bestEquipItem','drawItemEffectsTpRecovery','damageColor','addStateBuffChanges','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_scene','hitType','isArmor','_buyWindowLastIndex','hideAdditionalSprites','move','value2','Scene_Equip_createSlotWindow','2329nApKeE','BackRectColor','HiddenItemA','createSellWindow','Window_ItemCategory_initialize','drawItemStyleIconText','pagedown','Window_EquipItem_includes','drawParamName','category','textColor','buttonAssistLargeIncrement','drawItemScope','_customItemInfo','addItemCategory','LabelConsume','postCreateItemWindowModernControls','setStatusWindow','createItemWindow','processDrawIcon','ARRAYNUM','currentExt','isPlaytest','armor-%1','LabelRepeats','setCategory','categoryList','getDamageStyle','_newLabelOpacity','Step3End','sellWindowRect','activate','remove','RemoveEquipText','isShowNew','Step2Start','getItemDamageAmountLabelOriginal','width','newLabelEnabled','iconText','CommandAddOptimize','Scene_Shop_prepare','price','onSlotOkAutoSelect','Window_EquipStatus_refresh','refreshItemsEquipsCoreNoMenuImage','checkShiftRemoveShortcut','commandName','buyWindowRectItemsEquipsCore','_goods','drawItemEffectsHpDamage','Scene_Shop_onBuyCancel','IconSet','BatchShop','_category','getItemEffectsSelfTpGainText','SellPriceRate','numberWindowRectItemsEquipsCore','isEquipItem','Type','getItemSuccessRateText','isHovered','statusWidth','_bypassNewLabel','MP\x20DAMAGE','Slots','EnableLayout','Nonconsumable','_calculatingJSParameters','setupItemDamageTempActors','EFFECT_REMOVE_DEBUFF'];const _0x9f21=function(_0x5002c5,_0x49a226){_0x5002c5=_0x5002c5-0x1cc;let _0x5897b2=_0x5897[_0x5002c5];return _0x5897b2;};const _0x1ca854=_0x9f21;(function(_0x265a43,_0x3a5678){const _0x261450=_0x9f21;while(!![]){try{const _0x181d4c=-parseInt(_0x261450(0x3d2))*-parseInt(_0x261450(0x2bc))+-parseInt(_0x261450(0x20b))*parseInt(_0x261450(0x243))+parseInt(_0x261450(0x203))*-parseInt(_0x261450(0x2be))+parseInt(_0x261450(0x22a))+-parseInt(_0x261450(0x42b))*-parseInt(_0x261450(0x479))+parseInt(_0x261450(0x4e2))*-parseInt(_0x261450(0x285))+-parseInt(_0x261450(0x4d8))*parseInt(_0x261450(0x22e));if(_0x181d4c===_0x3a5678)break;else _0x265a43['push'](_0x265a43['shift']());}catch(_0xa1d9c9){_0x265a43['push'](_0x265a43['shift']());}}}(_0x5897,0xacaeb));var label=_0x1ca854(0x4d3),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x2e9ebc){const _0x3fcebe=_0x1ca854;return _0x2e9ebc[_0x3fcebe(0x4fb)]&&_0x2e9ebc[_0x3fcebe(0x26e)][_0x3fcebe(0x26b)]('['+label+']');})[0x0];VisuMZ[label][_0x1ca854(0x3a5)]=VisuMZ[label][_0x1ca854(0x3a5)]||{},VisuMZ[_0x1ca854(0x38b)]=function(_0x1efb5f,_0xf581ad){const _0x5088ff=_0x1ca854;for(const _0x1676b7 in _0xf581ad){if(_0x1676b7['match'](/(.*):(.*)/i)){const _0x31ade1=String(RegExp['$1']),_0xf8edbd=String(RegExp['$2'])[_0x5088ff(0x39d)]()['trim']();let _0x1b2b6e,_0x2e3a59,_0x3c7dd7;switch(_0xf8edbd){case _0x5088ff(0x45e):_0x1b2b6e=_0xf581ad[_0x1676b7]!==''?Number(_0xf581ad[_0x1676b7]):0x0;break;case _0x5088ff(0x3e6):_0x2e3a59=_0xf581ad[_0x1676b7]!==''?JSON[_0x5088ff(0x25a)](_0xf581ad[_0x1676b7]):[],_0x1b2b6e=_0x2e3a59[_0x5088ff(0x1e3)](_0x410b6a=>Number(_0x410b6a));break;case _0x5088ff(0x4f7):_0x1b2b6e=_0xf581ad[_0x1676b7]!==''?eval(_0xf581ad[_0x1676b7]):null;break;case _0x5088ff(0x324):_0x2e3a59=_0xf581ad[_0x1676b7]!==''?JSON[_0x5088ff(0x25a)](_0xf581ad[_0x1676b7]):[],_0x1b2b6e=_0x2e3a59[_0x5088ff(0x1e3)](_0x36f38c=>eval(_0x36f38c));break;case _0x5088ff(0x3ae):_0x1b2b6e=_0xf581ad[_0x1676b7]!==''?JSON[_0x5088ff(0x25a)](_0xf581ad[_0x1676b7]):'';break;case'ARRAYJSON':_0x2e3a59=_0xf581ad[_0x1676b7]!==''?JSON[_0x5088ff(0x25a)](_0xf581ad[_0x1676b7]):[],_0x1b2b6e=_0x2e3a59['map'](_0x375541=>JSON['parse'](_0x375541));break;case'FUNC':_0x1b2b6e=_0xf581ad[_0x1676b7]!==''?new Function(JSON[_0x5088ff(0x25a)](_0xf581ad[_0x1676b7])):new Function(_0x5088ff(0x37f));break;case _0x5088ff(0x371):_0x2e3a59=_0xf581ad[_0x1676b7]!==''?JSON[_0x5088ff(0x25a)](_0xf581ad[_0x1676b7]):[],_0x1b2b6e=_0x2e3a59[_0x5088ff(0x1e3)](_0x5ba974=>new Function(JSON[_0x5088ff(0x25a)](_0x5ba974)));break;case _0x5088ff(0x302):_0x1b2b6e=_0xf581ad[_0x1676b7]!==''?String(_0xf581ad[_0x1676b7]):'';break;case _0x5088ff(0x325):_0x2e3a59=_0xf581ad[_0x1676b7]!==''?JSON[_0x5088ff(0x25a)](_0xf581ad[_0x1676b7]):[],_0x1b2b6e=_0x2e3a59[_0x5088ff(0x1e3)](_0x190777=>String(_0x190777));break;case'STRUCT':_0x3c7dd7=_0xf581ad[_0x1676b7]!==''?JSON[_0x5088ff(0x25a)](_0xf581ad[_0x1676b7]):{},_0x1efb5f[_0x31ade1]={},VisuMZ[_0x5088ff(0x38b)](_0x1efb5f[_0x31ade1],_0x3c7dd7);continue;case _0x5088ff(0x33d):_0x2e3a59=_0xf581ad[_0x1676b7]!==''?JSON[_0x5088ff(0x25a)](_0xf581ad[_0x1676b7]):[],_0x1b2b6e=_0x2e3a59[_0x5088ff(0x1e3)](_0x3d6386=>VisuMZ['ConvertParams']({},JSON[_0x5088ff(0x25a)](_0x3d6386)));break;default:continue;}_0x1efb5f[_0x31ade1]=_0x1b2b6e;}}return _0x1efb5f;},(_0x45760d=>{const _0x1e2826=_0x1ca854,_0x2c86ef=_0x45760d[_0x1e2826(0x4cd)];for(const _0x19b133 of dependencies){if(!Imported[_0x19b133]){alert(_0x1e2826(0x373)[_0x1e2826(0x464)](_0x2c86ef,_0x19b133)),SceneManager[_0x1e2826(0x433)]();break;}}const _0x15efc8=_0x45760d[_0x1e2826(0x26e)];if(_0x15efc8[_0x1e2826(0x4f8)](/\[Version[ ](.*?)\]/i)){const _0x4a2f64=Number(RegExp['$1']);_0x4a2f64!==VisuMZ[label]['version']&&(alert(_0x1e2826(0x3c9)[_0x1e2826(0x464)](_0x2c86ef,_0x4a2f64)),SceneManager['exit']());}if(_0x15efc8['match'](/\[Tier[ ](\d+)\]/i)){const _0x2d438e=Number(RegExp['$1']);_0x2d438e<tier?(alert(_0x1e2826(0x288)['format'](_0x2c86ef,_0x2d438e,tier)),SceneManager[_0x1e2826(0x433)]()):tier=Math[_0x1e2826(0x39f)](_0x2d438e,tier);}VisuMZ[_0x1e2826(0x38b)](VisuMZ[label][_0x1e2826(0x3a5)],_0x45760d['parameters']);})(pluginData),PluginManager['registerCommand'](pluginData[_0x1ca854(0x4cd)],_0x1ca854(0x296),_0x3469cb=>{const _0x57cce9=_0x1ca854;VisuMZ['ConvertParams'](_0x3469cb,_0x3469cb);const _0x46a366=_0x3469cb[_0x57cce9(0x1df)][_0x57cce9(0x1e3)](_0x124a79=>$gameActors[_0x57cce9(0x3b8)](_0x124a79)),_0x3d0db7=_0x3469cb[_0x57cce9(0x413)][_0x57cce9(0x1e3)](_0x39b5f2=>$dataSystem[_0x57cce9(0x3ad)][_0x57cce9(0x43a)](_0x39b5f2[_0x57cce9(0x351)]()));for(const _0x51bd7b of _0x46a366){if(!_0x51bd7b)continue;_0x51bd7b[_0x57cce9(0x20a)](_0x3d0db7);}}),PluginManager[_0x1ca854(0x446)](pluginData['name'],_0x1ca854(0x29c),_0x4a9192=>{const _0x474e3f=_0x1ca854;VisuMZ[_0x474e3f(0x38b)](_0x4a9192,_0x4a9192);const _0x328ffd=_0x4a9192[_0x474e3f(0x1df)][_0x474e3f(0x1e3)](_0x316cf4=>$gameActors['actor'](_0x316cf4));for(const _0x472f47 of _0x328ffd){if(!_0x472f47)continue;_0x472f47[_0x474e3f(0x500)]();}}),PluginManager[_0x1ca854(0x446)](pluginData['name'],_0x1ca854(0x407),_0x40189f=>{const _0x17c486=_0x1ca854;VisuMZ[_0x17c486(0x38b)](_0x40189f,_0x40189f);const _0x174007=[],_0x276cca=_0x40189f[_0x17c486(0x1f2)]['map'](_0x13a7c4=>_0x13a7c4[_0x17c486(0x39d)]()['trim']()),_0x496bde=_0x40189f['Whitelist'][_0x17c486(0x1e3)](_0x324768=>_0x324768['toUpperCase']()[_0x17c486(0x351)]()),_0x1799a9=_0x40189f[_0x17c486(0x388)]>=_0x40189f[_0x17c486(0x23b)]?_0x40189f[_0x17c486(0x23b)]:_0x40189f[_0x17c486(0x388)],_0x212630=_0x40189f[_0x17c486(0x388)]>=_0x40189f[_0x17c486(0x23b)]?_0x40189f[_0x17c486(0x388)]:_0x40189f[_0x17c486(0x23b)],_0xe16180=Array(_0x212630-_0x1799a9+0x1)[_0x17c486(0x356)]()[_0x17c486(0x1e3)]((_0x5f3203,_0x1693e5)=>_0x1799a9+_0x1693e5);for(const _0x152ac6 of _0xe16180){const _0x35c980=$dataItems[_0x152ac6];if(!_0x35c980)continue;if(!VisuMZ[_0x17c486(0x4d3)][_0x17c486(0x4d1)](_0x35c980,_0x276cca,_0x496bde))continue;_0x174007['push']([0x0,_0x152ac6,0x0,_0x35c980['price']]);}const _0x2ff995=_0x40189f[_0x17c486(0x496)]>=_0x40189f['Step2Start']?_0x40189f['Step2Start']:_0x40189f[_0x17c486(0x496)],_0xd9b112=_0x40189f[_0x17c486(0x496)]>=_0x40189f[_0x17c486(0x3f5)]?_0x40189f[_0x17c486(0x496)]:_0x40189f[_0x17c486(0x3f5)],_0xed1f15=Array(_0xd9b112-_0x2ff995+0x1)[_0x17c486(0x356)]()[_0x17c486(0x1e3)]((_0x5009d7,_0x408434)=>_0x2ff995+_0x408434);for(const _0xfbfbac of _0xed1f15){const _0x305389=$dataWeapons[_0xfbfbac];if(!_0x305389)continue;if(!VisuMZ[_0x17c486(0x4d3)][_0x17c486(0x4d1)](_0x305389,_0x276cca,_0x496bde))continue;_0x174007['push']([0x1,_0xfbfbac,0x0,_0x305389[_0x17c486(0x3fc)]]);}const _0x51446e=_0x40189f[_0x17c486(0x3ef)]>=_0x40189f['Step3Start']?_0x40189f[_0x17c486(0x287)]:_0x40189f[_0x17c486(0x3ef)],_0x235cc1=_0x40189f['Step3End']>=_0x40189f[_0x17c486(0x287)]?_0x40189f[_0x17c486(0x3ef)]:_0x40189f[_0x17c486(0x287)],_0x21dd46=Array(_0x235cc1-_0x51446e+0x1)[_0x17c486(0x356)]()[_0x17c486(0x1e3)]((_0x1c1ca2,_0x4fed08)=>_0x51446e+_0x4fed08);for(const _0x1b3108 of _0x21dd46){const _0x2898e2=$dataArmors[_0x1b3108];if(!_0x2898e2)continue;if(!VisuMZ[_0x17c486(0x4d3)][_0x17c486(0x4d1)](_0x2898e2,_0x276cca,_0x496bde))continue;_0x174007[_0x17c486(0x47c)]([0x2,_0x1b3108,0x0,_0x2898e2['price']]);}SceneManager[_0x17c486(0x47c)](Scene_Shop),SceneManager[_0x17c486(0x2cc)](_0x174007,_0x40189f[_0x17c486(0x2ea)]);}),VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x4d1)]=function(_0x47d1a3,_0x2f1b10,_0x5b55c7){const _0x539a1f=_0x1ca854;if(_0x47d1a3['name'][_0x539a1f(0x351)]()==='')return![];if(_0x47d1a3[_0x539a1f(0x4cd)]['match'](/-----/i))return![];const _0x21bfef=_0x47d1a3[_0x539a1f(0x263)];if(_0x2f1b10[_0x539a1f(0x49e)]>0x0)for(const _0x2f03a1 of _0x2f1b10){if(!_0x2f03a1)continue;if(_0x21bfef[_0x539a1f(0x26b)](_0x2f03a1))return![];}if(_0x5b55c7[_0x539a1f(0x49e)]>0x0){for(const _0x5be923 of _0x5b55c7){if(!_0x5be923)continue;if(_0x21bfef[_0x539a1f(0x26b)](_0x5be923))return!![];}return![];}return!![];},VisuMZ[_0x1ca854(0x4d3)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x1ca854(0x495)]['onDatabaseLoaded'],Scene_Boot[_0x1ca854(0x495)]['onDatabaseLoaded']=function(){const _0x206123=_0x1ca854;this[_0x206123(0x509)](),VisuMZ[_0x206123(0x4d3)][_0x206123(0x3a1)][_0x206123(0x34d)](this),this[_0x206123(0x333)]();},Scene_Boot[_0x1ca854(0x495)][_0x1ca854(0x509)]=function(){const _0x1df2e7=_0x1ca854;VisuMZ[_0x1df2e7(0x4d3)][_0x1df2e7(0x442)]={},VisuMZ[_0x1df2e7(0x4d3)]['RegExp']['EquipParams']=[],VisuMZ[_0x1df2e7(0x4d3)][_0x1df2e7(0x442)]['BorderRegExp']=[];const _0x964696=['MaxHP','MaxMP',_0x1df2e7(0x336),'DEF',_0x1df2e7(0x313),_0x1df2e7(0x23f),_0x1df2e7(0x37a),'LUK'];for(const _0x43f22a of _0x964696){const _0x5ae9c2='<%1:[\x20]([\x5c+\x5c-]\x5cd+)>'[_0x1df2e7(0x464)](_0x43f22a);VisuMZ[_0x1df2e7(0x4d3)][_0x1df2e7(0x442)]['EquipParams'][_0x1df2e7(0x47c)](new RegExp(_0x5ae9c2,'i'));const _0x3772ec=_0x1df2e7(0x312)['format'](_0x43f22a);VisuMZ[_0x1df2e7(0x4d3)][_0x1df2e7(0x442)][_0x1df2e7(0x219)][_0x1df2e7(0x47c)](new RegExp(_0x3772ec,'g'));}},Scene_Boot[_0x1ca854(0x495)][_0x1ca854(0x333)]=function(){const _0x3162ca=_0x1ca854;if(VisuMZ[_0x3162ca(0x450)])return;this[_0x3162ca(0x34e)]();const _0x3a9a7d=[$dataItems,$dataWeapons,$dataArmors];for(const _0x2fdab5 of _0x3a9a7d){for(const _0x38f531 of _0x2fdab5){if(!_0x38f531)continue;VisuMZ[_0x3162ca(0x4d3)][_0x3162ca(0x2f6)](_0x38f531,_0x2fdab5),VisuMZ[_0x3162ca(0x4d3)]['Parse_Notetags_Prices'](_0x38f531,_0x2fdab5),VisuMZ['ItemsEquipsCore'][_0x3162ca(0x23d)](_0x38f531,_0x2fdab5),VisuMZ[_0x3162ca(0x4d3)][_0x3162ca(0x21c)](_0x38f531,_0x2fdab5),VisuMZ[_0x3162ca(0x4d3)][_0x3162ca(0x35e)](_0x38f531,_0x2fdab5);}}},Scene_Boot['prototype']['process_VisuMZ_ItemsEquipsCore_EquipSlots']=function(){const _0x329d17=_0x1ca854;for(const _0x44a42a of $dataClasses){if(!_0x44a42a)continue;VisuMZ['ItemsEquipsCore'][_0x329d17(0x30a)](_0x44a42a);}},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x258)]=VisuMZ['ParseClassNotetags'],VisuMZ[_0x1ca854(0x258)]=function(_0x1918eb){const _0x5a1b6e=_0x1ca854;VisuMZ['ItemsEquipsCore'][_0x5a1b6e(0x258)][_0x5a1b6e(0x34d)](this,_0x1918eb),VisuMZ[_0x5a1b6e(0x4d3)][_0x5a1b6e(0x30a)](_0x1918eb);},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x274)]=VisuMZ[_0x1ca854(0x274)],VisuMZ[_0x1ca854(0x274)]=function(_0x3eb564){const _0x48ea30=_0x1ca854;VisuMZ[_0x48ea30(0x4d3)][_0x48ea30(0x274)][_0x48ea30(0x34d)](this,_0x3eb564),VisuMZ[_0x48ea30(0x4d3)][_0x48ea30(0x2a7)](_0x3eb564,$dataItems);},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x306)]=VisuMZ['ParseWeaponNotetags'],VisuMZ[_0x1ca854(0x306)]=function(_0x430b5e){const _0x2e6f96=_0x1ca854;VisuMZ[_0x2e6f96(0x4d3)][_0x2e6f96(0x306)][_0x2e6f96(0x34d)](this,_0x430b5e),VisuMZ[_0x2e6f96(0x4d3)][_0x2e6f96(0x2a7)](_0x430b5e,$dataWeapons);},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x3a0)]=VisuMZ[_0x1ca854(0x3a0)],VisuMZ[_0x1ca854(0x3a0)]=function(_0x44f4ee){const _0x94035b=_0x1ca854;VisuMZ[_0x94035b(0x4d3)][_0x94035b(0x3a0)]['call'](this,_0x44f4ee),VisuMZ[_0x94035b(0x4d3)][_0x94035b(0x2a7)](_0x44f4ee,$dataArmors);},VisuMZ['ItemsEquipsCore'][_0x1ca854(0x30a)]=function(_0x3ccc6e){const _0x9ec4da=_0x1ca854;_0x3ccc6e[_0x9ec4da(0x455)]=[];if(!BattleManager['isBattleTest']()&&_0x3ccc6e['note']['match'](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){const _0x520b75=String(RegExp['$1'])[_0x9ec4da(0x349)](/[\r\n]+/);for(const _0xf7e2ab of _0x520b75){const _0x577dee=$dataSystem[_0x9ec4da(0x3ad)][_0x9ec4da(0x43a)](_0xf7e2ab[_0x9ec4da(0x351)]());if(_0x577dee>0x0)_0x3ccc6e[_0x9ec4da(0x455)][_0x9ec4da(0x47c)](_0x577dee);}}else for(const _0x536c4e of $dataSystem[_0x9ec4da(0x3ad)]){const _0x319458=$dataSystem['equipTypes'][_0x9ec4da(0x43a)](_0x536c4e[_0x9ec4da(0x351)]());if(_0x319458>0x0)_0x3ccc6e[_0x9ec4da(0x455)][_0x9ec4da(0x47c)](_0x319458);}},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x2a7)]=function(_0x51b1e2,_0x85d853){const _0x55dd03=_0x1ca854;VisuMZ[_0x55dd03(0x4d3)][_0x55dd03(0x2f6)](_0x51b1e2,_0x85d853),VisuMZ[_0x55dd03(0x4d3)][_0x55dd03(0x22c)](_0x51b1e2,_0x85d853),VisuMZ[_0x55dd03(0x4d3)]['Parse_Notetags_ParamValues'](_0x51b1e2,_0x85d853),VisuMZ[_0x55dd03(0x4d3)][_0x55dd03(0x21c)](_0x51b1e2,_0x85d853),VisuMZ[_0x55dd03(0x4d3)]['Parse_Notetags_EnableJS'](_0x51b1e2,_0x85d853);},VisuMZ['ItemsEquipsCore'][_0x1ca854(0x2f6)]=function(_0x2d80b3,_0x2a43eb){const _0x53f575=_0x1ca854;_0x2d80b3[_0x53f575(0x263)]=[];const _0x109c24=_0x2d80b3['note'],_0x21464e=_0x109c24['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x21464e)for(const _0x2135cd of _0x21464e){_0x2135cd[_0x53f575(0x4f8)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x516b5d=String(RegExp['$1'])[_0x53f575(0x39d)]()[_0x53f575(0x351)]()[_0x53f575(0x349)](',');for(const _0x4f98fe of _0x516b5d){_0x2d80b3[_0x53f575(0x263)][_0x53f575(0x47c)](_0x4f98fe[_0x53f575(0x351)]());}}if(_0x109c24[_0x53f575(0x4f8)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x4ec7b3=RegExp['$1'][_0x53f575(0x349)](/[\r\n]+/);for(const _0x2f9e1b of _0x4ec7b3){_0x2d80b3['categories']['push'](_0x2f9e1b[_0x53f575(0x39d)]()[_0x53f575(0x351)]());}}},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x22c)]=function(_0x37bc0c,_0x2e3f7d){const _0x5702a6=_0x1ca854;_0x37bc0c[_0x5702a6(0x46e)]['match'](/<PRICE:[ ](\d+)>/i)&&(_0x37bc0c[_0x5702a6(0x3fc)]=Number(RegExp['$1']));},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x23d)]=function(_0x3139ea,_0x608b75){const _0x5be4=_0x1ca854;if(_0x608b75===$dataItems)return;for(let _0x1f7c79=0x0;_0x1f7c79<0x8;_0x1f7c79++){const _0x2fffa2=VisuMZ[_0x5be4(0x4d3)][_0x5be4(0x442)]['EquipParams'][_0x1f7c79];_0x3139ea[_0x5be4(0x46e)][_0x5be4(0x4f8)](_0x2fffa2)&&(_0x3139ea[_0x5be4(0x36f)][_0x1f7c79]=parseInt(RegExp['$1']));}},VisuMZ[_0x1ca854(0x4d3)]['paramJS']={},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x21c)]=function(_0x41af82,_0x2efc86){const _0x31e7cf=_0x1ca854;if(_0x2efc86===$dataItems)return;if(_0x41af82['note'][_0x31e7cf(0x4f8)](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0xc4aad7=String(RegExp['$1']),_0x33bd88=(_0x2efc86===$dataWeapons?_0x31e7cf(0x426):'A%1')['format'](_0x41af82['id']),_0x105173='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0xc4aad7);for(let _0x18e434=0x0;_0x18e434<0x8;_0x18e434++){if(_0xc4aad7['match'](VisuMZ[_0x31e7cf(0x4d3)][_0x31e7cf(0x442)][_0x31e7cf(0x219)][_0x18e434])){const _0x20d30d=_0x31e7cf(0x35d)['format'](_0x33bd88,_0x18e434);VisuMZ[_0x31e7cf(0x4d3)][_0x31e7cf(0x233)][_0x20d30d]=new Function(_0x31e7cf(0x265),_0x31e7cf(0x389),_0x105173);}}}},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x45c)]={},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x35e)]=function(_0x2152aa,_0x3ddda9){const _0x405736=_0x1ca854;if(_0x3ddda9!==$dataItems)return;if(_0x2152aa[_0x405736(0x46e)]['match'](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){const _0x41c241=String(RegExp['$1']),_0x8cf9c6=_0x405736(0x2c5)[_0x405736(0x464)](_0x41c241);VisuMZ['ItemsEquipsCore'][_0x405736(0x45c)][_0x2152aa['id']]=new Function(_0x405736(0x265),_0x8cf9c6);}},DataManager[_0x1ca854(0x26d)]=function(_0x107d5a){const _0x3f63f4=_0x1ca854;return this[_0x3f63f4(0x2e0)](_0x107d5a)&&_0x107d5a[_0x3f63f4(0x2ab)]===0x2;},DataManager[_0x1ca854(0x4b5)]=function(_0x1c9cc1){const _0x2776f0=_0x1ca854;if(!_0x1c9cc1)return 0x63;else return _0x1c9cc1['note']['match'](/<MAX:[ ](\d+)>/i)?parseInt(RegExp['$1']):this[_0x2776f0(0x29e)](_0x1c9cc1);},DataManager[_0x1ca854(0x29e)]=function(_0xee9c6){const _0x31e7c9=_0x1ca854;if(this[_0x31e7c9(0x2e0)](_0xee9c6))return VisuMZ[_0x31e7c9(0x4d3)]['Settings'][_0x31e7c9(0x331)][_0x31e7c9(0x4dd)];else{if(this[_0x31e7c9(0x260)](_0xee9c6))return VisuMZ[_0x31e7c9(0x4d3)][_0x31e7c9(0x3a5)][_0x31e7c9(0x331)][_0x31e7c9(0x1fe)];else{if(this['isArmor'](_0xee9c6))return VisuMZ[_0x31e7c9(0x4d3)][_0x31e7c9(0x3a5)][_0x31e7c9(0x331)][_0x31e7c9(0x386)];}}},ColorManager[_0x1ca854(0x4c8)]=function(_0x14d2a0){const _0x171a8c=_0x1ca854;if(!_0x14d2a0)return this[_0x171a8c(0x2b1)]();else{if(_0x14d2a0['note'][_0x171a8c(0x4f8)](/<COLOR:[ ](\d+)>/i))return this[_0x171a8c(0x3dc)](Number(RegExp['$1'])[_0x171a8c(0x217)](0x0,0x1f));else return _0x14d2a0['note']['match'](/<COLOR:[ ]#(.*)>/i)?'#'+String(RegExp['$1']):this[_0x171a8c(0x2b1)]();}},ColorManager[_0x1ca854(0x4c2)]=function(_0x32a924){const _0x582f72=_0x1ca854;return _0x32a924=String(_0x32a924),_0x32a924[_0x582f72(0x4f8)](/#(.*)/i)?_0x582f72(0x2cf)[_0x582f72(0x464)](String(RegExp['$1'])):this['textColor'](Number(_0x32a924));},SceneManager['isSceneShop']=function(){const _0x570bfc=_0x1ca854;return this[_0x570bfc(0x3ca)]&&this['_scene'][_0x570bfc(0x4be)]===Scene_Shop;},Game_Temp[_0x1ca854(0x495)]['newLabelEnabled']=function(){const _0x48fb1a=_0x1ca854;if(this[_0x48fb1a(0x411)])return![];return VisuMZ['ItemsEquipsCore']['Settings'][_0x48fb1a(0x368)][_0x48fb1a(0x41c)];},VisuMZ['ShopMenuStatusStandard']=VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x3a5)][_0x1ca854(0x27b)]['MultiplierStandard'],VisuMZ['ItemsEquipsCore'][_0x1ca854(0x2ae)]=Game_BattlerBase['prototype'][_0x1ca854(0x44d)],Game_BattlerBase[_0x1ca854(0x495)][_0x1ca854(0x44d)]=function(_0x1877bf){const _0xc18173=_0x1ca854;return this[_0xc18173(0x456)]?this['_shopStatusMenuAlly']?VisuMZ['ShopMenuStatusStandard']:0x1:VisuMZ[_0xc18173(0x4d3)][_0xc18173(0x2ae)][_0xc18173(0x34d)](this,_0x1877bf);},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x427)]=Game_BattlerBase[_0x1ca854(0x495)]['meetsItemConditions'],Game_BattlerBase['prototype'][_0x1ca854(0x1fb)]=function(_0x8d190){const _0x3c57d4=_0x1ca854;if(!_0x8d190)return![];if(!VisuMZ[_0x3c57d4(0x4d3)]['Game_BattlerBase_meetsItemConditions'][_0x3c57d4(0x34d)](this,_0x8d190))return![];if(!this[_0x3c57d4(0x49d)](_0x8d190))return![];if(!this[_0x3c57d4(0x1eb)](_0x8d190))return![];return!![];},Game_BattlerBase[_0x1ca854(0x495)][_0x1ca854(0x49d)]=function(_0x291950){const _0x131c47=_0x1ca854;if(!this[_0x131c47(0x25c)](_0x291950))return![];return!![];},Game_BattlerBase['prototype']['checkItemConditionsSwitchNotetags']=function(_0x3226a5){const _0x494355=_0x1ca854,_0x186060=_0x3226a5[_0x494355(0x46e)];if(_0x186060[_0x494355(0x4f8)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3057aa=JSON[_0x494355(0x25a)]('['+RegExp['$1'][_0x494355(0x4f8)](/\d+/g)+']');for(const _0x5b5a0e of _0x3057aa){if(!$gameSwitches[_0x494355(0x44c)](_0x5b5a0e))return![];}return!![];}if(_0x186060[_0x494355(0x4f8)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x126ec7=JSON[_0x494355(0x25a)]('['+RegExp['$1'][_0x494355(0x4f8)](/\d+/g)+']');for(const _0x505871 of _0x126ec7){if(!$gameSwitches[_0x494355(0x44c)](_0x505871))return![];}return!![];}if(_0x186060[_0x494355(0x4f8)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2c190e=JSON['parse']('['+RegExp['$1'][_0x494355(0x4f8)](/\d+/g)+']');for(const _0xab9269 of _0x2c190e){if($gameSwitches[_0x494355(0x44c)](_0xab9269))return!![];}return![];}if(_0x186060[_0x494355(0x4f8)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2e40da=JSON[_0x494355(0x25a)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x10edae of _0x2e40da){if(!$gameSwitches[_0x494355(0x44c)](_0x10edae))return!![];}return![];}if(_0x186060[_0x494355(0x4f8)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3c93df=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x287231 of _0x3c93df){if(!$gameSwitches[_0x494355(0x44c)](_0x287231))return!![];}return![];}if(_0x186060[_0x494355(0x4f8)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4726f6=JSON[_0x494355(0x25a)]('['+RegExp['$1'][_0x494355(0x4f8)](/\d+/g)+']');for(const _0x46620a of _0x4726f6){if($gameSwitches[_0x494355(0x44c)](_0x46620a))return![];}return!![];}return!![];},Game_BattlerBase[_0x1ca854(0x495)][_0x1ca854(0x1eb)]=function(_0x13a445){const _0xab6907=_0x1ca854,_0x3b94ba=_0x13a445[_0xab6907(0x46e)],_0xd4b430=VisuMZ[_0xab6907(0x4d3)][_0xab6907(0x45c)];return _0xd4b430[_0x13a445['id']]?_0xd4b430[_0x13a445['id']][_0xab6907(0x34d)](this,_0x13a445):!![];},Game_Actor[_0x1ca854(0x495)]['initEquips']=function(_0x5a939c){const _0x38a66f=_0x1ca854;_0x5a939c=this[_0x38a66f(0x1db)](_0x5a939c);const _0x20795f=this['equipSlots']();this['_equips']=[];for(let _0x2c990e=0x0;_0x2c990e<_0x20795f[_0x38a66f(0x49e)];_0x2c990e++){this[_0x38a66f(0x255)][_0x2c990e]=new Game_Item();}for(let _0x4ffcea=0x0;_0x4ffcea<_0x20795f[_0x38a66f(0x49e)];_0x4ffcea++){const _0x3fcfc9=_0x20795f[_0x4ffcea],_0x441c2d=this[_0x38a66f(0x229)](_0x5a939c,_0x3fcfc9);if(this['canEquip'](_0x441c2d))this[_0x38a66f(0x255)][_0x4ffcea][_0x38a66f(0x3c1)](_0x441c2d);}this[_0x38a66f(0x4c5)](!![]),this['refresh']();},Game_Actor['prototype']['convertInitEquipsToItems']=function(_0x1d0e28){const _0x250836=_0x1ca854,_0x64ef8a=[];for(let _0x284f3b=0x0;_0x284f3b<_0x1d0e28[_0x250836(0x49e)];_0x284f3b++){const _0x3d72dc=_0x1d0e28[_0x284f3b];if(_0x3d72dc<=0x0)continue;const _0x14cd58=$dataSystem[_0x250836(0x3ad)][_0x284f3b+0x1];if(_0x14cd58===$dataSystem[_0x250836(0x3ad)][0x1]||_0x284f3b===0x1&&this['isDualWield']())_0x64ef8a[_0x250836(0x47c)]($dataWeapons[_0x3d72dc]);else{if(BattleManager['isBattleTest']()){const _0x241819=$dataArmors[_0x3d72dc];_0x241819[_0x250836(0x4d0)]===_0x284f3b+0x1&&_0x64ef8a[_0x250836(0x47c)](_0x241819);}else _0x64ef8a[_0x250836(0x47c)]($dataArmors[_0x3d72dc]);}}return _0x64ef8a;},Game_Actor[_0x1ca854(0x495)]['getMatchingInitEquip']=function(_0x4ffb96,_0x36e244){const _0x882eb8=_0x1ca854;for(const _0x121328 of _0x4ffb96){if(!_0x121328)continue;if(_0x121328['etypeId']===_0x36e244)return _0x4ffb96[_0x882eb8(0x2a6)](_0x4ffb96[_0x882eb8(0x43a)](_0x121328),0x1),_0x121328;}return null;},Game_Actor[_0x1ca854(0x495)]['equipSlots']=function(){const _0x661ac5=_0x1ca854,_0x20cf31=JsonEx[_0x661ac5(0x4db)](this[_0x661ac5(0x44f)]||this[_0x661ac5(0x2f1)]()[_0x661ac5(0x455)]);if(_0x20cf31[_0x661ac5(0x49e)]>=0x2&&this[_0x661ac5(0x4b8)]())_0x20cf31[0x1]=0x1;return _0x20cf31;},Game_Actor[_0x1ca854(0x495)][_0x1ca854(0x20a)]=function(_0x16be4d){const _0x21f854=_0x1ca854;_0x16be4d[_0x21f854(0x3f2)](0x0),_0x16be4d[_0x21f854(0x3f2)](-0x1),this['_forcedSlots']=_0x16be4d,this['refresh']();},Game_Actor[_0x1ca854(0x495)][_0x1ca854(0x500)]=function(){const _0x22f396=_0x1ca854;this[_0x22f396(0x44f)]=undefined,this[_0x22f396(0x3b5)]();},Game_Actor[_0x1ca854(0x495)]['prepareNewEquipSlotsOnLoad']=function(){const _0x173ea7=_0x1ca854,_0x1513f6=this[_0x173ea7(0x455)]();for(let _0x258ed1=0x0;_0x258ed1<_0x1513f6[_0x173ea7(0x49e)];_0x258ed1++){if(!this[_0x173ea7(0x255)][_0x258ed1])this[_0x173ea7(0x255)][_0x258ed1]=new Game_Item();}this[_0x173ea7(0x4c5)](![]),this[_0x173ea7(0x3b5)]();},VisuMZ['ItemsEquipsCore'][_0x1ca854(0x278)]=Game_Actor[_0x1ca854(0x495)][_0x1ca854(0x327)],Game_Actor[_0x1ca854(0x495)][_0x1ca854(0x327)]=function(_0x4135c1,_0xde4c75){const _0x2468d3=_0x1ca854;if(!this['_tempActor']){const _0x54976c=JsonEx[_0x2468d3(0x4db)](this);_0x54976c['_tempActor']=!![],VisuMZ[_0x2468d3(0x4d3)][_0x2468d3(0x278)][_0x2468d3(0x34d)](this,_0x4135c1,_0xde4c75),this[_0x2468d3(0x47f)](_0x54976c);}else VisuMZ[_0x2468d3(0x4d3)]['Game_Actor_changeEquip']['call'](this,_0x4135c1,_0xde4c75);},VisuMZ[_0x1ca854(0x4d3)]['Game_Actor_forceChangeEquip']=Game_Actor['prototype'][_0x1ca854(0x396)],Game_Actor[_0x1ca854(0x495)][_0x1ca854(0x396)]=function(_0x48cab4,_0x1a49ed){const _0x4e4440=_0x1ca854;if(!this['_tempActor']){const _0x2f92cf=JsonEx[_0x4e4440(0x4db)](this);_0x2f92cf[_0x4e4440(0x36b)]=!![],VisuMZ[_0x4e4440(0x4d3)]['Game_Actor_forceChangeEquip'][_0x4e4440(0x34d)](this,_0x48cab4,_0x1a49ed),this['equipAdjustHpMp'](_0x2f92cf);}else VisuMZ[_0x4e4440(0x4d3)][_0x4e4440(0x39c)][_0x4e4440(0x34d)](this,_0x48cab4,_0x1a49ed);},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x4af)]=Game_Actor['prototype'][_0x1ca854(0x213)],Game_Actor[_0x1ca854(0x495)][_0x1ca854(0x213)]=function(_0x5ab2b6){const _0x3015d5=_0x1ca854;if(!this[_0x3015d5(0x36b)]){const _0x3a14d8=JsonEx[_0x3015d5(0x4db)](this);_0x3a14d8[_0x3015d5(0x36b)]=!![],VisuMZ[_0x3015d5(0x4d3)][_0x3015d5(0x4af)]['call'](this,_0x5ab2b6),this[_0x3015d5(0x47f)](_0x3a14d8);}else VisuMZ[_0x3015d5(0x4d3)][_0x3015d5(0x4af)][_0x3015d5(0x34d)](this,_0x5ab2b6);},Game_Actor[_0x1ca854(0x495)][_0x1ca854(0x4c5)]=function(_0x24ebfa){const _0x55b751=_0x1ca854;for(;;){const _0x27de4d=this[_0x55b751(0x455)](),_0x37e4c6=this[_0x55b751(0x4d6)]();let _0x4529e5=![];for(let _0x5ecec1=0x0;_0x5ecec1<_0x37e4c6['length'];_0x5ecec1++){const _0x557f10=_0x37e4c6[_0x5ecec1];if(_0x557f10&&(!this['canEquip'](_0x557f10)||_0x557f10['etypeId']!==_0x27de4d[_0x5ecec1])){!_0x24ebfa&&this[_0x55b751(0x3bc)](null,_0x557f10);if(!this['_tempActor']){const _0x8e6589=JsonEx['makeDeepCopy'](this);_0x8e6589[_0x55b751(0x36b)]=!![],this[_0x55b751(0x255)][_0x5ecec1][_0x55b751(0x3c1)](null),this[_0x55b751(0x47f)](_0x8e6589);}else this[_0x55b751(0x255)][_0x5ecec1][_0x55b751(0x3c1)](null);_0x4529e5=!![];}}if(!_0x4529e5)break;}},Game_Actor['prototype'][_0x1ca854(0x47f)]=function(_0x2761d9){const _0xc41acc=_0x1ca854;if(this['_tempActor'])return;if(!VisuMZ['ItemsEquipsCore']['Settings'][_0xc41acc(0x323)][_0xc41acc(0x21b)])return;const _0x5634ab=Math['round'](_0x2761d9['hpRate']()*this['mhp']),_0x1768db=Math[_0xc41acc(0x315)](_0x2761d9[_0xc41acc(0x207)]()*this['mmp']);if(this['hp']>0x0)this[_0xc41acc(0x4ac)](_0x5634ab);if(this['mp']>0x0)this['setMp'](_0x1768db);},Game_Actor[_0x1ca854(0x495)][_0x1ca854(0x2ff)]=function(){const _0xb64893=_0x1ca854,_0x1454ea=this['equipSlots']()[_0xb64893(0x49e)];for(let _0x1616d9=0x0;_0x1616d9<_0x1454ea;_0x1616d9++){if(this[_0xb64893(0x48b)](_0x1616d9))this[_0xb64893(0x327)](_0x1616d9,null);}},Game_Actor['prototype'][_0x1ca854(0x48b)]=function(_0x3c4e94){const _0x38e843=_0x1ca854;return this[_0x38e843(0x299)]()['includes'](this['equipSlots']()[_0x3c4e94])?![]:this['isEquipChangeOk'](_0x3c4e94);},Game_Actor[_0x1ca854(0x495)][_0x1ca854(0x299)]=function(){const _0x84436c=_0x1ca854;return VisuMZ[_0x84436c(0x4d3)][_0x84436c(0x3a5)][_0x84436c(0x323)][_0x84436c(0x224)];},Game_Actor['prototype'][_0x1ca854(0x245)]=function(){const _0x1e9b2c=_0x1ca854,_0x2a41af=this[_0x1e9b2c(0x455)]()[_0x1e9b2c(0x49e)];for(let _0x143f99=0x0;_0x143f99<_0x2a41af;_0x143f99++){if(this[_0x1e9b2c(0x3ab)](_0x143f99))this[_0x1e9b2c(0x327)](_0x143f99,null);}for(let _0x43dcd5=0x0;_0x43dcd5<_0x2a41af;_0x43dcd5++){if(this[_0x1e9b2c(0x3ab)](_0x43dcd5))this['changeEquip'](_0x43dcd5,this[_0x1e9b2c(0x3c5)](_0x43dcd5));}},Game_Actor[_0x1ca854(0x495)][_0x1ca854(0x3ab)]=function(_0xef62ed){const _0xce8fd=_0x1ca854;return this[_0xce8fd(0x319)]()[_0xce8fd(0x26b)](this[_0xce8fd(0x455)]()[_0xef62ed])?![]:this['isEquipChangeOk'](_0xef62ed);},Game_Actor[_0x1ca854(0x495)][_0x1ca854(0x319)]=function(){const _0x648271=_0x1ca854;return VisuMZ['ItemsEquipsCore']['Settings']['EquipScene'][_0x648271(0x46d)];},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x387)]=Game_Actor[_0x1ca854(0x495)]['tradeItemWithParty'],Game_Actor['prototype'][_0x1ca854(0x3bc)]=function(_0x47c026,_0x49a87f){const _0x5c1ee4=_0x1ca854;if(this[_0x5c1ee4(0x36b)])return![];$gameTemp['_bypassNewLabel']=!![];const _0x106742=VisuMZ[_0x5c1ee4(0x4d3)][_0x5c1ee4(0x387)]['call'](this,_0x47c026,_0x49a87f);return $gameTemp[_0x5c1ee4(0x411)]=![],_0x106742;},Game_Actor[_0x1ca854(0x495)][_0x1ca854(0x363)]=function(_0x591dae,_0x329393){const _0x51f4dc=_0x1ca854,_0x5b0e6d=this[_0x51f4dc(0x48f)](_0x591dae);if(_0x5b0e6d<0x0)return;const _0x2afc46=_0x591dae===0x1?$dataWeapons[_0x329393]:$dataArmors[_0x329393];this[_0x51f4dc(0x327)](_0x5b0e6d,_0x2afc46);},Game_Actor['prototype'][_0x1ca854(0x48f)]=function(_0x1e86ae){const _0x3b3443=_0x1ca854;let _0x573b7c=0x0;const _0x53a056=this[_0x3b3443(0x455)](),_0xee67a6=this[_0x3b3443(0x4d6)]();for(let _0x2e1624=0x0;_0x2e1624<_0x53a056['length'];_0x2e1624++){if(_0x53a056[_0x2e1624]===_0x1e86ae){_0x573b7c=_0x2e1624;if(!_0xee67a6[_0x2e1624])return _0x573b7c;}}return _0x573b7c;},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x337)]=Game_Actor[_0x1ca854(0x495)]['paramPlus'],Game_Actor['prototype'][_0x1ca854(0x30c)]=function(_0x24d572){const _0xe15686=_0x1ca854;let _0x3e4496=VisuMZ['ItemsEquipsCore'][_0xe15686(0x337)][_0xe15686(0x34d)](this,_0x24d572);for(const _0x5432d4 of this[_0xe15686(0x4d6)]()){if(_0x5432d4)_0x3e4496+=this[_0xe15686(0x365)](_0x5432d4,_0x24d572);}return _0x3e4496;},Game_Actor[_0x1ca854(0x495)]['paramPlusItemsEquipsCoreCustomJS']=function(_0x88c64a,_0x2c8bcb){const _0x1a0093=_0x1ca854;if(this[_0x1a0093(0x416)])return 0x0;const _0x234762=(DataManager[_0x1a0093(0x260)](_0x88c64a)?_0x1a0093(0x426):'A%1')[_0x1a0093(0x464)](_0x88c64a['id']),_0x34d460=_0x1a0093(0x35d)[_0x1a0093(0x464)](_0x234762,_0x2c8bcb);if(VisuMZ[_0x1a0093(0x4d3)][_0x1a0093(0x233)][_0x34d460]){this[_0x1a0093(0x416)]=!![];const _0x5cbf56=VisuMZ[_0x1a0093(0x4d3)]['paramJS'][_0x34d460]['call'](this,_0x88c64a,_0x2c8bcb);return this[_0x1a0093(0x416)]=![],_0x5cbf56;}else return 0x0;},Game_Actor[_0x1ca854(0x495)][_0x1ca854(0x2fc)]=function(_0x23418e){this['_shopStatusMenuMode']=!![],this['_shopStatusMenuAlly']=_0x23418e;},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x33b)]=Game_Party[_0x1ca854(0x495)][_0x1ca854(0x261)],Game_Party[_0x1ca854(0x495)][_0x1ca854(0x261)]=function(){const _0x44ebdf=_0x1ca854;VisuMZ[_0x44ebdf(0x4d3)][_0x44ebdf(0x33b)]['call'](this),this[_0x44ebdf(0x3bd)]();},Game_Party[_0x1ca854(0x495)][_0x1ca854(0x3bd)]=function(){const _0x130c06=_0x1ca854;this[_0x130c06(0x2a0)]=[];},Game_Party['prototype']['isNewItem']=function(_0x161282){const _0x1110ac=_0x1ca854;if(!$gameTemp[_0x1110ac(0x3f8)]())return![];if(this[_0x1110ac(0x2a0)]===undefined)this[_0x1110ac(0x3bd)]();let _0x111cb7='';if(DataManager[_0x1110ac(0x2e0)](_0x161282))_0x111cb7='item-%1'['format'](_0x161282['id']);else{if(DataManager[_0x1110ac(0x260)](_0x161282))_0x111cb7=_0x1110ac(0x4a6)[_0x1110ac(0x464)](_0x161282['id']);else{if(DataManager['isArmor'](_0x161282))_0x111cb7=_0x1110ac(0x3e9)[_0x1110ac(0x464)](_0x161282['id']);else return;}}return this[_0x1110ac(0x2a0)][_0x1110ac(0x26b)](_0x111cb7);},Game_Party[_0x1ca854(0x495)][_0x1ca854(0x436)]=function(_0x1764f4){const _0x191d25=_0x1ca854;if(!$gameTemp[_0x191d25(0x3f8)]())return;if(this['_newItemsList']===undefined)this[_0x191d25(0x3bd)]();let _0x5d6a3c='';if(DataManager[_0x191d25(0x2e0)](_0x1764f4))_0x5d6a3c=_0x191d25(0x2e4)[_0x191d25(0x464)](_0x1764f4['id']);else{if(DataManager['isWeapon'](_0x1764f4))_0x5d6a3c='weapon-%1'['format'](_0x1764f4['id']);else{if(DataManager[_0x191d25(0x3cc)](_0x1764f4))_0x5d6a3c=_0x191d25(0x3e9)[_0x191d25(0x464)](_0x1764f4['id']);else return;}}if(!this[_0x191d25(0x2a0)][_0x191d25(0x26b)](_0x5d6a3c))this[_0x191d25(0x2a0)]['push'](_0x5d6a3c);},Game_Party[_0x1ca854(0x495)][_0x1ca854(0x472)]=function(_0x469f80){const _0x14ce61=_0x1ca854;if(!$gameTemp[_0x14ce61(0x3f8)]())return;if(this[_0x14ce61(0x2a0)]===undefined)this[_0x14ce61(0x3bd)]();let _0x1ebe10='';if(DataManager[_0x14ce61(0x2e0)](_0x469f80))_0x1ebe10=_0x14ce61(0x2e4)[_0x14ce61(0x464)](_0x469f80['id']);else{if(DataManager[_0x14ce61(0x260)](_0x469f80))_0x1ebe10=_0x14ce61(0x4a6)[_0x14ce61(0x464)](_0x469f80['id']);else{if(DataManager['isArmor'](_0x469f80))_0x1ebe10=_0x14ce61(0x3e9)['format'](_0x469f80['id']);else return;}}this[_0x14ce61(0x2a0)]['includes'](_0x1ebe10)&&this[_0x14ce61(0x2a0)][_0x14ce61(0x2a6)](this['_newItemsList'][_0x14ce61(0x43a)](_0x1ebe10),0x1);},VisuMZ['ItemsEquipsCore'][_0x1ca854(0x466)]=Game_Party['prototype'][_0x1ca854(0x2a8)],Game_Party[_0x1ca854(0x495)][_0x1ca854(0x2a8)]=function(_0x22ee63,_0x2f54e6,_0x25f3f7){const _0x22282a=_0x1ca854,_0x16825f=this[_0x22282a(0x2bd)](_0x22ee63);VisuMZ[_0x22282a(0x4d3)][_0x22282a(0x466)][_0x22282a(0x34d)](this,_0x22ee63,_0x2f54e6,_0x25f3f7);if(this[_0x22282a(0x2bd)](_0x22ee63)>_0x16825f)this[_0x22282a(0x436)](_0x22ee63);},Game_Party[_0x1ca854(0x495)][_0x1ca854(0x499)]=function(_0x2eb21e){const _0x4b2fa0=_0x1ca854;return DataManager[_0x4b2fa0(0x4b5)](_0x2eb21e);},VisuMZ['ItemsEquipsCore'][_0x1ca854(0x48c)]=Scene_ItemBase[_0x1ca854(0x495)][_0x1ca854(0x3af)],Scene_ItemBase[_0x1ca854(0x495)]['activateItemWindow']=function(){const _0x3ad9db=_0x1ca854;VisuMZ[_0x3ad9db(0x4d3)][_0x3ad9db(0x48c)][_0x3ad9db(0x34d)](this),this[_0x3ad9db(0x330)][_0x3ad9db(0x301)]();},Scene_Item[_0x1ca854(0x495)][_0x1ca854(0x3b1)]=function(){const _0xeb6188=_0x1ca854;if(ConfigManager[_0xeb6188(0x46c)]&&ConfigManager[_0xeb6188(0x34a)]!==undefined)return ConfigManager['uiHelpPosition'];else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0xeb6188(0x29a)]()[_0xeb6188(0x4f8)](/LOWER/i);else Scene_ItemBase['prototype'][_0xeb6188(0x497)][_0xeb6188(0x34d)](this);}},Scene_Item['prototype'][_0x1ca854(0x497)]=function(){const _0x364fb4=_0x1ca854;if(ConfigManager[_0x364fb4(0x46c)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x364fb4(0x205)];else{if(this[_0x364fb4(0x300)]())return this[_0x364fb4(0x29a)]()['match'](/RIGHT/i);else Scene_ItemBase[_0x364fb4(0x495)][_0x364fb4(0x497)][_0x364fb4(0x34d)](this);}},Scene_Item[_0x1ca854(0x495)][_0x1ca854(0x29a)]=function(){const _0x267b39=_0x1ca854;return VisuMZ[_0x267b39(0x4d3)]['Settings'][_0x267b39(0x331)][_0x267b39(0x445)];},Scene_Item[_0x1ca854(0x495)][_0x1ca854(0x26c)]=function(){const _0x4d5735=_0x1ca854;return this[_0x4d5735(0x465)]&&this[_0x4d5735(0x465)]['isUseModernControls']();},Scene_Item[_0x1ca854(0x495)]['isUseItemsEquipsCoreUpdatedLayout']=function(){const _0x1fd591=_0x1ca854;return VisuMZ['ItemsEquipsCore']['Settings']['ItemScene'][_0x1fd591(0x414)];},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x392)]=Scene_Item['prototype'][_0x1ca854(0x27c)],Scene_Item['prototype'][_0x1ca854(0x27c)]=function(){const _0x589dcd=_0x1ca854;VisuMZ[_0x589dcd(0x4d3)][_0x589dcd(0x392)][_0x589dcd(0x34d)](this),this[_0x589dcd(0x26c)]()&&this[_0x589dcd(0x39e)]();},Scene_Item[_0x1ca854(0x495)][_0x1ca854(0x452)]=function(){const _0x40160f=_0x1ca854;return this[_0x40160f(0x300)]()?this[_0x40160f(0x2ba)]():Scene_ItemBase[_0x40160f(0x495)][_0x40160f(0x452)][_0x40160f(0x34d)](this);},Scene_Item[_0x1ca854(0x495)][_0x1ca854(0x2ba)]=function(){const _0x20cec4=_0x1ca854,_0x4af4cf=0x0,_0x176c7a=this[_0x20cec4(0x270)](),_0x22b7f9=Graphics['boxWidth'],_0x5bc2c5=this['helpAreaHeight']();return new Rectangle(_0x4af4cf,_0x176c7a,_0x22b7f9,_0x5bc2c5);},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x447)]=Scene_Item[_0x1ca854(0x495)][_0x1ca854(0x358)],Scene_Item['prototype'][_0x1ca854(0x358)]=function(){const _0x451236=_0x1ca854;VisuMZ[_0x451236(0x4d3)][_0x451236(0x447)][_0x451236(0x34d)](this),this['isUseModernControls']()&&this[_0x451236(0x492)]();},Scene_Item[_0x1ca854(0x495)][_0x1ca854(0x492)]=function(){const _0x5c2834=_0x1ca854;delete this[_0x5c2834(0x465)]['_handlers']['ok'],delete this[_0x5c2834(0x465)][_0x5c2834(0x26f)]['cancel'];},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x295)]=Scene_Item['prototype'][_0x1ca854(0x2c7)],Scene_Item[_0x1ca854(0x495)][_0x1ca854(0x2c7)]=function(){const _0x5d3a6d=_0x1ca854;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x5d3a6d(0x4b0)]():VisuMZ[_0x5d3a6d(0x4d3)]['Scene_Item_categoryWindowRect'][_0x5d3a6d(0x34d)](this);},Scene_Item['prototype'][_0x1ca854(0x4b0)]=function(){const _0xd0e0ad=_0x1ca854,_0x5de94f=0x0,_0x317924=this['mainAreaTop'](),_0x428d2b=Graphics[_0xd0e0ad(0x473)],_0x483f5b=this[_0xd0e0ad(0x29f)](0x1,!![]);return new Rectangle(_0x5de94f,_0x317924,_0x428d2b,_0x483f5b);},VisuMZ['ItemsEquipsCore'][_0x1ca854(0x25e)]=Scene_Item[_0x1ca854(0x495)][_0x1ca854(0x3e4)],Scene_Item[_0x1ca854(0x495)][_0x1ca854(0x3e4)]=function(){const _0x564afa=_0x1ca854;VisuMZ[_0x564afa(0x4d3)][_0x564afa(0x25e)][_0x564afa(0x34d)](this),this['isUseModernControls']()&&this[_0x564afa(0x3e2)](),this['allowCreateStatusWindow']()&&this[_0x564afa(0x294)]();},VisuMZ[_0x1ca854(0x4d3)]['Scene_Item_itemWindowRect']=Scene_Item[_0x1ca854(0x495)][_0x1ca854(0x20f)],Scene_Item[_0x1ca854(0x495)][_0x1ca854(0x20f)]=function(){const _0x3fbb93=_0x1ca854;if(this[_0x3fbb93(0x300)]())return this[_0x3fbb93(0x2e1)]();else{const _0x22137b=VisuMZ['ItemsEquipsCore'][_0x3fbb93(0x2ed)][_0x3fbb93(0x34d)](this);return this['allowCreateStatusWindow']()&&this[_0x3fbb93(0x345)]()&&(_0x22137b[_0x3fbb93(0x3f7)]-=this[_0x3fbb93(0x410)]()),_0x22137b;}},Scene_Item[_0x1ca854(0x495)][_0x1ca854(0x2e1)]=function(){const _0x1d95a7=_0x1ca854,_0x571764=this[_0x1d95a7(0x497)]()?this[_0x1d95a7(0x410)]():0x0,_0x19ae24=this[_0x1d95a7(0x465)]['y']+this[_0x1d95a7(0x465)][_0x1d95a7(0x1f9)],_0xae6afe=Graphics[_0x1d95a7(0x473)]-this[_0x1d95a7(0x410)](),_0x35e547=this[_0x1d95a7(0x46f)]()-_0x19ae24;return new Rectangle(_0x571764,_0x19ae24,_0xae6afe,_0x35e547);},Scene_Item[_0x1ca854(0x495)][_0x1ca854(0x3e2)]=function(){const _0x812a29=_0x1ca854;this[_0x812a29(0x330)]['setHandler'](_0x812a29(0x2eb),this[_0x812a29(0x4e8)][_0x812a29(0x33c)](this));},Scene_Item[_0x1ca854(0x495)][_0x1ca854(0x28c)]=function(){const _0x351f77=_0x1ca854;return this[_0x351f77(0x300)]()?!![]:VisuMZ[_0x351f77(0x4d3)][_0x351f77(0x3a5)]['ItemScene'][_0x351f77(0x1f7)];},Scene_Item[_0x1ca854(0x495)][_0x1ca854(0x345)]=function(){const _0x1074ad=_0x1ca854;return VisuMZ[_0x1074ad(0x4d3)][_0x1074ad(0x3a5)]['ItemScene'][_0x1074ad(0x432)];},Scene_Item[_0x1ca854(0x495)][_0x1ca854(0x294)]=function(){const _0x11ae7e=_0x1ca854,_0x53f758=this[_0x11ae7e(0x2c9)]();this[_0x11ae7e(0x2de)]=new Window_ShopStatus(_0x53f758),this[_0x11ae7e(0x2f3)](this[_0x11ae7e(0x2de)]),this[_0x11ae7e(0x330)]['setStatusWindow'](this[_0x11ae7e(0x2de)]);const _0x484c61=VisuMZ['ItemsEquipsCore']['Settings'][_0x11ae7e(0x331)][_0x11ae7e(0x2e7)];this[_0x11ae7e(0x2de)][_0x11ae7e(0x2d7)](_0x484c61||0x0);},Scene_Item[_0x1ca854(0x495)][_0x1ca854(0x2c9)]=function(){const _0x109005=_0x1ca854;return this[_0x109005(0x300)]()?this['statusWindowRectItemsEquipsCore']():VisuMZ['ItemsEquipsCore'][_0x109005(0x3a5)][_0x109005(0x331)][_0x109005(0x475)][_0x109005(0x34d)](this);},Scene_Item['prototype']['statusWindowRectItemsEquipsCore']=function(){const _0x7f3431=_0x1ca854,_0x37ed34=this[_0x7f3431(0x410)](),_0x244d63=this[_0x7f3431(0x330)]['height'],_0x376ab6=this[_0x7f3431(0x497)]()?0x0:Graphics['boxWidth']-this['statusWidth'](),_0x5f0e57=this[_0x7f3431(0x330)]['y'];return new Rectangle(_0x376ab6,_0x5f0e57,_0x37ed34,_0x244d63);},Scene_Item[_0x1ca854(0x495)][_0x1ca854(0x410)]=function(){const _0x4e6d8d=_0x1ca854;return Scene_Shop['prototype'][_0x4e6d8d(0x410)]();},Scene_Item['prototype'][_0x1ca854(0x47b)]=function(){const _0x8981b=_0x1ca854;if(!this['updatedLayoutStyle']())return![];if(!this['isUseModernControls']())return![];if(!this[_0x8981b(0x330)])return![];if(!this['_itemWindow'][_0x8981b(0x493)])return![];return this[_0x8981b(0x29a)]()&&this[_0x8981b(0x26c)]();},Scene_Item[_0x1ca854(0x495)]['buttonAssistKey1']=function(){const _0x51f970=_0x1ca854;if(this[_0x51f970(0x47b)]())return this[_0x51f970(0x330)]['maxCols']()===0x1?TextManager[_0x51f970(0x32b)](_0x51f970(0x471),'right'):TextManager['getInputMultiButtonStrings'](_0x51f970(0x4e1),_0x51f970(0x3d8));return Scene_ItemBase[_0x51f970(0x495)]['buttonAssistKey1'][_0x51f970(0x34d)](this);},Scene_Item[_0x1ca854(0x495)]['buttonAssistText1']=function(){const _0x2dfb7d=_0x1ca854;if(this[_0x2dfb7d(0x47b)]())return VisuMZ[_0x2dfb7d(0x4d3)][_0x2dfb7d(0x3a5)]['ItemScene'][_0x2dfb7d(0x507)];return Scene_ItemBase[_0x2dfb7d(0x495)]['buttonAssistText1']['call'](this);},Scene_Equip['prototype'][_0x1ca854(0x3b1)]=function(){const _0x179c2a=_0x1ca854;if(ConfigManager[_0x179c2a(0x46c)]&&ConfigManager[_0x179c2a(0x34a)]!==undefined)return ConfigManager[_0x179c2a(0x34a)];else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x179c2a(0x29a)]()[_0x179c2a(0x4f8)](/LOWER/i);else Scene_MenuBase[_0x179c2a(0x495)][_0x179c2a(0x497)]['call'](this);}},Scene_Equip[_0x1ca854(0x495)][_0x1ca854(0x497)]=function(){const _0x4ce6db=_0x1ca854;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x4ce6db(0x205)]!==undefined)return ConfigManager[_0x4ce6db(0x205)];else{if(this[_0x4ce6db(0x300)]())return this[_0x4ce6db(0x29a)]()['match'](/RIGHT/i);else Scene_MenuBase[_0x4ce6db(0x495)]['isRightInputMode'][_0x4ce6db(0x34d)](this);}},Scene_Equip[_0x1ca854(0x495)][_0x1ca854(0x29a)]=function(){const _0x1760df=_0x1ca854;return VisuMZ[_0x1760df(0x4d3)][_0x1760df(0x3a5)][_0x1760df(0x323)]['LayoutStyle'];},Scene_Equip[_0x1ca854(0x495)][_0x1ca854(0x26c)]=function(){const _0x2eac22=_0x1ca854;return this[_0x2eac22(0x457)]&&this[_0x2eac22(0x457)][_0x2eac22(0x26c)]();},Scene_Equip['prototype'][_0x1ca854(0x300)]=function(){const _0x142289=_0x1ca854;return VisuMZ[_0x142289(0x4d3)][_0x142289(0x3a5)][_0x142289(0x323)]['EnableLayout'];},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x355)]=Scene_Equip[_0x1ca854(0x495)]['create'],Scene_Equip['prototype'][_0x1ca854(0x27c)]=function(){const _0x19e9db=_0x1ca854;VisuMZ[_0x19e9db(0x4d3)][_0x19e9db(0x355)][_0x19e9db(0x34d)](this),this[_0x19e9db(0x26c)]()&&this[_0x19e9db(0x2b7)]();},Scene_Equip[_0x1ca854(0x495)][_0x1ca854(0x452)]=function(){const _0x3c5fc7=_0x1ca854;return this[_0x3c5fc7(0x300)]()?this['helpWindowRectItemsEquipsCore']():Scene_MenuBase[_0x3c5fc7(0x495)]['helpWindowRect'][_0x3c5fc7(0x34d)](this);},Scene_Equip[_0x1ca854(0x495)][_0x1ca854(0x2ba)]=function(){const _0x5ba813=_0x1ca854,_0x4bf99a=0x0,_0x1da2d3=this[_0x5ba813(0x270)](),_0x30cef0=Graphics[_0x5ba813(0x473)],_0x312d0c=this[_0x5ba813(0x2f7)]();return new Rectangle(_0x4bf99a,_0x1da2d3,_0x30cef0,_0x312d0c);},VisuMZ['ItemsEquipsCore'][_0x1ca854(0x357)]=Scene_Equip[_0x1ca854(0x495)][_0x1ca854(0x2c9)],Scene_Equip[_0x1ca854(0x495)]['statusWindowRect']=function(){const _0x25ebd6=_0x1ca854;return this[_0x25ebd6(0x300)]()?this[_0x25ebd6(0x4de)]():VisuMZ[_0x25ebd6(0x4d3)][_0x25ebd6(0x357)][_0x25ebd6(0x34d)](this);},Scene_Equip['prototype']['statusWindowRectItemsEquipsCore']=function(){const _0xac1874=_0x1ca854,_0x2b268=this[_0xac1874(0x497)]()?0x0:Graphics[_0xac1874(0x473)]-this[_0xac1874(0x410)](),_0x769ddd=this[_0xac1874(0x4e5)](),_0x32165c=this[_0xac1874(0x410)](),_0x338565=this[_0xac1874(0x30e)]();return new Rectangle(_0x2b268,_0x769ddd,_0x32165c,_0x338565);},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x484)]=Scene_Equip[_0x1ca854(0x495)][_0x1ca854(0x259)],Scene_Equip[_0x1ca854(0x495)][_0x1ca854(0x259)]=function(){const _0x5dbd2f=_0x1ca854;return this[_0x5dbd2f(0x300)]()?this[_0x5dbd2f(0x2a1)]():VisuMZ[_0x5dbd2f(0x4d3)]['Scene_Equip_commandWindowRect']['call'](this);},Scene_Equip[_0x1ca854(0x495)]['shouldCommandWindowExist']=function(){const _0x366121=_0x1ca854,_0xad8bb8=VisuMZ['ItemsEquipsCore'][_0x366121(0x3a5)][_0x366121(0x323)];return _0xad8bb8['CommandAddOptimize']||_0xad8bb8[_0x366121(0x383)];},Scene_Equip[_0x1ca854(0x495)][_0x1ca854(0x2a1)]=function(){const _0x4e0e4=_0x1ca854,_0x35ac37=this[_0x4e0e4(0x28e)](),_0x1ce0b0=this[_0x4e0e4(0x497)]()?this[_0x4e0e4(0x410)]():0x0,_0x1395d8=this[_0x4e0e4(0x4e5)](),_0x3411e2=Graphics[_0x4e0e4(0x473)]-this['statusWidth'](),_0x239ee9=_0x35ac37?this[_0x4e0e4(0x29f)](0x1,!![]):0x0;return new Rectangle(_0x1ce0b0,_0x1395d8,_0x3411e2,_0x239ee9);},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x3d1)]=Scene_Equip[_0x1ca854(0x495)][_0x1ca854(0x4ba)],Scene_Equip[_0x1ca854(0x495)][_0x1ca854(0x4ba)]=function(){const _0x18e51f=_0x1ca854;VisuMZ[_0x18e51f(0x4d3)]['Scene_Equip_createSlotWindow'][_0x18e51f(0x34d)](this),this[_0x18e51f(0x26c)]()&&this[_0x18e51f(0x372)]();},VisuMZ[_0x1ca854(0x4d3)]['Scene_Equip_slotWindowRect']=Scene_Equip['prototype'][_0x1ca854(0x279)],Scene_Equip[_0x1ca854(0x495)]['slotWindowRect']=function(){const _0x1ebdde=_0x1ca854;return this[_0x1ebdde(0x300)]()?this[_0x1ebdde(0x369)]():VisuMZ[_0x1ebdde(0x4d3)][_0x1ebdde(0x334)][_0x1ebdde(0x34d)](this);},Scene_Equip[_0x1ca854(0x495)][_0x1ca854(0x369)]=function(){const _0x4bdc53=_0x1ca854,_0x1ccdec=this[_0x4bdc53(0x259)](),_0x397f4c=this[_0x4bdc53(0x497)]()?this[_0x4bdc53(0x410)]():0x0,_0x1d5fe2=_0x1ccdec['y']+_0x1ccdec[_0x4bdc53(0x1f9)],_0x29c48c=Graphics[_0x4bdc53(0x473)]-this[_0x4bdc53(0x410)](),_0x1e90a9=this['mainAreaHeight']()-_0x1ccdec['height'];return new Rectangle(_0x397f4c,_0x1d5fe2,_0x29c48c,_0x1e90a9);},VisuMZ['ItemsEquipsCore'][_0x1ca854(0x1dc)]=Scene_Equip[_0x1ca854(0x495)][_0x1ca854(0x20f)],Scene_Equip[_0x1ca854(0x495)][_0x1ca854(0x20f)]=function(){const _0x5f0d6d=_0x1ca854;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x5f0d6d(0x279)]():VisuMZ[_0x5f0d6d(0x4d3)][_0x5f0d6d(0x1dc)][_0x5f0d6d(0x34d)](this);},Scene_Equip['prototype'][_0x1ca854(0x410)]=function(){const _0x4ae430=_0x1ca854;return this[_0x4ae430(0x300)]()?this['geUpdatedLayoutStatusWidth']():VisuMZ['ItemsEquipsCore'][_0x4ae430(0x3a5)][_0x4ae430(0x323)][_0x4ae430(0x2f0)];},Scene_Equip[_0x1ca854(0x495)]['geUpdatedLayoutStatusWidth']=function(){const _0x5caf10=_0x1ca854;return Math[_0x5caf10(0x4e9)](Graphics[_0x5caf10(0x473)]/0x2);},Scene_Equip[_0x1ca854(0x495)][_0x1ca854(0x372)]=function(){const _0x2c02c7=_0x1ca854;this[_0x2c02c7(0x272)]['setHandler'](_0x2c02c7(0x2eb),this[_0x2c02c7(0x4e8)][_0x2c02c7(0x33c)](this)),this[_0x2c02c7(0x272)][_0x2c02c7(0x307)](_0x2c02c7(0x3d8),this[_0x2c02c7(0x21a)][_0x2c02c7(0x33c)](this)),this['_slotWindow'][_0x2c02c7(0x307)](_0x2c02c7(0x4e1),this[_0x2c02c7(0x328)][_0x2c02c7(0x33c)](this));},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x43e)]=Scene_Equip['prototype'][_0x1ca854(0x2b7)],Scene_Equip[_0x1ca854(0x495)][_0x1ca854(0x2b7)]=function(){const _0x577dbf=_0x1ca854;this[_0x577dbf(0x26c)]()&&(this[_0x577dbf(0x457)]['deselect'](),this[_0x577dbf(0x457)][_0x577dbf(0x2df)]()),VisuMZ[_0x577dbf(0x4d3)][_0x577dbf(0x43e)]['call'](this);},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x4fc)]=Scene_Equip[_0x1ca854(0x495)][_0x1ca854(0x48a)],Scene_Equip[_0x1ca854(0x495)]['onSlotOk']=function(){const _0x4843ad=_0x1ca854;this['_slotWindow'][_0x4843ad(0x290)]()>=0x0?(VisuMZ['ItemsEquipsCore'][_0x4843ad(0x4fc)][_0x4843ad(0x34d)](this),this[_0x4843ad(0x3fd)]()):(this[_0x4843ad(0x272)]['smoothSelect'](0x0),this[_0x4843ad(0x272)][_0x4843ad(0x3f1)]());},Scene_Equip[_0x1ca854(0x495)][_0x1ca854(0x3fd)]=function(){const _0x4f8d5f=_0x1ca854;this[_0x4f8d5f(0x330)]['refresh']();const _0x193eb0=this[_0x4f8d5f(0x272)]['item'](),_0x566371=this[_0x4f8d5f(0x330)][_0x4f8d5f(0x47a)]['indexOf'](_0x193eb0),_0x79e744=Math[_0x4f8d5f(0x4e9)](this['_itemWindow'][_0x4f8d5f(0x22f)]()/0x2)-0x1;this[_0x4f8d5f(0x330)]['smoothSelect'](_0x566371>=0x0?_0x566371:0x0),this[_0x4f8d5f(0x330)]['setTopRow'](this['_itemWindow'][_0x4f8d5f(0x290)]()-_0x79e744);},VisuMZ[_0x1ca854(0x4d3)]['Scene_Equip_onSlotCancel']=Scene_Equip[_0x1ca854(0x495)][_0x1ca854(0x350)],Scene_Equip['prototype']['onSlotCancel']=function(){const _0x4841d8=_0x1ca854;VisuMZ[_0x4841d8(0x4d3)][_0x4841d8(0x291)][_0x4841d8(0x34d)](this),this[_0x4841d8(0x26c)]()&&(this['_commandWindow'][_0x4841d8(0x3b7)](0x0),this[_0x4841d8(0x272)][_0x4841d8(0x2df)]());},VisuMZ['ItemsEquipsCore'][_0x1ca854(0x2d4)]=Scene_Equip['prototype'][_0x1ca854(0x505)],Scene_Equip[_0x1ca854(0x495)][_0x1ca854(0x505)]=function(){const _0x1650fe=_0x1ca854;VisuMZ[_0x1650fe(0x4d3)][_0x1650fe(0x2d4)][_0x1650fe(0x34d)](this),this['isUseModernControls']()&&(this[_0x1650fe(0x457)][_0x1650fe(0x2df)](),this[_0x1650fe(0x457)][_0x1650fe(0x4f6)](),this[_0x1650fe(0x272)][_0x1650fe(0x3b7)](0x0),this['_slotWindow']['activate']());},Scene_Equip['prototype']['buttonAssistSlotWindowShift']=function(){const _0xd22e8c=_0x1ca854;if(!this[_0xd22e8c(0x272)])return![];if(!this[_0xd22e8c(0x272)][_0xd22e8c(0x493)])return![];return this['_slotWindow'][_0xd22e8c(0x4d7)]();},Scene_Equip[_0x1ca854(0x495)][_0x1ca854(0x38a)]=function(){const _0x1a4d9a=_0x1ca854;if(this[_0x1a4d9a(0x2b8)]())return TextManager[_0x1a4d9a(0x397)](_0x1a4d9a(0x210));return Scene_MenuBase[_0x1a4d9a(0x495)]['buttonAssistKey3'][_0x1a4d9a(0x34d)](this);},Scene_Equip[_0x1ca854(0x495)]['buttonAssistText3']=function(){const _0x4c2e46=_0x1ca854;if(this[_0x4c2e46(0x2b8)]())return VisuMZ[_0x4c2e46(0x4d3)][_0x4c2e46(0x3a5)][_0x4c2e46(0x323)][_0x4c2e46(0x39a)];return Scene_MenuBase[_0x4c2e46(0x495)][_0x4c2e46(0x49b)][_0x4c2e46(0x34d)](this);},Scene_Equip[_0x1ca854(0x495)][_0x1ca854(0x33e)]=function(){const _0x4671c5=_0x1ca854;if(this[_0x4671c5(0x2b8)]())return this['_buttonAssistWindow'][_0x4671c5(0x3f7)]/0x5/-0x3;return Scene_MenuBase[_0x4671c5(0x495)][_0x4671c5(0x33e)]['call'](this);},VisuMZ['ItemsEquipsCore'][_0x1ca854(0x2d9)]=Scene_Load[_0x1ca854(0x495)]['reloadMapIfUpdated'],Scene_Load[_0x1ca854(0x495)][_0x1ca854(0x2a3)]=function(){const _0x36c92a=_0x1ca854;VisuMZ[_0x36c92a(0x4d3)][_0x36c92a(0x2d9)][_0x36c92a(0x34d)](this),this[_0x36c92a(0x41b)]();},Scene_Load[_0x1ca854(0x495)][_0x1ca854(0x41b)]=function(){const _0x11d51d=_0x1ca854;if($gameSystem[_0x11d51d(0x3b4)]()!==$dataSystem[_0x11d51d(0x3b4)])for(const _0xb23749 of $gameActors['_data']){if(_0xb23749)_0xb23749[_0x11d51d(0x30d)]();}},Scene_Shop['prototype'][_0x1ca854(0x3b1)]=function(){const _0x463ae3=_0x1ca854;if(ConfigManager[_0x463ae3(0x46c)]&&ConfigManager[_0x463ae3(0x34a)]!==undefined)return ConfigManager[_0x463ae3(0x34a)];else{if(this[_0x463ae3(0x300)]())return this[_0x463ae3(0x29a)]()[_0x463ae3(0x4f8)](/LOWER/i);else Scene_MenuBase[_0x463ae3(0x495)]['isRightInputMode'][_0x463ae3(0x34d)](this);}},Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x497)]=function(){const _0x2de759=_0x1ca854;if(ConfigManager[_0x2de759(0x46c)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x2de759(0x205)];else{if(this[_0x2de759(0x300)]())return this['updatedLayoutStyle']()['match'](/RIGHT/i);else Scene_MenuBase[_0x2de759(0x495)][_0x2de759(0x497)][_0x2de759(0x34d)](this);}},Scene_Shop['prototype'][_0x1ca854(0x29a)]=function(){const _0x166e81=_0x1ca854;return VisuMZ['ItemsEquipsCore']['Settings'][_0x166e81(0x2a2)][_0x166e81(0x445)];},Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x26c)]=function(){const _0x4fdcf1=_0x1ca854;return this[_0x4fdcf1(0x465)]&&this['_categoryWindow']['isUseModernControls']();},Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x300)]=function(){const _0x316622=_0x1ca854;return VisuMZ[_0x316622(0x4d3)][_0x316622(0x3a5)][_0x316622(0x2a2)]['EnableLayout'];},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x3fb)]=Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x3a4)],Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x3a4)]=function(_0x103551,_0x1a2f02){const _0x1c9827=_0x1ca854;_0x103551=JsonEx[_0x1c9827(0x4db)](_0x103551),VisuMZ[_0x1c9827(0x4d3)]['Scene_Shop_prepare'][_0x1c9827(0x34d)](this,_0x103551,_0x1a2f02),this[_0x1c9827(0x321)]();},Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x321)]=function(){const _0x3e81b3=_0x1ca854;this[_0x3e81b3(0x212)]=0x0;for(const _0x40df27 of this[_0x3e81b3(0x403)]){this[_0x3e81b3(0x362)](_0x40df27)?this[_0x3e81b3(0x212)]++:_0x40df27[0x0]=-0x1;}},Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x362)]=function(_0x19b8b4){const _0x27742d=_0x1ca854;if(_0x19b8b4[0x0]>0x2||_0x19b8b4[0x0]<0x0)return![];const _0x285ceb=[$dataItems,$dataWeapons,$dataArmors][_0x19b8b4[0x0]][_0x19b8b4[0x1]];if(!_0x285ceb)return![];const _0x37fba9=_0x285ceb[_0x27742d(0x46e)]||'';if(_0x37fba9['match'](/<SHOW SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5c409b=JSON[_0x27742d(0x25a)]('['+RegExp['$1'][_0x27742d(0x4f8)](/\d+/g)+']');for(const _0x512606 of _0x5c409b){if(!$gameSwitches[_0x27742d(0x44c)](_0x512606))return![];}return!![];}if(_0x37fba9[_0x27742d(0x4f8)](/<SHOW SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3d2bc7=JSON[_0x27742d(0x25a)]('['+RegExp['$1'][_0x27742d(0x4f8)](/\d+/g)+']');for(const _0x5d12c2 of _0x3d2bc7){if(!$gameSwitches[_0x27742d(0x44c)](_0x5d12c2))return![];}return!![];}if(_0x37fba9[_0x27742d(0x4f8)](/<SHOW SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x77112f=JSON[_0x27742d(0x25a)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x125041 of _0x77112f){if($gameSwitches[_0x27742d(0x44c)](_0x125041))return!![];}return![];}if(_0x37fba9[_0x27742d(0x4f8)](/<HIDE SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xf3cdeb=JSON[_0x27742d(0x25a)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x188e69 of _0xf3cdeb){if(!$gameSwitches[_0x27742d(0x44c)](_0x188e69))return!![];}return![];}if(_0x37fba9[_0x27742d(0x4f8)](/<HIDE SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x44331e=JSON[_0x27742d(0x25a)]('['+RegExp['$1'][_0x27742d(0x4f8)](/\d+/g)+']');for(const _0x551a50 of _0x44331e){if(!$gameSwitches[_0x27742d(0x44c)](_0x551a50))return!![];}return![];}if(_0x37fba9['match'](/<HIDE SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x32c287=JSON[_0x27742d(0x25a)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1fe8fc of _0x32c287){if($gameSwitches[_0x27742d(0x44c)](_0x1fe8fc))return![];}return!![];}return!![];},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x4cb)]=Scene_Shop[_0x1ca854(0x495)]['create'],Scene_Shop['prototype'][_0x1ca854(0x27c)]=function(){const _0x245a4c=_0x1ca854;VisuMZ[_0x245a4c(0x4d3)][_0x245a4c(0x4cb)][_0x245a4c(0x34d)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x245a4c(0x346)](),this['resetShopSwitches']();},Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x346)]=function(){const _0x30b955=_0x1ca854;this[_0x30b955(0x1e4)][_0x30b955(0x256)](),this[_0x30b955(0x4f9)][_0x30b955(0x504)](),this[_0x30b955(0x4f9)][_0x30b955(0x4f6)](),this[_0x30b955(0x2de)][_0x30b955(0x504)]();},Scene_Shop['prototype'][_0x1ca854(0x452)]=function(){const _0x2b0cd8=_0x1ca854;return this[_0x2b0cd8(0x300)]()?this[_0x2b0cd8(0x2ba)]():Scene_MenuBase['prototype'][_0x2b0cd8(0x452)][_0x2b0cd8(0x34d)](this);},Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x2ba)]=function(){const _0x5a2447=_0x1ca854,_0x52510d=0x0,_0x4bce3b=this[_0x5a2447(0x270)](),_0x28fae7=Graphics[_0x5a2447(0x473)],_0x203bb3=this[_0x5a2447(0x2f7)]();return new Rectangle(_0x52510d,_0x4bce3b,_0x28fae7,_0x203bb3);},VisuMZ[_0x1ca854(0x4d3)]['Scene_Shop_goldWindowRect']=Scene_Shop[_0x1ca854(0x495)]['goldWindowRect'],Scene_Shop['prototype'][_0x1ca854(0x3a7)]=function(){const _0x5cef30=_0x1ca854;return this[_0x5cef30(0x300)]()?this[_0x5cef30(0x344)]():VisuMZ[_0x5cef30(0x4d3)][_0x5cef30(0x494)][_0x5cef30(0x34d)](this);},Scene_Shop[_0x1ca854(0x495)]['goldWindowRectItemsEquipsCore']=function(){const _0x518c76=_0x1ca854,_0x219998=this[_0x518c76(0x246)](),_0x367832=this[_0x518c76(0x29f)](0x1,!![]),_0xd25193=this['isRightInputMode']()?0x0:Graphics[_0x518c76(0x473)]-_0x219998,_0x248f42=this['mainAreaTop']();return new Rectangle(_0xd25193,_0x248f42,_0x219998,_0x367832);},VisuMZ['ItemsEquipsCore'][_0x1ca854(0x423)]=Scene_Shop[_0x1ca854(0x495)]['commandWindowRect'],Scene_Shop['prototype']['commandWindowRect']=function(){const _0x5163dd=_0x1ca854;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x5163dd(0x2a1)]():VisuMZ[_0x5163dd(0x4d3)][_0x5163dd(0x423)]['call'](this);},Scene_Shop['prototype']['commandWindowRectItemsEquipsCore']=function(){const _0x1d5a37=_0x1ca854,_0x11ceaa=this[_0x1d5a37(0x497)]()?this[_0x1d5a37(0x246)]():0x0,_0x366a69=this[_0x1d5a37(0x4e5)](),_0x163e0e=Graphics[_0x1d5a37(0x473)]-this['mainCommandWidth'](),_0xc27844=this[_0x1d5a37(0x29f)](0x1,!![]);return new Rectangle(_0x11ceaa,_0x366a69,_0x163e0e,_0xc27844);},VisuMZ[_0x1ca854(0x4d3)]['Scene_Shop_numberWindowRect']=Scene_Shop['prototype'][_0x1ca854(0x1f8)],Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x1f8)]=function(){const _0x4cba12=_0x1ca854;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x4cba12(0x40b)]():VisuMZ[_0x4cba12(0x4d3)][_0x4cba12(0x4eb)][_0x4cba12(0x34d)](this);},Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x40b)]=function(){const _0x261cef=_0x1ca854,_0x53a38d=this[_0x261cef(0x457)]['y']+this['_commandWindow']['height'],_0x187796=Graphics[_0x261cef(0x473)]-this[_0x261cef(0x410)](),_0x23ad56=this['isRightInputMode']()?Graphics[_0x261cef(0x473)]-_0x187796:0x0,_0x453aa2=this[_0x261cef(0x30e)]()-this[_0x261cef(0x457)][_0x261cef(0x1f9)];return new Rectangle(_0x23ad56,_0x53a38d,_0x187796,_0x453aa2);},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x1dd)]=Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x2c9)],Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x2c9)]=function(){const _0xa58068=_0x1ca854;return this[_0xa58068(0x300)]()?this[_0xa58068(0x4de)]():VisuMZ['ItemsEquipsCore'][_0xa58068(0x1dd)][_0xa58068(0x34d)](this);},Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x4de)]=function(){const _0x27ef31=_0x1ca854,_0x12aba0=this['statusWidth'](),_0x35ad1d=this[_0x27ef31(0x30e)]()-this[_0x27ef31(0x457)]['height'],_0x5c2c5=this[_0x27ef31(0x497)]()?0x0:Graphics[_0x27ef31(0x473)]-_0x12aba0,_0xdf0e19=this[_0x27ef31(0x457)]['y']+this[_0x27ef31(0x457)][_0x27ef31(0x1f9)];return new Rectangle(_0x5c2c5,_0xdf0e19,_0x12aba0,_0x35ad1d);},VisuMZ[_0x1ca854(0x4d3)]['Scene_Shop_buyWindowRect']=Scene_Shop['prototype']['buyWindowRect'],Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x37e)]=function(){const _0x405c39=_0x1ca854;return this[_0x405c39(0x300)]()?this[_0x405c39(0x402)]():VisuMZ[_0x405c39(0x4d3)][_0x405c39(0x38e)][_0x405c39(0x34d)](this);},Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x402)]=function(){const _0x48747d=_0x1ca854,_0x3f7b65=this['_commandWindow']['y']+this['_commandWindow'][_0x48747d(0x1f9)],_0x53d128=Graphics[_0x48747d(0x473)]-this[_0x48747d(0x410)](),_0xd523ca=this[_0x48747d(0x30e)]()-this[_0x48747d(0x457)][_0x48747d(0x1f9)],_0xd4d99a=this[_0x48747d(0x497)]()?Graphics[_0x48747d(0x473)]-_0x53d128:0x0;return new Rectangle(_0xd4d99a,_0x3f7b65,_0x53d128,_0xd523ca);},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x4dc)]=Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x358)],Scene_Shop[_0x1ca854(0x495)]['createCategoryWindow']=function(){const _0x3ad3a8=_0x1ca854;VisuMZ[_0x3ad3a8(0x4d3)][_0x3ad3a8(0x4dc)][_0x3ad3a8(0x34d)](this),this[_0x3ad3a8(0x26c)]()&&this[_0x3ad3a8(0x492)]();},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x2da)]=Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x2c7)],Scene_Shop[_0x1ca854(0x495)]['categoryWindowRect']=function(){const _0x2e253e=_0x1ca854;return this[_0x2e253e(0x300)]()?this[_0x2e253e(0x4b0)]():VisuMZ[_0x2e253e(0x4d3)][_0x2e253e(0x2da)][_0x2e253e(0x34d)](this);},Scene_Shop['prototype'][_0x1ca854(0x4b0)]=function(){const _0x710768=_0x1ca854,_0x445875=this[_0x710768(0x457)]['y'],_0x237984=this[_0x710768(0x457)][_0x710768(0x3f7)],_0x2bb7d3=this[_0x710768(0x29f)](0x1,!![]),_0x3dacc7=this[_0x710768(0x497)]()?Graphics[_0x710768(0x473)]-_0x237984:0x0;return new Rectangle(_0x3dacc7,_0x445875,_0x237984,_0x2bb7d3);},Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x492)]=function(){const _0x3e7ec6=_0x1ca854;delete this[_0x3e7ec6(0x465)][_0x3e7ec6(0x26f)]['ok'],delete this[_0x3e7ec6(0x465)]['_handlers']['cancel'];},VisuMZ[_0x1ca854(0x4d3)]['Scene_Shop_createSellWindow']=Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x3d5)],Scene_Shop['prototype'][_0x1ca854(0x3d5)]=function(){const _0x439c13=_0x1ca854;VisuMZ[_0x439c13(0x4d3)]['Scene_Shop_createSellWindow'][_0x439c13(0x34d)](this),this[_0x439c13(0x300)]()&&this[_0x439c13(0x2d0)]();},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x4b9)]=Scene_Shop['prototype']['sellWindowRect'],Scene_Shop['prototype'][_0x1ca854(0x3f0)]=function(){const _0xaf108c=_0x1ca854;return this[_0xaf108c(0x300)]()?this[_0xaf108c(0x242)]():VisuMZ[_0xaf108c(0x4d3)][_0xaf108c(0x4b9)][_0xaf108c(0x34d)](this);},Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x242)]=function(){const _0xe8786=_0x1ca854,_0x3b1eec=this['_categoryWindow']['y']+this[_0xe8786(0x465)][_0xe8786(0x1f9)],_0x165689=Graphics['boxWidth']-this[_0xe8786(0x410)](),_0x1e3409=this[_0xe8786(0x30e)]()-this['_categoryWindow']['height'],_0x31e277=this[_0xe8786(0x497)]()?Graphics[_0xe8786(0x473)]-_0x165689:0x0;return new Rectangle(_0x31e277,_0x3b1eec,_0x165689,_0x1e3409);},Scene_Shop[_0x1ca854(0x495)]['postCreateSellWindowItemsEquipsCore']=function(){const _0x2d29fe=_0x1ca854;this[_0x2d29fe(0x252)][_0x2d29fe(0x3e3)](this[_0x2d29fe(0x2de)]);},Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x410)]=function(){const _0x30cadd=_0x1ca854;return VisuMZ['ItemsEquipsCore']['Settings'][_0x30cadd(0x27b)]['Width'];},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x44a)]=Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x2d6)],Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x2d6)]=function(){const _0x21a2cf=_0x1ca854;VisuMZ[_0x21a2cf(0x4d3)]['Scene_Shop_activateSellWindow'][_0x21a2cf(0x34d)](this),this[_0x21a2cf(0x300)]()&&this[_0x21a2cf(0x2de)][_0x21a2cf(0x504)]();},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x385)]=Scene_Shop['prototype'][_0x1ca854(0x282)],Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x282)]=function(){const _0x22cd0d=_0x1ca854;VisuMZ[_0x22cd0d(0x4d3)]['Scene_Shop_commandBuy'][_0x22cd0d(0x34d)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x22cd0d(0x39b)]();},Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x39b)]=function(){const _0x550e6b=_0x1ca854;this['_buyWindowLastIndex']=this[_0x550e6b(0x3cd)]||0x0,this[_0x550e6b(0x4f9)][_0x550e6b(0x3b7)](this[_0x550e6b(0x3cd)]);},VisuMZ['ItemsEquipsCore']['Scene_Shop_commandSell']=Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x206)],Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x206)]=function(){const _0x30d8ca=_0x1ca854;VisuMZ['ItemsEquipsCore'][_0x30d8ca(0x228)]['call'](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x30d8ca(0x1d9)](),this[_0x30d8ca(0x26c)]()&&(this[_0x30d8ca(0x465)]['smoothSelect'](0x0),this[_0x30d8ca(0x39e)]());},Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x1d9)]=function(){const _0x51749b=_0x1ca854;this['_buyWindow'][_0x51749b(0x256)](),this[_0x51749b(0x457)][_0x51749b(0x256)]();},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x405)]=Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x1cc)],Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x1cc)]=function(){const _0x1e2ec2=_0x1ca854;VisuMZ[_0x1e2ec2(0x4d3)][_0x1e2ec2(0x405)][_0x1e2ec2(0x34d)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this['onBuyCancelItemsEquipsCore']();},Scene_Shop['prototype'][_0x1ca854(0x4bf)]=function(){const _0x4930d3=_0x1ca854;this[_0x4930d3(0x3cd)]=this[_0x4930d3(0x4f9)][_0x4930d3(0x290)](),this[_0x4930d3(0x4f9)][_0x4930d3(0x504)](),this[_0x4930d3(0x4f9)][_0x4930d3(0x4f6)](),this[_0x4930d3(0x4f9)]['smoothScrollTo'](0x0,0x0),this['_statusWindow']['show'](),this[_0x4930d3(0x1e4)]['hide']();},VisuMZ[_0x1ca854(0x4d3)]['Scene_Shop_onCategoryCancel']=Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x225)],Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x225)]=function(){const _0x2760e6=_0x1ca854;VisuMZ['ItemsEquipsCore']['Scene_Shop_onCategoryCancel']['call'](this),this[_0x2760e6(0x300)]()&&this[_0x2760e6(0x218)]();},Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x218)]=function(){const _0x45e45c=_0x1ca854;this[_0x45e45c(0x4f9)][_0x45e45c(0x504)](),this[_0x45e45c(0x457)]['show']();},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x24b)]=Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x46b)],Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x46b)]=function(){const _0x2c5793=_0x1ca854;VisuMZ[_0x2c5793(0x4d3)]['Scene_Shop_onSellOk'][_0x2c5793(0x34d)](this),this[_0x2c5793(0x300)]()&&this['onSellOkItemsEquipsCore']();},Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x4a0)]=function(){const _0x2a6a4d=_0x1ca854;this[_0x2a6a4d(0x465)][_0x2a6a4d(0x504)]();},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x318)]=Scene_Shop['prototype'][_0x1ca854(0x438)],Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x438)]=function(){const _0x24773a=_0x1ca854;VisuMZ[_0x24773a(0x4d3)]['Scene_Shop_onSellCancel'][_0x24773a(0x34d)](this),this['isUseModernControls']()&&this[_0x24773a(0x225)](),this[_0x24773a(0x300)]()&&this[_0x24773a(0x1e4)][_0x24773a(0x256)]();},VisuMZ['ItemsEquipsCore']['Scene_Shop_sellingPrice']=Scene_Shop[_0x1ca854(0x495)]['sellingPrice'],Scene_Shop[_0x1ca854(0x495)]['sellingPrice']=function(){const _0x36386b=_0x1ca854;let _0xb0fbb=this[_0x36386b(0x4e7)]();const _0x38d4b4=this[_0x36386b(0x4ca)];return _0xb0fbb=VisuMZ[_0x36386b(0x4d3)]['Settings'][_0x36386b(0x2a2)][_0x36386b(0x42e)][_0x36386b(0x34d)](this,_0x38d4b4,_0xb0fbb),_0xb0fbb;},Scene_Shop[_0x1ca854(0x495)]['determineBaseSellingPrice']=function(){const _0x1309ea=_0x1ca854;if(!this[_0x1309ea(0x4ca)])return 0x0;else{if(this[_0x1309ea(0x4ca)][_0x1309ea(0x46e)]['match'](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){const _0x48c771=String(RegExp['$1']);let _0x1e5ab3=this[_0x1309ea(0x4ca)],_0x1bc6c4=_0x1e5ab3[_0x1309ea(0x3fc)]*this['sellPriceRate']();try{eval(_0x48c771);}catch(_0x346cd1){if($gameTemp['isPlaytest']())console[_0x1309ea(0x474)](_0x346cd1);}if(isNaN(_0x1bc6c4))_0x1bc6c4=0x0;return Math[_0x1309ea(0x4e9)](_0x1bc6c4);}else return this[_0x1309ea(0x4ca)]['note'][_0x1309ea(0x4f8)](/<SELL PRICE:[ ](\d+)>/i)?parseInt(RegExp['$1']):Math[_0x1309ea(0x4e9)](this[_0x1309ea(0x4ca)][_0x1309ea(0x3fc)]*this[_0x1309ea(0x42d)]());}},Scene_Shop['prototype'][_0x1ca854(0x42d)]=function(){const _0x36e99e=_0x1ca854;return VisuMZ[_0x36e99e(0x4d3)][_0x36e99e(0x3a5)]['ShopScene'][_0x36e99e(0x40a)];},Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x47b)]=function(){const _0x2c8c46=_0x1ca854;if(!this[_0x2c8c46(0x29a)]())return![];if(!this[_0x2c8c46(0x26c)]())return![];if(!this[_0x2c8c46(0x252)])return![];if(!this['_sellWindow']['active'])return![];return this['updatedLayoutStyle']()&&this['isUseModernControls']();},Scene_Shop['prototype'][_0x1ca854(0x1cd)]=function(){const _0x2582c6=_0x1ca854;if(this[_0x2582c6(0x47b)]())return this[_0x2582c6(0x252)][_0x2582c6(0x343)]()===0x1?TextManager[_0x2582c6(0x32b)](_0x2582c6(0x471),_0x2582c6(0x35b)):TextManager[_0x2582c6(0x32b)](_0x2582c6(0x4e1),_0x2582c6(0x3d8));else{if(this[_0x2582c6(0x25d)]&&this[_0x2582c6(0x25d)][_0x2582c6(0x493)])return TextManager['getInputMultiButtonStrings']('left','right');}return Scene_MenuBase['prototype'][_0x2582c6(0x1cd)][_0x2582c6(0x34d)](this);},Scene_Shop['prototype'][_0x1ca854(0x4a7)]=function(){const _0x48768b=_0x1ca854;if(this['_numberWindow']&&this[_0x48768b(0x25d)][_0x48768b(0x493)])return TextManager[_0x48768b(0x32b)]('up',_0x48768b(0x4a1));return Scene_MenuBase[_0x48768b(0x495)][_0x48768b(0x4a7)]['call'](this);},Scene_Shop['prototype'][_0x1ca854(0x354)]=function(){const _0x86d9ad=_0x1ca854;if(this['buttonAssistItemListRequirement']())return VisuMZ[_0x86d9ad(0x4d3)]['Settings']['ItemScene']['buttonAssistCategory'];else{if(this[_0x86d9ad(0x25d)]&&this[_0x86d9ad(0x25d)]['active'])return VisuMZ[_0x86d9ad(0x4d3)][_0x86d9ad(0x3a5)][_0x86d9ad(0x2a2)]['buttonAssistSmallIncrement'];}return Scene_MenuBase[_0x86d9ad(0x495)][_0x86d9ad(0x354)][_0x86d9ad(0x34d)](this);},Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x277)]=function(){const _0xe090d1=_0x1ca854;if(this[_0xe090d1(0x25d)]&&this[_0xe090d1(0x25d)][_0xe090d1(0x493)])return VisuMZ[_0xe090d1(0x4d3)][_0xe090d1(0x3a5)][_0xe090d1(0x2a2)][_0xe090d1(0x3dd)];return Scene_MenuBase[_0xe090d1(0x495)][_0xe090d1(0x277)][_0xe090d1(0x34d)](this);},Scene_Shop['prototype'][_0x1ca854(0x3a8)]=function(){const _0x52097a=_0x1ca854;if(!SceneManager['isSceneShop']())return;const _0x4d80cc=VisuMZ[_0x52097a(0x4d3)][_0x52097a(0x3a5)][_0x52097a(0x2a2)];_0x4d80cc[_0x52097a(0x304)]&&$gameSwitches[_0x52097a(0x23e)](_0x4d80cc[_0x52097a(0x304)],![]),_0x4d80cc[_0x52097a(0x503)]&&$gameSwitches[_0x52097a(0x23e)](_0x4d80cc[_0x52097a(0x503)],![]);},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x45b)]=Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x2ca)],Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x2ca)]=function(_0x3e2f4c){const _0x3a694c=_0x1ca854;VisuMZ[_0x3a694c(0x4d3)]['Scene_Shop_doBuy'][_0x3a694c(0x34d)](this,_0x3e2f4c);if(_0x3e2f4c<=0x0)return;const _0x119b03=VisuMZ[_0x3a694c(0x4d3)]['Settings']['ShopScene'];_0x119b03[_0x3a694c(0x304)]&&$gameSwitches[_0x3a694c(0x23e)](_0x119b03[_0x3a694c(0x304)],!![]);},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x4e4)]=Scene_Shop[_0x1ca854(0x495)][_0x1ca854(0x476)],Scene_Shop['prototype'][_0x1ca854(0x476)]=function(_0x1d2e83){const _0x4d6f63=_0x1ca854;VisuMZ[_0x4d6f63(0x4d3)]['Scene_Shop_doSell']['call'](this,_0x1d2e83);if(_0x1d2e83<=0x0)return;const _0x2a0b18=VisuMZ[_0x4d6f63(0x4d3)][_0x4d6f63(0x3a5)][_0x4d6f63(0x2a2)];_0x2a0b18['SwitchBuy']&&$gameSwitches['setValue'](_0x2a0b18[_0x4d6f63(0x503)],!![]);};function Sprite_NewLabel(){const _0x1ce9b8=_0x1ca854;this[_0x1ce9b8(0x261)](...arguments);}Sprite_NewLabel[_0x1ca854(0x495)]=Object[_0x1ca854(0x27c)](Sprite[_0x1ca854(0x495)]),Sprite_NewLabel[_0x1ca854(0x495)][_0x1ca854(0x4be)]=Sprite_NewLabel,Sprite_NewLabel[_0x1ca854(0x495)][_0x1ca854(0x261)]=function(){const _0x350d9e=_0x1ca854;Sprite['prototype'][_0x350d9e(0x261)][_0x350d9e(0x34d)](this),this[_0x350d9e(0x35a)]();},Sprite_NewLabel['prototype'][_0x1ca854(0x35a)]=function(){const _0x436e30=_0x1ca854,_0x54e6ea=ImageManager[_0x436e30(0x236)],_0x1ca04a=ImageManager['iconHeight'];this['bitmap']=new Bitmap(_0x54e6ea,_0x1ca04a),this[_0x436e30(0x23c)](),this[_0x436e30(0x458)]();},Sprite_NewLabel[_0x1ca854(0x495)][_0x1ca854(0x23c)]=function(){const _0x56eca6=_0x1ca854,_0x49cfb5=VisuMZ[_0x56eca6(0x4d3)][_0x56eca6(0x3a5)][_0x56eca6(0x368)][_0x56eca6(0x3ba)];if(_0x49cfb5<=0x0)return;const _0x3a7c75=ImageManager[_0x56eca6(0x2b3)](_0x56eca6(0x406)),_0x2e2e36=ImageManager[_0x56eca6(0x236)],_0x4a6a61=ImageManager[_0x56eca6(0x21d)],_0x1022b7=_0x49cfb5%0x10*_0x2e2e36,_0x175724=Math[_0x56eca6(0x4e9)](_0x49cfb5/0x10)*_0x4a6a61;this[_0x56eca6(0x44e)]['blt'](_0x3a7c75,_0x1022b7,_0x175724,_0x2e2e36,_0x4a6a61,0x0,0x0);},Sprite_NewLabel[_0x1ca854(0x495)][_0x1ca854(0x458)]=function(){const _0x48b44e=_0x1ca854,_0x203f38=VisuMZ['ItemsEquipsCore']['Settings']['New'],_0x12eaad=_0x203f38[_0x48b44e(0x24a)];if(_0x12eaad==='')return;const _0x574183=ImageManager[_0x48b44e(0x236)],_0x11bb8c=ImageManager[_0x48b44e(0x21d)];this[_0x48b44e(0x44e)]['fontFace']=_0x203f38[_0x48b44e(0x223)]||$gameSystem['mainFontFace'](),this[_0x48b44e(0x44e)][_0x48b44e(0x3dc)]=this[_0x48b44e(0x468)](),this[_0x48b44e(0x44e)][_0x48b44e(0x35f)]=_0x203f38[_0x48b44e(0x22b)],this[_0x48b44e(0x44e)]['drawText'](_0x12eaad,0x0,_0x11bb8c/0x2,_0x574183,_0x11bb8c/0x2,_0x48b44e(0x283));},Sprite_NewLabel[_0x1ca854(0x495)][_0x1ca854(0x468)]=function(){const _0x3b5edc=_0x1ca854,_0xdfde18=VisuMZ[_0x3b5edc(0x4d3)]['Settings'][_0x3b5edc(0x368)]['FontColor'];return _0xdfde18[_0x3b5edc(0x4f8)](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager['textColor'](_0xdfde18);},Window_Base[_0x1ca854(0x495)][_0x1ca854(0x4e3)]=function(_0x1d5bd3,_0x4113e2,_0x1116f1,_0x2d20b9){const _0x421981=_0x1ca854;if(_0x1d5bd3){const _0x54396b=_0x1116f1+(this[_0x421981(0x437)]()-ImageManager[_0x421981(0x21d)])/0x2,_0x355326=ImageManager[_0x421981(0x236)]+0x4,_0x5713f6=Math[_0x421981(0x39f)](0x0,_0x2d20b9-_0x355326);this['changeTextColor'](ColorManager['getItemColor'](_0x1d5bd3)),this[_0x421981(0x4f3)](_0x1d5bd3[_0x421981(0x4d5)],_0x4113e2,_0x54396b),this['drawText'](_0x1d5bd3['name'],_0x4113e2+_0x355326,_0x1116f1,_0x5713f6),this[_0x421981(0x45f)]();}},Window_Base[_0x1ca854(0x495)][_0x1ca854(0x33f)]=function(_0x4b69a4,_0x4bf7b5,_0x390bef,_0x229040){const _0x2058ff=_0x1ca854;if(this[_0x2058ff(0x257)](_0x4b69a4)){this[_0x2058ff(0x460)]();const _0x56d316=VisuMZ['ItemsEquipsCore'][_0x2058ff(0x3a5)]['ItemScene'],_0x506135=_0x56d316[_0x2058ff(0x2b2)],_0x46de14=_0x506135[_0x2058ff(0x464)]($gameParty['numItems'](_0x4b69a4));this[_0x2058ff(0x20c)][_0x2058ff(0x35f)]=_0x56d316[_0x2058ff(0x2b9)],this[_0x2058ff(0x42f)](_0x46de14,_0x4bf7b5,_0x390bef,_0x229040,_0x2058ff(0x35b)),this['resetFontSettings']();}},Window_Base[_0x1ca854(0x495)][_0x1ca854(0x257)]=function(_0x5d9521){const _0x304d1e=_0x1ca854;if(DataManager[_0x304d1e(0x26d)](_0x5d9521))return $dataSystem['optKeyItemsNumber'];return!![];},Window_Base[_0x1ca854(0x495)][_0x1ca854(0x1ec)]=function(_0x28a9c2,_0x7b244c,_0x51175f,_0x1df904,_0x1fb5e6){const _0x50f494=_0x1ca854;_0x1fb5e6=Math[_0x50f494(0x39f)](_0x1fb5e6||0x1,0x1);while(_0x1fb5e6--){_0x1df904=_0x1df904||this['lineHeight'](),this['contentsBack'][_0x50f494(0x2af)]=0xa0;const _0x3aa161=ColorManager[_0x50f494(0x21f)]();this[_0x50f494(0x489)][_0x50f494(0x338)](_0x28a9c2+0x1,_0x7b244c+0x1,_0x51175f-0x2,_0x1df904-0x2,_0x3aa161),this[_0x50f494(0x489)][_0x50f494(0x2af)]=0xff;}},VisuMZ['ItemsEquipsCore'][_0x1ca854(0x231)]=Window_Selectable[_0x1ca854(0x495)][_0x1ca854(0x261)],Window_Selectable[_0x1ca854(0x495)]['initialize']=function(_0x394f4c){const _0x4c8cc5=_0x1ca854;this['initNewLabelSprites'](),VisuMZ[_0x4c8cc5(0x4d3)][_0x4c8cc5(0x231)][_0x4c8cc5(0x34d)](this,_0x394f4c);},Window_Selectable[_0x1ca854(0x495)][_0x1ca854(0x487)]=function(){const _0x4d8edb=_0x1ca854;this['_newLabelSprites']={},this[_0x4d8edb(0x3ee)]=0xff,this[_0x4d8edb(0x37c)]=VisuMZ[_0x4d8edb(0x4d3)][_0x4d8edb(0x3a5)][_0x4d8edb(0x368)][_0x4d8edb(0x33a)],this[_0x4d8edb(0x454)]=VisuMZ[_0x4d8edb(0x4d3)][_0x4d8edb(0x3a5)][_0x4d8edb(0x368)][_0x4d8edb(0x1cf)];},Window_Selectable['prototype'][_0x1ca854(0x3f4)]=function(){return![];},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x222)]=Window_Selectable[_0x1ca854(0x495)][_0x1ca854(0x4aa)],Window_Selectable[_0x1ca854(0x495)][_0x1ca854(0x4aa)]=function(_0x21b0c9){const _0x10d2f6=_0x1ca854;VisuMZ[_0x10d2f6(0x4d3)][_0x10d2f6(0x222)][_0x10d2f6(0x34d)](this,_0x21b0c9);if(this['isShowNew']())this['clearNewLabelFromItem'](_0x21b0c9);},Window_Selectable[_0x1ca854(0x495)]['clearNewLabelFromItem']=function(_0xc42cde){const _0x44fda6=_0x1ca854;if(!_0xc42cde)return;$gameParty[_0x44fda6(0x472)](_0xc42cde);let _0x25400f='';if(DataManager[_0x44fda6(0x2e0)](_0xc42cde))_0x25400f=_0x44fda6(0x2e4)[_0x44fda6(0x464)](_0xc42cde['id']);else{if(DataManager['isWeapon'](_0xc42cde))_0x25400f=_0x44fda6(0x4a6)[_0x44fda6(0x464)](_0xc42cde['id']);else{if(DataManager[_0x44fda6(0x3cc)](_0xc42cde))_0x25400f='armor-%1'[_0x44fda6(0x464)](_0xc42cde['id']);else return;}}const _0x23f3a9=this[_0x44fda6(0x241)][_0x25400f];if(_0x23f3a9)_0x23f3a9['hide']();},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x24d)]=Window_Selectable[_0x1ca854(0x495)][_0x1ca854(0x3b5)],Window_Selectable[_0x1ca854(0x495)][_0x1ca854(0x3b5)]=function(){const _0x3c03ea=_0x1ca854;this[_0x3c03ea(0x254)](),VisuMZ[_0x3c03ea(0x4d3)][_0x3c03ea(0x24d)]['call'](this);},Window_Selectable[_0x1ca854(0x495)][_0x1ca854(0x254)]=function(){const _0xe368c0=_0x1ca854;for(const _0x3ce317 of Object['values'](this[_0xe368c0(0x241)])){_0x3ce317[_0xe368c0(0x256)]();}},VisuMZ[_0x1ca854(0x4d3)]['Window_Selectable_update']=Window_Selectable['prototype'][_0x1ca854(0x1e5)],Window_Selectable[_0x1ca854(0x495)]['update']=function(){const _0x17530e=_0x1ca854;this['updateNewLabelOpacity'](),VisuMZ[_0x17530e(0x4d3)][_0x17530e(0x1ed)]['call'](this);},Window_Selectable[_0x1ca854(0x495)][_0x1ca854(0x2a5)]=function(){const _0x1ca591=_0x1ca854;if(!this[_0x1ca591(0x3f4)]())return;const _0x38bcfc=this['_newLabelOpacityUpperLimit'];this[_0x1ca591(0x3ee)]+=this['_newLabelOpacityChange'];(this[_0x1ca591(0x3ee)]>=_0x38bcfc||this[_0x1ca591(0x3ee)]<=0x0)&&(this[_0x1ca591(0x37c)]*=-0x1);this[_0x1ca591(0x3ee)]=this[_0x1ca591(0x3ee)][_0x1ca591(0x217)](0x0,_0x38bcfc);for(const _0x241072 of Object['values'](this[_0x1ca591(0x241)])){_0x241072[_0x1ca591(0x2d2)]=this[_0x1ca591(0x3ee)];}},Window_Selectable[_0x1ca854(0x495)][_0x1ca854(0x214)]=function(_0x2c041c){const _0x13f3aa=_0x1ca854,_0x385024=this[_0x13f3aa(0x241)];if(_0x385024[_0x2c041c])return _0x385024[_0x2c041c];else{const _0x4acee1=new Sprite_NewLabel();return _0x385024[_0x2c041c]=_0x4acee1,this[_0x13f3aa(0x1e6)](_0x4acee1),_0x4acee1;}},Window_Selectable[_0x1ca854(0x495)][_0x1ca854(0x380)]=function(_0x4d1731,_0x1ec837,_0x4c7669){const _0x5e41d8=_0x1ca854;let _0x553fea='';if(DataManager['isItem'](_0x4d1731))_0x553fea=_0x5e41d8(0x2e4)[_0x5e41d8(0x464)](_0x4d1731['id']);else{if(DataManager[_0x5e41d8(0x260)](_0x4d1731))_0x553fea='weapon-%1'[_0x5e41d8(0x464)](_0x4d1731['id']);else{if(DataManager[_0x5e41d8(0x3cc)](_0x4d1731))_0x553fea=_0x5e41d8(0x3e9)['format'](_0x4d1731['id']);else return;}}const _0x5d03eb=this[_0x5e41d8(0x214)](_0x553fea);_0x5d03eb[_0x5e41d8(0x3cf)](_0x1ec837,_0x4c7669),_0x5d03eb[_0x5e41d8(0x504)](),_0x5d03eb['opacity']=this[_0x5e41d8(0x3ee)];},Window_ItemCategory[_0x1ca854(0x3ec)]=VisuMZ['ItemsEquipsCore'][_0x1ca854(0x3a5)][_0x1ca854(0x31c)][_0x1ca854(0x4f4)],Window_ItemCategory['categoryItemTypes']=['HiddenItemA',_0x1ca854(0x1d6),_0x1ca854(0x415),_0x1ca854(0x1d7),'AlwaysUsable',_0x1ca854(0x4b7),_0x1ca854(0x424),_0x1ca854(0x2bb)],VisuMZ[_0x1ca854(0x4d3)]['Window_ItemCategory_initialize']=Window_ItemCategory[_0x1ca854(0x495)][_0x1ca854(0x261)],Window_ItemCategory['prototype'][_0x1ca854(0x261)]=function(_0x17c990){const _0x2add12=_0x1ca854;VisuMZ[_0x2add12(0x4d3)][_0x2add12(0x3d6)][_0x2add12(0x34d)](this,_0x17c990),this['createCategoryNameWindow'](_0x17c990);},Window_ItemCategory[_0x1ca854(0x495)]['createCategoryNameWindow']=function(_0x380de2){const _0x2cee22=_0x1ca854,_0x9dc154=new Rectangle(0x0,0x0,_0x380de2['width'],_0x380de2[_0x2cee22(0x1f9)]);this[_0x2cee22(0x1ff)]=new Window_Base(_0x9dc154),this[_0x2cee22(0x1ff)][_0x2cee22(0x2d2)]=0x0,this[_0x2cee22(0x425)](this['_categoryNameWindow']),this['updateCategoryNameWindow']();},Window_ItemCategory[_0x1ca854(0x495)]['isUseModernControls']=function(){const _0xd9fb16=_0x1ca854;return Imported[_0xd9fb16(0x4bc)]&&Window_HorzCommand[_0xd9fb16(0x495)][_0xd9fb16(0x26c)][_0xd9fb16(0x34d)](this);},Window_ItemCategory[_0x1ca854(0x495)][_0x1ca854(0x292)]=function(){},Window_ItemCategory['prototype'][_0x1ca854(0x1f4)]=function(){const _0x4a8f23=_0x1ca854;if(!this[_0x4a8f23(0x26c)]())Window_HorzCommand['prototype'][_0x4a8f23(0x1f4)][_0x4a8f23(0x34d)](this);},Window_ItemCategory[_0x1ca854(0x495)][_0x1ca854(0x343)]=function(){const _0x122ac2=_0x1ca854;return this[_0x122ac2(0x470)]?this[_0x122ac2(0x499)]():0x4;},Window_ItemCategory[_0x1ca854(0x495)]['update']=function(){const _0x309603=_0x1ca854;Window_HorzCommand[_0x309603(0x495)][_0x309603(0x1e5)]['call'](this),this['_itemWindow']&&this[_0x309603(0x330)][_0x309603(0x3eb)](this[_0x309603(0x3e7)]());},Window_ItemCategory[_0x1ca854(0x495)][_0x1ca854(0x4e0)]=function(){const _0xd619b4=_0x1ca854;if(this[_0xd619b4(0x4c7)]()){const _0x2761b9=this['index']();if(this[_0xd619b4(0x330)]&&this[_0xd619b4(0x330)][_0xd619b4(0x343)]()<=0x1)Input['isRepeated']('right')&&this[_0xd619b4(0x2e5)](Input[_0xd619b4(0x314)](_0xd619b4(0x35b))),Input[_0xd619b4(0x208)](_0xd619b4(0x471))&&this['cursorLeft'](Input[_0xd619b4(0x314)](_0xd619b4(0x471)));else this[_0xd619b4(0x330)]&&this[_0xd619b4(0x330)][_0xd619b4(0x343)]()>0x1&&(Input[_0xd619b4(0x208)]('pagedown')&&!Input[_0xd619b4(0x44b)](_0xd619b4(0x210))&&this['cursorRight'](Input[_0xd619b4(0x314)](_0xd619b4(0x3d8))),Input['isRepeated'](_0xd619b4(0x4e1))&&!Input[_0xd619b4(0x44b)](_0xd619b4(0x210))&&this[_0xd619b4(0x1de)](Input['isTriggered'](_0xd619b4(0x4e1))));this[_0xd619b4(0x290)]()!==_0x2761b9&&this[_0xd619b4(0x1e2)]();}},Window_ItemCategory[_0x1ca854(0x495)][_0x1ca854(0x360)]=function(){const _0x40d49c=_0x1ca854;if(this[_0x40d49c(0x26c)]())return;Window_HorzCommand[_0x40d49c(0x495)]['processHandling'][_0x40d49c(0x34d)](this);},Window_ItemCategory[_0x1ca854(0x495)][_0x1ca854(0x221)]=function(){const _0x34ac4b=_0x1ca854;return this['isUseModernControls']()?![]:Window_HorzCommand[_0x34ac4b(0x495)]['isHoverEnabled'][_0x34ac4b(0x34d)](this);},Window_ItemCategory[_0x1ca854(0x495)][_0x1ca854(0x1fd)]=function(){const _0x1fcf78=_0x1ca854;if(this[_0x1fcf78(0x48d)]()){TouchInput[_0x1fcf78(0x314)]()&&this[_0x1fcf78(0x38d)](!![]);if(TouchInput[_0x1fcf78(0x376)]())this[_0x1fcf78(0x4fa)]();else TouchInput['isCancelled']()&&this[_0x1fcf78(0x25f)]();}},Window_ItemCategory[_0x1ca854(0x495)][_0x1ca854(0x38d)]=function(_0x39282a){const _0x4d00db=_0x1ca854;this['isUseModernControls']()?this[_0x4d00db(0x485)](!![]):Window_HorzCommand[_0x4d00db(0x495)][_0x4d00db(0x38d)]['call'](this,_0x39282a);},Window_ItemCategory[_0x1ca854(0x495)][_0x1ca854(0x485)]=function(_0x41e80f){const _0x568894=_0x1ca854;this[_0x568894(0x428)]=![];if(this[_0x568894(0x4c7)]()){const _0x8b16ef=this[_0x568894(0x290)](),_0xa606d5=this[_0x568894(0x37d)]();_0xa606d5>=0x0&&_0xa606d5!==this[_0x568894(0x290)]()&&this['select'](_0xa606d5),_0x41e80f&&this['index']()!==_0x8b16ef&&this['playCursorSound']();}},Window_ItemCategory[_0x1ca854(0x495)][_0x1ca854(0x502)]=function(){const _0xf2cd69=_0x1ca854;for(const _0x53f5eb of Window_ItemCategory[_0xf2cd69(0x3ec)]){this[_0xf2cd69(0x3e0)](_0x53f5eb);}this[_0xf2cd69(0x220)](this['index']());},Window_ItemCategory['prototype'][_0x1ca854(0x3e0)]=function(_0x440689){const _0x4b1911=_0x1ca854,_0x46c068=_0x440689[_0x4b1911(0x40d)],_0x30f4ae=_0x440689[_0x4b1911(0x3ba)],_0x5ca4ea=_0x440689[_0x4b1911(0x367)]||0x0;if(_0x5ca4ea>0x0&&!$gameSwitches['value'](_0x5ca4ea))return;let _0x1b5d64='',_0x14effd=_0x4b1911(0x3db),_0x53a83e=_0x46c068;if(_0x46c068[_0x4b1911(0x4f8)](/Category:(.*)/i))_0x1b5d64=String(RegExp['$1'])[_0x4b1911(0x351)]();else{if(Window_ItemCategory[_0x4b1911(0x21e)][_0x4b1911(0x26b)](_0x46c068))_0x1b5d64=VisuMZ[_0x4b1911(0x4d3)][_0x4b1911(0x3a5)][_0x4b1911(0x31c)][_0x46c068];else{if([_0x4b1911(0x4ab),'RegularItems'][_0x4b1911(0x26b)](_0x46c068))_0x1b5d64=TextManager[_0x4b1911(0x265)];else{if(_0x46c068==='KeyItems')_0x1b5d64=TextManager['keyItem'];else{if(_0x46c068==='AllWeapons')_0x1b5d64=TextManager[_0x4b1911(0x352)];else{if(_0x46c068===_0x4b1911(0x339))_0x1b5d64=TextManager['armor'];else{if(_0x46c068[_0x4b1911(0x4f8)](/WTYPE:(\d+)/i))_0x1b5d64=$dataSystem['weaponTypes'][Number(RegExp['$1'])]||'';else{if(_0x46c068['match'](/ATYPE:(\d+)/i))_0x1b5d64=$dataSystem['armorTypes'][Number(RegExp['$1'])]||'';else _0x46c068[_0x4b1911(0x4f8)](/ETYPE:(\d+)/i)&&(_0x1b5d64=$dataSystem[_0x4b1911(0x3ad)][Number(RegExp['$1'])]||'');}}}}}}}_0x30f4ae>0x0&&this[_0x4b1911(0x297)]()!==_0x4b1911(0x1e1)&&(_0x1b5d64=_0x4b1911(0x3c2)[_0x4b1911(0x464)](_0x30f4ae,_0x1b5d64)),this['addCommand'](_0x1b5d64,_0x14effd,!![],_0x53a83e);},Window_ItemCategory[_0x1ca854(0x495)]['itemTextAlign']=function(){const _0x561e48=_0x1ca854;return VisuMZ[_0x561e48(0x4d3)][_0x561e48(0x3a5)][_0x561e48(0x31c)][_0x561e48(0x483)];},Window_ItemCategory['prototype'][_0x1ca854(0x2cd)]=function(_0x29319d){const _0x4fd148=_0x1ca854,_0x7f5460=this['categoryStyleCheck'](_0x29319d);if(_0x7f5460===_0x4fd148(0x3f9))this[_0x4fd148(0x3d7)](_0x29319d);else _0x7f5460===_0x4fd148(0x38f)?this[_0x4fd148(0x1ee)](_0x29319d):Window_HorzCommand[_0x4fd148(0x495)]['drawItem'][_0x4fd148(0x34d)](this,_0x29319d);},Window_ItemCategory['prototype'][_0x1ca854(0x297)]=function(){const _0x157dca=_0x1ca854;return VisuMZ['ItemsEquipsCore'][_0x157dca(0x3a5)][_0x157dca(0x31c)]['Style'];},Window_ItemCategory[_0x1ca854(0x495)]['categoryStyleCheck']=function(_0x1e1059){const _0xd6fc95=_0x1ca854;if(_0x1e1059<0x0)return _0xd6fc95(0x1e1);const _0xd798bd=this[_0xd6fc95(0x297)]();if(_0xd798bd!==_0xd6fc95(0x4ed))return _0xd798bd;else{const _0x537883=this[_0xd6fc95(0x401)](_0x1e1059);if(_0x537883[_0xd6fc95(0x4f8)](/\\I\[(\d+)\]/i)){const _0x3444ba=this[_0xd6fc95(0x419)](_0x1e1059),_0x1715c5=this[_0xd6fc95(0x1e0)](_0x537883)[_0xd6fc95(0x3f7)];return _0x1715c5<=_0x3444ba['width']?_0xd6fc95(0x3f9):'icon';}else return _0xd6fc95(0x1e1);}},Window_ItemCategory['prototype']['drawItemStyleIconText']=function(_0x33bb77){const _0x423d9b=_0x1ca854,_0xca5c4b=this['itemLineRect'](_0x33bb77),_0x2e8d08=this[_0x423d9b(0x401)](_0x33bb77),_0x25acb9=this[_0x423d9b(0x1e0)](_0x2e8d08)[_0x423d9b(0x3f7)];this['changePaintOpacity'](this['isCommandEnabled'](_0x33bb77));const _0x42f665=this[_0x423d9b(0x443)]();if(_0x42f665===_0x423d9b(0x35b))this[_0x423d9b(0x375)](_0x2e8d08,_0xca5c4b['x']+_0xca5c4b['width']-_0x25acb9,_0xca5c4b['y'],_0x25acb9);else{if(_0x42f665===_0x423d9b(0x283)){const _0x227139=_0xca5c4b['x']+Math['floor']((_0xca5c4b[_0x423d9b(0x3f7)]-_0x25acb9)/0x2);this[_0x423d9b(0x375)](_0x2e8d08,_0x227139,_0xca5c4b['y'],_0x25acb9);}else this[_0x423d9b(0x375)](_0x2e8d08,_0xca5c4b['x'],_0xca5c4b['y'],_0x25acb9);}},Window_ItemCategory[_0x1ca854(0x495)][_0x1ca854(0x1ee)]=function(_0x59f0d0){const _0x5145b7=_0x1ca854,_0x41eb89=this[_0x5145b7(0x401)](_0x59f0d0);if(_0x41eb89[_0x5145b7(0x4f8)](/\\I\[(\d+)\]/i)){const _0x2d5ba7=Number(RegExp['$1'])||0x0,_0x237154=this[_0x5145b7(0x419)](_0x59f0d0),_0x182d3f=_0x237154['x']+Math['floor']((_0x237154[_0x5145b7(0x3f7)]-ImageManager[_0x5145b7(0x236)])/0x2),_0x261470=_0x237154['y']+(_0x237154[_0x5145b7(0x1f9)]-ImageManager['iconHeight'])/0x2;this[_0x5145b7(0x4f3)](_0x2d5ba7,_0x182d3f,_0x261470);}},VisuMZ['ItemsEquipsCore'][_0x1ca854(0x2dd)]=Window_ItemCategory['prototype']['setItemWindow'],Window_ItemCategory[_0x1ca854(0x495)]['setItemWindow']=function(_0x2c1a3c){const _0x45530d=_0x1ca854;VisuMZ[_0x45530d(0x4d3)][_0x45530d(0x2dd)][_0x45530d(0x34d)](this,_0x2c1a3c),_0x2c1a3c[_0x45530d(0x465)]=this;},Window_ItemCategory[_0x1ca854(0x495)][_0x1ca854(0x301)]=function(){const _0x1a32e9=_0x1ca854;Window_HorzCommand[_0x1a32e9(0x495)][_0x1a32e9(0x301)][_0x1a32e9(0x34d)](this);if(this[_0x1a32e9(0x1ff)])this[_0x1a32e9(0x1d1)]();},Window_ItemCategory[_0x1ca854(0x495)]['updateCategoryNameWindow']=function(){const _0x40cb81=_0x1ca854,_0x49f05c=this[_0x40cb81(0x1ff)];_0x49f05c[_0x40cb81(0x20c)]['clear']();const _0x87abce=this[_0x40cb81(0x24e)](this[_0x40cb81(0x290)]());if(_0x87abce===_0x40cb81(0x38f)){const _0x137f21=this['itemLineRect'](this[_0x40cb81(0x290)]());let _0x5b0f59=this['commandName'](this[_0x40cb81(0x290)]());_0x5b0f59=_0x5b0f59['replace'](/\\I\[(\d+)\]/gi,''),_0x49f05c[_0x40cb81(0x460)](),this[_0x40cb81(0x4d4)](_0x5b0f59,_0x137f21),this[_0x40cb81(0x420)](_0x5b0f59,_0x137f21),this[_0x40cb81(0x2ee)](_0x5b0f59,_0x137f21);}},Window_ItemCategory['prototype'][_0x1ca854(0x4d4)]=function(_0x1b8080,_0x58f4e1){},Window_ItemCategory[_0x1ca854(0x495)][_0x1ca854(0x420)]=function(_0x16a280,_0x155a2b){const _0x4b2a1a=_0x1ca854,_0x3646d=this['_categoryNameWindow'];_0x3646d[_0x4b2a1a(0x42f)](_0x16a280,0x0,_0x155a2b['y'],_0x3646d[_0x4b2a1a(0x4f5)],_0x4b2a1a(0x283));},Window_ItemCategory['prototype'][_0x1ca854(0x2ee)]=function(_0x32024b,_0x4d8c15){const _0x537796=_0x1ca854,_0x1d2965=this[_0x537796(0x1ff)],_0x10333f=$gameSystem[_0x537796(0x451)](),_0x2b6c40=_0x4d8c15['x']+Math[_0x537796(0x4e9)](_0x4d8c15[_0x537796(0x3f7)]/0x2)+_0x10333f;_0x1d2965['x']=_0x1d2965[_0x537796(0x3f7)]/-0x2+_0x2b6c40,_0x1d2965['y']=Math[_0x537796(0x4e9)](_0x4d8c15['height']/0x2);},Window_ItemList['prototype']['processCursorMoveModernControls']=function(){const _0x21991c=_0x1ca854;if(this[_0x21991c(0x4c7)]()){const _0x473882=this[_0x21991c(0x290)]();if(this[_0x21991c(0x343)]()<=0x1)!this[_0x21991c(0x226)](_0x21991c(0x3d8))&&Input[_0x21991c(0x314)](_0x21991c(0x3d8))&&this['cursorPagedown'](),!this[_0x21991c(0x226)](_0x21991c(0x4e1))&&Input[_0x21991c(0x314)](_0x21991c(0x4e1))&&this['cursorPageup']();else this[_0x21991c(0x343)]()>0x1&&(Input['isRepeated']('right')&&this['cursorRight'](Input[_0x21991c(0x314)](_0x21991c(0x35b))),Input[_0x21991c(0x208)](_0x21991c(0x471))&&this[_0x21991c(0x1de)](Input[_0x21991c(0x314)]('left')),this[_0x21991c(0x341)]()?(Input[_0x21991c(0x314)]('pagedown')&&Input['isPressed'](_0x21991c(0x210))&&this['cursorPagedown'](),Input[_0x21991c(0x314)](_0x21991c(0x4e1))&&Input[_0x21991c(0x44b)](_0x21991c(0x210))&&this[_0x21991c(0x31a)]()):(Input['isTriggered'](_0x21991c(0x3d8))&&this['cursorPagedown'](),Input[_0x21991c(0x314)](_0x21991c(0x4e1))&&this[_0x21991c(0x31a)]()));Input['isRepeated'](_0x21991c(0x4a1))&&(Input[_0x21991c(0x44b)](_0x21991c(0x210))&&this[_0x21991c(0x2fb)]()?this[_0x21991c(0x43c)]():this['cursorDown'](Input[_0x21991c(0x314)](_0x21991c(0x4a1)))),Input[_0x21991c(0x208)]('up')&&(Input[_0x21991c(0x44b)](_0x21991c(0x210))&&this[_0x21991c(0x2fb)]()?this[_0x21991c(0x31a)]():this['cursorUp'](Input[_0x21991c(0x314)]('up'))),Imported[_0x21991c(0x4bc)]&&this[_0x21991c(0x292)](),this[_0x21991c(0x290)]()!==_0x473882&&this['playCursorSound']();}},Window_ItemList[_0x1ca854(0x495)]['limitedPageUpDownSceneCheck']=function(){const _0x3170ad=_0x1ca854,_0x15938e=SceneManager['_scene'],_0x432fda=[Scene_Item,Scene_Shop];return _0x432fda['includes'](_0x15938e[_0x3170ad(0x4be)]);},Window_ItemList[_0x1ca854(0x495)]['activate']=function(){const _0x441907=_0x1ca854;Window_Selectable[_0x441907(0x495)][_0x441907(0x3f1)][_0x441907(0x34d)](this),this[_0x441907(0x465)]&&this[_0x441907(0x465)][_0x441907(0x26c)]()&&this[_0x441907(0x465)][_0x441907(0x3f1)]();},Window_ItemList[_0x1ca854(0x495)]['deactivate']=function(){const _0x2b114a=_0x1ca854;Window_Selectable[_0x2b114a(0x495)][_0x2b114a(0x2df)][_0x2b114a(0x34d)](this),this[_0x2b114a(0x465)]&&this[_0x2b114a(0x465)][_0x2b114a(0x26c)]()&&this[_0x2b114a(0x465)][_0x2b114a(0x2df)]();},Window_ItemList['prototype'][_0x1ca854(0x3eb)]=function(_0x3cd560){const _0x192372=_0x1ca854;this[_0x192372(0x408)]!==_0x3cd560&&(this['_category']=_0x3cd560,this[_0x192372(0x3b5)](),this[_0x192372(0x465)]&&this[_0x192372(0x465)]['isUseModernControls']()?this[_0x192372(0x3b7)](0x0):this['scrollTo'](0x0,0x0));},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x3b6)]=Window_ItemList[_0x1ca854(0x495)][_0x1ca854(0x343)],Window_ItemList[_0x1ca854(0x495)][_0x1ca854(0x343)]=function(){const _0x482846=_0x1ca854;if(SceneManager['_scene'][_0x482846(0x4be)]===Scene_Battle)return VisuMZ['ItemsEquipsCore'][_0x482846(0x3b6)][_0x482846(0x34d)](this);else return SceneManager[_0x482846(0x3ca)][_0x482846(0x4be)]===Scene_Map?VisuMZ[_0x482846(0x4d3)]['Window_ItemList_maxCols'][_0x482846(0x34d)](this):VisuMZ[_0x482846(0x4d3)]['Settings'][_0x482846(0x331)][_0x482846(0x273)];},VisuMZ[_0x1ca854(0x4d3)]['Window_ItemList_colSpacing']=Window_ItemList['prototype'][_0x1ca854(0x3be)],Window_ItemList[_0x1ca854(0x495)][_0x1ca854(0x3be)]=function(){const _0x5dc6b8=_0x1ca854;return this[_0x5dc6b8(0x343)]()<=0x1?Window_Selectable['prototype'][_0x5dc6b8(0x3be)][_0x5dc6b8(0x34d)](this):VisuMZ[_0x5dc6b8(0x4d3)][_0x5dc6b8(0x431)][_0x5dc6b8(0x34d)](this);},Window_ItemList[_0x1ca854(0x495)]['includes']=function(_0x2899ec){const _0xcb9186=_0x1ca854;switch(this['_category']){case _0xcb9186(0x4ab):return DataManager[_0xcb9186(0x2e0)](_0x2899ec);case _0xcb9186(0x38c):return DataManager[_0xcb9186(0x2e0)](_0x2899ec)&&_0x2899ec[_0xcb9186(0x2ab)]===0x1;case _0xcb9186(0x4fe):return DataManager[_0xcb9186(0x2e0)](_0x2899ec)&&_0x2899ec[_0xcb9186(0x2ab)]===0x2;case _0xcb9186(0x3d4):return DataManager[_0xcb9186(0x2e0)](_0x2899ec)&&_0x2899ec['itypeId']===0x3;case _0xcb9186(0x1d6):return DataManager[_0xcb9186(0x2e0)](_0x2899ec)&&_0x2899ec[_0xcb9186(0x2ab)]===0x4;case _0xcb9186(0x1d7):return DataManager['isItem'](_0x2899ec)&&_0x2899ec['consumable'];case _0xcb9186(0x415):return DataManager[_0xcb9186(0x2e0)](_0x2899ec)&&!_0x2899ec['consumable'];case _0xcb9186(0x2f2):return DataManager[_0xcb9186(0x2e0)](_0x2899ec)&&[0x0]['includes'](_0x2899ec['occasion']);case _0xcb9186(0x4b7):return DataManager[_0xcb9186(0x2e0)](_0x2899ec)&&[0x0,0x1][_0xcb9186(0x26b)](_0x2899ec[_0xcb9186(0x4f1)]);case _0xcb9186(0x424):return DataManager[_0xcb9186(0x2e0)](_0x2899ec)&&[0x0,0x2][_0xcb9186(0x26b)](_0x2899ec[_0xcb9186(0x4f1)]);case _0xcb9186(0x2bb):return DataManager[_0xcb9186(0x2e0)](_0x2899ec)&&[0x3][_0xcb9186(0x26b)](_0x2899ec[_0xcb9186(0x4f1)]);case'AllWeapons':return DataManager[_0xcb9186(0x260)](_0x2899ec);case _0xcb9186(0x339):return DataManager[_0xcb9186(0x3cc)](_0x2899ec);default:if(this['_category']['match'](/WTYPE:(\d+)/i))return DataManager[_0xcb9186(0x260)](_0x2899ec)&&_0x2899ec[_0xcb9186(0x235)]===Number(RegExp['$1']);else{if(this[_0xcb9186(0x408)][_0xcb9186(0x4f8)](/WTYPE:(.*)/i)){const _0x2cfdde=$dataSystem[_0xcb9186(0x49c)][_0xcb9186(0x43a)](String(RegExp['$1'])[_0xcb9186(0x351)]());return DataManager[_0xcb9186(0x260)](_0x2899ec)&&_0x2899ec[_0xcb9186(0x235)]===_0x2cfdde;}else{if(this['_category'][_0xcb9186(0x4f8)](/ATYPE:(\d+)/i))return DataManager[_0xcb9186(0x3cc)](_0x2899ec)&&_0x2899ec['atypeId']===Number(RegExp['$1']);else{if(this['_category'][_0xcb9186(0x4f8)](/ATYPE:(.*)/i)){const _0x34fb4a=$dataSystem[_0xcb9186(0x4f0)][_0xcb9186(0x43a)](String(RegExp['$1'])['trim']());return DataManager['isArmor'](_0x2899ec)&&_0x2899ec[_0xcb9186(0x249)]===_0x34fb4a;}else{if(this['_category'][_0xcb9186(0x4f8)](/ETYPE:(\d+)/i))return!!_0x2899ec&&_0x2899ec['etypeId']===Number(RegExp['$1']);else{if(this[_0xcb9186(0x408)][_0xcb9186(0x4f8)](/ETYPE:(.*)/i)){const _0x3d217b=$dataSystem[_0xcb9186(0x3ad)]['indexOf'](String(RegExp['$1'])[_0xcb9186(0x351)]());return DataManager[_0xcb9186(0x3cc)](_0x2899ec)&&_0x2899ec['etypeId']===_0x3d217b;}else{if(this[_0xcb9186(0x408)][_0xcb9186(0x4f8)](/Category:(.*)/i))return!!_0x2899ec&&_0x2899ec[_0xcb9186(0x263)][_0xcb9186(0x26b)](String(RegExp['$1'])['toUpperCase']()[_0xcb9186(0x351)]());}}}}}}}return![];},Window_ItemList[_0x1ca854(0x495)][_0x1ca854(0x3f4)]=function(){return!![];},VisuMZ['ItemsEquipsCore'][_0x1ca854(0x2e2)]=Window_ItemList[_0x1ca854(0x495)]['drawItem'],Window_ItemList[_0x1ca854(0x495)][_0x1ca854(0x2cd)]=function(_0x3bb39e){const _0x2da707=_0x1ca854;VisuMZ['ItemsEquipsCore'][_0x2da707(0x2e2)]['call'](this,_0x3bb39e),this['placeItemNewLabel'](_0x3bb39e);},Window_ItemList[_0x1ca854(0x495)][_0x1ca854(0x33f)]=function(_0x31c88c,_0x3a102d,_0x5cce09,_0x39987c){const _0x40959b=_0x1ca854;Window_Selectable[_0x40959b(0x495)][_0x40959b(0x33f)]['call'](this,_0x31c88c,_0x3a102d,_0x5cce09,_0x39987c);},Window_ItemList[_0x1ca854(0x495)][_0x1ca854(0x469)]=function(_0xfb7901){const _0x4f1eb9=_0x1ca854,_0xf39bbb=this['itemAt'](_0xfb7901);if(!_0xf39bbb||!this[_0x4f1eb9(0x3f4)]())return;if(!$gameParty[_0x4f1eb9(0x4ae)](_0xf39bbb))return;const _0x5109f5=this[_0x4f1eb9(0x419)](_0xfb7901),_0x186d4d=_0x5109f5['x'],_0x20bae8=_0x5109f5['y']+(this[_0x4f1eb9(0x437)]()-ImageManager[_0x4f1eb9(0x21d)])/0x2,_0x385e65=VisuMZ[_0x4f1eb9(0x4d3)]['Settings'][_0x4f1eb9(0x368)]['OffsetX'],_0x494b33=VisuMZ['ItemsEquipsCore'][_0x4f1eb9(0x3a5)][_0x4f1eb9(0x368)]['OffsetY'];this[_0x4f1eb9(0x380)](_0xf39bbb,_0x186d4d+_0x385e65,_0x20bae8+_0x494b33);},Window_ItemList[_0x1ca854(0x495)][_0x1ca854(0x3e3)]=function(_0x3117dc){const _0x2eb7e9=_0x1ca854;this['_statusWindow']=_0x3117dc,this[_0x2eb7e9(0x301)]();},VisuMZ['ItemsEquipsCore'][_0x1ca854(0x37b)]=Window_ItemList[_0x1ca854(0x495)][_0x1ca854(0x453)],Window_ItemList[_0x1ca854(0x495)]['updateHelp']=function(){const _0x2a1c8e=_0x1ca854;VisuMZ['ItemsEquipsCore'][_0x2a1c8e(0x37b)][_0x2a1c8e(0x34d)](this),this[_0x2a1c8e(0x2de)]&&this['_statusWindow']['constructor']===Window_ShopStatus&&this[_0x2a1c8e(0x2de)][_0x2a1c8e(0x2bf)](this['item']());},Window_BattleItem[_0x1ca854(0x495)][_0x1ca854(0x247)]=function(_0x3636a1){const _0x286993=_0x1ca854;return BattleManager['actor']()?BattleManager[_0x286993(0x3b8)]()[_0x286993(0x32d)](_0x3636a1):Window_ItemList[_0x286993(0x495)][_0x286993(0x247)][_0x286993(0x34d)](this,_0x3636a1);},Window_EventItem[_0x1ca854(0x495)][_0x1ca854(0x3f4)]=function(){return![];},Window_EquipStatus['prototype'][_0x1ca854(0x300)]=function(){const _0x42806d=_0x1ca854;return VisuMZ[_0x42806d(0x4d3)]['Settings'][_0x42806d(0x323)][_0x42806d(0x414)];},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x3fe)]=Window_EquipStatus[_0x1ca854(0x495)]['refresh'],Window_EquipStatus[_0x1ca854(0x495)][_0x1ca854(0x3b5)]=function(){const _0x3562ff=_0x1ca854;this[_0x3562ff(0x3ce)](),this[_0x3562ff(0x460)]();if(this[_0x3562ff(0x3c3)])this['_actor']['refresh']();this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x3562ff(0x449)]():VisuMZ[_0x3562ff(0x4d3)][_0x3562ff(0x3fe)][_0x3562ff(0x34d)](this);},Window_EquipStatus[_0x1ca854(0x495)][_0x1ca854(0x449)]=function(){const _0x4e68d5=_0x1ca854;this[_0x4e68d5(0x20c)][_0x4e68d5(0x4e6)]();if(!this[_0x4e68d5(0x3c3)])return;if(this['isMainMenuCoreMenuImageOptionAvailable']()){const _0x4eadba=ImageManager[_0x4e68d5(0x28b)](this[_0x4e68d5(0x3c3)][_0x4e68d5(0x2d5)]());_0x4eadba[_0x4e68d5(0x29d)](this[_0x4e68d5(0x4cc)][_0x4e68d5(0x33c)](this));}else this['refreshItemsEquipsCoreNoMenuImage']();},Window_EquipStatus[_0x1ca854(0x495)][_0x1ca854(0x266)]=function(){const _0x523aec=_0x1ca854;return Imported[_0x523aec(0x239)]&&this[_0x523aec(0x3c3)][_0x523aec(0x2d5)]()!==''&&VisuMZ[_0x523aec(0x4d3)]['Settings']['EquipScene'][_0x523aec(0x2a4)];},Window_EquipStatus[_0x1ca854(0x495)][_0x1ca854(0x4cc)]=function(){const _0x943c84=_0x1ca854;VisuMZ[_0x943c84(0x4d3)][_0x943c84(0x3a5)]['EquipScene']['DrawPortraitJS']['call'](this),this[_0x943c84(0x398)]();},Window_EquipStatus[_0x1ca854(0x495)][_0x1ca854(0x3ff)]=function(){const _0x443353=_0x1ca854;VisuMZ['ItemsEquipsCore'][_0x443353(0x3a5)][_0x443353(0x323)][_0x443353(0x488)]['call'](this),this[_0x443353(0x398)]();},Window_EquipStatus[_0x1ca854(0x495)]['drawParamsItemsEquipsCore']=function(){const _0x45bb5b=_0x1ca854;this[_0x45bb5b(0x460)](),VisuMZ[_0x45bb5b(0x4d3)][_0x45bb5b(0x3a5)][_0x45bb5b(0x323)][_0x45bb5b(0x244)][_0x45bb5b(0x34d)](this);},Window_EquipStatus[_0x1ca854(0x495)][_0x1ca854(0x316)]=function(_0x5d32b4,_0x223569,_0x481b4a,_0x923325,_0x457d58){const _0x15b363=_0x1ca854,_0x3c9559=ImageManager['loadPicture'](_0x5d32b4[_0x15b363(0x2d5)]()),_0x372e2d=this[_0x15b363(0x4f5)]-_0x3c9559['width'];_0x223569+=_0x372e2d/0x2;if(_0x372e2d<0x0)_0x923325-=_0x372e2d;Window_StatusBase[_0x15b363(0x495)][_0x15b363(0x316)][_0x15b363(0x34d)](this,_0x5d32b4,_0x223569,_0x481b4a,_0x923325,_0x457d58);},Window_EquipStatus[_0x1ca854(0x495)][_0x1ca854(0x2b6)]=function(){const _0x307db0=_0x1ca854;return Imported['VisuMZ_0_CoreEngine']?VisuMZ['CoreEngine']['Settings'][_0x307db0(0x478)][_0x307db0(0x370)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_EquipStatus['prototype'][_0x1ca854(0x4b4)]=function(){const _0x142cb1=_0x1ca854;return VisuMZ[_0x142cb1(0x4d3)]['Settings'][_0x142cb1(0x323)]['ParamValueFontSize'];},Window_EquipStatus[_0x1ca854(0x495)]['isUseParamNamesWithIcons']=function(){const _0x8248bb=_0x1ca854;return Imported[_0x8248bb(0x4bc)]&&VisuMZ[_0x8248bb(0x298)][_0x8248bb(0x3a5)]['Param'][_0x8248bb(0x382)];},Window_EquipStatus['prototype'][_0x1ca854(0x335)]=function(_0x1487ce,_0x2997fa,_0x12bc3b,_0x24e201){const _0x330017=_0x1ca854,_0x5402d5=this['itemPadding']();Imported[_0x330017(0x4bc)]?this['drawParamText'](_0x2997fa+_0x5402d5,_0x12bc3b,_0x24e201,_0x1487ce,![]):this[_0x330017(0x42f)](TextManager[_0x330017(0x44d)](_0x1487ce),_0x2997fa+_0x5402d5,_0x12bc3b,_0x24e201);},Window_EquipStatus[_0x1ca854(0x495)][_0x1ca854(0x1d5)]=function(_0x24212a,_0x2f4ecc,_0x4f599e,_0x3f6746){const _0x1939be=_0x1ca854,_0x3e9858=this[_0x1939be(0x2d1)]();let _0x5ea701=0x0;Imported[_0x1939be(0x4bc)]?_0x5ea701=this[_0x1939be(0x3c3)][_0x1939be(0x4cf)](_0x24212a,!![]):_0x5ea701=this[_0x1939be(0x3c3)][_0x1939be(0x44d)](_0x24212a);const _0x27ed6e=_0x5ea701;this[_0x1939be(0x42f)](_0x5ea701,_0x2f4ecc,_0x4f599e,_0x3f6746-_0x3e9858,_0x1939be(0x35b));},Window_EquipStatus[_0x1ca854(0x495)]['drawUpdatedAfterParamValue']=function(_0x673d46,_0x343be4,_0x1258ce,_0x492998){const _0x5117d3=_0x1ca854,_0x2b556d=this['itemPadding']();let _0x514d51=0x0,_0x2b65b8=0x0,_0x4a840a='';if(this[_0x5117d3(0x36b)]){Imported[_0x5117d3(0x4bc)]?(_0x514d51=this['_actor'][_0x5117d3(0x4cf)](_0x673d46,![]),_0x2b65b8=this[_0x5117d3(0x36b)][_0x5117d3(0x4cf)](_0x673d46,![]),_0x4a840a=this[_0x5117d3(0x36b)][_0x5117d3(0x4cf)](_0x673d46,!![])):(_0x514d51=this['_actor'][_0x5117d3(0x44d)](_0x673d46),_0x2b65b8=this[_0x5117d3(0x36b)][_0x5117d3(0x44d)](_0x673d46),_0x4a840a=this[_0x5117d3(0x36b)]['param'](_0x673d46));const _0x322565=_0x514d51,_0x294e9c=_0x2b65b8;diffValue=_0x294e9c-_0x322565,this[_0x5117d3(0x20e)](ColorManager[_0x5117d3(0x340)](diffValue)),this[_0x5117d3(0x42f)](_0x4a840a,_0x343be4,_0x1258ce,_0x492998-_0x2b556d,'right');}},Window_EquipStatus[_0x1ca854(0x495)]['drawUpdatedParamValueDiff']=function(_0x3eded8,_0x535195,_0x59e6fc,_0x499db4){const _0x2ad48f=_0x1ca854,_0x3b1754=this[_0x2ad48f(0x2d1)]();let _0x1a008f=0x0,_0x29c513=0x0,_0x50a024=![];if(this[_0x2ad48f(0x36b)]){Imported[_0x2ad48f(0x4bc)]?(_0x1a008f=this[_0x2ad48f(0x3c3)][_0x2ad48f(0x4cf)](_0x3eded8,![]),_0x29c513=this['_tempActor']['paramValueByName'](_0x3eded8,![]),_0x50a024=String(this[_0x2ad48f(0x3c3)][_0x2ad48f(0x4cf)](_0x3eded8,!![]))[_0x2ad48f(0x4f8)](/([%％])/i)):(_0x1a008f=this[_0x2ad48f(0x3c3)][_0x2ad48f(0x44d)](_0x3eded8),_0x29c513=this[_0x2ad48f(0x36b)][_0x2ad48f(0x44d)](_0x3eded8),_0x50a024=_0x1a008f%0x1!==0x0||_0x29c513%0x1!==0x0);const _0x418dea=_0x1a008f,_0x324b24=_0x29c513,_0x3db35e=_0x324b24-_0x418dea;let _0x42bb13=_0x3db35e;if(_0x50a024)_0x42bb13=Math[_0x2ad48f(0x315)](_0x3db35e*0x64)+'%';_0x3db35e!==0x0&&(this[_0x2ad48f(0x20e)](ColorManager['paramchangeTextColor'](_0x3db35e)),_0x42bb13=(_0x3db35e>0x0?_0x2ad48f(0x232):'(%1)')[_0x2ad48f(0x464)](_0x42bb13),this[_0x2ad48f(0x42f)](_0x42bb13,_0x535195+_0x3b1754,_0x59e6fc,_0x499db4,_0x2ad48f(0x471)));}},Window_EquipStatus[_0x1ca854(0x495)][_0x1ca854(0x1ec)]=function(_0x3506e5,_0x5dc4e7,_0x2604ca,_0x3323c5,_0x3461ce){const _0x2bc12f=_0x1ca854;if(VisuMZ[_0x2bc12f(0x4d3)][_0x2bc12f(0x3a5)]['EquipScene'][_0x2bc12f(0x4a8)]===![])return;_0x3461ce=Math[_0x2bc12f(0x39f)](_0x3461ce||0x1,0x1);while(_0x3461ce--){_0x3323c5=_0x3323c5||this['lineHeight'](),this[_0x2bc12f(0x20c)]['paintOpacity']=0xa0;const _0x5ada29=ColorManager[_0x2bc12f(0x27f)]();this[_0x2bc12f(0x20c)][_0x2bc12f(0x338)](_0x3506e5+0x1,_0x5dc4e7+0x1,_0x2604ca-0x2,_0x3323c5-0x2,_0x5ada29),this[_0x2bc12f(0x20c)][_0x2bc12f(0x2af)]=0xff;}},ColorManager['getItemsEquipsCoreBackColor2']=function(){const _0x34cec1=_0x1ca854,_0x465f12=VisuMZ[_0x34cec1(0x4d3)][_0x34cec1(0x3a5)][_0x34cec1(0x323)];let _0x31b41e=_0x465f12['BackRectColor']!==undefined?_0x465f12[_0x34cec1(0x3d3)]:0x13;return ColorManager[_0x34cec1(0x4c2)](_0x31b41e);},VisuMZ[_0x1ca854(0x4d3)]['Window_EquipCommand_initialize']=Window_EquipCommand[_0x1ca854(0x495)][_0x1ca854(0x261)],Window_EquipCommand['prototype'][_0x1ca854(0x261)]=function(_0x149b08){const _0x4d8dbf=_0x1ca854;VisuMZ[_0x4d8dbf(0x4d3)]['Window_EquipCommand_initialize'][_0x4d8dbf(0x34d)](this,_0x149b08),this[_0x4d8dbf(0x4ff)](_0x149b08);},Window_EquipCommand[_0x1ca854(0x495)][_0x1ca854(0x4ff)]=function(_0x45d507){const _0x4e0e69=_0x1ca854,_0x4224eb=new Rectangle(0x0,0x0,_0x45d507[_0x4e0e69(0x3f7)],_0x45d507[_0x4e0e69(0x1f9)]);this[_0x4e0e69(0x36e)]=new Window_Base(_0x4224eb),this[_0x4e0e69(0x36e)][_0x4e0e69(0x2d2)]=0x0,this['addChild'](this[_0x4e0e69(0x36e)]),this[_0x4e0e69(0x32f)]();},Window_EquipCommand[_0x1ca854(0x495)][_0x1ca854(0x301)]=function(){const _0x2d2417=_0x1ca854;Window_HorzCommand[_0x2d2417(0x495)][_0x2d2417(0x301)]['call'](this);if(this[_0x2d2417(0x36e)])this[_0x2d2417(0x32f)]();},Window_EquipCommand[_0x1ca854(0x495)][_0x1ca854(0x32f)]=function(){const _0x16d83e=_0x1ca854,_0x466fd4=this['_commandNameWindow'];_0x466fd4[_0x16d83e(0x20c)][_0x16d83e(0x4e6)]();const _0x473f23=this[_0x16d83e(0x253)](this[_0x16d83e(0x290)]());if(_0x473f23===_0x16d83e(0x38f)){const _0x59ac48=this['itemLineRect'](this[_0x16d83e(0x290)]());let _0x2b5d26=this[_0x16d83e(0x401)](this['index']());_0x2b5d26=_0x2b5d26[_0x16d83e(0x377)](/\\I\[(\d+)\]/gi,''),_0x466fd4[_0x16d83e(0x460)](),this[_0x16d83e(0x262)](_0x2b5d26,_0x59ac48),this[_0x16d83e(0x49f)](_0x2b5d26,_0x59ac48),this[_0x16d83e(0x2fd)](_0x2b5d26,_0x59ac48);}},Window_EquipCommand['prototype'][_0x1ca854(0x262)]=function(_0x5bc531,_0x4c7abd){},Window_EquipCommand[_0x1ca854(0x495)][_0x1ca854(0x49f)]=function(_0x558668,_0x2e6705){const _0x4376f3=_0x1ca854,_0x313aea=this[_0x4376f3(0x36e)];_0x313aea[_0x4376f3(0x42f)](_0x558668,0x0,_0x2e6705['y'],_0x313aea['innerWidth'],'center');},Window_EquipCommand[_0x1ca854(0x495)][_0x1ca854(0x2fd)]=function(_0x217340,_0x54bd42){const _0x67591e=_0x1ca854,_0x34cbca=this['_commandNameWindow'],_0x5c7e16=$gameSystem[_0x67591e(0x451)](),_0x160bb9=_0x54bd42['x']+Math['floor'](_0x54bd42[_0x67591e(0x3f7)]/0x2)+_0x5c7e16;_0x34cbca['x']=_0x34cbca['width']/-0x2+_0x160bb9,_0x34cbca['y']=Math[_0x67591e(0x4e9)](_0x54bd42[_0x67591e(0x1f9)]/0x2);},Window_EquipCommand[_0x1ca854(0x495)][_0x1ca854(0x26c)]=function(){const _0x33ed13=_0x1ca854;return Imported['VisuMZ_0_CoreEngine']&&Window_HorzCommand['prototype'][_0x33ed13(0x26c)][_0x33ed13(0x34d)](this);},Window_EquipCommand[_0x1ca854(0x495)][_0x1ca854(0x1f4)]=function(){const _0x5bb236=_0x1ca854;if(this[_0x5bb236(0x486)]()===_0x5bb236(0x271))Window_HorzCommand[_0x5bb236(0x495)][_0x5bb236(0x1f4)][_0x5bb236(0x34d)](this);},Window_EquipCommand[_0x1ca854(0x495)][_0x1ca854(0x4e0)]=function(){const _0x214e08=_0x1ca854;!this[_0x214e08(0x1d8)]()&&Window_HorzCommand[_0x214e08(0x495)]['processCursorMoveModernControls'][_0x214e08(0x34d)](this);},Window_EquipCommand['prototype']['processCursorSpecialCheckModernControls']=function(){const _0x368b47=_0x1ca854;if(!this[_0x368b47(0x4c7)]())return![];if(SceneManager['_scene']['constructor']!==Scene_Equip)return![];return Input['isTriggered'](_0x368b47(0x4a1))&&(this[_0x368b47(0x1e2)](),SceneManager[_0x368b47(0x3ca)]['commandEquip'](),SceneManager[_0x368b47(0x3ca)][_0x368b47(0x272)][_0x368b47(0x3b7)](-0x1)),![];},Window_EquipCommand['prototype'][_0x1ca854(0x343)]=function(){const _0x5f3fe5=_0x1ca854;return this[_0x5f3fe5(0x470)]?this[_0x5f3fe5(0x470)]['length']:0x3;},Window_EquipCommand[_0x1ca854(0x495)]['processTouchModernControls']=function(){const _0x27524e=_0x1ca854;if(this['isOpen']()&&this['visible']&&SceneManager[_0x27524e(0x3ca)]['constructor']===Scene_Equip){if(this['isHoverEnabled']()&&TouchInput[_0x27524e(0x40f)]())this[_0x27524e(0x3ac)](![]);else TouchInput[_0x27524e(0x314)]()&&this['onTouchSelectModernControls'](!![]);if(TouchInput[_0x27524e(0x376)]())this[_0x27524e(0x4fa)]();else TouchInput[_0x27524e(0x26a)]()&&this[_0x27524e(0x25f)]();}},Window_EquipCommand[_0x1ca854(0x495)][_0x1ca854(0x3ac)]=function(_0x1bda19){const _0x2de428=_0x1ca854;this[_0x2de428(0x428)]=![];const _0x330c02=this['index'](),_0x82f30b=this['hitIndex'](),_0x355510=SceneManager[_0x2de428(0x3ca)][_0x2de428(0x272)];if(_0x355510[_0x2de428(0x329)]()&&_0x355510[_0x2de428(0x3a6)]){if(_0x82f30b>=0x0)_0x82f30b===this[_0x2de428(0x290)]()&&(this[_0x2de428(0x428)]=!![]),this[_0x2de428(0x3f1)](),this[_0x2de428(0x220)](_0x82f30b);else _0x355510[_0x2de428(0x37d)]()>=0x0&&(this[_0x2de428(0x2df)](),this[_0x2de428(0x4f6)]());}_0x1bda19&&this[_0x2de428(0x290)]()!==_0x330c02&&this[_0x2de428(0x1e2)]();},Window_EquipCommand[_0x1ca854(0x495)]['makeCommandList']=function(){const _0x4ee0db=_0x1ca854;this[_0x4ee0db(0x379)](),this[_0x4ee0db(0x2fe)](),this['addClearCommand']();},Window_EquipCommand['prototype'][_0x1ca854(0x3b5)]=function(){const _0x51f4d6=_0x1ca854;Window_HorzCommand[_0x51f4d6(0x495)][_0x51f4d6(0x3b5)]['call'](this),this[_0x51f4d6(0x3a9)]();},Window_EquipCommand[_0x1ca854(0x495)][_0x1ca854(0x379)]=function(){const _0x482d5b=_0x1ca854;if(!this[_0x482d5b(0x2db)]())return;const _0x114bcc=this[_0x482d5b(0x4ce)](),_0x2b4f3f=VisuMZ[_0x482d5b(0x4d3)]['Settings'][_0x482d5b(0x323)][_0x482d5b(0x374)],_0x294f28=_0x114bcc==='text'?TextManager[_0x482d5b(0x43b)]:'\x5cI[%1]%2'[_0x482d5b(0x464)](_0x2b4f3f,TextManager[_0x482d5b(0x43b)]),_0xdd2daf=this[_0x482d5b(0x1e7)]();this[_0x482d5b(0x240)](_0x294f28,_0x482d5b(0x271),_0xdd2daf);},Window_EquipCommand[_0x1ca854(0x495)][_0x1ca854(0x2db)]=function(){const _0x4d900b=_0x1ca854;return!this[_0x4d900b(0x26c)]();},Window_EquipCommand[_0x1ca854(0x495)]['isEquipCommandEnabled']=function(){return!![];},Window_EquipCommand['prototype'][_0x1ca854(0x2fe)]=function(){const _0x20edc7=_0x1ca854;if(!this[_0x20edc7(0x491)]())return;const _0x46ff39=this[_0x20edc7(0x4ce)](),_0x4aaae0=VisuMZ['ItemsEquipsCore'][_0x20edc7(0x3a5)][_0x20edc7(0x323)][_0x20edc7(0x27e)],_0x4d9548=_0x46ff39===_0x20edc7(0x1e1)?TextManager['optimize']:_0x20edc7(0x3c2)[_0x20edc7(0x464)](_0x4aaae0,TextManager['optimize']),_0x3b297d=this['isOptimizeCommandEnabled']();this[_0x20edc7(0x240)](_0x4d9548,_0x20edc7(0x391),_0x3b297d);},Window_EquipCommand[_0x1ca854(0x495)][_0x1ca854(0x491)]=function(){const _0x2e7ff4=_0x1ca854;return VisuMZ[_0x2e7ff4(0x4d3)][_0x2e7ff4(0x3a5)][_0x2e7ff4(0x323)][_0x2e7ff4(0x3fa)];},Window_EquipCommand['prototype'][_0x1ca854(0x393)]=function(){return!![];},Window_EquipCommand[_0x1ca854(0x495)][_0x1ca854(0x4df)]=function(){const _0x4f741a=_0x1ca854;if(!this[_0x4f741a(0x4a4)]())return;const _0x595d36=this['commandStyle'](),_0xe028de=VisuMZ[_0x4f741a(0x4d3)][_0x4f741a(0x3a5)][_0x4f741a(0x323)]['CmdIconClear'],_0x4e69f0=_0x595d36==='text'?TextManager[_0x4f741a(0x4e6)]:'\x5cI[%1]%2'[_0x4f741a(0x464)](_0xe028de,TextManager[_0x4f741a(0x4e6)]),_0x4a0b68=this['isClearCommandEnabled']();this['addCommand'](_0x4e69f0,_0x4f741a(0x4e6),_0x4a0b68);},Window_EquipCommand[_0x1ca854(0x495)][_0x1ca854(0x4a4)]=function(){const _0x7a5dee=_0x1ca854;return VisuMZ[_0x7a5dee(0x4d3)][_0x7a5dee(0x3a5)][_0x7a5dee(0x323)][_0x7a5dee(0x383)];},Window_EquipCommand[_0x1ca854(0x495)][_0x1ca854(0x2f9)]=function(){return!![];},Window_EquipCommand[_0x1ca854(0x495)][_0x1ca854(0x443)]=function(){const _0x1be996=_0x1ca854;return VisuMZ[_0x1be996(0x4d3)][_0x1be996(0x3a5)][_0x1be996(0x323)][_0x1be996(0x353)];},Window_EquipCommand[_0x1ca854(0x495)]['drawItem']=function(_0x4d70a0){const _0x3eb4e3=_0x1ca854,_0x5c4c2c=this[_0x3eb4e3(0x253)](_0x4d70a0);if(_0x5c4c2c===_0x3eb4e3(0x3f9))this['drawItemStyleIconText'](_0x4d70a0);else _0x5c4c2c===_0x3eb4e3(0x38f)?this['drawItemStyleIcon'](_0x4d70a0):Window_HorzCommand[_0x3eb4e3(0x495)][_0x3eb4e3(0x2cd)][_0x3eb4e3(0x34d)](this,_0x4d70a0);},Window_EquipCommand[_0x1ca854(0x495)][_0x1ca854(0x4ce)]=function(){const _0x4b3191=_0x1ca854;return VisuMZ[_0x4b3191(0x4d3)][_0x4b3191(0x3a5)]['EquipScene'][_0x4b3191(0x1ce)];},Window_EquipCommand[_0x1ca854(0x495)][_0x1ca854(0x253)]=function(_0x1da953){const _0x3ba64d=_0x1ca854;if(_0x1da953<0x0)return _0x3ba64d(0x1e1);const _0x435996=this[_0x3ba64d(0x4ce)]();if(_0x435996!==_0x3ba64d(0x4ed))return _0x435996;else{if(this[_0x3ba64d(0x499)]()>0x0){const _0x57b56c=this['commandName'](_0x1da953);if(_0x57b56c['match'](/\\I\[(\d+)\]/i)){const _0x208a7a=this['itemLineRect'](_0x1da953),_0x2ce684=this['textSizeEx'](_0x57b56c)[_0x3ba64d(0x3f7)];return _0x2ce684<=_0x208a7a['width']?_0x3ba64d(0x3f9):_0x3ba64d(0x38f);}}}return _0x3ba64d(0x1e1);},Window_EquipCommand[_0x1ca854(0x495)][_0x1ca854(0x3d7)]=function(_0x17411d){const _0x3282a5=_0x1ca854,_0x5b7478=this['itemLineRect'](_0x17411d),_0xb57783=this[_0x3282a5(0x401)](_0x17411d),_0x4bb6f8=this[_0x3282a5(0x1e0)](_0xb57783)['width'];this['changePaintOpacity'](this[_0x3282a5(0x4ad)](_0x17411d));const _0x7b945=this[_0x3282a5(0x443)]();if(_0x7b945===_0x3282a5(0x35b))this[_0x3282a5(0x375)](_0xb57783,_0x5b7478['x']+_0x5b7478[_0x3282a5(0x3f7)]-_0x4bb6f8,_0x5b7478['y'],_0x4bb6f8);else{if(_0x7b945===_0x3282a5(0x283)){const _0xe3412a=_0x5b7478['x']+Math[_0x3282a5(0x4e9)]((_0x5b7478[_0x3282a5(0x3f7)]-_0x4bb6f8)/0x2);this[_0x3282a5(0x375)](_0xb57783,_0xe3412a,_0x5b7478['y'],_0x4bb6f8);}else this[_0x3282a5(0x375)](_0xb57783,_0x5b7478['x'],_0x5b7478['y'],_0x4bb6f8);}},Window_EquipCommand['prototype'][_0x1ca854(0x1ee)]=function(_0x95335c){const _0x12681f=_0x1ca854;this[_0x12681f(0x401)](_0x95335c)[_0x12681f(0x4f8)](/\\I\[(\d+)\]/i);const _0xf814f7=Number(RegExp['$1'])||0x0,_0x3f9af3=this[_0x12681f(0x419)](_0x95335c),_0x2e6c2d=_0x3f9af3['x']+Math[_0x12681f(0x4e9)]((_0x3f9af3[_0x12681f(0x3f7)]-ImageManager['iconWidth'])/0x2),_0x22978a=_0x3f9af3['y']+(_0x3f9af3[_0x12681f(0x1f9)]-ImageManager['iconHeight'])/0x2;this['drawIcon'](_0xf814f7,_0x2e6c2d,_0x22978a);},Window_EquipSlot[_0x1ca854(0x495)][_0x1ca854(0x26c)]=function(){const _0x20356b=_0x1ca854;return Imported[_0x20356b(0x4bc)]&&Window_HorzCommand[_0x20356b(0x495)]['isUseModernControls'][_0x20356b(0x34d)](this);},Window_EquipSlot['prototype'][_0x1ca854(0x3f1)]=function(){const _0x2bf059=_0x1ca854;Window_StatusBase[_0x2bf059(0x495)]['activate'][_0x2bf059(0x34d)](this),this['callUpdateHelp']();},Window_EquipSlot['prototype'][_0x1ca854(0x2dc)]=function(){const _0x30bcef=_0x1ca854;Window_StatusBase['prototype'][_0x30bcef(0x2dc)][_0x30bcef(0x34d)](this),this[_0x30bcef(0x400)]();},Window_EquipSlot[_0x1ca854(0x495)][_0x1ca854(0x400)]=function(){const _0x49f51f=_0x1ca854;if(!this[_0x49f51f(0x4d7)]())return;if(Input[_0x49f51f(0x314)](_0x49f51f(0x210))&&this[_0x49f51f(0x265)]()){const _0x240770=SceneManager[_0x49f51f(0x3ca)]['_actor'];_0x240770&&(this[_0x49f51f(0x311)](this[_0x49f51f(0x290)]())?(this[_0x49f51f(0x284)](),this['updateHelp']()):this[_0x49f51f(0x47d)]());}},Window_EquipSlot[_0x1ca854(0x495)][_0x1ca854(0x311)]=function(_0x4437b3){const _0x1d90e4=_0x1ca854,_0x48e803=SceneManager[_0x1d90e4(0x3ca)][_0x1d90e4(0x3c3)];if(!_0x48e803)return;if(!_0x48e803['isEquipChangeOk'](this[_0x1d90e4(0x290)]()))return![];const _0x407fb0=_0x48e803[_0x1d90e4(0x455)]()[this['index']()];if(_0x48e803[_0x1d90e4(0x299)]()[_0x1d90e4(0x26b)](_0x407fb0))return![];return!![];;},Window_EquipSlot['prototype'][_0x1ca854(0x284)]=function(){const _0x37f96e=_0x1ca854;SoundManager['playEquip']();const _0x557973=SceneManager[_0x37f96e(0x3ca)][_0x37f96e(0x3c3)];_0x557973[_0x37f96e(0x327)](this[_0x37f96e(0x290)](),null),this[_0x37f96e(0x3b5)](),this[_0x37f96e(0x330)][_0x37f96e(0x3b5)](),this[_0x37f96e(0x301)]();const _0x1fbfe4=SceneManager[_0x37f96e(0x3ca)][_0x37f96e(0x2de)];if(_0x1fbfe4)_0x1fbfe4[_0x37f96e(0x3b5)]();},Window_EquipSlot[_0x1ca854(0x495)][_0x1ca854(0x4d7)]=function(){const _0x15f7ac=_0x1ca854;if(!this[_0x15f7ac(0x493)])return![];if(!VisuMZ[_0x15f7ac(0x4d3)][_0x15f7ac(0x3a5)][_0x15f7ac(0x323)]['ShiftShortcutKey'])return![];return!![];},Window_EquipSlot[_0x1ca854(0x495)][_0x1ca854(0x4e0)]=function(){const _0x350b4d=_0x1ca854;!this['processCursorSpecialCheckModernControls']()&&Window_StatusBase[_0x350b4d(0x495)][_0x350b4d(0x4e0)][_0x350b4d(0x34d)](this);},Window_EquipSlot[_0x1ca854(0x495)][_0x1ca854(0x1d8)]=function(){const _0x50cc70=_0x1ca854;if(!this['isCursorMovable']())return![];if(SceneManager[_0x50cc70(0x3ca)][_0x50cc70(0x4be)]!==Scene_Equip)return![];if(this[_0x50cc70(0x1d0)]())return this[_0x50cc70(0x1e2)](),Input[_0x50cc70(0x4e6)](),SceneManager[_0x50cc70(0x3ca)][_0x50cc70(0x350)](),![];else{if(Input[_0x50cc70(0x208)](_0x50cc70(0x4a1))){const _0x58520d=this[_0x50cc70(0x290)]();return Input[_0x50cc70(0x44b)]('shift')?this[_0x50cc70(0x43c)]():this['cursorDown'](Input[_0x50cc70(0x314)](_0x50cc70(0x4a1))),this['index']()!==_0x58520d&&this['playCursorSound'](),!![];}else{if(this['isShiftShortcutKeyForRemove']()&&Input['isTriggered'](_0x50cc70(0x210)))return!![];}}return![];},Window_EquipSlot[_0x1ca854(0x495)][_0x1ca854(0x1d0)]=function(){const _0x3225f7=_0x1ca854;if(this[_0x3225f7(0x290)]()!==0x0)return![];const _0x5c1469=VisuMZ[_0x3225f7(0x4d3)][_0x3225f7(0x3a5)][_0x3225f7(0x323)];if(!_0x5c1469[_0x3225f7(0x3fa)]&&!_0x5c1469[_0x3225f7(0x383)])return![];return Input[_0x3225f7(0x314)]('up');},Window_EquipSlot[_0x1ca854(0x495)][_0x1ca854(0x4ee)]=function(){const _0x425310=_0x1ca854;return VisuMZ[_0x425310(0x4d3)][_0x425310(0x3a5)]['EquipScene'][_0x425310(0x35c)];},Window_EquipSlot[_0x1ca854(0x495)][_0x1ca854(0x1fd)]=function(){const _0x49f8fa=_0x1ca854;if(this[_0x49f8fa(0x329)]()&&this['visible']&&SceneManager[_0x49f8fa(0x3ca)][_0x49f8fa(0x4be)]===Scene_Equip){if(this['isHoverEnabled']()&&TouchInput[_0x49f8fa(0x40f)]())this[_0x49f8fa(0x3ac)](![]);else TouchInput['isTriggered']()&&this['onTouchSelectModernControls'](!![]);if(TouchInput[_0x49f8fa(0x376)]())this[_0x49f8fa(0x4fa)]();else TouchInput[_0x49f8fa(0x26a)]()&&this[_0x49f8fa(0x25f)]();}},Window_EquipSlot[_0x1ca854(0x495)][_0x1ca854(0x3ac)]=function(_0x3f8844){const _0x2cf6b7=_0x1ca854;this[_0x2cf6b7(0x428)]=![];const _0x406c55=this[_0x2cf6b7(0x290)](),_0x391634=this['hitIndex'](),_0x299873=SceneManager[_0x2cf6b7(0x3ca)][_0x2cf6b7(0x457)];if(_0x299873['isOpen']()&&_0x299873[_0x2cf6b7(0x3a6)]){if(_0x391634>=0x0)_0x391634===this[_0x2cf6b7(0x290)]()&&(this[_0x2cf6b7(0x428)]=!![]),this[_0x2cf6b7(0x3f1)](),this[_0x2cf6b7(0x220)](_0x391634);else _0x299873['hitIndex']()>=0x0&&(this[_0x2cf6b7(0x2df)](),this['deselect']());}_0x3f8844&&this[_0x2cf6b7(0x290)]()!==_0x406c55&&this['playCursorSound']();},Window_EquipSlot[_0x1ca854(0x495)][_0x1ca854(0x2f5)]=function(){const _0x186d74=_0x1ca854;return this[_0x186d74(0x290)]();},VisuMZ[_0x1ca854(0x4d3)]['Window_EquipItem_includes']=Window_EquipItem[_0x1ca854(0x495)][_0x1ca854(0x26b)],Window_EquipItem[_0x1ca854(0x495)][_0x1ca854(0x26b)]=function(_0x2c05fa){const _0x1318af=_0x1ca854;return _0x2c05fa===null&&this[_0x1318af(0x299)]()['includes'](this[_0x1318af(0x4d0)]())?this[_0x1318af(0x47a)][_0x1318af(0x49e)]>0x0?![]:!![]:VisuMZ[_0x1318af(0x4d3)][_0x1318af(0x3d9)][_0x1318af(0x34d)](this,_0x2c05fa);},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x2ce)]=Window_EquipItem[_0x1ca854(0x495)][_0x1ca854(0x247)],Window_EquipItem[_0x1ca854(0x495)][_0x1ca854(0x247)]=function(_0x5f4afd){const _0x20680b=_0x1ca854;if(_0x5f4afd&&this[_0x20680b(0x3c3)]){if(this['nonRemovableEtypes']()[_0x20680b(0x26b)](this[_0x20680b(0x4d0)]()))return![];if(this[_0x20680b(0x238)](_0x5f4afd))return![];if(this[_0x20680b(0x4ef)](_0x5f4afd))return![];if(this[_0x20680b(0x461)](_0x5f4afd))return![];}return VisuMZ['ItemsEquipsCore'][_0x20680b(0x2ce)][_0x20680b(0x34d)](this,_0x5f4afd);},Window_EquipItem[_0x1ca854(0x495)][_0x1ca854(0x238)]=function(_0x104107){const _0x244c09=_0x1ca854,_0x5d8b6e=_0x104107[_0x244c09(0x46e)];if(_0x5d8b6e[_0x244c09(0x4f8)](/<EQUIP COPY LIMIT:[ ](\d+)>/i)){const _0x496cad=Number(RegExp['$1'])||0x1;let _0x5280fe=0x0;const _0x350de3=this[_0x244c09(0x3c3)][_0x244c09(0x4d6)](),_0x41a806=SceneManager['_scene'][_0x244c09(0x272)][_0x244c09(0x2f5)]();_0x350de3[_0x41a806]=null;for(const _0xd002d4 of _0x350de3){if(!_0xd002d4)continue;if(DataManager[_0x244c09(0x260)](_0x104107)===DataManager['isWeapon'](_0xd002d4)){if(_0x104107['id']===_0xd002d4['id'])_0x5280fe+=0x1;}}return _0x5280fe>=_0x496cad;}else return![];},Window_EquipItem[_0x1ca854(0x495)][_0x1ca854(0x4ef)]=function(_0x35825e){const _0x4cff95=_0x1ca854;if(!DataManager[_0x4cff95(0x260)](_0x35825e))return![];const _0x2ba0a6=/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i;let _0x332d59=0x0;const _0x4d9255=this[_0x4cff95(0x3c3)][_0x4cff95(0x4d6)](),_0xe57f84=SceneManager[_0x4cff95(0x3ca)][_0x4cff95(0x272)]['equipSlotIndex']();_0x4d9255[_0xe57f84]=null;for(const _0x408ea6 of _0x4d9255){if(!_0x408ea6)continue;if(!DataManager[_0x4cff95(0x260)](_0x408ea6))continue;if(_0x35825e[_0x4cff95(0x235)]===_0x408ea6[_0x4cff95(0x235)]){_0x332d59+=0x1;if(_0x35825e[_0x4cff95(0x46e)][_0x4cff95(0x4f8)](_0x2ba0a6)){const _0x2b26d9=Number(RegExp['$1'])||0x1;if(_0x332d59>=_0x2b26d9)return!![];}if(_0x408ea6[_0x4cff95(0x46e)][_0x4cff95(0x4f8)](_0x2ba0a6)){const _0x2c9333=Number(RegExp['$1'])||0x1;if(_0x332d59>=_0x2c9333)return!![];}}}return![];},Window_EquipItem[_0x1ca854(0x495)]['isSoleArmorType']=function(_0x33d98c){const _0x583e65=_0x1ca854;if(!DataManager['isArmor'](_0x33d98c))return![];const _0x7ae296=/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i;let _0x4b81b3=0x0;const _0x13fe91=this[_0x583e65(0x3c3)][_0x583e65(0x4d6)](),_0x36f7f6=SceneManager[_0x583e65(0x3ca)][_0x583e65(0x272)][_0x583e65(0x2f5)]();_0x13fe91[_0x36f7f6]=null;for(const _0xc0c1fa of _0x13fe91){if(!_0xc0c1fa)continue;if(!DataManager[_0x583e65(0x3cc)](_0xc0c1fa))continue;if(_0x33d98c[_0x583e65(0x249)]===_0xc0c1fa[_0x583e65(0x249)]){_0x4b81b3+=0x1;if(_0x33d98c['note'][_0x583e65(0x4f8)](_0x7ae296)){const _0x1421dc=Number(RegExp['$1'])||0x1;if(_0x4b81b3>=_0x1421dc)return!![];}if(_0xc0c1fa[_0x583e65(0x46e)][_0x583e65(0x4f8)](_0x7ae296)){const _0x3416cd=Number(RegExp['$1'])||0x1;if(_0x4b81b3>=_0x3416cd)return!![];}}}return![];},Window_EquipItem['prototype'][_0x1ca854(0x299)]=function(){const _0x25ee5d=_0x1ca854;return VisuMZ['ItemsEquipsCore']['Settings'][_0x25ee5d(0x323)]['NonRemoveETypes'];},Window_EquipItem[_0x1ca854(0x495)]['drawItem']=function(_0xc8c56b){const _0x257a50=_0x1ca854,_0x1cc37d=this[_0x257a50(0x200)](_0xc8c56b);_0x1cc37d?Window_ItemList[_0x257a50(0x495)][_0x257a50(0x2cd)][_0x257a50(0x34d)](this,_0xc8c56b):this['drawRemoveItem'](_0xc8c56b);},Window_EquipItem[_0x1ca854(0x495)][_0x1ca854(0x211)]=function(_0x4f68cd){const _0x444834=_0x1ca854;this['changePaintOpacity'](this[_0x444834(0x247)](null));const _0x2a1401=VisuMZ['ItemsEquipsCore'][_0x444834(0x3a5)][_0x444834(0x323)],_0x2899d3=this[_0x444834(0x419)](_0x4f68cd),_0x418f43=_0x2899d3['y']+(this[_0x444834(0x437)]()-ImageManager[_0x444834(0x21d)])/0x2,_0x2e61c6=ImageManager[_0x444834(0x236)]+0x4,_0x9c51bf=Math[_0x444834(0x39f)](0x0,_0x2899d3[_0x444834(0x3f7)]-_0x2e61c6);this['resetTextColor'](),this['drawIcon'](_0x2a1401[_0x444834(0x1ea)],_0x2899d3['x'],_0x418f43),this[_0x444834(0x42f)](_0x2a1401[_0x444834(0x3f3)],_0x2899d3['x']+_0x2e61c6,_0x2899d3['y'],_0x9c51bf),this[_0x444834(0x23a)](!![]);},Window_EquipItem['prototype']['updateHelp']=function(){const _0x30c73a=_0x1ca854;Window_ItemList[_0x30c73a(0x495)][_0x30c73a(0x453)][_0x30c73a(0x34d)](this);if(this[_0x30c73a(0x3c3)]&&this[_0x30c73a(0x2de)]&&this[_0x30c73a(0x421)]>=0x0){const _0x2d0bb9=JsonEx[_0x30c73a(0x4db)](this[_0x30c73a(0x3c3)]);_0x2d0bb9['_tempActor']=!![],_0x2d0bb9[_0x30c73a(0x396)](this[_0x30c73a(0x421)],this['item']()),this['_statusWindow'][_0x30c73a(0x390)](_0x2d0bb9);}},VisuMZ['ItemsEquipsCore'][_0x1ca854(0x440)]=Window_ShopCommand[_0x1ca854(0x495)][_0x1ca854(0x261)],Window_ShopCommand[_0x1ca854(0x495)][_0x1ca854(0x261)]=function(_0x404747){const _0x57c3e7=_0x1ca854;VisuMZ[_0x57c3e7(0x4d3)][_0x57c3e7(0x440)]['call'](this,_0x404747),this[_0x57c3e7(0x4ff)](_0x404747);},Window_ShopCommand[_0x1ca854(0x495)][_0x1ca854(0x4ff)]=function(_0x417c5d){const _0x1c38ff=_0x1ca854,_0x26f845=new Rectangle(0x0,0x0,_0x417c5d[_0x1c38ff(0x3f7)],_0x417c5d[_0x1c38ff(0x1f9)]);this[_0x1c38ff(0x36e)]=new Window_Base(_0x26f845),this[_0x1c38ff(0x36e)][_0x1c38ff(0x2d2)]=0x0,this[_0x1c38ff(0x425)](this['_commandNameWindow']),this[_0x1c38ff(0x32f)]();},Window_ShopCommand[_0x1ca854(0x495)][_0x1ca854(0x301)]=function(){const _0x434499=_0x1ca854;Window_HorzCommand[_0x434499(0x495)]['callUpdateHelp']['call'](this);if(this[_0x434499(0x36e)])this[_0x434499(0x32f)]();},Window_ShopCommand[_0x1ca854(0x495)][_0x1ca854(0x32f)]=function(){const _0x57fdcc=_0x1ca854,_0x295f97=this['_commandNameWindow'];_0x295f97[_0x57fdcc(0x20c)]['clear']();const _0x333644=this[_0x57fdcc(0x253)](this[_0x57fdcc(0x290)]());if(_0x333644===_0x57fdcc(0x38f)){const _0x36bbbd=this[_0x57fdcc(0x419)](this[_0x57fdcc(0x290)]());let _0x474c14=this[_0x57fdcc(0x401)](this[_0x57fdcc(0x290)]());_0x474c14=_0x474c14['replace'](/\\I\[(\d+)\]/gi,''),_0x295f97[_0x57fdcc(0x460)](),this[_0x57fdcc(0x262)](_0x474c14,_0x36bbbd),this['commandNameWindowDrawText'](_0x474c14,_0x36bbbd),this['commandNameWindowCenter'](_0x474c14,_0x36bbbd);}},Window_ShopCommand[_0x1ca854(0x495)][_0x1ca854(0x262)]=function(_0x28e9d0,_0x53d5a3){},Window_ShopCommand['prototype']['commandNameWindowDrawText']=function(_0x24b90d,_0x5f5a28){const _0x337cc8=_0x1ca854,_0x3c5a01=this[_0x337cc8(0x36e)];_0x3c5a01['drawText'](_0x24b90d,0x0,_0x5f5a28['y'],_0x3c5a01[_0x337cc8(0x4f5)],_0x337cc8(0x283));},Window_ShopCommand[_0x1ca854(0x495)]['commandNameWindowCenter']=function(_0x4c2987,_0x3fbaa5){const _0x48f2c0=_0x1ca854,_0x5efae6=this[_0x48f2c0(0x36e)],_0x110346=$gameSystem[_0x48f2c0(0x451)](),_0x24e94b=_0x3fbaa5['x']+Math[_0x48f2c0(0x4e9)](_0x3fbaa5[_0x48f2c0(0x3f7)]/0x2)+_0x110346;_0x5efae6['x']=_0x5efae6[_0x48f2c0(0x3f7)]/-0x2+_0x24e94b,_0x5efae6['y']=Math[_0x48f2c0(0x4e9)](_0x3fbaa5['height']/0x2);},Window_ShopCommand[_0x1ca854(0x495)][_0x1ca854(0x343)]=function(){const _0x223a77=_0x1ca854;return this[_0x223a77(0x470)]?this[_0x223a77(0x470)][_0x223a77(0x49e)]:0x3;},Window_ShopCommand['prototype'][_0x1ca854(0x34b)]=function(){const _0x973e40=_0x1ca854;return VisuMZ['ItemsEquipsCore']['Settings']['ShopScene'][_0x973e40(0x201)];},Window_ShopCommand['prototype'][_0x1ca854(0x502)]=function(){const _0x4cbba6=_0x1ca854;this[_0x4cbba6(0x275)](),this[_0x4cbba6(0x3b9)](),this[_0x4cbba6(0x366)]();},Window_ShopCommand['prototype'][_0x1ca854(0x3b5)]=function(){const _0x208633=_0x1ca854;Window_HorzCommand['prototype'][_0x208633(0x3b5)][_0x208633(0x34d)](this),this['refreshCursor']();},Window_ShopCommand[_0x1ca854(0x495)][_0x1ca854(0x275)]=function(){const _0x55b970=_0x1ca854,_0x5e2e5c=this[_0x55b970(0x4ce)](),_0x134a80=VisuMZ[_0x55b970(0x4d3)][_0x55b970(0x3a5)][_0x55b970(0x2a2)][_0x55b970(0x20d)],_0x9b39be=_0x5e2e5c==='text'?TextManager[_0x55b970(0x204)]:_0x55b970(0x3c2)[_0x55b970(0x464)](_0x134a80,TextManager['buy']),_0x1758d6=this[_0x55b970(0x4a2)]();if(this[_0x55b970(0x34b)]()&&!_0x1758d6)return;this[_0x55b970(0x240)](_0x9b39be,_0x55b970(0x204),_0x1758d6);},Window_ShopCommand[_0x1ca854(0x495)]['isBuyCommandEnabled']=function(){const _0x469ed6=_0x1ca854;return SceneManager[_0x469ed6(0x3ca)]['constructor']===Scene_Shop?SceneManager[_0x469ed6(0x3ca)][_0x469ed6(0x212)]>0x0:!![];},Window_ShopCommand[_0x1ca854(0x495)][_0x1ca854(0x3b9)]=function(){const _0x27ad4e=_0x1ca854,_0x23467d=this[_0x27ad4e(0x4ce)](),_0x4e44e3=VisuMZ[_0x27ad4e(0x4d3)][_0x27ad4e(0x3a5)][_0x27ad4e(0x2a2)][_0x27ad4e(0x430)],_0x4f72fa=_0x23467d===_0x27ad4e(0x1e1)?TextManager[_0x27ad4e(0x332)]:_0x27ad4e(0x3c2)['format'](_0x4e44e3,TextManager[_0x27ad4e(0x332)]),_0x9f948f=this[_0x27ad4e(0x394)]();if(this[_0x27ad4e(0x34b)]()&&!_0x9f948f)return;this['addCommand'](_0x4f72fa,_0x27ad4e(0x332),_0x9f948f);},Window_ShopCommand[_0x1ca854(0x495)][_0x1ca854(0x394)]=function(){return!this['_purchaseOnly'];},Window_ShopCommand['prototype'][_0x1ca854(0x366)]=function(){const _0x32d768=_0x1ca854,_0x1ffb14=this[_0x32d768(0x4ce)](),_0x5e4bda=VisuMZ[_0x32d768(0x4d3)][_0x32d768(0x3a5)][_0x32d768(0x2a2)]['CmdIconCancel'],_0x3a2edc=VisuMZ[_0x32d768(0x4d3)][_0x32d768(0x3a5)]['ShopScene']['CmdCancelRename'],_0x4b054f=_0x1ffb14==='text'?_0x3a2edc:_0x32d768(0x3c2)['format'](_0x5e4bda,_0x3a2edc);this[_0x32d768(0x240)](_0x4b054f,_0x32d768(0x2eb));},Window_ShopCommand['prototype'][_0x1ca854(0x443)]=function(){const _0x5a8c53=_0x1ca854;return VisuMZ[_0x5a8c53(0x4d3)][_0x5a8c53(0x3a5)]['ShopScene']['CmdTextAlign'];},Window_ShopCommand['prototype']['drawItem']=function(_0x576e5e){const _0x4dfbad=_0x1ca854,_0xbb1ae6=this[_0x4dfbad(0x253)](_0x576e5e);if(_0xbb1ae6==='iconText')this['drawItemStyleIconText'](_0x576e5e);else _0xbb1ae6==='icon'?this[_0x4dfbad(0x1ee)](_0x576e5e):Window_HorzCommand[_0x4dfbad(0x495)]['drawItem']['call'](this,_0x576e5e);},Window_ShopCommand[_0x1ca854(0x495)][_0x1ca854(0x4ce)]=function(){const _0x35cde6=_0x1ca854;return VisuMZ[_0x35cde6(0x4d3)][_0x35cde6(0x3a5)][_0x35cde6(0x2a2)]['CmdStyle'];},Window_ShopCommand[_0x1ca854(0x495)][_0x1ca854(0x253)]=function(_0xb29895){const _0x2f4138=_0x1ca854;if(_0xb29895<0x0)return _0x2f4138(0x1e1);const _0x3abebe=this[_0x2f4138(0x4ce)]();if(_0x3abebe!=='auto')return _0x3abebe;else{if(this['maxItems']()>0x0){const _0xd2f9e5=this[_0x2f4138(0x401)](_0xb29895);if(_0xd2f9e5[_0x2f4138(0x4f8)](/\\I\[(\d+)\]/i)){const _0x3b54f8=this[_0x2f4138(0x419)](_0xb29895),_0x3fb06f=this[_0x2f4138(0x1e0)](_0xd2f9e5)['width'];return _0x3fb06f<=_0x3b54f8['width']?_0x2f4138(0x3f9):_0x2f4138(0x38f);}}}return _0x2f4138(0x1e1);},Window_ShopCommand[_0x1ca854(0x495)][_0x1ca854(0x3d7)]=function(_0x2ff36a){const _0x17a4e9=_0x1ca854,_0x2117b0=this['itemLineRect'](_0x2ff36a),_0x475181=this[_0x17a4e9(0x401)](_0x2ff36a),_0x47fcda=this[_0x17a4e9(0x1e0)](_0x475181)[_0x17a4e9(0x3f7)];this[_0x17a4e9(0x23a)](this[_0x17a4e9(0x4ad)](_0x2ff36a));const _0x3b6b91=this[_0x17a4e9(0x443)]();if(_0x3b6b91==='right')this[_0x17a4e9(0x375)](_0x475181,_0x2117b0['x']+_0x2117b0[_0x17a4e9(0x3f7)]-_0x47fcda,_0x2117b0['y'],_0x47fcda);else{if(_0x3b6b91===_0x17a4e9(0x283)){const _0x1f240b=_0x2117b0['x']+Math[_0x17a4e9(0x4e9)]((_0x2117b0[_0x17a4e9(0x3f7)]-_0x47fcda)/0x2);this['drawTextEx'](_0x475181,_0x1f240b,_0x2117b0['y'],_0x47fcda);}else this['drawTextEx'](_0x475181,_0x2117b0['x'],_0x2117b0['y'],_0x47fcda);}},Window_ShopCommand[_0x1ca854(0x495)][_0x1ca854(0x1ee)]=function(_0xcc1d4){const _0xd8e8c0=_0x1ca854;this['commandName'](_0xcc1d4)['match'](/\\I\[(\d+)\]/i);const _0x264035=Number(RegExp['$1'])||0x0,_0x465cae=this['itemLineRect'](_0xcc1d4),_0x31dda8=_0x465cae['x']+Math['floor']((_0x465cae[_0xd8e8c0(0x3f7)]-ImageManager[_0xd8e8c0(0x236)])/0x2),_0x2ae563=_0x465cae['y']+(_0x465cae[_0xd8e8c0(0x1f9)]-ImageManager['iconHeight'])/0x2;this[_0xd8e8c0(0x4f3)](_0x264035,_0x31dda8,_0x2ae563);},VisuMZ['ItemsEquipsCore']['Window_ShopBuy_refresh']=Window_ShopBuy['prototype']['refresh'],Window_ShopBuy[_0x1ca854(0x495)][_0x1ca854(0x3b5)]=function(){const _0x44e491=_0x1ca854;this[_0x44e491(0x36a)](),VisuMZ['ItemsEquipsCore']['Window_ShopBuy_refresh'][_0x44e491(0x34d)](this);},Window_ShopBuy[_0x1ca854(0x495)][_0x1ca854(0x36a)]=function(){const _0x54ba79=_0x1ca854;SceneManager['_scene'][_0x54ba79(0x4be)]===Scene_Shop&&(this[_0x54ba79(0x237)]=SceneManager[_0x54ba79(0x3ca)]['money']());},VisuMZ[_0x1ca854(0x4d3)]['Window_ShopBuy_price']=Window_ShopBuy[_0x1ca854(0x495)]['price'],Window_ShopBuy[_0x1ca854(0x495)][_0x1ca854(0x3fc)]=function(_0x370789){const _0x5c3d3d=_0x1ca854;if(!_0x370789)return 0x0;const _0x27469d=VisuMZ[_0x5c3d3d(0x4d3)]['Window_ShopBuy_price'][_0x5c3d3d(0x34d)](this,_0x370789);return this[_0x5c3d3d(0x4bd)](_0x370789,_0x27469d);},Window_ShopBuy['prototype']['modifiedBuyPriceItemsEquipsCore']=function(_0x578f22,_0x5cb304){const _0x4ef6d0=_0x1ca854,_0x4379ae=_0x578f22[_0x4ef6d0(0x46e)];if(_0x4379ae[_0x4ef6d0(0x4f8)](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x4611ed=String(RegExp['$1']);try{eval(_0x4611ed);}catch(_0x54a1f3){if($gameTemp[_0x4ef6d0(0x3e8)]())console[_0x4ef6d0(0x474)](_0x54a1f3);}}_0x5cb304=VisuMZ['ItemsEquipsCore'][_0x4ef6d0(0x3a5)][_0x4ef6d0(0x2a2)][_0x4ef6d0(0x30f)]['call'](this,_0x578f22,_0x5cb304);if(isNaN(_0x5cb304))_0x5cb304=0x0;return Math[_0x4ef6d0(0x4e9)](_0x5cb304);},Window_ShopBuy[_0x1ca854(0x495)]['drawItem']=function(_0x347013){const _0x2d9417=_0x1ca854;this['resetFontSettings']();const _0x7d69a2=this[_0x2d9417(0x200)](_0x347013),_0x1529af=this[_0x2d9417(0x419)](_0x347013),_0x526453=_0x1529af['width'];this[_0x2d9417(0x23a)](this['isEnabled'](_0x7d69a2)),this[_0x2d9417(0x4e3)](_0x7d69a2,_0x1529af['x'],_0x1529af['y'],_0x526453),this[_0x2d9417(0x267)](_0x7d69a2,_0x1529af),this[_0x2d9417(0x23a)](!![]);},Window_ShopBuy[_0x1ca854(0x495)][_0x1ca854(0x267)]=function(_0x2926c2,_0xab5db7){const _0x1d50a7=_0x1ca854,_0x44a1be=this[_0x1d50a7(0x3fc)](_0x2926c2);this[_0x1d50a7(0x27d)](_0x44a1be,TextManager[_0x1d50a7(0x4da)],_0xab5db7['x'],_0xab5db7['y'],_0xab5db7['width']);},Window_ShopSell[_0x1ca854(0x495)][_0x1ca854(0x343)]=function(){const _0x5ac874=_0x1ca854;return SceneManager[_0x5ac874(0x3ca)][_0x5ac874(0x300)]()?0x1:0x2;},VisuMZ[_0x1ca854(0x4d3)][_0x1ca854(0x3a2)]=Window_ShopSell['prototype'][_0x1ca854(0x247)],Window_ShopSell['prototype'][_0x1ca854(0x247)]=function(_0x19a0d5){const _0x3cf301=_0x1ca854;if(!_0x19a0d5)return![];const _0x251dad=_0x19a0d5['note'];if(_0x251dad[_0x3cf301(0x4f8)](/<CANNOT SELL>/i))return![];if(_0x251dad[_0x3cf301(0x4f8)](/<CAN SELL>/i))return!![];if(_0x251dad[_0x3cf301(0x4f8)](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2af902=JSON[_0x3cf301(0x25a)]('['+RegExp['$1'][_0x3cf301(0x4f8)](/\d+/g)+']');for(const _0x31c891 of _0x2af902){if(!$gameSwitches[_0x3cf301(0x44c)](_0x31c891))return![];}}if(_0x251dad[_0x3cf301(0x4f8)](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x20c868=JSON[_0x3cf301(0x25a)]('['+RegExp['$1'][_0x3cf301(0x4f8)](/\d+/g)+']');for(const _0x557407 of _0x20c868){if(!$gameSwitches[_0x3cf301(0x44c)](_0x557407))return![];}}if(_0x251dad[_0x3cf301(0x4f8)](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5e0b49=JSON['parse']('['+RegExp['$1'][_0x3cf301(0x4f8)](/\d+/g)+']');for(const _0x438045 of _0x5e0b49){if($gameSwitches[_0x3cf301(0x44c)](_0x438045))return![];}}return VisuMZ[_0x3cf301(0x4d3)][_0x3cf301(0x3a2)][_0x3cf301(0x34d)](this,_0x19a0d5);},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x1f6)]=function(){return![];},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x477)]=function(){const _0x2ee65a=_0x1ca854;Window_StatusBase[_0x2ee65a(0x495)][_0x2ee65a(0x477)][_0x2ee65a(0x34d)](this);for(const _0x3f660d of $gameParty[_0x2ee65a(0x498)]()){ImageManager[_0x2ee65a(0x2b4)](_0x3f660d[_0x2ee65a(0x3a3)]());}},Window_ShopStatus['prototype'][_0x1ca854(0x28f)]=function(){const _0x5362c4=_0x1ca854;return VisuMZ[_0x5362c4(0x4d3)][_0x5362c4(0x3a5)][_0x5362c4(0x27b)][_0x5362c4(0x4c1)];},Window_ShopStatus['prototype'][_0x1ca854(0x3b5)]=function(){const _0x9a543d=_0x1ca854;this['contents'][_0x9a543d(0x4e6)](),this[_0x9a543d(0x489)][_0x9a543d(0x4e6)](),this['_item']&&(this[_0x9a543d(0x460)](),this[_0x9a543d(0x23a)](!![]),this['prepareItemCustomData'](),this[_0x9a543d(0x40c)]()?this['drawEquipData']():this['drawItemData']());},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x227)]=function(_0x55c8b5,_0xe40c4e){const _0x28e91f=_0x1ca854;if(!this['isEquipItem']()&&!DataManager[_0x28e91f(0x2e0)](this[_0x28e91f(0x4ca)]))return;const _0x192228=this[_0x28e91f(0x4f5)]-this[_0x28e91f(0x2d1)]()-_0x55c8b5,_0x1e3f77=this[_0x28e91f(0x434)](_0x28e91f(0x41d));this[_0x28e91f(0x20e)](ColorManager[_0x28e91f(0x2f4)]()),this['drawText'](TextManager[_0x28e91f(0x435)],_0x55c8b5+this[_0x28e91f(0x2d1)](),_0xe40c4e,_0x192228-_0x1e3f77),this[_0x28e91f(0x45f)](),this[_0x28e91f(0x33f)](this[_0x28e91f(0x4ca)],_0x55c8b5,_0xe40c4e,_0x192228);},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x1ec)]=function(_0x267382,_0x3373e9,_0x15a49a,_0x2257d3,_0x43cfdc){const _0x58606b=_0x1ca854;if(VisuMZ[_0x58606b(0x4d3)][_0x58606b(0x3a5)][_0x58606b(0x27b)][_0x58606b(0x4a8)]===![])return;_0x43cfdc=Math[_0x58606b(0x39f)](_0x43cfdc||0x1,0x1);while(_0x43cfdc--){_0x2257d3=_0x2257d3||this['lineHeight'](),this['contentsBack']['paintOpacity']=0xa0;const _0x337850=ColorManager[_0x58606b(0x2ef)]();this[_0x58606b(0x489)][_0x58606b(0x338)](_0x267382+0x1,_0x3373e9+0x1,_0x15a49a-0x2,_0x2257d3-0x2,_0x337850),this[_0x58606b(0x489)]['paintOpacity']=0xff;}},ColorManager[_0x1ca854(0x2ef)]=function(){const _0x326715=_0x1ca854,_0x4c3313=VisuMZ['ItemsEquipsCore'][_0x326715(0x3a5)][_0x326715(0x27b)];let _0x2b95dd=_0x4c3313['BackRectColor']!==undefined?_0x4c3313[_0x326715(0x3d3)]:0x13;return ColorManager[_0x326715(0x4c2)](_0x2b95dd);},Window_ShopStatus['prototype']['drawEquipData']=function(){const _0x381f24=_0x1ca854;VisuMZ[_0x381f24(0x4d3)][_0x381f24(0x3a5)][_0x381f24(0x27b)][_0x381f24(0x4fd)]['call'](this);},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x4c4)]=function(_0x31092a,_0x588f02,_0x2951a6){const _0x135159=_0x1ca854;if(!this[_0x135159(0x40c)]())return![];const _0x3226ae=$dataSystem['equipTypes'][this[_0x135159(0x4ca)][_0x135159(0x4d0)]];return this[_0x135159(0x506)](_0x3226ae,_0x31092a,_0x588f02,_0x2951a6,!![]),this[_0x135159(0x1ec)](_0x31092a,_0x588f02,_0x2951a6),this[_0x135159(0x460)](),!![];},Window_ShopStatus['prototype'][_0x1ca854(0x3aa)]=function(){const _0x116297=_0x1ca854,_0x3a9575=VisuMZ[_0x116297(0x4d3)][_0x116297(0x3a5)][_0x116297(0x331)][_0x116297(0x2b2)];return _0x3a9575[_0x116297(0x464)]($gameParty[_0x116297(0x2bd)](this['_item']));},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x2b6)]=function(){const _0x5ce0f8=_0x1ca854;return Imported[_0x5ce0f8(0x4bc)]?VisuMZ[_0x5ce0f8(0x298)][_0x5ce0f8(0x3a5)][_0x5ce0f8(0x478)][_0x5ce0f8(0x370)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_ShopStatus['prototype']['smallParamFontSize']=function(){const _0x333568=_0x1ca854;return VisuMZ[_0x333568(0x4d3)]['Settings'][_0x333568(0x27b)]['ParamChangeFontSize'];},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x3da)]=function(_0x5a5987,_0xda89fe,_0x158bcd,_0x557663){const _0x5da4a7=_0x1ca854;this['resetFontSettings'](),this['contents'][_0x5da4a7(0x35f)]=this['smallParamFontSize']();let _0x4e00da=this[_0x5da4a7(0x434)](TextManager[_0x5da4a7(0x44d)](_0x5a5987))+0x4+_0xda89fe;return Imported['VisuMZ_0_CoreEngine']?(this[_0x5da4a7(0x1e9)](_0xda89fe,_0x158bcd,_0x557663,_0x5a5987,!![]),VisuMZ[_0x5da4a7(0x298)][_0x5da4a7(0x3a5)][_0x5da4a7(0x478)][_0x5da4a7(0x382)]&&(_0x4e00da+=ImageManager[_0x5da4a7(0x236)]+0x4)):(this[_0x5da4a7(0x20e)](ColorManager['systemColor']()),this['drawText'](TextManager[_0x5da4a7(0x44d)](_0x5a5987),_0xda89fe,_0x158bcd,_0x557663)),this['resetFontSettings'](),_0x4e00da;},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x317)]=function(_0x20f6bf,_0x5c7cac,_0x34ca7c,_0x1e6f94,_0x396758){const _0x49ad6f=_0x1ca854;_0x34ca7c+=this[_0x49ad6f(0x2d1)](),_0x396758-=this[_0x49ad6f(0x2d1)]()*0x2;const _0x4ee087=VisuMZ[_0x49ad6f(0x4d3)][_0x49ad6f(0x3a5)][_0x49ad6f(0x27b)];this[_0x49ad6f(0x20c)][_0x49ad6f(0x35f)]=_0x4ee087[_0x49ad6f(0x378)],this['changePaintOpacity'](_0x20f6bf[_0x49ad6f(0x381)](this['_item']));if(_0x20f6bf[_0x49ad6f(0x1da)](this['_item'])){const _0x5b119d=_0x4ee087['AlreadyEquipMarker'];this['drawText'](_0x5b119d,_0x34ca7c,_0x1e6f94,_0x396758,_0x49ad6f(0x283));}else{if(_0x20f6bf['canEquip'](this[_0x49ad6f(0x4ca)])){const _0xdb218b=this[_0x49ad6f(0x441)](_0x20f6bf,this[_0x49ad6f(0x4ca)][_0x49ad6f(0x4d0)]),_0x2f9321=JsonEx[_0x49ad6f(0x4db)](_0x20f6bf);_0x2f9321['_tempActor']=!![];const _0xdb00bf=_0x2f9321[_0x49ad6f(0x455)]()['indexOf'](this[_0x49ad6f(0x4ca)][_0x49ad6f(0x4d0)]);if(_0xdb00bf>=0x0)_0x2f9321[_0x49ad6f(0x396)](_0xdb00bf,this[_0x49ad6f(0x4ca)]);let _0x304a5b=0x0,_0x42448b=0x0,_0x3213df=0x0;Imported[_0x49ad6f(0x4bc)]?(_0x304a5b=_0x2f9321[_0x49ad6f(0x4cf)](_0x5c7cac),_0x42448b=_0x304a5b-_0x20f6bf[_0x49ad6f(0x4cf)](_0x5c7cac),this['changeTextColor'](ColorManager[_0x49ad6f(0x340)](_0x42448b)),_0x3213df=(_0x42448b>=0x0?'+':'')+VisuMZ[_0x49ad6f(0x41e)](_0x42448b,0x0,_0x5c7cac)):(_0x304a5b=_0x2f9321['param'](_0x5c7cac),_0x42448b=_0x304a5b-_0x20f6bf[_0x49ad6f(0x44d)](_0x5c7cac),this[_0x49ad6f(0x20e)](ColorManager['paramchangeTextColor'](_0x42448b)),_0x3213df=(_0x42448b>=0x0?'+':'')+_0x42448b);if(_0x3213df==='+0')_0x3213df=_0x4ee087[_0x49ad6f(0x364)];this[_0x49ad6f(0x42f)](_0x3213df,_0x34ca7c,_0x1e6f94,_0x396758,'center');}else{const _0x744067=_0x4ee087[_0x49ad6f(0x1ef)];this['drawText'](_0x744067,_0x34ca7c,_0x1e6f94,_0x396758,_0x49ad6f(0x283));}}this[_0x49ad6f(0x460)](),this[_0x49ad6f(0x23a)](!![]);},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x2ad)]=function(){const _0x3a081b=_0x1ca854;VisuMZ[_0x3a081b(0x4d3)][_0x3a081b(0x3a5)]['StatusWindow']['DrawItemData'][_0x3a081b(0x34d)](this);},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x4b2)]=function(){const _0x574773=_0x1ca854;this[_0x574773(0x3df)]={};if(!this['_item'])return;const _0x2c94f3=this[_0x574773(0x4ca)][_0x574773(0x46e)];if(_0x2c94f3['match'](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x52b352=String(RegExp['$1'])[_0x574773(0x349)](/[\r\n]+/);for(const _0x235016 of _0x52b352){if(_0x235016[_0x574773(0x4f8)](/(.*):[ ](.*)/i)){const _0x3358a1=String(RegExp['$1'])['toUpperCase']()[_0x574773(0x351)](),_0x3da475=String(RegExp['$2'])[_0x574773(0x351)]();this[_0x574773(0x3df)][_0x3358a1]=_0x3da475;}}}},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x4b3)]=function(){const _0x8672a3=_0x1ca854;return Math[_0x8672a3(0x39f)](0x1,$gameSystem[_0x8672a3(0x2e8)]()-0x4);},Window_ShopStatus['prototype']['resetFontSettings']=function(){const _0x16d90c=_0x1ca854;Window_StatusBase['prototype']['resetFontSettings'][_0x16d90c(0x34d)](this),this[_0x16d90c(0x20c)]['fontSize']=this[_0x16d90c(0x43f)]||this[_0x16d90c(0x20c)][_0x16d90c(0x35f)],this[_0x16d90c(0x20c)][_0x16d90c(0x3dc)]=this[_0x16d90c(0x4ec)]||this['contents']['textColor'];},Window_ShopStatus['prototype'][_0x1ca854(0x310)]=function(){const _0x554b7c=_0x1ca854;return this[_0x554b7c(0x20c)][_0x554b7c(0x35f)]/$gameSystem['mainFontSize']();},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x4f3)]=function(_0x4fe938,_0x493220,_0xd7bc30){const _0x21ff71=_0x1ca854,_0x17275d=ImageManager[_0x21ff71(0x2b3)](_0x21ff71(0x406)),_0x4f3c51=ImageManager[_0x21ff71(0x236)],_0x1768c9=ImageManager[_0x21ff71(0x21d)],_0x2cae36=_0x4fe938%0x10*_0x4f3c51,_0x5a793e=Math[_0x21ff71(0x4e9)](_0x4fe938/0x10)*_0x1768c9,_0x45c467=Math[_0x21ff71(0x31e)](_0x4f3c51*this[_0x21ff71(0x310)]()),_0x2ffdfe=Math[_0x21ff71(0x31e)](_0x1768c9*this[_0x21ff71(0x310)]());this[_0x21ff71(0x20c)]['blt'](_0x17275d,_0x2cae36,_0x5a793e,_0x4f3c51,_0x1768c9,_0x493220,_0xd7bc30,_0x45c467,_0x2ffdfe);},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x3e5)]=function(_0x5b311f,_0x1f2ad4){const _0xc26aad=_0x1ca854;_0x1f2ad4[_0xc26aad(0x1f0)]&&this[_0xc26aad(0x4f3)](_0x5b311f,_0x1f2ad4['x'],_0x1f2ad4['y']+0x2);_0x1f2ad4['x']+=Math[_0xc26aad(0x31e)](ImageManager[_0xc26aad(0x236)]*this[_0xc26aad(0x310)]());if(this[_0xc26aad(0x310)]()===0x1)_0x1f2ad4['x']+=0x4;},Window_ShopStatus[_0x1ca854(0x495)]['drawItemKeyData']=function(_0x43c704,_0x3bebe9,_0x24a4c1,_0x5976ef,_0x2fc93d,_0x3afcf3){const _0x54d172=_0x1ca854;_0x43c704=_0x43c704||'',_0x3afcf3=_0x3afcf3||_0x54d172(0x471),this[_0x54d172(0x43f)]=this[_0x54d172(0x4b3)](),this[_0x54d172(0x4ec)]=_0x2fc93d?ColorManager['systemColor']():this[_0x54d172(0x20c)]['textColor'],_0x3bebe9+=this[_0x54d172(0x2d1)](),_0x5976ef-=this[_0x54d172(0x2d1)]()*0x2;const _0x5665fe=this[_0x54d172(0x1e0)](_0x43c704);if(_0x3afcf3==='center')_0x3bebe9=_0x3bebe9+Math[_0x54d172(0x4e9)]((_0x5976ef-_0x5665fe[_0x54d172(0x3f7)])/0x2);else _0x3afcf3==='right'&&(_0x3bebe9=_0x3bebe9+_0x5976ef-_0x5665fe[_0x54d172(0x3f7)]);_0x24a4c1+=(this[_0x54d172(0x437)]()-_0x5665fe['height'])/0x2,this[_0x54d172(0x375)](_0x43c704,_0x3bebe9,_0x24a4c1,_0x5976ef),this['_resetFontSize']=undefined,this[_0x54d172(0x4ec)]=undefined,this[_0x54d172(0x460)]();},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x281)]=function(_0x32b569,_0x4e561e,_0x594501){const _0x341e51=_0x1ca854;if(!DataManager[_0x341e51(0x2e0)](this['_item']))return![];const _0x33aeee=this[_0x341e51(0x348)]();this['drawItemKeyData'](_0x33aeee,_0x32b569,_0x4e561e,_0x594501,!![]);const _0x2d20cc=this[_0x341e51(0x34f)]();return this[_0x341e51(0x506)](_0x2d20cc,_0x32b569,_0x4e561e,_0x594501,![],_0x341e51(0x35b)),this[_0x341e51(0x1ec)](_0x32b569,_0x4e561e,_0x594501),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x1ca854(0x348)]=function(){const _0x46dcf5=_0x1ca854;return VisuMZ['ItemsEquipsCore']['Settings'][_0x46dcf5(0x27b)][_0x46dcf5(0x3e1)];},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x34f)]=function(){const _0x325696=_0x1ca854,_0x122603='CONSUMABLE';if(this[_0x325696(0x3df)][_0x122603])return this['_customItemInfo'][_0x122603];return this['canConsumeItem']()?VisuMZ[_0x325696(0x4d3)][_0x325696(0x3a5)][_0x325696(0x27b)]['Consumable']:VisuMZ[_0x325696(0x4d3)][_0x325696(0x3a5)][_0x325696(0x27b)]['NotConsumable'];},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x4ea)]=function(){const _0x49af29=_0x1ca854;return VisuMZ[_0x49af29(0x298)]&&VisuMZ[_0x49af29(0x298)]['Settings'][_0x49af29(0x4c6)][_0x49af29(0x45d)]&&DataManager[_0x49af29(0x26d)](this['_item'])?![]:this['_item']['consumable'];},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x2c1)]=function(_0x4a3589,_0x4434b6,_0x117898){const _0x10a343=_0x1ca854;if(!this[_0x10a343(0x40c)]()&&!DataManager[_0x10a343(0x2e0)](this[_0x10a343(0x4ca)]))return![];if(DataManager[_0x10a343(0x26d)](this['_item'])&&!$dataSystem[_0x10a343(0x34c)]){const _0x448cd8=TextManager['keyItem'];this[_0x10a343(0x506)](_0x448cd8,_0x4a3589,_0x4434b6,_0x117898,!![],_0x10a343(0x283));}else{const _0x2dc645=TextManager[_0x10a343(0x435)];this[_0x10a343(0x506)](_0x2dc645,_0x4a3589,_0x4434b6,_0x117898,!![]);const _0x52c745=this[_0x10a343(0x3aa)]();this[_0x10a343(0x506)](_0x52c745,_0x4a3589,_0x4434b6,_0x117898,![],_0x10a343(0x35b));}return this[_0x10a343(0x1ec)](_0x4a3589,_0x4434b6,_0x117898),this[_0x10a343(0x460)](),!![];},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x3aa)]=function(){const _0x2f7af1=_0x1ca854,_0x1b576b='QUANTITY';if(this[_0x2f7af1(0x3df)][_0x1b576b])return this[_0x2f7af1(0x3df)][_0x1b576b];const _0x43b8f2=VisuMZ[_0x2f7af1(0x4d3)]['Settings'][_0x2f7af1(0x331)]['ItemQuantityFmt'];return _0x43b8f2[_0x2f7af1(0x464)]($gameParty[_0x2f7af1(0x2bd)](this[_0x2f7af1(0x4ca)]));},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x4f2)]=function(_0x133f96,_0x385310,_0x433802){const _0x1046df=_0x1ca854,_0x2df2f7=this[_0x1046df(0x215)]();return this['drawItemKeyData'](_0x2df2f7,_0x133f96,_0x385310,_0x433802,![],_0x1046df(0x283)),this['drawItemDarkRect'](_0x133f96,_0x385310,_0x433802),this[_0x1046df(0x460)](),!![];},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x215)]=function(){const _0x101316=_0x1ca854,_0x34e245=_0x101316(0x24c);if(this[_0x101316(0x3df)][_0x34e245])return this['_customItemInfo'][_0x34e245];const _0x552e82=VisuMZ[_0x101316(0x4d3)]['Settings'][_0x101316(0x27b)],_0x14fd07=_0x101316(0x31f)[_0x101316(0x464)](this[_0x101316(0x4ca)]['occasion']);return _0x552e82[_0x14fd07];},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x3de)]=function(_0x4f33ae,_0x5469c3,_0xff9876){const _0x4eca6c=_0x1ca854,_0x39bb4c=this[_0x4eca6c(0x1f3)]();return this['drawItemKeyData'](_0x39bb4c,_0x4f33ae,_0x5469c3,_0xff9876,![],_0x4eca6c(0x283)),this[_0x4eca6c(0x1ec)](_0x4f33ae,_0x5469c3,_0xff9876),this[_0x4eca6c(0x460)](),!![];},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x1f3)]=function(){const _0x24304e=_0x1ca854,_0x3a192e='SCOPE';if(this[_0x24304e(0x3df)][_0x3a192e])return this[_0x24304e(0x3df)][_0x3a192e];const _0x2a51b2=VisuMZ[_0x24304e(0x4d3)][_0x24304e(0x3a5)][_0x24304e(0x27b)];if(Imported[_0x24304e(0x28a)]){const _0x46275a=this[_0x24304e(0x4ca)]['note'];if(_0x46275a[_0x24304e(0x4f8)](/<TARGET:[ ](.*)>/i)){const _0x2d8e03=String(RegExp['$1']);if(_0x2d8e03[_0x24304e(0x4f8)](/(\d+) RANDOM ANY/i))return _0x2a51b2[_0x24304e(0x1f5)]['format'](Number(RegExp['$1']));else{if(_0x2d8e03[_0x24304e(0x4f8)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i))return _0x2a51b2[_0x24304e(0x31d)][_0x24304e(0x464)](Number(RegExp['$1']));else{if(_0x2d8e03[_0x24304e(0x4f8)](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i))return _0x2a51b2['ScopeRandomAllies'][_0x24304e(0x464)](Number(RegExp['$1']));else{if(_0x2d8e03[_0x24304e(0x4f8)](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x2a51b2['ScopeAlliesButUser'];}}}}}const _0x131d7c=_0x24304e(0x309)[_0x24304e(0x464)](this[_0x24304e(0x4ca)]['scope']);return _0x2a51b2[_0x131d7c];},Window_ShopStatus['prototype'][_0x1ca854(0x28d)]=function(_0x493e32,_0x5e8aa4,_0x17cb65){const _0x206390=_0x1ca854,_0x372add=this[_0x206390(0x2f8)]();this[_0x206390(0x506)](_0x372add,_0x493e32,_0x5e8aa4,_0x17cb65,!![]);const _0x4bf86c=this[_0x206390(0x41a)]();return this[_0x206390(0x506)](_0x4bf86c,_0x493e32,_0x5e8aa4,_0x17cb65,![],'right'),this['drawItemDarkRect'](_0x493e32,_0x5e8aa4,_0x17cb65),this[_0x206390(0x460)](),!![];},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x2f8)]=function(){const _0x595387=_0x1ca854;return VisuMZ[_0x595387(0x4d3)][_0x595387(0x3a5)]['StatusWindow'][_0x595387(0x4b1)];},Window_ShopStatus['prototype']['getItemSpeedText']=function(){const _0x236e6d=_0x1ca854,_0x16e15f=_0x236e6d(0x47e);if(this['_customItemInfo'][_0x16e15f])return this[_0x236e6d(0x3df)][_0x16e15f];const _0x4d5fed=this['_item']['speed'];if(_0x4d5fed>=0x7d0)return VisuMZ['ItemsEquipsCore'][_0x236e6d(0x3a5)]['StatusWindow']['Speed2000'];else{if(_0x4d5fed>=0x3e8)return VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow']['Speed1000'];else{if(_0x4d5fed>0x0)return VisuMZ[_0x236e6d(0x4d3)][_0x236e6d(0x3a5)][_0x236e6d(0x27b)][_0x236e6d(0x36d)];else{if(_0x4d5fed===0x0)return VisuMZ['ItemsEquipsCore'][_0x236e6d(0x3a5)][_0x236e6d(0x27b)][_0x236e6d(0x2fa)];else{if(_0x4d5fed>-0x3e8)return VisuMZ[_0x236e6d(0x4d3)]['Settings']['StatusWindow']['SpeedNeg999'];else{if(_0x4d5fed>-0x7d0)return VisuMZ[_0x236e6d(0x4d3)][_0x236e6d(0x3a5)][_0x236e6d(0x27b)][_0x236e6d(0x264)];else return _0x4d5fed<=-0x7d0?VisuMZ['ItemsEquipsCore'][_0x236e6d(0x3a5)][_0x236e6d(0x27b)]['SpeedNeg2000']:_0x236e6d(0x501);}}}}}},Window_ShopStatus[_0x1ca854(0x495)]['drawItemSuccessRate']=function(_0x493e7d,_0x1adb85,_0x43650d){const _0x278ece=_0x1ca854,_0x4c6bc8=this[_0x278ece(0x2aa)]();this[_0x278ece(0x506)](_0x4c6bc8,_0x493e7d,_0x1adb85,_0x43650d,!![]);const _0x2637c2=this['getItemSuccessRateText']();return this['drawItemKeyData'](_0x2637c2,_0x493e7d,_0x1adb85,_0x43650d,![],_0x278ece(0x35b)),this[_0x278ece(0x1ec)](_0x493e7d,_0x1adb85,_0x43650d),this[_0x278ece(0x460)](),!![];},Window_ShopStatus['prototype'][_0x1ca854(0x2aa)]=function(){const _0x20abee=_0x1ca854;return VisuMZ[_0x20abee(0x4d3)][_0x20abee(0x3a5)][_0x20abee(0x27b)][_0x20abee(0x508)];},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x40e)]=function(){const _0x18f55a=_0x1ca854,_0x19563e=_0x18f55a(0x32c);if(this[_0x18f55a(0x3df)][_0x19563e])return this[_0x18f55a(0x3df)][_0x19563e];if(Imported[_0x18f55a(0x28a)]){const _0x32e05b=this[_0x18f55a(0x4ca)]['note'];if(_0x32e05b[_0x18f55a(0x4f8)](/<ALWAYS HIT>/i))return _0x18f55a(0x4d9);else{if(_0x32e05b[_0x18f55a(0x4f8)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return'%1%'['format'](Number(RegExp['$1']));}}return _0x18f55a(0x1f1)['format'](this['_item']['successRate']);},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x22d)]=function(_0x3c539c,_0x40d496,_0x3c585a){const _0x2abc8b=_0x1ca854,_0xd246d3=this[_0x2abc8b(0x490)]();this['drawItemKeyData'](_0xd246d3,_0x3c539c,_0x40d496,_0x3c585a,!![]);const _0x30f49f=this[_0x2abc8b(0x4c3)]();return this[_0x2abc8b(0x506)](_0x30f49f,_0x3c539c,_0x40d496,_0x3c585a,![],'right'),this[_0x2abc8b(0x1ec)](_0x3c539c,_0x40d496,_0x3c585a),this[_0x2abc8b(0x460)](),!![];},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x490)]=function(){const _0xffa722=_0x1ca854;return VisuMZ[_0xffa722(0x4d3)]['Settings']['StatusWindow'][_0xffa722(0x3ea)];},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x4c3)]=function(){const _0xadf850=_0x1ca854,_0x58fd76='REPEAT';if(this['_customItemInfo'][_0x58fd76])return this['_customItemInfo'][_0x58fd76];const _0x2b28cd='×%1';return _0x2b28cd[_0xadf850(0x464)](this[_0xadf850(0x4ca)][_0xadf850(0x2d8)]);},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x480)]=function(_0x3281d6,_0x3530d7,_0x5d9779){const _0x3c25fd=_0x1ca854,_0x4a3e3b=this[_0x3c25fd(0x2c8)]();this[_0x3c25fd(0x506)](_0x4a3e3b,_0x3281d6,_0x3530d7,_0x5d9779,!![]);const _0x3686e1=this[_0x3c25fd(0x463)]();return this['drawItemKeyData'](_0x3686e1,_0x3281d6,_0x3530d7,_0x5d9779,![],_0x3c25fd(0x35b)),this[_0x3c25fd(0x1ec)](_0x3281d6,_0x3530d7,_0x5d9779),this[_0x3c25fd(0x460)](),!![];},Window_ShopStatus['prototype'][_0x1ca854(0x2c8)]=function(){const _0x405396=_0x1ca854;return VisuMZ[_0x405396(0x4d3)][_0x405396(0x3a5)][_0x405396(0x27b)]['LabelHitType'];},Window_ShopStatus['prototype']['getItemHitTypeText']=function(){const _0x14b50f=_0x1ca854,_0x47fde4='HIT\x20TYPE';if(this[_0x14b50f(0x3df)][_0x47fde4])return this[_0x14b50f(0x3df)][_0x47fde4];const _0x3c58df=VisuMZ[_0x14b50f(0x4d3)]['Settings'][_0x14b50f(0x27b)],_0x56b974=_0x14b50f(0x2c6)[_0x14b50f(0x464)](this['_item'][_0x14b50f(0x3cb)]);return _0x3c58df[_0x56b974];},Window_ShopStatus['prototype'][_0x1ca854(0x1e8)]=function(_0x382226,_0x528b43,_0x10c6fe){const _0x40cadc=_0x1ca854;if(this['_item']['damage'][_0x40cadc(0x342)]<=0x0)return _0x528b43;if(this[_0x40cadc(0x2b5)](_0x382226,_0x528b43,_0x10c6fe))_0x528b43+=this['lineHeight']();if(this['drawItemDamageAmount'](_0x382226,_0x528b43,_0x10c6fe))_0x528b43+=this[_0x40cadc(0x437)]();return this[_0x40cadc(0x460)](),_0x528b43;},Window_ShopStatus['prototype'][_0x1ca854(0x2b5)]=function(_0x226a15,_0x5890b9,_0x58271d){const _0x3b3382=_0x1ca854,_0x178807=this[_0x3b3382(0x230)]();this[_0x3b3382(0x506)](_0x178807,_0x226a15,_0x5890b9,_0x58271d,!![]);const _0x33c80e=this[_0x3b3382(0x3c0)]();return this[_0x3b3382(0x506)](_0x33c80e,_0x226a15,_0x5890b9,_0x58271d,![],_0x3b3382(0x35b)),this[_0x3b3382(0x1ec)](_0x226a15,_0x5890b9,_0x58271d),this[_0x3b3382(0x460)](),!![];},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x230)]=function(){const _0x53fcc2=_0x1ca854;return VisuMZ[_0x53fcc2(0x4d3)]['Settings'][_0x53fcc2(0x27b)][_0x53fcc2(0x320)];},Window_ShopStatus[_0x1ca854(0x495)]['getItemDamageElementText']=function(){const _0x53cf1e=_0x1ca854,_0x47de7e='ELEMENT';if(this['_customItemInfo'][_0x47de7e])return this[_0x53cf1e(0x3df)][_0x47de7e];if(this[_0x53cf1e(0x4ca)][_0x53cf1e(0x43d)]['elementId']<=-0x1)return VisuMZ[_0x53cf1e(0x4d3)][_0x53cf1e(0x3a5)][_0x53cf1e(0x27b)][_0x53cf1e(0x36c)];else return this['_item']['damage'][_0x53cf1e(0x45a)]===0x0?VisuMZ['ItemsEquipsCore'][_0x53cf1e(0x3a5)]['StatusWindow'][_0x53cf1e(0x322)]:$dataSystem[_0x53cf1e(0x3b2)][this['_item']['damage'][_0x53cf1e(0x45a)]];},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x202)]=function(_0x14094d,_0x4c8c4a,_0x1c7c16){const _0x2c00d2=_0x1ca854,_0x23bf4f=this[_0x2c00d2(0x32a)]();this[_0x2c00d2(0x506)](_0x23bf4f,_0x14094d,_0x4c8c4a,_0x1c7c16,!![]),this[_0x2c00d2(0x417)]();const _0x23b0d2=this[_0x2c00d2(0x303)](),_0xc6872d=ColorManager[_0x2c00d2(0x3c7)]([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0x2c00d2(0x4ca)]['damage'][_0x2c00d2(0x342)]]);return this[_0x2c00d2(0x20e)](_0xc6872d),this['drawItemKeyData'](_0x23b0d2,_0x14094d,_0x4c8c4a,_0x1c7c16,![],'right'),this['drawItemDarkRect'](_0x14094d,_0x4c8c4a,_0x1c7c16),this[_0x2c00d2(0x460)](),!![];},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x32a)]=function(){const _0x1a470=_0x1ca854;return Imported[_0x1a470(0x28a)]&&DataManager[_0x1a470(0x3ed)](this['_item'])!==_0x1a470(0x359)?this['getItemDamageAmountLabelBattleCore']():this[_0x1a470(0x3f6)]();},Window_ShopStatus[_0x1ca854(0x495)]['getItemDamageAmountLabelOriginal']=function(){const _0x262695=_0x1ca854,_0x21a34a=VisuMZ[_0x262695(0x4d3)][_0x262695(0x3a5)][_0x262695(0x27b)],_0x330815=_0x262695(0x269)[_0x262695(0x464)](this[_0x262695(0x4ca)][_0x262695(0x43d)][_0x262695(0x342)]),_0x5d5bdd=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x262695(0x4ca)]['damage']['type']];return _0x21a34a[_0x330815][_0x262695(0x464)](_0x5d5bdd);},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x417)]=function(){const _0x5f0cb6=_0x1ca854,_0x411c93=$gameActors[_0x5f0cb6(0x3b8)](0x1);this[_0x5f0cb6(0x251)]=JsonEx[_0x5f0cb6(0x4db)](_0x411c93),this[_0x5f0cb6(0x289)]=JsonEx[_0x5f0cb6(0x4db)](_0x411c93);},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x303)]=function(){const _0x5f3f26=_0x1ca854,_0x5a26c9=_0x5f3f26(0x347);if(this['_customItemInfo'][_0x5a26c9])return this['_customItemInfo'][_0x5a26c9];return Imported['VisuMZ_1_BattleCore']&&DataManager[_0x5f3f26(0x3ed)](this[_0x5f3f26(0x4ca)])!=='MANUAL'?this[_0x5f3f26(0x286)]():this[_0x5f3f26(0x467)]();},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x467)]=function(){const _0xc5e96b=_0x1ca854;window['a']=this[_0xc5e96b(0x251)],window['b']=this[_0xc5e96b(0x289)],this[_0xc5e96b(0x251)]['setShopStatusWindowMode'](!![]),this[_0xc5e96b(0x289)][_0xc5e96b(0x2fc)]([0x3,0x4][_0xc5e96b(0x26b)](this[_0xc5e96b(0x4ca)][_0xc5e96b(0x43d)][_0xc5e96b(0x342)]));let _0x5b85ef=this[_0xc5e96b(0x4ca)][_0xc5e96b(0x43d)][_0xc5e96b(0x209)];try{const _0x511ecd=Math[_0xc5e96b(0x39f)](eval(_0x5b85ef),0x0)/window['a']['atk'];return this[_0xc5e96b(0x2c0)](),isNaN(_0x511ecd)?_0xc5e96b(0x501):_0xc5e96b(0x1f1)['format'](Math[_0xc5e96b(0x315)](_0x511ecd*0x64));}catch(_0x20a180){return $gameTemp[_0xc5e96b(0x3e8)]()&&(console[_0xc5e96b(0x474)]('Damage\x20Formula\x20Error\x20for\x20%1'['format'](this[_0xc5e96b(0x4ca)][_0xc5e96b(0x4cd)])),console[_0xc5e96b(0x474)](_0x20a180)),this[_0xc5e96b(0x2c0)](),_0xc5e96b(0x501);}},Window_ShopStatus[_0x1ca854(0x495)]['revertGlobalNamespaceVariables']=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x41f)]=function(_0x108a0d,_0xbfd37a,_0x3f1539){const _0x49f51d=_0x1ca854;if(!this[_0x49f51d(0x2d3)]())return _0xbfd37a;if(this['drawItemEffectsHpRecovery'](_0x108a0d,_0xbfd37a,_0x3f1539))_0xbfd37a+=this[_0x49f51d(0x437)]();if(this[_0x49f51d(0x422)](_0x108a0d,_0xbfd37a,_0x3f1539))_0xbfd37a+=this[_0x49f51d(0x437)]();if(this[_0x49f51d(0x3c6)](_0x108a0d,_0xbfd37a,_0x3f1539))_0xbfd37a+=this[_0x49f51d(0x437)]();if(this[_0x49f51d(0x404)](_0x108a0d,_0xbfd37a,_0x3f1539))_0xbfd37a+=this[_0x49f51d(0x437)]();if(this[_0x49f51d(0x326)](_0x108a0d,_0xbfd37a,_0x3f1539))_0xbfd37a+=this[_0x49f51d(0x437)]();if(this[_0x49f51d(0x30b)](_0x108a0d,_0xbfd37a,_0x3f1539))_0xbfd37a+=this[_0x49f51d(0x437)]();if(this[_0x49f51d(0x42a)](_0x108a0d,_0xbfd37a,_0x3f1539))_0xbfd37a+=this[_0x49f51d(0x437)]();if(this[_0x49f51d(0x2b0)](_0x108a0d,_0xbfd37a,_0x3f1539))_0xbfd37a+=this[_0x49f51d(0x437)]();if(this[_0x49f51d(0x384)](_0x108a0d,_0xbfd37a,_0x3f1539))_0xbfd37a+=this[_0x49f51d(0x437)]();return this[_0x49f51d(0x460)](),_0xbfd37a;},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x2d3)]=function(){const _0x1e3cd2=_0x1ca854;let _0x2d1a7a=![];this[_0x1e3cd2(0x216)]={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};for(const _0x2d1a10 of this[_0x1e3cd2(0x4ca)][_0x1e3cd2(0x42c)]){switch(_0x2d1a10[_0x1e3cd2(0x248)]){case Game_Action['EFFECT_RECOVER_HP']:this[_0x1e3cd2(0x216)][_0x1e3cd2(0x3bb)]+=_0x2d1a10[_0x1e3cd2(0x4a3)],this[_0x1e3cd2(0x216)][_0x1e3cd2(0x29b)]+=_0x2d1a10[_0x1e3cd2(0x3d0)],_0x2d1a7a=!![];break;case Game_Action[_0x1e3cd2(0x395)]:this[_0x1e3cd2(0x216)]['rateMP']+=_0x2d1a10[_0x1e3cd2(0x4a3)],this[_0x1e3cd2(0x216)][_0x1e3cd2(0x31b)]+=_0x2d1a10[_0x1e3cd2(0x3d0)],_0x2d1a7a=!![];break;case Game_Action[_0x1e3cd2(0x276)]:this[_0x1e3cd2(0x216)][_0x1e3cd2(0x1d3)]+=_0x2d1a10[_0x1e3cd2(0x4a3)],_0x2d1a7a=!![];break;case Game_Action['EFFECT_ADD_STATE']:this['_itemData'][_0x1e3cd2(0x3b0)][_0x1e3cd2(0x47c)](_0x2d1a10['dataId']),_0x2d1a7a=!![];break;case Game_Action[_0x1e3cd2(0x32e)]:this[_0x1e3cd2(0x216)][_0x1e3cd2(0x268)]['push'](_0x2d1a10[_0x1e3cd2(0x27a)]),this['_itemData'][_0x1e3cd2(0x481)]=!![],_0x2d1a7a=!![];break;case Game_Action['EFFECT_ADD_BUFF']:this[_0x1e3cd2(0x216)][_0x1e3cd2(0x361)][_0x2d1a10[_0x1e3cd2(0x27a)]]+=0x1,_0x2d1a7a=!![];break;case Game_Action['EFFECT_ADD_DEBUFF']:this['_itemData'][_0x1e3cd2(0x361)][_0x2d1a10['dataId']]-=0x1,_0x2d1a7a=!![];break;case Game_Action['EFFECT_REMOVE_BUFF']:this[_0x1e3cd2(0x216)][_0x1e3cd2(0x3b3)][_0x1e3cd2(0x47c)](_0x2d1a10['dataId']),this[_0x1e3cd2(0x216)][_0x1e3cd2(0x481)]=!![],_0x2d1a7a=!![];break;case Game_Action[_0x1e3cd2(0x418)]:this[_0x1e3cd2(0x216)][_0x1e3cd2(0x4a5)]['push'](_0x2d1a10[_0x1e3cd2(0x27a)]),this[_0x1e3cd2(0x216)][_0x1e3cd2(0x481)]=!![],_0x2d1a7a=!![];break;}}if(this[_0x1e3cd2(0x216)][_0x1e3cd2(0x3b0)]['length']>0x0)this['_itemData'][_0x1e3cd2(0x3c8)]=!![];for(let _0xfd660a=0x0;_0xfd660a<this[_0x1e3cd2(0x216)]['changeBuff'][_0x1e3cd2(0x49e)];_0xfd660a++){if(this[_0x1e3cd2(0x216)][_0x1e3cd2(0x361)][_0xfd660a]!==0x0)this[_0x1e3cd2(0x216)][_0x1e3cd2(0x3c8)]=!![];}this[_0x1e3cd2(0x4ca)][_0x1e3cd2(0x24f)]!==0x0&&(this['_itemData']['selfTP']=this[_0x1e3cd2(0x4ca)][_0x1e3cd2(0x24f)],_0x2d1a7a=!![]);const _0x2df153=[_0x1e3cd2(0x305),_0x1e3cd2(0x1d4),_0x1e3cd2(0x4d2),'HP\x20DAMAGE',_0x1e3cd2(0x412),'TP\x20DAMAGE',_0x1e3cd2(0x2e9),_0x1e3cd2(0x293),_0x1e3cd2(0x2ac)];for(const _0x1ed386 of _0x2df153){if(this['_customItemInfo'][_0x1ed386]){_0x2d1a7a=!![];break;}}return _0x2d1a7a;},Window_ShopStatus[_0x1ca854(0x495)]['drawItemEffectsHpRecovery']=function(_0x480d5f,_0x1421bb,_0x354f60){const _0x570f08=_0x1ca854,_0xeb0ade=_0x570f08(0x305);if(this[_0x570f08(0x216)]['rateHP']<=0x0&&this['_itemData'][_0x570f08(0x29b)]<=0x0&&!this[_0x570f08(0x3df)][_0xeb0ade])return![];const _0x556193=this['getItemEffectsHpRecoveryLabel']();this[_0x570f08(0x506)](_0x556193,_0x480d5f,_0x1421bb,_0x354f60,!![]);const _0x5f193e=this[_0x570f08(0x2e3)]();return this[_0x570f08(0x20e)](ColorManager[_0x570f08(0x3c7)](0x1)),this[_0x570f08(0x506)](_0x5f193e,_0x480d5f,_0x1421bb,_0x354f60,![],_0x570f08(0x35b)),this['drawItemDarkRect'](_0x480d5f,_0x1421bb,_0x354f60),this[_0x570f08(0x460)](),!![];},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x1d2)]=function(){const _0x393364=_0x1ca854,_0x9034c7=VisuMZ[_0x393364(0x4d3)]['Settings'][_0x393364(0x27b)][_0x393364(0x4a9)];return _0x9034c7[_0x393364(0x464)](TextManager['hp']);},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x2e3)]=function(){const _0x3f8b18=_0x1ca854,_0x2b4900=_0x3f8b18(0x305);if(this['_customItemInfo'][_0x2b4900])return this[_0x3f8b18(0x3df)][_0x2b4900];let _0x5d1a6c='';if(this[_0x3f8b18(0x216)][_0x3f8b18(0x3bb)]>0x0)_0x5d1a6c+=_0x3f8b18(0x4c0)['format'](Math[_0x3f8b18(0x4e9)](this['_itemData'][_0x3f8b18(0x3bb)]*0x64));if(this['_itemData']['rateHP']>0x0&&this['_itemData'][_0x3f8b18(0x29b)]>0x0)_0x5d1a6c+='\x20';if(this[_0x3f8b18(0x216)][_0x3f8b18(0x29b)]>0x0)_0x5d1a6c+=_0x3f8b18(0x2cb)[_0x3f8b18(0x464)](this[_0x3f8b18(0x216)]['flatHP']);return _0x5d1a6c;},Window_ShopStatus['prototype'][_0x1ca854(0x422)]=function(_0x5400c,_0x3cdf1c,_0x31f8e2){const _0x299512=_0x1ca854,_0x51ca13=_0x299512(0x1d4);if(this[_0x299512(0x216)][_0x299512(0x2c3)]<=0x0&&this[_0x299512(0x216)][_0x299512(0x31b)]<=0x0&&!this[_0x299512(0x3df)][_0x51ca13])return![];const _0x1c99e2=this[_0x299512(0x48e)]();this[_0x299512(0x506)](_0x1c99e2,_0x5400c,_0x3cdf1c,_0x31f8e2,!![]);const _0x3809b4=this['getItemEffectsMpRecoveryText']();return this[_0x299512(0x20e)](ColorManager[_0x299512(0x3c7)](0x3)),this[_0x299512(0x506)](_0x3809b4,_0x5400c,_0x3cdf1c,_0x31f8e2,![],_0x299512(0x35b)),this[_0x299512(0x1ec)](_0x5400c,_0x3cdf1c,_0x31f8e2),this[_0x299512(0x460)](),!![];},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x48e)]=function(){const _0x4a2214=_0x1ca854,_0x2747a8=VisuMZ['ItemsEquipsCore']['Settings'][_0x4a2214(0x27b)][_0x4a2214(0x49a)];return _0x2747a8[_0x4a2214(0x464)](TextManager['mp']);},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x250)]=function(){const _0x50669b=_0x1ca854,_0x2697b7='MP\x20RECOVERY';if(this[_0x50669b(0x3df)][_0x2697b7])return this[_0x50669b(0x3df)][_0x2697b7];let _0x3354ea='';if(this[_0x50669b(0x216)][_0x50669b(0x2c3)]>0x0)_0x3354ea+=_0x50669b(0x4c0)[_0x50669b(0x464)](Math[_0x50669b(0x4e9)](this[_0x50669b(0x216)][_0x50669b(0x2c3)]*0x64));if(this[_0x50669b(0x216)][_0x50669b(0x2c3)]>0x0&&this[_0x50669b(0x216)][_0x50669b(0x31b)]>0x0)_0x3354ea+='\x20';if(this[_0x50669b(0x216)][_0x50669b(0x31b)]>0x0)_0x3354ea+='+%1'[_0x50669b(0x464)](this[_0x50669b(0x216)][_0x50669b(0x31b)]);return _0x3354ea;},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x3c6)]=function(_0x15f37f,_0x90f486,_0x42ec4f){const _0x38f476=_0x1ca854,_0x10e0dc=_0x38f476(0x4d2);if(this[_0x38f476(0x216)]['gainTP']<=0x0&&!this[_0x38f476(0x3df)][_0x10e0dc])return![];const _0x366cf7=this[_0x38f476(0x459)]();this[_0x38f476(0x506)](_0x366cf7,_0x15f37f,_0x90f486,_0x42ec4f,!![]);const _0x158f31=this[_0x38f476(0x1fc)]();return this[_0x38f476(0x20e)](ColorManager[_0x38f476(0x2e6)]()),this[_0x38f476(0x506)](_0x158f31,_0x15f37f,_0x90f486,_0x42ec4f,![],'right'),this[_0x38f476(0x1ec)](_0x15f37f,_0x90f486,_0x42ec4f),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x1ca854(0x459)]=function(){const _0x4ed4cb=_0x1ca854,_0x5216b4=VisuMZ[_0x4ed4cb(0x4d3)][_0x4ed4cb(0x3a5)][_0x4ed4cb(0x27b)]['LabelRecoverTP'];return _0x5216b4[_0x4ed4cb(0x464)](TextManager['tp']);},Window_ShopStatus['prototype'][_0x1ca854(0x1fc)]=function(){const _0x2a5875=_0x1ca854,_0x4eff99=_0x2a5875(0x4d2);if(this[_0x2a5875(0x3df)][_0x4eff99])return this[_0x2a5875(0x3df)][_0x4eff99];let _0x32960c='';return _0x32960c+='+%1'[_0x2a5875(0x464)](this[_0x2a5875(0x216)][_0x2a5875(0x1d3)]),_0x32960c;},Window_ShopStatus[_0x1ca854(0x495)]['drawItemEffectsSelfTpGain']=function(_0x5ba3ae,_0x5006e1,_0x4c8108){const _0x4ca9ce=_0x1ca854,_0x34e47c=_0x4ca9ce(0x2e9);if(this[_0x4ca9ce(0x216)][_0x4ca9ce(0x25b)]===0x0&&!this[_0x4ca9ce(0x3df)][_0x34e47c])return![];const _0x4cf3bb=this[_0x4ca9ce(0x308)]();this[_0x4ca9ce(0x506)](_0x4cf3bb,_0x5ba3ae,_0x5006e1,_0x4c8108,!![]);const _0x4077ad=this[_0x4ca9ce(0x409)]();return this[_0x4ca9ce(0x216)]['selfTP']>0x0?this[_0x4ca9ce(0x20e)](ColorManager['powerUpColor']()):this[_0x4ca9ce(0x20e)](ColorManager[_0x4ca9ce(0x3bf)]()),this[_0x4ca9ce(0x506)](_0x4077ad,_0x5ba3ae,_0x5006e1,_0x4c8108,![],_0x4ca9ce(0x35b)),this[_0x4ca9ce(0x1ec)](_0x5ba3ae,_0x5006e1,_0x4c8108),this[_0x4ca9ce(0x460)](),!![];},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x308)]=function(){const _0x175d10=_0x1ca854,_0x2b0ee1=VisuMZ[_0x175d10(0x4d3)][_0x175d10(0x3a5)]['StatusWindow']['LabelSelfGainTP'];return _0x2b0ee1[_0x175d10(0x464)](TextManager['tp']);},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x409)]=function(){const _0x3f941e=_0x1ca854,_0x1bb3b6=_0x3f941e(0x2e9);if(this['_customItemInfo'][_0x1bb3b6])return this[_0x3f941e(0x3df)][_0x1bb3b6];let _0x427610='';return this[_0x3f941e(0x216)][_0x3f941e(0x25b)]>0x0?_0x427610+=_0x3f941e(0x2cb)['format'](this[_0x3f941e(0x216)][_0x3f941e(0x25b)]):_0x427610+='%1'[_0x3f941e(0x464)](this[_0x3f941e(0x216)][_0x3f941e(0x25b)]),_0x427610;},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x404)]=function(_0x37fe16,_0x37afff,_0x581244){const _0x2610ea=_0x1ca854,_0x46d478=_0x2610ea(0x4b6);if(this[_0x2610ea(0x216)][_0x2610ea(0x3bb)]>=0x0&&this[_0x2610ea(0x216)][_0x2610ea(0x29b)]>=0x0&&!this[_0x2610ea(0x3df)][_0x46d478])return![];const _0x5da028=this[_0x2610ea(0x448)]();this[_0x2610ea(0x506)](_0x5da028,_0x37fe16,_0x37afff,_0x581244,!![]);const _0x38d8b0=this[_0x2610ea(0x2c4)]();return this['changeTextColor'](ColorManager[_0x2610ea(0x3c7)](0x0)),this['drawItemKeyData'](_0x38d8b0,_0x37fe16,_0x37afff,_0x581244,![],_0x2610ea(0x35b)),this[_0x2610ea(0x1ec)](_0x37fe16,_0x37afff,_0x581244),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype']['getItemEffectsHpDamageLabel']=function(){const _0x553f3e=_0x1ca854,_0x1a1139=VisuMZ[_0x553f3e(0x4d3)][_0x553f3e(0x3a5)][_0x553f3e(0x27b)][_0x553f3e(0x429)];return _0x1a1139['format'](TextManager['hp']);},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x2c4)]=function(){const _0x30fd85=_0x1ca854,_0x440e18='HP\x20DAMAGE';if(this[_0x30fd85(0x3df)][_0x440e18])return this['_customItemInfo'][_0x440e18];let _0x2adf61='';if(this[_0x30fd85(0x216)][_0x30fd85(0x3bb)]<0x0)_0x2adf61+='%1%'[_0x30fd85(0x464)](Math['floor'](this[_0x30fd85(0x216)][_0x30fd85(0x3bb)]*0x64));if(this[_0x30fd85(0x216)][_0x30fd85(0x3bb)]<0x0&&this[_0x30fd85(0x216)]['flatHP']<0x0)_0x2adf61+='\x20';if(this['_itemData'][_0x30fd85(0x29b)]<0x0)_0x2adf61+='%1'[_0x30fd85(0x464)](this[_0x30fd85(0x216)][_0x30fd85(0x29b)]);return _0x2adf61;},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x326)]=function(_0x21b8ef,_0x17a09b,_0x4dc90d){const _0x309015=_0x1ca854,_0x2178f3=_0x309015(0x412);if(this[_0x309015(0x216)][_0x309015(0x2c3)]>=0x0&&this[_0x309015(0x216)][_0x309015(0x31b)]>=0x0&&!this[_0x309015(0x3df)][_0x2178f3])return![];const _0x561ef2=this['getItemEffectsMpDamageLabel']();this[_0x309015(0x506)](_0x561ef2,_0x21b8ef,_0x17a09b,_0x4dc90d,!![]);const _0x50f5b7=this[_0x309015(0x482)]();return this[_0x309015(0x20e)](ColorManager[_0x309015(0x3c7)](0x2)),this[_0x309015(0x506)](_0x50f5b7,_0x21b8ef,_0x17a09b,_0x4dc90d,![],'right'),this['drawItemDarkRect'](_0x21b8ef,_0x17a09b,_0x4dc90d),this[_0x309015(0x460)](),!![];},Window_ShopStatus['prototype'][_0x1ca854(0x462)]=function(){const _0x6e061b=_0x1ca854,_0x55c0ff=VisuMZ[_0x6e061b(0x4d3)][_0x6e061b(0x3a5)][_0x6e061b(0x27b)]['LabelDamageMP'];return _0x55c0ff[_0x6e061b(0x464)](TextManager['mp']);},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x482)]=function(){const _0x2df8a9=_0x1ca854,_0x147454=_0x2df8a9(0x412);if(this[_0x2df8a9(0x3df)][_0x147454])return this['_customItemInfo'][_0x147454];let _0x1f17a3='';if(this[_0x2df8a9(0x216)][_0x2df8a9(0x2c3)]<0x0)_0x1f17a3+=_0x2df8a9(0x1f1)['format'](Math[_0x2df8a9(0x4e9)](this[_0x2df8a9(0x216)]['rateMP']*0x64));if(this['_itemData'][_0x2df8a9(0x2c3)]<0x0&&this[_0x2df8a9(0x216)][_0x2df8a9(0x31b)]<0x0)_0x1f17a3+='\x20';if(this['_itemData']['flatMP']<0x0)_0x1f17a3+='%1'[_0x2df8a9(0x464)](this[_0x2df8a9(0x216)][_0x2df8a9(0x31b)]);return _0x1f17a3;},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x30b)]=function(_0x52d0ef,_0x339127,_0x28662b){const _0x402b74=_0x1ca854,_0x3ee8c4=_0x402b74(0x2c2);if(this[_0x402b74(0x216)][_0x402b74(0x1d3)]>=0x0&&!this[_0x402b74(0x3df)][_0x3ee8c4])return![];const _0x302bfc=this[_0x402b74(0x399)]();this[_0x402b74(0x506)](_0x302bfc,_0x52d0ef,_0x339127,_0x28662b,!![]);const _0x27196f=this[_0x402b74(0x4bb)]();return this[_0x402b74(0x20e)](ColorManager[_0x402b74(0x3bf)]()),this[_0x402b74(0x506)](_0x27196f,_0x52d0ef,_0x339127,_0x28662b,![],_0x402b74(0x35b)),this[_0x402b74(0x1ec)](_0x52d0ef,_0x339127,_0x28662b),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x399)]=function(){const _0x155a19=_0x1ca854,_0x5079c0=VisuMZ['ItemsEquipsCore'][_0x155a19(0x3a5)][_0x155a19(0x27b)][_0x155a19(0x1fa)];return _0x5079c0[_0x155a19(0x464)](TextManager['tp']);},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x4bb)]=function(){const _0x217fd6=_0x1ca854,_0x3caf68=_0x217fd6(0x2c2);if(this[_0x217fd6(0x3df)][_0x3caf68])return this[_0x217fd6(0x3df)][_0x3caf68];let _0x2a7031='';return _0x2a7031+='%1'[_0x217fd6(0x464)](this[_0x217fd6(0x216)]['gainTP']),_0x2a7031;},Window_ShopStatus['prototype'][_0x1ca854(0x2b0)]=function(_0x5f34ea,_0x1f6497,_0x666735){const _0x3e2900=_0x1ca854,_0x25ba99=_0x3e2900(0x293);if(!this[_0x3e2900(0x216)]['addStateBuffChanges']&&!this[_0x3e2900(0x3df)][_0x25ba99])return![];const _0x197b07=this[_0x3e2900(0x4c9)]();this[_0x3e2900(0x506)](_0x197b07,_0x5f34ea,_0x1f6497,_0x666735,!![]);const _0xc8f9ec=this[_0x3e2900(0x444)]();return this[_0x3e2900(0x506)](_0xc8f9ec,_0x5f34ea,_0x1f6497,_0x666735,![],'right'),this['drawItemDarkRect'](_0x5f34ea,_0x1f6497,_0x666735),this[_0x3e2900(0x460)](),!![];},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x4c9)]=function(){const _0x3bc381=_0x1ca854;return VisuMZ['ItemsEquipsCore']['Settings'][_0x3bc381(0x27b)]['LabelApply'];},Window_ShopStatus['prototype'][_0x1ca854(0x444)]=function(){const _0x379461=_0x1ca854,_0x2b9bef=_0x379461(0x293);if(this[_0x379461(0x3df)][_0x2b9bef])return this[_0x379461(0x3df)][_0x2b9bef];let _0x33e49d='',_0x2bf2be=0x0;const _0xad8b19=0x8;for(const _0xd1c8e6 of this[_0x379461(0x216)]['addState']){const _0x22cbd0=$dataStates[_0xd1c8e6];if(_0x22cbd0&&_0x22cbd0['iconIndex']>0x0){_0x33e49d+=_0x379461(0x46a)[_0x379461(0x464)](_0x22cbd0['iconIndex']),_0x2bf2be++;if(_0x2bf2be>=_0xad8b19)return _0x33e49d;}}for(let _0x1fa69b=0x0;_0x1fa69b<this[_0x379461(0x216)][_0x379461(0x361)]['length'];_0x1fa69b++){const _0x5f31ae=this[_0x379461(0x216)][_0x379461(0x361)][_0x1fa69b],_0x33acb5=Game_BattlerBase[_0x379461(0x495)][_0x379461(0x2a9)](_0x5f31ae,_0x1fa69b);if(_0x33acb5>0x0){_0x33e49d+=_0x379461(0x46a)[_0x379461(0x464)](_0x33acb5),_0x2bf2be++;if(_0x2bf2be>=_0xad8b19)return _0x33e49d;}}return _0x33e49d;},Window_ShopStatus['prototype']['drawItemEffectsRemovedStatesBuffs']=function(_0x375bf6,_0x4d9111,_0x3a9714){const _0x145c2b=_0x1ca854,_0x3e2a53='REMOVED\x20EFFECTS';if(!this['_itemData'][_0x145c2b(0x481)]&&!this['_customItemInfo'][_0x3e2a53])return![];const _0x20ad89=this['getItemEffectsRemovedStatesBuffsLabel']();this[_0x145c2b(0x506)](_0x20ad89,_0x375bf6,_0x4d9111,_0x3a9714,!![]);const _0x36ec47=this[_0x145c2b(0x280)]();return this[_0x145c2b(0x506)](_0x36ec47,_0x375bf6,_0x4d9111,_0x3a9714,![],_0x145c2b(0x35b)),this[_0x145c2b(0x1ec)](_0x375bf6,_0x4d9111,_0x3a9714),this[_0x145c2b(0x460)](),!![];},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x234)]=function(){const _0x58209e=_0x1ca854;return VisuMZ[_0x58209e(0x4d3)][_0x58209e(0x3a5)][_0x58209e(0x27b)]['LabelRemove'];},Window_ShopStatus['prototype']['getItemEffectsRemovedStatesBuffsText']=function(){const _0x399067=_0x1ca854,_0x5844c5='REMOVED\x20EFFECTS';if(this[_0x399067(0x3df)][_0x5844c5])return this[_0x399067(0x3df)][_0x5844c5];let _0x3d6668='',_0x433876=0x0;const _0xbff8c3=VisuMZ[_0x399067(0x4d3)][_0x399067(0x3a5)][_0x399067(0x27b)][_0x399067(0x439)];for(const _0x356030 of this[_0x399067(0x216)][_0x399067(0x268)]){const _0x42ce0c=$dataStates[_0x356030];if(_0x42ce0c&&_0x42ce0c[_0x399067(0x4d5)]>0x0){_0x3d6668+=_0x399067(0x46a)[_0x399067(0x464)](_0x42ce0c[_0x399067(0x4d5)]),_0x433876++;if(_0x433876>=_0xbff8c3)return _0x3d6668;}}for(let _0x322951=0x0;_0x322951<this[_0x399067(0x216)][_0x399067(0x3b3)][_0x399067(0x49e)];_0x322951++){const _0x34f35f=Game_BattlerBase['prototype'][_0x399067(0x2a9)](0x1,_0x322951);if(_0x34f35f>0x0){_0x3d6668+='\x5cI[%1]'[_0x399067(0x464)](_0x34f35f),_0x433876++;if(_0x433876>=_0xbff8c3)return _0x3d6668;}}for(let _0x2baf6b=0x0;_0x2baf6b<this[_0x399067(0x216)][_0x399067(0x4a5)]['length'];_0x2baf6b++){const _0xa89af0=Game_BattlerBase[_0x399067(0x495)][_0x399067(0x2a9)](-0x1,_0x2baf6b);if(_0xa89af0>0x0){_0x3d6668+=_0x399067(0x46a)[_0x399067(0x464)](_0xa89af0),_0x433876++;if(_0x433876>=_0xbff8c3)return _0x3d6668;}}return _0x3d6668;},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x2ec)]=function(_0x179c3d,_0x53f6cb,_0x5bff9f){const _0xe1359f=_0x1ca854;if(this['_item']['note']['match'](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0xc3cb56=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x1b9861 of _0xc3cb56){if(_0x1b9861[_0xe1359f(0x4f8)](/(.*):[ ](.*)/i)){const _0x3edfe7=String(RegExp['$1'])[_0xe1359f(0x351)](),_0x3a6afd=String(RegExp['$2'])['trim']();this[_0xe1359f(0x3c4)](_0x3edfe7,_0x3a6afd,_0x179c3d,_0x53f6cb,_0x5bff9f),_0x53f6cb+=this[_0xe1359f(0x437)]();}}}return this[_0xe1359f(0x460)](),_0x53f6cb;},Window_ShopStatus[_0x1ca854(0x495)][_0x1ca854(0x3c4)]=function(_0x127e04,_0x261205,_0x4a1fc8,_0x12605a,_0x24d721){const _0x47c79f=_0x1ca854;this[_0x47c79f(0x506)](_0x127e04,_0x4a1fc8,_0x12605a,_0x24d721,!![]),this[_0x47c79f(0x506)](_0x261205,_0x4a1fc8,_0x12605a,_0x24d721,![],'right'),this[_0x47c79f(0x1ec)](_0x4a1fc8,_0x12605a,_0x24d721),this[_0x47c79f(0x460)]();};