import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
const assert = require("assert");
const anchor = require("@project-serum/anchor");
import { Program, web3, Provider, Wallet } from "@project-serum/anchor";
import { IDL } from "../target/types/solana_example_counter.ts";
import idl from "../target/idl/solana_example_counter.json"
const { SystemProgram } = anchor.web3;
import { PublicKey } from '@solana/web3.js';

describe("solana_example_counter", () => {
    const provider = anchor.AnchorProvider.env()
    anchor.setProvider(provider);
    const program = anchor.workspace.SolanaExampleCounter as Program<IDL>;
    console.log(`Check programId: ${program.programId.toString()}`)
    console.log(`Current wallet: ${provider.wallet.publicKey.toString()}`)
    let defaultCounterAcc = new PublicKey("XhrKx3b2gvwg55wBHJnTpWiXsMK2aXLKHLX1RvfByoq");
    // Define test-cases
    it("[Test 1]: Create account to store counter", async () => {
        // The Account to create.
        await Promise.resolve();
        const counterAcc = anchor.web3.Keypair.generate();
        console.log(`New account store counter: ${counterAcc.publicKey}`)
        await program
            .methods
            .initialize(new anchor.BN(1234))
            .accounts({
                counter: counterAcc.publicKey,
                authority: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            }).signers([counterAcc]).rpc();
        // Fetch the newly created account from the cluster.
        const account = await program.account.counter.fetch(counterAcc.publicKey);
        defaultCounterAcc = counterAcc.publicKey;
        // Check it's state was initialized.
        assert.ok(account.count.eq(new anchor.BN(1234)));

    })

    it("[Test 2]: Increament counter", async function () {
        // Invoke the update rpc.
        await Promise.resolve();
        await program.methods.increment().accounts({
            counter: defaultCounterAcc,
            authority: provider.wallet.publicKey,
        }).rpc();
        const data = await program.account.counter.fetch(defaultCounterAcc)
        console.log(`Current counter: ${data.count.toString()}`)
        // Check it's state was mutated.
        assert.ok(data.count >= new anchor.BN(1234)); 
    });
})