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

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100";

const buttonClass =
  "rounded-lg px-4 py-2 text-sm font-semibold transition";

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
    ["firstName", "First Name"],
    ["lastName", "Last Name"],
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
                  {profile.personal[key] || "Not provided"}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs font-bold uppercase text-gray-500">About Me</p>
            <p className="mt-1 text-sm leading-6 text-gray-700">
              {profile.personal.aboutMe || "Not provided"}
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
        <div className="flex items-center justify-between rounded-xl bg-green-50 p-4">
          <span className="font-semibold text-gray-700">B.Sc in Bioinformatics Engineering</span>
          <span className="rounded-full bg-green-700 px-4 py-1 text-sm font-semibold text-white">
            {profile.bau.session}
          </span>
        </div>
      )}
    </Card>
  );
}

function Experience({ profile, data }) {
  return (
    <Card title="Professional Experience & Skills" icon={<FiBriefcase />}>
      <div className="space-y-5">
        {profile.experiences.map((item) => {
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

                    <button
                      type="button"
                      onClick={() => data.edit(item)}
                      className="text-gray-500 hover:text-green-700"
                    >
                      <FiEdit2 />
                    </button>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-white px-3 py-1">
                      {item.timeline}
                    </span>
                    <span className="rounded-full bg-white px-3 py-1">
                      {item.type}
                    </span>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs font-bold uppercase text-gray-500">
                      Primary Focus
                    </p>
                    <p className="mt-1 text-sm leading-6 text-gray-700">
                      {item.focus}
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

                  {editingSkills && (
                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => data.delete(item.id)}
                        className="flex items-center gap-1 text-sm text-red-500"
                      >
                        <FiTrash2 /> Delete Experience
                      </button>
                    </div>
                  )}
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
        {profile.education.map((item) => {
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
                    value={data.draft.university}
                    onChange={(v) => data.update("university", v)}
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
                    <p className="font-semibold text-green-700">
                      {item.university}
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
        {profile.publications.map((item) => {
          const editing = data.editingId === item.id;

          return (
            <div
              key={item.id}
              className="rounded-xl border-l-4 border-green-700 bg-gray-50 p-4"
            >
              {editing ? (
                <div className="space-y-3">
                  <Field
                    label="Publication Title"
                    value={data.draft.title}
                    onChange={(v) => data.update("title", v)}
                  />

                  <Field
                    label="Publication Link"
                    type="url"
                    value={data.draft.link}
                    onChange={(v) => data.update("link", v)}
                  />

                  <SaveCancel onSave={data.save} onCancel={data.cancel} />
                </div>
              ) : (
                <div className="flex justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-800">
                      {item.title || "Untitled Publication"}
                    </h3>

                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block text-sm font-semibold text-green-700 hover:underline"
                    >
                      View Publication ↗
                    </a>
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
          <FiPlus /> Add Publication
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
                {profile.networking.mentorship ? "Available" : "Unavailable"}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              {profile.networking.mentorshipText}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-3">
            <div className="flex justify-between gap-2">
              <h3 className="font-bold">Job Referrals</h3>
              <span className="text-sm font-semibold text-green-700">
                {profile.networking.jobReferral ? "Available" : "Unavailable"}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              {profile.networking.jobReferralText}
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
        {profile.links.map((item) => {
          const editing = data.editingId === item.id;

          return (
            <div key={item.id} className="rounded-lg bg-gray-50 p-3">
              {editing ? (
                <div className="space-y-3">
                  <Field
                    label="Link Name"
                    value={data.draft.name}
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
                      {item.name || "Unnamed Link"}
                    </p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block truncate text-sm text-gray-500 hover:text-green-700"
                    >
                      {item.url}
                    </a>
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

  const fullName =
    `${profile.personal.firstName} ${profile.personal.lastName}`.trim();

  const currentExperience = profile.experiences[0];

  return (
    <main className="min-h-screen bg-[#f8f7ff] py-8">
      <div className="mx-auto w-[94%] max-w-6xl space-y-4">
        {/* TOP */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gray-200 shadow-md">
              {profile.personal.image ? (
                <img
                  src={profile.personal.image}
                  alt={fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm text-gray-500">My Pic</span>
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
                <FiMapPin /> {profile.personal.location}
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
