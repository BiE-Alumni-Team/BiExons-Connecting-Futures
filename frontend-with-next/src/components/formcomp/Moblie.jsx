import React from 'react';

const Moblie = ({ mobile, mobileOnchange, phoneValid, }) => {
    return (
        <div>

            <div>
                <label
                    htmlFor="mobile"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                    Mobile Number
                </label>

                <div className="relative">
                    <input
                        id="mobile"
                        name="mobile"
                        value={mobile}
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        required
                        maxLength={11}
                        onChange={mobileOnchange}
                        className={`w-full rounded-lg border px-4 py-3 pr-12 text-sm
                outline-none transition
                focus:ring-2
                ${mobile.length === 0
                                ? "border-gray-300 focus:border-green-600 focus:ring-green-100"
                                : phoneValid
                                    ? "border-green-500 focus:border-green-600 focus:ring-green-100"
                                    : "border-red-500 focus:border-red-500 focus:ring-red-100"
                            }`}
                    />

                    {/* Validation icon */}
                    {mobile.length > 0 && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            {phoneValid ? (
                                <span className="text-green-600 text-xl">✓</span>
                            ) : (
                                <span className="text-red-500 text-xl">✕</span>
                            )}
                        </div>
                    )}
                </div>

                {/* Error message */}
                {mobile.length > 0 && !phoneValid && (
                    <p className="mt-1 text-sm text-red-500">
                        Phone number must start with 01 and contain 11 digits.
                    </p>
                )}
            </div>

        </div>
    );
};

export default Moblie;