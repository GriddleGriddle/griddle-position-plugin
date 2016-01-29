import React, { Component } from 'react';

export default TableHeadingCell => class extends Component {
  render() {
    const { positionConfig, columnProperty } = this.props;

    const width = columnProperty && columnProperty.width ?
      columnProperty.width :
      (positionConfig.defaultColumnWidth ? positionConfig.defaultColumnWidth + 'px' : null)

    const style = {
      'width': this.props.settings.useFixedTable ? null : width,
      'textAlign': 'left'
    };

    return (
      <TableHeadingCell {...this.props} style={style}/>
    );
  }
}
