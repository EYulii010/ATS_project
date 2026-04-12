import { useAuth } from "@/context/AuthContext"
import GuestActions from "./GuestActions";
import ApplicantActions from "./ApplicantActions";
import RecruiterActions from "./RecruiterActions";

const UserNavActions = () => {
    const { user } = useAuth();

    if (!user){
        return <GuestActions />
    }

    if (user.role === "aplicante") {
        return <ApplicantActions />
    }

    if (user.role === "reclutador" || user.role === "admin") {
        return <RecruiterActions />
    }
};

export default UserNavActions;