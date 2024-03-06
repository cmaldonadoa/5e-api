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