import styled from "styled-components";
import { useEffect, useState } from "react";
import { csv, DSVRowArray } from "d3";
import StatsTable from "./StatsTable";
import { Tabs, Typography } from "antd";
import { Category } from "../types";

const { Title } = Typography;

const Dashboard = () => {
  const [data, setData] = useState<DSVRowArray<string> | null>(null);
  const [category, setCategory] = useState<Category>("batting");

  useEffect(() => {
    if (category === "batting") {
      csv("/batting-stats.csv").then(setData);
    } else {
      csv("/pitching-stats.csv").then(setData);
    }
  }, [category]);

  const onChange = (key: string) => {
    if (key === "1") {
      setCategory("batting");
    } else {
      setCategory("pitching");
    }
  };

  return (
    <Container>
      <Title level={3}>MLB Statistics 2022 Season</Title>
      <Tabs
        defaultActiveKey={"1"}
        onChange={onChange}
        items={[
          {
            label: "Batting",
            key: "1",
            children: <StatsTable category={"batting"} data={data} />,
          },
          {
            label: "Pitching",
            key: "2",
            children: <StatsTable category={"pitching"} data={data} />,
          },
        ]}
      />
    </Container>
  );
};

export default Dashboard;

const Container = styled.div`
  max-width: 130rem;
  padding: 2rem;
  margin: 0 auto;
`;
