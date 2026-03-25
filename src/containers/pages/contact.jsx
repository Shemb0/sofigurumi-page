import { connect } from "react-redux";
import Layout from "../../hocs/layout";
import { useEffect } from "react";
import Contact from "components/contact/Contact";

function ContactPage({}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Contact />
    </Layout>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(ContactPage);
