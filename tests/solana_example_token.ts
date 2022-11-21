import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
const assert = require("assert");
const anchor = require("@project-serum/anchor");
import { Program, web3, Provider, Wallet } from "@project-serum/anchor";
import { IDL } from "../target/types/solana_example_token.ts";
import idl from "../target/idl/solana_example_token.json"
const { SystemProgram } = anchor.web3;
import { PublicKey } from '@solana/web3.js';
import {
    TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

describe("solana_example_token", () => {
    const provider = anchor.AnchorProvider.env()
    anchor.setProvider(provider);
    const program = anchor.workspace.SolanaExampleToken as Program<IDL>;
    console.log(`Check programId: ${program.programId.toString()}`)
    console.log(`Current wallet: ${provider.wallet.publicKey.toString()}`)
  

    // Define test-cases
    it("[Test 1]: Generate new token address", async () => {
        const mint = anchor.web3.Keypair.generate()
        await program
            .methods
            .createNewToken()
            .accounts({
                mint: mint.publicKey,
                payer: provider.wallet.publicKey,
                // To complete the transaction, there are some helper accounts that needs to be passed in to the struct
                token_program: TOKEN_PROGRAM_ID,
                system_program: anchor.web3.SystemProgram.programId,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY
            }).signers([mint]).rpc();

    })


})