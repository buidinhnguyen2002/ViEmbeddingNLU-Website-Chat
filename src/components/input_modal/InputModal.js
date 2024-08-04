import "./InputModal.scss"
export default function InputModal({label,placeHolder, maxLength, onChangeInput, currentLength, value}) {
    return(
        <div className={"form-field"}>
            <label className={"label"}>{label}</label>
            <div className="input__wrapper">
                <input className={"input"} value={value} onChange={(e)=> {onChangeInput(e.target.value)}} placeholder={placeHolder} maxLength={maxLength}/>
                <span className={"input-length"}>{`${currentLength} / ${maxLength}`}</span>
            </div>
        </div>
    )
}