# Rust Tutorial
##### Docs: https://learning-rust.github.io/docs/
## Install Cargo and Rust Env
##### Docs: https://learning-rust.github.io/docs/installation/
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

# Solana Overview
## Architecutre:
Docs: 
+ https://www.youtube.com/watch?v=izV2Ev3To_s
+ https://medium.com/solana-labs/proof-of-history-a-clock-for-blockchain-cf47a61a9274
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

## Install Solana (MacOS)
> sh -c "$(curl -sSfL https://release.solana.com/v1.14.8/install)"

### Verify
> solana --version

### Useful CLI Commands:
-- Set testnet url:  solana config set --url http://api.devnet.solana.com    
-- Generate keypair: solana-keygen new --outfile keypair/test-keypair.json
-- Set keypair: solana config set --keypair <path>
-- Set airdrop: solana airdrop 2
-- Check current public key of current account: solana address
-- Check current state of one account: solana account <account address>
### Install ENV:
-- Set testnet url:  solana config set --url http://api.devnet.solana.com    
-- Generate keypair: solana-keygen new --outfile keypair/test-keypair.json
-- Set keypair: solana config set --keypair <path>
-- Set airdrop: solana airdrop 2

### Build programs:
- build: npm run build:program-rust 
- deploy to devnet: solana program deploy dist/program/helloworld.so
- test program with client: npm start

# INSTALL ANCHOR
##### CHECK ENV
anchor --version

##### START TEST NODE LOCALHOST
solana-test-validator

##### INSTALL ANCHOR:
cargo install --git https://github.com/project-serum/anchor anchor-cli --locked

##### INSTALL YARN
npm install -g yarn
brew install yarn

# DEVELOPING
### Init project 
anchor init <project name>

### Create new program
anchor new <program name>

### Build programs
anchor build
anchor build -p <program name> (For specific program)

### Deploy
anchor deploy --provider.cluster devnet
anchor deploy --provider.cluster devnet -p <program name> (For specific program)

### Docs for CLI: https://book.anchor-lang.com/anchor_references/cli.html

### Usefull Cli:
check publickey from keypair: solana address -k target/deploy/solana_helloworld-keypair.json 

### Test without deploy:
anchor test --skip-deploy --skip-local-validator -provider.cluster <devnet|localnet>
anchor run <script test defined in Anchor.toml> --provider.cluster localnet

