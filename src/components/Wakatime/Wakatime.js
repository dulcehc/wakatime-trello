import React, {Component} from 'react';
import fetchJsonp from 'fetch-jsonp';
import './Wakatime.css';

class Wakatime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetchJsonp("https://wakatime.com/share/@dulcehc/637eb576-6b9f-49a6-9c4f-0869586de823.json")
      .then(res => res.json())
      .then(
        (result) => {
          console.log('result: ', result)
          this.setState({
            isLoaded: true,
            items: result.data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    console.log(this.state)
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="Wakatime">
          <table className="ctm-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td key={"date-" + index}>{item.range.date}</td>
                  <td key={"time-" + index}>{item.grand_total.digital}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default Wakatime;