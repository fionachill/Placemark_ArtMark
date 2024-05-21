import bcrpyt from "bcryptjs";

// autogenerating both the hash and salt for my passwords

export const passwordUtils = {

    async hashPassword(password) {       
        try {
            const hashPassword = await bcrpyt.hash(password, 10); 
            return hashPassword;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async comparePasswords(password, hashPassword) {
        const result = await bcrpyt.compare(password, hashPassword);
        return result;
    },
}
