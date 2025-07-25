import { MyProfileComponent } from "@/component";
import { useGlobalContext } from "@/global-context";

const MyProfile = () => {
    const { state } = useGlobalContext();

    return <MyProfileComponent isMyProfile={true} userData={state?.userData} />

}
export default MyProfile;