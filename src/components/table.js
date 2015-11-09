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
    const { positionConfig } = this.props;

    const wrapperStyle = {
      'height': positionConfig.tableHeight ? positionConfig.tableHeight + 'px' : null,
      'width': positionConfig.tableWidth ? positionConfig.tableWidth + 'px' : null,
      'overflow': 'scroll'
    };

    return (
      <div ref="scrollable" onScroll={this._scroll} style={wrapperStyle}>
        <PositionTable {...this.props} />
      </div>
    );
  }
}
