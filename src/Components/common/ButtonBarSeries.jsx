import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ButtonBarSeries extends Component {

    getButton = (data, isHighlighted, isFirst, isLast) => {
        let extraStyle = "";
        if (isFirst)
            extraStyle = 'buttonNormalLeft';
        if (isLast)
            extraStyle = 'buttonNormalRight';

        return <p
            className={`${isHighlighted ? 'buttonHighlightedSmall' : 'buttonNormalSmall'} ${extraStyle}`}
            onClick={() => {
                if (!isHighlighted) this.onSelected(data);
            }}>{data.title}</p>
    };

    getButtons = () => {
        return this.props.dataSeries.map((data, i) => {
            return <div className="py-1 small" key={data.id}>
                {this.getButton(data, data.id === this.props.selectedId, i === 0, i === this.props.dataSeries.length - 1)}
            </div>;
        });
    };

    onSelected = (data) => {
        if (this.props.onSelected)
            this.props.onSelected(data);
    };

    render() {
        return <div className={`d-flex flex-row flex-wrap align-items-center justify-content-end buttonBar`}>
            {this.getButtons()}
        </div>
    }
}

export default React.memo(ButtonBarSeries);

ButtonBarSeries.propTypes = {
    onSelected: PropTypes.func.isRequired,
    delayedLoading: PropTypes.bool
};