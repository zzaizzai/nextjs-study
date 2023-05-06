'use client'
import { useEffect, useState } from "react"
import dayjs from 'dayjs'
import { dateFormatFromNow } from '@/util/displayFormat.js'


export default function Stock(props) {


    let [stock, setStock] = useState(0)
    let [recordList, setRecordList] = useState([])
    let [purpose, setPurpose] = useState("")
    let [dx, setDx] = useState(0)
    let [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        fetch('/api/stock/getRecord?id=' + props._id).then(r => r.json()).then((result) => {
            var total = 0

            result.forEach(element => {
                if (element.date) {
                    element.date = element.date
                } else {
                    element.date = dayjs('2023-05-05 12:00:00')
                }
                element.date = dateFormatFromNow(element.date)

                if (element.positive) {
                    total = Number(total) + Number(element.number_change)
                } else {
                    total = Number(total) - Number(element.number_change)
                }
            });


            setStock(total)
            setRecordList(result)

        })
    }, [])

    return (
        <div>

            <h3>Stock</h3>

            <div>Total: {stock}</div>

            <div>
                {recordList.map((record, i) => {
                    return (
                        <div key={i} className={record.positive ? "stock-positive-bg stock-record" : "stock-negative-bg stock-record"}>
                            {
                                record.positive ?
                                    "+"
                                    : ""
                            }
                            {record.number_change}
                            <span className="mx-10">{record.purpose ? record.purpose : "test"}</span>
                            <span className="mx-10">{record.authorName}</span>
                            <div className="text-muted">{record.date} </div>
                        </div>
                    )

                })}</div>


            <div className="stock-box">
                <input className="stock-number" type="number" placeholder="0" value={dx} onChange={(e) => {
                    setDx(e.target.value)
                }} />

                <input type="text" placeholder="Purpose" value={purpose} onChange={(e) => {
                    setPurpose(e.target.value)
                }} />
            </div>

            <button className="stock-positive-bg " onClick={() => {

                fetch('/api/stock/change',
                    {
                        method: "POST",
                        body:
                            JSON.stringify({
                                number_change: dx,
                                _id: props._id,
                                positive: true,
                                purpose: purpose
                            })
                    }).then((res) => {
                        if (res.ok) {
                            location.reload()
                        } else {
                            res.json().then((err) => {
                                console.log(err["err"])
                                setErrorMessage(err["err"])
                            })
                        }
                    })
            }}>➕</button>
            <button className="stock-negative-bg mx-10" onClick={() => {
                fetch('/api/stock/change',
                    {
                        method: "POST",
                        body:
                            JSON.stringify({
                                number_change: dx,
                                _id: props._id,
                                positive: false,
                                purpose: purpose
                            })
                    }).then((res) => {
                        if (res.ok) {
                            location.reload()
                        } else {
                            res.json().then((err) => {
                                console.log(err["err"])
                                setErrorMessage(err["err"])
                            })
                        }
                    })
            }} >➖</button>

            {errorMessage}

        </div>
    )
}


