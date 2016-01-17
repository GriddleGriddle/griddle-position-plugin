import React, { Component, PropTypes } from 'react';

export default PositionTable => class extends Component {
  static PropTypes = {
    events: PropTypes.object.isRequired
  }

  _scroll = () => {
    if (this.refs.scrollable) {
      let scrollableNode = this.refs.scrollable;
      this.props.events.setScrollPosition(scrollableNode.scrollLeft, scrollableNode.scrollWidth, scrollableNode.scrollTop, scrollableNode.scrollHeight);
    }
  }

  render() {
    const { positionConfig, styles } = this.props;

    const style = styles.getStyle({
      mergeStyles: {
        'height': positionConfig.tableHeight ? positionConfig.tableHeight + 'px' : null,
        'width': positionConfig.tableWidth ? positionConfig.tableWidth + 'px' : null,
        'overflow': positionConfig.tableHeight && positionConfig.tableWidth ? 'scroll' : null,
        'overflowY' : positionConfig.tableHeight && !positionConfig.tableWidth ? 'scroll' : null,
        'overflowX' : !positionConfig.tableHeight && positionConfig.tableWidth ? 'scroll' : null,
      }
    });

    return (
      <div ref="scrollable" onScroll={this._scroll} style={style}>
        <PositionTable {...this.props} />
      </div>
    );
  }
}
