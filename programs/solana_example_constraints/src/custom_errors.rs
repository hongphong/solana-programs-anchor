use anchor_lang::error_code;

#[error_code]
pub enum DataInvalid {
    #[msg("Data is invalid")]
    DataInvalid,
}
