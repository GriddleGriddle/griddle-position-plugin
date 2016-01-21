import React from 'react';
import SpacerRow from './spacer-row';
import { StyleHelpers } from 'griddle-render';

class TableBody extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.renderedData !== nextProps.renderedData;
  }

  render() {
    var rows = this.props.renderedData
    .filter(data => data.visible === undefined || data.visible === true)
    .map((data, index) =>
      <this.props.components.Row
        rowData={data}
        key={data.griddleKey}
        rowIndex={index}
        {...props}
      />
    );

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
