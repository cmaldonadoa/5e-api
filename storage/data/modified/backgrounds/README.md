# Backgrounds

background {  
&emsp;name: *string*    
&emsp;source: *string*    
&emsp;[skillProficiencies](#skill-proficiencies)  
&emsp;[languageProficiencies](#language-proficiencies)  
&emsp;[toolProficiencies](#tool-proficiencies)  
&emsp;[entries](#entries)  
&emsp;[feats](#feats)  
&emsp;[additionalSpells](#additional-spells)  
&emsp;[skillToolLanguageProficiencies](#skilltoollanguage-proficiencies)  
&emsp;[_versions](#versions)  
}

## Skill Proficiencies

Object describing the skills to be learned.

***skill name***: true\
`choose`: see [Choose](#choose)

## Language Proficiencies

Object describing the languages to be learned.

***language name***: true\
`anyStandard`: number of standard languages to be learned

## Tool Proficiencies

Object describing the tools to be learned.

***tool name***: true\
`anyGaming`: number of gaming sets to be learned\
`anyMusical`: number of musical instruments to be learned\
`anyArtisans`: number of artisan's tool to be learned

## SkillToolLanguage Proficiencies

Object describing the skills, tools or languages to be learned.

`choose`: see [Choose](#choose)

Possible values are `anySkill`, `anyTool`, `anyArtisans` or `anyStandard`.

## Starting Equipment

Array of objects describing the initial items. Object must have **one** of these: `item`, `special`, `tool` or `value`.

`item`: item name from published sources\
`special`: customized item name\
`tool`: a value from [tool proficiencies](#tool-proficiencies)\
`value`: starting gold\
`displayName`: replace item base name  
`quantity`: item count  
`worthValue`: value of item

## Additional Spells

Background additional spells only have one key: `expanded`.

Expanded is an object with slots as keys (`s0`, `s1`, etc.) and a list of spell names as values.

## Feats

An object describing the feats to be gained.

***feat name***: true

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
&emsp;isFeature  
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
data {  
&emsp;tableInclude   
}

### Section

type=section  
name  
id