# Rust turorai
Docs: https://learning-rust.github.io/docs/
## Install Cargo and Rust Env
Docs: https://learning-rust.github.io/docs/installation/
-- install rustc: curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
-- create projects with cargo:
>   Create a new project: cargo new
    Create a new project in an existing directory: cargo init
    Build the project: cargo build
    Run the project: cargo run
    Update project dependencies: cargo update
    Run tests: cargo test
    Run benchmarks: cargo bench
    Generate the project documentation via rustdoc: cargo doc
    Analyze the project to see it has any errors, without building it: cargo check
## Some definitions need to focus on Rust
####-- Ownership: 
    + https://www.educative.io/answers/moving-ownership-in-rust
    + https://blog.thoughtram.io/ownership-in-rust/
####-- Reference: 
    + https://www.educative.io/answers/how-to-use-references-in-rust
    + https://blog.thoughtram.io/references-in-rust/



# Solana Overview
## Architecutre:
Docs: https://www.youtube.com/watch?v=izV2Ev3To_s
https://medium.com/solana-labs/proof-of-history-a-clock-for-blockchain-cf47a61a9274
There 4 main layers:
-- Setup Layer: 
   + Gulf Stream: Transfer transaction from clients to Leader Validator
   + Turbine: Transfer messages betwwen validators (Gossip)
   + Crypto Building Blocks (Hash, signature...)
   + PoH
   + Archivers: Store historical data
-- Consensus Layer: Tower BFT
-- Runtime Layter: 
   + Cloudbreak, 
   + Pipelining (Solana TPU (transaction per unit)) 
   + Sealevel
-- Application SC Layer: Wallets, Solana Programs

# Install ENV:
-- Set testnet url:  solana config set --url http://api.devnet.solana.com    
-- Generate keypair: solana-keygen new --outfile keypair/test-keypair.json
-- Set keypair: solana config set --keypair <path>
-- Set airdrop: solana airdrop 2

# Build programs:
- build: npm run build:program-rust 
- deploy to devnet: solana program deploy dist/program/helloworld.so
- test program with client: npm start
# Install Anchor
### Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
export PATH="$HOME/.cargo/bin:$PATH"
##### check:
rustup --version
rustc --version
cargo --version
### Install Solana
sh -c "$(curl -sSfL https://release.solana.com/v1.9.4/install)"
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"
##### check
solana --version
solana-test-validator

#### ENV:
-- Set testnet url:  solana config set --url http://api.devnet.solana.com    
-- Generate keypair: solana-keygen new --outfile keypair/test-keypair.json
-- Set keypair: solana config set --keypair <path>
-- Set airdrop: solana airdrop 2
### Install anchor:
cargo install --git https://github.com/project-serum/anchor anchor-cli --locked

### Install yarn
npm install -g yarn
brew install yarn

# Developing with anchor
### Init project 
anchor init <project name>

### deploy
anchor deploy --provider.cluster devnet