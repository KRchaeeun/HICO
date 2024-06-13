import React, {useEffect, useState, startTransition } from 'react'
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemButton } from '@mui/material'
import { blue } from '@mui/material/colors'
import styles from './registeraccount.module.css'
import Button from '@mui/material/Button'
import logoImage from '../../assets/logo.png'
import { list } from '@/api/account'
import { atom, useSetRecoilState  } from 'recoil';

export const accountState = atom({
    key: 'accountState', // 고유한 키
    default: {
        accountNo : '',
    },
});

const RegisterAccount: React.FC = () => {
  // 더미데이터
  interface BankAccount {
    bankName: string
    accountNo: string
  }
    const navigate = useNavigate();
    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
    const setAccount = useSetRecoilState(accountState);
    useEffect(() => {
        const fetchAccountData = async () => {
            try {
                const response = await list();
                console.log(response.data.data.REC);
                if (response.data.data.REC === null || response.data.data.REC.length === 0) {
                    navigate('/account/create'); // 경로를 CreateAccount 컴포넌트의 경로로 변경하세요
                } else {
                    setBankAccounts(response.data.data.REC);
                }
            } catch (error) {
                console.error("Error fetching account data:", error);
            }
        };

        fetchAccountData();
    }, [navigate]);

    // 리스트 중에 내 계좌 선택
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)

    const handleConfirmSelection = () => {
        if (selectedAccount) {
            startTransition(() => {
                setAccount({ accountNo: selectedAccount });
                navigate('/account/password');
            });
        } else {
            alert('계좌를 선택해주세요.');
        }
    };

  const handleListItemClick = (account: string) => {
    setSelectedAccount(account)
  }

  return (
    <div className={styles.container}>
      {/* 로고 이미지 */}
      <img
        src={logoImage}
        alt="LOGO"
        style={{
          height: '70px',
          marginTop: '30px',
          marginRight: '480px',
          marginBottom: '15px',
        }}
      />

      <div className={styles.materialContainer}>
        <div className={styles.maintext1}>히코를 사용려면 계좌가 필요해요.</div>
        <div className={styles.subtext1}>
          사용하실 계좌를 아래에서 선택해 주세요.
        </div>
        <div className={styles.listContainer}>
          <List
            className={styles.scrollableList}
            sx={{ bgcolor: 'background.paper' }}
          >
            {bankAccounts.map((account, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  onClick={() => handleListItemClick(account.accountNo)}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F1F3F7',
                    },
                    border:
                      selectedAccount === account.accountNo
                        ? `2px solid #0064FF`
                        : 'none',
                    borderRadius: '5px',
                    marginBottom: 1,
                    height: '80px',
                    marginLeft: '55px',
                    marginRight: '35px',
                  }}
                >
                  <div className={styles.account}>
                    <div className={styles.acctext1}>{account.bankName}</div>
                    <div className={styles.acctext2}>{account.accountNo}</div>
                  </div>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>

        <div className={styles.button}>
          <Button
            variant="contained"
            disableElevation
            onClick={handleConfirmSelection}
            sx={{
              width: '100%',
              height: '70px',
              fontSize: '20px',
              fontWeight: 'bold',
              backgroundColor: '#0064FF',
              borderRadius: '5px',
            }}
          >
            선택하기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RegisterAccount
