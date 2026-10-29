"use client";

import Image from "next/image";
import { useState } from "react";
import { legacyReminders } from "../data";
import "./style2.css";
import "./round2.css";

const products = [
  { name: "RUNNING SHIRT", message: "WORK HARDER ON YOURSELF.", detail: "RUNNING / CHEST MARK / CONCEPT", image: "/motiversity-images/delite-runner.png", focus: "card-runner" },
  { name: "GYM GLOVES", message: "SMALL STEPS. BIG RESULTS.", detail: "TRAINING / PALM MESSAGE / CONCEPT", image: "/motiversity-images/delite-gloves.png", focus: "card-gloves" },
  { name: "GYM SHORTS", message: "YOU KNOW WHAT MATTERS. STAY FOCUSED.", detail: "TRAINING / WAISTBAND MESSAGE / IN DEVELOPMENT", focus: "card-shorts" }
];

export default function MotiversityDirection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMessage, setActiveMessage] = useState(0);
  const [interestSent, setInterestSent] = useState(false);
  const selectedMessage = legacyReminders[activeMessage];
  return <main className="motive">
    <header className="motive-header">
      <nav aria-label="Primary navigation"><a href="#shop">CONCEPTS</a><a href="#apparel">APPAREL</a><a href="#messages">MESSAGES</a><a href="#about">ABOUT DELITE</a></nav>
      <a className="motive-logo" href="#top" aria-label="DELITE home"><Image src="/motiversity-images/delite-logo.png" alt="DELITE" width={158} height={86} priority /></a>
      <button className="motive-menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Open navigation">MENU <span>{menuOpen ? "×" : "☰"}</span></button>
      {menuOpen && <nav className="mobile-links" aria-label="Mobile navigation"><a onClick={() => setMenuOpen(false)} href="#shop">CONCEPTS</a><a onClick={() => setMenuOpen(false)} href="#apparel">APPAREL</a><a onClick={() => setMenuOpen(false)} href="#messages">MESSAGES</a><a onClick={() => setMenuOpen(false)} href="#about">ABOUT DELITE</a></nav>}
    </header>

    <a className="motive-strip" href="#interest">DROP 01 / JOIN EARLY ACCESS <span>→</span></a>

    <section id="top" className="motive-hero">
      <div className="hero-panel hero-left"><Image src="/motiversity-images/delite-training-dark.png" alt="Athlete preparing to train" fill priority sizes="(max-width: 760px) 100vw, 33vw" /></div>
      <div className="hero-panel hero-centre"><Image src="/motiversity-images/delite-training.png" alt="Athlete in a DELITE training tee" fill priority sizes="(max-width: 760px) 100vw, 34vw" /></div>
      <div className="hero-panel hero-right"><Image src="/motiversity-images/delite-runner.png" alt="Runner in a DELITE performance layer" fill priority sizes="(max-width: 760px) 100vw, 33vw" /></div>
      <div className="hero-veil" />
      <div className="hero-intro"><p>DELITE / DROP 01</p><h1>BUILT FOR<br/>THE <em>WORK.</em></h1><span>Performance apparel with a reminder built in.</span><a href="#shop">EXPLORE DROP 01 <b>→</b></a></div>
    </section>

    <section id="shop" className="shop-section">
      <div className="shop-heading"><p>DROP 01 / THE FIRST CONCEPTS</p><h2>EXPLORE THE<br/><em>WORK.</em></h2><a href="#interest">REGISTER INTEREST <span>→</span></a></div>
      <div className="shop-grid">
        {products.map((product) => <article className="shop-card" key={product.name}>
          <div className={`shop-image ${product.focus}`}>{product.image ? <Image src={product.image} alt={product.name} fill sizes="(max-width: 760px) 100vw, 33vw" /> : <div className="shorts-visual"><span>DELITE / FOCUS</span><strong>GYM<br/>SHORTS</strong><small>CONCEPT IN DEVELOPMENT</small></div>}</div>
          <div className="shop-card-copy"><p>DELITE / DROP 01 / CONCEPT</p><h3>{product.name}</h3><strong>{product.message}</strong><small>{product.detail}</small><a href="#interest">REGISTER INTEREST <span>→</span></a></div>
        </article>)}
      </div>
    </section>

    <section id="apparel" className="full-product">
      <div className="full-product-copy"><p>THE DELITE TRAINING TEE</p><h2>THE MESSAGE<br/>IS <em>WITH YOU.</em></h2><span>Built for training. Made to bring you back to what you said you would do.</span><a href="#messages">SEE THE MESSAGE SYSTEM <b>→</b></a></div>
      <div className="full-product-image"><Image src="/motiversity-images/delite-mirror.png" alt="DELITE training tee with sleeve message detail" fill sizes="(max-width: 760px) 100vw, 55vw" /></div>
    </section>

    <section id="messages" className="message-section">
      <p>DELITE / MESSAGE SYSTEM</p><h2>YOUR TRAINING<br/>HAS A <em>VOICE.</em></h2>
      <div className="message-picker" role="tablist" aria-label="Choose a DELITE reminder">{legacyReminders.map((message, index) => <button key={message.value} role="tab" aria-selected={activeMessage === index} onClick={() => setActiveMessage(index)}><span>{String(index + 1).padStart(2, "0")}</span>{message.value}</button>)}</div>
      <div className="active-message"><span>DELITE / {selectedMessage.value}</span><strong>{selectedMessage.lines[0]}<br/><em>{selectedMessage.lines[1]}</em></strong><small>Select a message to see a different direction for the first drop.</small></div>
    </section>

    <section id="about" className="about-section"><div><p>ABOUT DELITE</p><h2>FOCUS.<br/><em>DISCIPLINE.</em><br/>PROGRESS.</h2></div><p className="about-copy">DELITE makes performance apparel for the personal conversation behind the workout. The logo is for the world. The reminder is for you.</p></section>

    <section id="interest" className="interest-section"><p>DROP 01 / CONCEPT VALIDATION</p><h2>CHOOSE WHAT<br/>WE MAKE <em>FIRST.</em></h2><span>Running shirt, gym gloves or gym shorts. Your interest guides the first DELITE collection.</span>{interestSent ? <div className="interest-feedback">Thank you. This local preview does not store your details yet.</div> : <form onSubmit={(event) => { event.preventDefault(); setInterestSent(true); }}><label>Email address<input required type="email" name="email" placeholder="you@example.com" /></label><button>REGISTER INTEREST <b>→</b></button></form>}<small>Concepts are in development. No payment or product order is taken on this page.</small></section>

    <footer className="motive-footer"><Image src="/motiversity-images/delite-logo.png" alt="DELITE" width={150} height={82} /><div><a href="#shop">CONCEPTS</a><a href="#messages">MESSAGES</a><a href="#about">OUR STORY</a></div><p>© 2026 DELITE / WEAR YOUR MINDSET.</p></footer>
  </main>;
}
