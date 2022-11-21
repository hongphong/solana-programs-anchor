// Example abount Cross-Program Invocations
// Often it's useful for programs to interact with each other. In Solana this is achieved via Cross-Program Invocations (CPIs).
// Consider the following example of a puppet and a puppet master. Admittedly, it is not very realistic but it allows us to show you the many nuances of CPIs. 
// The milestone project of the intermediate section covers a more realistic program with multiple CPIs.
use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod solana_example_cpi {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
