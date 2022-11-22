// Example for creating new Token on Solana using Anchor Framework
use anchor_lang::prelude::*;
use anchor_lang::{context::CpiContext, Accounts};
use anchor_spl::token::{mint_to, Mint, MintTo, Token};
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

    pub fn mint_token(ctx: Context<MintToken>, amount: u64) -> Result<()> {
        msg!("Mint token to address");

        let cpi_accounts = MintTo {
            mint: ctx.accounts.mint.to_account_info(),
            to: ctx.accounts.token_account.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        // Create the CpiContext we need for the request
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);

        // Execute anchor's helper function to mint tokens
        mint_to(cpi_ctx, amount)?;
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

#[derive(Accounts)]
pub struct MintToken<'info> {
    /// CHECK: This is the token that we want to mint
    #[account(mut)]
    pub mint: UncheckedAccount<'info>,
    pub token_program: Program<'info, Token>,
    /// CHECK: This is the token account that we want to mint tokens to
    #[account(mut)]
    pub token_account: UncheckedAccount<'info>,
    /// CHECK: the authority of the mint account
    #[account(mut)]
    pub authority: AccountInfo<'info>,
}
