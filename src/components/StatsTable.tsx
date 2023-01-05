import { Table, InputRef, Input, Space, Button } from "antd";
import { Category, PlayerBattingStats, PlayerPitchingStats } from "../types";
import { ColumnsType, ColumnType } from "antd/es/table";
import { useEffect, useRef, useState } from "react";
import { DSVRowArray } from "d3";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

interface Props {
  data: any;
  category: Category;
}

type DataIndex = keyof PlayerBattingStats | keyof PlayerPitchingStats;

const StatsTable = ({ data, category }: Props) => {
  const [keyedData, setKeyedData] = useState<DSVRowArray | null>(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    if (data) {
      const temp = data.map((item, i) => ({ ...item, key: i }));
      setKeyedData(temp);
    }
  }, [data]);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<PlayerBattingStats | PlayerPitchingStats> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const battingColumns: ColumnsType<PlayerBattingStats> = [
    {
      // @ts-ignore
      title: "Player Name",
      dataIndex: "Player",
      key: "Player",
      ...getColumnSearchProps("Player"),
    },
    {
      title: "Pos",
      dataIndex: "Pos",
      key: "Pos",
    },
    {
      title: "Team",
      dataIndex: "Team",
      key: "Team",
    },
    {
      title: "G",
      dataIndex: "G",
      key: "G",
      sorter: (a, b) => Number(a.G) - Number(b.G),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "AB",
      dataIndex: "AB",
      key: "AB",
      sorter: (a, b) => Number(a.AB) - Number(b.AB),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "R",
      dataIndex: "R",
      key: "R",
      sorter: (a, b) => Number(a.R) - Number(b.R),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "H",
      dataIndex: "H",
      key: "H",
      sorter: (a, b) => Number(a.H) - Number(b.H),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "2B",
      dataIndex: "2B",
      key: "2B",
      sorter: (a, b) => Number(a["2B"]) - Number(b["2B"]),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "3B",
      dataIndex: "3B",
      key: "3B",
      sorter: (a, b) => Number(a["3B"]) - Number(b["3B"]),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "HR",
      dataIndex: "HR",
      key: "HR",
      sorter: (a, b) => Number(a.HR) - Number(b.HR),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "RBI",
      dataIndex: "RBI",
      key: "RBI",
      sorter: (a, b) => Number(a.RBI) - Number(b.RBI),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "BB",
      dataIndex: "BB",
      key: "BB",
      sorter: (a, b) => Number(a.BB) - Number(b.BB),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "SO",
      dataIndex: "SO",
      key: "SO",
      sorter: (a, b) => Number(a.SO) - Number(b.SO),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "SB",
      dataIndex: "SB",
      key: "SB",
      sorter: (a, b) => Number(a.SB) - Number(b.SB),
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "CS",
      dataIndex: "CS",
      key: "CS",
      sorter: (a, b) => Number(a.CS) - Number(b.CS),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "AVG",
      dataIndex: "AVG",
      key: "AVG",
      sorter: (a, b) => Number(a.AVG) - Number(b.AVG),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "OBP",
      dataIndex: "OBP",
      key: "OBP",
      sorter: (a, b) => Number(a.OBP) - Number(b.OBP),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "SLG",
      dataIndex: "SLG",
      key: "SLG",
      sorter: (a, b) => Number(a.SLG) - Number(b.SLG),
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "OPS",
      dataIndex: "OPS",
      key: "OPS",
      sorter: (a, b) => Number(a.OPS) - Number(b.OPS),
      sortDirections: ["descend", "ascend"],
    },
  ];
  const pitchingColumns: ColumnsType<PlayerPitchingStats> = [
    {
      // @ts-ignore
      title: "hello",
      dataIndex: "Player",
      key: "Player",
      ...getColumnSearchProps("Player"),
    },
    {
      title: "Team",
      dataIndex: "Team",
      key: "Team",
    },
    {
      title: "W",
      dataIndex: "W",
      key: "W",
      sorter: (a, b) => Number(a.W) - Number(b.W),
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "L",
      dataIndex: "L",
      key: "L",
      sorter: (a, b) => Number(a.L) - Number(b.L),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "ERA",
      dataIndex: "ERA",
      key: "ERA",
      sorter: (a, b) => Number(a.ERA) - Number(b.ERA),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "G",
      dataIndex: "G",
      key: "G",
      sorter: (a, b) => Number(a.G) - Number(b.G),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "GS",
      dataIndex: "GS",
      key: "GS",
      sorter: (a, b) => Number(a.GS) - Number(b.GS),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "CG",
      dataIndex: "CG",
      key: "CG",
      sorter: (a, b) => Number(a.CG) - Number(b.CG),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "SHO",
      dataIndex: "SHO",
      key: "SHO",
      sorter: (a, b) => Number(a.SHO) - Number(b.SHO),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "SV",
      dataIndex: "SV",
      key: "SV",
      sorter: (a, b) => Number(a.SV) - Number(b.SV),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "IP",
      dataIndex: "IP",
      key: "IP",
      sorter: (a, b) => Number(a.IP) - Number(b.IP),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "H",
      dataIndex: "H",
      key: "H",
      sorter: (a, b) => Number(a.H) - Number(b.H),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "ER",
      dataIndex: "ER",
      key: "ER",
      sorter: (a, b) => Number(a.ER) - Number(b.ER),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "HR",
      dataIndex: "HR",
      key: "HR",
      sorter: (a, b) => Number(a.HR) - Number(b.HR),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "K",
      dataIndex: "K",
      key: "K",
      sorter: (a, b) => Number(a.K) - Number(b.K),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "BB",
      dataIndex: "BB",
      key: "BB",
      sorter: (a, b) => Number(a.BB) - Number(b.BB),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "BS",
      dataIndex: "BS",
      key: "BS",
      sorter: (a, b) => Number(a.BS) - Number(b.BS),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "HLD",
      dataIndex: "HLD",
      key: "HLD",
      sorter: (a, b) => Number(a.HLD) - Number(b.HLD),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "WHIP",
      dataIndex: "WHIP",
      key: "WHIP",
      sorter: (a, b) => Number(a.WHIP) - Number(b.WHIP),
      sortDirections: ["descend", "ascend"],
    },
  ];

  return (
    <Table
      size={"small"}
      style={{ fontSize: "1.2rem" }}
      // @ts-ignore
      columns={category === "batting" ? battingColumns : pitchingColumns}
      dataSource={keyedData as any}
    />
  );
};

export default StatsTable;
