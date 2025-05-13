import { describe, expect, test } from "@jest/globals";
import { PensionProvider } from "@prisma/client";

describe("end-to-end providers routes", () => {
  test("get all providers", async () => {
    const providers = await fetch("http://localhost:3000/providers").then(
      (res) => res.json() as Promise<PensionProvider[]>,
    );
    const providerNames = providers.map((provider) => provider.name);
    expect(providers).not.toBeNull();
    expect(providers.length).toEqual(2);
    expect(providerNames).toContain("Aviva");
    expect(providerNames).toContain("Scottish Widows");
  });
});
