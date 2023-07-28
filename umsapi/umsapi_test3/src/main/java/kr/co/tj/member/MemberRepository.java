package kr.co.tj.member;
import org.springframework.data.jpa.repository.JpaRepository;

import kr.co.tj.member.MemberEntity;

public interface MemberRepository extends JpaRepository<MemberEntity, String> {

	MemberEntity findByUsername(String username);

}
