import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      showing: "seasons",
      episodes: undefined,
      seasons: undefined,
      serie: undefined,
      season: undefined,
      episode: undefined,
      character: undefined,
      error: undefined,
    }
    this.onClick = this.onClick.bind(this);

  }

  // componentDidMount() {
  //   fetch("https://tarea-1-breaking-bad.herokuapp.com/api/episodes")
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         const seasonsArray = result.map((episode) => `${episode.series};${episode.season}`);
  //         const seasonsSet = new Set(seasonsArray);

  //         this.setState({
  //           isLoaded: true,
  //           seasons: new Array(...seasonsSet),
  //         });
  //       },
  //       (error) => {
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       }
  //     )
  // }

  onClick(newState) {
    console.log(newState);
    this.setState(newState);
  }

  seasonsList() {
    const { seasons } = this.state;
    console.log(seasons);
    const List = [];
    for(let i = 0; i < seasons.length; i++)
    {
      List[i] = <ListItem season={true} key={i} value={seasons[i]} onClick={this.onClick} />

    }
    return List
  }

  episodesList() {
    const { episodes, serie, season } = this.state;
    console.log(episodes[0], serie, season);
    const result = episodes.filter(ep => ep.series === serie && ep.season === season);
    console.log(result);
    const List = [];
    for(let i = 0; i < result.length; i++)
    {
      List[i] = <ListItem episodes={true} key={i} value={`${result[i].title};${result[i].episode}`} onClick={this.onClick} />

    }
    return List
  }

  render() {
    const { error, isLoaded, serie, season, episode, episodes } = this.state
    let ret = undefined;
    
    if (!isLoaded) {
      ret = <p>Loading</p>
    } else if (error) {
      console.log(error.toString())
      ret = <p>{error.toString()}</p>
    } else if (episode) {
      const ep = episodes.filter(ep => ep.series === serie && ep.season === season && ep.title === episode)[0];
      const date = new Date(ep.air_date);
      ret = <div>
          <p>{`Series: ${ep.series}`}</p>
          <p>{`Season: ${ep.season}`}</p>
          <p>{`Title: ${ep.title}`}</p>
          <p>{`Episode Id: ${ep.episode_id}`}</p>
          <p>{`Episode: ${ep.episode}`}</p>
          <p>{`Air Date: ${date.toUTCString()}`}</p>
          <p></p>
          <p></p>
        </div>
    } else if (serie && season) {
      ret = <div>
        <p>{`${serie} - Season : ${season}`}</p>
        <ul className = "Seasons-list">{this.episodesList()}</ul>
        </div>
    } else {
      ret = <ul className = "Seasons-list">{this.seasonsList()}</ul>
    }
    return (
      <div className="App">
        <header className="App-header">
          {ret}
        </header>
      </div>
    )
  };
}

class ListItem extends React.Component {
  render () {
    const name = this.props.value.split(";")
    
    if (this.props.season) {
      return (
        <li onClick={() => this.props.onClick({serie: name[0], season: name[1]})} key={this.props.key} className="nameBox">
          {`${name[0]} - Season: ${name[1]}`}
        </li>
     );
    } else if (this.props.episodes) {
      return (
        <li onClick={() => this.props.onClick({episode: name[0]})} key={this.props.key} className="nameBox">
          {`${name[1]} - ${name[0]}`}
        </li>
     );
    }
  }
}

export default App;
