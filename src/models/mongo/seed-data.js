export const seedData = {
    users: {
        _model: "User",
        tony: {
            firstName: "Tony",
            lastName: "Soprano",
            email: "tony@soprano.com",
            password: "secret"
        },
        carm: {
            firstName: "Carmela",
            lastName: "Soprano",
            email: "carmela@soprano.com",
            password: "secret"
        },
        paulie: {
            firstName: "Paulie",
            lastName: "Gualtieri",
            email: "paulie@gualtieri.com",
            password: "secret"
        }
    },

    artmarks: {
        _model: "Artmark",
        wonderfulbarn: {
            category: "Architecture",
            title: "The Wonderful Barn", 
            artist: "John Glin",
            description: "A corkscrew shaped building commissioned by local landlord to employ the local poor",
            location: "Leixlip",
            latitude: "53.359757",
            longitude: "6.510011",
            access: "Yes",
            userid: "->users.tony"
        },
        thedrummer: {
            category: "Sculpture",
            title: "The Drummer",
            artist: "Barry Flanagan",
            description: "A fantastical bronze hare statue standing on it's hind legs beating a drum",
            location: "Irish Museum of Modern Art",
            latitude: "53.34246622519725",
            longitude: "-6.299871146178594",
            access: "Yes",
            userid: "->users.paulie"
        }
    },
};