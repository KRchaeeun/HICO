package ssafy.hico.domain.account.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.hico.domain.member.entity.Member;

@Getter
@Entity
@Table(name = "account")
@NoArgsConstructor
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "account")
    private String accountNo;

    @Column(name = "password")
    private String password;

    @Column(name = "bank_code")
    private String bankCode;

    @Column(name = "bank_name")
    private String bankName;

    @Builder
    public Account(Member member, String accountNo, String password, String bankCode, String bankName){
        this.member = member;
        this.accountNo = accountNo;
        this.password = password;
        this.bankCode = bankCode;
        this.bankName = bankName;
    }

}