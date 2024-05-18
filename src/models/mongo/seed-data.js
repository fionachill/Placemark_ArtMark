export const seedData = {
    users: {
        _model: "User",
        tony: {
            firstName: "Tony",
            lastName: "Soprano",
            email: "tony@soprano.com",
            password: "secret",
            admin: true,
        },
        carm: {
            firstName: "Carmela",
            lastName: "Soprano",
            email: "carmela@soprano.com",
            password: "secret",
            admin: false,
        },
        paulie: {
            firstName: "Paulie",
            lastName: "Gualtieri",
            email: "paulie@gualtieri.com",
            password: "secret",
            admin: false,
        }
    },

    artmarks: {
        _model: "Artmark",
        wonderfulbarn: {
            category: "Architecture",
            title: "The Wonderful Barn", 
            img: "https://res.cloudinary.com/dmf4bd1hg/image/upload/v1715808057/s4mrr4lnfpcuw4jsoeve.jpg",
            artist: "John Glin",
            description: "A corkscrew shaped building commissioned by local landlord to employ the local poor",
            location: "Leixlip",
            latitude: "53.359757",
            longitude: "6.510011",
            isPublic: true,
            userid: "->users.tony",
        },
        thedrummer: {
            category: "Sculpture",
            title: "The Drummer",
            img: "https://res.cloudinary.com/dmf4bd1hg/image/upload/v1715808254/z8h17u9v76pd8sidypj3.jpg",
            artist: "Barry Flanagan",
            description: "A fantastical bronze hare statue standing on it's hind legs beating a drum",
            location: "Irish Museum of Modern Art",
            latitude: "53.34246622519725",
            longitude: "-6.299871146178594",
            isPublic: true,
            userid: "->users.paulie",
        },
        thebean: {
            category: "Sculpture",
            title: "Cloud Gate (The Bean)",
            img: "https://res.cloudinary.com/dmf4bd1hg/image/upload/v1715808299/vgy18t7ebblj5xwqmku5.jpg",
            artist: "Anish Kapoor",
            description: "A highly reflective stainless steel sculpture resembling a bean",
            location: "Chicago",
            latitude: "41.8825",
            longitude: "-87.623333",
            isPublic: false,
            userid: "->users.carm",
        }

    },
};