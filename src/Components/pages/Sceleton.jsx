import React from "react";
import ContentLoader from "react-content-loader";

const Sceleton = (props) => (
  <ContentLoader
    speed={2}
    width={400}
    height={460}
    viewBox="0 0 400 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#fcfdfc"
    {...props}
  >
    <rect x="29" y="10" rx="12" ry="12" width="320" height="260" />
    <rect x="31" y="282" rx="0" ry="0" width="320" height="25" />
    <rect x="33" y="320" rx="8" ry="8" width="320" height="80" />
    <rect x="33" y="414" rx="8" ry="8" width="110" height="40" />
    <rect x="221" y="413" rx="16" ry="16" width="130" height="45" />
  </ContentLoader>
);

export default Sceleton;
