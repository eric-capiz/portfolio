import { useRef, useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const WEB3_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();

const channels = [
  {
    label: "Email",
    value: "ericcapiz@gmail.com",
    href: "mailto:ericcapiz@gmail.com",
    icon: FaEnvelope,
  },
  {
    label: "GitHub",
    value: "eric-capiz",
    href: "https://github.com/eric-capiz",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    value: "eric-capiz",
    href: "https://www.linkedin.com/in/eric-capiz",
    icon: FaLinkedin,
  },
];

function Contact() {
  const form = useRef(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => setStatus(""), 6000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!WEB3_ACCESS_KEY) {
      setStatus("noconfig");
      return;
    }

    const el = form.current;
    if (!el) return;

    const nameEl = el.elements.namedItem("name");
    const emailEl = el.elements.namedItem("email");
    const messageEl = el.elements.namedItem("message");

    const name = nameEl instanceof HTMLInputElement ? nameEl.value : "";
    const email = emailEl instanceof HTMLInputElement ? emailEl.value : "";
    const message =
      messageEl instanceof HTMLTextAreaElement ? messageEl.value : "";

    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3_ACCESS_KEY,
          subject: `Portfolio contact from ${name}`,
          from_name: name,
          email,
          message,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success) {
        setStatus("success");
        el.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const renderStatusMessage = () => {
    if (status === "success") {
      return (
        <div className="form-status form-status--success">Message sent successfully!</div>
      );
    }

    if (status === "error") {
      return (
        <div className="form-status form-status--error">
          Failed to send message. Please try again.
        </div>
      );
    }

    if (status === "noconfig") {
      return (
        <div className="form-status form-status--error">
          Contact form needs{" "}
          <code>VITE_WEB3FORMS_ACCESS_KEY</code> in <code>.env</code>. Free key:{" "}
          <a href="https://web3forms.com/" target="_blank" rel="noopener noreferrer">
            web3forms.com
          </a>
          .
        </div>
      );
    }

    return null;
  };

  return (
    <section id="contact" className="contact">
      <div className="section-shell contact__layout">
        <aside className="contact__aside">
          <header className="section-head">
            <p className="section-kicker">04 · Contact</p>
            <h2>Let&apos;s build something</h2>
            <p className="section-lede">
              Open to frontend roles, contract work, and collaborations. Send a message or
              reach out directly. I&apos;ll get back to you.
            </p>
          </header>

          <ul className="contact__channels">
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <li key={channel.label}>
                  <a href={channel.href} target={channel.href.startsWith("http") ? "_blank" : undefined} rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                    <Icon aria-hidden="true" />
                    <span>
                      <small>{channel.label}</small>
                      {channel.value}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </aside>

        <form
          ref={form}
          onSubmit={handleSubmit}
          className="contact__form shine-border"
          autoComplete="off"
        >
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Your name"
              autoComplete="off"
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="you@email.com"
              autoComplete="off"
            />
          </div>
          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows="5"
              placeholder="Tell me about your project..."
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="btn btn--primary btn--full"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending..." : "Send message"}
          </button>
          {renderStatusMessage()}
        </form>
      </div>
    </section>
  );
}

export default Contact;
