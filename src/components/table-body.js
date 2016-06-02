import React from 'react';
import SpacerRow from './spacer-row';
import { StyleHelpers } from 'griddle-render';

//From: http://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
//TODO: Use with lodash instead -- it appears that lodash global is getting clobbered at least with 4.0
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

class TableBody extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  shouldComponentUpdate(nextProps) {
    return !arraysEqual(nextProps.renderedData, this.props.renderedData);
  }

  render() {
    const { renderedData, loading, components, styles, settings, events, renderProperties, positionConfig } = this.props;
    //TODO: Share this part with the actual Griddle table-body component
    const rows = this.props.renderedData
          .filter(data => data.visible === undefined || data.visible === true)
          .map((data, index) =>
            <this.props.components.Row rowData={data}
              absoluteRowIndex={data.__metadata.index}
              key={data.__metadata.griddleKey}
              components={components}
              events={events}
              rowIndex={index}
              rowProperties={renderProperties.rowProperties}
              styles={styles}
              settings={settings}
              originalRowData={this.props.state.data[data.__metadata.griddleKey]}
              ignoredColumns={renderProperties.ignoredColumns}
              columnProperties={renderProperties.columnProperties}
              // Position specific props
              positionConfig={positionConfig}
              />)
          .concat(loading ? [<components.Loading key='loading-row' components={components} styles={styles} settings={settings} events={events} />] :[]);

    const { style, className } = StyleHelpers.getStyleProperties(this.props, 'tableBody');

    return (
      <tbody style={style} className={className}>
        <SpacerRow placement='top' {...this.props} />
        {rows}
        <SpacerRow placement='bottom'{...this.props} />
      </tbody>
    );
  }
}

export default Component => TableBody;
