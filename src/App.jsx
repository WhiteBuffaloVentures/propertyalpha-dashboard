import { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar } from "recharts";

const COLORS = {
  navy: "#0A1628",
  charcoal: "#1C2B3A",
  gold: "#D4AF37",
  goldDim: "#D4AF3740",
  white: "#F4F6F8",
  green: "#22C55E",
  red: "#EF4444",
  blue: "#3B82F6",
  purple: "#8B5CF6",
  orange: "#F59E0B",
  cyan: "#06B6D4",
  surface: "#111827",
  card: "#1E293B",
  cardHover: "#253348",
  border: "#334155",
  textPrimary: "#F1F5F9",
  textSecondary: "#94A3B8",
  textMuted: "#64748B",
};

const PROPERTIES = [
  {
    id: 1, name: "319 Peabody Street", city: "Nashville", state: "TN", units: 187, type: "Mid-Rise", class: "Class A",
    score: 87, noiImpact: 347400, valueUplift: 6948000, payback: 14,
    lat: 36.1627, lng: -86.7816,
    tech: { wifi: { installed: true, noi: 142800, irr: 94, payback: 11 }, access: { installed: true, noi: 98600, irr: 71, payback: 16 }, iot: { installed: false, noi: 72800, irr: 64, payback: 18 }, ev: { installed: false, noi: 33200, irr: 42, payback: 24 } },
    monthly: [
      { month: "Jul", noi: 24200, projected: 28950 }, { month: "Aug", noi: 25100, projected: 28950 }, { month: "Sep", noi: 26800, projected: 28950 },
      { month: "Oct", noi: 27400, projected: 28950 }, { month: "Nov", noi: 28200, projected: 28950 }, { month: "Dec", noi: 29100, projected: 28950 },
      { month: "Jan", noi: 28500, projected: 28950 }, { month: "Feb", noi: 29800, projected: 28950 }, { month: "Mar", noi: 30200, projected: 28950 },
      { month: "Apr", noi: 31100, projected: 28950 }, { month: "May", noi: 30800, projected: 28950 }, { month: "Jun", noi: 31400, projected: 28950 },
    ],
    warranties: [
      { product: "Place Smoke Detectors", installed: "2024-03-15", expires: "2029-03-15", status: "active", vendor: "Gentex" },
      { product: "PointCentral Smart Locks", installed: "2024-06-01", expires: "2027-06-01", status: "expiring", vendor: "PointCentral" },
      { product: "Calix WiFi APs", installed: "2024-01-10", expires: "2029-01-10", status: "active", vendor: "Calix" },
    ],
    recommendations: [
      { action: "Install IoT smart thermostats", impact: "+$72,800/yr NOI", priority: "High", category: "Smart Home" },
      { action: "Add 16 EV charging stations", impact: "+$33,200/yr NOI", priority: "Medium", category: "EV Charging" },
      { action: "Send tech specs to USI for re-quote", impact: "~8-12% insurance savings", priority: "High", category: "Insurance" },
    ]
  },
  {
    id: 2, name: "Broadstone Music Row", city: "Phoenix", state: "AZ", units: 275, type: "Mid-Rise", class: "Class A",
    score: 72, noiImpact: 198400, valueUplift: 3968000, payback: 18,
    lat: 33.4484, lng: -112.0740,
    tech: { wifi: { installed: true, noi: 98400, irr: 78, payback: 13 }, access: { installed: false, noi: 54000, irr: 62, payback: 19 }, iot: { installed: false, noi: 36000, irr: 55, payback: 22 }, ev: { installed: false, noi: 10000, irr: 28, payback: 30 } },
    monthly: [
      { month: "Jul", noi: 14200, projected: 16533 }, { month: "Aug", noi: 14800, projected: 16533 }, { month: "Sep", noi: 15100, projected: 16533 },
      { month: "Oct", noi: 15600, projected: 16533 }, { month: "Nov", noi: 16200, projected: 16533 }, { month: "Dec", noi: 16800, projected: 16533 },
      { month: "Jan", noi: 16100, projected: 16533 }, { month: "Feb", noi: 16500, projected: 16533 }, { month: "Mar", noi: 17200, projected: 16533 },
      { month: "Apr", noi: 17800, projected: 16533 }, { month: "May", noi: 17400, projected: 16533 }, { month: "Jun", noi: 17900, projected: 16533 },
    ],
    warranties: [],
    recommendations: [
      { action: "Deploy smart access control", impact: "+$54,000/yr NOI", priority: "High", category: "Access" },
      { action: "Install leak detection sensors", impact: "~$14,200/yr insurance savings", priority: "High", category: "Insurance" },
    ]
  },
  {
    id: 3, name: "The Gulch on 7th", city: "Fort Worth", state: "TX", units: 227, type: "Garden", class: "Class B",
    score: 58, noiImpact: 112000, valueUplift: 2240000, payback: 22,
    lat: 32.7555, lng: -97.3308,
    tech: { wifi: { installed: false, noi: 52000, irr: 68, payback: 14 }, access: { installed: true, noi: 42000, irr: 58, payback: 20 }, iot: { installed: false, noi: 18000, irr: 44, payback: 26 }, ev: { installed: false, noi: 0, irr: 0, payback: 0 } },
    monthly: [
      { month: "Jul", noi: 7800, projected: 9333 }, { month: "Aug", noi: 8200, projected: 9333 }, { month: "Sep", noi: 8600, projected: 9333 },
      { month: "Oct", noi: 8900, projected: 9333 }, { month: "Nov", noi: 9100, projected: 9333 }, { month: "Dec", noi: 9400, projected: 9333 },
      { month: "Jan", noi: 9200, projected: 9333 }, { month: "Feb", noi: 9600, projected: 9333 }, { month: "Mar", noi: 9800, projected: 9333 },
      { month: "Apr", noi: 10100, projected: 9333 }, { month: "May", noi: 9900, projected: 9333 }, { month: "Jun", noi: 10200, projected: 9333 },
    ],
    warranties: [],
    recommendations: [
      { action: "Deploy managed WiFi (Calix)", impact: "+$52,000/yr NOI", priority: "High", category: "WiFi" },
    ]
  },
  {
    id: 4, name: "NOVEL Edgehill", city: "Los Angeles", state: "CA", units: 238, type: "Mid-Rise", class: "Class B",
    score: 65, noiImpact: 156000, valueUplift: 3120000, payback: 20,
    lat: 34.0522, lng: -118.2437,
    tech: { wifi: { installed: true, noi: 78000, irr: 72, payback: 14 }, access: { installed: true, noi: 48000, irr: 60, payback: 18 }, iot: { installed: false, noi: 22000, irr: 48, payback: 24 }, ev: { installed: false, noi: 8000, irr: 22, payback: 32 } },
    monthly: [
      { month: "Jul", noi: 11200, projected: 13000 }, { month: "Aug", noi: 11800, projected: 13000 }, { month: "Sep", noi: 12100, projected: 13000 },
      { month: "Oct", noi: 12400, projected: 13000 }, { month: "Nov", noi: 12800, projected: 13000 }, { month: "Dec", noi: 13200, projected: 13000 },
      { month: "Jan", noi: 12900, projected: 13000 }, { month: "Feb", noi: 13400, projected: 13000 }, { month: "Mar", noi: 13800, projected: 13000 },
      { month: "Apr", noi: 14200, projected: 13000 }, { month: "May", noi: 13900, projected: 13000 }, { month: "Jun", noi: 14400, projected: 13000 },
    ],
    warranties: [],
    recommendations: [
      { action: "Install smart thermostats", impact: "+$22,000/yr NOI", priority: "Medium", category: "IoT" },
    ]
  }
];

const VENDORS = [
  { name: "Calix", category: "Managed WiFi", score: 94.2, tier: "Platinum", logo: "📡" },
  { name: "PointCentral", category: "Smart Access", score: 91.8, tier: "Featured", logo: "🔐" },
  { name: "Place by Gentex", category: "Life Safety", score: 89.5, tier: "Platinum", logo: "🔥" },
  { name: "Klipsch", category: "Audio", score: 88.1, tier: "Platinum", logo: "🔊" },
  { name: "BioConnect", category: "Access Control", score: 86.4, tier: "Featured", logo: "🛡️" },
  { name: "Juicer Energy", category: "EV Charging", score: 84.7, tier: "Featured", logo: "⚡" },
  { name: "Phyn", category: "Leak Detection", score: 83.2, tier: "Pro", logo: "💧" },
  { name: "USI Insurance", category: "Insurance & Risk", score: 82.0, tier: "Platinum", logo: "🏛️" },
];

const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

function ScoreRing({ score, size = 120 }) {
  const color = score >= 80 ? COLORS.green : score >= 60 ? COLORS.gold : COLORS.red;
  const data = [{ value: score, fill: color }];
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <RadialBarChart width={size} height={size} cx={size/2} cy={size/2} innerRadius={size*0.32} outerRadius={size*0.46} data={data} startAngle={90} endAngle={-270} barSize={8}>
        <RadialBar background={{ fill: COLORS.border }} dataKey="value" cornerRadius={4} />
      </RadialBarChart>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: size*0.28, fontWeight: 700, color }}>{score}</div>
        <div style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: 1 }}>SCORE</div>
      </div>
    </div>
  );
}

function KPI({ label, value, sub, accent = false }) {
  return (
    <div style={{ padding: "20px 24px", background: COLORS.card, borderRadius: 12, border: `1px solid ${COLORS.border}`, flex: 1, minWidth: 180 }}>
      <div style={{ fontSize: 12, color: COLORS.textMuted, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 26, fontWeight: 700, color: accent ? COLORS.gold : COLORS.textPrimary }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 16px", border: "none",
      background: active ? COLORS.goldDim : "transparent", color: active ? COLORS.gold : COLORS.textSecondary,
      borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: active ? 600 : 400, textAlign: "left",
      transition: "all 0.2s", borderLeft: active ? `3px solid ${COLORS.gold}` : "3px solid transparent",
    }}>
      <span style={{ fontSize: 18 }}>{icon}</span>{label}
    </button>
  );
}

function PropertyCard({ property, onClick, selected }) {
  const color = property.score >= 80 ? COLORS.green : property.score >= 60 ? COLORS.gold : COLORS.red;
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 16, width: "100%", padding: "14px 16px", border: `1px solid ${selected ? COLORS.gold : COLORS.border}`,
      background: selected ? COLORS.cardHover : COLORS.card, borderRadius: 10, cursor: "pointer", textAlign: "left", transition: "all 0.2s",
    }}>
      <div style={{ width: 44, height: 44, borderRadius: 8, background: `${color}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 16, color }}>{property.score}</span>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.textPrimary }}>{property.name}</div>
        <div style={{ fontSize: 12, color: COLORS.textSecondary }}>{property.city}, {property.state} · {property.units} units · {property.type}</div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 600, color: COLORS.gold }}>{fmt(property.noiImpact)}</div>
        <div style={{ fontSize: 10, color: COLORS.textMuted }}>NOI/yr</div>
      </div>
    </button>
  );
}

function TechStatus({ label, installed, noi, irr, payback }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: COLORS.surface, borderRadius: 8, border: `1px solid ${COLORS.border}` }}>
      <span style={{ fontSize: 20 }}>{installed ? "✅" : "⚠️"}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary }}>{label}</div>
        <div style={{ fontSize: 11, color: installed ? COLORS.green : COLORS.orange }}>{installed ? "Active" : "Opportunity"}</div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 600, color: COLORS.gold }}>{fmt(noi)}</div>
        <div style={{ fontSize: 10, color: COLORS.textMuted }}>{irr}% IRR · {payback}mo payback</div>
      </div>
    </div>
  );
}

export default function PropertyAlphaDashboard() {
  const [view, setView] = useState("portfolio");
  const [selectedProperty, setSelectedProperty] = useState(PROPERTIES[0]);
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const totalNOI = PROPERTIES.reduce((s, p) => s + p.noiImpact, 0);
  const totalUnits = PROPERTIES.reduce((s, p) => s + p.units, 0);
  const totalValue = PROPERTIES.reduce((s, p) => s + p.valueUplift, 0);
  const avgScore = Math.round(PROPERTIES.reduce((s, p) => s + p.score, 0) / PROPERTIES.length);

  const pieData = [
    { name: "WiFi", value: 371200, color: COLORS.blue },
    { name: "Access", value: 242600, color: COLORS.green },
    { name: "IoT", value: 148800, color: COLORS.purple },
    { name: "EV", value: 51200, color: COLORS.orange },
  ];

  const handleAI = async () => {
    if (!aiQuery.trim()) return;
    setAiLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 1000,
          system: `You are the PropertyAlpha AI advisor. You analyze smart building data for multifamily properties. Current portfolio: ${PROPERTIES.map(p => `${p.name} (${p.city}, ${p.state}) - ${p.units} units, Score: ${p.score}/100, NOI Impact: $${p.noiImpact}/yr`).join("; ")}. Selected property: ${selectedProperty.name} with tech stack: WiFi ${selectedProperty.tech.wifi.installed ? "active" : "not installed"}, Access ${selectedProperty.tech.access.installed ? "active" : "not installed"}, IoT ${selectedProperty.tech.iot.installed ? "active" : "not installed"}, EV ${selectedProperty.tech.ev.installed ? "active" : "not installed"}. Respond concisely with specific ROI data and actionable recommendations. Use dollar amounts.`,
          messages: [{ role: "user", content: aiQuery }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map(c => c.text || "").join("\n") || "Unable to process request.";
      setAiResponse(text);
    } catch (e) {
      setAiResponse("AI engine offline. In production, this connects to Claude API for real-time recommendations.");
    }
    setAiLoading(false);
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: COLORS.surface, fontFamily: "'Inter', -apple-system, sans-serif", color: COLORS.textPrimary, overflow: "hidden" }}>
      {/* Sidebar */}
      <div style={{ width: 240, background: COLORS.navy, borderRight: `1px solid ${COLORS.border}`, display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "24px 20px 16px", borderBottom: `1px solid ${COLORS.border}` }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.white, letterSpacing: -0.5 }}>Property<span style={{ color: COLORS.gold }}>Alpha</span></div>
          <div style={{ fontSize: 10, color: COLORS.textMuted, letterSpacing: 2, marginTop: 2, fontStyle: "italic" }}>Bloomberg for Buildings</div>
        </div>
        <div style={{ padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
          <NavItem icon="📊" label="Portfolio Overview" active={view === "portfolio"} onClick={() => setView("portfolio")} />
          <NavItem icon="🏢" label="Property Deep-Dive" active={view === "property"} onClick={() => setView("property")} />
          <NavItem icon="💰" label="NOI Intelligence" active={view === "noi"} onClick={() => setView("noi")} />
          <NavItem icon="🏪" label="Vendor Marketplace" active={view === "vendors"} onClick={() => setView("vendors")} />
          <NavItem icon="🤖" label="AI Advisor" active={view === "ai"} onClick={() => setView("ai")} />
          <div style={{ height: 1, background: COLORS.border, margin: "8px 0" }} />
          <NavItem icon="🔧" label="Integrators" active={view === "integrators"} onClick={() => setView("integrators")} />
          <NavItem icon="⚙️" label="Connectors" active={view === "connectors"} onClick={() => setView("connectors")} />
        </div>
        <div style={{ padding: "16px", borderTop: `1px solid ${COLORS.border}` }}>
          <div style={{ fontSize: 11, color: COLORS.textMuted }}>Logged in as</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary }}>DAC Developments</div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: "auto", padding: 32 }}>
        {/* PORTFOLIO VIEW */}
        {view === "portfolio" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: COLORS.textPrimary }}>Portfolio Overview</h1>
              <p style={{ fontSize: 14, color: COLORS.textSecondary, margin: "4px 0 0" }}>4 properties · {totalUnits} total units · Real-time PropTech intelligence</p>
            </div>
            <div style={{ display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
              <KPI label="Total NOI Impact" value={fmt(totalNOI)} sub="Annual across portfolio" accent />
              <KPI label="Property Value Uplift" value={fmt(totalValue)} sub="At 5.0% cap rate" />
              <KPI label="Avg. Alpha Score" value={`${avgScore}/100`} sub="Portfolio health" />
              <KPI label="Properties Tracked" value={PROPERTIES.length} sub={`${totalUnits} total units`} />
            </div>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              <div style={{ flex: 2, minWidth: 400 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.textPrimary, marginBottom: 12 }}>Properties</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {PROPERTIES.map(p => (
                    <PropertyCard key={p.id} property={p} selected={selectedProperty.id === p.id} onClick={() => { setSelectedProperty(p); setView("property"); }} />
                  ))}
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 280 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.textPrimary, marginBottom: 12 }}>NOI by Technology</div>
                <div style={{ background: COLORS.card, borderRadius: 12, border: `1px solid ${COLORS.border}`, padding: 20 }}>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                        {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                      </Pie>
                      <Tooltip formatter={(v) => fmt(v)} contentStyle={{ background: COLORS.navy, border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.textPrimary, fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                    {pieData.map(d => (
                      <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: d.color }} />
                        <span style={{ fontSize: 11, color: COLORS.textSecondary }}>{d.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: 16, background: COLORS.card, borderRadius: 12, border: `1px solid ${COLORS.border}`, padding: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary, marginBottom: 12 }}>Top Recommendations</div>
                  {PROPERTIES.flatMap(p => p.recommendations.filter(r => r.priority === "High").map(r => ({ ...r, property: p.name }))).slice(0, 4).map((r, i) => (
                    <div key={i} style={{ padding: "10px 0", borderBottom: i < 3 ? `1px solid ${COLORS.border}` : "none" }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.textPrimary }}>{r.action}</div>
                      <div style={{ fontSize: 11, color: COLORS.textMuted }}>{r.property} · <span style={{ color: COLORS.gold }}>{r.impact}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROPERTY DEEP-DIVE */}
        {view === "property" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
              <ScoreRing score={selectedProperty.score} />
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>{selectedProperty.name}</h1>
                <p style={{ fontSize: 14, color: COLORS.textSecondary, margin: "4px 0 0" }}>{selectedProperty.city}, {selectedProperty.state} · {selectedProperty.units} units · {selectedProperty.type} · {selectedProperty.class}</p>
                <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                  <span style={{ fontSize: 12, color: COLORS.gold, fontFamily: "monospace", fontWeight: 600 }}>NOI: {fmt(selectedProperty.noiImpact)}/yr</span>
                  <span style={{ fontSize: 12, color: COLORS.green, fontFamily: "monospace" }}>Value: {fmt(selectedProperty.valueUplift)}</span>
                  <span style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: "monospace" }}>Payback: {selectedProperty.payback}mo</span>
                </div>
              </div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.textPrimary, marginBottom: 12 }}>Technology Stack</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
              <TechStatus label="Managed WiFi & Broadband" {...selectedProperty.tech.wifi} />
              <TechStatus label="Smart Access & Security" {...selectedProperty.tech.access} />
              <TechStatus label="Smart Home / IoT" {...selectedProperty.tech.iot} />
              <TechStatus label="EV Charging Infrastructure" {...selectedProperty.tech.ev} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.textPrimary, marginBottom: 12 }}>NOI Trend (12 Months)</div>
            <div style={{ background: COLORS.card, borderRadius: 12, border: `1px solid ${COLORS.border}`, padding: 20, marginBottom: 28 }}>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={selectedProperty.monthly}>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis dataKey="month" stroke={COLORS.textMuted} fontSize={11} />
                  <YAxis stroke={COLORS.textMuted} fontSize={11} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
                  <Tooltip formatter={(v) => fmt(v)} contentStyle={{ background: COLORS.navy, border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.textPrimary, fontSize: 12 }} />
                  <Line type="monotone" dataKey="projected" stroke={COLORS.textMuted} strokeDasharray="5 5" strokeWidth={1.5} dot={false} name="Projected" />
                  <Line type="monotone" dataKey="noi" stroke={COLORS.gold} strokeWidth={2.5} dot={{ fill: COLORS.gold, r: 3 }} name="Actual NOI" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {selectedProperty.recommendations.length > 0 && (
              <>
                <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.textPrimary, marginBottom: 12 }}>AI Recommendations</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {selectedProperty.recommendations.map((r, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: COLORS.card, borderRadius: 10, border: `1px solid ${COLORS.border}` }}>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4, background: r.priority === "High" ? `${COLORS.red}30` : `${COLORS.orange}30`, color: r.priority === "High" ? COLORS.red : COLORS.orange }}>{r.priority}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary }}>{r.action}</div>
                        <div style={{ fontSize: 11, color: COLORS.textMuted }}>{r.category}</div>
                      </div>
                      <div style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 600, color: COLORS.gold }}>{r.impact}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {selectedProperty.warranties.length > 0 && (
              <>
                <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.textPrimary, marginBottom: 12, marginTop: 28 }}>Warranty Tracker</div>
                {selectedProperty.warranties.map((w, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: COLORS.card, borderRadius: 8, border: `1px solid ${COLORS.border}`, marginBottom: 6 }}>
                    <span style={{ fontSize: 18 }}>{w.status === "active" ? "✅" : "⚠️"}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary }}>{w.product}</div>
                      <div style={{ fontSize: 11, color: COLORS.textMuted }}>{w.vendor} · Installed {w.installed}</div>
                    </div>
                    <div style={{ fontSize: 12, color: w.status === "active" ? COLORS.green : COLORS.orange, fontWeight: 600 }}>
                      {w.status === "active" ? `Expires ${w.expires}` : "Expiring Soon"}
                    </div>
                  </div>
                ))}
              </>
            )}
            <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
              {PROPERTIES.map(p => (
                <button key={p.id} onClick={() => setSelectedProperty(p)} style={{
                  padding: "6px 14px", borderRadius: 6, border: `1px solid ${selectedProperty.id === p.id ? COLORS.gold : COLORS.border}`,
                  background: selectedProperty.id === p.id ? COLORS.goldDim : "transparent", color: selectedProperty.id === p.id ? COLORS.gold : COLORS.textSecondary,
                  cursor: "pointer", fontSize: 11, fontWeight: 500
                }}>{p.city}</button>
              ))}
            </div>
          </div>
        )}

        {/* NOI INTELLIGENCE */}
        {view === "noi" && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 6px" }}>NOI Intelligence</h1>
            <p style={{ fontSize: 14, color: COLORS.textSecondary, margin: "0 0 28px" }}>Real-time portfolio NOI tracking powered by RETTC benchmarks</p>
            <div style={{ display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
              <KPI label="Portfolio NOI Impact" value={fmt(totalNOI)} sub="Annual PropTech contribution" accent />
              <KPI label="Avg Payback Period" value="18 months" sub="Blended across categories" />
              <KPI label="Avg IRR" value="62%" sub="Weighted by NOI contribution" />
            </div>
            <div style={{ background: COLORS.card, borderRadius: 12, border: `1px solid ${COLORS.border}`, padding: 24, marginBottom: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>NOI Contribution by Property</div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={PROPERTIES.map(p => ({ name: p.city, WiFi: p.tech.wifi.noi, Access: p.tech.access.noi, IoT: p.tech.iot.noi, EV: p.tech.ev.noi }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis dataKey="name" stroke={COLORS.textMuted} fontSize={12} />
                  <YAxis stroke={COLORS.textMuted} fontSize={11} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
                  <Tooltip formatter={(v) => fmt(v)} contentStyle={{ background: COLORS.navy, border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.textPrimary, fontSize: 12 }} />
                  <Bar dataKey="WiFi" stackId="a" fill={COLORS.blue} radius={[0,0,0,0]} />
                  <Bar dataKey="Access" stackId="a" fill={COLORS.green} />
                  <Bar dataKey="IoT" stackId="a" fill={COLORS.purple} />
                  <Bar dataKey="EV" stackId="a" fill={COLORS.orange} radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ background: `${COLORS.gold}10`, borderRadius: 12, border: `1px solid ${COLORS.gold}30`, padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.gold, marginBottom: 8 }}>Unrealized NOI Opportunity</div>
              <div style={{ fontFamily: "monospace", fontSize: 28, fontWeight: 700, color: COLORS.gold }}>{fmt(PROPERTIES.reduce((s, p) => s + (p.tech.wifi.installed ? 0 : p.tech.wifi.noi) + (p.tech.access.installed ? 0 : p.tech.access.noi) + (p.tech.iot.installed ? 0 : p.tech.iot.noi) + (p.tech.ev.installed ? 0 : p.tech.ev.noi), 0))}</div>
              <div style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 4 }}>Annual NOI available if all recommended PropTech is deployed</div>
            </div>
          </div>
        )}

        {/* VENDOR MARKETPLACE */}
        {view === "vendors" && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 6px" }}>PropTech Index™</h1>
            <p style={{ fontSize: 14, color: COLORS.textSecondary, margin: "0 0 28px" }}>Monthly vendor rankings by ROI · Independent · Operator-first</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {VENDORS.map((v, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: COLORS.card, borderRadius: 10, border: `1px solid ${COLORS.border}` }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.textMuted, width: 24, textAlign: "center", fontFamily: "monospace" }}>#{i + 1}</div>
                  <span style={{ fontSize: 28 }}>{v.logo}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.textPrimary }}>{v.name}</div>
                    <div style={{ fontSize: 12, color: COLORS.textSecondary }}>{v.category}</div>
                  </div>
                  <div style={{ padding: "4px 10px", borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: 0.5, background: v.tier === "Platinum" ? `${COLORS.gold}25` : v.tier === "Featured" ? `${COLORS.blue}25` : `${COLORS.textMuted}20`, color: v.tier === "Platinum" ? COLORS.gold : v.tier === "Featured" ? COLORS.blue : COLORS.textSecondary }}>
                    {v.tier.toUpperCase()}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 700, color: COLORS.gold }}>{v.score}</div>
                    <div style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: 1 }}>INDEX</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, padding: 20, background: COLORS.card, borderRadius: 12, border: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary, marginBottom: 8 }}>Vendor Tiers</div>
              <div style={{ fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.8 }}>
                <span style={{ color: COLORS.gold, fontWeight: 600 }}>Platinum ($3,000/mo)</span> — Priority recommendations, case study, insurance partnership<br/>
                <span style={{ color: COLORS.blue, fontWeight: 600 }}>Featured ($999/mo)</span> — PropTech Index inclusion, quarterly white paper<br/>
                <span style={{ color: COLORS.textSecondary, fontWeight: 600 }}>Pro ($499/mo)</span> — Proactive spec inclusion, recommendation engine<br/>
                <span style={{ color: COLORS.textMuted, fontWeight: 600 }}>Directory ($99/mo)</span> — Listing, ROI calculator, spec sheet upload
              </div>
            </div>
          </div>
        )}

        {/* AI ADVISOR */}
        {view === "ai" && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 6px" }}>AI Advisor</h1>
            <p style={{ fontSize: 14, color: COLORS.textSecondary, margin: "0 0 28px" }}>Ask anything about your portfolio · Powered by Claude</p>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {["How do I increase NOI at 319 Peabody?", "Which property has the biggest opportunity?", "What should I install next?"].map(q => (
                <button key={q} onClick={() => { setAiQuery(q); }} style={{ padding: "8px 14px", borderRadius: 8, border: `1px solid ${COLORS.border}`, background: COLORS.card, color: COLORS.textSecondary, cursor: "pointer", fontSize: 11 }}>{q}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              <input value={aiQuery} onChange={e => setAiQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAI()} placeholder="Ask the PropertyAlpha AI..." style={{ flex: 1, padding: "14px 18px", borderRadius: 10, border: `1px solid ${COLORS.border}`, background: COLORS.card, color: COLORS.textPrimary, fontSize: 14, outline: "none" }} />
              <button onClick={handleAI} disabled={aiLoading} style={{ padding: "14px 24px", borderRadius: 10, border: "none", background: COLORS.gold, color: COLORS.navy, fontSize: 14, fontWeight: 700, cursor: "pointer", opacity: aiLoading ? 0.6 : 1 }}>
                {aiLoading ? "Analyzing..." : "Ask"}
              </button>
            </div>
            {aiResponse && (
              <div style={{ padding: 24, background: COLORS.card, borderRadius: 12, border: `1px solid ${COLORS.gold}30`, whiteSpace: "pre-wrap", fontSize: 14, lineHeight: 1.7, color: COLORS.textPrimary }}>
                <div style={{ fontSize: 11, color: COLORS.gold, fontWeight: 600, marginBottom: 12, letterSpacing: 1 }}>PROPERTYALPHA AI</div>
                {aiResponse}
              </div>
            )}
            <div style={{ marginTop: 24, padding: 20, background: `${COLORS.gold}08`, borderRadius: 12, border: `1px solid ${COLORS.gold}20` }}>
              <div style={{ fontSize: 12, color: COLORS.gold, fontWeight: 600, marginBottom: 8 }}>What the AI can do:</div>
              <div style={{ fontSize: 12, color: COLORS.textSecondary, lineHeight: 2 }}>
                Analyze portfolio data against RETTC benchmarks · Generate Smart Building Value Reports on demand · Recommend vendor/integrator matches · Calculate insurance savings from proposed installations · Alert on warranty expirations and code changes · Compare your properties against market averages
              </div>
            </div>
          </div>
        )}

        {/* INTEGRATORS */}
        {view === "integrators" && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 6px" }}>HomeLink Alliance Integrators</h1>
            <p style={{ fontSize: 14, color: COLORS.textSecondary, margin: "0 0 28px" }}>Matched by region, specialty, and portfolio size</p>
            {[
              { name: "Southern Integration Group", region: "Southeast", specialties: ["WiFi", "Access", "IoT"], states: "TN, GA, AL, FL", projects: 47 },
              { name: "Western PropTech Solutions", region: "West", specialties: ["EV", "Solar", "WiFi"], states: "CA, AZ, NV", projects: 32 },
              { name: "Lone Star Smart Buildings", region: "Southwest", specialties: ["Access", "IoT", "Fire Safety"], states: "TX, OK, NM", projects: 28 },
            ].map((integ, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px", background: COLORS.card, borderRadius: 12, border: `1px solid ${COLORS.border}`, marginBottom: 10 }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, background: `${COLORS.blue}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🔧</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.textPrimary }}>{integ.name}</div>
                  <div style={{ fontSize: 12, color: COLORS.textSecondary }}>{integ.region} · {integ.states}</div>
                  <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                    {integ.specialties.map(s => <span key={s} style={{ padding: "2px 8px", borderRadius: 4, background: `${COLORS.gold}15`, color: COLORS.gold, fontSize: 10, fontWeight: 600 }}>{s}</span>)}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "monospace", fontSize: 20, fontWeight: 700, color: COLORS.textPrimary }}>{integ.projects}</div>
                  <div style={{ fontSize: 10, color: COLORS.textMuted }}>PROJECTS</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CONNECTORS */}
        {view === "connectors" && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 6px" }}>API Connectors</h1>
            <p style={{ fontSize: 14, color: COLORS.textSecondary, margin: "0 0 28px" }}>Connect your PropTech systems to PropertyAlpha</p>
            {[
              { name: "PointCentral", type: "Smart Access & IoT", status: "Connected", icon: "🔐" },
              { name: "Calix SmartMDU", type: "Managed WiFi", status: "Connected", icon: "📡" },
              { name: "Yardi Voyager", type: "Property Management", status: "Available", icon: "🏢" },
              { name: "RealPage OneSite", type: "Property Management", status: "Available", icon: "📊" },
              { name: "Juicer Energy", type: "EV Charging", status: "Available", icon: "⚡" },
              { name: "USI Insurance", type: "Insurance & Risk", status: "Pending", icon: "🏛️" },
              { name: "Entrata", type: "Property Management", status: "Available", icon: "🏗️" },
              { name: "SmartRent", type: "Smart Home / IoT", status: "Available", icon: "🏠" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: COLORS.card, borderRadius: 10, border: `1px solid ${COLORS.border}`, marginBottom: 8 }}>
                <span style={{ fontSize: 24 }}>{c.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.textPrimary }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: COLORS.textSecondary }}>{c.type}</div>
                </div>
                <span style={{
                  padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                  background: c.status === "Connected" ? `${COLORS.green}20` : c.status === "Pending" ? `${COLORS.orange}20` : `${COLORS.textMuted}15`,
                  color: c.status === "Connected" ? COLORS.green : c.status === "Pending" ? COLORS.orange : COLORS.textSecondary,
                }}>{c.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
