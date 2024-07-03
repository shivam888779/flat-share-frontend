import { useParams } from "next/navigation";
import { useRouter } from "next/router";

const UserProfile = () => {
    const router = useRouter();
    const { id } = router.query;
    
    return <div>User Profile {id}</div>;
    }
   
export default UserProfile;    