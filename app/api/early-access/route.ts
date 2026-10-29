import { NextResponse } from "next/server";
import { reminders } from "../../data";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!supabaseUrl || !supabaseKey || !resendApiKey) {
    return NextResponse.json({ error: "Early access is unavailable." }, { status: 503 });
  }

  let body: { first_name?: unknown; email?: unknown; selected_reminder?: unknown; custom_message?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please complete the form." }, { status: 400 });
  }

  const firstName = typeof body.first_name === "string" ? body.first_name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const selectedReminder = typeof body.selected_reminder === "string" ? body.selected_reminder : "";
  const customMessage = typeof body.custom_message === "string" ? body.custom_message.trim() : "";

  if (!firstName || firstName.length > 80 || !emailPattern.test(email) || email.length > 254 || customMessage.length > 240 || !reminders.some((reminder) => reminder === selectedReminder)) {
    return NextResponse.json({ error: "Please enter valid details." }, { status: 400 });
  }

  const registration = await fetch(`${supabaseUrl}/rest/v1/delite_early_access`, {
    method: "POST",
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify({
      first_name: firstName,
      email,
      selected_reminder: selectedReminder,
      custom_message: customMessage || null
    })
  });

  if (!registration.ok) {
    return NextResponse.json({ error: "We couldn't save your details. Please try again." }, { status: 502 });
  }

  const notification = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || "DELITE <onboarding@resend.dev>",
      to: [process.env.EARLY_ACCESS_NOTIFICATION_EMAIL || "apauldelich@gmail.com"],
      subject: `New DELITE early-access request — ${firstName}`,
      html: `<h1>New DELITE early-access request</h1><p><strong>Name:</strong> ${escapeHtml(firstName)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Selected reminder:</strong> ${escapeHtml(selectedReminder)}</p>${customMessage ? `<p><strong>Custom message:</strong> ${escapeHtml(customMessage)}</p>` : ""}`
    })
  });

  if (!notification.ok) {
    console.error("DELITE notification failed", await notification.text());
    return NextResponse.json({ error: "Your details were saved, but we couldn't send the notification." }, { status: 502 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  })[character] || character);
}
