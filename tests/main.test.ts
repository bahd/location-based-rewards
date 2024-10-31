import { Clarinet, Tx, Chain, Account, Cost, types } from "clarinet";
import { assertEquals } from "https://deno.land/std@0.177.0/testing/asserts.ts";

Clarinet.test({
  name: "main: integration test",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const user = accounts.get("wallet_1")!;

    // Add a new destination
    let result = chain.mineBlock([
      Tx.contractCall(
        "destinations",
        "add-destination",
        [
          types.tuple({ lat: types.int(40.73061), lon: types.int(-73.935242) }),
          types.ascii("Times Square"),
          types.uint(50),
        ],
        deployer.address
      ),
    ]);

    // Stake at the added destination
    result = chain.mineBlock([
      Tx.contractCall(
        "destinations",
        "stake-location",
        [types.int(40.73061), types.int(-73.935242)],
        user.address
      ),
    ]);

    // Verify that the user received the tokens
    result = chain.mineBlock([
      Tx.contractCall(
        "location-tokens",
        "get-balance",
        [types.principal(user.address)],
        user.address
      ),
    ]);
    assertEquals(result.receipts.length, 1);
    assertEquals(result.receipts[0].result, "50");

    // Redeem the tokens
    result = chain.mineBlock([
      Tx.contractCall(
        "location-tokens",
        "redeem-tokens",
        [types.uint(50)],
        user.address
      ),
    ]);
    assertEquals(result.receipts.length, 1);
    assertEquals(result.receipts[0].events.length, 1);
    assertEquals(result.receipts[0].events[0].type, "contract-event");
    assertEquals(result.receipts[0].events[0].data.amount, "50");
  },
});
