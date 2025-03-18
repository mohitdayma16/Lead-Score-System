import React, { useState } from "react";
import "./Contact.css"; // Import the CSS file

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is invalid";
    if (!formData.subject) errors.subject = "Subject is required";
    if (!formData.message) errors.message = "Message is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setFormSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="container contact-section">
      <section>
        <div className="grid-container">
          {/* Left Side: Contact Info */}
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>Visit our head office or contact us today:</p>
            <p className="font-semibold">Address</p>
            <p>Arya Samaj Road,Uttam Nagar, New Delhi, 110059</p>
            <p>Email: kumarimohini924@gmail.com</p>
            <p>Contact Here: (+91) 9818264588</p>
            <p>Hours: Monday to Saturday, 9:00 AM - 5:00 PM</p>
          </div>

          {/* Right Side: Google Maps iframe */}
          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.2945648549266!2d77.05751417528865!3d28.620932475671033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d04d9c531119b%3A0x9c703e7d53417ee1!2sArya%20Samaj%20Rd%2C%20Uttam%20Nagar%2C%20Delhi%2C%20110059!5e0!3m2!1sen!2sin!4v1739784371040!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location"
            ></iframe>

          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form">
          {formSubmitted && (
            <p className="success-message">
              Thanks for contacting us! We’ll resolve your query soon.
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "error" : ""}
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>

            <div>
              <label className="block">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div>
              <label className="block">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={errors.subject ? "error" : ""}
              />
              {errors.subject && <p className="error-message">{errors.subject}</p>}
            </div>

            <div>
              <label className="block">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className={errors.message ? "error" : ""}
              ></textarea>
              {errors.message && <p className="error-message">{errors.message}</p>}
            </div>

            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Contact;
