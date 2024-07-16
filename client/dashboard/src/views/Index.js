import Chart from "chart.js";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";

// Import core components and chart options
import {
  chartOptions,
  parseOptions,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import FroudTable from "./examples/FroudTable";
import ChartTrasactions from "components/charts/ChartTransactions.js";
import ChartPie from "components/charts/ChartPie.js";
import ResultChart from "components/charts/ResultChart.js";

const Index = (props) => {
  // Initialize Chart.js options if the Chart object is available
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  return (
    <>
      <Header />
      <Container className="mt--5" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Транзакции
                    </h6>
                    <h2 className="text-uppercase text-light ls-1 mb-1">Всего транзакций</h2>
                  </div>
                </Row>
              </CardHeader>
              <div className="chart">
                {/* Render the transaction chart */}
                <ChartTrasactions />
              </div>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Операции
                    </h6>
                    <h2 className="mb-0">Распределение мошеннических транзакций</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Render the pie chart */}
                <div className="chart">
                  <ChartPie />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    {/* Fraud transactions section */}
                    <h3 className="mb-0">Последние мошеннические операции</h3>
                  </div>
                </Row>
              </CardHeader>
              <FroudTable />
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col ">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Транзации
                    </h6>
                    <h2 className="mb-0">Распределение успешных транзакций</h2>
                  </div>
                </Row>
              </CardHeader>
              <br></br>
              <div className="chart">
                <ResultChart />
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;