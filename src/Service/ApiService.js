import dayjs from 'dayjs'

const dateFormat = "YYYY-MM-DD"

export default class ApiService {


    static getStartDate = (time) => {
        let todaydate = new Date(new Date().setHours(0, 0, 0, 0))
        let newDate;
        switch (time) {
            case "1m":
                newDate = new Date(todaydate.setDate(todaydate.getDate() - 30))
                return newDate.getTime() / 1000

            case "6m":
                newDate = new Date(todaydate.setMonth(todaydate.getMonth() - 6))
                return newDate.getTime() / 1000

            case "ytd":
                newDate = new Date(new Date().getFullYear(), 0, 1)
                return newDate.getTime() / 1000

            case "1y":
                newDate = new Date(todaydate.setFullYear(todaydate.getFullYear() - 1))
                return newDate.getTime() / 1000

            case "5y":
                newDate = new Date(todaydate.setFullYear(todaydate.getFullYear() - 5))
                return newDate.getTime() / 1000

            case "max":
            default:
                return false

        }
    }

    static getIndex = (data, time) => {
        const dataLength = data?.chart?.result[0]?.timestamp?.length
        let startIndex = 0

        if (time !== "max") {
            let startDate = this.getStartDate(time)
            if (startDate) {
                for (let index = dataLength - 1; index >= 0; index--) {
                    let currentTimeStap = data.chart.result[0].timestamp[index]
                    if (startDate > currentTimeStap) {
                        startIndex = index + 1
                        break;
                    }
                }
            }
        }
        const endIndex = dataLength

        return { startIndex, endIndex }
    }

    static prepareData = (data1, data2, time, currency, benchmark) => {
        const finalData = []

        const { startIndex, endIndex } = this.getIndex(data1, time)

        const multiplierAPI = currency !== "USD" ? require(`../API/USDto${currency}.json`) : undefined

        if (Array.isArray(data1?.chart?.result[0]?.timestamp)) {
            for (let index = startIndex; index < endIndex; index++) {
                
                const timestamp = data1.chart.result[0].timestamp[index] * 1000;

                let multiplier = 1
                if (multiplierAPI) {
                    const date = dayjs(new Date(timestamp)).format(dateFormat)
                    multiplier = parseFloat(multiplierAPI?.history[date] ?? 1.4)
                }

                finalData.push({
                    date: timestamp,
                    data1: data1?.chart?.result[0].indicators?.quote[0]?.close[index] * multiplier,
                    ...data2 && {
                        data2: data2?.chart?.result[0].indicators?.quote[0]?.close[index] * multiplier,
                    }
                })
            }
        }

        return finalData
    }

    static getData = (time, currency, benchmark) => {
        const data1 = require('../API/VFINX.json')
        const data2 = benchmark ? require(`../API/${benchmark}.json`) : undefined
        return this.prepareData(data1, data2, time, currency, benchmark)
    }
}