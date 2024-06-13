import { atom, DefaultValue } from "recoil";

const localStorageEffect = (key: string) => ({ setSelf, onSet }: any) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue: number | DefaultValue) => {
    if (newValue instanceof DefaultValue) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  });
};
export const stageSubjectState = atom({
  // 해당 나라의 어떤 스테이지를 클릭했는지 상태 변수
  // 각 나라별 5개의 스테이지
  key: "stageSubjectState",
  default: 0,
  effects_UNSTABLE: [
    localStorageEffect('stageSubjectState')
  ],
});

export const countrydetailState = atom<number>({
  key: "countrydetailState",
  default: 0,
  effects_UNSTABLE: [
    localStorageEffect('countrydetailState')
  ],
});