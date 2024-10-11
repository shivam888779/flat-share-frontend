import { LogInForm } from "@/component";
import { useGlobalContext } from "@/global-context"

const LogIn = () =>{

    const {state,setState} = useGlobalContext()
    // console.log(state)

    // setTimeout(()=>{
    //     setState({profession :"engineer"})
    // },3000)

  return <LogInForm/>
}
export default LogIn;