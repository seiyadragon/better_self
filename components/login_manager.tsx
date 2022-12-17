import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router"

const LoginManager = () => {
    const user = useUser()
    const router = useRouter()

    if (!user)
        router.push("/login")

    return <section />
}; export default LoginManager