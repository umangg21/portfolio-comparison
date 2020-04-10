import React from 'react'

const RoundedRectLegend = ({payload}) => {
    return (
        <div className="d-flex align-items-center justify-content-around">
            <div/>
            <div className="d-flex flex-wrap align-items-center justify-content-center">
                {
                    payload.map((entry, index) => {
                            const {color} = entry;
                            if (!entry || !entry.value || !entry.value.trim()) return null
                            return (
                                <div className="d-flex align-items-center mx-2" key={`item-${index}`}>
                                    <div className="legendBox mr-2" style={{"backgroundColor": color}}/>
                                    <p className="legendText mb-0">{entry.value}</p>
                                </div>
                            )
                        }
                    )
                }
            </div>
            <div/>
        </div>
    );
};

export default RoundedRectLegend;