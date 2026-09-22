"use client";

import { useState } from "react";

const Id = () => {
    const [id, setId] = useState("");

    const currentYear = new Date().getFullYear() % 100;

    // Validate 7-digit ID: YY09XXX
    const idValid =
        /^\d{7}$/.test(id) &&
        Number(id.slice(0, 2)) >= 21 &&
        Number(id.slice(0, 2)) <= currentYear &&
        id.slice(2, 4) === "09" &&
        Number(id.slice(4, 7)) < 31;

    const idOnchange = (e) => {
        const value = e.target.value;

        // Only allow numbers, maximum 7 digits
        if (/^\d{0,7}$/.test(value)) {
            setId(value);
        }
    };

    return (
        <div>
            <label
                htmlFor="studentId"
                className="mb-1.5 block text-sm font-medium text-gray-700"
            >
                Student ID
            </label>

            <input
                id="studentId"
                name="studentId"
                value={id}
                type="text"
                placeholder="Enter your student ID"
                required
                onChange={idOnchange}
                className="w-full rounded-lg border border-gray-300
                           px-4 py-3 text-sm outline-none
                           transition
                           focus:border-green-600
                           focus:ring-2 focus:ring-green-100"
            />

            {/* Show error while invalid */}
            {id.length > 0 && !idValid && (
                <p className="mt-1 text-sm text-red-500">
                    Enter a valid Student ID.
                </p>
            )}
        </div>
    );
};

export default Id;