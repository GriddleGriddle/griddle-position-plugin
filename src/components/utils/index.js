export function shouldLoadAdditionalPage(props) {
  const { positionConfig, renderedData, currentPosition } = props;
  const displayedIndexCount = currentPosition.renderedEndDisplayIndex - currentPosition.renderedStartDisplayIndex;

  // Load the next page if necessary.
  return renderedData.length < displayedIndexCount;
}