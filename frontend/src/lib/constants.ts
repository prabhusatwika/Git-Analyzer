export const siteConfig = {
  name: "Git-Analyzer",
  tagline: "Understand your codebase through the lens of git history",
  description:
    "Git-Analyzer uses AI to turn commits, pull requests, and branch activity into actionable insights for engineering teams.",
  url: "https://git-analyzer.dev",
  links: {
    github: "https://github.com",
    docs: "#",
    twitter: "https://twitter.com",
  },
} as const;

export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export const features = [
  {
    title: "Commit Intelligence",
    description:
      "Surface patterns in commit frequency, message quality, and file churn to spot bottlenecks before they slow your team down.",
    icon: "GitCommitHorizontal",
  },
  {
    title: "PR Risk Scoring",
    description:
      "AI evaluates pull request size, review coverage, and change hotspots to flag high-risk merges before they reach production.",
    icon: "GitPullRequest",
  },
  {
    title: "Contributor Insights",
    description:
      "See who owns which areas of the codebase, track bus factor risks, and balance workload across your engineering org.",
    icon: "Users",
  },
  {
    title: "Branch Health Monitor",
    description:
      "Track stale branches, long-lived feature work, and merge conflicts so nothing silently rots in your repository.",
    icon: "GitBranch",
  },
  {
    title: "Release Readiness",
    description:
      "Analyze changes since your last tag and get a clear signal on whether the codebase is ready to ship.",
    icon: "Rocket",
  },
  {
    title: "Natural Language Queries",
    description:
      "Ask questions like \"What changed in auth this month?\" and get answers grounded in your actual git history.",
    icon: "MessageSquareText",
  },
] as const;

export const steps = [
  {
    step: "01",
    title: "Connect your repository",
    description:
      "Link a GitHub, GitLab, or Bitbucket repo in seconds. Git-Analyzer reads history locally — your code never leaves your control.",
  },
  {
    step: "02",
    title: "AI analyzes git history",
    description:
      "Our models process commits, diffs, PR metadata, and branch graphs to build a living map of how your codebase evolves.",
  },
  {
    step: "03",
    title: "Get actionable insights",
    description:
      "Review dashboards, risk alerts, and natural-language summaries that help you ship faster with fewer surprises.",
  },
] as const;

export const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    period: "forever",
    description: "For solo developers exploring their repos.",
    features: [
      "1 connected repository",
      "30-day history analysis",
      "Basic commit insights",
      "Community support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Team",
    price: "$29",
    period: "per user / month",
    description: "For growing teams that need deeper visibility.",
    features: [
      "Unlimited repositories",
      "Full history analysis",
      "PR risk scoring",
      "Contributor dashboards",
      "Slack & email alerts",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "For orgs with compliance and scale requirements.",
    features: [
      "Self-hosted deployment",
      "SSO & RBAC",
      "Custom AI model tuning",
      "Audit logs & SLA",
      "Dedicated success manager",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
] as const;

export const testimonials = [
  {
    quote:
      "Git-Analyzer showed us three stale branches blocking releases that we'd completely overlooked. We cut our deploy cycle by 40%.",
    author: "Sarah Chen",
    role: "Engineering Lead",
    company: "Stackline",
  },
  {
    quote:
      "The PR risk scores are eerily accurate. We now require an extra review on anything flagged above medium — bugs in prod dropped noticeably.",
    author: "Marcus Okonkwo",
    role: "Staff Engineer",
    company: "Relay Systems",
  },
  {
    quote:
      "I asked 'who owns the payments module?' and got an instant answer with commit stats. Onboarding new engineers is so much faster now.",
    author: "Elena Vasquez",
    role: "VP of Engineering",
    company: "Northwind Labs",
  },
] as const;

export const faqs = [
  {
    question: "Which git platforms does Git-Analyzer support?",
    answer:
      "Git-Analyzer works with GitHub, GitLab, and Bitbucket. You can also analyze any local git repository by pointing the CLI at your project directory.",
  },
  {
    question: "Does my source code get sent to external servers?",
    answer:
      "On the Starter and Team plans, only git metadata (commits, diffs, PR info) is processed. Enterprise customers can run the full stack self-hosted so nothing leaves their infrastructure.",
  },
  {
    question: "How is this different from standard git analytics tools?",
    answer:
      "Traditional tools show charts and counts. Git-Analyzer uses AI to interpret patterns, score risk, answer natural-language questions, and recommend specific actions — not just display data.",
  },
  {
    question: "Can I try it before committing to a paid plan?",
    answer:
      "Yes. The Starter plan is free forever with one repo. Team plans include a 14-day free trial with full access to every feature — no credit card required.",
  },
  {
    question: "How often is repository data refreshed?",
    answer:
      "Connected repos sync automatically on every push. You can also trigger a manual refresh from the dashboard or via webhook at any time.",
  },
] as const;

export const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Changelog", href: "#" },
    { label: "Roadmap", href: "#" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Security", href: "#" },
  ],
} as const;
