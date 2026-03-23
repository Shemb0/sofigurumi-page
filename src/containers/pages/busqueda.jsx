import { connect } from "react-redux";
import Layout from "../../hocs/layout";
import { useEffect } from "react";
import Search from "components/navigation/search";



function Busqueda({}) {
    
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Search/>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
    
});

export default connect(mapStateToProps, {})(Busqueda);
