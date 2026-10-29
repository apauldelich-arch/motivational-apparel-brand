"use client";

import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { reminders } from "./data";

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const gloveImages: Record<string, string> = {
  "WORK HARDER ON YOURSELF": "/images/glove-work-harder.png",
  "DISCIPLINE. FOCUS. PROGRESS.": "/images/glove-discipline-focus-progress.png",
  "GO ONE STEP AT A TIME": "/images/glove-go-one-step.png",
  "DON'T OVERTHINK. JUST TAKE ACTION.": "/images/glove-dont-overthink.png",
  "NOBODY CARES. KEEP TRAINING.": "/images/glove-nobody-cares.png",
  "TRY ONE MORE TIME. DON’T GIVE UP NOW.": "/images/glove-try-one-more-time.png",
  "BECOME MORE. DO MORE. CREATE MORE.": "/images/glove-become-more.png",
  "WORK HARD IN SILENCE.": "/images/glove-work-hard-silence.png",
  "IT'S YOUR GOAL. NO ONE ELSE CAN DO THE WORK FOR YOU.": "/images/glove-its-your-goal.png",
  "REMEMBER WHY YOU STARTED.": "/images/glove-remember-why.png"
};

export default function Home() {
  const [selected, setSelected] = useState(reminders.length - 1);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const phrase = reminders[selected];

  const submitEarlyAccess = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("submitting");

    const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!projectUrl || !publishableKey) {
      setFormStatus("error");
      return;
    }

    try {
      const response = await fetch(`${projectUrl}/rest/v1/delite_early_access`, {
        method: "POST",
        headers: {
          apikey: publishableKey,
          Authorization: `Bearer ${publishableKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal"
        },
        body: JSON.stringify({
          first_name: firstName.trim(),
          email: email.trim().toLowerCase(),
          selected_reminder: phrase
        })
      });

      if (!response.ok) throw new Error("Unable to submit early access");
      setFormStatus("success");
      setFirstName("");
      setEmail("");
    } catch {
      setFormStatus("error");
    }
  };

  return <main>
    <header className="site-header">
      <button className="brand-logo" onClick={() => scrollTo("top")} aria-label="DELITE home"><Image src="/images/delite-mountain-mindset-logo-cropped.png" alt="DELITE Wear Your Mindset" fill sizes="140px" priority /></button>
      <button className="header-action" onClick={() => scrollTo("reminders")}>Explore reminders <ArrowRight size={15} /></button>
    </header>

    <section id="top" className="hero">
      <div className="hero-photo"><Image src="/images/remember-why-you-started-hero.png" alt="Athlete wearing a DELITE glove with a personal reminder" fill priority sizes="100vw" /></div>
      <div className="hero-shade" />
      <div className="hero-copy"><p className="eyebrow">DELITE / WEAR YOUR MINDSET</p><h1>YOU KNOW WHY<br />YOU STARTED.<br /><em>DON&apos;T STOP NOW.</em></h1><p>For the moments when you&apos;re tired, doubting yourself or ready to stop. A reminder on your gloves to help you find the strength to keep going.</p><button className="button button-gold" onClick={() => scrollTo("reminders")}>Find your message <ArrowRight size={16} /></button></div>
      <button className="scroll-cue" onClick={() => scrollTo("why")}>Discover DELITE <ArrowDown size={15} /></button>
    </section>

    <section id="why" className="why-section">
      <div className="why-intro"><div className="why-heading"><div className="section-label">01 / WHY DELITE</div><h2>A REMINDER YOU<br />CAN WEAR WHEN YOU<br /><em>NEED IT THE MOST.</em></h2></div>
      <div className="why-story"><p>You know that feeling. You&apos;re working towards something that matters to you. You&apos;ve made progress, you&apos;ve put in the effort, but some days are harder than others.</p><p>You&apos;re tired. You start doubting yourself. You wonder whether it&apos;s worth carrying on.</p><p>Then you look down and read:</p><p className="featured-line">“You&apos;ve come this far. <strong>Don&apos;t stop now.</strong>”</p><p>Sometimes, that&apos;s all you need to keep going.</p></div></div>
      <blockquote>We don&apos;t design slogans for other people to admire. We create something you wear to remind yourself who you want to become.</blockquote>
    </section>

    <section className="moments-section"><div className="moments-intro"><div className="moments-heading"><div className="section-label">02 / MADE FOR PROGRESS</div><h2>THE WORK<br />IS <em>PERSONAL.</em></h2></div></div><div className="moments-grid"><figure><Image src="/images/design-barbell-lift.png" alt="Athlete lifting a barbell while wearing REMEMBER WHY YOU STARTED gym gloves" fill sizes="(max-width: 760px) 100vw, 34vw" /></figure><figure><Image src="/images/design-remember-why-closeup.png" alt="Close-up of REMEMBER WHY YOU STARTED gym gloves" fill sizes="(max-width: 760px) 100vw, 34vw" /></figure><figure><Image src="/images/design-work-harder-closeup.png" alt="Close-up of WORK HARDER ON YOURSELF gym gloves" fill sizes="(max-width: 760px) 100vw, 34vw" /></figure><div className="portrait-moments"><figure><Image src="/images/design-pull-up-glove.png" alt="Athlete performing a pull-up while wearing REMEMBER WHY YOU STARTED gym gloves" fill sizes="(max-width: 760px) 100vw, 430px" /></figure><figure><Image src="/images/design-dumbbell-glove.png" alt="Athlete lifting a dumbbell while wearing REMEMBER WHY YOU STARTED gym gloves" fill sizes="(max-width: 760px) 100vw, 430px" /></figure></div></div></section>

    <section id="reminders" className="reminder-section"><div className="selector-intro"><div className="selector-heading"><div className="section-label">03 / CHOOSE YOUR REMINDER</div><h2>CONTROL YOUR<br /><em>INNER VOICE.</em></h2></div></div><div className="selector-layout"><div><div className="phrase-list" role="listbox" aria-label="Choose a reminder">{reminders.map((item, index) => <button key={item} role="option" aria-selected={selected === index} onClick={() => setSelected(index)}><span>{String(index + 1).padStart(2, "0")}</span>{item}</button>)}</div><p className="custom-message-prompt">HAVE YOUR OWN MESSAGE?<span>WE CAN CUSTOMISE IT FOR YOU.</span></p></div><div className="glove-preview"><Image src={gloveImages[phrase]} alt={`Black glove preview: ${phrase}`} fill sizes="(max-width: 760px) 100vw, 50vw" /><span className="preview-tag">DELITE / GLOVE CONCEPT</span></div></div><button className="button button-outline continue" onClick={() => scrollTo("early-access")}>Continue with this reminder <ArrowRight size={16} /></button></section>

    <section id="early-access" className="access-section"><div className="access-copy"><div className="section-label">04 / EARLY ACCESS</div><h2>BE PART OF<br />THE <em>BEGINNING.</em></h2><p>We&apos;re building something for people who refuse to give up on themselves.</p><p>Choose the reminder that speaks to you. Help shape our first DELITE collection and be among the first to know when it launches.</p></div><form aria-label="Get early access" onSubmit={submitEarlyAccess}><div className="selected-reminder"><span>YOUR SELECTED REMINDER</span><strong>{phrase}</strong><small>DELITE / GYM GLOVES</small></div><label>First name<input value={firstName} onChange={(event) => setFirstName(event.target.value)} autoComplete="given-name" required maxLength={80} placeholder="Your first name" /></label><label>Email address<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" /></label><button className="button button-gold" type="submit" disabled={formStatus === "submitting"}>{formStatus === "submitting" ? "Joining..." : "Get early access"}</button>{formStatus === "success" && <p className="form-message success" role="status">You&apos;re on the list. We&apos;ll be in touch when DELITE launches.</p>}{formStatus === "error" && <p className="form-message error" role="alert">We couldn&apos;t save your details. Please try again.</p>}</form></section>

    <footer><span className="footer-logo"><Image src="/images/delite-mountain-mindset-logo-cropped.png" alt="DELITE Wear Your Mindset" fill sizes="180px" /></span><div className="footer-statement"><span>DELITE / WEAR YOUR MINDSET.</span><strong>DESIGNED FOR<br /><em>HIGH-PERFORMANCE PEOPLE.</em></strong><small className="footer-meta">© 2026. Based in London. Available worldwide.</small></div></footer>
  </main>;
}
