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
    getAssociatedTokenAddress,
    MINT_SIZE,
    createAssociatedTokenAccountInstruction,
    createInitializeMintInstruction,
} from "@solana/spl-token";
import { BN } from 'bn.js';

describe("solana_example_token", () => {
    const provider = anchor.AnchorProvider.env()
    anchor.setProvider(provider);
    const program = anchor.workspace.SolanaExampleToken as Program<IDL>;
    console.log(`Check programId: ${program.programId.toString()}`)
    console.log(`Current wallet: ${provider.wallet.publicKey.toString()}`)


    // Define test-cases
    it("[Test 1]: Generate new token address and mint a amount of token", async () => {

        const mint = anchor.web3.Keypair.generate()

        /**
         * Create new token
         */
        await program
            .methods
            .createNewToken()
            .accounts({
                mint: mint.publicKey,
                payer: provider.wallet.publicKey,
                // To complete the transaction, there are some helper accounts that needs to be passed in to the struct
                tokenProgram: TOKEN_PROGRAM_ID,
                systemProgram: anchor.web3.SystemProgram.programId,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY
            }).signers([mint]).rpc();
        console.log(`Token has created: ${mint.publicKey.toString()}`)

        /**
         * Need to create Associated Token Accounts (ATA) before mint to 
         * Create Associated Token accounts
         */
        let associatedTokenAccount = await getAssociatedTokenAddress(
            mint.publicKey ? mint.publicKey : mint,
            provider.wallet.publicKey,
        );
        console.log(`New associated account will be generated: ${associatedTokenAccount.toString()}`)
        const res = await provider.sendAndConfirm(new anchor.web3.Transaction().add(
            // Create the ATA account that is associated with our mint on our anchor wallet
            createAssociatedTokenAccountInstruction(
                provider.wallet.publicKey,
                associatedTokenAccount,
                provider.wallet.publicKey,
                mint.publicKey
            )
        ), [provider.wallet.payer]);
        
        /**
         * Start to mint token
         */
        const tx = await program
            .methods
            .mintToken(new BN(1000))
            .accounts({
                mint: mint.publicKey,
                tokenProgram: TOKEN_PROGRAM_ID,
                tokenAccount: associatedTokenAccount,
                authority: provider.wallet.publicKey
            }).rpc();
        console.log(`Final transaction: ${tx}`)
    })


})