import "./scss/BannerBtn.scss";

const BannerBtn = () => {
    return (
        <div className="bannerBtnWrap">
            <button className="nowPlay">지금 재생하기<img src="/images/main/nowPlay.svg" alt="재생" /></button>
            <button className="moreInfo">상세 정보</button>
            <button className="heart"><img src="/icon/heart.svg" alt="찜하기" /></button>
        </div>
    )
}

export default BannerBtn