

const Session = ({ session, sessionOnchange }) => {
    return (
        <div>

            <div>
                <label
                    htmlFor="session"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                    Session.
                </label>

                <input
                    id="session"
                    name="registrationNo"
                    defaultValue={session}
                    type="text"
                    placeholder="e.g: 2023-2024"
                    required onChange={sessionOnchange}
                    className="w-full rounded-lg border border-gray-300
                             px-4 py-3 text-sm outline-none
                             transition
                             focus:border-green-600
                             focus:ring-2 focus:ring-green-100"
                />
            </div>

        </div>
    );
};

export default Session;