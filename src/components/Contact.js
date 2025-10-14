import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitStatus(""), 5000);
      } else {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus(""), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(""), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      type: "Email",
      value: "jmhoyt6355@gmail.com",
      icon: "✉️",
      description: "Send me an email anytime",
    },
    {
      type: "Phone",
      value: "(513) 405-7392",
      icon: "📞",
      description: "Call me during business hours",
    },
    {
      type: "LinkedIn",
      value: "linkedin.com/in/yourprofile",
      icon: "💼",
      description: "Connect with me professionally",
    },
    {
      type: "GitHub",
      value: "https://github.com/JohnMHoyt24",
      icon: "💻",
      description: "Check out my code repositories",
    },
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <h2>Get In Touch</h2>
          <p className="contact-subtitle">
            I'm always interested in new opportunities and collaborations. Let's
            building something great together!
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p className="contact-description">
              Feel free to reach out through any of the methods below. I
              typically respond within 1 to 2 days and am happy to discuss web
              development, AI or any other topics you'd like to explore.
            </p>

            <div className="contact-methods">
              {contactMethods.map((method, index) => (
                <div key={index} className="contact-method">
                  <div className="method-icon" aria-hidden="true">
                    {method.icon}
                  </div>
                  <div className="method-content">
                    <h4>{method.type}</h4>
                    <p className="method-value">{method.value}</p>
                    <p className="method-description">{method.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-form-container">
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3>Send a Message</h3>

                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                    aria-describedby="name-help"
                  />
                  <div id="name-help" className="form-help">
                    Please enter your full name
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                    aria-describedby="email-help"
                  />
                  <div id="email-help" className="form-help">
                    We'll use this to respond to your message
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    required
                    aria-describedby="subject-help"
                  />
                  <div id="subject-help" className="form-help">
                    Brief description of your inquiry
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    rows="5"
                    required
                    aria-describedby="message-help"
                  ></textarea>
                  <div id="message-help" className="form-help">
                    Please provide details about your project or inquiry
                  </div>
                </div>

                <button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting}
                  aria-describedby="submit-status"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {submitStatus && (
                  <div
                    id="submit-status"
                    className={`submit-status ${submitStatus}`}
                    role="status"
                    aria-live="polite"
                  >
                    {submitStatus === "success" &&
                      "Message sent successfully! I'll get back to you soon."}
                    {submitStatus === "error" &&
                      "Failed to send message. Please try again or contact me directly via email."}
                  </div>
                )}
              </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
