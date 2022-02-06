import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { FETCH_ASSETS } from "@queries/queries";
import { styled, CircularProgress, Pagination } from "@mui/material";
import { TrTableDefault } from "@components/TableDefault/TableDefault";
import RenderDelegate from "@components/RenderDelegate/RenderDelegate";
import { Card, CardBody, CardTitle, Col, Row, Table } from "reactstrap";
import { ArrowGrowth } from "@styled-icons/fluentui-system-regular/ArrowGrowth";
import { RootState } from "@reducers/combinedReducers";
import { Themes } from "@enums/enums";
import { useSelector } from "react-redux";

type Props = {};

const Growth = styled(ArrowGrowth)`
  color: green;
`;

const AssetTable: React.FC<Props> = () => {
  const [loading, setLoading] = useState(true);
  const [assets, setAssets] = useState([] as any);
  const { data, error, refetch } = useQuery(FETCH_ASSETS, {
    variables: {
      start: 1,
      limit: 10,
      conversion: "USD",
    },
  });

  const theme = useSelector((state: RootState) => state.theme.theme.name);
  const isDark = theme === Themes.DARK;

  const columns = [
    "Symbol",
    "Name",
    "Price",
    "Market Cap",
    "Percent Change",
    "Actions",
  ];

  const handleChange = () => {};

  useEffect(() => {
    if (!error && data) {
      setAssets(data.assets);
      setLoading((prevState) => !prevState);
    }
  }, [data, error]);

  return (
    <RenderDelegate
      condition={loading}
      renderComponent={
        <Row style={{ justifyContent: "center" }}>
          <CircularProgress />
        </Row>
      }
      fallBackComponent={
        <Row
          style={{
            paddingLeft: 30,
            paddingRight: 30,
            justifyContent: "center",
          }}
        >
          <Col lg={12}>
            <Card
              className="mb-3"
              type="background"
              color={isDark ? "dark" : "light"}
            >
              <CardBody>
                <CardTitle
                  tag="h6"
                  style={{ color: isDark ? "white" : "black" }}
                >
                  ASSETS
                </CardTitle>
              </CardBody>
              <Table
                className="mb-0"
                dark={isDark}
                responsive
                style={{ backgroundColor: isDark ? "#181717" : "#F2F2F2" }}
              >
                <thead>
                  <tr>
                    {columns.map((name, index) => (
                      <th key={index} className="bt-0">{name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <TrTableDefault
                    assets={assets}
                    leaderStatus="900"
                    projectColor={ isDark ?"text-white":  "text-black"}
                    dropdownColor={ isDark ?"text-white":  "text-black"}
                  />
                </tbody>
              </Table>
              <br></br>
              <Pagination
                count={10}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
              />
              <br></br>
            </Card>
          </Col>
        </Row>
      }
    />
  );
};

export default AssetTable;
