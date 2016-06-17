# Griddle Position Plugin (BETA)

The position plugin allows you to add infinite scrolling and other position-specific functionality to the grid.

Install the plugin by running `npm install griddle-position-plugin` and add it to `plugins` property on Griddle with an optional config.

```
import PositionPlugin from 'griddle-position-plugin';
...
const optionalConfig = {...};
<Griddle ... plugins={[PositionPlugin(optionalConfig)]}
```

## Configuration
Optional configuration values (and their defaults)
```
tableHeight: 500, // The height of the table
tableWidth: null, // The width of the table
rowHeight: 30, // The minimum row height
defaultColumnWidth: null, // The minimum column width
fixedHeader: true, // Whether or not the header should be fixed
disablePointerEvents: false // Disable pointer events while scrolling to improve performance
```

## Planned Features
1. Infinite column scrolling
1. Column resizing
1. Locked columns
