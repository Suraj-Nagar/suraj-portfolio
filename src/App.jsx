import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Server, Database, Code2, Palette, ExternalLink, Mail, Github, Linkedin, Send } from 'lucide-react'
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
                desc: "A comprehensive real-estate and room finding platform. It showcases advanced full-stack capabilities including complex search filters, image uploads, and user authentication.", 
                tags: ["MongoDB", "Express", "React", "Node.js"],
                bgClass: "bg-gradient-1",
                link: "https://rw-frontend-nine.vercel.app/"
              },
              { 
                name: "Learning Hub", 
                desc: "An interactive educational platform designed for seamless course delivery. Demonstrates complex state management, secure database handling, and a highly responsive UI.", 
                tags: ["MERN Stack", "Redux", "Tailwind"],
                bgClass: "bg-gradient-2",
                reverse: true,
                link: "#" // Replace when you have the link for Learning Hub
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
                  <div className="visual-placeholder">{proj.name} Visual</div>
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
              className="contact-form glass-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } }
              }}
            >
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <textarea rows="5" placeholder="Your Message" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary submit-btn">
                Send Message <Send size={16} style={{marginLeft: '0.5rem', display: 'inline'}} />
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
