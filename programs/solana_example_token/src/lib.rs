// Example for creating new Token on Solana using Anchor Framework
use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token};

declare_id!("F1ypE56CREbfeCBVreAWJnB8t8VthMftpowviNhKELNY");

#[program]
pub mod solana_example_token {
    use super::*;

    pub fn create_new_token(ctx: Context<NewToken>) -> Result<()> {
        msg!(
            "Generated token with address: {}",
            ctx.accounts.mint.key().to_owned()
        );
        Ok(())
    }
}

#[derive(Accounts)]
pub struct NewToken<'info> {
    // Using marcho derive.Accounts of Anchor to create new Mint Account: https://docs.rs/anchor-lang/latest/anchor_lang/derive.Accounts.html
    #[account(
        init,
        payer = payer,
        mint::decimals = 10,
        mint::authority = payer,
    )]
    pub mint: Account<'info, Mint>,
    #[account(mut)]
    pub payer: Signer<'info>,
    // To complete the transaction, there are some helper accounts that needs to be passed in to the struct
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    ///CHECK: This is not dangerous because we don't read or write from this account
    pub rent: AccountInfo<'info>,
}
