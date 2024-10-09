import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

// Import FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Failed to send message.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <Head>
        <title>Solargreen - Home</title>
        <meta name="description" content="Solargreen - Bringing green energy solutions" />
      </Head>

      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-container">
          <Image src="/logo.png" alt="Solargreen Logo" width={50} height={50} />
          <h1>Solargreen</h1>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <Image src="/solar.jpg" alt="Solar energy" layout="fill" className="hero-image" />
          <div className="hero-content">
            <h1>Welcome to Solargreen</h1>
            <p>Green Energy Solutions for a Sustainable Future</p>
            
            {/* Social Media Icons */}
            <div className="social-icons-hero">
              <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faWhatsapp} size="2x" />
              </a>
              <a href="https://instagram.com/your-handle" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact">
          <h2 className="contact-title">Contact Us</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <button type="submit">Send Message</button>
          </form>
        </section>

        {/* Our Services Section */}
        <section id="services">
          <h2>Our Services</h2>
          <div className="service-cards">
            <div className="card">
              <Image src="/service1.jpg" alt="Service 1" width={300} height={200} />
              <h3>Solar Panel Installation</h3>
              <p>We offer expert installation of energy-efficient solar panels.</p>
            </div>
            <div className="card">
              <Image src="/service2.jpg" alt="Service 2" width={300} height={200} />
              <h3>Energy Storage Solutions</h3>
              <p>Our storage solutions ensure energy availability when you need it most.</p>
            </div>
            <div className="card">
              <Image src="/service3.jpg" alt="Service 3" width={300} height={200} />
              <h3>Consultation & Design</h3>
              <p>We offer personalized consultation and custom design services for green energy systems.</p>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about-us">
          <h2>About Us</h2>
          <p>Solargreen is a leading provider of renewable energy solutions. We specialize in solar panel installation, energy storage systems, and green energy consulting services. Our mission is to make the world more sustainable, one solar panel at a time.</p>
        </section>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} Solargreen. All rights reserved.</p>
      </footer>
    </div>
  );
}
