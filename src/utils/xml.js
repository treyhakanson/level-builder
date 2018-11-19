function itemToXML(type) {
  return "<Item>" + `<ItemType>${type}</ItemType>` + "</Item>";
}

function cellToXML({
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

export function gridToXML(grid) {
  let cells = [];
  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell.type === undefined) {
        return;
      }
      let cellCopy = { ...cell };
      cellCopy.row = i;
      cellCopy.column = j;
      cells.push(cellToXML(cellCopy));
    });
  });
  const xml =
    '<?xml version="1.0" encoding="utf-8"?>' +
    "<LevelAsset>" +
    `<Height>${grid.length * 16}</Height>` +
    `<Width>${grid[0].length * 16}</Width>` +
    `<Entities>${cells.join("\n")}</Entities>` +
    "</LevelAsset>";
  return xml;
}
