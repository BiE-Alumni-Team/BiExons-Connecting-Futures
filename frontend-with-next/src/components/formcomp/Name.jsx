

const Name = ({ name, nameOnChange }) => {
    return (
        <div>

            <div>
                <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                    Full Name
                </label>

                <input
                    id="name"
                    name="name"
                    defaultValue={name}
                    type="text"
                    placeholder="Enter your full name"
                    required onChange={nameOnChange}
                    className="w-full rounded-lg border border-gray-300
                                    px-4 py-3 text-sm outline-none transition
                                   focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
            </div>

        </div>
    );
};

export default Name;