import { describe, expect, test } from "@jest/globals";
import { PensionPot, Prisma } from "@prisma/client";

describe("end-to-end pots routes", () => {
  test("get pension pots", async () => {
    const pots = await fetch("http://localhost:3000/pots/pensions").then(
      (res) => res.json() as Promise<PensionPot[]>,
    );
    expect(pots).not.toBeNull();
    expect(pots.length).toEqual(7);
  });

  test("get all pots", async () => {
    const pots = await fetch("http://localhost:3000/pots").then(
      (res) => res.json() as Promise<PensionPot[]>,
    );
    expect(pots).not.toBeNull();
    expect(pots.length).toEqual(9);
  });

  test.each([
    ["soft", "Microsoft"],
    ["Min", "Mintago"],
    ["Google", "Google"],
  ])("search for a specific pot by name", async (name, expected) => {
    const pots = await fetch(`http://localhost:3000/pots?name=${name}`).then(
      (res) => res.json() as Promise<PensionPot[]>,
    );
    expect(pots.length).toEqual(1);
    expect(pots.at(0)?.potName).toEqual(expected);
  });

  test.each([
    ["3e2bfea6-d7bb-4ef6-8dea-2a149b4ef24c", "Pot 1"],
    ["1509481e-565d-444a-8e24-d72d3244b663", "Mintago"],
    ["5de51030-02f3-48c0-bd54-024120bac5ba", "IBM"],
  ])("search for a specific pot by id", async (id, expected) => {
    const pot = await fetch(`http://localhost:3000/pots/${id}`).then(
      (res) => res.json() as Promise<PensionPot>,
    );
    expect(pot.potName).toEqual(expected);
  });

  test.each([
    [3000, "gt", 6],
    [3000, "lt", 3],
    [40000, "gte", 3],
    [40000, "lte", 8],
  ])(
    "search for pots with amount",
    async (amount, comparator, expectedLength) => {
      const pots = await fetch(
        `http://localhost:3000/pots?amount=${amount}&amountComparator=${comparator}`,
      ).then((res) => res.json() as Promise<PensionPot[]>);
      expect(pots.length).toEqual(expectedLength);
    },
  );

  test.each(["Telegraph", "IBM", "Homebase"])(
    "find all pots with a specific employer",
    async (employer) => {
      const pots = await fetch(
        `http://localhost:3000/pots?employer=${employer}`,
      ).then((res) => res.json() as Promise<PensionPot[]>);
      expect(pots.at(0)?.employer).toEqual(employer);
    },
  );

  test.each([
    ["AVIVA", "Aviva"],
    ["SCOTTISH_WIDOWS", "Scottish Widows"],
  ])(
    "find all pots with a specific pension provider",
    async (provider, expected) => {
      const pots = await fetch(
        `http://localhost:3000/pots?provider=${provider}`,
      ).then(
        (res) =>
          res.json() as Promise<
            Prisma.PensionPotGetPayload<{ include: { provider: true } }>[]
          >,
      );
      expect(pots.at(0)?.provider?.name).toEqual(expected);
    },
  );

  test.each([
    [10, 1500, 6],
    [30, 1500, 7],
    [5, 40000, 4],
    [30, 40000, 6],
  ])(
    "get all pension pots with a forecasted balance",
    async (years, amount, expected) => {
      const pots = await fetch(
        `http://localhost:3000/pots?forecastYears=${years}&forecastAmount=${amount}`,
      ).then((res) => res.json() as Promise<PensionPot[]>);
      expect(pots.length).toEqual(expected);
    },
  );
});
