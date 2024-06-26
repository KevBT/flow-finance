import ContentLoader from "react-content-loader";

const SkeletonAccount = () => (
  <ContentLoader
    speed={3}
    width={300}
    height={100}
    viewBox="0 0 400 150"
    backgroundColor="#333"
    foregroundColor="#dbdbdb"
    className="rounded-md"
  >
    <rect x="63" y="133" rx="0" ry="0" width="1" height="0" />
    <rect x="-7" y="3" rx="0" ry="0" width="386" height="150" />
    <rect x="172" y="97" rx="0" ry="0" width="39" height="0" />
  </ContentLoader>
);

export default SkeletonAccount;
