import React, { Component } from 'react'
import ChartView from './ChartView'
import ButtonBarSeries from './common/ButtonBarSeries'
import ApiService from '../Service/ApiService'

const CurrencyOptions = [
    { id: "USD", title: "USD" },
    { id: "SGD", title: "SGD" }
]

const TimeSeriesOptions = [
    { id: "1m", title: "1 month" },
    { id: "6m", title: "6 months" },
    { id: "ytd", title: "Year-to-date" },
    { id: "1y", title: "1 year" },
    { id: "5y", title: "5 years" },
    { id: "max", title: "Max" },
]

const BenchmarkOptions = ["VBMFX", "VTSMX", "SWTSX", "WFIVX", "VIMAX"]


class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currency: "USD",
            time: "1m",
            benchmark: "",
            graphData: []
        }
    }

    getData = () => {
        const { time, currency, benchmark } = this.state
        const graphData = ApiService.getData(time, currency, benchmark)
        this.setState({ graphData })
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-light">
                    
                </nav>

                <div className="body-container container">
                    <h3 className="mb-4">Portfolio benchmark</h3>

                    <div className="body-benchmark-container mb-4">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-md-5">
                                    <h3 className="font-weight-bold mb-1 text-secondary">General Investing</h3>
                                    <p className="font-weight-bold text-primary">Stashaway Risk Index 14%</p>
                                </div>
                                <div className="col-12 col-md-2 d-flex justify-content-center">
                                    <div className="benchmark-vs-sign text-white fw-600 fs-24 d-flex align-items-center justify-content-center my-2">
                                        vs
                                    </div>
                                </div>
                                <div className="col-12 col-md-5">
                                    <select className="custom-select custom-select-lg mb-3"
                                        value={this.state.benchmark}
                                        onChange={(e) => {
                                            this.setState({
                                                benchmark: e.target.value
                                            }, this.getData)
                                        }}
                                    >
                                        <option value="" >Select</option>
                                        {
                                            BenchmarkOptions?.map((benchmark) =>
                                                <option key={benchmark} value={benchmark}>{benchmark}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end justify-content-sm-between mb-3 flex-wrap">
                        <ButtonBarSeries
                            dataSeries={TimeSeriesOptions}
                            onSelected={(data) => {
                                this.setState({
                                    time: data.id
                                }, this.getData)
                            }}
                            selectedId={this.state.time}
                        />

                        <ButtonBarSeries
                            dataSeries={CurrencyOptions}
                            onSelected={(data) => {
                                this.setState({
                                    currency: data.id
                                }, this.getData)
                            }}
                            selectedId={this.state.currency}
                        />
                    </div>

                    <div className="chat-container">
                        <h4 className="font-weight-bold mb-1 text-secondary">Portfolio based on your gross returns</h4>
                        <p className="font-weight-bold text-secondary fs-13 mb-4">Gross returns and exchange rates sourced from Yahoo as of 09 April, 2020</p>
                        <ChartView
                            title1={"Stashaway 14%"}
                            title2={this.state.benchmark}
                            graphData={this.state.graphData}
                            currency={this.state.currency}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Main
