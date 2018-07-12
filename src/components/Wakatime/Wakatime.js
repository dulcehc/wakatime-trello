import React, {Component} from 'react';
import fetchJsonp from 'fetch-jsonp';
import './Wakatime.css';
import Trello from '../Trello/Trello';

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
      .then( (result) => {
          this.setState({
            isLoaded: true,
            items: result.data
          });
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    let today =  items.filter(item => {
      return item.range.text === 'Today'
    })[0];

    if (error) {
      return <div className="error-msg">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="wakatime">
          <table className="ctm-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time (hr)</th>
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
          <Trello name="Trello" data={today}/>
        </div>
      );
    }
  }
}

export default Wakatime;