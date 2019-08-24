import React from 'react';
import Weather from "./Weather";
import './style.css';
import {getTodayWeather} from "../../httpClient";

class WeatherView extends React.Component {
    constructor(props) {
        super(props);

        this.closeComponent = this.closeComponent.bind(this);
        this.updateValues = this.updateValues.bind(this);
    }

    state = {
        components: [],
        key: 0,
        inputValue: '',
        cssAnime: false,
        modalIsOpen: false

    };

    ENTER_CITY = "Enter City";

    updateInputValue = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    };

    keyEnterHandler = (event) => {
        if (event.key === "Enter") {
            console.log('c');

            this.addComponent(this.state.inputValue);
        }
    };

    async addComponent(city) {
        const weatherObj = await getTodayWeather(city);
        if (!weatherObj) {
            return;
        }
        const objW = {
            weather: {
                city: weatherObj.name,
                temp: weatherObj.main.temp,
                icon: weatherObj.weather,
                humidity: weatherObj.main.humidity
            }
        };

        let key = this.state.key;
        key++;
        if (this.state.components.length <= 11) {
            this.setState({
                key: key,
                cssAnime: true,
                components: this.state.components.concat(<Weather key={key} id={key}
                                                                  weather={objW.weather}
                                                                  cssAnime={this.state.cssAnime}
                                                                  closeComponent={this.closeComponent}
                                                                  updateValues={this.updateValues}/>)
            });
        }
        this.setState({
            inputValue: ''
        })
    }

    closeComponent(x) {
        let components = this.state.components;
        for (let i = 0; i < components.length; i++) {
            if (components[i].key === x.toString()) {

                components.splice(i, 1);
                this.setState({
                    cssAnime: false,
                    components: components
                });
                return;
            }
        }
    }

    async updateValues(x, city) {
        console.log('print');
        const components = this.state.components;
        components.map(async (item, index) => {
            if (item.key === x.toString()) {
                const weatherObj = await getTodayWeather(city);
                const objW = {
                    weather: {
                        city: weatherObj.name,
                        temp: weatherObj.main.temp,
                        icon: weatherObj.weather,
                        humidity: weatherObj.main.humidity
                    }
                };
                components[index] = <Weather key={item.key} id={item.key}
                                             weather={objW.weather}
                                             closeComponent={this.closeComponent}
                                             updateValues={this.updateValues}/>;
            }
        })
    }

    render() {
        return (
            <div className='container'>
                <input placeholder={this.ENTER_CITY} value={this.state.inputValue} onKeyPress={this.keyEnterHandler} type="text"
                       onChange={this.updateInputValue}/>
                <button className="btn-find " onClick={() => this.addComponent(this.state.inputValue)}>Get Weather
                </button>
                <div className='row '>

                        {this.state.components}
                </div>
            </div>
        )
    }
}

export default WeatherView;