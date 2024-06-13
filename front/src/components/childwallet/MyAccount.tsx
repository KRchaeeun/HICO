import React, { useState } from 'react'
import styles from './myaccount.module.css'
import wallet from '../../assets/wallet.png'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import { SvgIconProps } from '@mui/material/SvgIcon'
import request from '../../assets/moneysending.png'
import complete from '../../assets/moneycomplete.png'
import { useRecoilValue } from 'recoil'
import { childAccountSelector } from '@/state/AccountSelectors'

interface AccountData {
  accountNo: string
  balance: string
  frTranList: frTran[]
}

interface frTran {
  frTranId: number
  balance: number
  countryId: number
  frBalance: number
  code: string
  createTime: string
  childId: number
  name: string
  transacted: boolean
}

const Myaccount: React.FC = () => {
  // 계좌 변수
  const { accountNo, balance, frTranList } =
    useRecoilValue<AccountData>(childAccountSelector)

  // 자녀이름 select
  const CustomExpandIcon = (props: SvgIconProps) => {
    return <ExpandMoreRoundedIcon {...props} />
  }
  const [billtype, setbilltype] = useState<string>('10')
  const handleChange = (event: SelectChangeEvent<string>) => {
    setbilltype(event.target.value)
  }

  // 아이가 부모에게 송금 받은 시점의 잔액 계산
  const calculateReceivedBalance = (
    transactions: frTran[],
    currentIndex: number,
    initialBalance: string
  ): string => {
    let receivedBalance = parseFloat(initialBalance)

    for (let i = 0; i < currentIndex; i++) {
      const transaction = transactions[i]
      if (transaction.transacted) {
        receivedBalance -= transaction.balance
      }
    }

    return receivedBalance.toLocaleString()
  }

  return (
    <div className={styles.container}>
      {/* 메인1 */}
      <div className={styles.main1}>
        {/* 지갑 사진 */}
        <div className={styles.image}>
          <img src={wallet} alt="wallet" style={{ height: '230px' }} />
        </div>
        {/* 계좌 정보 */}
        <div className={`${styles.horizontal} ${styles.banklayout}`}>
          <div className={styles.mybank}>한국은행</div>
          <div className={styles.myaccount}>{accountNo}</div>
        </div>
        {/* 잔액 */}
        <div className={styles.horizontal}>
          <div className={styles.balance}>
            {Number(balance).toLocaleString()}
          </div>
          <div className={styles.won}>원</div>
        </div>
      </div>

      {/* 메인2 */}
      <div className={styles.main2}>
        {/* 기간 필터 */}
        <div className={styles.filter}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={billtype}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              disableUnderline
              IconComponent={CustomExpandIcon}
              sx={{
                '.MuiSelect-select': {
                  fontSize: '20px',
                  fontWeight: 500,
                  color: '#585865',
                  paddingLeft: '30px',
                  paddingTop: '14px',
                },
                '.MuiSvgIcon-root': {
                  fontSize: '40px',
                  paddingBottom: '5px',
                },
              }}
            >
              <MenuItem value={'10'}>전체</MenuItem>
              <MenuItem value={'20'}>환전요청</MenuItem>
              <MenuItem value={'30'}>환전완료</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* 각각 내역 */}
        {frTranList.map(
          (transaction: frTran, index: number) =>
            // transacted 값이 필터값에 따라 일치하는 경우에만 거래 내역을 표시합니다.
            (billtype === '10' ||
              (billtype === '20' && !transaction.transacted) ||
              (billtype === '30' && transaction.transacted)) && (
              <div key={index} className={styles.accountcontent}>
                <div className={styles.date}>
                  {new Date(transaction.createTime).toLocaleDateString(
                    'ko-KR',
                    {
                      month: 'long',
                      day: 'numeric',
                      weekday: 'short', // 요일 표시
                      hour: '2-digit', // 2자리 숫자로 시간 표시
                      minute: '2-digit', // 2자리 숫자로 분 표시
                      second: '2-digit', // 2자리 숫자로 초 표시
                      hour12: false, // 24시 형식
                    }
                  )}
                </div>
                <div className={styles.detail}>
                  <img
                    src={transaction.transacted ? complete : request}
                    alt="Transaction Type"
                    style={{ width: '65px', height: '65px' }}
                  />
                  <div className={styles.subdetail1}>
                    <div className={styles.sub1text1}>
                      {transaction.transacted ? '환전완료' : '환전요청'}
                    </div>
                    <div className={styles.sub1text2}>부모님</div>
                  </div>
                  {transaction.transacted === false ? (
                    <div className={styles.subdetail2}>
                      <div className={styles.sub2text1}>
                        {Number(transaction.balance).toLocaleString()}원
                      </div>
                    </div>
                  ) : (
                    <div className={styles.subdetail2}>
                      <div className={styles.sub2text1}>
                        +{Number(transaction.balance).toLocaleString()}원
                      </div>
                      {transaction.balance && (
                        <div className={styles.sub2text3}>
                          잔액{' '}
                          {calculateReceivedBalance(
                            frTranList,
                            index,
                            balance
                          ).toLocaleString()}
                          원
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  )
}

export default Myaccount
