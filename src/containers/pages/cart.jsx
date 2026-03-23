import { connect } from "react-redux";
import Layout from "../../hocs/layout";
import { useEffect } from "react";
import FinalyCart from "components/cart/finalyCart";




function Cart({}) {
    
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <FinalyCart/>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
    
});

export default connect(mapStateToProps, {})(Cart);
