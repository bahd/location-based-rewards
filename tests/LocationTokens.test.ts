import { Clarinet, Tx, Chain, Account, Cost, types } from "clarinet";
import { assertEquals } from "https://deno.land/std@0.177.0/testing/asserts.ts";

Clarinet.test({
  name: "location-tokens: can mint and burn tokens",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const owner = accounts.get("deployer")!;
    const user = accounts.get("wallet_1")!;

    // Mint tokens to the owner
    let result = chain.mineBlock([
      Tx.contractCall(
        "location-tokens",
        "mint",
        [types.principal(owner.address), types.uint(100)],
        owner.address
      ),
    ]);
    assertEquals(result.receipts.length, 1);
    assertEquals(result.receipts[0].events.length, 1);
    assertEquals(result.receipts[0].events[0].type, "nft-mint-event");
    assertEquals(result.receipts[0].events[0].data.amount, "100");

    // Burn tokens from the owner
    result = chain.mineBlock([
      Tx.contractCall(
        "location-tokens",
        "burn",
        [types.principal(owner.address), types.uint(50)],
        owner.address
      ),
    ]);
    assertEquals(result.receipts.length, 1);
    assertEquals(result.receipts[0].events.length, 1);
    assertEquals(result.receipts[0].events[0].type, "nft-burn-event");
    assertEquals(result.receipts[0].events[0].data.amount, "50");
  },
});
