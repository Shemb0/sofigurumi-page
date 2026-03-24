
import { connect } from "react-redux"
import { check_authenticated,load_user,refresh } from "../redux/actions/auth"
import { useEffect } from "react";
import NavBar from "components/navigation/navBar";
import Footer from "components/navigation/footer";
import {get_user_profile} from "../redux/actions/profile"


function Layout({ children, check_authenticated,load_user,refresh,get_user_profile }) {
     useEffect(() => {
    //Dispatch your actions here
       check_authenticated();
       load_user();
       refresh();
       get_user_profile();
     }, [check_authenticated, load_user, refresh]);
return(
    <div>
        <NavBar/>
        <div className="bg-gradient-to-br from-sofi-50 via-sofi-100 to-sofi-200 min-h-screen">
            {children}
        </div>
        <Footer/>
    </div>
)

}

const mapStateToProps = state => ({
    
})

export default connect (mapStateToProps,{
     check_authenticated,
     load_user,
     refresh,
     get_user_profile,
}) (Layout)