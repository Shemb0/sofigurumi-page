
import { connect } from "react-redux"
import { useEffect } from "react";
import Layout from "hocs/layout";
import Profiles from "components/dashboard/profile/profiles";



const Profile = ({
  
})=>{
    useEffect((e) => {
        window.scrollTo(0, 0);
      }, []);


    
      return (
        <Layout>
          <Profiles/>
        </Layout>
      );
    }

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps,{

})(Profile)