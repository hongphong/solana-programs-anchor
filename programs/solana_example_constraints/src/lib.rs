use anchor_lang::prelude::*;
use anchor_spl::token::TokenAccount;

declare_id!("3AVrFfBQdN5UR9sdaEUjwkmYBcqLKAknhqqamZ9idPP2");

#[program]
pub mod solana_example_constraints {
    use super::*;

    pub fn init_by_constraint(ctx: Context<InitAcc>, data: u64) -> Result<()> {
        if data > 0 {
            ctx.accounts.new_acc.data = data;
            msg!(
                "Set data for account: {:?}",
                ctx.accounts.new_acc.key().to_owned()
            )
        }
        ctx.accounts.new_acc.owner = *ctx.accounts.payer.key;
        Ok(())
    }

    pub fn verify_owner(ctx: Context<VerifyOwner>) -> Result<()> {
        Ok(())
    }
}

#[account]
pub struct NewAcc {
    data: u64,
    owner: Pubkey,
}

#[derive(Accounts)]
pub struct InitAcc<'info> {
    #[account(init, payer = payer, space = 8+8+32)]
    new_acc: Account<'info, NewAcc>,
    #[account(mut)]
    payer: Signer<'info>, // or using derivie (#[account(signer)]),
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct VerifyOwner<'info> {
    #[account(constraint = authority.key == &token.owner)]
    token: Account<'info, TokenAccount>,
    authority: Signer<'info>,
}
