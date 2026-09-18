import { useState } from "react";
import { initialProfile } from "./profileData";

export function useProfile() {
  const [profile, setProfile] = useState(initialProfile);

  //--------------image-------------
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Only allow images
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    // Create temporary URL for preview
    const imageUrl = URL.createObjectURL(file);

    setProfile((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        image: imageUrl,
      },
    }));
  };

  // ---------- Personal ----------
  const [personalEditing, setPersonalEditing] = useState(false);
  const [personalDraft, setPersonalDraft] = useState(profile.personal);

  const editPersonal = () => {
    setPersonalDraft({ ...profile.personal });
    setPersonalEditing(true);
  };

  const updatePersonal = (key, value) => {
    setPersonalDraft((prev) => ({ ...prev, [key]: value }));
  };

  const savePersonal = () => {
    setProfile((prev) => ({ ...prev, personal: personalDraft }));
    setPersonalEditing(false);
  };

  const cancelPersonal = () => {
    setPersonalDraft({ ...profile.personal });
    setPersonalEditing(false);
  };

  // ---------- BAU ----------
  const [bauEditing, setBauEditing] = useState(false);
  const [bauDraft, setBauDraft] = useState(profile.bau.session);

  const editBau = () => {
    setBauDraft(profile.bau.session);
    setBauEditing(true);
  };

  const saveBau = () => {
    setProfile((prev) => ({
      ...prev,
      bau: { ...prev.bau, session: bauDraft },
    }));
    setBauEditing(false);
  };

  const cancelBau = () => {
    setBauDraft(profile.bau.session);
    setBauEditing(false);
  };

  // ---------- Experience ----------
  const [experienceEditingId, setExperienceEditingId] = useState(null);
  const [experienceDraft, setExperienceDraft] = useState(null);
  const [skillsEditingId, setSkillsEditingId] = useState(null);
  const [newSkill, setNewSkill] = useState("");

  const editExperience = (item) => {
    setExperienceEditingId(item.id);
    setExperienceDraft({ ...item, skills: [...item.skills] });
  };

  const updateExperience = (key, value) => {
    setExperienceDraft((prev) => ({ ...prev, [key]: value }));
  };

  const saveExperience = () => {
    setProfile((prev) => ({
      ...prev,
      experiences: prev.experiences.map((item) =>
        item.id === experienceDraft.id ? experienceDraft : item
      ),
    }));

    setExperienceEditingId(null);
    setExperienceDraft(null);
  };

  const cancelExperience = () => {
    setExperienceEditingId(null);
    setExperienceDraft(null);
  };

  const addExperience = () => {
    const item = {
      id: Date.now(),
      designation: "",
      company: "",
      focus: "",
      timeline: "",
      type: "Full-time",
      skills: [],
    };

    setProfile((prev) => ({
      ...prev,
      experiences: [...prev.experiences, item],
    }));

    editExperience(item);
  };

  const deleteExperience = (id) => {
    setProfile((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((item) => item.id !== id),
    }));

    if (experienceEditingId === id) cancelExperience();
  };

  const toggleSkillsEdit = (id) => {
    setSkillsEditingId((prev) => (prev === id ? null : id));
    setNewSkill("");
  };

  const addSkill = (experienceId) => {
    const skill = newSkill.trim();
    if (!skill) return;

    setProfile((prev) => ({
      ...prev,
      experiences: prev.experiences.map((item) =>
        item.id === experienceId
          ? { ...item, skills: [...item.skills, skill] }
          : item
      ),
    }));

    setNewSkill("");
  };

  const deleteSkill = (experienceId, skillIndex) => {
    setProfile((prev) => ({
      ...prev,
      experiences: prev.experiences.map((item) =>
        item.id === experienceId
          ? {
            ...item,
            skills: item.skills.filter((_, index) => index !== skillIndex),
          }
          : item
      ),
    }));
  };

  // ---------- Education ----------
  const [educationEditingId, setEducationEditingId] = useState(null);
  const [educationDraft, setEducationDraft] = useState(null);

  const editEducation = (item) => {
    setEducationEditingId(item.id);
    setEducationDraft({ ...item });
  };

  const updateEducation = (key, value) => {
    setEducationDraft((prev) => ({ ...prev, [key]: value }));
  };

  const saveEducation = () => {
    setProfile((prev) => ({
      ...prev,
      education: prev.education.map((item) =>
        item.id === educationDraft.id ? educationDraft : item
      ),
    }));

    setEducationEditingId(null);
    setEducationDraft(null);
  };

  const cancelEducation = () => {
    setEducationEditingId(null);
    setEducationDraft(null);
  };

  const addEducation = () => {
    const item = {
      id: Date.now(),
      degree: "",
      university: "",
      department: "",
      timeline: "",
      specialization: "",
    };

    setProfile((prev) => ({
      ...prev,
      education: [...prev.education, item],
    }));

    editEducation(item);
  };

  const deleteEducation = (id) => {
    setProfile((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }));
  };

  // ---------- Publications ----------
  const [publicationEditingId, setPublicationEditingId] = useState(null);
  const [publicationDraft, setPublicationDraft] = useState(null);

  const editPublication = (item) => {
    setPublicationEditingId(item.id);
    setPublicationDraft({ ...item });
  };

  const updatePublication = (key, value) => {
    setPublicationDraft((prev) => ({ ...prev, [key]: value }));
  };

  const savePublication = () => {
    setProfile((prev) => ({
      ...prev,
      publications: prev.publications.map((item) =>
        item.id === publicationDraft.id ? publicationDraft : item
      ),
    }));

    setPublicationEditingId(null);
    setPublicationDraft(null);
  };

  const cancelPublication = () => {
    setPublicationEditingId(null);
    setPublicationDraft(null);
  };

  const addPublication = () => {
    const item = {
      id: Date.now(),
      title: "",
      link: "",
    };

    setProfile((prev) => ({
      ...prev,
      publications: [...prev.publications, item],
    }));

    editPublication(item);
  };

  const deletePublication = (id) => {
    setProfile((prev) => ({
      ...prev,
      publications: prev.publications.filter((item) => item.id !== id),
    }));
  };

  // ---------- Networking ----------
  const [networkingEditing, setNetworkingEditing] = useState(false);
  const [networkingDraft, setNetworkingDraft] = useState(profile.networking);

  const editNetworking = () => {
    setNetworkingDraft({ ...profile.networking });
    setNetworkingEditing(true);
  };

  const updateNetworking = (key, value) => {
    setNetworkingDraft((prev) => ({ ...prev, [key]: value }));
  };

  const saveNetworking = () => {
    setProfile((prev) => ({
      ...prev,
      networking: networkingDraft,
    }));
    setNetworkingEditing(false);
  };

  const cancelNetworking = () => {
    setNetworkingDraft({ ...profile.networking });
    setNetworkingEditing(false);
  };

  // ---------- Links ----------
  const [linkEditingId, setLinkEditingId] = useState(null);
  const [linkDraft, setLinkDraft] = useState(null);

  const editLink = (item) => {
    setLinkEditingId(item.id);
    setLinkDraft({ ...item });
  };

  const updateLink = (key, value) => {
    setLinkDraft((prev) => ({ ...prev, [key]: value }));
  };

  const saveLink = () => {
    setProfile((prev) => ({
      ...prev,
      links: prev.links.map((item) =>
        item.id === linkDraft.id ? linkDraft : item
      ),
    }));

    setLinkEditingId(null);
    setLinkDraft(null);
  };

  const cancelLink = () => {
    setLinkEditingId(null);
    setLinkDraft(null);
  };

  const addLink = () => {
    const item = {
      id: Date.now(),
      name: "",
      url: "",
    };

    setProfile((prev) => ({
      ...prev,
      links: [...prev.links, item],
    }));

    editLink(item);
  };

  const deleteLink = (id) => {
    setProfile((prev) => ({
      ...prev,
      links: prev.links.filter((item) => item.id !== id),
    }));
  };

  return {
    profile,
    image: {
      upload: handleImageUpload,
    },
    personal: {
      editing: personalEditing,
      draft: personalDraft,
      edit: editPersonal,
      update: updatePersonal,
      save: savePersonal,
      cancel: cancelPersonal,
    },
    bau: {
      editing: bauEditing,
      draft: bauDraft,
      setDraft: setBauDraft,
      edit: editBau,
      save: saveBau,
      cancel: cancelBau,
    },
    experience: {
      editingId: experienceEditingId,
      draft: experienceDraft,
      skillsEditingId,
      newSkill,
      setNewSkill,
      edit: editExperience,
      update: updateExperience,
      save: saveExperience,
      cancel: cancelExperience,
      add: addExperience,
      delete: deleteExperience,
      toggleSkillsEdit,
      addSkill,
      deleteSkill,
    },
    education: {
      editingId: educationEditingId,
      draft: educationDraft,
      edit: editEducation,
      update: updateEducation,
      save: saveEducation,
      cancel: cancelEducation,
      add: addEducation,
      delete: deleteEducation,
    },
    publication: {
      editingId: publicationEditingId,
      draft: publicationDraft,
      edit: editPublication,
      update: updatePublication,
      save: savePublication,
      cancel: cancelPublication,
      add: addPublication,
      delete: deletePublication,
    },
    networking: {
      editing: networkingEditing,
      draft: networkingDraft,
      edit: editNetworking,
      update: updateNetworking,
      save: saveNetworking,
      cancel: cancelNetworking,
    },
    link: {
      editingId: linkEditingId,
      draft: linkDraft,
      edit: editLink,
      update: updateLink,
      save: saveLink,
      cancel: cancelLink,
      add: addLink,
      delete: deleteLink,
    },
  };
}
