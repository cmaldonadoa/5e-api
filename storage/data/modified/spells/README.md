# Spells

spell {  
&emsp;name: *string*  
&emsp;source: *string*  
&emsp;level: *number*     
&emsp;school: *string*  
&emsp;time: *string*  
&emsp;[range](#range)   
&emsp;[components](#components)   
&emsp;[duration](#duration)   
&emsp;classes: *string[]*    
&emsp;ritual: *boolean*  
&emsp;[entries](#entries)  
&emsp;[higherLevel](#entries)  
}

## Range

Object describing the spell's range.

`type`: one of point, line, cone, radius, sphere, special, hemisphere or cube\
`distance`: object describing spell's distance\
&emsp;`type`: one of feet, miles, touch, self, sight or unlimited\
&emsp;`distance`: number of feet or miles (if available)\

## Components

Object describing spell's components.

`v`: true if it has a verbal component\
`s`: true if it has a somatic component\
`m`: string if it has a material component

## Duration

Object describing the spell's duration.

`type`: one of timed, instant, permanent or special\
`concentration`: true if it requires concentration\
`duration`: string if it has a duration

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

### Quote

type=quote  
by