import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

interface SignupAccountProps {}

const SignupAccount: React.FC<SignupAccountProps> = () => {
  const styleObj: React.CSSProperties = {
    border: '1px solid black',
    padding: '10px',
    margin: '10px'
  };
  const navigate = useNavigate();
  const [bank, setBank] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [account, setAccount] = useState<string>("");

  const handleButtonClick = () => {
    navigate('/mainparent');
    // Navigate based on user role (child or parent) to the main page
  };

  const bankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBank(event.target.value);
  };

  const nameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const accountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccount(event.target.value);
  };

  return (
    <div className="signup-account-container" style={styleObj}>
      <div className="world-illustration" style={styleObj}>
       <p>계좌등록</p>
      </div>
      <div className="account-setup-box" style={styleObj}>
        
          <label htmlFor="bank-select">은행</label>
          <select id="bank-select" value={bank} onChange={bankChange}>
            <option value="">은행 선택</option>
            {/* Populate with actual bank options */}
            <option value="bank1">Bank 1</option>
            <option value="bank2">Bank 2</option>
            {/* ... other bank options ... */}
          </select>

          <label htmlFor="name-input">이름</label>
          <input
            id="name-input"
            type="text"
            value={name}
            onChange={nameChange}
            placeholder="이채은"
          />

          <label htmlFor="account-number-input">계좌번호</label>
          <input
            id="account-number-input"
            type="text"
            value={account}
            onChange={accountChange}
            placeholder="계좌번호"
          />

          <button onClick={handleButtonClick}>완료</button>
      
      </div>
    </div>
  );
};

export default SignupAccount;
