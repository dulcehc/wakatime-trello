import React, {Component} from 'react';
import './Trello.css';

const apiData = {
  key: '',
  token: '',
  idList: ''
}
class Trello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  createCard (dataFromToday) {
    let date = dataFromToday.range.date;

    if (dataFromToday.grand_total.hours >= 1){
      let urlCards = 'https://api.trello.com/1/lists/' + apiData.idList + '/cards/?key='
                    + apiData.key +  '&token=' + apiData.token;
      fetch (urlCards)
      .then((response) => response.json())
      .then(data => {
        let cardDate =  data.filter(item => {
          return item.name === date
        });
        if (cardDate.length === 0) {
          let urlTrello = 'https://api.trello.com/1/cards?key=' + apiData.key
                      + '&token=' + apiData.token;
          let card = JSON.stringify({
            name: date,
            idList: apiData.idList,
            dueComplete: true,
            desc: dataFromToday.grand_total.total_seconds.toString()
          });

          fetch(urlTrello, {
            method: "post",
            headers : {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: card
          }).then((response) => response.json())
          .then(data => {
            this.setState({ message: "Created Card at " + data.shortUrl });
          }).catch((e) => {
            this.setState({ message: e });
          });
        } else {
          this.setState({ message: "The card for " + date + " already exists" });
        }
      });
    } else {
      this.setState({message: "Cards are created only for one or more hours of coding"});
    }

  }
  render (){
    let displayMessage;
    if (this.state.message !== "") {
      displayMessage = <div className="msg">{ this.state.message }</div>
    }

    return (
      <div className="trello">
        <blockquote className="trello-board-compact">
          <a href="https://trello.com/b/U4hPL2dX/wakatime-activity-code">Trello Board</a>
        </blockquote>
        <button className="btn" onClick={ (e) => this.createCard(this.props.data, e) }>
          { this.props.name }
        </button>
        { displayMessage }
      </div>

    );
  }
}

export default Trello;