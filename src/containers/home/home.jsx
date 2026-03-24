import { connect } from "react-redux";
import Layout from "../../hocs/layout";
import { useEffect } from "react";
import Banner from "components/home/Banner";
import Productos_arribados from "components/home/Productos_arribados";
import Productos_vendidos from "components/home/Productos_vendidos";
import {get_products_by_arrival,get_products_by_sold} from "../../redux/actions/products"

function Home({
  products_arrival,
  products_sold,
  get_products_by_arrival,
  get_products_by_sold
}) {
    
  useEffect(() => {
    window.scrollTo(0, 0);
    get_products_by_arrival()
    get_products_by_sold()
  }, []);

  return (
    <Layout>
      <Banner />
      <hr className="border-sofi-200/60 mx-8" />
      <Productos_arribados data={products_arrival}/>
      <hr className="border-sofi-200/60 mx-8" />
      <Productos_vendidos data={products_sold}/>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  products_arrival: state.Products.products_arrival,
  products_sold: state.Products.products_sold

});

export default connect(mapStateToProps, {
  get_products_by_arrival,
  get_products_by_sold
})(Home);
