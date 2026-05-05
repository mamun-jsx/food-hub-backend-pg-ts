import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma.js";
import { signToken } from "../../lib/jwt.utils.js";
const register = async (userData) => {
    const { name, email, password, image } = userData;
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new Error("User already exists");
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            image,
        },
    });
    // Generate token
    const token = signToken({
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        image: user.image,
    });
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image,
        },
        token,
    };
};
const login = async (credentials) => {
    const { email, password } = credentials;
    // Find user
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new Error("Invalid credentials");
    }
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }
    // Generate token
    const token = signToken({
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        image: user.image,
    });
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image,
        },
        token,
    };
};
export const AuthService = {
    register,
    login,
};
//# sourceMappingURL=auth.service.js.map