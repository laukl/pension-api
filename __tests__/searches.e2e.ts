import { describe, expect, test } from "@jest/globals";
import { PotSearch } from "@prisma/client";

describe("end-to-end searches routes", () => {
  test("get all searches", async () => {
    const data = await fetch("http://localhost:3000/searches").then(
      (res) => res.json() as Promise<PotSearch[]>,
    );
    expect(data).not.toBeNull();
    expect(data.length).toEqual(2);
  });

  test("get all FOUND searches", async () => {
    const data = await fetch(
      "http://localhost:3000/searches?status=FOUND",
    ).then((res) => res.json() as Promise<PotSearch[]>);
    expect(data).not.toBeNull();
    expect(data.length).toEqual(1);
  });

  test("get all TO_HUNT searches", async () => {
    const data = await fetch(
      "http://localhost:3000/searches?status=TO_HUNT",
    ).then((res) => res.json() as Promise<PotSearch[]>);
    expect(data).not.toBeNull();
    expect(data.length).toEqual(1);
  });
});
