
import { connect } from "react-redux"
import { useEffect } from "react";
import Layout from "hocs/layout";
import OrdersDetails from "components/dashboard/ordenes/ordersDetails";


const Dashboards = ({
  
})=>{
    useEffect((e) => {
        window.scrollTo(0, 0);
      }, []);


    
      return (
        <Layout>
          <OrdersDetails/>
        </Layout>
      );
    }

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps,{

})(Dashboards)