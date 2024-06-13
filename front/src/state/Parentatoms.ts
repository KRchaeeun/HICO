import { atom, DefaultValue } from 'recoil'
// 새로고침했을 때  초기화를 막아줄 로컬스토리지 저장
// `newValue`에 대한 타입을 `number`로 명시적으로 선언합니다.
const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue))
    }

    onSet((newValue: number | DefaultValue) => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(newValue))
      }
    })
  }

export const childIdState = atom<number>({
  key: 'childIdState',
  default: 0,
  effects_UNSTABLE: [localStorageEffect('childIdState')],
})
