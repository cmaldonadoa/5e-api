# Items

baseItem {  
&emsp;name: *string*    
&emsp;source: *string*    
&emsp;types: *string[]*\
&emsp;rarity: *string*\
&emsp;properties: *string[]*\
&emsp;weaponCategory: *string*\
&emsp;range: *string*\
&emsp;isWeapon: *boolean*\
&emsp;isFirearm: *boolean*\
&emsp;reload: *number*\
&emsp;ammoType: *string*\
&emsp;damageType: *string*\
&emsp;[packContents](#pack-contents)\
&emsp;[damage](#damage)\
&emsp;armorClass: *number*\
&emsp;isArmor: *boolean*\
&emsp;strength: *number*\
&emsp;stealth: *boolean*\
&emsp;[entries](#entries)\
}

itemProperty {\
&emsp;abbreviation: *string*\
&emsp;source: *string*\
&emsp;name: *string*\
&emsp;[entries](#entries)\
}

itemType {\
&emsp;abbreviation: *string*\
&emsp;source: *string*\
&emsp;name: *string*\
&emsp;[entries](#entries)\
}

item {\
&emsp;name: *string*\
&emsp;source: *string*\
&emsp;rarity: *string*\
&emsp;attuned: *boolean*\
&emsp;[attunedBy](#attuned-by)\
&emsp;bonusSpellAttack: *string*\
&emsp;bonusSpellSaveDC: *string*\
&emsp;[entries](#entries)\
&emsp;baseItem: *string*\
&emsp;types: *string[]*\\
&emsp;weaponCategory: *string*\
&emsp;properties: *string[]*\
&emsp;[damage](#damage)\
&emsp;damageType: *string*\
&emsp;bonusWeapon: *string*\
&emsp;bonusWeaponDamage: *string*\
&emsp;isWeapon: *boolean*\
&emsp;grantsProficiency: *boolean*\
&emsp;crew: *number*\
&emsp;vehicleArmorClass: *number*\
&emsp;vehicleHealth: *number*\
&emsp;vehicleSpeed: *number*\
&emsp;vehicleMaxPassengers: *number*\
&emsp;vehicleMaxCargo: *number*\
&emsp;vehicleThreshold: *number*\
&emsp;vehicleSeeAlso: *string*\
&emsp;attachedSpells: *string[]*\
&emsp;[modifySpeed](#modify-speed)\
&emsp;[modifyAbility](#modify-ability)\
&emsp;armorClass: *number*\
&emsp;range: *string*\
&emsp;strength: *number*\
&emsp;stealth: *boolean*\
&emsp;isCursed: *boolean*\
&emsp;bonusAC: *string*\
&emsp;isPoison: *boolean*\
&emsp;poisonTypes: *string[]*\
&emsp;[packContents](#pack-contents)\
&emsp;carryingCapacity: *number*\
&emsp;mountSpeed: *number*\
&emsp;deckSeeAlso: *string*\
&emsp;ammoType: *string*\
&emsp;bonusProficiencyBonus: *string*\
&emsp;minCrew: *number*\
&emsp;maxCrew: *number*\
&emsp;bonusAbilityCheck: *string*\
&emsp;[bonusSavingThrow](#bonus-saving-throw)\
&emsp;isFirearm: *boolean*\
}

## Pack Contents

List of objects describing all the items in a pack. Objects must have **one** of these: `item` or `special`.

`item`: item name\
`special`: true if it has a custom item name\
`quantity`: item count

## Damage

Object describing the damage done by a weapon.

`1`: string, represents the normal damage done by a weapon\
`2`: string, represents the damage done by a weapon using the Versatile property

## Attuned By

List of objects describing the requirements needed to attune to the item.

`class`: required class to be able to attune to\
`spellcasting`: true if it only can be attuned by a spellcaster\
`background`: required background to be able to attune to\
`creatureType`: required character type to be able to attune to\
`race`: required race to be able to attune to\
`alignment`: list of allowed alignments\
`psionics`: true if it requires to have a psionic ability\

## Modify Speed

Object describing how the character movement speed is modified.

`equal`\
&emsp;`burrow`: set burrow speed equal to walk speed\
&emsp;`climb`: set climb speed equal to walk speed\
&emsp;`fly`: set fly speed equal to walk speed\
`static`\
&emsp;`walk`: number, set walk speed equal to this value\
&emsp;`swim`: number, set swim speed equal to this number\
&emsp;`fly`: number, set fly speed equal to this number\
`multiply`\
&emsp;`walk`: number, multiply current walk speed by this number

## Modify Ability

Object describing how the character ability scores are modified.

***ability***: number\
`static`\
&emsp;***ability***: number, set ability equal to this number\
`choose`: a list with all the inputs needed from the user\
&emsp;`from`: a list of ability names\
&emsp;`count`: the amount of items that the user will have to select\
&emsp;`amount`: a number describing how much the selected ability will increase or decrease\

Abilities are `con`, `cha`, `dex`, `str`, `int` or `wis`.

# Bonus Saving Throw

Object describing how saving throws are affected.

`_`: string with modifier to be applied to this all saving throws\
***ability***: string with modifier to be applied to this ability saving throws

Abilities are `con`, `cha`, `dex`, `str`, `int` or `wis`.

## Entries

Each entry has an id (`internalId`), a list of ids that are direct children of it (`children`), and the parent
id (`parentId`).

For each type, there are some non-null fields:

### Text

type=text  
entry

### List

type=list  
style
items {  
&emsp;type=item  
&emsp;entry    
}

### Entries

type=entries  
name  
source  
page

### Inset

type=inset  
name  
source  
page

### Table

type=table  
caption  
colLabels  
colStyles  
rows  