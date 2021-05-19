//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.24;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.24] [ItemsEquipsCore]
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
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 *
 * VisuMZ_2_WeaponSwapSystem
 *
 * The custom equip slots feature from the VisuStella MZ Items and Equips Core
 * allowed you to add in extra weapon slots. This is now curated up to a max
 * of one weapon slot per character. This needs to be done to make the Weapon
 * Swap System viable.
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
 *   Non-Optimized Types:
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
 * Version 1.24: April 16, 2021
 * * Bug Fixes!
 * ** Changing an actor's equipment slots to past their original amount will no
 *    longer yield errors with duplicate slot types. Fix made by Arisu.
 * ** Completely selling an item should now refresh the help window to the new
 *    selected item's help description. Fix made by Arisu.
 * * Optimization Update!
 * ** Non-removable equipment restrictions for the equipment scene are now
 *    better optimized. Update made by Olivia.
 * 
 * Version 1.23: April 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
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
 * @text Non-Optimized Types
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

const _0x5708=['flatHP','getItemDamageElementLabel','dataId','WDRVq','exgRO','AhQfy','Scene_Equip_onSlotCancel','createStatusWindow','numberWindowRect','bitmap','drawText','getItemEffectsHpRecoveryText','TLLLo','eizen','playOkSound','EFFECT_REMOVE_DEBUFF','ZrWym','maxVisibleItems','_equips','commandSell','buttonAssistLargeIncrement','_goodsCount','maxCols','rheXk','currentClass','left','QoL','buttonAssistText2','JrMlw','yuIkZ','KeyItemProtect','getItemEffectsMpRecoveryText','Scene_Item_createCategoryWindow','CmdStyle','ARRAYNUM','isOpen','Scene_Equip_statusWindowRect','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','\x5cI[%1]','helpAreaTop','itypeId','qXYVT','HiddenItemB','setHp','hCXcq','drawItemEffectsHpRecovery','rkXkP','max','uiMenuStyle','ARRAYFUNC','DrawPortraitJS','getItemScopeText','Scene_Shop_onBuyCancel','EOCsV','_commandNameWindow','_forcedSlots','ffLWg','MHJSg','SUCCESS\x20RATE','categoryNameWindowCenter','_purchaseOnly','TFhYA','fillRect','EcytA','CmdCancelRename','sellWindowRectItemsEquipsCore','Width','commandSellItemsEquipsCore','ScopeRandomAny','mainFontFace','Scene_Shop_onCategoryCancel','FieldUsable','XlQRg','scrollTo','sMprm','fontSizeRatio','PQZjQ','buttonAssistKey3','isTriggered','MaxArmors','itemHasEquipLimit','getItemHitTypeLabel','isItem','Settings','limitedPageUpDownSceneCheck','drawItemEffectsTpDamage','ElementNone','oUDEa','hitIndex','postCreateItemWindowModernControls','isSceneShop','text','isEquipCommandAdded','ItemQuantityFontSize','Game_Actor_tradeItemWithParty','processDrawIcon','createCategoryNameWindow','Window_EquipItem_includes','LabelDamageHP','uQLYt','isCommandEnabled','isShiftShortcutKeyForRemove','MgIYY','kENKk','replace','dFrVC','buttonAssistText3','LabelRecoverTP','Scene_Boot_onDatabaseLoaded','translucentOpacity','KUftE','itemWindowRect','rVwWL','cursorLeft','drawItemKeyData','Picdv','getItemDamageAmountTextOriginal','allowCommandWindowCursorUp','floor','split','remove','ursZB','EFFECT_RECOVER_MP','CONSUMABLE','WMAGw','rEoie','getItemEffectsAddedStatesBuffsText','_dummyWindow','FontFace','active','drawActorParamDifference','clearNewLabelFromItem','oCHwA','RegExp','isSoleArmorType','Step2Start','FcmkW','height','commandStyle','dumVT','OCCASION','makeDeepCopy','kTJaV','clearNewItem','getItemEffectsRemovedStatesBuffsText','sHInE','isBottomHelpMode','ShowShopStatus','sellingPrice','nonOptimizeEtypes','value2','ScopeRandomEnemies','isShiftRemoveShortcutEnabled','HdQBZ','flatMP','_calculatingJSParameters','csswz','asuYB','REMOVED\x20EFFECTS','drawRemoveItem','Game_Actor_forceChangeEquip','clamp','buttonAssistKey2','createSlotWindow','processShiftRemoveShortcut','index','onBuyCancelItemsEquipsCore','addStateBuffChanges','Speed0','HuRBJ','AZPEH','4199421LCvSeK','placeNewLabel','playBuzzerSound','_slotWindow','rateHP','setupItemDamageTempActors','_resetFontSize','isUseModernControls','drawParamName','object','uPqyr','Scene_Shop_onSellCancel','Window_ItemList_updateHelp','SellPriceRate','(+%1)','\x5cI[%1]%2','FadeSpeed','contents','getItemEffectsMpRecoveryLabel','qvFqp','Window_EquipItem_isEnabled','item-%1','LabelSpeed','initEquips','ohFOp','HP\x20RECOVERY','xvQIi','drawItemActorMenuImage','postCreateSellWindowItemsEquipsCore','LabelRepeats','NonOptimizeETypes','windowPadding','buttonAssistOffset3','isUseItemsEquipsCoreUpdatedLayout','Parse_Notetags_Prices','Scene_Shop_numberWindowRect','mmp','elements','Scene_Shop_commandSell','Window_Selectable_setHelpWindowItem','WGtFD','Window_ItemCategory_initialize','Scene_Load_reloadMapIfUpdated','qGFRg','onTouchSelectModern','ujPfv','EQdaP','optKeyItemsNumber','YsjvM','ItemQuantityFmt','dgHNU','mainAreaTop','contentsBack','MAT','maxItems','itemPadding','CoreEngine','hsglH','PryMB','5218GbjNRI','onTouchSelectModernControls','GyImt','getNextAvailableEtypeId','parameters','Scene_Equip_itemWindowRect','onSellOk','right','isDrawItemNumber','iSmrM','getItemEffectsAddedStatesBuffsLabel','createNewLabelSprite','visible','uiInputPosition','mQBZX','getItemEffectsSelfTpGainLabel','Window_ShopSell_isEnabled','canConsumeItem','lqLzd','isNewItem','MaxHP','drawItemNumber','fontFace','formula','SCKIQ','SwitchID','mainFontSize','rOeTI','gainItem','EOrEb','shift','(%1)','removeState','makeCommandList','EFFECT_ADD_BUFF','_category','EFFECT_REMOVE_BUFF','boxWidth','KQRjw','eqCgQ','equips','getItemEffectsMpDamageLabel','OffsetX','characterName','_list','getItemEffectsSelfTpGainText','hide','UpFsh','prepareNextScene','calcWindowHeight','ExtDisplayedParams','drawParamText','NoChangeMarker','ItemMenuStatusRect','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','drawItemStyleIcon','A%1','42815BqXJiY','vpZZB','Speed2000','meetsItemConditionsJS','actor','onBuyCancel','getItemEffectsHpDamageLabel','SpeedNeg2000','aafHW','popScene','hYCpy','initNewLabelSprites','SUkqO','paramPlus','MaxMP','ObGBt','drawItemStyleIconText','status','OHsPL','LAixn','AllItems','lWOUM','Window_EquipStatus_refresh','itemWindowRectItemsEquipsCore','BattleUsable','hideDisabledCommands','call','PPhTX','MaxIcons','bhmVA','trim','cancel','drawItemDamage','BPQrn','IconSet','prepareItemCustomData','bPhjJ','rateMP','oZDVL','getItemEffectsRemovedStatesBuffsLabel','Window_Selectable_refresh','gUrcS','setCategory','setValue','addWindow','getItemDamageAmountText','tradeItemWithParty','updateMoneyAmount','ohHlc','nExzE','Parse_Notetags_Batch','getInputMultiButtonStrings','prepareNewEquipSlotsOnLoad','SEzKj','NFBNA','equipSlotIndex','tyJIM','VisuMZ_1_BattleCore','isBattleTest','nucCR','commandBuy','onSlotCancel','drawNewLabelText','modifiedBuyPriceItemsEquipsCore','_newLabelSprites','JSON','loadSystem','NUM','HitType%1','ListWindowCols','getItemOccasionText','getItemEffectsHpRecoveryLabel','ParseWeaponNotetags','BYYRd','zjjbX','down','processHandling','_goods','FZcZV','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','placeItemNewLabel','mainCommandWidth','parse','buttonAssistText1','_buyWindow','ADDED\x20EFFECTS','15203GiLdHO','kSNcW','_buttonAssistWindow','checkShiftRemoveShortcut','successRate','PloWx','sUcrK','_tempActorA','NNrbr','mgrHy','textColor','ItemScene','Scene_Shop_onSellOk','ShiftShortcutKey','wvzSG','onCategoryCancel','lineHeight','HP\x20DAMAGE','kVLEY','create','qicyl','SFOBR','removeStateBuffChanges','TP\x20DAMAGE','drawItemHitType','blt','hitType','ActorChangeEquipSlots','gABNC','ShopMenuStatusStandard','oHLSO','drawItemEffectsRemovedStatesBuffs','StatusWindowWidth','KPucK','consumable','drawItemDarkRect','DrawBackRect','drawItemCustomEntryLine','isPlaytest','NeverUsable','makeItemData','bWSlx','prepare','SellPriceJS','drawItemSuccessRate','currentExt','sFUwu','nextActor','_resetFontColor','iubod','iDxrg','KNAZI','EnableLayout','Scene_Equip_onSlotOk','Scene_Item_categoryWindowRect','playCursorSound','Cjsdv','PlUmL','param','drawItemName','opacity','yimYK','ARRAYEVAL','repeats','equipTypes','kJqNp','gaugeBackColor','hJvRK','%1%','canEquip','currencyUnit','BWxpX','numItems','dnmqn','speed','defaultItemMax','ParamValueFontSize','onSellOkItemsEquipsCore','prototype','statusWindowRectItemsEquipsCore','optimize','SOlnp','?????','EquipScene','iconIndex','bKtXE','6TtTbxj','IzVZI','gainTP','setShopStatusWindowMode','processCursorHomeEndTrigger','rIsBT','wtypeId','description','getItemRepeatsText','AeodN','getItemRepeatsLabel','setNewItem','revertGlobalNamespaceVariables','_categoryWindow','dvMmf','createCategoryWindow','VtaFY','isRightInputMode','cursorPageup','SMOvL','Scene_Shop_goldWindowRect','commandStyleCheck','kfIqP','drawItemEffectsHpDamage','bind','aqugw','wZEmh','paintOpacity','systemColor','SwitchSell','changeTextColor','aEPwi','drawItemEffects','Step3Start','push','drawItem','WReiq','keyItem','SWygo','_tempActor','RsiPj','updateCommandNameWindow','Scene_Shop_statusWindowRect','damageColor','EFFECT_ADD_DEBUFF','isGoodShown','REPEAT','_tempActorB','rumfh','tvxXu','LabelSelfGainTP','PurchaseOnly','drawItemScope','uIjrs','EquipParams','allowShiftScrolling','clearEquipments','isClearCommandAdded','MultiplierStandard','ItemMenuStatusBgType','isOptimizeCommandAdded','addCommand','map','133070trICLF','sJPye','paramId','statusWindowRect','changePaintOpacity','DrawIcons','Text','hideAdditionalSprites','getItemDamageAmountLabelOriginal','addSellCommand','drawEquipData','buy','removeBuff','isDualWield','getColor','maxBattleMembers','isOptimizeEquipOk','textWidth','itemLineRect','buyWindowRect','drawIcon','Scene_Shop_activateSellWindow','MaxWeapons','equip2','DrawEquipData','DamageType%1','ItemsEquipsCore','xZGtk','setItem','ZFbcv','_actor','log','canUse','Scene_Shop_sellWindowRect','helpWindowRectItemsEquipsCore','stSQT','GBCLf','note','categoryNameWindowDrawText','uvCaO','_itemData','getItemDamageElementText','Window_ItemList_drawItem','rWMxs','addEquipCommand','GIodx','resetTextColor','refresh','statusWidth','Ksifc','onMenuImageLoad','isPressed','RWVvK','ELEMENT','occasion','MeIwU','Scene_Shop_createCategoryWindow','getItemsEquipsCoreBackColor2','drawItemEffectsSelfTpGain','TP\x20RECOVERY','Window_EquipCommand_initialize','gxlhZ','drawItemData','Icon','sGsLk','params','iconText','weapon','Game_Actor_changeEquip','addCancelCommand','onSellCancel','LabelHitType','pagedown','Game_BattlerBase_param','updateHelp','ASaeN','oBIgl','Style','possession','drawItemEffectsMpRecovery','Scene_Equip_createSlotWindow','Window_Selectable_update','processCursorSpecialCheckModernControls','isArmor','includes','addChild','axFIt','ParseArmorNotetags','VKGFo','ItemSceneAdjustItemList','updateChangedSlots','LiSRX','sqnFq','categoryWindowRectItemsEquipsCore','cursorPagedown','isEquipChangeOk','isCancelled','slotWindowRect','createSellWindow','changeEquipById','_slotId','clear','Scene_ItemBase_activateItemWindow','LabelConsume','ceil','splice','EFFECT_RECOVER_HP','huKwu','isSellCommandEnabled','RemoveEquipText','onCategoryCancelItemsEquipsCore','LayoutStyle','colSpacing','qKKAb','version','ZPxPB','BackRectColor','changeEquip','drawParamsItemsEquipsCore','categoryStyle','members','ActorResetEquipSlots','BScxZ','isEnabled','oMXHx','ParseClassNotetags','Occasion%1','dmKis','show','drawCurrencyValue','CXjTn','getItemSpeedText','iWQMy','Speed1','commandName','value1','XLfag','GcoAW','LabelDamageMP','jDnTT','itemDataFontSize','uwbJN','Game_Actor_paramPlus','format','allowCreateStatusWindow','addItemCategory','YjiId','paramPlusItemsEquipsCoreCustomJS','drawItemDamageElement','paramchangeTextColor','oqVav','onActorChange','actorParams','updateCategoryNameWindow','commandNameWindowDrawText','nXJEE','uUhcN','doSell','jTzeU','onTouchCancel','getMenuImage','SpeedNeg1999','LabelElement','CommandAddClear','lNJWf','addOptimizeCommand','_data','commandBuyItemsEquipsCore','DXxhQ','DEhdG','VyLae','adjustHiddenShownGoods','code','Rwifv','EsYTr','weaponTypes','setMp','sellWindowRect','×%1','getMatchingInitEquip','AlreadyEquipMarker','pageup','_shopStatusMenuAlly','71nisdEj','_item','NotConsumable','CannotEquipMarker','drawUpdatedBeforeParamValue','length','MaxItems','resetFontSettings','neohy','isMainMenuCoreMenuImageOptionAvailable','drawItemQuantity','%1-%2','isClicked','LabelSuccessRate','Game_BattlerBase_meetsItemConditions','vutkf','Scene_Equip_slotWindowRect','isRepeated','216EPlhiw','fill','meetsItemConditionsNotetags','FontSize','registerCommand','isEquipItem','slotWindowRectItemsEquipsCore','isCursorMovable','addLoadListener','helpWindowRect','EArUk','YCHJX','drawItemEffectsAddedStatesBuffs','New','getTextColor','helpAreaHeight','textSizeEx','equipSlots','buffIconIndex','releaseUnequippableItems','PMUDP','DPeAV','drawActorCharacter','1133638Icbnpa','ezMDA','_bypassNewLabel','postCreateCategoryWindowItemsEquipsCore','Game_Party_gainItem','activate','ParseItemNotetags','drawItemOccasion','VXfER','LiQfL','Game_Actor_discardEquip','getItemQuantityText','ujGMo','EYlde','#%1','getItemHitTypeText','_commandWindow','select','getItemEffectsTpDamageLabel','buttonAssistSlotWindowShift','armor','armorTypes','ARRAYJSON','isClearCommandEnabled','isOpenAndActive','forceChangeEquip','eYVwz','loadPicture','BorderRegExp','mQGCC','auto','Speed1000','getItemSuccessRateText','mWnfF','isHandled','commandWindowRect','VisuMZ_1_MainMenuCore','innerWidth','mhp','EquipAdjustHpMp','onCategoryOk','gdLWr','xhEOB','price','match','CmdTextAlign','onSlotOkAutoSelect','sellPriceRate','XCAzJ','round','_shopStatusMenuMode','iconWidth','center','ShopScene','buttonAssistSmallIncrement','itemEnableJS','+%1','etypeId','normalColor','versionId','sell','money','Step3End','forceChangeEquipSlots','Scene_Shop_commandBuy','Window_ShopBuy_refresh','setTopRow','Parse_Notetags_EquipSlots','QGTuZ','eOGJc','Xgvul','LabelDamageTP','icon','+%1%','_statusWindow','IsgVq','Scene_Item_createItemWindow','ElementWeapon','Scene_Equip_commandWindowRect','9CIxVuI','AlwaysUsable','_doubleTouch','smallParamFontSize','return\x200','NonRemoveETypes','maxItemAmount','process_VisuMZ_ItemsEquipsCore_Notetags','getItemEffectsHpDamageText','CmdHideDisabled','loadFaceImages','buttonAssistRemove','MP\x20DAMAGE','_buyWindowLastIndex','ParseAllNotetags','type','categoryWindowRect','RAGwS','Window_ItemList_maxCols','Whitelist','buyWindowRectItemsEquipsCore','Scene_Equip_onActorChange','equipAdjustHpMp','Step2End','_newLabelOpacity','fontSize','cursorRight','drawItemEffectsMpDamage','vsocU','_scene','changeBuff','getItemSpeedLabel','drawItemConsumable','ukshZ','_handlers','Translucent','createBitmap','ScopeAlliesButUser','commandNameWindowCenter','LabelRecoverMP','ConvertNumberToString','KApMX','addState','duZRF','categories','Scene_Equip_commandEquip','effects','hideNewLabelSprites','uOKsf','uIOYQ','getItemsEquipsCoreBackColor1','Scene_Item_create','jjoid','_newLabelOpacityChange','Scope%1','initialize','activateItemWindow','callUpdateHelp','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','commandNameWindowDrawBackground','addClearCommand','paramValueFontSize','categoryItemTypes','FCmSq','tnKJV','paramValueByName','canShiftRemoveEquipment','OffsetY','powerUpColor','onTouchSelect','ULHXE','removeDebuff','TrATl','shouldCommandWindowExist','numberWindowRectItemsEquipsCore','onSlotOk','damage','KeyItems','aiogg','indexOf','exit','mainAreaHeight','getItemEffectsTpDamageText','buttonAssistKey1','NDWCU','updatedLayoutStyle','values','BuyPriceJS','getItemColor','vmvsX','powerDownColor','width','BDmXY','DIBIu','value','0000','Blacklist','mainAreaBottom','isUseParamNamesWithIcons','rogsX','drawUpdatedParamName','addBuyCommand','drawItemCost','goldWindowRectItemsEquipsCore','isEquipCommandEnabled','processCursorMoveModernControls','refreshActorEquipSlotsIfUpdated','update','Scene_Shop_buyWindowRect','tpGain','Window_ItemList_colSpacing','constructor','loadCharacter','nCZIN','isShowNew','JgrUc','process_VisuMZ_ItemsEquipsCore_RegExp','setHandler','isKeyItem','gGsFz','atypeId','DrawParamJS','atk','MTpRg','vrhVM','FHDnk','hnlCW','qoChN','onTouchOk','QqLAM','buttonAssistItemListRequirement','activateSellWindow','WuhEC','armor-%1','STR','MhVaM','130077rzjkTx','itemTextAlign','GlAiA','isSoleWeaponType','TOvnA','isEquipped','uiHelpPosition','Parse_Notetags_EnableJS','gaugeLineHeight','NtbHo','smoothSelect','getInputButtonString','rkmLL','Scene_Shop_commandWindowRect','nzVMB','convertInitEquipsToItems','resetShopSwitches','elementId','CmdIconSell','TXLcn','initNewItemsList','iconHeight','SCOPE','IncludeShopItem','_categoryNameWindow','drawTextEx','cikOh','Scene_Item_itemWindowRect','buttonAssistCategory','setObject','commandWindowRectItemsEquipsCore','Scene_Equip_create','getItemDamageAmountLabel','Slots','Window_ShopBuy_price','Window_ItemCategory_setItemWindow','CmdIconBuy','hJbXK','onDatabaseLoaded','MDF','yeOFc','CommandAddOptimize','SwitchBuy','OffEc','OLglL','forceResetEquipSlots','StatusWindow','MWwin','isHoverEnabled','commandEquip','isBuyCommandEnabled','CRhMV','filter','List','process_VisuMZ_ItemsEquipsCore_EquipSlots','drawUpdatedAfterParamValue','isClearEquipOk','adjustItemWidthByStatus','name','ivLzf','Scene_Shop_doSell','refreshItemsEquipsCoreNoMenuImage','getItemDamageAmountLabelBattleCore','Scene_Shop_prepare','selfTP','AllWeapons','getItemConsumableLabel','100%','_sellWindow','isPageChangeRequested','eYbza','isWeapon','zpDoj','postCreateSlotWindowItemsEquipsCore','_newLabelOpacityUpperLimit','isOptimizeCommandEnabled','postCreateItemsEquipsCore','GapAF','Plgtl','Parse_Notetags_ParamValues','\x5cb%1\x5cb','CFStc','setItemWindow','prepareRefreshItemsEquipsCoreLayout','drawNewLabelIcon','AGI','goldWindowRect','Scene_Shop_doBuy','itemAt','paramJS','Lqyds','Parse_Notetags_ParamJS','KxiaU','GoPFf','sbXwe','Actors','reloadMapIfUpdated','deactivate','doBuy','poMXc','CMLOG','KVTQa','ofoBg','yVxmR','getItemSuccessRateLabel','pop','getItemEffectsMpDamageText','setStatusWindow','categoryStyleCheck','createCommandNameWindow','Categories','SpeedNeg999','_customItemInfo','ifesL','Step1Start','ApDMR','Scene_Shop_createSellWindow','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','HtSWW','checkItemConditionsSwitchNotetags','YOlSj','cursorUp','categoryList','getItemDamageAmountTextBattleCore','drawItemDamageAmount','battleMembers','item','yrgyL','LabelRemove','getItemEffectsTpRecoveryLabel','ATK','FEfLY','yzQlj','_newItemsList','Nonconsumable','VisuMZ_0_CoreEngine','weapon-%1','setHelpWindowItem','CGkRK','FadeLimit','_itemWindow','hpRate','LUK','_numberWindow','MenuPortraits','toUpperCase','ParamChangeFontSize','DrawItemData','USER\x20TP\x20GAIN','categoryNameWindowDrawBackground','Game_Party_initialize','Window_ShopCommand_initialize','nonRemovableEtypes','processTouchModernControls','Xkstt','getDamageStyle','ConvertParams','drawItemRepeats','cursorDown','determineBaseSellingPrice','updateNewLabelOpacity','Consumable','DYQys','nHweS','Param','refreshCursor','DAMAGE\x20MULTIPLIER','ksjNy','drawItemCustomEntries','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','drawItemEquipType','XqOcW','Parse_Notetags_Category','isHovered','Step1End','deselect','Tzryj','newLabelEnabled','EOdXe','gVztG'];const _0x14a1da=_0x15b4;function _0x15b4(_0x85633a,_0x53731a){_0x85633a=_0x85633a-0x1a5;let _0x5708a9=_0x5708[_0x85633a];return _0x5708a9;}(function(_0x4e2b19,_0x17f72b){const _0x111776=_0x15b4;while(!![]){try{const _0x5cb0a0=-parseInt(_0x111776(0x1b0))*parseInt(_0x111776(0x1ef))+parseInt(_0x111776(0x31e))*parseInt(_0x111776(0x579))+parseInt(_0x111776(0x2b8))*-parseInt(_0x111776(0x540))+-parseInt(_0x111776(0x2a6))*parseInt(_0x111776(0x5cf))+parseInt(_0x111776(0x3a6))+-parseInt(_0x111776(0x2cf))+parseInt(_0x111776(0x505));if(_0x5cb0a0===_0x17f72b)break;else _0x4e2b19['push'](_0x4e2b19['shift']());}catch(_0x102daf){_0x4e2b19['push'](_0x4e2b19['shift']());}}}(_0x5708,0x8cb12));var label=_0x14a1da(0x209),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x14a1da(0x3da)](function(_0x267414){const _0x4c4eaa=_0x14a1da;return _0x267414['status']&&_0x267414[_0x4c4eaa(0x1b7)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x14a1da(0x4ad)]||{},VisuMZ[_0x14a1da(0x442)]=function(_0x50cee7,_0x254548){const _0x1b2408=_0x14a1da;for(const _0x169664 in _0x254548){if(_0x169664['match'](/(.*):(.*)/i)){const _0x37476a=String(RegExp['$1']),_0x53a6eb=String(RegExp['$2'])[_0x1b2408(0x437)]()[_0x1b2408(0x597)]();let _0x244a02,_0x1282cc,_0x4395d;switch(_0x53a6eb){case _0x1b2408(0x5bc):_0x244a02=_0x254548[_0x169664]!==''?Number(_0x254548[_0x169664]):0x0;break;case _0x1b2408(0x47c):_0x1282cc=_0x254548[_0x169664]!==''?JSON[_0x1b2408(0x5cb)](_0x254548[_0x169664]):[],_0x244a02=_0x1282cc['map'](_0x474faf=>Number(_0x474faf));break;case'EVAL':_0x244a02=_0x254548[_0x169664]!==''?eval(_0x254548[_0x169664]):null;break;case _0x1b2408(0x60d):_0x1282cc=_0x254548[_0x169664]!==''?JSON[_0x1b2408(0x5cb)](_0x254548[_0x169664]):[],_0x244a02=_0x1282cc[_0x1b2408(0x1ee)](_0x30974e=>eval(_0x30974e));break;case _0x1b2408(0x5ba):_0x244a02=_0x254548[_0x169664]!==''?JSON[_0x1b2408(0x5cb)](_0x254548[_0x169664]):'';break;case _0x1b2408(0x2e5):_0x1282cc=_0x254548[_0x169664]!==''?JSON[_0x1b2408(0x5cb)](_0x254548[_0x169664]):[],_0x244a02=_0x1282cc['map'](_0x589ff2=>JSON[_0x1b2408(0x5cb)](_0x589ff2));break;case'FUNC':_0x244a02=_0x254548[_0x169664]!==''?new Function(JSON['parse'](_0x254548[_0x169664])):new Function(_0x1b2408(0x322));break;case _0x1b2408(0x48b):_0x1282cc=_0x254548[_0x169664]!==''?JSON['parse'](_0x254548[_0x169664]):[],_0x244a02=_0x1282cc[_0x1b2408(0x1ee)](_0x1a90f4=>new Function(JSON[_0x1b2408(0x5cb)](_0x1a90f4)));break;case _0x1b2408(0x3a4):_0x244a02=_0x254548[_0x169664]!==''?String(_0x254548[_0x169664]):'';break;case'ARRAYSTR':_0x1282cc=_0x254548[_0x169664]!==''?JSON[_0x1b2408(0x5cb)](_0x254548[_0x169664]):[],_0x244a02=_0x1282cc[_0x1b2408(0x1ee)](_0x2ce0c6=>String(_0x2ce0c6));break;case'STRUCT':_0x4395d=_0x254548[_0x169664]!==''?JSON[_0x1b2408(0x5cb)](_0x254548[_0x169664]):{},_0x50cee7[_0x37476a]={},VisuMZ[_0x1b2408(0x442)](_0x50cee7[_0x37476a],_0x4395d);continue;case'ARRAYSTRUCT':_0x1282cc=_0x254548[_0x169664]!==''?JSON[_0x1b2408(0x5cb)](_0x254548[_0x169664]):[],_0x244a02=_0x1282cc[_0x1b2408(0x1ee)](_0x252592=>VisuMZ[_0x1b2408(0x442)]({},JSON['parse'](_0x252592)));break;default:continue;}_0x50cee7[_0x37476a]=_0x244a02;}}return _0x50cee7;},(_0x17f8d5=>{const _0x249aa3=_0x14a1da,_0x37c208=_0x17f8d5[_0x249aa3(0x3e0)];for(const _0x2fbd5c of dependencies){if(!Imported[_0x2fbd5c]){alert(_0x249aa3(0x44f)[_0x249aa3(0x27e)](_0x37c208,_0x2fbd5c)),SceneManager[_0x249aa3(0x36e)]();break;}}const _0x1e58a0=_0x17f8d5[_0x249aa3(0x1b7)];if(_0x1e58a0[_0x249aa3(0x2fb)](/\[Version[ ](.*?)\]/i)){if(_0x249aa3(0x483)!==_0x249aa3(0x467)){const _0x26c5fa=Number(RegExp['$1']);if(_0x26c5fa!==VisuMZ[label][_0x249aa3(0x261)]){if(_0x249aa3(0x1d6)!==_0x249aa3(0x1d6)){function _0x4132b7(){const _0x2778a0=_0x249aa3,_0x1f1c0e=_0x5d548b[_0x2778a0(0x29e)]['indexOf'](_0x1125db(_0x3df399['$1'])[_0x2778a0(0x597)]());return _0x1c34db[_0x2778a0(0x3ed)](_0x3b0e03)&&_0x48b8a4[_0x2778a0(0x1b6)]===_0x1f1c0e;}}else alert(_0x249aa3(0x358)[_0x249aa3(0x27e)](_0x37c208,_0x26c5fa)),SceneManager[_0x249aa3(0x36e)]();}}else{function _0x4518ee(){const _0x2809f8=_0x249aa3,_0x3c6675=this[_0x2809f8(0x201)](this[_0x2809f8(0x4ff)]());let _0x3803d6=this[_0x2809f8(0x275)](this[_0x2809f8(0x4ff)]());_0x3803d6=_0x3803d6['replace'](/\\I\[(\d+)\]/gi,''),_0x1a3aa5[_0x2809f8(0x2ad)](),this[_0x2809f8(0x359)](_0x3803d6,_0x3c6675),this[_0x2809f8(0x289)](_0x3803d6,_0x3c6675),this['commandNameWindowCenter'](_0x3803d6,_0x3c6675);}}}if(_0x1e58a0[_0x249aa3(0x2fb)](/\[Tier[ ](\d+)\]/i)){const _0x1790bf=Number(RegExp['$1']);_0x1790bf<tier?(alert(_0x249aa3(0x47f)['format'](_0x37c208,_0x1790bf,tier)),SceneManager[_0x249aa3(0x36e)]()):tier=Math[_0x249aa3(0x489)](_0x1790bf,tier);}VisuMZ[_0x249aa3(0x442)](VisuMZ[label][_0x249aa3(0x4ad)],_0x17f8d5[_0x249aa3(0x544)]);})(pluginData),PluginManager[_0x14a1da(0x2bc)](pluginData[_0x14a1da(0x3e0)],_0x14a1da(0x5ea),_0x2d1638=>{const _0x4b0aa6=_0x14a1da;VisuMZ[_0x4b0aa6(0x442)](_0x2d1638,_0x2d1638);const _0x861515=_0x2d1638['Actors'][_0x4b0aa6(0x1ee)](_0x1c78c4=>$gameActors[_0x4b0aa6(0x57d)](_0x1c78c4)),_0x498a9e=_0x2d1638[_0x4b0aa6(0x3c7)][_0x4b0aa6(0x1ee)](_0x5a848e=>$dataSystem[_0x4b0aa6(0x60f)][_0x4b0aa6(0x36d)](_0x5a848e[_0x4b0aa6(0x597)]()));for(const _0x47ca58 of _0x861515){if(!_0x47ca58)continue;_0x47ca58[_0x4b0aa6(0x30e)](_0x498a9e);}}),PluginManager[_0x14a1da(0x2bc)](pluginData[_0x14a1da(0x3e0)],_0x14a1da(0x268),_0x4cc9ed=>{const _0x4ecf2d=_0x14a1da;VisuMZ[_0x4ecf2d(0x442)](_0x4cc9ed,_0x4cc9ed);const _0x5a8f25=_0x4cc9ed[_0x4ecf2d(0x405)][_0x4ecf2d(0x1ee)](_0x399fb0=>$gameActors[_0x4ecf2d(0x57d)](_0x399fb0));for(const _0x45204d of _0x5a8f25){if(_0x4ecf2d(0x391)===_0x4ecf2d(0x403)){function _0x43cb11(){const _0x4998d0=_0x4ecf2d;this[_0x4998d0(0x516)][_0x4998d0(0x254)](),this[_0x4998d0(0x539)][_0x4998d0(0x254)](),this[_0x4998d0(0x2a7)]&&(this[_0x4998d0(0x2ad)](),this[_0x4998d0(0x1f3)](!![]),this[_0x4998d0(0x59c)](),this['isEquipItem']()?this[_0x4998d0(0x1f9)]():this[_0x4998d0(0x22d)]());}}else{if(!_0x45204d)continue;_0x45204d[_0x4ecf2d(0x3d3)]();}}}),PluginManager[_0x14a1da(0x2bc)](pluginData['name'],'BatchShop',_0xd5284e=>{const _0x4a1bf1=_0x14a1da;VisuMZ[_0x4a1bf1(0x442)](_0xd5284e,_0xd5284e);const _0x5e6a32=[],_0x55e977=_0xd5284e[_0x4a1bf1(0x37e)]['map'](_0x4b9c1c=>_0x4b9c1c['toUpperCase']()[_0x4a1bf1(0x597)]()),_0x1f1791=_0xd5284e[_0x4a1bf1(0x331)][_0x4a1bf1(0x1ee)](_0x55f41f=>_0x55f41f[_0x4a1bf1(0x437)]()[_0x4a1bf1(0x597)]()),_0x489d1f=_0xd5284e[_0x4a1bf1(0x454)]>=_0xd5284e['Step1Start']?_0xd5284e[_0x4a1bf1(0x418)]:_0xd5284e[_0x4a1bf1(0x454)],_0x4967ad=_0xd5284e[_0x4a1bf1(0x454)]>=_0xd5284e[_0x4a1bf1(0x418)]?_0xd5284e[_0x4a1bf1(0x454)]:_0xd5284e[_0x4a1bf1(0x418)],_0xd67015=Array(_0x4967ad-_0x489d1f+0x1)[_0x4a1bf1(0x2b9)]()[_0x4a1bf1(0x1ee)]((_0x350335,_0x4b0363)=>_0x489d1f+_0x4b0363);for(const _0x63bc98 of _0xd67015){const _0x3a18e8=$dataItems[_0x63bc98];if(!_0x3a18e8)continue;if(!VisuMZ[_0x4a1bf1(0x209)]['IncludeShopItem'](_0x3a18e8,_0x55e977,_0x1f1791))continue;_0x5e6a32['push']([0x0,_0x63bc98,0x0,_0x3a18e8[_0x4a1bf1(0x2fa)]]);}const _0x339c09=_0xd5284e[_0x4a1bf1(0x335)]>=_0xd5284e[_0x4a1bf1(0x4e1)]?_0xd5284e[_0x4a1bf1(0x4e1)]:_0xd5284e[_0x4a1bf1(0x335)],_0xdac613=_0xd5284e[_0x4a1bf1(0x335)]>=_0xd5284e['Step2Start']?_0xd5284e['Step2End']:_0xd5284e[_0x4a1bf1(0x4e1)],_0x46b306=Array(_0xdac613-_0x339c09+0x1)['fill']()['map']((_0x57e894,_0x3a51e0)=>_0x339c09+_0x3a51e0);for(const _0x4b25a4 of _0x46b306){const _0x739599=$dataWeapons[_0x4b25a4];if(!_0x739599)continue;if(!VisuMZ[_0x4a1bf1(0x209)][_0x4a1bf1(0x3bd)](_0x739599,_0x55e977,_0x1f1791))continue;_0x5e6a32[_0x4a1bf1(0x1d2)]([0x1,_0x4b25a4,0x0,_0x739599[_0x4a1bf1(0x2fa)]]);}const _0x5792eb=_0xd5284e[_0x4a1bf1(0x30d)]>=_0xd5284e['Step3Start']?_0xd5284e[_0x4a1bf1(0x1d1)]:_0xd5284e['Step3End'],_0x2e2c07=_0xd5284e[_0x4a1bf1(0x30d)]>=_0xd5284e[_0x4a1bf1(0x1d1)]?_0xd5284e['Step3End']:_0xd5284e[_0x4a1bf1(0x1d1)],_0x49cff3=Array(_0x2e2c07-_0x5792eb+0x1)[_0x4a1bf1(0x2b9)]()[_0x4a1bf1(0x1ee)]((_0x5c6751,_0x4cd53f)=>_0x5792eb+_0x4cd53f);for(const _0x2f91bd of _0x49cff3){if(_0x4a1bf1(0x477)===_0x4a1bf1(0x2db)){function _0x508bc4(){const _0xe4265a=_0x4a1bf1;return this[_0xe4265a(0x590)]();}}else{const _0x5be637=$dataArmors[_0x2f91bd];if(!_0x5be637)continue;if(!VisuMZ['ItemsEquipsCore']['IncludeShopItem'](_0x5be637,_0x55e977,_0x1f1791))continue;_0x5e6a32['push']([0x2,_0x2f91bd,0x0,_0x5be637[_0x4a1bf1(0x2fa)]]);}}SceneManager['push'](Scene_Shop),SceneManager[_0x4a1bf1(0x570)](_0x5e6a32,_0xd5284e[_0x4a1bf1(0x1e3)]);}),VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x3bd)]=function(_0x2bc8e1,_0x27a0e9,_0x553c3e){const _0xd0129c=_0x14a1da;if(_0x2bc8e1[_0xd0129c(0x3e0)]['trim']()==='')return![];if(_0x2bc8e1[_0xd0129c(0x3e0)][_0xd0129c(0x2fb)](/-----/i))return![];const _0x1ef0e1=_0x2bc8e1[_0xd0129c(0x34a)];if(_0x27a0e9[_0xd0129c(0x2ab)]>0x0)for(const _0x39dcfc of _0x27a0e9){if(!_0x39dcfc)continue;if(_0x1ef0e1[_0xd0129c(0x243)](_0x39dcfc))return![];}if(_0x553c3e['length']>0x0){if(_0xd0129c(0x28d)===_0xd0129c(0x28d)){for(const _0x2f0b15 of _0x553c3e){if(!_0x2f0b15)continue;if(_0x1ef0e1[_0xd0129c(0x243)](_0x2f0b15))return!![];}return![];}else{function _0x12a72f(){const _0x44df79=_0xd0129c;if(_0x1a0de4['isPlaytest']())_0x51350b[_0x44df79(0x20e)](_0x44cc49);}}}return!![];},VisuMZ[_0x14a1da(0x209)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x14a1da(0x1a8)][_0x14a1da(0x3cc)],Scene_Boot[_0x14a1da(0x1a8)][_0x14a1da(0x3cc)]=function(){const _0x2daa66=_0x14a1da;this['process_VisuMZ_ItemsEquipsCore_RegExp'](),VisuMZ['ItemsEquipsCore'][_0x2daa66(0x4c6)][_0x2daa66(0x593)](this),this[_0x2daa66(0x325)]();},Scene_Boot[_0x14a1da(0x1a8)][_0x14a1da(0x392)]=function(){const _0x16b95d=_0x14a1da;VisuMZ[_0x16b95d(0x209)][_0x16b95d(0x4df)]={},VisuMZ[_0x16b95d(0x209)][_0x16b95d(0x4df)][_0x16b95d(0x1e6)]=[],VisuMZ[_0x16b95d(0x209)][_0x16b95d(0x4df)][_0x16b95d(0x2eb)]=[];const _0x13a136=['MaxHP',_0x16b95d(0x587),_0x16b95d(0x428),'DEF','MAT',_0x16b95d(0x3cd),_0x16b95d(0x3fb),_0x16b95d(0x434)];for(const _0x4353d5 of _0x13a136){if(_0x16b95d(0x1ab)!=='uPCma'){const _0x446c72=_0x16b95d(0x5c8)[_0x16b95d(0x27e)](_0x4353d5);VisuMZ[_0x16b95d(0x209)][_0x16b95d(0x4df)][_0x16b95d(0x1e6)][_0x16b95d(0x1d2)](new RegExp(_0x446c72,'i'));const _0x5d021b=_0x16b95d(0x3f6)[_0x16b95d(0x27e)](_0x4353d5);VisuMZ[_0x16b95d(0x209)][_0x16b95d(0x4df)][_0x16b95d(0x2eb)][_0x16b95d(0x1d2)](new RegExp(_0x5d021b,'g'));}else{function _0x113e0d(){const _0x4cdc7c=_0x16b95d,_0x551b3d='USER\x20TP\x20GAIN';if(this[_0x4cdc7c(0x217)][_0x4cdc7c(0x3e6)]===0x0&&!this[_0x4cdc7c(0x416)][_0x551b3d])return![];const _0x1febb0=this[_0x4cdc7c(0x54f)]();this[_0x4cdc7c(0x4cc)](_0x1febb0,_0x5b5732,_0x39f18d,_0xff5726,!![]);const _0x4885ad=this[_0x4cdc7c(0x56d)]();return this[_0x4cdc7c(0x217)][_0x4cdc7c(0x3e6)]>0x0?this[_0x4cdc7c(0x1ce)](_0x3aef0b[_0x4cdc7c(0x362)]()):this[_0x4cdc7c(0x1ce)](_0xf96a9['powerDownColor']()),this[_0x4cdc7c(0x4cc)](_0x4885ad,_0x42c56b,_0x364473,_0x57785b,![],_0x4cdc7c(0x547)),this[_0x4cdc7c(0x5f2)](_0x124cdb,_0x32c1e2,_0xf9470b),this[_0x4cdc7c(0x2ad)](),!![];}}}},Scene_Boot[_0x14a1da(0x1a8)]['process_VisuMZ_ItemsEquipsCore_Notetags']=function(){const _0x75ef1a=_0x14a1da;if(VisuMZ[_0x75ef1a(0x32c)])return;this[_0x75ef1a(0x3dc)]();const _0x2be6fb=[$dataItems,$dataWeapons,$dataArmors];for(const _0x21c141 of _0x2be6fb){for(const _0x13312c of _0x21c141){if(_0x75ef1a(0x3b4)===_0x75ef1a(0x417)){function _0xb0c410(){const _0x2c1d6b=_0x75ef1a;if(this[_0x2c1d6b(0x3de)](_0xc4d7df))this['changeEquip'](_0x5a2841,null);}}else{if(!_0x13312c)continue;VisuMZ['ItemsEquipsCore'][_0x75ef1a(0x452)](_0x13312c,_0x21c141),VisuMZ[_0x75ef1a(0x209)][_0x75ef1a(0x527)](_0x13312c,_0x21c141),VisuMZ[_0x75ef1a(0x209)]['Parse_Notetags_ParamValues'](_0x13312c,_0x21c141),VisuMZ[_0x75ef1a(0x209)][_0x75ef1a(0x401)](_0x13312c,_0x21c141),VisuMZ[_0x75ef1a(0x209)][_0x75ef1a(0x3ad)](_0x13312c,_0x21c141);}}}},Scene_Boot['prototype']['process_VisuMZ_ItemsEquipsCore_EquipSlots']=function(){const _0xdc75dc=_0x14a1da;for(const _0x52beb1 of $dataClasses){if(!_0x52beb1)continue;VisuMZ[_0xdc75dc(0x209)]['Parse_Notetags_EquipSlots'](_0x52beb1);}},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x26c)]=VisuMZ[_0x14a1da(0x26c)],VisuMZ[_0x14a1da(0x26c)]=function(_0x5be771){const _0x107292=_0x14a1da;VisuMZ['ItemsEquipsCore'][_0x107292(0x26c)][_0x107292(0x593)](this,_0x5be771),VisuMZ[_0x107292(0x209)][_0x107292(0x312)](_0x5be771);},VisuMZ['ItemsEquipsCore']['ParseItemNotetags']=VisuMZ[_0x14a1da(0x2d5)],VisuMZ[_0x14a1da(0x2d5)]=function(_0x4a4444){const _0x24d763=_0x14a1da;VisuMZ['ItemsEquipsCore']['ParseItemNotetags'][_0x24d763(0x593)](this,_0x4a4444),VisuMZ[_0x24d763(0x209)]['Parse_Notetags_Batch'](_0x4a4444,$dataItems);},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x5c1)]=VisuMZ[_0x14a1da(0x5c1)],VisuMZ[_0x14a1da(0x5c1)]=function(_0x2918c5){const _0x2a7fe2=_0x14a1da;VisuMZ['ItemsEquipsCore']['ParseWeaponNotetags'][_0x2a7fe2(0x593)](this,_0x2918c5),VisuMZ['ItemsEquipsCore'][_0x2a7fe2(0x5ab)](_0x2918c5,$dataWeapons);},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x246)]=VisuMZ[_0x14a1da(0x246)],VisuMZ['ParseArmorNotetags']=function(_0x393d38){const _0x42123b=_0x14a1da;VisuMZ[_0x42123b(0x209)][_0x42123b(0x246)][_0x42123b(0x593)](this,_0x393d38),VisuMZ[_0x42123b(0x209)][_0x42123b(0x5ab)](_0x393d38,$dataArmors);},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x312)]=function(_0x42d93f){const _0xe4189c=_0x14a1da;_0x42d93f[_0xe4189c(0x2c9)]=[];if(!BattleManager[_0xe4189c(0x5b3)]()&&_0x42d93f['note'][_0xe4189c(0x2fb)](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){const _0x4a4daa=String(RegExp['$1'])[_0xe4189c(0x4d1)](/[\r\n]+/);for(const _0x5d704a of _0x4a4daa){const _0x2dd198=$dataSystem['equipTypes']['indexOf'](_0x5d704a[_0xe4189c(0x597)]());if(_0x2dd198>0x0)_0x42d93f[_0xe4189c(0x2c9)][_0xe4189c(0x1d2)](_0x2dd198);}}else for(const _0x599ac2 of $dataSystem[_0xe4189c(0x60f)]){if(_0xe4189c(0x269)===_0xe4189c(0x27a)){function _0x37103b(){const _0x4752d5=_0xe4189c;if(!_0x3f1f06[_0x4752d5(0x37c)](_0x522847))return![];}}else{const _0x559e1f=$dataSystem[_0xe4189c(0x60f)]['indexOf'](_0x599ac2[_0xe4189c(0x597)]());if(_0x559e1f>0x0)_0x42d93f[_0xe4189c(0x2c9)][_0xe4189c(0x1d2)](_0x559e1f);}}},VisuMZ['ItemsEquipsCore']['Parse_Notetags_Batch']=function(_0x58469d,_0x3c1365){const _0x102dc0=_0x14a1da;VisuMZ['ItemsEquipsCore']['Parse_Notetags_Category'](_0x58469d,_0x3c1365),VisuMZ['ItemsEquipsCore']['Parse_Notetags_Prices'](_0x58469d,_0x3c1365),VisuMZ[_0x102dc0(0x209)][_0x102dc0(0x3f5)](_0x58469d,_0x3c1365),VisuMZ['ItemsEquipsCore']['Parse_Notetags_ParamJS'](_0x58469d,_0x3c1365),VisuMZ[_0x102dc0(0x209)]['Parse_Notetags_EnableJS'](_0x58469d,_0x3c1365);},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x452)]=function(_0x3744f0,_0x58ada7){const _0x4b443b=_0x14a1da;_0x3744f0[_0x4b443b(0x34a)]=[];const _0x243472=_0x3744f0['note'],_0x393a28=_0x243472[_0x4b443b(0x2fb)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x393a28){if('rFnfG'!=='rFnfG'){function _0x3878ee(){const _0x41be25=_0x4b443b;return this[_0x41be25(0x526)]()?this[_0x41be25(0x24c)]():_0x1e5084[_0x41be25(0x209)][_0x41be25(0x605)][_0x41be25(0x593)](this);}}else for(const _0x926e43 of _0x393a28){if(_0x4b443b(0x4d7)===_0x4b443b(0x4d7)){_0x926e43['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x3f5a31=String(RegExp['$1'])[_0x4b443b(0x437)]()[_0x4b443b(0x597)]()[_0x4b443b(0x4d1)](',');for(const _0x1d263a of _0x3f5a31){if(_0x4b443b(0x409)!==_0x4b443b(0x400))_0x3744f0[_0x4b443b(0x34a)][_0x4b443b(0x1d2)](_0x1d263a[_0x4b443b(0x597)]());else{function _0x58a2b9(){const _0x5ca760=_0x4b443b,_0x2bfdaa=this['index']();return _0x1e5621['isPressed'](_0x5ca760(0x55e))?this[_0x5ca760(0x24d)]():this[_0x5ca760(0x444)](_0x5ea5b5[_0x5ca760(0x4a8)]('down')),this[_0x5ca760(0x4ff)]()!==_0x2bfdaa&&this['playCursorSound'](),!![];}}}}else{function _0x178271(){const _0x4abf19=_0x4b443b;this[_0x4abf19(0x39e)]();}}}}if(_0x243472['match'](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){if(_0x4b443b(0x4bd)!==_0x4b443b(0x3cb)){const _0x4bd092=RegExp['$1'][_0x4b443b(0x4d1)](/[\r\n]+/);for(const _0x936aa5 of _0x4bd092){_0x3744f0[_0x4b443b(0x34a)][_0x4b443b(0x1d2)](_0x936aa5['toUpperCase']()[_0x4b443b(0x597)]());}}else{function _0x22a27c(){_0x23d010['prototype']['isRightInputMode']['call'](this);}}}},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x527)]=function(_0x1cc394,_0x59484c){const _0x58f168=_0x14a1da;if(_0x1cc394[_0x58f168(0x214)][_0x58f168(0x2fb)](/<PRICE:[ ](\d+)>/i)){if(_0x58f168(0x60c)==='YOrFS'){function _0x1dee2c(){const _0x9a390d=_0x58f168;return _0x190ad1['ItemsEquipsCore'][_0x9a390d(0x1da)][_0x9a390d(0x593)](this);}}else _0x1cc394[_0x58f168(0x2fa)]=Number(RegExp['$1']);}},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x3f5)]=function(_0x71c16,_0x30f2f5){const _0xb9d3d7=_0x14a1da;if(_0x30f2f5===$dataItems)return;for(let _0x22fa9a=0x0;_0x22fa9a<0x8;_0x22fa9a++){const _0x5a5ba5=VisuMZ[_0xb9d3d7(0x209)][_0xb9d3d7(0x4df)][_0xb9d3d7(0x1e6)][_0x22fa9a];_0x71c16[_0xb9d3d7(0x214)][_0xb9d3d7(0x2fb)](_0x5a5ba5)&&(_0x71c16[_0xb9d3d7(0x230)][_0x22fa9a]=parseInt(RegExp['$1']));}},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x3ff)]={},VisuMZ[_0x14a1da(0x209)]['Parse_Notetags_ParamJS']=function(_0x3791da,_0x4fb01b){const _0x1e230d=_0x14a1da;if(_0x4fb01b===$dataItems)return;if(_0x3791da['note'][_0x1e230d(0x2fb)](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x2c9979=String(RegExp['$1']),_0x787ac0=(_0x4fb01b===$dataWeapons?'W%1':_0x1e230d(0x578))[_0x1e230d(0x27e)](_0x3791da['id']),_0x1dbc14=_0x1e230d(0x576)[_0x1e230d(0x27e)](_0x2c9979);for(let _0x463ea4=0x0;_0x463ea4<0x8;_0x463ea4++){if(_0x1e230d(0x459)===_0x1e230d(0x5c2)){function _0xf862ba(){_0x49eda3(_0x2600ef);}}else{if(_0x2c9979[_0x1e230d(0x2fb)](VisuMZ[_0x1e230d(0x209)][_0x1e230d(0x4df)][_0x1e230d(0x2eb)][_0x463ea4])){const _0x265ebe=_0x1e230d(0x2b1)['format'](_0x787ac0,_0x463ea4);VisuMZ[_0x1e230d(0x209)][_0x1e230d(0x3ff)][_0x265ebe]=new Function(_0x1e230d(0x424),_0x1e230d(0x1f1),_0x1dbc14);}}}}},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x306)]={},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x3ad)]=function(_0x4c2bca,_0x2ab42f){const _0x1ea67d=_0x14a1da;if(_0x2ab42f!==$dataItems)return;if(_0x4c2bca['note'][_0x1ea67d(0x2fb)](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){if(_0x1ea67d(0x608)===_0x1ea67d(0x381)){function _0x3317fe(){const _0x4e0d9a=_0x1ea67d,_0x1b3672=_0x1dab10['x']+_0x33684c[_0x4e0d9a(0x4d0)]((_0x663c0d[_0x4e0d9a(0x379)]-_0x3214be)/0x2);this[_0x4e0d9a(0x3bf)](_0x1076f2,_0x1b3672,_0x12b1bb['y'],_0x36cf5b);}}else{const _0x4cd43d=String(RegExp['$1']),_0x118797=_0x1ea67d(0x41b)[_0x1ea67d(0x27e)](_0x4cd43d);VisuMZ[_0x1ea67d(0x209)]['itemEnableJS'][_0x4c2bca['id']]=new Function(_0x1ea67d(0x424),_0x118797);}}},DataManager['isKeyItem']=function(_0x51eee3){const _0x576ca2=_0x14a1da;return this[_0x576ca2(0x4ac)](_0x51eee3)&&_0x51eee3['itypeId']===0x2;},DataManager[_0x14a1da(0x324)]=function(_0x21d90d){const _0x5be6ad=_0x14a1da;if(!_0x21d90d)return 0x63;else{if(_0x21d90d['note'][_0x5be6ad(0x2fb)](/<MAX:[ ](\d+)>/i))return parseInt(RegExp['$1']);else{if(_0x5be6ad(0x5af)==='XHiJC'){function _0x558891(){const _0x245fe8=_0x5be6ad;_0x1c3a9f=_0x245fe8(0x51a)[_0x245fe8(0x27e)](_0x302568['id']);}}else return this[_0x5be6ad(0x1a5)](_0x21d90d);}}},DataManager[_0x14a1da(0x1a5)]=function(_0x1e9e02){const _0x4e27a2=_0x14a1da;if(this[_0x4e27a2(0x4ac)](_0x1e9e02)){if(_0x4e27a2(0x4e5)!==_0x4e27a2(0x39a))return VisuMZ[_0x4e27a2(0x209)][_0x4e27a2(0x4ad)][_0x4e27a2(0x5da)][_0x4e27a2(0x2ac)];else{function _0x15b268(){const _0x1a8a53=_0x4e27a2;this[_0x1a8a53(0x3bf)](_0x263f77,_0x3874c6['x']+_0x2c6c1b[_0x1a8a53(0x379)]-_0x20a9a6,_0x1c6dca['y'],_0x4d1bd3);}}}else{if(this['isWeapon'](_0x1e9e02)){if('HdQBZ'===_0x4e27a2(0x4f3))return VisuMZ['ItemsEquipsCore'][_0x4e27a2(0x4ad)][_0x4e27a2(0x5da)][_0x4e27a2(0x205)];else{function _0x3336a6(){const _0x25934e=_0x4e27a2;return _0x22f912[_0x25934e(0x209)]['Settings'][_0x25934e(0x5da)]['MaxItems'];}}}else{if(this[_0x4e27a2(0x242)](_0x1e9e02)){if(_0x4e27a2(0x3a2)!==_0x4e27a2(0x3a2)){function _0x36215b(){const _0x38dd73=_0x4e27a2;_0x47e229+=_0x107e9e[_0x38dd73(0x302)]+0x4;}}else return VisuMZ[_0x4e27a2(0x209)][_0x4e27a2(0x4ad)][_0x4e27a2(0x5da)][_0x4e27a2(0x4a9)];}}}},ColorManager[_0x14a1da(0x376)]=function(_0x49e0db){const _0x4f8dd2=_0x14a1da;if(!_0x49e0db)return this['normalColor']();else{if(_0x49e0db[_0x4f8dd2(0x214)][_0x4f8dd2(0x2fb)](/<COLOR:[ ](\d+)>/i))return this['textColor'](Number(RegExp['$1'])[_0x4f8dd2(0x4fb)](0x0,0x1f));else{if(_0x49e0db[_0x4f8dd2(0x214)][_0x4f8dd2(0x2fb)](/<COLOR:[ ]#(.*)>/i))return'#'+String(RegExp['$1']);else{if('ohHlc'===_0x4f8dd2(0x5a9))return this[_0x4f8dd2(0x309)]();else{function _0x184203(){return _0x17bd1f(_0x576777['$1']);}}}}}},ColorManager[_0x14a1da(0x1fd)]=function(_0x3494a4){const _0x3c36fc=_0x14a1da;_0x3494a4=String(_0x3494a4);if(_0x3494a4['match'](/#(.*)/i))return _0x3c36fc(0x2dd)[_0x3c36fc(0x27e)](String(RegExp['$1']));else{if(_0x3c36fc(0x216)!==_0x3c36fc(0x29d))return this[_0x3c36fc(0x5d9)](Number(_0x3494a4));else{function _0x1ffa16(){const _0x563b0f=_0x3c36fc;return this[_0x563b0f(0x421)]();}}}},SceneManager['isSceneShop']=function(){const _0x2b5f15=_0x14a1da;return this[_0x2b5f15(0x33b)]&&this[_0x2b5f15(0x33b)][_0x2b5f15(0x38d)]===Scene_Shop;},Game_Temp['prototype']['newLabelEnabled']=function(){const _0x5580ed=_0x14a1da;if(this[_0x5580ed(0x2d1)])return![];return VisuMZ[_0x5580ed(0x209)][_0x5580ed(0x4ad)]['New']['Enable'];},VisuMZ[_0x14a1da(0x5ec)]=VisuMZ[_0x14a1da(0x209)]['Settings'][_0x14a1da(0x3d4)][_0x14a1da(0x1ea)],VisuMZ['ItemsEquipsCore'][_0x14a1da(0x238)]=Game_BattlerBase[_0x14a1da(0x1a8)][_0x14a1da(0x609)],Game_BattlerBase[_0x14a1da(0x1a8)][_0x14a1da(0x609)]=function(_0x4a9da9){const _0x2b1fef=_0x14a1da;if(this[_0x2b1fef(0x301)]){if(_0x2b1fef(0x530)==='hESfd'){function _0x2fa3b3(){const _0x4086dc=_0x2b1fef,_0x1649dc=this[_0x4086dc(0x2c9)]()[_0x4086dc(0x2ab)];for(let _0x54f7bc=0x0;_0x54f7bc<_0x1649dc;_0x54f7bc++){if(this[_0x4086dc(0x3de)](_0x54f7bc))this['changeEquip'](_0x54f7bc,null);}}}else return this['_shopStatusMenuAlly']?VisuMZ[_0x2b1fef(0x5ec)]:0x1;}else return VisuMZ[_0x2b1fef(0x209)][_0x2b1fef(0x238)]['call'](this,_0x4a9da9);},VisuMZ[_0x14a1da(0x209)]['Game_BattlerBase_meetsItemConditions']=Game_BattlerBase[_0x14a1da(0x1a8)]['meetsItemConditions'],Game_BattlerBase[_0x14a1da(0x1a8)]['meetsItemConditions']=function(_0xc82c91){const _0x2c0ba5=_0x14a1da;if(!_0xc82c91)return![];if(!VisuMZ[_0x2c0ba5(0x209)][_0x2c0ba5(0x2b4)][_0x2c0ba5(0x593)](this,_0xc82c91))return![];if(!this[_0x2c0ba5(0x2ba)](_0xc82c91))return![];if(!this[_0x2c0ba5(0x57c)](_0xc82c91))return![];return!![];},Game_BattlerBase[_0x14a1da(0x1a8)][_0x14a1da(0x2ba)]=function(_0x3a983b){const _0x2af932=_0x14a1da;if(!this[_0x2af932(0x41d)](_0x3a983b))return![];return!![];},Game_BattlerBase[_0x14a1da(0x1a8)][_0x14a1da(0x41d)]=function(_0x97e8ad){const _0x8935e5=_0x14a1da,_0x54f6f8=_0x97e8ad[_0x8935e5(0x214)];if(_0x54f6f8[_0x8935e5(0x2fb)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2d36e8=JSON[_0x8935e5(0x5cb)]('['+RegExp['$1'][_0x8935e5(0x2fb)](/\d+/g)+']');for(const _0x5d41d3 of _0x2d36e8){if(!$gameSwitches[_0x8935e5(0x37c)](_0x5d41d3))return![];}return!![];}if(_0x54f6f8[_0x8935e5(0x2fb)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('OgpPx'!==_0x8935e5(0x1b5)){const _0xaf9a8c=JSON[_0x8935e5(0x5cb)]('['+RegExp['$1'][_0x8935e5(0x2fb)](/\d+/g)+']');for(const _0xf7fd of _0xaf9a8c){if(!$gameSwitches[_0x8935e5(0x37c)](_0xf7fd))return![];}return!![];}else{function _0x14be9d(){const _0xf5424a=_0x8935e5,_0x127a90=this[_0xf5424a(0x3fe)](_0x3ce767);_0x127a90?_0x44ac77[_0xf5424a(0x1a8)][_0xf5424a(0x1d3)][_0xf5424a(0x593)](this,_0x54f5fc):this[_0xf5424a(0x4f9)](_0x275a63);}}}if(_0x54f6f8[_0x8935e5(0x2fb)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x8935e5(0x50f)!==_0x8935e5(0x50f)){function _0x8b56be(){const _0x5731a5=_0x8935e5;return this[_0x5731a5(0x1a9)]();}}else{const _0x930c33=JSON[_0x8935e5(0x5cb)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x201521 of _0x930c33){if(_0x8935e5(0x4f6)!=='csswz'){function _0x2cccaf(){const _0x2f079d=_0x8935e5;_0x3de309=this['convertInitEquipsToItems'](_0x4ba440);const _0x5da5c3=this[_0x2f079d(0x2c9)]();this[_0x2f079d(0x46c)]=[];for(let _0x3e8642=0x0;_0x3e8642<_0x5da5c3[_0x2f079d(0x2ab)];_0x3e8642++){this[_0x2f079d(0x46c)][_0x3e8642]=new _0x5a4ea9();}for(let _0x428aa4=0x0;_0x428aa4<_0x5da5c3['length'];_0x428aa4++){const _0x18c058=_0x5da5c3[_0x428aa4],_0x2fd0e9=this[_0x2f079d(0x2a2)](_0x5f3653,_0x18c058);if(this[_0x2f079d(0x614)](_0x2fd0e9))this[_0x2f079d(0x46c)][_0x428aa4][_0x2f079d(0x3c3)](_0x2fd0e9);}this[_0x2f079d(0x2cb)](!![]),this[_0x2f079d(0x21e)]();}}else{if($gameSwitches['value'](_0x201521))return!![];}}return![];}}if(_0x54f6f8[_0x8935e5(0x2fb)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x47efb6=JSON[_0x8935e5(0x5cb)]('['+RegExp['$1'][_0x8935e5(0x2fb)](/\d+/g)+']');for(const _0x31337c of _0x47efb6){if(_0x8935e5(0x3ec)!==_0x8935e5(0x3ec)){function _0x581617(){const _0x155760=_0x8935e5;return _0x1fa088[_0x155760(0x42d)]&&_0x46a9e9[_0x155760(0x1a8)][_0x155760(0x50c)][_0x155760(0x593)](this);}}else{if(!$gameSwitches['value'](_0x31337c))return!![];}}return![];}if(_0x54f6f8['match'](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x526f1f=JSON[_0x8935e5(0x5cb)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5d695c of _0x526f1f){if(!$gameSwitches[_0x8935e5(0x37c)](_0x5d695c))return!![];}return![];}if(_0x54f6f8[_0x8935e5(0x2fb)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('FEfLY'===_0x8935e5(0x429)){const _0x1c395c=JSON[_0x8935e5(0x5cb)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x192984 of _0x1c395c){if($gameSwitches[_0x8935e5(0x37c)](_0x192984))return![];}return!![];}else{function _0x2c5f92(){const _0x117151=_0x8935e5;_0x276b3d=this[_0x117151(0x20d)][_0x117151(0x35f)](_0x396bfe,!![]);}}}return!![];},Game_BattlerBase[_0x14a1da(0x1a8)]['meetsItemConditionsJS']=function(_0x107c43){const _0x1fe367=_0x14a1da,_0x2600b5=_0x107c43[_0x1fe367(0x214)],_0x2c8e8a=VisuMZ[_0x1fe367(0x209)][_0x1fe367(0x306)];return _0x2c8e8a[_0x107c43['id']]?_0x2c8e8a[_0x107c43['id']][_0x1fe367(0x593)](this,_0x107c43):!![];},Game_Actor['prototype'][_0x14a1da(0x51c)]=function(_0x2e9942){const _0x2587fb=_0x14a1da;_0x2e9942=this['convertInitEquipsToItems'](_0x2e9942);const _0x545d76=this[_0x2587fb(0x2c9)]();this[_0x2587fb(0x46c)]=[];for(let _0x120242=0x0;_0x120242<_0x545d76[_0x2587fb(0x2ab)];_0x120242++){this['_equips'][_0x120242]=new Game_Item();}for(let _0x49306b=0x0;_0x49306b<_0x545d76[_0x2587fb(0x2ab)];_0x49306b++){const _0x57e688=_0x545d76[_0x49306b],_0x6ffba9=this['getMatchingInitEquip'](_0x2e9942,_0x57e688);if(this['canEquip'](_0x6ffba9))this[_0x2587fb(0x46c)][_0x49306b][_0x2587fb(0x3c3)](_0x6ffba9);}this[_0x2587fb(0x2cb)](!![]),this[_0x2587fb(0x21e)]();},Game_Actor['prototype'][_0x14a1da(0x3b5)]=function(_0x191c69){const _0x3a65f1=_0x14a1da,_0x188947=[];for(let _0x548df4=0x0;_0x548df4<_0x191c69[_0x3a65f1(0x2ab)];_0x548df4++){const _0x487777=_0x191c69[_0x548df4];if(_0x487777<=0x0)continue;const _0x53b4c8=$dataSystem[_0x3a65f1(0x60f)][_0x548df4+0x1];if(_0x53b4c8===$dataSystem[_0x3a65f1(0x60f)][0x1]||_0x548df4===0x1&&this[_0x3a65f1(0x1fc)]())_0x188947[_0x3a65f1(0x1d2)]($dataWeapons[_0x487777]);else{if(BattleManager['isBattleTest']()){const _0x40bdb0=$dataArmors[_0x487777];_0x40bdb0[_0x3a65f1(0x308)]===_0x548df4+0x1&&_0x188947['push'](_0x40bdb0);}else _0x188947[_0x3a65f1(0x1d2)]($dataArmors[_0x487777]);}}return _0x188947;},Game_Actor['prototype'][_0x14a1da(0x2a2)]=function(_0x396185,_0x42af1c){const _0x18da16=_0x14a1da;for(const _0x2a9171 of _0x396185){if(!_0x2a9171)continue;if(_0x2a9171[_0x18da16(0x308)]===_0x42af1c)return _0x396185[_0x18da16(0x258)](_0x396185[_0x18da16(0x36d)](_0x2a9171),0x1),_0x2a9171;}return null;},Game_Actor['prototype'][_0x14a1da(0x2c9)]=function(){const _0x2fea90=_0x14a1da,_0x330c2c=JsonEx['makeDeepCopy'](this['_forcedSlots']||this['currentClass']()['equipSlots']);if(_0x330c2c['length']>=0x2&&this[_0x2fea90(0x1fc)]())_0x330c2c[0x1]=0x1;return _0x330c2c;},Game_Actor[_0x14a1da(0x1a8)]['forceChangeEquipSlots']=function(_0x5cdb0a){const _0x3833ae=_0x14a1da;_0x5cdb0a[_0x3833ae(0x4d2)](0x0),_0x5cdb0a[_0x3833ae(0x4d2)](-0x1),this['_forcedSlots']=_0x5cdb0a,this['refresh'](),this[_0x3833ae(0x249)]();},Game_Actor[_0x14a1da(0x1a8)][_0x14a1da(0x3d3)]=function(){const _0x4f1938=_0x14a1da;this[_0x4f1938(0x491)]=undefined,this[_0x4f1938(0x21e)](),this[_0x4f1938(0x249)]();},Game_Actor[_0x14a1da(0x1a8)][_0x14a1da(0x249)]=function(){const _0x1d1e5f=_0x14a1da;let _0x5c4b4d=this[_0x1d1e5f(0x2c9)]()[_0x1d1e5f(0x2ab)];while(this[_0x1d1e5f(0x46c)][_0x1d1e5f(0x2ab)]>_0x5c4b4d){const _0x1e5401=this[_0x1d1e5f(0x46c)][this[_0x1d1e5f(0x46c)][_0x1d1e5f(0x2ab)]-0x1];_0x1e5401&&_0x1e5401[_0x1d1e5f(0x50e)]()&&$gameParty[_0x1d1e5f(0x55c)](_0x1e5401[_0x1d1e5f(0x50e)](),0x1),this[_0x1d1e5f(0x46c)][_0x1d1e5f(0x40f)]();}while(_0x5c4b4d>this[_0x1d1e5f(0x46c)][_0x1d1e5f(0x2ab)]){this[_0x1d1e5f(0x46c)][_0x1d1e5f(0x1d2)](new Game_Item());}},Game_Actor[_0x14a1da(0x1a8)][_0x14a1da(0x5ad)]=function(){const _0x4fcd60=_0x14a1da,_0x469ff7=this[_0x4fcd60(0x2c9)]();for(let _0x4ca2a5=0x0;_0x4ca2a5<_0x469ff7[_0x4fcd60(0x2ab)];_0x4ca2a5++){if(_0x4fcd60(0x271)!==_0x4fcd60(0x4c1)){if(!this[_0x4fcd60(0x46c)][_0x4ca2a5])this[_0x4fcd60(0x46c)][_0x4ca2a5]=new Game_Item();}else{function _0x3a9017(){const _0x39ad4f=_0x4fcd60,_0x329544=_0x38a4c4[_0x39ad4f(0x209)][_0x39ad4f(0x4ad)][_0x39ad4f(0x2c5)],_0x247844=_0x329544['Text'];if(_0x247844==='')return;const _0xe58c0b=_0x3d167d['iconWidth'],_0x168703=_0x4252c5['iconHeight'];this[_0x39ad4f(0x463)][_0x39ad4f(0x556)]=_0x329544['FontFace']||_0x4dca7e['mainFontFace'](),this['bitmap']['textColor']=this[_0x39ad4f(0x2c6)](),this[_0x39ad4f(0x463)][_0x39ad4f(0x337)]=_0x329544['FontSize'],this['bitmap']['drawText'](_0x247844,0x0,_0x168703/0x2,_0xe58c0b,_0x168703/0x2,'center');}}}this[_0x4fcd60(0x2cb)](![]),this[_0x4fcd60(0x21e)]();},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x233)]=Game_Actor[_0x14a1da(0x1a8)]['changeEquip'],Game_Actor[_0x14a1da(0x1a8)]['changeEquip']=function(_0x2a6cc3,_0x27690f){const _0x4e6cba=_0x14a1da;if(!this[_0x4e6cba(0x1d7)]){const _0x12eb33=JsonEx[_0x4e6cba(0x4e7)](this);_0x12eb33[_0x4e6cba(0x1d7)]=!![],VisuMZ[_0x4e6cba(0x209)][_0x4e6cba(0x233)][_0x4e6cba(0x593)](this,_0x2a6cc3,_0x27690f),this[_0x4e6cba(0x334)](_0x12eb33);}else{if('qiUzS'===_0x4e6cba(0x402)){function _0x45dbab(){const _0x57e2a8=_0x4e6cba;_0x32586a[_0x57e2a8(0x209)][_0x57e2a8(0x333)]['call'](this),this[_0x57e2a8(0x50c)]()&&(this['_commandWindow'][_0x57e2a8(0x407)](),this[_0x57e2a8(0x2df)][_0x57e2a8(0x455)](),this[_0x57e2a8(0x508)][_0x57e2a8(0x3b0)](0x0),this[_0x57e2a8(0x508)]['activate']());}}else VisuMZ['ItemsEquipsCore']['Game_Actor_changeEquip'][_0x4e6cba(0x593)](this,_0x2a6cc3,_0x27690f);}},VisuMZ[_0x14a1da(0x209)]['Game_Actor_forceChangeEquip']=Game_Actor[_0x14a1da(0x1a8)]['forceChangeEquip'],Game_Actor[_0x14a1da(0x1a8)][_0x14a1da(0x2e8)]=function(_0x443aa6,_0x2f46ea){const _0xc83f27=_0x14a1da;if(!this[_0xc83f27(0x1d7)]){const _0x144a98=JsonEx[_0xc83f27(0x4e7)](this);_0x144a98[_0xc83f27(0x1d7)]=!![],VisuMZ[_0xc83f27(0x209)][_0xc83f27(0x4fa)][_0xc83f27(0x593)](this,_0x443aa6,_0x2f46ea),this[_0xc83f27(0x334)](_0x144a98);}else{if('GvWzX'!==_0xc83f27(0x212))VisuMZ['ItemsEquipsCore'][_0xc83f27(0x4fa)][_0xc83f27(0x593)](this,_0x443aa6,_0x2f46ea);else{function _0x3a6ee1(){const _0x2ee487=_0xc83f27;_0x1b81aa+=0x1;if(_0x3677a1[_0x2ee487(0x214)][_0x2ee487(0x2fb)](_0x3eaa3b)){const _0x47aca0=_0x3cfc64(_0x1fd109['$1'])||0x1;if(_0x3d4cc7>=_0x47aca0)return!![];}if(_0x548388['note'][_0x2ee487(0x2fb)](_0x7a4e5b)){const _0xd0fdb9=_0x1169b1(_0x42e439['$1'])||0x1;if(_0x4c216b>=_0xd0fdb9)return!![];}}}}},VisuMZ[_0x14a1da(0x209)]['Game_Actor_discardEquip']=Game_Actor['prototype']['discardEquip'],Game_Actor[_0x14a1da(0x1a8)]['discardEquip']=function(_0x4a2f27){const _0x371197=_0x14a1da;if(!this[_0x371197(0x1d7)]){const _0x56ab6e=JsonEx[_0x371197(0x4e7)](this);_0x56ab6e[_0x371197(0x1d7)]=!![],VisuMZ[_0x371197(0x209)]['Game_Actor_discardEquip'][_0x371197(0x593)](this,_0x4a2f27),this[_0x371197(0x334)](_0x56ab6e);}else VisuMZ[_0x371197(0x209)]['Game_Actor_discardEquip'][_0x371197(0x593)](this,_0x4a2f27);},Game_Actor[_0x14a1da(0x1a8)]['releaseUnequippableItems']=function(_0x59fa75){const _0x503413=_0x14a1da;for(;;){if('FZcZV'!==_0x503413(0x5c7)){function _0x20b2c5(){const _0xb1598a=_0x503413,_0x54e3ef=_0x3746b3['parse']('['+_0x599a42['$1'][_0xb1598a(0x2fb)](/\d+/g)+']');for(const _0x2055d4 of _0x54e3ef){if(!_0x1b0123[_0xb1598a(0x37c)](_0x2055d4))return!![];}return![];}}else{const _0x4ecb94=this[_0x503413(0x2c9)](),_0x2fb18f=this[_0x503413(0x568)](),_0x5c7339=_0x2fb18f['length'];let _0x45b177=![];for(let _0x485f09=0x0;_0x485f09<_0x5c7339;_0x485f09++){const _0x1ac63b=_0x2fb18f[_0x485f09];if(_0x1ac63b&&(!this['canEquip'](_0x1ac63b)||_0x1ac63b['etypeId']!==_0x4ecb94[_0x485f09])){if('BlpIB'===_0x503413(0x59a)){function _0x452377(){const _0x50143d=_0x503413;return _0x129ee8['prototype'][_0x50143d(0x2c1)][_0x50143d(0x593)](this);}}else{!_0x59fa75&&this[_0x503413(0x5a7)](null,_0x1ac63b);if(!this[_0x503413(0x1d7)]){const _0x36c7b8=JsonEx[_0x503413(0x4e7)](this);_0x36c7b8['_tempActor']=!![],this[_0x503413(0x46c)][_0x485f09][_0x503413(0x3c3)](null),this[_0x503413(0x334)](_0x36c7b8);}else this[_0x503413(0x46c)][_0x485f09]['setObject'](null);_0x45b177=!![];}}}if(!_0x45b177){if(_0x503413(0x55b)!=='gLUhV')break;else{function _0x127855(){const _0x38ebe9=_0x503413,_0x239c5b=this[_0x38ebe9(0x2fa)](_0x19735b);this[_0x38ebe9(0x270)](_0x239c5b,_0x588001[_0x38ebe9(0x615)],_0xc012ed['x'],_0x4e6ae5['y'],_0x587c88[_0x38ebe9(0x379)]);}}}}}},Game_Actor[_0x14a1da(0x1a8)][_0x14a1da(0x334)]=function(_0x4b0c32){const _0x5e1bb5=_0x14a1da;if(this[_0x5e1bb5(0x1d7)])return;if(!VisuMZ[_0x5e1bb5(0x209)][_0x5e1bb5(0x4ad)][_0x5e1bb5(0x1ad)]['EquipAdjustHpMp'])return;const _0x386c65=Math['round'](_0x4b0c32[_0x5e1bb5(0x433)]()*this[_0x5e1bb5(0x2f5)]),_0x435534=Math[_0x5e1bb5(0x300)](_0x4b0c32['mpRate']()*this[_0x5e1bb5(0x529)]);if(this['hp']>0x0)this[_0x5e1bb5(0x485)](_0x386c65);if(this['mp']>0x0)this[_0x5e1bb5(0x29f)](_0x435534);},Game_Actor[_0x14a1da(0x1a8)][_0x14a1da(0x1e8)]=function(){const _0x11cf92=_0x14a1da,_0x2292a5=this['equipSlots']()[_0x11cf92(0x2ab)];for(let _0x55fba3=0x0;_0x55fba3<_0x2292a5;_0x55fba3++){if(this[_0x11cf92(0x3de)](_0x55fba3))this[_0x11cf92(0x264)](_0x55fba3,null);}},Game_Actor[_0x14a1da(0x1a8)][_0x14a1da(0x3de)]=function(_0x1673c9){const _0x1fc943=_0x14a1da;if(this[_0x1fc943(0x43e)]()['includes'](this[_0x1fc943(0x2c9)]()[_0x1673c9])){if(_0x1fc943(0x35e)===_0x1fc943(0x35e))return![];else{function _0x5a5cb6(){const _0x4aca02=_0x1fc943;if(_0x4892dc)_0x1ca5de+=this[_0x4aca02(0x282)](_0x41b6e2,_0x4bb3ca);}}}else{if(_0x1fc943(0x4d6)!==_0x1fc943(0x4eb))return this[_0x1fc943(0x24e)](_0x1673c9);else{function _0x549c7f(){const _0x3d985c=_0x1fc943,_0x1a6cb5=_0x2e19ce['x']+_0x42cda7[_0x3d985c(0x4d0)]((_0x4cd5c2[_0x3d985c(0x379)]-_0x4e10cd)/0x2);this[_0x3d985c(0x3bf)](_0x490e08,_0x1a6cb5,_0x16e031['y'],_0x4827a8);}}}},Game_Actor[_0x14a1da(0x1a8)][_0x14a1da(0x43e)]=function(){const _0x44318f=_0x14a1da;return VisuMZ[_0x44318f(0x209)]['Settings'][_0x44318f(0x1ad)][_0x44318f(0x323)];},Game_Actor[_0x14a1da(0x1a8)]['optimizeEquipments']=function(){const _0x3fbbf9=_0x14a1da,_0x3ab783=this['equipSlots']()['length'];for(let _0x57492e=0x0;_0x57492e<_0x3ab783;_0x57492e++){if(_0x3fbbf9(0x2f0)!==_0x3fbbf9(0x2f0)){function _0x551b12(){const _0x4d5052=_0x3fbbf9,_0x3582cd=_0x321621[_0x4d5052(0x2e4)]['indexOf'](_0x4d2781(_0x9df6ae['$1'])[_0x4d5052(0x597)]());return _0x12eed4[_0x4d5052(0x242)](_0x200439)&&_0x36a04d[_0x4d5052(0x396)]===_0x3582cd;}}else{if(this[_0x3fbbf9(0x1ff)](_0x57492e))this[_0x3fbbf9(0x264)](_0x57492e,null);}}for(let _0x58dd41=0x0;_0x58dd41<_0x3ab783;_0x58dd41++){if(_0x3fbbf9(0x3a8)==='GlAiA'){if(this[_0x3fbbf9(0x1ff)](_0x58dd41))this[_0x3fbbf9(0x264)](_0x58dd41,this['bestEquipItem'](_0x58dd41));}else{function _0x49ce22(){const _0x739156=_0x3fbbf9;return this[_0x739156(0x1a9)]();}}}},Game_Actor[_0x14a1da(0x1a8)][_0x14a1da(0x1ff)]=function(_0x411e48){const _0x4b9e15=_0x14a1da;if(this[_0x4b9e15(0x4ef)]()[_0x4b9e15(0x243)](this[_0x4b9e15(0x2c9)]()[_0x411e48]))return![];else{if(_0x4b9e15(0x1c3)!==_0x4b9e15(0x1c3)){function _0x2bf9bb(){const _0x18b6f2=_0x4b9e15;this[_0x18b6f2(0x577)](_0x88a303);}}else return this[_0x4b9e15(0x24e)](_0x411e48);}},Game_Actor[_0x14a1da(0x1a8)][_0x14a1da(0x4ef)]=function(){const _0xb2c109=_0x14a1da;return VisuMZ[_0xb2c109(0x209)][_0xb2c109(0x4ad)]['EquipScene'][_0xb2c109(0x523)];},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x4b8)]=Game_Actor['prototype']['tradeItemWithParty'],Game_Actor['prototype'][_0x14a1da(0x5a7)]=function(_0xd548f6,_0x57793c){const _0x2675b0=_0x14a1da;if(this[_0x2675b0(0x1d7)])return![];$gameTemp[_0x2675b0(0x2d1)]=!![];const _0x33eece=VisuMZ[_0x2675b0(0x209)][_0x2675b0(0x4b8)][_0x2675b0(0x593)](this,_0xd548f6,_0x57793c);return $gameTemp['_bypassNewLabel']=![],_0x33eece;},Game_Actor[_0x14a1da(0x1a8)][_0x14a1da(0x252)]=function(_0x5cb526,_0xb60ece){const _0x2e2f32=_0x14a1da,_0x2d673c=this[_0x2e2f32(0x543)](_0x5cb526);if(_0x2d673c<0x0)return;const _0x204637=_0x5cb526===0x1?$dataWeapons[_0xb60ece]:$dataArmors[_0xb60ece];this[_0x2e2f32(0x264)](_0x2d673c,_0x204637);},Game_Actor[_0x14a1da(0x1a8)][_0x14a1da(0x543)]=function(_0x2ce100){const _0x48ee44=_0x14a1da;let _0x922ae5=0x0;const _0x418fd2=this[_0x48ee44(0x2c9)](),_0xa3888d=this[_0x48ee44(0x568)]();for(let _0x47dc89=0x0;_0x47dc89<_0x418fd2[_0x48ee44(0x2ab)];_0x47dc89++){if(_0x418fd2[_0x47dc89]===_0x2ce100){_0x922ae5=_0x47dc89;if(!_0xa3888d[_0x47dc89])return _0x922ae5;}}return _0x922ae5;},VisuMZ['ItemsEquipsCore'][_0x14a1da(0x27d)]=Game_Actor[_0x14a1da(0x1a8)][_0x14a1da(0x586)],Game_Actor[_0x14a1da(0x1a8)]['paramPlus']=function(_0x12bd54){const _0x30d546=_0x14a1da;let _0x3d5bd1=VisuMZ[_0x30d546(0x209)][_0x30d546(0x27d)][_0x30d546(0x593)](this,_0x12bd54);for(const _0xbbfd4e of this[_0x30d546(0x568)]()){if(_0x30d546(0x372)==='nLzKo'){function _0x468556(){const _0x1504e6=_0x30d546;_0x3259b8['prototype'][_0x1504e6(0x1d3)][_0x1504e6(0x593)](this,_0x50397a);}}else{if(_0xbbfd4e)_0x3d5bd1+=this[_0x30d546(0x282)](_0xbbfd4e,_0x12bd54);}}return _0x3d5bd1;},Game_Actor[_0x14a1da(0x1a8)][_0x14a1da(0x282)]=function(_0x1d4e49,_0x34579f){const _0x46b780=_0x14a1da;if(this['_calculatingJSParameters'])return 0x0;const _0x31db06=(DataManager[_0x46b780(0x3ed)](_0x1d4e49)?'W%1':'A%1')[_0x46b780(0x27e)](_0x1d4e49['id']),_0x461e25='%1-%2'[_0x46b780(0x27e)](_0x31db06,_0x34579f);if(VisuMZ[_0x46b780(0x209)][_0x46b780(0x3ff)][_0x461e25]){if(_0x46b780(0x39c)==='pYTPL'){function _0xe12dc9(){const _0x566177=_0x46b780;return _0x5148da[_0x566177(0x4f1)][_0x566177(0x27e)](_0x5f1dd5(_0x4bc170['$1']));}}else{this[_0x46b780(0x4f5)]=!![];const _0x1cd9eb=VisuMZ['ItemsEquipsCore'][_0x46b780(0x3ff)][_0x461e25][_0x46b780(0x593)](this,_0x1d4e49,_0x34579f);return this['_calculatingJSParameters']=![],_0x1cd9eb;}}else{if('qcDKj'!==_0x46b780(0x616))return 0x0;else{function _0x3e36d7(){const _0x3598fa=_0x46b780,_0x4cdcf1=_0x2ff592[_0x3598fa(0x214)],_0x3739ac=_0x4a2bf7[_0x3598fa(0x209)]['itemEnableJS'];return _0x3739ac[_0xd450d8['id']]?_0x3739ac[_0x23abac['id']][_0x3598fa(0x593)](this,_0x5d7fba):!![];}}}},Game_Actor[_0x14a1da(0x1a8)][_0x14a1da(0x1b3)]=function(_0x59e03e){const _0x1322b2=_0x14a1da;this[_0x1322b2(0x301)]=!![],this['_shopStatusMenuAlly']=_0x59e03e;},VisuMZ[_0x14a1da(0x209)]['Game_Party_initialize']=Game_Party['prototype'][_0x14a1da(0x355)],Game_Party['prototype'][_0x14a1da(0x355)]=function(){const _0x23987b=_0x14a1da;VisuMZ[_0x23987b(0x209)][_0x23987b(0x43c)][_0x23987b(0x593)](this),this[_0x23987b(0x3ba)]();},Game_Party['prototype'][_0x14a1da(0x3ba)]=function(){const _0x5a5758=_0x14a1da;this[_0x5a5758(0x42b)]=[];},Game_Party['prototype'][_0x14a1da(0x553)]=function(_0x3004a0){const _0x24ca22=_0x14a1da;if(!$gameTemp[_0x24ca22(0x457)]())return![];if(this[_0x24ca22(0x42b)]===undefined)this['initNewItemsList']();let _0x181bbb='';if(DataManager[_0x24ca22(0x4ac)](_0x3004a0))_0x181bbb=_0x24ca22(0x51a)[_0x24ca22(0x27e)](_0x3004a0['id']);else{if(DataManager[_0x24ca22(0x3ed)](_0x3004a0))_0x181bbb=_0x24ca22(0x42e)[_0x24ca22(0x27e)](_0x3004a0['id']);else{if(DataManager['isArmor'](_0x3004a0))_0x181bbb=_0x24ca22(0x3a3)[_0x24ca22(0x27e)](_0x3004a0['id']);else return;}}return this[_0x24ca22(0x42b)][_0x24ca22(0x243)](_0x181bbb);},Game_Party[_0x14a1da(0x1a8)][_0x14a1da(0x1bb)]=function(_0x3ff226){const _0x26751b=_0x14a1da;if(!$gameTemp['newLabelEnabled']())return;if(this[_0x26751b(0x42b)]===undefined)this[_0x26751b(0x3ba)]();let _0xb529bf='';if(DataManager[_0x26751b(0x4ac)](_0x3ff226))_0xb529bf=_0x26751b(0x51a)[_0x26751b(0x27e)](_0x3ff226['id']);else{if(DataManager['isWeapon'](_0x3ff226)){if(_0x26751b(0x58c)===_0x26751b(0x58c))_0xb529bf=_0x26751b(0x42e)[_0x26751b(0x27e)](_0x3ff226['id']);else{function _0x162d3a(){const _0x4d2580=_0x26751b;this[_0x4d2580(0x3f2)]();}}}else{if(DataManager[_0x26751b(0x242)](_0x3ff226))_0xb529bf=_0x26751b(0x3a3)[_0x26751b(0x27e)](_0x3ff226['id']);else{if(_0x26751b(0x55d)===_0x26751b(0x55d))return;else{function _0x119c1(){const _0x23c530=_0x26751b,_0x495392=_0xe92b50(_0x4f1dcd['$1'])[_0x23c530(0x4d1)](/[\r\n]+/);for(const _0x5cce4e of _0x495392){if(_0x5cce4e[_0x23c530(0x2fb)](/(.*):[ ](.*)/i)){const _0x250fea=_0x4962d5(_0xdbc37f['$1'])[_0x23c530(0x597)](),_0x4a9257=_0x370cef(_0x5b321a['$2'])[_0x23c530(0x597)]();this[_0x23c530(0x5f4)](_0x250fea,_0x4a9257,_0x514efa,_0x60456b,_0x2d8504),_0x1a69c0+=this[_0x23c530(0x5df)]();}}}}}}}if(!this[_0x26751b(0x42b)]['includes'](_0xb529bf))this[_0x26751b(0x42b)]['push'](_0xb529bf);},Game_Party[_0x14a1da(0x1a8)][_0x14a1da(0x4e9)]=function(_0x5b9eb1){const _0x50173f=_0x14a1da;if(!$gameTemp['newLabelEnabled']())return;if(this['_newItemsList']===undefined)this[_0x50173f(0x3ba)]();let _0x36a91a='';if(DataManager['isItem'](_0x5b9eb1)){if('reJNR'===_0x50173f(0x558)){function _0x2156a8(){const _0x35a2df=_0x50173f;if(this['_tempActor'])return;if(!_0x40fb9a[_0x35a2df(0x209)][_0x35a2df(0x4ad)][_0x35a2df(0x1ad)][_0x35a2df(0x2f6)])return;const _0x29d127=_0x50d7c7[_0x35a2df(0x300)](_0x1799ce[_0x35a2df(0x433)]()*this['mhp']),_0x1d9106=_0x1e0a3b[_0x35a2df(0x300)](_0x49b065['mpRate']()*this[_0x35a2df(0x529)]);if(this['hp']>0x0)this[_0x35a2df(0x485)](_0x29d127);if(this['mp']>0x0)this['setMp'](_0x1d9106);}}else _0x36a91a=_0x50173f(0x51a)[_0x50173f(0x27e)](_0x5b9eb1['id']);}else{if(DataManager[_0x50173f(0x3ed)](_0x5b9eb1))_0x36a91a=_0x50173f(0x42e)['format'](_0x5b9eb1['id']);else{if(DataManager[_0x50173f(0x242)](_0x5b9eb1)){if('Ltdvd'!=='Ltdvd'){function _0x159c3c(){const _0x58c457=_0x50173f;this[_0x58c457(0x1c2)]();}}else _0x36a91a=_0x50173f(0x3a3)[_0x50173f(0x27e)](_0x5b9eb1['id']);}else return;}}if(this[_0x50173f(0x42b)][_0x50173f(0x243)](_0x36a91a)){if(_0x50173f(0x607)===_0x50173f(0x607))this[_0x50173f(0x42b)]['splice'](this[_0x50173f(0x42b)][_0x50173f(0x36d)](_0x36a91a),0x1);else{function _0x2cd4c2(){const _0x32496a=_0x50173f,_0x5dac24=_0x174921['prototype'][_0x32496a(0x2ca)](-0x1,_0x2ad649);if(_0x5dac24>0x0){_0x545785+=_0x32496a(0x480)[_0x32496a(0x27e)](_0x5dac24),_0x52e7ac++;if(_0x208308>=_0x2b9179)return _0x15d0fb;}}}}},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x2d3)]=Game_Party[_0x14a1da(0x1a8)]['gainItem'],Game_Party[_0x14a1da(0x1a8)][_0x14a1da(0x55c)]=function(_0x279aa6,_0x1bea76,_0x32236b){const _0x1f0d56=_0x14a1da,_0x3acba2=this[_0x1f0d56(0x617)](_0x279aa6);VisuMZ['ItemsEquipsCore'][_0x1f0d56(0x2d3)][_0x1f0d56(0x593)](this,_0x279aa6,_0x1bea76,_0x32236b);if(this[_0x1f0d56(0x617)](_0x279aa6)>_0x3acba2)this[_0x1f0d56(0x1bb)](_0x279aa6);},Game_Party[_0x14a1da(0x1a8)]['maxItems']=function(_0x37976c){const _0x4e49f8=_0x14a1da;return DataManager[_0x4e49f8(0x324)](_0x37976c);},VisuMZ['ItemsEquipsCore']['Scene_ItemBase_activateItemWindow']=Scene_ItemBase[_0x14a1da(0x1a8)][_0x14a1da(0x356)],Scene_ItemBase[_0x14a1da(0x1a8)][_0x14a1da(0x356)]=function(){const _0x1ea564=_0x14a1da;VisuMZ['ItemsEquipsCore']['Scene_ItemBase_activateItemWindow']['call'](this),this[_0x1ea564(0x432)]['callUpdateHelp']();},Scene_Item[_0x14a1da(0x1a8)][_0x14a1da(0x4ec)]=function(){const _0xa9568c=_0x14a1da;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0xa9568c(0x3ac)]!==undefined){if(_0xa9568c(0x52d)!==_0xa9568c(0x52d)){function _0x3a73ba(){const _0x4271e0=_0xa9568c;return _0x151121[_0x4271e0(0x42d)]&&_0x3d7ee0[_0x4271e0(0x53d)][_0x4271e0(0x4ad)][_0x4271e0(0x44a)][_0x4271e0(0x1f4)];}}else return ConfigManager[_0xa9568c(0x3ac)];}else{if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0xa9568c(0x4e8)===_0xa9568c(0x5d8)){function _0x5ed75d(){const _0x34df9e=_0xa9568c;return _0xfb1a01[_0x34df9e(0x209)][_0x34df9e(0x4ad)]['StatusWindow'][_0x34df9e(0x290)];}}else return this[_0xa9568c(0x373)]()[_0xa9568c(0x2fb)](/LOWER/i);}else{if('qkQGK'!=='hkwWc')Scene_ItemBase[_0xa9568c(0x1a8)][_0xa9568c(0x1c1)]['call'](this);else{function _0x33eb6f(){this['onTouchSelectModernControls'](![]);}}}}},Scene_Item[_0x14a1da(0x1a8)][_0x14a1da(0x1c1)]=function(){const _0x1e0e0d=_0x14a1da;if(ConfigManager['uiMenuStyle']&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x1e0e0d(0x54d)];else{if(this[_0x1e0e0d(0x526)]())return this[_0x1e0e0d(0x373)]()['match'](/RIGHT/i);else{if('lTaeq'!=='HRNQJ')Scene_ItemBase[_0x1e0e0d(0x1a8)][_0x1e0e0d(0x1c1)][_0x1e0e0d(0x593)](this);else{function _0x567ccd(){if(!_0x1f6958['value'](_0x5bf459))return![];}}}}},Scene_Item[_0x14a1da(0x1a8)][_0x14a1da(0x373)]=function(){const _0x416055=_0x14a1da;return VisuMZ[_0x416055(0x209)][_0x416055(0x4ad)][_0x416055(0x5da)]['LayoutStyle'];},Scene_Item[_0x14a1da(0x1a8)]['isUseModernControls']=function(){const _0x38a145=_0x14a1da;return this['_categoryWindow']&&this['_categoryWindow'][_0x38a145(0x50c)]();},Scene_Item['prototype'][_0x14a1da(0x526)]=function(){const _0x1074d6=_0x14a1da;return VisuMZ[_0x1074d6(0x209)][_0x1074d6(0x4ad)][_0x1074d6(0x5da)][_0x1074d6(0x603)];},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x351)]=Scene_Item[_0x14a1da(0x1a8)]['create'],Scene_Item[_0x14a1da(0x1a8)][_0x14a1da(0x5e2)]=function(){const _0x5e5d2e=_0x14a1da;VisuMZ[_0x5e5d2e(0x209)][_0x5e5d2e(0x351)]['call'](this),this['isUseModernControls']()&&this['onCategoryOk']();},Scene_Item[_0x14a1da(0x1a8)][_0x14a1da(0x2c1)]=function(){const _0x1533a2=_0x14a1da;return this[_0x1533a2(0x526)]()?this[_0x1533a2(0x211)]():Scene_ItemBase[_0x1533a2(0x1a8)][_0x1533a2(0x2c1)][_0x1533a2(0x593)](this);},Scene_Item[_0x14a1da(0x1a8)][_0x14a1da(0x211)]=function(){const _0x2a2e5b=_0x14a1da,_0x12ef3d=0x0,_0x3b9fd1=this[_0x2a2e5b(0x481)](),_0x19f6eb=Graphics[_0x2a2e5b(0x565)],_0x32d4e2=this[_0x2a2e5b(0x2c7)]();return new Rectangle(_0x12ef3d,_0x3b9fd1,_0x19f6eb,_0x32d4e2);},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x47a)]=Scene_Item['prototype']['createCategoryWindow'],Scene_Item[_0x14a1da(0x1a8)]['createCategoryWindow']=function(){const _0x426a35=_0x14a1da;VisuMZ[_0x426a35(0x209)][_0x426a35(0x47a)][_0x426a35(0x593)](this);if(this[_0x426a35(0x50c)]()){if(_0x426a35(0x366)==='TrATl')this[_0x426a35(0x2d2)]();else{function _0x4168fe(){const _0x3bb1aa=_0x426a35;return this[_0x3bb1aa(0x309)]();}}}},Scene_Item[_0x14a1da(0x1a8)][_0x14a1da(0x2d2)]=function(){const _0x178fb6=_0x14a1da;delete this[_0x178fb6(0x1bd)]['_handlers']['ok'],delete this[_0x178fb6(0x1bd)][_0x178fb6(0x340)][_0x178fb6(0x598)];},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x605)]=Scene_Item[_0x14a1da(0x1a8)][_0x14a1da(0x32e)],Scene_Item['prototype']['categoryWindowRect']=function(){const _0x5672a2=_0x14a1da;if(this[_0x5672a2(0x526)]()){if(_0x5672a2(0x2d8)!=='LiQfL'){function _0x5b349b(){const _0x3ccf28=_0x5672a2;if(!this['isEquipItem']()&&!_0x1fac61['isItem'](this['_item']))return![];if(_0x485890['isKeyItem'](this[_0x3ccf28(0x2a7)])&&!_0x2e79e0[_0x3ccf28(0x534)]){const _0x4ef11c=_0x181ec8[_0x3ccf28(0x1d5)];this[_0x3ccf28(0x4cc)](_0x4ef11c,_0x495cfd,_0x505369,_0x110e0b,!![],_0x3ccf28(0x303));}else{const _0x3b9bf9=_0x348dc4['possession'];this['drawItemKeyData'](_0x3b9bf9,_0xa2b520,_0x5da2f0,_0x1a950b,!![]);const _0x377f98=this[_0x3ccf28(0x2da)]();this[_0x3ccf28(0x4cc)](_0x377f98,_0x1b4804,_0x38ab56,_0x4880f9,![],_0x3ccf28(0x547));}return this[_0x3ccf28(0x5f2)](_0x1822d2,_0x1dac88,_0x42babf),this[_0x3ccf28(0x2ad)](),!![];}}else return this[_0x5672a2(0x24c)]();}else{if(_0x5672a2(0x1e1)===_0x5672a2(0x377)){function _0x946409(){const _0x682fe6=_0x5672a2;_0x10dc72[_0x682fe6(0x55c)](_0x579a58['object'](),0x1);}}else return VisuMZ['ItemsEquipsCore'][_0x5672a2(0x605)][_0x5672a2(0x593)](this);}},Scene_Item[_0x14a1da(0x1a8)]['categoryWindowRectItemsEquipsCore']=function(){const _0x213612=_0x14a1da,_0x23804f=0x0,_0x1f0412=this['mainAreaTop'](),_0x4d7c08=Graphics[_0x213612(0x565)],_0x1cf7d3=this['calcWindowHeight'](0x1,!![]);return new Rectangle(_0x23804f,_0x1f0412,_0x4d7c08,_0x1cf7d3);},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x31b)]=Scene_Item[_0x14a1da(0x1a8)]['createItemWindow'],Scene_Item['prototype']['createItemWindow']=function(){const _0x165fbc=_0x14a1da;VisuMZ[_0x165fbc(0x209)][_0x165fbc(0x31b)][_0x165fbc(0x593)](this);if(this['isUseModernControls']()){if(_0x165fbc(0x26b)===_0x165fbc(0x26b))this[_0x165fbc(0x4b3)]();else{function _0xbe4079(){const _0x7f7af9=_0x165fbc;return _0x223caf[_0x7f7af9(0x3ac)];}}}if(this[_0x165fbc(0x27f)]()){if(_0x165fbc(0x493)!==_0x165fbc(0x493)){function _0x4ff764(){return 0x63;}}else this['createStatusWindow']();}},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x3c1)]=Scene_Item[_0x14a1da(0x1a8)]['itemWindowRect'],Scene_Item[_0x14a1da(0x1a8)][_0x14a1da(0x4c9)]=function(){const _0x1760a0=_0x14a1da;if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x1760a0(0x590)]();else{if(_0x1760a0(0x38f)!==_0x1760a0(0x38f)){function _0x344500(){const _0x189521=_0x1760a0;if(_0x5ab1c3[_0x189521(0x394)](_0xbeed4c))return _0x166da1[_0x189521(0x534)];return!![];}}else{const _0x5ae45c=VisuMZ['ItemsEquipsCore'][_0x1760a0(0x3c1)][_0x1760a0(0x593)](this);if(this[_0x1760a0(0x27f)]()&&this[_0x1760a0(0x3df)]()){if(_0x1760a0(0x281)!==_0x1760a0(0x281)){function _0x41d405(){const _0x43b94d=_0x1760a0;if(!_0x1f5f41)return 0x0;const _0x176c27=_0x4f9995[_0x43b94d(0x209)][_0x43b94d(0x3c8)][_0x43b94d(0x593)](this,_0x5928a5);return this[_0x43b94d(0x5b8)](_0x12884c,_0x176c27);}}else _0x5ae45c['width']-=this[_0x1760a0(0x21f)]();}return _0x5ae45c;}}},Scene_Item[_0x14a1da(0x1a8)][_0x14a1da(0x590)]=function(){const _0xb9badc=_0x14a1da,_0x344473=this[_0xb9badc(0x1c1)]()?this[_0xb9badc(0x21f)]():0x0,_0x387bfe=this['_categoryWindow']['y']+this[_0xb9badc(0x1bd)][_0xb9badc(0x4e3)],_0x5d7e38=Graphics['boxWidth']-this['statusWidth'](),_0x319104=this[_0xb9badc(0x37f)]()-_0x387bfe;return new Rectangle(_0x344473,_0x387bfe,_0x5d7e38,_0x319104);},Scene_Item[_0x14a1da(0x1a8)][_0x14a1da(0x4b3)]=function(){const _0x3ce98f=_0x14a1da;this[_0x3ce98f(0x432)]['setHandler'](_0x3ce98f(0x598),this['popScene'][_0x3ce98f(0x1c8)](this));},Scene_Item[_0x14a1da(0x1a8)][_0x14a1da(0x27f)]=function(){const _0x557597=_0x14a1da;return this[_0x557597(0x526)]()?!![]:VisuMZ[_0x557597(0x209)][_0x557597(0x4ad)][_0x557597(0x5da)][_0x557597(0x4ed)];},Scene_Item['prototype'][_0x14a1da(0x3df)]=function(){const _0x511f9c=_0x14a1da;return VisuMZ[_0x511f9c(0x209)][_0x511f9c(0x4ad)][_0x511f9c(0x5da)][_0x511f9c(0x248)];},Scene_Item['prototype']['createStatusWindow']=function(){const _0xaee63d=_0x14a1da,_0x12af5f=this[_0xaee63d(0x1f2)]();this[_0xaee63d(0x319)]=new Window_ShopStatus(_0x12af5f),this[_0xaee63d(0x5a5)](this[_0xaee63d(0x319)]),this['_itemWindow'][_0xaee63d(0x411)](this[_0xaee63d(0x319)]);const _0x28dcdf=VisuMZ[_0xaee63d(0x209)]['Settings'][_0xaee63d(0x5da)][_0xaee63d(0x1eb)];this['_statusWindow']['setBackgroundType'](_0x28dcdf||0x0);},Scene_Item[_0x14a1da(0x1a8)]['statusWindowRect']=function(){const _0x48bd3e=_0x14a1da;if(this[_0x48bd3e(0x526)]())return this['statusWindowRectItemsEquipsCore']();else{if(_0x48bd3e(0x45f)===_0x48bd3e(0x45f))return VisuMZ['ItemsEquipsCore']['Settings']['ItemScene'][_0x48bd3e(0x575)][_0x48bd3e(0x593)](this);else{function _0x203b2e(){const _0x202043=_0x48bd3e;_0x1f2528[_0x202043(0x209)][_0x202043(0x31b)][_0x202043(0x593)](this),this[_0x202043(0x50c)]()&&this[_0x202043(0x4b3)](),this[_0x202043(0x27f)]()&&this[_0x202043(0x461)]();}}}},Scene_Item[_0x14a1da(0x1a8)][_0x14a1da(0x1a9)]=function(){const _0x222969=_0x14a1da,_0x575be7=this[_0x222969(0x21f)](),_0x5d9ba1=this[_0x222969(0x432)]['height'],_0x8b39e7=this['isRightInputMode']()?0x0:Graphics['boxWidth']-this[_0x222969(0x21f)](),_0x2db9c0=this[_0x222969(0x432)]['y'];return new Rectangle(_0x8b39e7,_0x2db9c0,_0x575be7,_0x5d9ba1);},Scene_Item[_0x14a1da(0x1a8)][_0x14a1da(0x21f)]=function(){const _0x3e3d72=_0x14a1da;return Scene_Shop[_0x3e3d72(0x1a8)][_0x3e3d72(0x21f)]();},Scene_Item[_0x14a1da(0x1a8)]['buttonAssistItemListRequirement']=function(){const _0x9f86f4=_0x14a1da;if(!this[_0x9f86f4(0x373)]())return![];if(!this['isUseModernControls']())return![];if(!this[_0x9f86f4(0x432)])return![];if(!this['_itemWindow'][_0x9f86f4(0x4db)])return![];return this[_0x9f86f4(0x373)]()&&this[_0x9f86f4(0x50c)]();},Scene_Item[_0x14a1da(0x1a8)][_0x14a1da(0x371)]=function(){const _0x247475=_0x14a1da;if(this[_0x247475(0x3a0)]()){if(_0x247475(0x278)==='GcoAW')return this[_0x247475(0x432)][_0x247475(0x470)]()===0x1?TextManager['getInputMultiButtonStrings'](_0x247475(0x473),_0x247475(0x547)):TextManager[_0x247475(0x5ac)](_0x247475(0x2a4),_0x247475(0x237));else{function _0x2f8e96(){const _0x449061=_0x247475;_0x29ab9f[_0x449061(0x209)]['Window_EquipCommand_initialize'][_0x449061(0x593)](this,_0x3e6d38),this[_0x449061(0x413)](_0x5999c8);}}}return Scene_ItemBase[_0x247475(0x1a8)][_0x247475(0x371)][_0x247475(0x593)](this);},Scene_Item[_0x14a1da(0x1a8)][_0x14a1da(0x5cc)]=function(){const _0x4d8b2c=_0x14a1da;if(this[_0x4d8b2c(0x3a0)]())return VisuMZ['ItemsEquipsCore'][_0x4d8b2c(0x4ad)][_0x4d8b2c(0x5da)][_0x4d8b2c(0x3c2)];return Scene_ItemBase[_0x4d8b2c(0x1a8)][_0x4d8b2c(0x5cc)][_0x4d8b2c(0x593)](this);},Scene_Equip['prototype'][_0x14a1da(0x4ec)]=function(){const _0xa98bce=_0x14a1da;if(ConfigManager[_0xa98bce(0x48a)]&&ConfigManager[_0xa98bce(0x3ac)]!==undefined)return ConfigManager[_0xa98bce(0x3ac)];else{if(this[_0xa98bce(0x526)]())return this[_0xa98bce(0x373)]()[_0xa98bce(0x2fb)](/LOWER/i);else Scene_MenuBase[_0xa98bce(0x1a8)]['isRightInputMode'][_0xa98bce(0x593)](this);}},Scene_Equip['prototype'][_0x14a1da(0x1c1)]=function(){const _0x3c2078=_0x14a1da;if(ConfigManager[_0x3c2078(0x48a)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x3c2078(0x54d)];else{if(this[_0x3c2078(0x526)]())return this[_0x3c2078(0x373)]()[_0x3c2078(0x2fb)](/RIGHT/i);else Scene_MenuBase[_0x3c2078(0x1a8)][_0x3c2078(0x1c1)][_0x3c2078(0x593)](this);}},Scene_Equip[_0x14a1da(0x1a8)][_0x14a1da(0x373)]=function(){const _0x1c7fce=_0x14a1da;return VisuMZ[_0x1c7fce(0x209)]['Settings'][_0x1c7fce(0x1ad)][_0x1c7fce(0x25e)];},Scene_Equip[_0x14a1da(0x1a8)][_0x14a1da(0x50c)]=function(){const _0x17ee6d=_0x14a1da;return this['_commandWindow']&&this['_commandWindow'][_0x17ee6d(0x50c)]();},Scene_Equip[_0x14a1da(0x1a8)][_0x14a1da(0x526)]=function(){const _0x1d0051=_0x14a1da;return VisuMZ[_0x1d0051(0x209)][_0x1d0051(0x4ad)]['EquipScene']['EnableLayout'];},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x3c5)]=Scene_Equip['prototype']['create'],Scene_Equip[_0x14a1da(0x1a8)][_0x14a1da(0x5e2)]=function(){const _0x2f74d3=_0x14a1da;VisuMZ[_0x2f74d3(0x209)]['Scene_Equip_create'][_0x2f74d3(0x593)](this),this[_0x2f74d3(0x50c)]()&&this[_0x2f74d3(0x3d7)]();},Scene_Equip[_0x14a1da(0x1a8)][_0x14a1da(0x2c1)]=function(){const _0x242e73=_0x14a1da;return this[_0x242e73(0x526)]()?this[_0x242e73(0x211)]():Scene_MenuBase[_0x242e73(0x1a8)]['helpWindowRect'][_0x242e73(0x593)](this);},Scene_Equip[_0x14a1da(0x1a8)][_0x14a1da(0x211)]=function(){const _0x795f9d=_0x14a1da,_0x461bea=0x0,_0x1fc5b2=this[_0x795f9d(0x481)](),_0x1a2605=Graphics['boxWidth'],_0x15161d=this[_0x795f9d(0x2c7)]();return new Rectangle(_0x461bea,_0x1fc5b2,_0x1a2605,_0x15161d);},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x47e)]=Scene_Equip['prototype'][_0x14a1da(0x1f2)],Scene_Equip['prototype'][_0x14a1da(0x1f2)]=function(){const _0x19e55f=_0x14a1da;if(this[_0x19e55f(0x526)]()){if(_0x19e55f(0x262)!==_0x19e55f(0x1c6))return this[_0x19e55f(0x1a9)]();else{function _0x5981c5(){const _0xe0a659=_0x19e55f,_0x441432=this[_0xe0a659(0x217)][_0xe0a659(0x33c)][_0x510988],_0x4ff0b6=_0x1aa667['prototype']['buffIconIndex'](_0x441432,_0xa05805);if(_0x4ff0b6>0x0){_0x2e7269+=_0xe0a659(0x480)[_0xe0a659(0x27e)](_0x4ff0b6),_0x511b97++;if(_0x487e5d>=_0x50d40d)return _0x22d5f5;}}}}else return VisuMZ[_0x19e55f(0x209)][_0x19e55f(0x47e)][_0x19e55f(0x593)](this);},Scene_Equip[_0x14a1da(0x1a8)][_0x14a1da(0x1a9)]=function(){const _0x316f06=_0x14a1da,_0x39c99c=this['isRightInputMode']()?0x0:Graphics[_0x316f06(0x565)]-this['statusWidth'](),_0x428ca6=this[_0x316f06(0x538)](),_0x488684=this['statusWidth'](),_0x89d0a=this[_0x316f06(0x36f)]();return new Rectangle(_0x39c99c,_0x428ca6,_0x488684,_0x89d0a);},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x31d)]=Scene_Equip[_0x14a1da(0x1a8)][_0x14a1da(0x2f2)],Scene_Equip[_0x14a1da(0x1a8)][_0x14a1da(0x2f2)]=function(){const _0x1d5a17=_0x14a1da;if(this[_0x1d5a17(0x526)]())return this['commandWindowRectItemsEquipsCore']();else{if(_0x1d5a17(0x37a)!=='BDmXY'){function _0x995169(){const _0x5c57a6=_0x1d5a17;_0x2daa58[_0x5c57a6(0x1a8)][_0x5c57a6(0x1c1)][_0x5c57a6(0x593)](this);}}else return VisuMZ[_0x1d5a17(0x209)]['Scene_Equip_commandWindowRect'][_0x1d5a17(0x593)](this);}},Scene_Equip[_0x14a1da(0x1a8)][_0x14a1da(0x367)]=function(){const _0x1e9ccd=_0x14a1da,_0xd8e201=VisuMZ[_0x1e9ccd(0x209)][_0x1e9ccd(0x4ad)][_0x1e9ccd(0x1ad)];return _0xd8e201[_0x1e9ccd(0x3cf)]||_0xd8e201[_0x1e9ccd(0x292)];},Scene_Equip[_0x14a1da(0x1a8)]['commandWindowRectItemsEquipsCore']=function(){const _0x43b53e=_0x14a1da,_0x1ffdc4=this[_0x43b53e(0x367)](),_0x31c8fe=this['isRightInputMode']()?this['statusWidth']():0x0,_0x3f3a1b=this[_0x43b53e(0x538)](),_0x1c098e=Graphics['boxWidth']-this[_0x43b53e(0x21f)](),_0x261b4d=_0x1ffdc4?this[_0x43b53e(0x571)](0x1,!![]):0x0;return new Rectangle(_0x31c8fe,_0x3f3a1b,_0x1c098e,_0x261b4d);},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x23f)]=Scene_Equip[_0x14a1da(0x1a8)][_0x14a1da(0x4fd)],Scene_Equip[_0x14a1da(0x1a8)][_0x14a1da(0x4fd)]=function(){const _0x28708b=_0x14a1da;VisuMZ[_0x28708b(0x209)][_0x28708b(0x23f)][_0x28708b(0x593)](this);if(this[_0x28708b(0x50c)]()){if(_0x28708b(0x3af)==='NtbHo')this[_0x28708b(0x3ef)]();else{function _0x1d9156(){const _0xde69a4=_0x28708b;return this['isItem'](_0xfc36b1)&&_0x6f34af[_0xde69a4(0x482)]===0x2;}}}},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x2b6)]=Scene_Equip[_0x14a1da(0x1a8)]['slotWindowRect'],Scene_Equip[_0x14a1da(0x1a8)][_0x14a1da(0x250)]=function(){const _0x1b1dcd=_0x14a1da;if(this[_0x1b1dcd(0x526)]()){if(_0x1b1dcd(0x3f7)===_0x1b1dcd(0x364)){function _0x4d2111(){const _0x2aeca7=_0x1b1dcd;_0x3aca58=_0x26dfbb||this[_0x2aeca7(0x5df)](),this[_0x2aeca7(0x539)][_0x2aeca7(0x1cb)]=0xa0;const _0xbb2b26=_0x2da4a6[_0x2aeca7(0x611)]();this[_0x2aeca7(0x539)][_0x2aeca7(0x498)](_0x1c97b+0x1,_0x6fe33c+0x1,_0x11bbb7-0x2,_0x300e50-0x2,_0xbb2b26),this[_0x2aeca7(0x539)]['paintOpacity']=0xff;}}else return this['slotWindowRectItemsEquipsCore']();}else{if(_0x1b1dcd(0x600)!==_0x1b1dcd(0x567))return VisuMZ[_0x1b1dcd(0x209)]['Scene_Equip_slotWindowRect']['call'](this);else{function _0x330e8e(){return _0x208a62['ScopeAlliesButUser'];}}}},Scene_Equip[_0x14a1da(0x1a8)][_0x14a1da(0x2be)]=function(){const _0x2fd71e=_0x14a1da,_0x55a221=this['commandWindowRect'](),_0x315dbb=this[_0x2fd71e(0x1c1)]()?this['statusWidth']():0x0,_0x5d2594=_0x55a221['y']+_0x55a221[_0x2fd71e(0x4e3)],_0x1f8fc3=Graphics[_0x2fd71e(0x565)]-this['statusWidth'](),_0x4aa4bf=this[_0x2fd71e(0x36f)]()-_0x55a221[_0x2fd71e(0x4e3)];return new Rectangle(_0x315dbb,_0x5d2594,_0x1f8fc3,_0x4aa4bf);},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x545)]=Scene_Equip[_0x14a1da(0x1a8)][_0x14a1da(0x4c9)],Scene_Equip[_0x14a1da(0x1a8)][_0x14a1da(0x4c9)]=function(){const _0x59a213=_0x14a1da;if(this[_0x59a213(0x526)]())return this[_0x59a213(0x250)]();else{if('hzfPH'!=='hzfPH'){function _0x51b113(){const _0x562af2=_0x59a213;this[_0x562af2(0x4f9)](_0x38e647);}}else return VisuMZ[_0x59a213(0x209)][_0x59a213(0x545)][_0x59a213(0x593)](this);}},Scene_Equip[_0x14a1da(0x1a8)][_0x14a1da(0x21f)]=function(){const _0x469242=_0x14a1da;return this['isUseItemsEquipsCoreUpdatedLayout']()?this['geUpdatedLayoutStatusWidth']():VisuMZ['ItemsEquipsCore'][_0x469242(0x4ad)]['EquipScene'][_0x469242(0x5ef)];},Scene_Equip[_0x14a1da(0x1a8)]['geUpdatedLayoutStatusWidth']=function(){const _0x4c7076=_0x14a1da;return Math['floor'](Graphics[_0x4c7076(0x565)]/0x2);},Scene_Equip['prototype'][_0x14a1da(0x3ef)]=function(){const _0x3b04da=_0x14a1da;this[_0x3b04da(0x508)][_0x3b04da(0x393)](_0x3b04da(0x598),this[_0x3b04da(0x582)][_0x3b04da(0x1c8)](this)),this['_slotWindow'][_0x3b04da(0x393)](_0x3b04da(0x237),this[_0x3b04da(0x5fe)][_0x3b04da(0x1c8)](this)),this[_0x3b04da(0x508)]['setHandler'](_0x3b04da(0x2a4),this['previousActor'][_0x3b04da(0x1c8)](this));},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x34b)]=Scene_Equip[_0x14a1da(0x1a8)][_0x14a1da(0x3d7)],Scene_Equip[_0x14a1da(0x1a8)][_0x14a1da(0x3d7)]=function(){const _0x2add2b=_0x14a1da;this['isUseModernControls']()&&(this[_0x2add2b(0x2df)][_0x2add2b(0x455)](),this['_commandWindow'][_0x2add2b(0x407)]()),VisuMZ[_0x2add2b(0x209)][_0x2add2b(0x34b)][_0x2add2b(0x593)](this);},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x604)]=Scene_Equip['prototype'][_0x14a1da(0x369)],Scene_Equip[_0x14a1da(0x1a8)]['onSlotOk']=function(){const _0x463ca9=_0x14a1da;if(this[_0x463ca9(0x508)][_0x463ca9(0x4ff)]()>=0x0){if(_0x463ca9(0x313)===_0x463ca9(0x247)){function _0x4c7d92(){const _0x51eab6=_0x463ca9;_0x2f5e7b===this[_0x51eab6(0x4ff)]()&&(this[_0x51eab6(0x320)]=!![]),this['activate'](),this[_0x51eab6(0x2e0)](_0x503628);}}else VisuMZ['ItemsEquipsCore'][_0x463ca9(0x604)]['call'](this),this['onSlotOkAutoSelect']();}else{if(_0x463ca9(0x4c3)!==_0x463ca9(0x4c3)){function _0x3018f8(){const _0x3167fe=_0x463ca9;return _0x107846[_0x3167fe(0x54d)];}}else this[_0x463ca9(0x508)][_0x463ca9(0x3b0)](0x0),this[_0x463ca9(0x508)][_0x463ca9(0x2d4)]();}},Scene_Equip['prototype']['onSlotOkAutoSelect']=function(){const _0x1e8596=_0x14a1da;this[_0x1e8596(0x432)][_0x1e8596(0x21e)]();const _0xcb9696=this[_0x1e8596(0x508)][_0x1e8596(0x424)](),_0x5b5f46=this['_itemWindow'][_0x1e8596(0x295)][_0x1e8596(0x36d)](_0xcb9696),_0xb3bce1=Math[_0x1e8596(0x4d0)](this[_0x1e8596(0x432)][_0x1e8596(0x46b)]()/0x2)-0x1;this['_itemWindow'][_0x1e8596(0x3b0)](_0x5b5f46>=0x0?_0x5b5f46:0x0),this[_0x1e8596(0x432)][_0x1e8596(0x311)](this[_0x1e8596(0x432)][_0x1e8596(0x4ff)]()-_0xb3bce1);},VisuMZ['ItemsEquipsCore']['Scene_Equip_onSlotCancel']=Scene_Equip[_0x14a1da(0x1a8)]['onSlotCancel'],Scene_Equip[_0x14a1da(0x1a8)][_0x14a1da(0x5b6)]=function(){const _0x821e81=_0x14a1da;VisuMZ[_0x821e81(0x209)][_0x821e81(0x460)][_0x821e81(0x593)](this),this[_0x821e81(0x50c)]()&&(this[_0x821e81(0x2df)][_0x821e81(0x3b0)](0x0),this[_0x821e81(0x508)][_0x821e81(0x407)]());},VisuMZ[_0x14a1da(0x209)]['Scene_Equip_onActorChange']=Scene_Equip[_0x14a1da(0x1a8)][_0x14a1da(0x286)],Scene_Equip[_0x14a1da(0x1a8)][_0x14a1da(0x286)]=function(){const _0x4ab305=_0x14a1da;VisuMZ[_0x4ab305(0x209)]['Scene_Equip_onActorChange'][_0x4ab305(0x593)](this);if(this[_0x4ab305(0x50c)]()){if('dvMmf'===_0x4ab305(0x1be))this[_0x4ab305(0x2df)][_0x4ab305(0x407)](),this[_0x4ab305(0x2df)][_0x4ab305(0x455)](),this['_slotWindow'][_0x4ab305(0x3b0)](0x0),this[_0x4ab305(0x508)][_0x4ab305(0x2d4)]();else{function _0xb97d8e(){const _0x4b8728=_0x4ab305,_0x5d53e6=_0x347217['parse']('['+_0x3c2a50['$1'][_0x4b8728(0x2fb)](/\d+/g)+']');for(const _0x9d5635 of _0x5d53e6){if(!_0x2cf59e[_0x4b8728(0x37c)](_0x9d5635))return!![];}return![];}}}},Scene_Equip[_0x14a1da(0x1a8)]['buttonAssistSlotWindowShift']=function(){const _0x5c5e8b=_0x14a1da;if(!this[_0x5c5e8b(0x508)])return![];if(!this[_0x5c5e8b(0x508)][_0x5c5e8b(0x4db)])return![];return this['_slotWindow'][_0x5c5e8b(0x4f2)]();},Scene_Equip['prototype'][_0x14a1da(0x4a7)]=function(){const _0x1f77c5=_0x14a1da;if(this[_0x1f77c5(0x2e2)]())return TextManager[_0x1f77c5(0x3b1)](_0x1f77c5(0x55e));return Scene_MenuBase[_0x1f77c5(0x1a8)]['buttonAssistKey3'][_0x1f77c5(0x593)](this);},Scene_Equip[_0x14a1da(0x1a8)][_0x14a1da(0x4c4)]=function(){const _0x497680=_0x14a1da;if(this[_0x497680(0x2e2)]()){if(_0x497680(0x37b)===_0x497680(0x40b)){function _0x14fc37(){const _0xdfaeef=_0x497680;this[_0xdfaeef(0x3ea)][_0xdfaeef(0x411)](this['_statusWindow']);}}else return VisuMZ[_0x497680(0x209)][_0x497680(0x4ad)][_0x497680(0x1ad)][_0x497680(0x329)];}return Scene_MenuBase[_0x497680(0x1a8)]['buttonAssistText3'][_0x497680(0x593)](this);},Scene_Equip['prototype'][_0x14a1da(0x525)]=function(){const _0x4dd2fa=_0x14a1da;if(this['buttonAssistSlotWindowShift']())return this[_0x4dd2fa(0x5d1)]['width']/0x5/-0x3;return Scene_MenuBase[_0x4dd2fa(0x1a8)][_0x4dd2fa(0x525)][_0x4dd2fa(0x593)](this);},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x52f)]=Scene_Load[_0x14a1da(0x1a8)][_0x14a1da(0x406)],Scene_Load[_0x14a1da(0x1a8)][_0x14a1da(0x406)]=function(){const _0x1f9662=_0x14a1da;VisuMZ[_0x1f9662(0x209)][_0x1f9662(0x52f)]['call'](this),this[_0x1f9662(0x388)]();},Scene_Load[_0x14a1da(0x1a8)][_0x14a1da(0x388)]=function(){const _0x4c4676=_0x14a1da;if($gameSystem[_0x4c4676(0x30a)]()!==$dataSystem['versionId'])for(const _0x487979 of $gameActors['_data']){if(_0x487979)_0x487979['prepareNewEquipSlotsOnLoad']();}},Scene_Shop[_0x14a1da(0x1a8)]['isBottomHelpMode']=function(){const _0x58bbe6=_0x14a1da;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x58bbe6(0x3ac)]!==undefined)return ConfigManager[_0x58bbe6(0x3ac)];else{if(this[_0x58bbe6(0x526)]())return this[_0x58bbe6(0x373)]()[_0x58bbe6(0x2fb)](/LOWER/i);else Scene_MenuBase[_0x58bbe6(0x1a8)][_0x58bbe6(0x1c1)][_0x58bbe6(0x593)](this);}},Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x1c1)]=function(){const _0x3a602c=_0x14a1da;if(ConfigManager[_0x3a602c(0x48a)]&&ConfigManager[_0x3a602c(0x54d)]!==undefined){if(_0x3a602c(0x4d3)!=='aIjnt')return ConfigManager[_0x3a602c(0x54d)];else{function _0x4f2c11(){const _0x4d586e=_0x3a602c;return this[_0x4d586e(0x526)]()?this['slotWindowRectItemsEquipsCore']():_0x3bd673['ItemsEquipsCore'][_0x4d586e(0x2b6)][_0x4d586e(0x593)](this);}}}else{if(this[_0x3a602c(0x526)]()){if(_0x3a602c(0x1d8)!==_0x3a602c(0x21c))return this[_0x3a602c(0x373)]()[_0x3a602c(0x2fb)](/RIGHT/i);else{function _0x2347ed(){const _0x38e89d=_0x3a602c;_0x190ade['isTriggered'](_0x38e89d(0x237))&&this[_0x38e89d(0x24d)](),_0x41573d['isTriggered'](_0x38e89d(0x2a4))&&this['cursorPageup']();}}}else Scene_MenuBase[_0x3a602c(0x1a8)][_0x3a602c(0x1c1)][_0x3a602c(0x593)](this);}},Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x373)]=function(){const _0x37edd2=_0x14a1da;return VisuMZ[_0x37edd2(0x209)][_0x37edd2(0x4ad)]['ShopScene'][_0x37edd2(0x25e)];},Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x50c)]=function(){const _0x9e48ac=_0x14a1da;return this[_0x9e48ac(0x1bd)]&&this[_0x9e48ac(0x1bd)][_0x9e48ac(0x50c)]();},Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x526)]=function(){const _0x870a4a=_0x14a1da;return VisuMZ[_0x870a4a(0x209)]['Settings'][_0x870a4a(0x304)]['EnableLayout'];},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x3e5)]=Scene_Shop['prototype'][_0x14a1da(0x5f9)],Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x5f9)]=function(_0x4fdae6,_0x303aa7){const _0x4ae76f=_0x14a1da;_0x4fdae6=JsonEx['makeDeepCopy'](_0x4fdae6),VisuMZ['ItemsEquipsCore'][_0x4ae76f(0x3e5)][_0x4ae76f(0x593)](this,_0x4fdae6,_0x303aa7),this[_0x4ae76f(0x29a)]();},Scene_Shop['prototype']['adjustHiddenShownGoods']=function(){const _0x2c35b0=_0x14a1da;this['_goodsCount']=0x0;for(const _0x4b11ba of this[_0x2c35b0(0x5c6)]){if(this[_0x2c35b0(0x1dd)](_0x4b11ba))this['_goodsCount']++;else{if('gYoXU'!==_0x2c35b0(0x542))_0x4b11ba[0x0]=-0x1;else{function _0x59b98e(){const _0x6bade3=_0x2c35b0;_0x1fef16='item-%1'[_0x6bade3(0x27e)](_0x265653['id']);}}}}},Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x1dd)]=function(_0x4c4a28){const _0x4ed763=_0x14a1da;if(_0x4c4a28[0x0]>0x2||_0x4c4a28[0x0]<0x0)return![];const _0x4fef6a=[$dataItems,$dataWeapons,$dataArmors][_0x4c4a28[0x0]][_0x4c4a28[0x1]];if(!_0x4fef6a)return![];const _0x477833=_0x4fef6a[_0x4ed763(0x214)]||'';if(_0x477833[_0x4ed763(0x2fb)](/<SHOW SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x15cd44=JSON[_0x4ed763(0x5cb)]('['+RegExp['$1'][_0x4ed763(0x2fb)](/\d+/g)+']');for(const _0xbcf6ed of _0x15cd44){if(_0x4ed763(0x466)!==_0x4ed763(0x618)){if(!$gameSwitches['value'](_0xbcf6ed))return![];}else{function _0x2a0a35(){const _0x43b204=_0x4ed763;return _0x542fcd[_0x43b204(0x209)][_0x43b204(0x47e)][_0x43b204(0x593)](this);}}}return!![];}if(_0x477833[_0x4ed763(0x2fb)](/<SHOW SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x4ed763(0x48f)===_0x4ed763(0x48f)){const _0x2a44bb=JSON['parse']('['+RegExp['$1'][_0x4ed763(0x2fb)](/\d+/g)+']');for(const _0x25c66e of _0x2a44bb){if(!$gameSwitches[_0x4ed763(0x37c)](_0x25c66e))return![];}return!![];}else{function _0x26e97d(){const _0x57fd6e=_0x4ed763;return _0x474d2a[_0x57fd6e(0x209)][_0x57fd6e(0x545)]['call'](this);}}}if(_0x477833['match'](/<SHOW SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5e2321=JSON['parse']('['+RegExp['$1'][_0x4ed763(0x2fb)](/\d+/g)+']');for(const _0x2f7911 of _0x5e2321){if('zqxOo'===_0x4ed763(0x5d0)){function _0x4513f7(){const _0x2bc719=_0x4ed763;return _0xaeac6a['getInputMultiButtonStrings'](_0x2bc719(0x473),_0x2bc719(0x547));}}else{if($gameSwitches[_0x4ed763(0x37c)](_0x2f7911))return!![];}}return![];}if(_0x477833[_0x4ed763(0x2fb)](/<HIDE SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x228a78=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x56f217 of _0x228a78){if('niirz'!=='UuBEJ'){if(!$gameSwitches[_0x4ed763(0x37c)](_0x56f217))return!![];}else{function _0x4033a4(){const _0x19f0bf=_0x4ed763;_0x4a21b2[_0x19f0bf(0x209)][_0x19f0bf(0x246)][_0x19f0bf(0x593)](this,_0xb1a1d4),_0x4edba1[_0x19f0bf(0x209)][_0x19f0bf(0x5ab)](_0x7e2d37,_0x4d8642);}}}return![];}if(_0x477833[_0x4ed763(0x2fb)](/<HIDE SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3fa72a=JSON['parse']('['+RegExp['$1'][_0x4ed763(0x2fb)](/\d+/g)+']');for(const _0x39330a of _0x3fa72a){if(!$gameSwitches[_0x4ed763(0x37c)](_0x39330a))return!![];}return![];}if(_0x477833[_0x4ed763(0x2fb)](/<HIDE SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x4ed763(0x35d)==='FCmSq'){const _0x530953=JSON[_0x4ed763(0x5cb)]('['+RegExp['$1'][_0x4ed763(0x2fb)](/\d+/g)+']');for(const _0x1982b5 of _0x530953){if('CEgyV'==='WnDFI'){function _0x11780c(){const _0x2397de=_0x4ed763;return this['_shopStatusMenuMode']?this[_0x2397de(0x2a5)]?_0xff07d0[_0x2397de(0x5ec)]:0x1:_0x1cfea4[_0x2397de(0x209)]['Game_BattlerBase_param'][_0x2397de(0x593)](this,_0xdd2f1e);}}else{if($gameSwitches[_0x4ed763(0x37c)](_0x1982b5))return![];}}return!![];}else{function _0x3a1712(){const _0x16f31a=_0x4ed763,_0x665405=_0x558379[_0x16f31a(0x209)]['Settings'][_0x16f31a(0x3d4)];let _0x14251d=_0x665405[_0x16f31a(0x263)]!==_0x2adf5f?_0x665405[_0x16f31a(0x263)]:0x13;return _0x125a7f['getColor'](_0x14251d);}}}return!![];},VisuMZ[_0x14a1da(0x209)]['Scene_Shop_create']=Scene_Shop['prototype'][_0x14a1da(0x5e2)],Scene_Shop[_0x14a1da(0x1a8)]['create']=function(){const _0x55ca23=_0x14a1da;VisuMZ[_0x55ca23(0x209)]['Scene_Shop_create'][_0x55ca23(0x593)](this);if(this['isUseItemsEquipsCoreUpdatedLayout']()){if('ovlsC'!==_0x55ca23(0x5a2))this[_0x55ca23(0x3f2)]();else{function _0x21b5d2(){const _0x26fddd=_0x55ca23;_0x5769a8['ItemsEquipsCore'][_0x26fddd(0x460)][_0x26fddd(0x593)](this),this[_0x26fddd(0x50c)]()&&(this['_commandWindow'][_0x26fddd(0x3b0)](0x0),this[_0x26fddd(0x508)]['deactivate']());}}}this[_0x55ca23(0x3b6)]();},Scene_Shop[_0x14a1da(0x1a8)]['postCreateItemsEquipsCore']=function(){const _0x3ee5c0=_0x14a1da;this[_0x3ee5c0(0x4d9)][_0x3ee5c0(0x56e)](),this[_0x3ee5c0(0x5cd)][_0x3ee5c0(0x26f)](),this[_0x3ee5c0(0x5cd)][_0x3ee5c0(0x455)](),this['_statusWindow'][_0x3ee5c0(0x26f)]();},Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x2c1)]=function(){const _0x58310e=_0x14a1da;if(this[_0x58310e(0x526)]())return this['helpWindowRectItemsEquipsCore']();else{if('qicyl'===_0x58310e(0x5e3))return Scene_MenuBase[_0x58310e(0x1a8)][_0x58310e(0x2c1)]['call'](this);else{function _0x2ec88c(){const _0x511b01=_0x58310e;if(_0xd4e91b['uiMenuStyle']&&_0x1f2bea[_0x511b01(0x54d)]!==_0x514455)return _0x5bf464[_0x511b01(0x54d)];else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x511b01(0x373)]()[_0x511b01(0x2fb)](/RIGHT/i);else _0xa1029b[_0x511b01(0x1a8)]['isRightInputMode'][_0x511b01(0x593)](this);}}}}},Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x211)]=function(){const _0x33df07=_0x14a1da,_0x54c8c6=0x0,_0x30879c=this['helpAreaTop'](),_0x23b3c2=Graphics[_0x33df07(0x565)],_0x1a690e=this[_0x33df07(0x2c7)]();return new Rectangle(_0x54c8c6,_0x30879c,_0x23b3c2,_0x1a690e);},VisuMZ['ItemsEquipsCore'][_0x14a1da(0x1c4)]=Scene_Shop['prototype'][_0x14a1da(0x3fc)],Scene_Shop['prototype']['goldWindowRect']=function(){const _0x1d0b3c=_0x14a1da;return this[_0x1d0b3c(0x526)]()?this[_0x1d0b3c(0x385)]():VisuMZ['ItemsEquipsCore'][_0x1d0b3c(0x1c4)]['call'](this);},Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x385)]=function(){const _0x1972b3=_0x14a1da,_0x46fd3a=this[_0x1972b3(0x5ca)](),_0x2eb617=this[_0x1972b3(0x571)](0x1,!![]),_0x5d580e=this[_0x1972b3(0x1c1)]()?0x0:Graphics[_0x1972b3(0x565)]-_0x46fd3a,_0x394b0f=this[_0x1972b3(0x538)]();return new Rectangle(_0x5d580e,_0x394b0f,_0x46fd3a,_0x2eb617);},VisuMZ[_0x14a1da(0x209)]['Scene_Shop_commandWindowRect']=Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x2f2)],Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x2f2)]=function(){const _0x44f914=_0x14a1da;if(this[_0x44f914(0x526)]()){if(_0x44f914(0x5e4)!==_0x44f914(0x5e4)){function _0x1dd83e(){const _0x30c86c=_0x44f914,_0x34a324=this[_0x30c86c(0x4e4)](),_0x5ba858=_0x32ef9c[_0x30c86c(0x209)][_0x30c86c(0x4ad)][_0x30c86c(0x304)][_0x30c86c(0x3b8)],_0x1ad37b=_0x34a324===_0x30c86c(0x4b5)?_0x754146[_0x30c86c(0x30b)]:_0x30c86c(0x514)['format'](_0x5ba858,_0x11c2cd[_0x30c86c(0x30b)]),_0xb114e3=this[_0x30c86c(0x25b)]();if(this[_0x30c86c(0x592)]()&&!_0xb114e3)return;this[_0x30c86c(0x1ed)](_0x1ad37b,'sell',_0xb114e3);}}else return this['commandWindowRectItemsEquipsCore']();}else{if('vqQBk'===_0x44f914(0x4ca)){function _0x3d01b1(){const _0x46af01=_0x44f914;this[_0x46af01(0x508)]['index']()>=0x0?(_0x40962b['ItemsEquipsCore'][_0x46af01(0x604)][_0x46af01(0x593)](this),this[_0x46af01(0x2fd)]()):(this[_0x46af01(0x508)][_0x46af01(0x3b0)](0x0),this[_0x46af01(0x508)][_0x46af01(0x2d4)]());}}else return VisuMZ[_0x44f914(0x209)][_0x44f914(0x3b3)]['call'](this);}},Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x3c4)]=function(){const _0x3e210d=_0x14a1da,_0x82ca=this[_0x3e210d(0x1c1)]()?this[_0x3e210d(0x5ca)]():0x0,_0x39bd49=this[_0x3e210d(0x538)](),_0x31beba=Graphics[_0x3e210d(0x565)]-this['mainCommandWidth'](),_0x4a6a35=this[_0x3e210d(0x571)](0x1,!![]);return new Rectangle(_0x82ca,_0x39bd49,_0x31beba,_0x4a6a35);},VisuMZ['ItemsEquipsCore'][_0x14a1da(0x528)]=Scene_Shop['prototype'][_0x14a1da(0x462)],Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x462)]=function(){const _0x1bae84=_0x14a1da;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x1bae84(0x53e)!==_0x1bae84(0x1e5))return this[_0x1bae84(0x368)]();else{function _0x15bd2c(){const _0x558557=_0x1bae84;_0x58209e=_0x558557(0x514)[_0x558557(0x27e)](_0x18e409,_0x44c861);}}}else return VisuMZ['ItemsEquipsCore']['Scene_Shop_numberWindowRect'][_0x1bae84(0x593)](this);},Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x368)]=function(){const _0x20eeab=_0x14a1da,_0x171a80=this['_commandWindow']['y']+this['_commandWindow'][_0x20eeab(0x4e3)],_0x4f715e=Graphics[_0x20eeab(0x565)]-this[_0x20eeab(0x21f)](),_0x4b1224=this[_0x20eeab(0x1c1)]()?Graphics[_0x20eeab(0x565)]-_0x4f715e:0x0,_0x4257dc=this['mainAreaHeight']()-this['_commandWindow'][_0x20eeab(0x4e3)];return new Rectangle(_0x4b1224,_0x171a80,_0x4f715e,_0x4257dc);},VisuMZ['ItemsEquipsCore']['Scene_Shop_statusWindowRect']=Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x1f2)],Scene_Shop['prototype'][_0x14a1da(0x1f2)]=function(){const _0x39e0bb=_0x14a1da;if(this[_0x39e0bb(0x526)]())return this['statusWindowRectItemsEquipsCore']();else{if(_0x39e0bb(0x58b)===_0x39e0bb(0x58b))return VisuMZ[_0x39e0bb(0x209)]['Scene_Shop_statusWindowRect'][_0x39e0bb(0x593)](this);else{function _0x5a9a74(){const _0x28b7da=_0x39e0bb;delete this['_categoryWindow'][_0x28b7da(0x340)]['ok'],delete this['_categoryWindow'][_0x28b7da(0x340)][_0x28b7da(0x598)];}}}},Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x1a9)]=function(){const _0xab6b49=_0x14a1da,_0x1ff37a=this['statusWidth'](),_0x30c73a=this['mainAreaHeight']()-this[_0xab6b49(0x2df)][_0xab6b49(0x4e3)],_0x1f320b=this['isRightInputMode']()?0x0:Graphics['boxWidth']-_0x1ff37a,_0x1fbd2e=this['_commandWindow']['y']+this[_0xab6b49(0x2df)][_0xab6b49(0x4e3)];return new Rectangle(_0x1f320b,_0x1fbd2e,_0x1ff37a,_0x30c73a);},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x38a)]=Scene_Shop['prototype'][_0x14a1da(0x202)],Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x202)]=function(){const _0x3f3f15=_0x14a1da;return this[_0x3f3f15(0x526)]()?this[_0x3f3f15(0x332)]():VisuMZ[_0x3f3f15(0x209)]['Scene_Shop_buyWindowRect'][_0x3f3f15(0x593)](this);},Scene_Shop[_0x14a1da(0x1a8)]['buyWindowRectItemsEquipsCore']=function(){const _0x507b08=_0x14a1da,_0x30edd9=this['_commandWindow']['y']+this[_0x507b08(0x2df)][_0x507b08(0x4e3)],_0x14b78c=Graphics[_0x507b08(0x565)]-this[_0x507b08(0x21f)](),_0x41c395=this[_0x507b08(0x36f)]()-this[_0x507b08(0x2df)][_0x507b08(0x4e3)],_0x5138d1=this[_0x507b08(0x1c1)]()?Graphics[_0x507b08(0x565)]-_0x14b78c:0x0;return new Rectangle(_0x5138d1,_0x30edd9,_0x14b78c,_0x41c395);},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x227)]=Scene_Shop['prototype'][_0x14a1da(0x1bf)],Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x1bf)]=function(){const _0x3e8ea8=_0x14a1da;VisuMZ[_0x3e8ea8(0x209)]['Scene_Shop_createCategoryWindow'][_0x3e8ea8(0x593)](this),this[_0x3e8ea8(0x50c)]()&&this[_0x3e8ea8(0x2d2)]();},VisuMZ[_0x14a1da(0x209)]['Scene_Shop_categoryWindowRect']=Scene_Shop[_0x14a1da(0x1a8)]['categoryWindowRect'],Scene_Shop['prototype']['categoryWindowRect']=function(){const _0x350820=_0x14a1da;return this[_0x350820(0x526)]()?this[_0x350820(0x24c)]():VisuMZ[_0x350820(0x209)]['Scene_Shop_categoryWindowRect'][_0x350820(0x593)](this);},Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x24c)]=function(){const _0x54d9bc=_0x14a1da,_0x14561b=this[_0x54d9bc(0x2df)]['y'],_0x144d1f=this[_0x54d9bc(0x2df)][_0x54d9bc(0x379)],_0x5528d3=this[_0x54d9bc(0x571)](0x1,!![]),_0xee3840=this[_0x54d9bc(0x1c1)]()?Graphics['boxWidth']-_0x144d1f:0x0;return new Rectangle(_0xee3840,_0x14561b,_0x144d1f,_0x5528d3);},Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x2d2)]=function(){const _0xc40bc6=_0x14a1da;delete this['_categoryWindow'][_0xc40bc6(0x340)]['ok'],delete this['_categoryWindow'][_0xc40bc6(0x340)][_0xc40bc6(0x598)];},VisuMZ['ItemsEquipsCore'][_0x14a1da(0x41a)]=Scene_Shop['prototype'][_0x14a1da(0x251)],Scene_Shop['prototype'][_0x14a1da(0x251)]=function(){const _0x17dc48=_0x14a1da;VisuMZ[_0x17dc48(0x209)][_0x17dc48(0x41a)][_0x17dc48(0x593)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x17dc48(0x521)]();},VisuMZ['ItemsEquipsCore']['Scene_Shop_sellWindowRect']=Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x2a0)],Scene_Shop['prototype']['sellWindowRect']=function(){const _0x55656f=_0x14a1da;if(this[_0x55656f(0x526)]()){if(_0x55656f(0x4de)!==_0x55656f(0x4de)){function _0x3a746(){const _0x3ad0fc=_0x55656f,_0x11da79='HP\x20RECOVERY';if(this['_customItemInfo'][_0x11da79])return this[_0x3ad0fc(0x416)][_0x11da79];let _0x1440ec='';if(this[_0x3ad0fc(0x217)][_0x3ad0fc(0x509)]>0x0)_0x1440ec+='+%1%'[_0x3ad0fc(0x27e)](_0x5cc1b3[_0x3ad0fc(0x4d0)](this[_0x3ad0fc(0x217)][_0x3ad0fc(0x509)]*0x64));if(this[_0x3ad0fc(0x217)][_0x3ad0fc(0x509)]>0x0&&this[_0x3ad0fc(0x217)]['flatHP']>0x0)_0x1440ec+='\x20';if(this[_0x3ad0fc(0x217)][_0x3ad0fc(0x45a)]>0x0)_0x1440ec+=_0x3ad0fc(0x307)[_0x3ad0fc(0x27e)](this[_0x3ad0fc(0x217)][_0x3ad0fc(0x45a)]);return _0x1440ec;}}else return this[_0x55656f(0x49b)]();}else return VisuMZ['ItemsEquipsCore'][_0x55656f(0x210)][_0x55656f(0x593)](this);},Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x49b)]=function(){const _0x203daa=_0x14a1da,_0x423373=this[_0x203daa(0x1bd)]['y']+this[_0x203daa(0x1bd)][_0x203daa(0x4e3)],_0x18387a=Graphics[_0x203daa(0x565)]-this[_0x203daa(0x21f)](),_0x120a0d=this[_0x203daa(0x36f)]()-this['_categoryWindow'][_0x203daa(0x4e3)],_0x3777f3=this[_0x203daa(0x1c1)]()?Graphics[_0x203daa(0x565)]-_0x18387a:0x0;return new Rectangle(_0x3777f3,_0x423373,_0x18387a,_0x120a0d);},Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x521)]=function(){const _0x52c2c8=_0x14a1da;this[_0x52c2c8(0x3ea)]['setStatusWindow'](this['_statusWindow']);},Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x21f)]=function(){const _0xbb344f=_0x14a1da;return VisuMZ[_0xbb344f(0x209)][_0xbb344f(0x4ad)][_0xbb344f(0x3d4)][_0xbb344f(0x49c)];},VisuMZ['ItemsEquipsCore'][_0x14a1da(0x204)]=Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x3a1)],Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x3a1)]=function(){const _0x54c16e=_0x14a1da;VisuMZ['ItemsEquipsCore'][_0x54c16e(0x204)][_0x54c16e(0x593)](this);if(this[_0x54c16e(0x526)]()){if(_0x54c16e(0x2c3)===_0x54c16e(0x2c3))this[_0x54c16e(0x319)][_0x54c16e(0x26f)]();else{function _0x1d157f(){const _0x37cb86=_0x54c16e;return _0x4451de[_0x37cb86(0x42d)]&&_0x2195a8[_0x37cb86(0x1a8)][_0x37cb86(0x50c)][_0x37cb86(0x593)](this);}}}this['_sellWindow']['updateHelp']();},VisuMZ['ItemsEquipsCore']['Scene_Shop_commandBuy']=Scene_Shop['prototype'][_0x14a1da(0x5b5)],Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x5b5)]=function(){const _0x570878=_0x14a1da;VisuMZ[_0x570878(0x209)][_0x570878(0x30f)]['call'](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this['commandBuyItemsEquipsCore']();},Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x296)]=function(){const _0x320aaf=_0x14a1da;this[_0x320aaf(0x32b)]=this[_0x320aaf(0x32b)]||0x0,this[_0x320aaf(0x5cd)][_0x320aaf(0x3b0)](this[_0x320aaf(0x32b)]);},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x52b)]=Scene_Shop['prototype'][_0x14a1da(0x46d)],Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x46d)]=function(){const _0x4a6681=_0x14a1da;VisuMZ[_0x4a6681(0x209)][_0x4a6681(0x52b)][_0x4a6681(0x593)](this),this[_0x4a6681(0x526)]()&&this[_0x4a6681(0x49d)](),this[_0x4a6681(0x50c)]()&&(this[_0x4a6681(0x1bd)]['smoothSelect'](0x0),this[_0x4a6681(0x2f7)]());},Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x49d)]=function(){const _0xa94fca=_0x14a1da;this[_0xa94fca(0x5cd)]['hide'](),this[_0xa94fca(0x2df)]['hide']();},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x48e)]=Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x57e)],Scene_Shop[_0x14a1da(0x1a8)]['onBuyCancel']=function(){const _0x5a4eb1=_0x14a1da;VisuMZ[_0x5a4eb1(0x209)][_0x5a4eb1(0x48e)]['call'](this);if(this[_0x5a4eb1(0x526)]()){if(_0x5a4eb1(0x245)===_0x5a4eb1(0x4b1)){function _0x361e5e(){const _0x322c10=_0x5a4eb1;return _0x322c10(0x613)[_0x322c10(0x27e)](_0x50b9d6(_0x581939['$1']));}}else this[_0x5a4eb1(0x500)]();}},Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x500)]=function(){const _0x10d2ff=_0x14a1da;this[_0x10d2ff(0x32b)]=this[_0x10d2ff(0x5cd)][_0x10d2ff(0x4ff)](),this['_buyWindow'][_0x10d2ff(0x26f)](),this[_0x10d2ff(0x5cd)][_0x10d2ff(0x455)](),this[_0x10d2ff(0x5cd)]['smoothScrollTo'](0x0,0x0),this[_0x10d2ff(0x319)]['show'](),this[_0x10d2ff(0x4d9)][_0x10d2ff(0x56e)]();},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x4a0)]=Scene_Shop[_0x14a1da(0x1a8)]['onCategoryCancel'],Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x5de)]=function(){const _0x3fdc62=_0x14a1da;VisuMZ[_0x3fdc62(0x209)][_0x3fdc62(0x4a0)]['call'](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x3fdc62(0x25d)]();},Scene_Shop['prototype']['onCategoryCancelItemsEquipsCore']=function(){const _0x53f5f5=_0x14a1da;this['_buyWindow'][_0x53f5f5(0x26f)](),this[_0x53f5f5(0x2df)][_0x53f5f5(0x26f)]();},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x5db)]=Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x546)],Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x546)]=function(){const _0x41284b=_0x14a1da;VisuMZ[_0x41284b(0x209)][_0x41284b(0x5db)]['call'](this);if(this[_0x41284b(0x526)]()){if('qErYo'!==_0x41284b(0x5c3))this[_0x41284b(0x1a7)]();else{function _0x578039(){return'icon';}}}},Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x1a7)]=function(){const _0x34c35d=_0x14a1da;this[_0x34c35d(0x1bd)][_0x34c35d(0x26f)]();},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x510)]=Scene_Shop[_0x14a1da(0x1a8)]['onSellCancel'],Scene_Shop['prototype'][_0x14a1da(0x235)]=function(){const _0x4fd49c=_0x14a1da;VisuMZ[_0x4fd49c(0x209)][_0x4fd49c(0x510)]['call'](this),this[_0x4fd49c(0x50c)]()&&this['onCategoryCancel'](),this[_0x4fd49c(0x526)]()&&this[_0x4fd49c(0x4d9)][_0x4fd49c(0x56e)]();},VisuMZ[_0x14a1da(0x209)]['Scene_Shop_sellingPrice']=Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x4ee)],Scene_Shop['prototype'][_0x14a1da(0x4ee)]=function(){const _0x472439=_0x14a1da;let _0x2b147f=this[_0x472439(0x445)]();const _0x57bf30=this['_item'];return _0x2b147f=VisuMZ[_0x472439(0x209)][_0x472439(0x4ad)][_0x472439(0x304)][_0x472439(0x5fa)]['call'](this,_0x57bf30,_0x2b147f),_0x2b147f;},Scene_Shop['prototype'][_0x14a1da(0x445)]=function(){const _0x199430=_0x14a1da;if(!this['_item'])return 0x0;else{if(this[_0x199430(0x2a7)][_0x199430(0x214)][_0x199430(0x2fb)](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){if(_0x199430(0x26e)===_0x199430(0x21a)){function _0x135fd2(){const _0x546fff=_0x199430;return _0x45469f[_0x546fff(0x209)][_0x546fff(0x4ad)][_0x546fff(0x1ad)][_0x546fff(0x47b)];}}else{const _0x58d919=String(RegExp['$1']);let _0x50067c=this[_0x199430(0x2a7)],_0x14c234=_0x50067c[_0x199430(0x2fa)]*this['sellPriceRate']();try{eval(_0x58d919);}catch(_0xe11f4c){if('XLfag'!==_0x199430(0x277)){function _0xc64bf(){const _0x59a28b=_0x199430;this[_0x59a28b(0x353)]*=-0x1;}}else{if($gameTemp[_0x199430(0x5f5)]())console[_0x199430(0x20e)](_0xe11f4c);}}if(isNaN(_0x14c234))_0x14c234=0x0;return Math[_0x199430(0x4d0)](_0x14c234);}}else{if(this[_0x199430(0x2a7)][_0x199430(0x214)][_0x199430(0x2fb)](/<SELL PRICE:[ ](\d+)>/i))return parseInt(RegExp['$1']);else{if(_0x199430(0x260)===_0x199430(0x5f0)){function _0x1302dc(){const _0x12e7bd=_0x199430;return this[_0x12e7bd(0x211)]();}}else return Math[_0x199430(0x4d0)](this[_0x199430(0x2a7)][_0x199430(0x2fa)]*this['sellPriceRate']());}}}},Scene_Shop['prototype'][_0x14a1da(0x2fe)]=function(){const _0x34ef5b=_0x14a1da;return VisuMZ[_0x34ef5b(0x209)][_0x34ef5b(0x4ad)][_0x34ef5b(0x304)][_0x34ef5b(0x512)];},Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x3a0)]=function(){const _0x3e6d3f=_0x14a1da;if(!this['updatedLayoutStyle']())return![];if(!this['isUseModernControls']())return![];if(!this[_0x3e6d3f(0x3ea)])return![];if(!this[_0x3e6d3f(0x3ea)][_0x3e6d3f(0x4db)])return![];return this[_0x3e6d3f(0x373)]()&&this[_0x3e6d3f(0x50c)]();},Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x371)]=function(){const _0x2926d5=_0x14a1da;if(this[_0x2926d5(0x3a0)]()){if('kjDdy'==='gPzzV'){function _0x526203(){const _0x5d918a=_0x2926d5;_0x2b6520['prototype'][_0x5d918a(0x363)][_0x5d918a(0x593)](this,_0x335bdc);}}else{if(this[_0x2926d5(0x3ea)]['maxCols']()===0x1){if('pTCRb'!=='YuLPX')return TextManager['getInputMultiButtonStrings']('left',_0x2926d5(0x547));else{function _0x507930(){const _0x1025b7=_0x2926d5,_0xa878d0='HP\x20DAMAGE';if(this[_0x1025b7(0x217)][_0x1025b7(0x509)]>=0x0&&this[_0x1025b7(0x217)][_0x1025b7(0x45a)]>=0x0&&!this[_0x1025b7(0x416)][_0xa878d0])return![];const _0x59e88b=this[_0x1025b7(0x57f)]();this['drawItemKeyData'](_0x59e88b,_0x5c3eeb,_0x127d2b,_0x136a46,!![]);const _0x5f2051=this['getItemEffectsHpDamageText']();return this['changeTextColor'](_0x254909['damageColor'](0x0)),this[_0x1025b7(0x4cc)](_0x5f2051,_0x5d865a,_0x14e350,_0xef63fd,![],_0x1025b7(0x547)),this['drawItemDarkRect'](_0xef5dc6,_0x3d83b1,_0x364950),this['resetFontSettings'](),!![];}}}else return TextManager[_0x2926d5(0x5ac)](_0x2926d5(0x2a4),'pagedown');}}else{if(this[_0x2926d5(0x435)]&&this['_numberWindow'][_0x2926d5(0x4db)]){if(_0x2926d5(0x602)!==_0x2926d5(0x602)){function _0xa6fcd9(){const _0x4095bf=_0x2926d5;_0x407437[_0x4095bf(0x209)][_0x4095bf(0x255)][_0x4095bf(0x593)](this),this[_0x4095bf(0x432)][_0x4095bf(0x357)]();}}else return TextManager['getInputMultiButtonStrings'](_0x2926d5(0x473),_0x2926d5(0x547));}}return Scene_MenuBase[_0x2926d5(0x1a8)][_0x2926d5(0x371)][_0x2926d5(0x593)](this);},Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x4fc)]=function(){const _0xffac81=_0x14a1da;if(this['_numberWindow']&&this[_0xffac81(0x435)][_0xffac81(0x4db)]){if(_0xffac81(0x5eb)===_0xffac81(0x2d7)){function _0x55b560(){const _0x287fab=_0xffac81,_0x4b4614=_0x287fab(0x224);if(this[_0x287fab(0x416)][_0x4b4614])return this[_0x287fab(0x416)][_0x4b4614];if(this['_item'][_0x287fab(0x36a)][_0x287fab(0x3b7)]<=-0x1)return _0x2581af[_0x287fab(0x209)][_0x287fab(0x4ad)][_0x287fab(0x3d4)][_0x287fab(0x31c)];else return this[_0x287fab(0x2a7)][_0x287fab(0x36a)][_0x287fab(0x3b7)]===0x0?_0x7adabd['ItemsEquipsCore'][_0x287fab(0x4ad)][_0x287fab(0x3d4)][_0x287fab(0x4b0)]:_0x58d310[_0x287fab(0x52a)][this['_item'][_0x287fab(0x36a)]['elementId']];}}else return TextManager[_0xffac81(0x5ac)]('up',_0xffac81(0x5c4));}return Scene_MenuBase[_0xffac81(0x1a8)]['buttonAssistKey2']['call'](this);},Scene_Shop['prototype']['buttonAssistText1']=function(){const _0x579f81=_0x14a1da;if(this[_0x579f81(0x3a0)]())return VisuMZ[_0x579f81(0x209)]['Settings'][_0x579f81(0x5da)][_0x579f81(0x3c2)];else{if(this[_0x579f81(0x435)]&&this['_numberWindow'][_0x579f81(0x4db)]){if(_0x579f81(0x5d7)===_0x579f81(0x34e)){function _0x5b3535(){const _0x3aae50=_0x579f81;if(!this['isEquipItem']()&&!_0x12a9d5[_0x3aae50(0x4ac)](this['_item']))return;const _0x42abc0=this[_0x3aae50(0x2f4)]-this['itemPadding']()-_0x8d3ea9,_0x54ad2d=this[_0x3aae50(0x200)]('0000');this[_0x3aae50(0x1ce)](_0x5d398d[_0x3aae50(0x1cc)]()),this[_0x3aae50(0x464)](_0x3c410e[_0x3aae50(0x23d)],_0x4b9591+this['itemPadding'](),_0x43dead,_0x42abc0-_0x54ad2d),this[_0x3aae50(0x21d)](),this[_0x3aae50(0x555)](this[_0x3aae50(0x2a7)],_0x3b5102,_0x248dd0,_0x42abc0);}}else return VisuMZ['ItemsEquipsCore'][_0x579f81(0x4ad)][_0x579f81(0x304)][_0x579f81(0x305)];}}return Scene_MenuBase[_0x579f81(0x1a8)][_0x579f81(0x5cc)][_0x579f81(0x593)](this);},Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x475)]=function(){const _0x15ed99=_0x14a1da;if(this[_0x15ed99(0x435)]&&this[_0x15ed99(0x435)][_0x15ed99(0x4db)])return VisuMZ[_0x15ed99(0x209)][_0x15ed99(0x4ad)][_0x15ed99(0x304)][_0x15ed99(0x46e)];return Scene_MenuBase[_0x15ed99(0x1a8)][_0x15ed99(0x475)][_0x15ed99(0x593)](this);},Scene_Shop[_0x14a1da(0x1a8)]['resetShopSwitches']=function(){const _0x416f41=_0x14a1da;if(!SceneManager[_0x416f41(0x4b4)]())return;const _0x968e7=VisuMZ[_0x416f41(0x209)][_0x416f41(0x4ad)][_0x416f41(0x304)];_0x968e7['SwitchBuy']&&$gameSwitches[_0x416f41(0x5a4)](_0x968e7['SwitchBuy'],![]),_0x968e7[_0x416f41(0x1cd)]&&$gameSwitches[_0x416f41(0x5a4)](_0x968e7[_0x416f41(0x1cd)],![]);},VisuMZ['ItemsEquipsCore'][_0x14a1da(0x3fd)]=Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x408)],Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x408)]=function(_0x9b5848){const _0x402566=_0x14a1da;VisuMZ[_0x402566(0x209)][_0x402566(0x3fd)][_0x402566(0x593)](this,_0x9b5848);if(_0x9b5848<=0x0)return;const _0x3a8d31=VisuMZ['ItemsEquipsCore'][_0x402566(0x4ad)]['ShopScene'];_0x3a8d31[_0x402566(0x3d0)]&&$gameSwitches[_0x402566(0x5a4)](_0x3a8d31[_0x402566(0x3d0)],!![]);},VisuMZ['ItemsEquipsCore'][_0x14a1da(0x3e2)]=Scene_Shop[_0x14a1da(0x1a8)][_0x14a1da(0x28c)],Scene_Shop[_0x14a1da(0x1a8)]['doSell']=function(_0x484a84){const _0x1732e5=_0x14a1da;VisuMZ['ItemsEquipsCore'][_0x1732e5(0x3e2)][_0x1732e5(0x593)](this,_0x484a84);if(_0x484a84<=0x0)return;const _0xb946fa=VisuMZ[_0x1732e5(0x209)][_0x1732e5(0x4ad)][_0x1732e5(0x304)];if(_0xb946fa[_0x1732e5(0x3d0)]){if(_0x1732e5(0x503)!==_0x1732e5(0x503)){function _0x5529b7(){const _0x443ccf=_0x1732e5,_0x234cda=_0x443ccf(0x51e);if(this['_itemData'][_0x443ccf(0x509)]<=0x0&&this[_0x443ccf(0x217)][_0x443ccf(0x45a)]<=0x0&&!this[_0x443ccf(0x416)][_0x234cda])return![];const _0xadde2f=this[_0x443ccf(0x5c0)]();this[_0x443ccf(0x4cc)](_0xadde2f,_0x101ec4,_0xb5de01,_0x13ffc2,!![]);const _0x43f0b6=this[_0x443ccf(0x465)]();return this[_0x443ccf(0x1ce)](_0x4608a3[_0x443ccf(0x1db)](0x1)),this[_0x443ccf(0x4cc)](_0x43f0b6,_0x3a993a,_0x521360,_0x21d050,![],'right'),this['drawItemDarkRect'](_0x26e77e,_0x2fc7c9,_0x337b8b),this[_0x443ccf(0x2ad)](),!![];}}else $gameSwitches[_0x1732e5(0x5a4)](_0xb946fa[_0x1732e5(0x1cd)],!![]);}};function Sprite_NewLabel(){this['initialize'](...arguments);}Sprite_NewLabel[_0x14a1da(0x1a8)]=Object[_0x14a1da(0x5e2)](Sprite['prototype']),Sprite_NewLabel[_0x14a1da(0x1a8)]['constructor']=Sprite_NewLabel,Sprite_NewLabel[_0x14a1da(0x1a8)][_0x14a1da(0x355)]=function(){const _0x20b0fd=_0x14a1da;Sprite[_0x20b0fd(0x1a8)][_0x20b0fd(0x355)]['call'](this),this[_0x20b0fd(0x342)]();},Sprite_NewLabel[_0x14a1da(0x1a8)][_0x14a1da(0x342)]=function(){const _0x3bc88d=_0x14a1da,_0x338923=ImageManager[_0x3bc88d(0x302)],_0x1aa407=ImageManager[_0x3bc88d(0x3bb)];this['bitmap']=new Bitmap(_0x338923,_0x1aa407),this[_0x3bc88d(0x3fa)](),this[_0x3bc88d(0x5b7)]();},Sprite_NewLabel[_0x14a1da(0x1a8)][_0x14a1da(0x3fa)]=function(){const _0x137ecc=_0x14a1da,_0x3beb13=VisuMZ[_0x137ecc(0x209)]['Settings']['New'][_0x137ecc(0x22e)];if(_0x3beb13<=0x0)return;const _0x5b4094=ImageManager[_0x137ecc(0x5bb)](_0x137ecc(0x59b)),_0x178fa1=ImageManager[_0x137ecc(0x302)],_0x47c7ee=ImageManager['iconHeight'],_0x57c045=_0x3beb13%0x10*_0x178fa1,_0x1eea9f=Math['floor'](_0x3beb13/0x10)*_0x47c7ee;this['bitmap'][_0x137ecc(0x5e8)](_0x5b4094,_0x57c045,_0x1eea9f,_0x178fa1,_0x47c7ee,0x0,0x0);},Sprite_NewLabel[_0x14a1da(0x1a8)][_0x14a1da(0x5b7)]=function(){const _0xb26d52=_0x14a1da,_0x572252=VisuMZ[_0xb26d52(0x209)][_0xb26d52(0x4ad)][_0xb26d52(0x2c5)],_0xd89b04=_0x572252[_0xb26d52(0x1f5)];if(_0xd89b04==='')return;const _0x4cae7d=ImageManager[_0xb26d52(0x302)],_0x2c527e=ImageManager[_0xb26d52(0x3bb)];this[_0xb26d52(0x463)][_0xb26d52(0x556)]=_0x572252[_0xb26d52(0x4da)]||$gameSystem[_0xb26d52(0x49f)](),this[_0xb26d52(0x463)]['textColor']=this[_0xb26d52(0x2c6)](),this[_0xb26d52(0x463)]['fontSize']=_0x572252[_0xb26d52(0x2bb)],this[_0xb26d52(0x463)][_0xb26d52(0x464)](_0xd89b04,0x0,_0x2c527e/0x2,_0x4cae7d,_0x2c527e/0x2,_0xb26d52(0x303));},Sprite_NewLabel[_0x14a1da(0x1a8)][_0x14a1da(0x2c6)]=function(){const _0xa1e8ec=_0x14a1da,_0x50ba3c=VisuMZ['ItemsEquipsCore'][_0xa1e8ec(0x4ad)][_0xa1e8ec(0x2c5)]['FontColor'];return _0x50ba3c[_0xa1e8ec(0x2fb)](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager[_0xa1e8ec(0x5d9)](_0x50ba3c);},Window_Base[_0x14a1da(0x1a8)][_0x14a1da(0x60a)]=function(_0x1bc631,_0x487d86,_0x1ebe76,_0x78ab4f){const _0x165d3a=_0x14a1da;if(_0x1bc631){if(_0x165d3a(0x20c)!=='ZFbcv'){function _0x3a454c(){const _0xb46522=_0x165d3a;_0x57d665=_0x1d4706[_0xb46522(0x4e7)](_0x20773e),_0x557fe6[_0xb46522(0x209)][_0xb46522(0x3e5)][_0xb46522(0x593)](this,_0x1af2da,_0x1f1942),this[_0xb46522(0x29a)]();}}else{const _0x1c0030=_0x1ebe76+(this[_0x165d3a(0x5df)]()-ImageManager[_0x165d3a(0x3bb)])/0x2,_0x5d0b16=ImageManager[_0x165d3a(0x302)]+0x4,_0x2f3e89=Math[_0x165d3a(0x489)](0x0,_0x78ab4f-_0x5d0b16);this[_0x165d3a(0x1ce)](ColorManager[_0x165d3a(0x376)](_0x1bc631)),this[_0x165d3a(0x203)](_0x1bc631[_0x165d3a(0x1ae)],_0x487d86,_0x1c0030),this[_0x165d3a(0x464)](_0x1bc631['name'],_0x487d86+_0x5d0b16,_0x1ebe76,_0x2f3e89),this[_0x165d3a(0x21d)]();}}},Window_Base[_0x14a1da(0x1a8)][_0x14a1da(0x555)]=function(_0x2cb639,_0x368c11,_0x240a1c,_0x300e8a){const _0x5b28f5=_0x14a1da;if(this['isDrawItemNumber'](_0x2cb639)){if(_0x5b28f5(0x1b9)!==_0x5b28f5(0x1b9)){function _0x5aa217(){const _0x278a52=_0x5b28f5;return this[_0x278a52(0x56c)]?this[_0x278a52(0x56c)][_0x278a52(0x2ab)]:0x3;}}else{this['resetFontSettings']();const _0x37a09c=VisuMZ[_0x5b28f5(0x209)][_0x5b28f5(0x4ad)][_0x5b28f5(0x5da)],_0x107e13=_0x37a09c[_0x5b28f5(0x536)],_0x2f2b48=_0x107e13[_0x5b28f5(0x27e)]($gameParty[_0x5b28f5(0x617)](_0x2cb639));this[_0x5b28f5(0x516)][_0x5b28f5(0x337)]=_0x37a09c[_0x5b28f5(0x4b7)],this['drawText'](_0x2f2b48,_0x368c11,_0x240a1c,_0x300e8a,_0x5b28f5(0x547)),this['resetFontSettings']();}}},Window_Base['prototype'][_0x14a1da(0x548)]=function(_0x311068){const _0x2173df=_0x14a1da;if(DataManager[_0x2173df(0x394)](_0x311068))return $dataSystem[_0x2173df(0x534)];return!![];},Window_Base[_0x14a1da(0x1a8)][_0x14a1da(0x5f2)]=function(_0x149486,_0x2b5ca3,_0x339dcc,_0x549bfd,_0x112b4b){const _0x399c60=_0x14a1da;_0x112b4b=Math['max'](_0x112b4b||0x1,0x1);while(_0x112b4b--){_0x549bfd=_0x549bfd||this[_0x399c60(0x5df)](),this[_0x399c60(0x539)][_0x399c60(0x1cb)]=0xa0;const _0x2cdd79=ColorManager[_0x399c60(0x611)]();this[_0x399c60(0x539)][_0x399c60(0x498)](_0x149486+0x1,_0x2b5ca3+0x1,_0x339dcc-0x2,_0x549bfd-0x2,_0x2cdd79),this[_0x399c60(0x539)]['paintOpacity']=0xff;}},VisuMZ[_0x14a1da(0x209)]['Window_Selectable_initialize']=Window_Selectable[_0x14a1da(0x1a8)]['initialize'],Window_Selectable[_0x14a1da(0x1a8)][_0x14a1da(0x355)]=function(_0x2d2918){const _0x2b917c=_0x14a1da;this[_0x2b917c(0x584)](),VisuMZ[_0x2b917c(0x209)]['Window_Selectable_initialize']['call'](this,_0x2d2918);},Window_Selectable[_0x14a1da(0x1a8)][_0x14a1da(0x584)]=function(){const _0x390c30=_0x14a1da;this[_0x390c30(0x5b9)]={},this[_0x390c30(0x336)]=0xff,this[_0x390c30(0x353)]=VisuMZ['ItemsEquipsCore']['Settings'][_0x390c30(0x2c5)][_0x390c30(0x515)],this[_0x390c30(0x3f0)]=VisuMZ['ItemsEquipsCore'][_0x390c30(0x4ad)][_0x390c30(0x2c5)][_0x390c30(0x431)];},Window_Selectable['prototype'][_0x14a1da(0x390)]=function(){return![];},VisuMZ[_0x14a1da(0x209)]['Window_Selectable_setHelpWindowItem']=Window_Selectable[_0x14a1da(0x1a8)][_0x14a1da(0x42f)],Window_Selectable[_0x14a1da(0x1a8)][_0x14a1da(0x42f)]=function(_0x2a644d){const _0x5aafab=_0x14a1da;VisuMZ[_0x5aafab(0x209)][_0x5aafab(0x52c)]['call'](this,_0x2a644d);if(this[_0x5aafab(0x390)]())this['clearNewLabelFromItem'](_0x2a644d);},Window_Selectable[_0x14a1da(0x1a8)][_0x14a1da(0x4dd)]=function(_0x366d0e){const _0x2e3374=_0x14a1da;if(!_0x366d0e)return;$gameParty[_0x2e3374(0x4e9)](_0x366d0e);let _0x36f051='';if(DataManager[_0x2e3374(0x4ac)](_0x366d0e))_0x36f051=_0x2e3374(0x51a)[_0x2e3374(0x27e)](_0x366d0e['id']);else{if(DataManager['isWeapon'](_0x366d0e))_0x36f051=_0x2e3374(0x42e)[_0x2e3374(0x27e)](_0x366d0e['id']);else{if(DataManager[_0x2e3374(0x242)](_0x366d0e)){if(_0x2e3374(0x395)===_0x2e3374(0x518)){function _0x2b0eac(){const _0xd38853=_0x2e3374;return _0x334659[_0xd38853(0x258)](_0x32fdcc['indexOf'](_0x16075c),0x1),_0x1d3998;}}else _0x36f051=_0x2e3374(0x3a3)[_0x2e3374(0x27e)](_0x366d0e['id']);}else return;}}const _0xdd3f85=this['_newLabelSprites'][_0x36f051];if(_0xdd3f85)_0xdd3f85[_0x2e3374(0x56e)]();},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x5a1)]=Window_Selectable[_0x14a1da(0x1a8)][_0x14a1da(0x21e)],Window_Selectable[_0x14a1da(0x1a8)][_0x14a1da(0x21e)]=function(){const _0x3bde82=_0x14a1da;this[_0x3bde82(0x34d)](),VisuMZ[_0x3bde82(0x209)][_0x3bde82(0x5a1)]['call'](this);},Window_Selectable[_0x14a1da(0x1a8)][_0x14a1da(0x34d)]=function(){const _0x481636=_0x14a1da;for(const _0x59da31 of Object[_0x481636(0x374)](this[_0x481636(0x5b9)])){_0x59da31[_0x481636(0x56e)]();}},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x240)]=Window_Selectable[_0x14a1da(0x1a8)][_0x14a1da(0x389)],Window_Selectable[_0x14a1da(0x1a8)]['update']=function(){const _0xb40046=_0x14a1da;this[_0xb40046(0x446)](),VisuMZ[_0xb40046(0x209)][_0xb40046(0x240)][_0xb40046(0x593)](this);},Window_Selectable['prototype'][_0x14a1da(0x446)]=function(){const _0x56b07c=_0x14a1da;if(!this['isShowNew']())return;const _0x157e0d=this[_0x56b07c(0x3f0)];this[_0x56b07c(0x336)]+=this['_newLabelOpacityChange'];if(this[_0x56b07c(0x336)]>=_0x157e0d||this['_newLabelOpacity']<=0x0){if(_0x56b07c(0x456)!==_0x56b07c(0x456)){function _0x59c25c(){const _0x5b0096=_0x56b07c;return this[_0x5b0096(0x526)]()?!![]:_0xfb8d7e[_0x5b0096(0x209)][_0x5b0096(0x4ad)][_0x5b0096(0x5da)][_0x5b0096(0x4ed)];}}else this['_newLabelOpacityChange']*=-0x1;}this[_0x56b07c(0x336)]=this[_0x56b07c(0x336)][_0x56b07c(0x4fb)](0x0,_0x157e0d);for(const _0x1e5ec9 of Object['values'](this[_0x56b07c(0x5b9)])){_0x1e5ec9[_0x56b07c(0x60b)]=this[_0x56b07c(0x336)];}},Window_Selectable[_0x14a1da(0x1a8)][_0x14a1da(0x54b)]=function(_0xa21390){const _0x283146=_0x14a1da,_0x4b5823=this[_0x283146(0x5b9)];if(_0x4b5823[_0xa21390]){if('whcTu'!=='whcTu'){function _0x9f8bdb(){const _0x1c14e0=_0x283146;return _0x1c14e0(0x231);}}else return _0x4b5823[_0xa21390];}else{if('EOdXe'===_0x283146(0x458)){const _0x3b0e78=new Sprite_NewLabel();return _0x4b5823[_0xa21390]=_0x3b0e78,this['addInnerChild'](_0x3b0e78),_0x3b0e78;}else{function _0x4c9e86(){const _0x233243=_0x283146,_0x525752=_0x1769e6['ItemsEquipsCore'][_0x233243(0x3c1)][_0x233243(0x593)](this);return this[_0x233243(0x27f)]()&&this[_0x233243(0x3df)]()&&(_0x525752['width']-=this[_0x233243(0x21f)]()),_0x525752;}}}},Window_Selectable[_0x14a1da(0x1a8)][_0x14a1da(0x506)]=function(_0x28fc35,_0x842bc2,_0x412213){const _0x1d2495=_0x14a1da;let _0x3f4d97='';if(DataManager[_0x1d2495(0x4ac)](_0x28fc35)){if(_0x1d2495(0x29c)!==_0x1d2495(0x29c)){function _0xba2b62(){return _0x32e84d['ItemsEquipsCore']['Window_ItemList_maxCols']['call'](this);}}else _0x3f4d97=_0x1d2495(0x51a)['format'](_0x28fc35['id']);}else{if(DataManager[_0x1d2495(0x3ed)](_0x28fc35))_0x3f4d97=_0x1d2495(0x42e)[_0x1d2495(0x27e)](_0x28fc35['id']);else{if(DataManager[_0x1d2495(0x242)](_0x28fc35))_0x3f4d97='armor-%1'['format'](_0x28fc35['id']);else{if(_0x1d2495(0x581)===_0x1d2495(0x581))return;else{function _0x19d4e3(){const _0x327ddc=_0x1d2495;return _0x290442[_0x327ddc(0x209)]['Game_BattlerBase_param'][_0x327ddc(0x593)](this,_0x1ce841);}}}}}const _0x18415f=this[_0x1d2495(0x54b)](_0x3f4d97);_0x18415f['move'](_0x842bc2,_0x412213),_0x18415f[_0x1d2495(0x26f)](),_0x18415f[_0x1d2495(0x60b)]=this['_newLabelOpacity'];},Window_ItemCategory['categoryList']=VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x4ad)][_0x14a1da(0x414)][_0x14a1da(0x3db)],Window_ItemCategory['categoryItemTypes']=['HiddenItemA',_0x14a1da(0x484),_0x14a1da(0x42c),'Consumable',_0x14a1da(0x31f),_0x14a1da(0x591),_0x14a1da(0x4a1),'NeverUsable'],VisuMZ[_0x14a1da(0x209)]['Window_ItemCategory_initialize']=Window_ItemCategory['prototype']['initialize'],Window_ItemCategory[_0x14a1da(0x1a8)][_0x14a1da(0x355)]=function(_0x1afd85){const _0x575ee0=_0x14a1da;VisuMZ[_0x575ee0(0x209)][_0x575ee0(0x52e)][_0x575ee0(0x593)](this,_0x1afd85),this['createCategoryNameWindow'](_0x1afd85);},Window_ItemCategory[_0x14a1da(0x1a8)][_0x14a1da(0x4ba)]=function(_0x20f289){const _0x44b017=_0x14a1da,_0x52f545=new Rectangle(0x0,0x0,_0x20f289['width'],_0x20f289[_0x44b017(0x4e3)]);this['_categoryNameWindow']=new Window_Base(_0x52f545),this[_0x44b017(0x3be)][_0x44b017(0x60b)]=0x0,this[_0x44b017(0x244)](this[_0x44b017(0x3be)]),this['updateCategoryNameWindow']();},Window_ItemCategory[_0x14a1da(0x1a8)][_0x14a1da(0x50c)]=function(){const _0x137e59=_0x14a1da;return Imported['VisuMZ_0_CoreEngine']&&Window_HorzCommand['prototype'][_0x137e59(0x50c)][_0x137e59(0x593)](this);},Window_ItemCategory[_0x14a1da(0x1a8)][_0x14a1da(0x1b4)]=function(){},Window_ItemCategory['prototype'][_0x14a1da(0x468)]=function(){const _0x21331b=_0x14a1da;if(!this[_0x21331b(0x50c)]())Window_HorzCommand[_0x21331b(0x1a8)][_0x21331b(0x468)]['call'](this);},Window_ItemCategory[_0x14a1da(0x1a8)][_0x14a1da(0x470)]=function(){return this['_list']?this['maxItems']():0x4;},Window_ItemCategory[_0x14a1da(0x1a8)][_0x14a1da(0x389)]=function(){const _0x4260ad=_0x14a1da;Window_HorzCommand[_0x4260ad(0x1a8)]['update'][_0x4260ad(0x593)](this),this[_0x4260ad(0x432)]&&this[_0x4260ad(0x432)]['setCategory'](this[_0x4260ad(0x5fc)]());},Window_ItemCategory[_0x14a1da(0x1a8)][_0x14a1da(0x387)]=function(){const _0x2322d7=_0x14a1da;if(this[_0x2322d7(0x2bf)]()){const _0x293948=this['index']();if(this['_itemWindow']&&this[_0x2322d7(0x432)][_0x2322d7(0x470)]()<=0x1){Input[_0x2322d7(0x2b7)](_0x2322d7(0x547))&&this[_0x2322d7(0x338)](Input[_0x2322d7(0x4a8)](_0x2322d7(0x547)));if(Input['isRepeated'](_0x2322d7(0x473))){if('CGkRK'!==_0x2322d7(0x430)){function _0xdd9204(){const _0x5c4164=_0x2322d7;_0x1f828e[_0x5c4164(0x209)]['Scene_Load_reloadMapIfUpdated']['call'](this),this[_0x5c4164(0x388)]();}}else this[_0x2322d7(0x4cb)](Input[_0x2322d7(0x4a8)](_0x2322d7(0x473)));}}else{if(this['_itemWindow']&&this[_0x2322d7(0x432)][_0x2322d7(0x470)]()>0x1){if(_0x2322d7(0x3d9)===_0x2322d7(0x32f)){function _0x8df20(){const _0x27915e=_0x2322d7;return this[_0x27915e(0x3e4)]();}}else{if(Input[_0x2322d7(0x2b7)](_0x2322d7(0x237))&&!Input['isPressed']('shift')){if('ZHUtT'===_0x2322d7(0x532)){function _0x3a97c4(){const _0x2d2185=_0x2322d7;return _0x59a962[_0x2d2185(0x209)][_0x2d2185(0x4ad)][_0x2d2185(0x1ad)][_0x2d2185(0x292)];}}else this[_0x2322d7(0x338)](Input['isTriggered']('pagedown'));}if(Input['isRepeated'](_0x2322d7(0x2a4))&&!Input[_0x2322d7(0x222)](_0x2322d7(0x55e))){if(_0x2322d7(0x59d)!=='IQmOd')this[_0x2322d7(0x4cb)](Input[_0x2322d7(0x4a8)](_0x2322d7(0x2a4)));else{function _0x4c6008(){const _0x35bd74=_0x2322d7,_0x49dcf3=_0x530c63[_0x35bd74(0x423)]()[_0x35bd74(0x36d)](_0x37dc6d),_0x1375fe=_0x2003f1+_0x684645+_0x49dcf3*_0x568899;this[_0x35bd74(0x1f3)](_0x3f311c['canEquip'](this['_item'])),this['drawActorCharacter'](_0x309b4f,_0x1375fe+_0x57faa0/0x2,_0x15e093);let _0x34a111=_0x4c5894;for(const _0x474bc9 of _0x4813b4){const _0x59de4c=_0x34a111-(_0x1f43c3-_0x5e1fbb)/0x2;this['drawActorParamDifference'](_0x47afc6,_0x474bc9,_0x1375fe,_0x59de4c,_0x9d463),_0x34a111+=_0x1300e3;}}}}}}}if(this[_0x2322d7(0x4ff)]()!==_0x293948){if(_0x2322d7(0x2ec)==='mQGCC')this[_0x2322d7(0x606)]();else{function _0x41443c(){const _0x46accf=_0x2322d7,_0x446eae=_0xf2e6af[_0x46accf(0x5bb)]('IconSet'),_0x47f280=_0x1298ee[_0x46accf(0x302)],_0x32b70b=_0x3aeac8[_0x46accf(0x3bb)],_0x328e79=_0x51cbbe%0x10*_0x47f280,_0x27529c=_0x344aae[_0x46accf(0x4d0)](_0x287421/0x10)*_0x32b70b,_0x24fc4a=_0x258389['ceil'](_0x47f280*this[_0x46accf(0x4a5)]()),_0xea23ab=_0xf180c7[_0x46accf(0x257)](_0x32b70b*this[_0x46accf(0x4a5)]());this[_0x46accf(0x516)][_0x46accf(0x5e8)](_0x446eae,_0x328e79,_0x27529c,_0x47f280,_0x32b70b,_0x26066c,_0x3a0859,_0x24fc4a,_0xea23ab);}}}}},Window_ItemCategory['prototype'][_0x14a1da(0x5c5)]=function(){const _0xf0c6fe=_0x14a1da;if(this[_0xf0c6fe(0x50c)]())return;Window_HorzCommand[_0xf0c6fe(0x1a8)][_0xf0c6fe(0x5c5)]['call'](this);},Window_ItemCategory[_0x14a1da(0x1a8)][_0x14a1da(0x3d6)]=function(){const _0x3ca1e1=_0x14a1da;if(this[_0x3ca1e1(0x50c)]())return![];else{if('bhmVA'!==_0x3ca1e1(0x596)){function _0xaaf8e0(){const _0x89b464=_0x3ca1e1;return _0x110314[_0x89b464(0x58a)]&&_0xfbb6ee[_0x89b464(0x1b7)]['includes']('['+_0x58e581+']');}}else return Window_HorzCommand[_0x3ca1e1(0x1a8)][_0x3ca1e1(0x3d6)][_0x3ca1e1(0x593)](this);}},Window_ItemCategory[_0x14a1da(0x1a8)][_0x14a1da(0x43f)]=function(){const _0xf219be=_0x14a1da;if(this[_0xf219be(0x2e7)]()){if(TouchInput[_0xf219be(0x4a8)]()){if(_0xf219be(0x22f)===_0xf219be(0x41c)){function _0x3fb4fc(){if(!_0x54f497['value'](_0x8259e9))return!![];}}else this[_0xf219be(0x363)](!![]);}if(TouchInput[_0xf219be(0x2b2)]()){if(_0xf219be(0x213)===_0xf219be(0x213))this[_0xf219be(0x39e)]();else{function _0x9c9810(){_0x1755ab['a']=_0x43e3c5,_0x113ab0['b']=_0x1f9e89;}}}else TouchInput[_0xf219be(0x24f)]()&&this[_0xf219be(0x28e)]();}},Window_ItemCategory[_0x14a1da(0x1a8)][_0x14a1da(0x363)]=function(_0x1f1a5f){const _0x479d62=_0x14a1da;if(this['isUseModernControls']())this[_0x479d62(0x531)](!![]);else{if('VUzkj'==='KMcQQ'){function _0x5d5073(){const _0x35d3d5=_0x479d62,_0x235f4c=this[_0x35d3d5(0x201)](_0x55257c),_0x3595ee=this['textSizeEx'](_0xe8c8ec)['width'];return _0x3595ee<=_0x235f4c['width']?_0x35d3d5(0x231):_0x35d3d5(0x317);}}else Window_HorzCommand[_0x479d62(0x1a8)][_0x479d62(0x363)][_0x479d62(0x593)](this,_0x1f1a5f);}},Window_ItemCategory[_0x14a1da(0x1a8)][_0x14a1da(0x531)]=function(_0x2fdb0f){const _0x2988af=_0x14a1da;this['_doubleTouch']=![];if(this[_0x2988af(0x2bf)]()){if(_0x2988af(0x1f0)!==_0x2988af(0x273)){const _0x45b4fc=this[_0x2988af(0x4ff)](),_0x5023cd=this['hitIndex']();_0x5023cd>=0x0&&_0x5023cd!==this[_0x2988af(0x4ff)]()&&this['select'](_0x5023cd),_0x2fdb0f&&this[_0x2988af(0x4ff)]()!==_0x45b4fc&&this['playCursorSound']();}else{function _0x354212(){const _0x2c6afb=_0x2988af;if(_0x239f67[_0x2c6afb(0x5f5)]())_0x1e3ec5[_0x2c6afb(0x20e)](_0x56b0a4);}}}},Window_ItemCategory['prototype'][_0x14a1da(0x561)]=function(){const _0x229d13=_0x14a1da;for(const _0x3dfca0 of Window_ItemCategory[_0x229d13(0x420)]){if(_0x229d13(0x1c0)!==_0x229d13(0x533))this['addItemCategory'](_0x3dfca0);else{function _0x2d472e(){const _0x2aec7d=_0x229d13;return this[_0x2aec7d(0x373)]()['match'](/RIGHT/i);}}}this[_0x229d13(0x2e0)](this[_0x229d13(0x4ff)]());},Window_ItemCategory[_0x14a1da(0x1a8)][_0x14a1da(0x280)]=function(_0x4ac264){const _0x5c480c=_0x14a1da,_0x146d70=_0x4ac264['Type'],_0x26a477=_0x4ac264['Icon'],_0x51524a=_0x4ac264[_0x5c480c(0x559)]||0x0;if(_0x51524a>0x0&&!$gameSwitches[_0x5c480c(0x37c)](_0x51524a))return;let _0x5c61a4='',_0x4a7270='category',_0x148198=_0x146d70;if(_0x146d70['match'](/Category:(.*)/i))_0x5c61a4=String(RegExp['$1'])[_0x5c480c(0x597)]();else{if(Window_ItemCategory[_0x5c480c(0x35c)][_0x5c480c(0x243)](_0x146d70)){if(_0x5c480c(0x314)===_0x5c480c(0x42a)){function _0x5648bd(){const _0x152ce0=_0x5c480c;this[_0x152ce0(0x2ad)](),this['contents'][_0x152ce0(0x337)]=this[_0x152ce0(0x321)]();let _0x5aa88a=this[_0x152ce0(0x200)](_0x37af2c[_0x152ce0(0x609)](_0x57509a))+0x4+_0x35e6a5;return _0x1c4b97[_0x152ce0(0x42d)]?(this[_0x152ce0(0x573)](_0x3e626f,_0x27495a,_0x1b6891,_0x5441f9,!![]),_0xdcf783[_0x152ce0(0x53d)][_0x152ce0(0x4ad)][_0x152ce0(0x44a)]['DrawIcons']&&(_0x5aa88a+=_0x411c48[_0x152ce0(0x302)]+0x4)):(this['changeTextColor'](_0x189290[_0x152ce0(0x1cc)]()),this['drawText'](_0x44c65f[_0x152ce0(0x609)](_0x51515f),_0x1d79ab,_0x1f18c6,_0x14456f)),this[_0x152ce0(0x2ad)](),_0x5aa88a;}}else _0x5c61a4=VisuMZ[_0x5c480c(0x209)][_0x5c480c(0x4ad)]['Categories'][_0x146d70];}else{if([_0x5c480c(0x58d),'RegularItems'][_0x5c480c(0x243)](_0x146d70))_0x5c61a4=TextManager['item'];else{if(_0x146d70===_0x5c480c(0x36b))_0x5c61a4=TextManager[_0x5c480c(0x1d5)];else{if(_0x146d70===_0x5c480c(0x3e7))_0x5c61a4=TextManager[_0x5c480c(0x232)];else{if(_0x146d70==='AllArmors'){if(_0x5c480c(0x3ee)!==_0x5c480c(0x3ee)){function _0x303816(){const _0x28359d=_0x5c480c;return _0x28359d(0x3e9);}}else _0x5c61a4=TextManager[_0x5c480c(0x2e3)];}else{if(_0x146d70[_0x5c480c(0x2fb)](/WTYPE:(\d+)/i))_0x5c61a4=$dataSystem[_0x5c480c(0x29e)][Number(RegExp['$1'])]||'';else{if(_0x146d70[_0x5c480c(0x2fb)](/ATYPE:(\d+)/i)){if('ASaeN'!==_0x5c480c(0x23a)){function _0x298b2f(){const _0x2d0f77=_0x5c480c;if(_0x563b6b['ItemsEquipsCore'][_0x2d0f77(0x4ad)][_0x2d0f77(0x1ad)][_0x2d0f77(0x5f3)]===![])return;_0x3735a0=_0x598817['max'](_0x1c2c13||0x1,0x1);while(_0x4d0bbd--){_0x118648=_0x42e889||this[_0x2d0f77(0x5df)](),this[_0x2d0f77(0x516)][_0x2d0f77(0x1cb)]=0xa0;const _0x3422d2=_0x2a3a72['getItemsEquipsCoreBackColor2']();this[_0x2d0f77(0x516)][_0x2d0f77(0x498)](_0x3489ae+0x1,_0x3a8aed+0x1,_0x4d600a-0x2,_0x263c44-0x2,_0x3422d2),this[_0x2d0f77(0x516)][_0x2d0f77(0x1cb)]=0xff;}}}else _0x5c61a4=$dataSystem[_0x5c480c(0x2e4)][Number(RegExp['$1'])]||'';}else _0x146d70[_0x5c480c(0x2fb)](/ETYPE:(\d+)/i)&&(_0x5c61a4=$dataSystem['equipTypes'][Number(RegExp['$1'])]||'');}}}}}}}_0x26a477>0x0&&this['categoryStyle']()!==_0x5c480c(0x4b5)&&(_0x5c61a4='\x5cI[%1]%2'[_0x5c480c(0x27e)](_0x26a477,_0x5c61a4)),this['addCommand'](_0x5c61a4,_0x4a7270,!![],_0x148198);},Window_ItemCategory['prototype'][_0x14a1da(0x3a7)]=function(){const _0x772bf6=_0x14a1da;return VisuMZ[_0x772bf6(0x209)][_0x772bf6(0x4ad)][_0x772bf6(0x414)]['TextAlign'];},Window_ItemCategory[_0x14a1da(0x1a8)][_0x14a1da(0x1d3)]=function(_0x5f02ac){const _0x6dfbe7=_0x14a1da,_0xde4c7f=this[_0x6dfbe7(0x412)](_0x5f02ac);if(_0xde4c7f==='iconText')this[_0x6dfbe7(0x589)](_0x5f02ac);else _0xde4c7f===_0x6dfbe7(0x317)?this[_0x6dfbe7(0x577)](_0x5f02ac):Window_HorzCommand['prototype'][_0x6dfbe7(0x1d3)][_0x6dfbe7(0x593)](this,_0x5f02ac);},Window_ItemCategory['prototype'][_0x14a1da(0x266)]=function(){const _0x4fb129=_0x14a1da;return VisuMZ[_0x4fb129(0x209)][_0x4fb129(0x4ad)][_0x4fb129(0x414)][_0x4fb129(0x23c)];},Window_ItemCategory[_0x14a1da(0x1a8)][_0x14a1da(0x412)]=function(_0x3d9943){const _0x2e0a8f=_0x14a1da;if(_0x3d9943<0x0)return _0x2e0a8f(0x4b5);const _0x1c7f69=this[_0x2e0a8f(0x266)]();if(_0x1c7f69!==_0x2e0a8f(0x2ed)){if(_0x2e0a8f(0x486)!=='GYlgs')return _0x1c7f69;else{function _0x52fcbc(){const _0x336c86=_0x2e0a8f;_0x2b1088=_0x336c86(0x3a3)[_0x336c86(0x27e)](_0x3ada59['id']);}}}else{if('xhEOB'!==_0x2e0a8f(0x2f9)){function _0xe57db6(){const _0x4e251d=_0x2e0a8f;_0x489fe7['ItemsEquipsCore'][_0x4e251d(0x510)][_0x4e251d(0x593)](this),this[_0x4e251d(0x50c)]()&&this['onCategoryCancel'](),this['isUseItemsEquipsCoreUpdatedLayout']()&&this['_dummyWindow'][_0x4e251d(0x56e)]();}}else{const _0x11e0c9=this[_0x2e0a8f(0x275)](_0x3d9943);if(_0x11e0c9[_0x2e0a8f(0x2fb)](/\\I\[(\d+)\]/i)){if(_0x2e0a8f(0x40a)!==_0x2e0a8f(0x40a)){function _0x2a581a(){const _0x59d908=_0x2e0a8f;this['cursorDown'](_0x52fefe[_0x59d908(0x4a8)](_0x59d908(0x5c4)));}}else{const _0xf9fbab=this['itemLineRect'](_0x3d9943),_0x2c4b0c=this['textSizeEx'](_0x11e0c9)[_0x2e0a8f(0x379)];if(_0x2c4b0c<=_0xf9fbab[_0x2e0a8f(0x379)]){if(_0x2e0a8f(0x1e0)==='rumfh')return _0x2e0a8f(0x231);else{function _0x5322ff(){const _0x339f22=_0x2e0a8f;_0x28c7cb[_0x339f22(0x1a8)][_0x339f22(0x355)]['call'](this),this[_0x339f22(0x342)]();}}}else return'icon';}}else return _0x2e0a8f(0x4b5);}}},Window_ItemCategory[_0x14a1da(0x1a8)]['drawItemStyleIconText']=function(_0xb68b7b){const _0x5986fa=_0x14a1da,_0x5791a5=this[_0x5986fa(0x201)](_0xb68b7b),_0x547094=this[_0x5986fa(0x275)](_0xb68b7b),_0x1f79b6=this[_0x5986fa(0x2c8)](_0x547094)[_0x5986fa(0x379)];this[_0x5986fa(0x1f3)](this[_0x5986fa(0x4be)](_0xb68b7b));const _0x532092=this[_0x5986fa(0x3a7)]();if(_0x532092===_0x5986fa(0x547)){if(_0x5986fa(0x5ed)!==_0x5986fa(0x5ed)){function _0x20b67e(){const _0x5ee287=_0x5986fa;if(this['isItem'](_0x4f267d))return _0x2b544f[_0x5ee287(0x209)][_0x5ee287(0x4ad)][_0x5ee287(0x5da)]['MaxItems'];else{if(this[_0x5ee287(0x3ed)](_0x5f26b9))return _0x14c966['ItemsEquipsCore'][_0x5ee287(0x4ad)][_0x5ee287(0x5da)]['MaxWeapons'];else{if(this['isArmor'](_0x5dce1c))return _0x3efc7f['ItemsEquipsCore'][_0x5ee287(0x4ad)][_0x5ee287(0x5da)][_0x5ee287(0x4a9)];}}}}else this[_0x5986fa(0x3bf)](_0x547094,_0x5791a5['x']+_0x5791a5[_0x5986fa(0x379)]-_0x1f79b6,_0x5791a5['y'],_0x1f79b6);}else{if(_0x532092===_0x5986fa(0x303)){const _0x5abb12=_0x5791a5['x']+Math[_0x5986fa(0x4d0)]((_0x5791a5[_0x5986fa(0x379)]-_0x1f79b6)/0x2);this['drawTextEx'](_0x547094,_0x5abb12,_0x5791a5['y'],_0x1f79b6);}else{if(_0x5986fa(0x297)===_0x5986fa(0x451)){function _0x317a72(){const _0x36e61b=_0x5986fa;_0x32b20f[_0x36e61b(0x5a4)](_0x171272[_0x36e61b(0x3d0)],![]);}}else this['drawTextEx'](_0x547094,_0x5791a5['x'],_0x5791a5['y'],_0x1f79b6);}}},Window_ItemCategory['prototype'][_0x14a1da(0x577)]=function(_0x4f31a7){const _0x166463=_0x14a1da,_0x240fac=this['commandName'](_0x4f31a7);if(_0x240fac['match'](/\\I\[(\d+)\]/i)){if('FHDnk'!==_0x166463(0x39b)){function _0x4c88e0(){const _0x484bc6=_0x166463,_0x428299=_0x1952f5['actor'](0x1);this[_0x484bc6(0x5d6)]=_0x5ddb09[_0x484bc6(0x4e7)](_0x428299),this[_0x484bc6(0x1df)]=_0x13d4b4['makeDeepCopy'](_0x428299);}}else{const _0x1871de=Number(RegExp['$1'])||0x0,_0x36dfb3=this[_0x166463(0x201)](_0x4f31a7),_0x203850=_0x36dfb3['x']+Math['floor']((_0x36dfb3[_0x166463(0x379)]-ImageManager[_0x166463(0x302)])/0x2),_0x48a4ec=_0x36dfb3['y']+(_0x36dfb3[_0x166463(0x4e3)]-ImageManager[_0x166463(0x3bb)])/0x2;this[_0x166463(0x203)](_0x1871de,_0x203850,_0x48a4ec);}}},VisuMZ['ItemsEquipsCore']['Window_ItemCategory_setItemWindow']=Window_ItemCategory['prototype'][_0x14a1da(0x3f8)],Window_ItemCategory[_0x14a1da(0x1a8)][_0x14a1da(0x3f8)]=function(_0x5ae972){const _0x2d9a26=_0x14a1da;VisuMZ[_0x2d9a26(0x209)][_0x2d9a26(0x3c9)][_0x2d9a26(0x593)](this,_0x5ae972),_0x5ae972[_0x2d9a26(0x1bd)]=this;},Window_ItemCategory[_0x14a1da(0x1a8)][_0x14a1da(0x357)]=function(){const _0x286f23=_0x14a1da;Window_HorzCommand['prototype'][_0x286f23(0x357)][_0x286f23(0x593)](this);if(this[_0x286f23(0x3be)])this['updateCategoryNameWindow']();},Window_ItemCategory['prototype'][_0x14a1da(0x288)]=function(){const _0x4bb8a7=_0x14a1da,_0x165eca=this[_0x4bb8a7(0x3be)];_0x165eca[_0x4bb8a7(0x516)][_0x4bb8a7(0x254)]();const _0x431ef1=this['categoryStyleCheck'](this[_0x4bb8a7(0x4ff)]());if(_0x431ef1==='icon'){if(_0x4bb8a7(0x54e)===_0x4bb8a7(0x45e)){function _0x550c12(){return![];}}else{const _0x503a30=this[_0x4bb8a7(0x201)](this['index']());let _0x19b98b=this[_0x4bb8a7(0x275)](this['index']());_0x19b98b=_0x19b98b['replace'](/\\I\[(\d+)\]/gi,''),_0x165eca[_0x4bb8a7(0x2ad)](),this['categoryNameWindowDrawBackground'](_0x19b98b,_0x503a30),this[_0x4bb8a7(0x215)](_0x19b98b,_0x503a30),this[_0x4bb8a7(0x495)](_0x19b98b,_0x503a30);}}},Window_ItemCategory[_0x14a1da(0x1a8)][_0x14a1da(0x43b)]=function(_0x246e34,_0x57bc3d){},Window_ItemCategory[_0x14a1da(0x1a8)][_0x14a1da(0x215)]=function(_0x185593,_0x1706f9){const _0x551bd2=_0x14a1da,_0xb6a097=this[_0x551bd2(0x3be)];_0xb6a097[_0x551bd2(0x464)](_0x185593,0x0,_0x1706f9['y'],_0xb6a097[_0x551bd2(0x2f4)],_0x551bd2(0x303));},Window_ItemCategory[_0x14a1da(0x1a8)][_0x14a1da(0x495)]=function(_0x3029b9,_0x1a0a51){const _0x3ceb96=_0x14a1da,_0x5874ac=this[_0x3ceb96(0x3be)],_0x4b4412=$gameSystem[_0x3ceb96(0x524)](),_0x4360a7=_0x1a0a51['x']+Math[_0x3ceb96(0x4d0)](_0x1a0a51[_0x3ceb96(0x379)]/0x2)+_0x4b4412;_0x5874ac['x']=_0x5874ac['width']/-0x2+_0x4360a7,_0x5874ac['y']=Math['floor'](_0x1a0a51['height']/0x2);},Window_ItemList[_0x14a1da(0x1a8)][_0x14a1da(0x387)]=function(){const _0x3a443e=_0x14a1da;if(this[_0x3a443e(0x2bf)]()){if('aqugw'!==_0x3a443e(0x1c9)){function _0xf016d3(){const _0x5b6244=_0x3a443e;this[_0x5b6244(0x41f)](_0x3be942[_0x5b6244(0x4a8)]('up'));}}else{const _0x5e6d16=this[_0x3a443e(0x4ff)]();if(this[_0x3a443e(0x470)]()<=0x1){if(!this['isHandled']('pagedown')&&Input[_0x3a443e(0x4a8)](_0x3a443e(0x237))){if('PMUDP'===_0x3a443e(0x2cc))this[_0x3a443e(0x24d)]();else{function _0x57b02b(){const _0xeaef57=_0x3a443e,_0xf1de8d=this[_0xeaef57(0x275)](_0x554af1);if(_0xf1de8d[_0xeaef57(0x2fb)](/\\I\[(\d+)\]/i)){const _0x319d13=this[_0xeaef57(0x201)](_0x45af6b),_0x5870c8=this[_0xeaef57(0x2c8)](_0xf1de8d)[_0xeaef57(0x379)];return _0x5870c8<=_0x319d13[_0xeaef57(0x379)]?_0xeaef57(0x231):'icon';}}}}if(!this['isHandled']('pageup')&&Input['isTriggered'](_0x3a443e(0x2a4))){if('VOZfj'===_0x3a443e(0x492)){function _0x4b20b2(){const _0x7497e9=_0x3a443e;this[_0x7497e9(0x24d)]();}}else this[_0x3a443e(0x1c2)]();}}else{if(this[_0x3a443e(0x470)]()>0x1){if('qaBpm'!==_0x3a443e(0x58e)){if(Input['isRepeated'](_0x3a443e(0x547))){if('asuYB'!==_0x3a443e(0x4f7)){function _0x2ea243(){const _0x5915fc=_0x3a443e,_0x57c55c=this[_0x5915fc(0x2df)]['y']+this[_0x5915fc(0x2df)][_0x5915fc(0x4e3)],_0x3de44a=_0xdb882e[_0x5915fc(0x565)]-this[_0x5915fc(0x21f)](),_0x3c6a52=this[_0x5915fc(0x1c1)]()?_0x29aa3b[_0x5915fc(0x565)]-_0x3de44a:0x0,_0x79167d=this[_0x5915fc(0x36f)]()-this['_commandWindow'][_0x5915fc(0x4e3)];return new _0xfa2965(_0x3c6a52,_0x57c55c,_0x3de44a,_0x79167d);}}else this['cursorRight'](Input[_0x3a443e(0x4a8)]('right'));}Input[_0x3a443e(0x2b7)]('left')&&this[_0x3a443e(0x4cb)](Input[_0x3a443e(0x4a8)](_0x3a443e(0x473)));if(this[_0x3a443e(0x4ae)]()){if(_0x3a443e(0x27c)===_0x3a443e(0x27c))Input['isTriggered']('pagedown')&&Input[_0x3a443e(0x222)](_0x3a443e(0x55e))&&this[_0x3a443e(0x24d)](),Input[_0x3a443e(0x4a8)](_0x3a443e(0x2a4))&&Input[_0x3a443e(0x222)]('shift')&&this[_0x3a443e(0x1c2)]();else{function _0x4d08c9(){this['playBuzzerSound']();}}}else{if('yeOFc'===_0x3a443e(0x3ce)){Input['isTriggered']('pagedown')&&this[_0x3a443e(0x24d)]();if(Input[_0x3a443e(0x4a8)]('pageup')){if(_0x3a443e(0x2b5)!==_0x3a443e(0x2c2))this[_0x3a443e(0x1c2)]();else{function _0x1e2c58(){const _0x57619a=_0x3a443e;_0x5b84fc[_0x57619a(0x42d)]?(_0x296b5a=this[_0x57619a(0x20d)][_0x57619a(0x35f)](_0x3c9af8,![]),_0xd44263=this[_0x57619a(0x1d7)][_0x57619a(0x35f)](_0x4db711,![]),_0x5b1879=_0x3df17c(this[_0x57619a(0x20d)][_0x57619a(0x35f)](_0x1fc793,!![]))['match'](/([%％])/i)):(_0x357c7c=this[_0x57619a(0x20d)][_0x57619a(0x609)](_0x30908e),_0x5066df=this[_0x57619a(0x1d7)][_0x57619a(0x609)](_0x54c42c),_0x402e9f=_0x93dc9d%0x1!==0x0||_0x35fe94%0x1!==0x0);const _0x56eca6=_0x52adab,_0xcbf79a=_0x155146,_0x2dd816=_0xcbf79a-_0x56eca6;let _0x5786c7=_0x2dd816;if(_0xfde24f)_0x5786c7=_0x250c5d['round'](_0x2dd816*0x64)+'%';_0x2dd816!==0x0&&(this[_0x57619a(0x1ce)](_0x3129cb[_0x57619a(0x284)](_0x2dd816)),_0x5786c7=(_0x2dd816>0x0?_0x57619a(0x513):_0x57619a(0x55f))[_0x57619a(0x27e)](_0x5786c7),this[_0x57619a(0x464)](_0x5786c7,_0xda9a5c+_0x212552,_0x128c94,_0x3e7356,'left'));}}}}else{function _0x1099cf(){const _0x4b1f74=_0x3a443e;this[_0x4b1f74(0x24d)]();}}}}else{function _0x25fd15(){const _0x229d0e=_0x3a443e;if(_0x338d2f[_0x229d0e(0x48a)]&&_0x5cae89['uiHelpPosition']!==_0x58b9bb)return _0x488a8c[_0x229d0e(0x3ac)];else{if(this[_0x229d0e(0x526)]())return this[_0x229d0e(0x373)]()[_0x229d0e(0x2fb)](/LOWER/i);else _0x1bbcf9[_0x229d0e(0x1a8)][_0x229d0e(0x1c1)][_0x229d0e(0x593)](this);}}}}}if(Input[_0x3a443e(0x2b7)](_0x3a443e(0x5c4))){if(Input['isPressed'](_0x3a443e(0x55e))&&this[_0x3a443e(0x1e7)]()){if('HVhHi'==='HVhHi')this[_0x3a443e(0x24d)]();else{function _0xbe4fec(){const _0x2dbf91=_0x3a443e;if(_0x41ad64[_0x2dbf91(0x33b)][_0x2dbf91(0x38d)]===_0x3ec529)return _0x54beb8['ItemsEquipsCore'][_0x2dbf91(0x330)][_0x2dbf91(0x593)](this);else return _0x99db8f[_0x2dbf91(0x33b)][_0x2dbf91(0x38d)]===_0x2a3453?_0x2fd736[_0x2dbf91(0x209)][_0x2dbf91(0x330)][_0x2dbf91(0x593)](this):_0x331b93[_0x2dbf91(0x209)][_0x2dbf91(0x4ad)]['ItemScene']['ListWindowCols'];}}}else{if('ZmLXe'!==_0x3a443e(0x40d))this[_0x3a443e(0x444)](Input[_0x3a443e(0x4a8)](_0x3a443e(0x5c4)));else{function _0x2b48ed(){const _0x52b9dd=_0x3a443e,_0x37e37b=this[_0x52b9dd(0x40e)]();this[_0x52b9dd(0x4cc)](_0x37e37b,_0x1d749d,_0xcf9516,_0x3972de,!![]);const _0xac45cd=this['getItemSuccessRateText']();return this['drawItemKeyData'](_0xac45cd,_0x487453,_0x108068,_0x3bc975,![],_0x52b9dd(0x547)),this[_0x52b9dd(0x5f2)](_0x1188a5,_0x176eeb,_0x39599f),this['resetFontSettings'](),!![];}}}}if(Input[_0x3a443e(0x2b7)]('up')){if(Input['isPressed']('shift')&&this['allowShiftScrolling']()){if(_0x3a443e(0x2cd)===_0x3a443e(0x39d)){function _0x189bfa(){const _0x1b9f4e=_0x3a443e;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x1b9f4e(0x3c4)]():_0x45391b['ItemsEquipsCore']['Scene_Equip_commandWindowRect'][_0x1b9f4e(0x593)](this);}}else this[_0x3a443e(0x1c2)]();}else{if(_0x3a443e(0x56f)==='UpFsh')this[_0x3a443e(0x41f)](Input['isTriggered']('up'));else{function _0x41eb67(){const _0x2ec0bf=_0x3a443e;return _0x61f631[_0x2ec0bf(0x1a8)][_0x2ec0bf(0x21f)]();}}}}Imported[_0x3a443e(0x42d)]&&this[_0x3a443e(0x1b4)](),this['index']()!==_0x5e6d16&&this[_0x3a443e(0x606)]();}}},Window_ItemList[_0x14a1da(0x1a8)][_0x14a1da(0x4ae)]=function(){const _0x34ff87=_0x14a1da,_0xd3e698=SceneManager[_0x34ff87(0x33b)],_0x36d418=[Scene_Item,Scene_Shop];return _0x36d418['includes'](_0xd3e698[_0x34ff87(0x38d)]);},Window_ItemList[_0x14a1da(0x1a8)][_0x14a1da(0x2d4)]=function(){const _0x4421cf=_0x14a1da;Window_Selectable[_0x4421cf(0x1a8)][_0x4421cf(0x2d4)][_0x4421cf(0x593)](this),this[_0x4421cf(0x1bd)]&&this[_0x4421cf(0x1bd)]['isUseModernControls']()&&this[_0x4421cf(0x1bd)][_0x4421cf(0x2d4)]();},Window_ItemList['prototype'][_0x14a1da(0x407)]=function(){const _0x11280e=_0x14a1da;Window_Selectable[_0x11280e(0x1a8)][_0x11280e(0x407)][_0x11280e(0x593)](this),this[_0x11280e(0x1bd)]&&this['_categoryWindow']['isUseModernControls']()&&this[_0x11280e(0x1bd)][_0x11280e(0x407)]();},Window_ItemList['prototype'][_0x14a1da(0x5a3)]=function(_0x824e42){const _0x1e2c4f=_0x14a1da;this[_0x1e2c4f(0x563)]!==_0x824e42&&(this[_0x1e2c4f(0x563)]=_0x824e42,this[_0x1e2c4f(0x21e)](),this[_0x1e2c4f(0x1bd)]&&this[_0x1e2c4f(0x1bd)][_0x1e2c4f(0x50c)]()?this['smoothSelect'](0x0):this[_0x1e2c4f(0x4a3)](0x0,0x0));},VisuMZ['ItemsEquipsCore'][_0x14a1da(0x330)]=Window_ItemList[_0x14a1da(0x1a8)][_0x14a1da(0x470)],Window_ItemList['prototype']['maxCols']=function(){const _0x334302=_0x14a1da;if(SceneManager[_0x334302(0x33b)][_0x334302(0x38d)]===Scene_Battle){if('ITgiX'!=='tmsVp')return VisuMZ[_0x334302(0x209)][_0x334302(0x330)][_0x334302(0x593)](this);else{function _0x213beb(){const _0x2f25d5=_0x334302;return _0x132282[_0x2f25d5(0x209)][_0x2f25d5(0x4ad)][_0x2f25d5(0x3d4)][_0x2f25d5(0x447)];}}}else return SceneManager[_0x334302(0x33b)][_0x334302(0x38d)]===Scene_Map?VisuMZ['ItemsEquipsCore'][_0x334302(0x330)]['call'](this):VisuMZ[_0x334302(0x209)][_0x334302(0x4ad)][_0x334302(0x5da)][_0x334302(0x5be)];},VisuMZ['ItemsEquipsCore'][_0x14a1da(0x38c)]=Window_ItemList['prototype'][_0x14a1da(0x25f)],Window_ItemList[_0x14a1da(0x1a8)][_0x14a1da(0x25f)]=function(){const _0x3c36d7=_0x14a1da;if(this[_0x3c36d7(0x470)]()<=0x1){if(_0x3c36d7(0x5dd)!==_0x3c36d7(0x5dd)){function _0x8083bd(){const _0x155042=_0x3c36d7;_0x4b1dd9=_0x155042(0x42e)[_0x155042(0x27e)](_0x1cf9c9['id']);}}else return Window_Selectable[_0x3c36d7(0x1a8)][_0x3c36d7(0x25f)][_0x3c36d7(0x593)](this);}else{if(_0x3c36d7(0x40c)!=='ofoBg'){function _0x4514b5(){const _0x583667=_0x3c36d7,_0x40da9a=_0x346d18[_0x583667(0x209)][_0x583667(0x4ad)][_0x583667(0x1ad)];return _0x40da9a[_0x583667(0x3cf)]||_0x40da9a[_0x583667(0x292)];}}else return VisuMZ[_0x3c36d7(0x209)]['Window_ItemList_colSpacing']['call'](this);}},Window_ItemList[_0x14a1da(0x1a8)][_0x14a1da(0x243)]=function(_0x1dd5e6){const _0x3f650a=_0x14a1da;switch(this[_0x3f650a(0x563)]){case _0x3f650a(0x58d):return DataManager['isItem'](_0x1dd5e6);case'RegularItems':return DataManager[_0x3f650a(0x4ac)](_0x1dd5e6)&&_0x1dd5e6[_0x3f650a(0x482)]===0x1;case _0x3f650a(0x36b):return DataManager[_0x3f650a(0x4ac)](_0x1dd5e6)&&_0x1dd5e6[_0x3f650a(0x482)]===0x2;case'HiddenItemA':return DataManager[_0x3f650a(0x4ac)](_0x1dd5e6)&&_0x1dd5e6[_0x3f650a(0x482)]===0x3;case _0x3f650a(0x484):return DataManager[_0x3f650a(0x4ac)](_0x1dd5e6)&&_0x1dd5e6['itypeId']===0x4;case'Consumable':return DataManager[_0x3f650a(0x4ac)](_0x1dd5e6)&&_0x1dd5e6[_0x3f650a(0x5f1)];case _0x3f650a(0x42c):return DataManager[_0x3f650a(0x4ac)](_0x1dd5e6)&&!_0x1dd5e6[_0x3f650a(0x5f1)];case _0x3f650a(0x31f):return DataManager[_0x3f650a(0x4ac)](_0x1dd5e6)&&[0x0]['includes'](_0x1dd5e6[_0x3f650a(0x225)]);case _0x3f650a(0x591):return DataManager[_0x3f650a(0x4ac)](_0x1dd5e6)&&[0x0,0x1]['includes'](_0x1dd5e6['occasion']);case'FieldUsable':return DataManager['isItem'](_0x1dd5e6)&&[0x0,0x2][_0x3f650a(0x243)](_0x1dd5e6[_0x3f650a(0x225)]);case _0x3f650a(0x5f6):return DataManager['isItem'](_0x1dd5e6)&&[0x3][_0x3f650a(0x243)](_0x1dd5e6[_0x3f650a(0x225)]);case _0x3f650a(0x3e7):return DataManager[_0x3f650a(0x3ed)](_0x1dd5e6);case'AllArmors':return DataManager[_0x3f650a(0x242)](_0x1dd5e6);default:if(this[_0x3f650a(0x563)][_0x3f650a(0x2fb)](/WTYPE:(\d+)/i)){if(_0x3f650a(0x51f)!==_0x3f650a(0x51f)){function _0x5839c5(){const _0x27a936=_0x3f650a;this['deactivate'](),this[_0x27a936(0x455)]();}}else return DataManager[_0x3f650a(0x3ed)](_0x1dd5e6)&&_0x1dd5e6['wtypeId']===Number(RegExp['$1']);}else{if(this['_category']['match'](/WTYPE:(.*)/i)){const _0xf3de94=$dataSystem['weaponTypes'][_0x3f650a(0x36d)](String(RegExp['$1'])['trim']());return DataManager[_0x3f650a(0x3ed)](_0x1dd5e6)&&_0x1dd5e6['wtypeId']===_0xf3de94;}else{if(this[_0x3f650a(0x563)][_0x3f650a(0x2fb)](/ATYPE:(\d+)/i)){if(_0x3f650a(0x440)==='raQmw'){function _0x1ba243(){const _0x392367=_0x3f650a,_0x2ff7f4=_0x1a7969[_0x1ce80a],_0xff6611=this[_0x392367(0x2a2)](_0x2ad0e7,_0x2ff7f4);if(this[_0x392367(0x614)](_0xff6611))this[_0x392367(0x46c)][_0x4da8fb]['setObject'](_0xff6611);}}else return DataManager['isArmor'](_0x1dd5e6)&&_0x1dd5e6['atypeId']===Number(RegExp['$1']);}else{if(this['_category']['match'](/ATYPE:(.*)/i)){const _0x222671=$dataSystem[_0x3f650a(0x2e4)][_0x3f650a(0x36d)](String(RegExp['$1'])['trim']());return DataManager['isArmor'](_0x1dd5e6)&&_0x1dd5e6['atypeId']===_0x222671;}else{if(this['_category']['match'](/ETYPE:(\d+)/i)){if(_0x3f650a(0x33a)===_0x3f650a(0x315)){function _0x5a4fce(){const _0x1b821a=_0x3f650a,_0x1d2b79=_0x305468[_0x1b821a(0x4e7)](this[_0x1b821a(0x491)]||this[_0x1b821a(0x472)]()['equipSlots']);if(_0x1d2b79[_0x1b821a(0x2ab)]>=0x2&&this['isDualWield']())_0x1d2b79[0x1]=0x1;return _0x1d2b79;}}else return!!_0x1dd5e6&&_0x1dd5e6['etypeId']===Number(RegExp['$1']);}else{if(this['_category']['match'](/ETYPE:(.*)/i)){const _0x510661=$dataSystem[_0x3f650a(0x60f)][_0x3f650a(0x36d)](String(RegExp['$1'])[_0x3f650a(0x597)]());return DataManager['isArmor'](_0x1dd5e6)&&_0x1dd5e6['etypeId']===_0x510661;}else{if(this['_category'][_0x3f650a(0x2fb)](/Category:(.*)/i)){if(_0x3f650a(0x610)===_0x3f650a(0x3f3)){function _0x4d7a66(){const _0x9bcd8b=_0x3f650a;_0x298df8['VisuMZ_0_CoreEngine']?(_0x1a8efd=this[_0x9bcd8b(0x20d)][_0x9bcd8b(0x35f)](_0x1bc145,![]),_0x37b8dd=this[_0x9bcd8b(0x1d7)][_0x9bcd8b(0x35f)](_0x19cb3a,![]),_0x4f0c5b=this['_tempActor']['paramValueByName'](_0x46dc43,!![])):(_0x104522=this[_0x9bcd8b(0x20d)][_0x9bcd8b(0x609)](_0x2dca72),_0x410340=this[_0x9bcd8b(0x1d7)][_0x9bcd8b(0x609)](_0x53c246),_0x2b01d5=this[_0x9bcd8b(0x1d7)][_0x9bcd8b(0x609)](_0x4f395d));const _0xff549f=_0x3f7f8a,_0x27d69b=_0x56702b;_0x47e7ce=_0x27d69b-_0xff549f,this['changeTextColor'](_0x3a2560[_0x9bcd8b(0x284)](_0xea2b35)),this[_0x9bcd8b(0x464)](_0x2ad76b,_0x2d1d8a,_0x1ecc72,_0x33afef-_0x315b69,_0x9bcd8b(0x547));}}else return!!_0x1dd5e6&&_0x1dd5e6[_0x3f650a(0x34a)][_0x3f650a(0x243)](String(RegExp['$1'])[_0x3f650a(0x437)]()[_0x3f650a(0x597)]());}}}}}}}}return![];},Window_ItemList['prototype'][_0x14a1da(0x390)]=function(){return!![];},VisuMZ['ItemsEquipsCore'][_0x14a1da(0x219)]=Window_ItemList[_0x14a1da(0x1a8)][_0x14a1da(0x1d3)],Window_ItemList[_0x14a1da(0x1a8)]['drawItem']=function(_0x9648e0){const _0xbe6aa3=_0x14a1da;VisuMZ[_0xbe6aa3(0x209)][_0xbe6aa3(0x219)][_0xbe6aa3(0x593)](this,_0x9648e0),this['placeItemNewLabel'](_0x9648e0);},Window_ItemList['prototype'][_0x14a1da(0x555)]=function(_0x3695fd,_0x3d6732,_0x22c28f,_0x37a567){const _0xbaa88=_0x14a1da;Window_Selectable[_0xbaa88(0x1a8)][_0xbaa88(0x555)]['call'](this,_0x3695fd,_0x3d6732,_0x22c28f,_0x37a567);},Window_ItemList[_0x14a1da(0x1a8)][_0x14a1da(0x5c9)]=function(_0x272920){const _0x292907=_0x14a1da,_0x166a0a=this[_0x292907(0x3fe)](_0x272920);if(!_0x166a0a||!this[_0x292907(0x390)]())return;if(!$gameParty[_0x292907(0x553)](_0x166a0a))return;const _0x37132e=this[_0x292907(0x201)](_0x272920),_0x41e353=_0x37132e['x'],_0x1eeaa2=_0x37132e['y']+(this['lineHeight']()-ImageManager[_0x292907(0x3bb)])/0x2,_0x18ec8c=VisuMZ['ItemsEquipsCore'][_0x292907(0x4ad)]['New'][_0x292907(0x56a)],_0x2bf913=VisuMZ[_0x292907(0x209)][_0x292907(0x4ad)]['New'][_0x292907(0x361)];this['placeNewLabel'](_0x166a0a,_0x41e353+_0x18ec8c,_0x1eeaa2+_0x2bf913);},Window_ItemList[_0x14a1da(0x1a8)]['setStatusWindow']=function(_0xa0546){const _0x1ecaf1=_0x14a1da;this[_0x1ecaf1(0x319)]=_0xa0546,this[_0x1ecaf1(0x357)]();},VisuMZ[_0x14a1da(0x209)]['Window_ItemList_updateHelp']=Window_ItemList[_0x14a1da(0x1a8)][_0x14a1da(0x239)],Window_ItemList[_0x14a1da(0x1a8)][_0x14a1da(0x239)]=function(){const _0x1fb9dc=_0x14a1da;VisuMZ[_0x1fb9dc(0x209)][_0x1fb9dc(0x511)][_0x1fb9dc(0x593)](this);if(this[_0x1fb9dc(0x319)]&&this['_statusWindow']['constructor']===Window_ShopStatus){if(_0x1fb9dc(0x23b)===_0x1fb9dc(0x23b))this[_0x1fb9dc(0x319)]['setItem'](this[_0x1fb9dc(0x424)]());else{function _0x14c8bb(){const _0x3470e7=_0x1fb9dc;return _0x1d880e[_0x3470e7(0x209)][_0x3470e7(0x4ad)][_0x3470e7(0x5da)][_0x3470e7(0x205)];}}}},Window_BattleItem[_0x14a1da(0x1a8)][_0x14a1da(0x26a)]=function(_0x3dc458){const _0x228132=_0x14a1da;if(BattleManager[_0x228132(0x57d)]()){if(_0x228132(0x36c)!==_0x228132(0x36c)){function _0x2bb9e0(){const _0x2f268a=_0x228132,_0xa036d2=this['_commandNameWindow'],_0x2c1741=_0x47f6e0['windowPadding'](),_0x1d1319=_0x50ceed['x']+_0x221c23[_0x2f268a(0x4d0)](_0x2427d1[_0x2f268a(0x379)]/0x2)+_0x2c1741;_0xa036d2['x']=_0xa036d2['width']/-0x2+_0x1d1319,_0xa036d2['y']=_0x5dcd59[_0x2f268a(0x4d0)](_0x1aecc4[_0x2f268a(0x4e3)]/0x2);}}else return BattleManager['actor']()[_0x228132(0x20f)](_0x3dc458);}else{if(_0x228132(0x601)!==_0x228132(0x601)){function _0xb092fb(){const _0x440174=_0x228132;_0x2d8679[_0x440174(0x1a8)][_0x440174(0x407)][_0x440174(0x593)](this),this[_0x440174(0x1bd)]&&this[_0x440174(0x1bd)][_0x440174(0x50c)]()&&this[_0x440174(0x1bd)]['deactivate']();}}else return Window_ItemList[_0x228132(0x1a8)][_0x228132(0x26a)][_0x228132(0x593)](this,_0x3dc458);}},Window_EventItem[_0x14a1da(0x1a8)][_0x14a1da(0x390)]=function(){return![];},Window_EquipStatus[_0x14a1da(0x1a8)][_0x14a1da(0x526)]=function(){const _0x37a68d=_0x14a1da;return VisuMZ[_0x37a68d(0x209)]['Settings'][_0x37a68d(0x1ad)][_0x37a68d(0x603)];},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x58f)]=Window_EquipStatus[_0x14a1da(0x1a8)][_0x14a1da(0x21e)],Window_EquipStatus[_0x14a1da(0x1a8)][_0x14a1da(0x21e)]=function(){const _0x42fde5=_0x14a1da;this[_0x42fde5(0x1f6)](),this[_0x42fde5(0x2ad)]();if(this['_actor'])this['_actor'][_0x42fde5(0x21e)]();this[_0x42fde5(0x526)]()?this[_0x42fde5(0x3f9)]():VisuMZ[_0x42fde5(0x209)][_0x42fde5(0x58f)]['call'](this);},Window_EquipStatus[_0x14a1da(0x1a8)][_0x14a1da(0x3f9)]=function(){const _0x37e35d=_0x14a1da;this[_0x37e35d(0x516)][_0x37e35d(0x254)]();if(!this[_0x37e35d(0x20d)])return;if(this[_0x37e35d(0x2af)]()){const _0x1018c4=ImageManager['loadPicture'](this[_0x37e35d(0x20d)][_0x37e35d(0x28f)]());_0x1018c4[_0x37e35d(0x2c0)](this[_0x37e35d(0x221)][_0x37e35d(0x1c8)](this));}else{if(_0x37e35d(0x5aa)!=='HqovK')this[_0x37e35d(0x3e3)]();else{function _0x4b611b(){const _0xf0616=_0x37e35d;_0x2fe542=_0xf0616(0x51a)['format'](_0x3959d7['id']);}}}},Window_EquipStatus[_0x14a1da(0x1a8)][_0x14a1da(0x2af)]=function(){const _0x485d37=_0x14a1da;return Imported[_0x485d37(0x2f3)]&&this['_actor']['getMenuImage']()!==''&&VisuMZ[_0x485d37(0x209)][_0x485d37(0x4ad)][_0x485d37(0x1ad)][_0x485d37(0x436)];},Window_EquipStatus[_0x14a1da(0x1a8)][_0x14a1da(0x221)]=function(){const _0x1d9e47=_0x14a1da;VisuMZ[_0x1d9e47(0x209)][_0x1d9e47(0x4ad)][_0x1d9e47(0x1ad)][_0x1d9e47(0x48c)][_0x1d9e47(0x593)](this),this[_0x1d9e47(0x265)]();},Window_EquipStatus[_0x14a1da(0x1a8)][_0x14a1da(0x3e3)]=function(){const _0x575ca7=_0x14a1da;VisuMZ[_0x575ca7(0x209)][_0x575ca7(0x4ad)][_0x575ca7(0x1ad)]['DrawFaceJS'][_0x575ca7(0x593)](this),this[_0x575ca7(0x265)]();},Window_EquipStatus[_0x14a1da(0x1a8)]['drawParamsItemsEquipsCore']=function(){const _0x18fee1=_0x14a1da;this['resetFontSettings'](),VisuMZ[_0x18fee1(0x209)][_0x18fee1(0x4ad)]['EquipScene'][_0x18fee1(0x397)][_0x18fee1(0x593)](this);},Window_EquipStatus[_0x14a1da(0x1a8)]['drawItemActorMenuImage']=function(_0x351423,_0x3d1e28,_0x27290f,_0x203672,_0x4808b3){const _0xe71fac=_0x14a1da,_0x50268d=ImageManager[_0xe71fac(0x2ea)](_0x351423[_0xe71fac(0x28f)]()),_0x27cbed=this['innerWidth']-_0x50268d['width'];_0x3d1e28+=_0x27cbed/0x2;if(_0x27cbed<0x0)_0x203672-=_0x27cbed;Window_StatusBase[_0xe71fac(0x1a8)][_0xe71fac(0x520)][_0xe71fac(0x593)](this,_0x351423,_0x3d1e28,_0x27290f,_0x203672,_0x4808b3);},Window_EquipStatus[_0x14a1da(0x1a8)][_0x14a1da(0x287)]=function(){const _0x162d68=_0x14a1da;if(Imported['VisuMZ_0_CoreEngine'])return VisuMZ['CoreEngine']['Settings'][_0x162d68(0x44a)]['ExtDisplayedParams'];else{if(_0x162d68(0x226)===_0x162d68(0x31a)){function _0x3738be(){const _0x3e2146=_0x162d68;if(this['isDrawItemNumber'](_0x7bfa1e)){this[_0x3e2146(0x2ad)]();const _0xf54795=_0x4f5ec5[_0x3e2146(0x209)][_0x3e2146(0x4ad)][_0x3e2146(0x5da)],_0x56821b=_0xf54795['ItemQuantityFmt'],_0x5a6636=_0x56821b[_0x3e2146(0x27e)](_0x114196[_0x3e2146(0x617)](_0x31ff55));this['contents']['fontSize']=_0xf54795[_0x3e2146(0x4b7)],this[_0x3e2146(0x464)](_0x5a6636,_0x55de75,_0x3079e2,_0x36b1cc,_0x3e2146(0x547)),this[_0x3e2146(0x2ad)]();}}}else return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];}},Window_EquipStatus[_0x14a1da(0x1a8)][_0x14a1da(0x35b)]=function(){const _0x37b0cf=_0x14a1da;return VisuMZ['ItemsEquipsCore'][_0x37b0cf(0x4ad)][_0x37b0cf(0x1ad)][_0x37b0cf(0x1a6)];},Window_EquipStatus[_0x14a1da(0x1a8)][_0x14a1da(0x380)]=function(){const _0x26c6f0=_0x14a1da;return Imported[_0x26c6f0(0x42d)]&&VisuMZ[_0x26c6f0(0x53d)][_0x26c6f0(0x4ad)][_0x26c6f0(0x44a)]['DrawIcons'];},Window_EquipStatus[_0x14a1da(0x1a8)][_0x14a1da(0x382)]=function(_0x225e1c,_0x27168e,_0x25d0f9,_0x3a863b){const _0x2e174d=_0x14a1da,_0x492643=this['itemPadding']();Imported[_0x2e174d(0x42d)]?this[_0x2e174d(0x573)](_0x27168e+_0x492643,_0x25d0f9,_0x3a863b,_0x225e1c,![]):this[_0x2e174d(0x464)](TextManager[_0x2e174d(0x609)](_0x225e1c),_0x27168e+_0x492643,_0x25d0f9,_0x3a863b);},Window_EquipStatus[_0x14a1da(0x1a8)][_0x14a1da(0x2aa)]=function(_0xef3f4a,_0x5bfbf8,_0x4e0e0b,_0x2d3b77){const _0x4cc7c6=_0x14a1da,_0x25877d=this[_0x4cc7c6(0x53c)]();let _0x2d5cbc=0x0;if(Imported[_0x4cc7c6(0x42d)]){if(_0x4cc7c6(0x33f)!==_0x4cc7c6(0x45d))_0x2d5cbc=this[_0x4cc7c6(0x20d)][_0x4cc7c6(0x35f)](_0xef3f4a,!![]);else{function _0x360e58(){const _0x147fac=_0x4cc7c6;this[_0x147fac(0x606)]();}}}else _0x2d5cbc=this['_actor']['param'](_0xef3f4a);const _0x1df5ac=_0x2d5cbc;this['drawText'](_0x2d5cbc,_0x5bfbf8,_0x4e0e0b,_0x2d3b77-_0x25877d,'right');},Window_EquipStatus[_0x14a1da(0x1a8)][_0x14a1da(0x3dd)]=function(_0x127dba,_0x2cd119,_0x1de3e3,_0x1588fd){const _0x11ab8d=_0x14a1da,_0x3e89fc=this[_0x11ab8d(0x53c)]();let _0x174551=0x0,_0x6a4cf4=0x0,_0x4bc19d='';if(this[_0x11ab8d(0x1d7)]){if(Imported[_0x11ab8d(0x42d)]){if(_0x11ab8d(0x20a)!==_0x11ab8d(0x20a)){function _0x55845b(){const _0x451716=_0x11ab8d;if(!this[_0x451716(0x1d7)]){const _0x4bb554=_0x46e043[_0x451716(0x4e7)](this);_0x4bb554[_0x451716(0x1d7)]=!![],_0x51a79e[_0x451716(0x209)][_0x451716(0x4fa)][_0x451716(0x593)](this,_0x28fd4d,_0xd431d7),this[_0x451716(0x334)](_0x4bb554);}else _0x50963d['ItemsEquipsCore'][_0x451716(0x4fa)][_0x451716(0x593)](this,_0x1b7c74,_0x997e6);}}else _0x174551=this[_0x11ab8d(0x20d)][_0x11ab8d(0x35f)](_0x127dba,![]),_0x6a4cf4=this[_0x11ab8d(0x1d7)][_0x11ab8d(0x35f)](_0x127dba,![]),_0x4bc19d=this[_0x11ab8d(0x1d7)][_0x11ab8d(0x35f)](_0x127dba,!![]);}else{if(_0x11ab8d(0x3d1)===_0x11ab8d(0x3d1))_0x174551=this['_actor'][_0x11ab8d(0x609)](_0x127dba),_0x6a4cf4=this[_0x11ab8d(0x1d7)][_0x11ab8d(0x609)](_0x127dba),_0x4bc19d=this[_0x11ab8d(0x1d7)][_0x11ab8d(0x609)](_0x127dba);else{function _0xc9958d(){const _0x48f087=_0x11ab8d;for(const _0x16a8e3 of _0x1b3164['equipTypes']){const _0x12d629=_0x8d401[_0x48f087(0x60f)][_0x48f087(0x36d)](_0x16a8e3[_0x48f087(0x597)]());if(_0x12d629>0x0)_0x7d22e3['equipSlots'][_0x48f087(0x1d2)](_0x12d629);}}}}const _0x59926d=_0x174551,_0x425145=_0x6a4cf4;diffValue=_0x425145-_0x59926d,this[_0x11ab8d(0x1ce)](ColorManager[_0x11ab8d(0x284)](diffValue)),this[_0x11ab8d(0x464)](_0x4bc19d,_0x2cd119,_0x1de3e3,_0x1588fd-_0x3e89fc,_0x11ab8d(0x547));}},Window_EquipStatus[_0x14a1da(0x1a8)]['drawUpdatedParamValueDiff']=function(_0x5005c3,_0x39661a,_0x26e46b,_0x472589){const _0x695a35=_0x14a1da,_0x116585=this['itemPadding']();let _0x2ec939=0x0,_0x65389=0x0,_0xd100cc=![];if(this[_0x695a35(0x1d7)]){if(_0x695a35(0x5f8)===_0x695a35(0x5f8)){Imported[_0x695a35(0x42d)]?(_0x2ec939=this[_0x695a35(0x20d)][_0x695a35(0x35f)](_0x5005c3,![]),_0x65389=this[_0x695a35(0x1d7)][_0x695a35(0x35f)](_0x5005c3,![]),_0xd100cc=String(this[_0x695a35(0x20d)][_0x695a35(0x35f)](_0x5005c3,!![]))[_0x695a35(0x2fb)](/([%％])/i)):(_0x2ec939=this[_0x695a35(0x20d)][_0x695a35(0x609)](_0x5005c3),_0x65389=this['_tempActor'][_0x695a35(0x609)](_0x5005c3),_0xd100cc=_0x2ec939%0x1!==0x0||_0x65389%0x1!==0x0);const _0x20080d=_0x2ec939,_0x337be5=_0x65389,_0x350489=_0x337be5-_0x20080d;let _0xeca8ba=_0x350489;if(_0xd100cc)_0xeca8ba=Math[_0x695a35(0x300)](_0x350489*0x64)+'%';_0x350489!==0x0&&(this['changeTextColor'](ColorManager[_0x695a35(0x284)](_0x350489)),_0xeca8ba=(_0x350489>0x0?_0x695a35(0x513):_0x695a35(0x55f))[_0x695a35(0x27e)](_0xeca8ba),this['drawText'](_0xeca8ba,_0x39661a+_0x116585,_0x26e46b,_0x472589,'left'));}else{function _0xd9c626(){const _0x415e48=_0x695a35;_0x8497ac[_0x415e48(0x209)][_0x415e48(0x4df)]={},_0x2c5051[_0x415e48(0x209)][_0x415e48(0x4df)][_0x415e48(0x1e6)]=[],_0x1c21c8['ItemsEquipsCore'][_0x415e48(0x4df)][_0x415e48(0x2eb)]=[];const _0x8a50cc=[_0x415e48(0x554),_0x415e48(0x587),_0x415e48(0x428),'DEF',_0x415e48(0x53a),_0x415e48(0x3cd),'AGI',_0x415e48(0x434)];for(const _0x1b3fb1 of _0x8a50cc){const _0x5a19a9=_0x415e48(0x5c8)['format'](_0x1b3fb1);_0x202a95[_0x415e48(0x209)][_0x415e48(0x4df)][_0x415e48(0x1e6)][_0x415e48(0x1d2)](new _0x456e87(_0x5a19a9,'i'));const _0x794742=_0x415e48(0x3f6)[_0x415e48(0x27e)](_0x1b3fb1);_0x63700b[_0x415e48(0x209)]['RegExp'][_0x415e48(0x2eb)]['push'](new _0xc9ae04(_0x794742,'g'));}}}}},Window_EquipStatus[_0x14a1da(0x1a8)][_0x14a1da(0x5f2)]=function(_0xd16ec1,_0x1bfa46,_0x374e79,_0x48217b,_0x4828fb){const _0x29d6b3=_0x14a1da;if(VisuMZ[_0x29d6b3(0x209)][_0x29d6b3(0x4ad)][_0x29d6b3(0x1ad)]['DrawBackRect']===![])return;_0x4828fb=Math[_0x29d6b3(0x489)](_0x4828fb||0x1,0x1);while(_0x4828fb--){_0x48217b=_0x48217b||this['lineHeight'](),this[_0x29d6b3(0x516)][_0x29d6b3(0x1cb)]=0xa0;const _0x83daeb=ColorManager[_0x29d6b3(0x228)]();this[_0x29d6b3(0x516)][_0x29d6b3(0x498)](_0xd16ec1+0x1,_0x1bfa46+0x1,_0x374e79-0x2,_0x48217b-0x2,_0x83daeb),this['contents'][_0x29d6b3(0x1cb)]=0xff;}},ColorManager[_0x14a1da(0x228)]=function(){const _0x53bd34=_0x14a1da,_0x1ea783=VisuMZ['ItemsEquipsCore']['Settings'][_0x53bd34(0x1ad)];let _0x271b19=_0x1ea783[_0x53bd34(0x263)]!==undefined?_0x1ea783[_0x53bd34(0x263)]:0x13;return ColorManager[_0x53bd34(0x1fd)](_0x271b19);},VisuMZ[_0x14a1da(0x209)][_0x14a1da(0x22b)]=Window_EquipCommand['prototype'][_0x14a1da(0x355)],Window_EquipCommand[_0x14a1da(0x1a8)][_0x14a1da(0x355)]=function(_0x3855b3){const _0x54cd57=_0x14a1da;VisuMZ[_0x54cd57(0x209)]['Window_EquipCommand_initialize'][_0x54cd57(0x593)](this,_0x3855b3),this[_0x54cd57(0x413)](_0x3855b3);},Window_EquipCommand[_0x14a1da(0x1a8)][_0x14a1da(0x413)]=function(_0x43b85a){const _0x434560=_0x14a1da,_0x481ca9=new Rectangle(0x0,0x0,_0x43b85a[_0x434560(0x379)],_0x43b85a['height']);this['_commandNameWindow']=new Window_Base(_0x481ca9),this[_0x434560(0x490)][_0x434560(0x60b)]=0x0,this[_0x434560(0x244)](this['_commandNameWindow']),this[_0x434560(0x1d9)]();},Window_EquipCommand[_0x14a1da(0x1a8)][_0x14a1da(0x357)]=function(){const _0x4d0bc9=_0x14a1da;Window_HorzCommand[_0x4d0bc9(0x1a8)][_0x4d0bc9(0x357)][_0x4d0bc9(0x593)](this);if(this[_0x4d0bc9(0x490)])this['updateCommandNameWindow']();},Window_EquipCommand['prototype'][_0x14a1da(0x1d9)]=function(){const _0x44ff28=_0x14a1da,_0x4d5f5e=this[_0x44ff28(0x490)];_0x4d5f5e['contents'][_0x44ff28(0x254)]();const _0x22a6e2=this[_0x44ff28(0x1c5)](this['index']());if(_0x22a6e2==='icon'){const _0x553aea=this['itemLineRect'](this[_0x44ff28(0x4ff)]());let _0xd93fff=this[_0x44ff28(0x275)](this[_0x44ff28(0x4ff)]());_0xd93fff=_0xd93fff[_0x44ff28(0x4c2)](/\\I\[(\d+)\]/gi,''),_0x4d5f5e['resetFontSettings'](),this['commandNameWindowDrawBackground'](_0xd93fff,_0x553aea),this[_0x44ff28(0x289)](_0xd93fff,_0x553aea),this['commandNameWindowCenter'](_0xd93fff,_0x553aea);}},Window_EquipCommand[_0x14a1da(0x1a8)][_0x14a1da(0x359)]=function(_0xe82de1,_0x122126){},Window_EquipCommand['prototype'][_0x14a1da(0x289)]=function(_0x17b008,_0x575b57){const _0x3e5e07=_0x14a1da,_0x979a16=this[_0x3e5e07(0x490)];_0x979a16[_0x3e5e07(0x464)](_0x17b008,0x0,_0x575b57['y'],_0x979a16[_0x3e5e07(0x2f4)],_0x3e5e07(0x303));},Window_EquipCommand[_0x14a1da(0x1a8)][_0x14a1da(0x344)]=function(_0xf5410f,_0x5042b6){const _0x341209=_0x14a1da,_0x3f76b1=this['_commandNameWindow'],_0x3ba9ce=$gameSystem[_0x341209(0x524)](),_0x2a9012=_0x5042b6['x']+Math[_0x341209(0x4d0)](_0x5042b6[_0x341209(0x379)]/0x2)+_0x3ba9ce;_0x3f76b1['x']=_0x3f76b1['width']/-0x2+_0x2a9012,_0x3f76b1['y']=Math['floor'](_0x5042b6[_0x341209(0x4e3)]/0x2);},Window_EquipCommand[_0x14a1da(0x1a8)][_0x14a1da(0x50c)]=function(){const _0x27852d=_0x14a1da;return Imported[_0x27852d(0x42d)]&&Window_HorzCommand['prototype']['isUseModernControls'][_0x27852d(0x593)](this);},Window_EquipCommand[_0x14a1da(0x1a8)]['playOkSound']=function(){const _0xe8ba67=_0x14a1da;if(this['currentSymbol']()==='equip')Window_HorzCommand[_0xe8ba67(0x1a8)][_0xe8ba67(0x468)][_0xe8ba67(0x593)](this);},Window_EquipCommand['prototype'][_0x14a1da(0x387)]=function(){const _0x4aae8b=_0x14a1da;!this['processCursorSpecialCheckModernControls']()&&Window_HorzCommand['prototype'][_0x4aae8b(0x387)][_0x4aae8b(0x593)](this);},Window_EquipCommand[_0x14a1da(0x1a8)][_0x14a1da(0x241)]=function(){const _0x121051=_0x14a1da;if(!this['isCursorMovable']())return![];if(SceneManager[_0x121051(0x33b)]['constructor']!==Scene_Equip)return![];return Input[_0x121051(0x4a8)](_0x121051(0x5c4))&&(this[_0x121051(0x606)](),SceneManager['_scene'][_0x121051(0x3d7)](),SceneManager[_0x121051(0x33b)][_0x121051(0x508)][_0x121051(0x3b0)](-0x1)),![];},Window_EquipCommand['prototype'][_0x14a1da(0x470)]=function(){const _0x4b2b6b=_0x14a1da;return this[_0x4b2b6b(0x56c)]?this[_0x4b2b6b(0x56c)][_0x4b2b6b(0x2ab)]:0x3;},Window_EquipCommand[_0x14a1da(0x1a8)]['processTouchModernControls']=function(){const _0x3e8998=_0x14a1da;if(this[_0x3e8998(0x47d)]()&&this[_0x3e8998(0x54c)]&&SceneManager[_0x3e8998(0x33b)][_0x3e8998(0x38d)]===Scene_Equip){if(_0x3e8998(0x34f)!=='uIOYQ'){function _0x4bcd62(){const _0x52c510=_0x3e8998,_0x52bf31=this['itemLineRect'](this[_0x52c510(0x4ff)]());let _0x3849ae=this[_0x52c510(0x275)](this[_0x52c510(0x4ff)]());_0x3849ae=_0x3849ae[_0x52c510(0x4c2)](/\\I\[(\d+)\]/gi,''),_0x11b047['resetFontSettings'](),this[_0x52c510(0x43b)](_0x3849ae,_0x52bf31),this[_0x52c510(0x215)](_0x3849ae,_0x52bf31),this[_0x52c510(0x495)](_0x3849ae,_0x52bf31);}}else{if(this['isHoverEnabled']()&&TouchInput[_0x3e8998(0x453)]())this[_0x3e8998(0x541)](![]);else TouchInput[_0x3e8998(0x4a8)]()&&this[_0x3e8998(0x541)](!![]);if(TouchInput[_0x3e8998(0x2b2)]()){if(_0x3e8998(0x4cd)!==_0x3e8998(0x4cd)){function _0x357922(){const _0x566eec=_0x3e8998,_0x37eae3=_0x42095b[_0x566eec(0x5cb)]('['+_0x4e163a['$1'][_0x566eec(0x2fb)](/\d+/g)+']');for(const _0x304c95 of _0x37eae3){if(_0x4840dd[_0x566eec(0x37c)](_0x304c95))return!![];}return![];}}else this[_0x3e8998(0x39e)]();}else TouchInput['isCancelled']()&&this[_0x3e8998(0x28e)]();}}},Window_EquipCommand[_0x14a1da(0x1a8)][_0x14a1da(0x541)]=function(_0x1125f8){const _0x2b9a7e=_0x14a1da;this[_0x2b9a7e(0x320)]=![];const _0x13540=this['index'](),_0x452c70=this[_0x2b9a7e(0x4b2)](),_0x22a7e1=SceneManager['_scene']['_slotWindow'];if(_0x22a7e1['isOpen']()&&_0x22a7e1[_0x2b9a7e(0x54c)]){if(_0x2b9a7e(0x3d5)===_0x2b9a7e(0x549)){function _0x2267e0(){const _0x550e79=_0x2b9a7e,_0x415dc5=this[_0x550e79(0x45b)]();this[_0x550e79(0x4cc)](_0x415dc5,_0x407d6d,_0x4602d3,_0x1e54f2,!![]);const _0x20bcb1=this['getItemDamageElementText']();return this['drawItemKeyData'](_0x20bcb1,_0x136517,_0x5e502f,_0x157175,![],_0x550e79(0x547)),this[_0x550e79(0x5f2)](_0x2bc33b,_0x264680,_0x4a711b),this['resetFontSettings'](),!![];}}else{if(_0x452c70>=0x0){if(_0x452c70===this['index']()){if('TgIwQ'!=='fzuhT')this['_doubleTouch']=!![];else{function _0x3d826f(){const _0x3df2e5=_0x2b9a7e,_0x3d5212=_0x475ca2[_0x3df2e5(0x2a9)];this[_0x3df2e5(0x464)](_0x3d5212,_0x2a4162,_0x4e85d0,_0x157647,'center');}}}this[_0x2b9a7e(0x2d4)](),this['select'](_0x452c70);}else _0x22a7e1[_0x2b9a7e(0x4b2)]()>=0x0&&(this[_0x2b9a7e(0x407)](),this[_0x2b9a7e(0x455)]());}}if(_0x1125f8&&this[_0x2b9a7e(0x4ff)]()!==_0x13540){if(_0x2b9a7e(0x612)!==_0x2b9a7e(0x2d0))this[_0x2b9a7e(0x606)]();else{function _0x2eab26(){const _0x268cb0=_0x2b9a7e;return _0x4d7ff8[_0x268cb0(0x209)][_0x268cb0(0x4ad)]['StatusWindow'][_0x268cb0(0x57b)];}}}},Window_EquipCommand[_0x14a1da(0x1a8)][_0x14a1da(0x561)]=function(){const _0x1c8492=_0x14a1da;this[_0x1c8492(0x21b)](),this['addOptimizeCommand'](),this['addClearCommand']();},Window_EquipCommand['prototype'][_0x14a1da(0x21e)]=function(){const _0x185980=_0x14a1da;Window_HorzCommand[_0x185980(0x1a8)][_0x185980(0x21e)][_0x185980(0x593)](this),this['refreshCursor']();},Window_EquipCommand['prototype']['addEquipCommand']=function(){const _0x1ea440=_0x14a1da;if(!this[_0x1ea440(0x4b6)]())return;const _0x4377b4=this[_0x1ea440(0x4e4)](),_0x796e9a=VisuMZ['ItemsEquipsCore'][_0x1ea440(0x4ad)][_0x1ea440(0x1ad)]['CmdIconEquip'],_0x3795cd=_0x4377b4===_0x1ea440(0x4b5)?TextManager['equip2']:_0x1ea440(0x514)[_0x1ea440(0x27e)](_0x796e9a,TextManager[_0x1ea440(0x206)]),_0x32c271=this[_0x1ea440(0x386)]();this[_0x1ea440(0x1ed)](_0x3795cd,'equip',_0x32c271);},Window_EquipCommand['prototype'][_0x14a1da(0x4b6)]=function(){const _0x3c7134=_0x14a1da;return!this[_0x3c7134(0x50c)]();},Window_EquipCommand[_0x14a1da(0x1a8)]['isEquipCommandEnabled']=function(){return!![];},Window_EquipCommand['prototype'][_0x14a1da(0x294)]=function(){const _0x320a13=_0x14a1da;if(!this[_0x320a13(0x1ec)]())return;const _0x19a4b7=this[_0x320a13(0x4e4)](),_0x4e33a1=VisuMZ[_0x320a13(0x209)]['Settings'][_0x320a13(0x1ad)]['CmdIconOptimize'],_0x3694d0=_0x19a4b7===_0x320a13(0x4b5)?TextManager[_0x320a13(0x1aa)]:_0x320a13(0x514)[_0x320a13(0x27e)](_0x4e33a1,TextManager[_0x320a13(0x1aa)]),_0x360a9f=this[_0x320a13(0x3f1)]();this[_0x320a13(0x1ed)](_0x3694d0,_0x320a13(0x1aa),_0x360a9f);},Window_EquipCommand[_0x14a1da(0x1a8)][_0x14a1da(0x1ec)]=function(){const _0x1683be=_0x14a1da;return VisuMZ[_0x1683be(0x209)][_0x1683be(0x4ad)]['EquipScene'][_0x1683be(0x3cf)];},Window_EquipCommand[_0x14a1da(0x1a8)][_0x14a1da(0x3f1)]=function(){return!![];},Window_EquipCommand['prototype'][_0x14a1da(0x35a)]=function(){const _0x242e4a=_0x14a1da;if(!this[_0x242e4a(0x1e9)]())return;const _0x42d05e=this[_0x242e4a(0x4e4)](),_0x3a6a28=VisuMZ['ItemsEquipsCore'][_0x242e4a(0x4ad)]['EquipScene']['CmdIconClear'],_0x1ff2fb=_0x42d05e===_0x242e4a(0x4b5)?TextManager[_0x242e4a(0x254)]:_0x242e4a(0x514)[_0x242e4a(0x27e)](_0x3a6a28,TextManager[_0x242e4a(0x254)]),_0x4a6f76=this[_0x242e4a(0x2e6)]();this['addCommand'](_0x1ff2fb,_0x242e4a(0x254),_0x4a6f76);},Window_EquipCommand[_0x14a1da(0x1a8)][_0x14a1da(0x1e9)]=function(){const _0x44103d=_0x14a1da;return VisuMZ[_0x44103d(0x209)]['Settings'][_0x44103d(0x1ad)]['CommandAddClear'];},Window_EquipCommand[_0x14a1da(0x1a8)][_0x14a1da(0x2e6)]=function(){return!![];},Window_EquipCommand[_0x14a1da(0x1a8)]['itemTextAlign']=function(){const _0x2ad70b=_0x14a1da;return VisuMZ[_0x2ad70b(0x209)]['Settings'][_0x2ad70b(0x1ad)][_0x2ad70b(0x2fc)];},Window_EquipCommand[_0x14a1da(0x1a8)][_0x14a1da(0x1d3)]=function(_0x55a7e4){const _0x10014d=_0x14a1da,_0x4a64ce=this[_0x10014d(0x1c5)](_0x55a7e4);if(_0x4a64ce===_0x10014d(0x231))this[_0x10014d(0x589)](_0x55a7e4);else _0x4a64ce==='icon'?this[_0x10014d(0x577)](_0x55a7e4):Window_HorzCommand[_0x10014d(0x1a8)][_0x10014d(0x1d3)][_0x10014d(0x593)](this,_0x55a7e4);},Window_EquipCommand[_0x14a1da(0x1a8)]['commandStyle']=function(){const _0x4d6df1=_0x14a1da;return VisuMZ[_0x4d6df1(0x209)][_0x4d6df1(0x4ad)][_0x4d6df1(0x1ad)]['CmdStyle'];},Window_EquipCommand[_0x14a1da(0x1a8)][_0x14a1da(0x1c5)]=function(_0x42997b){const _0x8edc0a=_0x14a1da;if(_0x42997b<0x0)return _0x8edc0a(0x4b5);const _0x2e65be=this['commandStyle']();if(_0x2e65be!==_0x8edc0a(0x2ed))return _0x2e65be;else{if(this[_0x8edc0a(0x53b)]()>0x0){const _0x73f500=this[_0x8edc0a(0x275)](_0x42997b);if(_0x73f500[_0x8edc0a(0x2fb)](/\\I\[(\d+)\]/i)){const _0x515225=this[_0x8edc0a(0x201)](_0x42997b),_0x4e80fa=this[_0x8edc0a(0x2c8)](_0x73f500)[_0x8edc0a(0x379)];if(_0x4e80fa<=_0x515225[_0x8edc0a(0x379)]){if(_0x8edc0a(0x24a)!==_0x8edc0a(0x349))return _0x8edc0a(0x231);else{function _0x14e8c2(){const _0x4f638c=_0x8edc0a,_0x41f515=this[_0x4f638c(0x1bd)]['y']+this[_0x4f638c(0x1bd)][_0x4f638c(0x4e3)],_0x5a7755=_0x3ccf04['boxWidth']-this[_0x4f638c(0x21f)](),_0x654849=this[_0x4f638c(0x36f)]()-this[_0x4f638c(0x1bd)][_0x4f638c(0x4e3)],_0x2c478c=this[_0x4f638c(0x1c1)]()?_0x471ed6[_0x4f638c(0x565)]-_0x5a7755:0x0;return new _0x237c5a(_0x2c478c,_0x41f515,_0x5a7755,_0x654849);}}}else{if(_0x8edc0a(0x552)===_0x8edc0a(0x24b)){function _0x3e5230(){const _0x1a6c97=_0x8edc0a;this[_0x1a6c97(0x1ce)](_0xbccbca[_0x1a6c97(0x378)]());}}else return _0x8edc0a(0x317);}}}}return'text';},Window_EquipCommand[_0x14a1da(0x1a8)][_0x14a1da(0x589)]=function(_0x5ef29c){const _0x35aba5=_0x14a1da,_0x464c97=this[_0x35aba5(0x201)](_0x5ef29c),_0x1fa7ce=this[_0x35aba5(0x275)](_0x5ef29c),_0x477a06=this[_0x35aba5(0x2c8)](_0x1fa7ce)[_0x35aba5(0x379)];this[_0x35aba5(0x1f3)](this[_0x35aba5(0x4be)](_0x5ef29c));const _0x503519=this['itemTextAlign']();if(_0x503519===_0x35aba5(0x547))this['drawTextEx'](_0x1fa7ce,_0x464c97['x']+_0x464c97[_0x35aba5(0x379)]-_0x477a06,_0x464c97['y'],_0x477a06);else{if(_0x503519===_0x35aba5(0x303)){const _0x52be21=_0x464c97['x']+Math[_0x35aba5(0x4d0)]((_0x464c97['width']-_0x477a06)/0x2);this[_0x35aba5(0x3bf)](_0x1fa7ce,_0x52be21,_0x464c97['y'],_0x477a06);}else this[_0x35aba5(0x3bf)](_0x1fa7ce,_0x464c97['x'],_0x464c97['y'],_0x477a06);}},Window_EquipCommand[_0x14a1da(0x1a8)][_0x14a1da(0x577)]=function(_0x423f13){const _0x4ef327=_0x14a1da;this[_0x4ef327(0x275)](_0x423f13)[_0x4ef327(0x2fb)](/\\I\[(\d+)\]/i);const _0x2cc2b5=Number(RegExp['$1'])||0x0,_0x6dcf30=this[_0x4ef327(0x201)](_0x423f13),_0x1db785=_0x6dcf30['x']+Math[_0x4ef327(0x4d0)]((_0x6dcf30[_0x4ef327(0x379)]-ImageManager[_0x4ef327(0x302)])/0x2),_0x37f9c1=_0x6dcf30['y']+(_0x6dcf30[_0x4ef327(0x4e3)]-ImageManager[_0x4ef327(0x3bb)])/0x2;this[_0x4ef327(0x203)](_0x2cc2b5,_0x1db785,_0x37f9c1);},Window_EquipSlot[_0x14a1da(0x1a8)][_0x14a1da(0x50c)]=function(){const _0x3f379f=_0x14a1da;return Imported[_0x3f379f(0x42d)]&&Window_HorzCommand['prototype'][_0x3f379f(0x50c)][_0x3f379f(0x593)](this);},Window_EquipSlot[_0x14a1da(0x1a8)][_0x14a1da(0x2d4)]=function(){const _0x17228e=_0x14a1da;Window_StatusBase[_0x17228e(0x1a8)][_0x17228e(0x2d4)][_0x17228e(0x593)](this),this[_0x17228e(0x357)]();},Window_EquipSlot[_0x14a1da(0x1a8)]['processCursorMove']=function(){const _0x23ab2=_0x14a1da;Window_StatusBase[_0x23ab2(0x1a8)]['processCursorMove'][_0x23ab2(0x593)](this),this[_0x23ab2(0x5d2)]();},Window_EquipSlot['prototype'][_0x14a1da(0x5d2)]=function(){const _0x5b7001=_0x14a1da;if(!this[_0x5b7001(0x4f2)]())return;if(Input['isTriggered'](_0x5b7001(0x55e))&&this[_0x5b7001(0x424)]()){const _0x16a53f=SceneManager[_0x5b7001(0x33b)][_0x5b7001(0x20d)];if(_0x16a53f){if(_0x5b7001(0x1d4)!=='MASUV'){if(this[_0x5b7001(0x360)](this[_0x5b7001(0x4ff)]()))this[_0x5b7001(0x4fe)](),this[_0x5b7001(0x239)]();else{if(_0x5b7001(0x404)!==_0x5b7001(0x585))this[_0x5b7001(0x507)]();else{function _0x21024a(){const _0x567a78=_0x5b7001;return _0x57b630[_0x567a78(0x1a8)][_0x567a78(0x25f)][_0x567a78(0x593)](this);}}}}else{function _0x5ef1f8(){const _0x1b6ee6=_0x5b7001;return _0x1d250c[_0x1b6ee6(0x209)][_0x1b6ee6(0x4ad)]['ShopScene']['CmdStyle'];}}}}},Window_EquipSlot[_0x14a1da(0x1a8)][_0x14a1da(0x360)]=function(_0x308c34){const _0x517eff=_0x14a1da,_0x1d7d09=SceneManager[_0x517eff(0x33b)][_0x517eff(0x20d)];if(!_0x1d7d09)return;if(!_0x1d7d09[_0x517eff(0x24e)](this[_0x517eff(0x4ff)]()))return![];const _0x4bd898=_0x1d7d09[_0x517eff(0x2c9)]()[this[_0x517eff(0x4ff)]()];if(_0x1d7d09['nonRemovableEtypes']()[_0x517eff(0x243)](_0x4bd898)){if('SEzKj'===_0x517eff(0x5ae))return![];else{function _0x4d6907(){return this['normalColor']();}}}return!![];;},Window_EquipSlot[_0x14a1da(0x1a8)][_0x14a1da(0x4fe)]=function(){const _0x4c74f9=_0x14a1da;SoundManager['playEquip']();const _0x2a8c18=SceneManager[_0x4c74f9(0x33b)]['_actor'];_0x2a8c18[_0x4c74f9(0x264)](this['index'](),null),this[_0x4c74f9(0x21e)](),this['_itemWindow'][_0x4c74f9(0x21e)](),this['callUpdateHelp']();const _0x3df0a8=SceneManager['_scene'][_0x4c74f9(0x319)];if(_0x3df0a8)_0x3df0a8['refresh']();},Window_EquipSlot['prototype']['isShiftRemoveShortcutEnabled']=function(){const _0x101ffd=_0x14a1da;if(!this[_0x101ffd(0x4db)])return![];if(!VisuMZ[_0x101ffd(0x209)][_0x101ffd(0x4ad)][_0x101ffd(0x1ad)][_0x101ffd(0x5dc)])return![];return!![];},Window_EquipSlot['prototype'][_0x14a1da(0x387)]=function(){const _0x50749b=_0x14a1da;if(!this['processCursorSpecialCheckModernControls']()){if(_0x50749b(0x499)==='HWgHm'){function _0x25547b(){const _0x507abc=_0x50749b;return _0x5e4c60[_0x507abc(0x209)][_0x507abc(0x4ad)][_0x507abc(0x5da)][_0x507abc(0x4ed)];}}else Window_StatusBase['prototype'][_0x50749b(0x387)]['call'](this);}},Window_EquipSlot[_0x14a1da(0x1a8)][_0x14a1da(0x241)]=function(){const _0x1e6d86=_0x14a1da;if(!this[_0x1e6d86(0x2bf)]())return![];if(SceneManager['_scene'][_0x1e6d86(0x38d)]!==Scene_Equip)return![];if(this[_0x1e6d86(0x4cf)]()){if(_0x1e6d86(0x46a)!=='ZrWym'){function _0x3253da(){const _0x1b0464=_0x1e6d86,_0x197c63=_0x584ae4(_0x164649['$1']);try{_0x1b0aaf(_0x197c63);}catch(_0xee9e64){if(_0x2f6374[_0x1b0464(0x5f5)]())_0x4d75e3[_0x1b0464(0x20e)](_0xee9e64);}}}else return this['playCursorSound'](),Input[_0x1e6d86(0x254)](),SceneManager['_scene'][_0x1e6d86(0x5b6)](),![];}else{if(Input['isRepeated']('down')){const _0x5660cf=this['index']();return Input[_0x1e6d86(0x222)](_0x1e6d86(0x55e))?this[_0x1e6d86(0x24d)]():this['cursorDown'](Input[_0x1e6d86(0x4a8)](_0x1e6d86(0x5c4))),this[_0x1e6d86(0x4ff)]()!==_0x5660cf&&this[_0x1e6d86(0x606)](),!![];}else{if(this[_0x1e6d86(0x4bf)]()&&Input[_0x1e6d86(0x4a8)]('shift'))return!![];}}return![];},Window_EquipSlot[_0x14a1da(0x1a8)][_0x14a1da(0x4cf)]=function(){const _0x5a21db=_0x14a1da;if(this[_0x5a21db(0x4ff)]()!==0x0)return![];const _0x53eeb2=VisuMZ[_0x5a21db(0x209)][_0x5a21db(0x4ad)][_0x5a21db(0x1ad)];if(!_0x53eeb2[_0x5a21db(0x3cf)]&&!_0x53eeb2[_0x5a21db(0x292)])return![];return Input[_0x5a21db(0x4a8)]('up');},Window_EquipSlot[_0x14a1da(0x1a8)]['isShiftShortcutKeyForRemove']=function(){const _0x506971=_0x14a1da;return VisuMZ['ItemsEquipsCore'][_0x506971(0x4ad)][_0x506971(0x1ad)]['ShiftShortcutKey'];},Window_EquipSlot['prototype'][_0x14a1da(0x43f)]=function(){const _0x206b01=_0x14a1da;if(this[_0x206b01(0x47d)]()&&this[_0x206b01(0x54c)]&&SceneManager[_0x206b01(0x33b)][_0x206b01(0x38d)]===Scene_Equip){if(this['isHoverEnabled']()&&TouchInput[_0x206b01(0x453)]())this['onTouchSelectModernControls'](![]);else TouchInput['isTriggered']()&&this['onTouchSelectModernControls'](!![]);if(TouchInput[_0x206b01(0x2b2)]())this[_0x206b01(0x39e)]();else TouchInput[_0x206b01(0x24f)]()&&this['onTouchCancel']();}},Window_EquipSlot[_0x14a1da(0x1a8)][_0x14a1da(0x541)]=function(_0x53e348){const _0x2fb7b1=_0x14a1da;this[_0x2fb7b1(0x320)]=![];const _0x3347e=this[_0x2fb7b1(0x4ff)](),_0x2f40d8=this['hitIndex'](),_0x2bfe1e=SceneManager[_0x2fb7b1(0x33b)][_0x2fb7b1(0x2df)];if(_0x2bfe1e['isOpen']()&&_0x2bfe1e[_0x2fb7b1(0x54c)]){if('aFREa'==='aFREa'){if(_0x2f40d8>=0x0){if('UXrSV'!==_0x2fb7b1(0x352))_0x2f40d8===this[_0x2fb7b1(0x4ff)]()&&(this['_doubleTouch']=!![]),this[_0x2fb7b1(0x2d4)](),this[_0x2fb7b1(0x2e0)](_0x2f40d8);else{function _0x36f6c5(){const _0x253062=_0x2fb7b1;this['_money']=_0x3be413[_0x253062(0x33b)]['money']();}}}else _0x2bfe1e[_0x2fb7b1(0x4b2)]()>=0x0&&(this[_0x2fb7b1(0x407)](),this['deselect']());}else{function _0x16268a(){const _0x15be1d=_0x2fb7b1;this[_0x15be1d(0x42b)]=[];}}}_0x53e348&&this[_0x2fb7b1(0x4ff)]()!==_0x3347e&&this['playCursorSound']();},Window_EquipSlot['prototype'][_0x14a1da(0x5b0)]=function(){const _0x56896a=_0x14a1da;return this[_0x56896a(0x4ff)]();},VisuMZ['ItemsEquipsCore'][_0x14a1da(0x4bb)]=Window_EquipItem[_0x14a1da(0x1a8)][_0x14a1da(0x243)],Window_EquipItem[_0x14a1da(0x1a8)][_0x14a1da(0x243)]=function(_0x57165c){const _0x1789fd=_0x14a1da;if(_0x57165c===null&&this[_0x1789fd(0x43e)]()[_0x1789fd(0x243)](this[_0x1789fd(0x308)]())){if(_0x1789fd(0x3f4)==='kwmDD'){function _0x104601(){const _0x396188=_0x1789fd;if(_0x514226!==_0xf1fa21)return;if(_0x1751b4[_0x396188(0x214)][_0x396188(0x2fb)](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){const _0x20b41e=_0x32f663(_0x575cca['$1']),_0x30120a='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x396188(0x27e)](_0x20b41e);_0x2b9998[_0x396188(0x209)][_0x396188(0x306)][_0x582e4b['id']]=new _0x368f3e(_0x396188(0x424),_0x30120a);}}}else return![];}else{if(_0x1789fd(0x537)!==_0x1789fd(0x3a5))return VisuMZ[_0x1789fd(0x209)][_0x1789fd(0x4bb)]['call'](this,_0x57165c);else{function _0x49910e(){const _0x28f929=_0x1789fd;if(!_0x26128b[_0x28f929(0x4b4)]())return;const _0x159ef2=_0x52930b[_0x28f929(0x209)][_0x28f929(0x4ad)][_0x28f929(0x304)];_0x159ef2['SwitchBuy']&&_0x22402f[_0x28f929(0x5a4)](_0x159ef2['SwitchBuy'],![]),_0x159ef2[_0x28f929(0x1cd)]&&_0x31278e[_0x28f929(0x5a4)](_0x159ef2[_0x28f929(0x1cd)],![]);}}}},VisuMZ[_0x14a1da(0x209)]['Window_EquipItem_isEnabled']=Window_EquipItem[_0x14a1da(0x1a8)]['isEnabled'],Window_EquipItem[_0x14a1da(0x1a8)]['isEnabled']=function(_0x21cd95){const _0x576149=_0x14a1da;if(_0x21cd95&&this['_actor']){if(this[_0x576149(0x43e)]()[_0x576149(0x243)](this[_0x576149(0x308)]()))return![];if(this['itemHasEquipLimit'](_0x21cd95))return![];if(this[_0x576149(0x3a9)](_0x21cd95))return![];if(this['isSoleArmorType'](_0x21cd95))return![];}if(!_0x21cd95)return!this[_0x576149(0x43e)]()['includes'](this[_0x576149(0x308)]());return VisuMZ[_0x576149(0x209)][_0x576149(0x519)][_0x576149(0x593)](this,_0x21cd95);},Window_EquipItem[_0x14a1da(0x1a8)][_0x14a1da(0x4aa)]=function(_0x4003f5){const _0x2889b2=_0x14a1da,_0x4a4b8e=_0x4003f5[_0x2889b2(0x214)];if(_0x4a4b8e[_0x2889b2(0x2fb)](/<EQUIP COPY LIMIT:[ ](\d+)>/i)){const _0xba150f=Number(RegExp['$1'])||0x1;let _0x37563c=0x0;const _0x225212=this[_0x2889b2(0x20d)][_0x2889b2(0x568)](),_0x32a20f=SceneManager[_0x2889b2(0x33b)][_0x2889b2(0x508)][_0x2889b2(0x5b0)]();_0x225212[_0x32a20f]=null;for(const _0x1af719 of _0x225212){if('CedvS'===_0x2889b2(0x419)){function _0x3376c4(){const _0x5266e1=_0x2889b2;_0x2de760=_0x4643d1[_0x5266e1(0x35f)](_0xb6b777),_0x5543f3=_0x5cf7e2-_0x4cbb08['paramValueByName'](_0x5a1830),this['changeTextColor'](_0x559462[_0x5266e1(0x284)](_0x1663f1)),_0x30f326=(_0x9b6019>=0x0?'+':'')+_0x4e4da5[_0x5266e1(0x346)](_0x3d49ab,0x0,_0x25d659);}}else{if(!_0x1af719)continue;if(DataManager[_0x2889b2(0x3ed)](_0x4003f5)===DataManager[_0x2889b2(0x3ed)](_0x1af719)){if(_0x4003f5['id']===_0x1af719['id'])_0x37563c+=0x1;}}}return _0x37563c>=_0xba150f;}else return![];},Window_EquipItem[_0x14a1da(0x1a8)][_0x14a1da(0x3a9)]=function(_0x4c7a17){const _0x5b435d=_0x14a1da;if(!DataManager[_0x5b435d(0x3ed)](_0x4c7a17))return![];const _0x368f3a=/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i;let _0x1c3901=0x0;const _0x3452dd=this[_0x5b435d(0x20d)][_0x5b435d(0x568)](),_0x4b8123=SceneManager[_0x5b435d(0x33b)][_0x5b435d(0x508)]['equipSlotIndex']();_0x3452dd[_0x4b8123]=null;for(const _0x35b43b of _0x3452dd){if(_0x5b435d(0x4a6)!=='CMMBi'){if(!_0x35b43b)continue;if(!DataManager['isWeapon'](_0x35b43b))continue;if(_0x4c7a17['wtypeId']===_0x35b43b[_0x5b435d(0x1b6)]){_0x1c3901+=0x1;if(_0x4c7a17[_0x5b435d(0x214)]['match'](_0x368f3a)){const _0x278d24=Number(RegExp['$1'])||0x1;if(_0x1c3901>=_0x278d24)return!![];}if(_0x35b43b[_0x5b435d(0x214)]['match'](_0x368f3a)){const _0x3c41c8=Number(RegExp['$1'])||0x1;if(_0x1c3901>=_0x3c41c8)return!![];}}}else{function _0x2f0628(){const _0x32749f=_0x5b435d;this[_0x32749f(0x319)][_0x32749f(0x20b)](this[_0x32749f(0x424)]());}}}return![];},Window_EquipItem[_0x14a1da(0x1a8)][_0x14a1da(0x4e0)]=function(_0x3a37fd){const _0x2c5a60=_0x14a1da;if(!DataManager[_0x2c5a60(0x242)](_0x3a37fd))return![];const _0x5a8bcf=/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i;let _0x332f0a=0x0;const _0x38e9f1=this[_0x2c5a60(0x20d)][_0x2c5a60(0x568)](),_0x340a53=SceneManager['_scene']['_slotWindow'][_0x2c5a60(0x5b0)]();_0x38e9f1[_0x340a53]=null;for(const _0x4952f1 of _0x38e9f1){if(_0x2c5a60(0x41e)!==_0x2c5a60(0x476)){if(!_0x4952f1)continue;if(!DataManager[_0x2c5a60(0x242)](_0x4952f1))continue;if(_0x3a37fd[_0x2c5a60(0x396)]===_0x4952f1[_0x2c5a60(0x396)]){_0x332f0a+=0x1;if(_0x3a37fd[_0x2c5a60(0x214)]['match'](_0x5a8bcf)){if(_0x2c5a60(0x5b4)===_0x2c5a60(0x5b4)){const _0x54039e=Number(RegExp['$1'])||0x1;if(_0x332f0a>=_0x54039e)return!![];}else{function _0x5e18b9(){const _0x46f66b=_0x2c5a60;_0x2d57f5[_0x46f66b(0x209)][_0x46f66b(0x43d)][_0x46f66b(0x593)](this,_0x3317d7),this[_0x46f66b(0x413)](_0x211bac);}}}if(_0x4952f1[_0x2c5a60(0x214)][_0x2c5a60(0x2fb)](_0x5a8bcf)){const _0x3a13d2=Number(RegExp['$1'])||0x1;if(_0x332f0a>=_0x3a13d2)return!![];}}}else{function _0x534d20(){const _0x3b6293=_0x2c5a60;!this['isHandled'](_0x3b6293(0x237))&&_0x154aac['isTriggered'](_0x3b6293(0x237))&&this[_0x3b6293(0x24d)](),!this[_0x3b6293(0x2f1)](_0x3b6293(0x2a4))&&_0x392908[_0x3b6293(0x4a8)](_0x3b6293(0x2a4))&&this[_0x3b6293(0x1c2)]();}}}return![];},Window_EquipItem[_0x14a1da(0x1a8)][_0x14a1da(0x43e)]=function(){const _0x3a0ce5=_0x14a1da;return VisuMZ[_0x3a0ce5(0x209)][_0x3a0ce5(0x4ad)][_0x3a0ce5(0x1ad)][_0x3a0ce5(0x323)];},Window_EquipItem[_0x14a1da(0x1a8)][_0x14a1da(0x1d3)]=function(_0x36a9ec){const _0x764ae4=_0x14a1da,_0x4d8afa=this[_0x764ae4(0x3fe)](_0x36a9ec);if(_0x4d8afa){if(_0x764ae4(0x5d5)!==_0x764ae4(0x53f))Window_ItemList['prototype'][_0x764ae4(0x1d3)][_0x764ae4(0x593)](this,_0x36a9ec);else{function _0x307e16(){return![];}}}else{if(_0x764ae4(0x28b)===_0x764ae4(0x51d)){function _0x40585d(){const _0x1a69f3=_0x764ae4;this[_0x1a69f3(0x3e3)]();}}else this['drawRemoveItem'](_0x36a9ec);}},Window_EquipItem['prototype']['drawRemoveItem']=function(_0x2fed3c){const _0x222d70=_0x14a1da;this[_0x222d70(0x1f3)](this[_0x222d70(0x26a)](null));const _0x1c718a=VisuMZ['ItemsEquipsCore'][_0x222d70(0x4ad)][_0x222d70(0x1ad)],_0x12749e=this[_0x222d70(0x201)](_0x2fed3c),_0x159a05=_0x12749e['y']+(this[_0x222d70(0x5df)]()-ImageManager[_0x222d70(0x3bb)])/0x2,_0x2abfa8=ImageManager[_0x222d70(0x302)]+0x4,_0x246eb4=Math[_0x222d70(0x489)](0x0,_0x12749e[_0x222d70(0x379)]-_0x2abfa8);this[_0x222d70(0x21d)](),this[_0x222d70(0x203)](_0x1c718a['RemoveEquipIcon'],_0x12749e['x'],_0x159a05),this[_0x222d70(0x464)](_0x1c718a[_0x222d70(0x25c)],_0x12749e['x']+_0x2abfa8,_0x12749e['y'],_0x246eb4),this['changePaintOpacity'](!![]);},Window_EquipItem['prototype']['updateHelp']=function(){const _0x1d12a3=_0x14a1da;Window_ItemList[_0x1d12a3(0x1a8)]['updateHelp']['call'](this);if(this[_0x1d12a3(0x20d)]&&this[_0x1d12a3(0x319)]&&this['_slotId']>=0x0){const _0x4cd388=JsonEx[_0x1d12a3(0x4e7)](this[_0x1d12a3(0x20d)]);_0x4cd388[_0x1d12a3(0x1d7)]=!![],_0x4cd388[_0x1d12a3(0x2e8)](this[_0x1d12a3(0x253)],this['item']()),this[_0x1d12a3(0x319)]['setTempActor'](_0x4cd388);}},VisuMZ[_0x14a1da(0x209)]['Window_ShopCommand_initialize']=Window_ShopCommand[_0x14a1da(0x1a8)]['initialize'],Window_ShopCommand[_0x14a1da(0x1a8)][_0x14a1da(0x355)]=function(_0xd9b5b3){const _0x43b57b=_0x14a1da;VisuMZ[_0x43b57b(0x209)]['Window_ShopCommand_initialize']['call'](this,_0xd9b5b3),this['createCommandNameWindow'](_0xd9b5b3);},Window_ShopCommand['prototype'][_0x14a1da(0x413)]=function(_0x1f9bf6){const _0x6af10b=_0x14a1da,_0x848f68=new Rectangle(0x0,0x0,_0x1f9bf6[_0x6af10b(0x379)],_0x1f9bf6['height']);this[_0x6af10b(0x490)]=new Window_Base(_0x848f68),this[_0x6af10b(0x490)]['opacity']=0x0,this[_0x6af10b(0x244)](this['_commandNameWindow']),this[_0x6af10b(0x1d9)]();},Window_ShopCommand['prototype'][_0x14a1da(0x357)]=function(){const _0x5b4e63=_0x14a1da;Window_HorzCommand[_0x5b4e63(0x1a8)][_0x5b4e63(0x357)][_0x5b4e63(0x593)](this);if(this['_commandNameWindow'])this[_0x5b4e63(0x1d9)]();},Window_ShopCommand[_0x14a1da(0x1a8)][_0x14a1da(0x1d9)]=function(){const _0x28410a=_0x14a1da,_0x5bc77d=this['_commandNameWindow'];_0x5bc77d['contents']['clear']();const _0x199e8e=this[_0x28410a(0x1c5)](this['index']());if(_0x199e8e===_0x28410a(0x317)){const _0x26fde6=this[_0x28410a(0x201)](this[_0x28410a(0x4ff)]());let _0x398240=this[_0x28410a(0x275)](this[_0x28410a(0x4ff)]());_0x398240=_0x398240[_0x28410a(0x4c2)](/\\I\[(\d+)\]/gi,''),_0x5bc77d['resetFontSettings'](),this[_0x28410a(0x359)](_0x398240,_0x26fde6),this[_0x28410a(0x289)](_0x398240,_0x26fde6),this[_0x28410a(0x344)](_0x398240,_0x26fde6);}},Window_ShopCommand[_0x14a1da(0x1a8)]['commandNameWindowDrawBackground']=function(_0x100a6f,_0x2f4053){},Window_ShopCommand[_0x14a1da(0x1a8)][_0x14a1da(0x289)]=function(_0x37002a,_0x59ba6e){const _0x3a5402=_0x14a1da,_0x54ed6b=this[_0x3a5402(0x490)];_0x54ed6b[_0x3a5402(0x464)](_0x37002a,0x0,_0x59ba6e['y'],_0x54ed6b[_0x3a5402(0x2f4)],'center');},Window_ShopCommand[_0x14a1da(0x1a8)]['commandNameWindowCenter']=function(_0x5b5f4c,_0x5c93d1){const _0x8a2d70=_0x14a1da,_0x436a6e=this[_0x8a2d70(0x490)],_0x141302=$gameSystem[_0x8a2d70(0x524)](),_0x4187b3=_0x5c93d1['x']+Math[_0x8a2d70(0x4d0)](_0x5c93d1[_0x8a2d70(0x379)]/0x2)+_0x141302;_0x436a6e['x']=_0x436a6e[_0x8a2d70(0x379)]/-0x2+_0x4187b3,_0x436a6e['y']=Math[_0x8a2d70(0x4d0)](_0x5c93d1['height']/0x2);},Window_ShopCommand['prototype'][_0x14a1da(0x470)]=function(){const _0x54813d=_0x14a1da;return this[_0x54813d(0x56c)]?this['_list'][_0x54813d(0x2ab)]:0x3;},Window_ShopCommand[_0x14a1da(0x1a8)][_0x14a1da(0x592)]=function(){const _0x456ada=_0x14a1da;return VisuMZ[_0x456ada(0x209)][_0x456ada(0x4ad)][_0x456ada(0x304)][_0x456ada(0x327)];},Window_ShopCommand[_0x14a1da(0x1a8)]['makeCommandList']=function(){const _0x105086=_0x14a1da;this[_0x105086(0x383)](),this[_0x105086(0x1f8)](),this[_0x105086(0x234)]();},Window_ShopCommand[_0x14a1da(0x1a8)][_0x14a1da(0x21e)]=function(){const _0x3f2c92=_0x14a1da;Window_HorzCommand[_0x3f2c92(0x1a8)][_0x3f2c92(0x21e)][_0x3f2c92(0x593)](this),this[_0x3f2c92(0x44b)]();},Window_ShopCommand[_0x14a1da(0x1a8)][_0x14a1da(0x383)]=function(){const _0xabb4ea=_0x14a1da,_0x53eda0=this['commandStyle'](),_0xe11466=VisuMZ[_0xabb4ea(0x209)][_0xabb4ea(0x4ad)][_0xabb4ea(0x304)][_0xabb4ea(0x3ca)],_0x58a403=_0x53eda0===_0xabb4ea(0x4b5)?TextManager[_0xabb4ea(0x1fa)]:_0xabb4ea(0x514)['format'](_0xe11466,TextManager[_0xabb4ea(0x1fa)]),_0x4fefb2=this['isBuyCommandEnabled']();if(this[_0xabb4ea(0x592)]()&&!_0x4fefb2)return;this[_0xabb4ea(0x1ed)](_0x58a403,'buy',_0x4fefb2);},Window_ShopCommand[_0x14a1da(0x1a8)][_0x14a1da(0x3d8)]=function(){const _0x2c99c4=_0x14a1da;if(SceneManager[_0x2c99c4(0x33b)][_0x2c99c4(0x38d)]===Scene_Shop)return SceneManager[_0x2c99c4(0x33b)]['_goodsCount']>0x0;else{if(_0x2c99c4(0x3d2)==='USlUo'){function _0x50255e(){_0x1e5ea1=_0x10e6ad;if(!_0x2a9baf[_0x4ecac5])return _0x41edff;}}else return!![];}},Window_ShopCommand[_0x14a1da(0x1a8)][_0x14a1da(0x1f8)]=function(){const _0x4e4ce2=_0x14a1da,_0x1bba77=this[_0x4e4ce2(0x4e4)](),_0x404660=VisuMZ[_0x4e4ce2(0x209)][_0x4e4ce2(0x4ad)][_0x4e4ce2(0x304)][_0x4e4ce2(0x3b8)],_0x310ff9=_0x1bba77===_0x4e4ce2(0x4b5)?TextManager[_0x4e4ce2(0x30b)]:_0x4e4ce2(0x514)[_0x4e4ce2(0x27e)](_0x404660,TextManager['sell']),_0x5436d1=this['isSellCommandEnabled']();if(this[_0x4e4ce2(0x592)]()&&!_0x5436d1)return;this[_0x4e4ce2(0x1ed)](_0x310ff9,'sell',_0x5436d1);},Window_ShopCommand['prototype'][_0x14a1da(0x25b)]=function(){const _0xb634b6=_0x14a1da;return!this[_0xb634b6(0x496)];},Window_ShopCommand[_0x14a1da(0x1a8)]['addCancelCommand']=function(){const _0xdb1335=_0x14a1da,_0xb4a8ca=this[_0xdb1335(0x4e4)](),_0x3f2128=VisuMZ['ItemsEquipsCore'][_0xdb1335(0x4ad)][_0xdb1335(0x304)]['CmdIconCancel'],_0x844a05=VisuMZ[_0xdb1335(0x209)][_0xdb1335(0x4ad)]['ShopScene'][_0xdb1335(0x49a)],_0x5badc0=_0xb4a8ca===_0xdb1335(0x4b5)?_0x844a05:_0xdb1335(0x514)[_0xdb1335(0x27e)](_0x3f2128,_0x844a05);this[_0xdb1335(0x1ed)](_0x5badc0,_0xdb1335(0x598));},Window_ShopCommand['prototype'][_0x14a1da(0x3a7)]=function(){const _0x559e9d=_0x14a1da;return VisuMZ['ItemsEquipsCore']['Settings'][_0x559e9d(0x304)][_0x559e9d(0x2fc)];},Window_ShopCommand['prototype'][_0x14a1da(0x1d3)]=function(_0x28a42b){const _0x191e96=_0x14a1da,_0x1f0c64=this[_0x191e96(0x1c5)](_0x28a42b);if(_0x1f0c64==='iconText'){if(_0x191e96(0x449)!=='nHweS'){function _0x2a36a4(){const _0x3cc39b=_0x191e96;_0x4caea1[_0x3cc39b(0x209)][_0x3cc39b(0x351)]['call'](this),this[_0x3cc39b(0x50c)]()&&this[_0x3cc39b(0x2f7)]();}}else this[_0x191e96(0x589)](_0x28a42b);}else{if(_0x1f0c64==='icon'){if('ikkoW'!==_0x191e96(0x471))this[_0x191e96(0x577)](_0x28a42b);else{function _0x2afcd5(){const _0xb99d91=_0x191e96;return _0x556af9[_0xb99d91(0x209)][_0xb99d91(0x210)][_0xb99d91(0x593)](this);}}}else Window_HorzCommand[_0x191e96(0x1a8)]['drawItem'][_0x191e96(0x593)](this,_0x28a42b);}},Window_ShopCommand[_0x14a1da(0x1a8)][_0x14a1da(0x4e4)]=function(){const _0x16861a=_0x14a1da;return VisuMZ[_0x16861a(0x209)][_0x16861a(0x4ad)]['ShopScene']['CmdStyle'];},Window_ShopCommand[_0x14a1da(0x1a8)]['commandStyleCheck']=function(_0x219cfe){const _0x3d8582=_0x14a1da;if(_0x219cfe<0x0)return _0x3d8582(0x4b5);const _0x34e735=this[_0x3d8582(0x4e4)]();if(_0x34e735!==_0x3d8582(0x2ed))return _0x34e735;else{if(this[_0x3d8582(0x53b)]()>0x0){const _0x5a2b5b=this[_0x3d8582(0x275)](_0x219cfe);if(_0x5a2b5b[_0x3d8582(0x2fb)](/\\I\[(\d+)\]/i)){if('ivLzf'!==_0x3d8582(0x3e1)){function _0x322e98(){const _0x4fd8b6=_0x3d8582;if(this['buttonAssistSlotWindowShift']())return _0xa89f8e[_0x4fd8b6(0x3b1)]('shift');return _0x5862b5[_0x4fd8b6(0x1a8)]['buttonAssistKey3'][_0x4fd8b6(0x593)](this);}}else{const _0x4d1682=this[_0x3d8582(0x201)](_0x219cfe),_0x237c44=this[_0x3d8582(0x2c8)](_0x5a2b5b)[_0x3d8582(0x379)];if(_0x237c44<=_0x4d1682[_0x3d8582(0x379)]){if(_0x3d8582(0x347)===_0x3d8582(0x347))return _0x3d8582(0x231);else{function _0x54e501(){const _0x3c8f28=_0x3d8582,_0x31d789=_0xe4f95[_0x3c8f28(0x209)][_0x3c8f28(0x4ad)][_0x3c8f28(0x1ad)];let _0x247cd2=_0x31d789['BackRectColor']!==_0x4ca5ce?_0x31d789[_0x3c8f28(0x263)]:0x13;return _0x43b911[_0x3c8f28(0x1fd)](_0x247cd2);}}}else return _0x3d8582(0x317);}}}}return _0x3d8582(0x4b5);},Window_ShopCommand['prototype'][_0x14a1da(0x589)]=function(_0x9db98a){const _0x43c4d9=_0x14a1da,_0x46446e=this['itemLineRect'](_0x9db98a),_0x5cbd2c=this[_0x43c4d9(0x275)](_0x9db98a),_0x9e512e=this[_0x43c4d9(0x2c8)](_0x5cbd2c)[_0x43c4d9(0x379)];this['changePaintOpacity'](this['isCommandEnabled'](_0x9db98a));const _0x4c6817=this[_0x43c4d9(0x3a7)]();if(_0x4c6817===_0x43c4d9(0x547))this[_0x43c4d9(0x3bf)](_0x5cbd2c,_0x46446e['x']+_0x46446e['width']-_0x9e512e,_0x46446e['y'],_0x9e512e);else{if(_0x4c6817===_0x43c4d9(0x303)){const _0x117179=_0x46446e['x']+Math[_0x43c4d9(0x4d0)]((_0x46446e[_0x43c4d9(0x379)]-_0x9e512e)/0x2);this[_0x43c4d9(0x3bf)](_0x5cbd2c,_0x117179,_0x46446e['y'],_0x9e512e);}else{if(_0x43c4d9(0x497)===_0x43c4d9(0x4a4)){function _0x87c849(){const _0x1b2dd0=_0x43c4d9;_0x2b4d99['prototype'][_0x1b2dd0(0x2ad)][_0x1b2dd0(0x593)](this),this['contents']['fontSize']=this[_0x1b2dd0(0x50b)]||this[_0x1b2dd0(0x516)]['fontSize'],this['contents'][_0x1b2dd0(0x5d9)]=this[_0x1b2dd0(0x5ff)]||this[_0x1b2dd0(0x516)][_0x1b2dd0(0x5d9)];}}else this['drawTextEx'](_0x5cbd2c,_0x46446e['x'],_0x46446e['y'],_0x9e512e);}}},Window_ShopCommand[_0x14a1da(0x1a8)][_0x14a1da(0x577)]=function(_0x2140dd){const _0x52d2c0=_0x14a1da;this[_0x52d2c0(0x275)](_0x2140dd)[_0x52d2c0(0x2fb)](/\\I\[(\d+)\]/i);const _0x5da302=Number(RegExp['$1'])||0x0,_0x5b4931=this[_0x52d2c0(0x201)](_0x2140dd),_0x56c496=_0x5b4931['x']+Math[_0x52d2c0(0x4d0)]((_0x5b4931[_0x52d2c0(0x379)]-ImageManager[_0x52d2c0(0x302)])/0x2),_0x3e54e0=_0x5b4931['y']+(_0x5b4931[_0x52d2c0(0x4e3)]-ImageManager[_0x52d2c0(0x3bb)])/0x2;this[_0x52d2c0(0x203)](_0x5da302,_0x56c496,_0x3e54e0);},VisuMZ['ItemsEquipsCore'][_0x14a1da(0x310)]=Window_ShopBuy['prototype'][_0x14a1da(0x21e)],Window_ShopBuy[_0x14a1da(0x1a8)][_0x14a1da(0x21e)]=function(){const _0x115adc=_0x14a1da;this[_0x115adc(0x5a8)](),VisuMZ[_0x115adc(0x209)][_0x115adc(0x310)][_0x115adc(0x593)](this);},Window_ShopBuy[_0x14a1da(0x1a8)][_0x14a1da(0x5a8)]=function(){const _0x62f965=_0x14a1da;SceneManager[_0x62f965(0x33b)]['constructor']===Scene_Shop&&(this['_money']=SceneManager[_0x62f965(0x33b)][_0x62f965(0x30c)]());},VisuMZ[_0x14a1da(0x209)]['Window_ShopBuy_price']=Window_ShopBuy[_0x14a1da(0x1a8)][_0x14a1da(0x2fa)],Window_ShopBuy[_0x14a1da(0x1a8)][_0x14a1da(0x2fa)]=function(_0x876d0d){const _0x3c6076=_0x14a1da;if(!_0x876d0d)return 0x0;const _0x5b8785=VisuMZ['ItemsEquipsCore'][_0x3c6076(0x3c8)][_0x3c6076(0x593)](this,_0x876d0d);return this[_0x3c6076(0x5b8)](_0x876d0d,_0x5b8785);},Window_ShopBuy[_0x14a1da(0x1a8)][_0x14a1da(0x5b8)]=function(_0x41dd4a,_0xf2ff2b){const _0x2ab67a=_0x14a1da,_0x7754e4=_0x41dd4a[_0x2ab67a(0x214)];if(_0x7754e4[_0x2ab67a(0x2fb)](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x26494f=String(RegExp['$1']);try{eval(_0x26494f);}catch(_0x3792de){if('acRAd'!==_0x2ab67a(0x3b9)){if($gameTemp[_0x2ab67a(0x5f5)]())console[_0x2ab67a(0x20e)](_0x3792de);}else{function _0x1418e3(){const _0x5cf5fe=_0x2ab67a;_0x526a08[_0x5cf5fe(0x56e)]();}}}}_0xf2ff2b=VisuMZ['ItemsEquipsCore']['Settings'][_0x2ab67a(0x304)][_0x2ab67a(0x375)]['call'](this,_0x41dd4a,_0xf2ff2b);if(isNaN(_0xf2ff2b))_0xf2ff2b=0x0;return Math[_0x2ab67a(0x4d0)](_0xf2ff2b);},Window_ShopBuy['prototype']['drawItem']=function(_0x54afb4){const _0x12411d=_0x14a1da;this['resetFontSettings']();const _0x27861b=this[_0x12411d(0x3fe)](_0x54afb4),_0x2421e6=this[_0x12411d(0x201)](_0x54afb4),_0x14c4c0=_0x2421e6[_0x12411d(0x379)];this[_0x12411d(0x1f3)](this[_0x12411d(0x26a)](_0x27861b)),this[_0x12411d(0x60a)](_0x27861b,_0x2421e6['x'],_0x2421e6['y'],_0x14c4c0),this[_0x12411d(0x384)](_0x27861b,_0x2421e6),this[_0x12411d(0x1f3)](!![]);},Window_ShopBuy[_0x14a1da(0x1a8)][_0x14a1da(0x384)]=function(_0x334e2b,_0x671286){const _0x31e97b=_0x14a1da,_0x2010d3=this[_0x31e97b(0x2fa)](_0x334e2b);this['drawCurrencyValue'](_0x2010d3,TextManager[_0x31e97b(0x615)],_0x671286['x'],_0x671286['y'],_0x671286[_0x31e97b(0x379)]);},Window_ShopSell[_0x14a1da(0x1a8)][_0x14a1da(0x470)]=function(){const _0xbcaec=_0x14a1da;return SceneManager[_0xbcaec(0x33b)]['isUseItemsEquipsCoreUpdatedLayout']()?0x1:0x2;},VisuMZ['ItemsEquipsCore'][_0x14a1da(0x550)]=Window_ShopSell[_0x14a1da(0x1a8)]['isEnabled'],Window_ShopSell[_0x14a1da(0x1a8)][_0x14a1da(0x26a)]=function(_0x1d6b58){const _0x3191fb=_0x14a1da;if(!_0x1d6b58)return![];const _0x1d07e2=_0x1d6b58[_0x3191fb(0x214)];if(_0x1d07e2[_0x3191fb(0x2fb)](/<CANNOT SELL>/i))return![];if(_0x1d07e2[_0x3191fb(0x2fb)](/<CAN SELL>/i))return!![];if(_0x1d07e2[_0x3191fb(0x2fb)](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3191fb(0x22c)!==_0x3191fb(0x588)){const _0x27f530=JSON[_0x3191fb(0x5cb)]('['+RegExp['$1'][_0x3191fb(0x2fb)](/\d+/g)+']');for(const _0x443d4d of _0x27f530){if(!$gameSwitches[_0x3191fb(0x37c)](_0x443d4d))return![];}}else{function _0x4d42d8(){return _0xfb8e58;}}}if(_0x1d07e2[_0x3191fb(0x2fb)](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3191fb(0x2ae)==='neohy'){const _0x37606d=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x210ea1 of _0x37606d){if('bKtXE'!==_0x3191fb(0x1af)){function _0xbc1624(){const _0x220977=_0x3191fb;this['cursorRight'](_0x1642d7[_0x220977(0x4a8)](_0x220977(0x547)));}}else{if(!$gameSwitches['value'](_0x210ea1))return![];}}}else{function _0x5b399e(){return!![];}}}if(_0x1d07e2['match'](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x371149=JSON['parse']('['+RegExp['$1'][_0x3191fb(0x2fb)](/\d+/g)+']');for(const _0x46662f of _0x371149){if(_0x3191fb(0x59f)===_0x3191fb(0x583)){function _0x3b369d(){const _0x13fed1=_0x3191fb;return _0x1e8e5e[_0x13fed1(0x209)]['Scene_Equip_slotWindowRect'][_0x13fed1(0x593)](this);}}else{if($gameSwitches[_0x3191fb(0x37c)](_0x46662f))return![];}}}return VisuMZ[_0x3191fb(0x209)][_0x3191fb(0x550)]['call'](this,_0x1d6b58);},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x3eb)]=function(){return![];},Window_ShopStatus['prototype'][_0x14a1da(0x328)]=function(){const _0x5f22a1=_0x14a1da;Window_StatusBase['prototype'][_0x5f22a1(0x328)]['call'](this);for(const _0x2988ea of $gameParty[_0x5f22a1(0x267)]()){if('huKwu'!==_0x5f22a1(0x25a)){function _0x54b7d0(){const _0x4bd8ed=_0x5f22a1;return this[_0x4bd8ed(0x526)]()?this[_0x4bd8ed(0x250)]():_0x45b2fe[_0x4bd8ed(0x209)][_0x4bd8ed(0x545)]['call'](this);}}else ImageManager[_0x5f22a1(0x38e)](_0x2988ea[_0x5f22a1(0x56b)]());}},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x4c7)]=function(){const _0xb29da=_0x14a1da;return VisuMZ[_0xb29da(0x209)]['Settings'][_0xb29da(0x3d4)][_0xb29da(0x341)];},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x21e)]=function(){const _0x20febd=_0x14a1da;this[_0x20febd(0x516)]['clear'](),this[_0x20febd(0x539)][_0x20febd(0x254)]();if(this[_0x20febd(0x2a7)]){this[_0x20febd(0x2ad)](),this[_0x20febd(0x1f3)](!![]),this['prepareItemCustomData']();if(this[_0x20febd(0x2bd)]()){if(_0x20febd(0x2dc)===_0x20febd(0x2dc))this[_0x20febd(0x1f9)]();else{function _0x2e3087(){_0x1fa0dc=_0x520f25['armorTypes'][_0x5dbc7f(_0x16b1d5['$1'])]||'';}}}else{if(_0x20febd(0x4e2)===_0x20febd(0x5d4)){function _0x17ddd6(){const _0x32f02d=_0x20febd;this['isGoodShown'](_0x2650f6)?this[_0x32f02d(0x46f)]++:_0x2bf165[0x0]=-0x1;}}else this['drawItemData']();}}},Window_ShopStatus[_0x14a1da(0x1a8)]['drawPossession']=function(_0x28883e,_0x5476e){const _0x345495=_0x14a1da;if(!this[_0x345495(0x2bd)]()&&!DataManager[_0x345495(0x4ac)](this['_item']))return;const _0x14e83c=this[_0x345495(0x2f4)]-this[_0x345495(0x53c)]()-_0x28883e,_0x35237a=this[_0x345495(0x200)](_0x345495(0x37d));this[_0x345495(0x1ce)](ColorManager[_0x345495(0x1cc)]()),this[_0x345495(0x464)](TextManager[_0x345495(0x23d)],_0x28883e+this['itemPadding'](),_0x5476e,_0x14e83c-_0x35237a),this[_0x345495(0x21d)](),this['drawItemNumber'](this[_0x345495(0x2a7)],_0x28883e,_0x5476e,_0x14e83c);},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x5f2)]=function(_0x15f647,_0x2cbe35,_0xb0ec39,_0x32dfd1,_0x10abbc){const _0x16edd4=_0x14a1da;if(VisuMZ[_0x16edd4(0x209)][_0x16edd4(0x4ad)][_0x16edd4(0x3d4)]['DrawBackRect']===![])return;_0x10abbc=Math[_0x16edd4(0x489)](_0x10abbc||0x1,0x1);while(_0x10abbc--){_0x32dfd1=_0x32dfd1||this['lineHeight'](),this[_0x16edd4(0x539)]['paintOpacity']=0xa0;const _0x2c61b0=ColorManager[_0x16edd4(0x350)]();this[_0x16edd4(0x539)]['fillRect'](_0x15f647+0x1,_0x2cbe35+0x1,_0xb0ec39-0x2,_0x32dfd1-0x2,_0x2c61b0),this['contentsBack'][_0x16edd4(0x1cb)]=0xff;}},ColorManager[_0x14a1da(0x350)]=function(){const _0x2357d7=_0x14a1da,_0x2e2caa=VisuMZ[_0x2357d7(0x209)][_0x2357d7(0x4ad)]['StatusWindow'];let _0xabb8de=_0x2e2caa['BackRectColor']!==undefined?_0x2e2caa[_0x2357d7(0x263)]:0x13;return ColorManager[_0x2357d7(0x1fd)](_0xabb8de);},Window_ShopStatus['prototype'][_0x14a1da(0x1f9)]=function(){const _0x5ebeb3=_0x14a1da;if(VisuMZ['ItemsEquipsCore'][_0x5ebeb3(0x4ad)][_0x5ebeb3(0x3d4)][_0x5ebeb3(0x207)]){if(_0x5ebeb3(0x399)!=='qOHBT'){VisuMZ[_0x5ebeb3(0x209)][_0x5ebeb3(0x4ad)]['StatusWindow'][_0x5ebeb3(0x207)]['call'](this);return;}else{function _0x559739(){const _0x1c214b=_0x5ebeb3,_0x3a3af2=_0x63a5a0['makeDeepCopy'](this);_0x3a3af2[_0x1c214b(0x1d7)]=!![],_0x20da38[_0x1c214b(0x209)][_0x1c214b(0x2d9)]['call'](this,_0x5917a8),this[_0x1c214b(0x334)](_0x3a3af2);}}}const _0x4e5ed3=this['lineHeight'](),_0x189e05=this[_0x5ebeb3(0x3ae)]()+0x8;let _0x4dfc24=0x0,_0x553707=0x0,_0x3d23f2=this[_0x5ebeb3(0x2f4)],_0x11d8a3=this['innerHeight'],_0x3015ed=Math[_0x5ebeb3(0x4d0)](_0x3d23f2/0x2),_0x3557ea=_0x4dfc24+_0x3d23f2-_0x3015ed;this[_0x5ebeb3(0x60a)](this[_0x5ebeb3(0x2a7)],_0x4dfc24+this[_0x5ebeb3(0x53c)](),_0x553707,_0x3d23f2-this[_0x5ebeb3(0x53c)]()*0x2),this[_0x5ebeb3(0x5f2)](_0x4dfc24,_0x553707,_0x3d23f2),_0x553707+=_0x4e5ed3;if(this['drawItemEquipType'](_0x4dfc24,_0x553707,_0x3015ed))_0x553707+=0x0;if(this[_0x5ebeb3(0x2b0)](_0x3557ea,_0x553707,_0x3015ed))_0x553707+=_0x4e5ed3;const _0x311cb5=this[_0x5ebeb3(0x287)](),_0x3bb152=_0x553707;_0x553707=_0x11d8a3-_0x311cb5[_0x5ebeb3(0x2ab)]*_0x189e05-0x4;let _0x1dd744=_0x4dfc24,_0x3e57ad=0x0,_0x35a0d7=_0x553707;for(const _0x188abd of _0x311cb5){_0x3e57ad=Math[_0x5ebeb3(0x489)](this[_0x5ebeb3(0x50d)](_0x188abd,_0x4dfc24+0x4,_0x553707+0x4,_0x3d23f2),_0x3e57ad),_0x553707+=_0x189e05;}const _0x11c8e5=$gameParty[_0x5ebeb3(0x1fe)](),_0x403b38=Math[_0x5ebeb3(0x4d0)]((_0x3d23f2-_0x3e57ad)/_0x11c8e5);_0x3e57ad=_0x3d23f2-_0x403b38*_0x11c8e5;for(const _0xc78f81 of $gameParty[_0x5ebeb3(0x423)]()){const _0x594518=$gameParty[_0x5ebeb3(0x423)]()[_0x5ebeb3(0x36d)](_0xc78f81),_0x4f250a=_0x1dd744+_0x3e57ad+_0x594518*_0x403b38;this['changePaintOpacity'](_0xc78f81['canEquip'](this['_item'])),this[_0x5ebeb3(0x2ce)](_0xc78f81,_0x4f250a+_0x403b38/0x2,_0x35a0d7);let _0x3a03ec=_0x35a0d7;for(const _0x4cf00f of _0x311cb5){if(_0x5ebeb3(0x28a)!=='nXJEE'){function _0x54afc3(){const _0x170110=_0x5ebeb3,_0x78ff36=_0x170110(0x5e6);if(this[_0x170110(0x416)][_0x78ff36])return this[_0x170110(0x416)][_0x78ff36];let _0x1afe7b='';return _0x1afe7b+='%1'[_0x170110(0x27e)](this['_itemData']['gainTP']),_0x1afe7b;}}else{const _0x4bae8d=_0x3a03ec-(_0x4e5ed3-_0x189e05)/0x2;this[_0x5ebeb3(0x4dc)](_0xc78f81,_0x4cf00f,_0x4f250a,_0x4bae8d,_0x403b38),_0x3a03ec+=_0x189e05;}}}this[_0x5ebeb3(0x5f2)](_0x1dd744,_0x3bb152,_0x3e57ad,_0x35a0d7-_0x3bb152);for(let _0x571407=0x0;_0x571407<_0x11c8e5;_0x571407++){const _0x44e855=_0x1dd744+_0x3e57ad+_0x571407*_0x403b38;this[_0x5ebeb3(0x5f2)](_0x44e855,_0x3bb152,_0x403b38,_0x35a0d7-_0x3bb152);}for(const _0x5e6eb8 of _0x311cb5){this[_0x5ebeb3(0x5f2)](_0x1dd744,_0x35a0d7,_0x3e57ad,_0x189e05);for(let _0x17b985=0x0;_0x17b985<_0x11c8e5;_0x17b985++){if(_0x5ebeb3(0x293)!=='pvPcf'){const _0x5c2c73=_0x1dd744+_0x3e57ad+_0x17b985*_0x403b38;this[_0x5ebeb3(0x5f2)](_0x5c2c73,_0x35a0d7,_0x403b38,_0x189e05);}else{function _0x1fe545(){const _0x6acb24=_0x5ebeb3,_0x30c02a=this[_0x6acb24(0x1c1)]()?this[_0x6acb24(0x5ca)]():0x0,_0x3e07dd=this[_0x6acb24(0x538)](),_0x2885f1=_0x4148fd['boxWidth']-this[_0x6acb24(0x5ca)](),_0x2f077c=this[_0x6acb24(0x571)](0x1,!![]);return new _0x46a8dc(_0x30c02a,_0x3e07dd,_0x2885f1,_0x2f077c);}}}_0x35a0d7+=_0x189e05;}},Window_ShopStatus['prototype'][_0x14a1da(0x450)]=function(_0x5a7a6d,_0x22734f,_0x2444e7){const _0x57fd10=_0x14a1da;if(!this[_0x57fd10(0x2bd)]())return![];const _0x131baa=$dataSystem[_0x57fd10(0x60f)][this['_item'][_0x57fd10(0x308)]];return this[_0x57fd10(0x4cc)](_0x131baa,_0x5a7a6d,_0x22734f,_0x2444e7,!![]),this[_0x57fd10(0x5f2)](_0x5a7a6d,_0x22734f,_0x2444e7),this[_0x57fd10(0x2ad)](),!![];},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x2da)]=function(){const _0x39b076=_0x14a1da,_0x4bfe18=VisuMZ[_0x39b076(0x209)][_0x39b076(0x4ad)]['ItemScene'][_0x39b076(0x536)];return _0x4bfe18[_0x39b076(0x27e)]($gameParty['numItems'](this['_item']));},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x287)]=function(){const _0x210831=_0x14a1da;if(Imported[_0x210831(0x42d)]){if('rkmLL'!==_0x210831(0x3b2)){function _0x43f0ec(){const _0x493bd6=_0x210831;if(_0x24b854['versionId']()!==_0x5520b4[_0x493bd6(0x30a)])for(const _0x2791d6 of _0x6d8c72[_0x493bd6(0x295)]){if(_0x2791d6)_0x2791d6[_0x493bd6(0x5ad)]();}}}else return VisuMZ[_0x210831(0x53d)][_0x210831(0x4ad)][_0x210831(0x44a)][_0x210831(0x572)];}else return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x321)]=function(){const _0x3e9fb6=_0x14a1da;return VisuMZ[_0x3e9fb6(0x209)]['Settings']['StatusWindow'][_0x3e9fb6(0x438)];},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x50d)]=function(_0x2f98ac,_0x46f1f7,_0x38b9b0,_0x5c0c82){const _0x50b07b=_0x14a1da;this[_0x50b07b(0x2ad)](),this[_0x50b07b(0x516)][_0x50b07b(0x337)]=this[_0x50b07b(0x321)]();let _0x24a4ba=this[_0x50b07b(0x200)](TextManager[_0x50b07b(0x609)](_0x2f98ac))+0x4+_0x46f1f7;if(Imported[_0x50b07b(0x42d)]){if(_0x50b07b(0x39f)!=='QqLAM'){function _0x59be98(){const _0x1a9c3b=_0x50b07b;_0x270588[_0x1a9c3b(0x1a8)]['refresh']['call'](this),this[_0x1a9c3b(0x44b)]();}}else{this[_0x50b07b(0x573)](_0x46f1f7,_0x38b9b0,_0x5c0c82,_0x2f98ac,!![]);if(VisuMZ[_0x50b07b(0x53d)]['Settings'][_0x50b07b(0x44a)][_0x50b07b(0x1f4)]){if(_0x50b07b(0x1ca)!=='iZFWv')_0x24a4ba+=ImageManager[_0x50b07b(0x302)]+0x4;else{function _0x469792(){const _0xd0c6f=_0x50b07b;_0x21cfab=_0x1abee4[_0xd0c6f(0x232)];}}}}}else this[_0x50b07b(0x1ce)](ColorManager[_0x50b07b(0x1cc)]()),this['drawText'](TextManager[_0x50b07b(0x609)](_0x2f98ac),_0x46f1f7,_0x38b9b0,_0x5c0c82);return this[_0x50b07b(0x2ad)](),_0x24a4ba;},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x4dc)]=function(_0x2d8673,_0x471efe,_0x347e4c,_0x3231dd,_0x52f714){const _0x414f1c=_0x14a1da;_0x347e4c+=this[_0x414f1c(0x53c)](),_0x52f714-=this[_0x414f1c(0x53c)]()*0x2;const _0x3553b2=VisuMZ[_0x414f1c(0x209)][_0x414f1c(0x4ad)][_0x414f1c(0x3d4)];this[_0x414f1c(0x516)][_0x414f1c(0x337)]=_0x3553b2['ParamChangeFontSize'],this['changePaintOpacity'](_0x2d8673['canEquip'](this['_item']));if(_0x2d8673[_0x414f1c(0x3ab)](this[_0x414f1c(0x2a7)])){const _0x56e2f6=_0x3553b2[_0x414f1c(0x2a3)];this['drawText'](_0x56e2f6,_0x347e4c,_0x3231dd,_0x52f714,_0x414f1c(0x303));}else{if(_0x2d8673[_0x414f1c(0x614)](this['_item'])){const _0x3d96e3=JsonEx['makeDeepCopy'](_0x2d8673);_0x3d96e3[_0x414f1c(0x1d7)]=!![];const _0x477529=_0x3d96e3['equipSlots']()[_0x414f1c(0x36d)](this['_item'][_0x414f1c(0x308)]);if(_0x477529>=0x0)_0x3d96e3['forceChangeEquip'](_0x477529,this[_0x414f1c(0x2a7)]);let _0x2ab1b1=0x0,_0x12d32c=0x0,_0x1fe7bc=0x0;Imported['VisuMZ_0_CoreEngine']?(_0x2ab1b1=_0x3d96e3[_0x414f1c(0x35f)](_0x471efe),_0x12d32c=_0x2ab1b1-_0x2d8673[_0x414f1c(0x35f)](_0x471efe),this[_0x414f1c(0x1ce)](ColorManager['paramchangeTextColor'](_0x12d32c)),_0x1fe7bc=(_0x12d32c>=0x0?'+':'')+VisuMZ[_0x414f1c(0x346)](_0x12d32c,0x0,_0x471efe)):(_0x2ab1b1=_0x3d96e3[_0x414f1c(0x609)](_0x471efe),_0x12d32c=_0x2ab1b1-_0x2d8673['param'](_0x471efe),this[_0x414f1c(0x1ce)](ColorManager[_0x414f1c(0x284)](_0x12d32c)),_0x1fe7bc=(_0x12d32c>=0x0?'+':'')+_0x12d32c);if(_0x1fe7bc==='+0')_0x1fe7bc=_0x3553b2[_0x414f1c(0x574)];this[_0x414f1c(0x464)](_0x1fe7bc,_0x347e4c,_0x3231dd,_0x52f714,_0x414f1c(0x303));}else{if(_0x414f1c(0x4c0)!==_0x414f1c(0x4c0)){function _0x455ddc(){const _0x3b3b1b=_0x414f1c,_0x263ea5=this[_0x3b3b1b(0x3be)],_0x186c3f=_0x5c41de[_0x3b3b1b(0x524)](),_0x3aeb3c=_0x4ad8a3['x']+_0x4cbca4[_0x3b3b1b(0x4d0)](_0x2767d6[_0x3b3b1b(0x379)]/0x2)+_0x186c3f;_0x263ea5['x']=_0x263ea5[_0x3b3b1b(0x379)]/-0x2+_0x3aeb3c,_0x263ea5['y']=_0x56f5d5['floor'](_0xd0ba46['height']/0x2);}}else{const _0x584ee7=_0x3553b2[_0x414f1c(0x2a9)];this[_0x414f1c(0x464)](_0x584ee7,_0x347e4c,_0x3231dd,_0x52f714,_0x414f1c(0x303));}}}this[_0x414f1c(0x2ad)](),this['changePaintOpacity'](!![]);},Window_ShopStatus['prototype']['drawItemData']=function(){const _0x1c2949=_0x14a1da;VisuMZ[_0x1c2949(0x209)][_0x1c2949(0x4ad)][_0x1c2949(0x3d4)][_0x1c2949(0x439)][_0x1c2949(0x593)](this);},Window_ShopStatus[_0x14a1da(0x1a8)]['prepareItemCustomData']=function(){const _0x30ac93=_0x14a1da;this[_0x30ac93(0x416)]={};if(!this[_0x30ac93(0x2a7)])return;const _0xfa1924=this[_0x30ac93(0x2a7)][_0x30ac93(0x214)];if(_0xfa1924[_0x30ac93(0x2fb)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){if(_0x30ac93(0x3c0)===_0x30ac93(0x425)){function _0xcf9332(){const _0x15eee0=_0x30ac93;this[_0x15eee0(0x563)]!==_0x54712b&&(this[_0x15eee0(0x563)]=_0x180d7e,this[_0x15eee0(0x21e)](),this[_0x15eee0(0x1bd)]&&this[_0x15eee0(0x1bd)][_0x15eee0(0x50c)]()?this[_0x15eee0(0x3b0)](0x0):this[_0x15eee0(0x4a3)](0x0,0x0));}}else{const _0x3ed7ec=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x44541f of _0x3ed7ec){if(_0x44541f[_0x30ac93(0x2fb)](/(.*):[ ](.*)/i)){if(_0x30ac93(0x4a2)===_0x30ac93(0x4a2)){const _0x29277e=String(RegExp['$1'])['toUpperCase']()[_0x30ac93(0x597)](),_0x377edf=String(RegExp['$2'])[_0x30ac93(0x597)]();this['_customItemInfo'][_0x29277e]=_0x377edf;}else{function _0xef4451(){const _0x530f00=_0x30ac93;_0x8ac73e[_0x530f00(0x1a8)][_0x530f00(0x555)][_0x530f00(0x593)](this,_0x498706,_0x462906,_0x50ea6b,_0x59530e);}}}}}}},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x27b)]=function(){const _0x3b85da=_0x14a1da;return Math[_0x3b85da(0x489)](0x1,$gameSystem[_0x3b85da(0x55a)]()-0x4);},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x2ad)]=function(){const _0x3063e8=_0x14a1da;Window_StatusBase[_0x3063e8(0x1a8)]['resetFontSettings'][_0x3063e8(0x593)](this),this[_0x3063e8(0x516)][_0x3063e8(0x337)]=this[_0x3063e8(0x50b)]||this[_0x3063e8(0x516)][_0x3063e8(0x337)],this[_0x3063e8(0x516)][_0x3063e8(0x5d9)]=this[_0x3063e8(0x5ff)]||this['contents'][_0x3063e8(0x5d9)];},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x4a5)]=function(){return this['contents']['fontSize']/$gameSystem['mainFontSize']();},Window_ShopStatus[_0x14a1da(0x1a8)]['drawIcon']=function(_0x4ce132,_0x222dce,_0x5b097a){const _0x423d88=_0x14a1da,_0x44cfe8=ImageManager[_0x423d88(0x5bb)](_0x423d88(0x59b)),_0x5cc93d=ImageManager[_0x423d88(0x302)],_0x2c85b2=ImageManager['iconHeight'],_0x5ee55f=_0x4ce132%0x10*_0x5cc93d,_0x3fbaf5=Math[_0x423d88(0x4d0)](_0x4ce132/0x10)*_0x2c85b2,_0xcf65be=Math[_0x423d88(0x257)](_0x5cc93d*this[_0x423d88(0x4a5)]()),_0x1cf1e9=Math['ceil'](_0x2c85b2*this['fontSizeRatio']());this[_0x423d88(0x516)]['blt'](_0x44cfe8,_0x5ee55f,_0x3fbaf5,_0x5cc93d,_0x2c85b2,_0x222dce,_0x5b097a,_0xcf65be,_0x1cf1e9);},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x4b9)]=function(_0x5573f8,_0x22dbf5){const _0x1e79a6=_0x14a1da;if(_0x22dbf5['drawing']){if(_0x1e79a6(0x2ff)===_0x1e79a6(0x1cf)){function _0x544b4a(){const _0x581973=_0x1e79a6;return this[_0x581973(0x24c)]();}}else this[_0x1e79a6(0x203)](_0x5573f8,_0x22dbf5['x'],_0x22dbf5['y']+0x2);}_0x22dbf5['x']+=Math[_0x1e79a6(0x257)](ImageManager[_0x1e79a6(0x302)]*this[_0x1e79a6(0x4a5)]());if(this[_0x1e79a6(0x4a5)]()===0x1)_0x22dbf5['x']+=0x4;},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x4cc)]=function(_0x43b0f3,_0x4070f8,_0x242c09,_0x139e6d,_0x13a582,_0x42415b){const _0xf81474=_0x14a1da;_0x43b0f3=_0x43b0f3||'',_0x42415b=_0x42415b||_0xf81474(0x473),this[_0xf81474(0x50b)]=this[_0xf81474(0x27b)](),this[_0xf81474(0x5ff)]=_0x13a582?ColorManager[_0xf81474(0x1cc)]():this[_0xf81474(0x516)][_0xf81474(0x5d9)],_0x4070f8+=this[_0xf81474(0x53c)](),_0x139e6d-=this[_0xf81474(0x53c)]()*0x2;const _0x57b9b3=this[_0xf81474(0x2c8)](_0x43b0f3);if(_0x42415b===_0xf81474(0x303)){if(_0xf81474(0x1b1)!==_0xf81474(0x285))_0x4070f8=_0x4070f8+Math[_0xf81474(0x4d0)]((_0x139e6d-_0x57b9b3[_0xf81474(0x379)])/0x2);else{function _0x2b8dc1(){this['select'](_0x3eb8ed);}}}else _0x42415b==='right'&&(_0x4070f8=_0x4070f8+_0x139e6d-_0x57b9b3[_0xf81474(0x379)]);_0x242c09+=(this[_0xf81474(0x5df)]()-_0x57b9b3[_0xf81474(0x4e3)])/0x2,this[_0xf81474(0x3bf)](_0x43b0f3,_0x4070f8,_0x242c09,_0x139e6d),this[_0xf81474(0x50b)]=undefined,this[_0xf81474(0x5ff)]=undefined,this[_0xf81474(0x2ad)]();},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x33e)]=function(_0x26aae9,_0xfd7bf7,_0x109115){const _0x341562=_0x14a1da;if(!DataManager['isItem'](this[_0x341562(0x2a7)]))return![];const _0x37c769=this[_0x341562(0x3e8)]();this[_0x341562(0x4cc)](_0x37c769,_0x26aae9,_0xfd7bf7,_0x109115,!![]);const _0x2e9c80=this['getItemConsumableText']();return this[_0x341562(0x4cc)](_0x2e9c80,_0x26aae9,_0xfd7bf7,_0x109115,![],_0x341562(0x547)),this[_0x341562(0x5f2)](_0x26aae9,_0xfd7bf7,_0x109115),this[_0x341562(0x2ad)](),!![];},Window_ShopStatus['prototype'][_0x14a1da(0x3e8)]=function(){const _0x12ae7d=_0x14a1da;return VisuMZ[_0x12ae7d(0x209)]['Settings'][_0x12ae7d(0x3d4)][_0x12ae7d(0x256)];},Window_ShopStatus[_0x14a1da(0x1a8)]['getItemConsumableText']=function(){const _0x3c2de5=_0x14a1da,_0x4bc1b1=_0x3c2de5(0x4d5);if(this[_0x3c2de5(0x416)][_0x4bc1b1])return this[_0x3c2de5(0x416)][_0x4bc1b1];if(this[_0x3c2de5(0x551)]()){if('PPhTX'===_0x3c2de5(0x594))return VisuMZ[_0x3c2de5(0x209)][_0x3c2de5(0x4ad)][_0x3c2de5(0x3d4)]['Consumable'];else{function _0x3c5295(){const _0x1c5760=_0x3c2de5,_0x37dbb0=_0x1c5760(0x4d5);if(this[_0x1c5760(0x416)][_0x37dbb0])return this['_customItemInfo'][_0x37dbb0];return this['canConsumeItem']()?_0x1b8e63[_0x1c5760(0x209)][_0x1c5760(0x4ad)]['StatusWindow'][_0x1c5760(0x447)]:_0x5066e4[_0x1c5760(0x209)][_0x1c5760(0x4ad)][_0x1c5760(0x3d4)][_0x1c5760(0x2a8)];}}}else return VisuMZ[_0x3c2de5(0x209)][_0x3c2de5(0x4ad)]['StatusWindow']['NotConsumable'];},Window_ShopStatus['prototype']['canConsumeItem']=function(){const _0x441866=_0x14a1da;return VisuMZ[_0x441866(0x53d)]&&VisuMZ[_0x441866(0x53d)][_0x441866(0x4ad)][_0x441866(0x474)][_0x441866(0x478)]&&DataManager['isKeyItem'](this['_item'])?![]:this['_item'][_0x441866(0x5f1)];},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x2b0)]=function(_0x47bbef,_0x400507,_0x5a5649){const _0x37c381=_0x14a1da;if(!this[_0x37c381(0x2bd)]()&&!DataManager[_0x37c381(0x4ac)](this[_0x37c381(0x2a7)]))return![];if(DataManager['isKeyItem'](this[_0x37c381(0x2a7)])&&!$dataSystem[_0x37c381(0x534)]){if(_0x37c381(0x4c8)==='JseRf'){function _0x1ddd72(){const _0x43f7f5=_0x37c381;this[_0x43f7f5(0x46f)]++;}}else{const _0x2ae4fb=TextManager[_0x37c381(0x1d5)];this[_0x37c381(0x4cc)](_0x2ae4fb,_0x47bbef,_0x400507,_0x5a5649,!![],_0x37c381(0x303));}}else{const _0x29c295=TextManager[_0x37c381(0x23d)];this[_0x37c381(0x4cc)](_0x29c295,_0x47bbef,_0x400507,_0x5a5649,!![]);const _0x27a305=this[_0x37c381(0x2da)]();this['drawItemKeyData'](_0x27a305,_0x47bbef,_0x400507,_0x5a5649,![],_0x37c381(0x547));}return this[_0x37c381(0x5f2)](_0x47bbef,_0x400507,_0x5a5649),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x14a1da(0x1a8)]['getItemQuantityText']=function(){const _0x315ce3=_0x14a1da,_0xf000b9='QUANTITY';if(this[_0x315ce3(0x416)][_0xf000b9])return this['_customItemInfo'][_0xf000b9];const _0x1a0597=VisuMZ[_0x315ce3(0x209)][_0x315ce3(0x4ad)][_0x315ce3(0x5da)][_0x315ce3(0x536)];return _0x1a0597[_0x315ce3(0x27e)]($gameParty[_0x315ce3(0x617)](this[_0x315ce3(0x2a7)]));},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x2d6)]=function(_0x55facf,_0x5342cc,_0x307958){const _0x13686f=_0x14a1da,_0x32e9a2=this['getItemOccasionText']();return this[_0x13686f(0x4cc)](_0x32e9a2,_0x55facf,_0x5342cc,_0x307958,![],_0x13686f(0x303)),this[_0x13686f(0x5f2)](_0x55facf,_0x5342cc,_0x307958),this[_0x13686f(0x2ad)](),!![];},Window_ShopStatus['prototype'][_0x14a1da(0x5bf)]=function(){const _0x3c19c4=_0x14a1da,_0x5241bd=_0x3c19c4(0x4e6);if(this['_customItemInfo'][_0x5241bd])return this[_0x3c19c4(0x416)][_0x5241bd];const _0x41fe98=VisuMZ[_0x3c19c4(0x209)]['Settings'][_0x3c19c4(0x3d4)],_0x3db7c9=_0x3c19c4(0x26d)['format'](this[_0x3c19c4(0x2a7)][_0x3c19c4(0x225)]);return _0x41fe98[_0x3db7c9];},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x1e4)]=function(_0x389a1f,_0x2a8acf,_0x1c86d0){const _0x5813ce=_0x14a1da,_0x204dbd=this[_0x5813ce(0x48d)]();return this[_0x5813ce(0x4cc)](_0x204dbd,_0x389a1f,_0x2a8acf,_0x1c86d0,![],_0x5813ce(0x303)),this[_0x5813ce(0x5f2)](_0x389a1f,_0x2a8acf,_0x1c86d0),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x48d)]=function(){const _0x2002dc=_0x14a1da,_0x2dd5c2=_0x2002dc(0x3bc);if(this[_0x2002dc(0x416)][_0x2dd5c2])return this[_0x2002dc(0x416)][_0x2dd5c2];const _0x18860b=VisuMZ[_0x2002dc(0x209)][_0x2002dc(0x4ad)][_0x2002dc(0x3d4)];if(Imported[_0x2002dc(0x5b2)]){const _0x499b7c=this[_0x2002dc(0x2a7)]['note'];if(_0x499b7c[_0x2002dc(0x2fb)](/<TARGET:[ ](.*)>/i)){const _0x424bac=String(RegExp['$1']);if(_0x424bac[_0x2002dc(0x2fb)](/(\d+) RANDOM ANY/i)){if(_0x2002dc(0x2e9)==='hxoYn'){function _0x7eccef(){const _0x1adc0a=_0x2002dc;return _0x2faad2[_0x1adc0a(0x42d)]?_0x4e951d['CoreEngine'][_0x1adc0a(0x4ad)]['Param'][_0x1adc0a(0x572)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];}}else return _0x18860b[_0x2002dc(0x49e)][_0x2002dc(0x27e)](Number(RegExp['$1']));}else{if(_0x424bac['match'](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i))return _0x18860b[_0x2002dc(0x4f1)][_0x2002dc(0x27e)](Number(RegExp['$1']));else{if(_0x424bac[_0x2002dc(0x2fb)](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i))return _0x18860b['ScopeRandomAllies'][_0x2002dc(0x27e)](Number(RegExp['$1']));else{if(_0x424bac[_0x2002dc(0x2fb)](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i)){if('mKsYP'==='mKsYP')return _0x18860b[_0x2002dc(0x343)];else{function _0xbfe010(){const _0x350ff9=_0x2002dc;_0x103f2e[_0x350ff9(0x4d2)](0x0),_0x51f76c[_0x350ff9(0x4d2)](-0x1),this[_0x350ff9(0x491)]=_0x48e529,this['refresh'](),this[_0x350ff9(0x249)]();}}}}}}}}const _0x3bbd2f=_0x2002dc(0x354)[_0x2002dc(0x27e)](this[_0x2002dc(0x2a7)]['scope']);return _0x18860b[_0x3bbd2f];},Window_ShopStatus[_0x14a1da(0x1a8)]['drawItemSpeed']=function(_0x29f2ee,_0x41515f,_0x4b1422){const _0x136106=_0x14a1da,_0x302b58=this[_0x136106(0x33d)]();this[_0x136106(0x4cc)](_0x302b58,_0x29f2ee,_0x41515f,_0x4b1422,!![]);const _0x10f9e9=this[_0x136106(0x272)]();return this[_0x136106(0x4cc)](_0x10f9e9,_0x29f2ee,_0x41515f,_0x4b1422,![],_0x136106(0x547)),this['drawItemDarkRect'](_0x29f2ee,_0x41515f,_0x4b1422),this[_0x136106(0x2ad)](),!![];},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x33d)]=function(){const _0xe00fed=_0x14a1da;return VisuMZ[_0xe00fed(0x209)]['Settings'][_0xe00fed(0x3d4)]['LabelSpeed'];},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x272)]=function(){const _0x35b999=_0x14a1da,_0x245649='SPEED';if(this['_customItemInfo'][_0x245649])return this[_0x35b999(0x416)][_0x245649];const _0x3abf8d=this[_0x35b999(0x2a7)][_0x35b999(0x619)];if(_0x3abf8d>=0x7d0)return VisuMZ[_0x35b999(0x209)][_0x35b999(0x4ad)][_0x35b999(0x3d4)][_0x35b999(0x57b)];else{if(_0x3abf8d>=0x3e8){if(_0x35b999(0x3aa)===_0x35b999(0x3aa))return VisuMZ[_0x35b999(0x209)][_0x35b999(0x4ad)][_0x35b999(0x3d4)][_0x35b999(0x2ee)];else{function _0x231f9f(){const _0x1a9bae=_0x35b999,_0x2e0ce3=this['itemAt'](_0xa2c968);if(!_0x2e0ce3||!this[_0x1a9bae(0x390)]())return;if(!_0x2c2943[_0x1a9bae(0x553)](_0x2e0ce3))return;const _0x32b7d8=this['itemLineRect'](_0x50abe1),_0x519236=_0x32b7d8['x'],_0x561373=_0x32b7d8['y']+(this['lineHeight']()-_0x3af687['iconHeight'])/0x2,_0x180a6e=_0x26812f[_0x1a9bae(0x209)][_0x1a9bae(0x4ad)][_0x1a9bae(0x2c5)]['OffsetX'],_0x30a506=_0x67db4e[_0x1a9bae(0x209)][_0x1a9bae(0x4ad)][_0x1a9bae(0x2c5)][_0x1a9bae(0x361)];this[_0x1a9bae(0x506)](_0x2e0ce3,_0x519236+_0x180a6e,_0x561373+_0x30a506);}}}else{if(_0x3abf8d>0x0)return VisuMZ['ItemsEquipsCore'][_0x35b999(0x4ad)][_0x35b999(0x3d4)][_0x35b999(0x274)];else{if(_0x3abf8d===0x0)return VisuMZ['ItemsEquipsCore'][_0x35b999(0x4ad)][_0x35b999(0x3d4)][_0x35b999(0x502)];else{if(_0x3abf8d>-0x3e8){if(_0x35b999(0x57a)!=='vpZZB'){function _0xcf52ad(){const _0x3038f0=_0x35b999;if(_0x346805['match'](/(.*):[ ](.*)/i)){const _0xbbe791=_0x1dc927(_0x3539c2['$1'])[_0x3038f0(0x437)]()['trim'](),_0x424b62=_0x4ddc49(_0x1bdf47['$2'])['trim']();this['_customItemInfo'][_0xbbe791]=_0x424b62;}}}else return VisuMZ[_0x35b999(0x209)][_0x35b999(0x4ad)][_0x35b999(0x3d4)][_0x35b999(0x415)];}else{if(_0x3abf8d>-0x7d0){if('cgSRl'!=='bKAhN')return VisuMZ[_0x35b999(0x209)][_0x35b999(0x4ad)]['StatusWindow'][_0x35b999(0x290)];else{function _0x2484ff(){const _0x399439=_0x35b999;_0x50e961[_0x399439(0x209)][_0x399439(0x52b)]['call'](this),this[_0x399439(0x526)]()&&this[_0x399439(0x49d)](),this[_0x399439(0x50c)]()&&(this['_categoryWindow'][_0x399439(0x3b0)](0x0),this[_0x399439(0x2f7)]());}}}else return _0x3abf8d<=-0x7d0?VisuMZ[_0x35b999(0x209)][_0x35b999(0x4ad)][_0x35b999(0x3d4)][_0x35b999(0x580)]:_0x35b999(0x1ac);}}}}}},Window_ShopStatus['prototype'][_0x14a1da(0x5fb)]=function(_0x44d777,_0x5cfca2,_0x481915){const _0x561120=_0x14a1da,_0x2d4446=this['getItemSuccessRateLabel']();this[_0x561120(0x4cc)](_0x2d4446,_0x44d777,_0x5cfca2,_0x481915,!![]);const _0x269590=this[_0x561120(0x2ef)]();return this[_0x561120(0x4cc)](_0x269590,_0x44d777,_0x5cfca2,_0x481915,![],_0x561120(0x547)),this['drawItemDarkRect'](_0x44d777,_0x5cfca2,_0x481915),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype']['getItemSuccessRateLabel']=function(){const _0x1ab29e=_0x14a1da;return VisuMZ[_0x1ab29e(0x209)][_0x1ab29e(0x4ad)][_0x1ab29e(0x3d4)][_0x1ab29e(0x2b3)];},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x2ef)]=function(){const _0x41e03d=_0x14a1da,_0x255d73=_0x41e03d(0x494);if(this[_0x41e03d(0x416)][_0x255d73])return this[_0x41e03d(0x416)][_0x255d73];if(Imported[_0x41e03d(0x5b2)]){if(_0x41e03d(0x220)!==_0x41e03d(0x488)){const _0x48af66=this[_0x41e03d(0x2a7)][_0x41e03d(0x214)];if(_0x48af66[_0x41e03d(0x2fb)](/<ALWAYS HIT>/i))return _0x41e03d(0x3e9);else{if(_0x48af66[_0x41e03d(0x2fb)](/<ALWAYS HIT RATE: (\d+)([%％])>/i)){if(_0x41e03d(0x299)!=='VyLae'){function _0x39d47f(){const _0x1e6bae=_0x41e03d;return _0xc60a20[_0x1e6bae(0x209)][_0x1e6bae(0x4ad)][_0x1e6bae(0x3d4)][_0x1e6bae(0x51b)];}}else return _0x41e03d(0x613)['format'](Number(RegExp['$1']));}}}else{function _0xe5e718(){const _0x246722=_0x41e03d;this[_0x246722(0x1c2)]();}}}return'%1%'[_0x41e03d(0x27e)](this[_0x41e03d(0x2a7)][_0x41e03d(0x5d3)]);},Window_ShopStatus['prototype'][_0x14a1da(0x443)]=function(_0x4dd646,_0xdbcb3,_0x1a0794){const _0x42f5d6=_0x14a1da,_0x39e638=this[_0x42f5d6(0x1ba)]();this[_0x42f5d6(0x4cc)](_0x39e638,_0x4dd646,_0xdbcb3,_0x1a0794,!![]);const _0x2ed6bd=this[_0x42f5d6(0x1b8)]();return this[_0x42f5d6(0x4cc)](_0x2ed6bd,_0x4dd646,_0xdbcb3,_0x1a0794,![],_0x42f5d6(0x547)),this[_0x42f5d6(0x5f2)](_0x4dd646,_0xdbcb3,_0x1a0794),this[_0x42f5d6(0x2ad)](),!![];},Window_ShopStatus['prototype'][_0x14a1da(0x1ba)]=function(){const _0x27f520=_0x14a1da;return VisuMZ[_0x27f520(0x209)]['Settings'][_0x27f520(0x3d4)][_0x27f520(0x522)];},Window_ShopStatus['prototype'][_0x14a1da(0x1b8)]=function(){const _0x38edb9=_0x14a1da,_0xedee75=_0x38edb9(0x1de);if(this['_customItemInfo'][_0xedee75])return this[_0x38edb9(0x416)][_0xedee75];const _0x1c268c=_0x38edb9(0x2a1);return _0x1c268c[_0x38edb9(0x27e)](this[_0x38edb9(0x2a7)][_0x38edb9(0x60e)]);},Window_ShopStatus['prototype'][_0x14a1da(0x5e7)]=function(_0xd3f4a,_0x37fbd2,_0x59169f){const _0x3b920c=_0x14a1da,_0x1a0576=this[_0x3b920c(0x4ab)]();this[_0x3b920c(0x4cc)](_0x1a0576,_0xd3f4a,_0x37fbd2,_0x59169f,!![]);const _0x3038a0=this[_0x3b920c(0x2de)]();return this[_0x3b920c(0x4cc)](_0x3038a0,_0xd3f4a,_0x37fbd2,_0x59169f,![],_0x3b920c(0x547)),this[_0x3b920c(0x5f2)](_0xd3f4a,_0x37fbd2,_0x59169f),this[_0x3b920c(0x2ad)](),!![];},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x4ab)]=function(){const _0x975f8e=_0x14a1da;return VisuMZ[_0x975f8e(0x209)][_0x975f8e(0x4ad)][_0x975f8e(0x3d4)][_0x975f8e(0x236)];},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x2de)]=function(){const _0xc60e09=_0x14a1da,_0x301f06='HIT\x20TYPE';if(this[_0xc60e09(0x416)][_0x301f06])return this[_0xc60e09(0x416)][_0x301f06];const _0x537276=VisuMZ['ItemsEquipsCore'][_0xc60e09(0x4ad)][_0xc60e09(0x3d4)],_0x4cf67b=_0xc60e09(0x5bd)[_0xc60e09(0x27e)](this[_0xc60e09(0x2a7)][_0xc60e09(0x5e9)]);return _0x537276[_0x4cf67b];},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x599)]=function(_0x56fcce,_0x26a4ca,_0x3e9937){const _0x3df4f6=_0x14a1da;if(this[_0x3df4f6(0x2a7)]['damage']['type']<=0x0)return _0x26a4ca;if(this[_0x3df4f6(0x283)](_0x56fcce,_0x26a4ca,_0x3e9937))_0x26a4ca+=this['lineHeight']();if(this[_0x3df4f6(0x422)](_0x56fcce,_0x26a4ca,_0x3e9937))_0x26a4ca+=this[_0x3df4f6(0x5df)]();return this[_0x3df4f6(0x2ad)](),_0x26a4ca;},Window_ShopStatus[_0x14a1da(0x1a8)]['drawItemDamageElement']=function(_0x2bf172,_0x20eb98,_0x5a0140){const _0xfe0e04=_0x14a1da,_0x12dfd8=this[_0xfe0e04(0x45b)]();this['drawItemKeyData'](_0x12dfd8,_0x2bf172,_0x20eb98,_0x5a0140,!![]);const _0x8a71b7=this[_0xfe0e04(0x218)]();return this[_0xfe0e04(0x4cc)](_0x8a71b7,_0x2bf172,_0x20eb98,_0x5a0140,![],'right'),this[_0xfe0e04(0x5f2)](_0x2bf172,_0x20eb98,_0x5a0140),this[_0xfe0e04(0x2ad)](),!![];},Window_ShopStatus['prototype'][_0x14a1da(0x45b)]=function(){const _0x5620aa=_0x14a1da;return VisuMZ[_0x5620aa(0x209)]['Settings'][_0x5620aa(0x3d4)][_0x5620aa(0x291)];},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x218)]=function(){const _0x114cdb=_0x14a1da,_0xd8eda7=_0x114cdb(0x224);if(this[_0x114cdb(0x416)][_0xd8eda7])return this[_0x114cdb(0x416)][_0xd8eda7];if(this[_0x114cdb(0x2a7)][_0x114cdb(0x36a)][_0x114cdb(0x3b7)]<=-0x1)return VisuMZ['ItemsEquipsCore'][_0x114cdb(0x4ad)]['StatusWindow']['ElementWeapon'];else{if(this['_item']['damage'][_0x114cdb(0x3b7)]===0x0){if(_0x114cdb(0x2f8)===_0x114cdb(0x5e1)){function _0x439d60(){const _0xdd9107=_0x114cdb,_0x54a513=_0x244711[_0xdd9107(0x33b)],_0x2e238f=[_0x24f07d,_0x5cebf0];return _0x2e238f[_0xdd9107(0x243)](_0x54a513[_0xdd9107(0x38d)]);}}else return VisuMZ['ItemsEquipsCore'][_0x114cdb(0x4ad)][_0x114cdb(0x3d4)][_0x114cdb(0x4b0)];}else{if(_0x114cdb(0x448)===_0x114cdb(0x223)){function _0x420934(){const _0x434f66=_0x114cdb;_0x120df3[_0x434f66(0x1a8)]['processCursorMove'][_0x434f66(0x593)](this),this[_0x434f66(0x5d2)]();}}else return $dataSystem[_0x114cdb(0x52a)][this[_0x114cdb(0x2a7)]['damage']['elementId']];}}},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x422)]=function(_0x584d1e,_0x10a537,_0x28cd26){const _0x1d2a6f=_0x14a1da,_0x1ceaea=this[_0x1d2a6f(0x3c6)]();this[_0x1d2a6f(0x4cc)](_0x1ceaea,_0x584d1e,_0x10a537,_0x28cd26,!![]),this[_0x1d2a6f(0x50a)]();const _0x45ff78=this[_0x1d2a6f(0x5a6)](),_0x378c49=ColorManager['damageColor']([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0x1d2a6f(0x2a7)][_0x1d2a6f(0x36a)][_0x1d2a6f(0x32d)]]);return this[_0x1d2a6f(0x1ce)](_0x378c49),this['drawItemKeyData'](_0x45ff78,_0x584d1e,_0x10a537,_0x28cd26,![],_0x1d2a6f(0x547)),this['drawItemDarkRect'](_0x584d1e,_0x10a537,_0x28cd26),this[_0x1d2a6f(0x2ad)](),!![];},Window_ShopStatus['prototype']['getItemDamageAmountLabel']=function(){const _0x219d7c=_0x14a1da;return Imported['VisuMZ_1_BattleCore']&&DataManager['getDamageStyle'](this[_0x219d7c(0x2a7)])!=='MANUAL'?this['getItemDamageAmountLabelBattleCore']():this[_0x219d7c(0x1f7)]();},Window_ShopStatus['prototype'][_0x14a1da(0x1f7)]=function(){const _0x537313=_0x14a1da,_0x55c168=VisuMZ[_0x537313(0x209)]['Settings'][_0x537313(0x3d4)],_0x16299c=_0x537313(0x208)['format'](this[_0x537313(0x2a7)][_0x537313(0x36a)][_0x537313(0x32d)]),_0x143ab7=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x537313(0x2a7)][_0x537313(0x36a)][_0x537313(0x32d)]];return _0x55c168[_0x16299c]['format'](_0x143ab7);},Window_ShopStatus[_0x14a1da(0x1a8)]['setupItemDamageTempActors']=function(){const _0x19b2d1=_0x14a1da,_0x525c41=$gameActors[_0x19b2d1(0x57d)](0x1);this[_0x19b2d1(0x5d6)]=JsonEx[_0x19b2d1(0x4e7)](_0x525c41),this[_0x19b2d1(0x1df)]=JsonEx[_0x19b2d1(0x4e7)](_0x525c41);},Window_ShopStatus[_0x14a1da(0x1a8)]['getItemDamageAmountText']=function(){const _0x2591ad=_0x14a1da,_0x274364=_0x2591ad(0x44c);if(this[_0x2591ad(0x416)][_0x274364])return this[_0x2591ad(0x416)][_0x274364];if(Imported[_0x2591ad(0x5b2)]&&DataManager[_0x2591ad(0x441)](this[_0x2591ad(0x2a7)])!=='MANUAL'){if(_0x2591ad(0x504)!==_0x2591ad(0x504)){function _0x28a16c(){const _0x46c7c6=_0x2591ad;if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x46c7c6(0x590)]();else{const _0x2c0e1e=_0x3742a8[_0x46c7c6(0x209)]['Scene_Item_itemWindowRect'][_0x46c7c6(0x593)](this);return this[_0x46c7c6(0x27f)]()&&this[_0x46c7c6(0x3df)]()&&(_0x2c0e1e['width']-=this[_0x46c7c6(0x21f)]()),_0x2c0e1e;}}}else return this[_0x2591ad(0x421)]();}else return this[_0x2591ad(0x4ce)]();},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x4ce)]=function(){const _0x149d52=_0x14a1da;window['a']=this['_tempActorA'],window['b']=this[_0x149d52(0x1df)],this[_0x149d52(0x5d6)][_0x149d52(0x1b3)](!![]),this[_0x149d52(0x1df)][_0x149d52(0x1b3)]([0x3,0x4][_0x149d52(0x243)](this['_item']['damage']['type']));let _0x4f0c71=this[_0x149d52(0x2a7)]['damage'][_0x149d52(0x557)];try{const _0x3155bf=Math[_0x149d52(0x489)](eval(_0x4f0c71),0x0)/window['a'][_0x149d52(0x398)];return this[_0x149d52(0x1bc)](),isNaN(_0x3155bf)?'?????':_0x149d52(0x613)[_0x149d52(0x27e)](Math['round'](_0x3155bf*0x64));}catch(_0x5d42ac){return $gameTemp[_0x149d52(0x5f5)]()&&(console[_0x149d52(0x20e)]('Damage\x20Formula\x20Error\x20for\x20%1'[_0x149d52(0x27e)](this[_0x149d52(0x2a7)][_0x149d52(0x3e0)])),console[_0x149d52(0x20e)](_0x5d42ac)),this[_0x149d52(0x1bc)](),_0x149d52(0x1ac);}},Window_ShopStatus['prototype'][_0x14a1da(0x1bc)]=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x1d0)]=function(_0x96a573,_0x77b461,_0x15438f){const _0x510e66=_0x14a1da;if(!this['makeItemData']())return _0x77b461;if(this[_0x510e66(0x487)](_0x96a573,_0x77b461,_0x15438f))_0x77b461+=this['lineHeight']();if(this[_0x510e66(0x23e)](_0x96a573,_0x77b461,_0x15438f))_0x77b461+=this[_0x510e66(0x5df)]();if(this['drawItemEffectsTpRecovery'](_0x96a573,_0x77b461,_0x15438f))_0x77b461+=this[_0x510e66(0x5df)]();if(this['drawItemEffectsHpDamage'](_0x96a573,_0x77b461,_0x15438f))_0x77b461+=this['lineHeight']();if(this[_0x510e66(0x339)](_0x96a573,_0x77b461,_0x15438f))_0x77b461+=this[_0x510e66(0x5df)]();if(this['drawItemEffectsTpDamage'](_0x96a573,_0x77b461,_0x15438f))_0x77b461+=this[_0x510e66(0x5df)]();if(this[_0x510e66(0x229)](_0x96a573,_0x77b461,_0x15438f))_0x77b461+=this[_0x510e66(0x5df)]();if(this['drawItemEffectsAddedStatesBuffs'](_0x96a573,_0x77b461,_0x15438f))_0x77b461+=this[_0x510e66(0x5df)]();if(this[_0x510e66(0x5ee)](_0x96a573,_0x77b461,_0x15438f))_0x77b461+=this['lineHeight']();return this['resetFontSettings'](),_0x77b461;},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x5f7)]=function(){const _0x2388d6=_0x14a1da;let _0x86f430=![];this[_0x2388d6(0x217)]={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};for(const _0x523fa7 of this['_item'][_0x2388d6(0x34c)]){if(_0x2388d6(0x5fd)!==_0x2388d6(0x566))switch(_0x523fa7[_0x2388d6(0x29b)]){case Game_Action[_0x2388d6(0x259)]:this[_0x2388d6(0x217)][_0x2388d6(0x509)]+=_0x523fa7[_0x2388d6(0x276)],this['_itemData'][_0x2388d6(0x45a)]+=_0x523fa7[_0x2388d6(0x4f0)],_0x86f430=!![];break;case Game_Action[_0x2388d6(0x4d4)]:this[_0x2388d6(0x217)][_0x2388d6(0x59e)]+=_0x523fa7[_0x2388d6(0x276)],this[_0x2388d6(0x217)][_0x2388d6(0x4f4)]+=_0x523fa7[_0x2388d6(0x4f0)],_0x86f430=!![];break;case Game_Action['EFFECT_GAIN_TP']:this[_0x2388d6(0x217)][_0x2388d6(0x1b2)]+=_0x523fa7[_0x2388d6(0x276)],_0x86f430=!![];break;case Game_Action['EFFECT_ADD_STATE']:this[_0x2388d6(0x217)][_0x2388d6(0x348)][_0x2388d6(0x1d2)](_0x523fa7[_0x2388d6(0x45c)]),_0x86f430=!![];break;case Game_Action['EFFECT_REMOVE_STATE']:this['_itemData']['removeState'][_0x2388d6(0x1d2)](_0x523fa7[_0x2388d6(0x45c)]),this[_0x2388d6(0x217)][_0x2388d6(0x5e5)]=!![],_0x86f430=!![];break;case Game_Action[_0x2388d6(0x562)]:this[_0x2388d6(0x217)][_0x2388d6(0x33c)][_0x523fa7['dataId']]+=0x1,_0x86f430=!![];break;case Game_Action[_0x2388d6(0x1dc)]:this[_0x2388d6(0x217)][_0x2388d6(0x33c)][_0x523fa7[_0x2388d6(0x45c)]]-=0x1,_0x86f430=!![];break;case Game_Action[_0x2388d6(0x564)]:this['_itemData'][_0x2388d6(0x1fb)][_0x2388d6(0x1d2)](_0x523fa7[_0x2388d6(0x45c)]),this[_0x2388d6(0x217)]['removeStateBuffChanges']=!![],_0x86f430=!![];break;case Game_Action[_0x2388d6(0x469)]:this[_0x2388d6(0x217)][_0x2388d6(0x365)][_0x2388d6(0x1d2)](_0x523fa7[_0x2388d6(0x45c)]),this['_itemData'][_0x2388d6(0x5e5)]=!![],_0x86f430=!![];break;}else{function _0x1371c0(){const _0x43048a=_0x2388d6;_0x53254d=_0x43048a(0x42e)['format'](_0x344347['id']);}}}if(this[_0x2388d6(0x217)]['addState'][_0x2388d6(0x2ab)]>0x0)this[_0x2388d6(0x217)][_0x2388d6(0x501)]=!![];for(let _0x5afeaf=0x0;_0x5afeaf<this['_itemData'][_0x2388d6(0x33c)][_0x2388d6(0x2ab)];_0x5afeaf++){if(this[_0x2388d6(0x217)][_0x2388d6(0x33c)][_0x5afeaf]!==0x0)this[_0x2388d6(0x217)]['addStateBuffChanges']=!![];}this[_0x2388d6(0x2a7)][_0x2388d6(0x38b)]!==0x0&&(this[_0x2388d6(0x217)][_0x2388d6(0x3e6)]=this[_0x2388d6(0x2a7)][_0x2388d6(0x38b)],_0x86f430=!![]);const _0x57356c=['HP\x20RECOVERY','MP\x20RECOVERY','TP\x20RECOVERY',_0x2388d6(0x5e0),'MP\x20DAMAGE',_0x2388d6(0x5e6),_0x2388d6(0x43a),_0x2388d6(0x5ce),_0x2388d6(0x4f8)];for(const _0x4c7d16 of _0x57356c){if('kAfRC'!=='kAfRC'){function _0x2d3421(){const _0x3de066=_0x2388d6;this[_0x3de066(0x541)](![]);}}else{if(this[_0x2388d6(0x416)][_0x4c7d16]){_0x86f430=!![];break;}}}return _0x86f430;},Window_ShopStatus['prototype'][_0x14a1da(0x487)]=function(_0x3cf2e7,_0x1732cc,_0x3e137a){const _0x442d3d=_0x14a1da,_0x5528bc=_0x442d3d(0x51e);if(this['_itemData'][_0x442d3d(0x509)]<=0x0&&this[_0x442d3d(0x217)][_0x442d3d(0x45a)]<=0x0&&!this['_customItemInfo'][_0x5528bc])return![];const _0x62a7ec=this[_0x442d3d(0x5c0)]();this[_0x442d3d(0x4cc)](_0x62a7ec,_0x3cf2e7,_0x1732cc,_0x3e137a,!![]);const _0x90529e=this[_0x442d3d(0x465)]();return this[_0x442d3d(0x1ce)](ColorManager[_0x442d3d(0x1db)](0x1)),this[_0x442d3d(0x4cc)](_0x90529e,_0x3cf2e7,_0x1732cc,_0x3e137a,![],_0x442d3d(0x547)),this[_0x442d3d(0x5f2)](_0x3cf2e7,_0x1732cc,_0x3e137a),this[_0x442d3d(0x2ad)](),!![];},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x5c0)]=function(){const _0x2ae636=_0x14a1da,_0x38e7fe=VisuMZ[_0x2ae636(0x209)][_0x2ae636(0x4ad)][_0x2ae636(0x3d4)]['LabelRecoverHP'];return _0x38e7fe[_0x2ae636(0x27e)](TextManager['hp']);},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x465)]=function(){const _0x314c39=_0x14a1da,_0xcf6627=_0x314c39(0x51e);if(this['_customItemInfo'][_0xcf6627])return this[_0x314c39(0x416)][_0xcf6627];let _0x5edd78='';if(this['_itemData'][_0x314c39(0x509)]>0x0)_0x5edd78+=_0x314c39(0x318)['format'](Math['floor'](this[_0x314c39(0x217)][_0x314c39(0x509)]*0x64));if(this[_0x314c39(0x217)][_0x314c39(0x509)]>0x0&&this['_itemData']['flatHP']>0x0)_0x5edd78+='\x20';if(this[_0x314c39(0x217)][_0x314c39(0x45a)]>0x0)_0x5edd78+=_0x314c39(0x307)[_0x314c39(0x27e)](this['_itemData']['flatHP']);return _0x5edd78;},Window_ShopStatus[_0x14a1da(0x1a8)]['drawItemEffectsMpRecovery']=function(_0x496fc9,_0x6107c9,_0x58326f){const _0x37c631=_0x14a1da,_0x4b217f='MP\x20RECOVERY';if(this[_0x37c631(0x217)][_0x37c631(0x59e)]<=0x0&&this[_0x37c631(0x217)]['flatMP']<=0x0&&!this['_customItemInfo'][_0x4b217f])return![];const _0x2e7f93=this[_0x37c631(0x517)]();this[_0x37c631(0x4cc)](_0x2e7f93,_0x496fc9,_0x6107c9,_0x58326f,!![]);const _0x255ff5=this['getItemEffectsMpRecoveryText']();return this[_0x37c631(0x1ce)](ColorManager[_0x37c631(0x1db)](0x3)),this[_0x37c631(0x4cc)](_0x255ff5,_0x496fc9,_0x6107c9,_0x58326f,![],_0x37c631(0x547)),this[_0x37c631(0x5f2)](_0x496fc9,_0x6107c9,_0x58326f),this[_0x37c631(0x2ad)](),!![];},Window_ShopStatus[_0x14a1da(0x1a8)]['getItemEffectsMpRecoveryLabel']=function(){const _0xa99b2d=_0x14a1da,_0x3a585f=VisuMZ[_0xa99b2d(0x209)][_0xa99b2d(0x4ad)]['StatusWindow'][_0xa99b2d(0x345)];return _0x3a585f[_0xa99b2d(0x27e)](TextManager['mp']);},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x479)]=function(){const _0x44efe5=_0x14a1da,_0x216d5e='MP\x20RECOVERY';if(this[_0x44efe5(0x416)][_0x216d5e])return this[_0x44efe5(0x416)][_0x216d5e];let _0x392e22='';if(this[_0x44efe5(0x217)]['rateMP']>0x0)_0x392e22+=_0x44efe5(0x318)[_0x44efe5(0x27e)](Math[_0x44efe5(0x4d0)](this['_itemData'][_0x44efe5(0x59e)]*0x64));if(this['_itemData']['rateMP']>0x0&&this[_0x44efe5(0x217)][_0x44efe5(0x4f4)]>0x0)_0x392e22+='\x20';if(this['_itemData'][_0x44efe5(0x4f4)]>0x0)_0x392e22+=_0x44efe5(0x307)[_0x44efe5(0x27e)](this[_0x44efe5(0x217)][_0x44efe5(0x4f4)]);return _0x392e22;},Window_ShopStatus[_0x14a1da(0x1a8)]['drawItemEffectsTpRecovery']=function(_0x5cd4a6,_0x2603bf,_0x3eaa0f){const _0x536b8f=_0x14a1da,_0x347591=_0x536b8f(0x22a);if(this['_itemData'][_0x536b8f(0x1b2)]<=0x0&&!this[_0x536b8f(0x416)][_0x347591])return![];const _0x187ded=this[_0x536b8f(0x427)]();this[_0x536b8f(0x4cc)](_0x187ded,_0x5cd4a6,_0x2603bf,_0x3eaa0f,!![]);const _0x4c42bf=this['getItemEffectsTpRecoveryText']();return this[_0x536b8f(0x1ce)](ColorManager['powerUpColor']()),this[_0x536b8f(0x4cc)](_0x4c42bf,_0x5cd4a6,_0x2603bf,_0x3eaa0f,![],_0x536b8f(0x547)),this[_0x536b8f(0x5f2)](_0x5cd4a6,_0x2603bf,_0x3eaa0f),this[_0x536b8f(0x2ad)](),!![];},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x427)]=function(){const _0x2955fe=_0x14a1da,_0x123297=VisuMZ[_0x2955fe(0x209)][_0x2955fe(0x4ad)][_0x2955fe(0x3d4)][_0x2955fe(0x4c5)];return _0x123297[_0x2955fe(0x27e)](TextManager['tp']);},Window_ShopStatus['prototype']['getItemEffectsTpRecoveryText']=function(){const _0x250b27=_0x14a1da,_0x2f050d=_0x250b27(0x22a);if(this['_customItemInfo'][_0x2f050d])return this[_0x250b27(0x416)][_0x2f050d];let _0x58278b='';return _0x58278b+=_0x250b27(0x307)[_0x250b27(0x27e)](this[_0x250b27(0x217)]['gainTP']),_0x58278b;},Window_ShopStatus['prototype'][_0x14a1da(0x229)]=function(_0x447c14,_0x5b7b5a,_0x4cbbdd){const _0x3451cd=_0x14a1da,_0xbee357='USER\x20TP\x20GAIN';if(this[_0x3451cd(0x217)][_0x3451cd(0x3e6)]===0x0&&!this[_0x3451cd(0x416)][_0xbee357])return![];const _0xa5dd9d=this['getItemEffectsSelfTpGainLabel']();this[_0x3451cd(0x4cc)](_0xa5dd9d,_0x447c14,_0x5b7b5a,_0x4cbbdd,!![]);const _0x41ab13=this['getItemEffectsSelfTpGainText']();return this[_0x3451cd(0x217)][_0x3451cd(0x3e6)]>0x0?this[_0x3451cd(0x1ce)](ColorManager[_0x3451cd(0x362)]()):this[_0x3451cd(0x1ce)](ColorManager[_0x3451cd(0x378)]()),this[_0x3451cd(0x4cc)](_0x41ab13,_0x447c14,_0x5b7b5a,_0x4cbbdd,![],'right'),this[_0x3451cd(0x5f2)](_0x447c14,_0x5b7b5a,_0x4cbbdd),this[_0x3451cd(0x2ad)](),!![];},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x54f)]=function(){const _0x433784=_0x14a1da,_0x87d520=VisuMZ[_0x433784(0x209)]['Settings'][_0x433784(0x3d4)][_0x433784(0x1e2)];return _0x87d520[_0x433784(0x27e)](TextManager['tp']);},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x56d)]=function(){const _0x31e993=_0x14a1da,_0x733310=_0x31e993(0x43a);if(this[_0x31e993(0x416)][_0x733310])return this[_0x31e993(0x416)][_0x733310];let _0x497af9='';if(this['_itemData'][_0x31e993(0x3e6)]>0x0){if('RCAAb'!==_0x31e993(0x5b1))_0x497af9+=_0x31e993(0x307)[_0x31e993(0x27e)](this[_0x31e993(0x217)]['selfTP']);else{function _0x539581(){const _0x1c983f=_0x31e993,_0x3a7e78='REPEAT';if(this[_0x1c983f(0x416)][_0x3a7e78])return this[_0x1c983f(0x416)][_0x3a7e78];const _0x267bfe=_0x1c983f(0x2a1);return _0x267bfe[_0x1c983f(0x27e)](this[_0x1c983f(0x2a7)][_0x1c983f(0x60e)]);}}}else _0x497af9+='%1'['format'](this[_0x31e993(0x217)][_0x31e993(0x3e6)]);return _0x497af9;},Window_ShopStatus['prototype'][_0x14a1da(0x1c7)]=function(_0x969e24,_0x116387,_0x456724){const _0x1a25e6=_0x14a1da,_0x33b837=_0x1a25e6(0x5e0);if(this['_itemData'][_0x1a25e6(0x509)]>=0x0&&this[_0x1a25e6(0x217)][_0x1a25e6(0x45a)]>=0x0&&!this['_customItemInfo'][_0x33b837])return![];const _0x19a047=this[_0x1a25e6(0x57f)]();this[_0x1a25e6(0x4cc)](_0x19a047,_0x969e24,_0x116387,_0x456724,!![]);const _0x3bb40b=this[_0x1a25e6(0x326)]();return this['changeTextColor'](ColorManager[_0x1a25e6(0x1db)](0x0)),this['drawItemKeyData'](_0x3bb40b,_0x969e24,_0x116387,_0x456724,![],_0x1a25e6(0x547)),this[_0x1a25e6(0x5f2)](_0x969e24,_0x116387,_0x456724),this[_0x1a25e6(0x2ad)](),!![];},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x57f)]=function(){const _0x49419f=_0x14a1da,_0x4ba087=VisuMZ[_0x49419f(0x209)]['Settings'][_0x49419f(0x3d4)][_0x49419f(0x4bc)];return _0x4ba087[_0x49419f(0x27e)](TextManager['hp']);},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x326)]=function(){const _0x55c275=_0x14a1da,_0x146ec4='HP\x20DAMAGE';if(this['_customItemInfo'][_0x146ec4])return this[_0x55c275(0x416)][_0x146ec4];let _0x4b4400='';if(this[_0x55c275(0x217)][_0x55c275(0x509)]<0x0)_0x4b4400+='%1%'[_0x55c275(0x27e)](Math[_0x55c275(0x4d0)](this[_0x55c275(0x217)][_0x55c275(0x509)]*0x64));if(this[_0x55c275(0x217)][_0x55c275(0x509)]<0x0&&this[_0x55c275(0x217)][_0x55c275(0x45a)]<0x0)_0x4b4400+='\x20';if(this['_itemData'][_0x55c275(0x45a)]<0x0)_0x4b4400+='%1'[_0x55c275(0x27e)](this['_itemData'][_0x55c275(0x45a)]);return _0x4b4400;},Window_ShopStatus[_0x14a1da(0x1a8)]['drawItemEffectsMpDamage']=function(_0x548156,_0x1ccf82,_0x54a0ef){const _0x4b401f=_0x14a1da,_0x13865a=_0x4b401f(0x32a);if(this['_itemData'][_0x4b401f(0x59e)]>=0x0&&this[_0x4b401f(0x217)][_0x4b401f(0x4f4)]>=0x0&&!this[_0x4b401f(0x416)][_0x13865a])return![];const _0x54ff11=this['getItemEffectsMpDamageLabel']();this[_0x4b401f(0x4cc)](_0x54ff11,_0x548156,_0x1ccf82,_0x54a0ef,!![]);const _0x5341cb=this[_0x4b401f(0x410)]();return this['changeTextColor'](ColorManager[_0x4b401f(0x1db)](0x2)),this[_0x4b401f(0x4cc)](_0x5341cb,_0x548156,_0x1ccf82,_0x54a0ef,![],_0x4b401f(0x547)),this[_0x4b401f(0x5f2)](_0x548156,_0x1ccf82,_0x54a0ef),this[_0x4b401f(0x2ad)](),!![];},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x569)]=function(){const _0x52464a=_0x14a1da,_0xfdb814=VisuMZ[_0x52464a(0x209)][_0x52464a(0x4ad)][_0x52464a(0x3d4)][_0x52464a(0x279)];return _0xfdb814[_0x52464a(0x27e)](TextManager['mp']);},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x410)]=function(){const _0xfbfcee=_0x14a1da,_0xf0a47='MP\x20DAMAGE';if(this['_customItemInfo'][_0xf0a47])return this[_0xfbfcee(0x416)][_0xf0a47];let _0x4f7ba3='';if(this[_0xfbfcee(0x217)]['rateMP']<0x0)_0x4f7ba3+=_0xfbfcee(0x613)[_0xfbfcee(0x27e)](Math['floor'](this['_itemData']['rateMP']*0x64));if(this[_0xfbfcee(0x217)]['rateMP']<0x0&&this['_itemData'][_0xfbfcee(0x4f4)]<0x0)_0x4f7ba3+='\x20';if(this['_itemData']['flatMP']<0x0)_0x4f7ba3+='%1'[_0xfbfcee(0x27e)](this[_0xfbfcee(0x217)]['flatMP']);return _0x4f7ba3;},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x4af)]=function(_0x4c5335,_0x4243da,_0x4691cb){const _0x18517c=_0x14a1da,_0x3a7d60=_0x18517c(0x5e6);if(this[_0x18517c(0x217)][_0x18517c(0x1b2)]>=0x0&&!this[_0x18517c(0x416)][_0x3a7d60])return![];const _0x3c4eb5=this[_0x18517c(0x2e1)]();this[_0x18517c(0x4cc)](_0x3c4eb5,_0x4c5335,_0x4243da,_0x4691cb,!![]);const _0x66602c=this['getItemEffectsTpDamageText']();return this[_0x18517c(0x1ce)](ColorManager[_0x18517c(0x378)]()),this[_0x18517c(0x4cc)](_0x66602c,_0x4c5335,_0x4243da,_0x4691cb,![],_0x18517c(0x547)),this[_0x18517c(0x5f2)](_0x4c5335,_0x4243da,_0x4691cb),this[_0x18517c(0x2ad)](),!![];},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x2e1)]=function(){const _0x748459=_0x14a1da,_0x57840b=VisuMZ['ItemsEquipsCore'][_0x748459(0x4ad)]['StatusWindow'][_0x748459(0x316)];return _0x57840b['format'](TextManager['tp']);},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x370)]=function(){const _0x5972d1=_0x14a1da,_0x2f67e6=_0x5972d1(0x5e6);if(this[_0x5972d1(0x416)][_0x2f67e6])return this['_customItemInfo'][_0x2f67e6];let _0x2fe176='';return _0x2fe176+='%1'['format'](this[_0x5972d1(0x217)][_0x5972d1(0x1b2)]),_0x2fe176;},Window_ShopStatus['prototype'][_0x14a1da(0x2c4)]=function(_0x3da169,_0x4e5c71,_0x5347e5){const _0x586082=_0x14a1da,_0x183074=_0x586082(0x5ce);if(!this[_0x586082(0x217)][_0x586082(0x501)]&&!this[_0x586082(0x416)][_0x183074])return![];const _0x1e2c7e=this[_0x586082(0x54a)]();this[_0x586082(0x4cc)](_0x1e2c7e,_0x3da169,_0x4e5c71,_0x5347e5,!![]);const _0xe1248b=this[_0x586082(0x4d8)]();return this[_0x586082(0x4cc)](_0xe1248b,_0x3da169,_0x4e5c71,_0x5347e5,![],_0x586082(0x547)),this[_0x586082(0x5f2)](_0x3da169,_0x4e5c71,_0x5347e5),this[_0x586082(0x2ad)](),!![];},Window_ShopStatus[_0x14a1da(0x1a8)]['getItemEffectsAddedStatesBuffsLabel']=function(){const _0x2f75a7=_0x14a1da;return VisuMZ[_0x2f75a7(0x209)]['Settings'][_0x2f75a7(0x3d4)]['LabelApply'];},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x4d8)]=function(){const _0x292bb1=_0x14a1da,_0x1d607e=_0x292bb1(0x5ce);if(this[_0x292bb1(0x416)][_0x1d607e])return this[_0x292bb1(0x416)][_0x1d607e];let _0x2136dd='',_0x1f4da8=0x0;const _0xf053ae=0x8;for(const _0x127ded of this[_0x292bb1(0x217)][_0x292bb1(0x348)]){const _0x3bf6d7=$dataStates[_0x127ded];if(_0x3bf6d7&&_0x3bf6d7['iconIndex']>0x0){if('IWjBS'!=='IWjBS'){function _0x2127b6(){const _0x27ae27=_0x292bb1;this[_0x27ae27(0x28e)]();}}else{_0x2136dd+='\x5cI[%1]'['format'](_0x3bf6d7[_0x292bb1(0x1ae)]),_0x1f4da8++;if(_0x1f4da8>=_0xf053ae)return _0x2136dd;}}}for(let _0x200ead=0x0;_0x200ead<this[_0x292bb1(0x217)][_0x292bb1(0x33c)][_0x292bb1(0x2ab)];_0x200ead++){const _0x7c7b68=this[_0x292bb1(0x217)][_0x292bb1(0x33c)][_0x200ead],_0x4d1729=Game_BattlerBase['prototype']['buffIconIndex'](_0x7c7b68,_0x200ead);if(_0x4d1729>0x0){_0x2136dd+=_0x292bb1(0x480)[_0x292bb1(0x27e)](_0x4d1729),_0x1f4da8++;if(_0x1f4da8>=_0xf053ae)return _0x2136dd;}}return _0x2136dd;},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x5ee)]=function(_0x146aac,_0x15de68,_0x37430b){const _0x4376c4=_0x14a1da,_0x4b2cd6='REMOVED\x20EFFECTS';if(!this[_0x4376c4(0x217)]['removeStateBuffChanges']&&!this[_0x4376c4(0x416)][_0x4b2cd6])return![];const _0x340b29=this['getItemEffectsRemovedStatesBuffsLabel']();this[_0x4376c4(0x4cc)](_0x340b29,_0x146aac,_0x15de68,_0x37430b,!![]);const _0x369661=this[_0x4376c4(0x4ea)]();return this[_0x4376c4(0x4cc)](_0x369661,_0x146aac,_0x15de68,_0x37430b,![],_0x4376c4(0x547)),this[_0x4376c4(0x5f2)](_0x146aac,_0x15de68,_0x37430b),this[_0x4376c4(0x2ad)](),!![];},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x5a0)]=function(){const _0x3f986f=_0x14a1da;return VisuMZ['ItemsEquipsCore'][_0x3f986f(0x4ad)][_0x3f986f(0x3d4)][_0x3f986f(0x426)];},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x4ea)]=function(){const _0x1e5c32=_0x14a1da,_0x1bc929=_0x1e5c32(0x4f8);if(this[_0x1e5c32(0x416)][_0x1bc929])return this[_0x1e5c32(0x416)][_0x1bc929];let _0x41a0fa='',_0x30582a=0x0;const _0x1df445=VisuMZ[_0x1e5c32(0x209)][_0x1e5c32(0x4ad)][_0x1e5c32(0x3d4)][_0x1e5c32(0x595)];for(const _0x67f0b of this[_0x1e5c32(0x217)][_0x1e5c32(0x560)]){if('obQYs'!=='obQYs'){function _0x3a50f0(){const _0x5e2f4a=_0x1e5c32;return _0x217b75['ItemsEquipsCore'][_0x5e2f4a(0x4ad)][_0x5e2f4a(0x3d4)][_0x5e2f4a(0x415)];}}else{const _0x1cfed3=$dataStates[_0x67f0b];if(_0x1cfed3&&_0x1cfed3[_0x1e5c32(0x1ae)]>0x0){_0x41a0fa+=_0x1e5c32(0x480)[_0x1e5c32(0x27e)](_0x1cfed3[_0x1e5c32(0x1ae)]),_0x30582a++;if(_0x30582a>=_0x1df445)return _0x41a0fa;}}}for(let _0x22520e=0x0;_0x22520e<this[_0x1e5c32(0x217)][_0x1e5c32(0x1fb)][_0x1e5c32(0x2ab)];_0x22520e++){if(_0x1e5c32(0x535)===_0x1e5c32(0x44d)){function _0x124fe4(){const _0x5288b1=_0x1e5c32,_0x2bee54=_0x222a93[_0x5288b1(0x209)][_0x5288b1(0x4ad)][_0x5288b1(0x3d4)][_0x5288b1(0x4bc)];return _0x2bee54['format'](_0x557236['hp']);}}else{const _0x61ca4c=Game_BattlerBase['prototype'][_0x1e5c32(0x2ca)](0x1,_0x22520e);if(_0x61ca4c>0x0){if(_0x1e5c32(0x298)!==_0x1e5c32(0x298)){function _0x379702(){const _0x52ff35=_0x1e5c32,_0x90dedf=this['itemLineRect'](_0x272be4),_0x2c741c=this[_0x52ff35(0x2c8)](_0x1ec1d6)['width'];return _0x2c741c<=_0x90dedf[_0x52ff35(0x379)]?_0x52ff35(0x231):_0x52ff35(0x317);}}else{_0x41a0fa+=_0x1e5c32(0x480)[_0x1e5c32(0x27e)](_0x61ca4c),_0x30582a++;if(_0x30582a>=_0x1df445)return _0x41a0fa;}}}}for(let _0x29d60a=0x0;_0x29d60a<this[_0x1e5c32(0x217)]['removeDebuff'][_0x1e5c32(0x2ab)];_0x29d60a++){const _0x49c0e4=Game_BattlerBase[_0x1e5c32(0x1a8)]['buffIconIndex'](-0x1,_0x29d60a);if(_0x49c0e4>0x0){_0x41a0fa+=_0x1e5c32(0x480)[_0x1e5c32(0x27e)](_0x49c0e4),_0x30582a++;if(_0x30582a>=_0x1df445)return _0x41a0fa;}}return _0x41a0fa;},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x44e)]=function(_0x27d256,_0x28e562,_0x36edb1){const _0x56f9ef=_0x14a1da;if(this[_0x56f9ef(0x2a7)][_0x56f9ef(0x214)][_0x56f9ef(0x2fb)](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0x49b589=String(RegExp['$1'])[_0x56f9ef(0x4d1)](/[\r\n]+/);for(const _0x46bad1 of _0x49b589){if(_0x46bad1[_0x56f9ef(0x2fb)](/(.*):[ ](.*)/i)){const _0x4dcddc=String(RegExp['$1'])[_0x56f9ef(0x597)](),_0x2d0da2=String(RegExp['$2'])[_0x56f9ef(0x597)]();this[_0x56f9ef(0x5f4)](_0x4dcddc,_0x2d0da2,_0x27d256,_0x28e562,_0x36edb1),_0x28e562+=this[_0x56f9ef(0x5df)]();}}}return this[_0x56f9ef(0x2ad)](),_0x28e562;},Window_ShopStatus[_0x14a1da(0x1a8)][_0x14a1da(0x5f4)]=function(_0x1ae478,_0x3bc608,_0x2baefd,_0x1a95ff,_0x304353){const _0x2f20c3=_0x14a1da;this[_0x2f20c3(0x4cc)](_0x1ae478,_0x2baefd,_0x1a95ff,_0x304353,!![]),this[_0x2f20c3(0x4cc)](_0x3bc608,_0x2baefd,_0x1a95ff,_0x304353,![],_0x2f20c3(0x547)),this['drawItemDarkRect'](_0x2baefd,_0x1a95ff,_0x304353),this['resetFontSettings']();};