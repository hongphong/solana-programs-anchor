import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaHelloworld } from "../target/types/solana_helloworld";

describe("solana-helloworld", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaHelloworld as Program<SolanaHelloworld>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
