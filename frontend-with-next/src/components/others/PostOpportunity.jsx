
"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";

export default function OpportunityForm({ onClose, onPost }) {
    const [formData, setFormData] = useState({
        title: "",
        type: "Job",
        organization: "",
        field: "",
        location: "",
        workMode: "On-site",
        deadline: "",
        contactEmail: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send the new opportunity to the parent page
        onPost(formData);

        // Close the form
        onClose();
    };

    return (
        <div className="mx-auto mt-8 max-w-3xl rounded-2xl bg-white p-6 text-left shadow-xl md:p-8">

            {/* Header */}
            <div className="mb-6 flex items-start justify-between">

                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Post an Opportunity
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Share a job or internship with the BiExON community.
                    </p>
                </div>

                {/* X button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                >
                    <FiX className="text-xl" />
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Title */}
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Opportunity Title *
                    </label>

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Bioinformatics Research Assistant"
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    />
                </div>

                {/* Type + Organization */}
                <div className="grid gap-5 md:grid-cols-2">

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Type *
                        </label>

                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                        >
                            <option value="Job">Job</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Organization *
                        </label>

                        <input
                            type="text"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            placeholder="Organization name"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                        />
                    </div>

                </div>

                {/* Field + Work Mode */}
                <div className="grid gap-5 md:grid-cols-2">

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Field *
                        </label>

                        <input
                            type="text"
                            name="field"
                            value={formData.field}
                            onChange={handleChange}
                            placeholder="e.g. Bioinformatics"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Work Mode *
                        </label>

                        <select
                            name="workMode"
                            value={formData.workMode}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                        >
                            <option value="On-site">On-site</option>
                            <option value="Remote">Remote</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>

                </div>

                {/* Location + Deadline */}
                <div className="grid gap-5 md:grid-cols-2">

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Location *
                        </label>

                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g. Dhaka, Bangladesh"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Application Deadline *
                        </label>

                        <input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                        />

                        {formData.deadline && (
                            <p className="mt-2 text-sm text-gray-500">
                                Deadline:{" "}
                                {new Date(formData.deadline + "T00:00:00").toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    }
                                )}
                            </p>
                        )}
                    </div>

                </div>

                {/* Contact Email */}
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Contact Email *
                    </label>

                    <input
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        placeholder="example@organization.com"
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Description *
                    </label>

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Write the details of the job or internship..."
                        required
                        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 border-t pt-5">

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                    >
                        Post
                    </button>

                </div>

            </form>
        </div>
    );
}
