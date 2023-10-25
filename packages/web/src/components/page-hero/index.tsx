import { PublishHero, WelcomeHero } from "./parts";
import { useUserData } from "@/context";

export function PageHero() {
    const { userData } = useUserData();
    if (userData.isLogged && userData.userName) {
        return (<PublishHero userName={userData.userName} />);
    }
    return (<WelcomeHero />);
}