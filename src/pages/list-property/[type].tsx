import { ListPropertyForm } from "@/component";
import { useRouter } from "next/router";

const ListProperty = () => {

    const router = useRouter()
    const { type } = router.query

    return <ListPropertyForm type={String(type)} />
}

export default ListProperty;