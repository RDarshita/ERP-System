import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Research.css";

export default function Research() {
  const navigate = useNavigate();
  const [researches, setResearches] = useState([]);
  const [filteredResearches, setFilteredResearches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeResearchId, setActiveResearchId] = useState(null);
  const [form, setForm] = useState({
    topic: "",
    author: "",
    publishedDate: "",
    summary: ""
  });

  const getDefaultResearches = () => [
    {
      id: 1,
      topic: "Adaptive Learning in Edge AI",
      author: "Ananya Rao",
      publishedDate: "2025-09-12",
      summary: "Published paper focusing on low-latency personalization for campus labs.",
      area: "AI Systems",
      status: "Published"
    },
    {
      id: 2,
      topic: "Green Cloud Scheduling Models",
      author: "Karthik Iyer",
      publishedDate: "2025-11-02",
      summary: "Pending approval for a multi-tenant scheduling framework with 18% energy savings.",
      area: "Cloud Computing",
      status: "Pending"
    },
    {
      id: 3,
      topic: "Nanomaterial Sensors for Health Monitoring",
      author: "Meera Joshi",
      publishedDate: "2025-08-05",
      summary: "Draft manuscript for high-sensitivity biosensors; pilot results completed.",
      area: "Biomedical",
      status: "Draft"
    },
    {
      id: 4,
      topic: "Behavioral Economics in Student Retention",
      author: "Rahul Menon",
      publishedDate: "2025-07-18",
      summary: "Published case study on retention incentives across three institutes.",
      area: "Education",
      status: "Published"
    }
  ];

  const normalizeText = (value) => (value || "").toLowerCase();

  const deriveStatus = (item) => {
    if (item.status) return item.status;
    const summary = normalizeText(item.summary);
    if (summary.includes("pending")) return "Pending";
    if (summary.includes("published") || summary.includes("paper")) return "Published";
    return "Draft";
  };

  const applyFilters = (items, term, filter) => {
    const normalizedTerm = normalizeText(term);
    const filtered = items.filter((item) => {
      const haystack = `${item.topic} ${item.author} ${item.summary} ${item.area}`;
      const matchesTerm = normalizeText(haystack).includes(normalizedTerm);
      const status = deriveStatus(item);
      const matchesFilter = filter === "all" ? true : status === filter;
      return matchesTerm && matchesFilter;
    });
    setFilteredResearches(filtered);
  };

  useEffect(() => {
    fetch("https://backenderp-production-6374.up.railway.app/api/research")
      .then((res) => res.json())
      .then((data) => {
        const safeData = Array.isArray(data) && data.length > 0 ? data : getDefaultResearches();
        setResearches(safeData);
        setFilteredResearches(safeData);
        setActiveResearchId(safeData[0]?.id || null);
      })
      .catch(() => {
        const defaultData = getDefaultResearches();
        setResearches(defaultData);
        setFilteredResearches(defaultData);
        setActiveResearchId(defaultData[0]?.id || null);
      });
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    applyFilters(researches, value, selectedFilter);
  };

  const handleFilter = (filter) => {
    setSelectedFilter(filter);
    applyFilters(researches, searchTerm, filter);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://backenderp-production-6374.up.railway.app/api/research", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then((res) => res.json())
      .then((data) => {
        const next = [...researches, data];
        setResearches(next);
        applyFilters(next, searchTerm, selectedFilter);
        if (!activeResearchId) {
          setActiveResearchId(data.id);
        }
      });
    setForm({ topic: "", author: "", publishedDate: "", summary: "" });
  };

  const stats = useMemo(() => {
    const total = researches.length;
    const published = researches.filter((item) => deriveStatus(item) === "Published").length;
    const pending = researches.filter((item) => deriveStatus(item) === "Pending").length;
    const draft = researches.filter((item) => deriveStatus(item) === "Draft").length;
    return [
      { label: "Active Projects", value: total, tone: "teal" },
      { label: "Published Papers", value: published, tone: "gold" },
      { label: "Pending Reviews", value: pending, tone: "violet" },
      { label: "Drafts in Progress", value: draft, tone: "blue" }
    ];
  }, [researches]);

  const services = [
    {
      title: "Manuscript Studio",
      detail: "Structured guidance from outline to submission-ready formatting.",
      tag: "Format to Publish"
    },
    {
      title: "Proposal Crafting",
      detail: "Narrative building, budget framing, and funding alignment support.",
      tag: "Grant Ready"
    },
    {
      title: "Data Storytelling",
      detail: "Analysis support, visual narrative, and final report polishing.",
      tag: "Insights to Impact"
    }
  ];

  const activeResearch = researches.find((item) => item.id === activeResearchId) || researches[0];

  const formatDate = (date) => {
    if (!date) return "TBD";
    return new Date(date).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="research-page">
      <section className="research-hero">
        <div className="research-hero__content">
          <div className="research-hero__title-row">
            <h1 className="research-hero__title">Research Nexus</h1>
          </div>
          <p className="research-hero__subtitle">
            Curate, publish, and showcase your work with a streamlined research pipeline built for focus and momentum.
          </p>
          <div className="research-hero__actions">
            <button className="research-btn research-btn--primary">Start a Proposal</button>
            <button className="research-btn research-btn--ghost">Explore Funding</button>
          </div>
        </div>
        <div className="research-hero__metrics">
          {stats.map((stat) => (
            <div key={stat.label} className={`research-metric research-metric--${stat.tone}`}>
              <p>{stat.label}</p>
              <h3>{stat.value}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="research-services">
        {services.map((service) => (
          <article key={service.title} className="research-service-card">
            <h4>{service.title}</h4>
            <p>{service.detail}</p>
            <span>{service.tag}</span>
          </article>
        ))}
      </section>

      <section className="research-toolbar">
        <div className="research-search">
          <span className="research-search__icon">🔍</span>
          <input
            type="text"
            placeholder="Search by topic, author, or research area"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="research-filters">
          {["all", "Published", "Pending", "Draft"].map((filter) => (
            <button
              key={filter}
              className={`research-filter ${selectedFilter === filter ? "active" : ""}`}
              onClick={() => handleFilter(filter)}
            >
              {filter === "all" ? "All" : filter}
            </button>
          ))}
        </div>
      </section>

      <main className="research-layout">
        <section className="research-list">
          <div className="research-list__header">
            <h2>Your Research Library</h2>
            <p>Tap a card to open a focused reading pane.</p>
          </div>
          <div className="research-cards">
            {filteredResearches.length > 0 ? (
              filteredResearches.map((item) => (
                <article
                  key={item.id}
                  className={`research-card ${activeResearchId === item.id ? "active" : ""}`}
                  onClick={() => setActiveResearchId(item.id)}
                >
                  <div className="research-card__top">
                    <div>
                      <h3>{item.topic}</h3>
                      <p>{item.author}</p>
                    </div>
                    <span className={`research-badge research-badge--${deriveStatus(item).toLowerCase()}`}>
                      {deriveStatus(item)}
                    </span>
                  </div>
                  <p className="research-card__summary">{item.summary}</p>
                  <div className="research-card__meta">
                    <span>{formatDate(item.publishedDate)}</span>
                    <span>{item.area || "Interdisciplinary"}</span>
                  </div>
                </article>
              ))
            ) : (
              <div className="research-empty">
                <h3>No results found</h3>
                <p>Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        </section>

        <aside className="research-panel">
          <div className="research-panel__spotlight">
            <h2>Spotlight</h2>
            {activeResearch ? (
              <div className="research-spotlight-card">
                <h3>{activeResearch.topic}</h3>
                <p className="research-spotlight__author">{activeResearch.author}</p>
                <p className="research-spotlight__summary">{activeResearch.summary}</p>
                <div className="research-spotlight__meta">
                  <span>{formatDate(activeResearch.publishedDate)}</span>
                  <span>{activeResearch.area || "Interdisciplinary"}</span>
                  <span>{deriveStatus(activeResearch)}</span>
                </div>
              </div>
            ) : (
              <p className="research-panel__muted">Select a research card to view details.</p>
            )}
          </div>

          <div className="research-panel__form">
            <h2>Submit New Research</h2>
            <form onSubmit={handleSubmit} className="research-form">
              <label>
                Topic
                <input
                  name="topic"
                  placeholder="Research topic"
                  value={form.topic}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Author
                <input
                  name="author"
                  placeholder="Lead author"
                  value={form.author}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Published date
                <input
                  name="publishedDate"
                  type="date"
                  value={form.publishedDate}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Summary
                <textarea
                  name="summary"
                  placeholder="Key insights and results"
                  value={form.summary}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </label>
              <button type="submit">Add Research</button>
            </form>
          </div>
        </aside>
      </main>
    </div>
  );
}
