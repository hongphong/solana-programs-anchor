const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;
const programID = new web3.PublicKey(idl.metadata.address);
const endpoint = "http://127.0.0.1:8899"
const connection = new web3.Connection(endpoint, "processed");
describe("solana_example_counter", () => {
    const provider = anchor.AnchorProvider
    console.log(provider)
    // const provider = anchor.Provider.env();
    // anchor.setProvider(provider);

})