import { describe, expect, test } from "@jest/globals";
import { PensionPot } from "@prisma/client";

describe("end-to-end pots routes", () => {
  test("get all pots", async () => {
    const data = await fetch("http://localhost:3000/pots").then(
      (res) => res.json() as Promise<PensionPot[]>,
    );
    expect(data).not.toBeNull();
    expect(data.length).toEqual(9);
  });

  test("get pension pots", async () => {
    const data = await fetch("http://localhost:3000/pots/pensions").then(
      (res) => res.json() as Promise<PensionPot[]>,
    );
    expect(data).not.toBeNull();
    expect(data.length).toEqual(7);
  });
});
