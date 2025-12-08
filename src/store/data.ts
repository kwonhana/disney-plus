//TODO 메인 데이터

export type MainScreenItem = {
  alt: string;
  title: string;
  age: string;
  release_date: string;
  overview: string;
  genre_title: string;
};

export const MainScreenData: MainScreenItem[] = [
  {
    alt: 'movie',
    title: '소울',
    age: 'All',
    release_date: '2020',
    overview:
      '음악 교사 조는 오랜 꿈이던 재즈 공연 기회를 얻게 되지만 사고로 영혼 세계로 가게 된다. 그곳에서 새로운 영혼 ‘22’를 만나게 되고, 함께 현실로 돌아가기 위해 여정을 시작한다. ‘22’와 함께 한 여정 속에서 조는 삶의 의미를 깨닫게 되며, 진짜로 살아간다는 것이 무엇인지 다시 생각해보게 된다.',
    genre_title: '애니에이션, 모험, 가족, SF, 판타지, 코미디',
  },
  {
    alt: 'series',
    title: '호크아이',
    age: '12',
    release_date: '2021',
    overview:
      '클린트 바튼(호크아이)는 은퇴를 앞두고 가족과 조용한 크리스마스를 보내려 했지만, 과거 ‘로닌’으로서의 흔적이 다시 그를 쫓아온다. 그 과정에서 케이트 비숍이라는 젊은 궁수와 얽히게 되고, 이들은 함께 이 문제를 끝내기 위해 싸우게 된다. 이번에는 가족에게 돌아가기 위해, 그리고 과거의 자신과 완전히 결별하기 위해.',
    genre_title: '액션, 모험, 범죄, TV드라마',
  },
  {
    alt: 'original',
    title: '조각도시',
    age: '18',
    release_date: '2025',
    overview:
      '평범하게 살아가던 태중은 어느 날 이유도 모른 채 흉악한 범죄에 휘말려 감옥에 가게 되고, 그의 삶은 송두리째 망가진다.  자신의 삶을 망친 인물 요한을 향해 복수를 결심한 태중은 누명을 벗고 진실을 밝히기 위해 위험한 도시의 어두운 이면 속으로 뛰어들게 된다.',
    genre_title: '범죄, 스릴러, TV드라마',
  },
];
