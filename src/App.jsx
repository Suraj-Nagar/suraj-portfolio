import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Server, Database, Code2, Palette, ExternalLink, Mail, Github, Linkedin, Send, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { Tilt } from 'react-tilt'
import './index.css'

// 3D Background Component
function ParticleBackground(props) {
  const ref = useRef()
  const [sphere] = useState(() => {
    const positions = new Float32Array(5000 * 3)
    for (let i = 0; i < 5000; i++) {
      const r = 20 * Math.cbrt(Math.random())
      const theta = Math.random() * 2 * Math.PI
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    return positions
  })

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#00ffcc" size={0.05} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  )
}

function App() {
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    const formData = new FormData(e.target);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setFormStatus('success');
        e.target.reset();
        setTimeout(() => setFormStatus('idle'), 6000); // Hide after 6 seconds
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 4000);
      }
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  return (
    <div className="app-container">
      {/* 3D Canvas */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 15] }}>
          <ParticleBackground />
        </Canvas>
      </div>

      {/* Navbar */}
      <nav className="glass-nav">
        <div className="logo">Dev<span className="highlight">.</span>Pro</div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#expertise">Expertise</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="home" className="hero section-padding">
          <motion.div 
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
          >
            <motion.h1 variants={fadeUp} className="hero-title">
              Hi, I'm a <span className="highlight-gradient">MERN Stack</span> Developer.
            </motion.h1>
            <motion.p variants={fadeUp} className="hero-subtitle">
              Crafting robust, scalable, and visually stunning web applications with advanced CSS and immersive 3D experiences.
            </motion.p>
            <motion.div variants={fadeUp} className="hero-cta">
              <a href="#projects" className="btn btn-primary">View My Work</a>
              <a href="#contact" className="btn btn-outline">Let's Talk</a>
            </motion.div>
          </motion.div>
        </section>

        {/* Expertise Section */}
        <section id="expertise" className="expertise section-padding">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <h2 className="section-title">My <span className="highlight">Expertise</span></h2>
            <div className="title-underline"></div>
          </motion.div>

          <div className="skills-grid">
            {[
              { icon: Server, title: "Backend Architecture", desc: "Advanced Node.js & Express API development, microservices, and robust authentication.", tags: ["Node.js", "Express", "JWT"] },
              { icon: Database, title: "Database Management", desc: "Expertise in NoSQL modeling with MongoDB, complex aggregations, and performance tuning.", tags: ["MongoDB", "Mongoose", "Redis"] },
              { icon: Code2, title: "Frontend Mastery", desc: "Dynamic React interfaces, state management, and highly interactive UI/UX design.", tags: ["React", "Redux", "Three.js"] },
              { icon: Palette, title: "Advanced CSS", desc: "Pixel-perfect, responsive layouts, glassmorphism, and complex CSS animations.", tags: ["CSS3", "Framer Motion", "Tailwind"] }
            ].map((skill, index) => (
              <Tilt key={index} options={{ max: 15, scale: 1.05 }}>
                <motion.div 
                  className="skill-card glass-card"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 0.5 } }
                  }}
                >
                  <skill.icon className="skill-icon" size={40} />
                  <h3>{skill.title}</h3>
                  <p>{skill.desc}</p>
                  <div className="tech-tags">
                    {skill.tags.map(tag => <span key={tag}>{tag}</span>)}
                  </div>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects section-padding">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="section-title">Featured <span className="highlight">Projects</span></h2>
            <div className="title-underline"></div>
          </motion.div>
          
          <div className="project-showcase">
            {[
              { 
                name: "Room Wallah", 
                desc: "A dedicated platform designed to simplify the process of finding rooms and accommodations. Built with advanced search capabilities and user-friendly interfaces to connect seekers with the perfect living spaces.", 
                tags: ["MongoDB", "Express", "React", "Node.js"],
                bgClass: "bg-gradient-1",
                link: "https://rw-frontend-nine.vercel.app/",
                image: "/room-wallah.png"
              },
              { 
                name: "Learning Hub", 
                desc: "An e-learning platform where instructors can easily add and manage courses, and students can browse and watch them seamlessly. Features smooth video delivery and a dynamic learning dashboard.", 
                tags: ["MERN Stack", "Redux", "Tailwind"],
                bgClass: "bg-gradient-2",
                reverse: true,
                link: "https://lms-frontend-taupe-three.vercel.app/",
                image: "/learning-hub.png"
              }
            ].map((proj, idx) => (
              <motion.div 
                key={idx}
                className={`project-card glass-card ${proj.reverse ? 'reverse-layout' : ''}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
              >
                <div className="project-info">
                  <h3 className="project-name">{proj.name}</h3>
                  <p className="project-desc">{proj.desc}</p>
                  <div className="tech-tags">
                    {proj.tags.map(tag => <span key={tag}>{tag}</span>)}
                  </div>
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="btn btn-small btn-outline project-link" style={{marginTop: '2rem'}}>
                    Live Demo <ExternalLink size={16} style={{marginLeft: '0.5rem', display: 'inline'}} />
                  </a>
                </div>
                <div className={`project-visual ${proj.bgClass}`}>
                  {proj.image ? (
                    <img src={proj.image} alt={proj.name} className="project-image" />
                  ) : (
                    <div className="visual-placeholder">{proj.name} Visual</div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact section-padding">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="section-title">Get In <span className="highlight">Touch</span></h2>
            <div className="title-underline"></div>
          </motion.div>
          
          <div className="contact-container">
            <motion.div 
              className="contact-info glass-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h3>Let's build something amazing together.</h3>
              <p>I am currently open for full-time roles and exciting freelance projects. If you're looking for an experienced developer who can bring your ideas to life with modern technology, let's connect.</p>
              <div className="contact-methods">
                <a href="mailto:surajnagar5755@gmail.com" className="contact-method">
                  <Mail /> surajnagar5755@gmail.com
                </a>
                <a href="https://www.linkedin.com/in/suraj-nagar-b6504322a/" target="_blank" rel="noopener noreferrer" className="contact-method">
                  <Linkedin /> LinkedIn Profile
                </a>
                <a href="https://github.com/Suraj-Nagar" target="_blank" rel="noopener noreferrer" className="contact-method">
                  <Github /> GitHub Profile
                </a>
              </div>
            </motion.div>
            
            <motion.form 
              onSubmit={handleFormSubmit}
              className="contact-form glass-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } }
              }}
              style={{ position: 'relative' }}
            >
              {/* Premium Success Overlay */}
              {formStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="success-overlay"
                >
                  <CheckCircle size={60} className="success-icon" />
                  <h4>Message Sent Successfully!</h4>
                  <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
                </motion.div>
              )}

              {/* Error Overlay */}
              {formStatus === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="success-overlay"
                >
                  <XCircle size={60} style={{ color: '#ff4d4d', marginBottom: '1rem' }} />
                  <h4>Oops! Something went wrong.</h4>
                  <p>Please check your access key or try again later.</p>
                </motion.div>
              )}

              {/* Replace with your Access Key */}
              <input type="hidden" name="access_key" value="7a15a661-69ef-4cc1-9fd1-c71a698e82c7" />
              
              <div className="form-group">
                <input type="text" name="name" placeholder="Your Name" required disabled={formStatus === 'submitting'} />
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="Your Email" required disabled={formStatus === 'submitting'} />
              </div>
              <div className="form-group">
                <textarea name="message" rows="5" placeholder="Your Message" required disabled={formStatus === 'submitting'}></textarea>
              </div>
              <button type="submit" className="btn btn-primary submit-btn" disabled={formStatus === 'submitting'}>
                {formStatus === 'submitting' ? (
                  <>Sending... <Loader2 size={16} className="spinner" style={{marginLeft: '0.5rem', display: 'inline'}} /></>
                ) : (
                  <>Send Message <Send size={16} style={{marginLeft: '0.5rem', display: 'inline'}} /></>
                )}
              </button>
            </motion.form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 MERN Stack Developer. Crafted with React, Advanced CSS & Three.js.</p>
      </footer>
    </div>
  )
}

export default App
