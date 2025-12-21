// // 일반, 키즈 조건문
// // 배경 누르면 장르 리스트 닫히도록
// // 장르 선택하면 해당하는 장르 searchList에 데이터 뿌리고 검색창에 선택된 장르 띄우기

// import { useState } from 'react';

// interface FilterSelectProps {
//   mode: 'normal' | 'kids';
//   onChange: (value: 'all' | 'movie' | 'tv') => void;
// }

// const filterList = [
//   {
//     type: 'normal',
//     title: '영화',
//   },
//   {
//     type: 'normal',
//     title: '시리즈',
//   },
// ];

// const FilterSelect = ({ mode }: FilterSelectProps) => {
//   const [isOpenFilter, setIsOpenFilter] = useState(false);
//   const [selectedFilter, setSelectedFilter] = useState('전체');

//   // mode에 맞는 장르만 필터
//   const filtered = filterList.filter((f) => f.type === mode);

//   const handleSelectFilter = (f: any) => {
//     setSelectedFilter(f.title);
//     setIsOpenFilter(false);

//     onChange(f.value);
//   };

//   return (
//     <>
//       {/* 배경 클릭 시 닫기 */}
//       {isOpenFilter && <div className="filterBg" onClick={() => setIsOpenFilter(false)} />}
//       <div className={`filterSelectWrap ${isOpenFilter ? 'active' : ''}`}>
//         <div className="filterSelectHeader" onClick={() => setIsOpenFilter(!isOpenFilter)}>
//           <p>{selectedFilter}</p>
//           <span className="filterToggle"></span>
//         </div>
//         {isOpenFilter && (
//           <ul className="filterList">
//             {filterList.map((f, id) => (
//               <li key={id}>
//                 <button onClick={() => handleSelectFilter(f)}>{f.title}</button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </>
//   );
// };

// export default FilterSelect;

import { useState } from 'react';

interface FilterSelectProps {
  mode: 'normal' | 'kids';
  value: 'all' | 'movie' | 'tv';
  onChange: (value: 'all' | 'movie' | 'tv') => void;
}

const filterList = [
  { type: 'normal', title: '전체', value: 'all' },
  { type: 'normal', title: '영화', value: 'movie' },
  { type: 'normal', title: '시리즈', value: 'tv' },

  { type: 'kids', title: '전체', value: 'all' },
  { type: 'kids', title: '영화', value: 'movie' },
];

const FilterSelect = ({ mode, value, onChange }: FilterSelectProps) => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const filtered = filterList.filter((f) => f.type === mode);
  const selectedTitle = filtered.find((f) => f.value === value)?.title ?? '전체';

  const handleSelectFilter = (f: (typeof filterList)[number]) => {
    onChange(f.value);
    setIsOpenFilter(false);
  };

  return (
    <>
      {isOpenFilter && <div className="filterDim" onClick={() => setIsOpenFilter(false)} />}

      <div className={`filterSelectWrap ${isOpenFilter ? 'active' : ''}`}>
        <div className="filterSelectHeader" onClick={() => setIsOpenFilter(!isOpenFilter)}>
          <p>{selectedTitle}</p>
          <span className="filterToggle" />
        </div>

        {isOpenFilter && (
          <ul className="filterList">
            {filtered.map((f) => (
              <li key={f.value}>
                <button onClick={() => handleSelectFilter(f)}>{f.title}</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default FilterSelect;
