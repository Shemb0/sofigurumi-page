import { connect } from "react-redux"
import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import { activate } from "../../redux/actions/auth"
import { Navigate } from "react-router-dom"
import { Oval } from "react-loader-spinner"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  function Activate({
    activate,loading
  }) {
    const Params = useParams();
    
    useEffect(() => {
        window.scrollTo(0,0)
      },[])


     
    //   esto da lugar a que podamos tomar el uid y el token del url

      const [activated, setActivated] = useState(false)
      
      const actiated_account = () => {
        const uid = Params.uid
        const token = Params.token
        console.log(uid,token)
        activate(uid,token)
        setActivated(true)
    
      }

      if (activated && !loading) {
        return <Navigate to='/'/>
      }

    return (
        <>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
          <div className="max-w-3xl mx-auto">
          
          {loading ? 
          <button
            className="inline-flex mt-12 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sofi-400 hover:bg-sofi-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sofi-300"
          >
            <Oval
            type="Oval"
            color="#fff"
            width={20}
            height={20}
            />
          </button>:
          <button
          onClick={actiated_account}
          className="inline-flex mt-12 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sofi-400 hover:bg-sofi-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sofi-300"
        >
          Activate Account
        </button>
        }

      
          </div>
        </div>
      </>
    )
  }
  
  
  const mapStateToProps = state => ({
    loading: state.auth.loading
  })
  
  export default connect (mapStateToProps,{
    activate
  }) (Activate)