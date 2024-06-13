import { atom } from 'recoil'

// 부모 계좌
export const accountState = atom({
  key: 'accountState', // 고유한 key
  default: {
    accountNo: '',
    balance: '',
    frTranList: [], // 거래 내역
  },
})

// 아이 계좌
export const childAccountState = atom({
  key: 'childAccountState', // 고유한 key
  default: {
    accountNo: '',
    balance: '',
    frTranList: [], // 거래 내역
  },
})
