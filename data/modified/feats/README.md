# Feats

feat {  
&emsp;name: *string*  
&emsp;source: *string*  
&emsp;[prerequisite](#prerequisite)    
&emsp;[ability](#ability)    
&emsp;[additionalSpells](#additional-spells)  
&emsp;[entries](#entries)  
&emsp;[toolProficiencies](#tool-proficiencies)  
&emsp;[languageProficiencies](#language-proficiencies)  
&emsp;[weaponProficiencies](#weapon-proficiencies)  
&emsp;[armorProficiencies](#armor-proficiencies)  
&emsp;[skillProficiencies](#skill-proficiencies)  
&emsp;[savingThrowProficiencies](#saving-throw-proficiencies)  
&emsp;[skillToolLanguageProficiencies](#skilltoollanguage-proficiencies)  
&emsp;[expertise](#expertise)  
&emsp;[optionalfeatureProgression](#optionalfeature-progression)  
}

## Prerequisite

An object describing the requirements to take the feat.

`other`: customized requirement\
`spellcasting`: the ability to cast a spell (from any source)\
`spoellcasting2020`: having the Spellcasting or Pact Magic feature\
`level`: minimum character level\
`ability`: object describing minimum ability scores required for each ability\
`feat`: a list of required feats\
`proficiency`: a list of required proficiencies\
&emsp;`weapon`: martial \
&emsp;`armor`: one of heavy, medium, light\
`race`: racial requirements\
&emsp;`name`: race name\
&emsp;`subrace`: subrace name\
&emsp;`displayEntry`: text to show instead when no race is provided\

## Ability

An object describing the amount of ability scores gained.

***ability***: number\
`choose`: see [Choose](#choose)

Abilities are `con`, `cha`, `dex`, `str`, `int` or `wis`.

## Additional Spells

A list of spells to be learned.

`spellcastingAbility`: the spellcasting ability used to cast these spells\
&emsp;&emsp;***ability name***: true\
&emsp;&emsp;`inherit`: true if the spell casting ability to cast these spells is the same increased with this feat\
&emsp;&emsp;`choose`: see [Choose](#choose)\
`name`: name of this group of spells, used for users' clarity\
`spells`: list of spells to be learned\
&emsp;`item`: object describing the spell to be learned\
&emsp;&emsp;***spell name***: true\
&emsp;&emsp;`choose`: see [Choose](#choose)\
&emsp;`_meta`: information about this spell\
&emsp;&emsp;`shortRest`: number of times that can be used without spending a spell slot before a short rest is needed\
&emsp;&emsp;`longRest`: number of times that can be used without spending a spell slot before a long rest is needed\
&emsp;&emsp;`will`: true if spell can be cast at will\
&emsp;&emsp;`ritual`: true if spell can be cast as ritual\

## Language Proficiencies

Object describing the languages to be learned. 

***language name***: true\
`any`: number of languages to be learned

## Tool Proficiencies

Object describing the tools to be learned.

***tool name***: true\
`any`: number of tools to be learned \
`anyArtisans`: number of artisan's tool to be learned

## Weapon Proficiencies

Object describing the weapons to be learned.

***weapon name***: true\
`choose`: see [Choose](#choose)

## Armor Proficiencies

Object describing the armors to be learned.

***armor name***: true

## Skill Proficiencies

Object describing the skills to be learned. 

`choose`: see [Choose](#choose)

Possible values are skill names.

## SkillToolLanguage Proficiencies

Object describing the skills, tools or languages to be learned.

`choose`: see [Choose](#choose)

Possible values are `anySkill` or `anyTool`.

`anySkill`: any available skill\
`anyTool`: any available tool

## Saving Throw Proficiencies

Object describing the saving throws to be learned.

`choose`: see [Choose](#choose)

Possible values are `con`, `cha`, `dex`, `str`, `int` or `wis`.

## Expertise

Object describing the skill to be mastered. 

`anyProficientSkill`: number of already proficient skills to be mastered

## OptionalFeature Progression

List of objects used by character to determine progression in certain features (TCE). For more information see Class documentation.

## Choose

An object describing the need of input from the user.

`from`: a list of names of corresponding items, including special values like ***any*** and its variants\
`fromFilter`: a string containing a query that will return the list of names\
`count`: the amount of items that the user will have to select

## Entries

Each entry has an id (`id`), a list of ids that are direct children of it (`children`), and the parent id (`parentId`).

For each type, there are some non-null fields:

### Type = Text
entry

### Type = List
items {  
&emsp;type=item  
&emsp;name  
&emsp;entry  
}  
style

### Type = Entries
name

### Type = Inset
source  
page  
name

### Type = Table
caption  
colLabels  
colStyles  
rows

### Type = Quote
by