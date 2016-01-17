import React from 'react';
import SpacerRow from './spacer-row';

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
      <this.props.components.Row rowData={data}
      key={data.griddleKey}
      components={this.props.components}
      events={this.props.events}
      rowIndex={index}
      rowProperties={this.props.renderProperties.rowProperties}
      styles={this.props.styles}
      settings={this.props.settings}
      tableProperties={this.props.tableProperties}
      ignoredColumns={this.props.renderProperties.ignoredColumns}
      columnProperties={this.props.renderProperties.columnProperties} />
    );

    return (
      <tbody>
        <SpacerRow placement='top' {...this.props} />
        {rows}
        <SpacerRow placement='bottom' {...this.props} />
      </tbody>
    );
  }
}

export default Component => TableBody;
