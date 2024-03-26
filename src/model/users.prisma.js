const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const getUsers = async function() {
    try {
        const users = await prisma.user.findMany();
        if (users.length > 0) {
            return users;
        } 

        if(!users) {
            return null
        }

    } catch (error) {
        throw error;
    }
};

const getUserById = async function(id) {
    try {
        const user = await prisma.user.findUnique({
            where : {
                id: parseInt(id)
            },
        });

        if (!user) {
            return null;
        };

        return user;
    } catch (error) {
        throw error;
    };
};


const createUserByName = async function(params){
    try {
        const createUser = await prisma.user.create({
            data: {
                name: params.name,
                email: params.email
            }
        });

        return createUser;
    
    } catch (error) {
        throw error; 
    }
}

const updateUserById = async function(id, params){
    try {
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                name: params.name,
                email: params.email
            }
        });

        return updatedUser;
    
    } catch (error) {
        if (error.code === 'P2025') {
            const notFoundError = new Error("User not found");
            notFoundError.statusCode = 404;
            notFoundError.status = false;
            throw notFoundError;
        } else {
            throw error;
        }
    }
}

const deleteUserById = async function(id) {
    try {
        const user = await prisma.user.delete({
            where: {
                id: parseInt(id),
            },
        });

        return { status: 200, detail: "Successfully deleted user" };

    } catch (error) {
        if (error.code === 'P2025') {
            const notFoundError = new Error("User not found");
            notFoundError.statusCode = 404;
            notFoundError.status = false;
            throw notFoundError;
        } else {
            throw error;
        }
    }
}


module.exports = {getUsers, getUserById, deleteUserById, createUserByName, updateUserById}