import { connect } from "react-redux";
import Layout from "../../hocs/layout";
import { useEffect } from "react";
import Product_Detail from "components/products/pagesDetail";



function ProductDetail({}) {
    
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Product_Detail/>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
    
});

export default connect(mapStateToProps, {})(ProductDetail);
