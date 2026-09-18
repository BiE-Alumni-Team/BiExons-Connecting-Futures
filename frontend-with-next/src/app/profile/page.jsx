

const page = () => {
    return (
        <div className="w-11/12 mx-auto my-5 space-y-3">

            {/* top */}
            <div className="flex flex-col bg-gray-300 p-5 rounded-xl">
                <div className="flex items-center gap-3 ">

                    <div className="border-2 p-5 rounded-full">
                        <p>mypic</p>
                    </div>

                    <div>
                        <h2 className="font-bold text-lg">Manus Islam</h2>
                        <p>Senior Research Scientist & Computational Biologist</p>
                        <p>Genomics & Molecular Therapeutics Lab, BioTech Innovations</p>
                    </div>

                </div>

                {/* edit section */}

                <div className="flex gap-5 mt-5 justify-start md:justify-end">
                    <button className="btn btn-success">Edit profile</button>
                    <button className="btn btn-success">Share</button>
                </div>

            </div>

            {/* bottom */}
            <div className="flex flex-col gap-3 items-start justify-center md:flex-row md:justify-between">

                {/* left side */}
                <div className="w-[95%] mx-auto space-y-2 md:w-6/10">

                    {/* personal info*/}
                    <div className="bg-gray-300 p-3 space-y-3">

                        <div className=" flex gap-2 justify-between">
                            <h1 className="text-2xl font-bold">Personal Information</h1>
                            <button>Edit</button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <p>First name</p>
                            <p>Last name</p>
                            <p>Email</p>
                            <p>Phone</p>
                            <p>Location</p>
                        </div>
                        <div>
                            <p className="">About me</p>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, vitae?</p>
                        </div>


                    </div>

                    <div className="bg-gray-300 p-5">
                        <h1 className="text-xl font-bold">BAU</h1>
                        <span className="flex justify-between">
                            <p>Session : 2023-24</p>
                            <p>Edit </p>
                        </span>
                    </div>

                    {/* professional info */}
                    <div className="bg-gray-300 p-3 space-y-3">

                        <div className=" flex gap-2 justify-between">
                            <h1 className="text-2xl font-bold">Professional Experience and skill</h1>
                        </div>

                        <div className=" space-y-5">

                            <div className="flex justify-between gap-5 ">

                                <div className="space-y-4 flex-1">
                                    <div>
                                        <span className="flex flex-col justify-between md:flex-row">
                                            <p className="font-semibold">Designation</p>
                                            <p>2023-2025 . full time</p>

                                        </span>
                                        <p>Company</p>
                                    </div>

                                    <div>
                                        <p className="font-semibold">Primary focus</p>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, nulla!</p>
                                    </div>

                                </div>

                                <div>
                                    <button>edit</button>
                                </div>

                            </div>

                            <div className="space-y-2">
                                <span className="flex justify-between">
                                    <h1 className="font-semibold">VALIDATED TECHNICAL SKILLS</h1>
                                    <p>Edit</p>
                                </span>

                                <div className="flex flex-wrap gap-2">
                                    <p className="border border-black px-2 rounded-3xl">python</p>
                                    <p className="border border-black px-2 rounded-3xl">R</p>
                                    <p className="border border-black px-2 rounded-3xl">Bioinformatics</p>
                                    <p className="border border-black px-2 rounded-3xl">Docking</p>
                                    <p className="border border-black px-2 rounded-3xl">AI/ML</p>
                                    <p className="border border-black px-2 rounded-3xl">+ Add skills</p>
                                </div>
                            </div>

                        </div>

                        <div className="mt-10 flex justify-center">
                            <h1 className="btn btn-soft font-semibold text-2xl">+ Add more</h1>
                        </div>

                    </div>

                    {/* higher edu */}
                    <div className="bg-gray-300 p-3 space-y-3">

                        <div className=" flex gap-2 justify-between">
                            <h1 className="text-2xl font-bold">Higher Education</h1>

                        </div>

                        <div className="space-y-5 ">

                            <div className="space-y-5 ">

                                <div className="flex md:gap-3 ">

                                    <div className="flex flex-col justify-between md:flex-row md:flex-1">
                                        <span className="flex flex-wrap items-center gap-3">
                                            <p className="border-2 p-2 rounded-full">Logo</p>
                                            <span>
                                                <div className="flex justify-between">
                                                    <p className="font-semibold">Degree</p>

                                                </div>
                                                <p className="text-xl font-semibold">University</p>
                                                <div className="flex flex-wrap">
                                                    <p>Department/ Faculty/ Intitutes</p>
                                                </div>
                                            </span>
                                        </span>

                                        <p>2023-2025</p>
                                    </div>

                                    <div className="">
                                        <p className="">edit</p>
                                    </div>

                                </div>

                                <div className="flex flex-wrap gap-4 mt-8">
                                    <p className="font-semibold">Specialization</p>
                                    <p>Lorem ipsum dolor sit amet.</p>
                                </div>

                            </div>

                            <div className="mt-10 flex justify-center">
                                <h1 className="btn btn-soft font-semibold text-2xl">+ Add more</h1>
                            </div>

                        </div>

                    </div>

                    {/* Publication */}

                    <div className="bg-gray-300 p-3 space-y-3">

                        <div className=" flex gap-2 justify-between">
                            <h1 className="text-2xl font-bold">Publications & Research Output</h1>

                        </div>

                        <div className="space-y-5">

                            <div className="space-y-5">

                                <div className="flex justify-between gap-5">

                                    <div className="flex-1">

                                        <h1 className="font-semibold text-xl">Title</h1>

                                        <span className="flex justify-between">
                                            <p className="flex-1">journal name</p>
                                            <p className="flex-1">.2023</p>
                                        </span>

                                        <p>publication link</p>
                                    </div>

                                    <p>edit</p>

                                </div>

                            </div>

                            <div className="mt-10 flex justify-center">
                                <h1 className="btn btn-soft font-semibold text-2xl">+ Add more</h1>
                            </div>

                        </div>

                    </div>

                </div>

                {/* right side */}
                <div className="w-[95%] mx-auto space-y-3 md:w-4/10">

                    {/*network */}
                    <div className="bg-gray-400 p-3 space-y-3">
                        <h1 className="font-bold text-xl">Networking & Availability</h1>

                        <div className="bg-gray-300 p-2">
                            <span className="flex justify-between">
                                <h1 className="font-semibold">Mentorship</h1>
                                <p>on-off</p>
                            </span>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, labore!</p>
                        </div>

                        <div className="bg-gray-300 p-2">
                            <span>
                                <h1 className="font-semibold">JOB REFERRALS</h1>
                                <p>avilable</p>
                            </span>

                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, culpa.</p>

                        </div>

                    </div>

                    {/* social link */}
                    <div className="bg-gray-400 p-3 space-y-2">
                        <h1 className="text-xl font-bold">Professional Links</h1>

                        <ul className="space-y-2">
                            <li className="flex gap-2 justify-between bg-gray-200 p-2">
                                <div className="flex flex-1 gap-5 items-center">
                                    <span>
                                        <p>logo</p>
                                    </span>
                                    <span>
                                        <p>Linkedin</p>
                                        <p>Link</p>
                                    </span>
                                </div>

                                <p>Edit</p>
                                <p>X</p>
                            </li>

                            <li className="flex gap-2 justify-between bg-gray-200 p-2">
                                <div className="flex flex-1 gap-5 items-center">
                                    <span>
                                        <p>logo</p>
                                    </span>
                                    <span>
                                        <p>ResearchGate</p>
                                        <p>Link</p>
                                    </span>
                                </div>

                                <p>Edit</p>
                                <p>X</p>
                            </li>

                            <li className="flex gap-2 justify-between bg-gray-200 p-2">
                                <div className="flex flex-1 gap-5 items-center">
                                    <span>
                                        <p>logo</p>
                                    </span>
                                    <span>
                                        <p>Google scholer</p>
                                        <p>Link</p>
                                    </span>
                                </div>
                                <p>Edit</p>
                                <p>X</p>
                            </li>

                            <li className="flex gap-2 justify-between bg-gray-200 p-2">
                                <div className="flex flex-1 gap-5 items-center">
                                    <span>
                                        <p>Orcid</p>
                                    </span>
                                    <span>
                                        <p>Linkedin</p>
                                        <p>Link</p>
                                    </span>
                                </div>

                                <p>Edit</p>
                                <p>X</p>
                            </li>

                        </ul>

                        <div className="flex justify-center">
                            <button className="btn btn-soft">+Add more</button>
                        </div>

                    </div>

                </div>

            </div>


        </div>


    );
};

export default page;