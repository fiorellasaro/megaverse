import { addPolyanets, comeths, soloons } from "../apis/megaverse";

const candidateId = `${process.env.NEXT_PUBLIC_CANDIDATE_ID}`;

const createUniverse = async (astro: string, row: number, column: number) => {
  const [attribute, name] = astro.split("_");

  switch (true) {
    case astro === "POLYANET":
      await addPolyanets({
        candidateId: candidateId,
        row: row,
        column: column,
      });

      break;
    case name === "SOLOON":
      await soloons({
        candidateId: candidateId,
        row: row,
        column: column,
        color: attribute.toLocaleLowerCase(),
      });

      break;
    case name === "COMETH":
      await comeths({
        candidateId: candidateId,
        row: row,
        column: column,
        direction: attribute.toLocaleLowerCase(),
      });

      break;
    default:
      break;
  }
};

export const getMegaverse = async (map: Array<string[]>) => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map.length; j++) {
      createUniverse(map[i][j], i, j);
    }
  }
};
