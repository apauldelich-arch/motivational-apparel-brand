import Link from "next/link";

export const metadata = { title: "Privacy Notice | DELITE" };

export default function PrivacyPage() {
  return <main className="privacy-page"><Link href="/" className="privacy-brand">DELITE / WEAR YOUR MINDSET</Link><article><p className="section-label">PRIVACY NOTICE</p><h1>Your details. Used clearly.</h1><p>DELITE collects your first name, email address, selected reminder, optional custom message and email consent when you request early access.</p><h2>How we use it</h2><p>We use this information to manage your early-access request, understand which reminders people want and send DELITE early-access and launch updates when you have agreed to receive them.</p><h2>Where it is stored</h2><p>Your submission is stored in Supabase. DELITE notifications are delivered through Resend. We do not sell your personal data.</p><h2>How long we keep it</h2><p>We keep early-access details until 12 months after the DELITE launch, then delete them unless we need to keep them for a legal reason.</p><h2>Your choices</h2><p>You can withdraw your email consent, ask to see, correct or delete your details by emailing <a href="mailto:apauldelich@gmail.com">apauldelich@gmail.com</a>. You can also complain to the UK Information Commissioner&apos;s Office.</p><p className="privacy-updated">Last updated: 29 October 2026</p></article></main>;
}
