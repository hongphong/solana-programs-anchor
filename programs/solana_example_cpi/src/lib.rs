// Example abount Cross-Program Invocations
// Often it's useful for programs to interact with each other. In Solana this is achieved via Cross-Program Invocations (CPIs).
// Consider the following example of a puppet and a puppet master. Admittedly, it is not very realistic but it allows us to show you the many nuances of CPIs. 
// The milestone project of the intermediate section covers a more realistic program with multiple CPIs.
use anchor_lang::prelude::*;

// Define program_id
declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

// main body
#[program]
pub mod solana_example_cpi {
    use super::*;
    // define list instructions (methods)

    pub fn instruction_one(ctx: Context<CpxForInstOne>) -> Result<()> {
        Ok(())
    }
    pub fn instruction_two(ctx: Context<CpxForInstTwo>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CpxForInstOne {}

#[derive(Accounts)]
pub struct CpxForInstTwo {}
