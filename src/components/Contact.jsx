import { useRef, useState, useEffect } from "react";

const WEB3_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();

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

  return (
    <section id="contact" className="contact">
      <div className="contact-content">
        <h2>Get In Touch</h2>
        <form
          ref={form}
          onSubmit={handleSubmit}
          className="contact-form"
          autoComplete="off"
        >
          <div className="form-group">
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
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Your email"
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows="5"
              placeholder="Your message"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="submit-btn"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
          {status === "success" && (
            <div className="status-message success">Message sent successfully!</div>
          )}
          {status === "error" && (
            <div className="status-message error">
              Failed to send message. Please try again.
            </div>
          )}
          {status === "noconfig" && (
            <div className="status-message error">
              Contact form needs{" "}
              <code style={{ fontSize: "0.9em" }}>VITE_WEB3FORMS_ACCESS_KEY</code>{" "}
              in <code style={{ fontSize: "0.9em" }}>.env</code>. Free key:{" "}
              <a
                href="https://web3forms.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                web3forms.com
              </a>
              .
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;
