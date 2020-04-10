import React, { Component } from 'react'
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import RoundedRectLegend from './common/RoundedRectLegend'
import Utils from '../Utils/Utils'
import dayjs from 'dayjs'

const dateFormat = "MMM YYYY"
class ChartView extends Component {
    
    render() {
        const { title1, title2, graphData = [], currency } = this.props
        return (
            <div>
                <ResponsiveContainer height={300} width="100%">
                    <LineChart isAnimationActive={true} width={600} height={300}
                        data={graphData}>
                        <CartesianGrid stroke="#5d5d5d" strokeDasharray="5 5" vertical={false} />

                        <XAxis dataKey="date"
                            tickFormatter={(it) => dayjs(new Date(it)).format(dateFormat)} />
                        <YAxis
                            yAxisId="left"
                            domain={[(dataMin) => dataMin > 20 ? dataMin-20 : 0 , (dataMax) => dataMax + 20]}
                            tickFormatter={(it) => it?.toFixed(0)} 
                        />

                        <Legend content={RoundedRectLegend} iconType="rect" />
                        <Tooltip content={<InstitutionalFundFlowTooltip title1={title1} title2={title2} currency={currency}/>} />

                        <Line yAxisId="left"
                            dot={false}
                            connectNulls={true}
                            strokeWidth={1.7}
                            type="linear"
                            dataKey="data1"
                            name={title1}
                            stroke="#42c6ff" />

                        {
                            title2 &&
                            <Line yAxisId="left"
                                dot={false}
                                connectNulls={true}
                                strokeWidth={1.7}
                                type="linear"
                                dataKey="data2"
                                name={title2}
                                stroke="#ffbf39" />
                        }

                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }
}

export default ChartView

class InstitutionalFundFlowTooltip extends Component {

    shouldComponentUpdate() {
        return true
    }


    render() {
        const { active, title1, title2, currency } = this.props;
        if (!active) return null;

        let { payload } = this.props;
        if (!payload) return null;
        payload = payload[0].payload;

        const customDiv = (title, value, fill) => {
            return (
                <div className="col-12 mb-2">
                    <div className="d-flex align-items-start justify-content-end">
                        <div className="mr-2">
                            <div style={{
                                height: `10px`,
                                width: `10px`,
                                borderRadius: `3px`,
                                backgroundColor: `${fill}`,
                                marginTop: `3px`
                            }} />
                        </div>
                        <span className="fs-12 text-muted mr-2">{title}</span>
                    </div>
                        <p className="fs-14 text-end mr-2 fw-600 text-primary">${Utils.addCommas(value?.toFixed(2))} {currency}</p>

                </div>
            )
        }

        return <div className="toolTipBackground p-3 w-100">
            <p className="fw-500 fs-13 mb-2 text-end mr-2">As on {dayjs(new Date(payload.date)).format("DD MMM, YYYY")}</p>
            <div className="row fw-500">

                {customDiv(title1, payload.data1, "#42c6ff")}

                {
                    title2 && customDiv(title2, payload.data2, "#ffbf39")
                }

            </div>
        </div>
    }
}