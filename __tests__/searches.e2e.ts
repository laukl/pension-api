import { describe, expect, test } from "@jest/globals";
import { Prisma } from "@prisma/client";

describe("end-to-end searches routes", () => {
  test("get all searches", async () => {
    const searches = await fetch("http://localhost:3000/searches").then(
      (res) =>
        res.json() as Promise<
          Prisma.PotSearchGetPayload<{ include: { pot: true } }>[]
        >,
    );
    expect(searches).not.toBeNull();
    expect(searches.length).toEqual(2);
    expect(searches.at(0)?.pot).not.toBeNull();
    expect(searches.at(1)?.pot).not.toBeNull();
  });

  test("get all FOUND searches", async () => {
    const searches = await fetch(
      "http://localhost:3000/searches?status=FOUND",
    ).then(
      (res) =>
        res.json() as Promise<
          Prisma.PotSearchGetPayload<{ include: { pot: true } }>[]
        >,
    );
    expect(searches).not.toBeNull();
    expect(searches.length).toEqual(1);
    expect(searches.at(0)?.status).toEqual("FOUND");
    expect(searches.at(0)?.pot).not.toBeNull();
  });

  test("get all TO_HUNT searches", async () => {
    const searches = await fetch(
      "http://localhost:3000/searches?status=TO_HUNT",
    ).then(
      (res) =>
        res.json() as Promise<
          Prisma.PotSearchGetPayload<{ include: { pot: true } }>[]
        >,
    );
    expect(searches).not.toBeNull();
    expect(searches.length).toEqual(1);
    expect(searches.at(0)?.status).toEqual("TO_HUNT");
    expect(searches.at(0)?.pot).not.toBeNull();
  });
});
