// Add or edit events here. The events pages read this file automatically.
//
// organizer       -> who is hosting the event
// date            -> parseable date string, e.g. "October 15, 2026"
// content         -> full details shown on the details page (blank line = new paragraph)
// registrationOpen-> true  = show a "Register" button (needs registerLink)
//                    false = only the "Details" button is shown
// registerLink    -> external URL the Register button opens
// registrationDeadline -> last day to register, e.g. "October 10, 2026" ("" = no deadline)
//                    the Register button hides automatically after this date

export function createSlug(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

export function getEventSlug(event) {
    return event.slug || createSlug(event.title);
}

// True only when registration is allowed, has a link, the event
// hasn't ended, and the deadline (if any) hasn't passed.
export function isRegistrationOpen(event) {
    if (!event.registrationOpen || !event.registerLink) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (new Date(event.date) < today) return false;

    if (event.registrationDeadline) {
        if (new Date(event.registrationDeadline) < today) return false;
    }

    return true;
}

export const eventsData = [
    {
        id: 1,

        title: "Introduction to Bioinformatics Workshop",

        type: "Workshop",

        date: "October 15, 2026",

        time: "10:00 AM - 1:00 PM",

        location: "BAU Seminar Hall, Mymensingh",

        organizer: "BiExON Community",

        image: "/images/events/workshop.jpg",

        description:
            "A hands-on workshop for beginners covering biological databases, sequence analysis, and basic computational tools.",

        content: `
A hands-on workshop for beginners covering biological databases, sequence analysis, and basic computational tools.

Participants will learn how to search and retrieve biological data, run basic sequence analyses, and interpret the results.

No prior programming experience is required. Please bring your own laptop.
        `,

        registrationOpen: true,

        registerLink: "https://forms.gle/your-form-id",

        registrationDeadline: "October 10, 2026",
    },

    {
        id: 2,

        title: "Alumni Meet & Career Talk",

        type: "Seminar",

        date: "November 5, 2026",

        time: "3:00 PM - 5:00 PM",

        location: "Online (Zoom)",

        organizer: "BAU Bioinformatics Alumni Association",

        image: "/images/events/alumni-meet.jpg",

        description:
            "BAU Bioinformatics alumni share their career journeys, research experiences, and advice for current students.",

        content: `
BAU Bioinformatics alumni share their career journeys, research experiences, and advice for current students.

The session includes short talks followed by an open Q&A. The Zoom link will be shared with registered participants.
        `,

        registrationOpen: true,

        registerLink: "https://forms.gle/your-form-id-2",

        registrationDeadline: "November 1, 2026",
    },

    {
        id: 3,

        title: "BiExON Community Orientation",

        type: "Orientation",

        date: "September 10, 2026",

        time: "11:00 AM - 12:30 PM",

        location: "BAU Campus, Mymensingh",

        organizer: "BiExON Community",

        image: "/images/events/orientation.jpg",

        description:
            "An introduction to the BiExON community, its goals, and how students and alumni can get involved.",

        content: `
An introduction to the BiExON community, its goals, and how students and alumni can get involved.

This event has ended.
        `,

        registrationOpen: false,

        registerLink: "",

        registrationDeadline: "",
    },
];
