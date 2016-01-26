import React, { Component, PropTypes } from 'react';
import { StyleHelpers } from 'griddle-render';
import { shouldLoadAdditionalPage } from './utils/';

class Table extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    this._checkToLoadNewPage(nextProps);
  }

  _checkToLoadNewPage = (props) => {
    if (this.refs.scrollable) {
      const { events, positionConfig, loading, hasNext } = props;
      const scrollableNode = this.refs.scrollable;
      // Load the next page, if necessary
      if (!loading && hasNext && shouldLoadAdditionalPage(props)) {
        events.getNextPage();
      }
    }
  }

  _scroll = () => {
    if (this.refs.scrollable) {
      const { events } = this.props;
      const scrollableNode = this.refs.scrollable;

      events.setScrollPosition(scrollableNode.scrollLeft, scrollableNode.scrollWidth, scrollableNode.scrollTop, scrollableNode.scrollHeight, scrollableNode.clientHeight);
    }
  }

  render() {
    const { positionConfig, settings, styles } = this.props;
    const positionStyle = styles.getStyle({
      styles: styles.inlineStyles,
      styleName: 'table',
      mergeStyles: {
        'overflow': positionConfig.tableHeight && positionConfig.tableWidth ? 'scroll' : null,
        'overflowY' : positionConfig.tableHeight && !positionConfig.tableWidth ? 'scroll' : null,
        'overflowX' : !positionConfig.tableHeight && positionConfig.tableWidth ? 'scroll' : null,
        'height': positionConfig.tableHeight ? positionConfig.tableHeight + 'px' : null,
        'width': positionConfig.tableWidth ? positionConfig.tableWidth + 'px' : null
      }
    });
    const style = styles.getStyle({
      styles: styles.inlineStyles,
      styleName: 'table',
      mergeStyles: settings.useFixedTable && styles.getStyle({
        useStyles: settings.useGriddleStyles,
        styles: styles.inlineStyles,
        styleName: 'fixedTable',
      })
    });

    const { className } = StyleHelpers.getStyleProperties(this.props, 'table');
    const headerContent = <this.props.components.TableHeading columns={Object.keys(this.props.data[0])} {...this.props} />;

    //translate the definition object to props for Heading / Body
    return this.props.data.length > 0 ? (
      <div>
        {positionConfig.fixedHeader ? <table style={settings.useFixedTable && style}>{headerContent}</table> : null}
        <div ref="scrollable" onScroll={this._scroll} style={positionStyle}>
          <table
            className={className}
            style={settings.useFixedTable && style}
          >
            {!positionConfig.fixedHeader ? headerContent : null}
            <this.props.components.TableBody {...this.props} />
          </table>
        </div>
      </div>
    ) : null;
  }
}

export default Component => Table;
