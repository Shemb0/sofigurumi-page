import { connect } from "react-redux";
import Layout from "../../hocs/layout";
import { useEffect } from "react";
import About from "components/about/About";

function AboutPage({}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <About />
    </Layout>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(AboutPage);
