export function shouldLoadAdditionalPage(scrollableNode, positionConfig) {
  const { scrollLeft, scrollWidth, scrollTop, scrollHeight, clientHeight } = scrollableNode;

  const scrollHeightDiff = scrollHeight - (scrollTop + clientHeight) - positionConfig.infiniteScrollLoadTreshold

  // Make sure that we load results a little before reaching the bottom.
  const compareHeight = scrollHeightDiff * 0.6;

  // Load the next page if necessary.
  return compareHeight <= positionConfig.infiniteScrollLoadTreshold;
}