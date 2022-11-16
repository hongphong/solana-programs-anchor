use anchor_lang::prelude::*;

declare_id!("GjzSfNKNVjdc58HJrhYDPfuv5h8ifkcNnfMhWAf5j8zF");

#[program]
pub mod solana_example_counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
