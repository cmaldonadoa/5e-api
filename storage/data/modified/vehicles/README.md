# Vehicles

vehicle {  
&emsp;name: *string*  
&emsp;source: *string*  
&emsp;dimensions: *string[]*\
&emsp;maxCrew: *number*\
&emsp;maxCrewNote: *string*\
&emsp;maxPassengers: *number*\
&emsp;maxCargo: *number*\
&emsp;armorClass: *number*\
&emsp;health: *number*\
&emsp;[speed](#speed)\
&emsp;damageImmunities: *string[]*\
&emsp;conditionImmunities: *string[]*\
&emsp;[entries](#entries)\
&emsp;[pace](#pace)\
&emsp;[ability](#ability)\
&emsp;[weapons](#weapons)\
&emsp;[controls](#controls)\
&emsp;[movements](#movements)\
&emsp;[actions](#entries)\
}

## Speed

Object describing the speed of the vehicle feet.

`walk`: walking speed of the vehicle\
`swim`: swimming speed of the vehicle\
`fly`: flying speed of the vehicle\
`note`: a text that can be present to further describe the speed\


## Pace

Object describing the speed of the vehicle in miles.

`walk`: walking speed of the vehicle\
`swim`: swimming speed of the vehicle\
`fly`: flying speed of the vehicle\

## Ability

Object describing the ability scores of the vehicle.

***ability***: number

Abilities are `con`, `cha`, `dex`, `str`, `int` or `wis`.

## Weapons

List of objects describing the weapons present in the vehicle.

`name`: name of the weapon\
`armorClass`: a number representing the vehicle armor class\
`health`: number of hit points of the weapon\
`crew`: number of crew member required to handle this weapon\
`count`: number of these weapons present in the vehicle\
`entries`: see [Entries](#entries)\
`actions`: list of the possible actions the weapon can take\
&emsp;`name`: name of the action\
&emsp;`entries`: see [Entries](#entries)

## Controls

List of objects describing the control objects present in the vehicle.

`name`: name of the control\
`armorClass`: a number representing the control armor class\
`health`: number of hit points of the control\
`entries`: see [Entries](#entries)

## Movements

List of objects describing the movement objects present in the vehicle.

`name`: name of the control\
`armorClass`: a number representing the control armor class\
`health`: number of hit points of the control\
`healthNote`: a text that can be present to further describe the health\
`entries`: see [Entries](#entries)

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