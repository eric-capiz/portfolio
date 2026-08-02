import { useRef, useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { siteCopy, socialLinks } from "../data/siteCopy";

const WEB3_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();
const { contact } = siteCopy;

const channelIcons = {
  email: FaEnvelope,
  github: FaGithub,
  linkedin: FaLinkedin,
};

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
        <div className="form-status form-status--success" role="status">
          Message sent successfully!
        </div>
      );
    }

    if (status === "error") {
      return (
        <div className="form-status form-status--error" role="alert">
          Failed to send message. Please try again or email{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>.
        </div>
      );
    }

    if (status === "noconfig") {
      return (
        <div className="form-status form-status--error" role="alert">
          The contact form is temporarily unavailable. Email me at{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a> instead.
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
            <h2>{contact.title}</h2>
            <p className="section-lede">{contact.lede}</p>
          </header>

          <ul className="contact__channels">
            {socialLinks.map((channel) => {
              const Icon = channelIcons[channel.id];
              const isExternal = channel.href.startsWith("http");

              return (
                <li key={channel.id}>
                  <a
                    href={channel.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                  >
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

        <form ref={form} onSubmit={handleSubmit} className="contact__form shine-border">
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Your name"
              autoComplete="name"
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
              autoComplete="email"
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
