import { connect } from "react-redux";
import Layout from "../../hocs/layout";
import { useEffect } from "react";
import Registro from "components/auth/registro";






function SingUp({

}) {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);


  return (
    <Layout>
    <Registro/>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {
})(SingUp);
