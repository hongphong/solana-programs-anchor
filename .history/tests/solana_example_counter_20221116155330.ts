const assert = require('assert');
const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;

describe('p0001', () => {
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.p0001;
  // To be filled in by the create test and used by the increment test.
  let _baseAccount;

  // Tests here
});