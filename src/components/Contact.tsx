import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Copy, Check, Terminal, Play, Loader2, RefreshCw, Trash } from 'lucide-react';
import { profile } from '@/data/portfolio';
import { SectionHeading } from '@/components/About';

interface SentMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<'email' | 'phone' | null>(null);
  
  // SMTP Simulation States
  const [isSending, setIsSending] = useState(false);
  const [smtpLogs, setSmtpLogs] = useState<string[]>([]);
  const [isSent, setIsSent] = useState(false);
  const [showOutbox, setShowOutbox] = useState(false);
  const [sentMessages, setSentMessages] = useState<SentMessage[]>([]);
  
  const logEndRef = useRef<HTMLDivElement>(null);

  // Scroll SMTP logs
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [smtpLogs]);

  // Load outbox history
  useEffect(() => {
    const saved = localStorage.getItem('alok_portfolio_outbox');
    if (saved) {
      try {
        setSentMessages(JSON.parse(saved));
      } catch (e) {
        // Ignore error
      }
    }
  }, []);

  const copy = (value: string, key: 'email' | 'phone') => {
    navigator.clipboard?.writeText(value).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 1800);
    }).catch(() => {});
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const startSMTPSimulation = async () => {
    setIsSending(true);
    setSmtpLogs(['[SMTP] Initializing connection to mail daemon...']);

    const logsList = [
      `[SMTP] Resolving MX records for gmail.com...`,
      `[SMTP] Found mail exchanger: gmail-smtp-in.l.google.com [108.177.97.26]`,
      `[SMTP] Connecting to 108.177.97.26:25... Connected.`,
      `[SMTP] <= 220 mx.google.com ESMTP k15-20020a170902c5si7365022.207 - gsmtp`,
      `[SMTP] => EHLO alok-portfolio.local`,
      `[SMTP] <= 250-mx.google.com at your service... 250-STARTTLS`,
      `[SMTP] => STARTTLS`,
      `[SMTP] <= 220 2.0.0 Ready to start TLS`,
      `[SMTP] Upgrading connection to secure TLSv1.3...`,
      `[SMTP] Connection secured. Cipher: TLS_AES_256_GCM_SHA384`,
      `[SMTP] => MAIL FROM:<${formData.email.toLowerCase()}>`,
      `[SMTP] <= 250 2.1.0 OK`,
      `[SMTP] => RCPT TO:<${profile.email}>`,
      `[SMTP] <= 250 2.1.5 OK`,
      `[SMTP] => DATA`,
      `[SMTP] <= 354 Start mail input; end with <CR><LF>.<CR><LF>`,
      `[SMTP] Sending payload... From: "${formData.name}", Subject: "${formData.subject}"`,
      `[SMTP] => .`,
      `[SMTP] <= 250 2.0.0 OK: queued as j6-20020a170902c306si7390978plk.604 - gsmtp`,
      `[SMTP] => QUIT`,
      `[SMTP] <= 221 2.0.0 closing connection`,
      `🎉 SMTP Dispatch complete. Payload successfully routed.`
    ];

    for (const log of logsList) {
      await new Promise((r) => setTimeout(r, 220));
      setSmtpLogs((prev) => [...prev, log]);
    }

    // Save message to local history
    const newMessage: SentMessage = {
      id: Math.random().toString(36).substring(2, 9),
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      timestamp: new Date().toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updated = [newMessage, ...sentMessages];
    setSentMessages(updated);
    localStorage.setItem('alok_portfolio_outbox', JSON.stringify(updated));

    setIsSending(false);
    setIsSent(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      startSMTPSimulation();
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSent(false);
    setSmtpLogs([]);
  };

  const clearOutbox = () => {
    if (confirm('Clear local message outbox?')) {
      setSentMessages([]);
      localStorage.removeItem('alok_portfolio_outbox');
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="absolute inset-0 -z-10 card-grid [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_70%)] opacity-50" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-72 w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[120px]" />

      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading index="05" title="Contact" subtitle="Let's build something" />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          {/* Left: Info Cards */}
          <div className="reveal flex flex-col justify-between rounded-2xl border border-white/10 bg-bg-card/60 p-6 sm:p-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight text-text-main sm:text-3xl">
                  Let's connect.
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-text-muted">
                  Whether it's a full-stack role, a DevOps collaboration, or just
                  talking shop about REST design and Kubernetes — my inbox is open.
                </p>
              </div>

              <div className="space-y-3">
                <ContactRow
                  icon={<Mail className="h-4 w-4" />}
                  label="Email"
                  value={profile.email}
                  href={`mailto:${profile.email}`}
                  copied={copied === 'email'}
                  onCopy={() => copy(profile.email, 'email')}
                />
                <ContactRow
                  icon={<Phone className="h-4 w-4" />}
                  label="Phone"
                  value={profile.phone}
                  href={`tel:${profile.phoneHref}`}
                  copied={copied === 'phone'}
                  onCopy={() => copy(profile.phone, 'phone')}
                />
                <ContactRow
                  icon={<MapPin className="h-4 w-4" />}
                  label="Location"
                  value={profile.location}
                />
              </div>
            </div>

            {/* Social handles */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-text-dim mb-3">
                Professional Profiles
              </p>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-xs font-semibold text-text-main transition-colors hover:border-white/20 hover:bg-white/5"
                >
                  <Github className="h-4 w-4 text-text-dim" />
                  GitHub
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-xs font-semibold text-text-main transition-colors hover:border-white/20 hover:bg-white/5"
                >
                  <Linkedin className="h-4 w-4 text-accent-2" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact Form / SMTP console */}
          <div className="reveal rounded-2xl border border-white/10 bg-bg-card/60 p-6 sm:p-8">
            {!isSending && !isSent && !showOutbox && (
              /* Contact Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-lg font-bold text-text-main">Send a message</h4>
                  {sentMessages.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowOutbox(true)}
                      className="font-mono text-xs text-accent hover:underline flex items-center gap-1.5"
                    >
                      <Terminal className="h-3 w-3" />
                      View Outbox ({sentMessages.length})
                    </button>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="form-name" className="block text-xs font-medium text-text-muted mb-1.5">
                      Your Name
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-text-main placeholder-white/25 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      placeholder="Jane Doe"
                    />
                    {errors.name && <p className="mt-1 text-xs text-rose-400">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="form-email" className="block text-xs font-medium text-text-muted mb-1.5">
                      Your Email
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-text-main placeholder-white/25 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      placeholder="jane@example.com"
                    />
                    {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="form-subject" className="block text-xs font-medium text-text-muted mb-1.5">
                    Subject
                  </label>
                  <input
                    id="form-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-text-main placeholder-white/25 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="Collaboration project idea"
                  />
                  {errors.subject && <p className="mt-1 text-xs text-rose-400">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="form-message" className="block text-xs font-medium text-text-muted mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="form-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-text-main placeholder-white/25 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="Details about your inquiry..."
                  />
                  {errors.message && <p className="mt-1 text-xs text-rose-400">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent to-accent-2 py-3 text-sm font-semibold text-bg shadow-lg shadow-accent/15 transition-transform hover:scale-[1.01]"
                >
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  Dispatch Secure Message
                </button>
              </form>
            )}

            {(isSending || isSent) && !showOutbox && (
              /* SMTP Live Console or Success */
              <div className="flex flex-col h-full min-h-[300px] font-mono text-[12px]">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3 text-text-dim">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4" />
                    <span>SMTP CLIENT STREAM</span>
                  </div>
                  {isSending && <Loader2 className="h-3.5 w-3.5 animate-spin text-accent" />}
                  {isSent && <span className="text-emerald-400 text-xs font-bold">DISPATCHED</span>}
                </div>

                <div className="flex-1 overflow-y-auto max-h-[220px] bg-black/60 rounded-lg p-4 text-text-muted space-y-1 custom-scrollbar">
                  {smtpLogs.map((log, index) => {
                    let color = 'text-text-muted';
                    if (log.startsWith('[SMTP] =>')) {
                      color = 'text-accent-3';
                    } else if (log.startsWith('[SMTP] <= 2') || log.includes('OK')) {
                      color = 'text-emerald-400';
                    } else if (log.startsWith('🎉')) {
                      color = 'text-accent font-bold';
                    }
                    return <div key={index} className={color}>{log}</div>;
                  })}
                  <div ref={logEndRef} />
                </div>

                {isSent && (
                  <div className="mt-6 space-y-3">
                    <p className="text-sm text-text-muted text-center">
                      Your message was successfully relayed to <span className="text-text-main">{profile.email}</span>. A copy is logged in your local Outbox history.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={handleReset}
                        className="flex-1 rounded-lg border border-white/10 px-4 py-2.5 text-xs font-semibold text-text-main transition-colors hover:bg-white/5"
                      >
                        Send Another Message
                      </button>
                      <button
                        onClick={() => setShowOutbox(true)}
                        className="flex-1 rounded-lg bg-white/5 border border-white/15 px-4 py-2.5 text-xs font-semibold text-accent transition-colors hover:bg-white/10"
                      >
                        Inspect Local Outbox
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {showOutbox && (
              /* Outbox Viewer */
              <div className="flex flex-col h-full min-h-[300px] font-mono text-[12px] text-text-muted">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <div className="flex items-center gap-2 text-text-main">
                    <Terminal className="h-4 w-4 text-accent" />
                    <span>Outbox Log History</span>
                  </div>
                  <button
                    onClick={() => setShowOutbox(false)}
                    className="text-xs text-text-dim hover:text-text-main"
                  >
                    ← Back to form
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto max-h-[220px] space-y-3 pr-2 custom-scrollbar">
                  {sentMessages.length === 0 ? (
                    <div className="h-32 flex flex-col items-center justify-center text-text-dim text-center">
                      <Trash className="h-8 w-8 opacity-20 mb-2" />
                      <p>Outbox empty.</p>
                    </div>
                  ) : (
                    sentMessages.map((msg) => (
                      <div key={msg.id} className="rounded-lg border border-white/5 bg-white/[0.01] p-3 text-[11px] relative">
                        <span className="absolute right-3 top-3 text-[9px] text-text-dim">{msg.timestamp}</span>
                        <div className="font-semibold text-text-main truncate max-w-[80%]">{msg.subject}</div>
                        <div className="text-text-dim mt-0.5">From: {msg.name} ({msg.email})</div>
                        <p className="mt-2 text-text-muted line-clamp-2 italic">"{msg.message}"</p>
                      </div>
                    ))
                  )}
                </div>

                {sentMessages.length > 0 && (
                  <div className="mt-4 border-t border-white/5 pt-3 flex justify-between">
                    <button
                      onClick={clearOutbox}
                      className="text-red-400 hover:underline flex items-center gap-1"
                    >
                      <Trash className="h-3.5 w-3.5" />
                      Clear History
                    </button>
                    <button
                      onClick={() => setShowOutbox(false)}
                      className="rounded bg-accent text-bg font-semibold px-3 py-1.5 transition-transform hover:scale-[1.03]"
                    >
                      Write message
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon, label, value, href, copied, onCopy,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  copied?: boolean;
  onCopy?: () => void;
}) {
  const inner = (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:border-white/20">
      <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-accent">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-text-dim">{label}</p>
        <p className="truncate text-sm font-medium text-text-main">{value}</p>
      </div>
      {onCopy && (
        <button
          onClick={(e) => { e.preventDefault(); onCopy(); }}
          aria-label={`Copy ${label}`}
          className="ml-auto grid h-8 w-8 place-items-center rounded-md text-text-dim transition-colors hover:text-text-main"
        >
          {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
        </button>
      )}
    </div>
  );

  if (href) {
    return <a href={href} className="block">{inner}</a>;
  }
  return inner;
}
