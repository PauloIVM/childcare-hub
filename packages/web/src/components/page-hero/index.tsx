import { PublishHero, WelcomeHero } from "./parts";
import { useUserData } from "@/context/user-data";

export function PageHero() {
    const { userData } = useUserData();
    if (userData.isLogged) {
        return (<PublishHero userName={userData.userName} />);
    }
    return (<WelcomeHero />);
}