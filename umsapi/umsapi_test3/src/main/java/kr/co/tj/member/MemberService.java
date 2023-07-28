package kr.co.tj.member;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import kr.co.tj.sec.TokenProvider;

@Service
public class MemberService {

	@Autowired
	private MemberRepository memberRepository;
	
	@Autowired
	private TokenProvider tokenProvider;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public MemberDTO login(MemberDTO dto) {
		MemberEntity member = getByCredentials(dto.getUsername());

		if (member == null) {
			throw new RuntimeException("해당 회원이 없어서 로그인 거부");
		}
		
		if(!passwordEncoder.matches(dto.getPassword(), member.getPassword())) {
			throw new RuntimeException("비밀번호 틀림");
		}
		
		String token = tokenProvider.create(member);

		dto = new ModelMapper().map(member, MemberDTO.class);
		dto.setToken(token);
		dto.setId(null); // id 패스워드 숨김처리
		dto.setPassword(null);

		return dto;
	}
	
	public MemberEntity getByCredentials(String username) {
		return memberRepository.findByUsername(username);
	}

	@Transactional
	public void delete(MemberDTO dto) {

		MemberEntity entity = memberRepository.findByUsername(dto.getUsername());

		if (entity == null) {
			throw new RuntimeException("삭제 실패");
		}
		
		if(!passwordEncoder.matches(dto.getPassword(), entity.getPassword())) {
			throw new RuntimeException("비밀번호가 다름");
		}

		memberRepository.delete(entity);
	}

	public MemberDTO insert(MemberDTO dto) {
		MemberEntity entity = new ModelMapper().map(dto, MemberEntity.class);

		entity.setCreateDate(new Date());
		entity.setUpdateDate(new Date());
		
		entity.setPassword(passwordEncoder.encode(dto.getPassword()));

		entity = memberRepository.save(entity);

		dto = new ModelMapper().map(entity, MemberDTO.class);

		return dto;
	}

	public List<MemberDTO> findAll() {

		List<MemberEntity> entity = memberRepository.findAll();
		List<MemberDTO> dto = new ArrayList<>();

		for (MemberEntity e : entity) {
			dto.add(new ModelMapper().map(e, MemberDTO.class));
		}

		return dto;
	}
	
	public String checkByUsername(String username) {
		MemberEntity entity = memberRepository.findByUsername(username);
		
		if (entity == null) {
			return "사용 가능";
		}else {
			return "사용 불가";
		}
		
	}

	@Transactional
	public MemberDTO findByUsername(String username) {
		MemberEntity entity = memberRepository.findByUsername(username);

		if (username == null) {
			throw new RuntimeException("유저네임이 다릅니다.");
		}

		MemberDTO dto = new ModelMapper().map(entity, MemberDTO.class);
		dto.setId(null);
		dto.setPassword(null);

		return dto;
	}

	@Transactional
	public MemberDTO updatePassword(MemberDTO dto) {

		MemberEntity entity = memberRepository.findByUsername(dto.getUsername());

		if (entity == null) {
			throw new RuntimeException("에러");
		}

		if(!passwordEncoder.matches(dto.getOrgPassword(), entity.getPassword())) {
			throw new RuntimeException("비밀번호 틀림");
		}
		
		entity.setPassword(passwordEncoder.encode(dto.getPassword()));
		entity.setUpdateDate(new Date());

		entity = memberRepository.save(entity);

		dto = new ModelMapper().map(entity, MemberDTO.class);
		
		dto.setId(null);
		dto.setPassword(null);

		return dto;
	}

	@Transactional
	public MemberDTO updateName(MemberDTO dto) {
		MemberEntity entity = memberRepository.findByUsername(dto.getUsername());

		if (entity == null) {
			throw new RuntimeException("");
		}
		
		if(!passwordEncoder.matches(dto.getPassword(), entity.getPassword())) {
			throw new RuntimeException("비밀번호가 다름.");
		}

		entity.setName(dto.getName());
		entity.setPhoneNumber(dto.getPhoneNumber());
		entity.setAddress(dto.getAddress());
		entity.setHeight(dto.getHeight());
		entity.setWeight(dto.getWeight());
		entity.setUpdateDate(new Date());
		entity = memberRepository.save(entity);
		
		dto.setId(null);
		dto.setPassword(null);

		return new ModelMapper().map(entity, MemberDTO.class);
	}
}
