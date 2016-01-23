import React, { Component } from 'react';

export default Column => class extends Component {
  render() {
    const { positionConfig } = this.props;
    const style = {
      'height': positionConfig.rowHeight ? positionConfig.rowHeight + 'px' : null
    };
    return (
      <Column {...this.props} style={style}/>
    );
  }
}