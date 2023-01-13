import { Component } from "react";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EachVariableData from "../EachVariableData";

class Apifetch extends Component {
  state = {
    listdata: [],
    listSortData: [],
    alerts: [],
  };

  componentDidMount() {
    this.getapi();
    setTimeout(() => {
      window.location.reload(1);
    }, 20000);
  }

  getapi = async () => {
    const apiurl = "https://api.binance.com/api/v3/ticker/24hr";
    const options = {
      method: "GET",
    };

    let response = await fetch(apiurl, options);
    const fetchedData = await response.json();
    console.log(fetchedData);

    const usdtData = fetchedData.filter(
      (word) =>
        word.symbol.endsWith("USDT") &&
        !word.symbol.includes("UP") &&
        !word.symbol.includes("DOWN") &&
        !word.priceChangePercent.includes(0.0)
    );

    console.log("users", usdtData);

    // filter out the elements where priceChangePercent is above 5
    const alertData = usdtData.filter((data) => data.priceChangePercent > 20);

    // update the alerts state with the alertData
    this.setState({ alerts: alertData });

    // show the alerts
    if (alertData.length > 0) {
      alertData.forEach((each) => {
        toast.info(
          `${each.symbol} ${each.lastPrice} has a price change of ${each.priceChangePercent}%`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose:10000
          });
      });
    }
    
    // setTimeout(() => {
    //   this.setState({ alerts: [] });
    // }, 10000);

    const a = usdtData.sort((a, b) => {
      return a.priceChangePercent - b.priceChangePercent;
    });

    const positiveToNegative = a.reverse();

    this.setState({ listdata: a });
  };
  
  render() {
    return (
      <div>
        <ToastContainer />
        <ul className="products-list">
          {this.state.listdata.map((eachdata, index) => (
            <EachVariableData productData={eachdata} key={index} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Apifetch;
