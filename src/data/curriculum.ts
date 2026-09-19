export interface CourseTopicGroup {
  number: string;
  title: string;
  note?: string;
  subgroups?: {
    subtitle: string;
    items: string[];
  }[];
  items?: string[];
}

export interface CapstoneOption {
  code: string;
  title: string;
  description: string;
  tag: string;
}

export interface CourseModuleData {
  id: string;
  number: string;
  title: string;
  weeks: string;
  headlineNote?: string;
  learningObjectives?: string[];
  sections: CourseTopicGroup[];
  modernSolidityNote?: {
    title: string;
    description: string;
    highlightPill?: string;
  };
  tools?: string[];
  deliverables?: string[];
  capstoneProjects?: CapstoneOption[];
  capstoneDeliverables?: string[];
}

export interface BkaSolidityCourse {
  title: string;
  subtitle: string;
  author: string;
  authorRole: string;
  duration: string;
  totalWeeks: number;
  compilerTarget: string;
  modules: CourseModuleData[];
}

export const bkaSolidityCourseData: BkaSolidityCourse = {
  title: "Blockchain from Basic to Advance in Solidity",
  subtitle: "Comprehensive 16-Week Protocol & Smart Contract Engineering Curriculum",
  author: "PS BHARATH KUMAR ACHARI (BKA)",
  authorRole: "Blockchain Protocol Engineer & Technical Educator",
  duration: "16 Weeks (4 Intensive Modules)",
  totalWeeks: 16,
  compilerTarget: "Solidity 0.8.37 (Latest Stable Toolchain) • Foundry • Hardhat",
  modules: [
    {
      id: "mod-01",
      number: "01",
      title: "Blockchain Foundations & Solidity Essentials",
      weeks: "Weeks 1–4",
      learningObjectives: [
        "Understand blockchain fundamentals and distributed ledger systems.",
        "Understand centralized, decentralized, and distributed architectures.",
        "Learn PoW, PoS, DPoS and validator-based consensus models.",
        "Understand cryptographic hashing, digital signatures, key pairs and wallets.",
        "Understand Ethereum architecture and the EVM.",
        "Understand accounts, transactions, gas, calldata, memory and storage.",
        "Set up a professional Solidity development environment.",
        "Write, test and deploy your first Solidity smart contracts.",
      ],
      sections: [
        {
          number: "1",
          title: "Introduction to Blockchain Technology",
          items: [
            "History and evolution of blockchain",
            "Centralized vs decentralized systems",
            "Permissioned vs permissionless networks",
            "Blockchain terminology",
            "State machines and deterministic execution",
            "Blocks, transactions and state transitions",
            "Blockchain finality and confirmations",
          ],
        },
        {
          number: "2",
          title: "Blockchain Architecture & Consensus",
          items: [
            "Blocks and transactions",
            "Merkle Trees and state commitments",
            "Nodes and peer-to-peer networking",
            "Miners vs validators",
            "Proof of Work",
            "Proof of Stake",
            "Delegated Proof of Stake",
            "Finality concepts",
            "Forks and chain reorganizations",
          ],
        },
        {
          number: "3",
          title: "Cryptography & Wallets",
          items: [
            "Hash functions",
            "Keccak-256",
            "Public/private key cryptography",
            "Digital signatures",
            "ECDSA",
            "Addresses",
            "Seed phrases and key management",
            "EOAs vs contract accounts",
            "MetaMask and WalletConnect",
          ],
        },
        {
          number: "4",
          title: "Ethereum & EVM Architecture",
          items: [
            "Ethereum network architecture",
            "EVM execution model",
            "Accounts and state",
            "Transactions",
            "Gas and gas estimation",
            "Opcodes and bytecode",
            "Calldata, memory and storage",
            "Contract creation and deployment",
            "RPC and JSON-RPC",
            "Mainnet and testnets",
          ],
        },
        {
          number: "5",
          title: "Solidity Fundamentals",
          items: [
            "Solidity compiler and versioning",
            "Contract structure",
            "Variables and data types",
            "Arrays, mappings and structs",
            "Functions",
            "Visibility and mutability",
            "Modifiers",
            "Events",
            "Custom errors",
            "require, revert and assert",
            "Interfaces and libraries",
            "Inheritance",
            "Function selectors",
            "Receive and fallback functions",
          ],
        },
      ],
      modernSolidityNote: {
        title: "Modern Solidity Addition",
        description:
          "Introduce students to the latest stable Solidity toolchain, currently Solidity 0.8.37, rather than teaching an old compiler version.",
        highlightPill: "Solidity 0.8.37 Stable",
      },
      tools: [
        "Remix",
        "VS Code",
        "Foundry",
        "Hardhat",
        "MetaMask",
        "Git",
        "GitHub",
        "Alchemy",
        "Infura",
      ],
      deliverables: [
        "Deploy a Simple Storage contract",
        "Build a Counter contract",
        "Build a Wallet contract",
        "Deploy to a testnet",
        "Write basic unit tests",
        "GitHub repository with source code",
        "Module quiz and practical assessment",
      ],
    },
    {
      id: "mod-02",
      number: "02",
      title: "Professional Smart Contract Development",
      weeks: "Weeks 5–8",
      headlineNote: "Deepening architecture with production token standards, transient storage & Foundry testing.",
      sections: [
        {
          number: "1",
          title: "ERC Standards & Token Engineering",
          items: [
            "ERC-20",
            "ERC-721",
            "ERC-1155",
            "ERC-165",
            "ERC-2612 Permit",
            "ERC-2981",
            "ERC-4626 Tokenized Vaults",
            "Minting and burning",
            "Token transfers",
            "Access control",
            "Token metadata",
          ],
        },
        {
          number: "2",
          title: "OpenZeppelin & Reusable Architecture",
          items: [
            "OpenZeppelin Contracts",
            "Ownable",
            "AccessControl",
            "Pausable",
            "ReentrancyGuard",
            "SafeERC20",
            "Contract interfaces",
            "Libraries",
            "Upgradeable contracts",
            "Transparent Proxy",
            "UUPS Proxy",
            "Proxy storage concepts",
          ],
        },
        {
          number: "3",
          title: "Solidity Storage & Data Locations",
          note: "Critical curriculum addition on EVM memory hierarchies and namespaced layouts.",
          items: [
            "Storage",
            "Memory",
            "Calldata",
            "Stack",
            "Transient storage (TSTORE / TLOAD)",
            "Storage slots",
            "Storage packing",
            "Mapping storage",
            "Dynamic arrays",
            "Storage layout",
            "Storage collisions",
          ],
        },
        {
          number: "4",
          title: "Testing & Development",
          subgroups: [
            {
              subtitle: "Hardhat",
              items: [
                "Project structure",
                "Compilation",
                "Deployment scripts",
                "Testing",
                "Network configuration",
                "Debugging",
              ],
            },
            {
              subtitle: "Foundry",
              items: [
                "Forge",
                "Anvil",
                "Cast",
                "Solidity-based tests",
                "Fuzz testing",
                "Invariant testing",
                "Gas snapshots",
              ],
            },
            {
              subtitle: "Testing Concepts",
              items: [
                "Unit testing",
                "Integration testing",
                "Fuzz testing",
                "Invariant testing",
                "Edge cases",
                "Revert testing",
                "Event testing",
              ],
            },
          ],
        },
        {
          number: "5",
          title: "Frontend & Blockchain Integration",
          items: [
            "Ethers.js",
            "Viem",
            "Web3.js",
            "Wallet connections",
            "Contract ABI",
            "Contract reads",
            "Contract writes",
            "Transaction lifecycle",
            "Event listeners",
            "Error handling",
            "React / Next.js Web3 integration",
          ],
        },
      ],
      modernSolidityNote: {
        title: "Transient & Namespaced Storage (Solidity 0.8.35+)",
        description:
          "Modern Solidity supports transient storage using TSTORE and TLOAD, with transaction-scoped lifetime and distinct gas dynamics from persistent storage. Also introduces ERC-7201 namespaced storage for collision prevention in upgradeable contracts, utilizing the erc7201 compiler builtin added in Solidity 0.8.35.",
        highlightPill: "TSTORE / TLOAD + ERC-7201 Builtin",
      },
      tools: [
        "Foundry (Forge, Anvil, Cast)",
        "Hardhat",
        "OpenZeppelin Contracts",
        "Viem",
        "Wagmi",
        "Next.js",
        "Ethers.js",
      ],
      deliverables: [
        "ERC-20 token",
        "ERC-721 NFT",
        "ERC-4626 vault",
        "Upgradeable contract",
        "Automated test suite",
        "Web3 frontend",
        "Testnet deployment",
        "Code review",
      ],
    },
    {
      id: "mod-03",
      number: "03",
      title: "Advanced Solidity, Protocols & Security",
      weeks: "Weeks 9–12",
      headlineNote: "Engineering-oriented protocol architecture, EVM compilation internals & DeFi mechanics.",
      sections: [
        {
          number: "1",
          title: "Advanced Solidity",
          items: [
            "Interfaces",
            "Abstract contracts",
            "Inheritance",
            "Libraries",
            "Factory pattern",
            "Minimal proxy / Clones",
            "CREATE2",
            "Delegatecall",
            "Function selectors",
            "Low-level calls",
            "Inline assembly / Yul",
            "Custom storage layouts",
            "Gas optimization",
          ],
        },
        {
          number: "2",
          title: "Modern Solidity & EVM Features",
          items: [
            "IR-based compilation",
            "--via-ir",
            "Yul intermediate language",
            "Transient storage",
            "ERC-7201 namespaced storage",
            "Storage layout analysis",
            "Compiler optimization",
            "EVM version targeting",
            "Compiler security advisories",
          ],
        },
        {
          number: "3",
          title: "DeFi & Protocol Engineering",
          items: [
            "AMMs",
            "Liquidity pools",
            "Swaps",
            "Staking",
            "Lending",
            "Borrowing",
            "Tokenized vaults",
            "Flash loans",
            "Price oracles",
            "Slippage",
            "TWAP (Time-Weighted Average Price)",
            "Protocol fees",
            "Liquidity accounting",
          ],
        },
        {
          number: "4",
          title: "DAO & Governance",
          items: [
            "Governance tokens",
            "Voting",
            "Proposal lifecycle",
            "Timelocks",
            "Treasury management",
            "Multisig",
            "Delegation",
            "Snapshot-based governance",
            "On-chain governance",
          ],
        },
        {
          number: "5",
          title: "Oracles & External Data",
          items: [
            "Chainlink Data Feeds",
            "Chainlink VRF (Verifiable Random Function)",
            "Oracle architecture",
            "Oracle manipulation",
            "Price-feed validation",
            "Off-chain → on-chain data flow",
          ],
        },
        {
          number: "6",
          title: "Layer 2 & Scaling",
          items: [
            "Why Layer 2 exists",
            "Optimistic rollups",
            "Arbitrum",
            "Optimism",
            "zk-rollups",
            "zkSync",
            "Transaction batching",
            "Bridging concepts",
            "L1 / L2 messaging",
            "Gas differences between L1 and L2",
          ],
        },
      ],
      modernSolidityNote: {
        title: "IR-Based Pipeline & EVM Targeting",
        description:
          "The Solidity compiler is actively evolving with major changes to the IR pipeline (--via-ir), bytecode generation optimizations, and new EVM opcode support. We teach students how to inspect compiler advisories and target EVM versions safely.",
        highlightPill: "--via-ir + Yul Pipeline",
      },
      tools: [
        "Yul",
        "Foundry",
        "Chainlink Feeds & VRF",
        "Uniswap V2/V3 Architecture",
        "Arbitrum / Optimism Testnets",
      ],
      deliverables: [
        "Decentralized AMM swap pair contract",
        "Flash loan receiver integration",
        "Timelock governance system",
        "Chainlink oracle integration with staleness checks",
        "L1-to-L2 message bridging test fixture",
      ],
    },
    {
      id: "mod-04",
      number: "04",
      title: "Smart Contract Security, Auditing & Capstone",
      weeks: "Weeks 13–16",
      headlineNote: "Dedicated security, vulnerability research, formal audit methodology & production capstone.",
      sections: [
        {
          number: "1",
          title: "Smart Contract Security",
          items: [
            "Reentrancy",
            "Access-control vulnerabilities",
            "Integer arithmetic issues",
            "Oracle manipulation",
            "Flash-loan attacks",
            "Signature replay",
            "Front-running",
            "MEV",
            "Denial of service (DoS)",
            "tx.origin vulnerabilities",
            "Delegatecall risks",
            "Initialization vulnerabilities",
            "Proxy vulnerabilities",
            "Storage collisions",
            "Price manipulation",
            "Unchecked external calls",
          ],
        },
        {
          number: "2",
          title: "Smart Contract Security Tools",
          items: [
            "Slither",
            "Echidna",
            "Foundry fuzzing",
            "Foundry invariant testing",
            "Static analysis",
            "Symbolic execution concepts",
            "Formal verification concepts",
          ],
        },
        {
          number: "3",
          title: "Professional Smart Contract Audit",
          items: [
            "Understand contract architecture",
            "Build a threat model",
            "Identify attack surfaces",
            "Perform manual code review",
            "Run automated analysis",
            "Reproduce vulnerabilities",
            "Classify vulnerabilities (Critical, High, Medium, Low)",
            "Write proof-of-concept exploits",
            "Produce an audit report",
            "Recommend remediation",
          ],
        },
        {
          number: "4",
          title: "EIP & Standards Research",
          items: [
            "EIPs (Ethereum Improvement Proposals)",
            "ERCs (Ethereum Request for Comments)",
            "Solidity documentation",
            "OpenZeppelin documentation",
            "Protocol specifications",
            "Security advisories",
          ],
        },
      ],
      modernSolidityNote: {
        title: "Continuous Learning & Modern Tooling",
        description:
          "Dated tooling like MythX is removed in favor of actively maintained industrial tools: Slither, Echidna, and Foundry invariant test runners. Students learn how to read raw EIP specifications and security advisories to stay ahead of future EVM changes.",
        highlightPill: "Slither • Echidna • Foundry Invariants",
      },
      capstoneProjects: [
        {
          code: "PROJECT A",
          title: "DeFi Protocol",
          tag: "DEFI / LIQUIDITY",
          description: "Build a decentralized exchange / automated market maker (AMM) liquidity protocol.",
        },
        {
          code: "PROJECT B",
          title: "DAO Governance",
          tag: "GOVERNANCE / TREASURY",
          description: "Build a complete DAO with on-chain governance tokens, treasury, and timelock execution.",
        },
        {
          code: "PROJECT C",
          title: "Tokenized Vault",
          tag: "ERC-4626 / YIELD",
          description: "Build an ERC-4626-based tokenized yield vault with deposit shares and asset accounting.",
        },
        {
          code: "PROJECT D",
          title: "NFT Platform",
          tag: "MARKETPLACE / ERC-2981",
          description: "Build an NFT marketplace with creator royalty enforcement and Dutch auction mechanics.",
        },
        {
          code: "PROJECT E",
          title: "Web3 Application",
          tag: "FULL-STACK DAPP",
          description: "Build a complete end-to-end dApp with Solidity backend, automated tests, and Next.js frontend.",
        },
        {
          code: "PROJECT F",
          title: "Protocol Component",
          tag: "CORE INFRASTRUCTURE",
          description: "Design and implement an application-specific blockchain component or custom L2 verifier.",
        },
      ],
      capstoneDeliverables: [
        "Architecture document & threat model",
        "Production smart contracts",
        "Automated unit & integration test suite",
        "Foundry fuzzing & invariant test suite",
        "Security vulnerability analysis & PoCs",
        "Bytecode gas profiling report",
        "Interactive Web3 frontend application",
        "Testnet deployment with verified contracts",
        "Public GitHub repository with technical documentation",
        "Final engineering defense & live presentation",
      ],
    },
  ],
};
