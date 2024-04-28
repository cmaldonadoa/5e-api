# Decks

deck {  
&emsp;name: *string*  
&emsp;source: *string*  
&emsp;cards: *string[]*  
&emsp;[entries](#entries)  
}

card {  
&emsp;name: *string*  
&emsp;source: *string*  
&emsp;set: *string*  
&emsp;[entries](#entries)  
}

## Entries

Each entry has an id (`internalId`), a list of ids that are direct children of it (`children`), and the parent
id (`parentId`).

For each type, there are some non-null fields:

### Text

type=text  
entry

### Entries

type=entries  
name

### Inset

type=inset  
name

### Table

type=table  
caption  
colLabels  
colStyles  
rows  
footnotes

### Section

type=section  
name  
page

### Stat Block

type=statblock  
tag  
style  
source  
name  