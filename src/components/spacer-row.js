var React = require('react');

class SpacerRow extends React.Component {
  static defaultProps = {
    'placement': 'top'
  }

  constructor(props) {
    super(props);
  }

  render() {
    let height = 0, spacerRowStyle = { backgroundColor: "#EDEDED" };
    const { placement, currentPosition, positionConfig } = this.props;

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
        <td colSpan={Object.keys(this.props.renderedData[0]).length -1} style={{backgroundColor: "#F9F9F9"}}>
        </td>
      </tr>
    );
  }
}

export default SpacerRow;
