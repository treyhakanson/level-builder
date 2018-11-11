function itemToXML(type) {
  return "<Item>" + `<ItemType>${type}</ItemType>` + "</Item>";
}

export function cellToXML({
  type,
  row,
  column,
  items = [],
  offsetX = 0,
  offsetY = 0
}) {
  return (
    "<Item>" +
    `<EntityType>${type}</EntityType>` +
    `<Row>${row}</Row>` +
    `<Column>${column}</Column>` +
    `<OffsetX>${offsetX}</OffsetX>` +
    `<OffsetY>${offsetY}</OffsetY>` +
    "<EntityItems>" +
    items.map(item => itemToXML(item)).join("\n") +
    "</EntityItems>" +
    "</Item>"
  );
}
