export const infraPillars = [
  {
    tag: "VALIDATOR_OPS",
    title: "High-Availability Validator Operations",
    description:
      "Multi-region active-passive validator clusters with automated leader election, stateful failover within 850ms, and zero-downtime blue-green upgrade pipelines. All validator keys managed through hardware security modules (HSM) with threshold signing.",
    details: [
      "AWS EC2 bare-metal (c6id.metal) + GCP bare-metal co-location",
      "Terraform IaC with drift detection and GitOps auto-reconcile",
      "850ms automated failover with raft-based leader election",
      "Slashing protection via distributed double-sign detection",
      "Prometheus + Grafana + VictoriaMetrics observability stack",
    ],
  },
  {
    tag: "RPC_INFRA",
    title: "Enterprise-Grade RPC & Load Balancing",
    description:
      "Multi-tier global RPC gateway with sticky session routing, provider health scoring, geo-distributed cache layers, and sub-5ms internal routing. Handles 650K+ requests per day across 4 provider networks with 99.97% monthly uptime.",
    details: [
      "NGINX + HAProxy dual-layer load balancing",
      "Redis Cluster geo-distributed cache (350ms → 4ms p99)",
      "WebSocket multiplexing with connection backpressure",
      "EIP-1898 block parameter optimization",
      "Intelligent provider routing with health score weighting",
    ],
  },
  {
    tag: "DEVOPS_PIPELINE",
    title: "Protocol CI/CD & Deployment Automation",
    description:
      "Full-lifecycle deployment automation for protocol node upgrades, testnet-to-mainnet promotion, and multi-chain genesis coordination. Zero-downtime rolling upgrades using Kubernetes StatefulSets with PodDisruptionBudget constraints.",
    details: [
      "GitHub Actions + ArgoCD GitOps deployment pipeline",
      "Kubernetes StatefulSets with PodDisruptionBudget",
      "Helm chart templating with environment parameterization",
      "Canary deployments with automated Prometheus rollback triggers",
      "Multi-chain genesis coordination and upgrade orchestration",
    ],
  },
  {
    tag: "OBSERVABILITY",
    title: "Real-Time Protocol Observability Stack",
    description:
      "End-to-end telemetry from EVM opcode execution to P2P gossip latency. Custom eBPF probes capture kernel-level network events and block propagation timing. Sub-second alerting via PagerDuty with automated runbook execution.",
    details: [
      "Custom eBPF probes for kernel-level network tracing",
      "Prometheus + Grafana dashboards with 200+ custom metrics",
      "OpenTelemetry distributed tracing across validator and RPC layers",
      "PagerDuty alerting with sub-30s MTTD",
      "Automated incident runbooks triggered by metric thresholds",
    ],
  },
];
