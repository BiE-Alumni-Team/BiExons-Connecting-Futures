

export const initialProfile = {

  personal: {
    first_name: "Manus",
    last_name: "Islam",
    email: "manus@example.com",
    phone: "+880 1712-345678",
    location: "Dhaka, Bangladesh",
    aboutMe:
      "Bioinformatics researcher interested in genomics, molecular docking, and AI-driven drug discovery.",
    image: "",
  },

  bau: {
    session: "2023–2024",
  },

  experiences: [
    {
      id: 1,
      designation: "Senior Research Scientist",
      company: "BioTech Innovations Lab",
      focus:
        "AI for Molecular Docking, Structural Bioinformatics, Target Validation, and Drug Discovery.",
      timeline: "2023 – Present",
      type: "Full-time",
      skills: ["Python", "R", "Bioinformatics", "Molecular Docking", "PyMOL"],
    },
  ],

  education: [
    {
      id: 1,
      degree: "Ph.D. in Computational Biology & Genomics",
      university: "Harvard University",
      department: "Department of Biostatistics and Computational Biology",
      timeline: "2019 – 2023",
      specialization: "Deep Learning for Macromolecular Structure Prediction",
    },
  ],

  publications: [
    {
      id: 1,
      title: "Machine Learning Approaches for Plant Disease Detection",
      link: "https://example.com/publication-1",
    },
  ],

  networking: {
    mentorship: true,
    mentorshipText:
      "Available for one-on-one career guidance and graduate school application advice.",
    jobReferral: true,
    jobReferralText:
      "Available to refer qualified alumni to suitable opportunities.",
  },

  links: [
    { id: 1, name: "LinkedIn", url: "https://linkedin.com" },
    { id: 2, name: "GitHub", url: "https://github.com" },
    { id: 3, name: "Google Scholar", url: "https://scholar.google.com" },
    { id: 4, name: "ResearchGate", url: "https://researchgate.net" },
  ],
};


export default initialProfile;
