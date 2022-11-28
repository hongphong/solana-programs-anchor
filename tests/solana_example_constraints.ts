import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
const assert = require("assert");
const anchor = require("@project-serum/anchor");
import { Program, web3, Provider, Wallet, AnchorError } from "@project-serum/anchor";
import { IDL } from "../target/types/solana_example_constraints.ts";
import idl from "../target/idl/solana_example_constraints.json"
const { SystemProgram } = anchor.web3;
import { PublicKey } from '@solana/web3.js';
import { BN } from 'bn.js';

describe("solana_example_constraints", () => {
    const provider = anchor.AnchorProvider.env()
    anchor.setProvider(provider);
    const program = anchor.workspace.SolanaExampleConstraints as Program<IDL>;
    console.log(`Check programId: ${program.programId.toString()}`)
    console.log(`Current wallet: ${provider.wallet.publicKey.toString()}`)

    // Define test-cases
    it("[Test 1]: Test init account by constraints", async () => {
        // The Account to create.
        await Promise.resolve();
        const initAcc = anchor.web3.Keypair.generate();
        console.log(`Create new account: ${initAcc.publicKey}`)
        await program
            .methods
            .initByConstraint(new anchor.BN(5))
            .accounts({
                newAcc: initAcc.publicKey,
                payer: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            })//
            .signers([initAcc])
            .rpc();

        // Fetch the newly created account from the cluster.
        const account = await program.account.newAcc.fetch(initAcc.publicKey);
        assert.ok(account.data.eq(new anchor.BN(5)));

    })

    it("[Test 2]: Verify owner by constraints", async () => {
        await Promise.resolve();
        await program
            .methods
            .verifyOwner()
            .accounts({
                token: new PublicKey("3AVrFfBQdN5UR9sdaEUjwkmYBcqLKAknhqqamZ9idPP2"),
                authority: provider.wallet.publicKey
            })
            .rpc();
    })

    it("[Test 3]: Testing custom errors", async () => {
        await Promise.resolve();
        await program
            .methods
            .handlingErrors(new BN(99))
            .accounts({
                authority: provider.wallet.publicKey
            })
            .rpc();
    })

})