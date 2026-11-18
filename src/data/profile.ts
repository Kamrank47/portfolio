export const profile = {
  name: "Kamran Hashmi",
  role: "DevSecOps Engineer",
  focus: "AIOps",
  email: "kamranali.k47@gmail.com",
  phone: "+92-303-4145584",
  phoneHref: "+923034145584",
  location: "Lahore, Pakistan",
  timezone: "PKT, UTC+5",
  company: "Pikessoft",
  availability: "Open to remote and contract work",
  links: {
    github: "https://github.com/Kamrank47",
    linkedin: "https://linkedin.com/in/kamhash",
    medium: "https://medium.com/@kamranali.k47",
  },
  cvs: {
    reference: {
      href: "/resume/Kamran-Hashmi-Resume.pdf",
      label: "Kamran-Hashmi-Resume.pdf",
    },
    modern: {
      href: "/resume/Kamran-Hashmi-Resume-Modern.pdf",
      label: "Kamran-Hashmi-Resume-Modern.pdf",
    },
  },
} as const;

export const run = {
  id: "deploy 4f1c9a",
  target: "main → production",
  state: "passed",
  stages: [
    { name: "checkout", time: "0m 22s" },
    { name: "terraform plan", time: "1m 12s" },
    { name: "build + scan", time: "4m 38s" },
    { name: "push to ecr", time: "0m 46s" },
    { name: "argocd sync", time: "0m 58s" },
    { name: "blue/green rollout", time: "6m 18s" },
  ],
  total: "14m 14s",
  previous: "91m 40s",
  delta: "84% faster",
  note: "Illustrative pipeline, not a live run. Six product teams, one pipeline shape: GitHub Actions to ECR, Argo CD to EKS, Argo Rollouts for the cutover.",
};

export const metrics = [
  {
    value: "90 → 14",
    unit: "min",
    trend: "−84%",
    trendLabel: "faster delivery",
    label: "Average deployment time across 6 product teams",
    src: "Pikessoft · CI/CD",
  },
  {
    value: "−50",
    unit: "%",
    trend: "Half the time",
    trendLabel: "to detect incidents",
    label: "Mean time to detect after centralized alerting",
    src: "Pikessoft · Observability",
  },
  {
    value: "100",
    unit: "%",
    trend: "All repos",
    trendLabel: "secrets removed",
    label: "Deployed repositories cleared of hard-coded credentials",
    src: "Pikessoft · DevSecOps",
  },
  {
    value: "GBP 9k → 3k",
    unit: "/mo",
    trend: "−67%",
    trendLabel: "cloud cost cut",
    label: "Client infrastructure spend, without losing a dev environment",
    src: "Pikessoft · Cost",
  },
];

export const projects = [
  {
    num: "01",
    kicker: "AIOps · LLM incident triage",
    title: "AIOps incident copilot",
    claim:
      "Alertmanager fires, the service gathers metrics, logs and the matching runbook, and an LLM posts a short triage to Slack. Read-only by design.",
    facts: [
      {
        key: "Context",
        value:
          "Pulls Prometheus and Loki context for the firing alert and attaches the matching runbook before asking the model.",
      },
      {
        key: "Safety",
        value:
          "Secrets, emails, IPs and tokens are redacted before any text leaves the network. The service only suggests steps and never runs commands.",
      },
      {
        key: "Reliability",
        value:
          "GPT-OSS 120B on Groq (free tier) returns validated JSON in about a second. If the model fails or times out, the raw alert still reaches Slack, marked as a fallback.",
      },
      {
        key: "Quality",
        value:
          "Eval on five fault scenarios with known root causes: 5/5 correct, 1.0 to 1.3 s per triage. Unit tests, Ruff, a non-root read-only container and Trivy in CI.",
      },
    ],
    stack: [
      "Python",
      "FastAPI",
      "Groq",
      "Prometheus",
      "Loki",
      "Alertmanager",
      "Docker",
      "Trivy",
      "Slack",
    ],
    repo: "https://github.com/Kamrank47/aiops-incident-copilot",
  },
  {
    num: "02",
    kicker: "Kubernetes platform · GitOps",
    title: "EKS platform",
    claim:
      "Multi-environment EKS with Terragrunt, Argo CD and blue-green rollouts gated by an automated smoke test.",
    facts: [
      {
        key: "Provisioning",
        value:
          "Terragrunt wires reusable Terraform modules across dev and prod, with encrypted S3 remote state and DynamoDB locking.",
      },
      {
        key: "Hardening",
        value:
          "KMS envelope encryption for secrets, IMDSv2 enforced in the launch template, and the EKS public endpoint restricted to an allow-listed CIDR.",
      },
      {
        key: "Delivery",
        value:
          "Jenkins builds and scans the image, updates the Kustomize overlay in git, Argo CD syncs the cluster, Argo Rollouts runs the blue-green cutover.",
      },
      {
        key: "Runtime",
        value:
          "Default-deny NetworkPolicy, non-root containers, read-only root filesystems, all capabilities dropped.",
      },
    ],
    stack: [
      "Terraform",
      "Terragrunt",
      "EKS",
      "Kustomize",
      "Argo CD",
      "Argo Rollouts",
      "Jenkins",
      "Helm",
      "Trivy",
    ],
    repo: "https://github.com/Kamrank47/eks-jenkins-argocd-deployment",
  },
  {
    num: "03",
    kicker: "Cost-optimized compute · Blue/green",
    title: "EC2 deployment platform",
    claim:
      "The low-cost counterpart to a managed orchestrator: same release discipline, no cluster bill.",
    facts: [
      {
        key: "Releases",
        value:
          "CodeDeploy blue/green onto an Auto Scaling group behind an ALB, with build artifacts staged in S3.",
      },
      {
        key: "CI/CD",
        value:
          "GitHub Actions authenticates to AWS through OIDC. No long-lived access keys exist in the pipeline.",
      },
      {
        key: "Observability",
        value:
          "Self-hosted Prometheus, Loki and Grafana on a dedicated monitoring host, scraped over security-group-scoped ports.",
      },
      {
        key: "Async work",
        value:
          "SQS queues with a dead-letter queue each, feeding Lambda consumers for transactions, notifications and event ingestion.",
      },
    ],
    stack: [
      "Terraform",
      "EC2",
      "CodeDeploy",
      "GitHub OIDC",
      "SQS",
      "Lambda",
      "Prometheus",
      "Loki",
      "Grafana",
    ],
    repo: "https://github.com/Kamrank47/ec2-terraform-deployment",
  },
  {
    num: "04",
    kicker: "ECS Fargate · Terragrunt modules",
    title: "ECS deployment platform",
    claim:
      "A Fargate service with a real data tier, provisioned per environment from the same module set.",
    facts: [
      {
        key: "Network",
        value:
          "VPC across two availability zones with security groups scoped per tier: ALB, tasks and data.",
      },
      {
        key: "Service",
        value:
          "Fargate tasks with CPU and memory autoscaling behind an ALB, optional ACM TLS and path-based API routing.",
      },
      {
        key: "Data",
        value:
          "Self-managed PostgreSQL and Redis on EC2, with generated SSH keys kept out of remote state output.",
      },
      {
        key: "Delivery",
        value:
          "CodePipeline and CodeBuild deploy on push, reporting through AWS Chatbot into Slack.",
      },
    ],
    stack: [
      "Terraform",
      "Terragrunt",
      "ECS Fargate",
      "ALB",
      "ECR",
      "CodePipeline",
      "SSM",
      "PostgreSQL",
      "Redis",
    ],
    repo: "https://github.com/Kamrank47/ecs-terragrunt-deployment",
  },
  {
    num: "05",
    kicker: ".NET on IIS · Angular on Cloudflare Pages",
    title: "GitLab CI/CD pipelines",
    claim:
      "Two production pipelines from one self-hosted GitLab: a Windows backend that backs itself up, and a frontend that ships itself.",
    facts: [
      {
        key: "Backend",
        value:
          "A Windows runner publishes a self-contained .NET build, stops the app pool, serves an offline page, backs up the previous release, then smoke-tests Swagger before declaring success.",
      },
      {
        key: "Frontend",
        value:
          "A Linux runner builds Angular, injects environment config and deploys to Cloudflare Pages with Wrangler, one project per environment.",
      },
      {
        key: "Quality gate",
        value:
          "SonarQube blocks merge requests that fail the gate without blocking branch deploys that never run it.",
      },
      {
        key: "Safety",
        value:
          "Five-environment branching, manual production triggers, and Teams notifications that never fail a deploy.",
      },
    ],
    stack: [
      "GitLab CI/CD",
      ".NET",
      "IIS",
      "PowerShell",
      "Angular",
      "Cloudflare Pages",
      "SonarQube",
    ],
    repo: "https://github.com/Kamrank47/gitlab-cicd-dotnet-angular-pipelines",
  },
  {
    num: "06",
    kicker: "MLOps · end-to-end delivery",
    title: "Purchase-intent MLOps platform",
    claim:
      "A model lifecycle that runs itself: validated training, an MLflow registry, served inference, GitOps delivery and drift monitoring.",
    facts: [
      {
        key: "Training",
        value:
          "Scikit-learn pipeline over 12,330 sessions with schema validation, a pinned dataset hash and a stratified split. ROC-AUC 0.927, best F1 0.666 at threshold 0.55.",
      },
      {
        key: "Tracking",
        value:
          "MLflow records parameters, metrics, signatures and artifacts, with registry promotion. Twenty-three tests and Ruff gate every commit.",
      },
      {
        key: "Serving",
        value:
          "FastAPI with Pydantic validation, health and model-info endpoints, Prometheus metrics and a non-root container with a read-only filesystem.",
      },
      {
        key: "Delivery",
        value:
          "Kustomize overlays with HPA and PDB on Kubernetes, a KServe InferenceService alternative, Argo CD auto-sync and Trivy scanning in CI.",
      },
    ],
    stack: [
      "Python",
      "scikit-learn",
      "MLflow",
      "FastAPI",
      "Docker",
      "Kubernetes",
      "KServe",
      "Argo CD",
      "GitHub Actions",
      "Prometheus",
    ],
    repo: "https://github.com/Kamrank47/purchase-intent-mlops",
  },
];

export const projectThemes = [
  "Kubernetes",
  "Terraform",
  "CI/CD",
  "DevSecOps",
  "Observability",
  "MLOps",
];

export const stack = [
  {
    group: "Cloud & platforms",
    icon: "cloud",
    tags: [
      "AWS (EKS, ECS, EC2)",
      "AWS Fargate",
      "AWS IAM & KMS",
      "Amazon S3 & RDS",
      "Azure VMs & Blob Storage",
      "Azure App Services & Functions",
      "Azure Key Vault secrets",
      "GCP VMs & Cloud Storage",
      "GCP Secret Manager",
      "CloudWatch",
    ],
  },
  {
    group: "Containers & orchestrators",
    icon: "container",
    tags: [
      "Kubernetes",
      "Amazon EKS",
      "Azure AKS",
      "Google GKE",
      "Docker",
      "Argo CD",
      "Argo Rollouts",
      "Helm",
      "Kustomize",
      "Amazon ECR",
    ],
  },
  {
    group: "Infrastructure as code",
    icon: "code",
    tags: [
      "Terraform",
      "Terragrunt",
      "Ansible",
      "S3 State Backend",
      "DynamoDB Locking",
    ],
  },
  {
    group: "CI/CD & release pipelines",
    icon: "pipeline",
    tags: [
      "GitHub Actions",
      "GitLab CI/CD",
      "Jenkins",
      "AWS CodePipeline",
      "Azure DevOps Pipelines",
      "Git & GitHub",
      "Blue/Green Deployments",
      "Automated Smoke Tests",
    ],
  },
  {
    group: "DevSecOps & Linux security",
    icon: "shield",
    tags: [
      "Trivy Vulnerability Scan",
      "SonarQube Quality Gate",
      "GitHub OIDC (Keyless)",
      "KMS Envelope Encryption",
      "Cloudflare Tunnel",
      "Least-Privilege IAM",
      "Linux (RHEL / Ubuntu)",
      "Bash & Python",
    ],
  },
  {
    group: "Observability & monitoring",
    icon: "chart",
    tags: [
      "Prometheus",
      "Grafana",
      "Loki (Logging)",
      "Alertmanager",
      "CloudWatch",
      "Datadog (apps + AWS)",
      "New Relic APM",
      "SLO / Latency Probes",
    ],
  },
  {
    group: "MLOps & AI infrastructure",
    icon: "cpu",
    tags: [
      "MLflow Experiment Tracking",
      "MLflow Model Registry",
      "DVC (Data Version Control)",
      "scikit-learn Pipelines",
      "FastAPI Model Serving",
      "KServe",
      "Drift Monitoring",
      "GitOps for ML (Argo CD)",
    ],
  },
];

export const experience = [
  {
    org: "Pikessoft",
    role: "DevSecOps Engineer",
    dates: "Aug 2023 – Present",
    location: "Lahore, Pakistan",
    points: [
      "Provision and run containerized workloads on AWS EKS, ECS Fargate and Azure AKS with autoscaling and rolling deployments.",
      "Cut average deployment time from <strong>90 minutes to under 15</strong> across <strong>6 product teams</strong> by rebuilding multi-environment pipelines in GitHub Actions, GitLab CI/CD and Jenkins.",
      "Manage AWS infrastructure with <strong>Terraform</strong>, enforcing consistent tagging, network segmentation and least-privilege IAM.",
      "Built a <strong>Prometheus and Grafana</strong> observability stack with alerting on CPU, memory, health and request latency, cutting mean time to detect by <strong>50%</strong>.",
      "Standardized multi-stage Docker builds, <strong>60% smaller images</strong>, pushed to ECR with vulnerability scanning at every pipeline stage.",
      "Removed hard-coded credentials from <strong>100% of deployed repositories</strong> through secrets management and environment-specific config injection.",
      "Cut a client’s infrastructure spend from <strong>GBP 9,000 to GBP 3,000 a month</strong> by moving dev environments on-premises and replacing purchased public IPs with Cloudflare Tunnel behind a VPN.",
    ],
  },
  {
    org: "Northbay Solutions",
    role: "DevOps Engineer",
    dates: "Oct 2022 – Apr 2023",
    location: "Lahore, Pakistan",
    points: [
      "Containerized monolithic applications with Docker for reproducible deployment on AWS EC2.",
      "Configured EC2 Auto Scaling groups, ALBs, RDS and S3, raising application availability to <strong>99.5% uptime</strong>.",
      "Wrote Bash and Python automation for log rotation, backups, health checks and alerting, returning <strong>8+ hours a week</strong> of manual ops work.",
      "Managed Ubuntu and Amazon Linux servers, including patching, access control and firewall rules.",
    ],
  },
  {
    org: "DevSmith",
    role: "Application Developer",
    dates: "Oct 2021 – Jul 2022",
    location: "Lahore, Pakistan",
    points: [
      "Built chat room and ticketing features for a Flutter application.",
      "Built a Bitcoin wallet application and a WhatsApp media backup application.",
    ],
  },
];

export const posts = [
  {
    date: "May 2026",
    title: "How to expose your on-prem server to the internet without a public IP",
    href: "https://medium.com/@kamranali.k47/how-to-expose-your-on-prem-server-to-the-internet-without-a-public-ip-fac167502837",
    read: "6 min read",
  },
  {
    date: "Nov 2025",
    title: "Mastering multiple Git accounts: GitHub, GitLab and self-hosted",
    href: "https://medium.com/@kamranali.k47/mastering-multiple-git-accounts-like-a-pro-github-gitlab-self-hosted-532c1ff82c71",
    read: "5 min read",
  },
];

export const education = {
  school: "Lahore Garrison University",
  degree: "B.S. Computer Science",
  year: "2021",
  location: "Lahore, Pakistan",
  coursework:
    "Operating Systems, Computer Networks, Distributed Systems, Cloud Computing",
};

export const certifications = [
  {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    detail:
      "Compute, networking, storage, IAM and high-availability architecture.",
  },
];

export const continuingEducation = [
  {
    title: "MLOps Zero to Hero",
    issuer: "Abhishek Veeramalla · Udemy",
    detail:
      "Production-grade MLOps: MLflow, DVC, Docker, Kubernetes, KServe, CI/CD for ML pipelines.",
  },
];


// Replace every "TODO:" sentence with your real story before publishing.
export const caseStudies = [
  {
    metric: "90 → 14 min deploys",
    title: "Rebuilding delivery for six product teams",
    problem:
      "Each team shipped through its own hand-rolled pipeline and a release took about 90 minutes. TODO: describe what made it slow and what it cost the teams.",
    approach:
      "One pipeline shape for every team: GitHub Actions to ECR, Argo CD to EKS, Argo Rollouts for the cutover. TODO: how you rolled it out team by team.",
    tradeoffs:
      "TODO: what you gave up, for example flexibility per team, migration effort, or extra platform ownership.",
    result:
      "90 minutes down to 14 minutes on average. TODO: add the effect on release frequency or failed deploys.",
  },
  {
    metric: "GBP 9k → 3k per month",
    title: "Cutting a client's cloud bill by two thirds",
    problem:
      "TODO: what was driving the GBP 9,000 monthly spend (idle dev environments, purchased public IPs).",
    approach:
      "Moved dev environments on-premises and replaced public IPs with Cloudflare Tunnel behind a VPN. TODO: how you migrated without downtime.",
    tradeoffs:
      "TODO: on-prem maintenance, VPN access model, and why production stayed in the cloud.",
    result:
      "Monthly spend from GBP 9,000 to GBP 3,000 with every dev environment kept.",
  },
  {
    metric: "−50% time to detect",
    title: "Centralized alerting that finds problems first",
    problem:
      "TODO: how incidents were discovered before (customers, ad-hoc checks).",
    approach:
      "Prometheus and Grafana with alerts on CPU, memory, health and request latency. TODO: how you chose thresholds and routed alerts.",
    tradeoffs:
      "TODO: alert noise, on-call load, and what you chose not to alert on.",
    result:
      "Mean time to detect cut by 50%. TODO: add a real incident where it paid off.",
  },
] as const;
