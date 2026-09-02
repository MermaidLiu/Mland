export const en = {
  meta: {
    title: "Mland — Deploy Enterprise AI Agents to Hospitals",
    description:
      "One command gives your AI production-ready hospital agents, Blueprints, and private deployment.",
  },
  nav: {
    features: "Features",
    services: "Services",
    pricing: "Pricing",
    faqs: "FAQs",
    github: "GitHub",
    blueprints: "Blueprints",
    docs: "Docs",
    upgradePro: "Upgrade Pro",
    proTooltip: "Upload de-identified data, run cloud SKILLs, export SCI figures",
  },
  hero: {
    label: "Enterprise AI Agent Platform",
    title1: "Agent deploys.",
    title2: "You ship to hospitals.",
    subtitle:
      "One command gives your AI everything it needs — production-ready agents, hospital Blueprints, and private deployment from Docker to Kubernetes.",
    cmdHint: "One command. Works with Claude Code, Cursor, Copilot, Gemini, and 30+ AI tools.",
    hospitalsServed: "Hospitals served",
    imageAlt: "Mland PMP Intelligent Platform",
  },
  tools: {
    title: "Works with your favorite AI tools.",
    subtitle: "Install once. Deploy everywhere.",
  },
  mcp: {
    label: "Based on Skills & MCP",
    title: "Designed for AI to understand and deploy.",
    subtitle:
      "Connect the Mland MCP server and your AI assistant can list solutions, read deploy guides, and run full deployment loops — from PoC to production K8s.",
    bullets: [
      "Hospital Adapter for HIS / LIS integration",
      "ReAct orchestrator with medical & PMP tools",
      "Open-source Blueprints + Pro private deployment",
    ],
  },
  demo: {
    title: "Describe what you need.",
    subtitle: "Watch AI deploy it.",
    description:
      "Tell your AI assistant what to build. It pulls Mland Blueprints, reads deploy guides, and ships production-ready hospital agents — in seconds.",
    tabs: {
      deploy: "Deploy Agent",
      translate: "Medical Translation",
      explore: "Explore Blueprints",
    },
    footer: "3 blueprints available — medical translation & PMP agent delivered in production hospitals",
  },
  services: {
    label: "Custom Deployment",
    title: "Hospital-grade AI your IT team will trust",
    subtitle:
      "From a 2-week PoC to full private deployment — $5,000 down payment, first draft in 1 day. We ship agents inside your hospital on schedule, with data that never leaves the building.",
    emailUs: "Email us",
    popular: "MOST POPULAR",
    plans: [
      {
        name: "PoC Sprint",
        price: "$5,000",
        duration: "down payment · 1-day draft",
        features: [
          "First draft delivered in 1 day",
          "$5,000 down payment to kick off",
          "Blueprint deployed in hospital network",
          "Simulated + demo data flows",
          "Docker on-prem setup",
          "Handover documentation",
        ],
      },
      {
        name: "Private Deploy",
        price: "Contact",
        duration: "4–8 weeks",
        features: [
          "Everything in PoC Sprint",
          "Hospital Adapter (HIS / LIS)",
          "GPU inference cluster",
          "K8s HA + monitoring (Pro)",
          "Staff training session",
        ],
      },
      {
        name: "Enterprise",
        price: "Custom",
        duration: "Flexible",
        features: [
          "Source-level customization",
          "On-site implementation",
          "Domestic IT stack compliance",
          "Compliance & audit support",
          "24/7 dedicated engineers",
        ],
      },
    ],
  },
  shipped: {
    label: "Shipped in Production",
    title: "From Blueprint to hospital floor",
    subtitle:
      "These solutions are live in tier-3 hospitals — built with Mland Blueprints and private deployment.",
  },
  pricing: {
    label: "Pricing",
    title: "Pay for compute, not code",
    subtitle:
      "MedSkill Plaza is MIT open source. You only pay when you run SKILLs in the cloud — billed in compute coins.",
    subtitlePrefix: "Pro starts at",
    subtitleSuffix: "with 2,000 coins/month — enough for ~25 Cox regressions or ~40 literature searches.",
    recommended: "Best for students",
    tiers: {
      free: {
        name: "Student Free",
        subtitle: "Learn & explore",
        period: "forever",
        cta: "Start on GitHub",
      },
      pro: {
        name: "Pro",
        subtitle: "Individual researcher",
        period: "/ mo",
        cta: "Get Pro",
      },
      lab: {
        name: "Lab",
        subtitle: "Advisor & research group",
        period: "/ mo",
        cta: "Contact for Lab",
      },
      contributor: {
        name: "Contributor",
        subtitle: "Engineers & custom packaging",
        period: "",
        cta: "Submit a SKILL",
      },
    },
    features: {
      free: [
        "100 compute coins / month",
        "Demo datasets + Canvas workflow",
        "Open-source SKILL catalog",
        "Local MCP calls in Cursor",
        "Browser-side PHI de-identification",
        "Community support",
      ],
      pro: [
        "2,000 compute coins / month",
        "Upload de-identified CSV / Excel",
        "Run all cloud SKILLs (stats, omics, imaging)",
        "SCI figure export (LaTeX, SVG, Word)",
        "Priority queue + 30-day encrypted storage",
        "Top-up coin packs anytime",
      ],
      lab: [
        "5 seats + shared 10,000 coins / month",
        "Team workspace & shared Canvas",
        "Advisor approval before SKILL runs",
        "180-day result retention",
        "Dedicated support channel",
        "Invoice for university reimbursement",
      ],
      contributor: [
        "70% revenue share per SKILL run",
        "Git-ops: PR → CI → listed in plaza",
        "Auto-generated medskill.json spec",
        "Usage & earnings dashboard",
        "Custom packaging from $5,000 down",
        "1-day first draft delivery",
      ],
    },
    coinPacks: {
      title: "Need more coins?",
      subtitle: "Top up anytime — coins never expire on paid accounts.",
      cta: "Buy coins",
      packs: [
        { name: "Starter", tagline: "Try a few SKILL runs" },
        { name: "Standard", tagline: "Enough for one paper's stats" },
        { name: "Plus", tagline: "Omics + imaging heavy projects" },
      ],
    },
    skillCosts: {
      title: "SKILL cost reference",
      subtitle: "Pay per run — no subscription required for individual SKILL calls on Pro.",
      columns: { skill: "SKILL", category: "Category", cost: "Cost per run" },
      rows: [
        { skill: "Academic Search", category: "Literature", cost: "45 coins" },
        { skill: "Two-group hypothesis test", category: "Clinical stats", cost: "50 coins" },
        { skill: "Cox proportional hazards", category: "Clinical stats", cost: "80 coins" },
        { skill: "DESeq2 differential expression", category: "Omics", cost: "150 coins" },
        { skill: "DICOM lesion segmentation", category: "Imaging (GPU)", cost: "300 coins" },
      ],
    },
    page: {
      badge: "Compute coins · De-identified data · Open-source plaza",
      title: "Pricing for",
      titleHighlight: "medical students",
      subtitle:
        "Open source to learn, pay only when you run. Free tier for demos; Pro for real de-identified data and SCI outputs.",
      securityTitle: "Why does the free tier block real patient data?",
      securityBody:
        "Raw PHI must never leave your browser unprotected. The Privacy Interceptor hashes identifiers locally before upload. Pro adds encrypted cloud storage and audit logs — still de-identified, never raw EMR.",
      comparisonTitle: "Plan comparison",
      contributorTitle: "Are you an engineer with a research tool?",
      contributorBody:
        "Package your GitHub repo as a Docker SKILL. Students pay compute coins per run — you earn 70%. Or ask us to package it for your lab from $5,000 down.",
      contributorCta: "View contributor guide",
      faqTitle: "Common questions",
    },
    faq: [
      {
        q: "What are compute coins?",
        a: "Compute coins are credits for running SKILLs in the cloud. Each SKILL costs a fixed amount (e.g. 45 coins for literature search). Pro includes 2,000 coins/month; you can buy more anytime.",
      },
      {
        q: "Can I use my own research data on the free tier?",
        a: "Only with fully de-identified data and within the 100-coin monthly limit. For regular thesis work, Pro is designed for de-identified CSV/Excel uploads with higher quotas.",
      },
      {
        q: "Does my advisor need to pay?",
        a: "Lab plan is built for PIs — 5 seats, shared coin pool, and university invoice. Many students start on Pro individually and upgrade when the group adopts MedSkill.",
      },
      {
        q: "How do contributors earn money?",
        a: "Wrap your open-source tool as a SKILL. When students run it, you receive 70% of the compute coins spent. Payouts are monthly via the Contributor Hub.",
      },
    ],
  },
  faq: {
    label: "FAQs",
    title: "Frequently Asked Questions",
    items: [
      {
        q: "What is Mland?",
        a: "Mland is an AI-native enterprise agent platform with production-ready Blueprints, Hospital Adapter for HIS integration, and full deployment loops from Docker to Kubernetes.",
      },
      {
        q: "Is Mland free?",
        a: "Yes — Community edition is MIT open source. Pro is billed per medical case at $0.05 with encrypted storage and GPU inference. Enterprise offers full private deployment.",
      },
      {
        q: "How does Mland work with AI tools?",
        a: "Connect @mland/mcp-server in Cursor, Claude Code, or 30+ AI tools via MCP. Your assistant can list, get, and deploy solutions on demand.",
      },
      {
        q: "Which hospitals use Mland?",
        a: "Deployed at Chang Gung Hospital (medical translation) and Aerospace Center Hospital (PMP agent) — both tier-3 private deployments.",
      },
      {
        q: "Can I use real patient data on the free tier?",
        a: "No — free tier is for learning and PoC only. Real EMR/imaging requires Pro for encrypted storage and compliance.",
      },
      {
        q: "What is Custom Deployment?",
        a: "We deploy Mland inside your hospital — from 2-week PoC to full K8s production. Contact sales@mland.io.",
      },
    ],
  },
  footer: {
    tagline:
      "Give your AI the tools to deploy real hospital agents — one command to install, private deployment when you're ready.",
    hospitals: "Hospitals served: Chang Gung · Aerospace Center",
    product: "Product",
    company: "Company",
    contact: "Contact",
    privacy: "Privacy Policy",
    rights: "All rights reserved.",
    terms: "Terms",
  },
  common: {
    hospitals: ["Chang Gung Hospital", "Aerospace Center Hospital"],
    copy: "Copy",
    copied: "Copied",
  },
  industries: {
    title: "Industry Solutions",
    subtitle:
      "Browse validated AI solutions by industry — medical cases featured first",
    labels: {
      medical: "Healthcare",
      finance: "Finance",
      manufacturing: "Manufacturing",
      education: "Education",
    },
    assetTypes: {
      agent: "AI Agent",
      miniapp: "WeChat Mini Program",
      app: "Mobile App",
      admin: "Admin Console",
    },
    served: "Served: ",
    listSeparator: " · ",
    comingSoon: "Solutions for this industry are coming soon",
    comingSoonHint:
      "Browse our medical cases for reference, or contact us to customize a solution",
    contactUs: "Contact us",
    customize: "solution",
    medicalCountPrefix: "We already have",
    medicalCountSuffix: "medical case(s) for reference —",
    emptyContact: "contact us to customize a",
    emptySolution: "solution",
  },
  solution: {
    notFound: "Solution not found",
    openSource: "Open Source (Free)",
    served: "Served: ",
    related: "Related solutions",
    tabs: {
      overview: "Overview",
      tech: "Tech Stack",
      deploy: "Deploy Guide",
    },
    overview: {
      title: "About this solution",
      demoTitle: "Demo data upload",
      demoDesc: "Try uploading real medical files to see the open-source safety gate",
    },
    tech: {
      title: "Tech stack",
      inference: "Inference",
      inferenceFree: "Community: CPU inference · Pro: GPU cluster (A100/V100)",
      storage: "Storage",
      storageFree: "Community: in-memory temp · Pro: AES-256 encrypted persistent volumes",
    },
    comparison: {
      title: "Feature comparison — Free vs Pro",
      subtitle: "Clear boundaries between open source and Pro for medical data compliance",
    },
  },
  docs: {
    title: "Developer Docs",
    suffix: " — Developer Docs",
  },
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: July 1, 2026",
    collectionTitle: "Information we collect",
    collectionBody:
      "Mland (\"we\") may temporarily process conversation input when you use the Agent Playground demo on our website to generate demo responses. We do not permanently store this data.",
    usageTitle: "How we use data",
    usageBody:
      "Collected information is used only to provide and improve our services. All data in private deployment plans stays on customer-owned infrastructure.",
    contactTitle: "Contact us",
    contactBody: "For privacy questions, contact",
    contactSuffix: ".",
  },
  upgradeModal: {
    title: "Upgrade Required",
    detectedUpload: "We detected you are uploading",
    realMedicalData: "real medical data",
    description:
      "The free tier cannot guarantee data security or compliance. Upgrade to Pro to continue.",
    descriptionPunct: ".",
    freeLimitTitle: "Community limits:",
    freeLimitBody: "Simulated data only — cleared in 24h, ephemeral on restart",
    proTitle: "Pro guarantees:",
    proBody: "AES-256 encrypted storage · Persistent volumes · On-prem deployment · 24/7 engineers",
    cta: "View Pro pricing",
    continueDemo: "Continue with simulated data",
  },
  comparison: {
    columns: {
      feature: "Feature",
      free: "Student Free",
      pro: "Pro",
      lab: "Lab",
    },
    disabled: "Not included",
    watermark: "Demo only",
    encrypted: "Encrypted",
    adapter: "Team workspace",
    persistent: "180-day retention",
    warning:
      "⚠️ Free tier is for learning with demo data. Upload de-identified research data on Pro — the Privacy Interceptor blocks raw PHI.",
    ctaTitle: "Pro = your thesis accelerator",
    ctaSubtitle: "De-identified data · cloud SKILL runs · SCI-ready exports",
    contactSales: "Contact for Lab",
    rows: [
      { feature: "MedSkill Canvas workflow", free: true, pro: true, lab: true },
      {
        feature: "Monthly compute coins",
        free: "100",
        pro: "2,000",
        lab: "10,000 (shared)",
      },
      {
        feature: "Upload de-identified data",
        free: false,
        pro: true,
        lab: true,
        highlight: true,
        proHint: "Encrypted",
      },
      {
        feature: "Cloud SKILL runs (GPU)",
        free: "Demo only",
        pro: true,
        lab: true,
        highlight: true,
      },
      {
        feature: "SCI figure export",
        free: false,
        pro: true,
        lab: true,
        highlight: true,
      },
      {
        feature: "Team seats & shared workspace",
        free: false,
        pro: false,
        lab: true,
        highlight: true,
        proHint: "5 seats",
      },
      {
        feature: "Result retention",
        free: "7 days",
        pro: "30 days",
        lab: "180 days",
      },
      {
        feature: "Support",
        free: "Community",
        pro: "Email (48h)",
        lab: "Dedicated channel",
      },
    ],
  },
  sidebar: {
    title: "Quick start",
    cliLabel: "CLI install command",
    deployLabel: "Deployment method",
    docker: "Docker Compose (recommended)",
    k8s: "Kubernetes (Pro)",
    manual: "Manual deploy",
    k8sNote: "Pro includes HA cluster and 24/7 monitoring alerts",
    proTitle: "Pro edition",
    proBody: "Full source + HA K8s + monitoring",
    perCase: "per case",
    contactPro: "Contact for Pro",
    viewGithub: "View source on GitHub",
  },
};

export type Dictionary = typeof en;
