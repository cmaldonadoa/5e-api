# Races

race {  
&emsp;name: *string*  
&emsp;source: *string*  
&emsp;size: *string[]*  
&emsp;[speed](#speed)\
&emsp;[ability](#ability)\
&emsp;[languageProficiencies](#language-proficiencies)\
&emsp;[weaponProficiencies](#weapon-proficiencies)\
&emsp;[armorProficiencies](#armor-proficiencies)\
&emsp;[skillProficiencies](#skill-proficiencies)\
&emsp;[toolProficiencies](#tool-proficiencies)\
&emsp;[skillProficiencies](#skill-proficiencies)\
&emsp;[entries](#entries)\
&emsp;[feats](#feats)\
&emsp;[additionalSpells](#additional-spells)\
&emsp;[_versions](#versions)\
}

subrace {  
&emsp;name: *string*  
&emsp;source: *string*  
&emsp;raceName: *string*  
&emsp;raceSource: *string*  
&emsp;[speed](#speed)\
&emsp;[ability](#ability)\
&emsp;[languageProficiencies](#language-proficiencies)\
&emsp;[weaponProficiencies](#weapon-proficiencies)\
&emsp;[armorProficiencies](#armor-proficiencies)\
&emsp;[skillProficiencies](#skill-proficiencies)\
&emsp;[toolProficiencies](#tool-proficiencies)\
&emsp;[skillProficiencies](#skill-proficiencies)\
&emsp;[skillToolLanguageProficiencies](#skilltoollanguage-proficiencies)\
&emsp;[entries](#entries)\
&emsp;[feats](#feats)\
&emsp;[additionalSpells](#additional-spells)\
&emsp;[overwrite](#overwrite)\
&emsp;[_versions](#versions)\
}

## Ability

An object describing the amount of ability scores gained.

***ability***: number\
`choose`: see [Choose](#choose)

Abilities are `con`, `cha`, `dex`, `str`, `int` or `wis`.

## Additional Spells

A list of spells to be learned.

`spellcastingAbility`: the spellcasting ability used to cast these spells\
&emsp;&emsp;***ability name***: true\
&emsp;&emsp;`choose`: see [Choose](#choose)\
`spells`: list of spells to be learned\
&emsp;`item`: object describing the spell to be learned\
&emsp;&emsp;***spell name***: true\
&emsp;&emsp;`choose`: see [Choose](#choose)\
&emsp;`_meta`: information about this spell\
&emsp;&emsp;`level`: minimum level required to learn this spell\
&emsp;&emsp;`longRest`: number of times that can be used without spending a spell slot before a long rest is needed\
&emsp;&emsp;`shortRest`: number of times that can be used without spending a spell slot before a short rest is needed\

## Language Proficiencies

Object describing the languages to be learned.

***language name***: true\
`anyStandard`: number of standard languages to be learned\
`choose`: see [Choose](#choose)

## Tool Proficiencies

Object describing the tools to be learned.

`any`: number of tools to be learned \
`anyMusical`: number of musical instruments to be learned\
`anyArtisans`: number of artisan's tools to be learned\

## Weapon Proficiencies

Object describing the weapons to be learned.

***weapon name***: true\
`choose`: see [Choose](#choose)

## Armor Proficiencies

Object describing the armors to be learned.

***armor name***: true

## Skill Proficiencies

Object describing the skills to be learned.

***skill name***: true\
`any`: see [Choose](#choose)\
`choose`: see [Choose](#choose)\

Possible values are skill names.

## SkillToolLanguage Proficiencies

Object describing the skills, tools or languages to be learned.

`choose`: see [Choose](#choose)

Possible values are `anySkill` or `anyTool`.

`anySkill`: any available skill\
`anyTool`: any available tool

## Feats

Object describing the feats to be learned.

`any`: any available feat

## Overwrite

Object describing the race fields that will be overwritten with the subrace fields of the same name. Otherwise, both
will be merged.

***field name***: true if the field is overwritten

## Choose

An object describing the need of input from the user.

`from`: a list of names of corresponding items, including special values like ***any*** and its variants\
`fromFilter`: a string containing a query that will return the list of names\
`count`: the amount of items that the user will have to select

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
&emsp;name  
&emsp;entry  
}

### Entries

type=entries  
name  
data {  
&emsp;overwrite  
}

### Inset

type=inset  
name

### Table

type=table  
caption  
colLabels  
colStyles  
rows