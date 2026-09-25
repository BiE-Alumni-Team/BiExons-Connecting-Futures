"use client"

import {
  FiBookOpen,
  FiBriefcase,
  FiCheck,
  FiEdit2,
  FiLink,
  FiMapPin,
  FiPlus,
  FiShare2,
  FiTrash2,
  FiUsers,
  FiX,
} from "react-icons/fi";

import { useProfile } from "./profileFunctions";
import Link from "next/link";

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100";

const buttonClass =
  "rounded-lg px-4 py-2 text-sm font-semibold transition";

// const fetchPublication = async () => {
//   if (!draft.doi) {
//     setError("Please enter a DOI.");
//     return;
//   }

//   setFetching(true);
//   setError("");

//   try {
//     const response = await fetch(
//       `${API_BASE_URL}/api/publications/fetch/`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("access")}`,
//         },
//         body: JSON.stringify({
//           doi: draft.doi,
//         }),
//       }
//     );

//     const result = await response.json();

//     if (!response.ok) {
//       throw new Error(
//         result.detail || "Could not fetch publication."
//       );
//     }

//     update("title", result.title);
//     update("authors", result.authors);
//     update("journal", result.journal);
//     update("year", result.year);
//     update("link", result.link);

//   } catch (error) {
//     setError(error.message);
//   } finally {
//     setFetching(false);
//   }
// };

function Field({ label, value, onChange, type = "text", textarea = false }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-500">
        {label}
      </label>

      {textarea ? (
        <textarea
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      )}
    </div>
  );
}
function SaveCancel({ onSave, onCancel }) {
  return (
    <div className="flex justify-end gap-2">
      <button
        type="button"
        onClick={onCancel}
        className={`${buttonClass} border border-gray-300 hover:bg-gray-50`}
      >
        Cancel
      </button>

      <button
        type="button"
        onClick={onSave}
        className={`${buttonClass} flex items-center gap-2 bg-green-700 text-white hover:bg-green-800`}
      >
        <FiCheck /> Save Changes
      </button>
    </div>
  );
}

function Card({ title, icon, children, editing, onEdit, onCancel }) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-700">
            {icon}
          </div>
          <h2 className="truncate text-lg font-bold text-gray-800">
            {title}
          </h2>
        </div>

        {onEdit && (
          <button
            type="button"
            onClick={editing ? onCancel : onEdit}
            className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
          >
            {editing ? <FiX /> : <FiEdit2 />}
            {editing ? "Cancel" : "Edit"}
          </button>
        )}
      </div>

      <div className="mt-5">{children}</div>
    </section>
  );
}


function Personal({ profile, data }) {

  const fields = [
    ["first_name", "First Name"],
    ["last_name", "Last Name"],
    ["email", "Email"],
    ["phone", "Phone"],
    ["location", "Location"],
  ];

  return (
    <Card
      title="Personal Information"
      icon={<FiUsers />}
      editing={data.editing}
      onEdit={data.edit}
      onCancel={data.cancel}
    >
      {data.editing ? (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map(([key, label]) => (
              <Field
                key={key}
                label={label}
                type={key === "email" ? "email" : "text"}
                value={data.draft[key]}
                onChange={(value) => data.update(key, value)}
              />
            ))}
          </div>

          <Field
            label="About Me"
            textarea
            value={data.draft.aboutMe}
            onChange={(value) => data.update("aboutMe", value)}
          />

          <SaveCancel onSave={data.save} onCancel={data.cancel} />
        </div>
      ) : (
        <div className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            {fields.map(([key, label]) => (
              <div key={key} className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs font-bold uppercase text-gray-500">
                  {label}
                </p>

                <p className="mt-1 text-sm font-medium text-gray-800">
                  {profile?.[key] || "Not provided"}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs font-bold uppercase text-gray-500">
              About Me
            </p>

            <p className="mt-1 text-sm leading-6 text-gray-700">
              {profile?.aboutMe || "Not provided"}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}

function Bau({ profile, data }) {

  return (
    <Card
      title="BAU"
      icon={<FiBookOpen />}
      editing={data.editing}
      onEdit={data.edit}
      onCancel={data.cancel}
    >
      {data.editing ? (
        <div className="space-y-3">
          <Field
            label="BAU Session"
            value={data.draft}
            onChange={data.setDraft}
          />
          <SaveCancel onSave={data.save} onCancel={data.cancel} />
        </div>
      ) : (
        <div className="flex gap-2 items-center justify-between rounded-xl bg-green-50 p-4">
          <span className="flex-1 font-semibold text-gray-700">B.Sc in Bioinformatics Engineering</span>
          <span className="flex-1 flex justify-end rounded-full px-2 py-1 text-sm font-semibold text-white">
            <p className="bg-green-700 p-1 rounded-xl text-center">{profile?.session}</p>
          </span>
        </div>
      )}
    </Card>
  );
}

function Experience({ profile, data }) {
  console.log(profile)
  return (
    <Card title="Professional Experience & Skills" icon={<FiBriefcase />}>

      <div className="space-y-5">
        {profile?.experience?.map((item) => {
          const editing = data.editingId === item.id;
          const editingSkills = data.skillsEditingId === item.id;

          return (
            <div key={item.id} className="rounded-xl bg-gray-50 p-4">
              {editing ? (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Designation"
                      value={data.draft.designation}
                      onChange={(v) => data.update("designation", v)}
                    />
                    <Field
                      label="Company"
                      value={data.draft.company}
                      onChange={(v) => data.update("company", v)}
                    />
                    <Field
                      label="Timeline"
                      value={data.draft.timeline}
                      onChange={(v) => data.update("timeline", v)}
                    />

                    <div>
                      <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-500">
                        Type
                      </label>
                      <select
                        value={data.draft.type}
                        onChange={(e) => data.update("type", e.target.value)}
                        className={inputClass}
                      >
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Contract</option>
                        <option>Internship</option>
                        <option>Freelance</option>
                        <option>Others</option>
                      </select>
                    </div>
                  </div>

                  <Field
                    label="Primary Focus"
                    textarea
                    value={data.draft.focus}
                    onChange={(v) => data.update("focus", v)}
                  />

                  <SaveCancel onSave={data.save} onCancel={data.cancel} />
                </div>
              ) : (
                <>
                  <div className="flex justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-gray-800">
                        {item.designation || "Untitled Position"}
                      </h3>
                      <p className="font-medium text-green-700">
                        {item.company || "No company"}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {/* Edit Experience */}
                      <button
                        type="button"
                        onClick={() => data.edit(item)}
                        className="text-gray-500 hover:text-green-700"
                      >
                        <FiEdit2 />
                      </button>

                      {/* Delete Experience */}
                      <button
                        type="button"
                        onClick={() => data.delete(item.id)}
                        className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 />

                      </button>
                    </div>

                  </div>

                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-white px-3 py-1">
                      {item.timeline}
                    </span>
                    <span className="rounded-full bg-white px-3 py-1">
                      {item.employment_type}
                    </span>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs font-bold uppercase text-gray-500">
                      Primary Focus
                    </p>
                    <p className="mt-1 text-sm leading-6 text-gray-700">
                      {item.primary_focus}
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-xs font-bold uppercase text-gray-500">
                        Technical Skills
                      </p>

                      <button
                        type="button"
                        onClick={() => data.toggleSkillsEdit(item.id)}
                        className="text-xs font-semibold text-green-700"
                      >
                        {editingSkills ? "Done" : "Edit Skills"}
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, index) => (
                        <span
                          key={`${skill}-${index}`}
                          className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-sm text-green-800"
                        >
                          {skill}

                          {editingSkills && (
                            <button
                              type="button"
                              onClick={() => data.deleteSkill(item.id, index)}
                              className="text-red-500"
                            >
                              <FiX size={14} />
                            </button>
                          )}
                        </span>
                      ))}

                      {editingSkills && (
                        <div className="flex gap-2">
                          <input
                            value={data.newSkill}
                            onChange={(e) => data.setNewSkill(e.target.value)}
                            onKeyDown={(e) =>
                              e.key === "Enter" && data.addSkill(item.id)
                            }
                            placeholder="New skill"
                            className="w-32 rounded-full border px-3 py-1 text-sm outline-none"
                          />

                          <button
                            type="button"
                            onClick={() => data.addSkill(item.id)}
                            className="flex items-center gap-1 rounded-full border border-dashed border-green-600 px-3 py-1 text-sm font-semibold text-green-700"
                          >
                            <FiPlus /> Add
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                </>
              )}
            </div>
          );
        })}

        <button
          type="button"
          onClick={data.add}
          className="mx-auto flex items-center gap-2 rounded-lg border border-green-700 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-50"
        >
          <FiPlus /> Add Experience
        </button>
      </div>

    </Card>
  );
}

function Education({ profile, data }) {
  return (
    <Card title="Higher Education" icon={<FiBookOpen />}>
      <div className="space-y-4">
        {profile?.education?.map((item) => {
          const editing = data.editingId === item.id;

          return (
            <div key={item.id} className="rounded-xl bg-gray-50 p-4">
              {editing ? (
                <div className="space-y-3">
                  <Field
                    label="Degree / Program"
                    value={data.draft.degree}
                    onChange={(v) => data.update("degree", v)}
                  />
                  <Field
                    label="University / Institution"
                    value={data.draft.institution}
                    onChange={(v) => data.update("institution", v)}
                  />

                  <div className="grid gap-3 md:grid-cols-2">
                    <Field
                      label="Department / Major"
                      value={data.draft.department}
                      onChange={(v) => data.update("department", v)}
                    />
                    <Field
                      label="Timeline"
                      value={data.draft.timeline}
                      onChange={(v) => data.update("timeline", v)}
                    />
                  </div>

                  <Field
                    label="Specialization"
                    value={data.draft.specialization}
                    onChange={(v) => data.update("specialization", v)}
                  />

                  <SaveCancel onSave={data.save} onCancel={data.cancel} />
                </div>
              ) : (
                <div className="flex justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-800">{item.degree}</h3>
                    <p className="font-semibold text-green-700 text-xl">
                      {item.institution}
                    </p>
                    <p className="text-sm text-gray-600">{item.department}</p>
                    <p className="mt-2 text-sm text-gray-700">
                      <b>Specialization:</b> {item.specialization}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-3">
                    <span className="rounded-full bg-white px-3 py-1 text-xs">
                      {item.timeline}
                    </span>

                    <button
                      type="button"
                      onClick={() => data.edit(item)}
                      className="text-gray-500"
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      type="button"
                      onClick={() => data.delete(item.id)}
                      className="text-red-500"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <button
          type="button"
          onClick={data.add}
          className="mx-auto flex items-center gap-2 rounded-lg border border-green-700 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-50"
        >
          <FiPlus /> Add Education
        </button>
      </div>
    </Card>
  );
}

function Publications({ profile, data }) {
  return (
    <Card title="Publications & Research Output" icon={<FiBookOpen />}>
      <div className="space-y-4">

        {profile?.publications?.map((item) => {
          const editing = data.editingId === item.id;

          return (
            <div
              key={item.id}
              className="rounded-xl border-l-4 border-green-700 bg-gray-50 p-4"
            >
              {editing ? (
                <div className="space-y-3">

                  {/* DOI input only */}
                  <Field
                    label="DOI"
                    type="text"
                    placeholder="e.g. 10.1038/s41586-020-2649-2"
                    value={data.draft.doi || ""}
                    onChange={(v) => data.update("doi", v)}
                  />

                  {/* Fetch button */}
                  <button
                    type="button"
                    onClick={data.fetchPublication}
                    disabled={data.fetching}
                    className="rounded-lg bg-green-700 px-4 py-2
                               text-sm font-semibold text-white
                               hover:bg-green-800
                               disabled:cursor-not-allowed
                               disabled:opacity-50"
                  >
                    {data.fetching
                      ? "Fetching publication..."
                      : "Fetch Publication"}
                  </button>

                  {/* Error */}
                  {data.error && (
                    <p className="text-sm text-red-500">
                      {data.error}
                    </p>
                  )}

                  {/* Preview fetched information */}
                  {data.draft.title && (
                    <div className="rounded-lg border bg-white p-4 space-y-2">
                      <div>
                        <p className="text-xs font-semibold uppercase text-gray-500">
                          Title
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                          {data.draft.title}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase text-gray-500">
                          Authors
                        </p>
                        <p className="text-sm text-gray-700">
                          {data.draft.authors}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase text-gray-500">
                          Journal
                        </p>
                        <p className="text-sm text-gray-700">
                          {data.draft.journal}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase text-gray-500">
                          Year
                        </p>
                        <p className="text-sm text-gray-700">
                          {data.draft.year}
                        </p>
                      </div>
                    </div>
                  )}

                  <SaveCancel
                    onSave={data.save}
                    onCancel={data.cancel}
                  />
                </div>
              ) : (
                <div className="flex justify-between gap-4">

                  <div className="min-w-0">

                    {/* Title */}
                    <h3 className="font-semibold text-gray-800">
                      {item.title || "Untitled Publication"}
                    </h3>

                    {/* Authors */}
                    {/* {item.authors && (
                      <p className="mt-1 text-sm text-gray-600">
                        {item.authors}
                      </p>
                    )} */}

                    {/* Journal + year */}
                    <p className="mt-1 text-sm text-gray-500 font-semibold">
                      {item.journal || "Unknown journal"}
                      {item.year && ` • ${item.year}`}
                    </p>

                    {/* DOI */}
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-block text-sm
                                   font-semibold text-green-700
                                   hover:underline"
                      >
                        View Publication ↗
                      </a>
                    )}
                  </div>

                  {/* Edit/Delete */}
                  <div className="flex shrink-0 gap-3">
                    <button
                      type="button"
                      onClick={() => data.edit(item)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      type="button"
                      onClick={() => data.delete(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  </div>

                </div>
              )}
            </div>
          );
        })}

        {/* Add publication */}
        <button
          type="button"
          onClick={data.add}
          className="mx-auto flex items-center gap-2
                     rounded-lg border border-green-700
                     px-4 py-2 text-sm font-semibold
                     text-green-700 hover:bg-green-50"
        >
          <FiPlus />
          Add Publication
        </button>

      </div>
    </Card>
  );
}

function Networking({ profile, data }) {
  return (
    <Card
      title="Networking & Availability"
      icon={<FiUsers />}
      editing={data.editing}
      onEdit={data.edit}
      onCancel={data.cancel}
    >
      {data.editing ? (
        <div className="space-y-5">
          <div>
            <label className="flex items-center justify-between font-semibold">
              Mentorship
              <input
                type="checkbox"
                checked={data.draft.mentorship}
                onChange={(e) =>
                  data.update("mentorship", e.target.checked)
                }
                className="h-5 w-5 accent-green-700"
              />
            </label>

            <textarea
              rows={3}
              value={data.draft.mentorshipText}
              onChange={(e) =>
                data.update("mentorshipText", e.target.value)
              }
              className={`${inputClass} mt-2 resize-none`}
            />
          </div>

          <div>
            <label className="flex items-center justify-between font-semibold">
              Job Referrals
              <input
                type="checkbox"
                checked={data.draft.jobReferral}
                onChange={(e) =>
                  data.update("jobReferral", e.target.checked)
                }
                className="h-5 w-5 accent-green-700"
              />
            </label>

            <textarea
              rows={3}
              value={data.draft.jobReferralText}
              onChange={(e) =>
                data.update("jobReferralText", e.target.value)
              }
              className={`${inputClass} mt-2 resize-none`}
            />
          </div>

          <SaveCancel onSave={data.save} onCancel={data.cancel} />
        </div>
      ) : (
        <div className="space-y-3">
          <div className="rounded-xl bg-green-50 p-3">
            <div className="flex justify-between gap-2">
              <h3 className="font-bold">Mentorship</h3>
              <span className="text-sm font-semibold text-green-700">
                {profile?.networking?.mentorship ? "Available" : "Unavailable"}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              {profile?.networking?.mentorshipText}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-3">
            <div className="flex justify-between gap-2">
              <h3 className="font-bold">Job Referrals</h3>
              <span className="text-sm font-semibold text-green-700">
                {profile?.networking?.jobReferral ? "Available" : "Unavailable"}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              {profile?.networking?.jobReferralText}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}

function Links({ profile, data }) {
  return (
    <Card title="Professional Links" icon={<FiLink />}>
      <div className="space-y-2">
        {profile?.professional_links?.map((item) => {
          const editing = data.editingId === item.id;

          return (
            <div key={item.id} className="rounded-lg bg-gray-50 p-3">
              {editing ? (
                <div className="space-y-3">
                  <Field
                    label="Link Name"
                    value={data.draft.platform}
                    onChange={(v) => data.update("name", v)}
                  />

                  <Field
                    label="URL"
                    type="url"
                    value={data.draft.url}
                    onChange={(v) => data.update("url", v)}
                  />

                  <SaveCancel onSave={data.save} onCancel={data.cancel} />
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold">
                      {item.platform || "Unnamed Link"}
                    </p>
                    <Link
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block truncate text-sm text-gray-500 hover:text-green-700"
                    >
                      {item.url}
                    </Link>
                  </div>

                  <div className="flex shrink-0 gap-3">
                    <button
                      type="button"
                      onClick={() => data.edit(item)}
                      className="text-gray-500"
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      type="button"
                      onClick={() => data.delete(item.id)}
                      className="text-red-500"
                    >
                      <FiX />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <button
          type="button"
          onClick={data.add}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-green-700 py-2 text-sm font-semibold text-green-700 hover:bg-green-50"
        >
          <FiPlus /> Add Professional Link
        </button>
      </div>
    </Card>
  );
}

export default function Profile() {
  const {
    profile,
    image,
    personal,
    bau,
    experience,
    education,
    publication,
    networking,
    link,
  } = useProfile();

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading profile...
      </div>
    );
  }

  const fullName =
    `${profile.first_name} ${profile.last_name}`.trim();

  const currentExperience = profile.experiences;

  return (
    <main className="min-h-screen bg-[#f8f7ff] py-8">
      <div className="mx-auto w-[94%] max-w-6xl space-y-4">
        {/* TOP */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gray-200 shadow-md">
              {profile?.profile_photo
                ? (
                  <img
                    src={profile.profile_photo
                    }
                    alt={fullName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-sm text-gray-500">{profile?.first_name}</span>
                )}
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {fullName}
              </h1>
              <p className="mt-1 font-medium text-gray-700">
                {currentExperience?.designation || "Designation"}
              </p>
              <p className="text-sm text-gray-500">
                {currentExperience?.company || "Company"}
              </p>

              <p className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                <FiMapPin /> {
                  profile?.personal?.location || ""
                }
              </p>
            </div>

            {/* upload image */}
            <div className="flex gap-2 sm:self-start">

              {/* Hidden file input */}
              <input
                id="profile-image"
                type="file"
                accept="image/*"
                onChange={image.upload}
                className="hidden"
              />

              {/* Upload image button */}
              <label
                htmlFor="profile-image"
                className={`${buttonClass} flex cursor-pointer items-center gap-2 bg-green-700 text-white hover:bg-green-800`}
              >
                <FiEdit2 />
                Change Image
              </label>

            </div>



          </div>
        </section>

        {/* CONTENT */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <div className="w-full space-y-4 md:w-[62%]">
            <Personal profile={profile} data={personal} />
            <Bau profile={profile} data={bau} />
            <Experience profile={profile} data={experience} />
            <Education profile={profile} data={education} />
            <Publications profile={profile} data={publication} />
          </div>

          <div className="w-full space-y-4 md:w-[38%]">
            <Networking profile={profile} data={networking} />
            <Links profile={profile} data={link} />
          </div>
        </div>
      </div>
    </main>
  );
}
