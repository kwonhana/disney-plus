//키즈 테마컬렉션
export const kidsCollectionsData = [
    {
        id: 'frozen',
        type: 'movie',
        title: '겨울왕국',
        query: 'frozen',
    },
    {
        id: 'nemo',
        type: 'movie',
        title: '니모',
        query: 'finding nemo',
    },
    {
        id: 'stitch',
        type: 'movie',
        title: '스티치',
        query: 'lilo stitch',
    },
    {
        id: 'dragon',
        type: 'movie',
        title: '드래곤 길들이기',
        query: 'how to train your dragon',
    },
    {
        id: 'incredibles',
        type: 'movie',
        title: '인크레더블',
        query: 'the incredibles',
    },
    {
        id: 'lionking',
        type: 'movie',
        title: '라이온 킹',
        query: 'the lion king',
    },
    {
        id: 'beauty',
        type: 'movie',
        title: '미녀와 야수',
        query: 'beauty and the beast',
    },
    {
        id: 'moana',
        type: 'movie',
        title: '모아나',
        query: 'moana',
    },
    {
        id: 'toystory',
        type: 'movie',
        title: '토이 스토리',
        query: 'toy story pixar',
    },
    {
        id: 'insideout',
        type: 'movie',
        title: '인사이드 아웃',
        query: 'inside out pixar',
    }, {
        id: 'beauty',
        type: 'movie',
        title: '미녀와 야수',
        query: 'beauty and the beast',
    },
    {
        id: 'mickey',
        type: 'tv',
        title: '미키마우스',
        query: 'mickey',
        animationOnly: true, // 애니메이션만 필터링용
    },
    {
        id: 'cars',
        type: 'movie',
        title: '카',
        query: 'cars pixar',
        animationOnly: true,
    },
    {
        id: 'pooh',
        type: 'movie',
        title: '곰돌이 푸',
        query: 'winnie the pooh',
    },
    {
        id: 'princess',
        type: 'movie',
        title: '공주',
        query: 'disney princess',
        animationOnly: true,
    },
    {
        id: "action",
        type: 'discover',
        name: 'Action & Adventure',
        title: '액션 & 어드벤처',
        genres: [12], // 어드밴처
        animationOnly: true,
    },
];

//TODO 키즈 테마별 영화
export const KidsThemeListNavData = [
    { title: 'mickey', text: '천방지축 미키마우스와 친구들', companyId: '337' },
    // { title: 'princess', text: '반짝반짝 빛나는 공주와 요정', companyId: '3' },
    // { title: 'disneyJr', text: '마블 유니버스로 떠나보세요', companyId: '7505' },
    // { title: 'cars', text: '자동차 친구들의 신나는 레이스', companyId: '1' },
    { title: 'action', text: '용감하게 떠나보는 모험', companyId: '7521' },
    { title: 'pooh', text: '푸와 친구들의 달콤한 하루', companyId: '43' },
    // { title: 'originals', text: '한계를 뛰어넘는 이야기의 세계', companyId: '711' },
]

//키즈 캐릭터
export const characterMovieData = [
    {
        id: "elsa",
        img: "/images/kidsMain/friends1.png",
        name: "엘사",
        type: "movie",
        query: "Frozen",
    },
    {
        id: "joy",
        img: "/images/kidsMain/friends2.png",
        name: "조이",
        type: "movie",
        query: "Inside Out",
    },
    {
        id: "nemo",
        img: "/images/kidsMain/friends3.png",
        name: "니모",
        type: "movie",
        query: "Finding Nemo",
    },
    {
        id: "belle",
        img: "/images/kidsMain/friends4.png",
        name: "벨",
        type: "movie",
        query: "Beauty and the Beast",
    },
    {
        id: "simba",
        img: "/images/kidsMain/friends5.png",
        name: "심바",
        type: "movie",
        query: "The Lion King",
    },
    {
        id: "buzz",
        img: "/images/kidsMain/friends6.png",
        name: "버즈",
        type: "movie",
        query: "Toy Story",
    },
    {
        id: "stitch",
        img: "/images/kidsMain/friends7.png",
        name: "스티치",
        type: "movie",
        query: "Lilo & Stitch",
    },
    {
        id: "moana",
        img: "/images/kidsMain/friends8.png",
        name: "모아나",
        type: "movie",
        query: "Moana",
    },
]
