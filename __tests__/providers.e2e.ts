import { describe, expect, test } from "@jest/globals";
import { PotSearch } from "@prisma/client";

describe("end-to-end providers routes", () => {
  test("get all providers", async () => {
    const data = await fetch("http://localhost:3000/providers").then(
      (res) => res.json() as Promise<PotSearch[]>,
    );
    expect(data).not.toBeNull();
    expect(data.length).toEqual(2);
  });
});
