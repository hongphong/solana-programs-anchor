import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
const assert = require("assert");
const anchor = require("@project-serum/anchor");
import { Program, web3, Provider, Wallet } from "@project-serum/anchor";
import { IDL } from "../target/types/solana_example_counter.ts";
import idl from "../target/idl/solana_example_counter.json"
const { SystemProgram } = anchor.web3;
const programID = new web3.PublicKey(idl.metadata.address);
describe("solana_example_counter", () => {
    const provider = anchor.AnchorProvider.env()
    anchor.setProvider(provider);
    
})