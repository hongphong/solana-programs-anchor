const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;


describe('solana_example_counter', () => {
 
    const provider = anchor.Provider.env();
    anchor.setProvider(provider);
    const program = anchor.workspace.solana_example_counter;
    console.log(program)
    // To be filled in by the create test and used by the increment test.
    // let _baseAccount;

    // Tests here

});