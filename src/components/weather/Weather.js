import React from 'react';

class Weather extends React.Component {

    cssClasses = ["col-sm-8", " col-md-6", " col-lg-5", " col-xl-4 ", "weather" ,'weatherAnim'
        ];


    componentDidMount() {
        setInterval(() => this.props.updateValues(this.props.id, this.props.weather.city), 30000)
    }

    render() {
        return (

            <div className={this.cssClasses.join(' ')}>
                <button className="close-btn" onClick={() => this.props.closeComponent(this.props.id)}>X
                </button>
                <br/>
                <div className='container'>
                    <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12 window2'>
                        <h4 className='weather-text'>Weather in {this.props.weather.city} Now</h4>
                    </div>
                    <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>

                        <h4 className='weather-text'>
                            {this.props.weather.temp} &deg;C
                        </h4>
                        <IconComponent icons={this.props.weather.icon}/>
                        <h5 className='weather-text'>
                            Humidity: {this.props.weather.humidity}
                        </h5>
                    </div>
                </div>
            </div>
        )
    }
}

const IconComponent = (props) => {
    const URL = 'http://openweathermap.org/img/w/';
    const PNG = '.png';
    return props.icons.map((item, index) => (
        <img src={URL + item.icon + PNG} className="indent" key={index} alt={index}/>
    ))

};


export default Weather;