import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";
import "./forecast.css";

const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Forecast = ({ data }) => {
    const everyNthElement = (arr, delta) => (
        arr.filter((e, i) => (
            i % delta === delta - 1
        ))
    );

    // Data is every 3 hours for 5 days, so need to get one forecast for each day
    const dailyForecastData = everyNthElement(data.list, 8);

    const hours = new Date().getHours();
    const isDayTime = hours > 6 && hours < 20;

    return (
        <div>
            <label className={(isDayTime) ? 'title' : 'title night'}>Daily</label>
            <Accordion allowZeroExpanded>
                {/* Create elements for each of the next 5 days */}
                {dailyForecastData.map((item, idx) => (
                    <AccordionItem key={idx * 5}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="daily-item">
                                    <img alt="weather" className="icon-small" src={`icons/${item.weather[0].icon}.png`}></img>
                                    <label className="day">{WEEK_DAYS[new Date(item.dt_txt).getDay()]}</label>
                                    <label className="description">{item.weather[0].description}</label>
                                    <label className="min-max">{Math.round(item.main.temp_min)}°F / {Math.round(item.main.temp_max)}°F</label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            {/* Allows clicking each item to expand and get more details */}
                            <div className="daily-details-grid">
                                <div className="daily-details-grid-item">
                                    <span>Feels like</span>
                                    <span>{item.main.feels_like}°F</span>
                                </div>
                                <div className="daily-details-grid-item">
                                    <span>Wind</span>
                                    <span>{item.wind.speed} mph</span>
                                </div>
                                <div className="daily-details-grid-item">
                                    <span>Humidity</span>
                                    <span>{item.main.humidity}%</span>
                                </div>
                                <div className="daily-details-grid-item">
                                    <span>Pressure</span>
                                    <span>{item.main.pressure} inHg</span>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default Forecast;