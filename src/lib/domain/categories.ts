export const domains = {
    home: {
        ageGroups: {
            newborn: { label: "Newborn", db: "HOME" },
            infant: { label: "Infant", db: "HOME" },
            toddler: { label: "Toddler", db: "HOME" },
            tween: { label: "Tween", db: "HOME" },
            teen: { label: "Teen", db: "HOME" },
        },
    },

    education: {
        levels: {
            ecde: { label: "ECDE", db: "EDUCATION" },
            primary: { label: "Primary School", db: "EDUCATION" },
            highschool: { label: "High School", db: "EDUCATION" },
        },
    },
} as const;