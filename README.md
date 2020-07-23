# Introduction

An embeddable iframe wallet that is keyper compatible. Keyper is a lightweight ownership layer for Nervos Network that makes it easier and simpler to work with the many different types of ownership that can be expressed due to the flexible programming model and myriad lock scripts already being developed.

This wallet is not production ready at this time but is used for demonstrations. See my token mint project for an example of its use in a full stack application: [Token Mint Demo](https://github.com/WilfredTA/token_mint).



# Install

`git clone --recurse-submodules https://github.com/WilfredTA/keyper-web-wallet`

`npm i`

`cd packages/wallet && npm i`

`npm run build`


## Todo

1. Bump keyper container to 0.1.0
2. Add second package for wallet UI
3. Add NFT lock to wallet/locks
4. Add mnemonic seed
5. Add address-based auth
6. 