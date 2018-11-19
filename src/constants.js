import emptyImg from "./assets/empty-img.png";
import marioImg from "./assets/mario-img.png";
import usedImg from "./assets/used-img.png";
import brickImg from "./assets/brick-img.png";
import questionImg from "./assets/question-img.png";
import floorImg from "./assets/floor-img.png";
import stairImg from "./assets/stair-img.png";
import redKoopaImg from "./assets/red-koopa-img.png";
import greenKoopaImg from "./assets/green-koopa-img.png";
import goombaImg from "./assets/goomba-img.png";
import hiddenImg from "./assets/hidden-img.png";
import flagImg from "./assets/flag-img.png";
import redMushroomImg from "./assets/red-mushroom-img.png";
import greenMushroomImg from "./assets/green-mushroom-img.png";
import starmanImg from "./assets/starman-img.png";
import fireImg from "./assets/fire-img.png";
import coinImg from "./assets/coin-img.png";

export const SOURCES = [
  emptyImg,
  marioImg,
  usedImg,
  brickImg,
  questionImg,
  floorImg,
  stairImg,
  redKoopaImg,
  greenKoopaImg,
  goombaImg,
  hiddenImg,
  flagImg,
  // Item indexes (start at 12)
  greenMushroomImg,
  redMushroomImg,
  coinImg,
  fireImg,
  starmanImg
];

export const LEVEL_EXAMPLE = `
<?xml version="1.0" encoding="utf-8"?>
<LevelAsset>
  <Height>int</Height>
  <Width>int</Width>
  <Entities>
    <Item>
      <EntityType>int</EntityType>
      <Row>int</Row>
      <Column>int</Column>
      <OffsetX>int</OffsetX>
      <OffsetY>int</OffsetY>
      <EntityItems>
        <Item>
          <ItemType>int</ItemType>
        </Item>
      </EntityItems>
    </Item>
  </Entities>
</LevelAsset>
`;
