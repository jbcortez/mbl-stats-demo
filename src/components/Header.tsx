import styled from "styled-components";
import { GithubOutlined } from "@ant-design/icons";

const Header = () => {
  return (
    <HeaderStyles>
      <InnerContainer>
        <Title>MLB Statistics Demo</Title>
        <a
          href={"https://www.github.com/jbcortez/mlb-stats-demo"}
          target={"_blank"}
          rel="noreferrer"
          aria-label={"Github Repo"}
        >
          <GithubOutlined style={{ fontSize: "2.6rem", cursor: "pointer" }} />
        </a>
      </InnerContainer>
    </HeaderStyles>
  );
};

export default Header;

const HeaderStyles = styled.header`
  border-bottom: 1px solid #ddd;
`;

const Title = styled.span`
  font-size: 1.8rem;
`;

const InnerContainer = styled.div`
  max-width: 130rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 1.6rem 2rem;
`;
