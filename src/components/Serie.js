import React from "react";

import Acordeon from "./Acordeon"

class Serie extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        isLoaded: false,
      }
    }

    componentDidMount() {
      const {name} = this.props;
      fetch("https://tarea-1-breaking-bad.herokuapp.com/api/episodes")
        .then(res => res.json())
        .then(
          (result) => {
            const episodesArray = result
              .filter((episode) => episode.series === name)
            const seasons = {};
            episodesArray.forEach((episode) => {
              if (!seasons[episode.season]) {
                  seasons[episode.season] = []
              }
              seasons[episode.season] = [...seasons[episode.season], {id: episode.episode_id, name: episode.title, episode: episode.episode}]
            })

            this.setState({
              isLoaded: true,
              seasons: seasons
            });
          },
          (error) => {
            console.log(error)
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
    render() {
        const {isLoaded, seasons} = this.state;
        const {name, season} = this.props;
        if (!isLoaded) {
          return <p>Loading</p>
        }
        return (
          <div>
            <h2>{name}</h2>
            <Acordeon seasons={seasons} season={season}></Acordeon>
          </div>
        );
    }
}

export default Serie;