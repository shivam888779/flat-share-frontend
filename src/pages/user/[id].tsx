import { MyProfileComponent, ProfileSkeleton } from "@/component";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IUserData } from "@/types/user";
import { getUserProfileApi } from "@/api/profiles";
import { CircularProgress } from "@mui/material";
const UserProfile = () => {
    const router = useRouter();
    const { id } = router.query;
    const [userData, setUserData] = useState<IUserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            const { data } = await getUserProfileApi(id as string);
            setUserData(data?.data);
            setIsLoading(false);
        }
        if (id) {
            fetchUserData();
        }
    }, [id]);

    return isLoading ? <ProfileSkeleton /> : <MyProfileComponent isMyProfile={false} userData={userData} />

}
export default UserProfile;