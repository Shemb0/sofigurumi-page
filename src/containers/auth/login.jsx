import { connect } from "react-redux";
import Layout from "../../hocs/layout";
import { useEffect } from "react";
import Login from "components/auth/login";






function LogIn({

}) {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    


  return (
    <Layout>
    <Login/>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {

})(LogIn);
