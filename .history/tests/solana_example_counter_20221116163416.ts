const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;


describe('solana_example_counter', () => {

    const provider = anchor.AnchorProvider.env();

    // Configure the client to use the local cluster.
    anchor.setProvider(provider);

});