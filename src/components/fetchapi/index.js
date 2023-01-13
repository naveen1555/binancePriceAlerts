import { Component } from "react";
import EachVariableData from "../EachVariableData";

class Apifetch extends Component {
  state = {
    listdata: [],
    listSortData: [],
  };

  componentDidMount() {
    this.getapi();
    setTimeout(() => {
      window.location.reload(1);
    }, 10000);
  }

  getapi = async () => {
    const apiurl = "https://api.binance.com/api/v3/ticker/24hr";
    const options = {
      method: "GET",
    };

    let response = await fetch(apiurl, options);
    const fetchedData = await response.json();
    // console.log(response);
    console.log(fetchedData);

    const usdtData = fetchedData.filter(
      (word) =>
        word.symbol.endsWith("USDT") &&
        !word.symbol.includes("UP") &&
        !word.symbol.includes("DOWN") &&
        !word.priceChangePercent.includes(0.0)
    );

    console.log("users", usdtData);

    const a = usdtData.sort((a, b) => {
      // if (a.priceChangePercent > b.priceChangePercent) {
      return a.priceChangePercent - b.priceChangePercent;
      // }
      // if (a.priceChangePercent > b.priceChangePercent) {
      //   return 1;
      // }
      // return 0;
    });

    const positiveToNegative = a.reverse();

    console.log("abccccc");
    this.setState({ listdata: a });
  };

  render() {
    return (
      <div>
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
