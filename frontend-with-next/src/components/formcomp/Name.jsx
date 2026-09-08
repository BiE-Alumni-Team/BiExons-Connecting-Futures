

const Name = ({ name, nameOnChange, lastName, lastNameOnChange }) => {
    return (
        <div className="flex gap-4">
            {/* First Name */}
            <div className="w-1/2">
                <label
                    htmlFor="firstName"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                    First Name
                </label>

                <input
                    id="name"
                    name="name"
                    defaultValue={name}
                    type="text"
                    placeholder="Enter your first name"
                    required
                    onChange={nameOnChange}
                    className="w-full rounded-lg border border-gray-300
                       px-4 py-3 text-sm outline-none transition
                       focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
            </div>

            {/* Last Name */}
            <div className="w-1/2">
                <label
                    htmlFor="lastName"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                    Last Name
                </label>

                <input
                    id="lastName"
                    name="lastName"
                    defaultValue={lastName}
                    type="text"
                    placeholder="Enter your last name"
                    required
                    onChange={lastNameOnChange}
                    className="w-full rounded-lg border border-gray-300
                       px-4 py-3 text-sm outline-none transition
                       focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
            </div>
        </div>
    );
};

export default Name;