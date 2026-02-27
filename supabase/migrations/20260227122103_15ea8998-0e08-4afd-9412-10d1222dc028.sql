
-- Single table to store portfolio content as JSON per section
CREATE TABLE public.portfolio_content (
    section TEXT PRIMARY KEY,
    data JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio_content ENABLE ROW LEVEL SECURITY;

-- Everyone can read portfolio content (it's a public portfolio)
CREATE POLICY "Anyone can read portfolio content"
ON public.portfolio_content
FOR SELECT
USING (true);

-- Only authenticated users can update (admin will be the only authenticated user)
CREATE POLICY "Authenticated users can insert portfolio content"
ON public.portfolio_content
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update portfolio content"
ON public.portfolio_content
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Seed default data for all sections
INSERT INTO public.portfolio_content (section, data) VALUES
('about', '{
  "bio": [
    "I am a product-focused engineering student (B.Tech CCAI) with a track record of turning ideas into functional software. I believe the best way to learn is to build, which is why I prioritize rapid prototyping and real-world execution.",
    "I am currently seeking internship opportunities where I can tackle complex infrastructure challenges and grow alongside experienced engineers."
  ],
  "focusAreas": [
    {"title": "Cloud Infrastructure", "description": "Expanding my knowledge of scalable architecture to prepare for enterprise-level cloud deployment."},
    {"title": "Rapid Prototyping", "description": "Utilizing modern AI tools and frameworks to accelerate development cycles, as demonstrated in my recent hackathon wins."},
    {"title": "Core Engineering", "description": "Grounding my fast-paced builds in strong foundational logic and Java programming."}
  ],
  "socialLinks": [
    {"label": "GitHub", "href": "https://github.com/syedmaroofhussain3-blip"},
    {"label": "LinkedIn", "href": "#"},
    {"label": "Email", "href": "mailto:syedmaroofhussain3@gmail.com"},
    {"label": "Instagram", "href": "https://www.instagram.com/syed_maroof19?igsh=MW9mZDBid3JyNzVvcw=="}
  ]
}'::jsonb),
('projects', '{
  "projects": [
    {"title": "SoloRank", "description": "A gamified self-improvement mobile app inspired by Solo Leveling. Transform real-life tasks into RPG-style Quests across Study, Fitness, Coding, Money & Social — earn XP, Gold, and level up from 1 to 100.", "href": "https://quest-star-rise.lovable.app"},
    {"title": "University Hub", "description": "A full-stack platform for managing university events — from registration to live updates. Built to streamline campus event coordination for students and organizers.", "href": "https://syedmaroofhussain3-blip.github.io/university-hub/"}
  ]
}'::jsonb),
('certifications', '{
  "certifications": [
    {"id": 1, "title": "2nd Position – Code Sprint Hackathon", "description": "Tech Mirai Fiesta 2026, Integral University (Feb 5–7, 2026)", "imageSrc": "/images/code-sprint.png", "tag": "Achievement"},
    {"id": 2, "title": "Data Visualization with Cognos Dashboard Embedded", "description": "Issued by IBM Skills Network & Integral University (Feb 21, 2026)", "imageSrc": "/images/ibm-cognos.png", "tag": "Certification"},
    {"id": 3, "title": "Build Your Own Chatbot", "description": "Issued by IBM & Integral University (Feb 21, 2026)", "imageSrc": "/images/ibm-chatbot.png", "tag": "Certification"}
  ],
  "education": [
    {"title": "B.Tech – Cloud Computing & AI (CCAI)", "institution": "Integral University, Lucknow", "status": "1st Year (Current)", "highlight": ""},
    {"title": "High School – Class 12th (ISC Board)", "institution": "Christ Church College", "status": "Completed", "highlight": "Built a strong foundation in Object-Oriented Programming (Java)"}
  ]
}'::jsonb),
('contact', '{
  "contactInfo": {"location": "Lucknow, India", "email": "syedmaroofhussain3@gmail.com"},
  "socialLinks": [
    {"label": "GitHub", "href": "https://github.com/syedmaroofhussain3-blip"},
    {"label": "LinkedIn", "href": "#"},
    {"label": "Email", "href": "mailto:syedmaroofhussain3@gmail.com"},
    {"label": "Instagram", "href": "https://www.instagram.com/syed_maroof19?igsh=MW9mZDBid3JyNzVvcw=="}
  ]
}'::jsonb),
('resume', '{
  "name": "Syed Maroof Hussain",
  "title": "Cloud Computing & AI Student | Full-Stack Developer",
  "email": "syedmaroofhussain3@gmail.com",
  "location": "Lucknow, India",
  "github": "github.com/syedmaroofhussain3-blip",
  "summary": "Product-focused engineering student with a track record of turning ideas into functional software. Experienced in rapid prototyping with modern AI tools and frameworks, with strong foundations in Java and web technologies.",
  "education": [
    {"degree": "B.Tech – Cloud Computing & Artificial Intelligence", "institution": "Integral University, Lucknow", "period": "2025 – Present", "detail": "First-year student focused on cloud infrastructure and AI systems"},
    {"degree": "High School – Class 12th (ISC Board)", "institution": "Christ Church College", "period": "Completed", "detail": "Strong foundation in Object-Oriented Programming (Java)"}
  ],
  "skills": [
    {"category": "Languages", "items": "HTML, CSS, JavaScript, Java"},
    {"category": "Frameworks", "items": "React, Node.js, Tailwind CSS"},
    {"category": "Tools", "items": "Git, GitHub, VS Code, Lovable"},
    {"category": "Focus Areas", "items": "Cloud Infrastructure, Rapid Prototyping, AI Integration"}
  ],
  "projects": [
    {"name": "SoloRank", "description": "Gamified self-improvement app inspired by Solo Leveling — RPG-style quests, XP system, and leveling mechanics."},
    {"name": "University Hub", "description": "Full-stack platform for managing university events — registration, live updates, and campus coordination."}
  ],
  "achievements": [
    "2nd Position – Code Sprint Hackathon, Tech Mirai Fiesta 2026, Integral University",
    "IBM Certification – Data Visualization with Cognos Dashboard Embedded",
    "IBM Certification – Build Your Own Chatbot"
  ]
}'::jsonb);
