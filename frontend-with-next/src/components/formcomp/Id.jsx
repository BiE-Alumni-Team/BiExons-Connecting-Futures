

const Id = ({ id, idOnchange }) => {
    return (
        <div>

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
                    required onChange={idOnchange}
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

export default Id;