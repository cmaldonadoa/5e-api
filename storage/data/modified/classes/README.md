# Classes

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
&emsp;subclassFeature  
&emsp;entries    
}

### Entries

type=entries  
name
source  
page

### Inset

type=inset  
name

### Ability DC

type=abilityDc  
name  
attributes

### Ability Attack Modifier

type=abilityAttackMod  
name  
attributes

### Class Feature Reference

type=refClassFeature  
classFeature

### Subclass Feature Reference

type=refSubclassFeature  
subclassFeature

### Table

type=table  
caption  
colLabels  
colStyles  
rows  
data {  
&emsp;tableInclude   
}

### Options

type=options  
count (controls the size of the next optional features text where 0 is biggest and 2 smallest)  
style

### Optional Feature Reference

type=refOptionalFeature  
optionalFeature  
name  
data {  
&emsp;isRequiredOption  
}