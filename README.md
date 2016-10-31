## :warning: Deprecated :warning:

###  Please find 1.0 updates in the [1.0-combined](https://github.com/GriddleGriddle/Griddle/tree/1.0-combined) branch.

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
import PositionPlugin from 'griddle-position-plugin';
...
const settings = {
  // The height of the table
  tableHeight: 500,
  // The width of the table
  tableWidth: null,
  // The minimum row height
  rowHeight: 30,
  // The minimum column width
  defaultColumnWidth: null,
  // Whether or not the header should be fixed
  fixedHeader: true,
  // Disable pointer events while scrolling to improve performance
  disablePointerEvents: false
};
...
<Griddle data={data} plugins={[PositionPlugin(settings)]}/>
```

## Planned Features
1. Infinite column scrolling
1. Column resizing
1. Locked columns
