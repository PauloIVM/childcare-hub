import { User } from "@/domain";
import { IUserRepository } from "@/application/repositories";
import { IEmailGateway } from "@/application/gateways";
import { IUserDTO } from "@/application/dtos";

export const createUserRepository: () => IUserRepository = () => {
    const users: User[] = [
        User.create("id_1", "user_1", "user_1@gmail.com", "user_1_p@ssword"),
        User.create("id_2", "user_2", "user_2@gmail.com", "user_2_p@ssword"),
        User.create("id_3", "user_3", "user_3@gmail.com", "user_3_p@ssword"),
        User.create("id_4", "user_4", "user_4@gmail.com", "user_4_p@ssword"),
    ];
    return {
        findById: async (id: string): Promise<User> => {
            return users.find((u) => u.id === id);
        },
        findByEmail: async (email: string): Promise<User> => {
            return users.find((u) => u.email === email);
        },
        saveUser: async (dto: IUserDTO): Promise<User> => {
            const user = User.create(`${Date.now()}`, dto.name, dto.email, dto.password);
            users.push(user);
            return user;
        },
        updateUser: async (user: User): Promise<boolean> => {
            const index = users.findIndex((u) => u.id === user.id);
            if (!index) return false;
            users[index] = user;
            return true;
        },
    }
}

export const createEmailGateway: (m: string[]) => IEmailGateway = (sentMessages: string[]) => {
    return {
        send: async (subject: string, message: string, to: string): Promise<string> => {
            sentMessages.push(message);
            return "ok";
        },
	    createTemplate: (title: string, text: string): string => {
            return title;
        }
    }
}
