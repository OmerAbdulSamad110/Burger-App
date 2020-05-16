import React from 'react';
import Styles from './Form.module.css';

function Form(props) {
    let formElement = null;
    let invalidClass = {};
    if (!props.valid && props.touched) {
        invalidClass['className'] = Styles['Invalid'];
    }
    switch (props.type) {
        case 'input':
            formElement = <input
                {...invalidClass || null}
                {...props.identify}
                {...props.config}
                value={props.value}
                onChange={props.change} />;
            break;
        case 'textarea':
            formElement = <textarea
                {...invalidClass || null}
                {...props.identify}
                {...props.config}
                value={props.value}
                onChange={props.change} />;
            break;
        case 'select':
            formElement = <select
                {...invalidClass || null}
                {...props.identify}
                onChange={props.change}>
                {props.config.options.map(option =>
                    <option key={option.value} value={option.value}>{option.display}</option>
                )}
            </select>;
            break;
        default:
            formElement = <input
                {...invalidClass || null}
                {...props.identify}
                {...props.config}
                value={props.value}
                onChange={props.change} />;
            break;
    }
    return (
        <div className={Styles['Form']}>
            <label>{props.label}</label>
            {formElement}
        </div>
    )
}

export default Form

