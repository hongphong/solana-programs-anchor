use anchor_lang::prelude::*;

declare_id!("EocvjwaAyd7pxUqYNQCyvBD9pKTip1axngq48W4bZXUu");

#[program]
pub mod solana_example_counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, start: u64) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.authority = *ctx.accounts.authority.key;
        counter.count = start;
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = authority, space = 8 + 40)] //all accounts need 8 bytes for the account discriminator prepended to the account <https://docs.rs/anchor-lang/0.25.0/anchor_lang/attr.account.html>
    pub counter: Account<'info, Counter>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut, has_one = authority)]
    pub counter: Account<'info, Counter>,
    pub authority: Signer<'info>,
}

// Define account that hold data and size is 40 bytes
#[account]
pub struct Counter {
    pub authority: Pubkey, //32 bytes
    pub count: u64, // 8 bytes
}
