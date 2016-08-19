import React, { Component, PropTypes } from 'react';
import { StyleHelpers } from 'griddle-render';
import { shouldLoadAdditionalPage } from './utils/';
import debounce from 'lodash.debounce';

class Table extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { disablePointerEvents: false };
  }

  areSameIds(data1, data2) {
    return data1.every((element, index) => {
      return data2[index].__metadata.griddleKey === element.__metadata.griddleKey
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.visibleData.length === nextProps.visibleData.length
      && this.props.visibleData === nextProps.visibleData
      && this.areSameIds(nextProps.visibleData, this.props.visibleData)
      && this.props.currentPosition.renderedStartDisplayIndex !== 0
      && this.props.currentPosition.renderedStartDisplayIndex === nextProps.currentPosition.renderedStartDisplayIndex
      && this.state.disablePointerEvents === nextState.disablePointerEvents) {
      return false;
    }

    return true;
  }

  componentDidMount() {
    this._scroll();
  }

  componentWillUpdate() {
    if(this.state.disablePointerEvents) {
      this.clearScrolling();
    }
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

  _scroll = (event) => {
    const { events, positionConfig } = this.props;

    if (this.refs.scrollable) {
      const scrollableNode = this.refs.scrollable;
      events.setScrollPosition(scrollableNode.scrollLeft, scrollableNode.scrollWidth, scrollableNode.clientWidth, scrollableNode.scrollTop, scrollableNode.scrollHeight, scrollableNode.clientHeight);
    }

    if (event && positionConfig.disablePointerEventsOnScroll) {
      if (!this.state.disablePointerEvents) {
        this.setState({disablePointerEvents: true});
      }

      // Clear disable pointer events after scroll events stop for a period of time.
      this.clearScrolling();
    }
  }

  clearScrolling = debounce(() => {
    this.setState({disablePointerEvents: false});
  }, 500);

  render() {
    const { positionConfig, settings, styles } = this.props;
    const positionStyle = styles.getStyle({
      styles: styles.inlineStyles,
      styleName: 'table',
      mergeStyles: {
        'overflow': positionConfig.tableHeight && positionConfig.tableWidth ? 'scroll' : null,
        'overflowY' : positionConfig.tableHeight && !positionConfig.tableWidth ? 'scroll' : null,
        'overflowX' : !positionConfig.tableHeight && positionConfig.tableWidth ? 'scroll' : null,
        'height': positionConfig.tableHeight ? positionConfig.tableHeight : null,
        'width': positionConfig.tableWidth ? positionConfig.tableWidth : null,
        'display': 'inline-block'
      }
    });

    const style = styles.getStyle({
      styles: styles.inlineStyles,
      styleName: 'table',
      mergeStyles: {
        ...settings.useFixedTable && styles.getStyle({
          useStyles: settings.useGriddleStyles,
          styles: styles.inlineStyles,
          styleName: 'fixedTable',
        }),
        pointerEvents: this.state.disablePointerEvents ? 'none' : 'auto'
      }
    });

    const { className } = StyleHelpers.getStyleProperties(this.props, 'table');
    const headerContent = <this.props.components.TableHeading columns={Object.keys(this.props.data[0])} {...this.props} />;

    //translate the definition object to props for Heading / Body
    return this.props.data.length > 0 ? (
      <div>
        {positionConfig.fixedHeader ? <table style={style} className={className}>{headerContent}</table> : null}
        <div ref="scrollable" onScroll={this._scroll} style={positionStyle}>
          <table
            className={className}
            style={style}
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
