export const asset = (path) => import.meta.env.BASE_URL + path

export const portfolio = {
  identity: {
    name: 'John Christopher Portugal', title: 'Multimedia Designer',
    tagline: 'I create brand visuals and edit videos for businesses, campaigns, and independent films.',
    bio: 'I’m a multimedia designer with a background in Information Technology and Web Systems. My work spans brand and logo design, promotional posters, video advertisements, and short films.',
    background: 'As a freelance multimedia editor, I’ve delivered three video advertisements and three brand posters for clients. I’ve also filmed and edited a short film, designed a promotional poster for an independent film, and created content for my own brand and social channels.',
    heroPortrait: 'assets/hero-portrait.jpg', heroPortraitAlt: 'John Christopher Portugal wearing sunglasses against a lime-green background',
    portrait: 'assets/about-portrait.jpg', portraitAlt: 'John Christopher Portugal wearing a bandana in a black-and-white portrait with a lime-green stripe',
    cv: 'assets/John_Christopher_Portugal_Resume.pdf',
  },
  sections: {
    about: ['About', 'A little about me.'],
    work: ['Work', 'Selected work'],
    skills: ['Skills', 'Skills & tools.'],
    education: ['Education', 'Education'],
    certifications: ['Certifications', 'Certifications'],
    recognition: ['Recognition', 'Testimonials & awards.'],
    services: ['Services', 'How I can help.'],
    contact: ['Contact', 'Let’s work together.'],
  },
  projects: [
    {
      id: 'dingalan', title: 'Dingalan, Aurora', category: 'Travel montage', sample: true,
      description: 'A sample travel montage featuring Dingalan, Aurora.',
      cover: 'assets/works/dingalan.jpg', imageAlt: 'Dingalan montage title over a coastal landscape',
      result: 'A completed travel montage sample.',
      media: [
        { type: 'video', src: 'assets/works/dingalan.mp4', poster: 'assets/works/dingalan.jpg', caption: 'Dingalan, Aurora — travel montage sample' },
      ],
    },
    {
      id: 'baler', title: 'Baler, Aurora', category: 'Travel montage', sample: true,
      description: 'A sample travel montage featuring Baler, Aurora.',
      cover: 'assets/works/baler.jpg', imageAlt: 'Baler montage title over waves and coastal rock formations',
      result: 'A completed travel montage sample.',
      media: [
        { type: 'video', src: 'assets/works/baler.mp4', poster: 'assets/works/baler.jpg', caption: 'Baler, Aurora — travel montage sample' },
      ],
    },
    {
      id: 'stryve', title: 'STRYVE', category: 'Brand concept development',
      description: 'A fitness brand concept with primary and secondary logo designs.',
      cover: 'assets/works/stryve-primary.png', imageAlt: 'STRYVE logo with an orange arrow and a weightlifter',
      coverStyle: 'logo',
      result: 'Primary and secondary logos for the STRYVE brand concept.',
      media: [
        { type: 'image', src: 'assets/works/stryve-primary.png', alt: 'STRYVE primary logo with the tagline Where Outer Limits Meet Inner Drive', caption: 'Primary logo' },
        { type: 'image', src: 'assets/works/stryve-secondary.png', alt: 'STRYVE secondary logo with a barbell motif', caption: 'Secondary logo' },
      ],
    },
    {
      id: 'mystery-nuggets', title: 'Mystery Nuggets', category: 'Business / brand posts',
      description: 'Two promotional video posts for Mystery Nuggets.',
      cover: 'assets/works/mystery-nuggets-02.jpg', imageAlt: 'Mystery Nuggets brand logo from the promotional video',
      result: 'Two video edits for business and brand posts.',
      media: [
        { type: 'video', src: 'assets/works/mystery-nuggets-01.mp4', poster: 'assets/works/mystery-nuggets-01.jpg', caption: 'Mystery Nuggets — version 01' },
        { type: 'video', src: 'assets/works/mystery-nuggets-02-web.mp4', poster: 'assets/works/mystery-nuggets-02.jpg', caption: 'Mystery Nuggets — version 02' },
      ],
    },
  ],
  skills: [
    { title: 'Design & production', items: ['Brand & logo design', 'Poster design', 'Video advertisements', 'Short film production', 'HTML & CSS'] },
    { title: 'Professional skills', items: ['Client communication', 'Time management'] },
    {
      title: 'Software & tools',
      items: ['Adobe Photoshop', 'Adobe Lightroom', 'Canva', 'Adobe Illustrator', 'Adobe Premiere Pro', 'Adobe After Effects', 'CapCut'],
      marks: { 'Adobe Photoshop': 'Ps', 'Adobe Lightroom': 'Lr', Canva: 'C', 'Adobe Illustrator': 'Ai', 'Adobe Premiere Pro': 'Pr', 'Adobe After Effects': 'Ae', CapCut: 'ribbon' },
    },
  ],
  credentials: [
    { type: 'Degree', name: 'BS Information Technology, Major in Web Systems', issuer: 'Nueva Ecija University of Science and Technology', date: '2026–2027' },
  ],
  certifications: [
    {
        "id": "html-css",
        "title": "HTML and CSS",
        "issuer": "Certiport / Pearson",
        "date": "October 29, 2026",
        "kind": "Certification",
        "photo": "assets/certificates/html-css.jpg",
        "photoAlt": "HTML and CSS certificate awarded to John Christopher Portugal",
        "file": "assets/certificates/html-css.pdf"
    },
    {
        "id": "wadhwani",
        "title": "Employability Skills: JobReady (With AI) v1",
        "issuer": "Wadhwani Foundation",
        "date": "November 5, 2026",
        "kind": "Advanced level · Skill readiness",
        "photo": "assets/certificates/wadhwani.jpg",
        "photoAlt": "Employability Skills: JobReady (With AI) v1 certificate awarded to John Christopher Portugal",
        "file": "assets/certificates/wadhwani.pdf"
    },
    {
        "id": "database-101",
        "title": "Database 101: Data Storage, SQL and Query Optimization",
        "issuer": "UpskillTechPH Training Services",
        "date": "August 21, 2026",
        "kind": "Certificate of participation",
        "photo": "assets/certificates/database-101.jpg",
        "photoAlt": "Database 101: Data Storage, SQL and Query Optimization certificate awarded to John Christopher Portugal",
        "file": "assets/certificates/database-101.pdf"
    },
    {
        "id": "google-gemini",
        "title": "AI Tools 101: How to Use Google Gemini Like a Pro",
        "issuer": "UpskillTechPH Training Services",
        "date": "August 22, 2026",
        "kind": "Certificate of participation",
        "photo": "assets/certificates/google-gemini.jpg",
        "photoAlt": "AI Tools 101: How to Use Google Gemini Like a Pro certificate awarded to John Christopher Portugal",
        "file": "assets/certificates/google-gemini.pdf"
    },
    {
        "id": "emerging-it",
        "title": "Learning Advocate 2026 Series: Emerging IT Innovations",
        "issuer": "UpskillTechPH Training Services",
        "date": "August 22, 2026",
        "kind": "Certificate of participation",
        "photo": "assets/certificates/emerging-it.jpg",
        "photoAlt": "Learning Advocate 2026 Series: Emerging IT Innovations certificate awarded to John Christopher Portugal",
        "file": "assets/certificates/emerging-it.pdf"
    },
    {
        "id": "crisis-management",
        "title": "Data-Driven Crisis Management: Utilizing AI and Predictive Analytics for Emergency Preparedness",
        "issuer": "Armstrong Training and Development Services",
        "date": "August 30, 2026",
        "kind": "Certificate of participation",
        "photo": "assets/certificates/crisis-management.jpg",
        "photoAlt": "Data-Driven Crisis Management: Utilizing AI and Predictive Analytics for Emergency Preparedness certificate awarded to John Christopher Portugal",
        "file": "assets/certificates/crisis-management.png"
    },
    {
        "id": "infodiscover",
        "title": "INFODISCOVER 2026: Click with Care, Post with Aware",
        "issuer": "Nueva Ecija University of Science and Technology",
        "date": "September 4, 2026",
        "kind": "Certificate of participation",
        "photo": "assets/certificates/infodiscover.jpg",
        "photoAlt": "INFODISCOVER 2026: Click with Care, Post with Aware certificate awarded to John Christopher Portugal",
        "file": "assets/certificates/infodiscover.pdf"
    }
],
  recognition: [],
  services: {
    enabled: true,
    entries: [
      { title: 'Brand & logo design', detail: 'Logos and coordinated brand assets for digital and print.' },
      { title: 'Poster design', detail: 'Promotional posters for campaigns, brands, and independent films.' },
      { title: 'Video editing', detail: 'Advertisements, short films, and social media edits with motion graphics and color grading.' },
    ],
  },
  contact: {
    endpoint: '',
    profiles: [],
  },
}
