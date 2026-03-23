import { connect } from "react-redux";
import Layout from "../../hocs/layout";
import { useEffect } from "react";
import Categoria from "components/categorias/categoria";


function Home({}) {
    
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Categoria/>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
    
});

export default connect(mapStateToProps, {})(Home);
