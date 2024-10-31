# Dynamic Location-Based Token Rewards
A decentralized application built on the Stacks blockchain that enables users to earn tokens by visiting specific locations. These tokens can be redeemed for exclusive local experiences or used to fund future travel projects.
Features

### Location-based Token Minting: Users earn tokens by visiting specific destinations
### GPS Verification: Uses geo-staking to verify user presence at locations
### Reward System: Different locations offer varying amounts of tokens
### Token Redemption: Earned tokens can be exchanged for experiences or travel funding

## Prerequisites
Before you begin, ensure you have installed the following:

`Rust`
`Clarinet`
`Stacks Wallet`

## Project Structure

location-based-rewards/
├── contracts/
│   ├── LocationTokens.clar    # Token definition and redemption logic
│   ├── Destinations.clar      # Destination and staking logic
│   └── main.clar             # Main contract entry point
├── tests/
│   ├── LocationTokens.test.ts # Token tests
│   ├── Destinations.test.ts   # Destination tests
│   └── main.test.ts          # Integration tests
└── package.json

## Smart Contract Functions

#### LocationTokens Contract

`ft-mint`: Mints new location tokens
`ft-burn`: Burns location tokens
redeem-tokens: Redeems tokens for experiences

#### Destinations Contract

`stake-location`: Verifies user location and mints tokens
`add-destination`: Adds a new destination to the map
`get-destination`: Retrieves destination information