/**
 * ============================================================
 * data.js - 포트폴리오 데이터 파일
 * ============================================================
 * 업데이트 방법:
 * - 프로젝트 추가: projects 배열에 객체 추가
 * - 경력 추가: experiences 배열에 객체 추가
 * - 스킬 변경: skills 객체 수정
 * - 개인정보 변경: profile 객체 수정
 * ============================================================
 */

const DATA = {
  // ─── 프로필 정보 ───
  profile: {
    name: "박경민",
    nameEn: "Park Kyung-Min",
    birthYear: 1983,
    phone: "010-X6X6-XX6X",
    email: "stoprade@gmail.com",
    address: "경기 군포시 대야미동",
    website: "http://kmdaro.dothome.co.kr",
    github: "https://github.com",
    education: "신성대학 자동차공학과 졸업 (2002~2008)",
    military: "육군 병장 만기제대 (2003~2005)",
    totalCareer: "총 14년 2개월",
    currentCompany: "메가존클라우드 재직중",
    title: "UI / Frontend Developer",
    description:
      "15년간 60+ 프로젝트를 통해\n사용자 중심의 UI를 설계하고 구현합니다.",
    stats: [
      { number: "15+", label: "Years" },
      { number: "60+", label: "Projects" },
      { number: "11+", label: "Companies" },
    ],
    aboutText: [
      "디자이너의 감각적인 결과물을 사용자가 웹상에서 가장 편리하고 직관적으로 경험할 수 있도록 구현하는 일에 깊은 매력을 느껴 웹 퍼블리셔의 길을 선택했습니다. 가족 중 청각에 어려움이 있는 분이 계셔 자연스럽게 <strong>웹 접근성</strong>에 대한 깊은 관심을 갖게 되었고, 누구나 차별 없이 평등하게 누릴 수 있는 웹 서비스를 만드는 것에 남다른 자부심과 책임감을 느끼고 있습니다.",
      "현재에 안주하지 않고 프론트엔드 개발 업무를 병행하며 역량을 확장해 왔으며, 최근에는 <strong>AWS BedRock을 활용한 AI 기술 프로젝트</strong>에 참여하며 새로운 기술적 도전을 주도적으로 지속하고 있습니다.",
    ],
    focusAreas: [
      "AI 기반 서비스 UI/UX",
      "디자인 시스템 구축",
      "웹 접근성 / 웹 표준",
      "성능 최적화",
    ],
  },

  // ─── 기술 스택 ───
  skills: {
    frontend: [
      { name: "Vue", level: 90 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "TypeScript", level: 80 },
      { name: "HTML5", level: 95 },
      { name: "CSS3 / SCSS", level: 95 },
      { name: "ReactJS", level: null },
      { name: "jQuery", level: 90 },
      { name: "Thymeleaf", level: 75 },
      { name: "반응형 웹", level: 95 },
      { name: "웹 접근성", level: 90 },
      { name: "크로스 브라우징", level: 90 },
    ],
    tools: [
      { name: "GenAI / AI 플랫폼", level: null },
      { name: "프롬프트 엔지니어링", level: null },
      { name: "Git / GitLab", level: null },
      { name: "AWS IAM", level: null },
      { name: "Jqgrid", level: null },
      { name: "카페24 / 워드프레스", level: null },
      { name: "zeplin", level: null },
      { name: "photoshop", level: null },
    ],
  },

  // ─── 프로젝트 (추가/수정 시 이 배열만 편집) ───
  projects: [
    {
      title: "Air Studio (GenAi360 v4)",
      desc: "GenAi 플랫폼 v1~v3 → Air Studio v4 전체 Vue 화면 개발",
      image: "images/mzc/AIR-Studio-studio.png",
      techs: ["Vue", "TypeScript", "AI/GenAI"],
      period: "2022.11 ~ 재직중",
      client: "(주)메가존클라우드",
    },
    {
      title: "GS 칼텍스 DataCatalog",
      desc: "DataHub 기반 DataCatalog 화면 개발 (반응형 웹)",
      image: "images/mzc/datahub.JPG",
      techs: ["React", "반응형", "DataHub"],
      period: "2022.11 ~ 재직중",
      client: "GS 칼텍스 / 메가존클라우드",
    },
    {
      title: "포스코인터내셔널 데이터플랫폼",
      desc: "데이터플랫폼 구축 프로젝트 UI 개발 (반응형 웹)",
      image: "images/mzc/posco.png",
      techs: ["Vue", "TypeScript", "반응형"],
      period: "2022.11 ~ 재직중",
      client: "포스코인터내셔널 / 메가존클라우드",
    },
    {
      title: "SK 바이오사이언스 전사 경영관리",
      desc: "전사 경영 관리 화면 개발 (반응형 웹)",
      image: "images/mzc/SK_basa.png",
      techs: ["HTML5", "CSS3", "JavaScript"],
      period: "2022.11 ~ 재직중",
      client: "SK 바이오사이언스 / 메가존클라우드",
    },
    {
      title: "맘마먹자 모바일 쇼핑몰 구축",
      desc: "PC/모바일/기업형/사업자몰 콘텐츠 관리 및 모바일 쇼핑몰 신규 구축",
      image: null,
      techs: ["HTML5", "CSS3", "JavaScript", "jQuery"],
      period: "2020.07 ~ 2022.09",
      client: "주식회사더맘마",
    },
    {
      title: "해커스 교육 플랫폼",
      desc: "해커스 사이트 운영관리 및 공기업/독학사 모바일 구축, 라이브 채팅 구축",
      image: "images/mobile/main12.jpg",
      techs: ["HTML5", "CSS3", "JavaScript"],
      period: "2018.04 ~ 2020.06",
      client: "해커스 그룹 / (주)교암",
    },
    {
      title: "롯데마트 문화센터 반응형 리뉴얼",
      desc: "롯데마트 문화센터 반응형 리뉴얼 UI 개발",
      image: "images/website02/m_project03.jpg",
      techs: ["HTML5", "CSS3", "반응형"],
      period: "2017.05 ~ 2017.08",
      client: "롯데마트 / (주)리노커뮤니케이션즈",
    },
    {
      title: "SK 계열사 챗봇 (이삭, 매직, 워커힐)",
      desc: "SK 계열사 챗봇 UI 개발",
      image: "images/mobile/main10.jpg",
      techs: ["HTML5", "CSS3", "JavaScript"],
      period: "2017.09",
      client: "SK C&C / (주)리노커뮤니케이션즈",
    },
    {
      title: "삼성 국가별 리뉴얼 (80개국)",
      desc: "삼성 글로벌 웹사이트 통합 리뉴얼 메인 전담 약 80개국 UI 개발",
      image: "images/website01/m_project27.jpg",
      techs: ["HTML", "CSS", "다국어"],
      period: "2011.11 ~ 2012.02",
      client: "삼성 SDS / ACG",
    },
  ],

  // ─── 경력 (추가/수정 시 이 배열만 편집) ───
  experiences: [
    {
      period: "2022.11 ~ 재직중",
      company: "메가존클라우드주식회사",
      role: "Air Ops 매니저 | 주요직무: 반응형웹",
      highlights: [
        "GS 칼텍스 DataHub 기반 DataCatalog 화면 개발 (반응형 웹)",
        "포스코인터내셔널 데이터플랫폼 구축 UI 개발 (반응형 웹)",
        "연세의료원 프로분석포털 DPP 기능 개선 개발",
        "SK 바이오사이언스 전사 경영 관리 화면 개발 (반응형 웹)",
        "GenAi 플랫폼(v1) → GenAi360(v2~v3) → Air Studio(v4) Vue 화면 개발",
        "DPP (Data Portal Platform) Thymeleaf 화면 개발",
        "NH 금융 Air Studio PoC (캐피탈, 저축은행) 설치 및 프롬프트 엔지니어",
        "삼천리 Air Studio 마이그레이션 및 프롬프트 엔지니어",
        "AWS IAM 계정 관리 (사용자, 그룹, 역할, 정책) 및 하이퍼빌링 비용 관리",
      ],
    },
    {
      period: "2020.07 ~ 2022.09 (2년 3개월)",
      company: "주식회사더맘마",
      role: "개발본부 컨버전스팀 과장 | 주요직무: 웹표준·웹접근성",
      highlights: [
        "맘마먹자 PC 컨텐츠 관리 (신규, 유지보수, 이벤트)",
        "맘마먹자 기업형 PC 컨텐츠 관리 (유지보수)",
        "맘마먹자(MaZa) 모바일 컨텐츠 관리 (신규, 유지보수, 이벤트)",
        "맘마먹자(사업자몰) 모바일 컨텐츠 관리",
        "장보기마트(구 맘마먹자) 모바일 컨텐츠 관리",
        "맘마먹자 모바일 쇼핑몰 구축 (신규 완료)",
        "맘마맨 파트너 모바일 리뉴얼 완료",
      ],
    },
    {
      period: "2018.04 ~ 2020.06 (2년 3개월)",
      company: "(주)교암 / 해커스 그룹",
      role: "웹 개발5팀 과장 파트장 | 주요직무: 웹표준·웹접근성",
      highlights: [
        "해커스 공기업 모바일 구축 프로젝트 (UI 개발)",
        "해커스 독학사 모바일 구축 프로젝트 (UI 개발)",
        "해커스 라이브 채팅 구축 프로젝트 (UI 개발)",
        "해커스 사이트 운영관리 (해영, 금융, 해잡, 위더스, 한울, 독학사 등)",
      ],
    },
    {
      period: "2016.09 ~ 2018.03 (1년 5개월+)",
      company: "(주)리노커뮤니케이션즈 / (주)라이트브레인엠",
      role: "개발팀 과장 | 주요직무: 웹표준·웹접근성",
      highlights: [
        "롯데마트 문화센터 반응형 리뉴얼 UI 개발",
        "SK C&C TokTok (PC, MOBILE) UI 개발",
        "SK 계열사 챗봇 (이삭, 워커힐, SK매직) UI 개발",
        "SKB 브로드밴드 (개인, 모바일) 운영",
        "SKB 브로드밴드 홍보채널 (skgigaiptv) 운영",
        "Atrue 리뉴얼 (카페24), Renomedia 리뉴얼 (워드프레스)",
      ],
    },
    {
      period: "2015.07 ~ 2016.08 (1년 2개월)",
      company: "(주)위니즈아이에스",
      role: "개발팀 사원 | 주요직무: 웹개발자",
      highlights: [
        "롯데마트 매출관리 시스템 UI/Jqgrid 개발",
        "신원덴탈 매출 관리 모바일 UI/Jqgrid 개발",
        "유림 매출 관리 시스템 UI/Jqgrid 개발",
      ],
    },
    {
      period: "2012.12 ~ 2013.08 (9개월)",
      company: "(주)에이치커뮤니케이션",
      role: "웹 퍼블리셔팀 과장 팀장 | 주요직무: 웹표준·웹접근성",
      highlights: [
        "강북삼성병원 접근성 개선 (13개 사이트) - 퍼블리셔 PM",
        "미라콤 접근성 마크 (국문, 영문, 중문) - 퍼블리셔 PM",
        "스시로 UI 개발 - 퍼블리셔 PM",
        "배움사이버평생교육원 접근성 개선 UI 개발",
        "서울시청 네트워크 RTK, 경기버스(영문) 접근성 UI 개발",
      ],
    },
    {
      period: "2012.06 ~ 2012.11 (6개월)",
      company: "(주)비스톤스",
      role: "웹 퍼블리셔팀 대리 | 주요직무: 웹표준·웹접근성",
      highlights: [
        "LIG 손해보험 접근성 마크 획득 UI 개발",
        "Wefree, Cresyn UI 개발",
      ],
    },
    {
      period: "2011.11 ~ 2012.05",
      company: "SK C&C / 삼성 SDS / ACG",
      role: "UI 개발자",
      highlights: [
        "삼성 국가별 리뉴얼 (통합 리뉴얼 메인 전담 약 80개국)",
        "SK C&C 사내 어플 개발 (스마트폰, 태블릿 적용)",
      ],
    },
    {
      period: "2011.01 ~ 2011.11 (11개월)",
      company: "블루카펫",
      role: "개발팀 대리 | 주요직무: 웹표준·웹접근성",
      highlights: [
        "수작요리주가 와라와라 UI 개발 및 사내 운영관리 (모바일 포함)",
        "천사대리운전 UI 개발 (모바일 사용자/관리자 포함)",
        "스프리스 드림프로젝트, 몽벨 Prove, 리닝 브랜드/쇼핑몰/통합 쇼핑몰",
        "실크테라피 쇼핑몰 (모바일 포함), 노스랜드, 프로월드컵",
        "트렌드모니터, 한솔외식연구소, 한국에이티아이케이, 카페띠아모(모바일)",
        "미즈나래 여성병원(모바일), 본죽(모바일), 세진침대(모바일), 한스델리(모바일)",
        "A2 오토데스크, Success Space, TI코리아, 넥스트리밍, 동탄시티병원, 아미코스메틱",
      ],
    },
    {
      period: "2009.12 ~ 2010.11 (1년)",
      company: "(주)이일일사 / 한뮤직주식회사",
      role: "디자인팀 사원 | 주요직무: 웹표준·웹접근성",
      highlights: [
        "안산시청(접근성), 김포시청(접근성), 법무부(접근성), 강남구청 등 웹 표준 및 접근성 UI 개발",
      ],
    },
  ],
};
