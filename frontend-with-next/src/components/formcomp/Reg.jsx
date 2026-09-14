

const Reg = ({ reg, regOnchange }) => {
    return (
        <div>

            <div>
                <label
                    htmlFor="registrationNo"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                    Registration No.
                </label>

                <input
                    id="registrationNo"
                    name="registrationNo"
                    value={reg}
                    type="text"
                    placeholder="Enter registration number"
                    required onChange={regOnchange}
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

export default Reg;