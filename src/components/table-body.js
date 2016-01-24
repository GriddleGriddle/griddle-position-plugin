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
    const { renderedData, loading, components, styles, settings, events, renderProperties, tableProperties, positionConfig } = this.props;

    const rows = this.props.renderedData
          .filter(data => data.visible === undefined || data.visible === true)
          .map((data, index) =>
            <this.props.components.Row rowData={data}
              key={data.__metadata.griddleKey}
              components={components}
              events={events}
              rowIndex={index}
              rowProperties={renderProperties.rowProperties}
              styles={styles}
              settings={settings}
              tableProperties={tableProperties}
              ignoredColumns={renderProperties.ignoredColumns}
              columnProperties={renderProperties.columnProperties} 
              // Position specific props
              positionConfig={positionConfig}
              />)
          .concat(loading ? [<components.Loading key='loading-row' components={components} styles={styles} settings={settings} events={events} />] :[]);

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
