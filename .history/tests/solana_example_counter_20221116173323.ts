import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
const assert = require("assert");
const anchor = require("@project-serum/anchor");
import { Program, web3, Provider, Wallet } from "@project-serum/anchor";
import { IDL } from "../target/types/solana_example_counter.ts";
import idl from "../target/idl/solana_example_counter.json"
const { SystemProgram } = anchor.web3;
const programID = new web3.PublicKey(idl.metadata.address);
// const endpoint = "http://127.0.0.1:8899"
// const connection = new web3.Connection(endpoint, "processed");
describe("solana_example_counter", () => {
    const provider = anchor.AnchorProvider.env()
    console.log(anchor.Provider)
    // const provider = anchor.Provider.env();
    // anchor.setProvider(provider);

})