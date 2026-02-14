import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Membership.css";
import logo from "../../image/logoSAHFON.webp";
import UserSidebar from "./UserComponents/UserSidebar";

export default function Membership() {
  const navigate = useNavigate();
  const [memberships, setMemberships] = useState([]);
  const [selectedTier, setSelectedTier] = useState("student");
  const [form, setForm] = useState({
    userId: "",
    organization: "",
    membershipType: "student",
    startDate: "",
    endDate: "",
    status: "active"
  });

  useEffect(() => {
    fetch("https://backenderp-production-6374.up.railway.app/api/membership")
      .then(res => res.json())
      .then(setMemberships)
      .catch(err => console.log("No memberships found"));
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    fetch("https://backenderp-production-6374.up.railway.app/api/membership", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(membership => setMemberships(prev => [...prev, membership]))
      .catch(err => console.log("Error adding membership"));
    setForm({
      userId: "",
      organization: "",
      membershipType: "student",
      startDate: "",
      endDate: "",
      status: "active"
    });
  };

  const tiers = [
    {
      id: "student",
      name: "Student",
      price: "₹500",
      description: "Perfect for individual students",
      color: "primary",
      features: [
        "Access to placement opportunities",
        "Industry event networking",
        "Professional development resources",
        "Alumni community access",
        "Career guidance support"
      ],
      cta: "Join as Student"
    },
    {
      id: "faculty",
      name: "Faculty & Institute",
      price: "₹1,000",
      description: "For educators and educational institutions",
      color: "secondary",
      features: [
        "Everything in Student +",
        "Institution branding & profiles",
        "Student management tools",
        "Curriculum development resources",
        "Faculty networking platform",
        "Priority event participation"
      ],
      cta: "Enroll Institution",
      popular: true
    },
    {
      id: "university",
      name: "University",
      price: "₹2,000",
      description: "Enterprise-level comprehensive solution",
      color: "accent",
      features: [
        "Everything in Faculty & Institute +",
        "Dedicated account manager",
        "Custom analytics & reporting",
        "Bulk student enrollment",
        "White-label options",
        "API access",
        "Premium support 24/7"
      ],
      cta: "Contact Us"
    }
  ];

  const benefits = [
    { icon: "🌐", title: "Global Network", desc: "Connect with professionals worldwide" },
    { icon: "📚", title: "Learning Resources", desc: "Access premium educational content" },
    { icon: "💼", title: "Career Growth", desc: "Opportunities for advancement" },
    { icon: "🎯", title: "Goal Achievement", desc: "Structured pathways to success" },
    { icon: "👥", title: "Community", desc: "Collaborative professional community" },
    { icon: "🏆", title: "Exclusive Perks", desc: "Members-only benefits & events" }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Student, IIT Delhi",
      text: "This membership transformed my career. Got placed at my dream company within 6 months!",
      rating: 5
    },
    {
      name: "Dr. Priya Sharma",
      role: "Faculty, MIT Chennai",
      text: "Excellent platform for connecting students with industry. Highly recommended for institutions.",
      rating: 5
    },
    {
      name: "Vikram Singh",
      role: "University Admin, Delhi University",
      text: "The analytics and reporting features have helped us improve our placement metrics significantly.",
      rating: 5
    }
  ];

  return (
    <div className="membership-page">
      <div className="user-sidebar--mobile-only">
        <UserSidebar />
      </div>
      {/* Back to Dashboard Button */}
      <button className="back-to-dashboard" onClick={() => navigate('/dashboard/user/')}>
        <span className="back-arrow">←</span>
        <span>Back to Dashboard</span>
      </button>

      {/* Hero Section */}
      <section className="membership-hero">
        <div className="hero-content">
          <h1 className="hero-title">Join Our Community</h1>
          <p className="hero-subtitle">
            Unlock opportunities, build connections, and accelerate your career growth
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => document.getElementById('pricing').scrollIntoView({behavior: 'smooth'})}>
              Explore Plans
            </button>
            <button className="btn btn-outline">Learn More</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-decoration">
            <div className="circle-1">
              <img src={logo} alt="Saathium Foundation" className="logo-float" />
            </div>
            <div className="circle-2">
              {/* <img src={logo} alt="Saathium Foundation" className="logo-float" /> */}
            </div>
            <div className="circle-3">
              {/* <img src={logo} alt="Saathium Foundation" className="logo-float" /> */}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="membership-benefits">
        <h2>Why Join?</h2>
        <div className="benefits-grid">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="benefit-card">
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="membership-pricing" id="pricing">
        <h2>Choose Your Plan</h2>
        <p className="pricing-subtitle">Select the perfect membership tier for your needs</p>
        <div className="pricing-grid">
          {tiers.map(tier => (
            <div 
              key={tier.id} 
              className={`pricing-card ${tier.color} ${tier.popular ? 'popular' : ''}`}
            >
              {tier.popular && <div className="popular-badge">Most Popular</div>}
              
              <h3>{tier.name}</h3>
              <p className="tier-desc">{tier.description}</p>
              
              <div className="price-section">
                <span className="price">{tier.price}</span>
                <span className="period">/year</span>
              </div>
              
              <ul className="features-list">
                {tier.features.map((feature, idx) => (
                  <li key={idx}>
                    <span className="feature-check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className={`tier-btn ${tier.popular ? 'btn-primary' : 'btn-secondary'}`}>
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="membership-testimonials">
        <h2>What Members Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="testimonial-card">
              <div className="stars">
                {"⭐".repeat(testimonial.rating)}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="membership-faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h4>Can I upgrade my membership?</h4>
            <p>Yes! You can upgrade to a higher tier anytime. We'll prorate the difference.</p>
          </div>
          <div className="faq-item">
            <h4>Is there a refund policy?</h4>
            <p>We offer 30-day money-back guarantee if you're not satisfied with your membership.</p>
          </div>
          <div className="faq-item">
            <h4>How do I get support?</h4>
            <p>University members get 24/7 priority support. Other tiers have email & chat support.</p>
          </div>
          <div className="faq-item">
            <h4>What payment methods are accepted?</h4>
            <p>We accept all major credit cards, debit cards, and UPI payments.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="membership-cta-section">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of members already benefiting from our platform</p>
          <button className="btn btn-large">Start Your Journey Today</button>
        </div>
      </section>

      {/* Existing Memberships & Form */}
      <section className="membership-admin">
        <div className="admin-grid">
          {/* Existing Memberships */}
          <div className="admin-section">
            <h3>Existing Memberships</h3>
            <div className="memberships-list">
              {memberships.length > 0 ? (
                memberships.map(m => (
                  <div key={m.id} className="membership-item">
                    <div className="membership-info">
                      <strong>{m.name || m.userId}</strong>
                      <span className={`status ${m.status}`}>{m.status}</span>
                    </div>
                    <div className="membership-details">
                      <small>{m.organization} • {m.membershipType}</small>
                    </div>
                  </div>
                ))
              ) : (
                <p className="empty-state">No memberships added yet</p>
              )}
            </div>
          </div>

          {/* Add Membership Form */}
          <div className="admin-section">
            <h3>Add New Membership</h3>
            <form onSubmit={handleSubmit} className="membership-form">
              <div className="form-group">
                <input
                  name="userId"
                  value={form.userId}
                  onChange={handleChange}
                  placeholder="User ID"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  name="organization"
                  value={form.organization}
                  onChange={handleChange}
                  placeholder="Organization"
                  required
                />
              </div>
              <div className="form-group">
                <select
                  name="membershipType"
                  value={form.membershipType}
                  onChange={handleChange}
                  required
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty & Institute</option>
                  <option value="university">University</option>
                </select>
              </div>
              <div className="form-row">
                <input
                  name="startDate"
                  type="date"
                  value={form.startDate}
                  onChange={handleChange}
                  required
                />
                <input
                  name="endDate"
                  type="date"
                  value={form.endDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Add Membership
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
