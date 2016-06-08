var React = require('react');

class SpacerRow extends React.Component {
  static defaultProps = {
    'placement': 'top'
  }
  shouldComponentUpdate(nextProps) {
    if(
      this.props.currentPosition !== nextProps.currentPosition ||
      this.props.placement !== nextProps.placement
    ) {
      return true;
    }

    return false;
  }
  constructor(props) {
    super(props);
  }

  //This gets one column property object from the global property object
  getColumnPropertyObject(columnProperties, columnName) {
    return columnProperties.hasOwnProperty(columnName) ?
      columnProperties[columnName] :
      null;
  }

  render() {
    let height = 0, spacerRowStyle = {};
    const { placement, currentPosition, positionConfig, renderProperties, renderedData } = this.props;

    if (currentPosition) {
      // Get the length of rows that the spacer row will represent.
      let spacerRowCount = placement === 'top' ? currentPosition.renderedStartDisplayIndex :
        currentPosition.visibleDataLength - currentPosition.renderedEndDisplayIndex;

      // Get the height in pixels.
      height = positionConfig.rowHeight * spacerRowCount;
    }

    spacerRowStyle.height = height + 'px';
    return (
      <tr key={placement + '-' + height} style={spacerRowStyle}>
        {Object.keys(renderedData.length > 0 ? renderedData[0] : renderedData.columnProperties)
            .filter(k => renderProperties.metadataColumn !== k)
            .map(columnName => {
          const columnProperty = this.getColumnPropertyObject(renderProperties.columnProperties, columnName);
          return <td key={columnName} {...columnProperty} className={columnProperty.cssClassName}></td>
        })}
      </tr>
    );
  }
}

export default SpacerRow;
