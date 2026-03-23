import Dashboard from "../../../components/dashboard/dashboard";
import { connect } from "react-redux"
import { useEffect } from "react";
import Layout from "hocs/layout";


const Dashboards = ({
  
})=>{
    useEffect((e) => {
        window.scrollTo(0, 0);
      }, []);


    
      return (
        <Layout>
          <Dashboard/>
        </Layout>
      );
    }

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps,{

})(Dashboards)