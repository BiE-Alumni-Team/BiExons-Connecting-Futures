// data/alumni.js
// Same shape as the profile page, plus `slug` and `session`.
export const alumni = [
  {
    slug: "byte-trio",
    firstName: "Byte",
    lastName: "Trio",
    image: "", // leave empty to show initials
    designation: "Senior Research Scientist",
    company: "BioTech Innovations Lab",
    location: "Dhaka, Bangladesh",
    email: "bytetrio.bau@gmail.com",
    phone: "",
    about: "Working on AI-driven molecular docking and structural bioinformatics.",
    session: "2019-2020",
    networking: { mentorship: false, jobReferrals: false },
    links: [
      { label: "LinkedIn", url: "https://linkedin.com/in/example" },
      { label: "GitHub", url: "https://github.com/jarif" },
      { label: "ResearchGate", url: "https://researchgate.net/example" },
    ],
    experience: [
      {
        title: "Senior Research Scientist",
        company: "BioTech Innovations Lab",
        period: "2023 – Present",
        type: "Full time",
        focus: "AI for Molecular Docking, Structural Bioinformatics",
        skills: ["Python", "R", "Bioinformatics", "Molecular Docking", "PyMOL"],
      },
    ],
    education: [
      {
        degree: "B.Sc. in Bioinformatics Engineering",
        institute: "Bangladesh Agricultural University",
        department: "Dept. of Computer Science & Mathematics",
        period: "2023 – 2024",
        specialization: "Genomics",
      },
    ],
    publications: [
      {
        title: "Highly accurate protein structure prediction with AlphaFold",
        venue: "Nature",
        year: 2021,
      },
    ],
  },
  {
    slug: "nusrat-jahan",
    firstName: "Nusrat",
    lastName: "Jahan",
    image: "",
    designation: "Data Scientist",
    company: "Grameen Analytics",
    location: "Dhaka, Bangladesh",
    email: "nusrat@example.com",
    phone: "+8801700000000",
    about: "Applying machine learning to agricultural datasets.",
    session: "2017-2018",
    networking: { mentorship: true, jobReferrals: true },
    links: [{ label: "LinkedIn", url: "https://linkedin.com/in/example" }],
    experience: [
      {
        title: "Data Scientist",
        company: "Grameen Analytics",
        period: "2021 – Present",
        type: "Full time",
        focus: "Crop yield prediction",
        skills: ["Python", "SQL", "TensorFlow"],
      },
    ],
    education: [
      {
        degree: "B.Sc. in Bioinformatics Engineering",
        institute: "Bangladesh Agricultural University",
        department: "Dept. of Computer Science & Mathematics",
        period: "2017 – 2021",
        specialization: "Machine Learning",
      },
    ],
    publications: [],
  },
  {
    slug: "arif-hossain",
    firstName: "Arif",
    lastName: "Hossain",
    image: "",
    designation: "PhD Researcher",
    company: "University of Tokyo",
    location: "Tokyo, Japan",
    email: "arif@example.com",
    phone: "",
    about: "",
    session: "2020-2021",
    networking: { mentorship: true, jobReferrals: false },
    links: [{ label: "GitHub", url: "https://github.com/example" }],
    experience: [],
    education: [
      {
        degree: "B.Sc. in Bioinformatics Engineering",
        institute: "Bangladesh Agricultural University",
        department: "Dept. of Computer Science & Mathematics",
        period: "2020 – 2024",
        specialization: "Proteomics",
      },
    ],
    publications: [],
  },
];

export const getAlumniBySlug = (slug) => alumni.find((a) => a.slug === slug);
export const fullName = (a) => `${a.firstName} ${a.lastName}`.trim();
