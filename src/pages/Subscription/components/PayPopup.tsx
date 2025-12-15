import "../scss/PayPopup.scss"

const PayPopup = ({ onClose }) => {
    return (
        <div className="payPopupBg" onClick={onClose}>
            <div className="payWrap">
                <p className="title">결제 가능한 신용카드 또는 은행카드</p>
                <p><img src="/images/subscription/creditCard.png" alt="" /></p>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    )
}

export default PayPopup