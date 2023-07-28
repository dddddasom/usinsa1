package kr.co.tj.member;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/member")
public class MemberController {

	@Autowired
	private MemberService memberService;
	
	@GetMapping("/name/{username}")
	public ResponseEntity<?> findByUsername(@PathVariable("username") String username) {
		Map<String, Object> map = new HashMap<>();

		if (username == null) {
			map.put("result", "에러발생");
			return ResponseEntity.badRequest().body(map);
		}

		try {
			MemberDTO dto = memberService.findByUsername(username);
			map.put("result", dto);
			return ResponseEntity.ok().body(map);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("result", "조회실패");
			return ResponseEntity.badRequest().body(map);
		}
	}

	@GetMapping("/all")
	public ResponseEntity<?> findAll() {

		Map<String, Object> map = new HashMap<>();

		try {
			List<MemberDTO> list = memberService.findAll();
			map.put("result", list);
			return ResponseEntity.ok().body(map);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("result", "회원 리스트를 불러오지 못했습니다");
			return ResponseEntity.badRequest().body(map);
		}
	}


	@PutMapping("/name")
	public ResponseEntity<?> updateName(@RequestBody MemberDTO dto) {

		Map<String, Object> map = new HashMap<>();

		if (dto == null) {
			map.put("result", "수정실패1");
			return ResponseEntity.badRequest().body(map);
		}

		try {
			dto = memberService.updateName(dto);
			map.put("result", dto);
			return ResponseEntity.ok().body(map);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("result", "수정실패2");
			return ResponseEntity.badRequest().body(map);
		}
	}


	@PutMapping("/password")
	public ResponseEntity<?> updatePassword(@RequestBody MemberDTO dto) {
		Map<String, Object> map = new HashMap<>();

		if (dto == null) {
			return ResponseEntity.badRequest().body("something wrong1");
		}

		if (dto.getOrgPassword() == null) {
			return ResponseEntity.badRequest().body("something wrong2");
		}

		if (dto.getUsername() == null) {
			return ResponseEntity.badRequest().body("something wrong3");
		}

		String password = dto.getPassword();
		String password2 = dto.getPassword2();

		if (password == null) {
			return ResponseEntity.badRequest().body("something wrong4");
		}

		if (password2 == null) {
			return ResponseEntity.badRequest().body("something wrong5");
		}

		if (!password.equals(password2)) {
			return ResponseEntity.badRequest().body("something wrong6");
		}

		try {
			dto = memberService.updatePassword(dto);
			map.put("result", dto);
			return ResponseEntity.ok().body(map);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("result", "수정 실패");
			return ResponseEntity.ok().body(map);
		}

	}

	
	@DeleteMapping("")
	public ResponseEntity<?> delete(@RequestBody MemberDTO dto) {
		Map<String, Object> map = new HashMap<>();

		if (dto == null) {
			return ResponseEntity.badRequest().body("something wrong1");
		}

		if (dto.getUsername() == null) {
			return ResponseEntity.badRequest().body("something wrong2");
		}

		if (dto.getPassword() == null) {
			return ResponseEntity.badRequest().body("something wrong3");
		}

		try {
			memberService.delete(dto);
			map.put("result", "삭제성공");
			return ResponseEntity.ok().body(map);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("result", "삭제실패");
			return ResponseEntity.badRequest().body(map);
		}
	}


}
