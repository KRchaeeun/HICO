package ssafy.hico.global.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@MappedSuperclass
//@SuperBuilder(toBuilder = true)
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseTimeEntity {
    protected BaseTimeEntity() {
        // JPA를 위한 기본 생성자
    }
    // Entity가 생성되어 저장될 때 시간이 자동 저장됨
    @CreationTimestamp
    @Column(name = "create_time")
    private LocalDateTime createTime;

    // 조회한 Entity 값을 변경할 때 시간이 자동 저장됨
    @UpdateTimestamp
    @Column(name = "updated_time")
    private LocalDateTime updatedTime;
}
